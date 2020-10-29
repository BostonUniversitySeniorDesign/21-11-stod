from django.urls import path

from . import views

urlpatterns = [
    path('', views.createAccount, name='createAccount'),
]
