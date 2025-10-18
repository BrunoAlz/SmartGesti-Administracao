"""
Exception classes centralizadas para o sistema
"""


class ErroNegocio(Exception):
    """Exceção base para erros de regra de negócio"""
    
    def __init__(self, mensagem: str, status_code: int = 400):
        self.mensagem = mensagem
        self.status_code = status_code
        super().__init__(mensagem)


class TenantNaoEncontradoErro(ErroNegocio):
    """Erro quando tenant não é encontrado ou é inválido"""
    
    def __init__(self, mensagem: str = "Tenant não encontrado"):
        super().__init__(mensagem, status_code=404)


class ConflitoVersaoErro(ErroNegocio):
    """Erro quando há conflito de versão em update otimista"""
    
    def __init__(self, mensagem: str = "O registro foi atualizado por outra sessão. Recarregue e tente novamente."):
        super().__init__(mensagem, status_code=409)


class PortfolioNaoEncontradoErro(ErroNegocio):
    """Erro quando portfólio não é encontrado"""
    
    def __init__(self, mensagem: str = "Portfólio não encontrado"):
        super().__init__(mensagem, status_code=404)


class PortfolioNaoPublicadoErro(ErroNegocio):
    """Erro quando portfólio não está publicado"""
    
    def __init__(self, mensagem: str = "Portfólio não publicado"):
        super().__init__(mensagem, status_code=404)


class HostInvalidoErro(ErroNegocio):
    """Erro quando host não é válido"""
    
    def __init__(self, mensagem: str = "Host não permitido"):
        super().__init__(mensagem, status_code=400)
