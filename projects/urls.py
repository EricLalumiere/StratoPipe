""" This module defines the URL patterns for the projects app. """

# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import ProjectViewSet
#
# router = DefaultRouter()
# router.register(r'', ProjectViewSet, basename='project')
#
# urlpatterns = [
#     path('', include(router.urls)),
# ]

# projects/urls.py
from django.urls import path
from .views import ProjectListCreateView, ProjectDetailView

urlpatterns = [
    path('', ProjectListCreateView.as_view(), name='project-list-create'),
    path('<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
]
