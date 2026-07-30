import React, { FC, useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  FileSpreadsheet, 
  MessageCircle, 
  TrendingDown, 
  TrendingUp, 
  Award, 
  Sparkles, 
  Info, 
  DollarSign, 
  Percent, 
  Printer, 
  Share2, 
  BarChart3,
  Check
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, AreaChart, Area } from 'recharts';
import { BankSimulationResult, SimulationInput, AmortizationSystem } from '../../types/creditoImobiliario';
import { formatCurrency, formatCurrencyExact, formatPercent } from '../../utils/mortgageCalculations';

interface MortgageResultsComparisonProps {
  simulationInput: SimulationInput;
  results: BankSimulationResult[];
  onOpenAmortizationModal: (result: BankSimulationResult) => void;
  onEditSimulation: () => void;
}

export const MortgageResultsComparison: FC<MortgageResultsComparisonProps> = ({
  simulationInput,
  results,
  onOpenAmortizationModal,
  onEditSimulation
}) => {
  const [activeSystemView, setActiveSystemView] = useState<'sac' | 'price' | 'both'>('both');
  const [onlyEligible, setOnlyEligible] = useState<boolean>(false);

  const filteredResults = results.filter(r => (onlyEligible ? r.isEligible : true));

  // Prepare chart data for Total Cost & Total Interest
  const chartData = results.map(r => ({
    name: r.bank.shortName,
    "Custo Total SAC": Math.round(r.sac.totalPaid),
    "Custo Total Price": Math.round(r.price.totalPaid),
    "Juros SAC": Math.round(r.sac.totalInterest),
    "Juros Price": Math.round(r.price.totalInterest),
    "Parcela Inicial SAC": Math.round(r.sac.firstInstallment),
    "Parcela Price": Math.round(r.price.monthlyInstallment)
  }));

  // Best Result
  const eligible = results.filter(r => r.isEligible);
  const bestOption = eligible[0] || results[0];

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* Header Banner & Summary */}
      <div className="bg-[#141514] border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-800 pb-6">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-mono font-bold uppercase tracking-wider">
                Resultado Oficial
              </span>
              <span className="text-stone-500 font-mono text-xs">•</span>
              <span className="font-mono text-xs text-stone-400">
                {results.length} Instituições Analisadas
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-light text-white">
              Comparativo de Financiamento <span className="italic font-normal text-emerald-400">Multibancos</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onEditSimulation}
              className="px-4 py-2.5 bg-stone-900 hover:bg-stone-850 text-stone-300 font-mono text-xs uppercase font-bold rounded-xl border border-stone-800 transition"
            >
              Editar Dados da Simulação
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-stone-900 hover:bg-stone-850 text-stone-300 font-mono text-xs uppercase font-bold rounded-xl border border-stone-800 transition flex items-center space-x-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>

        {/* Input Overview Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 font-mono text-xs">
          <div className="p-3 bg-stone-950 border border-stone-850 rounded-2xl">
            <span className="text-stone-500 text-[10px] uppercase block">Valor Imóvel</span>
            <span className="text-white font-bold text-sm">{formatCurrency(simulationInput.property.propertyValue)}</span>
          </div>

          <div className="p-3 bg-stone-950 border border-stone-850 rounded-2xl">
            <span className="text-stone-500 text-[10px] uppercase block">Valor Entrada</span>
            <span className="text-emerald-400 font-bold text-sm">{formatCurrency(simulationInput.property.downPayment)}</span>
          </div>

          <div className="p-3 bg-stone-950 border border-stone-850 rounded-2xl">
            <span className="text-stone-500 text-[10px] uppercase block">Valor Financiado</span>
            <span className="text-white font-bold text-sm">{formatCurrency(simulationInput.property.propertyValue - simulationInput.property.downPayment)}</span>
          </div>

          <div className="p-3 bg-stone-950 border border-stone-850 rounded-2xl">
            <span className="text-stone-500 text-[10px] uppercase block">Prazo Solicitado</span>
            <span className="text-white font-bold text-sm">{simulationInput.preferences.desiredTermMonths / 12} Anos ({simulationInput.preferences.desiredTermMonths}m)</span>
          </div>

          <div className="p-3 bg-stone-950 border border-stone-850 rounded-2xl col-span-2 sm:col-span-1">
            <span className="text-stone-500 text-[10px] uppercase block">Renda Familiar</span>
            <span className="text-emerald-300 font-bold text-sm">{formatCurrency(simulationInput.financial.familyIncome || simulationInput.financial.monthlyIncome)}</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-stone-800/80">
          
          {/* SAC vs Price Toggles */}
          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="text-stone-400 font-semibold mr-1">Tabela:</span>
            {[
              { id: 'both', label: 'Ver SAC & Price' },
              { id: 'sac', label: 'Apenas SAC' },
              { id: 'price', label: 'Apenas Price' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSystemView(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl font-bold transition border ${
                  activeSystemView === tab.id
                    ? 'bg-emerald-400 text-stone-950 border-emerald-400 shadow-md'
                    : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Only Eligible Toggle */}
          <button
            onClick={() => setOnlyEligible(!onlyEligible)}
            className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold border transition flex items-center space-x-2 ${
              onlyEligible
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Exibir apenas bancos 100% elegíveis</span>
          </button>

        </div>
      </div>

      {/* Multi-Bank Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredResults.map((result) => {
          const { bank, isEligible, ineligibilityReasons, highlights } = result;

          return (
            <div
              key={bank.id}
              className={`bg-[#141514] border rounded-3xl p-6 space-y-6 shadow-2xl relative flex flex-col justify-between transition duration-300 ${
                isEligible 
                  ? 'border-stone-800 hover:border-emerald-500/50' 
                  : 'border-rose-900/40 bg-stone-950/60 opacity-80'
              }`}
            >
              
              {/* Card Top Header & Brand */}
              <div className="space-y-4">
                
                {/* Highlights Badges */}
                {highlights.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-stone-950 font-mono text-[9px] font-bold uppercase rounded-md shadow-sm flex items-center space-x-1"
                      >
                        <Award className="w-3 h-3" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-2xl ${bank.logoBg} p-0.5 shadow-md flex items-center justify-center font-mono font-bold text-white text-sm shrink-0`}>
                      {bank.shortName.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-white leading-tight">
                        {bank.shortName}
                      </h3>
                      <span className="font-mono text-[10px] text-stone-400">
                        Código {bank.code}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    isEligible 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-rose-950 text-rose-300 border border-rose-500/30'
                  }`}>
                    {isEligible ? 'Elegível' : 'Atenção'}
                  </span>
                </div>

                {/* Interest Rate */}
                <div className="p-3 bg-stone-950 border border-stone-850 rounded-2xl flex items-center justify-between font-mono text-xs">
                  <span className="text-stone-400">Taxa Nominal a.a.:</span>
                  <span className="text-emerald-400 font-bold text-sm">{bank.annualRate.toFixed(2)}% a.a.</span>
                </div>

                {/* Ineligibility Warning if any */}
                {!isEligible && (
                  <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-2xl space-y-1 font-mono text-[11px] text-rose-300">
                    <div className="flex items-center space-x-1 font-bold">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>Condição de Alerta</span>
                    </div>
                    {ineligibilityReasons.map((reason, idx) => (
                      <p key={idx} className="text-stone-300 leading-tight">{reason}</p>
                    ))}
                  </div>
                )}

                {/* SAC Metrics Block */}
                {(activeSystemView === 'both' || activeSystemView === 'sac') && (
                  <div className="p-4 bg-stone-950/80 border border-stone-850 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center border-b border-stone-800/80 pb-2">
                      <span className="font-mono text-xs font-bold text-white flex items-center space-x-1">
                        <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Tabela SAC</span>
                      </span>
                      <span className="font-mono text-[10px] text-emerald-400">Decrescente</span>
                    </div>

                    <div className="space-y-1 font-mono text-xs">
                      <div className="flex justify-between text-stone-300">
                        <span>1ª Parcela Inicial:</span>
                        <strong className="text-white">{formatCurrencyExact(result.sac.firstInstallment)}</strong>
                      </div>
                      <div className="flex justify-between text-stone-400 text-[11px]">
                        <span>Última Parcela:</span>
                        <span>{formatCurrencyExact(result.sac.lastInstallment)}</span>
                      </div>
                      <div className="flex justify-between text-stone-400 text-[11px]">
                        <span>Total de Juros:</span>
                        <span>{formatCurrency(result.sac.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between text-stone-300 pt-1 border-t border-stone-850">
                        <span className="font-bold">Custo Total:</span>
                        <strong className="text-emerald-300">{formatCurrency(result.sac.totalPaid)}</strong>
                      </div>
                    </div>

                    {/* Income Commitment Bar */}
                    <div className="pt-2">
                      <div className="flex justify-between font-mono text-[10px] text-stone-400 mb-1">
                        <span>Comprometimento Renda:</span>
                        <span className={result.sac.incomeCommitmentPercent <= 30 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                          {result.sac.incomeCommitmentPercent.toFixed(1)}% (Máx {bank.maxIncomeCommitmentPercent}%)
                        </span>
                      </div>
                      <div className="w-full bg-stone-900 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${result.sac.incomeCommitmentPercent <= 30 ? 'bg-emerald-400' : 'bg-rose-500'}`}
                          style={{ width: `${Math.min(100, (result.sac.incomeCommitmentPercent / bank.maxIncomeCommitmentPercent) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PRICE Metrics Block */}
                {(activeSystemView === 'both' || activeSystemView === 'price') && (
                  <div className="p-4 bg-stone-950/80 border border-stone-850 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center border-b border-stone-800/80 pb-2">
                      <span className="font-mono text-xs font-bold text-white flex items-center space-x-1">
                        <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
                        <span>Tabela Price</span>
                      </span>
                      <span className="font-mono text-[10px] text-teal-400">Parcelas Fixas</span>
                    </div>

                    <div className="space-y-1 font-mono text-xs">
                      <div className="flex justify-between text-stone-300">
                        <span>Parcela Fixa Mensal:</span>
                        <strong className="text-white">{formatCurrencyExact(result.price.monthlyInstallment)}</strong>
                      </div>
                      <div className="flex justify-between text-stone-400 text-[11px]">
                        <span>Total de Juros:</span>
                        <span>{formatCurrency(result.price.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between text-stone-300 pt-1 border-t border-stone-850">
                        <span className="font-bold">Custo Total:</span>
                        <strong className="text-teal-300">{formatCurrency(result.price.totalPaid)}</strong>
                      </div>
                    </div>

                    {/* Income Commitment Bar */}
                    <div className="pt-2">
                      <div className="flex justify-between font-mono text-[10px] text-stone-400 mb-1">
                        <span>Comprometimento Renda:</span>
                        <span className={result.price.incomeCommitmentPercent <= 30 ? 'text-teal-400 font-bold' : 'text-rose-400 font-bold'}>
                          {result.price.incomeCommitmentPercent.toFixed(1)}% (Máx {bank.maxIncomeCommitmentPercent}%)
                        </span>
                      </div>
                      <div className="w-full bg-stone-900 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${result.price.incomeCommitmentPercent <= 30 ? 'bg-teal-400' : 'bg-rose-500'}`}
                          style={{ width: `${Math.min(100, (result.price.incomeCommitmentPercent / bank.maxIncomeCommitmentPercent) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-stone-850">
                <button
                  onClick={() => onOpenAmortizationModal(result)}
                  className="w-full py-2.5 bg-stone-900 hover:bg-stone-850 text-emerald-300 font-mono text-xs font-bold rounded-xl border border-stone-800 transition flex items-center justify-center space-x-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Ver Tabela Mês a Mês</span>
                </button>

                <a
                  href={`https://wa.me/5511999998888?text=Ol%C3%A1!%20Simulei%20no%20site%20e%20tenho%20interesse%20na%20proposta%20do%20${encodeURIComponent(bank.name)}%20(Valor%20Im%C3%B3vel:%20${encodeURIComponent(formatCurrency(simulationInput.property.propertyValue))},%20Entrada:%20${encodeURIComponent(formatCurrency(simulationInput.property.downPayment))}).`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-mono text-xs font-bold rounded-xl border border-emerald-500/40 transition flex items-center justify-center space-x-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Solicitar Atendimento</span>
                </a>
              </div>

            </div>
          );
        })}
      </div>

      {/* Visual Analytics & Comparison Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Total Cost Comparison Bar Chart */}
        <div className="bg-[#141514] border border-stone-800 rounded-3xl p-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <h3 className="font-serif font-bold text-lg text-white">Comparativo de Custo Total (R$)</h3>
            </div>
            <span className="font-mono text-[10px] text-stone-400">SAC vs Price</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="name" stroke="#a8a29e" tick={{ fontSize: 11 }} />
                <YAxis stroke="#a8a29e" tick={{ fontSize: 10 }} tickFormatter={(val) => `R$${(val / 1000).toFixed(0)}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c1917', borderColor: '#44403c', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                  formatter={(val: any) => [formatCurrency(Number(val)), '']}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="Custo Total SAC" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Custo Total Price" fill="#14b8a6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Interest Comparison Bar Chart */}
        <div className="bg-[#141514] border border-stone-800 rounded-3xl p-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <h3 className="font-serif font-bold text-lg text-white">Total Acumulado de Juros (R$)</h3>
            </div>
            <span className="font-mono text-[10px] text-stone-400">Comparação Financeira</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="name" stroke="#a8a29e" tick={{ fontSize: 11 }} />
                <YAxis stroke="#a8a29e" tick={{ fontSize: 10 }} tickFormatter={(val) => `R$${(val / 1000).toFixed(0)}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c1917', borderColor: '#44403c', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                  formatter={(val: any) => [formatCurrency(Number(val)), '']}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="Juros SAC" fill="#34d399" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Juros Price" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
