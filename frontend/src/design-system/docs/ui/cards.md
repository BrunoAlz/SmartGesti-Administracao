# 🃏 Cards - Documentação Completa

## 📋 Visão Geral

Sistema completo de cards com múltiplas variantes e componentes especializados. Totalmente integrado com o sistema de temas, suportando modo claro/escuro automaticamente com bordas, backgrounds e cores consistentes.

---

## 🎨 Tipos de Cards Disponíveis

### **1. Card Principal (Base)**
Card básico e versátil para qualquer conteúdo:

```typescript
<Card>
  <CardContent>
    Conteúdo básico do card
  </CardContent>
</Card>
```

### **2. StatCard (Dashboard)**
Card especializado para métricas e estatísticas:

```typescript
<StatCard
  title="Usuários Ativos"
  value="1,234"
  icon={<Users />}
  change="+12% esta semana"
  changeType="positive"
/>
```

### **3. SectionCard**
Card com cabeçalho estruturado e ações:

```typescript
<SectionCard
  title="Configurações do Sistema"
  description="Gerencie as configurações gerais"
  actions={<Button variant="primary">Editar</Button>}
>
  Conteúdo da seção
</SectionCard>
```

### **4. FeatureCard**
Card para landing pages e apresentação de recursos:

```typescript
<FeatureCard
  icon={<Zap />}
  title="Performance Otimizada"
  description="Sistema ultra-rápido e eficiente"
  benefits={["99.9% uptime", "Resposta < 100ms"]}
/>
```

---

## 🔧 Propriedades do Card Principal

```typescript
interface CardProps {
  children: React.ReactNode;           // Conteúdo do card
  className?: string;                  // Classes CSS adicionais
  variant?: "default" | "elevated" | "outlined" | "filled";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;                     // Efeito hover
  border?: boolean;                    // Mostrar borda (padrão: true)
  elevation?: 0 | 1 | 2;              // Nível de sombra
  interactive?: boolean;               // Cursor pointer
  as?: React.ElementType;              // Elemento HTML customizado
  onClick?: () => void;                // Função de clique
}
```

## Variantes

### Default Card
- **Uso**: Card padrão do sistema
- **Visual**: Fundo branco/cinza escuro, borda sutil, sombra suave e discreta
- **Quando usar**: Conteúdo geral, informações básicas

### Elevated Card  
- **Uso**: Destacar conteúdo importante
- **Visual**: Sombra mais pronunciada mas equilibrada, aparência "flutuante" com profundidade
- **Quando usar**: CTAs, informações prioritárias, destaque visual

### Outlined Card
- **Uso**: Diferenciação sem peso visual
- **Visual**: Borda mais espessa, sombra muito sutil para não competir com a borda  
- **Quando usar**: Formulários, seções secundárias

### Filled Card
- **Uso**: Integração com fundos coloridos
- **Visual**: Fundo com opacidade, sombra sutil para profundidade
- **Quando usar**: Sobre backgrounds, overlays

## Cards Coloridos

### Cores Disponíveis
- **Azul**: Informações e status informativos
- **Verde**: Sucesso, confirmações, estados positivos  
- **Amarelo/Âmbar**: Avisos, atenção, estados de alerta
- **Roxo**: Premium, recursos especiais, destaque

### Implementação de Cores
```tsx
// Exemplo de card azul otimizado para light/dark mode com sombras visíveis
<Card className="border-blue-400 dark:border-blue-400/30 bg-blue-200/60 dark:bg-blue-900/20">
  {/* Conteúdo */}
</Card>
```

## Sistema de Sombras

### Sombras Otimizadas
- **Modo Claro**: Sombras com cor slate para contraste visível
- **Modo Escuro**: Sombras escuras para profundidade  
- **Sempre Visíveis**: Sombras aplicadas em repouso, não apenas no hover
- **Progressão**: Default → Elevated → Hover para hierarquia visual

```tsx
// Sombras com cores específicas para cada modo
shadow-lg shadow-slate-200/50 dark:shadow-gray-900/50
```
### **Níveis de Padding:**

