import React from 'react';
import { ShieldCheck, Building2, Users, Layers, TrendingUp, DollarSign, Activity } from 'lucide-react';

interface SaaSAdminViewProps {
  isDarkMode: boolean;
}

export const SaaSAdminView: React.FC<SaaSAdminViewProps> = ({ isDarkMode }) => {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-800 to-stone-950 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-stone-800">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold uppercase">
              SUPER ADMIN PAINEL
            </span>
          </div>
          <h1 className="text-xl font-bold flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <span>Visão Global da Plataforma ContentFlow SaaS</span>
          </h1>
          <p className="text-xs text-stone-400 font-serif">
            Estatísticas consolidadas de todas as organizações, faturamento e saúde da infraestrutura.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <span className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold font-mono">
            SISTEMA OPERACIONAL (100% ONLINE)
          </span>
        </div>
      </div>

      {/* Global SaaS KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-[10px] font-bold uppercase text-stone-400">Organizações (Tenants)</p>
          <p className="text-xl font-black text-stone-900 dark:text-white">284</p>
          <p className="text-[9px] text-emerald-500 font-bold">+14 este mês</p>
        </div>

        <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-[10px] font-bold uppercase text-stone-400">Usuários Ativos</p>
          <p className="text-xl font-black text-blue-600">2.746</p>
          <p className="text-[9px] text-stone-400">Média 9.6 p/ org</p>
        </div>

        <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-[10px] font-bold uppercase text-stone-400">Marcas Gerenciadas</p>
          <p className="text-xl font-black text-purple-600">1.920</p>
          <p className="text-[9px] text-purple-500 font-bold">Clientes finais</p>
        </div>

        <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-[10px] font-bold uppercase text-stone-400">Peças Produzidas Mês</p>
          <p className="text-xl font-black text-teal-600">48.620</p>
          <p className="text-[9px] text-stone-400">Volume global</p>
        </div>

        <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-[10px] font-bold uppercase text-stone-400">MRR (Receita Recorrente)</p>
          <p className="text-xl font-black text-emerald-600">R$ 82.400</p>
          <p className="text-[9px] text-emerald-500 font-bold">+12.4% MoM</p>
        </div>

        <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
          <p className="text-[10px] font-bold uppercase text-stone-400">Churn Rate</p>
          <p className="text-xl font-black text-stone-800 dark:text-stone-200">1.2%</p>
          <p className="text-[9px] text-emerald-500 font-bold">Saudável (&lt; 2%)</p>
        </div>
      </div>

      {/* Distribution of SaaS Subscriptions */}
      <div className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'}`}>
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400">Distribuição dos Planos Ativos</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-bold">
          <div className="p-4 rounded-2xl border border-purple-200 bg-purple-50/50 dark:bg-purple-950/20 dark:border-purple-800 space-y-1">
            <span className="text-purple-900 dark:text-purple-300">Plano Agência (R$ 499/mês)</span>
            <p className="text-2xl font-black text-purple-900 dark:text-purple-200">120 assinantes</p>
            <p className="text-[10px] text-stone-500 font-normal">Representa R$ 59.880 do MRR</p>
          </div>

          <div className="p-4 rounded-2xl border border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800 space-y-1">
            <span className="text-blue-900 dark:text-blue-300">Plano Profissional (R$ 249/mês)</span>
            <p className="text-2xl font-black text-blue-900 dark:text-blue-200">114 assinantes</p>
            <p className="text-[10px] text-stone-500 font-normal">Representa R$ 28.386 do MRR</p>
          </div>

          <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 dark:bg-stone-800 space-y-1">
            <span className="text-stone-700 dark:text-stone-300">Plano Essencial (R$ 99/mês)</span>
            <p className="text-2xl font-black text-stone-900 dark:text-white">50 assinantes</p>
            <p className="text-[10px] text-stone-500 font-normal">Representa R$ 4.950 do MRR</p>
          </div>
        </div>
      </div>
    </div>
  );
};
