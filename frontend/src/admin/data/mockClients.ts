// ================================
// TIPOS E INTERFACES
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
  phone?: string;
  position?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  industry?: string;
  companySize?: string;
  website?: string;
  avatar?: string;
  notes?: string;
  totalRevenue?: number;
  contractEndDate?: string;
  createdBy?: string;
  lastUpdate?: string;
  planDetails?: {
    name: string;
    price: number;
    billing: 'monthly' | 'yearly';
    features: string[];
    limits: {
      users: number;
      storage: string;
      bandwidth: string;
      support: string;
    };
  };
  paymentMethod?: {
    lastFour: string;
    expiryDate: string;
  };
  billingHistory?: Array<{
    id: string;
    date: string;
    amount: number;
    status: "paid" | "pending" | "overdue";
    invoice: string;
    description: string;
  }>;
  administrators?: Array<{
    id: string;
    name: string;
    email: string;
    role: 'owner' | 'admin' | 'user';
    lastLogin: string;
  }>;
  support?: {
    tickets: Array<{
      id: string;
      title: string;
      status: 'open' | 'resolved' | 'pending';
      createdAt: string;
    }>;
    satisfaction: number;
    responseTime: string;
  };
  settings?: {
    timezone: string;
    language: string;
    security: {
      twoFactor: boolean;
      sessionTimeout: number;
    };
  };
}

export interface SaasInfo {
  name: string;
  description: string;
  color: string;
}

// ================================
// DADOS MOCKADOS
// ================================

