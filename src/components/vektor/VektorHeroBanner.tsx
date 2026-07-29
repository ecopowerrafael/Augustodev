import React, { useState } from 'react';
import { VektorTab } from '../../types/vektor';
import { 
  BarChart3, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Calculator, 
  TrendingUp, 
  Building2, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Zap,
  Users,
  Award
} from 'lucide-react';

interface VektorHeroBannerProps {
  setActiveTab: (tab: VektorTab) => void;
}

export const VektorHeroBanner: React.FC<VektorHeroBannerProps> = ({ setActiveTab }) => {
  // Quick Calculator State inside Hero
  const [faturamento, setFaturamento] = useState<number>(50000);
  const [segmento, setSegmento] = useState<'servicos' | 'commerce' | 'tech' | 'saude'>('servicos');

  // Calculation estimates
  const estimatedTaxNoStrategy = faturamento * 0.155; // Anexo V or unoptimized Presumido
  const estimatedTaxWithVektor = faturamento * 0.06; // Anexo III with Fator R or optimized Presumido
  const monthlySavings = Math.max(0, estimatedTaxNoStrategy - estimatedTaxWithVektor);
  const annualSavings = monthlySavings * 12;

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#161816] via-[#121312] to-[#0D0E0D] border border-stone-800 p-6 sm:p-12 md:p-16 text-white shadow-2xl">
      {/* Background Subtle Geometric Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[radial-[#10b981]_1px,transparent_1px] [background-size:24px_24px]" />
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headlines & Positioning */}
        <div className="lg:col-span-7 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 font-mono text-xs uppercase tracking-widest backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Contabilidade Consultiva & Digital</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-stone-100 leading-[1.12]">
            Contabilidade moderna para empresas que querem <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-500">crescer com segurança.</span>
          </h1>

          <p className="text-stone-300 font-serif text-base sm:text-lg leading-relaxed font-light max-w-2xl">
            Menos burocracia, mais inteligência. Organizamos sua gestão fiscal, contábil e financeira para que você tenha mais clareza, economia de impostos e tranquilidade nas decisões.
          </p>

          {/* Bullet Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-sans text-xs text-stone-300">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Redução média de 24% em tributos</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Atendimento via WhatsApp em até 3 min</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Relatórios gerenciais mensais sem juridiquês</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Abertura de empresa com honorários R$ 0</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab('contato')}
              className="px-6 py-4 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider rounded-2xl transition shadow-xl shadow-emerald-950/40 flex items-center space-x-2"
            >
              <span>Falar com um Contador Sênior</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('diagnostico')}
              className="px-6 py-4 bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-stone-700 font-mono text-xs uppercase tracking-wider rounded-2xl transition flex items-center space-x-2"
            >
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Diagnóstico Tributário Completo</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Interactive Quick Simulator Card */}
        <div className="lg:col-span-5">
          <div className="bg-[#181918] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h3 className="font-serif text-lg text-stone-100 font-light">Simulador de Economia Fiscal</h3>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded font-mono text-[10px] font-bold uppercase">
                Análise em Tempo Real
              </span>
            </div>

            {/* Controls */}
            <div className="space-y-4 font-mono text-xs text-stone-300">
              <div>
                <div className="flex justify-between text-[11px] mb-1.5">
                  <span className="text-stone-400">Faturamento Mensal da Empresa:</span>
                  <span className="text-emerald-400 font-bold">R$ {faturamento.toLocaleString('pt-BR')} /mês</span>
                </div>
                <input 
                  type="range" 
                  min="10000" 
                  max="300000" 
                  step="5000"
                  value={faturamento}
                  onChange={(e) => setFaturamento(Number(e.target.value))}
                  className="w-full accent-emerald-400 bg-stone-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <span className="text-[11px] text-stone-400 block mb-1.5">Segmento de Atuação:</span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {[
                    { id: 'servicos', label: 'Prestador de Serviço' },
                    { id: 'tech', label: 'Tech / Software' },
                    { id: 'saude', label: 'Saúde / Médicos' },
                    { id: 'commerce', label: 'Comércio / E-commerce' }
                  ].map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSegmento(s.id as any)}
                      className={`p-2 rounded-xl text-left border transition ${
                        segmento === s.id
                          ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 font-bold'
                          : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Simulation Result Box */}
              <div className="p-4 bg-gradient-to-br from-emerald-950/40 via-stone-900 to-stone-950 border border-emerald-500/30 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">Estimativa de Imposto sem Otimização:</span>
                  <span className="text-rose-400 line-through">R$ {estimatedTaxNoStrategy.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-300 font-bold">Com Planejamento Vektor (Fator R / Enquadramento):</span>
                  <span className="text-emerald-300 font-bold">R$ {estimatedTaxWithVektor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</span>
                </div>

                <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block">Economia Anual Estimada:</span>
                    <span className="text-xl font-serif text-emerald-400 font-bold">
                      R$ {annualSavings.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}/ano
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab('diagnostico')}
                    className="px-3.5 py-2 bg-emerald-400 text-stone-950 text-[10px] font-mono uppercase font-bold rounded-xl hover:bg-emerald-300 transition"
                  >
                    Garantir Economia →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proof Banner Bar */}
      <div className="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs text-stone-300">
        <div className="space-y-1">
          <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-lg font-serif">
            <Building2 className="w-5 h-5" />
            <span>+1.200</span>
          </div>
          <span className="text-stone-400 text-[11px] block">Empresas Atendidas no Brasil</span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-lg font-serif">
            <TrendingUp className="w-5 h-5" />
            <span>R$ 14.8M+</span>
          </div>
          <span className="text-stone-400 text-[11px] block">Economizados em Tributos (2025)</span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-lg font-serif">
            <Clock className="w-5 h-5" />
            <span>3 Min</span>
          </div>
          <span className="text-stone-400 text-[11px] block">Tempo Médio de Resposta no Whats</span>
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-lg font-serif">
            <Award className="w-5 h-5" />
            <span>99.2%</span>
          </div>
          <span className="text-stone-400 text-[11px] block">Índice de Retenção de Clientes</span>
        </div>
      </div>
    </div>
  );
};
