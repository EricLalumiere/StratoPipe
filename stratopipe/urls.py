""" stratopipe URL Configuration """

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/projects/', include('projects.urls')),
    path('api/assets/', include('assets.urls')),
    path('api/collaboration/', include('collaboration.urls')),
]
