import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sprout, 
  CheckCircle, 
  Truck, 
  MessageSquare, 
  MapPin, 
  Phone, 
  Clock, 
  HelpCircle, 
  Calculator, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Leaf, 
  Search, 
  Layers, 
  TrendingUp, 
  ChevronDown,
  Navigation,
  Globe,
  Award
} from "lucide-react";

// SEO components
import { Breadcrumb, ProductSchema, MetaTags } from "../seo/SEOComponents";
import InternalLinker from "../seo/InternalLinker";

// Images provided by the user
const logoImg = "https://scontent-gru2-2.xx.fbcdn.net/v/t39.30808-6/217702713_207539931376442_835766243087721509_n.jpg?stp=dst-jpg_tt6&cstp=mx180x180&ctp=s180x180&_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=fwD3SZKNQGMQ7kNvwHsoVRG&_nc_oc=AdpE9aiqny7V45bxxG3VUW2pD6xseSANH85QjqbNAi8iCjsAcsoyR4zJDyEhZQYB91k&_nc_zt=23&_nc_ht=scontent-gru2-2.xx&_nc_gid=4ziY5ZhqfvnME_oFIUzEhg&_nc_ss=7b289&oh=00_AQB80Z8CyASorRL-g-OGD6rK3LA4O2eE3Bja1oPYBVRCYA&oe=6A605769";
const pastureImg = "https://scontent-gru2-2.xx.fbcdn.net/v/t39.30808-6/495587461_1255637539900004_9044154546783021774_n.jpg?stp=dst-jpg_tt6&cstp=mx1000x1779&ctp=s1000x1779&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=P2Ey_00b1BAQ7kNvwGOADKs&_nc_oc=Adrp-2K1fa-k4cum_q1Z6krVLuQ6bJvVTX5eRKQGmjcP5T35TsVVVrU24vGSKVkRxqg&_nc_zt=23&_nc_ht=scontent-gru2-2.xx&_nc_gid=JeunBkO51aJKfUwiwDUTEg&_nc_ss=7b289&oh=00_AQDvXpuvtfKUDZu9GbXc7sq5iIBD7XcEjOl2J_0-8MwhtQ&oe=6A6066EA";

interface PastureVariety {
  name: string;
  scientificName: string;
  type: string;
  protein: string;
  dryMatter: string;
  soilFertility: string;
  droughtResistance: string;
  bestFor: string;
  description: string;
}

const PASTURE_VARIETIES: PastureVariety[] = [
  {
    name: "Tifton 85",
    scientificName: "Cynodon dactylon",
    type: "Muda de Alta Densidade",
    protein: "11% a 15%",
    dryMatter: "18 a 22 ton/ha/ano",
    soilFertility: "Alta / Corrigida",
    droughtResistance: "Média-Alta",
    bestFor: "Gado de Leite, Gado de Corte, Equinos e Ovinos de alta exigência",
    description: "Referência nacional em valor nutritivo e palatabilidade. Resposta excepcional à adubação e irrigação com altíssima digestibilidade."
  },
  {
    name: "Capim Kurumi (BRS Kurumi)",
    scientificName: "Pennisetum purpureum",
    type: "Muda de Crescimento Ereto",
    protein: "18% a 25%",
    dryMatter: "25 a 30 ton/ha/ano",
    soilFertility: "Alta",
    droughtResistance: "Média",
    bestFor: "Pastejo Direto de Gado Leiteiro e Bovinos de Corte na engorda",
    description: "Anão de alta produção de folhas verdes macias. Excelente para piquetes rotacionados devido ao rápido rebrote após pastejo."
  },
  {
    name: "Capim Capiaçu (BRS Capiaçu)",
    scientificName: "Pennisetum purpureum",
    type: "Muda para Silagem e Picado",
    protein: "8% a 11% (excelente p/ silagem)",
    dryMatter: "45 a 50 ton/ha/ano",
    soilFertility: "Alta / Muito exigente",
    droughtResistance: "Alta",
    bestFor: "Silagem de alta qualidade e fornecimento picado no cocho",
    description: "O gigante das pastagens de corte. Alcança mais de 4 metros de altura com produção volumosa recorde por hectare."
  },
  {
    name: "Jiquiriça (Grama Crioula)",
    scientificName: "Paspalum notatum",
    type: "Muda / Divisão de Touceira",
    protein: "9% a 12%",
    dryMatter: "12 a 15 ton/ha/ano",
    soilFertility: "Média / Baixa",
    droughtResistance: "Excelente",
    bestFor: "Cobertura de solo, pastejo geral e controle de erosão em encostas",
    description: "Super rústica e extremamente resistente ao pisoteio e a geadas comuns na região Sul do Brasil. Excelente enraizamento."
  }
];

