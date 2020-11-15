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

# class UserUpdate(APIView):
#     permission_classes = (permissions.IsAuthenticated,)
#     def patch(self, request, user_id):
        
        

# Post 

class PostCreate(APIView):
    # ! Don't forget change permissions
    permission_classes = (IsAuthenticated, )
    def post(self, request, format='json'):
        # # ! hack 
        # data = request.data
        # owner_name = request.data.pop('owner', None)
        # print(owner_name)
        # owner_id = User.objects.get(username=owner_name)
        # data['owner'] = owner_id
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


class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

# Comment 

class CommentCreate(APIView):
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

class CommentList(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class HelloWorldView(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request):
        return Response(data={'hello': 'world'}, status=status.HTTP_200_OK)