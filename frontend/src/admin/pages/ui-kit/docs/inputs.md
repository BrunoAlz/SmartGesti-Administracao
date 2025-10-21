# 📝 Inputs & Forms - UI Kit

## 🎯 Visão Geral

Esta página demonstra todos os componentes de entrada de dados do SmartGesti Design System, incluindo exemplos interativos, códigos de implementação e boas práticas.

## 🗂️ Componentes Demonstrados

### **✅ Implementados**
- **Input** - Campo de entrada básico com variantes
- **PasswordInput** - Campo de senha com toggle
- **SearchInput** - Campo de busca otimizado  
- **Select** - Dropdown de seleção
- **Textarea** - Campo multilinha
- **Checkbox** - Caixa de seleção múltipla
- **Radio & RadioGroup** - Seleção única
- **Switch** - Interruptor toggle

## 🎨 Recursos Destacados

### **Integração com Temas**
- ✨ **Auto-adaptação** aos modos claro e escuro
- 🎭 **Classes temáticas** aplicadas automaticamente
- 🌈 **Cores semânticas** consistentes

### **Estados de Validação**
- ❌ **Estados de erro** com mensagens
- ✅ **Estados de sucesso** com confirmação
- ⚠️ **Estados de aviso** para alertas
- 🔄 **Estados de loading** com spinners

### **Acessibilidade**
- ♿ **Labels semânticos** para screen readers
- ⌨️ **Navegação por teclado** completa
- 🎯 **Estados de foco** bem definidos
- 📱 **Responsividade** em todos dispositivos

## 💡 Exemplos Práticos

### **Input Básico**
```typescript
import { Input } from '@/design-system';
import { User, Mail, Phone } from 'lucide-react';

// Input com ícone e validação
<Input
  label="Nome Completo"
  placeholder="Digite seu nome"
  leftIcon={<User />}
  helperText="Nome e sobrenome"
  required
/>

// Input com estado de erro
<Input
  label="Email"
  placeholder="seu@email.com"
  leftIcon={<Mail />}
  error="Email já está em uso"
  type="email"
/>

// Input com sucesso
<Input
  label="Telefone"
  placeholder="(11) 99999-9999"
  leftIcon={<Phone />}
  success="Número verificado!"
  type="tel"
/>
```

### **Select com Estados**
```typescript
import { Select } from '@/design-system';

// Select básico
<Select
  label="País de residência"
  placeholder="Selecione um país"
  helperText="Usado para cálculo de impostos"
>
  <option value="br">🇧🇷 Brasil</option>
  <option value="us">🇺🇸 Estados Unidos</option>
  <option value="uk">🇬🇧 Reino Unido</option>
  <option value="ca">🇨🇦 Canadá</option>
</Select>

// Select com erro
<Select
  label="Plano de assinatura"
  error="Selecione um plano para continuar"
  placeholder="Escolha seu plano"
>
  <option value="free">Gratuito</option>
  <option value="pro">Pro - R$ 29/mês</option>
  <option value="enterprise">Enterprise - R$ 99/mês</option>
</Select>
```

### **Formulário Completo**
```typescript
import { 
  Input, 
  PasswordInput, 
  Select, 
  Textarea, 
  Checkbox, 
  Switch, 
  RadioGroup, 
  Radio,
  Button 
} from '@/design-system';

function FormularioCompleto() {
  const [dados, setDados] = useState({
    nome: '',
    email: '',
    senha: '',
    pais: '',
    biografia: '',
    aceitaTermos: false,
    receberEmails: false,
    tipoNotificacao: 'todas'
  });

  return (
    <form className="space-y-6 max-w-2xl mx-auto">
      {/* Informações Pessoais */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Informações Pessoais</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nome completo"
            placeholder="Seu nome"
            leftIcon={<User />}
            value={dados.nome}
            onChange={(e) => setDados({...dados, nome: e.target.value})}
            required
          />
          
          <Input
            label="Email"
            placeholder="seu@email.com"
            type="email"
            leftIcon={<Mail />}
            value={dados.email}
            onChange={(e) => setDados({...dados, email: e.target.value})}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PasswordInput
            label="Senha"
            placeholder="Mínimo 8 caracteres"
            leftIcon={<Lock />}
            value={dados.senha}
            onChange={(e) => setDados({...dados, senha: e.target.value})}
            required
          />
          
          <Select
            label="País"
            placeholder="Selecione seu país"
            value={dados.pais}
            onChange={(e) => setDados({...dados, pais: e.target.value})}
            required
          >
            <option value="br">Brasil</option>
            <option value="us">Estados Unidos</option>
            <option value="uk">Reino Unido</option>
          </Select>
        </div>

        <Textarea
          label="Biografia"
          placeholder="Conte um pouco sobre você... (opcional)"
          helperText="Máximo 500 caracteres"
          rows={4}
          value={dados.biografia}
          onChange={(e) => setDados({...dados, biografia: e.target.value})}
        />
      </div>

      {/* Preferências */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Preferências</h2>
        
        <Checkbox
          label="Aceito os termos e condições de uso"
          helperText="Leia nossos termos antes de prosseguir"
          checked={dados.aceitaTermos}
          onChange={(e) => setDados({...dados, aceitaTermos: e.target.checked})}
          required
        />

        <Switch
          label="Quero receber emails promocionais"
          helperText="Prometemos enviar no máximo 1 email por semana"
          checked={dados.receberEmails}
          onChange={(e) => setDados({...dados, receberEmails: e.target.checked})}
        />

        <RadioGroup
          name="notificacoes"
          label="Tipo de notificações"
          value={dados.tipoNotificacao}
          onChange={(value) => setDados({...dados, tipoNotificacao: value})}
          helperText="Você pode alterar isso depois nas configurações"
        >
          <Radio 
            value="todas" 
            label="Todas as notificações"
            helperText="Receber todas as atualizações e alertas" 
          />
          <Radio 
            value="importantes" 
            label="Apenas importantes"
            helperText="Somente notificações críticas e urgentes" 
          />
          <Radio 
            value="nenhuma" 
            label="Nenhuma notificação"
            helperText="Não receber notificações por email" 
          />
        </RadioGroup>
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button variant="secondary" fullWidth className="sm:w-auto">
          Cancelar
        </Button>
        <Button variant="primary" fullWidth className="sm:flex-1">
          Criar Conta
        </Button>
      </div>
    </form>
  );
}
```

