import React from 'react';
import { 
  Sparkles, FileText, CheckCircle2, Clock, AlertTriangle, Users, TrendingUp, 
  Lightbulb, ChevronRight, ArrowUpRight, Calendar, CheckSquare, Building, Play
} from 'lucide-react';
import { Client, ContentItem, Idea, Task } from '../../types/contentflow';
import { ActiveTab } from '../../components/contentflow/Sidebar';

interface DashboardViewProps {
  clients: Client[];
  contents: ContentItem[];
  ideas: Idea[];
  tasks: Task[];
  onSelectTab: (tab: ActiveTab) => void;
  onOpenContentDetail: (item: ContentItem) => void;
  onOpenNewModal: () => void;
  isDarkMode: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  clients,
  contents,
  ideas,
  tasks,
  onSelectTab,
  onOpenContentDetail,
  onOpenNewModal,
  isDarkMode,
}) => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#31246C] via-[#48339c] to-[#6C4FF8] text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl z-10">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider text-purple-200 border border-white/20">
              AGÊNCIA NORTE DIGITAL • JULHO 2026
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Olá, Marina! 👋
          </h1>
          <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed font-serif">
            Confira o que está acontecendo na sua operação de conteúdo hoje. Você tem <strong>9 aprovações pendentes</strong> e <strong>14 publicações programadas</strong> nesta semana.
          </p>
        </div>

        <div className="flex items-center space-x-3 z-10 shrink-0">
          <button
            onClick={onOpenNewModal}
            className="px-5 py-3 rounded-2xl bg-white text-[#31246C] hover:bg-purple-50 text-xs font-bold shadow-lg transition-all hover:scale-105 flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-[#6C4FF8]" />
            <span>+ Novo Conteúdo</span>
          </button>
        </div>
      </div>

      {/* Main KPI Grid (8 metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className={`p-4 rounded-2xl border transition-all ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">Em Produção</p>
          <p className="text-xl font-black text-blue-600 mt-1">38</p>
          <p className="text-[9px] text-stone-400 mt-0.5">Ativos na equipe</p>
        </div>

        <div className={`p-4 rounded-2xl border transition-all ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">Em Revisão</p>
          <p className="text-xl font-black text-amber-600 mt-1">12</p>
          <p className="text-[9px] text-stone-400 mt-0.5">Revisão interna</p>
        </div>

        <div className={`p-4 rounded-2xl border transition-all ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">Em Aprovação</p>
          <p className="text-xl font-black text-purple-600 mt-1">9</p>
          <p className="text-[9px] text-purple-500 font-bold mt-0.5">Aguardando cliente</p>
        </div>

        <div className={`p-4 rounded-2xl border transition-all ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">Publicados Mês</p>
          <p className="text-xl font-black text-emerald-600 mt-1">47</p>
          <p className="text-[9px] text-emerald-500 font-bold mt-0.5">+18% vs junho</p>
        </div>

        <div className={`p-4 rounded-2xl border transition-all ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">Tarefas Atrasadas</p>
          <p className="text-xl font-black text-red-500 mt-1">6</p>
          <p className="text-[9px] text-red-400 mt-0.5">Requer atenção</p>
        </div>

        <div className={`p-4 rounded-2xl border transition-all ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">Clientes Ativos</p>
          <p className="text-xl font-black text-stone-800 dark:text-stone-100 mt-1">5</p>
          <p className="text-[9px] text-stone-400 mt-0.5">Marcas no plano</p>
        </div>

        <div className={`p-4 rounded-2xl border transition-all ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">Aprovação Direta</p>
          <p className="text-xl font-black text-[#6C4FF8] mt-1">72%</p>
          <p className="text-[9px] text-stone-400 mt-0.5">Sem solicitações</p>
        </div>

        <div className={`p-4 rounded-2xl border transition-all ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">Próx. Semana</p>
          <p className="text-xl font-black text-teal-600 mt-1">14</p>
          <p className="text-[9px] text-stone-400 mt-0.5">Agendados</p>
        </div>
      </div>

      {/* Resumo por Status (Clickable Status Cards) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400">Resumo Operacional por Status</h3>
          <button onClick={() => onSelectTab('kanban')} className="text-xs font-bold text-[#6C4FF8] hover:underline flex items-center space-x-1">
            <span>Abrir Kanban Editorial</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <button
            onClick={() => onSelectTab('ideas')}
            className={`p-4 rounded-2xl border text-left transition-all hover:scale-102 ${
              isDarkMode ? 'bg-stone-900 border-stone-800 hover:border-amber-500' : 'bg-white border-stone-200 hover:border-amber-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-amber-600">
              <span>Ideias</span>
              <Lightbulb className="w-4 h-4" />
            </div>
            <p className="text-2xl font-black text-stone-900 dark:text-white mt-1">64</p>
            <p className="text-[10px] text-stone-400 mt-0.5">Banco de inspirações</p>
          </button>

          <button
            onClick={() => onSelectTab('kanban')}
            className={`p-4 rounded-2xl border text-left transition-all hover:scale-102 ${
              isDarkMode ? 'bg-stone-900 border-stone-800 hover:border-blue-500' : 'bg-white border-stone-200 hover:border-blue-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-blue-600">
              <span>Em Produção</span>
              <FileText className="w-4 h-4" />
            </div>
            <p className="text-2xl font-black text-stone-900 dark:text-white mt-1">38</p>
            <p className="text-[10px] text-stone-400 mt-0.5">Copy, arte e vídeo</p>
          </button>

          <button
            onClick={() => onSelectTab('kanban')}
            className={`p-4 rounded-2xl border text-left transition-all hover:scale-102 ${
              isDarkMode ? 'bg-stone-900 border-stone-800 hover:border-amber-500' : 'bg-white border-stone-200 hover:border-amber-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-amber-600">
              <span>Revisão Interna</span>
              <Clock className="w-4 h-4" />
            </div>
            <p className="text-2xl font-black text-stone-900 dark:text-white mt-1">12</p>
            <p className="text-[10px] text-stone-400 mt-0.5">Aguardando gestora</p>
          </button>

          <button
            onClick={() => onSelectTab('approvals')}
            className={`p-4 rounded-2xl border text-left transition-all hover:scale-102 ${
              isDarkMode ? 'bg-stone-900 border-stone-800 hover:border-purple-500' : 'bg-white border-stone-200 hover:border-purple-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-purple-600">
              <span>Aprovação Cliente</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-2xl font-black text-stone-900 dark:text-white mt-1">9</p>
            <p className="text-[10px] text-stone-400 mt-0.5">No portal do cliente</p>
          </button>

          <button
            onClick={() => onSelectTab('contents')}
            className={`p-4 rounded-2xl border text-left transition-all hover:scale-102 ${
              isDarkMode ? 'bg-stone-900 border-stone-800 hover:border-emerald-500' : 'bg-white border-stone-200 hover:border-emerald-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>Publicados</span>
              <CheckSquare className="w-4 h-4" />
            </div>
            <p className="text-2xl font-black text-stone-900 dark:text-white mt-1">47</p>
            <p className="text-[10px] text-stone-400 mt-0.5">Concluídos no mês</p>
          </button>
        </div>
      </div>

      {/* Grid 2 Columns: Próximas Atividades & Visão por Clientes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Próximas Atividades (7 cols) */}
        <div className={`lg:col-span-7 p-6 rounded-3xl border space-y-4 ${
          isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#6C4FF8]" />
              <span>Próximas Atividades da Operação</span>
            </h3>
            <button onClick={() => onSelectTab('calendar')} className="text-xs font-bold text-[#6C4FF8] hover:underline">
              Ver Calendário
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl border border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-900 flex items-center justify-between text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-amber-800 dark:text-amber-300">Hoje, 10:00</span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 text-[9px] font-bold">Em Revisão</span>
                </div>
                <p className="font-bold text-stone-900 dark:text-white">Revisar legenda do lançamento de inverno</p>
                <p className="text-stone-500 text-[11px]">Cliente: <strong>Bella Cosméticos</strong> • Resp: Ana Souza</p>
              </div>
              <button
                onClick={() => onOpenContentDetail(contents[0])}
                className="px-3 py-1.5 rounded-xl bg-amber-600 text-white font-bold text-[11px] shadow-sm hover:bg-amber-700"
              >
                Revisar
              </button>
            </div>

            <div className="p-3.5 rounded-2xl border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-900 flex items-center justify-between text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-blue-800 dark:text-blue-300">Hoje, 14:00</span>
                  <span className="px-1.5 py-0.2 rounded bg-blue-200 text-blue-900 text-[9px] font-bold">Em Produção</span>
                </div>
                <p className="font-bold text-stone-900 dark:text-white">Enviar vídeo institucional para aprovação</p>
                <p className="text-stone-500 text-[11px]">Cliente: <strong>Construtora Horizonte</strong> • Resp: Lucas Mendes</p>
              </div>
              <button
                onClick={() => onOpenContentDetail(contents[1])}
                className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-[11px] shadow-sm hover:bg-blue-700"
              >
                Detalhes
              </button>
            </div>

            <div className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-900 flex items-center justify-between text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-emerald-800 dark:text-emerald-300">Amanhã, 09:00</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-200 text-emerald-900 text-[9px] font-bold">Aprovado</span>
                </div>
                <p className="font-bold text-stone-900 dark:text-white">Publicar carrossel sobre prevenção na saúde</p>
                <p className="text-stone-500 text-[11px]">Cliente: <strong>Clínica Vida</strong> • Resp: Marina Costa</p>
              </div>
              <button
                onClick={() => onOpenContentDetail(contents[2])}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-[11px] shadow-sm hover:bg-emerald-700"
              >
                Agendado
              </button>
            </div>

            <div className="p-3.5 rounded-2xl border border-purple-200 bg-purple-50/50 dark:bg-purple-950/20 dark:border-purple-900 flex items-center justify-between text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-purple-800 dark:text-purple-300">Amanhã, 16:00</span>
                  <span className="px-1.5 py-0.2 rounded bg-purple-200 text-purple-900 text-[9px] font-bold">Reunião</span>
                </div>
                <p className="font-bold text-stone-900 dark:text-white">Reunião de alinhamento de planejamento editorial</p>
                <p className="text-stone-500 text-[11px]">Cliente: <strong>Café Central</strong> • Tipo: Reunião Interna</p>
              </div>
              <button
                onClick={() => onSelectTab('clients')}
                className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-[11px] shadow-sm hover:bg-purple-700"
              >
                Ver Cliente
              </button>
            </div>
          </div>
        </div>

        {/* Visão por Clientes (5 cols) */}
        <div className={`lg:col-span-5 p-6 rounded-3xl border space-y-4 ${
          isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold flex items-center space-x-2">
              <Building className="w-4 h-4 text-[#6C4FF8]" />
              <span>Visão por Cliente (5)</span>
            </h3>
            <button onClick={() => onSelectTab('clients')} className="text-xs font-bold text-[#6C4FF8] hover:underline">
              Todos os Clientes
            </button>
          </div>

          <div className="space-y-3">
            {clients.slice(0, 4).map((cli) => (
              <div
                key={cli.id}
                className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <img src={cli.logo} alt={cli.brandName} className="w-7 h-7 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-stone-900 dark:text-white">{cli.brandName}</p>
                      <p className="text-[10px] text-stone-400">{cli.segment}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                    {cli.monthlyProgressPercent}% Mês
                  </span>
                </div>

                <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                    style={{ width: `${cli.monthlyProgressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1">
                  <span>Conteúdos: {cli.monthlyContentsTarget}</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">
                    {cli.contentsAwaitingApproval} em aprovação
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
