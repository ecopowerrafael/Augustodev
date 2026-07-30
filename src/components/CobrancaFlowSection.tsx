import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Calendar, DollarSign, Clock, ShieldCheck, ArrowRight, Smartphone, Zap, CheckCircle2 } from 'lucide-react';

interface CobrancaFlowSectionProps {
  onOpenPrototype?: () => void;
}

export const CobrancaFlowSection: React.FC<CobrancaFlowSectionProps> = ({ onOpenPrototype }) => {
  return (
    <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-8 md:p-12 overflow-hidden shadow-2xl text-slate-100 font-sans">
      
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Description & Value Proposition */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5" />
            <span>Protótipo Comercial Protótipo #42</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            CobrancaFlow — Agenda de Cobranças & Réguas Automáticas via WhatsApp
          </h2>

          <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed">
            Solução SaaS completa para empresas de serviços, consultorias e academias controlarem clientes, títulos a vencer, inadimplência e réguas automáticas de mensagens no WhatsApp sem tema escuro e com visual financeiro limpo e profissional.
          </p>

          {/* Key Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold font-sans">
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span className="block text-white">WhatsApp Automático</span>
              <p className="text-[10px] text-slate-400 font-normal">Envio de lembretes antes e pós vencimento</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="block text-white">Agenda Interativa</span>
              <p className="text-[10px] text-slate-400 font-normal">Calendário de recebimentos diários e mensais</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span className="block text-white">PIX & Checkout</span>
              <p className="text-[10px] text-slate-400 font-normal">Gerador de QR Code PIX e links diretos</p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenPrototype}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-blue-600/20 transition flex items-center space-x-2 group cursor-pointer"
            >
              <span>Acessar Protótipo Interativo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <span className="text-xs font-mono text-slate-400 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Navegável com Dados Demo em Tempo Real</span>
            </span>
          </div>

        </div>

        {/* Right Column: Visual Preview Card Mockup */}
        <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 font-sans text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-extrabold text-slate-900">WhatsApp Conectado</span>
            </div>
            <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
              Julho / 2026
            </span>
          </div>

          <div className="space-y-2">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-extrabold text-slate-900 block">Roberto Andrade</span>
                <span className="text-[10px] text-slate-500">Manutenção de Servidores</span>
              </div>
              <span className="font-black text-emerald-700">R$ 1.450,00</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-extrabold text-slate-900 block">Juliana Ferreira</span>
                <span className="text-[10px] text-slate-500">Consultoria Trimestral</span>
              </div>
              <span className="font-black text-blue-700">R$ 3.800,00</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 space-y-1">
            <span className="font-extrabold text-[11px] block">✓ Lembrete Enviado no WhatsApp</span>
            <p className="text-[10px] text-emerald-800 leading-tight">
              "Olá, Roberto! Lembrando que seu boleto vence hoje. Link PIX: https://cb.app/pay/8391"
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
