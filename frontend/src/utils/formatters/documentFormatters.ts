// ================================
// FORMATADORES DE DOCUMENTOS
// ================================

/**
 * Formata CNPJ para exibição (XX.XXX.XXX/XXXX-XX)
 */
export const formatCNPJ = (cnpj: string): string => {
  if (!cnpj) return "";

  const cleaned = cnpj.replace(/\D/g, "");

  if (cleaned.length !== 14) return cnpj;

  return cleaned.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
};

/**
 * Remove formatação do CNPJ
 */
export const unformatCNPJ = (cnpj: string): string => {
  return cnpj.replace(/\D/g, "");
};

/**
 * Formata CPF para exibição (XXX.XXX.XXX-XX)
 */
export const formatCPF = (cpf: string): string => {
  if (!cpf) return "";

  const cleaned = cpf.replace(/\D/g, "");

  if (cleaned.length !== 11) return cpf;

  return cleaned.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};

/**
 * Remove formatação do CPF
 */
export const unformatCPF = (cpf: string): string => {
  return cpf.replace(/\D/g, "");
};

/**
 * Formata RG para exibição (XX.XXX.XXX-X)
 */
export const formatRG = (rg: string): string => {
  if (!rg) return "";

  const cleaned = rg.replace(/\D/g, "");

  if (cleaned.length !== 9) return rg;

  return cleaned.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");
};

/**
 * Remove formatação do RG
 */
export const unformatRG = (rg: string): string => {
  return rg.replace(/\D/g, "");
};
