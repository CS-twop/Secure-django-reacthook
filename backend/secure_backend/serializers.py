from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer

from rest_framework import serializers

class UserSerializer(ModelSerializer):

    email = serializers.EmailField()
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)

    def create(self, validated_data):
        if validated_data['password'] != None:
            instance = self.Meta.model(**validated_data)
            instance.save()
            return instance

    class Meta:
        model = User
        field = ('email', 'username', 'password')
