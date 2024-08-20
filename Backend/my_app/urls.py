
from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views

router=DefaultRouter()

router.register('posts',views.PostviewSet,basename='Post')
# router.register('profile/<int:pk>/',views.ProfileView,basename='Profile')

urlpatterns = [
    path('', include(router.urls)),

    path('users/',views.ProfileListView.as_view(),name='profile'),
    path('profile/<int:pk>/',views.ProfileDetailView.as_view(),name='profile'),

    path('comments/<int:postId>/',views.CommentListCreate.as_view(),name='post-comments'),
    path('comments/<int:postId>/<int:commentId>',views.CommentListCreate.as_view(),name='post-comments')
]
