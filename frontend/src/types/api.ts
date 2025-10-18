/**
 * Tipos TypeScript para integração com a API Django
 */

// ================================
// TIPOS BASE DE RESPOSTA DA API
// ================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  count: number;
  next: string | null;
  previous: string | null;
  page_size: number;
  current_page: number;
  total_pages: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
  detail?: string;
}

// ================================
// AUTENTICAÇÃO E USUÁRIOS
// ================================

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  nome?: string; // Campo calculado concatenando first_name + last_name
  is_active: boolean;
  date_joined: string;
  last_login?: string;
  perfil_global?: PerfilUsuario;
}

export interface PerfilUsuario {
  id: number;
  user: number;
  nome_completo: string;
  cpf: string;
  rg?: string;
  data_nascimento: string;
  sexo: "M" | "F" | "O";
  telefone_principal: string;
  telefone_secundario?: string;
  endereco_completo?: string;
  cep?: string;
  cidade?: string;
  estado?: string;
  pais: string;
  profissao?: string;
  estado_civil?: string;
  nome_mae?: string;
  nome_pai?: string;
  contato_emergencia_nome?: string;
  contato_emergencia_telefone?: string;
  observacoes?: string;
  privacidade_dados_medicos: "PUBLICO" | "RESTRITO" | "PRIVADO";
  permite_compartilhamento: boolean;
  criado_em: string;
  atualizado_em: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  message: string;
  user: User;
  tenant_info?: {
    nome: string;
    subdominio?: string;
  };
  vinculo_info?: {
    papel: string;
    status: string;
    esta_ativo: boolean;
    data_inicio: string;
  };
}

export interface RegisterRequest {
  email: string;
  password1: string;
  password2: string;
  first_name: string;
  last_name: string;
  phone?: string;
  aceitou_termos: boolean;
  marketing_opt_in?: boolean;
  versao_termos?: string;
}

export interface AdminRegisterRequest {
  email: string;
  password: string;
  nome: string;
  tipo_usuario: "DENTISTA" | "SECRETARIA" | "GERENTE";
  aceite_termos: boolean;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
}

// ================================
// TENANTS E VÍNCULOS
// ================================

export interface Locatario {
  id: string;
  nome: string;
  nome_fantasia: string;
  razao_social: string;
  cnpj: string;
  timezone: string;
  ativo: boolean;
  endereco?: EnderecoLocatario;
  criado_em: string;
  atualizado_em: string;
  dominio_principal?: DominioLocatario;
}

export interface EnderecoLocatario {
  id: number;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  pais: string;
}

export interface DominioLocatario {
  id: number;
  locatario: string;
  subdominio: string;
  principal: boolean;
  verificado_em?: string;
  criado_em: string;
  atualizado_em: string;
}

export interface VinculoUsuarioTenant {
  id: number;
  locatario: Locatario;
  usuario: User;
  papel:
    | "PACIENTE"
    | "PROFISSIONAL"
    | "SECRETARIA"
    | "ADMINISTRADOR"
    | "PROPRIETARIO";
  status: "ATIVO" | "SUSPENSO" | "REVOGADO" | "PENDENTE";
  origem_registro:
    | "SITE_CLINICA"
    | "WHATSAPP"
    | "SECRETARIA"
    | "CONVITE"
    | "INDICACAO";
  versao_termos_aceita: string;
  data_aceite_termos: string;
  ip_aceite: string;
  versao_politica_aceita: string;
  data_aceite_politica: string;
  data_inicio: string;
  data_fim?: string;
  motivo_revogacao?: string;
  observacoes?: string;
  criado_em: string;
  atualizado_em: string;
}

// ================================
// PLANOS E ASSINATURAS
// ================================

export interface PlanoAssinatura {
  id: number;
  locatario: string;
  nome_plano: string;
  valor_mensal: number;
  limite_usuarios: number;
  limite_pacientes: number;
  limite_agendamentos_mes: number;
  limite_espaco_gb: number;
  data_inicio: string;
  data_fim?: string;
  status: "ATIVA" | "SUSPENSA" | "CANCELADA" | "VENCIDA";
  criado_em: string;
  atualizado_em: string;
}

