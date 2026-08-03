import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { FlaskConical, FileText, Sparkles, ArrowRight, ShieldCheck, Clock, Layers } from "lucide-react";
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";

export default function FormulaVitaSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/formula-vita");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#0a1815] rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-all overflow-hidden flex flex-col justify-between p-8 group text-left"
      id="project-formula-vita"
    >
      <ProductSchema 
        id="formula-vita-showcase"
        details={{
          name: "Fórmula Vita - Site Institucional e Plataforma de Orçamento para Farmácia de Manipulação",
          description: "Protótipo completo para farmácia de manipulação com catálogo de ativos, simulador de orçamento por foto/PDF de receita, rastreamento de solicitações, área do cliente e painel administrativo para farmacêuticos.",
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
        }}
      />
      
      <div className="mb-6 self-start">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "Fórmula Vita", path: "/#project-formula-vita" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 28 // FARMÁCIA DE MANIPULAÇÃO
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/5 font-mono text-[9px] text-emerald-400 uppercase font-bold">
          ESTILO CLINICAL GREEN & GOLD
        </div>
      </div>

      {/* Main content split */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left info description */}
        <div className="space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Sparkles className="h-3 w-3 text-[#C5A461]" />
            <span>SAÚDE & TECNOLOGIA DE MANIPULAÇÃO</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black text-white leading-tight">
            Fórmula Vita: <span className="text-emerald-400">Plataforma de Orçamentos</span> & Manipulação
          </h3>

          <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
            Plataforma digital integrada para farmácias de manipulação. Permite envio seguro de receitas médicas por foto ou PDF, análise automatizada, catálogo de ativos com filtros, área do cliente com acompanhamento em tempo real e painel administrativo completo para farmacêuticos.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/40 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <FileText className="h-4 w-4 text-emerald-400" />
              <span>Envio de Receitas Drag-Drop</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <FlaskConical className="h-4 w-4 text-emerald-400" />
              <span>Catálogo de Ativos</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock className="h-4 w-4 text-emerald-400" />
              <span>Linha do Tempo Rastreável</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Painel do Farmacêutico</span>
            </div>
          </div>
        </div>

        {/* Right: Beautiful Premium Image Showcase */}
        <div className="relative w-full lg:w-[380px] aspect-[10/14] bg-[#071310] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-emerald-500/30 transition-all duration-500">
          <img 
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80" 
            alt="Laboratório de Manipulação Farmacêutica" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          
          {/* Logo HUD Overlay */}
          <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3.5 py-2 border border-white/10 rounded-lg flex items-center space-x-2.5 z-20">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#174C45] to-[#2F7D6D] border border-emerald-400 flex items-center justify-center">
              <FlaskConical className="h-3.5 w-3.5 text-[#DFF2EC]" />
            </div>
            <div className="text-left">
              <span className="font-serif font-black text-xs text-white tracking-widest block uppercase">FÓRMULA VITA</span>
              <span className="font-mono text-[8px] text-emerald-400 block uppercase tracking-wider font-extrabold">MANIPULAÇÃO DIGITAL</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-6 left-6 right-6 text-left space-y-3">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((st) => (
                <div key={st} className="h-1.5 w-2 rounded-full bg-emerald-500" />
              ))}
            </div>
            <span className="font-serif text-lg font-bold text-white block">Cuidado Personalizado</span>
            <p className="text-stone-300 font-sans text-[11px] leading-relaxed">
              Solução completa com site institucional, laboratórios, catálogo técnico, cotação por receita e área do paciente.
            </p>
          </div>
        </div>

      </div>

      {/* Action footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 gap-4 z-10">
        <div className="flex flex-wrap gap-2 text-[9px] font-mono text-white/50 uppercase font-bold">
          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-1 rounded">🔥 LANDING PAGE SUPLEMENTOS</span>
          <span className="bg-white/5 px-2 py-1 rounded">SITE INSTITUCIONAL</span>
          <span className="bg-white/5 px-2 py-1 rounded">ORÇAMENTO DE RECEITAS</span>
          <span className="bg-white/5 px-2 py-1 rounded">PAINEL FARMACÊUTICO</span>
        </div>

        <button
          onClick={navigateToPortfolio}
          className="w-full sm:w-auto px-5 py-2.5 rounded bg-gradient-to-r from-[#2F7D6D] to-[#174C45] hover:from-[#174C45] hover:to-[#2F7D6D] text-white font-mono text-[10px] font-black uppercase tracking-wider transition duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-[0_4px_12px_rgba(47,125,109,0.3)] group"
        >
          <span>Acessar Protótipo Suplementos & Farmácia</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
