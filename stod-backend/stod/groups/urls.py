from django.urls import path

from . import views

urlpatterns = [
    path('create', views.create, name='create'),
    path('', views.getGroups, name='getGroups'),
]
