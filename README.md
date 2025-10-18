# 🏢 SmartGesTI - Sistema Administrativo

Sistema administrativo interno dedicado para gestão e controle do SmartGesTI.

## 📋 Visão Geral

Este projeto foi refatorado para ser exclusivamente um sistema administrativo, removendo toda a infraestrutura multi-tenant/SaaS e mantendo apenas funcionalidades de login e administração interna.

## 🚀 Tecnologias Utilizadas

### Backend
- **Django 5.2.5** - Framework web
- **Django REST Framework** - API REST
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação via tokens
- **Django Allauth** - Autenticação social

### Frontend
- **React 18** - Biblioteca frontend
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS
- **React Router** - Roteamento
- **React Query** - Gerenciamento de estado servidor
- **Framer Motion** - Animações

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- **Docker** e **Docker Compose** instalados
- **Node.js 18+** (para desenvolvimento frontend)
- **Python 3.11+** (para desenvolvimento backend)

### 1. Clone o Repositório
```bash
git clone https://github.com/BrunoAlz/SmartGesti-Administracao.git
cd SmartGesti-Administracao
```

### 2. Configuração com Docker (Recomendado)
```bash
# Subir todos os serviços
docker-compose up --build

# Acesse:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# Admin Django: http://localhost:8000/admin
```

### 3. Configuração Manual

#### Backend
```bash
cd backend

# Criar ambiente virtual
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Configurar banco (PostgreSQL)
# Copie .env.example para .env e configure

# Executar migrações
python manage.py migrate

# Criar superusuário
python manage.py createsuperuser

# Executar servidor
python manage.py runserver
```

#### Frontend
```bash
cd frontend

# Instalar dependências
npm install

# Executar desenvolvimento
npm start
```

## 🎯 Funcionalidades

### ✅ Implementadas
- [x] Sistema de autenticação administrativa
- [x] Login/logout com JWT
- [x] Dashboard administrativo
- [x] Interface responsiva
- [x] Configuração Docker

### 🔄 Em Desenvolvimento
- [ ] Gestão de usuários
- [ ] Relatórios administrativos
- [ ] Configurações do sistema
- [ ] Logs de auditoria

## 📊 Arquitetura Simplificada

### Backend
- **apps/usuarios/** - Autenticação e usuários
- **core/** - Utilitários genéricos
- **configurations/** - Configurações Django

### Frontend
- **src/admin/** - Módulo administrativo completo
- **src/contexts/** - Contextos React (Auth, Role)
- **src/config/** - Configurações de API

## 🔐 Autenticação

### Sistema de Login
- Login administrativo exclusivo
- Tokens JWT para autenticação
- Refresh automático de tokens
- Logout seguro

### Tipos de Usuário
- **Admin**: Acesso total ao sistema administrativo

## 📱 API Endpoints

### Principais Rotas
```
# Autenticação
POST /api/usuarios/auth/login/     # Login
POST /api/usuarios/auth/logout/    # Logout
POST /api/usuarios/auth/refresh/   # Refresh token

# Admin Django
GET  /admin/                       # Interface administrativa Django
```

## 🎨 Interface

### Design System
- **Framework**: Tailwind CSS
- **Responsivo**: Mobile-first design
- **Acessibilidade**: Padrões WCAG implementados
- **Animações**: Framer Motion para transições suaves

## 🌐 Deploy

### Produção
- **Backend**: Heroku/Railway com PostgreSQL
- **Frontend**: Vercel/Netlify
- **Arquivos estáticos**: AWS S3/Cloudinary

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

**Desenvolvedor**: Bruno
**Email**: bruno6821@gmail.com

---

⭐ **Sistema administrativo dedicado para controle interno do SmartGesTI**