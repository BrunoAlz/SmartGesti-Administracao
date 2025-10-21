import { useCallback, useEffect, useState } from "react";

// ================================
// TIPOS PARA LAYOUTS
// ================================

export type LayoutMode = 
  | "default"       // Layout padrão com sidebar esquerda e navbar topo
  | "top"           // Menu no navbar superior, sem sidebar
  | "right"         // Sidebar na direita
  | "floating"      // Sidebar flutuante que aparece apenas quando necessário
  | "compact"       // Sidebar sempre em modo compacto (apenas ícones)
  | "hidden";       // Sidebar completamente escondida

// ================================
// HOOK APRIMORADO PARA GERENCIAR LAYOUTS
// ================================

export const useAdminLayout = () => {
  // Estado para o modo de layout atual
  const [layoutMode, setLayoutMode] = useState<LayoutMode>(() => {
    // Recuperar do localStorage se disponível
    const savedLayout = localStorage.getItem("admin-layout-mode");
    return (savedLayout as LayoutMode) || "default";
  });

  // Estado para o colapso da sidebar
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    const savedLayout = localStorage.getItem("admin-layout-mode");
    const savedState = localStorage.getItem("admin-sidebar-collapsed");
    
    // Se for layout padrão e não tiver preferência salva, começa expandido
    if (savedLayout === "default" || !savedLayout) {
      return savedState === "true" ? true : false;
    }
    
    return savedState === "true";
  });

  // Estado para breadcrumbs
  const [breadcrumbs, setBreadcrumbs] = useState<any[]>([]);

  // Estado para o menu flutuante
  const [isFloatingSidebarVisible, setFloatingSidebarVisible] = useState(false);

  // Função para alternar o estado de colapso da sidebar
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => {
      const newValue = !prev;
      localStorage.setItem("admin-sidebar-collapsed", String(newValue));
      return newValue;
    });
  }, []);

  // Função para mudar o modo de layout
  const changeLayoutMode = useCallback((mode: LayoutMode) => {
    setLayoutMode(mode);
    localStorage.setItem("admin-layout-mode", mode);
    
    // Ajustes específicos dependendo do modo
    if (mode === "compact") {
      setSidebarCollapsed(true);
      localStorage.setItem("admin-sidebar-collapsed", "true");
    } else if (mode === "default") {
      // Quando o layout padrão for escolhido, o menu sempre vem expandido
      setSidebarCollapsed(false);
      localStorage.setItem("admin-sidebar-collapsed", "false");
    }
    
    // Força uma atualização da página depois de um curto intervalo
    // para garantir que todas as mudanças sejam aplicadas corretamente
    window.location.reload();
  }, []);

  // Função para mostrar/esconder a sidebar flutuante
  const toggleFloatingSidebar = useCallback(() => {
    setFloatingSidebarVisible(prev => !prev);
  }, []);

  // Função para atualizar breadcrumbs
  const updateBreadcrumbs = useCallback((items: any[]) => {
    setBreadcrumbs(items);
  }, []);

  // Salvar configurações quando mudam
  useEffect(() => {
    localStorage.setItem("admin-layout-mode", layoutMode);
    
    // Se mudar para o layout padrão, garantir que o menu venha expandido
    if (layoutMode === "default") {
      setSidebarCollapsed(false);
      localStorage.setItem("admin-sidebar-collapsed", "false");
    }
  }, [layoutMode]);

  return {
    layoutMode,
    changeLayoutMode,
    sidebarCollapsed,
    breadcrumbs,
    toggleSidebar,
    updateBreadcrumbs,
    isFloatingSidebarVisible,
    toggleFloatingSidebar,
    
    // Utilidades para verificar o modo atual
    isSidebarVisible: ["default", "right", "compact", "floating"].includes(layoutMode),
    isSidebarRight: layoutMode === "right",
    isCompactMode: layoutMode === "compact" || sidebarCollapsed,
    isTopNavigation: layoutMode === "top",
    isFloatingMode: layoutMode === "floating",
  };
};

export default useAdminLayout;