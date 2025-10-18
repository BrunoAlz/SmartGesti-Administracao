import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import type { AdminBreadcrumbProps } from "../../types/admin";

// ================================
// COMPONENTE BREADCRUMB ADMIN
// ================================

export const AdminBreadcrumb: React.FC<AdminBreadcrumbProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      {/* Home sempre presente */}
      <Link
        to="/admin/dashboard"
        className="flex items-center hover:text-blue-600 transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-gray-400" />

          {item.path && !item.isActive ? (
            <Link
              to={item.path}
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className={item.isActive ? "text-gray-900 font-medium" : ""}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default AdminBreadcrumb;
