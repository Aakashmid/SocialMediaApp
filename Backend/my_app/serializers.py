from rest_framework import serializers
from .models import Profile,Post,Like, Comment, Follower

class PostSerialier(serializers.ModelSerializer):
    class Meta:
        model=Post
        fields=['author','text','publish_time','updated_time','postImg']


class ProfileSerializer(serializers.ModelSerializer):
    pass

class FollowerSerializer(serializers.ModelSerializer):
    pass

class CommentSerializer(serializers.ModelSerializer):
    pass

class LikeSerializer(serializers.ModelSerializer):
    pass