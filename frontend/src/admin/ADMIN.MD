# SmartGesTI - Sistema Administrativo

## Visão Geral

Sistema administrativo interno para gestão e controle do SmartGesTI. Interface dedicada para administradores do sistema com funcionalidades de monitoramento, configuração e gerenciamento.

## Funcionalidades Principais

### 🔐 Autenticação
- Login administrativo seguro
- Controle de sessão
- Tokens JWT para autenticação

### 📊 Dashboard Administrativo
- Visão geral do sistema
- Métricas de performance
- Status de serviços
- Ações rápidas

### 👥 Gerenciamento de Usuários
- Visualização de usuários do sistema
- Controle de permissões
- Monitoramento de atividades

### ⚙️ Configurações do Sistema
- Configurações gerais
- Parâmetros de sistema
- Manutenção e logs

### 📈 Analytics e Relatórios
- Relatórios de uso
- Métricas de performance
- Análise de dados

## Arquitetura

### Frontend
- **React + TypeScript** - Interface moderna e responsiva
- **Tailwind CSS** - Estilização utilitária
- **React Router** - Navegação SPA
- **React Query** - Gerenciamento de estado servidor
- **Framer Motion** - Animações suaves

### Backend
- **Django REST Framework** - API robusta
- **JWT Authentication** - Autenticação segura
- **PostgreSQL** - Banco de dados principal

## Estrutura do Projeto

```
admin/
├── components/          # Componentes reutilizáveis
├── contexts/           # Contextos React (Theme, Auth)
├── hooks/              # Hooks customizados
├── layout/             # Layout e navegação
├── pages/              # Páginas do admin
│   ├── auth/          # Autenticação
│   ├── dashboard/     # Dashboard principal
│   └── ...
├── services/           # Serviços de API
├── types/              # Definições TypeScript
└── utils/              # Utilitários
```

## Serviços

### AdminAuthApiService
Serviço principal para autenticação administrativa:
- Login/logout
- Refresh de tokens
- Gerenciamento de sessão
- Validação de permissões

## Tecnologias Utilizadas

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS
- **React Router** - Roteamento
- **React Query** - Estado servidor
- **Framer Motion** - Animações
- **Lucide React** - Ícones
- **React Hot Toast** - Notificações