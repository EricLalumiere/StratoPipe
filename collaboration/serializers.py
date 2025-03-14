""" Serializers for the collaboration app. """
from rest_framework import serializers
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
    """ Serializer for the Comment model. """
    class Meta:
        """ Define the fields to include in the serialized output. """
        model = Comment
        fields = ['id', 'asset', 'author', 'content', 'timestamp']
