# 📊 Demonstração dos Modelos - Odonto Premium

## 🏗️ **Modelos Base (Abstratos)**

### **TimestampedModel** (Abstract)

- criado_em: DateTimeField (auto_now_add=True)
- atualizado_em: DateTimeField (auto_now=True)

### **TenantScopedModel** (Abstract, herda TimestampedModel)

- locatario: ForeignKey - Locatario (on_delete=CASCADE, db_index=True)
- criado_em: DateTimeField (herdado)
- atualizado_em: DateTimeField (herdado)
- índices: [locatario, criado_em], [locatario, atualizado_em]

### **UserScopedModel** (Abstract, herda TimestampedModel)

- usuario: ForeignKey - User (on_delete=CASCADE, db_index=True)
- criado_em: DateTimeField (herdado)
- atualizado_em: DateTimeField (herdado)
- índices: [usuario, criado_em], [usuario, atualizado_em]

---

## 🌍 **DADOS GLOBAIS** - Modelos sem isolamento por tenant

### **PerfilUsuario** (apps/profiles/models/user_profile.py)

- usuario: OneToOneField - User (related_name='perfil')
- data_nascimento: DateField (null=True, blank=True)
- cpf: CharField(14, unique=True, null=True, blank=True)
- rg: CharField(20, null=True, blank=True)
- sexo: CharField(1, choices=Sexo.choices, null=True, blank=True)
- telefone_principal: CharField(20, blank=True)
- telefone_whatsapp: CharField(20, blank=True)
- telefone_emergencia: CharField(20, blank=True)
- cep: CharField(10, blank=True)
- endereco: CharField(200, blank=True)
- numero: CharField(20, blank=True)
- complemento: CharField(100, blank=True)
- bairro: CharField(100, blank=True)
- cidade: CharField(100, blank=True)
- estado: CharField(2, blank=True)
- altura: DecimalField(4,2, null=True, blank=True) - em metros
- peso: DecimalField(5,2, null=True, blank=True) - em quilos
- tipo_sanguineo: CharField(3, choices=TipoSanguineo.choices, blank=True)
- habitos_pessoais: JSONField (default=dict, blank=True)
- historico_familiar: TextField (blank=True)
- observacoes_gerais: TextField (blank=True)
- compartilhar_dados_medicos: BooleanField (default=True)
- compartilhar_contatos: BooleanField (default=True)
- compartilhar_endereco: BooleanField (default=True)
- criado_em: DateTimeField (herda de TimestampedModel)
- atualizado_em: DateTimeField (herda de TimestampedModel)

### **Especialidade** (apps/profiles/models/professional.py)

- nome: CharField(100, unique=True)
- descricao: TextField (blank=True)
- ativa: BooleanField (default=True)

### **AlergiaUsuario** (apps/profiles/models/medical_data.py) - Usa TimestampedModel

- usuario: ForeignKey - User (related_name='alergias')
- nome: CharField(200) - Nome da alergia
- tipo: CharField(50, choices=TipoAlergia.choices, default=MEDICAMENTO)
- intensidade: CharField(20, choices=IntensidadeAlergia.choices, default=MODERADA)
- descricao: TextField (blank=True) - Sintomas e reações
- data_descoberta: DateField (null=True, blank=True)
- ativa: BooleanField (default=True)
- criado_em: DateTimeField (herda de TimestampedModel)
- atualizado_em: DateTimeField (herda de TimestampedModel)
- constraints: unique_together=['usuario', 'nome', 'tipo']
- índices: [usuario, ativa], [tipo, intensidade], [nome]

### **MedicamentoContinuoUsuario** (apps/profiles/models/medical_data.py) - Usa TimestampedModel

- usuario: ForeignKey - User (related_name='medicamentos_continuos')
- nome_medicamento: CharField(200)
- principio_ativo: CharField(200, blank=True)
- dosagem: CharField(100) - Ex: 10mg, 1 comprimido
- frequencia: CharField(100) - Ex: 2x ao dia
- tipo: CharField(50, choices=TipoMedicamento.choices, default=OUTROS)
- data_inicio: DateField (null=True, blank=True)
- data_fim: DateField (null=True, blank=True)
- prescrito_por: CharField(200, blank=True)
- motivo: TextField (blank=True)
- observacoes: TextField (blank=True)
- em_uso: BooleanField (default=True)
- criado_em: DateTimeField (herda de TimestampedModel)
- atualizado_em: DateTimeField (herda de TimestampedModel)
- índices: [usuario, em_uso], [nome_medicamento], [principio_ativo], [tipo]

