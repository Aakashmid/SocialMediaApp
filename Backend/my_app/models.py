from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Profile(models.Model):
    user=models.OneToOneField(User,related_name='profile', on_delete=models.CASCADE)
    bio=models.CharField(blank=True,max_length=200)
    profileImg=models.ImageField(upload_to='profile_images',blank=True,default='media/defaultProfileImg')
    
    def __str__(self) -> str:
        return self.user.username

class Post(models.Model):
    author=models.ForeignKey(Profile,related_name='posts',on_delete=models.CASCADE)  # related name help to query related date 
    text=models.CharField( max_length=500)
    postImg=models.ImageField(upload_to='post_images',null=True ,blank=True)
    publish_time=models.DateTimeField(auto_now_add=True)
    updated_time=models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.text[:50]+' ...'

class Comment(models.Model):
    user=models.ForeignKey(Profile,on_delete=models.CASCADE)
    post=models.ForeignKey(Post,related_name='comments',on_delete=models.CASCADE)
    parent=models.ForeignKey('self',on_delete=models.CASCADE,null=True)
    text=models.CharField(max_length=200)



class Follower(models.Model):
    Author=models.ForeignKey(Profile,related_name='followers',on_delete=models.CASCADE)
    follower=models.ForeignKey(Profile,related_name='followings' ,on_delete=models.CASCADE)

    def __str__(self) -> str:
        return 'Author - '+ self.Author +', follower -'+self.follower    

class Like(models.Model):
    user=models.ForeignKey(Profile, on_delete=models.CASCADE)
    post=models.ForeignKey(Post,related_name='likes', on_delete=models.CASCADE,null=True)
    Comment=models.ForeignKey(Comment,related_name='likes', on_delete=models.CASCADE,null=True)
    created_at=models.DateTimeField( auto_now_add=True)
