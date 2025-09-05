from django.urls import path
from .views import AssetListView, AssetDetailView, upload_asset, AssetVersionsView, version_up
from .views import current_user

urlpatterns = [
    path('', AssetListView.as_view(), name='asset-list'),
    path('<int:pk>/', AssetDetailView.as_view(), name='asset-detail'),
    path('<int:pk>/versions/', AssetVersionsView.as_view(), name='asset-versions'),
    path('<int:pk>/version-up/', version_up, name='asset-version-up'),
    path('upload/', upload_asset, name='asset-upload'),
    path('user/', current_user, name='current-user'),
]
