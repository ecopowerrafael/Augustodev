import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  ShoppingBag, 
  Heart, 
  Search, 
  SlidersHorizontal, 
  ChevronRight, 
  Sparkles, 
  Trash2, 
  Plus, 
  Minus, 
  Check, 
  MapPin, 
  CreditCard, 
  QrCode, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Star, 
  Layers, 
  Maximize2, 
  X, 
  Info, 
  RefreshCw,
  Home,
  CheckCircle,
  Copy,
  Eye,
  Lock,
  Compass,
  ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Curated Art Product Interface
interface Quadro {
  id: string;
  title: string;
  artist: string;
  category: "minimalista" | "abstrato" | "natureza" | "geometrico" | "fotografia";
  priceBase: number; // Smallest size base price (print only)
  image: string;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  bestSeller?: boolean;
  technique: string; // e.g. "Giclée s/ Papel de Algodão 310g"
  year: string;
  description: string;
  dimensionsAvailable: string[];
}

interface CartItem {
  id: string; // combination of product + size + frame
  quadro: Quadro;
  size: { name: string; label: string; multiplier: number; sizeStr: string };
  frame: { name: string; label: string; priceAdd: number; hex: string; desc: string };
  quantity: number;
}

// Highly Curated Artistic Works Database
const QUADROS_DB: Quadro[] = [
  {
    id: "aura-01",
    title: "Ondas de Terracota",
    artist: "Ateliê Clara Valente",
    category: "abstrato",
    priceBase: 180.00,
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviewsCount: 88,
    featured: true,
    bestSeller: true,
    technique: "Giclée s/ Papel de Algodão Hahnemühle 310g",
    year: "2025",
    description: "Uma sinfonia visual de terracota mineral, areia vulcânica e pigmentos de ocre. Os traços orgânicos simulam os efeitos do vento sobre dunas, trazendo calor, fluidez e refinamento aos ambientes.",
    dimensionsAvailable: ["30x40cm", "50x70cm", "90x120cm", "120x160cm"]
  },
  {
    id: "aura-02",
    title: "Silhueta de Eucalipto",
    artist: "Estúdio Seiva & Traço",
    category: "minimalista",
    priceBase: 140.00,
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviewsCount: 142,
    featured: true,
    technique: "Impressão Fine-Art Pigmentada s/ Papel Matte Fosco 230g",
    year: "2025",
    description: "Expressão minimalista de silhuetas florais sobre um fundo cru off-white. Uma peça leve, que celebra a beleza da imperfeição botânica e introduz frescor sereno a escritórios e salas de leitura.",
    dimensionsAvailable: ["30x40cm", "50x70cm", "90x120cm"]
  },
  {
    id: "aura-03",
    title: "Névoa Matinal no Vale",
    artist: "Julio Cesar Prado",
    category: "natureza",
    priceBase: 220.00,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    rating: 5.0,
    reviewsCount: 96,
    bestSeller: true,
    technique: "Fotografia Fine-Art s/ Canvas de Linho Natural",
    year: "2024",
    description: "Fotografia contemplativa de montanhas submersas pela neblina ao amanhecer nas serras brasileiras. Uma tomada que captura a luz dourada difusa e promove sensação absoluta de quietude e amplitude vertical.",
    dimensionsAvailable: ["50x70cm", "90x120cm", "120x160cm"]
  },
  {
    id: "aura-04",
    title: "Composição Bauhaus VII",
    artist: "Arquiteto Henrique Lira",
    category: "geometrico",
    priceBase: 165.00,
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    reviewsCount: 54,
    technique: "Serigrafia Digital s/ Papel Linho Texturizado 280g",
    year: "2024",
    description: "Estudo formal de linhas ortogonais, esferas em declínio e cores primárias atenuadas pela pátina do tempo. Homenagem direta à escola de Weimar, ideal para interiores contemporâneos e de arquitetura brutalista.",
    dimensionsAvailable: ["30x40cm", "50x70cm", "90x120cm"]
  },
  {
    id: "aura-05",
    title: "Horizonte Fluido",
    artist: "Marina Nobre Silva",
    category: "fotografia",
    priceBase: 240.00,
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviewsCount: 110,
    featured: true,
    technique: "Fotografia Fine-Art s/ Papel Lustre Canson 240g",
    year: "2025",
    description: "Registro aéreo minimalista da convergência pacífica entre areia clara e águas azul-turquesa sob a luz difusa do entardecer. Transmite frescor oceânico imaculado com rigoroso equilíbrio cromático.",
    dimensionsAvailable: ["50x70cm", "90x120cm", "120x160cm"]
  },
  {
    id: "aura-06",
    title: "Abstração Rosa e Grafite",
    artist: "Zoraide Lemos",
    category: "abstrato",
    priceBase: 195.00,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    reviewsCount: 39,
    technique: "Giclée de Pintura Acrílica s/ Canvas Premium",
    year: "2025",
    description: "Gestos livres e texturas marcadas de tinta acrílica em tons de rosa poeira, carvão vegetal e pinceladas salpicadas de cobre. Uma obra vigorosa e elegante projetada para ancorar a decoração de salas corporativas.",
    dimensionsAvailable: ["30x40cm", "50x70cm", "90x120cm", "120x160cm"]
  },
  {
    id: "aura-07",
    title: "Arcos de Concreto e Luz",
    artist: "Pedro Fontana",
    category: "fotografia",
    priceBase: 210.00,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    reviewsCount: 47,
    featured: true,
    technique: "Fotografia Arquitetônica Fine-Art s/ Papel Algodão 310g",
    year: "2024",
    description: "Estudo sutil de luz e sombra desenhando arcos de concreto brutalista em um final de tarde dourado. Linhas curvas perfeitas, jogo de sombras profundas e textura de concreto esculpido pela luz solar.",
    dimensionsAvailable: ["50x70cm", "90x120cm"]
  },
  {
    id: "aura-08",
    title: "Minimalismo Orgânico Verde",
    artist: "Studio Seiva & Traço",
    category: "minimalista",
    priceBase: 150.00,
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    reviewsCount: 71,
    technique: "Impressão de Nanquim s/ Papel Textura Linho 280g",
    year: "2025",
    description: "Ilustração minimalista de folhagem exótica executada com delicadas pinceladas de nanquim verde-oliva sobre fundo bege mineral de alta resolução. Sofisticação pacífica para cabeceiras de cama.",
    dimensionsAvailable: ["30x40cm", "50x70cm", "90x120cm"]
  }
];

// Sizes Options with Real Architectural Ratios
const SIZES = [
  { name: "P", label: "Pequeno (30x40 cm)", multiplier: 1.0, sizeStr: "30x40 cm", wallWidth: "w-28 sm:w-32" },
  { name: "M", label: "Médio (50x70 cm)", multiplier: 1.5, sizeStr: "50x70 cm", wallWidth: "w-40 sm:w-48" },
  { name: "G", label: "Grande (90x120 cm)", multiplier: 2.3, sizeStr: "90x120 cm", wallWidth: "w-60 sm:w-72" },
  { name: "GG", label: "Colecionador (120x160 cm)", multiplier: 3.2, sizeStr: "120x160 cm", wallWidth: "w-80 sm:w-96" }
];

