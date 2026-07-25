import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Upload,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  User,
  FlaskConical,
  Award,
  Sparkles,
  Phone,
  MessageSquare,
  MapPin,
  ChevronRight,
  ChevronDown,
  Calendar,
  AlertCircle,
  BarChart3,
  Users,
  Settings,
  Filter,
  ArrowRight,
  DollarSign,
  Heart,
  Droplets,
  Zap,
  Lock,
  Download,
  Share2,
  Check,
  X,
  Bot,
  ExternalLink,
  Pencil,
  Plus,
  ArrowLeft,
  FileDown,
  Eye,
  Send,
  Building,
  GraduationCap,
  Stethoscope,
  Smile,
  Baby,
  Dog,
  Activity,
  Package,
  Layers,
  HelpCircle,
  Menu,
  ShoppingBag
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
  Cell
} from "recharts";

interface FormulaVitaAppProps {
  onBack?: () => void;
}

// ---------------------------------------------------------------------------
// DATA MODELS & MOCK DATA
// ---------------------------------------------------------------------------

interface ActiveIngredient {
  id: string;
  name: string;
  category: string;
  description: string;
  forms: string[];
  needsPrescription: boolean;
  tags: string[];
}

const MOCK_INGREDIENTS: ActiveIngredient[] = [
  {
    id: "ing-1",
    name: "Ácido Hialurônico",
    category: "Dermocosméticos",
    description: "Utilizado em formulações cosméticas para hidratação profunda e renovação do tônus cutâneo.",
    forms: ["Sérum", "Creme", "Gel", "Cápsulas"],
    needsPrescription: false,
    tags: ["Pele", "Bem-Estar"]
  },
  {
    id: "ing-2",
    name: "Coenzima Q10",
    category: "Nutrição e Suplementação",
    description: "Ingrediente potente empregado em suplementos antioxidantes e renovação celular.",
    forms: ["Cápsulas", "Sachê", "Gotas"],
    needsPrescription: false,
    tags: ["Suplementação", "Desempenho"]
  },
  {
    id: "ing-3",
    name: "Vitamina C Tópica",
    category: "Dermocosméticos",
    description: "Ativo utilizado em formulações para iluminação da pele e síntese natural de colágeno.",
    forms: ["Sérum Nanoencapsulado", "Creme", "Gel-Creme"],
    needsPrescription: false,
    tags: ["Pele"]
  },
  {
    id: "ing-4",
    name: "Niacinamida (Vitamina B3)",
    category: "Dermocosméticos",
    description: "Componente consagrado em formulações para fortalecimento da barreira cutânea e controle da oleosidade.",
    forms: ["Sérum", "Loção", "Creme"],
    needsPrescription: false,
    tags: ["Pele"]
  },
  {
    id: "ing-5",
    name: "Colágeno Hidrolisado Verisol",
    category: "Nutrição e Suplementação",
    description: "Peptídeos bioativos utilizados em fórmulas nutricionais para firmeza da pele e articulações.",
    forms: ["Sachê", "Gomas", "Pó Solúvel"],
    needsPrescription: false,
    tags: ["Pele", "Suplementação"]
  },
  {
    id: "ing-6",
    name: "Biotina 10mg",
    category: "Nutrição e Suplementação",
    description: "Vitamina do complexo B presente em combinações voltadas ao fortalecimento capilar e unhas.",
    forms: ["Cápsulas", "Gomas Palatáveis"],
    needsPrescription: false,
    tags: ["Cabelo", "Suplementação"]
  },
  {
    id: "ing-7",
    name: "Minoxidil Tópico / Oral",
    category: "Tratamento Capilar",
    description: "Ativo consagrado para estimulação do crescimento capilar. Requer avaliação de receita.",
    forms: ["Loção Capilar", "Espuma", "Cápsulas"],
    needsPrescription: true,
    tags: ["Cabelo", "Prescrição Médica"]
  },
  {
    id: "ing-8",
    name: "Melatonina Microencapsulada",
    category: "Medicina Integrativa",
    description: "Apresentação com liberação prolongada para modulação do ciclo de sono conforme legislação.",
    forms: ["Gotas Sublinguais", "Cápsulas", "Pastilhas"],
    needsPrescription: true,
    tags: ["Bem-Estar", "Prescrição Médica"]
  },
  {
    id: "ing-9",
    name: "Probióticos Multicepas 10 Bilhões",
    category: "Saúde Intestinal",
    description: "Combinação personalizada de cepas para suporte ao microbioma e saúde digestiva.",
    forms: ["Cápsulas Gastroresistentes", "Sachê"],
    needsPrescription: false,
    tags: ["Saúde Intestinal", "Bem-Estar"]
  },
  {
    id: "ing-10",
    name: "Magnésio Dimalato & Treonato",
    category: "Nutrição e Suplementação",
    description: "Combinação de quelatos orgânicos para biodisponibilidade elevada em cognição e relaxamento muscular.",
    forms: ["Cápsulas", "Sachê"],
    needsPrescription: false,
    tags: ["Suplementação", "Desempenho"]
  }
];

interface RequestItem {
  id: string;
  protocol: string;
  clientName: string;
  phone: string;
  email: string;
  type: string;
  attachmentsCount: number;
  date: string;
  status: "Recebida" | "Em análise" | "Aguardando documento" | "Orçamento em preparação" | "Orçamento enviado" | "Aprovada" | "Em produção" | "Finalizada" | "Cancelada";
  priority: "Normal" | "Alta";
  assignedTo: string;
  totalValue?: number;
}

const MOCK_REQUESTS: RequestItem[] = [
  {
    id: "req-1",
    protocol: "SOL-2026-01842",
    clientName: "Mariana Oliveira",
    phone: "(15) 99812-4411",
    email: "mariana.oliveira@email.com",
    type: "Receita Médica (Dermatologia & Cápsulas)",
    attachmentsCount: 2,
    date: "24/07/2026 10:42",
    status: "Orçamento enviado",
    priority: "Normal",
    assignedTo: "Dra. Fernanda Martins",
    totalValue: 231.80
  },
  {
    id: "req-2",
    protocol: "SOL-2026-01841",
    clientName: "Carlos Henrique",
    phone: "(15) 99123-8822",
    email: "carlos.henrique@email.com",
    type: "Suplementação Esportiva",
    attachmentsCount: 1,
    date: "24/07/2026 10:18",
    status: "Em análise",
    priority: "Normal",
    assignedTo: "Juliana Souza",
    totalValue: 145.00
  },
  {
    id: "req-3",
    protocol: "SOL-2026-01840",
    clientName: "Ana Paula Ramos",
    phone: "(15) 98111-9900",
    email: "ana.ramos@email.com",
    type: "Fórmula Pediatria (Xarope Adaptado)",
    attachmentsCount: 2,
    date: "24/07/2026 09:55",
    status: "Aguardando documento",
    priority: "Alta",
    assignedTo: "Dra. Fernanda Martins",
    totalValue: 98.50
  },
  {
    id: "req-4",
    protocol: "SOL-2026-01839",
    clientName: "Rodrigo Almeida",
    phone: "(15) 99766-3322",
    email: "rodrigo.almeida@email.com",
    type: "Medicina Integrativa",
    attachmentsCount: 1,
    date: "24/07/2026 09:14",
    status: "Em produção",
    priority: "Normal",
    assignedTo: "Juliana Souza",
    totalValue: 310.00
  }
];

