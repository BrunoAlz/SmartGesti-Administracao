// ================================
// HELPERS DE OBJETO
// ================================

/**
 * Remove propriedades undefined/null de objeto
 */
export const removeEmptyProperties = <T extends Record<string, any>>(
  obj: T
): Partial<T> => {
  const result: Partial<T> = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value !== null && value !== undefined && value !== "") {
      result[key as keyof T] = value;
    }
  });

  return result;
};

/**
 * Clona objeto profundamente
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Mescla objetos profundamente
 */
export const deepMerge = <T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T => {
  const result = { ...target };

  Object.keys(source).forEach((key) => {
    const sourceValue = source[key];
    const targetValue = result[key];

    if (
      typeof sourceValue === "object" &&
      sourceValue !== null &&
      !Array.isArray(sourceValue) &&
      typeof targetValue === "object" &&
      targetValue !== null &&
      !Array.isArray(targetValue)
    ) {
      (result as any)[key] = deepMerge(targetValue, sourceValue);
    } else {
      (result as any)[key] = sourceValue;
    }
  });

  return result;
};
