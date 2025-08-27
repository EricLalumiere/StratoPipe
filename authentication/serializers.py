from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    # Enforce uniqueness with a clear message
    username = serializers.CharField(
        max_length=150,
        validators=[
            UniqueValidator(
                queryset=CustomUser.objects.all(),
                message="A user with that username already exists."
            )
        ],
    )

    class Meta:
        model = CustomUser
        fields = ["id", "username", "password", "email", "first_name", "last_name"]
        extra_kwargs = {
            "password": {"write_only": True, "min_length": 8},
            "email": {"required": False, "allow_blank": True},
        }

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = CustomUser(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user
