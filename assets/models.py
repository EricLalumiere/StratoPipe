""" Asset model """

from django.db import models
from django.conf import settings


class Asset(models.Model):
    """ Asset model """
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('error', 'Error'),
    ]

    project = models.ForeignKey('projects.Project',
                                on_delete=models.CASCADE,
                                related_name='assets',
                                null=True,
                                blank=True)
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL,
                                    on_delete=models.CASCADE,
                                    related_name='assets')
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='assets/')
    thumbnail = models.ImageField(upload_to='thumbnails/',
                                  blank=True,
                                  null=True)
    status = models.CharField(max_length=20,
                              choices=STATUS_CHOICES,
                              default='pending')
    render_result = models.FileField(upload_to='renders/',
                                     blank=True,
                                     null=True)
    ai_data = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.name)
