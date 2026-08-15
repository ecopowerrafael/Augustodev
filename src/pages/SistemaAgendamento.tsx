import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  Users,
  Building2,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Smartphone,
  ChevronRight,
  ArrowRight,
  Check,
  Star,
  ExternalLink,
  Code2,
  Database,
  Layers,
  LayoutGrid,
  Lock,
  Cpu,
  Globe2,
  Settings2,
  CreditCard,
  MessageSquare,
  ChevronDown,
  X,
  Play,
  Scissors,
  Stethoscope,
  Dumbbell,
  Dog,
  Wrench,
  Briefcase,
  GraduationCap,
  Camera,
  HeartHandshake,
  UserCheck,
  Building,
  Store,
  Laptop,
  HelpCircle,
  FileCode,
  Sliders,
  DollarSign,
  TrendingUp,
  Share2,
  Download,
  Terminal,
  Activity,
  User,
  PhoneCall,
  Mail,
  Send,
  Eye,
  Shield,
  Server,
  RefreshCw,
  Copy,
  CheckCheck,
  ArrowUpRight,
  Info
} from "lucide-react";

interface SistemaAgendamentoProps {
  onBack?: () => void;
}

export default function SistemaAgendamento({ onBack }: SistemaAgendamentoProps) {
  // Modal States
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showSalesModal, setShowSalesModal] = useState(false);
  const [showTechModal, setShowTechModal] = useState(false);
  const [selectedDemoTab, setSelectedDemoTab] = useState<"admin" | "store" | "booking">("admin");
  const [selectedRolePanel, setSelectedRolePanel] = useState<"super" | "store" | "staff" | "client">("super");
  const [activeNiche, setActiveNiche] = useState<string>("all");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // White label branding simulator state
  const [activeBrandTheme, setActiveBrandTheme] = useState<"default" | "barber" | "clinic" | "pet">("default");

  // Booking Flow Mobile Simulator State
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>("Corte + Barba VIP");
  const [selectedStaff, setSelectedStaff] = useState<string>("Carlos Silva (Master)");
  const [selectedDate, setSelectedDate] = useState<string>("Amanhã - 14:30");

  // Segments catalog
  const segments = [
    { name: "Barbearias", icon: Scissors, category: "beauty", description: "Cortes, barba, selagem e combos" },
    { name: "Salões de Beleza", icon: Sparkles, category: "beauty", description: "Cabelo, unhas, maquiagem e estéticos" },
    { name: "Clínicas de Estética", icon: Sparkles, category: "health", description: "Botox, limpeza de pele, massagens" },
    { name: "Clínicas Médicas", icon: Stethoscope, category: "health", description: "Consultas com hora marcada e retornos" },
    { name: "Clínicas Odontológicas", icon: Stethoscope, category: "health", description: "Dentistas, avaliações e profilaxia" },
    { name: "Psicólogos", icon: HeartHandshake, category: "health", description: "Sessões presenciais e online" },
    { name: "Fisioterapeutas", icon: Activity, category: "health", description: "Reabilitação e Pilates" },
    { name: "Massagistas & Spas", icon: HeartHandshake, category: "wellness", description: "Relaxantes e terapêuticas" },
    { name: "Tatuadores & Body Piercing", icon: Camera, category: "beauty", description: "Orçamentos e sessões por hora" },
    { name: "Personal Trainers", icon: Dumbbell, category: "fitness", description: "Aulas individuais e consultoria" },
    { name: "Academias & Studios", icon: Dumbbell, category: "fitness", description: "Crossfit, Dança e Funcional" },
    { name: "Pet Shops & Veterinárias", icon: Dog, category: "pets", description: "Consultas, vacinas e procedimentos" },
    { name: "Banho e Tosa", icon: Dog, category: "pets", description: "Estética animal com horário" },
    { name: "Oficinas Mecânicas", icon: Wrench, category: "services", description: "Revisões, trocas de óleo e exames" },
    { name: "Consultorias & Mentoria", icon: Briefcase, category: "services", description: "Reuniões B2B e orientações" },
    { name: "Professores Particulares", icon: GraduationCap, category: "services", description: "Aulas de idiomas, exatas e música" },
    { name: "Fotógrafos & Estúdios", icon: Camera, category: "services", description: "Ensaios e locação de estúdio" },
    { name: "Quadras & Espaços Esportivos", icon: Dumbbell, category: "fitness", description: "Reserva de horários em quadras" },
    { name: "Prestadores de Serviços", icon: Wrench, category: "services", description: "Manutenção, instalações e suporte" },
    { name: "Negócios com Horário Marcado", icon: Clock, category: "services", description: "Qualquer atividade baseada em agenda" },
  ];

  const brandThemes = {
    default: {
      name: "Plataforma Padrão (SaaS Tech)",
      bg: "bg-indigo-600",
      text: "text-indigo-600",
      border: "border-indigo-200",
      primaryBtn: "bg-indigo-600 hover:bg-indigo-700 text-white",
      badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
      logo: "VITA SCHEDULER SaaS"
    },
    barber: {
      name: "Barbearia Vintage & Club",
      bg: "bg-amber-700",
      text: "text-amber-800",
      border: "border-amber-300",
      primaryBtn: "bg-amber-900 hover:bg-amber-950 text-amber-100",
      badge: "bg-amber-50 text-amber-900 border-amber-300",
      logo: "BARBER KING & CO."
    },
    clinic: {
      name: "Clínica de Estética & Saúde",
      bg: "bg-teal-600",
      text: "text-teal-700",
      border: "border-teal-200",
      primaryBtn: "bg-teal-600 hover:bg-teal-700 text-white",
      badge: "bg-teal-50 text-teal-800 border-teal-200",
      logo: "DERMA VITA CLINIC"
    },
    pet: {
      name: "Pet Shop & Banho e Tosa",
      bg: "bg-sky-500",
      text: "text-sky-600",
      border: "border-sky-200",
      primaryBtn: "bg-sky-500 hover:bg-sky-600 text-white",
      badge: "bg-sky-50 text-sky-700 border-sky-200",
      logo: "PATINHAS & CIA PET"
    }
  };

  const currentTheme = brandThemes[activeBrandTheme];

  const faqs = [
    {
      q: "O sistema funciona somente para barbearias?",
      a: "Não. A plataforma foi desenvolvida com o conceito multisserviços. Ela se adapta perfeitamente a salões, clínicas de estética, consultórios médicos, fisioterapia, pet shops, oficinas, personal trainers, consultorias e qualquer negócio que funcione por agendamento."
    },
    {
      q: "Posso utilizar minha própria marca (White-Label)?",
      a: "Sim! O sistema possui arquitetura preparada para você alterar o logotipo, cores institucionais, nome do sistema, banners, termos e domínio público. Seus clientes e usuários verão exclusivamente a sua marca."
    },
    {
      q: "Posso cadastrar várias empresas na mesma plataforma?",
      a: "Exatamente. A arquitetura é multi-tenant (multiempresa). Você pode administrar dezenas ou centenas de estabelecimentos independentes dentro do mesmo banco de dados, com isolamento total de dados e permissões."
    },
    {
      q: "Uma empresa pode ter várias unidades/filiais?",
      a: "Sim. Cada empresa cadastrada na plataforma pode possuir sua matriz e múltiplas filiais (unidades), com profissionais, horários e agendas específicas para cada endereço."
    },
    {
      q: "Cada profissional possui agenda individual?",
      a: "Sim! Cada profissional cadastrado possui sua própria agenda com horários de trabalho, intervalos, bloqueios de datas, lista de serviços atendidos e visualização de compromissos."
    },
    {
      q: "Posso criar planos e cobrar assinaturas dos meus clientes?",
      a: "Sim. A plataforma conta com um módulo completo de Gestão de Planos e Assinaturas no painel Super Admin, permitindo definir nomes de planos, limites de unidades/profissionais e status de pagamento para criar o seu próprio modelo SaaS."
    },
    {
      q: "O sistema funciona no celular?",
      a: "Perfeitamente. O sistema é 100% responsivo e construído com tecnologia PWA (Progressive Web App), permitindo que clientes e gestores instalem o ícone do sistema diretamente na tela inicial do celular como se fosse um aplicativo nativo."
    },
    {
      q: "Como recebo o código-fonte?",
      a: "O código-fonte é entregue de forma completa em repositório seguro e arquivo compactado, contendo todo o frontend em React/TypeScript, backend em Node.js/Fastify, scripts de banco de dados MySQL/Prisma e guia de deploy."
    },
    {
      q: "Posso modificar e expandir o código?",
      a: "Sim! Por ser um script/código-fonte completo e limpo desenvolvido em TypeScript, você ou sua equipe têm total liberdade para adicionar novas rotas, integrar gateways de pagamento, criar bots de WhatsApp e customizar qualquer fluxo."
    },
    {
      q: "Existe taxa de pagamento mensal pelo uso da plataforma?",
      a: "Dependerá da modalidade de licenciamento escolhida. No modelo de compra de Script Completo / Licença Vitalícia, o código é seu e você não paga mensalidade sobre o software para nós."
    },
    {
      q: "Posso revender assinaturas do sistema para empresas?",
      a: "Sim! O objetivo principal desta plataforma é dar a você a infraestrutura completa para comercializar assinaturas recorrentes (modelo SaaS B2B) para empresas e profissionais da sua região ou de todo o Brasil."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-slate-900 text-white text-xs py-2.5 px-4 text-center border-b border-slate-800 flex items-center justify-center space-x-2">
        <span className="bg-indigo-500 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
          SOFTWARE B2B / SCRIPT WHITE-LABEL
        </span>
        <span className="hidden sm:inline text-slate-300">
          Plataforma Multiempresa de Agendamentos para Empreendedores, Agências e Devs.
        </span>
        <button
          onClick={() => setShowSalesModal(true)}
          className="text-indigo-400 font-bold hover:text-indigo-300 underline ml-2 cursor-pointer flex items-center space-x-1"
        >
          <span>Quero Conhecer a Licença</span>
          <ArrowRight className="w-3 h-3 inline" />
        </button>
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* BRAND */}
          <div className="flex items-center space-x-3">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer mr-1"
                title="Voltar ao Portfólio"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            )}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 flex items-center space-x-1">
                <span>VITA SCHEDULER</span>
                <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                  SCRIPT PRO
                </span>
              </span>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                PLATAFORMA MULTISSERVIÇOS WHITE-LABEL
              </p>
            </div>
          </div>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-600">
            <a href="#plataforma" className="hover:text-indigo-600 transition">A Plataforma</a>
            <a href="#mercados" className="hover:text-indigo-600 transition">Mercados</a>
            <a href="#multiempresa" className="hover:text-indigo-600 transition">Multiempresa</a>
            <a href="#white-label" className="hover:text-indigo-600 transition">White-Label</a>
            <a href="#paineis" className="hover:text-indigo-600 transition">Painéis</a>
            <a href="#saas" className="hover:text-indigo-600 transition">Modelo SaaS</a>
            <a href="#tech" className="hover:text-indigo-600 transition">Stack Técnica</a>
            <a href="#faq" className="hover:text-indigo-600 transition">FAQ</a>
          </nav>

          {/* ACTION BUTTONS */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowDemoModal(true)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-indigo-600" />
              <span>Ver Demonstração</span>
            </button>
            <button
              onClick={() => setShowSalesModal(true)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-lg shadow-indigo-600/25 flex items-center space-x-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Quero Saber Mais</span>
            </button>
          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/30 to-slate-50">
        
        {/* Subtle Background Mesh & Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-200/20 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* HERO TEXT COLUMN */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* BADGE */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 shadow-sm text-xs font-bold text-indigo-700">
                <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
                <span>Plataforma White-Label • Multiempresa • Multisserviços</span>
              </div>

              {/* HEADLINE */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Seu próprio sistema de agendamentos.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600">
                  Pronto para atender qualquer mercado.
                </span>
              </h1>

              {/* SUBHEADLINE */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Uma plataforma completa, multiempresa e multisserviços para você criar, operar e escalar seu próprio negócio de agendamentos ou comercializar planos recorrentes (SaaS).
              </p>

              {/* COMPLEMENT */}
              <p className="text-xs sm:text-sm text-slate-500 leading-normal border-l-2 border-indigo-500 pl-3 py-0.5">
                Cadastre empresas, unidades, profissionais, serviços, planos e assinaturas em uma única estrutura preparada para diferentes segmentos.
              </p>

              {/* CTAS */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => setShowDemoModal(true)}
                  className="px-7 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all duration-200 shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2 cursor-pointer group"
                >
                  <Play className="w-4 h-4 fill-white group-hover:scale-110 transition" />
                  <span>VER DEMONSTRAÇÃO</span>
                </button>

                <button
                  onClick={() => setShowSalesModal(true)}
                  className="px-7 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-300 transition shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  <span>CONHECER A PLATAFORMA</span>
                </button>
              </div>

              {/* TRUST BULLETS */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-600 font-medium border-t border-slate-200">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Código-Fonte Incluído</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>SaaS Recorrente</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>100% Personalizável</span>
                </div>
              </div>

            </div>

            {/* HERO MOCKUP CONTAINER */}
            <div className="lg:col-span-5 relative">
              
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* BACKDROP GLOW */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-3xl blur-xl opacity-20 transform rotate-1" />

                {/* DESKTOP ADMIN MOCKUP */}
                <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 space-y-3 overflow-hidden text-left">
                  
                  {/* FAKE BROWSER BAR */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="text-[10px] font-mono bg-slate-100 text-slate-500 px-3 py-1 rounded-md border border-slate-200 truncate max-w-[200px]">
                      admin.vitascheduler.com.br
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      ONLINE
                    </span>
                  </div>

                  {/* ADMIN MINI DASHBOARD STATS */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100">
                      <span className="text-[9px] font-bold text-indigo-700 block uppercase">Agendamentos</span>
                      <span className="text-base font-black text-slate-900">1,284</span>
                      <span className="text-[9px] text-emerald-600 font-bold block">↑ +18.4% hoje</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-100">
                      <span className="text-[9px] font-bold text-sky-700 block uppercase">Empresas</span>
                      <span className="text-base font-black text-slate-900">42</span>
                      <span className="text-[9px] text-sky-600 font-bold block">Ativas em SaaS</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100">
                      <span className="text-[9px] font-bold text-purple-700 block uppercase">Faturamento</span>
                      <span className="text-base font-black text-slate-900">R$ 38.4k</span>
                      <span className="text-[9px] text-purple-600 font-bold block">MRR Recorrente</span>
                    </div>
                  </div>

                  {/* CALENDAR & TIMELINE PREVIEW */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Agenda em Tempo Real - Unidade Matriz</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Hoje, 14:00</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs shadow-xs">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-8 rounded-full bg-indigo-500" />
                          <div>
                            <strong className="block text-slate-800 text-[11px]">Corte Masculino + Barba</strong>
                            <span className="text-[10px] text-slate-500">Cliente: Lucas Mendes • Prof: Carlos</span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          Confirmado
                        </span>
                      </div>

                      <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs shadow-xs">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-8 rounded-full bg-sky-500" />
                          <div>
                            <strong className="block text-slate-800 text-[11px]">Consulta Odontológica Avaliação</strong>
                            <span className="text-[10px] text-slate-500">Cliente: Dra. Ana Paula • Prof: Dr. Gabriel</span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold text-[10px]">
                          Em Andamento
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* FLOATING MOBILE OVERLAY */}
                  <div className="absolute -bottom-6 -right-6 w-52 bg-slate-900 text-white rounded-2xl p-3 border-2 border-slate-800 shadow-2xl hidden sm:block transform rotate-2">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                      <div className="flex items-center space-x-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-[10px] font-bold text-slate-200">App do Cliente (PWA)</span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <div className="bg-slate-800/80 rounded-lg p-2 text-[10px] space-y-1 text-slate-300">
                      <p className="font-bold text-white">✅ Agendamento Realizado!</p>
                      <p className="text-slate-400">Data: Amanhã às 15:30</p>
                      <div className="pt-1 flex items-center justify-between text-[9px] text-indigo-300 font-mono">
                        <span>Status: Aprovado</span>
                        <span>Lembrete Ativo</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* SECTION 4: NÃO É APENAS UM SISTEMA DE AGENDAMENTO */}
      <section id="plataforma" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider border border-indigo-100">
              ARQUITETURA DE NEGÓCIO
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Não compre apenas um sistema.{" "}
              <span className="text-indigo-600">Tenha uma plataforma para criar um negócio.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Diferente de um formulário isolado, nossa solução foi estruturada para permitir que você opere seu próprio ecossistema de agendamentos ou revenda a tecnologia.
            </p>
          </div>

          {/* 4 PILLARS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all duration-300 space-y-3 text-left group">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 font-mono font-black text-sm flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-base">Usar em Uma Única Empresa</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Utilize internamente para organizar os agendamentos, serviços e profissionais da sua própria empresa com total autonomia.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all duration-300 space-y-3 text-left group">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 font-mono font-black text-sm flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-base">Criar uma Rede Multiunidades</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gerencie redes de franquias ou estabelecimentos com várias filiais, controlando equipes e agendas de cada endereço separadamente.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all duration-300 space-y-3 text-left group">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 font-mono font-black text-sm flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-base">Atender Diversos Clientes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Como agência ou software house, ofereça o sistema de agendamento personalizado para múltiplos clientes corporativos.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-600 text-white rounded-2xl p-6 shadow-xl shadow-indigo-600/20 space-y-3 text-left relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-white/20 text-white font-mono font-black text-sm flex items-center justify-center">
                04
              </div>
              <h3 className="font-bold text-white text-base">Criar Seu Próprio SaaS</h3>
              <p className="text-xs text-indigo-100 leading-relaxed">
                Comercialize o sistema no modelo de assinatura recorrente (mensal ou anual) para empresas e profissionais de qualquer nicho.
              </p>
              <span className="inline-block text-[9px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded">
                MODELO MAISLUCRATIVO
              </span>
            </div>

          </div>

          {/* VISUAL ECOSYSTEM DIAGRAM */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-6 text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-2">
              <h3 className="text-lg font-bold text-white">Hierarquia & Controle Centralizado</h3>
              <p className="text-xs text-slate-400">
                A mesma base de software gerencia da administração global até o agendamento do cliente final.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-xs font-bold font-mono">
              <div className="px-4 py-3 rounded-xl bg-indigo-600 text-white border border-indigo-400 shadow-md">
                SUA PLATAFORMA (SUPER ADMIN)
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 rotate-90 md:rotate-0" />
              <div className="flex flex-wrap items-center justify-center gap-2">
                <div className="px-3 py-2 rounded-lg bg-slate-800 text-indigo-300 border border-slate-700">
                  EMPRESA A
                </div>
                <div className="px-3 py-2 rounded-lg bg-slate-800 text-sky-300 border border-slate-700">
                  EMPRESA B
                </div>
                <div className="px-3 py-2 rounded-lg bg-slate-800 text-purple-300 border border-slate-700">
                  EMPRESA C
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 rotate-90 md:rotate-0" />
              <div className="px-4 py-3 rounded-xl bg-slate-800 text-slate-300 border border-slate-700">
                UNIDADES ➔ PROFISSIONAIS ➔ CLIENTES
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: UM SISTEMA, DEZENAS DE MERCADOS */}
      <section id="mercados" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider border border-sky-200">
              VERSATILIDADE DE NICHO
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Você escolhe o mercado.{" "}
              <span className="text-indigo-600">A plataforma se adapta.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Não fique preso a um único segmento. A arquitetura genérica e flexível de serviços e categorias atende a qualquer negócio que funcione por agendamento prévio.
            </p>
          </div>

          {/* CATEGORY FILTER TABS */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
            {[
              { id: "all", label: "Todos os Segmentos" },
              { id: "beauty", label: "Beleza & Estética" },
              { id: "health", label: "Saúde & Consultórios" },
              { id: "wellness", label: "Bem-Estar & Spas" },
              { id: "fitness", label: "Esportes & Academias" },
              { id: "pets", label: "Pets & Vets" },
              { id: "services", label: "Serviços & Consultorias" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveNiche(tab.id)}
                className={`px-4 py-2 rounded-xl transition cursor-pointer ${
                  activeNiche === tab.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* SEGMENTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {segments
              .filter((s) => activeNiche === "all" || s.category === activeNiche)
              .map((seg, idx) => {
                const IconComponent = seg.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex items-start space-x-3 text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 text-sm font-bold">{seg.name}</strong>
                      <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{seg.description}</p>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* CALLOUT FOOTER */}
          <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-200 text-center max-w-2xl mx-auto space-y-2">
            <p className="text-xs sm:text-sm text-indigo-900 font-bold">
              💡 "E se amanhã surgir um novo nicho? Você não precisa trocar de plataforma."
            </p>
            <p className="text-xs text-indigo-700">
              Basta cadastrar os novos serviços, durações e preços para atender um segmento completamente diferente no mesmo dia.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 6: EXPERIÊNCIA DO CLIENTE FINAL (STEP-BY-STEP SIMULATOR) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
              EXPERIÊNCIA DO USUÁRIO
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Agendar precisa ser mais fácil do que{" "}
              <span className="text-indigo-600">mandar uma mensagem.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Sem necessidade de senhas complexas ou instalações obrigatórias. Um fluxo direto, intuitivo e projetado especificamente para telas de celular.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* STEPS LIST */}
            <div className="lg:col-span-6 space-y-3">
              {[
                { num: 1, title: "1. Acesso Rápido à Página", desc: "O cliente lê o QR Code ou clica no link bio da empresa." },
                { num: 2, title: "2. Seleção do Serviço", desc: "Escolhe o serviço desejado com fotos, descrição e preço visíveis." },
                { num: 3, title: "3. Escolha do Profissional", desc: "Pode selecionar seu profissional preferido ou 'Qualquer disponível'." },
                { num: 4, title: "4. Seleção da Data", desc: "Calendário interativo mostrando dias com horários vagos." },
                { num: 5, title: "5. Horário Disponível", desc: "O sistema calcula automaticamente as janelas sem conflito." },
                { num: 6, title: "6. Confirmação Instantânea", desc: "Confirmação com resumo e salvamento direto na agenda." },
              ].map((step) => (
                <div
                  key={step.num}
                  onClick={() => setBookingStep(step.num)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left flex items-start space-x-3 ${
                    bookingStep === step.num
                      ? "bg-indigo-50 border-indigo-500 shadow-sm"
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 ${
                      bookingStep === step.num
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{step.title}</h4>
                    <p className="text-xs text-slate-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* MOBILE INTERACTIVE PHONE SIMULATOR */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-sm bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl border-4 border-slate-800 text-left text-slate-900">
                
                {/* PHONE NOTCH */}
                <div className="w-32 h-4 bg-slate-800 rounded-b-xl mx-auto mb-3" />

                {/* PHONE SCREEN CONTAINER */}
                <div className="bg-slate-50 rounded-2xl p-4 min-h-[460px] space-y-4 flex flex-col justify-between">
                  
                  {/* STORE HEADER */}
                  <div className="flex items-center space-x-3 border-b border-slate-200 pb-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center text-xs">
                      VS
                    </div>
                    <div>
                      <strong className="block text-slate-900 text-xs font-extrabold">Studio & Barbearia Vita</strong>
                      <span className="text-[10px] text-emerald-600 font-bold">● Aberto Hoje até 19:00</span>
                    </div>
                  </div>

                  {/* DYNAMIC STEP CONTENT */}
                  <div className="flex-1 space-y-3">
                    
                    {bookingStep === 1 && (
                      <div className="space-y-3 text-center py-6">
                        <Smartphone className="w-10 h-10 text-indigo-600 mx-auto" />
                        <h5 className="font-bold text-sm text-slate-900">Página Pública de Agendamento</h5>
                        <p className="text-xs text-slate-500">O cliente visualiza todos os serviços oferecidos e informações da unidade.</p>
                        <button
                          onClick={() => setBookingStep(2)}
                          className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md cursor-pointer"
                        >
                          Iniciar Agendamento
                        </button>
                      </div>
                    )}

                    {bookingStep === 2 && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase text-slate-400">Passo 2 de 6 — Escolha o Serviço</span>
                        {[
                          { name: "Corte + Barba VIP", price: "R$ 80,00", time: "45 min" },
                          { name: "Corte de Cabelo Fade", price: "R$ 50,00", time: "30 min" },
                          { name: "Barboterapia Relaxante", price: "R$ 45,00", time: "30 min" }
                        ].map((srv, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setSelectedService(srv.name);
                              setBookingStep(3);
                            }}
                            className={`p-2.5 rounded-xl border text-xs cursor-pointer flex justify-between items-center ${
                              selectedService === srv.name ? "bg-indigo-50 border-indigo-500" : "bg-white border-slate-200"
                            }`}
                          >
                            <div>
                              <strong className="block text-slate-800 text-xs">{srv.name}</strong>
                              <span className="text-[10px] text-slate-500">{srv.time}</span>
                            </div>
                            <span className="font-bold text-indigo-600">{srv.price}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {bookingStep === 3 && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase text-slate-400">Passo 3 de 6 — Profissional</span>
                        {[
                          { name: "Carlos Silva (Master)", role: "Especialista em Fade" },
                          { name: "Rafael Costa", role: "Barbeiro Visagista" },
                          { name: "Qualquer Profissional", role: "Maior disponibilidade" }
                        ].map((stf, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setSelectedStaff(stf.name);
                              setBookingStep(4);
                            }}
                            className={`p-2.5 rounded-xl border text-xs cursor-pointer flex justify-between items-center ${
                              selectedStaff === stf.name ? "bg-indigo-50 border-indigo-500" : "bg-white border-slate-200"
                            }`}
                          >
                            <div>
                              <strong className="block text-slate-800 text-xs">{stf.name}</strong>
                              <span className="text-[10px] text-slate-500">{stf.role}</span>
                            </div>
                            <UserCheck className="w-4 h-4 text-slate-400" />
                          </div>
                        ))}
                      </div>
                    )}

                    {bookingStep === 4 && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase text-slate-400">Passo 4 de 6 — Escolha a Data</span>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          {["Hoje (Esgotado)", "Amanhã - Ter", "Quarta-Feira"].map((dt, i) => (
                            <button
                              key={i}
                              disabled={i === 0}
                              onClick={() => {
                                setSelectedDate(dt);
                                setBookingStep(5);
                              }}
                              className={`p-3 rounded-xl border font-bold cursor-pointer ${
                                i === 0
                                  ? "bg-slate-100 text-slate-400 border-slate-200 line-through"
                                  : "bg-white border-slate-200 text-slate-800 hover:border-indigo-500"
                              }`}
                            >
                              {dt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {bookingStep === 5 && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase text-slate-400">Passo 5 de 6 — Horários Livres</span>
                        <div className="grid grid-cols-2 gap-2 text-center text-xs">
                          {["09:00", "10:30", "14:30", "16:00", "17:30"].map((time, i) => (
                            <button
                              key={i}
                              onClick={() => setBookingStep(6)}
                              className="p-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 cursor-pointer"
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {bookingStep === 6 && (
                      <div className="space-y-3 text-center py-2 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                        <h5 className="font-bold text-xs text-slate-900">Agendamento Confirmado!</h5>
                        <div className="text-[11px] text-slate-600 text-left space-y-1 bg-white p-2.5 rounded-lg border border-slate-200">
                          <p><strong>Serviço:</strong> {selectedService}</p>
                          <p><strong>Profissional:</strong> {selectedStaff}</p>
                          <p><strong>Data/Hora:</strong> {selectedDate}</p>
                        </div>
                        <button
                          onClick={() => setBookingStep(1)}
                          className="w-full py-2 rounded-lg bg-slate-900 text-white text-xs font-bold cursor-pointer"
                        >
                          Simular Novo Agendamento
                        </button>
                      </div>
                    )}

                  </div>

                  {/* BOTTOM STEP CONTROLS */}
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-[10px]">
                    <span className="text-slate-400 font-mono">PWA App Simulator</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            bookingStep === i ? "bg-indigo-600" : "bg-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTIONS 7, 8, 9: GESTÃO DE SERVIÇOS, PROFISSIONAIS E AGENDA INTELIGENTE */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* SECTION 7: SERVIÇOS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
                MÓDULO DE SERVIÇOS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Cada negócio trabalha de um jeito.{" "}
                <span className="text-indigo-600">Seus serviços também.</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Cadastre serviços com durações personalizadas, preços, fotos explicativas, requisitos e vincule aos profissionais habilitados para cada procedimento.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Duração em minutos e preço individual</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Ativação/Desativação com 1 clique</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Organização por categorias de serviços</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-slate-900 text-xs">Catálogo de Serviços — Painel do Estabelecimento</span>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                  + NOVO SERVIÇO
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { name: "Sessão de Fisioterapia Esportiva", dur: "50 min", price: "R$ 150,00", profs: "2 Profissionais", status: "Ativo" },
                  { name: "Consultoria Jurídica Trabalhista", dur: "60 min", price: "R$ 350,00", profs: "1 Profissional", status: "Ativo" },
                  { name: "Banho + Tosa Higiênica Pet", dur: "90 min", price: "R$ 90,00", profs: "3 Tosadores", status: "Ativo" },
                ].map((s, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <strong className="block text-slate-900 font-bold">{s.name}</strong>
                      <span className="text-[10px] text-slate-500">Duração: {s.dur} • Vinc: {s.profs}</span>
                    </div>
                    <div className="text-right">
                      <span className="block font-black text-slate-900">{s.price}</span>
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {s.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 8 & 9: PROFISSIONAIS & AGENDA INTELIGENTE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-slate-200">
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-left order-2 lg:order-1">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span>Agenda Inteligente & Bloqueio de Conflitos</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Visualização por Grade</span>
              </div>

              {/* CALENDAR TIMELINE MOCKUP */}
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-900 font-bold">
                  09:00 - OCUPADO
                  <span className="block text-[8px] font-sans text-indigo-700">João Silva</span>
                </div>
                <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 font-bold">
                  10:00 - LIVRE
                  <span className="block text-[8px] font-sans text-emerald-700">Disponível</span>
                </div>
                <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 font-bold">
                  11:00 - BLOQUEIO
                  <span className="block text-[8px] font-sans text-rose-700">Almoço</span>
                </div>
                <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-900 font-bold">
                  14:00 - OCUPADO
                  <span className="block text-[8px] font-sans text-indigo-700">Mariana A.</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 text-slate-600">
                <p className="font-bold text-slate-800">🛡️ Prevenção Automática de Overbooking:</p>
                <p className="text-[11px]">
                  O sistema valida em milissegundos se o profissional já possui compromisso no horário solicitado antes de aprovar a reserva.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4 text-left order-1 lg:order-2">
              <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
                GESTÃO DE EQUIPES
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Cada profissional com{" "}
                <span className="text-indigo-600">sua própria agenda.</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Menos confusão. Cada profissional cadastrado possui painel exclusivo, foto, horários de expediente, pausas para almoço e relatórios de atendimentos realizados.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 10 & 11: ESTRUTURA MULTIEMPRESA E MULTIUNIDADES */}
      <section id="multiempresa" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
              ARQUITETURA MULTI-TENANT
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Feito para crescer com o seu negócio:{" "}
              <span className="text-indigo-600">Multiempresa & Multiunidades.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A plataforma isola completamente os dados de cada cliente/estabelecimento dentro de uma única instalação com banco relacional otimizado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Múltiplas Empresas (Tenants)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cada empresa possui seus próprios usuários, clientes, logotipo, relatórios e configurações sem qualquer interferência em outros cadastros.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Multiunidades / Filiais</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Uma empresa pode ter Matriz e N Filiais (Ex: Unidade Centro, Unidade Shopping) com profissionais e agendas distintas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Isolamento de Segurança</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consultas SQL/Prisma protegidas com chave primária de Tenant ID garantindo que nenhuma empresa acesse dados de outra.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 12: WHITE-LABEL (INTERACTIVE BRAND SWITCHER) */}
      <section id="white-label" className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider">
              PERSONALIZAÇÃO TOTAL
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              A sua marca.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
                O seu sistema.
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Altere logotipos, nomes, cores e banners públicos. "O cliente vê a sua marca. A tecnologia trabalha nos bastidores."
            </p>
          </div>

          {/* INTERACTIVE BRAND SELECTOR BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {(Object.keys(brandThemes) as Array<keyof typeof brandThemes>).map((key) => {
              const theme = brandThemes[key];
              return (
                <button
                  key={key}
                  onClick={() => setActiveBrandTheme(key)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-2 border ${
                    activeBrandTheme === key
                      ? "bg-white text-slate-900 border-white shadow-lg"
                      : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{theme.name}</span>
                </button>
              );
            })}
          </div>

          {/* LIVE BRAND PREVIEW MOCKUP */}
          <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 text-slate-900 space-y-4 shadow-2xl text-left transition-all duration-300">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <span className={`font-black text-sm tracking-wide ${currentTheme.text}`}>
                {currentTheme.logo}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${currentTheme.badge}`}>
                Ambiente White-Label
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-sm text-slate-800">Selecione o Serviço para Agendar:</h4>
              <div className={`p-3 rounded-xl border ${currentTheme.border} bg-slate-50 flex items-center justify-between text-xs`}>
                <div>
                  <strong className="block text-slate-900">Atendimento Personalizado Premium</strong>
                  <span className="text-slate-500 text-[10px]">Duração: 45 minutos</span>
                </div>
                <button className={`px-3 py-1.5 rounded-lg font-bold text-xs ${currentTheme.primaryBtn} cursor-pointer`}>
                  Agendar
                </button>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 text-center font-mono">
              ★ O cliente final enxerga somente a marca configurada no painel.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 13: PWA (PROGRESSIVE WEB APP) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4 text-left">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                TECNOLOGIA PWA
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Experiência de aplicativo{" "}
                <span className="text-indigo-600">sem complicar o acesso.</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sem depender de burocracias das lojas de aplicativos ou taxas de publicação. O cliente ou profissional pode adicionar o ícone do sistema direto na tela inicial do celular com 1 clique.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-700 font-bold">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-indigo-600" />
                  <span>Instalável no Celular</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-indigo-600" />
                  <span>Carregamento Ultra Rápido</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 text-left space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg">
                  APP
                </div>
                <div>
                  <strong className="block text-sm font-bold text-white">Instalar o App de Agendamento?</strong>
                  <span className="text-xs text-slate-400">Adicionar à tela inicial para acesso instantâneo</span>
                </div>
              </div>
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => alert("Simulação PWA: O ícone do app foi instalado no dispositivo!")}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  [+] Adicionar à Tela Inicial
                </button>
                <button className="px-4 py-2 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl">
                  Agora Não
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 14: PAINÉIS DO SISTEMA (TABBED ROLE SWITCHER) */}
      <section id="paineis" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
              NÍVEIS DE ACESSO
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Painéis dedicados para cada perfil de usuário.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A plataforma possui interfaces adaptadas com permissões específicas para o Administrador Geral, o Dono do Estabelecimento, o Profissional e o Cliente Final.
            </p>
          </div>

          {/* TABS */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "super", label: "01. Super Admin (Dono da Plataforma)" },
              { id: "store", label: "02. Estabelecimento (Gestor)" },
              { id: "staff", label: "03. Profissional (Agenda)" },
              { id: "client", label: "04. Cliente Final (Agendamento)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedRolePanel(tab.id as any)}
                className={`px-4 py-3 rounded-xl font-bold text-xs transition cursor-pointer ${
                  selectedRolePanel === tab.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* DYNAMIC PANEL DETAILS */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-left max-w-4xl mx-auto space-y-6">
            
            {selectedRolePanel === "super" && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                    SA
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">Painel Super Admin — Visão Global da Operação</h3>
                    <p className="text-xs text-slate-500">Controle total de empresas cadastradas, planos SaaS e métricas de uso.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block">Gestão de Tenancy:</strong>
                    <p className="text-slate-600">Ative, suspenda ou edite empresas clientes e veja métricas globais.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block">Módulo de Planos SaaS:</strong>
                    <p className="text-slate-600">Crie planos com limites de profissionais, filiais e vigência de assinaturas.</p>
                  </div>
                </div>
              </div>
            )}

            {selectedRolePanel === "store" && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
                    EST
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">Painel do Estabelecimento — Gestão da Unidade</h3>
                    <p className="text-xs text-slate-500">Configuração de horários de funcionamento, cadastro de equipe e catálogo.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block">Serviços & Preços:</strong>
                    <p className="text-slate-600">Defina tempo de atendimento, valores e fotos ilustrativas.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block">Gestão da Equipe:</strong>
                    <p className="text-slate-600">Cadastre profissionais e atribua serviços que cada um executa.</p>
                  </div>
                </div>
              </div>
            )}

            {selectedRolePanel === "staff" && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                    PRO
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">Painel do Profissional — Agenda Individual</h3>
                    <p className="text-xs text-slate-500">Acesso móvel para o profissional acompanhar seus agendamentos do dia.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block">Visualização de Compromissos:</strong>
                    <p className="text-slate-600">Lista cronológica dos atendimentos do dia com detalhes do cliente.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block">Bloqueios de Horário:</strong>
                    <p className="text-slate-600">Opção para marcar horários de folga ou compromissos imprevistos.</p>
                  </div>
                </div>
              </div>
            )}

            {selectedRolePanel === "client" && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    CLI
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">Página de Agendamento do Cliente (PWA)</h3>
                    <p className="text-xs text-slate-500">Interface limpa e veloz para realizar o agendamento em poucos segundos.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block">Seleção de Data e Hora:</strong>
                    <p className="text-slate-600">Verificação de vagas em tempo real sem necessidade de telefonemas.</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block">Meus Agendamentos:</strong>
                    <p className="text-slate-600">Histórico de agendamentos passados e futuros com opção de reagendamento.</p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* SECTION 15: PLANOS E ASSINATURAS (SAAS MODEL) */}
      <section id="saas" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider border border-purple-200">
              RECURSIVIDADE FINANCEIRA
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Transforme software em{" "}
              <span className="text-indigo-600">receita recorrente (SaaS).</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A estrutura do sistema inclui módulo para você criar diferentes planos de assinatura para os seus clientes, definindo limites por empresa.
            </p>
          </div>

          {/* EXAMPLE SAAS PLANS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">PLANO EXEMPLO 01</span>
              <h3 className="font-extrabold text-xl text-slate-900">Básico Autônomo</h3>
              <p className="text-xs text-slate-600">Ideal para profissionais individuais ou pequenos negócios.</p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>1 Profissional / Agenda</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>1 Unidade / Endereço</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Serviços Ilimitados</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-50 border-2 border-indigo-500 space-y-4 shadow-lg relative">
              <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[10px] uppercase">
                MAIS VENDIDO
              </span>
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">PLANO EXEMPLO 02</span>
              <h3 className="font-extrabold text-xl text-slate-900">Profissional</h3>
              <p className="text-xs text-slate-600">Para estabelecimentos com equipe em crescimento.</p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-indigo-200">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Até 10 Profissionais</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Até 3 Unidades / Filiais</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Painel de Relatórios</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">PLANO EXEMPLO 03</span>
              <h3 className="font-extrabold text-xl text-slate-900">Redes & Franquias</h3>
              <p className="text-xs text-slate-600">Para redes com dezenas de unidades e equipe ilimitada.</p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Profissionais Ilimitados</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Unidades Ilimitadas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Suporte VIP e SLA</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 16 & 17: ÁREA TÉCNICA PARA DESENVOLVEDORES */}
      <section id="tech" className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider">
              ÁREA DOS DESENVOLVEDORES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Uma base moderna para{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
                continuar evoluindo.
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Desenvolvido com as melhores práticas da indústria. Código limpo em TypeScript, totalmente modular e pronto para expansão.
            </p>
          </div>

          {/* TECH BADGES GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { name: "React 18", desc: "Frontend em SPA/Componentes" },
              { name: "TypeScript", desc: "Tipagem estática 100%" },
              { name: "Node.js / Fastify", desc: "Backend de alta performance" },
              { name: "MySQL", desc: "Banco relacional robusto" },
              { name: "Prisma ORM", desc: "Queries seguras e migrations" },
              { name: "PWA Mobile", desc: "Service workers & manifesto" },
            ].map((tech, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
                <Code2 className="w-6 h-6 text-indigo-400 mx-auto" />
                <strong className="block text-white text-xs font-bold">{tech.name}</strong>
                <span className="text-[10px] text-slate-400 block">{tech.desc}</span>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setShowTechModal(true)}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 font-mono text-xs font-bold transition inline-flex items-center space-x-2 cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>Para Desenvolvedores ➔ Ver Detalhes Arquiteturais</span>
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 18: VANTAGENS DO SCRIPT PRONTO (COMPARISON TABLE) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
              ECONOMIA DE TEMPO
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Meses de desenvolvimento transformados em um{" "}
              <span className="text-indigo-600">ponto de partida.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Evite passar 6 a 12 meses construindo a arquitetura do zero. Comece com uma base sólida e testada.
            </p>
          </div>

          {/* COMPARISON TABLE */}
          <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden text-left text-xs">
            
            <div className="grid grid-cols-12 bg-slate-900 text-white p-4 font-bold">
              <div className="col-span-6">REQUISITO DA PLATAFORMA</div>
              <div className="col-span-3 text-rose-400">DESENVOLVER DO ZERO</div>
              <div className="col-span-3 text-emerald-400">NOSSA PLATAFORMA</div>
            </div>

            {[
              { req: "Arquitetura Multi-tenant (Multiempresa)", zero: "3 a 4 semanas", plat: "✅ Incluído e Pronto" },
              { req: "Gestão de Múltiplas Unidades e Filiais", zero: "2 a 3 semanas", plat: "✅ Incluído e Pronto" },
              { req: "Módulo de Serviços, Horários e Preços", zero: "2 semanas", plat: "✅ Incluído e Pronto" },
              { req: "Prevenção de Overbooking em Milissegundos", zero: "1 a 2 semanas", plat: "✅ Otimizado no DB" },
              { req: "Módulo de Planos SaaS & Assinaturas", zero: "3 semanas", plat: "✅ Incluído e Pronto" },
              { req: "Suporte PWA para Dispositivos Móveis", zero: "2 semanas", plat: "✅ Configurado" },
              { req: "Recursos White-Label (Marca Própria)", zero: "2 semanas", plat: "✅ Incluído e Pronto" },
              { req: "Tempo Estimado para Lançamento", zero: "6 a 12 Meses", plat: "🚀 Lançamento Imediato" },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-12 p-3 border-b border-slate-200 items-center ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                <div className="col-span-6 font-bold text-slate-800">{row.req}</div>
                <div className="col-span-3 text-slate-500 font-mono">{row.zero}</div>
                <div className="col-span-3 font-bold text-emerald-700">{row.plat}</div>
              </div>
            ))}

          </div>

          <div className="text-center">
            <button
              onClick={() => setShowSalesModal(true)}
              className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/20 cursor-pointer inline-flex items-center space-x-2"
            >
              <span>Comece de onde muitos projetos levam meses para chegar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 20 & 21: PARA QUEM É & MODELOS DE NEGÓCIO */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
              PERFIL DE COMPRADORES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Para quem é esta plataforma?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Desenvolvida para atender diferentes modelos de atuação no mercado digital e corporativo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <strong className="block text-slate-900 text-base font-bold">EMPREENDEDOR</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                "Quer lançar seu próprio SaaS de agendamento sem precisar contratar uma equipe para desenvolver do zero."
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <strong className="block text-slate-900 text-base font-bold">AGÊNCIA DIGITAL</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                "Quer oferecer uma plataforma de agendamentos com sua própria marca como solução recorrente para seus clientes."
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                <Code2 className="w-5 h-5" />
              </div>
              <strong className="block text-slate-900 text-base font-bold">DESENVOLVEDOR</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                "Quer partir de uma arquitetura limpa em TypeScript/React para customizar e criar soluções sob medida."
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                <Store className="w-5 h-5" />
              </div>
              <strong className="block text-slate-900 text-base font-bold">EMPRESA / REDE</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                "Quer possuir sua própria tecnologia interna de agendamento sem pagar mensalidades de terceiros."
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 25: O QUE O COMPRADOR RECEBE */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
              ENTREGÁVEIS DO SCRIPT
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              O que você recebe ao adquirir a plataforma.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Acesso completo ao ecossistema de software para hospedagem e evolução.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left text-xs">
            {[
              "Código-fonte Frontend (React + TypeScript)",
              "Código-fonte Backend (Node.js + Fastify)",
              "Scripts de Banco de Dados (MySQL / Prisma)",
              "Estrutura Multiempresa (Multi-Tenant)",
              "Painel Super Admin da Plataforma",
              "Painel de Gestão do Estabelecimento",
              "Painel de Agenda do Profissional",
              "Página Pública do Cliente (PWA)",
              "Módulo de Planos e Assinaturas",
              "Recursos White-Label (Personalização)",
              "Suporte a Múltiplas Unidades",
              "Documentação de Instalação e Deploy"
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="font-bold text-slate-800">{item}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 26: ROADMAP / POSSIBILIDADES DE EXPANSÃO */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider border border-amber-200">
                POSSIBILIDADES DE EVOLUÇÃO — NÃO NECESSARIAMENTE INCLUÍDAS NA VERSÃO ATUAL
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">
                Roadmap de expansão do seu software.
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
            {[
              "💳 Pagamentos Online via PIX/Cartão",
              "📱 Robô Lembrete por WhatsApp",
              "📊 Relatórios Financeiros Avançados",
              "🎁 Programa de Fidelidade & Cashback",
              "📲 App Nativo iOS e Android (Capacitor)"
            ].map((exp, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium">
                {exp}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 27: FAQ ACCORDION */}
      <section id="faq" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
              PERGUNTAS FREQUENTES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Tire suas dúvidas sobre a plataforma.
            </h2>
          </div>

          <div className="space-y-3 text-left">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 bg-slate-50 hover:bg-slate-100 font-bold text-slate-900 text-sm flex items-center justify-between cursor-pointer text-left"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {activeFaq === idx && (
                  <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 28: CTA FINAL */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white text-center relative overflow-hidden">
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          
          <span className="px-4 py-1.5 rounded-full bg-white/10 text-indigo-200 border border-white/20 text-xs font-bold uppercase tracking-wider">
            OPORTUNIDADE DE MERCADO
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Você pode passar meses desenvolvendo uma plataforma de agendamentos.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300 block mt-2">
              Ou começar com uma base que já nasceu pensando em escala.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Transforme uma plataforma multisserviços em seu próximo produto, SaaS ou solução para clientes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setShowDemoModal(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm shadow-2xl transition cursor-pointer flex items-center justify-center space-x-2"
            >
              <Eye className="w-4 h-4 text-indigo-600" />
              <span>VER A PLATAFORMA</span>
            </button>

            <button
              onClick={() => setShowSalesModal(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition cursor-pointer flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4 text-white" />
              <span>QUERO SABER MAIS</span>
            </button>
          </div>

          <div className="pt-8 text-xs font-mono text-indigo-300 flex flex-wrap justify-center gap-4 opacity-80">
            <span>• Multiempresa</span>
            <span>• Multisserviços</span>
            <span>• White-Label</span>
            <span>• PWA Mobile</span>
            <span>• Código TypeScript</span>
          </div>

        </div>

      </section>

      {/* SECTION 29: FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-800 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            <div className="space-y-3">
              <span className="font-extrabold text-white text-base block">VITA SCHEDULER</span>
              <p className="text-slate-400 text-xs">
                Plataforma de Agendamentos Multisserviços White-Label e Multiempresa.
              </p>
            </div>

            <div className="space-y-2">
              <strong className="text-white block font-bold text-xs uppercase">Produto</strong>
              <a href="#plataforma" className="block hover:text-white">A Plataforma</a>
              <a href="#mercados" className="block hover:text-white">Segmentos</a>
              <a href="#multiempresa" className="block hover:text-white">Multiempresa</a>
              <a href="#white-label" className="block hover:text-white">White-Label</a>
            </div>

            <div className="space-y-2">
              <strong className="text-white block font-bold text-xs uppercase">Tecnologia</strong>
              <a href="#tech" className="block hover:text-white">React & TypeScript</a>
              <a href="#tech" className="block hover:text-white">Node.js & Fastify</a>
              <a href="#tech" className="block hover:text-white">MySQL & Prisma</a>
            </div>

            <div className="space-y-2">
              <strong className="text-white block font-bold text-xs uppercase">Atendimento & Comercial</strong>
              <p>comercial@vitascheduler.com.br</p>
              <button
                onClick={() => setShowSalesModal(true)}
                className="mt-2 px-3 py-1.5 bg-indigo-600 text-white font-bold rounded-lg text-xs hover:bg-indigo-500 cursor-pointer"
              >
                Falar com Consultor
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
            <p>© {new Date().getFullYear()} VITA SCHEDULER. Todos os direitos reservados. Licenciamento de Software B2B.</p>
            <div className="flex space-x-4">
              <span className="hover:text-slate-300 cursor-pointer">Termos de Licenciamento</span>
              <span className="hover:text-slate-300 cursor-pointer">Política de Privacidade</span>
            </div>
          </div>

        </div>
      </footer>

      {/* DEMO MODAL */}
      <AnimatePresence>
        {showDemoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-slate-900 space-y-6 text-left shadow-2xl relative"
            >
              <button
                onClick={() => setShowDemoModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                  DEMONSTRAÇÃO AO VIVO
                </span>
                <h3 className="text-xl font-black text-slate-900">Acesse a Demonstração da Plataforma</h3>
                <p className="text-xs text-slate-600">
                  Selecione qual ambiente do sistema você gostaria de simular agora:
                </p>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => alert("Abrindo simulação do Painel Super Admin...")}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <strong className="block text-sm text-slate-900 font-bold">1. Painel Super Admin (Visão Global SaaS)</strong>
                    <span className="text-xs text-slate-500">Administração de empresas, planos e métricas.</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-indigo-600" />
                </div>

                <div
                  onClick={() => alert("Abrindo simulação do Painel do Estabelecimento...")}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <strong className="block text-sm text-slate-900 font-bold">2. Painel do Estabelecimento / Loja</strong>
                    <span className="text-xs text-slate-500">Cadastro de serviços, profissionais e unidades.</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-indigo-600" />
                </div>

                <div
                  onClick={() => alert("Abrindo simulação do Agendamento pelo Cliente...")}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <strong className="block text-sm text-slate-900 font-bold">3. Página do Cliente Final (PWA App)</strong>
                    <span className="text-xs text-slate-500">Fluxo rápido de agendamento mobile.</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-indigo-600" />
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SALES / INQUIRY MODAL */}
      <AnimatePresence>
        {showSalesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full text-slate-900 space-y-6 text-left shadow-2xl relative"
            >
              <button
                onClick={() => {
                  setShowSalesModal(false);
                  setContactSuccess(false);
                }}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {!contactSuccess ? (
                <>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                      CONTATO COMERCIAL & LICENÇA
                    </span>
                    <h3 className="text-xl font-black text-slate-900">Adquira o Script da Plataforma</h3>
                    <p className="text-xs text-slate-600">
                      Preencha seus dados para receber o orçamento do código-fonte e condições de licenciamento.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setContactSuccess(true);
                    }}
                    className="space-y-3 text-xs"
                  >
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Seu Nome / Empresa</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Gabriel Santos (Agência Tech)"
                        className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">WhatsApp de Contato</label>
                      <input
                        type="text"
                        required
                        placeholder="(11) 99999-9999"
                        className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Seu Objetivo Principal</label>
                      <select className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-indigo-500">
                        <option>Criar meu próprio SaaS de Agendamentos</option>
                        <option>Revender para meus clientes de agência</option>
                        <option>Usar na minha própria rede de empresas</option>
                        <option>Comprar código para evolução/customização</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition shadow-lg shadow-indigo-600/25 cursor-pointer mt-2"
                    >
                      SOLICITAR PROPOSTA DO SCRIPT
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center space-y-4 py-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-lg text-slate-900">Solicitação Enviada!</h4>
                  <p className="text-xs text-slate-600">
                    Nossa equipe comercial entrará em contato via WhatsApp com todas as informações de licenciamento e acesso à demonstração.
                  </p>
                  <button
                    onClick={() => {
                      setShowSalesModal(false);
                      setContactSuccess(false);
                    }}
                    className="px-6 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TECHNICAL DETAILS MODAL */}
      <AnimatePresence>
        {showTechModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 text-left border border-slate-800 shadow-2xl relative"
            >
              <button
                onClick={() => setShowTechModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/20 px-2.5 py-0.5 rounded border border-indigo-500/30">
                  DEVELOPER SPECIFICATIONS
                </span>
                <h3 className="text-xl font-bold text-white">Especificações da Arquitetura de Software</h3>
              </div>

              <div className="space-y-3 text-xs text-slate-300 font-mono bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <p><span className="text-indigo-400">├── Frontend:</span> React 18, TypeScript, Tailwind CSS, Lucide Icons</p>
                <p><span className="text-sky-400">├── Backend:</span> Node.js, Fastify framework, REST API</p>
                <p><span className="text-purple-400">├── Database:</span> MySQL 8.0, Prisma ORM com Migrations</p>
                <p><span className="text-emerald-400">├── Security:</span> JWT Sessions, Bcrypt, Tenant Scope Guard middleware</p>
                <p><span className="text-amber-400">└── Mobile:</span> PWA Service Worker + Manifest.json</p>
              </div>

              <p className="text-xs text-slate-400">
                O código está organizado em camadas separadas (Controllers, Services, Repositories, Routes) permitindo fácil manutenção e desacoplamento de serviços.
              </p>

              <button
                onClick={() => setShowTechModal(false)}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 cursor-pointer"
              >
                Entendido
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
