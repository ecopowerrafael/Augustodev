import React, { useRef } from "react";
import { Wrench, Sparkles, ArrowRight, ShieldCheck, Clock, Users, DollarSign, Award } from "lucide-react";
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";

export default function TaNaMaoSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/tanamao");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#0D326E] rounded-xl border border-[#1769E0]/40 hover:border-[#1769E0]/70 transition-all overflow-hidden flex flex-col justify-between p-8 group text-left shadow-2xl"
      id="project-tanamao"
    >
      <ProductSchema 
        id="tanamao-showcase"
        details={{
          name: "TáNáMão - Aplicativo e Plataforma de Contratação de Serviços com Pagamento Protegido",
          description: "Plataforma completa marketplace para contratação de serviços locais com app de clientes, app de prestadores, comparador de propostas, chat em tempo real, contrato digital, pagamento retido em escrow e painel administrativo web.",
          image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80"
        }}
      />
      
      <div className="mb-6 self-start">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "TáNáMão", path: "/#project-tanamao" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/15 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-[#16A36A] animate-pulse" />
          <span className="font-mono text-xs text-white/60 tracking-wider uppercase">
            CASO DE SUCESSO 29 // MARKETPLACE DE SERVIÇOS
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/10 font-mono text-[9px] text-[#F4B740] uppercase font-bold">
          ESTILO MODERN BLUE & GOLD
        </div>
      </div>

      {/* Main content split */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left info description */}
        <div className="space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#1769E0]/20 border border-[#1769E0]/40 text-[#F4B740] font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Sparkles className="h-3 w-3 text-[#F4B740]" />
            <span>CONTRATAÇÃO SEGURA & ESCROW</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black text-white leading-tight">
            TáNáMão: <span className="text-[#F4B740]">O Profissional Certo</span> na Hora que Você Precisa
          </h3>

          <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
            Plataforma completa que conecta clientes e prestadores de serviços locais. Inclui aplicativo móvel para clientes, aplicativo para profissionais, comparador de propostas, chat integrado, contrato digital assinado, pagamento protegido retido em garantia (Escrow) e painel administrativo web com métricas em tempo real.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/60 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4 w-4 text-[#16A36A]" />
              <span>Pagamento Protegido Escrow</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock className="h-4 w-4 text-[#F4B740]" />
              <span>Linha do Tempo e GPS</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Users className="h-4 w-4 text-[#1769E0]" />
              <span>Propostas e Comparador</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Award className="h-4 w-4 text-[#F4B740]" />
              <span>Gamificação e Níveis</span>
            </div>
          </div>
        </div>

        {/* Right: Beautiful Premium Image Showcase */}
        <div className="relative w-full lg:w-[380px] aspect-[10/14] bg-[#091D42] rounded-xl border border-white/20 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-[#F4B740]/60 transition-all duration-500">
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80" 
            alt="Profissional de Serviços em Ação" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          
          {/* Logo HUD Overlay */}
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-2 border border-white/10 rounded-lg flex items-center space-x-2.5 z-20">
            <div className="h-7 w-7 rounded-xl bg-[#1769E0] flex items-center justify-center text-white font-black shadow-inner">
              <Wrench className="h-3.5 w-3.5" />
            </div>
            <div className="text-left">
              <span className="font-serif font-black text-xs text-white tracking-widest block uppercase">TÁNÁMÃO</span>
              <span className="font-mono text-[8px] text-[#F4B740] block uppercase tracking-wider font-extrabold">MARKETPLACE DE SERVIÇOS</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-6 left-6 right-6 text-left space-y-3">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((st) => (
                <div key={st} className="h-1.5 w-2 rounded-full bg-[#16A36A]" />
              ))}
            </div>
            <span className="font-serif text-lg font-bold text-white block">Aperto de Mão Seguro</span>
            <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
              Três ambientes integrados: Cliente, Prestador de Serviços e Painel Administrativo.
            </p>
          </div>
        </div>

      </div>

      {/* Action footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/15 pt-6 gap-4 z-10">
        <div className="flex flex-wrap gap-2 text-[9px] font-mono text-white/60 uppercase font-bold">
          <span className="bg-white/10 px-2 py-1 rounded">APP CLIENTE</span>
          <span className="bg-white/10 px-2 py-1 rounded">APP PRESTADOR</span>
          <span className="bg-white/10 px-2 py-1 rounded">PAINEL ADMIN WEB</span>
        </div>

        <button
          onClick={navigateToPortfolio}
          className="w-full sm:w-auto px-5 py-2.5 rounded bg-gradient-to-r from-[#1769E0] to-[#0D326E] hover:from-[#0D326E] hover:to-[#1769E0] text-white font-mono text-[10px] font-black uppercase tracking-wider transition duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-[0_4px_12px_rgba(23,105,224,0.4)] group"
        >
          <span>Acessar Protótipo TáNáMão</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
