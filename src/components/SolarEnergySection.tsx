import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Sun, TrendingUp, Sliders, Zap, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

// SEO Framework components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";

export default function SolarEnergySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/energia-solar");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#040814] rounded-xl border border-white/5 hover:border-amber-500/30 transition-all overflow-hidden flex flex-col justify-between p-8 group text-left"
      id="project-solar-energy"
    >
      {/* Product & Breadcrumb Schemas for Google Search indexing */}
      <ProductSchema 
        id="solar-energy-showcase"
        details={{
          name: "EcoPower Solar - Landing Page de Engenharia Fotovoltaica",
          description: "Plataforma de captação de clientes de energia solar com simulador de custos de investimento, payback estimado regionalmente e pré-auditoria técnica de viabilidade de telhado.",
          image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80"
        }}
      />
      
      <div className="mb-6 self-start">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "EcoPower Solar", path: "/#project-solar-energy" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 15 // ECOPOWER ENERGY
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/5 font-mono text-[9px] text-amber-500 uppercase font-bold">
          ESTILO PREMIUM AMBER & ECO
        </div>
      </div>

      {/* Main content split */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left info description */}
        <div className="space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>SOLUÇÃO FOTOVOLTAICA INTELIGENTE</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black text-white leading-tight">
            EcoPower Solar: <span className="text-amber-400">Calculadora de Economia</span> & Viabilidade
          </h3>

          <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
            Landing page de alta conversão estruturada com cálculos reais de tarifas energéticas regionais. Reduza até 95% do seu consumo por meio de um dimensionamento preliminar de engenharia com estimativas de retorno do investimento e pré-diagnóstico de viabilidade do telhado.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/40 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <Sun className="h-4 w-4 text-amber-400" />
              <span>Calculadora Tarifária</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Sliders className="h-4 w-4 text-amber-400" />
              <span>Diagnóstico de Telhado</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <TrendingUp className="h-4 w-4 text-amber-400" />
              <span>Payback em Tempo Real</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>Segurança & Homologação</span>
            </div>
          </div>
        </div>

        {/* Right: Beautiful Premium Image Showcase */}
        <div className="relative w-full lg:w-[380px] aspect-[10/14] bg-[#070b19] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-amber-500/30 transition-all duration-500">
          <img 
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80" 
            alt="Painéis solares fotovoltaicos sob céu azul" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          
          {/* Logo HUD Overlay */}
          <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3.5 py-2 border border-white/10 rounded-lg flex items-center space-x-2.5 z-20">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-stone-900 to-[#0c0f1e] border border-amber-400 flex items-center justify-center">
              <Sun className="h-3.5 w-3.5 text-amber-400 animate-spin" style={{ animationDuration: "30s" }} />
            </div>
            <div className="text-left">
              <span className="font-sans font-black text-[10px] text-white tracking-widest block uppercase">ECOPOWER SOLAR</span>
              <span className="font-mono text-[8px] text-amber-400 block uppercase tracking-wider font-extrabold">TECNOLOGIA LIMPA</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-6 left-6 right-6 text-left space-y-3">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((st) => (
                <div key={st} className="h-1.5 w-2 rounded-full bg-amber-500" />
              ))}
            </div>
            <span className="font-serif text-lg font-bold text-white block">Sustentabilidade Lucrativa</span>
            <p className="text-stone-300 font-sans text-[11px] leading-relaxed">
              O sistema solar de alta eficiência se paga no curto prazo, revertendo em até 25 anos de energia grátis e limpa com alta taxa de retorno financeiro.
            </p>
          </div>
        </div>

      </div>

      {/* Action footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 gap-4 z-10">
        <div className="flex flex-wrap gap-2 text-[9px] font-mono text-white/50 uppercase font-bold">
          <span className="bg-white/5 px-2 py-1 rounded">ESTUDO DE PAYBACK</span>
          <span className="bg-white/5 px-2 py-1 rounded">MÉTRICA DE TELHADO</span>
          <span className="bg-white/5 px-2 py-1 rounded">BLOOMBERG TIER 1</span>
        </div>

        <button
          onClick={navigateToPortfolio}
          className="w-full sm:w-auto px-5 py-2.5 rounded bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-mono text-[10px] font-black uppercase tracking-wider transition duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-[0_4px_12px_rgba(245,158,11,0.2)] group"
        >
          <span>Acessar Simulador EcoPower</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
