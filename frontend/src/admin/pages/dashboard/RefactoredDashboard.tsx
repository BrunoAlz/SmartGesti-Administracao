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
import { useThemeClasses, Card, StatCard, Button } from "../../../design-system";

// ================================
// COMPONENTE DASHBOARD REFATORADO
// ================================

export const RefactoredDashboard: React.FC = () => {
  const { theme, isDark, get, combine, cn } = useThemeClasses();

  return (
    <div className={cn("p-6", get("layout"))}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={cn("text-2xl font-bold mb-2", get("text.primary"))}>
          Dashboard Administrativo
        </h1>
        <p className={get("text.secondary")}>
          Visão geral do sistema SmartGesTI
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Usuários Ativos"
          value="156"
          change="+12 esta semana"
          changeType="positive"
          icon={<Users className="w-6 h-6 text-blue-400" />}
        />

        <StatCard
          title="Status do Sistema"
          value="99.9%"
          change="Uptime excelente"
          changeType="positive"
          icon={<Activity className="w-6 h-6 text-green-400" />}
        />

        <StatCard
          title="Requisições Hoje"
          value="2.4K"
          change="+8.5% vs. ontem"
          changeType="positive"
          icon={<Server className="w-6 h-6 text-purple-400" />}
        />

        <StatCard
          title="Armazenamento"
          value="68%"
          change="2.1GB / 3.2GB"
          changeType="neutral"
          icon={<Database className="w-6 h-6 text-orange-400" />}
        />
      </div>

      {/* Seção de Ações Rápidas */}
      <Card className="mb-8">
        <div className="mb-4">
          <h3 className={cn("text-lg font-semibold", get("text.primary"))}>
            Ações Rápidas
          </h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="secondary"
            className="h-auto p-4 text-left justify-start"
            icon={<Users className="w-6 h-6" />}
          >
            <div>
              <h4 className="font-medium">Gerenciar Usuários</h4>
              <p className="text-sm opacity-70">Visualizar e gerenciar usuários</p>
            </div>
          </Button>

          <Button
            variant="secondary"
            className="h-auto p-4 text-left justify-start"
            icon={<Settings className="w-6 h-6" />}
          >
            <div>
              <h4 className="font-medium">Configurações</h4>
              <p className="text-sm opacity-70">Configurar sistema</p>
            </div>
          </Button>

          <Button
            variant="secondary"
            className="h-auto p-4 text-left justify-start"
            icon={<TrendingUp className="w-6 h-6" />}
          >
            <div>
              <h4 className="font-medium">Ver Relatórios</h4>
              <p className="text-sm opacity-70">Analytics detalhados</p>
            </div>
          </Button>

          <Button
            variant="secondary"
            className="h-auto p-4 text-left justify-start"
            icon={<Shield className="w-6 h-6" />}
          >
            <div>
              <h4 className="font-medium">Segurança</h4>
              <p className="text-sm opacity-70">Monitorar segurança</p>
            </div>
          </Button>
        </div>
      </Card>

      {/* Informações do Sistema */}
      <Card variant="outlined">
        <div className="mb-4">
          <h2 className={cn("text-lg font-semibold", get("text.primary"))}>
            Informações do Sistema
          </h2>
        </div>
        
        <div className={cn("space-y-2 text-sm", get("text.secondary"))}>
          <p>📍 URL atual: {window.location.pathname}</p>
          <p>🎨 Tema: {isDark ? "🌙 Escuro" : "☀️ Claro"}</p>
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
      </Card>
    </div>
  );
};

export default RefactoredDashboard;
