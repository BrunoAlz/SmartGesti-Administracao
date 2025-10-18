import { StylesConfig } from "react-select";

// ================================
// TIPOS
// ================================

export interface OptionType {
  value: string;
  label: string;
}

export interface SelectThemeProps {
  theme: "light" | "dark";
}

// ================================
// ESTILOS PARA REACT-SELECT
// ================================

export const getSelectStyles = (
  theme: "light" | "dark"
): StylesConfig<OptionType, boolean> => ({
  control: (provided, state) => ({
    ...provided,
    backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
    borderColor: state.isFocused
      ? "#3b82f6"
      : theme === "dark"
        ? "#4b5563"
        : "#d1d5db",
    color: theme === "dark" ? "#ffffff" : "#000000",
    minHeight: "38px",
    fontSize: "14px",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.5)" : "none",
    "&:hover": {
      borderColor: "#3b82f6",
    },
    transition: "all 0.2s ease",
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: theme === "dark" ? "#374151" : "#ffffff",
    border: theme === "dark" ? "1px solid #4b5563" : "1px solid #d1d5db",
    borderRadius: "8px",
    boxShadow:
      theme === "dark"
        ? "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)"
        : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    zIndex: 9999,
  }),

  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#3b82f6"
      : state.isFocused
        ? theme === "dark"
          ? "#4b5563"
          : "#f3f4f6"
        : "transparent",
    color: state.isSelected
      ? "#ffffff"
      : theme === "dark"
        ? "#ffffff"
        : "#000000",
    fontSize: "14px",
    padding: "8px 12px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: state.isSelected
        ? "#3b82f6"
        : theme === "dark"
          ? "#4b5563"
          : "#f3f4f6",
    },
  }),

  singleValue: (provided) => ({
    ...provided,
    color: theme === "dark" ? "#ffffff" : "#000000",
    fontSize: "14px",
  }),

  multiValue: (provided) => ({
    ...provided,
    backgroundColor: theme === "dark" ? "#4b5563" : "#e5e7eb",
    borderRadius: "6px",
  }),

  multiValueLabel: (provided) => ({
    ...provided,
    color: theme === "dark" ? "#ffffff" : "#000000",
    fontSize: "12px",
    padding: "2px 6px",
  }),

  multiValueRemove: (provided) => ({
    ...provided,
    color: theme === "dark" ? "#ffffff" : "#000000",
    "&:hover": {
      backgroundColor: theme === "dark" ? "#6b7280" : "#d1d5db",
      color: theme === "dark" ? "#ffffff" : "#000000",
    },
  }),

  placeholder: (provided) => ({
    ...provided,
    color: theme === "dark" ? "#9ca3af" : "#6b7280",
    fontSize: "14px",
  }),

  input: (provided) => ({
    ...provided,
    color: theme === "dark" ? "#ffffff" : "#000000",
    fontSize: "14px",
  }),

  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: theme === "dark" ? "#4b5563" : "#d1d5db",
  }),

  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused
      ? "#3b82f6"
      : theme === "dark"
        ? "#9ca3af"
        : "#6b7280",
    "&:hover": {
      color: "#3b82f6",
    },
  }),

  clearIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused
      ? "#ef4444"
      : theme === "dark"
        ? "#9ca3af"
        : "#6b7280",
    "&:hover": {
      color: "#ef4444",
    },
  }),
});

// ================================
// ESTILOS PARA SWEET ALERT
// ================================

export const getSweetAlertStyles = (theme: "light" | "dark") => ({
  popup: theme === "dark" ? "dark:bg-gray-800 dark:text-white" : "",
  confirmButton: "#3b82f6",
  cancelButton: "#6b7280",
  denyButton: "#ef4444",
});

// ================================
// VALIDAÇÕES PERSONALIZADAS
// ================================

