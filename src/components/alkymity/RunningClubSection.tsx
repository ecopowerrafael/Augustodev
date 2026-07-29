import React, { useState } from 'react';
import { RunEvent, CartItem } from '../../types/alkymity';
import { Compass, MapPin, Calendar, Clock, Activity, Users, Check, Share2, Award } from 'lucide-react';

interface RunningClubSectionProps {
  runs: RunEvent[];
  onRSVPRun: (item: CartItem) => void;
}

export const RunningClubSection: React.FC<RunningClubSectionProps> = ({ runs, onRSVPRun }) => {
  const [rsvpedIds, setRsvpedIds] = useState<Record<string, boolean>>({});

  const handleRSVP = (run: RunEvent) => {
    onRSVPRun({
      id: run.id,
      type: 'experience',
      title: `Alkymity Run: ${run.title}`,
      subtitle: `${run.distance} • ${run.coach}`,
      price: 0, // Free community runs
      quantity: 1,
      date: run.date,
      time: run.time,
      image: run.image
    });

    setRsvpedIds(prev => ({ ...prev, [run.id]: true }));
  };

  return (
    <div className="space-y-12">
      {/* Banner Header */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 p-8 md:p-12 text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1600&q=80" 
            alt="Alkymity Running Club Galápagos" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 font-mono text-xs uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            <span>Comunidade de Trail Running Galápagos</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-stone-100">
            Alkymity <span className="italic font-normal text-emerald-400">Running Club</span>
          </h1>
          <p className="text-stone-300 font-serif text-sm sm:text-base leading-relaxed">
            Corra entre formações vulcânicas, orlas costeiras e reservas de tartarugas gigantes. Treinos guiados semanais, grupos por ritmos e hidratação funcional pós-corrida.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-stone-300">
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-emerald-400" /> +320 Atletas Ativos</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-emerald-400" /> Acesso Gratuito para Membros</span>
          </div>
        </div>
      </div>

      {/* Upcoming Runs List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div>
            <h3 className="font-serif text-2xl text-stone-100 font-light">Próximos Treinos & Corridas</h3>
            <p className="text-xs text-stone-400 font-mono mt-1">Ganta sua vaga na lista de presença para hidratação e transporte</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {runs.map(run => {
            const isRSVPed = rsvpedIds[run.id];
            return (
              <div 
                key={run.id}
                className="bg-[#181918] border border-stone-800 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-48 overflow-hidden bg-stone-900">
                  <img 
                    src={run.image} 
                    alt={run.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-emerald-300 font-mono text-xs border border-emerald-500/30 uppercase font-bold">
                    {run.type}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="font-serif text-xl text-stone-100 font-medium group-hover:text-emerald-300 transition">
                      {run.title}
                    </h4>

                    <p className="text-xs text-stone-400 leading-relaxed font-sans">
                      {run.description}
                    </p>

                    {/* Stats bar */}
                    <div className="grid grid-cols-3 gap-2 p-3 bg-stone-900 border border-stone-800 rounded-xl text-center font-mono text-xs text-stone-300">
                      <div>
                        <span className="text-[9px] text-stone-500 uppercase block">DISTÂNCIA</span>
                        <span className="font-bold text-emerald-400">{run.distance}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-stone-500 uppercase block">ALTIMETRIA</span>
                        <span className="font-bold text-stone-200">{run.elevation}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-stone-500 uppercase block">RITMO</span>
                        <span className="font-bold text-stone-200 text-[10px]">{run.pace}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs font-mono text-stone-400 pt-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{run.date} às {run.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-stone-500" />
                        <span className="truncate">{run.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-stone-500" />
                        <span>Treinador: {run.coach}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRSVP(run)}
                    disabled={isRSVPed}
                    className={`w-full py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition flex items-center justify-center space-x-2 ${
                      isRSVPed
                        ? 'bg-emerald-500 text-stone-950 cursor-default'
                        : 'bg-stone-100 text-stone-950 hover:bg-emerald-400'
                    }`}
                  >
                    {isRSVPed ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Presença Confirmada!</span>
                      </>
                    ) : (
                      <>
                        <Compass className="w-4 h-4" />
                        <span>Confirmar Presença (Grátis)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
