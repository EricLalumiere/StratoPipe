""" Custom user model for authentication app """

from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    """
    Custom user model extending Django's AbstractUser.
    Adds additional fields for bio and avatar.
    """

    # Optional biography field for user profile
    bio = models.TextField(blank=True, null=True)

    # Profile picture
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)

    def __str__(self):
        """ Return the username for string representation """
        return str(self.username)
