/**
 * Configuração centralizada para requisições HTTP
 * Sistema administrativo simplificado
 */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiResponse, ApiError, RequestOptions } from "@/types/api";

// ================================
// CONFIGURAÇÕES BASE
// ================================

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";
const TIMEOUT = 30000; // 30 segundos

// ================================
// CLASSE PRINCIPAL DE CONFIGURAÇÃO
// ================================

class RequestConfig {
  private api: AxiosInstance;
  private refreshPromise: Promise<string> | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.setupInterceptors();
  }

  // ================================
  // CONFIGURAÇÃO DOS INTERCEPTORS
  // ================================

  private setupInterceptors(): void {
    // Request Interceptor
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return this.handleRequest(config);
      },
      (error: AxiosError) => {
        return Promise.reject(this.handleRequestError(error));
      }
    );

    // Response Interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return this.handleResponse(response);
      },
      async (error: AxiosError) => {
        return this.handleResponseError(error);
      }
    );
  }

  // ================================
  // HANDLERS DE REQUEST
  // ================================

  private handleRequest(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    // Adicionar token de autenticação
    const token = this.getAuthToken();
    if (token && !config.headers["skip-auth"]) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Remover headers de controle interno
    delete config.headers["skip-auth"];

    // Adicionar timestamp para evitar cache
    config.headers["X-Request-Time"] = Date.now().toString();

    // Log da requisição em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      console.group(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
      console.log("Headers:", config.headers);
      console.log("Data:", config.data);
      console.groupEnd();
    }

    return config;
  }

  private handleRequestError(error: AxiosError): ApiError {
    console.error("❌ Request Error:", error);
    return {
      message: "Erro ao enviar requisição",
      status: 0,
      detail: error.message,
    };
  }

  // ================================
  // HANDLERS DE RESPONSE
  // ================================

  private handleResponse(response: AxiosResponse): AxiosResponse {
    // Log da resposta em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      console.group(
        `✅ ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`
      );
      console.log("Data:", response.data);
      console.groupEnd();
    }

    return response;
  }

  private async handleResponseError(error: AxiosError): Promise<never> {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Log do erro em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      console.group(`❌ ${error.response?.status || "Network"} Error`);
      console.log("URL:", originalRequest?.url);
      console.log("Response:", error.response?.data);
      console.groupEnd();
    }

    // Tratamento de erro 401 (token expirado)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await this.refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return this.api(originalRequest);
      } catch (refreshError) {
        this.handleAuthenticationFailure();
        return Promise.reject(this.formatError(error));
      }
    }

    return Promise.reject(this.formatError(error));
  }

  // ================================
  // FORMATAÇÃO DE ERROS
  // ================================

  private formatError(error: AxiosError): ApiError {
    const response = error.response;
    const data = response?.data as any;

    return {
      message:
        data?.message || data?.detail || error.message || "Erro desconhecido",
      status: response?.status || 0,
      errors: data?.errors,
      detail: data?.detail,
    };
  }

  // ================================
  // AUTENTICAÇÃO
  // ================================

  private getAuthToken(): string | null {
    return localStorage.getItem("access_token");
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem("refresh_token");
  }

  private async refreshToken(): Promise<string> {
    // Evitar múltiplas chamadas simultâneas de refresh
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performTokenRefresh();

    try {
      const newToken = await this.refreshPromise;
      return newToken;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async performTokenRefresh(): Promise<string> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await axios.post(`${BASE_URL}/usuarios/auth/refresh/`, {
        refresh: refreshToken,
      });

      const { access } = response.data;
      localStorage.setItem("access_token", access);

      return access;
    } catch (error) {
      throw new Error("Failed to refresh token");
    }
  }

  private handleAuthenticationFailure(): void {
    // Limpar tokens
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    // Redirecionar para login
    window.location.href = "/login";
  }

  // ================================
  // MÉTODOS PÚBLICOS DE REQUISIÇÃO
  // ================================

  public async get<T = any>(
    url: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const config = this.buildRequestConfig(options);
    const response = await this.api.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  public async post<T = any>(
    url: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const config = this.buildRequestConfig(options);
    const response = await this.api.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  // ================================
  // MÉTODOS RAW (SEM WRAPPER ApiResponse)
  // ================================

  public async getRaw<T = any>(
    url: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const config = this.buildRequestConfig(options);
    const response = await this.api.get<T>(url, config);
    return response.data;
  }

  public async postRaw<T = any>(
    url: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<T> {
    const config = this.buildRequestConfig(options);
    const response = await this.api.post<T>(url, data, config);
    return response.data;
  }

  public async putRaw<T = any>(
    url: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<T> {
    const config = this.buildRequestConfig(options);
    const response = await this.api.put<T>(url, data, config);
    return response.data;
  }

  public async patchRaw<T = any>(
    url: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<T> {
    const config = this.buildRequestConfig(options);
    const response = await this.api.patch<T>(url, data, config);
    return response.data;
  }

  public async deleteRaw<T = any>(
    url: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const config = this.buildRequestConfig(options);
    const response = await this.api.delete<T>(url, config);
    return response.data;
  }

  public async put<T = any>(
    url: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const config = this.buildRequestConfig(options);
    const response = await this.api.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async patch<T = any>(
    url: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const config = this.buildRequestConfig(options);
    const response = await this.api.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async delete<T = any>(
    url: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const config = this.buildRequestConfig(options);
    const response = await this.api.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  // ================================
  // UPLOAD DE ARQUIVOS
  // ================================

  public async uploadFile<T = any>(
    url: string,
    file: File,
    options: RequestOptions & {
      fieldName?: string;
      additionalData?: Record<string, any>;
    } = {}
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append(options.fieldName || "file", file);

    // Adicionar dados adicionais
    if (options.additionalData) {
      Object.entries(options.additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const config = this.buildRequestConfig({
      ...options,
      headers: {
        "Content-Type": "multipart/form-data",
        ...options.headers,
      },
    });

    const response = await this.api.post<ApiResponse<T>>(url, formData, config);
    return response.data;
  }

  public async uploadMultipleFiles<T = any>(
    url: string,
    files: File[],
    options: RequestOptions & {
      fieldName?: string;
      additionalData?: Record<string, any>;
    } = {}
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();

    files.forEach((file, index) => {
      formData.append(`${options.fieldName || "files"}[${index}]`, file);
    });

    // Adicionar dados adicionais
    if (options.additionalData) {
      Object.entries(options.additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const config = this.buildRequestConfig({
      ...options,
      headers: {
        "Content-Type": "multipart/form-data",
        ...options.headers,
      },
    });

    const response = await this.api.post<ApiResponse<T>>(url, formData, config);
    return response.data;
  }

  // ================================
  // UTILITÁRIOS
  // ================================

  private buildRequestConfig(options: RequestOptions): AxiosRequestConfig {
    const config: AxiosRequestConfig = {};

    if (options.timeout) {
      config.timeout = options.timeout;
    }

    if (options.headers) {
      config.headers = { ...options.headers };
    } else {
      config.headers = {};
    }

    if (options.onUploadProgress) {
      config.onUploadProgress = options.onUploadProgress;
    }

    if (options.skipAuth) {
      config.headers["skip-auth"] = "true";
    }

    return config;
  }

  // ================================
  // HEALTH CHECK
  // ================================

  public async healthCheck(): Promise<boolean> {
    try {
      await this.get("/health/", { skipAuth: true });
      return true;
    } catch (error) {
      return false;
    }
  }

  // ================================
  // MÉTODOS DE CONFIGURAÇÃO
  // ================================

  public setBaseURL(url: string): void {
    this.api.defaults.baseURL = url;
  }

  public setTimeout(timeout: number): void {
    this.api.defaults.timeout = timeout;
  }

  public getAxiosInstance(): AxiosInstance {
    return this.api;
  }
}

// ================================
// INSTÂNCIA SINGLETON
// ================================

const apiClient = new RequestConfig();

export default apiClient;
export { RequestConfig };
// Export ApiService como alias para backward compatibility
export { RequestConfig as ApiService };
