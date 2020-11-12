from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions, status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response 
from rest_framework.views import APIView
from rest_framework import generics

from django.contrib.auth.models import User

from .models import Post, Comment
from .serializers import UserSerializer, PostSerializer

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

class PostCreate(APIView):
    # ! Don't forget change permissions
    permission_classes = (permissions.AllowAny, )
    def post(self, request, format='json'):
        # # ! hack 
        # owner_name = request.data.pop('owner', None)
        # owner_id = User.objects.get(username=owner_name)
        # request.data['owner'] = owner_id

        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            post = serializer.save()
            if post:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class HelloWorldView(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request):
        return Response(data={'hello': 'world'}, status=status.HTTP_200_OK)