""" This module contains the views for the assets app. """

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from .models import Asset
from .serializers import AssetSerializer
from .tasks import render_asset, process_asset_ai


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
    Lists all assets belonging to the currently authenticated user.
    """
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Limit the assets to those owned by the current authenticated user
        return Asset.objects.filter(owner=self.request.user)
