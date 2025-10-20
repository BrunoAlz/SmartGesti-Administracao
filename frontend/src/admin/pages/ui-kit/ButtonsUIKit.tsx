import React from "react";
import { 
  Download, 
  Plus, 
  Settings, 
  Heart, 
  Star, 
  Trash2,
  Edit,
  MoreHorizontal
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

      {/* Botões Básicos */}
      <ComponentSection
        title="Botões Básicos"
        description="Variações principais dos botões com diferentes estilos e tamanhos"
      >
        <ComponentShowcase
          title="Variantes"
          description="Diferentes estilos de botões para hierarquia visual"
          component={
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primário</Button>
              <Button variant="secondary">Secundário</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Perigo</Button>
            </div>
          }
          code={`<Button variant="primary">Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Perigo</Button>`}
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

      {/* Icon Buttons */}
      <ComponentSection
        title="Icon Buttons"
        description="Botões apenas com ícone para ações rápidas"
      >
        <ComponentShowcase
          title="Icon Button"
          description="Botões apenas com ícone para ações rápidas"
          component={
            <div className="flex flex-wrap gap-4">
              <IconButton 
                variant="primary" 
                icon={<Heart className="w-4 h-4" />}
                aria-label="Curtir"
              />
              <IconButton 
                variant="secondary" 
                icon={<Star className="w-4 h-4" />}
                aria-label="Favoritar"
              />
              <IconButton 
                variant="ghost" 
                icon={<MoreHorizontal className="w-4 h-4" />}
                aria-label="Mais opções"
              />
              <IconButton 
                variant="danger" 
                icon={<Trash2 className="w-4 h-4" />}
                aria-label="Deletar"
              />
            </div>
          }
          code={`<IconButton 
  variant="primary" 
  icon={<Heart className="w-4 h-4" />}
  aria-label="Curtir"
/>
<IconButton 
  variant="secondary" 
  icon={<Star className="w-4 h-4" />}
  aria-label="Favoritar"
/>
<IconButton 
  variant="ghost" 
  icon={<MoreHorizontal className="w-4 h-4" />}
  aria-label="Mais opções"
/>
<IconButton 
  variant="danger" 
  icon={<Trash2 className="w-4 h-4" />}
  aria-label="Deletar"
/>`}
        />
      </ComponentSection>

      {/* Estados dos Botões */}
      <ComponentSection
        title="Estados dos Botões"
        description="Diferentes estados visuais dos botões"
      >
        <ComponentShowcase
          title="Estados"
          description="Estados disabled, loading e hover"
          component={
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Normal</Button>
              <Button variant="primary" disabled>Desabilitado</Button>
              <Button variant="primary" loading>Carregando</Button>
              <Button variant="secondary">Hover me</Button>
            </div>
          }
          code={`<Button variant="primary">Normal</Button>
<Button variant="primary" disabled>Desabilitado</Button>
<Button variant="primary" loading>Carregando</Button>
<Button variant="secondary">Hover me</Button>`}
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
                Botão Largura Completa
              </Button>
              <Button variant="secondary" fullWidth icon={<Plus className="w-4 h-4" />}>
                Com Ícone
              </Button>
            </div>
          }
          code={`<Button variant="primary" fullWidth>
  Botão Largura Completa
</Button>
<Button variant="secondary" fullWidth icon={<Plus className="w-4 h-4" />}>
  Com Ícone
</Button>`}
        />
      </ComponentSection>
    </div>
  );
};

export default ButtonsUIKit;