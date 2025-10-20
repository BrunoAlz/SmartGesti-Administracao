import React from "react";
import { Card, StatCard, StatCardCentered, SectionCard } from "../../../design-system";
import { Building2, Users, DollarSign } from "lucide-react";

export const CardTest: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <h1 className="text-2xl font-bold">Teste de Bordas - Cards</h1>
      
      {/* Card básico */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Card Básico</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <div className="p-4">
              <p>Card com borda padrão (border=true)</p>
            </div>
          </Card>
          
          <Card border={false}>
            <div className="p-4">
              <p>Card sem borda (border=false)</p>
            </div>
          </Card>
        </div>
      </div>

      {/* StatCard */}
      <div>
        <h2 className="text-lg font-semibold mb-4">StatCard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total de Usuários"
            value="1,234"
            icon={<Users className="w-6 h-6 text-blue-600" />}
            change="+12%"
            changeType="positive"
          />
          
          <StatCard
            title="Sem Borda"
            value="567"
            icon={<Building2 className="w-6 h-6 text-green-600" />}
            border={false}
          />
          
          <StatCardCentered
            title="Receita"
            value="R$ 15.000"
            icon={<DollarSign className="w-5 h-5 text-emerald-600" />}
          />
        </div>
      </div>

      {/* SectionCard */}
      <div>
        <h2 className="text-lg font-semibold mb-4">SectionCard</h2>
        <SectionCard title="Seção de Teste" description="Testando bordas">
          <p>Conteúdo da seção com borda padrão</p>
        </SectionCard>
      </div>

      {/* Classes CSS inline para debug */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Debug Classes</h2>
        <div className="space-y-2">
          <div className="p-4 bg-white border border-slate-200 rounded-lg">
            border-slate-200 (light theme)
          </div>
          <div className="p-4 bg-gray-900 border border-white/10 rounded-lg text-white">
            border-white/10 (dark theme sim)
          </div>
          <div className="p-4 bg-white border-slate-200 rounded-lg">
            border-slate-200 sem prefixo border
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTest;