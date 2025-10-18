from django.contrib.auth.models import BaseUserManager


class UsuarioManager(BaseUserManager):
    """
    Manager customizado para o modelo Usuario que utiliza email em vez de username.
    """

    def create_user(self, email, password=None, **extra_fields):
        """
        Cria e salva um usuário comum com email e senha.
        """
        if not email:
            raise ValueError('O email é obrigatório')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Cria e salva um superusuário com email e senha.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superusuário deve ter is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superusuário deve ter is_superuser=True.')

        return self.create_user(email, password, **extra_fields)
