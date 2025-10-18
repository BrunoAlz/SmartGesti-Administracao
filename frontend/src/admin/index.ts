// ================================
// EXPORTAÇÕES PRINCIPAIS DO MÓDULO ADMIN
// ================================

// Páginas
export { AdminApp } from "./pages/AdminApp";
export { AdminDashboard } from "./pages/dashboard/AdminDashboard";

// Layout
export { AdminLayout } from "./layout/AdminLayout";

// Hooks
export {
  useAdminAuth,
  useAdminLayout,
  useAdminDashboard,
} from "./hooks/useAdmin";

// Types
export type { AdminUser, BreadcrumbItem } from "./types/admin";

// ================================
// CONFIGURAÇÃO PADRÃO DO MÓDULO
// ================================

export const ADMIN_CONFIG = {
  APP_NAME: "SmartGesTI Admin",
  VERSION: "1.0.0",
  BASE_PATH: "/admin",
  DEFAULT_ROUTE: "/admin",
  LOGIN_ROUTE: "/admin/login",
} as const;