export const validateCNPJ = (cnpj: string): boolean => {
  // Remove caracteres não numéricos
  const cleanCNPJ = cnpj.replace(/[^\d]/g, "");

  // Verifica se tem 14 dígitos
  if (cleanCNPJ.length !== 14) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;

  // Algoritmo de validação do CNPJ
  let tamanho = cleanCNPJ.length - 2;
  let numeros = cleanCNPJ.substring(0, tamanho);
  let digitos = cleanCNPJ.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cleanCNPJ.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado === parseInt(digitos.charAt(1));
};

export const validateCEP = (cep: string): boolean => {
  return /^\d{5}-?\d{3}$/.test(cep);
};

export const validatePhone = (phone: string): boolean => {
  return /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/.test(phone);
};

// ================================
// FORMATADORES
// ================================

export const formatCNPJ = (value: string): string => {
  const cleanValue = value.replace(/[^\d]/g, "");
  return cleanValue
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})/, "$1-$2")
    .slice(0, 18);
};

export const formatCEP = (value: string): string => {
  const cleanValue = value.replace(/[^\d]/g, "");
  return cleanValue.replace(/(\d{5})(\d{1,3})/, "$1-$2").slice(0, 9);
};

export const formatPhone = (value: string): string => {
  const cleanValue = value.replace(/[^\d]/g, "");
  if (cleanValue.length <= 10) {
    return cleanValue
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d{1,4})/, "$1-$2");
  } else {
    return cleanValue
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{1,4})/, "$1-$2")
      .slice(0, 15);
  }
};

export const formatSubdomain = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
};

// ================================
// COMPONENTES DE VALIDAÇÃO
// ================================

export const getPasswordStrength = (
  password: string
): {
  score: number;
  label: string;
  color: string;
} => {
  let score = 0;

  // Comprimento
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // Caracteres
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { score, label: "Fraca", color: "text-red-500" };
  if (score <= 4) return { score, label: "Média", color: "text-yellow-500" };
  return { score, label: "Forte", color: "text-green-500" };
};

// ================================
// OPÇÕES PADRÃO
// ================================

export const defaultPlanoOptions = [
  {
    value: "Starter",
    label: "Starter",
    usuarios: 5,
    preco: "R$ 199,90",
    descricao: "Ideal para clínicas pequenas",
    modulos: ["Agendamentos", "Pacientes", "Prontuários"],
  },
  {
    value: "Professional",
    label: "Professional",
    usuarios: 15,
    preco: "R$ 399,90",
    descricao: "Para clínicas em crescimento",
    modulos: [
      "Agendamentos",
      "Pacientes",
      "Prontuários",
      "Faturamento",
      "Relatórios",
    ],
  },
  {
    value: "Enterprise",
    label: "Enterprise",
    usuarios: 50,
    preco: "R$ 799,90",
    descricao: "Para grandes clínicas",
    modulos: ["Todos os módulos", "API Personalizada", "Suporte Prioritário"],
  },
];

export const defaultModulosOptions = [
  { value: "Agendamentos", label: "Agendamentos" },
  { value: "Pacientes", label: "Pacientes" },
  { value: "Prontuários", label: "Prontuários" },
  { value: "Faturamento", label: "Faturamento" },
  { value: "Relatórios", label: "Relatórios" },
  { value: "Marketing", label: "Marketing" },
  { value: "Estoque", label: "Estoque" },
  { value: "Financeiro", label: "Financeiro" },
];

export const defaultEstadosOptions = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

export const defaultCargoOptions = [
  { value: "Administrador", label: "Administrador" },
  { value: "Dentista", label: "Dentista" },
  { value: "Ortodontista", label: "Ortodontista" },
  { value: "Endodontista", label: "Endodontista" },
  { value: "Periodontista", label: "Periodontista" },
  { value: "Cirurgião Oral", label: "Cirurgião Oral" },
  { value: "Recepcionista", label: "Recepcionista" },
  { value: "Auxiliar", label: "Auxiliar de Consultório" },
  { value: "Higienista", label: "Higienista Dental" },
  { value: "Gerente", label: "Gerente" },
  { value: "Outro", label: "Outro" },
];
