from django.contrib.auth.models import User
from rest_framework import permissions
from .models import Post, Comment 

class IsPostOwnerOrAdmin(permissions.BasePermission):
    # def has_permission(self, request, view):
    #     return request.user.id == request.data.owner.id

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True

        try: 
            user = User.objects.get(pk=obj.owner.id) 
        except: 
            return False 

        if request.user.id == user.id:
            return True

        return False
        
class IsCommenterOrAdmin(permissions.BasePermission):
    # def has_permission(self, request, view):
    #     return request.user.id == request.data.commenter.id

    def has_object_permission(self, request, view, obj):    
        if request.user.is_superuser:
            return True 

        try: 
            user = User.objects.get(pk=obj.commenter.id)
        except: 
            return False 

        if request.user.id  == user.id:
            return True

        return False