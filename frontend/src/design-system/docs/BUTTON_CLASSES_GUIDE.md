# 🎨 Guia de Classes de Cores para Botões - SmartGesTI

## 📋 Visão Geral

Este guia mostra exatamente quais classes usar para cada tipo de ação em cada tema (claro/escuro), sem necessidade de componentes adicionais.

---

## 🎯 Classes por Ação Semântica

### **🟢 AÇÕES DE CRIAÇÃO/CONFIRMAÇÃO**
**Ações:** Salvar, Criar, Confirmar, Adicionar, Registrar, Enviar, Aplicar, Ativar

#### **Modo Claro**
```typescript
variant="success"
// Resultado: bg-green-500 hover:bg-green-600 text-white
```

#### **Modo Escuro**
```typescript
variant="success-gradient"
// Resultado: bg-gradient-to-r from-green-500 via-emerald-600 to-teal-700 hover:from-green-600 hover:via-emerald-700 hover:to-teal-800 text-white shadow-md hover:shadow-lg hover:shadow-green-500/30
```

**Exemplo de uso:**
```tsx
<Button variant={isDark ? "success-gradient" : "success"} icon={<Save />}>
  Salvar
</Button>
```

---

### **🔵 AÇÕES DE VISUALIZAÇÃO/INFORMAÇÃO**
**Ações:** Ver, Visualizar, Ver Mais, Ver Detalhes, Ver Clientes, Ver Relatórios, Informações, Detalhes

#### **Modo Claro**
```typescript
variant="primary"
// Resultado: bg-blue-500 hover:bg-blue-600 text-white
```

#### **Modo Escuro**
```typescript
variant="primary-gradient"
// Resultado: bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-800 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/30
```

**Exemplo de uso:**
```tsx
<Button variant={isDark ? "primary-gradient" : "primary"} icon={<Eye />}>
  Ver Detalhes
</Button>
```

---

### **🟡 AÇÕES DE EDIÇÃO/MODIFICAÇÃO**
**Ações:** Editar, Modificar, Atualizar, Alterar, Configurar, Personalizar, Ajustar

#### **Modo Claro**
```typescript
variant="warning"
// Resultado: bg-yellow-500 hover:bg-yellow-600 text-white
```

#### **Modo Escuro**
```typescript
variant="warning-gradient"
// Resultado: bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-600 hover:via-orange-700 hover:to-red-700 text-white shadow-md hover:shadow-lg hover:shadow-amber-500/30
```

**Exemplo de uso:**
```tsx
<Button variant={isDark ? "warning-gradient" : "warning"} icon={<Edit />}>
  Editar
</Button>
```

---

### **🔴 AÇÕES DE EXCLUSÃO/CANCELAMENTO**
**Ações:** Deletar, Excluir, Remover, Cancelar, Fechar, Descartar, Rejeitar

#### **Modo Claro**
```typescript
variant="danger"
// Resultado: bg-red-500 hover:bg-red-600 text-white
```

#### **Modo Escuro**
```typescript
variant="danger-gradient"
// Resultado: bg-gradient-to-r from-red-500 via-rose-600 to-pink-700 hover:from-red-600 hover:via-rose-700 hover:to-pink-800 text-white shadow-md hover:shadow-lg hover:shadow-red-500/30
```

**Exemplo de uso:**
```tsx
<Button variant={isDark ? "danger-gradient" : "danger"} icon={<Trash2 />}>
  Deletar
</Button>
```

---

### **⚫ AÇÕES SECUNDÁRIAS/NEUTRAS**
**Ações:** Voltar, Retornar, Anterior, Próximo, Resetar, Limpar, Copiar, Exportar

#### **Modo Claro**
```typescript
variant="secondary"
// Resultado: bg-gray-500 hover:bg-gray-600 text-white
```

#### **Modo Escuro**
```typescript
variant="secondary-gradient"
// Resultado: bg-gradient-to-r from-slate-500 via-gray-600 to-zinc-700 hover:from-slate-600 hover:via-gray-700 hover:to-zinc-800 text-white shadow-md hover:shadow-lg hover:shadow-slate-500/20
```

**Exemplo de uso:**
```tsx
<Button variant={isDark ? "secondary-gradient" : "secondary"} icon={<ArrowLeft />}>
  Voltar
</Button>
```

---

### **🟣 AÇÕES PREMIUM/ESPECIAIS**
**Ações:** Premium, Upgrade, Pro, Especial, Destacado

#### **Modo Claro**
```typescript
variant="purple"
// Resultado: bg-purple-500 hover:bg-purple-600 text-white
```

#### **Modo Escuro**
```typescript
variant="purple-gradient"
// Resultado: bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-700 hover:from-purple-600 hover:via-violet-700 hover:to-indigo-800 text-white shadow-md hover:shadow-lg hover:shadow-purple-500/30
```

