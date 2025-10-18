"""
Helper functions para criar responses de erro padronizados
"""

from rest_framework.response import Response
from rest_framework import status


def erro_response(mensagem: str, status_code: int = status.HTTP_400_BAD_REQUEST) -> Response:
    """Cria uma response de erro no formato padronizado {errors: "..."}"""
    return Response({"errors": mensagem}, status=status_code)


def sucesso_response(dados: dict, status_code: int = status.HTTP_200_OK) -> Response:
    """Cria uma response de sucesso no formato padronizado"""
    return Response(dados, status=status_code)


def erro_400(mensagem: str) -> Response:
    """Response de erro 400 - Bad Request"""
    return erro_response(mensagem, status.HTTP_400_BAD_REQUEST)


def erro_401(mensagem: str = "Credenciais inválidas") -> Response:
    """Response de erro 401 - Unauthorized"""
    return erro_response(mensagem, status.HTTP_401_UNAUTHORIZED)


def erro_403(mensagem: str = "Permissão negada") -> Response:
    """Response de erro 403 - Forbidden"""
    return erro_response(mensagem, status.HTTP_403_FORBIDDEN)


def erro_404(mensagem: str = "Não encontrado") -> Response:
    """Response de erro 404 - Not Found"""
    return erro_response(mensagem, status.HTTP_404_NOT_FOUND)


def erro_409(mensagem: str = "Conflito") -> Response:
    """Response de erro 409 - Conflict"""
    return erro_response(mensagem, status.HTTP_409_CONFLICT)


def erro_500(mensagem: str = "Erro interno do servidor") -> Response:
    """Response de erro 500 - Internal Server Error"""
    return erro_response(mensagem, status.HTTP_500_INTERNAL_SERVER_ERROR)
