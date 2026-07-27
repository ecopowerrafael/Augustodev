import React from 'react';
import { FolderKanban, Plus, Clock, Users, CheckSquare, Sparkles } from 'lucide-react';
import { Project, Task } from '../../types/contentflow';

interface ProjectsViewProps {
  projects: Project[];
  tasks: Task[];
  onOpenNewModal: () => void;
  isDarkMode: boolean;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  tasks,
  onOpenNewModal,
  isDarkMode,
}) => {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold flex items-center space-x-2">
            <FolderKanban className="w-5 h-5 text-[#6C4FF8]" />
            <span>Gestão de Projetos Internos ({projects.length})</span>
          </h1>
          <p className="text-xs text-stone-500">Organize campanhas estruturadas com entregas de conteúdo e tarefas vinculadas.</p>
        </div>

        <button
          onClick={onOpenNewModal}
          className="px-4 py-2.5 rounded-xl bg-[#6C4FF8] hover:bg-[#5a3ee3] text-white text-xs font-bold shadow-md flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Novo Projeto</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className={`p-6 rounded-3xl border space-y-4 flex flex-col justify-between ${
              isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
            }`}
          >
            <div className="space-y-3">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300 text-[10px] font-extrabold uppercase">
                {proj.clientName}
              </span>

              <h3 className="font-bold text-base text-stone-900 dark:text-white leading-snug">{proj.name}</h3>
              <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">{proj.description}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-stone-400">Progresso Geral:</span>
                <span className="text-[#6C4FF8]">{proj.progressPercent}%</span>
              </div>

              <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                  style={{ width: `${proj.progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                <span>{proj.completedTasks} / {proj.totalTasks} tarefas</span>
                <span>Responsável: {proj.managerName}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
