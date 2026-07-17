import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Pizza, MessageSquare, Zap, ShieldCheck, Flame, ArrowRight, ShoppingCart } from "lucide-react";

// Image import
import margheritaImg from "../assets/images/neapolitan_pizza_margherita_1784140572397.jpg";

// SEO components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";

export default function PizzeriaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/pizzaria");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#030508] rounded-xl border border-white/5 hover:border-red-500/40 transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 group"
      id="project-pizzaria"
    >
      <ProductSchema 
        id="pizzaria-digital-menu"
        details={{
          name: "Cardápio Digital de Pizzaria com Integração de Pedidos via WhatsApp",
          description: "Plataforma de cardápio interativo com carrinho de compras, customizador de bordas e ingredientes, cálculo em tempo real e finalização direta via WhatsApp.",
          image: "https://augustodev.com/logo.png"
        }}
      />

      <div className="mb-6 self-start text-left">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "Cardápio Digital Pizzaria", path: "/#project-pizzaria" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3 text-left">
          <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 06 // CARDÁPIO DIGITAL INTERATIVO
          </span>
        </div>
        <div className="font-mono text-xs text-red-500 font-bold uppercase tracking-wider">
          FORNO & LENHA WOOD-FIRED
        </div>
      </div>

      {/* Showcase area with a beautiful mock image */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left: Info */}
        <div className="text-left space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Pizza className="h-3 w-3" />
            <span>SISTEMA DE DELIVERY MODERNO</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black tracking-tight text-white">
            Cardápio Digital Interativo de <span className="text-red-500">Pizzaria Gourmet</span>
          </h3>

          <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
            Plataforma inovadora desenvolvida sob medida para pizzarias e hamburguerias. Substitui os PDFs pesados e lentos por uma aplicação web ultra-rápida. Conta com carrinho interativo de compras, customizador completo de tamanhos de pizza, bordas recheadas, adicionais de coberturas e finalizador inteligente que gera a comanda mastigada direto no WhatsApp.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/40 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <Flame className="h-4 w-4 text-red-500" />
              <span>Forno a Lenha de Altíssima Conversão</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShoppingCart className="h-4 w-4 text-red-500" />
              <span>Carrinho de Compras Interativo</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4 w-4 text-red-500" />
              <span>Customizador Dinâmico de Tamanhos</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <MessageSquare className="h-4 w-4 text-red-500" />
              <span>Comanda Formatada via WhatsApp</span>
            </div>
          </div>
        </div>

        {/* Right: Premium Interactive Visual Container */}
        <div className="relative w-full lg:w-[420px] aspect-[16/10] bg-[#07090E] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-red-500/30 transition-all duration-500">
          <img 
            src={margheritaImg} 
            alt="Pizzaria Cardapio Digital Preview" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-left space-y-1">
            <span className="font-mono text-[9px] text-red-500 font-bold uppercase tracking-wider">PREVISUALIZAÇÃO INTERATIVA</span>
            <h4 className="font-serif text-sm font-bold text-white">FORNO & BRASA PIZZARIA</h4>
            <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
              <span>Cardápio & Sistema de Pedidos</span>
              <span className="text-red-500 font-bold">Ver Projeto</span>
            </div>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 z-10">
        <div className="text-left">
          <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest block font-bold">INTERATIVIDADE FLUIDA</span>
          <span className="font-sans text-xs text-white/70 font-semibold">Zero Atrito no WhatsApp</span>
        </div>

        <button
          onClick={navigateToPortfolio}
          className="w-full sm:w-auto px-6 py-3 rounded bg-gradient-to-r from-red-600 to-red-500 text-white font-sans text-xs font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg cursor-pointer border border-red-500/20"
        >
          <span>ACESSAR CARDÁPIO DIGITAL DE PIZZARIA</span>
          <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
