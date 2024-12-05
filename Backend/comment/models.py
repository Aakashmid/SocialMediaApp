from django.db import models
# from user.models import Profile
# from post.models import Post
# Create your models here.

class Comment(models.Model):
    user=models.ForeignKey('user.Profile',on_delete=models.CASCADE)
    post=models.ForeignKey('post.Post',related_name='comments',on_delete=models.CASCADE)
    parent=models.ForeignKey('self',on_delete=models.CASCADE,null=True,blank=True)
    text=models.CharField(max_length=200)
    time=models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.text