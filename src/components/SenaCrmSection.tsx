import React from "react";
import {
  Building2,
  KeyRound,
  Trees,
  DollarSign,
  Users,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

interface SenaCrmSectionProps {
  onOpenPrototype: () => void;
}

export const SenaCrmSection: React.FC<SenaCrmSectionProps> = ({ onOpenPrototype }) => {
  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden text-left">
      {/* Background glow accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-8">
        {/* Top Header Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-amber-400 uppercase tracking-widest">
                  PORTFÓLIO // CASE 45
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                  PROTÓTIPO FUNCIONAL NAVEGÁVEL
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                CRM Imobiliário SENA 2026
              </h2>
            </div>
          </div>

          <button
            onClick={onOpenPrototype}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 flex items-center gap-2 self-start sm:self-auto transition-all cursor-pointer hover:scale-105"
          >
            <span>Navegar no Protótipo Completo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Subtitle & Value Proposition */}
        <p className="text-slate-300 text-sm sm:text-base max-w-4xl leading-relaxed">
          Plataforma imobiliária 360° desenhada para imobiliárias e loteadoras de alto padrão. Unifica{" "}
          <strong className="text-white">vendas avulsas</strong>,{" "}
          <strong className="text-white">administração de locações com split financeiro automático</strong> e{" "}
          <strong className="text-white">lançamentos de loteamentos com espelho de vendas interativo</strong> e simulador de parcelamento direto.
        </p>

        {/* Key Operational Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <TrendingUp className="w-4 h-4" />
              <span>Vendas & Funil 7 Etapas</span>
            </div>
            <p className="text-xs text-slate-400">
              Kanban com transição de status, matching inteligente de perfil de interesse com acervo e histórico de propostas e contrapropostas.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
              <KeyRound className="w-4 h-4" />
              <span>Locações & Repasses Líquidos</span>
            </div>
            <p className="text-xs text-slate-400">
              Gestão de contratos com cálculo em tempo real: Aluguel Bruto − Taxa Adm (8-10%) − Despesas = Repasse ao Proprietário.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Trees className="w-4 h-4" />
              <span>Loteamentos & Espelho de Lotes</span>
            </div>
            <p className="text-xs text-slate-400">
              Visualizador interativo por quadra e lote com status em tempo real e simulador de financiamento direto até 180x + IPCA.
            </p>
          </div>
        </div>

        {/* Live Interactive Snapshot Bar */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">VGV Carteira</span>
              <span className="text-sm font-black text-amber-400">R$ 54.200.000</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Locações Ativas</span>
              <span className="text-sm font-black text-teal-400">R$ 21.000/mês</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Split de Comissão</span>
              <span className="text-sm font-black text-white">40% Imob • 25% Capt • 25% Atend</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Loteamentos</span>
              <span className="text-sm font-black text-emerald-400">Reserva Imperial (100% loteado)</span>
            </div>
          </div>

          <button
            onClick={onOpenPrototype}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Ver Demonstração Interativa</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
