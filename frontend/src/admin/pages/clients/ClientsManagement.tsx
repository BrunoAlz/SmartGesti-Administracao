import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  IconButton,
  Input,
  SearchInput,
  Table,
  Pagination,
  TableFilters,
  RowActions,
  useTable,
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ConfirmModal,
  useModal,
  LoadingState,
  FadeIn,
  SlideIn,
  Stagger,
  useThemeClasses,
  cn
} from "../../../design-system";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Building2,
  Users,
  DollarSign,
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
  Download,
  Upload,
  RefreshCw,
  Settings
} from "lucide-react";

// ================================
// TIPOS
// ================================

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  saasType: "health" | "education" | "ecommerce" | "business" | "realestate";
  saasName: string;
  plan: "basic" | "premium" | "enterprise";
  status: "active" | "inactive" | "suspended" | "trial";
  monthlyRevenue: number;
  lastLogin: string;
  createdAt: string;
  totalUsers: number;
  region: string;
}

interface SaasType {
  id: string;
  name: string;
  type: "health" | "education" | "ecommerce" | "business" | "realestate";
  color: string;
}

// ================================
// DADOS MOCK
// ================================

const saasTypes: SaasType[] = [
  { id: "1", name: "SmartSaúde", type: "health", color: "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300" },
  { id: "2", name: "SmartEduca", type: "education", color: "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300" },
  { id: "3", name: "SmartShop", type: "ecommerce", color: "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300" },
  { id: "4", name: "SmartBusiness", type: "business", color: "bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-300" },
  { id: "5", name: "SmartImóveis", type: "realestate", color: "bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300" }
];

const clients: Client[] = [
  {
    id: "1",
    name: "Dr. João Silva",
    email: "joao@clinicasilva.com.br",
    phone: "(11) 99999-9999",
    company: "Clínica Silva",
    saasType: "health",
    saasName: "SmartSaúde",
    plan: "premium",
    status: "active",
    monthlyRevenue: 450,
    lastLogin: "2 horas atrás",
    createdAt: "15/03/2024",
    totalUsers: 12,
    region: "São Paulo"
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@escolainovacao.com.br",
    phone: "(21) 88888-8888",
    company: "Escola Inovação",
    saasType: "education",
    saasName: "SmartEduca",
    plan: "enterprise",
    status: "active",
    monthlyRevenue: 890,
    lastLogin: "1 hora atrás",
    createdAt: "10/03/2024",
    totalUsers: 45,
    region: "Rio de Janeiro"
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    email: "carlos@lojatech.com.br",
    phone: "(31) 77777-7777",
    company: "Loja Tech",
    saasType: "ecommerce",
    saasName: "SmartShop",
    plan: "basic",
    status: "trial",
    monthlyRevenue: 0,
    lastLogin: "5 horas atrás",
    createdAt: "20/03/2024",
    totalUsers: 3,
    region: "Minas Gerais"
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana@consultoriapro.com.br",
    phone: "(41) 66666-6666",
    company: "Consultoria Pro",
    saasType: "business",
    saasName: "SmartBusiness",
    plan: "premium",
    status: "suspended",
    monthlyRevenue: 0,
    lastLogin: "2 dias atrás",
    createdAt: "05/03/2024",
    totalUsers: 8,
    region: "Paraná"
  },
  {
    id: "5",
    name: "Roberto Lima",
    email: "roberto@imoveispremium.com.br",
    phone: "(51) 55555-5555",
    company: "Imóveis Premium",
    saasType: "realestate",
    saasName: "SmartImóveis",
    plan: "basic",
    status: "inactive",
    monthlyRevenue: 0,
    lastLogin: "1 semana atrás",
    createdAt: "28/02/2024",
    totalUsers: 5,
    region: "Rio Grande do Sul"
  },
  {
    id: "6",
    name: "Dr. Patricia Mendes",
    email: "patricia@hospitalmoderno.com.br",
    phone: "(11) 44444-4444",
    company: "Hospital Moderno",
    saasType: "health",
    saasName: "SmartSaúde",
    plan: "enterprise",
    status: "active",
    monthlyRevenue: 1200,
    lastLogin: "30 min atrás",
    createdAt: "12/03/2024",
    totalUsers: 78,
    region: "São Paulo"
  },
  {
    id: "7",
    name: "Fernando Alves",
    email: "fernando@universidadeabc.com.br",
    phone: "(85) 33333-3333",
    company: "Universidade ABC",
    saasType: "education",
    saasName: "SmartEduca",
    plan: "enterprise",
    status: "active",
    monthlyRevenue: 1500,
    lastLogin: "1 hora atrás",
    createdAt: "08/03/2024",
    totalUsers: 156,
    region: "Ceará"
  },
  {
    id: "8",
    name: "Lucia Ferreira",
    email: "lucia@modafashion.com.br",
    phone: "(11) 22222-2222",
    company: "Moda Fashion",
    saasType: "ecommerce",
    saasName: "SmartShop",
    plan: "premium",
    status: "active",
    monthlyRevenue: 650,
    lastLogin: "3 horas atrás",
    createdAt: "18/03/2024",
    totalUsers: 23,
    region: "São Paulo"
  }
];

