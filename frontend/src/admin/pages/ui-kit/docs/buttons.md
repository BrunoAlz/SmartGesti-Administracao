# 🔘 Buttons - Documentação Completa

## 📋 Visão Geral

Sistema completo de botões com **22 variantes** divididas entre normais (sólidos) e gradientes (vibrantes). Totalmente compatível com modo claro/escuro e responsivo.

### ✨ Novos Recursos

- **Efeito de Escala no Hover**: Todos os botões aumentam ligeiramente (scale: 1.02) ao passar o mouse
- **Sombras Coloridas**: Sombras com cores específicas para cada variante
- **Transições Suaves**: Animações de 300ms para todas as alterações de estado
- **Gradientes Melhorados**: Gradientes mais vibrantes com múltiplas cores
- **Foco Aprimorado**: Anéis de foco personalizados para maior acessibilidade

---

## 🎨 Variantes Disponíveis

### **Botões Normais (12 cores)**
Para uso profissional, corporativo e interfaces limpas:

```typescript
<Button variant="primary">Principal</Button>          // Azul - Ação principal
<Button variant="secondary">Secundário</Button>       // Cinza - Ação secundária
<Button variant="success">Sucesso</Button>            // Verde - Confirmações, criar
<Button variant="danger">Perigo</Button>              // Vermelho - Deletar, cancelar
<Button variant="warning">Aviso</Button>              // Amarelo - Avisos, editar
<Button variant="info">Informação</Button>            // Azul claro - Informações
<Button variant="purple">Roxo</Button>                // Roxo - Premium, especial
<Button variant="orange">Laranja</Button>             // Laranja - Notificações
<Button variant="pink">Rosa</Button>                  // Rosa - Favoritos, curtir
<Button variant="indigo">Índigo</Button>              // Índigo - Categorias
<Button variant="cyan">Ciano</Button>                 // Ciano - Dados, analytics
<Button variant="lime">Lima</Button>                  // Lima - Novidades, fresh
```

### **Botões Gradientes (10 cores)**
Para call-to-actions, conversões e elementos de destaque:

> **Novidade**: Todos os botões gradientes agora possuem efeitos avançados de interatividade com transições suaves, sombras coloridas e efeito de escala ao passar o mouse.

```typescript
<Button variant="primary-gradient">Principal Gradiente</Button>      // CTA principal
<Button variant="success-gradient">Sucesso Gradiente</Button>        // Começar, confirmar
<Button variant="danger-gradient">Perigo Gradiente</Button>          // Ações críticas
<Button variant="warning-gradient">Aviso Gradiente</Button>          // Atenção especial
<Button variant="info-gradient">Info Gradiente</Button>              // Saiba mais
<Button variant="purple-gradient">Roxo Gradiente</Button>            // Premium, VIP
<Button variant="orange-gradient">Laranja Gradiente</Button>         // Urgência, promoções
<Button variant="pink-gradient">Rosa Gradiente</Button>              // Social, engajamento
<Button variant="indigo-gradient">Índigo Gradiente</Button>          // Tecnologia
<Button variant="cyan-gradient">Ciano Gradiente</Button>             // Inovação, futuro
```

---

## 🎭 Efeitos Interativos

Os botões do SmartGesTI agora possuem efeitos avançados de interatividade para melhorar a experiência do usuário:

### Efeitos de Hover
- **Escala**: Todos os botões aumentam ligeiramente (scale: 1.02) para feedback tátil
- **Sombras Coloridas**: Cada variante possui uma sombra com sua cor correspondente
- **Transições**: Todas as mudanças de estado possuem transições suaves de 300ms

### Efeitos de Foco
- **Anel de Foco**: Destaque visual ao navegar pelo teclado (acessibilidade)
- **Cor Específica**: Cada variante tem seu próprio anel de foco colorido

### Efeito nos Gradientes
Os gradientes possuem efeitos especiais que os tornam ainda mais interativos:
- **Múltiplas Cores**: Gradientes compostos por 3 cores diferentes
- **Mudança de Saturação**: As cores ficam mais saturadas no hover
- **Glow Sutil**: Efeito de brilho na sombra ao passar o mouse

```typescript
// Exemplo de botão com todos os efeitos
<Button variant="primary-gradient">
  Botão Interativo
</Button>
```

---

## 🔧 Propriedades Completas

