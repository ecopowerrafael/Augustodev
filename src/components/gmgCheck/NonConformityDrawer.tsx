import React, { useState } from "react";
import { NonConformity } from "../../data/gmgCheckData";
import { X, AlertTriangle, Clock, CheckCircle2, UserCheck, Calendar, ArrowRight, ShieldAlert, Wrench } from "lucide-react";

interface NonConformityDrawerProps {
  nc: NonConformity | null;
  onClose: () => void;
  onUpdateStatus: (ncId: string, newStatus: NonConformity["status"], note: string) => void;
}

export const NonConformityDrawer: React.FC<NonConformityDrawerProps> = ({
  nc,
  onClose,
  onUpdateStatus,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<NonConformity["status"]>("Em análise");
  const [updateNote, setUpdateNote] = useState<string>("");

  if (!nc) return null;

  const handleApplyUpdate = () => {
    onUpdateStatus(nc.id, selectedStatus, updateNote || `Status alterado para ${selectedStatus}`);
    setUpdateNote("");
  };

  const getCriticalityBadge = (level: NonConformity["criticality"]) => {
    switch (level) {
      case "Crítica":
        return "bg-red-600 text-white font-black";
      case "Alta":
        return "bg-[#D64545] text-white font-bold";
      case "Média":
        return "bg-[#F4B400] text-black font-bold";
      default:
        return "bg-gray-200 text-gray-800 font-semibold";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#10263F] border-l border-white/10 text-white w-full max-w-xl h-full shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-black/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[#D64545]/20 border border-[#D64545] text-[#D64545]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-mono block">{nc.code}</span>
              <h3 className="font-bold text-lg text-white">{nc.itemTitle}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Metadata Cards */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <span className="text-gray-400 block mb-1">Local / Equipamento</span>
              <span className="font-bold text-white block">{nc.siteName}</span>
              <span className="text-[#F4B400] font-mono text-[11px]">{nc.equipmentTag}</span>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <span className="text-gray-400 block mb-1">Criticidade & Status</span>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-0.5 rounded text-[10px] ${getCriticalityBadge(nc.criticality)}`}>
                  {nc.criticality}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-[#1769AA] text-white font-medium">
                  {nc.status}
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#F4B400] uppercase tracking-wider">Descrição do Problema</h4>
            <div className="p-4 bg-black/40 border border-white/10 rounded-xl text-sm text-gray-200 leading-relaxed">
              {nc.description}
            </div>
          </div>

          {/* Recommended Action & Deadline */}
          <div className="p-4 bg-[#1769AA]/10 border border-[#1769AA]/30 rounded-xl space-y-2 text-xs">
            <div className="flex items-center justify-between text-[#F4B400] font-semibold">
              <span className="flex items-center space-x-1.5">
                <Wrench className="w-4 h-4" />
                <span>Ação Recomendada</span>
              </span>
              <span className="flex items-center space-x-1 text-gray-300 font-mono text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-[#F4B400]" />
                <span>Prazo: {nc.suggestedDeadline}</span>
              </span>
            </div>
            <p className="text-gray-200 text-sm">{nc.recommendedAction}</p>
          </div>

          {/* Photo Evidences */}
          {nc.photos.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Evidências Anexadas</h4>
              <div className="grid grid-cols-2 gap-2">
                {nc.photos.map((url, i) => (
                  <div key={i} className="aspect-video rounded-lg overflow-hidden border border-white/10">
                    <img src={url} alt="Evidência NC" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Histórico de Rastreabilidade</h4>
            <div className="space-y-3 relative pl-4 border-l-2 border-[#1769AA]/40 text-xs">
              {nc.timeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#F4B400] ring-4 ring-[#10263F]" />
                  <p className="font-semibold text-white">{item.action}</p>
                  <p className="text-gray-400 text-[11px]">{item.author} • {item.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Status Update Form */}
          <div className="p-4 bg-black/30 border border-white/10 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
              <UserCheck className="w-4 h-4 text-[#18A66A]" />
              <span>Atualizar Status da Não Conformidade</span>
            </h4>

            <div className="grid grid-cols-2 gap-2">
              {(["Aberta", "Em análise", "Correção programada", "Aguardando evidência", "Resolvida", "Cancelada"] as NonConformity["status"][]).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedStatus(st)}
                  className={`p-2 rounded-lg text-xs font-medium border text-left transition-all ${
                    selectedStatus === st
                      ? "bg-[#1769AA] border-[#F4B400] text-white shadow"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <textarea
              value={updateNote}
              onChange={(e) => setUpdateNote(e.target.value)}
              placeholder="Adicione um parecer técnico ou detalhes da correção efetuada..."
              rows={2}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#1769AA]"
            />

            <button
              type="button"
              onClick={handleApplyUpdate}
              className="w-full py-2.5 rounded-xl bg-[#18A66A] text-white font-bold text-xs hover:bg-[#18A66A]/90 transition-all flex items-center justify-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Salvar Novo Parecer Técnico</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
