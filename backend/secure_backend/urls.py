from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from .views import (UserCreate, UserGet, \
    PostCreate, PostList, PostUpdate, PostDelete, \
    CommentCreate, CommentUpdate, CommentDelete, \
    LogoutAndBlacklistRefreshToken)

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
    ),
    path(
        'token/blacklist/',
        LogoutAndBlacklistRefreshToken.as_view(),
        name='token_blacklist'
    )
]
