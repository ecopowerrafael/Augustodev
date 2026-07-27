import React, { useState } from 'react';
import { Building, Plus, Search, Filter, ExternalLink, Sparkles, ChevronRight, Phone, Mail, Globe, Users } from 'lucide-react';
import { Client } from '../../types/contentflow';

interface ClientsViewProps {
  clients: Client[];
  onSelectClientDetail: (client: Client) => void;
  onOpenNewModal: () => void;
  isDarkMode: boolean;
}

export const ClientsView: React.FC<ClientsViewProps> = ({
  clients,
  onSelectClientDetail,
  onOpenNewModal,
  isDarkMode,
}) => {
  const [searchFilter, setSearchFilter] = useState('');

  const filtered = clients.filter(c => 
    c.brandName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.segment.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.contactName.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold flex items-center space-x-2">
            <Building className="w-5 h-5 text-[#6C4FF8]" />
            <span>Gestão de Clientes ({clients.length})</span>
          </h1>
          <p className="text-xs text-stone-500">Cadastre e gerencie a operação editorial de cada marca de forma isolada.</p>
        </div>

        <button
          onClick={onOpenNewModal}
          className="px-4 py-2.5 rounded-xl bg-[#6C4FF8] hover:bg-[#5a3ee3] text-white text-xs font-bold shadow-md flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Novo Cliente</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className={`p-4 rounded-2xl border flex items-center space-x-3 ${
        isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
      }`}>
        <Search className="w-4 h-4 text-stone-400" />
        <input
          type="text"
          placeholder="Filtrar por nome do cliente, segmento ou contato..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="flex-1 bg-transparent text-xs font-medium focus:outline-none"
        />
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((cli) => (
          <div
            key={cli.id}
            className={`p-6 rounded-3xl border space-y-4 transition-all hover:border-purple-500 hover:shadow-xl ${
              isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
            }`}
          >
            {/* Card Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <img src={cli.logo} alt={cli.brandName} className="w-12 h-12 rounded-2xl object-cover border shadow-sm" />
                <div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-white leading-snug">{cli.brandName}</h3>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">{cli.segment}</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-extrabold uppercase">
                {cli.status === 'active' ? 'Ativo' : 'Pendente'}
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 text-center text-xs">
              <div>
                <p className="text-[10px] text-stone-400 font-bold uppercase">Meta Mês</p>
                <p className="font-black text-stone-800 dark:text-stone-200">{cli.monthlyContentsTarget}</p>
              </div>
              <div>
                <p className="text-[10px] text-stone-400 font-bold uppercase">Aprovação</p>
                <p className="font-black text-purple-600">{cli.contentsAwaitingApproval}</p>
              </div>
              <div>
                <p className="text-[10px] text-stone-400 font-bold uppercase">Progresso</p>
                <p className="font-black text-emerald-600">{cli.monthlyProgressPercent}%</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                  style={{ width: `${cli.monthlyProgressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-stone-400 font-medium">
                <span>{cli.contentsPublishedThisMonth} publicados</span>
                <span>Último acesso: {cli.lastAccess}</span>
              </div>
            </div>

            {/* Contacts Info */}
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-1 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex items-center space-x-2">
                <Users className="w-3.5 h-3.5 text-stone-400" />
                <span>Contato: <strong>{cli.contactName}</strong> ({cli.roleTitle})</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>WhatsApp: {cli.whatsapp}</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => onSelectClientDetail(cli)}
              className="w-full py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/60 text-purple-900 dark:text-purple-200 text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Abrir Perfil Completo do Cliente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
