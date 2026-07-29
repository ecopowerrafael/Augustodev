import React, { useState } from 'react';
import { 
  Sparkles, 
  Compass, 
  Coffee, 
  Activity, 
  Award, 
  BedDouble, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Star, 
  ChevronRight, 
  Calendar 
} from 'lucide-react';

interface AlkymitySectionProps {
  onOpenApp: () => void;
}

export const AlkymitySection: React.FC<AlkymitySectionProps> = ({ onOpenApp }) => {
  const [activePreviewTab, setActivePreviewTab] = useState<'overview' | 'studio' | 'kitchen' | 'running' | 'retreats' | 'suites'>('overview');

  return (
    <div className="bg-[#0D0E0D] border border-stone-800 rounded-3xl p-6 sm:p-10 text-stone-100 shadow-2xl relative overflow-hidden space-y-8 font-sans">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge & Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-stone-800/80 pb-8 relative z-10">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 font-mono text-[11px] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Case 38 • Protótipo Digital Premium</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-white">
            Alkymity <span className="italic font-normal text-emerald-400">Galápagos</span>
          </h2>

          <p className="text-stone-300 font-serif text-sm sm:text-base leading-relaxed font-light">
            Plataforma digital responsiva e navegável para ecossistema de bem-estar de alto luxo sediado nas Ilhas Galápagos. Integração harmoniosa entre Pilates Reformer, gastronomia funcional orgânica, running club e suítes à beira-mar.
          </p>

          <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
            <span className="px-2.5 py-1 bg-stone-900 border border-stone-800 text-stone-300 rounded-md">FITCO API Simulator</span>
            <span className="px-2.5 py-1 bg-stone-900 border border-stone-800 text-stone-300 rounded-md">Stripe & PayPal Checkout</span>
            <span className="px-2.5 py-1 bg-emerald-950 border border-emerald-500/30 text-emerald-300 rounded-md">Galápagos Sanctuary</span>
            <span className="px-2.5 py-1 bg-stone-900 border border-stone-800 text-stone-300 rounded-md">Área do Membro VIP</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onOpenApp}
          className="px-6 py-4 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider rounded-2xl transition shadow-xl flex items-center space-x-2 shrink-0 group"
        >
          <span>Abrir Protótipo Completo</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Interactive Feature Tabs */}
      <div className="space-y-6 relative z-10">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-stone-800/60 font-mono text-xs">
          {[
            { id: 'overview', label: 'Visão Geral & Ecossistema', icon: <Sparkles className="w-3.5 h-3.5" /> },
            { id: 'studio', label: 'Studio Pilates (FITCO)', icon: <Activity className="w-3.5 h-3.5" /> },
            { id: 'kitchen', label: 'Kitchen & Café Orgânico', icon: <Coffee className="w-3.5 h-3.5" /> },
            { id: 'running', label: 'Running Club Galápagos', icon: <Compass className="w-3.5 h-3.5" /> },
            { id: 'retreats', label: 'Retiros & Certificações', icon: <Award className="w-3.5 h-3.5" /> },
            { id: 'suites', label: 'Alkymity Suites VIP', icon: <BedDouble className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePreviewTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl transition flex items-center space-x-2 whitespace-nowrap ${
                activePreviewTab === tab.id
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'bg-stone-900/60 text-stone-400 hover:bg-stone-800 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Cards */}
        <div className="bg-[#151615] border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
          {activePreviewTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold">
                  01
                </span>
                <h4 className="font-serif text-xl text-stone-100 font-medium">Posicionamento Editorial</h4>
                <p className="text-xs text-stone-400 font-serif leading-relaxed">
                  Estética minimalista inspirada em Alo Yoga, Aman Resorts e Six Senses. Fotografia de alto impacto, espaços em branco e tipografia refinada.
                </p>
              </div>

              <div className="space-y-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold">
                  02
                </span>
                <h4 className="font-serif text-xl text-stone-100 font-medium">Integração FITCO Simulada</h4>
                <p className="text-xs text-stone-400 font-serif leading-relaxed">
                  Agendamento de aulas em tempo real no Reformer Allegro 2, controle de créditos de membros, lista de presença e check-in por QR Code.
                </p>
              </div>

              <div className="space-y-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold">
                  03
                </span>
                <h4 className="font-serif text-xl text-stone-100 font-medium">Checkout Stripe / PayPal</h4>
                <p className="text-xs text-stone-400 font-serif leading-relaxed">
                  Fluxo completo de compra e reservas com validação de cupons, simulação de pagamento seguro e emissão de passe digital em tempo real.
                </p>
              </div>
            </div>
          )}

          {activePreviewTab === 'studio' && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <span className="font-mono text-xs text-emerald-400 uppercase font-bold">Alkymity Studio • Reformer & Mat</span>
                <h3 className="font-serif text-2xl text-stone-100">Grade de Aulas & Reservas de Vagas</h3>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  Agendamento instantâneo de aulas no Reformer Allegro 2 com limite de 8 alunos por turma. Controle de instrutores, horários e créditos do membro.
                </p>
              </div>
              <button
                onClick={onOpenApp}
                className="px-5 py-3 bg-emerald-400 text-stone-950 font-mono text-xs font-bold uppercase rounded-xl hover:bg-emerald-300 transition"
              >
                Testar Agendamento no Studio →
              </button>
            </div>
          )}

          {activePreviewTab === 'kitchen' && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <span className="font-mono text-xs text-amber-400 uppercase font-bold">Alkymity Kitchen • Bistrô Orgânico</span>
                <h3 className="font-serif text-2xl text-stone-100">Cardápio Funcional com Informação Nutricional</h3>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  Filtros interativos por dieta (Vegan, Gluten-Free, Keto, High-Protein), cálculo de calorias e macros, e pedido para retirada rápida (Grab & Go).
                </p>
              </div>
              <button
                onClick={onOpenApp}
                className="px-5 py-3 bg-amber-400 text-stone-950 font-mono text-xs font-bold uppercase rounded-xl hover:bg-amber-300 transition"
              >
                Ver Cardápio Orgânico →
              </button>
            </div>
          )}

          {activePreviewTab === 'running' && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <span className="font-mono text-xs text-emerald-400 uppercase font-bold">Running Club Galápagos</span>
                <h3 className="font-serif text-2xl text-stone-100">Treinos Guiados pelas Trilhas Vulcânicas</h3>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  Calendário de percursos com métricas de distância, altimetria e ritmo. Confirmação de presença e hidratação pós-corrida.
                </p>
              </div>
              <button
                onClick={onOpenApp}
                className="px-5 py-3 bg-emerald-400 text-stone-950 font-mono text-xs font-bold uppercase rounded-xl hover:bg-emerald-300 transition"
              >
                Ver Agenda do Running Club →
              </button>
            </div>
          )}

          {activePreviewTab === 'retreats' && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <span className="font-mono text-xs text-emerald-400 uppercase font-bold">Retiros & Certificações 2026</span>
                <h3 className="font-serif text-2xl text-stone-100">Imersões de 7 Dias & Formação 200h</h3>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  Roteiros dia a dia, pensão completa, iate privativo e programa de certificação internacional para formação de instrutores de Pilates.
                </p>
              </div>
              <button
                onClick={onOpenApp}
                className="px-5 py-3 bg-emerald-400 text-stone-950 font-mono text-xs font-bold uppercase rounded-xl hover:bg-emerald-300 transition"
              >
                Explorar Retiros & Cursos →
              </button>
            </div>
          )}

          {activePreviewTab === 'suites' && (
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <span className="font-mono text-xs text-emerald-400 uppercase font-bold">Alkymity Suites • Hospedagem Boutique</span>
                <h3 className="font-serif text-2xl text-stone-100">Suítes Oceanfront com Piscina Privativa</h3>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  Simulador de reserva por diárias com cálculo de estadias, comodidades de luxo e mordomo 24h.
                </p>
              </div>
              <button
                onClick={onOpenApp}
                className="px-5 py-3 bg-emerald-400 text-stone-950 font-mono text-xs font-bold uppercase rounded-xl hover:bg-emerald-300 transition"
              >
                Simular Reserva de Suíte →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlkymitySection;
