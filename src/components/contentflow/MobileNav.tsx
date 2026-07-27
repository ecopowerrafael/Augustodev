import React from 'react';
import { Home, FileText, Plus, Calendar, MoreHorizontal } from 'lucide-react';
import { ActiveTab } from './Sidebar';

interface MobileNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenNewModal: () => void;
  isDarkMode: boolean;
  onOpenMoreMenu: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenNewModal,
  isDarkMode,
  onOpenMoreMenu,
}) => {
  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 h-16 border-t px-4 flex items-center justify-around z-40 ${
      isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-300' : 'bg-white border-stone-200 text-stone-700'
    }`}>
      <button
        onClick={() => onSelectTab('dashboard')}
        className={`flex flex-col items-center justify-center space-y-0.5 text-[10px] font-bold ${
          activeTab === 'dashboard' ? 'text-[#6C4FF8]' : 'text-stone-400'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Início</span>
      </button>

      <button
        onClick={() => onSelectTab('contents')}
        className={`flex flex-col items-center justify-center space-y-0.5 text-[10px] font-bold ${
          activeTab === 'contents' || activeTab === 'kanban' ? 'text-[#6C4FF8]' : 'text-stone-400'
        }`}
      >
        <FileText className="w-5 h-5" />
        <span>Conteúdos</span>
      </button>

      {/* Central Big Action Button */}
      <button
        onClick={onOpenNewModal}
        className="w-12 h-12 rounded-full bg-[#6C4FF8] text-white flex items-center justify-center -mt-6 shadow-lg shadow-purple-500/40 hover:scale-105 transition-transform"
      >
        <Plus className="w-6 h-6" />
      </button>

      <button
        onClick={() => onSelectTab('calendar')}
        className={`flex flex-col items-center justify-center space-y-0.5 text-[10px] font-bold ${
          activeTab === 'calendar' ? 'text-[#6C4FF8]' : 'text-stone-400'
        }`}
      >
        <Calendar className="w-5 h-5" />
        <span>Calendário</span>
      </button>

      <button
        onClick={onOpenMoreMenu}
        className="flex flex-col items-center justify-center space-y-0.5 text-[10px] font-bold text-stone-400"
      >
        <MoreHorizontal className="w-5 h-5" />
        <span>Mais</span>
      </button>
    </div>
  );
};
