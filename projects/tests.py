"""
# projects/tests.py
This module contains tests for the Project API endpoints.
It uses Django's test framework and the Django REST Framework's APITestCase
to ensure that the API behaves as expected.
"""
from django.contrib.auth import get_user_model  # <-- IMPORTANT: Import this function
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Project

class ProjectAPITests(APITestCase):
    """
    Tests for the Project API endpoints.
    """

    def setUp(self):
        """Set up test users and data before each test."""
        # Use get_user_model() to get the currently active User class
        user = get_user_model()

        # Create a user for authentication using the correct User model
        self.user = user.objects.create_user(username='testuser',
                                             password='testpassword123')

        # Create another user to test ownership permissions
        self.other_user = user.objects.create_user(
            username='otheruser', password='otherpassword123')

        # Create a project owned by self.user
        self.project = Project.objects.create(
            name='Initial Test Project',
            description='A project for testing.',
            owner=self.user
        )

    def test_create_project_authenticated(self):
        """
        Ensure an authenticated user can create a new project.
        """
        self.client.force_authenticate(user=self.user)
        url = '/api/projects/'
        data = {'name': 'New Project', 'description': 'A brand new project.'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Project.objects.count(), 2)
        self.assertEqual(Project.objects.latest('id').name, 'New Project')
        self.assertEqual(Project.objects.latest('id').owner, self.user)

    def test_create_project_unauthenticated(self):
        """
        Ensure an unauthenticated user cannot create a project.
        """
        url = '/api/projects/'
        data = {'name': 'Unauthorized Project'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_projects_shows_only_owned(self):
        """
        Ensure the list endpoint only returns projects owned by the request user.
        """
        # Create a project for the other user that should NOT be in the list
        Project.objects.create(name='Other Users Project', owner=self.other_user)

        self.client.force_authenticate(user=self.user)
        url = '/api/projects/'
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], self.project.name)

    def test_owner_can_delete_project(self):
        """
        Ensure a user can delete their own project.
        """
        self.client.force_authenticate(user=self.user)
        url = f'/api/projects/{self.project.id}/'
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Project.objects.filter(id=self.project.id).exists())

    def test_cannot_delete_other_users_project(self):
        """
        Ensure a user cannot delete a project they do not own.
        """
        self.client.force_authenticate(user=self.other_user)
        url = reverse('project-detail', args=[self.project.id])  # DRF DefaultRouter name
        response = self.client.delete(url)

        # Pick one based on your policy; if you intentionally hide existence, keep 404.
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertTrue(Project.objects.filter(id=self.project.id).exists())
