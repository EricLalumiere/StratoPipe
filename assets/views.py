# Python
""" This module contains the views for the assets app.

It defines API endpoints for uploading assets, retrieving asset details,
listing assets, listing versions for an asset, and creating a new version ("version up").
"""

from pathlib import Path
import os

from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.db.models import Max
from django.shortcuts import get_object_or_404
from django.utils.text import slugify

from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status as drf_status
from django.http import HttpResponse, Http404
from django.views.decorators.cache import cache_control

from .models import Asset
from .serializers import AssetSerializer
from projects.models import Project
from versions.models import Version
from versions.constants import STATUS_VALUES


class AssetUploadView(generics.CreateAPIView):
    """
    Handles the upload of assets. Depending on the asset type, it triggers
    rendering or AI processing tasks asynchronously.
    """
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Save the asset associated with the current authenticated user
        asset = serializer.save(owner=self.request.user)
        # If you have async processing, trigger here (render/AI, etc.)


class AssetDetailView(generics.RetrieveAPIView):
    """
    Retrieves detailed information about a specific asset.
    Only the owner of the asset can view its details.
    """
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Asset.objects.filter(owner=self.request.user)


class AssetListView(generics.ListAPIView):
    """
    Lists assets for the current authenticated user.
    Supports filtering by ?project=<id>.
    """
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = Asset.objects.filter(owner=self.request.user)
        project_id = self.request.query_params.get('project')
        if project_id:
            qs = qs.filter(project_id=project_id)
        return qs


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_asset(request):
    """
    Save uploaded file under MEDIA_ROOT/USER_DATA/<username>/<project-slug>/ and create a Version.
    If the Asset (project+name) doesn't exist, create it; then create Version(number=next).
    The file reference lives on the Version.
    """
    user = request.user
    project_id = request.data.get('project')
    name = request.data.get('name')
    asset_type = request.data.get('asset_type')
    asset_description = (request.data.get('description') or '').strip()
    upload = request.FILES.get('file')

    if not project_id or not name or not upload:
        return Response({'error': 'project, name and file are required.'}, status=drf_status.HTTP_400_BAD_REQUEST)

    # Ensure the project belongs to the current user
    project = get_object_or_404(Project, pk=project_id, owner=user)

    # Create/find the Asset shell (file is optional; versions hold the file)
    asset, created = Asset.objects.get_or_create(
        project=project,
        name=name,
        defaults={
            'description': asset_description,
            # ensure asset_type is one of the allowed choices; fallback to default
            'asset_type': (asset_type if asset_type in dict(Asset.ASSET_TYPES) else Asset._meta.get_field('asset_type').default),
            'owner': user,
        }
    )
    if not created:
        fields_to_update = []
        if asset_description:
            asset.description = asset_description
            fields_to_update.append('description')
        if asset_type and asset_type in dict(Asset.ASSET_TYPES):
            asset.asset_type = asset_type
            fields_to_update.append('asset_type')
        if fields_to_update:
            asset.save(update_fields=fields_to_update)

    # Determine next version number
    max_number = asset.versions.aggregate(n=Max('number'))['n'] or 0
    next_number = max_number + 1

    # Store file under MEDIA_ROOT/USER_DATA/<username>/<project-slug>/
    base_root = getattr(settings, 'MEDIA_ROOT', None) or (Path(settings.BASE_DIR) / 'media')
    safe_project = slugify(project.name) or f'project-{project.id}'
    target_dir = Path(base_root) / 'USER_DATA' / user.username / safe_project
    os.makedirs(target_dir, exist_ok=True)

    fs = FileSystemStorage(location=str(target_dir))
    saved_name = fs.save(upload.name, upload)
    absolute_path = Path(target_dir) / saved_name

    try:
        media_root = Path(base_root).resolve()
        rel_path = absolute_path.resolve().relative_to(media_root).as_posix()
    except Exception:
        rel_path = absolute_path.as_posix()

    # Create initial Version with default description
    version = Version.objects.create(
        asset=asset,
        number=next_number,
        description='uploaded by the user',
        user=user,
    )
    version.file.name = rel_path
    version.save(update_fields=['file'])

    return Response({
        'asset': asset.id,
        'version': {
            'id': version.id,  # ensure this line exists
            'number': version.number,
            'file': version.file.url if hasattr(version.file, 'url') else version.file.name,
            'description': version.description,
            'user': version.user_id,
            'created_at': version.created_at,
        }
    }, status=drf_status.HTTP_201_CREATED)


