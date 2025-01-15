from django.contrib.auth.models import User
from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer, ProfileSerializer, LoginSerializer
from post.serializers import PostSerializer
from .models import Profile, Follower
from post.models import Post


from rest_framework.viewsets import ViewSet
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status, generics
from rest_framework.filters import SearchFilter
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.exceptions import PermissionDenied


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def custom_404_view(request, exception):
    return Response(
        data={"error": "The resource you are looking for was not found."},
        status=status.HTTP_404_NOT_FOUND,
    )


# for authentication
@extend_schema(request=UserSerializer, responses={200: UserSerializer, 404: None})
@api_view(['POST'])
@permission_classes([AllowAny])
def signupHandler(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({'token': token.key, 'user': serializer.data})  # serializer.data is all field of user , defined in UserSerializer

    return Response({'error': serializer.errors}, status=status.HTTP_409_CONFLICT)


@extend_schema(
    request=LoginSerializer,
)
@api_view(['POST'])
@permission_classes([AllowAny])
def loginHandler(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({'error': 'user not found'}, status=status.HTTP_404_NOT_FOUND)

    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def remove_account(request, user_id=None):
    user = request.user
    if user_id and user.id == int(user_id):
        User.objects.delete(user=user)
        return Response({'status': "success", 'message': 'successfully deleted user account'})
    return Response({'status': "failed", 'message': 'userid is incorrect '})


@api_view(['POST'])
def logoutHandler(request):
    try:
        token = Token.objects.get(user=request.user)
        # Delete the token, which logs the user out
        token.delete()
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
    except Token.DoesNotExist:
        return Response({"error": "Invalid token or user not logged in"}, status=status.HTTP_400_BAD_REQUEST)


class ProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    search_fields = ['bio', 'user__username']  # search profiles by username or bio
    filter_backends = [SearchFilter]


# view for getting profile data and updating profile
class ProfileDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        if user_id:
            return get_object_or_404(Profile, user__id=user_id)
        else:
            raise ValueError("username is required")

    # Pass additional context to the serializer
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request  # Pass the request object
        return context

    # have to modify update (for fullname etc)
    def perform_update(self, serializer):
        instance = self.get_object()
        if instance.user != self.request.user:
            raise PermissionDenied("You don't have permission to change this data !")
        if serializer.is_valid():
            user = self.request.user
            serializer.save(user=user)


# Follower model related request handler
class FollowView(ViewSet):
    def follow(self, request, pk):
        usertoFollow = get_object_or_404(Profile, user=pk)
        follower = request.user.profile
        if usertoFollow == follower:
            return Response(
                {"detail": "You cannot follow or unfollow yourself!"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if usertoFollow.followers.filter(follower=follower).exists():
            return Response(
                {"detail": f"Already following {usertoFollow.user.username}!"},
                status=status.HTTP_201_CREATED,
            )
        Follower.objects.create(toFollowing=usertoFollow, follower=follower)
        return Response({'message': f'You are now following {usertoFollow.user.username}'})

    def unfollow(self, request, pk):
        toUnFollow = get_object_or_404(Profile, user=pk)
        follower = request.user.profile
        if toUnFollow == follower:
            return Response(
                {"detail": "You cannot follow or unfollow yourself!"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        Follower.objects.get(toFollowing=toUnFollow, follower=follower).delete()
        return Response({'message': f'unfollowed {toUnFollow.user.username}'})

    # get all followers
    def followers(self, request, pk):
        toFollwoing = get_object_or_404(Profile, user=pk)
        queryset = toFollwoing.followers.all()
        username = request.query_params.get('username', None)
        if username:
            queryset = queryset.filter(follower__user__username__icontains=username)
        data = [obj.follower for obj in queryset]
        serialize = ProfileSerializer(data, many=True, context={'request': request})
        return Response(serialize.data)

    # get all followings
    def followings(self, request, pk):
        follower = get_object_or_404(Profile, user=pk)
        queryset = follower.followings.all()
        username = request.query_params.get('username', None)
        if username:
            queryset = queryset.filter(toFollowing__user__username__icontains=username)
        data = [obj.toFollowing for obj in queryset]
        serialize = ProfileSerializer(data, many=True, context={'request': request})
        return Response(serialize.data)

    def friends(self, request, user_id=None):  # here user_id is the id of the user whose with we are getting mutual freinds
        '''
        getting friends of current user and mutual friends of two users
        '''
        user = request.user.profile
        username = request.query_params.get('username', None)

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
            if username:
                mutual_friends = mutual_friends.filter(user__username__icontains=username)
            serializer = ProfileSerializer(mutual_friends, many=True, context={'request': request})
        else:
            followers = user.followers.all().values_list('follower', flat=True)  # returns ids of follower
            followings = user.followings.all().values_list('toFollowing', flat=True)
            friend_ids = set(followers).intersection(followings)
            friends = Profile.objects.filter(user__id__in=friend_ids)
            if username:
                friends = friends.filter(user__username__icontains=username)
            serializer = ProfileSerializer(friends, many=True, context={'request': request})
        return Response(serializer.data)
