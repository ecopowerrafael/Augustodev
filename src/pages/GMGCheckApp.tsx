import React, { useState } from "react";
import {
  UserProfile,
  Site,
  Equipment,
  Inspection,
  NonConformity,
  ChecklistTemplate,
  INITIAL_USERS,
  INITIAL_SITES,
  INITIAL_EQUIPMENTS,
  INITIAL_INSPECTIONS,
  INITIAL_NON_CONFORMITIES,
  INITIAL_CHECKLIST_TEMPLATES,
} from "../data/gmgCheckData";
import { GMGLogo } from "../components/gmgCheck/GMGLogo";
import { PDFReportViewer } from "../components/gmgCheck/PDFReportViewer";
import { NonConformityDrawer } from "../components/gmgCheck/NonConformityDrawer";
import { EquipmentQRModal } from "../components/gmgCheck/EquipmentQRModal";
import { InspectionWizard } from "../components/gmgCheck/InspectionWizard";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  LayoutDashboard,
  ClipboardList,
  AlertTriangle,
  Building2,
  Zap,
  Users,
  FileCheck,
  FileText,
  Settings,
  Bell,
  Wifi,
  WifiOff,
  RefreshCw,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Download,
  QrCode,
  LogOut,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Calendar,
  Phone,
  ArrowLeft,
  X,
  Check,
  Smartphone,
  CheckCircle,
} from "lucide-react";

interface GMGCheckAppProps {
  onBack?: () => void;
}

