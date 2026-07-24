import React, { useState, useEffect, useRef } from "react";
import { 
  Heart, Sparkles, Moon, Sun, Wind, Play, Pause, Volume2, VolumeX, 
  Bookmark, User, Crown, ShieldCheck, Check, Plus, Trash2, Edit3, 
  BarChart3, Settings, Globe, Clock, ArrowLeft, Lock, Music, Headphones, 
  Feather, Search, CheckCircle2, RotateCcw, X, SlidersHorizontal, 
  Mail, Key, LogIn, ChevronRight, Zap, RefreshCw, Layers
} from "lucide-react";

interface SereneAppProps {
  onBack?: () => void;
}

// Data Types
interface ContentItem {
  id: string;
  type: "meditation" | "story" | "mindfulness";
  title: string;
  category: string;
  description: string;
  durationMinutes: number;
  image: string;
  isPremium: boolean;
  narrator?: string;
  listensCount: number;
  soundType: "waves" | "rain" | "singing_bowl" | "chime";
}

interface UserProfile {
  name: string;
  email: string;
  isPremium: boolean;
  plan: "free" | "monthly" | "annual";
  language: "pt" | "en" | "es";
  dailyReminder: string;
  streakDays: number;
  totalMinutesMeditated: number;
  completedSessionsCount: number;
}

const INITIAL_CONTENT: ContentItem[] = [
  {
    id: "med-1",
    type: "meditation",
    title: "Alívio Rápido da Ansiedade",
    category: "Ansiedade",
    description: "Sessão guiada de emergência para desacelerar batimentos cardíacos e acalmar pensamentos acelerados.",
    durationMinutes: 8,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    isPremium: false,
    listensCount: 14200,
    soundType: "waves"
  },
  {
    id: "med-2",
    type: "meditation",
    title: "Sono Profundo e Reparador",
    category: "Sono",
    description: "Indução suave ao sono através de ondas theta e relaxamento muscular progressivo.",
    durationMinutes: 20,
    image: "https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=800&q=80",
    isPremium: false,
    listensCount: 28900,
    soundType: "rain"
  },
  {
    id: "med-3",
    type: "meditation",
    title: "Pausa para Descompressão",
    category: "Relaxamento",
    description: "Liberte a tensão acumulada nos ombros e pescoço no meio do dia de trabalho.",
    durationMinutes: 10,
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80",
    isPremium: true,
    listensCount: 9400,
    soundType: "singing_bowl"
  },
  {
    id: "med-4",
    type: "meditation",
    title: "Foco e Presença no Trabalho",
    category: "Foco",
    description: "Prepare sua mente para alta produtividade mantendo a calma interna.",
    durationMinutes: 12,
    image: "https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=800&q=80",
    isPremium: true,
    listensCount: 11300,
    soundType: "chime"
  },
  {
    id: "med-5",
    type: "meditation",
    title: "Prática Diária de Gratidão",
    category: "Gratidão",
    description: "Reconecte-se com sentimentos de apreciação pelas pequenas alegrias da vida.",
    durationMinutes: 15,
    image: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80",
    isPremium: false,
    listensCount: 7800,
    soundType: "waves"
  },
  {
    id: "med-6",
    type: "meditation",
    title: "Jornada de Autoconhecimento",
    category: "Autoconhecimento",
    description: "Espaço silencioso para observar emoções sem julgamento.",
    durationMinutes: 18,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    isPremium: true,
    listensCount: 6500,
    soundType: "singing_bowl"
  },
  {
    id: "story-1",
    type: "story",
    title: "A Floresta Sussurrante dos Pinheiros",
    category: "Sono",
    description: "Caminhe mentalmente por uma floresta serena ao pôr do sol com o som suave do vento nos pinheiros.",
    durationMinutes: 25,
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    isPremium: false,
    narrator: "Helena Castro",
    listensCount: 31200,
    soundType: "rain"
  },
  {
    id: "story-2",
    type: "story",
    title: "O Trem Noturno do Vale da Névoa",
    category: "Sono",
    description: "Acomode-se no vagão confortável enquanto as luzes do vale passam devagar sob o céu estrelado.",
    durationMinutes: 30,
    image: "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?auto=format&fit=crop&w=800&q=80",
    isPremium: true,
    narrator: "Marcus Vinícius",
    listensCount: 19800,
    soundType: "waves"
  },
  {
    id: "mind-1",
    type: "mindfulness",
    title: "Escaneamento Corporal Consciente",
    category: "Consciência Emocional",
    description: "Direcione a atenção amorosa para cada região do seu corpo, liberando tensões ocultas.",
    durationMinutes: 12,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    isPremium: false,
    listensCount: 15400,
    soundType: "chime"
  },
  {
    id: "mind-2",
    type: "mindfulness",
    title: "Observação da Respiração Natural",
    category: "Atenção Plena",
    description: "Ancore sua consciência no ar que entra e sai sem tentar mudar nada.",
    durationMinutes: 10,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    isPremium: false,
    listensCount: 12100,
    soundType: "waves"
  }
];

