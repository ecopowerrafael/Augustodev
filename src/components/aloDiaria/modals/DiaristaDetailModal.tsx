import React from 'react';
import { DiaristaProfile } from '../../../types/aloDiaria';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Clock, 
  Award, 
  Heart, 
  Calendar, 
  Check, 
  ChevronRight,
  Phone
} from 'lucide-react';

interface DiaristaDetailModalProps {
  diarista?: DiaristaProfile;
  isOpen: boolean;
  onClose: () => void;
  onBookDiarista: (diarista: DiaristaProfile) => void;
}

export const DiaristaDetailModal: React.FC<DiaristaDetailModalProps> = ({
  diarista,
  isOpen,
  onClose,
  onBookDiarista
}) => {
  if (!isOpen || !diarista) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Profile Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 border-b border-slate-100 pb-6 text-center sm:text-left">
          <img
            src={diarista.photoUrl}
            alt={diarista.name}
            className="w-24 h-24 rounded-3xl object-cover border-4 border-teal-500 shadow-md shrink-0"
          />

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-black text-slate-900">{diarista.name}</h2>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verificada Dona Maria</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              📍 {diarista.neighborhood} • {diarista.distanceKm} km de você • {diarista.experienceYears} Anos de Experiência
            </p>

            <div className="flex items-center justify-center sm:justify-start space-x-3 text-xs font-bold">
              <span className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-current mr-1" />
                {diarista.rating.toFixed(1)} <span className="text-slate-400 font-normal ml-1">({diarista.reviewsCount} avaliações)</span>
              </span>

              <span className="text-slate-300">•</span>
              <span className="text-emerald-700">{diarista.completedJobsCount} Diárias Concluídas</span>
            </div>
          </div>
        </div>

        {/* Bio section */}
        <div className="space-y-2 text-xs">
          <h4 className="font-extrabold text-slate-900 uppercase tracking-wider">Biografia & Apresentação</h4>
          <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 font-medium">
            {diarista.bio}
          </p>
        </div>

        {/* Specialties & Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 uppercase tracking-wider">Especialidades</h4>
            <div className="flex flex-wrap gap-1.5">
              {diarista.specialties.map((sp, i) => (
                <span key={i} className="px-2.5 py-1 bg-teal-50 text-teal-800 border border-teal-200 font-bold rounded-lg">
                  ✓ {sp}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 uppercase tracking-wider">Dias Disponíveis</h4>
            <div className="flex flex-wrap gap-1.5">
              {diarista.availableDays.map((day, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg">
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Valor Médio da Diária</span>
            <span className="text-2xl font-black text-slate-900">R$ {diarista.avgDailyRate}</span>
            <span className="text-xs text-slate-500"> /diária (8h)</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookDiarista(diarista);
            }}
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-md transition cursor-pointer flex items-center space-x-2"
          >
            <span>Solicitar Agendamento</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
