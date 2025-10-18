# App Usuarios

## Estrutura de Diretórios

```
usuarios/
├── __init__.py
├── admin.py
├── apps.py
├── models.py               # Proxy import dos models da pasta
├── README.md
├── auth/                   # Backend de autenticação personalizado
│   ├── __init__.py
│   └── backends.py
├── forms/                  # Formulários Django
│   ├── __init__.py
│   └── usuario_forms.py
├── management/             # Comandos personalizados do Django
│   ├── __init__.py
│   └── commands/
│       ├── __init__.py
│       ├── atualizar_usuarios.py
│       └── criar_superusuario.py
├── managers/               # Managers customizados
│   ├── __init__.py
│   └── usuario_manager.py
├── migrations/             # Migrações do Django
├── models/                 # Modelos de dados
│   ├── __init__.py
│   └── usuario.py
├── serializers/            # Serializers DRF
│   ├── __init__.py
│   └── usuario_serializers.py
├── services/               # Lógica de negócio
│   ├── __init__.py
│   └── vinculo_service.py
├── urls/                   # Configuração de URLs
│   ├── __init__.py
│   └── usuario_urls.py
└── views/                  # Views e ViewSets
    ├── __init__.py
    ├── auth_views.py       # Views de autenticação padrão
    └── multitenant_views.py # Views multi-tenant
```

## Responsabilidades

- **models/**: Modelo Usuario (proxy do User Django)
- **serializers/**: Serialização para APIs REST
- **services/**: Lógica de vínculos multi-tenant
- **views/**: Views de autenticação e multi-tenant
- **auth/**: Backend de autenticação personalizado
- **forms/**: Formulários para Django Admin
- **managers/**: Managers customizados para User
- **management/**: Comandos personalizados do Django