```typescript
// Sem padding interno
<Card padding="none">Conteúdo</Card>

// Padding pequeno
<Card padding="sm">Conteúdo</Card>

// Padding médio (padrão)
<Card padding="md">Conteúdo</Card>

// Padding grande
<Card padding="lg">Conteúdo</Card>
```

---

## 📊 StatCard - Card de Estatísticas

### **Propriedades Completas:**

```typescript
interface StatCardProps {
  title: React.ReactNode;              // Título da métrica
  value: React.ReactNode;              // Valor principal
  icon?: React.ReactElement;           // Ícone Lucide
  iconColor?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'muted';
  iconClassName?: string;              // Classes customizadas para ícone
  change?: string;                     // Texto de mudança
  changeType?: "positive" | "negative" | "neutral";
  isLoading?: boolean;                 // Estado de carregamento
  align?: 'start' | 'center';         // Alinhamento do conteúdo
  size?: 'sm' | 'md';                 // Tamanho do card
  border?: boolean;                    // Mostrar borda
  className?: string;                  // Classes adicionais
  onClick?: () => void;                // Tornar clicável
}
```

### **Cores de Ícones Disponíveis:**

```typescript
// Cores semânticas para ícones
iconColor="primary"    // Azul - Métricas principais
iconColor="success"    // Verde - Crescimento, sucessos
iconColor="warning"    // Amarelo - Alertas, atenção
iconColor="danger"     // Vermelho - Problemas, decline
iconColor="info"       // Azul claro - Informações
iconColor="muted"      // Cinza - Dados neutros
```

### **Tipos de Mudança:**

```typescript
// Mudança positiva (verde)
<StatCard changeType="positive" change="+15% este mês" />

// Mudança negativa (vermelha)
<StatCard changeType="negative" change="-5% esta semana" />

// Mudança neutra (cinza)
<StatCard changeType="neutral" change="Sem alterações" />
```

---

## 💡 Exemplos Práticos por Contexto

### **🏢 Dashboard Administrativo**

```typescript
// Métricas principais
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  <StatCard
    title="Total de Usuários"
    value="1,234"
    icon={<Users />}
    iconColor="primary"
    change="+12% esta semana"
    changeType="positive"
  />
  
  <StatCard
    title="Receita Mensal"
    value="R$ 45,670"
    icon={<DollarSign />}
    iconColor="success"
    change="+8% vs. mês anterior"
    changeType="positive"
  />
  
  <StatCard
    title="Taxa de Conversão"
    value="3.2%"
    icon={<TrendingUp />}
    iconColor="warning"
    change="-0.5% esta semana"
    changeType="negative"
  />
  
  <StatCard
    title="Tickets Pendentes"
    value="23"
    icon={<AlertTriangle />}
    iconColor="danger"
    change="5 novos hoje"
    changeType="neutral"
  />
</div>
```

### **📈 Analytics e Relatórios**

```typescript
// Cards com dados específicos
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <StatCard
    title="Sessões Ativas"
    value="89"
    icon={<Activity />}
    iconColor="info"
    change="Tempo real"
    changeType="neutral"
    size="sm"
  />
  
  <StatCard
    title="Páginas Visualizadas"
    value="12,567"
    icon={<Eye />}
    iconColor="primary"
    change="+23% hoje"
    changeType="positive"
    onClick={() => console.log('Ver detalhes')}
  />
  
  <StatCard
    title="Tempo Médio"
    value="2m 34s"
    icon={<Clock />}
    iconColor="muted"
    change="+15s vs. ontem"
    changeType="negative"
  />
</div>
```

### **🛒 E-commerce**

```typescript
// Métricas de vendas
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <StatCard
    title="Vendas Hoje"
    value="R$ 8,450"
    icon={<ShoppingCart />}
    iconColor="success"
    change="+25% vs. ontem"
    changeType="positive"
    align="center"
  />
  
  <StatCard
    title="Pedidos Pendentes"
    value="12"
    icon={<Package />}
    iconColor="warning"
    change="3 atrasados"
    changeType="negative"
    align="center"
  />
  
  <StatCard
    title="Produtos em Estoque"
    value="1,456"
    icon={<Archive />}
    iconColor="info"
    change="98% disponível"
    changeType="positive"
    align="center"
  />
  
  <StatCard
    title="Avaliações"
    value="4.8/5"
    icon={<Star />}
    iconColor="primary"
    change="156 avaliações"
    changeType="neutral"
    align="center"
  />
</div>
```