```typescript
interface ButtonProps {
  // Obrigatório
  variant: ButtonVariant;                    // Cor/estilo do botão
  children: React.ReactNode;                 // Texto do botão

  // Opcionais  
  size?: 'sm' | 'md' | 'lg';                // Tamanho (padrão: 'md')
  fullWidth?: boolean;                       // Largura total (padrão: false)
  disabled?: boolean;                        // Desabilitado (padrão: false)
  loading?: boolean;                         // Estado de loading (padrão: false)
  icon?: React.ReactNode;                    // Ícone Lucide React
  iconPosition?: 'left' | 'right';          // Posição do ícone (padrão: 'left')
  onClick?: () => void;                      // Função de clique
  type?: 'button' | 'submit' | 'reset';     // Tipo HTML (padrão: 'button')
  className?: string;                        // Classes CSS adicionais
}
```

---

## 📱 Tamanhos Disponíveis

```typescript
// Pequeno - Para ações secundárias em tabelas, cards
<Button variant="danger" size="sm" icon={<Trash2 />}>Deletar</Button>

// Médio - Tamanho padrão para a maioria dos casos
<Button variant="primary" size="md" icon={<Save />}>Salvar</Button>

// Grande - Para CTAs principais, botões de destaque
<Button variant="success-gradient" size="lg" icon={<ArrowRight />}>Começar Agora</Button>
```

---

## 🎯 Casos de Uso Recomendados

### **Quando usar Botões Normais:**
- ✅ Formulários profissionais
- ✅ Ações CRUD básicas (editar, deletar, visualizar)
- ✅ Navegação entre páginas
- ✅ Interfaces corporativas
- ✅ Ações secundárias

### **Quando usar Botões Gradientes:**
- ✨ Call-to-actions principais
- ✨ Botões de conversão (assinar, comprar, registrar)
- ✨ Ações premium ou especiais
- ✨ Destacar elementos importantes
- ✨ Landing pages e marketing

---

## 💡 Exemplos Práticos por Contexto

### **🔧 CRUD Operations**
```typescript
// Criar
<Button variant="success" icon={<Plus />}>Criar Novo</Button>

// Visualizar
<Button variant="info" icon={<Eye />} size="sm">Ver</Button>

// Editar
<Button variant="warning" icon={<Edit />} size="sm">Editar</Button>

// Deletar
<Button variant="danger" icon={<Trash2 />} size="sm">Deletar</Button>
```

### **📝 Formulários**
```typescript
// Salvar
<Button variant="primary" icon={<Save />}>Salvar</Button>

// Cancelar
<Button variant="secondary">Cancelar</Button>

// Resetar
<Button variant="warning" icon={<RotateCcw />}>Resetar</Button>

// Enviar (CTA)
<Button variant="success-gradient" fullWidth>Enviar Formulário</Button>
```

### **🛒 E-commerce**
```typescript
// Adicionar ao carrinho
<Button variant="success" icon={<ShoppingCart />}>Adicionar</Button>

// Comprar agora (CTA principal)
<Button variant="success-gradient" fullWidth icon={<CreditCard />}>
  Comprar Agora
</Button>

// Favoritar
<Button variant="pink" icon={<Heart />} size="sm">Favoritar</Button>

// Comparar
<Button variant="cyan" icon={<GitCompare />}>Comparar</Button>
```

### **🔐 Autenticação**
```typescript
// Login
<Button variant="primary" fullWidth>Entrar</Button>

// Registrar (CTA)
<Button variant="success-gradient" fullWidth>Criar Conta Grátis</Button>

// Social Login
<Button variant="secondary" icon={<Github />} fullWidth>
  Continuar com GitHub
</Button>

// Esqueci a senha
<Button variant="info" icon={<Mail />}>Recuperar Senha</Button>
```

### **📊 Dashboard/Admin**
```typescript
// Relatórios
<Button variant="primary-gradient" icon={<TrendingUp />}>Ver Relatório</Button>

// Exportar
<Button variant="cyan" icon={<Download />}>Exportar CSV</Button>

// Configurações
<Button variant="secondary" icon={<Settings />}>Configurar</Button>

// Refresh
<Button variant="info" icon={<RefreshCw />} size="sm">Atualizar</Button>
```

---

## ⚡ Estados Especiais

### **Loading State**
```typescript
<Button variant="primary" loading>
  Salvando...
</Button>

// Com ícone customizado durante loading
<Button variant="success-gradient" loading icon={<Save />}>
  Processando Pagamento...
</Button>
```

### **Disabled State**
```typescript
<Button variant="secondary" disabled>
  Indisponível
</Button>

// Com tooltip explicativo (implementar Tooltip component)
<Button variant="primary" disabled>
  Salvar (Preencha todos os campos)
</Button>
```

### **Full Width**
```typescript
// Para formulários e CTAs
<Button variant="primary-gradient" fullWidth>
  Finalizar Cadastro
</Button>

// Para modais
<Button variant="danger" fullWidth>
  Confirmar Exclusão
</Button>
```

