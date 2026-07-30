import React, { FC, useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, AlertCircle, FileText } from 'lucide-react';
import { MORTGAGE_FAQS } from '../../data/creditoImobiliarioData';

export const MortgageFaqSection: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="space-y-8 animate-fade-in">
      
      {/* FAQ Header */}
      <div className="bg-[#141514] border border-stone-800 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Dúvidas & Respostas Frequentes</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
            Tudo o que você precisa saber sobre <span className="italic font-normal text-emerald-400">Financiamento Imobiliário</span>
          </h2>

          <p className="font-serif text-stone-300 text-sm sm:text-base leading-relaxed">
            Esclareça suas dúvidas técnicas e financeiras antes de solicitar a aprovação oficial de crédito.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 pt-4">
          {MORTGAGE_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-stone-950 border border-stone-800 hover:border-emerald-500/40 rounded-2xl transition overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between space-x-4 focus:outline-none"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-white">
                    {faq.q}
                  </span>
                  <div className="p-1.5 bg-stone-900 border border-stone-800 rounded-xl text-emerald-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-stone-850 font-mono text-xs sm:text-sm text-stone-300 leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legal & LGPD Disclaimers Notice Box */}
      <div className="p-6 bg-stone-950/80 border border-stone-800 rounded-3xl space-y-3 font-mono text-xs text-stone-400">
        <div className="flex items-center space-x-2 text-stone-200 font-bold">
          <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Aviso Legal e Transparência Regulatória (BACEN & LGPD)</span>
        </div>
        <p className="leading-relaxed">
          As informações apresentadas nesta plataforma são simulações estimativas baseadas nos parâmetros fornecidos pelo usuário e nas taxas de juros padrão cadastradas para cada instituição parceira. A aprovação final de crédito, as taxas efetivas, valores de seguros obrigatórios (MIP/DFI), tarifas de vistoria e condições contratuais definitivas dependem exclusivamente da análise de crédito formal e do cumprimento das regras regulatórias vigentes em cada banco. Esta simulação não constitui proposta vinculante nem garantia de aprovação de financiamento.
        </p>
      </div>

    </section>
  );
};
