from django.urls import path
from .views import AssetListView, AssetDetailView, upload_asset

urlpatterns = [
    path('', AssetListView.as_view(), name='asset-list'),
    path('<int:pk>/', AssetDetailView.as_view(), name='asset-detail'),
    path('upload/', upload_asset, name='asset-upload'),
]
