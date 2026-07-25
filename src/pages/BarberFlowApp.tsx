import React, { useState } from "react";
import {
  Scissors, Calendar, Clock, User, Users, DollarSign, Award, Star,
  TrendingUp, CheckCircle2, AlertCircle, ShoppingBag, MapPin, Phone,
  Mail, Settings, LogOut, Search, Plus, Filter, ArrowLeft, ChevronRight,
  Shield, Check, X, RefreshCw, Smartphone, Sparkles, MessageSquare,
  Gift, Percent, FileText, ChevronDown, Eye, Edit3, Trash2, ArrowUpRight,
  PieChart as PieIcon, BarChart3, Bell, ThumbsUp, Heart, Share2,
  CalendarDays, Crown, Navigation, CheckCircle, ExternalLink, SlidersHorizontal,
  Download, Printer, QrCode, Sparkle
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from "recharts";

interface BarberFlowAppProps {
  onBack?: () => void;
}

// ==========================================
// DATA INTERFACES
// ==========================================
interface ServiceItem {
  id: string;
  name: string;
  category: "Cabelo" | "Barba" | "Combo" | "Estética";
  durationMinutes: number;
  price: number;
  commissionPercent: number;
  image: string;
  description?: string;
  isPopular?: boolean;
}

interface BarberTeam {
  id: string;
  name: string;
  role: string;
  unit: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  specialties: string[];
  monthlyServicesCount: number;
  monthlyRevenue: number;
  monthlyCommission: number;
  status: "Disponível" | "Em atendimento" | "Pausa" | "Indisponível";
  nextSlot?: string;
}

interface ClientRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  category: "VIP" | "Frequente" | "Regular" | "Novo";
  lastVisit: string;
  totalSpent: number;
  visitsCount: number;
  points: number;
  favoriteBarber: string;
  notes: string;
}

interface Appointment {
  id: string;
  time: string;
  date: string;
  clientName: string;
  clientPhone: string;
  clientAvatar?: string;
  barberName: string;
  serviceName: string;
  unit: string;
  price: number;
  durationMinutes: number;
  status: "Confirmado" | "Aguardando confirmação" | "Cliente chegou" | "Em atendimento" | "Finalizado" | "Cancelado";
  notes?: string;
  isLunch?: boolean;
  isEmptySlot?: boolean;
  paymentMethod?: string;
}

interface ProductItem {
  id: string;
  name: string;
  stock: number;
  minStock: number;
  costPrice: number;
  salePrice: number;
  image: string;
  status: "Normal" | "Estoque baixo" | "Crítico";
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: "Receita" | "Despesa";
  category: "Serviços" | "Produtos" | "Comissões" | "Insumos" | "Aluguel / Utilities";
  amount: number;
  paymentMethod: string;
}

interface Coupon {
  id: string;
  code: string;
  discount: string;
  minSpent: number;
  usesCount: number;
  status: "Ativo" | "Expirado";
}

interface CustomerReview {
  id: string;
  clientName: string;
  clientAvatar: string;
  barberName: string;
  rating: number;
  date: string;
  comment: string;
  reply?: string;
}

// ==========================================
// INITIAL MOCK DATASETS
// ==========================================
const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "s-1",
    name: "Corte Masculino Premium",
    category: "Cabelo",
    durationMinutes: 40,
    price: 55,
    commissionPercent: 40,
    description: "Corte moderno com técnica em tesoura e máquina, degradê (fade) personalizado e lavagem com shampoo revigorante.",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80",
    isPopular: true
  },
  {
    id: "s-2",
    name: "Combo Imperial (Corte + Barba)",
    category: "Combo",
    durationMinutes: 60,
    price: 95,
    commissionPercent: 40,
    description: "O ritual definitivo do homem moderno. Corte completo + barba terapia com toalha quente, óleos essenciais e massagem facial.",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80",
    isPopular: true
  },
  {
    id: "s-3",
    name: "Barba Terapia com Toalha Quente",
    category: "Barba",
    durationMinutes: 30,
    price: 45,
    commissionPercent: 40,
    description: "Alinhamento de barba com navalhete tradicional, aplicação de vapor de ozônio, toalha quente aromática e balm hidratante.",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80",
    isPopular: false
  },
  {
    id: "s-4",
    name: "Corte Infantil Stylist",
    category: "Cabelo",
    durationMinutes: 35,
    price: 45,
    commissionPercent: 35,
    description: "Atendimento paciencioso para os pequenos cavaleiros, com cadeira temática, desenho com máquina e brinde especial.",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80",
    isPopular: false
  },
  {
    id: "s-5",
    name: "Pigmentação de Barba & Alinhamento",
    category: "Estética",
    durationMinutes: 45,
    price: 70,
    commissionPercent: 35,
    description: "Técnica de preenchimento de falhas na barba com tinta hipoalergênica de longa duração e contorno milimétrico.",
    image: "https://images.unsplash.com/photo-1517832606589-7150a6d82823?auto=format&fit=crop&w=600&q=80",
    isPopular: false
  },
  {
    id: "s-6",
    name: "Sobrancelha Navalhada & Acabamento",
    category: "Estética",
    durationMinutes: 15,
    price: 25,
    commissionPercent: 30,
    description: "Design e limpeza das sobrancelhas masculinas respeitando a anatomia natural do rosto.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    isPopular: false
  },
];

const INITIAL_BARBERS: BarberTeam[] = [
  {
    id: "b-1",
    name: "Lucas Almeida",
    role: "Barbeiro Sênior & Master",
    unit: "Unidade Centro",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviewsCount: 386,
    specialties: ["Cortes Modernos", "Degradê Navalhado", "Barba Terapia"],
    monthlyServicesCount: 124,
    monthlyRevenue: 8420,
    monthlyCommission: 3368,
    status: "Disponível",
    nextSlot: "Hoje às 15:00"
  },
  {
    id: "b-2",
    name: "Bruno Costa",
    role: "Especialista em Lâmina Clássica",
    unit: "Unidade Centro",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviewsCount: 294,
    specialties: ["Cortes Clássicos", "Pompadour", "Pigmentação"],
    monthlyServicesCount: 116,
    monthlyRevenue: 7890,
    monthlyCommission: 3156,
    status: "Em atendimento",
    nextSlot: "Hoje às 16:30"
  },
  {
    id: "b-3",
    name: "Diego Martins",
    role: "Designer de Barba & Visagista",
    unit: "Unidade Campolim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    rating: 5.0,
    reviewsCount: 412,
    specialties: ["Barba Sculpting", "Desenhos Freestyle", "Acabamento"],
    monthlyServicesCount: 98,
    monthlyRevenue: 6740,
    monthlyCommission: 2696,
    status: "Disponível",
    nextSlot: "Amanhã às 10:00"
  },
  {
    id: "b-4",
    name: "Felipe Rocha",
    role: "Barbeiro Stylist",
    unit: "Unidade Zona Norte",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviewsCount: 180,
    specialties: ["Corte Social", "Barba Express", "Sobrancelha"],
    monthlyServicesCount: 87,
    monthlyRevenue: 5980,
    monthlyCommission: 2093,
    status: "Pausa",
    nextSlot: "Hoje às 18:10"
  },
];

const INITIAL_CLIENTS: ClientRecord[] = [
  {
    id: "c-1",
    name: "Marcelo Oliveira",
    phone: "(15) 99988-7744",
    email: "marcelo.oliveira@email.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    category: "VIP",
    lastVisit: "12/07/2026",
    totalSpent: 1245,
    visitsCount: 16,
    points: 320,
    favoriteBarber: "Lucas Almeida",
    notes: "Prefere máquina 1 baixa nas laterais, tesoura no topo e barba alinhada com navalha. Sensível a pós-barba com álcool. Gosta de café expresso sem açúcar."
  },
  {
    id: "c-2",
    name: "André Santos",
    phone: "(15) 99876-4412",
    email: "andre.santos@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    category: "Frequente",
    lastVisit: "24/07/2026",
    totalSpent: 680,
    visitsCount: 9,
    points: 145,
    favoriteBarber: "Bruno Costa",
    notes: "Gosta de cerveja artesanal IPA bem gelada. Atendimento dinâmico para reuniões de trabalho."
  },
  {
    id: "c-3",
    name: "Gustavo Pereira",
    phone: "(15) 99745-1188",
    email: "gustavo@email.com",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    category: "Regular",
    lastVisit: "24/07/2026",
    totalSpent: 410,
    visitsCount: 6,
    points: 85,
    favoriteBarber: "Diego Martins",
    notes: "Trás o filho de 8 anos para cortar junto na cadeira ao lado."
  },
  {
    id: "c-4",
    name: "Thiago Lima",
    phone: "(15) 99662-9031",
    email: "thiago.lima@email.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    category: "Novo",
    lastVisit: "18/07/2026",
    totalSpent: 235,
    visitsCount: 4,
    points: 42,
    favoriteBarber: "Felipe Rocha",
    notes: "Gosta de agendar nas sextas no horário pós-expediente."
  },
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "a-1",
    time: "09:00",
    date: "2026-07-24",
    clientName: "Marcelo Oliveira",
    clientPhone: "(15) 99988-7744",
    clientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    barberName: "Lucas Almeida",
    serviceName: "Combo Imperial (Corte + Barba)",
    unit: "Unidade Centro",
    price: 95,
    durationMinutes: 60,
    status: "Finalizado",
    notes: "Atendimento concluído. Cliente pagou via Pix e avaliou 5 estrelas."
  },
  {
    id: "a-2",
    time: "10:15",
    date: "2026-07-24",
    clientName: "André Santos",
    clientPhone: "(15) 99876-4412",
    clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    barberName: "Bruno Costa",
    serviceName: "Corte Masculino Premium",
    unit: "Unidade Centro",
    price: 55,
    durationMinutes: 40,
    status: "Cliente chegou",
    notes: "Aguardando na recepção tomando cerveja IPA."
  },
  {
    id: "a-3",
    time: "11:15",
    date: "2026-07-24",
    clientName: "Gustavo Pereira",
    clientPhone: "(15) 99745-1188",
    clientAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    barberName: "Diego Martins",
    serviceName: "Barba Terapia com Toalha Quente",
    unit: "Unidade Centro",
    price: 45,
    durationMinutes: 30,
    status: "Em atendimento",
    notes: "Cadeira #2 em processo de alinhamento."
  },
  {
    id: "a-lunch",
    time: "12:15",
    date: "2026-07-24",
    clientName: "Intervalo para Almoço",
    clientPhone: "",
    barberName: "Lucas Almeida",
    serviceName: "Pausa Operacional",
    unit: "Unidade Centro",
    price: 0,
    durationMinutes: 45,
    status: "Finalizado",
    isLunch: true
  },
  {
    id: "a-4",
    time: "13:30",
    date: "2026-07-24",
    clientName: "Thiago Lima",
    clientPhone: "(15) 99662-9031",
    clientAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    barberName: "Felipe Rocha",
    serviceName: "Corte Infantil Stylist",
    unit: "Unidade Centro",
    price: 45,
    durationMinutes: 35,
    status: "Confirmado",
    notes: "Confirmado via WhatsApp automático."
  },
  {
    id: "a-5",
    time: "15:00",
    date: "2026-07-24",
    clientName: "Marcelo Oliveira",
    clientPhone: "(15) 99988-7744",
    clientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    barberName: "Lucas Almeida",
    serviceName: "Combo Imperial (Corte + Barba)",
    unit: "Unidade Centro",
    price: 95,
    durationMinutes: 60,
    status: "Confirmado",
    notes: "Próximo atendimento em destaque! Cliente VIP com preferência de hidratação pós-corte."
  },
];

