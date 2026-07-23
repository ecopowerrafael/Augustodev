import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Dumbbell, Users, Smartphone, TrendingUp, Sparkles, ArrowRight, DollarSign, Award } from "lucide-react";

// SEO Framework components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";

export default function LBTrainerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/lb-trainer");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#07090E] rounded-xl border border-white/5 hover:border-[#CCFF00]/30 transition-all overflow-hidden flex flex-col justify-between p-8 group text-left"
      id="project-lb-trainer"
    >
      {/* Product & Breadcrumb Schemas for Google Search indexing */}
      <ProductSchema 
        id="lb-trainer-case-showcase"
        details={{
          name: "LB Trainer - Plataforma MVP Completa de Gestão Fitness & Prescrição de Treinos",
          description: "Sistema moderno para personal trainers gerenciarem fichas de alunos, pagamentos recorrentes, avaliações físicas corporais completas e um aplicativo integrado para execução e log de cargas por parte do aluno.",
          image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
        }}
      />
      
      <div className="mb-6 self-start">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "LB Trainer", path: "/#project-lb-trainer" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-[#CCFF00] animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 17 // FITNESS SaaS MVP PLATFORM
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 bg-[#CCFF00]/10 px-3 py-1 rounded-full border border-[#CCFF00]/20 font-mono text-[9px] text-[#CCFF00] uppercase font-bold">
          CONSTRUÇÃO SOB A ÓTICA DO PERSONAL TRAINER
        </div>
      </div>

      {/* Main content split */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left info description */}
        <div className="space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#CCFF00]/10 border border-[#CCFF00]/20 text-[#CCFF00] font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Sparkles className="h-3 w-3" />
            <span>SOLUÇÃO ESPORTIVA CONECTADA</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black text-white leading-tight">
            LB Trainer: <span className="text-[#CCFF00]">Gestão Unificada</span> de Alunos, Treinos e Evolução
          </h3>

          <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
            Desenvolvido por quem atua diariamente no salão de musculação e no circuito híbrido. Resolve a bagunça de treinos em PDFs soltos e planilhas confusas. Apresenta uma área completa para o Personal Trainer (prescrever treinos rápidos, gerar sugestões com Inteligência Artificial e lançar avaliações) de mãos dadas com a Área do Aluno, onde o atleta anota suas cargas semanais de forma ágil e interativa.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/40 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <Users className="h-4 w-4 text-[#CCFF00]" />
              <span>Matrícula & Fichas de Alunos</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Dumbbell className="h-4 w-4 text-[#CCFF00]" />
              <span>Biblioteca de Exercícios</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <TrendingUp className="h-4 w-4 text-[#CCFF00]" />
              <span>Avaliações & Gráfico de Peso</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <DollarSign className="h-4 w-4 text-[#CCFF00]" />
              <span>Gestão de Mensalidades</span>
            </div>
          </div>
        </div>

        {/* Right: Beautiful Premium Image Showcase */}
        <div className="relative w-full lg:w-[380px] aspect-[10/14] bg-[#0E1015] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-[#CCFF00]/30 transition-all duration-500">
          <img 
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80" 
            alt="Musculação de Alto Rendimento e Treinamento Físico" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
          
          <div className="absolute bottom-6 left-6 right-6 z-20 space-y-3 text-left">
            <div className="bg-black/80 backdrop-blur-md p-4 rounded-lg border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-[#CCFF00] font-bold block uppercase tracking-wider">Métrica de Produtividade</span>
              <p className="text-white font-bold text-xs">Aumento de até 40% na fidelidade de alunos recorrentes devido ao controle de progresso.</p>
            </div>
            
            <button 
              onClick={navigateToPortfolio}
              className="w-full bg-[#CCFF00] text-[#0E1015] font-mono text-xs font-bold py-2.5 rounded-lg flex items-center justify-center space-x-1.5 group/btn transition-colors hover:bg-lime-400 cursor-pointer"
            >
              <span>ABRIR PLATAFORMA MVP</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>

      </div>

      {/* Visual background decorations */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-[#CCFF00]/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#CCFF00]/10 transition-colors duration-500" />
    </div>
  );
}
