import React from "react";
import { Award, Shield, CheckCircle2, Sparkles } from "lucide-react";

interface FounderSealBadgeProps {
  sealNumber?: string;
  variant?: "full" | "compact" | "card" | "medal" | "minimal";
  className?: string;
}

export default function FounderSealBadge({
  sealNumber = "027",
  variant = "full",
  className = ""
}: FounderSealBadgeProps) {
  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#C8A45D]/20 to-[#E2C77D]/10 border border-[#C8A45D]/40 text-[#E2C77D] font-mono text-[10px] font-bold uppercase tracking-wider ${className}`}>
        <Award className="h-3.5 w-3.5 text-[#C8A45D]" />
        <span>Fundador #{sealNumber}</span>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-[#C8A45D]/15 border border-[#C8A45D]/30 text-[#E2C77D] text-[9px] font-mono font-extrabold ${className}`}>
        <Shield className="h-3 w-3 text-[#C8A45D]" />
        <span>SELO #{sealNumber}</span>
      </div>
    );
  }

  if (variant === "medal") {
    return (
      <div className={`relative flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#1E252E] to-[#12161B] rounded-xl border border-[#C8A45D]/40 shadow-xl text-center group ${className}`}>
        {/* Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#C8A45D]/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-[#E2C77D] via-[#C8A45D] to-[#8C6D31] p-0.5 flex items-center justify-center shadow-lg mb-2">
          <div className="h-full w-full rounded-full bg-[#12161B] flex items-center justify-center">
            <Award className="h-6 w-6 text-[#E2C77D]" />
          </div>
        </div>
        
        <span className="font-mono text-[10px] text-[#C8A45D] uppercase tracking-widest font-black block">CRIADOR FUNDADOR</span>
        <span className="font-serif text-lg font-bold text-white block">Nº {sealNumber}</span>
        <span className="text-[10px] text-slate-400 font-sans block mt-0.5">Membro Verificado nº {sealNumber}</span>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={`flex items-center space-x-3 p-3 bg-gradient-to-r from-[#171C22] via-[#1A212B] to-[#171C22] rounded-lg border border-[#C8A45D]/40 text-left ${className}`}>
        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#E2C77D] to-[#9C7838] p-0.5 flex items-center justify-center shrink-0 shadow-md">
          <div className="h-full w-full bg-[#12161B] rounded-[7px] flex items-center justify-center">
            <Award className="h-5 w-5 text-[#E2C77D]" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1 text-[#E2C77D] text-[10px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            <span>Selo de Autenticidade</span>
          </div>
          <h4 className="font-serif text-sm font-bold text-white truncate">
            Criador Fundador nº {sealNumber}
          </h4>
          <p className="text-[10px] text-slate-400 font-sans">
            Membro fundador da plataforma Kennel Legacy
          </p>
        </div>
      </div>
    );
  }

  // Full default variant
  return (
    <div className={`relative overflow-hidden p-4 rounded-xl bg-gradient-to-br from-[#171C22] via-[#1C232D] to-[#12161B] border border-[#C8A45D]/50 shadow-2xl flex items-center justify-between gap-4 ${className}`}>
      <div className="flex items-center space-x-3.5 z-10">
        <div className="relative h-12 w-12 rounded-xl bg-gradient-to-tr from-[#C8A45D] via-[#E2C77D] to-[#8C6D31] p-0.5 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(200,164,93,0.3)]">
          <div className="h-full w-full bg-[#0B0D10] rounded-[10px] flex items-center justify-center">
            <Award className="h-6 w-6 text-[#E2C77D]" />
          </div>
        </div>
        <div className="text-left">
          <div className="flex items-center space-x-1.5">
            <span className="font-mono text-[10px] text-[#C8A45D] uppercase tracking-widest font-black">
              CADASTRO CERTIFICADO
            </span>
            <CheckCircle2 className="h-3.5 w-3.5 text-[#2FB879]" />
          </div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
            Criador Fundador nº {sealNumber}
          </h3>
          <p className="text-xs text-slate-300 font-sans">
            Reconhecimento oficial de criador pioneiro da plataforma.
          </p>
        </div>
      </div>

      <div className="hidden sm:flex flex-col items-end shrink-0 z-10 font-mono text-right">
        <span className="text-[10px] text-slate-400 uppercase font-semibold">EDITION</span>
        <span className="text-xs font-bold text-[#E2C77D] bg-[#C8A45D]/10 px-2 py-0.5 rounded border border-[#C8A45D]/30">
          LIMITED #027
        </span>
      </div>
    </div>
  );
}
