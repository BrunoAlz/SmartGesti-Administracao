import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  IconButton,
  Input,
  Textarea,
  PasswordInput,
  LoadingButton,
  LoadingState,
  useThemeClasses,
  cn,
  useForm,
  validators,
  FormField,
  FormError,
  FormSummary
} from "../../../design-system";
import {
  ArrowLeft,
  Save,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Settings,
  Users,
  Calendar,
  CheckCircle,
  AlertCircle,
  Heart,
  GraduationCap,
  ShoppingCart,
  Briefcase,
  Home
} from "lucide-react";

// ================================
// TIPOS
// ================================

interface SaasOption {
  id: string;
  name: string;
  type: "health" | "education" | "ecommerce" | "business" | "realestate";
  icon: React.ElementType;
  color: string;
  description: string;
  features: string[];
}

interface PlanOption {
  id: string;
  name: string;
  price: number;
  features: string[];
  maxUsers: number;
  popular?: boolean;
}

// ================================
// DADOS MOCK
// ================================

const saasOptions: SaasOption[] = [
  {
    id: "1",
    name: "SmartSaúde",
    type: "health",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    description: "Sistema completo para clínicas e hospitais",
    features: ["Gestão de pacientes", "Agendamentos", "Prontuários eletrônicos", "Faturamento"]
  },
  {
    id: "2",
    name: "SmartEduca",
    type: "education",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    description: "Plataforma educacional completa",
    features: ["Gestão de alunos", "Aulas online", "Avaliações", "Relatórios acadêmicos"]
  },
  {
    id: "3",
    name: "SmartShop",
    type: "ecommerce",
    icon: ShoppingCart,
    color: "from-green-500 to-emerald-500",
    description: "E-commerce completo e moderno",
    features: ["Catálogo de produtos", "Carrinho de compras", "Pagamentos", "Gestão de estoque"]
  },
  {
    id: "4",
    name: "SmartBusiness",
    type: "business",
    icon: Briefcase,
    color: "from-purple-500 to-violet-500",
    description: "Solução empresarial integrada",
    features: ["CRM", "Gestão de projetos", "Relatórios", "Integrações"]
  },
  {
    id: "5",
    name: "SmartImóveis",
    type: "realestate",
    icon: Home,
    color: "from-orange-500 to-amber-500",
    description: "Plataforma para imobiliárias",
    features: ["Catálogo de imóveis", "Agendamentos", "Contratos", "Comissões"]
  }
];

const planOptions: PlanOption[] = [
  {
    id: "basic",
    name: "Básico",
    price: 99,
    features: ["Até 5 usuários", "Suporte por email", "Relatórios básicos", "1GB de armazenamento"],
    maxUsers: 5
  },
  {
    id: "premium",
    name: "Premium",
    price: 199,
    features: ["Até 25 usuários", "Suporte prioritário", "Relatórios avançados", "10GB de armazenamento", "Integrações"],
    maxUsers: 25,
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 399,
    features: ["Usuários ilimitados", "Suporte 24/7", "Relatórios customizados", "Armazenamento ilimitado", "API completa"],
    maxUsers: 999
  }
];

// ================================
// COMPONENTE PRINCIPAL
// ================================

