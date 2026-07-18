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
      className="relative min-h-[550px] w-full bg-gradient-to-br from-sky-50 via-white to-emerald-50/50 rounded-2xl border border-emerald-100 hover:border-emerald-300/80 transition-all overflow-hidden flex flex-col justify-between p-8 group text-left shadow-lg shadow-emerald-500/5"
      id="project-solar-energy"
    >
      {/* Product & Breadcrumb Schemas for Google Search indexing */}
      <ProductSchema 
        id="solar-energy-showcase"
        details={{
          name: "EcoPower Solar - Landing Page de Engenharia Fotovoltaica",
          description: "Plataforma de captação de clientes de energia solar com simulador de custos de investimento, payback estimado regionalmente e pré-auditoria técnica de viabilidade de telhado.",
          image: "https://solarprime.com.br/wp-content/uploads/2022/12/post_thumbnail-4cba05d81e1e8b18b6836ba70bd4d251.jpeg.webp"
        }}
      />
      
      <div className="mb-6 self-start">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "EcoPower Solar", path: "/#project-solar-energy" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-emerald-100 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs text-slate-500 tracking-wider uppercase">
            CASO DE SUCESSO 15 // ECOPOWER ENERGY
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 bg-sky-100/80 px-3 py-1 rounded-full border border-sky-200/50 font-mono text-[9px] text-blue-700 uppercase font-bold">
          ESTILO CLEAN VERDE, AMARELO & AZUL
        </div>
      </div>

      {/* Main content split */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left info description */}
        <div className="space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-emerald-100 border border-emerald-200 text-emerald-800 font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Sparkles className="h-3.5 w-3.5 text-yellow-500 animate-spin" style={{ animationDuration: "12s" }} />
            <span>SOLUÇÃO FOTOVOLTAICA INTELIGENTE</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black text-slate-900 leading-tight">
            EcoPower Solar: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Calculadora de Economia</span> & Viabilidade
          </h3>

          <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
            Landing page de alta conversão estruturada com cálculos reais de tarifas energéticas regionais. Reduza até 95% do seu consumo por meio de um dimensionamento preliminar de engenharia com estimativas de retorno do investimento e pré-diagnóstico de viabilidade do telhado.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-slate-500 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5 text-slate-700">
              <Sun className="h-4 w-4 text-yellow-500" />
              <span>Calculadora Tarifária</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-700">
              <Sliders className="h-4 w-4 text-emerald-600" />
              <span>Diagnóstico de Telhado</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-700">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span>Payback em Tempo Real</span>
            </div>
            <div className="flex items-center space-x-1.5 text-slate-700">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Segurança & Homologação</span>
            </div>
          </div>
        </div>

        {/* Right: Beautiful Premium Image Showcase */}
        <div className="relative w-full lg:w-[380px] aspect-[10/14] bg-sky-50 rounded-2xl border border-sky-100 overflow-hidden shadow-xl flex items-center justify-center group-hover:border-emerald-300/80 transition-all duration-500">
          <img 
            src="https://solarprime.com.br/wp-content/uploads/2022/12/post_thumbnail-4cba05d81e1e8b18b6836ba70bd4d251.jpeg.webp" 
            alt="Painéis solares fotovoltaicos sendo instalados no telhado de uma residência" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          
          {/* Logo HUD Overlay */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 border border-slate-200/80 rounded-xl flex items-center space-x-2.5 z-20 shadow-sm">
            <div className="h-7 w-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
              <Sun className="h-3.5 w-3.5 text-yellow-300 animate-spin" style={{ animationDuration: "30s" }} />
            </div>
            <div className="text-left">
              <span className="font-sans font-black text-[10px] text-slate-800 tracking-widest block uppercase">ECOPOWER SOLAR</span>
              <span className="font-mono text-[8px] text-emerald-600 block uppercase tracking-wider font-extrabold">TECNOLOGIA LIMPA</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-left space-y-3">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((st) => (
                <div key={st} className="h-1.5 w-2 rounded-full bg-yellow-400" />
              ))}
            </div>
            <span className="font-serif text-lg font-bold text-white block">Sustentabilidade Lucrativa</span>
            <p className="text-slate-200 font-sans text-[11px] leading-relaxed">
              O sistema solar de alta eficiência se paga no curto prazo, revertendo em até 25 anos de energia grátis e limpa com alta taxa de retorno financeiro.
            </p>
          </div>
        </div>

      </div>

      {/* Action footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-emerald-100 pt-6 gap-4 z-10">
        <div className="flex flex-wrap gap-2 text-[9px] font-mono text-slate-500 uppercase font-bold">
          <span className="bg-emerald-50 border border-emerald-100/55 px-2 py-1 rounded text-emerald-700">ESTUDO DE PAYBACK</span>
          <span className="bg-sky-50 border border-sky-100/55 px-2 py-1 rounded text-blue-700">MÉTRICA DE TELHADO</span>
          <span className="bg-yellow-50 border border-yellow-100/55 px-2 py-1 rounded text-yellow-700">BLOOMBERG TIER 1</span>
        </div>

        <button
          onClick={navigateToPortfolio}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-mono text-[10px] font-black uppercase tracking-wider transition duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-md shadow-emerald-600/10 group"
        >
          <span>Acessar Simulador EcoPower</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
