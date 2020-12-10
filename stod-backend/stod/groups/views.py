from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from .serializers import GroupSerializer, UserGroupsSerializer
from .models import Group, UserGroups
from django.contrib.auth.models import User


class GroupViewset(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()


class UserGroupsAPI(generics.GenericAPIView):
    serializer_class = UserGroupsSerializer
    queryset = UserGroups.objects.all()

    def post(self, request):
        """
        Given a user and a group name, add the user to the group.
        """
        serializer = self.serializer_class(data=request.data)
        try:
            user = request.data['user']
            group = request.data['group']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Provide a user and a group"
                }
            )

        groupObj = Group.objects.all().filter(name=group)
        if (len(groupObj) == 0):
            return Response(
                {
                    "success": False,
                    "message": "Group does not exist"
                }
            )
        else:
            groupObj = groupObj.first()

        userObj = User.objects.all().filter(username=user)
        if (len(userObj) == 0):
            return Response(
                {
                    "success": False,
                    "message": "User does not exist"
                }
            )
        else:
            userObj = userObj.first()

        rows = self.queryset.filter(user=user)
        row = rows[0] if rows else UserGroups(user=userObj)
        row.groups.add(groupObj)
        row.save()

        return Response(
            {"success": True},
            status=status.HTTP_200_OK
        )

    def get(self, request):
        """
        Get the names of the groups a given user is in.
        """
        serializer = self.serializer_class(data=request.data)
        try:
            user = request.query_params['user']
        except:
            return Response(
                {
                    "success": False,
                    "message": "Provide a user"
                }
            )

        userObj = User.objects.all().filter(username=user)
        if (len(userObj) == 0):
            return Response(
                {
                    "success": False,
                    "message": "User does not exist"
                }
            )
        else:
            userObj = userObj.first()

        result = self.queryset.filter(user=userObj)
        groups = result.first().groups.all()
        groupNames = list(map(lambda g: g.name, groups))

        return Response(
            {
                "success": True,
                "result": groupNames
            }
        )
