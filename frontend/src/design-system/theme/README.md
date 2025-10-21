# Sistema de Tema Centralizado - SmartGesTI

Este diretório contém a implementação centralizada do sistema de tema do SmartGesTI, seguindo as melhores práticas de organização e separação de responsabilidades.

## Estrutura do Sistema

- `index.ts`: Ponto de entrada que reexporta todos os componentes do tema
- `types.ts`: Tipos e interfaces relacionados ao tema
- `tokens.ts`: Tokens de design (cores, espaçamentos, tipografia)
- `variables.ts`: Variáveis CSS para temas claro e escuro
- `classes.ts`: Classes CSS para componentes temáticos
- `components.ts`: Estilos base para componentes do design system
- `context.tsx`: Contexto React para gerenciamento de tema
- `provider.tsx`: Provedor de tema para aplicação React
- `hooks.ts`: Hooks React para acesso ao tema e estilos

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

## Extensão

Para adicionar novos componentes temáticos:

1. Adicione classes temáticas em `theme-classes.ts`
2. Adicione hooks específicos em `hooks.ts` 
3. Reexporte-os no arquivo principal `index.ts`