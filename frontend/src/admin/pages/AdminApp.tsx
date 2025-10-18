import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AdminLayout } from "../layout/AdminLayout";
import { SimpleDashboard } from "./dashboard/SimpleDashboard";

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
            <Route index element={<SimpleDashboard />} />

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
            <Route
              path="analytics"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">
                    Analytics e Relatórios
                  </h1>
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <p className="text-gray-600">
                      Página em desenvolvimento...
                    </p>
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
