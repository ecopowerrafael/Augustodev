import React from 'react';
import { UserRole, ClientTab, DiaristaTab, AdminTab } from '../../types/aloDiaria';
import { AloDiariaLogo } from './AloDiariaLogo';
import { 
  Sparkles, 
  Search, 
  Calendar, 
  History, 
  User, 
  Home, 
  LayoutDashboard, 
  Inbox, 
  Clock, 
  Wallet, 
  Eye, 
  FileCheck, 
  Users, 
  Briefcase, 
  DollarSign, 
  Percent, 
  Star, 
  HelpCircle, 
  BarChart3, 
  Settings, 
  MapPin, 
  Bell, 
  ShieldCheck,
  Building2,
  PhoneCall
} from 'lucide-react';

interface AloDiariaHeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  clientTab: ClientTab;
  setClientTab: (tab: ClientTab) => void;
  diaristaTab: DiaristaTab;
  setDiaristaTab: (tab: DiaristaTab) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  activeLocation: string;
  setActiveLocation: (loc: string) => void;
  unreadNotifications: number;
  onOpenNotifications: () => void;
  onBackToPortfolio?: () => void;
}

export const AloDiariaHeader: React.FC<AloDiariaHeaderProps> = ({
  currentRole,
  onRoleChange,
  clientTab,
  setClientTab,
  diaristaTab,
  setDiaristaTab,
  adminTab,
  setAdminTab,
  activeLocation,
  setActiveLocation,
  unreadNotifications,
  onOpenNotifications,
  onBackToPortfolio
}) => {
  return (
    <header className="bg-white border-b border-purple-100 sticky top-0 z-40 shadow-sm font-sans">
      {/* Top Bar with Brand & Role Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => onRoleChange('cliente')}>
            <AloDiariaLogo size="md" />
          </div>

          {/* Mobile Notification & Role Badge */}
          <div className="flex md:hidden items-center space-x-2">
            <button 
              onClick={onOpenNotifications}
              className="p-2 rounded-xl bg-purple-50 text-purple-900 relative hover:bg-purple-100 transition cursor-pointer"
            >
              <Bell className="w-5 h-5 text-[#4C1D95]" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EC4899] text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Center/Right: Location selector & Role Selector Pills */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-3">
          
          {/* Location Badge Dropdown */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-xl text-xs font-semibold text-[#4C1D95]">
            <MapPin className="w-3.5 h-3.5 text-[#EC4899] shrink-0" />
            <span className="text-slate-500 font-normal">Local:</span>
            <select 
              value={activeLocation} 
              onChange={(e) => setActiveLocation(e.target.value)}
              className="bg-transparent font-bold text-[#4C1D95] focus:outline-none cursor-pointer"
            >
              <option value="São Paulo - Vila Mariana">São Paulo - Vila Mariana</option>
              <option value="São Paulo - Moema">São Paulo - Moema</option>
              <option value="São Paulo - Pinheiros">São Paulo - Pinheiros</option>
              <option value="Campinas - SP">Campinas - SP</option>
              <option value="Rio de Janeiro - RJ">Rio de Janeiro - RJ</option>
            </select>
          </div>

          {/* Role Switcher Pills */}
          <div className="p-1 bg-purple-50/80 border border-purple-200 rounded-2xl flex items-center space-x-1">
            <button
              onClick={() => onRoleChange('cliente')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center space-x-1.5 cursor-pointer ${
                currentRole === 'cliente'
                  ? 'bg-[#4C1D95] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#4C1D95]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Cliente</span>
            </button>

            <button
              onClick={() => onRoleChange('diarista')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center space-x-1.5 cursor-pointer ${
                currentRole === 'diarista'
                  ? 'bg-[#4C1D95] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#4C1D95]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
              <span>Diarista</span>
            </button>

            <button
              onClick={() => onRoleChange('admin')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center space-x-1.5 cursor-pointer ${
                currentRole === 'admin'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Painel Admin</span>
            </button>
          </div>

          {/* Desktop Notification & Portfolio Return */}
          <div className="hidden md:flex items-center space-x-2">
            <button 
              onClick={onOpenNotifications}
              className="p-2 rounded-xl bg-purple-50 text-[#4C1D95] hover:bg-purple-100 transition relative cursor-pointer"
              title="Notificações"
            >
              <Bell className="w-4 h-4 text-[#4C1D95]" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EC4899] text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {onBackToPortfolio && (
              <button
                onClick={onBackToPortfolio}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Voltar ao Portfólio
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Role Navigation Bar Tabs */}
      <div className="bg-purple-50/50 border-t border-purple-100 px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 py-1.5 min-w-max">
          
          {/* CLIENT TABS */}
          {currentRole === 'cliente' && (
            <>
              <TabButton active={clientTab === 'home'} onClick={() => setClientTab('home')} icon={Home} label="Início" />
              <TabButton active={clientTab === 'buscar'} onClick={() => setClientTab('buscar')} icon={Search} label="Buscar Diaristas" />
              <TabButton active={clientTab === 'agendamentos'} onClick={() => setClientTab('agendamentos')} icon={Clock} label="Acompanhar Ao Vivo" badge="Ao Vivo" />
              <TabButton active={clientTab === 'historico'} onClick={() => setClientTab('historico')} icon={History} label="Histórico de Diárias" />
              <TabButton active={clientTab === 'perfil'} onClick={() => setClientTab('perfil')} icon={User} label="Meu Perfil" />
            </>
          )}

          {/* DIARISTA TABS */}
          {currentRole === 'diarista' && (
            <>
              <TabButton active={diaristaTab === 'dashboard'} onClick={() => setDiaristaTab('dashboard')} icon={LayoutDashboard} label="Dashboard" />
              <TabButton active={diaristaTab === 'solicitacoes'} onClick={() => setDiaristaTab('solicitacoes')} icon={Inbox} label="Solicitações" badge="1 Nova" />
              <TabButton active={diaristaTab === 'agenda'} onClick={() => setDiaristaTab('agenda')} icon={Calendar} label="Minha Agenda" />
              <TabButton active={diaristaTab === 'servico_ativo'} onClick={() => setDiaristaTab('servico_ativo')} icon={Clock} label="Diária em Andamento" />
              <TabButton active={diaristaTab === 'carteira'} onClick={() => setDiaristaTab('carteira')} icon={Wallet} label="Carteira & Ganhos" />
              <TabButton active={diaristaTab === 'historico'} onClick={() => setDiaristaTab('historico')} icon={History} label="Histórico Concluído" />
              <TabButton active={diaristaTab === 'perfil_publico'} onClick={() => setDiaristaTab('perfil_publico')} icon={Eye} label="Perfil Público" />
              <TabButton active={diaristaTab === 'cadastro_status'} onClick={() => setDiaristaTab('cadastro_status')} icon={FileCheck} label="Cadastro (15 Passos)" badge="Aprovada" />
            </>
          )}

          {/* ADMIN TABS */}
          {currentRole === 'admin' && (
            <>
              <TabButton active={adminTab === 'dashboard'} onClick={() => setAdminTab('dashboard')} icon={BarChart3} label="Visão Geral KPIs" />
              <TabButton active={adminTab === 'clientes'} onClick={() => setAdminTab('clientes')} icon={Users} label="Gestão de Clientes" />
              <TabButton active={adminTab === 'diaristas'} onClick={() => setAdminTab('diaristas')} icon={Briefcase} label="Gestão de Diaristas" badge="7 Pendentes" />
              <TabButton active={adminTab === 'servicos'} onClick={() => setAdminTab('servicos')} icon={Clock} label="Monitor de Serviços" />
              <TabButton active={adminTab === 'financeiro'} onClick={() => setAdminTab('financeiro')} icon={DollarSign} label="Módulo Financeiro" />
              <TabButton active={adminTab === 'comissoes'} onClick={() => setAdminTab('comissoes')} icon={Percent} label="Comissões" />
              <TabButton active={adminTab === 'avaliacoes'} onClick={() => setAdminTab('avaliacoes')} icon={Star} label="Avaliações" />
              <TabButton active={adminTab === 'atendimento'} onClick={() => setAdminTab('atendimento')} icon={HelpCircle} label="Atendimento" />
              <TabButton active={adminTab === 'relatorios'} onClick={() => setAdminTab('relatorios')} icon={BarChart3} label="Relatórios" />
              <TabButton active={adminTab === 'configuracoes'} onClick={() => setAdminTab('configuracoes')} icon={Settings} label="Configurações" />
            </>
          )}

        </div>
      </div>
    </header>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon: Icon, label, badge }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer shrink-0 ${
        active
          ? 'bg-[#4C1D95] text-white shadow-xs'
          : 'text-slate-600 hover:text-[#4C1D95] hover:bg-purple-100/60'
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
      {badge && (
        <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
          active ? 'bg-[#EC4899] text-white' : 'bg-purple-100 text-[#4C1D95]'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
};
