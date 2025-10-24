import React from "react";
import { Settings, LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeClasses } from "../../design-system";
import { NotificationsContainer } from "./components/notifications/NotificationsContainer";

// ================================
// TIPOS
// ================================

interface SimpleAdminNavbarProps {
  user: any;
  onLogout: () => void;
}

// ================================
// COMPONENTE NAVBAR SIMPLES
// ================================

export const SimpleAdminNavbar: React.FC<SimpleAdminNavbarProps> = ({
  user,
  onLogout,
}) => {
  const theme = useTheme();

  return (
    <div
      className={`h-16 border-b flex items-center justify-between px-6 ${getThemeClasses(
        theme.theme,
        "navbar"
      )}`}
    >
      {/* Logo/Title */}
      <div className="flex items-center space-x-4">
        <h1
          className={`text-xl font-bold ${getThemeClasses(theme.theme, "text.primary")}`}
        >
          SmartGesTI Admin
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={theme.toggleTheme}
          className={`p-2 rounded-lg transition-all duration-200 ${getThemeClasses(
            theme.theme,
            "button.secondary"
          )}`}
          title={theme.isDark ? "Ativar modo claro" : "Ativar modo escuro"}
        >
          {theme.isDark ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* Notifications */}
        <NotificationsContainer />

        {/* Settings */}
        <button
          className={`p-2 rounded-lg transition-all duration-200 ${getThemeClasses(
            theme.theme,
            "button.secondary"
          )}`}
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* User Menu */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p
              className={`text-sm font-medium ${getThemeClasses(theme.theme, "text.primary")}`}
            >
              {user?.first_name || "Admin"} {user?.last_name || "User"}
            </p>
            <p
              className={`text-xs ${getThemeClasses(theme.theme, "text.secondary")}`}
            >
              {user?.email || "admin@smartgesti.com.br"}
            </p>
          </div>

          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              theme.isDark ? "bg-blue-500/20 backdrop-blur-sm" : "bg-blue-100"
            }`}
          >
            <User
              className={`w-5 h-5 ${
                theme.isDark ? "text-blue-400" : "text-blue-600"
              }`}
            />
          </div>

          <button
            onClick={onLogout}
            className={`p-2 rounded-lg transition-all duration-200 hover:bg-red-500/20 ${getThemeClasses(
              theme.theme,
              "text.muted"
            )} hover:text-red-400`}
            title="Sair"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleAdminNavbar;
