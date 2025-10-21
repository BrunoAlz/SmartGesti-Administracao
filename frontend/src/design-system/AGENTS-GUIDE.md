# 🤖 Guia para Agentes - Design System SmartGesti

## 🎯 Documentação Direta para Agentes de IA

Este documento é focado para **agentes de IA** que precisam entender rapidamente como usar o Design System do SmartGesti.

---

## 🚀 QUICK START - O QUE VOCÊ PRECISA SABER

### **1. Importações Essenciais**
```typescript
// Componente principal
import { Button } from '@/design-system/components/Button';

// Hooks para styling
import { useThemeClasses, useButtonClasses, useBadgeClasses } from '@/design-system/hooks';

// Ícones (sempre use Lucide)
import { Plus, Save, Trash2, Edit, Download, Upload } from 'lucide-react';
```

### **2. Sistema de Botões - TODAS AS VARIANTES**

#### **22 Variantes Disponíveis:**

**NORMAIS (12 cores):**
```typescript
<Button variant="primary">Principal</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="success">Sucesso</Button>
<Button variant="danger">Perigo</Button>
<Button variant="warning">Aviso</Button>
<Button variant="info">Informação</Button>
<Button variant="purple">Roxo</Button>
<Button variant="orange">Laranja</Button>
<Button variant="pink">Rosa</Button>
<Button variant="indigo">Índigo</Button>
<Button variant="cyan">Ciano</Button>
<Button variant="lime">Lima</Button>
```

**GRADIENTES (10 cores):**
```typescript
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

### **3. Propriedades Completas do Botão**
```typescript
<Button
  variant="primary"              // Obrigatório: cor do botão
  size="md"                     // Opcional: 'sm' | 'md' | 'lg'
  fullWidth={false}             // Opcional: largura total
  disabled={false}              // Opcional: desabilitado
  loading={false}               // Opcional: estado de loading
  icon={<Plus />}              // Opcional: ícone Lucide
  iconPosition="left"          // Opcional: 'left' | 'right'
  onClick={() => {}}           // Opcional: função de clique
>
  Texto do Botão
</Button>
```

---

## 📋 REGRAS PARA AGENTES

### **✅ SEMPRE FAÇA:**
1. **Use Lucide Icons** - Nunca use outros pacotes de ícones
2. **Cores Contextuais** - `success` para criar, `danger` para deletar, `warning` para avisos
3. **Gradientes para CTA** - Use `-gradient` para call-to-actions importantes
4. **Hook useThemeClasses** - Para classes de tema: `const { get, cn } = useThemeClasses()`
5. **Tamanhos Apropriados** - `sm` para ações secundárias, `lg` para principais

### **❌ NUNCA FAÇA:**
1. **Não use cores personalizadas** - Use apenas as variantes definidas
2. **Não misture ícones** - Só Lucide React
3. **Não ignore dark mode** - O sistema já cuida disso automaticamente
4. **Não use classes Tailwind diretas** - Use o sistema de hooks

---

## 🎨 EXEMPLOS PRÁTICOS POR CONTEXTO

### **Formulários:**
```typescript
// Salvar formulário
<Button variant="primary" icon={<Save />}>Salvar</Button>

// Cancelar
<Button variant="secondary">Cancelar</Button>

// Deletar
<Button variant="danger" icon={<Trash2 />} size="sm">Deletar</Button>
```

### **Ações de CRUD:**
```typescript
// Criar
<Button variant="success" icon={<Plus />}>Criar Novo</Button>

// Editar
<Button variant="warning" icon={<Edit />}>Editar</Button>

// Visualizar
<Button variant="info" icon={<Eye />}>Visualizar</Button>

// Deletar
<Button variant="danger" icon={<Trash2 />}>Deletar</Button>
```

### **Call-to-Actions (Use Gradientes):**
```typescript
// Assinatura/Premium
<Button variant="purple-gradient" fullWidth>Assinar Premium</Button>

// Começar/Iniciar
<Button variant="success-gradient" icon={<ArrowRight />}>Começar Agora</Button>

// Download/Upgrade
<Button variant="primary-gradient" icon={<Download />}>Download Grátis</Button>
```

### **Estados Especiais:**
```typescript
// Loading
<Button variant="primary" loading>Salvando...</Button>

// Desabilitado
<Button variant="secondary" disabled>Indisponível</Button>

