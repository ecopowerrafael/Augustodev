import React from 'react';
import { Layers, CheckCircle, Sparkles, Shield, Zap } from 'lucide-react';
import { SaaSPlan } from '../../types/contentflow';

interface PlansViewProps {
  plans: SaaSPlan[];
  isDarkMode: boolean;
}

export const PlansView: React.FC<PlansViewProps> = ({ plans, isDarkMode }) => {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-200 text-[10px] font-extrabold uppercase">
          PLANOS & ASSINATURA COMMERCIAL
        </span>
        <h1 className="text-2xl font-bold">Escolha o Plano Ideal para a sua Operação</h1>
        <p className="text-xs text-stone-500">Evolua conforme o número de clientes e a complexidade do seu time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`p-6 rounded-3xl border space-y-6 flex flex-col justify-between relative transition-all ${
              plan.isPopular
                ? 'border-[#6C4FF8] ring-2 ring-purple-500/30 bg-purple-50/20 dark:bg-purple-950/20 shadow-xl'
                : isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
            }`}
          >
            {plan.isPopular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#6C4FF8] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                Mais Popular
              </span>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg text-stone-900 dark:text-white">{plan.name}</h3>
                <p className="text-xs text-stone-500 mt-0.5">{plan.description}</p>
              </div>

              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-black text-stone-900 dark:text-white">R$ {plan.priceMonthly}</span>
                <span className="text-xs text-stone-400 font-bold">/ mês</span>
              </div>

              <div className="space-y-2 text-xs pt-2 border-t border-stone-100 dark:border-stone-800">
                {plan.features.map((ft, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-stone-700 dark:text-stone-300">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{ft}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                plan.isPopular
                  ? 'bg-[#6C4FF8] hover:bg-[#5a3ee3] text-white shadow-lg shadow-purple-500/25'
                  : 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-900 dark:text-white'
              }`}
            >
              {plan.id === 'agencia' ? 'Seu Plano Atual' : 'Migrar para este Plano'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
