import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { 
  Sparkles, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  Star, 
  Smile, 
  Sun, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  MessageSquare, 
  HelpCircle, 
  Baby, 
  FileText, 
  Layers, 
  Volume2, 
  Tv, 
  Heart, 
  Play, 
  Gift, 
  Clock, 
  ArrowUpRight,
  Sparkle,
  Bookmark,
  Users,
  GraduationCap
} from "lucide-react";

// Interactive Counter Component
interface CounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

function Counter({ value, duration = 2000, prefix = "", suffix = "", decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easedProgress = progress * (2 - progress);
      const currentValue = startValue + easedProgress * (value - startValue);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(value);
      }
    };

    const animFrame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animFrame);
  }, [isInView, value, duration]);

  const formatted = count.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={elementRef} className="tabular-nums font-extrabold text-stone-900">
      {prefix}{formatted}{suffix}
    </span>
  );
}

// Custom Cartoon-Style Animated Bee Component
const CartoonBee = ({ scaleX = 1 }: { scaleX?: number }) => (
  <div 
    className="relative select-none pointer-events-none filter drop-shadow-md transition-transform duration-300" 
    style={{ transform: `scaleX(${scaleX})` }}
  >
    <svg width="76" height="66" viewBox="0 0 76 66" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Small Cute Black Stinger at the Right back (faces Left natively) */}
      <path d="M 58 31 L 70 33 L 58 35 Z" fill="#1C1917" stroke="#1C1917" strokeWidth="2.5" strokeLinejoin="round" />
      
      {/* Chubby Yellow Body with rounded stripes */}
      <rect x="18" y="14" width="42" height="34" rx="17" fill="#FBBF24" stroke="#1C1917" strokeWidth="3" />
      
      {/* Black Stripes */}
      <path d="M 32 14.5 C 32 14.5, 33 28, 31 47.5" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />
      <path d="M 42 14.5 C 42 14.5, 43 28, 41 47.5" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />
      <path d="M 51 16 C 51 16, 52 28, 51 46" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />
      
      {/* Head on the left (since it faces Left natively) */}
      <circle cx="15" cy="31" r="13" fill="#FBBF24" stroke="#1C1917" strokeWidth="3" />
      
      {/* Rosy blush cheeks */}
      <circle cx="17" cy="35" r="3.5" fill="#F43F5E" opacity="0.7" />
      
      {/* Big beautiful shiny cartoon eye */}
      <circle cx="11" cy="26" r="4.5" fill="#1C1917" />
      {/* Eye shine glints */}
      <circle cx="9.5" cy="24.5" r="1.5" fill="#FFFFFF" />
      <circle cx="12" cy="27.5" r="0.7" fill="#FFFFFF" />
      
      {/* Cute happy smile */}
      <path d="M 8 33 Q 11 37 14 33" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      
      {/* Two sweet antennae with round tips */}
      <path d="M 16 18 C 14 12, 9 11, 9 11" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="8" cy="10" r="3" fill="#1C1917" />
      
      <path d="M 21 18 C 22 11, 20 8, 18 7" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="17" cy="6" r="3" fill="#1C1917" />
      
      {/* Flapping Wings on top */}
      <g className="animate-wing-flap" style={{ transformOrigin: "34px 18px" }}>
        {/* Back wing */}
        <ellipse cx="32" cy="8" rx="7" ry="11" fill="#E2E8F0" opacity="0.8" stroke="#1C1917" strokeWidth="2.5" transform="rotate(-15 32 8)" />
        {/* Front wing */}
        <ellipse cx="39" cy="6" rx="8" ry="13" fill="#FFFFFF" opacity="0.95" stroke="#1C1917" strokeWidth="2.5" transform="rotate(10 39 6)" />
      </g>
    </svg>
    
    {/* Sparkle pollen trail behind */}
    <div className="absolute -right-3 top-1/2 -translate-y-1/2 flex flex-col space-y-1">
      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
      <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" style={{ animationDelay: "0.2s" }} />
    </div>
  </div>
);

