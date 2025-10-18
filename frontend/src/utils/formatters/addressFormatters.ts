// ================================
// FORMATADORES DE ENDEREÇO
// ================================

/**
 * Formata CEP para exibição (XXXXX-XXX)
 */
export const formatCEP = (cep: string): string => {
  if (!cep) return "";

  const cleaned = cep.replace(/\D/g, "");

  if (cleaned.length !== 8) return cep;

  return cleaned.replace(/^(\d{5})(\d{3})$/, "$1-$2");
};

/**
 * Remove formatação do CEP
 */
export const unformatCEP = (cep: string): string => {
  return cep.replace(/\D/g, "");
};

/**
 * Formata endereço completo para exibição
 */
export const formatAddress = (address: {
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}): string => {
  const parts = [];

  if (address.street) {
    let streetPart = address.street;
    if (address.number) streetPart += `, ${address.number}`;
    if (address.complement) streetPart += `, ${address.complement}`;
    parts.push(streetPart);
  }

  if (address.neighborhood) parts.push(address.neighborhood);

  if (address.city && address.state) {
    parts.push(`${address.city} - ${address.state}`);
  } else if (address.city) {
    parts.push(address.city);
  }

  if (address.zipCode) {
    parts.push(formatCEP(address.zipCode));
  }

  return parts.join(", ");
};
