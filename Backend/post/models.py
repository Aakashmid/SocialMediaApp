from django.db import models
# from user.models import Profile 
# from comment.models import Comment
# Create your models here.

class Post(models.Model):
    creator=models.ForeignKey('user.Profile',related_name='posts',on_delete=models.CASCADE)  # related name help to query related date 
    text=models.CharField( max_length=500)
    postImg=models.ImageField(upload_to='post_images/')
    is_public=models.BooleanField(default=True)     # default is public post
    publish_time=models.DateTimeField(auto_now_add=True)
    updated_time=models.DateTimeField(auto_now=True)    

    def __str__(self) -> str:
        return self.text[:50]+' ...'


######## for like of post or comment
class Like(models.Model):
    user=models.ForeignKey('user.Profile', on_delete=models.CASCADE)
    post=models.ForeignKey(Post,related_name='likes', on_delete=models.CASCADE,null=True)
    comment=models.ForeignKey('comment.Comment',related_name='likes', on_delete=models.CASCADE,null=True)
    created_at=models.DateTimeField( auto_now_add=True)
