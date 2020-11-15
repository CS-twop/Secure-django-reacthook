from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from .views import UserCreate, HelloWorldView, UserList, UserDetail, PostCreate, PostList, CommentCreate, CommentList


urlpatterns = [
    # User 
    path(
        'user/create/', 
        UserCreate.as_view(), 
        name='create_user'
    ),
    path(
        'users/',
        UserList.as_view(),
        name='user_list'    
    ),
    path(
        'users/<int:pk>/',
        UserDetail.as_view(),
        name='user_detail'
    ),
    # Post
    path(
        'post/create/', 
        PostCreate.as_view(),
        name='create_post'
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
        'hello/', 
        HelloWorldView.as_view(),
        name='hello_world'
    )
]
