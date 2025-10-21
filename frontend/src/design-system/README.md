# 🎨 Design System - SmartGesti

## � Visão Geral

Este é o Design System completo do SmartGesti, que fornece componentes reutilizáveis, hooks personalizados e um sistema de temas consistente para toda a aplicação.

## �️ Estrutura

```
design-system/
├── components/          # Componentes reutilizáveis
│   └── Button.tsx      # Sistema completo de botões
├── hooks.ts            # Hooks personalizados para styling
├── theme-classes.ts    # Classes de tema (light/dark)
├── tokens.ts           # Tokens de design
└── README.md           # Esta documentação
```

## 🎯 Como Usar

### 1. **Importações Básicas**

```typescript
// Componentes
import { Button } from '@/design-system/components/Button';

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

### **2. Hook Principal**
```tsx
const { theme, isDark, get, combine, cn } = useThemeClasses();
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
```

### **Usando com Hook**

```typescript
const getBadgeClasses = useBadgeClasses();

<span className={getBadgeClasses('success')}>
  Status Ativo
</span>
```

## 🎨 UI Kit - Documentação Interativa

Acesse `/admin/ui-kit` para ver todos os componentes em ação:

- **📘 /admin/ui-kit/buttons** - Todos os botões com exemplos
- **🏷️ /admin/ui-kit/badges** - Sistema de badges
- **🃏 /admin/ui-kit/cards** - Cartões (em desenvolvimento)
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

## 🔧 Personalização

### **Adicionando Nova Cor**

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

## 📱 Responsividade

Todos os componentes são **totalmente responsivos** e seguem os breakpoints do Tailwind:

- **sm:** >= 640px
- **md:** >= 768px  
- **lg:** >= 1024px
- **xl:** >= 1280px

## 🌙 Modo Escuro

O sistema de temas **automaticamente** adapta todos os componentes para modo escuro. Não é necessário configuração adicional.

## 🚀 Quick Start para Agentes

```typescript
// 1. Importar componente
import { Button } from '@/design-system/components/Button';
import { Plus } from 'lucide-react';

// 2. Usar diretamente
<Button variant="primary" icon={<Plus />}>
  Criar Novo
</Button>

// 3. Para call-to-action use gradient
<Button variant="success-gradient" fullWidth>
  Começar Agora
</Button>

// 4. Para ações perigosas
<Button variant="danger" icon={<Trash2 />}>
  Deletar
</Button>
```

---

## � Suporte

Para dúvidas ou sugestões sobre o Design System, consulte a documentação interativa em `/admin/ui-kit` ou verifique os exemplos de código nos componentes.

**Versão:** 1.0.0  
**Última atualização:** Outubro 2025
