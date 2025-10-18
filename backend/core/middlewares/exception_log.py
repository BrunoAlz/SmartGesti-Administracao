"""
Middleware para captura e log de exceções não tratadas
Registra exceções antes que sejam processadas pelo handler DRF
"""

import logging
from django.utils.deprecation import MiddlewareMixin
from core.tenancy.context import get_request_id, get_current_tenant, get_current_user


class GlobalExceptionLogMiddleware(MiddlewareMixin):
    """Middleware para log de exceções não tratadas antes do handler DRF"""
    
    def process_exception(self, request, exception):
        """Captura e loga exceções não tratadas"""
        try:
            # Determina o logger baseado no path da requisição
            logger = self._get_logger_for_path(request.path)
            
            # Extrai informações do contexto
            request_id = get_request_id()
            tenant = get_current_tenant()
            user = get_current_user()
            
            # Monta mensagem de log
            method = request.method
            path = request.get_full_path()
            exception_type = type(exception).__name__
            exception_message = str(exception)
            
            message = f"UNHANDLED_EXCEPTION {method} {path} - {exception_type}: {exception_message[:200]}"
            
            # Faz o log com informações extras
            logger.error(
                message,
                exc_info=True,  # Inclui stack trace
                extra={
                    'method': method,
                    'path': path,
                    'exception_type': exception_type,
                    'exception_message': exception_message[:500],  # Mais espaço para exceções
                    'request_id': request_id,
                    'tenant_id': str(tenant.id) if tenant else None,
                    'tenant_nome': tenant.nome if tenant else None,
                    'user_id': user.id if user else None,
                    'user_email': getattr(user, 'email', None) if user else None,
                    'remote_addr': self._get_remote_addr(request),
                    'user_agent': request.headers.get('User-Agent', '')[:200],
                }
            )
            
        except Exception as e:
            # Fallback para o logger root em caso de erro
            root_logger = logging.getLogger('django')
            root_logger.error(
                f"Erro no GlobalExceptionLogMiddleware: {e}",
                exc_info=True
            )
        
        # Sempre retorna None para que a exceção seja processada pelo handler DRF
        return None
    
    def _get_logger_for_path(self, path):
        """Determina o logger apropriado baseado no path da requisição"""
        path_lower = path.lower().strip('/')
        
        # Mapeia prefixos de path para loggers específicos
        path_mappings = [
            ('api/portfolios', 'apps.saas.portfolios'),
            ('api/tenants', 'apps.tenants'), 
            ('api/public', 'apps.public'),
            ('api/planos', 'apps.planos'),
            ('admin', 'django.admin'),
            ('health', 'apps.public'),
        ]
        
        for prefix, logger_name in path_mappings:
            if path_lower.startswith(prefix):
                return logging.getLogger(logger_name)
        
        # Logger padrão para paths não mapeados
        return logging.getLogger('django.request')
    
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
