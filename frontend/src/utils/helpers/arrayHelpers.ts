// ================================
// HELPERS DE ARRAY
// ================================

/**
 * Ordena array de objetos por propriedade
 */
export const sortByProperty = <T>(
  array: T[],
  property: keyof T,
  direction: "asc" | "desc" = "asc"
): T[] => {
  return [...array].sort((a, b) => {
    const aValue = a[property];
    const bValue = b[property];

    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });
};

/**
 * Filtra objetos por texto em múltiplas propriedades
 */
export const filterByText = <T>(
  array: T[],
  searchText: string,
  properties: (keyof T)[]
): T[] => {
  if (!searchText.trim()) return array;

  const lowerSearchText = searchText.toLowerCase();

  return array.filter((item) =>
    properties.some((property) => {
      const value = item[property];
      if (typeof value === "string") {
        return value.toLowerCase().includes(lowerSearchText);
      }
      return false;
    })
  );
};

/**
 * Agrupa array por propriedade
 */
export const groupBy = <T, K extends keyof T>(
  array: T[],
  property: K
): Record<string, T[]> => {
  return array.reduce(
    (groups, item) => {
      const key = String(item[property]);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    },
    {} as Record<string, T[]>
  );
};
