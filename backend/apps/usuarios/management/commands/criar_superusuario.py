from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.core.management.utils import get_random_secret_key
import getpass


class Command(BaseCommand):
    help = 'Cria um superusuário usando email como login'

    def add_arguments(self, parser):
        parser.add_argument('--email', help='Email do superusuário')
        parser.add_argument('--first-name', help='Primeiro nome')
        parser.add_argument('--last-name', help='Sobrenome')
        parser.add_argument(
            '--password', help='Senha (se não fornecida, será solicitada)')

    def handle(self, *args, **options):
        User = get_user_model()

        # Solicita email se não fornecido
        email = options.get('email')
        if not email:
            email = input('Email: ')

        # Verifica se usuário já existe
        if User.objects.filter(email=email).exists():
            self.stdout.write(
                self.style.ERROR(f'Usuário com email {email} já existe!')
            )
            return

        # Solicita outros dados se não fornecidos
        first_name = options.get('first_name') or input('Primeiro nome: ')
        last_name = options.get('last_name') or input('Sobrenome: ')

        # Solicita senha se não fornecida
        password = options.get('password')
        if not password:
            password = getpass.getpass('Senha: ')
            password_confirm = getpass.getpass('Confirme a senha: ')

            if password != password_confirm:
                self.stdout.write(
                    self.style.ERROR('Senhas não coincidem!')
                )
                return

        # Cria o superusuário
        try:
            user = User.objects.create_superuser(
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name
            )

            self.stdout.write(
                self.style.SUCCESS(
                    f'Superusuário {email} criado com sucesso!'
                )
            )

        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Erro ao criar superusuário: {e}')
            )
