# python
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views


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
        'reset-password/',
        auth_views.PasswordResetView.as_view(
            template_name='registration/password_reset_form.html',
            email_template_name='registration/password_reset_email.html',
            subject_template_name='registration/password_reset_subject.txt',
        ),
        name='password_reset',
    ),
    path(
        'reset-password/done/',
        auth_views.PasswordResetDoneView.as_view(
            template_name='registration/password_reset_done.html'
        ),
        name='password_reset_done',
    ),
    path(
        'reset-password/confirm/<uidb64>/<token>/',
        auth_views.PasswordResetConfirmView.as_view(
            template_name='registration/password_reset_confirm.html'
        ),
        name='password_reset_confirm',
    ),
    path(
        'reset-password/complete/',
        auth_views.PasswordResetCompleteView.as_view(
            template_name='registration/password_reset_complete.html'
        ),
        name='password_reset_complete',
    ),
]

