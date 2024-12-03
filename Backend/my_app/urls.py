
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
    # path('search/',views.SearchView.as_view(),name='search-post-user'),
    path('users/<int:user_id>/',views.ProfileDetailView.as_view(),name='user-profile'), 
    path('users/<int:user_id>/remove-account/',views.remove_account,name='user-remove-account'), 
    path('users/<int:user_id>/posts',views.ProfilePostsView.as_view(),name='user-posts'),
    
    path('users/<int:pk>/follow/',views.FollowView.as_view({'post':'follow'}),name='follow'),    # pk is pk of user profile to follow
    path('users/<int:pk>/unfollow/',views.FollowView.as_view({'delete':'unfollow'}),name='unfollow'),
    path('users/<int:pk>/followers/',views.FollowView.as_view({'get':'followers'}),name='user-followers'),
    path('users/<int:pk>/followings/',views.FollowView.as_view({'get':'followings'}),name='user-followings'),
    path('users/friends/',views.FollowView.as_view({'get':'friends'}),name='friends'),           # get current user friends
    path('users/<int:user_id>/mutual-friends/',views.FollowView.as_view({'get':'friends'}),name='friends'),   # get current user friends


    path('posts/<int:postId>/comments/',views.CommentListCreate.as_view(),name='post-comments'),
    path('comments/<int:pk>/',views.CommentReplyUpdateDestroyView.as_view(),name='comment-reply'),                  # remove,update ,get comment by id
    path('comments/<int:pk>/like/',views.like_comment,name='like-comment-reply'),                  # like a reply or comment 
    path('comments/<int:commentId>/replies/',views.CommentListCreate.as_view(),name='comments-replies'),
    # path('replies/<int:commentId>',views.CommentListCreate.as_view(),name='comments-replies'),
    
]