export const saasInfo: Record<string, SaasInfo> = {
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
      industry: "Saúde",
      companySize: "Pequena",
      website: "https://clinicasilva.com.br",
      notes: "Cliente muito satisfeito com o sistema. Sempre pontual nos pagamentos.",
      totalRevenue: 897,
      contractEndDate: "15/01/2025",
      createdBy: "Admin",
      lastUpdate: "15/01/2024",
      planDetails: {
        name: "Plano Profissional",
        price: 299,
        billing: 'monthly',
        features: [
          "Gestão de pacientes",
          "Agendamento online",
          "Relatórios médicos",
          "Integração com laboratórios"
        ],
        limits: {
          users: 15,
          storage: "50GB",
          bandwidth: "Ilimitado",
          support: "24/7"
        }
      },
      paymentMethod: {
        lastFour: "1234",
        expiryDate: "12/25"
      },
      billingHistory: [
        {
          id: "1",
          date: "15/01/2024",
          amount: 299,
          status: "paid",
          invoice: "INV-2024-001",
          description: "Mensalidade Janeiro 2024"
        },
        {
          id: "2",
          date: "15/12/2023",
          amount: 299,
          status: "paid",
          invoice: "INV-2023-012",
          description: "Mensalidade Dezembro 2023"
        },
        {
          id: "3",
          date: "15/11/2023",
          amount: 299,
          status: "paid",
          invoice: "INV-2023-011",
          description: "Mensalidade Novembro 2023"
        }
      ],
      administrators: [
        {
          id: "1",
          name: "Dr. Maria Silva",
          email: "maria@clinicasilva.com.br",
          role: "owner",
          lastLogin: "2 min atrás"
        },
        {
          id: "2",
          name: "Enfermeira Ana",
          email: "ana@clinicasilva.com.br",
          role: "admin",
          lastLogin: "1 hora atrás"
        }
      ],
      support: {
        tickets: [
          {
            id: "TKT-001",
            title: "Dúvida sobre relatórios",
            status: "resolved",
            createdAt: "10/01/2024"
          },
          {
            id: "TKT-002",
            title: "Problema com integração",
            status: "open",
            createdAt: "12/01/2024"
          }
        ],
        satisfaction: 4.8,
        responseTime: "2 horas"
      },
      settings: {
        timezone: "America/Sao_Paulo",
        language: "pt-BR",
        security: {
          twoFactor: true,
          sessionTimeout: 30
        }
      }
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
      position: "Diretor Médico",
      address: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100",
      industry: "Saúde",
      companySize: "Grande",
      website: "https://hospitalcentral.com.br",
      notes: "Cliente corporativo com alta demanda.",
      totalRevenue: 1797,
      contractEndDate: "10/12/2024",
      createdBy: "Admin",
      lastUpdate: "10/12/2023",
      planDetails: {
        name: "Plano Empresarial",
        price: 599,
        billing: 'monthly',
        features: [
          "Gestão completa de pacientes",
          "Agendamento online",
          "Relatórios médicos avançados",
          "Integração com laboratórios",
          "Telemedicina",
          "API personalizada"
        ],
        limits: {
          users: 50,
          storage: "200GB",
          bandwidth: "Ilimitado",
          support: "24/7 Premium"
        }
      },
      paymentMethod: {
        lastFour: "5678",
        expiryDate: "08/26"
      },
      billingHistory: [
        {
          id: "4",
          date: "10/01/2024",
          amount: 599,
          status: "paid",
          invoice: "INV-2024-002",
          description: "Mensalidade Janeiro 2024"
        },
        {
          id: "5",
          date: "10/12/2023",
          amount: 599,
          status: "paid",
          invoice: "INV-2023-013",
          description: "Mensalidade Dezembro 2023"
        }
      ],
      administrators: [
        {
          id: "3",
          name: "Dr. João Santos",
          email: "joao@hospitalcentral.com.br",
          role: "owner",
          lastLogin: "1 hora atrás"
        }
      ],
      support: {
        tickets: [],
        satisfaction: 5.0,
        responseTime: "1 hora"
      },
      settings: {
        timezone: "America/Sao_Paulo",
        language: "pt-BR",
        security: {
          twoFactor: true,
          sessionTimeout: 60
        }
      }
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
      address: "Rua das Palmeiras, 456",
      city: "São Paulo",
      state: "SP",
      zipCode: "04567-890",
      industry: "Saúde",
      companySize: "Micro",
      notes: "Cliente inativo há mais de uma semana.",
      totalRevenue: 398,
      contractEndDate: "20/11/2024",
      createdBy: "Admin",
      lastUpdate: "20/11/2023",
      planDetails: {
        name: "Plano Básico",
        price: 199,
        billing: 'monthly',
        features: [
          "Gestão básica de pacientes",
          "Agendamento simples",
          "Relatórios básicos"
        ],
        limits: {
          users: 5,
          storage: "10GB",
          bandwidth: "Limitado",
          support: "Horário comercial"
        }
      },
      paymentMethod: {
        lastFour: "9012",
        expiryDate: "06/25"
      },
      billingHistory: [
        {
          id: "6",
          date: "20/12/2023",
          amount: 199,
          status: "pending",
          invoice: "INV-2023-014",
          description: "Mensalidade Dezembro 2023"
        }
      ],
      administrators: [
        {
          id: "4",
          name: "Dra. Ana Costa",
          email: "ana@consultoriomedico.com.br",
          role: "owner",
          lastLogin: "1 semana atrás"
        }
      ],
      support: {
        tickets: [
          {
            id: "TKT-003",
            title: "Problema de acesso",
            status: "open",
            createdAt: "15/01/2024"
          }
        ],
        satisfaction: 3.5,
        responseTime: "24 horas"
      },
      settings: {
        timezone: "America/Sao_Paulo",
        language: "pt-BR",
        security: {
          twoFactor: false,
          sessionTimeout: 15
        }
      }
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
      phone: "(11) 66666-6666",
      position: "Diretor",
      address: "Rua da Educação, 789",
      city: "São Paulo",
      state: "SP",
      zipCode: "02345-678",
      industry: "Educação",
      companySize: "Média",
      website: "https://escolamoderna.edu.br",
      notes: "Escola com excelente engajamento dos alunos.",
      totalRevenue: 399,
      contractEndDate: "05/01/2025",
      createdBy: "Admin",
      lastUpdate: "05/01/2024",
      planDetails: {
        name: "Plano Educacional",
        price: 399,
        billing: 'monthly',
        features: [
          "Gestão de alunos",
          "Portal do aluno",
          "Relatórios pedagógicos",
          "Comunicação com pais",
          "Avaliações online"
        ],
        limits: {
          users: 100,
          storage: "100GB",
          bandwidth: "Ilimitado",
          support: "Horário escolar"
        }
      },
      paymentMethod: {
        lastFour: "3456",
        expiryDate: "04/26"
      },
      billingHistory: [
        {
          id: "7",
          date: "05/01/2024",
          amount: 399,
          status: "paid",
          invoice: "INV-2024-003",
          description: "Mensalidade Janeiro 2024"
        }
      ],
      administrators: [
        {
          id: "5",
          name: "Prof. Carlos Lima",
          email: "carlos@escolamoderna.edu.br",
          role: "owner",
          lastLogin: "30 min atrás"
        }
      ],
      support: {
        tickets: [],
        satisfaction: 4.9,
        responseTime: "4 horas"
      },
      settings: {
        timezone: "America/Sao_Paulo",
        language: "pt-BR",
        security: {
          twoFactor: true,
          sessionTimeout: 45
        }
      }
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
      phone: "(11) 55555-5555",
      position: "Diretora Geral",
      address: "Av. Universitária, 2000",
      city: "São Paulo",
      state: "SP",
      zipCode: "03456-789",
      industry: "Educação Superior",
      companySize: "Grande",
      website: "https://universidadetecnica.edu.br",
      notes: "Universidade com alta demanda e excelente infraestrutura.",
      totalRevenue: 1598,
      contractEndDate: "01/12/2024",
      createdBy: "Admin",
      lastUpdate: "01/12/2023",
      planDetails: {
        name: "Plano Universitário",
        price: 799,
        billing: 'monthly',
        features: [
          "Gestão completa de estudantes",
          "Portal do estudante",
          "Relatórios acadêmicos",
          "Sistema de notas",
          "Biblioteca digital",
          "Integração com LMS",
          "API completa"
        ],
        limits: {
          users: 500,
          storage: "500GB",
          bandwidth: "Ilimitado",
          support: "24/7"
        }
      },
      paymentMethod: {
        lastFour: "7890",
        expiryDate: "10/27"
      },
      billingHistory: [
        {
          id: "8",
          date: "01/01/2024",
          amount: 799,
          status: "paid",
          invoice: "INV-2024-004",
          description: "Mensalidade Janeiro 2024"
        },
        {
          id: "9",
          date: "01/12/2023",
          amount: 799,
          status: "paid",
          invoice: "INV-2023-015",
          description: "Mensalidade Dezembro 2023"
        }
      ],
      administrators: [
        {
          id: "6",
          name: "Diretora Maria Oliveira",
          email: "maria@universidadetecnica.edu.br",
          role: "owner",
          lastLogin: "1 hora atrás"
        },
        {
          id: "7",
          name: "Prof. João Silva",
          email: "joao@universidadetecnica.edu.br",
          role: "admin",
          lastLogin: "2 horas atrás"
        }
      ],
      support: {
        tickets: [
          {
            id: "TKT-004",
            title: "Integração com sistema acadêmico",
            status: "resolved",
            createdAt: "08/01/2024"
          }
        ],
        satisfaction: 4.7,
        responseTime: "2 horas"
      },
      settings: {
        timezone: "America/Sao_Paulo",
        language: "pt-BR",
        security: {
          twoFactor: true,
          sessionTimeout: 60
        }
      }
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
      phone: "(11) 44444-4444",
      position: "Proprietário",
      address: "Rua dos Imóveis, 321",
      city: "São Paulo",
      state: "SP",
      zipCode: "04567-123",
      industry: "Imobiliário",
      companySize: "Média",
      website: "https://imoveispremium.com.br",
      notes: "Corretor experiente com boa carteira de clientes.",
      totalRevenue: 299,
      contractEndDate: "12/01/2025",
      createdBy: "Admin",
      lastUpdate: "12/01/2024",
      planDetails: {
        name: "Plano Imobiliário",
        price: 299,
        billing: 'monthly',
        features: [
          "Gestão de imóveis",
          "Portal de clientes",
          "Relatórios de vendas",
          "Integração com portais",
          "CRM integrado"
        ],
        limits: {
          users: 20,
          storage: "50GB",
          bandwidth: "Ilimitado",
          support: "Horário comercial"
        }
      },
      paymentMethod: {
        lastFour: "2345",
        expiryDate: "03/26"
      },
      billingHistory: [
        {
          id: "10",
          date: "12/01/2024",
          amount: 299,
          status: "paid",
          invoice: "INV-2024-005",
          description: "Mensalidade Janeiro 2024"
        }
      ],
      administrators: [
        {
          id: "8",
          name: "Roberto Imóveis",
          email: "roberto@imoveispremium.com.br",
          role: "owner",
          lastLogin: "2 horas atrás"
        }
      ],
      support: {
        tickets: [],
        satisfaction: 4.6,
        responseTime: "6 horas"
      },
      settings: {
        timezone: "America/Sao_Paulo",
        language: "pt-BR",
        security: {
          twoFactor: false,
          sessionTimeout: 30
        }
      }
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
      phone: "(11) 33333-3333",
      position: "CEO",
      address: "Av. Tecnologia, 1500",
      city: "São Paulo",
      state: "SP",
      zipCode: "05678-901",
      industry: "Tecnologia",
      companySize: "Média",
      website: "https://techsolutions.com.br",
      notes: "Cliente suspenso por falta de pagamento.",
      totalRevenue: 2997,
      contractEndDate: "15/10/2024",
      createdBy: "Admin",
      lastUpdate: "15/10/2023",
      planDetails: {
        name: "Plano Empresarial",
        price: 999,
        billing: 'monthly',
        features: [
          "Gestão empresarial completa",
          "CRM avançado",
          "Relatórios executivos",
          "Integração com ERPs",
          "API personalizada",
          "Suporte dedicado"
        ],
        limits: {
          users: 30,
          storage: "200GB",
          bandwidth: "Ilimitado",
          support: "24/7 Premium"
        }
      },
      paymentMethod: {
        lastFour: "6789",
        expiryDate: "09/25"
      },
      billingHistory: [
        {
          id: "11",
          date: "15/12/2023",
          amount: 999,
          status: "overdue",
          invoice: "INV-2023-016",
          description: "Mensalidade Dezembro 2023"
        },
        {
          id: "12",
          date: "15/11/2023",
          amount: 999,
          status: "paid",
          invoice: "INV-2023-017",
          description: "Mensalidade Novembro 2023"
        }
      ],
      administrators: [
        {
          id: "9",
          name: "Empresa Tech Solutions",
          email: "contato@techsolutions.com.br",
          role: "owner",
          lastLogin: "1 mês atrás"
        }
      ],
      support: {
        tickets: [
          {
            id: "TKT-005",
            title: "Solicitação de reativação",
            status: "open",
            createdAt: "20/01/2024"
          }
        ],
        satisfaction: 3.2,
        responseTime: "48 horas"
      },
      settings: {
        timezone: "America/Sao_Paulo",
        language: "pt-BR",
        security: {
          twoFactor: true,
          sessionTimeout: 30
        }
      }
    }
  ]
};

// ================================
// FUNÇÕES AUXILIARES
// ================================

export const findClientById = (clientId: string): Client | null => {
  for (const saasClients of Object.values(clientsData)) {
    const client = saasClients.find(c => c.id === clientId);
    if (client) return client;
  }
  return null;
};

export const getClientBySaas = (saasId: string): Client[] => {
  return clientsData[saasId] || [];
};