from rest_framework import serializers
from .models import Asset
from versions.models import Version

class VersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Version
        fields = ['id', 'number', 'file', 'description', 'user', 'created_at', 'status']

class AssetSerializer(serializers.ModelSerializer):
    versions = VersionSerializer(many=True, read_only=True)
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
            'versions'
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
