""" Tests for the assets app. """

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from projects.models import Project
from .models import Asset

User = get_user_model()

class AssetModelTest(TestCase):
    def setUp(self):
        # Create a test user and project
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.project = Project.objects.create(owner=self.user, name='Test Project', description='Test')
        self.asset = Asset.objects.create(
            project=self.project,
            uploaded_by=self.user,
            name='Test Asset',
            file=SimpleUploadedFile("file.txt", b"file_content"),
        )

    def test_asset_creation(self):
        self.assertEqual(self.asset.name, 'Test Asset')
        self.assertEqual(self.asset.status, 'pending')
