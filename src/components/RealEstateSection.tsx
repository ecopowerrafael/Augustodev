import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Compass, Calendar, Search, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

// SEO components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";

export default function RealEstateSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/imobiliaria");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#0a0a0a] rounded-xl border border-white/5 hover:border-[#C5A880]/40 transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 group"
      id="project-realestate"
    >
      <ProductSchema 
        id="real-estate-website"
        details={{
          name: "Plataforma de Imóveis de Alto Padrão - Vertika",
          description: "Desenvolvimento de portais imobiliários premium com vitrine interativa inteligente, filtros avançados e sistema integrado de agendamento de visitas.",
          image: "https://augustodev.com/logo.png"
        }}
      />

      <div className="mb-6 self-start text-left">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "Imobiliária de Luxo", path: "/#project-realestate" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-[#C5A880] animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 04 // REAL ESTATE PLATFORM
          </span>
        </div>
        <div className="font-mono text-xs text-[#C5A880] font-bold">
          LIVE DEMO
        </div>
      </div>

      {/* Showcase area with a beautiful mock image */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left: Info */}
        <div className="text-left space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#C5A880] font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Compass className="h-3 w-3" />
            <span>EXCLUSIVIDADE & PERFORMANCE</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black tracking-tight text-white">
            Portal Imobiliário de <span className="text-[#C5A880]">Luxo Sob Medida</span>
          </h3>

          <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
            Plataforma projetada para proporcionar uma experiência de navegação cinematográfica. Vitrine inteligente otimizada para SEO local, carregamento instantâneo de fotos em ultra-alta-definição e formulário intuitivo para conversão de leads qualificados.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/40 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <Search className="h-4 w-4 text-[#C5A880]" />
              <span>Filtro Instantâneo</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Calendar className="h-4 w-4 text-[#C5A880]" />
              <span>Agendador de Visitas</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4 w-4 text-[#C5A880]" />
              <span>Sigilo de Dados (LGPD)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Sparkles className="h-4 w-4 text-[#C5A880]" />
              <span>Animações Fluídas</span>
            </div>
          </div>
        </div>

        {/* Right: Premium Interactive Visual Container */}
        <div className="relative w-full lg:w-[420px] aspect-[16/10] bg-[#12141A] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-[#C5A880]/30 transition-all duration-500">
          <img 
            src="/src/assets/images/luxury_mansion_sp_1784137092375.jpg" 
            alt="Mansion Preview" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-left space-y-1">
            <span className="font-mono text-[9px] text-[#C5A880] font-bold uppercase tracking-wider">PROPRIEDADE DESTAQUE</span>
            <h4 className="font-serif text-sm font-bold text-white">VERTIKA IMÓVEIS ÚNICOS</h4>
            <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
              <span>Jardim Europa, São Paulo</span>
              <span className="text-[#C5A880] font-bold">R$ 18.500.000</span>
            </div>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 z-10">
        <div className="text-left">
          <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest block font-bold">PROJETO CONCLUÍDO</span>
          <span className="font-sans text-xs text-white/70 font-semibold">Protótipo Funcional Interativo</span>
        </div>

        <button
          onClick={navigateToPortfolio}
          className="w-full sm:w-auto px-6 py-3 rounded bg-gradient-to-r from-[#C5A880] to-[#E5D2B3] text-black font-sans text-xs font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
        >
          <span>ACESSAR SITE DE IMOBILIÁRIA</span>
          <ArrowRight className="h-4 w-4 text-black group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
