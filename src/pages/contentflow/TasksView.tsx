import React, { useState } from 'react';
import { CheckSquare, Plus, Check, Clock, User, AlertCircle } from 'lucide-react';
import { Task } from '../../types/contentflow';

interface TasksViewProps {
  tasks: Task[];
  onOpenNewModal: () => void;
  isDarkMode: boolean;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  onOpenNewModal,
  isDarkMode,
}) => {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-[#6C4FF8]" />
            <span>Gestão de Tarefas & Entregas</span>
          </h1>
          <p className="text-xs text-stone-500">Acompanhe as sub-tarefas operacionais atribuídas aos membros da equipe.</p>
        </div>

        <button
          onClick={onOpenNewModal}
          className="px-4 py-2.5 rounded-xl bg-[#6C4FF8] hover:bg-[#5a3ee3] text-white text-xs font-bold shadow-md flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nova Tarefa</span>
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-5 rounded-2xl border space-y-3 transition-all ${
              isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                    {task.clientName}
                  </span>
                  <span className="text-xs font-bold text-stone-400">Prazo: {task.dueDate}</span>
                </div>
                <h3 className="font-bold text-sm text-stone-900 dark:text-white">{task.title}</h3>
                <p className="text-xs text-stone-500">{task.description}</p>
              </div>

              <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                task.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {task.status === 'completed' ? 'Concluída' : 'Em Andamento'}
              </span>
            </div>

            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
              <div className="flex items-center space-x-2">
                <img src={task.assigneeAvatar} alt={task.assigneeName} className="w-5 h-5 rounded-full object-cover" />
                <span className="font-semibold text-stone-700 dark:text-stone-300">{task.assigneeName}</span>
              </div>
              <span>{task.subtasks.filter(s => s.completed).length} de {task.subtasks.length} subtarefas</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