### **⚙️ Sistema e Infraestrutura**

```typescript
// Status do sistema
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <StatCard
    title="CPU Usage"
    value="45%"
    icon={<Cpu />}
    iconColor="success"
    change="Normal"
    changeType="positive"
  />
  
  <StatCard
    title="Memória RAM"
    value="68%"
    icon={<HardDrive />}
    iconColor="warning"
    change="Monitorando"
    changeType="neutral"
  />
  
  <StatCard
    title="Uptime"
    value="99.9%"
    icon={<Server />}
    iconColor="success"
    change="30 dias"
    changeType="positive"
  />
  
  <StatCard
    title="Requests/min"
    value="1,234"
    icon={<Zap />}
    iconColor="info"
    change="+5% pico"
    changeType="positive"
  />
</div>
```

---

## 🏗️ Cards Estruturados

### **SectionCard - Cards com Cabeçalho**

```typescript
// Card básico com título e ações
## SectionCard

Card especializado para seções organizadas:
- **Header automático** com título e descrições com padding adequado
- **Área de ações** no cabeçalho com alinhamento correto
- **Estrutura consistente** para diferentes contextos
- **Padding padronizado** entre header e content

```tsx
<SectionCard
  title="Configurações de Segurança"
  description="Gerencie autenticação e permissões do sistema" 
  actions={
    <div className="flex gap-2">
      <Button variant="secondary" size="sm">Cancelar</Button>
      <Button variant="primary" size="sm">Salvar</Button>
    </div>
  }
>
  {/* Conteúdo da seção com padding correto */}
  <div className="space-y-4">
    {/* Elementos da seção */}
  </div>
</SectionCard>
```
```

### **Cards Compostos com Header/Content/Footer**

```typescript
// Card completo estruturado
<Card padding="none">
  <CardHeader
    title="Relatório Mensal"
    subtitle="Dados de performance de outubro"
    action={<Button variant="secondary" size="sm">Exportar</Button>}
  />
  
  <CardContent>
    <div className="space-y-4">
      <StatCard title="Total" value="R$ 45,670" iconColor="success" />
      <StatCard title="Meta" value="R$ 50,000" iconColor="warning" />
    </div>
  </CardContent>
  
  <CardFooter>
    <div className="flex justify-between">
      <span className="text-sm text-gray-500">
        Atualizado há 5 minutos
      </span>
      <Button variant="primary" size="sm">Ver Detalhes</Button>
    </div>
  </CardFooter>
</Card>
```

---

## 🎨 Temas e Bordas

### **Sistema de Bordas Automático:**

O sistema possui bordas que se adaptam automaticamente ao tema:

```typescript
// Modo Claro
border-slate-200    // Bordas sutis e profissionais

// Modo Escuro  
border-white/5      // Bordas quase invisíveis com transparência
```

### **Backgrounds Adaptativos:**

```typescript
// Modo Claro
bg-white            // Fundo branco limpo

// Modo Escuro
bg-white/5          // Fundo translúcido com backdrop-blur
backdrop-blur-lg    // Efeito de desfoque
```

### **Controle de Bordas:**

```typescript
// Com borda (padrão)
<Card border={true}>Conteúdo</Card>

// Sem borda
<Card border={false}>Conteúdo</Card>

// Borda customizada com variante
<Card variant="outlined">Conteúdo</Card>
```

---

## ⚡ Estados Especiais

### **Estado de Loading:**

```typescript
// StatCard com loading automático
<StatCard
  title="Carregando..."
  value="---"
  isLoading={true}
  icon={<Users />}
/>

// Loading personalizado
<Card>
  <CardContent>
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/2"></div>
      <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-1/4"></div>
    </div>
  </CardContent>
</Card>
```

### **Cards Interativos:**