### **DoencaCronicaUsuario** (apps/profiles/models/medical_data.py) - Usa TimestampedModel

- usuario: ForeignKey - User (related_name='doencas_cronicas')
- nome: CharField(200)
- cid_10: CharField(10, blank=True)
- intensidade: CharField(20, choices=IntensidadeAlergia.choices, default=MODERADA)
- data_diagnostico: DateField (null=True, blank=True)
- medico_responsavel: CharField(200, blank=True)
- tratamento_atual: TextField (blank=True)
- observacoes: TextField (blank=True)
- ativa: BooleanField (default=True)
- controlada: BooleanField (default=False)
- criado_em: DateTimeField (herda de TimestampedModel)
- atualizado_em: DateTimeField (herda de TimestampedModel)
- constraints: unique_together=['usuario', 'nome']
- índices: [usuario, ativa], [nome], [cid_10], [intensidade]

### **HabitoPessoalUsuario** (apps/profiles/models/medical_data.py) - Usa TimestampedModel

- usuario: ForeignKey - User (related_name='habitos_pessoais')
- tipo_habito: CharField(50, choices=TipoHabito.choices) - TABAGISMO, ETILISMO, EXERCICIO
- frequencia: CharField(50, choices=FrequenciaHabito.choices, default=NUNCA)
- status: CharField(50, choices=StatusHabito.choices, default=ATIVO)
- descricao: TextField (blank=True)
- detalhes_especificos: JSONField (default=dict, blank=True) - Dados específicos por tipo
- data_inicio: DateField (null=True, blank=True)
- data_parada: DateField (null=True, blank=True)
- observacoes: TextField (blank=True)
- tentativas_parada: PositiveIntegerField (default=0)
- motivacao_mudanca: TextField (blank=True)
- criado_em: DateTimeField (herda de TimestampedModel)
- atualizado_em: DateTimeField (herda de TimestampedModel)
- constraints: unique_together=['usuario', 'tipo_habito']
- índices: [usuario, tipo_habito], [tipo_habito, frequencia], [tipo_habito, status], [status]

---

## 🏥 **DADOS POR TENANT** - Modelos isolados por clínica (TenantScopedModel)

### **Locatario** (apps/tenants/models/tenant.py) - NÃO herda TenantScopedModel

- id: UUIDField (PK, default=uuid.uuid4, editable=False)
- nome: CharField(255)
- ativo: BooleanField (default=True)
- criado_em: DateTimeField (auto_now_add=True)
- atualizado_em: DateTimeField (auto_now=True)

### **DominioLocatario** (apps/tenants/models/tenant.py) - NÃO herda TenantScopedModel

- locatario: ForeignKey - Locatario (related_name="dominios")
- subdominio: CharField(63, unique=True) - RFC 1123 limit
- principal: BooleanField (default=True)
- verificado_em: DateTimeField (null=True, blank=True)
- criado_em: DateTimeField (auto_now_add=True)
- atualizado_em: DateTimeField (auto_now=True)
- constraints: unique_principal_domain_per_tenant
- índices: [subdominio], [principal]

### **VinculoUsuarioTenant** (apps/tenants/models/vinculo.py) - Herda TenantScopedModel

- locatario: ForeignKey - Locatario (herdado)
- usuario: ForeignKey - User (related_name='vinculos_tenants')
- papel: CharField(20, choices=TipoPapel.choices) - PACIENTE, PROFISSIONAL, SECRETARIA, ADMINISTRADOR, PROPRIETARIO
- status: CharField(20, choices=StatusVinculo.choices, default=ATIVO) - ATIVO, SUSPENSO, REVOGADO, PENDENTE
- origem_registro: CharField(20, choices=OrigemRegistro.choices, default=SITE_CLINICA)
- versao_termos_aceita: CharField(20)
- data_aceite_termos: DateTimeField
- ip_aceite: GenericIPAddressField
- versao_politica_aceita: CharField(20)
- data_aceite_politica: DateTimeField
- data_inicio: DateTimeField (auto_now_add=True)
- data_fim: DateTimeField (null=True, blank=True)
- motivo_revogacao: TextField (blank=True)
- usuario_revogacao: ForeignKey - User (null=True, blank=True, related_name='vinculos_revogados')
- observacoes: TextField (blank=True)
- criado_em: DateTimeField (herdado)
- atualizado_em: DateTimeField (herdado)
- constraints: unique_active_user_role_per_tenant, unique_user_per_tenant
- índices: [locatario, usuario, status], [locatario, papel, status], [usuario, status], [data_aceite_termos]

