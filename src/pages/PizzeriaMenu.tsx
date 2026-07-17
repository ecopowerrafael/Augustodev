import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  MapPin, 
  Phone, 
  Clock, 
  Search, 
  Check, 
  X, 
  ArrowLeft, 
  MessageSquare, 
  Pizza, 
  Coffee, 
  Flame, 
  HelpCircle,
  Sparkles,
  ChevronRight,
  UtensilsCrossed,
  Coins,
  CreditCard,
  Percent
} from "lucide-react";

// Generated high-quality images
const margheritaImg = "/src/assets/images/neapolitan_pizza_margherita_1784140572397.jpg";
const pepperoniImg = "/src/assets/images/gourmet_pepperoni_pizza_1784140586628.jpg";
const chocolateStrawberryImg = "/src/assets/images/chocolate_strawberry_pizza_1784140598651.jpg";

interface MenuItem {
  id: string;
  name: string;
  category: "Salgada" | "Doce" | "Bebida" | "Entrada";
  description: string;
  priceBase: number;
  image: string;
  popular?: boolean;
  ingredients: string[];
}

interface CartItem {
  id: string; // Unique for cart (combining item ID + selected options)
  menuItem: MenuItem;
  size: "Broto" | "Média" | "Grande";
  crust: "Tradicional" | "Catupiry" | "Cheddar" | "Chocolate";
  extras: string[];
  quantity: number;
  pricePerUnit: number;
  notes?: string;
}

