import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ShoppingBag, Sparkles, ArrowRight, Star, Heart, Award, Eye } from "lucide-react";

// SEO Framework components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";

export default function StasiaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/stasia-cosmeticos");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#0d0d0f] rounded-xl border border-white/5 hover:border-amber-700/30 transition-all overflow-hidden flex flex-col justify-between p-8 group text-left"
      id="project-stasia"
    >
      {/* Product & Breadcrumb Schemas for Google Search indexing */}
      <ProductSchema 
        id="stasia-cosmetics-showcase"
        details={{
          name: "Stasia Cosmetics - Haute Couture Beauté",
          description: "Plataforma completa de e-commerce, portal institucional e landing page diagnóstica de visagismo digital (Skin Match Quiz) para a marca de cosméticos de luxo Stasia.",
          image: "https://i.pinimg.com/originals/32/ce/35/32ce350141a3dabeb6f47003b6a13a43.gif"
        }}
      />
      
      <div className="mb-6 self-start">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "Stasia Cosmetics", path: "/#project-stasia" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-amber-600 animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 16 // HAUTE COUTURE BEAUTÉ
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/5 font-mono text-[9px] text-amber-500 uppercase font-bold">
          ESTILO PREMIUM LUXURY EDITORIAL
        </div>
      </div>

      {/* Main content split */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left info description */}
        <div className="space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>INSTITUCIONAL, E-COMMERCE & LANDING PAGE</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black text-white leading-tight">
            Stasia Cosmétiques: <span className="text-amber-500">Haute Couture Beauté</span> & E-Commerce
          </h3>

          <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
            Desenvolvimento de identidade forte, portal institucional e e-commerce de alta conversão para a marca Stasia. O projeto integra um funil inteligente de visagismo digital (Skin Match Quiz) que recomenda a tonalidade ideal de base ou batom, impulsionando vendas diretas e captura de leads segmentados.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/40 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <ShoppingBag className="h-4 w-4 text-amber-500" />
              <span>Checkout Integrado</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Star className="h-4 w-4 text-amber-500" />
              <span>Skin Match Quiz</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Heart className="h-4 w-4 text-amber-500" />
              <span>Sacola de Luxo Interativa</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Award className="h-4 w-4 text-amber-500" />
              <span>Fórmulas Limpas</span>
            </div>
          </div>
        </div>

        {/* Right: Beautiful Premium Image Showcase */}
        <div className="relative w-full lg:w-[380px] aspect-[10/14] bg-[#121214] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-amber-600/30 transition-all duration-500">
          <img 
            src="https://i.pinimg.com/originals/32/ce/35/32ce350141a3dabeb6f47003b6a13a43.gif" 
            alt="Batom Velvet Rouge de Luxo Stasia" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          
          {/* Logo HUD Overlay */}
          <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3.5 py-2 border border-white/10 rounded-lg flex items-center space-x-2.5 z-20">
            <div className="h-7 w-7 rounded-full bg-[#111111] border border-amber-500 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            </div>
            <div className="text-left">
              <span className="font-sans font-black text-[9px] text-white tracking-widest block uppercase">STASIA PARIS</span>
              <span className="font-mono text-[7px] text-amber-500 block uppercase tracking-wider font-extrabold">HAUTE BEATE</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-6 left-6 right-6 text-left space-y-3">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((st) => (
                <div key={st} className="h-1.5 w-2 rounded-full bg-amber-500" />
              ))}
            </div>
            <span className="font-serif text-lg font-bold text-white block">Curadoria de Luxo</span>
            <p className="text-stone-300 font-sans text-[11px] leading-relaxed">
              O e-commerce apresenta uma experiência de compra polida e dinâmica, aliada ao rigor estético editorial das grandes maisons francesas.
            </p>
          </div>
        </div>

      </div>

      {/* Action footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 gap-4 z-10">
        <div className="flex flex-wrap gap-2 text-[9px] font-mono text-white/50 uppercase font-bold">
          <span className="bg-white/5 px-2 py-1 rounded">SITE INSTITUCIONAL</span>
          <span className="bg-white/5 px-2 py-1 rounded">E-COMMERCE MATRIZ</span>
          <span className="bg-white/5 px-2 py-1 rounded">MATCH DE SUBTOM QUIZ</span>
        </div>

        <button
          onClick={navigateToPortfolio}
          className="w-full sm:w-auto px-5 py-2.5 rounded bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-mono text-[10px] font-black uppercase tracking-wider transition duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-[0_4px_12px_rgba(217,119,6,0.2)] group"
        >
          <span>Acessar e-Commerce Stasia</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
