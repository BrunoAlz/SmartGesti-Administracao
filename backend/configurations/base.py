# configurations/settings/base.py
from datetime import timedelta
import os
from pathlib import Path
from decouple import config, Csv
from corsheaders.defaults import default_headers, default_methods  # <-- ADD

BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)

ALLOWED_HOSTS = ['*']  # validação via middleware (ok pro seu MVP)

DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',  # Necessário para django-allauth
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'rest_framework.authtoken',  # Para tokens de autenticação
    'rest_framework_simplejwt',  # JWT tokens
    'corsheaders',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',  # Login com Google
    'dj_rest_auth',
    'dj_rest_auth.registration',
]

LOCAL_APPS = [
    'core',  # mantém apenas utils genéricos
    'apps.usuarios',  # autenticação
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
]
ROOT_URLCONF = 'configurations.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                # Django-allauth context processors
                'django.template.context_processors.request',
            ],
        },
    },
]

WSGI_APPLICATION = 'configurations.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='5432'),
        'OPTIONS': {},
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'America/Sao_Paulo'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static']

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ===== CONFIGURAÇÕES DE AUTENTICAÇÃO =====

# Site ID necessário para django-allauth
SITE_ID = 1

# Backend de autenticação personalizado para login com email
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',  # Login padrão
    'allauth.account.auth_backends.AuthenticationBackend',  # django-allauth
]

# Configurações do Django-allauth (nova sintaxe)
ACCOUNT_LOGIN_METHODS = ['email']  # Login apenas com email
ACCOUNT_EMAIL_VERIFICATION = 'optional'  # Verificação opcional por enquanto
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_LOGIN_ON_EMAIL_CONFIRMATION = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USER_MODEL_USERNAME_FIELD = None  # Não usa username
ACCOUNT_USER_MODEL_EMAIL_FIELD = 'email'

# Nova configuração para campos de signup (email* indica obrigatório)
ACCOUNT_SIGNUP_FIELDS = ['email*', 'password1*', 'password2*']

# URLs de redirecionamento
ACCOUNT_LOGIN_REDIRECT_URL = '/'
ACCOUNT_LOGOUT_REDIRECT_URL = '/'
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'

# Configurações do dj-rest-auth
REST_AUTH = {
    'USE_JWT': True,
    'JWT_AUTH_COOKIE': 'auth-token',
    'JWT_AUTH_REFRESH_COOKIE': 'refresh-token',
    'JWT_AUTH_SECURE': False,  # Mudar para True em produção com HTTPS
    'JWT_AUTH_HTTPONLY': True,
    'JWT_AUTH_SAMESITE': 'Lax',
    'USER_DETAILS_SERIALIZER': 'apps.usuarios.serializers.UserDetailsSerializer',
    'REGISTER_SERIALIZER': 'apps.usuarios.serializers.CustomRegisterSerializer',
}

# Configurações JWT
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
}

# Configurações de email (para desenvolvimento)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = config('EMAIL_HOST', default='smtp.gmail.com')
# EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
# EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=True, cast=bool)
# EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
# EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = config(
    'DEFAULT_FROM_EMAIL', default='noreply@odonto-premium.com')

# URL do frontend para links de email
FRONTEND_URL = config('FRONTEND_URL', default='http://localhost:3000')

# Configurações do Google OAuth (adicionar no .env depois)
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        },
        'OAUTH_PKCE_ENABLED': True,
    }
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',  # Muda para autenticado por padrão
    ],
    'DEFAULT_RENDERER_CLASSES': ['rest_framework.renderers.JSONRenderer'],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

# ==== CORS (base) ====
# Origens permitidas incluindo subdomínios para tenancy
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:3000,http://127.0.0.1:3000,http://dra-karine-viveiros.localhost:3000,http://dra-karine-viveiros.lvh.me:3000',
    cast=Csv()
)

# Para desenvolvimento também permitir todas as origens de subdomínios
if DEBUG:
    # Temporariamente permitir todas as origens para debug
    CORS_ALLOW_ALL_ORIGINS = True
    # Usar regex para aceitar qualquer subdomínio .localhost e .lvh.me
    CORS_ALLOWED_ORIGIN_REGEXES = [
        r"^http://[\w-]+\.localhost(:\d+)?$",  # *.localhost:porta
        r"^http://[\w-]+\.lvh\.me(:\d+)?$",    # *.lvh.me:porta
        r"^http://localhost(:\d+)?$",          # localhost:porta
        r"^http://127\.0\.0\.1(:\d+)?$",       # 127.0.0.1:porta
    ]

# Headers custom liberados (inclui x-tenant)
CORS_ALLOW_HEADERS = list(default_headers) + [
    'x-tenant',
    "x-subdomain-access"
]

# (Opcional) se quiser expor o header de volta ao front quando o front for ler:
CORS_EXPOSE_HEADERS = ['x-tenant']

# Métodos (normalmente default já cobre, mas deixo explícito)
CORS_ALLOW_METHODS = list(default_methods) + \
    ['PATCH', 'OPTIONS', 'GET', 'POST', 'PUT', 'DELETE']

# Credenciais só funcionam com origens explícitas (sem wildcard *)
CORS_ALLOW_CREDENTIALS = True
