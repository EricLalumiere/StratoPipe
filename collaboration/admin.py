""" Admin configuration for the collaboration app. """
from django.contrib import admin
from .models import Comment

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    """ Ensure these fields exist in the Comment model """
    list_display = ('asset', 'author', 'content', 'timestamp')  # Match valid fields
    search_fields = ('author__username', 'content')            # Enable search by author username and comment content
    list_filter = ('timestamp',)                               # Add filtering by timestamp
