""" Views for the authentication app. """
from django.contrib.auth import authenticate, login, get_user_model
from django.contrib.auth.forms import PasswordResetForm
from django.db import IntegrityError
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status  # <-- add this import

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    """
    API endpoint to return the username of the currently authenticated user.
    """
    return Response({'username': request.user.username})

from .models import CustomUser
from .serializers import CustomUserSerializer


class CustomUserViewSet(ModelViewSet):
    """
    ViewSet for managing CustomUser registration and profile.
    """
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    # Only allow open access for creating an account; all other actions require authentication
    def get_permissions(self):
        if self.action in ["create"]:
            return [AllowAny()]
        return [IsAuthenticated()]

    # Scope queryset to the current user for non-list actions; disable list to prevent data leakage
    def get_queryset(self):
        if self.action == "list":
            # Prevent listing all users (privacy/security)
            return CustomUser.objects.none()
        if self.request and self.request.user.is_authenticated:
            return CustomUser.objects.filter(id=self.request.user.id)
        return CustomUser.objects.none()

    # Ensure retrieve/update/destroy operate only on the current user
    def get_object(self):
        return CustomUser.objects.get(id=self.request.user.id)

    # Return a friendly conflict instead of a generic server error
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            self.perform_create(serializer)
        except IntegrityError:
            return Response(
                {"error": "A user with that username already exists."},
                status=status.HTTP_409_CONFLICT,
            )
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """
    Custom login endpoint compatible with the current user model.
    Handles authentication and returns a success or error response.
    """
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response(
            {"error": "Both username and password are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(username=username, password=password)
    if user:
        login(request, user)
        return Response(
            {"message": "Login successful!", "username": user.username},
            status=status.HTTP_200_OK
        )

    return Response(
        {"error": "Invalid username or password. Please try again."},
        status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def whoami(request):
    return Response({'username': request.user.username})


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_by_username(request):
    """
    Accepts a username, resolves the email on file, and sends a password reset email.
    Always returns a generic success message to avoid user enumeration.
    """
    username = (request.data.get("username") or "").strip()
    if not username:
        return Response({"detail": "Username is required."}, status=400)

    User = get_user_model()
    try:
        user = User.objects.get(username=username)
        email = (user.email or "").strip()
        if email:
            form = PasswordResetForm({"email": email})
            if form.is_valid():
                form.save(
                    request=request,
                    use_https=request.is_secure(),
                    email_template_name="registration/password_reset_email.html",
                    subject_template_name="registration/password_reset_subject.txt",
                    # Optional overrides if you want to force a specific host/sender:
                    # domain_override="app.example.com",
                    # from_email="no-reply@example.com",
                )
    except User.DoesNotExist:
        pass

    return Response({
        "detail": "If that username exists, a reset link has been sent to the email on file."
    })
