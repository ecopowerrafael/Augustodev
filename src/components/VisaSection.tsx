import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Globe, ShieldCheck, Sparkles, FileText, ArrowRight, Layers, Calculator } from "lucide-react";

// SEO Framework components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";

export default function VisaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/visto-e-passaporte");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#070b11] rounded-xl border border-white/5 hover:border-[#C5A059]/30 transition-all overflow-hidden flex flex-col justify-between p-8 group"
      id="project-visa"
    >
      {/* Product & Breadcrumb Schemas for Google Search indexing */}
      <ProductSchema 
        id="visa-case-showcase"
        details={{
          name: "Portal de Conversão e Consultoria de Vistos & Passaportes Premium",
          description: "Desenvolvimento de plataforma de captação de leads para vistos e passaportes internacionais. Apresenta calculadora dinâmica de taxas governamentais, simulador de risco de formulário DS-160 e painel informativo de documentação.",
          image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80"
        }}
      />
      <div className="mb-6 self-start text-left">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "Vistos & Passaportes", path: "/#project-visa" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-[#C5A059] animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 12 // HIGH-CONVERSION LANDING SUITE
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/5 font-mono text-[9px] text-[#C5A059] uppercase font-bold">
          ESTILO PREMIUM NAVY & GOLD
        </div>
      </div>

      {/* Main content split */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left info description */}
        <div className="text-left space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Sparkles className="h-3 w-3" />
            <span>ENGAJAMENTO & SIMULADOR DE RISCO DS-160</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black text-white leading-tight">
            Visto Certo: <span className="text-[#C5A059]">Consultoria de Elite</span> para Vistos e Passaportes
          </h3>

          <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
            Plataforma desenvolvida para captar leads qualificados com altíssima intenção de compra. Substitui formulários estáticos tradicionais por ferramentas de engajamento interativo, incluindo um Simulador de Solidez de Perfil Consular, uma Calculadora Integrada de Taxas (Governo + Assessoria) e gerador automatizado de check-lists de documentação obrigatória.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/40 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <Layers className="h-4 w-4 text-[#C5A059]" />
              <span>Simulador de Risco Consular</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Calculator className="h-4 w-4 text-[#C5A059]" />
              <span>Calculadora de Taxas</span>
            </div>
          </div>
        </div>

        {/* Right: Beautiful Premium Image Showcase of high-quality passport image */}
        <div className="relative w-full lg:w-[380px] aspect-[10/14] bg-[#0c141d] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-[#C5A059]/30 transition-all duration-500">
          <img 
            src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=600&q=80" 
            alt="Passaporte e Visto Americano Sucesso" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          
          {/* Logo HUD Overlay */}
          <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3.5 py-2 border border-white/10 rounded-lg flex items-center space-x-2.5 z-20">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#15325B] to-[#0B1E36] border border-[#C5A059] flex items-center justify-center">
              <Globe className="h-3.5 w-3.5 text-[#C5A059]" />
            </div>
            <div className="text-left">
              <span className="font-sans font-black text-[10px] text-white tracking-widest block uppercase">VISTO CERTO</span>
              <span className="font-mono text-[8px] text-[#C5A059] block uppercase tracking-wider font-extrabold">CONSULTORIA PREMIUM</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-6 left-6 right-6 text-left space-y-3">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((st) => (
                <div key={st} className="h-1 w-1.5 rounded-full bg-[#C5A059]" />
              ))}
            </div>
            <span className="font-serif text-lg font-bold text-white block">Aprovabilidade Otimizada</span>
            <p className="text-stone-300 font-sans text-[11px] leading-relaxed">
              Desenho com apelo visual premium para empresários, estudantes e famílias, oferecendo confiança extrema no trâmite de vistos americanos e passaportes brasileiros.
            </p>
          </div>
        </div>

      </div>

      {/* Action footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 gap-4 z-10">
        <div className="flex flex-wrap gap-2 text-[9px] font-mono text-white/50 uppercase font-bold text-left">
          <span className="bg-white/5 px-2 py-1 rounded">UX/UI PREMIUM</span>
          <span className="bg-white/5 px-2 py-1 rounded">LEAD OPTIMIZED</span>
          <span className="bg-white/5 px-2 py-1 rounded">INTERACTIVE TOOLKIT</span>
        </div>

        <button
          onClick={navigateToPortfolio}
          className="w-full sm:w-auto px-5 py-2.5 rounded bg-gradient-to-r from-[#C5A059] to-[#b59049] hover:from-[#b59049] hover:to-[#a07a38] text-[#0B1E36] font-mono text-[10px] font-black uppercase tracking-wider transition duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-[0_4px_12px_rgba(197,160,89,0.2)] group"
        >
          <span>Visualizar Site do Projeto</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
