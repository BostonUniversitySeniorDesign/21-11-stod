from django.contrib.auth.forms import UsernameField
from django.contrib.auth.signals import user_logged_in
from django.db import models
from django.conf import settings
# from django.db.models.deletion import SET_NULL
from django.contrib.auth.models import User
from groups.models import Group

# Create your models here.


class Post(models.Model):
    # post title
    title = models.CharField(max_length=100)
    # group where post is located
    # if group is deleted, post is deleted
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    # group = models.CharField(max_length=50)
    # contents of the post
    contents = models.TextField(max_length=40000)
    # if user is deleted, post is deleted
    # who posted the post
    poster = models.ForeignKey(
        User, on_delete=models.CASCADE, to_field="username")
    date = models.DateField(auto_now=True)
    # poster2 = models.CharField(User.username,max_length=25)
    flagged = models.BooleanField(default=False)

    tags = models.ManyToManyField('tags.Tag')

    def __str__(self):
        """A string representation of the model."""
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="comments")
    name = models.CharField(max_length=140)
    comment = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, blank=True, null=True, related_name="replyId")
    reply = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ["created_on"]

    def __str__(self):
        return "Comment {} by {}".format(self.comment, self.name)
