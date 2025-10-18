import React from "react";
import type { AdminContentProps } from "../../types/admin";

// ================================
// COMPONENTE CONTEÚDO ADMIN
// ================================

export const AdminContent: React.FC<AdminContentProps> = ({
  children,
  title,
  subtitle,
  actions,
}) => {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-6">
        {/* Header da Página */}
        {(title || subtitle || actions) && (
          <div className="flex items-start justify-between mb-6">
            <div>
              {title && (
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  {title}
                </h1>
              )}
              {subtitle && <p className="text-gray-600">{subtitle}</p>}
            </div>

            {actions && (
              <div className="flex items-center space-x-3">{actions}</div>
            )}
          </div>
        )}

        {/* Conteúdo Principal */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[calc(100vh-200px)]">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AdminContent;
