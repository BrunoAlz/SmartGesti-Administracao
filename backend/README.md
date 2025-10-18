# 🦷 Portfolio Backend - Sistema Multi-tenant

Backend Django REST API para sistema de portfólios multi-tenant para profissionais de odontologia.

## 🚀 Características

- **Multi-tenancy**: Isolamento por subdomínio (ex: `drjoao.lvh.me`)
- **Portfolio Editor**: Suporte completo ao `ProfessionalConfig` do frontend
- **Cache Inteligente**: Redis com invalidação automática
- **Logging Centralizado**: Logs estruturados por aplicação
- **API REST**: Endpoints otimizados com DRF
- **Admin Interface**: Interface administrativa completa

## 📋 Pré-requisitos

- Python 3.11+
- PostgreSQL 13+
- Redis 6+
- Node.js 18+ (para o frontend)

## ⚙️ Setup Desenvolvimento

### 1. Clone e Configuração

```bash
# Clone o repositório
git clone <repo-url>
cd backend

# Crie ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

# Instale dependências
pip install -r requirements.txt
```

### 2. Configuração do Banco de Dados

```bash
# PostgreSQL
sudo -u postgres psql
CREATE DATABASE portfolio_backend;
CREATE USER portfolio_user WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE portfolio_backend TO portfolio_user;
\q
```

### 3. Configuração do Environment

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite as configurações
nano .env
```

**Configurações essenciais no .env:**

```env
# Ambiente
ENVIRONMENT=dev
DEBUG=True
SECRET_KEY=django-insecure-dev-key-mude-em-producao

# Database
DB_NAME=portfolio_backend
DB_USER=portfolio_user
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432

# Redis
REDIS_URL=redis://localhost:6379/1

# Domínios (desenvolvimento)
APEX_DOMAIN=lvh.me
ALLOWED_BASE_HOSTS=.localhost,.lvh.me

# Superuser padrão (para seed)
SUPERUSER_USERNAME=admin
SUPERUSER_EMAIL=admin@localhost
SUPERUSER_PASSWORD=admin123
```

### 4. Migrações e Seed

```bash
# Execute migrações
python manage.py makemigrations
python manage.py migrate

# Crie dados de desenvolvimento
python manage.py seed_dev

# Para resetar tudo e recriar
python manage.py seed_dev --reset
```

### 5. Executar o Servidor

```bash
# Desenvolvimento
python manage.py runserver

# Com configurações específicas
DJANGO_SETTINGS_MODULE=projeto.settings.dev python manage.py runserver
```

## 🌐 Endpoints da API

### Endpoints Autenticados (requer login)

- **GET** `/api/portfolios/meu/` - Meu portfólio
- **PATCH** `/api/portfolios/{id}/autosave/` - Auto-save
- **POST** `/api/portfolios/publicar/` - Publicar portfólio
- **POST** `/api/portfolios/despublicar/` - Despublicar portfólio
- **GET** `/api/portfolios/estatisticas/` - Estatísticas

### Endpoints Públicos

- **GET** `/api/public/portfolio/` - Portfólio público (via subdomínio)
- **GET** `/api/public/info/` - Informações do tenant
- **GET** `/healthz/` - Health check

### Exemplo de Uso

```javascript
// Salvar portfólio (frontend → backend)
const saveToServer = async (config: ProfessionalConfig) => {
  await api.patch('/api/portfolios/123/autosave/', {
    versao_registro: 1,
    estado_editor_json: {
      slug: 'dr-joao',
      basic_info: {
        name: config.name,
        specialty: config.specialty,
        phone: config.contactInfo.phone,
        email: config.contactInfo.email,
      },
      config: config  // ProfessionalConfig completo
    }
  });
};
```

## 🏗️ Arquitetura

### Estrutura Multi-tenant

```
Domínio: drjoao.lvh.me
├── Middleware resolve tenant por subdomínio
├── Request.tenant = Locatario("Dr. João")
└── Managers filtram dados automaticamente
```

### Camadas da Aplicação

```
Views (REST API)
├── Serializers (validação)
├── Services (regras de negócio) 
├── Repositories (acesso a dados)
└── Models (tenant-aware)
```

### Estrutura do Portfolio

```python
# Modelo Portfolio
{
    "locatario": OneToOne(Locatario),
    "slug": "dr-joao",
    "basic_info": {
        "name": "Dr. João Silva",
        "specialty": "Odontologia Estética",
        "phone": "(11) 99999-9999",
        "email": "contato@drjoao.com.br"
    },
    "config": {
        # ProfessionalConfig completo do frontend
        "version": "1.0",
        "theme": {...},
        "sections": {...},
        # ... resto da configuração
    }
}
```

## 🔧 Comandos Úteis

```bash
# Dados de desenvolvimento
python manage.py seed_dev
python manage.py seed_dev --reset

# Migrações
python manage.py makemigrations
python manage.py migrate

# Superuser
python manage.py createsuperuser

# Shell interativo
python manage.py shell

# Coletarestáticos
python manage.py collectstatic

# Verificar configurações
python manage.py check
```

## 🌍 Ambientes

### Desenvolvimento (`dev.py`)
- Debug habilitado
- CORS permissivo
- Logs verbosos
- SQLite opcional
- Django Debug Toolbar

### Produção (`prod.py`)
- Debug desabilitado
- HTTPS forçado
- Logs otimizados  
- Sentry (opcional)
- Configurações de segurança

## 📊 Monitoramento

### Health Checks

```bash
# Sistema geral
curl http://localhost:8000/healthz/

# Específico do portfolio
curl http://localhost:8000/api/portfolios/health/
```

### Logs

```
logs/
├── requests/requests.log    # Requisições HTTP
├── db/slow.log             # Queries lentas
├── portfolios/app.log      # App portfolios
├── tenants/app.log         # App tenants
└── public/app.log          # App public
```

## 🐳 Docker (Opcional)

```bash
# Build
docker build -t portfolio-backend .

# Run
docker run -p 8000:8000 --env-file .env portfolio-backend

# Docker Compose
docker-compose up -d
```

## 🚀 Deploy

### Variáveis de Produção

```env
ENVIRONMENT=production
DEBUG=False
ALLOWED_HOSTS=meusite.com,*.meusite.com
APEX_DOMAIN=meusite.com
SECURE_SSL_REDIRECT=True
SENTRY_DSN=https://...
```

### Checklist de Deploy

- [ ] Configurar variáveis de ambiente
- [ ] Executar migrações
- [ ] Coletar arquivos estáticos
- [ ] Configurar servidor web (Nginx)
- [ ] Configurar domínio wildcard
- [ ] Configurar SSL wildcard
- [ ] Testar health checks

## 🤝 Frontend Integration

O backend foi projetado para trabalhar perfeitamente com seu frontend React. A estrutura do `ProfessionalConfig` é salva diretamente no campo `config` do modelo `Portfolio`.

### Fluxo de Dados

1. **Frontend** edita `ProfessionalConfig`
2. **Auto-save** envia para `/api/portfolios/{id}/autosave/`
3. **Backend** salva no campo `config` (JSONB)
4. **Publicação** torna disponível em `/api/public/portfolio/`
5. **Frontend público** consome dados do endpoint público

## 📞 Suporte

- 🐛 **Bugs**: Abra uma issue
- 💡 **Sugestões**: Discuta nas discussions
- 📖 **Documentação**: Veja a pasta `/docs`

---

**Desenvolvido com ❤️ para profissionais de odontologia** 🦷
