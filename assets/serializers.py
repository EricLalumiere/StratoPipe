""" Serializers for the assets app

This module defines serializers to convert Asset model instances
to and from JSON format for API interactions.
It includes custom logic to handle fields like "uploaded_by" and
auto-filling the asset name from the uploaded file if not provided.

"""

from rest_framework import serializers
from .models import Asset


class AssetSerializer(serializers.ModelSerializer):
    """ Serializer for the Asset model """
    # Expose "uploaded_by" in the API, but map it to the model field "owner"
    uploaded_by = serializers.PrimaryKeyRelatedField(read_only=True, source='owner')

    class Meta:
        """ Meta class """
        model = Asset
        fields = [
            'id',
            'project',
            'uploaded_by',
            'name',
            'file',
            'ai_data',
            'render_result',
            'thumbnail',
            'status',
            'created_at',
            'updated_at',
        ]
        read_only_fields = [
            'id',
            'uploaded_by',
            'thumbnail',
            'render_result',
            'status',
            'created_at',
            'updated_at',
        ]

    def create(self, validated_data):
        # Ensure the uploader is the current authenticated user
        validated_data['owner'] = self.context['request'].user

        # Auto-fill name from uploaded file if not provided
        if not validated_data.get('name'):
            upload = validated_data.get('file')
            if upload and hasattr(upload, 'name'):
                # Use the original filename as a sensible default
                validated_data['name'] = upload.name

        return super().create(validated_data)
