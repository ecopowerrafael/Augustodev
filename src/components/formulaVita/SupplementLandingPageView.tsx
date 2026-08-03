import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Zap,
  ShieldCheck,
  Award,
  CheckCircle2,
  Star,
  Clock,
  Truck,
  Sparkles,
  ArrowRight,
  ChevronDown,
  MessageSquare,
  Lock,
  Flame,
  Check,
  X,
  Plus,
  HelpCircle,
  ShoppingBag,
  FileText,
  QrCode,
  CreditCard,
  Gift,
  Phone,
  ThumbsUp,
  TrendingUp,
  RefreshCw,
  Droplets,
  Share2
} from "lucide-react";

interface SupplementLandingPageViewProps {
  onOpenWhatsApp?: () => void;
  showToast: (msg: string) => void;
  onNavigateTab?: (tab: string) => void;
}

interface KitOption {
  id: string;
  name: string;
  bottles: number;
  badge?: string;
  originalPrice: number;
  promoPrice: number;
  installmentsCount: number;
  installmentValue: number;
  savings: number;
  popular?: boolean;
  freeShipping: boolean;
  gifts: string[];
  image: string;
}

const KITS: KitOption[] = [
  {
    id: "kit-1",
    name: "1 Pote (Tratamento 1 Mês)",
    bottles: 1,
    originalPrice: 159.90,
    promoPrice: 119.90,
    installmentsCount: 12,
    installmentValue: 12.04,
    savings: 40.00,
    freeShipping: false,
    gifts: ["Manual de Uso em PDF"],
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "kit-3",
    name: "3 Potes (Tratamento 3 Meses)",
    bottles: 3,
    badge: "MAIS VENDIDO • 35% OFF",
    originalPrice: 369.00,
    promoPrice: 239.70,
    installmentsCount: 12,
    installmentValue: 24.07,
    savings: 129.30,
    popular: true,
    freeShipping: true,
    gifts: ["Frete Grátis Brasil", "Guia de Treino & Hipertrofia PDF"],
    image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "kit-5",
    name: "5 Potes (Tratamento 5 Meses)",
    bottles: 5,
    badge: "MÁXIMA ECONOMIA • 50% OFF",
    originalPrice: 699.00,
    promoPrice: 349.50,
    installmentsCount: 12,
    installmentValue: 35.09,
    savings: 349.50,
    freeShipping: true,
    gifts: ["Frete Grátis Express", "Coqueteleira Inox Brinde Exclusivo", "Plano Nutricional PDF"],
    image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=500&q=80"
  }
];

