import React, { FC, useState } from 'react';
import { 
  TrendingDown, 
  TrendingUp, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Sparkles,
  Calculator
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { formatCurrency } from '../../utils/mortgageCalculations';

export const MortgageSacVsPriceSection: FC = () => {
  const [sampleLoan, setSampleLoan] = useState<number>(400000);
  const [sampleYears, setSampleYears] = useState<number>(30);
  const [annualRate, setAnnualRate] = useState<number>(10.0);

  // Generate comparative sample data over time
  const sampleData = [];
  const termMonths = sampleYears * 12;
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  const fixedAmortization = sampleLoan / termMonths;

  // Price PMT
  const pmtFactor = Math.pow(1 + monthlyRate, termMonths);
  const pricePmt = sampleLoan * ((monthlyRate * pmtFactor) / (pmtFactor - 1));

  let sacBalance = sampleLoan;
  let priceBalance = sampleLoan;

  for (let m = 1; m <= termMonths; m += 12) {
    const year = Math.ceil(m / 12);
    
    // SAC installment at month m
    const sacInterest = sacBalance * monthlyRate;
    const sacInstallment = fixedAmortization + sacInterest;
    
    sampleData.push({
      year: `Ano ${year}`,
      "Parcela SAC": Math.round(sacInstallment),
      "Parcela Price": Math.round(pricePmt),
      "Saldo Devedor SAC": Math.round(sacBalance),
      "Saldo Devedor Price": Math.round(priceBalance)
    });

    sacBalance -= fixedAmortization * 12;
    // Price balance reduction over 12 months
    for (let i = 0; i < 12; i++) {
      const pInt = priceBalance * monthlyRate;
      const pAmort = pricePmt - pInt;
      priceBalance = Math.max(0, priceBalance - pAmort);
    }
  }

  return (
    <section className="bg-[#141514] border border-stone-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
      
      {/* Glow Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Guia Prático e Educativo</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
          Entenda a diferença entre a <span className="italic font-normal text-emerald-400">Tabela SAC</span> e a <span className="italic font-normal text-teal-400">Tabela Price</span>
        </h2>

        <p className="font-serif text-stone-300 text-sm sm:text-base leading-relaxed">
          Escolher a tabela certa pode gerar uma economia de dezenas de milhares de reais ao longo do financiamento.
        </p>
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* SAC Card */}
        <div className="p-6 bg-stone-950 border border-emerald-500/30 rounded-3xl space-y-4 relative group hover:border-emerald-500/50 transition">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                <TrendingDown className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-xl text-white">Sistema SAC</h3>
            </div>
            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-mono font-bold uppercase">
              Parcelas Decrescentes
            </span>
          </div>

          <p className="font-mono text-xs text-stone-300 leading-relaxed">
            No SAC (Sistema de Amortização Constante), você abate o mesmo valor principal do imóvel todos os meses.
          </p>

          <ul className="space-y-2 font-mono text-xs text-stone-300">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Parcelas começam maiores</strong> e diminuem gradativamente a cada mês.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Menor custo total de juros</strong> ao longo dos 30 ou 35 anos.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Redução acelerada do saldo devedor principal.</span>
            </li>
          </ul>
        </div>

        {/* PRICE Card */}
        <div className="p-6 bg-stone-950 border border-teal-500/30 rounded-3xl space-y-4 relative group hover:border-teal-500/50 transition">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-xl text-white">Tabela Price</h3>
            </div>
            <span className="px-2.5 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/30 rounded text-[10px] font-mono font-bold uppercase">
              Parcelas Fixas
            </span>
          </div>

          <p className="font-mono text-xs text-stone-300 leading-relaxed">
            Na Tabela Price (Sistema Francês), o valor da parcela mensal permanece idêntico durante todo o financiamento.
          </p>

          <ul className="space-y-2 font-mono text-xs text-stone-300">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span><strong>Parcela inicial menor</strong> que no SAC (ideal para adequação à renda).</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span><strong>Previsibilidade total</strong> do orçamento familiar mês a mês.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>Maior pagamento de juros no início do contrato.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Interactive Trajectory Graph */}
      <div className="p-6 bg-stone-950 border border-stone-850 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-white">Evolução das Parcelas no Tempo</h3>
            <p className="font-mono text-xs text-stone-400">Simulação demonstrativa para {formatCurrency(sampleLoan)} em {sampleYears} anos</p>
          </div>

          <div className="flex items-center space-x-4 font-mono text-xs">
            <div className="flex items-center space-x-2">
              <label className="text-stone-400">Financiado:</label>
              <select
                value={sampleLoan}
                onChange={(e) => setSampleLoan(Number(e.target.value))}
                className="bg-stone-900 border border-stone-800 rounded-xl px-3 py-1.5 text-white font-bold"
              >
                <option value={200000}>R$ 200.000</option>
                <option value={400000}>R$ 400.000</option>
                <option value={600000}>R$ 600.000</option>
                <option value={1000000}>R$ 1.000.000</option>
              </select>
            </div>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sampleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="year" stroke="#a8a29e" tick={{ fontSize: 11 }} />
              <YAxis stroke="#a8a29e" tick={{ fontSize: 10 }} tickFormatter={(val) => `R$${(val / 1000).toFixed(1)}k`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1c1917', borderColor: '#44403c', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                formatter={(val: any) => [formatCurrency(Number(val)), '']}
              />
              <Area type="monotone" dataKey="Parcela SAC" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2.5} />
              <Area type="monotone" dataKey="Parcela Price" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.15} strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </section>
  );
};
