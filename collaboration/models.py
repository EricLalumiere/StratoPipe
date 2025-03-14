""" This module contains the models for the collaboration app. """
from django.db import models
from django.conf import settings  # Use settings.AUTH_USER_MODEL for user references
from assets.models import Asset

class Comment(models.Model):
    """ This class represents a comment on an asset. """
    asset = models.ForeignKey(Asset,
                              on_delete=models.CASCADE,
                              related_name='comments')
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author.name} - {self.asset.name}"
