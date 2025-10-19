// ================================
// DADOS MOCK CENTRALIZADOS
// ================================

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: string;
  status: "active" | "inactive" | "suspended";
  monthlyRevenue: number;
  totalUsers: number;
  activeUsers: number;
  lastLogin: string;
  startDate: string;
  nextBilling: string;
  // Dados da empresa
  phone?: string;
  position?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  website?: string;
  industry?: string;
  companySize?: string;
  // Dados do plano
  planDetails?: {
    name: string;
    price: number;
    currency: string;
    billing: "monthly" | "yearly";
    features: string[];
    limits: {
      users: number;
      storage: string;
      bandwidth: string;
      support: string;
    };
    addons?: string[];
  };
  // Dados financeiros
  paymentMethod?: {
    type: "credit_card" | "bank_transfer" | "pix";
    lastFour?: string;
    expiryDate?: string;
    bank?: string;
  };
  billingHistory?: Array<{
    id: string;
    date: string;
    amount: number;
    status: "paid" | "pending" | "overdue" | "failed";
    invoice: string;
    description?: string;
  }>;
  // Administradores
  administrators?: Array<{
    id: string;
    name: string;
    email: string;
    role: "owner" | "admin" | "manager" | "user";
    lastLogin: string;
    permissions: string[];
    avatar?: string;
  }>;
  // Configurações
  settings?: {
    timezone: string;
    language: string;
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    security: {
      twoFactor: boolean;
      ipWhitelist: string[];
      sessionTimeout: number;
    };
  };
  // Suporte e tickets
  support?: {
    tickets: Array<{
      id: string;
      title: string;
      status: "open" | "in_progress" | "resolved" | "closed";
      priority: "low" | "medium" | "high" | "urgent";
      createdAt: string;
      lastUpdate: string;
    }>;
    satisfaction: number; // 1-5
    responseTime: string;
  };
  // Dados gerais
  notes?: string;
  totalRevenue?: number;
  contractEndDate?: string;
  lastUpdate?: string;
  createdBy?: string;
}

