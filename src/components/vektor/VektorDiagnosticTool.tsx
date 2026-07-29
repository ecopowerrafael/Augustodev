import React, { useState } from 'react';
import { VektorTab } from '../../types/vektor';
import { 
  Calculator, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  RefreshCw,
  Building2,
  DollarSign,
  UserCheck
} from 'lucide-react';

interface VektorDiagnosticToolProps {
  setActiveTab: (tab: VektorTab) => void;
}

export const VektorDiagnosticTool: React.FC<VektorDiagnosticToolProps> = ({ setActiveTab }) => {
  const [faturamentoNum, setFaturamentoNum] = useState<number>(80000);
  const [segmento, setSegmento] = useState<'tech' | 'servicos' | 'saude' | 'comercio'>('tech');
  const [regimeAtual, setRegimeAtual] = useState<'simples' | 'presumido' | 'real' | 'nao_sei'>('simples');
  const [funcionarios, setFuncionarios] = useState<'zero' | 'poucos' | 'medios' | 'muitos'>('poucos');
  
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [leadName, setLeadName] = useState<string>('');
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [leadPhone, setLeadPhone] = useState<string>('');

  // Diagnostic logic
  let taxRateCurrent = 0.155; // Default Anexo V rate
  if (regimeAtual === 'presumido') taxRateCurrent = 0.1633;
  if (regimeAtual === 'real') taxRateCurrent = 0.24;

  // Optimized rate with Vektor strategy (e.g. Fator R, Equiparação Hospitalar, or NCM ICMS)
  let taxRateOptimized = 0.06;
  if (segmento === 'saude') taxRateOptimized = 0.08;
  if (segmento === 'comercio') taxRateOptimized = 0.07;

  const currentMonthlyTax = faturamentoNum * taxRateCurrent;
  const optimizedMonthlyTax = faturamentoNum * taxRateOptimized;
  const monthlySavings = Math.max(0, currentMonthlyTax - optimizedMonthlyTax);
  const annualSavings = monthlySavings * 12;

  // Efficiency score
  const efficiencyScore = Math.min(98, Math.max(35, Math.round((optimizedMonthlyTax / currentMonthlyTax) * 100)));

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#141514] border border-stone-800 rounded-3xl p-6 sm:p-10 space-y-10 text-stone-100 shadow-2xl relative overflow-hidden">
      {/* Decorative Blur Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 font-mono text-xs uppercase tracking-widest">
          <Calculator className="w-3.5 h-3.5" />
          <span>Diagnóstico Tributário Gratuito</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-light">
          Descubra se sua empresa está <span className="italic font-normal text-emerald-400">pagando mais impostos do que deveria.</span>
        </h2>
        <p className="text-xs text-stone-400 font-serif leading-relaxed">
          Preencha os 4 parâmetros abaixo para receber um raio-x em tempo real da eficiência do seu enquadramento fiscal e estimativa de economia anual.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Controls (8 cols) */}
        <div className="lg:col-span-7 space-y-6 bg-stone-900/80 border border-stone-800 p-6 sm:p-8 rounded-3xl">
          {/* Step 1: Revenue Slider */}
          <div className="space-y-2">
            <label className="font-mono text-xs text-stone-300 uppercase font-bold flex justify-between">
              <span>1. Faturamento Mensal Médio:</span>
              <span className="text-emerald-400 font-bold">R$ {faturamentoNum.toLocaleString('pt-BR')} /mês</span>
            </label>
            <input 
              type="range" 
              min="15000" 
              max="500000" 
              step="5000"
              value={faturamentoNum}
              onChange={(e) => setFaturamentoNum(Number(e.target.value))}
              className="w-full accent-emerald-400 bg-stone-800 h-2.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[10px] text-stone-500">
              <span>R$ 15 mil</span>
              <span>R$ 250 mil</span>
              <span>R$ 500 mil+</span>
            </div>
          </div>

          {/* Step 2: Segment Choice */}
          <div className="space-y-2">
            <label className="font-mono text-xs text-stone-300 uppercase font-bold">
              2. Segmento da Empresa:
            </label>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {[
                { id: 'tech', label: 'Tecnologia / SaaS / Devs' },
                { id: 'servicos', label: 'Prestador de Serviço' },
                { id: 'saude', label: 'Saúde / Médicos / Clínicas' },
                { id: 'comercio', label: 'Comércio / E-commerce' }
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => setSegmento(s.id as any)}
                  className={`p-3 rounded-xl border text-left transition ${
                    segmento === s.id 
                      ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 font-bold' 
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Current Regime */}
          <div className="space-y-2">
            <label className="font-mono text-xs text-stone-300 uppercase font-bold">
              3. Regime Tributário Atual:
            </label>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {[
                { id: 'simples', label: 'Simples Nacional' },
                { id: 'presumido', label: 'Lucro Presumido' },
                { id: 'real', label: 'Lucro Real' },
                { id: 'nao_sei', label: 'Não Tenho Certeza' }
              ].map(r => (
                <button
                  key={r.id}
                  onClick={() => setRegimeAtual(r.id as any)}
                  className={`p-3 rounded-xl border text-left transition ${
                    regimeAtual === r.id 
                      ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 font-bold' 
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Employees */}
          <div className="space-y-2">
            <label className="font-mono text-xs text-stone-300 uppercase font-bold">
              4. Quadro de Colaboradores:
            </label>
            <div className="grid grid-cols-4 gap-2 font-mono text-xs">
              {[
                { id: 'zero', label: 'Apenas Sócios' },
                { id: 'poucos', label: '1 a 5' },
                { id: 'medios', label: '6 a 15' },
                { id: 'muitos', label: 'Acima de 15' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFuncionarios(f.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition ${
                    funcionarios === f.id 
                      ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 font-bold' 
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Results Panel (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-stone-900 to-stone-950 border border-emerald-500/30 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl relative">
          <div className="border-b border-stone-800 pb-4">
            <span className="font-mono text-[10px] text-emerald-400 uppercase font-bold tracking-widest block">
              Resultado da Auditoria Preliminar
            </span>
            <h3 className="font-serif text-2xl font-light text-stone-100 mt-1">
              Índice de Eficiência Fiscal
            </h3>
          </div>

          {/* Score Circle / Meter */}
          <div className="p-4 bg-stone-950 border border-stone-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-stone-400 uppercase block">SCORE DE OTIMIZAÇÃO</span>
              <span className="text-3xl font-serif text-amber-400 font-bold">{efficiencyScore}%</span>
              <span className="text-[11px] text-stone-400 font-sans block mt-0.5">Potencial substancial de melhoria tributária</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-mono font-bold">
              !
            </div>
          </div>

          {/* Savings Summary */}
          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl space-y-2">
              <span className="text-[10px] text-emerald-400 uppercase block font-bold">ECONOMIA ANUAL ESTIMADA COM VEKTOR:</span>
              <div className="text-3xl font-serif text-emerald-300 font-bold">
                R$ {annualSavings.toLocaleString('pt-BR', { maximumFractionDigits: 0 })} <span className="text-sm font-sans font-normal text-stone-300">/ ano</span>
              </div>
              <p className="text-[11px] text-stone-300 font-sans">
                Aproximadamente <strong className="text-emerald-300">R$ {monthlySavings.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}/mês</strong> que hoje podem estar sendo pagos indevidamente ao Fisco.
              </p>
            </div>

            {/* Action Points */}
            <div className="space-y-2">
              <span className="text-[10px] text-stone-400 uppercase font-bold block">Ações Recomendadas:</span>
              <ul className="space-y-1.5 text-xs font-sans text-stone-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Revisão do enquadramento do Fator R no eSocial</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Segregação das receitas isentas de PIS/COFINS e ISS</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Alinhamento de pró-labore x distribuição de lucros isentos</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Claim Full PDF Audit Form */}
          {!submitted ? (
            <form onSubmit={handleSubmitLead} className="space-y-3 pt-4 border-t border-stone-800">
              <span className="font-mono text-[11px] text-stone-300 font-bold block">
                Receba o Relatório Completo por E-mail & WhatsApp:
              </span>
              <input
                type="text"
                required
                placeholder="Seu Nome Completo"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl font-mono text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
              />
              <input
                type="email"
                required
                placeholder="Seu E-mail Corporativo"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl font-mono text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
              />
              <input
                type="tel"
                required
                placeholder="WhatsApp (DDD + Número)"
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-800 rounded-xl font-mono text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
              />

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-mono text-xs uppercase font-bold tracking-wider rounded-xl transition shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Solicitar Auditoria Gratuita</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="p-4 bg-emerald-950 border border-emerald-500/50 rounded-2xl space-y-2 text-center animate-fade-in">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="font-serif text-lg text-emerald-300 font-bold">Diagnóstico Enviado!</h4>
              <p className="text-xs text-stone-300 font-sans">
                Obrigado, <strong className="text-white">{leadName}</strong>. Em até 15 minutos um contador especialista em {segmento.toUpperCase()} enviará o relatório detalhado no seu WhatsApp.
              </p>
              <button
                onClick={() => setActiveTab('contato')}
                className="mt-2 text-xs font-mono text-emerald-400 hover:underline inline-block font-bold"
              >
                Falar com Especialista Agora →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
