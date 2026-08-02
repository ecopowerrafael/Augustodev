export type UserRole = 'cliente' | 'diarista' | 'admin';

export type ClientTab = 'home' | 'buscar' | 'agendamentos' | 'historico' | 'perfil';
export type DiaristaTab = 'dashboard' | 'solicitacoes' | 'agenda' | 'servico_ativo' | 'carteira' | 'historico' | 'perfil_publico' | 'cadastro_status';
export type AdminTab = 'dashboard' | 'clientes' | 'diaristas' | 'servicos' | 'financeiro' | 'comissoes' | 'avaliacoes' | 'atendimento' | 'relatorios' | 'configuracoes';

export type ServiceStatus = 'solicitado' | 'aceito' | 'em_deslocamento' | 'em_atendimento' | 'finalizado' | 'cancelado';

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  basePrice: number;
  popular?: boolean;
}

export interface DiaristaProfile {
  id: string;
  name: string;
  photoUrl: string;
  phone: string;
  email: string;
  cpf: string;
  city: string;
  neighborhood: string;
  region: string;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;
  avgDailyRate: number;
  experienceYears: number;
  distanceKm: number;
  bio: string;
  specialties: string[];
  documentsStatus: 'aprovado' | 'em_analise' | 'pendente';
  completedJobsCount: number;
  availableDays: string[];
  badges: string[];
}

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  photoUrl: string;
  city: string;
  neighborhood: string;
  address: string;
  hasPets: boolean;
  registeredAt: string;
  totalBookings: number;
  preferredPaymentMethod: string;
}

export interface RoomDetails {
  bedrooms: number;
  bathrooms: number;
  livingRooms: number;
  kitchens: number;
  balconies: number;
}

export interface ServiceBooking {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  clientNeighborhood: string;
  diaristaId?: string;
  diaristaName?: string;
  diaristaPhoto?: string;
  diaristaPhone?: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  rooms: RoomDetails;
  hasPets: boolean;
  petNotes?: string;
  observations?: string;
  estimatedHours: number;
  baseValue: number;
  platformFee: number;
  totalValue: number;
  paymentMethod: 'pix' | 'cartao' | 'saldo';
  paymentStatus: 'pago' | 'pendente';
  status: ServiceStatus;
  statusHistory: {
    status: ServiceStatus;
    timestamp: string;
    note?: string;
  }[];
  review?: {
    rating: number;
    comment: string;
    date: string;
    favorited: boolean;
  };
}

export interface SupportTicket {
  id: string;
  userName: string;
  userRole: 'cliente' | 'diarista';
  subject: string;
  status: 'aberto' | 'em_andamento' | 'resolvido';
  date: string;
  priority: 'baixa' | 'media' | 'alta';
}

export interface WalletTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'ganho' | 'saque' | 'taxa';
  status: 'concluido' | 'pendente';
}

export interface AdminMetrics {
  totalClients: number;
  activeDiaristas: number;
  completedServices: number;
  totalRevenue: number;
  platformCommissionTotal: number;
  monthlyGrowthPct: number;
  pendingApprovals: number;
  avgRating: number;
}

export interface PlatformSettings {
  platformCommissionPct: number;
  minDailyPrice: number;
  cancelFeeHours: number;
  activeRegions: string[];
  acceptedPaymentMethods: string[];
}
