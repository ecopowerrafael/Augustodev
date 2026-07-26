export interface TicketTier {
  id: string;
  eventId: string;
  name: string;
  price: number;
  serviceFee: number;
  available: number;
  total: number;
  benefits?: string[];
  maxPerBuyer: number;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  time: string;
  location: string;
  address: string;
  city: string;
  category: "Música" | "Gastronomia" | "Negócios" | "Festa" | "Teatro" | "Esportes" | "Cursos";
  minPrice: number;
  image: string;
  description: string;
  ageRating: string;
  organizerName: string;
  organizerCnpj: string;
  spaceName: string;
  attractions: string[];
  schedule: { time: string; title: string }[];
  isFeatured?: boolean;
  badge?: string;
  availabilityText: string;
  ticketTiers: TicketTier[];
  splitConfig: {
    spacePercent: number; // e.g. 20%
    operatorPercent: number; // e.g. 80%
    feeDistributionRule: "proportional" | "space_pays" | "operator_pays";
  };
}

export interface TicketParticipant {
  tierId: string;
  tierName: string;
  price: number;
  serviceFee: number;
  participantName: string;
  participantCpf: string;
  participantEmail: string;
  ticketCode: string;
  qrCodeUrl: string;
  status: "Válido" | "Utilizado" | "Cancelado";
  usedAt?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. PED-2026-008421
  createdAt: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  buyerName: string;
  buyerCpf: string;
  buyerEmail: string;
  buyerPhone: string;
  items: TicketParticipant[];
  subtotal: number;
  serviceFee: number;
  discount: number;
  grossTotal: number;
  paymentMethod: "pix" | "card";
  installments?: {
    count: number;
    installmentAmount: number;
    totalWithInterest: number;
    interestAmount: number;
  };
  paymentStatus: "Aguardando Pix" | "Em análise" | "Aprovado" | "Recusado" | "Expirado" | "Reembolsado";
  pixCode?: string;
  pixExpirationMinutes?: number;
  gatewayFee: number;
  netTotal: number;
  splitSpaceAmount: number;
  splitOperatorAmount: number;
  settlementStatus: "A receber" | "Liquidado" | "Em processamento";
  settlementDate?: string;
}

export interface Operator {
  id: string;
  name: string;
  companyName: string;
  cnpj: string;
  contactPerson: string;
  email: string;
  phone: string;
  receiverId: string;
  activeEventsCount: number;
  totalVolume: number;
  netAmount: number;
  receivables: number;
  settledAmount: number;
  status: "Ativo" | "Pendente" | "Bloqueado";
  registeredAt: string;
}

export interface Settlement {
  id: string;
  code: string; // e.g. LIQ-2026-00481
  eventName: string;
  beneficiaryName: string;
  beneficiaryType: "Espaço" | "Operador";
  amount: number;
  scheduledDate: string;
  status: "A receber" | "Liquidada" | "Em processamento" | "Retida" | "Cancelada";
}

export interface DREDay {
  date: string;
  salesCount: number;
  grossAmount: number;
  gatewayFees: number;
  netAmount: number;
  spaceShare: number;
  operatorShare: number;
}
