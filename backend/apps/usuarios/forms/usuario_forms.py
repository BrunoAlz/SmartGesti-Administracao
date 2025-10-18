from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.utils.translation import gettext_lazy as _
from ..models import Usuario


class UsuarioCreationForm(UserCreationForm):
    """
    Formulário para criação de usuário com email como campo obrigatório.
    """
    email = forms.EmailField(
        label=_('Email'),
        max_length=254,
        help_text=_('Obrigatório. Informe um endereço de email válido.')
    )

    class Meta:
        model = Usuario
        fields = ('email', 'first_name', 'last_name')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Remove o campo username do formulário
        if 'username' in self.fields:
            del self.fields['username']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user


class UsuarioChangeForm(UserChangeForm):
    """
    Formulário para edição de usuário.
    """

    class Meta:
        model = Usuario
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Torna o campo username opcional no formulário
        if 'username' in self.fields:
            self.fields['username'].required = False
            self.fields['username'].help_text = _(
                'Opcional. Nome de usuário alternativo.')
