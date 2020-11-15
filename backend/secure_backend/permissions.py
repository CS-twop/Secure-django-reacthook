from django.contrib.auth.models import User
from rest_framework import permissions
from .models import Post, Comment 

class IsAuthenPost(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS or request.user.is_superuser:
            return True 
        
        try: 
            user = User.objects.get(pk=obj.owner.id) 
        except: 
            return False 

        if request.user.id == user.id:
            return True

        return False
        
class IsAuthenComment(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS or request.user.is_superuser:
            return True 
        
        try: 
            user = User.objects.get(pk=obj.commenter.id)
        except: 
            return False 

        if request.user.id  == user.id:
            return True

        return False