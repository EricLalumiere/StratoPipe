from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CustomUserViewSet,
    login_user,
    whoami,
    password_reset_by_username,
)
from django.views.generic.base import RedirectView

router = DefaultRouter()
router.register(r'register', CustomUserViewSet, basename='register')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_user, name="login"),
    path('whoami/', whoami, name='whoami'),
    path('password-reset-by-username/', password_reset_by_username, name='password-reset-by-username'),
    # Note: UI password reset views are centralized in stratopipe/urls.py
    # Optional: backward-compatible redirect in case any client hits the old path
    path('password-reset/done/', RedirectView.as_view(url='/reset-password/done/', permanent=False)),
]
