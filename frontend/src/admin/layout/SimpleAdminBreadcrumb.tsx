import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeClasses } from "../../design-system";

// ================================
// TIPOS
// ================================

interface SimpleBreadcrumbProps {
  items: any[];
  rightTitle?: string;
}

// ================================
// COMPONENTE BREADCRUMB SIMPLES
// ================================

export const SimpleAdminBreadcrumb: React.FC<SimpleBreadcrumbProps> = ({
  items,
  rightTitle,
}) => {
  const theme = useTheme();

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between mb-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2">
        {/* Home Icon */}
        <Link
          to="/admin"
          className={`p-1 rounded hover:${theme.isDark ? "bg-white/10" : "bg-gray-100"} transition-colors`}
        >
          <Home
            className={`w-4 h-4 ${getThemeClasses(theme.theme, "text.muted")}`}
          />
        </Link>

        {/* Breadcrumb Items */}
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight
              className={`w-4 h-4 ${getThemeClasses(theme.theme, "text.muted")}`}
            />

            {item.path && !item.isActive ? (
              <Link
                to={item.path}
                className={`text-sm font-medium transition-colors hover:${getThemeClasses(
                  theme.theme,
                  "text.primary"
                )} ${getThemeClasses(theme.theme, "text.secondary")}`}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`text-sm font-medium ${
                  item.isActive
                    ? getThemeClasses(theme.theme, "text.primary")
                    : getThemeClasses(theme.theme, "text.secondary")
                }`}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Right Title */}
      {rightTitle && (
        <h1
          className={`text-2xl font-bold ${getThemeClasses(theme.theme, "text.primary")}`}
        >
          {rightTitle}
        </h1>
      )}
    </nav>
  );
};

export default SimpleAdminBreadcrumb;
