from django.contrib.auth.models import User
from rest_framework import permissions
from .models import Post, Comment 

class IsOwnerOrAdmin(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True

        try: 
            user = User.objects.get(pk=obj.user.id) 
        except: 
            return False 

        if request.user.id == user.id:
            return True

        return False
        