import React from "react";
import { BookOpen, Feather, Sparkles, Sliders, Share2, Bookmark, ArrowUpRight } from "lucide-react";
import { BLOG_INFO } from "../data/entrelinhasData";

interface EntrelinhasSectionProps {
  onOpenApp: () => void;
}

export const EntrelinhasSection: React.FC<EntrelinhasSectionProps> = ({ onOpenApp }) => {
  return (
    <div className="relative group rounded-3xl bg-gradient-to-br from-[#1c1917] via-[#292524] to-[#1c1917] border-2 border-[#8C5A3C]/40 p-6 sm:p-8 text-white shadow-2xl overflow-hidden hover:border-[#D48A5F] transition-all duration-300">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#8C5A3C]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#D48A5F]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-[#8C5A3C] text-white text-[10px] font-black uppercase rounded-full tracking-wider flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-[#EAE7E1]" />
            <span>CASE EDITORIAL • BLOG PERSONALIZADO</span>
          </span>
          <span className="px-2 py-0.5 bg-[#D48A5F]/20 text-[#D48A5F] border border-[#D48A5F]/40 text-[10px] font-bold uppercase rounded">
            Experiência Imersiva
          </span>
        </div>
        <span className="text-xs text-stone-300 font-mono">100% Responsivo & Tipográfico</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6 relative z-10">
        {/* Left Info (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#8C5A3C] text-white flex items-center justify-center font-serif font-bold text-2xl shadow-md shrink-0">
              E
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-[#D48A5F] transition-colors">
                {BLOG_INFO.name} — Blog Minimalista Autoral
              </h3>
              <p className="text-xs text-[#D48A5F] font-mono">{BLOG_INFO.subtitle}</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-serif">
            Plataforma editorial para blogs pessoais e newsletters com foco total em conforto de leitura. Livre de ruídos visuais e propagandas, inclui controles dinâmicos de tipografia, modo leitura sem distrações, sumário de tópicos navegável, seleção e compartilhamento de citações, e lista de leitura com persistência local.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-stone-200 pt-2">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-[#D48A5F]" />
              <span>Controle de Fonte</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2">
              <Feather className="w-4 h-4 text-[#D48A5F]" />
              <span>Modo Foco</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2">
              <Share2 className="w-4 h-4 text-[#D48A5F]" />
              <span>Citar Trecho</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2">
              <Bookmark className="w-4 h-4 text-[#D48A5F]" />
              <span>Lista de Leitura</span>
            </div>
          </div>
        </div>

        {/* Right CTA Box (5 Cols) */}
        <div className="lg:col-span-5 bg-white/5 border border-white/15 rounded-2xl p-6 backdrop-blur-md space-y-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-[#D48A5F]">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Acesse o Protótipo do Blog</span>
          </div>

          <p className="text-xs text-stone-300 italic font-serif">
            "Sinta a experiência de ler com calma e testar a alternância entre temas, tamanhos de fonte e larguras de coluna em tempo real."
          </p>

          <button
            onClick={onOpenApp}
            className="w-full py-3.5 bg-[#8C5A3C] hover:bg-[#72472e] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xl flex items-center justify-center space-x-2 hover:scale-105"
          >
            <span>Ver Protótipo Interativo</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
