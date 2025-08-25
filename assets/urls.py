""" URL patterns for the assets app

This module defines the URL routes for the assets app, mapping
to the corresponding views for uploading, listing, and retrieving asset details.

"""

from django.urls import path
from .views import AssetUploadView, AssetDetailView, AssetListView

# URL patterns for the assets app
urlpatterns = [
    # List all assets
    path('', AssetListView.as_view(), name='asset-list'),
    # Upload an asset
    path('upload/', AssetUploadView.as_view(), name='asset-upload'),
    # Get details of a specific asset
    path('<int:pk>/', AssetDetailView.as_view(), name='asset-detail'),
]
