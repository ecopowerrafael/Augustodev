import React, { useState } from 'react';
import { VektorSector, VektorTab } from '../../types/vektor';
import { 
  Cpu, 
  Activity, 
  ShoppingBag, 
  Briefcase, 
  Check, 
  ArrowRight, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface VektorSectorsSectionProps {
  sectors: VektorSector[];
  setActiveTab: (tab: VektorTab) => void;
}

export const VektorSectorsSection: React.FC<VektorSectorsSectionProps> = ({ 
  sectors, 
  setActiveTab 
}) => {
  const [selectedSectorId, setSelectedSectorId] = useState<string>(sectors[0]?.id || 'tech-startups');

  const activeSector = sectors.find(s => s.id === selectedSectorId) || sectors[0];

  const getSectorIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-emerald-400" />;
      default: return <Cpu className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 font-mono text-xs uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Especialização por Nicho</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-100">
          Contabilidade feita sob medida para o <span className="italic font-normal text-emerald-400">seu modelo de negócio.</span>
        </h2>
        <p className="text-xs text-stone-400 font-serif leading-relaxed">
          Cada setor possui regras fiscais, benefícios estaduais e particularidades societárias únicas. Selecione seu nicho e veja nossas soluções dedicadas.
        </p>
      </div>

      {/* Sector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-800 pb-4 font-mono text-xs">
        {sectors.map(sector => (
          <button
            key={sector.id}
            onClick={() => setSelectedSectorId(sector.id)}
            className={`px-4 py-3 rounded-2xl border transition flex items-center space-x-2 ${
              selectedSectorId === sector.id
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50 font-bold shadow-lg'
                : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            {getSectorIcon(sector.iconName)}
            <span>{sector.name}</span>
          </button>
        ))}
      </div>

      {/* Active Sector Spotlight Card */}
      {activeSector && (
        <div className="bg-[#181918] border border-stone-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Description & Pain Points (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-widest block">
                  {activeSector.tagline}
                </span>
                <h3 className="font-serif text-3xl text-stone-100 font-light">{activeSector.name}</h3>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">{activeSector.description}</p>
              </div>

              {/* Dores Recorrentes Eliminadas */}
              <div className="space-y-3">
                <span className="font-mono text-xs text-rose-400 uppercase font-bold block">
                  Gargalos Fiscais do Setor Resolvidos pela Vektor:
                </span>
                <div className="space-y-2 font-sans text-xs text-stone-300">
                  {activeSector.keyPains.map((pain, idx) => (
                    <div key={idx} className="p-3 bg-stone-900/80 border border-stone-800 rounded-xl flex items-start space-x-2">
                      <span className="text-rose-400 font-bold shrink-0">✕</span>
                      <span>{pain}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soluções Exclusivas Vektor */}
              <div className="space-y-3">
                <span className="font-mono text-xs text-emerald-400 uppercase font-bold block">
                  Soluções Aplicadas na Prática:
                </span>
                <div className="space-y-2 font-sans text-xs text-stone-300">
                  {activeSector.solutions.map((sol, idx) => (
                    <div key={idx} className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-start space-x-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{sol}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase block">Regime Tributário Recomendado:</span>
                  <span className="font-mono text-xs text-emerald-300 font-bold">{activeSector.taxRegimeRecommendation}</span>
                </div>

                <button
                  onClick={() => setActiveTab('contato')}
                  className="px-5 py-3 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-mono text-xs uppercase font-bold rounded-xl transition shadow-lg flex items-center space-x-2"
                >
                  <span>Atendimento Especializado</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sector Image Banner (5 cols) */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-stone-800 h-80 lg:h-full min-h-[300px]">
              <img 
                src={activeSector.image} 
                alt={activeSector.name}
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-stone-950/80 backdrop-blur-md rounded-xl border border-stone-800 text-xs font-mono text-stone-300">
                <span className="text-emerald-400 font-bold block">★ Vektor Sector Intel</span>
                <span className="text-[11px] text-stone-400 font-serif">Equipe especializada exclusivamente nas regras e resoluções normativas deste nicho.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
