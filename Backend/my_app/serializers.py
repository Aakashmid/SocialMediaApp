from rest_framework import serializers
from django.contrib.auth.models import User
from my_app.models import Comment,Like,Profile,Post,Follower

# ------------------------------------------------------------------------- #

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','password','email']
        
# ------------------------------------------------------------------------- #


class ProfileSerializer(serializers.ModelSerializer):
    posts_count=serializers.SerializerMethodField()
    username=serializers.SerializerMethodField()
    full_name=serializers.SerializerMethodField()
    followers=serializers.SerializerMethodField()
    followings=serializers.SerializerMethodField()
    isFollow=serializers.SerializerMethodField()
    profileImg=serializers.SerializerMethodField()
    class Meta:
        model=Profile
        fields=['id','bio','username','profileImg','full_name','posts_count','date_joined','isFollow','followers','followings'] 
    
    def get_posts_count(self,profile):
        return profile.posts.count()
    def get_full_name(self,profile):
        return profile.user.first_name + ' ' + profile.user.last_name

    def get_username(self,profile):
        return profile.user.username

    def get_followers(self,profile):
        return profile.followers.count()
    
    def get_followings(self,profile):
        return profile.followings.count()
    
    def get_isFollow(self,profile):
        # return True if Follower.objects.filter(Author=profile,follower=self.request.user.profile) else False
        return True
    def get_profileImg(self, profile):
        request = self.context.get('request')
        if profile.profileImg:
            return request.build_absolute_uri(profile.profileImg.url)
        return None
    
# PostSerializer.author=ProfileSerializer()
# PostSerializer.Meta.fields=['author','id','likes','comments']
# ------------------------------------------------------------------------- #
class PostSerializer(serializers.ModelSerializer):
    comments=serializers.SerializerMethodField()
    likes=serializers.SerializerMethodField()
    author=ProfileSerializer(read_only=True)
    class Meta:
        model=Post
        fields=['id','author','text','postImg', 'comments','likes','isLiked','publish_time','updated_time']
        extra_kwargs={'author':{'read_only':True},'isLiked':{'read_only':True}}
    
    def get_comments(self,obj):
        return obj.comments.count()
    
    def get_likes(self,obj):
        return obj.likes.count()
# ------------------------------------------------------------------------- #

class CommentSerializer(serializers.ModelSerializer):
    replies=serializers.SerializerMethodField()
    likes=serializers.SerializerMethodField()
    author=ProfileSerializer(read_only=True)
    class Meta:
        model=Comment
        fields=['id','author','post','text','parent','replies','likes','isLiked']
        extra_kwargs={'author':{'read_only':True},'parent':{'read_only':True},'post':{'read_only':True}}

    def get_replies(self,obj):
        '''get replies count'''
        replies=Comment.objects.filter(parent=obj).count()
        return replies
    
    def get_likes(self,obj):
        '''get likes count'''
        likes=Like.objects.filter(Comment=obj).count()
        return likes
    
# ------------------------------------------------------------------------- #