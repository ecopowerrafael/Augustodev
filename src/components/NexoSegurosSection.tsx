import React, { useRef } from "react";
import { ShieldCheck, Sparkles, ArrowRight, Clock, Users, Building2, Shield, Award, Heart, Car } from "lucide-react";
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";

export default function NexoSegurosSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/nexo-seguros");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#123B5D] rounded-xl border border-[#1677A3]/50 hover:border-[#2FA56A]/70 transition-all overflow-hidden flex flex-col justify-between p-8 group text-left shadow-2xl"
      id="project-nexo-seguros"
    >
      <ProductSchema 
        id="nexo-seguros-showcase"
        details={{
          name: "Nexo Seguros - Site Institucional e Plataforma de Cotação de Seguros Consultiva",
          description: "Protótipo moderno, consultivo e transparente para corretora de seguros. Inclui simulador de cotação em etapas, calculadora de seguro de vida, atendente virtual simulado e catálogo para Pessoas, Empresas e Condomínios.",
          image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80"
        }}
      />
      
      <div className="mb-6 self-start">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "Nexo Seguros", path: "/#project-nexo-seguros" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/15 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-[#2FA56A] animate-pulse" />
          <span className="font-mono text-xs text-white/60 tracking-wider uppercase">
            CASO DE SUCESSO 30 // CORRETORA DE SEGUROS
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/10 font-mono text-[9px] text-[#2FA56A] uppercase font-bold">
          ESTILO DEEP BLUE & PROTECTION GREEN
        </div>
      </div>

      {/* Main content split */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left info description */}
        <div className="space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#1677A3]/30 border border-[#2FA56A]/40 text-[#2FA56A] font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Sparkles className="h-3 w-3 text-[#2FA56A]" />
            <span>PROTEÇÃO PARA O SEU FUTURO</span>
          </div>

          <h3 className="font-sans text-2xl md:text-3xl font-black text-white leading-tight">
            Nexo Seguros: <span className="text-[#2FA56A]">Consultoria & Proteção</span> em Cada Conexão
          </h3>

          <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
            Plataforma institucional completa e moderna para corretora de seguros consultiva. Apresenta navegação dinâmica para Auto, Residência, Vida, Saúde, Empresarial e Condomínio, assistente de cotação multi-etapas, calculadora de capital segurado e suporte interativo.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/70 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4 w-4 text-[#2FA56A]" />
              <span>Cotação Guiada Multi-Etapas</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Heart className="h-4 w-4 text-[#1677A3]" />
              <span>Calculadora de Vida</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Building2 className="h-4 w-4 text-[#2FA56A]" />
              <span>Foco Empresas & Condomínios</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Award className="h-4 w-4 text-[#1677A3]" />
              <span>Atendimento Consultivo</span>
            </div>
          </div>
        </div>

        {/* Right: Premium Image Showcase */}
        <div className="relative w-full lg:w-[380px] aspect-[10/14] bg-[#0d2b45] rounded-xl border border-white/20 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-[#2FA56A]/60 transition-all duration-500">
          <img 
            src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80" 
            alt="Consultoria de Seguros Nexo Seguros" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          
          {/* Logo HUD Overlay */}
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-2 border border-white/10 rounded-lg flex items-center space-x-2.5 z-20">
            <div className="h-7 w-7 rounded-xl bg-[#1677A3] flex items-center justify-center text-white font-black shadow-inner">
              <Shield className="h-3.5 w-3.5 text-[#2FA56A]" />
            </div>
            <div className="text-left">
              <span className="font-sans font-black text-xs text-white tracking-widest block uppercase">NEXO SEGUROS</span>
              <span className="font-mono text-[8px] text-[#2FA56A] block uppercase tracking-wider font-extrabold">CORRETORA CONSULTIVA</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-6 left-6 right-6 text-left space-y-3">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((st) => (
                <div key={st} className="h-1.5 w-2 rounded-full bg-[#2FA56A]" />
              ))}
            </div>
            <span className="font-sans text-lg font-bold text-white block">Proteção e Confiabilidade</span>
            <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
              Design humanizado, moderno e orientado à conversão para pessoas e empresas.
            </p>
          </div>
        </div>

      </div>

      {/* Action footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/15 pt-6 gap-4 z-10">
        <div className="flex flex-wrap gap-2 text-[9px] font-mono text-white/60 uppercase font-bold">
          <span className="bg-white/10 px-2 py-1 rounded">SITE INSTITUCIONAL</span>
          <span className="bg-white/10 px-2 py-1 rounded">COTAÇÃO SIMULADA</span>
          <span className="bg-white/10 px-2 py-1 rounded">CALCULADORA DE SEGURO</span>
        </div>

        <button
          onClick={navigateToPortfolio}
          className="w-full sm:w-auto px-5 py-2.5 rounded bg-gradient-to-r from-[#1677A3] to-[#2FA56A] hover:from-[#2FA56A] hover:to-[#1677A3] text-white font-mono text-[10px] font-black uppercase tracking-wider transition duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-[0_4px_12px_rgba(47,165,106,0.4)] group"
        >
          <span>Acessar Protótipo Nexo Seguros</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
