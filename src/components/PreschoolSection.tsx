import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles, GraduationCap, Compass, BookOpen, Smile, ArrowRight, ShieldCheck } from "lucide-react";

// Image import
import classroomImg from "../assets/images/preschool_classroom_1784142253433.jpg";

// SEO components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";

export default function PreschoolSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/escola");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#030508] rounded-xl border border-white/5 hover:border-red-500/40 transition-all duration-500 overflow-hidden flex flex-col justify-between p-8 group"
      id="project-preschool"
    >
      <ProductSchema 
        id="preschool-mackenzie-platform"
        details={{
          name: "Website para Escola Infantil Particular de Elite - Mackenzie Kids",
          description: "Apresentação institucional premium para pré-escola utilizando o método fonético Mackenzie, com simulador interativo de turmas por faixa etária e agendador de visitas guiadas via WhatsApp.",
          image: "https://augustodev.com/logo.png"
        }}
      />

      <div className="mb-6 self-start text-left">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "Colégio Infantil Particular Elite", path: "/#project-preschool" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3 text-left">
          <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 08 // INFRAESTRUTURA EDUCACIONAL
          </span>
        </div>
        <div className="font-mono text-xs text-red-400 font-bold uppercase tracking-wider">
          MACKENZIE KIDS PRE-SCHOOL
        </div>
      </div>

      {/* Showcase area */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left: Info */}
        <div className="text-left space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Sparkles className="h-3 w-3" />
            <span>MÉTODO MACKENZIE & EDUCAÇÃO BASEADA EM VIRTUDES</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black tracking-tight text-white">
            Escola Infantil Premium com <span className="text-red-400">Método Fônico Mackenzie</span>
          </h3>

          <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
            Desenvolvido sob medida para colégios infantis de alto padrão. Combina um visual acolhedor e familiar com o profissionalismo do Sistema Mackenzie de Ensino. Apresenta um simulador interativo de idade e turmas (Maternal a Jardim II), detalhamento dos pilares de neuroestimulação e educação por princípios, e uma ficha completa de conversão direta ligada ao WhatsApp para captação imediata de matrículas qualificadas.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/40 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <GraduationCap className="h-4 w-4 text-red-400" />
              <span>Alfabetização Fônica Sistemática</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Compass className="h-4 w-4 text-red-400" />
              <span>Simulador Interativo de Idades</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4 w-4 text-red-400" />
              <span>Segurança por Câmeras em Tempo Real</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <BookOpen className="h-4 w-4 text-red-400" />
              <span>Ficha Pronta de Tour Pedagógico</span>
            </div>
          </div>
        </div>

        {/* Right: Premium Interactive Visual Container */}
        <div className="relative w-full lg:w-[420px] aspect-[16/10] bg-[#07090E] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-red-500/30 transition-all duration-500">
          <img 
            src={classroomImg} 
            alt="Preschool Website Preview" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-70"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-left space-y-1">
            <span className="font-mono text-[9px] text-red-400 font-bold uppercase tracking-wider">PREVISUALIZAÇÃO INTERATIVA</span>
            <h4 className="font-serif text-sm font-bold text-white">MACKENZIE KIDS COLÉGIO INTEGRAL</h4>
            <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
              <span>Website Escolar & Ficha de Agendamento</span>
              <span className="text-red-400 font-bold">Ver Projeto</span>
            </div>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5 z-10">
        <div className="text-left">
          <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest block font-bold">MÉTODO MACKENZIE DE ENSINO</span>
          <span className="font-sans text-xs text-white/70 font-semibold">Formando Princípios e Mentes</span>
        </div>

        <button
          onClick={navigateToPortfolio}
          className="w-full sm:w-auto px-6 py-3 rounded bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-sans text-xs font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg cursor-pointer border border-red-500/20"
        >
          <span>ACESSAR SITE DA ESCOLA INFANTIL</span>
          <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
