from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions, status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response 
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.models import User

from .models import Post, Comment
from .serializers import UserSerializer, PostSerializer, CommentSerializer
from .permissions import IsPostOwnerOrAdmin, IsCommenterOrAdmin

#######################################
############### USER ##################
#######################################

class UserList(generics.ListAPIView):
    """ 
            Create api endpoint for displaying all users, authentication is needed
    """
    permissions = (permissions.IsAuthenticated, )
    queryset = User.objects.all()
    serializer_class = UserSerializer 

class UserCreate(APIView):
    """
            Create api endpoint for creating user object, anyone is allowed to register 
    """
    permission_classes = (permissions.AllowAny, )
    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#######################################
############### POST ##################
#######################################

class PostList(generics.ListAPIView):
    """ 
            Create api endpoint for displaying all posts, anyone is allowed to see
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer 

class PostCreate(APIView):
    """
            Create api endpoint for creating post object, authentication 
            is needed.
    """
    permission_classes = [IsAuthenticated,]
    def post(self, request, format='json'):
        context={
            'request': request
        }
        serializer = PostSerializer(data=request.data, context=context)
        if serializer.is_valid():
            post = serializer.save()
            if post:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostUpdate(generics.UpdateAPIView):
    """
            Update api endpoint for updating post, authentication is needed.
    """
    permission_classes = [IsAuthenticated, IsPostOwnerOrAdmin]
    serializer_class = PostSerializer
    
    def get_object(self):
        obj = Post.objects.get(pk=self.request.data['post_id'])
        self.check_object_permissions(self.request, obj)
        return obj
        
    def patch(self, request, *args, **kwargs):
        obj = self.get_object()
        serializer = PostSerializer(obj,data=request.data,partial=True)
        if serializer.is_valid(): 
            post = serializer.save()
            if post:
                json = serializer.data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostDelete(generics.DestroyAPIView):
    """
            Delete api endpoint for deleting post, authentication is needed.
    """
    permission_classes = [IsAuthenticated, IsPostOwnerOrAdmin]
    
    def get_queryset(self):
        posts = Post.objects.filter(id=self.request.data['post_id'])
        for post in posts:
            self.check_object_permissions(self.request, post)
        return posts 

    def delete(self, request, *args, **kwargs):
        obj = self.get_queryset()
        obj.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
        

#######################################
############## COMMENT ################
#######################################

class CommentList(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentCreate(APIView):
    """
            Create api endpoint for creating comment object, authentication 
            is needed.
    """
    permission_classes = (IsAuthenticated, )
    def post(self, request, format='json'):
        context = {
            'request': request,
        }
        serializer = CommentSerializer(data=request.data, context=context)
        if serializer.is_valid():
            comment = serializer.save()
            if comment:
                json = serializer.data 
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentUpdate(generics.UpdateAPIView):
    """
            Update api endpoint for updating comment, authentication is needed.
    """
    permission_classes = [IsAuthenticated, IsCommenterOrAdmin]
    serializer_class = CommentSerializer
    
    def get_object(self):
        obj = Comment.objects.get(pk=self.request.data['comment_id'])
        self.check_object_permissions(self.request, obj)
        return obj

    def patch(self, request, *args, **kwargs):
        obj = self.get_object()
        serializer = CommentSerializer(obj,data=request.data,partial=True)
        if serializer.is_valid():
            comment = serializer.save()
            if comment:
                json = serializer.data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class CommentDelete(generics.DestroyAPIView):
    """
            Delete api endpoint for deleting comment, authentication is needed.
    """
    permission_classes = [IsAuthenticated, IsCommenterOrAdmin]
    
    def get_queryset(self):
        comments = Comment.objects.filter(id=self.request.data['comment_id']) 
        for comment in comments:
            self.check_object_permissions(self.request, comment)
        return comments

    def delete(self, request, *args, **kwargs):
        obj = self.get_queryset()
        obj.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
        