### **HistoricoVinculo** (apps/tenants/models/vinculo.py) - Herda TenantScopedModel

- locatario: ForeignKey - Locatario (herdado)
- vinculo: ForeignKey - VinculoUsuarioTenant (related_name='historico')
- status_anterior: CharField(20, choices=StatusVinculo.choices)
- status_novo: CharField(20, choices=StatusVinculo.choices)
- usuario_responsavel: ForeignKey - User (null=True, blank=True, related_name='vinculos_alterados')
- motivo: TextField (blank=True)
- criado_em: DateTimeField (herdado)
- atualizado_em: DateTimeField (herdado)
- índices: [locatario, vinculo, criado_em], [usuario_responsavel]

### **PerfilProfissional** (apps/profiles/models/professional.py) - Herda TenantScopedModel

- locatario: ForeignKey - Locatario (herdado)
- perfil_usuario: ForeignKey - PerfilUsuario (related_name='perfis_profissionais')
- tipo_conselho: CharField(20, choices=TipoConselho.choices, default=CRO) - CRO, CRM, COREN, etc.
- numero_conselho: CharField(20)
- estado_conselho: CharField(2) - UF do conselho
- tipo_principal: CharField(20, choices=TipoProfissional.choices, default=DENTISTA)
- especialidades: ManyToManyField - Especialidade (blank=True, related_name='profissionais')
- formacao_principal: CharField(200) - Instituição
- ano_formacao: PositiveIntegerField (null=True, blank=True)
- anos_experiencia: PositiveIntegerField (default=0)
- biografia_profissional: TextField (blank=True)
- aceita_novos_pacientes: BooleanField (default=True)
- atende_convenio: BooleanField (default=True)
- atende_particular: BooleanField (default=True)
- criado_em: DateTimeField (herdado)
- atualizado_em: DateTimeField (herdado)
- constraints: unique_profissional_per_tenant, unique_conselho_per_tenant
- índices: [locatario, tipo_conselho], [locatario, numero_conselho], [locatario, tipo_principal]

### **Paciente** (apps/pacientes/models.py) - Herda TenantScopedModel

- locatario: ForeignKey - Locatario (herdado)
- usuario: ForeignKey - User (related_name='registros_paciente')
- numero_prontuario: CharField(50)
- data_primeira_consulta: DateField (null=True, blank=True)
- observacoes_clinicas: TextField (blank=True)
- notas_internas: TextField (blank=True)
- dados_snapshot: JSONField (default=dict, blank=True) - Cache dos dados globais
- snapshot_atualizado_em: DateTimeField (null=True, blank=True)
- tipo_sanguineo: CharField(3, choices=TipoSanguineo.choices, blank=True)
- nome_responsavel: CharField(200, blank=True)
- cpf_responsavel: CharField(14, blank=True)
- telefone_responsavel: CharField(20, blank=True)
- possui_plano: BooleanField (default=False)
- nome_plano: CharField(100, blank=True)
- numero_carteirinha: CharField(50, blank=True)
- ativo: BooleanField (default=True)
- criado_em: DateTimeField (herdado)
- atualizado_em: DateTimeField (herdado)
- constraints: unique_user_per_clinic, unique_prontuario_per_clinic
- índices: [locatario, usuario], [locatario, numero_prontuario], [locatario, ativo], [locatario, data_primeira_consulta]

### **HistoricoPaciente** (apps/pacientes/models.py) - Herda TenantScopedModel

- locatario: ForeignKey - Locatario (herdado)
- paciente: ForeignKey - Paciente (related_name='historico')
- usuario_alteracao: ForeignKey - User (null=True)
- tipo_alteracao: CharField(50, choices) - CRIACAO, EDICAO, INATIVACAO, REATIVACAO
- campos_alterados: JSONField (default=list)
- valores_anteriores: JSONField (default=dict)
- observacoes: TextField (blank=True)
- criado_em: DateTimeField (herdado)
- atualizado_em: DateTimeField (herdado)
- índices: [locatario, paciente, criado_em], [locatario, tipo_alteracao], [usuario_alteracao]

### **Agendamento** (apps/agendamentos/models.py) - Herda TenantScopedModel

