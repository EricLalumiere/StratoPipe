# Python
from rest_framework import serializers
from .models import Asset
from versions.models import Version

class VersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Version
        fields = ['id', 'number', 'file', 'description', 'user', 'created_at']

class AssetSerializer(serializers.ModelSerializer):
    versions = VersionSerializer(many=True, read_only=True)

    class Meta:
        model = Asset
        fields = [
            'id', 'project', 'owner', 'name', 'description', 'asset_type',
            'status', 'created_at', 'updated_at', 'versions'
        ]
        read_only_fields = ['owner', 'status', 'created_at', 'updated_at']