"""
Middleware para gerenciar o contexto da requisição
Responsável por inicializar e limpar contexto global
"""

import uuid
from django.utils.deprecation import MiddlewareMixin
from core.tenancy.context import (
    reset_context,
    set_request_id,
    get_request_id,
    set_current_user
)


class RequestContextMiddleware(MiddlewareMixin):
    """Middleware para gerenciar o contexto global da requisição"""
    
    def process_request(self, request):
        """Inicializa o contexto no início da requisição"""
        # Reset contexto para garantir estado limpo
        reset_context()
        
        # Extrai ou gera request_id
        request_id = self._extrair_request_id(request)
        set_request_id(request_id)
        
        # Armazena no request para acesso posterior
        request.request_id = request_id
        
        return None
    
    def process_response(self, request, response):
        """Limpa o contexto ao final da requisição"""
        # Adiciona request_id ao header de resposta
        request_id = get_request_id()
        if request_id:
            response['X-Request-ID'] = request_id
        
        # Reset contexto
        reset_context()
        
        return response
    
    def process_exception(self, request, exception):
        """Limpa o contexto em caso de exceção"""
        reset_context()
        return None
    
    def _extrair_request_id(self, request) -> str:
        """Extrai request_id do header ou gera um novo"""
        # Tenta extrair do header X-Request-ID
        request_id = request.headers.get('X-Request-ID')
        
        # Se não foi fornecido, gera um novo
        if not request_id:
            request_id = str(uuid.uuid4())
        
        # Valida formato (deve ser UUID válido)
        try:
            # Valida se é UUID válido
            uuid.UUID(request_id)
            return request_id
        except ValueError:
            # Se não for UUID válido, gera um novo
            return str(uuid.uuid4())
