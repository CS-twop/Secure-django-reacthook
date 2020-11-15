from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from .models import Post, Comment

class UserSerializer(ModelSerializer):
    # posts = serializers.SlugRelatedField(many=True, slug_field='content', queryset=Post.objects.all())
    email = serializers.EmailField(required=True)
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class PostSerializer(ModelSerializer):
    # comments = serializers.SlugRelatedField(many=True, slug_field='content', queryset=Comment.objects.all())
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Post
        fields = ('owner', 'content')
    def create(self, data):
        data['owner'] = self.context['request'].user
        instance = self.Meta.model(**data)
        instance.save()
        return instance
        
class CommentSerializer(ModelSerializer):
    commenter = serializers.ReadOnlyField(source="commenter.username")
    class Meta: 
        model = Comment 
        fields = ("post_parent", 'commenter', 'content')
    def create(self, data):
        data['commenter'] = self.context['request'].user
        instance = self.Meta.model(**data)
        instance.save()
        return instance 
        
