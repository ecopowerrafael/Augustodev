import React from "react";
import { MessageCircle, ArrowRight, Smartphone, Sparkles, Store } from "lucide-react";

interface FinalCtaProps {
  onOpenForm: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenForm }) => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#0B1F3A] via-[#176BFF] to-[#0B1F3A] text-white font-sans relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <span className="px-4 py-1.5 rounded-full text-xs font-black bg-[#FFC928] text-[#0B1F3A] uppercase tracking-wider inline-flex items-center space-x-1 shadow-lg">
          <Sparkles className="w-4 h-4 text-[#F04444]" />
          <span>OFERTAS POR TEMPO LIMITADO</span>
        </span>

        <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          Seu próximo celular pode estar a uma mensagem de distância
        </h2>

        <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Conte qual modelo você procura e receba atendimento personalizado rápido da nossa equipe comercial na Pampulha.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenForm}
            className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-base rounded-2xl shadow-2xl transition-all hover:scale-105 flex items-center justify-center space-x-3"
          >
            <MessageCircle className="w-6 h-6" />
            <span>Encontrar Meu Smartphone</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenForm}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-2xl border border-white/20 transition-all flex items-center justify-center space-x-2"
          >
            <Store className="w-5 h-5 text-[#FFC928]" />
            <span>Falar Com a Loja na Pampulha</span>
          </button>
        </div>
      </div>
    </section>
  );
};
