import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Car, Clock, Navigation, ShieldCheck, Sparkles, ArrowRight, Layers, DollarSign } from "lucide-react";

// SEO Framework components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";

export default function LiraDriverSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/lira-driver-pro");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#050911] rounded-xl border border-white/5 hover:border-[#00FF41]/30 transition-all overflow-hidden flex flex-col justify-between p-8 group text-left"
      id="project-lira-driver"
    >
      {/* Product & Breadcrumb Schemas for Google Search indexing */}
      <ProductSchema 
        id="lira-driver-case-showcase"
        details={{
          name: "Lira Driver Pro - Aplicativo de Inteligência Financeira para Motoristas de Aplicativos",
          description: "Painel inteligente de controle de ganhos líquidos (por hora e km), controle de metas diárias dinâmico e relatórios de rateio de despesas operacionais para motoristas de Uber e 99.",
          image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80"
        }}
      />
      
      <div className="mb-6 self-start">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "Lira Driver Pro", path: "/#project-lira-driver" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-[#00FF41] animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 13 // FULL-STACK FINANCIAL CONSOLE
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/5 font-mono text-[9px] text-[#00FF41] uppercase font-bold">
          ESTILO HIGH-CONTRAST DARK & NEON
        </div>
      </div>

      {/* Main content split */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left info description */}
        <div className="space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#00FF41]/10 border border-[#00FF41]/20 text-[#00FF41] font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Sparkles className="h-3 w-3" />
            <span>COCKPIT INTELIGENTE PARA MOTORISTAS</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black text-white leading-tight">
            Lira Driver Pro: <span className="text-[#00FF41]">Máxima Rentabilidade</span> por KM e Hora Rodada
          </h3>

          <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
            Aplicativo móvel desenvolvido sob medida para motoristas de Uber e 99. Substitui o controle confuso em planilhas por uma central de inteligência automática que calcula ganhos brutos e líquidos reais, deduz o custo de combustível em tempo real e fornece orientações inteligentes para o cumprimento de metas diárias.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/40 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <Clock className="h-4 w-4 text-[#00FF41]" />
              <span>Ganhos por Hora & KM</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Layers className="h-4 w-4 text-[#00FF41]" />
              <span>Controle Detalhado de Gastos</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Sparkles className="h-4 w-4 text-[#00FF41]" />
              <span>Meta Diária Interativa</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <DollarSign className="h-4 w-4 text-[#00FF41]" />
              <span>Simulador GPS Real-Time</span>
            </div>
          </div>
        </div>

        {/* Right: Beautiful Premium Image Showcase */}
        <div className="relative w-full lg:w-[380px] aspect-[10/14] bg-[#0c141d] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-[#00FF41]/30 transition-all duration-500">
          <img 
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80" 
            alt="Motorista de Aplicativo Dirigindo à Noite" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          
          {/* Logo HUD Overlay */}
          <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3.5 py-2 border border-white/10 rounded-lg flex items-center space-x-2.5 z-20">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-stone-900 to-[#0A0F1D] border border-[#00FF41] flex items-center justify-center">
              <Car className="h-3.5 w-3.5 text-[#00FF41]" />
            </div>
            <div className="text-left">
              <span className="font-sans font-black text-[10px] text-white tracking-widest block uppercase">LIRA DRIVER</span>
              <span className="font-mono text-[8px] text-[#00FF41] block uppercase tracking-wider font-extrabold">INTELIGÊNCIA PRO</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-6 left-6 right-6 text-left space-y-3">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((st) => (
                <div key={st} className="h-1.5 w-2 rounded-full bg-[#00FF41]" />
              ))}
            </div>
            <span className="font-serif text-lg font-bold text-white block">Rentabilidade Dominada</span>
            <p className="text-stone-300 font-sans text-[11px] leading-relaxed">
              Interface tática de altíssimo contraste visual, otimizada para legibilidade rápida no painel do carro sob qualquer iluminação.
            </p>
          </div>
        </div>

      </div>

      {/* Action footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 gap-4 z-10">
        <div className="flex flex-wrap gap-2 text-[9px] font-mono text-white/50 uppercase font-bold">
          <span className="bg-white/5 px-2 py-1 rounded">DASHBOARD DE RENTABILIDADE</span>
          <span className="bg-white/5 px-2 py-1 rounded">CONTROLE DE DESPESAS</span>
          <span className="bg-white/5 px-2 py-1 rounded">ASSISTENTE DE METAS</span>
        </div>

        <button
          onClick={navigateToPortfolio}
          className="w-full sm:w-auto px-5 py-2.5 rounded bg-gradient-to-r from-[#00FF41] to-[#00dd38] hover:from-[#00dd38] hover:to-[#00bb2f] text-black font-mono text-[10px] font-black uppercase tracking-wider transition duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-[0_4px_12px_rgba(0,255,65,0.2)] group"
        >
          <span>Visualizar App Lira Driver</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
