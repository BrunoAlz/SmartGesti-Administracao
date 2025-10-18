// ================================
// FORMATADORES DE TELEFONE
// ================================

/**
 * Formata telefone para exibição
 */
export const formatPhone = (phone: string): string => {
  if (!phone) return "";

  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 11) {
    return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }

  if (cleaned.length === 10) {
    return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  }

  return phone;
};

/**
 * Remove formatação do telefone
 */
export const unformatPhone = (phone: string): string => {
  return phone.replace(/\D/g, "");
};

/**
 * Formata celular para exibição (assume 11 dígitos)
 */
export const formatCellphone = (cellphone: string): string => {
  if (!cellphone) return "";

  const cleaned = cellphone.replace(/\D/g, "");

  if (cleaned.length === 11) {
    return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }

  return cellphone;
};

/**
 * Formata telefone fixo para exibição (assume 10 dígitos)
 */
export const formatLandline = (landline: string): string => {
  if (!landline) return "";

  const cleaned = landline.replace(/\D/g, "");

  if (cleaned.length === 10) {
    return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  }

  return landline;
};
