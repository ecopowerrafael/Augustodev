import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Cpu, ShieldCheck, FileSpreadsheet, ArrowRight, Sparkles, Layers, FileDown, Flame } from "lucide-react";

// SEO Framework components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";

export default function LaserCutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/laser-cut-saas");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#040814] rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all overflow-hidden flex flex-col justify-between p-8 group text-left"
      id="project-laser-cut"
    >
      {/* Product & Breadcrumb Schemas for Google Search indexing */}
      <ProductSchema 
        id="laser-cut-saas-showcase"
        details={{
          name: "LaserCut SaaS - MVP de Orçamento Automático de Corte a Laser",
          description: "Sistema SaaS voltado à indústria metalmecânica. O software automatizará orçamentos de corte a laser de chapas planas, extraindo variáveis geométricas de arquivos vetoriais DXF e cruzando-as com tabelas de custos Excel via Row Level Security.",
          image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
        }}
      />
      
      <div className="mb-6 self-start">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "LaserCut SaaS", path: "/#project-laser-cut" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-indigo-500 animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 14 // B2B INDUSTRIAL ENGINE
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/5 font-mono text-[9px] text-indigo-400 uppercase font-bold">
          ESTILO PREMIUM CYBER & INDIGO
        </div>
      </div>

      {/* Main content split */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left info description */}
        <div className="space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Sparkles className="h-3 w-3" />
            <span>ENGENHARIA E PRECIFICAÇÃO AUTOMATIZADA</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black text-white leading-tight">
            LaserCut SaaS: <span className="text-indigo-400">Orçamentos Metalúrgicos</span> em 5 Segundos
          </h3>

          <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
            Elimine o retrabalho de orçar peças metálicas manualmente. O LaserCut SaaS lê arquivos vetoriais DXF diretamente na nuvem, calcula o perímetro de corte real e piercings de entrada e gera a proposta comercial estruturada cruzando os custos por material importados de planilhas Excel.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/40 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <Cpu className="h-4 w-4 text-indigo-400" />
              <span>Leitor de DXF/DWG</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="h-4 w-4 text-indigo-400" />
              <span>Multi-Tenant com RLS</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <FileSpreadsheet className="h-4 w-4 text-indigo-400" />
              <span>Matriz Excel Direta</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <FileDown className="h-4 w-4 text-indigo-400" />
              <span>Proposta PDF Comercial</span>
            </div>
          </div>
        </div>

        {/* Right: Beautiful Premium Image Showcase */}
        <div className="relative w-full lg:w-[380px] aspect-[10/14] bg-[#070b19] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-indigo-500/30 transition-all duration-500">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80" 
            alt="Corte a Laser de Chapa Metálica Faíscas" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          
          {/* Logo HUD Overlay */}
          <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3.5 py-2 border border-white/10 rounded-lg flex items-center space-x-2.5 z-20">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-stone-900 to-[#0c0f1e] border border-indigo-400 flex items-center justify-center">
              <Flame className="h-3.5 w-3.5 text-indigo-400" />
            </div>
            <div className="text-left">
              <span className="font-sans font-black text-[10px] text-white tracking-widest block uppercase">LASERCUT SaaS</span>
              <span className="font-mono text-[8px] text-indigo-400 block uppercase tracking-wider font-extrabold">B2B MULTI-TENANT</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-6 left-6 right-6 text-left space-y-3">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((st) => (
                <div key={st} className="h-1.5 w-2 rounded-full bg-indigo-500" />
              ))}
            </div>
            <span className="font-serif text-lg font-bold text-white block">Eficiência e Escalabilidade</span>
            <p className="text-stone-300 font-sans text-[11px] leading-relaxed">
              Desenvolvido de forma moderna, com isolamento absoluto de dados entre as indústrias cadastradas por meio de Row Level Security (RLS).
            </p>
          </div>
        </div>

      </div>

      {/* Action footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 gap-4 z-10">
        <div className="flex flex-wrap gap-2 text-[9px] font-mono text-white/50 uppercase font-bold">
          <span className="bg-white/5 px-2 py-1 rounded">EXTRAÇÃO GEOMÉTRICA DXF</span>
          <span className="bg-white/5 px-2 py-1 rounded">ISOLAMENTO DE BANCO RLS</span>
          <span className="bg-white/5 px-2 py-1 rounded">BLOQUEIO SESSÃO SIMULTÂNEA</span>
        </div>

        <button
          onClick={navigateToPortfolio}
          className="w-full sm:w-auto px-5 py-2.5 rounded bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-mono text-[10px] font-black uppercase tracking-wider transition duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-[0_4px_12px_rgba(99,102,241,0.2)] group"
        >
          <span>Acessar MVP LaserCut SaaS</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
}
