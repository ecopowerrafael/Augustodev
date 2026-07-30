import React, { FC } from 'react';
import { Building2, ShieldCheck, Heart, MessageCircle, ArrowUpRight } from 'lucide-react';

interface MortgageFooterProps {
  setActiveTab: (tab: string) => void;
}

export const MortgageFooter: FC<MortgageFooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-stone-950 border-t border-stone-800/80 pt-12 pb-8 mt-16 font-mono text-xs text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-stone-850 pb-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 p-0.5">
                <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center text-emerald-400 font-bold">
                  C
                </div>
              </div>
              <span className="font-serif font-bold text-lg text-white">CrediCompare</span>
            </div>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              Plataforma independente de simulação e comparação multibancos para financiamento imobiliário no Brasil.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <span className="text-white font-bold uppercase text-[11px] block">Navegação</span>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-emerald-400 transition">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('simular')} className="hover:text-emerald-400 transition">
                  Simulador Multibancos
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sac-price')} className="hover:text-emerald-400 transition">
                  Comparativo SAC vs Price
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('faq')} className="hover:text-emerald-400 transition">
                  Perguntas Frequentes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Bancos Parceiros */}
          <div className="space-y-2">
            <span className="text-white font-bold uppercase text-[11px] block">Instituições Bancárias</span>
            <ul className="space-y-1 text-[11px] text-stone-400">
              <li>Caixa Econômica Federal (104)</li>
              <li>Banco Itaú Unibanco (341)</li>
              <li>Banco Bradesco (237)</li>
              <li>Banco Santander Brasil (033)</li>
            </ul>
          </div>

          {/* Col 4: Contact & Security */}
          <div className="space-y-3">
            <span className="text-white font-bold uppercase text-[11px] block">Atendimento Especializado</span>
            <p className="text-[11px] text-stone-400">
              Fale diretamente com um correspondente bancário autorizado para dar entrada na sua documentação.
            </p>
            <a
              href="https://wa.me/5511999998888?text=Ol%C3%A1!%20Vim%20pelo%20CrediCompare%20e%20gostaria%20de%20atendimento."
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold rounded-xl border border-emerald-500/40 transition inline-flex items-center space-x-1.5 text-[11px]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp do Correspondente</span>
            </a>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <span>© 2026 CrediCompare Multibancos — Protótipo de Engenharia de Software. Todos os direitos reservados.</span>
          <span className="flex items-center space-x-1">
            <span>Desenvolvido com precisão financeira e rigor de UX</span>
          </span>
        </div>

      </div>
    </footer>
  );
};
