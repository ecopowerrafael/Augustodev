import React, { FC, useState } from 'react';
import { 
  Building2, 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  TrendingDown, 
  ShieldCheck, 
  Percent, 
  Clock, 
  Sparkles,
  Zap
} from 'lucide-react';
import { formatCurrency } from '../../utils/mortgageCalculations';
import { SimulationInput } from '../../types/creditoImobiliario';

interface MortgageHeroBannerProps {
  simulationInput: SimulationInput;
  setSimulationInput: React.Dispatch<React.SetStateAction<SimulationInput>>;
  onStartSimulation: () => void;
}

export const MortgageHeroBanner: FC<MortgageHeroBannerProps> = ({
  simulationInput,
  setSimulationInput,
  onStartSimulation
}) => {
  const [quickPropertyValue, setQuickPropertyValue] = useState<number>(
    simulationInput.property.propertyValue
  );
  const [quickDownPayment, setQuickDownPayment] = useState<number>(
    simulationInput.property.downPayment
  );
  const [quickTermYears, setQuickTermYears] = useState<number>(
    simulationInput.preferences.desiredTermMonths / 12
  );

  const quickLoan = Math.max(0, quickPropertyValue - quickDownPayment);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSimulationInput(prev => ({
      ...prev,
      property: {
        ...prev.property,
        propertyValue: quickPropertyValue,
        downPayment: quickDownPayment
      },
      preferences: {
        ...prev.preferences,
        desiredTermMonths: quickTermYears * 12
      }
    }));
    onStartSimulation();
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 border border-stone-800 p-6 sm:p-10 lg:p-12 shadow-2xl">
      {/* Glow Effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Left Column: Headlines & Benefits */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-xs font-bold text-emerald-300 uppercase tracking-wider">
              Simulação Multibancos em Tempo Real
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.15]">
            Compare seu financiamento imobiliário em <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">vários bancos</span> em poucos minutos.
          </h1>

          <p className="text-stone-300 font-serif text-base sm:text-lg leading-relaxed max-w-2xl">
            Simule simultaneamente as condições das tabelas <strong className="text-white">SAC</strong> e <strong className="text-white">Price</strong> nas principais instituições bancárias e descubra qual oferece a menor taxa e a parcela ideal para seu orçamento.
          </p>

          {/* Benefits Bullet Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className="flex items-center space-x-2 text-stone-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Comparativo de 4 Bancos Líderes</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cálculo simultâneo de SAC & Price</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Estimativa de Custo Efetivo (CET)</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Grátis e sem compromisso</span>
            </div>
          </div>

          {/* Bank Logos Preview */}
          <div className="pt-4 border-t border-stone-800/80">
            <span className="font-mono text-[11px] text-stone-400 uppercase tracking-wider block mb-3 font-semibold">
              Instituições Comparadas no Protótipo:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1.5 bg-blue-950/60 border border-blue-500/30 text-sky-300 font-mono text-xs font-bold rounded-xl flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>Caixa Econômica</span>
              </span>
              <span className="px-3 py-1.5 bg-amber-950/60 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold rounded-xl flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Banco Itaú</span>
              </span>
              <span className="px-3 py-1.5 bg-rose-950/60 border border-rose-500/30 text-rose-300 font-mono text-xs font-bold rounded-xl flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                <span>Bradesco</span>
              </span>
              <span className="px-3 py-1.5 bg-red-950/60 border border-red-500/30 text-red-300 font-mono text-xs font-bold rounded-xl flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                <span>Santander</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Interactive Mortgage Calculator Card */}
        <div className="lg:col-span-5">
          <div className="bg-stone-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6 relative group hover:border-emerald-500/50 transition duration-300">
            
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg text-white">Simulador Rápido</h2>
                  <p className="font-mono text-xs text-stone-400">Insira os valores iniciais do imóvel</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-400 text-stone-950 font-mono text-[10px] font-bold uppercase rounded-lg">
                100% Gratuito
              </span>
            </div>

            <form onSubmit={handleQuickSubmit} className="space-y-4">
              
              {/* Property Value */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-mono text-xs text-stone-300 font-medium">Valor do Imóvel</label>
                  <span className="font-mono text-sm font-bold text-emerald-400">{formatCurrency(quickPropertyValue)}</span>
                </div>
                <input 
                  type="range"
                  min={150000}
                  max={3000000}
                  step={25000}
                  value={quickPropertyValue}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setQuickPropertyValue(val);
                    if (quickDownPayment > val * 0.8) {
                      setQuickDownPayment(val * 0.2);
                    }
                  }}
                  className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-mono text-xs text-stone-300 font-medium">
                    Valor da Entrada <span className="text-stone-500 text-[10px]">({Math.round((quickDownPayment / quickPropertyValue) * 100)}%)</span>
                  </label>
                  <span className="font-mono text-sm font-bold text-emerald-400">{formatCurrency(quickDownPayment)}</span>
                </div>
                <input 
                  type="range"
                  min={quickPropertyValue * 0.1}
                  max={quickPropertyValue * 0.7}
                  step={10000}
                  value={quickDownPayment}
                  onChange={(e) => setQuickDownPayment(Number(e.target.value))}
                  className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* Amount to Finance Box */}
              <div className="p-3 bg-stone-950 border border-stone-800 rounded-2xl flex items-center justify-between font-mono text-xs">
                <span className="text-stone-400">Valor a Financiar:</span>
                <span className="text-white font-bold text-sm">{formatCurrency(quickLoan)}</span>
              </div>

              {/* Loan Term */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="font-mono text-xs text-stone-300 font-medium">Prazo em Anos</label>
                  <span className="font-mono text-sm font-bold text-emerald-400">{quickTermYears} anos ({quickTermYears * 12} meses)</span>
                </div>
                <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                  {[15, 20, 25, 30].map((years) => (
                    <button
                      key={years}
                      type="button"
                      onClick={() => setQuickTermYears(years)}
                      className={`py-2 rounded-xl font-bold border transition ${
                        quickTermYears === years
                          ? 'bg-emerald-400 text-stone-950 border-emerald-400 shadow-md'
                          : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {years} anos
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-stone-950 font-mono text-xs uppercase font-bold tracking-wider rounded-2xl shadow-xl transition transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Simular e Comparar Bancos</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>

            <div className="text-center font-mono text-[10px] text-stone-400">
              * Resultados em tempo real calculados nas tabelas SAC e Price.
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
