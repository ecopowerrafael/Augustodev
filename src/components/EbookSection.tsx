import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { BookOpen, MessageSquare, Zap, ShieldCheck, Star, ArrowRight } from "lucide-react";

// SEO components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";

export default function EbookSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/ebook");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#030508] rounded-xl border border-white/5 hover:border-[#00FF41]/40 transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 group"
      id="project-ebook"
    >
      <ProductSchema 
        id="ebook-landing-page"
        details={{
          name: "Landing Page de Alta Conversão com Foco em WhatsApp - O Império da Automação",
          description: "Desenvolvimento de páginas de vendas de alta performance com design de conversão, gatilhos mentais, escassez dinâmica e chamada direta para WhatsApp.",
          image: "https://augustodev.com/logo.png"
        }}
      />

      <div className="mb-6 self-start text-left">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "Landing Page E-book", path: "/#project-ebook" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3 text-left">
          <div className="h-3 w-3 rounded-full bg-[#00FF41] animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 05 // HIGH-CONVERTING LANDING PAGE
          </span>
        </div>
        <div className="font-mono text-xs text-[#00FF41] font-bold">
          CONVERSION BOOSTER
        </div>
      </div>

      {/* Showcase area with a beautiful mock image */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left: Info */}
        <div className="text-left space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#00FF41]/10 border border-[#00FF41]/20 text-[#00FF41] font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <BookOpen className="h-3 w-3" />
            <span>FUNIL DE WHATSAPP IMEDIATO</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black tracking-tight text-white">
            Landing Page de Vendas de <span className="text-[#00FF41]">Alta Conversão</span>
          </h3>

          <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
            Página de vendas desenvolvida com foco total em conversão de leads frios via tráfego pago (Google Ads / Meta Ads). Inclui contagem regressiva de escassez em tempo real, seções de dor e superação, tabela de preços agressiva com descontos e redirecionamento direto para fechamento personalizado no WhatsApp comercial.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/40 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <Zap className="h-4 w-4 text-[#00FF41]" />
              <span>Gatilhos de Escassez</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <MessageSquare className="h-4 w-4 text-[#00FF41]" />
              <span>Funil Direto de Pix</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4 w-4 text-[#00FF41]" />
              <span>Velocidade Móvel Ultra-Rápida</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Star className="h-4 w-4 text-[#00FF41] fill-[#00FF41]/25" />
              <span>Testemunhos Estruturados</span>
            </div>
          </div>
        </div>

        {/* Right: Premium Interactive Visual Container */}
        <div className="relative w-full lg:w-[420px] aspect-[16/10] bg-[#07090E] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-[#00FF41]/30 transition-all duration-500">
          <img 
            src="/src/assets/images/ebook_cover_ia_1784137376665.jpg" 
            alt="E-book Cover Preview" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-left space-y-1">
            <span className="font-mono text-[9px] text-[#00FF41] font-bold uppercase tracking-wider">MOCKUP DIGITAL</span>
            <h4 className="font-serif text-sm font-bold text-white">O IMPÉRIO DA AUTOMAÇÃO</h4>
            <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
              <span>E-book Prático de IA</span>
              <span className="text-[#00FF41] font-bold">R$ 29,90</span>
            </div>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 z-10">
        <div className="text-left">
          <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest block font-bold">CONVERSÃO APLICADA</span>
          <span className="font-sans text-xs text-white/70 font-semibold">Geração de Leads em Escala</span>
        </div>

        <button
          onClick={navigateToPortfolio}
          className="w-full sm:w-auto px-6 py-3 rounded bg-gradient-to-r from-[#00FF41] to-[#00D135] text-black font-sans text-xs font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
        >
          <span>ACESSAR LANDING PAGE DO E-BOOK</span>
          <ArrowRight className="h-4 w-4 text-black group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
