import React, { useState } from "react";
import { 
  // Input Components
  Input,
  Textarea,
  PasswordInput,
  SearchInput,
  InputGroup,
  InputAddon,
  
  // Button Components
  Button,
  IconButton,
  ActionButton,
  ToggleButton,
  FloatingActionButton,
  
  // Card Components
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  StatCard,
  FeatureCard,
  
  // Modal Components
  CustomModal,
  useModal,
  
  // Table Components
  Table,
  Pagination,
  TableFilters,
  RowActions,
  useTable,
  
  // Loading Components
  LoadingSpinner,
  LoadingDots,
  LoadingSkeleton,
  LoadingOverlay,
  LoadingButton,
  LoadingCard,
  LoadingState,
  LoadingProgress,
  LoadingPulse,
  LoadingWave,
  useLoading,
  
  // Notification Components
  NotificationProvider,
  NotificationContainer,
  NotificationBell,
  NotificationPanel,
  useNotifications,
  useNotificationActions,
  
  // Form Validation
  useForm,
  validators,
  FormField,
  FormError,
  FormSummary,
  useFieldValidation,
  validationUtils,
  
  // Animation Components
  Animation,
  Transition,
  ScaleIn,
  BounceIn,
  HoverLift,
  HoverGlow,
  TypingAnimation,
  CounterAnimation,
  useAnimation,
  animationUtils,
  
  // Theme
  useThemeClasses,
  cn
} from "../../../design-system";
import { 
  User, 
  Mail, 
  Lock, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Settings,
  Bell,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  Heart,
  Zap
} from "lucide-react";

// ================================
// EXEMPLO COMPLETO DO DESIGN SYSTEM
// ================================

