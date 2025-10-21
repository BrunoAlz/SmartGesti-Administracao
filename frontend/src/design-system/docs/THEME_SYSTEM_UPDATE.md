# Guia de Atualização do Sistema de Temas - SmartGesTI

## 🌗 Introdução ao Novo Sistema de Temas

Este documento descreve as mudanças feitas ao sistema de temas do SmartGesTI para garantir um comportamento consistente em ambos os modos claro e escuro.

O novo sistema é baseado em **variáveis CSS**, o que proporciona um controle mais preciso sobre as cores e estilos, independentemente do tema selecionado.

## 🔄 Principais Mudanças

### 1. Variáveis CSS em vez de Classes Condicionais

**Antes:**
```tsx
<div className={theme === "dark" ? "bg-slate-800 text-white" : "bg-white text-slate-800"} />
```

**Agora:**
```tsx
<div className="bg-[var(--bg-card)] text-[var(--text-primary)]" />
```

### 2. Design System Unificado

Todas as cores e estilos específicos de tema são agora controlados por um único sistema em `/src/design-system/theme.ts` e utilizados via CSS variables.

### 3. Hooks Simplificados

Os hooks foram atualizados para utilizar as variáveis CSS e facilitarem a criação de componentes consistentes.

## 🛠️ Como Usar o Novo Sistema

### Para Componentes Existentes

Migre gradualmente os componentes para usar as novas classes baseadas em variáveis CSS:

1. Remova referências diretas a cores específicas por tema
2. Substitua por classes que usam variáveis CSS: `bg-[var(--bg-card)]`
3. Utilize os hooks atualizados do design system

### Para Novos Componentes

```tsx
function MyComponent() {
  const { styles, cn } = useThemeClasses();
  
  return (
    <div className={cn(
      styles.card.base,     // Usa variáveis CSS para tema
      "p-4 rounded-lg"      // Estilos adicionais
    )}>
      <h2 className={styles.text.primary}>Título</h2>
      <p className={styles.text.secondary}>Conteúdo</p>
    </div>
  );
}
```

## 🎨 Variáveis CSS Disponíveis

### Texto
- `--text-primary`: Cor principal de texto
- `--text-secondary`: Cor secundária de texto
- `--text-muted`: Cor de texto reduzida

### Fundos
- `--bg-page`: Cor de fundo da página
- `--bg-card`: Cor de fundo dos cards
- `--bg-card-offset`: Cor de fundo alternativa para cards

### Bordas
- `--border-subtle`: Cor de borda sutil
- `--border-default`: Cor padrão de borda
- `--border-strong`: Cor de borda forte

### Cores Específicas por Variante

Para cada variante (primary, secondary, success, etc):

- `--{variant}-bg`: Cor de fundo
- `--{variant}-bg-hover`: Cor de fundo hover
- `--{variant}-bg-subtle`: Cor de fundo sutil
- `--{variant}-border`: Cor de borda
- `--{variant}-text`: Cor de texto

## 📋 Estilos Pré-definidos

O sistema oferece estilos pré-definidos via `componentBaseStyles`:

```tsx
const { styles } = useThemeClasses();

// Estilos para card
styles.card.base
styles.card.default
styles.card.elevated
styles.card.outlined
styles.card.interactive

// Estilos para texto
styles.text.primary
styles.text.secondary
styles.text.muted

// Estilos para botões
styles.button.base
styles.button.primary
styles.button.secondary
// etc...
```

## ✅ Testes de Tema

Ao criar ou modificar um componente, sempre teste nos dois modos:

1. Verifique se o componente funciona corretamente no tema claro
2. Alterne para o tema escuro e verifique novamente
3. Confirme se as cores, sombras e contrastes são apropriados para cada tema
4. Certifique-se de que não há "flickers" (piscadas) ao alternar entre temas

## 🚫 Práticas a Evitar

1. **Não use cores diretas do Tailwind** em componentes temáticos
   ```tsx
   // ❌ ERRADO
   <div className="bg-white dark:bg-slate-800">
   
   // ✅ CORRETO
   <div className="bg-[var(--bg-card)]">
   ```

2. **Não crie lógica de tema nos componentes**
   ```tsx
   // ❌ ERRADO
   <div className={isDark ? "bg-slate-800" : "bg-white"}>
   
   // ✅ CORRETO
   <div className={styles.card.base}>
   ```

3. **Não use cores hardcoded** nos estilos
   ```tsx
   // ❌ ERRADO
   style={{ color: isDark ? '#ffffff' : '#0f172a' }}
   
   // ✅ CORRETO
   className="text-[var(--text-primary)]"
   ```

## 🔍 Depuração de Temas

Se um componente não está se comportando corretamente em um dos temas:

1. Verifique se ele está usando classes baseadas em variáveis CSS
2. Inspecione o elemento no DevTools para ver quais variáveis CSS estão sendo aplicadas
3. Confirme que o componente está recebendo os estilos corretos do design system
4. Verifique se há sobrescritas de estilo que podem estar conflitando

## 📈 Benefícios do Novo Sistema

- **Consistência garantida** entre modos claro e escuro
- **Manutenção simplificada** - alterações feitas em um único lugar
- **Performance melhorada** - menos cálculos condicionais
- **Melhor DX** - APIs mais limpas e intuitivas
- **Escalabilidade** - fácil adicionar novos temas ou variantes