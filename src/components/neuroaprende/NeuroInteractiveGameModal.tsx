import React, { FC, useState, useEffect } from 'react';
import { 
  X, 
  Volume2, 
  Sparkles, 
  Star, 
  RotateCcw, 
  CheckCircle2, 
  Heart, 
  Smile, 
  Play, 
  Pause, 
  HelpCircle,
  Award,
  ArrowRight,
  Brain
} from 'lucide-react';
import { ActivityTemplate, ThemeWorld, StudentProfile, AccessibilitySettings } from '../../types/neuroaprende';
import { DEMO_ACTIVITIES } from '../../data/neuroaprendeData';

interface NeuroInteractiveGameModalProps {
  world: ThemeWorld | null;
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  settings: AccessibilitySettings;
}

export const NeuroInteractiveGameModal: FC<NeuroInteractiveGameModalProps> = ({
  world,
  isOpen,
  onClose,
  student,
  setStudent,
  settings
}) => {
  const [selectedGameIndex, setSelectedGameIndex] = useState<number>(0);
  const [activeTabGame, setActiveTabGame] = useState<'play' | 'pecs' | 'calm'>('play');

  // Interactive Mini-game 1 State (Matching)
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Interactive Mini-game 2 State (Memory Game)
  const [memoryFlipped, setMemoryFlipped] = useState<number[]>([]);
  const [memoryMatched, setMemoryMatched] = useState<number[]>([]);

  // Interactive PECS Board Sentence Builder State
  const [pecsSentence, setPecsSentence] = useState<{ id: string; label: string; emoji?: string; audioText: string }[]>([]);

  // Calm / Guided Breathing State
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingTimer, setBreathingTimer] = useState<number>(4);

  // Victory Celebration Overlay
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Reset when opening modal or switching game
  useEffect(() => {
    if (isOpen) {
      setMatchedPairs([]);
      setSelectedItem(null);
      setMemoryFlipped([]);
      setMemoryMatched([]);
      setPecsSentence([]);
      setIsCompleted(false);
      setActiveTabGame('play');
    }
  }, [isOpen, selectedGameIndex]);

  // Handle Speech Synthesis
  const speakText = (text: string) => {
    if (!settings.audioFeedback || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = settings.speechRate || 0.9;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.log('Speech synthesis unavailable');
    }
  };

  if (!isOpen || !world) return null;

  const currentActivity: ActivityTemplate = DEMO_ACTIVITIES[selectedGameIndex] || DEMO_ACTIVITIES[0];

  // Game 1 Matching Logic
  const handleSelectMatchingItem = (id: string, matchPairId?: string, audioText?: string) => {
    if (audioText) speakText(audioText);

    if (!selectedItem) {
      setSelectedItem(id);
    } else if (selectedItem === id) {
      setSelectedItem(null);
    } else {
      // Find items
      const first = currentActivity.items.find(i => i.id === selectedItem);
      const second = currentActivity.items.find(i => i.id === id);

      if (first && second && (first.matchPairId === second.id || second.matchPairId === first.id || first.id === second.id)) {
        // Success match
        const newPairs = [...matchedPairs, first.id, second.id];
        setMatchedPairs(newPairs);
        setSelectedItem(null);
        speakText('Muito bem! Você acertou!');

        if (newPairs.length >= currentActivity.items.length) {
          handleVictory();
        }
      } else {
        // Soft encouraging response
        speakText('Quase lá! Vamos tentar outro par.');
        setSelectedItem(null);
      }
    }
  };

  // Game 2 Memory Game Logic (8 Cards)
  const memoryCards = [
    { id: 1, label: 'Feliz', emoji: '😊', audio: 'Expressão de Alegria' },
    { id: 2, label: 'Feliz', emoji: '😊', audio: 'Expressão de Alegria' },
    { id: 3, label: 'Calmo', emoji: '😌', audio: 'Expressão de Calma' },
    { id: 4, label: 'Calmo', emoji: '😌', audio: 'Expressão de Calma' },
    { id: 5, label: 'Pensativo', emoji: '🤔', audio: 'Expressão de Dúvida' },
    { id: 6, label: 'Pensativo', emoji: '🤔', audio: 'Expressão de Dúvida' },
    { id: 7, label: 'Surpreso', emoji: '😲', audio: 'Expressão de Surpresa' },
    { id: 8, label: 'Surpreso', emoji: '😲', audio: 'Expressão de Surpresa' },
  ];

  const handleFlipCard = (index: number, card: typeof memoryCards[0]) => {
    if (memoryMatched.includes(index) || memoryFlipped.includes(index)) return;
    speakText(card.audio);

    if (memoryFlipped.length === 0) {
      setMemoryFlipped([index]);
    } else if (memoryFlipped.length === 1) {
      const firstIdx = memoryFlipped[0];
      const firstCard = memoryCards[firstIdx];
      setMemoryFlipped([firstIdx, index]);

      if (firstCard.label === card.label) {
        // Match found!
        const newMatched = [...memoryMatched, firstIdx, index];
        setMemoryMatched(newMatched);
        setMemoryFlipped([]);
        speakText('Excelente! Encontrou o par de ' + card.label);

        if (newMatched.length >= memoryCards.length) {
          handleVictory();
        }
      } else {
        setTimeout(() => {
          setMemoryFlipped([]);
        }, 1200);
      }
    }
  };

  // PECS Board Add Tile Logic
  const handleAddPecsTile = (item: typeof DEMO_ACTIVITIES[3]['items'][0]) => {
    speakText(item.audioText || item.label);
    setPecsSentence(prev => [...prev, { id: item.id, label: item.label, emoji: item.emoji, audioText: item.audioText || item.label }]);
  };

  const handleSpeakPecsSentence = () => {
    if (pecsSentence.length === 0) return;
    const fullText = pecsSentence.map(p => p.audioText).join(' ');
    speakText('Frase montada: ' + fullText);
  };

  const handleVictory = () => {
    setIsCompleted(true);
    speakText('Parabéns! Você completou a atividade com sucesso e ganhou 10 estrelas!');
    setStudent(prev => ({
      ...prev,
      stars: prev.stars + 10,
      trophies: prev.trophies + 1
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white border-2 border-amber-200 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6 max-h-[92vh] flex flex-col justify-between">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center text-2xl font-bold shadow-xs">
              🦉
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  {world.name}
                </h3>
                <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-[10px] font-extrabold uppercase shadow-xs">
                  Jogo Ativo
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500">
                {currentActivity.title} | {currentActivity.items.length} itens interativos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-2xl bg-slate-100 border border-slate-200 transition shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Play Game vs PECS Board vs Respiração Calma */}
        <div className="flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs font-bold">
          
          <div className="flex items-center space-x-2">
            {[
              { id: 'play', label: 'Atividade Principal', icon: Play },
              { id: 'pecs', label: 'Prancha de Comunicação PECS', icon: Heart },
              { id: 'calm', label: 'Pausa & Respiração Calma', icon: Sparkles }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabGame(tab.id as any)}
                  className={`px-3.5 py-2 rounded-2xl font-extrabold transition border flex items-center space-x-1.5 shadow-xs ${
                    activeTabGame === tab.id
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-200'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Activity Switcher buttons */}
          <div className="flex items-center space-x-1 text-slate-600 font-bold">
            <span className="mr-1">Outro jogo:</span>
            {DEMO_ACTIVITIES.map((act, idx) => (
              <button
                key={act.id}
                onClick={() => setSelectedGameIndex(idx)}
                className={`px-2.5 py-1 rounded-xl font-extrabold border transition shadow-xs ${
                  selectedGameIndex === idx
                    ? 'bg-amber-400 text-amber-950 border-amber-500'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                #{idx + 1}
              </button>
            ))}
          </div>

        </div>

        {/* GAME CONTENT STAGE */}
        <div className="flex-1 overflow-y-auto border border-sky-100 rounded-3xl p-6 bg-gradient-to-b from-sky-50/60 to-amber-50/40 flex flex-col justify-center items-center relative min-h-[320px]">
          
          {/* Victory Overlay */}
          {isCompleted && (
            <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in shadow-2xl">
              <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center text-5xl shadow-lg animate-bounce">
                ⭐
              </div>
              <h4 className="font-serif font-bold text-3xl text-slate-900">Muito bem, {student.nickname}!</h4>
              <p className="text-sm text-slate-600 font-medium max-w-md">
                Você concluiu a atividade com sucesso! Ganhou +10 estrelinhas para sua coleção.
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <button
                  onClick={() => {
                    setIsCompleted(false);
                    setMatchedPairs([]);
                    setMemoryFlipped([]);
                    setMemoryMatched([]);
                  }}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs uppercase rounded-2xl transition shadow-md shadow-emerald-200"
                >
                  Jogar Novamente
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs uppercase rounded-2xl border border-slate-300 transition"
                >
                  Voltar ao Mapa
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: MAIN GAMEPLAY STAGE */}
          {activeTabGame === 'play' && (
            <div className="w-full space-y-6">
              
              {/* Audio Instruction Speaker */}
              <div className="p-4 bg-white border border-sky-200 rounded-2xl flex items-center justify-between gap-4 text-xs text-slate-800 shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-amber-100 text-amber-900 rounded-xl border border-amber-300 shadow-xs cursor-pointer hover:bg-amber-200 transition" onClick={() => speakText(currentActivity.instructionAudioText)}>
                    <Volume2 className="w-5 h-5 text-amber-700" />
                  </div>
                  <span className="font-semibold text-slate-800">{currentActivity.instructionAudioText}</span>
                </div>

                <button
                  onClick={() => speakText(currentActivity.instructionAudioText)}
                  className="px-3.5 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 border border-amber-500 rounded-xl transition font-extrabold shrink-0 shadow-xs"
                >
                  Ouvir Instrução
                </button>
              </div>

              {/* GAME TYPE 1: MATCHING (Vowels & Images) */}
              {currentActivity.gameType === 'matching' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  {currentActivity.items.map((item) => {
                    const isMatched = matchedPairs.includes(item.id);
                    const isSelected = selectedItem === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectMatchingItem(item.id, item.matchPairId, item.audioText)}
                        disabled={isMatched}
                        className={`p-6 rounded-3xl border-2 text-center transition duration-300 flex flex-col items-center justify-center space-y-2 relative shadow-md ${
                          isMatched
                            ? 'bg-emerald-100/90 border-emerald-500 text-emerald-900 opacity-80'
                            : isSelected
                            ? 'bg-amber-100 border-amber-500 shadow-xl scale-105'
                            : 'bg-white hover:bg-amber-50/80 border-slate-200 hover:border-emerald-400'
                        }`}
                      >
                        <span className="text-5xl">{item.emoji}</span>
                        <strong className="font-serif font-bold text-xl text-slate-900">{item.label}</strong>
                        {isMatched && (
                          <span className="absolute top-2 right-2 p-1 bg-emerald-500 text-white rounded-full shadow-xs">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* GAME TYPE 2: MEMORY GAME */}
              {currentActivity.gameType === 'memory_game' && (
                <div className="grid grid-cols-4 gap-3 pt-2">
                  {memoryCards.map((card, idx) => {
                    const isFlipped = memoryFlipped.includes(idx) || memoryMatched.includes(idx);

                    return (
                      <button
                        key={idx}
                        onClick={() => handleFlipCard(idx, card)}
                        className={`h-24 rounded-2xl border-2 text-center transition duration-300 flex flex-col items-center justify-center space-y-1 text-xs shadow-sm ${
                          isFlipped
                            ? 'bg-amber-100 border-amber-400 text-slate-900'
                            : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        {isFlipped ? (
                          <>
                            <span className="text-3xl">{card.emoji}</span>
                            <span className="font-extrabold text-[11px] text-amber-900">{card.label}</span>
                          </>
                        ) : (
                          <span className="text-2xl font-serif text-slate-400">❓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* GAME TYPE 3: AUDIO RECOGNITION */}
              {currentActivity.gameType === 'audio_recognition' && (
                <div className="space-y-4 text-center">
                  <button
                    onClick={() => speakText('Au Au! Qual animal faz este som?')}
                    className="px-6 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-xs rounded-2xl border border-amber-300 transition inline-flex items-center space-x-2 shadow-xs"
                  >
                    <Volume2 className="w-5 h-5 text-amber-700" />
                    <span>Tocar Som Novamente ("Au Au!")</span>
                  </button>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {currentActivity.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.isCorrect) {
                            handleVictory();
                          } else {
                            speakText('Quase lá! Tente ouvir novamente.');
                          }
                        }}
                        className="p-6 bg-white hover:bg-amber-50 border-2 border-slate-200 hover:border-emerald-400 rounded-3xl text-center space-y-2 transition shadow-md"
                      >
                        <span className="text-5xl block">{item.emoji}</span>
                        <strong className="font-serif font-bold text-lg text-slate-900 block">{item.label}</strong>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: PECS COMMUNICATION BOARD */}
          {activeTabGame === 'pecs' && (
            <div className="w-full space-y-6">
              <div className="text-center space-y-1">
                <h4 className="font-serif font-bold text-xl text-slate-900">Prancha PECS de Comunicação Alternativa</h4>
                <p className="text-xs font-semibold text-slate-600">Toque nos cartões para montar sua frase e comunicar seus desejos em voz alta!</p>
              </div>

              {/* Sentence Assembly Strip */}
              <div className="p-4 bg-white border border-sky-200 rounded-2xl flex items-center justify-between gap-4 min-h-[64px] shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  {pecsSentence.length === 0 ? (
                    <span className="text-xs text-slate-400 italic font-medium">Sua frase aparecerá aqui...</span>
                  ) : (
                    pecsSentence.map((tile, i) => (
                      <span key={i} className="px-3 py-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-extrabold flex items-center space-x-1 shadow-xs">
                        <span>{tile.emoji}</span>
                        <span>{tile.label}</span>
                      </span>
                    ))
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSpeakPecsSentence}
                    disabled={pecsSentence.length === 0}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-white text-xs font-extrabold rounded-xl transition flex items-center space-x-1.5 shadow-sm"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Falar Frase</span>
                  </button>
                  <button
                    onClick={() => setPecsSentence([])}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 text-xs font-bold"
                  >
                    Limpar
                  </button>
                </div>
              </div>

              {/* PECS Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DEMO_ACTIVITIES[3].items.map((tile) => (
                  <button
                    key={tile.id}
                    onClick={() => handleAddPecsTile(tile)}
                    className="p-4 bg-white hover:bg-sky-50 border-2 border-slate-200 hover:border-sky-400 rounded-2xl text-center space-y-1 transition text-xs shadow-sm"
                  >
                    <span className="text-4xl block">{tile.emoji}</span>
                    <strong className="text-slate-900 block font-bold">{tile.label}</strong>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CALM / GUIDED BREATHING */}
          {activeTabGame === 'calm' && (
            <div className="text-center space-y-6 max-w-md mx-auto py-4">
              <div className="p-3 bg-amber-100 border border-amber-300 text-amber-900 rounded-2xl text-xs font-bold">
                <span>Pausa para Autorregulação: Vamos respirar juntos devagar!</span>
              </div>

              <div className="w-40 h-40 mx-auto rounded-full bg-emerald-100 border-4 border-emerald-400 flex items-center justify-center animate-pulse shadow-inner">
                <span className="text-5xl">🧘‍♂️</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-serif font-bold text-2xl text-slate-900">Inspire... Espire...</h4>
                <p className="text-slate-600 text-xs font-medium">Sinta a calmaria do seu corpo antes de continuar jogando.</p>
              </div>

              <button
                onClick={() => setActiveTabGame('play')}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold uppercase rounded-2xl transition shadow-md shadow-emerald-200"
              >
                Voltar ao Jogo
              </button>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-slate-600 font-bold shrink-0 border-t border-slate-100 pt-3">
          <span>Estrelas Acumuladas: ⭐ {student.stars}</span>
          <span className="text-slate-500 text-[10px]">Sem limite de tempo • Reforço Positivo Contínuo</span>
        </div>

      </div>
    </div>
  );
};
