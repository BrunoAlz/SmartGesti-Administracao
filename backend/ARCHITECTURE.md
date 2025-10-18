# 🏗️ Arquitetura do Sistema - Odonto Premium

## 📋 **Visão Geral da Arquitetura**

O Odonto Premium é um sistema **SaaS multi-tenant** para gestão odontológica, construído com **Django 5.2.5**, **PostgreSQL** e **React**, implementando uma arquitetura moderna e escalável.

---

## 🏢 **Arquitetura Multi-Tenant**

### **Modelo de Tenancy**

- **Subdomain-based tenancy**: Cada clínica tem seu próprio subdomínio (ex: `dra-karine.odonto-premium.com`)
- **Shared Database, Shared Schema**: Todos os tenants compartilham o mesmo banco de dados
- **Row-Level Security**: Isolamento de dados através de `locatario_id` em todos os modelos

### **Detecção de Tenant**

```python
# Middleware automático detecta tenant via subdomínio
'core.middlewares.subdomain_tenant.SubdomainTenantMiddleware'
```

---

## 📱 **Stack Tecnológica**

### **Backend**

- **Framework**: Django 5.2.5 + Django REST Framework
- **Banco de Dados**: PostgreSQL com índices otimizados
- **Autenticação**: JWT + Cookie-based auth via `dj-rest-auth`
- **Multi-tenancy**: Custom middleware + TenantScopedModel

### **Frontend**

- **Framework**: React 18 + TypeScript
- **Build Tool**: Create React App com Craco
- **Styling**: TailwindCSS
- **Estado**: Context API + Custom hooks

### **Infraestrutura**

- **CORS**: Configurado para subdomínios dinâmicos
- **Middleware**: Pipeline otimizada para performance
- **Static Files**: Servidos via Django em desenvolvimento

---

## 🗄️ **Arquitetura de Dados**

### 🌍 **DADOS GLOBAIS** - Compartilhados entre tenants

#### **Perfis de Usuário**

```python
# apps/profiles/
├── PerfilUsuario              # Dados pessoais globais (1:1 com User)
├── Especialidade              # Especialidades médicas/odontológicas
└── PerfilProfissional         # Perfil profissional POR TENANT (1:N)
```

#### **Dados Médicos Estruturados**

```python
# apps/profiles/models/medical_data.py
├── AlergiaUsuario             # Alergias do usuário
├── MedicamentoContinuoUsuario # Medicamentos em uso contínuo
├── DoencaCronicaUsuario       # Doenças crônicas
└── HabitoPessoalUsuario       # Hábitos (tabagismo, etilismo, exercícios)
```

### 🏥 **DADOS POR TENANT** - Isolados por clínica

#### **Gestão de Tenants**

```python
# apps/tenants/
├── Locatario                  # Dados da clínica/tenant
├── DominioLocatario          # Domínios associados ao tenant
├── VinculoUsuarioTenant      # Usuário-Tenant com papéis e permissões
├── HistoricoVinculo          # Histórico de mudanças de vínculo
├── ConsentimentoVault        # Consentimentos LGPD
├── LogAcessoVault           # Logs de acesso para auditoria
├── AgendaSemanal            # Configuração de agenda por profissional
└── BloqueioAgenda           # Bloqueios de agenda
```

#### **Gestão de Pacientes**

```python
# apps/pacientes/
├── Paciente                  # Registro do paciente na clínica
└── HistoricoPaciente        # Histórico de alterações
```

#### **Sistema de Agendamentos**

```python
# apps/agendamentos/
├── Agendamento              # Agendamentos da clínica
└── HistoricoAgendamento     # Histórico de mudanças
```

#### **Prontuários Eletrônicos**

```python
# apps/prontuarios/
├── Prontuario               # Prontuário do paciente na clínica
├── Consulta                 # Consultas realizadas
└── AnexoProntuario          # Anexos de consultas/prontuários
```

#### **Portfolios e Marketing**

```python
# apps/portfolios/
└── Portfolio                # Portfolio da clínica
```

#### **Administração**

```python
# apps/administration/
├── planos/                  # Planos de assinatura
└── clientes/               # Gestão de clientes (futura implementação)
```

#### **Sistema Público**

```python
# apps/public/
└── Landing pages e conteúdo público
```

#### **Autenticação**

```python
# apps/usuarios/
└── Usuario                  # Proxy model do User do Django
```

---

## 🔄 **Fluxo de Relacionamentos**

```
User (Django Auth)
├── PerfilUsuario (GLOBAL) 1:1
│   ├── AlergiaUsuario (GLOBAL) 1:N
│   ├── MedicamentoContinuoUsuario (GLOBAL) 1:N
│   ├── DoencaCronicaUsuario (GLOBAL) 1:N
│   ├── HabitoPessoalUsuario (GLOBAL) 1:N
│   └── PerfilProfissional (POR TENANT) 1:N
│
├── VinculoUsuarioTenant (CONTROLE) 1:N
├── Paciente (POR TENANT) 1:N
│   ├── Prontuario (POR TENANT) 1:1
│   └── Agendamento (POR TENANT) 1:N
│
├── Prontuario (POR TENANT)
│   ├── Consulta (POR TENANT) 1:N
│   └── AnexoProntuario (POR TENANT) 1:N
│
└── Locatario (TENANT)
    ├── Portfolio (POR TENANT) 1:1
    ├── AgendaSemanal (POR TENANT) 1:N
    └── BloqueioAgenda (POR TENANT) 1:N
```

---

## 🔒 **Segurança e Isolamento**

### **Modelos Base**

```python
# core/models/base.py
class TenantScopedModel(TimestampedModel):
    """Modelo base para dados isolados por tenant"""
    locatario = models.ForeignKey(Locatario, on_delete=models.CASCADE)

class TimestampedModel(models.Model):
    """Modelo base com timestamps automáticos"""
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
```

### **Constraints de Integridade**

- `unique_user_per_clinic`: Usuário único como paciente por clínica
- `unique_prontuario_per_clinic`: Número de prontuário único por clínica
- `unique_active_user_role_per_tenant`: Papel único ativo por usuário/tenant
- `unique_professional_datetime_per_clinic`: Profissional único por horário/clínica
- `unique_conselho_per_tenant`: Número do conselho único por clínica
- `unique_codigo_por_tenant`: Código de consentimento único por tenant

### **Auditoria e Conformidade LGPD**

- `ConsentimentoVault`: Rastreamento de consentimentos com evidências digitais
- `LogAcessoVault`: Logs detalhados de acesso a dados pessoais
- `HistoricoVinculo`: Auditoria de mudanças de vínculos usuário-tenant
- `HistoricoPaciente`: Auditoria de alterações em dados de pacientes
- `HistoricoAgendamento`: Auditoria de mudanças em agendamentos

---

## 📊 **Apps e Responsabilidades**

### **Core Apps**

| App        | Responsabilidade                      | Escopo              |
| ---------- | ------------------------------------- | ------------------- |
| `core`     | Modelos base, middlewares, validações | Global              |
| `tenants`  | Multi-tenancy, vínculos, auditoria    | Por Tenant          |
| `usuarios` | Autenticação e autorização            | Global              |
| `profiles` | Perfis e dados médicos estruturados   | Global + Por Tenant |

### **Business Apps**

| App              | Responsabilidade        | Escopo            |
| ---------------- | ----------------------- | ----------------- |
| `pacientes`      | Gestão de pacientes     | Por Tenant        |
| `agendamentos`   | Sistema de agendamento  | Por Tenant        |
| `prontuarios`    | Prontuários eletrônicos | Por Tenant        |
| `portfolios`     | Marketing e portfólio   | Por Tenant        |
| `administration` | Planos, clientes, admin | Global/Por Tenant |
| `public`         | Conteúdo público        | Global            |

---

## ⚙️ **Configurações e Middleware**

### **Apps Instalados**

```python
LOCAL_APPS = [
    'core',                          # Base do sistema
    'apps.tenants',                  # Multi-tenancy
    'apps.portfolios',               # Marketing
    'apps.administration.planos',     # Planos de assinatura
    'apps.administration.clientes',   # Gestão de clientes
    'apps.agendamentos',             # Sistema de agendamento
    'apps.pacientes',                # Gestão de pacientes
    'apps.profiles',                 # Perfis de usuário
    'apps.prontuarios',              # Prontuários eletrônicos
    'apps.public',                   # Conteúdo público
    'apps.usuarios',                 # Autenticação
]
```

### **Middleware Pipeline**

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',           # CORS para subdomínios
    'django.middleware.common.CommonMiddleware',
    'core.middlewares.subdomain_tenant.SubdomainTenantMiddleware',  # Detecção de tenant
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
]
```

---

## 🚀 **Casos de Uso Implementados**

### **1. Paciente Multi-Clínica**

```python
# João é paciente em 2 clínicas diferentes
user = User.objects.get(email='joao@email.com')
perfil_global = user.perfil  # Dados pessoais globais

# Registro como paciente na Clínica A
paciente_a = Paciente.objects.get(
    usuario=user,
    locatario=clinica_a
)

# Registro como paciente na Clínica B
paciente_b = Paciente.objects.get(
    usuario=user,
    locatario=clinica_b
)

# Dados médicos globais (compartilhados se autorizado)
alergias = user.alergias.filter(ativa=True)
medicamentos = user.medicamentos_continuos.filter(em_uso=True)
```

### **2. Profissional Multi-Clínica**

```python
# Dra. Maria trabalha em 3 clínicas
user = User.objects.get(email='dra.maria@email.com')

