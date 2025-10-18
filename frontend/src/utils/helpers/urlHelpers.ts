// ================================
// HELPERS DE URL
// ================================

/**
 * Constrói URL com parâmetros
 */
export const buildUrl = (
  baseUrl: string,
  params: Record<string, any>
): string => {
  const url = new URL(baseUrl);

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
};

/**
 * Extrai parâmetros de query string
 */
export const parseQuery = (queryString: string): Record<string, string> => {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
};