- locatario: ForeignKey - Locatario (herdado)
- paciente: ForeignKey - Paciente (related_name='agendamentos')
- profissional: ForeignKey - User (related_name='agendamentos_profissional')
- data_hora: DateTimeField
- duracao_estimada: DurationField
- tipo: CharField(20, choices=TipoAgendamento.choices, default=CONSULTA) - CONSULTA, AVALIACAO, PROCEDIMENTO, RETORNO, URGENCIA
- status: CharField(20, choices=StatusAgendamento.choices, default=AGENDADO) - AGENDADO, CONFIRMADO, EM_ATENDIMENTO, REALIZADO, CANCELADO, FALTOU, REAGENDADO
- procedimentos_planejados: JSONField (default=list, blank=True)
- observacoes: TextField (blank=True)
- observacoes_internas: TextField (blank=True)
- criado_por: ForeignKey - User (null=True, related_name='agendamentos_criados')
- cancelado_por: ForeignKey - User (null=True, blank=True, related_name='agendamentos_cancelados')
- motivo_cancelamento: TextField (blank=True)
- data_cancelamento: DateTimeField (null=True, blank=True)
- criado_em: DateTimeField (herdado)
- atualizado_em: DateTimeField (herdado)
- constraints: unique_professional_datetime_per_clinic
- índices: [locatario, data_hora], [locatario, paciente], [locatario, profissional], [locatario, status], [locatario, tipo], [data_hora, status]

### **HistoricoAgendamento** (apps/agendamentos/models.py) - Herda TenantScopedModel

- locatario: ForeignKey - Locatario (herdado)
- agendamento: ForeignKey - Agendamento (related_name='historico')
- usuario_alteracao: ForeignKey - User (null=True)
- acao: CharField(50, choices) - CRIACAO, CONFIRMACAO, CANCELAMENTO, REAGENDAMENTO, ALTERACAO
- detalhes: JSONField (default=dict)
- observacoes: TextField (blank=True)
- criado_em: DateTimeField (herdado)
- atualizado_em: DateTimeField (herdado)
- índices: [locatario, agendamento, criado_em], [locatario, acao]

### **Prontuario** (apps/prontuarios/models.py) - Herda TenantScopedModel

- locatario: ForeignKey - Locatario (herdado)
- paciente: OneToOneField - Paciente (related_name='prontuario')
- numero_prontuario: CharField(20)
- status: CharField(20, choices=StatusProntuario.choices, default=ATIVO) - ATIVO, ARQUIVADO, TRANSFERIDO
- data_primeira_consulta: DateField
- preferencias_atendimento: JSONField (default=dict, blank=True)
- observacoes_clinica: TextField (blank=True)
- forma_pagamento_preferida: CharField(50, blank=True)
- plano_tratamento_ativo: BooleanField (default=False)
- criado_em: DateTimeField (herdado)
- atualizado_em: DateTimeField (herdado)
- constraints: unique_prontuario_number_per_clinic, unique_patient_prontuario_per_clinic
- índices: [locatario, numero_prontuario], [locatario, paciente], [locatario, status], [locatario, data_primeira_consulta]

### **Consulta** (apps/prontuarios/models.py) - Herda TenantScopedModel

- locatario: ForeignKey - Locatario (herdado)
- prontuario: ForeignKey - Prontuario (related_name='consultas')
- agendamento: OneToOneField - Agendamento (null=True, blank=True, related_name='consulta_realizada')
- profissional: ForeignKey - User (related_name='consultas_realizadas')
- data_consulta: DateTimeField
- tipo_consulta: CharField(50, choices, default=CONSULTA) - AVALIACAO, CONSULTA, PROCEDIMENTO, RETORNO, URGENCIA
- queixa_principal: TextField
- exame_clinico: TextField (blank=True)
- diagnostico: TextField (blank=True)
- tratamento_proposto: TextField (blank=True)
- procedimentos_realizados: JSONField (default=list, blank=True)
- prescricoes: TextField (blank=True)
- orientacoes: TextField (blank=True)
- proxima_consulta: DateField (null=True, blank=True)
- observacoes: TextField (blank=True)
- criado_em: DateTimeField (herdado)
- atualizado_em: DateTimeField (herdado)
- índices: [locatario, prontuario, data_consulta], [locatario, profissional, data_consulta], [locatario, tipo_consulta], [data_consulta]

### **AnexoProntuario** (apps/prontuarios/models.py) - Herda TenantScopedModel

