# python
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.views import (
    PasswordResetConfirmView,
    PasswordResetCompleteView,
    PasswordResetDoneView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # your existing APIs
    path('api/auth/', include('authentication.urls')),
    path('api/projects/', include('projects.urls')),
    path('api/assets/', include('assets.urls')),
    path('api/collaboration/', include('collaboration.urls')),
    path('api/versions/', include('versions.urls')),

    # Password reset pages (centralized here, using Django's built-ins)
    path(
        'reset-password/<uidb64>/<token>/',
        PasswordResetConfirmView.as_view(
            template_name='registration/password_reset_confirm.html'
        ),
        name='password_reset_confirm',
    ),
    path(
        'reset-password/complete/',
        PasswordResetCompleteView.as_view(
            template_name='registration/password_reset_complete.html'
        ),
        name='password_reset_complete',
    ),
    path(
        'reset-password/done/',
        PasswordResetDoneView.as_view(
            template_name='registration/password_reset_done.html'
        ),
        name='password_reset_done',
    ),
]
