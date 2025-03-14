""" URL patterns for the assets app """

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
