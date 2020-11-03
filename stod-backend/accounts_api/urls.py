from django.urls import path, include
from .views import RegisterAPI, LoginAPI, UserAPI, RequestPasswordResetEmail, PasswordTokenCheckAPI, SetNewPasswordAPIView
from knox import views as knox_views

urlpatterns = [
    path('api/auth/register/', RegisterAPI.as_view()),
    path('api/auth/login/', LoginAPI.as_view()),
    path('api/auth/user/', UserAPI.as_view()),
    path('api/auth/logout/', knox_views.LogoutView.as_view(), name="knox-logout"),
    path('api/auth/', include('knox.urls')),
    path('api/auth/request-reset-email/', RequestPasswordResetEmail.as_view(),
         name="request-reset-email"),
    path('api/auth/password-reset/<uidb64>/<token>/',
         PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('api/auth/password-reset-complete/', SetNewPasswordAPIView.as_view(),
         name='password-reset-complete')
]