function FlyingBees() {
  const [beePhase, setBeePhase] = useState<"none" | "single" | "double">("none");

  useEffect(() => {
    // Phase 1: Single bee flies right to left
    setBeePhase("single");

    // Phase 2: Double bees enter after single bee exits (approx 13s)
    const timerToDouble = setTimeout(() => {
      setBeePhase("double");
    }, 14000);

    const loop = setInterval(() => {
      setBeePhase("none");
      
      setTimeout(() => {
        setBeePhase("single");
      }, 800);

      setTimeout(() => {
        setBeePhase("double");
      }, 14000);
    }, 28000); // Loops every 28s

    return () => {
      clearTimeout(timerToDouble);
      clearInterval(loop);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {beePhase === "single" && (
          <motion.div
            key="single-bee"
            className="absolute top-0 left-0"
            initial={{ x: "115vw", y: "45vh", rotate: 0 }}
            animate={{
              x: ["115vw", "85vw", "55vw", "30vw", "10vw", "-20vw"],
              y: ["45vh", "20vh", "55vh", "15vh", "48vh", "30vh"],
              rotate: [0, -12, 15, -18, 12, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 12,
              ease: "easeInOut",
            }}
          >
            <CartoonBee scaleX={1} />
          </motion.div>
        )}

        {beePhase === "double" && (
          <React.Fragment key="double-bees">
            {/* Bee A: Left to Right (flipped) */}
            <motion.div
              className="absolute top-0 left-0"
              initial={{ x: "-20vw", y: "30vh", rotate: 0 }}
              animate={{
                x: ["-20vw", "25vw", "55vw", "85vw", "115vw"],
                y: ["30vh", "50vh", "22vh", "60vh", "35vh"],
                rotate: [0, 15, -12, 18, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 11,
                ease: "easeInOut",
              }}
            >
              <CartoonBee scaleX={-1} />
            </motion.div>

            {/* Bee B: Right to Left (not flipped) */}
            <motion.div
              className="absolute top-0 left-0"
              initial={{ x: "115vw", y: "65vh", rotate: 0 }}
              animate={{
                x: ["115vw", "80vw", "45vw", "15vw", "-20vw"],
                y: ["65vh", "28vh", "52vh", "20vh", "40vh"],
                rotate: [0, -15, 10, -20, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 11,
                ease: "easeInOut",
              }}
            >
              <CartoonBee scaleX={1} />
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </div>
  );
}

// Cute Floating Clouds
const SmilingCloud = ({ className, delay = 0, style }: { className?: string, delay?: number, style?: React.CSSProperties }) => (
  <motion.div 
    className={`absolute pointer-events-none select-none filter drop-shadow-sm ${className}`}
    animate={{
      y: [0, -8, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
    style={style}
  >
    <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 45C20 45 15 45 12 42C5 35 7 24 16 22C16 22 18 10 32 8C46 6 52 18 52 18C52 18 58 10 72 12C86 14 88 28 85 34C92 35 96 41 94 48C92 55 82 56 75 54C75 54 40 58 20 45Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
      {/* Cute eyes */}
      <circle cx="42" cy="28" r="2" fill="#475569" />
      <circle cx="54" cy="28" r="2" fill="#475569" />
      {/* Blush */}
      <circle cx="39" cy="31" r="1.5" fill="#FDA4AF" />
      <circle cx="57" cy="31" r="1.5" fill="#FDA4AF" />
      {/* Happy mouth */}
      <path d="M46 32 Q 48 34 50 32" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  </motion.div>
);

// Cute Rotating Happy Sun
const SmilingSun = () => (
  <div className="absolute top-16 right-16 w-24 h-24 pointer-events-none select-none filter drop-shadow-md z-10 hidden md:block">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0"
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Rays */}
        <g stroke="#F59E0B" strokeWidth="4" strokeLinecap="round">
          <line x1="50" y1="10" x2="50" y2="22" />
          <line x1="50" y1="78" x2="50" y2="90" />
          <line x1="10" y1="50" x2="22" y2="50" />
          <line x1="78" y1="50" x2="90" y2="50" />
          <line x1="22" y1="22" x2="31" y2="31" />
          <line x1="69" y1="69" x2="78" y2="78" />
          <line x1="22" y1="78" x2="31" y2="69" />
          <line x1="69" y1="31" x2="78" y2="22" />
        </g>
      </svg>
    </motion.div>
    <div className="absolute inset-4 bg-amber-400 rounded-full border-4 border-amber-500 flex items-center justify-center shadow-inner">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cute Face */}
        <circle cx="14" cy="16" r="2" fill="#78350F" />
        <circle cx="26" cy="16" r="2" fill="#78350F" />
        {/* Blush */}
        <circle cx="11" cy="20" r="1.5" fill="#EF4444" opacity="0.6" />
        <circle cx="29" cy="20" r="1.5" fill="#EF4444" opacity="0.6" />
        {/* Happy smile */}
        <path d="M 16 22 Q 20 26 24 22" stroke="#78350F" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  </div>
);

// Data models
interface AgeTrack {
  age: string;
  title: string;
  subtitle: string;
  focus: string;
  icon: string;
  activityTitle: string;
  activityDesc: string;
  interactiveChallenge: {
    letter: string;
    word: string;
    translation: string;
    soundName: string;
    audioHint: string;
  };
}

export default function AlfabetizacaoInfantil({ onBack }: { onBack?: () => void }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedAge, setSelectedAge] = useState<string>("4-5");
  const [soundPlaying, setSoundPlaying] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Registration Form States
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [childName, setChildName] = useState("");
  const [childAgeInput, setChildAgeInput] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Timer for countdown
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const ageTracks: Record<string, AgeTrack> = {
    "3": {
      age: "3 Anos",
      title: "Despertar Fonológico",
      subtitle: "Estímulo sensorial de escuta ativa e reconhecimento de sons da natureza e rimas básicas.",
      focus: "Consciência auditiva e coordenação motora fina através de traçados livres.",
      icon: "🎈",
      activityTitle: "Brincadeira de Rimas",
      activityDesc: "Associe sons divertidos com animais fofos. O que rima com 'Gato'? Rato ou Sol?",
      interactiveChallenge: {
        letter: "A",
        word: "Abelha",
        translation: "Zzz... Zum-zum!",
        soundName: "/ah/",
        audioHint: "O som que fazemos quando nos surpreendemos: 'Ah!'"
      }
    },
    "4-5": {
      age: "4 a 5 Anos",
      title: "Método Fônico Ativo",
      subtitle: "Associação direta entre grafemas (letras) e fonemas (sons) com brincadeiras multissensoriais.",
      focus: "Compreensão do princípio alfabético e fusão de sílabas simples (Vogal + Consoante).",
      icon: "🌟",
      activityTitle: "Laboratório dos Sons",
      activityDesc: "Brinque de arrastar as sílabas virtuais para formar a palavra 'BOLO'.",
      interactiveChallenge: {
        letter: "B",
        word: "Bolo",
        translation: "Bum-bum!",
        soundName: "/buh/",
        audioHint: "O som de um tambor batendo ou balão estourando: 'Buh!'"
      }
    },
    "6-7": {
      age: "6 a 7 Anos",
      title: "Fluência e Leitura Autônoma",
      subtitle: "Treino rítmico para decodificação rápida e interpretação ativa de pequenas histórias ilustradas.",
      focus: "Formação de frases complexas, ortografia divertida e autonomia total na leitura.",
      icon: "📚",
      activityTitle: "Caçadores de Histórias",
      activityDesc: "Leia um pequeno conto de 3 linhas e ganhe estrelas virtuais ao responder o quiz.",
      interactiveChallenge: {
        letter: "L",
        word: "Livro",
        translation: "Lá-lá-lá!",
        soundName: "/lll/",
        audioHint: "O som da língua encostando no céu da boca para cantar: 'Lll...'"
      }
    },
    "8+": {
      age: "8+ Anos",
      title: "Ortografia e Redação Criativa",
      subtitle: "Superação de dificuldades ortográficas residuais (como X/CH, S/Z) e criação de historinhas autorais.",
      focus: "Gramática intuitiva, interpretação profunda de textos e autoconfiança escolar.",
      icon: "🚀",
      activityTitle: "Oficina do Escritor",
      activityDesc: "A criança digita sua própria aventura e o sistema ajuda a ilustrar as palavras mágicas.",
      interactiveChallenge: {
        letter: "R",
        word: "Rato",
        translation: "Rrrr-rawr!",
        soundName: "/rrr/",
        audioHint: "O som de um motor de carrinho acelerando ou gatinho ronronando: 'Rrr...'"
      }
    }
  };

  const handlePlaySound = (sound: string, text: string) => {
    setSoundPlaying(sound);
    // Simulate phonetic audio feedback with a subtle Web Audio API beep structure
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Play a lovely double chime representing learning sounds
      const playTone = (freq: number, start: number, duration: number, type: OscillatorType) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, start);
        
        gainNode.gain.setValueAtTime(0.15, start);
        gainNode.gain.exponentialRampToValueAtTime(0.001, start + duration);
        
        osc.start(start);
        osc.stop(start + duration);
      };
      
      if (sound === "letter") {
        playTone(392, audioCtx.currentTime, 0.25, "sine"); // G4
        playTone(523, audioCtx.currentTime + 0.15, 0.4, "sine"); // C5
      } else if (sound === "correct") {
        playTone(523, audioCtx.currentTime, 0.15, "triangle");
        playTone(659, audioCtx.currentTime + 0.1, 0.15, "triangle");
        playTone(784, audioCtx.currentTime + 0.2, 0.4, "triangle");
      } else {
        playTone(220, audioCtx.currentTime, 0.3, "sawtooth");
      }
    } catch (e) {
      console.log("Audio not supported or interaction needed first", e);
    }
    
    setTimeout(() => setSoundPlaying(null), 800);
  };

  const handleQuizAnswer = (option: string) => {
    setSelectedOption(option);
    const isCorrect = option === "Rato";
    setQuizAnswered(isCorrect);
    if (isCorrect) {
      setScore(prev => prev + 1);
      handlePlaySound("correct", "Muito bem!");
    } else {
      handlePlaySound("wrong", "Tente novamente!");
    }
  };

  const resetQuiz = () => {
    setQuizAnswered(null);
    setSelectedOption(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !parentPhone || !childName) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSuccess(true);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#FFFDF9] text-stone-900 font-sans overflow-x-hidden selection:bg-[#FFD580] selection:text-stone-900">
      
      {/* 100% Independent & Self-Looping Flying Bees Sequence */}
      <FlyingBees />
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.95; }
        }
        @keyframes wing-flap {
          0%, 100% { transform: scaleY(1) rotate(0deg); }
          50% { transform: scaleY(0.25) rotate(-18deg); }
        }
        .animate-wing-flap {
          animation: wing-flap 0.08s linear infinite;
        }
        .animate-float {
          animation: gentle-float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: gentle-float 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-spin-slow {
          animation: slow-spin 25s linear infinite;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-size: 24px 24px;
          background-image: 
            radial-gradient(circle, rgba(254, 215, 170, 0.25) 1.5px, transparent 1.5px);
        }
        .notebook-lines {
          background-color: #FFFDF9;
          background-image: linear-gradient(#e0f2fe 1.5px, transparent 1.5px);
          background-size: 100% 2.2rem;
          background-position: 0 1rem;
        }
        .kid-handdrawn {
          box-shadow: 4px 6px 0px #FF9800;
          border-radius: 24px;
        }
        .kid-handdrawn-pink {
          box-shadow: 4px 6px 0px #E91E63;
          border-radius: 24px;
        }
        .kid-handdrawn-indigo {
          box-shadow: 4px 6px 0px #4F46E5;
          border-radius: 24px;
        }
        .kid-bubble {
          border-radius: 30px 10px 30px 10px;
        }
      `}} />

      {/* Top Warning Banner: Alerting of scarcity of spots */}
      <div className="bg-[#4F46E5] text-white text-center py-2 px-4 text-xs font-semibold tracking-wide flex items-center justify-center space-x-2 relative z-50">
        <Sparkles className="h-4 w-4 animate-bounce text-amber-300 shrink-0" />
        <span className="truncate">Vagas limitadas para a turma de alfabetização infantil de Julho/2026 com 40% de Desconto!</span>
        <span className="hidden sm:inline bg-amber-400 text-stone-900 text-[10px] uppercase font-black px-2 py-0.5 rounded ml-2">URGENTE</span>
      </div>

      {/* Premium Playful Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FFFDF9]/90 backdrop-blur-md border-b border-orange-100 py-4 px-6 md:px-12 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo with dynamic return */}
          <div className="flex items-center space-x-3 select-none">
            {onBack && (
              <button 
                onClick={onBack}
                className="h-9 w-9 rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100 flex items-center justify-center transition-colors border border-orange-200 cursor-pointer"
                title="Voltar ao Portfólio"
                id="back-to-portfolio"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#FF9800] to-[#E91E63] flex items-center justify-center shadow-md shadow-orange-200 text-white font-black text-xl">
                A
              </div>
              <div className="text-left">
                <span className="font-serif font-black tracking-tight text-lg text-stone-800 block leading-tight">
                  Aventuras da
                </span>
                <span className="font-mono text-orange-600 font-extrabold text-[10px] tracking-wider uppercase block leading-none">
                  Alfabetização Ativa
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Links and Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-stone-600">
            <a href="#metodo" className="hover:text-orange-500 transition-colors">Método</a>
            <a href="#simulador" className="hover:text-orange-500 transition-colors">Laboratório Interativo</a>
            <a href="#conteudo" className="hover:text-orange-500 transition-colors">O que Vem no Kit</a>
            <a href="#depoimentos" className="hover:text-orange-500 transition-colors">Histórias de Sucesso</a>
            <a href="#faq" className="hover:text-orange-500 transition-colors">Dúvidas Comuns</a>
          </nav>

          {/* Call-to-action Button in Header */}
          <div className="flex items-center space-x-4">
            <a
              href="#inscricao"
              className="py-2.5 px-5 rounded-full bg-[#E91E63] hover:bg-[#D81B60] text-white text-xs font-bold tracking-wide transition-all shadow-md hover:shadow-lg hover:scale-105 duration-200 cursor-pointer text-center whitespace-nowrap"
            >
              Matricular Meu Filho
            </a>
          </div>

        </div>
      </header>

      {/* HERO SECTION: VISUALLY STUNNING PLAYFUL & PREMIUM SPLIT */}
      <section className="relative py-12 md:py-20 lg:py-28 bg-[#FFFBF0] overflow-hidden border-b border-orange-100 bg-grid-pattern">
        
        {/* Adorable Smiling Sun & Drift Clouds for Childish Theme */}
        <SmilingSun />
        <SmilingCloud className="top-10 left-8" delay={0.2} />
        <SmilingCloud className="top-24 right-1/3 hidden md:block" delay={2.5} />
        <SmilingCloud className="bottom-16 left-12 hidden lg:block" delay={1.4} />
        <SmilingCloud className="bottom-8 right-16" delay={4.2} />

        {/* Playful Floating Kid Elements */}
        <div className="absolute top-1/3 right-12 text-3xl animate-float pointer-events-none select-none">🌈</div>
        <div className="absolute bottom-1/4 left-1/4 text-3xl animate-float-delayed pointer-events-none select-none">🎨</div>
        <div className="absolute top-10 right-1/4 text-3xl animate-float pointer-events-none select-none">🎈</div>
        <div className="absolute bottom-1/3 left-4 text-3xl animate-float pointer-events-none select-none">🧸</div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Editorial Text & Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left relative">
              
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-amber-100 border border-amber-300 text-amber-800 font-mono text-[10px] uppercase tracking-wider font-extrabold rounded-full shadow-sm animate-float">
                <Sun className="h-4 w-4 text-orange-500 animate-spin" style={{ animationDuration: "12s" }} />
                <span>Método Recomendado por Pedagogos e Neurocientistas</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 leading-[1.15] tracking-tight">
                  <span className="inline-block hover:scale-105 transition-transform cursor-default select-none">
                    <span className="text-[#FF2E93]">A</span>
                    <span className="text-[#FF9800]">l</span>
                    <span className="text-[#4F46E5]">f</span>
                    <span className="text-[#10B981]">a</span>
                    <span className="text-[#E91E63]">b</span>
                    <span className="text-[#06B6D4]">e</span>
                    <span className="text-[#EC4899]">t</span>
                    <span className="text-[#8B5CF6]">i</span>
                    <span className="text-[#F59E0B]">z</span>
                    <span className="text-[#D946EF]">e</span>
                  </span> seu filho brincando em <br />
                  <span className="text-[#FF9800] relative inline-block">
                    até 12 semanas!
                    <span className="absolute bottom-1 left-0 right-0 h-[4px] bg-pink-400 rounded-full" />
                  </span>
                </h1>
                <p className="font-sans text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl font-light">
                  Sem brigas, lágrimas ou telas nocivas. Uma jornada de aprendizado afetivo baseada no <strong>Método Fônico Multissensorial</strong> para crianças de 3 a 8 anos aprenderem a ler e escrever com diversão e confiança absoluta.
                </p>
              </div>

              {/* High Conversion Trust Signals / Dynamic Counter */}
              <div className="grid grid-cols-3 gap-4 py-4 max-w-lg border-t border-b border-orange-200/50">
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 block">
                    <Counter value={14800} suffix="+" />
                  </div>
                  <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">Crianças Alfabetizadas</span>
                </div>
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 block">
                    <Counter value={99.4} suffix="%" decimals={1} />
                  </div>
                  <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">Satisfação dos Pais</span>
                </div>
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 block">
                    <Counter value={12} suffix=" Sem" />
                  </div>
                  <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">Média de Alfabetização</span>
                </div>
              </div>

              {/* Call-to-actions in Hero */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="#inscricao"
                  className="py-4 px-8 rounded-full bg-[#E91E63] hover:bg-[#D81B60] text-white text-base font-bold tracking-wide transition-all shadow-lg hover:shadow-pink-200 hover:scale-105 duration-200 cursor-pointer text-center flex items-center justify-center space-x-2"
                >
                  <span>Aproveitar Desconto de 40%</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
                
                <a
                  href="#simulador"
                  className="py-4 px-6 rounded-full bg-white border-2 border-orange-300 text-orange-600 hover:bg-orange-50 text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer text-center flex items-center justify-center space-x-2"
                >
                  <span>Experimentar Simulador</span>
                  <Play className="h-4 w-4 fill-orange-600 text-orange-600" />
                </a>
              </div>

              {/* Guarantee and Security labels */}
              <div className="flex items-center space-x-4 pt-2 text-stone-500 text-xs">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>Garantia de 7 dias</span>
                </span>
                <span className="text-stone-300">•</span>
                <span className="flex items-center space-x-1">
                  <Heart className="h-4 w-4 text-red-400 fill-red-400" />
                  <span>Ambiente 100% Seguro</span>
                </span>
              </div>

            </div>

            {/* Right Editorial Playful Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[340px] sm:max-w-[380px] lg:max-w-none">
                
                {/* Visual circle frame background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-200 to-pink-200 rounded-[40px] rotate-6 scale-95" />
                
                <div className="relative bg-white border-4 border-orange-200 rounded-[36px] overflow-hidden shadow-2xl p-4 transition-transform duration-500 hover:scale-[1.02]">
                  
                  {/* Beautiful Image of children learning to read/write */}
                  <img 
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80" 
                    alt="Crianças sorrindo lendo livros coloridos de alfabetização" 
                    className="w-full h-64 sm:h-80 object-cover rounded-[24px]"
                    referrerPolicy="no-referrer"
                  />

                  {/* Playful Float Badge Over the Image */}
                  <div className="absolute top-8 right-8 bg-white/95 border-2 border-yellow-400 rounded-2xl px-3 py-2 text-center shadow-lg animate-float-delayed">
                    <span className="block text-2xl">🧸</span>
                    <span className="font-serif font-black text-xs text-stone-800">Aprenda Ativo</span>
                    <span className="block text-[8px] font-mono text-stone-500 uppercase">Sem Monotonia</span>
                  </div>

                  <div className="absolute bottom-8 left-8 bg-[#4F46E5] text-white rounded-xl px-4 py-2 flex items-center space-x-2.5 shadow-xl">
                    <Volume2 className="h-5 w-5 animate-bounce text-yellow-300" />
                    <div>
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-yellow-300">Áudio Interativo</span>
                      <span className="block font-bold text-[11px] leading-none">Método Fonético</span>
                    </div>
                  </div>

                </div>

                {/* Decorative letters orbiting around */}
                <div className="absolute -top-6 -left-6 h-12 w-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-serif text-xl font-black shadow-lg animate-float">B</div>
                <div className="absolute -bottom-6 -right-4 h-12 w-12 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center font-serif text-xl font-black shadow-lg animate-float-delayed">O</div>
                <div className="absolute top-1/2 -left-8 h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-serif text-lg font-black shadow-lg animate-float">A</div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* METHODOLOGY: WHY ACTIVE PHONETIC METHOD WORKS */}
      <section id="metodo" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono font-extrabold uppercase tracking-[0.2em] text-[#E91E63] bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100">
              O Segredo do Aprendizado Rápido
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight">
              Por que a alfabetização tradicional falha com nossos filhos?
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-light">
              Métodos baseados em decoreba exaustiva de sílabas cansam a criança. Nosso método ativa a <strong>via fonológica natural do cérebro</strong> através de estímulos visual, auditivo e tato.
            </p>
          </div>

          {/* Cards Grid: Core pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            <div className="bg-[#FFFDF9] border-2 border-orange-200 kid-handdrawn p-8 hover:scale-[1.02] transition-all duration-300 space-y-6 text-left group">
              <div className="h-14 w-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl font-bold group-hover:rotate-12 transition-transform">
                🔊
              </div>
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-extrabold text-stone-900">Método Fônico</h3>
                <p className="text-stone-600 text-sm leading-relaxed font-light">
                  A criança aprende primeiro o som de cada letra antes do seu nome. Isso evita a confusão clássica de soletrar: de onde o 'M' (/eme/) vira /m/ em 'maca'?
                </p>
              </div>
              <ul className="space-y-2 text-stone-600 text-xs font-semibold">
                <li className="flex items-center space-x-2">
                  <span className="text-lg">🧸</span>
                  <span>Associação fonema-grafema</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-lg">🎈</span>
                  <span>Instrução fônica sistemática</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#FFFDF9] border-2 border-pink-200 kid-handdrawn-pink p-8 hover:scale-[1.02] transition-all duration-300 space-y-6 text-left group">
              <div className="h-14 w-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-2xl font-bold group-hover:rotate-12 transition-transform">
                ✏️
              </div>
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-extrabold text-stone-900">Estímulo Sensorial</h3>
                <p className="text-stone-600 text-sm leading-relaxed font-light">
                  A criança traça letras em cartões táteis arenosos, escuta rimas em áudio e cria palavras com blocos físicos. Integrar tato, audição e visão fixa a memória.
                </p>
              </div>
              <ul className="space-y-2 text-stone-600 text-xs font-semibold">
                <li className="flex items-center space-x-2">
                  <span className="text-lg">🎨</span>
                  <span>Técnica Montessori de lixa</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-lg">✏️</span>
                  <span>Coordenação viso-motora ativada</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#FFFDF9] border-2 border-indigo-200 kid-handdrawn-indigo p-8 hover:scale-[1.02] transition-all duration-300 space-y-6 text-left group">
              <div className="h-14 w-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold group-hover:rotate-12 transition-transform">
                🏆
              </div>
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-extrabold text-stone-900">Gamificação e Afeto</h3>
                <p className="text-stone-600 text-sm leading-relaxed font-light">
                  A jornada é dividida em pequenas missões de busca e selos de conquista. Com apenas 15 minutos diários de conexão divertida entre pais e filhos.
                </p>
              </div>
              <ul className="space-y-2 text-stone-600 text-xs font-semibold">
                <li className="flex items-center space-x-2">
                  <span className="text-lg">🌟</span>
                  <span>Guia de incentivos e elogios</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-lg">🏆</span>
                  <span>Livre de frustrações ou cobranças</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Video / Graphic Showcase teaser */}
          <div className="mt-16 bg-[#FFFBF0] border-2 border-orange-200/60 rounded-[32px] p-6 sm:p-10 lg:p-12 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-orange-600 font-extrabold block">Atendimento Individualizado</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-stone-900">
                  Criado para Pais Ocupados: Resultados Reais com apenas 15 Minutos por dia!
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed font-light">
                  Não se sinta culpado se o seu dia for corrido. O cérebro de uma criança pequena aprende muito melhor em sessões curtas e alegres de 15 minutos do que em horas de lições escolares estressantes.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <span className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-stone-200 rounded-full text-xs font-medium text-stone-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Nenhuma tela obrigatória</span>
                  </span>
                  <span className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-stone-200 rounded-full text-xs font-medium text-stone-700">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Cartões e Livros físicos inclusos</span>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="bg-white border-2 border-orange-200 p-6 rounded-2xl shadow-xl w-full max-w-[320px] space-y-4">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-xs">👩‍👦</div>
                      <div>
                        <span className="block font-bold text-xs text-stone-800">Helena M. (Mãe do Leo)</span>
                        <span className="block text-[8px] text-stone-400 font-mono">Curitiba / PR</span>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
                    </div>
                  </div>
                  <p className="text-stone-600 text-xs italic leading-relaxed font-light">
                    &ldquo;O Leo de 5 anos chorava na hora de fazer o dever da escola tradicional. Com as Aventuras da Alfabetização, ele me pede para brincar de ler todos os dias! Ele já juntou 'S' com 'apo' hoje! Incrível!&rdquo;
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* INTERACTIVE WORKSHOP / SIMULATOR SECTION */}
      <section id="simulador" className="py-20 bg-stone-50 border-t border-b border-orange-100 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-mono font-extrabold uppercase tracking-[0.2em] text-[#4F46E5] bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
              Laboratório Virtual Interativo
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-stone-900 leading-tight">
              Veja a Trilha de Sucesso para a idade do seu filho
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-light">
              Clique nas idades abaixo para simular como a mente infantil absorve os fonemas e confira uma atividade prática para exercitar agora mesmo com ele!
            </p>
          </div>

          {/* Interactive Age Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-2xl mx-auto">
            {Object.keys(ageTracks).map(key => {
              const isActive = selectedAge === key;
              
              // Custom colors matching childrens toys/pencils for each age
              let colorClass = "";
              let hoverClass = "";
              if (key === "3") {
                colorClass = "bg-[#38BDF8] border-[#0284C7] text-white shadow-lg shadow-sky-100";
                hoverClass = "hover:border-[#38BDF8] hover:bg-sky-50/50";
              } else if (key === "4-5") {
                colorClass = "bg-[#FB7185] border-[#E11D48] text-white shadow-lg shadow-rose-100";
                hoverClass = "hover:border-[#FB7185] hover:bg-rose-50/50";
              } else if (key === "6-7") {
                colorClass = "bg-[#A78BFA] border-[#7C3AED] text-white shadow-lg shadow-purple-100";
                hoverClass = "hover:border-[#A78BFA] hover:bg-purple-50/50";
              } else {
                colorClass = "bg-[#34D399] border-[#059669] text-white shadow-lg shadow-emerald-100";
                hoverClass = "hover:border-[#34D399] hover:bg-emerald-50/50";
              }

              return (
                <button
                  key={key}
                  onClick={() => { setSelectedAge(key); resetQuiz(); }}
                  className={`px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center space-x-2 border-2 ${
                    isActive
                      ? `${colorClass} scale-105`
                      : `bg-white border-stone-200 text-stone-700 ${hoverClass}`
                  }`}
                >
                  <span className="text-xl group-hover:animate-bounce">{ageTracks[key].icon}</span>
                  <span>{ageTracks[key].age}</span>
                </button>
              );
            })}
          </div>

          {/* Displayed Interactive Simulator Box */}
          <div className="max-w-4xl mx-auto bg-white border-2 border-orange-100 rounded-[32px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Pedagogical focus */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#FFFBF0] to-orange-50/20 p-8 border-b lg:border-b-0 lg:border-r border-orange-100/60 text-left flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-orange-600 font-extrabold block">Etapa do Desenvolvimento</span>
                <h3 className="font-serif text-2xl font-black text-stone-900">
                  {ageTracks[selectedAge].title}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                  {ageTracks[selectedAge].subtitle}
                </p>
                
                <div className="p-4 bg-white rounded-2xl border border-orange-100 shadow-inner">
                  <span className="block text-[9px] font-mono text-stone-400 uppercase tracking-widest mb-1.5 font-extrabold">Foco Pedagógico</span>
                  <p className="text-stone-700 text-xs font-medium leading-relaxed">
                    🎯 {ageTracks[selectedAge].focus}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-orange-100/60 flex items-center space-x-3 text-xs text-stone-500">
                <GraduationCap className="h-5 w-5 text-indigo-500" />
                <span>Baseado na escala psicogênica Piagetiana</span>
              </div>
            </div>

            {/* Right Column: Virtual game simulator */}
            <div className="lg:col-span-7 p-8 text-left flex flex-col justify-between bg-stone-50/20">
              <div className="space-y-6">
                
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-[#00FF41] animate-ping" />
                    <span className="font-mono text-[9px] tracking-widest text-stone-500 uppercase font-bold">Simulador Fonético Ativo</span>
                  </div>
                  <div className="flex items-center space-x-1 font-mono text-[10px] font-bold text-amber-600">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span>Pontos: {score}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 font-mono text-[8px] uppercase tracking-wider font-extrabold rounded">Módulo Prático</span>
                    <h4 className="font-serif font-black text-stone-800 text-sm sm:text-base">
                      {ageTracks[selectedAge].activityTitle}
                    </h4>
                  </div>
                  
                  <p className="text-stone-600 text-xs leading-relaxed font-light">
                    Ouvir o som da letra ajuda a formar a memória permanente rápida. Peça para o seu filho ouvir e adivinhar o objeto!
                  </p>

                  {/* Phonetic Interactive Sound Button */}
                  <div className="bg-white border-2 border-stone-200/60 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-14 w-14 rounded-full bg-[#FFFBF0] border-2 border-orange-300 flex items-center justify-center font-serif text-3xl font-black text-orange-600 shadow-md">
                        {ageTracks[selectedAge].interactiveChallenge.letter}
                      </div>
                      <div className="text-left">
                        <span className="block font-mono text-[9px] text-stone-400 uppercase tracking-widest font-extrabold">Fonema Ativo</span>
                        <span className="block text-stone-800 text-sm font-black">{ageTracks[selectedAge].interactiveChallenge.soundName}</span>
                        <span className="block text-stone-500 text-[10px] font-light leading-snug max-w-[200px]">{ageTracks[selectedAge].interactiveChallenge.audioHint}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePlaySound("letter", ageTracks[selectedAge].interactiveChallenge.soundName)}
                      className={`px-5 py-3.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white font-semibold text-xs transition-all shadow-md flex items-center space-x-2 group cursor-pointer ${
                        soundPlaying === "letter" ? "animate-pulse" : "hover:scale-105"
                      }`}
                    >
                      <Volume2 className="h-4 w-4 text-white group-hover:scale-110" />
                      <span>{soundPlaying === "letter" ? "Ouvindo som..." : "Tocar Som Fonético"}</span>
                    </button>
                  </div>

                  {/* Small Phonetic Quiz Game */}
                  {selectedAge === "4-5" && (
                    <div className="pt-2 space-y-3">
                      <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest font-black">Mini-Questão: Qual palavra inicia com o som /buh/?</span>
                      <div className="grid grid-cols-2 gap-3">
                        {["Gato", "Rato", "Bolo", "Janela"].map(opt => (
                          <button
                            key={opt}
                            disabled={quizAnswered !== null}
                            onClick={() => handleQuizAnswer(opt)}
                            className={`p-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                              selectedOption === opt
                                ? opt === "Bolo"
                                  ? "bg-emerald-50 border-emerald-500 text-emerald-800"
                                  : "bg-red-50 border-red-500 text-red-800"
                                : "bg-white border-stone-200 text-stone-700 hover:border-orange-300 hover:bg-orange-50/10"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      
                      {quizAnswered !== null && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-3 rounded-xl bg-orange-50 border border-orange-100 text-xs"
                        >
                          <span>
                            {quizAnswered 
                              ? "🎉 Excelente! /buh/ é o som inicial de BOLO!" 
                              : "🎈 Ops! Tente de novo clicando no Bolo."}
                          </span>
                          <button 
                            onClick={resetQuiz}
                            className="text-orange-600 hover:underline font-bold font-mono text-[10px]"
                          >
                            Refazer
                          </button>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {selectedAge !== "4-5" && (
                    <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100/60 flex items-center space-x-3">
                      <span className="text-xl">👩‍🏫</span>
                      <p className="text-stone-600 text-xs leading-relaxed font-light">
                        <strong>Dica Ativa:</strong> {ageTracks[selectedAge].activityDesc} Esta atividade lúdica acompanha cartões físicos coloridos no kit!
                      </p>
                    </div>
                  )}

                </div>

              </div>
              
              <div className="pt-8 border-t border-stone-100 mt-6 text-center">
                <a 
                  href="#inscricao"
                  className="inline-flex items-center space-x-1.5 text-xs text-orange-600 hover:text-orange-700 font-extrabold tracking-wider uppercase"
                >
                  <span>Garantir Trilha Completa de Atividades</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* THE COMPLETE KIT: SHOWCASING UNBOXING LUXURY FOR EDUCATION */}
      <section id="conteudo" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono font-extrabold uppercase tracking-[0.2em] text-[#FF9800] bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
              Material Físico & Digital Incluso
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight">
              O que você vai receber na sua casa e no seu e-mail
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-light">
              Tudo o que você precisa para guiar os estudos sem cansar. Uma combinação científica ideal de itens concretos táteis e acesso digital vitalício.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Grid: 4 Premium Item Spotlights */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Kit Item 1 */}
              <div className="relative overflow-hidden bg-gradient-to-b from-orange-50/40 to-transparent border border-orange-100 hover:border-orange-300 p-6 flex flex-col justify-between space-y-8 hover:bg-orange-50/20 transition-all duration-300 shadow-sm hover:shadow-lg group rounded-3xl">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-orange-100/30 rounded-full filter blur-xl group-hover:bg-orange-100/50 transition-all duration-300" />
                <span className="text-4xl relative z-10">🃏</span>
                <div className="space-y-2 relative z-10">
                  <h4 className="font-serif font-black text-stone-800 text-base">42 Cartões de Letras Lixa</h4>
                  <p className="text-xs text-stone-500 leading-relaxed font-light">
                    Cartões robustos de alta gramatura com acabamento texturizado áspero para a memorização de traçados por memória proprioceptiva (tato).
                  </p>
                </div>
              </div>

              {/* Kit Item 2 */}
              <div className="relative overflow-hidden bg-gradient-to-b from-pink-50/40 to-transparent border border-pink-100 hover:border-pink-300 p-6 flex flex-col justify-between space-y-8 hover:bg-pink-50/20 transition-all duration-300 shadow-sm hover:shadow-lg group rounded-3xl">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-pink-100/30 rounded-full filter blur-xl group-hover:bg-pink-100/50 transition-all duration-300" />
                <span className="text-4xl relative z-10">📖</span>
                <div className="space-y-2 relative z-10">
                  <h4 className="font-serif font-black text-stone-800 text-base">Livro de Jogos Práticos</h4>
                  <p className="text-xs text-stone-500 leading-relaxed font-light">
                    Guia ilustrado de 120 páginas com historinhas lúdicas e rimas criadas especificamente para fixar os fonemas sem estresse.
                  </p>
                </div>
              </div>

              {/* Kit Item 3 */}
              <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50/40 to-transparent border border-indigo-100 hover:border-indigo-300 p-6 flex flex-col justify-between space-y-8 hover:bg-indigo-50/20 transition-all duration-300 shadow-sm hover:shadow-lg group rounded-3xl">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-100/30 rounded-full filter blur-xl group-hover:bg-indigo-100/50 transition-all duration-300" />
                <span className="text-4xl relative z-10">🎙️</span>
                <div className="space-y-2 relative z-10">
                  <h4 className="font-serif font-black text-stone-800 text-base">Áudios Fonéticos Online</h4>
                  <p className="text-xs text-stone-500 leading-relaxed font-light">
                    Biblioteca de áudio acessível por QR Code para a criança ouvir os fonemas pronunciados por fonoaudiólogos experientes.
                  </p>
                </div>
              </div>

              {/* Kit Item 4 */}
              <div className="relative overflow-hidden bg-gradient-to-b from-emerald-50/40 to-transparent border border-emerald-100 hover:border-emerald-300 p-6 flex flex-col justify-between space-y-8 hover:bg-emerald-50/20 transition-all duration-300 shadow-sm hover:shadow-lg group rounded-3xl">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-100/30 rounded-full filter blur-xl group-hover:bg-emerald-100/50 transition-all duration-300" />
                <span className="text-4xl relative z-10">🎓</span>
                <div className="space-y-2 relative z-10">
                  <h4 className="font-serif font-black text-stone-800 text-base">Guia de Bolso dos Pais</h4>
                  <p className="text-xs text-stone-500 leading-relaxed font-light">
                    Dicas práticas de 5 minutos sobre elogios eficazes, neurobiologia do aprendizado infantil e correção afetiva de erros comuns.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Side: Big Unboxing Visual Mockup Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="bg-[#FFFBF0] border-2 border-orange-200/50 rounded-[40px] p-6 text-center space-y-6 shadow-xl relative overflow-hidden">
                
                {/* Stamp visual ribbon */}
                <div className="absolute -top-3 -right-3 h-24 w-24 overflow-hidden rounded-full border-4 border-dashed border-orange-300 flex items-center justify-center font-serif font-bold text-orange-500 rotate-12 bg-white text-[10px] uppercase leading-none">
                  ENTREGA CORTEZIA BR
                </div>

                <img 
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80"
                  alt="Menina de cabelos escuros sorrindo segurando um livro colorido de historinhas" 
                  className="w-full h-56 sm:h-64 object-cover rounded-[24px]"
                  referrerPolicy="no-referrer"
                />

                <div className="text-left space-y-2.5">
                  <span className="text-[9px] font-mono tracking-widest text-[#E91E63] uppercase font-black block">SUPER COMBO COMPLETO</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-stone-900 leading-tight">Kit Concreto & Digital</h3>
                  <p className="text-stone-600 text-xs font-light leading-relaxed">
                    Você não compra apenas um livro PDF. Você recebe em sua residência a caixa premium física contendo todo o material de apoio para segurar nas mãos e praticar juntinho do seu pequeno.
                  </p>
                </div>

                {/* Free Delivery Promo Bar inside box */}
                <div className="bg-[#E91E63] text-white p-3.5 rounded-2xl flex items-center justify-between text-xs font-bold">
                  <span>🚀 Frete Grátis para todo o Brasil</span>
                  <span className="underline text-[10px]">Ver prazos</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SCIENTIFIC BACKING / PEDAGOGUE PROFILE */}
      <section className="py-20 bg-stone-50 border-t border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-300 rounded-[32px] rotate-3 scale-95" />
                <div className="relative bg-white border-2 border-stone-200 rounded-[32px] overflow-hidden shadow-xl p-4">
                  <img 
                    src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80" 
                    alt="Pedagoga e idealizadora do projeto sorrindo na mesa de estudos de alfabetização" 
                    className="w-full h-72 sm:h-80 object-cover rounded-[20px]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="mt-4 text-center">
                    <span className="block font-serif font-black text-stone-800 text-sm">Profª Mariana Lira</span>
                    <span className="block text-[9px] font-mono text-stone-400 uppercase tracking-widest">Pedagoga & Neurocientista do Desenvolvimento</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 text-left space-y-6">
              <span className="text-xs font-mono font-extrabold uppercase tracking-[0.2em] text-[#E91E63] bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100">
                Quem idealizou o método?
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-stone-900 leading-tight">
                Criado por quem entende de infância e amor
              </h2>
              <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
                &ldquo;Como professora e pesquisadora da infância por mais de 15 anos, percebi que o maior obstáculo da alfabetização não é a capacidade da criança, mas o tédio causado pelas apostilas padronizadas. O cérebro infantil precisa de surpresa, tato e carinho para formar as conexões sinápticas da leitura.&rdquo;
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-xs text-stone-800">15+ Anos de Atuação</span>
                    <span className="block text-[10px] text-stone-500">Especialista em fonoaudiologia infantil e Montessori.</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-xs text-stone-800">14.000+ Famílias Felizes</span>
                    <span className="block text-[10px] text-stone-500">Tratamento de apoio integrado em todo o território nacional.</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-center space-x-3 text-xs text-orange-800 font-medium max-w-xl">
                <span>💬</span>
                <span>Participe de lives e tire suas dúvidas pedagógicas diretamente com a professora Mariana na comunidade secreta de mães.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SOCIAL PROOF: REVIEWS AND PICTURES FROM MOMS AND DADS */}
      <section id="depoimentos" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono font-extrabold uppercase tracking-[0.2em] text-[#4F46E5] bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
              Histórias de Sucesso Reais
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight">
              O que as mamães e papais dizem sobre nós
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-light">
              Veja prints e mensagens emocionadas de famílias que viram seus filhos decolarem rumo à autonomia literária de forma saudável.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-[#FFFBF0]/60 border border-orange-100 rounded-3xl p-6 text-left space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light italic">
                &ldquo;Minha filha Sofia tem TDAH e as lições do colégio eram um calvário diário de choro. No segundo dia com as cartas sensoriais táteis das Aventuras, ela começou a desenhar os fonemas brincando e rindo. Hoje ela já lê historinhas inteiras sozinha no sofá!&rdquo;
              </p>
              <div className="flex items-center space-x-3 border-t border-orange-100/60 pt-4">
                <div className="h-10 w-10 rounded-full bg-pink-100 text-lg flex items-center justify-center font-bold">👩</div>
                <div>
                  <span className="block font-bold text-xs text-stone-800">Ana Beatriz S. (Mãe da Sofia, 6 anos)</span>
                  <span className="block text-[9px] text-stone-400 uppercase font-mono">Belo Horizonte / MG</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#FFFBF0]/60 border border-orange-100 rounded-3xl p-6 text-left space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light italic">
                &ldquo;Confesso que estava cético se funcionaria sem usar telas, mas os blocos e rimas fônicos são hipnotizantes para as crianças! Meu filho de 4 anos sabe o som de todas as letras e já monta palavras de 4 letras sozinho no tapete. Vale cada centavo!&rdquo;
              </p>
              <div className="flex items-center space-x-3 border-t border-orange-100/60 pt-4">
                <div className="h-10 w-10 rounded-full bg-orange-100 text-lg flex items-center justify-center font-bold">👨</div>
                <div>
                  <span className="block font-bold text-xs text-stone-800">Rodrigo de M. (Pai do Pietro, 4 anos)</span>
                  <span className="block text-[9px] text-stone-400 uppercase font-mono">Campinas / SP</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#FFFBF0]/60 border border-orange-100 rounded-3xl p-6 text-left space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light italic">
                &ldquo;Sou pedagoga escolar e recomendo de olhos fechados o método da professora Mariana. Ela respeita de verdade a neurobiologia da criança. É o kit mais completo de apoio fonético e sensorial no mercado nacional hoje.&rdquo;
              </p>
              <div className="flex items-center space-x-3 border-t border-orange-100/60 pt-4">
                <div className="h-10 w-10 rounded-full bg-emerald-100 text-lg flex items-center justify-center font-bold">👩‍🏫</div>
                <div>
                  <span className="block font-bold text-xs text-stone-800">Profª Dra. Cláudia G. (Pedagoga)</span>
                  <span className="block text-[9px] text-stone-400 uppercase font-mono">Recife / PE</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* GUARANTEE SEAL SECTION */}
      <section className="py-16 bg-[#FFFBF0] border-t border-b border-orange-100 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 bg-orange-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-6 relative z-10 space-y-6">
          <div className="inline-flex h-24 w-24 rounded-full bg-white border-4 border-yellow-400 flex items-center justify-center text-4xl shadow-md mx-auto animate-float">
            🛡️
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
              Garantia Incondicional de 7 Dias de Alegria!
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed max-w-xl mx-auto font-light">
              Temos tanta certeza do sorriso do seu filho que tiramos todo o risco dos seus ombros. Se em até 7 dias após o recebimento do kit físico em sua casa você não achar o material incrível, basta nos enviar um único e-mail. Nós devolveremos 100% do seu dinheiro, sem burocracia ou ressentimentos.
            </p>
          </div>
          <span className="block font-mono text-[9px] tracking-widest text-stone-400 uppercase font-extrabold">SEU RISCO É ABSOLUTAMENTE ZERO • COMPRA PROTEGIDA</span>
        </div>
      </section>

      {/* PERSUASIVE REGISTRATION FORM & DYNAMIC TIMER COUNTDOWN */}
      <section id="inscricao" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="bg-[#FFFBF0] border-2 border-orange-200/60 rounded-[48px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Box: Value and Pricing */}
            <div className="lg:col-span-6 p-8 sm:p-12 text-left bg-gradient-to-br from-[#FFFBF0] to-orange-100/30 flex flex-col justify-between space-y-8">
              
              <div className="space-y-4">
                
                {/* Timer countdown showcase */}
                <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 bg-red-100 border border-red-200 text-red-800 font-mono text-[10px] uppercase tracking-wider font-extrabold rounded-lg">
                  <Clock className="h-4 w-4 text-red-600 animate-spin" style={{ animationDuration: "15s" }} />
                  <span>Oferta Especial termina em: {timeLeft.hours.toString().padStart(2, "0")}h {timeLeft.minutes.toString().padStart(2, "0")}m {timeLeft.seconds.toString().padStart(2, "0")}s</span>
                </div>

                <span className="block text-xs font-mono text-stone-400 uppercase tracking-widest font-black">Matrícula Anual Ativa</span>
                <h3 className="font-serif text-3xl sm:text-4xl font-black text-stone-900 leading-tight">
                  Aproveite 40% de Desconto + Frete Cortesia hoje!
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                  A alfabetização é o maior presente que você dará para o futuro escolar do seu pequeno. Ao fazer a inscrição hoje, você garante o envio de todo o kit físico de cartas sensoriais lixa mais o Livro de Atividades sem nenhum custo adicional de envio.
                </p>
              </div>

              {/* Pricing Blocks with premium styling */}
              <div className="space-y-3 pt-6 border-t border-orange-200/50">
                <div className="flex items-baseline space-x-3 text-stone-400 line-through text-sm font-medium">
                  <span>De R$ 497,00</span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="font-mono text-xs text-stone-500 uppercase tracking-wider">Por apenas 12x de</span>
                  <span className="font-mono font-black text-4xl sm:text-5xl text-[#E91E63]">R$ 29,15</span>
                </div>
                <span className="block text-xs font-bold text-stone-700">ou apenas R$ 297,00 à vista no Pix (Economia de R$ 200)</span>
              </div>

              <div className="space-y-2.5 pt-4">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-stone-400 font-extrabold">O que você ganha ao matricular hoje:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-600 font-medium">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Kit Físico Caixa Premium</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Acesso Digital Vitalício</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Comunidade Secreta de Mães</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>Encontros de tira-dúvidas de IA</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Box: Lead Form */}
            <div className="lg:col-span-6 p-8 sm:p-12 text-left bg-white notebook-lines border-t lg:border-t-0 lg:border-l border-orange-100 relative">
              
              {/* Red school margin line */}
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[2px] bg-rose-400 opacity-60 z-0 pointer-events-none" />
              
              <div className="relative z-10 pl-3 sm:pl-6">
                <AnimatePresence mode="wait">
                  {!formSuccess ? (
                    <motion.form 
                      key="form"
                      onSubmit={handleFormSubmit}
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="space-y-1">
                        <h4 className="font-serif font-black text-stone-800 text-lg">Faça sua reserva agora!</h4>
                        <p className="text-stone-500 text-xs font-light">Preencha os dados abaixo para receber os informativos no WhatsApp.</p>
                      </div>

                      {/* Form Fields */}
                      <div className="space-y-3.5">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold block">Seu Nome Completo</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Ex: Amanda Silva"
                            value={parentName}
                            onChange={e => setParentName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold block">Seu WhatsApp de contato</label>
                          <input 
                            type="tel" 
                            required
                            placeholder="Ex: (11) 99999-9999"
                            value={parentPhone}
                            onChange={e => setParentPhone(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3.5">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold block">Nome do Filho(a)</label>
                            <input 
                              type="text" 
                              required
                              placeholder="Ex: Leo"
                              value={childName}
                              onChange={e => setChildName(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold block">Idade do Filho(a)</label>
                            <input 
                              type="number" 
                              min="3" 
                              max="10"
                              required
                              placeholder="Ex: 5"
                              value={childAgeInput}
                              onChange={e => setChildAgeInput(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl border border-stone-200 text-xs bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Submit CTA */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm tracking-wide transition-all shadow-md hover:scale-[1.01] flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <span>{loading ? "Processando..." : "Finalizar Matrícula Promocional"}</span>
                        <ArrowRight className="h-5 w-5" />
                      </button>

                      <p className="text-[10px] text-stone-400 text-center leading-normal">
                        Ao preencher seus dados, você aceita nossa política de privacidade de dados sensíveis infantis em total conformidade com a LGPD escolar.
                      </p>

                    </motion.form>
                  ) : (
                    <motion.div 
                      key="success"
                      className="h-full flex flex-col justify-center items-center text-center space-y-6 py-12"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center text-4xl shadow-inner animate-bounce">
                        🎉
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-serif font-black text-2xl text-stone-900">Inscrição Pré-Reservada!</h3>
                        <p className="text-stone-600 text-xs leading-relaxed max-w-sm">
                          Muito bem, <strong>{parentName}</strong>! Nós enviamos os detalhes da reserva promocional e cronograma de postagem do kit para o seu WhatsApp: <strong>{parentPhone}</strong>.
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-800 text-left max-w-sm leading-relaxed">
                        💡 <strong>Dica Ativa:</strong> Adicione nosso número comercial de suporte pedagógico aos seus contatos para desbloquear os bônus de áudio online no WhatsApp hoje mesmo!
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>




            </div>

          </div>
        </div>
      </section>

      {/* DETAILED ACCORDION FAQ SECTION */}
      <section id="faq" className="py-20 bg-stone-50 border-t border-orange-100 relative">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs font-mono font-extrabold uppercase tracking-[0.2em] text-[#E91E63] bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100">
              Esclareça Suas Dúvidas
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-stone-900 leading-tight">
              Perguntas Frequentes sobre o Método
            </h2>
            <p className="text-stone-600 text-sm font-light">
              Reunimos as respostas para as principais dúvidas de pais e educadores sobre nossa caixa de materiais.
            </p>
          </div>

          <div className="space-y-4 text-left">
            {[
              {
                q: "Meu filho tem apenas 3 anos, ele não é jovem demais para alfabetização?",
                a: "De forma alguma! Aos 3 anos, focamos na Consciência Fonológica e Auditiva básica (rimas, identificação de sons ambientais) através de brincadeiras corporais leves. Não impomos cópia de letras. Isso prepara o terreno neurológico de forma saudável para quando ele tiver 5 ou 6 anos."
              },
              {
                q: "Quanto tempo demora para receber o kit físico em minha casa?",
                a: "A postagem é realizada em até 24h úteis após a confirmação. O prazo médio de entrega gratuita via Correios para as capitais brasileiras é de 4 a 7 dias úteis, acompanhado de código de rastreamento enviado via WhatsApp."
              },
              {
                q: "O programa exige o uso obrigatório de smartphones ou tablets?",
                a: "Não! Nosso método é 100% focado no offline e em atividades sensoriais concretas (Montessori). Os áudios fônicos online de apoio são opcionais por QR Code, pensados para os pais ouvirem os fonemas corretos, mas todo o trabalho com a criança se dá com papéis, areias e blocos físicos."
              },
              {
                q: "Como o método lida com crianças diagnosticadas com autismo ou TDAH?",
                a: "As Aventuras da Alfabetização foram desenvolvidas com apoio de neurocientistas. O estímulo multissensorial fônico (onde a criança encosta no traçado texturizado da letra e brinca com blocos táteis) provou ser altamente eficaz para ancorar a atenção de pequenos neurodivergentes de forma amigável."
              },
              {
                q: "E se meu filho não gostar do material ou não se adaptar?",
                a: "Temos nossa garantia incondicional de 7 dias úteis! Se seu pequeno não quiser brincar com as cartas táteis ou rimas nas primeiras tentativas, nos envie um e-mail ou mensagem no suporte WhatsApp comercial e devolveremos o seu investimento integralmente."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-white border-2 border-orange-100 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-6 text-left font-serif font-black text-stone-800 text-sm sm:text-base flex justify-between items-center cursor-pointer hover:bg-orange-50/20"
                >
                  <span>{faq.q}</span>
                  <HelpCircle className={`h-5 w-5 text-orange-500 shrink-0 transition-transform ${activeFaq === index ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-orange-50/30 text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PORTFOLIO CREDITS FOOTER */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center font-black text-white text-base">A</div>
            <div>
              <span className="block font-serif font-bold text-stone-200 text-xs leading-none">Aventuras da Alfabetização</span>
              <span className="block text-[8px] font-mono text-stone-500 uppercase tracking-widest leading-normal">Caso de Estudo // Augusto Dev Portfolio</span>
            </div>
          </div>
          
          <p className="text-[10px] font-mono text-stone-500 uppercase tracking-wider text-center sm:text-right">
            © {new Date().getFullYear()} PROJETO CONSTRUÍDO COM ALTÍSSIMO PADRÃO DE DESIGN PARA O PORTFÓLIO DE AUGUSTO DEV.
          </p>
        </div>
      </footer>

    </div>
  );
}
