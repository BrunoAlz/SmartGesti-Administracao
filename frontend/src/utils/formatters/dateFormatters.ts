// ================================
// FORMATADORES DE DATA
// ================================

/**
 * Formata data para exibição brasileira
 */
export const formatDateBR = (date: string | Date): string => {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dateObj);
};

/**
 * Formata data e hora para exibição brasileira
 */
export const formatDateTimeBR = (date: string | Date): string => {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
};

/**
 * Formata apenas a hora
 */
export const formatTime = (date: string | Date): string => {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
};

/**
 * Calcula dias restantes de trial
 */
export const calculateTrialDaysRemaining = (trialEndDate: string): number => {
  if (!trialEndDate) return 0;

  const endDate = new Date(trialEndDate);
  const today = new Date();
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return Math.max(0, diffDays);
};

/**
 * Retorna tempo relativo (ex: "2 dias atrás")
 */
export const getRelativeTime = (dateString: string): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "Agora";
  if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h atrás`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} dias atrás`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} meses atrás`;

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} anos atrás`;
};
