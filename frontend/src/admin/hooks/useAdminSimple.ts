import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ================================
// HOOK SIMPLIFICADO PARA ADMIN AUTH
// ================================

export const useAdminAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("admin_access_token");
        const userData = localStorage.getItem("admin_user");

        if (!token || !userData) {
          navigate("/login");
          return;
        }

        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("admin_access_token");
    localStorage.removeItem("admin_refresh_token");
    localStorage.removeItem("admin_user");
    navigate("/login");
  };

  return {
    user,
    isLoading,
    logout,
  };
};

// ================================
// HOOK SIMPLIFICADO PARA LAYOUT
// ================================

// Importamos o hook completo do arquivo dedicado
export { useAdminLayout } from './useAdminLayout';
