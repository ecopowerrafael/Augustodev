import React from 'react';
import { Users, Plus, Shield, Mail, CheckCircle } from 'lucide-react';
import { TeamMember } from '../../types/contentflow';

interface TeamViewProps {
  team: TeamMember[];
  onOpenNewModal: () => void;
  isDarkMode: boolean;
}

export const TeamView: React.FC<TeamViewProps> = ({
  team,
  onOpenNewModal,
  isDarkMode,
}) => {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#6C4FF8]" />
            <span>Gestão da Equipe & Permissões ({team.length})</span>
          </h1>
          <p className="text-xs text-stone-500">Gerencie gestores, copywriters, designers e revisores do seu workspace.</p>
        </div>

        <button
          onClick={onOpenNewModal}
          className="px-4 py-2.5 rounded-xl bg-[#6C4FF8] hover:bg-[#5a3ee3] text-white text-xs font-bold shadow-md flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Convidar Membro</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {team.map((member) => (
          <div
            key={member.id}
            className={`p-5 rounded-3xl border flex items-center justify-between ${
              isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-2xl object-cover border" />
              <div>
                <h3 className="font-bold text-sm text-stone-900 dark:text-white">{member.name}</h3>
                <p className="text-xs text-[#6C4FF8] font-semibold">{member.roleTitle}</p>
                <p className="text-[10px] text-stone-400">{member.email}</p>
              </div>
            </div>

            <div className="text-right text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-extrabold uppercase text-[10px]">
                {member.systemRole}
              </span>
              <p className="text-[10px] text-stone-400 mt-1">{member.activeContentsCount} peças atribuídas</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
