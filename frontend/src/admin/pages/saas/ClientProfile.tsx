import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  Edit,
  Calendar,
  DollarSign,
  CreditCard,
  Activity,
  Settings,
  User,
  Building2,
  Package,
  Database,
  Shield,
  Users,
  HeadphonesIcon,
  Globe,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { Card, CardHeader, CardContent, Button, StatCard, StatCardCentered, SectionCard } from "../../../design-system";
import { useThemeClasses } from "../../../design-system";
import { findClientById, saasInfo } from "../../data/mockClients";

// ================================
// COMPONENTE PRINCIPAL
// ================================

export const ClientProfile: React.FC = () => {
  const { saasId, clientId } = useParams<{ saasId: string; clientId: string }>();
  const navigate = useNavigate();
  const { get, cn } = useThemeClasses();
  
  const [activeTab, setActiveTab] = useState("empresa");
  
  const client = findClientById(clientId || "");
  const saas = saasInfo[saasId || ""];
  
  if (!client || !saas) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className={cn("text-2xl font-bold mb-4", get("text.primary"))}>
            Cliente não encontrado
          </h1>
          <Button onClick={() => navigate(`/admin/saas/${saasId}/clients`)}>
            Voltar para lista
          </Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "empresa", label: "Empresa", icon: Building2 },
    { id: "plano", label: "Plano", icon: Package },
    { id: "interno", label: "Dados Internos", icon: Database },
    { id: "financeiro", label: "Financeiro", icon: DollarSign },
    { id: "atividade", label: "Atividade", icon: Activity },
    { id: "administradores", label: "Administradores", icon: Users },
    { id: "configuracoes", label: "Configurações", icon: Settings },
    { id: "suporte", label: "Suporte", icon: HeadphonesIcon }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-500 bg-green-50 dark:bg-green-500/20";
      case "inactive":
        return "text-red-500 bg-red-50 dark:bg-red-500/20";
      case "suspended":
        return "text-yellow-500 bg-yellow-50 dark:bg-yellow-500/20";
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-500/20";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
      case "suspended":
        return "Suspenso";
      default:
        return "Desconhecido";
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "empresa":
        return (
          <div className="space-y-6">
            {/* Cards de Informações Corporativas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader title="Informações Corporativas">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Dados da empresa</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                      <Building2 className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <label className="text-sm font-medium text-blue-500">Razão Social</label>
                        <p className={cn("text-lg font-semibold", get("text.primary"))}>{client.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                      <Package className="w-5 h-5 text-purple-500 mt-0.5" />
                      <div>
                        <label className="text-sm font-medium text-purple-500">Setor de Atividade</label>
                        <p className={cn("text-base", get("text.primary"))}>{client.industry || 'Não informado'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                      <Users className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <label className="text-sm font-medium text-green-500">Porte da Empresa</label>
                        <p className={cn("text-base", get("text.primary"))}>{client.companySize || 'Não informado'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                      <Globe className="w-5 h-5 text-indigo-500 mt-0.5" />
                      <div>
                        <label className="text-sm font-medium text-indigo-500">Website</label>
                        {client.website ? (
                          <a href={client.website} target="_blank" rel="noopener noreferrer" 
                             className="text-base text-blue-500 hover:underline">
                            {client.website}
                          </a>
                        ) : (
                          <p className={cn("text-base", get("text.secondary"))}>Não informado</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader title="Contato Principal">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Responsável pela conta</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                      <User className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <label className="text-sm font-medium text-blue-500">Nome Completo</label>
                        <p className={cn("text-lg font-semibold", get("text.primary"))}>{client.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                      <Shield className="w-5 h-5 text-purple-500 mt-0.5" />
                      <div>
                        <label className="text-sm font-medium text-purple-500">Cargo/Função</label>
                        <p className={cn("text-base", get("text.primary"))}>{client.position || 'Não informado'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                      <Mail className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <label className="text-sm font-medium text-green-500">Email</label>
                        <p className={cn("text-base", get("text.primary"))}>{client.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                      <Phone className="w-5 h-5 text-orange-500 mt-0.5" />
                      <div>
                        <label className="text-sm font-medium text-orange-500">Telefone</label>
                        <p className={cn("text-base", get("text.primary"))}>{client.phone || 'Não informado'}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Card de Endereço */}
            <Card>
              <CardHeader title="Endereço da Empresa">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Localização física</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg h-full">
                      <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <label className="text-sm font-medium text-red-500">Endereço Completo</label>
                        <p className={cn("text-base", get("text.primary"))}>{client.address || 'Não informado'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                    <Building2 className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <label className="text-sm font-medium text-blue-500">Cidade</label>
                      <p className={cn("text-base", get("text.primary"))}>{client.city || 'Não informado'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                    <MapPin className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <label className="text-sm font-medium text-green-500">Estado</label>
                      <p className={cn("text-base", get("text.primary"))}>{client.state || 'Não informado'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "plano":
        return (
          <div className="space-y-6">
            <SectionCard 
              title="Detalhes do Plano Atual" 
              description="Informações do plano ativo"
              actions={
                <span className={cn("px-3 py-1 rounded-full text-sm font-medium", getStatusColor(client.status))}>
                  {getStatusText(client.status)}
                </span>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Nome do Plano</label>
                    <p className={cn("text-xl font-semibold", get("text.primary"))}>{client.planDetails?.name || client.plan}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Valor Mensal</label>
                  <p className={cn("text-2xl font-bold text-green-500")}>
                      R$ {client.planDetails?.price?.toLocaleString() || client.monthlyRevenue.toLocaleString()}
                      <span className={cn("text-sm font-normal", get("text.secondary"))}>/mês</span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Tipo de Cobrança</label>
                    <p className={cn("text-base", get("text.primary"))}>{client.planDetails?.billing === 'monthly' ? 'Mensal' : 'Anual'}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Data de Início</label>
                    <p className={cn("text-base", get("text.primary"))}>{client.startDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Próxima Cobrança</label>
                    <p className={cn("text-base", get("text.primary"))}>{client.nextBilling}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Vencimento do Contrato</label>
                    <p className={cn("text-base", get("text.primary"))}>{client.contractEndDate || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard 
              title="Recursos Inclusos" 
              description="Funcionalidades do plano"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {client.planDetails?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className={cn("text-sm", get("text.primary"))}>{feature}</span>
                  </div>
                )) || (
                  <p className="text-xs text-gray-600 dark:text-gray-400">Nenhum recurso específico listado</p>
                )}
              </div>
            </SectionCard>

            <Card>
              <CardHeader title="Limites e Cotas">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Uso atual vs limites
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <StatCard
                    title="Usuários"
                    value={`${client.activeUsers}/${client.planDetails?.limits?.users || client.totalUsers}`}
                    change={`${client.totalUsers - client.activeUsers} disponíveis`}
                    changeType="neutral"
                    icon={<Users />}
                    iconColor="info"
                  />
                  <StatCard
                    title="Armazenamento"
                    value={client.planDetails?.limits?.storage || 'N/A'}
                    change="Em uso: 65%"
                    changeType="positive"
                    icon={<Database />}
                    iconColor="primary"
                  />
                  <StatCard
                    title="Banda"
                    value={client.planDetails?.limits?.bandwidth || 'N/A'}
                    change="Ilimitado"
                    changeType="positive"
                    icon={<Activity />}
                    iconColor="success"
                  />
                  <StatCard
                    title="Suporte"
                    value={client.planDetails?.limits?.support || 'N/A'}
                    change="Ativo"
                    changeType="positive"
                    icon={<HeadphonesIcon />}
                    iconColor="warning"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "financeiro":
        return (
          <div className="space-y-6">
            {/* Cards de Métricas Financeiras */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCardCentered
                title="Receita Mensal"
                value={`R$ ${client.monthlyRevenue.toLocaleString()}`}
                change={`Próxima cobrança: ${client.nextBilling}`}
                icon={<DollarSign />}
                iconColor="success"
              />
              
              <StatCardCentered
                title="Receita Total"
                value={`R$ ${client.totalRevenue?.toLocaleString() || '0'}`}
                change={`Desde ${client.startDate}`}
                icon={<CreditCard />}
                iconColor="primary"
              />
              
              <StatCardCentered
                title="Contrato Até"
                value={client.contractEndDate || 'N/A'}
                change="Vencimento"
                icon={<Calendar />}
                iconColor="info"
              />
            </div>

            {/* Método de Pagamento */}
            <Card>
              <CardHeader title="Método de Pagamento">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Forma de cobrança ativa</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className={cn("font-semibold text-lg", get("text.primary"))}>Cartão de Crédito</p>
                    <p className={cn("text-sm", get("text.secondary"))}>Final **** {client.paymentMethod?.lastFour || '****'}</p>
                    <p className={cn("text-xs", get("text.secondary"))}>Vencimento: {client.paymentMethod?.expiryDate || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-500/20 text-green-500 rounded-full text-xs font-medium">
                      Ativo
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Histórico de Pagamentos */}
            <Card>
              <CardHeader title="Histórico de Pagamentos">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Transações recentes</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {client.billingHistory?.slice(0, 5).map((bill, index) => (
                    <div key={bill.id} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-white/5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          bill.status === 'paid' ? 'bg-green-100 dark:bg-green-500/20' : 'bg-yellow-100 dark:bg-yellow-500/20'
                        )}>
                          {bill.status === 'paid' ? 
                            <DollarSign className="w-5 h-5 text-green-500" /> :
                            <Calendar className="w-5 h-5 text-yellow-500" />
                          }
                        </div>
                        <div>
                          <p className={cn("font-medium", get("text.primary"))}>{bill.description}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{bill.date} • {bill.invoice}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={cn("font-bold text-lg", get("text.primary"))}>R$ {bill.amount.toLocaleString()}</p>
                        <span className={cn("px-3 py-1 rounded-full text-xs font-medium", 
                          bill.status === 'paid' ? 
                            'bg-green-100 dark:bg-green-500/20 text-green-500' : 
                            'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-500'
                        )}>
                          {bill.status === 'paid' ? 'Pago' : 'Pendente'}
                        </span>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-8">
                      <CreditCard className={cn("w-12 h-12 mx-auto mb-3", get("text.secondary"))} />
                      <p className="text-sm text-gray-600 dark:text-gray-400">Nenhum histórico de pagamento encontrado</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "administradores":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader title="Administradores do Sistema">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Usuários com acesso administrativo
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {client.administrators?.map((admin) => (
                    <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {admin.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className={cn("font-medium", get("text.primary"))}>{admin.name}</p>
                          <p className={cn("text-sm", get("text.secondary"))}>{admin.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={cn("px-3 py-1 rounded-full text-xs font-medium",
                          admin.role === 'owner' ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-500' :
                          admin.role === 'admin' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-500' :
                          'bg-gray-100 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400'
                        )}>
                          {admin.role.charAt(0).toUpperCase() + admin.role.slice(1)}
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ultimo acesso: {admin.lastLogin}</p>
                      </div>
                    </div>
                  )) || <p className="text-sm text-gray-600 dark:text-gray-400">Nenhum administrador encontrado</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "suporte":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Tickets Abertos"
                value={client.support?.tickets?.filter(t => t.status === 'open').length || 0}
                icon={<HeadphonesIcon />}
                iconColor="warning"
              />
              <StatCard
                title="Satisfação"
                value={`${client.support?.satisfaction || 0}/5`}
                icon={<Activity />}
                iconColor="success"
              />
              <StatCard
                title="Tempo Resposta"
                value={client.support?.responseTime || 'N/A'}
                icon={<Activity />}
                iconColor="primary"
              />
            </div>
            <Card>
              <CardHeader title="Tickets Recentes">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Histórico de suporte
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {client.support?.tickets?.map((ticket) => (
                    <div key={ticket.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className={cn("font-medium", get("text.primary"))}>{ticket.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{ticket.id} - Criado em {ticket.createdAt}</p>
                      </div>
                      <div className="text-right">
                        <span className={cn("px-2 py-1 rounded-full text-xs font-medium",
                          ticket.status === 'resolved' ? 'bg-green-100 dark:bg-green-500/20 text-green-500' :
                          ticket.status === 'open' ? 'bg-red-100 dark:bg-red-500/20 text-red-500' :
                          'bg-gray-100 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400'
                        )}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  )) || <p className="text-sm text-gray-600 dark:text-gray-400">Nenhum ticket encontrado</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "interno":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader title="Informações do Sistema">
                <p className={cn("text-sm", get("text.secondary"))}>
                  Dados técnicos e administrativos
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={cn("text-sm font-medium", get("text.secondary"))}>ID do Cliente</label>
                    <p className={cn("font-mono", get("text.primary"))}>{client.id}</p>
                  </div>
                  <div>
                    <label className={cn("text-sm font-medium", get("text.secondary"))}>Data de Criação</label>
                    <p className={cn("text-base", get("text.primary"))}>{client.startDate}</p>
                  </div>
                  <div>
                    <label className={cn("text-sm font-medium", get("text.secondary"))}>Criado Por</label>
                    <p className={cn("text-base", get("text.primary"))}>{client.createdBy || 'Sistema'}</p>
                  </div>
                  <div>
                    <label className={cn("text-sm font-medium", get("text.secondary"))}>Ultima Atualização</label>
                    <p className={cn("text-base", get("text.primary"))}>{client.lastUpdate || 'N/A'}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <label className={cn("text-sm font-medium", get("text.secondary"))}>Observações Internas</label>
                  <p className={cn("mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg", get("text.primary"))}>
                    {client.notes || 'Nenhuma observação registrada.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "atividade":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                title="Usuários Ativos"
                value={client.activeUsers}
                change={`de ${client.totalUsers} total`}
                icon={<Users />}
                iconColor="info"
              />
              <StatCard
                title="Ultimo Login"
                value={client.lastLogin}
                icon={<Activity />}
                iconColor="success"
              />
              <StatCard
                title="Receita Total"
                value={`R$ ${client.totalRevenue?.toLocaleString() || '0'}`}
                icon={<DollarSign />}
                iconColor="success"
              />
            </div>
          </div>
        );

      case "configuracoes":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader title="Configurações do Sistema">
                <p className={cn("text-sm", get("text.secondary"))}>
                  Preferências e segurança
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={cn("text-sm font-medium", get("text.secondary"))}>Fuso Horário</label>
                    <p className={cn("text-base", get("text.primary"))}>{client.settings?.timezone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className={cn("text-sm font-medium", get("text.secondary"))}>Idioma</label>
                    <p className={cn("text-base", get("text.primary"))}>{client.settings?.language || 'N/A'}</p>
                  </div>
                  <div>
                    <label className={cn("text-sm font-medium", get("text.secondary"))}>Autenticação 2FA</label>
                    <p className={cn("text-base", get("text.primary"))}>
                      {client.settings?.security?.twoFactor ? 'Ativado' : 'Desativado'}
                    </p>
                  </div>
                  <div>
                    <label className={cn("text-sm font-medium", get("text.secondary"))}>Timeout de Sessão</label>
                    <p className={cn("text-base", get("text.primary"))}>
                      {client.settings?.security?.sessionTimeout || 30} minutos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="p-8 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">Aba não encontrada</p>
          </div>
        );
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Botão Voltar */}
      <div className="mb-4">
        <Button
          variant="ghost"
          icon={<ArrowLeft className="w-4 h-4" />}
          onClick={() => navigate(`/admin/saas/${saasId}/clients`)}
        >
          Voltar para Lista
        </Button>
      </div>

      {/* Header Principal com Avatar */}
      <Card>
        <CardContent>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-6">
              {/* Avatar/Logo da Empresa */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-12 h-12 text-white" />
                </div>
                <div className={cn(
                  "absolute -bottom-2 -right-2 px-2 py-1 rounded-full text-xs font-medium shadow-md",
                  getStatusColor(client.status)
                )}>
                  {getStatusText(client.status)}
                </div>
              </div>
              
              {/* Informações Principais */}
              <div className="flex-1">
                <div className="mb-3">
                  <h1 className={cn("text-xl font-bold mb-1", get("text.primary"))}>
                    {client.company}
                  </h1>
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    {client.name} • {client.position || 'Responsável'}
                  </p>
                </div>
                
                {/* Informações de Contato Rápidas */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span className={get("text.primary")}>{client.email}</span>
                  </div>
                  {client.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-500" />
                      <span className={get("text.primary")}>{client.phone}</span>
                    </div>
                  )}
                  {client.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-purple-500" />
                      <a href={client.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                        Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Ações */}
            <div className="flex items-center space-x-3">
              <Button variant="secondary" icon={<Edit className="w-4 h-4" />}>
                Editar Cliente
              </Button>
            </div>
          </div>
          
          {/* Métricas Principais */}
          <div className={cn("grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t", get("border.subtle"))}>
            <StatCardCentered
              title="Plano Atual"
              value={client.plan}
              icon={<Package />}
              iconColor="primary"
            />
            <StatCardCentered
              title="Receita Mensal"
              value={`R$ ${client.monthlyRevenue.toLocaleString()}`}
              icon={<DollarSign />}
              iconColor="success"
            />
            <StatCardCentered
              title="Usuários Ativos"
              value={`${client.activeUsers}/${client.totalUsers}`}
              icon={<Users />}
              iconColor="info"
            />
            <StatCardCentered
              title="Último Acesso"
              value={client.lastLogin}
              icon={<Activity />}
              iconColor="success"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className={cn("border-b", get("border.primary"))}>
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : `border-transparent hover:${get("border.subtle")}`,
                  get("text.secondary")
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ClientProfile;