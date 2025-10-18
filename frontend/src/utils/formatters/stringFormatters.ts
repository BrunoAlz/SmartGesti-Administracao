// ================================
// FORMATADORES DE STRING
// ================================

/**
 * Trunca texto com reticências
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";

  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength) + "...";
};

/**
 * Capitaliza primeira letra
 */
export const capitalize = (text: string): string => {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Gera slug a partir de texto
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/-+/g, "-") // Remove hífens múltiplos
    .trim();
};

/**
 * Converte texto para title case
 */
export const toTitleCase = (text: string): string => {
  if (!text) return "";

  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
