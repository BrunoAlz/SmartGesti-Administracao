# 🎨 Design System - SmartGesti (Reestruturado)

## 🌟 Visão Geral

Este é o Design System centralizado do SmartGesti, fornecendo componentes reutilizáveis, hooks personalizados e um sistema de temas consistente para toda a aplicação. A estrutura foi reorganizada para manter tudo relacionado ao tema em um local centralizado.

## 📂 Nova Estrutura Centralizada

```
frontend/src/design-system/
├── components/        # Componentes reutilizáveis
│   ├── Button.tsx     # Sistema completo de botões
│   ├── Badge.tsx      # Sistema de badges
│   └── Card.tsx       # Sistema de cards
├── hooks/             # Hooks específicos de componente
├── theme/             # Sistema de tema centralizado
│   ├── README.md      # Documentação específica do tema
│   ├── classes.ts     # Classes CSS por tema (light/dark)
│   ├── components.ts  # Estilos base de componentes
│   ├── context.tsx    # Contexto React para o tema
│   ├── hooks.ts       # Hooks para gerenciamento de tema
│   ├── index.ts       # Exportações unificadas
│   ├── provider.tsx   # Provider do tema
│   ├── tokens.ts      # Design tokens (cores, espaçamento, etc.)
│   ├── types.ts       # Tipos comuns do tema
│   └── variables.ts   # Variáveis CSS e aplicação do tema
├── hooks.ts           # Re-exporta hooks/
├── index.ts           # Exportações principais - PONTO DE ENTRADA PRINCIPAL
├── theme-classes.ts   # Re-exporta theme/classes
├── theme.ts           # Re-exporta theme/
└── tokens.ts          # Re-exporta theme/tokens
```

## 🔄 Sistema de Importação Centralizado

Após a reestruturação, todas as importações devem ser feitas a partir do ponto de entrada principal do design system:

```typescript
// ✅ Forma correta - Importação centralizada
import { 
  Button, 
  Badge, 
  Card, 
  useThemeClasses, 
  useButtonClasses,
  ThemeProvider,
  useThemeContext
} from '@/design-system';

// ❌ Forma incorreta - Importação direta dos arquivos específicos
// import { useThemeClasses } from '@/design-system/hooks';
// import { ThemeProvider } from '@/design-system/theme';
```

## 🎨 Uso do Sistema de Temas

O sistema de temas foi completamente centralizado para facilitar o uso e manutenção:

```typescript
function MeuComponente() {
  // Hook para acesso ao tema e classes
  const { get, cn, theme, isDark } = useThemeClasses();
  
  return (
    <div className={cn(
      get('card'),           // Classes automáticas light/dark
      get('text.primary'),   // Texto com tema
      'p-4 rounded-lg'       // Estilos adicionais
    )}>
      {/* conteúdo */}
      
      {/* Acesso ao tema atual */}
      <p>Tema atual: {theme}</p>
      
      {/* Verificação condicional do tema */}
      {isDark ? 'Modo escuro ativo' : 'Modo claro ativo'}
    </div>
  );
}
```

## 🧩 Classes de Componentes

Para componentes específicos, use os hooks de classe dedicados:

```typescript
// Botões
const buttonClasses = useButtonClasses('primary', 'md', 'my-2');

// Badges
const badgeClasses = useBadgeClasses('success', 'sm', 'mr-2');

// Cards
const cardClasses = useCardClasses('elevated', 'p-4');
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

## 📚 Documentação Detalhada

Para mais informações sobre o sistema de temas centralizado, consulte:
- [Sistema de Tema](/frontend/src/design-system/theme/README.md) - Documentação detalhada
- [Componentes do UI-Kit](/frontend/src/admin/pages/ui-kit/) - Exemplos interativos

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

1. **theme/components.ts** - Adicionar classes:
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

2. **theme/types.ts** - Atualizar tipos:
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
// 1. Importar componentes centralizados
import { Button, Badge, Card, useThemeClasses } from '@/design-system';
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
- **[Sistema de Tema](./theme/README.md)** - Documentação completa do sistema de tema

## 🛠️ Suporte

Para dúvidas ou sugestões sobre o Design System:
- 📖 Consulte a documentação interativa em `/admin/ui-kit`
- 📝 Verifique os exemplos de código nos componentes
- 📧 Entre em contato com a equipe de desenvolvimento

**Versão:** 3.0.0  
**Última atualização:** Janeiro 2025