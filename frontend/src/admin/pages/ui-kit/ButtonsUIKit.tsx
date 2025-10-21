import React from "react";
import { 
  Download, 
  Plus, 
  Settings, 
  Heart, 
  Star, 
  Trash2,
  Edit,
  MoreHorizontal,
  Eye
} from "lucide-react";
import { 
  useThemeClasses, 
  Button, 
  IconButton,
  cn 
} from "../../../design-system";
import { ComponentShowcase, ComponentSection } from "./components/ComponentShowcase";

// ================================
// PÁGINA BOTÕES UI KIT
// ================================

export const ButtonsUIKit: React.FC = () => {
  const { get } = useThemeClasses();

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={cn("text-3xl font-bold mb-2", get("text.primary"))}>
          Botões
        </h1>
        <p className={cn("text-lg", get("text.secondary"))}>
          Componentes de botão para ações e interações do usuário
        </p>
      </div>

      {/* Efeitos Interativos - NOVA SEÇÃO */}
      <ComponentSection
        title="✨ Novos Efeitos Interativos"
        description="Os botões agora possuem efeitos avançados de hover, focus e feedback visual"
      >
        <ComponentShowcase
          title="Demonstração de Efeitos"
          description="Passe o mouse sobre os botões para ver os efeitos de hover, escala e sombras coloridas"
          component={
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="flex flex-col items-center gap-2">
                <Button variant="primary">Efeito de Escala</Button>
                <p className="text-xs text-gray-500">Hover para escala 1.02x</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button variant="danger">Sombra Colorida</Button>
                <p className="text-xs text-gray-500">Sombra vermelha no hover</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button variant="success">Anel de Foco</Button>
                <p className="text-xs text-gray-500">Tab para ver o foco</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button variant="primary-gradient">Gradiente Interativo</Button>
                <p className="text-xs text-gray-500">Cores múltiplas + glow</p>
              </div>
            </div>
          }
          code={`// Botões com efeitos interativos
<Button variant="primary">Efeito de Escala</Button>
<Button variant="danger">Sombra Colorida</Button>
<Button variant="success">Anel de Foco</Button>
<Button variant="primary-gradient">Gradiente Interativo</Button>`}
        />
      </ComponentSection>

      {/* Botões Básicos */}
      <ComponentSection
        title="Botões Básicos"
        description="Variações principais dos botões com diferentes estilos e tamanhos"
      >
        <ComponentShowcase
          title="Botões Normais (Sólidos)"
          description="Botões com cores sólidas que se adaptam aos temas"
          component={
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="info">Info</Button>
              <Button variant="purple">Purple</Button>
              <Button variant="pink">Pink</Button>
              <Button variant="indigo">Indigo</Button>
              <Button variant="orange">Orange</Button>
              <Button variant="teal">Teal</Button>
            </div>
          }
          code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="info">Info</Button>
<Button variant="purple">Purple</Button>
<Button variant="pink">Pink</Button>
<Button variant="indigo">Indigo</Button>
<Button variant="orange">Orange</Button>
<Button variant="teal">Teal</Button>`}
        />

        <ComponentShowcase
          title="Botões Gradientes (Vibrantes)"
          description="Botões com gradientes especiais para destaque"
          component={
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Button variant="primary-gradient">Primary</Button>
              <Button variant="success-gradient">Success</Button>
              <Button variant="warning-gradient">Warning</Button>
              <Button variant="danger-gradient">Danger</Button>
              <Button variant="info-gradient">Info</Button>
              <Button variant="purple-gradient">Purple</Button>
              <Button variant="pink-gradient">Pink</Button>
              <Button variant="indigo-gradient">Indigo</Button>
              <Button variant="orange-gradient">Orange</Button>
              <Button variant="teal-gradient">Teal</Button>
            </div>
          }
          code={`<Button variant="primary-gradient">Primary</Button>
<Button variant="success-gradient">Success</Button>
<Button variant="warning-gradient">Warning</Button>
<Button variant="danger-gradient">Danger</Button>
<Button variant="info-gradient">Info</Button>
<Button variant="purple-gradient">Purple</Button>
<Button variant="pink-gradient">Pink</Button>
<Button variant="indigo-gradient">Indigo</Button>
<Button variant="orange-gradient">Orange</Button>
<Button variant="teal-gradient">Teal</Button>`}
        />

        <ComponentShowcase
          title="Tamanhos"
          description="Diferentes tamanhos para diferentes contextos"
          component={
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="sm">Pequeno</Button>
              <Button variant="primary" size="md">Médio</Button>
              <Button variant="primary" size="lg">Grande</Button>
            </div>
          }
          code={`<Button variant="primary" size="sm">Pequeno</Button>
<Button variant="primary" size="md">Médio</Button>
<Button variant="primary" size="lg">Grande</Button>`}
        />

        <ComponentShowcase
          title="Com Ícones"
          description="Botões com ícones para melhor comunicação visual"
          component={
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
                Adicionar
              </Button>
              <Button variant="secondary" icon={<Download className="w-4 h-4" />}>
                Download
              </Button>
              <Button variant="ghost" icon={<Settings className="w-4 h-4" />}>
                Configurações
              </Button>
            </div>
          }
          code={`<Button variant="primary" icon={<Plus className="w-4 h-4" />}>
  Adicionar
</Button>
<Button variant="secondary" icon={<Download className="w-4 h-4" />}>
  Download
</Button>
<Button variant="ghost" icon={<Settings className="w-4 h-4" />}>
  Configurações
</Button>`}
        />
      </ComponentSection>

      {/* Comparação Normal vs Gradient */}
      <ComponentSection
        title="Comparação: Normal vs Gradient"
        description="Visualize a diferença entre botões normais e gradientes lado a lado"
      >
        <ComponentShowcase
          title="Lado a Lado"
          description="Botões normais (esquerda) vs gradientes (direita) com as mesmas cores"
          component={
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className={cn("text-sm font-medium mb-3", get("text.secondary"))}>
                    Botões Normais (Sólidos)
                  </h4>
                  <div className="space-y-3">
                    <Button variant="primary" fullWidth>Primary Normal</Button>
                    <Button variant="success" fullWidth>Success Normal</Button>
                    <Button variant="purple" fullWidth>Purple Normal</Button>
                    <Button variant="orange" fullWidth>Orange Normal</Button>
                  </div>
                </div>
                <div>
                  <h4 className={cn("text-sm font-medium mb-3", get("text.secondary"))}>
                    Botões Gradientes (Vibrantes)
                  </h4>
                  <div className="space-y-3">
                    <Button variant="primary-gradient" fullWidth>Primary Gradient</Button>
                    <Button variant="success-gradient" fullWidth>Success Gradient</Button>
                    <Button variant="purple-gradient" fullWidth>Purple Gradient</Button>
                    <Button variant="orange-gradient" fullWidth>Orange Gradient</Button>
                  </div>
                </div>
              </div>
            </div>
          }
          code={`{/* Botões Normais */}
<Button variant="primary">Primary Normal</Button>
<Button variant="success">Success Normal</Button>
<Button variant="purple">Purple Normal</Button>

{/* Botões Gradientes */}
<Button variant="primary-gradient">Primary Gradient</Button>
<Button variant="success-gradient">Success Gradient</Button>
<Button variant="purple-gradient">Purple Gradient</Button>`}
        />

        <ComponentShowcase
          title="Com Ícones"
          description="Comparação de botões com ícones em versões normal e gradient"
          component={
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="success" icon={<Plus className="w-4 h-4" />}>
                  Criar (Normal)
                </Button>
                <Button variant="success-gradient" icon={<Plus className="w-4 h-4" />}>
                  Criar (Gradient)
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="danger" icon={<Trash2 className="w-4 h-4" />}>
                  Deletar (Normal)
                </Button>
                <Button variant="danger-gradient" icon={<Trash2 className="w-4 h-4" />}>
                  Deletar (Gradient)
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="purple" icon={<Star className="w-4 h-4" />}>
                  Premium (Normal)
                </Button>
                <Button variant="purple-gradient" icon={<Star className="w-4 h-4" />}>
                  Premium (Gradient)
                </Button>
              </div>
            </div>
          }
          code={`{/* Normal com ícones */}
<Button variant="success" icon={<Plus />}>Criar (Normal)</Button>
<Button variant="danger" icon={<Trash2 />}>Deletar (Normal)</Button>

{/* Gradient com ícones */}
<Button variant="success-gradient" icon={<Plus />}>Criar (Gradient)</Button>
<Button variant="danger-gradient" icon={<Trash2 />}>Deletar (Gradient)</Button>`}
        />

      </ComponentSection>

      {/* Cores por Categoria */}
      <ComponentSection
        title="Cores por Categoria"
        description="Botões organizados por categoria semântica e cores vibrantes"
      >
        <ComponentShowcase
          title="Semânticos"
          description="Cores com significado específico para ações do sistema"
          component={
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="success" icon={<Plus className="w-4 h-4" />}>
                Criar
              </Button>
              <Button variant="warning" icon={<Edit className="w-4 h-4" />}>
                Editar
              </Button>
              <Button variant="danger" icon={<Trash2 className="w-4 h-4" />}>
                Deletar
              </Button>
              <Button variant="info" icon={<Download className="w-4 h-4" />}>
                Info
              </Button>
            </div>
          }
          code={`<Button variant="success" icon={<Plus className="w-4 h-4" />}>Criar</Button>
<Button variant="warning" icon={<Edit className="w-4 h-4" />}>Editar</Button>
<Button variant="danger" icon={<Trash2 className="w-4 h-4" />}>Deletar</Button>
<Button variant="info" icon={<Download className="w-4 h-4" />}>Info</Button>`}
        />

        <ComponentShowcase
          title="Cores Vibrantes"
          description="Cores mais vivas para destacar ações especiais"
          component={
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="purple" icon={<Star className="w-4 h-4" />}>
                Premium
              </Button>
              <Button variant="pink" icon={<Heart className="w-4 h-4" />}>
                Favorito
              </Button>
              <Button variant="indigo" icon={<Settings className="w-4 h-4" />}>
                Avançado
              </Button>
              <Button variant="orange" icon={<Download className="w-4 h-4" />}>
                Download
              </Button>
              <Button variant="teal" icon={<Plus className="w-4 h-4" />}>
                Novo
              </Button>
            </div>
          }
          code={`<Button variant="purple" icon={<Star className="w-4 h-4" />}>Premium</Button>
<Button variant="pink" icon={<Heart className="w-4 h-4" />}>Favorito</Button>
<Button variant="indigo" icon={<Settings className="w-4 h-4" />}>Avançado</Button>
<Button variant="orange" icon={<Download className="w-4 h-4" />}>Download</Button>
<Button variant="teal" icon={<Plus className="w-4 h-4" />}>Novo</Button>`}
        />

        <ComponentShowcase
          title="Tamanhos com Cores"
          description="Demonstração de diferentes tamanhos para cada cor"
          component={
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="success" size="sm">Pequeno</Button>
                <Button variant="success" size="md">Médio</Button>
                <Button variant="success" size="lg">Grande</Button>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="purple" size="sm">Pequeno</Button>
                <Button variant="purple" size="md">Médio</Button>
                <Button variant="purple" size="lg">Grande</Button>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="orange" size="sm">Pequeno</Button>
                <Button variant="orange" size="md">Médio</Button>
                <Button variant="orange" size="lg">Grande</Button>
              </div>
            </div>
          }
          code={`<Button variant="success" size="sm">Pequeno</Button>
<Button variant="success" size="md">Médio</Button>
<Button variant="success" size="lg">Grande</Button>

<Button variant="purple" size="sm">Pequeno</Button>
<Button variant="purple" size="md">Médio</Button>
<Button variant="purple" size="lg">Grande</Button>`}
        />

      </ComponentSection>

      {/* Botões Especiais */}
      <ComponentSection
        title="Icon Buttons Coloridos"
        description="Icon buttons com todas as cores disponíveis"
      >
        <ComponentShowcase
          title="Icon Buttons - Todas as Cores"
          description="Botões de ícone com todas as variantes de cor"
          component={
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
              <IconButton variant="primary" icon={<Heart className="w-4 h-4" />} aria-label="Primary" />
              <IconButton variant="secondary" icon={<Star className="w-4 h-4" />} aria-label="Secondary" />
              <IconButton variant="success" icon={<Plus className="w-4 h-4" />} aria-label="Success" />
              <IconButton variant="warning" icon={<Edit className="w-4 h-4" />} aria-label="Warning" />
              <IconButton variant="danger" icon={<Trash2 className="w-4 h-4" />} aria-label="Danger" />
              <IconButton variant="info" icon={<Download className="w-4 h-4" />} aria-label="Info" />
              <IconButton variant="purple" icon={<Settings className="w-4 h-4" />} aria-label="Purple" />
              <IconButton variant="pink" icon={<Heart className="w-4 h-4" />} aria-label="Pink" />
              <IconButton variant="indigo" icon={<Star className="w-4 h-4" />} aria-label="Indigo" />
              <IconButton variant="orange" icon={<Plus className="w-4 h-4" />} aria-label="Orange" />
              <IconButton variant="teal" icon={<MoreHorizontal className="w-4 h-4" />} aria-label="Teal" />
              <IconButton variant="ghost" icon={<Settings className="w-4 h-4" />} aria-label="Ghost" />
            </div>
          }
          code={`<IconButton variant="primary" icon={<Heart />} aria-label="Primary" />
<IconButton variant="secondary" icon={<Star />} aria-label="Secondary" />
<IconButton variant="success" icon={<Plus />} aria-label="Success" />
<IconButton variant="warning" icon={<Edit />} aria-label="Warning" />
<IconButton variant="danger" icon={<Trash2 />} aria-label="Danger" />
<IconButton variant="info" icon={<Download />} aria-label="Info" />
<IconButton variant="purple" icon={<Settings />} aria-label="Purple" />
<IconButton variant="pink" icon={<Heart />} aria-label="Pink" />
<IconButton variant="indigo" icon={<Star />} aria-label="Indigo" />
<IconButton variant="orange" icon={<Plus />} aria-label="Orange" />
<IconButton variant="teal" icon={<MoreHorizontal />} aria-label="Teal" />
<IconButton variant="ghost" icon={<Settings />} aria-label="Ghost" />`}
        />

      </ComponentSection>

      {/* Estados dos Botões */}
      <ComponentSection
        title="Estados dos Botões"
        description="Diferentes estados visuais dos botões"
      >
        <ComponentShowcase
          title="Estados"
          description="Estados disabled, loading e hover para diferentes cores"
          component={
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Normal</Button>
                <Button variant="primary" disabled>Desabilitado</Button>
                <Button variant="primary" loading>Carregando</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="success">Success</Button>
                <Button variant="success" disabled>Desabilitado</Button>
                <Button variant="success" loading>Carregando</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="purple">Purple</Button>
                <Button variant="purple" disabled>Desabilitado</Button>
                <Button variant="purple" loading>Carregando</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="orange">Orange</Button>
                <Button variant="orange" disabled>Desabilitado</Button>
                <Button variant="orange" loading>Carregando</Button>
              </div>
            </div>
          }
          code={`{/* Estados para qualquer variante */}
<Button variant="primary">Normal</Button>
<Button variant="primary" disabled>Desabilitado</Button>
<Button variant="primary" loading>Carregando</Button>

<Button variant="success">Success</Button>
<Button variant="success" disabled>Desabilitado</Button>
<Button variant="success" loading>Carregando</Button>`}
        />
      </ComponentSection>

      {/* Largura Total */}
      <ComponentSection
        title="Casos de Uso Práticos"
        description="Exemplos de uso das cores em contextos reais"
      >
        <ComponentShowcase
          title="Ações CRUD"
          description="Cores semânticas para operações básicas"
          component={
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="success" icon={<Plus className="w-4 h-4" />}>
                  Criar Novo
                </Button>
                <Button variant="info" icon={<Eye className="w-4 h-4" />}>
                  Visualizar
                </Button>
                <Button variant="warning" icon={<Edit className="w-4 h-4" />}>
                  Editar
                </Button>
                <Button variant="danger" icon={<Trash2 className="w-4 h-4" />}>
                  Excluir
                </Button>
              </div>
            </div>
          }
          code={`<Button variant="success" icon={<Plus />}>Criar Novo</Button>
<Button variant="info" icon={<Eye />}>Visualizar</Button>
<Button variant="warning" icon={<Edit />}>Editar</Button>
<Button variant="danger" icon={<Trash2 />}>Excluir</Button>`}
        />

        <ComponentShowcase
          title="Interface de E-commerce"
          description="Cores específicas para ações de compra e interação"
          component={
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="success" icon={<Plus className="w-4 h-4" />}>
                  Comprar Agora
                </Button>
                <Button variant="orange" icon={<Heart className="w-4 h-4" />}>
                  Adicionar ao Carrinho
                </Button>
                <Button variant="pink" icon={<Heart className="w-4 h-4" />}>
                  Favoritar
                </Button>
                <Button variant="purple" icon={<Star className="w-4 h-4" />}>
                  Premium
                </Button>
              </div>
            </div>
          }
          code={`<Button variant="success">Comprar Agora</Button>
<Button variant="orange">Adicionar ao Carrinho</Button>
<Button variant="pink">Favoritar</Button>
<Button variant="purple">Premium</Button>`}
        />

        <ComponentShowcase
          title="Estados de Sistema"
          description="Cores para diferentes estados e categorias"
          component={
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="teal" icon={<Download className="w-4 h-4" />}>
                  Download
                </Button>
                <Button variant="indigo" icon={<Settings className="w-4 h-4" />}>
                  Configurações
                </Button>
                <Button variant="purple" icon={<Star className="w-4 h-4" />}>
                  Destacado
                </Button>
                <Button variant="pink" icon={<Heart className="w-4 h-4" />}>
                  Especial
                </Button>
              </div>
            </div>
          }
          code={`<Button variant="teal">Download</Button>
<Button variant="indigo">Configurações</Button>
<Button variant="purple">Destacado</Button>
<Button variant="pink">Especial</Button>`}
        />
      </ComponentSection>

      {/* Largura Total */}
      <ComponentSection
        title="Largura Completa"
        description="Botões que ocupam toda a largura disponível"
      >
        <ComponentShowcase
          title="Full Width"
          description="Botões que se estendem por toda a largura do container"
          component={
            <div className="space-y-4">
              <Button variant="primary" fullWidth>
                Botão Primary Largura Completa
              </Button>
              <Button variant="success" fullWidth icon={<Plus className="w-4 h-4" />}>
                Criar Novo Item
              </Button>
              <Button variant="purple" fullWidth icon={<Star className="w-4 h-4" />}>
                Ação Premium
              </Button>
              <Button variant="danger" fullWidth icon={<Trash2 className="w-4 h-4" />}>
                Excluir Permanentemente
              </Button>
              <Button variant="secondary" fullWidth icon={<Settings className="w-4 h-4" />}>
                Configurações Avançadas
              </Button>
            </div>
          }
          code={`<Button variant="primary" fullWidth>
  Botão Primary Largura Completa
</Button>
<Button variant="success" fullWidth icon={<Plus />}>
  Criar Novo Item
</Button>
<Button variant="purple" fullWidth icon={<Star />}>
  Ação Premium
</Button>
<Button variant="danger" fullWidth icon={<Trash2 />}>
  Excluir Permanentemente
</Button>`}
        />
      </ComponentSection>
    </div>
  );
};

export default ButtonsUIKit;