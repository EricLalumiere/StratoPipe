""" This module contains the viewset for the Asset model. """

from rest_framework import viewsets, permissions
from .models import Asset
from .serializers import AssetSerializer
from .tasks import process_rendering, generate_thumbnail, process_ai


class AssetViewSet(viewsets.ModelViewSet):
    """ Viewset for the Asset model. """
    serializer_class = AssetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return assets uploaded by the current user
        return Asset.objects.filter(uploaded_by=self.request.user)

    def perform_create(self, serializer):
        # Save asset and trigger asynchronous processing tasks
        asset = serializer.save()
        process_rendering.delay(asset.id)
        generate_thumbnail.delay(asset.id)
        process_ai.delay(asset.id)
