import React, { useState } from 'react';
import { 
  UserRole 
} from '../../types/rhconnect';
import { 
  Briefcase, 
  User, 
  Building2, 
  ShieldCheck, 
  Bell, 
  Sparkles, 
  ChevronDown, 
  Search, 
  PlusCircle, 
  MessageSquare, 
  CreditCard, 
  LayoutDashboard, 
  FileText, 
  LogOut,
  ArrowLeft,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

interface RHConnectHeaderProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenAuthModal: (initialMode?: 'login' | 'register_candidate' | 'register_company') => void;
  onBackToPortfolio: () => void;
  selectedCandidateName: string;
  selectedCompanyName: string;
}

export const RHConnectHeader: React.FC<RHConnectHeaderProps> = ({
  userRole,
  setUserRole,
  activeTab,
  setActiveTab,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenAuthModal,
  onBackToPortfolio,
  selectedCandidateName,
  selectedCompanyName
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 font-sans shadow-xs">
      
      {/* Top Bar: Global Role & Environment Switcher */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-8 flex flex-wrap justify-between items-center gap-2 font-medium">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-600/30 text-blue-300 font-mono text-[10px] uppercase font-bold border border-blue-500/40">
            <Sparkles className="w-3 h-3 mr-1 text-blue-400" /> Protótipo Interativo #43
          </span>
          <span className="hidden sm:inline text-slate-400">
            Selecione a perspectiva para navegar na plataforma:
          </span>
        </div>

        {/* Role Pills Switcher */}
        <div className="flex items-center space-x-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => {
              setUserRole('public');
              setActiveTab('landing');
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition flex items-center space-x-1.5 ${
              userRole === 'public' 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Briefcase className="w-3 h-3" />
            <span>Landing Page</span>
          </button>

          <button
            onClick={() => {
              setUserRole('candidate');
              setActiveTab('candidate_dashboard');
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition flex items-center space-x-1.5 ${
              userRole === 'candidate' 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <User className="w-3 h-3 text-emerald-400" />
            <span>Área do Candidato</span>
          </button>

          <button
            onClick={() => {
              setUserRole('company');
              setActiveTab('company_dashboard');
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition flex items-center space-x-1.5 ${
              userRole === 'company' 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Building2 className="w-3 h-3 text-amber-400" />
            <span>Área da Empresa</span>
          </button>

          <button
            onClick={() => {
              setUserRole('admin');
              setActiveTab('admin_dashboard');
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition flex items-center space-x-1.5 ${
              userRole === 'admin' 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-3 h-3 text-purple-400" />
            <span>Painel Admin</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => {
                if (userRole === 'public') setActiveTab('landing');
                else if (userRole === 'candidate') setActiveTab('candidate_dashboard');
                else if (userRole === 'company') setActiveTab('company_dashboard');
                else if (userRole === 'admin') setActiveTab('admin_dashboard');
              }}
              className="flex items-center space-x-2.5 group text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:bg-blue-700 transition">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xl font-black tracking-tight text-slate-900 font-sans">
                    RH<span className="text-blue-600">Connect</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-mono font-extrabold uppercase">
                    IA
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                  Recrutamento & Seleção
                </p>
              </div>
            </button>

            {/* Contextual Navigation Links based on User Role */}
            <nav className="hidden lg:flex items-center space-x-1">
              
              {/* Public Landing Links */}
              {userRole === 'public' && (
                <>
                  <button
                    onClick={() => setActiveTab('landing')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
                      activeTab === 'landing' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Início
                  </button>
                  <button
                    onClick={() => setActiveTab('job_search')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition ${
                      activeTab === 'job_search' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Buscar Vagas
                  </button>
                  <a
                    href="#planos"
                    onClick={() => setActiveTab('landing')}
                    className="px-3 py-2 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
                  >
                    Planos
                  </a>
                  <a
                    href="#beneficios"
                    onClick={() => setActiveTab('landing')}
                    className="px-3 py-2 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
                  >
                    Benefícios & IA
                  </a>
                </>
              )}

              {/* Candidate Links */}
              {userRole === 'candidate' && (
                <>
                  <button
                    onClick={() => setActiveTab('candidate_dashboard')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                      activeTab === 'candidate_dashboard' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Meu Painel</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('job_search')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                      activeTab === 'job_search' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Search className="w-4 h-4" />
                    <span>Buscar Vagas</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('candidate_applications')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                      activeTab === 'candidate_applications' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Minhas Candidaturas</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('candidate_profile')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                      activeTab === 'candidate_profile' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Meu Perfil & CV</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('chat')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                      activeTab === 'chat' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Mensagens</span>
                  </button>
                </>
              )}

              {/* Company Links */}
              {userRole === 'company' && (
                <>
                  <button
                    onClick={() => setActiveTab('company_dashboard')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                      activeTab === 'company_dashboard' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard RH</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('company_jobs')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                      activeTab === 'company_jobs' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Gerenciar Vagas</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('company_candidates')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                      activeTab === 'company_candidates' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Triagem IA & Ranking</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('company_new_job')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                      activeTab === 'company_new_job' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <PlusCircle className="w-4 h-4 text-emerald-600" />
                    <span>Publicar Vaga</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('chat')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                      activeTab === 'chat' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('company_financial')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                      activeTab === 'company_financial' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-amber-600" />
                    <span>Assinatura</span>
                  </button>
                </>
              )}

              {/* Admin Links */}
              {userRole === 'admin' && (
                <>
                  <button
                    onClick={() => setActiveTab('admin_dashboard')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                      activeTab === 'admin_dashboard' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Visão Geral</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('admin_companies')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                      activeTab === 'admin_companies' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Empresas</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('admin_candidates')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                      activeTab === 'admin_candidates' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Candidatos</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('admin_ai_config')}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                      activeTab === 'admin_ai_config' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <SlidersHorizontal className="w-4 h-4 text-purple-600" />
                    <span>Motores IA</span>
                  </button>
                </>
              )}

            </nav>
          </div>

          {/* Right Area: Actions & Profile */}
          <div className="flex items-center space-x-3">
            
            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition cursor-pointer"
              title="Notificações"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Auth Buttons for Public Mode */}
            {userRole === 'public' && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onOpenAuthModal('login')}
                  className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition cursor-pointer"
                >
                  Entrar
                </button>

                <button
                  onClick={() => onOpenAuthModal('register_candidate')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Cadastrar Vagas</span>
                </button>
              </div>
            )}

            {/* Profile Menu for Authenticated Views */}
            {userRole !== 'public' && (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 pl-3 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50 transition cursor-pointer"
                >
                  <div className="text-right hidden sm:block">
                    <span className="block text-xs font-bold text-slate-900 leading-tight">
                      {userRole === 'candidate' && selectedCandidateName}
                      {userRole === 'company' && selectedCompanyName}
                      {userRole === 'admin' && 'Administrador RH'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-medium capitalize">
                      {userRole === 'candidate' ? 'Candidato Verificado' : userRole === 'company' ? 'Empresa Premium' : 'Super Admin'}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {userRole === 'candidate' && 'MS'}
                    {userRole === 'company' && 'TS'}
                    {userRole === 'admin' && 'AD'}
                  </div>

                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 text-xs font-sans">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-extrabold text-slate-900">
                        {userRole === 'candidate' && selectedCandidateName}
                        {userRole === 'company' && selectedCompanyName}
                        {userRole === 'admin' && 'Sistemas RH Connect'}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">Status: Conta Ativa</p>
                    </div>

                    <div className="py-1">
                      {userRole === 'candidate' && (
                        <button
                          onClick={() => {
                            setActiveTab('candidate_profile');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center space-x-2"
                        >
                          <User className="w-4 h-4" />
                          <span>Editar Meu Perfil</span>
                        </button>
                      )}

                      {userRole === 'company' && (
                        <button
                          onClick={() => {
                            setActiveTab('company_financial');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center space-x-2"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>Gerenciar Assinatura</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setUserRole('public');
                          setActiveTab('landing');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sair da Conta</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Portfolio Link Button */}
            <button
              onClick={onBackToPortfolio}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center space-x-1.5 cursor-pointer border border-slate-200"
              title="Voltar ao Portfólio do Desenvolvedor"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Portfólio</span>
            </button>

          </div>

        </div>
      </div>

    </header>
  );
};
