""" Views for the authentication app. """
from django.contrib.auth import authenticate, login
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status  # Import to use standard HTTP status codes

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
    Handles authentication and returns a success or error response.
    """
    username = request.data.get("username")
    password = request.data.get("password")

    # Ensure both username and password are provided
    if not username or not password:
        return Response(
            {"error": "Both username and password are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Authenticate the user
    user = authenticate(username=username, password=password)
    if user:
        # Log the user in
        login(request, user)
        return Response(
            {"message": "Login successful!", "username": user.username},
            status=status.HTTP_200_OK
        )

    # Handle invalid credentials
    return Response(
        {"error": "Invalid username or password. Please try again."},
        status=status.HTTP_401_UNAUTHORIZED
    )
