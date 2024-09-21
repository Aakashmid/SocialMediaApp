from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.


class Profile(models.Model):
    user=models.OneToOneField(User,related_name='profile', on_delete=models.CASCADE)
    bio=models.CharField(blank=True,max_length=200)
    profileImg=models.ImageField(upload_to='profile_images/',blank=True,default='defaultProfileimg.png')
    date_joined=models.DateField(auto_now_add=True)
    updated_time=models.DateTimeField(auto_now=True)  

    def __str__(self) -> str:
        return self.user.username

class Post(models.Model):
    creator=models.ForeignKey(Profile,related_name='posts',on_delete=models.CASCADE)  # related name help to query related date 
    text=models.CharField( max_length=500)
    postImg=models.ImageField(upload_to='post_images/')
    publish_time=models.DateTimeField(auto_now_add=True)
    updated_time=models.DateTimeField(auto_now=True)    

    def __str__(self) -> str:
        return self.text[:50]+' ...'

class Comment(models.Model):
    user=models.ForeignKey(Profile,on_delete=models.CASCADE)
    post=models.ForeignKey(Post,related_name='comments',on_delete=models.CASCADE)
    parent=models.ForeignKey('self',on_delete=models.CASCADE,null=True)
    text=models.CharField(max_length=200)
    time=models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.text

class Follower(models.Model):
    toFollowing=models.ForeignKey(Profile,related_name='followers',on_delete=models.CASCADE)
    follower=models.ForeignKey(Profile,related_name='followings' ,on_delete=models.CASCADE)

    def __str__(self) -> str:
        return 'toFollowing - '+ self.toFollowing.user.username +', follower -'+self.follower.user.username    

class Like(models.Model):
    user=models.ForeignKey(Profile, on_delete=models.CASCADE)
    post=models.ForeignKey(Post,related_name='likes', on_delete=models.CASCADE,null=True)
    Comment=models.ForeignKey(Comment,related_name='likes', on_delete=models.CASCADE,null=True)
    created_at=models.DateTimeField( auto_now_add=True)
