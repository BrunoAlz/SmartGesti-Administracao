import React from "react";
import { Info, CheckCircle, AlertTriangle, HelpCircle } from "lucide-react";
import { Tooltip, Button, useThemeClasses, cn } from "../../../design-system";
import { ComponentShowcase, ComponentSection } from "./components/ComponentShowcase";

const TooltipUIKit: React.FC = () => {
  const { get } = useThemeClasses();

  const tooltipCode = `import { Tooltip, Button } from '@/design-system';

<Tooltip content="Texto do tooltip">
  <Button variant="primary">Passe o mouse</Button>
</Tooltip>`;

  return (
    <div className="p-6 space-y-8">
      <div className="mb-8">
        <h1 className={cn("text-3xl font-bold mb-2", get("text.primary"))}>
          Tooltips
        </h1>
        <p className={cn("text-lg", get("text.secondary"))}>
          Exemplos avançados de tooltips: posições, cores, conteúdos ricos e tooltips com ações/fixos.
        </p>
      </div>

      {/* Card 1: Posições */}
      <ComponentShowcase
        title="Posições"
        description="Demonstra todas as posições suportadas pelo Tooltip"
        code={`// Exemplos: position=\"top|right|left|bottom\"`}
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

      {/* Card 2: Todas as cores sólidas e gradientes */}
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

      {/* Card 3: Gradientes */}
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

      {/* Card 3: Tooltip elaborado com header, ícones e texto */}
      <ComponentShowcase
        title="Conteúdo Rico"
        description="Tooltips com header, ícones e múltiplas linhas de texto"
        code={`// Exemplo de conteúdo JSX no prop content`}
        component={
          <div className="max-w-md">
            <Tooltip
              position="top"
              content={
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-400" />
                    <div className="font-semibold">Informação importante</div>
                  </div>
                  <div className="text-sm text-gray-100">Este tooltip contém um cabeçalho, ícone e texto detalhado para explicar funcionalidades.</div>
                </div>
              }
            >
              <Button variant="ghost">Mostrar Tooltip Elaborado</Button>
            </Tooltip>
          </div>
        }
      />

      {/* Card 4: Tooltips com ações e fixos (trigger click) */}
      <ComponentShowcase
        title="Ações e Tooltips Fixos"
        description={`Tooltips que contêm ações (botões) e tooltips persistentes via trigger="click"`}
        code={`// Use prop trigger="click" para tooltips fixos`}
        component={
          <div className="space-y-4 max-w-md">
            <Tooltip
              trigger="click"
              position="bottom"
              content={
                <div className="space-y-2 p-2">
                  <div className="font-semibold">Ação disponível</div>
                  <div className="flex gap-2">
                    <Button variant="primary" size="sm">Confirmar</Button>
                    <Button variant="ghost" size="sm">Cancelar</Button>
                  </div>
                </div>
              }
            >
              <Button variant="primary">Abrir Tooltip de Ação</Button>
            </Tooltip>

            <Tooltip
              trigger="click"
              position="right"
              content={<div className="p-2">Tooltip fixo: clique fora para fechar</div>}
            >
              <Button variant="secondary">Tooltip Fixo</Button>
            </Tooltip>
          </div>
        }
      />
    </div>
  );
};

export default TooltipUIKit;
