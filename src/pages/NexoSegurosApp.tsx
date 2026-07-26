import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Shield,
  Car,
  Home as HomeIcon,
  Heart,
  Plane,
  Building2,
  Stethoscope,
  Briefcase,
  Users,
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Star,
  Clock,
  FileText,
  Search,
  Calculator,
  AlertTriangle,
  Send,
  Check,
  Sparkles,
  Filter,
  X,
  Menu,
  Lock,
  Globe,
  Mail,
  MapPin,
  Award,
  HelpCircle,
  ChevronDown,
  RefreshCw,
  Layers,
  ThumbsUp,
  Zap,
  UserCheck,
  Smartphone,
  Bike,
  FileCheck,
  Headphones,
  User
} from "lucide-react";

interface NexoSegurosAppProps {
  onBack?: () => void;
}

// ---------------------------------------------------------------------------
// TYPES & MOCK DATA
// ---------------------------------------------------------------------------

interface InsuranceProduct {
  id: string;
  title: string;
  category: "pessoa" | "empresa" | "profissional" | "condominio";
  icon: any;
  shortDesc: string;
  fullDesc: string;
  coverages: string[];
  assistances: string[];
  recommendedFor: string[];
  tag: string;
  popular?: boolean;
}

const INSURANCE_PRODUCTS: InsuranceProduct[] = [
  {
    id: "auto",
    title: "Seguro Auto",
    category: "pessoa",
    icon: Car,
    tag: "Mais Procurado",
    popular: true,
    shortDesc: "Proteção completa para seu veículo contra colisão, roubo, furto, danos a terceiros e guincho 24h.",
    fullDesc: "Garantia de tranquilidade no trânsito para motoristas particulares, profissionais e frotas familiares. Oferecemos opções personalizadas de franquia e coberturas sob medida.",
    coverages: [
      "Colisão, incêndio, roubo e furto",
      "Danos materiais e corporais a terceiros (RCF-V)",
      "Proteção completa a vidros, faróis, lanternas e retrovisores",
      "Carro reserva por 7, 15 ou 30 dias",
      "Acidentes pessoais de passageiros (APP)",
      "Fenômenos naturais e alagamento"
    ],
    assistances: [
      "Guincho ilimitado ou até 1.000km",
      "Socorro mecânico e elétrico 24h",
      "Troca de pneus e falta de combustível",
      "Chaveiro 24 horas",
      "Hospedagem em caso de pane longe de casa"
    ],
    recommendedFor: [
      "Veículos particulares de uso diário",
      "Carros novos ou seminovos financiados",
      "Motoristas de aplicativo e táxis",
      "Famílias com mais de um condutor"
    ]
  },
  {
    id: "residencial",
    title: "Seguro Residencial",
    category: "pessoa",
    icon: HomeIcon,
    tag: "Essencial",
    popular: true,
    shortDesc: "Coberturas para sua casa ou apartamento, bens pessoais e assistências emergenciais do dia a dia.",
    fullDesc: "Proteja seu lar contra imprevistos graves e conte com uma rede de profissionais credenciados para reparos hidráulicos, elétricos e chaveiro.",
    coverages: [
      "Incêndio, explosão e fumaça",
      "Danos elétricos e curto-circuito em aparelhos",
      "Roubo e furto qualificado de bens",
      "Vendaval, furacão, ciclone e queda de granizo",
      "Responsabilidade civil familiar (danos a vizinhos)",
      "Aluguel emergencial caso precise sair do imóvel"
    ],
    assistances: [
      "Encanador e desentupimento 24h",
      "Eletricista para reparos rápidos",
      "Chaveiro residencial",
      "Conserto de eletrodomésticos da linha branca",
      "Limpeza e reparos em calhas e telhados"
    ],
    recommendedFor: [
      "Casas e apartamentos próprios ou alugados",
      "Imóveis de praia ou campo",
      "Residências com equipamentos eletrônicos de alto valor"
    ]
  },
  {
    id: "vida",
    title: "Seguro de Vida",
    category: "pessoa",
    icon: Heart,
    tag: "Proteção Familiar",
    popular: true,
    shortDesc: "Segurança financeira para você em vida e amparo garantido para quem você ama.",
    fullDesc: "Muito mais que proteção futura: um seguro de vida moderno oferece indenizações em vida para diagnóstico de doenças graves, diária por incapacidade e reembolso de despesas médicas.",
    coverages: [
      "Morte por qualquer causa",
      "Invalidez permanente total ou parcial por acidente",
      "Diagnóstico de 30+ doenças graves (Câncer, Infarto, AVC, etc.)",
      "Diária por Incapacidade Temporária (DIT) para autônomos",
      "Assistência e funeral individual ou familiar",
      "Segunda opinião médica internacional"
    ],
    assistances: [
      "Orientação médica por telemedicina 24h",
      "Assistência nutricional e psicológica",
      "Desconto em farmácias credenciadas em todo o Brasil"
    ],
    recommendedFor: [
      "Provedores de renda familiar",
      "Pais e mães com filhos em idade escolar",
      "Profissionais liberais e autônomos",
      "Pessoas planejando sucessão patrimonial sem inventário"
    ]
  },
  {
    id: "empresarial",
    title: "Seguro Empresarial",
    category: "empresa",
    icon: Building2,
    tag: "Solução B2B",
    popular: true,
    shortDesc: "Proteção sob medida para patrimônio, estoque, equipamentos e continuidade da sua empresa.",
    fullDesc: "Blindagem patrimonial e financeira para comércios, escritórios, clínicas, indústrias e prestadores de serviço contra interrupções de negócios e sinistros.",
    coverages: [
      "Incêndio, raio, explosão e fumaça",
      "Lucros cessantes / Despesas fixas após sinistro",
      "Roubo de bens, valores e mercadorias",
      "Danos elétricos e quebra de máquinas/equipamentos",
      "Responsabilidade civil operações e produtos",
      "Tumultos, greves e vandalismo"
    ],
    assistances: [
      "Chaveiro comercial e vigilância emergencial 24h",
      "Reparos elétricos e de substituição de vidros",
      "Mão de obra hidráulica e desentupimento"
    ],
    recommendedFor: [
      "Lojas, comércios de rua e shopping centers",
      "Escritórios corporativos e co-workings",
      "Clínicas médicas e consultórios",
      "Galpões industriais e centros de distribuição"
    ]
  },
  {
    id: "viagem",
    title: "Seguro Viagem",
    category: "pessoa",
    icon: Plane,
    tag: "Nacional & Intl",
    shortDesc: "Assistência médica hospitalar, proteção de bagagem e cancelamento para viagens nacionais e internacionais.",
    fullDesc: "Viaje tranquilo atendendo aos requisitos exigidos pelo Tratado de Schengen e países das Américas, Europa, Ásia e África.",
    coverages: [
      "Despesas médicas, hospitalares e odontológicas (DMHO)",
      "Traslado médico e regresso sanitário",
      "Extravio definitivo ou atraso de bagagem",
      "Cancelamento ou interrupção de viagem",
      "Assistência jurídica no exterior"
    ],
    assistances: [
      "Central de atendimento global em português 24/7",
      "Localização de bagagem extraviada",
      "Transmissão de mensagens urgentes"
    ],
    recommendedFor: [
      "Viagens a lazer, turismo ou trabalho",
      "Intercâmbios estudantis e mochilões",
      "Famílias viajando com crianças ou idosos"
    ]
  },
  {
    id: "saude",
    title: "Seguro Saúde & Odonto",
    category: "empresa",
    icon: Stethoscope,
    tag: "Benefício Corporativo",
    shortDesc: "Planos e seguros saúde para sua família ou equipe com ampla rede credenciada.",
    fullDesc: "Ganta acesso aos melhores hospitais, laboratórios e especialistas com opções de reembolso e gestão completa para empresas a partir de 2 vidas.",
    coverages: [
      "Consultas, exames simples e de alta complexidade",
      "Internações hospitalares e UTI sem limite",
      "Parto, pré-natal e cirurgias eletivas/emergenciais",
      "Tratamentos odontológicos e ortodontia",
      "Opções de reembolso médico em todo o país"
    ],
    assistances: [
      "Telemedicina 24/7 sem coparticipação",
      "Programas de medicina preventiva e bem-estar",
      "Coleta domiciliar de exames de laboratório"
    ],
    recommendedFor: [
      "Famílias que buscam atendimento médico ágil",
      "PMEs e grandes empresas como retenção de talentos",
      "Profissionais com CNPJ (MEI/EIRELI/LTDA)"
    ]
  },
  {
    id: "rc_profissional",
    title: "Responsabilidade Civil Profissional (E&O)",
    category: "profissional",
    icon: Briefcase,
    tag: "Para Profissionais",
    shortDesc: "Proteção jurídica e financeira diante de eventuais falhas profissionais no exercício da profissão.",
    fullDesc: "Resguardo contra alegações de erros, omissões involuntárias ou prejuízos causados a clientes no desempenho das suas funções.",
    coverages: [
      "Custos de defesa judicial e honorários advocatícios",
      "Acordos judiciais e extrajudiciais homologados",
      "Indenizações por danos materiais, corporais ou morais",
      "Gerenciamento de crise de imagem e assessoria de imprensa"
    ],
    assistances: [
      "Consultoria jurídica preventiva especializada",
      "Análise preliminar de sinistro em até 24h"
    ],
    recommendedFor: [
      "Médicos, dentistas e profissionais da saúde",
      "Advogados e escritórios de advocacia",
      "Engenheiros, arquitetos e construtores",
      "Contadores, auditores e consultores financeiros"
    ]
  },
  {
    id: "condominio",
    title: "Seguro Condomínio",
    category: "condominio",
    icon: Layers,
    tag: "Obrigatório por Lei",
    shortDesc: "Proteção completa exigida pelo Código Civil para edifícios residenciais, comerciais e mistos.",
    fullDesc: "Garante a estrutura física do edifício, áreas comuns, elevadores, portaria remota e responsabilidade civil do síndico e condomínio.",
    coverages: [
      "Incêndio, queda de raio e explosão da estrutura",
      "Danos elétricos em elevadores, portões e bombas",
      "Responsabilidade civil do condomínio e do síndico",
      "Alagamento, inundação e quebra de vidros",
      "Roubo e furto de bens do condomínio"
    ],
    assistances: [
      "Manutenção preventiva e emergencial 24h",
      "Reparos em portões automáticos e interfones",
      "Limpeza e desentupimento de prumadas"
    ],
    recommendedFor: [
      "Condomínios residenciais de prédios ou casas",
      "Edifícios comerciais e empresariais",
      "Síndicos orgânicos e administradoras de condomínio"
    ]
  }
];

