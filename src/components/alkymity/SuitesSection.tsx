import React, { useState } from 'react';
import { SuiteItem, CartItem } from '../../types/alkymity';
import { BedDouble, Users, Check, Waves, Sparkles, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface SuitesSectionProps {
  suites: SuiteItem[];
  onBookSuite: (item: CartItem) => void;
}

export const SuitesSection: React.FC<SuitesSectionProps> = ({ suites, onBookSuite }) => {
  const [selectedSuite, setSelectedSuite] = useState<SuiteItem>(suites[0]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [nightsCount, setNightsCount] = useState<number>(3);

  const handleReserveSuite = () => {
    onBookSuite({
      id: selectedSuite.id,
      type: 'suite',
      title: selectedSuite.name,
      subtitle: `${nightsCount} Noites • ${selectedSuite.maxGuests} Hóspedes`,
      price: selectedSuite.pricePerNight * nightsCount,
      quantity: 1,
      image: selectedSuite.images[0]
    });
  };

  return (
    <div className="space-y-12">
      {/* Banner Header */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 p-8 md:p-12 text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80" 
            alt="Alkymity Suites Galápagos" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 font-mono text-xs uppercase tracking-widest">
            <BedDouble className="w-3.5 h-3.5" />
            <span>Hospedagem Boutique de Alto Luxo</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-stone-100">
            Alkymity <span className="italic font-normal text-emerald-400">Suites & Villas</span>
          </h1>
          <p className="text-stone-300 font-serif text-sm sm:text-base leading-relaxed">
            Acomodações privativas à beira-mar com piscinas de borda infinita, enxoval de algodão egípcio e serviço de mordomo 24h. Acesso ilimitado ao Alkymity Studio e Kitchen.
          </p>
        </div>
      </div>

      {/* Main Suite Showcase (Selected Suite View) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image Gallery & Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative h-96 sm:h-[450px] rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 group">
            <img 
              src={selectedSuite.images[activeImageIndex] || selectedSuite.images[0]} 
              alt={selectedSuite.name} 
              className="w-full h-full object-cover transition duration-500"
            />

            {/* Gallery controls if multiple images */}
            {selectedSuite.images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {selectedSuite.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition ${
                        activeImageIndex === idx ? 'bg-emerald-400 scale-125' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setActiveImageIndex(prev => prev === 0 ? selectedSuite.images.length - 1 : prev - 1)}
                    className="p-2 bg-stone-950/80 backdrop-blur-md text-white rounded-full hover:bg-stone-800"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveImageIndex(prev => prev === selectedSuite.images.length - 1 ? 0 : prev + 1)}
                    className="p-2 bg-stone-950/80 backdrop-blur-md text-white rounded-full hover:bg-stone-800"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#181918] border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5">
            <div>
              <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-widest">{selectedSuite.size} • Até {selectedSuite.maxGuests} Hóspedes</span>
              <h2 className="font-serif text-3xl font-light text-stone-100 mt-1">{selectedSuite.name}</h2>
              <p className="text-xs text-stone-400 font-serif italic mt-1">{selectedSuite.tagline}</p>
            </div>

            <p className="text-xs text-stone-300 font-serif leading-relaxed">
              {selectedSuite.description}
            </p>

            <div className="space-y-3 pt-3 border-t border-stone-800">
              <h4 className="font-mono text-xs text-stone-300 uppercase font-bold tracking-wider">Comodidades Inclusas:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300 font-sans">
                {selectedSuite.amenities.map((am, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Suite Picker & Reservation Calculator */}
        <div className="space-y-6">
          {/* Suite Selectors list */}
          <div className="bg-[#181918] border border-stone-800 rounded-3xl p-6 space-y-4">
            <h4 className="font-mono text-xs text-stone-300 uppercase font-bold tracking-wider">Escolha a Acomodação:</h4>
            
            <div className="space-y-3">
              {suites.map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedSuite(s);
                    setActiveImageIndex(0);
                  }}
                  className={`w-full p-4 rounded-2xl text-left transition border flex items-center justify-between ${
                    selectedSuite.id === s.id
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-white'
                      : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:bg-stone-800 hover:text-stone-200'
                  }`}
                >
                  <div>
                    <span className="font-serif font-medium text-sm block">{s.name}</span>
                    <span className="text-[10px] font-mono text-stone-500">{s.size} • {s.maxGuests} Hóspedes</span>
                  </div>
                  <span className="font-mono font-bold text-xs text-emerald-400">
                    ${s.pricePerNight}/noite
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Calculator box */}
          <div className="bg-[#181918] border border-emerald-500/40 rounded-3xl p-6 space-y-5">
            <h4 className="font-serif text-xl text-stone-100 font-light">Simular Reserva</h4>

            <div className="space-y-3 font-mono text-xs text-stone-300">
              <div className="flex items-center justify-between p-3 bg-stone-900 border border-stone-800 rounded-xl">
                <span>Duração da Estadia:</span>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setNightsCount(Math.max(1, nightsCount - 1))}
                    className="w-6 h-6 rounded bg-stone-800 text-stone-200 font-bold hover:bg-stone-700"
                  >
                    -
                  </button>
                  <span className="font-bold text-emerald-400">{nightsCount} Noites</span>
                  <button 
                    onClick={() => setNightsCount(nightsCount + 1)}
                    className="w-6 h-6 rounded bg-stone-800 text-stone-200 font-bold hover:bg-stone-700"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 p-3 bg-stone-900 border border-stone-800 rounded-xl">
                <div className="flex items-center justify-between">
                  <span>Tarifa Diária (${selectedSuite.pricePerNight} x {nightsCount}):</span>
                  <span>${selectedSuite.pricePerNight * nightsCount}</span>
                </div>
                <div className="flex items-center justify-between text-stone-500 text-[10px]">
                  <span>Acesso ao Studio & Kitchen:</span>
                  <span className="text-emerald-400 font-bold">Incluso</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-sm font-bold text-stone-100">
                  <span>Total Estimado:</span>
                  <span className="text-emerald-400">${selectedSuite.pricePerNight * nightsCount} USD</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleReserveSuite}
              className="w-full py-3.5 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-lg flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reservar Suíte agora</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
