from django.contrib import admin
from .models import Profile,Post,Like, Comment, Follower
# Register your models here.
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user','gender']

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display=['id','text','publish_time','updated_time','creator']

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass

@admin.register(Follower)
class FollowerAdmin(admin.ModelAdmin):
    list_display=['id','toFollowing','follower']

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    pass
                   