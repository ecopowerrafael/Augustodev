import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wrench,
  Search,
  MapPin,
  Star,
  CheckCircle2,
  ShieldCheck,
  Clock,
  DollarSign,
  Send,
  FileText,
  Upload,
  User,
  Briefcase,
  Award,
  ChevronRight,
  ChevronDown,
  Filter,
  ArrowRight,
  ArrowLeft,
  X,
  Phone,
  MessageSquare,
  Sparkles,
  Zap,
  TrendingUp,
  CreditCard,
  QrCode,
  Lock,
  Calendar,
  AlertTriangle,
  Flame,
  Gift,
  LayoutDashboard,
  Users,
  PieChart as PieChartIcon,
  Bell,
  Heart,
  Share2,
  Plus,
  Check,
  RefreshCw,
  Eye,
  FileCheck,
  CheckSquare,
  HelpCircle,
  Download,
  Percent,
  Compass,
  ListOrdered,
  Layers,
  Sliders,
  Camera,
  Map,
  ShieldAlert,
  SlidersHorizontal,
  ThumbsUp,
  BadgeCheck,
  Wallet,
  Menu
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";

interface TaNaMaoAppProps {
  onBack?: () => void;
}

// ---------------------------------------------------------------------------
// DATA TYPES & MOCK DATA
// ---------------------------------------------------------------------------

interface Provider {
  id: string;
  name: string;
  role: string;
  category: string;
  rating: number;
  reviewsCount: number;
  completedJobs: number;
  distanceKm: number;
  startingPrice: number;
  availability: string;
  badges: string[];
  photo: string;
  bio: string;
  services: string[];
  responseTime: string;
  verified: boolean;
  memberSince: string;
}

const MOCK_PROVIDERS: Provider[] = [
  {
    id: "prov-1",
    name: "Carlos Henrique",
    role: "Eletricista Residencial & Comercial",
    category: "Eletricista",
    rating: 4.9,
    reviewsCount: 238,
    completedJobs: 412,
    distanceKm: 2.3,
    startingPrice: 90,
    availability: "Hoje às 15:00",
    badges: ["Identidade Verificada", "Profissional Destaque", "Superprestador", "+400 Serviços"],
    photo: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80",
    bio: "Eletricista com mais de 12 anos de experiência em instalações elétricas, quadros de distribuição, iluminação de LED, ventiladores e chuveiros. Atendimento com garantia e nota.",
    services: ["Instalação de Ventilador", "Troca de Chuveiro", "Revisão Elétrica", "Quadro de Distribuição", "Iluminação LED"],
    responseTime: "8 min",
    verified: true,
    memberSince: "2022"
  },
  {
    id: "prov-2",
    name: "Roberto Almeida",
    role: "Encanador e Caça-Vazamentos",
    category: "Encanador",
    rating: 4.8,
    reviewsCount: 184,
    completedJobs: 297,
    distanceKm: 3.1,
    startingPrice: 80,
    availability: "Em até 2 horas",
    badges: ["Identidade Verificada", "Resposta Rápida", "Selo Prata"],
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    bio: "Especialista em desentupimento, instalação de torneiras, caixas d'água, vazamentos não visíveis e pressurizadores de água.",
    services: ["Reparo de Vazamento", "Instalação de Torneira", "Limpeza de Caixa d'Água", "Desentupimento sem Quebrar"],
    responseTime: "12 min",
    verified: true,
    memberSince: "2023"
  },
  {
    id: "prov-3",
    name: "Juliana Souza",
    role: "Especialista em Limpeza Residencial",
    category: "Limpeza residencial",
    rating: 5.0,
    reviewsCount: 126,
    completedJobs: 203,
    distanceKm: 1.8,
    startingPrice: 160,
    availability: "Amanhã",
    badges: ["Profissional Destaque", "Superprestadora", "Pontualidade 100%"],
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    bio: "Serviço de faxina detalhada, pós-obra, pré-mudança e higienização profunda. Utilizo produtos próprios e equipamentos de ponta.",
    services: ["Faxina Completa", "Limpeza Pós-Obra", "Higienização de Estofados", "Organização de Armários"],
    responseTime: "5 min",
    verified: true,
    memberSince: "2021"
  },
  {
    id: "prov-4",
    name: "Marcos Vinícius",
    role: "Montador de Móveis Profissional",
    category: "Montador de móveis",
    rating: 4.7,
    reviewsCount: 98,
    completedJobs: 156,
    distanceKm: 4.6,
    startingPrice: 120,
    availability: "Hoje às 17:00",
    badges: ["Identidade Verificada", "Garantia 90 Dias"],
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    bio: "Montagem e desmontagem de armários, guarda-roupas planejados, painéis de TV e móveis de escritório com agilidade e ferramentas adequadas.",
    services: ["Montagem de Guarda-Roupa", "Painel de TV na Parede", "Cozinha Planejada", "Desmontagem para Mudança"],
    responseTime: "15 min",
    verified: true,
    memberSince: "2023"
  }
];

interface Proposal {
  id: string;
  providerId: string;
  providerName: string;
  providerRating: number;
  providerPhoto: string;
  value: number;
  timeSlot: string;
  warrantyDays: number;
  message: string;
  recommended?: boolean;
}

const MOCK_PROPOSALS: Proposal[] = [
  {
    id: "prop-1",
    providerId: "prov-1",
    providerName: "Carlos Henrique",
    providerRating: 4.9,
    providerPhoto: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80",
    value: 150.00,
    timeSlot: "Hoje às 15:00",
    warrantyDays: 90,
    message: "Olá, Marcelo! Posso realizar a instalação hoje mesmo às 15h. O valor inclui a verificação preventiva da fiação, fixação reforçada no teto e testes da iluminação.",
    recommended: true
  },
  {
    id: "prop-2",
    providerId: "prov-2",
    providerName: "Eduardo Lima",
    providerRating: 4.7,
    providerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    value: 120.00,
    timeSlot: "Hoje às 17:30",
    warrantyDays: 30,
    message: "Consigo atender hoje no final da tarde. Serviço limpo e com montagem completa do ventilador de teto."
  },
  {
    id: "prop-3",
    providerId: "prov-3",
    providerName: "João Ribeiro",
    providerRating: 5.0,
    providerPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    value: 170.00,
    timeSlot: "Amanhã às 09:00",
    warrantyDays: 90,
    message: "Eletricista credenciado pelo CREA. Inclui verificação com multímetro, disjuntor dedicado se preciso e limpeza do local."
  }
];

