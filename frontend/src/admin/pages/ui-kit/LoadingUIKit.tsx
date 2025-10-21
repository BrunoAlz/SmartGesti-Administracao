import React, { useState, useEffect } from "react";
import {
  Upload,
  Check
} from "lucide-react";
import {
  useThemeClasses,
  LoadingSpinner,
  LoadingDots,
  LoadingSkeleton,
  LoadingOverlay,
  LoadingCard,
  LoadingState,
  LoadingProgress,
  LoadingPulse,
  LoadingWave,
  useLoading,
  Button,
  Card,
  CardHeader,
  CardContent,
  cn
} from "../../../design-system";
import { ComponentShowcase, ComponentSection } from "./components/ComponentShowcase";

// ================================
// PÁGINA LOADING UI KIT
// ================================

export const LoadingUIKit: React.FC = () => {
  const { get } = useThemeClasses();
  const [overlayLoading, setOverlayLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stateExample, setStateExample] = useState<"loading" | "error" | "empty" | "success">("loading");
  
  const { loading, error, startLoading, stopLoading, setLoadingError } = useLoading();

  // Simulação de progresso
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 10;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleOverlayDemo = () => {
    setOverlayLoading(true);
    setTimeout(() => setOverlayLoading(false), 3000);
  };

  const handleCardDemo = () => {
    setCardLoading(true);
    setTimeout(() => setCardLoading(false), 2500);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={cn("text-3xl font-bold mb-2", get("text.primary"))}>
          Sistema de Loading
        </h1>
        <p className={cn("text-lg", get("text.secondary"))}>
          Estados de carregamento para melhorar a experiência do usuário
        </p>
        <div className={cn("mt-4 p-3 rounded-lg border", get("border"), "bg-amber-50 dark:bg-amber-900/20")}>
          <p className={cn("text-sm", get("text.secondary"))}>
            ℹ️ <strong>Botões com loading:</strong> Para botões com estado de carregamento, 
            consulte a seção <strong>"Estados dos Botões"</strong> na página de Buttons.
          </p>
        </div>
      </div>

      {/* LOADING SPINNERS */}
      <ComponentSection
        title="Loading Spinners"
        description="Indicadores rotativos de carregamento"
      >
        <ComponentShowcase
          title="Tamanhos"
          description="Spinners em diferentes tamanhos"
          component={
            <div className="flex items-center gap-8">
              <div className="text-center">
                <LoadingSpinner size="xs" />
                <p className="text-xs mt-2 text-gray-500">XS</p>
              </div>
              <div className="text-center">
                <LoadingSpinner size="sm" />
                <p className="text-xs mt-2 text-gray-500">SM</p>
              </div>
              <div className="text-center">
                <LoadingSpinner size="md" />
                <p className="text-xs mt-2 text-gray-500">MD</p>
              </div>
              <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="text-xs mt-2 text-gray-500">LG</p>
              </div>
              <div className="text-center">
                <LoadingSpinner size="xl" />
                <p className="text-xs mt-2 text-gray-500">XL</p>
              </div>
            </div>
          }
          code={`<LoadingSpinner size="xs" />
<LoadingSpinner size="sm" />
<LoadingSpinner size="md" />
<LoadingSpinner size="lg" />
<LoadingSpinner size="xl" />`}
        />

        <ComponentShowcase
          title="Cores"
          description="Spinners com diferentes cores"
          component={
            <div className="flex items-center gap-8">
              <div className="text-center">
                <LoadingSpinner color="primary" size="lg" />
                <p className="text-xs mt-2 text-gray-500">Primary</p>
              </div>
              <div className="text-center">
                <LoadingSpinner color="success" size="lg" />
                <p className="text-xs mt-2 text-gray-500">Success</p>
              </div>
              <div className="text-center">
                <LoadingSpinner color="warning" size="lg" />
                <p className="text-xs mt-2 text-gray-500">Warning</p>
              </div>
              <div className="text-center">
                <LoadingSpinner color="error" size="lg" />
                <p className="text-xs mt-2 text-gray-500">Error</p>
              </div>
            </div>
          }
          code={`<LoadingSpinner color="primary" />
<LoadingSpinner color="success" />
<LoadingSpinner color="warning" />
<LoadingSpinner color="error" />`}
        />
      </ComponentSection>

      {/* LOADING DOTS */}
      <ComponentSection
        title="Loading Dots"
        description="Animação de pontos saltitantes"
      >
        <ComponentShowcase
          title="Tamanhos e Cores"
          description="Dots em diferentes tamanhos e cores"
          component={
            <div className="space-y-6">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <LoadingDots size="sm" />
                  <p className="text-xs mt-3 text-gray-500">Small</p>
                </div>
                <div className="text-center">
                  <LoadingDots size="md" />
                  <p className="text-xs mt-3 text-gray-500">Medium</p>
                </div>
                <div className="text-center">
                  <LoadingDots size="lg" />
                  <p className="text-xs mt-3 text-gray-500">Large</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <LoadingDots color="primary" size="md" />
                <LoadingDots color="success" size="md" />
                <LoadingDots color="warning" size="md" />
                <LoadingDots color="error" size="md" />
              </div>
            </div>
          }
          code={`<LoadingDots size="sm" color="primary" />
<LoadingDots size="md" color="success" />
<LoadingDots size="lg" color="warning" />`}
        />
      </ComponentSection>

      {/* LOADING PULSE E WAVE */}
      <ComponentSection
        title="Loading Pulse & Wave"
        description="Animações alternativas de loading"
      >
        <ComponentShowcase
          title="Loading Pulse"
          description="Animação pulsante simples"
          component={
            <div className="flex items-center gap-8">
              <LoadingPulse size="sm" color="primary" />
              <LoadingPulse size="md" color="success" />
              <LoadingPulse size="lg" color="warning" />
            </div>
          }
          code={`<LoadingPulse size="sm" color="primary" />
<LoadingPulse size="md" color="success" />
<LoadingPulse size="lg" color="warning" />`}
        />

        <ComponentShowcase
          title="Loading Wave"
          description="Animação de onda com barras"
          component={
            <div className="flex items-center gap-8">
              <LoadingWave size="sm" color="primary" />
              <LoadingWave size="md" color="success" />
              <LoadingWave size="lg" color="error" />
            </div>
          }
          code={`<LoadingWave size="sm" color="primary" />
<LoadingWave size="md" color="success" />
<LoadingWave size="lg" color="error" />`}
        />
      </ComponentSection>

      {/* LOADING SKELETON */}
      <ComponentSection
        title="Loading Skeleton"
        description="Placeholders animados para conteúdo - alta visibilidade em ambos os temas"
      >
        <ComponentShowcase
          title="Variantes"
          description="Diferentes tipos de skeletons (bg-gray-400 light | bg-white/10 dark)"
          component={
            <div className="space-y-6">
              <div>
                <p className="text-xs text-gray-500 mb-3 font-medium">Text Lines</p>
                <div className="space-y-2">
                  <LoadingSkeleton variant="text" width="60%" />
                  <LoadingSkeleton variant="text" width="80%" />
                  <LoadingSkeleton variant="text" width="40%" />
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-3 font-medium">Rectangular</p>
                <LoadingSkeleton variant="rectangular" width="100%" height="100px" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-3 font-medium">Circular (Avatares)</p>
                <div className="flex gap-4">
                  <LoadingSkeleton variant="circular" width="40px" height="40px" />
                  <LoadingSkeleton variant="circular" width="48px" height="48px" />
                  <LoadingSkeleton variant="circular" width="64px" height="64px" />
                </div>
              </div>
            </div>
          }
          code={`<LoadingSkeleton variant="text" width="60%" />
<LoadingSkeleton variant="rectangular" width="100%" height="100px" />
<LoadingSkeleton variant="circular" width="48px" height="48px" />

// Cores para alta visibilidade:
// Modo claro: bg-gray-400 (tom médio-escuro)
// Modo escuro: bg-white/10`}
        />

        <ComponentShowcase
          title="Card Skeleton - Exemplo Real"
          description="Skeleton completo para card de perfil"
          component={
            <div className={cn("p-4 rounded-lg border", get("border"), get("card"))}>
              <div className="flex items-start space-x-4">
                <LoadingSkeleton variant="circular" width="56px" height="56px" />
                <div className="flex-1 space-y-3">
                  <LoadingSkeleton width="50%" height="18px" />
                  <LoadingSkeleton width="85%" height="14px" />
                  <LoadingSkeleton width="70%" height="14px" />
                  <div className="flex gap-2 mt-4">
                    <LoadingSkeleton width="80px" height="32px" className="rounded-md" />
                    <LoadingSkeleton width="80px" height="32px" className="rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          }
          code={`<div className="flex items-start space-x-4">
  <LoadingSkeleton variant="circular" width="56px" height="56px" />
  <div className="flex-1 space-y-3">
    <LoadingSkeleton width="50%" height="18px" />
    <LoadingSkeleton width="85%" height="14px" />
    <LoadingSkeleton width="70%" height="14px" />
  </div>
</div>`}
        />

        <ComponentShowcase
          title="List Skeleton - Cards de Lista"
          description="Skeleton para listas de itens"
          component={
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className={cn("flex items-center gap-3 p-3 rounded-lg border", get("border"), get("card"))}
                >
                  <LoadingSkeleton variant="circular" width="40px" height="40px" />
                  <div className="flex-1 space-y-2">
                    <LoadingSkeleton width="45%" height="16px" />
                    <LoadingSkeleton width="70%" height="12px" />
                  </div>
                  <LoadingSkeleton width="60px" height="24px" className="rounded" />
                </div>
              ))}
            </div>
          }
          code={`{items.map((item) => (
  <div className="flex items-center gap-3 p-3">
    <LoadingSkeleton variant="circular" width="40px" height="40px" />
    <div className="flex-1 space-y-2">
      <LoadingSkeleton width="45%" height="16px" />
      <LoadingSkeleton width="70%" height="12px" />
    </div>
  </div>
))}`}
        />
      </ComponentSection>

      {/* LOADING PROGRESS */}
      <ComponentSection
        title="Loading Progress"
        description="Barra de progresso animada"
      >
        <ComponentShowcase
          title="Progresso Dinâmico"
          description={`Progresso atual: ${Math.round(progress)}%`}
          component={
            <div className="space-y-4">
              <LoadingProgress progress={progress} size="md" color="primary" showPercentage={true} />
              <LoadingProgress progress={50} size="md" color="success" showPercentage={false} />
              <LoadingProgress progress={75} size="lg" color="warning" />
            </div>
          }
          code={`<LoadingProgress 
  progress={75} 
  size="md" 
  color="primary"
  showPercentage={true}
/>`}
        />
      </ComponentSection>

      {/* LOADING OVERLAY */}
      <ComponentSection
        title="Loading Overlay"
        description="Sobreposição de loading sobre conteúdo"
      >
        <ComponentShowcase
          title="Demonstração com Overlay"
          description="Overlay que cobre o conteúdo durante o carregamento"
          component={
            <div className="space-y-4">
              <Button onClick={handleOverlayDemo} variant="primary">
                Demonstrar Overlay (3s)
              </Button>

              <LoadingOverlay
                isLoading={overlayLoading}
                message="Carregando informações..."
                size="md"
              >
                <div className={cn("p-8 border rounded-lg", get("border"), get("card"))}>
                  <h3 className={cn("text-lg font-semibold mb-3", get("text.primary"))}>
                    Conteúdo da Página
                  </h3>
                  <p className={cn("text-sm mb-2", get("text.secondary"))}>
                    Este é um exemplo de conteúdo que será coberto pelo overlay.
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className={cn("h-20 rounded", get("card"), "border", get("border"))} />
                    <div className={cn("h-20 rounded", get("card"), "border", get("border"))} />
                    <div className={cn("h-20 rounded", get("card"), "border", get("border"))} />
                  </div>
                </div>
              </LoadingOverlay>
            </div>
          }
          code={`<LoadingOverlay 
  isLoading={isLoading}
  message="Carregando dados..."
  size="lg"
>
  <YourContent />
</LoadingOverlay>`}
        />
      </ComponentSection>

      {/* LOADING CARD */}
      <ComponentSection
        title="Loading Card"
        description="Card com skeleton loader automático - otimizado para ambos os temas"
      >
        <ComponentShowcase
          title="Demonstração Loading Card"
          description="Card que alterna entre skeleton e conteúdo (clique para testar)"
          component={
            <div className="space-y-4">
              <Button onClick={handleCardDemo} variant="primary">
                {cardLoading ? 'Carregando...' : 'Demonstrar Loading Card (2.5s)'}
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card 1 - Profile */}
                <LoadingCard loading={cardLoading} skeletonCount={3}>
                  <div className={cn("p-4 border rounded-lg", get("border"), get("card"))}>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-xl">
                        JD
                      </div>
                      <div className="flex-1">
                        <h3 className={cn("text-lg font-semibold mb-1", get("text.primary"))}>
                          John Doe
                        </h3>
                        <p className={cn("text-sm mb-2", get("text.secondary"))}>
                          Senior Developer • São Paulo, Brasil
                        </p>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            React
                          </span>
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                            TypeScript
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </LoadingCard>

                {/* Card 2 - Stats */}
                <LoadingCard loading={cardLoading} skeletonCount={4}>
                  <div className={cn("p-4 border rounded-lg", get("border"), get("card"))}>
                    <h3 className={cn("text-lg font-semibold mb-3", get("text.primary"))}>
                      Estatísticas
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className={cn("text-sm", get("text.secondary"))}>Total de Vendas</span>
                        <span className={cn("font-semibold", get("text.primary"))}>R$ 12.450</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={cn("text-sm", get("text.secondary"))}>Novos Clientes</span>
                        <span className={cn("font-semibold text-green-600 dark:text-green-400")}>+28</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={cn("text-sm", get("text.secondary"))}>Taxa de Conversão</span>
                        <span className={cn("font-semibold", get("text.primary"))}>3.2%</span>
                      </div>
                    </div>
                  </div>
                </LoadingCard>
              </div>

              <div className={cn("p-3 rounded-lg border", get("border"), "bg-blue-50 dark:bg-blue-900/20")}>
                <p className={cn("text-sm", get("text.secondary"))}>
                  💡 <strong>Alta visibilidade:</strong> bg-gray-400 (light) | bg-white/10 (dark)
                </p>
              </div>
            </div>
          }
          code={`<LoadingCard 
  loading={isLoading}
  skeletonCount={3}
>
  <CardContent />
</LoadingCard>

// Skeleton com alta visibilidade:
// Modo claro: bg-gray-400 (tom médio-escuro)
// Modo escuro: bg-white/10`}
        />
      </ComponentSection>

      {/* LOADING STATE */}
      <ComponentSection
        title="Loading State"
        description="Gerenciador completo de estados: loading, error, empty, success"
      >
        <ComponentShowcase
          title="Estados Diferentes"
          description="Demonstração dos diferentes estados"
          component={
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button onClick={() => setStateExample("loading")} variant="secondary" size="sm">
                  Loading
                </Button>
                <Button onClick={() => setStateExample("error")} variant="danger" size="sm">
                  Error
                </Button>
                <Button onClick={() => setStateExample("empty")} variant="secondary" size="sm">
                  Empty
                </Button>
                <Button onClick={() => setStateExample("success")} variant="success" size="sm">
                  Success
                </Button>
              </div>

              <div className={cn("min-h-[200px] border rounded-lg", get("border"))}>
                <LoadingState
                  loading={stateExample === "loading"}
                  error={stateExample === "error" ? "Falha na conexão com o servidor" : null}
                  empty={stateExample === "empty"}
                  emptyMessage="Nenhum resultado encontrado"
                  errorMessage="Ocorreu um erro ao carregar os dados"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Check className="w-5 h-5 text-green-600" />
                      <h4 className={cn("font-semibold", get("text.primary"))}>
                        Dados Carregados com Sucesso!
                      </h4>
                    </div>
                    <p className={cn("text-sm", get("text.secondary"))}>
                      Este é o conteúdo que aparece quando os dados são carregados com sucesso.
                    </p>
                  </div>
                </LoadingState>
              </div>
            </div>
          }
          code={`const { loading, error } = useLoading();

<LoadingState
  loading={loading}
  error={error}
  empty={data.length === 0}
  emptyMessage="Nenhum dado encontrado"
>
  <YourContent />
</LoadingState>`}
        />
      </ComponentSection>

      {/* EXEMPLOS PRÁTICOS */}
      <ComponentSection
        title="Exemplos Práticos"
        description="Casos de uso reais combinando múltiplos componentes"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Card */}
          <Card>
            <CardHeader>
              <h3 className={cn("text-lg font-semibold", get("text.primary"))}>Upload de Arquivo</h3>
              <p className={cn("text-sm", get("text.secondary"))}>Exemplo de upload com progresso</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={cn("p-8 border-2 border-dashed rounded-lg text-center border-gray-200 dark:border-white/[0.07]")}>
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className={cn("text-sm", get("text.secondary"))}>
                    Arraste arquivos ou clique para selecionar
                  </p>
                </div>
                <LoadingProgress progress={progress} color="success" showPercentage />
                <p className={cn("text-xs text-center", get("text.secondary"))}>
                  {Math.round(progress)}% concluído
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Loading */}
          <Card>
            <CardHeader>
              <h3 className={cn("text-lg font-semibold", get("text.primary"))}>Carregamento de Dados</h3>
              <p className={cn("text-sm", get("text.secondary"))}>Lista com skeleton loader</p>
            </CardHeader>
            <CardContent>
              <LoadingCard loading={false} skeletonCount={2}>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className={cn("flex items-center gap-3 p-3 rounded-lg", get("card"), "border", get("border"))}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {item}
                      </div>
                      <div className="flex-1">
                        <p className={cn("text-sm font-medium", get("text.primary"))}>
                          Item de Dados {item}
                        </p>
                        <p className={cn("text-xs", get("text.secondary"))}>
                          Descrição do item
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </LoadingCard>
            </CardContent>
          </Card>
        </div>
      </ComponentSection>
    </div>
  );
};

export default LoadingUIKit;
