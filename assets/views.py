""" This module contains the views for the assets app.

It defines API endpoints for uploading assets, retrieving asset details,
and listing all assets.
"""

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from .models import Asset
from .serializers import AssetSerializer
from .tasks import render_asset, process_asset_ai

from pathlib import Path
import os
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Asset
from projects.models import Project  # adjust if your Project model path differs

from django.db.models import Max
from django.utils.text import slugify
from versions.models import Version

# Python
from rest_framework.views import APIView


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

        # Trigger rendering or AI tasks based on asset type
        if asset.asset_type == 'geometry':
            render_asset.delay(asset.id)  # Asynchronous rendering task for geometry assets
        else:
            process_asset_ai.delay(asset.id)  # AI processing for non-geometry assets


class AssetDetailView(generics.RetrieveAPIView):
    """
    Retrieves detailed information about a specific asset.
    Only the owner of the asset can view its details.
    """
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Ensure users can only access assets they own
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
    Save uploaded file under USER_DATA/<username>/<projectname>/ and create a Version.
    If the Asset (project+name) doesn't exist, create it; then create Version(number=next).
    The file reference lives on the Version.
    """
    user = request.user
    project_id = request.data.get('project')
    name = request.data.get('name')
    asset_type = request.data.get('asset_type')
    asset_description = request.data.get('description', '')
    upload = request.FILES.get('file')

    if not project_id or not name or not upload:
        return Response({'error': 'project, name and file are required.'}, status=status.HTTP_400_BAD_REQUEST)

    project = get_object_or_404(Project, pk=project_id)

    # Create/find the Asset shell
    asset, created = Asset.objects.get_or_create(
        project=project,
        name=name,
        defaults={
            'description': asset_description or '',
            'asset_type': asset_type or '',
            'owner': user,
        }
    )
    if not created:
        fields_to_update = []
        if asset_description:
            asset.description = asset_description
            fields_to_update.append('description')
        if asset_type:
            asset.asset_type = asset_type
            fields_to_update.append('asset_type')
        if fields_to_update:
            asset.save(update_fields=fields_to_update)

    # Determine next version number
    max_number = asset.versions.aggregate(n=Max('number'))['n'] or 0
    next_number = max_number + 1

    # Save file to MEDIA_ROOT/USER_DATA/<username>/<project-slug>/
    base_root = getattr(settings, 'MEDIA_ROOT', None)
    if not base_root:
        base_root = Path(settings.BASE_DIR) / 'media'
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

    # Create Version with initial metadata and file reference
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
            'id': version.id,
            'number': version.number,
            'file': version.file.url if hasattr(version.file, 'url') else version.file.name,
            'description': version.description,
            'user': version.user_id,
            'created_at': version.created_at,
        }
    }, status=status.HTTP_201_CREATED)


class AssetVersionsView(APIView):
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
            }
            for v in asset.versions.order_by('number')
        ]
        return Response({'asset': asset.id, 'versions': data}, status=status.HTTP_200_OK)