export const SupplementLandingPageView: React.FC<SupplementLandingPageViewProps> = ({
  onOpenWhatsApp,
  showToast,
  onNavigateTab
}) => {
  // Selected Kit for Checkout Drawer
  const [selectedKit, setSelectedKit] = useState<KitOption>(KITS[1]); // Default 3 potes
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [addOrderBump, setAddOrderBump] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  
  // Checkout Form inputs
  const [customerName, setCustomerName] = useState<string>("Rafael Oliveira");
  const [customerPhone, setCustomerPhone] = useState<string>("(11) 98765-4321");
  const [customerCpf, setCustomerCpf] = useState<string>("321.654.987-00");
  const [customerZip, setCustomerZip] = useState<string>("01310-100");
  const [customerAddress, setCustomerAddress] = useState<string>("Av. Paulista, 1000 - São Paulo/SP");

  // Order Submitted state
  const [orderCompleted, setOrderCompleted] = useState<boolean>(false);
  const [pixCopied, setPixCopied] = useState<boolean>(false);

  // FAQ Accordion Active Index
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Review Filter
  const [reviewFilter, setReviewFilter] = useState<string>("todos");

  // Countdown Timer State (Simulated 14:32)
  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number }>({
    minutes: 14,
    seconds: 32
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 15, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenCheckout = (kit: KitOption) => {
    setSelectedKit(kit);
    setIsCheckoutOpen(true);
    setOrderCompleted(false);
  };

  const handleCopyPix = () => {
    setPixCopied(true);
    showToast("Chave Pix Copia e Cola copiada para a área de transferência!");
    setTimeout(() => setPixCopied(false), 3000);
  };

  const handleFinalizeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderCompleted(true);
    showToast("Pedido gerado com sucesso! Código de rastreio enviado via WhatsApp.");
  };

  // Math for checkout total
  const orderBumpPrice = 29.90; // Coqueteleira
  const finalTotal = selectedKit.promoPrice + (addOrderBump ? orderBumpPrice : 0);

  return (
    <div className="space-y-16 pb-24 text-slate-900 font-sans selection:bg-[#10B981]/20 selection:text-[#065F46]">
      
      {/* ========================================================================= */}
      {/* URGENCY TOP BAR BANNER */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-[#064E3B] via-[#047857] to-[#065F46] text-white py-2.5 px-4 text-center font-extrabold text-xs tracking-wide shadow-md flex items-center justify-center space-x-2">
        <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
        <span>OFERTA DE LANÇAMENTO: ATÉ 50% OFF + FRETE GRÁTIS BRASIL | RESTAM</span>
        <span className="bg-black/40 px-2 py-0.5 rounded font-mono text-amber-300 font-black">
          {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO (PRIMEIRA DOBRA) */}
      {/* ========================================================================= */}
      <section className="relative pt-4 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#047857] text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Fórmula Nutracêutica de Alta Performance • Grau Farmacêutico</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Potencialize Seus Resultados com a <span className="text-[#047857] underline decoration-amber-400 decoration-wavy">Fórmula Mais Avançada</span> do Mercado
            </h1>

            {/* Persuasive Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Desenvolvida com matéria-prima 100% pura de absorção ultrarrápida, testada em laboratório independente com laudo certificado. Máxima energia, recuperação muscular e força sem retenção.
            </p>

            {/* Key Benefits Bullet List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3 text-xs font-bold text-slate-800">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#047857] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span><strong>+300% de Disposição & Foco Mental:</strong> Estímulo limpo para o dia e treinos intensos sem efeito rebote.</span>
              </div>

              <div className="flex items-start space-x-3 text-xs font-bold text-slate-800">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#047857] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span><strong>Recuperação Muscular Acelerada:</strong> Zera a fadiga celular e acelera a síntese proteica pós-treino.</span>
              </div>

              <div className="flex items-start space-x-3 text-xs font-bold text-slate-800">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#047857] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span><strong>Fórmula 100% Pura & Certificada:</strong> Zero Açúcar • Zero Glúten • Sem Corantes Artificiais Pesados.</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={() => handleOpenCheckout(KITS[1])}
                className="px-8 py-4 bg-[#047857] hover:bg-[#065F46] text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-emerald-800/20 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>COMPRAR AGORA COM 50% OFF</span>
                <ArrowRight className="w-5 h-5 text-amber-400" />
              </button>

              <button
                onClick={() => {
                  if (onOpenWhatsApp) onOpenWhatsApp();
                  else showToast("Iniciando atendimento via WhatsApp oficial...");
                }}
                className="px-6 py-4 bg-white hover:bg-emerald-50 text-emerald-900 border-2 border-emerald-300 font-extrabold text-xs uppercase tracking-wider rounded-2xl transition cursor-pointer flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Falar no WhatsApp</span>
              </button>
            </div>

            {/* Social Proof & Trust Icons */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span className="font-bold text-slate-800">4.9/5.0 (+1.280 Vendas)</span>
              </div>

              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#047857] shrink-0" />
                <span className="font-bold text-slate-800">Anvisa Aprovado</span>
              </div>

              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-[#047857] shrink-0" />
                <span className="font-bold text-slate-800">Frete Rápido Brasil</span>
              </div>

              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-[#047857] shrink-0" />
                <span className="font-bold text-slate-800">Laudo de Pureza</span>
              </div>
            </div>

          </div>

          {/* Right Column: High Impact Product Mockup Display */}
          <div className="lg:col-span-5 relative">
            
            {/* Background Glow Aura */}
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 rounded-3xl blur-2xl pointer-events-none" />

            <div className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-black p-8 rounded-3xl border-2 border-emerald-500/30 text-white shadow-2xl text-center space-y-6 overflow-hidden">
              
              {/* Product Badge */}
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-widest rounded-full">
                <Award className="w-3.5 h-3.5" />
                <span>LOTE PREMIUM 2026</span>
              </div>

              {/* Mockup Container Image */}
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden border border-white/10 shadow-inner group">
                <img
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80"
                  alt="VITA PRO MAX Suplemento"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-left space-y-1">
                  <span className="text-amber-300 text-xs font-black uppercase tracking-wider block">VITA PRO MAX • 900g</span>
                  <p className="text-white text-xs font-bold">Proteína Isolada + BCAA + Creatina Micronizada</p>
                </div>
              </div>

              {/* Offer Pricing Highlight */}
              <div className="bg-white/10 border border-white/15 rounded-2xl p-4 backdrop-blur-md space-y-1">
                <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest block">Oferta do Kit 3 Potes (Mais Vendido)</span>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-xs text-slate-400 line-through">De R$ 369,00</span>
                  <span className="text-2xl font-black text-amber-400">Por R$ 239,70</span>
                </div>
                <span className="text-xs text-emerald-300 font-bold block">ou 12x de R$ 24,07 sem juros</span>
              </div>

              {/* Direct Buy Button inside Mockup Card */}
              <button
                onClick={() => handleOpenCheckout(KITS[1])}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Garantir Meu Kit com Desconto</span>
              </button>

              <div className="flex items-center justify-center space-x-4 text-[10px] text-slate-400 font-bold">
                <span>🔒 Pagamento 100% Seguro</span>
                <span>•</span>
                <span>🚚 Frete Grátis</span>
                <span>•</span>
                <span>⚡ Envio Imediato</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: BENEFÍCIOS DO PRODUTO (CARDS ILUSTRATIVOS) */}
      {/* ========================================================================= */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#047857] uppercase tracking-wider">Benefícios Comprovados</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Por que o VITA PRO MAX é a escolha Nº 1 dos atletas?
            </h2>
            <p className="text-xs text-slate-600">
              Fórmula desenvolvida com ação multifatorial sinérgica para performance celular integral.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-[#047857] transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#047857] flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Mais Energia & Foco Mental</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Estímulo fisiológico limpo sem causar ansiedade ou taquicardia. Disposição mantida do início ao fim do dia.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-[#047857] transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#047857] flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Melhor Desempenho Físico</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Retarda o acúmulo de ácido lático nos músculos, aumentando a resistência física em séries de alta intensidade.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-[#047857] transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#047857] flex items-center justify-center">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Recuperação Muscular Acelerada</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Combate o catabolismo muscular pós-treino e reconstrói as fibras musculares em tempo recorde.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-[#047857] transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#047857] flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Ganho de Força & Hipertrofia</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Estímulo direto à síntese proteica e hipertrofia celular sem retenção hídrica indesejada.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-[#047857] transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#047857] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Alta Qualidade Farmacêutica</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Matéria-prima 100% testada e aprovada em laudos de pureza com rastreabilidade lote a lote.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-[#047857] transition space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#047857] flex items-center justify-center">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">Fácil Consumo & Sabor Incrível</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Solubilidade instantânea em água gelada. Disponível em sabores deliciosos sem retrogosto artificial.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: COMO FUNCIONA (PASSO A PASSO) */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
        
        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#047857] uppercase tracking-wider">Ciência Aplicada</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Como o Suplemento Funciona no Seu Corpo</h2>
          <p className="text-xs text-slate-600">Entenda o ciclo de rápida absorção e entrega de nutrientes nas células musculares.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 relative space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-amber-500">PASSO 01</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#047857] flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
            </div>
            <h3 className="font-extrabold text-[#047857] text-base">Absorção Nanotecnológica</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              O composto micronizado atravessa a mucosa gástrica em menos de 15 minutos sem desconforto abdominal.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 relative space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-amber-500">PASSO 02</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#047857] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
            </div>
            <h3 className="font-extrabold text-[#047857] text-base">Nutrição Celular Direta</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ativos isolados são direcionados diretamente para os receptores das fibras musculares em uso intenso.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 relative space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-amber-500">PASSO 03</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#047857] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <h3 className="font-extrabold text-[#047857] text-base">Resultados & Performance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sensação imediata de força no treino e recuperação muscular acelerada no dia seguinte.
            </p>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: DIFERENCIAIS COMPETITIVOS */}
      {/* ========================================================================= */}
      <section className="py-12 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Por que Escolher</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Diferenciais Que Garantem Sua Satisfação</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2 hover:border-emerald-500/50 transition">
              <div className="text-amber-400 font-extrabold text-sm flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Fórmula Premium Exclusiva</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Desenvolvida por equipe multidisciplinar de farmacêuticos e nutricionistas esportivos.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2 hover:border-emerald-500/50 transition">
              <div className="text-amber-400 font-extrabold text-sm flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Ingredientes Selecionados</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Matéria-prima de alto grau farmacêutico sem misturas de amidos ou maltodextrina.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2 hover:border-emerald-500/50 transition">
              <div className="text-amber-400 font-extrabold text-sm flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Produto Certificado</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Laudo público de análise microbiológica e teor de proteína acessível via QR Code.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2 hover:border-emerald-500/50 transition">
              <div className="text-amber-400 font-extrabold text-sm flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Excelente Custo-Benefício</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Preço direto de fábrica sem intermediários para você receber o melhor produto pelo menor custo por dose.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2 hover:border-emerald-500/50 transition">
              <div className="text-amber-400 font-extrabold text-sm flex items-center space-x-2">
                <Truck className="w-4 h-4" />
                <span>Entrega Rápida & Segura</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Despacho prioritário em até 24h úteis com rastreamento detalhado via WhatsApp.
              </p>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2 hover:border-emerald-500/50 transition">
              <div className="text-amber-400 font-extrabold text-sm flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Compra 100% Protegida</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Plataforma com criptografia SSL 256-bit e garantia incondicional de satisfação em 30 dias.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: PROVA SOCIAL (AVALIAÇÕES DE CLIENTES) */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#047857] uppercase tracking-wider">Opinião de Quem Usa</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Avaliações Reais de Clientes Satisfação 99.4%</h2>
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold">
            <span className="text-2xl font-black text-amber-500">4.9</span>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="text-slate-500">(1.284 avaliações verificadas)</span>
          </div>
        </div>

        {/* Review Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          {["todos", "5_estrelas", "com_foto", "verificados"].map((filter) => (
            <button
              key={filter}
              onClick={() => setReviewFilter(filter)}
              className={`px-3.5 py-1.5 rounded-full capitalize cursor-pointer transition ${
                reviewFilter === filter
                  ? "bg-[#047857] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {filter.replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt=""
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Juliana Silva</h4>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    ✓ Comprador Verificado
                  </span>
                </div>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              "Comprei o kit com 3 potes. O resultado no treino de perna foi nítido logo na primeira semana! Dissolve super fácil na água gelada. Recomendo de olhos fechados."
            </p>
            <span className="text-[10px] text-slate-400 block">Há 3 dias • Compra do Kit 3 Potes</span>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt=""
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Lucas Andrade</h4>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    ✓ Comprador Verificado
                  </span>
                </div>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              "Treino há mais de 5 anos e sou bem exigente com laudo de pureza. O produto entrega exatamente o que promete! Chegou em 24h aqui em SP."
            </p>
            <span className="text-[10px] text-slate-400 block">Há 5 dias • Compra do Kit 5 Potes</span>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                  alt=""
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">Dra. Mônica Costa</h4>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    ✓ Nutricionista Esportiva
                  </span>
                </div>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              "Indico aos meus pacientes pelo excelente perfil aminoacídico e ausência de adoçantes pesados. Produto de nível internacional."
            </p>
            <span className="text-[10px] text-slate-400 block">Há 1 semana • Avaliação Profissional</span>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: TABELA COMPARATIVA (NOSSO PRODUTO VS GENÉRICOS) */}
      {/* ========================================================================= */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold text-[#047857] uppercase tracking-wider">Comparativo de Qualidade</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">VITA PRO MAX vs. Opções Genéricas do Mercado</h2>
            <p className="text-xs text-slate-600">Veja por que vale a pena investir em um produto com matéria-prima de grau farmacêutico.</p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider">
                    <th className="p-4 sm:p-6 font-extrabold">Diferencial / Característica</th>
                    <th className="p-4 sm:p-6 bg-[#047857] text-white font-black text-center sm:text-left">
                      ✨ VITA PRO MAX
                    </th>
                    <th className="p-4 sm:p-6 text-slate-400 font-bold text-center sm:text-left">
                      Suplementos Genéricos
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  
                  <tr>
                    <td className="p-4 sm:p-6 font-extrabold text-slate-900">Pureza dos Ingredientes</td>
                    <td className="p-4 sm:p-6 bg-emerald-50/60 font-black text-[#047857] flex items-center space-x-2">
                      <Check className="w-4 h-4 text-[#047857] shrink-0" />
                      <span>100% Grau Farmacêutico Isolado</span>
                    </td>
                    <td className="p-4 sm:p-6 text-slate-500">Misturas com amidos e maltodextrina</td>
                  </tr>

                  <tr>
                    <td className="p-4 sm:p-6 font-extrabold text-slate-900">Concentração por Dose</td>
                    <td className="p-4 sm:p-6 bg-emerald-50/60 font-black text-[#047857] flex items-center space-x-2">
                      <Check className="w-4 h-4 text-[#047857] shrink-0" />
                      <span>24g Proteína + 5.5g BCAA Puros</span>
                    </td>
                    <td className="p-4 sm:p-6 text-slate-500">Apenas 12g a 15g por dose</td>
                  </tr>

                  <tr>
                    <td className="p-4 sm:p-6 font-extrabold text-slate-900">Laudo de Pureza Público</td>
                    <td className="p-4 sm:p-6 bg-emerald-50/60 font-black text-[#047857] flex items-center space-x-2">
                      <Check className="w-4 h-4 text-[#047857] shrink-0" />
                      <span>Sim • QR Code na embalagem</span>
                    </td>
                    <td className="p-4 sm:p-6 text-slate-500">Não disponível ou antigo</td>
                  </tr>

                  <tr>
                    <td className="p-4 sm:p-6 font-extrabold text-slate-900">Solubilidade & Sabor</td>
                    <td className="p-4 sm:p-6 bg-emerald-50/60 font-black text-[#047857] flex items-center space-x-2">
                      <Check className="w-4 h-4 text-[#047857] shrink-0" />
                      <span>Instantânea em 5s sem grumos</span>
                    </td>
                    <td className="p-4 sm:p-6 text-slate-500">Textura arenosa e sabor artificial</td>
                  </tr>

                  <tr>
                    <td className="p-4 sm:p-6 font-extrabold text-slate-900">Custo-Benefício por Dose</td>
                    <td className="p-4 sm:p-6 bg-emerald-50/60 font-black text-[#047857] flex items-center space-x-2">
                      <Check className="w-4 h-4 text-[#047857] shrink-0" />
                      <span>Apenas R$ 2,39 por dose ativa</span>
                    </td>
                    <td className="p-4 sm:p-6 text-slate-500">Alto custo para baixa gramatura</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: OFERTA & KITS PROMOCIONAIS (TABELA DE PREÇOS) */}
      {/* ========================================================================= */}
      <section id="oferta-kits" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
        
        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#047857] uppercase tracking-wider">Escolha Seu Kit Ideal</span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">Oferta Especial de Lançamento Direto de Fábrica</h2>
          <p className="text-xs text-slate-600">Selecione a quantidade desejada e garanta descontos exclusivos com Frete Grátis.</p>
        </div>

        {/* Pricing Kits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left items-stretch">
          {KITS.map((kit) => (
            <div
              key={kit.id}
              className={`p-6 sm:p-8 rounded-3xl bg-white border-2 transition-all relative flex flex-col justify-between space-y-6 shadow-lg ${
                kit.popular
                  ? "border-emerald-500 ring-4 ring-emerald-500/10 scale-102"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              
              {/* Popular Badge */}
              {kit.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-widest rounded-full shadow-md whitespace-nowrap">
                  {kit.badge}
                </div>
              )}

              <div className="space-y-4 pt-2">
                <img
                  src={kit.image}
                  alt={kit.name}
                  className="w-full h-40 object-cover rounded-2xl border border-slate-100"
                />

                <div>
                  <h3 className="font-black text-slate-900 text-lg">{kit.name}</h3>
                  <p className="text-xs text-slate-500">Ideal para {kit.bottles * 30} dias de suplementação contínua</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-xs text-slate-400 line-through block">De R$ {kit.originalPrice.toFixed(2)}</span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-xs font-bold text-slate-700">Por</span>
                    <span className="text-3xl font-black text-[#047857]">R$ {kit.promoPrice.toFixed(2)}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 block">
                    ou {kit.installmentsCount}x de <strong className="text-emerald-700">R$ {kit.installmentValue.toFixed(2)}</strong> sem juros
                  </span>
                  <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-1">
                    Você economiza R$ {kit.savings.toFixed(2)}
                  </span>
                </div>

                {/* Gifts & Included Highlights */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-800 block">O que está incluso:</span>
                  {kit.gifts.map((gift, gIdx) => (
                    <div key={gIdx} className="flex items-center space-x-2 text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#047857] shrink-0" />
                      <span>{gift}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleOpenCheckout(kit)}
                className={`w-full py-4 font-black text-xs uppercase tracking-wider rounded-2xl shadow-md transition cursor-pointer flex items-center justify-center space-x-2 ${
                  kit.popular
                    ? "bg-[#047857] hover:bg-[#065F46] text-white shadow-emerald-800/20"
                    : "bg-slate-900 hover:bg-black text-white"
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>COMPRAR ESTE KIT</span>
              </button>

            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="p-6 bg-emerald-50 border-2 border-emerald-200 rounded-3xl text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-[#047857] text-amber-400 flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-base">GARANTIA INCONDICIONAL DE 30 DIAS</h4>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                Tome o suplemento por 30 dias. Se por qualquer motivo você não ficar 100% satisfeito com a sua disposição e evolução de força, basta nos enviar um e-mail e devolveremos todo o seu dinheiro.
              </p>
            </div>
          </div>
          <span className="px-4 py-2 bg-white border border-emerald-300 text-[#047857] font-black text-xs rounded-xl shrink-0">
            100% RISCO ZERO
          </span>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: FAQ (PERGUNTAS FREQUENTES ACCORDION) */}
      {/* ========================================================================= */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#047857] uppercase tracking-wider">Tire Suas Dúvidas</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Perguntas Frequentes (FAQ)</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Como devo consumir o VITA PRO MAX diariamente?",
                a: "Recomenda-se ingerir 1 dose (30g) diluída em 250ml de água fria ou bebida de sua preferência diariamente, de preferência pós-treino ou pela manhã."
              },
              {
                q: "Existe alguma contraindicação ou efeito colateral?",
                a: "O produto é composto por nutrientes 100% naturais de grau farmacêutico e não possui efeitos colaterais registrados. Gestantes e lactantes devem consultar profissional."
              },
              {
                q: "Qual o prazo médio de entrega para o meu endereço?",
                a: "O prazo médio é de 2 a 5 dias úteis para capitais e regiões metropolitanas. Todas as compras possuem código de rastreamento enviado via WhatsApp."
              },
              {
                q: "Quais as formas de pagamento aceitas?",
                a: "Aceitamos Pix com 5% de desconto imediato, Cartões de Crédito em até 12x sem juros e Boleto Bancário."
              },
              {
                q: "Como funciona a Garantia de 30 Dias?",
                a: "Caso não sinta resultados em 30 dias de uso contínuo, basta acionar nosso suporte por e-mail ou WhatsApp para receber o reembolso integral."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-5 text-left font-extrabold text-sm text-slate-900 flex justify-between items-center cursor-pointer hover:bg-slate-50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaqIndex === idx ? "rotate-180 text-[#047857]" : ""}`} />
                </button>
                
                {openFaqIndex === idx && (
                  <div className="p-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: CTA FINAL & URGENCIAL */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-black text-white space-y-6 shadow-2xl relative overflow-hidden border border-emerald-500/30">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
            <Flame className="w-4 h-4" />
            <span>ÚLTIMAS UNIDADES DO LOTE PROMOCIONAL</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white max-w-2xl mx-auto leading-tight">
            Pronto Para Elevar Seu Treino e Disposição a Um Novo Patamar?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Garanta agora o seu kit com até 50% de desconto, Frete Grátis e Garantia Incondicional de 30 Dias.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => handleOpenCheckout(KITS[1])}
              className="w-full sm:w-auto px-8 py-4 bg-[#047857] hover:bg-[#065F46] text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl transition cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>GARANTIR MEU KIT COM DESCONTO</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>

            <button
              onClick={() => {
                if (onOpenWhatsApp) onOpenWhatsApp();
                else showToast("Iniciando atendimento via WhatsApp oficial...");
              }}
              className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl border border-white/20 transition cursor-pointer flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Dúvidas? Falar no WhatsApp</span>
            </button>
          </div>

          <div className="flex items-center justify-center space-x-4 text-[10px] text-slate-400 font-bold pt-4">
            <span>🛡️ Anvisa Aprovado</span>
            <span>•</span>
            <span>🔒 Compra 100% Segura</span>
            <span>•</span>
            <span>🚚 Despacho em 24h</span>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: RODAPÉ */}
      {/* ========================================================================= */}
      <footer className="pt-12 pb-24 sm:pb-12 bg-slate-900 text-slate-400 text-xs border-t border-slate-800 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="space-y-3 lg:col-span-1">
              <span className="font-serif font-black text-lg text-white block">VITA PRO MAX</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Suplementação nutricional de alta performance com matérias-primas importadas e grau farmacêutico.
              </p>
              <div className="pt-2">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2.5 py-1 rounded-md inline-block">
                  ⚡ Envio Imediato para todo o Brasil
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <strong className="text-white font-bold block uppercase text-[10px] tracking-wider text-amber-400">🔥 Links de Ofertas</strong>
              <ul className="space-y-1.5 text-slate-300">
                <li>
                  <a href="#oferta-kits" className="hover:text-amber-400 transition cursor-pointer block">
                    Kits Promocionais com Desconto
                  </a>
                </li>
                <li>
                  <button onClick={() => handleOpenCheckout(KITS[1])} className="hover:text-amber-400 transition cursor-pointer text-left block">
                    Comprar Kit 3 Potes (Mais Vendido)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleOpenCheckout(KITS[2])} className="hover:text-amber-400 transition cursor-pointer text-left block">
                    Comprar Kit 5 Potes (50% OFF)
                  </button>
                </li>
                <li>
                  <a href="#oferta-kits" className="hover:text-amber-400 transition cursor-pointer block">
                    Garantia de 30 Dias Risco Zero
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <strong className="text-white font-bold block uppercase text-[10px] tracking-wider text-emerald-400">🧪 Farmácia Fórmula Vita</strong>
              <ul className="space-y-1.5 text-slate-300">
                <li>
                  <button onClick={() => onNavigateTab ? onNavigateTab("home") : showToast("Navegando para o Envio de Receitas...")} className="hover:text-emerald-400 transition cursor-pointer text-left block">
                    Enviar Receita Médica / Manipulados
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab ? onNavigateTab("about") : showToast("Navegando para Sobre a Farmácia...")} className="hover:text-emerald-400 transition cursor-pointer text-left block">
                    Sobre a Farmácia & Responsável Técnico
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab ? onNavigateTab("labs") : showToast("Navegando para Laboratórios...")} className="hover:text-emerald-400 transition cursor-pointer text-left block">
                    Infraestrutura dos Laboratórios
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateTab ? onNavigateTab("ingredients") : showToast("Navegando para Catálogo...")} className="hover:text-emerald-400 transition cursor-pointer text-left block">
                    Catálogo de Ativos Farmacêuticos
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <strong className="text-white font-bold block uppercase text-[10px] tracking-wider text-emerald-400">💬 Central de Atendimento</strong>
              <p className="text-slate-300">Segunda a Sexta: 08h às 18h</p>
              <p className="text-slate-300">suporte@vitapromax.com.br</p>
              <p className="text-slate-300 font-bold">(11) 98765-4321</p>
              <button
                onClick={() => {
                  if (onOpenWhatsApp) onOpenWhatsApp();
                  else showToast("Iniciando atendimento via WhatsApp...");
                }}
                className="mt-2 inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 rounded-lg text-xs font-bold hover:bg-emerald-600/30 transition cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Atendimento WhatsApp</span>
              </button>
            </div>

            <div className="space-y-2">
              <strong className="text-white font-bold block uppercase text-[10px] tracking-wider text-slate-300">🛡️ Segurança & Termos</strong>
              <button onClick={() => showToast("Exibindo Políticas de Privacidade e LGPD")} className="block hover:text-white transition cursor-pointer text-left">
                Política de Privacidade
              </button>
              <button onClick={() => showToast("Exibindo Termos de Compra e Garantia")} className="block hover:text-white transition cursor-pointer text-left">
                Termos de Serviço & Trocas
              </button>
              <div className="pt-2 flex flex-wrap gap-1.5 text-[9px] font-bold text-slate-300">
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded">ANVISA APROVADO</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded">SSL 256-BIT</span>
                <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded">PIX INSTANTÂNEO</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 gap-2">
            <p>© {new Date().getFullYear()} VITA PRO MAX NUTRIÇÃO ESPORTIVA & FÓRMULA VITA LTDA. TODOS OS DIREITOS RESERVADOS.</p>
            <p className="text-slate-400">CNPJ: 00.000.000/0001-00 • Sorocaba/SP</p>
          </div>

        </div>
      </footer>

      {/* ========================================================================= */}
      {/* FLOATING MOBILE STICKY CTA BAR */}
      {/* ========================================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 p-3 shadow-2xl flex items-center justify-between gap-3 text-white sm:hidden">
        <div>
          <span className="text-[10px] text-emerald-400 font-bold block uppercase">Kit 3 Potes (50% OFF)</span>
          <span className="text-sm font-black text-amber-400">R$ 239,70</span>
        </div>

        <button
          onClick={() => handleOpenCheckout(KITS[1])}
          className="px-5 py-2.5 bg-[#047857] hover:bg-[#065F46] text-white font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer flex items-center space-x-1"
        >
          <span>COMPRAR AGORA</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE CHECKOUT DRAWER MODAL (MOCKUP PIX / CARD) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-md bg-white h-full overflow-y-auto text-slate-900 shadow-2xl flex flex-col justify-between text-left p-6 space-y-6"
            >
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-[#047857]" />
                  <h3 className="font-extrabold text-base text-slate-900">Checkout Seguro 256-Bit</h3>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!orderCompleted ? (
                <form onSubmit={handleFinalizeOrder} className="space-y-6 flex-1">
                  
                  {/* Selected Kit Review */}
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block">Seu Kit Selecionado:</span>
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-black text-slate-900">{selectedKit.name}</strong>
                      <span className="text-sm font-black text-[#047857]">R$ {selectedKit.promoPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Order Bump Upsell Offer */}
                  <div className="p-4 bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl space-y-2">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addOrderBump}
                        onChange={(e) => setAddOrderBump(e.target.checked)}
                        className="mt-1 w-4 h-4 text-[#047857] rounded border-slate-300 focus:ring-[#047857]"
                      />
                      <div className="text-xs space-y-0.5">
                        <span className="font-black text-amber-900 block">
                          🔥 Adicionar Coqueteleira Inox Pro por apenas R$ 29,90!
                        </span>
                        <p className="text-slate-600">Coqueteleira com mola misturadora em aço inox (Economia de R$ 30,00).</p>
                      </div>
                    </label>
                  </div>

                  {/* Customer Information Inputs */}
                  <div className="space-y-3 text-xs">
                    <strong className="font-extrabold text-slate-900 block border-b border-slate-100 pb-1">
                      1. Dados Pessoais & Entrega
                    </strong>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Nome Completo:</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium outline-none focus:border-[#047857]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">WhatsApp / Celular:</label>
                        <input
                          type="text"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          required
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium outline-none focus:border-[#047857]"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">CPF (Nota Fiscal):</label>
                        <input
                          type="text"
                          value={customerCpf}
                          onChange={(e) => setCustomerCpf(e.target.value)}
                          required
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium outline-none focus:border-[#047857]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Endereço Completo de Entrega:</label>
                      <input
                        type="text"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        required
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-medium outline-none focus:border-[#047857]"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-3 text-xs">
                    <strong className="font-extrabold text-slate-900 block border-b border-slate-100 pb-1">
                      2. Forma de Pagamento
                    </strong>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("pix")}
                        className={`p-3 rounded-xl border-2 font-bold flex items-center justify-center space-x-2 cursor-pointer ${
                          paymentMethod === "pix"
                            ? "border-[#047857] bg-emerald-50 text-[#047857]"
                            : "border-slate-200 text-slate-600"
                        }`}
                      >
                        <QrCode className="w-4 h-4" />
                        <span>Pix (5% OFF)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-3 rounded-xl border-2 font-bold flex items-center justify-center space-x-2 cursor-pointer ${
                          paymentMethod === "card"
                            ? "border-[#047857] bg-emerald-50 text-[#047857]"
                            : "border-slate-200 text-slate-600"
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Cartão 12x</span>
                      </button>
                    </div>
                  </div>

                  {/* Final Math Summary */}
                  <div className="pt-4 border-t border-slate-200 space-y-2">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Subtotal Kit:</span>
                      <span>R$ {selectedKit.promoPrice.toFixed(2)}</span>
                    </div>

                    {addOrderBump && (
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Coqueteleira Inox:</span>
                        <span>R$ {orderBumpPrice.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Frete Brasil:</span>
                      <span className="text-emerald-700 font-bold">GRÁTIS</span>
                    </div>

                    <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                      <span>Total Final:</span>
                      <span className="text-[#047857]">R$ {finalTotal.toFixed(2)}</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#047857] hover:bg-[#065F46] text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl transition cursor-pointer flex items-center justify-center space-x-2 mt-2"
                    >
                      <Lock className="w-4 h-4" />
                      <span>FINALIZAR PEDIDO SEGURO</span>
                    </button>
                  </div>

                </form>
              ) : (
                /* Order Confirmation Screen */
                <div className="space-y-6 text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#047857] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <h3 className="font-black text-xl text-slate-900">Pedido Gerado com Sucesso!</h3>
                    <p className="text-xs text-slate-500 mt-1">Protocolo: #VITA-{Math.floor(88000 + Math.random() * 1000)}</p>
                  </div>

                  {/* Simulated Pix QR Code */}
                  {paymentMethod === "pix" ? (
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                      <span className="text-xs font-bold text-slate-700 block">Escaneie o QR Code Pix abaixo:</span>
                      <div className="w-40 h-40 bg-white p-2 border border-slate-300 rounded-xl mx-auto flex items-center justify-center">
                        <QrCode className="w-32 h-32 text-slate-900" />
                      </div>
                      <span className="text-[10px] text-slate-500 block">Chave Pix Válida por 15 minutos</span>

                      <button
                        onClick={handleCopyPix}
                        className="w-full py-3 bg-[#047857] text-white font-black text-xs rounded-xl shadow cursor-pointer flex items-center justify-center space-x-2"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>{pixCopied ? "✓ CHAVE COPIADA!" : "COPIAR CHAVE PIX COPIA E COLA"}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 bg-emerald-50 text-emerald-900 rounded-2xl text-xs space-y-2">
                      <span className="font-bold block">✓ Pagamento Processado com Sucesso!</span>
                      <p>Sua compra em até 12x no Cartão foi autorizada. O comprovante foi enviado por e-mail.</p>
                    </div>
                  )}

                  <div className="p-4 bg-slate-100 rounded-2xl text-xs text-slate-700 space-y-1">
                    <strong>Próximo Passo:</strong>
                    <p>Enviamos os detalhes do rastreamento para o seu WhatsApp ({customerPhone}).</p>
                  </div>

                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="w-full py-3 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-black transition cursor-pointer"
                  >
                    Fechar e Voltar à Página
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