- locatario: ForeignKey - Locatario (herdado)
- prontuario: ForeignKey - Prontuario (related_name='anexos')
- consulta: ForeignKey - Consulta (null=True, blank=True, related_name='anexos')
- titulo: CharField(200)
- tipo_anexo: CharField(50, choices, default=DOCUMENTO) - EXAME, FOTO, RAIO_X, DOCUMENTO, LAUDO, OUTROS
- arquivo: FileField (upload_to='prontuarios/anexos/%Y/%m/')
- descricao: TextField (blank=True)
- anexado_por: ForeignKey - User (null=True)
- criado_em: DateTimeField (herdado)
- atualizado_em: DateTimeField (herdado)
- índices: [locatario, prontuario], [locatario, tipo_anexo], [locatario, criado_em]

### **Portfolio** (apps/portfolios/models.py) - Herda TenantScopedModel

- locatario: OneToOneField - Locatario (herdado)
- basic_info: JSONField
- config: JSONField
- versao_registro: IntegerField
- publicado: BooleanField
- publicado_em: DateTimeField
- cache_etag_publico: CharField
- criado_em: DateTimeField (herdado)
- atualizado_em: DateTimeField (herdado)

### **Usuario** (apps/usuarios/models.py) - Proxy Model

- Herda todos os campos de User do Django
- Funciona como proxy para adicionar métodos customizados

---

## 🔗 **Relacionamentos Principais**

### **User (Django Auth)**

- ↔ PerfilUsuario (1:1)
- ↔ AlergiaUsuario (1:N)
- ↔ MedicamentoContinuoUsuario (1:N)
- ↔ DoencaCronicaUsuario (1:N)
- ↔ HabitoPessoalUsuario (1:N)
- ↔ VinculoUsuarioTenant (1:N) - _pode trabalhar/ser paciente em várias clínicas_
- ↔ Paciente (1:N) - _pode ser paciente em várias clínicas_

### **PerfilUsuario**

- ↔ User (1:1)
- ↔ PerfilProfissional (1:N) - _pode trabalhar em várias clínicas_

### **Locatario (Tenant)**

- ↔ VinculoUsuarioTenant (1:N)
- ↔ PerfilProfissional (1:N)
- ↔ Paciente (1:N)
- ↔ Portfolio (1:1)
- ↔ Agendamento (1:N)
- ↔ Prontuario (1:N)
- ↔ ConsentimentoVault (1:N)
- ↔ LogAcessoVault (1:N)
- ↔ AgendaSemanal (1:N)
- ↔ BloqueioAgenda (1:N)

### **PerfilProfissional**

- ↔ Locatario (N:1)
- ↔ PerfilUsuario (N:1)
- ↔ Especialidade (N:N)

### **Paciente**

- ↔ Locatario (N:1)
- ↔ User (N:1)
- ↔ Agendamento (1:N)
- ↔ Prontuario (1:N)

### **Prontuario**

- ↔ Paciente (N:1)
- ↔ Consulta (1:N)
- ↔ AnexoProntuario (1:N)

### **Agendamento**

- ↔ Paciente (N:1)
- ↔ User (N:1) - profissional
- ↔ HistoricoAgendamento (1:N)
- ↔ Consulta (1:1) - opcional

---

## 🔒 **Constraints de Segurança**

### **Por Clínica (Tenant)**

- `unique_user_per_clinic`: User único como paciente por clínica
- `unique_prontuario_per_clinic`: Número de prontuário único por clínica
- `unique_active_user_role_per_tenant`: Papel único ativo por usuário/tenant
- `unique_professional_datetime_per_clinic`: Profissional único por horário/clínica
- `unique_conselho_per_tenant`: Número do conselho único por clínica
- `unique_codigo_por_tenant`: Código de consentimento único por tenant
- `unique_domain_per_tenant`: Domínio único por tenant

### **Globais**

- `PerfilUsuario.cpf`: CPF único globalmente
- `Especialidade.nome`: Nome único globalmente
- `User.email`: Email único globalmente (Django)
- `Locatario.cnpj`: CNPJ único globalmente

---

## 📊 **Índices de Performance**

### **Automáticos (via Models Base)**

- `[locatario, criado_em]` - Todos os TenantScopedModel
- `[locatario, atualizado_em]` - Todos os TenantScopedModel
- `[criado_em]` - Modelos globais com TimestampedModel
- `[atualizado_em]` - Modelos globais com TimestampedModel

