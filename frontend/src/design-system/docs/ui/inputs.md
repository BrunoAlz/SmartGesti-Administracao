# 🎛️ Sistema de Inputs - SmartGesti

## 📋 Visão Geral

O sistema de inputs do SmartGesti oferece componentes completos para entrada de dados, incluindo validação, estados visuais e integração com temas claro/escuro.

## 🗂️ Componentes Disponíveis

### **Input Principal**
- Input básico com suporte a ícones
- PasswordInput com toggle de visibilidade
- SearchInput otimizado para busca

### **Select (Dropdown)**
- Seleção de opções com placeholder
- Estados de loading e validação

### **Textarea**
- Campo multilinha redimensionável
- Controle de rows e resize

### **Checkbox & Radio**
- Checkbox com estado indeterminado
- RadioGroup para seleção única
- Diferentes tamanhos (sm, md, lg)

### **Switch (Toggle)**
- Interruptor animado
- Variantes coloridas
- Estados de ativado/desativado

## 🎨 Variantes e Tamanhos

### **Variantes de Input**
```typescript
type InputVariant = "default" | "filled" | "outlined";
```

### **Estados Visuais**
```typescript
type InputState = "default" | "error" | "success" | "warning";
```

### **Tamanhos Disponíveis**
```typescript
type InputSize = "sm" | "md" | "lg";
```

## 🔧 Propriedades Principais

### **Input**
```typescript
interface InputProps {
  label?: string;           // Rótulo do campo
  helperText?: string;      // Texto de ajuda
  error?: string;          // Mensagem de erro
  success?: string;        // Mensagem de sucesso
  loading?: boolean;       // Estado de carregamento
  leftIcon?: ReactNode;    // Ícone à esquerda
  rightIcon?: ReactNode;   // Ícone à direita
  size?: InputSize;        // Tamanho do campo
  variant?: InputVariant;  // Variante visual
  state?: InputState;      // Estado de validação
  fullWidth?: boolean;     // Largura total
}
```

### **Select**
```typescript
interface SelectProps {
  label?: string;
  placeholder?: string;    // Texto do placeholder
  loading?: boolean;       // Estado de carregamento
  children: ReactNode;     // Options do select
  // ... outras props do Input
}
```

### **Checkbox**
```typescript
interface CheckboxProps {
  label?: string;
  helperText?: string;
  error?: string;
  size?: InputSize;
  variant?: "default" | "outlined";
  indeterminate?: boolean; // Estado indeterminado
}
```

### **Switch**
```typescript
interface SwitchProps {
  label?: string;
  helperText?: string;
  size?: InputSize;
  variant?: "default" | "success" | "warning" | "danger";
}
```

## 💻 Exemplos de Uso

### **Input Básico**
```typescript
import { Input } from '@/design-system';
import { User, Mail } from 'lucide-react';

// Input simples
<Input
  label="Nome"
  placeholder="Digite seu nome"
  helperText="Nome completo"
/>

// Input com ícone
<Input
  label="Email"
  placeholder="seu@email.com"
  leftIcon={<Mail />}
  type="email"
/>

// Input com validação
<Input
  label="Senha"
  placeholder="Mínimo 8 caracteres"
  error="Senha muito fraca"
  leftIcon={<User />}
/>
```

### **PasswordInput**
```typescript
import { PasswordInput } from '@/design-system';
import { Lock } from 'lucide-react';

<PasswordInput
  label="Senha"
  placeholder="Digite sua senha"
  leftIcon={<Lock />}
  showPasswordToggle={true}
/>
```

### **SearchInput**
```typescript
import { SearchInput } from '@/design-system';

<SearchInput
  placeholder="Buscar produtos..."
  onSearch={(value) => console.log('Buscar:', value)}
  searchIcon={true}
/>
```

### **Select**
```typescript
import { Select } from '@/design-system';

<Select
  label="País"
  placeholder="Selecione um país"
  value={selectedCountry}
  onChange={(e) => setSelectedCountry(e.target.value)}
>
  <option value="br">Brasil</option>
  <option value="us">Estados Unidos</option>
  <option value="uk">Reino Unido</option>
</Select>
```

### **Textarea**
```typescript
import { Textarea } from '@/design-system';

<Textarea
  label="Descrição"
  placeholder="Descreva seu projeto..."
  rows={4}
  helperText="Máximo 500 caracteres"
/>
```

### **Checkbox**
```typescript
import { Checkbox } from '@/design-system';

<Checkbox
  label="Aceito os termos e condições"
  helperText="Leia nossos termos"
  size="md"
/>

// Checkbox indeterminado
<Checkbox
  label="Selecionar todos"
  indeterminate={true}
/>
```

### **RadioGroup**
```typescript
import { RadioGroup, Radio } from '@/design-system';

<RadioGroup
  name="theme"
  label="Tema da aplicação"
  value={selectedTheme}
  onChange={setSelectedTheme}
>
  <Radio value="light" label="Claro" />
  <Radio value="dark" label="Escuro" />
  <Radio value="system" label="Sistema" />
</RadioGroup>
```

