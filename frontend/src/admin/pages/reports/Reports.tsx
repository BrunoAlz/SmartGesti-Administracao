import React from "react";
import { Card, CardHeader, CardContent, useThemeClasses } from "../../../design-system";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

// ================================
// COMPONENTE RELATÓRIOS
// ================================

export const Reports: React.FC = () => {
  const { get, cn } = useThemeClasses();

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className={cn("text-xl font-bold mb-1", get("text.primary"))}>
          Relatórios e Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Visualize métricas e relatórios detalhados dos seus SAAS
        </p>
      </div>

      {/* Coming Soon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hover className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className={cn("font-semibold mb-2", get("text.primary"))}>
              Relatórios Financeiros
            </h3>
            <p className={cn("text-sm", get("text.secondary"))}>
              Receitas, custos e lucros
            </p>
          </CardContent>
        </Card>

        <Card hover className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 dark:bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className={cn("font-semibold mb-2", get("text.primary"))}>
              Analytics de Crescimento
            </h3>
            <p className={cn("text-sm", get("text.secondary"))}>
              Tendências e projeções
            </p>
          </CardContent>
        </Card>

        <Card hover className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className={cn("font-semibold mb-2", get("text.primary"))}>
              Relatórios de Clientes
            </h3>
            <p className={cn("text-sm", get("text.secondary"))}>
              Atividade e engajamento
            </p>
          </CardContent>
        </Card>

        <Card hover className="text-center">
          <CardContent className="p-6">
            <div className="w-12 h-12 mx-auto mb-4 bg-orange-100 dark:bg-orange-500/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className={cn("font-semibold mb-2", get("text.primary"))}>
              Análise de Revenue
            </h3>
            <p className={cn("text-sm", get("text.secondary"))}>
              MRR, churn e LTV
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader title="Funcionalidade em Desenvolvimento">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Em construção</span>
          </div>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center">
            <BarChart3 className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className={cn("text-lg font-semibold mb-2", get("text.primary"))}>
            Relatórios Avançados
          </h3>
          <p className={cn("text-base mb-6 max-w-md mx-auto", get("text.secondary"))}>
            Esta seção está sendo desenvolvida e em breve terá relatórios detalhados, 
            gráficos interativos e análises avançadas dos seus SAAS.
          </p>
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p>✅ Dashboard principal - Concluído</p>
            <p>✅ Gestão de SAAS - Concluído</p>
            <p>⏳ Relatórios detalhados - Em desenvolvimento</p>
            <p>⏳ Gráficos interativos - Em desenvolvimento</p>
            <p>⏳ Exportação de dados - Planejado</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;