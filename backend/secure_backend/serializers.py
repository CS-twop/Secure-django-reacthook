from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import Post

class UserSerializer(ModelSerializer):
    post = serializers.PrimaryKeyRelatedField(many=True, queryset=Post.objects.all())

    email = serializers.EmailField(required=True)
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'post')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class PostSerializer(ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Post
        fields = ('owner', 'content')

    def create(self, data):
        # ! ไม่ควรให่้คนอื่นมาปลอมแปลง มาคอมเมนท์แทนด้วย 
        instance = self.Meta.model(**data)
        instance.save()
        return instance
        



    