// Luxury Frame Finishings (Madeira Maciça Selada)
const FRAMES = [
  { name: "canvas", label: "Borda Infinita (Apenas Canvas Esticado)", priceAdd: 0, class: "border-[2px] border-stone-200/40 shadow-xl", hex: "#EAE6DF", desc: "Montagem clássica em chassi de madeira oculta sem moldura visível" },
  { name: "preto", label: "Ébano Mate (Madeira Maciça Preta)", priceAdd: 65.0, class: "border-[12px] border-stone-900 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] ring-1 ring-stone-950", hex: "#1C1917", desc: "Madeira nobre pintada com laca preta fosca de textura aveludada" },
  { name: "carvalho", label: "Freijó Natural (Madeira Maciça Clara)", priceAdd: 85.0, class: "border-[12px] border-[#D7C49E] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)] ring-1 ring-[#c0ab83]", hex: "#D2B48C", desc: "Madeira certificada com veios aparentes e selador fosco de toque suave" },
  { name: "branco", label: "Alabastro Clean (Madeira Maciça Branca)", priceAdd: 65.0, class: "border-[12px] border-stone-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] ring-1 ring-stone-200", hex: "#FAF8F6", desc: "Acabamento minimalista em laca branca fosca ideal para paredes coloridas" },
  { name: "ouro", label: "Champagne Ouro Envelhecido (Metalizado)", priceAdd: 120.0, class: "border-[12px] border-amber-200/90 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-amber-300/40", hex: "#C5A880", desc: "Moldura sofisticada com folha metálica escovada artesanalmente" }
];

// Immersive Wall Simulator Room Presets with High-End Aesthetic
const ROOMS = [
  { 
    id: "living", 
    name: "Living Contemporâneo", 
    bgClass: "bg-stone-200/40", 
    visual: (
      <div className="absolute bottom-0 left-0 right-0 h-[38%] bg-stone-900/10 pointer-events-none flex flex-col justify-end">
        {/* Simplified modern designer sofa representation */}
        <div className="w-11/12 max-w-2xl mx-auto bg-stone-100 border border-stone-200 rounded-t-2xl shadow-xl p-5 flex flex-col justify-between">
          <div className="h-4 bg-stone-200/50 rounded-full w-1/3 mx-auto mb-2" />
          <div className="flex justify-between items-center text-[10px] text-stone-400 font-mono tracking-widest uppercase">
            <span>🛋️ Sofá de Linho Italiano</span>
            <span>Espaço de Convivência</span>
          </div>
        </div>
      </div>
    )
  },
  { 
    id: "bedroom", 
    name: "Suíte Minimalista", 
    bgClass: "bg-[#F5F2EB]/50", 
    visual: (
      <div className="absolute bottom-0 left-0 right-0 h-[32%] bg-stone-900/5 pointer-events-none flex flex-col justify-end">
        {/* Bed headboard representation */}
        <div className="w-10/12 max-w-xl mx-auto bg-stone-800 border-t-2 border-stone-700/50 rounded-t-xl shadow-2xl p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center text-[9px] text-stone-400 font-mono uppercase tracking-widest">
            <span>🛏️ Cabeceira Estofada Camurça</span>
            <span>Suíte Principal</span>
          </div>
        </div>
      </div>
    )
  },
  { 
    id: "office", 
    name: "Gabinete de Arquitetura", 
    bgClass: "bg-stone-300/30", 
    visual: (
      <div className="absolute bottom-0 left-0 right-0 h-[25%] bg-stone-900/15 pointer-events-none flex flex-col justify-end">
        {/* Clean wooden console desk */}
        <div className="w-9/12 max-w-lg mx-auto bg-[#c5a880]/90 border-t border-[#bfa27a] rounded-t shadow-md p-3 flex justify-between items-center text-[9px] text-stone-800 font-mono uppercase tracking-widest">
          <span>🪵 Consola em Madeira Maciça</span>
          <span>Ateliê Criativo</span>
        </div>
      </div>
    )
  }
];

// Architectural Mineral Wall Colors
const WALL_COLORS = [
  { id: "gesso", name: "Branco Cal", hex: "#FAF9F5", bgClass: "bg-[#FAF9F5]" },
  { id: "quartzo", name: "Areia de Quartzo", hex: "#F2EDE4", bgClass: "bg-[#F2EDE4]" },
  { id: "salvia", name: "Verde Sálvia Silvestre", hex: "#4E584E", bgClass: "bg-[#4E584E]" },
  { id: "indigo", name: "Azul Índigo Mineral", hex: "#323C46", bgClass: "bg-[#323C46]" },
  { id: "xisto", name: "Cinza Xisto Escuro", hex: "#22252A", bgClass: "bg-[#22252A]" }
];

