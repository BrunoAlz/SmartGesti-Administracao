"""
Configurações para ambiente de produção
"""

import logging
from .base import *
from decouple import config

# Debug sempre False em produção
DEBUG = False

# Hosts permitidos devem ser específicos em produção
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv())

# Configurações de segurança para produção
SECURE_SSL_REDIRECT = config('SECURE_SSL_REDIRECT', default=True, cast=bool)
SECURE_HSTS_SECONDS = config('SECURE_HSTS_SECONDS', default=31536000, cast=int)  # 1 ano
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_REFERRER_POLICY = 'strict-origin-when-cross-origin'

# Cookies seguros
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True

# Database com configurações otimizadas para produção
DATABASES['default'].update({
    'CONN_MAX_AGE': config('DB_CONN_MAX_AGE', default=300, cast=int),
    'OPTIONS': {
        'options': '-c default_transaction_isolation=read_committed',
        'sslmode': config('DB_SSL_MODE', default='prefer'),
    }
})

# Cache com configurações otimizadas
CACHES['default'].update({
    'OPTIONS': {
        'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        'COMPRESSOR': 'django_redis.compressors.zlib.ZlibCompressor',
        'IGNORE_EXCEPTIONS': True,
    },
    'TIMEOUT': config('CACHE_TIMEOUT', default=3600, cast=int),
})

# Configurações de email para produção
EMAIL_BACKEND = config('EMAIL_BACKEND', default='django.core.mail.backends.smtp.EmailBackend')
EMAIL_HOST = config('EMAIL_HOST', default='')
EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=True, cast=bool)
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL', default='noreply@example.com')

# Static files com WhiteNoise para servir arquivos estáticos
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Logging otimizado para produção
LOGGING['handlers']['console']['level'] = 'WARNING'

# Configurações específicas para produção
SLOW_DB_THRESHOLD_MS = config('SLOW_DB_THRESHOLD_MS', default=2000, cast=int)

# CORS restritivo em produção
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', cast=Csv())
CORS_ALLOW_CREDENTIALS = True

# Configurações de performance
USE_ETAGS = True
PREPEND_WWW = config('PREPEND_WWW', default=False, cast=bool)

# Configurações de arquivo
FILE_UPLOAD_MAX_MEMORY_SIZE = config('FILE_UPLOAD_MAX_MEMORY_SIZE', default=2621440, cast=int)  # 2.5MB
DATA_UPLOAD_MAX_MEMORY_SIZE = config('DATA_UPLOAD_MAX_MEMORY_SIZE', default=2621440, cast=int)  # 2.5MB

# Configurações adicionais de segurança
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Sentry para monitoramento de erros (se configurado)
SENTRY_DSN = config('SENTRY_DSN', default='')
if SENTRY_DSN:
    import sentry_sdk
    from sentry_sdk.integrations.django import DjangoIntegration
    from sentry_sdk.integrations.redis import RedisIntegration
    from sentry_sdk.integrations.logging import LoggingIntegration
    
    sentry_logging = LoggingIntegration(
        level=logging.INFO,
        event_level=logging.ERROR
    )
    
    sentry_sdk.init(
        dsn=SENTRY_DSN,
        integrations=[
            DjangoIntegration(transaction_style='url'),
            RedisIntegration(),
            sentry_logging,
        ],
        traces_sample_rate=config('SENTRY_TRACES_SAMPLE_RATE', default=0.1, cast=float),
        send_default_pii=False,
        environment=config('ENVIRONMENT', default='production'),
        release=config('APP_VERSION', default='1.0.0'),
    )

# Health check endpoint
HEALTH_CHECK_URL = config('HEALTH_CHECK_URL', default='/healthz/')

print("🚀 Executando em modo PRODUÇÃO")
print(f"🔒 SSL Redirect: {SECURE_SSL_REDIRECT}")
print(f"💾 Database SSL: {DATABASES['default']['OPTIONS']['sslmode']}")
print(f"🔄 Cache Timeout: {CACHES['default']['TIMEOUT']}s")
print(f"📧 Email Backend: {EMAIL_BACKEND}")
print(f"🔍 Sentry: {'Configurado' if SENTRY_DSN else 'Não configurado'}")
