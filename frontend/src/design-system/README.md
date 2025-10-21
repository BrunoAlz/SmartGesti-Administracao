# 🎨 Design System - SmartGesti

## 🌟 Visão Geral

Este é o Design System completo do SmartGesti, que fornece componentes reutilizáveis, hooks personalizados e um sistema de temas consistente para toda a aplicação.

## 🗂️ Estrutura

```
design-system/
├── components/          # Componentes reutilizáveis
│   ├── Button.tsx      # Sistema completo de botões
│   ├── Badge.tsx       # Sistema de badges
│   └── Card.tsx        # Sistema de cards
├── hooks.ts            # Hooks personalizados para styling
├── theme-classes.ts    # Classes de tema (light/dark)
├── tokens.ts           # Tokens de design
├── docs/               # Documentação detalhada
│   ├── badges.md       # Documentação específica de badges
│   └── cards.md        # Documentação específica de cards
└── README.md           # Esta documentação
```

## 🎯 Como Usar

### 1. **Importações Básicas**

```typescript
// Componentes
import { Button } from '@/design-system/components/Button';
import { Badge } from '@/design-system/components/Badge';
import { Card } from '@/design-system/components/Card';

// Hooks
import { useThemeClasses, useButtonClasses, useBadgeClasses } from '@/design-system/hooks';

// Classes de tema
import { themeClasses } from '@/design-system/theme-classes';
```

### 2. **Sistema de Temas**

O sistema suporta **modo claro** e **escuro** automaticamente:

```typescript
const { get, cn } = useThemeClasses();

// Usar classes de tema
<div className={cn("p-4", get("bg.primary"))}>
  <h1 className={get("text.primary")}>Título</h1>
  <p className={get("text.secondary")}>Descrição</p>
</div>
```

### 3. **Hook Principal**
```tsx
const { theme, isDark, get, combine, cn } = useThemeClasses();
```

## 🔘 Sistema de Botões

### **Variantes Disponíveis**

#### **Botões Normais (Sólidos)**
```typescript
// Cores Primárias
<Button variant="primary">Botão Principal</Button>
<Button variant="secondary">Botão Secundário</Button>

// Cores de Status
<Button variant="success">Sucesso</Button>
<Button variant="danger">Perigo</Button>
<Button variant="warning">Aviso</Button>
<Button variant="info">Informação</Button>

// Cores Vibrantes
<Button variant="purple">Roxo</Button>
<Button variant="orange">Laranja</Button>
<Button variant="pink">Rosa</Button>
<Button variant="indigo">Índigo</Button>
<Button variant="cyan">Ciano</Button>
<Button variant="lime">Lima</Button>
```

#### **Botões Gradientes (Vibrantes)**
```typescript
// Use o sufixo "-gradient" para efeitos vibrantes
<Button variant="primary-gradient">Principal Gradiente</Button>
<Button variant="success-gradient">Sucesso Gradiente</Button>
<Button variant="danger-gradient">Perigo Gradiente</Button>
<Button variant="warning-gradient">Aviso Gradiente</Button>
<Button variant="info-gradient">Info Gradiente</Button>
<Button variant="purple-gradient">Roxo Gradiente</Button>
<Button variant="orange-gradient">Laranja Gradiente</Button>
<Button variant="pink-gradient">Rosa Gradiente</Button>
<Button variant="indigo-gradient">Índigo Gradiente</Button>
<Button variant="cyan-gradient">Ciano Gradiente</Button>
```

### **Propriedades do Botão**

```typescript
interface ButtonProps {
  variant: ButtonVariant;           // Cor do botão
  size?: 'sm' | 'md' | 'lg';       // Tamanho
  fullWidth?: boolean;             // Largura total
  disabled?: boolean;              // Desabilitado
  loading?: boolean;               // Estado de carregamento
  icon?: React.ReactNode;          // Ícone (Lucide React)
  iconPosition?: 'left' | 'right'; // Posição do ícone
  onClick?: () => void;            // Função de clique
  children: React.ReactNode;       // Texto do botão
}
```

### **Exemplos Práticos**

