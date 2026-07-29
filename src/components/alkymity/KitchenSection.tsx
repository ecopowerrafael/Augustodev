import React, { useState } from 'react';
import { MenuItem, CartItem } from '../../types/alkymity';
import { Coffee, Flame, Plus, Check, Leaf, HeartPulse, Info, ShoppingBag } from 'lucide-react';

interface KitchenSectionProps {
  menu: MenuItem[];
  onAddToCart: (item: CartItem) => void;
}

export const KitchenSection: React.FC<KitchenSectionProps> = ({ menu, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDiet, setSelectedDiet] = useState<string>('All');
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Bowls', 'Breakfast', 'Salads', 'Functional Drinks', 'Coffee', 'Desserts'];
  const diets = ['All', 'Vegan', 'Gluten-Free', 'Keto', 'Organic', 'High-Protein'];

  const filteredMenu = menu.filter(item => {
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
    const dietMatch = selectedDiet === 'All' || item.dietary.includes(selectedDiet as any);
    return categoryMatch && dietMatch;
  });

  const handleAdd = (item: MenuItem) => {
    onAddToCart({
      id: item.id,
      type: 'kitchen',
      title: item.name,
      subtitle: `${item.category} • ${item.calories} kcal`,
      price: item.price,
      quantity: 1,
      image: item.image
    });

    setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <div className="space-y-12">
      {/* Kitchen Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 p-8 md:p-12 text-white">
        <div className="absolute inset-0 z-0 opacity-45">
          <img 
            src="https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=1600&q=80" 
            alt="Alkymity Kitchen Galápagos" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 font-mono text-xs uppercase tracking-widest">
            <Leaf className="w-3.5 h-3.5" />
            <span>100% Orgânico & Ingredientes Locais</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-stone-100">
            Alkymity Kitchen <span className="italic font-normal text-amber-300">& Café</span>
          </h1>
          <p className="text-stone-300 font-serif text-sm sm:text-base leading-relaxed">
            Gastronomia vibrante, sucos prensados a frio e elixires adaptogênicos preparados diariamente com ingredientes colhidos nas fazendas orgânicas das terras altas de Galápagos.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-stone-300">
            <span className="flex items-center gap-1.5"><HeartPulse className="w-4 h-4 text-amber-400" /> Sem Açúcar Refinado</span>
            <span className="flex items-center gap-1.5"><Coffee className="w-4 h-4 text-amber-400" /> Matcha Ceremonial Grade & Sourdough 48h</span>
          </div>
        </div>
      </div>

      {/* Filters (Category & Dietary) */}
      <div className="bg-[#161716] border border-stone-800 rounded-2xl p-6 space-y-4">
        {/* Category selector */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase text-stone-400 font-bold tracking-wider">
            Categorias do Cardápio:
          </span>
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-amber-900/60 text-amber-300 border border-amber-500/50 font-bold'
                    : 'bg-stone-900 text-stone-400 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Tag selector */}
        <div className="pt-3 border-t border-stone-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase text-stone-400 font-bold tracking-wider">
            Restrições Alimentares:
          </span>
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {diets.map(diet => (
              <button
                key={diet}
                onClick={() => setSelectedDiet(diet)}
                className={`px-3 py-1 rounded-md text-[11px] font-mono transition whitespace-nowrap ${
                  selectedDiet === diet
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'bg-stone-900 text-stone-500 hover:text-stone-300 border border-stone-800'
                }`}
              >
                {diet}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenu.map(item => {
          const isAdded = addedItemIds[item.id];
          return (
            <div 
              key={item.id}
              className="bg-[#181918] border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden bg-stone-900">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
                  ${item.price}
                </div>
                <button
                  onClick={() => setActiveItemModal(item)}
                  className="absolute top-3 left-3 p-1.5 bg-stone-950/80 backdrop-blur-md rounded-full text-stone-300 hover:text-white border border-stone-700 text-xs"
                  title="Ver Nutrição & Ingredientes"
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {item.dietary.map((d, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 rounded text-[9px] font-mono uppercase">
                        {d}
                      </span>
                    ))}
                  </div>

                  <h4 className="font-serif text-lg text-stone-100 font-medium group-hover:text-amber-300 transition">
                    {item.name}
                  </h4>

                  <p className="text-xs text-stone-400 leading-relaxed font-sans line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-800 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                    <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-amber-400" /> {item.calories} kcal</span>
                    <span>Proteína: {item.protein}</span>
                  </div>

                  <button
                    onClick={() => handleAdd(item)}
                    className={`w-full py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition flex items-center justify-center space-x-2 ${
                      isAdded
                        ? 'bg-amber-400 text-stone-950'
                        : 'bg-stone-800 text-stone-200 hover:bg-amber-500 hover:text-stone-950 border border-stone-700'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Adicionado ao Pedido!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Adicionar ao Pedido (${item.price})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Item Nutrition Details Modal */}
      {activeItemModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181918] border border-stone-700 rounded-3xl max-w-lg w-full p-6 space-y-5 text-stone-100 shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setActiveItemModal(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white font-mono text-sm"
            >
              ✕
            </button>

            <div className="flex items-center space-x-4">
              <img 
                src={activeItemModal.image} 
                alt={activeItemModal.name} 
                className="w-20 h-20 rounded-2xl object-cover border border-stone-700"
              />
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">{activeItemModal.category}</span>
                <h3 className="font-serif text-xl text-stone-100">{activeItemModal.name}</h3>
                <span className="text-sm font-bold text-amber-300 font-mono">${activeItemModal.price}</span>
              </div>
            </div>

            <p className="text-xs text-stone-300 font-serif leading-relaxed">
              {activeItemModal.description}
            </p>

            <div className="space-y-2">
              <h5 className="font-mono text-xs text-stone-400 uppercase font-bold">Ingredientes Selecionados:</h5>
              <div className="flex flex-wrap gap-1.5">
                {activeItemModal.ingredients.map((ing, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-stone-800 text-stone-300 rounded-lg text-xs font-sans">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-stone-900 border border-stone-800 rounded-xl grid grid-cols-2 gap-4 font-mono text-xs text-stone-300">
              <div>
                <span className="text-stone-500 block text-[10px]">ENERGIA</span>
                <span className="font-bold text-amber-400">{activeItemModal.calories} KCAL</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">PROTEÍNA</span>
                <span className="font-bold text-amber-400">{activeItemModal.protein}</span>
              </div>
            </div>

            <button
              onClick={() => {
                handleAdd(activeItemModal);
                setActiveItemModal(null);
              }}
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition"
            >
              Adicionar ao Pedido (${activeItemModal.price})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
