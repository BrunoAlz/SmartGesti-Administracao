import { useState, useEffect } from "react";
// import { AdminAuthApiService } from '../services/AdminAuthApiService';

export interface AdminDashboardStats {
  totalTenants: number;
  activeTenants: number;
  totalUsers: number;
  monthlyRevenue: number;
  newTenantsThisMonth: number;
  newUsersThisWeek: number;
  systemUptime: number;
  pendingPayments: number;
}

export interface AdminActivity {
  id: number;
  type:
    | "user_created"
    | "tenant_activated"
    | "payment_received"
    | "system_alert"
    | "tenant_created";
  message: string;
  timestamp: string;
  details?: any;
}

export interface AdminSystemStatus {
  service: string;
  status: "online" | "offline" | "maintenance";
  uptime: string;
  lastCheck: string;
}

export const useAdminDashboard = () => {
  const [stats, setStats] = useState<AdminDashboardStats>({
    totalTenants: 0,
    activeTenants: 0,
    totalUsers: 0,
    monthlyRevenue: 0,
    newTenantsThisMonth: 0,
    newUsersThisWeek: 0,
    systemUptime: 0,
    pendingPayments: 0,
  });

  const [activities, setActivities] = useState<AdminActivity[]>([]);
  const [systemStatus, setSystemStatus] = useState<AdminSystemStatus[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);
  const [isLoadingSystemStatus, setIsLoadingSystemStatus] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ================================
  // FUNÇÃO PARA BUSCAR ESTATÍSTICAS
  // ================================

  const fetchDashboardStats = async () => {
    try {
      setIsLoadingStats(true);
      setError(null);

      // TODO: Implementar endpoint real no backend
      // const response = await AdminAuthApiService.getDashboardStats();

      // Mock data por enquanto
      const mockStats: AdminDashboardStats = {
        totalTenants: 24,
        activeTenants: 22,
        totalUsers: 156,
        monthlyRevenue: 47500,
        newTenantsThisMonth: 2,
        newUsersThisWeek: 12,
        systemUptime: 99.9,
        pendingPayments: 3,
      };

      setStats(mockStats);
    } catch (err) {
      setError("Erro ao carregar estatísticas do dashboard");
      console.error("Erro ao buscar estatísticas:", err);
    } finally {
      setIsLoadingStats(false);
    }
  };

  // ================================
  // FUNÇÃO PARA BUSCAR ATIVIDADES
  // ================================

  const fetchRecentActivities = async () => {
    try {
      setIsLoadingActivities(true);
      setError(null);

      // TODO: Implementar endpoint real no backend
      // const response = await AdminAuthApiService.getRecentActivities();

      // Mock data por enquanto
      const mockActivities: AdminActivity[] = [
        {
          id: 1,
          type: "user_created",
          message: "Novo usuário cadastrado: Dr. João Silva",
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        },
        {
          id: 2,
          type: "tenant_activated",
          message: "Tenant ativado: Clínica Odonto Center",
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        },
        {
          id: 3,
          type: "payment_received",
          message: "Pagamento recebido: R$ 299,00",
          timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        },
        {
          id: 4,
          type: "system_alert",
          message: "Alto uso de CPU detectado no servidor",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
      ];

      setActivities(mockActivities);
    } catch (err) {
      setError("Erro ao carregar atividades recentes");
      console.error("Erro ao buscar atividades:", err);
    } finally {
      setIsLoadingActivities(false);
    }
  };

  // ================================
  // FUNÇÃO PARA BUSCAR STATUS DO SISTEMA
  // ================================

  const fetchSystemStatus = async () => {
    try {
      setIsLoadingSystemStatus(true);
      setError(null);

      // TODO: Implementar endpoint real no backend
      // const response = await AdminAuthApiService.getSystemStatus();

      // Mock data por enquanto
      const mockSystemStatus: AdminSystemStatus[] = [
        {
          service: "API Principal",
          status: "online",
          uptime: "99.9%",
          lastCheck: new Date().toISOString(),
        },
        {
          service: "Base de Dados",
          status: "online",
          uptime: "99.8%",
          lastCheck: new Date().toISOString(),
        },
        {
          service: "Processamento de Pagamentos",
          status: "online",
          uptime: "99.5%",
          lastCheck: new Date().toISOString(),
        },
        {
          service: "Notificações Email",
          status: "maintenance",
          uptime: "98.2%",
          lastCheck: new Date().toISOString(),
        },
      ];

      setSystemStatus(mockSystemStatus);
    } catch (err) {
      setError("Erro ao carregar status do sistema");
      console.error("Erro ao buscar status do sistema:", err);
    } finally {
      setIsLoadingSystemStatus(false);
    }
  };

  // ================================
  // FUNÇÃO PARA ATUALIZAR DADOS
  // ================================

  const refreshDashboard = async () => {
    await Promise.all([
      fetchDashboardStats(),
      fetchRecentActivities(),
      fetchSystemStatus(),
    ]);
  };

  // ================================
  // EFEITO PARA CARREGAR DADOS INICIAIS
  // ================================

  useEffect(() => {
    refreshDashboard();
  }, []);

  // ================================
  // FUNÇÃO PARA FORMATAR TIMESTAMP
  // ================================

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) {
      return "Agora mesmo";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""} atrás`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hora${hours > 1 ? "s" : ""} atrás`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} dia${days > 1 ? "s" : ""} atrás`;
    }
  };

  // ================================
  // FUNÇÃO PARA CALCULAR PORCENTAGEM
  // ================================

  const calculatePercentage = (value: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100 * 10) / 10;
  };

  return {
    // Estados
    stats,
    activities,
    systemStatus,

    // Estados de carregamento
    isLoadingStats,
    isLoadingActivities,
    isLoadingSystemStatus,
    isLoading: isLoadingStats || isLoadingActivities || isLoadingSystemStatus,

    // Erro
    error,

    // Funções
    refreshDashboard,
    fetchDashboardStats,
    fetchRecentActivities,
    fetchSystemStatus,

    // Funções utilitárias
    formatTimestamp,
    calculatePercentage,
  };
};