```typescript
// Botão com ícone
import { Plus, Save, Trash2 } from 'lucide-react';

<Button variant="success" icon={<Plus />}>
  Criar Novo
</Button>

<Button variant="primary" icon={<Save />} iconPosition="right">
  Salvar
</Button>

<Button variant="danger" icon={<Trash2 />} size="sm">
  Deletar
</Button>

// Botão de largura total
<Button variant="primary-gradient" fullWidth>
  Assinar Premium
</Button>

// Botão desabilitado
<Button variant="secondary" disabled>
  Indisponível
</Button>

// Botão com loading
<Button variant="primary" loading>
  Salvando...
</Button>
```

## 🏷️ Sistema de Badges

### **Variantes Disponíveis**

```typescript
// Status
<Badge variant="success">Ativo</Badge>
<Badge variant="danger">Inativo</Badge>
<Badge variant="warning">Pendente</Badge>
<Badge variant="info">Em Análise</Badge>
<Badge variant="purple">Premium</Badge>
<Badge variant="gray">Padrão</Badge>
```

### **Propriedades do Badge**

```typescript
interface BadgeProps {
  variant: BadgeVariant;          // Cor do badge
  size?: 'sm' | 'md' | 'lg';     // Tamanho
  icon?: React.ReactNode;        // Ícone opcional
  children: React.ReactNode;     // Texto do badge
}
```

### **Usando com Hook**

```typescript
const getBadgeClasses = useBadgeClasses();

<span className={getBadgeClasses('success')}>
  Status Ativo
</span>
```

### **Exemplos Práticos**

```typescript
import { CheckCircle, XCircle, Clock } from 'lucide-react';

// Badge simples
<Badge variant="success">Ativo</Badge>

// Badge com ícone
<Badge variant="success" icon={<CheckCircle />}>
  Aprovado
</Badge>

// Diferentes tamanhos
<Badge variant="info" size="sm">Pequeno</Badge>
<Badge variant="warning" size="md">Médio</Badge>
<Badge variant="danger" size="lg">Grande</Badge>
```

**📖 Documentação completa:** [badges.md](./docs/badges.md)

## 🃏 Sistema de Cards

### **Variantes Disponíveis**

```typescript
// Cards básicos
<Card>Conteúdo básico</Card>
<Card variant="elevated">Com sombra elevada</Card>
<Card variant="bordered">Com borda</Card>

// Cards interativos
<Card variant="interactive" onClick={() => {}}>
  Card clicável
</Card>
```

### **Propriedades do Card**

```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'bordered' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}
```

### **Componentes de Card**

```typescript
// Header do card
<Card.Header>
  <Card.Title>Título do Card</Card.Title>
  <Card.Subtitle>Subtítulo opcional</Card.Subtitle>
</Card.Header>

// Conteúdo do card
<Card.Content>
  <p>Conteúdo principal do card</p>
</Card.Content>

// Footer do card
<Card.Footer>
  <Button variant="primary">Ação</Button>
</Card.Footer>
```

### **Exemplos Práticos**

```typescript
// Card completo
<Card variant="elevated">
  <Card.Header>
    <Card.Title>Relatório Mensal</Card.Title>
    <Card.Subtitle>Outubro 2025</Card.Subtitle>
  </Card.Header>
  <Card.Content>
    <p>Resumo das vendas e métricas do mês.</p>
  </Card.Content>
  <Card.Footer>
    <Button variant="primary" size="sm">Ver Detalhes</Button>
  </Card.Footer>
</Card>

// Card interativo
<Card variant="interactive" onClick={() => navigate('/profile')}>
  <div className="flex items-center space-x-3">
    <Avatar src="/user.jpg" />
    <div>
      <h3>João Silva</h3>
      <p className="text-sm text-gray-500">Administrador</p>
    </div>
  </div>
</Card>
```

**📖 Documentação completa:** [cards.md](./docs/cards.md)

## 🎨 UI Kit - Documentação Interativa

Acesse `/admin/ui-kit` para ver todos os componentes em ação:

- **📘 /admin/ui-kit/buttons** - Todos os botões com exemplos
- **🏷️ /admin/ui-kit/badges** - Sistema de badges
- **🃏 /admin/ui-kit/cards** - Cartões e layouts
- **📝 /admin/ui-kit/inputs** - Campos de formulário (em desenvolvimento)

