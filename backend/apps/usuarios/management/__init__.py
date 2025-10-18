from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction


class Command(BaseCommand):
    help = 'Atualiza usuários existentes para o novo modelo de usuário customizado'

    def handle(self, *args, **options):
        User = get_user_model()

        with transaction.atomic():
            # Atualiza usuários que não possuem email definido ou têm username vazio
            usuarios_atualizados = 0

            for user in User.objects.all():
                precisa_atualizar = False

                # Se não tem email, usa o username como email (para casos de teste)
                if not user.email and user.username:
                    user.email = f"{user.username}@exemplo.com"
                    precisa_atualizar = True

                # Se username está vazio, pode deixar como null
                if user.username == '':
                    user.username = None
                    precisa_atualizar = True

                if precisa_atualizar:
                    user.save()
                    usuarios_atualizados += 1
                    self.stdout.write(
                        self.style.SUCCESS(
                            f'Usuário {user.email} atualizado'
                        )
                    )

            self.stdout.write(
                self.style.SUCCESS(
                    f'Migração concluída! {usuarios_atualizados} usuários atualizados.'
                )
            )
