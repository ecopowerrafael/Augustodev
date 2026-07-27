import React from 'react';
import { Layers, Sparkles, ArrowUpRight, Kanban, Calendar, CheckCircle2, ShieldCheck, Users } from 'lucide-react';

interface ContentFlowSectionProps {
  onOpenApp: () => void;
}

export const ContentFlowSection: React.FC<ContentFlowSectionProps> = ({ onOpenApp }) => {
  return (
    <div className="relative group rounded-3xl bg-gradient-to-br from-[#1d163c] via-[#2c1f5e] to-[#1d163c] border-2 border-[#6C4FF8]/40 p-6 sm:p-8 text-white shadow-2xl overflow-hidden hover:border-[#8C75FF] transition-all duration-300">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#6C4FF8]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Badge */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-[#6C4FF8] text-white text-[10px] font-black uppercase rounded-full tracking-wider flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-purple-200" />
            <span>PLATAFORMA SAAS • PROTÓTIPO MVP</span>
          </span>
          <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-400/40 text-[10px] font-bold uppercase rounded">
            Multi-Tenant & Aprovação
          </span>
        </div>
        <span className="text-xs text-purple-200 font-mono">100% Funcional & Interativo</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6 relative z-10">
        {/* Left Info (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#6C4FF8] text-white flex items-center justify-center font-bold text-2xl shadow-md shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-purple-300 transition-colors">
                ContentFlow — Gestão Editorial & Aprovação SaaS
              </h3>
              <p className="text-xs text-purple-300 font-mono">Sistema completo para agências de marketing e equipes de conteúdo</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-serif">
            Plataforma SaaS multi-tenant desenvolvida para agências gerenciarem toda a produção editorial de seus clientes. Inclui controle de briefing, banco de ideias com promoção para produção, Kanban editorial em 5 colunas, calendário visual, tarefas operacionais e portal exclusivo de aprovação de clientes com solicitações de ajuste.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-stone-200 pt-2">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2">
              <Kanban className="w-4 h-4 text-purple-400" />
              <span>Kanban Editorial</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Calendário Mês/Semana</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>Portal Aprovação</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Super Admin SaaS</span>
            </div>
          </div>
        </div>

        {/* Right CTA Box (5 Cols) */}
        <div className="lg:col-span-5 bg-white/5 border border-white/15 rounded-2xl p-6 backdrop-blur-md space-y-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-purple-300">
            <Layers className="w-5 h-5" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Acesse o Protótipo SaaS ContentFlow</span>
          </div>

          <p className="text-xs text-stone-300 italic font-serif">
            "Explore o ecossistema completo: gerencie marcas, teste a alternância de perfis (Gestor / Revisor / Cliente), mova cartões no Kanban e simule o aceite de peças no portal do cliente."
          </p>

          <button
            onClick={onOpenApp}
            className="w-full py-3.5 bg-[#6C4FF8] hover:bg-[#5a3ee3] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xl shadow-purple-500/25 flex items-center justify-center space-x-2 hover:scale-105"
          >
            <span>Acessar Plataforma SaaS ContentFlow</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
