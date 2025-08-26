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

    # Redirect Django root to the React dev server in development:
    path('', RedirectView.as_view(url='http://localhost:3000/', permanent=False), name='home'),
]
