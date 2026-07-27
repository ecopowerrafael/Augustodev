import React, { useState } from 'react';
import { 
  Building, ArrowLeft, ExternalLink, Plus, Sparkles, FileText, Lightbulb, Calendar, 
  FolderKanban, CheckCircle2, Users, Settings, Folder, CheckSquare, Clock
} from 'lucide-react';
import { Client, ContentItem, Idea, Task } from '../../types/contentflow';

interface ClientDetailViewProps {
  client: Client;
  contents: ContentItem[];
  ideas: Idea[];
  onBack: () => void;
  onOpenContentDetail: (item: ContentItem) => void;
  onOpenPortalView: () => void;
  onOpenNewModal: () => void;
  isDarkMode: boolean;
}

export const ClientDetailView: React.FC<ClientDetailViewProps> = ({
  client,
  contents,
  ideas,
  onBack,
  onOpenContentDetail,
  onOpenPortalView,
  onOpenNewModal,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'contents' | 'ideas' | 'approvals' | 'strategy' | 'team'>('overview');

  const clientContents = contents.filter(c => c.clientId === client.id);
  const clientIdeas = ideas.filter(i => i.clientId === client.id);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para Lista de Clientes</span>
      </button>

      {/* Profile Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${
        isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img src={client.logo} alt={client.brandName} className="w-16 h-16 rounded-2xl object-cover border shadow-md" />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-stone-900 dark:text-white">{client.brandName}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-extrabold uppercase">
                  Ativo
                </span>
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400 font-bold">{client.segment}</p>
              <p className="text-xs text-stone-400 mt-0.5">Gestora Responsável: <strong>{client.assignedManager}</strong></p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenPortalView}
              className="px-4 py-2.5 rounded-xl border-2 border-purple-500/50 bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 text-xs font-bold hover:bg-purple-100 flex items-center space-x-1.5"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Abrir Portal do Cliente</span>
            </button>

            <button
              onClick={onOpenNewModal}
              className="px-4 py-2.5 rounded-xl bg-[#6C4FF8] hover:bg-[#5a3ee3] text-white text-xs font-bold shadow-md flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Criar Conteúdo</span>
            </button>
          </div>
        </div>

        {/* 6 Key Client Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-4 border-t border-stone-100 dark:border-stone-800 text-center">
          <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50">
            <p className="text-[10px] text-stone-400 font-bold uppercase">No Mês</p>
            <p className="text-lg font-black text-stone-800 dark:text-stone-200">{client.monthlyContentsTarget} peças</p>
          </div>
          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300">
            <p className="text-[10px] font-bold uppercase opacity-80">Em Produção</p>
            <p className="text-lg font-black">{client.contentsInProduction}</p>
          </div>
          <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/30 text-purple-800 dark:text-purple-300">
            <p className="text-[10px] font-bold uppercase opacity-80">Em Aprovação</p>
            <p className="text-lg font-black">{client.contentsAwaitingApproval}</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300">
            <p className="text-[10px] font-bold uppercase opacity-80">Publicados</p>
            <p className="text-lg font-black">{client.contentsPublishedThisMonth}</p>
          </div>
          <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300">
            <p className="text-[10px] font-bold uppercase opacity-80">Atrasados</p>
            <p className="text-lg font-black">1</p>
          </div>
          <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-200">
            <p className="text-[10px] font-bold uppercase opacity-80">Planejamento</p>
            <p className="text-lg font-black">{client.monthlyProgressPercent}%</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`px-6 border-b flex space-x-6 text-xs font-bold overflow-x-auto ${
        isDarkMode ? 'border-stone-800 text-stone-400' : 'border-stone-200 text-stone-500'
      }`}>
        {[
          { id: 'overview', label: 'Visão Geral' },
          { id: 'contents', label: `Conteúdos (${clientContents.length})` },
          { id: 'ideas', label: `Ideias (${clientIdeas.length})` },
          { id: 'approvals', label: 'Aprovações Pendentes' },
          { id: 'strategy', label: 'Manual & Tom de Voz' },
          { id: 'team', label: 'Equipe do Cliente' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 border-b-2 whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'border-[#6C4FF8] text-[#6C4FF8]'
                : 'border-transparent hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400">Conteúdos Recentes do Cliente</h3>
          <div className="space-y-2">
            {clientContents.map((cnt) => (
              <div
                key={cnt.id}
                onClick={() => onOpenContentDetail(cnt)}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer hover:border-purple-400 transition-colors ${
                  isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
                }`}
              >
                <div className="space-y-1 max-w-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                      {cnt.channel} • {cnt.format}
                    </span>
                    <span className="text-[10px] font-bold text-stone-400">Entrega: {cnt.deadlineDate}</span>
                  </div>
                  <p className="font-bold text-xs text-stone-900 dark:text-white">{cnt.title}</p>
                </div>

                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-stone-100 dark:bg-stone-800">
                  {cnt.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'strategy' && (
        <div className={`p-6 rounded-3xl border space-y-4 text-xs ${
          isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
        }`}>
          <h3 className="text-sm font-bold text-stone-900 dark:text-white">Manual Estratégico & Tom de Voz</h3>
          <div className="space-y-3">
            <div>
              <p className="font-bold text-stone-400 uppercase">Público-Alvo:</p>
              <p className="text-stone-700 dark:text-stone-300 font-medium">{client.strategy.targetAudience}</p>
            </div>
            <div>
              <p className="font-bold text-stone-400 uppercase">Tom de Voz Oficial:</p>
              <p className="text-stone-700 dark:text-stone-300 font-medium">{client.strategy.toneOfVoice}</p>
            </div>
            <div>
              <p className="font-bold text-stone-400 uppercase">Frequência de Publicação Recomendada:</p>
              <p className="text-stone-700 dark:text-stone-300 font-medium">{client.strategy.publishingFrequency}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