**Exemplo de uso:**
```tsx
<Button variant={isDark ? "purple-gradient" : "purple"} icon={<Star />}>
  Upgrade Premium
</Button>
```

---

### **🔵 AÇÕES DE INFORMAÇÃO/HELP**
**Ações:** Ajuda, Suporte, FAQ, Sobre, Contato

#### **Modo Claro**
```typescript
variant="info"
// Resultado: bg-blue-400 hover:bg-blue-500 text-white
```

#### **Modo Escuro**
```typescript
variant="info-gradient"
// Resultado: bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-700 hover:from-cyan-600 hover:via-sky-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg hover:shadow-cyan-500/30
```

**Exemplo de uso:**
```tsx
<Button variant={isDark ? "info-gradient" : "info"} icon={<HelpCircle />}>
  Ajuda
</Button>
```

---

## 🔧 Implementação Prática

### **Hook para Detectar Tema**
```typescript
import { useThemeContext } from '@/design-system';

const { theme } = useThemeContext();
const isDark = theme === 'dark';
```

### **Função Utilitária**
```typescript
const getButtonVariant = (action: string, isDark: boolean) => {
  const variants = {
    create: isDark ? 'success-gradient' : 'success',
    view: isDark ? 'primary-gradient' : 'primary',
    edit: isDark ? 'warning-gradient' : 'warning',
    delete: isDark ? 'danger-gradient' : 'danger',
    secondary: isDark ? 'secondary-gradient' : 'secondary',
    premium: isDark ? 'purple-gradient' : 'purple',
    info: isDark ? 'info-gradient' : 'info'
  };
  
  return variants[action] || 'primary';
};
```

### **Uso Direto**
```typescript
// Para ações de criação
<Button variant={isDark ? "success-gradient" : "success"}>
  Salvar
</Button>

// Para ações de visualização
<Button variant={isDark ? "primary-gradient" : "primary"}>
  Ver Detalhes
</Button>

// Para ações de edição
<Button variant={isDark ? "warning-gradient" : "warning"}>
  Editar
</Button>

// Para ações de exclusão
<Button variant={isDark ? "danger-gradient" : "danger"}>
  Deletar
</Button>
```

---

## 📱 Exemplos por Contexto

### **📊 Dashboard**
```typescript
// Ver relatórios
<Button variant={isDark ? "primary-gradient" : "primary"} icon={<TrendingUp />}>
  Ver Relatório
</Button>

// Criar novo
<Button variant={isDark ? "success-gradient" : "success"} icon={<Plus />}>
  Criar Novo
</Button>

// Configurar
<Button variant={isDark ? "warning-gradient" : "warning"} icon={<Settings />}>
  Configurar
</Button>
```

### **👥 Gerenciamento de Clientes**
```typescript
// Adicionar cliente
<Button variant={isDark ? "success-gradient" : "success"} icon={<Plus />}>
  Adicionar Cliente
</Button>

// Ver detalhes
<Button variant={isDark ? "primary-gradient" : "primary"} icon={<Eye />}>
  Ver Detalhes
</Button>

// Editar cliente
<Button variant={isDark ? "warning-gradient" : "warning"} icon={<Edit />}>
  Editar
</Button>

// Excluir cliente
<Button variant={isDark ? "danger-gradient" : "danger"} icon={<Trash2 />}>
  Excluir
</Button>

// Voltar
<Button variant={isDark ? "secondary-gradient" : "secondary"} icon={<ArrowLeft />}>
  Voltar
</Button>
```

### **📝 Formulários**
```typescript
// Salvar
<Button variant={isDark ? "success-gradient" : "success"} icon={<Save />}>
  Salvar
</Button>

// Cancelar
<Button variant={isDark ? "danger-gradient" : "danger"} icon={<X />}>
  Cancelar
</Button>

// Limpar
<Button variant={isDark ? "secondary-gradient" : "secondary"} icon={<RefreshCw />}>
  Limpar
</Button>
```

---

## 🎯 Resumo das Classes

| Ação | Modo Claro | Modo Escuro |
|------|------------|-------------|
| **Criar/Salvar** | `success` | `success-gradient` |
| **Ver/Visualizar** | `primary` | `primary-gradient` |
| **Editar/Modificar** | `warning` | `warning-gradient` |
| **Deletar/Cancelar** | `danger` | `danger-gradient` |
| **Voltar/Secundário** | `secondary` | `secondary-gradient` |
| **Premium/Especial** | `purple` | `purple-gradient` |
| **Ajuda/Info** | `info` | `info-gradient` |

---

## ✅ Checklist de Implementação

- [ ] Identificar todas as ações de botões nas páginas
- [ ] Mapear cada ação para sua cor semântica
- [ ] Aplicar classes corretas baseadas no tema
- [ ] Testar em modo claro e escuro
- [ ] Verificar contraste e acessibilidade
- [ ] Documentar padrões para a equipe

---

*Este guia deve ser usado como referência durante o desenvolvimento para manter consistência visual em toda a aplicação.*
