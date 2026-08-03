import React from 'react';
import { AloDiariaLogo } from './aloDiaria/AloDiariaLogo';
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
  Heart,
  QrCode
} from 'lucide-react';

interface AloDiariaSectionProps {
  onOpenPrototype: () => void;
}

export const AloDiariaSection: React.FC<AloDiariaSectionProps> = ({ onOpenPrototype }) => {
  return (
    <div className="relative rounded-3xl bg-white border border-purple-100 p-6 md:p-10 overflow-hidden font-sans space-y-8 text-left text-slate-900 shadow-xl">
      
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#4C1D95]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#EC4899]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Badge & Title */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-purple-50 border border-purple-200 text-[#4C1D95] font-mono text-xs font-bold rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
            <span>CASE DE SUCESSO // PLATAFORMA DE DIÁRIAS & SERVIÇOS DOMÉSTICOS</span>
          </div>
          
          <AloDiariaLogo size="lg" />

          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            Ecossistema interativo de alta fidelidade contemplando Aplicativo do Cliente, Aplicativo da Diarista e Painel Administrativo. Inclui checkout Pix com garantia de 100% de segurança, onboarding corporativo para empresas (Restaurantes, Hoteis, Clínicas, etc), cadastro de diaristas em 15 passos e monitoramento do status ao vivo.
          </p>
        </div>

        <button
          onClick={onOpenPrototype}
          className="px-6 py-3.5 bg-[#4C1D95] hover:bg-purple-900 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-purple-900/20 transition flex items-center space-x-2 cursor-pointer shrink-0 border border-purple-700"
        >
          <span>Acessar Protótipo Alô Diária</span>
          <ArrowUpRight className="w-4 h-4 text-[#EC4899]" />
        </button>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 pt-2">
        
        <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#4C1D95]">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">Aplicativo do Cliente & Empresas</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Onboarding para clientes residenciais e empresas (Restaurante, Hotel, Clínica), checkout Pix e mapa de acompanhamento do status da faxina em tempo real.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-[#EC4899]">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">Aplicativo da Diarista</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Cadastro de profissional em 15 passos, aceite/recusa imediata de oportunidades com pagamento via Pix garantido e carteira digital de saques.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-sm text-slate-900">Painel Administrativo</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Auditoria de documentos, gestão da comissão da plataforma ( slider %), relatórios de faturamento e moderação de avaliações.
          </p>
        </div>

      </div>

      {/* Interactive Status Banner */}
      <div className="p-6 rounded-2xl bg-purple-50/80 border border-purple-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-slate-700">
            <strong className="text-slate-900">Status do Protótipo:</strong> 100% Interativo • Alternância entre Perfis (Cliente / Diarista / Admin)
          </span>
        </div>

        <div className="flex items-center space-x-2 font-mono text-slate-500">
          <span>React 18</span>
          <span>•</span>
          <span>Tailwind CSS</span>
          <span>•</span>
          <span className="text-[#4C1D95] font-bold">Pix 100% Seguro</span>
        </div>
      </div>

    </div>
  );
};