export default function PizzeriaMenu({ onBack }: { onBack?: () => void }) {
  const [activeCategory, setActiveCategory] = useState<"Salgada" | "Doce" | "Bebida" | "Entrada">("Salgada");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Customize Item modal states
  const [selectedSize, setSelectedSize] = useState<"Broto" | "Média" | "Grande">("Grande");
  const [selectedCrust, setSelectedCrust] = useState<"Tradicional" | "Catupiry" | "Cheddar" | "Chocolate">("Tradicional");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [itemNotes, setItemNotes] = useState("");

  // Order Details Form
  const [orderMethod, setOrderMethod] = useState<"Entrega" | "Retirada">("Entrega");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"Pix" | "Cartão Crédito" | "Cartão Débito" | "Dinheiro">("Pix");
  const [changeFor, setChangeFor] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Menu database
  const menuItems: MenuItem[] = [
    {
      id: "margherita-premium",
      name: "Margherita di Nápoli",
      category: "Salgada",
      description: "Molho de tomate italiano artesanal, mussarela de búfala fresca, folhas selecionadas de manjericão gigante e um fio generoso de azeite extra virgem Filippo Berio sobre massa de fermentação lenta de 48h.",
      priceBase: 48.00,
      image: margheritaImg,
      popular: true,
      ingredients: ["Molho de Tomate", "Mussarela de Búfala", "Manjericão Fresco", "Azeite de Oliva"]
    },
    {
      id: "pepperoni-honey",
      name: "Pepperoni Gourmet & Hot Honey",
      category: "Salgada",
      description: "Fatias selecionadas de pepperoni defumado e crocante, mussarela especial cremosa, salpicado com orégano fresco e finalizado com um toque secreto de mel picante da casa.",
      priceBase: 54.00,
      image: pepperoniImg,
      popular: true,
      ingredients: ["Pepperoni", "Mussarela", "Mel Picante", "Orégano Fresco"]
    },
    {
      id: "quatro-queijos",
      name: "L'Império de Quattro Formaggi",
      category: "Salgada",
      description: "Combinação nobre e equilibrada dos queijos: mussarela premium, provolone defumado artesanal, gorgonzola Dolce cremoso e catupiry original escaldado.",
      priceBase: 56.00,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400",
      ingredients: ["Mussarela", "Provolone", "Gorgonzola", "Catupiry Original"]
    },
    {
      id: "frango-catupiry",
      name: "Frango com Catupiry Legítimo",
      category: "Salgada",
      description: "Peito de frango desfiado temperado com ervas finas e finas tiras de cebola roxa, coberto com o autêntico Catupiry cremoso em espiral.",
      priceBase: 49.00,
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=400",
      ingredients: ["Frango Desfiado", "Catupiry", "Milho Vaporizado", "Cebola Roxa"]
    },
    {
      id: "chocolate-morango",
      name: "Doce Tentação de Chocolate & Morango",
      category: "Doce",
      description: "Base de pizza doce assada ao ponto perfeito, coberta com creme de avelã Nutella genuíno, morangos frescos fatiados e raspas finas de chocolate branco belga.",
      priceBase: 45.00,
      image: chocolateStrawberryImg,
      popular: true,
      ingredients: ["Nutella", "Morangos Frescos", "Chocolate Branco Belga"]
    },
    {
      id: "banana-canela",
      name: "Banoffee della Nonna",
      category: "Doce",
      description: "Fatias finas de banana prata caramelizadas com canela em pó, doce de leite artesanal argentino Viçosa e uma leve camada de marshmallow maçaricado.",
      priceBase: 42.00,
      image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=400",
      ingredients: ["Doce de Leite", "Bananas", "Canela em Pó", "Marshmallow"]
    },
    {
      id: "crostini-alecrim",
      name: "Crostini di Parma & Alecrim",
      category: "Entrada",
      description: "Fina massa de pizza assada com sal grosso marinho, alecrim fresco da nossa horta, azeite extra virgem e fatias de presunto de Parma curado.",
      priceBase: 24.00,
      image: "https://images.unsplash.com/photo-1573145959313-71f654b9d316?auto=format&fit=crop&q=80&w=400",
      ingredients: ["Massa Fina", "Alecrim", "Presunto de Parma", "Sal Grosso"]
    },
    {
      id: "refrigerante-lata",
      name: "Coca-Cola Zero Lata",
      category: "Bebida",
      description: "Lata 350ml trincando de gelada.",
      priceBase: 6.50,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400",
      ingredients: ["Refrigerante", "Gelo e Limão opcional"]
    },
    {
      id: "suco-natural",
      name: "Suco Natural de Laranja",
      category: "Bebida",
      description: "Suco natural espremido na hora da fruta selecionada, sem conservantes, garrafa de 500ml.",
      priceBase: 9.90,
      image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&q=80&w=400",
      ingredients: ["Laranja Pura", "Gelo"]
    },
    {
      id: "cerveja-artesanal",
      name: "Cerveja IPA Forno & Brasa",
      category: "Bebida",
      description: "Nossa cerveja artesanal exclusiva, estilo India Pale Ale, com aroma cítrico marcante e amargor encorpado de 600ml.",
      priceBase: 18.00,
      image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&q=80&w=400",
      ingredients: ["Malte", "Lúpulo selecionado", "Água mineral"]
    }
  ];

  const extrasList = [
    { name: "Mussarela Extra", price: 6.00 },
    { name: "Bacon Picadinho", price: 5.00 },
    { name: "Catupiry Adicional", price: 7.00 },
    { name: "Azeitonas Pretas sem Caroço", price: 3.00 }
  ];

  const sizeMultipliers = {
    "Broto": 0.7, // 30% discount
    "Média": 0.9, // 10% discount
    "Grande": 1.0  // Base price
  };

  const crustSurcharges = {
    "Tradicional": 0.00,
    "Catupiry": 8.00,
    "Cheddar": 8.00,
    "Chocolate": 10.00
  };

  // Filter items
  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Open item customizer
  const openCustomizer = (item: MenuItem) => {
    setSelectedItem(item);
    setSelectedSize("Grande");
    setSelectedCrust("Tradicional");
    setSelectedExtras([]);
    setQuantity(1);
    setItemNotes("");
  };

  // Calculate customized unit price
  const getCustomizedPrice = () => {
    if (!selectedItem) return 0;
    const sizeMultiplier = sizeMultipliers[selectedSize];
    const crustPrice = crustSurcharges[selectedCrust];
    const extrasPrice = selectedExtras.reduce((sum, name) => {
      const extra = extrasList.find(e => e.name === name);
      return sum + (extra ? extra.price : 0);
    }, 0);

    return (selectedItem.priceBase * sizeMultiplier) + crustPrice + extrasPrice;
  };

  // Add to cart
  const handleAddToCart = () => {
    if (!selectedItem) return;
    
    const pricePerUnit = getCustomizedPrice();
    const cartItemId = `${selectedItem.id}-${selectedSize}-${selectedCrust}-${selectedExtras.sort().join(",")}`;

    const existingIndex = cart.findIndex(item => item.id === cartItemId);

    if (existingIndex > -1) {
      // Update quantity of existing custom item
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // Add as new item
      const newItem: CartItem = {
        id: cartItemId,
        menuItem: selectedItem,
        size: selectedSize,
        crust: selectedCrust,
        extras: [...selectedExtras],
        quantity: quantity,
        pricePerUnit: pricePerUnit,
        notes: itemNotes
      };
      setCart([...cart, newItem]);
    }

    setSelectedItem(null);
    setIsCartOpen(true); // Open cart sidebar to show action success
  };

  // Edit quantity in cart
  const updateCartQuantity = (itemId: string, change: number) => {
    const updated = cart.map(item => {
      if (item.id === itemId) {
        const newQty = item.quantity + change;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[];
    setCart(updated);
  };

  // Total cart price
  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.pricePerUnit * item.quantity), 0);
  };

  // Total items count
  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Send order to WhatsApp
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || (orderMethod === "Entrega" && !deliveryAddress)) return;

    // Build elegant message
    let message = `🍕 *PEDIDO FORNO & BRASA PIZZARIA* 🍕\n\n`;
    message += `👤 *Cliente:* ${customerName}\n`;
    message += `📞 *Telefone:* ${customerPhone}\n`;
    message += `🚚 *Método:* ${orderMethod}\n`;
    
    if (orderMethod === "Entrega") {
      message += `📍 *Endereço:* ${deliveryAddress}\n`;
    }
    
    message += `💳 *Pagamento:* ${paymentMethod}\n`;
    if (paymentMethod === "Dinheiro" && changeFor) {
      message += `💵 *Troco para:* R$ ${changeFor}\n`;
    }
    
    message += `\n📋 *ITENS DO PEDIDO:*\n`;
    
    cart.forEach((item, index) => {
      message += `\n${index + 1}x *${item.menuItem.name}*\n`;
      message += `   • Tamanho: ${item.size}\n`;
      if (item.menuItem.category === "Salgada" || item.menuItem.category === "Doce") {
        message += `   • Borda: ${item.crust}\n`;
      }
      if (item.extras.length > 0) {
        message += `   • Extras: ${item.extras.join(", ")}\n`;
      }
      if (item.notes) {
        message += `   • Obs: _"${item.notes}"_\n`;
      }
      message += `   • Preço un: R$ ${item.pricePerUnit.toFixed(2)}\n`;
    });

    const deliveryFee = orderMethod === "Entrega" ? 7.00 : 0;
    const total = getCartTotal() + deliveryFee;

    message += `\n-------------------------------\n`;
    if (orderMethod === "Entrega") {
      message += `Subtotal: R$ ${getCartTotal().toFixed(2)}\n`;
      message += `Taxa de Entrega: R$ ${deliveryFee.toFixed(2)}\n`;
    }
    message += `*TOTAL GERAL: R$ ${total.toFixed(2)}*`;

    // Open WhatsApp API
    window.open(`https://wa.me/5515997118125?text=${encodeURIComponent(message)}`, "_blank");
    setOrderPlaced(true);
    setCart([]);
    setTimeout(() => {
      setOrderPlaced(false);
      setIsCartOpen(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#0E1015] text-[#E4E6EB] font-sans antialiased relative selection:bg-red-600/30 selection:text-red-500">
      
      {/* Dynamic fire themed accent top line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 fixed top-0 left-0 right-0 z-50 animate-pulse" />

      {/* Voltar ao Hub Developer overlay */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-3 py-2 bg-black/95 text-white hover:bg-black border border-white/10 rounded-lg shadow-2xl text-xs font-mono tracking-wider transition-all duration-300 group hover:border-red-500/40"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-red-500 group-hover:-translate-x-1 transition-transform" />
          <span className="text-white/60 group-hover:text-white">VOLTAR AO HUB</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        </button>
      </div>

      {/* Floating cart trigger button on Mobile */}
      {getCartItemCount() > 0 && !isCartOpen && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-30 lg:hidden py-4 px-6 rounded-full bg-red-600 text-white font-sans text-sm font-bold flex items-center space-x-2 shadow-2xl border border-red-500/30 cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 bg-white text-red-600 font-mono text-[9px] font-black rounded-full h-4.5 w-4.5 flex items-center justify-center border border-red-600 animate-bounce">
              {getCartItemCount()}
            </span>
          </div>
          <span>Ver Sacola (R$ {getCartTotal().toFixed(2)})</span>
        </motion.button>
      )}

      {/* HERO / HEADER SECTION */}
      <header className="relative bg-[#13161C] border-b border-white/5 py-12 px-6 md:px-12 overflow-hidden text-center">
        {/* Fire graphics / glowing ambient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.08),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col items-center space-y-3">
            <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center text-white shadow-lg animate-pulse">
              <Pizza className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2">
                FORNO & BRASA
              </h1>
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#FFA14A] uppercase font-bold block">
                PIZZARIA ARTESANAL & WOOD-FIRED
              </span>
            </div>
          </div>

          <p className="font-sans text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Ingredientes 100% italianos, massa com longa fermentação de 48h, borda crocante e assada no forno a lenha clássico a 450°C. Customize e peça pelo WhatsApp!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[10px] text-gray-500 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <Clock className="h-3.5 w-3.5 text-red-500" />
              <span>35 - 50 MINUTOS</span>
            </div>
            <div>•</div>
            <div className="flex items-center space-x-1.5">
              <MapPin className="h-3.5 w-3.5 text-red-500" />
              <span>SÃO PAULO / SP</span>
            </div>
            <div>•</div>
            <div className="flex items-center space-x-1.5 text-green-500">
              <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-ping" />
              <span>ABERTO AGORA</span>
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH AND CATEGORIES TAB BAR */}
      <section className="sticky top-0 bg-[#0E1015]/95 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: "Salgada", label: "🍕 Pizzas Salgadas" },
              { id: "Doce", label: "🍓 Pizzas Doces" },
              { id: "Entrada", label: "🥖 Entradas" },
              { id: "Bebida", label: "🥤 Bebidas" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`py-2 px-4 rounded-lg font-mono text-[11px] font-extrabold uppercase tracking-widest border transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === tab.id
                    ? "bg-red-600 text-white border-red-600 shadow-md"
                    : "bg-[#13161C] text-gray-400 border-white/5 hover:border-red-500/30 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative bg-[#13161C] border border-white/10 rounded-lg px-3 py-2 flex items-center space-x-2 max-w-sm w-full">
            <Search className="h-4 w-4 text-gray-500" />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar pizza ou ingrediente..."
              className="bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none w-full"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="text-gray-500 hover:text-white text-xs">
                ✕
              </button>
            )}
          </div>

        </div>
      </section>

      {/* MENU AND CART SIDEBAR CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Area: Menu Grid */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-red-500 font-extrabold tracking-[0.2em] uppercase block">
              // VITRINE DIGITAL
            </span>
            <h2 className="font-serif text-2xl font-bold text-white">
              {activeCategory === "Salgada" && "Nossas Pizzas Salgadas"}
              {activeCategory === "Doce" && "Sobremesas & Pizzas Doces"}
              {activeCategory === "Entrada" && "Crostinis & Antepastos"}
              {activeCategory === "Bebida" && "Sucos & Bebidas Trincando"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMenuItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                className="bg-[#13161C] rounded-xl border border-white/5 overflow-hidden flex flex-col justify-between hover:border-red-500/30 transition-all duration-300 group shadow-md"
              >
                {/* Photo */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {item.popular && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[8px] uppercase tracking-wider font-extrabold flex items-center space-x-1 shadow-md">
                      <Flame className="h-3 w-3 fill-current" />
                      <span>O MAIS PEDIDO</span>
                    </div>
                  )}
                </div>

                {/* Info and action */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-serif text-base font-bold text-white group-hover:text-red-400 transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-mono text-sm font-black text-[#FFA14A] whitespace-nowrap">
                        A partir de R$ {item.priceBase.toFixed(2)}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Ingredients chips */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.ingredients.map((ing, idx) => (
                      <span key={idx} className="font-mono text-[9px] text-gray-500 bg-white/[0.02] border border-white/5 rounded px-1.5 py-0.5">
                        {ing}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => openCustomizer(item)}
                    className="w-full py-2.5 rounded-lg bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Adicionar & Customizar</span>
                  </button>
                </div>
              </motion.div>
            ))}

            {filteredMenuItems.length === 0 && (
              <div className="col-span-full py-16 text-center space-y-3">
                <p className="font-mono text-xs text-gray-500">Nenhum item localizado no momento.</p>
                <button onClick={() => setSearchTerm("")} className="text-xs text-red-500 font-bold underline">
                  Limpar busca
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Right Area: Desktop Cart Panel / Sticky sidebar */}
        <div className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-24 bg-[#13161C] border border-white/5 rounded-xl p-6 space-y-6 max-h-[80vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5 text-red-500" />
                  <h3 className="font-serif text-lg font-bold text-white">Minha Sacola</h3>
                </div>
                <span className="font-mono text-[11px] font-bold text-gray-400 bg-white/[0.04] py-0.5 px-2 rounded-full">
                  {getCartItemCount()} itens
                </span>
              </div>

              {/* Cart List */}
              <div className="divide-y divide-white/5 overflow-y-auto max-h-[40vh] py-2 scrollbar-none space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-left space-y-0.5">
                        <h4 className="font-serif text-xs font-bold text-white">{item.menuItem.name}</h4>
                        <span className="font-mono text-[9px] text-[#FFA14A] uppercase font-bold block">
                          Tamanho: {item.size} // Borda: {item.crust}
                        </span>
                        {item.extras.length > 0 && (
                          <span className="font-mono text-[9px] text-gray-500 block">
                            + {item.extras.join(", ")}
                          </span>
                        )}
                        {item.notes && (
                          <span className="font-sans text-[10px] italic text-gray-500 block mt-1">
                            &ldquo;{item.notes}&rdquo;
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs font-bold text-white whitespace-nowrap">
                        R$ {(item.pricePerUnit * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 border border-white/10 rounded px-2 py-0.5">
                        <button 
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="text-gray-400 hover:text-white text-xs"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-mono text-xs font-bold text-white w-4 text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="text-gray-400 hover:text-white text-xs"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button 
                        onClick={() => updateCartQuantity(item.id, -item.quantity)}
                        className="font-mono text-[9px] text-gray-500 hover:text-red-500 uppercase font-bold"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}

                {cart.length === 0 && !orderPlaced && (
                  <div className="py-12 text-center space-y-2">
                    <p className="font-mono text-xs text-gray-500">Sua sacola está vazia.</p>
                    <p className="font-sans text-[11px] text-gray-600 leading-relaxed">Adicione itens para começar seu pedido gastronômico.</p>
                  </div>
                )}

                {orderPlaced && (
                  <div className="py-12 text-center text-green-500 space-y-2">
                    <Check className="h-8 w-8 mx-auto animate-bounce text-green-500" />
                    <p className="font-serif text-sm font-bold text-white">Pedido enviado ao WhatsApp!</p>
                    <p className="font-sans text-[11px] text-gray-400">Em instantes nosso atendimento oficial confirmará seu Pix ou agendará sua entrega.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Total and Checkout Form trigger */}
            {cart.length > 0 && (
              <div className="border-t border-white/10 pt-4 space-y-4 text-left">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-gray-400 font-bold uppercase">Subtotal</span>
                  <span className="text-white font-bold">R$ {getCartTotal().toFixed(2)}</span>
                </div>
                
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-gray-400 font-bold uppercase">Taxa de Entrega</span>
                  <span className="text-white font-bold">{orderMethod === "Entrega" ? "R$ 7,00" : "Grátis"}</span>
                </div>

                <div className="flex items-center justify-between font-serif text-base border-t border-white/5 pt-2">
                  <span className="text-white font-extrabold">Total</span>
                  <span className="text-[#FFA14A] font-black">
                    R$ {(getCartTotal() + (orderMethod === "Entrega" ? 7.00 : 0)).toFixed(2)}
                  </span>
                </div>

                {/* Quick Checkout Form inline */}
                <form onSubmit={handlePlaceOrder} className="space-y-3 pt-2 text-left">
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setOrderMethod("Entrega")}
                      className={`py-2 rounded font-mono text-[9px] uppercase tracking-wider font-extrabold border ${
                        orderMethod === "Entrega" ? "bg-red-600/20 text-white border-red-500" : "bg-black/20 text-gray-500 border-white/5"
                      }`}
                    >
                      🛵 Entrega
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderMethod("Retirada")}
                      className={`py-2 rounded font-mono text-[9px] uppercase tracking-wider font-extrabold border ${
                        orderMethod === "Retirada" ? "bg-red-600/20 text-white border-red-500" : "bg-black/20 text-gray-500 border-white/5"
                      }`}
                    >
                      🛍 Retirada
                    </button>
                  </div>

                  <input 
                    type="text" 
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Seu Nome Completo *"
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                  />

                  <input 
                    type="tel" 
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Seu Celular / WhatsApp *"
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                  />

                  {orderMethod === "Entrega" && (
                    <input 
                      type="text" 
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Rua, Número, Bairro, Ap/Bloco *"
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                    />
                  )}

                  <div className="space-y-1">
                    <label className="font-mono text-[8px] text-gray-500 uppercase tracking-widest block font-bold">Forma de Pagamento</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-full bg-[#1C1F26] border border-white/10 rounded-lg py-2 px-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="Pix">📱 Pix (com desconto de R$ 2,00)</option>
                      <option value="Cartão Crédito">💳 Cartão de Crédito (na entrega)</option>
                      <option value="Cartão Débito">💳 Cartão de Débito (na entrega)</option>
                      <option value="Dinheiro">💵 Dinheiro (físico)</option>
                    </select>
                  </div>

                  {paymentMethod === "Dinheiro" && (
                    <input 
                      type="text" 
                      value={changeFor}
                      onChange={(e) => setChangeFor(e.target.value)}
                      placeholder="Troco para quanto?"
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                    />
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded bg-red-600 hover:bg-red-500 text-white font-sans text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <MessageSquare className="h-4.5 w-4.5 fill-current" />
                    <span>Enviar Pedido ao WhatsApp</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

      </main>

      {/* MOBILE DRIFTING CART SIDEBAR OVERLAY */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end lg:hidden"
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-[#13161C] border-l border-white/10 max-w-sm w-full h-full p-6 flex flex-col justify-between relative text-left"
            >
              <button 
                onClick={() => setIsCartOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex-1 overflow-y-auto space-y-6 pt-6">
                <div className="flex items-center space-x-2 border-b border-white/10 pb-4">
                  <ShoppingBag className="h-5 w-5 text-red-500" />
                  <h3 className="font-serif text-lg font-bold text-white">Minha Sacola</h3>
                  <span className="font-mono text-xs font-bold text-gray-400">({getCartItemCount()})</span>
                </div>

                {/* Cart items list */}
                <div className="divide-y divide-white/5 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-4 first:pt-0 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-serif text-xs font-bold text-white">{item.menuItem.name}</h4>
                          <span className="font-mono text-[9px] text-[#FFA14A] uppercase font-bold block">
                            Tamanho: {item.size} // Borda: {item.crust}
                          </span>
                          {item.extras.length > 0 && (
                            <span className="font-mono text-[9px] text-gray-500 block">
                              + {item.extras.join(", ")}
                            </span>
                          )}
                          {item.notes && (
                            <span className="font-sans text-[10px] italic text-gray-500 block mt-1">
                              &ldquo;{item.notes}&rdquo;
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs font-bold text-white">
                          R$ {(item.pricePerUnit * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 border border-white/10 rounded px-2 py-0.5">
                          <button onClick={() => updateCartQuantity(item.id, -1)} className="text-gray-400">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-mono text-xs font-bold text-white w-4 text-center">
                            {item.quantity}
                          </span>
                          <button onClick={() => updateCartQuantity(item.id, 1)} className="text-gray-400">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => updateCartQuantity(item.id, -item.quantity)}
                          className="font-mono text-[9px] text-gray-500 uppercase font-bold"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}

                  {cart.length === 0 && !orderPlaced && (
                    <div className="py-12 text-center text-gray-500 text-xs">Sua sacola está vazia no momento.</div>
                  )}

                  {orderPlaced && (
                    <div className="py-12 text-center text-green-500 space-y-2">
                      <Check className="h-8 w-8 mx-auto animate-bounce text-green-500" />
                      <p className="font-serif text-sm font-bold text-white">Pedido enviado ao WhatsApp!</p>
                    </div>
                  )}
                </div>
              </div>

              {cart.length > 0 && (
                <div className="border-t border-white/10 pt-4 space-y-4">
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white">R$ {getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Taxa de Entrega</span>
                      <span className="text-white">{orderMethod === "Entrega" ? "R$ 7,00" : "Grátis"}</span>
                    </div>
                    <div className="flex justify-between font-serif text-sm border-t border-white/5 pt-1.5">
                      <span className="text-white font-bold">Total</span>
                      <span className="text-[#FFA14A] font-black">R$ {(getCartTotal() + (orderMethod === "Entrega" ? 7.00 : 0)).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Quick Checkout Form Mobile */}
                  <form onSubmit={handlePlaceOrder} className="space-y-2.5 text-left">
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setOrderMethod("Entrega")}
                        className={`py-2 rounded font-mono text-[9px] uppercase tracking-wider font-extrabold border ${
                          orderMethod === "Entrega" ? "bg-red-600/20 text-white border-red-500" : "bg-black/20 text-gray-500 border-white/5"
                        }`}
                      >
                        🛵 Entrega
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderMethod("Retirada")}
                        className={`py-2 rounded font-mono text-[9px] uppercase tracking-wider font-extrabold border ${
                          orderMethod === "Retirada" ? "bg-red-600/20 text-white border-red-500" : "bg-black/20 text-gray-500 border-white/5"
                        }`}
                      >
                        🛍 Retirada
                      </button>
                    </div>

                    <input 
                      type="text" 
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Seu Nome Completo *"
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                    />

                    <input 
                      type="tel" 
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Seu Celular / WhatsApp *"
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                    />

                    {orderMethod === "Entrega" && (
                      <input 
                        type="text" 
                        required
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Rua, Número, Bairro *"
                        className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                      />
                    )}

                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-full bg-[#1C1F26] border border-white/10 rounded-lg py-2 px-2.5 text-xs text-white"
                    >
                      <option value="Pix">📱 Pix (com desconto de R$ 2,00)</option>
                      <option value="Cartão Crédito">💳 Cartão Crédito (na entrega)</option>
                      <option value="Cartão Débito">💳 Cartão Débito (na entrega)</option>
                      <option value="Dinheiro">💵 Dinheiro (físico)</option>
                    </select>

                    <button
                      type="submit"
                      className="w-full py-3 rounded bg-red-600 hover:bg-red-500 text-white font-sans text-xs font-black uppercase tracking-wider transition-all"
                    >
                      Enviar Pedido ao WhatsApp
                    </button>
                  </form>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CUSTOMIZE ITEM MODAL */}
      <AnimatePresence>
        {selectedItem !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#13161C] border border-white/10 rounded-xl p-6 md:p-8 max-w-2xl w-full text-left relative max-h-[90vh] overflow-y-auto shadow-2xl space-y-6"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Visual */}
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden aspect-[16/10] shadow-md border border-white/5">
                    <img 
                      src={selectedItem.image} 
                      alt={selectedItem.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-[#FFA14A] font-bold uppercase tracking-widest block">
                      {selectedItem.category === "Salgada" ? "🍕 Pizza Salgada" : "🍓 Pizza Doce"}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white">{selectedItem.name}</h3>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed mt-1">{selectedItem.description}</p>
                  </div>
                </div>

                {/* Selections */}
                <div className="space-y-4">
                  
                  {/* Sizing selection */}
                  {(selectedItem.category === "Salgada" || selectedItem.category === "Doce") && (
                    <div className="space-y-1.5 text-left">
                      <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-extrabold block">Tamanho da Pizza *</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "Broto", label: "Broto (4 fatias)", sub: "70% valor" },
                          { id: "Média", label: "Média (6 fatias)", sub: "90% valor" },
                          { id: "Grande", label: "Grande (8 fatias)", sub: "Valor cheio" }
                        ].map((sz) => (
                          <button
                            key={sz.id}
                            type="button"
                            onClick={() => setSelectedSize(sz.id as any)}
                            className={`p-2 rounded-lg border text-center transition-all cursor-pointer flex flex-col justify-between h-14 ${
                              selectedSize === sz.id 
                                ? "bg-red-600/10 border-red-500 text-white" 
                                : "bg-black/20 border-white/5 text-gray-400 hover:border-white/10"
                            }`}
                          >
                            <span className="font-mono text-[10px] font-bold block">{sz.id}</span>
                            <span className="font-sans text-[8px] text-gray-500 block leading-tight">{sz.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Crust selection */}
                  {(selectedItem.category === "Salgada" || selectedItem.category === "Doce") && (
                    <div className="space-y-1.5 text-left">
                      <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-extrabold block">Borda Recheada *</label>
                      <select
                        value={selectedCrust}
                        onChange={(e) => setSelectedCrust(e.target.value as any)}
                        className="w-full bg-[#1C1F26] border border-white/10 rounded-lg py-2 px-2.5 text-xs text-white"
                      >
                        <option value="Tradicional">Tradicional (sem recheio)</option>
                        <option value="Catupiry">Borda de Catupiry Original (+ R$ 8,00)</option>
                        <option value="Cheddar">Borda de Cheddar Defumado (+ R$ 8,00)</option>
                        {selectedItem.category === "Doce" && (
                          <option value="Chocolate">Borda de Chocolate ao Leite (+ R$ 10,00)</option>
                        )}
                      </select>
                    </div>
                  )}

                  {/* Extra toppings list */}
                  {(selectedItem.category === "Salgada" || selectedItem.category === "Doce") && (
                    <div className="space-y-1.5 text-left">
                      <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-extrabold block">Adicionais / Extras</label>
                      <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                        {extrasList.map((extra) => {
                          const isChecked = selectedExtras.includes(extra.name);
                          return (
                            <button
                              key={extra.name}
                              type="button"
                              onClick={() => {
                                if (isChecked) {
                                  setSelectedExtras(selectedExtras.filter(e => e !== extra.name));
                                } else {
                                  setSelectedExtras([...selectedExtras, extra.name]);
                                }
                              }}
                              className={`w-full flex items-center justify-between p-2 rounded-lg border text-left transition-all ${
                                isChecked 
                                  ? "bg-red-600/5 border-red-500/50 text-white" 
                                  : "bg-black/10 border-white/5 text-gray-400 hover:bg-black/20"
                              }`}
                            >
                              <div className="flex items-center space-x-2 text-xs">
                                <div className={`h-4 w-4 rounded border flex items-center justify-center ${isChecked ? "bg-red-600 border-red-600" : "border-white/20"}`}>
                                  {isChecked && <Check className="h-3 w-3 text-white" />}
                                </div>
                                <span>{extra.name}</span>
                              </div>
                              <span className="font-mono text-[10px] text-[#FFA14A]">+ R$ {extra.price.toFixed(2)}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Special notes */}
                  <div className="space-y-1.5 text-left">
                    <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-extrabold block">Observações do Item</label>
                    <input 
                      type="text"
                      value={itemNotes}
                      onChange={(e) => setItemNotes(e.target.value)}
                      placeholder="Ex: Sem cebola, bem assada, etc."
                      className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-3 text-xs text-white placeholder-gray-600 focus:outline-none"
                    />
                  </div>

                </div>
              </div>

              {/* Total and Action row */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 border border-white/10 rounded-lg p-1.5 bg-black/20">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-1.5 text-gray-400 hover:text-white"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-mono text-sm font-black text-white w-6 text-center">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="p-1.5 text-gray-400 hover:text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-left">
                    <span className="font-mono text-[8px] text-gray-500 uppercase tracking-wider block">Valor Total do Item</span>
                    <span className="font-serif text-lg font-black text-[#FFA14A]">
                      R$ {(getCustomizedPrice() * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="py-3 px-5 rounded-lg hover:bg-white/5 text-gray-400 font-sans text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Cancelar
                  </button>
                  
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 sm:flex-initial py-3.5 px-6 rounded-lg bg-red-600 hover:bg-red-500 text-white font-sans text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Adicionar à Sacola</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-black text-gray-600 py-12 border-t border-white/5 text-center text-xs space-y-4">
        <p className="font-serif text-white tracking-widest text-sm uppercase">FORNO & BRASA PIZZARIA ARTESANAL</p>
        <p className="font-mono text-[9px] uppercase tracking-wider">CRECI/CNPJ nº 45.890-J // Todos os direitos reservados</p>
      </footer>

    </div>
  );
}
