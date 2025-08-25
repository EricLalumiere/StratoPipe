""" Celery tasks for asset processing.

This module defines asynchronous tasks for processing assets,
including rendering, thumbnail generation, and AI-based enhancements.

"""


import time
from celery import shared_task
from django.core.files.base import ContentFile
from .models import Asset


@shared_task
def render_asset(asset_id):
    """Simulate asset rendering and update render_result field."""
    try:
        asset = Asset.objects.get(id=asset_id)
        asset.status = 'processing'
        asset.save()

        # Simulate rendering process (replace with actual rendering logic)
        time.sleep(5)
        rendered_content = b'This is the rendered file content.'
        asset.render_result.save(f"render_{asset.id}.txt", ContentFile(rendered_content))

        asset.status = 'completed'
        asset.save()
    except Asset.DoesNotExist:
        # Asset not found; optionally log the error
        pass


@shared_task
def generate_thumbnail(asset_id):
    """Simulate thumbnail generation for the asset."""
    try:
        asset = Asset.objects.get(id=asset_id)
        # Simulate thumbnail generation (replace with logic to create an image thumbnail)
        time.sleep(2)
        thumbnail_content = b'Thumbnail image bytes'
        asset.thumbnail.save(f"thumb_{asset.id}.png", ContentFile(thumbnail_content))
        asset.save()
    except Asset.DoesNotExist:
        pass


@shared_task
def process_asset_ai(asset_id):
    """Simulate AI processing (analysis, classification) for the asset."""
    try:
        asset = Asset.objects.get(id=asset_id)
        # Simulate AI processing (replace with your model inference code)
        time.sleep(3)
        ai_result = {
            'analysis': 'This asset has been classified successfully.',
            'confidence': 0.95
        }
        asset.ai_data = ai_result
        asset.save()
    except Asset.DoesNotExist:
        pass
