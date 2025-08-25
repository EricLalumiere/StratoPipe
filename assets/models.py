""" Defines the Asset model for storing uploaded files and their metadata

The role of the model is to represent various types of assets (images, videos, documents, geometries)
in the database, along with their relationships to users and projects.
in a Django application.
"""
from django.db import models
from django.conf import settings  # For referencing the custom user model
from projects.models import Project  # To establish a relationship with the Project model


try:
    # Django 3.1+ provides models.JSONField cross-database
    JSONField = models.JSONField
except AttributeError:
    # Fallback for very old Django versions (not ideal, but avoids extra deps)
    # You can store JSON as text and parse in code.
    JSONField = None


class Asset(models.Model):
    """ Choices for asset type """
    ASSET_TYPES = [
        ('image', 'Image'),
        ('video', 'Video'),
        ('document', 'Document'),
        ('geometry', 'Geometry'),
    ]

    # Fields
    # Asset name (e.g., descriptive title)
    name = models.CharField(max_length=100)

    # Optional field for additional information about the asset
    description = models.TextField(blank=True)

    # Defines the type of the uploaded file
    asset_type = models.CharField(max_length=20,
                                  choices=ASSET_TYPES,
                                  default='empty')

    # File storage for the asset itself
    file = models.FileField(upload_to='assets/')

    # Python
    # inside the Asset model, near other fields
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
    )

    # Relationships
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='uploaded_assets',
        default=1
    )  # Links the asset to the user who uploaded it
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='assets',
        default=1
    )  # Links the asset to a project

    # Metadata
    # Auto-set timestamp for when the asset is uploaded
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Rendering and AI Enhancements
    # Stores rendered image
    rendered_image = models.ImageField(upload_to='rendered_images/', null=True, blank=True)
    # Stores thumbnail
    thumbnail = models.ImageField(upload_to='thumbnails/', null=True, blank=True)
    # Tracks whether rendering is complete
    is_rendered = models.BooleanField(default=False)
    # AI-determined categories for the asset
    categories = models.CharField(max_length=255, blank=True)
    # Tracks whether the asset has been enhanced using AI
    ai_enhanced = models.BooleanField(default=False)

    # Fields used by tasks
    # Store arbitrary rendered file content (e.g., .txt, .bin, etc.)
    render_result = models.FileField(upload_to='renders/', null=True, blank=True)

    # Store AI data returned by processing task
    if JSONField is not None:
        ai_data = JSONField(null=True, blank=True)
    else:
        # Fallback to TextField if JSONField is unavailable
        ai_data = models.TextField(null=True, blank=True)


    # Representation
    def __str__(self):
        """ Returns the asset's name when printed or displayed """
        return str(self.name)
