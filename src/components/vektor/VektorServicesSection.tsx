import React, { useState } from 'react';
import { VektorService, VektorTab } from '../../types/vektor';
import { 
  BarChart3, 
  ShieldCheck, 
  Wallet, 
  Building2, 
  Users, 
  FileText, 
  Check, 
  ArrowRight, 
  X, 
  Sparkles, 
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';

interface VektorServicesSectionProps {
  services: VektorService[];
  setActiveTab: (tab: VektorTab) => void;
}

export const VektorServicesSection: React.FC<VektorServicesSectionProps> = ({ 
  services, 
  setActiveTab 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalService, setActiveModalService] = useState<VektorService | null>(null);

  // Helper function to render correct Lucide icon
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'Wallet': return <Wallet className="w-6 h-6 text-emerald-400" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-emerald-400" />;
      case 'Users': return <Users className="w-6 h-6 text-emerald-400" />;
      case 'FileText': return <FileText className="w-6 h-6 text-emerald-400" />;
      default: return <BarChart3 className="w-6 h-6 text-emerald-400" />;
    }
  };

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-stone-800 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Soluções Contábeis & Financeiras</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-100">
            Serviços desenhados para <span className="italic font-normal text-emerald-400">impulsionar sua empresa.</span>
          </h2>
          <p className="text-xs text-stone-400 font-serif leading-relaxed">
            Elimine processos manuais e tenha a tranquilidade de uma equipe multidisciplinar cuidando das suas áreas fiscal, financeira, trabalhista e societária.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {[
            { id: 'all', label: 'Todos os Serviços' },
            { id: 'contabil', label: 'Contábil' },
            { id: 'tributario', label: 'Tributário' },
            { id: 'financeiro', label: 'BPO Financeiro' },
            { id: 'trabalhista', label: 'Folha & DP' },
            { id: 'societario', label: 'Abertura & Societário' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl border transition ${
                selectedCategory === cat.id
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50 font-bold'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <div 
            key={service.id}
            className={`bg-[#181918] border rounded-3xl p-6 hover:border-emerald-500/50 transition duration-300 flex flex-col justify-between space-y-6 group relative overflow-hidden ${
              service.popular ? 'border-emerald-500/40 shadow-lg shadow-emerald-950/20' : 'border-stone-800'
            }`}
          >
            {service.popular && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-stone-950 font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                Mais Contratado
              </div>
            )}

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center group-hover:bg-emerald-950 group-hover:border-emerald-500/30 transition">
                {getIcon(service.iconName)}
              </div>

              <div>
                <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest block font-bold">
                  {service.category.toUpperCase()}
                </span>
                <h3 className="font-serif text-2xl text-stone-100 font-light mt-0.5 group-hover:text-emerald-300 transition">
                  {service.title}
                </h3>
              </div>

              <p className="text-xs text-stone-400 font-serif leading-relaxed">
                {service.shortDesc}
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-800">
                <span className="font-mono text-[10px] uppercase text-stone-400 block font-bold">Destaques Inclusos:</span>
                <ul className="space-y-1.5 text-xs font-sans text-stone-300">
                  {service.benefits.slice(0, 3).map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-tight text-[11px]">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-stone-500 uppercase block">Investimento a partir de:</span>
                <span className="font-mono text-sm font-bold text-emerald-400">{service.startingPrice}</span>
              </div>

              <button
                onClick={() => setActiveModalService(service)}
                className="px-4 py-2.5 bg-stone-900 hover:bg-emerald-400 text-stone-200 hover:text-stone-950 font-mono text-xs uppercase font-bold rounded-xl border border-stone-700 hover:border-emerald-400 transition flex items-center gap-1.5"
              >
                <span>Saber Mais</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Modal Drawer */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#181918] border border-stone-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 text-stone-100 max-h-[90vh] overflow-y-auto relative animate-scale-up shadow-2xl">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 p-1 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-widest">
                {activeModalService.category} • Detalhes da Solução
              </span>
              <h3 className="font-serif text-3xl font-light text-stone-100">{activeModalService.title}</h3>
              <p className="text-xs text-stone-300 font-serif leading-relaxed mt-2">{activeModalService.fullDesc}</p>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="font-mono text-xs text-stone-200 uppercase font-bold tracking-wider">Principais Benefícios para Sua Empresa:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans text-xs text-stone-300">
                {activeModalService.benefits.map((b, idx) => (
                  <div key={idx} className="p-3 bg-stone-900 border border-stone-800 rounded-xl flex items-start space-x-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-mono text-xs text-stone-200 uppercase font-bold tracking-wider">Entregáveis Oficiais Incluídos:</h4>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {activeModalService.deliverables.map((del, idx) => (
                  <span key={idx} className="px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 rounded-lg">
                    ✓ {del}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase block">INVESTIMENTO ESTIMADO</span>
                <span className="text-xl font-serif text-emerald-300 font-bold">{activeModalService.startingPrice}</span>
              </div>

              <button
                onClick={() => {
                  setActiveModalService(null);
                  setActiveTab('contato');
                }}
                className="w-full sm:w-auto px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Solicitar Proposta para Esta Solução</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
