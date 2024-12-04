from django.urls import path 
from . import views

urlpatterns = [
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
    
]
