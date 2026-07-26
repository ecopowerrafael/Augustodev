import React from "react";
import { NexoLogo } from "./nexoTickets/NexoLogo";
import { Ticket, Split, QrCode, ShieldCheck, ArrowRight, DollarSign, FileText, CheckCircle2 } from "lucide-react";

interface NexoTicketsSectionProps {
  onOpenApp: () => void;
}

export const NexoTicketsSection: React.FC<NexoTicketsSectionProps> = ({ onOpenApp }) => {
  return (
    <section id="nexo-tickets" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-[#25164F] via-[#12101B] to-[#25164F] rounded-3xl p-8 md:p-12 text-white border border-[#6D3DF5]/50 shadow-2xl relative overflow-hidden group">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0448B]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6D3DF5]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#6D3DF5]/30 text-[#6D3DF5] border border-[#6D3DF5]/50 uppercase tracking-wider flex items-center space-x-1">
                <Ticket className="w-3.5 h-3.5" />
                <span>CASE 33 • PLATAFORMA DE INGRESSOS</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F0448B]/20 text-[#F0448B] border border-[#F0448B]/40">
                SPLIT DE PAGAMENTOS
              </span>
            </div>

            <div className="space-y-2">
              <NexoLogo showSlogan={true} size="lg" className="scale-105 origin-left" />
            </div>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Plataforma completa para venda de ingressos, reservas e gestão de eventos com split automático de receitas entre o espaço e operadores parceiros. Inclui checkout transparente (Pix & Cartão em até 6x), emissão de ingressos digitais com QR Code, scanner na portaria, apuração DRE por evento e liquidação financeira.
            </p>

            {/* Key Capabilities List */}
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-200">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#1FA971]" />
                <span>Site Público & Detalhe de Eventos</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#1FA971]" />
                <span>Checkout Transparente (Pix & Cartão)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#1FA971]" />
                <span>Split de Subcontas (20% / 80%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#1FA971]" />
                <span>DRE Diário & Apuração Financeira</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#1FA971]" />
                <span>Ingresso Digital com QR Code</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#1FA971]" />
                <span>Validação Portaria / Leitor de Acesso</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={onOpenApp}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#6D3DF5] via-[#F0448B] to-[#F2B84B] text-white font-black text-sm hover:brightness-110 transition-all flex items-center space-x-2 shadow-2xl shadow-[#6D3DF5]/30 group/btn"
              >
                <span>Acessar Protótipo do Nexo Tickets</span>
                <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Visual Card Mockup */}
          <div className="lg:col-span-5 bg-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs text-gray-400 font-mono">PED-2026-008421</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1FA971] text-white">
                PAGAMENTO APROVADO
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-[#F0448B] font-mono font-bold">SUNSET EXPERIENCE 2026</span>
              <h4 className="font-bold text-white text-base">2x Pista — Lote 2</h4>
              <p className="text-xs text-gray-300">Comprador: Marcelo Oliveira (Pix)</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2.5 bg-[#6D3DF5]/20 rounded-xl border border-[#6D3DF5]/40">
                <span className="text-white font-bold block">R$ 34,96</span>
                <span className="text-[9px] text-gray-300">Espaço (20%)</span>
              </div>
              <div className="p-2.5 bg-[#F0448B]/20 rounded-xl border border-[#F0448B]/40">
                <span className="text-white font-bold block">R$ 139,84</span>
                <span className="text-[9px] text-gray-300">Operador (80%)</span>
              </div>
            </div>

            <div className="p-3 bg-[#1FA971]/20 border border-[#1FA971]/40 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <QrCode className="w-4 h-4 text-[#1FA971]" />
                <span className="font-medium text-white">2 Ingressos Válidos Liberados</span>
              </div>
              <span className="text-[10px] text-[#1FA971] font-bold">ING-8X42-2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
