from django.shortcuts import get_object_or_404
from .serializers import PostSerializer
from .models import Post , Like
from user.models import Profile

# from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status, viewsets
from rest_framework.filters import SearchFilter

# from rest_framework.permissions import AllowAny,IsAuthenticated
# from rest_framework.exceptions import PermissionDenied


# Create your views here.

class PostviewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    search_fields = ['text', 'creator__user__username']  # has to add tags
    filter_backends = [SearchFilter]

    def perform_create(self, serializer):
        '''
        Assigning author of post  current user
        '''
        if serializer.is_valid():
            creator = get_object_or_404(Profile, user=self.request.user)
            serializer.save(creator=creator)


    @action(detail=True, methods=['post'],url_path='toggle-like')
    def like_post(self, request, pk=None):
        '''
        This view handles like a post and checks if the user has already liked it
        '''
        post = get_object_or_404(Post, pk=pk)
        user = request.user.profile
        if Like.objects.filter(user=user,post=post).first() is not None:
            Like.objects.get(user=user,post=post).delete()
            liked = False
        else:
            Like.objects.create(user=user,post=post)  # Create a new Like object
            liked = True
        return Response({'liked': liked}, status=status.HTTP_200_OK)


    @action(detail=True,methods=['post']) 
    def save_post(self,request,pk=None):
        '''
        This view handles save a post and checks if the user has already saved it and unsave it 
        '''
        return Response({'detail':'Post  saved'})


    @action(detail=False,methods=['get'],url_path='saved')
    def get_saved_posts(self,request):
        '''will return saved post of a user if has'''
        return Response({'saved posts':[]})
        # pass
