import React, { useState } from 'react';
import { VektorTab } from '../../types/vektor';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  FileCheck2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface VektorAbrirEmpresaWizardProps {
  setActiveTab: (tab: VektorTab) => void;
}

export const VektorAbrirEmpresaWizard: React.FC<VektorAbrirEmpresaWizardProps> = ({ setActiveTab }) => {
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [companyType, setCompanyType] = useState<'slu' | 'ltda' | 'empresario'>('slu');
  const [estimatedRevenue, setEstimatedRevenue] = useState<string>('30k-100k');
  const [virtualAddress, setVirtualAddress] = useState<boolean>(true);
  const [stateUF, setStateUF] = useState<string>('SP');

  // Estimates calculation
  let boardFee = 240; // Junta Comercial SP estimate
  if (stateUF === 'RJ') boardFee = 380;
  if (stateUF === 'MG') boardFee = 210;

  const virtualAddressFee = virtualAddress ? 90 : 0;
  const totalGovFees = boardFee;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 font-mono text-xs uppercase tracking-widest">
          <Building2 className="w-3.5 h-3.5" />
          <span>Honorários de Abertura R$ 0</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-100">
          Abra seu CNPJ em tempo recorde <span className="italic font-normal text-emerald-400">100% digital e sem burocracia.</span>
        </h2>
        <p className="text-xs text-stone-400 font-serif leading-relaxed">
          Nossa equipe de especialistas societários cuida de todo o processo legal, escolha estratégica de CNAEs e enquadramento tributário para você começar a faturar no menor tempo possível.
        </p>
      </div>

      {/* Main Wizard Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Wizard Controls (7 cols) */}
        <div className="lg:col-span-7 bg-[#181918] border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
          {/* Steps Progress Indicator */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-4 font-mono text-xs">
            {[1, 2, 3].map((step) => (
              <div 
                key={step} 
                onClick={() => setWizardStep(step)}
                className={`flex items-center space-x-2 cursor-pointer ${
                  wizardStep === step ? 'text-emerald-400 font-bold' : 'text-stone-500'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${
                  wizardStep === step ? 'bg-emerald-400 text-stone-950' : 'bg-stone-900 border border-stone-800'
                }`}>
                  {step}
                </div>
                <span className="hidden sm:inline">
                  {step === 1 && 'Estrutura Societária'}
                  {step === 2 && 'Porte & Endereço'}
                  {step === 3 && 'Resumo & Solicitação'}
                </span>
              </div>
            ))}
          </div>

          {/* Wizard Step 1 */}
          {wizardStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-2xl font-light text-stone-100">Qual o formato societário desejado?</h3>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { id: 'slu', label: 'SLU — Sociedade Limitada Unipessoal', desc: '1 único sócio. Patrimônio pessoal protegido, sem necessidade de capital social mínimo.' },
                  { id: 'ltda', label: 'LTDA — Sociedade Empresária Limitada', desc: '2 ou mais sócios. Proteção patrimonial, regras claras de divisão de cotas.' },
                  { id: 'empresario', label: 'Empresário Individual (EI)', desc: '1 titular sem separação total entre bens do sócio e da empresa.' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setCompanyType(type.id as any)}
                    className={`w-full p-4 rounded-2xl border text-left transition ${
                      companyType === type.id
                        ? 'bg-emerald-950/80 border-emerald-500/50 text-stone-100'
                        : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span className="font-bold text-emerald-300 block mb-1">{type.label}</span>
                    <span className="text-xs font-serif text-stone-400 block">{type.desc}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setWizardStep(2)}
                className="w-full py-3.5 bg-emerald-400 text-stone-950 font-mono text-xs uppercase font-bold tracking-wider rounded-xl hover:bg-emerald-300 transition flex items-center justify-center space-x-2"
              >
                <span>Próximo Passo (Porte & Endereço)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Wizard Step 2 */}
          {wizardStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-2xl font-light text-stone-100">Estimativa de Faturamento e Estado</h3>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-stone-300 uppercase font-bold block mb-2">Estado de Registro da Empresa (UF):</label>
                  <select
                    value={stateUF}
                    onChange={(e) => setStateUF(e.target.value)}
                    className="w-full p-3 bg-stone-900 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-emerald-500 font-mono"
                  >
                    <option value="SP">São Paulo (SP)</option>
                    <option value="RJ">Rio de Janeiro (RJ)</option>
                    <option value="MG">Minas Gerais (MG)</option>
                    <option value="PR">Paraná (PR)</option>
                    <option value="SC">Santa Catarina (SC)</option>
                    <option value="RS">Rio Grande do Sul (RS)</option>
                  </select>
                </div>

                <div>
                  <label className="text-stone-300 uppercase font-bold block mb-2">Endereço Fiscal Virtual Vektor:</label>
                  <button
                    onClick={() => setVirtualAddress(!virtualAddress)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                      virtualAddress ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300' : 'bg-stone-900 border-stone-800 text-stone-400'
                    }`}
                  >
                    <div>
                      <span className="font-bold block">Usar Sede Virtual Vektor em São Paulo/SP</span>
                      <span className="text-xs font-serif text-stone-400 block">Ideal para prestadores de serviço sem endereço comercial físico.</span>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded text-xs font-bold shrink-0">
                      {virtualAddress ? 'Ativo' : 'Não'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setWizardStep(1)}
                  className="w-1/3 py-3.5 bg-stone-900 border border-stone-700 text-stone-300 font-mono text-xs uppercase font-bold rounded-xl hover:bg-stone-800"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setWizardStep(3)}
                  className="w-2/3 py-3.5 bg-emerald-400 text-stone-950 font-mono text-xs uppercase font-bold tracking-wider rounded-xl hover:bg-emerald-300 transition flex items-center justify-center space-x-2"
                >
                  <span>Ver Orçamento Final</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Wizard Step 3 */}
          {wizardStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-2xl font-light text-stone-100">Pronto para dar o primeiro passo?</h3>

              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl space-y-3 font-mono text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>Honorários de Assessoria Vektor:</span>
                  <span className="text-emerald-400 font-bold">R$ 0,00 (Plano Anual)</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Taxas Públicas da Junta Comercial ({stateUF}):</span>
                  <span className="text-stone-200">~R$ {boardFee},00</span>
                </div>
                {virtualAddress && (
                  <div className="flex justify-between text-stone-300">
                    <span>Sede Virtual / Endereço Fiscal Vektor:</span>
                    <span className="text-stone-200">R$ {virtualAddressFee},00/mês</span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-800 flex justify-between text-sm font-bold">
                  <span className="text-white">Prazo Estimado de Abertura:</span>
                  <span className="text-emerald-400">3 a 5 Dias Úteis</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('contato')}
                className="w-full py-4 bg-emerald-400 text-stone-950 font-mono text-xs uppercase font-bold tracking-wider rounded-xl hover:bg-emerald-300 transition shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Solicitar Abertura sem Compromisso</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right Documents & Timeline Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-6 bg-stone-900/60 border border-stone-800 p-6 sm:p-8 rounded-3xl font-sans">
          <h3 className="font-serif text-2xl text-stone-100 font-light">Documentos Necessários:</h3>
          <ul className="space-y-3 text-xs text-stone-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>RG / CNH dos sócios com foto legível</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Comprovante de residência atualizado (últimos 90 dias)</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Inscrição imobiliária (carnê IPTU) do local ou Sede Virtual Vektor</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Certificado Digital e-CPF para assinatura do contrato digital</span>
            </li>
          </ul>

          <div className="pt-4 border-t border-stone-800 space-y-3">
            <span className="font-mono text-xs text-emerald-400 uppercase font-bold block">
              Etapas do Processo Vektor:
            </span>
            <div className="space-y-2 font-mono text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] flex items-center justify-center font-bold">1</span>
                <span>Elaboração do Contrato Social com Cláusulas Proetoras</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] flex items-center justify-center font-bold">2</span>
                <span>Registro na Junta Comercial & Emissão do CNPJ</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] flex items-center justify-center font-bold">3</span>
                <span>Inscrição Municipal / Estadual & Habilitação da NFSe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
