import React from "react";
import {
  MOCK_EVENTS,
  MOCK_OPERATORS,
  MOCK_SETTLEMENTS
} from "../../data/nexoTicketsData";
import {
  Users,
  Calendar,
  Ticket,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Clock,
  Download,
  ShieldCheck,
  Building2,
  ChevronRight
} from "lucide-react";

export const OperatorDashboard: React.FC = () => {
  const operator = MOCK_OPERATORS[0]; // Sunset Eventos Ltda.
  const operatorEvents = MOCK_EVENTS.filter((e) => e.organizerName === operator.name);
  const operatorSettlements = MOCK_SETTLEMENTS.filter((s) => s.beneficiaryName === operator.name);

  return (
    <div className="bg-[#0D0B14] text-white min-h-screen p-4 sm:p-8 space-y-8 font-sans max-w-7xl mx-auto">
      {/* Operator Welcome Header */}
      <div className="bg-gradient-to-r from-[#25164F] via-[#12101B] to-[#25164F] border border-[#F0448B]/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-[#F0448B] rounded-2xl text-white shadow-xl">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-[#F0448B] font-black uppercase tracking-wider block">
                PAINEL EXCLUSIVO DO OPERADOR
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1FA971]/20 text-[#1FA971] border border-[#1FA971]/40">
                SUBCONTA VERIFICADA
              </span>
            </div>
            <h1 className="text-2xl font-black text-white">Olá, equipe {operator.name}</h1>
            <p className="text-xs text-gray-300">CNPJ: {operator.cnpj} • Identificador: {operator.receiverId}</p>
          </div>
        </div>

        <button
          onClick={() => alert("Relatório Financeiro do Operador Exportado em PDF!")}
          className="px-4 py-2.5 bg-[#F0448B] hover:bg-[#F0448B]/90 text-white font-bold text-xs rounded-xl transition-all shadow-lg flex items-center space-x-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Relatório do Operador</span>
        </button>
      </div>

      {/* Operator Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-1">
          <span className="text-gray-400 text-[10px] uppercase font-bold block">Vendas no Mês</span>
          <span className="text-2xl font-black text-white">R$ 184.620,00</span>
          <span className="text-[10px] text-gray-400">Total bruto transacionado nos seus eventos</span>
        </div>

        <div className="p-5 bg-[#F0448B]/10 border border-[#F0448B]/30 rounded-2xl space-y-1">
          <span className="text-[#F0448B] text-[10px] uppercase font-bold block">Valor Líquido Destinado (80%)</span>
          <span className="text-2xl font-black text-white">R$ 142.874,40</span>
          <span className="text-[10px] text-gray-300">Apuração líquida após split de taxas</span>
        </div>

        <div className="p-5 bg-[#1FA971]/10 border border-[#1FA971]/30 rounded-2xl space-y-1">
          <span className="text-[#1FA971] text-[10px] uppercase font-bold block">Liquidado na Sua Conta</span>
          <span className="text-2xl font-black text-white">R$ 103.954,40</span>
          <span className="text-[10px] text-gray-300">A receber pendente: R$ 38.920,00</span>
        </div>
      </div>

      {/* Operator Events List */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4 shadow-xl">
        <h3 className="text-lg font-black text-white border-b border-white/10 pb-3">Seus Eventos Ativos</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {operatorEvents.map((evt) => (
            <div key={evt.id} className="p-4 bg-black/40 border border-white/10 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#F0448B] uppercase">{evt.category}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1FA971]/20 text-[#1FA971]">
                  SPLIT 80% OPERADOR
                </span>
              </div>

              <h4 className="font-extrabold text-white text-base">{evt.title}</h4>
              <p className="text-xs text-gray-300">{evt.displayDate} — {evt.location}</p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-gray-400 block text-[10px]">Ingressos Vendidos</span>
                  <strong className="text-white">374 / 500</strong>
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px]">Líquido Apurado</span>
                  <strong className="text-[#F2B84B]">R$ 133.497,12</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operator Settlements History */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4 shadow-xl">
        <h3 className="text-lg font-black text-white border-b border-white/10 pb-3">Seus Repasses e Liquidações</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-2">Código</th>
                <th className="py-3 px-2">Evento</th>
                <th className="py-3 px-2 text-right">Valor Líquido (R$)</th>
                <th className="py-3 px-2">Data Prevista</th>
                <th className="py-3 px-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {operatorSettlements.map((s) => (
                <tr key={s.id} className="hover:bg-white/5">
                  <td className="py-3 px-2 font-bold text-[#F0448B]">{s.code}</td>
                  <td className="py-3 px-2 text-white font-sans">{s.eventName}</td>
                  <td className="py-3 px-2 text-right font-bold text-white">R$ {s.amount.toFixed(2)}</td>
                  <td className="py-3 px-2 text-gray-300">{s.scheduledDate}</td>
                  <td className="py-3 px-2 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.status === "Liquidada" ? "bg-[#1FA971] text-white" : "bg-[#F2B84B] text-[#12101B]"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
