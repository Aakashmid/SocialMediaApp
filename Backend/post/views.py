from django.shortcuts import get_object_or_404
from .serializers import PostSerializer
from rest_framework import generics
from rest_framework.views import APIView
from .models import Post, Like, SavedPost
from user.models import Profile

# from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status, viewsets
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend


# from rest_framework.permissions import AllowAny,IsAuthenticated
# from rest_framework.exceptions import PermissionDenied


# Create your views here.


class PostviewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    search_fields = ['text', 'creator__user__username']  # has to add tags
    filter_backends = [SearchFilter]
    # filter_backends = [DjangoFilterBackend,SearchFilter]  # for filter also
    # filterset_fields = ['creator__user__username']  # create custom filters for custom fields like followers count etc .

    def perform_create(self, serializer):
        '''
        Assigning author of post  current user
        '''
        if serializer.is_valid():
            creator = get_object_or_404(Profile, user=self.request.user)
            serializer.save(creator=creator)

    @action(detail=True, methods=['post'], url_path='toggle-like')
    def like_post(self, request, pk=None):
        '''
        This view handles like a post and checks if the user has already liked it
        '''
        post = get_object_or_404(Post, pk=pk)
        user = request.user.profile
        if Like.objects.filter(user=user, post=post).first() is not None:
            Like.objects.get(user=user, post=post).delete()
            liked = False
        else:
            Like.objects.create(user=user, post=post)  # Create a new Like object
            liked = True
        return Response({'liked': liked}, status=status.HTTP_200_OK)


#  view for handling save a post  and  list saved post like functionality
class SaveUnsavePostView(APIView):
    def post(self, request, *args, **kwargs):
        post_id = kwargs.get('post_id', None)
        user = request.user.profile  #  here user is profile object
        # if post_id is not None:
        if SavedPost.objects.filter(post=post_id, user=user).exists():
            SavedPost.objects.get(post=post_id, user=user).delete()
            return Response({'detail': 'unsaved post successfully', 'isSaved': False})
        else:
            try:
                post = Post.objects.get(pk=post_id)
                SavedPost.objects.create(post=post, user=user)
                return Response({'detail': 'saved post successfully', 'isSaved': True})
            except Post.DoesNotExist:
                return Response({'detail': 'post not found'}, status=status.HTTP_404_NOT_FOUND)


# fetch profile posts and saved posts
class ProfilePostsViewSet(viewsets.ViewSet):
    def profile_posts(self, request, user_id=None):
        if user_id is not None:
            # Profile posts logic
            queryset = Post.objects.filter(creator=user_id)
            serializer = PostSerializer(queryset, many=True, context={'request': request})
            return Response(serializer.data)
        return ValueError("User ID is required for profile posts.")

    def saved_posts(self, request):
        # Saved posts logic
        user = request.user.profile
        if SavedPost.objects.filter(user=user).exists():
            saved_posts = SavedPost.objects.filter(user=user)
            posts = [obj.post for obj in saved_posts]
            serializer = PostSerializer(posts, many=True, context={'request': request})
            return Response(serializer.data)
        return Response([])
