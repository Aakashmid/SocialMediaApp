from django.contrib import admin
from .models import Profile,Post,Like, Comment, Follower

# Register your models here.
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    pass

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display=['id','text','publish_time','updated_time','author']

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass

@admin.register(Follower)
class FollowerAdmin(admin.ModelAdmin):
    list_display=['id','toFollowing','follower']

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    pass
                   