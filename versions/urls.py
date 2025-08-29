# Python
from django.urls import path
from .views import list_statuses

urlpatterns = [
    path('statuses/', list_statuses, name='version-statuses'),
]