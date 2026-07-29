import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Calendar, 
  Award, 
  Coffee, 
  Activity, 
  Home, 
  BedDouble, 
  MapPin, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { AlkymityTab, CartItem } from '../../types/alkymity';

interface AlkymityHeaderProps {
  activeTab: AlkymityTab;
  setActiveTab: (tab: AlkymityTab) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  setIsAuthOpen: (open: boolean) => void;
  onBackToPortfolio?: () => void;
}

export const AlkymityHeader: React.FC<AlkymityHeaderProps> = ({
  activeTab,
  setActiveTab,
  cart,
  setIsCartOpen,
  setIsAuthOpen,
  onBackToPortfolio
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems: { id: AlkymityTab; label: string; icon: React.ReactNode; tag?: string }[] = [
    { id: 'home', label: 'Início', icon: <Home className="w-4 h-4" /> },
    { id: 'studio', label: 'Studio Pilates', icon: <Activity className="w-4 h-4" />, tag: 'FITCO' },
    { id: 'kitchen', label: 'Kitchen & Café', icon: <Coffee className="w-4 h-4" /> },
    { id: 'running', label: 'Running Club', icon: <Compass className="w-4 h-4" /> },
    { id: 'retreats', label: 'Retiros & Certificações', icon: <Award className="w-4 h-4" />, tag: '2026' },
    { id: 'suites', label: 'Suites & Lodging', icon: <BedDouble className="w-4 h-4" /> },
    { id: 'experiences', label: 'Experiências', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'member-portal', label: 'Área de Membros', icon: <ShieldCheck className="w-4 h-4" />, tag: 'VIP' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#121212]/90 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-all duration-300">
      {/* Top bar with location announcement & portfolio exit */}
      <div className="bg-[#1A1B1A] border-b border-stone-800 text-[11px] font-mono tracking-wider uppercase px-4 py-1.5 flex items-center justify-between text-stone-400">
        <div className="flex items-center space-x-2">
          <MapPin className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Santa Cruz Island • Galápagos Archipelago, Ecuador</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline-block text-stone-500">
            Temp: 24°C • Ocean: 22°C • Clear Sky
          </span>
          {onBackToPortfolio && (
            <button
              onClick={onBackToPortfolio}
              className="text-stone-300 hover:text-white underline underline-offset-2 flex items-center gap-1 transition"
            >
              <span>← Voltar ao Portfólio</span>
            </button>
          )}
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Brand */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-200 to-stone-400 text-stone-950 flex items-center justify-center font-serif font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
            A
          </div>
          <div>
            <span className="font-serif text-2xl tracking-[0.2em] font-light text-stone-100 uppercase block leading-none">
              ALKYMITY
            </span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-emerald-400/90 uppercase block mt-1">
              Galápagos • Wellness Ecosystem
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-full text-xs font-medium tracking-wide transition-all flex items-center space-x-1.5 relative ${
                  isActive
                    ? 'bg-stone-800 text-white shadow-inner font-semibold border border-stone-700'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.tag && (
                  <span className="ml-1 px-1.5 py-0.2 text-[8px] font-mono bg-emerald-500/20 text-emerald-300 rounded uppercase border border-emerald-500/30">
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions (Cart, Member Auth, Mobile Toggle) */}
        <div className="flex items-center space-x-3">
          {/* Schedule Quick CTA */}
          <button
            onClick={() => setActiveTab('studio')}
            className="hidden md:flex items-center space-x-2 px-3.5 py-2 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 text-xs font-mono uppercase tracking-wider rounded-full transition"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Agendar Aula</span>
          </button>

          {/* Cart Drawer Toggle */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-200 transition border border-stone-700"
            aria-label="Ver Carrinho"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-stone-950 font-mono font-bold text-[10px] rounded-full flex items-center justify-center animate-bounce shadow">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile / Login Button */}
          <button
            onClick={() => setIsAuthOpen(true)}
            className="p-2.5 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-200 transition border border-stone-700 flex items-center space-x-2"
            aria-label="Perfil do Membro"
          >
            <User className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline-block text-xs font-mono">Entrar</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-xl bg-stone-800 text-stone-200 hover:bg-stone-700 border border-stone-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#161716] border-b border-stone-800 px-4 py-4 space-y-2 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-xl text-xs font-medium text-left flex items-center justify-between border transition ${
                  activeTab === item.id
                    ? 'bg-stone-800 border-emerald-500/50 text-emerald-300 font-bold'
                    : 'bg-stone-900/60 border-stone-800 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-emerald-400">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-500" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs font-mono text-stone-400">
            <span>FITCO Integrated API Simulator</span>
            <span className="text-emerald-400 font-bold">Stripe & PayPal Ready</span>
          </div>
        </div>
      )}
    </header>
  );
};
