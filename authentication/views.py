""" This file contains the viewset for the CustomUser model. """

from rest_framework import viewsets, permissions
from .models import CustomUser
from .serializers import CustomUserSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    """ Viewset for the CustomUser model. """
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return the current user's profile
        return CustomUser.objects.filter(id=self.request.user.id)
