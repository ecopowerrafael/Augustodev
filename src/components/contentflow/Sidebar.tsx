import React from 'react';
import { 
  Home, Users, Lightbulb, FileText, Kanban, Calendar, FolderKanban, 
  CheckSquare, CheckCircle2, BarChart3, UserCheck, Settings, CreditCard,
  ShieldAlert, HelpCircle, HardDrive, LogOut, ChevronRight
} from 'lucide-react';
import { AccessRole } from '../../types/contentflow';

export type ActiveTab = 
  | 'dashboard' 
  | 'clients' 
  | 'ideas' 
  | 'contents' 
  | 'kanban' 
  | 'calendar' 
  | 'projects' 
  | 'tasks' 
  | 'approvals' 
  | 'reports' 
  | 'team' 
  | 'settings' 
  | 'plans' 
  | 'saas_admin'
  | 'client_detail';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  currentRole: AccessRole;
  isDarkMode: boolean;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  currentRole,
  isDarkMode,
  onLogout,
}) => {
  const menuItems = [
    { id: 'dashboard' as ActiveTab, label: 'Início', icon: Home, badge: '' },
    { id: 'clients' as ActiveTab, label: 'Clientes', icon: Users, badge: '5' },
    { id: 'ideas' as ActiveTab, label: 'Banco de Ideias', icon: Lightbulb, badge: '64' },
    { id: 'contents' as ActiveTab, label: 'Conteúdos', icon: FileText, badge: '38' },
    { id: 'kanban' as ActiveTab, label: 'Kanban Editorial', icon: Kanban, badge: '' },
    { id: 'calendar' as ActiveTab, label: 'Calendário', icon: Calendar, badge: '14 wk' },
    { id: 'projects' as ActiveTab, label: 'Projetos', icon: FolderKanban, badge: '3' },
    { id: 'tasks' as ActiveTab, label: 'Tarefas', icon: CheckSquare, badge: '6 pend' },
    { id: 'approvals' as ActiveTab, label: 'Aprovações (Portal)', icon: CheckCircle2, badge: '9' },
    { id: 'reports' as ActiveTab, label: 'Relatórios', icon: BarChart3, badge: '' },
    { id: 'team' as ActiveTab, label: 'Equipe', icon: UserCheck, badge: '5' },
    { id: 'settings' as ActiveTab, label: 'Configurações', icon: Settings, badge: '' },
  ];

  return (
    <aside className={`w-64 border-r flex flex-col justify-between shrink-0 hidden md:flex transition-colors ${
      isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-300' : 'bg-white border-stone-200 text-stone-700'
    }`}>
      {/* Top Menu Items */}
      <div className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
        <div className="px-3 py-1.5 text-[10px] font-extrabold tracking-wider text-stone-400 uppercase">
          OPERAÇÃO EDITORIAL
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#6C4FF8] text-white shadow-md shadow-purple-500/20'
                  : isDarkMode
                  ? 'hover:bg-stone-800 text-stone-300'
                  : 'hover:bg-stone-100 text-stone-700'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#6C4FF8]'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : isDarkMode
                    ? 'bg-stone-800 text-stone-400'
                    : 'bg-stone-100 text-stone-500'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Dedicated Admin / Plan links */}
        <div className="pt-3 pb-1 border-t border-stone-200 dark:border-stone-800 space-y-1">
          <div className="px-3 py-1 text-[10px] font-extrabold tracking-wider text-stone-400 uppercase">
            ADMINISTRAÇÃO & SAAS
          </div>

          <button
            onClick={() => onSelectTab('plans')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'plans'
                ? 'bg-purple-600 text-white'
                : isDarkMode
                ? 'hover:bg-stone-800 text-stone-300'
                : 'hover:bg-stone-100 text-stone-700'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <CreditCard className="w-4 h-4 text-purple-500" />
              <span>Gerenciar Planos</span>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              PRO
            </span>
          </button>

          <button
            onClick={() => onSelectTab('saas_admin')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'saas_admin'
                ? 'bg-amber-600 text-white'
                : isDarkMode
                ? 'hover:bg-stone-800 text-stone-300'
                : 'hover:bg-stone-100 text-stone-700'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>Painel Admin SaaS</span>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              GLOBAL
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Account & Storage Widgets */}
      <div className="p-3 border-t border-stone-200 dark:border-stone-800 space-y-3 bg-stone-50/50 dark:bg-stone-900/50">
        {/* Storage Widget */}
        <div className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-800/80 space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="flex items-center space-x-1 text-stone-600 dark:text-stone-300">
              <HardDrive className="w-3.5 h-3.5 text-purple-500" />
              <span>Espaço em Disco</span>
            </span>
            <span className="text-purple-600 dark:text-purple-400">25%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
            <div className="w-1/4 h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
          </div>
          <p className="text-[10px] text-stone-400">12,4 GB de 50,0 GB utilizados</p>
        </div>

        {/* User Account Info */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-2.5 truncate">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Marina Costa"
              className="w-8 h-8 rounded-full object-cover border border-purple-500"
            />
            <div className="truncate">
              <p className="font-bold text-xs truncate text-stone-800 dark:text-stone-100">Marina Costa</p>
              <p className="text-[10px] text-stone-400 truncate">gestora@contentflow.com</p>
            </div>
          </div>

          <button
            onClick={() => onLogout?.()}
            className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            title="Sair / Tela de Login"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
