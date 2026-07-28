import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Search, Filter, ShieldCheck, Star, Clock, 
  DollarSign, CheckCircle2, User, Briefcase, Plus, 
  Settings, TrendingUp, AlertTriangle, ChevronRight, 
  CreditCard, Calendar, Check, Send, Award, Users, 
  Smartphone, Lock, MapPin, Sparkles, MessageSquare, 
  ThumbsUp, Ban, HelpCircle, FileText, LayoutDashboard,
  Bell, ClipboardList, Paperclip
} from "lucide-react";

// Types for the mock data
interface Review {
  id: string;
  author: string;
  clientName?: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
}

interface PortfolioItem {
  title: string;
  image: string;
  imageUrl?: string;
  category?: string;
  description: string;
}

interface Provider {
  id: string;
  name: string;
  category: string;
  title: string;
  rating: number;
  reviewsCount: number;
  completedJobs: number;
  hourlyRate: number;
  location: string;
  avatar: string;
  verified: boolean;
  skills: string[];
  bio: string;
  reviews: Review[];
  portfolio: PortfolioItem[];
}

interface Contract {
  id: string;
  providerName: string;
  providerAvatar: string;
  serviceTitle: string;
  price: number;
  date: string;
  status: "pending" | "in_progress" | "review" | "completed" | "disputed";
  description: string;
}

interface Dispute {
  id: string;
  contractId: string;
  clientName: string;
  providerName: string;
  amount: number;
  reason: string;
  status: "open" | "resolved_refunded" | "resolved_released";
}

interface Bid {
  id: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  amount: number;
  daysToComplete: number;
  message: string;
  rating: number;
}

interface JobPost {
  id: string;
  title: string;
  category: string;
  description: string;
  budget: number;
  timeline: string;
  datePosted: string;
  status: "open" | "completed";
  bids: Bid[];
}

interface Message {
  id: string;
  sender: "client" | "provider";
  text: string;
  timestamp: string;
}

interface Chat {
  id: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  providerTitle: string;
  messages: Message[];
  unread?: boolean;
}