export default function FormulaVitaApp({ onBack }: FormulaVitaAppProps) {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<string>("home");
  const [activeRole, setActiveRole] = useState<"public" | "client" | "admin">("public");
  
  // Recipe Upload Form Wizard States
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: "Mariana Oliveira",
    cpf: "123.456.789-00",
    birthDate: "1992-05-14",
    phone: "(15) 99812-4411",
    email: "mariana.oliveira@email.com",
    deliveryType: "receber",
    zipCode: "18010-000",
    address: "Rua das Flores, 120 - Sorocaba/SP",
    unit: "Sorocaba Centro",
    desiredDeadline: "Normal (3 dias)",
    flavorPreference: "Uva sem açúcar",
    capsuleDifficulty: "Não",
    quoteAllItems: "Sim",
    consent1: true,
    consent2: true,
    consent3: true
  });
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    "receita_dermatologia_dra_camila.pdf",
    "frente_receita_digital.jpg"
  ]);
  const [isSimulatingAnalysis, setIsSimulatingAnalysis] = useState<boolean>(false);
  const [createdProtocol, setCreatedProtocol] = useState<string>("");

  // Search & Filters in Asset Catalog
  const [searchIngredient, setSearchIngredient] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("Todas");

  // Track Order State
  const [searchProtocol, setSearchProtocol] = useState<string>("SOL-2026-01842");
  const [searchedRequest, setSearchedRequest] = useState<RequestItem | null>(MOCK_REQUESTS[0]);

  // Admin Panel States
  const [adminRequests, setAdminRequests] = useState<RequestItem[]>(MOCK_REQUESTS);
  const [selectedAdminReq, setSelectedAdminReq] = useState<RequestItem | null>(null);
  const [activeAdminTab, setActiveAdminTab] = useState<"dashboard" | "requests" | "ingredients" | "reports">("dashboard");

  // WhatsApp Floating Chat Popover
  const [showWhatsAppChat, setShowWhatsAppChat] = useState<boolean>(false);

  // Cookie Banner State
  const [cookieAccepted, setCookieAccepted] = useState<boolean>(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle Recipe Form Submission
  const handleSubmitRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulatingAnalysis(true);
    setTimeout(() => {
      setIsSimulatingAnalysis(false);
      const generated = `SOL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setCreatedProtocol(generated);
      const newReq: RequestItem = {
        id: `req-${Date.now()}`,
        protocol: generated,
        clientName: formData.name,
        phone: formData.phone,
        email: formData.email,
        type: "Receita Enviada via Site",
        attachmentsCount: uploadedFiles.length || 1,
        date: new Date().toLocaleString("pt-BR"),
        status: "Recebida",
        priority: "Normal",
        assignedTo: "Dra. Fernanda Martins"
      };
      setAdminRequests([newReq, ...adminRequests]);
      setActiveTab("recipe-success");
      showToast(`Solicitação ${generated} enviada com sucesso!`);
    }, 2500);
  };

  // Filter Ingredients
  const filteredIngredients = MOCK_INGREDIENTS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchIngredient.toLowerCase()) ||
      item.description.toLowerCase().includes(searchIngredient.toLowerCase()) ||
      item.category.toLowerCase().includes(searchIngredient.toLowerCase());
    const matchesTag = selectedTag === "Todas" || item.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-[#F5F7F7] text-[#243331] font-sans relative antialiased selection:bg-[#2F7D6D]/20 selection:text-[#174C45]">
      
      {/* ========================================================================= */}
      {/* TOAST NOTIFICATION */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-[#174C45] text-white px-5 py-3 rounded-xl shadow-2xl border border-[#C5A461]/40 flex items-center space-x-3 text-xs font-bold"
          >
            <CheckCircle2 className="h-5 w-5 text-[#C5A461]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* TOPBAR / HEADER NAVIGATION */}
      {/* ========================================================================= */}
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#174C45] text-white text-[11px] py-2 px-4 border-b border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Clock className="h-3.5 w-3.5 text-[#C5A461]" />
              <span>Seg. a Sex., 8h às 18h | Sábados, 8h às 13h</span>
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center space-x-1">
              <Package className="h-3.5 w-3.5 text-[#C5A461]" />
              <span>Entrega para toda a região metropolitana</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* PORTAL ROLE SWITCHER */}
            <div className="bg-white/10 p-0.5 rounded-lg flex items-center space-x-1 font-bold text-[10px]">
              <button
                onClick={() => {
                  setActiveRole("public");
                  setActiveTab("home");
                }}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  activeRole === "public" ? "bg-[#2F7D6D] text-white" : "text-white/70 hover:text-white"
                }`}
              >
                Site Público
              </button>
              <button
                onClick={() => {
                  setActiveRole("client");
                  setActiveTab("client-portal");
                }}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  activeRole === "client" ? "bg-[#C5A461] text-black font-black" : "text-white/70 hover:text-white"
                }`}
              >
                Área do Cliente
              </button>
              <button
                onClick={() => {
                  setActiveRole("admin");
                  setActiveTab("admin-portal");
                }}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  activeRole === "admin" ? "bg-[#C94A4A] text-white font-black" : "text-white/70 hover:text-white"
                }`}
              >
                Painel Admin
              </button>
            </div>

            {onBack && (
              <button
                onClick={onBack}
                className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-0.5 rounded font-bold text-[10px] transition-colors cursor-pointer flex items-center space-x-1"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Voltar ao Portfólio</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* MAIN FIXED HEADER */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#174C45]/10 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          
          {/* BRAND LOGO */}
          <div
            onClick={() => {
              setActiveRole("public");
              setActiveTab("home");
            }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#174C45] to-[#2F7D6D] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <FlaskConical className="h-5 w-5 text-[#DFF2EC]" />
            </div>
            <div>
              <div className="flex items-baseline space-x-1">
                <span className="font-serif font-black text-xl text-[#174C45] tracking-tight">Fórmula Vita</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A461]" />
              </div>
              <span className="text-[10px] text-[#6B7A78] font-medium tracking-wide block">
                Farmácia de Manipulação & Laboratório
              </span>
            </div>
          </div>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold text-[#243331]">
            {[
              { id: "home", label: "Início" },
              { id: "about", label: "Sobre nós" },
              { id: "labs", label: "Laboratórios" },
              { id: "specialties", label: "Áreas de Atuação" },
              { id: "ingredients", label: "Ativos & Fórmulas" },
              { id: "how-it-works", label: "Como Funciona" },
              { id: "professionals", label: "Para Profissionais" },
              { id: "blog", label: "Conteúdos" },
              { id: "faq", label: "Dúvidas" },
              { id: "contact", label: "Contato" },
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => {
                  setActiveRole("public");
                  setActiveTab(nav.id);
                }}
                className={`transition-colors cursor-pointer py-1 ${
                  activeTab === nav.id && activeRole === "public"
                    ? "text-[#2F7D6D] border-b-2 border-[#2F7D6D]"
                    : "hover:text-[#2F7D6D]"
                }`}
              >
                {nav.label}
              </button>
            ))}
          </nav>

          {/* ACTION BUTTONS */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setActiveRole("public");
                setActiveTab("send-recipe");
                setStep(1);
              }}
              className="px-4 py-2 bg-gradient-to-r from-[#2F7D6D] to-[#174C45] hover:from-[#174C45] hover:to-[#2F7D6D] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <FileText className="h-4 w-4 text-[#C5A461]" />
              <span>Enviar Receita</span>
            </button>

            <button
              onClick={() => {
                setActiveRole("public");
                setActiveTab("track-order");
              }}
              className="px-3 py-2 bg-[#DFF2EC] text-[#174C45] hover:bg-[#2F7D6D] hover:text-white font-bold text-xs rounded-xl transition-all cursor-pointer hidden md:flex items-center space-x-1"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Acompanhar</span>
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* PUBLIC SITE VIEW CONTROLLER */}
      {/* ========================================================================= */}
      {activeRole === "public" && (
        <main className="animate-fade-in">
          
          {/* VIEW: HOME */}
          {activeTab === "home" && (
            <div className="space-y-16 pb-20">
              
              {/* HERO BANNER SECTION */}
              <section className="relative bg-gradient-to-b from-[#DFF2EC]/60 via-[#F7F3EC]/40 to-[#F5F7F7] py-16 md:py-24 border-b border-[#174C45]/10">
                <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Headline & Value Proposition */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-[#2F7D6D]/30 rounded-full text-[#174C45] text-xs font-bold shadow-sm">
                      <Sparkles className="h-3.5 w-3.5 text-[#C5A461]" />
                      <span>Cuidado personalizado em cada fórmula</span>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#174C45] leading-tight">
                      Sua saúde merece uma fórmula feita <span className="text-[#2F7D6D] underline decoration-[#C5A461] decoration-wavy">especialmente para você</span>
                    </h1>

                    <p className="text-sm md:text-base text-[#6B7A78] leading-relaxed max-w-2xl">
                      Desenvolvemos medicamentos, suplementos e dermocosméticos manipulados com precisão, matérias-primas selecionadas e rigoroso controle de qualidade sob supervisão farmacêutica contínua.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          setActiveTab("send-recipe");
                          setStep(1);
                        }}
                        className="px-6 py-3 bg-[#174C45] hover:bg-[#2F7D6D] text-white font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center space-x-2"
                      >
                        <FileText className="h-4 w-4 text-[#C5A461]" />
                        <span>Enviar Minha Receita</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("about")}
                        className="px-6 py-3 bg-white hover:bg-[#F7F3EC] text-[#174C45] border border-[#174C45]/20 font-bold text-sm rounded-xl transition-all cursor-pointer flex items-center space-x-2"
                      >
                        <span>Conhecer a Farmácia</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Trust Badges Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#174C45]/10 text-xs font-bold text-[#174C45]">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-[#2F7D6D]" />
                        <span>Fórmulas Personalizadas</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FlaskConical className="h-4 w-4 text-[#2F7D6D]" />
                        <span>Laboratório Próprio</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="h-4 w-4 text-[#2F7D6D]" />
                        <span>Controle Rigoroso</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-[#2F7D6D]" />
                        <span>Acompanhamento Tópico</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Floating Recipe Card CTA */}
                  <div className="lg:col-span-5">
                    <div className="bg-white rounded-3xl border-2 border-[#2F7D6D]/30 p-6 md:p-8 shadow-2xl space-y-6 text-left relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-[#C5A461] text-black font-black text-[10px] px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                        Atendimento Ágil
                      </div>

                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-2xl bg-[#DFF2EC] flex items-center justify-center text-[#174C45]">
                          <Upload className="h-6 w-6" />
                        </div>
                        <h3 className="font-serif text-xl font-bold text-[#174C45]">Já possui uma receita médica?</h3>
                        <p className="text-xs text-[#6B7A78]">
                          Envie uma foto ou arquivo PDF da sua prescrição e receba o orçamento detalhado no seu WhatsApp em instantes.
                        </p>
                      </div>

                      {/* SIMULATED QUICK DROPZONE */}
                      <div
                        onClick={() => {
                          setActiveTab("send-recipe");
                          setStep(2);
                        }}
                        className="border-2 border-dashed border-[#2F7D6D]/40 hover:border-[#174C45] rounded-2xl p-6 bg-[#F5F7F7] text-center cursor-pointer transition-all space-y-2 group"
                      >
                        <FileText className="h-8 w-8 text-[#2F7D6D] mx-auto group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold text-[#174C45] block">Arraste a foto/PDF ou clique para selecionar</span>
                        <span className="text-[10px] text-[#6B7A78] block">Formatos aceitos: JPG, PNG, PDF (até 15MB)</span>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab("send-recipe");
                          setStep(1);
                        }}
                        className="w-full py-3 bg-gradient-to-r from-[#2F7D6D] to-[#174C45] text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
                      >
                        <span>Enviar Receita Agora</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </section>

              {/* SEÇÃO DE CONFIANÇA & INDICADORES */}
              <section className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-[#174C45]/10 shadow-sm text-left space-y-2 hover:border-[#2F7D6D] transition-colors">
                    <div className="font-serif text-3xl font-black text-[#174C45]">12+ Anos</div>
                    <h4 className="font-bold text-sm text-[#2F7D6D]">De Experiência</h4>
                    <p className="text-xs text-[#6B7A78]">Cuidado humano e precisão técnica em cada preparação manipulada.</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#174C45]/10 shadow-sm text-left space-y-2 hover:border-[#2F7D6D] transition-colors">
                    <div className="font-serif text-3xl font-black text-[#174C45]">45.000+</div>
                    <h4 className="font-bold text-sm text-[#2F7D6D]">Fórmulas Produzidas</h4>
                    <p className="text-xs text-[#6B7A78]">Processos padronizados e rastreabilidade total de componentes.</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#174C45]/10 shadow-sm text-left space-y-2 hover:border-[#2F7D6D] transition-colors">
                    <div className="font-serif text-3xl font-black text-[#174C45]">100%</div>
                    <h4 className="font-bold text-sm text-[#2F7D6D]">Farmacêuticos Ativos</h4>
                    <p className="text-xs text-[#6B7A78]">Equipe qualificada de prontidão para orientação e conferência dupla.</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#174C45]/10 shadow-sm text-left space-y-2 hover:border-[#2F7D6D] transition-colors">
                    <div className="font-serif text-3xl font-black text-[#174C45]">Top Quality</div>
                    <h4 className="font-bold text-sm text-[#2F7D6D]">Matérias-Primas</h4>
                    <p className="text-xs text-[#6B7A78]">Fornecedores qualificados nacional e internacionalmente com laudo.</p>
                  </div>
                </div>
              </section>

              {/* SEÇÃO "COMO FUNCIONA" (4 ETAPAS) */}
              <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8 text-center">
                <div className="space-y-2 max-w-xl mx-auto">
                  <span className="text-xs font-bold text-[#2F7D6D] uppercase tracking-wider">Transparência & Praticidade</span>
                  <h2 className="font-serif text-2xl md:text-3xl font-black text-[#174C45]">Como Funciona o Processo de Manipulação</h2>
                  <p className="text-xs text-[#6B7A78]">Etapas integradas para garantir agilidade e segurança na sua medicação.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                  {[
                    {
                      step: "01",
                      title: "Envie sua receita",
                      desc: "O cliente envia a receita por foto, PDF ou formulário seguro no site.",
                      icon: FileText
                    },
                    {
                      step: "02",
                      title: "Análise farmacêutica",
                      desc: "Verificação rigorosa de dosagem, estabilidade, veículo e interações.",
                      icon: FlaskConical
                    },
                    {
                      step: "03",
                      title: "Receba seu orçamento",
                      desc: "Detalhamento transparente de valores, prazo de produção e opções de frete.",
                      icon: DollarSign
                    },
                    {
                      step: "04",
                      title: "Produção e entrega",
                      desc: "Manipulação nos laboratórios e envio seguro ou retirada na loja.",
                      icon: Package
                    }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="bg-white p-6 rounded-2xl border border-[#174C45]/10 shadow-sm relative space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-black text-2xl text-[#C5A461]">{item.step}</span>
                          <div className="w-10 h-10 rounded-xl bg-[#DFF2EC] text-[#174C45] flex items-center justify-center">
                            <Icon className="h-5 w-5" />
                          </div>
                        </div>
                        <h3 className="font-bold text-sm text-[#174C45]">{item.title}</h3>
                        <p className="text-xs text-[#6B7A78] leading-relaxed">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => {
                    setActiveTab("send-recipe");
                    setStep(1);
                  }}
                  className="px-8 py-3 bg-[#174C45] hover:bg-[#2F7D6D] text-white font-bold text-xs rounded-xl shadow transition-all cursor-pointer inline-flex items-center space-x-2"
                >
                  <span>Começar Meu Orçamento Agora</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </section>

              {/* PRINCIPAIS ÁREAS DE ATUAÇÃO */}
              <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8 text-left">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#2F7D6D] uppercase tracking-wider">Especialidades</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-black text-[#174C45]">Principais Áreas de Atuação</h2>
                  </div>
                  <button
                    onClick={() => setActiveTab("specialties")}
                    className="text-xs font-bold text-[#2F7D6D] hover:underline flex items-center space-x-1"
                  >
                    <span>Ver todas as áreas</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      name: "Dermatologia & Estética",
                      desc: "Séruns, cremes antissinais, clareadores, tratamento capilar e géis manipulados.",
                      icon: Sparkles
                    },
                    {
                      name: "Nutrição & Suplementação",
                      desc: "Vitaminas, antioxidantes, aminoácidos e proteicos sob medida.",
                      icon: Zap
                    },
                    {
                      name: "Medicina Integrativa",
                      desc: "Fórmulas individualizadas para saúde intestinal, sono e suporte metabólico.",
                      icon: Activity
                    },
                    {
                      name: "Pediatria Adaptações",
                      desc: "Xaropes saborizados, suspensões e doses ajustadas ao peso corporal.",
                      icon: Baby
                    },
                    {
                      name: "Ginecologia & Saúde Íntima",
                      desc: "Cuidados íntimos, hidratantes vaginais e suplementação hormonal direcionada.",
                      icon: Heart
                    },
                    {
                      name: "Veterinária Palatáveis",
                      desc: "Biscoitos, pastas e soluções saborizadas para cães e gatos.",
                      icon: Dog
                    },
                    {
                      name: "Odontologia Preventiva",
                      desc: "Enxaguantes sem álcool, géis anestésicos e clareadores manipulados.",
                      icon: Smile
                    },
                    {
                      name: "Fitoterapia e Chás",
                      desc: "Extratos padronizados naturais e compostos fitoterápicos certificados.",
                      icon: Droplets
                    }
                  ].map((area, idx) => {
                    const Icon = area.icon;
                    return (
                      <div
                        key={idx}
                        onClick={() => setActiveTab("specialties")}
                        className="bg-white p-5 rounded-2xl border border-[#174C45]/10 shadow-sm hover:border-[#2F7D6D] transition-all cursor-pointer group space-y-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#DFF2EC] text-[#174C45] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-bold text-sm text-[#174C45] group-hover:text-[#2F7D6D] transition-colors">{area.name}</h3>
                        <p className="text-xs text-[#6B7A78] leading-relaxed">{area.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* VITRINE DE ATIVOS EM DESTAQUE */}
              <section className="bg-[#DFF2EC]/40 py-16 border-y border-[#174C45]/10">
                <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8 text-left">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-[#2F7D6D] uppercase tracking-wider">Catálogo Técnico</span>
                      <h2 className="font-serif text-2xl md:text-3xl font-black text-[#174C45]">Ativos e Fórmulas em Destaque</h2>
                      <p className="text-xs text-[#6B7A78]">Explore os principais componentes utilizados em nossos laboratórios.</p>
                    </div>

                    {/* SEARCH INPUT */}
                    <div className="relative w-full md:w-80">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-[#6B7A78]" />
                      <input
                        type="text"
                        placeholder="Buscar por ativo (ex: Vitamina C, Ácido...)"
                        value={searchIngredient}
                        onChange={(e) => setSearchIngredient(e.target.value)}
                        className="w-full bg-white pl-9 pr-4 py-2 rounded-xl border border-[#174C45]/20 text-xs text-[#243331] font-medium outline-none focus:border-[#2F7D6D]"
                      />
                    </div>
                  </div>

                  {/* TAG FILTERS */}
                  <div className="flex flex-wrap gap-2 text-xs font-bold">
                    {["Todas", "Pele", "Cabelo", "Suplementação", "Saúde Intestinal", "Desempenho", "Bem-Estar", "Prescrição Médica"].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          selectedTag === tag
                            ? "bg-[#174C45] text-white"
                            : "bg-white text-[#6B7A78] hover:text-[#174C45] border border-[#174C45]/10"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  {/* INGREDIENT CARDS */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredIngredients.slice(0, 6).map((ing) => (
                      <div key={ing.id} className="bg-white p-6 rounded-2xl border border-[#174C45]/10 shadow-sm space-y-4 text-left flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] bg-[#DFF2EC] text-[#174C45] font-bold px-2.5 py-0.5 rounded-full">
                              {ing.category}
                            </span>
                            {ing.needsPrescription && (
                              <span className="text-[10px] bg-[#C94A4A]/10 text-[#C94A4A] font-bold px-2 py-0.5 rounded-full">
                                Exige Receita
                              </span>
                            )}
                          </div>

                          <h3 className="font-serif font-black text-base text-[#174C45]">{ing.name}</h3>
                          <p className="text-xs text-[#6B7A78] leading-relaxed">{ing.description}</p>
                        </div>

                        <div className="space-y-3 pt-2 border-t border-[#174C45]/10">
                          <div>
                            <span className="text-[10px] font-bold text-[#6B7A78] block">Formas Farmacêuticas Disponíveis:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {ing.forms.map((f, i) => (
                                <span key={i} className="text-[10px] bg-[#F5F7F7] border border-[#174C45]/10 text-[#243331] px-2 py-0.5 rounded">
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setActiveTab("send-recipe");
                              setStep(1);
                            }}
                            className="w-full py-2 bg-[#2F7D6D] hover:bg-[#174C45] text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1"
                          >
                            <span>Solicitar Orçamento Deste Ativo</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-[#6B7A78] italic text-center">
                    * As informações possuem caráter educativo. A viabilidade técnica e necessidade de prescrição serão avaliadas pelo farmacêutico responsável.
                  </p>
                </div>
              </section>

              {/* SEÇÃO DOS LABORATORIOS */}
              <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8 text-left">
                <div className="space-y-2 max-w-xl">
                  <span className="text-xs font-bold text-[#2F7D6D] uppercase tracking-wider">Infraestrutura Moderna</span>
                  <h2 className="font-serif text-2xl md:text-3xl font-black text-[#174C45]">Conheça Nossos Laboratórios Especializados</h2>
                  <p className="text-xs text-[#6B7A78]">Ambientes climatizados, sistemas de exaustão HEPA e controle de contaminação cruzada.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Laboratório de Sólidos",
                      desc: "Produção de cápsulas, sachês e pós manipulados com balanças analíticas calibradas e encapsuladoras de precisão.",
                      img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
                    },
                    {
                      name: "Laboratório de Semissólidos & Líquidos",
                      desc: "Manipulação de cremes, géis, pomadas, xaropes e soluções com homogeneizadores industriais de alta frequência.",
                      img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80"
                    },
                    {
                      name: "Laboratório Dermocosmético & Vet",
                      desc: "Desenvolvimento de séruns de alta permeabilidade e fórmulas veterinárias saborizadas altamente palatáveis.",
                      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
                    }
                  ].map((lab, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-[#174C45]/10 overflow-hidden shadow-sm space-y-4">
                      <img src={lab.img} alt={lab.name} className="w-full h-48 object-cover" />
                      <div className="p-5 space-y-2">
                        <h3 className="font-serif font-black text-lg text-[#174C45]">{lab.name}</h3>
                        <p className="text-xs text-[#6B7A78] leading-relaxed">{lab.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* BLOG / ARTIGOS EDUCATIVOS */}
              <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8 text-left">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs font-bold text-[#2F7D6D] uppercase tracking-wider">Conteúdo Educativo</span>
                    <h2 className="font-serif text-2xl md:text-3xl font-black text-[#174C45]">Artigos e Orientações em Saúde</h2>
                  </div>
                  <button
                    onClick={() => setActiveTab("blog")}
                    className="text-xs font-bold text-[#2F7D6D] hover:underline flex items-center space-x-1"
                  >
                    <span>Ver todos os artigos</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Como funciona uma farmácia de manipulação?",
                      category: "Institucional",
                      time: "4 min de leitura",
                      desc: "Entenda todo o caminho do ativo desde o laudo de pureza até o frasco entregue na sua casa."
                    },
                    {
                      title: "Qual a diferença entre medicamento industrializado e manipulado?",
                      category: "Informação",
                      time: "5 min de leitura",
                      desc: "Descubra como a personalização de doses e associação de ativos traz mais eficácia ao tratamento."
                    },
                    {
                      title: "Cuidados essenciais ao armazenar medicamentos manipulados",
                      category: "Orientações",
                      time: "3 min de leitura",
                      desc: "Saiba por que não guardar medicamentos no banheiro e a importância da proteção contra luz e umidade."
                    }
                  ].map((art, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-[#174C45]/10 shadow-sm space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="bg-[#DFF2EC] text-[#174C45] px-2.5 py-0.5 rounded-full">{art.category}</span>
                        <span className="text-[#6B7A78]">{art.time}</span>
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#174C45]">{art.title}</h3>
                      <p className="text-xs text-[#6B7A78] leading-relaxed">{art.desc}</p>
                      <button
                        onClick={() => setActiveTab("blog")}
                        className="text-xs font-bold text-[#2F7D6D] hover:underline pt-2 block"
                      >
                        Ler artigo completo →
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ ACCORDION */}
              <section className="max-w-4xl mx-auto px-4 space-y-8 text-left">
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold text-[#2F7D6D] uppercase tracking-wider">Tire Suas Dúvidas</span>
                  <h2 className="font-serif text-2xl md:text-3xl font-black text-[#174C45]">Perguntas Frequentes (FAQ)</h2>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      q: "É necessário ter receita para todos os produtos?",
                      a: "Depende do tipo de fórmula e legislação. Medicamentos sob controle especial e dosagens terapêuticas exigem prescrição. Suplementos isentos podem ser orientados pelo farmacêutico."
                    },
                    {
                      q: "Como envio minha receita médica pelo site?",
                      a: "Basta clicar em 'Enviar Receita', preencher seus dados e anexar uma foto ou arquivo PDF da prescrição emitida pelo médico ou dentista."
                    },
                    {
                      q: "Quanto tempo leva para receber o orçamento?",
                      a: "Nosso tempo médio de resposta no horário comercial é de até 2 horas úteis."
                    },
                    {
                      q: "A farmácia realiza entregas em domicilio?",
                      a: "Sim, entregamos via motoboy para toda a região metropolitana e via Sedex para demais localidades."
                    }
                  ].map((faq, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-[#174C45]/10 shadow-sm space-y-2">
                      <h3 className="font-bold text-sm text-[#174C45] flex items-center justify-between">
                        <span>{faq.q}</span>
                        <ChevronDown className="h-4 w-4 text-[#2F7D6D]" />
                      </h3>
                      <p className="text-xs text-[#6B7A78] leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          )}

          {/* VIEW: ENVIAR RECEITA (4-STEP WIZARD) */}
          {activeTab === "send-recipe" && (
            <div className="max-w-3xl mx-auto px-4 py-12 text-left space-y-8">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-[#2F7D6D] uppercase tracking-wider">Orçamento Rápido e Seguro</span>
                <h1 className="font-serif text-3xl font-black text-[#174C45]">Envio de Receita Médica</h1>
                <p className="text-xs text-[#6B7A78]">Preencha os dados e anexe sua prescrição. Nossa equipe analisará os componentes imediatamente.</p>
              </div>

              {/* STEP PROGRESS INDICATOR */}
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#174C45]/10 text-xs font-bold">
                {[
                  { num: 1, label: "Dados Pessoais" },
                  { num: 2, label: "Anexo da Receita" },
                  { num: 3, label: "Preferências" },
                  { num: 4, label: "Consentimento" }
                ].map((s) => (
                  <div key={s.num} className="flex items-center space-x-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${
                      step >= s.num ? "bg-[#174C45] text-white" : "bg-[#F5F7F7] text-[#6B7A78]"
                    }`}>
                      {s.num}
                    </div>
                    <span className={`hidden sm:inline ${step >= s.num ? "text-[#174C45]" : "text-[#6B7A78]"}`}>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* FORM CONTAINER */}
              <form onSubmit={handleSubmitRecipe} className="bg-white p-6 md:p-8 rounded-3xl border border-[#174C45]/10 shadow-lg space-y-6">
                
                {/* STEP 1: DADOS PESSOAIS */}
                {step === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="font-serif font-bold text-lg text-[#174C45] border-b border-[#174C45]/10 pb-2">Etapa 1: Dados do Paciente</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                      <div className="space-y-1">
                        <label className="text-[#174C45]">Nome Completo:</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#F5F7F7] p-3 rounded-xl border border-[#174C45]/20 text-[#243331] outline-none focus:border-[#2F7D6D]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[#174C45]">CPF do Paciente:</label>
                        <input
                          type="text"
                          required
                          value={formData.cpf}
                          onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                          className="w-full bg-[#F5F7F7] p-3 rounded-xl border border-[#174C45]/20 text-[#243331] outline-none focus:border-[#2F7D6D]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[#174C45]">WhatsApp / Telefone:</label>
                        <input
                          type="text"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-[#F5F7F7] p-3 rounded-xl border border-[#174C45]/20 text-[#243331] outline-none focus:border-[#2F7D6D]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[#174C45]">E-mail para Recebimento:</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#F5F7F7] p-3 rounded-xl border border-[#174C45]/20 text-[#243331] outline-none focus:border-[#2F7D6D]"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full py-3 bg-[#174C45] hover:bg-[#2F7D6D] text-white font-bold text-xs rounded-xl shadow cursor-pointer mt-4"
                    >
                      Avançar para Anexo da Receita →
                    </button>
                  </div>
                )}

                {/* STEP 2: UPLOAD RECEITA */}
                {step === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="font-serif font-bold text-lg text-[#174C45] border-b border-[#174C45]/10 pb-2">Etapa 2: Anexo dos Documentos</h3>

                    <div className="border-2 border-dashed border-[#2F7D6D] p-8 rounded-2xl bg-[#DFF2EC]/30 text-center space-y-3">
                      <Upload className="h-10 w-10 text-[#2F7D6D] mx-auto" />
                      <div className="space-y-1">
                        <strong className="text-sm text-[#174C45] block">Arraste a foto ou arquivo PDF da receita aqui</strong>
                        <span className="text-xs text-[#6B7A78] block">Certifique-se de que o nome do médico, CRM e posologia estejam visíveis.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => showToast("Simulação: arquivo anexado com sucesso!")}
                        className="px-4 py-2 bg-white text-[#174C45] font-bold text-xs rounded-xl border border-[#174C45]/20 cursor-pointer shadow-sm"
                      >
                        Selecionar Arquivo no Dispositivo
                      </button>
                    </div>

                    {/* UPLOADED FILES LIST */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#174C45] block">Arquivos Anexados ({uploadedFiles.length}):</span>
                      {uploadedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-[#F5F7F7] rounded-xl text-xs font-bold border border-[#174C45]/10">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-[#2F7D6D]" />
                            <span>{file}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx))}
                            className="text-[#C94A4A] hover:underline"
                          >
                            Remover
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-2 text-[#174C45] font-bold text-xs hover:underline cursor-pointer"
                      >
                        ← Voltar
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-6 py-2.5 bg-[#174C45] hover:bg-[#2F7D6D] text-white font-bold text-xs rounded-xl cursor-pointer"
                      >
                        Avançar para Preferências →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: PREFERÊNCIAS */}
                {step === 3 && (
                  <div className="space-y-4 animate-fade-in text-xs font-bold">
                    <h3 className="font-serif font-bold text-lg text-[#174C45] border-b border-[#174C45]/10 pb-2">Etapa 3: Preferências de Entrega e Uso</h3>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[#174C45] block mb-1">Como deseja receber a fórmula?</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, deliveryType: "receber" })}
                            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                              formData.deliveryType === "receber" ? "bg-[#174C45] text-white border-[#174C45]" : "bg-[#F5F7F7] text-[#243331]"
                            }`}
                          >
                            Entregar no Meu Endereço
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, deliveryType: "retirar" })}
                            className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                              formData.deliveryType === "retirar" ? "bg-[#174C45] text-white border-[#174C45]" : "bg-[#F5F7F7] text-[#243331]"
                            }`}
                          >
                            Retirar na Loja (Sorocaba)
                          </button>
                        </div>
                      </div>

                      {formData.deliveryType === "receber" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div>
                            <label className="text-[#174C45]">CEP:</label>
                            <input
                              type="text"
                              value={formData.zipCode}
                              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                              className="w-full bg-[#F5F7F7] p-2.5 rounded-xl border border-[#174C45]/20"
                            />
                          </div>
                          <div>
                            <label className="text-[#174C45]">Endereço Completo:</label>
                            <input
                              type="text"
                              value={formData.address}
                              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                              className="w-full bg-[#F5F7F7] p-2.5 rounded-xl border border-[#174C45]/20"
                            />
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="text-[#174C45]">Possui preferência de sabor (se líquido/sachê)?</label>
                          <input
                            type="text"
                            value={formData.flavorPreference}
                            onChange={(e) => setFormData({ ...formData, flavorPreference: e.target.value })}
                            className="w-full bg-[#F5F7F7] p-2.5 rounded-xl border border-[#174C45]/20"
                          />
                        </div>
                        <div>
                          <label className="text-[#174C45]">Dificuldade para engolir cápsulas?</label>
                          <select
                            value={formData.capsuleDifficulty}
                            onChange={(e) => setFormData({ ...formData, capsuleDifficulty: e.target.value })}
                            className="w-full bg-[#F5F7F7] p-2.5 rounded-xl border border-[#174C45]/20"
                          >
                            <option value="Não">Não (Cápsula tradicional)</option>
                            <option value="Sim">Sim (Prefiro sachê/gotas)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-4 py-2 text-[#174C45] font-bold text-xs hover:underline cursor-pointer"
                      >
                        ← Voltar
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(4)}
                        className="px-6 py-2.5 bg-[#174C45] hover:bg-[#2F7D6D] text-white font-bold text-xs rounded-xl cursor-pointer"
                      >
                        Avançar para Consentimento →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: CONSENTIMENTO LGPD & SUBMIT */}
                {step === 4 && (
                  <div className="space-y-4 animate-fade-in text-xs font-bold">
                    <h3 className="font-serif font-bold text-lg text-[#174C45] border-b border-[#174C45]/10 pb-2">Etapa 4: Consentimento & Validação LGPD</h3>

                    <div className="bg-[#DFF2EC]/50 p-4 rounded-2xl border border-[#2F7D6D]/30 space-y-3">
                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.consent1}
                          onChange={(e) => setFormData({ ...formData, consent1: e.target.checked })}
                          className="mt-0.5 accent-[#174C45]"
                        />
                        <span className="text-[#243331]">
                          Autorizo o tratamento dos meus dados pessoais e de saúde para fins de análise técnica da receita e elaboração de orçamento nos termos da LGPD.
                        </span>
                      </div>

                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.consent2}
                          onChange={(e) => setFormData({ ...formData, consent2: e.target.checked })}
                          className="mt-0.5 accent-[#174C45]"
                        />
                        <span className="text-[#243331]">
                          Declaro que os documentos anexados pertencem ao paciente informado e contêm prescrição válida emitida por profissional habilitado.
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-4 py-2 text-[#174C45] font-bold text-xs hover:underline cursor-pointer"
                      >
                        ← Voltar
                      </button>

                      <button
                        type="submit"
                        disabled={isSimulatingAnalysis}
                        className="px-8 py-3 bg-gradient-to-r from-[#2F7D6D] to-[#174C45] text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer flex items-center space-x-2"
                      >
                        {isSimulatingAnalysis ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Analisando Documentos...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 text-[#C5A461]" />
                            <span>Enviar Receita para Análise Farmacêutica</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>
          )}

          {/* VIEW: CONFIRMAÇÃO DO ENVIO DA RECEITA */}
          {activeTab === "recipe-success" && (
            <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-[#DFF2EC] text-[#174C45] mx-auto flex items-center justify-center border-4 border-[#2F7D6D]/30 shadow-xl">
                <CheckCircle2 className="h-10 w-10 text-[#2F7D6D]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-[#2F7D6D] uppercase tracking-wider">Solicitação Recebida</span>
                <h1 className="font-serif text-3xl font-black text-[#174C45]">Sua Receita Foi Enviada com Sucesso!</h1>
                <p className="text-xs text-[#6B7A78] max-w-md mx-auto">
                  Nossa equipe farmacêutica iniciou a triagem do seu documento. Você receberá a notificação com o orçamento pelo WhatsApp cadastrado.
                </p>
              </div>

              {/* PROTOCOL BADGE */}
              <div className="bg-white p-6 rounded-2xl border-2 border-[#C5A461] max-w-md mx-auto shadow-md space-y-2">
                <span className="text-[10px] text-[#6B7A78] uppercase font-bold block">Seu Número de Protocolo:</span>
                <div className="font-mono text-2xl font-black text-[#174C45]">{createdProtocol || "SOL-2026-01842"}</div>
                <span className="text-[10px] text-[#2F7D6D] font-bold block">Guarde este código para acompanhar o andamento.</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => setActiveTab("track-order")}
                  className="px-6 py-3 bg-[#174C45] text-white font-bold text-xs rounded-xl shadow cursor-pointer flex items-center space-x-2"
                >
                  <Search className="h-4 w-4" />
                  <span>Acompanhar Solicitação Agora</span>
                </button>

                <button
                  onClick={() => setActiveTab("quote-demo")}
                  className="px-6 py-3 bg-[#DFF2EC] text-[#174C45] font-bold text-xs rounded-xl cursor-pointer flex items-center space-x-2"
                >
                  <DollarSign className="h-4 w-4 text-[#2F7D6D]" />
                  <span>Ver Modelo de Orçamento</span>
                </button>
              </div>
            </div>
          )}

          {/* VIEW: ACOMPANHAMENTO DA SOLICITAÇÃO */}
          {activeTab === "track-order" && (
            <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-8 animate-fade-in">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-[#2F7D6D] uppercase tracking-wider">Rastreabilidade em Tempo Real</span>
                <h1 className="font-serif text-3xl font-black text-[#174C45]">Acompanhar Solicitação</h1>
                <p className="text-xs text-[#6B7A78]">Informe seu protocolo ou CPF para consultar o status da receita e do orçamento.</p>
              </div>

              {/* SEARCH PROTOCOL BAR */}
              <div className="bg-white p-4 rounded-2xl border border-[#174C45]/10 shadow-sm flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Digite seu protocolo (ex: SOL-2026-01842) ou CPF"
                  value={searchProtocol}
                  onChange={(e) => setSearchProtocol(e.target.value)}
                  className="flex-1 bg-[#F5F7F7] px-4 py-2.5 rounded-xl border border-[#174C45]/20 text-xs font-bold outline-none"
                />
                <button
                  onClick={() => showToast(`Buscando protocolo: ${searchProtocol}`)}
                  className="px-6 py-2.5 bg-[#174C45] text-white font-bold text-xs rounded-xl cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Search className="h-4 w-4" />
                  <span>Consultar Status</span>
                </button>
              </div>

              {/* MOCKED DETAIL RESULT */}
              {searchedRequest && (
                <div className="bg-white rounded-3xl border border-[#174C45]/10 p-6 md:p-8 shadow-lg space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#174C45]/10 pb-4 gap-4">
                    <div>
                      <span className="text-[10px] text-[#6B7A78] font-bold block">PROTOCOLO DA SOLICITAÇÃO</span>
                      <h2 className="font-mono text-xl font-black text-[#174C45]">{searchedRequest.protocol}</h2>
                      <span className="text-xs text-[#6B7A78]">Paciente: <strong>{searchedRequest.clientName}</strong> • {searchedRequest.date}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-[#DFF2EC] text-[#174C45] rounded-full text-xs font-bold border border-[#2F7D6D]/30">
                        Status: {searchedRequest.status}
                      </span>
                    </div>
                  </div>

                  {/* TIMELINE PROGRESS */}
                  <div className="space-y-4">
                    <h3 className="font-serif font-bold text-sm text-[#174C45]">Linha do Tempo do Atendimento:</h3>

                    <div className="relative pl-6 border-l-2 border-[#2F7D6D] space-y-6 text-xs">
                      <div className="relative">
                        <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#174C45] border-2 border-white" />
                        <strong className="text-[#174C45] block">10:42 — Receita Recebida</strong>
                        <span className="text-[#6B7A78]">Documentos e preferências cadastrados pelo portal.</span>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#174C45] border-2 border-white" />
                        <strong className="text-[#174C45] block">10:50 — Análise Farmacêutica Iniciada</strong>
                        <span className="text-[#6B7A78]">Receita encaminhada para conferência da Dra. Fernanda Martins.</span>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#174C45] border-2 border-white" />
                        <strong className="text-[#174C45] block">11:12 — Prescrição Validada</strong>
                        <span className="text-[#6B7A78]">Conferência de dosagens, incompatibilidades e forma farmacêutica concluída.</span>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#C5A461] border-2 border-white animate-pulse" />
                        <strong className="text-[#174C45] block">11:35 — Orçamento Enviado</strong>
                        <span className="text-[#6B7A78]">Valores disponíveis para aprovação pelo cliente.</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-[#174C45]/10">
                    <button
                      onClick={() => setActiveTab("quote-demo")}
                      className="px-5 py-2.5 bg-[#174C45] text-white font-bold text-xs rounded-xl cursor-pointer flex items-center space-x-1"
                    >
                      <DollarSign className="h-4 w-4 text-[#C5A461]" />
                      <span>Visualizar Detalhes do Orçamento</span>
                    </button>

                    <button
                      onClick={() => showToast("Atendimento iniciado no WhatsApp!")}
                      className="px-5 py-2.5 bg-[#2F7D6D] text-white font-bold text-xs rounded-xl cursor-pointer flex items-center space-x-1"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Falar com o Farmacêutico no Whats</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW: ORÇAMENTO DEMONSTRATIVO */}
          {activeTab === "quote-demo" && (
            <div className="max-w-3xl mx-auto px-4 py-12 text-left space-y-8 animate-fade-in">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-[#2F7D6D] uppercase tracking-wider">Proposta Comercial Transparente</span>
                <h1 className="font-serif text-3xl font-black text-[#174C45]">Orçamento Demonstrativo</h1>
                <p className="text-xs text-[#6B7A78]">Protocolo SOL-2026-01842 • Válido até 26/07/2026</p>
              </div>

              <div className="bg-white rounded-3xl border border-[#174C45]/10 p-6 md:p-8 shadow-xl space-y-6">
                
                {/* HEADER INFO */}
                <div className="grid grid-cols-2 gap-4 text-xs font-bold border-b border-[#174C45]/10 pb-4">
                  <div>
                    <span className="text-[#6B7A78] block">PACIENTE:</span>
                    <strong className="text-[#174C45]">Mariana Oliveira</strong>
                  </div>
                  <div>
                    <span className="text-[#6B7A78] block">PRESCRITOR:</span>
                    <strong className="text-[#174C45]">Dra. Camila Nogueira (CRM 123456)</strong>
                  </div>
                </div>

                {/* ITEMS TABLE */}
                <div className="space-y-3">
                  <h3 className="font-serif font-bold text-sm text-[#174C45]">Itens da Fórmula Manipulada:</h3>

                  <div className="space-y-3">
                    <div className="p-4 bg-[#F5F7F7] rounded-2xl border border-[#174C45]/10 space-y-1">
                      <div className="flex justify-between text-xs font-bold text-[#174C45]">
                        <span>Item 1: Fórmula Manipulada em Cápsulas (60 unidades)</span>
                        <span className="font-mono text-[#2F7D6D]">R$ 129,90</span>
                      </div>
                      <p className="text-[11px] text-[#6B7A78]">
                        Composição: Coenzima Q10 100mg + Biotina 5mg + Magnésio Dimalato 200mg per cápsula.
                      </p>
                      <span className="text-[10px] text-[#2F7D6D] font-bold block">Prazo de Produção: 3 dias úteis</span>
                    </div>

                    <div className="p-4 bg-[#F5F7F7] rounded-2xl border border-[#174C45]/10 space-y-1">
                      <div className="flex justify-between text-xs font-bold text-[#174C45]">
                        <span>Item 2: Sérum Facial Manipulado (30ml)</span>
                        <span className="font-mono text-[#2F7D6D]">R$ 89,90</span>
                      </div>
                      <p className="text-[11px] text-[#6B7A78]">
                        Composição: Ácido Hialurônico 2% + Niacinamida 5% + Vitamina C Tópica 10% em Sérum leve.
                      </p>
                      <span className="text-[10px] text-[#2F7D6D] font-bold block">Prazo de Produção: 4 dias úteis</span>
                    </div>
                  </div>
                </div>

                {/* SUMMARY TOTALS */}
                <div className="bg-[#DFF2EC]/50 p-4 rounded-2xl border border-[#2F7D6D]/30 space-y-2 text-xs font-bold">
                  <div className="flex justify-between text-[#6B7A78]">
                    <span>Subtotal das Fórmulas:</span>
                    <span>R$ 219,80</span>
                  </div>
                  <div className="flex justify-between text-[#6B7A78]">
                    <span>Frete / Entrega Expressa:</span>
                    <span>R$ 12,00</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#174C45] pt-2 border-t border-[#174C45]/10">
                    <span className="font-serif font-black">VALOR TOTAL DO ORÇAMENTO:</span>
                    <span className="font-mono text-base font-black text-[#2F7D6D]">R$ 231,80</span>
                  </div>
                </div>

                {/* APPROVAL ACTIONS */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      showToast("Orçamento aprovado com sucesso! Entraremos em contato.");
                      setActiveTab("home");
                    }}
                    className="flex-1 py-3 bg-[#174C45] hover:bg-[#2F7D6D] text-white font-bold text-xs rounded-xl shadow cursor-pointer text-center"
                  >
                    Aprovar Orçamento e Iniciar Produção
                  </button>

                  <button
                    onClick={() => showToast("Solicitação de alteração enviada ao farmacêutico.")}
                    className="py-3 px-4 bg-white border border-[#174C45]/20 text-[#174C45] font-bold text-xs rounded-xl cursor-pointer hover:bg-[#F5F7F7]"
                  >
                    Solicitar Alteração
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* VIEW: OUTRAS PÁGINAS INSTITUCIONAIS (SOBRE, LABS, ESPECIALIDADES, ETC) */}
          {activeTab === "about" && (
            <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-8 animate-fade-in">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-[#2F7D6D] uppercase tracking-wider">Nossa Trajetória</span>
                <h1 className="font-serif text-3xl font-black text-[#174C45]">Sobre a Fórmula Vita</h1>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-[#174C45]/10 shadow-md space-y-6 text-sm leading-relaxed text-[#6B7A78]">
                <p>
                  A <strong className="text-[#174C45]">Fórmula Vita</strong> nasceu com o propósito de oferecer soluções manipuladas verdadeiramente personalizadas, aproximando conhecimento científico farmacêutico, tecnologia laboratorial de ponta e um acolhimento humano dedicado.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs font-bold">
                  <div className="bg-[#DFF2EC]/50 p-4 rounded-2xl border border-[#2F7D6D]/20 space-y-1">
                    <h3 className="font-serif text-sm text-[#174C45]">Missão</h3>
                    <p className="font-normal text-[#6B7A78]">Produzir fórmulas individualizadas com exatidão técnica, pureza e acompanhamento rigoroso.</p>
                  </div>

                  <div className="bg-[#DFF2EC]/50 p-4 rounded-2xl border border-[#2F7D6D]/20 space-y-1">
                    <h3 className="font-serif text-sm text-[#174C45]">Visão</h3>
                    <p className="font-normal text-[#6B7A78]">Ser referência em manipulados farmacêuticos e atendimento clínico diferenciado no estado.</p>
                  </div>

                  <div className="bg-[#DFF2EC]/50 p-4 rounded-2xl border border-[#2F7D6D]/20 space-y-1">
                    <h3 className="font-serif text-sm text-[#174C45]">Valores</h3>
                    <p className="font-normal text-[#6B7A78]">Ética, transparência, precisão laboratorial, respeito ao prescritor e empatia ao paciente.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: PARA PROFISSIONAIS DA SAÚDE */}
          {activeTab === "professionals" && (
            <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-8 animate-fade-in">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-[#2F7D6D] uppercase tracking-wider">Parceria Científica</span>
                <h1 className="font-serif text-3xl font-black text-[#174C45]">Para Profissionais da Saúde</h1>
                <p className="text-xs text-[#6B7A78]">Suporte técnico direto com nossos farmacêuticos sobre ativos, veículos e sugestões de fórmulas.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-[#174C45]/10 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-[#174C45]">Cadastre-se como Prescritor Parceiro</h3>
                  <p className="text-xs text-[#6B7A78]">Receba catálogos técnicos atualizados, amostras de veículos dermocosméticos e suporte em prescrições personalizadas.</p>

                  <div className="space-y-2 text-xs font-bold">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-[#2F7D6D]" />
                      <span>Canal direto via WhatsApp com a Responsável Técnica</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-[#2F7D6D]" />
                      <span>Manual de Formas Farmacêuticas & Posologias</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-[#2F7D6D]" />
                      <span>Atendimento diferenciado para pacientes indicados</span>
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    showToast("Cadastro de parceiro realizado com sucesso!");
                  }}
                  className="space-y-3 text-xs font-bold"
                >
                  <div>
                    <label className="text-[#174C45]">Nome Completo:</label>
                    <input type="text" required placeholder="Dr. / Dra." className="w-full bg-[#F5F7F7] p-2.5 rounded-xl border border-[#174C45]/20 outline-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[#174C45]">Conselho:</label>
                      <select className="w-full bg-[#F5F7F7] p-2.5 rounded-xl border border-[#174C45]/20 outline-none">
                        <option>CRM (Médico)</option>
                        <option>CRN (Nutricionista)</option>
                        <option>CRMV (Veterinário)</option>
                        <option>CRO (Dentista)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[#174C45]">Nº Registro:</label>
                      <input type="text" required placeholder="00000/SP" className="w-full bg-[#F5F7F7] p-2.5 rounded-xl border border-[#174C45]/20 outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[#174C45]">E-mail Profissional:</label>
                    <input type="email" required placeholder="dr@clinica.com.br" className="w-full bg-[#F5F7F7] p-2.5 rounded-xl border border-[#174C45]/20 outline-none" />
                  </div>

                  <button type="submit" className="w-full py-3 bg-[#174C45] hover:bg-[#2F7D6D] text-white font-bold rounded-xl shadow cursor-pointer">
                    Solicitar Acesso e Matérias Técnicos
                  </button>
                </form>
              </div>
            </div>
          )}

        </main>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: ÁREA DO CLIENTE (MARIANA OLIVEIRA) */}
      {/* ========================================================================= */}
      {activeRole === "client" && (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 text-left animate-fade-in">
          <div className="bg-gradient-to-r from-[#174C45] to-[#2F7D6D] text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-[#C5A461] text-black font-black font-serif text-xl flex items-center justify-center border-2 border-white">
                MO
              </div>
              <div>
                <h2 className="font-serif font-black text-2xl">Bem-vinda, Mariana Oliveira!</h2>
                <span className="text-xs text-[#DFF2EC] font-bold block">CPF: 123.456.789-00 • Sorocaba/SP</span>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveRole("public");
                setActiveTab("send-recipe");
              }}
              className="px-5 py-2.5 bg-[#C5A461] text-black font-extrabold text-xs rounded-xl shadow hover:bg-white transition-all cursor-pointer flex items-center space-x-1"
            >
              <FileText className="h-4 w-4" />
              <span>Enviar Nova Receita</span>
            </button>
          </div>

          {/* DASHBOARD STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-left">
            <div className="bg-white p-5 rounded-2xl border border-[#174C45]/10 shadow-sm space-y-1">
              <span className="text-[10px] text-[#6B7A78] uppercase font-bold">Solicitações Ativas</span>
              <div className="font-serif font-black text-2xl text-[#174C45]">1 Em Andamento</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#174C45]/10 shadow-sm space-y-1">
              <span className="text-[10px] text-[#6B7A78] uppercase font-bold">Orçamentos Recentes</span>
              <div className="font-serif font-black text-2xl text-[#2F7D6D]">2 Propostas</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#174C45]/10 shadow-sm space-y-1">
              <span className="text-[10px] text-[#6B7A78] uppercase font-bold">Histórico de Pedidos</span>
              <div className="font-serif font-black text-2xl text-[#174C45]">4 Concluídos</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#174C45]/10 shadow-sm space-y-1">
              <span className="text-[10px] text-[#6B7A78] uppercase font-bold">Receitas Guardadas</span>
              <div className="font-serif font-black text-2xl text-[#C5A461]">1 Armazenada</div>
            </div>
          </div>

          {/* CLIENT RECENT ORDERS TABLE */}
          <div className="bg-white p-6 rounded-3xl border border-[#174C45]/10 shadow-md space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#174C45]">Suas Solicitações e Orçamentos:</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F5F7F7] text-[#174C45] uppercase font-bold border-b border-[#174C45]/10">
                  <tr>
                    <th className="p-3">Protocolo</th>
                    <th className="p-3">Data</th>
                    <th className="p-3">Tipo</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Valor</th>
                    <th className="p-3">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#174C45]/10">
                  {MOCK_REQUESTS.map((req) => (
                    <tr key={req.id} className="hover:bg-[#F5F7F7]">
                      <td className="p-3 font-mono font-bold text-[#174C45]">{req.protocol}</td>
                      <td className="p-3 text-[#6B7A78]">{req.date}</td>
                      <td className="p-3 font-bold text-[#243331]">{req.type}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-0.5 rounded-full font-bold bg-[#DFF2EC] text-[#174C45]">
                          {req.status}
                        </span>
                      </td>
                      <td className="p-3 font-mono font-bold text-[#2F7D6D]">R$ {req.totalValue?.toFixed(2)}</td>
                      <td className="p-3">
                        <button
                          onClick={() => {
                            setActiveRole("public");
                            setActiveTab("quote-demo");
                          }}
                          className="px-3 py-1 bg-[#174C45] text-white rounded-lg font-bold text-[10px] cursor-pointer"
                        >
                          Ver Orçamento
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

      {/* ========================================================================= */}
      {/* MODE 3: PAINEL ADMINISTRATIVO (DRA. FERNANDA MARTINS) */}
      {/* ========================================================================= */}
      {activeRole === "admin" && (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 text-left animate-fade-in">
          
          {/* ADMIN HEADER */}
          <div className="bg-[#174C45] text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A461] text-black font-black flex items-center justify-center font-serif text-lg">
                FM
              </div>
              <div>
                <h2 className="font-serif font-black text-xl">Dra. Fernanda Martins</h2>
                <span className="text-xs text-[#DFF2EC] font-bold block">Farmacêutica Administradora • CRF-SP 00.000</span>
              </div>
            </div>

            {/* ADMIN SUB-TAB SWITCHER */}
            <div className="flex bg-white/10 p-1 rounded-xl text-xs font-bold">
              {[
                { id: "dashboard", label: "Dashboard Metrias" },
                { id: "requests", label: "Gestão de Solicitações" },
                { id: "ingredients", label: "Gestão de Ativos" },
                { id: "reports", label: "Relatórios Exportar" }
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveAdminTab(sub.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeAdminTab === sub.id ? "bg-[#2F7D6D] text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>

          {/* ADMIN TAB 1: DASHBOARD METRICS */}
          {activeAdminTab === "dashboard" && (
            <div className="space-y-6">
              
              {/* STAT CARDS GRID */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#174C45]/10 shadow-sm space-y-1">
                  <span className="text-[10px] text-[#6B7A78] uppercase font-bold block">Solicitações Hoje</span>
                  <div className="font-serif font-black text-3xl text-[#174C45]">18</div>
                  <span className="text-[10px] text-[#2F7D6D] font-bold block">+22% vs ontem</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#174C45]/10 shadow-sm space-y-1">
                  <span className="text-[10px] text-[#6B7A78] uppercase font-bold block">Aguardando Análise</span>
                  <div className="font-serif font-black text-3xl text-[#C94A4A]">6</div>
                  <span className="text-[10px] text-[#C94A4A] font-bold block">Prioridade em triagem</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#174C45]/10 shadow-sm space-y-1">
                  <span className="text-[10px] text-[#6B7A78] uppercase font-bold block">Taxa de Conversão</span>
                  <div className="font-serif font-black text-3xl text-[#2F7D6D]">55,6%</div>
                  <span className="text-[10px] text-[#2F7D6D] font-bold block">Orçamentos Aprovados</span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#174C45]/10 shadow-sm space-y-1">
                  <span className="text-[10px] text-[#6B7A78] uppercase font-bold block">Receita Estimada (Mês)</span>
                  <div className="font-serif font-black text-2xl text-[#174C45]">R$ 42.680</div>
                  <span className="text-[10px] text-[#C5A461] font-bold block">Ticket médio: R$ 185</span>
                </div>
              </div>

              {/* RECHARTS GRAPHS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-[#174C45]/10 shadow-md space-y-4">
                  <h3 className="font-serif font-bold text-sm text-[#174C45]">Solicitações Recebidas por Dia (Julho)</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { day: "Seg", reqs: 14 },
                        { day: "Ter", reqs: 19 },
                        { day: "Qua", reqs: 22 },
                        { day: "Qui", reqs: 18 },
                        { day: "Sex", reqs: 25 },
                        { day: "Sáb", reqs: 10 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="reqs" fill="#2F7D6D" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-[#174C45]/10 shadow-md space-y-4">
                  <h3 className="font-serif font-bold text-sm text-[#174C45]">Distribuição de Categorias Manipuladas</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Dermatologia", value: 40 },
                            { name: "Suplementação", value: 30 },
                            { name: "Med. Integrativa", value: 15 },
                            { name: "Veterinária", value: 15 }
                          ]}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          <Cell fill="#174C45" />
                          <Cell fill="#2F7D6D" />
                          <Cell fill="#C5A461" />
                          <Cell fill="#357C9A" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ADMIN TAB 2: GESTÃO DE SOLICITAÇÕES */}
          {activeAdminTab === "requests" && (
            <div className="bg-white p-6 rounded-3xl border border-[#174C45]/10 shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-bold text-lg text-[#174C45]">Fila de Atendimento e Triagem</h3>
                <button
                  onClick={() => showToast("Fila de solicitações atualizada!")}
                  className="px-3 py-1.5 bg-[#DFF2EC] text-[#174C45] font-bold text-xs rounded-xl cursor-pointer"
                >
                  Atualizar Fila
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F5F7F7] text-[#174C45] uppercase font-bold border-b border-[#174C45]/10">
                    <tr>
                      <th className="p-3">Protocolo</th>
                      <th className="p-3">Cliente / Telefone</th>
                      <th className="p-3">Data/Hora</th>
                      <th className="p-3">Anexos</th>
                      <th className="p-3">Status Atual</th>
                      <th className="p-3">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#174C45]/10">
                    {adminRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-[#F5F7F7]">
                        <td className="p-3 font-mono font-bold text-[#174C45]">{req.protocol}</td>
                        <td className="p-3">
                          <strong className="text-[#243331] block">{req.clientName}</strong>
                          <span className="text-[10px] text-[#6B7A78]">{req.phone}</span>
                        </td>
                        <td className="p-3 text-[#6B7A78]">{req.date}</td>
                        <td className="p-3 font-bold text-[#2F7D6D]">{req.attachmentsCount} arquivo(s)</td>
                        <td className="p-3">
                          <select
                            value={req.status}
                            onChange={(e) => {
                              const newStatus = e.target.value as any;
                              setAdminRequests(adminRequests.map((r) => r.id === req.id ? { ...r, status: newStatus } : r));
                              showToast(`Status alterado para: ${newStatus}`);
                            }}
                            className="bg-[#DFF2EC] text-[#174C45] font-bold p-1 rounded-lg border border-[#2F7D6D]/30 text-xs outline-none"
                          >
                            <option value="Recebida">Recebida</option>
                            <option value="Em análise">Em análise</option>
                            <option value="Aguardando documento">Aguardando documento</option>
                            <option value="Orçamento enviado">Orçamento enviado</option>
                            <option value="Em produção">Em produção</option>
                            <option value="Finalizada">Finalizada</option>
                          </select>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => setSelectedAdminReq(req)}
                            className="px-3 py-1 bg-[#174C45] text-white font-bold rounded-lg text-[10px] cursor-pointer"
                          >
                            Analisar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ADMIN TAB 3: GESTÃO DE ATIVOS */}
          {activeAdminTab === "ingredients" && (
            <div className="bg-white p-6 rounded-3xl border border-[#174C45]/10 shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-bold text-lg text-[#174C45]">Catálogo e Cadastro de Ativos</h3>
                <button
                  onClick={() => showToast("Formulário de novo ativo aberto!")}
                  className="px-4 py-2 bg-[#174C45] text-white font-bold text-xs rounded-xl cursor-pointer flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Cadastrar Novo Ativo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
                {MOCK_INGREDIENTS.map((ing) => (
                  <div key={ing.id} className="p-4 bg-[#F5F7F7] rounded-2xl border border-[#174C45]/10 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#174C45]">{ing.name}</h4>
                      <span className="text-[10px] text-[#2F7D6D]">{ing.category}</span>
                    </div>
                    <button
                      onClick={() => showToast(`Editando ativo: ${ing.name}`)}
                      className="px-3 py-1 bg-white border border-[#174C45]/20 text-[#174C45] rounded-lg text-[10px]"
                    >
                      Editar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADMIN TAB 4: RELATÓRIOS */}
          {activeAdminTab === "reports" && (
            <div className="bg-white p-6 rounded-3xl border border-[#174C45]/10 shadow-md space-y-4 text-left">
              <h3 className="font-serif font-bold text-lg text-[#174C45]">Relatórios Gerenciais Exportáveis</h3>
              <p className="text-xs text-[#6B7A78]">Exporte dados compilados para prestação de contas e planejamento de compras de insumos.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Relatório de Solicitações do Mês",
                  "Consumo de Ativos Dermocosméticos",
                  "Conversão de Orçamentos por Atendente",
                  "Desempenho de Entregas na Região",
                  "Lista de Prescritores Frequentes",
                  "Rastreabilidade de Lotes e Matérias"
                ].map((rep, idx) => (
                  <div key={idx} className="p-4 bg-[#F5F7F7] rounded-2xl border border-[#174C45]/10 space-y-3">
                    <strong className="text-xs text-[#174C45] block">{rep}</strong>
                    <button
                      onClick={() => showToast(`Exportando ${rep} em PDF/Excel...`)}
                      className="w-full py-2 bg-[#174C45] text-white font-bold text-[10px] rounded-xl cursor-pointer flex items-center justify-center space-x-1"
                    >
                      <Download className="h-3.5 w-3.5 text-[#C5A461]" />
                      <span>Exportar PDF / Excel</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODAL ADMIN REQUEST DETAIL */}
          {selectedAdminReq && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 text-left shadow-2xl border border-[#174C45]/20">
                <div className="flex justify-between items-center border-b border-[#174C45]/10 pb-2">
                  <h3 className="font-serif font-bold text-lg text-[#174C45]">Análise de Receita — {selectedAdminReq.protocol}</h3>
                  <button onClick={() => setSelectedAdminReq(null)} className="text-[#6B7A78] hover:text-[#174C45]">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-2 text-xs font-bold text-[#243331]">
                  <div><span className="text-[#6B7A78]">Paciente:</span> {selectedAdminReq.clientName}</div>
                  <div><span className="text-[#6B7A78]">Telefone:</span> {selectedAdminReq.phone}</div>
                  <div><span className="text-[#6B7A78]">Arquivos Anexados:</span> {selectedAdminReq.attachmentsCount} documento(s)</div>
                </div>

                <div className="p-4 bg-[#DFF2EC] rounded-2xl text-xs space-y-1">
                  <strong className="text-[#174C45] block">Pré-Validação Farmacêutica:</strong>
                  <p className="text-[#243331]">Documento legível. Receita emitida por Dra. Camila Nogueira contendo Sérum Facial e Cápsulas Antioxidantes.</p>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={() => {
                      showToast("Orçamento elaborado e encaminhado ao paciente!");
                      setSelectedAdminReq(null);
                    }}
                    className="px-4 py-2 bg-[#174C45] text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Gerar e Enviar Orçamento
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* FLOATING WHATSAPP CHAT BUTTON & POPOVER */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {showWhatsAppChat && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="mb-4 bg-white rounded-3xl p-5 shadow-2xl border-2 border-[#1F8A5B] max-w-xs text-left space-y-3"
            >
              <div className="flex items-center justify-between border-b border-[#174C45]/10 pb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#1F8A5B] text-white flex items-center justify-center font-bold">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="text-xs text-[#174C45] block">Atendimento WhatsApp</strong>
                    <span className="text-[10px] text-emerald-600 font-bold block">● Farmacêutico Online</span>
                  </div>
                </div>
                <button onClick={() => setShowWhatsAppChat(false)} className="text-[#6B7A78]">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-xs text-[#6B7A78]">
                Olá! Como podemos ajudar com sua fórmula hoje? Escolha uma opção:
              </p>

              <div className="space-y-1.5 text-xs font-bold">
                {[
                  "Quero enviar uma receita",
                  "Quero solicitar um orçamento",
                  "Quero acompanhar uma solicitação",
                  "Quero falar com um farmacêutico",
                  "Saber sobre entregas"
                ].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      showToast(`Redirecionando para o WhatsApp: "${opt}"`);
                      setShowWhatsAppChat(false);
                    }}
                    className="w-full text-left p-2 bg-[#F5F7F7] hover:bg-[#DFF2EC] text-[#174C45] rounded-xl transition-all cursor-pointer block"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setShowWhatsAppChat(!showWhatsAppChat)}
          className="w-14 h-14 rounded-full bg-[#1F8A5B] hover:bg-[#174C45] text-white shadow-2xl flex items-center justify-center cursor-pointer transition-transform hover:scale-110 border-2 border-white"
        >
          <MessageSquare className="h-7 w-7" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* LGPD COOKIE BANNER */}
      {/* ========================================================================= */}
      {!cookieAccepted && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#174C45] text-white p-4 z-40 border-t border-[#C5A461]/40 shadow-2xl text-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <p className="text-white/90">
              Utilizamos cookies e tecnologias para garantir a segurança no envio de receitas e melhorar sua experiência no portal Fórmula Vita conforme a Lei Geral de Proteção de Dados (LGPD).
            </p>
            <div className="flex items-center space-x-2 shrink-0 font-bold">
              <button
                onClick={() => setCookieAccepted(true)}
                className="px-4 py-2 bg-[#C5A461] text-black rounded-xl hover:bg-white transition-all cursor-pointer"
              >
                Aceitar Todos
              </button>
              <button
                onClick={() => setCookieAccepted(true)}
                className="px-3 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all cursor-pointer"
              >
                Personalizar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FOOTER INSTITUCIONAL */}
      {/* ========================================================================= */}
      <footer className="bg-[#174C45] text-white pt-16 pb-12 border-t border-white/10 text-left text-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FlaskConical className="h-6 w-6 text-[#C5A461]" />
                <span className="font-serif font-black text-xl text-white">Fórmula Vita</span>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">
                Cuidado personalizado em cada fórmula. Manipulação com precisão, qualidade e acompanhamento técnico para atender às necessidades individuais de cada paciente.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#C5A461]">Links Institucionais</h4>
              <ul className="space-y-2 text-white/80">
                <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab("about")}>Sobre a Farmácia</li>
                <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab("labs")}>Infraestrutura dos Laboratórios</li>
                <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab("specialties")}>Áreas de Atuação</li>
                <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab("ingredients")}>Catálogo de Ativos</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#C5A461]">Atendimento & Localização</h4>
              <p className="text-white/80 leading-relaxed">
                Rua das Acácias, 248 – Centro – Sorocaba/SP<br />
                Telefone: (15) 3232-4545<br />
                WhatsApp: (15) 99912-4545<br />
                atendimento@formulavita.com.br
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#C5A461]">Responsabilidade Técnica</h4>
              <p className="text-white/80 leading-relaxed">
                Dra. Fernanda Martins<br />
                Farmacêutica Responsável — CRF-SP 00.000<br />
                Autorização AFE / ANVISA: 1.23456.7
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[11px] text-white/50 space-y-2 md:space-y-0">
            <p>© {new Date().getFullYear()} Fórmula Vita Farmácia de Manipulação. Todos os direitos reservados. Dados Fictícios para Portfólio.</p>
            <p>As informações possuem caráter educativo e não substituem prescrição médica.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
