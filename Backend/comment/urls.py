from django.urls import path
from . import views

urlpatterns = [
    
path('posts/<int:postId>/comments/',views.CommentListCreate.as_view(),name='post-comments'),
    path('comments/<int:pk>/',views.CommentReplyUpdateDestroyView.as_view(),name='comment-reply'),                  # remove,update ,get comment by id
    path('comments/<int:pk>/like/',views.like_comment,name='like-comment-reply'),                  # like a reply or comment 
    path('comments/<int:commentId>/replies/',views.CommentListCreate.as_view(),name='comments-replies'),
    # path('replies/<int:commentId>',views.CommentListCreate.as_view(),name='comments-replies'),
]
