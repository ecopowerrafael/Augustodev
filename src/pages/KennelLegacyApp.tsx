import React, { useState } from "react";
import {
  Shield, Award, QrCode, Sparkles, User, Home, Dog as DogIcon, GitBranch,
  Bell, Settings, Plus, Search, Filter, Edit, Eye, Trash2, ArrowRight,
  ExternalLink, CheckCircle2, AlertTriangle, Info, Lock, LogIn, Mail,
  LogOut, Layers, Camera, FileText, Share2, Copy, Check, ChevronRight, Menu, X, Globe, Heart
} from "lucide-react";

import {
  INITIAL_BREEDER, INITIAL_KENNEL, INITIAL_DOGS, INITIAL_ALERTS,
  KENNEL_COMPLETION_CHECKLIST, Dog, KennelProfile, BreederProfile, AlertItem
} from "../data/kennelLegacyData";

import FounderSealBadge from "../components/kennelLegacy/FounderSealBadge";
import PedigreeTreeViewer from "../components/kennelLegacy/PedigreeTreeViewer";
import PedigreeCardGenerator from "../components/kennelLegacy/PedigreeCardGenerator";
import DogWizardModal from "../components/kennelLegacy/DogWizardModal";
import QRCodeManagerModal from "../components/kennelLegacy/QRCodeManagerModal";
import ShareModal from "../components/kennelLegacy/ShareModal";
import ContactModal from "../components/kennelLegacy/ContactModal";
import OnboardingModal from "../components/kennelLegacy/OnboardingModal";
import PublicKennelView from "../components/kennelLegacy/PublicKennelView";
import PublicDogView from "../components/kennelLegacy/PublicDogView";

interface KennelLegacyAppProps {
  onBack?: () => void;
}

