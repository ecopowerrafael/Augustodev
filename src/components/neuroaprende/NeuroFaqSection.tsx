import React, { FC, useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, MessageCircle } from 'lucide-react';
import { NEURO_FAQS } from '../../data/neuroaprendeData';

export const NeuroFaqSection: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-white border border-sky-200 rounded-3xl p-6 sm:p-10 space-y-8 shadow-md relative overflow-hidden">
      
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-extrabold uppercase shadow-xs">
          <HelpCircle className="w-4 h-4 text-amber-600" />
          <span>Dúvidas Frequentes & Fundamentação</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
          Perguntas Frequentes de <span className="italic text-amber-600 font-extrabold">Pais e Educadores</span>
        </h2>
        <p className="text-xs font-semibold text-slate-600 leading-relaxed">
          Esclarecimentos sobre metodologia inclusiva, acessibilidade para TEA/TDAH e segurança de dados conforme a LGPD.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4 text-xs font-sans">
        {NEURO_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="bg-sky-50/40 border border-sky-100 rounded-2xl overflow-hidden transition shadow-xs"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left font-serif font-bold text-base text-slate-900 flex items-center justify-between gap-4 hover:text-amber-600 transition"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="p-5 pt-0 text-xs text-slate-700 leading-relaxed font-medium border-t border-sky-100 bg-white">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-5 bg-amber-50/60 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto text-xs font-sans shadow-xs">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
          <span className="text-slate-800 font-bold">Tem dúvidas específicas sobre licenças governamentais ou clínicas?</span>
        </div>

        <a
          href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20NeuroAprende."
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl transition shrink-0 flex items-center space-x-2 shadow-xs"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Falar com Pedagogo</span>
        </a>
      </div>

    </div>
  );
};
