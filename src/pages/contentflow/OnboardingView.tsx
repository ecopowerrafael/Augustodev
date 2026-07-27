import React, { useState } from 'react';
import { Layers, ArrowRight, ArrowLeft, Check, Sparkles, Building, Users, Workflow, CheckCircle } from 'lucide-react';

interface OnboardingViewProps {
  onComplete: () => void;
  isDarkMode: boolean;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  onComplete,
  isDarkMode,
}) => {
  const [step, setStep] = useState(1);

  // Form State
  const [orgName, setOrgName] = useState('Agência Norte Digital');
  const [ownerName, setOwnerName] = useState('Marina Costa');
  const [clientName, setClientName] = useState('Bella Cosméticos');
  const [segment, setSegment] = useState('Beleza e Cosméticos');

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 font-sans transition-colors ${
      isDarkMode ? 'bg-stone-950 text-stone-100' : 'bg-[#F6F7FB] text-stone-900'
    }`}>
      <div className="w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
        
        {/* Header Progress */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-[#6C4FF8] text-white flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm">ContentFlow Onboarding</span>
          </div>
          <span className="text-xs font-mono font-bold text-[#6C4FF8]">
            Etapa {step} de 5
          </span>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800">
          <div
            className="h-full bg-[#6C4FF8] transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Content Body */}
        <div className="p-8 space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center space-x-2 text-[#6C4FF8]">
                <Building className="w-5 h-5" />
                <h3 className="text-base font-bold">1. Dados da Organização</h3>
              </div>
              <p className="text-xs text-stone-500">Cadastre o nome da sua agência ou equipe de marketing.</p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-500 mb-1">Nome da Empresa / Agência</label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 mb-1">Nome do Responsável</label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-sm font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center space-x-2 text-[#6C4FF8]">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-base font-bold">2. Cadastrar Primeiro Cliente</h3>
              </div>
              <p className="text-xs text-stone-500">Adicione a primeira marca que você vai gerenciar no ContentFlow.</p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-500 mb-1">Nome da Marca do Cliente</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 mb-1">Segmento de Atuação</label>
                  <input
                    type="text"
                    value={segment}
                    onChange={(e) => setSegment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-sm font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center space-x-2 text-[#6C4FF8]">
                <Users className="w-5 h-5" />
                <h3 className="text-base font-bold">3. Equipe Inicial</h3>
              </div>
              <p className="text-xs text-stone-500">Convide os primeiros membros para colaborar na plataforma.</p>

              <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span>Marina Costa (Você)</span>
                  <span className="text-[#6C4FF8]">Proprietária</span>
                </div>
                <div className="flex items-center justify-between font-bold text-stone-500">
                  <span>Ana Souza (ana@agencianorte.com.br)</span>
                  <span>Copywriter</span>
                </div>
                <div className="flex items-center justify-between font-bold text-stone-500">
                  <span>Carlos Lima (carlos@agencianorte.com.br)</span>
                  <span>Designer</span>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center space-x-2 text-[#6C4FF8]">
                <Workflow className="w-5 h-5" />
                <h3 className="text-base font-bold">4. Fluxo de Produção Editorial</h3>
              </div>
              <p className="text-xs text-stone-500">Seu ambiente será configurado com estas etapas padrão:</p>

              <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold">
                <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800">1. Ideia</div>
                <div className="p-3 rounded-xl bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200">2. Em Produção</div>
                <div className="p-3 rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200">3. Revisão</div>
                <div className="p-3 rounded-xl bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200">4. Aprovação</div>
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">5. Publicado</div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 text-center py-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#22A06B] flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold">Sua Área de Trabalho está Pronta!</h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                A organização <strong>{orgName}</strong> e o cliente <strong>{clientName}</strong> foram criados com sucesso.
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
            {step > 1 && step < 5 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-500 flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl bg-[#6C4FF8] text-white font-bold text-xs shadow-md flex items-center space-x-2"
              >
                <span>Avançar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onComplete}
                className="w-full py-3 rounded-xl bg-[#6C4FF8] text-white font-bold text-xs shadow-lg shadow-purple-500/30 flex items-center justify-center space-x-2"
              >
                <span>Explorar Plataforma ContentFlow</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
