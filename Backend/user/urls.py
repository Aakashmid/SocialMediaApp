from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProfileListView.as_view(), name='profiles'),
    # path('ch/',views.SearchView.as_view(),name='search-post-user'),
    path('<int:user_id>/', views.ProfileDetailView.as_view(), name='user-profile'),
    path('<int:user_id>/remove-account/', views.remove_account, name='user-remove-account'),
    path('<int:pk>/follow/', views.FollowView.as_view({'post': 'follow'}), name='follow'),  # pk is primary key of  profile object to follow
    path('<int:pk>/unfollow/', views.FollowView.as_view({'delete': 'unfollow'}), name='unfollow'),
    path('<int:pk>/followers/', views.FollowView.as_view({'get': 'followers'}), name='user-followers'),
    path(
        '<int:pk>/followings/',
        views.FollowView.as_view({'get': 'followings'}),
        name='user-followings',
    ),
    path('friends/', views.FollowView.as_view({'get': 'friends'}), name='friends'),  # get current user friends
    path(
        '<int:user_id>/mutual-friends/',
        views.FollowView.as_view({'get': 'friends'}),
        name='friends',
    ),  # get mutual friends of two users (user_id is id of other user)
]
