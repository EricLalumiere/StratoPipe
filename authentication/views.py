""" Views for the authentication app. """
from django.contrib.auth import authenticate
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import CustomUser
from .serializers import CustomUserSerializer



class CustomUserViewSet(ModelViewSet):
    """
    ViewSet for managing CustomUser registration and profile.
    """
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """
    Custom login endpoint compatible with the current user model.
    """
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if user:
        return Response({"message": "Login successful!"}, status=200)
    return Response({"error": "Invalid credentials."}, status=401)
