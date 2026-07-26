export type SmartphoneCondition = "Novo e Lacrado" | "Seminovo Premium" | "Seminovo Excelente";

export interface SmartphoneProduct {
  id: string;
  name: string;
  brand: "Apple" | "Samsung" | "Motorola" | "Xiaomi";
  storage: string;
  condition: SmartphoneCondition;
  cashPrice: number;
  installmentPrice: number;
  maxInstallments: number;
  installmentValue: number;
  badge: "Mais vendido" | "Oferta especial" | "Melhor custo-benefício" | "Seminovo selecionado" | "Oferta da semana" | "Últimas unidades";
  badgeColor: string;
  imageUrl: string;
  colors: string[];
  specs: string[];
  inStock: boolean;
  warranty: string;
}

export interface TradeInValuation {
  brand: string;
  model: string;
  storage: string;
  screenCondition: "Sem riscos" | "Marcas leves" | "Trincada / Danificada";
  batteryCondition: "Acima de 80%" | "Abaixo de 80%";
  isWorking: boolean;
  hasBox: boolean;
  hasInvoice: boolean;
  notes?: string;
  estimatedValuationMin?: number;
  estimatedValuationMax?: number;
}

export interface LeadFormData {
  fullName: string;
  email: string;
  whatsapp: string;
  desiredSmartphone: string;
  preferredBrand: string;
  desiredStorage: string;
  conditionPreference: "Novo" | "Seminovo" | "Tanto faz";
  priceRange: "Até R$ 1.500" | "De R$ 1.500 a R$ 2.500" | "De R$ 2.500 a R$ 4.000" | "De R$ 4.000 a R$ 6.000" | "Acima de R$ 6.000" | "Ainda não defini";
  paymentMethod: "Pix" | "Cartão à vista" | "Cartão parcelado" | "Quero consultar as opções";
  hasTradeIn: boolean;
  tradeInDetails?: TradeInValuation;
  observations: string;
  consent: boolean;
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatarUrl: string;
  verified: boolean;
  date: string;
  purchasedModel: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StoreInfo {
  name: string;
  slogan: string;
  complementaryText: string;
  logoUrl: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  phone: string;
  whatsapp: string;
  whatsappDisplay: string;
  hoursWeekdays: string;
  hoursSaturday: string;
  hoursSunday: string;
  ratingScore: number;
  reviewCount: number;
}
