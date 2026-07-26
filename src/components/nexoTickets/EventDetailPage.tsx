import React, { useState } from "react";
import { EventItem, TicketTier } from "../../types/nexoTickets";
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Share2,
  Heart,
  Ticket,
  User,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Plus,
  Minus,
  Map
} from "lucide-react";

interface EventDetailPageProps {
  event: EventItem;
  onBack: () => void;
  onStartCheckout: (selectedQuantities: Record<string, number>) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  event,
  onBack,
  onStartCheckout
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<"sobre" | "atracoes" | "local" | "regras">("sobre");
  const [saved, setSaved] = useState(false);

  const handleQuantityChange = (tierId: string, delta: number, max: number) => {
    setQuantities((prev) => {
      const current = prev[tierId] || 0;
      const next = Math.max(0, Math.min(max, current + delta));
      return { ...prev, [tierId]: next };
    });
  };

  const totalTicketsCount = Object.values(quantities).reduce((acc: number, curr: number) => acc + curr, 0);

  const subtotal = event.ticketTiers.reduce((acc, tier) => {
    const qty = quantities[tier.id] || 0;
    return acc + tier.price * qty;
  }, 0);

  const totalServiceFee = event.ticketTiers.reduce((acc, tier) => {
    const qty = quantities[tier.id] || 0;
    return acc + tier.serviceFee * qty;
  }, 0);

  const grandTotal = subtotal + totalServiceFee;

