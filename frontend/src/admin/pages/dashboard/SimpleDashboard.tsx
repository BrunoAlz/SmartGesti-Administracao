import React from "react";
import {
  Users,
  Server,
  Activity,
  Settings,
  TrendingUp,
  Shield,
  Database,
  Clock,
} from "lucide-react";
import { useTheme, getThemeClasses } from "../../contexts/ThemeContext";

// ================================
// COMPONENTE DASHBOARD ADMINISTRATIVO
// ================================

export const SimpleDashboard: React.FC = () => {
  const theme = useTheme();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1
          className={`text-2xl font-bold mb-2 ${getThemeClasses(theme.theme, "text.primary")}`}
        >
          Dashboard Administrativo
        </h1>
        <p className={getThemeClasses(theme.theme, "text.secondary")}>
          Visão geral do sistema SmartGesTI
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          className={`rounded-lg p-6 transition-all duration-200 hover:scale-105 ${getThemeClasses(
            theme.theme,
            "card"
          )}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p
                className={`text-sm font-medium mb-1 ${getThemeClasses(theme.theme, "text.secondary")}`}
              >
                Usuários Ativos
              </p>
              <p
                className={`text-3xl font-bold mb-2 ${getThemeClasses(theme.theme, "text.primary")}`}
              >
                156
              </p>
              <p className="text-sm text-green-400">+12 esta semana</p>
            </div>
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                theme.isDark ? "bg-blue-500/20 backdrop-blur-sm" : "bg-blue-50"
              }`}
            >
              <Users
                className={`w-6 h-6 ${
                  theme.isDark ? "text-blue-400" : "text-blue-600"
                }`}
              />
            </div>
          </div>
        </div>

        <div
          className={`rounded-lg p-6 transition-all duration-200 hover:scale-105 ${getThemeClasses(
            theme.theme,
            "card"
          )}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p
                className={`text-sm font-medium mb-1 ${getThemeClasses(theme.theme, "text.secondary")}`}
              >
                Status do Sistema
              </p>
              <p
                className={`text-3xl font-bold mb-2 ${getThemeClasses(theme.theme, "text.primary")}`}
              >
                99.9%
              </p>
              <p className="text-sm text-green-400">Uptime excelente</p>
            </div>
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                theme.isDark
                  ? "bg-green-500/20 backdrop-blur-sm"
                  : "bg-green-50"
              }`}
            >
              <Activity
                className={`w-6 h-6 ${
                  theme.isDark ? "text-green-400" : "text-green-600"
                }`}
              />
            </div>
          </div>
        </div>

        <div
          className={`rounded-lg p-6 transition-all duration-200 hover:scale-105 ${getThemeClasses(
            theme.theme,
            "card"
          )}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p
                className={`text-sm font-medium mb-1 ${getThemeClasses(theme.theme, "text.secondary")}`}
              >
                Requisições Hoje
              </p>
              <p
                className={`text-3xl font-bold mb-2 ${getThemeClasses(theme.theme, "text.primary")}`}
              >
                2.4K
              </p>
              <p className="text-sm text-green-400">+8.5% vs. ontem</p>
            </div>
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                theme.isDark
                  ? "bg-purple-500/20 backdrop-blur-sm"
                  : "bg-purple-50"
              }`}
            >
              <Server
                className={`w-6 h-6 ${
                  theme.isDark ? "text-purple-400" : "text-purple-600"
                }`}
              />
            </div>
          </div>
        </div>

        <div
          className={`rounded-lg p-6 transition-all duration-200 hover:scale-105 ${getThemeClasses(
            theme.theme,
            "card"
          )}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p
                className={`text-sm font-medium mb-1 ${getThemeClasses(theme.theme, "text.secondary")}`}
              >
                Armazenamento
              </p>
              <p
                className={`text-3xl font-bold mb-2 ${getThemeClasses(theme.theme, "text.primary")}`}
              >
                68%
              </p>
              <p className="text-sm text-yellow-400">2.1GB / 3.2GB</p>
            </div>
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                theme.isDark
                  ? "bg-orange-500/20 backdrop-blur-sm"
                  : "bg-orange-50"
              }`}
            >
              <Database
                className={`w-6 h-6 ${
                  theme.isDark ? "text-orange-400" : "text-orange-600"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Ações Rápidas */}
      <div
        className={`rounded-lg p-6 mb-8 ${getThemeClasses(theme.theme, "card")}`}
      >
        <h3
          className={`text-lg font-semibold mb-4 ${getThemeClasses(theme.theme, "text.primary")}`}
        >
          Ações Rápidas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            className={`p-4 border rounded-lg transition-all duration-200 text-left hover:scale-105 ${
              theme.isDark
                ? "border-white/10 hover:bg-white/5"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Users
              className={`w-6 h-6 mb-2 ${
                theme.isDark ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <h4
              className={`font-medium ${getThemeClasses(theme.theme, "text.primary")}`}
            >
              Gerenciar Usuários
            </h4>
            <p
              className={`text-sm ${getThemeClasses(theme.theme, "text.muted")}`}
            >
              Visualizar e gerenciar usuários
            </p>
          </button>

          <button
            className={`p-4 border rounded-lg transition-all duration-200 text-left hover:scale-105 ${
              theme.isDark
                ? "border-white/10 hover:bg-white/5"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Settings
              className={`w-6 h-6 mb-2 ${
                theme.isDark ? "text-green-400" : "text-green-600"
              }`}
            />
            <h4
              className={`font-medium ${getThemeClasses(theme.theme, "text.primary")}`}
            >
              Configurações
            </h4>
            <p
              className={`text-sm ${getThemeClasses(theme.theme, "text.muted")}`}
            >
              Configurar sistema
            </p>
          </button>

          <button
            className={`p-4 border rounded-lg transition-all duration-200 text-left hover:scale-105 ${
              theme.isDark
                ? "border-white/10 hover:bg-white/5"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <TrendingUp
              className={`w-6 h-6 mb-2 ${
                theme.isDark ? "text-purple-400" : "text-purple-600"
              }`}
            />
            <h4
              className={`font-medium ${getThemeClasses(theme.theme, "text.primary")}`}
            >
              Ver Relatórios
            </h4>
            <p
              className={`text-sm ${getThemeClasses(theme.theme, "text.muted")}`}
            >
              Analytics detalhados
            </p>
          </button>

          <button
            className={`p-4 border rounded-lg transition-all duration-200 text-left hover:scale-105 ${
              theme.isDark
                ? "border-white/10 hover:bg-white/5"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Shield
              className={`w-6 h-6 mb-2 ${
                theme.isDark ? "text-yellow-400" : "text-yellow-600"
              }`}
            />
            <h4
              className={`font-medium ${getThemeClasses(theme.theme, "text.primary")}`}
            >
              Segurança
            </h4>
            <p
              className={`text-sm ${getThemeClasses(theme.theme, "text.muted")}`}
            >
              Monitorar segurança
            </p>
          </button>
        </div>
      </div>

      {/* Informações do Sistema */}
      <div
        className={`rounded-lg p-6 ${
          theme.isDark
            ? "bg-white/5 border border-white/10"
            : "bg-gray-50 border border-gray-200"
        }`}
      >
        <h2
          className={`text-lg font-semibold mb-4 ${getThemeClasses(theme.theme, "text.primary")}`}
        >
          Informações do Sistema
        </h2>
        <div
          className={`space-y-2 text-sm ${getThemeClasses(theme.theme, "text.secondary")}`}
        >
          <p>📍 URL atual: {window.location.pathname}</p>
          <p>🎨 Tema: {theme.isDark ? "🌙 Escuro" : "☀️ Claro"}</p>
          <p>
            🔑 Token:{" "}
            {localStorage.getItem("admin_access_token")
              ? "✅ Presente"
              : "❌ Ausente"}
          </p>
          <p>
            👤 Usuário:{" "}
            {localStorage.getItem("admin_user") ? "✅ Logado" : "❌ Não logado"}
          </p>
          <p>🕒 Última atualização: {new Date().toLocaleString()}</p>
          <p>🌐 Versão: SmartGesTI v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;
