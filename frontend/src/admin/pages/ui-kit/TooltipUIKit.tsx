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
        title="Cores"
        description="Mostra cores sólidas e gradientes disponíveis"
        code={`// Use variant="info|success|danger|warning" ou estilos com gradientes`}
        component={
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Tooltip content="Info" variant="info"><Button variant="info">Info</Button></Tooltip>
            <Tooltip content="Success" variant="success"><Button variant="success">Success</Button></Tooltip>
            <Tooltip content="Warning" variant="warning"><Button variant="warning">Warning</Button></Tooltip>
            <Tooltip content="Danger" variant="danger"><Button variant="danger">Danger</Button></Tooltip>

            {/* Gradientes - usando classes utilitárias do design system */}
            <Tooltip content="Primary Gradient"><Button className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white">Primary Gradient</Button></Tooltip>
            <Tooltip content="Purple Gradient"><Button className="bg-gradient-to-r from-purple-500 to-indigo-700 text-white">Purple Gradient</Button></Tooltip>
            <Tooltip content="Teal Gradient"><Button className="bg-gradient-to-r from-teal-400 to-green-500 text-white">Teal Gradient</Button></Tooltip>
            <Tooltip content="Orange Gradient"><Button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">Orange Gradient</Button></Tooltip>
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
        description="Tooltips que contêm ações (botões) e tooltips persistentes via trigger=\"click\""
        code={`// Use prop trigger=\"click\" para tooltips fixos`}
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
