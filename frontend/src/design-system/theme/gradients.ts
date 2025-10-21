// ================================
// TEMA - GRADIENTES
// ================================

/**
 * Definição dos gradientes para botões e elementos de UI
 * Com efeitos avançados de hover e interatividade
 */
export const gradients = {
  // Gradientes para botões
  button: {
    // Gradientes vibrantes com múltiplas cores e efeitos interativos
    'primary-gradient': 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-300',
    'success-gradient': 'bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 hover:from-green-500 hover:via-emerald-600 hover:to-teal-700 text-white shadow-md hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all duration-300',
    'warning-gradient': 'bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 hover:from-amber-500 hover:via-yellow-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] transition-all duration-300',
    'danger-gradient': 'bg-gradient-to-r from-red-500 via-rose-500 to-pink-600 hover:from-red-600 hover:via-rose-600 hover:to-pink-700 text-white shadow-md hover:shadow-lg hover:shadow-red-500/30 hover:scale-[1.02] transition-all duration-300',
    'info-gradient': 'bg-gradient-to-r from-blue-400 via-sky-500 to-cyan-600 hover:from-blue-500 hover:via-sky-600 hover:to-cyan-700 text-white shadow-md hover:shadow-lg hover:shadow-sky-500/30 hover:scale-[1.02] transition-all duration-300',
    'purple-gradient': 'bg-gradient-to-r from-purple-500 via-violet-600 to-indigo-700 hover:from-purple-600 hover:via-violet-700 hover:to-indigo-800 text-white shadow-md hover:shadow-lg hover:shadow-violet-500/30 hover:scale-[1.02] transition-all duration-300',
    'pink-gradient': 'bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:via-rose-600 hover:to-red-600 text-white shadow-md hover:shadow-lg hover:shadow-pink-500/30 hover:scale-[1.02] transition-all duration-300',
    'indigo-gradient': 'bg-gradient-to-r from-indigo-500 via-blue-600 to-violet-700 hover:from-indigo-600 hover:via-blue-700 hover:to-violet-800 text-white shadow-md hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all duration-300',
    'orange-gradient': 'bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white shadow-md hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] transition-all duration-300',
    'teal-gradient': 'bg-gradient-to-r from-teal-500 via-emerald-500 to-green-500 hover:from-teal-600 hover:via-emerald-600 hover:to-green-600 text-white shadow-md hover:shadow-lg hover:shadow-teal-500/30 hover:scale-[1.02] transition-all duration-300',
  },
  
  // Gradientes para backgrounds
  background: {
    'primary': 'bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40',
    'success': 'bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/40',
    'warning': 'bg-gradient-to-b from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/40',
    'error': 'bg-gradient-to-b from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/40',
    'danger': 'bg-gradient-to-b from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/40',
    'info': 'bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40',
    'gray': 'bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-900/40 dark:to-slate-900/60',
  },
  
  // Gradientes para cards
  card: {
    'primary': 'bg-gradient-to-br from-blue-50/80 to-blue-100/90 dark:from-blue-900/10 dark:to-blue-900/20',
    'success': 'bg-gradient-to-br from-green-50/80 to-green-100/90 dark:from-green-900/10 dark:to-green-900/20',
    'warning': 'bg-gradient-to-br from-yellow-50/80 to-yellow-100/90 dark:from-yellow-900/10 dark:to-yellow-900/20',
    'error': 'bg-gradient-to-br from-red-50/80 to-red-100/90 dark:from-red-900/10 dark:to-red-900/20',
    'danger': 'bg-gradient-to-br from-red-50/80 to-red-100/90 dark:from-red-900/10 dark:to-red-900/20',
    'info': 'bg-gradient-to-br from-blue-50/80 to-blue-100/90 dark:from-blue-900/10 dark:to-blue-900/20',
  }
};