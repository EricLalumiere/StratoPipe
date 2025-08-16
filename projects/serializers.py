""" Serializers for the projects app """

from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    """ Serializer for the Project model """
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        """ Meta class """
        model = Project
        fields = ['id', 'owner', 'name', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'owner', 'created_at', 'updated_at']

    def create(self, validated_data):
        # Set the owner as the current authenticated user
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)
