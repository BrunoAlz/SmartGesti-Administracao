import React, { useState } from 'react';
import { ComponentShowcase, ComponentSection } from './components/ComponentShowcase';
import { Divider, Button, Card } from '@/design-system';
import { useThemeClasses } from '@/design-system';

export function DividersUIKit() {
  const { cn } = useThemeClasses();
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sistema de Divisores</h1>
        <p className="text-lg">
          Divisores para separar conteúdos com suporte completo para temas claro/escuro
        </p>
      </div>
      
      {/* Variantes de Divisores */}
      <ComponentSection
        title="Variantes de Divisores"
        description="Diferentes estilos visuais para os divisores"
      >
        <ComponentShowcase
          title="Divisor Sólido"
          description="Estilo padrão com linha contínua"
          component={<Divider />}
          code={`<Divider />`}
        />
        
        <ComponentShowcase
          title="Divisor Pontilhado"
          description="Estilo pontilhado para divisão leve"
          component={<Divider variant="dotted" />}
          code={`<Divider variant="dotted" />`}
        />
        
        <ComponentShowcase
          title="Divisor Tracejado"
          description="Estilo tracejado para divisão visual"
          component={<Divider variant="dashed" />}
          code={`<Divider variant="dashed" />`}
        />
      </ComponentSection>
      
      {/* Espaçamento */}
      <ComponentSection
        title="Opções de Espaçamento"
        description="Controle o espaçamento vertical ou horizontal ao redor do divisor"
      >
        <ComponentShowcase
          title="Espaçamento Personalizado"
          description="Diferentes tamanhos de espaçamento disponíveis"
          component={
            <div className="space-y-6">
              <div>
                <p className="text-sm mb-1">Sem espaçamento (none)</p>
                <Divider spacing="none" />
              </div>
              <div>
                <p className="text-sm mb-1">Espaçamento XS</p>
                <Divider spacing="xs" />
              </div>
              <div>
                <p className="text-sm mb-1">Espaçamento SM</p>
                <Divider spacing="sm" />
              </div>
              <div>
                <p className="text-sm mb-1">Espaçamento MD (padrão)</p>
                <Divider spacing="md" />
              </div>
              <div>
                <p className="text-sm mb-1">Espaçamento LG</p>
                <Divider spacing="lg" />
              </div>
              <div>
                <p className="text-sm mb-1">Espaçamento XL</p>
                <Divider spacing="xl" />
              </div>
            </div>
          }
          code={`// Opções de espaçamento
<Divider spacing="none" />
<Divider spacing="xs" />
<Divider spacing="sm" />
<Divider spacing="md" /> {/* padrão */}
<Divider spacing="lg" />
<Divider spacing="xl" />`}
        />
      </ComponentSection>
      
      {/* Orientação */}
      <ComponentSection
        title="Orientação"
        description="Os divisores podem ser horizontais ou verticais"
      >
        <ComponentShowcase
          title="Orientação do Divisor"
          description="Alterne entre orientação horizontal e vertical"
          component={
            <div>
              <div className="flex space-x-4 mb-6">
                <Button 
                  variant={orientation === 'horizontal' ? 'primary' : 'secondary'}
                  onClick={() => setOrientation('horizontal')}
                >
                  Horizontal
                </Button>
                <Button 
                  variant={orientation === 'vertical' ? 'primary' : 'secondary'}
                  onClick={() => setOrientation('vertical')}
                >
                  Vertical
                </Button>
              </div>
              
              {orientation === 'horizontal' ? (
                <div className="p-4 border rounded-lg">
                  <p className="mb-4">Conteúdo acima do divisor</p>
                  <Divider />
                  <p className="mt-4">Conteúdo abaixo do divisor</p>
                </div>
              ) : (
                <div className="flex h-40 border rounded-lg">
                  <div className="p-4 flex items-center">Conteúdo à esquerda</div>
                  <Divider orientation="vertical" />
                  <div className="p-4 flex items-center">Conteúdo à direita</div>
                </div>
              )}
            </div>
          }
          code={`// Orientação horizontal (padrão)
<Divider />

// Orientação vertical
<Divider orientation="vertical" />`}
        />
      </ComponentSection>
      
      {/* Uso em Contexto */}
      <ComponentSection
        title="Uso em Contexto"
        description="Exemplos de como usar divisores em interfaces reais"
      >
        <ComponentShowcase
          title="Lista com Divisores"
          description="Uso de divisores em listas de dados"
          component={
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h4 className="text-lg font-semibold mb-2">Seção de Dashboard</h4>
              <p className="text-sm mb-4">Este exemplo mostra o divisor em um contexto realista</p>
              
              <Divider />
              
              <div className="mt-4">
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Item 1</span>
                    <span>Detalhes</span>
                  </li>
                  <Divider variant="dotted" spacing="xs" />
                  <li className="flex justify-between">
                    <span>Item 2</span>
                    <span>Detalhes</span>
                  </li>
                  <Divider variant="dotted" spacing="xs" />
                  <li className="flex justify-between">
                    <span>Item 3</span>
                    <span>Detalhes</span>
                  </li>
                </ul>
              </div>
            </div>
          }
          code={`<div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
  <h4 className="text-lg font-semibold mb-2">Seção de Dashboard</h4>
  <p className="text-sm mb-4">Este exemplo mostra o divisor em um contexto realista</p>
  
  <Divider />
  
  <div className="mt-4">
    <ul className="space-y-3">
      <li className="flex justify-between">
        <span>Item 1</span>
        <span>Detalhes</span>
      </li>
      <Divider variant="dotted" spacing="xs" />
      <li className="flex justify-between">
        <span>Item 2</span>
        <span>Detalhes</span>
      </li>
      <Divider variant="dotted" spacing="xs" />
      <li className="flex justify-between">
        <span>Item 3</span>
        <span>Detalhes</span>
      </li>
    </ul>
  </div>
</div>`}
        />
      </ComponentSection>
      
      {/* API Completa */}
      <ComponentSection
        title="API Completa"
        description="Referência completa de props do componente Divider"
      >
        <ComponentShowcase
          title="API do Componente"
          description="Todas as propriedades disponíveis"
          component={
            <pre className={cn("bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm")}>
{`interface DividerProps {
  // Orientação do divisor
  orientation?: 'horizontal' | 'vertical';
  
  // Estilo visual do divisor
  variant?: 'solid' | 'dotted' | 'dashed';
  
  // Espaçamento ao redor do divisor
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  
  // Classes CSS adicionais
  className?: string;
}`}
            </pre>
          }
          code={`import { Divider } from '@/design-system';

// Exemplo com todas as props
<Divider 
  orientation="horizontal" 
  variant="solid" 
  spacing="md"
  className="my-custom-class"
/>`}
        />
      </ComponentSection>
    </div>
  );
}

export default DividersUIKit;