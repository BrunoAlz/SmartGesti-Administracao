from rest_framework import serializers
from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer as BaseUserDetailsSerializer

User = get_user_model()


class CustomRegisterSerializer(RegisterSerializer):
    """
    Serializer personalizado para registro de usuário.
    """
    first_name = serializers.CharField(max_length=150, required=True)
    last_name = serializers.CharField(max_length=150, required=True)
    username = serializers.CharField(
        max_length=150, required=False, allow_blank=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Remove o campo username dos campos obrigatórios
        if 'username' in self.fields:
            self.fields['username'].required = False
            self.fields['username'].allow_blank = True

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data.update({
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
        })
        return data

    def save(self, request):
        user = super().save(request)
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')

        # Gera username baseado no email se não existir
        if not user.username:
            base_username = user.email.split('@')[0]
            username = base_username
            counter = 1
            while User.objects.filter(username=username).exclude(pk=user.pk).exists():
                username = f"{base_username}{counter}"
                counter += 1
            user.username = username
        user.save()
        return user


class UserDetailsSerializer(BaseUserDetailsSerializer):
    """
    Serializer personalizado para detalhes do usuário.
    """
    class Meta:
        model = User
        fields = ('pk', 'username', 'email', 'first_name', 'last_name',
                  'is_staff', 'is_active', 'date_joined', 'last_login')
        read_only_fields = ('pk', 'username', 'is_staff', 'is_active',
                            'date_joined', 'last_login')


class LoginSerializer(serializers.Serializer):
    """
    Serializer para login com email ou username.
    """
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer para mudança de senha.
    """
    old_password = serializers.CharField(required=True, write_only=True)
    new_password1 = serializers.CharField(required=True, write_only=True)
    new_password2 = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        if attrs['new_password1'] != attrs['new_password2']:
            raise serializers.ValidationError("As senhas não coincidem.")
        return attrs


class ResetPasswordSerializer(serializers.Serializer):
    """
    Serializer para solicitação de reset de senha.
    """
    email = serializers.EmailField(required=True)


class PasswordResetConfirmSerializer(serializers.Serializer):
    """
    Serializer para confirmação de reset de senha.
    """
    uid = serializers.CharField(required=True)
    token = serializers.CharField(required=True)
    new_password1 = serializers.CharField(required=True, write_only=True)
    new_password2 = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        if attrs['new_password1'] != attrs['new_password2']:
            raise serializers.ValidationError("As senhas não coincidem.")
        return attrs
