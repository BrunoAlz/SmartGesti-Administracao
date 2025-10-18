"""
Configuração da aplicação core
Instala middlewares e wrappers durante a inicialização
"""

from django.apps import AppConfig
import logging

logger = logging.getLogger(__name__)


class CoreConfig(AppConfig):
    """Configuração da aplicação core"""
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'
    verbose_name = 'Core'

    def ready(self):
        """Executado quando a aplicação está pronta"""
        try:
            logger.info("Core app inicializada com sucesso")
            
        except Exception as e:
            logger.error(f"Erro na inicialização do core app: {e}", exc_info=True)
