""" Serializers for the collaboration app. """

from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    """ Serializer for the Comment model. """
    class Meta:
        model = Comment
        fields = ['id', 'asset', 'user', 'text', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']
