from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from .views import (UserCreate, UserList, \
    PostCreate, PostList, PostUpdate, \
    CommentCreate, CommentList, CommentUpdate)

urlpatterns = [
    # User 
    path(
        'user/create/', 
        UserCreate.as_view(), 
        name='create_user'
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
