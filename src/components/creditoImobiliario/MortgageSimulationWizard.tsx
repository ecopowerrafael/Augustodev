import React, { FC, useState } from 'react';
import { 
  Building2, 
  DollarSign, 
  UserCheck, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  Calculator,
  HelpCircle,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { SimulationInput, PropertyType, UsageType, EmploymentType } from '../../types/creditoImobiliario';
import { formatCurrency } from '../../utils/mortgageCalculations';

interface MortgageSimulationWizardProps {
  simulationInput: SimulationInput;
  setSimulationInput: React.Dispatch<React.SetStateAction<SimulationInput>>;
  onCompleteWizard: () => void;
}

export const MortgageSimulationWizard: FC<MortgageSimulationWizardProps> = ({
  simulationInput,
  setSimulationInput,
  onCompleteWizard
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const loanAmount = Math.max(0, simulationInput.property.propertyValue - simulationInput.property.downPayment);
  const minDownPaymentAllowed = simulationInput.property.propertyValue * 0.2; // 20% default min

  // Step Validation checks
  const isStep1Valid = 
    simulationInput.property.propertyValue >= 100000 &&
    simulationInput.property.downPayment >= minDownPaymentAllowed &&
    loanAmount > 0;

  const isStep2Valid = 
    simulationInput.financial.monthlyIncome > 0 || simulationInput.financial.familyIncome > 0;

  const isStep3Valid = 
    simulationInput.personal.oldestAge >= 18 && simulationInput.personal.oldestAge <= 75;

  const isStep4Valid = 
    simulationInput.preferences.desiredTermMonths >= 60 && simulationInput.preferences.desiredTermMonths <= 420;

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    } else {
      onCompleteWizard();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="bg-[#141514] border border-stone-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
      
      {/* Wizard Header & Progress */}
      <div className="space-y-6 border-b border-stone-800 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                Etapa {currentStep} de 4
              </span>
              <span className="text-stone-600">•</span>
              <span className="font-mono text-xs text-stone-400">
                Formulário de Simulação Multibancos
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-white mt-1">
              {currentStep === 1 && '1. Dados do Imóvel'}
              {currentStep === 2 && '2. Dados Financeiros & Renda'}
              {currentStep === 3 && '3. Perfil Pessoal & Idade'}
              {currentStep === 4 && '4. Prazo & Preferências'}
            </h2>
          </div>

          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <button
                key={step}
                onClick={() => {
                  if (step < currentStep) setCurrentStep(step);
                }}
                disabled={step > currentStep}
                className={`w-9 h-9 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center ${
                  currentStep === step
                    ? 'bg-emerald-400 text-stone-950 shadow-lg shadow-emerald-950/50 scale-105'
                    : step < currentStep
                    ? 'bg-stone-900 text-emerald-400 border border-emerald-500/30'
                    : 'bg-stone-950 text-stone-600 border border-stone-850 cursor-not-allowed'
                }`}
              >
                {step < currentStep ? <Check className="w-4 h-4" /> : step}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-900 h-1.5 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: DADOS DO IMÓVEL */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Property Value */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-stone-300 font-medium flex justify-between">
                <span>Valor do Imóvel (R$)</span>
                <span className="text-emerald-400 font-bold">{formatCurrency(simulationInput.property.propertyValue)}</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-stone-500 font-mono text-sm">R$</span>
                <input
                  type="number"
                  min={100000}
                  max={5000000}
                  step={10000}
                  value={simulationInput.property.propertyValue}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSimulationInput(prev => ({
                      ...prev,
                      property: {
                        ...prev.property,
                        propertyValue: val
                      }
                    }));
                  }}
                  className="w-full bg-stone-950 border border-stone-800 rounded-2xl pl-12 pr-4 py-3 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Down Payment */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-stone-300 font-medium flex justify-between">
                <span>Valor da Entrada (Mínimo 20%: {formatCurrency(minDownPaymentAllowed)})</span>
                <span className="text-emerald-400 font-bold">{formatCurrency(simulationInput.property.downPayment)}</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-stone-500 font-mono text-sm">R$</span>
                <input
                  type="number"
                  min={minDownPaymentAllowed}
                  max={simulationInput.property.propertyValue * 0.8}
                  step={5000}
                  value={simulationInput.property.downPayment}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSimulationInput(prev => ({
                      ...prev,
                      property: {
                        ...prev.property,
                        downPayment: val
                      }
                    }));
                  }}
                  className="w-full bg-stone-950 border border-stone-800 rounded-2xl pl-12 pr-4 py-3 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none"
                />
              </div>
              {simulationInput.property.downPayment < minDownPaymentAllowed && (
                <p className="font-mono text-[11px] text-rose-400 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>A entrada mínima exigida pela maioria dos bancos é de 20%.</span>
                </p>
              )}
            </div>

          </div>

          {/* Calculated Loan Box */}
          <div className="p-4 bg-stone-950 border border-stone-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-stone-400 block">Valor Final a Financiar</span>
                <span className="text-white font-bold text-base sm:text-lg">{formatCurrency(loanAmount)}</span>
              </div>
            </div>
            <div className="text-right text-stone-400">
              Percentual Financiado: <strong className="text-emerald-400">{Math.round((loanAmount / simulationInput.property.propertyValue) * 100)}%</strong>
            </div>
          </div>

          {/* Property Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            
            {/* Property Condition */}
            <div className="space-y-2">
              <label className="text-stone-300 font-medium block">Condição do Imóvel</label>
              <div className="grid grid-cols-2 gap-2">
                {(['usado', 'novo'] as PropertyType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSimulationInput(prev => ({
                      ...prev,
                      property: { ...prev.property, propertyType: type }
                    }))}
                    className={`py-2.5 rounded-xl capitalize font-bold border transition ${
                      simulationInput.property.propertyType === type
                        ? 'bg-emerald-400 text-stone-950 border-emerald-400'
                        : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
                    }`}
                  >
                    Imóvel {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Usage Type */}
            <div className="space-y-2">
              <label className="text-stone-300 font-medium block">Finalidade do Imóvel</label>
              <div className="grid grid-cols-2 gap-2">
                {(['residencial', 'comercial'] as UsageType[]).map((usage) => (
                  <button
                    key={usage}
                    type="button"
                    onClick={() => setSimulationInput(prev => ({
                      ...prev,
                      property: { ...prev.property, usageType: usage }
                    }))}
                    className={`py-2.5 rounded-xl capitalize font-bold border transition ${
                      simulationInput.property.usageType === usage
                        ? 'bg-emerald-400 text-stone-950 border-emerald-400'
                        : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
                    }`}
                  >
                    {usage}
                  </button>
                ))}
              </div>
            </div>

            {/* City/State */}
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <label className="text-stone-300 font-medium block">Cidade / UF do Imóvel</label>
              <input
                type="text"
                placeholder="Ex: São Paulo - SP"
                value={`${simulationInput.property.city} - ${simulationInput.property.state}`}
                onChange={(e) => {
                  const parts = e.target.value.split('-');
                  setSimulationInput(prev => ({
                    ...prev,
                    property: {
                      ...prev.property,
                      city: parts[0]?.trim() || 'São Paulo',
                      state: parts[1]?.trim() || 'SP'
                    }
                  }));
                }}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:border-emerald-400 focus:outline-none"
              />
            </div>

          </div>

          {/* FGTS Switch */}
          <div className="p-4 bg-stone-950 border border-stone-800 rounded-2xl flex items-center justify-between font-mono text-xs">
            <div>
              <span className="text-white font-bold block">Pretende utilizar saldo do FGTS?</span>
              <span className="text-stone-400 text-[11px]">Pode ser usado para complementar a entrada ou abater o saldo devedor.</span>
            </div>
            <button
              type="button"
              onClick={() => setSimulationInput(prev => ({
                ...prev,
                property: { ...prev.property, useFgts: !prev.property.useFgts }
              }))}
              className={`px-4 py-2 rounded-xl font-bold border transition ${
                simulationInput.property.useFgts
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-stone-900 text-stone-400 border-stone-800'
              }`}
            >
              {simulationInput.property.useFgts ? 'Sim, utilizar FGTS' : 'Não utilizar'}
            </button>
          </div>

        </div>
      )}

      {/* STEP 2: DADOS FINANCEIROS & RENDA */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Monthly Income */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-stone-300 font-medium flex justify-between">
                <span>Renda Bruta Individual (R$)</span>
                <span className="text-emerald-400 font-bold">{formatCurrency(simulationInput.financial.monthlyIncome)}</span>
              </label>
              <input
                type="number"
                min={2000}
                max={200000}
                step={500}
                value={simulationInput.financial.monthlyIncome}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSimulationInput(prev => ({
                    ...prev,
                    financial: {
                      ...prev.financial,
                      monthlyIncome: val,
                      familyIncome: Math.max(val, prev.financial.familyIncome)
                    }
                  }));
                }}
                className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-4 py-3 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none"
              />
            </div>

            {/* Family Income Composition */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-stone-300 font-medium flex justify-between">
                <span>Renda Familiar Composta (R$)</span>
                <span className="text-emerald-400 font-bold">{formatCurrency(simulationInput.financial.familyIncome)}</span>
              </label>
              <input
                type="number"
                min={simulationInput.financial.monthlyIncome}
                max={300000}
                step={500}
                value={simulationInput.financial.familyIncome}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSimulationInput(prev => ({
                    ...prev,
                    financial: {
                      ...prev.financial,
                      familyIncome: val
                    }
                  }));
                }}
                className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-4 py-3 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none"
              />
            </div>

          </div>

          {/* Employment Type */}
          <div className="space-y-3 font-mono text-xs">
            <label className="text-stone-300 font-medium block">Tipo de Vínculo de Trabalho</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'clt', label: 'CLT (Carteira)' },
                { id: 'servidor', label: 'Servidor Público' },
                { id: 'empresario', label: 'Empresário / PJ' },
                { id: 'autonomo', label: 'Autônomo' },
                { id: 'aposentado', label: 'Aposentado' }
              ].map((emp) => (
                <button
                  key={emp.id}
                  type="button"
                  onClick={() => setSimulationInput(prev => ({
                    ...prev,
                    financial: {
                      ...prev.financial,
                      employmentType: emp.id as EmploymentType
                    }
                  }))}
                  className={`py-3 px-2 rounded-xl text-center font-bold border transition ${
                    simulationInput.financial.employmentType === emp.id
                      ? 'bg-emerald-400 text-stone-950 border-emerald-400 shadow-md'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
                  }`}
                >
                  {emp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Max Installment Capacity Callout */}
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl space-y-1 font-mono text-xs">
            <span className="text-emerald-400 font-bold block">Capacidade Estimada de Parcela (Limite de 30% da Renda):</span>
            <p className="text-stone-300">
              Sua parcela máxima permitida pelos bancos é de aproximadamente <strong className="text-white text-sm">{formatCurrency((simulationInput.financial.familyIncome || simulationInput.financial.monthlyIncome) * 0.3)} /mês</strong>.
            </p>
          </div>

        </div>
      )}

      {/* STEP 3: PERFIL PESSOAL & IDADE */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Oldest Applicant Age */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-stone-300 font-medium flex justify-between">
                <span>Idade do Participante mais Velho</span>
                <span className="text-emerald-400 font-bold">{simulationInput.personal.oldestAge} anos</span>
              </label>
              <input
                type="number"
                min={18}
                max={75}
                value={simulationInput.personal.oldestAge}
                onChange={(e) => {
                  const age = Number(e.target.value);
                  setSimulationInput(prev => ({
                    ...prev,
                    personal: {
                      ...prev.personal,
                      oldestAge: age
                    }
                  }));
                }}
                className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-4 py-3 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none"
              />
              <p className="font-mono text-[11px] text-stone-400">
                A idade máxima permitida na maioria dos bancos ao final do contrato é de 80 anos (Idade + Prazo ≤ 80).
              </p>
            </div>

            {/* Marital Status */}
            <div className="space-y-2">
              <label className="font-mono text-xs text-stone-300 font-medium block">Estado Civil</label>
              <select
                value={simulationInput.personal.maritalStatus}
                onChange={(e) => setSimulationInput(prev => ({
                  ...prev,
                  personal: {
                    ...prev.personal,
                    maritalStatus: e.target.value
                  }
                }))}
                className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-4 py-3 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none"
              >
                <option value="solteiro">Solteiro(a)</option>
                <option value="casado">Casado(a) / União Estável</option>
                <option value="divorciado">Divorciado(a)</option>
                <option value="viuvo">Viúvo(a)</option>
              </select>
            </div>

          </div>

          {/* Number of Participants */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-stone-950 border border-stone-800 rounded-2xl space-y-2">
              <label className="text-stone-300 font-medium block">Composição de Renda (Participantes)</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSimulationInput(prev => ({
                      ...prev,
                      personal: { ...prev.personal, numberOfApplicants: num }
                    }))}
                    className={`flex-1 py-2 rounded-xl font-bold border transition ${
                      simulationInput.personal.numberOfApplicants === num
                        ? 'bg-emerald-400 text-stone-950 border-emerald-400'
                        : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
                    }`}
                  >
                    {num} {num === 1 ? 'Pessoa' : 'Pessoas'}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-stone-950 border border-stone-800 rounded-2xl space-y-2">
              <label className="text-stone-300 font-medium block">Já possui outro imóvel residencial?</label>
              <div className="flex items-center space-x-2">
                {[
                  { val: false, label: 'Não (1º Imóvel)' },
                  { val: true, label: 'Sim' }
                ].map((item) => (
                  <button
                    key={String(item.val)}
                    type="button"
                    onClick={() => setSimulationInput(prev => ({
                      ...prev,
                      personal: { ...prev.personal, ownsOtherProperty: item.val }
                    }))}
                    className={`flex-1 py-2 rounded-xl font-bold border transition ${
                      simulationInput.personal.ownsOtherProperty === item.val
                        ? 'bg-emerald-400 text-stone-950 border-emerald-400'
                        : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* STEP 4: PRAZO & PREFERÊNCIAS */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Term Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-mono text-xs text-stone-300 font-medium">Prazo do Financiamento</label>
              <span className="font-mono text-sm font-bold text-emerald-400">
                {simulationInput.preferences.desiredTermMonths / 12} Anos ({simulationInput.preferences.desiredTermMonths} Meses)
              </span>
            </div>
            <input
              type="range"
              min={60}
              max={420}
              step={12}
              value={simulationInput.preferences.desiredTermMonths}
              onChange={(e) => {
                const months = Number(e.target.value);
                setSimulationInput(prev => ({
                  ...prev,
                  preferences: {
                    ...prev.preferences,
                    desiredTermMonths: months
                  }
                }));
              }}
              className="w-full h-2.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between font-mono text-[10px] text-stone-500">
              <span>5 Anos (60m)</span>
              <span>20 Anos (240m)</span>
              <span>35 Anos (420m)</span>
            </div>
          </div>

          {/* System Preference (SAC vs Price) */}
          <div className="space-y-3 font-mono text-xs">
            <label className="text-stone-300 font-medium block">Preferência de Tabela Amortizadora</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'sac', title: 'Sistema SAC', desc: 'Parcelas decrescentes (começa maior, diminui todo mês)' },
                { id: 'price', title: 'Tabela Price', desc: 'Parcelas fixas (mesmo valor do início ao fim)' },
                { id: 'both', title: 'Ambos (Comparar)', desc: 'Comparar simultaneamente os dois sistemas' }
              ].map((sys) => (
                <button
                  key={sys.id}
                  type="button"
                  onClick={() => setSimulationInput(prev => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      preferredSystem: sys.id as 'sac' | 'price' | 'both'
                    }
                  }))}
                  className={`p-4 rounded-2xl text-left border transition ${
                    simulationInput.preferences.preferredSystem === sys.id
                      ? 'bg-emerald-500/10 border-emerald-400 text-white'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  <span className="font-bold text-sm block mb-1">{sys.title}</span>
                  <span className="text-[11px] text-stone-400 leading-tight block">{sys.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-3 font-mono text-xs">
            <label className="text-stone-300 font-medium block">Qual a sua prioridade principal?</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'lower_installment', label: 'Menor Parcela Inicial' },
                { id: 'lower_total_cost', label: 'Menor Custo Total de Juros' },
                { id: 'lower_rate', label: 'Menor Taxa de Juros Anual' }
              ].map((prio) => (
                <button
                  key={prio.id}
                  type="button"
                  onClick={() => setSimulationInput(prev => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      priority: prio.id as any
                    }
                  }))}
                  className={`py-3 px-3 rounded-xl font-bold border text-center transition ${
                    simulationInput.preferences.priority === prio.id
                      ? 'bg-emerald-400 text-stone-950 border-emerald-400'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
                  }`}
                >
                  {prio.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-stone-800 pt-6">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handlePrev}
            className="px-5 py-3 bg-stone-900 hover:bg-stone-850 text-stone-300 font-mono text-xs uppercase font-bold rounded-2xl border border-stone-800 transition flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>
        ) : <div />}

        <button
          type="button"
          onClick={handleNext}
          disabled={
            (currentStep === 1 && !isStep1Valid) ||
            (currentStep === 2 && !isStep2Valid) ||
            (currentStep === 3 && !isStep3Valid) ||
            (currentStep === 4 && !isStep4Valid)
          }
          className="px-8 py-3.5 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-stone-950 font-mono text-xs uppercase font-bold tracking-wider rounded-2xl shadow-xl transition flex items-center space-x-2"
        >
          <span>{currentStep === 4 ? 'Gerar Resultado Multibancos' : 'Próxima Etapa'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
