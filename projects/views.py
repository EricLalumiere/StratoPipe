""" Views for the projects app """

from rest_framework import viewsets, permissions
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    """ Viewset for the Project model """
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return projects owned by the current user
        return Project.objects.filter(owner=self.request.user)