## ⚡ Hooks Personalizados

### **useThemeClasses()**
```typescript
const { get, cn } = useThemeClasses();

// get() - Obter classes de tema
const bgClass = get("bg.primary"); // "bg-white dark:bg-gray-900"

// cn() - Combinar classes (clsx + twMerge)
const classes = cn("p-4", get("text.primary"), someCondition && "font-bold");
```

### **useButtonClasses()**
```typescript
const getButtonClasses = useButtonClasses();

const buttonClass = getButtonClasses('primary'); // Classes completas do botão
```

### **useBadgeClasses()**
```typescript
const getBadgeClasses = useBadgeClasses();

const badgeClass = getBadgeClasses('success'); // Classes completas do badge
```

## 🎯 Casos de Uso Recomendados

### **Quando usar Botões Normais:**
- ✅ Interfaces corporativas
- ✅ Formulários profissionais
- ✅ Ações secundárias
- ✅ Botões de navegação

### **Quando usar Botões Gradientes:**
- ✨ Call-to-actions principais
- ✨ Botões de conversão
- ✨ Ações premium
- ✨ Destaques visuais

### **Quando usar Badges:**
- 🏷️ Status de objetos
- 🏷️ Categorização
- 🏷️ Indicadores visuais
- 🏷️ Contadores e métricas

### **Quando usar Cards:**
- 🃏 Agrupamento de conteúdo
- 🃏 Listas de itens
- 🃏 Dashboards
- 🃏 Formulários secionados

## 🔧 Personalização

### **Adicionando Nova Cor de Botão**

1. **theme-classes.ts** - Adicionar classes:
```typescript
button: {
  normal: {
    // ... cores existentes
    'nova-cor': 'bg-blue-600 hover:bg-blue-700 text-white',
  },
  gradient: {
    // ... gradientes existentes
    'nova-cor-gradient': 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white',
  }
}
```

2. **hooks.ts** - Atualizar tipos:
```typescript
type ButtonVariant = 
  | 'primary' | 'secondary' | 'success' // ... existentes
  | 'nova-cor' | 'nova-cor-gradient';   // Nova cor
```

### **Adicionando Nova Variante de Badge**

```typescript
badge: {
  // ... variantes existentes
  'nova-variante': 'bg-custom-100 text-custom-800 border-custom-200',
}
```

## 📱 Responsividade

Todos os componentes são **totalmente responsivos** e seguem os breakpoints do Tailwind:

- **sm:** >= 640px (mobile)
- **md:** >= 768px (tablet)
- **lg:** >= 1024px (desktop)
- **xl:** >= 1280px (desktop grande)

## 🌙 Modo Escuro

O sistema de temas **automaticamente** adapta todos os componentes para modo escuro. Não é necessário configuração adicional.

## 🚀 Quick Start para Agentes

```typescript
// 1. Importar componentes
import { Button } from '@/design-system/components/Button';
import { Badge } from '@/design-system/components/Badge';
import { Card } from '@/design-system/components/Card';
import { Plus, CheckCircle } from 'lucide-react';

// 2. Usar diretamente
<Card variant="elevated">
  <Card.Header>
    <Card.Title>Dashboard</Card.Title>
    <Badge variant="success" icon={<CheckCircle />}>
      Ativo
    </Badge>
  </Card.Header>
  <Card.Content>
    <p>Bem-vindo ao SmartGesti</p>
  </Card.Content>
  <Card.Footer>
    <Button variant="primary-gradient" icon={<Plus />}>
      Criar Novo
    </Button>
  </Card.Footer>
</Card>
```

## 📚 Documentação Adicional

- **[badges.md](./docs/badges.md)** - Guia completo de badges
- **[cards.md](./docs/cards.md)** - Guia completo de cards
- **UI Kit Interativo** - `/admin/ui-kit`

## 🛠️ Suporte

Para dúvidas ou sugestões sobre o Design System:
- 📖 Consulte a documentação interativa em `/admin/ui-kit`
- 📝 Verifique os exemplos de código nos componentes
- 📧 Entre em contato com a equipe de desenvolvimento

**Versão:** 2.0.0  
**Última atualização:** Dezembro 2024
