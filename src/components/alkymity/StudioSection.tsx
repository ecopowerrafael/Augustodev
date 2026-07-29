import React, { useState } from 'react';
import { PilatesClass, CartItem } from '../../types/alkymity';
import { Calendar, Clock, MapPin, Users, Check, Sparkles, Filter, ShieldCheck, ChevronRight } from 'lucide-react';

interface StudioSectionProps {
  classes: PilatesClass[];
  onBookClass: (item: CartItem) => void;
}

export const StudioSection: React.FC<StudioSectionProps> = ({ classes, onBookClass }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bookingSuccessId, setBookingSuccessId] = useState<string | null>(null);

  const categories = ['All', 'Reformer', 'Mat', 'Mobility', 'Recovery', 'Private'];

  const filteredClasses = selectedCategory === 'All'
    ? classes
    : classes.filter(c => c.category === selectedCategory);

  const handleBook = (cls: PilatesClass) => {
    onBookClass({
      id: cls.id,
      type: 'class',
      title: cls.title,
      subtitle: `${cls.category} • ${cls.instructor}`,
      price: cls.price,
      quantity: 1,
      date: cls.date,
      time: cls.time,
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80'
    });
    setBookingSuccessId(cls.id);
    setTimeout(() => setBookingSuccessId(null), 3000);
  };

  return (
    <div className="space-y-12">
      {/* Studio Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 p-8 md:p-12 text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=80" 
            alt="Pilates Studio Galápagos" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Integrado via FITCO API</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-stone-100">
            Alkymity Studio <span className="italic font-normal text-emerald-400">Pilates</span>
          </h1>
          <p className="text-stone-300 font-serif text-sm sm:text-base leading-relaxed">
            Reformer Allegro 2, Mat & Biomecânica de Alta Precisão. Pratique movimento consciente diante da brisa do Oceano Pacífico em Santa Cruz, Galápagos.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-stone-300">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Vagas limitadas (Máx. 8 por turma)</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-emerald-400" /> Decks ao ar livre</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
        <div>
          <h3 className="font-serif text-2xl text-stone-100 font-light">Grade de Aulas & Agendamento</h3>
          <p className="text-xs text-stone-400 font-mono mt-1">Selecione a modalidade e garanta sua vaga em tempo real</p>
        </div>

        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition ${
                selectedCategory === cat
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'bg-stone-900 text-stone-400 hover:bg-stone-800 hover:text-white border border-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => {
          const isSuccess = bookingSuccessId === cls.id;
          return (
            <div 
              key={cls.id}
              className="bg-[#181918] border border-stone-800 rounded-2xl p-6 hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between group space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-stone-800 text-stone-200 rounded-md font-mono text-[10px] uppercase font-bold tracking-wider border border-stone-700">
                    {cls.category}
                  </span>
                  <span className="font-serif text-lg font-bold text-emerald-400">
                    ${cls.price} <span className="text-xs text-stone-500 font-mono font-normal">/ sessão</span>
                  </span>
                </div>

                <h4 className="font-serif text-xl font-medium text-stone-100 group-hover:text-emerald-300 transition">
                  {cls.title}
                </h4>

                <p className="text-xs text-stone-400 font-sans leading-relaxed line-clamp-2">
                  {cls.description}
                </p>

                {/* Instructor Info */}
                <div className="flex items-center space-x-3 pt-2">
                  <img 
                    src={cls.instructorAvatar} 
                    alt={cls.instructor} 
                    className="w-8 h-8 rounded-full object-cover border border-stone-700"
                  />
                  <div className="text-xs font-sans">
                    <span className="text-stone-200 font-medium block">{cls.instructor}</span>
                    <span className="text-stone-500 text-[10px] font-mono">Master Instructor</span>
                  </div>
                </div>

                {/* Details list */}
                <div className="space-y-1.5 pt-3 text-xs font-mono text-stone-400 border-t border-stone-800/80">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-emerald-400" /> {cls.time} ({cls.duration})</span>
                    <span className="text-stone-300">{cls.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-stone-500" /> {cls.location}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-amber-400/90 font-bold uppercase">Intensidade: {cls.intensity}</span>
                    <span className={`text-[10px] font-bold ${cls.spotsLeft <= 2 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {cls.spotsLeft} vagas restantes
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleBook(cls)}
                disabled={cls.spotsLeft === 0}
                className={`w-full py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition flex items-center justify-center space-x-2 ${
                  isSuccess
                    ? 'bg-emerald-500 text-stone-950'
                    : cls.spotsLeft === 0
                    ? 'bg-stone-800 text-stone-600 cursor-not-allowed'
                    : 'bg-stone-100 text-stone-950 hover:bg-emerald-400'
                }`}
              >
                {isSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Adicionado ao Carrinho!</span>
                  </>
                ) : cls.spotsLeft === 0 ? (
                  <span>Turma Esgotada</span>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Agendar Aula (${cls.price})</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Methodologies & Equipment Showcase */}
      <div className="bg-[#151615] border border-stone-800 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold">
            01
          </div>
          <h4 className="font-serif text-lg text-stone-100 font-medium">Reformer Allegro 2</h4>
          <p className="text-xs text-stone-400 leading-relaxed font-sans">
            Equipamentos de topo internacional com molas graduadas e estofamento ergonômico para precisão postural absoluta.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold">
            02
          </div>
          <h4 className="font-serif text-lg text-stone-100 font-medium">Sincronização FITCO</h4>
          <p className="text-xs text-stone-400 leading-relaxed font-sans">
            Garantia de reserva instantânea, gerenciamento de créditos de membro, check-in por QR Code e histórico integrado.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold">
            03
          </div>
          <h4 className="font-serif text-lg text-stone-100 font-medium">Instrução Certificada</h4>
          <p className="text-xs text-stone-400 leading-relaxed font-sans">
            Professores renomados com especialização internacional em reabilitação postural, atletas de alta performance e gestantes.
          </p>
        </div>
      </div>
    </div>
  );
};
