import React, { FC } from 'react';
import { Heart, Sparkles, Globe } from 'lucide-react';

export const NeuroFooter: FC = () => {
  return (
    <footer className="bg-sky-50 border-t border-sky-200 py-10 text-xs text-slate-600 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-sky-100 pb-6">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🦉</span>
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900">NeuroAprende Games</h3>
              <p className="text-[11px] font-semibold text-slate-500">Plataforma de Aprendizagem e Jogos Educativos Acessíveis</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1.5 rounded-full border border-amber-300">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Desenvolvido com foco em TEA, TDAH e Neurodivergência</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
          <p>© 2026 NeuroAprende. Protótipo para Portfólio de Augusto Dev.</p>
          
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-900 cursor-pointer transition">Termos de Uso</span>
            <span className="hover:text-slate-900 cursor-pointer transition">Privacidade & LGPD</span>
            <span className="hover:text-slate-900 cursor-pointer transition">Suporte Pedagógico</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