// ================================
// COMPONENTE PRINCIPAL
// ================================

export const ClientsManagement: React.FC = () => {
  const { get, combine } = useThemeClasses();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSaas, setSelectedSaas] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  
  const deleteModal = useModal();
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  // Filtros
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSaas = selectedSaas === "all" || client.saasType === selectedSaas;
    const matchesStatus = selectedStatus === "all" || client.status === selectedStatus;
    
    return matchesSearch && matchesSaas && matchesStatus;
  });

  const table = useTable(filteredClients, { initialPageSize: 10 });

  // Handlers
  const handleDeleteClient = (client: Client) => {
    setClientToDelete(client);
    deleteModal.open();
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      console.log("Deletando cliente:", clientToDelete.name);
      // Aqui seria feita a chamada para a API
      deleteModal.close();
      setClientToDelete(null);
    }
  };

  const handleExport = () => {
    console.log("Exportando dados dos clientes");
  };

  const handleBulkAction = (action: string) => {
    console.log(`Ação em lote: ${action}`, selectedClients);
  };

  // Formatação
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

  const getSaasColor = (saasType: string) => {
    const saas = saasTypes.find(s => s.type === saasType);
    return saas?.color || "bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300";
  };

  const getSaasName = (saasType: string) => {
    const saas = saasTypes.find(s => s.type === saasType);
    return saas?.name || "Desconhecido";
  };

  // Colunas da tabela
  const columns = [
    {
      key: "client",
      title: "Cliente",
      render: (record: Client) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className={cn("font-medium", get("text.primary"))}>{record.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{record.company}</p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      key: "contact",
      title: "Contato",
      render: (record: Client) => (
        <div>
          <p className="text-sm">{record.email}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{record.phone}</p>
        </div>
      ),
    },
    {
      key: "saas",
      title: "SAAS",
      render: (record: Client) => (
        <div>
          <span className={cn("px-2 py-1 text-xs font-medium rounded-full", getSaasColor(record.saasType))}>
            {getSaasName(record.saasType)}
          </span>
          <p className="text-sm mt-1">{record.region}</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: "plan",
      title: "Plano",
      render: (record: Client) => (
        <span className={cn("px-2 py-1 text-xs font-medium rounded-full", getPlanColor(record.plan))}>
          {record.plan.charAt(0).toUpperCase() + record.plan.slice(1)}
        </span>
      ),
      sortable: true,
    },
    {
      key: "status",
      title: "Status",
      render: (record: Client) => (
        <span className={cn("px-2 py-1 text-xs font-medium rounded-full", getStatusColor(record.status))}>
          {getStatusText(record.status)}
        </span>
      ),
      sortable: true,
    },
    {
      key: "revenue",
      title: "Receita",
      render: (record: Client) => (
        <div>
          <p className={cn("font-medium", get("text.primary"))}>{formatCurrency(record.monthlyRevenue)}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{record.totalUsers} usuários</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: "lastLogin",
      title: "Último Acesso",
      render: (record: Client) => (
        <div>
          <p className="text-sm">{record.lastLogin}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Criado: {record.createdAt}</p>
        </div>
      ),
      sortable: true,
    },
    {
      key: "actions",
      title: "Ações",
      render: (record: Client) => (
        <RowActions
          onView={() => console.log("Visualizar cliente:", record.name)}
          onEdit={() => console.log("Editar cliente:", record.name)}
          onDelete={() => handleDeleteClient(record)}
        />
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={cn("text-3xl font-bold mb-2", get("text.primary"))}>
              Gerenciamento de Clientes
            </h1>
            <p className={cn("text-lg", get("text.secondary"))}>
              Gerencie todos os clientes dos seus SAAS
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" icon={<Download className="w-4 h-4" />} onClick={handleExport}>
              Exportar
            </Button>
            <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
              Novo Cliente
            </Button>
          </div>
        </div>
      </FadeIn>

      {/* Stats Cards */}
            <Stagger stagger={100}>
              {[
                <div key="stats" className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <SlideIn direction="up" delay={0}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Total de Clientes</p>
                            <p className={cn("text-2xl font-bold", get("text.primary"))}>{clients.length}</p>
                          </div>
                          <Users className="w-8 h-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </SlideIn>
                  <SlideIn direction="up" delay={100}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Clientes Ativos</p>
                            <p className="text-2xl font-bold text-green-500">
                              {clients.filter(c => c.status === "active").length}
                            </p>
                          </div>
                          <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </SlideIn>
                  <SlideIn direction="up" delay={200}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Em Trial</p>
                            <p className="text-2xl font-bold text-blue-500">
                              {clients.filter(c => c.status === "trial").length}
                            </p>
                          </div>
                          <Clock className="w-8 h-8 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </SlideIn>
                  <SlideIn direction="up" delay={300}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Receita Total</p>
                            <p className="text-2xl font-bold text-green-500">
                              {formatCurrency(clients.reduce((sum, c) => sum + c.monthlyRevenue, 0))}
                            </p>
                          </div>
                          <DollarSign className="w-8 h-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </SlideIn>
                </div>
              ]}
            </Stagger>

      {/* Filters */}
      <FadeIn delay={400}>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <SearchInput
                  placeholder="Buscar por nome, email ou empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onSearch={setSearchTerm}
                />
              </div>
              <div className="flex gap-4">
                <select
                  value={selectedSaas}
                  onChange={(e) => setSelectedSaas(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">Todos os SAAS</option>
                  {saasTypes.map(saas => (
                    <option key={saas.id} value={saas.type}>{saas.name}</option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">Todos os Status</option>
                  <option value="active">Ativo</option>
                  <option value="trial">Trial</option>
                  <option value="suspended">Suspenso</option>
                  <option value="inactive">Inativo</option>
                </select>
                <Button variant="secondary" icon={<RefreshCw className="w-4 h-4" />}>
                  Atualizar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Bulk Actions */}
      {selectedClients.length > 0 && (
        <FadeIn>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedClients.length} cliente(s) selecionado(s)
                </p>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => handleBulkAction("activate")}>
                    Ativar
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => handleBulkAction("suspend")}>
                    Suspender
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleBulkAction("delete")}>
                    Excluir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      )}

      {/* Table */}
      <FadeIn delay={500}>
        <Card>
          <CardContent className="p-0">
            <Table
              data={table.data}
              columns={columns}
              rowKey="id"
              loading={false}
              rowSelection={{
                selectedRowKeys: selectedClients,
                selectedRows: clients.filter(client => selectedClients.includes(client.id)),
                onChange: (keys: any) => setSelectedClients(keys),
                type: "checkbox",
              }}
              size="md"
              bordered
              striped
              hoverable
            />
            <div className="p-4 border-t border-gray-200 dark:border-white/10">
              <Pagination
                current={table.currentPage}
                pageSize={table.pageSize}
                total={table.totalItems}
                onChange={(page, newPageSize) => {
                  table.handlePageChange(page);
                  table.handlePageSizeChange(newPageSize);
                }}
                showSizeChanger
              />
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={confirmDelete}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o cliente "${clientToDelete?.name}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
      />
    </div>
  );
};

export default ClientsManagement;
