import React, { useRef } from "react";
import { Shield, Sparkles, ArrowRight, Award, GitBranch, QrCode, CheckCircle2, Dog as DogIcon } from "lucide-react";
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";
import FounderSealBadge from "./kennelLegacy/FounderSealBadge";

export default function KennelLegacySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/kennel-legacy");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#0B0D10] rounded-xl border border-[#2A323C] hover:border-[#C8A45D]/70 transition-all overflow-hidden flex flex-col justify-between p-8 group text-left shadow-2xl"
      id="project-kennel-legacy"
    >
      <ProductSchema
        id="kennel-legacy-showcase"
        details={{
          name: "Kennel Legacy - Plataforma Web para Criadores de Cães e Canis",
          description: "Plataforma web completa para gestão, linhagem e identidade de criadores de cães e canis responsáveis. Inclui selo de Criador Fundador nº 027, árvore genealógica de 5 gerações, perfil público, QR Code e gerador automático de card de linhagem.",
          image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80"
        }}
      />

      <div className="mb-6 self-start">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "Kennel Legacy", path: "/#project-kennel-legacy" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/15 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-[#C8A45D] animate-pulse" />
          <span className="font-mono text-xs text-white/60 tracking-wider uppercase">
            CASO DE SUCESSO 31 // CÃES, PEDIGREE E CANIS
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 bg-black/60 px-3 py-1 rounded-full border border-[#C8A45D]/30 font-mono text-[9px] text-[#E2C77D] uppercase font-bold">
          ESTILO DARK PREMIUM & GOLD PEDIGREE
        </div>
      </div>

      {/* Main content split */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        {/* Left info description */}
        <div className="space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#C8A45D]/20 border border-[#C8A45D]/40 text-[#E2C77D] font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Sparkles className="h-3 w-3 text-[#C8A45D]" />
            <span>GESTAO, LINHAGEM E IDENTIDADE</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black text-white leading-tight">
            Kennel Legacy: <span className="text-[#C8A45D]">Tradição e Valorização</span> da Criação Responsável
          </h3>

          <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
            Plataforma web de alto padrão desenvolvida para criadores de cães e canis. Oferece perfis públicos de canil e cão, selo exclusivo de Criador Fundador nº 027, árvore genealógica de até 5 gerações, QR Codes e gerador automático de card de linhagem.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/70 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <Award className="h-4 w-4 text-[#C8A45D]" />
              <span>Criador Fundador nº 027</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <GitBranch className="h-4 w-4 text-[#2FB879]" />
              <span>Linhagem de 5 Gerações</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <QrCode className="h-4 w-4 text-[#4D8FD8]" />
              <span>QR Code & Links Públicos</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#C8A45D]" />
              <span>Laudos e Pedigree CBKC</span>
            </div>
          </div>
        </div>

        {/* Right: Premium Image Showcase */}
        <div className="relative w-full lg:w-[380px] aspect-[10/14] bg-[#12161B] rounded-xl border border-white/20 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-[#C8A45D]/60 transition-all duration-500">
          <img
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80"
            alt="Kennel Legacy Canil Vale Imperial"
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />

          {/* Logo HUD Overlay */}
          <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md px-3.5 py-2 border border-[#C8A45D]/40 rounded-lg flex items-center space-x-2.5 z-20">
            <div className="h-7 w-7 rounded-xl bg-[#12161B] border border-[#C8A45D] flex items-center justify-center text-[#E2C77D] font-black shadow-inner">
              <Shield className="h-3.5 w-3.5" />
            </div>
            <div className="text-left">
              <span className="font-serif font-black text-xs text-white tracking-widest block uppercase">KENNEL LEGACY</span>
              <span className="font-mono text-[8px] text-[#C8A45D] block uppercase tracking-wider font-extrabold">CANIL VALE IMPERIAL</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

          <div className="absolute bottom-6 left-6 right-6 text-left space-y-3 z-20">
            <FounderSealBadge variant="compact" sealNumber="027" />
            <span className="font-serif text-lg font-bold text-white block">Thor do Vale Imperial</span>
            <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
              Exclusividade, pedigree e gestão completa de linhagem canina.
            </p>
          </div>
        </div>
      </div>

      {/* Action footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/15 pt-6 gap-4 z-10">
        <div className="flex flex-wrap gap-2 text-[9px] font-mono text-white/60 uppercase font-bold">
          <span className="bg-white/10 px-2 py-1 rounded">ÁRVORE GENEALÓGICA 5 GEN</span>
          <span className="bg-white/10 px-2 py-1 rounded">SELO FUNDADOR #027</span>
          <span className="bg-white/10 px-2 py-1 rounded">PERFIL PÚBLICO & QR</span>
        </div>

        <button
          onClick={navigateToPortfolio}
          className="w-full sm:w-auto px-5 py-2.5 rounded bg-gradient-to-r from-[#C8A45D] to-[#2FB879] hover:from-[#2FB879] hover:to-[#C8A45D] text-black font-mono text-[10px] font-black uppercase tracking-wider transition duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-[0_4px_12px_rgba(200,164,93,0.4)] group"
        >
          <span>Acessar Protótipo Kennel Legacy</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
