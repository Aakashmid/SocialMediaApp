from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Follower
import os


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


# inplace of userserializer use register serializer in register view   (have to do)
class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'full_name', 'email']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        full_name = validated_data.pop('full_name')
        name_parts = full_name.split(' ', 1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ""
        user = User.objects.create_user(**validated_data, first_name=first_name, last_name=last_name)
        return user

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['full_name'] = f"{instance.first_name} {instance.last_name}".strip()
        return representation


# ---------------------------Profile serializer---------------------------------------------- #


class ProfileSerializer(serializers.ModelSerializer):
    posts_count = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()
    followings_count = serializers.SerializerMethodField()
    isFollowed = serializers.SerializerMethodField()
    # profileImg=serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    id = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            'id',
            'bio',
            'username',
            'email',
            'profileImg',
            'full_name',
            'date_of_birth',
            'gender',
            'posts_count',
            'date_joined',
            'isFollowed',
            'followers_count',
            'followings_count',
        ]

    def get_id(self, profile):
        return profile.user.id

    def get_posts_count(self, profile):
        return profile.posts.count()

    def get_full_name(self, profile):
        return profile.user.first_name + ' ' + profile.user.last_name

    def get_username(self, profile):
        return profile.user.username

    def get_email(self, profile):
        return profile.user.email

    def get_followers_count(self, profile):
        return profile.followers.count()

    def get_followings_count(self, profile):
        return profile.followings.count()

    def get_isFollowed(self, profile):  # find where a profile is followed by current user
        request = self.context.get('request', None)
        if request is None:
            return False
        return True if Follower.objects.filter(toFollowing=profile, follower=request.user.profile).exists() else False

    # def get_profileImg(self, profile):
    # request = self.context.get('request')
    # if profile.profileImg:
    #     return request.build_absolute_uri(profile.profileImg.url)
    # return None

    def validate(self, attrs):
        profileImg = attrs.get('profileImg', None)
        if profileImg:
            # Check MIME type (requires file-like object)
            if hasattr(profileImg, 'content_type') and not profileImg.content_type.startswith('image/'):
                raise serializers.ValidationError("Uploaded file is not a valid image.")

            # Check file extension
            valid_extensions = [
                '.jpg',
                '.jpeg',
                '.png',
                '.gif',
                '.webp',
            ]
            ext = os.path.splitext(profileImg.name)[1].lower()
            if ext not in valid_extensions:
                raise serializers.ValidationError("Uploaded file must be an image (JPG, PNG, GIF).")

        return attrs

    def update(self, profile_instance, validated_data):
        # update full_name if provided
        full_name = self.initial_data.get("full_name", None)
        print(validated_data)
        if full_name is not None:
            first_name, last_name = full_name.split(" ", 1)
            profile_instance.user.first_name, profile_instance.user.last_name = first_name.title(), last_name.title()
            profile_instance.user.save()

        if validated_data.get('bio', None) is not None:
            profile_instance.bio = validated_data.get('bio')

        profile_instance.save()
        return super().update(profile_instance, validated_data)  # calling default update for author fiels which not required custom logic


### create serializer  for profile which is used within post data


class PostProfileReadSerializer(serializers.ModelSerializer):  # here profile is creator of a post
    '''
    profile read serializer which is used in post data
    '''

    isFollowed = serializers.SerializerMethodField()
    id = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id', 'username', 'full_name', 'isFollowed', 'profileImg']

    def get_isFollowed(self, profile):  # find where a profile is followed by current user
        request = self.context.get('request', None)
        if request is None:
            return False
        return True if Follower.objects.filter(toFollowing=profile, follower=request.user.profile).exists() else False

    def get_id(self, profile):
        return profile.user.id

    def get_full_name(self, profile):
        return profile.user.first_name + ' ' + profile.user.last_name

    def get_username(self, profile):
        return profile.user.username
