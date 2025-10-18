/**
 * Serviço de autenticação administrativa
 * Responsável pela autenticação de administradores do sistema MASTER
 */

import requestConfig from "../../../config/requestConfig";

// ================================
// TIPOS E INTERFACES
// ================================

export interface AdminLoginRequest {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface AdminLoginResponse {
  access: string;
  refresh: string;
  user: AdminUser;
  message: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_active: boolean;
  date_joined: string;
  last_login: string | null;
  permissions: string[];
}

export interface AdminRefreshTokenResponse {
  access: string;
}

// ================================
// SERVIÇO DE AUTENTICAÇÃO ADMINISTRATIVA
// ================================

export class AdminAuthApiService {
  // ================================
  // AUTENTICAÇÃO
  // ================================

  /**
   * Realiza login no sistema administrativo
   */
  static async login(
    credentials: AdminLoginRequest
  ): Promise<AdminLoginResponse> {
    try {
      const response = await requestConfig.postRaw<AdminLoginResponse>(
        "/usuarios/auth/login/custom/",
        credentials,
        {
          skipAuth: true,
          skipTenant: true, // Admin não precisa de tenant
        } 
      );

      if (response) {
        // Armazenar tokens com prefixo admin para separar do sistema tenant
        localStorage.setItem("admin_access_token", response.access);
        localStorage.setItem("admin_refresh_token", response.refresh);
        localStorage.setItem("admin_user", JSON.stringify(response.user));

        if (credentials.remember_me) {
          localStorage.setItem("admin_remember_me", "true");
        }

        return response;
      }

      throw new Error("Resposta inválida do servidor");
    } catch (error: any) {
      console.error("Erro no login administrativo:", error);
      throw new Error(error.message || "Erro ao fazer login");
    }
  }

  /**
   * Logout do sistema administrativo
   */
  static async logout(): Promise<void> {
    try {
      const refreshToken = localStorage.getItem("admin_refresh_token");

      if (refreshToken) {
        // Invalidar token no servidor
        await requestConfig.post(
          "/administracao/auth/logout/",
          { refresh_token: refreshToken },
          {
            skipTenant: true,
          }
        );
      }
    } catch (error) {
      console.warn("Erro ao invalidar token administrativo:", error);
    } finally {
      this.clearAdminAuthData();
    }
  }

  /**
   * Atualiza token de acesso administrativo
   */
  static async refreshToken(): Promise<AdminRefreshTokenResponse> {
    const refreshToken = localStorage.getItem("admin_refresh_token");

    if (!refreshToken) {
      throw new Error("Token de refresh administrativo não encontrado");
    }

    try {
      const response = await requestConfig.postRaw<AdminRefreshTokenResponse>(
        "/administracao/auth/refresh/",
        { refresh: refreshToken },
        {
          skipAuth: true,
          skipTenant: true,
        }
      );

      if (response) {
        localStorage.setItem("admin_access_token", response.access);
        return response;
      }

      throw new Error("Resposta inválida do servidor");
    } catch (error: any) {
      console.error("Erro ao renovar token administrativo:", error);
      this.clearAdminAuthData();
      throw new Error("Sessão administrativa expirada. Faça login novamente.");
    }
  }

  // ================================
  // PERFIL ADMINISTRATIVO
  // ================================

  /**
   * Obtém dados do usuário administrativo atual
   */
  static async getCurrentAdminUser(): Promise<AdminUser> {
    try {
      const response = await requestConfig.getRaw<AdminUser>(
        "/administracao/auth/me/",
        {
          skipTenant: true,
        }
      );

      if (response) {
        localStorage.setItem("admin_user", JSON.stringify(response));
        return response;
      }

      throw new Error("Resposta inválida do servidor");
    } catch (error: any) {
      console.error("Erro ao obter usuário administrativo:", error);
      throw new Error(error.message || "Erro ao carregar dados do usuário");
    }
  }

  /**
   * Atualiza dados do perfil administrativo
   */
  static async updateAdminProfile(
    profileData: Partial<AdminUser>
  ): Promise<AdminUser> {
    try {
      const response = await requestConfig.patchRaw<AdminUser>(
        "/administracao/auth/profile/",
        profileData,
        {
          skipTenant: true,
        }
      );

      if (response) {
        localStorage.setItem("admin_user", JSON.stringify(response));
        return response;
      }

      throw new Error("Resposta inválida do servidor");
    } catch (error: any) {
      console.error("Erro ao atualizar perfil administrativo:", error);
      throw new Error(error.message || "Erro ao atualizar perfil");
    }
  }

  // ================================
  // UTILITÁRIOS
  // ================================

  /**
   * Verifica se o administrador está autenticado
   */
  static isAdminAuthenticated(): boolean {
    const token = localStorage.getItem("admin_access_token");
    const user = localStorage.getItem("admin_user");
    return !!(token && user);
  }

  /**
   * Obtém usuário administrativo salvo localmente
   */
  static getStoredAdminUser(): AdminUser | null {
    try {
      const userStr = localStorage.getItem("admin_user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Erro ao parsear usuário administrativo salvo:", error);
      return null;
    }
  }

  /**
   * Obtém token administrativo salvo localmente
   */
  static getStoredAdminToken(): string | null {
    return localStorage.getItem("admin_access_token");
  }

  /**
   * Limpa todos os dados de autenticação administrativa
   */
  static clearAdminAuthData(): void {
    localStorage.removeItem("admin_access_token");
    localStorage.removeItem("admin_refresh_token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_remember_me");

    sessionStorage.removeItem("admin_access_token");
  }

  /**
   * Verifica se o token administrativo está próximo do vencimento
   */
  static isAdminTokenExpiringSoon(): boolean {
    try {
      const token = this.getStoredAdminToken();
      if (!token) return true;

      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000;
      const currentTime = Date.now();
      const fiveMinutes = 5 * 60 * 1000;

      return expirationTime - currentTime < fiveMinutes;
    } catch (error) {
      console.error(
        "Erro ao verificar expiração do token administrativo:",
        error
      );
      return true;
    }
  }

  /**
   * Health check do serviço de autenticação administrativa
   */
  static async adminHealthCheck(): Promise<boolean> {
    try {
      await requestConfig.getRaw("/administracao/auth/health/", {
        skipAuth: true,
        skipTenant: true,
      });
      return true;
    } catch (error) {
      console.error("Admin auth service health check failed:", error);
      return false;
    }
  }
}

export default AdminAuthApiService;
