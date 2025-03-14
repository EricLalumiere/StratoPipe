""" Defines the Asset model for storing uploaded files and their metadata """
from django.db import models
from django.conf import settings  # For referencing the custom user model
from projects.models import Project  # To establish a relationship with the Project model


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
    asset_type = models.CharField(max_length=20, choices=ASSET_TYPES)

    # File storage for the asset itself
    file = models.FileField(upload_to='assets/')

    # Relationships
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='uploaded_assets'
    )  # Links the asset to the user who uploaded it
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='assets'
    )  # Links the asset to a project

    # Metadata
    # Auto-set timestamp for when the asset is uploaded
    uploaded_at = models.DateTimeField(auto_now_add=True)

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

    # Representation
    def __str__(self):
        """ Returns the asset's name when printed or displayed """
        return str(self.name)
