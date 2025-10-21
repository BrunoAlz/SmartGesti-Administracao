# Divisores (Divider)

Os divisores são elementos de interface que criam separações visuais entre seções de conteúdo, ajudando na organização e legibilidade da interface. O componente `Divider` do SmartGesTI Design System oferece opções flexíveis para criar divisores horizontais e verticais com diferentes estilos visuais.

## Principais Características

- **Adaptação automática ao tema**: Todos os divisores ajustam automaticamente sua aparência com base no tema atual (claro/escuro)
- **Múltiplas variantes**: Suporte para divisores sólidos, pontilhados e tracejados
- **Orientação flexível**: Opções para divisores horizontais e verticais
- **Controle de espaçamento**: Configuração precisa do espaço ao redor do divisor

## Uso Básico

```tsx
import { Divider } from '@/design-system';

// Divisor horizontal padrão
<Divider />

// Divisor com estilo pontilhado
<Divider variant="dotted" />
```

## Variantes

O componente `Divider` suporta três variantes visuais:

1. **solid** (padrão): Uma linha sólida contínua
2. **dotted**: Uma linha pontilhada para separação mais leve
3. **dashed**: Uma linha tracejada para divisão visual com estilo diferenciado

```tsx
<Divider /> {/* solid (padrão) */}
<Divider variant="dotted" />
<Divider variant="dashed" />
```

## Orientação

Os divisores podem ser renderizados na horizontal (padrão) ou na vertical:

```tsx
<Divider /> {/* horizontal (padrão) */}

<div className="flex h-40">
  <div>Conteúdo à esquerda</div>
  <Divider orientation="vertical" />
  <div>Conteúdo à direita</div>
</div>
```

## Espaçamento

O componente `Divider` oferece controle sobre o espaçamento ao redor do elemento:

- **none**: Sem espaçamento
- **xs**: Espaçamento extra pequeno
- **sm**: Espaçamento pequeno
- **md**: Espaçamento médio (padrão)
- **lg**: Espaçamento grande
- **xl**: Espaçamento extra grande

```tsx
<Divider spacing="none" />
<Divider spacing="xs" />
<Divider spacing="sm" />
<Divider spacing="md" /> {/* padrão */}
<Divider spacing="lg" />
<Divider spacing="xl" />
```

## Casos de Uso Comuns

1. **Separação de Seções**:
   ```tsx
   <section>Seção 1</section>
   <Divider />
   <section>Seção 2</section>
   ```

2. **Listas com Divisores**:
   ```tsx
   <div>
     <div className="flex justify-between">
       <span>Item 1</span>
       <span>Valor</span>
     </div>
     <Divider variant="dotted" spacing="xs" />
     <div className="flex justify-between">
       <span>Item 2</span>
       <span>Valor</span>
     </div>
   </div>
   ```

3. **Layout de Duas Colunas**:
   ```tsx
   <div className="flex h-screen">
     <div className="w-1/3">Sidebar</div>
     <Divider orientation="vertical" />
     <div className="flex-1">Conteúdo principal</div>
   </div>
   ```