  return (
    <div className="bg-[#12101B] text-white min-h-screen pb-24 font-sans">
      {/* Top Banner Cover */}
      <div className="relative h-72 sm:h-96 w-full overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12101B] via-[#12101B]/60 to-transparent" />

        <div className="absolute top-6 left-4 sm:left-8 max-w-7xl mx-auto w-full">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-xl text-xs font-bold text-white hover:bg-black/80 transition-colors flex items-center space-x-1"
          >
            <span>← Voltar aos eventos</span>
          </button>
        </div>

        <div className="absolute bottom-6 left-4 sm:left-8 right-4 max-w-7xl mx-auto flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-[#6D3DF5] text-white uppercase tracking-wider">
                {event.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1FA971] text-white">
                {event.availabilityText}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white">{event.title}</h1>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSaved(!saved)}
              className={`p-3 rounded-xl border backdrop-blur-md transition-all ${
                saved ? "bg-[#F0448B] text-white border-[#F0448B]" : "bg-black/50 text-gray-300 border-white/20 hover:text-white"
              }`}
            >
              <Heart className={`w-5 h-5 ${saved ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={() => alert("Link do evento copiado para a área de transferência!")}
              className="p-3 bg-black/50 backdrop-blur-md border border-white/20 rounded-xl text-gray-300 hover:text-white transition-all"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Content Column (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Info Card */}
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start space-x-3 p-3 bg-black/30 rounded-xl border border-white/5">
                <Calendar className="w-5 h-5 text-[#F0448B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Data do Evento</span>
                  <span className="font-bold text-white text-sm">{event.displayDate}</span>
                  <span className="text-gray-400 block text-[11px]">{event.time}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-black/30 rounded-xl border border-white/5">
                <MapPin className="w-5 h-5 text-[#F0448B] shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Localização</span>
                  <span className="font-bold text-white text-sm">{event.location}</span>
                  <span className="text-gray-400 block text-[11px]">{event.address} — {event.city}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-gray-300 pt-2 border-t border-white/10">
              <span className="flex items-center space-x-1">
                <User className="w-4 h-4 text-[#2775EA]" />
                <span>Classificação: <strong>{event.ageRating}</strong></span>
              </span>
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-[#1FA971]" />
                <span>Organização: <strong>{event.organizerName}</strong></span>
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
            {[
              { id: "sobre", label: "Sobre o Evento" },
              { id: "atracoes", label: "Atrações & Programação" },
              { id: "local", label: "Localização" },
              { id: "regras", label: "Informações Importantes" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#6D3DF5] text-white shadow-lg shadow-[#6D3DF5]/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
            {activeTab === "sobre" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">Conheça o {event.title}</h3>
                <p>{event.description}</p>
                <div className="p-4 bg-[#6D3DF5]/10 border border-[#6D3DF5]/30 rounded-2xl flex items-center space-x-3 text-xs text-white">
                  <Sparkles className="w-5 h-5 text-[#F0448B] shrink-0" />
                  <span>
                    <strong>Split de Pagamento Seguro:</strong> Todas as compras realizadas neste evento utilizam liquidação automatizada garantida pela tecnologia Nexo Tickets.
                  </span>
                </div>
              </div>
            )}

            {activeTab === "atracoes" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-bold mb-3">Line-up de Atrações</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {event.attractions.map((artist, idx) => (
                      <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-xl text-center">
                        <span className="font-extrabold text-white text-xs block">{artist}</span>
                        <span className="text-[10px] text-[#F0448B]">Palco Principal</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-3">Programação dos Portões</h4>
                  <div className="space-y-2">
                    {event.schedule.map((slot, idx) => (
                      <div key={idx} className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center space-x-3 text-xs">
                        <span className="px-2 py-1 bg-[#25164F] text-[#F0448B] font-mono font-bold rounded">
                          {slot.time}
                        </span>
                        <span className="text-white font-semibold">{slot.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "local" && (
              <div className="space-y-4">
                <h4 className="text-white font-bold">Endereço do Local</h4>
                <p>{event.location} — {event.address}, {event.city}</p>
                <div className="h-48 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center text-xs text-gray-400 space-x-2">
                  <Map className="w-6 h-6 text-[#F0448B]" />
                  <span>Mapa Interativo Fictício de Localização</span>
                </div>
              </div>
            )}

            {activeTab === "regras" && (
              <div className="space-y-3 text-xs">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1FA971] shrink-0 mt-0.5" />
                  <span>Documento oficial com foto obrigatório na entrada.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1FA971] shrink-0 mt-0.5" />
                  <span>Evento exclusivo para maiores de 18 anos.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1FA971] shrink-0 mt-0.5" />
                  <span>Ingresso pessoal e vinculado ao CPF do participante informado.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-[#F2B84B] shrink-0 mt-0.5" />
                  <span>Não será permitida a entrada no recinto após as 22h30.</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Ticket Tiers Selection Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-b from-[#25164F] to-[#12101B] border border-[#6D3DF5]/50 rounded-3xl p-6 shadow-2xl space-y-6 sticky top-24">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-black text-white flex items-center space-x-2">
                  <Ticket className="w-5 h-5 text-[#F0448B]" />
                  <span>Escolha seus Ingressos</span>
                </h3>
                <p className="text-[11px] text-gray-300">Selecione as quantidades abaixo</p>
              </div>
              <span className="px-2.5 py-1 bg-[#1FA971]/20 text-[#1FA971] border border-[#1FA971]/40 rounded-full text-[10px] font-bold">
                100% SEGURO
              </span>
            </div>

            {/* List of Tiers */}
            <div className="space-y-4">
              {event.ticketTiers.map((tier) => {
                const qty = quantities[tier.id] || 0;
                return (
                  <div
                    key={tier.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      qty > 0
                        ? "bg-[#6D3DF5]/20 border-[#6D3DF5] ring-1 ring-[#6D3DF5]"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-white text-sm">{tier.name}</h4>
                        <div className="flex items-baseline space-x-1.5">
                          <span className="text-lg font-black text-[#F2B84B]">
                            R$ {tier.price.toFixed(2).replace(".", ",")}
                          </span>
                          <span className="text-[10px] text-gray-400">
                            (+ R$ {tier.serviceFee.toFixed(2).replace(".", ",")} taxa)
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400 block">
                          Disponíveis: <strong className="text-white">{tier.available} ingressos</strong>
                        </span>
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center space-x-2 bg-black/40 border border-white/10 rounded-xl p-1">
                        <button
                          onClick={() => handleQuantityChange(tier.id, -1, tier.maxPerBuyer)}
                          disabled={qty === 0}
                          className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 flex items-center justify-center text-white font-bold transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center font-mono font-bold text-sm text-white">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(tier.id, 1, tier.maxPerBuyer)}
                          disabled={qty >= tier.maxPerBuyer || qty >= tier.available}
                          className="w-7 h-7 rounded-lg bg-[#6D3DF5] hover:bg-[#6D3DF5]/80 disabled:opacity-30 flex items-center justify-center text-white font-bold transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {tier.benefits && tier.benefits.length > 0 && (
                      <ul className="mt-3 pt-2 border-t border-white/10 space-y-1 text-[11px] text-gray-300">
                        {tier.benefits.map((b, i) => (
                          <li key={i} className="flex items-center space-x-1.5">
                            <CheckCircle2 className="w-3 h-3 text-[#1FA971] shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Cart Summary */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="space-y-1 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Ingressos selecionados ({totalTicketsCount}):</span>
                  <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxas de serviço:</span>
                  <span>R$ {totalServiceFee.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                  <span>Total final:</span>
                  <span className="text-[#F2B84B]">R$ {grandTotal.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>

              <button
                onClick={() => onStartCheckout(quantities)}
                disabled={totalTicketsCount === 0}
                className="w-full py-4 bg-gradient-to-r from-[#6D3DF5] to-[#F0448B] hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100 text-white font-black text-sm uppercase tracking-wider rounded-2xl transition-all shadow-xl shadow-[#6D3DF5]/30 flex items-center justify-center space-x-2"
              >
                <span>Avançar para Checkout ({totalTicketsCount})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-gray-400 text-center">
                Seus ingressos ficarão reservados por 10 minutos durante a finalização.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