const CATEGORIES = [
  { name: "Eletricista", icon: Zap, color: "bg-amber-500/10 text-amber-600 border-amber-200" },
  { name: "Encanador", icon: Wrench, color: "bg-blue-500/10 text-blue-600 border-blue-200" },
  { name: "Pedreiro", icon: Layers, color: "bg-stone-500/10 text-stone-600 border-stone-200" },
  { name: "Pintor", icon: Sparkles, color: "bg-purple-500/10 text-purple-600 border-purple-200" },
  { name: "Montador de móveis", icon: Wrench, color: "bg-orange-500/10 text-orange-600 border-orange-200" },
  { name: "Limpeza residencial", icon: Sparkles, color: "bg-emerald-500/10 text-emerald-600 border-emerald-200" },
  { name: "Jardinagem", icon: Compass, color: "bg-green-500/10 text-green-600 border-green-200" },
  { name: "Marido de aluguel", icon: User, color: "bg-indigo-500/10 text-indigo-600 border-indigo-200" },
  { name: "Técnico de informática", icon: Zap, color: "bg-cyan-500/10 text-cyan-600 border-cyan-200" },
  { name: "Assistência eletrodomésticos", icon: RefreshCw, color: "bg-teal-500/10 text-teal-600 border-teal-200" },
  { name: "Chaveiro 24h", icon: Lock, color: "bg-rose-500/10 text-rose-600 border-rose-200" },
  { name: "Frete e mudanças", icon: Compass, color: "bg-[#1769E0]/10 text-[#1769E0] border-blue-200" }
];

