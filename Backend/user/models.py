from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE, primary_key=True)
    bio = models.CharField(blank=True, max_length=200)
    profileImg = models.ImageField(upload_to='profile_images/', blank=True, default='defaultProfileimg.png')
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], blank=True)
    date_joined = models.DateField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.user.username


class Follower(models.Model):
    toFollowing = models.ForeignKey(Profile, related_name='followers', on_delete=models.CASCADE)
    follower = models.ForeignKey(Profile, related_name='followings', on_delete=models.CASCADE)

    def __str__(self) -> str:
        return 'toFollowing - ' + self.toFollowing.user.username + ', follower -' + self.follower.user.username
