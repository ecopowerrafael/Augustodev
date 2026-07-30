import React, { FC } from 'react';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  User, 
  Users, 
  Settings, 
  Globe, 
  Volume2, 
  VolumeX, 
  Eye, 
  ArrowLeft,
  GraduationCap,
  Activity,
  Smile
} from 'lucide-react';
import { Language, UserRole, AccessibilitySettings, StudentProfile } from '../../types/neuroaprende';

interface NeuroHeaderProps {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  settings: AccessibilitySettings;
  setSettings: React.Dispatch<React.SetStateAction<AccessibilitySettings>>;
  student: StudentProfile;
  onOpenAccessibilityModal: () => void;
  onBackToPortfolio?: () => void;
}

export const NeuroHeader: FC<NeuroHeaderProps> = ({
  activeRole,
  setActiveRole,
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  settings,
  setSettings,
  student,
  onOpenAccessibilityModal,
  onBackToPortfolio
}) => {
  const isRtl = language === 'ar';

  const roleLabels: Record<UserRole, { label: string; icon: any; badge: string }> = {
    child: { label: 'Área da Criança', icon: Smile, badge: 'Lúdico & Seguro' },
    parent: { label: 'Pais & Família', icon: Heart, badge: 'Acompanhamento' },
    educator: { label: 'Escolas & Professores', icon: GraduationCap, badge: 'Turmas' },
    therapist: { label: 'Terapeutas / Psicopedagogos', icon: Activity, badge: 'Atendimento' },
    admin: { label: 'Gestão / Editor de Atividades', icon: Settings, badge: 'Painel 3.000 Tasks' },
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-sky-150 sticky top-0 z-40 transition-colors shadow-sm">
      
      {/* Top Utility Bar: Accessibility & Language & Role Selectors */}
      <div className="bg-gradient-to-r from-sky-100/80 via-amber-50 to-emerald-100/60 border-b border-sky-100 px-4 py-2 text-xs text-slate-700 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          
          {/* Left: Back to Portfolio & Active Mode Badge */}
          <div className="flex items-center space-x-3">
            {onBackToPortfolio && (
              <button
                onClick={onBackToPortfolio}
                className="flex items-center space-x-1.5 px-3 py-1 bg-white hover:bg-sky-50 text-slate-700 rounded-xl transition font-bold text-[11px] border border-sky-200 shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-sky-600" />
                <span>Portfólio</span>
              </button>
            )}

            <div className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-100/80 border border-emerald-300 text-emerald-800 rounded-full font-bold text-[10px] uppercase shadow-sm">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Plataforma Inclusiva & Infantil • Neurodivergência</span>
            </div>
          </div>

          {/* Right: Quick Accessibility & Multi-language Toggles */}
          <div className="flex items-center space-x-3">
            
            {/* Low Stimulus Toggle */}
            <button
              onClick={() => setSettings(prev => ({ ...prev, lowStimulusMode: !prev.lowStimulusMode }))}
              className={`px-3 py-1 rounded-xl font-bold transition flex items-center space-x-1.5 text-[11px] border shadow-sm ${
                settings.lowStimulusMode 
                  ? 'bg-amber-200/90 text-amber-900 border-amber-400' 
                  : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50'
              }`}
              title="Ativar/Desativar Modo Calmo (Cores suaves e iluminação reduzida)"
            >
              <Eye className="w-3.5 h-3.5 text-amber-600" />
              <span>{settings.lowStimulusMode ? 'Modo Calmo ON' : 'Modo Calmo'}</span>
            </button>

            {/* Accessibility Modal Drawer Trigger */}
            <button
              onClick={onOpenAccessibilityModal}
              className="p-1.5 bg-white hover:bg-sky-50 text-slate-700 rounded-xl transition border border-sky-200 shadow-sm text-[11px]"
              title="Abrir Painel de Acessibilidade (Tamanho da fonte, voz, contraste)"
            >
              <Settings className="w-3.5 h-3.5 text-slate-600" />
            </button>

            {/* Language Selector */}
            <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-sky-200 shadow-sm">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1" />
              {(['pt', 'en', 'es', 'ar'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setSettings(s => ({ ...s, useRtl: lang === 'ar' }));
                  }}
                  className={`px-2 py-0.5 rounded-lg font-bold uppercase text-[10px] transition ${
                    language === lang 
                      ? 'bg-emerald-500 text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-sky-50'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand Logo & Mascote */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-sky-400 p-0.5 shadow-md flex items-center justify-center transform hover:scale-105 transition">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-2xl shadow-inner">
              🦉
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif font-bold text-2xl text-slate-900 tracking-tight">
                NeuroAprende
              </h1>
              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[10px] font-bold uppercase shadow-xs">
                Games
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500">
              Aprendizagem Multissensorial & Acessível
            </p>
          </div>
        </div>

        {/* Role & Navigation Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 font-bold text-xs">
          
          <button
            onClick={() => { setActiveRole('child'); setActiveTab('mundos'); }}
            className={`px-4 py-2.5 rounded-2xl font-bold transition flex items-center space-x-2 border shadow-sm ${
              activeRole === 'child'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-600 shadow-emerald-200'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Smile className="w-4 h-4 text-emerald-200" />
            <span>Mundos dos Jogos</span>
            <span className="px-2 py-0.5 bg-white/20 text-white rounded-full text-[10px] font-extrabold">⭐ {student.stars}</span>
          </button>

          <button
            onClick={() => { setActiveRole('parent'); setActiveTab('dashboard'); }}
            className={`px-4 py-2.5 rounded-2xl font-bold transition flex items-center space-x-2 border shadow-sm ${
              activeRole === 'parent' || activeRole === 'educator' || activeRole === 'therapist'
                ? 'bg-amber-500 text-white border-amber-600 shadow-amber-200'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4 text-amber-100" />
            <span>Painel Adulto & Relatórios</span>
          </button>

          <button
            onClick={() => { setActiveRole('admin'); setActiveTab('editor_admin'); }}
            className={`px-4 py-2.5 rounded-2xl font-bold transition flex items-center space-x-2 border shadow-sm ${
              activeRole === 'admin'
                ? 'bg-purple-600 text-white border-purple-700 shadow-purple-200'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4 text-purple-200" />
            <span>Editor 3.000 Tasks</span>
          </button>

        </div>

      </div>
    </header>
  );
};
