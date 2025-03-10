""" This module contains the admin configuration for the assets app. """

from django.contrib import admin
from .models import Asset

@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    """ Configuration for the Asset model in the Django admin interface. """
    list_display = ('id', 'name', 'status', 'uploaded_by', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name',)
