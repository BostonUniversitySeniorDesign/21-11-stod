from django.db import models

# from django.db.models.deletion import SET_NULL
from django.contrib.auth.models import User
from groups.models import Group

# Create your models here.
<<<<<<< HEAD
class Post(models.Model):
    title = models.CharField(max_length=100)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
=======
class Post (models.Model):
    # post title
    title = models.CharField(max_length=100)
    # group where post is located
    # if group is deleted, post is deleted
    # group = models.ForeignKey(Group, on_delete=models.CASCADE); 
    group = models.CharField(max_length=50); 
    # contents of the post
>>>>>>> refs/remotes/origin/main
    contents = models.TextField(max_length=40000)
    # if user is deleted, post is deleted
    # who posted the post
    # poster = models.ForeignKey(User, on_delete=models.CASCADE)
    poster = models.CharField(max_length=25);
    def __str__(self):
        """A string representation of the model."""
        return self.title


class Comment(models.Model):
    name = models.CharField(max_length=140)
    email = models.EmailField()
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_on"]

    def __str__(self):
        return "Comment {} by {}".format(self.body, self.name)
