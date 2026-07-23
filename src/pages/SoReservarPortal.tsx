import React, { useState, useEffect } from "react";
import { 
  Compass, 
  Hotel, 
  Plane, 
  ShieldCheck, 
  Car, 
  Ticket, 
  Bus, 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  HelpCircle, 
  PhoneCall, 
  Mail, 
  ExternalLink, 
  Sliders, 
  Sparkles, 
  ChevronRight, 
  Star, 
  Shield, 
  Lock, 
  Menu, 
  X, 
  ArrowLeft, 
  DollarSign, 
  Layers, 
  Settings, 
  Plus, 
  Check, 
  FileText, 
  Heart, 
  Globe2, 
  BarChart3, 
  Eye, 
  Send, 
  Clock, 
  Zap,
  Tag
} from "lucide-react";

// SEO & Breadcrumb Framework
import { MetaTags, Breadcrumb, ProductSchema } from "../seo/SEOComponents";

// Destination Interface
interface DestinationItem {
  id: string;
  name: string;
  state: string;
  region: "Norte" | "Nordeste" | "Centro-Oeste" | "Sudeste" | "Sul";
  image: string;
  description: string;
  featured: boolean;
  hotelsAvailable: number;
  avgHotelPrice: number;
  hasTours: boolean;
  roteirosBrSlug: string;
  turismoBrSlug: string;
}

// Tour Item Interface
interface TourItem {
  id: string;
  cityId: string;
  cityName: string;
  title: string;
  image: string;
  duration: string;
  rating: number;
  reviewsCount: number;
  priceFrom: number;
  provider: "Viator" | "Roteiros BR Partner";
  affiliateUrl: string;
}

// Initial Cities Data
const INITIAL_DESTINATIONS: DestinationItem[] = [
  {
    id: "porto-de-pedras",
    name: "Porto de Pedras",
    state: "AL",
    region: "Nordeste",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "Paraíso ecológico na Rota dos Milagres com piscinas naturais, praias preservadas e o Santuário do Peixe-Boi.",
    featured: true,
    hotelsAvailable: 42,
    avgHotelPrice: 380,
    hasTours: true,
    roteirosBrSlug: "https://roteirosbr.com.br/destinos/al/porto-de-pedras",
    turismoBrSlug: "https://turismobr.com.br/hospedagem/al/porto-de-pedras"
  },
  {
    id: "rio-de-janeiro",
    name: "Rio de Janeiro",
    state: "RJ",
    region: "Sudeste",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80",
    description: "A Cidade Maravilhosa combina praias famosas, o Cristo Redentor, Pão de Açúcar e vida noturna vibrante.",
    featured: true,
    hotelsAvailable: 380,
    avgHotelPrice: 290,
    hasTours: true,
    roteirosBrSlug: "https://roteirosbr.com.br/destinos/rj/rio-de-janeiro",
    turismoBrSlug: "https://turismobr.com.br/hospedagem/rj/rio-de-janeiro"
  },
  {
    id: "gramado",
    name: "Gramado",
    state: "RS",
    region: "Sul",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    description: "Encanto europeu na Serra Gaúcha com gastronomia refinada, arquitetura enxaimel e festivais inesquecíveis.",
    featured: true,
    hotelsAvailable: 210,
    avgHotelPrice: 350,
    hasTours: true,
    roteirosBrSlug: "https://roteirosbr.com.br/destinos/rs/gramado",
    turismoBrSlug: "https://turismobr.com.br/hospedagem/rs/gramado"
  },
  {
    id: "porto-seguro",
    name: "Porto Seguro",
    state: "BA",
    region: "Nordeste",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    description: "Berço do Brasil com praias paradisíacas, centros históricos preservados e distritos como Arraial d'Ajuda e Trancoso.",
    featured: true,
    hotelsAvailable: 195,
    avgHotelPrice: 240,
    hasTours: true,
    roteirosBrSlug: "https://roteirosbr.com.br/destinos/ba/porto-seguro",
    turismoBrSlug: "https://turismobr.com.br/hospedagem/ba/porto-seguro"
  },
  {
    id: "maceio",
    name: "Maceió",
    state: "AL",
    region: "Nordeste",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    description: "Capital alagoana famosa pela orla urbana mais bonita do Brasil, mar de águas esverdeadas e barreiras de corais.",
    featured: true,
    hotelsAvailable: 160,
    avgHotelPrice: 280,
    hasTours: true,
    roteirosBrSlug: "https://roteirosbr.com.br/destinos/al/maceio",
    turismoBrSlug: "https://turismobr.com.br/hospedagem/al/maceio"
  },
  {
    id: "foz-do-iguacu",
    name: "Foz do Iguaçu",
    state: "PR",
    region: "Sul",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    description: "Uma das 7 Mapeadas Maravilhas da Natureza com as majestosas Cataratas do Iguaçu e Tríplice Fronteira.",
    featured: true,
    hotelsAvailable: 140,
    avgHotelPrice: 220,
    hasTours: true,
    roteirosBrSlug: "https://roteirosbr.com.br/destinos/pr/foz-do-iguacu",
    turismoBrSlug: "https://turismobr.com.br/hospedagem/pr/foz-do-iguacu"
  },
  {
    id: "salvador",
    name: "Salvador",
    state: "BA",
    region: "Nordeste",
    image: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=800&q=80",
    description: "Riqueza cultural, arquitetura colonial no Pelourinho, Farol da Barra e tempero incomparável da Bahia.",
    featured: false,
    hotelsAvailable: 180,
    avgHotelPrice: 230,
    hasTours: true,
    roteirosBrSlug: "https://roteirosbr.com.br/destinos/ba/salvador",
    turismoBrSlug: "https://turismobr.com.br/hospedagem/ba/salvador"
  },
  {
    id: "caldas-novas",
    name: "Caldas Novas",
    state: "GO",
    region: "Centro-Oeste",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
    description: "Maior estância hidrotermal do mundo, ideal para férias em família com parques aquáticos e águas quentes medicinais.",
    featured: false,
    hotelsAvailable: 110,
    avgHotelPrice: 260,
    hasTours: false,
    roteirosBrSlug: "https://roteirosbr.com.br/destinos/go/caldas-novas",
    turismoBrSlug: "https://turismobr.com.br/hospedagem/go/caldas-novas"
  }
];

// Sample Tours List
const SAMPLE_TOURS: TourItem[] = [
  {
    id: "tour-01",
    cityId: "porto-de-pedras",
    cityName: "Porto de Pedras",
    title: "Passeio de Jangada às Piscinas Naturais de Patacho",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    duration: "2 horas",
    rating: 4.9,
    reviewsCount: 128,
    priceFrom: 110,
    provider: "Viator",
    affiliateUrl: "https://viator.com/partner/porto-de-pedras-patacho"
  },
  {
    id: "tour-02",
    cityId: "porto-de-pedras",
    cityName: "Porto de Pedras",
    title: "Visita Guiada ao Santuário do Peixe-Boi Marinho",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
    duration: "3 horas",
    rating: 4.85,
    reviewsCount: 94,
    priceFrom: 95,
    provider: "Roteiros BR Partner",
    affiliateUrl: "https://roteirosbr.com.br/parceiros/peixe-boi"
  },
  {
    id: "tour-03",
    cityId: "rio-de-janeiro",
    cityName: "Rio de Janeiro",
    title: "Tour Completo: Cristo Redentor, Pão de Açúcar e Selarón",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80",
    duration: "7 horas",
    rating: 4.95,
    reviewsCount: 1420,
    priceFrom: 290,
    provider: "Viator",
    affiliateUrl: "https://viator.com/partner/rio-completo"
  },
  {
    id: "tour-04",
    cityId: "gramado",
    cityName: "Gramado",
    title: "Tour Maria Fumaça + Épopeia Italiana com Degustação",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80",
    duration: "8 horas",
    rating: 4.9,
    reviewsCount: 680,
    priceFrom: 340,
    provider: "Viator",
    affiliateUrl: "https://viator.com/partner/maria-fumaca"
  }
];

interface SoReservarProps {
  onBack?: () => void;
}

