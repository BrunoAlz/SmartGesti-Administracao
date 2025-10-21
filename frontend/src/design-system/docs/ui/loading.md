# 🔄 Loading Components - Design System

## Visão Geral

Sistema completo de componentes de loading para indicar estados de carregamento, proporcionando feedback visual claro ao usuário durante operações assíncronas.

## Componentes Disponíveis

### 1. LoadingSpinner
Indicador rotativo animado para estados de carregamento.

**Props:**
```typescript
interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  className?: string;
}
```

**Exemplos:**
```tsx
// Tamanhos
<LoadingSpinner size="xs" />
<LoadingSpinner size="sm" />
<LoadingSpinner size="md" />
<LoadingSpinner size="lg" />
<LoadingSpinner size="xl" />

// Cores
<LoadingSpinner color="primary" />
<LoadingSpinner color="success" />
<LoadingSpinner color="warning" />
<LoadingSpinner color="error" />
```

### 2. LoadingDots
Animação de pontos saltitantes para carregamento discreto.

**Props:**
```typescript
interface LoadingDotsProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  className?: string;
}
```

**Exemplos:**
```tsx
<LoadingDots size="sm" color="primary" />
<LoadingDots size="md" color="success" />
<LoadingDots size="lg" color="warning" />
```

### 3. LoadingPulse
Animação pulsante suave.

**Props:**
```typescript
interface LoadingPulseProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  className?: string;
}
```

**Exemplos:**
```tsx
<LoadingPulse size="md" color="primary" />
```

### 4. LoadingWave
Animação de onda com barras verticais.

**Props:**
```typescript
interface LoadingWaveProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  className?: string;
}
```

**Exemplos:**
```tsx
<LoadingWave size="lg" color="success" />
```

### 5. LoadingSkeleton
Placeholders animados para conteúdo que está carregando.

**Props:**
```typescript
interface LoadingSkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: "text" | "rectangular" | "circular";
  animation?: "pulse" | "wave";
}
```

**Cores Otimizadas:**
- **Modo Light:** `bg-gray-400` (alta visibilidade)
- **Modo Dark:** `bg-white/10` (contraste perfeito)

**Exemplos:**
```tsx
// Linhas de texto
<LoadingSkeleton variant="text" width="60%" />
<LoadingSkeleton variant="text" width="80%" />

// Retângulos
<LoadingSkeleton variant="rectangular" width="100%" height="100px" />

// Avatares
<LoadingSkeleton variant="circular" width="48px" height="48px" />

// Card completo
<div className="flex items-start space-x-4">
  <LoadingSkeleton variant="circular" width="56px" height="56px" />
  <div className="flex-1 space-y-3">
    <LoadingSkeleton width="50%" height="18px" />
    <LoadingSkeleton width="85%" height="14px" />
    <LoadingSkeleton width="70%" height="14px" />
  </div>
</div>
```

### 6. LoadingProgress
Barra de progresso animada com percentual.

**Props:**
```typescript
interface LoadingProgressProps {
  progress: number; // 0-100
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "warning" | "error" | "info";
  showPercentage?: boolean;
  className?: string;
}
```

**Exemplos:**
```tsx
<LoadingProgress progress={45} size="md" color="primary" showPercentage />
<LoadingProgress progress={75} size="lg" color="success" />
```

### 7. LoadingOverlay
Sobreposição de loading sobre conteúdo.

**Props:**
```typescript
interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}
```

**Cores Otimizadas:**
- **Modo Light:** `bg-white/60` (leve, mas visível)
- **Modo Dark:** `bg-gray-900/80` (escuro com transparência)

**Exemplos:**
```tsx
<LoadingOverlay isLoading={isLoading} message="Carregando dados...">
  <YourContent />
</LoadingOverlay>
```

### 8. LoadingCard
Card que alterna automaticamente entre skeleton e conteúdo.

**Props:**
```typescript
interface LoadingCardProps {
  loading: boolean;
  children: React.ReactNode;
  skeletonCount?: number;
  className?: string;
}
```

