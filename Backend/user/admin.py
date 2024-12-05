from django.contrib import admin
from .models import Follower, Profile
# Register your models here.

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user','gender']

@admin.register(Follower)
class FollowerAdmin(admin.ModelAdmin):
    list_display=['id','toFollowing','follower']
