import React, { FC } from 'react';
import { MessageSquare } from 'lucide-react';

export const MortgageWhatsAppFloat: FC = () => {
  return (
    <a
      href="https://wa.me/5511999998888?text=Ol%C3%A1!%20Vim%20pelo%20simulador%20imobili%C3%A1rio%20e%20gostaria%20de%20falar%20com%20um%20especialista%20em%20cr%C3%A9dito."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 p-3.5 pr-5 rounded-2xl shadow-2xl transition duration-300 transform hover:scale-105 border border-emerald-300/40"
      aria-label="Falar no WhatsApp"
    >
      <div className="relative">
        <MessageSquare className="w-6 h-6 fill-stone-950 stroke-emerald-400" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 rounded-full border-2 border-stone-950 animate-ping" />
      </div>

      <div className="font-mono text-left">
        <span className="text-[9px] uppercase tracking-wider block font-bold text-stone-950/80 leading-none">
          Especialista Online
        </span>
        <span className="text-xs font-bold font-sans block leading-tight">
          Falar no WhatsApp
        </span>
      </div>
    </a>
  );
};
