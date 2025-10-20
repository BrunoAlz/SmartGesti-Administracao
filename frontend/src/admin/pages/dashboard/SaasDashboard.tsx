import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  StatCard,
  Button,
  IconButton,
  useThemeClasses,
  cn
} from "../../../design-system";
import {
  Users,
  Building2,
  DollarSign,
  Activity,
  Plus,
  Eye,
  Settings,
  BarChart3,
  Heart,
  GraduationCap,
  ShoppingCart,
  Briefcase,
  Home,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

// ================================
// TIPOS
// ================================

interface SaasOverview {
  id: string;
  name: string;
  type: "health" | "education" | "ecommerce" | "business" | "realestate";
  icon: React.ElementType;
  color: string;
  gradient: string;
  totalClients: number;
  activeClients: number;
  monthlyRevenue: number;
  growthRate: number;
  status: "active" | "maintenance" | "inactive";
  lastActivity: string;
}

interface SystemStats {
  totalSaas: number;
  totalClients: number;
  totalRevenue: number;
  activeUsers: number;
  systemHealth: number;
  uptime: number;
}

// ================================
// DADOS MOCK
// ================================

const saasList: SaasOverview[] = [
  {
    id: "1",
    name: "SmartSaúde",
    type: "health",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    gradient: "bg-gradient-to-br from-red-500 to-pink-500",
    totalClients: 45,
    activeClients: 42,
    monthlyRevenue: 12500,
    growthRate: 12.5,
    status: "active",
    lastActivity: "2 horas atrás"
  },
  {
    id: "2",
    name: "SmartEduca",
    type: "education",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
    totalClients: 28,
    activeClients: 25,
    monthlyRevenue: 8900,
    growthRate: 8.3,
    status: "active",
    lastActivity: "1 hora atrás"
  },
  {
    id: "3",
    name: "SmartShop",
    type: "ecommerce",
    icon: ShoppingCart,
    color: "from-green-500 to-emerald-500",
    gradient: "bg-gradient-to-br from-green-500 to-emerald-500",
    totalClients: 67,
    activeClients: 61,
    monthlyRevenue: 18900,
    growthRate: 15.7,
    status: "active",
    lastActivity: "30 min atrás"
  },
  {
    id: "4",
    name: "SmartBusiness",
    type: "business",
    icon: Briefcase,
    color: "from-purple-500 to-violet-500",
    gradient: "bg-gradient-to-br from-purple-500 to-violet-500",
    totalClients: 23,
    activeClients: 20,
    monthlyRevenue: 7200,
    growthRate: 5.2,
    status: "maintenance",
    lastActivity: "3 horas atrás"
  },
  {
    id: "5",
    name: "SmartImóveis",
    type: "realestate",
    icon: Home,
    color: "from-orange-500 to-amber-500",
    gradient: "bg-gradient-to-br from-orange-500 to-amber-500",
    totalClients: 15,
    activeClients: 12,
    monthlyRevenue: 4500,
    growthRate: -2.1,
    status: "inactive",
    lastActivity: "1 dia atrás"
  }
];

const systemStats: SystemStats = {
  totalSaas: 5,
  totalClients: 178,
  totalRevenue: 52000,
  activeUsers: 160,
  systemHealth: 98.5,
  uptime: 99.9
};

// ================================
// COMPONENTE PRINCIPAL
// ================================

export const SaasDashboard: React.FC = () => {
  const { get } = useThemeClasses();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500 bg-green-100 dark:bg-green-500/20";
      case "maintenance":
        return "text-yellow-500 bg-yellow-100 dark:bg-yellow-500/20";
      case "inactive":
        return "text-red-500 bg-red-100 dark:bg-red-500/20";
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-500/20";
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

  const formatGrowthRate = (rate: number) => {
    const isPositive = rate >= 0;
    return (
      <span className={cn("flex items-center gap-1", isPositive ? "text-green-500" : "text-red-500")}>
        {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {Math.abs(rate)}%
      </span>
    );
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={cn("text-2xl font-bold mb-1", get("text.primary"))}>
              Dashboard Administrativo
            </h1>
            <p className={cn("text-base", get("text.secondary"))}>
              Visão geral dos seus SAAS e clientes
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" icon={<BarChart3 className="w-4 h-4" />}>
              Relatórios
            </Button>
            <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
              Novo SAAS
            </Button>
          </div>
        </div>


      {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total de SAAS"
            value={systemStats.totalSaas}
            change="+1 este mês"
            changeType="positive"
            icon={<Building2 className="w-5 h-5 text-blue-500" />}
          />
          <StatCard
            title="Total de Clientes"
            value={systemStats.totalClients}
            change="+12 esta semana"
            changeType="positive"
            icon={<Users className="w-5 h-5 text-emerald-500" />}
          />
          <StatCard
            title="Receita Mensal"
            value={formatCurrency(systemStats.totalRevenue)}
            change="+8.5% vs. mês anterior"
            changeType="positive"
            icon={<DollarSign className="w-5 h-5 text-green-500" />}
          />
          <StatCard
            title="Usuários Ativos"
            value={systemStats.activeUsers}
            change="+5 hoje"
            changeType="positive"
            icon={<Activity className="w-5 h-5 text-purple-500" />}
          />
        </div>

      {/* SAAS Overview */}
      <Card>
          <CardHeader title="Visão Geral dos SAAS">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Todos os seus sistemas em um só lugar
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {saasList.map((saas, index) => {
                const Icon = saas.icon;
                return (
                  <div key={saas.id} className={cn("relative p-4 rounded-lg border transition-all duration-200 hover:scale-105", get("card"))}>
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={cn("px-2 py-1 text-xs font-medium rounded-full", getStatusColor(saas.status))}>
                          {getStatusText(saas.status)}
                        </span>
                      </div>

                      {/* Header */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white", saas.gradient)}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className={cn("font-semibold text-base", get("text.primary"))}>{saas.name}</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Última atividade: {saas.lastActivity}
                          </p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Clientes</p>
                          <p className={cn("text-base font-semibold", get("text.primary"))}>{saas.activeClients}/{saas.totalClients}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Receita</p>
                          <p className={cn("text-base font-semibold", get("text.primary"))}>{formatCurrency(saas.monthlyRevenue)}</p>
                        </div>
                      </div>

                      {/* Growth Rate */}
                      <div className="mb-3">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Crescimento</p>
                        {formatGrowthRate(saas.growthRate)}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" icon={<Eye className="w-4 h-4" />}>
                          Ver
                        </Button>
                        <Button variant="ghost" size="sm" icon={<Settings className="w-4 h-4" />}>
                          Config
                        </Button>
                        <div className="flex-1" />
                        <IconButton icon={<ArrowUpRight className="w-4 h-4" />} variant="ghost" size="sm" aria-label="Ver detalhes" />
                      </div>
                    </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

      {/* Quick Actions */}
      <Card>
          <CardHeader title="Ações Rápidas">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Operações mais utilizadas
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button variant="secondary" size="sm" fullWidth icon={<Plus className="w-4 h-4" />} iconPosition="left">
                Novo Cliente
              </Button>
              <Button variant="secondary" size="sm" fullWidth icon={<Building2 className="w-4 h-4" />} iconPosition="left">
                Novo SAAS
              </Button>
              <Button variant="secondary" size="sm" fullWidth icon={<BarChart3 className="w-4 h-4" />} iconPosition="left">
                Relatórios
              </Button>
              <Button variant="secondary" size="sm" fullWidth icon={<Settings className="w-4 h-4" />} iconPosition="left">
                Configurações
              </Button>
            </div>
          </CardContent>
        </Card>

      {/* Recent Activity */}
      <Card>
          <CardHeader title="Atividade Recente">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Últimas ações realizadas
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: "Novo cliente criado", saas: "SmartSaúde", time: "2 min atrás", type: "success" },
                { action: "Pagamento recebido", saas: "SmartEduca", time: "15 min atrás", type: "success" },
                { action: "Cliente inativo", saas: "SmartImóveis", time: "1 hora atrás", type: "warning" },
                { action: "Sistema atualizado", saas: "SmartBusiness", time: "2 horas atrás", type: "info" },
                { action: "Backup realizado", saas: "Todos", time: "3 horas atrás", type: "info" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center",
                    activity.type === "success" ? "bg-green-100 dark:bg-green-500/20" :
                    activity.type === "warning" ? "bg-yellow-100 dark:bg-yellow-500/20" :
                    "bg-blue-100 dark:bg-blue-500/20"
                  )}>
                    {activity.type === "success" ? <CheckCircle className="w-3 h-3 text-green-500" /> :
                     activity.type === "warning" ? <AlertTriangle className="w-3 h-3 text-yellow-500" /> :
                     <Activity className="w-3 h-3 text-blue-500" />}
                  </div>
                  <div className="flex-1">
                    <p className={cn("text-sm font-medium", get("text.primary"))}>{activity.action}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{activity.saas}</p>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
    </div>
  );
};

export default SaasDashboard;