export default function SereneApp({ onBack }: SereneAppProps) {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<"home" | "meditations" | "stories" | "mindfulness" | "breathing" | "favorites" | "profile" | "premium" | "admin">("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // User & Subscription State
  const [user, setUser] = useState<UserProfile>({
    name: "Ana Clara",
    email: "anaclara@exemplo.com",
    isPremium: false,
    plan: "free",
    language: "pt",
    dailyReminder: "21:30",
    streakDays: 5,
    totalMinutesMeditated: 142,
    completedSessionsCount: 16,
  });

  // Auth Modal State
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"login" | "signup" | "forgot">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");

  // Content Catalog State (Dynamic for Admin Management)
  const [contentList, setContentList] = useState<ContentItem[]>(INITIAL_CONTENT);
  const [favorites, setFavorites] = useState<string[]>(["med-1", "story-1"]);

  // Active Player State
  const [activeItem, setActiveItem] = useState<ContentItem | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null); // in minutes

  // Interactive Breathing Exercise State
  const [breathingTechnique, setBreathingTechnique] = useState<"box" | "478" | "diaphragmatic">("box");
  const [breathingState, setBreathingState] = useState<"idle" | "inhale" | "hold" | "exhale" | "hold2">("idle");
  const [breathingCounter, setBreathingCounter] = useState<number>(4);
  const [breathingActive, setBreathingActive] = useState<boolean>(false);

  // Admin New Item Form State
  const [adminTitle, setAdminTitle] = useState("");
  const [adminCategory, setAdminCategory] = useState("Ansiedade");
  const [adminType, setAdminType] = useState<"meditation" | "story" | "mindfulness">("meditation");
  const [adminDescription, setAdminDescription] = useState("");
  const [adminDuration, setAdminDuration] = useState(10);
  const [adminImage, setAdminImage] = useState("");
  const [adminIsPremium, setAdminIsPremium] = useState(false);

  // Web Audio Synth Generator for Real Ambient Sound
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Web Audio Ambient Sound Player
  useEffect(() => {
    if (isPlaying && activeItem) {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }

        if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume();
        }

        // Clean previous oscillator if any
        if (oscRef.current) {
          oscRef.current.stop();
          oscRef.current.disconnect();
        }

        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Relaxing frequencies (432Hz ambient chime / theta sound)
        if (activeItem.soundType === "waves") {
          osc.frequency.setValueAtTime(216, ctx.currentTime); // Deep soothing A
        } else if (activeItem.soundType === "rain") {
          osc.frequency.setValueAtTime(144, ctx.currentTime); // Low grounding rumble
        } else if (activeItem.soundType === "singing_bowl") {
          osc.frequency.setValueAtTime(432, ctx.currentTime); // Sacred 432Hz
        } else {
          osc.frequency.setValueAtTime(528, ctx.currentTime); // Solfeggio 528Hz Transformation
        }

        osc.type = "sine";
        gain.gain.setValueAtTime(isMuted ? 0 : 0.08, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscRef.current = osc;
        gainNodeRef.current = gain;
      } catch (e) {
        console.error("Web Audio error:", e);
      }
    } else {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
        } catch (e) {}
      }
    }

    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
        } catch (e) {}
      }
    };
  }, [isPlaying, activeItem, isMuted]);

  // Audio Progress Timer
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            setUser((u) => ({
              ...u,
              completedSessionsCount: u.completedSessionsCount + 1,
              totalMinutesMeditated: u.totalMinutesMeditated + (activeItem?.durationMinutes || 10)
            }));
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeItem]);

  // Breathing Loop Engine
  useEffect(() => {
    let interval: any = null;
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathingCounter((prev) => {
          if (prev > 1) {
            return prev - 1;
          }

          // Cycle transitions according to technique
          if (breathingTechnique === "box") {
            // 4-4-4-4: Inhale(4) -> Hold(4) -> Exhale(4) -> Hold(4)
            if (breathingState === "idle" || breathingState === "hold2") {
              setBreathingState("inhale");
              return 4;
            } else if (breathingState === "inhale") {
              setBreathingState("hold");
              return 4;
            } else if (breathingState === "hold") {
              setBreathingState("exhale");
              return 4;
            } else {
              setBreathingState("hold2");
              return 4;
            }
          } else if (breathingTechnique === "478") {
            // 4-7-8: Inhale(4) -> Hold(7) -> Exhale(8)
            if (breathingState === "idle" || breathingState === "exhale") {
              setBreathingState("inhale");
              return 4;
            } else if (breathingState === "inhale") {
              setBreathingState("hold");
              return 7;
            } else {
              setBreathingState("exhale");
              return 8;
            }
          } else {
            // Diaphragmatic: Inhale(5) -> Exhale(5)
            if (breathingState === "idle" || breathingState === "exhale") {
              setBreathingState("inhale");
              return 5;
            } else {
              setBreathingState("exhale");
              return 5;
            }
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingActive, breathingState, breathingTechnique]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePlayContent = (item: ContentItem) => {
    if (item.isPremium && !user.isPremium) {
      setActiveTab("premium");
      return;
    }
    setActiveItem(item);
    setIsPlaying(true);
    setAudioProgress(0);
  };

  const startBreathing = () => {
    setBreathingActive(true);
    setBreathingState("inhale");
    setBreathingCounter(breathingTechnique === "478" ? 4 : breathingTechnique === "box" ? 4 : 5);
  };

  const stopBreathing = () => {
    setBreathingActive(false);
    setBreathingState("idle");
    setBreathingCounter(4);
  };

  const handleAddAdminContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminTitle) return;

    const newItem: ContentItem = {
      id: `custom-${Date.now()}`,
      type: adminType,
      title: adminTitle,
      category: adminCategory,
      description: adminDescription || "Conteúdo cadastrado pelo painel administrativo.",
      durationMinutes: adminDuration,
      image: adminImage || "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
      isPremium: adminIsPremium,
      listensCount: 1,
      soundType: "waves"
    };

    setContentList([newItem, ...contentList]);
    setAdminTitle("");
    setAdminDescription("");
    setAdminImage("");
    alert("Novo conteúdo adicionado com sucesso ao aplicativo Serene!");
  };

  const handleDeleteAdminContent = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este conteúdo?")) {
      setContentList(contentList.filter((c) => c.id !== id));
    }
  };

  const categories = ["todas", "Ansiedade", "Sono", "Relaxamento", "Foco", "Gratidão", "Autoconhecimento"];

  // Filtered Content List
  const filteredContent = contentList.filter((item) => {
    const matchesCategory = selectedCategory === "todas" || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0F1016] text-slate-100 font-sans selection:bg-[#9333EA]/30 selection:text-[#C084FC] relative overflow-x-hidden">
      
      {/* AMBIENT GLOW BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-10 w-[450px] h-[450px] bg-indigo-900/20 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-emerald-900/15 rounded-full blur-[120px]" />
      </div>

      {/* TOP BAR / APP HEADER */}
      <header className="sticky top-0 z-40 bg-[#151722]/85 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/10 flex items-center space-x-1.5 text-xs font-bold cursor-pointer"
              title="Voltar ao Portfólio Augusto Dev"
            >
              <ArrowLeft className="h-4 w-4 text-[#A855F7]" />
              <span className="hidden sm:inline">Portfólio</span>
            </button>
          )}

          {/* SERENE BRAND LOGO */}
          <div 
            onClick={() => setActiveTab("home")}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-emerald-400 p-0.5 shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#151722] rounded-[14px] flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="font-serif font-black text-lg tracking-widest text-white group-hover:text-purple-300 transition-colors uppercase block leading-none">
                SERENE
              </span>
              <span className="text-[9px] font-mono text-purple-400 tracking-wider font-semibold uppercase">
                Bem-Estar & Mindfulness
              </span>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <nav className="hidden lg:flex items-center space-x-1 bg-black/40 p-1.5 rounded-2xl border border-white/10">
          {[
            { id: "home", label: "Início", icon: Sun },
            { id: "meditations", label: "Meditações", icon: Feather },
            { id: "stories", label: "Histórias", icon: Moon },
            { id: "mindfulness", label: "Mindfulness", icon: Sparkles },
            { id: "breathing", label: "Respiração", icon: Wind },
            { id: "favorites", label: "Favoritos", icon: Heart },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* USER PROFILE & PREMIUM CTA */}
        <div className="flex items-center space-x-3">
          {!user.isPremium && (
            <button
              onClick={() => setActiveTab("premium")}
              className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-purple-600 hover:brightness-110 text-black font-black text-xs rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Crown className="h-3.5 w-3.5 text-black" />
              <span className="hidden sm:inline">Seja Premium</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab("admin")}
            className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              activeTab === "admin"
                ? "bg-purple-600/30 border-purple-500 text-purple-300"
                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
            }`}
            title="Painel Administrativo"
          >
            <Settings className="h-4 w-4" />
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 p-1.5 pr-3 rounded-xl border border-white/10 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white">
              {user.name.charAt(0)}
            </div>
            <span className="text-xs font-bold text-slate-200 hidden sm:inline">{user.name.split(" ")[0]}</span>
          </button>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#151722]/95 backdrop-blur-2xl border-t border-white/10 px-2 py-2 flex items-center justify-around">
        {[
          { id: "home", label: "Início", icon: Sun },
          { id: "meditations", label: "Meditar", icon: Feather },
          { id: "stories", label: "Dormir", icon: Moon },
          { id: "breathing", label: "Respirar", icon: Wind },
          { id: "favorites", label: "Salvos", icon: Heart },
          { id: "profile", label: "Perfil", icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center space-y-0.5 p-1 rounded-xl transition-all cursor-pointer ${
                isActive ? "text-purple-400 font-bold" : "text-slate-400"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 pb-32 relative z-10">

        {/* ================= VIEW 1: HOME ================= */}
        {activeTab === "home" && (
          <div className="space-y-10 animate-fade-in text-left">
            
            {/* HERO WELCOME CARD */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900/60 via-indigo-900/50 to-[#151722]/80 backdrop-blur-xl border border-purple-500/30 p-8 md:p-10 shadow-[0_15px_40px_rgba(147,51,234,0.15)] flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl z-10">
                <div className="inline-flex items-center space-x-2 bg-purple-500/20 border border-purple-400/40 px-3 py-1 rounded-full text-xs font-black text-purple-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>RESPIRAÇÃO & MINDFULNESS DIÁRIO</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-serif font-black text-white leading-tight">
                  Sua mente merece <span className="text-purple-400">paz e clareza</span> hoje.
                </h1>

                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                  "O presente é o único momento em que a vida realmente acontece." Escolha uma meditação guiada, história para dormir ou exercício de respiração para desacelerar seu dia.
                </p>

                {/* USER PROGRESS SUMMARY */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-black/40 border border-white/10 p-3 rounded-2xl">
                    <span className="text-[10px] text-slate-400 font-mono block">SEQUÊNCIA</span>
                    <span className="text-lg font-black text-amber-400 flex items-center space-x-1">
                      <Zap className="h-4 w-4 fill-current" />
                      <span>{user.streakDays} dias</span>
                    </span>
                  </div>

                  <div className="bg-black/40 border border-white/10 p-3 rounded-2xl">
                    <span className="text-[10px] text-slate-400 font-mono block">MINUTOS</span>
                    <span className="text-lg font-black text-purple-300">
                      {user.totalMinutesMeditated}m
                    </span>
                  </div>

                  <div className="bg-black/40 border border-white/10 p-3 rounded-2xl">
                    <span className="text-[10px] text-slate-400 font-mono block">SESSÕES</span>
                    <span className="text-lg font-black text-emerald-400">
                      {user.completedSessionsCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* QUICK BREATHING MINI CARD */}
              <div className="w-full md:w-80 bg-[#181A26]/90 backdrop-blur-md border border-purple-500/30 p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center space-y-4 shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-emerald-400 p-1 flex items-center justify-center animate-pulse">
                  <Wind className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">Respiração 4-4-4-4</h3>
                  <p className="text-xs text-slate-400 mt-1">Alívio imediato do estresse em 2 minutos</p>
                </div>
                <button
                  onClick={() => setActiveTab("breathing")}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-lg cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Iniciar Agora</span>
                </button>
              </div>
            </div>

            {/* CATEGORY SEARCH & CHIPS */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h2 className="text-xl font-serif font-black text-white flex items-center space-x-2">
                  <Feather className="h-5 w-5 text-purple-400" />
                  <span>Explorar por Categoria</span>
                </h2>

                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar meditação ou história..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#181A26] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-purple-600 text-white shadow-md border border-purple-400"
                        : "bg-[#181A26] text-slate-300 hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    {cat === "todas" ? "Todas as Categorias" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* FEATURED MEDITATIONS GRID */}
            <div className="space-y-4">
              <h2 className="text-xl font-serif font-black text-white flex items-center space-x-2">
                <Sun className="h-5 w-5 text-amber-400" />
                <span>Meditações Guiadas Recomendadas</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.filter(c => c.type === "meditation").slice(0, 6).map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#181A26]/80 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-xl hover:border-purple-500/50 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-video overflow-hidden bg-black/50">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#181A26] via-transparent to-black/30" />
                        
                        <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-purple-300 text-[10px] font-black uppercase px-2.5 py-1 rounded-md border border-purple-500/30">
                          {item.category}
                        </span>

                        {item.isPremium && (
                          <span className="absolute top-3 right-3 bg-amber-500 text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow flex items-center space-x-1">
                            <Crown className="h-3 w-3" />
                            <span>Premium</span>
                          </span>
                        )}

                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className="absolute bottom-3 right-3 p-2 bg-black/70 hover:bg-purple-600 text-white rounded-xl transition-colors cursor-pointer"
                        >
                          <Heart className={`h-4 w-4 ${favorites.includes(item.id) ? "fill-red-500 text-red-500" : ""}`} />
                        </button>
                      </div>

                      <div className="p-5 space-y-2">
                        <div className="flex items-center space-x-2 text-[11px] font-mono text-purple-400 font-semibold">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{item.durationMinutes} minutos</span>
                          <span>•</span>
                          <span>{(item.listensCount / 1000).toFixed(1)}k ouvintes</span>
                        </div>

                        <h3 className="font-extrabold text-white text-base leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <button
                        onClick={() => handlePlayContent(item)}
                        className="w-full py-2.5 bg-white/10 hover:bg-purple-600 text-white font-extrabold text-xs rounded-xl border border-white/10 hover:border-purple-500 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <Play className="h-4 w-4 fill-current" />
                        <span>Ouvir Meditação</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SLEEP STORIES SECTION */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-serif font-black text-white flex items-center space-x-2">
                  <Moon className="h-5 w-5 text-indigo-400" />
                  <span>Histórias para Dormir</span>
                </h2>
                <button
                  onClick={() => setActiveTab("stories")}
                  className="text-xs font-bold text-purple-400 hover:underline cursor-pointer"
                >
                  Ver Todas →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contentList.filter(c => c.type === "story").map((story) => (
                  <div
                    key={story.id}
                    className="bg-[#181A26]/80 backdrop-blur-md rounded-2xl border border-white/10 p-5 flex flex-col sm:flex-row items-center gap-5 hover:border-indigo-500/50 transition-all shadow-xl"
                  >
                    <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden shrink-0 relative bg-black">
                      <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                      {story.isPremium && (
                        <span className="absolute top-2 left-2 bg-amber-500 text-black text-[9px] font-black px-2 py-0.5 rounded">
                          PREMIUM
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 flex-1 text-left">
                      <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">
                        Voz: {story.narrator || "Sintetizada Premium"}
                      </span>
                      <h3 className="font-extrabold text-white text-base">{story.title}</h3>
                      <p className="text-xs text-slate-300 line-clamp-2">{story.description}</p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-mono text-slate-400">{story.durationMinutes} min</span>
                        <button
                          onClick={() => handlePlayContent(story)}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg flex items-center space-x-1 cursor-pointer"
                        >
                          <Play className="h-3.5 w-3.5 fill-current" />
                          <span>Ouvir</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= VIEW 2: MEDITATIONS ================= */}
        {activeTab === "meditations" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div>
              <h1 className="text-3xl font-serif font-black text-white flex items-center space-x-3">
                <Feather className="h-8 w-8 text-purple-400" />
                <span>Biblioteca de Meditações Guiadas</span>
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Sessões gravadas por especialistas para equilíbrio emocional e paz interior.
              </p>
            </div>

            {/* CATEGORY FILTER CHIPS */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-white/10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-purple-600 text-white shadow-md"
                      : "bg-[#181A26] text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {cat === "todas" ? "Todas as Categorias" : cat}
                </button>
              ))}
            </div>

            {/* CONTENT GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.filter(c => c.type === "meditation").map((item) => (
                <div
                  key={item.id}
                  className="bg-[#181A26]/80 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-xl hover:border-purple-500/50 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video overflow-hidden bg-black/50">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <span className="absolute top-3 left-3 bg-black/70 text-purple-300 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                        {item.category}
                      </span>
                      {item.isPremium && (
                        <span className="absolute top-3 right-3 bg-amber-500 text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                          Premium
                        </span>
                      )}
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="text-[11px] font-mono text-purple-400 font-semibold">
                        {item.durationMinutes} minutos
                      </div>
                      <h3 className="font-extrabold text-white text-base">{item.title}</h3>
                      <p className="text-xs text-slate-300">{item.description}</p>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handlePlayContent(item)}
                      className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Play className="h-4 w-4 fill-current" />
                      <span>Reproduzir Áudio</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= VIEW 3: SLEEP STORIES ================= */}
        {activeTab === "stories" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div>
              <h1 className="text-3xl font-serif font-black text-white flex items-center space-x-3">
                <Moon className="h-8 w-8 text-indigo-400" />
                <span>Histórias para Dormir</span>
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Narrativas suaves acompanhadas de paisagens sonoras para desacelerar seus pensamentos noturnos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {contentList.filter(c => c.type === "story").map((item) => (
                <div
                  key={item.id}
                  className="bg-[#181A26]/80 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-xl hover:border-indigo-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video overflow-hidden bg-black/50">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      {item.isPremium && (
                        <span className="absolute top-3 right-3 bg-amber-500 text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-md">
                          Premium
                        </span>
                      )}
                    </div>
                    <div className="p-5 space-y-2">
                      <span className="text-[10px] font-mono text-indigo-400 font-bold block">
                        Narrador: {item.narrator || "Serene Voice"}
                      </span>
                      <h3 className="font-extrabold text-white text-base">{item.title}</h3>
                      <p className="text-xs text-slate-300">{item.description}</p>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handlePlayContent(item)}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Play className="h-4 w-4 fill-current" />
                      <span>Ouvir História ({item.durationMinutes}m)</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= VIEW 4: MINDFULNESS ================= */}
        {activeTab === "mindfulness" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div>
              <h1 className="text-3xl font-serif font-black text-white flex items-center space-x-3">
                <Sparkles className="h-8 w-8 text-emerald-400" />
                <span>Sessões de Mindfulness</span>
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Exercícios práticos de atenção plena, escaneamento corporal e regulação emocional.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contentList.filter(c => c.type === "mindfulness").map((item) => (
                <div
                  key={item.id}
                  className="bg-[#181A26]/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-all shadow-xl"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-emerald-400 font-black uppercase px-2.5 py-1 bg-emerald-500/10 rounded-md border border-emerald-500/30 inline-block">
                      {item.category}
                    </span>
                    <h3 className="font-extrabold text-white text-lg">{item.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs font-mono text-slate-400">{item.durationMinutes} minutos</span>
                    <button
                      onClick={() => handlePlayContent(item)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 cursor-pointer"
                    >
                      <Play className="h-4 w-4 fill-current" />
                      <span>Praticar Agora</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= VIEW 5: BREATHING INTERACTIVE ANIMATION ================= */}
        {activeTab === "breathing" && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in text-center">
            <div>
              <h1 className="text-3xl font-serif font-black text-white flex items-center justify-center space-x-3">
                <Wind className="h-8 w-8 text-purple-400" />
                <span>Exercícios Guiados de Respiração</span>
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Acompanhe o ritmo da animação para desacelerar o sistema nervoso e restaurar a calma.
              </p>
            </div>

            {/* TECHNIQUE SELECTOR */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "box", title: "Respiração 4-4-4-4", desc: "Equilíbrio & Foco (Quadrada)" },
                { id: "478", title: "Respiração 4-7-8", desc: "Sono & Relaxamento Profundo" },
                { id: "diaphragmatic", title: "Diafragmática", desc: "Anti-Ansiedade (5s / 5s)" },
              ].map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => {
                    setBreathingTechnique(tech.id as any);
                    stopBreathing();
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    breathingTechnique === tech.id
                      ? "bg-purple-600/30 border-purple-500 text-white shadow-lg"
                      : "bg-[#181A26] border-white/10 text-slate-400 hover:bg-white/5"
                  }`}
                >
                  <h4 className="font-extrabold text-sm text-white">{tech.title}</h4>
                  <p className="text-[11px] text-slate-300 mt-1">{tech.desc}</p>
                </button>
              ))}
            </div>

            {/* ANIMATED PULSING BREATHING CIRCLE */}
            <div className="bg-[#151722]/90 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-10 md:p-16 flex flex-col items-center justify-center space-y-8 shadow-2xl relative overflow-hidden">
              
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Outer Ambient Ripple Ring */}
                <div 
                  className={`absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 to-emerald-400 opacity-20 transition-all duration-1000 ${
                    breathingState === "inhale" ? "scale-125 opacity-40" : breathingState === "exhale" ? "scale-75 opacity-10" : "scale-100"
                  }`}
                />

                {/* Inner Breathing Orb */}
                <div 
                  className={`w-44 h-44 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-emerald-400 p-1 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.5)] transition-all duration-1000 ${
                    breathingState === "inhale" 
                      ? "scale-125 bg-emerald-500 shadow-[0_0_70px_rgba(16,185,129,0.7)]" 
                      : breathingState === "exhale" 
                      ? "scale-80 bg-purple-700 shadow-[0_0_20px_rgba(168,85,247,0.2)]" 
                      : "scale-100"
                  }`}
                >
                  <div className="w-full h-full bg-[#151722] rounded-full flex flex-col items-center justify-center p-4">
                    <span className="font-serif font-black text-3xl text-white">
                      {breathingActive ? breathingCounter : "4"}
                    </span>
                    <span className="text-[10px] font-mono text-purple-300 uppercase font-black tracking-widest mt-1">
                      {breathingState === "idle" && "Pronto"}
                      {breathingState === "inhale" && "INSPIRE..."}
                      {breathingState === "hold" && "SEGURE..."}
                      {breathingState === "exhale" && "EXPIRE..."}
                      {breathingState === "hold2" && "PAUSA..."}
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION CONTROLS */}
              <div className="space-y-3">
                {!breathingActive ? (
                  <button
                    onClick={startBreathing}
                    className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-emerald-500 hover:brightness-110 text-white font-black text-sm rounded-2xl shadow-xl transition-all cursor-pointer flex items-center space-x-2"
                  >
                    <Play className="h-5 w-5 fill-current" />
                    <span>Iniciar Exercício</span>
                  </button>
                ) : (
                  <button
                    onClick={stopBreathing}
                    className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-black text-sm rounded-2xl shadow-xl transition-all cursor-pointer flex items-center space-x-2"
                  >
                    <Pause className="h-5 w-5 fill-current" />
                    <span>Pausar Exercício</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 6: FAVORITES ================= */}
        {activeTab === "favorites" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div>
              <h1 className="text-3xl font-serif font-black text-white flex items-center space-x-3">
                <Heart className="h-8 w-8 text-red-500 fill-current" />
                <span>Seus Conteúdos Salvos</span>
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Acesse rapidamente suas meditações e histórias favoritas.
              </p>
            </div>

            {favorites.length === 0 ? (
              <div className="bg-[#181A26] border border-white/10 rounded-2xl p-12 text-center space-y-4">
                <Heart className="h-12 w-12 text-slate-500 mx-auto" />
                <h3 className="font-extrabold text-white text-lg">Nenhum favorito salvo ainda</h3>
                <p className="text-xs text-slate-400">Clique no ícone de coração nos cards de meditação para salvar seus favoritos aqui.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {contentList.filter(c => favorites.includes(c.id)).map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#181A26]/80 backdrop-blur-md rounded-2xl border border-white/10 p-5 flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="text-left">
                        <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">{item.category}</span>
                        <h4 className="font-bold text-white text-sm line-clamp-1">{item.title}</h4>
                        <span className="text-xs text-slate-400">{item.durationMinutes} minutos</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePlayContent(item)}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Ouvir Agora</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= VIEW 7: PROFILE ================= */}
        {activeTab === "profile" && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in text-left">
            <div>
              <h1 className="text-3xl font-serif font-black text-white flex items-center space-x-3">
                <User className="h-8 w-8 text-purple-400" />
                <span>Perfil & Configurações</span>
              </h1>
            </div>

            <div className="bg-[#181A26] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center space-x-4 pb-6 border-b border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-black text-2xl text-white shadow-xl">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-xl">{user.name}</h3>
                  <p className="text-xs text-slate-400">{user.email}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-md text-[10px] font-black uppercase ${
                    user.isPremium ? "bg-amber-500 text-black" : "bg-white/10 text-slate-300"
                  }`}>
                    Plano Atual: {user.isPremium ? "PREMIUM VIP" : "GRATUITO (MVP)"}
                  </span>
                </div>
              </div>

              {/* SETTINGS FORM */}
              <div className="space-y-4">
                <h4 className="font-bold text-white text-sm uppercase text-purple-400">Preferências Pessoais</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Idioma do Aplicativo</label>
                    <select
                      value={user.language}
                      onChange={(e) => setUser({ ...user, language: e.target.value as any })}
                      className="w-full bg-[#151722] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="pt">Português (Brasil)</option>
                      <option value="en">English (US)</option>
                      <option value="es">Español</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Lembrete Diário de Meditação</label>
                    <input
                      type="time"
                      value={user.dailyReminder}
                      onChange={(e) => setUser({ ...user, dailyReminder: e.target.value })}
                      className="w-full bg-[#151722] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {!user.isPremium && (
                  <div className="bg-purple-900/30 border border-purple-500/40 p-5 rounded-2xl space-y-3 mt-6">
                    <h5 className="font-extrabold text-white text-sm">Aumente seus limites com o Serene Premium</h5>
                    <p className="text-xs text-slate-300">Acesso ilimitado a +200 meditações guiadas, áudios em 3D e download de histórias offline.</p>
                    <button
                      onClick={() => setActiveTab("premium")}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-purple-600 text-black font-black text-xs rounded-xl cursor-pointer"
                    >
                      Conhecer Planos Premium
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 8: PREMIUM PRICING ================= */}
        {activeTab === "premium" && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-black text-amber-400">
                <Crown className="h-4 w-4" />
                <span>PLANO SERENE PREMIUM</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-black text-white">
                Transforme sua rotina de sono e bem-estar
              </h1>
              <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto">
                Desbloqueie todo o catálogo sem restrições diárias de escuta.
              </p>
            </div>

            {/* PRICING CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {/* PLAN 1: MONTHLY */}
              <div className="bg-[#181A26] border border-white/10 rounded-3xl p-8 space-y-6 relative hover:border-purple-500 transition-all shadow-2xl">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase block">Plano Mensal</span>
                  <h3 className="text-3xl font-black text-white mt-1">R$ 29,90 <span className="text-xs font-normal text-slate-400">/mês</span></h3>
                  <p className="text-xs text-slate-300 mt-2">Flexibilidade total, cancele quando quiser.</p>
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /> <span>Acesso a todas as meditações</span></li>
                  <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /> <span>Biblioteca de histórias para dormir</span></li>
                  <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /> <span>Exercícios ilimitados de respiração</span></li>
                </ul>

                <button
                  onClick={() => {
                    setUser({ ...user, isPremium: true, plan: "monthly" });
                    alert("Parabéns! Sua assinatura Premium foi ativada com sucesso no Serene!");
                    setActiveTab("home");
                  }}
                  className="w-full py-3 bg-white/10 hover:bg-purple-600 text-white font-extrabold text-xs rounded-xl border border-white/20 transition-all cursor-pointer"
                >
                  Assinar Mensal
                </button>
              </div>

              {/* PLAN 2: ANNUAL (BEST VALUE) */}
              <div className="bg-gradient-to-b from-purple-900/50 to-[#181A26] border-2 border-purple-500 rounded-3xl p-8 space-y-6 relative shadow-[0_0_50px_rgba(168,85,247,0.25)]">
                <span className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-purple-600 text-black font-black text-[10px] uppercase px-3 py-1 rounded-full shadow">
                  MELHOR VALOR (44% OFF)
                </span>

                <div>
                  <span className="text-xs font-mono font-bold text-purple-300 uppercase block">Plano Anual</span>
                  <h3 className="text-3xl font-black text-white mt-1">R$ 199,90 <span className="text-xs font-normal text-slate-400">/ano</span></h3>
                  <p className="text-xs text-slate-300 mt-2">Equivalente a apenas R$ 16,65/mês cobrado anualmente.</p>
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /> <span>Tudo do Plano Mensal</span></li>
                  <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /> <span>Áudios imersivos em 3D</span></li>
                  <li className="flex items-center space-x-2"><Check className="h-4 w-4 text-emerald-400 shrink-0" /> <span>Atendimento prioritário VIP</span></li>
                </ul>

                <button
                  onClick={() => {
                    setUser({ ...user, isPremium: true, plan: "annual" });
                    alert("Parabéns! Sua assinatura Anual Premium foi ativada com sucesso no Serene!");
                    setActiveTab("home");
                  }}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 hover:brightness-110 text-black font-black text-xs rounded-xl shadow-xl transition-all cursor-pointer"
                >
                  Assinar Anual com Desconto
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 9: ADMIN DASHBOARD PANEL ================= */}
        {activeTab === "admin" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div>
              <h1 className="text-3xl font-serif font-black text-white flex items-center space-x-3">
                <Settings className="h-8 w-8 text-purple-400" />
                <span>Painel Administrativo Web</span>
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Gerencie meditações, histórias, áudios, categorias e assinantes da plataforma Serene.
              </p>
            </div>

            {/* ADMIN METRICS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-[#181A26] border border-white/10 p-5 rounded-2xl">
                <span className="text-[10px] font-mono text-slate-400 block">TOTAL DE USUÁRIOS</span>
                <span className="text-2xl font-black text-white">4.820</span>
              </div>
              <div className="bg-[#181A26] border border-white/10 p-5 rounded-2xl">
                <span className="text-[10px] font-mono text-slate-400 block">ASSINANTES PREMIUM</span>
                <span className="text-2xl font-black text-amber-400">1.240</span>
              </div>
              <div className="bg-[#181A26] border border-white/10 p-5 rounded-2xl">
                <span className="text-[10px] font-mono text-slate-400 block">RECEITA MENSAL (MRR)</span>
                <span className="text-2xl font-black text-emerald-400">R$ 37.076</span>
              </div>
              <div className="bg-[#181A26] border border-white/10 p-5 rounded-2xl">
                <span className="text-[10px] font-mono text-slate-400 block">SESSÕES CONCLUÍDAS</span>
                <span className="text-2xl font-black text-purple-400">142.900</span>
              </div>
            </div>

            {/* ADD NEW CONTENT FORM */}
            <div className="bg-[#181A26] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
              <h3 className="font-extrabold text-white text-lg flex items-center space-x-2">
                <Plus className="h-5 w-5 text-purple-400" />
                <span>Cadastrar Novo Conteúdo</span>
              </h3>

              <form onSubmit={handleAddAdminContent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Título do Conteúdo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Meditação para Paz Profunda"
                    value={adminTitle}
                    onChange={(e) => setAdminTitle(e.target.value)}
                    className="w-full bg-[#151722] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Tipo de Conteúdo</label>
                  <select
                    value={adminType}
                    onChange={(e) => setAdminType(e.target.value as any)}
                    className="w-full bg-[#151722] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="meditation">Meditação Guiada</option>
                    <option value="story">História para Dormir</option>
                    <option value="mindfulness">Mindfulness</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Categoria</label>
                  <select
                    value={adminCategory}
                    onChange={(e) => setAdminCategory(e.target.value)}
                    className="w-full bg-[#151722] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Ansiedade">Ansiedade</option>
                    <option value="Sono">Sono</option>
                    <option value="Relaxamento">Relaxamento</option>
                    <option value="Foco">Foco</option>
                    <option value="Gratidão">Gratidão</option>
                    <option value="Autoconhecimento">Autoconhecimento</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Duração (Minutos)</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={adminDuration}
                    onChange={(e) => setAdminDuration(Number(e.target.value))}
                    className="w-full bg-[#151722] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-300 block mb-1">URL da Imagem de Capa</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={adminImage}
                    onChange={(e) => setAdminImage(e.target.value)}
                    className="w-full bg-[#151722] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-300 block mb-1">Descrição</label>
                  <textarea
                    rows={3}
                    placeholder="Descreva o objetivo da sessão..."
                    value={adminDescription}
                    onChange={(e) => setAdminDescription(e.target.value)}
                    className="w-full bg-[#151722] border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex items-center space-x-2 md:col-span-2">
                  <input
                    type="checkbox"
                    id="isPremium"
                    checked={adminIsPremium}
                    onChange={(e) => setAdminIsPremium(e.target.checked)}
                    className="rounded border-white/10 bg-[#151722] text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="isPremium" className="text-xs font-bold text-slate-300">
                    Conteúdo Exclusivo Premium
                  </label>
                </div>

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs rounded-xl shadow-lg cursor-pointer"
                  >
                    Publicar Conteúdo no App
                  </button>
                </div>
              </form>
            </div>

            {/* CONTENT MANAGEMENT TABLE */}
            <div className="bg-[#181A26] border border-white/10 rounded-3xl p-6 md:p-8 space-y-4 shadow-2xl">
              <h3 className="font-extrabold text-white text-lg">Catálogo Publicado ({contentList.length})</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#151722] text-purple-300 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Item</th>
                      <th className="p-3">Categoria</th>
                      <th className="p-3">Duração</th>
                      <th className="p-3">Acesso</th>
                      <th className="p-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {contentList.map((c) => (
                      <tr key={c.id} className="hover:bg-white/5">
                        <td className="p-3 font-bold text-white flex items-center space-x-2">
                          <img src={c.image} className="w-8 h-8 rounded-lg object-cover" />
                          <span>{c.title}</span>
                        </td>
                        <td className="p-3">{c.category}</td>
                        <td className="p-3">{c.durationMinutes} min</td>
                        <td className="p-3">
                          {c.isPremium ? (
                            <span className="text-amber-400 font-bold">Premium</span>
                          ) : (
                            <span className="text-emerald-400 font-bold">Grátis</span>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleDeleteAdminContent(c.id)}
                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg cursor-pointer"
                            title="Excluir Conteúdo"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FLOATING AUDIO PLAYER BAR */}
      {activeItem && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#151722]/95 backdrop-blur-2xl border-t border-purple-500/40 px-4 md:px-8 py-3 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.9)] animate-slide-up">
          <div className="flex items-center space-x-3 max-w-xs md:max-w-md">
            <img src={activeItem.image} alt={activeItem.title} className="w-12 h-12 rounded-xl object-cover border border-purple-500/40" />
            <div className="text-left">
              <span className="text-[9px] font-mono font-bold text-purple-400 uppercase block">{activeItem.category}</span>
              <h4 className="font-extrabold text-white text-xs line-clamp-1">{activeItem.title}</h4>
              <span className="text-[10px] text-slate-400 font-mono">Som Ambiente Ativo</span>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-1 w-1/3">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAudioProgress((p) => Math.max(0, p - 10))}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-lg cursor-pointer"
              >
                {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>

            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-emerald-400 h-full transition-all"
                style={{ width: `${audioProgress}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => {
              setActiveItem(null);
              setIsPlaying(false);
            }}
            className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
            title="Fechar Player"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

    </div>
  );
}
