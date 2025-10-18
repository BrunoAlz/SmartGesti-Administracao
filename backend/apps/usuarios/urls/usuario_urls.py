from django.urls import path, include
from .. import views

app_name = 'usuarios'

urlpatterns = [
    # URLs do dj-rest-auth (login, logout, user details, etc.)
    path('auth/', include('dj_rest_auth.urls')),

    # URLs do dj-rest-auth registration (registro, confirmação de email, etc.)
    path('auth/registration/', include('dj_rest_auth.registration.urls')),

    # URLs do django-allauth (login social, etc.)
    path('auth/social/', include('allauth.urls')),

    # URLs personalizadas (versão simples)
    path('auth/register/custom/',
         views.CustomRegisterView.as_view(), name='custom_register'),
    path('auth/login/custom/', views.CustomLoginView.as_view(), name='custom_login'),
    path('auth/change-password/',
         views.ChangePasswordView.as_view(), name='change_password'),
    path('auth/password-reset/',
         views.PasswordResetView.as_view(), name='password_reset'),
    path('auth/password-reset/confirm/',
         views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('auth/profile/', views.user_profile, name='user_profile'),
]
