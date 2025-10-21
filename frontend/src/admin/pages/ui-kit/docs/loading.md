# 🔄 Loading Components - UI Kit Showcase

## Demonstração Completa

Esta página demonstra todos os componentes de loading disponíveis no design system, com exemplos interativos e código para cada variação.

## Componentes Demonstrados

### 1. LoadingSpinner
- ✅ 5 tamanhos (xs, sm, md, lg, xl)
- ✅ 4 cores (primary, success, warning, error)
- ✅ Animação rotativa suave
- ✅ Responsivo e adaptativo

### 2. LoadingDots
- ✅ 3 tamanhos (sm, md, lg)
- ✅ 4 cores disponíveis
- ✅ Animação saltitante sincronizada
- ✅ Ideal para carregamentos discretos

### 3. LoadingPulse & LoadingWave
- ✅ Animações alternativas
- ✅ Múltiplos tamanhos e cores
- ✅ Uso em contextos variados

### 4. LoadingSkeleton ⭐
**Destaque: Alta Visibilidade em Ambos os Temas**

#### Cores Otimizadas
- **Modo Light:** `bg-gray-400` - Tom médio-escuro para máximo contraste
- **Modo Dark:** `bg-white/10` - Transparência branca suave

#### Variantes
- **Text:** Linhas de texto com diferentes larguras
- **Rectangular:** Blocos retangulares para imagens/cards
- **Circular:** Avatares e ícones circulares

#### Exemplos Práticos
```tsx
// Card de perfil completo
<div className="flex items-start space-x-4">
  <LoadingSkeleton variant="circular" width="56px" height="56px" />
  <div className="flex-1 space-y-3">
    <LoadingSkeleton width="50%" height="18px" />
    <LoadingSkeleton width="85%" height="14px" />
    <LoadingSkeleton width="70%" height="14px" />
  </div>
</div>

// Lista de itens
{[1, 2, 3].map((item) => (
  <div className="flex items-center gap-3 p-3">
    <LoadingSkeleton variant="circular" width="40px" height="40px" />
    <div className="flex-1 space-y-2">
      <LoadingSkeleton width="45%" height="16px" />
      <LoadingSkeleton width="70%" height="12px" />
    </div>
  </div>
))}
```

### 5. LoadingProgress
- ✅ Barra de progresso animada
- ✅ Percentual opcional
- ✅ Cores semânticas
- ✅ Demonstração em tempo real

### 6. LoadingOverlay ⭐
**Melhorado: Opacidade Ajustada para Light Mode**

#### Cores Otimizadas
- **Modo Light:** `bg-white/60` - Menos opaco, mais leve
- **Modo Dark:** `bg-gray-900/80` - Mantém perfeito

#### Demonstração Interativa
Clique no botão para ver o overlay em ação (3 segundos):
- Backdrop blur suave
- Spinner centralizado
- Mensagem personalizada
- Bloqueia interação temporariamente

### 7. LoadingCard ⭐
**Showcase Completo: Alternância Automática**

#### Cards Demonstrados
1. **Profile Card**
   - Avatar circular skeleton
   - Nome e cargo com skeletons
   - Tags de tecnologia

2. **Stats Card**
   - Título do card
   - Lista de estatísticas
   - Valores alinhados

#### Funcionamento
```tsx
<LoadingCard loading={isLoading} skeletonCount={3}>
  {/* Conteúdo real aparece após o loading */}
</LoadingCard>
```

### 8. LoadingState
**Gerenciador Completo de Estados**

#### Estados Suportados
- ✅ **Loading:** Mostra spinner/skeleton
- ✅ **Error:** Mensagem de erro com ícone
- ✅ **Empty:** Estado vazio personalizado
- ✅ **Success:** Conteúdo real

#### Demonstração Interativa
Botões para alternar entre cada estado:
- Loading → Error → Empty → Success

### 9. Exemplos Práticos

#### Upload com Progresso
- Área de upload com drag & drop visual
- Barra de progresso animada
- Percentual atualizado em tempo real

#### Data Loading
- Grid de cards com skeleton
- Transição suave para conteúdo
- Loading states individuais

## Integração com Outros Componentes

### Com Botões
**Nota:** Estados de loading em botões estão na página **"Buttons"** na seção **"Estados dos Botões"**.

### Com Cards
Todos os exemplos funcionam perfeitamente dentro de:
- `<Card>` básico
- `<StatCard>` para métricas
- `<SectionCard>` para seções

### Com Modais
LoadingOverlay pode ser usado dentro de modais para operações assíncronas.

## Padrões de Design

### Quando Usar Cada Tipo

| Componente | Uso Ideal | Duração |
|------------|-----------|---------|
| `LoadingSpinner` | Carregamento geral | Qualquer |
| `LoadingDots` | Carregamento discreto | < 2s |
| `LoadingSkeleton` | Listas, cards, conteúdo | > 500ms |
| `LoadingProgress` | Upload, download | Qualquer |
| `LoadingOverlay` | Operações bloqueantes | > 1s |
| `LoadingCard` | Cards dinâmicos | > 500ms |
| `LoadingState` | Páginas completas | Qualquer |

### Hierarquia Visual
1. **Operações rápidas (< 200ms):** Sem feedback
2. **Operações curtas (200ms - 1s):** Spinner ou dots
3. **Operações médias (1s - 5s):** Skeleton ou overlay
4. **Operações longas (> 5s):** Progress bar com percentual

## Acessibilidade

Todos os componentes incluem:
- ✅ `role="status"` apropriado
- ✅ `aria-live="polite"` para atualizações
- ✅ Mensagens descritivas para screen readers
- ✅ Cores com contraste WCAG AA/AAA
- ✅ Respeito a `prefers-reduced-motion`

## Compatibilidade de Temas

### Light Mode
- Skeletons: `bg-gray-400` (alta visibilidade)
- Overlay: `bg-white/60` (leve)
- Textos: cores escuras

### Dark Mode
- Skeletons: `bg-white/10` (contraste perfeito)
- Overlay: `bg-gray-900/80` (escuro)
- Textos: cores claras

## Performance

- ✅ Animações via CSS (GPU-accelerated)
- ✅ Sem JavaScript desnecessário
- ✅ Bundle size mínimo
- ✅ Tree-shaking friendly

## Código dos Exemplos

Todos os exemplos desta página estão disponíveis no arquivo:
```
/frontend/src/admin/pages/ui-kit/LoadingUIKit.tsx
```

Com implementação completa e interativa de cada componente demonstrado.

## Notas Importantes

### ⚠️ Botões com Loading
Para botões com estado de carregamento, consulte:
- **Página:** Buttons UI Kit
- **Seção:** Estados dos Botões
- **Demonstração:** Estados disabled, loading e hover

### 💡 Skeleton Melhorado
O skeleton foi otimizado após testes extensivos:
- **Antes:** `bg-slate-200` (pouco visível)
- **Depois:** `bg-gray-400` (alta visibilidade)
- **Resultado:** Perfeito em ambos os temas

### 🎨 Design System
Todos os componentes seguem o padrão do design system:
- Cores semânticas consistentes
- Tamanhos padronizados
- Props intuitivas
- TypeScript completo
