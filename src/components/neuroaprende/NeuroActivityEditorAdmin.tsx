import React, { FC, useState } from 'react';
import { 
  Settings, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  Save, 
  Upload, 
  Volume2, 
  Layers, 
  Database,
  Brain,
  HelpCircle,
  FileCode
} from 'lucide-react';
import { ActivityTemplate, GameType, CognitiveSkill } from '../../types/neuroaprende';
import { DEMO_ACTIVITIES } from '../../data/neuroaprendeData';

export const NeuroActivityEditorAdmin: FC = () => {
  const [activitiesList, setActivitiesList] = useState<ActivityTemplate[]>(DEMO_ACTIVITIES);
  const [editingTitle, setEditingTitle] = useState<string>('Pareamento de Sílabas e Animais');
  const [editingType, setEditingType] = useState<GameType>('matching');
  const [editingSkill, setEditingSkill] = useState<CognitiveSkill>('language');
  const [editingInstruction, setEditingInstruction] = useState<string>('Arraste a sílaba correta para completar o nome do animal!');
  const [isSavedSuccess, setIsSavedSuccess] = useState<boolean>(false);

  const handleCreateActivity = () => {
    const newAct: ActivityTemplate = {
      id: `act_custom_${Date.now()}`,
      title: editingTitle,
      gameType: editingType,
      worldId: 'world_letras',
      cognitiveSkill: editingSkill,
      difficultyLevel: 1,
      instructionAudioText: editingInstruction,
      targetAgeMin: 4,
      targetAgeMax: 10,
      items: [
        { id: 'i1', label: 'GATO', emoji: '🐱', audioText: 'Gato' },
        { id: 'i2', label: 'CACHORRO', emoji: '🐶', audioText: 'Cachorro' },
      ],
      rewardPoints: 15,
      adaptiveRules: {
        maxFailsBeforeHint: 2,
        allowUnlimitedTime: true,
        autoCalmDownOnImpulsivity: true,
      },
    };

    setActivitiesList([newAct, ...activitiesList]);
    setIsSavedSuccess(true);
    setTimeout(() => setIsSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in text-xs font-sans">
      
      {/* Admin Header */}
      <div className="bg-white border border-sky-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-3 py-1 bg-purple-100 text-purple-900 border border-purple-300 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 shadow-xs">
                <Database className="w-3.5 h-3.5 text-purple-600" />
                <span>Arquitetura No-Code Escalável</span>
              </span>
              <span className="text-slate-400 font-bold">•</span>
              <span className="text-xs font-semibold text-slate-600">Escala até 3.000 tarefas parametrizadas</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
              Editor de <span className="italic text-purple-600 font-extrabold">Atividades Pedagógicas</span>
            </h2>
          </div>

          <div className="px-4 py-2 bg-purple-50 border border-purple-200 text-purple-900 rounded-xl text-xs font-extrabold shadow-xs">
            Total Cadastradas: {activitiesList.length} Atividades
          </div>
        </div>

        <p className="text-slate-700 leading-relaxed font-sans text-sm font-medium">
          Este painel no-code permite que psicopedagogos e educadores cadastrem novos exercícios (pareamento, memória, prancha PECS, reconhecimento fonético) alimentando apenas textos de áudio, imagens e gabarito, sem necessidade de alterações no código-fonte.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Editor */}
        <div className="lg:col-span-7 bg-white border border-sky-200 rounded-3xl p-6 space-y-5 shadow-md">
          <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
            Cadastrar Nova Atividade
          </h3>

          {isSavedSuccess && (
            <div className="p-3.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl flex items-center space-x-2 font-bold shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Atividade criada com sucesso e inserida no catálogo!</span>
            </div>
          )}

          <div className="space-y-4 font-sans">
            
            <div className="space-y-1">
              <label className="text-slate-700 block font-bold">Título da Atividade:</label>
              <input
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-700 block font-bold">Tipo de Jogo / Template:</label>
                <select
                  value={editingType}
                  onChange={(e) => setEditingType(e.target.value as GameType)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-amber-800 font-extrabold focus:border-purple-500 focus:outline-none"
                >
                  <option value="matching">Pareamento e Associação</option>
                  <option value="memory_game">Jogo da Memória Visual/Auditiva</option>
                  <option value="audio_recognition">Reconhecimento de Som</option>
                  <option value="communication_board">Prancha PECS</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 block font-bold">Foco Cognitivo:</label>
                <select
                  value={editingSkill}
                  onChange={(e) => setEditingSkill(e.target.value as CognitiveSkill)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-emerald-800 font-extrabold focus:border-purple-500 focus:outline-none"
                >
                  <option value="language">Linguagem & Fonemas</option>
                  <option value="emotional_regulation">Emoções & Autorregulação</option>
                  <option value="memory">Memória Auditiva</option>
                  <option value="daily_routine">Rotina & PECS</option>
                  <option value="reasoning">Raciocínio Lógico</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 block font-bold">Texto de Narração por Voz (Síntese Speech):</label>
              <textarea
                rows={2}
                value={editingInstruction}
                onChange={(e) => setEditingInstruction(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-slate-900 font-medium focus:border-purple-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleCreateActivity}
              className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold uppercase rounded-xl transition flex items-center justify-center space-x-2 shadow-md shadow-purple-200"
            >
              <Save className="w-4 h-4" />
              <span>Publicar Atividade no Catálogo</span>
            </button>

          </div>
        </div>

        {/* Right Column: Existing Catalog */}
        <div className="lg:col-span-5 bg-white border border-sky-200 rounded-3xl p-6 space-y-4 shadow-md">
          <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
            Catálogo Cadastrado ({activitiesList.length})
          </h3>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {activitiesList.map((act) => (
              <div key={act.id} className="p-4 bg-sky-50/50 border border-sky-100 rounded-2xl space-y-1 shadow-xs">
                <div className="flex justify-between items-center">
                  <strong className="text-slate-900 font-bold">{act.title}</strong>
                  <span className="px-2.5 py-0.5 bg-purple-100 text-purple-900 border border-purple-300 rounded-full text-[10px] font-extrabold">
                    {act.gameType}
                  </span>
                </div>
                <p className="text-slate-600 text-xs font-medium">"{act.instructionAudioText}"</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
