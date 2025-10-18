# 📖 Sidebar Componentizado - Layout Components

## 🎯 Sobre

Sistema de sidebar modular e componentizado integrado à estrutura de layout do Admin. Oferece suporte completo a submenus, badges, temas e configuração flexível.

## 📁 Localização

```
admin/layout/components/
├── AdminSidebar.tsx         # Componente principal
├── MenuItem.tsx             # Item simples
├── SubMenu.tsx             # Submenus expansíveis  
├── SidebarHeader.tsx       # Header com toggle
├── SidebarFooter.tsx       # Footer
├── useSidebarMenu.ts       # Hook para estado
├── types.ts                # Tipos TypeScript
├── menuConfig.ts           # Configurações
├── index.ts                # Barrel exports
└── README.md               # Esta documentação
```

## 🚀 Como Usar

### Importação

```typescript
import { AdminSidebar, SidebarConfig } from "./components";
// ou
import { AdminSidebar } from "./components/AdminSidebar";
```

### Uso Básico

```typescript
const config: SidebarConfig = {
  branding: { title: "Admin Panel" },
  sections: [
    {
      id: "main",
      items: [
        {
          type: "link",
          id: "dashboard",
          label: "Dashboard",
          path: "/admin",
          icon: Home,
        },
        {
          type: "submenu",
          id: "users",
          label: "Usuários",
          icon: Users,
          children: [
            {
              id: "users-list",
              label: "Lista",
              path: "/admin/users",
              badge: 5
            }
          ]
        }
      ]
    }
  ]
};

<AdminSidebar
  isCollapsed={isCollapsed}
  onToggle={handleToggle}
  config={config}
/>
```

## ✨ Funcionalidades

- **📂 Submenus**: Expansíveis com animações
- **🏷️ Badges**: Numéricos e texto
- **📱 Responsivo**: Collapse/expand suave
- **🎨 Temas**: Integrado com ThemeContext
- **⚙️ Configurável**: Via objeto JSON
- **📊 Separadores**: Organização visual
- **🎯 Estado Ativo**: Indicadores claros

## 🔧 Integração com Layout

O sidebar está integrado com:
- **ThemeContext**: Para temas dark/light
- **React Router**: Para navegação
- **Layout Components**: Estrutura modular

## 📝 Exemplo Completo

```typescript
// SimpleAdminSidebar.tsx
import { AdminSidebar, SidebarConfig } from "./components";

const sidebarConfig: SidebarConfig = {
  branding: { title: "Admin" },
  footer: { showVersion: true },
  sections: [
    {
      id: "main",
      items: [
        { type: "link", id: "dashboard", label: "Dashboard", path: "/admin", icon: Home },
        { type: "link", id: "tenants", label: "Clientes", path: "/admin/tenants", icon: Building2 }
      ]
    }
  ]
};

export const SimpleAdminSidebar = ({ isCollapsed, onToggle }) => (
  <AdminSidebar
    isCollapsed={isCollapsed}
    onToggle={onToggle}
    config={sidebarConfig}
  />
);
```

## 🎨 Customização

### Branding
```typescript
branding: {
  title: "Meu Admin",
  version: "2.0.0",
  logo: "/images/logo.png"
}
```

### Footer
```typescript
footer: {
  showVersion: true,
  customContent: <div>Conteúdo customizado</div>
}
```

### Badges
```typescript
badge: 42              // Numérico
badge: "NEW"           // Texto
badge: count > 0 ? count : undefined  // Condicional
```

---

**💡 Dica**: Este sistema substitui completamente o sidebar antigo mantendo compatibilidade total!
