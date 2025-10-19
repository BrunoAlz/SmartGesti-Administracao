import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Users, 
  DollarSign, 
  TrendingUp,
  Activity,
  ArrowLeft,
  Eye,
  MoreHorizontal,
  Search,
  Download
} from "lucide-react";
import { Card, CardHeader, CardContent, StatCard, Button, Table, Input } from "../../../design-system";
import { useThemeClasses } from "../../../design-system";
import { clientsData, saasInfo, type Client } from "../../data/mockClients";

// ================================
// COMPONENTE PRINCIPAL
// ================================

export const ClientsList: React.FC = () => {
  const { saasId } = useParams<{ saasId: string }>();
  const navigate = useNavigate();
  const { get, cn } = useThemeClasses();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const saas = saasInfo[saasId || ""];
  const clients = clientsData[saasId || ""] || [];
  

  const filteredClients = clients.filter(client => {
    // Verificar se client existe e tem as propriedades necessárias
    if (!client || !client.name || !client.email || !client.company) {
      return false;
    }
    
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewClient = (clientId: string) => {
    navigate(`/admin/saas/${saasId}/clients/${clientId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500 bg-green-50 dark:bg-green-500/20";
      case "inactive":
        return "text-red-500 bg-red-50 dark:bg-red-500/20";
      case "suspended":
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
      case "suspended":
        return "Suspenso";
      default:
        return "Desconhecido";
    }
  };

  const columns = [
    {
      key: "name",
      title: "Cliente",
      render: (value: any, client: Client, index: number) => {
        if (!client || !client.name) return <div>-</div>;
        
        return (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div>
              <p className={cn("font-medium", get("text.primary"))}>{client.name}</p>
              <p className={cn("text-sm", get("text.secondary"))}>{client.company || '-'}</p>
            </div>
          </div>
        );
      }
    },
    {
      key: "email",
      title: "Email",
      render: (value: any, client: Client) => (
        <p className={cn("text-sm", get("text.primary"))}>{client?.email || '-'}</p>
      )
    },
    {
      key: "plan",
      title: "Plano",
      render: (value: any, client: Client) => (
        <span className={cn("px-2 py-1 rounded-md text-xs font-medium bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300")}>
          {client?.plan || '-'}
        </span>
      )
    },
    {
      key: "status",
      title: "Status",
      render: (value: any, client: Client) => (
        <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getStatusColor(client?.status || 'inactive'))}>
          {getStatusText(client?.status || 'inactive')}
        </span>
      )
    },
    {
      key: "revenue",
      title: "Receita Mensal",
      render: (value: any, client: Client) => (
        <p className={cn("font-semibold", get("text.primary"))}>
          R$ {client?.monthlyRevenue?.toLocaleString() || '0'}
        </p>
      )
    },
    {
      key: "users",
      title: "Usuários",
      render: (value: any, client: Client) => (
        <div className="text-center">
          <p className={cn("font-semibold", get("text.primary"))}>
            {client?.activeUsers || 0}/{client?.totalUsers || 0}
          </p>
          <p className={cn("text-xs", get("text.secondary"))}>ativos</p>
        </div>
      )
    },
    {
      key: "lastLogin",
      title: "Último Acesso",
      render: (value: any, client: Client) => (
        <p className={cn("text-sm", get("text.secondary"))}>{client?.lastLogin || '-'}</p>
      )
    },
    {
      key: "actions",
      title: "Ações",
      render: (value: any, client: Client) => {
        if (!client?.id) return <div>-</div>;
        
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              icon={<Eye className="w-4 h-4" />}
              onClick={() => handleViewClient(client.id)}
            >
              Ver
            </Button>
            <Button
              variant="ghost"
              icon={<MoreHorizontal className="w-4 h-4" />}
            >
              Menu
            </Button>
          </div>
        );
      }
    }
  ];

  if (!saas) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className={cn("text-2xl font-bold mb-4", get("text.primary"))}>
            SAAS não encontrado
          </h1>
          <Button onClick={() => navigate("/admin/saas")}>
            Voltar para SAAS
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate("/admin/saas")}
          >
            Voltar
          </Button>
          <div>
            <h1 className={cn("text-3xl font-bold mb-2", get("text.primary"))}>
              Clientes - {saas.name}
            </h1>
            <p className={cn("text-lg", get("text.secondary"))}>
              {saas.description}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" icon={<Download className="w-4 h-4" />}>
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total de Clientes"
          value={clients.length}
          change="+2 este mês"
          changeType="positive"
          icon={<Users className="w-6 h-6" />}
        />
        <StatCard
          title="Clientes Ativos"
          value={clients.filter(c => c.status === "active").length}
          change={`${((clients.filter(c => c.status === "active").length / clients.length) * 100).toFixed(1)}% do total`}
          changeType="positive"
          icon={<Activity className="w-6 h-6" />}
        />
        <StatCard
          title="Receita Mensal"
          value={`R$ ${clients.reduce((sum, client) => sum + client.monthlyRevenue, 0).toLocaleString()}`}
          change="+5% vs. mês anterior"
          changeType="positive"
          icon={<DollarSign className="w-6 h-6" />}
        />
        <StatCard
          title="Usuários Ativos"
          value={clients.reduce((sum, client) => sum + client.activeUsers, 0)}
          change="+12 esta semana"
          changeType="positive"
          icon={<TrendingUp className="w-6 h-6" />}
        />
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nome, email ou empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={cn("w-full px-3 py-2 rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500", get("input"))}
              >
                <option value="all">Todos os Status</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
                <option value="suspended">Suspenso</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader title="Lista de Clientes">
          <p className={cn("text-sm", get("text.secondary"))}>
            {filteredClients.length} cliente(s) encontrado(s)
          </p>
        </CardHeader>
        <CardContent>
          <Table
            data={filteredClients}
            columns={columns}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsList;