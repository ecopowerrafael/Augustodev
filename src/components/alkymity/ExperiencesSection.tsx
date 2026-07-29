import React from 'react';
import { WellnessExperience, CartItem } from '../../types/alkymity';
import { Sparkles, Clock, MapPin, Star, Plus, Check } from 'lucide-react';

interface ExperiencesSectionProps {
  experiences: WellnessExperience[];
  onBookExperience: (item: CartItem) => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ 
  experiences, 
  onBookExperience 
}) => {
  return (
    <div className="space-y-12">
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 p-8 md:p-12 text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1600&q=80" 
            alt="Alkymity Experiences Galápagos" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vivências Únicas nas Ilhas</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-stone-100">
            Experiências <span className="italic font-normal text-emerald-400">Curadas</span>
          </h1>
          <p className="text-stone-300 font-serif text-sm sm:text-base leading-relaxed">
            Atividades de bem-estar avulsas para elevar sua passagem por Galápagos. Banhos de gelo vulcânicos, banquetes farm-to-table ao ar livre e meditações no pôr do sol.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map(exp => (
          <div 
            key={exp.id}
            className="bg-[#181918] border border-stone-800 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between group"
          >
            <div className="relative h-52 overflow-hidden bg-stone-900">
              <img 
                src={exp.image} 
                alt={exp.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-emerald-300 font-mono font-bold text-xs border border-emerald-500/30">
                ${exp.price} USD
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold">{exp.rating.toFixed(2)}</span> ({exp.reviewsCount} avaliações)
                  </span>
                  <span className="text-stone-400">{exp.category}</span>
                </div>

                <h4 className="font-serif text-xl text-stone-100 font-medium group-hover:text-emerald-300 transition">
                  {exp.title}
                </h4>

                <p className="text-xs text-stone-400 leading-relaxed font-sans">
                  {exp.description}
                </p>

                <div className="space-y-1 text-xs font-mono text-stone-400 pt-2 border-t border-stone-800">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Duração: {exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onBookExperience({
                  id: exp.id,
                  type: 'experience',
                  title: exp.title,
                  subtitle: `${exp.duration} • ${exp.location}`,
                  price: exp.price,
                  quantity: 1,
                  image: exp.image
                })}
                className="w-full py-3 rounded-xl font-mono text-xs uppercase tracking-wider font-bold bg-stone-100 text-stone-950 hover:bg-emerald-400 transition flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Reservar Experiência (${exp.price})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
