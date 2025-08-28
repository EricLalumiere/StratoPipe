# Python
# Update imports and urlpatterns as follows:
from django.urls import path
from .views import AssetListView, AssetDetailView, upload_asset, AssetVersionsView

urlpatterns = [
    path('', AssetListView.as_view(), name='asset-list'),
    path('<int:pk>/', AssetDetailView.as_view(), name='asset-detail'),
    path('<int:pk>/versions/', AssetVersionsView.as_view(), name='asset-versions'),
    path('upload/', upload_asset, name='asset-upload'),
]