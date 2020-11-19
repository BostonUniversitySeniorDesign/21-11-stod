from django.db import models
# from django.db.models.deletion import SET_NULL
from django.contrib.auth.models import User
from groups.models import Group
# Create your models here.
class Post (models.Model):
    # post title
    title = models.CharField(max_length=100)
    # group where post is located
    # if group is deleted, post is deleted
    # group = models.ForeignKey(Group, on_delete=models.CASCADE); 
    group = models.CharField(max_length=50); 
    # contents of the post
    contents = models.TextField(max_length=40000)
    # if user is deleted, post is deleted
    # who posted the post
    # poster = models.ForeignKey(User, on_delete=models.CASCADE)
    poster = models.CharField(max_length=25);
    def __str__(self):
        """A string representation of the model."""
        return self.title