export default function SoReservarPortal({ onBack }: SoReservarProps) {
  // Navigation State
  const [activeTab, setActiveTab] = useState<
    "home" | "hoteis" | "voos" | "monte" | "seguro" | "carros" | "passeios" | "onibus" | "destinos" | "sobre" | "contato" | "faq" | "admin"
  >("home");

  // Mobile Menu Drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search Widget State
  const [searchTab, setSearchTab] = useState<"hoteis" | "voos" | "seguro" | "carros" | "passeios" | "onibus">("hoteis");
  const [searchDestination, setSearchDestination] = useState("Porto de Pedras, AL");
  const [searchOrigin, setSearchOrigin] = useState("São Paulo (GRU)");
  const [searchCheckIn, setSearchCheckIn] = useState("2026-08-15");
  const [searchCheckOut, setSearchCheckOut] = useState("2026-08-22");
  const [searchGuests, setSearchGuests] = useState(2);
  const [searchRooms, setSearchRooms] = useState(1);

  // Destination Region Filter
  const [selectedRegion, setSelectedRegion] = useState<string>("Todos");

  // Selected City Details Modal / View
  const [selectedCity, setSelectedCity] = useState<DestinationItem | null>(null);

  // "Monte sua Viagem" Step-by-Step State
  const [builderStep, setBuilderStep] = useState(1);
  const [tripPlan, setTripPlan] = useState({
    destination: "Porto de Pedras, AL",
    includeFlight: true,
    originFlight: "São Paulo (GRU)",
    includeHotel: true,
    hotelStyle: "Resort Beira-Mar",
    includeInsurance: true,
    includeCar: true,
    includeTours: true,
  });

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Dúvida sobre reserva",
    message: "",
    acceptPrivacy: false,
  });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Affiliate Redirect Modal Simulator
  const [redirectModal, setRedirectModal] = useState<{
    open: boolean;
    partnerName: string;
    serviceName: string;
    targetUrl: string;
  }>({
    open: false,
    partnerName: "",
    serviceName: "",
    targetUrl: "",
  });

  // Admin CMS State Simulator
  const [destinationsList, setDestinationsList] = useState<DestinationItem[]>(INITIAL_DESTINATIONS);
  const [newCityName, setNewCityName] = useState("");
  const [newCityState, setNewCityState] = useState("BA");
  const [newCityRegion, setNewCityRegion] = useState<"Nordeste" | "Sudeste" | "Sul" | "Norte" | "Centro-Oeste">("Nordeste");
  const [affiliateClickStats, setAffiliateClickStats] = useState(1248);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Trigger Partner Affiliate Redirect
  const handlePartnerRedirect = (partnerName: string, serviceName: string, targetUrl: string) => {
    setAffiliateClickStats((prev) => prev + 1);
    setRedirectModal({
      open: true,
      partnerName,
      serviceName,
      targetUrl,
    });
  };

  // Filtered Destinations
  const filteredDestinations = destinationsList.filter((d) => {
    if (selectedRegion === "Todos") return true;
    return d.region === selectedRegion;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-[#FF5A1F]/20 selection:text-[#FF5A1F] relative overflow-x-hidden">
      
      {/* SEO Meta Tags */}
      <MetaTags 
        title="So Reservar - Sua Viagem Começa Aqui! | Hotéis, Passagens, Seguro & Carros"
        description="Portal completo para pesquisar e reservar hotéis, passagens aéreas, seguro viagem, aluguel de carros, passeios e transporte. Monte sua viagem do seu jeito."
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F2B5B] text-white px-5 py-3 rounded-2xl font-sans text-xs font-bold shadow-[0_10px_30px_rgba(15,43,91,0.3)] flex items-center space-x-2 animate-bounce border border-white/20">
          <CheckCircle2 className="h-4 w-4 text-[#FF5A1F]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar for Portfolio Navigation */}
      <div className="bg-[#0A192F] text-white px-4 py-2 text-xs font-mono flex items-center justify-between border-b border-white/10">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              if (onBack) onBack();
              else {
                window.history.pushState({}, "", "/");
                window.dispatchEvent(new Event("popstate"));
              }
            }}
            className="flex items-center space-x-1.5 text-white hover:text-[#FF5A1F] font-bold uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>← Retornar ao Portfólio</span>
          </button>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline text-gray-300 font-sans">
            Caso 22 // Portal de Reservas de Viagem (soreservar.com.br)
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[10px]">
          <span className="bg-[#FF5A1F]/20 text-[#FF5A1F] border border-[#FF5A1F]/40 px-2 py-0.5 rounded font-bold uppercase">
            Sua Viagem Começa Aqui!
          </span>
          <button
            onClick={() => setActiveTab("admin")}
            className="hidden sm:flex items-center space-x-1 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <Settings className="h-3.5 w-3.5 text-[#00A3FF]" />
            <span>Painel Admin WordPress</span>
          </button>
        </div>
      </div>

      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          
          {/* Logo So Reservar */}
          <div 
            onClick={() => {
              setActiveTab("home");
              setSelectedCity(null);
            }} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-[#0F2B5B] to-[#00A3FF] p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <div className="h-full w-full bg-[#0F2B5B] rounded-[14px] flex items-center justify-center text-white">
                <Compass className="h-6 w-6 text-[#FF5A1F]" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline space-x-1">
                <span className="font-serif font-black text-xl text-[#0F2B5B] tracking-tight">So</span>
                <span className="font-sans font-black text-xl text-[#FF5A1F] uppercase tracking-wide">Reservar</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-tight">Sua Viagem Começa Aqui!</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { id: "home", label: "Início" },
              { id: "hoteis", label: "Hotéis" },
              { id: "voos", label: "Passagens" },
              { id: "seguro", label: "Seguro" },
              { id: "carros", label: "Carros" },
              { id: "passeios", label: "Passeios" },
              { id: "onibus", label: "Ônibus" },
              { id: "destinos", label: "Destinos" },
              { id: "sobre", label: "Sobre" },
              { id: "contato", label: "Contato" },
            ].map((nav) => {
              const isActive = activeTab === nav.id && !selectedCity;
              return (
                <button
                  key={nav.id}
                  onClick={() => {
                    setActiveTab(nav.id as any);
                    setSelectedCity(null);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#0F2B5B] text-white shadow-sm"
                      : "text-slate-600 hover:text-[#0F2B5B] hover:bg-slate-100"
                  }`}
                >
                  {nav.label}
                </button>
              );
            })}
          </nav>

          {/* Highlighted CTA: Monte sua Viagem */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => {
                setActiveTab("monte");
                setSelectedCity(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5A1F] to-[#FF7A00] text-white font-bold text-xs shadow-md shadow-[#FF5A1F]/25 hover:shadow-lg hover:brightness-110 transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Monte sua Viagem</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-3 animate-fade-in text-left">
            {[
              { id: "home", label: "Início" },
              { id: "hoteis", label: "Hotéis" },
              { id: "voos", label: "Passagens Aéreas" },
              { id: "monte", label: "Monte sua Viagem" },
              { id: "seguro", label: "Seguro Viagem" },
              { id: "carros", label: "Aluguel de Carros" },
              { id: "passeios", label: "Passeios & Atrações" },
              { id: "onibus", label: "Passagens de Ônibus" },
              { id: "destinos", label: "Destinos em Destaque" },
              { id: "sobre", label: "Sobre o So Reservar" },
              { id: "contato", label: "Contato & Suporte" },
              { id: "faq", label: "Perguntas Frequentes" },
              { id: "admin", label: "Painel Admin (Simulador)" },
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => {
                  setActiveTab(nav.id as any);
                  setSelectedCity(null);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  activeTab === nav.id
                    ? "bg-[#0F2B5B] text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>{nav.label}</span>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </button>
            ))}
          </div>
        )}
      </header>

      {/* SINGLE DESTINATION DETAIL VIEW (If Selected) */}
      {selectedCity ? (
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8 text-left animate-fade-in">
          
          <Breadcrumb items={[
            { label: "Início", path: "/" },
            { label: "Destinos", path: "/#destinos" },
            { label: `${selectedCity.name} - ${selectedCity.state}`, path: `#` }
          ]} />

          {/* City Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-[#0A192F] text-white min-h-[380px] flex flex-col justify-end p-8 md:p-12 shadow-2xl border border-slate-200">
            <img
              src={selectedCity.image}
              alt={selectedCity.name}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/60 to-transparent" />

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="flex items-center space-x-2">
                <span className="bg-[#FF5A1F] text-white px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider">
                  {selectedCity.region}
                </span>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold">
                  {selectedCity.hotelsAvailable}+ Hospedagens Cadastradas
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-serif font-black leading-tight">
                Reserve sua Viagem para {selectedCity.name} – {selectedCity.state}
              </h1>

              <p className="text-sm md:text-base text-slate-200 max-w-2xl leading-relaxed">
                {selectedCity.description}
              </p>

              {/* Quick Action Buttons Grid */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handlePartnerRedirect("Expedia / Hotels.com", `Hotéis em ${selectedCity.name}`, `https://expedia.com/affiliate/hotels/${selectedCity.id}`)}
                  className="px-5 py-2.5 rounded-xl bg-[#FF5A1F] hover:bg-orange-600 text-white font-bold text-xs flex items-center space-x-2 shadow-lg cursor-pointer"
                >
                  <Hotel className="h-4 w-4" />
                  <span>Buscar Hotéis</span>
                </button>

                <button
                  onClick={() => handlePartnerRedirect("Parceiros Promo", `Voos para ${selectedCity.name}`, `https://parceirospromo.com.br/passagens/${selectedCity.id}`)}
                  className="px-5 py-2.5 rounded-xl bg-[#00A3FF] hover:bg-sky-600 text-white font-bold text-xs flex items-center space-x-2 shadow-lg cursor-pointer"
                >
                  <Plane className="h-4 w-4" />
                  <span>Passagens Aéreas</span>
                </button>

                <button
                  onClick={() => handlePartnerRedirect("Parceiros Promo", `Seguro Viagem`, `https://parceirospromo.com.br/seguro`)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs flex items-center space-x-2 cursor-pointer"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Calcular Seguro</span>
                </button>

                <button
                  onClick={() => handlePartnerRedirect("Rentalcars", `Aluguel de Carro em ${selectedCity.name}`, `https://rentalcars.com/affiliate`)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs flex items-center space-x-2 cursor-pointer"
                >
                  <Car className="h-4 w-4" />
                  <span>Alugar Carro</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setSelectedCity(null)}
              className="absolute top-6 right-6 p-3 bg-black/60 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* SYNERGY CALLOUT TO ROTEIROS BR & TURISMO BR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Roteiros BR Box */}
            <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-6 border border-emerald-500/30 space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                <Globe2 className="h-4 w-4" />
                <span>Informações & Roteiros Turísticos</span>
              </div>
              <h3 className="text-xl font-bold font-serif">O que fazer em {selectedCity.name}?</h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Descubra os melhores restaurantes, atrações imperdíveis, praias secretas e passeios culturais com o guia especializado do Roteiros BR.
              </p>
              <a
                href={selectedCity.roteirosBrSlug}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                <span>Veja o Roteiro Completo no Roteiros BR</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            {/* Turismo BR Box */}
            <div className="bg-gradient-to-br from-[#0F2B5B] to-slate-900 text-white rounded-3xl p-6 border border-sky-500/30 space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 text-[#00A3FF] font-mono text-xs font-bold uppercase">
                <Hotel className="h-4 w-4" />
                <span>Divulgação de Meios de Hospedagem</span>
              </div>
              <h3 className="text-xl font-bold font-serif">Conheça Hospedagens em {selectedCity.name}</h3>
              <p className="text-xs text-sky-100 leading-relaxed">
                Explore a vitrine de pousadas, hotéis boutique e resorts parceiros cadastrados no portal Turismo BR.
              </p>
              <a
                href={selectedCity.turismoBrSlug}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#00A3FF] hover:bg-sky-600 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                <span>Conheça Hospedagens no Turismo BR</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

          </div>

          {/* AVAILABLE TOURS SECTION IN THIS CITY */}
          {selectedCity.hasTours ? (
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-[#0F2B5B]">
                Passeios Selecionados em {selectedCity.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SAMPLE_TOURS.map((tour) => (
                  <div key={tour.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div className="relative aspect-video bg-slate-100">
                      <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-[#0F2B5B] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                        {tour.provider}
                      </div>
                    </div>
                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                          <span>⏱ {tour.duration}</span>
                          <span className="text-amber-500 font-bold">★ {tour.rating} ({tour.reviewsCount})</span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm">{tour.title}</h4>
                      </div>

                      <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block">A partir de</span>
                          <span className="text-lg font-extrabold text-[#FF5A1F]">R$ {tour.priceFrom}</span>
                        </div>
                        <button
                          onClick={() => handlePartnerRedirect(tour.provider, tour.title, tour.affiliateUrl)}
                          className="px-4 py-2 bg-[#0F2B5B] hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer"
                        >
                          Reservar Passeio
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-6 text-center space-y-3">
              <Info className="h-6 w-6 text-amber-600 mx-auto" />
              <p className="text-xs font-medium">
                Ainda não encontramos passeios com inventário automático direto para este destino no momento.
              </p>
              <a
                href={selectedCity.roteirosBrSlug}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-xl"
              >
                <span>Conheça os Passeios no Roteiros BR</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}

        </main>
      ) : null}

      {/* MAIN HOMEPAGE / TAB CONTENT */}
      {!selectedCity && (
        <>
          {/* ================= TAB: INÍCIO (HOMEPAGE) ================= */}
          {activeTab === "home" && (
            <div className="space-y-16 animate-fade-in pb-16">
              
              {/* HERO SECTION */}
              <section className="relative bg-gradient-to-br from-[#0F2B5B] via-[#0A192F] to-[#1E40AF] text-white pt-12 pb-24 px-4 md:px-8 overflow-hidden rounded-b-[40px] shadow-2xl">
                
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent" />

                <div className="relative max-w-5xl mx-auto text-center space-y-6 z-10">
                  <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md text-xs font-semibold text-white">
                    <Sparkles className="h-4 w-4 text-[#FF5A1F]" />
                    <span>Portal Completo de Pesquisa & Reservas</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-white leading-tight">
                    Sua Viagem <span className="text-[#FF5A1F]">Começa Aqui!</span>
                  </h1>

                  <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
                    Escolha seu destino, compare as melhores opções e organize sua viagem em um só lugar com facilidade, segurança e economia.
                  </p>

                  {/* Primary CTA Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                    <button
                      onClick={() => setActiveTab("monte")}
                      className="px-8 py-4 rounded-2xl bg-[#FF5A1F] hover:bg-orange-600 text-white font-bold text-sm shadow-xl shadow-[#FF5A1F]/30 hover:scale-105 transition-all flex items-center space-x-2 cursor-pointer"
                    >
                      <Sparkles className="h-5 w-5" />
                      <span>Monte sua Viagem</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("destinos")}
                      className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-bold text-sm transition-all flex items-center space-x-2 cursor-pointer"
                    >
                      <Compass className="h-5 w-5 text-[#00A3FF]" />
                      <span>Escolha seu Destino</span>
                    </button>
                  </div>
                </div>

                {/* MULTI-TAB SEARCH WIDGET */}
                <div className="relative max-w-5xl mx-auto mt-12 bg-white rounded-3xl p-6 text-slate-800 shadow-2xl border border-slate-200/80 text-left z-20">
                  
                  {/* Search Tabs */}
                  <div className="flex items-center space-x-2 border-b border-slate-200 pb-4 overflow-x-auto scrollbar-none">
                    {[
                      { id: "hoteis", label: "Hotéis", icon: Hotel },
                      { id: "voos", label: "Passagens Aéreas", icon: Plane },
                      { id: "seguro", label: "Seguro Viagem", icon: ShieldCheck },
                      { id: "carros", label: "Aluguel de Carros", icon: Car },
                      { id: "passeios", label: "Passeios", icon: Ticket },
                      { id: "onibus", label: "Ônibus", icon: Bus },
                    ].map((st) => {
                      const Icon = st.icon;
                      const isActive = searchTab === st.id;
                      return (
                        <button
                          key={st.id}
                          onClick={() => setSearchTab(st.id as any)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 whitespace-nowrap transition-all cursor-pointer ${
                            isActive
                              ? "bg-[#0F2B5B] text-white shadow-sm"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <Icon className={`h-4 w-4 ${isActive ? "text-[#FF5A1F]" : "text-slate-400"}`} />
                          <span>{st.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Dynamic Form According to Active Search Tab */}
                  <div className="pt-6">
                    {searchTab === "hoteis" && (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                            <MapPin className="h-3.5 w-3.5 text-[#FF5A1F]" />
                            <span>Destino ou Nome do Hotel</span>
                          </label>
                          <input
                            type="text"
                            value={searchDestination}
                            onChange={(e) => setSearchDestination(e.target.value)}
                            placeholder="Ex: Porto de Pedras, AL"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0F2B5B]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                            <Calendar className="h-3.5 w-3.5 text-[#00A3FF]" />
                            <span>Check-in / Check-out</span>
                          </label>
                          <input
                            type="date"
                            value={searchCheckIn}
                            onChange={(e) => setSearchCheckIn(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0F2B5B]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                            <Users className="h-3.5 w-3.5 text-slate-500" />
                            <span>Hóspedes & Quartos</span>
                          </label>
                          <select
                            value={searchGuests}
                            onChange={(e) => setSearchGuests(parseInt(e.target.value))}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0F2B5B]"
                          >
                            <option value={1}>1 Hóspede • 1 Quarto</option>
                            <option value={2}>2 Hóspedes • 1 Quarto</option>
                            <option value={3}>3 Hóspedes • 1 Quarto</option>
                            <option value={4}>4+ Hóspedes • Família</option>
                          </select>
                        </div>

                        <button
                          onClick={() => handlePartnerRedirect("Expedia / Hotels.com", `Pesquisa de Hotéis em ${searchDestination}`, `https://expedia.com/hotels?destination=${encodeURIComponent(searchDestination)}`)}
                          className="w-full py-3 bg-[#FF5A1F] hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <Search className="h-4 w-4" />
                          <span>Pesquisar Hotéis</span>
                        </button>
                      </div>
                    )}

                    {searchTab === "voos" && (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Origem</label>
                          <input
                            type="text"
                            value={searchOrigin}
                            onChange={(e) => setSearchOrigin(e.target.value)}
                            placeholder="São Paulo (GRU)"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0F2B5B]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Destino</label>
                          <input
                            type="text"
                            value={searchDestination}
                            onChange={(e) => setSearchDestination(e.target.value)}
                            placeholder="Maceió (MCZ)"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0F2B5B]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Data de Ida</label>
                          <input
                            type="date"
                            value={searchCheckIn}
                            onChange={(e) => setSearchCheckIn(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0F2B5B]"
                          />
                        </div>

                        <button
                          onClick={() => handlePartnerRedirect("Parceiros Promo", `Comparador de Voos: ${searchOrigin} → ${searchDestination}`, `https://parceirospromo.com.br/passagens`)}
                          className="w-full py-3 bg-[#00A3FF] hover:bg-sky-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <Plane className="h-4 w-4" />
                          <span>Pesquisar Passagens</span>
                        </button>
                      </div>
                    )}

                    {searchTab === "seguro" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Destino da Viagem</label>
                          <select className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0F2B5B]">
                            <option>Brasil (Nacional)</option>
                            <option>América do Sul</option>
                            <option>América do Norte (EUA / Canadá)</option>
                            <option>Europa (Tratado de Schengen)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Período da Viagem</label>
                          <input
                            type="date"
                            value={searchCheckIn}
                            onChange={(e) => setSearchCheckIn(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0F2B5B]"
                          />
                        </div>

                        <button
                          onClick={() => handlePartnerRedirect("Parceiros Promo", "Cálculo de Seguro Viagem", "https://parceirospromo.com.br/seguro")}
                          className="w-full py-3 bg-[#0F2B5B] hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <ShieldCheck className="h-4 w-4 text-[#FF5A1F]" />
                          <span>Calcular Seguro Viagem</span>
                        </button>
                      </div>
                    )}

                    {searchTab === "carros" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Local de Retirada</label>
                          <input
                            type="text"
                            value={searchDestination}
                            onChange={(e) => setSearchDestination(e.target.value)}
                            placeholder="Aeroporto ou Cidade"
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0F2B5B]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Data de Retirada</label>
                          <input
                            type="date"
                            value={searchCheckIn}
                            onChange={(e) => setSearchCheckIn(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0F2B5B]"
                          />
                        </div>

                        <button
                          onClick={() => handlePartnerRedirect("Rentalcars", `Comparador de Aluguel de Carro`, "https://rentalcars.com")}
                          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <Car className="h-4 w-4" />
                          <span>Pesquisar Carros</span>
                        </button>
                      </div>
                    )}

                    {(searchTab === "passeios" || searchTab === "onibus") && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Cidade do Destino</label>
                          <input
                            type="text"
                            value={searchDestination}
                            onChange={(e) => setSearchDestination(e.target.value)}
                            placeholder="Ex: Gramado, Rio de Janeiro..."
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0F2B5B]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700">Data Prevista</label>
                          <input
                            type="date"
                            value={searchCheckIn}
                            onChange={(e) => setSearchCheckIn(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#0F2B5B]"
                          />
                        </div>

                        <button
                          onClick={() => handlePartnerRedirect("Viator / Parceiros", `Atrações e Passagens em ${searchDestination}`, "https://viator.com")}
                          className="w-full py-3 bg-[#0F2B5B] hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                        >
                          <Ticket className="h-4 w-4 text-[#FF5A1F]" />
                          <span>Buscar Opções</span>
                        </button>
                      </div>
                    )}

                  </div>

                </div>

              </section>

              {/* SERVICES CARDS SECTION */}
              <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8 text-left">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#FF5A1F] uppercase tracking-wider">Principais Serviços</span>
                  <h2 className="text-2xl md:text-3xl font-serif font-black text-[#0F2B5B]">
                    Tudo para sua Viagem em um Só Lugar
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Hotéis & Pousadas",
                      desc: "Pesquise hospedagens aconchegantes ou resorts luxuosos para o seu destino.",
                      icon: Hotel,
                      btn: "Buscar hotéis",
                      action: () => setActiveTab("hoteis"),
                      badge: "Expedia & Hotels.com"
                    },
                    {
                      title: "Passagens Aéreas",
                      desc: "Compare voos nacionais e internacionais das principais companhias.",
                      icon: Plane,
                      btn: "Buscar passagens",
                      action: () => setActiveTab("voos"),
                      badge: "Parceiros Promo"
                    },
                    {
                      title: "Seguro Viagem",
                      desc: "Viaje com total proteção médica, bagagem e tranquilidade familiar.",
                      icon: ShieldCheck,
                      btn: "Calcular seguro",
                      action: () => setActiveTab("seguro"),
                      badge: "Cobertura Completa"
                    },
                    {
                      title: "Aluguel de Carros",
                      desc: "Encontre um carro ideal para aproveitar cada momento do seu destino.",
                      icon: Car,
                      btn: "Alugar carro",
                      action: () => setActiveTab("carros"),
                      badge: "Rentalcars"
                    },
                    {
                      title: "Passeios & Atrações",
                      desc: "Reserve ingressos, tours guiados e experiências imperdíveis.",
                      icon: Ticket,
                      btn: "Ver passeios",
                      action: () => setActiveTab("passeios"),
                      badge: "Viator & Roteiros BR"
                    },
                    {
                      title: "Passagens de Ônibus",
                      desc: "Pesquise transporte rodoviário confortável para diversas rotas.",
                      icon: Bus,
                      btn: "Buscar ônibus",
                      action: () => setActiveTab("onibus"),
                      badge: "Viação Rodoviária"
                    },
                  ].map((service, idx) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#0F2B5B]/30 transition-all group flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="h-12 w-12 rounded-2xl bg-[#0F2B5B]/10 text-[#0F2B5B] group-hover:bg-[#0F2B5B] group-hover:text-white transition-colors flex items-center justify-center">
                              <Icon className="h-6 w-6" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                              {service.badge}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-slate-800 font-serif">{service.title}</h3>
                          <p className="text-xs text-slate-500 leading-relaxed">{service.desc}</p>
                        </div>

                        <button
                          onClick={service.action}
                          className="w-full py-2.5 bg-slate-100 hover:bg-[#0F2B5B] hover:text-white text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                        >
                          <span>{service.btn}</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* SECTION: MONTE SUA VIAGEM DO SEU JEITO */}
              <section className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="bg-gradient-to-br from-[#0F2B5B] to-[#0A192F] rounded-3xl p-8 md:p-12 text-white text-left space-y-8 shadow-2xl relative overflow-hidden">
                  
                  <div className="max-w-2xl space-y-2">
                    <span className="bg-[#FF5A1F] text-white px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest">
                      Monte sua Viagem do Seu Jeito
                    </span>
                    <h2 className="text-2xl md:text-4xl font-serif font-black">
                      Organize Cada Etapa da sua Próxima Aventura
                    </h2>
                    <p className="text-xs md:text-sm text-slate-300">
                      O So Reservar não exige pacotes fechados. Você escolhe livremente quais serviços deseja reservar.
                    </p>
                  </div>

                  {/* Steps Roadmap */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 font-sans text-xs">
                    {[
                      { step: "1", title: "Destino", icon: MapPin },
                      { step: "2", title: "Passagem", icon: Plane },
                      { step: "3", title: "Hotel", icon: Hotel },
                      { step: "4", title: "Seguro", icon: ShieldCheck },
                      { step: "5", title: "Carro", icon: Car },
                      { step: "6", title: "Passeios", icon: Ticket },
                    ].map((st, i) => {
                      const Icon = st.icon;
                      return (
                        <div key={i} className="bg-white/10 border border-white/10 rounded-2xl p-4 text-center space-y-2 backdrop-blur-md">
                          <span className="h-6 w-6 rounded-full bg-[#FF5A1F] text-white text-[11px] font-extrabold flex items-center justify-center mx-auto">
                            {st.step}
                          </span>
                          <Icon className="h-5 w-5 mx-auto text-[#00A3FF]" />
                          <p className="font-bold">{st.title}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 gap-4">
                    <p className="text-xs text-slate-300 italic">
                      "Cada serviço pode ser reservado separadamente nos parceiros autorizados."
                    </p>
                    <button
                      onClick={() => setActiveTab("monte")}
                      className="px-6 py-3 bg-[#FF5A1F] hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Começar a Montar Minha Viagem</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                </div>
              </section>

              {/* DESTINOS EM DESTAQUE */}
              <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8 text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#FF5A1F] uppercase tracking-wider">Cidades Populares</span>
                    <h2 className="text-2xl md:text-3xl font-serif font-black text-[#0F2B5B]">
                      Destinos em Destaque no Brasil
                    </h2>
                  </div>

                  {/* Region Filter Buttons */}
                  <div className="flex items-center space-x-1 overflow-x-auto pb-1 scrollbar-none">
                    {["Todos", "Nordeste", "Sudeste", "Sul", "Centro-Oeste", "Norte"].map((reg) => (
                      <button
                        key={reg}
                        onClick={() => setSelectedRegion(reg)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                          selectedRegion === reg
                            ? "bg-[#0F2B5B] text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {reg}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredDestinations.map((dest) => (
                    <div
                      key={dest.id}
                      onClick={() => setSelectedCity(dest)}
                      className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0F2B5B]/30 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                    >
                      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-[#0F2B5B] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
                          {dest.state} • {dest.region}
                        </div>
                      </div>

                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <h3 className="font-serif font-bold text-slate-800 text-lg group-hover:text-[#FF5A1F] transition-colors">
                            {dest.name}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-2">{dest.description}</p>
                        </div>

                        <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-600">
                            {dest.hotelsAvailable} Hotéis
                          </span>
                          <span className="text-xs font-bold text-[#FF5A1F] group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                            <span>Planejar viagem</span>
                            <ChevronRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* INTEGRATION CALLOUT WITH ROTEIROS BR & TURISMO BR */}
              <section className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 space-y-8 shadow-2xl text-left">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    
                    <div className="space-y-4 max-w-2xl">
                      <div className="inline-flex items-center space-x-2 text-emerald-400 text-xs font-mono font-bold uppercase">
                        <Globe2 className="h-4 w-4" />
                        <span>Sinergia de Ecossistema de Turismo</span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-serif font-black">
                        Ainda escolhendo o que fazer no destino?
                      </h3>

                      <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                        Conheça atrações imperdíveis, roteiros prontos, dicas de gastronomia e vida noturna no portal parceiro <strong>Roteiros BR</strong>, ou encontre meios de hospedagem no <strong>Turismo BR</strong>.
                      </p>

                      <div className="flex flex-wrap gap-4 pt-2">
                        <a
                          href="https://roteirosbr.com.br"
                          target="_blank"
                          rel="noreferrer"
                          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all inline-flex items-center space-x-2"
                        >
                          <span>Conhecer o Roteiros BR</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>

                        <a
                          href="https://turismobr.com.br"
                          target="_blank"
                          rel="noreferrer"
                          className="px-6 py-3 bg-[#00A3FF] hover:bg-sky-600 text-white font-bold text-xs rounded-xl transition-all inline-flex items-center space-x-2"
                        >
                          <span>Conhecer o Turismo BR</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 font-mono text-xs text-slate-300 max-w-md w-full">
                      <div className="flex items-center space-x-2 text-[#FF5A1F] font-bold">
                        <Compass className="h-4 w-4" />
                        <span>Divisão de Funções do Ecossistema:</span>
                      </div>
                      <ul className="space-y-2 text-[11px] list-disc list-inside text-slate-300">
                        <li><strong className="text-white">So Reservar:</strong> Pesquisa e reservas de viagens</li>
                        <li><strong className="text-white">Roteiros BR:</strong> Guia de atrações, passeios e roteiros</li>
                        <li><strong className="text-white">Turismo BR:</strong> Vitrine de pousadas e hospedagens</li>
                      </ul>
                    </div>

                  </div>
                </div>
              </section>

              {/* WHY USE SO RESERVAR */}
              <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8 text-left">
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold text-[#FF5A1F] uppercase tracking-wider">Benefícios</span>
                  <h2 className="text-2xl md:text-3xl font-serif font-black text-[#0F2B5B]">
                    Por que Utilizar o So Reservar?
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Tudo em um Só Lugar",
                      desc: "Acesse hotéis, voos, seguro, carros e passeios sem precisar navegar em dezenas de sites separados.",
                      icon: Layers
                    },
                    {
                      title: "Liberdade Total para Montar",
                      desc: "Escolha apenas os serviços que você realmente necessita, sem obrigatoriedade de pacotes fechados.",
                      icon: Sliders
                    },
                    {
                      title: "Plataformas Reconhecidas",
                      desc: "Encaminhamento direto para parceiros consolidados no mercado como Expedia, Parceiros Promo e Rentalcars.",
                      icon: ShieldCheck
                    }
                  ].map((ben, i) => {
                    const Icon = ben.icon;
                    return (
                      <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
                        <div className="h-12 w-12 rounded-2xl bg-[#0F2B5B]/10 text-[#0F2B5B] flex items-center justify-center">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-slate-800 text-base">{ben.title}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">{ben.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* FINAL CALL TO ACTION */}
              <section className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="bg-gradient-to-r from-[#FF5A1F] to-[#FF7A00] rounded-3xl p-8 md:p-12 text-white text-center space-y-4 shadow-xl">
                  <h2 className="text-2xl md:text-4xl font-serif font-black">
                    Pronto para Organizar sua Próxima Viagem?
                  </h2>
                  <p className="text-xs md:text-sm text-white/90 max-w-xl mx-auto">
                    Escolha seu destino e encontre os serviços necessários para viajar com total segurança e economia.
                  </p>
                  <button
                    onClick={() => setActiveTab("monte")}
                    className="px-8 py-3.5 bg-[#0F2B5B] hover:bg-slate-900 text-white font-extrabold text-xs rounded-2xl shadow-2xl transition-all cursor-pointer inline-flex items-center space-x-2"
                  >
                    <span>Monte sua Viagem Agora</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </section>

            </div>
          )}

          {/* ================= TAB: MONTE SUA VIAGEM (STEP BY STEP) ================= */}
          {activeTab === "monte" && (
            <main className="max-w-4xl mx-auto px-4 md:px-8 py-12 space-y-8 text-left animate-fade-in">
              <div className="text-center space-y-2">
                <span className="bg-[#FF5A1F]/10 text-[#FF5A1F] px-3 py-1 rounded-full text-xs font-bold">
                  Monte sua Viagem do Seu Jeito
                </span>
                <h1 className="text-3xl md:text-4xl font-serif font-black text-[#0F2B5B]">
                  Organizador Personalizado de Viagens
                </h1>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Escolha o destino e organize cada parte da viagem de acordo com suas necessidades e seu orçamento.
                </p>
              </div>

              {/* Step Progress Bar */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-6 overflow-x-auto">
                {[
                  { step: 1, label: "Destino" },
                  { step: 2, label: "Passagens" },
                  { step: 3, label: "Hospedagem" },
                  { step: 4, label: "Seguro" },
                  { step: 5, label: "Carro" },
                  { step: 6, label: "Resumo" },
                ].map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setBuilderStep(s.step)}
                    className={`flex items-center space-x-2 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      builderStep === s.step
                        ? "bg-[#0F2B5B] text-white"
                        : builderStep > s.step
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-slate-400"
                    }`}
                  >
                    <span className={`h-5 w-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                      builderStep === s.step ? "bg-[#FF5A1F] text-white" : "bg-slate-200 text-slate-600"
                    }`}>
                      {s.step}
                    </span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                ))}
              </div>

              {/* STEP 1: DESTINO */}
              {builderStep === 1 && (
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-serif text-[#0F2B5B]">Etapa 1: Escolha o Destino</h3>
                    <p className="text-xs text-slate-500">Selecione para onde você deseja viajar no Brasil.</p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-700">Selecione uma Cidade Popular:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {destinationsList.map((d) => (
                        <button
                          key={d.id}
                          onClick={() => setTripPlan({ ...tripPlan, destination: `${d.name}, ${d.state}` })}
                          className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                            tripPlan.destination === `${d.name}, ${d.state}`
                              ? "border-[#FF5A1F] bg-[#FF5A1F]/5 text-[#FF5A1F]"
                              : "border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div>{d.name}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{d.state} • {d.region}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={() => setBuilderStep(2)}
                      className="px-6 py-3 bg-[#0F2B5B] text-white text-xs font-bold rounded-xl flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Próxima Etapa: Passagens</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PASSAGEM */}
              {builderStep === 2 && (
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-serif text-[#0F2B5B]">Etapa 2: Passagem Aérea</h3>
                    <p className="text-xs text-slate-500">Deseja pesquisar voos para {tripPlan.destination}?</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="incFlight"
                        checked={tripPlan.includeFlight}
                        onChange={(e) => setTripPlan({ ...tripPlan, includeFlight: e.target.checked })}
                        className="h-4 w-4 accent-[#FF5A1F] cursor-pointer"
                      />
                      <label htmlFor="incFlight" className="text-xs font-bold text-slate-800 cursor-pointer">
                        Incluir Pesquisa de Passagens Aéreas
                      </label>
                    </div>

                    {tripPlan.includeFlight && (
                      <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <label className="text-xs font-bold text-slate-700">Aeroporto de Origem</label>
                        <input
                          type="text"
                          value={tripPlan.originFlight}
                          onChange={(e) => setTripPlan({ ...tripPlan, originFlight: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setBuilderStep(1)}
                      className="px-6 py-3 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={() => setBuilderStep(3)}
                      className="px-6 py-3 bg-[#0F2B5B] text-white text-xs font-bold rounded-xl flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Próxima Etapa: Hospedagem</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: HOSPEDAGEM */}
              {builderStep === 3 && (
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-serif text-[#0F2B5B]">Etapa 3: Hospedagem</h3>
                    <p className="text-xs text-slate-500">Qual estilo de hospedagem você prefere?</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {["Resort Beira-Mar", "Pousada Aconchegante", "Hotel Executivo Central"].map((style) => (
                      <button
                        key={style}
                        onClick={() => setTripPlan({ ...tripPlan, hotelStyle: style })}
                        className={`p-4 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer ${
                          tripPlan.hotelStyle === style
                            ? "border-[#FF5A1F] bg-[#FF5A1F]/5 text-[#FF5A1F]"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <Hotel className="h-5 w-5 mb-2 text-[#0F2B5B]" />
                        <div>{style}</div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setBuilderStep(2)}
                      className="px-6 py-3 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={() => setBuilderStep(4)}
                      className="px-6 py-3 bg-[#0F2B5B] text-white text-xs font-bold rounded-xl flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Próxima Etapa: Seguro Viagem</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4 & 5: SEGURO & CARRO */}
              {builderStep === 4 && (
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-serif text-[#0F2B5B]">Etapa 4: Seguro Viagem</h3>
                    <p className="text-xs text-slate-500">Proteção para imprevistos médicos e extravio de bagagem.</p>
                  </div>

                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="incIns"
                        checked={tripPlan.includeInsurance}
                        onChange={(e) => setTripPlan({ ...tripPlan, includeInsurance: e.target.checked })}
                        className="h-4 w-4 accent-[#FF5A1F] cursor-pointer"
                      />
                      <label htmlFor="incIns" className="text-xs font-bold text-slate-800 cursor-pointer">
                        Calcular Seguro Viagem (Recomendado)
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setBuilderStep(3)}
                      className="px-6 py-3 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={() => setBuilderStep(5)}
                      className="px-6 py-3 bg-[#0F2B5B] text-white text-xs font-bold rounded-xl flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Próxima Etapa: Aluguel de Carro</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {builderStep === 5 && (
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-serif text-[#0F2B5B]">Etapa 5: Aluguel de Carro</h3>
                    <p className="text-xs text-slate-500">Deseja mobilidade para explorar o destino?</p>
                  </div>

                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="incCar"
                        checked={tripPlan.includeCar}
                        onChange={(e) => setTripPlan({ ...tripPlan, includeCar: e.target.checked })}
                        className="h-4 w-4 accent-[#FF5A1F] cursor-pointer"
                      />
                      <label htmlFor="incCar" className="text-xs font-bold text-slate-800 cursor-pointer">
                        Incluir Cotação de Aluguel de Carro
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setBuilderStep(4)}
                      className="px-6 py-3 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Voltar
                    </button>
                    <button
                      onClick={() => setBuilderStep(6)}
                      className="px-6 py-3 bg-[#FF5A1F] text-white text-xs font-bold rounded-xl flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Finalizar & Ver Resumo</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 6: RESUMO */}
              {builderStep === 6 && (
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-serif text-[#0F2B5B]">Resumo da sua Viagem Personalizada</h3>
                    <p className="text-xs text-slate-500">
                      Cada serviço pode ser reservado separadamente nos parceiros indicados.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4 font-sans text-xs">
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-slate-500">Destino:</span>
                      <span className="font-bold text-[#0F2B5B]">{tripPlan.destination}</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-slate-500">Passagem Aérea:</span>
                      <span className="font-bold text-[#0F2B5B]">
                        {tripPlan.includeFlight ? `Inclusa (Saindo de ${tripPlan.originFlight})` : "Não inclusa"}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-slate-500">Hospedagem:</span>
                      <span className="font-bold text-[#0F2B5B]">{tripPlan.hotelStyle}</span>
                    </div>

                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="font-bold text-slate-500">Seguro Viagem:</span>
                      <span className="font-bold text-[#0F2B5B]">{tripPlan.includeInsurance ? "Ativado" : "Não incluso"}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-bold text-slate-500">Aluguel de Carro:</span>
                      <span className="font-bold text-[#0F2B5B]">{tripPlan.includeCar ? "Ativado" : "Não incluso"}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => handlePartnerRedirect("Expedia / Hotels.com", `Reservar Hotel em ${tripPlan.destination}`, "https://expedia.com")}
                      className="px-5 py-2.5 bg-[#0F2B5B] text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      1. Reservar Hotel
                    </button>

                    {tripPlan.includeFlight && (
                      <button
                        onClick={() => handlePartnerRedirect("Parceiros Promo", `Buscar Voo: ${tripPlan.originFlight} → ${tripPlan.destination}`, "https://parceirospromo.com.br")}
                        className="px-5 py-2.5 bg-[#00A3FF] text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        2. Buscar Passagens
                      </button>
                    )}

                    {tripPlan.includeInsurance && (
                      <button
                        onClick={() => handlePartnerRedirect("Parceiros Promo", "Calcular Seguro", "https://parceirospromo.com.br/seguro")}
                        className="px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        3. Cotar Seguro
                      </button>
                    )}
                  </div>
                </div>
              )}

            </main>
          )}

          {/* ================= OTHER INNER TABS (HOTEIS, VOOS, SEGURO, CARROS, PASSEIOS, ONIBUS, DESTINOS, SOBRE, CONTATO, FAQ, ADMIN) ================= */}
          {activeTab !== "home" && activeTab !== "monte" && (
            <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-12 text-left animate-fade-in">
              
              {/* TAB: HOTÉIS */}
              {activeTab === "hoteis" && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="bg-[#FF5A1F]/10 text-[#FF5A1F] px-3 py-1 rounded-full text-xs font-bold">Hospedagem</span>
                    <h1 className="text-3xl font-serif font-black text-[#0F2B5B]">Encontre seu Hotel ou Pousada</h1>
                    <p className="text-xs text-slate-500">Compare opções de hospedagens para todos os bolsos nos melhores destinos do Brasil.</p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <input type="text" placeholder="Destino (ex: Porto de Pedras)" className="bg-slate-50 border p-3 rounded-xl text-xs font-semibold" />
                      <input type="date" className="bg-slate-50 border p-3 rounded-xl text-xs font-semibold" />
                      <input type="date" className="bg-slate-50 border p-3 rounded-xl text-xs font-semibold" />
                      <button onClick={() => handlePartnerRedirect("Expedia", "Hotéis", "https://expedia.com")} className="bg-[#FF5A1F] text-white font-bold text-xs p-3 rounded-xl">
                        Pesquisar Hotéis
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {destinationsList.slice(0, 3).map((d) => (
                      <div key={d.id} className="bg-white rounded-2xl p-4 border border-slate-200 space-y-2">
                        <img src={d.image} className="h-40 w-full object-cover rounded-xl" alt={d.name} />
                        <h4 className="font-bold text-slate-800">{d.name} – {d.state}</h4>
                        <p className="text-xs text-slate-500">A partir de R$ {d.avgHotelPrice} / noite</p>
                        <button onClick={() => setSelectedCity(d)} className="w-full py-2 bg-[#0F2B5B] text-white text-xs font-bold rounded-xl">
                          Ver Hospedagens
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: VOOS */}
              {activeTab === "voos" && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <span className="bg-[#00A3FF]/10 text-[#00A3FF] px-3 py-1 rounded-full text-xs font-bold">Aviação</span>
                    <h1 className="text-3xl font-serif font-black text-[#0F2B5B]">Passagens Aéreas Nacionais & Internacionais</h1>
                    <p className="text-xs text-slate-500">Compare voos em tempo real com integração via Parceiros Promo.</p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <input type="text" placeholder="Origem" className="bg-slate-50 border p-3 rounded-xl text-xs font-semibold" />
                      <input type="text" placeholder="Destino" className="bg-slate-50 border p-3 rounded-xl text-xs font-semibold" />
                      <input type="date" className="bg-slate-50 border p-3 rounded-xl text-xs font-semibold" />
                      <button onClick={() => handlePartnerRedirect("Parceiros Promo", "Passagens Aéreas", "https://parceirospromo.com.br")} className="bg-[#00A3FF] text-white font-bold text-xs p-3 rounded-xl">
                        Pesquisar Voos
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SEGURO */}
              {activeTab === "seguro" && (
                <div className="space-y-8 max-w-4xl mx-auto">
                  <div className="space-y-2 text-center">
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">Proteção ao Viajante</span>
                    <h1 className="text-3xl font-serif font-black text-[#0F2B5B]">Seguro Viagem sem Complicação</h1>
                    <p className="text-xs text-slate-500 max-w-xl mx-auto">
                      Viajar protegido garante assistência médica, odontológica, reembolso de extravio de bagagem e suporte 24h.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-center">
                    <ShieldCheck className="h-12 w-12 text-emerald-600 mx-auto" />
                    <h3 className="text-xl font-bold font-serif text-slate-800">Calcule seu Seguro com até 15% de Desconto</h3>
                    <button
                      onClick={() => handlePartnerRedirect("Parceiros Promo", "Cálculo de Seguro Viagem", "https://parceirospromo.com.br/seguro")}
                      className="px-8 py-3.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer"
                    >
                      Calcular Seguro Agora
                    </button>
                  </div>
                </div>
              )}

              {/* TAB: CARROS & ONIBUS & PASSEIOS */}
              {(activeTab === "carros" || activeTab === "onibus" || activeTab === "passeios") && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-serif font-black text-[#0F2B5B] uppercase">{activeTab}</h1>
                    <p className="text-xs text-slate-500">Pesquise opções atualizadas com nossos parceiros integrados.</p>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4">
                    <p className="text-xs text-slate-600">
                      Utilize nossa busca para consultar valores e disponibilidade em tempo real.
                    </p>
                    <button
                      onClick={() => handlePartnerRedirect("Parceiro Oficial", activeTab, "https://soreservar.com.br/parceiro")}
                      className="px-6 py-3 bg-[#0F2B5B] text-white font-bold text-xs rounded-xl cursor-pointer"
                    >
                      Pesquisar {activeTab}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB: DESTINOS */}
              {activeTab === "destinos" && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-serif font-black text-[#0F2B5B]">Catálogo Completo de Destinos</h1>
                    <p className="text-xs text-slate-500">Encontre o destino ideal para suas férias.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinationsList.map((dest) => (
                      <div
                        key={dest.id}
                        onClick={() => setSelectedCity(dest)}
                        className="bg-white rounded-3xl border p-4 hover:shadow-lg transition-all cursor-pointer space-y-3"
                      >
                        <img src={dest.image} alt={dest.name} className="h-40 w-full object-cover rounded-2xl" />
                        <h3 className="font-bold text-slate-800 font-serif">{dest.name} - {dest.state}</h3>
                        <p className="text-xs text-slate-500 line-clamp-2">{dest.description}</p>
                        <button className="w-full py-2 bg-slate-100 text-[#0F2B5B] font-bold text-xs rounded-xl">
                          Planejar Viagem
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: SOBRE */}
              {activeTab === "sobre" && (
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
                  <h1 className="text-3xl font-serif font-black text-[#0F2B5B]">Sobre o So Reservar</h1>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    O So Reservar foi criado para facilitar a organização de viagens de forma simples, transparente e acessível. Reunimos em uma única plataforma ferramentas de pesquisa para hotéis, passagens aéreas, seguros viagem, aluguel de carros e atrações turísticas fornecidos por empresas parceiras reconhecidas internacionalmente.
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Trabalhamos em sinergia com o <strong>Roteiros BR</strong> (guia de viagens e experiências) e o <strong>Turismo BR</strong> (meios de hospedagem), completando o ciclo do viajante.
                  </p>
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-medium">
                    Aviso de Afiliados: O So Reservar participa de programas de parceria e poderá receber comissão quando uma reserva for realizada através de nossos links, sem qualquer custo adicional para o usuário.
                  </div>
                </div>
              )}

              {/* TAB: CONTATO */}
              {activeTab === "contato" && (
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 space-y-6">
                  <h1 className="text-2xl font-serif font-black text-[#0F2B5B]">Entre em Contato</h1>
                  
                  {contactSuccess ? (
                    <div className="p-6 bg-emerald-50 text-emerald-800 rounded-2xl font-bold text-xs text-center space-y-2">
                      <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                      <p>Sua mensagem foi enviada com sucesso! Responderemos em breve.</p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setContactSuccess(true);
                      }}
                      className="space-y-4"
                    >
                      <input
                        type="text"
                        required
                        placeholder="Seu Nome Completo"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full bg-slate-50 border p-3 rounded-xl text-xs font-semibold"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Seu E-mail"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full bg-slate-50 border p-3 rounded-xl text-xs font-semibold"
                      />
                      <textarea
                        required
                        rows={4}
                        placeholder="Sua Mensagem..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full bg-slate-50 border p-3 rounded-xl text-xs font-semibold"
                      />
                      <div className="flex items-center space-x-2 text-xs">
                        <input
                          type="checkbox"
                          required
                          checked={contactForm.acceptPrivacy}
                          onChange={(e) => setContactForm({ ...contactForm, acceptPrivacy: e.target.checked })}
                          className="accent-[#FF5A1F]"
                        />
                        <span>Aceito os Termos e Política de Privacidade.</span>
                      </div>
                      <button type="submit" className="w-full py-3 bg-[#FF5A1F] text-white font-bold text-xs rounded-xl cursor-pointer">
                        Enviar Mensagem
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* TAB: ADMIN CMS SIMULATOR */}
              {activeTab === "admin" && (
                <div className="max-w-4xl mx-auto bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-6 w-6 text-[#00A3FF]" />
                      <h2 className="text-xl font-bold font-serif">Painel de Controle WordPress (Simulador)</h2>
                    </div>
                    <span className="text-xs font-mono bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">
                      Cliques Afiliados Registrados: {affiliateClickStats}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-300">Cadastrar Novo Destino</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Nome da Cidade"
                        value={newCityName}
                        onChange={(e) => setNewCityName(e.target.value)}
                        className="bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-xs"
                      />
                      <input
                        type="text"
                        placeholder="UF (ex: BA)"
                        value={newCityState}
                        onChange={(e) => setNewCityState(e.target.value)}
                        className="bg-slate-800 border border-slate-700 p-2.5 rounded-xl text-xs"
                      />
                      <button
                        onClick={() => {
                          if (!newCityName) return;
                          const newD: DestinationItem = {
                            id: newCityName.toLowerCase().replace(/\s+/g, "-"),
                            name: newCityName,
                            state: newCityState,
                            region: newCityRegion,
                            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
                            description: `Excelente destino em ${newCityState} cadastrado pelo painel administrativo.`,
                            featured: true,
                            hotelsAvailable: 50,
                            avgHotelPrice: 250,
                            hasTours: true,
                            roteirosBrSlug: `https://roteirosbr.com.br/destinos/${newCityState.toLowerCase()}/${newCityName.toLowerCase()}`,
                            turismoBrSlug: `https://turismobr.com.br/hospedagem/${newCityState.toLowerCase()}/${newCityName.toLowerCase()}`
                          };
                          setDestinationsList([newD, ...destinationsList]);
                          setNewCityName("");
                          triggerToast(`Cidade ${newCityName} adicionada com sucesso ao banco de dados!`);
                        }}
                        className="bg-[#00A3FF] hover:bg-sky-600 text-white font-bold text-xs p-2.5 rounded-xl cursor-pointer"
                      >
                        + Adicionar Destino
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </main>
          )}
        </>
      )}

      {/* PARTNER REDIRECT MODAL SIMULATOR */}
      {redirectModal.open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center space-y-6 text-slate-800 shadow-2xl relative">
            <div className="h-16 w-16 bg-[#0F2B5B]/10 text-[#0F2B5B] rounded-2xl flex items-center justify-center mx-auto">
              <ExternalLink className="h-8 w-8 text-[#FF5A1F]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Redirecionando com Segurança</span>
              <h3 className="text-xl font-bold font-serif text-[#0F2B5B]">Você está sendo encaminhado</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Você será direcionado para o site oficial da <strong>{redirectModal.partnerName}</strong> para concluir a reserva de <strong>{redirectModal.serviceName}</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left font-mono text-[11px] text-slate-600 space-y-1">
              <div>• Parceiro Oficial: {redirectModal.partnerName}</div>
              <div>• Transação 100% Criptografada</div>
              <div>• Sem taxas adicionais pelo So Reservar</div>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setRedirectModal({ ...redirectModal, open: false })}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Voltar ao Site
              </button>
              <button
                onClick={() => {
                  window.open(redirectModal.targetUrl, "_blank");
                  setRedirectModal({ ...redirectModal, open: false });
                  triggerToast(`Redirecionamento enviado para ${redirectModal.partnerName}`);
                }}
                className="flex-1 py-3 bg-[#FF5A1F] hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Continuar para Parceiro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#0A192F] text-white border-t border-slate-800 pt-16 pb-12 text-left">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
            
            {/* Col 1: Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Compass className="h-6 w-6 text-[#FF5A1F]" />
                <span className="font-serif font-black text-xl text-white">So <span className="text-[#FF5A1F]">Reservar</span></span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sua Viagem Começa Aqui! Portal de pesquisa e encaminhamento para reservas de serviços de turismo com parceiros reconhecidos.
              </p>
              <div className="text-[11px] text-slate-500 font-mono">
                soreservar.com.br
              </div>
            </div>

            {/* Col 2: Reservas */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-[#00A3FF] uppercase tracking-wider">Reservas</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => setActiveTab("hoteis")} className="hover:text-white transition-colors cursor-pointer">Hotéis & Pousadas</button></li>
                <li><button onClick={() => setActiveTab("voos")} className="hover:text-white transition-colors cursor-pointer">Passagens Aéreas</button></li>
                <li><button onClick={() => setActiveTab("seguro")} className="hover:text-white transition-colors cursor-pointer">Seguro Viagem</button></li>
                <li><button onClick={() => setActiveTab("carros")} className="hover:text-white transition-colors cursor-pointer">Aluguel de Carros</button></li>
                <li><button onClick={() => setActiveTab("passeios")} className="hover:text-white transition-colors cursor-pointer">Passeios & Ingressos</button></li>
                <li><button onClick={() => setActiveTab("monte")} className="hover:text-white transition-colors cursor-pointer text-[#FF5A1F] font-bold">Monte sua Viagem</button></li>
              </ul>
            </div>

            {/* Col 3: Institucional */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-[#00A3FF] uppercase tracking-wider">Institucional</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => setActiveTab("sobre")} className="hover:text-white transition-colors cursor-pointer">Sobre Nós</button></li>
                <li><button onClick={() => setActiveTab("contato")} className="hover:text-white transition-colors cursor-pointer">Contato</button></li>
                <li><button onClick={() => setActiveTab("faq")} className="hover:text-white transition-colors cursor-pointer">Perguntas Frequentes</button></li>
                <li><button onClick={() => setActiveTab("sobre")} className="hover:text-white transition-colors cursor-pointer">Política de Privacidade & Cookies</button></li>
                <li><button onClick={() => setActiveTab("sobre")} className="hover:text-white transition-colors cursor-pointer">Aviso de Afiliados</button></li>
              </ul>
            </div>

            {/* Col 4: Outros Projetos */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-emerald-400 uppercase tracking-wider">Outros Projetos</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="https://roteirosbr.com.br" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors flex items-center space-x-1"><span>Roteiros BR</span><ExternalLink className="h-3 w-3" /></a></li>
                <li><a href="https://turismobr.com.br" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors flex items-center space-x-1"><span>Turismo BR</span><ExternalLink className="h-3 w-3" /></a></li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} So Reservar (soreservar.com.br). Todos os direitos reservados.</p>
            <p className="font-mono text-[10px]">Desenvolvido com tecnologia de alta velocidade • LGPD Compliant</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
