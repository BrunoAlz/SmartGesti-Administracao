import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Building2,
  DollarSign,
  Activity,
  CheckCircle,
  Plus,
  BarChart3,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Server,
  PieChart
} from "lucide-react";
import { 
  Card, CardHeader, CardContent, StatCard, SectionDivider, Button,
  useThemeClasses, useBadgeClasses, useThemeContext, cn 
} from "../../../design-system";

// ================================
// TIPOS E DADOS MOCK
// ================================


// SAAS data from SaasList page
const saasData = [
  {
    id: "smartsaude",
    name: "SmartSaúde",
    description: "Sistema de gestão para clínicas e hospitais",
    icon: Building2,
    color: "from-blue-500 to-cyan-500",
    totalClients: 45,
    activeClients: 42,
    monthlyRevenue: 12500,
    growthRate: 8.5,
    lastActivity: "2 min atrás",
    status: "active"
  },
  {
    id: "smarteduca",
    name: "SmartEduca",
    description: "Plataforma educacional para escolas e universidades",
    icon: Users,
    color: "from-green-500 to-emerald-500",
    totalClients: 32,
    activeClients: 28,
    monthlyRevenue: 8900,
    growthRate: 12.3,
    lastActivity: "15 min atrás",
    status: "active"
  },
  {
    id: "smartimoveis",
    name: "SmartImóveis",
    description: "Gestão completa para imobiliárias",
    icon: Building2,
    color: "from-purple-500 to-pink-500",
    totalClients: 28,
    activeClients: 25,
    monthlyRevenue: 6700,
    growthRate: 5.2,
    lastActivity: "1 hora atrás",
    status: "active"
  },
  {
    id: "smartbusiness",
    name: "SmartBusiness",
    description: "Solução empresarial completa",
    icon: Building2,
    color: "from-orange-500 to-red-500",
    totalClients: 18,
    activeClients: 15,
    monthlyRevenue: 4500,
    growthRate: -2.1,
    lastActivity: "2 horas atrás",
    status: "maintenance"
  }
];


// ================================
// COMPONENTE ATIVIDADE RECENTE
// ================================


// ================================
// COMPONENTE GRÁFICO DE RECEITA
// ================================

