import React, { useState } from "react";
import { EventItem } from "../../types/nexoTickets";
import {
  Search,
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
  Flame,
  CheckCircle2,
  Ticket,
  ShieldCheck,
  Star,
  Zap,
  Music,
  Utensils,
  Briefcase,
  PartyPopper,
  Theater,
  Trophy,
  Compass
} from "lucide-react";

interface PublicHomeProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onExploreClick: () => void;
}

export const PublicHome: React.FC<PublicHomeProps> = ({
  events,
  onSelectEvent,
  searchQuery,
  onSearchChange,
  onExploreClick
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("todos");

  const categories = [
    { id: "todos", label: "Todos", icon: Compass },
    { id: "Música", label: "Música", icon: Music },
    { id: "Gastronomia", label: "Gastronomia", icon: Utensils },
    { id: "Negócios", label: "Negócios", icon: Briefcase },
    { id: "Festa", label: "Festas", icon: PartyPopper },
    { id: "Teatro", label: "Teatro", icon: Theater },
    { id: "Esportes", label: "Esportes", icon: Trophy }
  ];

  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = selectedFilter === "todos" || evt.category === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const featuredEvent = events[0]; // Sunset Experience 2026

  return (
    <div className="space-y-16 pb-20 bg-[#12101B] text-white font-sans">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#6D3DF5]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#F0448B]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#6D3DF5]/20 border border-[#6D3DF5]/40 text-[#F0448B] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F0448B]" />
            <span>PLATAFORMA OFICIAL NEXO TICKETS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-none">
            Viva experiências que <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#6D3DF5] via-[#F0448B] to-[#F2B84B] bg-clip-text text-transparent">
              ficam na memória
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Encontre eventos, reserve seu ingresso e pague com segurança sem sair do site.
            Processamento via Pix e Cartão de Crédito transparente.
          </p>

          {/* Large Hero Search Box */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 sm:p-3 rounded-2xl shadow-2xl max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-2 text-left">
            <div className="sm:col-span-8 relative flex items-center">
              <Search className="w-5 h-5 text-[#F0448B] absolute left-4" />
              <input
                type="text"
                placeholder="Busque por evento, artista, local ou cidade..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-4 flex items-center justify-end">
              <button
                onClick={onExploreClick}
                className="w-full py-3 px-6 bg-gradient-to-r from-[#6D3DF5] to-[#F0448B] hover:brightness-110 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#6D3DF5]/30 flex items-center justify-center space-x-2"
              >
                <span>Explorar Eventos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Date & Category Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-gray-400 font-medium mr-2">Atalhos rápidos:</span>
            {["Hoje", "Este fim de semana", "Música", "Gastronomia", "Negócios", "Festas", "Teatro"].map((label) => (
              <button
                key={label}
                onClick={() => {
                  if (label === "Música" || label === "Gastronomia" || label === "Negócios" || label === "Festas" || label === "Teatro") {
                    setSelectedFilter(label === "Festas" ? "Festa" : label);
                  }
                }}
                className="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-[#6D3DF5] hover:bg-white/10 rounded-full text-gray-200 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED EVENT BANNER (Sunset Experience 2026) */}
      {featuredEvent && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-r from-[#25164F] to-[#12101B] border border-[#6D3DF5]/40 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-center group">
            {/* Left Image Cover */}
            <div className="lg:col-span-6 relative h-64 sm:h-96 lg:h-full min-h-[320px] overflow-hidden">
              <img
                src={featuredEvent.image}
                alt={featuredEvent.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12101B] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#12101B]" />
              <div className="absolute top-4 left-4 bg-[#F0448B] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-lg">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>EVENTO PRINCIPAL DESTAQUE</span>
              </div>
            </div>

            {/* Right Details & Action */}
            <div className="lg:col-span-6 p-6 sm:p-10 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#6D3DF5]/20 text-[#6D3DF5] border border-[#6D3DF5]/40">
                  {featuredEvent.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1FA971]/20 text-[#1FA971] border border-[#1FA971]/40">
                  {featuredEvent.availabilityText}
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {featuredEvent.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3">
                  {featuredEvent.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 text-xs border-y border-white/10 py-4">
                <div className="flex items-center space-x-2 text-gray-200">
                  <Calendar className="w-4 h-4 text-[#F0448B]" />
                  <div>
                    <span className="block font-bold text-white">{featuredEvent.displayDate}</span>
                    <span className="text-[10px] text-gray-400">{featuredEvent.time}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-200">
                  <MapPin className="w-4 h-4 text-[#F0448B]" />
                  <div>
                    <span className="block font-bold text-white">{featuredEvent.location}</span>
                    <span className="text-[10px] text-gray-400">{featuredEvent.city}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div>
                  <span className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold block">
                    Valor inicial
                  </span>
                  <span className="text-2xl font-black text-[#F2B84B]">
                    A partir de R$ {featuredEvent.minPrice.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <button
                  onClick={() => onSelectEvent(featuredEvent)}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#6D3DF5] to-[#F0448B] hover:brightness-110 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-[#6D3DF5]/30 flex items-center space-x-2"
                >
                  <span>Ver Evento & Ingressos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CATEGORIES BAR */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Compass className="w-5 h-5 text-[#F0448B]" />
            <span>Navegue por Categorias</span>
          </h3>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-[#6D3DF5] text-white shadow-lg shadow-[#6D3DF5]/30 ring-1 ring-white/30"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 text-[#F0448B]" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* FEATURED EVENTS GRID (4 Specific Cases) */}
      <section id="eventos-grid" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-2xl font-black text-white">Eventos em Destaque</h3>
            <p className="text-xs text-gray-400">Garanta seu ingresso antecipadamente com parcelamento e Pix imediato.</p>
          </div>
          <span className="text-xs text-[#F0448B] font-bold">
            {filteredEvents.length} eventos disponíveis
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white/5 border border-white/10 hover:border-[#6D3DF5]/60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex flex-col justify-between group"
            >
              {/* Card Header Image */}
              <div className="relative h-48 overflow-hidden bg-black/40">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12101B] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-[#12101B]/80 backdrop-blur-md text-[#F0448B] border border-[#F0448B]/40">
                  {evt.category}
                </span>
                {evt.badge && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-extrabold bg-[#F2B84B] text-[#12101B]">
                    {evt.badge}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[11px] text-[#F0448B] font-bold flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{evt.displayDate}</span>
                  </span>
                  <h4 className="font-extrabold text-white text-base leading-snug group-hover:text-[#F0448B] transition-colors">
                    {evt.title}
                  </h4>
                  <p className="text-xs text-gray-400 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <span className="truncate">{evt.location} — {evt.city}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">A partir de</span>
                    <span className="font-black text-[#F2B84B] text-sm">
                      R$ {evt.minPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectEvent(evt)}
                    className="w-full py-2.5 bg-[#6D3DF5] hover:bg-[#6D3DF5]/90 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1"
                  >
                    <span>Ver Evento</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA (5 Steps) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8">
        <div className="bg-gradient-to-br from-[#25164F] via-[#12101B] to-[#25164F] border border-[#6D3DF5]/30 rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#F0448B] uppercase tracking-wider">
              PRATICIDADE & SEGURANÇA
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">Como Funciona o Nexo Tickets</h3>
            <p className="text-xs sm:text-sm text-gray-300">
              Sua jornada do momento da escolha do evento até a entrada no local com QR Code digital.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
            {[
              { step: "1", title: "Escolha o Evento", desc: "Navegue pelo catálogo e escolha sua atração preferida." },
              { step: "2", title: "Selecione o Ingresso", desc: "Escolha os lotes, pistas, camarotes ou mesas." },
              { step: "3", title: "Pague no Site", desc: "Pagamento transparente via Pix ou Cartão em até 6x." },
              { step: "4", title: "Receba seu QR Code", desc: "Ingresso liberado instantaneamente na tela e e-mail." },
              { step: "5", title: "Apresente na Entrada", desc: "Validação digital rápida na portaria do evento." }
            ].map((item) => (
              <div key={item.step} className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2 relative">
                <div className="w-8 h-8 rounded-full bg-[#6D3DF5] text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
                  {item.step}
                </div>
                <h4 className="font-bold text-white text-xs">{item.title}</h4>
                <p className="text-[11px] text-gray-400 leading-tight">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