export default function MarvetAgropecuaria({ onBack }: { onBack: () => void }) {
  // Navigation active tab for smooth page scrolling simulation
  const [activeTab, setActiveTab] = useState<"home" | "about" | "products" | "calc" | "shipping" | "gallery" | "faq">("home");
  const [calcHectares, setCalcHectares] = useState<number>(1);
  const [selectedVariety, setSelectedVariety] = useState<string>("Tifton 85");
  const [calcSpacing, setCalcSpacing] = useState<string>("50x50"); // cm
  
  // Freight Estimation Simulation
  const [freightState, setFreightState] = useState<string>("SC");
  const [freightEstimatedDays, setFreightEstimatedDays] = useState<number>(2);
  const [freightEstimatedCost, setFreightEstimatedCost] = useState<string>("Calculado sob demanda");
  const [isFreightCalculated, setIsFreightCalculated] = useState<boolean>(false);

  // Form Lead State
  const [leadName, setLeadName] = useState<string>("");
  const [leadPhone, setLeadPhone] = useState<string>("");
  const [leadVariety, setLeadVariety] = useState<string>("Tifton 85");
  const [leadArea, setLeadArea] = useState<string>("");
  const [leadMessage, setLeadMessage] = useState<string>("");
  const [isLeadSubmitted, setIsLeadSubmitted] = useState<boolean>(false);

  // FAQ Expanded index
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Gallery Lightbox Modal State
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  // Robust resilient fallbacks for images if Facebook token expires
  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=150&h=150&q=80";
  };

  const handlePastureError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";
  };

  // Calculator computations
  const getSpacingMultiplier = () => {
    if (calcSpacing === "30x30") return 111111; // 10000 / (0.3 * 0.3)
    if (calcSpacing === "40x40") return 62500;  // 10000 / (0.4 * 0.4)
    if (calcSpacing === "50x50") return 40000;  // 10000 / (0.5 * 0.5)
    return 25000; // 50000 / 2 or 100x100
  };

  const calculatedMudasNeeded = Math.round(calcHectares * getSpacingMultiplier());

  const handleCalculateFreight = (e: React.FormEvent) => {
    e.preventDefault();
    let days = 2;
    let costType = "Pronta Entrega via Transportadora Marvet";

    if (freightState === "SC") {
      days = 1;
      costType = "Frete Especial Sul / SC - Pronta Entrega";
    } else if (freightState === "PR" || freightState === "RS") {
      days = 2;
      costType = "Frete Integrado Região Sul";
    } else if (freightState === "SP" || freightState === "MS") {
      days = 3;
      costType = "Frete Sudeste / Centro-Oeste Express";
    } else {
      days = 4;
      costType = "Envio Aéreo ou Carga Fechada (Todo o Brasil)";
    }

    setFreightEstimatedDays(days);
    setFreightEstimatedCost(costType);
    setIsFreightCalculated(true);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    // Create a beautiful WhatsApp link with details
    const text = `Olá Marvet Agropecuária! Gostaria de fazer um orçamento de mudas para pastagem.%0A%0A*Nome:* ${leadName}%0A*Telefone:* ${leadPhone}%0A*Variedade de Interesse:* ${leadVariety}%0A*Área Estimada:* ${leadArea} hectares%0A*Mensagem:* ${leadMessage || "Olá, tenho interesse nas mudas de alta qualidade!"}`;
    const whatsappUrl = `https://wa.me/5549999999999?text=${text}`; // Simulated Whatsapp number
    
    setIsLeadSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, "_blank", "referrer");
    }, 1200);
  };

  const activeVarietyDetails = PASTURE_VARIETIES.find(v => v.name === selectedVariety) || PASTURE_VARIETIES[0];

  const faqs = [
    {
      q: "Qual a melhor época para plantar as mudas de Tifton 85 e Kurumi?",
      a: "O plantio ideal é no período de calor e chuvas (geralmente entre setembro e março no Sul do Brasil). Com umidade no solo e temperatura acima de 20°C, o enraizamento é extremamente rápido e uniforme."
    },
    {
      q: "Como as mudas são transportadas e como chegam com alta qualidade?",
      a: "Utilizamos caixas térmicas e embalagens respiráveis patenteadas que mantêm a umidade exata das raízes. Nosso tempo de envio é otimizado para que as mudas cheguem frescas, prontas para ir direto ao solo com perda zero."
    },
    {
      q: "Vocês atendem pequenos produtores rurais ou apenas grandes fazendas?",
      a: "Atendemos absolutamente todos os portes de produtores! Desde piquetes familiares pequenos (mínimo de 1.000 mudas) até plantios extensivos de dezenas de hectares com entrega programada de mudas."
    },
    {
      q: "Qual o espaçamento recomendado para o plantio de mudas?",
      a: "Geralmente recomendamos o espaçamento de 50x50 cm para um fechamento rápido e excelente cobertura de solo em até 45 dias. Em solos extremamente férteis ou com orçamento reduzido, pode-se adotar o espaçamento de 70x70 cm."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-stone-900 font-sans selection:bg-[#2E7D32]/20 selection:text-[#1B5E20] relative overflow-x-hidden">
      
      {/* Dynamic SEO Meta Tags */}
      <MetaTags 
        title="Marvet Produtos Agropecuários | Mudas para Pastagens de Alta Qualidade"
        description="Especializada em mudas de Tifton 85, Capim Kurumi, Capiaçu e Jiquiriça em Concórdia, SC. Pronta entrega e envio rápido para todo o Brasil. Escolha a pastagem ideal!"
      />

      <ProductSchema 
        id="marvet-agropecuaria-pastagens"
        details={{
          name: "Mudas para Pastagens de Alta Produtividade - Marvet",
          description: "Mudas certificadas de Tifton 85, Kurumi, Capiaçu e Grama Crioula da região de Concórdia, Santa Catarina. Alta qualidade, pronta entrega e envio para todo o Brasil.",
          image: logoImg
        }}
      />

      {/* Top Banner / Utility Bar */}
      <div className="bg-[#1B5E20] text-white text-[11px] sm:text-xs py-2 px-4 flex flex-col sm:flex-row justify-between items-center gap-2 border-b border-[#2E7D32]/20 font-mono tracking-wider">
        <div className="flex items-center space-x-2">
          <MapPin className="h-3 w-3 text-emerald-400" />
          <span>Rua Tancredo de Almeida Neves, 438, Concórdia, SC</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <Clock className="h-3.5 w-3.5 text-emerald-400" />
            <span>Seg a Sex: 08:00 às 18:00</span>
          </div>
          <div className="flex items-center space-x-1">
            <Award className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
            <span className="font-bold">MUDAS CERTIFICADAS</span>
          </div>
        </div>
      </div>

      {/* Main Real Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-stone-200/80 z-40 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand title */}
          <div className="flex items-center space-x-3 text-left">
            <button 
              onClick={onBack}
              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 transition text-stone-600 mr-2 cursor-pointer flex items-center justify-center border border-stone-200"
              title="Voltar ao Portfólio"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="relative group">
              <img 
                src={logoImg} 
                alt="Marvet Agropecuária Logo" 
                className="h-12 w-12 rounded-full border-2 border-[#2E7D32] object-cover shadow shadow-black/10 referrer-policy='no-referrer'"
                referrerPolicy="no-referrer"
                onError={handleLogoError}
              />
              <div className="absolute -bottom-1 -right-1 bg-[#2E7D32] text-white p-0.5 rounded-full border border-white">
                <CheckCircle className="h-2.5 w-2.5" />
              </div>
            </div>
            <div>
              <h1 className="font-black text-lg sm:text-xl tracking-tight text-[#1B5E20] leading-none uppercase">
                MARVET
              </h1>
              <span className="text-[10px] sm:text-xs font-mono text-stone-500 block tracking-wider uppercase font-extrabold mt-0.5">
                Produtos Agropecuários
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-5">
            <a 
              href="#sobre" 
              onClick={() => setActiveTab("home")}
              className={`text-xs font-mono uppercase tracking-wider font-extrabold transition-colors ${activeTab === "home" ? "text-[#1B5E20] border-b-2 border-[#1B5E20] pb-1" : "text-stone-500 hover:text-[#1B5E20]"}`}
            >
              Início
            </a>
            <a 
              href="#sobre-marvet" 
              onClick={() => setActiveTab("about")}
              className={`text-xs font-mono uppercase tracking-wider font-extrabold transition-colors ${activeTab === "about" ? "text-[#1B5E20] border-b-2 border-[#1B5E20] pb-1" : "text-stone-500 hover:text-[#1B5E20]"}`}
            >
              Sobre Marvet
            </a>
            <a 
              href="#variedades" 
              onClick={() => setActiveTab("products")}
              className={`text-xs font-mono uppercase tracking-wider font-extrabold transition-colors ${activeTab === "products" ? "text-[#1B5E20] border-b-2 border-[#1B5E20] pb-1" : "text-stone-500 hover:text-[#1B5E20]"}`}
            >
              Nossas Mudas
            </a>
            <a 
              href="#calculadora" 
              onClick={() => setActiveTab("calc")}
              className={`text-xs font-mono uppercase tracking-wider font-extrabold transition-colors ${activeTab === "calc" ? "text-[#1B5E20] border-b-2 border-[#1B5E20] pb-1" : "text-stone-500 hover:text-[#1B5E20]"}`}
            >
              Calculadora
            </a>
            <a 
              href="#envio" 
              onClick={() => setActiveTab("shipping")}
              className={`text-xs font-mono uppercase tracking-wider font-extrabold transition-colors ${activeTab === "shipping" ? "text-[#1B5E20] border-b-2 border-[#1B5E20] pb-1" : "text-stone-500 hover:text-[#1B5E20]"}`}
            >
              Envio
            </a>
            <a 
              href="#galeria" 
              onClick={() => setActiveTab("gallery")}
              className={`text-xs font-mono uppercase tracking-wider font-extrabold transition-colors ${activeTab === "gallery" ? "text-[#1B5E20] border-b-2 border-[#1B5E20] pb-1" : "text-stone-500 hover:text-[#1B5E20]"}`}
            >
              Galeria
            </a>
            <a 
              href="#duvidas" 
              onClick={() => setActiveTab("faq")}
              className={`text-xs font-mono uppercase tracking-wider font-extrabold transition-colors ${activeTab === "faq" ? "text-[#1B5E20] border-b-2 border-[#1B5E20] pb-1" : "text-stone-500 hover:text-[#1B5E20]"}`}
            >
              Dúvidas
            </a>
          </nav>

          {/* WhatsApp Direct Header Call */}
          <div className="flex items-center space-x-3">
            <a
              href="https://wa.me/5549999999999?text=Olá Marvet! Vi o site e gostaria de tirar dúvidas sobre as mudas de pastagem."
              target="_blank"
              rel="noreferrer"
              className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-4 py-2.5 rounded-lg font-mono text-[11px] font-bold uppercase tracking-wider flex items-center space-x-2 transition shadow-lg shadow-emerald-700/10"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">CHAMAR NO WHATSAPP</span>
              <span className="sm:hidden">WHATSAPP</span>
            </a>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section id="sobre" className="relative bg-gradient-to-br from-[#F4F6F2] via-white to-[#EBF0E8] pt-12 pb-20 sm:pb-28 border-b border-stone-200 overflow-hidden">
        
        {/* Subtle grid elements representing crop fields */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,125,50,0.02),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,125,50,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(46,125,50,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="mb-6">
            <Breadcrumb items={[
              { label: "Augusto Dev Portfólio", path: "/" },
              { label: "Marvet Agropecuária", path: "/portfolio/marvet" }
            ]} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text Info */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 rounded-full text-[#1B5E20] font-mono text-[10px] sm:text-xs font-black tracking-widest uppercase">
                <Sprout className="h-4 w-4 text-[#2E7D32]" />
                <span>Especialistas em Pastagem de Alta Performance</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-[#1B5E20] tracking-tight leading-tight">
                Aqui na Marvet Agropecuária você encontra a <span className="text-stone-800underline decoration-[#2E7D32]/40">pastagem ideal!</span>
              </h2>

              <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-sans">
                Produzimos e entregamos mudas de alta qualidade, preparadas sob rigoroso controle de fertilidade e livre de pragas. Garantimos rápida cobertura de solo, maior teor de proteína por hectare e resistência superior para elevar a produtividade do seu gado ou equinos.
              </p>

              {/* Core Attributes Bullets (Requested directly by user) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center space-x-3 bg-white p-3.5 rounded-xl border border-stone-200/70 shadow-sm">
                  <div className="p-2 rounded bg-emerald-50 text-[#2E7D32]">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] text-stone-400 uppercase font-black tracking-wider">QUALIDADE</h4>
                    <p className="text-stone-800 text-xs font-extrabold">Mudas Selecionadas</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white p-3.5 rounded-xl border border-stone-200/70 shadow-sm">
                  <div className="p-2 rounded bg-emerald-50 text-[#2E7D32]">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] text-stone-400 uppercase font-black tracking-wider">LOGÍSTICA</h4>
                    <p className="text-stone-800 text-xs font-extrabold">Pronta Entrega</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-white p-3.5 rounded-xl border border-stone-200/70 shadow-sm">
                  <div className="p-2 rounded bg-emerald-50 text-[#2E7D32]">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] text-stone-400 uppercase font-black tracking-wider">COBERTURA</h4>
                    <p className="text-stone-800 text-xs font-extrabold">Envio p/ Todo Brasil</p>
                  </div>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <a 
                  href="#calculadora" 
                  className="w-full sm:w-auto bg-[#1B5E20] hover:bg-[#2E7D32] text-white py-4 px-8 rounded-xl font-mono text-xs font-black uppercase tracking-widest transition flex items-center justify-center space-x-2 shadow-lg shadow-emerald-800/10 border-b-4 border-[#0F3612]"
                >
                  <Calculator className="h-4 w-4" />
                  <span>Simular Meu Plantio</span>
                </a>
                <a 
                  href="#contato" 
                  className="w-full sm:w-auto bg-white hover:bg-stone-50 text-stone-800 py-4 px-8 rounded-xl font-mono text-xs font-black uppercase tracking-widest transition border border-stone-200 flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="h-4 w-4 text-[#2E7D32]" />
                  <span>Chamar no WhatsApp</span>
                </a>
              </div>

              {/* Live coordinates tracker of Concórdia */}
              <div className="pt-4 flex items-center space-x-2 text-stone-500 font-mono text-[10px] uppercase font-bold">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span>CONCÓRDIA, SC: CENTRO DA PRODUÇÃO AGROPECUÁRIA CATARINENSE</span>
              </div>
            </div>

            {/* Hero Main Image Container (provided by the user) */}
            <div className="lg:col-span-5 relative w-full flex justify-center">
              <div className="relative w-full max-w-[420px] aspect-[10/16] bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-white shadow-stone-400/30 group">
                <img 
                  src={pastureImg} 
                  alt="Mudas de pastagem Marvet" 
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                  onError={handlePastureError}
                />
                {/* Floating Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-stone-200/50 p-3 rounded-xl shadow text-left">
                  <div className="flex items-center space-x-1.5 text-[#1B5E20] font-mono text-[9px] font-black uppercase tracking-wider">
                    <Leaf className="h-3.5 w-3.5" />
                    <span>ALTA TAXA DE REBROTE</span>
                  </div>
                  <h4 className="text-stone-900 text-[11px] font-bold mt-0.5">Tifton 85 de Verdade</h4>
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 text-left">
                  <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest block font-bold">REGISTRO DE PRODUTOR</span>
                  <p className="text-white text-xs font-sans mt-1 leading-relaxed">
                    Nossas matrizes são cuidadas individualmente, garantindo material genético livre de nematoides e patógenos de solo.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Trust Badges Bar */}
      <div className="bg-white border-y border-stone-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <h4 className="text-2xl font-serif font-black text-[#1B5E20]">100%</h4>
            <p className="text-stone-500 font-mono text-[10px] uppercase font-bold tracking-wider">Pureza Genética Garantida</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl font-serif font-black text-[#1B5E20]">+5 Milhões</h4>
            <p className="text-stone-500 font-mono text-[10px] uppercase font-bold tracking-wider">Mudas Entregues</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl font-serif font-black text-[#1B5E20]">Livre de</h4>
            <p className="text-stone-500 font-mono text-[10px] uppercase font-bold tracking-wider">Cigarrinhas e Pragas</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl font-serif font-black text-[#1B5E20]">Rápida</h4>
            <p className="text-stone-500 font-mono text-[10px] uppercase font-bold tracking-wider">Embalagem e Despacho</p>
          </div>
        </div>
      </div>

      {/* Sobre a Marvet (Apresentação breve da empresa) - Required */}
      <section id="sobre-marvet" className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: About Image visual card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xl aspect-[4/3] bg-stone-100">
                <img 
                  src="https://www.zanatta.com.br/wp-content/uploads/2019/02/201506090820371316426493_g.jpg" 
                  alt="Produção de mudas Marvet - Estufa Climatizada"
                  className="w-full h-full object-cover"
                  onError={handlePastureError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white text-left">
                  <span className="font-mono text-[9px] text-emerald-400 font-bold block uppercase tracking-wider">TECNOLOGIA DE PONTA</span>
                  <p className="font-serif font-bold text-sm">Estufas climatizadas em Concórdia, SC</p>
                </div>
              </div>
            </div>

            {/* Right: Persuasive business description */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-[#1B5E20] font-mono text-[10px] font-black uppercase tracking-wider">
                <Leaf className="h-3.5 w-3.5 text-[#2E7D32]" />
                <span>SOBRE A MARVET</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1B5E20] tracking-tight">
                Cultivando a base para a produtividade da sua fazenda
              </h2>
              <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
                A <strong>Marvet Produtos Agropecuários</strong> nasceu em Concórdia, Santa Catarina, com a missão de transformar a pecuária nacional por meio do fornecimento de mudas de pastagens de altíssimo valor genético e nutricional.
              </p>
              <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
                Nossa produção conta com estufas modernas e equipe especializada em nutrição e saúde vegetal. Do preparo do solo matriz até a expedição climatizada, cada etapa é acompanhada por engenheiros agrônomos para garantir que você receba um material pronto para brotar com força total no seu piquete.
              </p>

              {/* Core Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-[#1B5E20] mt-0.5">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-stone-800 text-sm">Origem Controlada</h4>
                    <p className="text-stone-500 text-xs mt-0.5 leading-relaxed">Matrizes selecionadas e certificadas livres de patógenos.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-[#1B5E20] mt-0.5">
                    <Truck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-stone-800 text-sm">Logística Inteligente</h4>
                    <p className="text-stone-500 text-xs mt-0.5 leading-relaxed">Embalagens climatizadas sob medida para entregas em todo o Brasil.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Catalog and Variety Selector */}
      <section id="variedades" className="py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-100/60 border border-emerald-200/50 rounded-full text-[#1B5E20] font-mono text-[10px] uppercase font-extrabold tracking-wider">
              <Layers className="h-3.5 w-3.5" />
              <span>CATÁLOGO TÁTIL DE PASTO</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Escolha a pastagem perfeita para sua necessidade
            </h2>
            <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
              Trabalhamos com as espécies mais produtivas do agronegócio. Clique nas opções abaixo e veja a ficha técnica detalhada para planejar seu pasto.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Variety Tab Selectors */}
            <div className="lg:col-span-5 space-y-3">
              <span className="font-mono text-[10px] text-stone-400 uppercase font-black tracking-wider block text-left mb-1">
                SELECIONE UMA VARIEDADE:
              </span>
              {PASTURE_VARIETIES.map((variety) => (
                <button
                  key={variety.name}
                  onClick={() => setSelectedVariety(variety.name)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-center justify-between group ${selectedVariety === variety.name ? "bg-white border-[#2E7D32] shadow-md shadow-[#2E7D32]/5" : "bg-transparent border-stone-200 hover:border-stone-300"}`}
                >
                  <div className="space-y-1">
                    <span className="text-stone-400 font-mono text-[9px] uppercase tracking-widest block font-bold">
                      {variety.type}
                    </span>
                    <h3 className={`font-serif text-lg font-black transition-colors ${selectedVariety === variety.name ? "text-[#1B5E20]" : "text-stone-800"}`}>
                      {variety.name}
                    </h3>
                    <p className="text-stone-500 text-xs italic font-sans">
                      {variety.scientificName}
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg transition-colors ${selectedVariety === variety.name ? "bg-emerald-50 text-[#1B5E20]" : "bg-stone-100 text-stone-400 group-hover:bg-stone-200"}`}>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </button>
              ))}
            </div>

            {/* Right Column: Variety Ficha Técnica Detailed Card */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xl relative overflow-hidden text-left">
                
                {/* Background soft green patch */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-stone-100">
                  <div className="space-y-1.5">
                    <span className="font-mono text-[10px] text-[#2E7D32] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-100">
                      FICHA TÉCNICA MARVET
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#1B5E20]">
                      {activeVarietyDetails.name}
                    </h3>
                    <p className="text-stone-500 font-sans italic text-sm">
                      {activeVarietyDetails.scientificName}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-lg text-yellow-700 font-mono text-[10px] font-black uppercase tracking-wider">
                    <Award className="h-4 w-4" />
                    <span>Alta Performance</span>
                  </div>
                </div>

                <div className="py-6 space-y-4">
                  <h4 className="font-mono text-[10px] text-stone-400 uppercase font-black tracking-wider">DESCRIÇÃO DA PASTAGEM</h4>
                  <p className="text-stone-600 font-sans text-sm leading-relaxed">
                    {activeVarietyDetails.description}
                  </p>
                </div>

                {/* Grid Attributes info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                  <div className="space-y-1">
                    <span className="text-stone-400 font-mono text-[9px] uppercase font-black">NÍVEL DE PROTEÍNA BRUTA</span>
                    <p className="text-stone-800 font-sans font-bold text-sm flex items-center space-x-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span>{activeVarietyDetails.protein}</span>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-stone-400 font-mono text-[9px] uppercase font-black">PRODUÇÃO DE MATÉRIA SECA</span>
                    <p className="text-stone-800 font-sans font-bold text-sm flex items-center space-x-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span>{activeVarietyDetails.dryMatter}</span>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-stone-400 font-mono text-[9px] uppercase font-black">EXIGÊNCIA DE FERTILIDADE</span>
                    <p className="text-stone-800 font-sans font-bold text-sm flex items-center space-x-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span>{activeVarietyDetails.soilFertility}</span>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-stone-400 font-mono text-[9px] uppercase font-black">RESISTÊNCIA À SECA</span>
                    <p className="text-stone-800 font-sans font-bold text-sm flex items-center space-x-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span>{activeVarietyDetails.droughtResistance}</span>
                    </p>
                  </div>
                </div>

                {/* Best For Highlight Box */}
                <div className="mt-6 p-4 bg-emerald-50/70 border border-emerald-100 rounded-xl text-left">
                  <span className="font-mono text-[9px] text-[#2E7D32] uppercase font-black tracking-wider block">RECOMENDAÇÃO DE USO</span>
                  <p className="text-stone-800 text-xs font-bold mt-1 leading-relaxed">
                    {activeVarietyDetails.bestFor}
                  </p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-100">
                  <div className="flex items-center space-x-2 text-stone-500 font-mono text-[10px] uppercase font-bold">
                    <ShieldCheck className="h-4 w-4 text-[#2E7D32]" />
                    <span>Mudas livres de fungos de raiz</span>
                  </div>
                  <button 
                    onClick={() => {
                      setLeadVariety(activeVarietyDetails.name);
                      document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto text-[#1B5E20] hover:text-[#2E7D32] bg-emerald-50 hover:bg-emerald-100/60 font-mono text-[10px] font-black uppercase tracking-wider px-4 py-2.5 rounded-lg border border-emerald-200/50 transition flex items-center justify-center space-x-1.5"
                  >
                    <span>Quero Esta Espécie</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Pasture seedlings calculator */}
      <section id="calculadora" className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left column: Calculator tool */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#1B5E20] to-[#0F3612] text-white rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-left">
              
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-yellow-400/5 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4">
                <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-white/10 border border-white/10 text-emerald-300 font-mono text-[10px] font-black uppercase tracking-wider">
                  <Calculator className="h-3.5 w-3.5" />
                  <span>SIMULADOR DIGITAL DE PLANTIO</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                  Calcule a quantidade de mudas para sua área
                </h3>
                <p className="text-white/70 font-sans text-xs sm:text-sm leading-relaxed">
                  Insira o tamanho da sua área em hectares e o espaçamento desejado para obter o cálculo estimado de mudas de alta produtividade necessárias para fechar seu solo.
                </p>
              </div>

              {/* Calculator Inputs */}
              <div className="mt-8 space-y-6">
                
                {/* Hectares slide input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline font-mono text-xs">
                    <span className="uppercase text-white/60 font-bold">TAMANHO DA ÁREA</span>
                    <span className="text-emerald-300 font-black text-sm">{calcHectares} Hectare{calcHectares > 1 ? "s" : ""}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    step="1"
                    value={calcHectares}
                    onChange={(e) => setCalcHectares(Number(e.target.value))}
                    className="w-full h-1.5 bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <div className="flex justify-between font-mono text-[9px] text-white/40">
                    <span>1 HECTARE</span>
                    <span>25 HECTARES</span>
                    <span>50 HECTARES</span>
                  </div>
                </div>

                {/* Spacing drop selector */}
                <div className="space-y-2">
                  <span className="font-mono text-xs text-white/60 font-bold block uppercase">ESPAÇAMENTO RECOMENDADO</span>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: "30x30", label: "30x30 cm", speed: "Rápido (30 dias)" },
                      { value: "50x50", label: "50x50 cm", speed: "Normal (45 dias)" },
                      { value: "70x70", label: "70x70 cm", speed: "Econômico (60 dias)" }
                    ].map((sp) => (
                      <button
                        key={sp.value}
                        onClick={() => setCalcSpacing(sp.value)}
                        className={`p-3.5 rounded-xl border text-center transition-all ${calcSpacing === sp.value ? "bg-white text-stone-900 border-white font-extrabold shadow-lg" : "bg-[#255227] border-white/10 text-white hover:bg-[#2e5d30]"}`}
                      >
                        <span className="font-mono text-[10px] tracking-wide block">{sp.label}</span>
                        <span className={`font-mono text-[8px] mt-1 block uppercase ${calcSpacing === sp.value ? "text-emerald-600 font-bold" : "text-white/40"}`}>{sp.speed}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Real-time calculated Results HUD */}
              <div className="mt-8 p-5 rounded-2xl bg-black/30 border border-white/10 text-left space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="font-mono text-[10px] text-emerald-300 font-bold uppercase tracking-wider">CÁLCULO DE MUDAS DA MARVET</span>
                  <span className="font-mono text-[9px] text-white/40">MUDAS CERTIFICADAS</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="font-sans text-xs text-white/60">Total de mudas necessárias:</span>
                  <div className="text-right">
                    <span className="font-serif text-3xl font-black text-[#00FF41] block tracking-tight">
                      {calculatedMudasNeeded.toLocaleString("pt-BR")}
                    </span>
                    <span className="font-mono text-[9px] text-stone-300 uppercase font-black tracking-wider block">mudas prontas</span>
                  </div>
                </div>

                <div className="text-[10px] sm:text-xs text-white/50 leading-relaxed font-mono flex items-start space-x-1.5">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    No espaçamento de *{calcSpacing.replace("x", " por ")} cm*, o fechamento total da pastagem ocorre de forma homogênea, reduzindo sensivelmente a infestação de ervas daninhas.
                  </span>
                </div>
              </div>

              {/* Calculator Direct WhatsApp Action */}
              <div className="mt-6">
                <button
                  onClick={() => {
                    const msg = `Olá! Calculei no Simulador Marvet que necessito de aproximadamente ${calculatedMudasNeeded.toLocaleString("pt-BR")} mudas para cobrir meus ${calcHectares} hectares no espaçamento ${calcSpacing}. Gostaria de solicitar orçamento!`;
                    window.open(`https://wa.me/5549999999999?text=${encodeURIComponent(msg)}`, "_blank");
                  }}
                  className="w-full py-4 rounded-xl bg-yellow-400 text-stone-900 font-mono text-[11px] font-black uppercase tracking-wider hover:bg-yellow-300 transition shadow-lg flex items-center justify-center space-x-1.5"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Solicitar Orçamento Deste Cálculo</span>
                </button>
              </div>

            </div>

            {/* Right column: Content benefits explanations */}
            <div className="lg:col-span-6 text-left space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-1 px-3 py-1 bg-yellow-100 border border-yellow-200 text-yellow-800 rounded-full font-mono text-[10px] font-black tracking-wider uppercase">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>ALTA RENTABILIDADE POR HECTARE</span>
                </div>
                <h3 className="font-serif text-3xl font-black text-stone-900 tracking-tight leading-tight">
                  Por que plantar através de mudas e não sementes?
                </h3>
                <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
                  As sementes convencionais possuem baixo índice de germinação real e sofrem com ataques de pássaros, ventos e formigas. Nossas mudas são enraizadas sob estufas controladas em Concórdia, SC, oferecendo vantagens imbatíveis:
                </p>
              </div>

              <div className="space-y-5">
                
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-[#1B5E20] shrink-0">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-stone-800 text-base">Fechamento do Pasto 3x Mais Rápido</h4>
                    <p className="text-stone-500 text-xs sm:text-sm mt-1 leading-relaxed">
                      Em menos de 45 dias você tem o pasto completamente coberto e fechado, contra mais de 120 dias do plantio de semente tradicional.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-[#1B5E20] shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-stone-800 text-base">Perda Zero no Solo</h4>
                    <p className="text-stone-500 text-xs sm:text-sm mt-1 leading-relaxed">
                      Ao plantar mudas já enraizadas, a taxa de pegamento é superior a 98%, evitando falhas e re-trabalhos caros de replantio de sementes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-[#1B5E20] shrink-0">
                    <Sprout className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-stone-800 text-base">Excelente Controle Genético</h4>
                    <p className="text-stone-500 text-xs sm:text-sm mt-1 leading-relaxed">
                      Você recebe mudas que herdam perfeitamente a genética robusta das nossas plantas-mãe de altíssimo valor proteico.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Simulator of Freight and Nationwide Shipping */}
      <section id="envio" className="py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-100 text-[#1B5E20] border border-emerald-200 rounded-full font-mono text-[10px] font-black uppercase tracking-wider">
              <Truck className="h-3.5 w-3.5" />
              <span>LOGÍSTICA AGROPECUÁRIA</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Enviamos com segurança para todo o Brasil
            </h2>
            <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
              Desenvolvemos embalagens exclusivas que conservam a hidratação das raízes por longos dias. Selecione seu estado e veja o tempo médio estimado de viagem para suas mudas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
            
            {/* Shipping Simulator Box */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xl">
              <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center space-x-2">
                <Truck className="h-5 w-5 text-[#2E7D32]" />
                <span>Simulador de Tempo de Entrega</span>
              </h3>
              <p className="text-stone-500 text-xs mt-1.5 leading-relaxed">
                As mudas saem diretamente do nosso centro de Concórdia (SC) devidamente umedecidas.
              </p>

              <form onSubmit={handleCalculateFreight} className="mt-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] text-stone-400 uppercase font-black tracking-wider block">
                    SELECIONE SEU ESTADO (UF)
                  </label>
                  <select
                    value={freightState}
                    onChange={(e) => {
                      setFreightState(e.target.value);
                      setIsFreightCalculated(false);
                    }}
                    className="w-full p-3.5 rounded-lg border border-stone-200 bg-stone-50 font-sans text-xs font-bold text-stone-800 focus:outline-none focus:border-[#2E7D32]"
                  >
                    <option value="SC">Santa Catarina (SC)</option>
                    <option value="RS">Rio Grande do Sul (RS)</option>
                    <option value="PR">Paraná (PR)</option>
                    <option value="SP">São Paulo (SP)</option>
                    <option value="MS">Mato Grosso do Sul (MS)</option>
                    <option value="MG">Minas Gerais (MG)</option>
                    <option value="GO">Goiás (GO)</option>
                    <option value="MT">Mato Grosso (MT)</option>
                    <option value="BA">Bahia (BA)</option>
                    <option value="AL">Outros Estados (Todo Brasil)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-mono text-[11px] font-black uppercase tracking-wider transition"
                >
                  Calcular Viabilidade e Prazo
                </button>
              </form>

              {/* Calculated Result Animation */}
              <AnimatePresence mode="wait">
                {isFreightCalculated && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-3"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-emerald-100">
                      <span className="font-mono text-[9px] text-[#2E7D32] font-black uppercase">SIMULAÇÃO COMPLETA</span>
                      <span className="font-mono text-[8px] text-[#2E7D32] bg-emerald-100/60 px-1.5 py-0.5 rounded font-black uppercase">FRESCO NO PLANTIO</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-stone-500 font-sans text-xs">Tempo médio de viagem:</span>
                      <span className="text-stone-800 font-serif font-black text-sm">
                        {freightEstimatedDays} Dia{freightEstimatedDays > 1 ? "s" : ""} Útil
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-stone-500 font-sans text-xs">Modal de transporte:</span>
                      <span className="text-[#1B5E20] font-mono text-[10px] font-black uppercase">
                        {freightEstimatedCost}
                      </span>
                    </div>

                    <p className="text-[#1B5E20] font-sans text-[11px] leading-relaxed pt-1.5 border-t border-emerald-100/40">
                      ✔ **Garantia Marvet:** Se as mudas sofrerem danos na viagem devido a atrasos logísticos, garantimos a reposição integral das mesmas sem custo!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Logistics explanation cards */}
            <div className="space-y-6">
              
              <div className="p-6 bg-white rounded-2xl border border-stone-200 flex items-start space-x-4 shadow-sm">
                <div className="p-2 bg-emerald-50 text-[#2E7D32] rounded-xl shrink-0">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-800 text-base">Embalagem Climatizada Exclusiva</h4>
                  <p className="text-stone-500 text-xs sm:text-sm mt-1 leading-relaxed">
                    Nossas caixas mantêm as mudas em temperatura estável e umidade ótima, permitindo transportes rodoviários de até 6 dias com qualidade intacta.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-stone-200 flex items-start space-x-4 shadow-sm">
                <div className="p-2 bg-emerald-50 text-[#2E7D32] rounded-xl shrink-0">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-800 text-base">Rotas e Transportadoras Parceiras</h4>
                  <p className="text-stone-500 text-xs sm:text-sm mt-1 leading-relaxed">
                    Possuímos contratos de frete integrado de carga viva e vegetal que priorizam a entrega expressa direto ao seu endereço rural.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-stone-200 flex items-start space-x-4 shadow-sm">
                <div className="p-2 bg-emerald-50 text-[#2E7D32] rounded-xl shrink-0">
                  <Navigation className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-stone-800 text-base">Acompanhamento e Suporte</h4>
                  <p className="text-stone-500 text-xs sm:text-sm mt-1 leading-relaxed">
                    Sua carga é rastreada ponto a ponto. Nossa equipe avisa exatamente o dia do envio para que você organize a mão de obra de plantio.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Structured Lead Form Contact */}
      <section id="contato" className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
            
            {/* Info and Address col */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4">
                <span className="font-mono text-[10px] text-stone-400 uppercase font-black block tracking-widest">
                  FALE COM QUEM ENTENDE DE PASTO
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#1B5E20] tracking-tight">
                  Chame no WhatsApp e escolha a sua!
                </h2>
                <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
                  Tire suas dúvidas técnicas, consulte fretes para grande quantidade e faça seu pedido direto com nossos especialistas agrícolas de Concórdia, SC.
                </p>
              </div>

              {/* Physical details block */}
              <div className="space-y-4 font-mono text-xs text-stone-600 pt-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-[#2E7D32] shrink-0" />
                  <div>
                    <span className="font-black text-stone-800 uppercase block">Endereço da Loja</span>
                    <p className="mt-0.5 font-sans">Rua Tancredo de Almeida Neves, 438, Concórdia, SC, Brasil</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-[#2E7D32] shrink-0" />
                  <div>
                    <span className="font-black text-stone-800 uppercase block">Telefone / WhatsApp</span>
                    <p className="mt-0.5 font-sans">(49) 99999-9999</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-[#2E7D32] shrink-0" />
                  <div>
                    <span className="font-black text-stone-800 uppercase block">Atendimento Ativo</span>
                    <p className="mt-0.5 font-sans">Segunda a Sexta: 08:00 às 12:00 e 13:30 às 18:00</p>
                  </div>
                </div>
              </div>

              {/* Mini Map representation with live action link */}
              <div className="rounded-xl border border-stone-200 overflow-hidden bg-stone-50 relative flex flex-col justify-between p-5 min-h-[220px] shadow-inner text-left">
                <div className="absolute inset-0 bg-stone-200/25 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:15px_15px]" />
                
                <div className="z-10 flex items-start space-x-3">
                  <div className="p-2.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1B5E20] inline-block shrink-0 animate-pulse">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-stone-800">Sede Concórdia, SC</h4>
                    <p className="text-[11px] text-[#2E7D32] font-mono mt-0.5 uppercase tracking-wider font-bold">27°14'03"S // 52°01'40"W</p>
                    <p className="text-[11px] text-stone-500 mt-1 leading-relaxed font-sans">
                      Margens da Rodovia, próximo ao trevo principal. Estacionamento amplo para caminhões de carga e utilitários.
                    </p>
                  </div>
                </div>

                <div className="z-10 pt-4">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Rua+Tancredo+de+Almeida+Neves+438+Concordia+SC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-lg bg-white border border-stone-200 hover:border-[#2E7D32] text-stone-700 hover:text-[#1B5E20] font-mono text-[10px] font-bold uppercase tracking-wider transition shadow-sm w-full justify-center"
                  >
                    <span>Abrir Rota no Google Maps</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Form Capture box */}
            <div className="lg:col-span-7 bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xl">
              <h3 className="font-serif text-xl sm:text-2xl font-black text-stone-900 mb-6">
                Solicite Orçamento Personalizado
              </h3>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] text-stone-400 uppercase font-black">SEU NOME COMPLETO *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João da Silva"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-stone-200 bg-white text-stone-800 font-sans text-xs focus:outline-none focus:border-[#2E7D32]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] text-stone-400 uppercase font-black">CELULAR COM WHATSAPP *</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: (49) 99999-9999"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-stone-200 bg-white text-stone-800 font-sans text-xs focus:outline-none focus:border-[#2E7D32]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] text-stone-400 uppercase font-black">VARIEDADE DE INTERESSE</label>
                    <select
                      value={leadVariety}
                      onChange={(e) => setLeadVariety(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-stone-200 bg-white text-stone-800 font-sans text-xs focus:outline-none focus:border-[#2E7D32]"
                    >
                      <option value="Tifton 85">Tifton 85</option>
                      <option value="Capim Kurumi">Capim Kurumi (BRS Kurumi)</option>
                      <option value="Capim Capiaçu">Capim Capiaçu (BRS Capiaçu)</option>
                      <option value="Jiquiriça">Jiquiriça (Grama Crioula)</option>
                      <option value="Outras pastagens">Outras Variedades</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-mono text-[9px] text-stone-400 uppercase font-black">ÁREA DE PLANTIO (HECTARES)</label>
                    <input
                      type="number"
                      placeholder="Ex: 5"
                      value={leadArea}
                      onChange={(e) => setLeadArea(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-stone-200 bg-white text-stone-800 font-sans text-xs focus:outline-none focus:border-[#2E7D32]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] text-stone-400 uppercase font-black">SUA MENSAGEM OU DÚVIDA</label>
                  <textarea
                    rows={3}
                    placeholder="Escreva aqui detalhes sobre o solo, se possui irrigação, ou alguma dúvida sobre o frete..."
                    value={leadMessage}
                    onChange={(e) => setLeadMessage(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-stone-200 bg-white text-stone-800 font-sans text-xs focus:outline-none focus:border-[#2E7D32] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLeadSubmitted}
                  className="w-full py-4 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] disabled:bg-stone-300 text-white font-mono text-xs font-black uppercase tracking-widest transition shadow-lg shadow-emerald-700/10 flex items-center justify-center space-x-1.5 border-b-4 border-[#0F3612]"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>{isLeadSubmitted ? "Redirecionando ao WhatsApp..." : "Solicitar Preço via WhatsApp"}</span>
                </button>

                <p className="text-stone-400 font-sans text-[10px] text-center leading-relaxed">
                  * Ao enviar, um canal seguro no WhatsApp será gerado com o seu orçamento programado.
                </p>

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* Image Gallery Section - Required */}
      <section id="galeria" className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-[#1B5E20] font-mono text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-[#2E7D32]" />
              <span>NOSSA ESTRUTURA & RESULTADOS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Galeria de Cultivo e Pastagens Formadas
            </h2>
            <p className="text-stone-600 font-sans text-sm leading-relaxed">
              Veja nossa estrutura de estufas climatizadas em Concórdia, SC, e a transformação real de solos rurais em pastos densos e altamente nutritivos por todo o país.
            </p>
          </div>

          {/* Interactive Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
                title: "Piquete Rotacionado",
                desc: "Gado leiteiro pastando em Tifton 85 perfeitamente formado com alta densidade foliar."
              },
              {
                url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
                title: "Brotação e Enraizamento",
                desc: "Mudas saudáveis em estágio ótimo de enraizamento prontas para expedição rápida."
              },
              {
                url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
                title: "Cobertura Homogênea",
                desc: "Solo 100% coberto em menos de 40 dias após o plantio em espaçamento 50x50."
              },
              {
                url: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80",
                title: "Nutrição Animal Ativa",
                desc: "Rebanho em engorda rápida com pastagem de alto teor de proteína bruta."
              },
              {
                url: "https://images.unsplash.com/photo-1533460004989-cef01064af7e?auto=format&fit=crop&w=800&q=80",
                title: "Qualidade das Matrizes",
                desc: "Folhas largas, macias e extremamente palatáveis de Kurumi cultivadas na Marvet."
              },
              {
                url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
                title: "Matrizes Climatizadas",
                desc: "Nossa fazenda produtora em Concórdia, SC, referência no Sul do Brasil."
              }
            ].map((img, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedGalleryImg(img.url)}
                className="group relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm bg-stone-100 aspect-[4/3] cursor-pointer"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left" />
                
                {/* Always-on subtle info card */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent sm:from-transparent sm:via-transparent sm:to-transparent group-hover:from-black/80 p-5 text-left transition-colors duration-300">
                  <span className="font-mono text-[9px] text-[#00FF41] font-bold tracking-widest block uppercase">MARVET CAMPO</span>
                  <h4 className="font-sans font-bold text-white text-sm mt-0.5">{img.title}</h4>
                  <p className="text-stone-300 text-[11px] leading-snug mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                    {img.desc}
                  </p>
                </div>

                <div className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm border border-stone-200/50 text-stone-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow">
                  <Search className="h-3.5 w-3.5" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Lightbox Modal overlay */}
        <AnimatePresence>
          {selectedGalleryImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGalleryImg(null)}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
            >
              <button
                onClick={() => setSelectedGalleryImg(null)}
                className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors border border-white/10"
              >
                <span className="font-mono text-xs uppercase font-extrabold tracking-widest">FECHAR ×</span>
              </button>
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="relative max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[#0e0e0e]"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={selectedGalleryImg} 
                  alt="Visualização Ampliada Marvet" 
                  className="max-w-full max-h-[80vh] object-contain block mx-auto rounded-lg"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Dynamic Accordion FAQs Section */}
      <section id="duvidas" className="py-20 bg-stone-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-yellow-100 border border-yellow-200 text-yellow-800 rounded-full font-mono text-[10px] font-black uppercase tracking-wider">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>DÚVIDAS FREQUENTES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Tudo o que você precisa saber sobre as mudas
            </h2>
            <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
              Consulte as respostas para as perguntas mais comuns de nossos clientes produtores rurais de Concórdia e região.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 text-left">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-5 flex justify-between items-center text-left focus:outline-none transition-colors hover:bg-stone-50/50"
                >
                  <h3 className="font-sans font-bold text-stone-800 text-sm sm:text-base pr-4">
                    {faq.q}
                  </h3>
                  <ChevronDown className={`h-4 w-4 text-stone-400 shrink-0 transition-transform duration-300 ${expandedFaq === idx ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-stone-100"
                    >
                      <p className="p-5 text-stone-600 font-sans text-xs sm:text-sm leading-relaxed bg-stone-50/30">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Trust Testimonials Region */}
      <section className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="font-serif text-3xl font-black text-stone-900 tracking-tight">
              Aprovado por produtores reais
            </h2>
            <p className="text-stone-500 font-sans text-sm leading-relaxed">
              Veja o relato de quem comprou mudas na Marvet e hoje tem uma pastagem verde e de alta lucratividade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 shadow-sm">
              <div className="flex items-center space-x-1 text-yellow-500">
                {"★".repeat(5)}
              </div>
              <p className="text-stone-600 text-xs sm:text-sm font-sans italic leading-relaxed">
                "Excelente atendimento! Comprei 50 mil mudas de Tifton 85 para o gado de leite aqui em Ipira. Chegaram fresquinhas e a brotação foi espetacular em menos de 30 dias. Super recomendo a Marvet."
              </p>
              <div>
                <h4 className="font-sans font-bold text-stone-800 text-xs sm:text-sm">Vanderlei Menegatti</h4>
                <p className="text-stone-400 font-mono text-[9px] uppercase font-bold tracking-wider mt-0.5">Ipira, SC // Produtor Leiteiro</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 shadow-sm">
              <div className="flex items-center space-x-1 text-yellow-500">
                {"★".repeat(5)}
              </div>
              <p className="text-stone-600 text-xs sm:text-sm font-sans italic leading-relaxed">
                "As mudas de Capim Kurumi da Marvet são de altíssima qualidade. O enraizamento delas no piquete rotacionado foi muito uniforme. Vale cada centavo investir em muda certificada."
              </p>
              <div>
                <h4 className="font-sans font-bold text-stone-800 text-xs sm:text-sm">Rosangela Schmidt</h4>
                <p className="text-stone-400 font-mono text-[9px] uppercase font-bold tracking-wider mt-0.5">Concórdia, SC // Fazenda Primavera</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 shadow-sm">
              <div className="flex items-center space-x-1 text-yellow-500">
                {"★".repeat(5)}
              </div>
              <p className="text-stone-600 text-xs sm:text-sm font-sans italic leading-relaxed">
                "Enviaram as mudas via transportadora rápida até Passo Fundo (RS). Estava receoso com o calor do transporte, mas as caixas térmicas exclusivas mantiveram as mudas perfeitas."
              </p>
              <div>
                <h4 className="font-sans font-bold text-stone-800 text-xs sm:text-sm">Altair Camargo</h4>
                <p className="text-stone-400 font-mono text-[9px] uppercase font-bold tracking-wider mt-0.5">Passo Fundo, RS // Criador de Gado de Corte</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Authentic Footer */}
      <footer className="bg-stone-900 text-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left pb-12 border-b border-white/10">
            
            {/* Column 1: Brand details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2.5">
                <img 
                  src={logoImg} 
                  alt="Marvet Logo" 
                  className="h-9 w-9 rounded-full border border-emerald-500 object-cover referrer-policy='no-referrer'"
                  referrerPolicy="no-referrer"
                />
                <span className="font-sans font-black text-sm tracking-wider uppercase">
                  MARVET AGRO
                </span>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed font-sans">
                Referência em produção de mudas para pastagens de alta produtividade. Desde Concórdia, SC, cultivando o progresso do campo brasileiro.
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="space-y-4">
              <span className="font-mono text-[9px] text-[#00FF41] font-bold uppercase tracking-widest block">
                Navegação Rápida
              </span>
              <ul className="space-y-2 font-mono text-[10px] uppercase tracking-wider text-stone-400">
                <li><a href="#sobre" className="hover:text-[#00FF41] transition-colors">Início</a></li>
                <li><a href="#variedades" className="hover:text-[#00FF41] transition-colors">Nossas Mudas</a></li>
                <li><a href="#calculadora" className="hover:text-[#00FF41] transition-colors">Calculadora Pasto</a></li>
                <li><a href="#envio" className="hover:text-[#00FF41] transition-colors">Simulador Envio</a></li>
                <li><a href="#duvidas" className="hover:text-[#00FF41] transition-colors">Dúvidas FAQ</a></li>
              </ul>
            </div>

            {/* Column 3: Contact coordinates */}
            <div className="space-y-4">
              <span className="font-mono text-[9px] text-[#00FF41] font-bold uppercase tracking-widest block">
                Contatos Diretos
              </span>
              <ul className="space-y-2 font-mono text-[10px] uppercase tracking-wider text-stone-400">
                <li><span>(49) 99999-9999</span></li>
                <li><span>contato@marvetagro.com.br</span></li>
                <li><span>Rua Tancredo de Almeida Neves, 438</span></li>
                <li><span>Concórdia, SC // CEP 89700-000</span></li>
              </ul>
            </div>

            {/* Column 4: Quality Stamp */}
            <div className="space-y-4">
              <span className="font-mono text-[9px] text-[#00FF41] font-bold uppercase tracking-widest block">
                Registro Agrícola
              </span>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="font-sans font-extrabold text-[10px] text-white block uppercase">Produtor Mudas Certificado</span>
                <p className="text-[9px] text-stone-400 font-mono leading-relaxed">
                  Autorização e controle sanitário ativo. Mudas certificadas sem nematoides ou invasores de pastagem.
                </p>
              </div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-baseline space-x-1 select-none text-left cursor-pointer" onClick={onBack}>
              <span className="font-sans font-black tracking-widest text-xs text-stone-300 uppercase hover:text-[#00FF41] transition-colors">
                AUGUSTO
              </span>
              <span className="font-mono text-[#00FF41] font-extrabold text-[10px]">
                DEV
              </span>
              <span className="font-mono text-stone-500 text-[9px] ml-2">// CODIFICADO PARA MARVET</span>
            </div>

            <p className="text-stone-500 font-mono text-[9px] uppercase tracking-[0.1em] text-center md:text-right">
              © {new Date().getFullYear()} MARVET PRODUTOS AGROPECUÁRIOS. TODOS OS DIREITOS RESERVADOS.
            </p>
          </div>

        </div>
      </footer>

      {/* Internal Linking Recommendations Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InternalLinker currentTopic="agronegocio" />
      </div>

    </div>
  );
}
