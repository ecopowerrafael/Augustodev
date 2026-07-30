export type UserRole = 'administrator' | 'operator';

export type ChargeStatus = 
  | 'agendada'
  | 'a_vencer'
  | 'vence_hoje'
  | 'vencida'
  | 'mensagem_enviada'
  | 'aguardando_pagamento'
  | 'paga'
  | 'cancelada'
  | 'renegociada'
  | 'envio_falha';

export type RecurrenceType = 
  | 'unica'
  | 'semanal'
  | 'quinzenal'
  | 'mensal'
  | 'bimestral'
  | 'trimestral'
  | 'semestral'
  | 'anual'
  | 'parcelada';

export type PaymentMethod = 'pix' | 'boleto' | 'cartao_credito' | 'transferencia' | 'dinheiro';

export interface Client {
  id: string;
  fullName: string;
  companyName?: string;
  cpfCnpj: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  notes?: string;
  status: 'active' | 'inactive';
  totalChargesCount: number;
  pendingAmount: number;
  lastContactDate?: string;
}

export interface Charge {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientWhatsapp: string;
  clientCpfCnpj?: string;
  description: string;
  amount: number;
  dueDate: string; // YYYY-MM-DD
  preferredSendTime: string; // HH:mm
  installmentCurrent?: number;
  installmentTotal?: number;
  paymentMethod: PaymentMethod;
  paymentLink?: string;
  pixKey?: string;
  pixCopiaCola?: string;
  notes?: string;
  status: ChargeStatus;
  templateId?: string;
  autoSendEnabled: boolean;
  recurrence: RecurrenceType;
  paidAt?: string;
  paidAmount?: number;
  paymentProofUrl?: string;
  paymentNotes?: string;
  createdAt: string;
}

export interface MessageTemplate {
  id: string;
  title: string;
  triggerEvent: '7_dias_antes' | '3_dias_antes' | '1_dia_antes' | 'dia_vencimento' | '1_dia_depois' | '3_dias_depois' | '7_dias_depois' | 'agradecimento_pagamento';
  content: string;
  isDefault: boolean;
  isActive: boolean;
}

export interface DispatchLog {
  id: string;
  chargeId: string;
  clientName: string;
  whatsappNumber: string;
  messageContent: string;
  sentAt: string;
  status: 'programada' | 'processando' | 'enviada' | 'entregue' | 'lida' | 'falha' | 'cancelada';
  failureReason?: string;
  attempts: number;
  sentBy: string; // 'Automático' or operator name
  triggerType: 'automático' | 'manual';
}

export interface CompanySettings {
  name: string;
  cnpj: string;
  logoUrl?: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  pixKey: string;
  bankInfo: string;
  attendantName: string;
  workingHours: string;
  messageSignature: string;
}

export interface WhatsappConnection {
  status: 'connected' | 'disconnected' | 'connecting' | 'qr_ready';
  phoneNumber: string;
  instanceName: string;
  tokenKey: string;
  lastPingAt: string;
  dailySentCount: number;
  dailyLimit: number;
}

export interface AutomationRule {
  id: string;
  name: string;
  daysOffset: number; // -7 (before), 0 (day of), +3 (after)
  templateId: string;
  isActive: boolean;
  sendTime: string; // e.g. "09:00"
}
