import React, { useState } from 'react';
import { ServiceBooking } from '../../../types/aloDiaria';
import { X, Star, Heart, CheckCircle2 } from 'lucide-react';

interface RatingModalProps {
  booking?: ServiceBooking;
  isOpen: boolean;
  onClose: () => void;
  onSubmitRating: (bookingId: string, rating: number, comment: string, favorited: boolean) => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  booking,
  isOpen,
  onClose,
  onSubmitRating
}) => {
  if (!isOpen || !booking) return null;

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('Serviço impecável! Muito pontual e caprichosa.');
  const [favorited, setFavorited] = useState<boolean>(true);

  const handleSubmit = () => {
    onSubmitRating(booking.id, rating, comment, favorited);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <h2 className="text-xl font-black text-slate-900">Avalie a Diária</h2>
          <p className="text-xs text-slate-500">Como foi o atendimento da profissional {booking.diaristaName}?</p>
        </div>

        {/* 5-Star Picker */}
        <div className="flex justify-center items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="p-1 cursor-pointer transition transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= rating ? 'text-amber-400 fill-current' : 'text-slate-200'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Comment textarea */}
        <div className="space-y-1 text-xs">
          <label className="font-extrabold text-slate-700 block">Deixe um comentário público:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-medium"
            placeholder="Conte aos outros clientes o que achou da limpeza..."
          />
        </div>

        {/* Favoriting toggle */}
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs">
          <span className="font-bold text-rose-900 flex items-center space-x-1.5">
            <Heart className={`w-4 h-4 ${favorited ? 'fill-current text-rose-500' : 'text-slate-400'}`} />
            <span>Adicionar às Favoritas?</span>
          </span>

          <button
            onClick={() => setFavorited(!favorited)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition ${
              favorited ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-600'
            }`}
          >
            {favorited ? 'Sim, Favoritar' : 'Não'}
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
        >
          Enviar Avaliação
        </button>

      </div>
    </div>
  );
};
