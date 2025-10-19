import React, { useState } from "react";
import { 
  Table,
  Pagination,
  TableFilters,
  RowActions,
  useTable,
  Button,
  Card,
  CardHeader,
  CardContent,
  ConfirmModal,
  useModal
} from "../../../design-system";
import { useThemeClasses } from "../../../design-system/hooks";
import { cn } from "../../../design-system/theme-classes";
import { 
  Plus, 
  Download, 
  Upload,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Badge,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

// ================================
// TIPOS DE DADOS DE EXEMPLO
// ================================

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  location: string;
  createdAt: string;
}

// ================================
// DADOS DE EXEMPLO
// ================================

const mockUsers: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@exemplo.com",
    phone: "(11) 99999-9999",
    role: "Administrador",
    status: "active",
    lastLogin: "2024-01-15 10:30",
    location: "São Paulo, SP",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@exemplo.com",
    phone: "(11) 88888-8888",
    role: "Usuário",
    status: "active",
    lastLogin: "2024-01-14 15:45",
    location: "Rio de Janeiro, RJ",
    createdAt: "2024-01-02",
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro@exemplo.com",
    phone: "(11) 77777-7777",
    role: "Moderador",
    status: "inactive",
    lastLogin: "2024-01-10 09:15",
    location: "Belo Horizonte, MG",
    createdAt: "2024-01-03",
  },
  {
    id: "4",
    name: "Ana Oliveira",
    email: "ana@exemplo.com",
    phone: "(11) 66666-6666",
    role: "Usuário",
    status: "pending",
    lastLogin: "2024-01-13 14:20",
    location: "Porto Alegre, RS",
    createdAt: "2024-01-04",
  },
  {
    id: "5",
    name: "Carlos Ferreira",
    email: "carlos@exemplo.com",
    phone: "(11) 55555-5555",
    role: "Usuário",
    status: "active",
    lastLogin: "2024-01-15 16:10",
    location: "Salvador, BA",
    createdAt: "2024-01-05",
  },
];

// ================================
// EXEMPLO DE USO DAS TABELAS
// ================================

