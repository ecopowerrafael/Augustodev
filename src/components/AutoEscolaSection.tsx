import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles, Navigation, ShieldAlert, Disc, ArrowRight, Gauge } from "lucide-react";

// Image import
import drivingSchoolCar from "../assets/images/driving_school_car_1784143284543.jpg";

// SEO components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";

export default function AutoEscolaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/autoescola");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#030508] rounded-xl border border-white/5 hover:border-amber-500/40 transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 group"
      id="project-autoescola"
    >
      <ProductSchema 
        id="autoescola-piloto-platform"
        details={{
          name: "Website Interativo para Autoescola Premium - Autoescola Piloto",
          description: "Portal interativo de alta conversão para autoescola de alto padrão. Possui simulado oficial do DETRAN interativo, explicação lúdica do painel de instrumentos do carro, animação mecânica do motor e funil rápido para agendamento de aulas práticas.",
          image: "https://augustodev.com/logo.png"
        }}
      />

      <div className="mb-6 self-start text-left">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "Autoescola Tecnológica Líder", path: "/#project-autoescola" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3 text-left">
          <div className="h-3 w-3 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 09 // AUTOMOTIVO & TREINAMENTO
          </span>
        </div>
        <div className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">
          AUTOESCOLA PILOTO TECH
        </div>
      </div>

      {/* Showcase area */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left: Info */}
        <div className="text-left space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Sparkles className="h-3 w-3" />
            <span>INTERATIVIDADE FLUIDA & CAR PARTS DESIGN</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black tracking-tight text-white">
            Autoescola com <span className="text-amber-400">Simulado DETRAN</span> e Painel Interativo
          </h3>

          <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
            Uma abordagem audaciosa e de alta conversão para o setor automobilístico. Com um Simulado do DETRAN integrado para atuar como captador de leads direto, ponteiro de RPM ativo, guia de luzes de advertência do painel de instrumentos e simulador do motor, o site encanta o futuro condutor e otimiza matrículas de primeira habilitação (Categorias A e B).
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/40 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <Gauge className="h-4 w-4 text-amber-400" />
              <span>Simulado DETRAN Interativo</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Disc className="h-4 w-4 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
              <span>Rodas e Calotas em Movimento</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldAlert className="h-4 w-4 text-amber-400" />
              <span>Guia de Luzes de Painel Lúdico</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Navigation className="h-4 w-4 text-amber-400" />
              <span>Agendamento de Teóricas e Práticas</span>
            </div>
          </div>
        </div>

        {/* Right: Premium Interactive Visual Container */}
        <div className="relative w-full lg:w-[420px] aspect-[16/10] bg-[#07090E] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-amber-500/30 transition-all duration-500">
          <img 
            src={drivingSchoolCar} 
            alt="Auto Escola Preview" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-70"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-left space-y-1">
            <span className="font-mono text-[9px] text-amber-400 font-bold uppercase tracking-wider font-extrabold">SIMULADO DETRAN</span>
            <h4 className="font-serif text-sm font-bold text-white">AUTOESCOLA PILOTO - LÍDER DE APROVAÇÃO</h4>
            <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
              <span>Habilitação Rápida, Segura e Divertida</span>
              <span className="text-amber-400 font-extrabold">Ver Projeto</span>
            </div>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 z-10">
        <div className="text-left">
          <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest block font-bold">ALTA APRENDIZAGEM & CONVERSÃO</span>
          <span className="font-sans text-xs text-white/70 font-semibold">Tecnologia que Coloca Você no Volante</span>
        </div>

        <button
          onClick={navigateToPortfolio}
          className="w-full sm:w-auto px-6 py-3 rounded bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-yellow-500 hover:to-amber-600 text-black font-sans text-xs font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg cursor-pointer border border-amber-500/20 font-extrabold"
        >
          <span>ACESSAR SITE DA AUTOESCOLA TECH</span>
          <ArrowRight className="h-4 w-4 text-black group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
