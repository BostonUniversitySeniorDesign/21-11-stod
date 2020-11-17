from django.db import models


class Group(models.Model):
    name = models.CharField(primary_key=True, max_length=64)
    description = models.CharField(max_length=256)
    #users = models.ManyToManyField(User)

    def __str__(self):
        return self.name
