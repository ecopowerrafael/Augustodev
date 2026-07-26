import React from "react";
import { Smartphone, MessageCircle, ShieldCheck, CreditCard, Store, ArrowUpRight, Sparkles, Star } from "lucide-react";
import { STORE_INFO } from "../data/bhPresentesData";

interface BHPresentesSectionProps {
  onOpenApp: () => void;
}

export const BHPresentesSection: React.FC<BHPresentesSectionProps> = ({ onOpenApp }) => {
  return (
    <div className="relative group rounded-3xl bg-gradient-to-br from-[#0B1F3A] via-[#12315a] to-[#0B1F3A] border-2 border-[#176BFF]/40 p-6 sm:p-8 text-white shadow-2xl overflow-hidden hover:border-[#25D366] transition-all duration-300">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#176BFF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#25D366]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-[#25D366] text-white text-[10px] font-black uppercase rounded-full tracking-wider flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-[#FFC928]" />
            <span>CASE DE SUCESSO • LANDING PAGE</span>
          </span>
          <span className="px-2 py-0.5 bg-[#FFC928] text-[#0B1F3A] text-[10px] font-black uppercase rounded">
            Pampulha, BH
          </span>
        </div>
        <span className="text-xs text-gray-300 font-mono">Conversão via WhatsApp</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6 relative z-10">
        {/* Left Info (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center space-x-3">
            <img
              src={STORE_INFO.logoUrl}
              alt={STORE_INFO.name}
              className="w-12 h-12 rounded-2xl object-cover border-2 border-[#176BFF]"
            />
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#25D366] transition-colors">
                {STORE_INFO.name} — Loja de Celulares
              </h3>
              <p className="text-xs text-[#FFC928] font-bold">{STORE_INFO.slogan}</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Landing page completa de alta conversão para loja física de celulares localizada na Pampulha, Belo Horizonte. Foco em captura de leads qualificados, simulação de trocas (trade-in), catálogo de novos e seminovos com garantia e atendimento comercial automatizado via WhatsApp.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold text-gray-200 pt-2">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Lead via WhatsApp</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2">
              <Smartphone className="w-4 h-4 text-[#176BFF]" />
              <span>Trade-In Usados</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#FFC928]" />
              <span>Garantia & Loja</span>
            </div>
          </div>
        </div>

        {/* Right CTA Box (5 Cols) */}
        <div className="lg:col-span-5 bg-white/10 border border-white/15 rounded-2xl p-6 backdrop-blur-md space-y-4 text-center">
          <div className="flex items-center justify-center space-x-1 text-[#FFC928]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            <span className="text-xs font-bold text-white ml-2">4.9/5.0</span>
          </div>

          <p className="text-xs text-gray-200 italic">
            "A experiência completa do visitante: desde a escolha da oferta até a mensagem formatada para o WhatsApp!"
          </p>

          <button
            onClick={onOpenApp}
            className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm rounded-xl transition-all shadow-xl flex items-center justify-center space-x-2 hover:scale-105"
          >
            <span>Ver Protótipo Interativo</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