export default function LojaQuadrosDecorativos({ onBack }: { onBack: () => void }) {
  // Navigation & Filtering States
  const [currentView, setCurrentView] = useState<"catalog" | "simulator" | "checkout">("catalog");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popular");

  // Customizer selection state (for right-side master console)
  const [selectedProduct, setSelectedProduct] = useState<Quadro | null>(null);
  const [activeSize, setActiveSize] = useState(SIZES[1]); // Default to Medium (50x70)
  const [activeFrame, setActiveFrame] = useState(FRAMES[1]); // Default to Black Ebony Wood
  
  // Wall Simulator configuration state
  const [simulatorRoom, setSimulatorRoom] = useState(ROOMS[0]);
  const [simulatorColor, setSimulatorColor] = useState(WALL_COLORS[1]); // default Areia
  const [simulatorProduct, setSimulatorProduct] = useState<Quadro>(QUADROS_DB[0]);
  const [simulatorSize, setSimulatorSize] = useState(SIZES[1]);
  const [simulatorFrame, setSimulatorFrame] = useState(FRAMES[1]);

  // Shopping Cart & Favorites
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [discountCoupon, setDiscountCoupon] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);
  const [shippingCEP, setShippingCEP] = useState<string>("");
  const [shippingPrice, setShippingPrice] = useState<number | null>(null);
  const [shippingDays, setShippingDays] = useState<number | null>(null);
  const [calculatingShipping, setCalculatingShipping] = useState<boolean>(false);

  // Secure Checkout State
  const [checkoutStep, setCheckoutStep] = useState<"info" | "payment" | "success">("info");
  const [billingInfo, setBillingInfo] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: ""
  });
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "cartao">("pix");
  const [creditCard, setCreditCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [pixPaid, setPixPaid] = useState<boolean>(false);
  const [finalOrderNumber, setFinalOrderNumber] = useState<string>("");

  // Toast Alerts
  const [toast, setToast] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Pre-load initial product to detail view
  useEffect(() => {
    if (QUADROS_DB.length > 0) {
      setSelectedProduct(QUADROS_DB[0]);
    }
  }, []);

  // Filtered and Sorted products
  const filteredProducts = QUADROS_DB.filter(p => {
    const matchesCategory = selectedCategory === "ALL" || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "price_asc") return a.priceBase - b.priceBase;
    if (sortBy === "price_desc") return b.priceBase - a.priceBase;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount; // default popular
  });

  // Price Calculation Engine
  const calculateSinglePrice = (base: number, sizeMult: number, frameAdd: number) => {
    return Math.round((base * sizeMult) + frameAdd);
  };

  // Cart operations
  const handleAddToCart = (quadro: Quadro, sizeOption = activeSize, frameOption = activeFrame) => {
    const itemPrice = calculateSinglePrice(quadro.priceBase, sizeOption.multiplier, frameOption.priceAdd);
    const cartItemId = `${quadro.id}-${sizeOption.name}-${frameOption.name}`;
    
    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(item => item.id === cartItemId);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prevCart, {
          id: cartItemId,
          quadro,
          size: sizeOption,
          frame: frameOption,
          quantity: 1
        }];
      }
    });
    
    triggerToast(`"${quadro.title}" adicionado ao carrinho de faturamento!`);
    setIsCartOpen(true);
  };

  const toggleWishlist = (id: string) => {
    if (wishlist.includes(id)) {
      setWishlist(prev => prev.filter(item => item !== id));
      triggerToast("Removido do catálogo de favoritos.");
    } else {
      setWishlist(prev => [...prev, id]);
      triggerToast("Salvo nos seus favoritos!");
    }
  };

  const cartSubtotal = cart.reduce((acc, item) => {
    const itemPrice = calculateSinglePrice(item.quadro.priceBase, item.size.multiplier, item.frame.priceAdd);
    return acc + (itemPrice * item.quantity);
  }, 0);

  const handleApplyCoupon = () => {
    const couponClean = discountCoupon.trim().toUpperCase();
    if (couponClean === "AURA10" || couponClean === "COLECIONADOR") {
      setAppliedCoupon({ code: couponClean, discountPercent: 10 });
      triggerToast("Cupom AURA de 10% de cortesia aplicado!");
    } else if (couponClean === "ATELIE15" || couponClean === "AUGUSTO15") {
      setAppliedCoupon({ code: couponClean, discountPercent: 15 });
      triggerToast("Cupom exclusivo do arquiteto Augusto (15% OFF) aplicado!");
    } else {
      triggerToast("Código do cupom inválido ou expirado.");
    }
    setDiscountCoupon("");
  };

  const handleCalculateShipping = () => {
    if (!shippingCEP || shippingCEP.length < 8) {
      triggerToast("Digite um CEP válido para cotação de frete.");
      return;
    }
    setCalculatingShipping(true);
    setTimeout(() => {
      setShippingPrice(49.00);
      setShippingDays(5);
      setCalculatingShipping(false);
      triggerToast("Transportadora especializada cotada com sucesso.");
    }, 1000);
  };

  const discountAmount = appliedCoupon ? Math.round(cartSubtotal * appliedCoupon.discountPercent / 100) : 0;
  const deliveryCost = shippingPrice || 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + deliveryCost);

  const handleStartCheckout = () => {
    if (cart.length === 0) {
      triggerToast("Seu carrinho de compras está vazio.");
      return;
    }
    setIsCartOpen(false);
    setCheckoutStep("info");
    setCurrentView("checkout");
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!billingInfo.nome || !billingInfo.email || !billingInfo.cpf || !billingInfo.rua || !billingInfo.cidade) {
      triggerToast("Por favor, preencha as credenciais de entrega.");
      return;
    }
    setCheckoutStep("payment");
  };

  const handleCompleteOrder = () => {
    if (paymentMethod === "cartao" && (!creditCard.number || !creditCard.name || !creditCard.cvv)) {
      triggerToast("Preencha os dados de validação do cartão.");
      return;
    }
    if (paymentMethod === "pix" && !pixPaid) {
      triggerToast("Aguardando simulação de confirmação do PIX.");
      return;
    }

    const orderNum = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
    setFinalOrderNumber(orderNum);
    setCheckoutStep("success");
    setCart([]);
    setAppliedCoupon(null);
    setShippingPrice(null);
    setShippingDays(null);
    setPixPaid(false);
    triggerToast("Obrigado. Pedido recebido e enviado ao ateliê!");
  };

  const loadProductInSimulator = (product: Quadro) => {
    setSimulatorProduct(product);
    setSimulatorSize(activeSize);
    setSimulatorFrame(activeFrame);
    setCurrentView("simulator");
    triggerToast("Obra carregada no simulador de parede!");
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#1C1917] font-sans antialiased relative selection:bg-stone-200">
      
      {/* Toast Alert pop-up */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-8 right-8 z-50 bg-[#1C1917] text-white px-5 py-3 rounded-lg shadow-xl border border-stone-800 flex items-center gap-3 text-xs tracking-wider uppercase font-semibold"
          >
            <div className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-pulse" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PORTFOLIO BACK-TO-NAVBAR HIGHLIGHT */}
      <div className="bg-[#1C1917] text-stone-300 py-3 px-6 sm:px-12 flex justify-between items-center text-xs border-b border-stone-800">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors font-mono tracking-wider text-[10px]"
        >
          <ArrowLeft className="w-4 h-4 text-[#C5A880]" />
          <span>PORTFÓLIO DE PROJETOS AUGUSTO DEV</span>
        </button>
        <div className="flex items-center gap-2 text-stone-400 font-mono text-[9px] uppercase tracking-widest">
          <span>Galeria E-Commerce</span>
          <span className="text-[#C5A880] font-bold">•</span>
          <span>Protótipo Premium</span>
        </div>
      </div>

      {/* REFINED BRAND HEADER */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 h-24 flex items-center justify-between">
          
          {/* Logo Brand with High-fashion Spacing */}
          <div 
            onClick={() => { setCurrentView("catalog"); setSelectedCategory("ALL"); }}
            className="cursor-pointer text-left select-none group"
          >
            <h1 className="font-serif font-light tracking-[0.3em] text-2xl text-stone-900 uppercase transition-colors">
              AURA
            </h1>
            <p className="font-sans text-[8px] text-[#C5A880] tracking-[0.4em] uppercase font-bold">
              FINE ART ATELIÊ DE QUADROS
            </p>
          </div>

          {/* Centralized Gallery Categories */}
          <nav className="hidden lg:flex items-center gap-10 text-[10px] uppercase tracking-[0.25em] font-medium text-stone-500">
            <button 
              onClick={() => { setCurrentView("catalog"); setSelectedCategory("ALL"); }}
              className={`hover:text-stone-900 transition-colors ${currentView === "catalog" && selectedCategory === "ALL" ? "text-stone-900 font-semibold border-b border-stone-950 pb-1" : ""}`}
            >
              Galeria Completa
            </button>
            <button 
              onClick={() => { setCurrentView("catalog"); setSelectedCategory("minimalista"); }}
              className={`hover:text-stone-900 transition-colors ${currentView === "catalog" && selectedCategory === "minimalista" ? "text-stone-900 font-semibold border-b border-stone-950 pb-1" : ""}`}
            >
              Minimalistas
            </button>
            <button 
              onClick={() => { setCurrentView("catalog"); setSelectedCategory("abstrato"); }}
              className={`hover:text-stone-900 transition-colors ${currentView === "catalog" && selectedCategory === "abstrato" ? "text-stone-900 font-semibold border-b border-stone-950 pb-1" : ""}`}
            >
              Abstratos
            </button>
            <button 
              onClick={() => { setCurrentView("catalog"); setSelectedCategory("fotografia"); }}
              className={`hover:text-stone-900 transition-colors ${currentView === "catalog" && selectedCategory === "fotografia" ? "text-stone-900 font-semibold border-b border-stone-950 pb-1" : ""}`}
            >
              Fotografia
            </button>
            <button 
              onClick={() => setCurrentView("simulator")}
              className={`hover:text-[#C5A880] transition-colors flex items-center gap-2 ${currentView === "simulator" ? "text-[#C5A880] font-semibold" : ""}`}
            >
              <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
              Simular na Parede
            </button>
          </nav>

          {/* Quick Access Actions */}
          <div className="flex items-center gap-4">
            {/* Desktop Fine-Art Search */}
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Pesquisar por título, artista..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-stone-100/55 border border-stone-200/80 text-[11px] rounded-sm py-2 pl-9 pr-4 w-56 focus:outline-none focus:ring-1 focus:ring-[#C5A880] placeholder-stone-400 font-sans tracking-wide text-stone-800"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
            </div>

            {/* Save list */}
            <button 
              onClick={() => {
                triggerToast(wishlist.length > 0 ? `Sua seleção privada contém ${wishlist.length} obras salvas.` : "Sua curadoria de favoritos está vazia.");
              }}
              className="p-2.5 hover:bg-stone-100 rounded-full text-stone-700 transition-all relative"
              title="Minha Curadoria"
            >
              <Heart className={`w-4.5 h-4.5 ${wishlist.length > 0 ? "fill-red-700 text-red-700" : ""}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-stone-900 text-white font-mono text-[8px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-3 bg-[#1C1917] hover:bg-stone-800 text-white rounded-full transition-all relative shadow-sm"
              title="Sacola de Compras"
            >
              <ShoppingBag className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A880] text-stone-900 font-mono text-[9px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CATALOG VIEW */}
      {currentView === "catalog" && (
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
          
          {/* CURATOR'S WELCOME STATEMENT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 border-b border-stone-200/60 pb-16">
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="font-sans text-[10px] text-[#C5A880] tracking-[0.3em] font-extrabold uppercase block">
                Ateliê de Impressão Artesanal & Curadoria Fine-Art
              </span>
              <h2 className="font-serif font-light text-3xl sm:text-5xl text-stone-900 tracking-wide leading-tight">
                Espaços esculpidos pela arte. Molduras lapidadas à mão.
              </h2>
              <p className="text-stone-500 text-sm leading-relaxed max-w-xl font-light">
                Compreendemos que um quadro não é apenas decoração, mas um portal de expressão intelectual e espacial. Na <strong>AURA</strong>, unimos a precisão de papéis de fibra de algodão museu à nobreza das molduras de madeira de reflorestamento esculpidas individualmente por nossos artesãos.
              </p>
              
              <div className="pt-4 flex flex-wrap gap-4">
                <button 
                  onClick={() => setCurrentView("simulator")}
                  className="bg-[#1C1917] hover:bg-stone-800 text-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Simulador de Parede</span>
                </button>
                <a 
                  href="#obras"
                  className="border border-stone-300 hover:bg-stone-50 text-stone-800 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center gap-2"
                >
                  <span>Explorar Coleções</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* High-end visual display card */}
            <div className="lg:col-span-5 relative group">
              <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80" 
                  alt="Fine Art Workshop" 
                  className="w-full h-full object-cover grayscale-[30%] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-stone-950/20" />
                <div className="absolute bottom-6 left-6 text-white text-left space-y-1">
                  <p className="font-serif italic text-sm text-[#C5A880]">"A luz desenha o espaço."</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-stone-300">Fotografia Pedro Fontana</p>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN PRODUCT EXPLORER & SPLIT CUSTOMIZER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="obras">
            
            {/* LEFT ART LISTING (col-span-8) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Refined Filters Panel */}
              <div className="border-b border-stone-200/60 pb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-left">
                
                {/* Categorization tabs */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "ALL", label: "Coleção Completa" },
                    { id: "minimalista", label: "Minimalismo" },
                    { id: "abstrato", label: "Abstratos" },
                    { id: "natureza", label: "Natureza & Fôlego" },
                    { id: "geometrico", label: "Geometria Bauhaus" },
                    { id: "fotografia", label: "Fotografia" }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 text-[11px] uppercase tracking-widest transition-all ${
                        selectedCategory === cat.id 
                          ? "bg-stone-900 text-white font-semibold" 
                          : "bg-stone-100 hover:bg-stone-200/70 text-stone-600"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Sort selections */}
                <div className="flex items-center gap-3.5 self-end sm:self-auto font-mono text-[10px]">
                  <span className="text-stone-400">
                    {filteredProducts.length} obras catalogadas
                  </span>
                  
                  <div className="flex items-center gap-1.5 border-l border-stone-200 pl-3.5">
                    <SlidersHorizontal className="w-3 h-3 text-stone-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-transparent text-stone-800 font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="popular">Ordem: Relevância</option>
                      <option value="price_asc">Menor Preço</option>
                      <option value="price_desc">Maior Preço</option>
                      <option value="rating">Melhor Avaliados</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ARTWORKS EXHIBITION GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-left">
                {filteredProducts.map((quadro) => {
                  const isFav = wishlist.includes(quadro.id);
                  return (
                    <div
                      key={quadro.id}
                      onClick={() => {
                        setSelectedProduct(quadro);
                        window.scrollTo({ top: document.getElementById("obras")?.offsetTop || 500, behavior: "smooth" });
                      }}
                      className={`group cursor-pointer space-y-4 flex flex-col justify-between transition-opacity ${
                        selectedProduct?.id === quadro.id ? "opacity-100" : "opacity-90 hover:opacity-100"
                      }`}
                    >
                      {/* Image Frame Canvas container */}
                      <div className="aspect-[4/5] bg-[#F5F4F0] p-4 border border-stone-200/70 shadow-sm relative transition-all duration-300 group-hover:shadow-md flex items-center justify-center">
                        <div className="w-full h-full relative overflow-hidden bg-stone-100 shadow-[inset_0_0_20px_rgba(0,0,0,0.04)]">
                          <img 
                            src={quadro.image} 
                            alt={quadro.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Overlaid actions */}
                        <div className="absolute top-6 left-6 flex flex-col gap-1.5 z-10">
                          {quadro.bestSeller && (
                            <span className="bg-stone-900/90 text-stone-100 font-mono text-[8px] font-bold px-2.5 py-1 tracking-widest uppercase shadow-sm">
                              Destaque
                            </span>
                          )}
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(quadro.id);
                          }}
                          className="absolute top-6 right-6 p-2 rounded-full bg-[#FAF9F5]/90 hover:bg-white text-stone-600 hover:text-red-700 shadow-sm transition-colors z-10"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-red-700 text-red-700" : ""}`} />
                        </button>
                      </div>

                      {/* Art metadata details */}
                      <div className="space-y-1 pb-4 border-b border-stone-200/40">
                        <div className="flex justify-between items-baseline">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-[#C5A880] font-bold">
                            {quadro.artist}
                          </span>
                          <span className="font-mono text-[9px] text-stone-400">{quadro.year}</span>
                        </div>
                        
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-serif font-normal text-[#1C1917] text-lg leading-tight tracking-wide group-hover:text-stone-700">
                            {quadro.title}
                          </h3>
                          <div className="text-right">
                            <span className="text-[9px] text-stone-400 font-mono block uppercase">A partir de</span>
                            <span className="font-serif text-sm font-semibold text-stone-900">
                              R$ {quadro.priceBase.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        </div>

                        <p className="text-[10px] text-stone-400 font-mono truncate pt-1">{quadro.technique}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* RIGHT COLUMN: ATELIÊ MASTER CUSTOMIZER (col-span-4) */}
            <div className="lg:col-span-4 text-left">
              {selectedProduct ? (
                <div className="bg-[#FAF9F5] border border-stone-200/80 p-8 space-y-8 sticky top-28 shadow-sm">
                  
                  {/* Curated Heading of Panel */}
                  <div className="space-y-4">
                    <span className="font-mono text-[8px] text-[#C5A880] tracking-[0.4em] uppercase font-black block">
                      CONVITE À PERSONALIZAÇÃO // PROJETO
                    </span>
                    
                    <div className="flex gap-4 items-start">
                      <div className="w-14 h-18 bg-stone-100 border border-stone-200 p-1 flex items-center justify-center shadow-xs">
                        <img 
                          src={selectedProduct.image} 
                          alt={selectedProduct.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-serif text-xl font-normal text-[#1C1917] tracking-wide leading-tight">
                          {selectedProduct.title}
                        </h3>
                        <p className="text-xs text-[#C5A880] font-mono">{selectedProduct.artist}</p>
                      </div>
                    </div>

                    <p className="text-xs text-stone-500 leading-relaxed font-light italic">
                      "{selectedProduct.description}"
                    </p>
                  </div>

                  <hr className="border-stone-200/60" />

                  {/* 1. SELECTION SIZE */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline font-mono text-[10px] uppercase tracking-wider">
                      <label className="font-bold text-stone-800">
                        1. Dimensões do Quadro
                      </label>
                      <span className="text-[#C5A880] font-bold">
                        {activeSize.sizeStr}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {SIZES.map(sz => (
                        <button
                          key={sz.name}
                          onClick={() => setActiveSize(sz)}
                          className={`p-3 border text-left transition-all ${
                            activeSize.name === sz.name 
                              ? "bg-stone-900 border-stone-900 text-white" 
                              : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-mono font-bold text-xs">{sz.name}</span>
                            <span className="text-[9px] font-light opacity-60">Fator: {sz.multiplier}x</span>
                          </div>
                          <span className="text-[10px] font-sans block mt-1 font-light opacity-80">{sz.label.split(" ")[1]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. SELECTION FRAME */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline font-mono text-[10px] uppercase tracking-wider">
                      <label className="font-bold text-stone-800">
                        2. Acabamento da Moldura
                      </label>
                      <span className="text-stone-500 font-bold">
                        {activeFrame.priceAdd > 0 ? `+ R$ ${activeFrame.priceAdd.toFixed(2)}` : "Incluso"}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {FRAMES.map(fr => (
                        <button
                          key={fr.name}
                          onClick={() => setActiveFrame(fr)}
                          className={`w-full text-left p-3 border transition-all flex items-start gap-3 ${
                            activeFrame.name === fr.name 
                              ? "bg-white border-stone-800 shadow-sm" 
                              : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                          }`}
                        >
                          {/* Miniature visual circular dot representing real wood */}
                          <div 
                            className="w-4 h-4 rounded-full border border-stone-300 mt-0.5 flex-shrink-0" 
                            style={{ backgroundColor: fr.hex }}
                          />
                          <div className="flex-1 space-y-0.5">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-stone-900">{fr.label}</span>
                              <span className="font-mono text-[11px]">
                                {fr.priceAdd > 0 ? `+ R$ ${fr.priceAdd}` : "Incluso"}
                              </span>
                            </div>
                            <p className="text-[10px] text-stone-400 font-light leading-snug">{fr.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* COMPUTED SUMMARY & CART SUBMIT */}
                  <div className="pt-6 border-t border-stone-200/60 space-y-4">
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-stone-400">Total Configurado:</span>
                      <span className="font-serif text-2xl font-light text-[#1C1917]">
                        R$ {calculateSinglePrice(selectedProduct.priceBase, activeSize.multiplier, activeFrame.priceAdd).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button 
                        onClick={() => handleAddToCart(selectedProduct, activeSize, activeFrame)}
                        className="w-full bg-[#1C1917] hover:bg-stone-800 text-white font-semibold py-4 px-4 text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Adicionar Sacola</span>
                      </button>

                      <button 
                        onClick={() => loadProductInSimulator(selectedProduct)}
                        className="w-full border border-stone-800 hover:bg-stone-100 text-stone-900 font-semibold py-4 px-4 text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                      >
                        <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Ver na Parede</span>
                      </button>
                    </div>

                    <div className="text-center font-mono text-[9px] tracking-wider uppercase text-stone-400">
                      📦 Logística Climatizada Premium — Embalagem Segura Segurada
                    </div>
                  </div>

                </div>
              ) : (
                <div className="border border-dashed border-stone-300 p-12 text-center text-stone-400 space-y-4">
                  <Compass className="w-8 h-8 mx-auto text-stone-300 stroke-1" />
                  <p className="text-xs font-light">Selecione uma peça na galeria para personalizar dimensões, acabamentos e verificar o preço em tempo real.</p>
                </div>
              )}
            </div>

          </div>

          {/* CURATOR'S ACCENTS / BRAND VALUE ASSURANCE */}
          <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-left border-t border-stone-200/60 mt-20">
            <div className="space-y-3">
              <span className="text-[#C5A880] font-serif italic text-lg block">01 / Impressão de Museologia</span>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Utilizamos papel fosco Hahnemühle de algodão puro 310g e pigmentos minerais de espectro ampliado com selo de conservação de 75 anos contra desbotamentos.
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-[#C5A880] font-serif italic text-lg block">02 / Moldura de Reflorestamento</span>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Nossas madeiras são certificadas pelo FSC, tratadas contra cupins e seladas com vernizes naturais orgânicos. Lapidadas individualmente com encaixe perfeito.
              </p>
            </div>
            <div className="space-y-3">
              <span className="text-[#C5A880] font-serif italic text-lg block">03 / Logística Blindada</span>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Cada quadro viaja envolto em mantas isotérmicas protetoras, cantoneiras de alta absorção de impacto e caixa de madeira compensada sob medida. Seguro total contra danos.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* REAL-TIME WALL SIMULATOR (SIMULADOR DE PAREDE) */}
      {currentView === "simulator" && (
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 space-y-8">
          
          {/* Header Controls */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-stone-200/60 pb-6 text-left">
            <div>
              <span className="font-mono text-[9px] text-[#C5A880] font-bold uppercase tracking-[0.3em] block">Ferramenta Interativa de Ambientação</span>
              <h2 className="font-serif font-light text-3xl text-stone-900 tracking-wide">Simulador de Ambientes em Escala</h2>
              <p className="text-xs text-stone-400 font-light mt-1">Veja exatamente como cada quadro se comporta sob diferentes paletas minerais de tintas e maquetes físicas de mobiliário.</p>
            </div>
            <button 
              onClick={() => setCurrentView("catalog")}
              className="bg-stone-900 hover:bg-stone-800 text-white font-mono text-[10px] uppercase tracking-widest py-3 px-6 transition-all"
            >
              ← Voltar para Galeria
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* SIMULATOR WINDOW (col-span-8) */}
            <div className="lg:col-span-8 relative rounded-lg overflow-hidden shadow-2xl flex flex-col items-center justify-center min-h-[520px] transition-all duration-500 border border-stone-200">
              
              {/* Wall Surface Background with dynamic colors */}
              <div className={`absolute inset-0 transition-colors duration-500 ${simulatorColor.bgClass}`} />
              
              {/* Natural spotlight overhead glow simulation */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_transparent_35%,_rgba(0,0,0,0.18))] pointer-events-none" />

              {/* LIVE SIMULATED ART FRAME ON THE WALL */}
              <div className="relative z-20 flex items-center justify-center transition-all duration-500">
                <motion.div 
                  layout
                  className={`bg-white transition-all duration-500 overflow-hidden relative ${simulatorFrame.class}`}
                  style={{
                    // Optical proportion rendering depending on actual physical scale choice
                    width: simulatorSize.name === "P" ? "120px" :
                           simulatorSize.name === "M" ? "180px" :
                           simulatorSize.name === "G" ? "260px" : "340px",
                    aspectRatio: "3/4"
                  }}
                >
                  <img 
                    src={simulatorProduct.image} 
                    alt={simulatorProduct.title}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glare/Glossy reflection overlay simulating luxury glass coating */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-70 pointer-events-none" />
                </motion.div>
              </div>

              {/* Maquetes room physical furniture overlays */}
              {simulatorRoom.visual}

              {/* Miniature floating specs label */}
              <div className="absolute top-6 left-6 z-30 bg-stone-950/80 backdrop-blur-md px-4 py-2.5 rounded text-[10px] text-stone-300 font-mono text-left space-y-0.5 shadow-md">
                <p>Obra: <strong className="text-white">{simulatorProduct.title}</strong></p>
                <p>Tamanho: <strong className="text-[#C5A880]">{simulatorSize.label}</strong></p>
                <p>Moldura: <strong className="text-white">{simulatorFrame.label.split(" (")[0]}</strong></p>
              </div>
            </div>

            {/* CONTROL PANEL DOCK (col-span-4) */}
            <div className="lg:col-span-4 bg-white border border-stone-200 p-8 text-left shadow-sm space-y-6 flex flex-col justify-between">
              
              <div className="space-y-6">
                
                {/* 1. SELECTION ART */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-widest block">
                    1. Trocar Obra de Arte
                  </label>
                  <select
                    value={simulatorProduct.id}
                    onChange={(e) => {
                      const prod = QUADROS_DB.find(q => q.id === e.target.value);
                      if (prod) setSimulatorProduct(prod);
                    }}
                    className="w-full bg-stone-50 border border-stone-200 rounded p-3 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#C5A880] font-medium"
                  >
                    {QUADROS_DB.map(q => (
                      <option key={q.id} value={q.id}>
                        {q.title} — {q.artist}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. CHOOSE WALL COLOR MINERAL */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-widest block">
                    2. Tinta Mineral da Parede
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {WALL_COLORS.map(wc => (
                      <button
                        key={wc.id}
                        onClick={() => setSimulatorColor(wc)}
                        className={`w-9 h-9 rounded-full border transition-all relative flex items-center justify-center ${
                          simulatorColor.id === wc.id ? "ring-2 ring-stone-900 ring-offset-2 scale-105" : "border-stone-200 hover:scale-102"
                        }`}
                        style={{ backgroundColor: wc.hex }}
                        title={wc.name}
                      >
                        {simulatorColor.id === wc.id && (
                          <Check className={`w-4 h-4 ${wc.id === "gesso" || wc.id === "blue" || wc.id === "quartzo" ? "text-stone-900" : "text-stone-100"}`} />
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-[9px] text-stone-400 italic">Paleta selecionada: {simulatorColor.name}</p>
                </div>

                {/* 3. SIMULATED SPACE OVERLAY */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-widest block">
                    3. Maquete Física de Ambiente
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {ROOMS.map(r => (
                      <button
                        key={r.id}
                        onClick={() => setSimulatorRoom(r)}
                        className={`px-4 py-2.5 rounded border text-xs font-semibold transition-all text-left ${
                          simulatorRoom.id === r.id 
                            ? "bg-stone-900 border-stone-900 text-white" 
                            : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                        }`}
                      >
                        {r.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. CHOOSE SIZE SCALE */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-widest block">
                    4. Redimensionar Proporções
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {SIZES.map(sz => (
                      <button
                        key={sz.name}
                        onClick={() => setSimulatorSize(sz)}
                        className={`py-2 rounded text-xs font-bold border transition-all ${
                          simulatorSize.name === sz.name 
                            ? "bg-stone-900 border-stone-900 text-white" 
                            : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                        }`}
                      >
                        {sz.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-[9px] text-stone-400 italic">Simulado em escala sobre o mobiliário.</p>
                </div>

                {/* 5. MOLDURA TYPE ON SIMULATOR */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-widest block">
                    5. Acabamento de Moldura
                  </label>
                  <select
                    value={simulatorFrame.name}
                    onChange={(e) => {
                      const fr = FRAMES.find(f => f.name === e.target.value);
                      if (fr) setSimulatorFrame(fr);
                    }}
                    className="w-full bg-stone-50 border border-stone-200 rounded p-3 text-xs text-stone-800 focus:outline-none"
                  >
                    {FRAMES.map(fr => (
                      <option key={fr.name} value={fr.name}>
                        {fr.label} ({fr.priceAdd > 0 ? `+ R$ ${fr.priceAdd}` : "Incluso"})
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* QUICK ACTION TO ADD TO SAC CARRINHO FROM VISUALIZER */}
              <div className="pt-6 border-t border-stone-200 space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] text-stone-400 font-mono uppercase tracking-wider">Preço Final Configurado:</span>
                  <span className="font-serif text-xl font-medium text-stone-900">
                    R$ {calculateSinglePrice(simulatorProduct.priceBase, simulatorSize.multiplier, simulatorFrame.priceAdd).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                
                <button 
                  onClick={() => handleAddToCart(simulatorProduct, simulatorSize, simulatorFrame)}
                  className="w-full bg-[#1C1917] hover:bg-stone-800 text-white font-semibold py-4 px-4 text-xs tracking-widest uppercase shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                  <span>Adicionar Sacola de Compras</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* SECURE CHECKOUT INTERFACE */}
      {currentView === "checkout" && (
        <div className="max-w-4xl mx-auto px-6 sm:px-12 py-12 text-left">
          
          {/* SECURE PROGRESS STEPS HEADER */}
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-stone-400 font-mono mb-12">
            <span className="cursor-pointer hover:text-stone-900" onClick={() => setCurrentView("catalog")}>Catálogo</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            <span className={checkoutStep === "info" ? "text-stone-950 font-bold" : ""}>Endereço & Dados</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            <span className={checkoutStep === "payment" ? "text-stone-950 font-bold" : ""}>Validação Segura</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            <span className={checkoutStep === "success" ? "text-[#C5A880] font-bold animate-pulse" : ""}>Confirmação</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* STEP FILLABLE CONSOLE (col-span-8) */}
            <div className="md:col-span-8">
              
              {/* STEP 1: BILLING CREDENTIALS */}
              {checkoutStep === "info" && (
                <form onSubmit={handleInfoSubmit} className="bg-[#FAF9F5] border border-stone-200 p-8 space-y-6">
                  <h3 className="font-serif text-2xl text-stone-950 font-normal tracking-wide">1. Dados para Faturamento & Despacho</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-[11px]">
                    <div className="space-y-1.5">
                      <label className="font-bold text-stone-600 block uppercase tracking-wider">Nome Completo *</label>
                      <input 
                        type="text" 
                        required
                        value={billingInfo.nome}
                        onChange={(e) => setBillingInfo({ ...billingInfo, nome: e.target.value })}
                        placeholder="Ex: Clara Valente"
                        className="w-full bg-white border border-stone-200 px-4 py-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-stone-600 block uppercase tracking-wider">E-mail de Contato *</label>
                      <input 
                        type="email" 
                        required
                        value={billingInfo.email}
                        onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
                        placeholder="exemplo@email.com"
                        className="w-full bg-white border border-stone-200 px-4 py-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-stone-600 block uppercase tracking-wider">Telefone com WhatsApp *</label>
                      <input 
                        type="tel" 
                        required
                        value={billingInfo.telefone}
                        onChange={(e) => setBillingInfo({ ...billingInfo, telefone: e.target.value })}
                        placeholder="(11) 99999-9999"
                        className="w-full bg-white border border-stone-200 px-4 py-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-stone-600 block uppercase tracking-wider">CPF ou CNPJ para Nota Fiscal *</label>
                      <input 
                        type="text" 
                        required
                        value={billingInfo.cpf}
                        onChange={(e) => setBillingInfo({ ...billingInfo, cpf: e.target.value })}
                        placeholder="000.000.000-00"
                        className="w-full bg-white border border-stone-200 px-4 py-3 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                      />
                    </div>
                  </div>

                  <hr className="border-stone-200" />

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#C5A880]">Destino de Remessa Climatizada</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-[11px]">
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="font-bold text-stone-600 block uppercase">Logradouro / Avenida *</label>
                        <input 
                          type="text" 
                          required
                          value={billingInfo.rua}
                          onChange={(e) => setBillingInfo({ ...billingInfo, rua: e.target.value })}
                          placeholder="Ex: Av. Brigadeiro Luis Antônio"
                          className="w-full bg-white border border-stone-200 px-4 py-3 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-bold text-stone-600 block uppercase">Número *</label>
                        <input 
                          type="text" 
                          required
                          value={billingInfo.numero}
                          onChange={(e) => setBillingInfo({ ...billingInfo, numero: e.target.value })}
                          placeholder="1500"
                          className="w-full bg-white border border-stone-200 px-4 py-3 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-bold text-stone-600 block uppercase">Bairro *</label>
                        <input 
                          type="text" 
                          required
                          value={billingInfo.bairro}
                          onChange={(e) => setBillingInfo({ ...billingInfo, bairro: e.target.value })}
                          placeholder="Jardins"
                          className="w-full bg-white border border-stone-200 px-4 py-3 text-xs text-stone-800 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-bold text-stone-600 block uppercase">Cidade *</label>
                        <input 
                          type="text" 
                          required
                          value={billingInfo.cidade}
                          onChange={(e) => setBillingInfo({ ...billingInfo, cidade: e.target.value })}
                          placeholder="São Paulo"
                          className="w-full bg-white border border-stone-200 px-4 py-3 text-xs text-stone-800 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-bold text-stone-600 block uppercase">Estado (UF) *</label>
                        <input 
                          type="text" 
                          required
                          maxLength={2}
                          value={billingInfo.estado}
                          onChange={(e) => setBillingInfo({ ...billingInfo, estado: e.target.value.toUpperCase() })}
                          placeholder="SP"
                          className="w-full bg-white border border-stone-200 px-4 py-3 text-xs text-stone-800 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1C1917] hover:bg-stone-800 text-white font-mono text-[11px] uppercase tracking-widest py-4.5 rounded shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>Seguir para validação do pagamento</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                  </button>
                </form>
              )}

              {/* STEP 2: PAYMENT METHOD VALIDATION */}
              {checkoutStep === "payment" && (
                <div className="bg-[#FAF9F5] border border-stone-200 p-8 space-y-8">
                  <h3 className="font-serif text-2xl text-stone-950 font-normal tracking-wide">2. Validação da Forma de Faturamento Seguro</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentMethod("pix")}
                      className={`p-6 border text-left space-y-2.5 transition-all ${
                        paymentMethod === "pix" 
                          ? "bg-white border-stone-950 shadow-sm" 
                          : "bg-white border-stone-200 text-stone-500 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <QrCode className="w-6 h-6 text-[#C5A880]" />
                        {paymentMethod === "pix" && <Check className="w-4 h-4 text-stone-900" />}
                      </div>
                      <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-stone-900">Pix Instântaneo (5% OFF)</h4>
                      <p className="text-[10px] text-stone-400 font-light leading-snug">Liberação imediata do lote no ateliê e despacho prioritário.</p>
                    </button>

                    <button
                      onClick={() => setPaymentMethod("cartao")}
                      className={`p-6 border text-left space-y-2.5 transition-all ${
                        paymentMethod === "cartao" 
                          ? "bg-white border-stone-950 shadow-sm" 
                          : "bg-white border-stone-200 text-stone-500 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <CreditCard className="w-6 h-6 text-[#C5A880]" />
                        {paymentMethod === "cartao" && <Check className="w-4 h-4 text-stone-900" />}
                      </div>
                      <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-stone-900">Cartão de Crédito</h4>
                      <p className="text-[10px] text-stone-400 font-light leading-snug">Parcele em até 10x sem juros de forma parcelada com garantia total.</p>
                    </button>
                  </div>

                  {paymentMethod === "pix" && (
                    <div className="bg-stone-100/50 border border-stone-200 p-6 text-center space-y-6">
                      <div className="w-36 h-36 bg-white mx-auto border border-stone-200 p-2 flex items-center justify-center relative shadow-xs">
                        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-900 via-stone-700 to-transparent opacity-90 flex items-center justify-center">
                          <QrCode className="w-16 h-16 text-white stroke-1" />
                        </div>
                        {pixPaid && (
                          <div className="absolute inset-0 bg-[#1C1917]/95 flex flex-col items-center justify-center text-white p-2">
                            <Check className="w-8 h-8 text-[#C5A880] stroke-[3px]" />
                            <span className="text-[9px] font-mono tracking-widest uppercase mt-2">Pagamento Simulado</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <p className="text-[10px] font-mono font-bold text-stone-600 uppercase tracking-widest">Código Pix Copia-Cria-Paga:</p>
                        <div className="flex bg-white border border-stone-200 max-w-sm mx-auto overflow-hidden rounded-sm">
                          <code className="text-[10px] bg-stone-50/70 px-3 py-2 flex-1 block overflow-x-auto select-all text-left">
                            00020126580014br.gov.bcb.pix0136aura.fineart.vendas2026
                          </code>
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              triggerToast("Chave PIX copiada com sucesso!");
                            }}
                            className="bg-stone-900 hover:bg-stone-800 text-white px-4 text-xs font-bold flex items-center justify-center transition-all"
                            title="Copiar"
                          >
                            <Copy className="w-3.5 h-3.5 text-[#C5A880]" />
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setPixPaid(true);
                          triggerToast("Simulação de confirmação do Pix registrada.");
                        }}
                        className="bg-stone-900 hover:bg-stone-800 text-white font-mono text-[9px] font-bold py-2.5 px-6 transition-all uppercase tracking-widest"
                      >
                        Simular Confirmação do Pix
                      </button>
                    </div>
                  )}

                  {paymentMethod === "cartao" && (
                    <div className="bg-stone-100/40 border border-stone-200 p-6 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left font-mono text-[10px] tracking-wider uppercase">
                        <div className="space-y-1">
                          <label className="font-bold text-stone-500">Número Impresso no Cartão *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="4000 1234 5678 9010"
                            value={creditCard.number}
                            onChange={(e) => setCreditCard({ ...creditCard, number: e.target.value })}
                            className="w-full bg-white border border-stone-200 p-3 text-xs text-stone-800 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-stone-500">Nome do Titular *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="CLARA VALENTE"
                            value={creditCard.name}
                            onChange={(e) => setCreditCard({ ...creditCard, name: e.target.value.toUpperCase() })}
                            className="w-full bg-white border border-stone-200 p-3 text-xs text-stone-800 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-stone-500">Data de Vencimento *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="MM/AA"
                            maxLength={5}
                            value={creditCard.expiry}
                            onChange={(e) => setCreditCard({ ...creditCard, expiry: e.target.value })}
                            className="w-full bg-white border border-stone-200 p-3 text-xs text-stone-800 focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-stone-500">Código CVV *</label>
                          <input 
                            type="text" 
                            required
                            maxLength={4}
                            placeholder="123"
                            value={creditCard.cvv}
                            onChange={(e) => setCreditCard({ ...creditCard, cvv: e.target.value })}
                            className="w-full bg-white border border-stone-200 p-3 text-xs text-stone-800 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex justify-between gap-4 font-mono">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep("info")}
                      className="border border-stone-300 text-stone-600 px-6 py-4.5 text-[10px] hover:bg-stone-100 transition-all uppercase tracking-widest font-bold"
                    >
                      Voltar etapa
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleCompleteOrder}
                      className="flex-1 bg-stone-900 hover:bg-stone-800 text-white font-bold py-4.5 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                      <span>Fechar Transação Protegida</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SUCCESS CERTIFICATION */}
              {checkoutStep === "success" && (
                <div className="bg-white border border-stone-200 p-10 text-center space-y-6 shadow-sm">
                  <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center text-[#C5A880] mx-auto border border-stone-200">
                    <CheckCircle className="w-8 h-8 stroke-[1.5]" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif font-light text-3xl text-stone-950">Seu pedido foi encaminhado ao Ateliê!</h3>
                    <p className="text-xs text-stone-500 max-w-md mx-auto font-light leading-relaxed">
                      Sua solicitação de faturamento foi registrada. A equipe de molduras artesanais já foi notificada para dar início à montagem do chassi.
                    </p>
                  </div>

                  <div className="bg-[#FAF9F5] border border-stone-200 p-6 max-w-sm mx-auto text-left font-mono text-[10px] space-y-2.5">
                    <div className="flex justify-between">
                      <span className="text-stone-400 uppercase">Código da Transação:</span>
                      <span className="font-bold text-stone-900">{finalOrderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400 uppercase">Data de Entrada:</span>
                      <span>{new Date().toLocaleDateString("pt-BR")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400 uppercase">Transporte Assegurado:</span>
                      <span className="text-stone-800 font-bold">5 a 7 dias úteis</span>
                    </div>
                    <div className="flex justify-between border-t border-stone-200 pt-3 text-xs font-bold text-stone-900">
                      <span>VALOR LIQUIDADO:</span>
                      <span>R$ {cartTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  <div className="pt-4 max-w-xs mx-auto">
                    <button
                      onClick={() => {
                        setCurrentView("catalog");
                        setCheckoutStep("info");
                      }}
                      className="w-full bg-[#1C1917] hover:bg-stone-800 text-white font-mono text-[10px] py-4 uppercase tracking-widest transition-all"
                    >
                      Retornar à Galeria Aura
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* CHECKOUT RESUMO DA COMPRA (col-span-4) */}
            {checkoutStep !== "success" && (
              <div className="md:col-span-4 bg-white border border-stone-200 p-6 text-left space-y-4">
                <h4 className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] text-stone-400">Resumo Cromático</h4>
                
                {/* Visual Cart summary items */}
                <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                  {cart.map((item, idx) => {
                    const itemPrice = calculateSinglePrice(item.quadro.priceBase, item.size.multiplier, item.frame.priceAdd);
                    return (
                      <div key={idx} className="flex gap-3 text-xs pb-4 border-b border-stone-100 last:border-0 last:pb-0">
                        <img 
                          src={item.quadro.image} 
                          alt={item.quadro.title} 
                          className="w-9 h-11 object-cover border border-stone-200 bg-[#F5F4F0]"
                        />
                        <div className="flex-1 space-y-1">
                          <h5 className="font-serif font-normal text-stone-900 line-clamp-1">{item.quadro.title}</h5>
                          <p className="text-[9px] text-stone-400 font-mono">Tam: {item.size.name} • Moldura: {item.frame.label.split(" (")[0]}</p>
                          <div className="flex justify-between items-baseline pt-0.5">
                            <span className="text-[9px] text-stone-500 font-mono">Lotes: {item.quantity}</span>
                            <span className="font-mono text-stone-950 text-[11px] font-bold">
                              R$ {(itemPrice * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <hr className="border-stone-200/60" />

                {/* Totals section */}
                <div className="space-y-2.5 font-mono text-[11px] text-stone-500">
                  <div className="flex justify-between">
                    <span>Subtotal das Peças</span>
                    <span className="font-bold text-stone-900">R$ {cartSubtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Cupom ({appliedCoupon.code})</span>
                      <span>- R$ {discountAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Remessa Assegurada</span>
                    <span className="font-bold text-stone-900">
                      {shippingPrice ? `R$ ${shippingPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "A calcular"}
                    </span>
                  </div>

                  <hr className="border-stone-200" />

                  <div className="flex justify-between text-xs font-bold text-stone-900">
                    <span>VALOR LÍQUIDO</span>
                    <span className="text-base font-serif font-light">R$ {cartTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

      {/* RETAIL CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Overlay backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />

            {/* Sidebar drawer element */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full sm:max-w-md bg-[#FAF9F5] shadow-2xl flex flex-col justify-between text-left"
            >
              {/* Header */}
              <div className="p-6 border-b border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-stone-950" />
                  <span className="font-serif font-light text-lg text-stone-950 uppercase tracking-widest">Minha Sacola</span>
                  <span className="font-mono text-[10px] bg-stone-200 text-stone-800 px-2 py-0.5 rounded font-bold">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items listing */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {cart.length > 0 ? (
                  cart.map((item) => {
                    const itemPrice = calculateSinglePrice(item.quadro.priceBase, item.size.multiplier, item.frame.priceAdd);
                    return (
                      <div 
                        key={item.id}
                        className="flex gap-4 pb-4 border-b border-stone-200/60 relative group"
                      >
                        <img 
                          src={item.quadro.image} 
                          alt={item.quadro.title} 
                          className="w-14 h-18 object-cover border border-stone-200 bg-[#F5F4F0] p-1 flex-shrink-0"
                        />

                        <div className="flex-1 text-xs text-stone-500 space-y-1">
                          <h4 className="font-serif font-normal text-stone-900 text-sm leading-tight pr-6">
                            {item.quadro.title}
                          </h4>
                          <p className="text-[9px] text-[#C5A880] font-mono uppercase tracking-widest">{item.quadro.artist}</p>
                          <p className="text-[9px] text-stone-400 font-mono">Tamanho: {item.size.name} • Moldura: {item.frame.label.split(" (")[0]}</p>
                          
                          <div className="flex items-center justify-between pt-1.5">
                            {/* Quantity controls */}
                            <div className="flex items-center bg-white border border-stone-200">
                              <button 
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    setCart(prev => prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity - 1 } : c));
                                  } else {
                                    setCart(prev => prev.filter(c => c.id !== item.id));
                                    triggerToast("Obra removida da sacola.");
                                  }
                                }}
                                className="px-2.5 py-1 text-stone-500 hover:bg-stone-100 transition-colors"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="px-2.5 font-mono text-[10px] font-bold text-stone-800">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => {
                                  setCart(prev => prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
                                }}
                                className="px-2.5 py-1 text-stone-500 hover:bg-stone-100 transition-colors"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>

                            <span className="font-mono text-stone-950 font-bold">
                              R$ {(itemPrice * item.quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        </div>

                        {/* Remove item button */}
                        <button 
                          onClick={() => {
                            setCart(prev => prev.filter(c => c.id !== item.id));
                            triggerToast("Obra de arte removida.");
                          }}
                          className="absolute top-0 right-0 p-1 text-stone-400 hover:text-red-700 transition-colors"
                          title="Remover"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center py-24 text-stone-400 space-y-4">
                    <ShoppingBag className="w-10 h-10 mx-auto stroke-1 text-stone-300" />
                    <p className="text-xs font-light tracking-wide">Sua sacola de curadoria está vazia.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="bg-stone-900 hover:bg-stone-800 text-white font-mono text-[9px] uppercase tracking-widest py-2.5 px-6"
                    >
                      Explorar Obras de Arte
                    </button>
                  </div>
                )}
              </div>

              {/* Cart Drawer calculations and CTAs */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-stone-200 bg-stone-100/50 space-y-4 text-xs font-semibold text-stone-600">
                  
                  {/* Coupon layout */}
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="CUPOM (Ex: AUGUSTO15)"
                      value={discountCoupon}
                      onChange={(e) => setDiscountCoupon(e.target.value)}
                      className="flex-1 bg-white border border-stone-200 px-3 py-2 text-xs uppercase tracking-widest focus:outline-none"
                    />
                    <button 
                      onClick={handleApplyCoupon}
                      className="bg-stone-900 hover:bg-stone-800 text-white font-mono px-4 text-[10px] uppercase tracking-widest transition-all"
                    >
                      Aplicar
                    </button>
                  </div>

                  {/* CEP calculation */}
                  <div className="flex gap-2 items-center">
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        placeholder="Simular CEP (ex: 01001-000)"
                        value={shippingCEP}
                        onChange={(e) => setShippingCEP(e.target.value)}
                        className="w-full bg-white border border-stone-200 pl-8 pr-3 py-2 text-xs focus:outline-none"
                      />
                      <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#C5A880]" />
                    </div>
                    <button 
                      onClick={handleCalculateShipping}
                      className="border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 px-3 py-2 text-[10px] uppercase transition-all"
                    >
                      {calculatingShipping ? "..." : "Calcular"}
                    </button>
                  </div>

                  {/* Pricing summary */}
                  <div className="space-y-2 pt-2 border-t border-stone-200/60 font-mono text-[11px] text-stone-500">
                    <div className="flex justify-between">
                      <span>Subtotal Curado</span>
                      <span className="font-bold text-stone-950">R$ {cartSubtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-800 font-bold">
                        <span>Desconto ({appliedCoupon.code})</span>
                        <span>- R$ {discountAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Cotação de Despacho</span>
                      <span className="font-bold text-stone-950">
                        {shippingPrice ? `R$ ${shippingPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "Sob cálculo"}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200 font-sans">
                      <span>Subtotal Líquido</span>
                      <span className="text-base font-serif font-light">R$ {cartTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleStartCheckout}
                    className="w-full bg-[#1C1917] hover:bg-stone-800 text-white font-mono text-[11px] uppercase tracking-widest py-4 rounded shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Finalizar Transação Segura</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                  </button>

                  <p className="text-[9px] text-stone-400 text-center font-mono tracking-wide uppercase">
                    🛡️ Faturamento seguro SSL com criptografia estrita
                  </p>

                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
