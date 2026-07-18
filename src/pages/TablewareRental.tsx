import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Wine, 
  Utensils, 
  ChevronRight, 
  Check, 
  Phone, 
  FileText, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Menu, 
  X, 
  Sparkles, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Send,
  Download,
  Info,
  ChevronDown
} from "lucide-react";

interface TablewareRentalProps {
  onBack?: () => void;
}

// Visual catalog mock data
const CATALOG_ITEMS = [
  {
    id: "p1",
    category: "Pratos & Sousplats",
    name: "Sousplat de Cristal Imperial com Fio de Ouro",
    description: "Cristal transparente de alta espessura com acabamento em ouro legítimo nas bordas.",
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=600&q=80",
    tags: ["Casamentos", "Eventos Clássicos"]
  },
  {
    id: "p2",
    category: "Pratos & Sousplats",
    name: "Prato Raso Porcelana Schmidt Filetada",
    description: "Porcelana branca de altíssima resistência com clássico filete dourado elegante.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    tags: ["Jantares", "Corporativo"]
  },
  {
    id: "t1",
    category: "Talheres de Luxo",
    name: "Faqueiro Dourado Premium Matte",
    description: "Aço inoxidável com acabamento escovado dourado luxuoso, design contemporâneo.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80",
    tags: ["Moderno", "Eventos Boho"]
  },
  {
    id: "t2",
    category: "Talheres de Luxo",
    name: "Faqueiro de Prata Renascença",
    description: "Estilo clássico lavrado em prata de lei, ideal para banquetes tradicionais.",
    image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=600&q=80",
    tags: ["Clássico", "Bodas"]
  },
  {
    id: "g1",
    category: "Taças & Copos",
    name: "Jogo de Taças de Cristal Lapidado Âmbar",
    description: "Linha de cristais coloridos para água, vinho e champagne com lapidação clássica.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80",
    tags: ["Coloridos", "Tendência"]
  },
  {
    id: "g2",
    category: "Taças & Copos",
    name: "Taças de Champagne de Cristal de Chumbo Titanium",
    description: "Ultrafinas, leves e com sonoridade incrível, design de alta gastronomia.",
    image: "https://images.unsplash.com/photo-1574926053821-79c5e338a933?auto=format&fit=crop&w=600&q=80",
    tags: ["Brinde", "Premium"]
  },
  {
    id: "k1",
    category: "Equipamentos de Cozinha",
    name: "Richaud de Inox Redondo com Tampa Basculante",
    description: "Aquecedores profissionais em aço inox polido de alta performance com queimadores duplos.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    tags: ["Buffet", "Quentes"]
  },
  {
    id: "k2",
    category: "Equipamentos de Cozinha",
    name: "Samovar de Prata Clássico para Café",
    description: "Peça majestosa lavrada com aquecimento interno a álcool gel para finalizações finas.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    tags: ["Encerramento", "Chá"]
  }
];

