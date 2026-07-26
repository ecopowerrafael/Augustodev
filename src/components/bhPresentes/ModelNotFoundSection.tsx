import React from "react";
import { Search, Sparkles, MessageCircle, ArrowRight } from "lucide-react";

interface ModelNotFoundSectionProps {
  onOpenFormCustom: (modelName?: string) => void;
}

export const ModelNotFoundSection: React.FC<ModelNotFoundSectionProps> = ({ onOpenFormCustom }) => {
  const exampleModels = [
    "iPhone 15 Pro Max",
    "iPhone 14 128GB",
    "Samsung S23 Ultra",
    "Galaxy A35 5G",
    "Xiaomi POCO X6 Pro",
    "Motorola Razr 40",
    "Seminovo com 256GB"
  ];

  return (
    <section className="py-12 bg-[#0B1F3A] text-white font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-[#FFC928]">
          <Search className="w-4 h-4" />
          <span>PROCURANDO UM MODELO ESPECÍFICO?</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white">
          Não encontrou o smartphone que procura?
        </h2>

        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
          Nosso estoque físico na Pampulha é atualizado diariamente! Informe o modelo, marca ou capacidade que você procura e nossa equipe localizará para você.
        </p>

        {/* Example Pills */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto pt-2">
          {exampleModels.map((model) => (
            <button
              key={model}
              onClick={() => onOpenFormCustom(model)}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#176BFF] text-xs font-semibold text-gray-200 transition-colors border border-white/15 flex items-center space-x-1"
            >
              <span>+ {model}</span>
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <button
            onClick={() => onOpenFormCustom("")}
            className="px-8 py-4 bg-[#FFC928] hover:bg-[#ebd523] text-[#0B1F3A] font-black text-sm rounded-2xl shadow-xl transition-all hover:scale-105 inline-flex items-center space-x-2"
          >
            <MessageCircle className="w-5 h-5 text-[#0B1F3A]" />
            <span>Solicitar Outro Modelo no WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
