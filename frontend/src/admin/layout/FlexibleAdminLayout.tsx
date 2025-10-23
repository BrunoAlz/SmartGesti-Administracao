import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAdminAuth, useAdminLayout } from "../hooks/useAdminSimple";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeClasses } from "../../design-system";
import SimpleAdminSidebar from "./components/sidebar/SimpleAdminSidebar";
import EnhancedAdminNavbar from "./EnhancedAdminNavbar";
import SimpleAdminBreadcrumb from "./SimpleAdminBreadcrumb";
import FloatingSidebar from "./components/sidebar/FloatingSidebar";
import type { AdminLayoutProps } from "../types/admin";

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

      if (pathname.includes("/edit/")) {
        return [
          ...baseBreadcrumbs.slice(0, -1),
          {
            label: baseBreadcrumbs[baseBreadcrumbs.length - 1].label,
            path: route,
          },
          { label: "Editar", isActive: true },
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
// COMPONENTE LAYOUT ADMIN FLEXÍVEL
// ================================

export const FlexibleAdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, isLoading, logout } = useAdminAuth();
  const {
    layoutMode,
    sidebarCollapsed,
    breadcrumbs,
    toggleSidebar,
    updateBreadcrumbs,
    isSidebarVisible,
    isSidebarRight,
    isCompactMode,
    isTopNavigation,
    isFloatingMode,
    isFloatingSidebarVisible,
    toggleFloatingSidebar
  } = useAdminLayout();
  
  const theme = useTheme();
  const location = useLocation();

  // Atualizar breadcrumbs baseado na rota atual
  useEffect(() => {
    const newBreadcrumbs = getBreadcrumbsForRoute(location.pathname);
    updateBreadcrumbs(newBreadcrumbs);
  }, [location.pathname, updateBreadcrumbs]);

  // Determinar título da página atual
  const getPageTitle = () => {
    const pathname = location.pathname;
    if (pathname.includes("/clients")) return "Gerenciamento de Clientes";
    if (pathname.includes("/users")) return "Gerenciamento de Usuários";
    if (pathname.includes("/analytics")) return "Analytics e Relatórios";
    if (pathname.includes("/settings")) return "Configurações do Sistema";
    return "Dashboard Administrativo";
  };

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${getThemeClasses(theme.theme, "layout")}`}
      >
        <div className="text-center">
          <div
            className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${
              theme.isDark ? "border-blue-400" : "border-blue-600"
            }`}
          ></div>
          <p className={getThemeClasses(theme.theme, "text.secondary")}>
            Carregando painel administrativo...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-screen flex flex-col ${getThemeClasses(theme.theme, "layout")}`}>
      {/* Navbar sempre visível em cima - com z-index mais alto */}
      <div className="relative z-10">
        <EnhancedAdminNavbar user={user} onLogout={logout} />
      </div>

      {/* Container Principal */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Left - visível apenas no modo padrão ou compact */}
        {(layoutMode === "default" || layoutMode === "compact") && (
          <div className="transition-all duration-300 ease-in-out" style={{ 
            width: layoutMode === "compact" || sidebarCollapsed ? '4rem' : '16rem',
          }}>
            <SimpleAdminSidebar
              isCollapsed={layoutMode === "compact" ? true : sidebarCollapsed}
              onToggle={toggleSidebar}
            />
          </div>
        )}

        {/* Conteúdo Principal - sempre presente, adapta à largura total quando não tem sidebar */}
        <div className={`flex-1 flex flex-col overflow-hidden ${
          layoutMode === "top" || layoutMode === "hidden" ? "w-full" : ""
        }`}>
          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            <div className={`h-full overflow-y-auto ${theme.isDark ? 'scrollbar-dark' : 'scrollbar-light'}`}>
              <div className="p-6">
                {/* Breadcrumbs */}
                <SimpleAdminBreadcrumb
                  items={breadcrumbs}
                  rightTitle={getPageTitle() || undefined}
                />

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
        </div>

        {/* Sidebar Right - visível apenas no modo right */}
        {layoutMode === "right" && (
          <div className="transition-all duration-300 ease-in-out" style={{ 
            width: sidebarCollapsed ? '4rem' : '16rem',
          }}>
            <SimpleAdminSidebar
              isCollapsed={sidebarCollapsed}
              onToggle={toggleSidebar}
              isRightSidebar={true}
            />
          </div>
        )}
        
        {/* Floating Sidebar - visível condicionalmente quando ativada */}
        {layoutMode === "floating" && (
          <FloatingSidebar 
            isVisible={isFloatingSidebarVisible}
            onClose={toggleFloatingSidebar}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={toggleSidebar}
          />
        )}
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
  );
};

export default FlexibleAdminLayout;