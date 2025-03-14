""" Admin configuration for the Asset model. """

from django.contrib import admin
from .models import Asset


@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Asset model.
    Provides features like list display, filtering, and search.
    """
    list_display = ('name', 'asset_type', 'owner', 'project', 'is_rendered', 'created_at')
    list_filter = ('asset_type', 'is_rendered', 'created_at')  # Allows filtering by these fields
    search_fields = ('name', 'owner__username', 'project__name')  # Enables search on these fields
    date_hierarchy = 'created_at'  # Adds navigation by upload date
    ordering = ('-created_at',)  # Orders assets by upload date (descending)

    # Ensures users can view inline metadata for debugging/render tracking
    readonly_fields = ('rendered_image', 'thumbnail', 'categories', 'ai_enhanced')
