// ================================
// TIPOS PARA PAINEL ADMINISTRATIVO
// ================================

export interface AdminUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string;
}

export interface AdminMenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  children?: AdminMenuItem[];
  badge?: string | number;
  permission?: string;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}

export interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export interface AdminStats {
  totalTenants: number;
  activeTenants: number;
  totalUsers: number;
  monthlyRevenue: number;
}

// ================================
// INTERFACES DE COMPONENTES
// ================================

export interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export interface AdminNavbarProps {
  user: AdminUser | null;
  onLogout: () => void;
}

export interface AdminBreadcrumbProps {
  items: BreadcrumbItem[];
}

export interface AdminContentProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}
