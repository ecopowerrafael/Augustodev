import React from 'react';
import { TrendingUp, BarChart2, PieChart, Clock, CheckCircle2, ShieldCheck, Download, Calendar } from 'lucide-react';

interface ReportsViewProps {
  isDarkMode: boolean;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ isDarkMode }) => {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-[#6C4FF8]" />
            <span>Relatórios Operacionais & Métricas da Agência</span>
          </h1>
          <p className="text-xs text-stone-500">Métricas estratégicas de volume, tempo de resposta, taxa de refação e performance de equipe.</p>
        </div>

        <button className="px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold flex items-center space-x-2 hover:bg-stone-100 dark:hover:bg-stone-800">
          <Download className="w-4 h-4" />
          <span>Exportar Relatório PDF</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className={`p-5 rounded-3xl border space-y-2 ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-xs font-bold uppercase text-stone-400">Total Peças Produzidas</p>
          <p className="text-3xl font-black text-[#6C4FF8]">124</p>
          <p className="text-[10px] text-emerald-500 font-bold">+18% em relação a junho</p>
        </div>

        <div className={`p-5 rounded-3xl border space-y-2 ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-xs font-bold uppercase text-stone-400">Aprovação de Primeira</p>
          <p className="text-3xl font-black text-emerald-600">72%</p>
          <p className="text-[10px] text-stone-400">Sem solicitações de ajuste</p>
        </div>

        <div className={`p-5 rounded-3xl border space-y-2 ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-xs font-bold uppercase text-stone-400">Tempo Médio de Aprovação</p>
          <p className="text-3xl font-black text-blue-600">1.8 dias</p>
          <p className="text-[10px] text-emerald-500 font-bold">-0.5 dias vs média anterior</p>
        </div>

        <div className={`p-5 rounded-3xl border space-y-2 ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-xs font-bold uppercase text-stone-400">Cumprimento de Prazos</p>
          <p className="text-3xl font-black text-purple-600">94.8%</p>
          <p className="text-[10px] text-purple-500 font-bold">Nível SLA Ouro</p>
        </div>
      </div>

      {/* Visual Chart Mockup */}
      <div className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
        <h3 className="text-base font-bold">Distribuição de Conteúdos por Canal (Julho 2026)</h3>

        <div className="space-y-3 pt-2">
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Instagram (Feed, Carrossel & Reels)</span>
              <span className="text-[#6C4FF8]">58 peças (46.7%)</span>
            </div>
            <div className="w-full h-3 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#6C4FF8] rounded-full" style={{ width: '46.7%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>LinkedIn (Artigos & Posts)</span>
              <span className="text-blue-600">28 peças (22.5%)</span>
            </div>
            <div className="w-full h-3 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '22.5%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>TikTok & Shorts</span>
              <span className="text-teal-500">22 peças (17.7%)</span>
            </div>
            <div className="w-full h-3 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full" style={{ width: '17.7%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>Blog / SEO</span>
              <span className="text-amber-500">16 peças (13.1%)</span>
            </div>
            <div className="w-full h-3 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '13.1%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
