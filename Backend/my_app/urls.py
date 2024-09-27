
from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views
router=DefaultRouter()

router.register('posts',views.PostviewSet,basename='Post')
# router.register('profile/<int:pk>/',views.ProfileView,basename='Profile')

urlpatterns = [
    path('', include(router.urls)),

    path('users/',views.ProfileListView.as_view(),name='profiles'),
    path('profile/<str:username>/',views.ProfileDetailView.as_view(),name='profile'), 
    path('profile/<str:username>/posts',views.ProfilePostsView.as_view(),name='user-posts'),
    
    path('follow/<int:pk>/',views.FollowView.as_view({'post':'follow'}),name='follow'),  # pk is pk of user profile to follow
    path('unfollow/<int:pk>/',views.FollowView.as_view({'delete':'unfollow'}),name='unfollow'),
    path('followers/<int:pk>/',views.FollowView.as_view({'get':'followers'}),name='followers'),
    path('followings/<int:pk>/',views.FollowView.as_view({'get':'followings'}),name='followings'),
    path('followings/<int:pk>/',views.FollowView.as_view({'get':'followings'}),name='followings'),
    path('friends/<int:pk>/',views.FollowView.as_view({'get':'friends'}),name='friends'),

    path('comments/<int:postId>/',views.CommentListCreate.as_view(),name='post-comments'),
    path('replies/<int:postId>/<int:commentId>',views.CommentListCreate.as_view(),name='comments-replies'),
    
]