**Exemplos:**
```tsx
<LoadingCard loading={isLoading} skeletonCount={3}>
  <div className="p-4">
    <h3>Título do Conteúdo</h3>
    <p>Texto do conteúdo real</p>
  </div>
</LoadingCard>
```

### 9. LoadingState
Gerenciador completo de estados (loading, error, empty, success).

**Props:**
```typescript
interface LoadingStateProps {
  loading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  error?: string | null;
  empty?: boolean;
  emptyMessage?: string;
  errorMessage?: string;
  className?: string;
}
```

**Exemplos:**
```tsx
<LoadingState
  loading={isLoading}
  error={error}
  empty={data.length === 0}
  emptyMessage="Nenhum resultado encontrado"
  errorMessage="Erro ao carregar dados"
>
  <YourContent data={data} />
</LoadingState>
```

## Hook useLoading

Hook para gerenciar estados de loading facilmente.

**Retorno:**
```typescript
interface UseLoadingReturn {
  loading: boolean;
  error: string | null;
  startLoading: () => void;
  stopLoading: () => void;
  setLoadingError: (error: string) => void;
  clearError: () => void;
}
```

**Exemplo:**
```tsx
function MyComponent() {
  const { loading, error, startLoading, stopLoading, setLoadingError } = useLoading();

  const fetchData = async () => {
    startLoading();
    try {
      const data = await api.getData();
      stopLoading();
    } catch (err) {
      setLoadingError('Erro ao carregar dados');
    }
  };

  return (
    <LoadingState loading={loading} error={error}>
      <YourContent />
    </LoadingState>
  );
}
```

## Casos de Uso

### Upload de Arquivo com Progresso
```tsx
<div className="space-y-4">
  <div className="p-8 border-2 border-dashed rounded-lg text-center">
    <Upload className="w-8 h-8 mx-auto mb-2" />
    <p>Arraste arquivos ou clique para selecionar</p>
  </div>
  <LoadingProgress progress={uploadProgress} color="success" showPercentage />
</div>
```

### Lista com Skeleton
```tsx
<LoadingCard loading={isLoading} skeletonCount={3}>
  <div className="space-y-3">
    {items.map((item) => (
      <div key={item.id} className="flex items-center gap-3 p-3">
        <Avatar src={item.avatar} />
        <div>
          <p>{item.name}</p>
          <p className="text-sm text-gray-500">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
</LoadingCard>
```

### Overlay de Página Completa
```tsx
<LoadingOverlay isLoading={isSaving} message="Salvando alterações...">
  <YourPageContent />
</LoadingOverlay>
```

## Boas Práticas

### ✅ Recomendado
- Use `LoadingSkeleton` para carregamento de listas e cards
- Use `LoadingOverlay` para operações que bloqueiam a interação
- Use `LoadingProgress` quando há progresso real para mostrar
- Use `LoadingState` para gerenciar múltiplos estados
- Sempre forneça mensagens descritivas nos overlays

### ❌ Evite
- Não use múltiplos spinners ao mesmo tempo
- Não use skeleton para operações rápidas (< 200ms)
- Não esconda completamente o conteúdo durante carregamentos parciais
- Não use cores de loading que confundam o usuário (ex: vermelho para sucesso)

## Acessibilidade

Todos os componentes de loading incluem:
- Atributos ARIA apropriados (`role="status"`, `aria-live="polite"`)
- Mensagens para leitores de tela
- Cores com contraste adequado em ambos os temas
- Animações que respeitam `prefers-reduced-motion`

## Compatibilidade de Temas

Todos os componentes são totalmente compatíveis com light/dark mode:
- **Skeleton:** `bg-gray-400` (light) | `bg-white/10` (dark)
- **Overlay:** `bg-white/60` (light) | `bg-gray-900/80` (dark)
- **Spinners e animações:** cores adaptativas automáticas

## Performance

- Animações otimizadas com `will-change` e `transform`
- Skeleton usa `animate-pulse` nativo do Tailwind
- Overlays usam `backdrop-blur` com moderação
- Componentes leves e sem dependências externas
