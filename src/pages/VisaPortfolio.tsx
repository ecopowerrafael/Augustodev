import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  FileText, 
  Compass, 
  Calendar, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  MessageSquare, 
  Lock, 
  MapPin, 
  HelpCircle, 
  Check, 
  Star, 
  AlertTriangle, 
  User, 
  Mail, 
  Phone, 
  FileCheck,
  Plane,
  AlertCircle
} from "lucide-react";

// Types for Calculator and Checklists
type ServiceType = "visto_completo" | "ds160_review" | "passaporte_novo" | "passaporte_renovar";

export default function VisaPortfolio({ onBack }: { onBack: () => void }) {
  // Navigation active state
  const [activeTab, setActiveTab] = useState<"home" | "services" | "assessment" | "calculator" | "faq" | "blog" | "contact">("home");
  
  // Testimonial index
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Expanded FAQ Index
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Lead Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    servico: "visto_completo",
    mensagem: ""
  });

  // Risk Assessment Simulator State
  const [assessmentStep, setAssessmentStep] = useState(1);
  const [hasValidPassport, setHasValidPassport] = useState<string | null>(null);
  const [hasDeniedVisa, setHasDeniedVisa] = useState<string | null>(null);
  const [hasBonds, setHasBonds] = useState<string[]>([]);
  const [incomeLevel, setIncomeLevel] = useState<string | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<{
    score: number;
    badge: string;
    color: string;
    tips: string[];
  } | null>(null);

  // Interactive Fee Calculator State
  const [calcService, setCalcService] = useState<ServiceType>("visto_completo");
  const [calcApplicants, setCalcApplicants] = useState<number>(1);
  const [calcUrgency, setCalcUrgency] = useState<boolean>(false);

  // Active Blog post model state (if any is selected)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // Airplane Animation State
  const [showPlane, setShowPlane] = useState(false);

  // Trigger Airplane Animation after 3 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlane(true);
      playAirplaneSound();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Professional Jet Engine Sound Synthesizer via Web Audio API + Fallback MP3
  const playAirplaneSound = () => {
    try {
      // 1. Try playing a high-quality free jet-flyby sound
      const audio = new Audio("https://www.soundjay.com/transportation/sounds/airplane-fly-by-1.mp3");
      audio.volume = 0.25;
      audio.play().catch(err => {
        console.log("Autoplay blocked/limited by browser security. Audio will play on click if needed.", err);
      });

      // 2. Synthesize using Web Audio API for a perfect, bulletproof backup 'whoosh'
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      // Create noise buffer
      const bufferSize = ctx.sampleRate * 2.5; // 2.5s noise
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = buffer;
      noiseNode.loop = true;

      // Bandpass filter to sculpt the white noise into a wind/jet-engine roar
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.Q.value = 1.8;

      // Volume enveloper (fade-in, hold, fade-out to match crossing)
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 3);   // Rise
      gainNode.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 8);   // Cruising rumble
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 12);     // Fall

      // Doppler frequency shift simulation (higher pitch as it approaches, lower as it leaves)
      filter.frequency.setValueAtTime(250, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(850, ctx.currentTime + 4.5);
      filter.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 12);

      noiseNode.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      noiseNode.start();

      // Stop & clean context after crossing duration
      setTimeout(() => {
        try {
          noiseNode.stop();
          ctx.close();
        } catch (e) {}
      }, 12000);
    } catch (error) {
      console.warn("Sound generation issue:", error);
    }
  };

  // Smooth Scroll Helper
  const scrollToSection = (id: string, tab: any) => {
    setActiveTab(tab);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Fallback for missing images
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80";
  };

  // Pricing constants (consular fee & advisory service fee in BRL)
  const PRICING_DATA: Record<ServiceType, {
    name: string;
    consularFeeUSD: number;
    consularFeeBRL: number; // static approximate
    advisoryFee: number;
    estimatedDays: number;
  }> = {
    visto_completo: {
      name: "Assessoria Completa Visto Americano",
      consularFeeUSD: 185,
      consularFeeBRL: 1036, // ~ R$1036
      advisoryFee: 450,
      estimatedDays: 45
    },
    ds160_review: {
      name: "Revisão DS-160 + Orientações",
      consularFeeUSD: 185,
      consularFeeBRL: 1036,
      advisoryFee: 220,
      estimatedDays: 15
    },
    passaporte_novo: {
      name: "Emissão de Passaporte Brasileiro",
      consularFeeUSD: 0,
      consularFeeBRL: 257.25, // GRU Fee
      advisoryFee: 150,
      estimatedDays: 10
    },
    passaporte_renovar: {
      name: "Renovação de Passaporte",
      consularFeeUSD: 0,
      consularFeeBRL: 257.25,
      advisoryFee: 150,
      estimatedDays: 8
    }
  };

  // Calculate totals
  const getCalculatedFees = () => {
    const service = PRICING_DATA[calcService];
    const baseAdvisory = service.advisoryFee * calcApplicants;
    const baseConsular = service.consularFeeBRL * calcApplicants;
    const urgencyFee = calcUrgency ? (150 * calcApplicants) : 0;
    
    // Family discounts (5% off total advisory for 3+ people)
    const discount = calcApplicants >= 3 ? 0.08 : 0;
    const discountedAdvisory = baseAdvisory * (1 - discount);

    return {
      advisoryTotal: Math.round(discountedAdvisory + urgencyFee),
      consularTotal: Math.round(baseConsular),
      total: Math.round(discountedAdvisory + urgencyFee + baseConsular),
      discountAmount: Math.round(baseAdvisory * discount),
      days: calcUrgency ? Math.round(service.estimatedDays * 0.6) : service.estimatedDays
    };
  };

  // Risk Assessment Process
  const handleNextAssessment = () => {
    if (assessmentStep === 1 && !hasValidPassport) return;
    if (assessmentStep === 2 && !hasDeniedVisa) return;
    if (assessmentStep === 3 && hasBonds.length === 0) return;
    if (assessmentStep === 4 && !incomeLevel) return;

    if (assessmentStep < 4) {
      setAssessmentStep(prev => prev + 1);
    } else {
      // Calculate score out of 100
      let score = 50; // base

      // Passport
      if (hasValidPassport === "yes_long") score += 15;
      else if (hasValidPassport === "yes_short") score += 5;
      else score -= 15;

      // Prior denials
      if (hasDeniedVisa === "no") score += 20;
      else if (hasDeniedVisa === "yes_long_ago") score -= 5;
      else score -= 25;

      // Active bonds
      const bondsCount = hasBonds.length;
      score += (bondsCount * 8);

      // Income
      if (incomeLevel === "high") score += 15;
      else if (incomeLevel === "medium") score += 10;
      else score += 5;

      // Bound limits
      if (score > 98) score = 98;
      if (score < 15) score = 15;

      let badge = "Aprovável com Ajustes";
      let color = "text-amber-500 bg-amber-50 border-amber-200";
      let tips: string[] = [];

      if (score >= 80) {
        badge = "Perfil Excelente";
        color = "text-emerald-600 bg-emerald-50 border-emerald-200";
        tips = [
          "Seus vínculos profissionais e renda atual oferecem excelente solidez.",
          "Foque em apresentar os comprovantes físicos originais idênticos ao DS-160.",
          "Mantenha as datas e roteiro da viagem bem planejados para a entrevista."
        ];
      } else if (score >= 50) {
        badge = "Perfil Médio / Recomendado Apoio";
        color = "text-amber-600 bg-amber-50 border-amber-200";
        tips = [
          "Recomendamos robustecer a declaração de vínculos profissionais ou acadêmicos.",
          "Evite discrepâncias no preenchimento do formulário DS-160 para não gerar dúvidas.",
          "Realizaremos um treinamento de simulação de entrevista focado nas suas conexões no Brasil."
        ];
      } else {
        badge = "Perfil de Alto Risco";
        color = "text-red-600 bg-red-50 border-red-200";
        tips = [
          "Sua situação exige atenção redobrada no preenchimento do histórico residencial e profissional.",
          "Aconselhamos aguardar o término ou estabilidade de vínculos atuais para tentar o visto.",
          "Ofereceremos assessoria jurídica especializada e revisão minuciosa de cada linha do formulário."
        ];
      }

      setAssessmentResult({
        score,
        badge,
        color,
        tips
      });
      setAssessmentStep(5);
    }
  };

  const resetAssessment = () => {
    setAssessmentStep(1);
    setHasValidPassport(null);
    setHasDeniedVisa(null);
    setHasBonds([]);
    setIncomeLevel(null);
    setAssessmentResult(null);
  };

  const handleBondToggle = (bond: string) => {
    if (hasBonds.includes(bond)) {
      setHasBonds(hasBonds.filter(b => b !== bond));
    } else {
      setHasBonds([...hasBonds, bond]);
    }
  };

  // Form Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome) return;

    // Map service key to human-readable label
    const serviceNames: Record<string, string> = {
      visto_completo: "Consultoria Completa para Visto Americano",
      ds160_review: "Revisão de DS-160 + Orientações",
      passaporte_novo: "Emissão de Passaporte Brasileiro Novo",
      passaporte_renovar: "Renovação de Passaporte Vencido"
    };
    const selectedServiceLabel = serviceNames[formData.servico] || formData.servico;
    const obsText = formData.mensagem ? `\n\n*Observações:* ${formData.mensagem}` : "";
    const text = `Olá! Acabo de enviar o formulário no site.\n\n*Nome:* ${formData.nome}\n*Serviço solicitado:* ${selectedServiceLabel}${obsText}`;
    
    const whatsappUrl = `https://wa.me/5549999999999?text=${encodeURIComponent(text)}`;
    
    // Redirect to personal WhatsApp
    window.open(whatsappUrl, "_blank");
    setFormSubmitted(true);
  };

  // Blog content mock
  const BLOG_POSTS = [
    {
      id: 1,
      title: "Como se preparar para a entrevista no Consulado Americano",
      excerpt: "Muitos vistos são negados por nervosismo ou contradição na hora das perguntas. Veja quais são as 5 regras de ouro dos nossos especialistas.",
      content: `A entrevista no Consulado Americano é o momento que mais gera apreensão nos solicitantes. No entanto, ela nada mais é do que uma confirmação dos dados declarados no seu formulário DS-160.\n\n### 1. Diga sempre a verdade absoluto\nQualquer inconsistência entre o que você fala e o que escreveu no DS-160 é motivo de negação automática. Se informou que trabalha há 3 anos na mesma empresa, não mude o prazo durante a resposta falada.\n\n### 2. Responda apenas o que for perguntado\nSe o oficial consular perguntar: 'Para onde você vai nos EUA?', responda 'Para Orlando'. Não tente prolongar contando que vai ver o Mickey ou que sua tia mora lá se não foi perguntado.\n\n### 3. Organize os documentos em pastas visíveis\nLeve seu passaporte atual, passaportes antigos com vistos, a página de confirmação do DS-160, comprovante de pagamento da taxa MRV e os documentos que comprovem seus vínculos (holerites, declaração de IR, contrato social). Só apresente o documento se o oficial solicitar.\n\n### 4. Mantenha a calma e boa postura\nO oficial é treinado para ler linguagem corporal. Responda com firmeza e olhe nos olhos do entrevistador. Nervosismo excessivo pode transparecer insegurança ou ocultação de fatos.`,
      date: "14 Jul 2026",
      readTime: "5 min de leitura",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Principais erros que fazem o visto ser negado (E como evitá-los)",
      excerpt: "O preenchimento incorreto do DS-160 responde por mais de 70% das recusas consulares. Saiba o que nunca fazer em seu formulário de solicitação.",
      content: `O visto americano negado sob a seção 214(b) indica que o solicitante não demonstrou possuir vínculos fortes o suficiente para garantir seu retorno ao Brasil. Contudo, na maioria das vezes, o problema real está na forma como as informações foram colocadas no formulário.\n\n### Erro 1: Erros de tradução ou abreviações confusas\nO formulário deve ser preenchido inteiramente em inglês (exceto os nomes próprios). Usar siglas ou abreviações corporativas brasileiras que o sistema de inteligência americano não compreende pode disparar alertas vermelhos.\n\n### Erro 2: Omitir viagens anteriores ou vistos negados\nO governo americano tem controle absoluto de entradas e saídas de diversos países parceiros. Omitir que já teve um visto de outro país negado ou que já esteve no exterior é considerado fraude e pode resultar em banimento temporário ou permanente.\n\n### Erro 3: Inconsistência financeira\nDeclarar uma renda que não condiz com seu cargo atual ou com o custo de vida informado para a viagem gera suspeita de fraude de emprego ou intenção de trabalho ilegal nos EUA.`,
      date: "08 Jul 2026",
      readTime: "4 min de leitura",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Diferenças Práticas entre CASV e Consulado na Emissão",
      excerpt: "Você sabia que o processo de visto americano exige o comparecimento a dois locais distintos na maioria das cidades? Saiba como funciona cada um.",
      content: `Para quem está tirando o visto americano pela primeira vez, o agendamento duplo pode parecer confuso. O processo envolve duas visitas: uma ao CASV (Centro de Atendimento ao Solicitante de Visto) e outra ao Consulado Geral ou Embaixada.\n\n### O que é o CASV?\nO CASV é um centro logístico operado por empresas terceirizadas autorizadas pelo consulado. O objetivo do CASV é realizar a triagem inicial: coletar suas impressões digitais, tirar a fotografia oficial do visto e conferir seus documentos iniciais. No CASV não há entrevista e a aprovação ou rejeição não é decidida ali.\n\n### O que levar ao CASV?\n- Passaporte válido atual;\n- Página de confirmação do formulário DS-160 com código de barras;\n- Página de confirmação de agendamento impresso.\n\n### O que é o Consulado?\nO Consulado Geral é onde você passará pela entrevista oficial com um diplomata americano. É lá que o seu perfil será avaliado e a decisão de concessão do visto será tomada de imediato.\n\n### Renovação de Visto:\nPara casos de renovação de vistos válidos ou vencidos há menos de 48 meses, geralmente é necessário comparecer apenas ao CASV, ficando o solicitante isento da entrevista oficial no Consulado (salvo exceções aleatórias).`,
      date: "29 Jun 2026",
      readTime: "6 min de leitura",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const calcResults = getCalculatedFees();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased relative">
      
      {/* Premium Header / Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#0B1E36] text-white border-b border-[#C5A059]/20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand Details */}
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#15325B] to-[#0B1E36] border border-[#C5A059] shadow">
              <Globe className="h-6 w-6 text-[#C5A059] animate-pulse" />
            </div>
            <div>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-serif font-black tracking-tight text-lg text-white">VISTO</span>
                <span className="font-serif font-light text-lg text-[#C5A059]">CERTO</span>
              </div>
              <span className="font-mono text-[9px] text-white/50 block uppercase tracking-widest font-bold">ASSESSORIA INTERNACIONAL</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <button 
              onClick={() => scrollToSection("inicio", "home")}
              className={`font-semibold transition-colors cursor-pointer ${activeTab === "home" ? "text-[#C5A059] border-b-2 border-[#C5A059] pb-1" : "text-white/80 hover:text-white"}`}
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection("servicos", "services")}
              className={`font-semibold transition-colors cursor-pointer ${activeTab === "services" ? "text-[#C5A059] border-b-2 border-[#C5A059] pb-1" : "text-white/80 hover:text-white"}`}
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollToSection("simulador-risco", "assessment")}
              className={`font-semibold transition-colors cursor-pointer ${activeTab === "assessment" ? "text-[#C5A059] border-b-2 border-[#C5A059] pb-1" : "text-white/80 hover:text-white"}`}
            >
              Simulador DS-160
            </button>
            <button 
              onClick={() => scrollToSection("calculadora", "calculator")}
              className={`font-semibold transition-colors cursor-pointer ${activeTab === "calculator" ? "text-[#C5A059] border-b-2 border-[#C5A059] pb-1" : "text-white/80 hover:text-white"}`}
            >
              Taxas & Prazos
            </button>
            <button 
              onClick={() => scrollToSection("perguntas", "faq")}
              className={`font-semibold transition-colors cursor-pointer ${activeTab === "faq" ? "text-[#C5A059] border-b-2 border-[#C5A059] pb-1" : "text-white/80 hover:text-white"}`}
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection("blog", "blog")}
              className={`font-semibold transition-colors cursor-pointer ${activeTab === "blog" ? "text-[#C5A059] border-b-2 border-[#C5A059] pb-1" : "text-white/80 hover:text-white"}`}
            >
              Dicas
            </button>
          </nav>

          {/* Back to Portfolio & CTA */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="hidden sm:inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-lg border border-white/20 text-xs text-white/80 hover:text-white hover:bg-white/5 font-mono uppercase tracking-wider transition"
            >
              <span>← Voltar Portfolio</span>
            </button>
            <a 
              href="https://wa.me/5549999999999?text=Ola!+Gostaria+de+saber+mais+sobre+a+assessoria+para+visto+e+passaporte."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[#C5A059] hover:bg-[#B59049] text-[#0B1E36] font-bold text-xs uppercase tracking-wider transition shadow-lg flex items-center space-x-1.5"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Falar com Especialista</span>
            </a>
          </div>

        </div>
      </header>

      {/* Floating Interactive WhatsApp Widget (Required) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
        {/* Dynamic Speech bubble offering quick check */}
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 4 }}
          className="bg-white border border-[#C5A059]/30 p-4 rounded-2xl shadow-xl max-w-[270px] mb-3 text-left pointer-events-auto relative"
        >
          <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white border-r border-b border-[#C5A059]/30 transform rotate-45" />
          <div className="flex items-center space-x-2 mb-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-stone-500">CONSULTOR ONLINE</span>
          </div>
          <p className="text-stone-700 text-xs font-sans leading-relaxed">
            Deseja simular o preenchimento do seu visto americano ou agendar seu passaporte brasileiro hoje? Fale comigo agora!
          </p>
        </motion.div>

        <a 
          href="https://wa.me/5549999999999?text=Ola!+Gostaria+de+falar+com+um+especialista+em+vistos+e+passaportes."
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl transition transform hover:scale-110 flex items-center justify-center border-2 border-white"
          title="Fale no WhatsApp"
        >
          <MessageSquare className="h-6 w-6" />
        </a>
      </div>

      {/* HERO SECTION */}
      <section id="inicio" className="relative bg-[#0B1E36] text-white pt-20 pb-24 overflow-hidden border-b border-[#C5A059]/20">
        {/* Abstract lines visual layer */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Intention, Headings, Pitch */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#15325B] border border-[#C5A059]/30 rounded-full text-[#C5A059] font-mono text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                <span>ASSESSORIA INTERNACIONAL PREMIUM</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                Viaje sem barreiras. Nós cuidamos do seu <span className="text-[#C5A059]">Visto</span> e <span className="border-b-4 border-red-600 pb-0.5">Passaporte</span>.
              </h1>

              <p className="text-stone-300 font-sans text-sm sm:text-base leading-relaxed max-w-xl">
                Evite burocracias, formulários confusos e o risco de ter seu visto americano negado. Nossa consultoria especializada garante revisão completa do DS-160, simulação real de entrevista e agendamento expresso na Polícia Federal.
              </p>

              {/* Trust markers */}
              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-white/10 max-w-lg">
                <div className="text-left">
                  <span className="block font-serif text-2xl font-bold text-[#C5A059]">+98%</span>
                  <span className="text-stone-400 text-[10px] font-mono uppercase tracking-wider block">TAXA DE APROVAÇÃO</span>
                </div>
                <div className="text-left">
                  <span className="block font-serif text-2xl font-bold text-white">4.9 / 5</span>
                  <span className="text-stone-400 text-[10px] font-mono uppercase tracking-wider block">AVALIAÇÃO NO GOOGLE</span>
                </div>
                <div className="text-left">
                  <span className="block font-serif text-2xl font-bold text-white">+10 mil</span>
                  <span className="text-stone-400 text-[10px] font-mono uppercase tracking-wider block">CLIENTES ATENDIDOS</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.a
                  href="#simulador-risco"
                  onClick={(e) => { e.preventDefault(); scrollToSection("simulador-risco", "assessment"); }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3.5 rounded-xl bg-[#C5A059] hover:bg-[#B59049] text-[#0B1E36] font-bold text-sm tracking-wide transition shadow-lg text-center flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <FileCheck className="h-4 w-4" />
                  <span>Simular Aprovação DS-160</span>
                </motion.a>
                
                <motion.a
                  href="#calculadora"
                  onClick={(e) => { e.preventDefault(); scrollToSection("calculadora", "calculator"); }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm tracking-wide transition text-center flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Clock className="h-4 w-4" />
                  <span>Ver Taxas & Prazos</span>
                </motion.a>
              </div>

            </div>

            {/* Right Column: Dynamic Form Widget inside elegant Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#C5A059] to-red-600 rounded-2xl blur opacity-30 animate-pulse" />
              <div className="relative bg-[#15325B] border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl text-left space-y-6">
                
                <div className="space-y-1.5 pb-4 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-[#C5A059]" />
                    <h3 className="font-serif font-bold text-lg text-white">Solicitar Contato</h3>
                  </div>
                  <p className="text-stone-300 text-xs font-sans leading-relaxed">
                    Preencha seu nome e serviço para iniciar seu atendimento instantâneo diretamente no WhatsApp.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleFormSubmit} 
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-stone-300 mb-1">
                          Nome Completo
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                          <input 
                            type="text" 
                            required
                            placeholder="Ex: João da Silva"
                            value={formData.nome}
                            onChange={e => setFormData({ ...formData, nome: e.target.value })}
                            className="w-full pl-9 pr-4 py-2.5 bg-[#0B1E36] border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-[#C5A059] font-sans"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-stone-300 mb-1">
                          Serviço Desejado
                        </label>
                        <select
                          value={formData.servico}
                          onChange={e => setFormData({ ...formData, servico: e.target.value })}
                          className="w-full px-3 py-2.5 bg-[#0B1E36] border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-[#C5A059] font-sans appearance-none cursor-pointer"
                        >
                          <option value="visto_completo">Consultoria para Visto Americano</option>
                          <option value="ds160_review">Preenchimento / Revisão DS-160</option>
                          <option value="passaporte_novo">Passaporte Brasileiro (Novo)</option>
                          <option value="passaporte_renovar">Renovação de Passaporte Vencido</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-stone-300 mb-1">
                          Observações (opcional)
                        </label>
                        <textarea
                          placeholder="Ex: Pretendo viajar em Dezembro deste ano com minha família."
                          value={formData.mensagem}
                          onChange={e => setFormData({ ...formData, mensagem: e.target.value })}
                          className="w-full px-3 py-2 bg-[#0B1E36] border border-white/15 rounded-xl text-white text-xs focus:outline-none focus:border-[#C5A059] font-sans h-20"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center space-x-1.5 cursor-pointer mt-2"
                      >
                        <span>Fale com um Assessor Premium</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center space-y-4"
                    >
                      <div className="inline-flex p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <CheckCircle className="h-8 w-8 text-emerald-400 animate-bounce" />
                      </div>
                      <h4 className="font-serif font-bold text-xl text-white">Solicitação Enviada!</h4>
                      <p className="text-stone-300 text-xs leading-relaxed max-w-sm mx-auto">
                        Obrigado, <strong>{formData.nome}</strong>. Estamos abrindo o WhatsApp para iniciar seu atendimento instantâneo agora.
                      </p>
                      <div className="pt-2">
                        <a
                          href={`https://wa.me/5549999999999?text=${encodeURIComponent(`Olá! Acabo de enviar o formulário no site.\n\n*Nome:* ${formData.nome}\n*Serviço solicitado:* ${formData.servico === "visto_completo" ? "Consultoria Completa para Visto Americano" : formData.servico === "ds160_review" ? "Revisão de DS-160 + Orientações" : formData.servico === "passaporte_novo" ? "Emissão de Passaporte Brasileiro Novo" : "Renovação de Passaporte Vencido"}${formData.mensagem ? `\n\n*Observações:* ${formData.mensagem}` : ""}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition shadow-lg items-center space-x-1.5"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>Clique para abrir o WhatsApp</span>
                        </a>
                      </div>
                      <button
                        onClick={() => { setFormSubmitted(false); setFormData({ nome: "", servico: "visto_completo", mensagem: "" }); }}
                        className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] hover:underline block mx-auto pt-4"
                      >
                        Enviar outro formulário
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE SERVICES SECTION */}
      <section id="servicos" className="py-24 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[#15325B] font-mono text-[10px] font-bold uppercase tracking-wider">
              <Compass className="h-3.5 w-3.5 text-[#15325B]" />
              <span>NOSSAS SOLUÇÕES</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#0B1E36] tracking-tight">
              Assessoria Especializada Passo a Passo
            </h2>
            <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
              Trabalhamos com os serviços mais demandados para viagens internacionais. Cada processo é tratado individualmente por especialistas em direito de imigração e trânsito consular.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            
            {/* Service 1: Visto Americano (Premium Feature Card) */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
              }}
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              className="bg-[#0B1E36] text-white border-2 border-[#C5A059] rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between text-left relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/10 rounded-full blur-2xl transform translate-x-8 -translate-y-8" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="p-4 bg-[#C5A059]/10 text-[#C5A059] rounded-2xl border border-[#C5A059]/30">
                    <Globe className="h-8 w-8 text-[#C5A059]" />
                  </div>
                  <span className="px-3 py-1 bg-[#C5A059]/10 border border-[#C5A059]/30 rounded-full text-[#C5A059] font-mono text-[9px] font-bold uppercase tracking-widest">
                    MAIS PROCURADO
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-serif font-black text-2xl text-white">Consultoria Completa para Visto Americano</h3>
                  <p className="text-stone-300 font-sans text-sm leading-relaxed">
                    Nossa assessoria ponta a ponta para vistos de Turismo (B2), Negócios (B1), Estudos (F1) ou Trânsito. Analisamos seu perfil socioeconômico de forma minuciosa para maximizar os laços de vínculo com o Brasil.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-200">Revisão completa de vínculos</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-200">Preenchimento ideal do formulário</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-200">Emissão de guias de pagamento MRV</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-200">Simulador real de entrevista</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-200">Análise de histórico migratório</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-200">Acompanhamento e suporte pós-coleta</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                <span className="text-stone-400 font-mono text-[10px] uppercase tracking-widest font-semibold">SUPORTE TOTAL DE CABECEIRA</span>
                <a
                  href={`https://wa.me/5549999999999?text=${encodeURIComponent("Olá! Gostaria de iniciar a Consultoria Completa para Visto Americano.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#B59049] text-[#0B1E36] font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shadow-lg w-full sm:w-auto justify-center"
                >
                  <span>Iniciar Assessoria</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Service 2: Preenchimento DS-160 */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
              }}
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              className="bg-stone-50 hover:bg-white border-2 border-stone-200 hover:border-[#C5A059] rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between text-left group"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-4 bg-red-50 text-red-600 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-colors border border-red-100">
                    <FileText className="h-8 w-8" />
                  </div>
                  <span className="px-3 py-1 bg-red-50 border border-red-100 rounded-full text-red-600 font-mono text-[9px] font-bold uppercase tracking-widest">
                    EVITE ERROS COMUNS
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-serif font-black text-2xl text-stone-900 group-hover:text-[#0B1E36] transition-colors">Preenchimento Técnico do Formulário DS-160</h3>
                  <p className="text-stone-600 font-sans text-sm leading-relaxed">
                    O preenchimento incorreto é o causador de mais de 70% das recusas consulares. Nós traduzimos e revisamos linha por linha o formulário oficial do governo norte-americano, eliminando inconsistências graves, erros de digitação e abreviações confusas.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-600">Tradução técnica profissional</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-600">Inserção precisa de histórico</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-600">Preenchimento blindado anti-recusa</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-600">Garantia de exatidão de dados</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-stone-200 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-stone-400 font-mono text-[10px] uppercase tracking-widest font-semibold">MÁXIMA EXATIDÃO DOCUMENTAL</span>
                <a
                  href={`https://wa.me/5549999999999?text=${encodeURIComponent("Olá! Gostaria de ajuda para o preenchimento ou revisão técnica do formulário DS-160.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 w-full sm:w-auto justify-center"
                >
                  <span>Revisar meu DS-160</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Service 3: Passaporte Brasileiro (Novo) */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
              }}
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              className="bg-stone-50 hover:bg-white border-2 border-stone-200 hover:border-[#C5A059] rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between text-left group"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-4 bg-amber-50 text-[#C5A059] rounded-2xl group-hover:bg-[#C5A059] group-hover:text-[#0B1E36] transition-colors border border-amber-100">
                    <Calendar className="h-8 w-8" />
                  </div>
                  <span className="px-3 py-1 bg-amber-50 border border-amber-100 rounded-full text-[#C5A059] font-mono text-[9px] font-bold uppercase tracking-widest">
                    EMISSÃO EXCELENTE
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-serif font-black text-2xl text-stone-900 group-hover:text-[#0B1E36] transition-colors">Solicitação de Passaporte Brasileiro Novo</h3>
                  <p className="text-stone-600 font-sans text-sm leading-relaxed">
                    Cuidamos do processo completo de solicitação do seu passaporte brasileiro junto à Polícia Federal. Preenchemos o cadastro no SINPA, emitimos a GRU de taxa e monitoramos as vagas diárias para agendar seu atendimento presencial o mais rápido possível na sua cidade.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-600">Preenchimento cadastro SINPA</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-600">Geração de GRU (Taxa Federal)</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-600">Agendamento de data rápido</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-600">Consultoria de pendência de documentos</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-stone-200 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-stone-400 font-mono text-[10px] uppercase tracking-widest font-semibold">MONITORAMENTO DIÁRIO DE VAGAS</span>
                <a
                  href={`https://wa.me/5549999999999?text=${encodeURIComponent("Olá! Preciso emitir um novo Passaporte Brasileiro.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 w-full sm:w-auto justify-center"
                >
                  <span>Emitir Passaporte</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Service 4: Renovação de Passaporte */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
              }}
              whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              className="bg-stone-50 hover:bg-white border-2 border-stone-200 hover:border-[#C5A059] rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between text-left group"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-4 bg-stone-100 text-stone-700 rounded-2xl group-hover:bg-[#0B1E36] group-hover:text-white transition-colors border border-stone-200">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <span className="px-3 py-1 bg-stone-100 border border-stone-200 rounded-full text-stone-700 font-mono text-[9px] font-bold uppercase tracking-widest">
                    VISTO ANTIGO PRESERVADO
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-serif font-black text-2xl text-stone-900 group-hover:text-[#0B1E36] transition-colors">Renovação de Passaporte Brasileiro</h3>
                  <p className="text-stone-600 font-sans text-sm leading-relaxed">
                    Para viajantes frequentes que possuem o passaporte expirado ou prestes a expirar. Prestamos consultoria cuidadosa para a manutenção e conservação física de vistos anteriores válidos no passaporte antigo (grampeamento ideal).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-600">Preservação de vistos anteriores</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-600">Renovação por mudança de sobrenome</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-600">Transferência legal de vistos</span>
                    </div>
                    <div className="flex items-start space-x-2.5">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-600">Resolução de pendências com PF</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-stone-200 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-stone-400 font-mono text-[10px] uppercase tracking-widest font-semibold">ATUALIZAÇÃO DE IDENTIDADE CIVIL</span>
                <a
                  href={`https://wa.me/5549999999999?text=${encodeURIComponent("Olá! Preciso renovar meu Passaporte Brasileiro vencido ou prestes a vencer.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 w-full sm:w-auto justify-center"
                >
                  <span>Renovar meu Passaporte</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

          </motion.div>

          {/* Quick interactive call out */}
          <div className="mt-12 bg-gradient-to-r from-[#0B1E36] to-[#15325B] rounded-2xl p-6 sm:p-8 text-left text-white border border-[#C5A059]/30 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-2">
              <span className="text-[9px] font-mono font-bold text-[#C5A059] uppercase tracking-widest block">ALERTA DE SEGURANÇA</span>
              <p className="font-serif font-bold text-lg sm:text-xl">Precisa emitir passaporte e visto de forma urgente para uma viagem marcada?</p>
              <p className="text-stone-300 text-xs font-sans max-w-2xl leading-relaxed">Oferecemos consultoria em modalidade expresso com triagem e preenchimento de documentos em até 24 horas úteis para acelerar sua data.</p>
            </div>
            <a 
              href="https://wa.me/5549999999999?text=Ola!+Preciso+de+atendimento+urgente+para+visto+ou+passaporte."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition shrink-0 shadow flex items-center space-x-1.5"
            >
              <span>Atendimento Urgente</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

        </div>
      </section>

      {/* INTERACTIVE DS-160 RISK ASSESSMENT WORKFLOW */}
      <section id="simulador-risco" className="py-24 bg-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full text-amber-800 font-mono text-[10px] font-bold uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
              <span>SIMULAÇÃO DE PERFIL</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#0B1E36] tracking-tight">
              Análise Prévia de Vínculos Consulares
            </h2>
            <p className="text-stone-600 font-sans text-sm max-w-2xl mx-auto leading-relaxed">
              O consulado americano analisa principalmente se você tem intenção de residir ilegalmente. Faça nossa simulação de bonds e verifique a solidez do seu perfil em 4 etapas.
            </p>
          </div>

          <div className="bg-white border border-stone-200/80 rounded-2xl shadow-xl overflow-hidden p-6 sm:p-10 text-left">
            
            {/* Steps tracker indicators */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-6 mb-8">
              <span className="font-mono text-[10px] text-stone-400 font-bold uppercase tracking-wider">ETAPA {assessmentStep} DE 5</span>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div 
                    key={s} 
                    className={`w-5 h-1 rounded-full transition-colors ${assessmentStep >= s ? "bg-[#15325B]" : "bg-stone-200"}`} 
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {assessmentStep === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: -20 }}
                  className="space-y-6"
                >
                  <h3 className="font-serif font-black text-xl text-stone-900">1. Validade do seu Passaporte Atual</h3>
                  <p className="text-stone-600 text-xs font-sans leading-relaxed">
                    Para solicitar qualquer visto internacional, seu passaporte brasileiro precisa possuir validade mínima ao viajar. Como está o seu passaporte?
                  </p>
                  
                  <div className="space-y-3 pt-2">
                    <button
                      onClick={() => setHasValidPassport("yes_long")}
                      className={`w-full p-4 rounded-xl border text-left font-sans text-xs flex items-center justify-between transition ${hasValidPassport === "yes_long" ? "bg-blue-50/50 border-[#15325B] text-[#15325B] font-bold" : "border-stone-200 text-stone-700 hover:bg-stone-50"}`}
                    >
                      <span>Está válido por mais de 6 meses além da viagem planejada</span>
                      <CheckCircle className={`h-4 w-4 shrink-0 ${hasValidPassport === "yes_long" ? "text-[#15325B]" : "text-stone-300"}`} />
                    </button>
                    <button
                      onClick={() => setHasValidPassport("yes_short")}
                      className={`w-full p-4 rounded-xl border text-left font-sans text-xs flex items-center justify-between transition ${hasValidPassport === "yes_short" ? "bg-blue-50/50 border-[#15325B] text-[#15325B] font-bold" : "border-stone-200 text-stone-700 hover:bg-stone-50"}`}
                    >
                      <span>Está válido, mas vence em menos de 6 meses</span>
                      <CheckCircle className={`h-4 w-4 shrink-0 ${hasValidPassport === "yes_short" ? "text-[#15325B]" : "text-stone-300"}`} />
                    </button>
                    <button
                      onClick={() => setHasValidPassport("no_expired")}
                      className={`w-full p-4 rounded-xl border text-left font-sans text-xs flex items-center justify-between transition ${hasValidPassport === "no_expired" ? "bg-blue-50/50 border-[#15325B] text-[#15325B] font-bold" : "border-stone-200 text-stone-700 hover:bg-stone-50"}`}
                    >
                      <span>Não tenho passaporte / Está completamente vencido</span>
                      <CheckCircle className={`h-4 w-4 shrink-0 ${hasValidPassport === "no_expired" ? "text-[#15325B]" : "text-stone-300"}`} />
                    </button>
                  </div>
                </motion.div>
              )}

              {assessmentStep === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: -20 }}
                  className="space-y-6"
                >
                  <h3 className="font-serif font-black text-xl text-stone-900">2. Histórico de Visto e Imigração</h3>
                  <p className="text-stone-600 text-xs font-sans leading-relaxed">
                    Você já teve alguma solicitação de visto americano negada, ou algum problema de permanência em outro país parceiro anteriormente?
                  </p>

                  <div className="space-y-3 pt-2">
                    <button
                      onClick={() => setHasDeniedVisa("no")}
                      className={`w-full p-4 rounded-xl border text-left font-sans text-xs flex items-center justify-between transition ${hasDeniedVisa === "no" ? "bg-blue-50/50 border-[#15325B] text-[#15325B] font-bold" : "border-stone-200 text-stone-700 hover:bg-stone-50"}`}
                    >
                      <span>Não, nunca tive visto negado ou nunca solicitei visto</span>
                      <CheckCircle className={`h-4 w-4 shrink-0 ${hasDeniedVisa === "no" ? "text-[#15325B]" : "text-stone-300"}`} />
                    </button>
                    <button
                      onClick={() => setHasDeniedVisa("yes_long_ago")}
                      className={`w-full p-4 rounded-xl border text-left font-sans text-xs flex items-center justify-between transition ${hasDeniedVisa === "yes_long_ago" ? "bg-blue-50/50 border-[#15325B] text-[#15325B] font-bold" : "border-stone-200 text-stone-700 hover:bg-stone-50"}`}
                    >
                      <span>Sim, tive visto negado há mais de 1 ano</span>
                      <CheckCircle className={`h-4 w-4 shrink-0 ${hasDeniedVisa === "yes_long_ago" ? "text-[#15325B]" : "text-stone-300"}`} />
                    </button>
                    <button
                      onClick={() => setHasDeniedVisa("yes_recent")}
                      className={`w-full p-4 rounded-xl border text-left font-sans text-xs flex items-center justify-between transition ${hasDeniedVisa === "yes_recent" ? "bg-blue-50/50 border-[#15325B] text-[#15325B] font-bold" : "border-stone-200 text-stone-700 hover:bg-stone-50"}`}
                    >
                      <span>Sim, tive visto negado recentemente (menos de 1 ano)</span>
                      <CheckCircle className={`h-4 w-4 shrink-0 ${hasDeniedVisa === "yes_recent" ? "text-[#15325B]" : "text-stone-300"}`} />
                    </button>
                  </div>
                </motion.div>
              )}

              {assessmentStep === 3 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: -20 }}
                  className="space-y-6"
                >
                  <h3 className="font-serif font-black text-xl text-stone-900">3. Vínculos Ativos no Brasil (Bonds)</h3>
                  <p className="text-stone-600 text-xs font-sans leading-relaxed">
                    Selecione quais das opções abaixo representam sua estabilidade e vínculos vigentes no Brasil (pode selecionar múltiplas opções):
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { key: "trabalho_clt", label: "Trabalho CLT há +1 ano" },
                      { key: "empresa_cnpj", label: "Empresário / Sócio de CNPJ ativo" },
                      { key: "imovel_proprio", label: "Possuo Imóvel ou Terreno próprio" },
                      { key: "universitario", label: "Estudante Universitário / Pós" },
                      { key: "funcionario_publico", label: "Funcionário Público Estatuário" },
                      { key: "familia_estavel", label: "Casado ou com filhos residindo" }
                    ].map((bond) => {
                      const selected = hasBonds.includes(bond.key);
                      return (
                        <button
                          key={bond.key}
                          onClick={() => handleBondToggle(bond.key)}
                          className={`p-4 rounded-xl border text-left font-sans text-xs flex items-center justify-between transition ${selected ? "bg-blue-50/50 border-[#15325B] text-[#15325B] font-bold" : "border-stone-200 text-stone-700 hover:bg-stone-50"}`}
                        >
                          <span>{bond.label}</span>
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${selected ? "border-[#15325B] bg-[#15325B] text-white" : "border-stone-300 bg-white"}`}>
                            {selected && <Check className="h-3 w-3" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {assessmentStep === 4 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: -20 }}
                  className="space-y-6"
                >
                  <h3 className="font-serif font-black text-xl text-stone-900">4. Renda Mensal Declarada</h3>
                  <p className="text-stone-600 text-xs font-sans leading-relaxed">
                    Sua renda mensal declarada e comprovada no Brasil via holerites, extratos ou imposto de renda. Selecione a faixa aproximada:
                  </p>

                  <div className="space-y-3 pt-2">
                    <button
                      onClick={() => setIncomeLevel("high")}
                      className={`w-full p-4 rounded-xl border text-left font-sans text-xs flex items-center justify-between transition ${incomeLevel === "high" ? "bg-blue-50/50 border-[#15325B] text-[#15325B] font-bold" : "border-stone-200 text-stone-700 hover:bg-stone-50"}`}
                    >
                      <span>Acima de R$ 8.000,00 por mês</span>
                      <CheckCircle className={`h-4 w-4 shrink-0 ${incomeLevel === "high" ? "text-[#15325B]" : "text-stone-300"}`} />
                    </button>
                    <button
                      onClick={() => setIncomeLevel("medium")}
                      className={`w-full p-4 rounded-xl border text-left font-sans text-xs flex items-center justify-between transition ${incomeLevel === "medium" ? "bg-blue-50/50 border-[#15325B] text-[#15325B] font-bold" : "border-stone-200 text-stone-700 hover:bg-stone-50"}`}
                    >
                      <span>Entre R$ 3.500,00 e R$ 8.000,00 por mês</span>
                      <CheckCircle className={`h-4 w-4 shrink-0 ${incomeLevel === "medium" ? "text-[#15325B]" : "text-stone-300"}`} />
                    </button>
                    <button
                      onClick={() => setIncomeLevel("low")}
                      className={`w-full p-4 rounded-xl border text-left font-sans text-xs flex items-center justify-between transition ${incomeLevel === "low" ? "bg-blue-50/50 border-[#15325B] text-[#15325B] font-bold" : "border-stone-200 text-stone-700 hover:bg-stone-50"}`}
                    >
                      <span>Até R$ 3.500,00 por mês</span>
                      <CheckCircle className={`h-4 w-4 shrink-0 ${incomeLevel === "low" ? "text-[#15325B]" : "text-stone-300"}`} />
                    </button>
                  </div>
                </motion.div>
              )}

              {assessmentStep === 5 && assessmentResult && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 p-5 rounded-xl border bg-stone-50">
                    <div className="text-center sm:text-left">
                      <span className="text-[10px] font-mono text-stone-400 font-bold block uppercase tracking-wider">ÍNDICE DE SOLIDEZ</span>
                      <span className="font-serif font-black text-3xl text-[#15325B]">{assessmentResult.score}%</span>
                    </div>
                    <div className="text-center sm:text-right">
                      <span className="text-[10px] font-mono text-stone-400 font-bold block uppercase tracking-wider">CLASSIFICAÇÃO DO PERFIL</span>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${assessmentResult.color} mt-1`}>
                        {assessmentResult.badge}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-sans font-bold text-stone-800 text-sm">Próximos Passos Recomendados:</h4>
                    <ul className="space-y-2.5 text-xs text-stone-600 font-sans">
                      {assessmentResult.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0B1E36] text-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                    <div className="space-y-1 text-center sm:text-left">
                      <p className="font-serif font-bold text-sm">Queremos otimizar o seu índice para 99%</p>
                      <p className="text-stone-400 text-[10px] font-sans">Fornecemos mentoria personalizada e simulação do questionário real do consulado.</p>
                    </div>
                    <a
                      href={`https://wa.me/5549999999999?text=Ola!+Fiz+o+teste+de+vistos+e+meu+indice+de+solidez+deu+${assessmentResult.score}%.+Gostaria+de+apoiar+com+assessoria.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#C5A059] hover:bg-[#B59049] text-[#0B1E36] font-bold text-xs uppercase rounded-lg shadow transition"
                    >
                      Apoiar Meu Perfil
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center border-t border-stone-100 pt-6 mt-8">
              {assessmentStep > 1 && (
                <button
                  onClick={() => setAssessmentStep(prev => prev - 1)}
                  className="px-4 py-2 border border-stone-200 text-stone-600 hover:bg-stone-50 font-mono text-[10px] font-black uppercase tracking-wider rounded-lg transition"
                >
                  Voltar
                </button>
              )}
              
              {assessmentStep === 5 ? (
                <button
                  onClick={resetAssessment}
                  className="ml-auto px-4 py-2 border border-[#C5A059]/30 text-[#15325B] hover:bg-stone-50 font-mono text-[10px] font-black uppercase tracking-wider rounded-lg transition"
                >
                  Reiniciar Simulação
                </button>
              ) : (
                <button
                  onClick={handleNextAssessment}
                  className="ml-auto px-5 py-2.5 bg-[#15325B] hover:bg-[#0B1E36] text-white font-mono text-[10px] font-black uppercase tracking-wider rounded-lg transition flex items-center space-x-1"
                >
                  <span>{assessmentStep === 4 ? "Ver Diagnóstico" : "Avançar"}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* DYNAMIC FEE & TIMELINE CALCULATOR */}
      <section id="calculadora" className="py-24 bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
            
            {/* Left Column: Form Parameters */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-red-50 border border-red-100 rounded-full text-red-700 font-mono text-[10px] font-bold uppercase tracking-wider">
                <Compass className="h-3.5 w-3.5" />
                <span>SIMULADOR DE TAXAS OFICIAIS</span>
              </div>
              <h2 className="font-serif text-3xl font-black text-[#0B1E36] tracking-tight leading-tight">
                Simulador de Investimento e Prazos Consulares
              </h2>
              <p className="text-stone-600 font-sans text-xs sm:text-sm leading-relaxed">
                As taxas de visto americano (Taxa MRV) e as taxas da Polícia Federal para passaporte são tabeladas de forma oficial pelo governo. Calcule o custo final com assessoria e descontos familiares.
              </p>

              <div className="space-y-4 pt-4">
                
                {/* 1. Select Service */}
                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-2">
                    1. Escolha o Serviço Pretendido
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(Object.keys(PRICING_DATA) as ServiceType[]).map((serviceKey) => (
                      <button
                        key={serviceKey}
                        onClick={() => setCalcService(serviceKey)}
                        className={`p-3 rounded-xl border text-left transition text-xs font-sans ${calcService === serviceKey ? "bg-[#15325B] border-[#15325B] text-white font-bold" : "border-stone-200 text-stone-700 bg-stone-50 hover:bg-stone-100"}`}
                      >
                        {PRICING_DATA[serviceKey].name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Select Applicants Count */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                      2. Quantidade de Solicitantes
                    </label>
                    <span className="font-mono text-xs text-[#C5A059] font-bold">
                      {calcApplicants} {calcApplicants === 1 ? "Pessoa" : "Pessoas"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="1"
                    value={calcApplicants}
                    onChange={(e) => setCalcApplicants(parseInt(e.target.value))}
                    className="w-full accent-[#C5A059]"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-stone-400 mt-1">
                    <span>1 (Individual)</span>
                    <span>3 (Família - 8% Desconto)</span>
                    <span>6+ (Entrar em contato)</span>
                  </div>
                </div>

                {/* 3. Urgency Check */}
                <div className="p-4 rounded-xl border border-stone-200/60 bg-stone-50 flex items-center justify-between">
                  <div className="space-y-0.5 text-left pr-4">
                    <span className="font-sans font-bold text-stone-800 text-xs block">Atendimento Expresso de Urgência?</span>
                    <span className="text-stone-500 text-[10px] leading-snug block">Reduz o prazo de preenchimento e agendamento da assessoria em 40%.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={calcUrgency}
                    onChange={(e) => setCalcUrgency(e.target.checked)}
                    className="w-5 h-5 accent-red-600 cursor-pointer"
                  />
                </div>

              </div>
            </div>

            {/* Right Column: Display computed price card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-[#C5A059]/40 bg-[#0B1E36] text-white p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-full blur-2xl" />
                
                <h3 className="font-serif font-black text-lg text-[#C5A059] border-b border-white/10 pb-4">
                  Resumo do Investimento Estimado
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-300">Serviço Selecionado:</span>
                    <span className="font-bold">{PRICING_DATA[calcService].name}</span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-stone-300">Taxas Governamentais ({calcApplicants}x):</span>
                    <span className="font-mono">R$ {calcResults.consularTotal.toLocaleString("pt-BR")},00</span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-stone-300">Honorários Assessoria ({calcApplicants}x):</span>
                    <span className="font-mono">R$ {(PRICING_DATA[calcService].advisoryFee * calcApplicants).toLocaleString("pt-BR")},00</span>
                  </div>

                  {calcResults.discountAmount > 0 && (
                    <div className="flex justify-between text-xs text-emerald-400">
                      <span>Desconto Familiar (8%):</span>
                      <span className="font-mono">- R$ {calcResults.discountAmount.toLocaleString("pt-BR")},00</span>
                    </div>
                  )}

                  {calcUrgency && (
                    <div className="flex justify-between text-xs text-red-400">
                      <span>Taxa de Urgência:</span>
                      <span className="font-mono">+ R$ {(150 * calcApplicants).toLocaleString("pt-BR")},00</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                    <span className="text-xs text-stone-300 font-bold">Investimento Total Estimado:</span>
                    <div className="text-right">
                      <span className="font-mono text-xl sm:text-2xl font-black text-[#C5A059]">R$ {calcResults.total.toLocaleString("pt-BR")},00</span>
                      <p className="text-[9px] text-stone-400 mt-1 font-mono">Governo R$ {calcResults.consularTotal} // Assessoria R$ {calcResults.advisoryTotal}</p>
                    </div>
                  </div>
                </div>

                {/* Delivery Time Estimation Box */}
                <div className="p-4 rounded-xl bg-[#15325B] border border-white/10 space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#C5A059]">
                    <Clock className="h-4 w-4" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider">PRAZO ESTIMADO DE PROCESSAMENTO</span>
                  </div>
                  <p className="font-serif font-bold text-base text-white">~ {calcResults.days} dias úteis</p>
                  <p className="text-stone-400 text-[10px] leading-relaxed">
                    Tempo estimado para finalização da coleta de documentos, agendamentos no CASV e entrevista consular em capitais parceiras.
                  </p>
                </div>

                <a 
                  href={`https://wa.me/5549999999999?text=Ola!+Fiz+a+simulacao+pela+calculadora+para+${PRICING_DATA[calcService].name}+com+${calcApplicants}+solicitantes.+Gostaria+de+saber+os+proximos+passos.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition text-center block shadow-lg cursor-pointer"
                >
                  Avançar e Agendar Atendimento
                </a>

              </div>
            </div>

          </div>

          {/* Detailed Document Checklist (Generates dynamically based on service) */}
          <div className="mt-16 bg-stone-50 rounded-2xl p-6 sm:p-10 border border-stone-200/80 text-left">
            <div className="flex items-center space-x-2.5 mb-6">
              <FileCheck className="h-5 w-5 text-[#15325B]" />
              <h3 className="font-serif font-black text-lg text-[#0B1E36]">Documentação Obrigatória Geral</h3>
            </div>
            
            <p className="text-stone-600 text-xs sm:text-sm font-sans mb-6 leading-relaxed">
              Baseado no serviço de <strong>{PRICING_DATA[calcService].name}</strong>, você precisará providenciar e apresentar os seguintes documentos na Polícia Federal ou Centro de Atendimento Consular:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Documento de Identidade RG / CNH", desc: "RG original em perfeito estado emitido há menos de 10 anos ou CNH com foto." },
                { title: "Comprovante de Quitação Eleitoral", desc: "Necessário estar regular perante a Justiça Eleitoral (verificamos para você)." },
                { title: "Formulário de Confirmação DS-160", desc: "Apenas para visto americano. Entregamos a folha oficial com código de barras ativo." },
                { title: "Comprovantes de Atividade Financeira", desc: "Extratos bancários dos últimos 3 meses, Imposto de Renda completo ou holerites." },
                { title: "Passaporte Anterior com Visto Expira", desc: "Se houver visto anterior emitido na infância ou adolescência para transferência." },
                { title: "Certidões de Casamento / Divórcio", desc: "Se houver alteração de nome civil não atualizada nos documentos principais." }
              ].map((doc, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl border border-stone-200/60 flex items-start space-x-3 shadow-sm">
                  <div className="p-1 rounded bg-blue-50 text-[#15325B] shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-stone-800 text-xs">{doc.title}</h5>
                    <p className="text-stone-500 text-[10px] leading-relaxed mt-0.5">{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* DETAILED PERGUNTAS FREQUENTES (FAQ ACCORDION) */}
      <section id="perguntas" className="py-24 bg-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-50 border border-amber-100 rounded-full text-amber-800 font-mono text-[10px] font-bold uppercase tracking-wider">
              <HelpCircle className="h-3.5 w-3.5 text-amber-600" />
              <span>DÚVIDAS FREQUENTES</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#0B1E36] tracking-tight">
              Tudo o que você precisa saber antes de solicitar
            </h2>
            <p className="text-stone-600 font-sans text-sm max-w-2xl mx-auto leading-relaxed">
              Ainda tem dúvidas sobre as taxas consulares, agendamento de datas ou processo de renovação? Veja as respostas diretas dos nossos assessores.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Como funciona a consultoria para tirar o visto americano?",
                a: "Nossa consultoria cuida de todas as etapas burocráticas: analisamos seu perfil de vínculos, preenchemos o complexo formulário governamental DS-160 em inglês, realizamos o pagamento da taxa consular MRV, agendamos as datas no CASV e Consulado de acordo com sua disponibilidade e realizamos um treinamento simulado de entrevista focado nas suas respostas."
              },
              {
                q: "Quanto tempo demora o processo de visto americano?",
                a: "O tempo total varia de acordo com a fila de agendamentos do consulado escolhido (São Paulo, Rio de Janeiro, Brasília, Porto Alegre ou Recife). O preenchimento do formulário e triagem do perfil por nossa equipe leva até 3 dias úteis (ou 24h na modalidade expressa), mas as datas consulares dependem da disponibilidade governamental."
              },
              {
                q: "O que acontece se meu visto for negado?",
                a: "Embora nossa taxa de aprovação seja superior a 98%, a decisão final cabe exclusivamente ao oficial consular soberano. Caso ocorra a negação, analisamos o motivo dado pelo consulado (geralmente sob o artigo 214b por falta de vínculos) e refazemos o planejamento estratégico para uma nova tentativa corrigindo as falhas do perfil."
              },
              {
                q: "Qual a diferença entre o CASV e o Consulado?",
                a: "No CASV você faz apenas a coleta de dados biométricos (digitais) e foto oficial, sem entrevista. No Consulado, você passa pela entrevista oficial com o diplomata americano que decidirá a aprovação do seu visto. Oferecemos assessoria detalhada para ambos os locais."
              },
              {
                q: "Como renovar o passaporte brasileiro vencido?",
                a: "A Polícia Federal não realiza 'renovação' literal: é emitido um novo passaporte físico. Cuidamos do preenchimento da solicitação no sistema oficial, geramos a guia de pagamento da GRU (R$ 257,25) e agendamos o seu comparecimento ao posto da PF mais próximo para coleta de digitais e foto."
              }
            ].map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm transition-all text-left"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-serif font-bold text-stone-900 text-sm sm:text-base pr-4">
                      {faq.q}
                    </span>
                    <span className={`p-1.5 rounded-full bg-stone-100 text-stone-500 transition-transform ${isExpanded ? "rotate-180 bg-blue-50 text-[#15325B]" : ""}`}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-stone-100"
                      >
                        <p className="p-5 text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* BLOG / DETAILED TIPS SHOWCASE (SEO-focused as required) */}
      <section id="blog" className="py-24 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-red-50 border border-red-100 rounded-full text-red-700 font-mono text-[10px] font-bold uppercase tracking-wider">
              <FileText className="h-3.5 w-3.5" />
              <span>DICAS & ARTIGOS DE IMIGRAÇÃO</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#0B1E36] tracking-tight">
              Blog de Dicas Práticas e Preparação
            </h2>
            <p className="text-stone-600 font-sans text-sm leading-relaxed">
              Mantenha-se informado sobre os procedimentos da Polícia Federal e exigências consulares dos Estados Unidos. Conteúdo atualizado constantemente por nossa equipe técnica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <div 
                key={post.id}
                className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-200/80 hover:border-[#C5A059] shadow-sm transition flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      onError={handleImageError}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-mono font-bold text-stone-700 shadow">
                      {post.date}
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="text-[9px] font-mono font-bold text-[#C5A059] uppercase tracking-wider block">{post.readTime}</span>
                    <h3 className="font-serif font-black text-base text-stone-900 group-hover:text-[#15325B] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-stone-600 font-sans text-xs leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-stone-200/50 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedPostId(post.id)}
                    className="text-[#15325B] hover:text-[#0B1E36] font-mono text-[10px] font-bold uppercase tracking-wider hover:underline"
                  >
                    Ler Artigo Completo
                  </button>
                  <span className="p-1 rounded bg-[#15325B]/5 text-[#15325B] group-hover:bg-[#15325B] group-hover:text-white transition-colors">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Selected Blog Post Modal Lightbox */}
        <AnimatePresence>
          {selectedPostId !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-stone-200 shadow-2xl relative text-left"
                onClick={(e) => e.stopPropagation()}
              >
                
                {/* Header Image of post */}
                <div className="relative h-48 sm:h-64 bg-stone-100 overflow-hidden">
                  <img 
                    src={BLOG_POSTS.find(p => p.id === selectedPostId)?.image} 
                    alt="Blog Post Header" 
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <button
                    onClick={() => setSelectedPostId(null)}
                    className="absolute top-4 right-4 text-stone-700 bg-white hover:bg-stone-100 p-2 rounded-full transition shadow font-bold text-xs uppercase"
                  >
                    Fechar ×
                  </button>
                </div>

                {/* Content body */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="flex items-center space-x-3 text-stone-500 font-mono text-xs border-b border-stone-100 pb-4">
                    <span>{BLOG_POSTS.find(p => p.id === selectedPostId)?.date}</span>
                    <span>•</span>
                    <span>{BLOG_POSTS.find(p => p.id === selectedPostId)?.readTime}</span>
                  </div>

                  <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#0B1E36]">
                    {BLOG_POSTS.find(p => p.id === selectedPostId)?.title}
                  </h3>

                  <div className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-4">
                    {BLOG_POSTS.find(p => p.id === selectedPostId)?.content}
                  </div>

                  <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-stone-500 font-sans">
                      Dúvidas sobre esses passos? Podemos lhe assessorar pessoalmente.
                    </p>
                    <a
                      href={`https://wa.me/5549999999999?text=Ola!+Li+o+artigo+sobre+${encodeURIComponent(BLOG_POSTS.find(p => p.id === selectedPostId)?.title || "")}+e+gostaria+de+saber+mais.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase shadow transition flex items-center space-x-1.5"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Conversar com Assessor</span>
                    </a>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="py-24 bg-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="space-y-4 mb-16">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#15325B]/5 border border-[#15325B]/10 rounded-full text-[#15325B] font-mono text-[10px] font-bold uppercase tracking-wider">
              <Award className="h-3.5 w-3.5 text-[#15325B]" />
              <span>OPINIÃO DE QUEM JÁ VIAJOU</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#0B1E36] tracking-tight">
              Histórias de Sucesso Reais
            </h2>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-lg text-left relative">
            <div className="absolute top-6 right-8 text-stone-100 font-serif font-bold text-7xl select-none leading-none">“</div>
            
            <div className="space-y-6 relative z-10">
              
              <div className="flex items-center space-x-1 text-[#C5A059]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>

              <p className="text-stone-700 font-serif text-base sm:text-lg italic leading-relaxed">
                {[
                  "Fiquei com muito receio de fazer sozinha por conta do preenchimento em inglês das perguntas profissionais. Contratei a Visto Certo e eles revisaram todo o meu DS-160 e montaram um treinamento de entrevista que foi idêntico às perguntas feitas pelo consulado em SP. Visto aprovado em menos de 10 minutos!",
                  "Processo super transparente. Gerei minha guia do passaporte PF diretamente com eles e agendaram meu horário de coleta no dia seguinte. Atendimento premium e suporte atencioso no WhatsApp a qualquer hora.",
                  "Minha família de 4 pessoas realizou a solicitação de visto junta. O desconto oferecido pela assessoria de família ajudou bastante e todos foram aprovados com extrema tranquilidade. Super recomendo a assessoria deles!"
                ][activeTestimonial]}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-[#15325B] font-bold text-xs flex items-center justify-center border border-[#C5A059]/30">
                    {["AM", "RG", "ML"][activeTestimonial]}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-stone-900 text-sm">
                      {["Amanda Mendes", "Rodrigo Guedes", "Família Marcondes"][activeTestimonial]}
                    </h4>
                    <span className="text-stone-500 text-[10px] font-mono uppercase tracking-wider block">
                      {["Visto de Turismo (B2) Aprovado", "Passaporte PF Emitido", "Visto de Turismo (B2) Aprovado"][activeTestimonial]}
                    </span>
                  </div>
                </div>

                {/* Bullets control */}
                <div className="flex space-x-1.5">
                  {[0, 1, 2].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${activeTestimonial === idx ? "bg-[#15325B]" : "bg-stone-200"}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* DETAILED PREMIUM FOOTER & MAP ADDRESS */}
      <footer className="bg-[#0B1E36] text-white pt-16 pb-12 border-t border-[#C5A059]/20 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
            
            {/* Branding Column */}
            <div className="space-y-4 col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#15325B] to-[#0B1E36] border border-[#C5A059] shadow">
                  <Globe className="h-5 w-5 text-[#C5A059]" />
                </div>
                <div>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="font-serif font-black tracking-tight text-base text-white">VISTO</span>
                    <span className="font-serif font-light text-base text-[#C5A059]">CERTO</span>
                  </div>
                  <span className="font-mono text-[8px] text-white/50 block uppercase tracking-widest font-bold">ASSESSORIA INTERNACIONAL</span>
                </div>
              </div>
              <p className="text-stone-300 text-xs font-sans max-w-sm leading-relaxed">
                Consultoria e assessoria especializada para preenchimento de formulários e agendamento de passaporte e visto junto aos órgãos oficiais Polícia Federal e Consulado Geral dos EUA.
              </p>
              <div className="flex items-center space-x-4 pt-1">
                <div className="flex items-center space-x-1.5 text-[#C5A059]">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider">CONEXÃO SSL SEGURA</span>
                </div>
                <div className="flex items-center space-x-1.5 text-stone-400">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider">PLATAFORMA ATIVA</span>
                </div>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] text-[#C5A059] font-bold uppercase tracking-widest">
                SERVIÇOS CONSULARES
              </h4>
              <ul className="space-y-2 text-stone-300 text-xs">
                <li><a href="#servicos" onClick={() => setActiveTab("services")} className="hover:text-white transition">Visto de Turismo (B2)</a></li>
                <li><a href="#servicos" onClick={() => setActiveTab("services")} className="hover:text-white transition">Formulário DS-160</a></li>
                <li><a href="#servicos" onClick={() => setActiveTab("services")} className="hover:text-white transition">Passaporte Polícia Federal</a></li>
                <li><a href="#servicos" onClick={() => setActiveTab("services")} className="hover:text-white transition">Renovação Expresso</a></li>
              </ul>
            </div>

            {/* Location & Contact Column */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] text-[#C5A059] font-bold uppercase tracking-widest">
                SEDE ATENDIMENTO
              </h4>
              <div className="text-stone-300 text-xs space-y-2 font-sans">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <p>Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Mail className="h-4 w-4 text-[#C5A059] shrink-0 mt-0.5" />
                  <p>contato@vistocertoassessoria.com.br</p>
                </div>
              </div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
            <p className="text-stone-400 text-[10px] font-mono uppercase tracking-[0.1em]">
              © {new Date().getFullYear()} Visto Certo Assessoria. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-[9px] text-stone-400 font-mono leading-relaxed max-w-md text-center md:text-right">
                Isenção de responsabilidade: A Visto Certo é uma empresa de assessoria privada e independente, sem filiação direta ou chancela da Polícia Federal ou Embaixada dos Estados Unidos.
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* Dynamic Airplane Crossing Animation (Requested) */}
      <AnimatePresence>
        {showPlane && (
          <motion.div
            initial={{ x: "20vw", y: "20vh", rotate: -30, scale: 0.4, opacity: 0 }}
            animate={{ 
              x: "-120vw", 
              y: "-120vh", 
              rotate: -30, 
              scale: [0.4, 0.8, 0.5], 
              opacity: [0, 0.9, 0.9, 0.5, 0] 
            }}
            transition={{ 
              duration: 9, 
              ease: "easeInOut" 
            }}
            className="fixed bottom-10 right-10 z-50 pointer-events-none w-44 sm:w-60"
          >
            <img 
              src="https://static.vecteezy.com/system/resources/thumbnails/047/308/076/small/passenger-jet-on-clear-background-free-png.png" 
              alt="Avião cruzando a tela" 
              referrerPolicy="no-referrer"
              className="w-full h-auto drop-shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
