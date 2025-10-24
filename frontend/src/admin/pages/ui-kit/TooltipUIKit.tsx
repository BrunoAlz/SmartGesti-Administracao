import React from "react";
import { 
  Tooltip, 
  Button, 
  useThemeClasses,
  Badge 
} from "../../../design-system";
import { ComponentShowcase, ComponentSection } from "./components/ComponentShowcase";
import { 
  Settings, 
  User, 
  Bell, 
  ChevronRight, 
  Star,
  Heart,
  Clock,
  CheckCircle2,
  AlertCircle,
  AlertTriangle
} from "lucide-react";

// ================================
// PÁGINA TOOLTIPS UI KIT
// ================================

export const TooltipUIKit: React.FC = () => {
  const { get, cn } = useThemeClasses();

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center">
        <h1 className={cn("text-3xl font-bold mb-4", get("text.primary"))}>
          Sistema de Tooltips
        </h1>
        <p className={cn("text-lg", get("text.secondary"))}>
          Exemplos de tooltips: posições, variantes de cor e conteúdo elaborado.
        </p>
      </div>

      {/* Card 1: Posições */}
      <ComponentShowcase
        title="Posições"
        description="Demonstra todas as posições suportadas pelo Tooltip"
        code={`// Exemplos: position="top|right|left|bottom"`}
        component={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4">
              <Tooltip content="Topo (top)" position="top">
                <Button variant="secondary">Topo</Button>
              </Tooltip>
            </div>
            <div className="p-4">
              <Tooltip content="Direita (right)" position="right">
                <Button variant="secondary">Direita</Button>
              </Tooltip>
            </div>
            <div className="p-4">
              <Tooltip content="Esquerda (left)" position="left">
                <Button variant="secondary">Esquerda</Button>
              </Tooltip>
            </div>
            <div className="p-4">
              <Tooltip content="Base (bottom)" position="bottom">
                <Button variant="secondary">Base</Button>
              </Tooltip>
            </div>
          </div>
        }
      />

      {/* Card 2: Tooltips Básicos */}
      <ComponentShowcase
        title="Tooltips Básicos" 
        description="Exemplos de tooltips simples com diferentes variantes"
        code={`// Tooltips básicos
<Tooltip content="Padrão" variant="default">Default</Tooltip>
<Tooltip content="Primário" variant="primary">Primary</Tooltip>
<Tooltip content="Secundário" variant="secondary">Secondary</Tooltip>`}
        component={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Tooltip content="Tooltip padrão com tema" variant="secondary">
              <Button variant="secondary">Default</Button>
            </Tooltip>
            <Tooltip content="Tooltip primário" variant="primary">
              <Button variant="primary">Primary</Button>
            </Tooltip>
            <Tooltip content="Tooltip secundário" variant="secondary">
              <Button variant="secondary">Secondary</Button>
            </Tooltip>
          </div>
        }
      />

      {/* Card 3: Todas as cores sólidas */}
      <ComponentShowcase
        title="Cores Sólidas"
        description="Todas as variantes de cores sólidas do design system"
        code={`// Cores sólidas disponíveis
<Tooltip content="..." variant="primary">Primary</Tooltip>
<Tooltip content="..." variant="secondary">Secondary</Tooltip>
<Tooltip content="..." variant="ghost">Ghost</Tooltip>`}
        component={
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Variantes principais */}
            <Tooltip content="Primary" variant="primary">
              <Button variant="primary">Primary</Button>
            </Tooltip>
            <Tooltip content="Secondary" variant="secondary">
              <Button variant="secondary">Secondary</Button>
            </Tooltip>
            <Tooltip content="Ghost" variant="ghost">
              <Button variant="ghost">Ghost</Button>
            </Tooltip>
            
            {/* Status colors */}
            <Tooltip content="Success" variant="success">
              <Button variant="success">Success</Button>
            </Tooltip>
            <Tooltip content="Warning" variant="warning">
              <Button variant="warning">Warning</Button>
            </Tooltip>
            <Tooltip content="Danger" variant="danger">
              <Button variant="danger">Danger</Button>
            </Tooltip>
            <Tooltip content="Info" variant="info">
              <Button variant="info">Info</Button>
            </Tooltip>

            {/* Cores temáticas */}
            <Tooltip content="Purple" variant="purple">
              <Button variant="purple">Purple</Button>
            </Tooltip>
            <Tooltip content="Pink" variant="pink">
              <Button variant="pink">Pink</Button>
            </Tooltip>
            <Tooltip content="Indigo" variant="indigo">
              <Button variant="indigo">Indigo</Button>
            </Tooltip>
            <Tooltip content="Orange" variant="orange">
              <Button variant="orange">Orange</Button>
            </Tooltip>
            <Tooltip content="Teal" variant="teal">
              <Button variant="teal">Teal</Button>
            </Tooltip>
          </div>
        }
      />

      {/* Card 4: Gradientes */}
      <ComponentShowcase
        title="Gradientes"
        description="Todas as variantes de gradientes disponíveis"
        code={`// Gradientes disponíveis
<Tooltip content="..." variant="primary-gradient">Primary</Tooltip>
<Tooltip content="..." variant="success-gradient">Success</Tooltip>
<Tooltip content="..." variant="warning-gradient">Warning</Tooltip>`}
        component={
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Gradientes de Status */}
            <Tooltip content="Primary Gradient" variant="primary-gradient">
              <Button variant="primary-gradient">Primary</Button>
            </Tooltip>
            <Tooltip content="Success Gradient" variant="success-gradient">
              <Button variant="success-gradient">Success</Button>
            </Tooltip>
            <Tooltip content="Warning Gradient" variant="warning-gradient">
              <Button variant="warning-gradient">Warning</Button>
            </Tooltip>
            <Tooltip content="Danger Gradient" variant="danger-gradient">
              <Button variant="danger-gradient">Danger</Button>
            </Tooltip>
            <Tooltip content="Info Gradient" variant="info-gradient">
              <Button variant="info-gradient">Info</Button>
            </Tooltip>

            {/* Gradientes Temáticos */}
            <Tooltip content="Purple Gradient" variant="purple-gradient">
              <Button variant="purple-gradient">Purple</Button>
            </Tooltip>
            <Tooltip content="Pink Gradient" variant="pink-gradient">
              <Button variant="pink-gradient">Pink</Button>
            </Tooltip>
            <Tooltip content="Indigo Gradient" variant="indigo-gradient">
              <Button variant="indigo-gradient">Indigo</Button>
            </Tooltip>
            <Tooltip content="Orange Gradient" variant="orange-gradient">
              <Button variant="orange-gradient">Orange</Button>
            </Tooltip>
            <Tooltip content="Teal Gradient" variant="teal-gradient">
              <Button variant="teal-gradient">Teal</Button>
            </Tooltip>
          </div>
        }
      />

      {/* Card 5: Tooltips Elaborados */}
      <ComponentShowcase
        title="Tooltips Elaborados"
        description="Exemplos de tooltips com conteúdo rico e formatado incluindo ícones, headers, botões e indicadores"
        code={`// Tooltips com conteúdo rico
<Tooltip 
  content={
    <div className="p-3 space-y-2">
      <div className="flex items-center space-x-2">
        <Settings size={18} />
        <span className="font-semibold">Configurações</span>
      </div>
      <div className="space-y-1">
        <p className="text-sm">Detalhes e controles</p>
        <div className="flex space-x-2">
          <Button size="sm">Editar</Button>
          <Button size="sm" variant="secondary">Cancelar</Button>
        </div>
      </div>
    </div>
  } 
  variant="primary"
>
  <Button>Hover me</Button>
</Tooltip>`}
        component={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tooltip com Header e Botões */}
            <Tooltip
              content={
                <div className="p-3 min-w-[240px]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <User size={18} className={get("text.primary")} />
                      <span className={cn("font-semibold", get("text.primary"))}>
                        Perfil do Usuário
                      </span>
                    </div>
                    <Badge variant="success" size="sm">Online</Badge>
                  </div>
                  <div className={cn("text-sm mb-3", get("text.secondary"))}>
                    <p>Gerenciar suas preferências e configurações de conta.</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm">Editar Perfil</Button>
                    <Button size="sm" variant="secondary">Configurações</Button>
                  </div>
                </div>
              }
              variant="primary"
            >
              <Button variant="primary">Com Header e Botões</Button>
            </Tooltip>

            {/* Tooltip com Notificação e Progress */}
            <Tooltip
              content={
                <div className="p-3 min-w-[280px]">
                  <div className="flex items-center space-x-2 mb-2">
                    <Bell size={18} className={cn("text-yellow-500")} />
                    <span className={cn("font-semibold", get("text.primary"))}>Nova Atualização</span>
                  </div>
                  <p className={cn("text-sm mb-3", get("text.secondary"))}>
                    Atualizando sistema para versão 2.0.0
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={get("text.secondary")}>Progresso</span>
                      <span className={get("text.primary")}>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-yellow-500 h-full rounded-full" 
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-yellow-500">
                      <Clock size={14} />
                      <span>Estimativa: 5 minutos restantes</span>
                    </div>
                  </div>
                </div>
              }
              variant="warning"
            >
              <Button variant="warning">Com Progress</Button>
            </Tooltip>

            {/* Tooltip com Status e Ações */}
            <Tooltip
              content={
                <div className="p-3 min-w-[260px]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Star size={18} className="text-yellow-500" />
                      <span className={cn("font-semibold", get("text.primary"))}>
                        Status do Projeto
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 size={16} className="text-green-500" />
                      <span className={cn("text-sm", get("text.secondary"))}>Frontend: Completo</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle size={16} className="text-yellow-500" />
                      <span className={cn("text-sm", get("text.secondary"))}>Backend: Em progresso</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle size={16} className="text-red-500" />
                      <span className={cn("text-sm", get("text.secondary"))}>Testes: Pendente</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Heart size={14} className="text-red-500" />
                      <span className={cn("text-xs", get("text.secondary"))}>8 contribuidores</span>
                    </div>
                    <Button size="sm" variant="ghost" className="text-xs">
                      Ver Detalhes <ChevronRight size={14} />
                    </Button>
                  </div>
                </div>
              }
              variant="secondary"
            >
              <Button variant="secondary">Status Detalhado</Button>
            </Tooltip>
          </div>
        }
      />
    </div>
  );
}