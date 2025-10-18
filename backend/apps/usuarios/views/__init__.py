"""
Views do app usuarios
"""
from .auth_views import (
    CustomRegisterView,
    CustomLoginView,
    ChangePasswordView,
    PasswordResetView,
    PasswordResetConfirmView,
    user_profile
)

__all__ = [
    # Auth views
    'CustomRegisterView',
    'CustomLoginView',
    'ChangePasswordView',
    'PasswordResetView',
    'PasswordResetConfirmView',
    'user_profile',
]
