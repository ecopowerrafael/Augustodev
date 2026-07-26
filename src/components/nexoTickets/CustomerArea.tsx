import React, { useState } from "react";
import { Order, TicketParticipant } from "../../types/nexoTickets";
import {
  Ticket,
  QrCode,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  User,
  Share2,
  Wallet,
  Download,
  AlertCircle,
  HelpCircle,
  Search,
  ChevronRight
} from "lucide-react";

interface CustomerAreaProps {
  orders: Order[];
  onNavigateEvent: () => void;
}

export const CustomerArea: React.FC<CustomerAreaProps> = ({ orders, onNavigateEvent }) => {
  const [activeTab, setActiveTab] = useState<"proximos" | "utilizados" | "cancelados">("proximos");
  const [selectedTicket, setSelectedTicket] = useState<TicketParticipant | null>(null);

  // Flatten all tickets from orders
  const allTickets: { ticket: TicketParticipant; order: Order }[] = [];
  orders.forEach((o) => {
    o.items.forEach((item) => {
      allTickets.push({ ticket: item, order: o });
    });
  });

  const filteredTickets = allTickets.filter(({ ticket }) => {
    if (activeTab === "proximos") return ticket.status === "Válido";
    if (activeTab === "utilizados") return ticket.status === "Utilizado";
    if (activeTab === "cancelados") return ticket.status === "Cancelado";
    return true;
  });

  const handleSimulateCheckIn = (ticketCode: string) => {
    // Toggle status locally for demonstration
    const found = allTickets.find((t) => t.ticket.ticketCode === ticketCode);
    if (found) {
      found.ticket.status = "Utilizado";
      found.ticket.usedAt = "17h12";
      setSelectedTicket({ ...found.ticket });
    }
  };

  return (
    <div className="bg-[#12101B] text-white min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans space-y-8">
      {/* Customer Header Welcome */}
      <div className="bg-gradient-to-r from-[#25164F] via-[#12101B] to-[#25164F] border border-[#6D3DF5]/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#6D3DF5] to-[#F0448B] p-0.5 shadow-xl">
            <div className="w-full h-full bg-[#12101B] rounded-[14px] flex items-center justify-center font-black text-2xl text-white">
              MO
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-white">Olá, Marcelo Oliveira</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1FA971]/20 text-[#1FA971] border border-[#1FA971]/40">
                CLIENTE VERIFICADO
              </span>
            </div>
            <p className="text-xs text-gray-300">marcelo@email.com • CPF: ***.456.789-**</p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-white/5 border border-white/10 rounded-2xl min-w-[100px]">
            <span className="text-xl font-black text-[#F0448B] block">
              {allTickets.filter((t) => t.ticket.status === "Válido").length}
            </span>
            <span className="text-[10px] text-gray-400">Ingressos Ativos</span>
          </div>

          <div className="p-3 bg-white/5 border border-white/10 rounded-2xl min-w-[100px]">
            <span className="text-xl font-black text-[#6D3DF5] block">{orders.length}</span>
            <span className="text-[10px] text-gray-400">Compras Realizadas</span>
          </div>

          <div className="p-3 bg-white/5 border border-white/10 rounded-2xl min-w-[100px]">
            <span className="text-xl font-black text-[#F2B84B] block">22 dias</span>
            <span className="text-[10px] text-gray-400">Próximo Evento</span>
          </div>

          <div className="p-3 bg-white/5 border border-white/10 rounded-2xl min-w-[100px]">
            <span className="text-xl font-black text-[#1FA971] block">4</span>
            <span className="text-[10px] text-gray-400">Eventos Salvos</span>
          </div>
        </div>
      </div>

      {/* Main Tabs Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            {[
              { id: "proximos", label: "Próximos Ingressos" },
              { id: "utilizados", label: "Utilizados / Histórico" },
              { id: "cancelados", label: "Cancelados" }
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

          <button
            onClick={onNavigateEvent}
            className="hidden sm:flex items-center space-x-1 text-xs text-[#F0448B] font-bold hover:underline"
          >
            <span>Explorar novos eventos</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tickets Grid / Cards */}
        {filteredTickets.length === 0 ? (
          <div className="p-12 text-center bg-white/5 border border-white/10 rounded-3xl space-y-3">
            <Ticket className="w-12 h-12 text-gray-600 mx-auto" />
            <h4 className="text-lg font-bold text-white">Nenhum ingresso encontrado nesta categoria</h4>
            <p className="text-xs text-gray-400">Navegue pelos eventos para garantir sua próxima experiência.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.map(({ ticket, order }) => (
              <div
                key={ticket.ticketCode}
                className="bg-gradient-to-b from-[#25164F]/80 to-[#12101B] border border-[#6D3DF5]/40 rounded-3xl p-6 shadow-xl space-y-5 relative overflow-hidden group hover:border-[#6D3DF5]"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs font-bold text-[#F0448B]">
                    {ticket.ticketCode}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                      ticket.status === "Válido"
                        ? "bg-[#1FA971] text-white"
                        : ticket.status === "Utilizado"
                        ? "bg-gray-700 text-gray-300"
                        : "bg-[#D94C4C] text-white"
                    }`}
                  >
                    {ticket.status === "Utilizado"
                      ? `UTILIZADO ÀS ${ticket.usedAt || "17h12"}`
                      : ticket.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-[#F2B84B] uppercase tracking-wider font-bold">
                    {order.eventTitle}
                  </span>
                  <h4 className="text-lg font-black text-white">{ticket.tierName}</h4>
                  <p className="text-xs text-gray-300 flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-[#6D3DF5]" />
                    <span>Participante: <strong>{ticket.participantName}</strong></span>
                  </p>
                </div>

                {/* QR Code Graphic Box */}
                <div className="p-4 bg-white rounded-2xl text-center space-y-2 shadow-inner">
                  <img
                    src={ticket.qrCodeUrl}
                    alt={ticket.ticketCode}
                    className="w-36 h-36 mx-auto"
                  />
                  <span className="text-[10px] text-gray-800 font-mono font-bold block">
                    Apresente este QR Code na portaria
                  </span>
                </div>

                <div className="space-y-2 text-xs text-gray-300 pt-2 border-t border-white/10">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-[#F0448B]" />
                    <span>{order.eventDate} às 16:00</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-[#F0448B]" />
                    <span>{order.eventLocation}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => alert("Ingresso adicionado à carteira digital (Simulação Apple/Google Wallet)")}
                      className="py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] rounded-xl transition-colors flex items-center justify-center space-x-1"
                    >
                      <Wallet className="w-3.5 h-3.5 text-[#6D3DF5]" />
                      <span>Apple/Google</span>
                    </button>

                    <button
                      onClick={() => alert("Link do ingresso compartilhado!")}
                      className="py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] rounded-xl transition-colors flex items-center justify-center space-x-1"
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#F0448B]" />
                      <span>Compartilhar</span>
                    </button>
                  </div>

                  {ticket.status === "Válido" && (
                    <button
                      onClick={() => handleSimulateCheckIn(ticket.ticketCode)}
                      className="w-full py-2 bg-[#6D3DF5]/30 hover:bg-[#6D3DF5]/50 border border-[#6D3DF5]/50 text-white text-[11px] font-bold rounded-xl transition-colors"
                    >
                      Simular Leitura na Portaria (Check-in)
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
