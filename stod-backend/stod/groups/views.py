from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpRequest, JsonResponse
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

    return HttpResponse(status=200)


def getGroups(request):
    """
    GET endpoint to get all groups.
    Returns a JSON response.
    """
    if request.method != "GET":
        return HttpResponse(status=404)

    groups = Group.objects.all()
    response = []
    for group in groups:
        response.append({'name': group.name, 'description': group.description})

    return JsonResponse({'groups': response})
