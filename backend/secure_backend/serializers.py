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
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class CommentSerializer(ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    
    class Meta: 
        model = Comment 
        fields = ("post_id", 'user', 'content')
        extra_kwargs = {
            'post_id': {'write_only': True},
        }

    def create(self, data):
        data['user'] = self.context['request'].user
        instance = self.Meta.model(**data)
        instance.save()
        return instance 

class PostSerializer(ModelSerializer):

    user = serializers.ReadOnlyField(source='user.username')
    post_comments = CommentSerializer(source='comments', many=True,
                                      read_only=True)

    class Meta:
        model = Post
        fields = ('user', 'content', 'post_comments')

    def create(self, data):
        data['user'] = self.context['request'].user
        instance = self.Meta.model(**data)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        """
            Update post
        """
        # only allow to change the content

        new_content = validated_data.get('content', None)
        # check content
        if new_content is None:
            return instance

        instance.content = validated_data.get('content', new_content)
        instance.save()
        return instance
        
