import React from "react";
import { REVIEWS_LIST } from "../../data/bhPresentesData";
import { Star, CheckCircle2, Quote, MapPin } from "lucide-react";

export const ReviewsSection: React.FC = () => {
  return (
    <section id="avaliacoes" className="py-16 bg-[#0B1F3A] text-white font-sans scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-white/10 text-[#FFC928] uppercase tracking-wider border border-white/15">
            DEPOIMENTOS REAIS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            O que dizem nossos clientes da Pampulha
          </h2>
          <p className="text-sm text-gray-300">
            Confira a opinião de quem já comprou seu novo smartphone na BH Presentes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS_LIST.map((review) => (
            <div
              key={review.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4 backdrop-blur-md hover:border-[#176BFF] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-[#FFC928]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-gray-200 italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center space-x-3">
                <img
                  src={review.avatarUrl}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#25D366]"
                />
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-black text-white">{review.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                  </div>
                  <span className="text-[10px] text-gray-400 block">{review.purchasedModel}</span>
                  <span className="text-[10px] text-[#FFC928] font-mono flex items-center space-x-0.5">
                    <MapPin className="w-2.5 h-2.5" />
                    <span>{review.location}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