export const DesignSystemShowcase: React.FC = () => {
  const { get } = useThemeClasses();
  
  // Estados
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
    search: "",
  });
  
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Modais
  const modal = useModal();
  
  // Notificações
  const { showSuccess, showError, showWarning, showInfo } = useNotificationActions();
  
  // Loading
  const { loading: isLoading, startLoading, stopLoading } = useLoading();
  
  // Formulário
  const form = useForm({
    initialValues: formData,
    validationSchema: {
      name: validators.required("Nome é obrigatório"),
      email: validators.email("Email inválido"),
      password: validators.minLength(8, "Mínimo 8 caracteres"),
      message: validators.maxLength(500, "Máximo 500 caracteres"),
    },
    onSubmit: async (values: any) => {
      startLoading();
      await new Promise(resolve => setTimeout(resolve, 2000));
      showSuccess("Formulário enviado!", "Dados salvos com sucesso");
      stopLoading();
    },
  });
  
  // Dados de exemplo
  const users = [
    { id: "1", name: "João Silva", email: "joao@exemplo.com", role: "Admin", status: "active" },
    { id: "2", name: "Maria Santos", email: "maria@exemplo.com", role: "User", status: "inactive" },
    { id: "3", name: "Pedro Costa", email: "pedro@exemplo.com", role: "Moderator", status: "active" },
  ];
  
  const columns = [
    {
      key: "name",
      title: "Nome",
      dataIndex: "name" as keyof typeof users[0],
      sortable: true,
      filterable: true,
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email" as keyof typeof users[0],
      sortable: true,
      filterable: true,
    },
    {
      key: "role",
      title: "Função",
      dataIndex: "role" as keyof typeof users[0],
      sortable: true,
    },
    {
      key: "actions",
      title: "Ações",
      render: () => (
        <RowActions
          onView={() => showInfo("Visualizar", "Usuário visualizado")}
          onEdit={() => showWarning("Editar", "Usuário em edição")}
          onDelete={() => modal.confirmDelete("Confirmar exclusão", "Tem certeza que deseja excluir este item?")}
        />
      ),
    },
  ];
  
  const table = useTable(users, { initialPageSize: 10 });
  
  // Handlers
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    form.setValue(field, e.target.value);
  };
  
  const handleSearch = (value: string) => {
    showInfo("Busca", `Buscando por: ${value}`);
  };
  
  const handleDelete = () => {
    console.log("Item excluído!");
    modal.success("Excluído!", "Item foi excluído com sucesso!");
  };
  
  const handleExport = () => {
    startLoading();
    setTimeout(() => {
      showSuccess("Exportação concluída", "Arquivo baixado com sucesso");
      stopLoading();
    }, 2000);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
          <h1 className={cn("text-4xl font-bold mb-4", get("text.primary"))}>
            <TypingAnimation text="Design System Showcase" speed={100} />
          </h1>
          <p className={cn("text-lg", get("text.secondary"))}>
            Demonstração completa de todos os componentes do Design System
          </p>
      </div>

      {/* Stats Cards */}
        {[
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ScaleIn delay={0}>
            <StatCard
              title="Usuários Ativos"
              value="156"
              change="+12 esta semana"
              changeType="positive"
              icon={<User className="w-6 h-6" />}
            />
          </ScaleIn>
          <ScaleIn delay={200}>
            <StatCard
              title="Sessões Hoje"
              value="1247"
              change="+8.5% vs. ontem"
              changeType="positive"
              icon={<Eye className="w-6 h-6" />}
            />
          </ScaleIn>
          <ScaleIn delay={400}>
            <StatCard
              title="Taxa de Conversão"
              value="3.2%"
              change="+0.3% esta semana"
              changeType="positive"
              icon={<Zap className="w-6 h-6" />}
            />
          </ScaleIn>
          <ScaleIn delay={600}>
            <StatCard
              title="Satisfação"
              value="98%"
              change="+2% este mês"
              changeType="positive"
              icon={<Heart className="w-6 h-6" />}
            />
          </ScaleIn>
        </div>
        ]}

      {/* Input Components */}
        <Card>
          <CardHeader title="Input Components">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Componentes de entrada de dados
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nome"
                placeholder="Digite seu nome"
                value={formData.name}
                onChange={handleInputChange("name")}
                leftIcon={<User className="w-4 h-4" />}
                required
              />
              
              <Input
                label="Email"
                type="email"
                placeholder="Digite seu email"
                value={formData.email}
                onChange={handleInputChange("email")}
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />
              
              <PasswordInput
                label="Senha"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={handleInputChange("password")}
                leftIcon={<Lock className="w-4 h-4" />}
              />
              
              <SearchInput
                label="Buscar"
                placeholder="Digite para buscar..."
                value={formData.search}
                onChange={handleInputChange("search")}
                onSearch={handleSearch}
              />
              
              <div className="md:col-span-2">
                <Textarea
                  label="Mensagem"
                  placeholder="Digite sua mensagem aqui..."
                  value={formData.message}
                  onChange={handleInputChange("message")}
                  rows={4}
                  helperText="Máximo 500 caracteres"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Preço</label>
                <InputGroup>
                  <InputAddon position="left">R$</InputAddon>
                  <Input placeholder="0.00" />
                  <InputAddon position="right">BRL</InputAddon>
                </InputGroup>
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Button Components */}
        <Card>
          <CardHeader title="Button Components">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Componentes de botões e ações
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Botões Básicos</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
                    Primário
                  </Button>
                  <Button variant="secondary" icon={<Edit className="w-4 h-4" />}>
                    Secundário
                  </Button>
                  <Button variant="danger" icon={<Trash2 className="w-4 h-4" />}>
                    Perigo
                  </Button>
                  <LoadingButton loading={isLoading} onClick={handleExport}>
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </LoadingButton>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Botões de Ícone</h4>
                <div className="flex flex-wrap gap-3">
                  <IconButton icon={<Settings className="w-4 h-4" />} variant="primary" aria-label="Configurações" />
                  <IconButton icon={<Bell className="w-4 h-4" />} variant="secondary" aria-label="Notificações" />
                  <IconButton icon={<Eye className="w-4 h-4" />} variant="ghost" aria-label="Visualizar" />
                  <IconButton icon={<Trash2 className="w-4 h-4" />} variant="danger" aria-label="Excluir" />
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Botões de Ação</h4>
                <div className="flex flex-wrap gap-3">
                  <ActionButton action="save">Salvar</ActionButton>
                  <ActionButton action="cancel">Cancelar</ActionButton>
                  <ActionButton action="delete">Excluir</ActionButton>
                  <ActionButton action="edit">Editar</ActionButton>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Efeitos Hover</h4>
                <div className="flex flex-wrap gap-3">
                  <HoverLift>
                    <Button variant="primary">Hover Lift</Button>
                  </HoverLift>
                  <HoverGlow glowColor="blue">
                    <Button variant="secondary">Hover Glow</Button>
                  </HoverGlow>
                  <HoverGlow glowColor="green">
                    <Button variant="secondary">Hover Glow Verde</Button>
                  </HoverGlow>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Loading Components */}
      <BounceIn delay={1200}>
        <Card>
          <CardHeader title="Loading Components">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Componentes de carregamento e estados
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Spinners</h4>
                <div className="flex items-center gap-6">
                  <LoadingSpinner size="sm" />
                  <LoadingSpinner size="md" />
                  <LoadingSpinner size="lg" />
                  <LoadingDots size="sm" />
                  <LoadingDots size="md" />
                  <LoadingDots size="lg" />
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Progress Bar</h4>
                <LoadingProgress progress={75} showPercentage />
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Skeleton Loading</h4>
                <LoadingCard loading={true} skeletonCount={3}>
                  <div>Conteúdo carregado</div>
                </LoadingCard>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Loading States</h4>
                <LoadingState loading={false} empty={false}>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p>Conteúdo carregado com sucesso!</p>
                  </div>
                </LoadingState>
              </div>
            </div>
          </CardContent>
        </Card>
      </BounceIn>

      {/* Table Components */}
        <Card>
          <CardHeader title="Table Components">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Componentes de tabela e listagem
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="primary" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Usuário
                  </Button>
                  {selectedUsers.length > 0 && (
                    <Button variant="danger" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir ({selectedUsers.length})
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" onClick={handleExport}>
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Importar
                  </Button>
                </div>
              </div>
              
              <Table
                data={table.data}
                columns={columns}
                rowKey="id"
                rowSelection={{
                  selectedRowKeys: selectedUsers,
                  selectedRows: users.filter(user => selectedUsers.includes(user.id)),
                  onChange: (keys: any) => setSelectedUsers(keys),
                  type: "checkbox",
                }}
                size="md"
                bordered
                striped
                hoverable
              />
              
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

      {/* Modal Components */}
        <Card>
          <CardHeader title="Modal Components">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Componentes de modais e diálogos
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => modal.alert({
                title: "Modal Básico",
                text: "Este é um exemplo de modal básico usando SweetAlert2!",
                variant: "info"
              })}>
                Modal Básico
              </Button>
              <Button variant="secondary" onClick={() => modal.confirm({
                title: "Modal de Confirmação",
                text: "Deseja prosseguir com esta ação?",
                confirmButtonText: "Sim, prosseguir",
                cancelButtonText: "Cancelar",
                onConfirm: () => { modal.success("Sucesso!", "Ação realizada com sucesso!"); }
              })}>
                Modal de Confirmação
              </Button>
              <Button variant="warning" onClick={() => modal.confirmDelete()}>
                Modal de Exclusão
              </Button>
              <Button variant="danger" onClick={() => modal.error("Erro!", "Exemplo de modal de erro.")}>
                Modal de Erro
              </Button>
            </div>
          </CardContent>
        </Card>

      {/* Notification Actions */}
      <ScaleIn delay={1800}>
        <Card>
          <CardHeader title="Notification Actions">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Teste as notificações do sistema
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => showSuccess("Sucesso!", "Operação realizada com sucesso")}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Sucesso
              </Button>
              <Button variant="danger" onClick={() => showError("Erro!", "Ocorreu um erro na operação")}>
                <AlertCircle className="w-4 h-4 mr-2" />
                Erro
              </Button>
              <Button variant="secondary" onClick={() => showWarning("Atenção!", "Verifique os dados informados")}>
                <AlertCircle className="w-4 h-4 mr-2" />
                Aviso
              </Button>
              <Button variant="secondary" onClick={() => showInfo("Informação", "Dados atualizados com sucesso")}>
                <Info className="w-4 h-4 mr-2" />
                Info
              </Button>
            </div>
          </CardContent>
        </Card>
      </ScaleIn>

      {/* Floating Action Button */}
      <FloatingActionButton
        icon={<Plus className="w-6 h-6" />}
        variant="primary"
        onClick={() => showInfo("FAB", "Floating Action Button clicado!")}
        aria-label="Adicionar"
      />
    </div>
  );
};

export default DesignSystemShowcase;
