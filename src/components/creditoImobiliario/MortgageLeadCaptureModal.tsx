import React, { FC, useState } from 'react';
import { 
  Building2, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  TrendingDown, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  X
} from 'lucide-react';
import { SimulationInput, BankSimulationResult, LeadData } from '../../types/creditoImobiliario';
import { formatCurrency } from '../../utils/mortgageCalculations';

interface MortgageLeadCaptureModalProps {
  simulationInput: SimulationInput;
  results: BankSimulationResult[];
  isOpen: boolean;
  onClose: () => void;
  onUnlockResults: (lead: LeadData) => void;
}

export const MortgageLeadCaptureModal: FC<MortgageLeadCaptureModalProps> = ({
  simulationInput,
  results,
  isOpen,
  onClose,
  onUnlockResults
}) => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [bestContactTime, setBestContactTime] = useState<string>('Qualquer horário');
  const [consentLgpd, setConsentLgpd] = useState<boolean>(true);

  if (!isOpen) return null;

  const eligibleResults = results.filter(r => r.isEligible);
  const bestResult = eligibleResults[0] || results[0];

  const minInstallment = Math.min(...results.map(r => r.sac.firstInstallment));
  const minRate = Math.min(...results.map(r => r.bank.annualRate));
  const maxSavings = Math.max(...results.map(r => r.sacVsPriceSavings));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !consentLgpd) return;

    const newLead: LeadData = {
      id: `lead-${Date.now()}`,
      fullName,
      email,
      phone,
      city: simulationInput.property.city,
      state: simulationInput.property.state,
      bestContactTime,
      consentLgpd,
      createdAt: new Date().toISOString(),
      status: 'novo',
      simulationSummary: {
        propertyValue: simulationInput.property.propertyValue,
        downPayment: simulationInput.property.downPayment,
        loanAmount: simulationInput.property.propertyValue - simulationInput.property.downPayment,
        termMonths: simulationInput.preferences.desiredTermMonths,
        income: simulationInput.financial.familyIncome || simulationInput.financial.monthlyIncome,
        selectedBankId: bestResult?.bank.id,
        selectedBankName: bestResult?.bank.name,
        preferredSystem: simulationInput.preferences.preferredSystem === 'price' ? 'PRICE' : 'SAC',
        estimatedInstallment: bestResult ? bestResult.sac.firstInstallment : 0
      }
    };

    onUnlockResults(newLead);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#141514] border border-emerald-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-stone-400 hover:text-white rounded-xl bg-stone-900 border border-stone-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Teaser Header */}
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-xs font-bold text-emerald-300 uppercase tracking-wider">
              Simulação Concluída com Sucesso
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
            Liberar Comparativo Completo dos <span className="italic font-normal text-emerald-400">4 Bancos</span>
          </h2>
          <p className="font-mono text-xs text-stone-300 max-w-lg mx-auto">
            Preencha seus dados de contato abaixo para visualizar as parcelas detalhadas, taxas efetivas e tabelas de amortização completas.
          </p>
        </div>

        {/* Teaser Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 bg-stone-950 border border-stone-800 rounded-2xl text-center space-y-1">
            <span className="text-[10px] text-stone-400 uppercase font-bold block">Bancos Elegíveis</span>
            <span className="text-emerald-400 font-bold text-base">{eligibleResults.length} de {results.length} Bancos</span>
          </div>

          <div className="p-3 bg-stone-950 border border-stone-800 rounded-2xl text-center space-y-1">
            <span className="text-[10px] text-stone-400 uppercase font-bold block">Menor Parcela</span>
            <span className="text-white font-bold text-base">{formatCurrency(minInstallment)}</span>
          </div>

          <div className="p-3 bg-stone-950 border border-stone-800 rounded-2xl text-center space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-stone-400 uppercase font-bold block">Economia no SAC</span>
            <span className="text-emerald-300 font-bold text-base">Até {formatCurrency(maxSavings)}</span>
          </div>
        </div>

        {/* Lead Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="font-mono text-xs text-stone-300 font-medium flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>Nome Completo *</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Carlos Eduardo Silva"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-4 py-3 text-white font-mono text-xs focus:border-emerald-400 focus:outline-none"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-mono text-xs text-stone-300 font-medium flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>E-mail *</span>
              </label>
              <input
                type="email"
                required
                placeholder="carlos@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-4 py-3 text-white font-mono text-xs focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs text-stone-300 font-medium flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Telefone / WhatsApp *</span>
              </label>
              <input
                type="tel"
                required
                placeholder="(11) 99999-8888"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-4 py-3 text-white font-mono text-xs focus:border-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Contact Preference */}
          <div className="space-y-1">
            <label className="font-mono text-xs text-stone-300 font-medium flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Melhor Horário para Atendimento</span>
            </label>
            <select
              value={bestContactTime}
              onChange={(e) => setBestContactTime(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-4 py-2.5 text-white font-mono text-xs focus:border-emerald-400 focus:outline-none"
            >
              <option value="Qualquer horário">Qualquer horário</option>
              <option value="Manhã (8h às 12h)">Manhã (8h às 12h)</option>
              <option value="Tarde (12h às 18h)">Tarde (12h às 18h)</option>
              <option value="Noite (18h às 21h)">Noite (18h às 21h)</option>
            </select>
          </div>

          {/* LGPD Consent Checkbox */}
          <div className="flex items-start space-x-3 pt-2">
            <input
              type="checkbox"
              id="lgpd"
              checked={consentLgpd}
              onChange={(e) => setConsentLgpd(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-stone-700 bg-stone-950 text-emerald-400 focus:ring-emerald-400"
            />
            <label htmlFor="lgpd" className="font-mono text-[11px] text-stone-400 leading-tight">
              Concordo com os Termos de Uso e Política de Privacidade de acordo com a LGPD. Seus dados são confidenciais e utilizados apenas para gerar a simulação bancária.
            </label>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={!fullName || !email || !phone || !consentLgpd}
            className="w-full py-4 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 disabled:opacity-50 text-stone-950 font-mono text-xs uppercase font-bold tracking-wider rounded-2xl shadow-2xl transition flex items-center justify-center space-x-2"
          >
            <Lock className="w-4 h-4" />
            <span>Desbloquear Comparativo Completo</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        <p className="font-mono text-[10px] text-center text-stone-500">
          * A simulação é estimativa e gratuita. Não há cobrança nem consulta ao Serasa.
        </p>

      </div>
    </div>
  );
};
