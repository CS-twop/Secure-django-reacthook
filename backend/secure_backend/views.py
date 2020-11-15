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
from .serializers import UserSerializer, PostSerializer

# User 
class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer 
class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserCreate(APIView):
    # ! Don't forget change permissions
    permission_classes = (permissions.AllowAny, )
    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Post
class PostCreate(APIView):
    """
            Create api endpoint for creating post object, authentication 
            is needed.
    """

    permission_classes = (IsAuthenticated, )
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
    permission_classes = (IsAuthenticated, )
    serializer_class = PostSerializer
    
    def get_object(self):
        # print(self.request.data)
        return Post.objects.get(pk=self.request.data['post_id'])
        
    def put(self, request, *args, **kwargs):
        obj = self.get_object()
        serializer = PostSerializer(obj,data=request.data,partial=True)
        if serializer.is_valid():
            post = serializer.save()
            if post:
                json = serializer.data
                return Response(json, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostList(generics.ListAPIView):
    # TODO 
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDelete(generics.DestroyAPIView):
    """
        Delete api endpoint for deleting post, authentication is needed.
    """
    permission_classes = (IsAuthenticated, )
    
    def delete(self, request, *args, **kwargs):
        # TODO  
        return super().delete(request, *args, **kwargs)

class HelloWorldView(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request):
        return Response(data={'hello': 'world'}, status=status.HTTP_200_OK)