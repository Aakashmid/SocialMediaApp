
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
    path('profile/',views.ProfileDetailView.as_view(),name='profile'),
    path('profile/<int:profile_id>/',views.ProfileDetailView.as_view(),name='profile'), 
    path('follow/<int:pk>/',views.FollowView.as_view({'post':'follow'}),name='follow'),  # pk is pk of user profile to follow
    path('unfollow/<int:pk>/',views.FollowView.as_view({'post':'unfollow'}),name='unfollow'),
    path('isFollowing/<int:pk>/',views.FollowView.as_view({'get':'isFollowing'}),name='isfollowing'),
    path('profile/<int:profile_id>/posts',views.ProfilePostsView.as_view(),name='profile-posts'),

    path('comments/<int:postId>/',views.CommentListCreate.as_view(),name='post-comments'),
    path('comments/<int:postId>/<int:commentId>',views.CommentListCreate.as_view(),name='post-comments'),
    
    # path('followers/<int:userId>/',views.FollowersList.as_view(),name='user-followers'),  # here userId is profile.id
    # path('followings/<int:userId>/',views.FollowingsList.as_view(),name='user-followings'),  # here userId is profile.id

]
