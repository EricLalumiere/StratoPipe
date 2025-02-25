from django.urls import path
from django.contrib import admin
from django.urls import path, include

from .views import UserRegistrationView, UserLoginView, UserProfileView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('admin/', admin.site.urls),
    path('auth/', include('authentication.urls')),
    path('profile/', UserProfileView.as_view(), name='profile'),
]