export const clientsData: Record<string, Client[]> = {
  smartsaude: [
    {
      id: "1",
      name: "Dr. Maria Silva",
      email: "maria@clinicasilva.com.br",
      company: "Clínica Silva",
      plan: "Profissional",
      status: "active",
      monthlyRevenue: 299,
      totalUsers: 15,
      activeUsers: 12,
      lastLogin: "2 min atrás",
      startDate: "15/01/2024",
      nextBilling: "15/02/2024",
      phone: "(11) 99999-9999",
      position: "Diretora Médica",
      address: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
      website: "https://clinicasilva.com.br",
      industry: "Saúde",
      companySize: "Pequeno (10-50 funcionários)",
      planDetails: {
        name: "SmartSaúde Profissional",
        price: 299,
        currency: "BRL",
        billing: "monthly",
        features: [
          "Até 15 usuários",
          "Prontuário eletrônico",
          "Agendamento online",
          "Relatórios avançados",
          "Integração com laboratórios",
          "Backup automático",
          "Suporte prioritário"
        ],
        limits: {
          users: 15,
          storage: "50GB",
          bandwidth: "Ilimitado",
          support: "24/7 Prioritário"
        },
        addons: ["Módulo Financeiro", "Telemedícina"]
      },
      paymentMethod: {
        type: "credit_card",
        lastFour: "4532",
        expiryDate: "12/2025"
      },
      billingHistory: [
        {
          id: "INV-2024-001",
          date: "15/01/2024",
          amount: 299,
          status: "paid",
          invoice: "INV-2024-001",
          description: "Mensalidade Janeiro 2024"
        },
        {
          id: "INV-2023-012",
          date: "15/12/2023",
          amount: 299,
          status: "paid",
          invoice: "INV-2023-012",
          description: "Mensalidade Dezembro 2023"
        },
        {
          id: "INV-2023-011",
          date: "15/11/2023",
          amount: 299,
          status: "paid",
          invoice: "INV-2023-011",
          description: "Mensalidade Novembro 2023"
        }
      ],
      administrators: [
        {
          id: "admin-1",
          name: "Dr. Maria Silva",
          email: "maria@clinicasilva.com.br",
          role: "owner",
          lastLogin: "2 min atrás",
          permissions: ["all"]
        },
        {
          id: "admin-2",
          name: "Enfermeira Ana Costa",
          email: "ana@clinicasilva.com.br",
          role: "admin",
          lastLogin: "1 hora atrás",
          permissions: ["users", "patients", "appointments", "reports"]
        },
        {
          id: "admin-3",
          name: "Recepcionista Carlos",
          email: "carlos@clinicasilva.com.br",
          role: "user",
          lastLogin: "3 horas atrás",
          permissions: ["appointments", "patients"]
        }
      ],
      settings: {
        timezone: "America/Sao_Paulo",
        language: "pt-BR",
        notifications: {
          email: true,
          sms: true,
          push: false
        },
        security: {
          twoFactor: true,
          ipWhitelist: ["192.168.1.0/24"],
          sessionTimeout: 30
        }
      },
      support: {
        tickets: [
          {
            id: "TKT-001",
            title: "Integração com laboratório XYZ",
            status: "resolved",
            priority: "medium",
            createdAt: "10/01/2024",
            lastUpdate: "12/01/2024"
          },
          {
            id: "TKT-002",
            title: "Relatório de faturamento mensal",
            status: "closed",
            priority: "low",
            createdAt: "05/01/2024",
            lastUpdate: "06/01/2024"
          }
        ],
        satisfaction: 5,
        responseTime: "2 horas"
      },
      notes: "Cliente muito satisfeito com o sistema. Sempre pontual nos pagamentos.",
      totalRevenue: 1495,
      contractEndDate: "15/01/2025",
      lastUpdate: "20/01/2024",
      createdBy: "Admin Sistema"
    },
    {
      id: "2",
      name: "Dr. João Santos",
      email: "joao@hospitalcentral.com.br",
      company: "Hospital Central",
      plan: "Empresarial",
      status: "active",
      monthlyRevenue: 599,
      totalUsers: 50,
      activeUsers: 45,
      lastLogin: "1 hora atrás",
      startDate: "10/12/2023",
      nextBilling: "10/02/2024",
      phone: "(11) 88888-8888",
      position: "Diretor Geral",
      address: "Av. Central, 456",
      city: "São Paulo",
      state: "SP",
      zipCode: "04567-890",
      notes: "Grande hospital com muitos usuários ativos. Excelente parceiro.",
      totalRevenue: 4792,
      contractEndDate: "10/12/2024"
    },
    {
      id: "3",
      name: "Dra. Ana Costa",
      email: "ana@consultoriomedico.com.br",
      company: "Consultório Médico Costa",
      plan: "Básico",
      status: "inactive",
      monthlyRevenue: 199,
      totalUsers: 5,
      activeUsers: 0,
      lastLogin: "1 semana atrás",
      startDate: "20/11/2023",
      nextBilling: "20/02/2024",
      phone: "(11) 77777-7777",
      position: "Médica",
      address: "Rua da Saúde, 789",
      city: "São Paulo",
      state: "SP",
      zipCode: "01111-222",
      notes: "Conta inativa há uma semana. Necessário contato para reativação.",
      totalRevenue: 597,
      contractEndDate: "20/11/2024"
    },
    {
      id: "11",
      name: "Dr. Carlos Mendes",
      email: "carlos@centromedico.com.br",
      company: "Centro Médico São Paulo",
      plan: "Empresarial",
      status: "active",
      monthlyRevenue: 799,
      totalUsers: 80,
      activeUsers: 72,
      lastLogin: "5 min atrás",
      startDate: "05/01/2024",
      nextBilling: "05/02/2024",
      phone: "(11) 66666-6666",
      position: "CEO",
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100",
      notes: "Centro médico de grande porte. Cliente premium com múltiplas especialidades.",
      totalRevenue: 799,
      contractEndDate: "05/01/2025"
    },
    {
      id: "12",
      name: "Dra. Patricia Lima",
      email: "patricia@clinicaespecializada.com.br",
      company: "Clínica Especializada",
      plan: "Profissional",
      status: "active",
      monthlyRevenue: 399,
      totalUsers: 25,
      activeUsers: 23,
      lastLogin: "15 min atrás",
      startDate: "08/01/2024",
      nextBilling: "08/02/2024",
      phone: "(11) 55555-5555",
      position: "Diretora Clínica",
      address: "Rua Especializada, 321",
      city: "São Paulo",
      state: "SP",
      zipCode: "02222-333",
      notes: "Clínica focada em especialidades médicas. Crescimento consistente.",
      totalRevenue: 399,
      contractEndDate: "08/01/2025"
    }
  ],
  smarteduca: [
    {
      id: "4",
      name: "Prof. Carlos Lima",
      email: "carlos@escolamoderna.edu.br",
      company: "Escola Moderna",
      plan: "Educacional",
      status: "active",
      monthlyRevenue: 399,
      totalUsers: 100,
      activeUsers: 85,
      lastLogin: "30 min atrás",
      startDate: "05/01/2024",
      nextBilling: "05/02/2024",
      phone: "(21) 44444-4444",
      position: "Diretor Pedagógico",
      address: "Rua da Educação, 123",
      city: "Rio de Janeiro",
      state: "RJ",
      zipCode: "20000-000",
      notes: "Escola com foco em tecnologia educacional. Muito engajada.",
      totalRevenue: 399,
      contractEndDate: "05/01/2025"
    },
    {
      id: "5",
      name: "Diretora Maria Oliveira",
      email: "maria@universidadetecnica.edu.br",
      company: "Universidade Técnica",
      plan: "Universitário",
      status: "active",
      monthlyRevenue: 799,
      totalUsers: 500,
      activeUsers: 420,
      lastLogin: "1 hora atrás",
      startDate: "01/12/2023",
      nextBilling: "01/02/2024",
      phone: "(21) 33333-3333",
      position: "Reitora",
      address: "Campus Universitário, Bloco A",
      city: "Rio de Janeiro",
      state: "RJ",
      zipCode: "21000-000",
      notes: "Grande universidade com múltiplos cursos técnicos.",
      totalRevenue: 1598,
      contractEndDate: "01/12/2024"
    }
  ],
  smartimoveis: [
    {
      id: "6",
      name: "Roberto Imóveis",
      email: "roberto@imoveispremium.com.br",
      company: "Imóveis Premium",
      plan: "Imobiliário",
      status: "active",
      monthlyRevenue: 299,
      totalUsers: 20,
      activeUsers: 18,
      lastLogin: "2 horas atrás",
      startDate: "12/01/2024",
      nextBilling: "12/02/2024",
      phone: "(31) 22222-2222",
      position: "Proprietário",
      address: "Av. dos Imóveis, 456",
      city: "Belo Horizonte",
      state: "MG",
      zipCode: "30000-000",
      notes: "Imobiliária especializada em imóveis de alto padrão.",
      totalRevenue: 299,
      contractEndDate: "12/01/2025"
    }
  ],
  smartbusiness: [
    {
      id: "7",
      name: "Empresa Tech Solutions",
      email: "contato@techsolutions.com.br",
      company: "Tech Solutions",
      plan: "Empresarial",
      status: "suspended",
      monthlyRevenue: 999,
      totalUsers: 30,
      activeUsers: 0,
      lastLogin: "1 mês atrás",
      startDate: "15/10/2023",
      nextBilling: "15/02/2024",
      phone: "(41) 11111-1111",
      position: "CEO",
      address: "Rua Tech, 789",
      city: "Curitiba",
      state: "PR",
      zipCode: "80000-000",
      notes: "Conta suspensa por falta de pagamento. Necessário contato urgente.",
      totalRevenue: 3996,
      contractEndDate: "15/10/2024"
    }
  ]
};

export const saasInfo: Record<string, { name: string; description: string; color: string }> = {
  smartsaude: {
    name: "SmartSaúde",
    description: "Sistema de gestão para clínicas e hospitais",
    color: "from-blue-500 to-cyan-500"
  },
  smarteduca: {
    name: "SmartEduca",
    description: "Plataforma educacional para escolas e universidades",
    color: "from-green-500 to-emerald-500"
  },
  smartimoveis: {
    name: "SmartImóveis",
    description: "Gestão completa para imobiliárias",
    color: "from-purple-500 to-pink-500"
  },
  smartbusiness: {
    name: "SmartBusiness",
    description: "Solução empresarial completa",
    color: "from-orange-500 to-red-500"
  }
};

// Helper function para encontrar cliente por ID
export const findClientById = (clientId: string): Client | undefined => {
  for (const clients of Object.values(clientsData)) {
    const client = clients.find(c => c.id === clientId);
    if (client) return client;
  }
  return undefined;
};

// Helper function para encontrar clientes por SAAS
export const getClientsBySaas = (saasId: string): Client[] => {
  return clientsData[saasId] || [];
};