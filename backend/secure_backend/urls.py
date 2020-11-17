from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from .views import (UserCreate, UserList, UserGet, \
    PostCreate, PostList, PostUpdate, PostDelete, \
    CommentCreate, CommentList, CommentUpdate, CommentDelete)

urlpatterns = [
    # User 
    path(
        'user/create/', 
        UserCreate.as_view(), 
        name='create_user'
    ),
    path( 
        'user/',
        UserGet.as_view(),
        name='user_get'
    ),
    # Post
    path(
        'post/create/', 
        PostCreate.as_view(),
        name='create_post'
    ), 
    path(
        'post/update/',
        PostUpdate.as_view(),
        name='post_update'
    ),
    path(
        'posts/',
        PostList.as_view(),
        name='post_list'
    ),
    path(
        'post/delete/',
        PostDelete.as_view(),
        name='post_delete'
    ),
    # Comment
    path(
        'comment/create/', 
        CommentCreate.as_view(),
        name='create_comment'
    ),
    path(
        'comments/',
        CommentList.as_view(),
        name='comment_list'
    ),
    path( 
        'comment/update/',
        CommentUpdate.as_view(),
        name='comment update'
    ),
    path(
        'comment/delete/',
        CommentDelete.as_view(),
        name='comment_delete'
    ),
    # Token 
    path(
        'token/obtain/', 
        jwt_views.TokenObtainPairView.as_view(),
        name='token_create'
    ),
    path(
        'token/refresh/',
        jwt_views.TokenRefreshView.as_view(),
        name='token_refresh'
    )
]
