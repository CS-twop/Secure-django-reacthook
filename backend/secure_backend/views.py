from django.shortcuts import render
from rest_framework import permissions, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth.models import User

from .models import Post, Comment
from .serializers import UserSerializer, PostSerializer, CommentSerializer
from .permissions import IsOwnerOrAdmin, IsModerator, IsUserOrModerator

#######################################
############### USER ##################
#######################################


class UserGet(generics.RetrieveAPIView):
    
    permissions = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(request.user)        
        return Response(serializer.data, status=status.HTTP_200_OK)

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
    permissions = (IsAuthenticated, )
    queryset = Post.objects.all().prefetch_related('comments')
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
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]
    serializer_class = PostSerializer
    
    def get_object(self):
        obj = Post.objects.get(pk=self.request.data['post_id'])
        self.check_object_permissions(self.request, obj)
        return obj
        
    def patch(self, request, *args, **kwargs):
        try:
            obj = self.get_object()
        except:
            return Response("Post does not exist",status=status.HTTP_500_INTERNAL_SERVER_ERROR)
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
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]
    
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
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]
    serializer_class = CommentSerializer
    
    def get_object(self):
        obj = Comment.objects.get(pk=self.request.data['comment_id'])
        self.check_object_permissions(self.request, obj)
        return obj

    def patch(self, request, *args, **kwargs):
        try:
            obj = self.get_object()
        except:
            return Response(
                "Comment does not exist", 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
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
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]
    
    def get_queryset(self):
        comments = Comment.objects.filter(id=self.request.data['comment_id']) 
        for comment in comments:
            self.check_object_permissions(self.request, comment)
        return comments

    def delete(self, request, *args, **kwargs):
        obj = self.get_queryset()
        obj.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
        

#######################################
############### TOKEN #################
#######################################

class LogoutAndBlacklistRefreshToken(APIView):
    """
        View endpoint for logging user out and blacklist refresh token
    """

    permission_classes = (IsAuthenticated, )

    def post(self, request, format='json'):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)