# Sistema de Tema Centralizado - SmartGesTI

Este diretório contém a implementação centralizada do sistema de tema do SmartGesTI, seguindo as melhores práticas de organização e separação de responsabilidades.

## Estrutura do Sistema

```
frontend/src/design-system/theme/
├── classes.ts        # Utilitários para manipulação de classes CSS baseadas no tema
├── components.ts     # Estilos base para componentes
├── context.tsx       # Contexto React para gerenciamento de tema
├── gradients.ts      # Definições de gradientes para botões e UI
├── hooks.ts          # Hooks React para acessar estilos temáticos em componentes
├── index.ts          # Ponto de entrada principal, exporta todos os recursos
├── provider.tsx      # Provedor de tema para envolver a aplicação
├── tokens.ts         # Design tokens (cores, espaçamento, tipografia)
├── types.ts          # Tipos e interfaces relacionados ao tema
└── variables.css     # Variáveis CSS para temas claro e escuro
```

## Como Usar

### Importando Componentes

Recomendamos sempre importar do design system centralizado:

```tsx
// ✅ Forma recomendada - importação centralizada
import {
  useThemeClasses,
  useButtonClasses,
  ThemeProvider,
  ThemeContext
} from '@/design-system';
```

### Usando o Contexto de Tema

```tsx
function MeuComponente() {
  const { theme, setTheme, isDark } = useThemeContext();
  
  return (
    <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      Alternar tema
    </button>
  );
}
```

### Aplicando Classes Temáticas

```tsx
function ComponenteComTema() {
  const { get, cn, theme } = useThemeClasses();
  
  return (
    <div className={cn(
      get('card'),
      get('text.primary'),
      'p-4 rounded-lg'
    )}>
      Conteúdo com suporte a tema claro/escuro
    </div>
  );
}
```

### Classes de Componentes

```tsx
function BotaoPersonalizado() {
  const classes = useButtonClasses('primary', 'md', 'my-2');
  
  return (
    <button className={classes}>
      Botão com Tema
    </button>
  );
}
```

## Vantagens da Centralização

1. **Consistência**: Todas as definições de tema em um único local
2. **Manutenção**: Alterações de tema realizadas em apenas um lugar
3. **Compartilhamento**: Múltiplos projetos podem utilizar o mesmo sistema
4. **Produtividade**: Componentes já preparados para temas claro/escuro

## Recursos Avançados

### Gradientes Interativos

O sistema inclui gradientes interativos com efeitos de hover avançados:

```tsx
// Botões com gradientes interativos
<Button variant="primary-gradient">Ação Principal</Button>
<Button variant="success-gradient">Confirmar</Button>
<Button variant="danger-gradient">Excluir</Button>
```

### Sistema de Foco Dinâmico

O hook `getFocusRing` fornece anéis de foco específicos para cada variante de cor:

```tsx
// No tema/hooks.ts
const getFocusRing = (variant: string): string => {
  const focusRingColors = {
    'primary': 'focus:ring-blue-500',
    'success': 'focus:ring-green-500',
    // ... outros mapeamentos
  };
  
  return focusRingColors[variant] || 'focus:ring-blue-500';
};
```

### Efeitos Interativos

Os componentes incluem efeitos interativos como:
- Escala sutil no hover (scale: 1.02)
- Sombras coloridas específicas para cada variante
- Transições suaves (300ms)
- Gradientes vibrantes com múltiplas cores

## Extensão

Para adicionar novos componentes temáticos:

1. Adicione classes temáticas em `components.ts` ou `gradients.ts`
2. Adicione hooks específicos em `hooks.ts` 
3. Reexporte-os no arquivo principal `index.ts`