```typescript
// Card clicável com hover
<Card 
  hover={true}
  interactive={true}
  onClick={() => console.log('Card clicado')}
>
  <CardContent>
    Clique em mim!
  </CardContent>
</Card>

// StatCard clicável
<StatCard
  title="Vendas"
  value="R$ 1,234"
  onClick={() => navigateToDetails()}
  icon={<TrendingUp />}
  iconColor="success"
/>
```

### **Cards com Elevação:**

```typescript
// Diferentes níveis de sombra
<Card elevation={0}>Sem sombra</Card>
<Card elevation={1}>Sombra leve</Card>
<Card elevation={2}>Sombra pronunciada</Card>

// Variante elevada
<Card variant="elevated">Sempre com sombra</Card>
```

---

## 🎯 Casos de Uso Recomendados

### **📊 Quando usar StatCard:**
- ✅ Métricas e KPIs
- ✅ Dashboards administrativos
- ✅ Relatórios de performance
- ✅ Monitoramento em tempo real
- ✅ Comparações numéricas

### **🏗️ Quando usar SectionCard:**
- ✅ Configurações e formulários
- ✅ Seções com ações específicas
- ✅ Conteúdo com título e descrição
- ✅ Painéis de administração
- ✅ Cards com botões de ação

### **🎪 Quando usar Card básico:**
- ✅ Conteúdo genérico
- ✅ Listas de itens
- ✅ Formulários simples
- ✅ Widgets personalizados
- ✅ Qualquer conteúdo estruturado

---

## 🔍 Debugging e Problemas Comuns

### **Bordas não aparecem:**
```typescript
// ❌ Errado (border explicitamente false)
<Card border={false}>Conteúdo</Card>

// ✅ Correto (usar padrão ou explícito)
<Card>Conteúdo</Card>
<Card border={true}>Conteúdo</Card>
```

### **Ícones sem cor:**
```typescript
// ❌ Errado (sem iconColor)
<StatCard icon={<Users />} title="Usuários" value="123" />

// ✅ Correto (com iconColor semântica)
<StatCard 
  icon={<Users />} 
  iconColor="primary"
  title="Usuários" 
  value="123" 
/>
```

### **Padding inconsistente:**
```typescript
// ❌ Errado (misturar padding do Card com CardContent)
<Card padding="lg">
  <CardContent>Conteúdo</CardContent>
</Card>

// ✅ Correto (usar padding="none" no Card e controlar no CardContent)
<Card padding="none">
  <CardContent className="p-6">Conteúdo</CardContent>
</Card>
```

---

## 📋 Checklist de Implementação

**Antes de usar qualquer card:**

- [ ] ✅ Escolhi o tipo correto (Card, StatCard, SectionCard)?
- [ ] ✅ Defini se precisa de borda?
- [ ] ✅ Selecionei o padding adequado?
- [ ] ✅ Para StatCard, defini iconColor apropriada?
- [ ] ✅ Considerei estados de loading quando necessário?
- [ ] ✅ Testei a responsividade em diferentes telas?
- [ ] ✅ Verifiquei a aparência em modo claro e escuro?
- [ ] ✅ A hierarquia visual está clara?

---

## 🚀 Quick Reference

```typescript
// Importações
import { 
  Card, CardHeader, CardContent, CardFooter,
  StatCard, SectionCard, FeatureCard 
} from '@/design-system/components/Card';
import { Users, TrendingUp, DollarSign } from 'lucide-react';

// Card básico
<Card>
  <CardContent>Conteúdo</CardContent>
</Card>

// StatCard completo
<StatCard
  title="Métricas"
  value="1,234"
  icon={<Users />}
  iconColor="primary"
  change="+12%"
  changeType="positive"
  onClick={handleClick}
/>

// SectionCard estruturado
<SectionCard
  title="Título"
  description="Descrição"
  actions={<Button>Ação</Button>}
>
  Conteúdo da seção
</SectionCard>
```

---

**📄 Versão:** 1.0.0  
**📅 Última atualização:** Outubro 2025  
**🔗 Ver também:** [Design System README](../../../design-system/README.md) | [UI Kit](/admin/ui-kit/cards)