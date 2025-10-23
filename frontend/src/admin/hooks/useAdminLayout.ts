import { useCallback, useEffect, useState } from "react";

// ================================
// TIPOS PARA LAYOUTS
// ================================

export type LayoutMode = 
  | "default"       // Layout padrão com sidebar esquerda e navbar topo
  | "top"           // Menu no navbar superior, sem sidebar
  | "right";        // Sidebar na direita

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

  // Função para alternar o estado de colapso da sidebar
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prevState => {
      const newValue = !prevState;
      console.log(`Alternando sidebar via botão interno. Estado anterior: ${prevState}, Novo estado: ${newValue}, Modo: ${layoutMode}`);
      
      // Atualizar localStorage com o novo valor
      localStorage.setItem("admin-sidebar-collapsed", String(newValue));
      
      return newValue;
    });
  }, [layoutMode]);

  // Função para mudar o modo de layout
  const changeLayoutMode = useCallback((mode: LayoutMode) => {
    setLayoutMode(mode);
    localStorage.setItem("admin-layout-mode", mode);
    
    // Ajustes específicos dependendo do modo
    if (mode === "default") {
      // Quando o layout padrão for escolhido, o menu sempre vem expandido
      setSidebarCollapsed(false);
      localStorage.setItem("admin-sidebar-collapsed", "false");
    }
    
    // Força uma atualização da página depois de um curto intervalo
    // para garantir que todas as mudanças sejam aplicadas corretamente
    window.location.reload();
  }, []);

  // Removido função para sidebar flutuante

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
  
  // Detector de mudanças no localStorage para sincronização entre abas/janelas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin-sidebar-collapsed') {
        const newValue = e.newValue === 'true';
        if (newValue !== sidebarCollapsed) {
          console.log(`Detectada mudança no localStorage: ${sidebarCollapsed} → ${newValue}`);
          setSidebarCollapsed(newValue);
        }
      } else if (e.key === 'admin-layout-mode') {
        const newMode = e.newValue as LayoutMode;
        if (newMode && newMode !== layoutMode) {
          setLayoutMode(newMode);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [layoutMode, sidebarCollapsed]);

  return {
    layoutMode,
    changeLayoutMode,
    sidebarCollapsed,
    breadcrumbs,
    toggleSidebar,
    updateBreadcrumbs,
    
    // Utilidades para verificar o modo atual
    isSidebarVisible: ["default", "right"].includes(layoutMode),
    isSidebarRight: layoutMode === "right",
    isCompactMode: sidebarCollapsed,
    isTopNavigation: layoutMode === "top",
  };
};

export default useAdminLayout;