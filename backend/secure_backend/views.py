from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions, status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.response import Response 
from rest_framework.views import APIView

from .serializers import UserSerializer

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

class HelloWorldView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request):
        return Response(data={'hello': 'world'}, status=status.HTTP_200_OK)