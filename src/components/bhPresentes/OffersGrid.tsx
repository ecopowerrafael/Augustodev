import React, { useState } from "react";
import { PRODUCTS_CATALOG } from "../../data/bhPresentesData";
import { SmartphoneProduct } from "../../types/bhPresentes";
import { MessageCircle, Check, Tag, Shield, Sparkles, Filter, Info, ArrowUpRight } from "lucide-react";

interface OffersGridProps {
  onSelectModel: (modelName: string) => void;
}

type FilterCategory = "Todos" | "Novos Lacrados" | "Seminovos Premium" | "Até R$ 3.000" | "iPhones" | "Android";

export const OffersGrid: React.FC<OffersGridProps> = ({ onSelectModel }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("Todos");

  const filterProducts = (): SmartphoneProduct[] => {
    switch (activeFilter) {
      case "Novos Lacrados":
        return PRODUCTS_CATALOG.filter((p) => p.condition === "Novo e Lacrado");
      case "Seminovos Premium":
        return PRODUCTS_CATALOG.filter((p) => p.condition.includes("Seminovo"));
      case "Até R$ 3.000":
        return PRODUCTS_CATALOG.filter((p) => p.cashPrice <= 3000);
      case "iPhones":
        return PRODUCTS_CATALOG.filter((p) => p.brand === "Apple");
      case "Android":
        return PRODUCTS_CATALOG.filter((p) => p.brand !== "Apple");
      default:
        return PRODUCTS_CATALOG;
    }
  };

  const filteredList = filterProducts();

  return (
    <section id="ofertas" className="py-16 bg-[#F5F7FA] text-[#18202A] font-sans scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-[#176BFF] text-white uppercase tracking-wider inline-flex items-center space-x-1 shadow">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC928]" />
            <span>CATÁLOGO ATUALIZADO</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A]">
            Os Celulares Mais Procurados na Pampulha
          </h2>
          <p className="text-sm sm:text-base text-[#687382]">
            Confira algumas das ofertas disponíveis em nossa loja física e fale com a equipe no WhatsApp para reservar o seu modelo.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {(["Todos", "Novos Lacrados", "Seminovos Premium", "Até R$ 3.000", "iPhones", "Android"] as FilterCategory[]).map(
            (category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all border ${
                  activeFilter === category
                    ? "bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-md scale-105"
                    : "bg-white text-[#687382] border-gray-200 hover:border-[#176BFF] hover:text-[#176BFF]"
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredList.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-gray-200 hover:border-[#176BFF] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group relative"
            >
              {/* Badge Tag top right */}
              <div
                className="absolute top-3 right-3 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md z-10 tracking-wider"
                style={{ backgroundColor: product.badgeColor }}
              >
                {product.badge}
              </div>

              {/* Card Top Image */}
              <div className="relative bg-gray-100 overflow-hidden h-64">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 bg-[#0B1F3A]/90 text-white text-[11px] font-bold px-3 py-1 rounded-lg backdrop-blur-sm">
                  {product.condition}
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black text-[#176BFF] uppercase tracking-wider block">
                    {product.brand} • {product.storage}
                  </span>
                  <h3 className="text-xl font-black text-[#0B1F3A] group-hover:text-[#176BFF] transition-colors">
                    {product.name}
                  </h3>

                  {/* Highlights Specs list */}
                  <ul className="mt-3 space-y-1.5 text-xs text-[#687382]">
                    {product.specs.slice(0, 3).map((spec, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                        <span className="line-clamp-1">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing Block */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="bg-[#F5F7FA] p-3 rounded-2xl border border-gray-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#687382] uppercase font-bold block">Preço À Vista</span>
                      <span className="text-2xl font-black text-[#25D366]">
                        R$ {product.cashPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-[#687382] uppercase font-bold block">Ou Parcelado</span>
                      <span className="text-xs font-black text-[#0B1F3A]">
                        {product.maxInstallments}x de R$ {product.installmentValue.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Warranty Tag */}
                  <p className="text-[11px] text-[#176BFF] font-bold flex items-center space-x-1 justify-center">
                    <Shield className="w-3.5 h-3.5" />
                    <span>{product.warranty}</span>
                  </p>

                  {/* CTA Button */}
                  <button
                    onClick={() => onSelectModel(product.name)}
                    className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Consultar Disponibilidade</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Note */}
        <div className="mt-8 p-4 bg-white border border-gray-200 rounded-2xl flex items-center space-x-3 text-xs text-[#687382] justify-center text-center">
          <Info className="w-4 h-4 text-[#176BFF] shrink-0" />
          <span>
            * Os preços, formas de pagamento, parcelas e disponibilidades de estoque poderão variar conforme modelo, cor, capacidade de memória e dia do atendimento.
          </span>
        </div>
      </div>
    </section>
  );
};