export const CreateClient: React.FC = () => {
  const navigate = useNavigate();
  const { get, combine } = useThemeClasses();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSaas, setSelectedSaas] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formulário
  const form = useForm({
    initialValues: {
      // Informações pessoais
      name: "",
      email: "",
      phone: "",
      position: "",
      
      // Informações da empresa
      company: "",
      cnpj: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      
      // Configurações da conta
      password: "",
      confirmPassword: "",
      
      // Configurações adicionais
      totalUsers: 1,
      startDate: new Date().toISOString().split('T')[0],
      notes: ""
    },
    validationSchema: {
      name: validators.required("Nome é obrigatório"),
      email: validators.email("Email inválido"),
      phone: validators.required("Telefone é obrigatório"),
      company: validators.required("Empresa é obrigatória"),
      cnpj: validators.cnpj("CNPJ inválido"),
      password: validators.minLength(8, "Mínimo 8 caracteres"),
      confirmPassword: validators.required("Confirmação de senha é obrigatória"),
    },
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        // Simular chamada para API
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("Cliente criado:", values);
        navigate("/admin/clients");
      } catch (error) {
        console.error("Erro ao criar cliente:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const steps = [
    { id: 1, title: "SAAS", description: "Escolha o sistema" },
    { id: 2, title: "Plano", description: "Selecione o plano" },
    { id: 3, title: "Cliente", description: "Informações do cliente" },
    { id: 4, title: "Empresa", description: "Dados da empresa" },
    { id: 5, title: "Revisão", description: "Confirme os dados" }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };

  const getSelectedSaas = () => {
    return saasOptions.find(saas => saas.id === selectedSaas);
  };

  const getSelectedPlan = () => {
    return planOptions.find(plan => plan.id === selectedPlan);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedSaas !== "";
      case 2:
        return selectedPlan !== "";
      case 3:
        return form.values.name && form.values.email && form.values.phone;
      case 4:
        return form.values.company && form.values.cnpj;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Escolha o SAAS</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Selecione qual sistema o cliente utilizará
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {saasOptions.map((saas) => {
                const Icon = saas.icon;
                const isSelected = selectedSaas === saas.id;
                return (
                  <div
                    key={saas.id}
                    onClick={() => setSelectedSaas(saas.id)}
                    className={cn(
                      "p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105",
                      isSelected
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-500/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    )}
                  >
                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4", `bg-gradient-to-br ${saas.color}`)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className={cn("font-semibold text-lg mb-2", get("text.primary"))}>{saas.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{saas.description}</p>
                    <ul className="text-sm space-y-1">
                      {saas.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Escolha o Plano</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Selecione o plano ideal para o cliente
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {planOptions.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={cn(
                      "p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 relative",
                      isSelected
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-500/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    )}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-500 text-white px-3 py-1 text-xs font-medium rounded-full">
                          Mais Popular
                        </span>
                      </div>
                    )}
                    <div className="text-center mb-4">
                      <h4 className={cn("font-semibold text-lg", get("text.primary"))}>{plan.name}</h4>
                      <p className="text-3xl font-bold text-blue-500">{formatCurrency(plan.price)}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">por mês</p>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Informações do Cliente</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Dados pessoais do responsável pela conta
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField name="name" label="Nome Completo">
                {({ value, error, onChange, onBlur }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Digite o nome completo"
                    leftIcon={<User className="w-4 h-4" />}
                    error={error || undefined}
                  />
                )}
              </FormField>
              <FormField name="email" label="Email">
                {({ value, error, onChange, onBlur }) => (
                  <Input
                    type="email"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="email@exemplo.com"
                    leftIcon={<Mail className="w-4 h-4" />}
                    error={error || undefined}
                  />
                )}
              </FormField>
              <FormField name="phone" label="Telefone">
                {({ value, error, onChange, onBlur }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="(11) 99999-9999"
                    leftIcon={<Phone className="w-4 h-4" />}
                    error={error || undefined}
                  />
                )}
              </FormField>
              <FormField name="position" label="Cargo">
                {({ value, error, onChange, onBlur }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Ex: Gerente, Diretor"
                    leftIcon={<User className="w-4 h-4" />}
                    error={error || undefined}
                  />
                )}
              </FormField>
              <FormField name="password" label="Senha">
                {({ value, error, onChange, onBlur }) => (
                  <PasswordInput
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Mínimo 8 caracteres"
                    error={error || undefined}
                  />
                )}
              </FormField>
              <FormField name="confirmPassword" label="Confirmar Senha">
                {({ value, error, onChange, onBlur }) => (
                  <PasswordInput
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Digite a senha novamente"
                    error={error || undefined}
                  />
                )}
              </FormField>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Informações da Empresa</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Dados da empresa do cliente
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField name="company" label="Nome da Empresa">
                {({ value, error, onChange, onBlur }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Nome da empresa"
                    leftIcon={<Building2 className="w-4 h-4" />}
                    error={error || undefined}
                  />
                )}
              </FormField>
              <FormField name="cnpj" label="CNPJ">
                {({ value, error, onChange, onBlur }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="00.000.000/0000-00"
                    leftIcon={<Building2 className="w-4 h-4" />}
                    error={error || undefined}
                  />
                )}
              </FormField>
              <div className="md:col-span-2">
                <FormField name="address" label="Endereço">
                  {({ value, error, onChange, onBlur }) => (
                    <Input
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder="Rua, número, bairro"
                      leftIcon={<MapPin className="w-4 h-4" />}
                      error={error || undefined}
                    />
                  )}
                </FormField>
              </div>
              <FormField name="city" label="Cidade">
                {({ value, error, onChange, onBlur }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Cidade"
                    error={error || undefined}
                  />
                )}
              </FormField>
              <FormField name="state" label="Estado">
                {({ value, error, onChange, onBlur }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Estado"
                    error={error || undefined}
                  />
                )}
              </FormField>
              <FormField name="zipCode" label="CEP">
                {({ value, error, onChange, onBlur }) => (
                  <Input
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="00000-000"
                    error={error || undefined}
                  />
                )}
              </FormField>
              <FormField name="totalUsers" label="Número de Usuários">
                {({ value, error, onChange, onBlur }) => (
                  <Input
                    type="number"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="1"
                    leftIcon={<Users className="w-4 h-4" />}
                    error={error || undefined}
                  />
                )}
              </FormField>
              <FormField name="startDate" label="Data de Início">
                {({ value, error, onChange, onBlur }) => (
                  <Input
                    type="date"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    leftIcon={<Calendar className="w-4 h-4" />}
                    error={error || undefined}
                  />
                )}
              </FormField>
            </div>
            <FormField name="notes" label="Observações">
              {({ value, error, onChange, onBlur }) => (
                <Textarea
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="Observações adicionais sobre o cliente..."
                  rows={4}
                  error={error || undefined}
                />
              )}
            </FormField>
          </div>
        );

      case 5:
        const selectedSaasData = getSelectedSaas();
        const selectedPlanData = getSelectedPlan();
        
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Revisão dos Dados</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Confirme todas as informações antes de criar o cliente
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* SAAS e Plano */}
              <Card>
                <CardHeader title="SAAS e Plano">
                  <div className="space-y-4">
                    {selectedSaasData && (
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white", `bg-gradient-to-br ${selectedSaasData.color}`)}>
                          <selectedSaasData.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className={cn("font-medium", get("text.primary"))}>{selectedSaasData.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{selectedSaasData.description}</p>
                        </div>
                      </div>
                    )}
                    {selectedPlanData && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className={cn("font-medium", get("text.primary"))}>{selectedPlanData.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Até {selectedPlanData.maxUsers} usuários
                            </p>
                          </div>
                          <p className="text-lg font-bold text-blue-500">
                            {formatCurrency(selectedPlanData.price)}/mês
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardHeader>
              </Card>

              {/* Informações do Cliente */}
              <Card>
                <CardHeader title="Informações do Cliente">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Nome</p>
                      <p className={cn("font-medium", get("text.primary"))}>{form.values.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                      <p className={cn("font-medium", get("text.primary"))}>{form.values.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Telefone</p>
                      <p className={cn("font-medium", get("text.primary"))}>{form.values.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Cargo</p>
                      <p className={cn("font-medium", get("text.primary"))}>{form.values.position}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Informações da Empresa */}
              <Card>
                <CardHeader title="Informações da Empresa">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Empresa</p>
                      <p className={cn("font-medium", get("text.primary"))}>{form.values.company}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">CNPJ</p>
                      <p className={cn("font-medium", get("text.primary"))}>{form.values.cnpj}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Endereço</p>
                      <p className={cn("font-medium", get("text.primary"))}>{form.values.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Usuários</p>
                      <p className={cn("font-medium", get("text.primary"))}>{form.values.totalUsers}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Observações */}
              {form.values.notes && (
                <Card>
                  <CardHeader title="Observações">
                    <p className="text-sm">{form.values.notes}</p>
                  </CardHeader>
                </Card>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <IconButton
            icon={<ArrowLeft className="w-4 h-4" />}
            variant="ghost"
            onClick={() => navigate("/admin/clients")}
            aria-label="Voltar"
          />
          <div>
            <h1 className={cn("text-3xl font-bold", get("text.primary"))}>
              Criar Novo Cliente
            </h1>
            <p className={cn("text-lg", get("text.secondary"))}>
              Adicione um novo cliente ao sistema
            </p>
          </div>
        </div>

      {/* Steps */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-semibold",
                    currentStep >= step.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  )}>
                    {step.id}
                  </div>
                  <div className="ml-3">
                    <p className={cn(
                      "font-medium",
                      currentStep >= step.id ? "text-blue-500" : "text-gray-600 dark:text-gray-400"
                    )}>
                      {step.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-12 h-0.5 bg-gray-200 dark:bg-gray-700 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      {/* Form Content */}
        <Card>
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="secondary"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Anterior
            </Button>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => navigate("/admin/clients")}
              >
                Cancelar
              </Button>
              {currentStep === steps.length ? (
                <LoadingButton
                  loading={isSubmitting}
                  onClick={form.handleSubmit}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Criar Cliente
                </LoadingButton>
              ) : (
                <Button
                  variant="primary"
                  onClick={nextStep}
                  disabled={!canProceed()}
                >
                  Próximo
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
    </div>
  );
};

export default CreateClient;
