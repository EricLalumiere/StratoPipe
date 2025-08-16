# projects/views.py
"""
This module contains views for the Project API endpoints.
It uses Django REST Framework's generic views to handle listing, creating,
retrieving, updating, and deleting projects.

It also includes custom permissions to ensure that users can only
access and modify their own projects.
"""

from rest_framework import generics, permissions
from .models import Project
from .serializers import ProjectSerializer

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user

class ProjectListCreateView(generics.ListCreateAPIView):
    """
    View to list all projects for a user or create a new one.
    """
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users can only see their own projects
        return Project.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # Assign the current user as the owner of the new project
        serializer.save(owner=self.request.user)


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    View to retrieve, update, or delete a project instance.
    """
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        # Users can only access their own projects
        return Project.objects.filter(owner=self.request.user)