const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: "p-1",
    name: "Pomada Modeladora Matte Premium (100g)",
    stock: 7,
    minStock: 10,
    costPrice: 18,
    salePrice: 35,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80",
    status: "Estoque baixo"
  },
  {
    id: "p-2",
    name: "Óleo Hidratante Barba & Bigode (30ml)",
    stock: 18,
    minStock: 8,
    costPrice: 22,
    salePrice: 45,
    image: "https://images.unsplash.com/photo-1608248597260-94943f730248?auto=format&fit=crop&w=400&q=80",
    status: "Normal"
  },
  {
    id: "p-3",
    name: "Shampoo Fortificante & Antiqueda (250ml)",
    stock: 14,
    minStock: 6,
    costPrice: 16,
    salePrice: 32,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80",
    status: "Normal"
  },
  {
    id: "p-4",
    name: "Balm Pós-Barba Refrescante Mentol (120g)",
    stock: 4,
    minStock: 8,
    costPrice: 20,
    salePrice: 42,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80",
    status: "Crítico"
  },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "t-1", date: "24/07/2026", description: "Atendimento Combo Imperial - Marcelo", type: "Receita", category: "Serviços", amount: 95, paymentMethod: "Pix" },
  { id: "t-2", date: "24/07/2026", description: "Venda 2x Pomada Matte - André", type: "Receita", category: "Produtos", amount: 70, paymentMethod: "Cartão de Crédito" },
  { id: "t-3", date: "23/07/2026", description: "Compra de Insumos (Toalhas & Lâminas)", type: "Despesa", category: "Insumos", amount: 320, paymentMethod: "Transferência" },
  { id: "t-4", date: "22/07/2026", description: "Pagamento Comissão Semanal Lucas", type: "Despesa", category: "Comissões", amount: 840, paymentMethod: "Pix" },
];

const INITIAL_COUPONS: Coupon[] = [
  { id: "cp-1", code: "PRIMEIRA_VEZ", discount: "20% OFF", minSpent: 50, usesCount: 42, status: "Ativo" },
  { id: "cp-2", code: "IMPERIAL_VIP", discount: "R$ 15 OFF", minSpent: 90, usesCount: 18, status: "Ativo" },
  { id: "cp-3", code: "SEGUNDA_CORTE", discount: "15% OFF", minSpent: 40, usesCount: 30, status: "Ativo" },
];

const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: "r-1",
    clientName: "Marcelo Oliveira",
    clientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    barberName: "Lucas Almeida",
    rating: 5,
    date: "20/07/2026",
    comment: "Atendimento impecável! O Lucas domina a barba terapia com toalha quente. A recepção com cerveja artesanal e café expresso de alta qualidade é diferenciada demais.",
    reply: "Obrigado Marcelo! É sempre uma honra recebê-lo na Barbearia Imperial."
  },
  {
    id: "r-2",
    clientName: "André Santos",
    clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    barberName: "Bruno Costa",
    rating: 5,
    date: "18/07/2026",
    comment: "Corte rápido, preciso e muito elegante. Agendamento pelo site funcionou em 30 segundos. Pontualidade nota 10!",
  },
  {
    id: "r-3",
    clientName: "Gustavo Pereira",
    clientAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    barberName: "Diego Martins",
    rating: 5,
    date: "15/07/2026",
    comment: "Lugar sensacional. O Diego deixou minha barba perfeita antes da minha apresentação da empresa.",
  }
];

