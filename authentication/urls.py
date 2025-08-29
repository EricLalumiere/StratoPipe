# Python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, login_user, whoami

router = DefaultRouter()
router.register(r'register', CustomUserViewSet, basename='register')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_user, name="login"),
    path('whoami/', whoami, name='whoami'),
]
