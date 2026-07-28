import React, { useState } from "react";
import { 
  Shuffle, ChevronLeft, ChevronRight, Heart, Mic, Edit3, Image, 
  RotateCw, Check, Sparkles, MessageCircle, HelpCircle, Save
} from "lucide-react";
import { REFLECTIVE_CARDS } from "./mockData";
import { ReflectiveCard } from "./types";

interface ReflectiveCardDeckProps {
  isPsychologistView?: boolean;
  onSaveSnapshot?: (stateName: string) => void;
}

export const ReflectiveCardDeck: React.FC<ReflectiveCardDeckProps> = ({
  isPsychologistView = true,
  onSaveSnapshot
}) => {
  const [cards, setCards] = useState<ReflectiveCard[]>(REFLECTIVE_CARDS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(true);
  const [responseMode, setResponseMode] = useState<"voice" | "text" | "draw" | null>(null);
  const [textAnswer, setTextAnswer] = useState<string>("");
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Todas");

  const currentCard = cards[currentIndex] || cards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
      setIsFlipped(true);
      setResponseMode(null);
      setTextAnswer("");
    }, 250);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
      setIsFlipped(true);
      setResponseMode(null);
      setTextAnswer("");
    }, 250);
  };

  const shuffleDeck = () => {
    setIsFlipped(false);
    setTimeout(() => {
      const shuffled = [...cards].sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setCurrentIndex(0);
      setIsFlipped(true);
    }, 250);
  };

  const toggleRecording = () => {
    setIsRecordingVoice(!isRecordingVoice);
  };

  const saveAnswerNote = () => {
    if (textAnswer.trim()) {
      setSavedNotes(prev => [...prev, `[Carta: ${currentCard.category}] ${textAnswer}`]);
      setTextAnswer("");
      if (onSaveSnapshot) onSaveSnapshot(`Resposta_Carta_${currentCard.category}`);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 font-sans text-[#2F3142]">
      {/* Top Deck Bar */}
      <div className="bg-white border border-[#E7E5F0] rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#7567E8] bg-[#7567E8]/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
            Baralho Terapêutico
          </span>
          <span className="text-xs text-[#73768B]">
            Carta {currentIndex + 1} de {cards.length}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={shuffleDeck}
            className="px-3 py-1.5 bg-[#F7F6FB] hover:bg-[#E7E5F0] text-[#2F3142] rounded-lg font-medium flex items-center gap-1.5 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#7567E8]" />
            Embaralhar
          </button>
        </div>
      </div>

      {/* Main Card View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Card 3D Frame */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[380px]">
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative w-full max-w-sm h-80 rounded-2xl cursor-pointer perspective-1000 group transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className={`relative w-full h-full rounded-2xl p-6 flex flex-col justify-between shadow-xl border-2 transition-all duration-500 transform-style-preserve-3d ${
              isFlipped 
                ? "bg-gradient-to-br from-[#7567E8] to-[#5E9FD6] text-white border-white/20" 
                : "bg-white border-[#E7E5F0] text-[#2F3142]"
            }`}>
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                  isFlipped ? "bg-white/20 text-white" : "bg-[#7567E8]/10 text-[#7567E8]"
                }`}>
                  {currentCard.category}
                </span>
                <Sparkles className={`w-5 h-5 ${isFlipped ? "text-yellow-200" : "text-[#7567E8]"}`} />
              </div>

              {/* Card Question */}
              <div className="my-auto text-center px-2">
                <p className="font-semibold text-lg sm:text-xl leading-relaxed">
                  "{currentCard.question}"
                </p>
                {currentCard.hint && (
                  <p className={`text-xs mt-3 italic ${isFlipped ? "text-white/80" : "text-[#73768B]"}`}>
                    💡 Dica: {currentCard.hint}
                  </p>
                )}
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between text-xs opacity-90">
                <span>{currentCard.ageRange}</span>
                <span className="flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" />
                  Clique para virar
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="p-3 bg-white border border-[#E7E5F0] hover:bg-[#7567E8] hover:text-white text-[#2F3142] rounded-full shadow-sm transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold text-[#73768B]">
              {currentIndex + 1} / {cards.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 bg-[#7567E8] text-white hover:bg-[#6253D6] rounded-full shadow-sm transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Interactive Answer Options */}
        <div className="lg:col-span-5 bg-white border border-[#E7E5F0] rounded-xl p-5 shadow-sm flex flex-col gap-4">
          <div>
            <h4 className="font-bold text-sm text-[#2F3142]">Como o paciente deseja responder?</h4>
            <p className="text-xs text-[#73768B] mt-0.5">Escolha uma forma de expressão para esta pergunta.</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "voice", icon: Mic, label: "Em Voz Alta", color: "bg-[#5E9FD6]" },
              { id: "text", icon: Edit3, label: "Escrever", color: "bg-[#7567E8]" },
              { id: "draw", icon: Image, label: "Desenhar", color: "bg-[#64B89A]" }
            ].map(m => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setResponseMode(m.id as any)}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    responseMode === m.id
                      ? "border-[#7567E8] bg-[#7567E8]/10 font-bold text-[#7567E8]"
                      : "border-[#E7E5F0] text-[#73768B] hover:bg-[#F7F6FB]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Response Mode Input Panel */}
          {responseMode === "voice" && (
            <div className="bg-[#F7F6FB] border border-[#E7E5F0] p-4 rounded-xl flex flex-col items-center justify-center text-center gap-3 animate-fade-in">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isRecordingVoice ? "bg-red-500 text-white animate-pulse" : "bg-[#5E9FD6] text-white"
              }`}>
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-xs text-[#2F3142]">
                  {isRecordingVoice ? "Gravando áudio em tempo real..." : "Ouvindo resposta do paciente"}
                </p>
                <p className="text-[11px] text-[#73768B] mt-0.5">Microfone simulado ativo na sala.</p>
              </div>
              <button
                onClick={toggleRecording}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  isRecordingVoice ? "bg-red-100 text-red-600" : "bg-[#5E9FD6] text-white"
                }`}
              >
                {isRecordingVoice ? "Parar Gravador" : "Iniciar Escuta"}
              </button>
            </div>
          )}

          {responseMode === "text" && (
            <div className="flex flex-col gap-2 animate-fade-in">
              <textarea
                rows={3}
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder="Digite a resposta ou reflexão verbal do paciente..."
                className="w-full text-xs p-3 border border-[#E7E5F0] rounded-xl focus:outline-none focus:border-[#7567E8] bg-[#F7F6FB]"
              />
              <button
                onClick={saveAnswerNote}
                className="py-2 bg-[#7567E8] text-white rounded-xl text-xs font-bold hover:bg-[#6253D6] transition-colors flex items-center justify-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                Salvar Resposta
              </button>
            </div>
          )}

          {responseMode === "draw" && (
            <div className="bg-[#64B89A]/10 border border-[#64B89A]/30 p-3 rounded-xl text-xs text-[#2A755A] flex items-center gap-2 animate-fade-in">
              <Image className="w-4 h-4 text-[#64B89A]" />
              <span>Você pode alternar para a ferramenta de Desenho Livre para expressar visualmente.</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-2 border-t border-[#E7E5F0] flex items-center justify-between text-xs">
            <button
              onClick={handleNext}
              className="text-[#73768B] hover:text-[#2F3142] font-medium transition-colors"
            >
              Pular esta pergunta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
