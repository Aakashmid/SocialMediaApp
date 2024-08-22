
from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views

router=DefaultRouter()

router.register('posts',views.PostviewSet,basename='Post')
# router.register('profile/<int:pk>/',views.ProfileView,basename='Profile')

urlpatterns = [
    path('', include(router.urls)),

    path('profiles/',views.ProfileListView.as_view(),name='profiles'),
    path('profile/',views.ProfileDetailView.as_view(),name='my-profile'),
    path('profile/<int:id>',views.AnotherProfileView.as_view(),name='user-profile'),

    path('comments/<int:postId>/',views.CommentListCreate.as_view(),name='post-comments'),
    path('comments/<int:postId>/<int:commentId>',views.CommentListCreate.as_view(),name='post-comments'),
    
    # path('followers/<int:userId>/',views.FollowersList.as_view(),name='user-followers'),  # here userId is profile.id
    # path('followings/<int:userId>/',views.FollowingsList.as_view(),name='user-followings'),  # here userId is profile.id

]
