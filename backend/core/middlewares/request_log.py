"""
Middleware para logging de requisições HTTP
Registra início, fim e métricas de cada requisição
"""

import time
import logging
from django.utils.deprecation import MiddlewareMixin
from core.tenancy.context import get_request_id, get_current_tenant, get_current_user

logger = logging.getLogger('requests')


class RequestLogMiddleware(MiddlewareMixin):
    """Middleware para log detalhado de requisições HTTP"""
    
    def process_request(self, request):
        """Marca o início da requisição"""
        request._start_time = time.perf_counter()
        return None
    
    def process_response(self, request, response):
        """Registra a requisição completa"""
        self._log_request(request, response)
        return response
    
    def process_exception(self, request, exception):
        """Registra requisição que terminou com exceção"""
        # Cria uma resposta fake com status 500 para o log
        class FakeResponse:
            status_code = 500
            
            def get(self, header, default=None):
                return default
        
        fake_response = FakeResponse()
        self._log_request(request, fake_response, exception=exception)
        return None
    
    def _log_request(self, request, response, exception=None):
        """Faz o log da requisição"""
        try:
            # Calcula duração
            duration = self._calculate_duration(request)
            
            # Extrai informações da requisição
            method = request.method
            path = request.get_full_path()
            status_code = response.status_code
            content_length = self._get_content_length(response)
            remote_addr = self._get_remote_addr(request)
            user_agent = request.headers.get('User-Agent', '-')[:200]  # Trunca
            
            # Monta mensagem de log
            if exception:
                message = f"REQUEST_EXCEPTION {method} {path} - {status_code} - {duration:.0f}ms - {type(exception).__name__}: {str(exception)[:100]}"
                log_level = logging.ERROR
            else:
                message = f"REQUEST {method} {path} - {status_code} - {duration:.0f}ms"
                log_level = self._get_log_level(status_code)
            
            # Faz o log com informações extras
            logger.log(
                log_level,
                message,
                extra={
                    'method': method,
                    'path': path,
                    'status_code': status_code,
                    'duration_ms': round(duration, 2),
                    'content_length': content_length,
                    'remote_addr': remote_addr,
                    'user_agent': user_agent,
                    'exception_type': type(exception).__name__ if exception else None,
                    'exception_message': str(exception)[:200] if exception else None,
                }
            )
            
        except Exception as e:
            # Não deve falhar o request por erro no logging
            logger.error(f"Erro no RequestLogMiddleware: {e}", exc_info=True)
    
    def _calculate_duration(self, request):
        """Calcula a duração da requisição em milissegundos"""
        start_time = getattr(request, '_start_time', None)
        if start_time:
            return (time.perf_counter() - start_time) * 1000
        return 0
    
    def _get_content_length(self, response):
        """Extrai o tamanho do conteúdo da resposta"""
        try:
            content_length = response.get('Content-Length')
            if content_length:
                return int(content_length)
            
            # Tenta estimar pelo conteúdo
            if hasattr(response, 'content'):
                return len(response.content)
            
        except (ValueError, AttributeError):
            pass
        
        return 0
    
    def _get_remote_addr(self, request):
        """Extrai o endereço IP do cliente"""
        # Verifica headers de proxy primeiro
        x_forwarded_for = request.headers.get('X-Forwarded-For')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0].strip()
        
        x_real_ip = request.headers.get('X-Real-IP')
        if x_real_ip:
            return x_real_ip
        
        # Fallback para REMOTE_ADDR
        return request.META.get('REMOTE_ADDR', '-')
    
    def _get_log_level(self, status_code):
        """Determina o nível de log baseado no status code"""
        if status_code >= 500:
            return logging.ERROR
        elif status_code >= 400:
            return logging.WARNING
        else:
            return logging.INFO
    
    def _should_log_request(self, request):
        """Determina se a requisição deve ser logada"""
        # Pode ser usado para filtrar requisições (health checks, etc)
        path = request.get_full_path().lower()
        
        # Lista de paths que não devem ser logados (opcional)
        skip_paths = [
            '/health',
            '/healthz',
            '/favicon.ico',
        ]
        
        return not any(path.startswith(skip_path) for skip_path in skip_paths)
