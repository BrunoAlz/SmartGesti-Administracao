import React, { useState } from "react";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Info, 
  Star, 
  Users,
  Calendar,
  Clock,
  Mail,
  MapPin,
  Tag,
  Shield,
  Zap,
  TrendingUp
} from "lucide-react";
import { 
  useThemeClasses, 
  useBadgeClasses,
  Badge,
  BadgeGroup,
  cn 
} from "../../../design-system";
import { ComponentShowcase, ComponentSection } from "./components/ComponentShowcase";

// ================================
// PÁGINA BADGES UI KIT
// ================================

export const BadgesUIKit: React.FC = () => {
  const { get } = useThemeClasses();
  const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind', 'Vite']);

  // Demonstrar o uso do hook useBadgeClasses
  const successBadge = useBadgeClasses("success", "sm");
  const warningBadge = useBadgeClasses("warning", "sm");
  const errorBadge = useBadgeClasses("error", "sm");
  const infoBadge = useBadgeClasses("info", "sm");
  const purpleBadge = useBadgeClasses("purple", "sm");

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={cn("text-3xl font-bold mb-2", get("text.primary"))}>
          Badges
        </h1>
        <p className={cn("text-lg", get("text.secondary"))}>
          Sistema completo de badges para indicadores de status, categorias e informações
        </p>
      </div>

      {/* Componente Badge vs Hook */}
      <ComponentSection
        title="Componente Badge vs Hook"
        description="Comparação entre usar o componente Badge dedicado e o hook useBadgeClasses"
      >
        <ComponentShowcase
          title="Componente Badge (Recomendado)"
          description="Componente dedicado com props declarativas e funcionalidades avançadas"
          component={
            <BadgeGroup>
              <Badge variant="success">Sucesso</Badge>
              <Badge variant="warning">Aviso</Badge>
              <Badge variant="error">Erro</Badge>
              <Badge variant="info">Informação</Badge>
              <Badge variant="purple">Premium</Badge>
              <Badge variant="neutral">Neutro</Badge>
            </BadgeGroup>
          }
          code={`<BadgeGroup>
  <Badge variant="success">Sucesso</Badge>
  <Badge variant="warning">Aviso</Badge>
  <Badge variant="error">Erro</Badge>
  <Badge variant="info">Informação</Badge>
  <Badge variant="purple">Premium</Badge>
  <Badge variant="neutral">Neutro</Badge>
</BadgeGroup>`}
        />

        <ComponentShowcase
          title="Hook useBadgeClasses (Legado)"
          description="Hook para aplicar classes diretamente - mantido por compatibilidade"
          component={
            <div className="flex flex-wrap gap-4">
              <span className={successBadge}>Sucesso</span>
              <span className={warningBadge}>Aviso</span>
              <span className={errorBadge}>Erro</span>
              <span className={infoBadge}>Informação</span>
              <span className={purpleBadge}>Premium</span>
            </div>
          }
          code={`const successBadge = useBadgeClasses("success", "sm");

<span className={successBadge}>Sucesso</span>
<span className={warningBadge}>Aviso</span>`}
        />
      </ComponentSection>

      {/* Paleta Completa de Cores */}
      <ComponentSection
        title="Paleta Completa de Cores"
        description="Todas as cores disponíveis para badges, incluindo gradientes"
      >
        <ComponentShowcase
          title="Cores Básicas"
          description="Cores padrão com fundos suaves e bordas definidas"
          component={
            <BadgeGroup spacing="normal">
              <Badge variant="blue">Azul</Badge>
              <Badge variant="green">Verde</Badge>
              <Badge variant="yellow">Amarelo</Badge>
              <Badge variant="red">Vermelho</Badge>
              <Badge variant="pink">Rosa</Badge>
              <Badge variant="indigo">Índigo</Badge>
              <Badge variant="teal">Turquesa</Badge>
              <Badge variant="orange">Laranja</Badge>
            </BadgeGroup>
          }
          code={`<Badge variant="blue">Azul</Badge>
<Badge variant="green">Verde</Badge>
<Badge variant="yellow">Amarelo</Badge>
<Badge variant="red">Vermelho</Badge>
<Badge variant="pink">Rosa</Badge>
<Badge variant="indigo">Índigo</Badge>
<Badge variant="teal">Turquesa</Badge>
<Badge variant="orange">Laranja</Badge>`}
        />

        <ComponentShowcase
          title="Gradientes Premium"
          description="Cores em gradiente para destaques especiais e elementos premium"
          component={
            <BadgeGroup spacing="normal">
              <Badge variant="blue-gradient">Azul Gradiente</Badge>
              <Badge variant="green-gradient">Verde Gradiente</Badge>
              <Badge variant="purple-gradient">Roxo Gradiente</Badge>
              <Badge variant="pink-gradient">Rosa Gradiente</Badge>
              <Badge variant="orange-gradient">Laranja Gradiente</Badge>
              <Badge variant="teal-gradient">Turquesa Gradiente</Badge>
            </BadgeGroup>
          }
          code={`<Badge variant="blue-gradient">Azul Gradiente</Badge>
<Badge variant="green-gradient">Verde Gradiente</Badge>
<Badge variant="purple-gradient">Roxo Gradiente</Badge>
<Badge variant="pink-gradient">Rosa Gradiente</Badge>
<Badge variant="orange-gradient">Laranja Gradiente</Badge>
<Badge variant="teal-gradient">Turquesa Gradiente</Badge>`}
        />

        <ComponentShowcase
          title="Gradientes com Ícones"
          description="Demonstração dos gradientes combinados com ícones para elementos premium"
          component={
            <div className="space-y-4">
              <BadgeGroup spacing="normal">
                <Badge variant="blue-gradient" icon={<Star />}>Premium</Badge>
                <Badge variant="green-gradient" icon={<CheckCircle />}>Verificado</Badge>
                <Badge variant="purple-gradient" icon={<Zap />}>Pro</Badge>
              </BadgeGroup>
              <BadgeGroup spacing="normal">
                <Badge variant="pink-gradient" icon={<TrendingUp />}>Trending</Badge>
                <Badge variant="orange-gradient" icon={<Shield />}>Seguro</Badge>
                <Badge variant="teal-gradient" icon={<Mail />}>VIP</Badge>
              </BadgeGroup>
            </div>
          }
          code={`<Badge variant="blue-gradient" icon={<Star />}>Premium</Badge>
<Badge variant="green-gradient" icon={<CheckCircle />}>Verificado</Badge>
<Badge variant="purple-gradient" icon={<Zap />}>Pro</Badge>
<Badge variant="pink-gradient" icon={<TrendingUp />}>Trending</Badge>`}
        />
      </ComponentSection>

      {/* Tamanhos */}
      <ComponentSection
        title="Tamanhos"
        description="Diferentes tamanhos de badges para várias necessidades"
      >
        <ComponentShowcase
          title="Todos os Tamanhos"
          description="Small, Medium e Large com exemplos de uso"
          component={
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="info" size="sm">Pequeno</Badge>
                <Badge variant="info" size="md">Médio</Badge>
                <Badge variant="info" size="lg">Grande</Badge>
              </div>
              
              <div className="text-sm text-slate-600 dark:text-slate-400">
                <p><strong>SM:</strong> Para listas compactas e tags</p>
                <p><strong>MD:</strong> Para uso geral em cards e forms</p>
                <p><strong>LG:</strong> Para destaques e CTAs</p>
              </div>
            </div>
          }
          code={`<Badge variant="info" size="sm">Pequeno</Badge>
<Badge variant="info" size="md">Médio</Badge>
<Badge variant="info" size="lg">Grande</Badge>`}
        />

        <ComponentShowcase
          title="Tamanhos com Ícones"
          description="Proporção dos ícones em diferentes tamanhos de badges"
          component={
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="info" icon={<Info />} size="sm">Pequeno</Badge>
                <Badge variant="info" icon={<Info />} size="md">Médio</Badge>
                <Badge variant="info" icon={<Info />} size="lg">Grande</Badge>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="success" icon={<CheckCircle />} size="sm">Aprovado</Badge>
                <Badge variant="success" icon={<CheckCircle />} size="md">Aprovado</Badge>
                <Badge variant="success" icon={<CheckCircle />} size="lg">Aprovado</Badge>
              </div>
            </div>
          }
          code={`<Badge variant="info" icon={<Info />} size="sm">Pequeno</Badge>
<Badge variant="info" icon={<Info />} size="md">Médio</Badge>
<Badge variant="info" icon={<Info />} size="lg">Grande</Badge>`}
        />
      </ComponentSection>

      {/* Badges com Ícones */}
      <ComponentSection
        title="Badges com Ícones"
        description="Badges combinados com ícones para melhor comunicação visual"
      >
        <ComponentShowcase
          title="Ícones por Status"
          description="Cada status com seu ícone semântico apropriado"
          component={
            <BadgeGroup spacing="normal">
              <Badge variant="success" icon={<CheckCircle />}>Concluído</Badge>
              <Badge variant="warning" icon={<AlertTriangle />}>Atenção</Badge>
              <Badge variant="error" icon={<XCircle />}>Falhou</Badge>
              <Badge variant="info" icon={<Info />}>Novo</Badge>
              <Badge variant="purple" icon={<Star />}>Premium</Badge>
            </BadgeGroup>
          }
          code={`<Badge variant="success" icon={<CheckCircle />}>Concluído</Badge>
<Badge variant="warning" icon={<AlertTriangle />}>Atenção</Badge>
<Badge variant="error" icon={<XCircle />}>Falhou</Badge>
<Badge variant="info" icon={<Info />}>Novo</Badge>
<Badge variant="purple" icon={<Star />}>Premium</Badge>`}
        />

        <ComponentShowcase
          title="Ícones Contextuais"
          description="Ícones que representam diferentes contextos e categorias"
          component={
            <BadgeGroup spacing="normal">
              <Badge variant="info" icon={<Users />} size="md">Equipe</Badge>
              <Badge variant="success" icon={<Calendar />} size="md">Agendado</Badge>
              <Badge variant="warning" icon={<Clock />} size="md">Pendente</Badge>
              <Badge variant="purple" icon={<Mail />} size="md">Email</Badge>
              <Badge variant="neutral" icon={<MapPin />} size="md">Local</Badge>
            </BadgeGroup>
          }
          code={`<Badge variant="info" icon={<Users />} size="md">Equipe</Badge>
<Badge variant="success" icon={<Calendar />} size="md">Agendado</Badge>
<Badge variant="warning" icon={<Clock />} size="md">Pendente</Badge>
<Badge variant="purple" icon={<Mail />} size="md">Email</Badge>
<Badge variant="neutral" icon={<MapPin />} size="md">Local</Badge>`}
        />
      </ComponentSection>

      {/* Badges com Dot */}
      <ComponentSection
        title="Badges com Indicador (Dot)"
        description="Badges com pequenos pontos coloridos para status discretos"
      >
        <ComponentShowcase
          title="Status com Dots"
          description="Indicadores visuais sutis para status e estados"
          component={
            <BadgeGroup>
              <Badge variant="success" dot>Online</Badge>
              <Badge variant="warning" dot>Ocupado</Badge>
              <Badge variant="error" dot>Offline</Badge>
              <Badge variant="info" dot>Ausente</Badge>
              <Badge variant="neutral" dot>Invisível</Badge>
            </BadgeGroup>
          }
          code={`<Badge variant="success" dot>Online</Badge>
<Badge variant="warning" dot>Ocupado</Badge>
<Badge variant="error" dot>Offline</Badge>
<Badge variant="info" dot>Ausente</Badge>
<Badge variant="neutral" dot>Invisível</Badge>`}
        />

        <ComponentShowcase
          title="Combinação: Dot + Ícone"
          description="Dots combinados com ícones para maior expressividade"
          component={
            <BadgeGroup>
              <Badge variant="success" dot icon={<Zap />} size="md">Ativo</Badge>
              <Badge variant="warning" dot icon={<Clock />} size="md">Pausado</Badge>
              <Badge variant="error" dot icon={<Shield />} size="md">Bloqueado</Badge>
              <Badge variant="info" dot icon={<TrendingUp />} size="md">Crescendo</Badge>
            </BadgeGroup>
          }
          code={`<Badge variant="success" dot icon={<Zap />} size="md">Ativo</Badge>
<Badge variant="warning" dot icon={<Clock />} size="md">Pausado</Badge>
<Badge variant="error" dot icon={<Shield />} size="md">Bloqueado</Badge>
<Badge variant="info" dot icon={<TrendingUp />} size="md">Crescendo</Badge>`}
        />
      </ComponentSection>

      {/* Badges Removíveis */}
      <ComponentSection
        title="Badges Removíveis (Tags)"
        description="Badges que podem ser removidos pelo usuário - ideal para tags e filtros"
      >
        <ComponentShowcase
          title="Tags Dinâmicas"
          description="Lista de tags que podem ser removidas individualmente"
          component={
            <div className="space-y-4">
              <BadgeGroup>
                {tags.map((tag, index) => (
                  <Badge 
                    key={index}
                    variant="info" 
                    removable 
                    onRemove={() => removeTag(index)}
                    size="md"
                  >
                    {tag}
                  </Badge>
                ))}
              </BadgeGroup>
              {tags.length === 0 && (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Todas as tags foram removidas! Recarregue a página para restaurar.
                </p>
              )}
            </div>
          }
          code={`const [tags, setTags] = useState(['React', 'TypeScript']);

{tags.map((tag, index) => (
  <Badge 
    key={index}
    variant="info" 
    removable 
    onRemove={() => removeTag(index)}
  >
    {tag}
  </Badge>
))}`}
        />

        <ComponentShowcase
          title="Tags com Variantes"
          description="Tags removíveis com diferentes cores e contextos"
          component={
            <BadgeGroup>
              <Badge variant="success" removable icon={<CheckCircle />}>Aprovado</Badge>
              <Badge variant="warning" removable icon={<Clock />}>Em Análise</Badge>
              <Badge variant="purple" removable icon={<Star />}>Favorito</Badge>
              <Badge variant="neutral" removable icon={<Tag />}>Categoria</Badge>
            </BadgeGroup>
          }
          code={`<Badge variant="success" removable icon={<CheckCircle />}>Aprovado</Badge>
<Badge variant="warning" removable icon={<Clock />}>Em Análise</Badge>
<Badge variant="purple" removable icon={<Star />}>Favorito</Badge>
<Badge variant="neutral" removable icon={<Tag />}>Categoria</Badge>`}
        />
      </ComponentSection>

      {/* Badges Interativos */}
      <ComponentSection
        title="Badges Interativos"
        description="Badges clicáveis que podem acionar ações"
      >
        <ComponentShowcase
          title="Badges Clicáveis"
          description="Badges que respondem a cliques com feedback visual"
          component={
            <BadgeGroup>
              <Badge 
                variant="info" 
                onClick={() => alert('Badge Info clicado!')}
                icon={<Info />}
                size="md"
              >
                Clique em mim
              </Badge>
              <Badge 
                variant="success" 
                onClick={() => alert('Ação executada!')}
                icon={<CheckCircle />}
                size="md"
              >
                Executar
              </Badge>
              <Badge 
                variant="purple" 
                onClick={() => alert('Premium ativado!')}
                icon={<Star />}
                size="md"
              >
                Upgrade
              </Badge>
            </BadgeGroup>
          }
          code={`<Badge 
  variant="info" 
  onClick={() => alert('Badge clicado!')}
  icon={<Info />}
  size="md"
>
  Clique em mim
</Badge>`}
        />
      </ComponentSection>

      {/* Styles Variations */}
      <ComponentSection
        title="Variações de Estilo"
        description="Diferentes estilos visuais: preenchido, outlined e formato"
      >
        <ComponentShowcase
          title="Badges Outlined"
          description="Versão outline para fundos coloridos ou quando se quer menos destaque"
          component={
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm mb-3">Badges outlined:</p>
                <BadgeGroup>
                  <Badge variant="success" outlined>Sucesso</Badge>
                  <Badge variant="warning" outlined>Aviso</Badge>
                  <Badge variant="error" outlined>Erro</Badge>
                  <Badge variant="info" outlined>Info</Badge>
                </BadgeGroup>
              </div>

              <div className="p-4 border rounded-lg">
                <p className="text-sm mb-3">Com ícones:</p>
                <BadgeGroup>
                  <Badge variant="success" outlined icon={<CheckCircle />}>Aprovado</Badge>
                  <Badge variant="warning" outlined icon={<Clock />}>Pendente</Badge>
                  <Badge variant="error" outlined icon={<XCircle />}>Rejeitado</Badge>
                </BadgeGroup>
              </div>
            </div>
          }
          code={`<Badge variant="success" outlined>Sucesso</Badge>
<Badge variant="warning" outlined>Aviso</Badge>
<Badge variant="error" outlined>Erro</Badge>
<Badge variant="info" outlined>Info</Badge>`}
        />

        <ComponentShowcase
          title="Formatos de Bordas"
          description="Diferentes formatos de arredondamento"
          component={
            <div className="space-y-4">
              <div>
                <p className="text-sm mb-2 font-medium">Rounded Full (padrão):</p>
                <BadgeGroup>
                  <Badge variant="info" rounded="full">Full</Badge>
                  <Badge variant="success" rounded="full" icon={<CheckCircle />}>Com Ícone</Badge>
                </BadgeGroup>
              </div>

              <div>
                <p className="text-sm mb-2 font-medium">Rounded Medium:</p>
                <BadgeGroup>
                  <Badge variant="info" rounded="md">Medium</Badge>
                  <Badge variant="warning" rounded="md" icon={<AlertTriangle />}>Com Ícone</Badge>
                </BadgeGroup>
              </div>

              <div>
                <p className="text-sm mb-2 font-medium">Rounded Large:</p>
                <BadgeGroup>
                  <Badge variant="info" rounded="lg">Large</Badge>
                  <Badge variant="purple" rounded="lg" icon={<Star />}>Com Ícone</Badge>
                </BadgeGroup>
              </div>
            </div>
          }
          code={`<Badge variant="info" rounded="full">Full</Badge>
<Badge variant="info" rounded="md">Medium</Badge>
<Badge variant="info" rounded="lg">Large</Badge>`}
        />
      </ComponentSection>

      {/* Badges em Contexto */}
      <ComponentSection
        title="Badges em Contexto"
        description="Exemplos práticos de como usar badges em diferentes contextos"
      >
        <ComponentShowcase
          title="Em Cards e Listas"
          description="Badges integrados em componentes para indicar status e categorias"
          component={
            <div className="space-y-4">
              <div className={cn("p-4 rounded-lg border", get("background.primary"), get("border.primary"))}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={cn("font-semibold", get("text.primary"))}>Projeto Alpha</h3>
                  <Badge variant="success" icon={<CheckCircle />}>Ativo</Badge>
                </div>
                <p className={cn("text-sm", get("text.secondary"))}>
                  Sistema de gestão em produção
                </p>
                <div className="flex gap-2 mt-3">
                  <Badge variant="info" size="sm">React</Badge>
                  <Badge variant="neutral" size="sm">TypeScript</Badge>
                  <Badge variant="purple" size="sm">Premium</Badge>
                </div>
              </div>
            </div>
          }
          code={`<div className="p-4 rounded-lg border">
  <div className="flex items-center justify-between mb-2">
    <h3>Projeto Alpha</h3>
    <Badge variant="success" icon={<CheckCircle />}>Ativo</Badge>
  </div>
  <div className="flex gap-2 mt-3">
    <Badge variant="info" size="sm">React</Badge>
    <Badge variant="neutral" size="sm">TypeScript</Badge>
  </div>
</div>`}
        />
      </ComponentSection>
    </div>
  );
};

export default BadgesUIKit;