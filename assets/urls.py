from django.urls import path
from .views import AssetListView, AssetDetailView, upload_asset, AssetVersionsView, version_up
from .views import current_user, serve_asset_image, serve_asset_thumbnail, list_project_images

urlpatterns = [
    path('', AssetListView.as_view(), name='asset-list'),
    path('<int:pk>/', AssetDetailView.as_view(), name='asset-detail'),
    path('<int:pk>/versions/', AssetVersionsView.as_view(), name='asset-versions'),
    path('<int:pk>/version-up/', version_up, name='asset-version-up'),
    path('<int:asset_id>/image/', serve_asset_image, name='asset-image'),
    path('<int:asset_id>/thumbnail/', serve_asset_thumbnail, name='asset-thumbnail'),
    path('upload/', upload_asset, name='asset-upload'),
    path('user/', current_user, name='current-user'),
    path('project-images/', list_project_images, name='project-images'),
]
