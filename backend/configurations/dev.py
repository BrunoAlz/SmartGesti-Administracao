"""
Configurações para ambiente de desenvolvimento
"""

from .base import *
from decouple import config

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {},
}

# Debug sempre True em desenvolvimento
DEBUG = True
DEBUG_PROPAGATE_EXCEPTIONS = True

# Hosts permitidos para desenvolvimento
ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '*.lvh.me',
    '*.localhost',
    'http://dra-karine-viveiros.localhost:3000',
    'dra-karine-viveiros.localhost',
    'http://dra-karine-viveiros.lvh.me:3000',
    'dra-karine-viveiros.lvh.me',
    'http://dra-karine-viveiros.lvh.me',
    '*',  # Permitir todos os hosts em desenvolvimento
]

# Base hosts para desenvolvimento (com localhost como padrão)
ALLOWED_BASE_HOSTS = ['.localhost', '.lvh.me']
APEX_DOMAIN = 'localhost'  # Alinhado com frontend que usa *.localhost:3000

# CORS mais permissivo em desenvolvimento
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# Headers custom liberados específicos para desenvolvimento
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
    'x-tenant',
    'x-subdomain-access',
    'x-request-time',
    'skip-auth',
    'skip-tenant',
]

# Métodos permitidos
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

# Tempo de cache do preflight
CORS_PREFLIGHT_MAX_AGE = 86400

# Database para desenvolvimento (pode usar SQLite se preferir)
if config('USE_SQLITE_DEV', default=False, cast=bool):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db_dev.sqlite3',
        }
    }

# Use database sessions in development to avoid Redis dependency
SESSION_ENGINE = 'django.contrib.sessions.backends.db'

# Cache pode usar local memory cache em desenvolvimento
if config('USE_LOCAL_CACHE_DEV', default=True, cast=bool):
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        }
    }

# Email backend para desenvolvimento
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Logging mais verboso em desenvolvimento
LOGGING['loggers']['django.db.backends'] = {
    'handlers': ['console'],
    'level': 'DEBUG',
    'propagate': False,
}

# Configurações de segurança mais relaxadas para desenvolvimento
SECURE_SSL_REDIRECT = False
SECURE_HSTS_SECONDS = 0
SECURE_HSTS_INCLUDE_SUBDOMAINS = False
SECURE_HSTS_PRELOAD = False

# Configurações específicas para desenvolvimento
SLOW_DB_THRESHOLD_MS = 500  # Threshold menor para desenvolvimento

# Override de configurações via .env específicas para dev
if config('DEV_SECRET_KEY', default=None):
    SECRET_KEY = config('DEV_SECRET_KEY')
