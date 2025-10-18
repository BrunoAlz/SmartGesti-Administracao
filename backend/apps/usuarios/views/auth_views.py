from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializers import (
    LoginSerializer,
    ChangePasswordSerializer,
    ResetPasswordSerializer,
    PasswordResetConfirmSerializer,
    UserDetailsSerializer
)

User = get_user_model()


class CustomRegisterView(APIView):
    """
    View personalizada para registro de usuário sem as complicações do allauth.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data

        # Validação básica
        if not data.get('email'):
            return Response({'error': 'Email é obrigatório'}, status=status.HTTP_400_BAD_REQUEST)

        if not data.get('password1'):
            return Response({'error': 'Senha é obrigatória'}, status=status.HTTP_400_BAD_REQUEST)

        if data.get('password1') != data.get('password2'):
            return Response({'error': 'As senhas não coincidem'}, status=status.HTTP_400_BAD_REQUEST)

        # Verifica se usuário já existe
        if User.objects.filter(email=data.get('email')).exists():
            return Response({'error': 'Email já está em uso'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Cria o usuário
            user = User.objects.create_user(
                username=data.get('email').split(
                    '@')[0],  # Username baseado no email
                email=data.get('email'),
                password=data.get('password1'),
                first_name=data.get('first_name', ''),
                last_name=data.get('last_name', '')
            )

            # Gera tokens JWT
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            return Response({
                'message': 'Usuário criado com sucesso',
                'user': UserDetailsSerializer(user).data,
                'access': str(access_token),
                'refresh': str(refresh),
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': f'Erro ao criar usuário: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CustomLoginView(APIView):
    """
    View personalizada para login com email.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            # Busca usuário pelo email
            try:
                user = User.objects.get(email=email)
                username = user.username
            except User.DoesNotExist:
                return Response({
                    'error': 'Credenciais inválidas'
                }, status=status.HTTP_401_UNAUTHORIZED)

            # Autentica com username
            user = authenticate(request, username=username, password=password)

            if user:
                if not user.is_active:
                    return Response({
                        'error': 'Conta desativada'
                    }, status=status.HTTP_401_UNAUTHORIZED)

                # Gera tokens JWT
                refresh = RefreshToken.for_user(user)
                access_token = refresh.access_token

                return Response({
                    'message': 'Login realizado com sucesso',
                    'user': UserDetailsSerializer(user).data,
                    'access': str(access_token),
                    'refresh': str(refresh),
                }, status=status.HTTP_200_OK)

            return Response({
                'error': 'Credenciais inválidas'
            }, status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    """
    View para mudança de senha.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user

            # Verifica senha atual
            if not user.check_password(serializer.validated_data['old_password']):
                return Response({
                    'error': 'Senha atual incorreta'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Define nova senha
            user.set_password(serializer.validated_data['new_password1'])
            user.save()

            return Response({
                'message': 'Senha alterada com sucesso'
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetView(APIView):
    """
    View para solicitação de reset de senha.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']

            try:
                user = User.objects.get(email=email)

                # Gera token de reset
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk))

                # URL de reset (você pode personalizar)
                reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"

                # Envia email
                subject = 'Reset de Senha - Odonto Premium'
                message = f"""
                Olá {user.first_name},
                
                Você solicitou um reset de senha. Clique no link abaixo para redefinir sua senha:
                
                {reset_url}
                
                Se você não fez esta solicitação, ignore este email.
                
                Atenciosamente,
                Equipe Odonto Premium
                """

                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )

                return Response({
                    'message': 'Email de reset enviado com sucesso'
                }, status=status.HTTP_200_OK)

            except User.DoesNotExist:
                # Por segurança, não revela se o email existe
                return Response({
                    'message': 'Se o email existir, você receberá instruções para reset'
                }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmView(APIView):
    """
    View para confirmação de reset de senha.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            try:
                uid = force_str(urlsafe_base64_decode(
                    serializer.validated_data['uid']))
                user = User.objects.get(pk=uid)
                token = serializer.validated_data['token']

                if default_token_generator.check_token(user, token):
                    user.set_password(
                        serializer.validated_data['new_password1'])
                    user.save()

                    return Response({
                        'message': 'Senha redefinida com sucesso'
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({
                        'error': 'Token inválido ou expirado'
                    }, status=status.HTTP_400_BAD_REQUEST)

            except (TypeError, ValueError, OverflowError, User.DoesNotExist):
                return Response({
                    'error': 'Token inválido'
                }, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    """
    Retorna os dados do usuário logado.
    """
    serializer = UserDetailsSerializer(request.user)
    return Response(serializer.data)
