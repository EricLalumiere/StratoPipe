""" This module contains the serializers for the CustomUser model. """

from rest_framework import serializers
from django.contrib.auth import get_user_model

CustomUser = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    """ Serializer for the CustomUser model. """
    password = serializers.CharField(write_only=True,
                                     required=True,
                                     style={'input_type': 'password'})

    class Meta:
        """ Define the fields to include in the serialized output. """
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name',
                  'password', 'bio', 'avatar']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        user.bio = validated_data.get('bio', '')
        user.avatar = validated_data.get('avatar', None)
        user.save()
        return user