class AssetVersionsView(APIView):
    """
    Returns all versions for an asset, ordered by version number.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        asset = get_object_or_404(Asset, pk=pk, owner=request.user)
        data = [
            {
                'id': v.id,
                'number': v.number,
                'file': (v.file.url if hasattr(v.file, 'url') else v.file.name),
                'description': v.description,
                'user': v.user_id,
                'created_at': v.created_at,
                'status': v.status,
            }
            for v in asset.versions.order_by('number')
        ]
        return Response({'asset': asset.id, 'versions': data}, status=drf_status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    """
    Return the current authenticated user's username.
    """
    return Response({'username': request.user.username})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def version_up(request, pk):
    """
    Create a new Version for asset <pk>.
    multipart/form-data fields:
      - description (optional, defaults to 'uploaded by the user')
      - status (required; one of STATUS_VALUES)
      - file (required)
    """
    user = request.user
    asset = get_object_or_404(Asset, pk=pk, owner=user)

    upload = request.FILES.get('file')
    status_value = request.POST.get('status')
    desc = (request.POST.get('description') or '').strip() or 'uploaded by the user'

    if not upload or not status_value:
        return Response({'error': 'file and status are required.'}, status=drf_status.HTTP_400_BAD_REQUEST)
    if status_value not in STATUS_VALUES:
        return Response({'error': 'invalid status.'}, status=drf_status.HTTP_400_BAD_REQUEST)

    # next version number
    max_number = asset.versions.aggregate(n=Max('number'))['n'] or 0
    next_number = max_number + 1

    # store file to MEDIA_ROOT/USER_DATA/<username>/<project-slug>/
    base_root = getattr(settings, 'MEDIA_ROOT', None) or (Path(settings.BASE_DIR) / 'media')
    safe_project = slugify(asset.project.name) or f'project-{asset.project_id}'
    target_dir = Path(base_root) / 'USER_DATA' / user.username / safe_project
    os.makedirs(target_dir, exist_ok=True)

    fs = FileSystemStorage(location=str(target_dir))
    saved_name = fs.save(upload.name, upload)
    absolute_path = Path(target_dir) / saved_name

    try:
        media_root = Path(base_root).resolve()
        rel_path = absolute_path.resolve().relative_to(media_root).as_posix()
    except Exception:
        rel_path = absolute_path.as_posix()

    version = Version.objects.create(
        asset=asset,
        number=next_number,
        description=desc,
        user=user,
        status=status_value,
    )
    version.file.name = rel_path
    version.save(update_fields=['file'])

    return Response({
        'asset': asset.id,
        'version': {
            'id': version.id,
            'number': version.number,
            'file': version.file.url if hasattr(version.file, 'url') else version.file.name,
            'description': version.description,
            'status': version.status,
            'user': version.user_id,
            'created_at': version.created_at,
        }
    }, status=drf_status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def serve_asset_image(request, asset_id):
    """
    Serve the image file for a specific asset.
    """
    try:
        asset = Asset.objects.get(id=asset_id, owner=request.user)
        if not asset.file:
            raise Http404("Asset file not found")
        
        # Read the file content
        with asset.file.open('rb') as f:
            image_data = f.read()
        
        # Determine content type based on file extension
        content_type = 'image/jpeg'  # Default
        if asset.file.name.lower().endswith('.png'):
            content_type = 'image/png'
        elif asset.file.name.lower().endswith('.gif'):
            content_type = 'image/gif'
        elif asset.file.name.lower().endswith('.webp'):
            content_type = 'image/webp'
        
        response = HttpResponse(image_data, content_type=content_type)
        response['Content-Disposition'] = f'inline; filename="{asset.name}"'
        return response
        
    except Asset.DoesNotExist:
        raise Http404("Asset not found")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def serve_asset_thumbnail(request, asset_id):
    """
    Serve the thumbnail for a specific asset.
    """
    try:
        asset = Asset.objects.get(id=asset_id, owner=request.user)
        if not asset.thumbnail:
            raise Http404("Asset thumbnail not found")
        
        # Read the thumbnail content
        with asset.thumbnail.open('rb') as f:
            image_data = f.read()
        
        # Determine content type based on file extension
        content_type = 'image/jpeg'  # Default
        if asset.thumbnail.name.lower().endswith('.png'):
            content_type = 'image/png'
        elif asset.thumbnail.name.lower().endswith('.gif'):
            content_type = 'image/gif'
        elif asset.thumbnail.name.lower().endswith('.webp'):
            content_type = 'image/webp'
        
        response = HttpResponse(image_data, content_type=content_type)
        response['Content-Disposition'] = f'inline; filename="{asset.name}_thumb"'
        return response
        
    except Asset.DoesNotExist:
        raise Http404("Asset not found")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_project_images(request):
    """
    List all images for a specific project with their metadata.
    """
    project_id = request.query_params.get('project')
    if not project_id:
        return Response({'error': 'project parameter is required'}, status=drf_status.HTTP_400_BAD_REQUEST)
    
    try:
        project = Project.objects.get(id=project_id, owner=request.user)
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=drf_status.HTTP_404_NOT_FOUND)
    
    assets = Asset.objects.filter(
        project=project,
        owner=request.user,
        asset_type='image'
    ).order_by('name')
    
    image_data = []
    for asset in assets:
        image_data.append({
            'id': asset.id,
            'name': asset.name,
            'description': asset.description,
            'categories': asset.categories,
            'ai_enhanced': asset.ai_enhanced,
            'is_rendered': asset.is_rendered,
            'created_at': asset.created_at,
            'updated_at': asset.updated_at,
            'image_url': f'/api/assets/{asset.id}/image/',
            'thumbnail_url': f'/api/assets/{asset.id}/thumbnail/',
        })
    
    return Response({
        'project': project.name,
        'images': image_data,
        'count': len(image_data)
    })
