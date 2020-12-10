from django.db import models
from django.contrib.auth.models import User


class Group(models.Model):
    name = models.CharField(primary_key=True, max_length=64)
    description = models.CharField(max_length=256)
    #users = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class UserGroups(models.Model):
    user = models.ForeignKey(User, to_field='username',
                             on_delete=models.CASCADE)
    groups = models.ManyToManyField(Group)
