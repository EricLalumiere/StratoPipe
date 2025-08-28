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
    Save uploaded file under USER_DATA/<username>/<projectname>/ and create Asset.
    Expects multipart/form-data with fields: name, asset_type, description (optional), file, project (id).
    """
    user = request.user
    project_id = request.data.get('project')
    name = request.data.get('name')
    asset_type = request.data.get('asset_type')
    description = request.data.get('description', '')
    upload = request.FILES.get('file')

    if not project_id or not name or not upload:
        return Response({'error': 'project, name and file are required.'}, status=status.HTTP_400_BAD_REQUEST)

    project = get_object_or_404(Project, pk=project_id)

    base_root = getattr(settings, 'MEDIA_ROOT', None)
    if not base_root:
        base_root = Path(settings.BASE_DIR) / 'media'
    target_dir = Path(base_root) / 'USER_DATA' / user.username / project.name
    os.makedirs(target_dir, exist_ok=True)

    fs = FileSystemStorage(location=str(target_dir))
    saved_name = fs.save(upload.name, upload)
    absolute_path = Path(target_dir) / saved_name

    try:
        media_root = Path(base_root).resolve()
        rel_path = absolute_path.resolve().relative_to(media_root).as_posix()
    except Exception:
        rel_path = absolute_path.as_posix()

    asset = Asset(
        name=name,
        description=description or '',
        asset_type=asset_type or '',
        owner=user,
        project=project,
    )
    asset.file.name = rel_path
    asset.save()

    return Response({
        'id': asset.id,
        'name': asset.name,
        'project': project.id,
        'file': asset.file.url if hasattr(asset.file, 'url') else rel_path,
    }, status=status.HTTP_201_CREATED)