const RevenueChart: React.FC = () => {
  const { get } = useThemeClasses();
  
  const monthlyData = [
    { month: "Jan", revenue: 28000, clients: 95 },
    { month: "Fev", revenue: 31200, clients: 102 },
    { month: "Mar", revenue: 29800, clients: 108 },
    { month: "Abr", revenue: 32600, clients: 123 },
    { month: "Mai", revenue: 35100, clients: 130 },
    { month: "Jun", revenue: 32600, clients: 123 }
  ];
  
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
  
  return (
    <Card>
      <CardHeader title="Receita dos Últimos 6 Meses">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Receita Mensal</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {monthlyData.map((data, index) => {
            const heightPercentage = (data.revenue / maxRevenue) * 100;
            const isCurrentMonth = index === monthlyData.length - 1;
            
            return (
              <div key={data.month} className="flex items-center gap-4">
                <div className="w-8 text-xs font-medium text-gray-600 dark:text-gray-400">
                  {data.month}
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 dark:bg-white/5 rounded-full h-6 relative overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        isCurrentMonth ? "bg-blue-500" : "bg-blue-300 dark:bg-blue-600"
                      )}
                      style={{ width: `${heightPercentage}%` }}
                    />
                    <div className="absolute inset-0 flex items-center px-3">
                      <span className={cn(
                        "text-xs font-medium",
                        heightPercentage > 40 ? "text-white" : get("text.primary")
                      )}>
                        R$ {data.revenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 w-12 text-right">
                    {data.clients} clientes
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/10">
          <div className="flex justify-between items-center text-sm">
            <span className={cn("font-medium", get("text.secondary"))}>Crescimento médio:</span>
            <span className="text-green-500 font-semibold">+8.2%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ================================
// COMPONENTE DASHBOARD PRINCIPAL
// ================================

export const AdminDashboard: React.FC = () => {
  const { get } = useThemeClasses();
  const { theme } = useThemeContext();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  
  // Hook para badges com tipos diferentes
  const successBadge = useBadgeClasses("success", "sm");
  const warningBadge = useBadgeClasses("warning", "sm");
  const infoBadge = useBadgeClasses("info", "sm");
  
  const getBadgeClasses = (type: string) => {
    switch (type) {
      case "success": return successBadge;
      case "warning": return warningBadge;
      case "info": return infoBadge;
      default: return infoBadge;
    }
  };
  
  const handleViewClients = (saasId: string) => {
    navigate(`/admin/saas/${saasId}/clients`);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500 bg-green-50 dark:bg-green-500/20";
      case "inactive":
        return "text-red-500 bg-red-50 dark:bg-red-500/20";
      case "maintenance":
        return "text-yellow-500 bg-yellow-50 dark:bg-yellow-500/20";
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-500/20";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "maintenance":
        return "Manutenção";
      case "inactive":
        return "Inativo";
      default:
        return "Desconhecido";
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };


  return (
    <div className="p-3 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={cn("text-xl font-bold mb-1", get("text.primary"))}>
            Dashboard Administrativo
          </h1>
          <p className={cn("text-base", get("text.secondary"))}>
            Visão geral dos seus SAAS e clientes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant={isDark ? "primary-gradient" : "primary"} size="sm" icon={<BarChart3 className="w-4 h-4" />}>
            Relatórios
          </Button>
          <Button variant={isDark ? "success-gradient" : "success"} size="sm" icon={<Plus className="w-4 h-4" />}>
            Novo SAAS
          </Button>
        </div>
      </div>

      {/* Seção: Métricas Gerais */}
      <SectionDivider
        title="Métricas Gerais"
        icon={<TrendingUp />}
        badge="Atualizado agora"
        badgeColor="blue"
        spacing="lg"
      />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total de SAAS"
          value={saasData.length}
          change="+1 este mês"
          changeType="positive"
          icon={<Building2 />}
          iconColor="primary"
        />
        <StatCard
          title="Total de Clientes"
          value={saasData.reduce((sum, saas) => sum + saas.totalClients, 0)}
          change="+12 esta semana"
          changeType="positive"
          icon={<Users />}
          iconColor="success"
        />
        <StatCard
          title="Receita Mensal"
          value={formatCurrency(saasData.reduce((sum, saas) => sum + saas.monthlyRevenue, 0))}
          change="+8.5% vs. mês anterior"
          changeType="positive"
          icon={<DollarSign />}
          iconColor="success"
        />
        <StatCard
          title="Taxa de Crescimento"
          value={`${(saasData.reduce((sum, saas) => sum + saas.growthRate, 0) / saasData.length).toFixed(1)}%`}
          change="Média geral"
          changeType="positive"
          icon={<Activity />}
          iconColor="info"
        />
      </div>
      
      {/* Seção: Sistemas SAAS */}
      <SectionDivider
        title="Sistemas SAAS"
        icon={<Server />}
        badge={`${saasData.length} sistemas ativos`}
        badgeColor="green"
        spacing="lg"
      />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {saasData.map((saas) => {
          const Icon = saas.icon;
          return (
            <Card key={saas.id} hover className="transition-all duration-200 hover:scale-105">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center text-white", `bg-gradient-to-br ${saas.color}`)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={cn("text-lg font-semibold", get("text.primary"))}>
                        {saas.name}
                      </h3>
                      <p className={cn("text-sm", get("text.secondary"))}>
                        {saas.description}
                      </p>
                    </div>
                  </div>
                  <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getStatusColor(saas.status))}>
                    {getStatusText(saas.status)}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className={cn("text-2xl font-bold", get("text.primary"))}>
                      {saas.totalClients}
                    </p>
                    <p className={cn("text-sm", get("text.secondary"))}>
                      Total de Clientes
                    </p>
                  </div>
                  <div className="text-center">
                    <p className={cn("text-2xl font-bold", get("text.primary"))}>
                      {saas.activeClients}
                    </p>
                    <p className={cn("text-sm", get("text.secondary"))}>
                      Clientes Ativos
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className={cn("text-sm", get("text.secondary"))}>Receita Mensal:</span>
                    <span className={cn("font-semibold", get("text.primary"))}>
                      R$ {saas.monthlyRevenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={cn("text-sm", get("text.secondary"))}>Crescimento:</span>
                    <span className={cn("font-semibold", saas.growthRate >= 0 ? "text-green-500" : "text-red-500")}>
                      {saas.growthRate >= 0 ? "+" : ""}{saas.growthRate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={cn("text-sm", get("text.secondary"))}>\u00daltima Atividade:</span>
                    <span className={cn("text-sm", get("text.muted"))}>
                      {saas.lastActivity}
                    </span>
                  </div>
                </div>

                <Button
                  variant={isDark ? "primary-gradient" : "primary"}
                  size="sm"
                  fullWidth
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  onClick={() => handleViewClients(saas.id)}
                >
                  Ver Clientes
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Seção: Estatísticas e Atividades */}
      <SectionDivider
        title="Estatísticas e Atividades"
        icon={<PieChart />}
        badge={<div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          Tempo real
        </div>}
        badgeColor="purple"
        spacing="lg"
      />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Enhanced Recent Activity */}
        <Card>
          <CardHeader title="Atividade Recente">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Ao vivo</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  action: "Novo cliente cadastrado", 
                  saas: "SmartSaúde", 
                  time: "2 min atrás", 
                  type: "success",
                  details: "Dr. Carlos Silva - Clínica Médica",
                  value: "R$ 299/mês"
                },
                { 
                  action: "Pagamento confirmado", 
                  saas: "SmartEduca", 
                  time: "15 min atrás", 
                  type: "success",
                  details: "Colégio Santa Maria - Plano Premium",
                  value: "R$ 890,00"
                },
                { 
                  action: "Cliente suspenso", 
                  saas: "SmartImóveis", 
                  time: "1 hora atrás", 
                  type: "warning",
                  details: "Imobiliária Central - Pagamento em atraso",
                  value: "R$ 450,00"
                },
                { 
                  action: "Nova funcionalidade ativada", 
                  saas: "SmartBusiness", 
                  time: "2 horas atrás", 
                  type: "info",
                  details: "Módulo de Relatórios Avançados",
                  value: "+15 clientes"
                },
                { 
                  action: "Backup automatizado", 
                  saas: "Sistema", 
                  time: "3 horas atrás", 
                  type: "info",
                  details: "Backup diário realizado com sucesso",
                  value: "2.4GB"
                }
              ].map((activity, index) => (
                <div key={index} className="group relative">
                  <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200">
                    {/* Status indicator with gradient */}
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden",
                      activity.type === "success" ? "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-500/20 dark:to-green-600/20" :
                      activity.type === "warning" ? "bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-500/20 dark:to-yellow-600/20" :
                      "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-500/20 dark:to-blue-600/20"
                    )}>
                      {activity.type === "success" ? <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" /> :
                       activity.type === "warning" ? <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" /> :
                       <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={cn("font-semibold text-sm", get("text.primary"))}>
                          {activity.action}
                        </p>
                        <span className={getBadgeClasses(activity.type)}>
                          {activity.saas}
                        </span>
                      </div>
                      <p className={cn("text-sm mb-2", get("text.secondary"))}>
                        {activity.details}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </span>
                        <span className={cn(
                          "text-xs font-bold",
                          activity.type === "success" ? "text-green-600 dark:text-green-400" :
                          activity.type === "warning" ? "text-yellow-600 dark:text-yellow-400" :
                          "text-blue-600 dark:text-blue-400"
                        )}>
                          {activity.value}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline line */}
                  {index < 4 && (
                    <div className="absolute left-8 top-12 w-0.5 h-4 bg-gray-200 dark:bg-white/10"></div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/10">
              <div className="flex items-center justify-center">
                <button className={cn(
                  "text-sm font-medium px-4 py-2 rounded-lg transition-colors",
                  "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10"
                )}>
                  Ver todas as atividades →
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <RevenueChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
