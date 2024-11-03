from rest_framework import serializers
from django.contrib.auth.models import User
from my_app.models import Comment,Like,Profile,Post,Follower
from rest_framework.exceptions import ValidationError

# ------------------------------------------------------------------------- #

class UserSerializer(serializers.ModelSerializer):
    full_name  = serializers.CharField(write_only=True) 
    class Meta:
        model=User
        fields=['id','username','password','full_name','email']
        extra_kwargs={"password":{"write_only":True}}

    def create(self, validated_data):
        full_name = validated_data.pop('full_name')
        name_parts = full_name.split(' ', 1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ""
        user = User.objects.create_user(**validated_data,
            first_name=first_name,
            last_name=last_name
        )
        return user
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['full_name'] = f"{instance.first_name} {instance.last_name}".strip()
        return representation
        
# ------------------------------------------------------------------------- #


class ProfileSerializer(serializers.ModelSerializer):
    posts_count=serializers.SerializerMethodField()
    username=serializers.SerializerMethodField()
    full_name=serializers.SerializerMethodField()
    followers_count=serializers.SerializerMethodField()
    followings_count=serializers.SerializerMethodField()
    isFollowed=serializers.SerializerMethodField()
    profileImg=serializers.SerializerMethodField()
    class Meta:
        model=Profile
        fields=['id','bio','username','profileImg','full_name','date_of_birth','gender','posts_count','date_joined','isFollowed','followers_count','followings_count'] 
    
    def get_posts_count(self,profile):
        return profile.posts.count()
    def get_full_name(self,profile):
        return profile.user.first_name + ' ' + profile.user.last_name

    def get_username(self,profile):
        return profile.user.username

    def get_followers_count(self,profile):
        return profile.followers.count()
    
    def get_followings_count(self,profile):
        return profile.followings.count()
    
    def get_isFollowed(self,profile): # find where a profile is followed by current user
        request= self.context.get('request')
        if request.user.is_anonymous:  # this line is just for development 
            return False 
        return True if Follower.objects.filter(toFollowing=profile,follower=request.user.profile)   else False
    def get_profileImg(self, profile):
        request = self.context.get('request')
        if profile.profileImg:
            return request.build_absolute_uri(profile.profileImg.url)
        return None
    
    def update(self, profile_instance, validated_data):
        # update full_name if provided
        full_name=self.initial_data.get("full_name",None)
        if full_name is not None:
            first_name,last_name = full_name.split(" ",1)
            profile_instance.user.first_name,profile_instance.user.last_name=first_name.title(),last_name.title()
            profile_instance.user.save()

        # update profile_img if provided
        profileImg=self.initial_data.get('profileImg',None)
        if profileImg is not None:
            if not profileImg.content_type.startswith('image/'):
                raise ValidationError("Uploaded file is not an image.")
            # Optionally check the file extension
            valid_extensions = ['.jpg', '.jpeg', '.png', '.gif']
            if not any(profileImg.name.lower().endswith(ext) for ext in valid_extensions):
                raise ValidationError("Uploaded file must be an image (JPG, PNG, GIF).")
            else:
                profile_instance.profileImg=profileImg
        if validated_data.get('bio',None) is not None:
            profile_instance.bio=validated_data.get('bio')
        profile_instance.save()
        return profile_instance
    

# ------------------------------------------------------------------------- #
class PostSerializer(serializers.ModelSerializer):
    comments_count=serializers.SerializerMethodField()
    likes_count=serializers.SerializerMethodField()
    isLiked=serializers.SerializerMethodField()
    creator=ProfileSerializer(read_only=True)
    class Meta:
        model=Post
        fields=['id','creator','text','postImg', 'comments_count','likes_count','isLiked','is_public', 'publish_time','updated_time']
        extra_kwargs={'creator':{'read_only':True},'isLiked':{'read_only':True}}
    
    def get_comments_count(self,post):
        return post.comments.count()
    
    def get_likes_count(self,post):
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