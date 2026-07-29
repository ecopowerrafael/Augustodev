import React from 'react';
import { 
  Building2, 
  BarChart3, 
  ShieldCheck, 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  TrendingUp,
  FileText
} from 'lucide-react';

interface VektorSectionProps {
  onOpenPrototype: () => void;
}

export const VektorSection: React.FC<VektorSectionProps> = ({ onOpenPrototype }) => {
  return (
    <div className="bg-[#141514] border border-stone-800 hover:border-emerald-500/40 rounded-3xl p-6 sm:p-10 space-y-8 transition duration-500 shadow-2xl relative overflow-hidden group">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Case Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-700 p-0.5 shadow-lg">
            <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center text-emerald-400 font-serif font-bold text-2xl">
              V
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-wider">Case 39</span>
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded text-[9px] font-mono font-bold uppercase">
                Protótipo Navegável
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-emerald-300 transition">
              Vektor Contabilidade & Inteligência Tributária
            </h3>
          </div>
        </div>

        <button
          onClick={onOpenPrototype}
          className="px-5 py-3 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-mono text-xs uppercase font-bold tracking-wider rounded-2xl transition shadow-xl flex items-center justify-center space-x-2 shrink-0"
        >
          <span>Acessar Protótipo Completo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Case Description */}
      <p className="text-stone-300 font-serif text-sm leading-relaxed max-w-3xl">
        Plataforma digital para escritório de contabilidade consultiva de alto padrão. Foge do padrão tradicional com calculadoras em tempo real, wizard de abertura de empresa, migração sem atrito e portal do cliente interativo.
      </p>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-2xl space-y-1">
          <Calculator className="w-5 h-5 text-emerald-400 mb-1" />
          <span className="font-bold text-white block">Simulador Tributário</span>
          <span className="text-[10px] text-stone-400">Cálculo instantâneo de Fator R e alíquotas do Simples.</span>
        </div>

        <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-2xl space-y-1">
          <Building2 className="w-5 h-5 text-emerald-400 mb-1" />
          <span className="font-bold text-white block">Wizard Abertura (R$ 0)</span>
          <span className="text-[10px] text-stone-400">Cálculo de taxas de Junta Comercial por estado.</span>
        </div>

        <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-2xl space-y-1">
          <Lock className="w-5 h-5 text-emerald-400 mb-1" />
          <span className="font-bold text-white block">Vektor Hub (Portal)</span>
          <span className="text-[10px] text-stone-400">Dashboard DRE, guias DAS e chamados ao vivo.</span>
        </div>

        <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-2xl space-y-1">
          <TrendingUp className="w-5 h-5 text-emerald-400 mb-1" />
          <span className="font-bold text-white block">Troca de Contador</span>
          <span className="text-[10px] text-stone-400">Formulário de migração guiada sem atrito.</span>
        </div>
      </div>
    </div>
  );
};
