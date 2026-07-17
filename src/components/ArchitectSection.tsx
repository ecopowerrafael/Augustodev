import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Compass, Palette, ShieldCheck, Hammer, Sparkles, Sliders } from "lucide-react";

// SEO Framework components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";
import InternalLinker from "../seo/InternalLinker";

export default function ArchitectSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/arquiteto");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[600px] w-full bg-[#090b10] rounded-xl border border-white/5 hover:border-amber-500/30 transition-all overflow-hidden flex flex-col justify-between p-8"
      id="project-architect"
    >
      {/* Product & Breadcrumb Schemas for Google Search indexing */}
      <ProductSchema 
        id="architect-portfolio"
        details={{
          name: "Desenvolvimento de Portfólios Arquitetônicos Premium",
          description: "Criação de portfólios autorais para arquitetos, estúdios de design de interiores e construtoras de alto padrão. Apresenta sliders Antes/Depois interativos, moodboards dinâmicos e simuladores de viabilidade técnica.",
          image: "https://augustodev.com/logo.png"
        }}
      />
      <div className="mb-6 self-start text-left">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "Portfólios Criativos", path: "/#project-architect" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 10 // ARCHITECTURAL SHOWCASES
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/5 font-mono text-[9px] text-amber-500 uppercase font-bold">
          ESTILO EDITORIAL BRUTALISTA
        </div>
      </div>

      {/* Main visual conceptual mockup representation */}
      <div className="relative flex-1 w-full flex items-center justify-center my-12 overflow-hidden min-h-[300px]">
        {/* Architectural grid structure background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.04),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:25px_25px] opacity-30" />
        
        {/* Isometric model blueprints line outline background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/5 rounded-full flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 border border-white/5 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: "35s" }} />
          <div className="absolute w-48 h-48 border border-amber-500/5 rotate-45" />
        </div>

        {/* Floating holographic label badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <div className="h-14 w-14 border border-amber-500/30 bg-[#0A0C10] flex items-center justify-center rounded-2xl mx-auto shadow-2xl mb-4">
            <Compass className="h-7 w-7 text-amber-500 animate-spin" style={{ animationDuration: "120s" }} />
          </div>
          <h3 className="font-mono font-black tracking-widest text-3xl sm:text-5xl uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-400 to-white drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            MÖBIUS ARQ
          </h3>
          <p className="font-sans text-xs tracking-[0.3em] text-stone-400 uppercase mt-2">
            Morfologia • Concreto • Luz Zenital
          </p>
        </motion.div>
      </div>

      {/* Independent Portfolio Callout Banner */}
      <div className="mb-6 p-5 rounded-lg bg-amber-500/5 border border-amber-500/10 flex flex-col md:flex-row items-center justify-between gap-4 z-10 text-left">
        <div className="space-y-1">
          <span className="font-mono text-[9px] text-amber-500 font-bold block uppercase tracking-[0.2em]">NOVO CASE DE ALTA IMPACTABILIDADE</span>
          <h4 className="font-sans font-bold text-white text-base">Website & Portfólio de Arquitetura Autoral</h4>
          <p className="text-white/60 text-xs leading-relaxed">
            Desenvolvido sob o viés editorial premium para expor projetos com minimalismo, integrando uma ferramenta interativa Antes/Depois de renovação, combinador de moodboards tátil e calculadora de viabilidade técnica.
          </p>
        </div>
        <button
          onClick={navigateToPortfolio}
          className="w-full md:w-auto py-3 px-6 rounded bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-mono text-[10px] font-extrabold uppercase tracking-widest hover:from-yellow-600 hover:to-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all cursor-pointer flex items-center justify-center space-x-1.5 shrink-0"
        >
          <span>ACESSAR CASE</span>
          <Sparkles className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Footer architectural features list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/10 pt-6 z-10 bg-black/40 rounded-b p-4">
        
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded bg-amber-500/10 text-amber-500 shrink-0">
            <Palette className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-white">INTERATIVIDADE TÁTIL</h4>
            <p className="text-white/40 text-[11px] mt-1">Garante tempos de permanência maiores ao permitir que o cliente brinque de combinar materiais de piso, parede e luz.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="p-2 rounded bg-amber-500/10 text-amber-500 shrink-0">
            <Sliders className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-white">QUALIFICAÇÃO DE LEADS</h4>
            <p className="text-white/40 text-[11px] mt-1">A calculadora de m² pré-filtra o cliente de acordo com a tipologia e padrão, poupando reuniões infrutíferas.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="p-2 rounded bg-amber-500/10 text-amber-500 shrink-0">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-white">FOTOS EM ALTA FIDELIDADE</h4>
            <p className="text-white/40 text-[11px] mt-1">Renderização visual impecável aliada à velocidade máxima de carregamento para não perder conversão mobile.</p>
          </div>
        </div>

      </div>

      {/* Internal Linking Recommender */}
      <InternalLinker currentTopic="marketing" className="mt-6 text-left" />
    </div>
  );
}
