from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class Profile(AbstractUser):
    bio=models.CharField(blank=True)
    followers=models.ManyToManyField('self',related_name='followers',symmetrical=False)                        
    # followings=models.ManyToManyField('self',related_name='followers',symmetrical=False)                        
    profileImg=models.ImageField(upload_to='profile_images',blank=True ,null=True)
    

class Post(models.Model):
    pass

class Comment(models.Model):
    pass