interface BlogPost {
  id: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
  image: string;
  date: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title: "Seguro Auto: Quais coberturas são realmente indispensáveis?",
    category: "Seguro Auto",
    summary: "Aprenda a escolher entre franquia reduzida ou normal, entenda a importância da cobertura para terceiros (RCF) e fuja das armadilhas da contratação rápida.",
    readTime: "4 min de leitura",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
    date: "22 de Julho, 2026"
  },
  {
    id: "post-2",
    title: "Seguro Residencial cobre danos elétricos em tempestades?",
    category: "Residencial",
    summary: "Descubra como proteger seus eletrodomésticos e computadores contra surtos de tensão e como funciona o ressarcimento junto à seguradora.",
    readTime: "3 min de leitura",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    date: "18 de Julho, 2026"
  },
  {
    id: "post-3",
    title: "O que é Franquia do seguro e quando você precisa pagar?",
    category: "Dúvidas Frequentes",
    summary: "Entenda a diferença entre perda parcial e perda total (PT) e saiba exatamente quando o valor da franquia é cobrado do segurado.",
    readTime: "5 min de leitura",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    date: "12 de Julho, 2026"
  },
  {
    id: "post-4",
    title: "Seguro de Vida em Vida: Como funciona a cobertura por Doenças Graves?",
    category: "Vida & Saúde",
    summary: "Entenda por que o seguro de vida moderno não é só para o futuro e como ele atua como blindagem financeira imediata diante de diagnósticos complexos.",
    readTime: "6 min de leitura",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    date: "05 de Julho, 2026"
  },
  {
    id: "post-5",
    title: "Seguro Empresarial: O que sua empresa precisa proteger para crescer?",
    category: "Empresas",
    summary: "Confira o checklist básico de coberturas corporativas que evitam a interrupção do seu negócio após incêndios, furtos ou falhas operacionais.",
    readTime: "4 min de leitura",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    date: "28 de Junho, 2026"
  },
  {
    id: "post-6",
    title: "O que fazer imediatamente após um acidente de trânsito?",
    category: "Orientação & Sinistro",
    summary: "Passo a passo prático para sinalizar o local, registrar o boletim de ocorrência, acionar a assistência 24h e coletar os dados do terceiro envolvido.",
    readTime: "5 min de leitura",
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=600&q=80",
    date: "20 de Junho, 2026"
  }
];