// Largura total
<Button variant="success" fullWidth>Confirmar Pedido</Button>
```

---

## 🏷️ SISTEMA DE BADGES

### **5 Variantes de Badge:**
```typescript
<Badge variant="success">Ativo</Badge>
<Badge variant="danger">Inativo</Badge>
<Badge variant="warning">Pendente</Badge>
<Badge variant="info">Em Análise</Badge>
<Badge variant="purple">Premium</Badge>
```

### **Usando o Hook:**
```typescript
const getBadgeClasses = useBadgeClasses();

<span className={getBadgeClasses('success')}>Status Ativo</span>
```

---

## 🌙 SISTEMA DE TEMAS

### **Hook Principal:**
```typescript
const { get, cn } = useThemeClasses();

// Fundos
const bgPrimary = get("bg.primary");     // Fundo principal
const bgSecondary = get("bg.secondary"); // Fundo secundário

// Textos
const textPrimary = get("text.primary");     // Texto principal
const textSecondary = get("text.secondary"); // Texto secundário
const textMuted = get("text.muted");         // Texto esmaecido

// Bordas
const border = get("border");               // Borda padrão
const borderStrong = get("border.strong"); // Borda forte

// Combinando classes
const classes = cn("p-4 rounded-lg", get("bg.primary"), get("text.primary"));
```

---

## 📱 RESPONSIVIDADE AUTOMÁTICA

**Não se preocupe com responsividade** - todos os componentes já são responsivos automaticamente.

---

## 🎯 CASOS DE USO ESPECÍFICOS

### **Dashboard/Admin:**
```typescript
// Métricas principais
<Button variant="primary-gradient" icon={<TrendingUp />}>Ver Relatório</Button>

// Ações rápidas
<Button variant="success" icon={<Plus />} size="sm">Novo Item</Button>
<Button variant="warning" icon={<Edit />} size="sm">Editar</Button>
<Button variant="danger" icon={<Trash2 />} size="sm">Remover</Button>
```

### **E-commerce:**
```typescript
// Comprar
<Button variant="success-gradient" fullWidth icon={<ShoppingCart />}>
  Adicionar ao Carrinho
</Button>

// Checkout
<Button variant="primary-gradient" fullWidth>Finalizar Compra</Button>

// Favoritos
<Button variant="pink" icon={<Heart />}>Favoritar</Button>
```

### **Autenticação:**
```typescript
// Login
<Button variant="primary" fullWidth>Entrar</Button>

// Cadastro
<Button variant="success-gradient" fullWidth>Criar Conta</Button>

// Social Login
<Button variant="secondary" icon={<Github />} fullWidth>Continuar com GitHub</Button>
```

---

## 🔧 DEBUGGING E PROBLEMAS COMUNS

### **Ícones não aparecem:**
```typescript
// ❌ Errado
import { Plus } from 'react-icons';

// ✅ Correto
import { Plus } from 'lucide-react';
```

### **Cores não funcionam:**
```typescript
// ❌ Errado
<Button variant="custom-color">Texto</Button>

// ✅ Correto
<Button variant="primary">Texto</Button>
```

### **Classes não aplicam:**
```typescript
// ❌ Errado
<div className="bg-white dark:bg-gray-900">

// ✅ Correto
const { get } = useThemeClasses();
<div className={get("bg.primary")}>
```

---

## 📊 CHECKLIST PARA AGENTES

**Antes de implementar qualquer botão:**

- [ ] ✅ Importei `Button` do design-system?
- [ ] ✅ Escolhi a variante correta (normal vs gradient)?
- [ ] ✅ Usei ícone Lucide apropriado?
- [ ] ✅ Defini o tamanho adequado?
- [ ] ✅ Considerei usar `fullWidth` se necessário?
- [ ] ✅ Tratei estados (loading, disabled)?

**Para outros componentes:**

- [ ] ✅ Usei `useThemeClasses()` para styling?
- [ ] ✅ Apliquei classes de tema corretamente?
- [ ] ✅ Testei em modo claro e escuro?

---

## 🎉 RESULTADO ESPERADO

Seguindo este guia, você criará interfaces:
- ✨ **Visualmente consistentes**
- 🌙 **Compatíveis com dark mode**
- 📱 **Totalmente responsivas**
- 🎯 **Semanticamente corretas**
- ⚡ **Performance otimizada**

---

**🤖 Este documento é otimizado para agentes de IA. Use como referência rápida!**