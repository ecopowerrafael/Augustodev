import React, { useState } from 'react';
import { Kanban, Filter, Plus, Clock, MessageSquare, AlertTriangle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { ContentItem, ContentStatus, Client } from '../../types/contentflow';

interface KanbanViewProps {
  contents: ContentItem[];
  clients: Client[];
  onOpenContentDetail: (item: ContentItem) => void;
  onOpenNewModal: () => void;
  onMoveStatus: (id: string, newStatus: ContentStatus) => void;
  isDarkMode: boolean;
}

export const KanbanView: React.FC<KanbanViewProps> = ({
  contents,
  clients,
  onOpenContentDetail,
  onOpenNewModal,
  onMoveStatus,
  isDarkMode,
}) => {
  const [filterClient, setFilterClient] = useState('');

  const filtered = contents.filter(c => !filterClient || c.clientId === filterClient);

  const columns: { id: ContentStatus; label: string; color: string }[] = [
    { id: 'idea', label: 'Banco de Ideias', color: 'border-t-amber-500' },
    { id: 'in_production', label: 'Em Produção', color: 'border-t-blue-500' },
    { id: 'review', label: 'Revisão Interna', color: 'border-t-purple-500' },
    { id: 'approval', label: 'Em Aprovação', color: 'border-t-pink-500' },
    { id: 'published', label: 'Publicado', color: 'border-t-emerald-500' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold flex items-center space-x-2">
            <Kanban className="w-5 h-5 text-[#6C4FF8]" />
            <span>Kanban Editorial de Conteúdos</span>
          </h1>
          <p className="text-xs text-stone-500">Acompanhe o fluxo de produção desde a ideia até a aprovação e publicação final.</p>
        </div>

        <button
          onClick={onOpenNewModal}
          className="px-4 py-2.5 rounded-xl bg-[#6C4FF8] hover:bg-[#5a3ee3] text-white text-xs font-bold shadow-md flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Novo Conteúdo</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className={`p-4 rounded-2xl border flex items-center space-x-4 text-xs ${
        isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
      }`}>
        <Filter className="w-4 h-4 text-stone-400" />
        <span className="font-bold text-stone-500 uppercase">Filtrar Cliente:</span>
        <select
          value={filterClient}
          onChange={(e) => setFilterClient(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 font-medium"
        >
          <option value="">Todos os Clientes</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>{c.brandName}</option>
          ))}
        </select>
      </div>

      {/* Kanban Board Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-6">
        {columns.map((col) => {
          const colItems = filtered.filter(item => item.status === col.id);

          return (
            <div
              key={col.id}
              className={`rounded-3xl border-2 border-t-4 ${col.color} p-4 space-y-3 min-w-[260px] flex flex-col justify-between ${
                isDarkMode ? 'bg-stone-900/60 border-stone-800' : 'bg-stone-50/80 border-stone-200'
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
                <span className="font-bold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300">{col.label}</span>
                <span className="px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-[10px] font-extrabold text-stone-600 dark:text-stone-400">
                  {colItems.length}
                </span>
              </div>

              {/* Column Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[calc(100vh-280px)]">
                {colItems.length === 0 ? (
                  <div className="p-6 text-center text-[11px] text-stone-400 border border-dashed rounded-2xl">
                    Nenhum conteúdo nesta coluna
                  </div>
                ) : (
                  colItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onOpenContentDetail(item)}
                      className={`p-4 rounded-2xl border shadow-sm space-y-3 cursor-pointer hover:scale-[1.02] hover:border-purple-400 transition-all ${
                        isDarkMode ? 'bg-stone-800/90 border-stone-700' : 'bg-white border-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="text-purple-600 dark:text-purple-400 font-mono">
                          {item.channel} • {item.format}
                        </span>
                        <span className="text-stone-400">{item.deadlineDate}</span>
                      </div>

                      <p className="font-bold text-xs text-stone-900 dark:text-white leading-snug line-clamp-2">{item.title}</p>

                      <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-700 text-[10px]">
                        <div className="flex items-center space-x-1.5">
                          <img src={item.clientLogo} alt={item.clientName} className="w-4 h-4 rounded object-cover" />
                          <span className="font-semibold text-stone-600 dark:text-stone-300 truncate max-w-[100px]">
                            {item.clientName}
                          </span>
                        </div>

                        <img src={item.assigneeAvatar} alt={item.assigneeName} className="w-5 h-5 rounded-full object-cover" title={item.assigneeName} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
