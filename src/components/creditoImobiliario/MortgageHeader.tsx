import { FC } from 'react';
import { 
  Building2, 
  Calculator, 
  ShieldCheck, 
  UserCheck, 
  Settings, 
  FileSpreadsheet, 
  ArrowLeft,
  MessageCircle,
  TrendingDown
} from 'lucide-react';

interface MortgageHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  onBackToPortfolio?: () => void;
}

export const MortgageHeader: FC<MortgageHeaderProps> = ({
  activeTab,
  setActiveTab,
  isAdmin,
  setIsAdmin,
  onBackToPortfolio
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            {onBackToPortfolio && (
              <button
                onClick={onBackToPortfolio}
                className="p-2 text-stone-400 hover:text-white hover:bg-stone-900 rounded-xl transition flex items-center space-x-1 font-mono text-xs"
                title="Voltar ao Portfólio Central"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Portfólio</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center space-x-3 text-left group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-0.5 shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition">
                <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center text-emerald-400">
                  <Building2 className="w-6 h-6" />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-serif font-bold text-xl sm:text-2xl text-white group-hover:text-emerald-400 transition tracking-tight">
                    CrediCompare
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded text-[9px] font-mono font-bold uppercase tracking-wider">
                    Multibancos
                  </span>
                </div>
                <span className="text-[11px] text-stone-400 font-mono block leading-none">
                  Simulador de Financiamento Imobiliário
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-mono text-xs">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-xl transition ${
                activeTab === 'home'
                  ? 'bg-stone-900 text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
              }`}
            >
              Início
            </button>

            <button
              onClick={() => setActiveTab('simular')}
              className={`px-3 py-2 rounded-xl transition flex items-center space-x-1.5 ${
                activeTab === 'simular'
                  ? 'bg-emerald-400 text-stone-950 font-bold shadow-md'
                  : 'bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Nova Simulação</span>
            </button>

            <button
              onClick={() => setActiveTab('sac-price')}
              className={`px-3 py-2 rounded-xl transition flex items-center space-x-1.5 ${
                activeTab === 'sac-price'
                  ? 'bg-stone-900 text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
              }`}
            >
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>SAC vs Price</span>
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`px-3 py-2 rounded-xl transition ${
                activeTab === 'faq'
                  ? 'bg-stone-900 text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
              }`}
            >
              Dúvidas Frequentes
            </button>
          </nav>

          {/* Action & Admin Toggle */}
          <div className="flex items-center space-x-3 font-mono text-xs">
            <button
              onClick={() => {
                setIsAdmin(!isAdmin);
                if (!isAdmin) setActiveTab('admin');
                else setActiveTab('home');
              }}
              className={`px-3.5 py-2 rounded-xl border transition flex items-center space-x-2 ${
                isAdmin
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-lg'
                  : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700 hover:text-white'
              }`}
              title="Acessar Painel de Gestão e Taxas Bancárias"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-bold">
                {isAdmin ? 'Modo Painel Admin' : 'Painel Gestor'}
              </span>
            </button>

            <a
              href="https://wa.me/5511999998888?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20financiamento%20imobili%C3%A1rio%20multibancos."
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-bold rounded-xl shadow-lg transition flex items-center space-x-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden md:inline">Falar com Consultor</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};
