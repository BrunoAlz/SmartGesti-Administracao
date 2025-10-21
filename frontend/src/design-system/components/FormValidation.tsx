import React, { useState, useCallback, useMemo } from "react";
import { useThemeClasses } from "../hooks";
import { cn } from "../theme/classes";

// ================================
// TIPOS
// ================================

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
  message?: string;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export interface FormErrors {
  [key: string]: string | null;
}

export interface FormState<T = any> {
  values: T;
  errors: FormErrors;
  touched: { [key: string]: boolean };
  isValid: boolean;
  isSubmitting: boolean;
  isDirty: boolean;
}

export interface UseFormOptions<T = any> {
  initialValues: T;
  validationSchema?: ValidationSchema;
  onSubmit?: (values: T) => void | Promise<void>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

// ================================
// VALIDADORES PRÉ-DEFINIDOS
// ================================

const validators = {
  required: (message = "Este campo é obrigatório"): ValidationRule => ({
    required: true,
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    minLength: min,
    message: message || `Mínimo de ${min} caracteres`,
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    maxLength: max,
    message: message || `Máximo de ${max} caracteres`,
  }),

  email: (message = "Email inválido"): ValidationRule => ({
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message,
  }),

  phone: (message = "Telefone inválido"): ValidationRule => ({
    pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
    message,
  }),

  cpf: (message = "CPF inválido"): ValidationRule => ({
    pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    message,
  }),

  cnpj: (message = "CNPJ inválido"): ValidationRule => ({
    pattern: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
    message,
  }),

  url: (message = "URL inválida"): ValidationRule => ({
    pattern: /^https?:\/\/.+/,
    message,
  }),

  numeric: (message = "Apenas números"): ValidationRule => ({
    pattern: /^\d+$/,
    message,
  }),

  alphanumeric: (message = "Apenas letras e números"): ValidationRule => ({
    pattern: /^[a-zA-Z0-9]+$/,
    message,
  }),

  custom: (validator: (value: any) => string | null): ValidationRule => ({
    custom: validator,
  }),
};

// ================================
// HOOK PRINCIPAL DE FORMULÁRIO
// ================================

const useForm = <T extends Record<string, any>>({
  initialValues,
  validationSchema,
  onSubmit,
  validateOnChange = true,
  validateOnBlur = true,
}: UseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validar campo individual
  const validateField = useCallback((name: string, value: any): string | null => {
    if (!validationSchema || !validationSchema[name]) return null;

    const rules = validationSchema[name];

    // Required
    if (rules.required && (!value || value.toString().trim() === "")) {
      return rules.message || "Este campo é obrigatório";
    }

    // Skip other validations if value is empty and not required
    if (!value || value.toString().trim() === "") return null;

    // Min length
    if (rules.minLength && value.toString().length < rules.minLength) {
      return rules.message || `Mínimo de ${rules.minLength} caracteres`;
    }

    // Max length
    if (rules.maxLength && value.toString().length > rules.maxLength) {
      return rules.message || `Máximo de ${rules.maxLength} caracteres`;
    }

    // Pattern
    if (rules.pattern && !rules.pattern.test(value.toString())) {
      return rules.message || "Formato inválido";
    }

    // Custom validator
    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  }, [validationSchema]);

  // Validar todos os campos
  const validateForm = useCallback((): FormErrors => {
    if (!validationSchema) return {};

    const newErrors: FormErrors = {};
    Object.keys(validationSchema).forEach(field => {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    return newErrors;
  }, [values, validationSchema, validateField]);

  // Atualizar valor do campo
  const setValue = useCallback((name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));

    if (validateOnChange) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [validateOnChange, validateField]);

  // Marcar campo como tocado
  const setTouchedField = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));

    if (validateOnBlur) {
      const error = validateField(name, values[name]);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [validateOnBlur, validateField, values]);

  // Resetar formulário
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Submeter formulário
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setIsSubmitting(true);
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        await onSubmit?.(values);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }

    setIsSubmitting(false);
  }, [values, validateForm, onSubmit]);

  // Computed values
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0 && Object.values(errors).every(error => !error);
  }, [errors]);

  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }, [values, initialValues]);

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    isDirty,
    setValue,
    setTouchedField,
    reset,
    handleSubmit,
    validateField,
    validateForm,
  };
};

// ================================
// COMPONENTE FORM FIELD
// ================================

interface FormFieldProps {
  name: string;
  label?: string;
  children: (props: {
    value: any;
    error: string | null;
    touched: boolean;
    onChange: (value: any) => void;
    onBlur: () => void;
  }) => React.ReactNode;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  children,
  className,
}) => {
  const { get } = useThemeClasses();

  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <label className={cn("block text-sm font-medium", get("text.primary"))}>
          {label}
        </label>
      )}
      {children({
        value: "",
        error: null,
        touched: false,
        onChange: () => {},
        onBlur: () => {},
      })}
    </div>
  );
};

