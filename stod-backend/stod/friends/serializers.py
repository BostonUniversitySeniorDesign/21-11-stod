from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import FriendRequest, FriendList

class FriendRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = FriendRequest
        fields = '__all__'

class FriendSerializer(serializers.ModelSerializer):

    class Meta:
        model = FriendList
        fields = '__all__'