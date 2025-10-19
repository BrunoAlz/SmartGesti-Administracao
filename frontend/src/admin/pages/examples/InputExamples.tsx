import React, { useState } from "react";
import { 
  Input, 
  Textarea, 
  PasswordInput, 
  SearchInput, 
  InputGroup, 
  InputAddon,
  Card,
  CardHeader,
  CardContent,
  Button
} from "../../../design-system";
import { useThemeClasses } from "../../../design-system/hooks";
import { cn } from "../../../design-system/theme-classes";
import { Mail, User, Lock, Search, DollarSign } from "lucide-react";

// ================================
// EXEMPLO DE USO DOS INPUTS
// ================================

export const InputExamples: React.FC = () => {
  const { get } = useThemeClasses();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    message: "",
    search: "",
    price: "",
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className={cn("text-3xl font-bold mb-2", get("text.primary"))}>
          Input Components
        </h1>
        <p className={get("text.secondary")}>
          Exemplos de uso dos componentes de input do Design System
        </p>
      </div>

      {/* Inputs Básicos */}
      <Card>
        <CardHeader title="Inputs Básicos">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Exemplos de inputs básicos com diferentes funcionalidades
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
          </div>
        </CardContent>
      </Card>

      {/* Estados dos Inputs */}
      <Card>
        <CardHeader title="Estados dos Inputs">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Diferentes estados visuais dos inputs
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Input Normal"
              placeholder="Estado normal"
              defaultValue="Valor padrão"
            />

            <Input
              label="Input com Erro"
              placeholder="Digite algo"
              error="Este campo é obrigatório"
              state="error"
            />

            <Input
              label="Input com Sucesso"
              placeholder="Digite algo"
              success="Campo válido!"
              state="success"
            />

            <Input
              label="Input Loading"
              placeholder="Carregando..."
              loading
              disabled
            />
          </div>
        </CardContent>
      </Card>

      {/* Tamanhos */}
      <Card>
        <CardHeader title="Tamanhos">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Diferentes tamanhos disponíveis
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              label="Pequeno"
              placeholder="Tamanho pequeno"
              size="sm"
            />

            <Input
              label="Médio (Padrão)"
              placeholder="Tamanho médio"
              size="md"
            />

            <Input
              label="Grande"
              placeholder="Tamanho grande"
              size="lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Variantes */}
      <Card>
        <CardHeader title="Variantes">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Diferentes estilos visuais
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              label="Padrão"
              placeholder="Variante padrão"
              variant="default"
            />

            <Input
              label="Preenchido"
              placeholder="Variante preenchida"
              variant="filled"
            />

            <Input
              label="Contornado"
              placeholder="Variante contornada"
              variant="outlined"
            />
          </div>
        </CardContent>
      </Card>

      {/* Textarea */}
      <Card>
        <CardHeader title="Textarea">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Campo de texto multilinha
          </p>
        </CardHeader>
        <CardContent>
          <Textarea
            label="Mensagem"
            placeholder="Digite sua mensagem aqui..."
            value={formData.message}
            onChange={handleInputChange("message")}
            rows={4}
            helperText="Máximo 500 caracteres"
          />
        </CardContent>
      </Card>

      {/* Input Group */}
      <Card>
        <CardHeader title="Input Group">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Inputs agrupados com addons
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className={cn("text-sm font-medium mb-1 block", get("text.primary"))}>
                Preço
              </label>
              <InputGroup>
                <InputAddon position="left">
                  <DollarSign className="w-4 h-4" />
                </InputAddon>
                <Input
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleInputChange("price")}
                  className="rounded-l-none"
                />
                <InputAddon position="right">
                  BRL
                </InputAddon>
              </InputGroup>
            </div>

            <div>
              <label className={cn("text-sm font-medium mb-1 block", get("text.primary"))}>
                URL
              </label>
              <InputGroup>
                <InputAddon position="left">
                  https://
                </InputAddon>
                <Input
                  placeholder="exemplo.com"
                  className="rounded-none"
                />
                <InputAddon position="right">
                  .com
                </InputAddon>
              </InputGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulário Completo */}
      <Card>
        <CardHeader title="Formulário Completo">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Exemplo de formulário completo
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nome Completo"
                placeholder="Digite seu nome completo"
                required
                leftIcon={<User className="w-4 h-4" />}
              />

              <Input
                label="Email"
                type="email"
                placeholder="Digite seu email"
                required
                leftIcon={<Mail className="w-4 h-4" />}
              />

              <PasswordInput
                label="Senha"
                placeholder="Digite sua senha"
                required
                leftIcon={<Lock className="w-4 h-4" />}
              />

              <PasswordInput
                label="Confirmar Senha"
                placeholder="Confirme sua senha"
                required
                leftIcon={<Lock className="w-4 h-4" />}
              />
            </div>

            <Textarea
              label="Biografia"
              placeholder="Conte um pouco sobre você..."
              rows={4}
              helperText="Máximo 1000 caracteres"
            />

            <div className="flex gap-4">
              <Button type="submit" variant="primary">
                Salvar
              </Button>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InputExamples;
