import React, { useState } from "react";
import { 
  Home, BookOpen, Clock, PlusCircle, Heart, History, Users, CreditCard, User, 
  HelpCircle, Settings, LogOut, Search, Filter, Sparkles, Check, ChevronRight, 
  Copy, Share2, QrCode, Lock, ShieldCheck, Play, Eye, ArrowLeft, RefreshCw, X, 
  MessageSquare, Star, ArrowUpRight, AlertCircle, Calendar, Save, CheckCircle2, MoreHorizontal
} from "lucide-react";
import { INITIAL_PSYCHOLOGIST, INITIAL_RESOURCES, INITIAL_SESSIONS } from "./mockData";
import { TherapeuticResource, TherapeuticSession, AgeRange, ClinicalDemand } from "./types";
import { SandTrayCanvas } from "./SandTrayCanvas";
import { DrawingCanvas } from "./DrawingCanvas";
import { ReflectiveCardDeck } from "./ReflectiveCardDeck";

interface PsychologistViewProps {
  onOpenPatientView?: (sessionCode: string, resource: TherapeuticResource) => void;
}

export const PsychologistView: React.FC<PsychologistViewProps> = ({
  onOpenPatientView
}) => {
  const [activeTab, setActiveTab] = useState<
    "home" | "library" | "sessions" | "create_session" | "favorites" | "history" | "patients" | "subscription" | "profile" | "help" | "crp_validation"
  >("home");

  const [psychologist, setPsychologist] = useState(INITIAL_PSYCHOLOGIST);
  const [resources, setResources] = useState<TherapeuticResource[]>(INITIAL_RESOURCES);
  const [sessions, setSessions] = useState<TherapeuticSession[]>(INITIAL_SESSIONS);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAge, setSelectedAge] = useState<string>("Todas as idades");
  const [selectedDemand, setSelectedDemand] = useState<string>("Todas");

  // Resource detail drawer
  const [selectedResourceDetail, setSelectedResourceDetail] = useState<TherapeuticResource | null>(null);

  // Active Session state
  const [activeLiveSession, setActiveLiveSession] = useState<{
    session: TherapeuticSession;
    resource: TherapeuticResource;
  } | null>(null);

  // Private notes in active live session
  const [privateNotes, setPrivateNotes] = useState<string[]>([
    "Paciente demonstrou boa aderência à atividade inicial.",
    "Anotações privadas do psicólogo não visíveis ao paciente."
  ]);
  const [newNoteInput, setNewNoteInput] = useState("");

  // Create Session Modal/Step
  const [newSessionPatient, setNewSessionPatient] = useState("L.");
  const [newSessionAge, setNewSessionAge] = useState("7 a 9 anos");
  const [newSessionResourceId, setNewSessionResourceId] = useState("rec-1");
  const [createdSessionInvite, setCreatedSessionInvite] = useState<{
    code: string;
    link: string;
    resource: TherapeuticResource;
  } | null>(null);

  // Subscription modal / plan selection
  const [checkoutPlan, setCheckoutPlan] = useState<"monthly" | "quarterly" | "annual" | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filtered resources
  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAge = selectedAge === "Todas as idades" || r.ageRanges.includes(selectedAge as any);
    const matchesDemand = selectedDemand === "Todas" || r.demands.includes(selectedDemand as any);
    return matchesSearch && matchesAge && matchesDemand;
  });

  const handleCreateSessionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = resources.find(r => r.id === newSessionResourceId) || resources[0];
    const code = Math.floor(100000 + Math.random() * 900000).toString().replace(/(\d{3})(\d{3})/, "$1 $2");
    
    setCreatedSessionInvite({
      code,
      link: `menteludica.app/s/${code.replace(/\s/g, "")}`,
      resource: res
    });
  };

  const startLiveSession = (res: TherapeuticResource) => {
    const newSess: TherapeuticSession = {
      id: `SES-2026-${Math.floor(100 + Math.random() * 900)}`,
      code: "482 917",
      patientInitials: newSessionPatient || "L.",
      ageGroup: newSessionAge,
      date: "Hoje - Agora",
      durationMinutes: 0,
      status: "in_progress",
      resourceId: res.id,
      resourceTitle: res.title,
      notes: [],
      savedStatesCount: 0,
      patientConnected: true
    };

    setActiveLiveSession({
      session: newSess,
      resource: res
    });
  };

  const handleCopyLink = (linkText: string) => {
    navigator.clipboard?.writeText(linkText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const toggleFavorite = (id: string) => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F6FB] text-[#2F3142] font-sans flex flex-col lg:flex-row">
      {/* Trial Top Alert Bar */}
      {psychologist.planStatus === "trial" && (
        <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#7567E8] to-[#5E9FD6] text-white py-2 px-4 text-xs font-semibold z-50 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              Seu período de teste gratuito termina em <strong className="underline">{psychologist.trialDaysRemaining} dias</strong>. Aproveite todos os recursos!
            </span>
            <button
              onClick={() => setActiveTab("subscription")}
              className="bg-white text-[#7567E8] px-3 py-1 rounded-full font-bold text-[11px] hover:bg-white/90 transition-colors shadow-xs"
            >
              Escolher Plano
            </button>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className={`w-64 bg-white border-r border-[#E7E5F0] flex flex-col justify-between hidden lg:flex shrink-0 ${
        psychologist.planStatus === "trial" ? "pt-12" : "pt-4"
      } p-4 text-xs font-medium`}>
        <div className="space-y-6">
          {/* Logo Brand */}
          <div className="px-3 py-2 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#7567E8] text-white flex items-center justify-center font-black text-lg shadow-sm">
              M
            </div>
            <div>
              <span className="font-extrabold text-base text-[#2F3142] tracking-tight block">MenteLúdica</span>
              <span className="text-[10px] text-[#73768B]">Recursos Terapêuticos</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { id: "home", icon: Home, label: "Início" },
              { id: "library", icon: BookOpen, label: "Biblioteca" },
              { id: "sessions", icon: Clock, label: "Minhas Sessões" },
              { id: "create_session", icon: PlusCircle, label: "Criar Sessão", badge: "Novo" },
              { id: "favorites", icon: Heart, label: "Favoritos" },
              { id: "history", icon: History, label: "Histórico" },
              { id: "patients", icon: Users, label: "Pacientes Convidados" },
              { id: "crp_validation", icon: ShieldCheck, label: "Validação de CRP" },
              { id: "subscription", icon: CreditCard, label: "Assinatura & Planos" },
              { id: "profile", icon: User, label: "Perfil Profissional" },
              { id: "help", icon: HelpCircle, label: "Central de Ajuda" }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setActiveLiveSession(null);
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                    isActive
                      ? "bg-[#7567E8] text-white font-bold shadow-xs"
                      : "text-[#73768B] hover:bg-[#F7F6FB] hover:text-[#2F3142]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] bg-[#E7A3B4] text-white px-1.5 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Info */}
        <div className="pt-4 border-t border-[#E7E5F0] space-y-3">
          <div className="bg-[#F7F6FB] p-3 rounded-xl border border-[#E7E5F0]">
            <span className="text-[10px] font-bold text-[#73768B] uppercase block">Plano Atual</span>
            <p className="font-bold text-[#2F3142] text-xs mt-0.5">Degustação (3 Dias)</p>
            <button
              onClick={() => setActiveTab("subscription")}
              className="mt-2 text-[11px] text-[#7567E8] font-bold hover:underline"
            >
              Ver Planos de Assinatura →
            </button>
          </div>

          <div className="flex items-center gap-2 px-1">
            <div className="w-8 h-8 rounded-full bg-[#7567E8]/20 text-[#7567E8] font-bold flex items-center justify-center">
              ML
            </div>
            <div className="flex-1 truncate">
              <p className="font-bold text-xs text-[#2F3142] truncate">{psychologist.name}</p>
              <p className="text-[10px] text-[#73768B]">CRP {psychologist.crp}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E7E5F0] py-2 px-3 z-40 flex items-center justify-around text-[10px] font-semibold text-[#73768B]">
        <button
          onClick={() => { setActiveTab("home"); setActiveLiveSession(null); }}
          className={`flex flex-col items-center gap-1 ${activeTab === "home" ? "text-[#7567E8]" : ""}`}
        >
          <Home className="w-5 h-5" />
          Início
        </button>

        <button
          onClick={() => { setActiveTab("library"); setActiveLiveSession(null); }}
          className={`flex flex-col items-center gap-1 ${activeTab === "library" ? "text-[#7567E8]" : ""}`}
        >
          <BookOpen className="w-5 h-5" />
          Biblioteca
        </button>

        {/* Highlighted Center Session Button */}
        <button
          onClick={() => { setActiveTab("create_session"); setActiveLiveSession(null); }}
          className="flex flex-col items-center -mt-5"
        >
          <div className="w-12 h-12 rounded-full bg-[#7567E8] text-white flex items-center justify-center shadow-lg border-2 border-white">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] text-[#7567E8] font-bold mt-1">Sessão</span>
        </button>

        <button
          onClick={() => { setActiveTab("favorites"); setActiveLiveSession(null); }}
          className={`flex flex-col items-center gap-1 ${activeTab === "favorites" ? "text-[#7567E8]" : ""}`}
        >
          <Heart className="w-5 h-5" />
          Favoritos
        </button>

        <button
          onClick={() => { setActiveTab("subscription"); setActiveLiveSession(null); }}
          className={`flex flex-col items-center gap-1 ${activeTab === "subscription" ? "text-[#7567E8]" : ""}`}
        >
          <CreditCard className="w-5 h-5" />
          Mais
        </button>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className={`flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto pb-24 lg:pb-8 ${
        psychologist.planStatus === "trial" ? "pt-14 lg:pt-14" : ""
      }`}>
        {/* IF LIVE SESSION IS ACTIVE */}
        {activeLiveSession ? (
          <div className="space-y-4 animate-fade-in">
            {/* Live Session Top Header */}
            <div className="bg-white border border-[#E7E5F0] rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#64B89A]/20 text-[#308164] font-bold text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#64B89A] animate-ping" />
                    Sessão em Andamento
                  </span>
                  <span className="text-xs text-[#73768B]">Paciente {activeLiveSession.session.patientInitials}</span>
                </div>
                <h2 className="font-extrabold text-lg text-[#2F3142] mt-0.5">{activeLiveSession.resource.title}</h2>
              </div>

              <div className="flex items-center gap-2 text-xs">
                {onOpenPatientView && (
                  <button
                    onClick={() => onOpenPatientView("482 917", activeLiveSession.resource)}
                    className="px-3 py-1.5 bg-[#5E9FD6] hover:bg-[#4A8CC3] text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Abrir Visão do Paciente
                  </button>
                )}

                <button
                  onClick={() => setActiveLiveSession(null)}
                  className="px-3 py-1.5 bg-[#E7A3B4]/20 hover:bg-[#E7A3B4]/40 text-[#D84C72] font-bold rounded-xl transition-colors"
                >
                  Encerrar Sessão
                </button>
              </div>
            </div>

            {/* Main Interactive Canvas Component */}
            {activeLiveSession.resource.type === "scenario" && (
              <SandTrayCanvas isPsychologistView={true} patientCanInteract={true} />
            )}
            {activeLiveSession.resource.type === "drawing" && (
              <DrawingCanvas isPsychologistView={true} patientCanInteract={true} />
            )}
            {activeLiveSession.resource.type === "cards" && (
              <ReflectiveCardDeck isPsychologistView={true} />
            )}

            {/* Private Clinical Notes Panel (Psychologist Only) */}
            <div className="bg-white border border-[#E7E5F0] rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E7E5F0]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#64B89A]" />
                  <h3 className="font-bold text-sm text-[#2F3142]">Anotações Privadas da Sessão</h3>
                </div>
                <span className="text-[11px] text-[#73768B] italic">Não são exibidas para o paciente</span>
              </div>

              <div className="space-y-2 text-xs">
                {privateNotes.map((note, i) => (
                  <div key={i} className="p-2.5 bg-[#F7F6FB] rounded-xl border border-[#E7E5F0] text-[#2F3142] flex items-start gap-2">
                    <span className="text-[#7567E8] font-bold">•</span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 text-xs pt-1">
                <input
                  type="text"
                  value={newNoteInput}
                  onChange={(e) => setNewNoteInput(e.target.value)}
                  placeholder="Escreva uma observação de comportamento ou tema para retomar..."
                  className="flex-1 p-2.5 border border-[#E7E5F0] rounded-xl focus:outline-none focus:border-[#7567E8] bg-[#F7F6FB]"
                />
                <button
                  onClick={() => {
                    if (newNoteInput.trim()) {
                      setPrivateNotes(prev => [...prev, newNoteInput]);
                      setNewNoteInput("");
                    }
                  }}
                  className="px-4 py-2 bg-[#7567E8] text-white rounded-xl font-bold hover:bg-[#6253D6] transition-colors"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* VIEW 1: HOME DASHBOARD */}
            {activeTab === "home" && (
              <div className="space-y-6 animate-fade-in">
                {/* Greeting Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="font-extrabold text-2xl text-[#2F3142]">Olá, {psychologist.name}</h1>
                    <p className="text-xs text-[#73768B] mt-0.5">Prepare sua próxima sessão ou continue de onde parou.</p>
                  </div>

                  <button
                    onClick={() => setActiveTab("create_session")}
                    className="px-4 py-2.5 bg-[#7567E8] hover:bg-[#6253D6] text-white rounded-xl font-bold text-xs shadow-md flex items-center gap-2 transition-colors"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Criar Nova Sessão
                  </button>
                </div>

                {/* Dashboard Metrics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { label: "Sessões no Mês", val: "18", color: "text-[#7567E8]" },
                    { label: "Recursos Utilizados", val: "12", color: "text-[#5E9FD6]" },
                    { label: "Recursos Favoritos", val: "9", color: "text-[#E7A3B4]" },
                    { label: "Tempo Média Sessão", val: "41 min", color: "text-[#64B89A]" },
                    { label: "Próxima Renovação", val: "26/08", color: "text-[#2F3142]" }
                  ].map((m, i) => (
                    <div key={i} className="bg-white border border-[#E7E5F0] p-4 rounded-xl shadow-xs">
                      <span className="text-[10px] font-bold text-[#73768B] uppercase">{m.label}</span>
                      <p className={`text-xl font-extrabold mt-1 ${m.color}`}>{m.val}</p>
                    </div>
                  ))}
                </div>

                {/* Quick Actions Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { title: "Criar Sessão", desc: "Gerar link rápido", icon: PlusCircle, tab: "create_session" },
                    { title: "Explorar Biblioteca", desc: "Filtrar atividades", icon: BookOpen, tab: "library" },
                    { title: "Minhas Sessões", desc: "Ver histórico", icon: Clock, tab: "sessions" },
                    { title: "Favoritos", desc: "Coleções salvas", icon: Heart, tab: "favorites" }
                  ].map((act, i) => {
                    const Icon = act.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => setActiveTab(act.tab as any)}
                        className="bg-white hover:bg-[#7567E8]/5 border border-[#E7E5F0] hover:border-[#7567E8] p-4 rounded-2xl text-left shadow-xs transition-all group"
                      >
                        <Icon className="w-5 h-5 text-[#7567E8] mb-2 group-hover:scale-110 transition-transform" />
                        <p className="font-bold text-xs text-[#2F3142]">{act.title}</p>
                        <p className="text-[10px] text-[#73768B]">{act.desc}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Recent Sessions List */}
                <div className="bg-white border border-[#E7E5F0] rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E7E5F0]">
                    <h3 className="font-bold text-sm text-[#2F3142]">Sessões Recentes</h3>
                    <button onClick={() => setActiveTab("sessions")} className="text-xs text-[#7567E8] font-bold hover:underline">
                      Ver todas →
                    </button>
                  </div>

                  <div className="divide-y divide-[#E7E5F0]">
                    {sessions.map((s) => (
                      <div key={s.id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#2F3142]">Paciente {s.patientInitials}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              s.status === "completed" ? "bg-[#64B89A]/20 text-[#308164]" : "bg-[#E7A3B4]/20 text-[#D84C72]"
                            }`}>
                              {s.status === "completed" ? "Concluída" : "Interrompida"}
                            </span>
                          </div>
                          <p className="text-[#73768B] text-[11px] mt-0.5">
                            {s.resourceTitle} • {s.date} • {s.durationMinutes} minutos
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const res = resources.find(r => r.id === s.resourceId) || resources[0];
                              startLiveSession(res);
                            }}
                            className="px-3 py-1.5 bg-[#7567E8]/10 hover:bg-[#7567E8] text-[#7567E8] hover:text-white rounded-xl font-bold transition-colors"
                          >
                            Reabrir Sessão
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: THERAPEUTIC LIBRARY */}
            {activeTab === "library" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-extrabold text-xl text-[#2F3142]">Biblioteca Terapêutica</h2>
                  <p className="text-xs text-[#73768B]">Encontre atividades para diferentes idades, contextos e demandas clínicas.</p>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-white border border-[#E7E5F0] rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 text-[#73768B] absolute left-3 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar por recurso, objetivo ou demanda..."
                      className="w-full text-xs pl-9 pr-3 py-2.5 border border-[#E7E5F0] rounded-xl focus:outline-none focus:border-[#7567E8] bg-[#F7F6FB]"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <select
                      value={selectedAge}
                      onChange={(e) => setSelectedAge(e.target.value)}
                      className="p-2.5 border border-[#E7E5F0] rounded-xl bg-[#F7F6FB] font-medium"
                    >
                      {["Todas as idades", "4 a 6 anos", "7 a 9 anos", "10 a 12 anos", "13 a 17 anos", "Adultos"].map((a, i) => (
                        <option key={i} value={a}>{a}</option>
                      ))}
                    </select>

                    <select
                      value={selectedDemand}
                      onChange={(e) => setSelectedDemand(e.target.value)}
                      className="p-2.5 border border-[#E7E5F0] rounded-xl bg-[#F7F6FB] font-medium"
                    >
                      {["Todas", "ansiedade", "autoestima", "emoções", "vínculos", "medo", "raiva", "habilidades sociais", "autoconhecimento", "regulação emocional"].map((d, i) => (
                        <option key={i} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Resource Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredResources.map((res) => (
                    <div key={res.id} className="bg-white border border-[#E7E5F0] rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between group hover:shadow-md transition-all">
                      <div>
                        <div className="relative h-40 overflow-hidden">
                          <img src={res.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute top-3 left-3 flex gap-2">
                            <span className="bg-[#7567E8] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase shadow-xs">
                              {res.category}
                            </span>
                          </div>

                          <button
                            onClick={() => toggleFavorite(res.id)}
                            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-xs text-[#2F3142] hover:text-[#D84C72] transition-colors"
                          >
                            <Heart className={`w-4 h-4 ${res.isFavorite ? "fill-[#D84C72] text-[#D84C72]" : ""}`} />
                          </button>
                        </div>

                        <div className="p-4 space-y-2">
                          <h3 className="font-bold text-base text-[#2F3142]">{res.title}</h3>
                          <p className="text-xs text-[#73768B] line-clamp-2">{res.description}</p>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {res.demands.map((d, idx) => (
                              <span key={idx} className="bg-[#F7F6FB] text-[#73768B] border border-[#E7E5F0] text-[10px] font-semibold px-2 py-0.5 rounded-md">
                                #{d}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 pt-0 flex items-center gap-2">
                        <button
                          onClick={() => setSelectedResourceDetail(res)}
                          className="flex-1 py-2 bg-[#F7F6FB] hover:bg-[#E7E5F0] text-[#2F3142] rounded-xl text-xs font-bold transition-colors"
                        >
                          Ver Detalhes
                        </button>
                        <button
                          onClick={() => startLiveSession(res)}
                          className="flex-1 py-2 bg-[#7567E8] hover:bg-[#6253D6] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          Iniciar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 3: CREATE SESSION / LINK GENERATOR */}
            {activeTab === "create_session" && (
              <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-extrabold text-xl text-[#2F3142]">Criar Nova Sessão Interativa</h2>
                  <p className="text-xs text-[#73768B]">Gere um convite seguro e temporário para o paciente.</p>
                </div>

                {!createdSessionInvite ? (
                  <form onSubmit={handleCreateSessionSubmit} className="bg-white border border-[#E7E5F0] rounded-2xl p-6 shadow-sm space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-[#2F3142] mb-1">Iniciais ou Apelido do Paciente</label>
                      <input
                        type="text"
                        required
                        value={newSessionPatient}
                        onChange={(e) => setNewSessionPatient(e.target.value)}
                        placeholder="Ex: L."
                        className="w-full p-3 border border-[#E7E5F0] rounded-xl focus:outline-none focus:border-[#7567E8] bg-[#F7F6FB]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#2F3142] mb-1">Faixa Etária</label>
                      <select
                        value={newSessionAge}
                        onChange={(e) => setNewSessionAge(e.target.value)}
                        className="w-full p-3 border border-[#E7E5F0] rounded-xl bg-[#F7F6FB] font-medium"
                      >
                        {["4 a 6 anos", "7 a 9 anos", "10 a 12 anos", "13 a 17 anos", "Adultos"].map((a, i) => (
                          <option key={i} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-[#2F3142] mb-1">Selecionar Recurso Terapêutico</label>
                      <select
                        value={newSessionResourceId}
                        onChange={(e) => setNewSessionResourceId(e.target.value)}
                        className="w-full p-3 border border-[#E7E5F0] rounded-xl bg-[#F7F6FB] font-medium"
                      >
                        {resources.map(r => (
                          <option key={r.id} value={r.id}>{r.title} ({r.category})</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#7567E8] hover:bg-[#6253D6] text-white rounded-xl font-bold text-sm shadow-md transition-all mt-2"
                    >
                      Gerar Link e Código
                    </button>
                  </form>
                ) : (
                  <div className="bg-white border border-[#E7E5F0] rounded-2xl p-6 shadow-md text-center space-y-4 animate-fade-in">
                    <div className="w-12 h-12 bg-[#64B89A]/20 text-[#308164] rounded-2xl flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>

                    <div>
                      <h3 className="font-extrabold text-lg text-[#2F3142]">Sessão Criada com Sucesso</h3>
                      <p className="text-xs text-[#73768B] mt-0.5">Compartilhe o link com o paciente {newSessionPatient}.</p>
                    </div>

                    <div className="bg-[#F7F6FB] border border-[#E7E5F0] p-4 rounded-xl text-left space-y-2 text-xs">
                      <p><strong>Código de Acesso:</strong> <span className="font-mono font-bold text-[#7567E8] text-sm ml-1">{createdSessionInvite.code}</span></p>
                      <p><strong>Link Temporário:</strong> <span className="font-mono text-[#2F3142] ml-1">{createdSessionInvite.link}</span></p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopyLink(createdSessionInvite.link)}
                        className="flex-1 py-2.5 bg-[#7567E8] text-white rounded-xl font-bold text-xs hover:bg-[#6253D6] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copiedLink ? "Copiado!" : "Copiar Link"}
                      </button>

                      <button
                        onClick={() => startLiveSession(createdSessionInvite.resource)}
                        className="flex-1 py-2.5 bg-[#64B89A] text-white rounded-xl font-bold text-xs hover:bg-[#529E83] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        Entrar na Sala
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIEW 4: CRP VALIDATION SCREEN */}
            {activeTab === "crp_validation" && (
              <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-extrabold text-xl text-[#2F3142]">Validação do CRP Profissional</h2>
                  <p className="text-xs text-[#73768B]">Acompanhe o status do seu registro no Conselho de Psicologia.</p>
                </div>

                <div className="bg-white border border-[#E7E5F0] rounded-2xl p-6 shadow-sm space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E7E5F0]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#64B89A]/20 text-[#308164] flex items-center justify-center font-bold">
                        CRP
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#2F3142]">{psychologist.name}</p>
                        <p className="text-[11px] text-[#73768B]">Registro {psychologist.crp} • {psychologist.state}</p>
                      </div>
                    </div>

                    <span className="bg-[#64B89A]/20 text-[#308164] font-extrabold px-3 py-1 rounded-full text-xs flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Validado
                    </span>
                  </div>

                  <p className="text-[#73768B] leading-relaxed">
                    Sua inscrição no Conselho Regional de Psicologia de São Paulo foi verificada em <strong>26/07/2026</strong>. Seu acesso às funções clínicas da MenteLúdica permanece liberado.
                  </p>
                </div>
              </div>
            )}

            {/* VIEW 5: SUBSCRIPTION & PLANS */}
            {activeTab === "subscription" && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center max-w-xl mx-auto">
                  <h2 className="font-extrabold text-2xl text-[#2F3142]">Planos de Assinatura MenteLúdica</h2>
                  <p className="text-xs text-[#73768B] mt-1">Escolha a melhor opção para transformar o acompanhamento clínico dos seus pacientes.</p>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {[
                    {
                      id: "monthly",
                      title: "Plano Mensal",
                      price: "R$ 79,90",
                      period: "/mês",
                      desc: "Flexibilidade para assinar mês a mês",
                      features: ["Biblioteca completa", "Sessões ilimitadas", "Suporte prioritário", "Histórico de 90 dias"]
                    },
                    {
                      id: "quarterly",
                      title: "Plano Trimestral",
                      price: "R$ 69,90",
                      period: "/mês",
                      badge: "Economize R$ 30",
                      desc: "R$ 209,70 cobrados a cada 3 meses",
                      features: ["Biblioteca completa", "Sessões ilimitadas", "Coleções personalizadas", "Suporte prioritário"]
                    },
                    {
                      id: "annual",
                      title: "Plano Anual",
                      price: "R$ 59,90",
                      period: "/mês",
                      badge: "Melhor Custo-Benefício",
                      highlight: true,
                      desc: "R$ 718,80 cobrados anualmente",
                      features: ["Biblioteca completa", "Sessões ilimitadas", "Acesso antecipado a novos jogos", "Histórico vitalício"]
                    }
                  ].map(plan => (
                    <div
                      key={plan.id}
                      className={`bg-white rounded-2xl p-6 shadow-sm border-2 flex flex-col justify-between transition-all relative ${
                        plan.highlight ? "border-[#7567E8] shadow-md" : "border-[#E7E5F0]"
                      }`}
                    >
                      {plan.badge && (
                        <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#7567E8] text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase shadow-xs">
                          {plan.badge}
                        </span>
                      )}

                      <div className="space-y-4">
                        <div>
                          <h3 className="font-bold text-base text-[#2F3142]">{plan.title}</h3>
                          <p className="text-xs text-[#73768B] mt-0.5">{plan.desc}</p>
                        </div>

                        <div>
                          <span className="text-3xl font-black text-[#2F3142]">{plan.price}</span>
                          <span className="text-xs text-[#73768B]">{plan.period}</span>
                        </div>

                        <ul className="space-y-2 text-xs text-[#73768B]">
                          {plan.features.map((f, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-[#64B89A] shrink-0" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => setCheckoutPlan(plan.id as any)}
                        className={`mt-6 w-full py-3 rounded-xl font-bold text-xs transition-colors shadow-xs ${
                          plan.highlight 
                            ? "bg-[#7567E8] hover:bg-[#6253D6] text-white" 
                            : "bg-[#F7F6FB] hover:bg-[#E7E5F0] text-[#2F3142]"
                        }`}
                      >
                        Assinar {plan.title}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Checkout Simulator Modal */}
                {checkoutPlan && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-fade-in relative">
                      <button
                        onClick={() => setCheckoutPlan(null)}
                        className="absolute top-4 right-4 p-1 text-[#73768B] hover:text-[#2F3142]"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <h3 className="font-extrabold text-lg text-[#2F3142]">Confirmar Assinatura MenteLúdica</h3>

                      <div className="bg-[#F7F6FB] p-3 rounded-xl border border-[#E7E5F0] text-xs space-y-1">
                        <p className="font-bold text-[#2F3142]">Plano {checkoutPlan.toUpperCase()}</p>
                        <p className="text-[#73768B]">Cobrança transparente recorrente simulada.</p>
                      </div>

                      <form onSubmit={(e) => { e.preventDefault(); alert("Assinatura simulada ativada com sucesso!"); setCheckoutPlan(null); }} className="space-y-3 text-xs">
                        <input type="text" placeholder="Número do Cartão de Crédito" required defaultValue="4532 •••• •••• 4821" className="w-full p-2.5 border border-[#E7E5F0] rounded-xl bg-[#F7F6FB]" />
                        <div className="grid grid-cols-2 gap-2">
                          <input type="text" placeholder="Validade (MM/AA)" required defaultValue="08/29" className="p-2.5 border border-[#E7E5F0] rounded-xl bg-[#F7F6FB]" />
                          <input type="text" placeholder="CVV" required defaultValue="123" className="p-2.5 border border-[#E7E5F0] rounded-xl bg-[#F7F6FB]" />
                        </div>
                        <button type="submit" className="w-full py-3 bg-[#7567E8] text-white font-bold rounded-xl hover:bg-[#6253D6] shadow-md">
                          Confirmar Assinatura
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* RESOURCE DETAIL DRAWER MODAL */}
      {selectedResourceDetail && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-end p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg h-full sm:h-auto sm:max-h-[90vh] sm:rounded-2xl p-6 shadow-2xl overflow-y-auto space-y-5 animate-fade-in relative">
            <button
              onClick={() => setSelectedResourceDetail(null)}
              className="absolute top-4 right-4 p-1 rounded-full bg-[#F7F6FB] text-[#73768B] hover:text-[#2F3142]"
            >
              <X className="w-5 h-5" />
            </button>

            <img src={selectedResourceDetail.coverImage} alt="" className="w-full h-44 rounded-xl object-cover" />

            <div>
              <span className="bg-[#7567E8]/10 text-[#7567E8] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                {selectedResourceDetail.category}
              </span>
              <h2 className="font-extrabold text-xl text-[#2F3142] mt-1">{selectedResourceDetail.title}</h2>
              <p className="text-xs text-[#73768B] mt-1">{selectedResourceDetail.description}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-bold text-[#2F3142] mb-1">Objetivo Terapêutico</h4>
                <p className="text-[#73768B] bg-[#F7F6FB] p-3 rounded-xl border border-[#E7E5F0] leading-relaxed">
                  {selectedResourceDetail.objective}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#2F3142] mb-1">Indicações Clínicas</h4>
                <ul className="space-y-1 text-[#73768B]">
                  {selectedResourceDetail.indications.map((ind, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7567E8]" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  startLiveSession(selectedResourceDetail);
                  setSelectedResourceDetail(null);
                }}
                className="flex-1 py-3 bg-[#7567E8] text-white font-bold text-xs rounded-xl hover:bg-[#6253D6] shadow-md flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                Iniciar Sessão Agora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