## 🎨 Variações de Tamanho

### **Inputs em Diferentes Tamanhos**
```typescript
// Small - Para interfaces compactas
<Input size="sm" label="Campo pequeno" placeholder="Pequeno" />

// Medium - Padrão recomendado
<Input size="md" label="Campo médio" placeholder="Médio" />

// Large - Para destaque ou acessibilidade
<Input size="lg" label="Campo grande" placeholder="Grande" />
```

### **Componentes Responsivos**
```typescript
// Grid que se adapta ao tamanho da tela
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <Input label="Campo 1" />
  <Input label="Campo 2" />  
  <Input label="Campo 3" />
</div>

// Largura total em telas pequenas
<Input fullWidth label="Campo responsivo" />
```

## 🌈 Variantes de Switch

### **Switch com Cores Semânticas**
```typescript
// Default (azul)
<Switch variant="default" label="Configuração geral" />

// Success (verde) - para ações positivas
<Switch variant="success" label="Ativar funcionalidade" />

// Warning (amarelo) - para atenção
<Switch variant="warning" label="Modo experimental" />

// Danger (vermelho) - para ações críticas  
<Switch variant="danger" label="Modo de manutenção" />
```

## 🔍 Estados Especiais

### **Checkbox Indeterminado**
```typescript
// Útil para "Selecionar todos" em listas
<Checkbox
  label="Selecionar todos os itens"
  indeterminate={some_but_not_all_selected}
  onChange={handleSelectAll}
/>
```

### **Input com Loading**
```typescript
// Durante validação assíncrona
<Input
  label="CEP"
  placeholder="00000-000"
  loading={validatingCep}
  value={cep}
  onChange={(e) => {
    setCep(e.target.value);
    validateCep(e.target.value);
  }}
/>
```

## 📱 Melhor Experiência Mobile

### **Tipos de Input Otimizados**
```typescript
// Email com teclado específico
<Input type="email" label="Email" />

// Telefone com teclado numérico
<Input type="tel" label="Telefone" />

// Número com controles +/-
<Input type="number" label="Idade" />

// URL com sugestões
<Input type="url" label="Website" />
```

### **Textarea Adaptável**
```typescript
// Redimensiona verticalmente
<Textarea
  label="Comentários"
  rows={3}
  className="resize-y"
  placeholder="Seus comentários..."
/>
```

## 🎯 Dicas de UX

### **Labels Descritivos**
```typescript
// ✅ Bom - claro e específico
<Input label="Email para login" />

// ❌ Evitar - vago demais
<Input label="Dados" />
```

### **Helper Text Útil**
```typescript
// ✅ Informações que ajudam o usuário
<Input 
  label="Senha" 
  helperText="Mínimo 8 caracteres com números e letras"
/>

<PasswordInput
  label="Nova senha"
  helperText="Deve conter ao menos: 8 caracteres, 1 número, 1 letra maiúscula"
/>
```

### **Estados de Erro Específicos**
```typescript
// ✅ Mensagens específicas ajudam mais
<Input 
  label="CPF" 
  error="CPF deve ter 11 dígitos"
/>

// ❌ Mensagens genéricas confundem
<Input 
  label="CPF" 
  error="Campo inválido"
/>
```

## 🔧 Customização Avançada

### **Estilos Condicionais**
```typescript
import { cn } from '@/design-system/theme-classes';

<Input
  label="Campo customizado"
  className={cn(
    "transition-all duration-300",
    isHighlighted && "ring-2 ring-yellow-400",
    isValid && "border-green-500"
  )}
/>
```

### **Eventos Personalizados**
```typescript
<SearchInput
  label="Buscar produtos"
  placeholder="Digite para buscar..."
  onSearch={(term) => {
    console.log('Buscando:', term);
    performSearch(term);
  }}
  onKeyPress={(e) => {
    if (e.key === 'Escape') {
      clearSearch();
    }
  }}
/>
```

## 📖 Recursos Adicionais

- **📚 Documentação Completa**: `/design-system/docs/ui/inputs.md`
- **🧩 Componente Fonte**: `/design-system/components/Input.tsx`  
- **🎨 Classes de Tema**: `/design-system/theme-classes.ts`
- **⚡ Hooks Auxiliares**: `/design-system/hooks.ts`

---

**💡 Dica**: Use o modo escuro/claro para testar como os componentes se adaptam automaticamente aos diferentes temas!

**Versão**: 1.0.0  
**Última atualização**: Outubro 2025