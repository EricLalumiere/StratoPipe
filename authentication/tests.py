""" Tests for the authentication app """
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

class AuthAPITests(APITestCase):
    """ Test the authentication endpoints """
    def test_register(self):
        """ Test the registration endpoint """
        # check if the user already exists
        user = User.objects.filter(username="testuser")
        if user.exists():
            # delete the user if it already exists
            user.delete()

        response = self.client.post('/api/auth/register/', {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "testpassword123"
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login(self):
        """ Test the login endpoint """
        User.objects.create_user(username="testuser", password="testpassword123")
        response = self.client.post('/api/auth/login/', {
            "username": "testuser",
            "password": "testpassword123"
        })

        self.assertEqual(response.status_code, status.HTTP_200_OK)
