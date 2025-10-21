# Sistema de Botões - SmartGesTI

O sistema de botões do SmartGesTI fornece uma interface flexível para criar botões interativos com diferentes estilos, tamanhos e estados.

## Características

- **Variantes de cores**: Múltiplas opções de cores predefinidas
- **Botões gradientes**: Efeitos de gradiente vibrantes e interativos
- **Tamanhos**: Três tamanhos predefinidos (pequeno, médio, grande)
- **Estados**: Suporte para estado de carregamento e desativado
- **Efeitos de hover**: Transições suaves com escala e sombras
- **Ícones**: Suporte para ícones nas posições esquerda/direita
- **Acessibilidade**: Conformidade com WCAG para foco e interatividade

## Uso Básico

```tsx
import { Button } from '@/design-system';

// Botão básico
<Button>Clique Aqui</Button>

// Variantes
<Button variant="primary">Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="success">Sucesso</Button>
<Button variant="danger">Perigo</Button>

// Tamanhos
<Button size="sm">Pequeno</Button>
<Button size="md">Médio</Button>
<Button size="lg">Grande</Button>

// Estado de carregamento
<Button loading>Carregando</Button>

// Botão com largura total
<Button fullWidth>Largura Total</Button>

// Botões com gradiente
<Button variant="primary-gradient">Gradiente</Button>
<Button variant="success-gradient">Sucesso Gradiente</Button>
<Button variant="danger-gradient">Perigo Gradiente</Button>
```

## Efeitos Interativos

Os botões incluem efeitos avançados de interatividade:

1. **Efeito de Escala**: Ao passar o mouse, os botões aumentam ligeiramente (escala de 1.02)
2. **Sombras Coloridas**: Sombras com cores específicas para cada variante
3. **Transições Suaves**: Animações de 300ms para todas as alterações de estado
4. **Efeito de Foco**: Anéis de foco personalizados para maior acessibilidade
5. **Gradientes Interativos**: Gradientes que mudam sutilmente no hover

## Botões Gradiente

Botões com gradientes vibrantes que oferecem uma experiência visual rica:

```tsx
// Gradientes disponíveis
<Button variant="primary-gradient">Primário</Button>
<Button variant="success-gradient">Sucesso</Button>
<Button variant="warning-gradient">Aviso</Button>
<Button variant="danger-gradient">Perigo</Button>
<Button variant="info-gradient">Info</Button>
<Button variant="purple-gradient">Roxo</Button>
<Button variant="pink-gradient">Rosa</Button>
<Button variant="indigo-gradient">Índigo</Button>
<Button variant="orange-gradient">Laranja</Button>
<Button variant="teal-gradient">Verde-azulado</Button>
```

Os gradientes incluem transições multi-cores com efeitos de hover aprimorados:
- Transição suave entre cores
- Aumento de saturação no hover
- Sombras coloridas específicas para cada variante
- Efeito de escala sutil para feedback visual

## Botões com Ícones

```tsx
import { Button, IconButton } from '@/design-system';
import { ArrowRightIcon } from 'path-to-icons';

// Botão com ícone à direita
<Button variant="primary" icon={<ArrowRightIcon />} iconPosition="right">
  Próximo
</Button>

// Botão apenas com ícone
<IconButton 
  variant="primary" 
  icon={<ArrowRightIcon />} 
  tooltip="Próximo" 
/>
```

## Estados Especiais

```tsx
// Estado de carregamento
<Button loading>Carregando</Button>

// Estado desativado
<Button disabled>Desativado</Button>

// Estado desativado com carregamento
<Button disabled loading>Processando</Button>
```

## Integração com o Tema

Os botões são totalmente integrados com o sistema de tema e suportam automaticamente os modos claro e escuro através do hook `useButtonClasses`.

```tsx
import { useButtonClasses } from '@/design-system/hooks';

function MeuComponente() {
  // Hook fornece classes corretas para o tema atual
  const buttonClasses = useButtonClasses('primary', 'md');
  
  return (
    <button className={buttonClasses}>
      Meu Botão Personalizado
    </button>
  );
}
```

## Boas Práticas

1. Use cores semânticas (success, danger, warning) para ações específicas
2. Reserve botões gradiente para ações principais ou CTA (Call to Action)
3. Mantenha consistência nos tamanhos em toda a interface
4. Use estados de loading para feedback de ações assíncronas
5. Inclua texto descritivo para acessibilidade