export const TableExamples: React.FC = () => {
  const { get } = useThemeClasses();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Modal de confirmação
  const deleteModal = useModal();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Hook da tabela
  const {
    data: paginatedUsers,
    sortConfig,
    filters,
    handleSort,
    handleFilter,
    clearFilters,
  } = useTable(users, {
    initialPageSize: pageSize,
  });

  // Colunas da tabela
  const columns = [
    {
      key: "name",
      title: "Nome",
      dataIndex: "name" as keyof User,
      sortable: true,
      filterable: true,
      render: (value: string, record: User) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      title: "Função",
      dataIndex: "role" as keyof User,
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
          <Badge className="w-3 h-3 mr-1" />
          {value}
        </span>
      ),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status" as keyof User,
      sortable: true,
      filterable: true,
      render: (value: string) => {
        const statusConfig = {
          active: { icon: CheckCircle, color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-500/20" },
          inactive: { icon: XCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-500/20" },
          pending: { icon: Clock, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-500/20" },
        };
        
        const config = statusConfig[value as keyof typeof statusConfig];
        const Icon = config.icon;
        
        return (
          <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", config.bg, config.color)}>
            <Icon className="w-3 h-3 mr-1" />
            {value === "active" ? "Ativo" : value === "inactive" ? "Inativo" : "Pendente"}
          </span>
        );
      },
    },
    {
      key: "location",
      title: "Localização",
      dataIndex: "location" as keyof User,
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
    {
      key: "lastLogin",
      title: "Último Login",
      dataIndex: "lastLogin" as keyof User,
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
    {
      key: "actions",
      title: "Ações",
      render: (_: any, record: User) => (
        <RowActions
          onView={() => console.log("Visualizar:", record.name)}
          onEdit={() => console.log("Editar:", record.name)}
          onDelete={() => {
            setUserToDelete(record);
            deleteModal.open();
          }}
        />
      ),
    },
  ];

  // Handlers
  const handleDeleteUser = () => {
    if (userToDelete) {
      setUsers(prev => prev.filter(user => user.id !== userToDelete.id));
      setSelectedUsers(prev => prev.filter(id => id !== userToDelete.id));
      deleteModal.close();
      setUserToDelete(null);
    }
  };

  const handleBulkDelete = () => {
    setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
  };

  const handleExport = () => {
    console.log("Exportando dados...");
  };

  const handleImport = () => {
    console.log("Importando dados...");
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className={cn("text-3xl font-bold mb-2", get("text.primary"))}>
          Table Components
        </h1>
        <p className={get("text.secondary")}>
          Exemplos de uso dos componentes de tabela do Design System
        </p>
      </div>

      {/* Tabela Principal */}
      <Card>
        <CardHeader title="Lista de Usuários">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tabela completa com ordenação, filtros, paginação e seleção
          </p>
        </CardHeader>
        <CardContent>
          {/* Barra de Ações */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button variant="primary" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Novo Usuário
              </Button>
              
              {selectedUsers.length > 0 && (
                <Button variant="danger" size="sm" onClick={handleBulkDelete}>
                  <XCircle className="w-4 h-4 mr-2" />
                  Excluir Selecionados ({selectedUsers.length})
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button variant="secondary" size="sm" onClick={handleImport}>
                <Upload className="w-4 h-4 mr-2" />
                Importar
              </Button>
            </div>
          </div>

          {/* Filtros */}
          <TableFilters
            columns={columns}
            filters={filters}
            onFilter={handleFilter}
            onClearFilters={clearFilters}
          />

          {/* Tabela */}
          <Table
            data={paginatedUsers}
            columns={columns}
            rowKey="id"
            rowSelection={{
              selectedRowKeys: selectedUsers,
              selectedRows: users.filter(user => selectedUsers.includes(user.id)),
              onChange: (keys, rows) => {
                setSelectedUsers(keys);
                console.log("Usuários selecionados:", rows);
              },
              type: "checkbox",
            }}
            onRow={(record) => ({
              onClick: () => console.log("Clicou na linha:", record.name),
              onDoubleClick: () => console.log("Duplo clique na linha:", record.name),
            })}
            size="md"
            bordered
            striped
            hoverable
          />

          {/* Paginação */}
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={users.length}
            onChange={(page, newPageSize) => {
              setCurrentPage(page);
              setPageSize(newPageSize);
            }}
            showSizeChanger
            showQuickJumper
          />
        </CardContent>
      </Card>

      {/* Tabela Simples */}
      <Card>
        <CardHeader title="Tabela Simples">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tabela básica sem funcionalidades avançadas
          </p>
        </CardHeader>
        <CardContent>
          <Table
            data={users.slice(0, 3)}
            columns={columns.slice(0, 4)} // Apenas as primeiras 4 colunas
            size="sm"
            bordered={false}
            striped={false}
            hoverable={false}
          />
        </CardContent>
      </Card>

      {/* Tabela com Colunas Fixas */}
      <Card>
        <CardHeader title="Tabela com Colunas Fixas">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tabela com colunas fixas à esquerda e direita
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table
              data={users.slice(0, 5)}
              columns={[
                {
                  key: "name",
                  title: "Nome (Fixo)",
                  dataIndex: "name" as keyof User,
                  fixed: "left",
                  width: 200,
                },
                {
                  key: "email",
                  title: "Email",
                  dataIndex: "email" as keyof User,
                },
                {
                  key: "phone",
                  title: "Telefone",
                  dataIndex: "phone" as keyof User,
                },
                {
                  key: "role",
                  title: "Função",
                  dataIndex: "role" as keyof User,
                },
                {
                  key: "status",
                  title: "Status",
                  dataIndex: "status" as keyof User,
                },
                {
                  key: "actions",
                  title: "Ações (Fixo)",
                  fixed: "right",
                  width: 100,
                  render: () => (
                    <RowActions
                      onView={() => console.log("Visualizar")}
                      onEdit={() => console.log("Editar")}
                      onDelete={() => console.log("Excluir")}
                    />
                  ),
                },
              ]}
              size="md"
              bordered
            />
          </div>
        </CardContent>
      </Card>

      {/* Modal de Confirmação */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleDeleteUser}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir o usuário "${userToDelete?.name}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
      />
    </div>
  );
};

export default TableExamples;
