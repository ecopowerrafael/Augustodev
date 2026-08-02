import { 
  DiaristaProfile, 
  ClientProfile, 
  ServiceCategory, 
  ServiceBooking, 
  WalletTransaction, 
  SupportTicket, 
  AdminMetrics, 
  PlatformSettings 
} from '../types/aloDiaria';

export const INITIAL_CATEGORIES: ServiceCategory[] = [
  {
    id: 'cat-1',
    name: 'Diária Padrão',
    description: 'Limpeza geral completa, arrumação de quartos, banheiros, cozinha e salas.',
    iconName: 'Sparkles',
    basePrice: 160,
    popular: true
  },
  {
    id: 'cat-2',
    name: 'Faxina Pesada',
    description: 'Limpeza detalhada de azulejos, desengorduramento de fogão/coifa, vidros e rodapés.',
    iconName: 'Flame',
    basePrice: 220,
    popular: true
  },
  {
    id: 'cat-3',
    name: 'Passadeira de Roupas',
    description: 'Serviço dedicado a passar e organizar vestuário, camisas sociais e roupas de cama.',
    iconName: 'Shirt',
    basePrice: 140
  },
  {
    id: 'cat-4',
    name: 'Pós-Obra / Mudança',
    description: 'Remoção de resíduos leves de reforma, poeira de gesso e preparação de imóveis novos.',
    iconName: 'Home',
    basePrice: 280
  },
  {
    id: 'cat-5',
    name: 'Organização de Armários',
    description: 'Personal Organizer para dobrar, categorizar e otimizar closets e despensas.',
    iconName: 'Grid',
    basePrice: 180
  }
];

export const INITIAL_DIARISTAS: DiaristaProfile[] = [
  {
    id: 'dia-101',
    name: 'Maria das Graças Silva',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    phone: '(11) 98765-4321',
    email: 'maria.graca@email.com',
    cpf: '123.456.789-00',
    city: 'São Paulo',
    neighborhood: 'Moema',
    region: 'Zona Sul - SP',
    rating: 4.9,
    reviewsCount: 142,
    hourlyRate: 35,
    avgDailyRate: 180,
    experienceYears: 8,
    distanceKm: 1.8,
    bio: 'Profissional dedicada com 8 anos de experiência em limpezas residenciais e comerciais. Especialista em higienização profunda, cuido do seu lar com carinho e pontualidade.',
    specialties: ['Faxina Completa', 'Passadeira de Roupas', 'Cuidado com Pets', 'Organização de Armários'],
    documentsStatus: 'aprovado',
    completedJobsCount: 320,
    availableDays: ['Segunda', 'Terça', 'Quarta', 'Sexta', 'Sábado'],
    badges: ['Super Diarista', 'Identidade Verificada', 'Nota 5 Estrelas', 'Atendimento Emocional']
  },
  {
    id: 'dia-102',
    name: 'Luciana Aparecida Santos',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    phone: '(11) 97654-3210',
    email: 'luciana.santos@email.com',
    cpf: '234.567.890-11',
    city: 'São Paulo',
    neighborhood: 'Pinheiros',
    region: 'Zona Oeste - SP',
    rating: 4.8,
    reviewsCount: 98,
    hourlyRate: 32,
    avgDailyRate: 170,
    experienceYears: 5,
    distanceKm: 3.2,
    bio: 'Especialista em organização e limpeza pós-obra. Amante de animais de estimação e super cuidadosa com objetos delicados.',
    specialties: ['Faxina Pesada', 'Gosta de Pets', 'Limpeza de Vidros'],
    documentsStatus: 'aprovado',
    completedJobsCount: 185,
    availableDays: ['Segunda', 'Quarta', 'Quinta', 'Sexta'],
    badges: ['Verificada', 'Especialista Pós-Obra']
  },
  {
    id: 'dia-103',
    name: 'Cleide Regina de Oliveira',
    photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80',
    phone: '(11) 96543-2109',
    email: 'cleide.oliveira@email.com',
    cpf: '345.678.901-22',
    city: 'São Paulo',
    neighborhood: 'Vila Mariana',
    region: 'Zona Sul - SP',
    rating: 5.0,
    reviewsCount: 210,
    hourlyRate: 40,
    avgDailyRate: 200,
    experienceYears: 12,
    distanceKm: 2.5,
    bio: '12 anos de atuação em residências de alto padrão. Referências excelentes, foco em pontualidade e acabamento impecável.',
    specialties: ['Alto Padrão', 'Passagem de Roupas Finas', 'Personal Organizer'],
    documentsStatus: 'aprovado',
    completedJobsCount: 512,
    availableDays: ['Terça', 'Quarta', 'Quinta', 'Sábado'],
    badges: ['Top Avaliada', 'Veterana Dona Maria', 'Check Criminal Ok']
  },
  {
    id: 'dia-104',
    name: 'Sônia Maria Ribeiro',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    phone: '(11) 95432-1098',
    email: 'sonia.ribeiro@email.com',
    cpf: '456.789.012-33',
    city: 'São Paulo',
    neighborhood: 'Tatuapé',
    region: 'Zona Leste - SP',
    rating: 4.7,
    reviewsCount: 64,
    hourlyRate: 30,
    avgDailyRate: 150,
    experienceYears: 3,
    distanceKm: 4.1,
    bio: 'Atendimento rápido e eficiente. Muito caprichosa com cozinhas e sanitização de banheiros.',
    specialties: ['Limpeza Geral', 'Desinfecção', 'Cozinha Brilhando'],
    documentsStatus: 'em_analise',
    completedJobsCount: 92,
    availableDays: ['Segunda', 'Terça', 'Quinta', 'Sexta'],
    badges: ['Selo Segurança']
  }
];

