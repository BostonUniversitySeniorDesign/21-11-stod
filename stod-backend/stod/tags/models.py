from django.db import models


class Tag(models.Model):
    name = models.CharField(primary_key=True, max_length=64)
    tagType = models.CharField(max_length=64)
