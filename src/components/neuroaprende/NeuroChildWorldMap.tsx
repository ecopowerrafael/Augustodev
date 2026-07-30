import React, { FC, useState } from 'react';
import { 
  BookOpen, 
  HeartHandshake, 
  Cat, 
  Clock, 
  Calculator, 
  Shapes, 
  Play, 
  Star, 
  Award, 
  Sparkles, 
  Filter, 
  CheckCircle2,
  Lock,
  Brain
} from 'lucide-react';
import { ThemeWorld, CognitiveSkill, StudentProfile } from '../../types/neuroaprende';

interface NeuroChildWorldMapProps {
  worlds: ThemeWorld[];
  student: StudentProfile;
  onSelectWorld: (world: ThemeWorld) => void;
}

export const NeuroChildWorldMap: FC<NeuroChildWorldMapProps> = ({
  worlds,
  student,
  onSelectWorld
}) => {
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('all');

  // Map icon strings to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return BookOpen;
      case 'HeartHandshake': return HeartHandshake;
      case 'Cat': return Cat;
      case 'Clock': return Clock;
      case 'Calculator': return Calculator;
      case 'Shapes': return Shapes;
      default: return Sparkles;
    }
  };

  const filteredWorlds = worlds.filter(w => {
    if (selectedSkillFilter === 'all') return true;
    return w.cognitiveFocus === selectedSkillFilter;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Bar with Filter */}
      <div className="bg-white border border-sky-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs">
                Mapa dos Mundos Temáticos
              </span>
              <span className="text-slate-400 font-bold text-xs">•</span>
              <span className="text-xs font-semibold text-slate-600">
                Escolha um mundo mágico para jogar
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
              Explorar <span className="italic text-emerald-600 font-extrabold">Mundos Mágicos</span> de Aprendizagem
            </h2>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-700 font-bold mr-1">Foco Cognitivo:</span>
            <select
              value={selectedSkillFilter}
              onChange={(e) => setSelectedSkillFilter(e.target.value)}
              className="bg-sky-50 border-2 border-sky-200 rounded-xl px-3.5 py-2 text-slate-800 font-bold focus:border-emerald-500 focus:outline-none shadow-xs"
            >
              <option value="all">🌟 Todos os Mundos</option>
              <option value="language">📖 Linguagem & Fonemas</option>
              <option value="emotional_regulation">💛 Emoções & Autorregulação</option>
              <option value="memory">🐱 Memória & Sons</option>
              <option value="daily_routine">🕒 Rotina & Comunicação PECS</option>
              <option value="reasoning">🔢 Raciocínio & Números</option>
              <option value="visual_perception">🔷 Percepção Visual & Formas</option>
            </select>
          </div>
        </div>

        {/* Quick Instructions Banner */}
        <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-200 text-amber-900 border border-amber-300 flex items-center justify-center font-bold text-2xl shrink-0 shadow-xs">
              🦉
            </div>
            <div>
              <span className="font-extrabold text-amber-900 block text-sm">Dica do Corujinha Nido:</span>
              <span className="font-medium text-slate-700">"Você ganha estrelinhas em todas as jogadas! Pode repeti-las quantas vezes quiser, no seu ritmo!"</span>
            </div>
          </div>

          <div className="px-4 py-2 bg-white border border-emerald-300 rounded-xl font-extrabold text-emerald-700 shrink-0 shadow-xs">
            Total Concluído: {worlds.reduce((acc, w) => acc + w.completedActivities, 0)} atividades
          </div>
        </div>

      </div>

      {/* Worlds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorlds.map((world) => {
          const Icon = getIcon(world.iconName);
          const percentComplete = Math.round((world.completedActivities / world.totalActivities) * 100);

          return (
            <div
              key={world.id}
              className="bg-white border-2 border-slate-100 hover:border-emerald-400 rounded-3xl p-6 space-y-6 shadow-md hover:shadow-xl relative flex flex-col justify-between transition duration-300 group overflow-hidden"
            >
              {/* Card Header & Icon */}
              <div className="space-y-4">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-2xl p-0.5 flex items-center justify-center text-white shadow-md transition transform group-hover:scale-110"
                      style={{ backgroundColor: `${world.colorAccent}20`, borderColor: world.colorAccent, borderWidth: '2px' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: world.colorAccent }} />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-emerald-600 transition">
                        {world.name}
                      </h3>
                      <span className="text-xs font-semibold text-slate-500 block">
                        Guia: {world.mascotName}
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-[10px] font-extrabold uppercase shadow-xs">
                    Liberado
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {world.description}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[11px] text-slate-600 font-bold">
                    <span>Progresso das Tarefas:</span>
                    <strong className="text-slate-900">{world.completedActivities} / {world.totalActivities} ({percentComplete}%)</strong>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div 
                      className="h-full rounded-full transition-all duration-500 shadow-xs"
                      style={{ width: `${percentComplete}%`, backgroundColor: world.colorAccent }}
                    />
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectWorld(world)}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition shadow-md shadow-emerald-200 flex items-center justify-center space-x-2 group-hover:scale-[1.02]"
              >
                <Play className="w-4 h-4 fill-current text-white" />
                <span>Entrar no {world.name}</span>
              </button>

            </div>
          );
        })}
      </div>

    </div>
  );
};
