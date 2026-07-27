import React, { useState } from 'react';
import { Search, X, Building, FileText, Lightbulb, CheckSquare, ChevronRight } from 'lucide-react';
import { Client, ContentItem, Idea, Task } from '../../types/contentflow';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: Client[];
  contents: ContentItem[];
  ideas: Idea[];
  tasks: Task[];
  onSelectContentItem: (item: ContentItem) => void;
  isDarkMode: boolean;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  clients,
  contents,
  ideas,
  tasks,
  onSelectContentItem,
  isDarkMode,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const term = searchTerm.toLowerCase().trim();

  const filteredClients = term ? clients.filter(c => c.brandName.toLowerCase().includes(term) || c.segment.toLowerCase().includes(term)) : clients.slice(0, 3);
  const filteredContents = term ? contents.filter(cnt => cnt.title.toLowerCase().includes(term) || cnt.clientName.toLowerCase().includes(term)) : contents.slice(0, 3);
  const filteredIdeas = term ? ideas.filter(i => i.title.toLowerCase().includes(term) || i.description.toLowerCase().includes(term)) : ideas.slice(0, 3);
  const filteredTasks = term ? tasks.filter(t => t.title.toLowerCase().includes(term)) : tasks.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transition-all ${
        isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
      }`}>
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center space-x-3 bg-stone-50/50 dark:bg-stone-900/50">
          <Search className="w-5 h-5 text-[#6C4FF8]" />
          <input
            type="text"
            autoFocus
            placeholder="Buscar clientes, conteúdos, tarefas ou ideias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-sm font-semibold focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Clientes */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 flex items-center space-x-1.5">
              <Building className="w-3.5 h-3.5 text-purple-500" />
              <span>Clientes ({filteredClients.length})</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredClients.map((cli) => (
                <div
                  key={cli.id}
                  className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center space-x-2.5 hover:border-purple-400 cursor-pointer transition-colors"
                >
                  <img src={cli.logo} alt={cli.brandName} className="w-6 h-6 rounded object-cover" />
                  <div className="truncate text-xs">
                    <p className="font-bold truncate">{cli.brandName}</p>
                    <p className="text-[10px] text-stone-400 truncate">{cli.segment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conteúdos */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <span>Conteúdos em Produção ({filteredContents.length})</span>
            </h4>
            <div className="space-y-1.5">
              {filteredContents.map((cnt) => (
                <button
                  key={cnt.id}
                  onClick={() => {
                    onSelectContentItem(cnt);
                    onClose();
                  }}
                  className="w-full text-left p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-xs"
                >
                  <div className="truncate pr-2">
                    <p className="font-bold truncate">{cnt.title}</p>
                    <p className="text-[10px] text-stone-400">{cnt.clientName} • {cnt.channel}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Banco de Ideias */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 flex items-center space-x-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Banco de Ideias ({filteredIdeas.length})</span>
            </h4>
            <div className="space-y-1.5">
              {filteredIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs space-y-1"
                >
                  <p className="font-bold">{idea.title}</p>
                  <p className="text-[10px] text-stone-400 truncate">{idea.clientName} • {idea.theme}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
