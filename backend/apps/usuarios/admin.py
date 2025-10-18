from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import Usuario


# Desregistra o admin padrão do User
admin.site.unregister(User)


@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    """
    Admin customizado para o proxy model Usuario que usa email como campo principal.
    """

    # Campos mostrados na listagem
    list_display = ('email', 'first_name', 'last_name',
                    'username', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')
    search_fields = ('email', 'first_name', 'last_name', 'username')
    ordering = ('email',)

    # Destaca o email como campo principal
    def get_fieldsets(self, request, obj=None):
        fieldsets = super().get_fieldsets(request, obj)

        # Modifica o fieldset para destacar o email
        if not obj:  # Criando novo usuário
            return (
                (None, {'fields': ('username', 'email', 'password1', 'password2')}),
                ('Informações Pessoais', {
                 'fields': ('first_name', 'last_name')}),
                ('Permissões', {'fields': ('is_active', 'is_staff',
                 'is_superuser', 'groups', 'user_permissions')}),
            )
        else:  # Editando usuário existente
            return (
                (None, {'fields': ('username', 'email', 'password')}),
                ('Informações Pessoais', {
                 'fields': ('first_name', 'last_name')}),
                ('Permissões', {
                    'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
                }),
                ('Datas Importantes', {
                 'fields': ('last_login', 'date_joined')}),
            )

    def save_model(self, request, obj, form, change):
        """Customiza o salvamento para garantir que email seja obrigatório."""
        if not change:  # Novo usuário
            if not obj.email:
                raise ValueError("Email é obrigatório para novos usuários")
        super().save_model(request, obj, form, change)
