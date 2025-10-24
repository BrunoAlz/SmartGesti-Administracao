import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAdminAuth, useAdminLayout } from "../hooks/useAdminSimple";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeClasses } from "../../design-system";
import SimpleAdminSidebar from "./components/sidebar/SimpleAdminSidebar";
import { NotificationsNavbar } from "./NotificationsNavbar";
import SimpleAdminBreadcrumb from "./SimpleAdminBreadcrumb";
import type { AdminLayoutProps } from "../types/admin";
import { NotificationsProvider } from "./components/notifications/NotificationsContext";

// ================================
// MAPEAMENTO DE BREADCRUMBS
// ================================

const getBreadcrumbsForRoute = (pathname: string) => {
  const breadcrumbMap: Record<
    string,
    Array<{ label: string; path?: string; isActive?: boolean }>
  > = {
    "/admin": [{ label: "Dashboard", isActive: true }],
    "/admin/dashboard": [{ label: "Dashboard", isActive: true }],
    "/admin/clients": [{ label: "Clientes", isActive: true }],
    "/admin/users": [{ label: "Usuários", isActive: true }],
    "/admin/analytics": [{ label: "Analytics", isActive: true }],
    "/admin/settings": [{ label: "Configurações", isActive: true }],
  };

  // Busca exata primeiro
  if (breadcrumbMap[pathname]) {
    return breadcrumbMap[pathname];
  }

  // Busca por prefixos para rotas aninhadas
  for (const route in breadcrumbMap) {
    if (pathname.startsWith(route) && route !== "/admin") {
      const baseBreadcrumbs = breadcrumbMap[route];

      // Adiciona breadcrumbs específicos baseado na rota
      if (pathname.includes("/new")) {
        return [
          ...baseBreadcrumbs.slice(0, -1),
          {
            label: baseBreadcrumbs[baseBreadcrumbs.length - 1].label,
            path: route,
          },
          { label: "Novo", isActive: true },
        ];
      }

      // Para rotas com ID (detalhes)
      if (pathname.match(/\/\d+$/)) {
        return [
          ...baseBreadcrumbs.slice(0, -1),
          {
            label: baseBreadcrumbs[baseBreadcrumbs.length - 1].label,
            path: route,
          },
          { label: "Detalhes", isActive: true },
        ];
      }

      return baseBreadcrumbs;
    }
  }

  return [{ label: "Página", isActive: true }];
};

// ================================
// COMPONENTE LAYOUT ADMIN
// ================================

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, isLoading, logout } = useAdminAuth();
  const { sidebarCollapsed, breadcrumbs, toggleSidebar, updateBreadcrumbs } =
    useAdminLayout();
  const theme = useTheme();
  const location = useLocation();

  // Atualizar breadcrumbs baseado na rota atual
  useEffect(() => {
    const newBreadcrumbs = getBreadcrumbsForRoute(location.pathname);
    updateBreadcrumbs(newBreadcrumbs);
  }, [location.pathname, updateBreadcrumbs]);

  // Determinar título da página atual
  const getPageTitle = () => {
    if (breadcrumbs.length === 0) return "SmartGesTI";
    const currentPage = breadcrumbs[breadcrumbs.length - 1];
    return `${currentPage.label} - SmartGesTI`;
  };

  // Atualizar título da página
  useEffect(() => {
    document.title = getPageTitle();
  }, [breadcrumbs]);

  return (
    <NotificationsProvider>
      <div>
        <div className="h-screen flex flex-col">
          {/* Layout Principal */}
          <div className="flex-1 flex">
            {/* Sidebar */}
            {!isLoading && (
              <SimpleAdminSidebar
                isCollapsed={sidebarCollapsed}
                onToggle={toggleSidebar}
              />
            )}

            {/* Conteúdo Principal */}
            <div className="flex-1 overflow-y-auto">
              {/* Navbar & Breadcrumbs */}
              <NotificationsNavbar
                user={user}
                onLogout={logout}
              />

              {/* Breadcrumbs */}
              <SimpleAdminBreadcrumb items={breadcrumbs} />

              {/* Page Content */}
              <div
                className={`rounded-lg shadow-sm border min-h-[calc(100vh-200px)] ${getThemeClasses(
                  theme.theme,
                  "content"
                )}`}
              >
                {children || <Outlet />}
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: theme.isDark
              ? {
                  background: "rgba(0, 0, 0, 0.8)",
                  color: "#fff",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }
              : {
                  background: "#fff",
                  color: "#374151",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  border: "1px solid #e5e7eb",
                },
            success: {
              iconTheme: {
                primary: theme.isDark ? "#10b981" : "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </div>
    </NotificationsProvider>
  );
};