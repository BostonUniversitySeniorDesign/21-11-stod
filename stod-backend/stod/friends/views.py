from rest_framework import viewsets
from .models import FriendRequest, FriendList
from .serializers import FriendRequestSerializer, FriendSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action


class FriendRequestView(viewsets.ViewSet):
    serializer_class = FriendRequestSerializer
    queryset = FriendRequest.objects.all()
    permission_classes = [IsAuthenticated]

    # @action(detail=True, methods=['get'])
    def list(self, request):
        print("GET")
        reqs = FriendRequest.objects.filter(sender=request.user)
        resp = FriendRequest.objects.filter(reciver=request.user)

        return Response(
                FriendRequestSerializer(reqs.union(resp), many=True).data,
                status=status.HTTP_200_OK,
            )

    # @action(detail=True, methods=['post'])
    def create(self, request):
        sender = request.user
        if not request.data.get('reciver'):
            return Response(
                    {"error": "Username is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        reciver = User.objects.get(username=request.data.get('reciver'))
        exis = FriendRequest.objects.filter(sender=sender, reciver=reciver)
        # if len(exis) > 2:
        #     return Response(
        #             {"error": "Too many friend requests"},
        #             status=status.HTTP_400_BAD_REQUEST,
        #         )            
        new = FriendRequest.objects.create(sender=sender, reciver=reciver)
        return Response(
                FriendRequestSerializer(new).data,
                status=status.HTTP_200_OK,
            )

class FriendRequestViewAccept(viewsets.ViewSet):
    serializer_class = FriendRequestSerializer
    queryset = FriendRequest.objects.all()
    permission_classes = [IsAuthenticated]

    def partial_update(self, request, pk=None):
        frnds = []
        fr = FriendRequest.objects.get(id=pk)
        print(fr)
        fr.accept()
        queryset = FriendList.objects.get(user=request.user)
        # print("SET", queryset.friends.all())
        for q in queryset.friends.all():
            frnds.append(q.username)
        data = FriendSerializer(queryset).data
        data["friends"] = frnds
        return Response(
                data,
                status=status.HTTP_200_OK,
            )

class FriendRequestViewDecline(viewsets.ViewSet):
    serializer_class = FriendRequestSerializer
    queryset = FriendRequest.objects.all()
    permission_classes = [IsAuthenticated]

    def partial_update(self, request, pk=None):
        fr = FriendRequest.objects.get(id=pk)
        print(fr)
        fr.decline()
        queryset = FriendList.objects.get(user=request.user)
        # print("SET", queryset.friends.all())
        for q in queryset.friends.all():
            frnds.append(q.username)
        data = FriendSerializer(queryset).data
        data["friends"] = frnds
        return Response(
                data,
                status=status.HTTP_200_OK,
            )

class FriendListView(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    def list(self, request):
        queryset = FriendList.objects.get_or_create(user=request.user)[0]
        print(queryset)
        frnds = []
        for q in queryset.friends.all():
            frnds.append(q.username)
        data = FriendSerializer(queryset).data
        data["friends"] = frnds
        return Response(
                data,
                status=status.HTTP_200_OK,
        )

    def create(self, request):
        # usr = User.objects.get(username=pk)
        fr_lst = FriendList.objects.get_or_create(user=request.user)[0]
        return Response(
                {"is_mutual": fr_lst.is_mutual_friend(request.data.get('user'))},
                status=status.HTTP_200_OK,
        )
#     serializer_class = FriendRequestSerializerAction
#     # queryset = FriendRequest.objects.all()
#     # permission_classes = [IsAuthenticated]

#     @action(detail=False, methods=['post'])
#     def accept_friend_request(self, request):
#         fr = FriendRequest.objects.get(username=request.user.username)
#         fr.accept()
#         return Response(
#                 {"type": "success"},
#                 status=status.HTTP_200_OK,
#             )
    # filter based on group passed in as parameter
    # def get_queryset(self):
    #     queryset = self.queryset
    #     req_group = self.request.query_params["sender"]
    #     if(req_group == "home" or req_group == ""):
    #         queryset = Post.objects.all()
    #         return queryset.order_by('-id')
    #     else:
    #         query_set = queryset.filter(group=req_group).order_by('-id')
    #     return query_set.reverse()
