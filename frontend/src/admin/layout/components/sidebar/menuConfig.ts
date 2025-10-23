import { SidebarConfig } from "./types";

// ================================
// CONFIGURAÇÃO PRINCIPAL DO MENU ADMIN
// ================================

import {
  Home,
  Building2,
  CreditCard,
  Settings,
  FileText,
  Database,
  List,
  CheckCircle,
  XCircle,
  RefreshCw,
  DollarSign,
  TrendingUp,
  AlertCircle,
  User,
  Palette,
  Square,
  MousePointer,
  Type,
  Layout,
  Bell,
  Table,
  Calendar,
  BarChart,
  Loader2,
  ChevronDown,
} from "lucide-react";

// ================================
// CONFIGURAÇÃO PRINCIPAL DO MENU ADMIN
// ================================

export const adminSidebarConfig: SidebarConfig = {
  branding: {
    title: "SmartGesTI",
    version: "1.0.0",
  },
  footer: {
    showVersion: true,
  },
  sections: [
    // ================================
    // ANALYTICS
    // ================================
    {
      id: "analytics",
      label: "Analytics",
      items: [
        {
          type: "link",
          id: "dashboard",
          label: "Dashboard",
          path: "/admin",
          icon: Home,
        },
        {
          type: "link",
          id: "most-used",
          label: "Mais Usados",
          path: "/admin/analytics/most-used",
          icon: TrendingUp,
        },
      ],
    },

    // ================================
    // SEÇÃO GESTÃO
    // ================================
    {
      id: "management",
      label: "Gestão",
      items: [
        {
          type: "submenu",
          id: "clients",
          label: "Clientes",
          icon: Building2,
          children: [
            {
              id: "saas-list",
              label: "Ver SAAS",
              path: "/admin/saas",
              icon: List,
            },
          ],
        },
      ],
    },

    // ================================
    // SEÇÃO FINANCEIRO
    // ================================
    {
      id: "financial",
      label: "Financeiro",
      items: [
        {
          type: "submenu",
          id: "payments",
          label: "Pagamentos",
          icon: CreditCard,
          children: [
            {
              id: "payments-history",
              label: "Histórico",
              path: "/admin/payments",
              icon: List,
            },
            {
              id: "payments-pending",
              label: "Pendentes",
              path: "/admin/payments/pending",
              icon: AlertCircle,
              badge: 12, // Exemplo de badge dinâmico
            },
            {
              id: "payments-approved",
              label: "Aprovados",
              path: "/admin/payments/approved",
              icon: CheckCircle,
            },
            {
              id: "payments-refunds",
              label: "Reembolsos",
              path: "/admin/payments/refunds",
              icon: RefreshCw,
            },
            {
              id: "payments-debtors",
              label: "Devedores",
              path: "/admin/payments/debtors",
              icon: XCircle,
            },
            {
              id: "payment-profile",
              label: "Perfil Pagador",
              path: "/admin/payments/profile",
              icon: User,
            },
          ],
        },
        {
          type: "link",
          id: "plans",
          label: "Planos",
          path: "/admin/plans",
          icon: DollarSign,
        },
        {
          type: "link",
          id: "reports",
          label: "Relatórios",
          path: "/admin/reports",
          icon: FileText,
        },
      ],
    },

    // ================================
    // SEPARADOR
    // ================================
    {
      id: "separator-1",
      items: [
        {
          type: "separator",
          id: "sep-1",
          label: "Desenvolvimento",
        },
      ],
    },

    // ================================
    // SEÇÃO UI KIT
    // ================================
    {
      id: "ui-kit",
      label: "UI Kit",
      items: [
        {
          type: "submenu",
          id: "ui-components",
          label: "Componentes",
          icon: Palette,
          children: [
            {
              id: "ui-buttons",
              label: "Botões",
              path: "/admin/ui-kit/buttons",
              icon: MousePointer,
            },
            {
              id: "ui-cards",
              label: "Cards",
              path: "/admin/ui-kit/cards",
              icon: Square,
            },
            {
              id: "ui-badges",
              label: "Badges",
              path: "/admin/ui-kit/badges",
              icon: CheckCircle,
            },
            {
              id: "ui-inputs",
              label: "Inputs & Forms",
              path: "/admin/ui-kit/inputs",
              icon: Type,
            },
            {
              id: "ui-loading",
              label: "Loading",
              path: "/admin/ui-kit/loading",
              icon: Loader2,
            },
            {
              id: "ui-accordion",
              label: "Accordion",
              path: "/admin/ui-kit/accordion",
              icon: ChevronDown,
            },
            {
              id: "ui-layout",
              label: "Layout",
              path: "/admin/ui-kit/layout",
              icon: Layout,
            },
            {
              id: "ui-notifications",
              label: "Notificações",
              path: "/admin/ui-kit/notifications",
              icon: Bell,
            },
            {
              id: "ui-tables",
              label: "Tabelas",
              path: "/admin/ui-kit/tables",
              icon: Table,
            },
            {
              id: "ui-animations",
              label: "Animações",
              path: "/admin/ui-kit/animations",
              icon: BarChart,
            },
            {
              id: "ui-typography",
              label: "Tipografia",
              path: "/admin/ui-kit/typography",
              icon: Type,
            },
          ],
        },
        {
          type: "link",
          id: "design-tokens",
          label: "Design Tokens",
          path: "/admin/ui-kit/tokens",
          icon: Palette,
        },
        {
          type: "link",
          id: "theme-colors",
          label: "Cores & Temas",
          path: "/admin/ui-kit/colors",
          icon: Palette,
        },
      ],
    },

    // ================================
    // SEPARADOR
    // ================================
    {
      id: "separator-2",
      items: [
        {
          type: "separator",
          id: "sep-2",
          label: "Sistema",
        },
      ],
    },

    // ================================
    // SEÇÃO SISTEMA
    // ================================
    {
      id: "system",
      items: [
        {
          type: "submenu",
          id: "settings",
          label: "Configurações",
          icon: Settings,
          children: [
            {
              id: "settings-backup",
              label: "Backup e Restore",
              path: "/admin/settings/backup",
              icon: Database,
            },
          ],
        },
        {
          type: "link",
          id: "logs",
          label: "Logs do Sistema",
          path: "/admin/logs",
          icon: FileText,
        },
      ],
    },
  ],
};
