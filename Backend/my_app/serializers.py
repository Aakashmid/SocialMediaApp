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
    isFollowed=serializers.SerializerMethodField()
    profileImg=serializers.SerializerMethodField()
    class Meta:
        model=Profile
        fields=['id','bio','username','profileImg','full_name','posts_count','date_joined','isFollowed','followers','followings'] 
    
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
    
    def get_isFollowed(self,profile): # find where a profile is followed by current user
        request= self.context.get('request')
        if request.user.is_anonymous:  # this line is just for development 
            return False 
        return True if Follower.objects.filter(Author=profile,follower=request.user.profile)   else False
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
    isLiked=serializers.SerializerMethodField()
    author=ProfileSerializer(read_only=True)
    class Meta:
        model=Post
        fields=['id','author','text','postImg', 'comments','likes','isLiked','publish_time','updated_time']
        extra_kwargs={'author':{'read_only':True},'isLiked':{'read_only':True}}
    
    def get_comments(self,post):
        return post.comments.count()
    
    def get_likes(self,post):
        return post.likes.count()
    def get_isLiked(self,post):
        '''get whether comment is liked by current user of not'''
        request = self.context.get('request')
        if request.user.is_anonymous:
            return False
        elif Like.objects.filter(post=post, user=request.user.profile).exists():
            return True
        return False
# ------------------------------------------------------------------------- #

class CommentSerializer(serializers.ModelSerializer):
    replies=serializers.SerializerMethodField()
    likes=serializers.SerializerMethodField()
    isLiked=serializers.SerializerMethodField()
    user=ProfileSerializer(read_only=True)
    class Meta:
        model=Comment
        fields=['id','user','post','text','parent','replies','likes','isLiked']
        extra_kwargs={'user':{'read_only':True},'parent':{'read_only':True},'post':{'read_only':True}}

    def get_replies(self,comment):
        '''get replies count'''
        replies=Comment.objects.filter(parent=comment).count()
        return replies
    
    def get_likes(self,comment):
        '''get likes count'''
        likes=Like.objects.filter(Comment=comment).count()
        return likes
    
    def get_isLiked(self,comment):
        '''get whether comment is liked by current user of not'''
        request = self.context.get('request')
        if request.user.is_anonymous:
            return False
        elif Like.objects.filter(Comment=comment, user=request.user.profile).exists():
            return True
        return False

    
# ------------------------------------------------------------------------- #