// ================================
// PERFIL PROFISSIONAL
// ================================

export interface PerfilProfissional {
  id: number;
  locatario: string;
  user: number;
  perfil_usuario: number;
  tipo_conselho: "CRO" | "CRM" | "COREN" | "CRP";
  numero_conselho: string;
  estado_conselho: string;
  tipo_principal: "DENTISTA" | "MEDICO" | "ENFERMEIRO" | "PSICOLOGO";
  especialidades: Especialidade[];
  formacao_principal: string;
  ano_formacao?: number;
  anos_experiencia: number;
  biografia_profissional?: string;
  aceita_novos_pacientes: boolean;
  atende_convenio: boolean;
  atende_particular: boolean;
  criado_em: string;
  atualizado_em: string;
}

export interface Especialidade {
  id: number;
  nome: string;
  descricao?: string;
  ativa: boolean;
}

// ================================
// PACIENTES
// ================================

export interface Paciente {
  id: number;
  locatario: string;
  usuario: User;
  data_primeira_consulta?: string;
  observacoes_clinicas?: string;
  notas_internas?: string;
  dados_snapshot: Record<string, any>;
  snapshot_atualizado_em?: string;
  tipo_sanguineo?: string;
  nome_responsavel?: string;
  cpf_responsavel?: string;
  telefone_responsavel?: string;
  possui_plano: boolean;
  nome_plano?: string;
  numero_carteirinha?: string;
  ativo: boolean;
  criado_em: string;
  atualizado_em: string;
}

// ================================
// AGENDAMENTOS
// ================================

export interface Agendamento {
  id: number;
  locatario: string;
  paciente: Paciente;
  profissional: PerfilProfissional;
  data_hora: string;
  duracao_estimada: string; // Duration field do Django como string
  tipo: "CONSULTA" | "AVALIACAO" | "PROCEDIMENTO" | "RETORNO" | "URGENCIA";
  status:
    | "AGENDADO"
    | "CONFIRMADO"
    | "EM_ATENDIMENTO"
    | "REALIZADO"
    | "CANCELADO"
    | "FALTOU"
    | "REAGENDADO";
  procedimentos_planejados: string[];
  observacoes?: string;
  observacoes_internas?: string;
  criado_por?: User;
  cancelado_por?: User;
  motivo_cancelamento?: string;
  data_cancelamento?: string;
  criado_em: string;
  atualizado_em: string;
}

export interface AgendamentoCreateRequest {
  paciente_id: number;
  profissional_id: number;
  data_hora: string;
  duracao_estimada: string;
  tipo: Agendamento["tipo"];
  procedimentos_planejados?: string[];
  observacoes?: string;
}

// ================================
// UPLOAD DE ARQUIVOS
// ================================

export interface FileUploadResponse {
  id: number;
  filename: string;
  original_name: string;
  size: number;
  content_type: string;
  url: string;
  created_at: string;
}

export interface FileUploadRequest {
  file: File;
  folder?: string;
  description?: string;
}

// ================================
// CONFIGURAÇÕES DE REQUEST
// ================================

export interface RequestConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

export interface RequestOptions {
  skipAuth?: boolean;
  skipTenant?: boolean;
  timeout?: number;
  headers?: Record<string, string>;
  onUploadProgress?: (progressEvent: any) => void;
}

// ================================
// FILTROS E BUSCA
// ================================

export interface BaseFilter {
  page?: number;
  page_size?: number;
  ordering?: string;
  search?: string;
}

export interface AgendamentoFilter extends BaseFilter {
  data_inicio?: string;
  data_fim?: string;
  profissional?: number;
  status?: Agendamento["status"];
  tipo?: Agendamento["tipo"];
}

export interface PacienteFilter extends BaseFilter {
  ativo?: boolean;
  data_primeira_consulta_inicio?: string;
  data_primeira_consulta_fim?: string;
}

// ================================
// DASHBOARD E ESTATÍSTICAS
// ================================

export interface DashboardStats {
  total_pacientes: number;
  agendamentos_hoje: number;
  agendamentos_semana: number;
  consultas_realizadas_mes: number;
  receita_mes: number;
  pacientes_novos_mes: number;
}

export interface AgendamentosChart {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
}