export default function KennelLegacyApp({ onBack }: KennelLegacyAppProps) {
  // Authentication state (simulated)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState<string>("fundador@kennellegacy.com.br");
  const [loginPassword, setLoginPassword] = useState<string>("123456");

  // Navigation State
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "kennel" | "dogs" | "lineage" | "qrcodes" | "public_preview" | "alerts" | "settings"
  >("dashboard");

  // Data State
  const [breeder, setBreeder] = useState<BreederProfile>(INITIAL_BREEDER);
  const [kennel, setKennel] = useState<KennelProfile>(INITIAL_KENNEL);
  const [dogs, setDogs] = useState<Dog[]>(INITIAL_DOGS);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [completenessFilter, setCompletenessFilter] = useState<string>("all");
  const [alertFilter, setAlertFilter] = useState<string>("all");

  // Selected Item for Public Views or Detail Modals
  const [selectedDogForView, setSelectedDogForView] = useState<Dog | null>(null);
  const [viewingPublicPage, setViewingPublicPage] = useState<"none" | "kennel" | "dog">("none");

  // Modals Toggle State
  const [isDogModalOpen, setIsDogModalOpen] = useState<boolean>(false);
  const [editingDog, setEditingDog] = useState<Dog | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [qrTarget, setQrTarget] = useState<{ name: string; url: string; qrUrl?: string }>({
    name: kennel.name,
    url: kennel.publicUrl
  });
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [shareData, setShareData] = useState<{ title: string; url: string; msg: string }>({
    title: kennel.name,
    url: kennel.publicUrl,
    msg: "Conheça o perfil oficial do Canil Vale Imperial no Kennel Legacy."
  });
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isEditingKennel, setIsEditingKennel] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Success Feedback Toast
  const [toastMessage, setToastMessage] = useState<string>("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    triggerToast("Login efetuado com sucesso! Bem-vindo de volta, Rafael.");
  };

  const handleSaveDog = (savedDog: Partial<Dog>) => {
    if (editingDog) {
      setDogs(prev => prev.map(d => d.id === savedDog.id ? { ...d, ...savedDog } as Dog : d));
      triggerToast(`Cão "${savedDog.registeredName}" atualizado com sucesso!`);
    } else {
      const newFullDog: Dog = {
        id: savedDog.id || `dog-${Date.now()}`,
        useName: savedDog.useName || "Novo Cão",
        registeredName: savedDog.registeredName || "Novo Cão do Vale Imperial",
        breed: savedDog.breed || "Rottweiler",
        gender: savedDog.gender || "male",
        birthDate: savedDog.birthDate || "01/01/2024",
        age: "Filhote",
        color: savedDog.color || "Preto e castanho",
        registrationNumber: savedDog.registrationNumber || "CBKC-Pendente",
        microchip: savedDog.microchip || "985141002300000",
        breederName: breeder.name,
        ownerName: breeder.name,
        kennelName: kennel.name,
        status: "Perfil em publicação",
        completenessPercentage: 88,
        mainImage: savedDog.mainImage || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
        gallery: [],
        weight: savedDog.weight || "35 kg",
        height: savedDog.height || "58 cm",
        temperament: savedDog.temperament || "Equilibrado",
        description: savedDog.description || "Novo cão cadastrado.",
        lineageGenerations: 4,
        exams: [],
        titles: [],
        documentsCount: 1,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://kennellegacy.com/cao/${savedDog.id}`,
        publicUrl: `https://kennellegacy.com/cao/${savedDog.id}`,
        hasPhoto: true,
        hasLineage: true
      };
      setDogs(prev => [newFullDog, ...prev]);
      triggerToast(`Cão "${newFullDog.registeredName}" cadastrado com sucesso!`);
    }
    setEditingDog(null);
  };

  const handleDeleteDog = (dogId: string) => {
    setDogs(prev => prev.filter(d => d.id !== dogId));
    triggerToast("Cão removido do plantel.");
  };

  const handleDismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
    triggerToast("Alerta marcado como concluído.");
  };

  // Filtered Dogs
  const filteredDogs = dogs.filter(dog => {
    const matchesSearch = dog.registeredName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dog.useName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dog.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGender = genderFilter === "all" || dog.gender === genderFilter;
    const matchesCompleteness = completenessFilter === "all" ||
      (completenessFilter === "complete" && dog.completenessPercentage >= 90) ||
      (completenessFilter === "incomplete" && dog.completenessPercentage < 90);
    return matchesSearch && matchesGender && matchesCompleteness;
  });

  // Filtered Alerts
  const filteredAlertsList = alerts.filter(a => alertFilter === "all" || a.category === alertFilter);

  // If viewing public page mode
  if (viewingPublicPage === "kennel") {
    return (
      <PublicKennelView
        kennel={kennel}
        breeder={breeder}
        dogs={dogs}
        onSelectDog={(dogId) => {
          const found = dogs.find(d => d.id === dogId);
          if (found) {
            setSelectedDogForView(found);
            setViewingPublicPage("dog");
          }
        }}
        onBackToDashboard={() => setViewingPublicPage("none")}
      />
    );
  }

  if (viewingPublicPage === "dog" && selectedDogForView) {
    return (
      <PublicDogView
        dog={selectedDogForView}
        kennel={kennel}
        onBackToKennel={() => setViewingPublicPage("kennel")}
        onBackToDashboard={() => setViewingPublicPage("none")}
      />
    );
  }

  // Simulated Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-[#0B0D10] text-[#F4F6F8] font-sans flex flex-col justify-between p-4 sm:p-8 relative selection:bg-[#C8A45D]/30">
        {/* Top Back Header */}
        <div className="flex items-center justify-between max-w-5xl mx-auto w-full z-10">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#E2C77D] via-[#C8A45D] to-[#8C6D31] p-0.5 shadow-lg flex items-center justify-center">
              <div className="h-full w-full bg-[#12161B] rounded-[10px] flex items-center justify-center">
                <Shield className="h-5 w-5 text-[#E2C77D]" />
              </div>
            </div>
            <div>
              <span className="font-serif text-lg font-black text-white tracking-widest block">
                KENNEL LEGACY
              </span>
              <span className="font-mono text-[9px] text-[#C8A45D] font-bold block uppercase tracking-wider">
                PLATAFORMA PARA CRIADORES RESPONSÁVEIS
              </span>
            </div>
          </div>

          {onBack && (
            <button onClick={onBack} className="text-xs font-mono text-slate-400 hover:text-white">
              ← Voltar ao Portfólio
            </button>
          )}
        </div>

        {/* Login Form Box */}
        <div className="max-w-md w-full mx-auto my-auto bg-[#12161B] border border-[#2A323C] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-left relative z-10">
          <div className="text-center space-y-2">
            <FounderSealBadge variant="compact" sealNumber="027" />
            <h2 className="font-serif text-2xl font-black text-white">Acesse seu Legado</h2>
            <p className="text-xs text-slate-300 font-sans">
              Organize seu legado. Valorize sua linhagem.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">E-mail do Criador</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#C8A45D]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Senha</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#C8A45D]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#C8A45D] hover:bg-[#E2C77D] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg cursor-pointer"
            >
              Entrar no Painel do Canil
            </button>
          </form>

          <div className="pt-2 border-t border-[#2A323C] text-center space-y-3 font-mono text-xs">
            <button
              type="button"
              onClick={() => setIsAuthenticated(true)}
              className="w-full py-2.5 bg-[#171C22] hover:bg-[#2A323C] border border-[#2A323C] text-slate-200 rounded-xl flex items-center justify-center space-x-2"
            >
              <Globe className="h-4 w-4 text-[#4D8FD8]" />
              <span>Continuar com Google</span>
            </button>

            <div className="text-[10px] text-slate-500">
              Dados demonstrativos pré-carregados: <strong className="text-slate-300">fundador@kennellegacy.com.br</strong>
            </div>
          </div>
        </div>

        <div className="text-center text-[10px] font-mono text-slate-500 z-10">
          Kennel Legacy © 2026 — Plataforma de Gestão, Linhagem e Identidade Canina.
        </div>
      </div>
    );
  }

  // MAIN AUTHENTICATED DASHBOARD APPLICATION LAYOUT
  return (
    <div className="min-h-screen w-full bg-[#0B0D10] text-[#F4F6F8] font-sans flex flex-col md:flex-row text-left selection:bg-[#C8A45D]/30 relative">
      {/* Toast Feedback Popup */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#2FB879] text-black font-mono text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 animate-fadeIn">
          <CheckCircle2 className="h-4 w-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* DESKTOP SIDEBAR NAVIGATION */}
      <aside className="hidden md:flex flex-col w-64 bg-[#12161B] border-r border-[#2A323C] p-4 shrink-0 justify-between min-h-screen sticky top-0">
        <div className="space-y-6">
          {/* Logo & Seal Header */}
          <div className="flex items-center space-x-3 px-2 pt-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#E2C77D] via-[#C8A45D] to-[#8C6D31] p-0.5 shadow-lg flex items-center justify-center shrink-0">
              <div className="h-full w-full bg-[#0B0D10] rounded-[10px] flex items-center justify-center">
                <Shield className="h-5 w-5 text-[#E2C77D]" />
              </div>
            </div>
            <div>
              <span className="font-serif text-base font-black text-white tracking-wider block">
                KENNEL LEGACY
              </span>
              <span className="font-mono text-[8px] text-[#C8A45D] font-bold block uppercase">
                CANIL VALE IMPERIAL
              </span>
            </div>
          </div>

          {/* New Dog CTA Button */}
          <button
            onClick={() => {
              setEditingDog(null);
              setIsDogModalOpen(true);
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#C8A45D] to-[#E2C77D] hover:from-[#E2C77D] hover:to-[#C8A45D] text-black font-mono text-xs font-bold uppercase tracking-wider transition shadow-[0_0_15px_rgba(200,164,93,0.3)] flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>+ Cadastrar Cão</span>
          </button>

          {/* Navigation Menu */}
          <nav className="space-y-1 font-mono text-xs">
            {[
              { id: "dashboard", label: "Início", icon: Home, badge: null },
              { id: "kennel", label: "Meu Canil", icon: Shield, badge: "82%" },
              { id: "dogs", label: "Meus Cães", icon: DogIcon, badge: dogs.length.toString() },
              { id: "lineage", label: "Linhagens & Cards", icon: GitBranch, badge: "5 Gen" },
              { id: "qrcodes", label: "QR Codes", icon: QrCode, badge: "9" },
              { id: "public_preview", label: "Perfil Público", icon: Globe, badge: "Ativo" },
              { id: "alerts", label: "Central de Alertas", icon: Bell, badge: alerts.length > 0 ? alerts.length.toString() : null },
              { id: "settings", label: "Configurações", icon: Settings, badge: null }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "public_preview") {
                    setViewingPublicPage("kennel");
                  } else {
                    setActiveTab(item.id as any);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${
                  activeTab === item.id && viewingPublicPage === "none"
                    ? "bg-[#171C22] text-[#E2C77D] font-bold border border-[#C8A45D]/40"
                    : "text-slate-400 hover:text-white hover:bg-[#171C22]/50"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded bg-[#C8A45D]/20 text-[#E2C77D] text-[9px] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Breeder User Footer */}
        <div className="pt-4 border-t border-[#2A323C] space-y-3">
          <FounderSealBadge variant="compact" sealNumber={breeder.founderNumber} />

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-2.5">
              <img
                src={breeder.photo}
                alt={breeder.name}
                className="h-8 w-8 rounded-full object-cover border border-[#C8A45D]"
                referrerPolicy="no-referrer"
              />
              <div className="text-left">
                <span className="font-serif text-xs font-bold text-white block">{breeder.name}</span>
                <span className="font-mono text-[9px] text-slate-400 block truncate max-w-[100px]">{breeder.city}</span>
              </div>
            </div>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-slate-400 hover:text-red-400 p-1.5"
              title="Sair"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE HEADER & NAVIGATION */}
      <div className="md:hidden bg-[#12161B] border-b border-[#2A323C] p-4 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <Shield className="h-6 w-6 text-[#C8A45D]" />
          <div>
            <span className="font-serif text-sm font-black text-white block">KENNEL LEGACY</span>
            <span className="font-mono text-[8px] text-[#C8A45D] block">CANIL VALE IMPERIAL</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setEditingDog(null);
              setIsDogModalOpen(true);
            }}
            className="p-2 bg-[#C8A45D] text-black rounded-lg font-bold text-xs"
          >
            + Cão
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-[#171C22] border border-[#2A323C] rounded-lg text-slate-200"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#12161B] border-b border-[#2A323C] p-4 space-y-2 font-mono text-xs z-30">
          {[
            { id: "dashboard", label: "Início" },
            { id: "kennel", label: "Meu Canil" },
            { id: "dogs", label: "Meus Cães" },
            { id: "lineage", label: "Linhagens" },
            { id: "qrcodes", label: "QR Codes" },
            { id: "public_preview", label: "Perfil Público" },
            { id: "alerts", label: "Central de Alertas" },
            { id: "settings", label: "Configurações" }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => {
                if (m.id === "public_preview") {
                  setViewingPublicPage("kennel");
                } else {
                  setActiveTab(m.id as any);
                }
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded bg-[#171C22] text-slate-200 hover:text-[#E2C77D]"
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A323C] pb-6">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-black text-white">
                Olá, {breeder.name.split(" ")[0]}!
              </h1>
              <FounderSealBadge variant="minimal" sealNumber={breeder.founderNumber} />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
              Acompanhe o perfil do seu canil e mantenha as informações dos seus cães sempre atualizadas.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewingPublicPage("kennel")}
              className="px-3.5 py-2 rounded-xl bg-[#171C22] hover:bg-[#2A323C] border border-[#2A323C] text-[#E2C77D] text-xs font-mono font-bold flex items-center space-x-1.5 transition"
            >
              <Globe className="h-3.5 w-3.5 text-[#2FB879]" />
              <span>Ver Perfil Público</span>
            </button>

            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-2 rounded-xl bg-[#171C22] border border-[#2A323C] text-slate-400 hover:text-white text-xs font-mono"
              >
                Sair
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* 6 Key Indicators Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-[#171C22] border border-[#2A323C] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Cães Cadastrados</span>
                <span className="font-serif text-2xl sm:text-3xl font-black text-white">{dogs.length}</span>
                <span className="text-[10px] text-slate-400 font-mono block">5 machos e 3 fêmeas</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#171C22] border border-[#2A323C] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Perfil do Canil</span>
                <span className="font-serif text-2xl sm:text-3xl font-black text-[#2FB879]">{kennel.completenessPercentage}%</span>
                <span className="text-[10px] text-slate-400 font-mono block">Faltam 3 informações</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#171C22] border border-[#2A323C] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Perfis Públicos</span>
                <span className="font-serif text-2xl sm:text-3xl font-black text-[#4D8FD8]">9</span>
                <span className="text-[10px] text-slate-400 font-mono block">1 canil e 8 cães</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#171C22] border border-[#2A323C] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">QR Codes</span>
                <span className="font-serif text-2xl sm:text-3xl font-black text-[#C8A45D]">9</span>
                <span className="text-[10px] text-slate-400 font-mono block">Todos funcionando</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#171C22] border border-[#2A323C] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Alertas Ativos</span>
                <span className="font-serif text-2xl sm:text-3xl font-black text-[#E4A93A]">{alerts.length}</span>
                <span className="text-[10px] text-slate-400 font-mono block">2 importantes</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#171C22] border border-[#2A323C] space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Linhagens</span>
                <span className="font-serif text-2xl sm:text-3xl font-black text-white">3 de 8</span>
                <span className="text-[10px] text-slate-400 font-mono block">Até cinco gerações</span>
              </div>
            </div>

            {/* Completeness Card & Founder Badge */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Completeness checklist */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-[#171C22] border border-[#2A323C] space-y-4">
                <div className="flex items-center justify-between border-b border-[#2A323C] pb-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">Complete o Perfil do seu Canil</h3>
                    <p className="text-xs text-slate-400 font-sans">Perfis completos transmitem mais confiança e recebem selo verificado.</p>
                  </div>
                  <span className="font-mono text-xl font-bold text-[#2FB879]">{kennel.completenessPercentage}%</span>
                </div>

                <div className="w-full h-2.5 bg-[#0B0D10] rounded-full overflow-hidden border border-[#2A323C]">
                  <div className="h-full bg-gradient-to-r from-[#C8A45D] to-[#2FB879]" style={{ width: `${kennel.completenessPercentage}%` }} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-2">
                  {KENNEL_COMPLETION_CHECKLIST.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-slate-300">
                      <CheckCircle2 className={`h-4 w-4 ${item.completed ? "text-[#2FB879]" : "text-slate-600"}`} />
                      <span className={item.completed ? "line-through opacity-60" : "font-bold text-white"}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setActiveTab("kennel")}
                    className="px-4 py-2 rounded-lg bg-[#C8A45D] hover:bg-[#E2C77D] text-black font-mono text-xs font-bold uppercase"
                  >
                    Continuar Preenchimento
                  </button>
                </div>
              </div>

              {/* Founder Medal Seal Badge */}
              <FounderSealBadge variant="medal" sealNumber={breeder.founderNumber} />
            </div>

            {/* Active Dashboard Alerts Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-white flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-[#E4A93A]" />
                  <span>Central de Alertas e Cadastro</span>
                </h3>
                <button onClick={() => setActiveTab("alerts")} className="text-xs font-mono text-[#C8A45D] hover:underline">
                  Ver Todos
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {alerts.map(alt => (
                  <div key={alt.id} className="p-4 rounded-xl bg-[#171C22] border border-[#2A323C] space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono uppercase font-bold mb-1">
                        <span className={alt.priority === "important" ? "text-[#E25B5B]" : "text-[#E4A93A]"}>
                          ● {alt.category} // {alt.priority}
                        </span>
                        <span className="text-slate-500">{alt.date}</span>
                      </div>
                      <h4 className="font-serif text-sm font-bold text-white">{alt.title}</h4>
                      <p className="text-xs text-slate-300 font-sans mt-0.5">{alt.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#2A323C]">
                      <button
                        onClick={() => {
                          if (alt.targetDogId) {
                            const found = dogs.find(d => d.id === alt.targetDogId);
                            if (found) {
                              setEditingDog(found);
                              setIsDogModalOpen(true);
                            }
                          } else {
                            setActiveTab("kennel");
                          }
                        }}
                        className="px-3 py-1.5 rounded bg-[#C8A45D]/20 text-[#E2C77D] hover:bg-[#C8A45D] hover:text-black font-mono text-[10px] font-bold uppercase transition"
                      >
                        {alt.actionText}
                      </button>

                      <button
                        onClick={() => handleDismissAlert(alt.id)}
                        className="text-[10px] font-mono text-slate-500 hover:text-slate-300"
                      >
                        Dispensar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Dogs Summary List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Resumo dos Cães do Plantel</h3>
                  <p className="text-xs text-slate-400 mt-0.5">8 cães cadastrados com perfis públicos e QR Codes ativos.</p>
                </div>
                <button
                  onClick={() => setActiveTab("dogs")}
                  className="px-4 py-2 rounded-lg bg-[#171C22] border border-[#2A323C] text-[#E2C77D] text-xs font-mono font-bold"
                >
                  Gerenciar Todos os Cães
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {dogs.slice(0, 4).map(dog => (
                  <div key={dog.id} className="p-4 rounded-xl bg-[#171C22] border border-[#2A323C] space-y-3 flex flex-col justify-between hover:border-[#C8A45D]/50 transition">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <img src={dog.mainImage} alt={dog.registeredName} className="h-12 w-12 rounded-lg object-cover border border-[#C8A45D]" referrerPolicy="no-referrer" />
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-mono text-[#C8A45D] uppercase font-bold block truncate">{dog.useName}</span>
                          <h4 className="font-serif text-xs font-bold text-white truncate">{dog.registeredName}</h4>
                          <span className="text-[10px] font-mono text-slate-400 block">{dog.breed} • {dog.gender === "male" ? "Macho" : "Fêmea"}</span>
                        </div>
                      </div>

                      <div className="bg-[#0B0D10] p-2 rounded text-[10px] font-mono flex justify-between items-center text-slate-300">
                        <span>Perfil:</span>
                        <span className="text-[#2FB879] font-bold">{dog.completenessPercentage}%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#2A323C]">
                      <button
                        onClick={() => {
                          setSelectedDogForView(dog);
                          setViewingPublicPage("dog");
                        }}
                        className="text-[10px] font-mono text-[#C8A45D] hover:underline font-bold"
                      >
                        Ver Perfil
                      </button>

                      <button
                        onClick={() => {
                          setQrTarget({ name: dog.registeredName, url: dog.publicUrl, qrUrl: dog.qrCodeUrl });
                          setIsQRModalOpen(true);
                        }}
                        className="text-slate-400 hover:text-white"
                        title="QR Code"
                      >
                        <QrCode className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEU CANIL */}
        {activeTab === "kennel" && (
          <div className="space-y-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#171C22] border border-[#2A323C] space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#2A323C] pb-6">
                <div className="flex items-center space-x-4">
                  <img src={kennel.logoImage} alt={kennel.name} className="h-20 w-20 rounded-xl object-cover border-2 border-[#C8A45D]" referrerPolicy="no-referrer" />
                  <div>
                    <h2 className="font-serif text-2xl font-black text-white">{kennel.name}</h2>
                    <p className="text-xs font-mono text-[#C8A45D]">{kennel.prefix} • Fundado em {kennel.foundationYear}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{kennel.city} — {kennel.state}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsEditingKennel(!isEditingKennel)}
                    className="px-4 py-2 bg-[#C8A45D] text-black font-mono text-xs font-bold uppercase rounded-lg"
                  >
                    {isEditingKennel ? "Fechar Edição" : "Editar Canil"}
                  </button>
                  <button
                    onClick={() => setViewingPublicPage("kennel")}
                    className="px-4 py-2 bg-[#12161B] border border-[#2A323C] text-[#E2C77D] font-mono text-xs font-bold rounded-lg"
                  >
                    Ver Perfil Público
                  </button>
                </div>
              </div>

              {/* Editing Form Toggle */}
              {isEditingKennel ? (
                <div className="p-6 bg-[#0B0D10] border border-[#2A323C] rounded-xl space-y-4">
                  <h4 className="font-mono text-xs text-[#C8A45D] font-bold uppercase">Formulário de Edição do Canil</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Nome do Canil</label>
                      <input
                        type="text"
                        value={kennel.name}
                        onChange={(e) => setKennel({ ...kennel, name: e.target.value })}
                        className="w-full bg-[#171C22] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 mb-1">Responsável</label>
                      <input
                        type="text"
                        value={kennel.responsibleName}
                        onChange={(e) => setKennel({ ...kennel, responsibleName: e.target.value })}
                        className="w-full bg-[#171C22] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-slate-300 mb-1">Descrição</label>
                      <textarea
                        value={kennel.description}
                        onChange={(e) => setKennel({ ...kennel, description: e.target.value })}
                        rows={3}
                        className="w-full bg-[#171C22] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      onClick={() => {
                        setIsEditingKennel(false);
                        triggerToast("Alterações do canil salvas com sucesso!");
                      }}
                      className="px-5 py-2 bg-[#2FB879] text-black font-mono text-xs font-bold uppercase rounded-lg"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-slate-300 font-sans leading-relaxed">{kennel.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                    <div className="p-3 bg-[#0B0D10] rounded-lg border border-[#2A323C]">
                      <span className="text-slate-500 block text-[10px]">AFIXO OFICIAL:</span>
                      <span className="text-white font-bold">{kennel.registrationNumber}</span>
                    </div>
                    <div className="p-3 bg-[#0B0D10] rounded-lg border border-[#2A323C]">
                      <span className="text-slate-500 block text-[10px]">ENTIDADE:</span>
                      <span className="text-[#4D8FD8] font-bold">{kennel.clubEntity}</span>
                    </div>
                    <div className="p-3 bg-[#0B0D10] rounded-lg border border-[#2A323C]">
                      <span className="text-slate-500 block text-[10px]">SELO FUNDADOR:</span>
                      <span className="text-[#C8A45D] font-bold">Membro nº {kennel.founderSeal}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: MEUS CÃES */}
        {activeTab === "dogs" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">Meus Cães</h2>
                <p className="text-xs text-slate-400 mt-0.5">Cadastre, organize e compartilhe os cães do plantel.</p>
              </div>

              <button
                onClick={() => {
                  setEditingDog(null);
                  setIsDogModalOpen(true);
                }}
                className="px-5 py-2.5 bg-[#C8A45D] hover:bg-[#E2C77D] text-black font-mono text-xs font-bold uppercase rounded-xl flex items-center space-x-1.5"
              >
                <Plus className="h-4 w-4" />
                <span>+ Cadastrar Cão</span>
              </button>
            </div>

            {/* Filters bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#171C22] p-3 rounded-xl border border-[#2A323C]">
              <div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nome ou pedigree..."
                  className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#C8A45D]"
                />
              </div>

              <div>
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2 text-xs text-white"
                >
                  <option value="all">Todos os Sexos</option>
                  <option value="male">Macho</option>
                  <option value="female">Fêmea</option>
                </select>
              </div>

              <div>
                <select
                  value={completenessFilter}
                  onChange={(e) => setCompletenessFilter(e.target.value)}
                  className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2 text-xs text-white"
                >
                  <option value="all">Todas as Completudes</option>
                  <option value="complete">Perfil Completo (≥90%)</option>
                  <option value="incomplete">Perfil Pendente (&lt;90%)</option>
                </select>
              </div>
            </div>

            {/* Dogs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredDogs.map(dog => (
                <div key={dog.id} className="p-4 rounded-xl bg-[#171C22] border border-[#2A323C] space-y-3 flex flex-col justify-between hover:border-[#C8A45D] transition">
                  <div>
                    <img src={dog.mainImage} alt={dog.registeredName} className="w-full h-36 object-cover rounded-lg border border-[#2A323C] mb-3" referrerPolicy="no-referrer" />
                    <span className="text-[10px] font-mono text-[#C8A45D] uppercase font-bold block">{dog.useName}</span>
                    <h4 className="font-serif text-sm font-bold text-white truncate">{dog.registeredName}</h4>
                    <p className="text-[11px] font-mono text-slate-400 mt-1">Reg: {dog.registrationNumber}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#2A323C]">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400">Completude:</span>
                      <span className="text-[#2FB879] font-bold">{dog.completenessPercentage}%</span>
                    </div>

                    <div className="flex items-center justify-between gap-1 pt-1">
                      <button
                        onClick={() => {
                          setSelectedDogForView(dog);
                          setViewingPublicPage("dog");
                        }}
                        className="px-2.5 py-1 rounded bg-[#0B0D10] border border-[#2A323C] text-[#C8A45D] font-mono text-[10px] font-bold hover:underline"
                      >
                        Ver Perfil
                      </button>

                      <button
                        onClick={() => {
                          setEditingDog(dog);
                          setIsDogModalOpen(true);
                        }}
                        className="p-1 rounded bg-[#0B0D10] text-slate-300 hover:text-white"
                        title="Editar"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteDog(dog.id)}
                        className="p-1 rounded bg-[#0B0D10] text-slate-500 hover:text-red-400"
                        title="Excluir"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: LINHAGENS & CARDS */}
        {activeTab === "lineage" && (
          <div className="space-y-8">
            <PedigreeTreeViewer dogName="Thor do Vale Imperial" />
            <PedigreeCardGenerator dogs={dogs} />
          </div>
        )}

        {/* TAB 5: QR CODES */}
        {activeTab === "qrcodes" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">Central de QR Codes do Canil</h2>
                <p className="text-xs text-slate-400 mt-0.5">Baixe etiquetas para caixas de transporte, pedigree e feiras.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 bg-[#171C22] rounded-xl border border-[#C8A45D]/50 text-center space-y-3">
                <QrCode className="h-10 w-10 text-[#C8A45D] mx-auto" />
                <h4 className="font-serif text-base font-bold text-white">QR Code do Canil</h4>
                <p className="text-xs text-slate-400">Abre a página oficial com todos os cães.</p>
                <button
                  onClick={() => {
                    setQrTarget({ name: kennel.name, url: kennel.publicUrl });
                    setIsQRModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#C8A45D] text-black font-mono text-xs font-bold uppercase rounded-lg"
                >
                  Gerar Etiqueta
                </button>
              </div>

              {dogs.slice(0, 2).map(dog => (
                <div key={dog.id} className="p-6 bg-[#171C22] rounded-xl border border-[#2A323C] text-center space-y-3">
                  <QrCode className="h-10 w-10 text-[#2FB879] mx-auto" />
                  <h4 className="font-serif text-base font-bold text-white">{dog.useName}</h4>
                  <p className="text-xs text-slate-400">Abre o pedigree de 5 gerações.</p>
                  <button
                    onClick={() => {
                      setQrTarget({ name: dog.registeredName, url: dog.publicUrl, qrUrl: dog.qrCodeUrl });
                      setIsQRModalOpen(true);
                    }}
                    className="px-4 py-2 bg-[#12161B] border border-[#2A323C] text-slate-200 font-mono text-xs font-bold uppercase rounded-lg"
                  >
                    Gerar Etiqueta
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CENTRAL DE ALERTAS */}
        {activeTab === "alerts" && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-white">Central de Alertas e Cadastro</h2>
            <div className="space-y-3">
              {alerts.map(alt => (
                <div key={alt.id} className="p-4 bg-[#171C22] rounded-xl border border-[#2A323C] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#E4A93A] uppercase font-bold">{alt.category}</span>
                    <h4 className="font-serif text-base font-bold text-white">{alt.title}</h4>
                    <p className="text-xs text-slate-300">{alt.description}</p>
                  </div>
                  <button
                    onClick={() => handleDismissAlert(alt.id)}
                    className="px-3 py-1.5 bg-[#C8A45D] text-black font-mono text-xs font-bold rounded-lg"
                  >
                    {alt.actionText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: CONFIGURAÇÕES */}
        {activeTab === "settings" && (
          <div className="p-6 rounded-2xl bg-[#171C22] border border-[#2A323C] space-y-6">
            <h2 className="font-serif text-xl font-bold text-white">Configurações da Conta e Privacidade</h2>
            <div className="space-y-4 text-xs font-mono text-slate-300">
              <div className="p-4 bg-[#0B0D10] rounded-xl border border-[#2A323C] flex justify-between items-center">
                <span>E-mail da Conta:</span>
                <span className="text-white font-bold">{breeder.email}</span>
              </div>
              <div className="p-4 bg-[#0B0D10] rounded-xl border border-[#2A323C] flex justify-between items-center">
                <span>Selo de Fundador:</span>
                <span className="text-[#C8A45D] font-bold">Ativo #{breeder.founderNumber}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODALS */}
      <DogWizardModal
        isOpen={isDogModalOpen}
        onClose={() => setIsDogModalOpen(false)}
        onSaveDog={handleSaveDog}
        existingDog={editingDog}
      />

      <QRCodeManagerModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        targetName={qrTarget.name}
        publicLink={qrTarget.url}
        qrUrl={qrTarget.qrUrl}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={shareData.title}
        shareUrl={shareData.url}
        shareMessage={shareData.msg}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={() => triggerToast("Cadastro inicial concluído!")}
      />
    </div>
  );
}