export const INITIAL_CLIENT_PROFILE: ClientProfile = {
  id: 'cli-001',
  name: 'Ana Paula Rocha',
  email: 'anapaula.rocha@email.com',
  phone: '(11) 99887-6655',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  city: 'São Paulo',
  neighborhood: 'Moema',
  address: 'Alameda dos Maracatins, 1200 - Apt 82',
  hasPets: true,
  registeredAt: '2025-01-15',
  totalBookings: 14,
  preferredPaymentMethod: 'PIX Instantâneo'
};

export const INITIAL_BOOKINGS: ServiceBooking[] = [
  {
    id: 'SERV-8801',
    clientId: 'cli-001',
    clientName: 'Ana Paula Rocha',
    clientPhone: '(11) 99887-6655',
    clientAddress: 'Alameda dos Maracatins, 1200 - Apt 82',
    clientNeighborhood: 'Moema',
    diaristaId: 'dia-101',
    diaristaName: 'Maria das Graças Silva',
    diaristaPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    diaristaPhone: '(11) 98765-4321',
    serviceType: 'Diária Padrão',
    date: '2026-08-03',
    timeSlot: '08:00 - 16:00',
    rooms: { bedrooms: 2, bathrooms: 2, livingRooms: 1, kitchens: 1, balconies: 1 },
    hasPets: true,
    petNotes: 'Possuo um cachorro poodle muito dócil chamado Fred.',
    observations: 'Por favor, dar atenção especial ao box do banheiro e sacada.',
    estimatedHours: 8,
    baseValue: 180,
    platformFee: 20,
    totalValue: 200,
    paymentMethod: 'pix',
    paymentStatus: 'pago',
    status: 'em_atendimento',
    statusHistory: [
      { status: 'solicitado', timestamp: '2026-08-01 14:30', note: 'Solicitação criada pelo cliente' },
      { status: 'aceito', timestamp: '2026-08-01 15:05', note: 'Diarista Maria das Graças aceitou o agendamento' },
      { status: 'em_deslocamento', timestamp: '2026-08-03 07:30', note: 'Diarista a caminho do endereço' },
      { status: 'em_atendimento', timestamp: '2026-08-03 08:05', note: 'Check-in realizado no local. Diária iniciada!' }
    ]
  },
  {
    id: 'SERV-8790',
    clientId: 'cli-001',
    clientName: 'Ana Paula Rocha',
    clientPhone: '(11) 99887-6655',
    clientAddress: 'Alameda dos Maracatins, 1200 - Apt 82',
    clientNeighborhood: 'Moema',
    diaristaId: 'dia-103',
    diaristaName: 'Cleide Regina de Oliveira',
    diaristaPhoto: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80',
    diaristaPhone: '(11) 96543-2109',
    serviceType: 'Faxina Pesada',
    date: '2026-07-25',
    timeSlot: '08:00 - 17:00',
    rooms: { bedrooms: 2, bathrooms: 2, livingRooms: 1, kitchens: 1, balconies: 1 },
    hasPets: true,
    petNotes: 'Cão poodle dócil.',
    observations: 'Limpeza de azulejos e janelas de vidro.',
    estimatedHours: 9,
    baseValue: 220,
    platformFee: 25,
    totalValue: 245,
    paymentMethod: 'cartao',
    paymentStatus: 'pago',
    status: 'finalizado',
    statusHistory: [
      { status: 'solicitado', timestamp: '2026-07-23 09:10' },
      { status: 'aceito', timestamp: '2026-07-23 09:45' },
      { status: 'em_deslocamento', timestamp: '2026-07-25 07:40' },
      { status: 'em_atendimento', timestamp: '2026-07-25 08:00' },
      { status: 'finalizado', timestamp: '2026-07-25 17:10', note: 'Serviço concluído com excelência' }
    ],
    review: {
      rating: 5,
      comment: 'A Cleide é maravilhosa! Deixou os vidros e o azulejo da cozinha novinhos em folha. Recomendo de olhos fechados.',
      date: '2026-07-25 18:00',
      favorited: true
    }
  },
  {
    id: 'SERV-8805',
    clientId: 'cli-002',
    clientName: 'Roberto Mendes',
    clientPhone: '(11) 97711-2233',
    clientAddress: 'Rua Oscar Freire, 890 - Apt 41',
    clientNeighborhood: 'Jardins',
    diaristaId: 'dia-101',
    diaristaName: 'Maria das Graças Silva',
    diaristaPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    serviceType: 'Diária Padrão',
    date: '2026-08-05',
    timeSlot: '08:00 - 16:00',
    rooms: { bedrooms: 3, bathrooms: 3, livingRooms: 1, kitchens: 1, balconies: 2 },
    hasPets: false,
    observations: 'Foco na sala de estar e área gourmet.',
    estimatedHours: 8,
    baseValue: 190,
    platformFee: 22,
    totalValue: 212,
    paymentMethod: 'pix',
    paymentStatus: 'pago',
    status: 'aceito',
    statusHistory: [
      { status: 'solicitado', timestamp: '2026-08-02 10:00' },
      { status: 'aceito', timestamp: '2026-08-02 10:20', note: 'Aguardando data do serviço' }
    ]
  }
];

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'TRX-901',
    date: '2026-07-25',
    description: 'Diária Finalizada - Cliente Ana Paula Rocha (SERV-8790)',
    amount: 220,
    type: 'ganho',
    status: 'concluido'
  },
  {
    id: 'TRX-902',
    date: '2026-07-26',
    description: 'Transferência PIX para Conta Bancária Itaú',
    amount: -200,
    type: 'saque',
    status: 'concluido'
  },
  {
    id: 'TRX-903',
    date: '2026-07-29',
    description: 'Diária Finalizada - Cliente Carlos Eduardo',
    amount: 180,
    type: 'ganho',
    status: 'concluido'
  },
  {
    id: 'TRX-904',
    date: '2026-08-03',
    description: 'Diária em Andamento (Retido no App até término) - SERV-8801',
    amount: 180,
    type: 'ganho',
    status: 'pendente'
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'TK-101',
    userName: 'Juliana Ferreira',
    userRole: 'cliente',
    subject: 'Dúvida sobre remarcação de horário',
    status: 'em_andamento',
    date: '2026-08-02',
    priority: 'media'
  },
  {
    id: 'TK-102',
    userName: 'Sônia Maria Ribeiro',
    userRole: 'diarista',
    subject: 'Envio de comprovante de residência atualizado',
    status: 'aberto',
    date: '2026-08-02',
    priority: 'alta'
  },
  {
    id: 'TK-103',
    userName: 'Marcelo Rossi',
    userRole: 'cliente',
    subject: 'Solicitação de NF do serviço SERV-8750',
    status: 'resolvido',
    date: '2026-07-30',
    priority: 'baixa'
  }
];

export const INITIAL_ADMIN_METRICS: AdminMetrics = {
  totalClients: 1248,
  activeDiaristas: 186,
  completedServices: 3420,
  totalRevenue: 684000,
  platformCommissionTotal: 82080,
  monthlyGrowthPct: 18.4,
  pendingApprovals: 7,
  avgRating: 4.88
};

export const INITIAL_PLATFORM_SETTINGS: PlatformSettings = {
  platformCommissionPct: 12,
  minDailyPrice: 130,
  cancelFeeHours: 24,
  activeRegions: ['São Paulo - SP', 'Campinas - SP', 'Rio de Janeiro - RJ', 'Belo Horizonte - MG', 'Curitiba - PR'],
  acceptedPaymentMethods: ['PIX Instantâneo', 'Cartão de Crédito', 'Saldo de Créditos Dona Maria']
};
