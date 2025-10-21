# Divider

O componente `Divider` é usado para criar separações visuais entre seções de conteúdo, com suporte completo para temas claro e escuro.

## Características

- **Suporte a temas**: Adaptação automática para modo claro/escuro
- **Variantes**: Sólido, pontilhado e tracejado
- **Orientações**: Horizontal e vertical
- **Espaçamento configurável**: Controle do espaço ao redor do divisor

## Uso Básico

```tsx
import { Divider } from '@/design-system';

// Divisor padrão (horizontal, sólido)
<Divider />

// Divisor com variante pontilhada
<Divider variant="dotted" />

// Divisor com orientação vertical
<Divider orientation="vertical" />
```

## API

### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientação do divisor |
| `variant` | `'solid' \| 'dotted' \| 'dashed'` | `'solid'` | Estilo visual do divisor |
| `spacing` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Espaçamento ao redor do divisor |
| `className` | `string` | - | Classes CSS adicionais |

## Exemplos

### Divisores com diferentes variantes

```tsx
<Divider />
<Divider variant="dotted" />
<Divider variant="dashed" />
```

### Divisor vertical

```tsx
<div className="flex h-40">
  <div>Conteúdo à esquerda</div>
  <Divider orientation="vertical" />
  <div>Conteúdo à direita</div>
</div>
```

### Divisor com espaçamento personalizado

```tsx
<Divider spacing="lg" />
```

## Acessibilidade

O componente Divider implementa a semântica apropriada para garantir uma boa experiência para usuários de tecnologias assistivas:

- Quando usado como separador de conteúdo, representa corretamente uma divisão visual
- Contraste adequado em ambos os modos claro e escuro
- Não interrompe o fluxo de foco para elementos interativos

## Integração com o Design System

O componente usa as variáveis CSS do tema definidas no design system:

- `--divider-color`: Cor principal do divisor
- `--dotted-color`: Cor para divisores pontilhados
- `--dashed-color`: Cor para divisores tracejados