export default function NexoSegurosApp({ onBack }: NexoSegurosAppProps) {
  // Navigation active tab: "home" | "seguros" | "sobre" | "atendimento" | "blog"
  const [activeTab, setActiveTab] = useState<"home" | "seguros" | "sobre" | "atendimento" | "blog">("home");

  // Selected profile filter on homepage: "all" | "pessoa" | "empresa" | "profissional" | "condominio"
  const [profileFilter, setProfileFilter] = useState<"all" | "pessoa" | "empresa" | "profissional" | "condominio">("all");

  // Selected product detail modal
  const [selectedProduct, setSelectedProduct] = useState<InsuranceProduct | null>(null);

  // Quote Wizard Modal State
  const [isQuoteWizardOpen, setIsQuoteWizardOpen] = useState<boolean>(false);
  const [quoteStep, setQuoteStep] = useState<number>(1);
  const [quoteFormData, setQuoteFormData] = useState({
    insuranceType: "Seguro Auto",
    fullName: "",
    phone: "",
    email: "",
    city: "São Paulo - SP",
    contactPref: "WhatsApp",
    details: "Desejo cotação para veículo de uso particular."
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState<boolean>(false);

  // Life Insurance Calculator State
  const [calcData, setCalcData] = useState({
    monthlyIncome: 8000,
    dependents: 2,
    yearsCoverage: 5
  });

  // Simulated Chat Assistant Widget
  const [showChatWidget, setShowChatWidget] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "bot" | "user"; text: string; time: string }>>([
    {
      sender: "bot",
      text: "Olá! Bem-vindo à Nexo Seguros. Sou a consultora virtual. Como podemos proteger você ou sua empresa hoje?",
      time: "10:00"
    }
  ]);
  const [chatInput, setChatInput] = useState<string>("");

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Selected Blog Post Modal
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleSendChat = (presetText?: string) => {
    const textToSend = presetText || chatInput;
    if (!textToSend.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChatMessages(prev => [...prev, { sender: "user", text: textToSend, time }]);
    if (!presetText) setChatInput("");

    setTimeout(() => {
      let botResp = "Excelente! Um dos nossos consultores especialistas analisará suas necessidades e enviará as opções comparativas em até 15 minutos via WhatsApp.";
      if (textToSend.toLowerCase().includes("auto") || textToSend.toLowerCase().includes("carro")) {
        botResp = "Ótimo! Para cotar seu Seguro Auto, você possui a placa do veículo ou o modelo/ano em mãos? Se preferir, clique em 'Solicitar Cotação' para preencher rapidamente.";
      } else if (textToSend.toLowerCase().includes("sinistro") || textToSend.toLowerCase().includes("ajuda")) {
        botResp = "Lamentamos o imprevisto. Nossa equipe de sinistros está a postos. Por favor informe o número do CPF do segurado ou acione nossa linha de emergência 0800.";
      }
      setChatMessages(prev => [...prev, { sender: "bot", text: botResp, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    }, 1000);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
  };

  const filteredProducts = profileFilter === "all"
    ? INSURANCE_PRODUCTS
    : INSURANCE_PRODUCTS.filter(p => p.category === profileFilter);

  // Calculated Insurance Suggestion Amount
  const suggestedLifeCoverage = (calcData.monthlyIncome * 12 * calcData.yearsCoverage) + (calcData.dependents * 50000);

  return (
    <div className="min-h-screen bg-[#F5F7F9] text-[#24313D] font-sans antialiased relative selection:bg-[#1677A3]/20 selection:text-[#123B5D]">
      
      {/* ========================================================================= */}
      {/* TOP EMERGENCY & CONTACT STRIP */}
      {/* ========================================================================= */}
      <div className="bg-[#123B5D] text-white/90 text-xs py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <Phone className="h-3.5 w-3.5 text-[#2FA56A]" />
              <span>Atendimento: (11) 4000-2026</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-[#2FA56A]" />
              <span>WhatsApp: (11) 99999-2026</span>
            </span>
            <span className="flex items-center space-x-1.5 text-white/70">
              <Clock className="h-3.5 w-3.5" />
              <span>Seg a Sex: 08h às 18h</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => { setActiveTab("atendimento"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="text-[#2FA56A] hover:underline font-bold flex items-center space-x-1"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Aviso de Sinistro 24h</span>
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-0.5 rounded text-[11px] font-bold transition-colors"
              >
                ← Voltar ao Portfólio
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN HEADER & NAVIGATION */}
      {/* ========================================================================= */}
      <header className="bg-white sticky top-0 z-40 shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          
          {/* BRAND LOGO */}
          <div
            onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#123B5D] to-[#1677A3] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-6 w-6 text-[#2FA56A]" />
            </div>
            <div className="text-left">
              <div className="flex items-center space-x-1">
                <span className="font-black text-xl tracking-tight text-[#123B5D]">NEXO</span>
                <span className="font-bold text-xl tracking-tight text-[#1677A3]">SEGUROS</span>
              </div>
              <span className="text-[10px] font-medium text-slate-500 block -mt-1 tracking-wider uppercase">
                Corretora de Seguros
              </span>
            </div>
          </div>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-bold text-[#24313D]">
            {[
              { id: "home", label: "Início" },
              { id: "seguros", label: "Seguros" },
              { id: "sobre", label: "Sobre Nós" },
              { id: "blog", label: "Conteúdos & Dicas" },
              { id: "atendimento", label: "Atendimento & Sinistros" }
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => { setActiveTab(nav.id as any); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className={`transition-colors relative py-1 cursor-pointer ${
                  activeTab === nav.id ? "text-[#1677A3]" : "hover:text-[#1677A3]"
                }`}
              >
                <span>{nav.label}</span>
                {activeTab === nav.id && (
                  <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1677A3] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* CTA BUTTON & WHATSAPP LINK */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="https://wa.me/5511999992026"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-emerald-50 text-[#2FA56A] border border-[#2FA56A]/30 hover:bg-[#2FA56A] hover:text-white transition-all cursor-pointer"
              title="Chamar no WhatsApp"
            >
              <MessageSquare className="h-5 w-5" />
            </a>

            <button
              onClick={() => { setIsQuoteWizardOpen(true); setQuoteStep(1); setQuoteSubmitted(false); }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1677A3] to-[#123B5D] text-white font-extrabold text-xs tracking-wider uppercase shadow-md hover:shadow-lg hover:opacity-95 transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <Sparkles className="h-4 w-4 text-[#2FA56A]" />
              <span>Solicitar Cotação</span>
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#123B5D] hover:bg-slate-100"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 text-left font-bold text-sm"
            >
              {[
                { id: "home", label: "Início" },
                { id: "seguros", label: "Seguros" },
                { id: "sobre", label: "Sobre Nós" },
                { id: "blog", label: "Conteúdos & Dicas" },
                { id: "atendimento", label: "Atendimento & Sinistros" }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveTab(m.id as any);
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`block w-full text-left py-2 px-3 rounded-lg ${
                    activeTab === m.id ? "bg-[#EAF5F8] text-[#1677A3]" : "text-slate-700"
                  }`}
                >
                  {m.label}
                </button>
              ))}

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsQuoteWizardOpen(true);
                    setQuoteStep(1);
                    setQuoteSubmitted(false);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-[#1677A3] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl"
                >
                  Solicitar Cotação
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========================================================================= */}
      {/* PAGE VIEW 1: HOME */}
      {/* ========================================================================= */}
      {activeTab === "home" && (
        <main className="space-y-16 pb-20">
          
          {/* HERO SECTION */}
          <section className="relative bg-gradient-to-br from-[#123B5D] via-[#1677A3] to-[#0D2942] text-white py-16 lg:py-24 overflow-hidden text-left">
            {/* Ambient Lighting Gradients */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2FA56A]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#1677A3]/30 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Heading & CTAs */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#2FA56A]">
                  <Sparkles className="h-4 w-4" />
                  <span>Sua corretora consultiva e digital</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white tracking-tight">
                  Proteção para tudo o que conecta você ao futuro.
                </h1>

                <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl">
                  Encontre seguros para sua vida, sua família, seu patrimônio e sua empresa com atendimento próximo, orientação clara e soluções personalizadas de quem analisa o mercado para você.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    onClick={() => { setIsQuoteWizardOpen(true); setQuoteStep(1); setQuoteSubmitted(false); }}
                    className="px-7 py-4 rounded-xl bg-[#2FA56A] hover:bg-emerald-600 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Solicitar Cotação Rápida</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <a
                    href="https://wa.me/5511999992026"
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-sm tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="h-4 w-4 text-[#2FA56A]" />
                    <span>Falar com Consultor</span>
                  </a>
                </div>

                {/* Key Pillars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 text-xs font-medium text-slate-200">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-[#2FA56A] flex-shrink-0" />
                    <span>Atendimento Humano</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-[#2FA56A] flex-shrink-0" />
                    <span>Diversas Seguradoras</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-[#2FA56A] flex-shrink-0" />
                    <span>Transparência Total</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-[#2FA56A] flex-shrink-0" />
                    <span>Apoio em Sinistros</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Hero Mockup Card */}
              <div className="lg:col-span-5 relative">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl space-y-6 text-left">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-[#2FA56A] flex items-center justify-center text-white font-bold">
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">Simulador de Proteção Nexo</h4>
                        <span className="text-xs text-slate-300">Resposta em até 15 minutos</span>
                      </div>
                    </div>
                    <span className="bg-[#2FA56A]/20 text-[#2FA56A] text-[10px] font-black px-2.5 py-1 rounded-full uppercase border border-[#2FA56A]/30">
                      ON-LINE
                    </span>
                  </div>

                  {/* Simulated Card Badges */}
                  <div className="space-y-3">
                    <div className="bg-white/15 p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Car className="h-5 w-5 text-[#2FA56A]" />
                        <div>
                          <span className="font-bold text-xs text-white block">Seguro Auto & Frota</span>
                          <span className="text-[10px] text-slate-300">Cobertura contra terceiros e guincho 24h</span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-emerald-400">Cotar →</span>
                    </div>

                    <div className="bg-white/15 p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <HomeIcon className="h-5 w-5 text-[#2FA56A]" />
                        <div>
                          <span className="font-bold text-xs text-white block">Seguro Residencial</span>
                          <span className="text-[10px] text-slate-300">Incêndio, danos elétricos & encanador</span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-emerald-400">Cotar →</span>
                    </div>

                    <div className="bg-white/15 p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Building2 className="h-5 w-5 text-[#2FA56A]" />
                        <div>
                          <span className="font-bold text-xs text-white block">Seguro Empresarial & Vida</span>
                          <span className="text-[10px] text-slate-300">Blindagem de lucros e saúde corporativa</span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-emerald-400">Cotar →</span>
                    </div>
                  </div>

                  {/* Floating Notification Badge */}
                  <div className="bg-[#123B5D] p-3 rounded-xl border border-[#2FA56A]/40 flex items-center space-x-3 text-xs">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2FA56A] animate-ping flex-shrink-0" />
                    <p className="text-slate-200">
                      <strong className="text-white">Cotação recebida:</strong> Um consultor humano entrará em contato sem compromisso.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* CONFIDENCE BAR */}
          <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
              <div className="flex items-start space-x-3.5">
                <div className="p-3 bg-[#EAF5F8] text-[#1677A3] rounded-xl flex-shrink-0">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#123B5D]">Atendimento Humano</h4>
                  <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                    Você fala com consultores preparados para entender sua necessidade real.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-3 bg-emerald-50 text-[#2FA56A] rounded-xl flex-shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#123B5D]">Soluções Sob Medida</h4>
                  <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                    Analisamos coberturas adequadas sem empurrar cláusulas desnecessárias.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-3 bg-[#EAF5F8] text-[#1677A3] rounded-xl flex-shrink-0">
                  <Layers className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#123B5D]">Comparativo Neutro</h4>
                  <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                    Apresentamos alternativas das melhores seguradoras do mercado.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-3 bg-emerald-50 text-[#2FA56A] rounded-xl flex-shrink-0">
                  <Headphones className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#123B5D]">Suporte em Sinistros</h4>
                  <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                    Acompanhamos você desde a contratação até a regulação do sinistro.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* MAIN INSURANCE PRODUCTS CATALOGUE */}
          <section className="max-w-7xl mx-auto px-4 space-y-8 text-left">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs font-black text-[#1677A3] uppercase tracking-wider bg-[#EAF5F8] px-3 py-1 rounded-full">
                  Soluções em Proteção
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#123B5D]">
                  Proteção para cada momento da sua vida
                </h2>
                <p className="text-sm text-slate-600 max-w-xl">
                  Selecione seu perfil e confira os seguros mais adequados para suas necessidades pessoais, familiares ou empresariais.
                </p>
              </div>

              {/* PROFILE FILTER TABS */}
              <div className="flex flex-wrap gap-2 bg-slate-200/60 p-1.5 rounded-xl">
                {[
                  { id: "all", label: "Todos" },
                  { id: "pessoa", label: "Para Você e Família" },
                  { id: "empresa", label: "Para Empresas" },
                  { id: "profissional", label: "Para Profissionais" },
                  { id: "condominio", label: "Condomínios" }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setProfileFilter(f.id as any)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      profileFilter === f.id
                        ? "bg-[#123B5D] text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* PRODUCT CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-[#1677A3] transition-all flex flex-col justify-between space-y-5 text-left group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-[#EAF5F8] text-[#1677A3] flex items-center justify-center group-hover:bg-[#1677A3] group-hover:text-white transition-colors">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="text-[10px] font-extrabold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full uppercase">
                          {p.tag}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-bold text-lg text-[#123B5D] group-hover:text-[#1677A3] transition-colors">
                          {p.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed pt-2">
                          {p.shortDesc}
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-bold text-[#123B5D] block">Principais coberturas:</span>
                        {p.coverages.slice(0, 3).map((cov, ci) => (
                          <div key={ci} className="flex items-center space-x-2 text-[11px] text-slate-600">
                            <Check className="h-3.5 w-3.5 text-[#2FA56A] flex-shrink-0" />
                            <span className="truncate">{cov}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 gap-2 flex flex-col">
                      <button
                        onClick={() => setSelectedProduct(p)}
                        className="w-full py-2.5 rounded-xl bg-[#EAF5F8] hover:bg-[#1677A3] hover:text-white text-[#1677A3] font-bold text-xs transition-colors cursor-pointer"
                      >
                        Ver Detalhes & Coberturas
                      </button>

                      <button
                        onClick={() => {
                          setQuoteFormData(prev => ({ ...prev, insuranceType: p.title }));
                          setIsQuoteWizardOpen(true);
                          setQuoteStep(1);
                          setQuoteSubmitted(false);
                        }}
                        className="w-full py-2.5 rounded-xl bg-[#123B5D] hover:bg-[#1677A3] text-white font-extrabold text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center space-x-1"
                      >
                        <span>Simular Cotação</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* INTERACTIVE PROFILE SELECTOR: "O que você deseja proteger?" */}
          <section className="bg-[#EAF5F8] py-12 border-y border-slate-200 text-left">
            <div className="max-w-7xl mx-auto px-4 space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-black text-[#1677A3] uppercase tracking-wider">Navegação por Necessidade</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#123B5D]">O que você deseja proteger hoje?</h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Clique no seu objetivo e receba instantaneamente a recomendação de proteção da Nexo Seguros.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {[
                  { name: "Meu Carro", icon: Car, target: "auto" },
                  { name: "Minha Casa", icon: HomeIcon, target: "residencial" },
                  { name: "Minha Família", icon: Heart, target: "vida" },
                  { name: "Minha Viagem", icon: Plane, target: "viagem" },
                  { name: "Minha Empresa", icon: Building2, target: "empresarial" },
                  { name: "Meu Condomínio", icon: Layers, target: "condominio" },
                  { name: "Minha Profissão", icon: Briefcase, target: "rc_profissional" }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        const matched = INSURANCE_PRODUCTS.find(p => p.id === item.target);
                        if (matched) setSelectedProduct(matched);
                      }}
                      className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-[#1677A3] shadow-sm hover:shadow-md transition-all text-center space-y-2 cursor-pointer group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#EAF5F8] text-[#1677A3] mx-auto flex items-center justify-center group-hover:bg-[#1677A3] group-hover:text-white transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-bold text-[#123B5D] block">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* "COMO FUNCIONA" WORKFLOW */}
          <section className="max-w-7xl mx-auto px-4 space-y-10 text-left">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-black text-[#1677A3] uppercase tracking-wider bg-[#EAF5F8] px-3 py-1 rounded-full">
                Processo Transparente
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#123B5D]">Como a Nexo Seguros trabalha por você</h2>
              <p className="text-sm text-slate-600">
                Uma jornada simples, sem letras miúdas e focada na melhor escolha para o seu orçamento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative before:hidden lg:before:block lg:before:absolute lg:before:top-1/2 lg:before:left-12 lg:before:right-12 lg:before:h-0.5 lg:before:bg-slate-200 lg:before:-z-10">
              {[
                {
                  step: "01",
                  title: "1. Conte o que precisa",
                  desc: "Preencha nosso formulário rápido ou envie uma mensagem no WhatsApp sem complicação."
                },
                {
                  step: "02",
                  title: "2. Entendemos seu perfil",
                  desc: "Nossos consultores analisam suas reais necessidades para evitar coberturas desnecessárias."
                },
                {
                  step: "03",
                  title: "3. Apresentamos opções",
                  desc: "Receba um estudo comparativo transparente das principais seguradoras para decidir."
                },
                {
                  step: "04",
                  title: "4. Acompanhamento total",
                  desc: "Suporte ativo na contratação, lembretes de renovação e auxílio completo em sinistros."
                }
              ].map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative text-left">
                  <span className="font-mono text-3xl font-black text-[#1677A3]/30 block">{s.step}</span>
                  <h3 className="font-bold text-base text-[#123B5D]">{s.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* LIFE INSURANCE CALCULATOR INTERACTIVE WIDGET */}
          <section className="max-w-7xl mx-auto px-4">
            <div className="bg-gradient-to-r from-[#123B5D] to-[#1677A3] text-white rounded-3xl p-8 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              <div className="lg:col-span-6 space-y-4">
                <span className="bg-[#2FA56A] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                  Ferramenta de Planejamento
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  Calculadora de Proteção Familiar
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Calcule uma estimativa recomendada de cobertura de seguro de vida para garantir a estabilidade e o padrão de vida da sua família por determinado período.
                </p>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-xs font-bold text-slate-200 block mb-1">
                      Renda Mensal Familiar (R$): <strong className="text-[#2FA56A]">R$ {calcData.monthlyIncome.toLocaleString()}</strong>
                    </label>
                    <input
                      type="range"
                      min="3000"
                      max="30000"
                      step="1000"
                      value={calcData.monthlyIncome}
                      onChange={(e) => setCalcData({ ...calcData, monthlyIncome: Number(e.target.value) })}
                      className="w-full accent-[#2FA56A]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-200 block mb-1">Dependentes:</label>
                      <select
                        value={calcData.dependents}
                        onChange={(e) => setCalcData({ ...calcData, dependents: Number(e.target.value) })}
                        className="w-full bg-white/10 border border-white/20 text-white rounded-xl p-2.5 text-xs font-bold outline-none"
                      >
                        <option value="1" className="text-slate-900">1 dependente</option>
                        <option value="2" className="text-slate-900">2 dependentes</option>
                        <option value="3" className="text-slate-900">3 dependentes</option>
                        <option value="4" className="text-slate-900">4+ dependentes</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-200 block mb-1">Anos de Proteção:</label>
                      <select
                        value={calcData.yearsCoverage}
                        onChange={(e) => setCalcData({ ...calcData, yearsCoverage: Number(e.target.value) })}
                        className="w-full bg-white/10 border border-white/20 text-white rounded-xl p-2.5 text-xs font-bold outline-none"
                      >
                        <option value="3" className="text-slate-900">3 anos</option>
                        <option value="5" className="text-slate-900">5 anos</option>
                        <option value="10" className="text-slate-900">10 anos</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculator Output Display */}
              <div className="lg:col-span-6 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center space-y-4">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Capital Segurado Recomendado
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#2FA56A]">
                  R$ {suggestedLifeCoverage.toLocaleString()}
                </div>
                <p className="text-xs text-slate-200 max-w-sm mx-auto leading-relaxed">
                  Estimativa para garantir {calcData.yearsCoverage} anos de despesas familiares + fundo emergencial para {calcData.dependents} dependentes.
                </p>

                <button
                  onClick={() => {
                    setQuoteFormData(prev => ({
                      ...prev,
                      insuranceType: "Seguro de Vida",
                      details: `Solicitação via calculadora: Cobertura estimada de R$ ${suggestedLifeCoverage.toLocaleString()}`
                    }));
                    setIsQuoteWizardOpen(true);
                    setQuoteStep(1);
                    setQuoteSubmitted(false);
                  }}
                  className="w-full py-3 bg-[#2FA56A] hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer transition-colors"
                >
                  Cotar Este Capital Segurado
                </button>
              </div>
            </div>
          </section>

          {/* ENTERPRISE & CORPORATE SECTION */}
          <section className="bg-white py-12 border-y border-slate-200 text-left">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="text-xs font-black text-[#1677A3] uppercase tracking-wider bg-[#EAF5F8] px-3 py-1 rounded-full">
                  Nexo Corporativo
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#123B5D] leading-tight">
                  Proteção estratégica para empresas que querem crescer com segurança
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Ajudamos pequenas, médias e grandes empresas a mapear riscos operacionais, proteger o patrimônio contra paralisações e oferecer os melhores benefícios corporativos de saúde e vida para retenção de talentos.
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs font-bold text-[#123B5D]">
                  <div className="p-3 bg-[#F5F7F9] rounded-xl border border-slate-200">
                    ✓ Seguro Patrimonial & Incêndio
                  </div>
                  <div className="p-3 bg-[#F5F7F9] rounded-xl border border-slate-200">
                    ✓ Frotas & Transporte de Cargas
                  </div>
                  <div className="p-3 bg-[#F5F7F9] rounded-xl border border-slate-200">
                    ✓ Vida em Grupo & Saúde PME
                  </div>
                  <div className="p-3 bg-[#F5F7F9] rounded-xl border border-slate-200">
                    ✓ Seguro Garantia & Cibernético
                  </div>
                </div>

                <button
                  onClick={() => {
                    setQuoteFormData(prev => ({ ...prev, insuranceType: "Seguro Empresarial" }));
                    setIsQuoteWizardOpen(true);
                    setQuoteStep(1);
                    setQuoteSubmitted(false);
                  }}
                  className="px-6 py-3.5 bg-[#123B5D] hover:bg-[#1677A3] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer transition-colors"
                >
                  Falar com Consultor B2B
                </button>
              </div>

              <div className="lg:col-span-6 relative">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                  alt="Escritório corporativo moderno"
                  className="w-full h-80 object-cover rounded-3xl shadow-xl border border-slate-200"
                />
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="max-w-7xl mx-auto px-4 space-y-8 text-left">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-black text-[#1677A3] uppercase tracking-wider bg-[#EAF5F8] px-3 py-1 rounded-full">
                Depoimentos Reais
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#123B5D]">O que nossos clientes dizem sobre a Nexo</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Fernanda Oliveira",
                  type: "Seguro Residencial",
                  text: "O atendimento da Nexo foi extremamente claro. Me explicaram a diferença entre perda parcial e danos elétricos sem juridiquês. Escolhi uma cobertura perfeita para meu apartamento com valor super justo.",
                  stars: 5,
                  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                },
                {
                  name: "Marcelo Santos",
                  type: "Seguro Auto & Frota",
                  text: "Renovo o seguro do meu carro há 4 anos com a Nexo. Quando precisei de guincho de madrugada no interior, o atendimento da central foi rápido e a equipe acompanhou tudo do início ao fim.",
                  stars: 5,
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                },
                {
                  name: "Juliana Mendes",
                  type: "Seguro Empresarial",
                  text: "A análise de riscos que a equipe fez na nossa loja revelou que não tínhamos cobertura contra lucros cessantes. Refizemos a apólice e hoje trabalhamos com total segurança patrimonial.",
                  stars: 5,
                  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
                }
              ].map((t, ti) => (
                <div key={ti} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-left">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{t.text}"
                  </p>

                  <div className="flex items-center space-x-3 pt-2 border-t border-slate-100">
                    <img src={t.avatar} className="w-10 h-10 rounded-full object-cover border" alt={t.name} />
                    <div>
                      <h4 className="font-bold text-xs text-[#123B5D]">{t.name}</h4>
                      <span className="text-[10px] text-slate-400 font-medium">{t.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATIONAL ARTICLES SNIPPET */}
          <section className="max-w-7xl mx-auto px-4 space-y-8 text-left">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-[#1677A3] uppercase tracking-wider bg-[#EAF5F8] px-3 py-1 rounded-full">
                  Blog & Informação
                </span>
                <h2 className="text-2xl font-black text-[#123B5D] pt-1">
                  Conteúdos para orientar suas escolhas
                </h2>
              </div>
              <button
                onClick={() => { setActiveTab("blog"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="text-xs font-bold text-[#1677A3] hover:underline flex items-center space-x-1"
              >
                <span>Ver todos os artigos</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BLOG_POSTS.slice(0, 3).map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group text-left"
                >
                  <img src={post.image} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" alt={post.title} />
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                      <span className="text-[#1677A3] bg-[#EAF5F8] px-2 py-0.5 rounded">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-sm text-[#123B5D] group-hover:text-[#1677A3] transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {post.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BOTTOM CTA BANNER */}
          <section className="max-w-7xl mx-auto px-4">
            <div className="bg-gradient-to-r from-[#123B5D] via-[#1677A3] to-[#123B5D] text-white p-10 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="max-w-2xl mx-auto space-y-3">
                <h2 className="text-2xl sm:text-4xl font-black">Vamos encontrar a proteção certa para você?</h2>
                <p className="text-xs sm:text-sm text-slate-200">
                  Fale com um de nossos consultores, tire todas as suas dúvidas e receba propostas comparativas sem nenhum compromisso.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => { setIsQuoteWizardOpen(true); setQuoteStep(1); setQuoteSubmitted(false); }}
                  className="px-8 py-4 bg-[#2FA56A] hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer transition-colors"
                >
                  Solicitar Cotação Grátis
                </button>
                <a
                  href="https://wa.me/5511999992026"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 bg-white text-[#123B5D] hover:bg-slate-100 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer transition-colors flex items-center space-x-2"
                >
                  <MessageSquare className="h-4 w-4 text-[#2FA56A]" />
                  <span>Chamar no WhatsApp</span>
                </a>
              </div>
            </div>
          </section>

        </main>
      )}

      {/* ========================================================================= */}
      {/* PAGE VIEW 2: SEGUROS (PRODUCTS DIRECTORY) */}
      {/* ========================================================================= */}
      {activeTab === "seguros" && (
        <main className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-left animate-fade-in">
          <div className="space-y-3 text-center max-w-2xl mx-auto">
            <span className="text-xs font-black text-[#1677A3] uppercase tracking-wider bg-[#EAF5F8] px-3 py-1 rounded-full">
              Catálogo de Proteções
            </span>
            <h1 className="text-3xl font-black text-[#123B5D]">Nossos Seguros & Soluções</h1>
            <p className="text-sm text-slate-600">
              Conheça todas as modalidades de seguro intermediadas pela Nexo Seguros para pessoas, famílias, autônomos e empresas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSURANCE_PRODUCTS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-[#EAF5F8] text-[#1677A3] flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#123B5D]">{p.title}</h3>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{p.tag}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{p.fullDesc}</p>

                  <div className="space-y-1 pt-2 border-t border-slate-100 text-xs">
                    <span className="font-bold text-[#123B5D] block">Destaques da cobertura:</span>
                    {p.coverages.slice(0, 3).map((c, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-slate-600">
                        <Check className="h-3.5 w-3.5 text-[#2FA56A]" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className="flex-1 py-2.5 bg-[#EAF5F8] text-[#1677A3] font-bold text-xs rounded-xl hover:bg-[#1677A3] hover:text-white transition-colors"
                    >
                      Ver Detalhes
                    </button>
                    <button
                      onClick={() => {
                        setQuoteFormData(prev => ({ ...prev, insuranceType: p.title }));
                        setIsQuoteWizardOpen(true);
                        setQuoteStep(1);
                        setQuoteSubmitted(false);
                      }}
                      className="flex-1 py-2.5 bg-[#123B5D] text-white font-bold text-xs rounded-xl hover:bg-[#1677A3] transition-colors"
                    >
                      Simular
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* PAGE VIEW 3: SOBRE NÓS (ABOUT) */}
      {/* ========================================================================= */}
      {activeTab === "sobre" && (
        <main className="max-w-7xl mx-auto px-4 py-12 space-y-16 text-left animate-fade-in">
          
          {/* HERO ABOUT */}
          <div className="bg-gradient-to-r from-[#123B5D] to-[#1677A3] text-white rounded-3xl p-10 text-center space-y-4 shadow-xl">
            <span className="bg-[#2FA56A] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
              Quem Somos
            </span>
            <h1 className="text-3xl sm:text-5xl font-black max-w-3xl mx-auto leading-tight">
              Uma corretora criada para tornar o seguro mais simples, humano e transparente.
            </h1>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto">
              A Nexo Seguros nasceu com a missão de conectar pessoas e empresas às melhores soluções de proteção do mercado, sem letras miúdas ou complicações.
            </p>
          </div>

          {/* NUMBERS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-3xl font-black text-[#1677A3]">8+</span>
              <span className="text-xs text-slate-500 font-bold block">Anos no Mercado</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-3xl font-black text-[#2FA56A]">2.500+</span>
              <span className="text-xs text-slate-500 font-bold block">Clientes Atendidos</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-3xl font-black text-[#123B5D]">4.800+</span>
              <span className="text-xs text-slate-500 font-bold block">Apólices Intermediadas</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-3xl font-black text-[#1677A3]">98%</span>
              <span className="text-xs text-slate-500 font-bold block">Satisfação & Renovação</span>
            </div>
          </div>

          {/* MISSION / VISION / VALUES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF5F8] text-[#1677A3] flex items-center justify-center font-bold">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-[#123B5D]">Nossa Missão</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Facilitar o acesso à proteção financeira e patrimonial por meio de orientação consultiva neutra, transparente e personalizada.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2FA56A] flex items-center justify-center font-bold">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-[#123B5D]">Nossa Visão</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ser referência nacional em relacionamento próximo, atendimento ágil e excelência na gestão contínua de seguros.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF5F8] text-[#1677A3] flex items-center justify-center font-bold">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-lg text-[#123B5D]">Nossos Valores</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ética intransigente, clareza na linguagem, agilidade no suporte e compromisso genuíno com a tranquilidade do cliente.
              </p>
            </div>
          </div>

          {/* TEAM MEMBERS */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-[#123B5D]">Nossa Equipe Especialista</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Camila Nogueira", role: "Diretora de Operações", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" },
                { name: "Eduardo Martins", role: "Consultor Empresarial & B2B", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
                { name: "Renata Alves", role: "Especialista Pessoa Física", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80" },
                { name: "Lucas Ferreira", role: "Atendimento & Gestão de Sinistros", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" }
              ].map((m, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-4 text-center space-y-3">
                  <img src={m.photo} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-[#1677A3]" alt={m.name} />
                  <div>
                    <h4 className="font-bold text-sm text-[#123B5D]">{m.name}</h4>
                    <span className="text-xs text-slate-500 font-medium">{m.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      )}

      {/* ========================================================================= */}
      {/* PAGE VIEW 4: ATENDIMENTO & SINISTROS */}
      {/* ========================================================================= */}
      {activeTab === "atendimento" && (
        <main className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-left animate-fade-in">
          <div className="space-y-3 text-center max-w-2xl mx-auto">
            <span className="text-xs font-black text-[#2FA56A] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
              Central de Suporte Nexo
            </span>
            <h1 className="text-3xl font-black text-[#123B5D]">Atendimento & Aviso de Sinistros</h1>
            <p className="text-sm text-slate-600">
              Ocorreu um imprevisto ou precisa de suporte com sua apólice? Selecione a opção desejada abaixo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border-2 border-rose-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-rose-700">Comunicar Sinistro urgente</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Avisos de colisão, furto, roubo ou danos residenciais. Nossa equipe orienta os documentos e aciona a seguradora imediata.
              </p>
              <a
                href="https://wa.me/5511999992026?text=Preciso%20de%20ajuda%20urgente%20com%20sinistro"
                target="_blank"
                rel="noreferrer"
                className="block w-full py-3 text-center bg-rose-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow hover:bg-rose-700"
              >
                Acionar Sinistro pelo WhatsApp
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#EAF5F8] text-[#1677A3] flex items-center justify-center font-bold">
                <RefreshCw className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-[#123B5D]">Renovação de Apólice</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Envie os dados da sua apólice prestes a vencer para que nossa equipe faça um estudo de mercado e busque o melhor custo-benefício.
              </p>
              <button
                onClick={() => {
                  setQuoteFormData(prev => ({ ...prev, details: "Solicitação de renovação de apólice existente." }));
                  setIsQuoteWizardOpen(true);
                  setQuoteStep(1);
                  setQuoteSubmitted(false);
                }}
                className="w-full py-3 bg-[#123B5D] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow hover:bg-[#1677A3]"
              >
                Solicitar Estudo de Renovação
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#2FA56A] flex items-center justify-center font-bold">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-[#123B5D]">2ª Via ou Alterações</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Solicite segunda via de boletos, certidões de apólice ou alterações de endereço, condutores e dados cadastrais.
              </p>
              <a
                href="https://wa.me/5511999992026?text=Gostaria%20de%202a%20via%20ou%20alterar%20dados%20da%20minha%20apolice"
                target="_blank"
                rel="noreferrer"
                className="block w-full py-3 text-center bg-[#2FA56A] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow hover:bg-emerald-600"
              >
                Atendimento pelo WhatsApp
              </a>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* PAGE VIEW 5: BLOG & ARTICLES */}
      {/* ========================================================================= */}
      {activeTab === "blog" && (
        <main className="max-w-7xl mx-auto px-4 py-12 space-y-10 text-left animate-fade-in">
          <div className="space-y-3 text-center max-w-2xl mx-auto">
            <span className="text-xs font-black text-[#1677A3] uppercase tracking-wider bg-[#EAF5F8] px-3 py-1 rounded-full">
              Central de Conteúdos
            </span>
            <h1 className="text-3xl font-black text-[#123B5D]">Blog & Orientações de Proteção</h1>
            <p className="text-sm text-slate-600">
              Artigos educativos elaborados pelos nossos especialistas para tirar dúvidas sobre apólices, franquias e direitos do segurado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group text-left space-y-3"
              >
                <img src={post.image} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" alt={post.title} />
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                    <span className="text-[#1677A3] bg-[#EAF5F8] px-2 py-0.5 rounded">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-base text-[#123B5D] group-hover:text-[#1677A3] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                  <span className="text-xs font-bold text-[#1677A3] block pt-2">Ler artigo completo →</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* PRODUCT DETAILS MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-left relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
                <div className="w-12 h-12 rounded-xl bg-[#EAF5F8] text-[#1677A3] flex items-center justify-center">
                  <selectedProduct.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-black text-xl text-[#123B5D]">{selectedProduct.title}</h3>
                  <span className="text-xs font-bold text-[#2FA56A]">{selectedProduct.tag}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{selectedProduct.fullDesc}</p>

              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase text-[#123B5D] tracking-wider">Coberturas Principais</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                  {selectedProduct.coverages.map((cov, i) => (
                    <div key={i} className="flex items-center space-x-2 bg-[#F5F7F9] p-2.5 rounded-xl border border-slate-200">
                      <Check className="h-4 w-4 text-[#2FA56A] flex-shrink-0" />
                      <span>{cov}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase text-[#123B5D] tracking-wider">Assistências 24 horas</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                  {selectedProduct.assistances.map((ast, i) => (
                    <div key={i} className="flex items-center space-x-2 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200/50">
                      <ShieldCheck className="h-4 w-4 text-[#2FA56A] flex-shrink-0" />
                      <span>{ast}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const prodName = selectedProduct.title;
                    setSelectedProduct(null);
                    setQuoteFormData(prev => ({ ...prev, insuranceType: prodName }));
                    setIsQuoteWizardOpen(true);
                    setQuoteStep(1);
                    setQuoteSubmitted(false);
                  }}
                  className="flex-1 py-3 bg-[#123B5D] hover:bg-[#1677A3] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow transition-colors"
                >
                  Solicitar Cotação Personalizada
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* STEP-BY-STEP QUOTE WIZARD MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isQuoteWizardOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 text-left relative shadow-2xl"
            >
              <button
                onClick={() => setIsQuoteWizardOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>

              {!quoteSubmitted ? (
                <form onSubmit={handleQuoteSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-[#1677A3] bg-[#EAF5F8] px-2.5 py-0.5 rounded uppercase">
                      Passo {quoteStep} de 2
                    </span>
                    <h3 className="font-black text-xl text-[#123B5D]">Solicitação de Cotação Grátis</h3>
                    <p className="text-xs text-slate-500">Sem compromisso. Resposta rápida de um consultor humano.</p>
                  </div>

                  {quoteStep === 1 && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <label className="text-xs font-bold text-[#123B5D] block mb-1">Qual seguro você procura?</label>
                        <select
                          value={quoteFormData.insuranceType}
                          onChange={(e) => setQuoteFormData({ ...quoteFormData, insuranceType: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-bold text-slate-800 outline-none focus:border-[#1677A3]"
                        >
                          <option value="Seguro Auto">Seguro Auto / Veículos</option>
                          <option value="Seguro Residencial">Seguro Residencial</option>
                          <option value="Seguro de Vida">Seguro de Vida</option>
                          <option value="Seguro Empresarial">Seguro Empresarial</option>
                          <option value="Seguro Viagem">Seguro Viagem</option>
                          <option value="Seguro Saúde">Seguro Saúde & Odonto</option>
                          <option value="Responsabilidade Civil">Responsabilidade Civil Profissional</option>
                          <option value="Seguro Condomínio">Seguro Condomínio</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#123B5D] block mb-1">Seu Nome Completo:</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Roberto Silva"
                          value={quoteFormData.fullName}
                          onChange={(e) => setQuoteFormData({ ...quoteFormData, fullName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#1677A3]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-[#123B5D] block mb-1">WhatsApp / Telefone:</label>
                          <input
                            type="text"
                            required
                            placeholder="(11) 99999-0000"
                            value={quoteFormData.phone}
                            onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#1677A3]"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-[#123B5D] block mb-1">Cidade / UF:</label>
                          <input
                            type="text"
                            required
                            placeholder="São Paulo - SP"
                            value={quoteFormData.city}
                            onChange={(e) => setQuoteFormData({ ...quoteFormData, city: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#1677A3]"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (quoteFormData.fullName && quoteFormData.phone) setQuoteStep(2);
                        }}
                        className="w-full py-3 bg-[#123B5D] hover:bg-[#1677A3] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer transition-colors"
                      >
                        Próximo Passo →
                      </button>
                    </div>
                  )}

                  {quoteStep === 2 && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <label className="text-xs font-bold text-[#123B5D] block mb-1">E-mail para Envio das Opções:</label>
                        <input
                          type="email"
                          required
                          placeholder="roberto@email.com"
                          value={quoteFormData.email}
                          onChange={(e) => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#1677A3]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#123B5D] block mb-1">Canal de Contato Preferencial:</label>
                        <div className="grid grid-cols-3 gap-2">
                          {["WhatsApp", "Ligação", "E-mail"].map((pref) => (
                            <button
                              key={pref}
                              type="button"
                              onClick={() => setQuoteFormData({ ...quoteFormData, contactPref: pref })}
                              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                                quoteFormData.contactPref === pref
                                  ? "bg-[#1677A3] text-white border-[#1677A3]"
                                  : "bg-slate-50 text-slate-700 border-slate-200"
                              }`}
                            >
                              {pref}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-[#123B5D] block mb-1">Detalhes Adicionais (Ano, Placa, Modelo, Imóvel, etc.):</label>
                        <textarea
                          rows={3}
                          value={quoteFormData.details}
                          onChange={(e) => setQuoteFormData({ ...quoteFormData, details: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#1677A3]"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setQuoteStep(1)}
                          className="py-3 px-4 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                        >
                          Voltar
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-[#2FA56A] hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow cursor-pointer transition-colors"
                        >
                          Enviar Solicitação de Cotação
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              ) : (
                <div className="text-center py-6 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#2FA56A] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="font-black text-2xl text-[#123B5D]">Cotação Solicitada com Sucesso!</h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Obrigado, <strong className="text-slate-800">{quoteFormData.fullName}</strong>. Um de nossos consultores especializados analisará seu perfil nas principais seguradoras e enviará um comparativo detalhado via <strong className="text-[#2FA56A]">{quoteFormData.contactPref}</strong> em breve.
                  </p>

                  <button
                    onClick={() => setIsQuoteWizardOpen(false)}
                    className="px-6 py-2.5 bg-[#123B5D] text-white font-bold text-xs rounded-xl"
                  >
                    Concluir
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* ARTICLE READER MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4 text-left relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>

              <img src={selectedPost.image} className="w-full h-56 object-cover rounded-2xl" alt={selectedPost.title} />

              <div className="flex items-center space-x-2 text-xs font-bold text-[#1677A3]">
                <span className="bg-[#EAF5F8] px-2.5 py-0.5 rounded">{selectedPost.category}</span>
                <span>•</span>
                <span className="text-slate-400">{selectedPost.date}</span>
              </div>

              <h2 className="font-black text-2xl text-[#123B5D]">{selectedPost.title}</h2>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal pt-2 border-t border-slate-100">
                <p>
                  {selectedPost.summary}
                </p>
                <p>
                  Ao escolher um seguro, é importante olhar além da mensalidade. Coberturas essenciais como danos materiais e corporais a terceiros (RCF-V) garantem que imprevistos com outros veículos não afetem seu patrimônio pessoal.
                </p>
                <p>
                  A equipe da Nexo Seguros realiza análises completas para garantir que você contrate exatamente o nível de proteção necessário para seu momento de vida.
                </p>
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    setIsQuoteWizardOpen(true);
                  }}
                  className="px-5 py-2.5 bg-[#2FA56A] text-white font-bold text-xs rounded-xl"
                >
                  Tirar Dúvidas com Consultor
                </button>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* FLOATING WHATSAPP CHAT ASSISTANT WIDGET */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowChatWidget(!showChatWidget)}
          className="w-14 h-14 rounded-full bg-[#2FA56A] hover:bg-emerald-600 text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110 cursor-pointer relative"
        >
          <MessageSquare className="h-7 w-7" />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white animate-pulse" />
        </button>

        <AnimatePresence>
          {showChatWidget && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-18 right-0 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-left"
            >
              <div className="bg-gradient-to-r from-[#123B5D] to-[#1677A3] text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-[#2FA56A] flex items-center justify-center font-bold text-sm">
                    NS
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">Atendimento Nexo Seguros</h4>
                    <span className="text-[10px] text-emerald-300 font-medium">Consultor Online</span>
                  </div>
                </div>
                <button onClick={() => setShowChatWidget(false)} className="text-white/80 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4 h-72 overflow-y-auto space-y-3 bg-[#F5F7F9]">
                {chatMessages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-xs ${
                      m.sender === "user"
                        ? "bg-[#1677A3] text-white rounded-tr-none"
                        : "bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-sm"
                    }`}>
                      <p>{m.text}</p>
                      <span className={`text-[9px] block text-right mt-1 font-medium ${m.sender === "user" ? "text-white/70" : "text-slate-400"}`}>
                        {m.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Quick Action Chips */}
              <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto text-[10px]">
                <button
                  onClick={() => handleSendChat("Quero cotar seguro Auto")}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-bold whitespace-nowrap"
                >
                  🚗 Cotar Seguro Auto
                </button>
                <button
                  onClick={() => handleSendChat("Quero cotar seguro de Vida")}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-bold whitespace-nowrap"
                >
                  ❤️ Seguro de Vida
                </button>
                <button
                  onClick={() => handleSendChat("Preciso de ajuda com Sinistro")}
                  className="px-2.5 py-1 bg-rose-50 text-rose-600 rounded-full font-bold whitespace-nowrap"
                >
                  ⚠️ Aviso de Sinistro
                </button>
              </div>

              <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                  placeholder="Digite sua dúvida..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none"
                />
                <button
                  onClick={() => handleSendChat()}
                  className="p-2 bg-[#2FA56A] text-white rounded-xl shadow"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================================= */}
      {/* FOOTER */}
      {/* ========================================================================= */}
      <footer className="bg-[#123B5D] text-white pt-16 pb-12 border-t border-white/10 text-left">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#2FA56A] flex items-center justify-center text-white font-bold">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-white block">NEXO SEGUROS</span>
                <span className="text-[10px] text-slate-300 uppercase">Corretora de Seguros</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Nexo Corretora de Seguros Ltda. — Proteção para tudo o que conecta você ao futuro. Atendimento consultivo e imparcial em todo o Brasil.
            </p>

            <div className="text-xs text-slate-400 space-y-1 font-mono pt-2">
              <p>CNPJ: 12.345.678/0001-90</p>
              <p>SUSEP: 10.20304050</p>
            </div>
          </div>

          {/* Column: Seguros */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-sm text-[#2FA56A] uppercase tracking-wider">Principais Seguros</h4>
            <ul className="space-y-2 text-slate-300 font-medium">
              <li><button onClick={() => { setActiveTab("seguros"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white">Seguro Auto & Frota</button></li>
              <li><button onClick={() => { setActiveTab("seguros"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white">Seguro Residencial</button></li>
              <li><button onClick={() => { setActiveTab("seguros"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white">Seguro de Vida Individual</button></li>
              <li><button onClick={() => { setActiveTab("seguros"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white">Seguro Empresarial</button></li>
              <li><button onClick={() => { setActiveTab("seguros"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white">Seguro Saúde & Odonto</button></li>
              <li><button onClick={() => { setActiveTab("seguros"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white">Responsabilidade Civil (E&O)</button></li>
            </ul>
          </div>

          {/* Column: Institucional */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-sm text-[#2FA56A] uppercase tracking-wider">Institucional</h4>
            <ul className="space-y-2 text-slate-300 font-medium">
              <li><button onClick={() => { setActiveTab("sobre"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white">Sobre a Nexo Seguros</button></li>
              <li><button onClick={() => { setActiveTab("blog"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white">Blog & Artigos Educativos</button></li>
              <li><button onClick={() => { setActiveTab("atendimento"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-white">Central de Sinistros 24h</button></li>
              <li><button onClick={() => { setIsQuoteWizardOpen(true); setQuoteStep(1); setQuoteSubmitted(false); }} className="hover:text-white">Solicitar Cotação</button></li>
              <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
            </ul>
          </div>

          {/* Column: Contato */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-sm text-[#2FA56A] uppercase tracking-wider">Atendimento</h4>
            <div className="space-y-2 text-slate-300">
              <p className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#2FA56A]" />
                <span>(11) 4000-2026</span>
              </p>
              <p className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-[#2FA56A]" />
                <span>(11) 99999-2026</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#2FA56A]" />
                <span>contato@nexoseguros.com.br</span>
              </p>
              <p className="flex items-start space-x-2 pt-1">
                <MapPin className="h-4 w-4 text-[#2FA56A] flex-shrink-0" />
                <span>Av. Paulista, 1000 - Bela Vista, São Paulo/SP</span>
              </p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 pt-12 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <p>© 2026 Nexo Corretora de Seguros Ltda. Todos os direitos reservados.</p>
          <p className="font-mono">Desenvolvido como protótipo comercial interativo.</p>
        </div>
      </footer>

    </div>
  );
}
