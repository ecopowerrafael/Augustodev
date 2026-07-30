import React from 'react';
import { 
  Building2, 
  MessageSquare, 
  Users, 
  Calendar, 
  FileText, 
  Sliders, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  UserCheck, 
  Plus, 
  Send, 
  Bell, 
  Menu, 
  X,
  PieChart,
  Home
} from 'lucide-react';
import { UserRole, WhatsappConnection } from '../../types/cobrancaflow';

interface CobrancaHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  whatsappConn: WhatsappConnection;
  onNewChargeClick: () => void;
  onNewClientClick: () => void;
  onLogoutClick: () => void;
  onBackToPortfolio?: () => void;
}

export const CobrancaHeader: React.FC<CobrancaHeaderProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  whatsappConn,
  onNewChargeClick,
  onNewClientClick,
  onLogoutClick,
  onBackToPortfolio
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'cobrancas', label: 'Cobranças', icon: FileText },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'modelos', label: 'Mensagens & WhatsApp', icon: MessageSquare },
    { id: 'logs', label: 'Histórico de Envios', icon: Send },
    { id: 'relatorios', label: 'Relatórios & Empresa', icon: PieChart },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs font-sans">
      {/* Top Banner Notice - Clean Light Theme */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-800/80 text-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Protótipo Navegável
            </span>
            <span className="truncate hidden sm:inline">
              <strong>CobrançaFlow v2.4</strong> — Gestão de Cobranças com Régua de Lembretes Automáticos no WhatsApp
            </span>
          </div>

          <div className="flex items-center space-x-4 shrink-0 text-[11px]">
            {onBackToPortfolio && (
              <button
                onClick={onBackToPortfolio}
                className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-0.5 rounded-full font-bold transition flex items-center space-x-1"
              >
                <span>← Voltar ao Portfólio</span>
              </button>
            )}
            
            {/* Role Switcher */}
            <div className="flex items-center space-x-1 bg-blue-900/40 p-0.5 rounded-full border border-blue-400/30">
              <button
                onClick={() => setUserRole('administrator')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition ${
                  userRole === 'administrator'
                    ? 'bg-white text-blue-900 shadow-xs'
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => setUserRole('operator')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition ${
                  userRole === 'operator'
                    ? 'bg-white text-blue-900 shadow-xs'
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                Operador
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-blue-200">
              ⚡
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">Cobrança<span className="text-blue-600">Flow</span></span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
                  Zap SaaS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Agenda & Lembretes Automáticos</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Header Right Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            
            {/* WhatsApp Connection Badge */}
            <button
              onClick={() => setActiveTab('whatsapp_config')}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center space-x-2 shadow-2xs ${
                whatsappConn?.status === 'connected'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${whatsappConn?.status === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="hidden md:inline">
                {whatsappConn?.status === 'connected' ? 'WhatsApp On' : 'WhatsApp Off'}
              </span>
            </button>

            {/* Quick Action Button: New Charge */}
            <button
              onClick={onNewChargeClick}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-200 transition flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Cobrança</span>
            </button>

            {/* User Profile / Logout */}
            <div className="flex items-center space-x-2 border-l border-slate-200 pl-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700 font-bold text-xs">
                {userRole === 'administrator' ? 'AD' : 'OP'}
              </div>
              <button
                onClick={onLogoutClick}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                title="Sair do sistema"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onNewChargeClick}
              className="p-2 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-xs"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-3 shadow-lg animate-fade-in">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 border ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                onNewClientClick();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-300"
            >
              + Novo Cliente
            </button>

            <button
              onClick={() => {
                onLogoutClick();
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold rounded-xl border border-red-200 flex items-center space-x-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
