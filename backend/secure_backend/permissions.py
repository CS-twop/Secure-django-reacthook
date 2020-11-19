from django.contrib.auth.models import User, Group
from rest_framework import permissions
from .models import Post, Comment 

def _is_in_group(user, group_name):
    """
        Check user and group relation
    """
    try: 
        return Group.objects.get(name=group_name).user_set \
                                                 .filter(id=user.id) \
                                                 .exists()
    except:
        return None

def _has_group_permission(user, required_groups):
    return any([_is_in_group(user, group) for group in required_groups])

class IsUserOrModerator(permissions.BasePermission):
    """
        Permission class for moderator and user
    """
    required_groups = ['user', 'moderator']

    def has_object_permission(self, request, view, obj):
        user = request.user
        if self.required_groups is None or self.required_groups == []:
            return False
        return _has_group_permission(user, self.required_groups)
    
    def has_permission(self, request, view):
        user = request.user
        if self.required_groups is None or self.required_groups == []:
            return False
        return _has_group_permission(user, self.required_groups)


class IsModerator(permissions.BasePermission):
    """
        Permission class for moderator role only
    """ 
    require_groups = ['moderator']
    
    def has_object_permission(self, request, view, obj):
        user = request.user
        if self.required_groups is None or self.required_groups == []:
            return False
        return _has_group_permission(user, self.required_groups)
    
    def has_permission(self, request, view):
        user = request.user
        if self.required_groups is None or self.required_groups == []:
            return False
        return _has_group_permission(user, self.required_groups)
    

class IsOwnerOrAdmin(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if _is_in_group(request.user, "moderator"):
            # print(request.user.id)
            return True
        try: 
            user = User.objects.get(pk=obj.user.id) 
        except: 
            return False 

        if request.user.id == user.id and _is_in_group(request.user, "user"):
            return True

        return False
