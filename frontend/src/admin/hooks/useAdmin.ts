import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import AdminAuthApiService from "../services/auth/AdminAuthApiService";
import type { AdminUser, BreadcrumbItem } from "../types/admin";

// ================================
// HOOK PARA ESTADO DO ADMIN
// ================================

export const useAdminAuth = () => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Verificar se usuário está logado
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("admin_access_token");
        if (!token) {
          navigate("/login");
          return;
        }

        // Buscar dados do perfil
        const userData = await AdminAuthApiService.getCurrentAdminUser();
        setUser(userData);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        localStorage.removeItem("admin_access_token");
        localStorage.removeItem("admin_refresh_token");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const logout = async () => {
    try {
      await AdminAuthApiService.logout();
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      localStorage.removeItem("admin_access_token");
      localStorage.removeItem("admin_refresh_token");
      navigate("/login");
    }
  };

  return {
    user,
    isLoading,
    logout,
  };
};

// ================================
// HOOK PARA ESTADO DO LAYOUT
// ================================

export const useAdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const updateBreadcrumbs = (items: BreadcrumbItem[]) => {
    setBreadcrumbs(items);
  };

  return {
    sidebarCollapsed,
    breadcrumbs,
    toggleSidebar,
    updateBreadcrumbs,
  };
};

// ================================
// HOOK PARA DADOS DO DASHBOARD
// ================================

export const useAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalTenants: 0,
    activeTenants: 0,
    totalUsers: 0,
    monthlyRevenue: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Mock data por enquanto
        setTimeout(() => {
          setStats({
            totalTenants: 24,
            activeTenants: 22,
            totalUsers: 156,
            monthlyRevenue: 12450,
          });
          setIsLoadingStats(false);
        }, 1000);
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
        setIsLoadingStats(false);
      }
    };

    loadStats();
  }, []);

  return {
    stats,
    isLoadingStats,
  };
};
