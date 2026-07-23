import React, { useRef } from "react";
import { Tv, Zap, Globe, Download, Code, ShieldCheck, Sparkles, ArrowRight, Play, Film, Server } from "lucide-react";

// SEO Framework components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";

export default function AdultStreamSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/adult-stream");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#07090E] rounded-xl border border-white/5 hover:border-[#FF2A6D]/30 transition-all overflow-hidden flex flex-col justify-between p-8 group text-left"
      id="project-adult-stream"
    >
      {/* Product & Breadcrumb Schemas for Google Search indexing */}
      <ProductSchema 
        id="adult-stream-case-showcase"
        details={{
          name: "Plataforma de Streaming Adulto Responsiva & Custom HTML5 Player",
          description: "Desenvolvimento do zero (sem WordPress) de site adulto moderno em inglês, leve e escalável. Equipado com player HTML5 próprio, rede de anúncios VAST, raspador de vídeos e importador VPS, código de incorporação (embed) e gerador de sitemap XML dinâmico.",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
        }}
      />
      
      <div className="mb-6 self-start">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "Site Adulto Responsivo", path: "/#project-adult-stream" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-[#FF2A6D] animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 21 // SCALABLE STREAMING ENGINE
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 bg-[#FF2A6D]/10 px-3 py-1 rounded-full border border-[#FF2A6D]/20 font-mono text-[9px] text-[#FF2A6D] uppercase font-bold">
          100% IN ENGLISH & DYNAMIC VAST NETWORK
        </div>
      </div>

      {/* Main content split */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left info description */}
        <div className="space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#FF2A6D]/10 border border-[#FF2A6D]/20 text-[#FF2A6D] font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Sparkles className="h-3 w-3" />
            <span>DESENVOLVIMENTO SOB MEDIDA DO ZERO</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black text-white leading-tight">
            Site Adulto Responsivo: <span className="text-[#FF2A6D]">Alta Performance</span> & Player VAST
          </h3>

          <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
            Plataforma de streaming desenvolvida em React/TypeScript sem dependência de WordPress. Arquitetura em inglês projetada para alto tráfego com player HTML5 próprio, integração com anúncios VAST, raspador automático para importação direta na VPS com extração de metadados, código de incorporação (embed) para terceiros, denúncias e sitemap XML dinâmico.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/40 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <Tv className="h-4 w-4 text-[#FF2A6D]" />
              <span>Player HTML5 Próprio</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Zap className="h-4 w-4 text-[#FF2A6D]" />
              <span>Suporte Anúncios VAST</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Download className="h-4 w-4 text-[#FF2A6D]" />
              <span>Importador VPS Auto Scrape</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Code className="h-4 w-4 text-[#FF2A6D]" />
              <span>Gerador de Embed & XML</span>
            </div>
          </div>
        </div>

        {/* Right: Beautiful Premium Image Showcase */}
        <div className="relative w-full lg:w-[380px] aspect-[10/14] bg-[#0A0D14] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-[#FF2A6D]/30 transition-all duration-500">
          <img 
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80" 
            alt="Streaming Video Engine Cyberpunk Aesthetics" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-black/40 to-transparent" />

          {/* Interactive Live Card HUD Badge */}
          <div className="relative z-10 p-6 text-center space-y-3 max-w-xs">
            <div className="h-14 w-14 rounded-2xl bg-[#FF2A6D]/20 border border-[#FF2A6D]/40 backdrop-blur-md flex items-center justify-center mx-auto text-[#FF2A6D] shadow-[0_0_20px_rgba(255,42,109,0.5)]">
              <Play className="h-7 w-7 fill-current ml-0.5" />
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block">HLS Streaming Node</span>
              <h4 className="font-bold text-white text-base">VortexMedia Engine</h4>
            </div>
            <span className="inline-block bg-black/80 px-3 py-1 rounded-full text-[9px] font-mono text-emerald-400 border border-white/10 uppercase">
              ● 100% English UI Active
            </span>
          </div>
        </div>

      </div>

      {/* Footer Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-4 gap-4 z-10">
        <div className="flex items-center space-x-2 text-xs font-mono text-gray-400">
          <Server className="h-4 w-4 text-[#FF2A6D]" />
          <span>Painel Admin • Raspador VPS • Anúncios VAST • Embed & XML</span>
        </div>

        <button
          onClick={navigateToPortfolio}
          className="w-full sm:w-auto px-6 py-3 bg-[#FF2A6D] hover:bg-pink-600 text-white font-mono text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(255,42,109,0.4)] flex items-center justify-center space-x-2 cursor-pointer group/btn"
        >
          <span>Testar Plataforma Ao Vivo</span>
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