### **Switch**
```typescript
import { Switch } from '@/design-system';

<Switch
  label="Receber notificações"
  helperText="Enviamos atualizações importantes"
  checked={notifications}
  onChange={(e) => setNotifications(e.target.checked)}
/>

// Switch com variante
<Switch
  variant="success"
  label="Modo desenvolvedor"
  checked={devMode}
  onChange={(e) => setDevMode(e.target.checked)}
/>
```

## 🎯 Estados de Validação

### **Estados Visuais**
```typescript
// Estado normal
<Input label="Nome" placeholder="Digite aqui..." />

// Estado de erro
<Input 
  label="Email" 
  error="Email inválido"
  placeholder="seu@email.com" 
/>

// Estado de sucesso
<Input 
  label="Senha" 
  success="Senha forte!"
  placeholder="••••••••" 
/>

// Estado de loading
<Input 
  label="CEP" 
  loading={true}
  placeholder="00000-000" 
/>

// Estado desabilitado
<Input 
  label="ID" 
  disabled={true}
  placeholder="Gerado automaticamente" 
/>
```

## 🌙 Integração com Temas

Todos os componentes se adaptam automaticamente aos temas claro e escuro:

```typescript
// Automático com useThemeClasses
const { get } = useThemeClasses();

<div className={get("card")}>
  <Input 
    label="Campo adaptável"
    placeholder="Muda com o tema"
  />
</div>
```

## 🔗 Formulários Completos

### **Exemplo Prático**
```typescript
import { 
  Input, 
  PasswordInput, 
  Select, 
  Textarea, 
  Checkbox, 
  Switch, 
  RadioGroup, 
  Radio 
} from '@/design-system';

function FormularioCadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    pais: '',
    bio: '',
    termos: false,
    newsletter: false,
    tema: 'system'
  });

  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Nome"
          value={formData.nome}
          onChange={(e) => setFormData({...formData, nome: e.target.value})}
          leftIcon={<User />}
          required
        />
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          leftIcon={<Mail />}
          required
        />
      </div>

      <PasswordInput
        label="Senha"
        value={formData.senha}
        onChange={(e) => setFormData({...formData, senha: e.target.value})}
        leftIcon={<Lock />}
        required
      />

      <Select
        label="País"
        value={formData.pais}
        onChange={(e) => setFormData({...formData, pais: e.target.value})}
        placeholder="Selecione seu país"
      >
        <option value="br">Brasil</option>
        <option value="us">Estados Unidos</option>
      </Select>

      <Textarea
        label="Bio"
        value={formData.bio}
        onChange={(e) => setFormData({...formData, bio: e.target.value})}
        placeholder="Conte sobre você..."
        rows={3}
      />

      <Checkbox
        label="Aceito os termos e condições"
        checked={formData.termos}
        onChange={(e) => setFormData({...formData, termos: e.target.checked})}
        required
      />

      <Switch
        label="Quero receber newsletters"
        checked={formData.newsletter}
        onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
        helperText="Máximo 1 email por semana"
      />

      <RadioGroup
        name="theme"
        label="Tema preferido"
        value={formData.tema}
        onChange={(value) => setFormData({...formData, tema: value})}
      >
        <Radio value="light" label="Claro" />
        <Radio value="dark" label="Escuro" />
        <Radio value="system" label="Sistema" />
      </RadioGroup>
    </form>
  );
}
```

## 📱 Responsividade

Todos os inputs são **totalmente responsivos**:

```typescript
// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Input label="Campo 1" />
  <Input label="Campo 2" />
  <Input label="Campo 3" />
</div>

// Full width em mobile
<Input fullWidth label="Campo completo" />
```

## ⚡ Hooks Auxiliares

### **useInputClasses()**
```typescript
import { useInputClasses } from '@/design-system/hooks';

const inputClasses = useInputClasses("additional-class");
```

### **useThemeClasses()**
```typescript
import { useThemeClasses } from '@/design-system/hooks';

const { get, cn } = useThemeClasses();
const labelClass = get("text.primary");
```

## 🎨 Customização

### **Classes CSS Personalizadas**
```typescript
// Aplicar classes adicionais
<Input 
  className="my-custom-input"
  label="Campo customizado"
/>
```

### **Estilos Condicionais**
```typescript
<Input 
  className={cn(
    "base-classes",
    isValid && "border-green-500",
    hasError && "border-red-500"
  )}
/>
```

## 📖 Referências

- **Componente Input**: `/src/design-system/components/Input.tsx`
- **Hooks**: `/src/design-system/hooks.ts`  
- **Theme Classes**: `/src/design-system/theme-classes.ts`
- **UI Kit**: `/admin/ui-kit/inputs`

---

**Versão:** 1.0.0  
**Última atualização:** Outubro 2025