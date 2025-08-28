from django.conf import settings
from django.db import models

class Version(models.Model):
    asset = models.ForeignKey('assets.Asset', on_delete=models.CASCADE, related_name='versions')
    number = models.PositiveIntegerField()
    file = models.FileField(upload_to='asset_versions/')
    description = models.TextField(blank=True, default='uploaded by the user')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='asset_versions')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('asset', 'number')
        ordering = ['-number']

    def __str__(self):
        return f'{self.asset_id} v{self.number}'