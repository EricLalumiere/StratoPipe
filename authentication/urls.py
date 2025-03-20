""" This module contains the urls for the authentication app. """
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, login_user

router = DefaultRouter()
router.register(r'register', CustomUserViewSet, basename='register')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_user, name="login"),
]
