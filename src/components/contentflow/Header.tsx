import React, { useState } from 'react';
import { 
  Layers, Search, Bell, Moon, Sun, ArrowLeft, ChevronDown, Check,
  User, ShieldCheck, Building, Sparkles, Plus, AlertCircle
} from 'lucide-react';
import { Client, AccessRole } from '../../types/contentflow';

interface HeaderProps {
  selectedClient: Client | null;
  clients: Client[];
  onSelectClient: (client: Client | null) => void;
  currentRole: AccessRole;
  onChangeRole: (role: AccessRole) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  onOpenNewModal: () => void;
  onBackToPortfolio: () => void;
  unreadNotifsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  selectedClient,
  clients,
  onSelectClient,
  currentRole,
  onChangeRole,
  isDarkMode,
  onToggleDarkMode,
  onOpenSearch,
  onOpenNotifications,
  onOpenNewModal,
  onBackToPortfolio,
  unreadNotifsCount,
}) => {
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const roleLabels: Record<AccessRole, { label: string; badge: string; color: string }> = {
    owner: { label: 'Proprietário da Conta', badge: 'PROPRIETÁRIO', color: 'bg-purple-600 text-white' },
    manager: { label: 'Gestor de Conteúdo', badge: 'GESTOR', color: 'bg-blue-600 text-white' },
    collaborator: { label: 'Colaborador / Equipe', badge: 'EQUIPE', color: 'bg-emerald-600 text-white' },
    client_approver: { label: 'Cliente Aprovador (Bella)', badge: 'PORTAL CLIENTE', color: 'bg-pink-600 text-white' },
    platform_admin: { label: 'Administrador SaaS Global', badge: 'ADMIN SAAS', color: 'bg-amber-600 text-white' },
  };

  return (
    <header className={`h-16 border-b px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors ${
      isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-800'
    }`}>
      {/* Left Area: Logo & Multi-Tenant Client Selector */}
      <div className="flex items-center space-x-4">
        {/* Back to Portfolio button */}
        <button
          onClick={onBackToPortfolio}
          className={`hidden lg:flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            isDarkMode ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
          title="Voltar ao Portfólio do Desenvolvedor"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Portfólio</span>
        </button>

        {/* Brand Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#31246C] to-[#6C4FF8] flex items-center justify-center text-white shadow-md shadow-purple-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-base tracking-tight font-sans text-stone-900 dark:text-white flex items-center gap-1.5">
              Content<span className="text-[#6C4FF8]">Flow</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-100 text-purple-700 font-bold dark:bg-purple-950 dark:text-purple-300">
                SaaS MVP
              </span>
            </span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-stone-200 dark:bg-stone-800 hidden sm:block" />

        {/* Multi-tenant Client Selector */}
        <div className="relative">
          <button
            onClick={() => setShowClientDropdown(!showClientDropdown)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
              selectedClient
                ? isDarkMode
                  ? 'bg-stone-800 border-purple-800 text-purple-300 hover:bg-stone-700'
                  : 'bg-purple-50 border-purple-200 text-purple-900 hover:bg-purple-100'
                : isDarkMode
                ? 'bg-stone-800 border-stone-700 text-stone-300'
                : 'bg-stone-50 border-stone-200 text-stone-700'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-[#6C4FF8]" />
            <span className="max-w-[120px] sm:max-w-[180px] truncate font-semibold">
              {selectedClient ? selectedClient.brandName : 'Todos os Clientes'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
          </button>

          {/* Client Selector Dropdown */}
          {showClientDropdown && (
            <div className={`absolute top-full left-0 mt-2 w-72 rounded-2xl border shadow-xl p-2 z-50 ${
              isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-200' : 'bg-white border-stone-200 text-stone-800'
            }`}>
              <div className="px-3 py-2 text-[10px] font-bold tracking-wider text-stone-400 uppercase flex items-center justify-between">
                <span>SELETOR DE CLIENTE</span>
                <span className="text-purple-500">{clients.length} Ativos</span>
              </div>

              {/* All Clients option */}
              <button
                onClick={() => {
                  onSelectClient(null);
                  setShowClientDropdown(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors mb-1 ${
                  selectedClient === null
                    ? 'bg-[#6C4FF8] text-white'
                    : isDarkMode
                    ? 'hover:bg-stone-800 text-stone-300'
                    : 'hover:bg-stone-100 text-stone-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-stone-200 dark:bg-stone-700 flex items-center justify-center font-bold text-[10px]">
                    🌐
                  </div>
                  <span>Visão Global (Todos os Clientes)</span>
                </div>
                {selectedClient === null && <Check className="w-4 h-4" />}
              </button>

              <div className="h-px bg-stone-200 dark:bg-stone-800 my-1" />

              {/* Client items */}
              <div className="max-h-60 overflow-y-auto space-y-1">
                {clients.map((cli) => (
                  <button
                    key={cli.id}
                    onClick={() => {
                      onSelectClient(cli);
                      setShowClientDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                      selectedClient?.id === cli.id
                        ? 'bg-purple-100 text-purple-900 dark:bg-purple-900/50 dark:text-purple-200 font-bold'
                        : isDarkMode
                        ? 'hover:bg-stone-800 text-stone-300'
                        : 'hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <img src={cli.logo} alt={cli.brandName} className="w-6 h-6 rounded-md object-cover border" />
                      <div className="truncate">
                        <p className="truncate font-semibold text-xs">{cli.brandName}</p>
                        <p className="text-[10px] text-stone-400 truncate">{cli.segment}</p>
                      </div>
                    </div>
                    {selectedClient?.id === cli.id && <Check className="w-4 h-4 text-[#6C4FF8]" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <button
          onClick={onOpenSearch}
          className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl border text-xs transition-all ${
            isDarkMode
              ? 'bg-stone-800/80 border-stone-700 text-stone-400 hover:bg-stone-800 hover:text-stone-200'
              : 'bg-stone-100 border-stone-200 text-stone-400 hover:bg-stone-200/70 hover:text-stone-600'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-stone-400" />
            <span>Buscar clientes, conteúdos, tarefas ou ideias...</span>
          </div>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-300 rounded">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right Actions & Role Selector */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Quick New Content Button */}
        <button
          onClick={onOpenNewModal}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#6C4FF8] hover:bg-[#5a3ee3] text-white text-xs font-bold shadow-sm shadow-purple-500/30 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Criar</span>
        </button>

        {/* Search button mobile */}
        <button
          onClick={onOpenSearch}
          className={`md:hidden p-2 rounded-xl border ${
            isDarkMode ? 'bg-stone-800 border-stone-700 text-stone-300' : 'bg-stone-100 border-stone-200 text-stone-700'
          }`}
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications Icon */}
        <button
          onClick={onOpenNotifications}
          className={`relative p-2 rounded-xl border transition-colors ${
            isDarkMode ? 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700' : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
          }`}
          title="Notificações da Operação"
        >
          <Bell className="w-4 h-4" />
          {unreadNotifsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-extrabold flex items-center justify-center animate-pulse">
              {unreadNotifsCount}
            </span>
          )}
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={onToggleDarkMode}
          className={`p-2 rounded-xl border transition-colors ${
            isDarkMode ? 'bg-stone-800 border-stone-700 text-amber-400 hover:bg-stone-700' : 'bg-stone-100 border-stone-200 text-stone-600 hover:bg-stone-200'
          }`}
          title="Alternar Tema Claro / Escuro"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Access Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
              (roleLabels[currentRole] || roleLabels.manager || roleLabels.owner).color
            }`}
            title="Trocar Perfil de Demonstração"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{(roleLabels[currentRole] || roleLabels.manager || roleLabels.owner).badge}</span>
            <ChevronDown className="w-3 h-3 opacity-80" />
          </button>

          {showRoleDropdown && (
            <div className={`absolute top-full right-0 mt-2 w-72 rounded-2xl border shadow-xl p-2 z-50 ${
              isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-200' : 'bg-white border-stone-200 text-stone-800'
            }`}>
              <div className="px-3 py-2 text-[10px] font-bold tracking-wider text-stone-400 uppercase flex items-center justify-between">
                <span>SIMULADOR DE PERFIL DE ACESSO</span>
                <Sparkles className="w-3 h-3 text-purple-500" />
              </div>
              <p className="px-3 pb-2 text-[11px] text-stone-500 dark:text-stone-400">
                Alterne instantaneamente para testar as permissões e visualizações do protótipo:
              </p>

              <div className="space-y-1">
                {(Object.keys(roleLabels) as AccessRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onChangeRole(r);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      currentRole === r
                        ? 'bg-purple-100 text-purple-900 dark:bg-purple-900/50 dark:text-purple-200'
                        : isDarkMode
                        ? 'hover:bg-stone-800 text-stone-300'
                        : 'hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    <div>
                      <p className="font-bold">{roleLabels[r].label}</p>
                      <p className="text-[10px] text-stone-400 font-normal">
                        {r === 'client_approver' ? 'Visualização limpa do cliente final' : r === 'platform_admin' ? 'Painel global do SaaS ContentFlow' : 'Equipe da agência'}
                      </p>
                    </div>
                    {currentRole === r && <Check className="w-4 h-4 text-[#6C4FF8]" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
