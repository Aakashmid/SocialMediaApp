from django.shortcuts import get_object_or_404 
from django.http import Http404
from post.models import Post, Like
from user.models import Profile
from .models import Comment
from .serializers import CommentSerializer

from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import  generics


# Create your views here.


class  CommentListCreate(generics.ListCreateAPIView):
    serializer_class=CommentSerializer
    def get_queryset(self):
        """
        This view  return a list of all comments or replies on a post or comment , specified postId in url and commentId 
        """
        postId=self.kwargs.get('postId',None)
        commentId=self.kwargs.get('commentId',None)
        if postId and  not Post.objects.filter(id=postId).first() :
            raise  Http404("Post of given id does not exists")
        if commentId is None:
            queryset=Comment.objects.filter(post__id=postId,parent=None).order_by( '-time')  # order by time in descending orderfetch all comments of a post 
        else:
            queryset=Comment.objects.filter(parent=self.kwargs['commentId']) # fetch replies of comment 
        return queryset
    


    def perform_create(self, serializer):
        user = get_object_or_404(Profile, user=self.request.user)        # Get the Profile object  of the current user
        if self.kwargs.get('commentId', None) is not None:               # for handling reply on post 
            parent = get_object_or_404(Comment, id=self.kwargs['commentId'])
            serializer.save(post=parent.post, user=user, parent=parent)
        # Save the comment with the related post, author, and parent (if provided)
        else:
            post = get_object_or_404(Post, id=self.kwargs['postId'])         # Get the Post by postId
            serializer.save(post=post, user=user)



class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class=CommentSerializer



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_comment(request,pk=None):  # handle like on reply or comment
    comment=get_object_or_404(Comment,id=pk)
    user=request.user.profile
    if Like.objects.filter(user=user,comment=comment).first() is  not None:
        Like.objects.get(user=user,comment=comment).delete()
        liked=False
    else:
        Like.objects.create(user=user,comment=comment)
        liked=True
    return Response({'liked':liked})
