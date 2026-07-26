import React from "react";
import { GMGLogo } from "./gmgCheck/GMGLogo";
import { Zap, ShieldCheck, QrCode, FileText, Wifi, ArrowRight, CheckCircle2 } from "lucide-react";

interface GMGCheckSectionProps {
  onOpenApp: () => void;
}

export const GMGCheckSection: React.FC<GMGCheckSectionProps> = ({ onOpenApp }) => {
  return (
    <section id="gmg-check" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-[#10263F] via-[#10263F] to-[#1769AA] rounded-3xl p-8 md:p-12 text-white border border-[#F4B400]/40 shadow-2xl relative overflow-hidden group">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4B400]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1769AA]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#18A66A]/20 text-[#18A66A] border border-[#18A66A]/40 uppercase tracking-wider flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CASE 32 • VISTORIAS TÉCNICAS DE GERADORES</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F4B400]/20 text-[#F4B400] border border-[#F4B400]/40">
                PWA OFFLINE-FIRST
              </span>
            </div>

            <div className="space-y-2">
              <GMGLogo variant="dark" className="scale-105 origin-left" />
              <p className="text-[#F4B400] font-mono text-sm font-semibold pt-1">
                Vistorias técnicas com controle, evidências e rastreabilidade total.
              </p>
            </div>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Plataforma completa para digitalização de rotinas de inspeção em Grupos Geradores de Energia (GMG). Elimine pranchetas em papel com checklists guiados, registro fotográfico de evidências, medições elétricas/mecânicas, gestão de Não Conformidades (NC), assinaturas digitais na tela e geração instantânea de relatórios PDF com validade técnica.
            </p>

            {/* Key Capabilities List */}
            <div className="grid grid-cols-2 gap-3 text-xs text-gray-200">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#18A66A]" />
                <span>Checklist Interativo (28+ itens)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#18A66A]" />
                <span>Evidências Fotográficas & Câmera</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#18A66A]" />
                <span>Central de Não Conformidades</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#18A66A]" />
                <span>Modo Offline com Auto-Sincronia</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#18A66A]" />
                <span>Assinatura Digital Técnico & Cliente</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#18A66A]" />
                <span>Relatórios em PDF Oficial</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={onOpenApp}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F4B400] to-[#E5A300] text-[#10263F] font-black text-sm hover:brightness-110 transition-all flex items-center space-x-2 shadow-2xl shadow-[#F4B400]/20 group/btn"
              >
                <span>Acessar Protótipo do GMG Check</span>
                <ArrowRight className="w-4 h-4 text-[#10263F] group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Visual Card Mockup */}
          <div className="lg:col-span-5 bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs text-gray-400 font-mono">VIS-2026-0148</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#18A66A] text-white">
                CONCLUÍDA
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-[#F4B400] font-mono font-bold">DATA CENTER ALPHA</span>
              <h4 className="font-bold text-white text-base">GMG-003 — Stemac S500</h4>
              <p className="text-xs text-gray-300">Responsável: Carlos Henrique (Técnico)</p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                <span className="text-[#18A66A] font-bold block">24 OK</span>
                <span className="text-[9px] text-gray-400">Aprovados</span>
              </div>
              <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                <span className="text-[#D64545] font-bold block">2 NOK</span>
                <span className="text-[9px] text-gray-400">Não Conf.</span>
              </div>
              <div className="p-2 bg-white/5 rounded-xl border border-white/10">
                <span className="text-gray-300 font-bold block">2 N/A</span>
                <span className="text-[9px] text-gray-400">N/A</span>
              </div>
            </div>

            <div className="p-3 bg-[#1769AA]/20 border border-[#1769AA]/40 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#F4B400]" />
                <span className="font-medium text-white">Relatório PDF Técnico Gerado</span>
              </div>
              <span className="text-[10px] text-[#F4B400] font-bold">100% VÁLIDO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
