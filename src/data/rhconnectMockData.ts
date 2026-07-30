import { 
  CandidateProfile, 
  CompanyProfile, 
  JobPosition, 
  Application, 
  ChatThread, 
  ChatMessage, 
  SystemNotification, 
  FinancialInvoice, 
  AdminMetrics 
} from '../types/rhconnect';

export const INITIAL_CANDIDATES: CandidateProfile[] = [
  {
    id: 'cand_1',
    name: 'Mariana Souza',
    email: 'mariana.souza@email.com',
    phone: '(11) 98765-4321',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    city: 'São Paulo',
    state: 'SP',
    headline: 'Desenvolvedora Full Stack Senior (React / Node.js / TypeScript)',
    summary: 'Engenheira de software com 6 anos de experiência no desenvolvimento de sistemas web escaláveis, microsserviços e aplicações em nuvem. Apaixonada por boas práticas de código e performance.',
    experienceYears: 6,
    experienceLevel: 'senior',
    workModelPreference: 'remoto',
    desiredSalaryMin: 11000,
    desiredSalaryMax: 15000,
    softSkills: ['Liderança Técnica', 'Comunicação Assertiva', 'Resolução de Problemas', 'Trabalho em Equipe'],
    hardSkills: ['React', 'Node.js', 'TypeScript', 'Next.js', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL'],
    experiences: [
      {
        id: 'exp_1',
        company: 'Fintech PagExpress',
        role: 'Desenvolvedora Senior',
        period: '2023 - Presente',
        description: 'Liderança técnica no desenvolvimento da API de pagamentos com alta disponibilidade e migração para arquitetura serverless.'
      },
      {
        id: 'exp_2',
        company: 'SoftDev Brasil',
        role: 'Desenvolvedora Pleno',
        period: '2020 - 2023',
        description: 'Desenvolvimento de dashboards em React e APIs RESTful em Node.js com TypeScript e Jest.'
      }
    ],
    education: [
      {
        id: 'edu_1',
        institution: 'Universidade de São Paulo (USP)',
        degree: 'Bacharelado em Ciência da Computação',
        period: '2016 - 2020'
      }
    ],
    languages: ['Português (Nativo)', 'Inglês (Avançado/Fluente)'],
    cvFileName: 'CV_Mariana_Souza_2026.pdf',
    cvPdfUrl: '#',
    portfolioUrl: 'https://marianasouza.dev',
    linkedinUrl: 'https://linkedin.com/in/marianasouza',
    githubUrl: 'https://github.com/marianasouza',
    status: 'active',
    createdAt: '2026-01-15'
  },
  {
    id: 'cand_2',
    name: 'Lucas Oliveira',
    email: 'lucas.oliveira@email.com',
    phone: '(21) 99887-1122',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    city: 'Rio de Janeiro',
    state: 'RJ',
    headline: 'Analista Financeiro Senior | Controladoria & FP&A',
    summary: 'Especialista em planejamento financeiro, orçamento empresarial, modelagem de DRE, fluxo de caixa e relatórios executivos para diretoria.',
    experienceYears: 7,
    experienceLevel: 'senior',
    workModelPreference: 'hibrido',
    desiredSalaryMin: 8500,
    desiredSalaryMax: 12000,
    softSkills: ['Visão Estratégica', 'Análise Crítica', 'Negociação', 'Pontualidade'],
    hardSkills: ['Excel Avançado/VBA', 'Power BI', 'SAP ERP', 'DRE & Balanço', 'Modelagem Financeira', 'SQL'],
    experiences: [
      {
        id: 'exp_3',
        company: 'Grupo Varejo Sul',
        role: 'Analista Financeiro Senior',
        period: '2022 - Presente',
        description: 'Coordenou o planejamento orçamentário anual de R$ 40M e implementou novos indicadores de EBITDA.'
      }
    ],
    education: [
      {
        id: 'edu_2',
        institution: 'UFRJ',
        degree: 'Administração com ênfase em Finanças',
        period: '2015 - 2019'
      }
    ],
    languages: ['Português (Nativo)', 'Inglês (Intermediário)'],
    cvFileName: 'Curriculo_Lucas_Oliveira.pdf',
    cvPdfUrl: '#',
    linkedinUrl: 'https://linkedin.com/in/lucasoliveirafin',
    status: 'active',
    createdAt: '2026-02-01'
  },
  {
    id: 'cand_3',
    name: 'Fernanda Lima',
    email: 'fernanda.lima@email.com',
    phone: '(31) 99123-4567',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    city: 'Belo Horizonte',
    state: 'MG',
    headline: 'Lead Product Designer (UX/UI) & Design Systems',
    summary: 'Designer com foco em experiência do usuário, facilitação de workshops de Discovery, arquitetura de informação e construção de Design Systems escaláveis em Figma.',
    experienceYears: 5,
    experienceLevel: 'pleno',
    workModelPreference: 'remoto',
    desiredSalaryMin: 9000,
    desiredSalaryMax: 13000,
    softSkills: ['Empatia', 'Facilitação', 'Pensamento Crítico', 'Prototipagem Rápida'],
    hardSkills: ['Figma', 'UX Research', 'Design System', 'Prototipagem Interativa', 'Miro', 'Hotjar', 'Usability Testing'],
    experiences: [
      {
        id: 'exp_4',
        company: 'Digital Innovation Lab',
        role: 'UX/UI Designer Senior',
        period: '2021 - Presente',
        description: 'Redesenho completo do aplicativo mobile bancário resultando em aumento de 35% na retenção de usuários.'
      }
    ],
    education: [
      {
        id: 'edu_3',
        institution: 'UFMG',
        degree: 'Design Gráfico e Digital',
        period: '2017 - 2021'
      }
    ],
    languages: ['Português (Nativo)', 'Inglês (Avançado)'],
    cvFileName: 'CV_Fernanda_Lima_UX.pdf',
    cvPdfUrl: '#',
    portfolioUrl: 'https://behance.net/fernandalimaux',
    linkedinUrl: 'https://linkedin.com/in/fernandalimaux',
    status: 'active',
    createdAt: '2026-02-10'
  },
  {
    id: 'cand_4',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@email.com',
    phone: '(41) 98844-3322',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    city: 'Curitiba',
    state: 'PR',
    headline: 'Enfermeiro Intensivista e Coordenador de UTI',
    summary: 'Profissional da saúde altamente qualificado, pós-graduado em Urgência e Emergência. Experiência de 8 anos na coordenação de equipes de enfermagem em UTIs adulto.',
    experienceYears: 8,
    experienceLevel: 'senior',
    workModelPreference: 'presencial',
    desiredSalaryMin: 7000,
    desiredSalaryMax: 9500,
    softSkills: ['Resiliência', 'Trabalho sob Pressão', 'Empatia com Pacientes', 'Liderança'],
    hardSkills: ['Atendimento UTI', 'Protocolos Hospitalares', 'Sistemas Tasy/MV', 'Triagem de Risco', 'Gestão de Equipe'],
    experiences: [
      {
        id: 'exp_5',
        company: 'Hospital Central de Curitiba',
        role: 'Enfermeiro Chefe de Leitos',
        period: '2018 - Presente',
        description: 'Responsável pela escala e treinamento de 25 técnicos e enfermeiros na ala de cuidados intensivos.'
      }
    ],
    education: [
      {
        id: 'edu_4',
        institution: 'PUC-PR',
        degree: 'Enfermagem',
        period: '2013 - 2017'
      }
    ],
    languages: ['Português (Nativo)'],
    cvFileName: 'Currículo_Carlos_Mendes.pdf',
    cvPdfUrl: '#',
    linkedinUrl: 'https://linkedin.com/in/carlosmendes-enf',
    status: 'active',
    createdAt: '2026-02-14'
  },
  {
    id: 'cand_5',
    name: 'Juliana Costa',
    email: 'juliana.costa@email.com',
    phone: '(51) 99555-4433',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    city: 'Porto Alegre',
    state: 'RS',
    headline: 'Especialista em Marketing Digital & Growth Hacking',
    summary: 'Foco na aquisição de clientes B2B/B2C, otimização de campanhas Google Ads/Meta Ads, estratégia de SEO e gestão de funil de vendas com automação.',
    experienceYears: 4,
    experienceLevel: 'pleno',
    workModelPreference: 'remoto',
    desiredSalaryMin: 6500,
    desiredSalaryMax: 9000,
    softSkills: ['Pensamento Analítico', 'Criatividade', 'Foco em Métricas', 'Organização'],
    hardSkills: ['Google Ads', 'Meta Ads', 'SEO Avançado', 'RD Station', 'Google Analytics 4', 'Copywriting', 'HubSpot'],
    experiences: [
      {
        id: 'exp_6',
        company: 'Agência MKT Scale',
        role: 'Growth Manager',
        period: '2022 - Presente',
        description: 'Gestão de orçamentos de tráfego pago de R$ 150k/mês com alcance de CAC 28% menor.'
      }
    ],
    education: [
      {
        id: 'edu_5',
        institution: 'UFRGS',
        degree: 'Comunicação Social - Publicidade',
        period: '2018 - 2022'
      }
    ],
    languages: ['Português (Nativo)', 'Inglês (Intermediário)'],
    cvFileName: 'CV_Juliana_Costa_Growth.pdf',
    cvPdfUrl: '#',
    linkedinUrl: 'https://linkedin.com/in/julianacostamkt',
    status: 'active',
    createdAt: '2026-02-20'
  }
];

export const INITIAL_COMPANIES: CompanyProfile[] = [
  {
    id: 'comp_1',
    companyName: 'Tech Solutions Inovações Ltda',
    tradeName: 'Tech Solutions',
    cnpj: '12.345.678/0001-90',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150',
    email: 'rh@techsolutions.com.br',
    phone: '(11) 3344-5566',
    contactPerson: 'Amanda Ribeiro (Head de Gente & Gestão)',
    industry: 'Tecnologia da Informação & Software',
    city: 'São Paulo',
    state: 'SP',
    description: 'Empresa líder em desenvolvimento de softwares empresariais e plataformas SaaS na nuvem para grandes indústrias e varejo.',
    employeeCount: '100-250 colaboradores',
    website: 'https://techsolutions.com.br',
    plan: 'premium',
    planStatus: 'active',
    trialDaysLeft: 0,
    status: 'active',
    createdAt: '2025-08-10'
  },
  {
    id: 'comp_2',
    companyName: 'Blue Soft Sistemas Digitais S/A',
    tradeName: 'Blue Soft',
    cnpj: '98.765.432/0001-10',
    logoUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=150',
    email: 'vagas@bluesoft.com.br',
    phone: '(21) 2233-4455',
    contactPerson: 'Roberto Magalhães (Tech Recruiter)',
    industry: 'Computação em Nuvem e Inteligência Artificial',
    city: 'Rio de Janeiro',
    state: 'RJ',
    description: 'Consultoria global especializada em transformação digital, engenharia de dados e soluções de IA corporativa.',
    employeeCount: '250-500 colaboradores',
    website: 'https://bluesoft.com.br',
    plan: 'premium',
    planStatus: 'active',
    trialDaysLeft: 0,
    status: 'active',
    createdAt: '2025-10-01'
  },
  {
    id: 'comp_3',
    companyName: 'Grupo Prime Investimentos e Serviços',
    tradeName: 'Grupo Prime',
    cnpj: '45.112.334/0001-55',
    logoUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=150',
    email: 'carreiras@grupoprime.com',
    phone: '(31) 3123-9000',
    contactPerson: 'Beatriz Vasconcelos (Gerente de RH)',
    industry: 'Mercado Financeiro & Gestão de Ativos',
    city: 'Belo Horizonte',
    state: 'MG',
    description: 'Holding de investimentos focada no ecossistema imobiliário, energia renovável e serviços financeiros integrados.',
    employeeCount: '50-100 colaboradores',
    website: 'https://grupoprime.com',
    plan: 'mensal',
    planStatus: 'active',
    trialDaysLeft: 0,
    status: 'active',
    createdAt: '2025-11-12'
  },
  {
    id: 'comp_4',
    companyName: 'Alpha Engenharia e Projetos Ltda',
    tradeName: 'Alpha Engenharia',
    cnpj: '33.888.999/0001-22',
    logoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=150',
    email: 'rh@alphaengenharia.com.br',
    phone: '(41) 3090-8811',
    contactPerson: 'Sérgio Nogueira (Diretor Operacional)',
    industry: 'Engenharia e Construção Civil',
    city: 'Curitiba',
    state: 'PR',
    description: 'Especialistas em grandes obras infraestruturais, edifícios sustentáveis corporativos e plantas industriais.',
    employeeCount: '100-250 colaboradores',
    website: 'https://alphaengenharia.com.br',
    plan: 'free_trial',
    planStatus: 'trial_expiring',
    trialDaysLeft: 3,
    status: 'active',
    createdAt: '2026-02-15'
  },
  {
    id: 'comp_5',
    companyName: 'Hospital e Maternidade Vida S/A',
    tradeName: 'Hospital Vida',
    cnpj: '11.222.333/0001-44',
    logoUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=150',
    email: 'selecao@hospitalvida.com.br',
    phone: '(11) 4004-9988',
    contactPerson: 'Dra. Patricia Medeiros (Coordenadora de Pessoas)',
    industry: 'Saúde e Serviços Hospitalares',
    city: 'São Paulo',
    state: 'SP',
    description: 'Centro médico hospitalar de alta complexidade com acreditação ONA nível 3, referência em oncologia e UTI.',
    employeeCount: '500+ colaboradores',
    website: 'https://hospitalvida.com.br',
    plan: 'premium',
    planStatus: 'active',
    trialDaysLeft: 0,
    status: 'active',
    createdAt: '2025-09-20'
  },
  {
    id: 'comp_6',
    companyName: 'LogExpress Transportes e Logística Ltda',
    tradeName: 'LogExpress',
    cnpj: '77.666.555/0001-88',
    logoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=150',
    email: 'rh@logexpress.com.br',
    phone: '(19) 3888-2200',
    contactPerson: 'Marcio Silva (Recrutamento)',
    industry: 'Logística & Supply Chain',
    city: 'Campinas',
    state: 'SP',
    description: 'Rede nacional de transporte rodoviário, centro de distribuição automatizado e entregas expressas de e-commerce.',
    employeeCount: '250-500 colaboradores',
    website: 'https://logexpress.com.br',
    plan: 'mensal',
    planStatus: 'active',
    trialDaysLeft: 0,
    status: 'active',
    createdAt: '2025-12-05'
  }
];

export const INITIAL_JOBS: JobPosition[] = [
  {
    id: 'job_1',
    companyId: 'comp_1',
    companyName: 'Tech Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150',
    title: 'Desenvolvedor Full Stack Senior (React / Node.js)',
    department: 'Engenharia de Software',
    city: 'São Paulo',
    state: 'SP',
    workModel: 'remoto',
    experienceLevel: 'senior',
    salaryMin: 12000,
    salaryMax: 16000,
    showSalary: true,
    description: 'Buscamos um Engenheiro Full Stack Senior altamente qualificado para atuar no desenvolvimento da nossa plataforma core SaaS de gestão de entregas. Você será responsável por arquitetar APIs em Node.js/TypeScript e construir interfaces modernas com React.',
    responsibilities: [
      'Desenvolver componentes reutilizáveis e performáticos no frontend React com TypeScript',
      'Construir APIs RESTful e microsserviços em Node.js com PostgreSQL e Redis',
      'Garantir cobertura de testes automatizados (Jest / Cypress) e CI/CD na AWS',
      'Mentorar desenvolvedores mais novos e propor melhorias arquiteturais'
    ],
    requirements: [
      'Mínimo de 5 anos de experiência comprovada com React e Node.js',
      'Domínio avançado de TypeScript e manipulação de bancos relacionais (PostgreSQL/MySQL)',
      'Experiência prévia com Docker, CI/CD e ambientes AWS',
      'Fortes habilidades de comunicação e trabalho em equipe ágil (Scrum/Kanban)'
    ],
    desirableSkills: [
      'Next.js 14+ / Server Components',
      'Conhecimento de microsserviços e mensageria (RabbitMQ / Kafka)',
      'Inglês técnico para documentação'
    ],
    benefits: [
      'Vale Refeição / Alimentação R$ 1.200/mês no Caju',
      'Plano de Saúde e Odontológico Bradesco Top Nacional (100% pago)',
      'Auxílio Home Office de R$ 350/mês',
      'Verba anual de R$ 3.000 para cursos, eventos e certificações',
      'Horário flexível e Day off no aniversário'
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL'],
    stages: ['Triagem IA', 'Entrevista Cultural com RH', 'Desafio Técnico', 'Entrevista com Tech Lead', 'Proposta Comercial'],
    screeningQuestions: [
      {
        id: 'q_1',
        question: 'Você possui no mínimo 5 anos de experiência com TypeScript e React?',
        isEliminatory: true
      },
      {
        id: 'q_2',
        question: 'Tem disponibilidade para início imediato ou aviso prévio em até 15 dias?',
        isEliminatory: false
      }
    ],
    status: 'open',
    applicantCount: 28,
    viewsCount: 342,
    createdAt: '2026-02-18'
  },
  {
    id: 'job_2',
    companyId: 'comp_3',
    companyName: 'Grupo Prime',
    companyLogo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=150',
    title: 'Analista Financeiro Senior (FP&A / Controladoria)',
    department: 'Financeiro & Controladoria',
    city: 'Belo Horizonte',
    state: 'MG',
    workModel: 'hibrido',
    experienceLevel: 'senior',
    salaryMin: 9000,
    salaryMax: 12500,
    showSalary: true,
    description: 'Procuramos um Analista Financeiro Senior focado em planejamento orçamentário, modelagem financeira de novos negócios e acompanhamento de DRE por unidade de negócio.',
    responsibilities: [
      'Elaboração e acompanhamento do Budget Anual e Forecast mensal',
      'Modelagem financeira de viabilidade para novos investimentos e fusões',
      'Análise de variações Realizado x Orçado e relatórios consolidados para a diretoria',
      'Gestão do fluxo de caixa projetado e acompanhamento de indicadores de EBITDA'
    ],
    requirements: [
      'Graduação em Administração, Economia, Ciências Contábeis ou Engenharia',
      'Domínio avançado de Excel, VBA e Power BI para criação de dashboards executivos',
      'Experiência sólida em empresas de médio/grande porte na área de FP&A'
    ],
    desirableSkills: [
      'Pós-graduação em Finanças ou Controladoria',
      'Conhecimento do sistema SAP ERP'
    ],
    benefits: [
      'Vale Refeição e Alimentação de R$ 1.100/mês',
      'Plano de Saúde Unimed Seguros',
      'Participação nos Lucros e Resultados (PLR) de até 3 salários',
      'Previdência Privada com contrapartida de 100%'
    ],
    technologies: ['Excel Avançado', 'Power BI', 'SAP ERP', 'DRE', 'Modelagem Financeira', 'SQL'],
    stages: ['Triagem IA', 'Entrevista RH', 'Estudo de Caso Financeiro', 'Entrevista com CFO', 'Contratação'],
    screeningQuestions: [
      {
        id: 'q_3',
        question: 'Possui nível avançado comprovado em Excel e Power BI?',
        isEliminatory: true
      }
    ],
    status: 'open',
    applicantCount: 19,
    viewsCount: 215,
    createdAt: '2026-02-12'
  },
  {
    id: 'job_3',
    companyId: 'comp_2',
    companyName: 'Blue Soft',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=150',
    title: 'UX/UI Designer Senior (Design Systems)',
    department: 'Design & Produto',
    city: 'Rio de Janeiro',
    state: 'RJ',
    workModel: 'remoto',
    experienceLevel: 'senior',
    salaryMin: 10000,
    salaryMax: 14000,
    showSalary: true,
    description: 'Vaga para atuar na evolução constante da experiência dos nossos produtos digitais e na liderança do Design System corporativo da empresa.',
    responsibilities: [
      'Conduzir pesquisas de usuários, testes de usabilidade e prototipagem de alta fidelidade no Figma',
      'Manter e escalar o Design System com tokens, componentes acessíveis (WCAG) e documentação',
      'Colaborar diariamente com gerentes de produto (PMs) e desenvolvedores frontend'
    ],
    requirements: [
      'Mínimo de 4 anos de experiência com Product Design (UX/UI)',
      'Portfólio com cases reais demonstrando processo de descoberta e impacto de negócio',
      'Domínio avançado do Figma (Auto-layout, componentes avançados, variáveis)'
    ],
    desirableSkills: ['Conhecimento básico de HTML/CSS para alinhar viabilidade com engenheiros'],
    benefits: [
      'Sua máquina à sua escolha (MacBook Pro M3 ou Dell XPS)',
      'Vale Refeição R$ 1.300/mês',
      'Gympass Gold',
      'Horário 100% flexível'
    ],
    technologies: ['Figma', 'UX Research', 'Design System', 'Miro', 'Hotjar', 'Prototipagem'],
    stages: ['Triagem IA', 'Apresentação do Portfólio com RH', 'Desafio Prático de UX', 'Entrevista Head de Produto', 'Proposta'],
    screeningQuestions: [
      {
        id: 'q_4',
        question: 'Você possui portfólio atualizado com cases de UX/UI?',
        isEliminatory: true
      }
    ],
    status: 'open',
    applicantCount: 35,
    viewsCount: 480,
    createdAt: '2026-02-10'
  },
  {
    id: 'job_4',
    companyId: 'comp_5',
    companyName: 'Hospital Vida',
    companyLogo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=150',
    title: 'Enfermeiro Intensivista - UTI Adulto',
    department: 'Enfermagem Hospitalar',
    city: 'São Paulo',
    state: 'SP',
    workModel: 'presencial',
    experienceLevel: 'senior',
    salaryMin: 6800,
    salaryMax: 8500,
    showSalary: true,
    description: 'Atuação na Unidade de Terapia Intensiva Adulto em escala 12x36 noturna. O profissional será responsável pela assistência direta a pacientes críticos e supervisão da equipe técnica.',
    responsibilities: [
      'Sistematização da Assistência de Enfermagem (SAE) em leitos de terapia intensiva',
      'Gerenciamento de bombas de infusão, ventilação mecânica e monitorização invasiva',
      'Liderança técnica da equipe de técnicos de enfermagem do plantão'
    ],
    requirements: [
      'Graduação em Enfermagem com COREN ativo',
      'Pós-graduação concluída em UTI Adulto ou Urgência e Emergência',
      'Experiência mínima de 2 anos em UTI Adulto hospitalar'
    ],
    desirableSkills: ['Certificação BLS / ACLS válida'],
    benefits: [
      'Insalubridade 40%',
      'Vale Alimentação R$ 600/mês',
      'Refeitório no local gratuito',
      'Plano de Saúde Amil Enfermaria integral'
    ],
    technologies: ['Prontuário Eletrônico Tasy', 'Protocolos UTI', 'Monitorização Invasiva'],
    stages: ['Triagem IA', 'Prova Técnica Teórica', 'Entrevista com Supervisão de Enfermagem', 'Exame Admissional'],
    screeningQuestions: [
      {
        id: 'q_5',
        question: 'Possui COREN ativo e pós-graduação em UTI Adulto?',
        isEliminatory: true
      }
    ],
    status: 'open',
    applicantCount: 14,
    viewsCount: 190,
    createdAt: '2026-02-14'
  },
  {
    id: 'job_5',
    companyId: 'comp_6',
    companyName: 'LogExpress',
    companyLogo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=150',
    title: 'Coordenador de Marketing Digital & Growth',
    department: 'Marketing & Vendas',
    city: 'Campinas',
    state: 'SP',
    workModel: 'hibrido',
    experienceLevel: 'pleno',
    salaryMin: 7000,
    salaryMax: 9500,
    showSalary: true,
    description: 'Coordenar as estratégias de marketing de atração e aquisição de clientes B2B para serviços de logística e fulfillment.',
    responsibilities: [
      'Planejamento de mídia paga (Google Ads B2B, LinkedIn Ads)',
      'Otimização do funil de conversão de leads qualificados no CRM HubSpot',
      'Análise contínua de ROI, CAC, LTV e métricas de desempenho de campanha'
    ],
    requirements: [
      'Experiência sólida em marketing digital focado em geração de leads B2B',
      'Domínio de ferramentas de automação (HubSpot / RD Station) e Google Analytics 4',
      'Capacidade analítica para tomada de decisões baseada em dados'
    ],
    desirableSkills: ['Conhecimento do segmento de logística ou e-commerce'],
    benefits: [
      'Vale Refeição R$ 900/mês',
      'Plano de Saúde SulAmérica',
      'Vale Transporte / Combustível'
    ],
    technologies: ['Google Ads', 'LinkedIn Ads', 'HubSpot', 'GA4', 'RD Station', 'SEO'],
    stages: ['Triagem IA', 'Entrevista RH', 'Apresentação de Plano de Growth', 'Entrevista Gerência Comercial', 'Admissão'],
    screeningQuestions: [
      {
        id: 'q_6',
        question: 'Possui experiência com gestão de mídia paga B2B acima de R$ 30k/mês?',
        isEliminatory: false
      }
    ],
    status: 'open',
    applicantCount: 22,
    viewsCount: 280,
    createdAt: '2026-02-19'
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app_1',
    jobId: 'job_1',
    candidateId: 'cand_1',
    candidateName: 'Mariana Souza',
    candidatePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    candidateHeadline: 'Desenvolvedora Full Stack Senior (React / Node.js / TypeScript)',
    candidateLocation: 'São Paulo, SP',
    jobTitle: 'Desenvolvedor Full Stack Senior (React / Node.js)',
    companyName: 'Tech Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150',
    appliedDate: '2026-02-19',
    stage: 'entrevista',
    aiScore: 94,
    aiMatchingSkills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL'],
    aiMissingSkills: [],
    aiSummary: 'Candidata com altíssimo nível de aderência (94%). Possui 6 anos de experiência sólida em React e Node.js com TypeScript, exatamente o stack exigido. Histórico em arquitetura de microsserviços e liderança técnica.',
    screeningAnswers: [
      {
        questionId: 'q_1',
        question: 'Você possui no mínimo 5 anos de experiência com TypeScript e React?',
        answer: 'Sim, possuo 6 anos atuando diariamente com esse stack.'
      },
      {
        questionId: 'q_2',
        question: 'Tem disponibilidade para início imediato ou aviso prévio em até 15 dias?',
        answer: 'Possuo aviso prévio negociável de 15 dias.'
      }
    ],
    notesCompany: 'Candidata excelente na triagem técnica. Agendada entrevista de fit cultural para sexta-feira.',
    interviewDate: '2026-02-24T14:00:00',
    interviewLink: 'https://meet.google.com/rhc-tech-msouza'
  },
  {
    id: 'app_2',
    jobId: 'job_2',
    candidateId: 'cand_2',
    candidateName: 'Lucas Oliveira',
    candidatePhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250',
    candidateHeadline: 'Analista Financeiro Senior | Controladoria & FP&A',
    candidateLocation: 'Rio de Janeiro, RJ',
    jobTitle: 'Analista Financeiro Senior (FP&A / Controladoria)',
    companyName: 'Grupo Prime',
    companyLogo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=150',
    appliedDate: '2026-02-13',
    stage: 'teste_tecnico',
    aiScore: 89,
    aiMatchingSkills: ['Excel Avançado', 'Power BI', 'SAP ERP', 'DRE', 'Modelagem Financeira'],
    aiMissingSkills: ['Residência na cidade do trabalho (candidato está no RJ, vaga em BH híbrida)'],
    aiSummary: 'Aderência forte de 89%. Forte domínio em FP&A, orçamento e SAP ERP. Ponto de atenção: residência atual no RJ com modelo híbrido em Belo Horizonte (disposto a transição ou estadias).',
    screeningAnswers: [
      {
        questionId: 'q_3',
        question: 'Possui nível avançado comprovado em Excel e Power BI?',
        answer: 'Sim, especialista com automações em VBA e modelagem de DREs dinâmicas.'
      }
    ],
    notesCompany: 'Realizou o teste orçamentário. Aguardando correção da diretoria.'
  },
  {
    id: 'app_3',
    jobId: 'job_3',
    candidateId: 'cand_3',
    candidateName: 'Fernanda Lima',
    candidatePhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    candidateHeadline: 'Lead Product Designer (UX/UI) & Design Systems',
    candidateLocation: 'Belo Horizonte, MG',
    jobTitle: 'UX/UI Designer Senior (Design Systems)',
    companyName: 'Blue Soft',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=150',
    appliedDate: '2026-02-11',
    stage: 'aprovado',
    aiScore: 92,
    aiMatchingSkills: ['Figma', 'UX Research', 'Design System', 'Prototipagem', 'Hotjar'],
    aiMissingSkills: [],
    aiSummary: 'Candidata perfeita para a cultura da empresa (92%). Portfólio premiado, 5 anos construindo Design Systems no Figma e liderança em squads ágeis.',
    screeningAnswers: [
      {
        questionId: 'q_4',
        question: 'Você possui portfólio atualizado com cases de UX/UI?',
        answer: 'Sim, disponível em behance.net/fernandalimaux'
      }
    ],
    notesCompany: 'Aprovada em todas as etapas! Proposta comercial enviada via e-mail.'
  },
  {
    id: 'app_4',
    jobId: 'job_4',
    candidateId: 'cand_4',
    candidateName: 'Carlos Mendes',
    candidatePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    candidateHeadline: 'Enfermeiro Intensivista e Coordenador de UTI',
    candidateLocation: 'Curitiba, PR',
    jobTitle: 'Enfermeiro Intensivista - UTI Adulto',
    companyName: 'Hospital Vida',
    companyLogo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=150',
    appliedDate: '2026-02-15',
    stage: 'triagem_ia',
    aiScore: 78,
    aiMatchingSkills: ['Protocolos UTI', 'Enfermagem', 'Liderança de Leitos'],
    aiMissingSkills: ['Localização em São Paulo (Candidato mora em Curitiba)'],
    aiSummary: 'Aderência técnica sólida (78%). Experiência excelente como enfermeiro chefe de UTI. Ponto de atenção: vaga presencial em SP e candidato atualmente em Curitiba.',
    screeningAnswers: [
      {
        questionId: 'q_5',
        question: 'Possui COREN ativo e pós-graduação em UTI Adulto?',
        answer: 'Sim, COREN-PR ativo e pós em Urgência/Emergência e UTI.'
      }
    ]
  },
  {
    id: 'app_5',
    jobId: 'job_5',
    candidateId: 'cand_5',
    candidateName: 'Juliana Costa',
    candidatePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    candidateHeadline: 'Especialista em Marketing Digital & Growth Hacking',
    candidateLocation: 'Porto Alegre, RS',
    jobTitle: 'Coordenador de Marketing Digital & Growth',
    companyName: 'LogExpress',
    companyLogo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=150',
    appliedDate: '2026-02-20',
    stage: 'em_analise',
    aiScore: 88,
    aiMatchingSkills: ['Google Ads', 'GA4', 'RD Station', 'HubSpot', 'SEO'],
    aiMissingSkills: [],
    aiSummary: 'Aderência de 88%. Resultados comprovados em redução de CAC e gestão de orçamentos de mídia paga de R$ 150k/mês. Perfil analítico e orientado a dados.',
    screeningAnswers: [
      {
        questionId: 'q_6',
        question: 'Possui experiência com gestão de mídia paga B2B acima de R$ 30k/mês?',
        answer: 'Sim, gerenciei orçamentos de até R$ 150k/mês com foco em B2B.'
      }
    ]
  }
];

export const INITIAL_CHAT_THREADS: ChatThread[] = [
  {
    id: 'thread_1',
    jobId: 'job_1',
    jobTitle: 'Desenvolvedor Full Stack Senior',
    companyId: 'comp_1',
    companyName: 'Tech Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150',
    candidateId: 'cand_1',
    candidateName: 'Mariana Souza',
    candidatePhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    lastMessage: 'Olá Mariana, confirmamos sua entrevista técnica para sexta-feira às 14h!',
    lastMessageTime: 'Hoje às 10:45',
    unreadCountCandidate: 1,
    unreadCountCompany: 0
  },
  {
    id: 'thread_2',
    jobId: 'job_3',
    jobTitle: 'UX/UI Designer Senior',
    companyId: 'comp_2',
    companyName: 'Blue Soft',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=150',
    candidateId: 'cand_3',
    candidateName: 'Fernanda Lima',
    candidatePhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    lastMessage: 'Recebi a proposta comercial! Vou analisar os detalhes até amanhã, muito obrigada!',
    lastMessageTime: 'Ontem às 16:20',
    unreadCountCandidate: 0,
    unreadCountCompany: 0
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_1',
    threadId: 'thread_1',
    senderId: 'comp_1',
    senderType: 'company',
    senderName: 'Amanda Ribeiro (Tech Solutions)',
    senderAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150',
    text: 'Olá Mariana! Analisamos seu currículo via inteligência artificial e seu perfil teve um excelente score de aderência (94%) para nossa vaga de Desenvolvedor Full Stack Senior.',
    timestamp: 'Ontem às 14:10'
  },
  {
    id: 'msg_2',
    threadId: 'thread_1',
    senderId: 'cand_1',
    senderType: 'candidate',
    senderName: 'Mariana Souza',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    text: 'Fico muito feliz em saber, Amanda! Acompanho a Tech Solutions há algum tempo e tenho muito interesse na vaga.',
    timestamp: 'Ontem às 14:25'
  },
  {
    id: 'msg_3',
    threadId: 'thread_1',
    senderId: 'comp_1',
    senderType: 'company',
    senderName: 'Amanda Ribeiro (Tech Solutions)',
    senderAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150',
    text: 'Gostaríamos de agendar a entrevista de alinhamento com nosso Tech Lead.',
    timestamp: 'Hoje às 10:45',
    interviewInvite: {
      date: '24/02/2026',
      time: '14:00',
      platform: 'Google Meet',
      link: 'https://meet.google.com/rhc-tech-msouza'
    }
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'notif_1',
    recipientId: 'cand_1',
    recipientType: 'candidate',
    title: 'Entrevista Agendada!',
    message: 'A Tech Solutions agendou sua entrevista técnica para 24/02 às 14:00.',
    type: 'interview',
    read: false,
    timestamp: 'Hoje às 10:45'
  },
  {
    id: 'notif_2',
    recipientId: 'comp_1',
    recipientType: 'company',
    title: 'Nova Candidatura de Alto Match (94%)',
    message: 'Mariana Souza se candidatou para a vaga de Desenvolvedor Full Stack Senior com Score de 94%.',
    type: 'ai',
    read: true,
    timestamp: 'Ontem às 14:00'
  },
  {
    id: 'notif_3',
    recipientId: 'comp_4',
    recipientType: 'company',
    title: 'Teste Gratuito Expirando',
    message: 'Seu período de avaliação gratuita de 7 dias expira em 3 dias. Atualize seu plano para não perder o acesso.',
    type: 'plan',
    read: false,
    timestamp: 'Hoje às 08:00'
  }
];

export const INITIAL_INVOICES: FinancialInvoice[] = [
  {
    id: 'inv_101',
    companyId: 'comp_1',
    companyName: 'Tech Solutions',
    planName: 'Plano Premium (Anual)',
    amount: 599.00,
    date: '2026-02-01',
    dueDate: '2026-02-10',
    status: 'paid',
    invoicePdfUrl: '#'
  },
  {
    id: 'inv_102',
    companyId: 'comp_2',
    companyName: 'Blue Soft',
    planName: 'Plano Premium (Mensal)',
    amount: 599.00,
    date: '2026-02-05',
    dueDate: '2026-02-15',
    status: 'paid',
    invoicePdfUrl: '#'
  },
  {
    id: 'inv_103',
    companyId: 'comp_3',
    companyName: 'Grupo Prime',
    planName: 'Plano Mensal Corporativo',
    amount: 299.00,
    date: '2026-02-12',
    dueDate: '2026-02-22',
    status: 'paid',
    invoicePdfUrl: '#'
  }
];

export const INITIAL_ADMIN_METRICS: AdminMetrics = {
  totalCompanies: 148,
  totalCandidates: 3820,
  totalJobs: 215,
  totalHires: 642,
  mrr: 48500.00,
  activeSubscriptions: 124,
  trialConversionRate: 68.4,
  aiScansCount: 15420
};
