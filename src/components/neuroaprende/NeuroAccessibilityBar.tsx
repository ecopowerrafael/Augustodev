import React, { FC } from 'react';
import { X, Settings, Eye, Volume2, Type, Clock, Sparkles } from 'lucide-react';
import { AccessibilitySettings } from '../../types/neuroaprende';

interface NeuroAccessibilityBarProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  setSettings: React.Dispatch<React.SetStateAction<AccessibilitySettings>>;
}

export const NeuroAccessibilityBar: FC<NeuroAccessibilityBarProps> = ({
  isOpen,
  onClose,
  settings,
  setSettings
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/50 backdrop-blur-xs animate-fade-in text-xs font-sans">
      <div className="bg-white border-l-2 border-amber-200 max-w-md w-full h-full p-6 space-y-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-emerald-600" />
            <h3 className="font-serif font-bold text-xl text-slate-900">Acessibilidade e Sensibilidade</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl border border-slate-200 shadow-xs">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-6 flex-1">
          
          {/* Option 1: Low Stimulus Mode */}
          <div className="p-4 bg-sky-50/60 border border-sky-100 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-amber-600" />
                <strong className="text-slate-900 font-bold">Modo Calmo (Baixo Estímulo)</strong>
              </div>
              <input
                type="checkbox"
                checked={settings.lowStimulusMode}
                onChange={(e) => setSettings(prev => ({ ...prev, lowStimulusMode: e.target.checked }))}
                className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
              />
            </div>
            <p className="text-slate-600 text-[11px] font-medium">
              Suaviza cores intensas, desativa animações rápidas e reduz distrações visuais para crianças hipersensíveis.
            </p>
          </div>

          {/* Option 2: Speech Rate */}
          <div className="p-4 bg-amber-50/60 border border-amber-100 rounded-2xl space-y-2">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-sky-600" />
              <strong className="text-slate-900 font-bold">Velocidade da Narração de Voz: {settings.speechRate}x</strong>
            </div>
            <input
              type="range"
              min="0.7"
              max="1.3"
              step="0.1"
              value={settings.speechRate}
              onChange={(e) => setSettings(prev => ({ ...prev, speechRate: parseFloat(e.target.value) }))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
              <span>0.7x (Devagar / Suave)</span>
              <span>1.0x (Padrão)</span>
              <span>1.3x (Rápido)</span>
            </div>
          </div>

          {/* Option 3: Unlimited Time */}
          <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <strong className="text-slate-900 font-bold">Tempo Ilimitado Sem Punição</strong>
              </div>
              <input
                type="checkbox"
                checked={settings.unlimitedTime}
                onChange={(e) => setSettings(prev => ({ ...prev, unlimitedTime: e.target.checked }))}
                className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
              />
            </div>
            <p className="text-slate-600 text-[11px] font-medium">
              Garante que nenhum contador regressivo ou alarme sonoro gere ansiedade no estudante.
            </p>
          </div>

        </div>

        {/* Close CTA */}
        <button
          onClick={onClose}
          className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold uppercase rounded-2xl shadow-md shadow-emerald-200 transition text-xs"
        >
          Salvar Preferências
        </button>

      </div>
    </div>
  );
};
