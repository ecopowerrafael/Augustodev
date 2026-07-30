import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Sparkles, 
  Briefcase, 
  Building2, 
  ArrowUpRight, 
  Bot, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  TrendingUp,
  Brain
} from 'lucide-react';

interface RHConnectSectionProps {
  onOpenPrototype: () => void;
}

export const RHConnectSection: React.FC<RHConnectSectionProps> = ({ onOpenPrototype }) => {
  return (
    <div className="relative rounded-3xl bg-slate-950 border border-white/10 p-6 md:p-10 overflow-hidden font-sans space-y-8 text-left text-white shadow-2xl">
      
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Badge & Title */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-bold rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>CASE 43 // PLATAFORMA SAAS DE R&S COM IA</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            RH Connect <span className="text-blue-500 font-normal">| Recrutamento & Seleção Inteligente com IA</span>
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Plataforma SaaS ponta a ponta para conexão entre empresas, recrutadores e candidatos. Inclui triagem automática de currículos com cálculo de Score IA %, painel de gestão financeira MRR, ranking de talentos e mensagens em tempo real.
          </p>
        </div>

        <button
          onClick={onOpenPrototype}
          className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-blue-600/30 transition flex items-center space-x-2 cursor-pointer shrink-0 border border-blue-400/30"
        >
          <span>Acessar Protótipo RH Connect</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 pt-2">
        
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Brain className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-white">Ranking IA de Candidatos</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Algoritmo que analisa currículos e respostas de triagem eliminatória, atribuindo uma porcentagem de aderência (ex: 94% Match).
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-white">Portais Multi-Perfi (3 em 1)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Experiências customizadas para Candidatos (vagas e candidaturas), Empresas (publicação e triagem) e Super Admin (gestão MRR).
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-white">Chat & Agendamento</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Chat direto entre candidatos e recrutadores com envio de convites de entrevista via Google Meet/Teams.
          </p>
        </div>

      </div>

      {/* Interactive Mockup Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-slate-300">
            <strong className="text-white">Status da Aplicação:</strong> Protótipo 100% Interativo Pronto • 7 Dias Grátis Ativado
          </span>
        </div>

        <div className="flex items-center space-x-2 font-mono text-slate-400">
          <span>React 18</span>
          <span>•</span>
          <span>Tailwind CSS</span>
          <span>•</span>
          <span>TypeScript</span>
        </div>
      </div>

    </div>
  );
};
