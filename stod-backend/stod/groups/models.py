from django.db import models
from django.contrib.auth.models import User


class Group(models.Model):
    name = models.CharField(primary_key=True, max_length=64)
    description = models.CharField(max_length=256)
    #users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class Comment(models.Model):
    name = models.CharField(max_length=140)
    email = models.EmailField()
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_on']

    def __str__(self):
        return 'Comment {} by {}'.format(self.body, self.name)