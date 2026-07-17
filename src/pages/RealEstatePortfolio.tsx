import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, 
  MapPin, 
  Maximize2, 
  BedDouble, 
  Car, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  MessageSquare, 
  Search, 
  Filter, 
  Check, 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Compass, 
  ChevronRight, 
  Award,
  Sparkles,
  ShieldCheck,
  Building
} from "lucide-react";

// Image Paths imported as ES Modules for production bundling
import mansionImg from "../assets/images/luxury_mansion_sp_1784137092375.jpg";
import penthouseImg from "../assets/images/luxury_penthouse_sp_1784137106538.jpg";
import beachHouseImg from "../assets/images/luxury_beach_house_1784137120735.jpg";

interface Property {
  id: string;
  title: string;
  category: "Mansão" | "Cobertura" | "Villa Praia";
  price: string;
  location: string;
  neighborhood: string;
  area: string;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parking: number;
  image: string;
  description: string;
  highlights: string[];
  features: string[];
}

export default function RealEstatePortfolio({ onBack }: { onBack?: () => void }) {
  const [activeTab, setActiveTab] = useState<"Todos" | "Mansão" | "Cobertura" | "Villa Praia">("Todos");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [visitForm, setVisitForm] = useState({ name: "", email: "", phone: "", date: "", time: "", message: "" });
  const [visitSubmitted, setVisitSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const properties: Property[] = [
    {
      id: "mansao-jardins",
      title: "Casa Origami: Uma Obra de Arte Arquitetônica nos Jardins",
      category: "Mansão",
      price: "R$ 18.500.000",
      location: "São Paulo, SP",
      neighborhood: "Jardim Europa",
      area: "780 m²",
      bedrooms: 4,
      suites: 4,
      bathrooms: 6,
      parking: 5,
      image: mansionImg,
      description: "Concebida por um renomado escritório internacional, a Casa Origami redefine o conceito de moradia urbana de luxo. Estruturada em balanços de concreto aparente e painéis de vidro termoacústico, o imóvel valoriza a iluminação natural e a privacidade. Um oásis com paisagismo exuberante e piscina integrada ao living de pé-direito duplo.",
      highlights: [
        "Piscina aquecida integrada ao living",
        "Piso de mármore Travertino Navona",
        "Automação residencial completa por voz e tablet",
        "Adega subterrânea climatizada para 800 garrafas"
      ],
      features: ["Concreto Aparente", "Segurança Armada 24h", "Placas Solares", "Dependência de Funcionários"]
    },
    {
      id: "cobertura-itaim",
      title: "Penthouse Horizon: Vista 360° Exclusiva no Itaim Bibi",
      category: "Cobertura",
      price: "R$ 24.000.000",
      location: "São Paulo, SP",
      neighborhood: "Itaim Bibi",
      area: "620 m²",
      bedrooms: 3,
      suites: 3,
      bathrooms: 5,
      parking: 4,
      image: penthouseImg,
      description: "Localizada no quadrilátero mais desejado do Itaim Bibi, esta cobertura duplex combina sofisticação contemporânea com lazer privativo incomparável. Com acabamentos em nogueira americana, o imóvel conta com área externa gourmet completa, deck elevado de madeira nobre e hidromassagem suspensa de frente para a linha do horizonte.",
      highlights: [
        "Vista panorâmica indevassável da cidade",
        "Suíte master com closet duplo e banho Sr. e Sra.",
        "Espaço gourmet de design minimalista italiano",
        "Gerador full atendendo a toda a unidade"
      ],
      features: ["Portaria Blindada", "Elevador com Biometria", "Jacuzzi Privativa", "Isolamento Acústico"]
    },
    {
      id: "villa-guaruja",
      title: "Villa Acqua: O Refúgio Perfeito Pé na Areia no Guarujá",
      category: "Villa Praia",
      price: "R$ 14.200.000",
      location: "Guarujá, SP",
      neighborhood: "Península",
      area: "540 m²",
      bedrooms: 5,
      suites: 5,
      bathrooms: 7,
      parking: 6,
      image: beachHouseImg,
      description: "Debruçada sobre o mar, a Villa Acqua proporciona o privilégio de acordar ouvindo o balanço das ondas. Uma estrutura leve e natural, onde a madeira de reflorestamento e as pedras naturais criam uma atmosfera de sofisticação pé na areia. Piscina de borda infinita que se confunde com o azul do oceano.",
      highlights: [
        "Acesso direto e privativo à praia",
        "Piscina infinita com borda de vidro voltada para o mar",
        "Área de spa completa com sauna úmida",
        "Suítes com sacadas panorâmicas suspensas"
      ],
      features: ["Pé na Areia", "Deck de Madeira", "Sauna Seca/Úmida", "Heliponto no Condomínio"]
    }
  ];

  const filteredProperties = properties.filter(prop => {
    const matchesCategory = activeTab === "Todos" || prop.category === activeTab;
    const matchesSearch = prop.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prop.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prop.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (visitForm.name && visitForm.phone && visitForm.date && visitForm.time) {
      setVisitSubmitted(true);
      setTimeout(() => {
        setVisitForm({ name: "", email: "", phone: "", date: "", time: "", message: "" });
        setVisitSubmitted(false);
      }, 4500);
    }
  };

  const openWhatsApp = (propTitle?: string) => {
    const defaultText = propTitle 
      ? `Olá! Gostaria de agendar uma visita e obter mais informações sobre o imóvel: ${propTitle}.`
      : "Olá! Gostaria de falar com um corretor especialista sobre imóveis exclusivos da VERTIKA.";
    window.open(`https://wa.me/5515997118125?text=${encodeURIComponent(defaultText)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1C1E] font-sans antialiased relative selection:bg-[#C5A880]/30 selection:text-black">
      
      {/* Sleek top brand accent line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#C5A880] to-[#E5D2B3] fixed top-0 left-0 right-0 z-50" />

      {/* Voltar ao Hub Developer overlay */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-3 py-2 bg-black/95 text-white hover:bg-black border border-white/10 rounded-lg shadow-2xl text-xs font-mono tracking-wider transition-all duration-300 group hover:border-[#00FF41]/40"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-[#00FF41] group-hover:-translate-x-1 transition-transform" />
          <span className="text-white/60 group-hover:text-white">VOLTAR AO HUB</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
        </button>
      </div>

      {/* HERO NAVIGATION */}
      <header className="sticky top-1.5 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-40 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2 bg-[#1C2029] rounded-lg text-[#C5A880] flex items-center justify-center shadow-lg">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <span className="font-serif font-black tracking-widest text-lg uppercase text-[#1C2029] block">
                VERTIKA
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#C5A880] uppercase font-bold block">
                IMÓVEIS EXCLUSIVOS
              </span>
            </div>
          </div>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center space-x-8 font-sans text-xs uppercase font-bold tracking-wider text-gray-500">
            <a href="#hero" className="hover:text-[#8E7044] transition-colors">Destaque</a>
            <a href="#vitrine" className="hover:text-[#8E7044] transition-colors">Vitrine</a>
            <a href="#manifesto" className="hover:text-[#8E7044] transition-colors">Manifesto</a>
            <a href="#atendimento" className="hover:text-[#8E7044] transition-colors">Contato</a>
          </nav>

          <div className="flex items-center space-x-4">
            <a 
              href="tel:15997118125" 
              className="hidden sm:flex font-mono text-xs text-gray-500 hover:text-black transition-colors items-center space-x-1.5 font-bold"
            >
              <Phone className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>(15) 99711-8125</span>
            </a>
            <button
              onClick={() => openWhatsApp()}
              className="py-2.5 px-5 rounded bg-[#1C2029] hover:bg-black text-[#C5A880] hover:text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md border border-[#C5A880]/20 cursor-pointer flex items-center space-x-2"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">Falar com Corretor</span>
              <span className="inline xs:hidden">Falar</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO CAROUSEL */}
      <section id="hero" className="relative min-h-[500px] lg:min-h-[620px] bg-[#12141A] text-white flex items-center overflow-hidden">
        
        {/* Background photo */}
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src={mansionImg} 
          alt="Mansão de Luxo Vertika" 
          className="absolute inset-0 w-full h-full object-cover object-center filter saturate-75 brightness-75 transition-transform duration-10000 hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-transparent z-10" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 relative z-20 w-full text-left">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#C5A880]/15 border border-[#C5A880]/40 text-[#C5A880] font-mono text-[9px] uppercase tracking-[0.25em] font-extrabold">
              <Award className="h-3.5 w-3.5 animate-pulse" />
              <span>ALTO PADRÃO IMOBILIÁRIO</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white">
              Arquitetura Premium para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0D8B4] via-[#C5A880] to-[#A08055]">Vidas Extraordinárias</span>.
            </h1>

            <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
              Curadoria cirúrgica dos imóveis mais imponentes e sofisticados do estado de São Paulo. De mansões minimalistas a coberturas com vistas indevassáveis.
            </p>

            {/* Quick search panel */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-2.5 rounded-lg max-w-xl flex flex-col xs:flex-row items-center gap-2 shadow-2xl">
              <div className="flex items-center space-x-2 px-3 py-2 w-full">
                <Search className="h-4 w-4 text-[#C5A880]" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar por condomínio, bairro ou cidade..."
                  className="bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none w-full"
                />
              </div>
              <a
                href="#vitrine"
                className="w-full xs:w-auto py-2.5 px-6 rounded bg-[#C5A880] hover:bg-[#D5B890] text-black font-sans text-xs font-bold uppercase tracking-wider transition-all text-center whitespace-nowrap"
              >
                Explorar Vitrine
              </a>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 font-mono text-[10px] text-gray-400 uppercase tracking-wider font-bold">
              <div className="flex items-center space-x-1.5">
                <Check className="h-4 w-4 text-[#C5A880]" />
                <span>Rigor Técnico Patrimonial</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Check className="h-4 w-4 text-[#C5A880]" />
                <span>Atendimento Altamente Privado</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Check className="h-4 w-4 text-[#C5A880]" />
                <span>Segurança e Sigilo</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROPERTY VITRINE */}
      <section id="vitrine" className="py-24 max-w-7xl mx-auto px-6 md:px-12 text-left">
        <div className="space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#8E7044] font-bold uppercase tracking-[0.2em] block">
                // O PORTFÓLIO DE PROPRIEDADES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2029]">
                Imóveis em Destaque
              </h2>
              <p className="font-sans text-xs sm:text-sm text-gray-500 max-w-2xl">
                Nossa seleção rigorosa atende a rigorosos critérios de design espacial, iluminação, segurança e prestígio de localização.
              </p>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {(["Todos", "Mansão", "Cobertura", "Villa Praia"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 rounded-lg font-mono text-[10px] font-extrabold uppercase tracking-widest border transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-[#1C2029] text-[#C5A880] border-[#1C2029] shadow-md"
                      : "bg-white text-gray-500 border-gray-100 hover:border-[#C5A880]/30 hover:text-black"
                  }`}
                >
                  {tab === "Todos" ? "Todos os Imóveis" : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search info text if searching */}
          {searchTerm && (
            <p className="text-xs font-mono text-gray-400">
              Exibindo resultados para: &ldquo;<strong className="text-black">{searchTerm}</strong>&rdquo;
            </p>
          )}

          {/* Property Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <motion.div
                key={prop.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedProperty(prop)}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl hover:border-[#C5A880]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={prop.image} 
                    alt={prop.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#1C2029]/90 text-[#C5A880] font-mono text-[9px] uppercase tracking-wider font-extrabold backdrop-blur-sm">
                    {prop.category}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-white pt-10">
                    <div className="flex items-center space-x-1 font-mono text-[10px] text-gray-300">
                      <MapPin className="h-3 w-3 text-[#C5A880]" />
                      <span>{prop.neighborhood}, {prop.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-serif text-lg font-black text-[#1C2029]">
                        {prop.price}
                      </span>
                      <span className="font-mono text-[9px] text-[#C5A880] uppercase tracking-wider font-bold">À venda</span>
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#1C2029] group-hover:text-[#8E7044] transition-colors line-clamp-2">
                      {prop.title}
                    </h3>
                  </div>

                  {/* Attributes Icons row */}
                  <div className="grid grid-cols-4 gap-2 py-3 border-y border-gray-50 text-[10px] font-mono text-gray-500 text-center">
                    <div className="space-y-1">
                      <Maximize2 className="h-3.5 w-3.5 mx-auto text-gray-400" />
                      <span className="block font-bold text-gray-800">{prop.area}</span>
                    </div>
                    <div className="space-y-1">
                      <BedDouble className="h-3.5 w-3.5 mx-auto text-gray-400" />
                      <span className="block font-bold text-gray-800">{prop.bedrooms} Suítes</span>
                    </div>
                    <div className="space-y-1">
                      <Car className="h-3.5 w-3.5 mx-auto text-gray-400" />
                      <span className="block font-bold text-gray-800">{prop.parking} Vagas</span>
                    </div>
                    <div className="space-y-1">
                      <ShieldCheck className="h-3.5 w-3.5 mx-auto text-gray-400" />
                      <span className="block font-bold text-gray-800">24h</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-semibold text-[#8E7044] group-hover:translate-x-1 transition-transform">
                    <span>Ver detalhes e agendar visita</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredProperties.length === 0 && (
              <div className="col-span-full py-16 text-center space-y-4">
                <p className="text-sm font-mono text-gray-400">Nenhum imóvel encontrado para as configurações de busca.</p>
                <button 
                  onClick={() => { setSearchTerm(""); setActiveTab("Todos"); }}
                  className="text-xs font-mono text-[#8E7044] font-bold underline"
                >
                  Limpar filtros de busca
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* DETAIL AND SCHEDULER DRAWER MODAL */}
      <AnimatePresence>
        {selectedProperty !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl border border-gray-200 max-w-4xl w-full p-6 md:p-8 text-left shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => { setSelectedProperty(null); setVisitSubmitted(false); }}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black focus:outline-none transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                
                {/* Left: Photos & specifications */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="relative rounded-lg overflow-hidden aspect-[16/10] shadow-md">
                    <img 
                      src={selectedProperty.image} 
                      alt={selectedProperty.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#1C2029] text-[#C5A880] font-mono text-[9px] uppercase tracking-wider font-extrabold">
                      {selectedProperty.category}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-1 font-mono text-[10px] text-gray-400 uppercase font-bold">
                      <MapPin className="h-3.5 w-3.5 text-[#C5A880]" />
                      <span>{selectedProperty.neighborhood} // {selectedProperty.location}</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C2029]">
                      {selectedProperty.title}
                    </h3>
                    <p className="font-serif text-lg md:text-xl font-black text-[#8E7044]">{selectedProperty.price}</p>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {selectedProperty.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2">
                    <h4 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-extrabold">Destaques Exclusivos:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProperty.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start space-x-2 text-xs text-gray-700">
                          <Check className="h-4 w-4 text-[#C5A880] mt-0.5 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional attributes list */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {selectedProperty.features.map((feature, idx) => (
                      <span key={idx} className="font-mono text-[9px] font-bold text-gray-500 bg-gray-50 border border-gray-100 rounded-md py-1 px-2.5">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Visit scheduling form */}
                <div className="lg:col-span-5 bg-gray-50 rounded-xl p-6 border border-gray-100 relative">
                  <div className="text-left space-y-2 mb-4">
                    <span className="font-mono text-[9px] text-[#8E7044] font-bold uppercase tracking-wider block">
                      // PRATICIDADE E CONFIDENCIALIDADE
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#1C2029]">
                      Agendar Visita Exclusiva
                    </h4>
                    <p className="font-sans text-[11px] text-gray-500 leading-relaxed">
                      Selecione sua preferência de dia e horário. Nossa equipe entrará em contato para formalizar com total descrição.
                    </p>
                  </div>

                  {visitSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 rounded-lg bg-[#C5A880]/10 border border-[#C5A880]/30 text-center space-y-4 my-8"
                    >
                      <div className="h-10 w-10 rounded-full bg-[#C5A880]/20 text-[#8E7044] flex items-center justify-center mx-auto">
                        <Check className="h-5 w-5" />
                      </div>
                      <h5 className="font-serif text-sm font-bold text-[#1C2029]">Agendamento Encaminhado</h5>
                      <p className="font-sans text-[11px] text-gray-600 leading-relaxed">
                        Prezado(a) <strong>{visitForm.name}</strong>, sua solicitação para o dia {visitForm.date} às {visitForm.time} foi recebida e encaminhada ao corretor responsável. Aguarde retorno via telefone nas próximas horas.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleVisitSubmit} className="space-y-4 text-left">
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Seu Nome *</label>
                        <input 
                          type="text" 
                          required
                          value={visitForm.name}
                          onChange={(e) => setVisitForm({ ...visitForm, name: e.target.value })}
                          placeholder="Ex: Ana Maria da Silva"
                          className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-xs text-gray-800 focus:outline-none focus:border-[#C5A880] transition-colors"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Seu Telefone / WhatsApp *</label>
                        <input 
                          type="tel" 
                          required
                          value={visitForm.phone}
                          onChange={(e) => setVisitForm({ ...visitForm, phone: e.target.value })}
                          placeholder="Ex: (11) 98765-4321"
                          className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-xs text-gray-800 focus:outline-none focus:border-[#C5A880] transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Melhor Data *</label>
                          <input 
                            type="date" 
                            required
                            value={visitForm.date}
                            onChange={(e) => setVisitForm({ ...visitForm, date: e.target.value })}
                            className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-xs text-gray-800 focus:outline-none focus:border-[#C5A880] transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Melhor Horário *</label>
                          <input 
                            type="time" 
                            required
                            value={visitForm.time}
                            onChange={(e) => setVisitForm({ ...visitForm, time: e.target.value })}
                            className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-xs text-gray-800 focus:outline-none focus:border-[#C5A880] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Mensagem Especial (Opcional)</label>
                        <textarea 
                          rows={2}
                          value={visitForm.message}
                          onChange={(e) => setVisitForm({ ...visitForm, message: e.target.value })}
                          placeholder="Gostaria de informar alguma preferência específica ou tirar dúvidas prévias?"
                          className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-xs text-gray-800 focus:outline-none focus:border-[#C5A880] transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded bg-[#1C2029] hover:bg-black text-[#C5A880] hover:text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Solicitar Agendamento</span>
                      </button>

                      {/* Alternate quick contact */}
                      <button
                        type="button"
                        onClick={() => openWhatsApp(selectedProperty.title)}
                        className="w-full py-2.5 rounded border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-sans text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                      >
                        <MessageSquare className="h-4 w-4 text-[#00FF41]" />
                        <span>Falar direto pelo WhatsApp</span>
                      </button>
                    </form>
                  )}
                </div>

              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="font-mono text-[9px] text-gray-400">Copyright © VERTIKA Imóveis Únicos</span>
                <button
                  onClick={() => { setSelectedProperty(null); setVisitSubmitted(false); }}
                  className="py-2 px-4 rounded hover:bg-gray-50 text-gray-500 font-sans text-xs font-bold uppercase tracking-wider"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MANIFESTO SECTION */}
      <section id="manifesto" className="py-24 bg-[#FAF9F5] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs text-[#8E7044] font-bold uppercase tracking-[0.2em] block">
                // O CONCEITO VERTIKA
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2029]">
                Por que a excelência arquitetônica importa?
              </h2>
              <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                Acreditamos que uma residência não é apenas um espaço geográfico delimitado por paredes, mas uma obra de engenharia humana que dialoga intimamente com a psicologia e as conquistas dos seus moradores.
              </p>
              <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                Por isso, não operamos com quantidade. Cada membro do nosso portfólio passa por uma avaliação estrutural completa antes de ser disponibilizado para visitas reservadas.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2 text-left">
                <div className="p-2.5 bg-white border border-gray-100 rounded-lg inline-block text-[#C5A880] shadow-sm">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#1C2029]">Segurança de Transação</h4>
                <p className="font-sans text-xs text-gray-500 leading-relaxed">
                  Todas as propriedades possuem documentação previamente auditada e livre de ônus judiciais para que sua aquisição seja 100% segura.
                </p>
              </div>

              <div className="space-y-2 text-left">
                <div className="p-2.5 bg-white border border-gray-100 rounded-lg inline-block text-[#C5A880] shadow-sm">
                  <Building className="h-5 w-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#1C2029]">Curadoria Exclusiva</h4>
                <p className="font-sans text-xs text-gray-500 leading-relaxed">
                  Nenhum imóvel em nossa plataforma é comum. Buscamos projetos assinados por grandes arquitetos nacionais e globais.
                </p>
              </div>

              <div className="space-y-2 text-left">
                <div className="p-2.5 bg-white border border-gray-100 rounded-lg inline-block text-[#C5A880] shadow-sm">
                  <Award className="h-5 w-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#1C2029]">Suporte Patrimonial</h4>
                <p className="font-sans text-xs text-gray-500 leading-relaxed">
                  Trabalhamos de forma integrada ao planejamento familiar e holdings para alinhar a transferência legal de ativos sem desgastes fiscais.
                </p>
              </div>

              <div className="space-y-2 text-left">
                <div className="p-2.5 bg-white border border-gray-100 rounded-lg inline-block text-[#C5A880] shadow-sm">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#1C2029]">Fidelidade Fotográfica</h4>
                <p className="font-sans text-xs text-gray-500 leading-relaxed">
                  Imagens autênticas de alta fidelidade visual. O que você visualiza no site reflete fielmente a imponência real de cada visitação.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT / ATENDIMENTO */}
      <section id="atendimento" className="py-24 bg-[#1C2029] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(197,168,128,0.06),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#C5A880] font-bold uppercase tracking-[0.2em] block">
                // ATENDIMENTO RESERVADO
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white animate-pulse">
                Inicie Sua Jornada Patrimonial Conosco
              </h2>
              <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
                Oferecemos canais diretos e criptografados para investidores de alto patrimônio. Entre em contato por telefone comercial ou envie-nos uma mensagem pelo formulário.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 rounded-xl bg-black/35 border border-white/5 text-left">
                <div className="p-2.5 bg-[#C5A880]/10 rounded-lg text-[#C5A880]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block font-bold">Contato Rápido</span>
                  <span className="font-sans text-sm font-bold text-white block mt-0.5">(15) 99711-8125</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-xl bg-black/35 border border-white/5 text-left">
                <div className="p-2.5 bg-[#C5A880]/10 rounded-lg text-[#C5A880]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block font-bold">Email de Parcerias</span>
                  <span className="font-sans text-sm font-semibold text-white block mt-0.5">atendimento@vertikaimoveis.com.br</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-xl bg-black/35 border border-white/5 text-left">
                <div className="p-2.5 bg-[#C5A880]/10 rounded-lg text-[#C5A880]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block font-bold">Sede Corporativa</span>
                  <span className="font-sans text-xs text-white block mt-0.5">Av. Brigadeiro Faria Lima, 3400, Itaim Bibi, São Paulo/SP</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white/5 border border-white/10 p-8 rounded-xl text-left">
            <h3 className="font-serif text-lg font-bold text-white mb-6 pb-2 border-b border-white/10">Fale com a Diretoria</h3>
            
            <form onSubmit={(e) => { e.preventDefault(); alert("Mensagem recebida com sucesso! Em breve um de nossos consultores retornará o contato."); }} className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Seu Nome Completo *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Carlos de Souza"
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Seu Telefone / WhatsApp *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="Ex: (11) 98888-7777"
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Mensagem ou Imóvel de Interesse</label>
                <textarea 
                  rows={3}
                  placeholder="Conte-nos o que você busca (área, região, finalidade ou o ID de um imóvel específico)..."
                  className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#C5A880] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded bg-[#C5A880] hover:bg-[#D5B890] text-black font-sans text-xs font-black uppercase tracking-wider transition-all"
              >
                Enviar Mensagem Segura
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-400 py-12 border-t border-white/5 text-center text-xs space-y-4">
        <p className="font-serif text-white tracking-widest text-sm uppercase">VERTIKA IMÓVEIS ÚNICOS</p>
        <p className="font-mono text-[10px] uppercase tracking-wider text-gray-500">CRECI/SP nº 45.890-J // Todos os direitos reservados</p>
      </footer>

    </div>
  );
}