// Mock Data
const INITIAL_PROVIDERS: Provider[] = [
  {
    id: "p1",
    name: "Carlos Eduardo Santos",
    category: "Reformas",
    title: "Eletricista Residencial & Comercial",
    rating: 4.9,
    reviewsCount: 124,
    completedJobs: 245,
    hourlyRate: 85,
    location: "São Paulo, SP",
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=150&h=150&q=80",
    verified: true,
    skills: ["Instalações Elétricas", "Quadros de Força", "Iluminação LED", "Manutenção Preventiva"],
    bio: "Eletricista certificado pelo SENAI com mais de 8 anos de experiência. Foco em segurança elétrica, atendimento ágil e acabamento impecável.",
    reviews: [
      { id: "r1_1", author: "Laura Souza", rating: 5, date: "10 Jul 2026", comment: "Trabalho impecável! O Carlos refez toda a fiação da minha cozinha e instalou os novos lustres com muita rapidez e capricho. Altamente qualificado!" },
      { id: "r1_2", author: "Roberto Marques", rating: 5, date: "28 Jun 2026", comment: "Profissional extremamente pontual e organizado. Explicou todo o problema no quadro de força e limpou o local após o término do serviço elétrico. Nota 10!" },
      { id: "r1_3", author: "Fernanda Costa", rating: 4.8, date: "15 Mai 2026", comment: "Preço justo, muito polido e atencioso. Recomendo de olhos fechados para qualquer manutenção elétrica residencial." }
    ],
    portfolio: [
      { title: "Refatoração de Quadro Geral", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80", description: "Troca completa de disjuntores antigos pretos NEMA por modelos padrão DIN modernos com proteção DPS e IDR anti-choque." },
      { title: "Iluminação Sanca de Gesso", image: "https://images.unsplash.com/photo-1565538810844-1e119412e3d7?auto=format&fit=crop&w=400&q=80", description: "Instalação de fitas de LED inteligentes RGB integradas com Alexa em sanca de gesso de sala de estar." }
    ]
  },
  {
    id: "p2",
    name: "Mariana Alencar",
    category: "Tecnologia",
    title: "Desenvolvedora Frontend React & Mobile",
    rating: 5.0,
    reviewsCount: 89,
    completedJobs: 112,
    hourlyRate: 150,
    location: "Florianópolis, SC",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    verified: true,
    skills: ["React.js", "React Native", "Tailwind CSS", "Figma para Código"],
    bio: "Especialista em construir interfaces de altíssima fidelidade, velozes e totalmente responsivas. Apaixonada por UX e código limpo.",
    reviews: [
      { id: "r2_1", author: "Thiago Fontes", rating: 5, date: "12 Jul 2026", comment: "Mariana é espetacular. Entregou a landing page com Next.js antes do prazo e com um capricho fora de série no visual. Código super limpo e bem documentado." },
      { id: "r2_2", author: "Alice Kaufmann", rating: 5, date: "03 Jul 2026", comment: "Excelente profissional! Entende muito de usabilidade e arquitetura React. A comunicação diária foi impecável e transparente. Contratarei novamente!" }
    ],
    portfolio: [
      { title: "Dashboard SaaS de Logística", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80", description: "Painel de controle responsivo com gráficos complexos em Recharts, tabelas filtráveis e tema dark nativo." },
      { title: "App iOS/Android de Delivery", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80", description: "Aplicativo em React Native integrado com mapas, rastreamento geolocalizado e pagamentos Apple/Google Pay." }
    ]
  },
  {
    id: "p3",
    name: "Rodrigo Mendes",
    category: "Design & Multimídia",
    title: "Designer Gráfico & Especialista de Branding",
    rating: 4.8,
    reviewsCount: 76,
    completedJobs: 98,
    hourlyRate: 120,
    location: "Belo Horizonte, MG",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    verified: true,
    skills: ["Identidade Visual", "Logo Design", "Adobe Illustrator", "Apresentações Corporativas"],
    bio: "Transformo conceitos abstratos em identidades visuais de impacto que impulsionam o faturamento de marcas e startups modernas.",
    reviews: [
      { id: "r3_1", author: "Cláudia Guimarães", rating: 5, date: "05 Jul 2026", comment: "Ficamos maravilhados com a nova identidade visual da nossa clínica. O manual de marca é completíssimo e exala sofisticação." },
      { id: "r3_2", author: "Bruno Sampaio", rating: 4.6, date: "20 Jun 2026", comment: "Designer muito criativo, pontual e paciente com as alterações de layouts solicitadas. O resultado superou nossa expectativa." }
    ],
    portfolio: [
      { title: "Branding Startup de Fintech", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80", description: "Identidade visual completa, manual de marca corporativo, papelaria fina e guias tipográficos." }
    ]
  },
  {
    id: "p4",
    name: "Ana Julia Ferreira",
    category: "Reformas",
    title: "Designer de Interiores & Pintura Decorativa",
    rating: 4.9,
    reviewsCount: 52,
    completedJobs: 67,
    hourlyRate: 95,
    location: "Campinas, SP",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    verified: false,
    skills: ["Pintura Geométrica", "Escolha de Paletas", "Harmonização de Ambientes", "Papéis de Parede"],
    bio: "Ajudo famílias a resgatarem o prazer de estar em casa através de renovações rápidas de cor, textura, marcenaria leve e decoração afetiva.",
    reviews: [
      { id: "r4_1", author: "Fernando Almeida", rating: 5, date: "15 Jun 2026", comment: "A pintura geométrica do quarto ficou divina! Acabamento impecável nos cantos e entrega no prazo combinado. Recomendo com certeza." }
    ],
    portfolio: [
      { title: "Renovação de Loft Industrial", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80", description: "Consultoria de ambientação, escolha de tintas texturizadas, spots de trilho e tapeçaria sob medida." }
    ]
  },
  {
    id: "p5",
    name: "Bruno Albuquerque",
    category: "Assistência Técnica",
    title: "Manutenção de Smartphones & Notebooks",
    rating: 4.7,
    reviewsCount: 143,
    completedJobs: 310,
    hourlyRate: 75,
    location: "Rio de Janeiro, RJ",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    verified: true,
    skills: ["Troca de Tela", "Reparo em Placa", "Instalação de OS", "Soldas de Precisão"],
    bio: "Laboratório próprio totalmente equipado. Especialista em Apple, Samsung e Dell. Orçamento expresso e peças originais com garantia.",
    reviews: [
      { id: "r5_1", author: "Guilherme Rosa", rating: 5, date: "14 Jul 2026", comment: "Trocou a tela do meu iPhone 14 Pro Max em apenas 45 minutos no laboratório dele. Peça excelente, cores fiéis e garantia carimbada." },
      { id: "r5_2", author: "Patrícia Drummond", rating: 4.5, date: "02 Jul 2026", comment: "Conseguiu soldar de volta a trilha rompida da placa lógica do meu laptop de trabalho. Transparência extrema e preço muito condizente com a complexidade." }
    ],
    portfolio: [
      { title: "Bancada de Solda e Microscópio", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80", description: "Instrumentação avançada de reparo milimétrico de placas eletrônicas e resolda BGA." }
    ]
  },
  {
    id: "p6",
    name: "Patricia Gouveia",
    category: "Tecnologia",
    title: "Consultora de Tráfego Pago & Growth",
    rating: 5.0,
    reviewsCount: 61,
    completedJobs: 84,
    hourlyRate: 180,
    location: "Curitiba, PR",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    verified: true,
    skills: ["Google Ads", "Meta Ads", "Funis de Vendas", "Web Analytics"],
    bio: "Ex-gerente de marketing de multinacional. Foco total em ROI e CPA otimizados. Trago leads qualificados diretamente para o seu comercial.",
    reviews: [
      { id: "r6_1", author: "Carlos Valente", rating: 5, date: "08 Jul 2026", comment: "Nossas conversões em anúncios aumentaram 42% nas primeiras três semanas de consultoria ativa. Foco analítico exemplar!" }
    ],
    portfolio: [
      { title: "Funil de Leads Imobiliários", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80", description: "Estrutura de criativos, testes de landing page e otimização de campanhas locais no Meta Ads." }
    ]
  }
];

const INITIAL_CONTRACTS: Contract[] = [
  {
    id: "c-1002",
    providerName: "Carlos Eduardo Santos",
    providerAvatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=150&h=150&q=80",
    serviceTitle: "Instalação de Lustres e Tomadas na Cozinha",
    price: 340,
    date: "17 Jul 2026",
    status: "in_progress",
    description: "Instalação de 2 luminárias pendentes, troca de fiação de chuveiro elétrico e fixação de 4 tomadas adicionais padrão 20A no balcão da pia de granito."
  },
  {
    id: "c-1003",
    providerName: "Mariana Alencar",
    providerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    serviceTitle: "Refatoração de Página de Captura em Next.js",
    price: 1500,
    date: "14 Jul 2026",
    status: "review",
    description: "Migração de código legado para Tailwind, adição de microanimações dinâmicas e integração segura com a API do CRM do cliente."
  },
  {
    id: "c-1004",
    providerName: "Rodrigo Mendes",
    providerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    serviceTitle: "Manual de Marca e Logo Corporativo",
    price: 1800,
    date: "10 Jul 2026",
    status: "completed",
    description: "Desenho de logotipo vetorial primário e secundário, escolha de tipografia, paleta Pantone, mockups em papelaria e PDF completo de Manual de Identidade Visual."
  }
];

const INITIAL_DISPUTES: Dispute[] = [
  {
    id: "dsp-501",
    contractId: "c-0991",
    clientName: "Fabio Henrique de Oliveira",
    providerName: "Lucas Pinheiro (Encanador)",
    amount: 450,
    reason: "O prestador de serviço não concluiu a vedação da caixa de gordura e o vazamento continua ocorrendo. Solicito devolução parcial do pagamento de escrow.",
    status: "open"
  }
];

const INITIAL_JOBS: JobPost[] = [
  {
    id: "job-101",
    title: "Reforma Elétrica Completa da Lavanderia",
    category: "Reformas",
    description: "Preciso puxar um ponto de energia 220V exclusivo para a nova máquina lava-e-seca, trocar um interruptor antigo trincado e testar o funcionamento do disjuntor de segurança DR.",
    budget: 450,
    timeline: "A combinar",
    datePosted: "16 Jul 2026",
    status: "open",
    bids: [
      {
        id: "bid-101_1",
        providerId: "p1",
        providerName: "Carlos Eduardo Santos",
        providerAvatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=150&h=150&q=80",
        amount: 400,
        daysToComplete: 1,
        message: "Olá! Vi seu projeto para a lavanderia. Sou eletricista credenciado, tenho as ferramentas adequadas e garanto o puxamento do ponto elétrico com eletroduto de alta resistência e cabo flexível antichama de 4mm. Posso realizar este sábado!",
        rating: 4.9
      }
    ]
  },
  {
    id: "job-102",
    title: "Logo & Papelaria para Cafeteria Especializada",
    category: "Design & Multimídia",
    description: "Preciso da identidade visual completa para a cafeteria 'Grão Nobre'. Preciso de um logo elegante, paleta de cores sofisticada e mockups em copos descartáveis e sacolas de papel craft.",
    budget: 1200,
    timeline: "Até 10 dias",
    datePosted: "15 Jul 2026",
    status: "open",
    bids: [
      {
        id: "bid-102_1",
        providerId: "p3",
        providerName: "Rodrigo Mendes",
        providerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
        amount: 1100,
        daysToComplete: 6,
        message: "Olá! Me apaixonei pela ideia do 'Grão Nobre'. Sou especialista em branding gastronômico e de cafés especiais. Entrego 3 alternativas de logo vetorizadas, manual cromático completo e mockups reais fotorrealistas de copos e sacolas. Vamos fechar?",
        rating: 4.8
      }
    ]
  }
];

const INITIAL_CHATS: Chat[] = [
  {
    id: "c1",
    providerId: "p1",
    providerName: "Carlos Eduardo Santos",
    providerAvatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=150&h=150&q=80",
    providerTitle: "Eletricista Residencial & Comercial",
    messages: [
      { id: "m1", sender: "provider", text: "Olá! Vi seu interesse no meu perfil de eletricista. Como posso te ajudar hoje?", timestamp: "14:15" },
      { id: "m2", sender: "client", text: "Olá Carlos! Gostei das suas avaliações. Queria saber se você tem disponibilidade para instalar 2 luminárias pendentes esta semana na zona sul.", timestamp: "14:18" },
      { id: "m3", sender: "provider", text: "Olá! Tenho sim, atendo muito a zona sul. Consigo ir na quinta-feira pela manhã, por volta das 09:30. Se quiser, podemos fechar o orçamento pelo app!", timestamp: "14:20" }
    ],
    unread: true
  },
  {
    id: "c2",
    providerId: "p2",
    providerName: "Mariana Alencar",
    providerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    providerTitle: "Desenvolvedora Frontend React",
    messages: [
      { id: "m4", sender: "client", text: "Oi Mariana! Você tem portfólio de apps mobile em React Native?", timestamp: "Ontem" },
      { id: "m5", sender: "provider", text: "Oi! Tenho sim. Já criei apps de delivery e de telemedicina operacionais na App Store e Play Store. Se você me passar o escopo do seu projeto, posso enviar um orçamento certinho ou fazermos uma chamada!", timestamp: "Ontem" }
    ],
    unread: false
  }
];

export default function MarketplacePortfolio({ onBack }: { onBack: () => void }) {
  // Navigation tabs of this prototype
  const [activeTab, setActiveTab] = useState<"marketplace" | "job_board" | "chat" | "provider_dashboard" | "admin_panel">("marketplace");
  
  // Market filters
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [providers, setProviders] = useState<Provider[]>(INITIAL_PROVIDERS);
  
  // Custom states for new professional features
  const [selectedProviderProfile, setSelectedProviderProfile] = useState<Provider | null>(null);
  const [jobPosts, setJobPosts] = useState<JobPost[]>(INITIAL_JOBS);
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<string>("c1");
  const [chatInput, setChatInput] = useState<string>("");
  
  // Job Board Posting state
  const [newJobForm, setNewJobForm] = useState({
    title: "",
    category: "Reformas",
    description: "",
    budget: 300,
    timeline: "Até 5 dias"
  });
  const [isPostingJob, setIsPostingJob] = useState(false);

  // Service Contracting State
  const [selectedProviderForContract, setSelectedProviderForContract] = useState<Provider | null>(null);
  const [contractDetails, setContractDetails] = useState({
    description: "",
    hoursEstimated: 4,
    dateScheduled: "2026-07-20",
    paymentMethod: "credit_card"
  });
  const [contractStep, setContractStep] = useState<"details" | "checkout" | "success">("details");
  const [contracts, setContracts] = useState<Contract[]>(INITIAL_CONTRACTS);

  // Disputes & Verification states (Admin)
  const [disputes, setDisputes] = useState<Dispute[]>(INITIAL_DISPUTES);
  const [pendingApprovals, setPendingApprovals] = useState<Provider[]>([
    {
      id: "p-pending-1",
      name: "Guilherme de Castro",
      category: "Assistência Técnica",
      title: "Técnico Especialista de Ar Condicionado",
      rating: 0,
      reviewsCount: 0,
      completedJobs: 0,
      hourlyRate: 90,
      location: "Santos, SP",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
      verified: false,
      skills: ["Split Inverter", "Higienização Química", "Carga de Gás", "Cálculo de BTUs"],
      bio: "Instalação e conserto de condicionadores de ar residenciais e comerciais de todas as marcas com laudo técnico e limpeza profunda anti-bactericida.",
      reviews: [],
      portfolio: []
    }
  ]);

  // Notifications alerts
  const [notifications, setNotifications] = useState<string[]>([
    "Sua proposta de 'Instalação de Lustres' foi aceita pelo especialista Carlos Eduardo.",
    "O pagamento em garantia (Escrow) de R$ 1.500,00 foi depositado e está protegido pelo ServiçoJá."
  ]);

  // Category labels
  const categories = ["Todos", "Tecnologia", "Reformas", "Design & Multimídia", "Assistência Técnica"];

  // Start a direct chat with a professional
  const handleStartDirectChat = (provider: Provider) => {
    // Check if chat already exists
    const existingChat = chats.find(c => c.providerId === provider.id);
    if (existingChat) {
      setActiveChatId(existingChat.id);
    } else {
      const newChatId = `chat-${Date.now()}`;
      const newChat: Chat = {
        id: newChatId,
        providerId: provider.id,
        providerName: provider.name,
        providerAvatar: provider.avatar,
        providerTitle: provider.title,
        messages: [
          {
            id: `m-${Date.now()}`,
            sender: "provider",
            text: `Olá! Vi que você abriu meu perfil de ${provider.category}. Tem algum projeto ou dúvida em que eu possa te ajudar agora?`,
            timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
          }
        ],
        unread: false
      };
      setChats([newChat, ...chats]);
      setActiveChatId(newChatId);
    }
    setActiveTab("chat");
    setSelectedProviderProfile(null); // Close profile modal
  };

  // Post a Job and schedule automatic bidding responses
  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobForm.title || !newJobForm.description) return;

    setIsPostingJob(true);

    const newJob: JobPost = {
      id: `job-${Math.floor(200 + Math.random() * 800)}`,
      title: newJobForm.title,
      category: newJobForm.category,
      description: newJobForm.description,
      budget: Number(newJobForm.budget),
      timeline: newJobForm.timeline,
      datePosted: "Hoje",
      status: "open",
      bids: []
    };

    // Pre-insert a bid from a relevant provider after 1.5 seconds, then another one after 3 seconds
    setJobPosts([newJob, ...jobPosts]);
    
    setNotifications([
      `Seu Job '${newJobForm.title}' foi publicado com sucesso! Aguarde os orçamentos dos nossos prestadores certificados.`,
      ...notifications
    ]);

    // Reset Form
    setNewJobForm({
      title: "",
      category: "Reformas",
      description: "",
      budget: 300,
      timeline: "Até 5 dias"
    });

    setIsPostingJob(false);

    // Simulated Bidding Timeout 1: First specialist
    setTimeout(() => {
      // Find candidate from INITIAL_PROVIDERS in matching category
      const candidate = INITIAL_PROVIDERS.find(p => p.category === newJob.category) || INITIAL_PROVIDERS[0];
      const discount = Math.round(newJob.budget * 0.1);
      const bidAmount = Math.max(100, newJob.budget - discount);
      
      const bidMessage = newJob.category === "Reformas" 
        ? `Olá! Sou especialista em reformas e vi seu pedido para '${newJob.title}'. Consigo atender esta demanda com total segurança técnica e ferramentas profissionais. Meu orçamento fechado inclui todos os testes necessários e dou garantia por escrito.`
        : newJob.category === "Tecnologia"
        ? `Olá! Sou desenvolvedora com experiência em projetos similares a '${newJob.title}'. Posso codificar essa solução de forma ultra responsiva, rápida e limpa usando React e Tailwind. Podemos iniciar esta semana!`
        : newJob.category === "Design & Multimídia"
        ? `Olá! Excelente proposta. Posso criar o conceito visual para '${newJob.title}' seguindo uma identidade minimalista e premium. Enviarei 3 alternativas de rascunhos vetorizados em alta fidelidade.`
        : `Olá! Vi seu anúncio para '${newJob.title}'. Tenho ferramentas de precisão e ampla experiência com esse tipo de manutenção. Consigo agendar a entrega rápida e cobro um preço justo.`;

      const firstBid: Bid = {
        id: `bid-${Date.now()}-1`,
        providerId: candidate.id,
        providerName: candidate.name,
        providerAvatar: candidate.avatar,
        amount: bidAmount,
        daysToComplete: Math.floor(2 + Math.random() * 4),
        message: bidMessage,
        rating: candidate.rating
      };

      setJobPosts(currentJobs => currentJobs.map(j => {
        if (j.id === newJob.id) {
          return { ...j, bids: [firstBid, ...j.bids] };
        }
        return j;
      }));

      setNotifications(prev => [
        `Novo orçamento recebido! ${candidate.name} enviou uma proposta de R$ ${bidAmount} para o seu Job '${newJob.title}'.`,
        ...prev
      ]);
    }, 2000);

    // Simulated Bidding Timeout 2: Second specialist as competitor (slightly different price)
    setTimeout(() => {
      // Find a different candidate from providers
      const candidates = INITIAL_PROVIDERS.filter(p => p.category === newJob.category);
      const candidate = candidates.length > 1 ? candidates[1] : INITIAL_PROVIDERS[1];
      const premiumAmount = Math.round(newJob.budget * 1.05);

      const bidMessage = `Olá! Sou ${candidate.name} (${candidate.title}) e tenho interesse no seu projeto '${newJob.title}'. Ofereço um serviço de padrão superior, materiais premium inclusos e suporte vitalício pós-entrega. Vamos conversar via chat para refinar os detalhes?`;

      const secondBid: Bid = {
        id: `bid-${Date.now()}-2`,
        providerId: candidate.id,
        providerName: candidate.name,
        providerAvatar: candidate.avatar,
        amount: premiumAmount,
        daysToComplete: Math.floor(1 + Math.random() * 2),
        message: bidMessage,
        rating: candidate.rating
      };

      setJobPosts(currentJobs => currentJobs.map(j => {
        if (j.id === newJob.id) {
          return { ...j, bids: [...j.bids, secondBid] };
        }
        return j;
      }));

      setNotifications(prev => [
        `Novo orçamento concorrente! ${candidate.name} propôs R$ ${premiumAmount} para o seu Job '${newJob.title}'.`,
        ...prev
      ]);
    }, 4500);
  };

  // Accept a bid from Job board and convert it to contract checkout
  const handleAcceptBid = (job: JobPost, bid: Bid) => {
    const providerObj = providers.find(p => p.id === bid.providerId) || {
      id: bid.providerId,
      name: bid.providerName,
      avatar: bid.providerAvatar,
      category: job.category,
      title: "Prestador sob Orçamento",
      rating: bid.rating,
      reviewsCount: 20,
      completedJobs: 45,
      hourlyRate: Math.round(bid.amount / 4),
      location: "São Paulo, SP",
      verified: true,
      skills: [],
      bio: "",
      reviews: [],
      portfolio: []
    };

    setSelectedProviderForContract(providerObj as Provider);
    setContractStep("details");
    setContractDetails({
      description: `Contratação de orçamento para o Job '${job.title}'. Proposta aceita: "${bid.message}"`,
      hoursEstimated: 4, // Multiplier for layout display matching
      dateScheduled: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
      paymentMethod: "credit_card"
    });
  };

  // Send a Chat Message and trigger realistic responsive replies from providers
  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;

    const activeChat = chats.find(c => c.id === activeChatId);
    if (!activeChat) return;

    const userMessage: Message = {
      id: `m-user-${Date.now()}`,
      sender: "client",
      text: chatInput,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    };

    const updatedChats = chats.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          messages: [...c.messages, userMessage]
        };
      }
      return c;
    });

    setChats(updatedChats);
    const sentText = chatInput;
    setChatInput("");

    // Provider Auto-reply logic with tailored response
    setTimeout(() => {
      const providerReplies: Record<string, string[]> = {
        p1: [
          "Perfeito! Consigo agendar para quinta-feira pela manhã sim. Vou levar meu multímetro profissional e fiação antichama reforçada de cobre. Posso lançar os materiais adicionais no recibo do ServiçoJá?",
          "Com certeza. Eu sempre sigo as normas da NBR 5410 para segurança máxima do local. Você prefere tomadas brancas clássicas ou pretas fosco para combinar com o granito?",
          "Entendido! O escrow protege nós dois, então você pode fazer o depósito de segurança tranquilo. Assim que aprovado pelo app, estarei na sua residência no horário combinado."
        ],
        p2: [
          "Oi! Sim, com certeza. Eu já usei as melhores práticas de hooks e Clean Architecture para Next.js nesse tipo de integração. O que acha de fazermos uma chamada de 10 minutos para desenhar o fluxo?",
          "Excelente! Consigo estruturar essa responsividade com Tailwind CSS de forma extremamente leve e rápida. Você já tem o design pronto no Figma ou quer que eu crie?",
          "Fechado. Se você depositar o escrow, eu já consigo criar o repositório no GitHub ainda hoje e te dou acesso para você acompanhar o progresso dos commits!"
        ],
        p3: [
          "Olá! Entendi perfeitamente o briefing. Busco sempre criar designs corporativos que passem muita credibilidade e modernidade. Vou preparar 3 opções de logos elegantes para começarmos.",
          "Perfeito! Vou selecionar uma paleta de cores pantone que transmita essa essência artesanal e premium do grão. Na terça-feira já te mando os primeiros rascunhos vetorizados.",
          "Combinado! Assim que o depósito em garantia for registrado pelo app, já coloco a mão na massa no Adobe Illustrator."
        ]
      };

      const replies = providerReplies[activeChat.providerId] || [
        "Olá! Entendi perfeitamente as especificações do seu projeto. Vou analisar todos os detalhes com muito critério e te dou retorno sobre o agendamento em instantes.",
        "Excelente! Pode contar comigo para realizar esse serviço com padrão de excelência profissional e segurança pelo escrow do app.",
        "Perfeito. Vamos manter contato por aqui. Assim que você fizer o depósito em garantia eu reservo a data na minha agenda profissional!"
      ];

      // Select a reply based on keywords or random
      let replyText = replies[0];
      if (sentText.toLowerCase().includes("valor") || sentText.toLowerCase().includes("preço") || sentText.toLowerCase().includes("orçamento") || sentText.toLowerCase().includes("escrow") || sentText.toLowerCase().includes("pagar")) {
        replyText = replies[2];
      } else if (sentText.toLowerCase().includes("quinta") || sentText.toLowerCase().includes("sábado") || sentText.toLowerCase().includes("horário") || sentText.toLowerCase().includes("quando") || sentText.toLowerCase().includes("dia")) {
        replyText = replies[0];
      } else {
        replyText = replies[Math.floor(Math.random() * replies.length)];
      }

      const providerReply: Message = {
        id: `m-provider-${Date.now()}`,
        sender: "provider",
        text: replyText,
        timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      };

      setChats(currentChats => currentChats.map(c => {
        if (c.id === activeChatId) {
          return {
            ...c,
            messages: [...c.messages, providerReply],
            unread: false
          };
        }
        return c;
      }));
    }, 1500);
  };

  // Search filter implementation
  const filteredProviders = providers.filter(p => {
    const matchesCategory = selectedCategory === "Todos" || p.category === selectedCategory;
    const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  // Handle Contracting Checkout Submit (Simulated Escrow Payment)
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProviderForContract) return;

    const finalPrice = selectedProviderForContract.hourlyRate * contractDetails.hoursEstimated;
    const newContract: Contract = {
      id: `c-${Math.floor(1000 + Math.random() * 9000)}`,
      providerName: selectedProviderForContract.name,
      providerAvatar: selectedProviderForContract.avatar,
      serviceTitle: selectedProviderForContract.title,
      price: finalPrice,
      date: new Date(contractDetails.dateScheduled).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }),
      status: "pending",
      description: contractDetails.description || "Contratação direta via catálogo de profissionais especializados."
    };

    setContracts([newContract, ...contracts]);
    setNotifications([
      `Você depositou R$ ${finalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} em garantia para o serviço com ${selectedProviderForContract.name}. O saldo está retido de forma segura!`,
      ...notifications
    ]);
    setContractStep("success");
  };

  // Change status of contract (Client or Provider action)
  const updateContractStatus = (contractId: string, newStatus: Contract["status"]) => {
    setContracts(contracts.map(c => {
      if (c.id === contractId) {
        let msg = "";
        if (newStatus === "in_progress") msg = `O serviço '${c.serviceTitle}' foi iniciado pelo profissional.`;
        if (newStatus === "review") msg = `O profissional declarou o serviço '${c.serviceTitle}' como finalizado. Revise e libere o pagamento!`;
        if (newStatus === "completed") msg = `Sucesso! O pagamento de R$ ${c.price} foi liberado de forma segura para o profissional.`;
        if (newStatus === "disputed") msg = `Uma mediação/disputa foi aberta para o contrato '${c.serviceTitle}'. Nossa equipe jurídica mediará o reembolso.`;
        
        setNotifications([msg, ...notifications]);
        return { ...c, status: newStatus };
      }
      return c;
    }));
  };

  // Resolve Dispute (Admin Action)
  const handleResolveDispute = (disputeId: string, resolution: "refund" | "release") => {
    const dispute = disputes.find(d => d.id === disputeId);
    if (!dispute) return;

    setContracts(contracts.map(c => {
      if (c.id === dispute.contractId) {
        return { ...c, status: resolution === "refund" ? "pending" : "completed" }; // returns to safe escrow refund or releases
      }
      return c;
    }));

    setDisputes(disputes.map(d => {
      if (d.id === disputeId) {
        return { ...d, status: resolution === "refund" ? "resolved_refunded" : "resolved_released" };
      }
      return d;
    }));

    const alertMsg = resolution === "refund" 
      ? `Disputa ${disputeId} resolvida pelo administrador: R$ ${dispute.amount} REEMBOLSADOS integralmente ao cliente.`
      : `Disputa ${disputeId} resolvida pelo administrador: R$ ${dispute.amount} LIBERADOS de forma segura para o prestador.`;

    setNotifications([alertMsg, ...notifications]);
  };

  // Approve new provider (Admin Action)
  const handleApproveProvider = (provider: Provider) => {
    setProviders([...providers, { ...provider, verified: true }]);
    setPendingApprovals(pendingApprovals.filter(p => p.id !== provider.id));
    setNotifications([
      `Profissional '${provider.name}' foi verificado e aprovado com sucesso no ecossistema de marketplace!`,
      ...notifications
    ]);
  };

  // Reject new provider (Admin Action)
  const handleRejectProvider = (providerId: string) => {
    setPendingApprovals(pendingApprovals.filter(p => p.id !== providerId));
    setNotifications([
      `O cadastro do profissional foi recusado devido à falta de documentos civis obrigatórios.`,
      ...notifications
    ]);
  };

  return (
    <div className="relative min-h-screen bg-stone-50 text-stone-900 font-sans antialiased">
      
      {/* Platform Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm px-4 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Brand + Navigation back to portfolio */}
          <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-start">
            <button 
              onClick={onBack}
              className="px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 hover:text-stone-950 text-xs font-mono tracking-wide uppercase transition flex items-center space-x-1.5 cursor-pointer"
              id="back-to-portfolio-btn"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Voltar ao Portfólio</span>
            </button>

            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center shadow-md">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <span className="font-serif font-black text-sm tracking-tight block text-indigo-900 uppercase">ServiçoJá</span>
                <span className="font-mono text-[8px] text-emerald-600 font-bold tracking-wider block">CONEXÃO CONFIÁVEL & GARANTIDA</span>
              </div>
            </div>
          </div>

          {/* Hub Navigation Tabs */}
          <nav className="flex items-center space-x-1 bg-stone-100 p-1 rounded-xl border border-stone-200/60 w-full sm:w-auto justify-center flex-wrap gap-1 sm:gap-0">
            <button
              onClick={() => setActiveTab("marketplace")}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${activeTab === "marketplace" ? "bg-white text-indigo-900 shadow-sm" : "text-stone-500 hover:text-stone-900"}`}
              id="tab-client-market"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Profissionais</span>
            </button>
            <button
              onClick={() => setActiveTab("job_board")}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${activeTab === "job_board" ? "bg-white text-indigo-900 shadow-sm" : "text-stone-500 hover:text-stone-900"}`}
              id="tab-job-board"
            >
              <ClipboardList className="h-3.5 w-3.5" />
              <span>Mural de Jobs</span>
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer relative ${activeTab === "chat" ? "bg-white text-indigo-900 shadow-sm" : "text-stone-500 hover:text-stone-900"}`}
              id="tab-chat"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Mensagens</span>
              {chats.some(c => c.unread) && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-stone-100 animate-pulse" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("provider_dashboard")}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${activeTab === "provider_dashboard" ? "bg-white text-indigo-900 shadow-sm" : "text-stone-500 hover:text-stone-900"}`}
              id="tab-provider-dash"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>Meu Painel (Prestador)</span>
            </button>
            <button
              onClick={() => setActiveTab("admin_panel")}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${activeTab === "admin_panel" ? "bg-white text-indigo-900 shadow-sm" : "text-stone-500 hover:text-stone-900"}`}
              id="tab-admin-panel"
            >
              <Settings className="h-3.5 w-3.5" />
              <span>Administração</span>
            </button>
          </nav>

          {/* Right Status Banner (Protected Escrow Model indicator) */}
          <div className="hidden lg:flex items-center space-x-2 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-xl">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span className="font-mono text-[9px] text-emerald-800 font-bold uppercase tracking-wide">
              Pagamento em Escrow Ativo
            </span>
          </div>

        </div>
      </header>

      {/* Main Prototype Body */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        
        {/* Dynamic platform notification banner */}
        {notifications.length > 0 && (
          <div className="mb-8 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-left flex items-start space-x-3 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600" />
            <Bell className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5 animate-bounce" />
            <div className="flex-1 min-w-0">
              <span className="font-mono text-[9px] text-indigo-500 font-bold uppercase tracking-wider block mb-0.5">Última Notificação do Sistema</span>
              <p className="text-stone-700 text-xs leading-relaxed">{notifications[0]}</p>
            </div>
            <button 
              onClick={() => setNotifications(notifications.slice(1))}
              className="text-stone-400 hover:text-stone-600 font-mono text-[10px] uppercase font-bold"
            >
              Limpar
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {/* TAB 1: CLIENT MARKETPLACE CATALOGUE */}
          {activeTab === "marketplace" && (
            <motion.div
              key="marketplace-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 text-left"
            >
              {/* Platform Concept Intro Banner */}
              <div className="relative bg-gradient-to-r from-[#0B1E36] via-[#15325B] to-[#0D2442] rounded-3xl p-8 text-white overflow-hidden shadow-xl border border-[#C5A059]/20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
                
                <div className="max-w-2xl relative z-10 space-y-4">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-extrabold">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Plataforma Auditada com Garantia de Serviço</span>
                  </div>

                  <h1 className="font-serif text-3xl md:text-4xl font-black text-white leading-tight">
                    Contrate profissionais certificados com <span className="text-[#C5A059]">Escrow 100% Protegido</span>
                  </h1>

                  <p className="font-sans text-xs md:text-sm text-stone-300 leading-relaxed max-w-xl">
                    Seu dinheiro não vai direto para o profissional. Nosso sistema de custódia (escrow) segura o valor e só o libera após você revisar e aprovar o serviço finalizado. Sem riscos, sem golpes, sem dores de cabeça.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2 font-mono text-[10px] text-stone-300 uppercase font-bold">
                    <div className="flex items-center space-x-1.5">
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>Profissionais Verificados</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>Mediação de Disputas Ativa</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span>Nota Fiscal Automatizada</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Interactive Search & Filter Controls */}
              <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  
                  {/* Search bar */}
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-3.5 h-4 w-4 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Pesquise por serviço ou habilidade (ex: Eletricista, React, Pintor, Troca de Tela...)"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 focus:border-indigo-500 rounded-xl text-sm focus:outline-none focus:bg-white transition-all font-sans text-stone-800"
                    />
                  </div>

                  {/* Filter indicators */}
                  <div className="flex items-center space-x-1.5 border border-stone-200 bg-stone-50/50 p-1.5 rounded-xl w-full md:w-auto overflow-x-auto whitespace-nowrap">
                    <Filter className="h-3.5 w-3.5 text-stone-400 mx-2" />
                    {categories.map((cat, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${selectedCategory === cat ? "bg-indigo-600 text-white shadow-sm" : "text-stone-600 hover:bg-stone-200/50"}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                </div>

                {/* Listing volume counter */}
                <div className="flex justify-between items-center text-xs font-mono text-stone-500 uppercase tracking-wider font-bold">
                  <span>Listando {filteredProviders.length} profissionais disponíveis agora</span>
                  {selectedCategory !== "Todos" && (
                    <button 
                      onClick={() => setSelectedCategory("Todos")}
                      className="text-indigo-600 hover:underline"
                    >
                      Limpar filtro de categoria
                    </button>
                  )}
                </div>
              </div>

              {/* Providers Grid Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredProviders.map(p => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      whileHover={{ y: -6, boxShadow: "0 12px 20px -8px rgba(0,0,0,0.15)" }}
                      className="bg-white rounded-2xl border border-stone-200/80 p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group"
                    >
                      <div className="space-y-4">
                        
                        {/* Provider Header Details */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3.5">
                            <div className="relative">
                              <img 
                                src={p.avatar} 
                                alt={p.name} 
                                className="w-12 h-12 rounded-xl object-cover border border-stone-100"
                                referrerPolicy="no-referrer"
                              />
                              {p.verified && (
                                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full border-2 border-white shadow-sm">
                                  <ShieldCheck className="h-3 w-3" />
                                </div>
                              )}
                            </div>
                            <div className="text-left">
                              <h3 className="font-serif font-black text-stone-900 text-sm group-hover:text-indigo-900 transition-colors">
                                {p.name}
                              </h3>
                              <p className="font-mono text-[9px] text-stone-400 uppercase tracking-wider font-bold">
                                {p.location}
                              </p>
                            </div>
                          </div>

                          {/* Hourly Rate block */}
                          <div className="text-right">
                            <span className="font-sans font-black text-indigo-600 text-sm block">
                              R$ {p.hourlyRate}
                            </span>
                            <span className="font-mono text-[8px] text-stone-400 uppercase font-bold block">
                              Por Hora / Tarefa
                            </span>
                          </div>
                        </div>

                        {/* Title & Description of Work */}
                        <div className="text-left space-y-1.5">
                          <span className="px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100/50 text-indigo-600 font-mono text-[8px] font-extrabold uppercase tracking-wide inline-block">
                            {p.category}
                          </span>
                          <h4 className="font-serif font-bold text-stone-800 text-sm leading-tight">
                            {p.title}
                          </h4>
                          <p className="text-stone-500 font-sans text-xs leading-relaxed line-clamp-3">
                            {p.bio}
                          </p>
                        </div>

                        {/* Star Rating HUD */}
                        <div className="flex items-center justify-between bg-stone-50 p-2 rounded-xl border border-stone-200/50 text-[11px] font-mono font-bold text-stone-600 uppercase">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                            <span>{p.rating.toFixed(1)}</span>
                            <span className="text-stone-400 font-normal">({p.reviewsCount} avaliações)</span>
                          </div>
                          <div className="text-stone-500">
                            <strong>{p.completedJobs}</strong> serviços
                          </div>
                        </div>

                        {/* Core Skills chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {p.skills.slice(0, 3).map((s, idx) => (
                            <span key={idx} className="bg-stone-100 hover:bg-stone-200 text-stone-600 font-sans text-[10px] px-2.5 py-0.5 rounded-md border border-stone-200/50">
                              {s}
                            </span>
                          ))}
                          {p.skills.length > 3 && (
                            <span className="bg-stone-100 text-stone-400 font-mono text-[9px] px-2 py-0.5 rounded-md font-bold">
                              +{p.skills.length - 3}
                            </span>
                          )}
                        </div>

                      </div>

                      {/* Action trigger checkout */}
                      <div className="pt-4 border-t border-stone-100 mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <button
                          onClick={() => setSelectedProviderProfile(p)}
                          className="px-3 py-1.5 border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-xl text-[11px] font-bold uppercase transition flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <User className="h-3.5 w-3.5" />
                          <span>Ver Perfil & Avaliações</span>
                        </button>
                        
                        <motion.button
                          onClick={() => {
                            setSelectedProviderForContract(p);
                            setContractStep("details");
                            setContractDetails({
                              description: `Gostaria de contratar os serviços de ${p.title} para sanar demandas específicas residenciais/corporativas de forma ágil e segura.`,
                              hoursEstimated: 4,
                              dateScheduled: "2026-07-20",
                              paymentMethod: "credit_card"
                            });
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                        >
                          <span>Contratar</span>
                          <ShieldCheck className="h-3.5 w-3.5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Secure Escrow Step-by-Step Info Section */}
              <div className="bg-white rounded-3xl border border-stone-200/80 p-8 shadow-sm">
                <div className="max-w-xl text-left mb-8">
                  <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-widest block mb-1">PROCESSO TRILATERAL</span>
                  <h3 className="font-serif font-black text-2xl text-stone-900">Como funciona o sistema de garantia ServiçoJá?</h3>
                  <p className="text-stone-500 font-sans text-xs sm:text-sm mt-1">
                    Nós eliminamos completamente o receio de calotes, abandono de obras ou atrasos inexplicáveis de ambas as partes.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="space-y-3 p-5 bg-stone-50 rounded-2xl border border-stone-200/50">
                    <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-serif font-black text-lg">
                      1
                    </div>
                    <h4 className="font-serif font-bold text-stone-800 text-sm">Contratação & Depósito</h4>
                    <p className="text-stone-500 font-sans text-xs leading-relaxed">
                      Você acerta os termos com o especialista e efetua o pagamento. O valor é depositado em nossa conta de custódia (escrow) segura, sinalizando liquidez.
                    </p>
                  </div>

                  <div className="space-y-3 p-5 bg-stone-50 rounded-2xl border border-stone-200/50">
                    <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-serif font-black text-lg">
                      2
                    </div>
                    <h4 className="font-serif font-bold text-stone-800 text-sm">Execução & Verificação</h4>
                    <p className="text-stone-500 font-sans text-xs leading-relaxed">
                      O profissional trabalha tranquilo sabendo que o dinheiro já está garantido. Ele conclui a tarefa e anexa fotos ou relatório de entrega na plataforma.
                    </p>
                  </div>

                  <div className="space-y-3 p-5 bg-stone-50 rounded-2xl border border-stone-200/50">
                    <div className="h-10 w-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-serif font-black text-lg">
                      3
                    </div>
                    <h4 className="font-serif font-bold text-stone-800 text-sm">Liberação ou Disputa</h4>
                    <p className="text-stone-500 font-sans text-xs leading-relaxed">
                      Você confere o resultado. Se estiver correto, libera o pagamento com 1 clique. Se houver defeitos, abre uma mediação e nosso suporte arbitra o reembolso.
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 2: BIDIRECTIONAL JOB BOARD & ORÇAMENTOS */}
          {activeTab === "job_board" && (
            <motion.div
              key="job-board-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 text-left"
            >
              {/* Concept introduction */}
              <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl" />
                <div className="relative z-10 max-w-3xl space-y-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-[9px] uppercase tracking-wider font-extrabold">
                    Modelo Bidirecional Ativo
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black">
                    Não procure profissionais, <span className="text-[#C5A059]">receba propostas</span> na hora!
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Poste sua necessidade ou projeto abaixo de forma totalmente gratuita. Nossa inteligência notifica instantaneamente os especialistas certificados da categoria selecionada, que enviarão propostas com orçamentos fechados para você analisar, negociar via chat ou fechar direto via escrow seguro.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left side: Post a Job Form */}
                <div className="lg:col-span-5 bg-white border border-stone-200/80 rounded-3xl p-6 shadow-sm h-fit space-y-6">
                  <div className="border-b border-stone-100 pb-3">
                    <span className="font-mono text-[9px] text-indigo-600 font-bold uppercase tracking-wider block">QUERO RECEBER ORÇAMENTOS</span>
                    <h3 className="font-serif font-black text-lg text-stone-900">Anunciar Nova Demanda</h3>
                  </div>

                  <form onSubmit={handlePostJob} className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-mono font-bold text-stone-600 uppercase">Título do Serviço</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Instalação de Tomadas e Chuveiro na Lavanderia"
                        value={newJobForm.title}
                        onChange={e => setNewJobForm({ ...newJobForm, title: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500 text-stone-800 font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono font-bold text-stone-600 uppercase">Categoria</label>
                      <select
                        value={newJobForm.category}
                        onChange={e => setNewJobForm({ ...newJobForm, category: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500 text-stone-700 font-sans cursor-pointer"
                      >
                        <option value="Reformas">Reformas (Elétrica, Pintura, Hidráulica)</option>
                        <option value="Tecnologia">Tecnologia (Desenvolvimento, Sistemas, APIs)</option>
                        <option value="Design & Multimídia">Design & Multimídia (Logo, Identidade Visual)</option>
                        <option value="Assistência Técnica">Assistência Técnica (Celular, Notebook, Ar Condicionado)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono font-bold text-stone-600 uppercase">Orçamento Máximo Previsto (R$)</label>
                      <input
                        type="number"
                        min="50"
                        required
                        placeholder="Ex: 500"
                        value={newJobForm.budget}
                        onChange={e => setNewJobForm({ ...newJobForm, budget: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500 text-stone-800 font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono font-bold text-stone-600 uppercase">Prazo de Entrega Desejado</label>
                      <select
                        value={newJobForm.timeline}
                        onChange={e => setNewJobForm({ ...newJobForm, timeline: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500 text-stone-700 font-sans cursor-pointer"
                      >
                        <option value="Até 3 dias">Até 3 dias (Urgente)</option>
                        <option value="Até 5 dias">Até 5 dias</option>
                        <option value="Até 10 dias">Até 10 dias</option>
                        <option value="Até 30 dias">Até 30 dias</option>
                        <option value="A combinar">A combinar com o prestador</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono font-bold text-stone-600 uppercase">Descrição Detalhada do Trabalho</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Descreva exatamente o que precisa ser feito, quais os materiais disponíveis, os desafios do local, etc. Quanto mais detalhado, melhores serão os orçamentos recebidos!"
                        value={newJobForm.description}
                        onChange={e => setNewJobForm({ ...newJobForm, description: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500 text-stone-800 font-sans leading-relaxed"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isPostingJob}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-stone-300 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>{isPostingJob ? "Publicando..." : "Publicar Projeto Grátis"}</span>
                    </motion.button>
                  </form>
                </div>

                {/* Right side: Active Jobs & incoming Bids */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="border-b border-stone-200 pb-3">
                    <span className="font-mono text-[9px] text-stone-400 font-bold uppercase tracking-wider block">CONVITES ATIVOS & NEGOCIAÇÕES</span>
                    <h3 className="font-serif font-black text-lg text-stone-900">Seus Projetos no Mural</h3>
                  </div>

                  {jobPosts.length === 0 ? (
                    <div className="bg-white border border-stone-200/80 rounded-3xl p-12 text-center shadow-sm">
                      <ClipboardList className="h-10 w-10 text-stone-300 mx-auto mb-3" />
                      <h4 className="font-serif font-bold text-stone-800 text-sm">Nenhum projeto anunciado ainda</h4>
                      <p className="text-stone-500 text-xs font-sans max-w-sm mx-auto mt-1">Use o formulário ao lado para anunciar sua necessidade e receba orçamentos competitivos na hora!</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {jobPosts.map(job => (
                        <div key={job.id} className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm relative overflow-hidden text-left">
                          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-600" />
                          
                          {/* Job Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-600 font-mono text-[8px] font-bold uppercase tracking-wide">
                                  {job.category}
                                </span>
                                <span className="flex items-center space-x-1 font-mono text-[8px] text-emerald-600 font-bold uppercase">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                                  <span>Recebendo Propostas</span>
                                </span>
                              </div>
                              <h4 className="font-serif font-black text-stone-900 text-base">{job.title}</h4>
                            </div>

                            <div className="text-left sm:text-right">
                              <span className="text-[8px] font-mono text-stone-400 block font-bold uppercase">ORÇAMENTO ESTIMADO</span>
                              <span className="font-sans font-black text-indigo-600 text-sm">R$ {job.budget.toLocaleString("pt-BR")}</span>
                            </div>
                          </div>

                          {/* Job description */}
                          <p className="text-stone-600 font-sans text-xs leading-relaxed">{job.description}</p>
                          
                          {/* Meta line */}
                          <div className="flex items-center space-x-4 text-[10px] font-mono text-stone-400 font-bold uppercase">
                            <span>Postado: {job.datePosted}</span>
                            <span>•</span>
                            <span>Prazo: {job.timeline}</span>
                          </div>

                          {/* BIDS HUB SUBSECTION */}
                          <div className="pt-4 border-t border-stone-100 space-y-3">
                            <h5 className="font-serif font-bold text-xs text-stone-800 flex items-center space-x-1.5">
                              <MessageSquare className="h-3.5 w-3.5 text-indigo-600" />
                              <span>Orçamentos de Profissionais ({job.bids.length})</span>
                            </h5>

                            {job.bids.length === 0 ? (
                              <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-200/50">
                                <span className="inline-block h-2 w-2 rounded-full bg-indigo-600 animate-ping mr-2" />
                                <span className="text-[10px] font-mono text-stone-500 font-bold uppercase">Nossos profissionais qualificados estão analisando seu projeto...</span>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {job.bids.map(bid => (
                                  <div key={bid.id} className="p-4 bg-stone-50/50 border border-stone-200 rounded-xl space-y-3 text-left">
                                    {/* Bidder metadata */}
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                      <div className="flex items-center space-x-2.5">
                                        <img src={bid.providerAvatar} alt={bid.providerName} className="w-8 h-8 rounded-lg object-cover" />
                                        <div>
                                          <h6 className="font-serif font-bold text-stone-900 text-xs">{bid.providerName}</h6>
                                          <div className="flex items-center space-x-1 text-[9px] font-mono text-amber-600 font-bold">
                                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                                            <span>{bid.rating.toFixed(1)}</span>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex items-center space-x-4">
                                        <div className="text-right">
                                          <span className="text-[8px] font-mono text-stone-400 block uppercase">VALOR OFERECIDO</span>
                                          <span className="font-sans font-black text-emerald-600 text-xs">R$ {bid.amount.toLocaleString("pt-BR")}</span>
                                        </div>
                                        <div className="text-right">
                                          <span className="text-[8px] font-mono text-stone-400 block uppercase">PRAZO DE ENTREGA</span>
                                          <span className="font-mono text-stone-700 text-xs font-bold">{bid.daysToComplete} {bid.daysToComplete === 1 ? 'Dia' : 'Dias'}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Proposal message */}
                                    <p className="bg-white px-3 py-2 rounded-lg border border-stone-200/60 text-stone-600 font-sans text-xs leading-relaxed italic">
                                      "{bid.message}"
                                    </p>

                                    {/* Accept / Chat buttons */}
                                    <div className="flex items-center justify-end space-x-2.5">
                                      <button
                                        onClick={() => {
                                          const provider = INITIAL_PROVIDERS.find(p => p.id === bid.providerId);
                                          if (provider) handleStartDirectChat(provider);
                                        }}
                                        className="px-3 py-1.5 border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-lg text-[10px] font-bold uppercase transition flex items-center space-x-1 cursor-pointer"
                                      >
                                        <MessageSquare className="h-3 w-3 text-stone-500" />
                                        <span>Negociar no Chat</span>
                                      </button>

                                      <button
                                        onClick={() => handleAcceptBid(job, bid)}
                                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm flex items-center space-x-1 cursor-pointer"
                                      >
                                        <ShieldCheck className="h-3.5 w-3.5" />
                                        <span>Aceitar & Depositar Escrow</span>
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: SMART INTERACTIVE NEGOTIATION CHAT */}
          {activeTab === "chat" && (
            <motion.div
              key="chat-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 text-left"
            >
              {/* Main chat window layout */}
              <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12 h-[600px]">
                
                {/* Chat Left Sidebar: Active negotiations */}
                <div className="md:col-span-4 border-r border-stone-100 flex flex-col bg-stone-50/30">
                  <div className="p-4 border-b border-stone-100 bg-white">
                    <span className="font-mono text-[9px] text-indigo-600 font-bold uppercase tracking-wider block mb-1">MENSAGEIRO DE NEGOCIAÇÃO</span>
                    <h3 className="font-serif font-black text-base text-stone-900">Conversas Seguras</h3>
                  </div>

                  <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
                    {chats.map(chat => {
                      const isActive = chat.id === activeChatId;
                      const lastMessage = chat.messages[chat.messages.length - 1];
                      return (
                        <button
                          key={chat.id}
                          onClick={() => {
                            setActiveChatId(chat.id);
                            // Mark read
                            setChats(chats.map(c => c.id === chat.id ? { ...c, unread: false } : c));
                          }}
                          className={`w-full p-4 flex items-start space-x-3 text-left transition cursor-pointer ${isActive ? "bg-indigo-50/60 border-l-4 border-indigo-600" : "hover:bg-stone-50 bg-white"}`}
                        >
                          <div className="relative shrink-0">
                            <img src={chat.providerAvatar} alt={chat.providerName} className="w-10 h-10 rounded-xl object-cover" />
                            {chat.unread && (
                              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-serif font-bold text-xs text-stone-900 truncate">{chat.providerName}</h4>
                              <span className="font-mono text-[8px] text-stone-400 font-bold">{lastMessage ? lastMessage.timestamp : ""}</span>
                            </div>
                            <p className="font-mono text-[8px] text-stone-400 uppercase truncate mt-0.5">{chat.providerTitle}</p>
                            <p className={`font-sans text-xs mt-1 truncate ${chat.unread ? "text-stone-900 font-bold" : "text-stone-500"}`}>
                              {lastMessage ? (lastMessage.sender === "client" ? "Você: " : "") + lastMessage.text : "Nenhuma mensagem"}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Chat Right Panel: Live Conversation */}
                <div className="md:col-span-8 flex flex-col h-full justify-between bg-stone-50/40">
                  {(() => {
                    const activeChat = chats.find(c => c.id === activeChatId);
                    if (!activeChat) {
                      return (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                          <MessageSquare className="h-12 w-12 text-stone-300 mb-2 animate-pulse" />
                          <h4 className="font-serif font-bold text-stone-800 text-sm">Nenhuma conversa selecionada</h4>
                          <p className="text-stone-500 font-sans text-xs max-w-xs mt-1">Selecione um especialista na lista ao lado ou envie uma proposta direta para iniciar a negociação segura.</p>
                        </div>
                      );
                    }

                    // Get matches provider obj for verification detail
                    const matchingProvider = INITIAL_PROVIDERS.find(p => p.id === activeChat.providerId);

                    return (
                      <>
                        {/* Conversation Header */}
                        <div className="p-4 bg-white border-b border-stone-100 flex items-center justify-between shadow-sm shrink-0">
                          <div className="flex items-center space-x-3">
                            <img src={activeChat.providerAvatar} alt={activeChat.providerName} className="w-10 h-10 rounded-xl object-cover" />
                            <div className="text-left">
                              <h4 className="font-serif font-black text-stone-950 text-sm flex items-center space-x-1">
                                <span>{activeChat.providerName}</span>
                                {matchingProvider?.verified && <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 inline" />}
                              </h4>
                              <p className="font-mono text-[8px] text-stone-400 uppercase tracking-wide font-bold">{activeChat.providerTitle}</p>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            {matchingProvider && (
                              <button
                                onClick={() => setSelectedProviderProfile(matchingProvider)}
                                className="px-3 py-1.5 border border-stone-300 hover:bg-stone-50 rounded-xl text-[9px] font-mono font-bold uppercase transition cursor-pointer"
                              >
                                Ver Perfil completo
                              </button>
                            )}
                            
                            <button
                              onClick={() => {
                                const prov = matchingProvider || {
                                  id: activeChat.providerId,
                                  name: activeChat.providerName,
                                  avatar: activeChat.providerAvatar,
                                  category: "Reformas",
                                  title: activeChat.providerTitle,
                                  rating: 4.9,
                                  reviewsCount: 12,
                                  completedJobs: 24,
                                  hourlyRate: 85,
                                  location: "São Paulo, SP",
                                  verified: true,
                                  skills: [],
                                  bio: "",
                                  reviews: [],
                                  portfolio: []
                                };
                                setSelectedProviderForContract(prov as Provider);
                                setContractStep("details");
                                setContractDetails({
                                  description: `Contratação de serviços de faturamento negociada em chat reservado com ${prov.name}.`,
                                  hoursEstimated: 4,
                                  dateScheduled: "2026-07-20",
                                  paymentMethod: "credit_card"
                                });
                              }}
                              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[9px] font-mono font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center space-x-1"
                            >
                              <Lock className="h-3 w-3" />
                              <span>Contratar em Escrow</span>
                            </button>
                          </div>
                        </div>

                        {/* Message Stream */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col justify-end">
                          <div className="space-y-4 overflow-y-auto max-h-[420px] pr-1 scrollbar-thin">
                            {activeChat.messages.map(msg => {
                              const isClient = msg.sender === "client";
                              return (
                                <div key={msg.id} className={`flex ${isClient ? "justify-end" : "justify-start"} items-end space-x-2`}>
                                  {!isClient && (
                                    <img src={activeChat.providerAvatar} alt={activeChat.providerName} className="w-6 h-6 rounded-md object-cover shrink-0" />
                                  )}
                                  <div className="max-w-[70%]">
                                    <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${isClient ? "bg-indigo-600 text-white rounded-br-none" : "bg-white text-stone-800 border border-stone-200/50 rounded-bl-none shadow-sm"}`}>
                                      <p>{msg.text}</p>
                                    </div>
                                    <span className="font-mono text-[8px] text-stone-400 mt-1 block px-1 text-right">
                                      {msg.timestamp}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Simulated input console */}
                        <div className="p-4 bg-white border-t border-stone-100 flex items-center space-x-3 shrink-0">
                          <button className="p-2 text-stone-400 hover:text-stone-600 transition hover:bg-stone-50 rounded-xl" title="Anexar arquivos de faturamento ou fotos">
                            <Paperclip className="h-4 w-4" />
                          </button>
                          
                          <input
                            type="text"
                            placeholder={`Escreva uma mensagem para ${activeChat.providerName}...`}
                            value={chatInput}
                            onChange={e => setChatInput(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === "Enter") handleSendChatMessage();
                            }}
                            className="flex-1 px-4 py-2 bg-stone-50 focus:bg-white border border-stone-200 focus:border-indigo-500 rounded-xl text-xs focus:outline-none transition-all text-stone-800 font-sans"
                          />

                          <button
                            onClick={handleSendChatMessage}
                            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition shadow-md cursor-pointer flex items-center justify-center"
                          >
                            <Send className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Chat info disclaimer */}
              <div className="bg-amber-50/50 border border-amber-200/60 p-4 rounded-2xl flex items-start space-x-2.5">
                <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-800 font-sans leading-relaxed">
                  <strong>Regra de Segurança:</strong> Nunca envie transferências PIX ou pagamentos diretos por fora da plataforma. Ao contratar utilizando o botão <strong>Contratar em Escrow</strong> no topo do chat, seu saldo fica retido em garantia juridicamente segura e o prestador só recebe após você atestar o perfeito funcionamento do serviço finalizado.
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 4: PROVIDER ACTIVE CONTRACTS & FINANCIAL PORTAL */}
          {activeTab === "provider_dashboard" && (
            <motion.div
              key="provider-dashboard-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 text-left"
            >
              
              {/* Financial Summary Widget Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Total Balance Available for withdrawal */}
                <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm flex items-center space-x-4">
                  <div className="p-3.5 bg-emerald-100 text-emerald-700 rounded-2xl">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-stone-400 uppercase font-bold block">Saldo Disponível</span>
                    <h3 className="font-serif font-black text-xl text-stone-900">R$ 1.800,00</h3>
                    <span className="text-emerald-600 font-mono text-[8px] font-bold block uppercase">Pronto para Transferência PIX</span>
                  </div>
                </div>

                {/* Retained in Escrow (Secure protection balance) */}
                <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm flex items-center space-x-4">
                  <div className="p-3.5 bg-indigo-100 text-indigo-700 rounded-2xl">
                    <Lock className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-stone-400 uppercase font-bold block">Retido em Custódia</span>
                    <h3 className="font-serif font-black text-xl text-indigo-900">R$ 1.840,00</h3>
                    <span className="text-stone-500 font-mono text-[8px] block uppercase">Aguardando Aval do Cliente</span>
                  </div>
                </div>

                {/* Growth indicator stats */}
                <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm flex items-center space-x-4">
                  <div className="p-3.5 bg-amber-100 text-amber-700 rounded-2xl">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-stone-400 uppercase font-bold block">Faturamento Mensal</span>
                    <h3 className="font-serif font-black text-xl text-stone-900">R$ 4.540,00</h3>
                    <span className="text-amber-600 font-mono text-[8px] font-bold block uppercase">+18% vs mês anterior</span>
                  </div>
                </div>

                {/* Total jobs completed badge */}
                <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-sm flex items-center space-x-4">
                  <div className="p-3.5 bg-stone-100 text-stone-700 rounded-2xl">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-stone-400 uppercase font-bold block">Serviços Entregues</span>
                    <h3 className="font-serif font-black text-xl text-stone-900">32 Trabalhos</h3>
                    <span className="text-stone-500 font-mono text-[8px] block uppercase">100% de avaliações 5 estrelas</span>
                  </div>
                </div>

              </div>

              {/* Active Contracts Tracker System */}
              <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between border-b border-stone-200 pb-5 mb-6 gap-4">
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase tracking-widest block mb-0.5">CONTROLES DO PRESTADOR</span>
                    <h3 className="font-serif font-black text-2xl text-stone-900">Meus Contratos e Projetos de Trabalho</h3>
                  </div>

                  {/* Quick stats toggle */}
                  <div className="flex items-center space-x-1 bg-stone-100 p-1 rounded-xl text-xs font-bold text-stone-600">
                    <span className="px-3 py-1 bg-white rounded-lg text-indigo-950 shadow-sm">Ativos ({contracts.filter(c => c.status !== "completed").length})</span>
                    <span className="px-3 py-1">Histórico ({contracts.filter(c => c.status === "completed").length})</span>
                  </div>
                </div>

                {/* Contracts List interactive display */}
                <div className="space-y-6">
                  {contracts.map(c => (
                    <div 
                      key={c.id} 
                      className="bg-stone-50/50 hover:bg-stone-50 border border-stone-200 rounded-2xl p-5 sm:p-6 transition flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
                    >
                      <div className="space-y-3 flex-1">
                        {/* Status chip header */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[9px] text-stone-400 font-bold tracking-wide uppercase">
                            CÓDIGO: {c.id}
                          </span>
                          <span className="text-stone-300">•</span>
                          <span className="font-mono text-[9px] text-stone-400 font-bold uppercase">
                            DATA: {c.date}
                          </span>
                          
                          {/* Colored badge based on escrow workflow state */}
                          {c.status === "pending" && (
                            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/50 font-mono text-[8px] font-extrabold uppercase">
                              AGUARDANDO INÍCIO
                            </span>
                          )}
                          {c.status === "in_progress" && (
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/50 font-mono text-[8px] font-extrabold uppercase animate-pulse">
                              EM EXECUÇÃO
                            </span>
                          )}
                          {c.status === "review" && (
                            <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/50 font-mono text-[8px] font-extrabold uppercase">
                              AGUARDANDO LIBERAÇÃO CLIENTE
                            </span>
                          )}
                          {c.status === "completed" && (
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/50 font-mono text-[8px] font-extrabold uppercase">
                              VALOR LIBERADO COM SUCESSO
                            </span>
                          )}
                          {c.status === "disputed" && (
                            <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200/50 font-mono text-[8px] font-extrabold uppercase">
                              EM MEDIAÇÃO ADMINISTRATIVA
                            </span>
                          )}
                        </div>

                        {/* Title of service */}
                        <div className="space-y-1">
                          <h4 className="font-serif font-black text-stone-900 text-lg leading-tight">
                            {c.serviceTitle}
                          </h4>
                          <p className="text-stone-500 font-sans text-xs leading-relaxed max-w-3xl">
                            {c.description}
                          </p>
                        </div>

                        {/* Client Mini Avatar Hud */}
                        <div className="flex items-center space-x-2 bg-white/60 p-2 rounded-xl border border-stone-200/30 inline-flex">
                          <img 
                            src={c.providerAvatar} 
                            alt={c.providerName} 
                            className="w-6 h-6 rounded-lg object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[11px] font-sans font-bold text-stone-600">
                            Contratado por: <span className="text-indigo-900 font-black">{c.providerName}</span>
                          </span>
                        </div>
                      </div>

                      {/* Pricing block & action triggers */}
                      <div className="flex sm:flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-stone-200">
                        <div className="text-left lg:text-right">
                          <span className="font-mono text-[9px] text-stone-400 block font-bold uppercase">VALOR EM GARANTIA (ESCROW)</span>
                          <span className="font-sans font-black text-[#15325B] text-xl block">R$ {c.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                        </div>

                        {/* Trigger workflow status changes */}
                        <div className="flex flex-wrap gap-2 justify-end">
                          {c.status === "pending" && (
                            <button
                              onClick={() => updateContractStatus(c.id, "in_progress")}
                              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition cursor-pointer"
                            >
                              Iniciar Serviço
                            </button>
                          )}
                          {c.status === "in_progress" && (
                            <button
                              onClick={() => updateContractStatus(c.id, "review")}
                              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition cursor-pointer"
                            >
                              Concluir & Solicitar Pagamento
                            </button>
                          )}
                          {c.status === "review" && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => updateContractStatus(c.id, "completed")}
                                className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition cursor-pointer"
                              >
                                Liberar Escrow (Simular Cliente)
                              </button>
                              <button
                                onClick={() => updateContractStatus(c.id, "disputed")}
                                className="px-3.5 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl text-[10px] font-bold uppercase tracking-wider transition cursor-pointer"
                              >
                                Contestar/Abrir Disputa
                              </button>
                            </div>
                          )}
                          {c.status === "completed" && (
                            <div className="flex items-center space-x-1.5 text-emerald-600 font-mono text-[9px] font-extrabold uppercase">
                              <Check className="h-4 w-4" />
                              <span>PIX Enviado ao Prestador</span>
                            </div>
                          )}
                          {c.status === "disputed" && (
                            <span className="text-red-500 font-mono text-[9px] font-extrabold uppercase">
                              Aguardando Decisão do Admin
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* TAB 3: BACKEND SYSTEM ADMINISTRATION PANEL */}
          {activeTab === "admin_panel" && (
            <motion.div
              key="admin-panel-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 text-left"
            >
              
              {/* Platform Operator Stats */}
              <div className="bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-sm">
                <div className="max-w-2xl mb-8">
                  <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase tracking-widest block mb-0.5">SISTEMA INTERNO</span>
                  <h3 className="font-serif font-black text-2xl text-stone-900">Console de Administração Geral do Marketplace</h3>
                  <p className="text-stone-500 font-sans text-xs sm:text-sm mt-1">
                    Gerencie o ecossistema de contratações: triagem de novos profissionais prestadores, liberação/estorno manual de depósitos de escrow sob disputa e comissionamento da plataforma.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* GMV Stat Card */}
                  <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/60 text-left">
                    <span className="font-mono text-[9px] text-stone-400 uppercase font-bold block">Volume Total Transacionado (GMV)</span>
                    <h4 className="font-serif font-black text-2xl text-stone-900 mt-1">R$ 48.950,00</h4>
                    <p className="text-stone-500 font-sans text-[10px] mt-2">
                      Faturamento retido e processado na plataforma nas últimas 24 horas.
                    </p>
                  </div>

                  {/* Take Rate Commission split (15%) */}
                  <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/60 text-left">
                    <span className="font-mono text-[9px] text-stone-400 uppercase font-bold block">Comissão da Plataforma (Take-Rate)</span>
                    <h4 className="font-serif font-black text-2xl text-indigo-700 mt-1">R$ 7.342,50</h4>
                    <p className="text-emerald-600 font-mono text-[9px] font-bold mt-2 uppercase">
                      Margem média consolidada de 15% sobre os serviços.
                    </p>
                  </div>

                  {/* Dispute active count block */}
                  <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/60 text-left">
                    <span className="font-mono text-[9px] text-stone-400 uppercase font-bold block">Taxa de Mediação de Disputas</span>
                    <h4 className="font-serif font-black text-2xl text-stone-900 mt-1">0.42% <span className="text-xs font-normal text-emerald-600 font-bold">Excelente</span></h4>
                    <p className="text-stone-500 font-sans text-[10px] mt-2">
                      Apenas {disputes.filter(d => d.status === "open").length} disputas em aberto aguardando triagem.
                    </p>
                  </div>

                </div>
              </div>

              {/* Grid split: Approval of providers vs. active dispute escrows */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Panel column 1: Providers pending verification/approval */}
                <div className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-sm space-y-6">
                  <div className="border-b border-stone-100 pb-4">
                    <span className="font-mono text-[9px] text-indigo-600 font-bold uppercase tracking-wider block">FILA DE DOCUMENTOS E CADASTROS</span>
                    <h4 className="font-serif font-black text-lg text-stone-900">Aprovação de Novos Prestadores</h4>
                  </div>

                  {pendingApprovals.length === 0 ? (
                    <div className="text-center py-12 bg-stone-50 rounded-2xl border border-stone-200/30">
                      <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                      <p className="text-stone-500 font-mono text-[10px] uppercase font-bold">Todos os profissionais verificados!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingApprovals.map(pa => (
                        <div key={pa.id} className="p-5 bg-stone-50/50 border border-stone-200 rounded-2xl space-y-4">
                          <div className="flex items-center space-x-3">
                            <img src={pa.avatar} alt={pa.name} className="w-10 h-10 rounded-xl object-cover" />
                            <div>
                              <h5 className="font-serif font-bold text-stone-900 text-sm">{pa.name}</h5>
                              <p className="font-mono text-[9px] text-stone-400 uppercase font-bold">{pa.location} • {pa.category}</p>
                            </div>
                          </div>

                          <div className="space-y-1.5 text-stone-600 text-xs leading-relaxed">
                            <p><strong>{pa.title}</strong></p>
                            <p className="text-stone-500 text-[11px] font-sans">{pa.bio}</p>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {pa.skills.map((s, idx) => (
                              <span key={idx} className="bg-stone-100 text-stone-500 text-[9px] px-2 py-0.5 rounded border border-stone-200/40">{s}</span>
                            ))}
                          </div>

                          <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between">
                            <span className="text-[9px] font-mono font-bold text-stone-400 uppercase">Aguardando Aval da Plataforma</span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleApproveProvider(pa)}
                                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[9px] font-bold uppercase tracking-wider transition cursor-pointer"
                              >
                                Aprovar Profissional
                              </button>
                              <button
                                onClick={() => handleRejectProvider(pa.id)}
                                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-lg text-[9px] font-bold uppercase tracking-wider transition cursor-pointer"
                              >
                                Recusar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Panel column 2: Active disputes and Escrow Release resolutions */}
                <div className="bg-white rounded-3xl border border-stone-200/80 p-6 shadow-sm space-y-6">
                  <div className="border-b border-stone-100 pb-4">
                    <span className="font-mono text-[9px] text-indigo-600 font-bold uppercase tracking-wider block">MEDIAÇÃO & JURÍDICO</span>
                    <h4 className="font-serif font-black text-lg text-stone-900">Estorno ou Liberação de Disputas</h4>
                  </div>

                  <div className="space-y-4">
                    {disputes.map(d => (
                      <div key={d.id} className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-4 text-left">
                        
                        {/* Dispute status indicator */}
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] text-stone-400 font-bold uppercase">DISPUTA: {d.id}</span>
                          
                          {d.status === "open" && (
                            <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200/40 font-mono text-[8px] font-bold uppercase">
                              AGUARDANDO TRIAGEM ADMINISTRADOR
                            </span>
                          )}
                          {d.status === "resolved_refunded" && (
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/40 font-mono text-[8px] font-bold uppercase">
                              RECURSO ESTORNADO AO CLIENTE
                            </span>
                          )}
                          {d.status === "resolved_released" && (
                            <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/40 font-mono text-[8px] font-bold uppercase">
                              RECURSO LIBERADO AO PRESTADOR
                            </span>
                          )}
                        </div>

                        {/* Dispute details */}
                        <div className="space-y-1.5 text-xs text-stone-700">
                          <p><strong>Contratante (Requerente):</strong> {d.clientName}</p>
                          <p><strong>Especialista:</strong> {d.providerName}</p>
                          <p><strong>Motivação de disputa:</strong></p>
                          <p className="bg-white p-3 rounded-lg border border-stone-200 text-stone-500 font-sans text-[11px] italic leading-relaxed">
                            "{d.reason}"
                          </p>
                        </div>

                        {/* Pricing element & Action buttons to solve */}
                        <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <span className="text-[8px] font-mono text-stone-400 block font-bold uppercase">VALOR EM CUSTÓDIA DISPUTADO</span>
                            <span className="font-sans font-black text-red-600 text-base">R$ {d.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                          </div>

                          {d.status === "open" && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleResolveDispute(d.id, "refund")}
                                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[9px] font-bold uppercase tracking-wider transition cursor-pointer"
                              >
                                Reembolsar Cliente
                              </button>
                              <button
                                onClick={() => handleResolveDispute(d.id, "release")}
                                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[9px] font-bold uppercase tracking-wider transition cursor-pointer"
                              >
                                Liberar para Prestador
                              </button>
                            </div>
                          )}

                          {d.status !== "open" && (
                            <div className="flex items-center space-x-1 text-emerald-600 font-mono text-[9px] font-bold uppercase">
                              <CheckCircle2 className="h-4 w-4" />
                              <span>Disputa Arbitrada & Fechada</span>
                            </div>
                          )}
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* MODAL / BOTTOM SHEET: SERVICE CONTRACTING WIZARD */}
      <AnimatePresence>
        {selectedProviderForContract && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Overlay backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProviderForContract(null)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />

            {/* Modal Body container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-lg overflow-hidden relative z-10 flex flex-col"
              id="contract-modal"
            >
              
              {/* Modal header details */}
              <div className="bg-[#0B1E36] text-white p-6 text-left flex justify-between items-center relative">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#C5A059] font-bold uppercase tracking-widest block">FLUXO DE CONTRATAÇÃO SEGURO</span>
                  <h3 className="font-serif font-black text-xl">Novo Depósito de Escrow</h3>
                </div>
                <button
                  onClick={() => setSelectedProviderForContract(null)}
                  className="text-white/60 hover:text-white font-mono text-xs uppercase"
                >
                  Fechar
                </button>
              </div>

              {/* Progress step bar HUD */}
              <div className="bg-stone-50 border-b border-stone-200 px-6 py-3 flex items-center justify-between text-[10px] font-mono font-bold tracking-wider text-stone-500 uppercase">
                <span className={contractStep === "details" ? "text-indigo-600" : ""}>1. Detalhes</span>
                <ChevronRight className="h-3 w-3" />
                <span className={contractStep === "checkout" ? "text-indigo-600" : ""}>2. Pagamento Seguro</span>
                <ChevronRight className="h-3 w-3" />
                <span className={contractStep === "success" ? "text-indigo-600" : ""}>3. Feito!</span>
              </div>

              {/* Modal Core Contents */}
              <div className="p-6 overflow-y-auto max-h-[70vh] text-left">
                
                {contractStep === "details" && (
                  <div className="space-y-5">
                    
                    {/* Selected Provider Card Hud */}
                    <div className="flex items-center space-x-3 p-3 bg-stone-50 rounded-xl border border-stone-200/50">
                      <img src={selectedProviderForContract.avatar} alt={selectedProviderForContract.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-serif font-bold text-stone-900 text-xs">{selectedProviderForContract.name}</h4>
                        <p className="text-stone-500 font-mono text-[9px] uppercase font-bold">{selectedProviderForContract.title}</p>
                      </div>
                      <div className="ml-auto text-right">
                        <span className="font-sans font-black text-indigo-600 text-xs block">R$ {selectedProviderForContract.hourlyRate}/h</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-1">
                          Descreva o serviço a ser feito
                        </label>
                        <textarea
                          rows={3}
                          value={contractDetails.description}
                          onChange={e => setContractDetails({ ...contractDetails, description: e.target.value })}
                          placeholder="Ex: Instalar 3 lustres pendentes na cozinha de pé direito duplo, garantindo a fiação e fixação correta."
                          className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-indigo-500 rounded-xl text-xs focus:outline-none focus:bg-white transition font-sans text-stone-800"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-1">
                            Horas estimadas
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={100}
                            value={contractDetails.hoursEstimated}
                            onChange={e => setContractDetails({ ...contractDetails, hoursEstimated: parseInt(e.target.value) || 1 })}
                            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-indigo-500 rounded-xl text-xs focus:outline-none focus:bg-white transition font-sans text-stone-800"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-1">
                            Agendar data
                          </label>
                          <input
                            type="date"
                            value={contractDetails.dateScheduled}
                            onChange={e => setContractDetails({ ...contractDetails, dateScheduled: e.target.value })}
                            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-indigo-500 rounded-xl text-xs focus:outline-none focus:bg-white transition font-sans text-stone-800"
                          />
                        </div>
                      </div>

                    </div>

                    {/* Cost Split Summary calculation */}
                    <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50 space-y-2">
                      <div className="flex justify-between items-center text-xs font-sans text-stone-600">
                        <span>Serviço ({contractDetails.hoursEstimated}h x R$ {selectedProviderForContract.hourlyRate})</span>
                        <span className="font-bold">R$ {(contractDetails.hoursEstimated * selectedProviderForContract.hourlyRate).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-sans text-stone-600">
                        <span>Taxa de Seguro Escrow (Cobrada do Prestador)</span>
                        <span className="text-emerald-600 font-mono text-[9px] font-bold">GRÁTIS (SISTEMA PORTFÓLIO)</span>
                      </div>
                      <div className="border-t border-indigo-100 pt-2 flex justify-between items-center text-sm font-serif font-bold text-indigo-950">
                        <span>Total de Depósito em Garantia</span>
                        <span className="font-sans font-black">R$ {(contractDetails.hoursEstimated * selectedProviderForContract.hourlyRate).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setContractStep("checkout")}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <span>Ir para Pagamento Seguro</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>

                  </div>
                )}

                {contractStep === "checkout" && (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                    
                    {/* Payment methods selector */}
                    <div className="grid grid-cols-2 gap-4">
                      <div 
                        onClick={() => setContractDetails({ ...contractDetails, paymentMethod: "credit_card" })}
                        className={`p-4 border rounded-2xl text-center cursor-pointer transition ${contractDetails.paymentMethod === "credit_card" ? "bg-indigo-50/60 border-indigo-500" : "bg-stone-50/50 border-stone-200"}`}
                      >
                        <CreditCard className={`h-6 w-6 mx-auto mb-2 ${contractDetails.paymentMethod === "credit_card" ? "text-indigo-600" : "text-stone-400"}`} />
                        <span className="font-mono text-[9px] font-bold uppercase block text-stone-700">Cartão de Crédito</span>
                        <span className="text-stone-400 font-sans text-[8px] block">Liberação instantânea</span>
                      </div>

                      <div 
                        onClick={() => setContractDetails({ ...contractDetails, paymentMethod: "pix" })}
                        className={`p-4 border rounded-2xl text-center cursor-pointer transition ${contractDetails.paymentMethod === "pix" ? "bg-indigo-50/60 border-indigo-500" : "bg-stone-50/50 border-stone-200"}`}
                      >
                        <Smartphone className={`h-6 w-6 mx-auto mb-2 ${contractDetails.paymentMethod === "pix" ? "text-indigo-600" : "text-stone-400"}`} />
                        <span className="font-mono text-[9px] font-bold uppercase block text-stone-700">PIX Oficial QR Code</span>
                        <span className="text-stone-400 font-sans text-[8px] block">Aprovação em segundos</span>
                      </div>
                    </div>

                    {/* Animated Secure escrow details */}
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start space-x-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-emerald-800 text-[10px] leading-relaxed">
                        <strong>Garantia Estrita ServiçoJá:</strong> O seu pagamento será guardado em conta de custódia protegida pelo Banco de Parcerias da plataforma. O prestador só receberá quando você declarar o serviço como finalizado.
                      </p>
                    </div>

                    {/* Simulated Credit Card form */}
                    {contractDetails.paymentMethod === "credit_card" ? (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-1">
                            Número do Cartão de Crédito (Mock)
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: 4000 1234 5678 9010"
                            className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:bg-white transition font-sans text-stone-800"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-1">
                              Validade
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="12/30"
                              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:bg-white transition font-sans text-stone-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-1">
                              CVC (Segurança)
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="123"
                              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:bg-white transition font-sans text-stone-800"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl text-center space-y-3">
                        <div className="h-32 w-32 bg-stone-200 mx-auto flex items-center justify-center rounded-xl font-mono text-[10px] text-stone-400 uppercase">
                          QR CODE PIX SIMULADO
                        </div>
                        <p className="text-stone-500 text-[10px] max-w-xs mx-auto">
                          Copie a chave Pix aleatória gerada ou escaneie o código acima com o aplicativo do seu banco para prosseguir.
                        </p>
                      </div>
                    )}

                    <div className="border-t border-stone-100 pt-4 flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setContractStep("details")}
                        className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                      >
                        Voltar
                      </button>
                      
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <Lock className="h-3.5 w-3.5" />
                        <span>Fazer Depósito de Garantia</span>
                      </button>
                    </div>

                  </form>
                )}

                {contractStep === "success" && (
                  <div className="py-8 text-center space-y-4">
                    <div className="inline-flex p-3 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 animate-bounce">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h4 className="font-serif font-black text-xl text-stone-900">Dinheiro Protegido com Sucesso!</h4>
                    <p className="text-stone-500 text-xs leading-relaxed max-w-sm mx-auto">
                      O depósito de garantia de <strong>R$ {(contractDetails.hoursEstimated * selectedProviderForContract.hourlyRate).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong> foi guardado com absoluto sucesso. O prestador foi notificado e pode começar a trabalhar imediatamente sem medo de calotes.
                    </p>

                    <div className="pt-4 flex flex-col gap-2">
                      <button
                        onClick={() => {
                          setSelectedProviderForContract(null);
                          setActiveTab("provider_dashboard"); // Go see active contract
                        }}
                        className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider transition shadow-lg inline-block text-center cursor-pointer"
                      >
                        Ver Meu Painel de Contratos
                      </button>
                      <button
                        onClick={() => setSelectedProviderForContract(null)}
                        className="text-[10px] font-mono uppercase tracking-wider text-stone-400 hover:underline"
                      >
                        Voltar ao Mercado
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </motion.div>
          </div>
        )}

        {/* SPECIALIST COMPREHENSIVE PROFILE MODAL (QUALIFICATIONS & PORTFOLIO) */}
        {selectedProviderProfile && (
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[85vh]"
              id="profile-details-modal"
            >
              {/* Modal Banner */}
              <div className="bg-gradient-to-r from-stone-900 to-indigo-950 p-6 text-white relative text-left">
                <button
                  onClick={() => setSelectedProviderProfile(null)}
                  className="absolute top-6 right-6 text-white/70 hover:text-white font-mono text-[11px] uppercase tracking-wider font-bold bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg cursor-pointer transition"
                >
                  Fechar
                </button>
                
                <div className="flex items-center space-x-4 mt-2">
                  <img src={selectedProviderProfile.avatar} alt={selectedProviderProfile.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white/25 shadow-md" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-[8px] uppercase tracking-wider font-extrabold">
                        {selectedProviderProfile.category}
                      </span>
                      {selectedProviderProfile.verified && (
                        <span className="flex items-center text-emerald-400 font-mono text-[8px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/25 px-1.5 py-0.5 rounded">
                          ✓ Certificado
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif font-black text-xl sm:text-2xl mt-1">{selectedProviderProfile.name}</h3>
                    <p className="text-stone-300 font-sans text-xs">{selectedProviderProfile.title}</p>
                  </div>
                </div>
              </div>

              {/* Scrollable Body Content */}
              <div className="p-6 overflow-y-auto space-y-6 text-left flex-1">
                
                {/* Stats ribbon */}
                <div className="grid grid-cols-3 gap-4 bg-stone-50 border border-stone-200/50 p-4 rounded-2xl text-center">
                  <div>
                    <span className="text-[8px] font-mono text-stone-400 uppercase font-bold block">AVALIAÇÃO</span>
                    <span className="font-serif font-black text-stone-900 text-sm flex items-center justify-center space-x-1 mt-0.5">
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      <span>{selectedProviderProfile.rating.toFixed(1)}</span>
                    </span>
                    <span className="text-[8px] text-stone-400 font-mono font-bold block uppercase">({selectedProviderProfile.reviewsCount} Clientes)</span>
                  </div>
                  <div className="border-x border-stone-200">
                    <span className="text-[8px] font-mono text-stone-400 uppercase font-bold block">ENTREGUES</span>
                    <span className="font-serif font-black text-stone-900 text-sm block mt-0.5">{selectedProviderProfile.completedJobs} Trabalhos</span>
                    <span className="text-[8px] text-emerald-600 font-mono font-bold block uppercase">100% Sucesso</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-stone-400 uppercase font-bold block">TAXA DA HORA</span>
                    <span className="font-sans font-black text-indigo-600 text-sm block mt-0.5">R$ {selectedProviderProfile.hourlyRate}/h</span>
                    <span className="text-[8px] text-stone-400 font-mono font-bold block uppercase">Valor Médio</span>
                  </div>
                </div>

                {/* About & Skills */}
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-sm text-stone-900 border-b border-stone-100 pb-1.5">Sobre o Especialista</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">{selectedProviderProfile.bio}</p>
                  
                  <div className="flex flex-wrap gap-1 pt-2">
                    {selectedProviderProfile.skills.map((skill, idx) => (
                      <span key={idx} className="bg-stone-100 text-stone-700 text-[9px] px-2.5 py-1 rounded-lg font-mono font-bold border border-stone-200/40">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Portfolio Gallery Display */}
                {selectedProviderProfile.portfolio && selectedProviderProfile.portfolio.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-serif font-bold text-sm text-stone-900 border-b border-stone-100 pb-1.5">Galeria de Trabalhos Portfólio</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProviderProfile.portfolio.map((item, idx) => (
                        <div key={idx} className="group relative rounded-xl overflow-hidden border border-stone-200 shadow-sm aspect-video bg-stone-100">
                          <img src={item.imageUrl || item.image} alt={item.title} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
                          <div className="absolute inset-x-0 bottom-0 bg-stone-950/80 p-2.5 text-white transform translate-y-full group-hover:translate-y-0 transition duration-300 text-left">
                            <h5 className="font-serif font-bold text-[10px] line-clamp-1">{item.title}</h5>
                            <span className="font-mono text-[8px] text-stone-300 uppercase block mt-0.5">{item.category || "Projeto"}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews / Testimonials display */}
                {selectedProviderProfile.reviews && selectedProviderProfile.reviews.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-serif font-bold text-sm text-stone-900 border-b border-stone-100 pb-1.5">Avaliações de Clientes Anteriores</h4>
                    <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
                      {selectedProviderProfile.reviews.map((rev, idx) => (
                        <div key={idx} className="p-3.5 bg-stone-50 border border-stone-200/50 rounded-xl space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-xs text-stone-800">{rev.clientName || rev.author}</span>
                            <div className="flex items-center space-x-1 font-mono text-[10px] text-amber-600 font-bold">
                              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                              <span>{rev.rating.toFixed(1)}</span>
                            </div>
                          </div>
                          <p className="text-stone-500 font-sans text-xs italic">"{rev.comment}"</p>
                          <span className="text-[8px] font-mono text-stone-400 block text-right font-bold uppercase">CONTRATAÇÃO GARANTIDA EM {rev.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Dual Modal CTA actions footer */}
              <div className="bg-stone-50 p-4 border-t border-stone-100 flex items-center justify-between shrink-0">
                <button
                  onClick={() => {
                    handleStartDirectChat(selectedProviderProfile);
                    setSelectedProviderProfile(null);
                  }}
                  className="px-4 py-2 border border-indigo-400 hover:bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold uppercase transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Iniciar Conversa Chat</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedProviderForContract(selectedProviderProfile);
                    setSelectedProviderProfile(null);
                    setContractStep("details");
                    setContractDetails({
                      description: `Gostaria de contratar ${selectedProviderProfile.name} para demanda específica de faturamento com proteção do Banco de Escrow ServiçoJá.`,
                      hoursEstimated: 4,
                      dateScheduled: "2026-07-20",
                      paymentMethod: "credit_card"
                    });
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Contratar em Escrow</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
