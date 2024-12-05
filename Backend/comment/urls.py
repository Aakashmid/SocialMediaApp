from django.urls import path
from . import views

urlpatterns = [
    path('posts/<int:postId>/',views.CommentListCreate.as_view(),name='post-comments-list'),
    path('<int:pk>/',views.CommentDetailView.as_view(),name='comment-reply-detail'),                  # remove,update ,get comment by id
    path('<int:pk>/like/',views.like_comment,name='comment-reply-like'),                                   # like a reply or comment 
    path('<int:commentId>/replies/',views.CommentListCreate.as_view(),name='comment-replies-list'),
]
