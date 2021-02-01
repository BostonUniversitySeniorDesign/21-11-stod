from django.http import response
from rest_framework import viewsets
from .serializers import CommentSerializer, PostSerializer
from .models import Post, Comment
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404, render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from rest_framework.decorators import api_view

class PostViewset(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    # permission_classes=None
    # permission_classes = AllowAny
    # def partial_update(self, request, pk, amount):
    #     # if no model exists by this PK, raise a 404 error
    #     model = get_object_or_404(Post, pk=pk)
    #     # this is the only field we want to update
    #     data = {"contents": Post.contents}
    #     serializer = PostSerializer(model, data=data, partial=True)

    #     if serializer.is_valid():
    #         serializer.save()
    #         return response(serializer.data)
    #     # return a meaningful error response
    #     return response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentViewset(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


