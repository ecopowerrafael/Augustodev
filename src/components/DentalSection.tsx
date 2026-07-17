import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles, Heart, Activity, CheckCircle, Smile, ArrowRight, Stethoscope } from "lucide-react";

// SEO components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";

export default function DentalSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/dentista");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#030508] rounded-xl border border-white/5 hover:border-teal-500/40 transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 group"
      id="project-dentist"
    >
      <ProductSchema 
        id="dental-clinic-platform"
        details={{
          name: "Website para Consultório Odontológico de Alto Padrão - OralSense",
          description: "Website premium com diagnóstico virtual intraoral interativo, agendamento facilitado via WhatsApp, animações dinâmicas e mascote interativo integrado.",
          image: "https://augustodev.com/logo.png"
        }}
      />

      <div className="mb-6 self-start text-left">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "Plataforma Odontológica Premium", path: "/#project-dentist" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3 text-left">
          <div className="h-3 w-3 rounded-full bg-teal-500 animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 07 // WEBSITE CLÍNICO INTERATIVO
          </span>
        </div>
        <div className="font-mono text-xs text-teal-400 font-bold uppercase tracking-wider">
          ORALSENSE MEDICINA DENTÁRIA
        </div>
      </div>

      {/* Showcase area with a beautiful mock image */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left: Info */}
        <div className="text-left space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400 font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Sparkles className="h-3 w-3" />
            <span>INTERATIVIDADE & ALTA CONVERSÃO</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black tracking-tight text-white">
            Plataforma Médica Premium com <span className="text-teal-400">Diagnóstico Intraoral</span>
          </h3>

          <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
            Desenvolvido sob medida para clínicas e consultórios odontológicos que desejam se posicionar no mercado premium de estética dental (Invisalign, lentes de porcelana e implantes). Apresenta um mascote de dente 3D altamente animado por Framer Motion, simulador de raio-x bucal interativo, agendador de períodos inteligentes de consulta e finalizador instantâneo conectado via WhatsApp para capturar leads qualificados sem atrito.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/40 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <Smile className="h-4 w-4 text-teal-400" />
              <span>Mascote Dente 3D Animado</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Activity className="h-4 w-4 text-teal-400" />
              <span>Simulador Raio-X Intraoral</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle className="h-4 w-4 text-teal-400" />
              <span>Agendamento Inteligente</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Stethoscope className="h-4 w-4 text-teal-400" />
              <span>Conversão Direta WhatsApp</span>
            </div>
          </div>
        </div>

        {/* Right: Premium Interactive Visual Container */}
        <div className="relative w-full lg:w-[420px] aspect-[16/10] bg-[#07090E] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-teal-500/30 transition-all duration-500">
          <img 
            src="https://www.imagensanimadas.com/data/media/151/dente-imagem-animada-0013.gif" 
            alt="Dental Clinic Website Preview" 
            className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-left space-y-1">
            <span className="font-mono text-[9px] text-teal-400 font-bold uppercase tracking-wider">PREVISUALIZAÇÃO INTERATIVA</span>
            <h4 className="font-serif text-sm font-bold text-white">ORALSENSE CLÍNICA PREMIUM</h4>
            <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
              <span>Website do Consultório & Agendamento</span>
              <span className="text-teal-400 font-bold">Ver Projeto</span>
            </div>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 z-10">
        <div className="text-left">
          <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest block font-bold">ESTÉTICA & BIOSSEGURANÇA</span>
          <span className="font-sans text-xs text-white/70 font-semibold">Tecnologia Digital Intuitiva</span>
        </div>

        <button
          onClick={navigateToPortfolio}
          className="w-full sm:w-auto px-6 py-3 rounded bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white font-sans text-xs font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg cursor-pointer border border-teal-500/20"
        >
          <span>ACESSAR PLATAFORMA CLÍNICA DE DENTISTA</span>
          <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
