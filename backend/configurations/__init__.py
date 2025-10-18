"""
Settings package para Django
Carrega configurações baseado na variável DJANGO_SETTINGS_MODULE
"""

import os
from decouple import config

# Determina qual ambiente usar
ENVIRONMENT = config('ENVIRONMENT', default='dev')

if ENVIRONMENT == 'production' or ENVIRONMENT == 'prod':
    from .prod import *
elif ENVIRONMENT == 'development' or ENVIRONMENT == 'dev':
    from .dev import *
else:
    # Fallback para desenvolvimento
    from .dev import *
    print(
        f"⚠️  Ambiente '{ENVIRONMENT}' não reconhecido, usando configurações de desenvolvimento")
