# Python
"""StratoPipe URL Configuration"""

from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/projects/', include('projects.urls')),
    path('api/assets/', include('assets.urls')),
    path('api/collaboration/', include('collaboration.urls')),
    path('api/versions/', include('versions.urls')),  # exposes /api/versions/statuses/

    # Redirect Django root to the frontend dev server:
    path('', RedirectView.as_view(url='http://localhost:3000/', permanent=False), name='home'),
]
