from django.contrib import admin
from django.urls import path, include
from .views import ProjectListCreateView, ProjectDetailView

urlpatterns = [
    path('projects/', ProjectListCreateView.as_view(), name='project-list-create'),
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    path('admin/', admin.site.urls),
    path('api/', include('projects.urls')),
    # Include other app URLs as needed
]
