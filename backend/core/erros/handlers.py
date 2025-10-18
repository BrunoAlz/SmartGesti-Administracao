"""
Handler global para tratamento de exceções do Django REST Framework
Garante que todas as respostas de erro tenham o formato {"errors": "..."}
"""

import logging
from typing import Any, Optional, Dict
from rest_framework.views import exception_handler as drf_default_handler
from rest_framework.response import Response
from rest_framework import status
from rest_framework.serializers import ValidationError
from rest_framework.exceptions import (
    AuthenticationFailed,
    NotAuthenticated,
    PermissionDenied,
    NotFound,
    MethodNotAllowed,
    NotAcceptable,
    UnsupportedMediaType,
    Throttled,
    ParseError
)
from django.core.exceptions import ValidationError as DjangoValidationError
from django.http import Http404
from .exceptions import ErroNegocio
from .responses import erro_response

logger = logging.getLogger('apps.saas.portfolios')


def _is_api_request(request) -> bool:
    """Verifica se a requisição é para uma rota da API"""
    if not hasattr(request, 'path'):
        return False
    
    path = request.path.lower().strip('/')
    
    # Define quais paths são considerados APIs
    api_prefixes = [
        'api/',
        'portfolios/',
        'tenants/', 
        'planos/',
        'public/',
    ]
    
    # Paths que NÃO devem ser processados pelo DRF handler
    non_api_prefixes = [
        'admin/',
        'static/',
        'media/',
        'favicon.ico',
        'robots.txt',
    ]
    
    # Primeiro verifica se é explicitamente não-API
    for prefix in non_api_prefixes:
        if path.startswith(prefix.lower()):
            return False
    
    # Depois verifica se é API
    for prefix in api_prefixes:
        if path.startswith(prefix.lower()):
            return True
    
    # Por padrão, considera não-API se não identificado
    return False


def drf_exception_handler(exc: Exception, context: dict) -> Optional[Response]:
    """Handler global para exceções do DRF
    
    Normaliza todas as respostas de erro para o formato {"errors": "..."}
    Apenas processa exceções de rotas da API, deixa admin e outras rotas para Django
    """
    
    # Verifica se a requisição é para uma rota da API
    request = context.get('request')
    if request and not _is_api_request(request):
        # Deixa Django lidar com exceções de admin, static, etc.
        return None
    
    # Erros de negócio customizados
    if isinstance(exc, ErroNegocio):
        return erro_response(exc.mensagem, exc.status_code)
    
    # Django ValidationError (vem dos models)
    if isinstance(exc, DjangoValidationError):
        mensagem = _extrair_mensagem_django_validation(exc)
        return erro_response(mensagem, status.HTTP_400_BAD_REQUEST)
    
    # Django Http404
    if isinstance(exc, Http404):
        return erro_response("Não encontrado", status.HTTP_404_NOT_FOUND)
    
    # Chama o handler padrão do DRF
    response = drf_default_handler(exc, context)
    
    if response is not None:
        # Normaliza resposta do DRF para nosso formato
        mensagem_erro = _extrair_mensagem_drf(response.data)
        return erro_response(mensagem_erro, response.status_code)
    
    # Exceção não tratada - erro 500
    logger.exception(
        "Exceção não tratada",
        extra={
            'exception_type': type(exc).__name__,
            'exception_message': str(exc),
            'view': context.get('view'),
            'request': context.get('request')
        }
    )
    return erro_response(
        "Erro interno do servidor", 
        status.HTTP_500_INTERNAL_SERVER_ERROR
    )


def _extrair_mensagem_django_validation(exc: DjangoValidationError) -> str:
    """Extrai mensagem de ValidationError do Django"""
    if hasattr(exc, 'message_dict'):
        # ValidationError com dicionário de erros por campo
        mensagens = []
        for campo, erros in exc.message_dict.items():
            if isinstance(erros, list):
                for erro in erros:
                    mensagens.append(f"{campo}: {erro}")
            else:
                mensagens.append(f"{campo}: {erros}")
        return "; ".join(mensagens)
    
    elif hasattr(exc, 'messages'):
        # ValidationError com lista de mensagens
        return "; ".join(exc.messages)
    
    else:
        # ValidationError simples
        return str(exc)


def _extrair_mensagem_drf(data: Any) -> str:
    """Extrai mensagem de erro dos dados de resposta do DRF"""
    if isinstance(data, dict):
        # Casos comuns do DRF
        if 'detail' in data:
            return str(data['detail'])
        
        if 'non_field_errors' in data:
            erros = data['non_field_errors']
            if isinstance(erros, list):
                return "; ".join(str(erro) for erro in erros)
            return str(erros)
        
        # Erros de validação por campo
        mensagens = []
        for campo, valor in data.items():
            if isinstance(valor, list):
                for erro in valor:
                    mensagens.append(f"{campo}: {erro}")
            else:
                mensagens.append(f"{campo}: {valor}")
        
        if mensagens:
            return "; ".join(mensagens)
    
    elif isinstance(data, list):
        # Lista de erros
        return "; ".join(str(erro) for erro in data)
    
    # Fallback: converter diretamente para string
    return str(data) if data else "Erro desconhecido"


# Mapeamentos de mensagens mais amigáveis para erros comuns do DRF
_MENSAGENS_CUSTOMIZADAS = {
    'AuthenticationFailed': 'Credenciais de autenticação inválidas',
    'NotAuthenticated': 'Autenticação obrigatória',
    'PermissionDenied': 'Permissão negada',
    'NotFound': 'Não encontrado',
    'MethodNotAllowed': 'Método não permitido',
    'NotAcceptable': 'Tipo de conteúdo não aceito',
    'UnsupportedMediaType': 'Tipo de mídia não suportado',
    'Throttled': 'Muitas requisições. Tente novamente mais tarde',
    'ParseError': 'Erro ao processar conteúdo da requisição',
    'ValidationError': 'Dados inválidos'
}
