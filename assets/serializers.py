""" Serializers for the assets app """

from rest_framework import serializers
from .models import Asset

class AssetSerializer(serializers.ModelSerializer):
    """ Serializer for the Asset model """
    class Meta:
        """ Meta class """
        model = Asset
        fields = ['id', 'project', 'uploaded_by', 'name', 'file',
                  'thumbnail', 'status', 'render_result', 'ai_data',
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'uploaded_by', 'thumbnail',
                            'status', 'render_result', 'ai_data',
                            'created_at', 'updated_at']

    def create(self, validated_data):
        # Set the uploader as the current authenticated user
        validated_data['uploaded_by'] = self.context['request'].user
        return super().create(validated_data)
