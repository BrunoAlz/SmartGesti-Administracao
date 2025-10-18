import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useAdminDashboard } from "../../hooks/useAdmin";

// ================================
// COMPONENTE CARD DE ESTATÍSTICA
// ================================

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  changeType = "neutral",
  isLoading = false,
}) => {
  const changeColors = {
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-gray-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          {isLoading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
          ) : (
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          )}
          {change && !isLoading && (
            <p className={`text-sm ${changeColors[changeType]}`}>{change}</p>
          )}
        </div>
        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

// ================================
// COMPONENTE ATIVIDADE RECENTE
// ================================

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: "user_created",
      message: "Novo usuário cadastrado: Dr. João Silva",
      timestamp: "5 minutos atrás",
      icon: <Users className="w-4 h-4 text-blue-600" />,
    },
    {
      id: 2,
      type: "tenant_activated",
      message: "Tenant ativado: Clínica Odonto Center",
      timestamp: "15 minutos atrás",
      icon: <Building2 className="w-4 h-4 text-green-600" />,
    },
    {
      id: 3,
      type: "payment_received",
      message: "Pagamento recebido: R$ 299,00",
      timestamp: "1 hora atrás",
      icon: <DollarSign className="w-4 h-4 text-green-600" />,
    },
    {
      id: 4,
      type: "system_alert",
      message: "Alto uso de CPU detectado no servidor",
      timestamp: "2 horas atrás",
      icon: <AlertCircle className="w-4 h-4 text-yellow-600" />,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Atividade Recente
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
        Ver todas as atividades
      </button>
    </div>
  );
};

// ================================
// COMPONENTE STATUS DO SISTEMA
// ================================

const SystemStatus: React.FC = () => {
  const services = [
    { name: "API Principal", status: "online", uptime: "99.9%" },
    { name: "Base de Dados", status: "online", uptime: "99.8%" },
    { name: "Processamento de Pagamentos", status: "online", uptime: "99.5%" },
    { name: "Notificações Email", status: "maintenance", uptime: "98.2%" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "maintenance":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Online";
      case "maintenance":
        return "Manutenção";
      default:
        return "Offline";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Status do Sistema
      </h3>
      <div className="space-y-3">
        {services.map((service) => (
          <div key={service.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(service.status)}
              <span className="text-sm text-gray-900">{service.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">{service.uptime}</span>
              <span className="text-xs font-medium text-gray-900">
                {getStatusText(service.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
        Ver detalhes do sistema
      </button>
    </div>
  );
};

// ================================
// COMPONENTE DASHBOARD PRINCIPAL
// ================================

export const AdminDashboard: React.FC = () => {
  const { stats, isLoadingStats } = useAdminDashboard();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Dashboard Administrativo
        </h1>
        <p className="text-gray-600">Visão geral do sistema SmartGesTI</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total de Tenants"
          value={stats.totalTenants}
          icon={<Building2 className="w-6 h-6 text-blue-600" />}
          change="+2 este mês"
          changeType="positive"
          isLoading={isLoadingStats}
        />
        <StatCard
          title="Tenants Ativos"
          value={stats.activeTenants}
          icon={<Activity className="w-6 h-6 text-green-600" />}
          change="91.7% do total"
          changeType="positive"
          isLoading={isLoadingStats}
        />
        <StatCard
          title="Total de Usuários"
          value={stats.totalUsers}
          icon={<Users className="w-6 h-6 text-purple-600" />}
          change="+12 esta semana"
          changeType="positive"
          isLoading={isLoadingStats}
        />
        <StatCard
          title="Receita Mensal"
          value={`R$ ${stats.monthlyRevenue.toLocaleString()}`}
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          change="+8.5% vs. mês anterior"
          changeType="positive"
          isLoading={isLoadingStats}
        />
      </div>

      {/* Gráficos e Tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Atividade Recente */}
        <RecentActivity />

        {/* Status do Sistema */}
        <SystemStatus />
      </div>

      {/* Seção de Ações Rápidas */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Ações Rápidas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Building2 className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">Criar Tenant</h4>
            <p className="text-sm text-gray-500">Adicionar novo cliente</p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Users className="w-6 h-6 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">Gerenciar Usuários</h4>
            <p className="text-sm text-gray-500">
              Visualizar todos os usuários
            </p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
            <h4 className="font-medium text-gray-900">Ver Relatórios</h4>
            <p className="text-sm text-gray-500">Analytics detalhados</p>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <AlertCircle className="w-6 h-6 text-yellow-600 mb-2" />
            <h4 className="font-medium text-gray-900">Sistema</h4>
            <p className="text-sm text-gray-500">Monitorar status</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
