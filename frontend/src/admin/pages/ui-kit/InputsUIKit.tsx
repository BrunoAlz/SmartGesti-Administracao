import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Lock, 
  Search, 
  Phone,
  X
} from "lucide-react";
import { 
  useThemeClasses, 
  Input, 
  Textarea,
  PasswordInput,
  SearchInput,
  Select,
  Checkbox,
  Radio,
  Switch,
  RadioGroup,
  cn 
} from "../../../design-system";
import { ComponentShowcase, ComponentSection } from "./components/ComponentShowcase";

// ================================
// PÁGINA INPUTS UI KIT
// ================================

export const InputsUIKit: React.FC = () => {
  const { get } = useThemeClasses();
  
  // Estados para exemplos interativos
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    search: "",
    description: "",
    country: "",
    notifications: false,
    notificationPreference: "all",
    theme: "light",
    plan: "",
    newsletter: false,
    darkMode: false,
    autoSave: true,
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: false,
    maintenanceMode: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={cn("text-3xl font-bold mb-2", get("text.primary"))}>
          Inputs & Forms
        </h1>
        <p className={cn("text-lg", get("text.secondary"))}>
          Componentes de formulário para entrada de dados e interações
        </p>
      </div>

      {/* Input Básico */}
      <ComponentSection
        title="Input Básico"
        description="Campo de entrada de texto com diferentes variações e tamanhos"
      >
        <ComponentShowcase
          title="Tamanhos e Variantes"
          description="Input em diferentes tamanhos (sm, md, lg) e variantes"
          component={
            <div className="space-y-8">
              {/* Tamanhos */}
              <div className="space-y-4">
                <h4 className={cn("font-medium", get("text.primary"))}>Tamanhos</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Input
                    size="sm"
                    placeholder="Small input"
                    label="Small (sm)"
                  />
                  <Input
                    size="md"
                    placeholder="Medium input"
                    label="Medium (md)"
                  />
                  <Input
                    size="lg"
                    placeholder="Large input"
                    label="Large (lg)"
                  />
                </div>
              </div>

              {/* Variantes */}
              <div className="space-y-4">
                <h4 className={cn("font-medium", get("text.primary"))}>Variantes</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Input
                    variant="default"
                    placeholder="Default variant"
                    label="Default"
                  />
                  <Input
                    variant="filled"
                    placeholder="Filled variant"
                    label="Filled"
                  />
                  <Input
                    variant="outlined"
                    placeholder="Outlined variant"
                    label="Outlined"
                  />
                </div>
              </div>
            </div>
          }
          code={`// Diferentes tamanhos
<Input
  size="sm"
  placeholder="Small input"
  label="Small"
/>
<Input
  size="md"
  placeholder="Medium input" 
  label="Medium"
/>
<Input
  size="lg"
  placeholder="Large input"
  label="Large"
/>

// Diferentes variantes
<Input
  variant="default"
  placeholder="Default"
  label="Default"
/>
<Input
  variant="filled"
  placeholder="Filled"
  label="Filled"
/>
<Input
  variant="outlined"
  placeholder="Outlined"
  label="Outlined"
/>`}
        />

        <ComponentShowcase
          title="Estados e Validação"
          description="Estados de erro, sucesso, loading e desabilitado"
          component={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="Campo normal"
                label="Normal"
                helperText="Texto de ajuda"
              />
              <Input
                placeholder="Campo com erro"
                label="Erro"
                error="Este campo é obrigatório"
              />
              <Input
                placeholder="Campo com sucesso"
                label="Sucesso"
                success="Dados válidos!"
              />
              <Input
                placeholder="Campo carregando"
                label="Loading"
                loading
              />
              <Input
                placeholder="Campo desabilitado"
                label="Desabilitado"
                disabled
              />
            </div>
          }
          code={`<Input
  placeholder="Campo normal"
  label="Normal"
  helperText="Texto de ajuda"
/>

<Input
  placeholder="Campo com erro"
  label="Erro"
  error="Este campo é obrigatório"
/>

<Input
  placeholder="Campo com sucesso"
  label="Sucesso"
  success="Dados válidos!"
/>

<Input
  placeholder="Campo carregando"
  label="Loading"
  loading
/>

<Input
  placeholder="Campo desabilitado"
  label="Desabilitado"
  disabled
/>`}
        />

        <ComponentShowcase
          title="Com Ícones"
          description="Inputs com ícones à esquerda e direita"
          component={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="Seu nome"
                label="Nome"
                leftIcon={<User />}
              />
              <Input
                placeholder="seu@email.com"
                label="Email"
                leftIcon={<Mail />}
                type="email"
              />
              <Input
                placeholder="(11) 99999-9999"
                label="Telefone"
                leftIcon={<Phone />}
                type="tel"
              />
              <Input
                placeholder="Buscar..."
                label="Busca"
                leftIcon={<Search />}
                rightIcon={<X />}
              />
            </div>
          }
          code={`<Input
  placeholder="Seu nome"
  label="Nome"
  leftIcon={<User />}
/>

<Input
  placeholder="seu@email.com"
  label="Email"
  leftIcon={<Mail />}
  type="email"
/>

<Input
  placeholder="Buscar..."
  label="Busca"
  leftIcon={<Search />}
  rightIcon={<X />}
/>`}
        />
      </ComponentSection>

      {/* Inputs Especializados */}
      <ComponentSection
        title="Inputs Especializados"
        description="Componentes especializados para diferentes tipos de entrada"
      >
        <ComponentShowcase
          title="Password Input"
          description="Campo de senha com toggle de visibilidade"
          component={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <PasswordInput
                placeholder="Digite sua senha"
                label="Senha"
                leftIcon={<Lock />}
              />
              <PasswordInput
                placeholder="Confirme sua senha"
                label="Confirmar Senha"
                leftIcon={<Lock />}
                showPasswordToggle={false}
              />
            </div>
          }
          code={`<PasswordInput
  placeholder="Digite sua senha"
  label="Senha"
  leftIcon={<Lock />}
/>

<PasswordInput
  placeholder="Confirme sua senha"
  label="Confirmar Senha"
  leftIcon={<Lock />}
  showPasswordToggle={false}
/>`}
        />

        <ComponentShowcase
          title="Search Input"
          description="Campo de busca otimizado"
          component={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <SearchInput
                placeholder="Buscar produtos..."
                label="Busca"
                onSearch={(value) => console.log("Buscar:", value)}
              />
              <SearchInput
                placeholder="Busca sem ícone"
                label="Busca Simples"
                searchIcon={false}
              />
            </div>
          }
          code={`<SearchInput
  placeholder="Buscar produtos..."
  label="Busca"
  onSearch={(value) => console.log("Buscar:", value)}
/>

<SearchInput
  placeholder="Busca sem ícone"
  label="Busca Simples"
  searchIcon={false}
/>`}
        />
      </ComponentSection>

      {/* Select */}
      <ComponentSection
        title="Select (Dropdown)"
        description="Componente de seleção com opções dropdown"
      >
        <ComponentShowcase
          title="Select Básico"
          description="Dropdown de seleção com diferentes estados"
          component={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Select
                label="País"
                placeholder="Selecione um país"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
              >
                <option value="br">Brasil</option>
                <option value="us">Estados Unidos</option>
                <option value="uk">Reino Unido</option>
                <option value="ca">Canadá</option>
                <option value="au">Austrália</option>
              </Select>
              
              <Select
                label="Plano"
                error="Selecione um plano"
                placeholder="Escolha seu plano"
              >
                <option value="free">Gratuito</option>
                <option value="pro">Pro - R$ 29/mês</option>
                <option value="enterprise">Enterprise - R$ 99/mês</option>
              </Select>
              
              <Select
                label="Categoria"
                loading
                placeholder="Carregando..."
              >
                <option value="">Carregando opções...</option>
              </Select>
            </div>
          }
          code={`<Select
  label="País"
  placeholder="Selecione um país"
  value={formData.country}
  onChange={(e) => handleInputChange("country", e.target.value)}
>
  <option value="br">Brasil</option>
  <option value="us">Estados Unidos</option>
  <option value="uk">Reino Unido</option>
</Select>

<Select
  label="Plano"
  error="Selecione um plano"
  placeholder="Escolha seu plano"
>
  <option value="free">Gratuito</option>
  <option value="pro">Pro - R$ 29/mês</option>
  <option value="enterprise">Enterprise - R$ 99/mês</option>
</Select>`}
        />
      </ComponentSection>

      {/* Textarea */}
      <ComponentSection
        title="Textarea"
        description="Campo de texto multilinha para conteúdo extenso"
      >
        <ComponentShowcase
          title="Textarea Básico"
          description="Área de texto com diferentes tamanhos e estados"
          component={
            <div className="grid gap-4">
              <Textarea
                label="Descrição"
                placeholder="Descreva seu projeto..."
                helperText="Máximo 500 caracteres"
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
              
              <Textarea
                label="Comentários"
                placeholder="Seus comentários..."
                error="Campo obrigatório"
                rows={3}
              />
              
              <Textarea
                label="Feedback"
                placeholder="Seu feedback"
                success="Obrigado pelo feedback!"
                rows={3}
              />
            </div>
          }
          code={`<Textarea
  label="Descrição"
  placeholder="Descreva seu projeto..."
  helperText="Máximo 500 caracteres"
  rows={4}
  value={formData.description}
  onChange={(e) => setFormData({...formData, description: e.target.value})}
/>

<Textarea
  label="Comentários"
  placeholder="Seus comentários..."
  error="Campo obrigatório"
  rows={3}
/>

<Textarea
  label="Feedback"
  placeholder="Seu feedback"
  success="Obrigado pelo feedback!"
  rows={3}
/>`}
        />
      </ComponentSection>

      {/* Checkbox e Radio */}
      <ComponentSection
        title="Checkbox & Radio"
        description="Componentes de seleção múltipla e única"
      >
        <ComponentShowcase
          title="Checkbox"
          description="Checkbox em diferentes tamanhos e estados"
          component={
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className={cn("font-medium", get("text.primary"))}>Tamanhos</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Checkbox
                    size="sm"
                    label="Small checkbox"
                    checked={formData.notifications}
                    onChange={(e) => handleInputChange("notifications", e.target.checked)}
                  />
                  <Checkbox
                    size="md"
                    label="Medium checkbox"
                  />
                  <Checkbox
                    size="lg"
                    label="Large checkbox"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className={cn("font-medium", get("text.primary"))}>Estados</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Checkbox
                    label="Aceito os termos e condições"
                    helperText="Leia nossos termos antes de aceitar"
                  />
                  <Checkbox
                    label="Campo com erro"
                    error="Você deve aceitar os termos"
                  />
                  <Checkbox
                    label="Campo desabilitado"
                    disabled
                  />
                  <Checkbox
                    label="Checkbox indeterminado"
                    indeterminate
                  />
                </div>
              </div>
            </div>
          }
          code={`// Diferentes tamanhos
<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />

// Estados
<Checkbox
  label="Aceito os termos"
  helperText="Leia nossos termos"
/>
<Checkbox
  label="Campo com erro"
  error="Você deve aceitar"
/>
<Checkbox
  label="Desabilitado"
  disabled
/>
<Checkbox
  label="Indeterminado"
  indeterminate
/>`}
        />

        <ComponentShowcase
          title="Radio & Radio Group"
          description="Botões de opção para seleção única"
          component={
            <div className="space-y-6">
              <RadioGroup
                name="theme"
                label="Tema da aplicação"
                value={formData.theme}
                onChange={(value) => handleInputChange("theme", value)}
                helperText="Escolha o tema da interface"
              >
                <Radio value="light" label="Claro" />
                <Radio value="dark" label="Escuro" />
                <Radio value="system" label="Sistema" />
              </RadioGroup>
              
              <RadioGroup
                name="plan"
                label="Plano de assinatura"
                value={formData.plan}
                onChange={(value) => handleInputChange("plan", value)}
                error="Selecione um plano"
              >
                <Radio value="free" label="Gratuito" helperText="Recursos básicos" />
                <Radio value="pro" label="Pro - R$ 29/mês" helperText="Recursos avançados" />
                <Radio value="enterprise" label="Enterprise - R$ 99/mês" helperText="Recursos completos" />
              </RadioGroup>
            </div>
          }
          code={`<RadioGroup
  name="theme"
  label="Tema da aplicação"
  value={formData.theme}
  onChange={(value) => setFormData({...formData, theme: value})}
  helperText="Escolha o tema"
>
  <Radio value="light" label="Claro" />
  <Radio value="dark" label="Escuro" />
  <Radio value="system" label="Sistema" />
</RadioGroup>

<RadioGroup
  name="plan"
  label="Plano de assinatura"
  error="Selecione um plano"
>
  <Radio value="free" label="Gratuito" helperText="Recursos básicos" />
  <Radio value="pro" label="Pro" helperText="Recursos avançados" />
</RadioGroup>`}
        />
      </ComponentSection>

      {/* Switch/Toggle */}
      <ComponentSection
        title="Switch (Toggle)"
        description="Interruptor para ativar/desativar funcionalidades"
      >
        <ComponentShowcase
          title="Switch Básico"
          description="Toggle em diferentes tamanhos e variantes"
          component={
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className={cn("font-medium", get("text.primary"))}>Tamanhos</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Switch
                    size="sm"
                    label="Small switch"
                    checked={formData.newsletter}
                    onChange={(e) => handleInputChange("newsletter", e.target.checked)}
                  />
                  <Switch
                    size="md"
                    label="Medium switch"
                    checked={formData.darkMode}
                    onChange={(e) => handleInputChange("darkMode", e.target.checked)}
                  />
                  <Switch
                    size="lg"
                    label="Large switch"
                    checked={formData.autoSave}
                    onChange={(e) => handleInputChange("autoSave", e.target.checked)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className={cn("font-medium", get("text.primary"))}>Variantes</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Switch
                    variant="default"
                    label="Notificações por email"
                    helperText="Receba atualizações por email"
                    checked={formData.emailNotifications}
                    onChange={(e) => handleInputChange("emailNotifications", e.target.checked)}
                  />
                  <Switch
                    variant="success"
                    label="Modo de desenvolvedor"
                    helperText="Habilita funcionalidades avançadas"
                    checked={formData.pushNotifications}
                    onChange={(e) => handleInputChange("pushNotifications", e.target.checked)}
                  />
                  <Switch
                    variant="warning"
                    label="Modo experimental"
                    helperText="Recursos em teste (instável)"
                    checked={formData.smsNotifications}
                    onChange={(e) => handleInputChange("smsNotifications", e.target.checked)}
                  />
                  <Switch
                    variant="danger"
                    label="Modo de manutenção"
                    helperText="Sistema indisponível para usuários"
                    checked={formData.maintenanceMode}
                    onChange={(e) => handleInputChange("maintenanceMode", e.target.checked)}
                  />
                </div>
              </div>
            </div>
          }
          code={`// Diferentes tamanhos
<Switch size="sm" label="Small" />
<Switch size="md" label="Medium" />
<Switch size="lg" label="Large" />

// Variantes
<Switch
  variant="default"
  label="Notificações por email"
  helperText="Receba atualizações"
  checked
/>
<Switch
  variant="success"
  label="Modo desenvolvedor"
  checked
/>
<Switch
  variant="warning"
  label="Modo experimental"
/>
<Switch
  variant="danger"
  label="Modo manutenção"
/>`}
        />
      </ComponentSection>

      {/* Formulário Completo */}
      <ComponentSection
        title="Formulário Completo"
        description="Exemplo de formulário usando todos os componentes"
      >
        <ComponentShowcase
          title="Formulário de Cadastro"
          description="Exemplo completo com validação e diferentes tipos de input"
          component={
            <div className={cn("p-6 rounded-lg border", get("card"))}>
              <h3 className={cn("text-lg font-semibold mb-4", get("text.primary"))}>
                Criar Nova Conta
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nome"
                    placeholder="Seu nome completo"
                    leftIcon={<User />}
                    required
                  />
                  <Input
                    label="Email"
                    placeholder="seu@email.com"
                    type="email"
                    leftIcon={<Mail />}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <PasswordInput
                    label="Senha"
                    placeholder="Mínimo 8 caracteres"
                    leftIcon={<Lock />}
                    required
                  />
                  <Select
                    label="País"
                    placeholder="Selecione seu país"
                    required
                  >
                    <option value="br">Brasil</option>
                    <option value="us">Estados Unidos</option>
                    <option value="uk">Reino Unido</option>
                  </Select>
                </div>
                
                <Textarea
                  label="Bio"
                  placeholder="Conte um pouco sobre você... (opcional)"
                  rows={3}
                />
                
                <div className="space-y-3">
                  <Checkbox
                    label="Aceito os termos e condições de uso"
                    required
                  />
                  <Switch
                    label="Quero receber newsletters"
                    helperText="Enviamos no máximo 1 email por semana"
                    checked={formData.newsletter}
                    onChange={(e) => handleInputChange("newsletter", e.target.checked)}
                  />
                </div>
                
                <RadioGroup
                  name="notifications"
                  label="Preferência de notificações"
                  value={formData.notificationPreference}
                  onChange={(value) => handleInputChange("notificationPreference", value)}
                >
                  <Radio value="all" label="Todas as notificações" />
                  <Radio value="important" label="Apenas importantes" />
                  <Radio value="none" label="Nenhuma notificação" />
                </RadioGroup>
              </div>
            </div>
          }
          code={`// Formulário completo usando todos os componentes
<form>
  <div className="grid grid-cols-2 gap-4">
    <Input
      label="Nome"
      placeholder="Seu nome"
      leftIcon={<User />}
      required
    />
    <Input
      label="Email"
      placeholder="seu@email.com"
      type="email"
      leftIcon={<Mail />}
      required
    />
  </div>
  
  <PasswordInput
    label="Senha"
    placeholder="Mínimo 8 caracteres"
    leftIcon={<Lock />}
    required
  />
  
  <Select label="País" required>
    <option value="br">Brasil</option>
    <option value="us">Estados Unidos</option>
  </Select>
  
  <Textarea
    label="Bio"
    placeholder="Conte sobre você..."
    rows={3}
  />
  
  <Checkbox
    label="Aceito os termos"
    required
  />
  
  <Switch
    label="Receber newsletters"
    helperText="Máximo 1 email/semana"
  />
  
  <RadioGroup name="notifications" label="Notificações">
    <Radio value="all" label="Todas" />
    <Radio value="important" label="Importantes" />
    <Radio value="none" label="Nenhuma" />
  </RadioGroup>
</form>`}
        />
      </ComponentSection>
    </div>
  );
};

export default InputsUIKit;