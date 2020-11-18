from django.db import models
# from django.db.models.deletion import SET_NULL
from django.contrib.auth.models import User
from groups.models import Group
# Create your models here.
class Post (models.Model):
    title = models.CharField(max_length=100)
    group = models.ForeignKey(Group, on_delete=models.CASCADE);
    contents = models.TextField(max_length=40000)
    poster = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        """A string representation of the model."""
        return self.title