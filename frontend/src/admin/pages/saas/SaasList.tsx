import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { Card, CardHeader, CardContent, StatCard, Button } from "../../../design-system";
import { useThemeClasses } from "../../../design-system";

// ================================
// TIPOS E INTERFACES
// ================================

interface SaasData {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  totalClients: number;
  activeClients: number;
  monthlyRevenue: number;
  growthRate: number;
  lastActivity: string;
  status: "active" | "inactive" | "maintenance";
}

// ================================
// DADOS MOCKADOS
// ================================

const saasData: SaasData[] = [
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
// COMPONENTE PRINCIPAL
// ================================

export const SaasList: React.FC = () => {
  const navigate = useNavigate();
  const { get, cn } = useThemeClasses();

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
      case "inactive":
        return "Inativo";
      case "maintenance":
        return "Manutenção";
      default:
        return "Desconhecido";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={cn("text-3xl font-bold mb-2", get("text.primary"))}>
            SAAS Cadastrados
          </h1>
          <p className={cn("text-lg", get("text.secondary"))}>
            Gerencie todos os sistemas SAAS disponíveis
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total de SAAS"
          value={saasData.length}
          change="+1 este mês"
          changeType="positive"
          icon={<Building2 className="w-6 h-6" />}
        />
        <StatCard
          title="Total de Clientes"
          value={saasData.reduce((sum, saas) => sum + saas.totalClients, 0)}
          change="+12 esta semana"
          changeType="positive"
          icon={<Users className="w-6 h-6" />}
        />
        <StatCard
          title="Receita Mensal"
          value={`R$ ${saasData.reduce((sum, saas) => sum + saas.monthlyRevenue, 0).toLocaleString()}`}
          change="+8.5% vs. mês anterior"
          changeType="positive"
          icon={<DollarSign className="w-6 h-6" />}
        />
        <StatCard
          title="Taxa de Crescimento"
          value={`${(saasData.reduce((sum, saas) => sum + saas.growthRate, 0) / saasData.length).toFixed(1)}%`}
          change="Média geral"
          changeType="positive"
          icon={<TrendingUp className="w-6 h-6" />}
        />
      </div>

      {/* SAAS Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <span className={cn("text-sm", get("text.secondary"))}>Última Atividade:</span>
                    <span className={cn("text-sm", get("text.muted"))}>
                      {saas.lastActivity}
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
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
    </div>
  );
};

export default SaasList;
