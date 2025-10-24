import { AdminLayout } from "./AdminLayout";
import FlexibleAdminLayout from "./FlexibleAdminLayout";
import SimpleAdminBreadcrumb from "./SimpleAdminBreadcrumb";
import SimpleAdminNavbar from "./SimpleAdminNavbar";
import EnhancedAdminNavbar from "./EnhancedAdminNavbar";

// Exportação padrão - usar o layout flexível
export default FlexibleAdminLayout;

// Exportações nomeadas
export {
  AdminLayout,            // Layout original (legado)
  FlexibleAdminLayout,    // Novo layout flexível
  SimpleAdminNavbar,      // Navbar original
  EnhancedAdminNavbar,    // Navbar aprimorada com suporte a layouts
  SimpleAdminBreadcrumb,  // Componente de breadcrumbs
};