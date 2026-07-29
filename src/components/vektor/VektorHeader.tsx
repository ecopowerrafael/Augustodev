import React, { useState } from 'react';
import { VektorTab } from '../../types/vektor';
import { 
  Building2, 
  BarChart3, 
  ShieldCheck, 
  Wallet, 
  UserCheck, 
  Menu, 
  X, 
  PhoneCall, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  HelpCircle,
  FileText,
  Calculator,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

interface VektorHeaderProps {
  activeTab: VektorTab;
  setActiveTab: (tab: VektorTab) => void;
  onBackToPortfolio?: () => void;
}

export const VektorHeader: React.FC<VektorHeaderProps> = ({
  activeTab,
  setActiveTab,
  onBackToPortfolio
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: VektorTab; label: string; badge?: string }[] = [
    { id: 'home', label: 'Início' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'abrir-empresa', label: 'Abrir Empresa', badge: 'Grátis' },
    { id: 'trocar-contabilidade', label: 'Trocar de Contador' },
    { id: 'diagnostico', label: 'Diagnóstico Tributário', badge: 'Novo' },
    { id: 'bpo-financeiro', label: 'BPO Financeiro' },
    { id: 'sobre', label: 'Sobre Nós' },
    { id: 'blog', label: 'Conteúdo & Guias' },
    { id: 'contato', label: 'Contato' }
  ];

  const handleNavClick = (tab: VektorTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 transition-all">
      {/* Top Bar Announcement */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-stone-950 border-b border-emerald-500/20 py-2 px-4 text-xs text-stone-300 font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-emerald-300 font-bold text-[10px] uppercase">
              Contabilidade Consultiva 2026
            </span>
            <span className="hidden sm:inline text-stone-300">
              Planejamento Tributário Ativo • Atendimento Nacional 100% Humanizado
            </span>
          </div>

          <div className="flex items-center space-x-4 shrink-0 text-[11px]">
            {onBackToPortfolio && (
              <button
                onClick={onBackToPortfolio}
                className="text-stone-400 hover:text-emerald-400 transition flex items-center gap-1 font-bold"
              >
                <span>← Voltar ao Portfólio Case 39</span>
              </button>
            )}
            <span className="hidden md:inline text-stone-600">|</span>
            <a 
              href="https://wa.me/5511999998888?text=Olá!%20Gostaria%20de%20falar%20com%20um%20contador%20da%20Vektor." 
              target="_blank" 
              rel="noreferrer" 
              className="text-emerald-400 hover:underline flex items-center gap-1 font-bold"
            >
              <PhoneCall className="w-3 h-3" />
              <span>(11) 3280-9000</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-3 text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-600 to-teal-800 p-0.5 shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition duration-300">
            <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center text-emerald-400 font-serif font-bold text-xl tracking-tight">
              V
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition">
                VEKTOR
              </span>
              <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded text-[9px] font-mono font-bold uppercase">
                CRC/SP
              </span>
            </div>
            <span className="text-[10px] font-mono text-stone-400 tracking-wider block -mt-1 uppercase">
              Contabilidade Estratégica
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1 font-sans text-xs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-xl transition font-medium relative flex items-center space-x-1.5 ${
                  isActive
                    ? 'text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 font-semibold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-900/80'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`px-1.5 py-0.2 rounded-[4px] text-[9px] font-mono uppercase font-bold ${
                    item.badge === 'Grátis' 
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' 
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Client Portal Link Button */}
          <button
            onClick={() => handleNavClick('area-cliente')}
            className={`px-3.5 py-2 rounded-xl border font-mono text-xs font-bold transition flex items-center space-x-2 ${
              activeTab === 'area-cliente'
                ? 'bg-emerald-400 text-stone-950 border-emerald-400'
                : 'bg-stone-900 text-stone-200 border-stone-800 hover:border-emerald-500/40 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Área do Cliente</span>
          </button>

          {/* Qualified Call CTA */}
          <button
            onClick={() => handleNavClick('contato')}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-mono text-xs uppercase font-bold tracking-wider rounded-xl transition shadow-lg shadow-emerald-950/30 flex items-center space-x-1.5"
          >
            <span>Falar com Especialista</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex xl:hidden items-center space-x-2">
          <button
            onClick={() => handleNavClick('area-cliente')}
            className="px-2.5 py-1.5 bg-stone-900 border border-stone-800 text-emerald-400 rounded-lg text-xs font-mono flex items-center gap-1"
          >
            <Lock className="w-3 h-3" />
            <span className="hidden sm:inline">Portal</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-stone-300 hover:text-white rounded-xl bg-stone-900 border border-stone-800"
            aria-label="Menu principal"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-stone-950 border-b border-stone-800 px-4 pt-3 pb-6 space-y-2 font-sans animate-fade-in">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full px-4 py-3 rounded-xl text-left font-medium text-sm flex items-center justify-between transition ${
                    isActive
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-bold'
                      : 'text-stone-300 hover:bg-stone-900'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-mono rounded">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-600" />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-stone-800 space-y-2 font-mono text-xs">
            <button
              onClick={() => handleNavClick('area-cliente')}
              className="w-full py-3 bg-stone-900 border border-stone-700 text-stone-200 rounded-xl font-bold flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Acessar Área do Cliente</span>
            </button>

            <button
              onClick={() => handleNavClick('contato')}
              className="w-full py-3 bg-emerald-400 text-stone-950 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Falar com Especialista Agora</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
