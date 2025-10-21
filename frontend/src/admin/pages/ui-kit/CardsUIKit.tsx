import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter,
  StatCard,
  SectionCard,
  useThemeClasses,
  Button,
  cn
} from '../../../design-system';
import { ComponentShowcase, ComponentSection } from './components/ComponentShowcase';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Activity,
  Eye,
  Clock,
  ShoppingCart,
  Package,
  Archive,
  Star,
  Cpu,
  HardDrive,
  Server,
  Zap,
  Settings,
  Download,
  Edit,
  Heart,
  CheckCircle
} from 'lucide-react';

// ================================
// PÁGINA UI KIT - CARDS
// ================================

export const CardsUIKit: React.FC = () => {
  const { get } = useThemeClasses();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={cn("min-h-screen p-6", get("bg.secondary"))}>
      <div className={cn("max-w-7xl mx-auto space-y-8")}>
        {/* Header */}
        <div className="mb-8">
          <h1 className={cn("text-3xl font-bold mb-4", get("text.primary"))}>
            Cards
          </h1>
          <p className={cn("text-lg", get("text.secondary"))}>
            Sistema completo de cards com variantes especializadas, bordas adaptativas e suporte total ao modo claro/escuro.
          </p>
        </div>

      {/* Card Básico */}
      <ComponentSection
        title="Card Básico"
        description="Card fundamental para qualquer tipo de conteúdo"
      >
        <ComponentShowcase
          title="Variantes do Card"
          description="Diferentes estilos e configurações do card básico"
          component={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent>
                  <h3 className={cn("font-semibold mb-2", get("text.primary"))}>
                    Card Padrão
                  </h3>
                  <p className={get("text.secondary")}>
                    Card com configurações padrão, borda e padding médio.
                  </p>
                </CardContent>
              </Card>
              
              <Card variant="elevated">
                <CardContent>
                  <h3 className={cn("font-semibold mb-2", get("text.primary"))}>
                    Card Elevado
                  </h3>
                  <p className={get("text.secondary")}>
                    Card com sombra mais pronunciada para destaque.
                  </p>
                </CardContent>
              </Card>
              
              <Card border={false}>
                <CardContent>
                  <h3 className={cn("font-semibold mb-2", get("text.primary"))}>
                    Sem Borda
                  </h3>
                  <p className={get("text.secondary")}>
                    Card sem borda para layouts mais limpos.
                  </p>
                </CardContent>
              </Card>
              
              <Card hover interactive>
                <CardContent>
                  <h3 className={cn("font-semibold mb-2", get("text.primary"))}>
                    Interativo
                  </h3>
                  <p className={get("text.secondary")}>
                    Card com efeito hover e cursor pointer.
                  </p>
                </CardContent>
              </Card>
            </div>
          }
          code={`// Card básico
<Card>
  <CardContent>
    Conteúdo padrão
  </CardContent>
</Card>

// Card elevado
<Card variant="elevated">
  <CardContent>
    Com sombra pronunciada
  </CardContent>
</Card>

// Sem borda
<Card border={false}>
  <CardContent>
    Layout limpo
  </CardContent>
</Card>

// Interativo
<Card hover interactive>
  <CardContent>
    Clicável com hover
  </CardContent>
</Card>`}
        />

        <ComponentShowcase
          title="Níveis de Padding"
          description="Diferentes espaçamentos internos disponíveis"
          component={
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card padding="none">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20">
                  <span className="text-xs">Padding: none</span>
                </div>
              </Card>
              
              <Card padding="sm">
                <div className="bg-green-50 dark:bg-green-900/20 rounded">
                  <span className="text-xs">Padding: sm</span>
                </div>
              </Card>
              
              <Card padding="md">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded">
                  <span className="text-xs">Padding: md</span>
                </div>
              </Card>
              
              <Card padding="lg">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded">
                  <span className="text-xs">Padding: lg</span>
                </div>
              </Card>
            </div>
          }
          code={`<Card padding="none">Sem espaçamento</Card>
<Card padding="sm">Espaçamento pequeno</Card>
<Card padding="md">Espaçamento médio (padrão)</Card>
<Card padding="lg">Espaçamento grande</Card>`}
        />

        <ComponentShowcase
          title="Efeitos Visuais"
          description="Testando hover, sombras e interatividade dos cards"
          component={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card hover>
                <CardContent>
                  <h3 className={cn("font-semibold mb-2", get("text.primary"))}>
                    Hover Effect
                  </h3>
                  <p className={get("text.secondary")}>
                    Passe o mouse para ver o efeito hover com mudança de cor e escala.
                  </p>
                </CardContent>
              </Card>
              
              <Card elevation={1}>
                <CardContent>
                  <h3 className={cn("font-semibold mb-2", get("text.primary"))}>
                    Sombra Nível 1
                  </h3>
                  <p className={get("text.secondary")}>
                    Sombra leve que intensifica no hover.
                  </p>
                </CardContent>
              </Card>
              
              <Card elevation={2}>
                <CardContent>
                  <h3 className={cn("font-semibold mb-2", get("text.primary"))}>
                    Sombra Nível 2
                  </h3>
                  <p className={get("text.secondary")}>
                    Sombra mais pronunciada para destaque.
                  </p>
                </CardContent>
              </Card>
            </div>
          }
          code={`// Hover com efeito de escala
<Card hover>
  <CardContent>
    Hover com mudança de cor e escala
  </CardContent>
</Card>

// Diferentes níveis de sombra
<Card elevation={1}>Sombra leve</Card>
<Card elevation={2}>Sombra pronunciada</Card>`}
        />
      </ComponentSection>

      {/* StatCard */}
      <ComponentSection
        title="StatCard - Cards de Estatísticas"
        description="Cards especializados para exibir métricas, KPIs e dados numéricos"
      >
        <ComponentShowcase
          title="Dashboard Administrativo"
          description="Métricas principais para painéis administrativos"
          component={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total de Usuários"
                value="1,234"
                icon={<Users />}
                iconColor="primary"
                change="+12% esta semana"
                changeType="positive"
              />
              
              <StatCard
                title="Receita Mensal"
                value="R$ 45,670"
                icon={<DollarSign />}
                iconColor="success"
                change="+8% vs. mês anterior"
                changeType="positive"
              />
              
              <StatCard
                title="Taxa de Conversão"
                value="3.2%"
                icon={<TrendingUp />}
                iconColor="warning"
                change="-0.5% esta semana"
                changeType="negative"
              />
              
              <StatCard
                title="Tickets Pendentes"
                value="23"
                icon={<AlertTriangle />}
                iconColor="danger"
                change="5 novos hoje"
                changeType="neutral"
              />
            </div>
          }
          code={`<StatCard
  title="Total de Usuários"
  value="1,234"
  icon={<Users />}
  iconColor="primary"
  change="+12% esta semana"
  changeType="positive"
/>

<StatCard
  title="Receita Mensal"
  value="R$ 45,670"
  icon={<DollarSign />}
  iconColor="success"
  change="+8% vs. mês anterior"
  changeType="positive"
/>`}
        />

        <ComponentShowcase
          title="Analytics e Tempo Real"
          description="Cards para monitoramento e analytics com dados em tempo real"
          component={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Sessões Ativas"
                value="89"
                icon={<Activity />}
                iconColor="info"
                change="Tempo real"
                changeType="neutral"
                size="sm"
              />
              
              <StatCard
                title="Páginas Visualizadas"
                value="12,567"
                icon={<Eye />}
                iconColor="primary"
                change="+23% hoje"
                changeType="positive"
              />
              
              <StatCard
                title="Tempo Médio"
                value="2m 34s"
                icon={<Clock />}
                iconColor="muted"
                change="+15s vs. ontem"
                changeType="negative"
              />
            </div>
          }
          code={`<StatCard
  title="Sessões Ativas"
  value="89"
  icon={<Activity />}
  iconColor="info"
  change="Tempo real"
  changeType="neutral"
  size="sm"
/>`}
        />

        <ComponentShowcase
          title="Cores de Ícones Disponíveis"
          description="Todas as cores semânticas disponíveis para ícones"
          component={
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard
                title="Primary"
                value="100"
                icon={<Star />}
                iconColor="primary"
                size="sm"
              />
              <StatCard
                title="Success"
                value="95%"
                icon={<TrendingUp />}
                iconColor="success"
                size="sm"
              />
              <StatCard
                title="Warning"
                value="12"
                icon={<AlertTriangle />}
                iconColor="warning"
                size="sm"
              />
              <StatCard
                title="Danger"
                value="3"
                icon={<AlertTriangle />}
                iconColor="danger"
                size="sm"
              />
              <StatCard
                title="Info"
                value="567"
                icon={<Eye />}
                iconColor="info"
                size="sm"
              />
              <StatCard
                title="Muted"
                value="2.1s"
                icon={<Clock />}
                iconColor="muted"
                size="sm"
              />
            </div>
          }
          code={`// Cores disponíveis para iconColor
iconColor="primary"    // Azul - Métricas principais
iconColor="success"    // Verde - Crescimento, sucessos
iconColor="warning"    // Amarelo - Alertas, atenção
iconColor="danger"     // Vermelho - Problemas, decline
iconColor="info"       // Azul claro - Informações
iconColor="muted"      // Cinza - Dados neutros`}
        />

        <ComponentShowcase
          title="Estados Especiais"
          description="Loading e diferentes alinhamentos dos StatCards"
          component={
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className={cn("text-sm font-medium mb-3", get("text.secondary"))}>
                    Alinhamento Normal
                  </h4>
                  <StatCard
                    title="Vendas Hoje"
                    value="R$ 8,450"
                    icon={<ShoppingCart />}
                    iconColor="success"
                    change="+25% vs. ontem"
                    changeType="positive"
                    align="start"
                  />
                </div>
                <div>
                  <h4 className={cn("text-sm font-medium mb-3", get("text.secondary"))}>
                    Alinhamento Centralizado
                  </h4>
                  <StatCard
                    title="Avaliações"
                    value="4.8/5"
                    icon={<Star />}
                    iconColor="primary"
                    change="156 avaliações"
                    changeType="neutral"
                    align="center"
                  />
                </div>
              </div>
              
              <div>
                <h4 className={cn("text-sm font-medium mb-3", get("text.secondary"))}>
                  Estado de Loading Melhorado
                </h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard
                      title="Carregando..."
                      value="---"
                      isLoading={isLoading}
                      icon={<Users />}
                    />
                    <StatCard
                      title="Vendas"
                      value="R$ 1,234"
                      isLoading={isLoading}
                      icon={<DollarSign />}
                      iconColor="success"
                    />
                    <StatCard
                      title="Analytics"
                      value="89%"
                      isLoading={isLoading}
                      icon={<TrendingUp />}
                      iconColor="info"
                    />
                  </div>
                  <Button 
                    variant="primary"
                    onClick={() => setIsLoading(!isLoading)}
                  >
                    {isLoading ? 'Parar Loading' : 'Testar Loading'}
                  </Button>
                  <div className="p-3 rounded-lg border border-blue-200 dark:border-blue-400/30 bg-blue-50 dark:bg-blue-900/20">
                    <p className={cn("text-sm", get("text.secondary"))}>
                      💡 Loading agora visível nos dois temas: <br />
                      <strong>Claro:</strong> bg-slate-200, bg-slate-300 | <strong>Escuro:</strong> bg-white/10, bg-white/20
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
          code={`// Alinhamento centralizado
<StatCard align="center" title="Métrica" value="123" />

// Estado de loading melhorado (visível em ambos os temas)
<StatCard isLoading={true} title="Carregando..." value="---" />

// Card clicável
<StatCard 
  onClick={() => console.log('Clicado')}
  title="Clicável" 
  value="456" 
/>

// Cores de loading melhoradas:
// Modo claro: bg-slate-200, bg-slate-300  
// Modo escuro: bg-white/10, bg-white/20`}
        />
      </ComponentSection>

      {/* SectionCard */}
      <ComponentSection
        title="SectionCard - Cards Estruturados"
        description="Cards com cabeçalho, descrição e ações para seções organizadas"
      >
        <ComponentShowcase
          title="Card com Ações"
          description="SectionCard com título, descrição e botões de ação"
          component={
            <div className="space-y-6">
              <SectionCard
                title="Configurações de Segurança"
                description="Gerencie autenticação e permissões do sistema"
                actions={
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">Cancelar</Button>
                    <Button variant="primary" size="sm">Salvar</Button>
                  </div>
                }
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-white/10">
                    <div>
                      <span className={cn("font-medium", get("text.primary"))}>
                        Autenticação de dois fatores
                      </span>
                      <p className={cn("text-sm", get("text.secondary"))}>
                        Adiciona uma camada extra de segurança
                      </p>
                    </div>
                    <Button variant="success" size="sm">Ativar</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-white/10">
                    <div>
                      <span className={cn("font-medium", get("text.primary"))}>
                        Login com Google
                      </span>
                      <p className={cn("text-sm", get("text.secondary"))}>
                        Permite login usando conta Google
                      </p>
                    </div>
                    <Button variant="secondary" size="sm">Configurar</Button>
                  </div>
                </div>
              </SectionCard>
            </div>
          }
          code={`<SectionCard
  title="Configurações de Segurança"
  description="Gerencie autenticação e permissões do sistema"
  actions={
    <div className="flex gap-2">
      <Button variant="secondary" size="sm">Cancelar</Button>
      <Button variant="primary" size="sm">Salvar</Button>
    </div>
  }
>
  {/* Conteúdo da seção */}
</SectionCard>`}
        />
      </ComponentSection>

      {/* Cards Compostos */}
      <ComponentSection
        title="Cards Compostos"
        description="Cards estruturados com Header, Content e Footer"
      >
        <ComponentShowcase
          title="Card Completo"
          description="Card com todas as seções estruturadas"
          component={
            <Card padding="none" className="max-w-md">
              <CardHeader className="p-4">
                <div className="flex items-start justify-between w-full">
                  <div>
                    <h3 className={cn("text-base font-semibold", get("text.primary"))}>
                      Relatório Mensal
                    </h3>
                    <p className={cn("text-sm", get("text.secondary"))}>
                      Dados de performance de outubro
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" icon={<Download />}>Exportar</Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={get("text.secondary")}>Receita Total</span>
                    <span className={cn("font-semibold", get("text.primary"))}>R$ 45,670</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={get("text.secondary")}>Meta do Mês</span>
                    <span className={cn("font-semibold", get("text.primary"))}>R$ 50,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={get("text.secondary")}>Progresso</span>
                    <span className="font-semibold text-yellow-600">91.3%</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-3">
                <div className="flex justify-between items-center w-full">
                  <span className={cn("text-sm", get("text.secondary"))}>
                    Atualizado há 5 minutos
                  </span>
                  <Button variant="primary" size="sm">Ver Detalhes</Button>
                </div>
              </CardFooter>
            </Card>
          }
          code={`<Card padding="none">
  <CardHeader
    title="Relatório Mensal"
    subtitle="Dados de performance de outubro"
    action={<Button variant="secondary" size="sm">Exportar</Button>}
  />
  
  <CardContent>
    {/* Conteúdo principal */}
  </CardContent>
  
  <CardFooter>
    <div className="flex justify-between">
      <span>Atualizado há 5 minutos</span>
      <Button variant="primary" size="sm">Ver Detalhes</Button>
    </div>
  </CardFooter>
</Card>`}
        />
      </ComponentSection>

      {/* Cards com Cores */}
      <ComponentSection
        title="Cards com Cores"
        description="Demonstração de cards com diferentes esquemas de cores"
      >
        <ComponentShowcase
          title="Paleta de Cores"
          description="Cards com fundos coloridos para diferentes contextos"
          component={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card Azul - Informação */}
              <Card className="border-blue-400 dark:border-blue-400/30 bg-blue-200 dark:bg-blue-900/20">
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                        Informações
                      </h3>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Card informativo
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card Verde - Sucesso */}
              <Card className="border-green-400 dark:border-green-400/30 bg-green-200 dark:bg-green-900/20">
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shadow-md">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900 dark:text-green-100">
                        Sucesso
                      </h3>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Operação concluída
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card Amarelo - Aviso */}
              <Card className="border-amber-400 dark:border-yellow-400/30 bg-amber-200 dark:bg-yellow-900/20">
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center shadow-md">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-amber-900 dark:text-yellow-100">
                        Atenção
                      </h3>
                      <p className="text-sm text-amber-700 dark:text-yellow-300">
                        Requer atenção
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card Roxo - Premium */}
              <Card className="border-purple-400 dark:border-purple-400/30 bg-purple-200 dark:bg-purple-900/20">
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center shadow-md">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900 dark:text-purple-100">
                        Premium
                      </h3>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        Recurso premium
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          }
          code={`// Card Azul - Informações
<Card className="border-blue-200 dark:border-blue-400/30 bg-blue-100 dark:bg-blue-900/20">
  <CardContent>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
        <Eye className="w-5 h-5 text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-blue-900 dark:text-blue-100">
          Informações
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Card informativo
        </p>
      </div>
    </div>
  </CardContent>
</Card>

// Outras cores disponíveis:
// Verde: border-green-400 dark:border-green-400/30 bg-green-200 dark:bg-green-900/20
// Amarelo: border-amber-400 dark:border-yellow-400/30 bg-amber-200 dark:bg-yellow-900/20  
// Roxo: border-purple-400 dark:border-purple-400/30 bg-purple-200 dark:bg-purple-900/20`}
        />

        <ComponentShowcase
          title="Cards com Gradientes"
          description="Cards com fundos em gradiente para maior impacto visual"
          component={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Gradiente Azul-Roxo */}
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 border-0 text-white">
                <CardContent>
                  <div className="text-center">
                    <Zap className="w-8 h-8 mx-auto mb-3 text-white" />
                    <h3 className="font-bold text-lg mb-2">Performance</h3>
                    <p className="text-blue-100">
                      Monitoramento em tempo real
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Gradiente Verde-Cyan */}
              <Card className="bg-gradient-to-br from-green-500 to-cyan-500 border-0 text-white">
                <CardContent>
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-3 text-white" />
                    <h3 className="font-bold text-lg mb-2">Crescimento</h3>
                    <p className="text-green-100">
                      Métricas de crescimento
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Gradiente Laranja-Rosa */}
              <Card className="bg-gradient-to-br from-orange-500 to-pink-500 border-0 text-white">
                <CardContent>
                  <div className="text-center">
                    <Heart className="w-8 h-8 mx-auto mb-3 text-white" />
                    <h3 className="font-bold text-lg mb-2">Engajamento</h3>
                    <p className="text-orange-100">
                      Interação dos usuários
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          }
          code={`// Gradiente Azul-Roxo
<Card className="bg-gradient-to-br from-blue-500 to-purple-600 border-0 text-white">
  <CardContent>
    <div className="text-center">
      <Zap className="w-8 h-8 mx-auto mb-3 text-white" />
      <h3 className="font-bold text-lg mb-2">Performance</h3>
      <p className="text-blue-100">Monitoramento em tempo real</p>
    </div>
  </CardContent>
</Card>

// Outros gradientes disponíveis:
// Verde-Cyan: from-green-500 to-cyan-500
// Laranja-Rosa: from-orange-500 to-pink-500
// Customize com qualquer combinação de cores Tailwind`}
        />
      </ComponentSection>

      {/* Exemplos E-commerce */}
      <ComponentSection
        title="Casos de Uso - E-commerce"
        description="Examples práticos para plataformas de e-commerce"
      >
        <ComponentShowcase
          title="Dashboard de Vendas"
          description="Métricas de vendas e performance da loja"
          component={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Vendas Hoje"
                value="R$ 8,450"
                icon={<ShoppingCart />}
                iconColor="success"
                change="+25% vs. ontem"
                changeType="positive"
                align="center"
              />
              
              <StatCard
                title="Pedidos Pendentes"
                value="12"
                icon={<Package />}
                iconColor="warning"
                change="3 atrasados"
                changeType="negative"
                align="center"
              />
              
              <StatCard
                title="Produtos em Estoque"
                value="1,456"
                icon={<Archive />}
                iconColor="info"
                change="98% disponível"
                changeType="positive"
                align="center"
              />
              
              <StatCard
                title="Avaliações"
                value="4.8/5"
                icon={<Star />}
                iconColor="primary"
                change="156 avaliações"
                changeType="neutral"
                align="center"
              />
            </div>
          }
          code={`// E-commerce Dashboard
<StatCard
  title="Vendas Hoje"
  value="R$ 8,450"
  icon={<ShoppingCart />}
  iconColor="success"
  change="+25% vs. ontem"
  changeType="positive"
  align="center"
/>`}
        />
      </ComponentSection>

      {/* Sistema e Infraestrutura */}
      <ComponentSection
        title="Casos de Uso - Sistema"
        description="Monitoramento de infraestrutura e performance"
      >
        <ComponentShowcase
          title="Status do Sistema"
          description="Métricas de infraestrutura e monitoramento"
          component={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="CPU Usage"
                value="45%"
                icon={<Cpu />}
                iconColor="success"
                change="Normal"
                changeType="positive"
              />
              
              <StatCard
                title="Memória RAM"
                value="68%"
                icon={<HardDrive />}
                iconColor="warning"
                change="Monitorando"
                changeType="neutral"
              />
              
              <StatCard
                title="Uptime"
                value="99.9%"
                icon={<Server />}
                iconColor="success"
                change="30 dias"
                changeType="positive"
              />
              
              <StatCard
                title="Requests/min"
                value="1,234"
                icon={<Zap />}
                iconColor="info"
                change="+5% pico"
                changeType="positive"
              />
            </div>
          }
          code={`// Monitoramento de Sistema
<StatCard
  title="CPU Usage"
  value="45%"
  icon={<Cpu />}
  iconColor="success"
  change="Normal"
  changeType="positive"
/>`}
        />
      </ComponentSection>

      {/* Bordas e Temas */}
      <ComponentSection
        title="Sistema de Bordas e Contraste"
        description="Como as bordas e backgrounds se adaptam automaticamente ao tema"
      >
        <ComponentShowcase
          title="Contraste de Backgrounds"
          description="Background do card vs background da página para máxima visibilidade"
          component={
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className={cn("text-sm font-medium mb-3", get("text.secondary"))}>
                    Cards com Bordas (Padrão)
                  </h4>
                  <div className="space-y-3">
                    <Card>
                      <CardContent>
                        <p className={get("text.primary")}>
                          <strong>Card Normal</strong>
                        </p>
                        <p className={cn("text-xs mt-1", get("text.secondary"))}>
                          Background contrastante com a página
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card variant="elevated">
                      <CardContent>
                        <p className={get("text.primary")}>
                          <strong>Card Elevado</strong>
                        </p>
                        <p className={cn("text-xs mt-1", get("text.secondary"))}>
                          Com sombra pronunciada
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h4 className={cn("text-sm font-medium mb-3", get("text.secondary"))}>
                    Cards sem Bordas
                  </h4>
                  <div className="space-y-3">
                    <Card border={false}>
                      <CardContent>
                        <p className={get("text.primary")}>
                          <strong>Sem Bordas</strong>
                        </p>
                        <p className={cn("text-xs mt-1", get("text.secondary"))}>
                          Layout mais limpo e minimalista
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card border={false} hover>
                      <CardContent>
                        <p className={get("text.primary")}>
                          <strong>Sem Bordas + Hover</strong>
                        </p>
                        <p className={cn("text-xs mt-1", get("text.secondary"))}>
                          Passe o mouse para ver o efeito
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg border border-green-200 dark:border-green-400/30 bg-green-50 dark:bg-green-900/20">
                <h4 className={cn("font-medium mb-2", get("text.primary"))}>
                  ✅ Sistema de Contraste Inteligente
                </h4>
                <ul className={cn("text-sm space-y-1", get("text.secondary"))}>
                  <li>• <strong>Página:</strong> bg-slate-50 (claro) | bg-gradient (escuro)</li>
                  <li>• <strong>Cards:</strong> bg-white (claro) | bg-white/5 (escuro)</li>
                  <li>• <strong>Bordas:</strong> border-slate-200 (claro) | border-white/5 (escuro)</li>
                  <li>• <strong>Resultado:</strong> Contraste perfeito entre card e fundo</li>
                </ul>
              </div>
            </div>
          }
          code={`// Background da página: bg-slate-50 (claro)
// Background dos cards: bg-white (claro) 
// = Contraste perfeito!

// Cards com bordas automáticas
<Card>Bordas adaptativas</Card>

// Cards sem bordas
<Card border={false}>Layout limpo</Card>

// Sistema automático:
// Modo Claro: Página bg-slate-50, Card bg-white
// Modo Escuro: Página bg-gradient, Card bg-white/5`}
        />

        <ComponentShowcase
          title="Efeitos de Hover e Interatividade"
          description="Demonstração dos efeitos visuais em ação"
          component={
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card hover interactive onClick={() => alert('Card clicado!')}>
                  <CardContent>
                    <h3 className={cn("font-semibold mb-2", get("text.primary"))}>
                      🖱️ Clique em Mim!
                    </h3>
                    <p className={get("text.secondary")}>
                      Card totalmente interativo com hover + click.
                      Veja os efeitos de escala e mudança de cor.
                    </p>
                  </CardContent>
                </Card>
                
                <StatCard
                  title="StatCard Clicável"
                  value="456"
                  icon={<Heart />}
                  iconColor="danger"
                  change="Favoritos"
                  changeType="positive"
                  onClick={() => alert('StatCard clicado!')}
                />
              </div>
              
              <div className="p-4 rounded-lg border border-purple-200 dark:border-purple-400/30 bg-purple-50 dark:bg-purple-900/20">
                <h4 className={cn("font-medium mb-2", get("text.primary"))}>
                  ✨ Efeitos Visuais Melhorados
                </h4>
                <ul className={cn("text-sm space-y-1", get("text.secondary"))}>
                  <li>• <strong>Hover:</strong> Mudança de cor + escala 1.02x</li>
                  <li>• <strong>Sombras:</strong> Intensificam no hover</li>
                  <li>• <strong>Interativo:</strong> cursor-pointer automático</li>
                  <li>• <strong>Transições:</strong> Suaves e profissionais</li>
                </ul>
              </div>
            </div>
          }
          code={`// Card interativo completo
<Card hover interactive onClick={handleClick}>
  Clicável com efeitos visuais
</Card>

// StatCard clicável  
<StatCard
  onClick={handleClick}
  title="Clicável"
  value="123"
  icon={<Heart />}
  iconColor="danger"
/>

// Efeitos aplicados automaticamente:
// hover:bg-slate-50 dark:hover:bg-white/10 hover:scale-[1.02]`}
        />
      </ComponentSection>
      </div>
    </div>
  );
};

export default CardsUIKit;