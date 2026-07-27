import React, { useState } from 'react';
import { Lightbulb, Plus, Star, ArrowRight, MessageSquare, Tag, Filter, Search, Sparkles } from 'lucide-react';
import { Idea, Client } from '../../types/contentflow';

interface IdeasBankViewProps {
  ideas: Idea[];
  clients: Client[];
  onOpenNewModal: () => void;
  onPromoteToProduction: (idea: Idea) => void;
  isDarkMode: boolean;
}

export const IdeasBankView: React.FC<IdeasBankViewProps> = ({
  ideas,
  clients,
  onOpenNewModal,
  onPromoteToProduction,
  isDarkMode,
}) => {
  const [filterClient, setFilterClient] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  const filtered = ideas.filter(i => !filterClient || i.clientId === filterClient);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>Banco de Ideias ({ideas.length})</span>
          </h1>
          <p className="text-xs text-stone-500">Registre inspirações rapidamente e transforme as melhores em publicações no Kanban.</p>
        </div>

        <button
          onClick={onOpenNewModal}
          className="px-4 py-2.5 rounded-xl bg-[#6C4FF8] hover:bg-[#5a3ee3] text-white text-xs font-bold shadow-md flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nova Ideia</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
      }`}>
        <div className="flex items-center space-x-3 text-xs">
          <Filter className="w-4 h-4 text-stone-400" />
          <span className="font-bold text-stone-500 uppercase">Filtrar por Cliente:</span>
          <select
            value={filterClient}
            onChange={(e) => setFilterClient(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-medium"
          >
            <option value="">Todos os Clientes</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.brandName}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${viewMode === 'cards' ? 'bg-[#6C4FF8] text-white' : 'text-stone-400'}`}
          >
            Cards
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-[#6C4FF8] text-white' : 'text-stone-400'}`}
          >
            Lista
          </button>
        </div>
      </div>

      {/* Cards View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((idea) => (
          <div
            key={idea.id}
            className={`p-6 rounded-3xl border space-y-4 flex flex-col justify-between transition-all hover:border-amber-400 ${
              isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 text-[10px] font-extrabold uppercase">
                  {idea.theme}
                </span>
                <Star className={`w-4 h-4 ${idea.isFavorite ? 'text-amber-500 fill-amber-500' : 'text-stone-300'}`} />
              </div>

              <div>
                <h3 className="font-bold text-sm text-stone-900 dark:text-white leading-snug">{idea.title}</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-3 leading-relaxed font-serif">{idea.description}</p>
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {idea.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded text-[9px] font-mono bg-stone-100 dark:bg-stone-800 text-stone-500">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
                <span>Cliente: <strong>{idea.clientName}</strong></span>
                <span>{idea.channel} • {idea.format}</span>
              </div>

              <button
                onClick={() => onPromoteToProduction(idea)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Promover para Produção</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
