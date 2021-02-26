from django.db.models import query
from django.db.models.query import QuerySet
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
from django.http import JsonResponse


class PostViewset(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    # filter based on group passed in as parameter
    def get_queryset(self):
        queryset = self.queryset
        req_group = self.request.query_params["group"]
        if(req_group == "home" or req_group == ""):
            queryset = Post.objects.all()
            return queryset.order_by('-id')
        else:
            query_set = queryset.filter(group=req_group)
        return query_set.order_by('-id')


class CommentViewset(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


# class postGroup(generics.GenericAPIView):
#     serializer_class = PostSerializzer

#     # Response structure sent on POST request
#     def get(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         curr_group=self.request.group
#         return Response(
#             {
#                 "posts": Post.objects.filter(group=curr_group)
#             },
#             status.HTTP_200_OK,
#         )
