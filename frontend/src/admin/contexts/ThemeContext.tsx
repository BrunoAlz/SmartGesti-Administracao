// ================================
// CONTEXTO DE TEMA
// ================================

import { ThemeProvider, ThemeContext, useThemeContext } from '@/design-system';

// Reexportamos o provedor e contexto do tema centralizado
export { ThemeProvider, ThemeContext, useThemeContext };

// Função auxiliar para compatibilidade com código existente
export const useTheme = useThemeContext;