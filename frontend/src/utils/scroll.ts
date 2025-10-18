// Função utilitária para scroll suave ao topo
export const scrollToTop = (behavior: ScrollBehavior = "smooth") => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior,
  });
};

// Função para scroll suave para um elemento específico
export const scrollToElement = (
  elementId: string,
  behavior: ScrollBehavior = "smooth",
  offset: number = 0
) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior,
    });
  }
};

// Função para verificar se o usuário está no topo da página
export const isAtTop = (threshold: number = 0) => {
  return window.pageYOffset <= threshold;
};
