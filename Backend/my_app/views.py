from django.contrib.auth.models import User
from drf_spectacular.utils import extend_schema
from django.http import Http404
from rest_framework.viewsets import ModelViewSet,ViewSet
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from rest_framework import status 
from rest_framework.generics import ListAPIView,RetrieveUpdateAPIView,ListCreateAPIView
from rest_framework.filters import SearchFilter

from rest_framework.decorators import action
from rest_framework import status
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .serializers import ProfileSerializer,PostSerializer,CommentSerializer,UserSerializer , LoginSerializer
from .models import Profile,Post,Like, Comment, Follower
# Create your views here.


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def custom_404_view(request,exception):
    return Response(
        data={
            "error": "The resource you are looking for was not found."
        },
        status=status.HTTP_404_NOT_FOUND
    )



# for authentication
@extend_schema(
        request=UserSerializer,
        responses={200:UserSerializer,404:None}
)
@api_view(['POST'])
@permission_classes([AllowAny])
def signupHandler(request):
    serializer=UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user=User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token=Token.objects.create(user=user)
        return Response({'token':token.key,'user':serializer.data})  # serializer.data is all field of user , defined in UserSerializer

    return Response({'error':serializer.errors},status=status.HTTP_409_CONFLICT)


@extend_schema(
    request=LoginSerializer,
)
@api_view(['POST'])
@permission_classes([AllowAny])
def loginHandler(request):
    user=get_object_or_404(User,username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({'error':'user not found'},status=status.HTTP_404_NOT_FOUND)
    
    token ,created=Token.objects.get_or_create(user=user)
    serializer=UserSerializer(instance=user)
    return Response({'token':token.key,'user':serializer.data},status=status.HTTP_200_OK)


@api_view(['POST'])
def logoutHandler(request):
    try:
        token = Token.objects.get(user=request.user)
        # Delete the token, which logs the user out
        token.delete()
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
    except Token.DoesNotExist:
        return Response({"error": "Invalid token or user not logged in"}, status=status.HTTP_400_BAD_REQUEST)


#  list searched users
class ProfileListView(ListAPIView):
    queryset=Profile.objects.all()
    serializer_class=ProfileSerializer

    search_fields=['bio','user__username']  # search profiles by username or bio
    filter_backends=[SearchFilter]

# profile view for getting profile data and updating profile
class ProfileDetailView(RetrieveUpdateAPIView):
    serializer_class=ProfileSerializer
    queryset=Profile.objects.all()

    def get_object(self):
        user_id=self.kwargs.get('user_id')
        if user_id:
            return get_object_or_404(Profile,user__id=user_id)
        else:
            raise ValueError("username is required")
        
    # have to modify update (for fullname etc)
    def perform_update(self, serializer):
        instance=self.get_object()
        if instance.user != self.request.user:
            raise PermissionDenied("You don't have permission to change this data !")
        if serializer.is_valid():
            user=self.request.user
            serializer.save(user=user)


# Follower model related request handler
class FollowView(ViewSet):
    def follow(self,request,pk):
        usertoFollow=get_object_or_404(Profile,id=pk)
        follower=request.user.profile
        if usertoFollow == follower:
            return Response({"detail": "You cannot follow or unfollow yourself!"}, status=status.HTTP_400_BAD_REQUEST)
        if usertoFollow.followers.filter(follower=follower).exists():
            return Response({"detail":f"Already following {usertoFollow.user.username}!"},status=status.HTTP_201_CREATED)
        Follower.objects.create(toFollowing=usertoFollow,follower=follower)
        return Response({'message':f'You are now following {usertoFollow.user.username}'})


    def unfollow(self,request,pk):
        toUnFollow=get_object_or_404(Profile,id=pk)
        follower=request.user.profile
        if toUnFollow == follower:
            return Response({"detail": "You cannot follow or unfollow yourself!"}, status=status.HTTP_400_BAD_REQUEST)
        Follower.objects.get(toFollowing=toUnFollow,follower=follower).delete()
        return Response({'message':f'unfollowed {toUnFollow.user.username}'})
    
    # get all followers
    def followers(self,request,pk):
        toFollwoing=get_object_or_404(Profile,id=pk)
        data=[obj.follower for obj  in toFollwoing.followers.all()]
        serialize=ProfileSerializer(data,many=True,context={'request':request})
        return Response(serialize.data)
    # get all followings

    def followings(self,request,pk):
        follower=get_object_or_404(Profile,id=pk)
        data=[obj.toFollowing for obj in follower.followings.all()]
        serialize=ProfileSerializer(data,many=True,context={'request':request})
        return Response(serialize.data)
    
    def friends(self,request,user_id=None):
        '''
        getting friends of current user and mutual friends of two users
        '''
        user= request.user.profile
        if user_id is not None:
             # Get the other user profile
            other_user = get_object_or_404(Profile, id=user_id)

            # Get the followers and followings of the other user
            other_user_followers = other_user.followers.all().values_list('follower', flat=True)
            other_user_followings = other_user.followings.all().values_list('toFollowing', flat=True)

            # Get mutual friends by comparing followers and followings
            mutual_friend_ids = set(user.followers.all().values_list('follower', flat=True)).intersection(other_user_followings)
            mutual_friend_ids.update(set(user.followings.all().values_list('toFollowing', flat=True)).intersection(other_user_followers))
            
            mutual_friends = Profile.objects.filter(id__in=mutual_friend_ids)
            serializer = ProfileSerializer(mutual_friends, many=True, context={'request': request})
        else:
            followers=user.followers.all().values_list('follower',flat=True)  # returns ids of follower 
            followings=user.followings.all().values_list('toFollowing',flat=True)
            friend_ids=set(followers).intersection(followings)
            friends=Profile.objects.filter(id__in=friend_ids)
            serializer=ProfileSerializer(friends,many=True,context={'request':request})
        return Response(serializer.data)

  
class ProfilePostsView(ListAPIView):
    serializer_class=PostSerializer
    def get_queryset(self):
        creator=get_object_or_404(Profile,id=self.kwargs.get('user_id',None))
        queryset=Post.objects.filter(creator=creator) #filter post by author
        return queryset


class PostviewSet(ModelViewSet):
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
        pass

class  CommentListCreate(ListCreateAPIView):
    serializer_class=CommentSerializer
    def get_queryset(self):
        """
        This view  return a list of all comments or replies on a post or comment , specified postId in url and commentId 
        """
        postId=self.kwargs.get('postId',None)
        commentId=self.kwargs.get('commentId',None)
        if postId and  not Post.objects.filter(id=postId).first() :
            raise  Http404("Post of given id does not exits")
        if commentId is None:
            queryset=Comment.objects.filter(post__id=postId).order_by( '-time')  # order by time in descending orderfetch all comments of a post 
        else:
            queryset=Comment.objects.filter(parent=self.kwargs['commentId']) # fetch replies of comment 
        return queryset
    

    def perform_create(self, serializer):
        post = get_object_or_404(Post, id=self.kwargs['postId'])  # Get the Post by postId
        user = get_object_or_404(Profile, user=self.request.user)  # Get the Profile of the current user
        if self.kwargs.get('commentId', None) is not None:  # for handling reply on post 
            parent = get_object_or_404(Comment, id=self.kwargs['commentId'])
            serializer.save(post=post, author=user, parent=parent)
        # Save the comment with the related post, author, and parent (if provided)
        else:
            serializer.save(post=post, user=user)



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