---

## 🎨 Combinações com Ícones

### **Ícones Lucide Recomendados por Contexto:**

```typescript
// Ações básicas
import { 
  Plus, Edit, Trash2, Eye, Save, X, Check,
  ArrowRight, ArrowLeft, Download, Upload,
  Settings, RefreshCw, Search, Filter 
} from 'lucide-react';

// Social e e-commerce
import { 
  Heart, Star, Share, ShoppingCart, CreditCard,
  Gift, Tag, Bookmark, ThumbsUp 
} from 'lucide-react';

// Navegação e interface
import { 
  Home, Menu, User, Bell, Mail, Phone,
  Calendar, Clock, MapPin, Globe 
} from 'lucide-react';

// Dados e analytics
import { 
  TrendingUp, BarChart, PieChart, Activity,
  Database, FileText, Folder, Archive 
} from 'lucide-react';
```

### **Posicionamento de Ícones:**
```typescript
// Ícone à esquerda (padrão)
<Button variant="primary" icon={<Save />}>Salvar</Button>

// Ícone à direita
<Button variant="success" icon={<ArrowRight />} iconPosition="right">
  Continuar
</Button>

// Apenas ícone (para botões pequenos)
<Button variant="danger" icon={<Trash2 />} size="sm" />
```

---

## 🎪 Combinações Recomendadas

### **Landing Page/Marketing:**
```typescript
// Hero CTA
<Button variant="primary-gradient" size="lg" fullWidth>
  Começar Gratuitamente
</Button>

// Secondary CTA
<Button variant="secondary" size="lg">
  Saiba Mais
</Button>

// Social proof
<Button variant="success-gradient" icon={<Users />}>
  Junte-se a 10.000+ usuários
</Button>
```

### **Dashboard Principal:**
```typescript
// Ação principal
<Button variant="primary" icon={<Plus />}>Novo Item</Button>

// Ações rápidas
<div className="flex gap-2">
  <Button variant="success" size="sm" icon={<Eye />}>Ver</Button>
  <Button variant="warning" size="sm" icon={<Edit />}>Editar</Button>
  <Button variant="danger" size="sm" icon={<Trash2 />}>Deletar</Button>
</div>

// Relatórios
<Button variant="cyan-gradient" icon={<TrendingUp />}>
  Analytics
</Button>
```

---

## 🔍 Debugging e Problemas Comuns

### **Ícones não aparecem:**
```typescript
// ❌ Errado
import { PlusIcon } from '@heroicons/react'; 

// ✅ Correto  
import { Plus } from 'lucide-react';
```

### **Cores não funcionam:**
```typescript
// ❌ Errado
<Button variant="custom-blue">Texto</Button>

// ✅ Correto
<Button variant="primary">Texto</Button>
```

### **Gradientes não aparecem:**
```typescript
// ❌ Errado (esqueceu o sufixo)
<Button variant="primary">CTA</Button>

// ✅ Correto
<Button variant="primary-gradient">CTA</Button>
```

### **Loading não funciona:**
```typescript
// ❌ Errado (loading como string)
<Button loading="true">Salvando</Button>

// ✅ Correto (loading como boolean)
<Button loading={true}>Salvando</Button>
```

---

## 📋 Checklist de Implementação

**Antes de usar qualquer botão:**

- [ ] ✅ Escolhi a variante correta para o contexto?
- [ ] ✅ Decidi entre normal vs gradient baseado na importância?
- [ ] ✅ Selecionei o ícone Lucide apropriado?
- [ ] ✅ Defini o tamanho adequado (sm/md/lg)?
- [ ] ✅ Considerei usar fullWidth quando apropriado?
- [ ] ✅ Tratei estados especiais (loading, disabled)?
- [ ] ✅ A ação está clara para o usuário?
- [ ] ✅ Testei em modo claro e escuro?

---

## 🚀 Quick Reference

```typescript
// Importação
import { Button } from '@/design-system/components/Button';
import { Plus, Save, Trash2 } from 'lucide-react';

// Uso básico
<Button variant="primary">Botão</Button>

// Com tudo
<Button 
  variant="success-gradient"
  size="lg"
  fullWidth
  icon={<Plus />}
  iconPosition="right"
  onClick={handleClick}
  loading={isLoading}
>
  Criar Novo Item
</Button>
```

---

**📄 Versão:** 1.0.0  
**📅 Última atualização:** Outubro 2025  
**🔗 Ver também:** [Design System README](../../../design-system/README.md) | [UI Kit](/admin/ui-kit/buttons)