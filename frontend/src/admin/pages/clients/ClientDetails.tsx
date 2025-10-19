import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  IconButton,
  StatCard,
  LoadingState,
  useThemeClasses,
  cn,
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  useModal,
  Input,
  Textarea
} from "../../../design-system";
import {
  ArrowLeft,
  Edit,
  Trash2,
  MoreHorizontal,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Activity,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Clock,
  Settings,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  CreditCard,
  BarChart3,
  FileText,
  MessageSquare,
  Bell,
  Shield,
  Zap
} from "lucide-react";

// ================================
// TIPOS
// ================================

interface ClientDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  company: string;
  cnpj: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  saasType: "health" | "education" | "ecommerce" | "business" | "realestate";
  saasName: string;
  plan: "basic" | "premium" | "enterprise";
  status: "active" | "inactive" | "suspended" | "trial";
  monthlyRevenue: number;
  totalRevenue: number;
  lastLogin: string;
  createdAt: string;
  totalUsers: number;
  activeUsers: number;
  region: string;
  notes: string;
  nextBillingDate: string;
  contractEndDate: string;
}

interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  type: "login" | "payment" | "usage" | "support" | "system";
  icon: React.ElementType;
  color: string;
}

interface PaymentHistory {
  id: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "failed";
  method: string;
  invoice: string;
}

// ================================
// DADOS MOCK
// ================================

const clientDetails: ClientDetails = {
  id: "1",
  name: "Dr. João Silva",
  email: "joao@clinicasilva.com.br",
  phone: "(11) 99999-9999",
  position: "Diretor Médico",
  company: "Clínica Silva",
  cnpj: "12.345.678/0001-90",
  address: "Rua das Flores, 123, Centro",
  city: "São Paulo",
  state: "SP",
  zipCode: "01234-567",
  saasType: "health",
  saasName: "SmartSaúde",
  plan: "premium",
  status: "active",
  monthlyRevenue: 450,
  totalRevenue: 5400,
  lastLogin: "2 horas atrás",
  createdAt: "15/03/2024",
  totalUsers: 12,
  activeUsers: 10,
  region: "São Paulo",
  notes: "Cliente muito satisfeito com o sistema. Sempre pontual nos pagamentos.",
  nextBillingDate: "15/04/2024",
  contractEndDate: "15/03/2025"
};

const activityLog: ActivityLog[] = [
  {
    id: "1",
    action: "Login realizado",
    description: "Acesso ao sistema SmartSaúde",
    timestamp: "2 horas atrás",
    type: "login",
    icon: User,
    color: "text-blue-500"
  },
  {
    id: "2",
    action: "Pagamento recebido",
    description: "Pagamento de R$ 450,00 processado",
    timestamp: "1 dia atrás",
    type: "payment",
    icon: CreditCard,
    color: "text-green-500"
  },
  {
    id: "3",
    action: "Novo usuário adicionado",
    description: "Dr. Maria Santos foi adicionada ao sistema",
    timestamp: "3 dias atrás",
    type: "usage",
    icon: Users,
    color: "text-purple-500"
  },
  {
    id: "4",
    action: "Suporte solicitado",
    description: "Dúvida sobre relatórios de pacientes",
    timestamp: "1 semana atrás",
    type: "support",
    icon: MessageSquare,
    color: "text-yellow-500"
  },
  {
    id: "5",
    action: "Sistema atualizado",
    description: "Atualização automática para versão 2.1.0",
    timestamp: "2 semanas atrás",
    type: "system",
    icon: Zap,
    color: "text-blue-500"
  }
];

