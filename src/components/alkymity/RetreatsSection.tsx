import React, { useState } from 'react';
import { RetreatItem, CertificationProgram, CartItem } from '../../types/alkymity';
import { Award, Calendar, MapPin, Check, ShieldCheck, ChevronRight, Users, Sparkles, X } from 'lucide-react';

interface RetreatsSectionProps {
  retreats: RetreatItem[];
  certifications: CertificationProgram[];
  onBookRetreat: (item: CartItem) => void;
}

export const RetreatsSection: React.FC<RetreatsSectionProps> = ({ 
  retreats, 
  certifications, 
  onBookRetreat 
}) => {
  const [activeRetreatModal, setActiveRetreatModal] = useState<RetreatItem | null>(null);
  const [activeCertModal, setActiveCertModal] = useState<CertificationProgram | null>(null);

  const handleBookRetreatItem = (retreat: RetreatItem) => {
    onBookRetreat({
      id: retreat.id,
      type: 'retreat',
      title: retreat.title,
      subtitle: `${retreat.dates} • ${retreat.location}`,
      price: retreat.price,
      quantity: 1,
      date: retreat.dates,
      image: retreat.image
    });
    setActiveRetreatModal(null);
  };

  const handleBookCertItem = (cert: CertificationProgram) => {
    onBookRetreat({
      id: cert.id,
      type: 'experience',
      title: cert.title,
      subtitle: `${cert.hours} • ${cert.modality}`,
      price: cert.investment,
      quantity: 1,
      date: cert.dates,
      image: cert.image
    });
    setActiveCertModal(null);
  };

  return (
    <div className="space-y-16">
      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 p-8 md:p-12 text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80" 
            alt="Alkymity Galápagos Retreats" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 font-mono text-xs uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" />
            <span>Imersões de Transformação em Galápagos</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-stone-100">
            Retiros & <span className="italic font-normal text-emerald-400">Certificações</span>
          </h1>
          <p className="text-stone-300 font-serif text-sm sm:text-base leading-relaxed">
            Desconecte-se da rotina e mergulhe em jornadas profundas de renovação corporal, respiração e formação internacional de instrutores no santuário ecológico de Galápagos.
          </p>
        </div>
      </div>

      {/* Retiros Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div>
            <h3 className="font-serif text-2xl text-stone-100 font-light">Retiros Exclusivos</h3>
            <p className="text-xs text-stone-400 font-mono mt-1">Imersões de 5 a 7 dias com hospedagem de luxo e pensão completa</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {retreats.map(ret => (
            <div 
              key={ret.id}
              className="bg-[#181918] border border-stone-800 rounded-3xl overflow-hidden hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-64 overflow-hidden bg-stone-900">
                <img 
                  src={ret.image} 
                  alt={ret.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181918] via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-full font-mono text-xs font-bold text-emerald-300 border border-emerald-500/30">
                  ${ret.price} USD / pessoa
                </div>
              </div>

              <div className="p-6 space-y-4 -mt-6 relative z-10 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 font-mono text-xs text-emerald-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ret.dates} ({ret.duration})</span>
                  </div>

                  <h4 className="font-serif text-2xl text-stone-100 font-light group-hover:text-emerald-300 transition">
                    {ret.title}
                  </h4>

                  <p className="text-xs text-stone-300 font-serif leading-relaxed">
                    {ret.subtitle}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="font-mono text-[10px] uppercase text-stone-500 block font-bold">Destaques da Imersão:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-sans text-stone-300">
                      {ret.highlights.slice(0, 4).map((h, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-rose-400 font-bold">
                    Apenas {ret.spotsRemaining} vagas disponíveis
                  </span>

                  <button
                    onClick={() => setActiveRetreatModal(ret)}
                    className="px-5 py-2.5 bg-emerald-950 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/80 font-mono text-xs uppercase tracking-wider font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <span>Ver Roteiro completo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificações de Instrutor */}
      <div className="space-y-6 pt-8 border-t border-stone-800">
        <div className="flex items-center justify-between pb-4">
          <div>
            <h3 className="font-serif text-2xl text-stone-100 font-light">Certificações Internacionais</h3>
            <p className="text-xs text-stone-400 font-mono mt-1">Formação profissional de Pilates Reformer e Breathwork com mestres globais</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {certifications.map(cert => (
            <div 
              key={cert.id}
              className="bg-[#181918] border border-stone-800 rounded-3xl p-6 hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-mono">
                    {cert.modality}
                  </span>
                  <span className="font-mono text-lg font-bold text-emerald-400">
                    ${cert.investment} USD
                  </span>
                </div>

                <h4 className="font-serif text-2xl text-stone-100 font-light">
                  {cert.title}
                </h4>

                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  {cert.description}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[10px] uppercase text-stone-500 block font-bold">Módulos de Formação:</span>
                  <div className="space-y-1 text-xs font-mono text-stone-300">
                    {cert.modules.map((mod, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                <span className="text-xs font-mono text-stone-400">
                  {cert.dates}
                </span>

                <button
                  onClick={() => handleBookCertItem(cert)}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-emerald-400 text-stone-950 font-mono text-xs uppercase tracking-wider font-bold rounded-xl transition"
                >
                  Garantir Inscrição (${cert.investment})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retreat Detail Modal */}
      {activeRetreatModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181918] border border-stone-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 text-stone-100 max-h-[90vh] overflow-y-auto relative animate-scale-up">
            <button
              onClick={() => setActiveRetreatModal(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white font-mono"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-widest">{activeRetreatModal.dates}</span>
              <h3 className="font-serif text-3xl font-light text-stone-100 mt-1">{activeRetreatModal.title}</h3>
              <p className="text-xs text-stone-400 font-serif mt-1">{activeRetreatModal.subtitle}</p>
            </div>

            {/* Itinerary */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs text-stone-300 uppercase font-bold tracking-wider">Itinerário Detalhado:</h4>
              <div className="space-y-3">
                {activeRetreatModal.itinerary.map((it, idx) => (
                  <div key={idx} className="p-3 bg-stone-900 border border-stone-800 rounded-xl space-y-1">
                    <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
                      <span className="font-bold">{it.day}:</span>
                      <span className="text-stone-200">{it.title}</span>
                    </div>
                    <p className="text-xs text-stone-400 font-serif leading-relaxed">{it.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions */}
            <div className="space-y-2">
              <h4 className="font-mono text-xs text-stone-300 uppercase font-bold tracking-wider">Incluso na Reserva:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300 font-sans">
                {activeRetreatModal.included.map((inc, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-stone-400 block">INVESTIMENTO TOTAL</span>
                <span className="text-2xl font-serif text-emerald-300 font-bold">${activeRetreatModal.price} USD</span>
              </div>

              <button
                onClick={() => handleBookRetreatItem(activeRetreatModal)}
                className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition"
              >
                Reservar Vaga Agora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
