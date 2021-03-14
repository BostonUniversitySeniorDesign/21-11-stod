from django.urls import path, include
from .views import RegisterAPI, LoginAPI, UserAPI, RequestPasswordResetEmail, PasswordTokenCheckAPI, SetNewPasswordAPIView,AllUsersAPI
from knox import views as knox_views

urlpatterns = [
    path('register/', RegisterAPI.as_view()),
    path('all_users/', AllUsersAPI.as_view({'get': 'list'})),
    path('login/', LoginAPI.as_view()),
    path('user/', UserAPI.as_view()),
    path('logout/', knox_views.LogoutView.as_view(), name="knox-logout"),
    path('', include('knox.urls')),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(),
         name="request-reset-email"),
    path('password-reset/<uidb64>/<token>/',
         PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete/', SetNewPasswordAPIView.as_view(),
         name='password-reset-complete')
]