export default function TablewareRental({ onBack }: TablewareRentalProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  
  // Interactive Budget State
  const [guests, setGuests] = useState(50);
  const [selectedItems, setSelectedItems] = useState<string[]>([
    "Pratos Rasos", "Talheres de Mesa", "Taças de Cristal"
  ]);
  const [eventType, setEventType] = useState("Casamento");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [budgetSuccess, setBudgetSuccess] = useState(false);

  // Catalog download modal state
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);
  const [emailForCatalog, setEmailForCatalog] = useState("");
  const [catalogDownloaded, setCatalogDownloaded] = useState(false);

  // Pricing calculation factors based on event size and item types
  const itemPrices: { [key: string]: number } = {
    "Pratos Rasos": 4.5,
    "Pratos de Sobremesa": 3.8,
    "Sousplats de Vidro/Cristal": 12.0,
    "Talheres de Mesa": 3.5,
    "Talheres de Sobremesa": 2.8,
    "Taças de Cristal": 5.0,
    "Taças para Champagne": 5.5,
    "Travessas & Réchauds": 45.0,
    "Equipamentos de Café": 120.0
  };

  const handleItemToggle = (itemName: string) => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter(i => i !== itemName));
    } else {
      setSelectedItems([...selectedItems, itemName]);
    }
  };

  const calculateTotal = () => {
    let pricePerGuest = 0;
    let fixedPrice = 0;

    selectedItems.forEach(item => {
      const price = itemPrices[item] || 0;
      if (item === "Travessas & Réchauds") {
        // scale with guest count conservatively
        fixedPrice += Math.ceil(guests / 20) * price;
      } else if (item === "Equipamentos de Café") {
        fixedPrice += Math.ceil(guests / 100) * price;
      } else {
        pricePerGuest += price;
      }
    });

    return (pricePerGuest * guests) + fixedPrice;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    // Build the WhatsApp message
    const formattedTotal = calculateTotal().toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const message = `Olá La Table! Gostaria de solicitar um orçamento:\n\n` +
      `👤 *Nome:* ${clientName}\n` +
      `📞 *WhatsApp:* ${clientPhone}\n` +
      `📅 *Data do Evento:* ${eventDate || "A definir"}\n` +
      `🎉 *Tipo:* ${eventType}\n` +
      `👥 *Convidados:* ${guests} pessoas\n` +
      `🍽️ *Itens Selecionados:*\n${selectedItems.map(item => `  - ${item}`).join("\n")}\n\n` +
      `💰 *Estimativa Base:* ${formattedTotal}\n\n` +
      `Aguardo o retorno com a confirmação de disponibilidade dos itens!`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedText}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
    setBudgetSuccess(true);
  };

  const handleCatalogDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForCatalog) return;
    setCatalogDownloaded(true);
    setTimeout(() => {
      // Simulate download link opening
      window.open("https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=80", "_blank");
    }, 1200);
  };

  const categoriesList = ["Todos", "Pratos & Sousplats", "Talheres de Luxo", "Taças & Copos", "Equipamentos de Cozinha"];
  const filteredCatalog = activeCategory === "Todos" 
    ? CATALOG_ITEMS 
    : CATALOG_ITEMS.filter(item => item.category === activeCategory);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#1E1E1C] font-sans overflow-x-hidden relative selection:bg-[#C2A370] selection:text-white">
      
      {/* Dynamic SEO Rich Meta Tags and Structuring */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        
        .font-serif-luxury {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-sans-luxury {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        
        /* Premium subtle background textures */
        .linen-texture {
          background-color: #fcfbf7;
          background-image: radial-gradient(rgba(194, 163, 112, 0.04) 1px, transparent 0);
          background-size: 16px 16px;
        }

        .gold-border-gradient {
          border-image: linear-gradient(to right, #B38E55, #EAD0A8, #B38E55) 1;
        }

        .luxury-shadow {
          box-shadow: 0 20px 40px -15px rgba(30, 30, 28, 0.05);
        }
      `}} />

      {/* Floating Back Button to Portfolio (Top-Left, highly discreet as instructed) */}
      {onBack && (
        <div className="fixed top-4 left-4 z-50">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 bg-white/90 backdrop-blur-md hover:bg-white text-[#78644A] px-3.5 py-2 rounded-full border border-[#EAD0A8]/30 shadow-md transition-all text-xs font-medium cursor-pointer"
          >
            <span>← Voltar Portfólio</span>
          </button>
        </div>
      )}

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#1E1E1C] text-[#EAD0A8] text-center py-2 px-4 text-xs font-medium tracking-widest uppercase flex items-center justify-center space-x-2 relative z-40">
        <Sparkles className="h-3.5 w-3.5 text-[#EAD0A8] animate-pulse" />
        <span className="font-sans-luxury text-[10px] md:text-[11px]">Reservas abertas para a temporada de casamentos de 2026/2027</span>
      </div>

      {/* PREMIUM HEADER */}
      <header className="sticky top-0 z-40 bg-[#FCFBF7]/90 backdrop-blur-md border-b border-[#E8E6DF] py-4 px-6 md:px-12 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand with luxurious serif aesthetic */}
          <div 
            onClick={() => scrollToSection("home")}
            className="flex flex-col text-left cursor-pointer select-none group"
          >
            <div className="flex items-baseline space-x-2">
              <span className="font-serif-luxury text-2xl font-semibold tracking-[0.08em] text-[#1E1E1C] group-hover:text-[#78644A] transition-colors uppercase">
                La Table
              </span>
              <span className="text-[10px] font-sans-luxury tracking-[0.2em] text-[#B38E55] font-semibold uppercase">Acervo</span>
            </div>
            <span className="text-[9px] font-sans-luxury text-[#787873] uppercase tracking-[0.15em] -mt-1 block">
              Mesa Posta & Utensílios de Cozinha
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("home")} 
              className="text-[#1E1E1C] hover:text-[#B38E55] font-sans-luxury text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("categorias")} 
              className="text-[#1E1E1C] hover:text-[#B38E55] font-sans-luxury text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Categorias
            </button>
            <button 
              onClick={() => scrollToSection("diferenciais")} 
              className="text-[#1E1E1C] hover:text-[#B38E55] font-sans-luxury text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Diferenciais
            </button>
            <button 
              onClick={() => scrollToSection("orcamento")} 
              className="text-[#1E1E1C] hover:text-[#B38E55] font-sans-luxury text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Orçamento
            </button>
          </nav>

          {/* Catalog CTA on Header */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setCatalogModalOpen(true)}
              className="flex items-center space-x-2 bg-transparent text-[#1E1E1C] hover:text-[#B38E55] font-sans-luxury text-[10px] uppercase font-bold tracking-widest transition-all cursor-pointer border border-[#1E1E1C]/20 px-4 py-2.5 rounded-full"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Ver Catálogo</span>
            </button>
            <button
              onClick={() => scrollToSection("orcamento")}
              className="bg-[#B38E55] hover:bg-[#967543] text-white font-sans-luxury text-[10px] uppercase font-bold tracking-widest py-3 px-6 rounded-full transition-all shadow-sm shadow-[#B38E55]/10 cursor-pointer"
            >
              Fazer Orçamento
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#1E1E1C] hover:text-[#B38E55] transition-colors p-1"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[77px] bg-[#FCFBF7] border-b border-[#E8E6DF] z-30 py-6 px-6 shadow-xl text-left md:hidden"
          >
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection("home")} 
                className="text-[#1E1E1C] hover:text-[#B38E55] font-sans-luxury text-sm font-semibold uppercase tracking-wider py-1 border-b border-stone-100 text-left cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("categorias")} 
                className="text-[#1E1E1C] hover:text-[#B38E55] font-sans-luxury text-sm font-semibold uppercase tracking-wider py-1 border-b border-stone-100 text-left cursor-pointer"
              >
                Categorias
              </button>
              <button 
                onClick={() => scrollToSection("diferenciais")} 
                className="text-[#1E1E1C] hover:text-[#B38E55] font-sans-luxury text-sm font-semibold uppercase tracking-wider py-1 border-b border-stone-100 text-left cursor-pointer"
              >
                Diferenciais
              </button>
              <button 
                onClick={() => scrollToSection("orcamento")} 
                className="text-[#1E1E1C] hover:text-[#B38E55] font-sans-luxury text-sm font-semibold uppercase tracking-wider py-1 border-b border-stone-100 text-left cursor-pointer"
              >
                Orçamento
              </button>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => { setMobileMenuOpen(false); setCatalogModalOpen(true); }}
                  className="flex items-center justify-center space-x-2 bg-transparent text-[#1E1E1C] border border-[#1E1E1C]/30 py-3 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  <FileText className="h-4 w-4" />
                  <span>Baixar Catálogo</span>
                </button>
                <button
                  onClick={() => scrollToSection("orcamento")}
                  className="bg-[#B38E55] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider text-center"
                >
                  Solicitar Cotação
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HOME SECTION: SOPHISTICATED HERO AREA */}
      <section id="home" className="relative pt-10 pb-20 md:py-28 lg:py-36 overflow-hidden linen-texture border-b border-[#EAD0A8]/20">
        
        {/* Fine gold lines / organic shapes in background for luxury feel */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#EAD0A8]/10 rounded-full filter blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#B38E55]/5 rounded-full filter blur-3xl opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text copy */}
            <div className="lg:col-span-7 text-left space-y-6 md:space-y-8">
              
              <div className="inline-flex items-center space-x-2 bg-[#EAD0A8]/25 border border-[#B38E55]/30 px-3 py-1.5 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B38E55]" />
                <span className="text-[10px] font-sans-luxury tracking-[0.25em] font-extrabold text-[#78644A] uppercase">
                  Curadoria Exclusiva de Mesa Posta
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1E1E1C] leading-[1.1] tracking-tight">
                  Aluguel de <span className="italic font-normal text-[#B38E55]">Louças de Luxo</span> e Equipamentos para Eventos
                </h1>
                <p className="font-sans-luxury text-[#5E5E57] text-base md:text-lg font-light leading-relaxed max-w-2xl">
                  Transforme seu evento em uma celebração inesquecível. Alugamos pratos finos, sousplats requintados, talheres de luxo, taças de cristal impecáveis e equipamentos de alta gastronomia para buffets.
                </p>
              </div>

              {/* Responsive metrics row */}
              <div className="grid grid-cols-3 gap-4 py-3 border-t border-b border-[#E8E6DF] max-w-xl">
                <div>
                  <span className="block font-serif-luxury text-2xl md:text-3xl font-semibold text-[#1E1E1C]">20mil+</span>
                  <span className="block text-[10px] font-sans-luxury uppercase tracking-wider text-[#787873] mt-1">Peças no Acervo</span>
                </div>
                <div>
                  <span className="block font-serif-luxury text-2xl md:text-3xl font-semibold text-[#1E1E1C]">100%</span>
                  <span className="block text-[10px] font-sans-luxury uppercase tracking-wider text-[#787873] mt-1">Selado & Higienizado</span>
                </div>
                <div>
                  <span className="block font-serif-luxury text-2xl md:text-3xl font-semibold text-[#1E1E1C]">500+</span>
                  <span className="block text-[10px] font-sans-luxury uppercase tracking-wider text-[#787873] mt-1">Eventos Atendidos</span>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("orcamento")}
                  className="bg-[#1E1E1C] hover:bg-[#383835] text-white font-sans-luxury text-xs font-bold uppercase tracking-widest py-4 px-8 rounded-full transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer group"
                >
                  <span>Solicitar Cotação</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setCatalogModalOpen(true)}
                  className="bg-white hover:bg-[#F3F2EC] text-[#1E1E1C] border border-[#1E1E1C]/20 font-sans-luxury text-xs font-bold uppercase tracking-widest py-4 px-8 rounded-full transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <FileText className="h-4 w-4 text-[#B38E55]" />
                  <span>Ver Catálogo Digital</span>
                </button>
              </div>

              {/* Highlight benefits quick links */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[#787873] text-xs font-medium">
                <span className="flex items-center space-x-1.5">
                  <Check className="h-4 w-4 text-[#B38E55]" />
                  <span>Devolução sem lavar</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Check className="h-4 w-4 text-[#B38E55]" />
                  <span>Entrega no local do evento</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Check className="h-4 w-4 text-[#B38E55]" />
                  <span>Peças polidas individualmente</span>
                </span>
              </div>

            </div>

            {/* Right Column: Luxurious Hero Image Frame with layered look */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              
              {/* Decorative behind frame */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#EAD0A8] to-transparent opacity-20 rounded-[40px] transform rotate-3 scale-95 pointer-events-none" />
              
              <div className="relative rounded-[32px] overflow-hidden border-4 border-white shadow-2xl">
                <img 
                  src="https://inspireeventos.com.br/img/aluguel-de-mesas-e-cadeiras.webp" 
                  alt="Aluguel de mesas, cadeiras e louças de luxo para festas e eventos" 
                  className="w-full h-[350px] sm:h-[450px] lg:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual watermark tag */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl text-left border border-[#EAD0A8]/30">
                  <p className="font-serif-luxury text-base font-semibold text-[#1E1E1C]">Coleção Imperial Gold</p>
                  <p className="font-sans-luxury text-[11px] text-[#787873] mt-1">Pratos filetados em ouro, taças de cristal premium e sousplat texturizado.</p>
                </div>
              </div>

              {/* Absolute circular badge float */}
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-[#B38E55] border-4 border-white flex flex-col items-center justify-center shadow-lg text-white animate-pulse">
                <span className="font-serif-luxury text-sm font-bold">Premium</span>
                <span className="text-[8px] uppercase tracking-widest font-sans-luxury">Qualidade</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. CATEGORIAS SECTION: RICH PHOTO GRID */}
      <section id="categorias" className="py-20 md:py-28 bg-[#FCFBF7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-16">
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="text-[10px] font-sans-luxury tracking-[0.3em] font-extrabold text-[#B38E55] uppercase block">
              Nosso Portfólio de Itens
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1E1E1C]">
              Categorias Selecionadas para <span className="italic text-[#B38E55]">Vestir sua Mesa</span>
            </h2>
            <div className="h-[1px] w-24 bg-[#B38E55] mx-auto mt-4" />
            <p className="font-sans-luxury text-[#5E5E57] text-sm md:text-base font-light max-w-xl mx-auto">
              Selecione uma categoria para explorar nosso catálogo refinado de louças, cristais, talheres e utensílios gourmet para cozinha.
            </p>
          </div>

          {/* Interactive Category Selector Pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {categoriesList.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer border ${
                  activeCategory === category
                    ? "bg-[#1E1E1C] border-[#1E1E1C] text-[#EAD0A8] shadow-md"
                    : "bg-white border-[#E8E6DF] text-[#5E5E57] hover:border-[#B38E55] hover:bg-[#F3F2EC]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Catalog grid representation with beautiful cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCatalog.map((item, idx) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white rounded-3xl overflow-hidden border border-[#E8E6DF] hover:shadow-xl transition-all duration-300 flex flex-col text-left group"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#EAD0A8]/30">
                      <span className="text-[9px] font-sans-luxury uppercase tracking-wider font-bold text-[#78644A]">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-serif-luxury text-base font-semibold text-[#1E1E1C] leading-snug">
                        {item.name}
                      </h3>
                      <p className="font-sans-luxury text-xs text-[#787873] font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F3F2EC] flex items-center justify-between">
                      <div className="flex space-x-1">
                        {item.tags.map(t => (
                          <span key={t} className="bg-[#F3F2EC] text-[#5E5E57] text-[8px] font-sans-luxury uppercase tracking-wider px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                      <button 
                        onClick={() => {
                          if (!selectedItems.includes(item.category === "Equipamentos de Cozinha" ? "Travessas & Réchauds" : item.category === "Taças & Copos" ? "Taças de Cristal" : item.category === "Talheres de Luxo" ? "Talheres de Mesa" : "Pratos Rasos")) {
                            const matchItem = item.category === "Equipamentos de Cozinha" ? "Travessas & Réchauds" : item.category === "Taças & Copos" ? "Taças de Cristal" : item.category === "Talheres de Luxo" ? "Talheres de Mesa" : "Pratos Rasos";
                            setSelectedItems([...selectedItems, matchItem]);
                          }
                          scrollToSection("orcamento");
                        }}
                        className="text-[#B38E55] hover:text-[#1E1E1C] text-xs font-semibold uppercase tracking-widest flex items-center space-x-0.5"
                      >
                        <span>Cotar</span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Interactive banner about other available catalog products */}
          <div className="bg-[#F3F2EC] border border-[#EAD0A8]/30 rounded-[32px] p-8 md:p-12 text-left relative overflow-hidden">
            <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 hidden lg:block">
              <Wine className="w-full h-full text-[#B38E55]" />
            </div>
            <div className="max-w-2xl relative z-10 space-y-4">
              <h3 className="font-serif-luxury text-xl md:text-2xl font-semibold text-[#1E1E1C]">
                Procurando um acervo personalizado para seu buffet?
              </h3>
              <p className="font-sans-luxury text-[#5E5E57] text-xs md:text-sm leading-relaxed font-light">
                Possuímos toalhas de linho egípcio, guardanapos importados, marcadores de taça exclusivos e itens decorativos de cobre e prata. Baixe nosso catálogo digital ou fale agora no WhatsApp com nosso consultor.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button 
                  onClick={() => setCatalogModalOpen(true)}
                  className="bg-[#1E1E1C] hover:bg-[#383835] text-white text-[10px] font-sans-luxury uppercase font-bold tracking-widest px-5 py-3 rounded-full transition-all"
                >
                  Download Catálogo Completo (PDF)
                </button>
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-transparent border border-[#1E1E1C]/30 text-[#1E1E1C] hover:bg-[#1E1E1C]/5 text-[10px] font-sans-luxury uppercase font-bold tracking-widest px-5 py-3 rounded-full transition-all flex items-center space-x-1.5"
                >
                  <Phone className="h-3 w-3 text-emerald-600" />
                  <span>Falar com Atendimento</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. DIFERENCIAIS SECTION: PREMIUM ADVANTAGES */}
      <section id="diferenciais" className="py-20 md:py-28 bg-[#1E1E1C] text-white overflow-hidden relative border-t border-b border-[#EAD0A8]/10">
        
        {/* Subtle line elements */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/5 pointer-events-none hidden lg:block" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Box: Luxury Image and feature overlay */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#B38E55] to-transparent opacity-30 rounded-[32px] transform -rotate-2" />
              <div className="relative rounded-[24px] overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80" 
                  alt="Serviço de catering de luxo em mesa posta" 
                  className="w-full h-[400px] object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual guarantee tag */}
                <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-md p-6 text-left border-t border-white/10">
                  <div className="flex items-center space-x-2.5 mb-2">
                    <ShieldCheck className="h-5 w-5 text-[#EAD0A8]" />
                    <span className="font-serif-luxury text-base font-medium text-white">Garantia La Table de Higienização</span>
                  </div>
                  <p className="font-sans-luxury text-[11px] text-stone-400 leading-relaxed font-light">
                    Todas as peças são lavadas em maquinário industrial a alta temperatura, polidas manualmente com álcool isopropílico 70% e seladas em plástico protetor para entrega.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Box: Text and Grid of Pillars */}
            <div className="lg:col-span-7 text-left space-y-12">
              
              <div className="space-y-4">
                <span className="text-[10px] font-sans-luxury tracking-[0.3em] font-extrabold text-[#EAD0A8] uppercase block">
                  Por que nos escolher
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-white leading-tight">
                  Serviço Impecável do <br />
                  <span className="italic text-[#EAD0A8]">Planejamento à Devolução</span>
                </h2>
                <p className="font-sans-luxury text-stone-400 text-sm md:text-base font-light leading-relaxed max-w-xl">
                  Sabemos que a organização de festas e eventos exige perfeição. Nosso compromisso vai além de disponibilizar louças; cuidamos de cada detalhe logístico para você focar no que importa.
                </p>
              </div>

              {/* Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                
                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg text-[#EAD0A8]">
                    🍽️
                  </div>
                  <h4 className="font-serif-luxury text-lg font-medium text-white">De volta sem lavar</h4>
                  <p className="font-sans-luxury text-stone-400 text-xs leading-relaxed font-light">
                    Não se preocupe com a pia. Recebemos todas as travessas, pratos e copos sujos e fazemos a higienização completa em nossa lavanderia centralizada.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg text-[#EAD0A8]">
                    🚚
                  </div>
                  <h4 className="font-serif-luxury text-lg font-medium text-white">Logística de precisão</h4>
                  <p className="font-sans-luxury text-stone-400 text-xs leading-relaxed font-light">
                    Entregamos e retiramos pontualmente no local do seu evento com caminhão baú próprio e caixas protetoras acolchoadas antichoque.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg text-[#EAD0A8]">
                    ✨
                  </div>
                  <h4 className="font-serif-luxury text-lg font-medium text-white">Sem peças trincadas</h4>
                  <p className="font-sans-luxury text-stone-400 text-xs leading-relaxed font-light">
                    Nossa equipe revisa peça por peça sob luz especial antes de embalar. Garantia absoluta de zero lascas, riscos ou manchas d'água nas taças.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg text-[#EAD0A8]">
                    🏰
                  </div>
                  <h4 className="font-serif-luxury text-lg font-medium text-white">Suporte pedagógico de mesa</h4>
                  <p className="font-sans-luxury text-stone-400 text-xs leading-relaxed font-light">
                    Auxiliamos na consultoria de quantidades necessárias com base no cardápio de comidas e bebidas do seu buffet para evitar faltas ou desperdício.
                  </p>
                </div>

              </div>

              {/* Secure note */}
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start space-x-3 text-xs text-stone-300 max-w-xl">
                <Info className="h-5 w-5 text-[#EAD0A8] shrink-0 mt-0.5" />
                <p className="font-sans-luxury leading-relaxed font-light">
                  <strong>Planejamento Seguro:</strong> Permitimos ajustes na contagem final de peças em até <strong>5 dias úteis</strong> antes do seu evento para adequação ao RSVP final de convidados.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. BUDGET SECTION: INTERACTIVE ONLINE ESTIMATOR & LEAD FORM */}
      <section id="orcamento" className="py-20 md:py-28 bg-[#FCFBF7] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch luxury-shadow bg-white rounded-[40px] overflow-hidden border border-[#E8E6DF]">
            
            {/* Left Box: Value summary and interactive list select */}
            <div className="lg:col-span-6 p-8 sm:p-12 text-left bg-[#FCD8A2]/10 flex flex-col justify-between space-y-8 border-b lg:border-b-0 lg:border-r border-[#E8E6DF]">
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-sans-luxury tracking-[0.25em] font-extrabold text-[#B38E55] uppercase block">
                    Simulador Inteligente
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#1E1E1C]">
                    Configure sua <span className="italic text-[#B38E55]">Mesa de Conquista</span>
                  </h3>
                  <p className="font-sans-luxury text-[#5E5E57] text-xs leading-relaxed font-light max-w-sm">
                    Ajuste o número de convidados e selecione os utensílios de mesa e cozinha que deseja para estimar o valor da locação promocional.
                  </p>
                </div>

                {/* 1. Guests count interactive slider */}
                <div className="space-y-3 bg-white p-5 rounded-2xl border border-[#E8E6DF]">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-sans-luxury uppercase tracking-wider text-[#787873] font-bold block">
                      Número de Convidados (RSVP)
                    </label>
                    <span className="font-serif-luxury text-lg font-bold text-[#1E1E1C]">
                      {guests} pessoas
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="500" 
                    step="5"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full accent-[#B38E55] bg-stone-100 h-1.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-[#787873]">
                    <span>Min: 10</span>
                    <span>Ideal para Jantares Íntimos e Grandes Recepções</span>
                    <span>Max: 500+</span>
                  </div>
                </div>

                {/* 2. Select items checklist */}
                <div className="space-y-2">
                  <label className="text-[10px] font-sans-luxury uppercase tracking-wider text-[#787873] font-bold block">
                    Selecione os Utensílios Necessários
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.keys(itemPrices).map(itemName => {
                      const isSelected = selectedItems.includes(itemName);
                      return (
                        <button
                          key={itemName}
                          onClick={() => handleItemToggle(itemName)}
                          className={`p-3 rounded-xl border text-left text-xs font-sans-luxury font-medium transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? "bg-[#1E1E1C] border-[#1E1E1C] text-[#EAD0A8]"
                              : "bg-white border-[#E8E6DF] text-[#5E5E57] hover:border-[#B38E55]"
                          }`}
                        >
                          <span>{itemName}</span>
                          <div className={`h-4 w-4 rounded-full flex items-center justify-center border ${
                            isSelected ? "border-[#EAD0A8] bg-[#EAD0A8] text-stone-900" : "border-stone-300"
                          }`}>
                            {isSelected && <Check className="h-2.5 w-2.5 font-bold" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Estimate Total Card */}
              <div className="bg-[#1E1E1C] text-white p-6 rounded-3xl space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-sans-luxury uppercase tracking-wider text-[#EAD0A8] font-bold block">Estimativa Preliminar</span>
                    <span className="text-[10px] font-sans-luxury text-stone-400 font-light block mt-0.5">Média sugerida por convidado</span>
                  </div>
                  <div className="text-right">
                    <span className="block font-serif-luxury text-2xl font-bold text-[#EAD0A8]">
                      {calculateTotal().toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                    <span className="text-[8px] font-sans-luxury text-stone-400 block">*Sob consulta de estoque</span>
                  </div>
                </div>
                <div className="h-[1px] bg-white/10" />
                <div className="flex items-center space-x-2 text-[10px] font-sans-luxury text-stone-400 font-light leading-relaxed">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Higienização e retirada sem custos adicionais de lavagem incluídas!</span>
                </div>
              </div>

            </div>

            {/* Right Box: Lead Form structured with warm colors */}
            <div className="lg:col-span-6 p-8 sm:p-12 text-left bg-white flex flex-col justify-center relative">
              
              <AnimatePresence mode="wait">
                {!budgetSuccess ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="space-y-1">
                      <h4 className="font-serif-luxury font-semibold text-[#1E1E1C] text-lg">Reserve suas Louças com Desconto</h4>
                      <p className="text-stone-500 text-xs font-sans-luxury font-light">
                        Preencha os dados e receba no WhatsApp o detalhamento da disponibilidade de peças de mesa posta para o seu dia.
                      </p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      
                      <div className="space-y-1">
                        <label className="text-[9px] font-sans-luxury uppercase tracking-wider text-[#787873] font-bold block">Seu Nome Completo</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: Clara Vasconcellos"
                          value={clientName}
                          onChange={e => setClientName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#E8E6DF] text-xs focus:ring-1 focus:ring-[#B38E55] focus:outline-none transition-all font-sans-luxury"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-sans-luxury uppercase tracking-wider text-[#787873] font-bold block">Seu WhatsApp para Retorno</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="Ex: (11) 98888-7777"
                          value={clientPhone}
                          onChange={e => setClientPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#E8E6DF] text-xs focus:ring-1 focus:ring-[#B38E55] focus:outline-none transition-all font-sans-luxury"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-sans-luxury uppercase tracking-wider text-[#787873] font-bold block">Data do Evento</label>
                          <input 
                            type="date" 
                            value={eventDate}
                            onChange={e => setEventDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[#E8E6DF] text-xs focus:ring-1 focus:ring-[#B38E55] focus:outline-none transition-all font-sans-luxury"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-sans-luxury uppercase tracking-wider text-[#787873] font-bold block">Estilo do Evento</label>
                          <select 
                            value={eventType}
                            onChange={e => setEventType(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[#E8E6DF] text-xs focus:ring-1 focus:ring-[#B38E55] focus:outline-none transition-all bg-white font-sans-luxury"
                          >
                            <option value="Casamento">Casamento</option>
                            <option value="Corporativo">Corporativo</option>
                            <option value="Formatura">Formatura</option>
                            <option value="Aniversário">Aniversário</option>
                            <option value="Recepção Particular">Recepção Íntima</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#B38E55] hover:bg-[#967543] text-white font-bold font-sans-luxury text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Solicitar Cotação no WhatsApp</span>
                    </button>

                    <p className="text-[10px] text-stone-400 text-center leading-normal font-sans-luxury">
                      Seus dados estão protegidos. Clicando acima você será direcionado para o contato direto de agendamento em nosso WhatsApp corporativo oficial.
                    </p>

                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    className="h-full flex flex-col justify-center items-center text-center space-y-6 py-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="h-16 w-16 rounded-full bg-[#EAD0A8]/20 text-[#B38E55] flex items-center justify-center text-3xl shadow-inner">
                      ✨
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-serif-luxury font-semibold text-xl text-[#1E1E1C]">Orçamento Enviado!</h3>
                      <p className="text-stone-600 text-xs font-sans-luxury leading-relaxed max-w-sm">
                        Muito bem, <strong>{clientName}</strong>! Os detalhes da sua mesa posta para {guests} convidados foram enviados para nosso WhatsApp.
                      </p>
                      <p className="text-stone-500 text-[11px] font-sans-luxury leading-relaxed">
                        Se a janela do WhatsApp não abriu automaticamente, você pode falar conosco clicando no botão abaixo:
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setBudgetSuccess(false)}
                      className="text-xs text-[#B38E55] underline font-sans-luxury font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Simular Outra Composição
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP BUTTON (Optimized with ripple animation as requested) */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://wa.me/5511999999999?text=Ol%C3%A1%21+Gostaria+de+conhecer+o+acervo+de+aluguel+de+lou%C3%A7as+e+utens%C3%ADlios+da+La+Table."
          target="_blank" 
          rel="noopener noreferrer"
          className="relative h-14 w-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-all duration-300 hover:scale-110 group"
          title="Fale no WhatsApp"
          id="whatsapp-floating-btn"
        >
          {/* Animated rings */}
          <span className="absolute -inset-1 rounded-full border-2 border-emerald-400 opacity-70 animate-ping pointer-events-none" />
          <Phone className="h-6 w-6 font-bold" />
        </a>
      </div>

      {/* INTERACTIVE CATALOG MODAL (User requirement: link for catalog) */}
      <AnimatePresence>
        {catalogModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCatalogModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#FCFBF7] rounded-[32px] border border-[#EAD0A8]/30 max-w-lg w-full overflow-hidden p-8 relative z-10 text-left shadow-2xl"
            >
              <button 
                onClick={() => setCatalogModalOpen(false)}
                className="absolute top-6 right-6 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-6">
                
                <div className="space-y-2">
                  <div className="h-12 w-12 rounded-full bg-[#EAD0A8]/20 text-[#B38E55] flex items-center justify-center text-xl">
                    📖
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-normal text-[#1E1E1C]">Baixar Catálogo de Peças <br /><span className="italic text-[#B38E55]">Edição Completa 2026</span></h3>
                  <p className="font-sans-luxury text-stone-500 text-xs leading-relaxed font-light">
                    Digite seu e-mail abaixo para liberar o acesso instantâneo ao nosso catálogo digital de alta definição (PDF) com mais de 350 peças catalogadas em fotos reais.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {!catalogDownloaded ? (
                    <motion.form 
                      key="download-form"
                      onSubmit={handleCatalogDownload}
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="space-y-1">
                        <label className="text-[9px] font-sans-luxury uppercase tracking-wider text-[#787873] font-bold block">Seu E-mail Corporativo/Pessoal</label>
                        <input 
                          type="email" 
                          required
                          placeholder="Ex: joana@eventoexclusivo.com.br"
                          value={emailForCatalog}
                          onChange={e => setEmailForCatalog(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#E8E6DF] text-xs focus:ring-1 focus:ring-[#B38E55] focus:outline-none transition-all bg-white font-sans-luxury"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-full bg-[#1E1E1C] hover:bg-[#383835] text-[#EAD0A8] font-bold font-sans-luxury text-xs uppercase tracking-widest transition-all flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <Download className="h-4 w-4" />
                        <span>Acessar Catálogo Digital</span>
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div 
                      key="download-success"
                      className="text-center py-6 space-y-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <span className="text-4xl block">🎉</span>
                      <h4 className="font-serif-luxury text-lg font-semibold text-[#1E1E1C]">Catálogo Liberado!</h4>
                      <p className="text-stone-600 text-xs font-sans-luxury leading-relaxed">
                        Nós enviamos o PDF completo de alta definição para o seu e-mail: <strong>{emailForCatalog}</strong>.
                      </p>
                      <div className="p-3 bg-stone-100 rounded-xl border text-stone-500 text-[10px] leading-relaxed text-left">
                        💡 <strong>Observação:</strong> Você também foi redirecionado para abrir o catálogo visual de mesa posta em uma nova guia! Divirta-se escolhendo suas louças favoritas.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[10px] font-sans-luxury text-[#787873]">
                  <span>Formato: PDF Interativo (12MB)</span>
                  <span>Disponível 100% Online</span>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PORTFOLIO CREDITS FOOTER (As explicitly instructed, the portfolio link is ONLY in the footer!) */}
      <footer className="bg-[#1E1E1C] text-stone-400 py-12 border-t border-white/5 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8 mb-8">
          
          {/* Footer Logo */}
          <div className="flex flex-col text-left">
            <span className="font-serif-luxury text-xl font-normal tracking-[0.08em] text-white uppercase">
              La Table Acervo
            </span>
            <span className="text-[9px] font-sans-luxury text-stone-500 uppercase tracking-[0.15em] mt-0.5 block">
              Locação de Itens de Mesa Posta & Gastronomia
            </span>
          </div>

          {/* Quick legal / address lines */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-xs text-stone-500 font-sans-luxury font-light">
            <div className="flex items-center space-x-2">
              <MapPin className="h-3.5 w-3.5 text-[#EAD0A8]" />
              <span>Av. Europa, 1200 - Jardins, São Paulo/SP</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-3.5 w-3.5 text-[#EAD0A8]" />
              <span>Atendimento Comercial: Seg a Sex 09h às 18h</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-stone-500 font-sans-luxury">
          
          <p className="text-[10px] text-stone-600 font-mono uppercase tracking-wider text-center sm:text-left">
            © {new Date().getFullYear()} LA TABLE ACERVO DE LOUÇAS LTDA. CNPJ: 12.345.678/0001-90. TODOS OS DIREITOS RESERVADOS.
          </p>

          {/* THE ONLY DISCREET PORTFOLIO BACKLINK AS DIRECTED BY THE USER */}
          <div className="flex items-center space-x-2.5">
            <span className="h-1 w-1 rounded-full bg-[#EAD0A8]" />
            <a 
              href="/"
              onClick={(e) => {
                if (onBack) {
                  e.preventDefault();
                  onBack();
                }
              }}
              className="hover:text-white transition-colors duration-200 text-[#EAD0A8] text-[10px] font-mono tracking-widest uppercase flex items-center space-x-1"
            >
              <span>Desenvolvido por Augusto Dev Portfólio</span>
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}
