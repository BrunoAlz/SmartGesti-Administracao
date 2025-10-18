"""
Backends de autenticação personalizados
"""
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import User


class EmailBackend(ModelBackend):
    """
    Backend de autenticação personalizado que permite login com email.
    """

    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            # Tenta encontrar o usuário pelo email
            user = User.objects.get(email=username)
        except User.DoesNotExist:
            # Se não encontrar pelo email, tenta pelo username
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                return None

        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None
