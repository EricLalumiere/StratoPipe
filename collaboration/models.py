""" Models for the collaboration app """

from django.db import models
from django.conf import settings
from assets.models import Asset


class Comment(models.Model):
    """ Model to store comments on assets """
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.user.username} on {self.asset.name}'