const GALLERY_PHOTOS = [
  { id: "g-1", title: "Fade Navalhado Baixo & Skin Fade", barber: "Lucas Almeida", img: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80" },
  { id: "g-2", title: "Barba Modelada & Toalha Quente", barber: "Diego Martins", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80" },
  { id: "g-3", title: "Corte Clássico Executive Side Part", barber: "Bruno Costa", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80" },
  { id: "g-4", title: "Pompadour Moderno Textured Crop", barber: "Felipe Rocha", img: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80" },
];

export default function BarberFlowApp({ onBack }: BarberFlowAppProps) {
  // Mode State: Admin vs Barber Mobile vs Client Mobile vs Public Web
  const [activeRole, setActiveRole] = useState<"admin" | "barber_mobile" | "client_mobile" | "public_booking">("public_booking");

  // Mobile Barber Tab Navigation State
  const [barberTab, setBarberTab] = useState<"home" | "agenda" | "clients" | "earnings" | "profile">("home");

  // Mobile Client Tab Navigation State
  const [clientTab, setClientTab] = useState<"home" | "booking" | "history" | "loyalty" | "profile">("home");

  // Backoffice Admin Menu Navigation
  const [adminMenu, setAdminMenu] = useState<
    "dashboard" | "agenda" | "new_appointment" | "clients" | "team" | "services" | "finance" | "commissions" | "products" | "loyalty" | "reviews" | "reports" | "units" | "settings"
  >("dashboard");

  // Barber Status State
  const [barberStatus, setBarberStatus] = useState<"Disponível" | "Em atendimento" | "Pausa" | "Indisponível">("Disponível");

  // Selected Day State for Agenda (YYYY-MM-DD)
  const [selectedDayDate, setSelectedDayDate] = useState<string>("2026-07-24");

  // Selected Appointment Sheet Modal State
  const [selectedAppointmentModal, setSelectedAppointmentModal] = useState<Appointment | null>(null);

  // App Core Datasets State
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [clients, setClients] = useState<ClientRecord[]>(INITIAL_CLIENTS);
  const [barbers, setBarbers] = useState<BarberTeam[]>(INITIAL_BARBERS);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);

  // Booking Wizard State
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [bookUnit, setBookUnit] = useState<string>("Unidade Centro");
  const [bookService, setBookService] = useState<ServiceItem>(INITIAL_SERVICES[1]); // Combo Imperial
  const [bookBarber, setBookBarber] = useState<BarberTeam>(INITIAL_BARBERS[0]); // Lucas Almeida
  const [bookDate, setBookDate] = useState<string>("2026-07-24");
  const [bookTime, setBookTime] = useState<string>("15:00");
  const [bookClientName, setBookClientName] = useState<string>("Marcelo Oliveira");
  const [bookClientPhone, setBookClientPhone] = useState<string>("(15) 99988-7744");
  const [bookClientEmail, setBookClientEmail] = useState<string>("marcelo@email.com");
  const [bookNotes, setBookNotes] = useState<string>("");
  const [bookPaymentMethod, setBookPaymentMethod] = useState<string>("Pagar no local");

  // Public Booking Success Modal State
  const [publicBookingSuccessAppt, setPublicBookingSuccessAppt] = useState<Appointment | null>(null);

  // Admin Modals Visibility
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showAddBarberModal, setShowAddBarberModal] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);

  // Form Temp States
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientCategory, setNewClientCategory] = useState<ClientRecord["category"]>("Novo");
  const [newClientNotes, setNewClientNotes] = useState("");

  const [newBarberName, setNewBarberName] = useState("");
  const [newBarberRole, setNewBarberRole] = useState("Barbeiro Stylist");
  const [newBarberUnit, setNewBarberUnit] = useState("Unidade Centro");
  const [newBarberCommission, setNewBarberCommission] = useState(40);

  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceCategory, setNewServiceCategory] = useState<ServiceItem["category"]>("Cabelo");
  const [newServicePrice, setNewServicePrice] = useState(50);
  const [newServiceDuration, setNewServiceDuration] = useState(30);

  const [newProdName, setNewProdName] = useState("");
  const [newProdCost, setNewProdCost] = useState(20);
  const [newProdPrice, setNewProdPrice] = useState(40);
  const [newProdStock, setNewProdStock] = useState(15);

  const [newTxDesc, setNewTxDesc] = useState("");
  const [newTxAmount, setNewTxAmount] = useState(100);
  const [newTxType, setNewTxType] = useState<"Receita" | "Despesa">("Receita");

  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState("15% OFF");

  // Client Search & Category Filters State
  const [clientSearchQuery, setClientSearchQuery] = useState("");
  const [clientCategoryFilter, setClientCategoryFilter] = useState("Todos");

  // Public Web Service Category Filter
  const [publicServiceCategoryFilter, setPublicServiceCategoryFilter] = useState("Todos");

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Complete Booking Flow Handler
  const handleCompleteBooking = () => {
    const newAppt: Appointment = {
      id: `a-${Date.now()}`,
      time: bookTime,
      date: bookDate,
      clientName: bookClientName || "Cliente Convidado",
      clientPhone: bookClientPhone || "(15) 99999-0000",
      clientAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      barberName: bookBarber.name,
      serviceName: bookService.name,
      unit: bookUnit,
      price: bookService.price,
      durationMinutes: bookService.durationMinutes,
      status: "Confirmado",
      notes: bookNotes || "Agendamento realizado via plataforma.",
      paymentMethod: bookPaymentMethod
    };

    setAppointments([newAppt, ...appointments]);
    showToast(`✨ Agendamento confirmado para ${newAppt.clientName} às ${bookTime}!`);
    
    // Redirect to success modal or history
    if (activeRole === "public_booking") {
      setPublicBookingSuccessAppt(newAppt);
    } else if (activeRole === "client_mobile") {
      setClientTab("history");
    } else if (activeRole === "admin") {
      setAdminMenu("agenda");
    }
  };

  // Status Change Handler for Appointment Modal
  const handleUpdateApptStatus = (apptId: string, newStatus: Appointment["status"]) => {
    setAppointments(appointments.map(a => a.id === apptId ? { ...a, status: newStatus } : a));
    if (selectedAppointmentModal && selectedAppointmentModal.id === apptId) {
      setSelectedAppointmentModal({ ...selectedAppointmentModal, status: newStatus });
    }
    showToast(`Status atualizado para '${newStatus}'`);
  };

  // Quick Stock Adjustment
  const handleAdjustStock = (prodId: string, delta: number) => {
    setProducts(products.map(p => {
      if (p.id === prodId) {
        const nextStock = Math.max(0, p.stock + delta);
        const status = nextStock <= p.minStock / 2 ? "Crítico" : nextStock <= p.minStock ? "Estoque baixo" : "Normal";
        return { ...p, stock: nextStock, status };
      }
      return p;
    }));
    showToast("Estoque do produto atualizado!");
  };

  // Add Client Handler
  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName) return;
    const newC: ClientRecord = {
      id: `c-${Date.now()}`,
      name: newClientName,
      phone: newClientPhone || "(15) 99999-0000",
      email: newClientEmail || "cliente@email.com",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      category: newClientCategory,
      lastVisit: "Hoje",
      totalSpent: 0,
      visitsCount: 1,
      points: 20,
      favoriteBarber: "Qualquer Barbeiro",
      notes: newClientNotes || "Novo cliente cadastrado no sistema."
    };
    setClients([newC, ...clients]);
    setShowAddClientModal(false);
    setNewClientName("");
    setNewClientPhone("");
    setNewClientEmail("");
    showToast(`Cliente ${newC.name} cadastrado com sucesso!`);
  };

  // Add Barber Handler
  const handleAddBarber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBarberName) return;
    const newB: BarberTeam = {
      id: `b-${Date.now()}`,
      name: newBarberName,
      role: newBarberRole,
      unit: newBarberUnit,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      rating: 5.0,
      reviewsCount: 1,
      specialties: ["Corte Moderno", "Barba Terapia"],
      monthlyServicesCount: 0,
      monthlyRevenue: 0,
      monthlyCommission: 0,
      status: "Disponível",
      nextSlot: "Hoje às 16:00"
    };
    setBarbers([...barbers, newB]);
    setShowAddBarberModal(false);
    setNewBarberName("");
    showToast(`Barbeiro ${newB.name} adicionado à equipe!`);
  };

  // Add Service Handler
  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName) return;
    const newS: ServiceItem = {
      id: `s-${Date.now()}`,
      name: newServiceName,
      category: newServiceCategory,
      price: newServicePrice,
      durationMinutes: newServiceDuration,
      commissionPercent: 40,
      description: "Serviço profissional de alta precisão com produtos premium.",
      image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80"
    };
    setServices([...services, newS]);
    setShowAddServiceModal(false);
    setNewServiceName("");
    showToast(`Serviço '${newS.name}' adicionado ao catálogo!`);
  };

  // Add Product Handler
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName) return;
    const newP: ProductItem = {
      id: `p-${Date.now()}`,
      name: newProdName,
      costPrice: newProdCost,
      salePrice: newProdPrice,
      stock: newProdStock,
      minStock: 5,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80",
      status: newProdStock <= 5 ? "Estoque baixo" : "Normal"
    };
    setProducts([...products, newP]);
    setShowAddProductModal(false);
    setNewProdName("");
    showToast(`Produto '${newP.name}' adicionado ao estoque!`);
  };

  // Chart Datasets
  const dailyRevenueData = [
    { day: "Seg", val: 1420 },
    { day: "Ter", val: 1680 },
    { day: "Qua", val: 1570 },
    { day: "Qui", val: 1930 },
    { day: "Sex", val: 2184 },
    { day: "Sáb", val: 3420 },
    { day: "Dom", val: 850 },
  ];

  const appointmentStatusPie = [
    { name: "Confirmados", value: 26, color: "#1F8A5B" },
    { name: "Aguardando", value: 3, color: "#D89A27" },
    { name: "Cancelados", value: 2, color: "#C94A4A" },
    { name: "Não Compareceu", value: 1, color: "#64748B" },
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-[#F4EFE8] font-sans antialiased selection:bg-[#B9854F]/30 selection:text-[#E4D5C3] relative pb-20">
      
      {/* FLOATING TOAST NOTIFICATION BANNER */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-gradient-to-r from-[#B9854F] to-[#C8A15A] text-black font-black text-xs px-5 py-3.5 rounded-2xl shadow-[0_10px_30px_rgba(185,133,79,0.5)] border border-[#F4EFE8]/30 flex items-center space-x-2 animate-bounce">
          <Sparkles className="h-4 w-4 text-black" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP SYSTEM BAR & APP ROLE SWITCHER */}
      <header className="sticky top-0 z-40 bg-[#202020]/95 backdrop-blur-2xl border-b border-white/10 px-4 md:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-start">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/10 flex items-center space-x-1.5 text-xs font-bold cursor-pointer"
              title="Voltar ao Portfólio Augusto Dev"
            >
              <ArrowLeft className="h-4 w-4 text-[#C8A15A]" />
              <span className="hidden sm:inline">Portfólio</span>
            </button>
          )}

          {/* BRAND LOGO WITH BARBERSHOP IDENTITY */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setActiveRole("public_booking")}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5A3928] via-[#B9854F] to-[#C8A15A] p-0.5 shadow-[0_0_20px_rgba(200,161,90,0.3)]">
              <div className="w-full h-full bg-[#141414] rounded-[14px] flex items-center justify-center">
                <Scissors className="h-5 w-5 text-[#C8A15A]" />
              </div>
            </div>
            <div>
              <span className="font-serif font-black text-base tracking-wide text-white uppercase block leading-none">
                BARBER<span className="text-[#C8A15A]">FLOW</span> <span className="text-[10px] text-[#B9854F] font-sans font-black tracking-widest">PRO</span>
              </span>
              <span className="text-[9px] font-sans text-[#E4D5C3]/70 tracking-widest uppercase font-bold block mt-0.5">
                Sua agenda. Seu estilo. Seu negócio.
              </span>
            </div>
          </div>
        </div>

        {/* ROLE MODES BUTTONS */}
        <div className="flex items-center space-x-1 bg-black/70 p-1.5 rounded-2xl border border-white/10 text-xs font-bold w-full md:w-auto overflow-x-auto scrollbar-none justify-center">
          <button
            onClick={() => setActiveRole("public_booking")}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
              activeRole === "public_booking" ? "bg-gradient-to-r from-[#B9854F] to-[#C8A15A] text-black font-black shadow-lg" : "text-slate-400 hover:text-white"
            }`}
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Web Agendamento Público</span>
          </button>

          <button
            onClick={() => setActiveRole("admin")}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
              activeRole === "admin" ? "bg-gradient-to-r from-[#B9854F] to-[#C8A15A] text-black font-black shadow-lg" : "text-slate-400 hover:text-white"
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Painel Gestão Admin</span>
          </button>

          <button
            onClick={() => setActiveRole("barber_mobile")}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
              activeRole === "barber_mobile" ? "bg-gradient-to-r from-[#B9854F] to-[#C8A15A] text-black font-black shadow-lg" : "text-slate-400 hover:text-white"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>App Barbeiro (Lucas)</span>
          </button>

          <button
            onClick={() => setActiveRole("client_mobile")}
            className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 whitespace-nowrap ${
              activeRole === "client_mobile" ? "bg-gradient-to-r from-[#B9854F] to-[#C8A15A] text-black font-black shadow-lg" : "text-slate-400 hover:text-white"
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span>App Cliente (Marcelo)</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MODE 1: PUBLIC WEB BOOKING LANDING (EXCELLENCE & LUXURY EXPERIENCE) */}
      {/* ========================================================================= */}
      {activeRole === "public_booking" && (
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-12 text-left animate-fade-in">
          
          {/* PUBLIC WEB HERO HEADER */}
          <div className="relative rounded-3xl overflow-hidden border border-[#C8A15A]/30 p-8 md:p-12 bg-gradient-to-r from-black via-[#202020] to-[#141414] shadow-2xl space-y-6">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#B9854F]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="bg-[#1F8A5B] text-white font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                    <span>Aberto Agora • 08:00 - 19:00</span>
                  </span>
                  <span className="bg-[#5A3928] text-[#E4D5C3] font-bold px-3 py-1 rounded-full">Unidade Centro - Sorocaba/SP</span>
                </div>

                <h1 className="font-serif font-black text-3xl md:text-5xl text-white leading-tight">
                  Barbearia <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B9854F] to-[#C8A15A]">Imperial</span>
                </h1>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  Experiência de corte clássico e barbeataria moderna. Agende seu horário em menos de 1 minuto sem baixar nada.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold text-[#E4D5C3]">
                  <div className="flex items-center space-x-1 bg-black/60 px-3 py-1.5 rounded-xl border border-white/10">
                    <Star className="h-4 w-4 fill-[#C8A15A] text-[#C8A15A]" />
                    <span>4.9 ★ (386 avaliações do Google)</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-black/60 px-3 py-1.5 rounded-xl border border-white/10">
                    <CheckCircle2 className="h-4 w-4 text-[#1F8A5B]" />
                    <span>Chopp & Café Expresso Cortesia</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 bg-black/60 p-6 rounded-3xl border border-white/10 space-y-4 text-center max-w-xs w-full shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-[#C8A15A] text-black font-serif font-black text-2xl flex items-center justify-center mx-auto shadow-lg">
                  BI
                </div>
                <div>
                  <h3 className="font-serif font-black text-white text-base">Agendamento Online</h3>
                  <span className="text-xs text-[#C8A15A] font-bold block">Confirmação imediata no WhatsApp</span>
                </div>
                <a
                  href="#agendar-online"
                  className="w-full py-3 bg-gradient-to-r from-[#B9854F] to-[#C8A15A] text-black font-black text-xs rounded-xl shadow-xl hover:opacity-90 transition-all flex items-center justify-center space-x-2 block"
                >
                  <Scissors className="h-4 w-4" />
                  <span>Escolher Horário Abaixo</span>
                </a>
              </div>
            </div>
          </div>

          {/* INTERACTIVE ONLINE BOOKING WIZARD (EMBEDDED STEPPER) */}
          <section id="agendar-online" className="bg-[#202020] p-6 md:p-10 rounded-3xl border-2 border-[#C8A15A]/40 shadow-2xl space-y-8 scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#C8A15A] font-black tracking-widest block">PASSO A PASSO RÁPIDO</span>
                <h2 className="font-serif font-black text-2xl text-white">Monte seu Agendamento Imperial</h2>
              </div>

              {/* STEP INDICATORS */}
              <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none py-1">
                {[
                  { num: 1, label: "Unidade" },
                  { num: 2, label: "Serviço" },
                  { num: 3, label: "Barbeiro" },
                  { num: 4, label: "Data & Hora" },
                  { num: 5, label: "Confirmação" },
                ].map((st) => (
                  <button
                    key={st.num}
                    onClick={() => setBookingStep(st.num)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      bookingStep === st.num
                        ? "bg-[#C8A15A] text-black font-black"
                        : bookingStep > st.num
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                        : "bg-black/50 text-slate-400"
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono bg-black/40">
                      {bookingStep > st.num ? "✓" : st.num}
                    </span>
                    <span className="hidden sm:inline">{st.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 1: UNIDADE */}
            {bookingStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="font-serif font-black text-white text-lg">1. Selecione a Unidade de Atendimento:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "Unidade Centro", address: "Rua XV de Novembro, 450 - Centro", phone: "(15) 3233-9000", seats: 4 },
                    { id: "Unidade Campolim", address: "Av. Izoraida Marques, 1200 - Campolim", phone: "(15) 3233-9001", seats: 3 },
                    { id: "Unidade Zona Norte", address: "Av. Itavuvu, 2800 - Zona Norte", phone: "(15) 3233-9002", seats: 3 },
                  ].map((unit) => (
                    <div
                      key={unit.id}
                      onClick={() => {
                        setBookUnit(unit.id);
                        setBookingStep(2);
                      }}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 ${
                        bookUnit === unit.id ? "bg-[#5A3928]/40 border-[#C8A15A] shadow-xl" : "bg-black/40 border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <MapPin className="h-5 w-5 text-[#C8A15A]" />
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full">
                          {unit.seats} Cadeiras Ativas
                        </span>
                      </div>
                      <div>
                        <h4 className="font-serif font-black text-white text-base">{unit.id}</h4>
                        <span className="text-xs text-slate-400 block mt-0.5">{unit.address}</span>
                      </div>
                      <span className="text-[11px] text-[#C8A15A] font-bold block pt-2 border-t border-white/10">
                        {unit.phone} • Estacionamento Próprio
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: SERVIÇO */}
            {bookingStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="font-serif font-black text-white text-lg">2. Selecione o Serviço Desejado:</h3>
                  
                  {/* CATEGORY FILTER PILLS */}
                  <div className="flex items-center space-x-1 bg-black/60 p-1 rounded-xl border border-white/10 text-xs font-bold">
                    {["Todos", "Cabelo", "Barba", "Combo", "Estética"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setPublicServiceCategoryFilter(cat)}
                        className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          publicServiceCategoryFilter === cat ? "bg-[#C8A15A] text-black font-black" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services
                    .filter(s => publicServiceCategoryFilter === "Todos" || s.category === publicServiceCategoryFilter)
                    .map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          setBookService(s);
                          setBookingStep(3);
                        }}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 ${
                          bookService.id === s.id ? "bg-[#5A3928]/40 border-[#C8A15A] shadow-xl" : "bg-black/40 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <img src={s.image} alt={s.name} className="w-24 h-24 rounded-xl object-cover shrink-0" />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between">
                            <h4 className="font-serif font-black text-white text-base leading-tight">{s.name}</h4>
                            <span className="font-mono font-black text-emerald-400 text-base shrink-0">R$ {s.price},00</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-snug line-clamp-2">{s.description}</p>
                          <div className="flex items-center space-x-3 text-[11px] text-[#C8A15A] font-bold pt-1">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{s.durationMinutes} minutos</span>
                            </span>
                            <span className="bg-[#5A3928] text-[#E4D5C3] px-2 py-0.5 rounded text-[10px]">{s.category}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* STEP 3: BARBEIRO */}
            {bookingStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="font-serif font-black text-white text-lg">3. Escolha o Profissional / Barbeiro:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {barbers.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => {
                        setBookBarber(b);
                        setBookingStep(4);
                      }}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer text-center space-y-3 ${
                        bookBarber.id === b.id ? "bg-[#5A3928]/40 border-[#C8A15A] shadow-xl" : "bg-black/40 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <img src={b.avatar} alt={b.name} className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-[#C8A15A]" />
                      <div>
                        <h4 className="font-serif font-black text-white text-base">{b.name}</h4>
                        <span className="text-xs text-[#C8A15A] font-bold block">{b.role}</span>
                        <div className="flex items-center justify-center space-x-1 text-xs text-slate-300 mt-1">
                          <Star className="h-3.5 w-3.5 fill-[#C8A15A] text-[#C8A15A]" />
                          <span className="font-bold">{b.rating}</span>
                          <span className="text-slate-500 text-[10px]">({b.reviewsCount})</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-white/5 border border-white/10 text-slate-300 px-2 py-1 rounded-lg block truncate">
                        Próximo: {b.nextSlot}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: DATA & HORA */}
            {bookingStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-serif font-black text-white text-lg">4. Escolha a Data e Horário Disponível:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-black/40 p-5 rounded-2xl border border-white/10 space-y-3">
                    <label className="text-xs text-slate-300 font-bold block">Selecione o Dia:</label>
                    <input
                      type="date"
                      value={bookDate}
                      onChange={(e) => setBookDate(e.target.value)}
                      className="w-full bg-[#141414] border border-white/20 rounded-xl px-4 py-3 text-white font-bold text-sm focus:border-[#C8A15A] outline-none"
                    />
                    <span className="text-[11px] text-slate-400 block leading-relaxed">
                      Atendimento das 08:00 às 19:00. Horários com confirmação instantânea.
                    </span>
                  </div>

                  <div className="md:col-span-2 space-y-3">
                    <label className="text-xs text-slate-300 font-bold block">Horários Disponíveis no Dia {bookDate}:</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {["08:30", "09:15", "10:00", "11:00", "13:30", "14:15", "15:00", "16:00", "17:00", "18:15"].map((timeSlot) => (
                        <button
                          key={timeSlot}
                          onClick={() => setBookTime(timeSlot)}
                          className={`py-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                            bookTime === timeSlot
                              ? "bg-gradient-to-r from-[#B9854F] to-[#C8A15A] text-black border-[#F4EFE8] font-black shadow-lg"
                              : "bg-black/40 text-slate-200 border-white/10 hover:border-[#C8A15A]"
                          }`}
                        >
                          {timeSlot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/10">
                  <button
                    onClick={() => setBookingStep(5)}
                    className="px-8 py-3 bg-[#C8A15A] text-black font-black text-xs rounded-xl shadow-xl hover:opacity-90 transition-all cursor-pointer flex items-center space-x-2"
                  >
                    <span>Avançar para Dados de Contato</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: CONFIRMAÇÃO & DADOS */}
            {bookingStep === 5 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-serif font-black text-white text-lg">5. Informe seus Dados para Finalizar:</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4 bg-black/40 p-5 rounded-2xl border border-white/10 text-xs">
                    <div>
                      <label className="text-slate-300 font-bold block mb-1">Seu Nome Completo *</label>
                      <input
                        type="text"
                        value={bookClientName}
                        onChange={(e) => setBookClientName(e.target.value)}
                        placeholder="Ex: Marcelo Oliveira"
                        className="w-full bg-[#141414] border border-white/20 rounded-xl px-3.5 py-2.5 text-white font-bold outline-none focus:border-[#C8A15A]"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-bold block mb-1">WhatsApp para Notificações *</label>
                      <input
                        type="text"
                        value={bookClientPhone}
                        onChange={(e) => setBookClientPhone(e.target.value)}
                        placeholder="(15) 99999-0000"
                        className="w-full bg-[#141414] border border-white/20 rounded-xl px-3.5 py-2.5 text-white font-bold outline-none focus:border-[#C8A15A]"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-bold block mb-1">Observações / Preferências</label>
                      <textarea
                        value={bookNotes}
                        onChange={(e) => setBookNotes(e.target.value)}
                        placeholder="Ex: Prefiro café expresso, degradê navalhado baixo..."
                        className="w-full bg-[#141414] border border-white/20 rounded-xl px-3.5 py-2 text-white font-medium outline-none focus:border-[#C8A15A] h-20"
                      />
                    </div>
                  </div>

                  {/* SUMMARY BOX */}
                  <div className="bg-gradient-to-br from-[#5A3928]/60 to-[#202020] p-6 rounded-2xl border border-[#C8A15A]/40 space-y-4 shadow-xl">
                    <span className="font-serif font-black text-white text-base border-b border-white/10 pb-2 block">
                      Resumo do Agendamento:
                    </span>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Unidade:</span>
                        <span className="font-bold text-white">{bookUnit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Serviço:</span>
                        <span className="font-bold text-white">{bookService.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Profissional:</span>
                        <span className="font-bold text-[#C8A15A]">{bookBarber.name}</span>
                      </div>
                      <div className="flex justify-between border-t border-white/10 pt-2">
                        <span className="text-slate-400">Data e Horário:</span>
                        <span className="font-bold text-white">{bookDate} às {bookTime}</span>
                      </div>
                      <div className="flex justify-between border-t border-white/10 pt-2 text-base font-black text-white">
                        <span>Valor Total:</span>
                        <span className="text-emerald-400 font-mono">R$ {bookService.price},00</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCompleteBooking}
                      className="w-full py-4 bg-gradient-to-r from-[#B9854F] to-[#C8A15A] text-black font-black text-sm rounded-xl shadow-2xl hover:opacity-95 transition-all cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Confirmar Agendamento Agora</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* GALLERY SHOWCASE */}
          <section className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase text-[#C8A15A] font-black tracking-widest block">PORTFÓLIO IMPERIAL</span>
              <h2 className="font-serif font-black text-2xl text-white">Galeria de Cortes & Transformações</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {GALLERY_PHOTOS.map((item) => (
                <div key={item.id} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#202020] space-y-2">
                  <img src={item.img} alt={item.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-4 flex flex-col justify-end">
                    <h4 className="font-serif font-black text-white text-sm leading-tight">{item.title}</h4>
                    <span className="text-[11px] text-[#C8A15A] font-bold">Por {item.barber}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CUSTOMER REVIEWS */}
          <section className="bg-[#202020] p-8 rounded-3xl border border-white/10 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase text-[#C8A15A] font-black tracking-widest block">AVALIAÇÕES REAIS</span>
              <h2 className="font-serif font-black text-2xl text-white">O que nossos clientes dizem</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reviews.map((r) => (
                <div key={r.id} className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3 text-xs">
                  <div className="flex items-center space-x-3">
                    <img src={r.clientAvatar} alt={r.clientName} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-white">{r.clientName}</h4>
                      <div className="flex text-[#C8A15A]">
                        {"★".repeat(r.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed italic">"{r.comment}"</p>
                  <span className="text-[10px] text-slate-500 block">Atendido por {r.barberName} em {r.date}</span>
                </div>
              ))}
            </div>
          </section>

          {/* LOCATION & AMENITIES */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-[#202020] p-6 rounded-3xl border border-white/10 space-y-3">
              <MapPin className="h-6 w-6 text-[#C8A15A]" />
              <h3 className="font-serif font-black text-white text-base">Localização Privilegiada</h3>
              <p className="text-slate-400 leading-relaxed">
                Rua XV de Novembro, 450 - Centro, Sorocaba/SP. Estacionamento gratuito com manobrista para clientes em atendimento.
              </p>
            </div>

            <div className="bg-[#202020] p-6 rounded-3xl border border-white/10 space-y-3">
              <Clock className="h-6 w-6 text-[#C8A15A]" />
              <h3 className="font-serif font-black text-white text-base">Horário de Funcionamento</h3>
              <p className="text-slate-400 leading-relaxed">
                Segunda a Sábado: 08:00 às 19:00.<br />
                Domingo e Feriados: 09:00 às 13:00 (Apenas agendamento prévio).
              </p>
            </div>

            <div className="bg-[#202020] p-6 rounded-3xl border border-white/10 space-y-3">
              <Phone className="h-6 w-6 text-[#C8A15A]" />
              <h3 className="font-serif font-black text-white text-base">Contato Direct & WhatsApp</h3>
              <p className="text-slate-400 leading-relaxed">
                Telefone: (15) 3233-9000<br />
                WhatsApp: (15) 99988-7744<br />
                E-mail: contato@barbeariaimperial.com.br
              </p>
            </div>
          </section>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: FULL BACKOFFICE ADMIN DASHBOARD (COMPLETE & FUNCTIONAL) */}
      {/* ========================================================================= */}
      {activeRole === "admin" && (
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-60px)] text-left">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className="w-full lg:w-64 bg-[#202020] border-r border-white/10 p-4 space-y-6 shrink-0">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-black px-3 tracking-widest">
                BACKOFFICE GESTÃO
              </span>
              {[
                { id: "dashboard", label: "Dashboard Indicadores", icon: BarChart3 },
                { id: "agenda", label: "Agenda Geral", icon: CalendarDays },
                { id: "new_appointment", label: "Novo Agendamento", icon: Plus },
                { id: "clients", label: "Gestão Clientes", icon: Users },
                { id: "team", label: "Equipe Barbeiros", icon: Scissors },
                { id: "services", label: "Catálogo Serviços", icon: Award },
                { id: "finance", label: "Financeiro & Caixa", icon: DollarSign },
                { id: "commissions", label: "Comissões Equipe", icon: Percent },
                { id: "products", label: "Estoque Produtos", icon: ShoppingBag },
                { id: "loyalty", label: "Fidelidade & Cupons", icon: Crown },
                { id: "reviews", label: "Avaliações Clientes", icon: Star },
                { id: "reports", label: "Relatórios & Export", icon: FileText },
                { id: "units", label: "Unidades & Filiais", icon: MapPin },
                { id: "settings", label: "Configurações Sistema", icon: Settings },
              ].map((menu) => {
                const Icon = menu.icon;
                const isActive = adminMenu === menu.id;
                return (
                  <button
                    key={menu.id}
                    onClick={() => setAdminMenu(menu.id as any)}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-3 cursor-pointer ${
                      isActive ? "bg-gradient-to-r from-[#B9854F] to-[#C8A15A] text-black font-black shadow-lg" : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{menu.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 p-6 md:p-8 space-y-6 overflow-x-hidden">
            
            {/* SUB-VIEW 1: DASHBOARD */}
            {adminMenu === "dashboard" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-2xl font-serif font-black text-white">Dashboard Geral Barbearia Imperial</h1>
                  <p className="text-xs text-slate-400">Indicadores consolidados do mês de Julho/2026</p>
                </div>

                {/* KPI CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#202020] p-5 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                      <span>Faturamento do Mês</span>
                      <DollarSign className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-black font-mono text-emerald-400">R$ 28.450,00</div>
                    <span className="text-[10px] text-emerald-400 block font-medium">+18% vs mês anterior</span>
                  </div>

                  <div className="bg-[#202020] p-5 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                      <span>Atendimentos Concluídos</span>
                      <Users className="h-4 w-4 text-[#C8A15A]" />
                    </div>
                    <div className="text-2xl font-black font-serif text-white">338 Atendimentos</div>
                    <span className="text-[10px] text-slate-400 block font-medium">Média 13 por dia</span>
                  </div>

                  <div className="bg-[#202020] p-5 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                      <span>Ticket Médio por Cliente</span>
                      <TrendingUp className="h-4 w-4 text-purple-400" />
                    </div>
                    <div className="text-2xl font-black font-mono text-white">R$ 84,20</div>
                    <span className="text-[10px] text-purple-400 block font-medium">Serviços + Produtos</span>
                  </div>

                  <div className="bg-[#202020] p-5 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                      <span>Taxa de Ocupação Agenda</span>
                      <Clock className="h-4 w-4 text-[#B9854F]" />
                    </div>
                    <div className="text-2xl font-black font-mono text-[#C8A15A]">88% Ocupado</div>
                    <span className="text-[10px] text-slate-400 block font-medium">Sábados com 100% de ocupação</span>
                  </div>
                </div>

                {/* CHARTS ROW */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-[#202020] p-6 rounded-3xl border border-white/10 space-y-4">
                    <h3 className="font-serif font-black text-white text-base">Faturamento Diário da Semana</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dailyRevenueData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2D2D30" />
                          <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} />
                          <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} unit="R$" />
                          <Tooltip formatter={(val: any) => [`R$ ${val},00`, "Faturamento"]} />
                          <Bar dataKey="val" fill="#C8A15A" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-[#202020] p-6 rounded-3xl border border-white/10 space-y-4">
                    <h3 className="font-serif font-black text-white text-base">Distribuição de Status</h3>
                    <div className="h-64 w-full flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <RePieChart>
                          <Pie data={appointmentStatusPie} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                            {appointmentStatusPie.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RePieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* RECENT APPOINTMENTS TABLE */}
                <div className="bg-[#202020] p-6 rounded-3xl border border-white/10 space-y-4">
                  <h3 className="font-serif font-black text-white text-base">Agendamentos Recentes</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 text-slate-400 font-bold uppercase text-[10px]">
                          <th className="py-2.5 px-3">Horário</th>
                          <th className="py-2.5 px-3">Cliente</th>
                          <th className="py-2.5 px-3">Serviço</th>
                          <th className="py-2.5 px-3">Barbeiro</th>
                          <th className="py-2.5 px-3">Valor</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {appointments.map((appt) => (
                          <tr key={appt.id} className="hover:bg-white/5">
                            <td className="py-3 px-3 font-mono font-bold text-[#C8A15A]">{appt.time}</td>
                            <td className="py-3 px-3 font-bold text-white">{appt.clientName}</td>
                            <td className="py-3 px-3 text-slate-300">{appt.serviceName}</td>
                            <td className="py-3 px-3 text-slate-300">{appt.barberName}</td>
                            <td className="py-3 px-3 font-mono font-bold text-emerald-400">R$ {appt.price},00</td>
                            <td className="py-3 px-3">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                                {appt.status}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                onClick={() => setSelectedAppointmentModal(appt)}
                                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[10px] font-bold cursor-pointer"
                              >
                                Gerenciar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-VIEW 2: AGENDA GERAL */}
            {adminMenu === "agenda" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-serif font-black text-white">Agenda Geral de Atendimentos</h1>
                    <p className="text-xs text-slate-400">Gerenciamento completo das cadeiras da barbearia</p>
                  </div>

                  <button
                    onClick={() => setAdminMenu("new_appointment")}
                    className="px-4 py-2 bg-gradient-to-r from-[#B9854F] to-[#C8A15A] text-black font-black text-xs rounded-xl shadow cursor-pointer flex items-center space-x-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Novo Agendamento</span>
                  </button>
                </div>

                {/* AGENDA LIST */}
                <div className="space-y-3">
                  {appointments.map((a) => (
                    <div key={a.id} className="bg-[#202020] p-4 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <span className="font-mono font-black text-sm text-[#C8A15A] bg-black/50 px-3 py-2 rounded-xl border border-white/5">
                          {a.time}
                        </span>
                        <div>
                          <h4 className="font-bold text-white text-sm">{a.clientName}</h4>
                          <span className="text-xs text-slate-400 block">{a.serviceName} com <strong className="text-[#C8A15A]">{a.barberName}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 text-xs">
                        <span className="font-mono font-black text-emerald-400 text-sm">R$ {a.price},00</span>
                        <span className="bg-[#1F8A5B]/30 text-emerald-300 font-bold px-2.5 py-1 rounded-lg">
                          {a.status}
                        </span>
                        <button
                          onClick={() => setSelectedAppointmentModal(a)}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold cursor-pointer"
                        >
                          Alterar Status
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-VIEW 3: NOVO AGENDAMENTO FORM */}
            {adminMenu === "new_appointment" && (
              <div className="max-w-2xl bg-[#202020] p-8 rounded-3xl border border-white/10 space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-2xl font-serif font-black text-white">Cadastrar Agendamento Admin</h1>
                  <p className="text-xs text-slate-400">Marque um horário para qualquer cliente diretamente na recepção</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Nome do Cliente</label>
                    <input
                      type="text"
                      value={bookClientName}
                      onChange={(e) => setBookClientName(e.target.value)}
                      className="w-full bg-[#141414] border border-white/20 rounded-xl px-3.5 py-2.5 text-white font-bold outline-none focus:border-[#C8A15A]"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Telefone WhatsApp</label>
                    <input
                      type="text"
                      value={bookClientPhone}
                      onChange={(e) => setBookClientPhone(e.target.value)}
                      className="w-full bg-[#141414] border border-white/20 rounded-xl px-3.5 py-2.5 text-white font-bold outline-none focus:border-[#C8A15A]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 font-bold block mb-1">Serviço</label>
                      <select
                        onChange={(e) => setBookService(services.find(s => s.id === e.target.value) || services[0])}
                        className="w-full bg-[#141414] border border-white/20 rounded-xl px-3.5 py-2.5 text-white font-bold outline-none focus:border-[#C8A15A]"
                      >
                        {services.map(s => <option key={s.id} value={s.id}>{s.name} - R$ {s.price},00</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-300 font-bold block mb-1">Barbeiro</label>
                      <select
                        onChange={(e) => setBookBarber(barbers.find(b => b.id === e.target.value) || barbers[0])}
                        className="w-full bg-[#141414] border border-white/20 rounded-xl px-3.5 py-2.5 text-white font-bold outline-none focus:border-[#C8A15A]"
                      >
                        {barbers.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 font-bold block mb-1">Data</label>
                      <input
                        type="date"
                        value={bookDate}
                        onChange={(e) => setBookDate(e.target.value)}
                        className="w-full bg-[#141414] border border-white/20 rounded-xl px-3.5 py-2.5 text-white font-bold outline-none focus:border-[#C8A15A]"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 font-bold block mb-1">Horário</label>
                      <input
                        type="text"
                        value={bookTime}
                        onChange={(e) => setBookTime(e.target.value)}
                        className="w-full bg-[#141414] border border-white/20 rounded-xl px-3.5 py-2.5 text-white font-bold outline-none focus:border-[#C8A15A]"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleCompleteBooking}
                    className="w-full py-3.5 bg-[#C8A15A] text-black font-black text-xs rounded-xl shadow-xl transition-all cursor-pointer"
                  >
                    Salvar Agendamento no Sistema
                  </button>
                </div>
              </div>
            )}

            {/* SUB-VIEW 4: CLIENTES */}
            {adminMenu === "clients" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-serif font-black text-white">Carteira de Clientes</h1>
                    <p className="text-xs text-slate-400">Total de {clients.length} clientes ativos cadastrados</p>
                  </div>

                  <button
                    onClick={() => setShowAddClientModal(true)}
                    className="px-4 py-2 bg-gradient-to-r from-[#B9854F] to-[#C8A15A] text-black font-black text-xs rounded-xl shadow cursor-pointer flex items-center space-x-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Novo Cliente</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clients.map((c) => (
                    <div key={c.id} className="bg-[#202020] p-5 rounded-2xl border border-white/10 space-y-3">
                      <div className="flex items-center space-x-3">
                        <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-xl object-cover border-2 border-[#C8A15A]" />
                        <div>
                          <h4 className="font-bold text-white text-base">{c.name}</h4>
                          <span className="text-xs text-slate-400 block">{c.phone} • {c.email}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-[11px] bg-black/40 p-2.5 rounded-xl border border-white/5 text-center">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Categoria</span>
                          <span className="font-bold text-[#C8A15A]">{c.category}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Visitas</span>
                          <span className="font-bold text-white">{c.visitsCount}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Gasto Total</span>
                          <span className="font-bold text-emerald-400 font-mono">R$ {c.totalSpent},00</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-VIEW 5: EQUIPE BARBEIROS */}
            {adminMenu === "team" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-serif font-black text-white">Equipe de Barbeiros Masters</h1>
                    <p className="text-xs text-slate-400">Desempenho e status operacional da equipe</p>
                  </div>

                  <button
                    onClick={() => setShowAddBarberModal(true)}
                    className="px-4 py-2 bg-[#C8A15A] text-black font-black text-xs rounded-xl shadow cursor-pointer flex items-center space-x-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Cadastrar Barbeiro</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {barbers.map((b) => (
                    <div key={b.id} className="bg-[#202020] p-5 rounded-2xl border border-white/10 space-y-3 text-center">
                      <img src={b.avatar} alt={b.name} className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-[#C8A15A]" />
                      <div>
                        <h4 className="font-serif font-black text-white text-base">{b.name}</h4>
                        <span className="text-xs text-[#C8A15A] font-bold block">{b.role}</span>
                        <span className="text-[10px] text-slate-400 block">{b.unit}</span>
                      </div>

                      <div className="p-2 bg-black/40 rounded-xl text-xs space-y-1">
                        <span className="text-slate-400 text-[10px] block">Comissão Mensal</span>
                        <span className="font-mono font-bold text-emerald-400">R$ {b.monthlyCommission},00</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-VIEW 6: CATÁLOGO SERVIÇOS */}
            {adminMenu === "services" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-serif font-black text-white">Catálogo de Serviços</h1>
                    <p className="text-xs text-slate-400">Preços, comissões e tempos de atendimento</p>
                  </div>

                  <button
                    onClick={() => setShowAddServiceModal(true)}
                    className="px-4 py-2 bg-[#C8A15A] text-black font-black text-xs rounded-xl shadow cursor-pointer flex items-center space-x-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Novo Serviço</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {services.map((s) => (
                    <div key={s.id} className="bg-[#202020] p-4 rounded-2xl border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-black text-white text-base">{s.name}</h4>
                        <span className="font-mono font-bold text-emerald-400 text-sm">R$ {s.price},00</span>
                      </div>
                      <span className="text-xs text-slate-400 block">{s.durationMinutes} min • Comissão: {s.commissionPercent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-VIEW 7: FINANCEIRO */}
            {adminMenu === "finance" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-2xl font-serif font-black text-white">Financeiro & Fluxo de Caixa</h1>
                  <p className="text-xs text-slate-400">Controle de entradas, saídas e lucro líquido</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#202020] p-5 rounded-2xl border border-white/10">
                    <span className="text-xs text-slate-400 block font-bold">Receita Bruta Mês</span>
                    <span className="text-2xl font-mono font-black text-emerald-400">R$ 28.450,00</span>
                  </div>
                  <div className="bg-[#202020] p-5 rounded-2xl border border-white/10">
                    <span className="text-xs text-slate-400 block font-bold">Comissões Pagas</span>
                    <span className="text-2xl font-mono font-black text-purple-400">R$ 11.380,00</span>
                  </div>
                  <div className="bg-[#202020] p-5 rounded-2xl border border-white/10">
                    <span className="text-xs text-slate-400 block font-bold">Lucro Líquido</span>
                    <span className="text-2xl font-mono font-black text-[#C8A15A]">R$ 13.870,00</span>
                  </div>
                </div>

                <div className="bg-[#202020] p-6 rounded-3xl border border-white/10 space-y-4">
                  <h3 className="font-serif font-black text-white text-base">Últimos Lançamentos</h3>
                  <div className="space-y-2 text-xs">
                    {transactions.map((t) => (
                      <div key={t.id} className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-white">{t.description}</h4>
                          <span className="text-[10px] text-slate-400">{t.date} • {t.category} ({t.paymentMethod})</span>
                        </div>
                        <span className={`font-mono font-bold text-sm ${t.type === "Receita" ? "text-emerald-400" : "text-red-400"}`}>
                          {t.type === "Receita" ? "+" : "-"} R$ {t.amount},00
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-VIEW 8: COMISSÕES */}
            {adminMenu === "commissions" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-2xl font-serif font-black text-white">Extrato de Comissões da Equipe</h1>
                  <p className="text-xs text-slate-400">Cálculo e quitação de repasses para os barbeiros</p>
                </div>

                <div className="bg-[#202020] p-6 rounded-3xl border border-white/10 space-y-4">
                  {barbers.map((b) => (
                    <div key={b.id} className="p-4 bg-black/40 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <img src={b.avatar} alt={b.name} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-bold text-white text-sm">{b.name}</h4>
                          <span className="text-xs text-slate-400 block">{b.monthlyServicesCount} atendimentos • Faturamento R$ {b.monthlyRevenue},00</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 text-xs">
                        <span className="font-mono font-black text-[#C8A15A] text-base">Comissão: R$ {b.monthlyCommission},00</span>
                        <button
                          onClick={() => showToast(`Comissão de R$ ${b.monthlyCommission},00 paga para ${b.name}!`)}
                          className="px-4 py-2 bg-[#1F8A5B] text-white font-bold rounded-xl cursor-pointer"
                        >
                          Pagar Comissão
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-VIEW 9: PRODUTOS & ESTOQUE */}
            {adminMenu === "products" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-serif font-black text-white">Estoque de Produtos</h1>
                    <p className="text-xs text-slate-400">Pomadas, óleos, balms e produtos para revenda</p>
                  </div>

                  <button
                    onClick={() => setShowAddProductModal(true)}
                    className="px-4 py-2 bg-[#C8A15A] text-black font-black text-xs rounded-xl shadow cursor-pointer flex items-center space-x-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Novo Produto</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((p) => (
                    <div key={p.id} className="bg-[#202020] p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-bold text-white text-sm">{p.name}</h4>
                          <span className="text-xs text-slate-400 block">Venda: R$ {p.salePrice},00 | Custo: R$ {p.costPrice},00</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded mt-1 inline-block ${
                            p.status === "Crítico" ? "bg-red-500/20 text-red-300" :
                            p.status === "Estoque baixo" ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300"
                          }`}>
                            {p.status} ({p.stock} un.)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 font-mono font-black text-xs">
                        <button
                          onClick={() => handleAdjustStock(p.id, -1)}
                          className="w-7 h-7 bg-white/10 hover:bg-white/20 text-white rounded-lg cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-white">{p.stock}</span>
                        <button
                          onClick={() => handleAdjustStock(p.id, 1)}
                          className="w-7 h-7 bg-[#C8A15A] text-black rounded-lg cursor-pointer font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-VIEW 10: FIDELIDADE & CUPONS */}
            {adminMenu === "loyalty" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-2xl font-serif font-black text-white">Programa de Fidelidade & Cupons</h1>
                  <p className="text-xs text-slate-400">Regras do Clube Imperial e cupons promocionais</p>
                </div>

                <div className="bg-[#202020] p-6 rounded-3xl border border-white/10 space-y-4">
                  <h3 className="font-serif font-black text-white text-base">Cupons Ativos</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {coupons.map((c) => (
                      <div key={c.id} className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-2">
                        <span className="bg-[#C8A15A] text-black font-mono font-black px-2.5 py-1 rounded text-xs block text-center">
                          {c.code}
                        </span>
                        <div className="text-center">
                          <span className="font-bold text-white text-sm block">{c.discount}</span>
                          <span className="text-[10px] text-slate-400 block">Usado {c.usesCount} vezes</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-VIEW 11: AVALIAÇÕES */}
            {adminMenu === "reviews" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-2xl font-serif font-black text-white">Gestão de Avaliações dos Clientes</h1>
                  <p className="text-xs text-slate-400">Feedback e nota média da Barbearia Imperial (4.9 ★)</p>
                </div>

                <div className="space-y-3">
                  {reviews.map((r) => (
                    <div key={r.id} className="bg-[#202020] p-5 rounded-2xl border border-white/10 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-sm">{r.clientName}</h4>
                        <span className="text-[#C8A15A] font-bold">{"★".repeat(r.rating)}</span>
                      </div>
                      <p className="text-slate-300 italic">"{r.comment}"</p>
                      {r.reply && (
                        <div className="p-2.5 bg-black/60 rounded-xl border border-white/5 text-[11px] text-[#E4D5C3]">
                          <strong className="text-[#C8A15A] block">Resposta da Barbearia:</strong>
                          {r.reply}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-VIEW 12: RELATÓRIOS */}
            {adminMenu === "reports" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-2xl font-serif font-black text-white">Relatórios Operacionais</h1>
                  <p className="text-xs text-slate-400">Exportação de dados e análise estratégica</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Relatório de Atendimentos Julho/2026", desc: "338 atendimentos detalhados por barbeiro." },
                    { title: "Relatório Financeiro & Comissões", desc: "Extrato completo de receitas e saídas de caixa." },
                    { title: "Relatório de Curva ABC de Produtos", desc: "Produtos mais vendidos no balcão da barbearia." },
                  ].map((rep, idx) => (
                    <div key={idx} className="bg-[#202020] p-5 rounded-2xl border border-white/10 space-y-3">
                      <FileText className="h-6 w-6 text-[#C8A15A]" />
                      <h4 className="font-serif font-black text-white text-base">{rep.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{rep.desc}</p>
                      <button
                        onClick={() => showToast("Download de relatório em PDF gerado com sucesso!")}
                        className="w-full py-2 bg-white/10 hover:bg-[#C8A15A] hover:text-black text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Baixar PDF</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-VIEW 13: UNIDADES */}
            {adminMenu === "units" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-2xl font-serif font-black text-white">Gestão de Unidades e Filiais</h1>
                  <p className="text-xs text-slate-400">Endereços, cadeiras ativas e telefones</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: "Unidade Centro", address: "Rua XV de Novembro, 450", phone: "(15) 3233-9000", seats: 4 },
                    { name: "Unidade Campolim", address: "Av. Izoraida Marques, 1200", phone: "(15) 3233-9001", seats: 3 },
                    { name: "Unidade Zona Norte", address: "Av. Itavuvu, 2800", phone: "(15) 3233-9002", seats: 3 },
                  ].map((u, i) => (
                    <div key={i} className="bg-[#202020] p-5 rounded-2xl border border-white/10 space-y-2">
                      <h4 className="font-serif font-black text-white text-base">{u.name}</h4>
                      <span className="text-xs text-slate-400 block">{u.address}</span>
                      <span className="text-xs text-[#C8A15A] font-bold block">{u.phone} • {u.seats} Cadeiras</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUB-VIEW 14: CONFIGURAÇÕES */}
            {adminMenu === "settings" && (
              <div className="max-w-2xl bg-[#202020] p-8 rounded-3xl border border-white/10 space-y-6 animate-fade-in">
                <div>
                  <h1 className="text-2xl font-serif font-black text-white">Configurações da Barbearia</h1>
                  <p className="text-xs text-slate-400">Preferências do sistema BarberFlow Pro</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Nome Comercial da Barbearia</label>
                    <input
                      type="text"
                      defaultValue="Barbearia Imperial"
                      className="w-full bg-[#141414] border border-white/20 rounded-xl px-3.5 py-2.5 text-white font-bold outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Chave Pix para Pagamentos</label>
                    <input
                      type="text"
                      defaultValue="pix@barbeariaimperial.com.br"
                      className="w-full bg-[#141414] border border-white/20 rounded-xl px-3.5 py-2.5 text-white font-bold outline-none"
                    />
                  </div>

                  <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white">Notificações Automáticas via WhatsApp</h4>
                      <span className="text-[10px] text-slate-400 block">Lembrete enviado 2h antes do atendimento</span>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#C8A15A] cursor-pointer" />
                  </div>

                  <button
                    onClick={() => showToast("Configurações salvas com sucesso!")}
                    className="w-full py-3 bg-[#C8A15A] text-black font-black text-xs rounded-xl shadow-xl cursor-pointer"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>
            )}

          </main>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: APP MOBILE BARBEIRO (LUCAS ALMEIDA) */}
      {/* ========================================================================= */}
      {activeRole === "barber_mobile" && (
        <div className="max-w-md mx-auto px-4 py-6 space-y-4 text-left animate-fade-in">
          {/* SMARTPHONE FRAME CONTAINER */}
          <div className="bg-[#1C1C1E] border-2 border-[#B9854F]/40 rounded-[40px] p-5 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col min-h-[720px]">
            {/* PHONE NOTCH */}
            <div className="w-32 h-4 bg-black rounded-b-xl mx-auto -mt-5 mb-4 border-b border-white/10 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-800 mr-2" />
              <div className="w-10 h-1 rounded-full bg-slate-800" />
            </div>

            {/* APP HEADER */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                  alt="Lucas Almeida"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#C8A15A]"
                />
                <div>
                  <h3 className="font-serif font-black text-white text-sm">Lucas Almeida</h3>
                  <span className="text-[10px] text-[#C8A15A] font-bold block">Barbeiro Master • Unidade Centro</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[10px] font-black">
                <Star className="h-3 w-3 fill-emerald-400 text-emerald-400" />
                <span>5.0</span>
              </div>
            </div>

            {/* STATUS SELECTOR PILL */}
            <div className="mt-3 bg-black/60 p-2 rounded-2xl border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase block px-1">Seu Status Atual:</span>
              <div className="grid grid-cols-4 gap-1 text-[10px] font-bold">
                {(["Disponível", "Em atendimento", "Pausa", "Indisponível"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setBarberStatus(st);
                      showToast(`Status alterado para: ${st}`);
                    }}
                    className={`py-1.5 rounded-xl transition-all cursor-pointer text-center ${
                      barberStatus === st
                        ? st === "Disponível"
                          ? "bg-emerald-500 text-black font-black"
                          : st === "Em atendimento"
                          ? "bg-purple-500 text-white font-black"
                          : st === "Pausa"
                          ? "bg-amber-500 text-black font-black"
                          : "bg-red-500 text-white font-black"
                        : "bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {st === "Em atendimento" ? "Em Atend." : st}
                  </button>
                ))}
              </div>
            </div>

            {/* BARBER TAB CONTENT */}
            <div className="flex-1 py-4 space-y-4 overflow-y-auto scrollbar-none">
              {/* TAB 1: HOME */}
              {barberTab === "home" && (
                <div className="space-y-4 animate-fade-in">
                  {/* METRICS ROW */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="bg-black/50 p-2.5 rounded-2xl border border-white/5 space-y-0.5">
                      <span className="text-slate-400 block font-bold">Hoje</span>
                      <span className="text-base font-serif font-black text-white">4 Cortes</span>
                    </div>
                    <div className="bg-black/50 p-2.5 rounded-2xl border border-white/5 space-y-0.5">
                      <span className="text-slate-400 block font-bold">Comissão Hoje</span>
                      <span className="text-sm font-mono font-black text-emerald-400">R$ 185</span>
                    </div>
                    <div className="bg-black/50 p-2.5 rounded-2xl border border-white/5 space-y-0.5">
                      <span className="text-slate-400 block font-bold">Gorjetas</span>
                      <span className="text-sm font-mono font-black text-[#C8A15A]">R$ 35</span>
                    </div>
                  </div>

                  {/* NEXT CLIENT CARD */}
                  {(() => {
                    const nextAppt = appointments.find((a) => a.barberName === "Lucas Almeida" && a.status !== "Finalizado") || appointments[0];
                    return (
                      <div className="bg-gradient-to-br from-[#2D221A] to-[#1C1C1E] p-4 rounded-2xl border border-[#C8A15A]/40 space-y-3 shadow-xl">
                        <div className="flex items-center justify-between">
                          <span className="bg-[#C8A15A] text-black font-mono font-black px-2.5 py-0.5 rounded-full text-[10px]">
                            PRÓXIMO ATENDIMENTO • {nextAppt?.time}
                          </span>
                          <span className="text-xs font-mono font-bold text-emerald-400">R$ {nextAppt?.price},00</span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <img
                            src={nextAppt?.clientAvatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"}
                            alt={nextAppt?.clientName}
                            className="w-12 h-12 rounded-2xl object-cover border-2 border-[#C8A15A]"
                          />
                          <div>
                            <h4 className="font-bold text-white text-sm">{nextAppt?.clientName}</h4>
                            <span className="text-xs text-slate-300 block">{nextAppt?.serviceName}</span>
                            <span className="text-[10px] text-[#C8A15A] block">{nextAppt?.clientPhone}</span>
                          </div>
                        </div>

                        {nextAppt?.notes && (
                          <p className="text-[11px] text-slate-300 italic bg-black/40 p-2 rounded-xl border border-white/5">
                            "{nextAppt.notes}"
                          </p>
                        )}

                        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                          <button
                            onClick={() => handleUpdateApptStatus(nextAppt.id, "Em atendimento")}
                            className="py-2 bg-purple-600 text-white font-bold rounded-xl shadow hover:bg-purple-500 cursor-pointer text-center"
                          >
                            Iniciar Atendimento
                          </button>
                          <button
                            onClick={() => handleUpdateApptStatus(nextAppt.id, "Finalizado")}
                            className="py-2 bg-[#1F8A5B] text-white font-bold rounded-xl shadow hover:bg-emerald-600 cursor-pointer text-center"
                          >
                            Concluir Serviço
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  {/* AGENDA COMPACT LIST FOR TODAY */}
                  <div className="space-y-2">
                    <h4 className="font-serif font-black text-white text-xs">Sua Agenda de Hoje (24/07)</h4>
                    {appointments.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => setSelectedAppointmentModal(a)}
                        className="bg-black/40 p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs cursor-pointer hover:border-[#C8A15A]/40 transition-all"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="font-mono font-bold text-[#C8A15A] text-xs">{a.time}</span>
                          <div>
                            <h5 className="font-bold text-white">{a.clientName}</h5>
                            <span className="text-[10px] text-slate-400 block">{a.serviceName}</span>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            a.status === "Finalizado"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : a.status === "Em atendimento"
                              ? "bg-purple-500/20 text-purple-300"
                              : "bg-amber-500/20 text-amber-300"
                          }`}
                        >
                          {a.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: AGENDA */}
              {barberTab === "agenda" && (
                <div className="space-y-3 animate-fade-in text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-black text-white text-sm">Escala de Horários</h4>
                    <span className="text-[10px] bg-[#C8A15A] text-black font-bold px-2 py-0.5 rounded">24/07/2026</span>
                  </div>

                  <div className="space-y-2">
                    {appointments.map((a) => (
                      <div key={a.id} className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <span className="font-mono font-black text-[#C8A15A] block">{a.time} - {a.serviceName}</span>
                          <span className="font-bold text-white text-xs">{a.clientName}</span>
                        </div>
                        <button
                          onClick={() => setSelectedAppointmentModal(a)}
                          className="px-2.5 py-1 bg-white/10 hover:bg-[#C8A15A] hover:text-black text-white rounded-lg text-[10px] font-bold cursor-pointer"
                        >
                          Gerenciar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: CLIENTES */}
              {barberTab === "clients" && (
                <div className="space-y-3 animate-fade-in text-xs">
                  <h4 className="font-serif font-black text-white text-sm">Seus Clientes Recorrentes</h4>
                  <div className="space-y-2">
                    {clients.map((c) => (
                      <div key={c.id} className="p-3 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                        <div className="flex items-center space-x-2.5">
                          <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover border border-[#C8A15A]" />
                          <div>
                            <h5 className="font-bold text-white text-xs">{c.name}</h5>
                            <span className="text-[10px] text-slate-400 block">{c.phone}</span>
                          </div>
                        </div>
                        <a
                          href={`https://wa.me/55${c.phone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 bg-[#1F8A5B] text-white rounded-lg cursor-pointer flex items-center justify-center"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: EARNINGS */}
              {barberTab === "earnings" && (
                <div className="space-y-4 animate-fade-in text-xs">
                  <div className="bg-gradient-to-r from-[#5A3928] to-[#1C1C1E] p-4 rounded-2xl border border-[#C8A15A]/30 space-y-2 text-center">
                    <span className="text-slate-300 font-bold text-[10px] uppercase">Sua Comissão Acumulada em Julho</span>
                    <div className="text-3xl font-mono font-black text-[#C8A15A]">R$ 3.840,00</div>
                    <span className="text-[10px] text-emerald-400 block font-bold">Repasse semanal programado para Sexta-feira</span>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-serif font-black text-white text-xs">Últimos Atendimentos & Comissões</h5>
                    {appointments.map((a) => (
                      <div key={a.id} className="p-2.5 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between text-[11px]">
                        <div>
                          <span className="font-bold text-white block">{a.serviceName}</span>
                          <span className="text-slate-400 text-[10px]">{a.clientName}</span>
                        </div>
                        <span className="font-mono font-black text-emerald-400">+ R$ {(a.price * 0.4).toFixed(0)},00</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: PROFILE */}
              {barberTab === "profile" && (
                <div className="space-y-4 animate-fade-in text-xs text-center">
                  <div className="p-4 bg-black/40 rounded-2xl border border-white/10 space-y-2">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                      alt="Lucas Almeida"
                      className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-[#C8A15A]"
                    />
                    <h4 className="font-serif font-black text-white text-base">Lucas Almeida</h4>
                    <span className="text-xs text-[#C8A15A] font-bold block">Barbeiro Stylist Master</span>
                    <p className="text-[10px] text-slate-400">Especialista em degrade navalhado, barba terapia e visagismo masculino.</p>
                  </div>

                  <button
                    onClick={() => showToast("Turno encerrado no sistema!")}
                    className="w-full py-2.5 bg-red-600/30 text-red-300 font-bold rounded-xl border border-red-500/30 cursor-pointer"
                  >
                    Encerrar Turno de Hoje
                  </button>
                </div>
              )}
            </div>

            {/* BOTTOM NAV BAR FOR BARBER */}
            <div className="border-t border-white/10 pt-2 grid grid-cols-5 gap-1 text-[10px] text-center font-bold">
              {[
                { id: "home", label: "Início", icon: Scissors },
                { id: "agenda", label: "Agenda", icon: CalendarDays },
                { id: "clients", label: "Clientes", icon: Users },
                { id: "earnings", label: "Ganhos", icon: DollarSign },
                { id: "profile", label: "Perfil", icon: User },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = barberTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setBarberTab(tab.id as any)}
                    className={`py-1.5 flex flex-col items-center justify-center rounded-xl transition-all cursor-pointer ${
                      isActive ? "text-[#C8A15A] font-black bg-white/5" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 mb-0.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 4: APP MOBILE CLIENTE (MARCELO OLIVEIRA) */}
      {/* ========================================================================= */}
      {activeRole === "client_mobile" && (
        <div className="max-w-md mx-auto px-4 py-6 space-y-4 text-left animate-fade-in">
          {/* SMARTPHONE FRAME CONTAINER */}
          <div className="bg-[#1C1C1E] border-2 border-[#C8A15A]/50 rounded-[40px] p-5 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col min-h-[720px]">
            {/* PHONE NOTCH */}
            <div className="w-32 h-4 bg-black rounded-b-xl mx-auto -mt-5 mb-4 border-b border-white/10 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-800 mr-2" />
              <div className="w-10 h-1 rounded-full bg-slate-800" />
            </div>

            {/* APP HEADER */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                  alt="Marcelo Oliveira"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#C8A15A]"
                />
                <div>
                  <h3 className="font-serif font-black text-white text-sm">Olá, Marcelo! 👋</h3>
                  <span className="text-[10px] text-slate-400 block">Cliente VIP Imperial</span>
                </div>
              </div>
              <div className="flex items-center space-x-1.5 bg-[#C8A15A] text-black px-2.5 py-1 rounded-full text-[10px] font-black">
                <Crown className="h-3.5 w-3.5 fill-black" />
                <span>180 PTS</span>
              </div>
            </div>

            {/* CLIENT TAB CONTENT */}
            <div className="flex-1 py-4 space-y-4 overflow-y-auto scrollbar-none">
              {/* TAB 1: HOME */}
              {clientTab === "home" && (
                <div className="space-y-4 animate-fade-in">
                  {/* NEXT APPOINTMENT HIGHLIGHT CARD */}
                  <div className="bg-gradient-to-br from-[#2D221A] via-[#202020] to-[#141414] p-4 rounded-2xl border-2 border-[#C8A15A] space-y-3 shadow-xl">
                    <div className="flex items-center justify-between">
                      <span className="bg-[#1F8A5B] text-white font-mono font-black px-2.5 py-0.5 rounded-full text-[10px] uppercase">
                        ✓ CONFIRMADO • HOJE ÁS 15:00
                      </span>
                      <span className="text-xs font-mono font-bold text-[#C8A15A]">R$ 95,00</span>
                    </div>

                    <div>
                      <h4 className="font-serif font-black text-white text-base">Combo Imperial (Corte + Barba)</h4>
                      <span className="text-xs text-slate-300 block">Barbeiro: <strong className="text-[#C8A15A]">Lucas Almeida</strong></span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Unidade Centro - Rua XV de Novembro, 450</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                      <a
                        href="https://wa.me/5515999887744"
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 bg-[#1F8A5B] text-white font-bold rounded-xl text-center flex items-center justify-center space-x-1"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>Falar no Whats</span>
                      </a>

                      <button
                        onClick={() => showToast("Instruções de rota enviadas para seu GPS!")}
                        className="py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-center flex items-center justify-center space-x-1"
                      >
                        <Navigation className="h-3.5 w-3.5 text-[#C8A15A]" />
                        <span>Abrir Rota</span>
                      </button>
                    </div>
                  </div>

                  {/* QUICK ACTIONS BUTTONS */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setClientTab("booking")}
                      className="p-3 bg-gradient-to-r from-[#B9854F] to-[#C8A15A] text-black font-black rounded-2xl shadow flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Scissors className="h-4 w-4" />
                      <span>Novo Agendamento</span>
                    </button>

                    <button
                      onClick={() => setClientTab("loyalty")}
                      className="p-3 bg-black/60 text-white border border-white/10 font-bold rounded-2xl flex items-center justify-center space-x-2 cursor-pointer hover:border-[#C8A15A]"
                    >
                      <Crown className="h-4 w-4 text-[#C8A15A]" />
                      <span>Resgatar Pontos</span>
                    </button>
                  </div>

                  {/* PROMO BANNER */}
                  <div className="bg-gradient-to-r from-purple-950/60 to-black p-4 rounded-2xl border border-purple-500/30 space-y-1 text-xs">
                    <span className="bg-purple-500 text-white font-black px-2 py-0.5 rounded text-[9px] uppercase">
                      OFERTA EXCLUSIVA
                    </span>
                    <h5 className="font-serif font-black text-white text-sm">20% OFF no seu Mês de Aniversário</h5>
                    <p className="text-[11px] text-slate-300">Use o cupom IMPERIAL_VIP no momento do agendamento.</p>
                  </div>
                </div>
              )}

              {/* TAB 2: BOOKING */}
              {clientTab === "booking" && (
                <div className="space-y-4 animate-fade-in text-xs">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h4 className="font-serif font-black text-white text-sm">Agendar Atendimento</h4>
                    <span className="text-[10px] text-[#C8A15A] font-bold">Passo {bookingStep} de 5</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-slate-400 block mb-1 font-bold">Escolha o Serviço:</label>
                      <select
                        onChange={(e) => setBookService(services.find((s) => s.id === e.target.value) || services[0])}
                        className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-white font-bold outline-none"
                      >
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} - R$ {s.price},00 ({s.durationMinutes} min)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1 font-bold">Escolha o Barbeiro:</label>
                      <select
                        onChange={(e) => setBookBarber(barbers.find((b) => b.id === e.target.value) || barbers[0])}
                        className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-white font-bold outline-none"
                      >
                        {barbers.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name} ({b.role})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-slate-400 block mb-1 font-bold">Data:</label>
                        <input
                          type="date"
                          value={bookDate}
                          onChange={(e) => setBookDate(e.target.value)}
                          className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-white font-bold outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1 font-bold">Horário:</label>
                        <input
                          type="text"
                          value={bookTime}
                          onChange={(e) => setBookTime(e.target.value)}
                          className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-white font-bold outline-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleCompleteBooking}
                      className="w-full py-3 bg-gradient-to-r from-[#B9854F] to-[#C8A15A] text-black font-black text-xs rounded-xl shadow-lg cursor-pointer mt-2"
                    >
                      Confirmar Agendamento
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: HISTORY */}
              {clientTab === "history" && (
                <div className="space-y-3 animate-fade-in text-xs">
                  <h4 className="font-serif font-black text-white text-sm">Seu Histórico na Imperial</h4>
                  <div className="space-y-2">
                    {appointments.map((a) => (
                      <div key={a.id} className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-white">{a.serviceName}</h5>
                          <span className="font-mono font-bold text-emerald-400">R$ {a.price},00</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>Barbeiro: {a.barberName}</span>
                          <span>Data: {a.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: LOYALTY */}
              {clientTab === "loyalty" && (
                <div className="space-y-4 animate-fade-in text-xs">
                  <div className="bg-gradient-to-r from-[#5A3928] to-[#1C1C1E] p-4 rounded-2xl border border-[#C8A15A]/40 space-y-3 text-center">
                    <Crown className="h-8 w-8 text-[#C8A15A] mx-auto" />
                    <div>
                      <h4 className="font-serif font-black text-white text-base">Clube Imperial VIP</h4>
                      <span className="text-2xl font-mono font-black text-[#C8A15A]">180 Pontos</span>
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="space-y-1">
                      <div className="w-full bg-black/60 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/10">
                        <div className="bg-gradient-to-r from-[#B9854F] to-[#C8A15A] h-full rounded-full w-[90%]" />
                      </div>
                      <span className="text-[10px] text-slate-300 block">Faltam apenas 20 pontos para 1 Corte Grátis!</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-serif font-black text-white text-xs">Recompensas Disponíveis</h5>
                    <div className="space-y-1.5">
                      <div className="p-2.5 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <strong className="text-white block">Chopp Artesanal IPA Extra</strong>
                          <span className="text-[10px] text-slate-400">50 Pontos</span>
                        </div>
                        <button
                          onClick={() => showToast("Cupom de Chopp Resgatado com sucesso!")}
                          className="px-3 py-1 bg-[#C8A15A] text-black font-bold rounded-lg text-[10px] cursor-pointer"
                        >
                          Resgatar
                        </button>
                      </div>

                      <div className="p-2.5 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                        <div>
                          <strong className="text-white block">Pomada Modeladora Matte</strong>
                          <span className="text-[10px] text-slate-400">120 Pontos</span>
                        </div>
                        <button
                          onClick={() => showToast("Cupom de Pomada Resgatado com sucesso!")}
                          className="px-3 py-1 bg-[#C8A15A] text-black font-bold rounded-lg text-[10px] cursor-pointer"
                        >
                          Resgatar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: PROFILE */}
              {clientTab === "profile" && (
                <div className="space-y-4 animate-fade-in text-xs text-center">
                  <div className="p-4 bg-black/40 rounded-2xl border border-white/10 space-y-2">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                      alt="Marcelo Oliveira"
                      className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-[#C8A15A]"
                    />
                    <h4 className="font-serif font-black text-white text-sm">Marcelo Oliveira</h4>
                    <span className="text-[10px] text-slate-400 block">(15) 99988-7744 • marcelo@email.com</span>
                    <span className="text-[10px] bg-[#C8A15A] text-black font-bold px-2 py-0.5 rounded inline-block">
                      Barbeiro Preferido: Lucas Almeida
                    </span>
                  </div>

                  <button
                    onClick={() => showToast("Dados atualizados com sucesso!")}
                    className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl cursor-pointer"
                  >
                    Editar Perfil
                  </button>
                </div>
              )}
            </div>

            {/* BOTTOM NAV BAR FOR CLIENT */}
            <div className="border-t border-white/10 pt-2 grid grid-cols-5 gap-1 text-[10px] text-center font-bold">
              {[
                { id: "home", label: "Início", icon: Scissors },
                { id: "booking", label: "Agendar", icon: CalendarDays },
                { id: "history", label: "Histórico", icon: Clock },
                { id: "loyalty", label: "Pontos", icon: Crown },
                { id: "profile", label: "Perfil", icon: User },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = clientTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setClientTab(tab.id as any)}
                    className={`py-1.5 flex flex-col items-center justify-center rounded-xl transition-all cursor-pointer ${
                      isActive ? "text-[#C8A15A] font-black bg-white/5" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 mb-0.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3 & MODE 4 MODALS */}
      {/* ========================================================================= */}
      {/* PUBLIC BOOKING SUCCESS MODAL */}
      {publicBookingSuccessAppt && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#202020] w-full max-w-md rounded-3xl border-2 border-[#C8A15A] p-6 space-y-6 text-center animate-slide-up shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#1F8A5B]/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] bg-[#C8A15A] text-black font-mono font-black px-3 py-1 rounded-full uppercase">
                CÓDIGO #IMP-8291
              </span>
              <h3 className="font-serif font-black text-2xl text-white pt-2">Agendamento Confirmado!</h3>
              <p className="text-xs text-slate-300">Enviamos os detalhes para o seu WhatsApp.</p>
            </div>

            <div className="bg-black/50 p-4 rounded-2xl border border-white/10 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">Cliente:</span>
                <span className="font-bold text-white">{publicBookingSuccessAppt.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Serviço:</span>
                <span className="font-bold text-white">{publicBookingSuccessAppt.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Barbeiro:</span>
                <span className="font-bold text-[#C8A15A]">{publicBookingSuccessAppt.barberName}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2">
                <span className="text-slate-400">Data e Horário:</span>
                <span className="font-bold text-white">{publicBookingSuccessAppt.date} às {publicBookingSuccessAppt.time}</span>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={`https://wa.me/5515999887744?text=Olá,%20confirmo%20meu%20agendamento%20de%20${publicBookingSuccessAppt.serviceName}%20para%20${publicBookingSuccessAppt.date}%20às%20${publicBookingSuccessAppt.time}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#1F8A5B] text-white font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2 block"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Enviar WhatsApp da Barbearia</span>
              </a>

              <button
                onClick={() => setPublicBookingSuccessAppt(null)}
                className="w-full py-2.5 bg-white/10 text-white font-bold text-xs rounded-xl hover:bg-white/20 transition-all cursor-pointer"
              >
                Fechar janela
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD CLIENT MODAL */}
      {showAddClientModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#202020] w-full max-w-md rounded-3xl border border-white/10 p-6 space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif font-black text-white text-base">Cadastrar Novo Cliente</h3>
              <button onClick={() => setShowAddClientModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddClient} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full bg-[#141414] border border-white/20 rounded-xl px-3.5 py-2 text-white font-bold outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Telefone WhatsApp</label>
                <input
                  type="text"
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  placeholder="(15) 99999-0000"
                  className="w-full bg-[#141414] border border-white/20 rounded-xl px-3.5 py-2 text-white font-bold outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">E-mail</label>
                <input
                  type="email"
                  value={newClientEmail}
                  onChange={(e) => setNewClientEmail(e.target.value)}
                  className="w-full bg-[#141414] border border-white/20 rounded-xl px-3.5 py-2 text-white font-bold outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C8A15A] text-black font-black text-xs rounded-xl shadow cursor-pointer mt-2"
              >
                Salvar Cliente
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD BARBER MODAL */}
      {showAddBarberModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#202020] w-full max-w-md rounded-3xl border border-white/10 p-6 space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif font-black text-white text-base">Cadastrar Barbeiro</h3>
              <button onClick={() => setShowAddBarberModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddBarber} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Nome do Barbeiro</label>
                <input
                  type="text"
                  required
                  value={newBarberName}
                  onChange={(e) => setNewBarberName(e.target.value)}
                  className="w-full bg-[#141414] border border-white/20 rounded-xl px-3.5 py-2 text-white font-bold outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Cargo / Especialidade</label>
                <input
                  type="text"
                  value={newBarberRole}
                  onChange={(e) => setNewBarberRole(e.target.value)}
                  className="w-full bg-[#141414] border border-white/20 rounded-xl px-3.5 py-2 text-white font-bold outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C8A15A] text-black font-black text-xs rounded-xl shadow cursor-pointer mt-2"
              >
                Adicionar à Equipe
              </button>
            </form>
          </div>
        </div>
      )}

      {/* APPOINTMENT MANAGING MODAL */}
      {selectedAppointmentModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#202020] w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-white/10 p-6 space-y-4 text-left animate-slide-up shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-serif font-black text-white text-base">Detalhes do Agendamento</span>
              <button
                onClick={() => setSelectedAppointmentModal(null)}
                className="p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between bg-black/40 p-3 rounded-2xl border border-white/5">
                <div>
                  <h4 className="font-bold text-white text-sm">{selectedAppointmentModal.clientName}</h4>
                  <span className="text-[11px] text-slate-400">{selectedAppointmentModal.clientPhone}</span>
                </div>
                <span className="font-mono font-black text-[#C8A15A] text-sm">{selectedAppointmentModal.time}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-bold block text-[10px]">Serviço Agendado:</span>
                <span className="font-bold text-white block">{selectedAppointmentModal.serviceName} ({selectedAppointmentModal.durationMinutes} min)</span>
                <span className="font-mono font-black text-emerald-400 block text-sm">R$ {selectedAppointmentModal.price},00</span>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-slate-400 font-bold block text-[10px]">Alterar Status:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleUpdateApptStatus(selectedAppointmentModal.id, "Cliente chegou")}
                    className="py-2 bg-cyan-600/30 text-cyan-300 font-bold rounded-xl border border-cyan-500/30 cursor-pointer text-center"
                  >
                    Cliente Chegou
                  </button>
                  <button
                    onClick={() => handleUpdateApptStatus(selectedAppointmentModal.id, "Em atendimento")}
                    className="py-2 bg-purple-600/30 text-purple-300 font-bold rounded-xl border border-purple-500/30 cursor-pointer text-center"
                  >
                    Em Atendimento
                  </button>
                  <button
                    onClick={() => handleUpdateApptStatus(selectedAppointmentModal.id, "Finalizado")}
                    className="py-2 bg-emerald-600 text-black font-black rounded-xl cursor-pointer text-center"
                  >
                    Concluir Serviço
                  </button>
                  <button
                    onClick={() => handleUpdateApptStatus(selectedAppointmentModal.id, "Cancelado")}
                    className="py-2 bg-red-600/30 text-red-300 font-bold rounded-xl border border-red-500/30 cursor-pointer text-center"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
