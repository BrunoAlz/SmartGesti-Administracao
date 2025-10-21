import React from 'react';
import { Card, Badge } from '@/design-system';
import { useTheme } from '@/admin/contexts/ThemeContext';
import { useAdminLayout } from '@/admin/hooks/useAdminLayout';
import { Layout, Sidebar, Monitor, AlignJustify, Grid, Layers, Sliders, CheckCircle } from 'lucide-react';

const LayoutsUIKit: React.FC = () => {
  const theme = useTheme();
  const { layoutMode, changeLayoutMode } = useAdminLayout();
  
  const layouts = [
    {
      id: 'default',
      name: 'Layout Padrão',
      description: 'Layout clássico com sidebar à esquerda e navbar no topo',
      icon: Layout
    },
    {
      id: 'top',
      name: 'Menu Superior',
      description: 'Navegação principal na barra superior, sem sidebar',
      icon: AlignJustify
    },
    {
      id: 'right',
      name: 'Sidebar Direita',
      description: 'Sidebar posicionada no lado direito da tela',
      icon: Sidebar
    },
    {
      id: 'compact',
      name: 'Menu Compacto',
      description: 'Sidebar sempre em modo compacto mostrando apenas ícones',
      icon: Grid
    },
    {
      id: 'floating',
      name: 'Menu Flutuante',
      description: 'Sidebar flutuante que aparece apenas quando necessário',
      icon: Layers
    },
    {
      id: 'hidden',
      name: 'Sem Sidebar',
      description: 'Layout sem sidebar, apenas com navegação superior',
      icon: Monitor
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${theme.isDark ? 'text-white' : 'text-slate-800'}`}>
          Modos de Layout
        </h1>
        <p className={`text-lg mb-4 ${theme.isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Personalize a aparência do painel de administração com diferentes opções de layout
        </p>
        
        <Card className="p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-1">
              <div className={`text-sm mb-2 font-semibold ${theme.isDark ? 'text-yellow-300' : 'text-amber-600'}`}>
                Layout atual: <Badge variant="warning">{layoutMode}</Badge>
              </div>
              <p className={`text-sm ${theme.isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Clique em um dos layouts abaixo para mudar a aparência do sistema.
              </p>
            </div>
            <div className={`p-2 rounded-full ${
              theme.isDark ? 'bg-green-900/20' : 'bg-green-50'
            }`}>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {layouts.map((layout) => (
          <Card 
            key={layout.id}
            className={`p-6 cursor-pointer transition-all duration-300 ${
              layoutMode === layout.id 
                ? 'ring-2 ring-primary-500 dark:ring-primary-400 transform scale-[1.02]' 
                : 'hover:shadow-md hover:scale-[1.01]'
            }`}
            onClick={() => {
              changeLayoutMode(layout.id as any);
            }}
          >
            <div className="flex items-start">
              <div className={`p-3 rounded-lg mr-4 ${
                theme.isDark ? 'bg-slate-800' : 'bg-slate-100'
              }`}>
                <layout.icon className={`w-6 h-6 ${
                  layoutMode === layout.id 
                    ? 'text-primary-500 dark:text-primary-400' 
                    : theme.isDark ? 'text-slate-400' : 'text-slate-600'
                }`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-semibold text-lg mb-1 ${
                    layoutMode === layout.id 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : theme.isDark ? 'text-white' : 'text-slate-800'
                  }`}>
                    {layout.name}
                  </h3>
                  
                  {layoutMode === layout.id && (
                    <Badge variant="success" className="ml-2">
                      Ativo
                    </Badge>
                  )}
                </div>
                
                <p className={`text-sm ${
                  theme.isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {layout.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg">
        <h2 className={`text-xl font-semibold mb-4 ${theme.isDark ? 'text-white' : 'text-slate-800'}`}>
          <Sliders className="inline-block w-5 h-5 mr-2 mb-1" /> Dicas de personalização
        </h2>
        
        <ul className="space-y-3">
          <li className={`flex items-start ${theme.isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <span className="inline-block text-green-500 mr-2">•</span> 
            O <strong>Layout Padrão</strong> funciona bem para aplicações complexas com muitas seções
          </li>
          <li className={`flex items-start ${theme.isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <span className="inline-block text-green-500 mr-2">•</span>
            O <strong>Menu Superior</strong> maximiza o espaço vertical para conteúdo
          </li>
          <li className={`flex items-start ${theme.isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <span className="inline-block text-green-500 mr-2">•</span>
            O <strong>Menu Compacto</strong> é ideal para usuários experientes que preferem mais espaço útil
          </li>
          <li className={`flex items-start ${theme.isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <span className="inline-block text-green-500 mr-2">•</span>
            O <strong>Menu Flutuante</strong> combina espaço útil com fácil acesso aos menus quando necessário
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LayoutsUIKit;