"""
Modelo de usuário customizado
"""
from django.contrib.auth.models import User


class Usuario(User):
    """
    Proxy model do User padrão do Django com customizações para usar email como login.
    """

    class Meta:
        proxy = True
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'

    def save(self, *args, **kwargs):
        # Se não tem username, gera um baseado no email
        if not self.username and self.email:
            # Remove caracteres especiais do email para criar username
            base_username = self.email.split('@')[0]
            username = base_username
            counter = 1

            # Garante que o username seja único
            while User.objects.filter(username=username).exclude(pk=self.pk).exists():
                username = f"{base_username}{counter}"
                counter += 1

            self.username = username

        super().save(*args, **kwargs)

    def __str__(self):
        return self.email if self.email else self.username
