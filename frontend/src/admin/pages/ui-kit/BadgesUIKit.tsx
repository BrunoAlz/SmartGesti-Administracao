import React from "react";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import { 
  useThemeClasses, 
  useBadgeClasses,
  cn 
} from "../../../design-system";
import { ComponentShowcase, ComponentSection } from "./components/ComponentShowcase";

// ================================
// PÁGINA BADGES UI KIT
// ================================

export const BadgesUIKit: React.FC = () => {
  const { get } = useThemeClasses();

  // Demonstrar o uso do hook useBadgeClasses
  const successBadge = useBadgeClasses("success", "sm");
  const warningBadge = useBadgeClasses("warning", "sm");
  const errorBadge = useBadgeClasses("error", "sm");
  const infoBadge = useBadgeClasses("info", "sm");
  const purpleBadge = useBadgeClasses("purple", "sm");

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={cn("text-3xl font-bold mb-2", get("text.primary"))}>
          Badges
        </h1>
        <p className={cn("text-lg", get("text.secondary"))}>
          Componentes de badge para indicadores de status e informações
        </p>
      </div>

      {/* Badges Básicos */}
      <ComponentSection
        title="Badges Básicos"
        description="Diferentes variantes de badges para status e informações"
      >
        <ComponentShowcase
          title="Variantes por Status"
          description="Badges com cores semânticas para diferentes tipos de status"
          component={
            <div className="flex flex-wrap gap-4">
              <span className={successBadge}>Sucesso</span>
              <span className={warningBadge}>Aviso</span>
              <span className={errorBadge}>Erro</span>
              <span className={infoBadge}>Informação</span>
              <span className={purpleBadge}>Purple</span>
            </div>
          }
          code={`const successBadge = useBadgeClasses("success", "sm");
const warningBadge = useBadgeClasses("warning", "sm");
const errorBadge = useBadgeClasses("error", "sm");
const infoBadge = useBadgeClasses("info", "sm");
const purpleBadge = useBadgeClasses("purple", "sm");

<span className={successBadge}>Sucesso</span>
<span className={warningBadge}>Aviso</span>
<span className={errorBadge}>Erro</span>
<span className={infoBadge}>Informação</span>
<span className={purpleBadge}>Purple</span>`}
        />

        <ComponentShowcase
          title="Tamanhos"
          description="Diferentes tamanhos de badges"
          component={
            <div className="flex flex-wrap items-center gap-4">
              <span className={useBadgeClasses("info", "sm")}>Pequeno</span>
              <span className={useBadgeClasses("info", "md")}>Médio</span>
            </div>
          }
          code={`<span className={useBadgeClasses("info", "sm")}>Pequeno</span>
<span className={useBadgeClasses("info", "md")}>Médio</span>`}
        />
      </ComponentSection>

      {/* Badges com Ícones */}
      <ComponentSection
        title="Badges com Ícones"
        description="Badges combinados com ícones para melhor comunicação visual"
      >
        <ComponentShowcase
          title="Badges com Ícones"
          description="Combinação de ícones com texto nos badges"
          component={
            <div className="flex flex-wrap gap-4">
              <span className={cn(successBadge, "flex items-center gap-1")}>
                <CheckCircle className="w-3 h-3" />
                Concluído
              </span>
              <span className={cn(warningBadge, "flex items-center gap-1")}>
                <AlertTriangle className="w-3 h-3" />
                Atenção
              </span>
              <span className={cn(errorBadge, "flex items-center gap-1")}>
                <XCircle className="w-3 h-3" />
                Falhou
              </span>
              <span className={cn(infoBadge, "flex items-center gap-1")}>
                <Info className="w-3 h-3" />
                Novo
              </span>
            </div>
          }
          code={`<span className={cn(successBadge, "flex items-center gap-1")}>
  <CheckCircle className="w-3 h-3" />
  Concluído
</span>
<span className={cn(warningBadge, "flex items-center gap-1")}>
  <AlertTriangle className="w-3 h-3" />
  Atenção
</span>
<span className={cn(errorBadge, "flex items-center gap-1")}>
  <XCircle className="w-3 h-3" />
  Falhou
</span>
<span className={cn(infoBadge, "flex items-center gap-1")}>
  <Info className="w-3 h-3" />
  Novo
</span>`}
        />
      </ComponentSection>

      {/* Badges em Contexto */}
      <ComponentSection
        title="Badges em Contexto"
        description="Exemplos de como usar badges em diferentes contextos"
      >
        <ComponentShowcase
          title="Em Cards e Listas"
          description="Badges usados dentro de componentes"
          component={
            <div className="space-y-4">
              <div className={cn("p-4 rounded-lg border", get("background.primary"), get("border.primary"))}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={cn("font-semibold", get("text.primary"))}>Projeto Alpha</h3>
                  <span className={successBadge}>Ativo</span>
                </div>
                <p className={cn("text-sm", get("text.secondary"))}>
                  Sistema de gestão em produção
                </p>
              </div>
              
              <div className={cn("p-4 rounded-lg border", get("background.primary"), get("border.primary"))}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={cn("font-semibold", get("text.primary"))}>Projeto Beta</h3>
                  <span className={warningBadge}>Em Teste</span>
                </div>
                <p className={cn("text-sm", get("text.secondary"))}>
                  Em fase de homologação
                </p>
              </div>
              
              <div className={cn("p-4 rounded-lg border", get("background.primary"), get("border.primary"))}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={cn("font-semibold", get("text.primary"))}>Projeto Gamma</h3>
                  <span className={errorBadge}>Suspenso</span>
                </div>
                <p className={cn("text-sm", get("text.secondary"))}>
                  Projeto temporariamente suspenso
                </p>
              </div>
            </div>
          }
          code={`<div className="p-4 rounded-lg border">
  <div className="flex items-center justify-between mb-2">
    <h3 className="font-semibold">Projeto Alpha</h3>
    <span className={useBadgeClasses("success", "sm")}>Ativo</span>
  </div>
  <p className="text-sm text-secondary">
    Sistema de gestão em produção
  </p>
</div>`}
        />

        <ComponentShowcase
          title="Contadores"
          description="Badges usados como contadores ou indicadores numéricos"
          component={
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2">
                <span className={cn("font-medium", get("text.primary"))}>Notificações</span>
                <span className={cn(errorBadge, "px-2 py-1 text-xs")}>3</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={cn("font-medium", get("text.primary"))}>Mensagens</span>
                <span className={cn(infoBadge, "px-2 py-1 text-xs")}>12</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={cn("font-medium", get("text.primary"))}>Tarefas</span>
                <span className={cn(successBadge, "px-2 py-1 text-xs")}>5</span>
              </div>
            </div>
          }
          code={`<div className="flex items-center gap-2">
  <span className="font-medium">Notificações</span>
  <span className={cn(useBadgeClasses("error", "sm"), "px-2 py-1 text-xs")}>
    3
  </span>
</div>`}
        />
      </ComponentSection>

      {/* Sistema de Tema */}
      <ComponentSection
        title="Sistema de Tema"
        description="Como as badges se adaptam aos temas claro e escuro"
      >
        <ComponentShowcase
          title="Adaptação Automática"
          description="Badges adaptam-se automaticamente ao tema ativo"
          component={
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Modo Atual</h4>
                <div className="flex flex-wrap gap-2">
                  <span className={useBadgeClasses("success", "sm")}>Sucesso</span>
                  <span className={useBadgeClasses("warning", "sm")}>Aviso</span>
                  <span className={useBadgeClasses("error", "sm")}>Erro</span>
                  <span className={useBadgeClasses("info", "sm")}>Info</span>
                  <span className={useBadgeClasses("purple", "sm")}>Purple</span>
                </div>
              </div>
            </div>
          }
          code={`// As badges usam automaticamente as cores corretas para o tema ativo
// Modo claro: fundos claros com texto escuro
// Modo escuro: fundos translúcidos com texto claro

<span className={useBadgeClasses("success", "sm")}>Sucesso</span>
<span className={useBadgeClasses("warning", "sm")}>Aviso</span>
<span className={useBadgeClasses("error", "sm")}>Erro</span>
<span className={useBadgeClasses("info", "sm")}>Info</span>
<span className={useBadgeClasses("purple", "sm")}>Purple</span>`}
        />
      </ComponentSection>
    </div>
  );
};

export default BadgesUIKit;