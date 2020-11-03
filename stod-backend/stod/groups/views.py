from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpRequest
import json

from .models import Group


@csrf_exempt
def create(request):
    """
    Endpoint to create new group.
    Accepts POST request with JSON payload with format:
    {
        'name': string,
        'description': string
    }
    If a group exists with this name already this will update it.
    """
    if request.method != "POST":
        return HttpResponse(status=404)

    newGroupInfo = json.loads(request.body)
    if "name" not in newGroupInfo.keys() or "description" not in newGroupInfo.keys():
        return HttpResponse(status=400)

    name = newGroupInfo["name"]
    description = newGroupInfo["description"]
    newGroup = Group(name=name, description=description)
    newGroup.save()

    print(Group.objects.all())
    return HttpResponse(status=200)
