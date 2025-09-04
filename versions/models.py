import uuid
from django.db import models
from .constants import STATUS_CHOICES

class Version(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    asset = models.ForeignKey('assets.Asset', on_delete=models.CASCADE, related_name='versions')
    number = models.PositiveIntegerField()
    file = models.FileField(upload_to='asset_versions/')
    description = models.TextField(blank=True, default='uploaded by the user')
    user = models.ForeignKey('authentication.CustomUser', on_delete=models.CASCADE, related_name='asset_versions')
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=32, choices=STATUS_CHOICES, default='placeholder')

    class Meta:
        unique_together = ('asset', 'number')
        ordering = ['-number']