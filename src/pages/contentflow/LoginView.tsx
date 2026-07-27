import React, { useState } from 'react';
import { Layers, ArrowRight, CheckCircle, Sparkles, ShieldCheck, Lock } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: () => void;
  onOpenOnboarding: () => void;
  isDarkMode: boolean;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onOpenOnboarding,
  isDarkMode,
}) => {
  const [email, setEmail] = useState('gestor@contentflow.com.br');
  const [password, setPassword] = useState('123456');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 font-sans transition-colors ${
      isDarkMode ? 'bg-stone-950 text-stone-100' : 'bg-[#F6F7FB] text-stone-900'
    }`}>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 rounded-3xl border shadow-2xl overflow-hidden border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
        
        {/* Left Branding Side (5 Cols) */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#31246C] via-[#48339c] to-[#6C4FF8] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          {/* Logo */}
          <div className="flex items-center space-x-2 z-10">
            <div className="w-10 h-10 rounded-xl bg-white text-[#31246C] flex items-center justify-center font-bold shadow-lg">
              <Layers className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight">ContentFlow</span>
          </div>

          {/* Text */}
          <div className="my-8 space-y-4 z-10">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider text-purple-200 border border-white/20">
              PLATAFORMA SAAS MULTI-TENANT
            </span>
            <h2 className="text-2xl font-bold leading-tight">
              Organize toda a sua produção de conteúdo em um só lugar.
            </h2>
            <p className="text-xs text-purple-100/80 leading-relaxed font-serif">
              Centralize ideias, tarefas, calendários e aprovações dos seus clientes com clareza e agilidade.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-purple-100">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Gestão multi-tenant por cliente</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-100">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Portal de aprovação sem fricção</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-100">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Kanban editorial e calendário</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-purple-200/60 z-10">
            © 2026 ContentFlow Inc. Protótipo SaaS Comercial.
          </div>
        </div>

        {/* Right Form Side (7 Cols) */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6">
          <div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-white">Acesse sua Conta</h3>
            <p className="text-xs text-stone-500 mt-1">Informe suas credenciais ou utilize o acesso demonstrativo.</p>
          </div>

          {/* Quick Demo Credentials Box */}
          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs space-y-1">
            <div className="flex items-center justify-between font-bold text-purple-900 dark:text-purple-200">
              <span className="flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Dados demonstrativos pré-carregados:</span>
              </span>
              <span className="text-[10px] text-purple-600 uppercase font-mono">DEMO READY</span>
            </div>
            <p className="text-stone-600 dark:text-purple-300 font-mono text-[11px]">E-mail: gestor@contentflow.com.br</p>
            <p className="text-stone-600 dark:text-purple-300 font-mono text-[11px]">Senha: 123456</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                E-mail Corporativo
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-sm font-medium focus:ring-2 focus:ring-[#6C4FF8] focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500">
                  Senha
                </label>
                <a href="#forgot" className="text-[11px] font-bold text-[#6C4FF8] hover:underline">
                  Esqueci minha senha
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-sm font-medium focus:ring-2 focus:ring-[#6C4FF8] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 text-stone-600 dark:text-stone-300 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-[#6C4FF8]" />
                <span>Lembrar meu acesso</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#6C4FF8] hover:bg-[#5a3ee3] text-white font-bold text-xs shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.01] flex items-center justify-center space-x-2"
            >
              <span>Entrar na Plataforma</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social login & Onboarding link */}
          <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800">
            <button
              onClick={onLoginSuccess}
              className="w-full py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold flex items-center justify-center space-x-2 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              <span>Continuar com Google</span>
            </button>

            <div className="text-center text-xs text-stone-500">
              Sua agência ainda não tem conta?{' '}
              <button onClick={onOpenOnboarding} className="font-bold text-[#6C4FF8] hover:underline">
                Criar nova organização (Onboarding)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