### **Específicos por App**

#### **tenants/**

- `[locatario, usuario, papel]` - VinculoUsuarioTenant
- `[locatario, usuario, status]` - VinculoUsuarioTenant
- `[locatario, codigo]` - ConsentimentoVault
- `[locatario, usuario_titular]` - LogAcessoVault
- `[locatario, profissional, dia_semana]` - AgendaSemanal
- `[cnpj]` - Locatario
- `[dominio]` - DominioLocatario

#### **profiles/**

- `[usuario]` - PerfilUsuario
- `[cpf]` - PerfilUsuario
- `[usuario, tipo]` - AlergiaUsuario, MedicamentoContinuoUsuario, etc.
- `[locatario, perfil_usuario]` - PerfilProfissional
- `[locatario, numero_conselho]` - PerfilProfissional
- `[nome]` - Especialidade

#### **pacientes/**

- `[locatario, usuario]` - Paciente
- `[locatario, cpf]` - Paciente
- `[locatario, nome_completo]` - Paciente
- `[locatario, ativo]` - Paciente

#### **agendamentos/**

- `[locatario, paciente]` - Agendamento
- `[locatario, profissional, data_hora]` - Agendamento
- `[locatario, data_hora]` - Agendamento
- `[locatario, status]` - Agendamento

#### **prontuarios/**

- `[locatario, paciente]` - Prontuario
- `[locatario, numero_prontuario]` - Prontuario
- `[locatario, prontuario]` - Consulta
- `[locatario, data_consulta]` - Consulta

---

## 🎯 **Resumo da Arquitetura**

### **✅ Dados GLOBAIS**

- **PerfilUsuario**: Dados pessoais compartilhados entre clínicas
- **Dados Médicos**: Alergias, medicamentos, doenças e hábitos (com controle de privacy)
- **Especialidades**: Catálogo global de especialidades médicas/odontológicas
- **Usuário controla**: Compartilhamento e privacy dos dados médicos

### **✅ Dados POR CLÍNICA (TenantScopedModel)**

- **Multi-tenancy Completo**: Locatario, domínios, vínculos e históricos
- **Perfis Profissionais**: Um perfil por clínica para cada profissional
- **Pacientes**: Registro independente por clínica
- **Sistema Clínico**: Agendamentos, prontuários, consultas e anexos
- **Auditoria LGPD**: Consentimentos e logs de acesso completos
- **Gestão de Agenda**: Agenda semanal e bloqueios por profissional
- **Portfolio**: Marketing personalizado por clínica
- **Isolamento Completo**: Cada clínica vê apenas seus dados

### **✅ Flexibilidade Multi-Tenant**

- **Profissionais Multi-Clínica**: Podem trabalhar em várias clínicas com perfis distintos
- **Pacientes Multi-Clínica**: Podem ser atendidos em várias clínicas independentemente
- **Dados Médicos Globais**: Compartilhamento controlado pelo próprio usuário
- **Vínculos Flexíveis**: Sistema robusto de papéis e permissões por clínica
- **Auditoria Completa**: Rastreamento de todas as mudanças e acessos

### **✅ Segurança e Conformidade**

- **Isolamento por Tenant**: Middleware automático + TenantScopedModel
- **Constraints de Integridade**: 15+ constraints em nível de banco
- **LGPD Compliance**: ConsentimentoVault + LogAcessoVault
- **Auditoria**: Históricos completos de pacientes, agendamentos e vínculos
- **Performance**: 50+ índices otimizados para queries por tenant

### **✅ Apps Implementados**

- **11 Apps Funcionais**: Todos registrados e com migrations aplicadas
- **20+ Modelos**: Relacionamentos complexos e bem estruturados
- **Sistema Completo**: Da autenticação ao prontuário eletrônico
- **Arquitetura Escalável**: Preparada para milhares de tenants

---

## 📈 **Métricas do Sistema**

- **Apps**: 11 apps funcionais
- **Modelos**: 20+ modelos implementados
- **Constraints**: 15+ constraints de segurança
- **Índices**: 50+ índices de performance
- **Relacionamentos**: Arquitetura complexa multi-tenant
- **Migrations**: Todas aplicadas com sucesso
- **Auditoria**: 5 tipos de logs e históricos
- **LGPD**: Compliance completa implementada

---

_Última atualização: 24 de agosto de 2025_
_Sistema com arquitetura completa e todos os modelos implementados_
