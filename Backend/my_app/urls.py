
from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views
router=DefaultRouter()

router.register('posts',views.PostviewSet,basename='Post')
# router.register('profile/<int:pk>/',views.ProfileView,basename='Profile')

urlpatterns = [
    path('', include(router.urls)),

#    GET /posts/ (List all posts)
#    GET /posts/{pk}/ (Retrieve a specific post)
#    POST /posts/ (Create a new post)
#    PUT /posts/{pk}/ (Update a post)
#    PATCH /posts/{pk}/ (Partial update a post)
#    DELETE /posts/{pk}/ (Delete a post)
#    POST /posts/{pk}/like_post/ (Like/Unlike a post)

    path('profiles/',views.ProfileListView.as_view(),name='profiles'),
    path('profile/',views.ProfileDetailView.as_view(),name='profile'),
    path('profile/<int:profile_id>/',views.ProfileDetailView.as_view(),name='profile'), 
    path('profile/<int:profile_id>/posts',views.ProfilePostsView.as_view(),name='profile-posts'),
    
    path('follow/<int:pk>/',views.FollowView.as_view({'post':'follow'}),name='follow'),  # pk is pk of user profile to follow
    path('unfollow/<int:pk>/',views.FollowView.as_view({'post':'unfollow'}),name='unfollow'),
    path('followers/<int:pk>/',views.FollowView.as_view({'get':'followers'}),name='followers'),
    path('followings/<int:pk>/',views.FollowView.as_view({'get':'followings'}),name='followings'),

    path('comments/<int:postId>/',views.CommentListCreate.as_view(),name='post-comments'),
    path('replies/<int:postId>/<int:commentId>',views.CommentListCreate.as_view(),name='comments-replies'),
    
]

