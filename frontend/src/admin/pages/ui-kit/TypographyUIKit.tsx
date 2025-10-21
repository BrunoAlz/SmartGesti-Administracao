import React from "react";
import { 
  Typography, 
  useThemeClasses,
  cn,
} from "../../../design-system";
import { ComponentShowcase, ComponentSection } from "./components/ComponentShowcase";

// ================================
// PÁGINA TIPOGRAFIA UI KIT
// ================================

const TypographyUIKit: React.FC = () => {
  const { get } = useThemeClasses();

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={cn("text-3xl font-bold mb-2", get("text.primary"))}>
          Tipografia
        </h1>
        <p className={cn("text-lg", get("text.secondary"))}>
          Sistema tipográfico com hierarquia visual, estilos e cores
        </p>
      </div>

      {/* Hierarquia de Tipografia */}
      <ComponentSection
        title="Hierarquia de Tipografia"
        description="A hierarquia tipográfica estabelece a importância relativa dos elementos textuais"
      >
        <ComponentShowcase
          title="Hierarquia Visual"
          description="Diferentes níveis de cabeçalhos e estilos de texto para organizar o conteúdo"
          component={
            <div className="space-y-5 p-4">
              <Typography variant="h1">Título H1</Typography>
              <Typography variant="h2">Título H2</Typography>
              <Typography variant="h3">Título H3</Typography>
              <Typography variant="h4">Título H4</Typography>
              <Typography variant="h5">Título H5</Typography>
              <Typography variant="h6">Título H6</Typography>
              <Typography variant="subtitle1">Subtítulo 1 - Para introduções de seção</Typography>
              <Typography variant="subtitle2">Subtítulo 2 - Para cabeçalhos de card</Typography>
              <Typography variant="body">Texto Body - Parágrafo padrão com tamanho adequado para leitura</Typography>
              <Typography variant="body2">Texto Body 2 - Texto secundário com tamanho reduzido para informações adicionais</Typography>
              <Typography variant="caption">Caption - Texto pequeno para legendas e informações auxiliares</Typography>
              <Typography variant="overline">OVERLINE - TEXTO EM CAIXA ALTA E ESPAÇADO</Typography>
              <Typography variant="code">const code = "Estilo para código e snippets";</Typography>
            </div>
          }
          code={`// Hierarquia de Tipografia
<Typography variant="h1">Título H1</Typography>
<Typography variant="h2">Título H2</Typography>
<Typography variant="h3">Título H3</Typography>
<Typography variant="h4">Título H4</Typography>
<Typography variant="h5">Título H5</Typography>
<Typography variant="h6">Título H6</Typography>
<Typography variant="subtitle1">Subtítulo 1 - Para introduções de seção</Typography>
<Typography variant="subtitle2">Subtítulo 2 - Para cabeçalhos de card</Typography>
<Typography variant="body">Texto Body - Parágrafo padrão</Typography>
<Typography variant="body2">Texto Body 2 - Texto secundário</Typography>
<Typography variant="caption">Caption - Texto pequeno para legendas</Typography>
<Typography variant="overline">OVERLINE - TEXTO EM CAIXA ALTA E ESPAÇADO</Typography>
<Typography variant="code">const code = "Estilo para código";</Typography>`}
        />
      </ComponentSection>

      {/* Cores de Texto */}
      <ComponentSection
        title="Cores de Texto"
        description="Variações de cores para diferentes contextos e estados"
      >
        <ComponentShowcase
          title="Variações de Cor"
          description="As cores de texto ajudam a estabelecer hierarquia e propósito"
          component={
            <div className="space-y-4 p-4">
              <Typography variant="h4" color="primary">Texto Primário</Typography>
              <Typography variant="h4" color="secondary">Texto Secundário</Typography>
              <Typography variant="h4" color="muted">Texto Terciário/Muted</Typography>
              <Typography variant="h4" color="accent">Texto de Destaque</Typography>
              <Typography variant="h4" color="success">Texto de Sucesso</Typography>
              <Typography variant="h4" color="warning">Texto de Aviso</Typography>
              <Typography variant="h4" color="error">Texto de Erro</Typography>
              <div className="bg-slate-800 p-4 rounded-lg">
                <Typography variant="h4" color="white">Texto Branco (em fundo escuro)</Typography>
              </div>
            </div>
          }
          code={`// Cores de Texto
<Typography variant="h4" color="primary">Texto Primário</Typography>
<Typography variant="h4" color="secondary">Texto Secundário</Typography>
<Typography variant="h4" color="muted">Texto Terciário/Muted</Typography>
<Typography variant="h4" color="accent">Texto de Destaque</Typography>
<Typography variant="h4" color="success">Texto de Sucesso</Typography>
<Typography variant="h4" color="warning">Texto de Aviso</Typography>
<Typography variant="h4" color="error">Texto de Erro</Typography>

// Em fundos escuros
<div className="bg-slate-800 p-4 rounded-lg">
  <Typography variant="h4" color="white">Texto Branco</Typography>
</div>`}
        />
      </ComponentSection>

      {/* Peso da Fonte */}
      <ComponentSection
        title="Peso da Fonte"
        description="Diferentes pesos para ênfase e contraste visual"
      >
        <ComponentShowcase
          title="Variações de Peso"
          description="O peso da fonte cria contraste e ênfase"
          component={
            <div className="space-y-3 p-4">
              <Typography weight="thin">Thin (100) - Texto muito fino</Typography>
              <Typography weight="extralight">ExtraLight (200) - Texto extra-leve</Typography>
              <Typography weight="light">Light (300) - Texto leve</Typography>
              <Typography weight="normal">Regular (400) - Peso padrão para corpo de texto</Typography>
              <Typography weight="medium">Medium (500) - Peso médio para ênfase leve</Typography>
              <Typography weight="semibold">SemiBold (600) - Peso semi-negrito para ênfase média</Typography>
              <Typography weight="bold">Bold (700) - Negrito para ênfase forte</Typography>
              <Typography weight="extrabold">ExtraBold (800) - Peso extra-negrito</Typography>
              <Typography weight="black">Black (900) - Peso máximo para máximo contraste</Typography>
            </div>
          }
          code={`// Pesos de Fonte
<Typography weight="thin">Thin (100)</Typography>
<Typography weight="extralight">ExtraLight (200)</Typography>
<Typography weight="light">Light (300)</Typography>
<Typography weight="normal">Regular (400)</Typography>
<Typography weight="medium">Medium (500)</Typography>
<Typography weight="semibold">SemiBold (600)</Typography>
<Typography weight="bold">Bold (700)</Typography>
<Typography weight="extrabold">ExtraBold (800)</Typography>
<Typography weight="black">Black (900)</Typography>`}
        />
      </ComponentSection>

      {/* Alinhamento e Transformação */}
      <ComponentSection
        title="Alinhamento e Transformação"
        description="Controle de alinhamento, transformação e decoração de texto"
      >
        <ComponentShowcase
          title="Alinhamento de Texto"
          description="Diferentes alinhamentos para diversos contextos"
          component={
            <div className="space-y-5 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
              <Typography align="left" className="bg-slate-100 dark:bg-slate-800 p-2 rounded">
                Texto alinhado à esquerda (padrão) - Melhor para leitura em idiomas ocidentais
              </Typography>
              <Typography align="center" className="bg-slate-100 dark:bg-slate-800 p-2 rounded">
                Texto centralizado - Ideal para títulos e elementos destacados
              </Typography>
              <Typography align="right" className="bg-slate-100 dark:bg-slate-800 p-2 rounded">
                Texto alinhado à direita - Útil para elementos especiais ou idiomas RTL
              </Typography>
              <Typography align="justify" className="bg-slate-100 dark:bg-slate-800 p-2 rounded">
                Texto justificado - Expande o texto para preencher o espaço disponível, criando margens uniformes
                nos dois lados. Útil para colunas de texto em layout formal.
              </Typography>
            </div>
          }
          code={`// Alinhamento de Texto
<Typography align="left">Texto alinhado à esquerda (padrão)</Typography>
<Typography align="center">Texto centralizado</Typography>
<Typography align="right">Texto alinhado à direita</Typography>
<Typography align="justify">Texto justificado</Typography>`}
        />
        
        <ComponentShowcase
          title="Transformação e Decoração"
          description="Transformações e decorações para usos específicos"
          component={
            <div className="space-y-5 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                  <Typography variant="h5">Transformações</Typography>
                  <Typography transform="uppercase">Texto em maiúsculas</Typography>
                  <Typography transform="lowercase">TEXTO EM MINÚSCULAS</Typography>
                  <Typography transform="capitalize">texto com iniciais maiúsculas</Typography>
                  <Typography transform="normal-case">Texto Normal (Sem Transformação)</Typography>
                </div>
                
                <div className="space-y-3 bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                  <Typography variant="h5">Decorações</Typography>
                  <Typography decoration="underline">Texto Sublinhado</Typography>
                  <Typography decoration="line-through">Texto Riscado</Typography>
                  <Typography decoration="no-underline">Texto Sem Decoração</Typography>
                  <Typography decoration="underline" color="accent">Link Sublinhado</Typography>
                </div>
              </div>
            </div>
          }
          code={`// Transformações de Texto
<Typography transform="uppercase">Texto em maiúsculas</Typography>
<Typography transform="lowercase">TEXTO EM MINÚSCULAS</Typography>
<Typography transform="capitalize">texto com iniciais maiúsculas</Typography>
<Typography transform="normal-case">Texto Normal</Typography>

// Decorações de Texto
<Typography decoration="underline">Texto Sublinhado</Typography>
<Typography decoration="line-through">Texto Riscado</Typography>
<Typography decoration="no-underline">Texto Sem Decoração</Typography>
<Typography decoration="underline" color="accent">Link Sublinhado</Typography>`}
        />
      </ComponentSection>

      {/* Exemplos Reais */}
      <ComponentSection
        title="Exemplos de Aplicação"
        description="Casos de uso comuns para o sistema tipográfico"
      >
        <ComponentShowcase
          title="Artigo / Blog"
          description="Exemplo de artigo com hierarquia tipográfica completa"
          component={
            <div className="space-y-5 p-6 border border-slate-200 dark:border-slate-700 rounded-lg max-w-2xl mx-auto">
              <Typography variant="overline" color="accent">DESIGN SYSTEM</Typography>
              <Typography variant="h2">Tipografia no Design de Interface</Typography>
              <Typography variant="subtitle1" color="secondary" className="mb-6">
                Como uma tipografia bem planejada melhora a experiência do usuário
              </Typography>
              
              <Typography variant="body" className="mb-4">
                A tipografia é um dos elementos mais fundamentais em qualquer design system. 
                Ela não apenas comunica informações, mas também estabelece a personalidade da marca,
                guia os usuários pela interface e cria hierarquia visual.
              </Typography>
              
              <Typography variant="h4" className="mt-8 mb-3">Hierarquia e Legibilidade</Typography>
              <Typography variant="body">
                Uma hierarquia tipográfica clara ajuda os usuários a escanear o conteúdo rapidamente
                e entender a importância relativa de cada elemento. A legibilidade é crucial
                para garantir que o texto seja facilmente compreensível em diferentes tamanhos
                de tela e condições de iluminação.
              </Typography>
              
              <Typography variant="body2" color="muted" className="mt-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
                Nota: Consistência na aplicação de estilos tipográficos é essencial para uma
                experiência de usuário coesa. Use variantes predefinidas sempre que possível.
              </Typography>
              
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <Typography variant="caption" color="muted">
                  Publicado em 21 de outubro de 2025 • 5 min de leitura
                </Typography>
              </div>
            </div>
          }
          code={`// Exemplo de Artigo com Tipografia
<Typography variant="overline" color="accent">DESIGN SYSTEM</Typography>
<Typography variant="h2">Tipografia no Design de Interface</Typography>
<Typography variant="subtitle1" color="secondary">
  Como uma tipografia bem planejada melhora a experiência do usuário
</Typography>

<Typography variant="body">
  A tipografia é um dos elementos mais fundamentais em qualquer design system. 
  Ela não apenas comunica informações, mas também estabelece a personalidade...
</Typography>

<Typography variant="h4">Hierarquia e Legibilidade</Typography>
<Typography variant="body">
  Uma hierarquia tipográfica clara ajuda os usuários a escanear o conteúdo...
</Typography>

<Typography variant="body2" color="muted">
  Nota: Consistência na aplicação de estilos tipográficos...
</Typography>

<div className="border-t border-slate-200 dark:border-slate-700">
  <Typography variant="caption" color="muted">
    Publicado em 21 de outubro de 2025 • 5 min de leitura
  </Typography>
</div>`}
        />
        
        <ComponentShowcase
          title="Card Informativo"
          description="Aplicação da tipografia em componentes de card"
          component={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-5 border border-slate-200 dark:border-slate-700">
                <Typography variant="h5" className="mb-2">Dados do Usuário</Typography>
                <Typography variant="body2" color="secondary" className="mb-4">
                  Informações pessoais e configurações da conta
                </Typography>
                
                <div className="space-y-2">
                  <div>
                    <Typography variant="caption" color="muted">Nome Completo</Typography>
                    <Typography variant="body">Maria Silva Santos</Typography>
                  </div>
                  <div>
                    <Typography variant="caption" color="muted">E-mail</Typography>
                    <Typography variant="body">maria.silva@exemplo.com</Typography>
                  </div>
                  <div>
                    <Typography variant="caption" color="muted">Tipo de Conta</Typography>
                    <Typography variant="body" weight="medium" color="success">Premium</Typography>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-md p-5 border border-blue-200 dark:border-blue-800/30">
                <Typography variant="h5" color="accent" className="mb-2">Dicas de Segurança</Typography>
                <Typography variant="body2" className="mb-4">
                  Mantenha sua conta protegida seguindo estas recomendações
                </Typography>
                
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span>•</span>
                    <Typography variant="body2">Use senhas fortes com pelo menos 12 caracteres</Typography>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <Typography variant="body2">Ative a autenticação em dois fatores</Typography>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <Typography variant="body2">Nunca compartilhe suas credenciais</Typography>
                  </li>
                </ul>
                
                <Typography variant="caption" color="muted" className="mt-4 block">
                  Última atualização: 15/10/2025
                </Typography>
              </div>
            </div>
          }
          code={`// Exemplo de Card Informativo
<div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-5 border border-slate-200 dark:border-slate-700">
  <Typography variant="h5">Dados do Usuário</Typography>
  <Typography variant="body2" color="secondary">
    Informações pessoais e configurações da conta
  </Typography>
  
  <div>
    <Typography variant="caption" color="muted">Nome Completo</Typography>
    <Typography variant="body">Maria Silva Santos</Typography>
  </div>
  <div>
    <Typography variant="caption" color="muted">E-mail</Typography>
    <Typography variant="body">maria.silva@exemplo.com</Typography>
  </div>
  <div>
    <Typography variant="caption" color="muted">Tipo de Conta</Typography>
    <Typography variant="body" weight="medium" color="success">Premium</Typography>
  </div>
</div>

// Card de Dicas
<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
  <Typography variant="h5" color="accent">Dicas de Segurança</Typography>
  <Typography variant="body2">
    Mantenha sua conta protegida seguindo estas recomendações
  </Typography>
  
  {/* Lista de dicas... */}
</div>`}
        />
      </ComponentSection>
    </div>
  );
};

export default TypographyUIKit;