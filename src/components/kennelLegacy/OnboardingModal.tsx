import React, { useState } from "react";
import { X, Check, ArrowRight, Sparkles, Shield, Award, QrCode, CheckCircle2 } from "lucide-react";
import FounderSealBadge from "./FounderSealBadge";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState<number>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#12161B] border border-[#C8A45D]/50 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 text-left shadow-2xl relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2A323C] pb-4">
          <div>
            <span className="text-[10px] font-mono text-[#C8A45D] uppercase font-bold tracking-widest block">
              CONFIGURAÇÃO INICIAL DO LEGADO // ETAPA {step} DE 4
            </span>
            <h3 className="font-serif text-xl font-bold text-white">
              {step === 1 && "Etapa 1 — Dados do Criador Responsável"}
              {step === 2 && "Etapa 2 — Identidade do Canil"}
              {step === 3 && "Etapa 3 — Primeiro Cão do Canil"}
              {step === 4 && "Etapa 4 — Perfil do Canil Publicado!"}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#171C22]">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step 1: Breeder info */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">Informe suas credenciais como fundador do canil.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Nome Completo</label>
                <input type="text" defaultValue="Rafael Augusto" className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">Telefone WhatsApp</label>
                <input type="text" defaultValue="(11) 98765-4321" className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">Cidade / Estado</label>
                <input type="text" defaultValue="Ibiúna / SP" className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">E-mail Profissional</label>
                <input type="text" defaultValue="fundador@kennellegacy.com.br" className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Kennel info */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">Cadastre a marca e dados oficiais do seu canil.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Nome do Canil</label>
                <input type="text" defaultValue="Canil Vale Imperial" className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">Prefixo / Afixo</label>
                <input type="text" defaultValue="do Vale Imperial" className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">Ano de Fundação</label>
                <input type="text" defaultValue="2014" className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">Raça Principal</label>
                <input type="text" defaultValue="Rottweiler" className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: First Dog */}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">Cadastre o cão principal do seu plantel.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Nome de Registro</label>
                <input type="text" defaultValue="Thor do Vale Imperial" className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">Registro Pedigree</label>
                <input type="text" defaultValue="CBKC/RG/SP/102845" className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white" />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Published Profile */}
        {step === 4 && (
          <div className="space-y-6 text-center py-2">
            <div className="h-16 w-16 bg-[#2FB879]/20 border-2 border-[#2FB879] rounded-full flex items-center justify-center mx-auto text-[#2FB879]">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <h4 className="font-serif text-2xl font-black text-white">Seu perfil inicial está pronto!</h4>
              <p className="text-xs text-slate-300 mt-1">Sua conta de criador fundador foi atribuída com sucesso.</p>
            </div>

            <FounderSealBadge sealNumber="027" variant="card" />

            <div className="bg-[#0B0D10] p-4 rounded-xl border border-[#2A323C] flex items-center justify-between text-xs font-mono">
              <div className="text-left">
                <span className="text-slate-400 block text-[10px]">SEU LINK PÚBLICO:</span>
                <span className="text-[#E2C77D] font-bold">kennellegacy.com/canil/vale-imperial</span>
              </div>
              <span className="px-2 py-1 bg-[#2FB879]/20 text-[#2FB879] rounded text-[10px] font-bold">ATIVO</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-[#2A323C] pt-4">
          {step > 1 && step < 4 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-[#171C22] text-slate-300 hover:text-white rounded-lg text-xs font-mono font-bold"
            >
              Voltar
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="ml-auto px-5 py-2.5 bg-[#C8A45D] hover:bg-[#E2C77D] text-black text-xs font-mono font-bold uppercase tracking-wider rounded-lg flex items-center space-x-2"
            >
              <span>Avançar Etapa</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                onComplete();
                onClose();
              }}
              className="w-full py-3 bg-[#2FB879] hover:bg-emerald-400 text-black text-xs font-mono font-bold uppercase tracking-wider rounded-xl shadow-lg"
            >
              Acessar Painel Principal do Criador
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
