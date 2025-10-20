# 🎨 UI Kit - SmartGesTI

Bem-vindo ao UI Kit do SmartGesTI! Este é seu guia completo para todos os componentes do design system.

## 📋 O que é o UI Kit?

O UI Kit é uma coleção interativa de todos os componentes, padrões e diretrizes do design system do SmartGesTI. Ele serve como:

- **Documentação viva** dos componentes
- **Guia de implementação** com exemplos de código
- **Referência visual** para designers e desenvolvedores
- **Playground** para testar componentes

## 🧩 Componentes Disponíveis

### ✅ Implementados
- **[Botões](/admin/ui-kit/buttons)** - Todos os tipos de botões e suas variações
- **[Badges](/admin/ui-kit/badges)** - Indicadores de status e informações

### 🚧 Em Desenvolvimento
- **Cards** - Containers para conteúdo
- **Inputs & Forms** - Campos de formulário e validação
- **Layout** - Componentes de estrutura
- **Notificações** - Alertas e toasts
- **Tabelas** - Exibição de dados tabulares
- **Animações** - Efeitos e transições
- **Design Tokens** - Valores de design padronizados
- **Cores & Temas** - Paleta de cores e temas

## 🛠️ Como Usar

### 1. Navegação
Use o menu lateral para navegar entre as diferentes categorias de componentes.

### 2. Visualização
Cada componente possui:
- **Exemplo visual** - Como o componente aparece
- **Código de exemplo** - Como implementar
- **Documentação** - Props e variações disponíveis

### 3. Implementação
```tsx
// Exemplo de uso de um botão
import { Button } from "../../design-system";

<Button variant="primary" size="md" icon={<Plus />}>
  Adicionar Item
</Button>
```

### 4. Temas
Todos os componentes se adaptam automaticamente aos temas claro e escuro do sistema.

## 🎯 Benefícios

### Para Desenvolvedores
- **Consistência** - Mesma aparência em todo o sistema
- **Produtividade** - Componentes prontos para uso
- **Manutenibilidade** - Atualizações centralizadas
- **Documentação** - Exemplos práticos sempre atualizados

### Para Designers
- **Referência visual** - Veja como os designs ficam implementados
- **Padrões** - Componentes padronizados e consistentes
- **Temas** - Teste em modo claro e escuro
- **Feedback** - Veja o resultado real dos designs

## 📦 Sistema de Design

O UI Kit é baseado no design system do SmartGesTI que inclui:

- **Design Tokens** - Cores, espaçamentos, tipografia
- **Componentes** - Elementos reutilizáveis
- **Padrões** - Diretrizes de uso
- **Temas** - Suporte a modo claro/escuro

## 🔄 Atualizações

O UI Kit é atualizado automaticamente sempre que novos componentes são adicionados ao design system. Isso garante que a documentação esteja sempre sincronizada com o código.

## 💡 Dicas

### Tema Automático
Todos os componentes se adaptam automaticamente ao tema ativo. Teste mudando entre os modos claro/escuro.

### Hook useBadgeClasses
```tsx
import { useBadgeClasses } from "../../design-system";

const successBadge = useBadgeClasses("success", "sm");
<span className={successBadge}>Sucesso</span>
```

### Hook useThemeClasses
```tsx
import { useThemeClasses } from "../../design-system";

const { get } = useThemeClasses();
<div className={get("background.primary")}>
  Conteúdo adaptado ao tema
</div>
```

## 🤝 Contribuindo

Para adicionar novos componentes ao UI Kit:

1. Implemente o componente no design system
2. Crie a página de documentação em `/ui-kit/`
3. Adicione a rota em `AdminApp.tsx`
4. Atualize o menu em `menuConfig.ts`

---

**Desenvolvido com ❤️ para o SmartGesTI**