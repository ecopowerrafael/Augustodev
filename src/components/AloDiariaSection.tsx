import React from 'react';
import { 
  Sparkles, 
  Building2, 
  ArrowUpRight, 
  ShieldCheck, 
  Star, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  Users, 
  Briefcase,
  Heart
} from 'lucide-react';

interface AloDiariaSectionProps {
  onOpenPrototype: () => void;
}

export const AloDiariaSection: React.FC<AloDiariaSectionProps> = ({ onOpenPrototype }) => {
  return (
    <div className="relative rounded-3xl bg-white border border-slate-200 p-6 md:p-10 overflow-hidden font-sans space-y-8 text-left text-slate-900 shadow-xl">
      
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Badge & Title */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-teal-50 border border-teal-200 text-teal-800 font-mono text-xs font-bold rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>CASE 44 // PLATAFORMA DE DIÁRIAS & LIMPEZA DOMÉSTICA</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Alô Diária Dona Maria <span className="text-teal-700 font-normal">| Conexão Inteligente para Serviços Domésticos</span>
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            Ecossistema completo contendo Aplicativo do Cliente, Aplicativo da Diarista e Painel Administrativo. Inclui cálculo automático de horas por cômodo, filtro por antecedentes criminais verificados, acompanhamento do status do serviço ao vivo e módulo financeiro com comissão.
          </p>
        </div>

        <button
          onClick={onOpenPrototype}
          className="px-6 py-3.5 bg-teal-700 hover:bg-teal-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-teal-700/20 transition flex items-center space-x-2 cursor-pointer shrink-0 border border-teal-600"
        >
          <span>Acessar Protótipo Alô Diária</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 pt-2">
        
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">Aplicativo do Cliente</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Busca avançada por bairro/distância, wizard de agendamento por cômodos, checkout PIX e mapa de acompanhamento do status da faxina ao vivo.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">Aplicativo da Diarista</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Controle de agenda semanal, aceite/recusa de diárias, check-in e check-out em tempo real e carteira digital de repasses PIX instantâneos.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">Painel Administrativo</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Auditoria de antecedentes criminais, gestão de comissões (slider %), relatórios de crescimento e moderação de avaliações.
          </p>
        </div>

      </div>

      {/* Interactive Status Banner */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-slate-700">
            <strong className="text-slate-900">Status do Protótipo:</strong> 100% Interativo Navegável • Alternância entre 3 Perfis
          </span>
        </div>

        <div className="flex items-center space-x-2 font-mono text-slate-500">
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