export default function TaNaMaoApp({ onBack }: TaNaMaoAppProps) {
  // App Role / View Mode: "client" | "provider" | "admin"
  const [activeRole, setActiveRole] = useState<"client" | "provider" | "admin">("client");
  
  // Navigation Tabs for Client View
  const [clientTab, setClientTab] = useState<"home" | "explore" | "orders" | "chat" | "profile" | "gamification">("home");
  
  // Navigation Tabs for Provider View
  const [providerTab, setProviderTab] = useState<"dashboard" | "opportunities" | "jobs" | "wallet" | "profile">("dashboard");

  // Onboarding / Splash state
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [onboardingStep, setOnboardingStep] = useState<number>(0);

  // Job Request Wizard State
  const [isRequestWizardOpen, setIsRequestWizardOpen] = useState<boolean>(false);
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [requestData, setRequestData] = useState({
    category: "Eletricista",
    serviceType: "Instalação de ventilador de teto",
    description: "Preciso instalar um ventilador de teto com luminária no quarto principal. Já tenho o aparelho novo na caixa, mas preciso verificar se a fiação do teto está adequada.",
    address: "Rua da Consolação, 245 – Centro, Sorocaba/SP",
    dateTime: "Hoje, entre 14:00 e 17:00",
    hireType: "Receber propostas",
    budgetLimit: "Até R$ 180,00"
  });

  // Selected Provider for Details Modal
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  // Active Contract & Escrow Flow State
  const [hasActiveContract, setHasActiveContract] = useState<boolean>(true);
  const [contractSigned, setContractSigned] = useState<boolean>(true);
  const [paymentDone, setPaymentDone] = useState<boolean>(true);
  const [serviceStatus, setServiceStatus] = useState<"en_route" | "in_progress" | "extra_requested" | "completed" | "approved">("en_route");
  const [showContractModal, setShowContractModal] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [showRatingModal, setShowRatingModal] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(5);
  const [userComment, setUserComment] = useState<string>("Carlos foi extremamente pontual, explicou tudo antes de começar e deixou o ambiente limpo. Serviço impecável!");

  // Extra Charge Request Simulation
  const [extraCharge, setExtraCharge] = useState<{ amount: number; reason: string; approved: boolean } | null>({
    amount: 18.00,
    reason: "Substituição do conector cerâmico queimado da fiação antiga",
    approved: false
  });

  // Chat Simulation State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "me" | "provider"; text: string; time: string }>>([
    { sender: "provider", text: "Olá, Marcelo! Vi sua solicitação para instalar o ventilador de teto.", time: "14:02" },
    { sender: "me", text: "Olá Carlos! Você consegue verificar se a fiação do teto precisa de algum ajuste?", time: "14:04" },
    { sender: "provider", text: "Com certeza. Faço a verificação de voltagem e fiação com multímetro antes de fixar. Tudo incluso na proposta de R$ 150,00 com garantia de 90 dias.", time: "14:06" }
  ]);
  const [inputMsg, setInputMsg] = useState<string>("");

  // Notification Drawer
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Simulate auto response in Chat
  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    const newMsg = { sender: "me" as const, text: inputMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, newMsg]);
    setInputMsg("");
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: "provider", text: "Entendido! Já estou preparando as ferramentas e inicio o deslocamento para o seu endereço.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#182230] font-sans relative antialiased selection:bg-[#1769E0]/20 selection:text-[#0D326E]">
      
      {/* ========================================================================= */}
      {/* GLOBAL TOAST NOTIFICATION */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-[#0D326E] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#F4B740]/40 flex items-center space-x-3 text-xs font-bold"
          >
            <CheckCircle2 className="h-5 w-5 text-[#16A36A]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* TOP APPS ROLE SWITCHER HEADER */}
      {/* ========================================================================= */}
      <header className="bg-[#0D326E] text-white py-2.5 px-4 sticky top-0 z-40 shadow-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          
          {/* LOGO & BRAND */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setActiveRole("client"); setClientTab("home"); }}>
            <div className="w-8 h-8 rounded-xl bg-[#1769E0] flex items-center justify-center text-white font-black shadow-inner">
              <Wrench className="h-4 w-4" />
            </div>
            <div className="text-left">
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-base tracking-tight text-white">TáNáMão</span>
                <span className="bg-[#F4B740] text-black text-[9px] font-black px-1.5 py-0.2 rounded uppercase">PROTÓTIPO</span>
              </div>
              <span className="text-[10px] text-white/70 block -mt-0.5">O profissional certo, na hora que você precisa.</span>
            </div>
          </div>

          {/* ROLE ENVIRONMENT SWITCHER */}
          <div className="flex items-center space-x-2">
            <div className="bg-white/10 p-1 rounded-xl flex items-center space-x-1 text-xs font-bold">
              <button
                onClick={() => { setActiveRole("client"); setClientTab("home"); }}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
                  activeRole === "client" ? "bg-[#1769E0] text-white shadow-sm" : "text-white/70 hover:text-white"
                }`}
              >
                <User className="h-3.5 w-3.5" />
                <span>App Cliente</span>
              </button>

              <button
                onClick={() => { setActiveRole("provider"); setProviderTab("dashboard"); }}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
                  activeRole === "provider" ? "bg-[#16A36A] text-white shadow-sm" : "text-white/70 hover:text-white"
                }`}
              >
                <Briefcase className="h-3.5 w-3.5" />
                <span>App Prestador</span>
              </button>

              <button
                onClick={() => setActiveRole("admin")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
                  activeRole === "admin" ? "bg-[#F97316] text-white shadow-sm" : "text-white/70 hover:text-white"
                }`}
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>Painel Admin</span>
              </button>
            </div>

            {onBack && (
              <button
                onClick={onBack}
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center space-x-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Portfólio</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* PERSPECTIVE 1: CLIENT MOBILE APP */}
      {/* ========================================================================= */}
      {activeRole === "client" && (
        <div className="max-w-md mx-auto min-h-[calc(100vh-50px)] bg-white shadow-2xl relative flex flex-col justify-between pb-20 border-x border-slate-200">
          
          {/* CLIENT TOP BAR */}
          <div className="bg-[#1769E0] text-white p-4 space-y-3 rounded-b-2xl shadow-sm text-left sticky top-[48px] z-30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center font-bold text-sm">
                  MO
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-sm">Olá, Marcelo! 👋</span>
                    <span className="bg-[#F4B740] text-black text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase">OURO</span>
                  </div>
                  <div className="flex items-center text-xs text-white/80 space-x-1">
                    <MapPin className="h-3 w-3 text-[#F4B740]" />
                    <span>Centro, Sorocaba – SP</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 relative cursor-pointer"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#F97316] rounded-full border-2 border-[#1769E0]" />
              </button>
            </div>

            {/* SEARCH INPUT */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Busque por eletricista, encanador, diarista..."
                className="w-full bg-white text-slate-900 placeholder:text-slate-400 pl-10 pr-10 py-2.5 rounded-xl text-xs font-medium outline-none shadow-inner"
              />
            </div>
          </div>

          {/* MAIN CLIENT TAB CONTENT */}
          <div className="p-4 space-y-6 text-left flex-1 overflow-y-auto">
            
            {/* TAB: HOME */}
            {clientTab === "home" && (
              <div className="space-y-6 animate-fade-in">
                
                {/* HERO BANNER CARD */}
                <div className="bg-gradient-to-r from-[#0D326E] to-[#1769E0] rounded-2xl p-5 text-white shadow-lg space-y-3 relative overflow-hidden">
                  <div className="w-24 h-24 rounded-full bg-white/10 absolute -right-6 -bottom-6 blur-xl" />
                  <span className="bg-[#F4B740] text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">Atendimento Ágil</span>
                  <h2 className="text-lg font-black leading-tight">Precisando de ajuda na sua casa ou empresa?</h2>
                  <p className="text-xs text-white/80">Publique sua necessidade e receba propostas de profissionais verificados próximos em minutos.</p>
                  
                  <button
                    onClick={() => { setIsRequestWizardOpen(true); setWizardStep(1); }}
                    className="px-5 py-2.5 bg-[#F4B740] hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl shadow cursor-pointer transition-all flex items-center space-x-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Pedir um Serviço Agora</span>
                  </button>
                </div>

                {/* ACTIVE SERVICE TRACKER CARD (IF ACTIVE) */}
                {hasActiveContract && (
                  <div className="bg-emerald-50 border-2 border-[#16A36A]/30 rounded-2xl p-4 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#16A36A] animate-ping" />
                        <span className="text-xs font-black text-[#16A36A] uppercase tracking-wider">Serviço em Andamento</span>
                      </div>
                      <span className="text-[10px] bg-emerald-200 text-[#0D326E] font-bold px-2 py-0.5 rounded">CT-2026-008421</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <img src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80" className="w-12 h-12 rounded-xl object-cover border border-[#16A36A]" alt="Carlos Henrique" />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">Instalação de Ventilador de Teto</h4>
                        <p className="text-xs text-slate-600">Prestador: <strong className="text-slate-800">Carlos Henrique</strong></p>
                      </div>
                    </div>

                    {/* TIMELINE PROGRESS */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-600">
                        <span>Status: <strong className="text-[#16A36A]">Profissional a caminho (2.3 km)</strong></span>
                        <span>ETA: 14:52</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#16A36A] transition-all duration-500" style={{ width: serviceStatus === "en_route" ? "35%" : serviceStatus === "in_progress" ? "65%" : "100%" }} />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => setClientTab("orders")}
                        className="flex-1 py-2 bg-[#1769E0] text-white font-bold text-xs rounded-xl hover:bg-[#0D326E] transition-colors"
                      >
                        Acompanhar Rota
                      </button>
                      <button
                        onClick={() => setClientTab("chat")}
                        className="py-2 px-3 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl flex items-center space-x-1"
                      >
                        <MessageSquare className="h-3.5 w-3.5 text-[#1769E0]" />
                        <span>Chat</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* POPULAR CATEGORIES GRID */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900">Categorias Populares</h3>
                    <button onClick={() => setClientTab("explore")} className="text-xs text-[#1769E0] font-bold hover:underline">Ver todas (20)</button>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {CATEGORIES.slice(0, 8).map((cat, i) => {
                      const Icon = cat.icon;
                      return (
                        <div
                          key={i}
                          onClick={() => {
                            setRequestData(prev => ({ ...prev, category: cat.name }));
                            setIsRequestWizardOpen(true);
                            setWizardStep(1);
                          }}
                          className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1.5 cursor-pointer hover:border-[#1769E0] transition-all group"
                        >
                          <div className={`w-9 h-9 rounded-xl mx-auto flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-700 block truncate">{cat.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* NEARBY PROS LIST */}
                <div className="space-y-3">
                  <h3 className="font-bold text-sm text-slate-900">Profissionais Recomendados Próximos</h3>

                  <div className="space-y-3">
                    {MOCK_PROVIDERS.map((prov) => (
                      <div
                        key={prov.id}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:border-[#1769E0] transition-colors text-left"
                      >
                        <div className="flex items-start space-x-3">
                          <img src={prov.photo} className="w-14 h-14 rounded-2xl object-cover border border-slate-200" alt={prov.name} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-sm text-slate-900 truncate">{prov.name}</h4>
                              <span className="text-xs font-black text-[#16A36A]">A partir de R$ {prov.startingPrice}</span>
                            </div>
                            <p className="text-xs text-slate-500 font-medium">{prov.role}</p>

                            <div className="flex items-center space-x-2 pt-1 text-[11px]">
                              <div className="flex items-center text-amber-500 font-bold space-x-0.5">
                                <Star className="h-3.5 w-3.5 fill-amber-400" />
                                <span>{prov.rating}</span>
                                <span className="text-slate-400">({prov.reviewsCount})</span>
                              </div>
                              <span className="text-slate-300">•</span>
                              <span className="text-slate-500 font-medium">{prov.distanceKm} km de você</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {prov.badges.map((b, bi) => (
                            <span key={bi} className="text-[9px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded">
                              {b}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => setSelectedProvider(prov)}
                            className="flex-1 py-2 bg-[#EAF2FF] text-[#1769E0] hover:bg-[#1769E0] hover:text-white font-bold text-xs rounded-xl transition-colors"
                          >
                            Ver Perfil Completo
                          </button>
                          <button
                            onClick={() => {
                              setRequestData(prev => ({ ...prev, category: prov.category }));
                              setIsRequestWizardOpen(true);
                              setWizardStep(1);
                            }}
                            className="py-2 px-3 bg-[#1769E0] text-white font-bold text-xs rounded-xl hover:bg-[#0D326E]"
                          >
                            Contratar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* GAMIFICATION PROMO CARD */}
                <div
                  onClick={() => setClientTab("gamification")}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-4 text-black font-bold flex items-center justify-between cursor-pointer shadow-md"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] bg-black/20 text-white font-extrabold px-2 py-0.5 rounded uppercase">Sua Gamificação</span>
                    <h4 className="text-sm font-black text-white">Você é Cliente Ouro ⭐ (1.280 Pts)</h4>
                    <p className="text-[11px] text-white/90">Troque pontos por cupons de R$ 25,00 de desconto.</p>
                  </div>
                  <ChevronRight className="h-6 w-6 text-white" />
                </div>

              </div>
            )}

            {/* TAB: EXPLORE / PROPOSALS & COMPARISON */}
            {clientTab === "explore" && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1">
                  <h2 className="text-base font-black text-slate-900">Propostas Recebidas para Ventilador</h2>
                  <p className="text-xs text-slate-500">Compare valores, prazos e qualificações dos prestadores interessados.</p>
                </div>

                {/* PROPOSALS LIST */}
                <div className="space-y-4">
                  {MOCK_PROPOSALS.map((prop) => (
                    <div key={prop.id} className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-sm space-y-3 relative text-left">
                      {prop.recommended && (
                        <div className="absolute top-0 right-0 bg-[#F4B740] text-black font-black text-[9px] px-3 py-1 rounded-bl-xl uppercase">
                          Melhor Custo-Benefício
                        </div>
                      )}

                      <div className="flex items-center space-x-3">
                        <img src={prop.providerPhoto} className="w-12 h-12 rounded-xl object-cover border" alt={prop.providerName} />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{prop.providerName}</h4>
                          <div className="flex items-center space-x-1 text-xs text-amber-500 font-bold">
                            <Star className="h-3.5 w-3.5 fill-amber-400" />
                            <span>{prop.providerRating}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-xl border border-slate-100">{prop.message}</p>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold bg-[#EAF2FF] p-2.5 rounded-xl text-[#0D326E]">
                        <div>
                          <span className="text-[10px] text-slate-500 block">Valor</span>
                          <span className="text-sm text-[#16A36A] font-black">R$ {prop.value.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Horário</span>
                          <span>{prop.timeSlot}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Garantia</span>
                          <span>{prop.warrantyDays} dias</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => setClientTab("chat")}
                          className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                        >
                          Negociar pelo Chat
                        </button>
                        <button
                          onClick={() => setShowContractModal(true)}
                          className="flex-1 py-2 bg-[#1769E0] hover:bg-[#0D326E] text-white font-bold text-xs rounded-xl shadow"
                        >
                          Aceitar e Assinar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SIDE-BY-SIDE COMPARISON TABLE */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Tabela Comparativa de Propostas</h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-[11px]">
                      <thead>
                        <tr className="border-b border-slate-200 font-bold text-slate-500">
                          <th className="p-2">Item</th>
                          <th className="p-2 text-center text-[#1769E0]">Carlos H.</th>
                          <th className="p-2 text-center">Eduardo L.</th>
                          <th className="p-2 text-center">João R.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        <tr>
                          <td className="p-2 font-bold">Valor Total</td>
                          <td className="p-2 text-center text-[#16A36A] font-bold">R$ 150,00</td>
                          <td className="p-2 text-center">R$ 120,00</td>
                          <td className="p-2 text-center">R$ 170,00</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold">Avaliação</td>
                          <td className="p-2 text-center font-bold">4.9 ★</td>
                          <td className="p-2 text-center">4.7 ★</td>
                          <td className="p-2 text-center">5.0 ★</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold">Garantia</td>
                          <td className="p-2 text-center font-bold">90 dias</td>
                          <td className="p-2 text-center">30 dias</td>
                          <td className="p-2 text-center">90 dias</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold">Horário</td>
                          <td className="p-2 text-center font-bold">Hoje 15h</td>
                          <td className="p-2 text-center">Hoje 17h30</td>
                          <td className="p-2 text-center">Amanhã 9h</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB: ORDERS & ACTIVE EXECUTION TRACKER */}
            {clientTab === "orders" && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1">
                  <h2 className="text-base font-black text-slate-900">Acompanhamento do Serviço</h2>
                  <p className="text-xs text-slate-500">Linha do tempo interativa e liberação de pagamento protegido em garantia.</p>
                </div>

                {/* TIMELINE PROGRESS CARD */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Protocolo do Pedido</span>
                      <span className="font-mono text-sm font-black text-[#1769E0]">CT-2026-008421</span>
                    </div>
                    <span className="bg-emerald-100 text-[#16A36A] text-xs font-bold px-2.5 py-1 rounded-full">
                      {serviceStatus === "en_route" ? "A Caminho" : serviceStatus === "in_progress" ? "Em Execução" : serviceStatus === "extra_requested" ? "Extra Solicitado" : "Concluído"}
                    </span>
                  </div>

                  {/* INTERACTIVE TIMELINE STEPS */}
                  <div className="space-y-3 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                    {[
                      { title: "Solicitação publicada", desc: "24/07 às 13:40", done: true },
                      { title: "Proposta aceita & Contrato assinado", desc: "Carlos Henrique • R$ 157,50", done: true },
                      { title: "Pagamento em Garantia Retido", desc: "Protegido via Pix/TáNáMão Escrow", done: true },
                      { title: "Profissional a caminho", desc: "Aproximando-se do seu endereço (2.3 km)", done: true, current: serviceStatus === "en_route" },
                      { title: "Execução & Testes do Ventilador", desc: "Verificação de fiação e montagem", done: serviceStatus !== "en_route", current: serviceStatus === "in_progress" || serviceStatus === "extra_requested" },
                      { title: "Aprovação & Liberação de Valor", desc: "Libere o pagamento após conferir", done: serviceStatus === "completed" || serviceStatus === "approved" }
                    ].map((st, sidx) => (
                      <div key={sidx} className="flex items-start space-x-3 relative z-10">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border-2 ${
                          st.done ? "bg-[#16A36A] text-white border-[#16A36A]" : "bg-white text-slate-400 border-slate-300"
                        }`}>
                          {st.done ? <Check className="h-3.5 w-3.5" /> : sidx + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-xs text-slate-900">{st.title}</h4>
                          <p className="text-[11px] text-slate-500">{st.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* SIMULATED MAP LOCATION PREVIEW */}
                  <div className="relative h-32 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80" className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Mapa" />
                    <div className="relative bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-300 shadow flex items-center space-x-2 text-xs font-bold text-slate-800">
                      <MapPin className="h-4 w-4 text-[#1769E0] animate-bounce" />
                      <span>Carlos a 1.8 km (Chegada em 8 min)</span>
                    </div>
                  </div>

                  {/* EXTRA CHARGE APPROVAL PROMPT (IF APPLICABLE) */}
                  {extraCharge && !extraCharge.approved && (
                    <div className="bg-amber-50 border border-amber-300 rounded-xl p-3.5 space-y-2 text-left">
                      <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <span>Solicitação de Valor Adicional pelo Prestador</span>
                      </div>
                      <p className="text-xs text-slate-700">{extraCharge.reason}</p>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span>Valor Adicional: <strong className="text-[#16A36A]">R$ {extraCharge.amount.toFixed(2)}</strong></span>
                        <button
                          onClick={() => {
                            setExtraCharge(prev => prev ? { ...prev, approved: true } : null);
                            showToast("Valor adicional aprovado!");
                          }}
                          className="px-3 py-1.5 bg-[#16A36A] text-white rounded-lg text-xs hover:bg-emerald-700 font-bold"
                        >
                          Aprovar R$ 18,00
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ACTION BUTTONS FOR SERVICE COMPLETION */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => {
                        setServiceStatus("completed");
                        setShowRatingModal(true);
                      }}
                      className="w-full py-3 bg-[#16A36A] hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow transition-all cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Aprovar Serviço e Liberar Pagamento (R$ 150,00)</span>
                    </button>

                    <button
                      onClick={() => showToast("Solicitação de suporte aberta com a central TáNáMão.")}
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                    >
                      Reportar Problema / Abrir Disputa
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: CHAT */}
            {clientTab === "chat" && (
              <div className="space-y-4 animate-fade-in flex flex-col h-[480px]">
                <div className="flex items-center space-x-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm text-left">
                  <img src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80" className="w-10 h-10 rounded-full object-cover border" alt="Carlos" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Carlos Henrique (Eletricista)</h4>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Online agora</span>
                    </span>
                  </div>
                </div>

                {/* MESSAGES SCROLL AREA */}
                <div className="flex-1 bg-white p-4 rounded-2xl border border-slate-200 overflow-y-auto space-y-3 text-left">
                  <div className="text-center text-[10px] text-slate-400 font-bold my-2">
                    Conversa criptografada e protegida pela plataforma TáNáMão
                  </div>

                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl text-xs space-y-1 ${
                        msg.sender === "me"
                          ? "bg-[#1769E0] text-white rounded-tr-none"
                          : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200"
                      }`}>
                        <p>{msg.text}</p>
                        <span className={`text-[9px] block text-right font-medium ${msg.sender === "me" ? "text-white/70" : "text-slate-400"}`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* INPUT BAR */}
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-[#1769E0]"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2.5 bg-[#1769E0] hover:bg-[#0D326E] text-white rounded-xl shadow cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB: GAMIFICATION */}
            {clientTab === "gamification" && (
              <div className="space-y-6 animate-fade-in text-left">
                <div className="bg-gradient-to-br from-[#0D326E] via-[#1769E0] to-indigo-700 p-6 rounded-2xl text-white space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] bg-amber-400 text-black font-black px-2.5 py-0.5 rounded-full uppercase">SEU NÍVEL ATUAL</span>
                      <h2 className="text-xl font-black pt-1">Cliente Ouro ⭐</h2>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-[#F4B740]">1.280</span>
                      <span className="text-xs text-white/70 block">Pontos TáNáMão</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-white/80">
                      <span>Próximo nível: Cliente Diamante</span>
                      <span>1.280 / 1.500 pts</span>
                    </div>
                    <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-[#F4B740]" style={{ width: "85%" }} />
                    </div>
                  </div>
                </div>

                {/* REDEEM COUPONS */}
                <div className="space-y-3">
                  <h3 className="font-bold text-sm text-slate-900">Resgate de Recompensas</h3>

                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { pts: 500, title: "Cupom R$ 10,00 OFF", code: "MAO10", unlocked: true },
                      { pts: 1000, title: "Cupom R$ 25,00 OFF", code: "MAO25", unlocked: true },
                      { pts: 1500, title: "Taxa de Proteção Grátis", code: "FRETEZERO", unlocked: false }
                    ].map((rw, rwi) => (
                      <div key={rwi} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">{rw.title}</h4>
                          <span className="text-[11px] text-amber-600 font-bold">{rw.pts} pontos exigidos</span>
                        </div>
                        <button
                          onClick={() => showToast(`Cupom ${rw.code} resgatado!`)}
                          disabled={!rw.unlocked}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                            rw.unlocked ? "bg-[#1769E0] text-white hover:bg-[#0D326E]" : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {rw.unlocked ? "Resgatar" : "Bloqueado"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PROFILE */}
            {clientTab === "profile" && (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-[#1769E0] text-white font-bold text-xl mx-auto flex items-center justify-center border-2 border-slate-200">
                    MO
                  </div>
                  <h3 className="font-black text-base text-slate-900">Marcelo Oliveira</h3>
                  <span className="text-xs bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full">Cliente Ouro ⭐</span>
                  <p className="text-xs text-slate-500">marcelo@tanamao.app • (15) 99811-2233</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 text-xs font-bold text-slate-700">
                  <div className="p-3.5 hover:bg-slate-50 cursor-pointer flex justify-between items-center">
                    <span>Meus Endereços Cadastrados</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="p-3.5 hover:bg-slate-50 cursor-pointer flex justify-between items-center">
                    <span>Formas de Pagamento (Cartões & Pix)</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="p-3.5 hover:bg-slate-50 cursor-pointer flex justify-between items-center">
                    <span>Meus Contratos Digitais (PDFs)</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="p-3.5 hover:bg-slate-50 cursor-pointer flex justify-between items-center">
                    <span>Profissionais Favoritos</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* BOTTOM CLIENT NAVIGATION BAR */}
          <nav className="bg-white border-t border-slate-200 py-2 px-4 fixed bottom-0 w-full max-w-md z-30 flex items-center justify-around shadow-lg">
            {[
              { id: "home", label: "Início", icon: Wrench },
              { id: "explore", label: "Propostas", icon: Search },
              { id: "orders", label: "Pedidos", icon: ListOrdered },
              { id: "chat", label: "Chat", icon: MessageSquare },
              { id: "gamification", label: "Pontos", icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = clientTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setClientTab(tab.id as any)}
                  className={`flex flex-col items-center space-y-1 transition-colors cursor-pointer ${
                    isActive ? "text-[#1769E0]" : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px] font-bold">{tab.label}</span>
                </button>
              );
            })}
          </nav>

        </div>
      )}

      {/* ========================================================================= */}
      {/* PERSPECTIVE 2: PROVIDER MOBILE APP */}
      {/* ========================================================================= */}
      {activeRole === "provider" && (
        <div className="max-w-md mx-auto min-h-[calc(100vh-50px)] bg-slate-900 text-white shadow-2xl relative flex flex-col justify-between pb-20 border-x border-slate-800">
          
          {/* PROVIDER TOP BAR */}
          <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center justify-between text-left sticky top-[48px] z-30">
            <div className="flex items-center space-x-3">
              <img src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80" className="w-10 h-10 rounded-full object-cover border-2 border-[#16A36A]" alt="Carlos" />
              <div>
                <h3 className="font-black text-sm text-white">Carlos Henrique</h3>
                <span className="text-[10px] text-[#16A36A] font-extrabold block">● Disponível para chamados</span>
              </div>
            </div>

            <span className="bg-[#16A36A]/20 text-[#16A36A] border border-[#16A36A]/40 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
              Especialista Ouro
            </span>
          </div>

          {/* MAIN PROVIDER CONTENT */}
          <div className="p-4 space-y-6 text-left flex-1 overflow-y-auto">
            
            {/* PROVIDER DASHBOARD */}
            {providerTab === "dashboard" && (
              <div className="space-y-6 animate-fade-in">
                
                {/* METRICS CARDS */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Ganhos do Mês</span>
                    <h3 className="text-xl font-black text-[#16A36A]">R$ 6.840,00</h3>
                    <span className="text-[10px] text-slate-500">32 serviços concluídos</span>
                  </div>

                  <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Saldo na Carteira</span>
                    <h3 className="text-xl font-black text-[#F4B740]">R$ 1.420,00</h3>
                    <button
                      onClick={() => setProviderTab("wallet")}
                      className="text-[10px] text-[#1769E0] font-bold hover:underline block"
                    >
                      Solicitar Saque Pix →
                    </button>
                  </div>
                </div>

                {/* CURRENT ACTIVE JOB FOR PROVIDER */}
                <div className="bg-gradient-to-r from-emerald-900/60 to-slate-800 border border-[#16A36A]/50 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#16A36A] font-black uppercase">Chamado Ativo Próximo</span>
                    <span className="text-slate-400">Distância: 2.3 km</span>
                  </div>

                  <h4 className="font-bold text-sm text-white">Instalação de Ventilador de Teto</h4>
                  <p className="text-xs text-slate-300">Cliente: <strong className="text-white">Marcelo Oliveira</strong></p>
                  <p className="text-xs text-slate-400">Endereço: Rua da Consolação, 245 – Centro</p>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => showToast("Rota iniciada no GPS!")}
                      className="flex-1 py-2 bg-[#16A36A] hover:bg-emerald-600 text-white font-bold text-xs rounded-xl"
                    >
                      Iniciar Deslocamento
                    </button>
                    <button
                      onClick={() => {
                        setServiceStatus("in_progress");
                        showToast("Status atualizado: Serviço Iniciado no local.");
                      }}
                      className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-xl"
                    >
                      Iniciar Serviço
                    </button>
                  </div>
                </div>

                {/* OPPORTUNITIES LEADS LIST */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm text-white">Oportunidades Próximas (5)</h3>
                    <button onClick={() => setProviderTab("opportunities")} className="text-xs text-[#1769E0] font-bold">Ver todas</button>
                  </div>

                  <div className="space-y-3">
                    {[
                      { service: "Troca de Chuveiro Ducha", client: "Ana Paula", dist: "1.4 km", budget: "Até R$ 120", bids: 2 },
                      { service: "Instalação de Painel LED", client: "Roberto Santos", dist: "3.2 km", budget: "Até R$ 250", bids: 4 }
                    ].map((op, opi) => (
                      <div key={opi} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2 text-left">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-xs text-white">{op.service}</h4>
                          <span className="text-xs font-black text-[#16A36A]">{op.budget}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Cliente: {op.client} ({op.dist})</span>
                          <span>{op.bids} propostas enviadas</span>
                        </div>
                        <button
                          onClick={() => showToast("Proposta rápida enviada com sucesso ao cliente!")}
                          className="w-full py-2 bg-[#1769E0] hover:bg-blue-600 text-white font-bold text-xs rounded-xl mt-1"
                        >
                          Enviar Proposta Rápida
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* WALLET TAB FOR PROVIDER */}
            {providerTab === "wallet" && (
              <div className="space-y-6 animate-fade-in text-left">
                <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-4">
                  <span className="text-xs text-slate-400 font-bold uppercase">Carteira Digital do Prestador</span>
                  <div>
                    <span className="text-xs text-slate-400 block">Saldo Disponível para Saque</span>
                    <h2 className="text-3xl font-black text-[#16A36A]">R$ 1.420,00</h2>
                  </div>

                  <button
                    onClick={() => showToast("Saque de R$ 1.420,00 via Pix realizado com sucesso!")}
                    className="w-full py-3 bg-[#16A36A] hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow"
                  >
                    Solicitar Saque Imediato Pix
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* BOTTOM PROVIDER NAVIGATION BAR */}
          <nav className="bg-slate-800 border-t border-slate-700 py-2 px-4 fixed bottom-0 w-full max-w-md z-30 flex items-center justify-around">
            {[
              { id: "dashboard", label: "Painel", icon: LayoutDashboard },
              { id: "opportunities", label: "Chamados", icon: Zap },
              { id: "wallet", label: "Carteira", icon: Wallet }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = providerTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setProviderTab(tab.id as any)}
                  className={`flex flex-col items-center space-y-1 transition-colors cursor-pointer ${
                    isActive ? "text-[#16A36A]" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px] font-bold">{tab.label}</span>
                </button>
              );
            })}
          </nav>

        </div>
      )}

      {/* ========================================================================= */}
      {/* PERSPECTIVE 3: WEB ADMIN DASHBOARD (DESKTOP) */}
      {/* ========================================================================= */}
      {activeRole === "admin" && (
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 text-left animate-fade-in">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">Gestão Global da Plataforma</span>
              <h1 className="text-2xl md:text-3xl font-black text-[#0D326E]">Painel Administrativo TáNáMão</h1>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => showToast("Relatório financeiro exportado em PDF.")}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl shadow-sm hover:bg-slate-50 flex items-center space-x-1.5"
              >
                <Download className="h-4 w-4" />
                <span>Exportar Relatório PDF</span>
              </button>
            </div>
          </div>

          {/* ADMIN METRICS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase">Usuários Cadastrados</span>
              <h3 className="text-2xl font-black text-[#0D326E]">24.860</h3>
              <span className="text-[11px] text-emerald-600 font-bold">+12% este mês</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase">Prestadores Ativos</span>
              <h3 className="text-2xl font-black text-[#1769E0]">4.328</h3>
              <span className="text-[11px] text-slate-500">98% verificados</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase">Volume Transacionado</span>
              <h3 className="text-2xl font-black text-[#16A36A]">R$ 1.284.760,00</h3>
              <span className="text-[11px] text-emerald-600 font-bold">Escrow protegido</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-500 uppercase">Receita da Plataforma (8%)</span>
              <h3 className="text-2xl font-black text-[#F97316]">R$ 102.780,80</h3>
              <span className="text-[11px] text-slate-500">Taxa líquida</span>
            </div>
          </div>

          {/* RECHARTS FINANCIAL & CATEGORY GRAPH */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-[#0D326E]">Serviços Concluídos por Mês</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { month: "Jan", total: 4200 },
                    { month: "Fev", total: 4800 },
                    { month: "Mar", total: 5300 },
                    { month: "Abr", total: 5900 },
                    { month: "Mai", total: 6184 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#1769E0" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-[#0D326E]">Distribuição por Categoria</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Eletricista", value: 35 },
                        { name: "Encanador", value: 25 },
                        { name: "Limpeza", value: 20 },
                        { name: "Montador", value: 20 }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      <Cell fill="#1769E0" />
                      <Cell fill="#16A36A" />
                      <Cell fill="#F4B740" />
                      <Cell fill="#F97316" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* CONTRACTS & DISPUTES MANAGEMENT TABLE */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
            <h3 className="font-bold text-sm text-[#0D326E]">Gestão de Contratos e Escrow em Tempo Real</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600 uppercase text-[10px]">
                    <th className="p-3">Contrato</th>
                    <th className="p-3">Cliente</th>
                    <th className="p-3">Prestador</th>
                    <th className="p-3">Serviço</th>
                    <th className="p-3 text-right">Valor Escrow</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  <tr>
                    <td className="p-3 font-mono font-bold text-[#1769E0]">CT-2026-008421</td>
                    <td className="p-3">Marcelo Oliveira</td>
                    <td className="p-3">Carlos Henrique</td>
                    <td className="p-3">Instalação de Ventilador</td>
                    <td className="p-3 text-right font-bold text-[#16A36A]">R$ 157,50</td>
                    <td className="p-3"><span className="bg-emerald-100 text-[#16A36A] font-bold px-2 py-0.5 rounded">Em Execução</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono font-bold text-[#1769E0]">CT-2026-008420</td>
                    <td className="p-3">Ana Paula Ramos</td>
                    <td className="p-3">Juliana Souza</td>
                    <td className="p-3">Limpeza Residencial</td>
                    <td className="p-3 text-right font-bold text-[#16A36A]">R$ 180,00</td>
                    <td className="p-3"><span className="bg-blue-100 text-[#1769E0] font-bold px-2 py-0.5 rounded">Assinado</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: JOB REQUEST WIZARD */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isRequestWizardOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-6 space-y-6 text-left relative overflow-hidden"
            >
              <button
                onClick={() => setIsRequestWizardOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] bg-[#1769E0] text-white font-extrabold px-2.5 py-0.5 rounded-full uppercase">Passo {wizardStep} de 3</span>
                <h3 className="font-serif font-black text-xl text-slate-900">Solicitar Novo Serviço</h3>
              </div>

              {wizardStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Categoria do Serviço</label>
                    <select
                      value={requestData.category}
                      onChange={(e) => setRequestData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-medium"
                    >
                      {CATEGORIES.map((c, ci) => (
                        <option key={ci} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Descreva o que você precisa</label>
                    <textarea
                      rows={3}
                      value={requestData.description}
                      onChange={(e) => setRequestData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-medium outline-none focus:border-[#1769E0]"
                    />
                  </div>

                  <button
                    onClick={() => setWizardStep(2)}
                    className="w-full py-3 bg-[#1769E0] text-white font-bold text-xs rounded-xl hover:bg-[#0D326E]"
                  >
                    Próximo Passo (Data & Local)
                  </button>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Endereço do Local</label>
                    <input
                      type="text"
                      value={requestData.address}
                      onChange={(e) => setRequestData(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Data e Horário Preferencial</label>
                    <input
                      type="text"
                      value={requestData.dateTime}
                      onChange={(e) => setRequestData(prev => ({ ...prev, dateTime: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-medium"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setWizardStep(1)} className="py-3 px-4 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl">Voltar</button>
                    <button
                      onClick={() => {
                        setIsRequestWizardOpen(false);
                        showToast("Solicitação publicada com sucesso! Profissionais notificados.");
                        setClientTab("explore");
                      }}
                      className="flex-1 py-3 bg-[#16A36A] text-white font-bold text-xs rounded-xl hover:bg-emerald-700"
                    >
                      Publicar Solicitação
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 2: CONTRACT & DIGITAL SIGNATURE */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showContractModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-6 space-y-4 text-left relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Contrato Digital de Prestação de Serviços</span>
                  <h3 className="font-mono text-base font-black text-[#1769E0]">CT-2026-008421</h3>
                </div>
                <button onClick={() => setShowContractModal(false)} className="text-slate-400"><X className="h-5 w-5" /></button>
              </div>

              <div className="text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 max-h-48 overflow-y-auto font-mono">
                <p><strong>CONTRATANTE:</strong> Marcelo Oliveira (CPF: 123.***.***-00)</p>
                <p><strong>CONTRATADO:</strong> Carlos Henrique da Silva (CPF: 987.***.***-11)</p>
                <p><strong>OBJETO:</strong> Instalação de ventilador de teto com luminária no Centro de Sorocaba/SP.</p>
                <p><strong>VALOR TOTAL:</strong> R$ 150,00 + R$ 7,50 (Taxa de Proteção Escrow) = R$ 157,50.</p>
                <p><strong>GARANTIA:</strong> 90 dias com cobertura direta pela plataforma TáNáMão.</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-xl text-xs text-emerald-900 font-bold">
                Assinatura digital autenticada via aplicativo. O valor será retido em garantia até sua liberação explícita.
              </div>

              <button
                onClick={() => {
                  setShowContractModal(false);
                  setShowPaymentModal(true);
                  showToast("Contrato assinado digitalmente com sucesso!");
                }}
                className="w-full py-3 bg-[#1769E0] text-white font-black text-xs rounded-xl shadow hover:bg-[#0D326E]"
              >
                Assinar Digitalmente e Ir para Pagamento
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 3: ESCROW PAYMENT SIMULATOR */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-6 space-y-4 text-left relative overflow-hidden"
            >
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <h3 className="font-serif font-black text-lg text-slate-900">Pagamento Protegido TáNáMão</h3>
                <button onClick={() => setShowPaymentModal(false)}><X className="h-5 w-5 text-slate-400" /></button>
              </div>

              <div className="bg-[#EAF2FF] p-4 rounded-2xl border border-blue-200 text-xs space-y-1">
                <span className="text-slate-500 block">Resumo do Pedido CT-2026-008421</span>
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Instalação Ventilador:</span>
                  <span>R$ 150,00</span>
                </div>
                <div className="flex justify-between font-bold text-slate-800">
                  <span>Taxa Proteção Escrow:</span>
                  <span>R$ 7,50</span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#16A36A] border-t border-blue-200 pt-1">
                  <span>Total a Pagar:</span>
                  <span>R$ 157,50</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Forma de Pagamento</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    onClick={() => setPaymentMethod("pix")}
                    className={`p-3 rounded-xl border ${paymentMethod === "pix" ? "border-[#1769E0] bg-blue-50 text-[#1769E0]" : "border-slate-200"}`}
                  >
                    Pix (Aprovação Instântanea)
                  </button>
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`p-3 rounded-xl border ${paymentMethod === "card" ? "border-[#1769E0] bg-blue-50 text-[#1769E0]" : "border-slate-200"}`}
                  >
                    Cartão de Crédito
                  </button>
                </div>
              </div>

              {paymentMethod === "pix" && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-2">
                  <QrCode className="h-16 w-16 mx-auto text-slate-700" />
                  <span className="text-[11px] font-mono bg-white px-3 py-1 rounded border block truncate">
                    00020126580014BR.GOV.BCB.PIX0136tanamao-escrow-8421
                  </span>
                </div>
              )}

              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setPaymentDone(true);
                  setServiceStatus("en_route");
                  setClientTab("orders");
                  showToast("Pagamento Pix retido com sucesso no Escrow!");
                }}
                className="w-full py-3 bg-[#16A36A] text-white font-black text-xs rounded-xl shadow hover:bg-emerald-700"
              >
                Confirmar Pagamento e Iniciar Chamado
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 4: RATING & REVIEWS */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showRatingModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-6 space-y-4 text-center relative overflow-hidden"
            >
              <h3 className="font-serif font-black text-xl text-slate-900">Avalie o Atendimento de Carlos</h3>
              <p className="text-xs text-slate-500">Sua avaliação ajuda a comunidade e concede 50 pontos de recompensa.</p>

              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    onClick={() => setUserRating(s)}
                    className={`h-8 w-8 cursor-pointer ${s <= userRating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
                  />
                ))}
              </div>

              <textarea
                rows={3}
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 outline-none"
              />

              <button
                onClick={() => {
                  setShowRatingModal(false);
                  showToast("Avaliação publicada! +50 Pontos adicionados à sua conta.");
                }}
                className="w-full py-3 bg-[#1769E0] text-white font-bold text-xs rounded-xl shadow"
              >
                Enviar Avaliação e Ganhar 50 Pts
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 5: PROVIDER PROFILE MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedProvider && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-6 space-y-4 text-left relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setSelectedProvider(null)} className="absolute top-4 right-4 text-slate-400"><X className="h-5 w-5" /></button>

              <div className="flex items-center space-x-4">
                <img src={selectedProvider.photo} className="w-16 h-16 rounded-2xl object-cover border" alt={selectedProvider.name} />
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{selectedProvider.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{selectedProvider.role}</p>
                  <div className="flex items-center space-x-1 text-xs text-amber-500 font-bold">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    <span>{selectedProvider.rating} ({selectedProvider.reviewsCount} avaliações)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-xs text-slate-900 uppercase">Sobre o Profissional</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedProvider.bio}</p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-xs text-slate-900 uppercase">Serviços Oferecidos</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedProvider.services.map((s, si) => (
                    <span key={si} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">{s}</span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedProvider(null);
                  setRequestData(prev => ({ ...prev, category: selectedProvider.category }));
                  setIsRequestWizardOpen(true);
                  setWizardStep(1);
                }}
                className="w-full py-3 bg-[#1769E0] text-white font-bold text-xs rounded-xl shadow hover:bg-[#0D326E]"
              >
                Solicitar Orçamento para Este Profissional
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