export const GMGCheckApp: React.FC<GMGCheckAppProps> = ({ onBack }) => {
  // Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(INITIAL_USERS[0]); // Carlos Henrique (Técnico) by default
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState<string>("tecnico@gmgcheck.com.br");
  const [loginPassword, setLoginPassword] = useState<string>("123456");

  // Navigation State
  const [activeTab, setActiveTab] = useState<string>("dashboard"); // 'dashboard' | 'vistorias' | 'ncs' | 'sites' | 'equipamentos' | 'usuarios' | 'checklists' | 'relatorios' | 'configuracoes'

  // Data Collections State
  const [users, setUsers] = useState<UserProfile[]>(INITIAL_USERS);
  const [sites, setSites] = useState<Site[]>(INITIAL_SITES);
  const [equipments, setEquipments] = useState<Equipment[]>(INITIAL_EQUIPMENTS);
  const [inspections, setInspections] = useState<Inspection[]>(INITIAL_INSPECTIONS);
  const [nonConformities, setNonConformities] = useState<NonConformity[]>(INITIAL_NON_CONFORMITIES);
  const [templates, setTemplates] = useState<ChecklistTemplate[]>(INITIAL_CHECKLIST_TEMPLATES);

  // Offline / Sync Simulation State
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active Modals & Views
  const [isWizardOpen, setIsWizardOpen] = useState<boolean>(false);
  const [viewingInspectionPdf, setViewingInspectionPdf] = useState<Inspection | null>(null);
  const [selectedNcForDrawer, setSelectedNcForDrawer] = useState<NonConformity | null>(null);
  const [selectedEquipmentForQr, setSelectedEquipmentForQr] = useState<Equipment | null>(null);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState<boolean>(false);

  // Filter States
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync Action Simulation
  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setPendingSyncCount(0);
      setIsOnline(true);
      showToast("Sincronização concluída! Todos os registros estão salvos na nuvem.");
    }, 2000);
  };

  // Role Switcher Helper
  const handleRoleSwitch = (role: "admin" | "supervisor" | "technician") => {
    const found = users.find((u) => u.role === role);
    if (found) {
      setCurrentUser(found);
      setIsLoggedIn(true);
      showToast(`Acesso alternado para perfil ${role.toUpperCase()}: ${found.name}`);
    }
  };

  // NC Status update handler
  const handleUpdateNcStatus = (ncId: string, newStatus: NonConformity["status"], note: string) => {
    setNonConformities((prev) =>
      prev.map((nc) => {
        if (nc.id === ncId) {
          return {
            ...nc,
            status: newStatus,
            timeline: [
              ...nc.timeline,
              {
                date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString().slice(0, 5)}`,
                action: `Status alterado para [${newStatus}]: ${note}`,
                author: currentUser?.name || "Usuário",
              },
            ],
          };
        }
        return nc;
      })
    );
    showToast(`Não Conformidade ${ncId} atualizada para ${newStatus}`);
  };

  // New Inspection Completion
  const handleCompleteInspection = (newInspection: Inspection) => {
    setInspections((prev) => [newInspection, ...prev]);
    if (newInspection.nonConformities.length > 0) {
      setNonConformities((prev) => [...newInspection.nonConformities, ...prev]);
    }
    if (!isOnline) {
      setPendingSyncCount((prev) => prev + 1);
    }
    showToast(`Vistoria ${newInspection.id} registrada com sucesso!`);
  };

  // Login Handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    showToast(`Bem-vindo ao GMG Check, ${currentUser?.name || "Usuário"}!`);
  };

  // Recharts Mock Data
  const inspectionTrendData = [
    { mes: "Jan", programadas: 140, concluidas: 135, pendentes: 5 },
    { mes: "Fev", programadas: 155, concluidas: 148, pendentes: 7 },
    { mes: "Mar", programadas: 162, concluidas: 158, pendentes: 4 },
    { mes: "Abr", programadas: 170, concluidas: 165, pendentes: 5 },
    { mes: "Mai", programadas: 178, concluidas: 172, pendentes: 6 },
    { mes: "Jun", programadas: 184, concluidas: 167, pendentes: 17 },
  ];

  const inspectionResultPieData = [
    { name: "Aprovadas (Sem NC)", value: 112, color: "#18A66A" },
    { name: "NC Baixa", value: 31, color: "#7C8793" },
    { name: "NC Média", value: 19, color: "#F4B400" },
    { name: "NC Alta", value: 5, color: "#D64545" },
    { name: "NC Crítica", value: 2, color: "#8B0000" },
  ];

  const ncCategoryBarData = [
    { categoria: "Baterias", quantidade: 12 },
    { categoria: "Elétrico", quantidade: 9 },
    { categoria: "Combustível", quantidade: 6 },
    { categoria: "Segurança", quantidade: 5 },
    { categoria: "Arrefecimento", quantidade: 4 },
    { categoria: "Limpeza", quantidade: 2 },
  ];

  const technicianPerformanceData = [
    { nome: "Carlos Henrique", vistorias: 42, tempoMedio: 38 },
    { nome: "Fernanda Lima", vistorias: 38, tempoMedio: 37 },
    { nome: "João Pereira", vistorias: 35, tempoMedio: 44 },
    { nome: "Marcos Silva", vistorias: 29, tempoMedio: 41 },
  ];

  // IF NOT LOGGED IN -> RENDER LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#10263F] text-white flex flex-col justify-between p-4 md:p-8 font-sans relative overflow-hidden">
        {/* Top Back to Portfolio */}
        <div className="flex items-center justify-between z-10">
          <GMGLogo variant="dark" />
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-200 transition-all flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Portfólio Augusto Dev</span>
            </button>
          )}
        </div>

        {/* Login Form Box */}
        <div className="max-w-md w-full mx-auto bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl z-10 space-y-6 my-auto">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#18A66A]/20 text-[#18A66A] border border-[#18A66A]/30">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Acesso Seguro PWA
            </span>
            <h2 className="text-2xl font-black text-white">Acesse o GMG Check</h2>
            <p className="text-xs text-gray-300">
              Plataforma para inspeções técnicas e rastreabilidade de geradores.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">E-mail corporativo</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1769AA]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Senha de acesso</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1769AA]"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-gray-600 text-[#1769AA]" />
                <span>Lembrar meu acesso</span>
              </label>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[#F4B400] hover:underline">
                Esqueci minha senha
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#10263F] border border-[#F4B400] text-white font-bold text-sm hover:brightness-110 transition-all shadow-xl shadow-[#1769AA]/20"
            >
              Entrar na Plataforma
            </button>
          </form>

          {/* Role Quick Switchers for Demo */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="text-[11px] text-[#F4B400] font-bold block text-center uppercase tracking-wider">
              Acesso Demonstrativo Rápido:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleRoleSwitch("technician")}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-gray-200 transition-all"
              >
                👷‍♂️ Técnico
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch("supervisor")}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-gray-200 transition-all"
              >
                📊 Supervisor
              </button>
              <button
                type="button"
                onClick={() => handleRoleSwitch("admin")}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-gray-200 transition-all"
              >
                ⚙️ Admin
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 z-10">
          GMG Check System • Protótipo Comercial Desenvolvido por Augusto Dev
        </div>
      </div>
    );
  }

  // IF INSPECTION WIZARD IS ACTIVE -> RENDER WIZARD FULLSCREEN
  if (isWizardOpen) {
    return (
      <InspectionWizard
        sites={sites}
        equipments={equipments}
        technicianName={currentUser?.name || "Técnico"}
        technicianId={currentUser?.id || "usr-01"}
        onCompleteInspection={handleCompleteInspection}
        onCancel={() => setIsWizardOpen(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F6F8] text-[#17202A] flex flex-col md:flex-row font-sans selection:bg-[#1769AA] selection:text-white">
      {/* Toast Notification Floating Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#10263F] border border-[#F4B400] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 animate-fade-in max-w-md">
          <Sparkles className="w-5 h-5 text-[#F4B400] flex-shrink-0 animate-pulse" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* DESKTOP SIDEBAR NAV */}
      <aside className="hidden md:flex flex-col w-64 bg-[#10263F] text-white min-h-screen p-5 border-r border-white/10 flex-shrink-0 justify-between">
        <div className="space-y-6">
          <GMGLogo variant="dark" />

          {/* User Profile Card */}
          <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-3">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-10 h-10 rounded-xl object-cover border border-[#F4B400]"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-xs text-white truncate">{currentUser?.name}</h4>
              <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold bg-[#1769AA] text-white uppercase tracking-wider">
                {currentUser?.role}
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 text-xs font-medium">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "vistorias", label: "Vistorias", icon: ClipboardList, badge: inspections.length },
              { id: "ncs", label: "Não Conformidades", icon: AlertTriangle, badge: nonConformities.filter(n => n.status !== "Resolvida").length },
              { id: "sites", label: "Sites / Unidades", icon: Building2, badge: sites.length },
              { id: "equipamentos", label: "Equipamentos (GMG)", icon: Zap, badge: equipments.length },
              { id: "usuarios", label: "Usuários", icon: Users },
              { id: "checklists", label: "Modelos Checklist", icon: FileCheck },
              { id: "relatorios", label: "Relatórios & PDF", icon: FileText },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#1769AA] text-white font-bold shadow-lg shadow-[#1769AA]/20"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#F4B400]" : "text-gray-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? "bg-[#F4B400] text-black" : "bg-white/10 text-gray-300"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
          {/* Offline / Online Switcher */}
          <div className="p-3 bg-black/40 border border-white/10 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-medium text-[11px] flex items-center space-x-1">
                {isOnline ? <Wifi className="w-3.5 h-3.5 text-[#18A66A]" /> : <WifiOff className="w-3.5 h-3.5 text-[#D64545]" />}
                <span>{isOnline ? "Online" : "Modo Offline"}</span>
              </span>

              <button
                type="button"
                onClick={() => setIsOnline(!isOnline)}
                className="text-[10px] text-[#F4B400] hover:underline font-bold"
              >
                Alternar
              </button>
            </div>

            {pendingSyncCount > 0 && (
              <button
                type="button"
                onClick={handleManualSync}
                disabled={isSyncing}
                className="w-full py-2 rounded-lg bg-[#F4B400] text-[#10263F] font-bold text-[11px] hover:brightness-110 flex items-center justify-center space-x-1.5 shadow"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                <span>Sincronizar ({pendingSyncCount})</span>
              </button>
            )}
          </div>

          <button
            onClick={() => setIsLoggedIn(false)}
            className="w-full py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center space-x-2"
          >
            <LogOut className="w-4 h-4 text-[#D64545]" />
            <span>Sair do Sistema</span>
          </button>

          {onBack && (
            <button
              onClick={onBack}
              className="w-full py-2 rounded-xl text-[11px] text-gray-400 hover:text-white text-center hover:underline"
            >
              ← Voltar ao Portfólio Augusto Dev
            </button>
          )}
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            {/* Mobile Logo Branding */}
            <div className="md:hidden">
              <GMGLogo variant="light" showSubtitle={false} />
            </div>

            <div className="hidden md:block">
              <h1 className="text-xl font-extrabold text-[#10263F]">
                {activeTab === "dashboard" && "Painel Geral de Vistorias"}
                {activeTab === "vistorias" && "Gestão de Vistorias Técnicas"}
                {activeTab === "ncs" && "Central de Não Conformidades (NC)"}
                {activeTab === "sites" && "Gestão de Unidades e Sites"}
                {activeTab === "equipamentos" && "Ativos & Grupos Geradores"}
                {activeTab === "usuarios" && "Equipe e Usuários do Sistema"}
                {activeTab === "checklists" && "Modelos de Checklist Técnico"}
                {activeTab === "relatorios" && "Relatórios Gerenciais & Emissão PDF"}
              </h1>
              <p className="text-xs text-gray-500">
                Acompanhamento em tempo real • Região: {currentUser?.region}
              </p>
            </div>
          </div>

          {/* Right Action Icons & Role Switcher Dropdown */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsWizardOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#10263F] border border-[#F4B400]/50 text-white font-bold text-xs hover:brightness-110 transition-all flex items-center space-x-1.5 shadow-lg shadow-[#1769AA]/20"
            >
              <Plus className="w-4 h-4 text-[#F4B400]" />
              <span className="hidden sm:inline">Nova Vistoria</span>
            </button>

            {/* Quick Profile Switcher pill */}
            <div className="hidden sm:flex items-center space-x-1 bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs">
              <button
                onClick={() => handleRoleSwitch("technician")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  currentUser?.role === "technician" ? "bg-white text-[#10263F] shadow" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Técnico
              </button>
              <button
                onClick={() => handleRoleSwitch("supervisor")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  currentUser?.role === "supervisor" ? "bg-white text-[#10263F] shadow" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Supervisor
              </button>
              <button
                onClick={() => handleRoleSwitch("admin")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  currentUser?.role === "admin" ? "bg-white text-[#10263F] shadow" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Admin
              </button>
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotificationDrawerOpen(!isNotificationDrawerOpen)}
              className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D64545]" />
            </button>
          </div>
        </header>

        {/* Content Body Area */}
        <main className="p-4 md:p-8 flex-1 space-y-8 overflow-y-auto">
          {/* TAB 1: DASHBOARD VIEW */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fade-in">
              {/* Technician Highlight Card if Technician Profile */}
              {currentUser?.role === "technician" && (
                <div className="bg-gradient-to-r from-[#10263F] to-[#1769AA] text-white p-6 rounded-3xl shadow-xl border border-[#F4B400]/40 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-[#F4B400]"
                      />
                      <div>
                        <span className="text-xs text-[#F4B400] font-bold uppercase tracking-wider block">
                          Olá, {currentUser.name}!
                        </span>
                        <h2 className="text-xl font-black text-white">Próxima Vistoria Agendada</h2>
                        <p className="text-xs text-gray-300">
                          Data Center Alpha — GMG-003 • Sorocaba/SP às 14:30
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsWizardOpen(true)}
                      className="px-6 py-3 rounded-2xl bg-[#F4B400] text-[#10263F] font-black text-sm hover:brightness-110 transition-all flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <Zap className="w-5 h-5 fill-current" />
                      <span>Iniciar Vistoria Agora</span>
                    </button>
                  </div>
                </div>
              )}

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
                  <span className="text-xs text-gray-500 font-medium block">Vistorias no Mês</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-[#10263F]">184</span>
                    <span className="text-xs font-bold text-[#18A66A] bg-[#18A66A]/10 px-2 py-0.5 rounded-full flex items-center">
                      <ArrowUpRight className="w-3 h-3 mr-0.5" /> +12%
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">167 concluídas / 17 pendentes</p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
                  <span className="text-xs text-gray-500 font-medium block">Não Conformidades</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-[#D64545]">38</span>
                    <span className="text-xs font-bold text-white bg-[#D64545] px-2 py-0.5 rounded-full">
                      4 Críticas
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">Taxa de resolução: 82%</p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
                  <span className="text-xs text-gray-500 font-medium block">Unidades Ativas</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-[#10263F]">26</span>
                    <span className="text-xs font-bold text-[#1769AA] bg-[#1769AA]/10 px-2 py-0.5 rounded-full">
                      74 GMGs
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">100% monitorados</p>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
                  <span className="text-xs text-gray-500 font-medium block">Tempo Médio / Vistoria</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-black text-[#10263F]">39 min</span>
                    <span className="text-xs font-bold text-[#18A66A] bg-[#18A66A]/10 px-2 py-0.5 rounded-full">
                      Meta: 45m
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">Excelente produtividade</p>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Area Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">Evolução Mensal de Vistorias</h3>
                      <p className="text-xs text-gray-500">Programadas vs Concluídas</p>
                    </div>
                  </div>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={inspectionTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="mes" stroke="#6B7280" fontSize={11} />
                        <YAxis stroke="#6B7280" fontSize={11} />
                        <Tooltip />
                        <Area type="monotone" dataKey="programadas" stroke="#1769AA" fill="#1769AA" fillOpacity={0.1} name="Programadas" />
                        <Area type="monotone" dataKey="concluidas" stroke="#18A66A" fill="#18A66A" fillOpacity={0.2} name="Concluídas" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Resultado das Vistorias</h3>
                    <p className="text-xs text-gray-500">Distribuição por severidade de NC</p>
                  </div>

                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={inspectionResultPieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                        >
                          {inspectionResultPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Recent Inspections Table Card */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Últimas Vistorias Realizadas</h3>
                    <p className="text-xs text-gray-500">Histórico recente de atendimentos no campo</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("vistorias")}
                    className="text-xs font-bold text-[#1769AA] hover:underline"
                  >
                    Ver todas →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                        <th className="p-4">Código / Data</th>
                        <th className="p-4">Unidade / Site</th>
                        <th className="p-4">Gerador (Tag)</th>
                        <th className="p-4">Técnico</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {inspections.slice(0, 5).map((insp) => (
                        <tr key={insp.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="p-4">
                            <span className="font-bold text-[#10263F] font-mono block">{insp.id}</span>
                            <span className="text-[11px] text-gray-500">{insp.date} • {insp.startTime}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-gray-900 block">{insp.siteName}</span>
                            <span className="text-[11px] text-gray-500">{insp.siteCity}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-[#1769AA] font-mono bg-[#1769AA]/10 px-2 py-0.5 rounded">
                              {insp.equipmentTag}
                            </span>
                          </td>
                          <td className="p-4 font-medium text-gray-800">{insp.technicianName}</td>
                          <td className="p-4 text-center">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                insp.status === "Concluída"
                                  ? "bg-[#18A66A]/10 text-[#18A66A]"
                                  : insp.status === "Em andamento"
                                  ? "bg-[#F4B400]/20 text-[#10263F]"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {insp.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => setViewingInspectionPdf(insp)}
                              className="px-3 py-1.5 rounded-lg bg-[#1769AA] text-white font-semibold text-[11px] hover:bg-[#1769AA]/90"
                            >
                              Relatório PDF
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

          {/* TAB 2: VISTORIAS TAB */}
          {activeTab === "vistorias" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por código, site, técnico..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#1769AA]"
                  />
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setIsWizardOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#1769AA] text-white text-xs font-bold hover:brightness-110 flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Iniciar Vistoria</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                        <th className="p-4">Vistoria ID</th>
                        <th className="p-4">Unidade / Site</th>
                        <th className="p-4">Gerador / Especificação</th>
                        <th className="p-4">Técnico Vistoriador</th>
                        <th className="p-4 text-center">Resultado (OK / NOK / NA)</th>
                        <th className="p-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {inspections
                        .filter((i) =>
                          i.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          i.technicianName.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((insp) => (
                          <tr key={insp.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="p-4 font-bold text-[#10263F] font-mono">{insp.id}</td>
                            <td className="p-4">
                              <span className="font-bold text-gray-900 block">{insp.siteName}</span>
                              <span className="text-[11px] text-gray-500">{insp.siteCity}</span>
                            </td>
                            <td className="p-4">
                              <span className="font-bold text-[#1769AA] font-mono block">{insp.equipmentTag}</span>
                              <span className="text-[11px] text-gray-500">{insp.equipmentSpecs}</span>
                            </td>
                            <td className="p-4 font-medium text-gray-800">{insp.technicianName}</td>
                            <td className="p-4 text-center">
                              {insp.resultSummary ? (
                                <span className="font-mono text-[11px] font-bold">
                                  <span className="text-[#18A66A]">{insp.resultSummary.okCount} OK</span> /{" "}
                                  <span className="text-[#D64545]">{insp.resultSummary.nokCount} NOK</span>
                                </span>
                              ) : (
                                <span className="text-gray-400 font-mono">Pendente</span>
                              )}
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => setViewingInspectionPdf(insp)}
                                className="px-3 py-1.5 rounded-lg bg-[#10263F] text-white text-[11px] font-semibold hover:bg-[#10263F]/80"
                              >
                                Visualizar PDF
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

          {/* TAB 3: NON CONFORMITIES TAB */}
          {activeTab === "ncs" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {nonConformities.map((nc) => (
                  <div
                    key={nc.id}
                    onClick={() => setSelectedNcForDrawer(nc)}
                    className="bg-white p-5 rounded-2xl border-2 border-gray-200 hover:border-[#D64545] shadow-sm transition-all cursor-pointer space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#D64545]">{nc.code}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D64545] text-white">
                        {nc.criticality}
                      </span>
                    </div>

                    <h4 className="font-bold text-gray-900 text-sm line-clamp-2">{nc.itemTitle}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{nc.description}</p>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                      <span>{nc.siteName} • <strong className="text-gray-800">{nc.equipmentTag}</strong></span>
                      <span className="text-[#1769AA] font-semibold group-hover:underline">Detalhes →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SITES TAB */}
          {activeTab === "sites" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              {sites.map((s) => (
                <div key={s.id} className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="h-40 bg-gray-900 relative">
                      <img src={s.image} alt={s.name} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white font-mono">
                        {s.code}
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="font-bold text-lg text-gray-900">{s.name}</h3>
                      <p className="text-xs text-gray-600">{s.address}</p>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                        <div className="p-2.5 bg-gray-50 rounded-xl">
                          <span className="text-gray-400 block text-[10px]">Cliente:</span>
                          <span className="font-bold text-gray-800">{s.client}</span>
                        </div>
                        <div className="p-2.5 bg-gray-50 rounded-xl">
                          <span className="text-gray-400 block text-[10px]">Responsável:</span>
                          <span className="font-bold text-gray-800">{s.responsibleName}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1769AA]">{s.equipmentsCount} Geradores Cadastrados</span>
                    <button
                      onClick={() => setIsWizardOpen(true)}
                      className="px-3 py-1.5 rounded-lg bg-[#10263F] text-white font-semibold text-[11px]"
                    >
                      Vistoriar Este Site
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: EQUIPAMENTOS TAB */}
          {activeTab === "equipamentos" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              {equipments.map((eq) => (
                <div key={eq.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="aspect-video bg-black rounded-2xl overflow-hidden relative">
                      <img src={eq.image} alt={eq.tag} className="w-full h-full object-cover" />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black bg-[#F4B400] text-[#10263F]">
                        {eq.powerKVA} kVA
                      </span>
                    </div>

                    <div>
                      <span className="font-mono text-xs font-bold text-[#1769AA]">{eq.tag}</span>
                      <h3 className="font-bold text-gray-900 text-base">{eq.name}</h3>
                      <p className="text-xs text-gray-500">{eq.siteName}</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl text-xs space-y-1">
                      <p className="flex justify-between">
                        <span className="text-gray-500">Fabricante:</span>
                        <span className="font-medium text-gray-800">{eq.manufacturer} {eq.model}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-500">Horímetro Atual:</span>
                        <span className="font-bold text-gray-900 font-mono">{eq.hourmeter} h</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedEquipmentForQr(eq)}
                    className="w-full py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 flex items-center justify-center space-x-1.5"
                  >
                    <QrCode className="w-4 h-4 text-[#1769AA]" />
                    <span>Gerar Etiqueta QR Code</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* OTHER TABS SIMULATED VIEWS */}
          {(activeTab === "usuarios" || activeTab === "checklists" || activeTab === "relatorios") && (
            <div className="bg-white p-8 rounded-3xl border border-gray-200 text-center space-y-4 animate-fade-in max-w-xl mx-auto">
              <Sparkles className="w-10 h-10 text-[#F4B400] mx-auto" />
              <h3 className="text-lg font-bold text-gray-900">Módulo de {activeTab.toUpperCase()} Habilitado</h3>
              <p className="text-xs text-gray-500">
                Protótipo funcional pré-carregado com {users.length} usuários, {templates.length} modelos de checklist e emissão completa de relatórios PDF.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* MODALS AND DRAWERS */}

      {/* PDF Report Viewer Modal */}
      {viewingInspectionPdf && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
          <PDFReportViewer
            inspection={viewingInspectionPdf}
            onClose={() => setViewingInspectionPdf(null)}
          />
        </div>
      )}

      {/* NC Detail Drawer */}
      <NonConformityDrawer
        nc={selectedNcForDrawer}
        onClose={() => setSelectedNcForDrawer(null)}
        onUpdateStatus={handleUpdateNcStatus}
      />

      {/* Equipment QR Tag Modal */}
      <EquipmentQRModal
        equipment={selectedEquipmentForQr}
        onClose={() => setSelectedEquipmentForQr(null)}
      />
    </div>
  );
};
