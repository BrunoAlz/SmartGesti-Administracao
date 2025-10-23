import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/admin/contexts/ThemeContext";
import AdminLayout from "../layout"; // Importando o layout flexível
import { AdminDashboard } from "./dashboard/AdminDashboard";
import { Reports } from "./reports/Reports";
import { ClientsManagement } from "./clients/ClientsManagement";
import { CreateClient } from "./clients/CreateClient";
import { ClientDetails } from "./clients/ClientDetails";
import { SaasList } from "./saas/SaasList";
import { ClientsList } from "./saas/ClientsList";
import { ClientProfile } from "./saas/ClientProfile";

// UI Kit Pages
import { ButtonsUIKit, BadgesUIKit, InputsUIKit, TypographyUIKit, LayoutsUIKit, AccordionUIKit } from "./ui-kit";
import CardsUIKit from "./ui-kit/CardsUIKit";
import AlertsUIKit from "./ui-kit/AlertsUIKit";
import LoadingUIKit from "./ui-kit/LoadingUIKit";

// ================================
// COMPONENT ROTA PROTEGIDA
// ================================

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("admin_access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// ================================
// COMPONENTE PRINCIPAL
// ================================

export const AdminApp: React.FC = () => {
  return (
    <ThemeProvider>
      <ProtectedRoute>
        <AdminLayout>
          <Routes>
            {/* Dashboard Principal */}
            <Route index element={<AdminDashboard />} />

            {/* Gerenciamento de SAAS */}
            <Route path="saas" element={<SaasList />} />
            <Route path="saas/:saasId/clients" element={<ClientsList />} />
            <Route path="saas/:saasId/clients/:clientId" element={<ClientProfile />} />

            {/* Gerenciamento de Clientes (Legado) */}
            <Route path="clients" element={<ClientsManagement />} />
            <Route path="clients/new" element={<CreateClient />} />
            <Route path="clients/:id" element={<ClientDetails />} />

            {/* Gerenciamento de Usuários */}
            <Route
              path="users"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">
                    Gerenciamento de Usuários
                  </h1>
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <p className="text-gray-600">
                      Página em desenvolvimento...
                    </p>
                  </div>
                </div>
              }
            />

            {/* Analytics e Relatórios */}
            <Route path="analytics" element={<Reports />} />

            {/* UI Kit */}
            <Route path="ui-kit/buttons" element={<ButtonsUIKit />} />
            <Route path="ui-kit/badges" element={<BadgesUIKit />} />
            <Route path="ui-kit/cards" element={<CardsUIKit />} />
            <Route path="ui-kit/inputs" element={<InputsUIKit />} />
            <Route path="ui-kit/alerts" element={<AlertsUIKit />} />
            <Route path="ui-kit/loading" element={<LoadingUIKit />} />
            <Route path="ui-kit/typography" element={<TypographyUIKit />} />
            <Route 
              path="ui-kit/layout" 
              element={<LayoutsUIKit />} 
            />
            <Route 
              path="ui-kit/notifications" 
              element={<AlertsUIKit />} 
            />
            <Route 
              path="ui-kit/accordion" 
              element={<AccordionUIKit />} 
            />
            <Route 
              path="ui-kit/tables" 
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Tabelas</h1>
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <p className="text-gray-600">Página em desenvolvimento...</p>
                  </div>
                </div>
              } 
            />
            <Route 
              path="ui-kit/animations" 
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Animações</h1>
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <p className="text-gray-600">Página em desenvolvimento...</p>
                  </div>
                </div>
              } 
            />
            <Route 
              path="ui-kit/tokens" 
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Design Tokens</h1>
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <p className="text-gray-600">Página em desenvolvimento...</p>
                  </div>
                </div>
              } 
            />
            <Route 
              path="ui-kit/colors" 
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Cores & Temas</h1>
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <p className="text-gray-600">Página em desenvolvimento...</p>
                  </div>
                </div>
              } 
            />

            {/* Configurações */}
            <Route
              path="settings"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">
                    Configurações do Sistema
                  </h1>
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <p className="text-gray-600">
                      Página em desenvolvimento...
                    </p>
                  </div>
                </div>
              }
            />

            {/* Redirect padrão */}
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </AdminLayout>
      </ProtectedRoute>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#333",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </ThemeProvider>
  );
};

export default AdminApp;
