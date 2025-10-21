# 📚 Design System - Índice de Documentação

## 📋 Documentação Disponível

### 🎨 **README.md**
**Documentação principal do Design System**
- Visão geral completa do sistema
- Estrutura e arquitetura
- Sistema de temas e hooks
- Todos os componentes disponíveis
- Casos de uso e personalização
- Guias de responsividade e modo escuro

### 🤖 **AGENTS-GUIDE.md**
**Guia específico para Agentes de IA**
- Quick start direto e objetivo
- Todas as 22 variantes de botões
- Regras e melhores práticas
- Exemplos por contexto (CRUD, formulários, e-commerce)
- Debugging e problemas comuns
- Checklist de implementação

## 🚀 Para Começar Rapidamente

### **Se você é um desenvolvedor:**
📖 Leia `README.md` - Documentação completa com contexto técnico

### **Se você é um agente de IA:**
🤖 Leia `AGENTS-GUIDE.md` - Documentação otimizada e direta

## 🎯 Acesso Rápido

### **UI Kit Interativo:**
Visite `/admin/ui-kit` na aplicação para ver todos os componentes funcionando:
- `/admin/ui-kit/buttons` - Todos os botões com exemplos
- `/admin/ui-kit/badges` - Sistema de badges

### **Arquivos Principais:**
- `components/Button.tsx` - Componente principal de botões
- `hooks.ts` - Hooks personalizados de styling
- `theme-classes.ts` - Classes de tema e cores
- `tokens.ts` - Tokens de design

## 📱 Exemplos Rápidos

```typescript
// Importação básica
import { Button } from '@/design-system/components/Button';
import { useThemeClasses } from '@/design-system/hooks';
import { Plus, Save } from 'lucide-react';

// Uso simples
<Button variant="primary" icon={<Plus />}>Criar</Button>
<Button variant="success-gradient" fullWidth>Call-to-Action</Button>

// Com tema
const { get, cn } = useThemeClasses();
<div className={cn("p-4", get("bg.primary"))}>Conteúdo</div>
```

---

**Escolha a documentação adequada para sua necessidade!** 🎉