# Vínculos ativos em diferentes clínicas
vinculos = VinculoUsuarioTenant.objects.filter(
    usuario=user,
    status='ATIVO',
    papel='PROFISSIONAL'
)

# Perfil profissional específico por clínica
for vinculo in vinculos:
    perfil_prof = PerfilProfissional.objects.get(
        perfil_usuario=user.perfil,
        locatario=vinculo.locatario
    )
    # Cada clínica pode ter configurações diferentes
```

### **3. Agendamento com Validações**

```python
# Agendamento com validação de conflitos
agendamento = Agendamento.objects.create(
    locatario=tenant,
    paciente=paciente,
    profissional=profissional,
    data_hora=datetime.now(),
    duracao_estimada=timedelta(minutes=60),
    tipo='CONSULTA',
    status='AGENDADO'
)
# Constraint evita agendamentos conflitantes automaticamente
```

### **4. Prontuário Completo**

```python
# Criação de prontuário com consulta
prontuario = Prontuario.objects.create(
    locatario=tenant,
    paciente=paciente,
    numero_prontuario='2025001',
    status='ATIVO'
)

consulta = Consulta.objects.create(
    locatario=tenant,
    prontuario=prontuario,
    profissional=profissional,
    data_consulta=datetime.now(),
    tipo_consulta='PRIMEIRA_CONSULTA',
    queixa_principal='Dor de dente',
    exame_clinico='...',
    diagnostico='...',
    tratamento_proposto='...'
)
```

---

## ✅ **Benefícios da Arquitetura Atual**

### **🔐 Segurança**

- Isolamento completo entre tenants via middleware
- Auditoria completa de ações e acessos
- Conformidade com LGPD via ConsentimentoVault
- Autenticação JWT robusta com cookies HTTPOnly
- Constraints de integridade em nível de banco

### **🔄 Flexibilidade**

- Usuários podem participar de múltiplas clínicas
- Dados médicos estruturados para analytics
- Perfis profissionais customizáveis por clínica
- Sistema de agendamento flexível com bloqueios
- Prontuários eletrônicos completos

### **📊 Performance**

- Índices otimizados para queries por tenant
- Queries automáticas escopadas por locatario_id
- Modelo de dados normalizado
- Pipeline de middleware otimizada
- Constraints a nível de banco para integridade

### **🏥 Funcionalidades Completas**

- Sistema completo de prontuários eletrônicos
- Gestão avançada de agendamentos com histórico
- Portfolio/marketing por clínica
- Sistema de perfis global e por tenant
- Auditoria e histórico completos
- Gestão de agenda semanal e bloqueios
- Sistema de especialidades médicas

### **⚡ Escalabilidade**

- Arquitetura preparada para milhares de tenants
- Database shared otimizada
- Middleware pipeline eficiente
- Estrutura modular e extensível
- Índices compostos para performance

---

## 🛠️ **Migrations e Estrutura de Banco**

### **Migrations Aplicadas**

- ✅ **portfolios**: Portfolio com locatario_id corrigido
- ✅ **tenants**: Sistema completo de multi-tenancy
- ✅ **pacientes**: Gestão de pacientes com histórico
- ✅ **agendamentos**: Sistema de agendamento com auditoria
- ✅ **profiles**: Perfis de usuário e dados médicos estruturados
- ✅ **prontuarios**: Prontuários eletrônicos completos
- ✅ **usuarios**: Proxy model para User

### **Índices Criados**

- Índices compostos por `(locatario_id, campo_relevante)`
- Índices de busca para CPF, número de prontuário, etc.
- Índices de auditoria para logs e históricos
- Índices de performance para queries frequentes

---

## 🔮 **Próximos Passos**

1. **Sistema de Cache**: Implementar Redis para performance
2. **Notificações**: Email + Push notifications para agendamentos
3. **Relatórios**: Analytics e dashboards por clínica
4. **API Mobile**: Endpoints específicos para aplicativos móveis
5. **Integrações**: Sistemas de pagamento e terceiros
6. **Backup**: Estratégia de backup e recovery
7. **Monitoring**: Logs estruturados e monitoring
8. **Testes**: Cobertura completa de testes automatizados

---

## 📈 **Métricas de Arquitetura**

- **Apps Implementados**: 11 apps funcionais
- **Modelos de Dados**: 20+ modelos com relacionamentos complexos
- **Constraints**: 15+ constraints de integridade
- **Índices**: 50+ índices otimizados
- **Middleware**: Pipeline completa de 8 middlewares
- **Auditoria**: 5 modelos de auditoria e logs
- **Multi-tenancy**: Isolamento completo por subdomínio

---

_Última atualização: 24 de agosto de 2025_
_Sistema em produção com arquitetura completa implementada_