const paymentHistory: PaymentHistory[] = [
  {
    id: "1",
    amount: 450,
    date: "15/03/2024",
    status: "paid",
    method: "Cartão de Crédito",
    invoice: "INV-2024-001"
  },
  {
    id: "2",
    amount: 450,
    date: "15/02/2024",
    status: "paid",
    method: "Cartão de Crédito",
    invoice: "INV-2024-002"
  },
  {
    id: "3",
    amount: 450,
    date: "15/01/2024",
    status: "paid",
    method: "PIX",
    invoice: "INV-2024-003"
  },
  {
    id: "4",
    amount: 450,
    date: "15/12/2023",
    status: "paid",
    method: "Cartão de Crédito",
    invoice: "INV-2023-004"
  }
];

// ================================
// COMPONENTE PRINCIPAL
// ================================

export const ClientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { get, combine } = useThemeClasses();
  
  const [activeTab, setActiveTab] = useState<"overview" | "activity" | "billing" | "settings">("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  
  const editModal = useModal();
  const deleteModal = useModal();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300";
      case "trial":
        return "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300";
      case "suspended":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "trial":
        return "Trial";
      case "suspended":
        return "Suspenso";
      case "inactive":
        return "Inativo";
      default:
        return "Desconhecido";
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "basic":
        return "bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300";
      case "premium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300";
      case "enterprise":
        return "bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300";
    }
  };

  const tabs = [
    { id: "overview", label: "Visão Geral", icon: BarChart3 },
    { id: "activity", label: "Atividade", icon: Activity },
    { id: "billing", label: "Faturamento", icon: CreditCard },
    { id: "settings", label: "Configurações", icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
              {[
                <div key="stats" className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatCard
                      title="Receita Mensal"
                      value={formatCurrency(clientDetails.monthlyRevenue)}
                      change="+5% vs. mês anterior"
                      changeType="positive"
                      icon={<DollarSign className="w-6 h-6" />}
                    />
                    <StatCard
                      title="Usuários Ativos"
                      value={`${clientDetails.activeUsers}/${clientDetails.totalUsers}`}
                      change="+2 este mês"
                      changeType="positive"
                      icon={<Users className="w-6 h-6" />}
                    />
                    <StatCard
                      title="Último Acesso"
                      value={clientDetails.lastLogin}
                      change="Online agora"
                      changeType="positive"
                      icon={<Activity className="w-6 h-6" />}
                    />
                    <StatCard
                      title="Próximo Pagamento"
                      value={clientDetails.nextBillingDate}
                      change="Em 15 dias"
                      changeType="neutral"
                      icon={<Calendar className="w-6 h-6" />}
                    />
                </div>
              ]}

            {/* Client Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader title="Informações Pessoais">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className={cn("font-semibold text-lg", get("text.primary"))}>{clientDetails.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{clientDetails.position}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{clientDetails.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{clientDetails.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{clientDetails.city}, {clientDetails.state}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader title="Informações da Empresa">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className={cn("font-semibold text-lg", get("text.primary"))}>{clientDetails.company}</h3>
                        <p className="text-gray-600 dark:text-gray-400">CNPJ: {clientDetails.cnpj}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{clientDetails.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Cliente desde: {clientDetails.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* SAAS Information */}
            <Card>
              <CardHeader title="Informações do SAAS">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center">
                      <Activity className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className={cn("font-semibold text-lg", get("text.primary"))}>{clientDetails.saasName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Sistema de Saúde</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Shield className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="font-semibold text-lg">
                      <span className={cn("px-2 py-1 text-xs font-medium rounded-full", getPlanColor(clientDetails.plan))}>
                        {clientDetails.plan.charAt(0).toUpperCase() + clientDetails.plan.slice(1)}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Plano Atual</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="font-semibold text-lg">
                      <span className={cn("px-2 py-1 text-xs font-medium rounded-full", getStatusColor(clientDetails.status))}>
                        {getStatusText(clientDetails.status)}
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Status da Conta</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Notes */}
            {clientDetails.notes && (
              <Card>
                <CardHeader title="Observações">
                  <p className="text-sm">{clientDetails.notes}</p>
                </CardHeader>
              </Card>
            )}
          </div>
        );

      case "activity":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader title="Histórico de Atividades">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Últimas ações realizadas pelo cliente
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityLog.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                        <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", activity.color)}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className={cn("font-medium", get("text.primary"))}>{activity.action}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {activity.timestamp}
                          </div>
                        </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "billing":
        return (
          <div className="space-y-6">
            {/* Billing Summary */}
              {[
                <div key="billing-stats" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                      title="Receita Total"
                      value={formatCurrency(clientDetails.totalRevenue)}
                      change="+12% este ano"
                      changeType="positive"
                      icon={<TrendingUp className="w-6 h-6" />}
                    />
                    <StatCard
                      title="Próximo Pagamento"
                      value={formatCurrency(clientDetails.monthlyRevenue)}
                      change={clientDetails.nextBillingDate}
                      changeType="neutral"
                      icon={<Calendar className="w-6 h-6" />}
                    />
                    <StatCard
                      title="Contrato até"
                      value={clientDetails.contractEndDate}
                      change="Renovação automática"
                      changeType="positive"
                      icon={<FileText className="w-6 h-6" />}
                    />
                </div>
              ]}

            {/* Payment History */}
            <Card>
              <CardHeader title="Histórico de Pagamentos">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Últimos pagamentos realizados
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment, index) => (
                      <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-white/10">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-green-500" />
                          </div>
                          <div>
                            <p className={cn("font-medium", get("text.primary"))}>{formatCurrency(payment.amount)}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {payment.method} • {payment.invoice}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={cn("px-2 py-1 text-xs font-medium rounded-full", getPaymentStatusColor(payment.status))}>
                            {payment.status === "paid" ? "Pago" : payment.status === "pending" ? "Pendente" : "Falhou"}
                          </span>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{payment.date}</p>
                        </div>
                      </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader title="Configurações da Conta">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gerencie as configurações do cliente
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Status da Conta</label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                        <option value="active">Ativo</option>
                        <option value="suspended">Suspenso</option>
                        <option value="inactive">Inativo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Plano</label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                        <option value="basic">Básico</option>
                        <option value="premium">Premium</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Observações</label>
                    <Textarea
                      placeholder="Adicione observações sobre o cliente..."
                      rows={4}
                      defaultValue={clientDetails.notes}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button variant="primary">Salvar Alterações</Button>
                    <Button variant="secondary">Cancelar</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Ações Rápidas">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Operações disponíveis para este cliente
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="secondary" fullWidth icon={<Mail className="w-4 h-4" />}>
                    Enviar Email
                  </Button>
                  <Button variant="secondary" fullWidth icon={<Download className="w-4 h-4" />}>
                    Exportar Dados
                  </Button>
                  <Button variant="secondary" fullWidth icon={<RefreshCw className="w-4 h-4" />}>
                    Resetar Senha
                  </Button>
                  <Button variant="danger" fullWidth icon={<Trash2 className="w-4 h-4" />}>
                    Excluir Cliente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <IconButton
              icon={<ArrowLeft className="w-4 h-4" />}
              variant="ghost"
              onClick={() => navigate("/admin/clients")}
              aria-label="Voltar"
            />
            <div>
              <h1 className={cn("text-3xl font-bold", get("text.primary"))}>
                {clientDetails.name}
              </h1>
              <p className={cn("text-lg", get("text.secondary"))}>
                {clientDetails.company} • {clientDetails.saasName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" icon={<Download className="w-4 h-4" />}>
              Exportar
            </Button>
            <Button variant="secondary" icon={<Edit className="w-4 h-4" />}>
              Editar
            </Button>
            <IconButton icon={<MoreHorizontal className="w-4 h-4" />} variant="ghost" aria-label="Mais opções" />
          </div>
        </div>

      {/* Tabs */}
        <Card>
          <CardContent className="p-0">
            <div className="flex border-b border-gray-200 dark:border-white/10">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors",
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

      {/* Tab Content */}
        {renderTabContent()}
    </div>
  );
};

export default ClientDetails;
