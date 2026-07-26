import React from "react";
import { FEATURED_OFFER } from "../../data/bhPresentesData";
import {
  Sparkles,
  ShieldCheck,
  FileCheck,
  Store,
  Palette,
  UserCheck,
  MessageCircle,
  CheckCircle2,
  Tag,
  ArrowRight
} from "lucide-react";

interface FeaturedOfferProps {
  onSelectModel: (modelName: string) => void;
}

export const FeaturedOffer: React.FC<FeaturedOfferProps> = ({ onSelectModel }) => {
  return (
    <section className="py-12 bg-gradient-to-b from-[#F5F7FA] to-white text-[#18202A] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-[#FFC928]/30 text-[#0B1F3A] border border-[#FFC928] uppercase tracking-wider inline-flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-[#F04444]" />
            <span>DESTAQUE DA SEMANA</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0B1F3A]">
            Oferta Principal com Preço Especial
          </h2>
          <p className="text-sm text-[#687382]">
            O smartphone mais desejado do mercado em uma condição imperdível para você retirar hoje na Pampulha.
          </p>
        </div>

        {/* Featured Big Card Showcase */}
        <div className="bg-white border-2 border-[#176BFF]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Badge top right */}
          <div className="absolute top-0 right-0 bg-[#FFC928] text-[#0B1F3A] font-black text-xs px-6 py-2 rounded-bl-2xl shadow-md uppercase tracking-wider flex items-center space-x-1">
            <Tag className="w-4 h-4 text-[#F04444]" />
            <span>OFERTA DA SEMANA</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            {/* Left Image & Color Gallery */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={FEATURED_OFFER.imageUrl}
                  alt={FEATURED_OFFER.name}
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#176BFF] text-white text-xs font-black px-3 py-1 rounded-full shadow">
                  {FEATURED_OFFER.condition}
                </div>
              </div>

              {/* Color Options Display */}
              <div>
                <span className="text-xs font-bold text-[#687382] block mb-2">Opções de Cores Disponíveis:</span>
                <div className="flex flex-wrap gap-2">
                  {FEATURED_OFFER.colors.map((color) => (
                    <span
                      key={color}
                      className="px-3 py-1 bg-gray-100 border border-gray-200 text-xs font-semibold text-[#18202A] rounded-lg"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Specifications & Pricing Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-extrabold text-[#176BFF] uppercase tracking-wider block">
                  {FEATURED_OFFER.brand} • {FEATURED_OFFER.storage}
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-[#0B1F3A] leading-tight">
                  {FEATURED_OFFER.name}
                </h3>
                <p className="text-xs text-[#25D366] font-extrabold mt-1 flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Novo, lacrado e com nota fiscal no seu nome</span>
                </p>
              </div>

              {/* Benefits Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-[#18202A] bg-[#F5F7FA] p-4 rounded-2xl border border-gray-200">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#176BFF]" />
                  <span>Garantia Oficial Apple de 1 ano</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileCheck className="w-4 h-4 text-[#176BFF]" />
                  <span>Nota Fiscal Eletrônica (NFe)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Store className="w-4 h-4 text-[#176BFF]" />
                  <span>Retirada Imediata na Loja Pampulha</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-[#176BFF]" />
                  <span>Diversas Opções de Cores</span>
                </div>
                <div className="flex items-center space-x-2 sm:col-span-2">
                  <UserCheck className="w-4 h-4 text-[#25D366]" />
                  <span>Atendimento Personalizado no WhatsApp</span>
                </div>
              </div>

              {/* Price Callout Box */}
              <div className="bg-[#0B1F3A] text-white p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
                <div>
                  <span className="text-xs text-gray-300 font-bold block uppercase">Preço À Vista</span>
                  <div className="text-3xl sm:text-4xl font-black text-[#25D366]">
                    R$ {FEATURED_OFFER.cashPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-gray-400">Pix ou Dinheiro com Desconto Especial</span>
                </div>

                <div className="border-l border-white/20 pl-4">
                  <span className="text-xs text-gray-300 font-bold block uppercase">Ou Parcelado</span>
                  <div className="text-xl font-black text-[#FFC928]">
                    12x de R$ {FEATURED_OFFER.installmentValue.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-gray-400">Total parcelado: R$ {FEATURED_OFFER.installmentPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectModel(FEATURED_OFFER.name)}
                className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-base rounded-2xl transition-all shadow-xl shadow-[#25D366]/30 flex items-center justify-center space-x-3 hover:scale-[1.02]"
              >
                <MessageCircle className="w-6 h-6" />
                <span>Tenho Interesse Neste Aparelho</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