// ================================
// COMPONENTE FORM ERROR
// ================================

interface FormErrorProps {
  name: string;
  className?: string;
}

const FormError: React.FC<FormErrorProps> = ({ name, className }) => {
  const { errors, touched } = useForm({ initialValues: {} });
  
  const error = errors[name];
  const isTouched = touched[name];

  if (!error || !isTouched) return null;

  return (
    <p className={cn("text-sm text-red-600 dark:text-red-400", className)}>
      {error}
    </p>
  );
};

// ================================
// COMPONENTE FORM SUMMARY
// ================================

interface FormSummaryProps {
  errors: FormErrors;
  className?: string;
}

const FormSummary: React.FC<FormSummaryProps> = ({ errors, className }) => {
  const errorMessages = Object.values(errors).filter(Boolean);

  if (errorMessages.length === 0) return null;

  return (
    <div className={cn("p-4 bg-red-50 dark:bg-red-500/20 border border-red-200 dark:border-red-400/30 rounded-md", className)}>
      <h4 className={cn("text-sm font-medium text-red-800 dark:text-red-200 mb-2")}>
        Corrija os seguintes erros:
      </h4>
      <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
        {errorMessages.map((error, index) => (
          <li key={index}>• {error}</li>
        ))}
      </ul>
    </div>
  );
};

// ================================
// HOOKS DE VALIDAÇÃO ESPECÍFICOS
// ================================

const useFieldValidation = (name: string, rules: ValidationRule) => {
  const validate = useCallback((value: any): string | null => {
    // Required
    if (rules.required && (!value || value.toString().trim() === "")) {
      return rules.message || "Este campo é obrigatório";
    }

    // Skip other validations if value is empty and not required
    if (!value || value.toString().trim() === "") return null;

    // Min length
    if (rules.minLength && value.toString().length < rules.minLength) {
      return rules.message || `Mínimo de ${rules.minLength} caracteres`;
    }

    // Max length
    if (rules.maxLength && value.toString().length > rules.maxLength) {
      return rules.message || `Máximo de ${rules.maxLength} caracteres`;
    }

    // Pattern
    if (rules.pattern && !rules.pattern.test(value.toString())) {
      return rules.message || "Formato inválido";
    }

    // Custom validator
    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  }, [rules]);

  return { validate };
};

// ================================
// UTILITÁRIOS DE VALIDAÇÃO
// ================================

const validationUtils = {
  // Validar CPF
  validateCPF: (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, "");
    if (cleanCPF.length !== 11) return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
    
    // Validar dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF[i]) * (10 - i);
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;
    
    if (parseInt(cleanCPF[9]) !== digit1) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF[i]) * (11 - i);
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;
    
    return parseInt(cleanCPF[10]) === digit2;
  },

  // Validar CNPJ
  validateCNPJ: (cnpj: string): boolean => {
    const cleanCNPJ = cnpj.replace(/\D/g, "");
    if (cleanCNPJ.length !== 14) return false;
    
    // Verificar se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;
    
    // Validar dígitos verificadores
    let sum = 0;
    let weight = 2;
    for (let i = 11; i >= 0; i--) {
      sum += parseInt(cleanCNPJ[i]) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }
    let remainder = sum % 11;
    let digit1 = remainder < 2 ? 0 : 11 - remainder;
    
    if (parseInt(cleanCNPJ[12]) !== digit1) return false;
    
    sum = 0;
    weight = 2;
    for (let i = 12; i >= 0; i--) {
      sum += parseInt(cleanCNPJ[i]) * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }
    remainder = sum % 11;
    let digit2 = remainder < 2 ? 0 : 11 - remainder;
    
    return parseInt(cleanCNPJ[13]) === digit2;
  },

  // Validar email
  validateEmail: (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  // Validar telefone brasileiro
  validatePhone: (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, "");
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  },

  // Validar URL
  validateURL: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Validar senha forte
  validateStrongPassword: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push("Mínimo de 8 caracteres");
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push("Pelo menos uma letra maiúscula");
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push("Pelo menos uma letra minúscula");
    }
    
    if (!/\d/.test(password)) {
      errors.push("Pelo menos um número");
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Pelo menos um caractere especial");
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};

// ================================
// EXPORTS
// ================================

export default useForm;
export {
  useForm,
  validators,
  FormField,
  FormError,
  FormSummary,
  useFieldValidation,
  validationUtils,
};
