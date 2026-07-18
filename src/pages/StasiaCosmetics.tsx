import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  ArrowLeft, 
  Star, 
  Heart, 
  Sparkles, 
  CheckCircle, 
  ChevronRight, 
  Play, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Instagram, 
  Plus, 
  Minus, 
  Trash2, 
  Award,
  Eye,
  Compass,
  Quote,
  Gift,
  ArrowRight
} from "lucide-react";

// SEO components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";

interface Product {
  id: string;
  name: string;
  category: "olhos" | "pele" | "labios";
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  shades: string[];
  isNew?: boolean;
}

const COSMETICS_PRODUCTS: Product[] = [
  {
    id: "stasia-lipstick-velvet",
    name: "Stasia Velvet Rouge Lipstick",
    category: "labios",
    price: 189.00,
    rating: 4.9,
    reviewsCount: 342,
    description: "Batom líquido de acabamento matte aveludado de altíssima fixação. Enriquecido com óleo de jojoba e ácido hialurônico para hidratação profunda das fibras labiais.",
    image: "https://i.pinimg.com/originals/32/ce/35/32ce350141a3dabeb6f47003b6a13a43.gif",
    shades: ["#8A1B2E", "#B83A4B", "#A43E2B", "#D1887E"],
    isNew: true
  },
  {
    id: "stasia-eyeliner-precision",
    name: "Precision Stroke Eyeliner Noir",
    category: "olhos",
    price: 139.00,
    rating: 4.8,
    reviewsCount: 219,
    description: "Lápis delineador de olhos ultra preciso à prova d'água. Pigmentação profunda em carbono com ponteira de silicone esfumadora para transições suaves.",
    image: "https://i.pinimg.com/originals/b4/c8/f5/b4c8f52f2b5c2c0626881862dd7480fa.gif",
    shades: ["#000000", "#1C1412"],
  },
  {
    id: "stasia-foundation-skin",
    name: "Luminous Silk Fluid Foundation",
    category: "pele",
    price: 249.00,
    rating: 5.0,
    reviewsCount: 412,
    description: "Base fluida hidratante com efeito segunda pele e acabamento acetinado natural. Proteção solar FPS 30 contra radiação UVA/UVB e poluição urbana.",
    image: "https://capricho.abril.com.br/wp-content/uploads/2016/09/make-pele.gif",
    shades: ["#F9DEC9", "#E8C1A0", "#CCA07A", "#A37A53", "#744F2D"],
    isNew: true
  },
  {
    id: "stasia-mascara-extreme",
    name: "Extreme Volume & Lift Mascara",
    category: "olhos",
    price: 159.00,
    rating: 4.7,
    reviewsCount: 188,
    description: "Máscara de cílios reconstrutora com polímeros estensores de queratina botânica. Curve e alongue os cílios desde a raiz por até 36 horas.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=80",
    shades: ["#050505"],
  },
  {
    id: "stasia-blush-glow",
    name: "Golden Dew Creamy Blush",
    category: "pele",
    price: 169.00,
    rating: 4.9,
    reviewsCount: 265,
    description: "Blush cremoso hidratante com micropartículas de ouro 24k reflexivo. Funde-se à pele instantaneamente promovendo uma radiância saudável.",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=500&q=80",
    shades: ["#E28A7A", "#C96D5F", "#DB91A4"]
  },
  {
    id: "stasia-hydra-gloss",
    name: "Plumping Glass Hydra Gloss",
    category: "labios",
    price: 149.00,
    rating: 4.9,
    reviewsCount: 304,
    description: "Gloss labial volumizador de alto brilho vítreo. Tecnologia de canais peptídicos ativos que amplificam os lábios com sensação de frescor natural.",
    image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=500&q=80",
    shades: ["#FFC2C2", "#FF9EAF", "#E57C82"]
  }
];

interface CartItem {
  product: Product;
  quantity: number;
  selectedShade: string;
}

interface VisualLook {
  id: string;
  name: string;
  tagline: string;
  image: string;
  productIds: string[];
  vibe: string;
}

const LUXURY_LOOKS: VisualLook[] = [
  {
    id: "parisian-chic",
    name: "Parisian Chic Velvet",
    tagline: "Lábios dramáticos e contorno de alta definição.",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&q=80",
    productIds: ["stasia-lipstick-velvet", "stasia-eyeliner-precision"],
    vibe: "Sofisticação clássica inspirada nas noites parisientes com delineado fino e batom vermelho absoluto."
  },
  {
    id: "luminous-glow",
    name: "Siberian Luminous Glow",
    tagline: "Radiância natural, derme revigorada e ouro 24K.",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    productIds: ["stasia-foundation-skin", "stasia-blush-glow"],
    vibe: "Acabamento de segunda pele acetinada com toque de ouro reflexivo nas maçãs do rosto para o frescor perfeito."
  },
  {
    id: "midnight-glam",
    name: "Midnight Atelier Glam",
    tagline: "Olhar alongado de alta performance e lábios volumizados.",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80",
    productIds: ["stasia-mascara-extreme", "stasia-hydra-gloss"],
    vibe: "Cílios com alongamento extremo de 36 horas combinados ao brilho vítreo do gloss preenchedor de peptídeos."
  }
];

export default function StasiaCosmetics({ onBack }: { onBack?: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "olhos" | "pele" | "labios">("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeLookId, setActiveLookId] = useState<string>("parisian-chic");
  
  const [selectedProductShade, setSelectedProductShade] = useState<{ [productId: string]: string }>({
    "stasia-lipstick-velvet": "#8A1B2E",
    "stasia-eyeliner-precision": "#000000",
    "stasia-foundation-skin": "#F9DEC9",
    "stasia-mascara-extreme": "#050505",
    "stasia-blush-glow": "#E28A7A",
    "stasia-hydra-gloss": "#FFC2C2"
  });

  // Quiz State
  const [quizStep, setQuizStep] = useState(0); 
  const [quizAnswers, setQuizAnswers] = useState<{ skinType: string; coverage: string; undertone: string }>({
    skinType: "",
    coverage: "",
    undertone: ""
  });
  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Checkout simulation
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "pix"
  });

  // Filtered Products
  const filteredProducts = selectedCategory === "all"
    ? COSMETICS_PRODUCTS
    : COSMETICS_PRODUCTS.filter(p => p.category === selectedCategory);

  const selectShade = (productId: string, shade: string) => {
    setSelectedProductShade(prev => ({ ...prev, [productId]: shade }));
  };

  const addToCart = (product: Product) => {
    const shade = selectedProductShade[product.id] || product.shades[0];
    
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedShade === shade);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id && item.selectedShade === shade
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedShade: shade }];
    });
    
    setIsCartOpen(true);
  };

  const addEntireLookToCart = (look: VisualLook) => {
    look.productIds.forEach(pId => {
      const product = COSMETICS_PRODUCTS.find(p => p.id === pId);
      if (product) {
        const shade = selectedProductShade[product.id] || product.shades[0];
        setCart(prev => {
          const existing = prev.find(item => item.product.id === product.id && item.selectedShade === shade);
          if (existing) {
            return prev.map(item => 
              item.product.id === product.id && item.selectedShade === shade
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [...prev, { product, quantity: 1, selectedShade: shade }];
        });
      }
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, shade: string, amount: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedShade === shade) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const removeCartItem = (productId: string, shade: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedShade === shade)));
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const getQuizRecommendation = () => {
    if (quizAnswers.coverage === "matte") {
      return COSMETICS_PRODUCTS.find(p => p.id === "stasia-lipstick-velvet")!;
    }
    if (quizAnswers.skinType === "oleosa") {
      return COSMETICS_PRODUCTS.find(p => p.id === "stasia-eyeliner-precision")!;
    }
    return COSMETICS_PRODUCTS.find(p => p.id === "stasia-foundation-skin")!;
  };

  const handleQuizAnswer = (key: "skinType" | "coverage" | "undertone", value: string) => {
    setQuizAnswers(prev => ({ ...prev, [key]: value }));
    if (quizStep < 3) {
      setQuizStep(prev => prev + 1);
    } else {
      setQuizSubmitting(true);
      setTimeout(() => {
        setQuizSubmitting(false);
        setQuizStep(4);
      }, 1500);
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({ skinType: "", coverage: "", undertone: "" });
    setQuizStep(1);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      setCart([]);
    }, 2000);
  };

  const activeLook = LUXURY_LOOKS.find(l => l.id === activeLookId) || LUXURY_LOOKS[0];

  return (
    <div className="relative min-h-screen bg-[#FDFBF9] text-[#111111] font-sans overflow-x-hidden selection:bg-[#C5A880] selection:text-white">
      
      {/* Self-contained premium animations stylesheet */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes glowBreathing {
          0%, 100% { opacity: 0.3; transform: scale(1) translate(0, 0); filter: blur(100px); }
          50% { opacity: 0.6; transform: scale(1.12) translate(30px, -20px); filter: blur(120px); }
        }
        @keyframes floatAccents {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(3deg); }
        }
        .animate-marquee-slow {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee 35s linear infinite;
        }
        .animate-glow-breathing-1 {
          animation: glowBreathing 14s ease-in-out infinite alternate;
        }
        .animate-glow-breathing-2 {
          animation: glowBreathing 20s ease-in-out infinite alternate-reverse;
        }
        .animate-float-accents {
          animation: floatAccents 6s ease-in-out infinite;
        }
        .luxury-gold-grid {
          background-image: 
            linear-gradient(to right, rgba(197, 168, 128, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(197, 168, 128, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .luxury-gold-grid-fine {
          background-image: 
            radial-gradient(circle, rgba(197, 168, 128, 0.12) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}} />

      {/* Product SEO Schemas */}
      <ProductSchema 
        id="stasia-lipstick-premium"
        details={{
          name: "Stasia Velvet Rouge Lipstick - Haute Couture",
          description: "Batom líquido de altíssima fixação enriquecido com óleo de jojoba e ácido hialurônico para hidratação de luxo.",
          image: "https://i.pinimg.com/originals/32/ce/35/32ce350141a3dabeb6f47003b6a13a43.gif"
        }}
      />

      {/* Top Banner: Elevated statement */}
      <div className="bg-[#111111] text-[#FDFBF9] text-center py-2.5 px-4 text-[9px] font-mono tracking-[0.3em] uppercase flex items-center justify-center space-x-3 border-b border-white/5 relative z-50">
        <Truck className="h-3 w-3 text-[#C5A880]" />
        <span>Embalagem Exclusiva & Frete Cortesia nas compras acima de R$ 350 • Até 6x sem juros</span>
      </div>

      {/* Haute Couture Header */}
      <header className="sticky top-0 z-40 bg-[#FDFBF9]/90 backdrop-blur-xl border-b border-[#EAE1D4]/40 py-5 px-6 sm:px-12 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center space-x-8">
            {onBack && (
              <button
                onClick={onBack}
                id="stasia-header-back-btn"
                className="flex items-center space-x-2 text-[10px] font-mono text-[#111111]/60 hover:text-[#111111] transition-all cursor-pointer uppercase font-bold tracking-widest"
              >
                <ArrowLeft className="h-4 w-4 text-[#C5A880]" />
                <span>Voltar ao Portfólio</span>
              </button>
            )}

            <nav className="hidden lg:flex items-center space-x-8 text-[10px] font-mono uppercase tracking-[0.2em] font-extrabold text-[#111111]/70">
              <a href="#store" className="hover:text-[#111111] transition hover:translate-y-[-1px]">Coleção</a>
              <a href="#lookbook" className="hover:text-[#111111] transition hover:translate-y-[-1px]">Visual Lookbook</a>
              <a href="#masterclass" className="hover:text-[#111111] transition hover:translate-y-[-1px]">Atelier Masterclass</a>
              <a href="#ingredients" className="hover:text-[#111111] transition hover:translate-y-[-1px]">Ciência Limpa</a>
              <a href="#quiz" className="hover:text-[#111111] transition hover:translate-y-[-1px]">Skin Match Quiz</a>
            </nav>
          </div>

          {/* Majestic Brand Logo */}
          <div className="flex flex-col items-center select-none cursor-pointer tracking-widest">
            <span className="font-serif text-3xl font-extralight tracking-[0.18em] text-[#111111] leading-none">STASIA</span>
            <span className="text-[7px] font-mono tracking-[0.5em] uppercase text-[#C5A880] font-black mt-1.5">HAUTE COUTURE BEAUTÉ</span>
          </div>

          {/* Right Action Widgets */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsCartOpen(true)}
              id="stasia-header-cart-btn"
              className="relative p-2.5 rounded-full hover:bg-[#EAE1D4]/30 transition-all flex items-center space-x-2 cursor-pointer text-[#111111]"
            >
              <ShoppingBag className="h-5 w-5 text-[#111111]" />
              <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-wider font-extrabold text-[#111111]/80">Sacola</span>
              {cart.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-[#C5A880] text-white text-[8px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* CONTINUOUS HIGH-FASHION MANTRA TICKER */}
      <div className="w-full bg-[#111111] border-b border-[#C5A880]/30 py-2.5 overflow-hidden whitespace-nowrap relative z-10 select-none flex">
        <div className="animate-marquee-slow text-[8px] font-mono tracking-[0.45em] text-[#C5A880] uppercase font-extrabold flex items-center space-x-8 shrink-0">
          <span>✦ stasia haute couture beauté ✦ 100% active botanicals ✦ dermatology of prestige ✦ paris • milan • new york ✦ gold dew 24k essence ✦ siberian organic luxury ✦ clinical safety certifié ✦ zero synthetic preservatives ✦ </span>
          <span>✦ stasia haute couture beauté ✦ 100% active botanicals ✦ dermatology of prestige ✦ paris • milan • new york ✦ gold dew 24k essence ✦ siberian organic luxury ✦ clinical safety certifié ✦ zero synthetic preservatives ✦ </span>
        </div>
      </div>

      {/* HERO SECTION: INCREDIBLY GLAMOROUS & SOPHISTICATED MINIMAL SPLIT */}
      <section className="relative py-20 lg:py-32 bg-[#FAF7F2] overflow-hidden border-b border-[#EAE1D4]/50">
        
        {/* Architectural blueprints grid backdrop */}
        <div className="absolute inset-0 luxury-gold-grid opacity-80 pointer-events-none" />
        <div className="absolute inset-0 luxury-gold-grid-fine opacity-65 pointer-events-none" />

        {/* Elegant glowing golden color spots in the background */}
        <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-[#C5A880]/20 to-[#E28A7A]/15 rounded-full filter blur-[100px] animate-glow-breathing-1 opacity-70 pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-gradient-to-br from-[#C5A880]/15 to-[#B83A4B]/10 rounded-full filter blur-[110px] animate-glow-breathing-2 opacity-50 pointer-events-none" />

        {/* Fine horizontal & vertical golden hairlines framing the Hero */}
        <div className="absolute top-0 bottom-0 left-6 sm:left-12 w-[1px] bg-[#C5A880]/15 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-6 sm:right-12 w-[1px] bg-[#C5A880]/15 pointer-events-none" />
        <div className="absolute top-12 left-0 right-0 h-[1px] bg-[#C5A880]/10 pointer-events-none" />
        <div className="absolute bottom-12 left-0 right-0 h-[1px] bg-[#C5A880]/10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Editorial Text and Brand Pitch */}
            <div className="lg:col-span-6 space-y-8 text-left relative">
              
              {/* Corner blueprint style brackets */}
              <div className="absolute -top-4 -left-4 font-mono text-[10px] text-[#C5A880]/40 font-light pointer-events-none select-none">[ ✦ STASIA ATELIER ]</div>

              <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white border border-[#C5A880]/50 text-[#C5A880] font-mono text-[9px] uppercase tracking-[0.25em] font-extrabold shadow-sm animate-float-accents">
                <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
                <span>The Clean Luxury Standard</span>
              </div>

              <div className="space-y-4">
                <p className="font-mono text-[10px] tracking-[0.35em] text-[#C5A880] uppercase font-black">
                  HAUTE COUTURE DERMATOLOGIQUE
                </p>
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-extralight text-[#111111] leading-[1.15] tracking-tight">
                  A Arte da <br />
                  <span className="italic font-light text-[#C5A880] relative">
                    Expressão Pura
                    <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C5A880] via-[#E28A7A] to-transparent" />
                  </span>.
                </h1>
                <div className="h-[1px] bg-gradient-to-r from-[#C5A880]/60 to-transparent w-40 pt-4" />
              </div>

              <p className="font-sans text-sm sm:text-base text-[#111111]/70 leading-relaxed max-w-xl font-light">
                Stasia redefine a maquiagem como alta-costura para a sua pele. Fórmulas botânicas raras e nanotecnologia celular fundidas a pigmentos puros e micropartículas de ouro refletivo. Desenvolvido para revelar sua radiância mais sofisticada.
              </p>

              <div className="flex flex-wrap gap-5 pt-4">
                <a
                  href="#store"
                  className="px-8 py-4 bg-[#111111] hover:bg-[#C5A880] text-white rounded-none font-mono text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 shadow-xl cursor-pointer flex items-center space-x-3 hover:translate-y-[-2px]"
                >
                  <span>Explorar a Coleção</span>
                  <ChevronRight className="h-4 w-4" />
                </a>

                <a
                  href="#quiz"
                  className="px-8 py-4 border border-[#111111]/30 hover:border-[#111111] hover:bg-[#111111]/5 text-[#111111] rounded-none font-mono text-[10px] font-black uppercase tracking-[0.25em] transition duration-300 cursor-pointer flex items-center space-x-2 hover:translate-y-[-2px]"
                >
                  <span>Achar seu Tom Ideal</span>
                </a>
              </div>

              {/* Editorial Press Badges & Highlights */}
              <div className="pt-8 border-t border-[#EAE1D4]/60 grid grid-cols-3 gap-6 text-left">
                <div className="space-y-1">
                  <span className="font-serif text-sm italic font-extrabold text-[#111111]">VOGUE</span>
                  <p className="text-[9px] text-[#111111]/50 font-sans tracking-wide">“A maquiagem definitiva para quem busca derme impecável.”</p>
                </div>
                <div className="space-y-1">
                  <span className="font-serif text-sm italic font-extrabold text-[#111111]">BAZAAR</span>
                  <p className="text-[9px] text-[#111111]/50 font-sans tracking-wide">“Uma fusão magistral entre alta ciência botânica e glamour.”</p>
                </div>
                <div className="space-y-1">
                  <span className="font-serif text-sm italic font-extrabold text-[#111111]">ELLE</span>
                  <p className="text-[9px] text-[#111111]/50 font-sans tracking-wide">“Diga adeus à maquiagem pesada. Stasia é pura seda.”</p>
                </div>
              </div>

            </div>

            {/* Right: Stunning Asymmetrical Editorial Cover Photo (No blog clusters) */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Decorative absolute gilded outlines */}
                <div className="absolute -top-4 -left-4 w-full h-full border border-[#C5A880]/40 translate-x-1 translate-y-1 pointer-events-none" />
                
                {/* Main luxurious high-contrast portrait container */}
                <div className="relative bg-white p-3.5 border border-[#EAE1D4] shadow-2xl overflow-hidden group">
                  <div className="aspect-[4/5] relative overflow-hidden bg-[#FAF7F2]">
                    <img 
                      src="https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=800&q=80" 
                      alt="Coleção de Alta Maquiagem Stasia Paris" 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[2000ms]"
                    />
                    
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                    {/* Brand Badge inside the main visual */}
                    <div className="absolute top-6 left-6 bg-[#111111]/90 backdrop-blur-md text-[#FDFBF9] py-2 px-3 border border-white/10 text-[8px] font-mono uppercase tracking-[0.2em] font-extrabold">
                      COSMÉTIQUE DE PRESTIGE
                    </div>

                    {/* Captions inside the main visual */}
                    <div className="absolute bottom-6 left-6 right-6 text-left text-white">
                      <span className="text-[8px] font-mono tracking-[0.25em] text-[#C5A880] uppercase font-bold block mb-1">
                        Campanha Oficial Stasia Paris
                      </span>
                      <h3 className="font-serif text-xl font-normal tracking-wide">
                        Luminous Silk Essence & Gold Dew
                      </h3>
                      <p className="text-[10px] text-stone-200 font-light mt-1 max-w-xs leading-relaxed">
                        Fórmulas delicadamente infundidas com aminoácidos da flor de lótus e pigmentação microesférica.
                      </p>
                    </div>

                  </div>
                </div>

                {/* Overlapping luxury miniature decorative box (Adds structural depth) */}
                <div className="absolute -bottom-8 -right-8 hidden md:block w-48 bg-[#111111] text-white p-5 shadow-2xl border border-white/5 text-left space-y-2">
                  <div className="flex text-amber-400">
                    <Star className="h-3 w-3 fill-amber-400" />
                    <Star className="h-3 w-3 fill-amber-400" />
                    <Star className="h-3 w-3 fill-amber-400" />
                    <Star className="h-3 w-3 fill-amber-400" />
                    <Star className="h-3 w-3 fill-amber-400" />
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[#C5A880] block font-black">Certificação de Pureza</span>
                  <p className="text-[9px] text-stone-300 font-light leading-normal">
                    Fórmula 100% orgânica, testada por comitê independente europeu de visagismo dermatológico.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE PRODUCTS STORE: FILTERABLE CATEGORY SHOWCASE */}
      <section id="store" className="py-24 bg-[#FDFBF9] text-left">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EAE1D4]/40">
            <div className="space-y-3">
              <span className="text-[9px] font-mono text-[#C5A880] uppercase tracking-[0.3em] font-black block">A CURA DA BELEZA</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extralight text-[#111111]">A Coleção Alta Performance</h2>
              <p className="font-sans text-xs sm:text-sm text-[#111111]/60 max-w-xl font-light">
                Toques suaves, texturas sublimes e fragrâncias florais sutis. Desenvolvidas com óleos essenciais para fundirem-se organicamente ao tom natural da sua derme.
              </p>
            </div>

            {/* Highly Polished Premium Category Tabs Selector */}
            <div className="flex flex-wrap items-center bg-[#EAE1D4]/20 p-1 border border-[#EAE1D4]/50 rounded-none self-start">
              {[
                { id: "all", label: "Toda a Linha" },
                { id: "olhos", label: "Olhos" },
                { id: "pele", label: "Pele / Rosto" },
                { id: "labios", label: "Lábios" }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as any)}
                  className={`px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-[#111111] text-white shadow-lg"
                      : "text-[#111111]/60 hover:text-[#111111]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid List (Revamped with high luxury card aesthetics) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => {
                const currentShade = selectedProductShade[product.id] || product.shades[0];
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-2 border border-[#EAE1D4]/70 flex flex-col h-full group text-left relative overflow-hidden shadow-sm hover:shadow-[0_25px_65px_rgba(197,168,128,0.22)] hover:border-[#C5A880]/80 transition-all duration-500"
                  >
                    {/* Inner fine gilded frame */}
                    <div className="border border-[#EAE1D4]/40 group-hover:border-[#C5A880]/40 flex flex-col h-full transition-all duration-500 p-1 bg-[#FDFBF9]/40">

                      {/* Visual Packaging Image Frame */}
                      <div className="relative aspect-[4/5] bg-[#FAF8F5] overflow-hidden border border-[#EAE1D4]/30 flex items-center justify-center">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-[1.05] transition-all duration-1000"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Dark/Gold ribbon for new launches */}
                        {product.isNew && (
                          <span className="absolute top-4 left-4 bg-[#111111] text-[#FAF8F5] border border-[#C5A880]/50 text-[7px] font-mono tracking-[0.25em] uppercase px-3 py-1.5 shadow-md">
                            Nouveau
                          </span>
                        )}
                        
                        {/* Heart Wishlist button inside luxury circle */}
                        <button className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/95 text-[#111111] hover:text-[#C5A880] flex items-center justify-center border border-[#EAE1D4]/30 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Heart className="h-4 w-4" />
                        </button>

                        {/* Micro shadow overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                      </div>

                      {/* Metadata, shade picker, and pricing details */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        
                        <div className="space-y-2">
                          
                          {/* Rating with refined spacing */}
                          <div className="flex items-center space-x-1.5 text-amber-500">
                            <div className="flex space-x-0.5">
                              {[1, 2, 3, 4, 5].map(st => (
                                <Star key={st} className="h-3 w-3 fill-[#C5A880] text-[#C5A880]" />
                              ))}
                            </div>
                            <span className="font-mono text-[9px] text-[#111111]/45 tracking-wider font-extrabold">({product.reviewsCount} Curadorias)</span>
                          </div>

                          <h3 className="font-serif text-lg font-normal tracking-wide text-[#111111] group-hover:text-[#C5A880] transition-colors duration-300 flex items-center justify-between">
                            <span>{product.name}</span>
                            <span className="text-xs text-[#C5A880] opacity-0 group-hover:opacity-100 transition-opacity duration-300">✦</span>
                          </h3>
                          <p className="text-[11px] text-[#111111]/70 leading-relaxed font-sans line-clamp-2 font-light">
                            {product.description}
                          </p>
                        </div>

                        {/* Elegant shade picker mimicking jewelry cases */}
                        <div className="space-y-2 pt-1.5 border-t border-[#EAE1D4]/40">
                          <span className="text-[8px] font-mono uppercase text-[#111111]/45 block font-black tracking-widest">
                            Selecionar Tonalidade:
                          </span>
                          <div className="flex flex-wrap gap-2.5">
                            {product.shades.map(sh => (
                              <button
                                key={sh}
                                onClick={() => selectShade(product.id, sh)}
                                style={{ backgroundColor: sh }}
                                className={`h-5 w-5 rounded-full border transition-all duration-300 cursor-pointer ${
                                  currentShade === sh
                                    ? "ring-2 ring-offset-2 ring-[#C5A880] scale-110"
                                    : "border-black/10 hover:scale-105"
                                }`}
                                title={sh}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Pricing block with premium aesthetic */}
                        <div className="border-t border-[#EAE1D4]/40 pt-4 flex items-center justify-between">
                          <div>
                            <span className="text-[8px] font-mono text-[#111111]/40 block uppercase tracking-wider">Atelier Preço</span>
                            <span className="font-mono font-bold text-base text-[#111111]">
                              R$ {product.price.toFixed(2)}
                            </span>
                          </div>

                          <button
                            onClick={() => addToCart(product)}
                            className="px-5 py-3 bg-[#111111] hover:bg-[#C5A880] text-white font-mono text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer flex items-center space-x-2 hover:shadow-lg"
                          >
                            <ShoppingBag className="h-3 w-3" />
                            <span>Adicionar</span>
                          </button>
                        </div>

                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* INNOVATIVE LUXURY LOOKBOOK SECTION (Interactive Experience) */}
      <section id="lookbook" className="py-24 bg-[#FAF7F2] border-t border-b border-[#EAE1D4]/40 text-left relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[9px] font-mono text-[#C5A880] uppercase tracking-[0.3em] font-black block">CURADORIA EDITORIAL</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extralight text-[#111111]">Visual Lookbook: Get The Look</h2>
            <p className="font-sans text-xs sm:text-sm text-[#111111]/60 font-light leading-relaxed">
              Descubra combinações criadas por maquiadores profissionais internacionais. Selecione um visual abaixo para ver os produtos sugeridos e adicione a curadoria completa ao seu carrinho com um único toque.
            </p>
          </div>

          {/* Interactive Lookbook Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-6">
            
            {/* Left Selection Tab List & Description */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                {LUXURY_LOOKS.map(look => (
                  <button
                    key={look.id}
                    onClick={() => setActiveLookId(look.id)}
                    className={`w-full text-left p-6 border transition-all duration-300 cursor-pointer flex items-start space-x-4 ${
                      activeLookId === look.id
                        ? "bg-white border-[#C5A880] shadow-md pl-8"
                        : "bg-transparent border-[#EAE1D4]/40 hover:bg-white/50"
                    }`}
                  >
                    <div className={`h-8 w-8 rounded-full border font-mono text-xs flex items-center justify-center shrink-0 ${
                      activeLookId === look.id ? "bg-[#111111] text-white border-transparent" : "text-[#111111]/40 border-[#EAE1D4]"
                    }`}>
                      0{LUXURY_LOOKS.indexOf(look) + 1}
                    </div>
                    <div className="space-y-1.5 text-left">
                      <h4 className="font-serif font-medium text-[#111111] text-base">{look.name}</h4>
                      <p className="font-sans text-xs text-[#111111]/60 leading-normal font-light">{look.tagline}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Look Specific Slogan and Multi-Buy CTA */}
              <div className="bg-white p-6 border border-[#EAE1D4] shadow-sm space-y-4">
                <span className="text-[8px] font-mono text-[#C5A880] uppercase block font-black tracking-widest">Estilo & Composição</span>
                <p className="text-xs text-[#111111]/80 leading-relaxed font-light font-sans italic">
                  “{activeLook.vibe}”
                </p>

                <div className="h-px bg-[#EAE1D4]/40" />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-mono text-[#111111]/45 block uppercase">Look Completo</span>
                    <span className="font-serif font-semibold text-[#111111] text-sm">
                      {activeLook.productIds.length} Itens Harmonizados
                    </span>
                  </div>

                  <button
                    onClick={() => addEntireLookToCart(activeLook)}
                    className="px-5 py-3 bg-[#111111] hover:bg-[#C5A880] text-white font-mono text-[9px] font-black uppercase tracking-widest transition duration-300 flex items-center space-x-2 shadow-md cursor-pointer"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Adicionar Visual</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Immersive High-Fashion Portrait display */}
            <div className="lg:col-span-7 relative">
              <div className="h-full min-h-[400px] bg-white p-3 border border-[#EAE1D4] shadow-xl relative overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLook.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-3"
                  >
                    <img 
                      src={activeLook.image} 
                      alt={activeLook.name} 
                      className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent opacity-85" />
                    
                    {/* Floating Product Indicator overlay */}
                    <div className="absolute bottom-6 left-6 right-6 text-left text-white space-y-4">
                      
                      <div className="flex flex-wrap gap-2.5">
                        {activeLook.productIds.map(pId => {
                          const prod = COSMETICS_PRODUCTS.find(p => p.id === pId);
                          if (!prod) return null;
                          return (
                            <div key={pId} className="bg-black/75 backdrop-blur-md px-3 py-1.5 border border-white/10 rounded-none flex items-center space-x-2 text-[10px]">
                              <span className="font-serif italic font-bold text-[#C5A880]">{prod.name}</span>
                              <span className="font-mono text-[8px] text-stone-300">• R$ {prod.price}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[8px] font-mono text-[#C5A880] uppercase tracking-wider font-extrabold block">Atelier Lookbook</span>
                        <h3 className="font-serif text-xl font-light italic text-[#FDFBF9]">{activeLook.name}</h3>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ATELIER MASTERCLASS: O GESTO E A FÓRMULA (Elegant layout spacing the interactive GIFs) */}
      <section id="masterclass" className="py-24 bg-[#FDFBF9] text-left relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EAE1D4]/40">
            <div className="space-y-3">
              <span className="text-[9px] font-mono text-[#C5A880] uppercase tracking-[0.3em] font-black block">STASIA IN ACTION</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extralight text-[#111111]">O Gesto de Beleza: Atelier Masterclass</h2>
              <p className="font-sans text-xs sm:text-sm text-[#111111]/60 max-w-2xl font-light leading-relaxed">
                Nossos GIFs e tutoriais não estão amontoados. Cada gesto possui uma ciência, uma textura e uma história própria. Aprenda a aplicar nossas fórmulas suntuosas de forma impecável.
              </p>
            </div>
          </div>

          {/* Elegant three-column interactive campaign cards (Spreading the GIFs beautifully) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Masterclass 1: Eyeliner application GIF */}
            <div className="bg-[#FAF7F2] border border-[#EAE1D4]/50 p-4 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="aspect-[3/4] overflow-hidden relative border border-[#EAE1D4]/30 bg-white">
                  <img 
                    src="https://i.pinimg.com/originals/b4/c8/f5/b4c8f52f2b5c2c0626881862dd7480fa.gif" 
                    alt="Mulher aplicando lápis delineador Stasia Precision Stroke" 
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-wider text-[#C5A880] font-black">
                    <span>Atelier Olhos</span>
                    <span>Gesto 01</span>
                  </div>
                  <h4 className="font-serif text-base font-medium text-[#111111]">O Traço de Seda Noir</h4>
                  <p className="text-[11px] text-[#111111]/70 leading-relaxed font-sans font-light">
                    Aplique o Precision Stroke Eyeliner com traços finos e curtos rente à raiz dos cílios. Esfume suavemente com a ponteira antes da fixação total de 24h.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-stone-200/50 mt-4">
                <a 
                  href="#store" 
                  onClick={() => setSelectedCategory("olhos")}
                  className="font-mono text-[9px] uppercase tracking-widest text-[#C5A880] hover:text-[#111111] transition-all font-black flex items-center space-x-1.5"
                >
                  <span>Conhecer Precision Stroke</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Masterclass 2: Makeup Foundation GIF */}
            <div className="bg-[#FAF7F2] border border-[#EAE1D4]/50 p-4 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="aspect-[3/4] overflow-hidden relative border border-[#EAE1D4]/30 bg-white">
                  <img 
                    src="https://capricho.abril.com.br/wp-content/uploads/2016/09/make-pele.gif" 
                    alt="Aplicação de base fluida Stasia Luminous Silk" 
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-wider text-[#C5A880] font-black">
                    <span>Atelier Rosto</span>
                    <span>Gesto 02</span>
                  </div>
                  <h4 className="font-serif text-base font-medium text-[#111111]">Fusão Segunda Pele</h4>
                  <p className="text-[11px] text-[#111111]/70 leading-relaxed font-sans font-light">
                    Espalhe a base fluida Luminous Silk do centro do rosto para fora com batidinhas suaves. Sua fórmula ultra-hidratante funde-se instantaneamente eliminando poros dilatados.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-stone-200/50 mt-4">
                <a 
                  href="#store" 
                  onClick={() => setSelectedCategory("pele")}
                  className="font-mono text-[9px] uppercase tracking-widest text-[#C5A880] hover:text-[#111111] transition-all font-black flex items-center space-x-1.5"
                >
                  <span>Conhecer Luminous Silk</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Masterclass 3: Matte Velvet Lipstick GIF */}
            <div className="bg-[#FAF7F2] border border-[#EAE1D4]/50 p-4 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="aspect-[3/4] overflow-hidden relative border border-[#EAE1D4]/30 bg-white">
                  <img 
                    src="https://i.pinimg.com/originals/32/ce/35/32ce350141a3dabeb6f47003b6a13a43.gif" 
                    alt="Batom líquido de luxo Stasia Matte Velvet" 
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-wider text-[#C5A880] font-black">
                    <span>Atelier Lábios</span>
                    <span>Gesto 03</span>
                  </div>
                  <h4 className="font-serif text-base font-medium text-[#111111]">O Veludo Carmim</h4>
                  <p className="text-[11px] text-[#111111]/70 leading-relaxed font-sans font-light">
                    Aplique o Velvet Rouge batom contornando delicadamente o arco do cupido. Espere 45 segundos para que a tecnologia de aminoácidos forme o filme aveludado intransferível.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-stone-200/50 mt-4">
                <a 
                  href="#store" 
                  onClick={() => setSelectedCategory("labios")}
                  className="font-mono text-[9px] uppercase tracking-widest text-[#C5A880] hover:text-[#111111] transition-all font-black flex items-center space-x-1.5"
                >
                  <span>Conhecer Velvet Rouge</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SCIENCE & INGREDIENTS SHOWCASE (Clean cosmetics trust builder) */}
      <section id="ingredients" className="py-24 bg-[#111111] text-white text-left relative">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-16 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[9px] font-mono text-[#C5A880] uppercase tracking-[0.3em] font-black block">STASIA LABORATOIRE</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extralight text-[#FDFBF9] leading-tight">
                Matéria-Prima Rara, <br />
                <span className="italic font-light text-[#C5A880]">Ciência Regenerativa</span>.
              </h2>
              <p className="font-sans text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
                Unimos a exuberância das plantas adaptógenas siberianas e tropicais com a máxima pureza dermatológica alemã. Nossos produtos são livres de conservantes sintéticos, silicones insolúveis, óleos minerais, talco, glúten e metais pesados.
              </p>
              
              <div className="h-px bg-stone-800" />

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/5 rounded-full border border-white/10 text-[#C5A880]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs text-stone-200">Testado sob Rigor Clínico</h4>
                  <p className="text-[10px] text-stone-400 leading-normal font-sans font-light">Segurança biológica absoluta atestada para gestantes e peles hipersensíveis.</p>
                </div>
              </div>
            </div>

            {/* Active Raw Ingredients Row Carousel/Bento */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Ingredient 1 */}
              <div className="relative overflow-hidden bg-gradient-to-b from-white/[0.07] to-transparent border border-white/10 hover:border-[#C5A880]/50 p-6 flex flex-col justify-between space-y-8 hover:bg-white/[0.12] transition-all duration-500 shadow-lg hover:shadow-[0_15px_40px_rgba(197,168,128,0.15)] group">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#C5A880]/15 rounded-full filter blur-xl group-hover:bg-[#C5A880]/30 transition-all duration-500" />
                <span className="font-serif text-3xl font-extralight text-[#C5A880] tracking-wider relative z-10">Au 24k</span>
                <div className="space-y-2 relative z-10">
                  <h4 className="font-serif font-bold text-xs text-stone-200 group-hover:text-white transition-colors">Micropartículas de Ouro 24K</h4>
                  <p className="text-[10px] text-stone-400 leading-relaxed font-light font-sans group-hover:text-stone-300 transition-colors">
                    Nivelador óptico ativo que reflete a radiação, iluminando rugas e linhas finas por difração de luz celular.
                  </p>
                </div>
              </div>

              {/* Ingredient 2 */}
              <div className="relative overflow-hidden bg-gradient-to-b from-white/[0.07] to-transparent border border-white/10 hover:border-[#C5A880]/50 p-6 flex flex-col justify-between space-y-8 hover:bg-white/[0.12] transition-all duration-500 shadow-lg hover:shadow-[0_15px_40px_rgba(197,168,128,0.15)] group">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#C5A880]/15 rounded-full filter blur-xl group-hover:bg-[#C5A880]/30 transition-all duration-500" />
                <span className="font-serif text-3xl font-extralight text-[#C5A880] tracking-wider relative z-10">H.A.+</span>
                <div className="space-y-2 relative z-10">
                  <h4 className="font-serif font-bold text-xs text-stone-200 group-hover:text-white transition-colors">Ácido Hialurônico Lipossomado</h4>
                  <p className="text-[10px] text-stone-400 leading-relaxed font-light font-sans group-hover:text-stone-300 transition-colors">
                    Moléculas envolvidas em cápsulas lipídicas que penetram profundamente nas fibras cutâneas e labiais.
                  </p>
                </div>
              </div>

              {/* Ingredient 3 */}
              <div className="relative overflow-hidden bg-gradient-to-b from-white/[0.07] to-transparent border border-white/10 hover:border-[#C5A880]/50 p-6 flex flex-col justify-between space-y-8 hover:bg-white/[0.12] transition-all duration-500 shadow-lg hover:shadow-[0_15px_40px_rgba(197,168,128,0.15)] group">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#C5A880]/15 rounded-full filter blur-xl group-hover:bg-[#C5A880]/30 transition-all duration-500" />
                <span className="font-serif text-3xl font-extralight text-[#C5A880] tracking-wider relative z-10">Jjb</span>
                <div className="space-y-2 relative z-10">
                  <h4 className="font-serif font-bold text-xs text-stone-200 group-hover:text-white transition-colors">Óleo Purificado de Jojoba</h4>
                  <p className="text-[10px] text-stone-400 leading-relaxed font-light font-sans group-hover:text-stone-300 transition-colors">
                    Agente emoliente natural que restaura a barreira sebácea sem obstruir os poros, mantendo o acabamento sequinho.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ELEGANT DIAGNOSTIC SKIN MATCH QUIZ (Gilded consulting frame) */}
      <section id="quiz" className="py-24 bg-[#FAF7F2] text-left relative border-b border-[#EAE1D4]/40">
        <div className="max-w-4xl mx-auto px-6 sm:px-12">
          
          <div className="bg-white border-2 border-[#EAE1D4] p-8 sm:p-14 relative overflow-hidden shadow-xl">
            
            {/* Elegant luxury visual line frames */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C5A880]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-3 left-3 right-3 bottom-3 border border-[#EAE1D4]/40 pointer-events-none" />
            
            <div className="border-b border-[#EAE1D4] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
              <div>
                <span className="font-mono text-[8px] text-[#C5A880] font-black uppercase tracking-[0.25em] block">ATELIER VISAGISME DIGITAL</span>
                <h3 className="font-serif font-medium text-2xl text-[#111111] tracking-wide mt-1">Diagnóstico Skin Match Stasia</h3>
              </div>
              <span className="bg-[#FAF7F2] border border-[#EAE1D4] text-[#111111] font-mono text-[8px] font-black px-3.5 py-1.5 uppercase tracking-[0.2em]">
                Exame Online
              </span>
            </div>

            {/* QUIZ WORKSPACE */}
            <div className="py-8 relative z-10">
              {quizStep === 0 ? (
                <div className="space-y-6 max-w-xl text-left">
                  <p className="text-xs sm:text-sm text-[#111111]/80 leading-relaxed font-sans font-light">
                    Não sabe qual é o tom de base ideal ou a textura de batom perfeita para o seu subtom de derme? Nosso algoritmo visagista analisa as características físicas faciais, gerando recomendações com exatidão molecular.
                  </p>
                  <button
                    onClick={() => setQuizStep(1)}
                    id="stasia-quiz-start-btn"
                    className="px-8 py-3.5 bg-[#111111] hover:bg-[#C5A880] text-[#FAF8F5] font-mono text-[9px] font-black uppercase tracking-[0.25em] transition duration-300 cursor-pointer flex items-center space-x-2"
                  >
                    <span>Iniciar Diagnóstico Privado</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              ) : quizStep === 1 ? (
                <div className="space-y-6 text-left">
                  <span className="text-[9px] font-mono text-[#C5A880] font-bold uppercase block tracking-wider">Etapa 1 de 3: TIPO DE DERME</span>
                  <h4 className="font-serif font-medium text-[#111111] text-base sm:text-lg">Qual a principal característica da sua pele no dia a dia?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: "oleosa", label: "Brilho constante, poros abertos", desc: "Oleosa / Acneica" },
                      { id: "mista", label: "Zona T oleosa, bochechas normais", desc: "Mista padrão" },
                      { id: "seca", label: "Aspecto opaco, descamação leve", desc: "Seca / Madura" }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => handleQuizAnswer("skinType", opt.id)}
                        className="p-5 bg-[#FAF7F2] border border-[#EAE1D4] hover:border-[#C5A880] text-left transition duration-300 flex flex-col justify-between h-[100px] cursor-pointer"
                      >
                        <span className="font-sans font-bold text-xs block text-[#111111]">{opt.desc}</span>
                        <span className="text-[9px] text-[#111111]/60 block mt-1 font-sans leading-tight font-light">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : quizStep === 2 ? (
                <div className="space-y-6 text-left">
                  <span className="text-[9px] font-mono text-[#C5A880] font-bold uppercase block tracking-wider">Etapa 2 de 3: TEXTURA E ACABAMENTO</span>
                  <h4 className="font-serif font-medium text-[#111111] text-base sm:text-lg">Qual textura e cobertura você mais prioriza para o dia a dia?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: "luminous", label: "Efeito segunda pele, acetinado natural", desc: "Acetinado Luminous" },
                      { id: "matte", label: "Cobertura total de poros, sequinha", desc: "Matte Velvet" },
                      { id: "dewy", label: "Radiância imediata, brilho molhado", desc: "Dewy Glow" }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => handleQuizAnswer("coverage", opt.id)}
                        className="p-5 bg-[#FAF7F2] border border-[#EAE1D4] hover:border-[#C5A880] text-left transition duration-300 flex flex-col justify-between h-[100px] cursor-pointer"
                      >
                        <span className="font-sans font-bold text-xs block text-[#111111]">{opt.desc}</span>
                        <span className="text-[9px] text-[#111111]/60 block mt-1 font-sans leading-tight font-light">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : quizStep === 3 ? (
                <div className="space-y-6 text-left">
                  <span className="text-[9px] font-mono text-[#C5A880] font-bold uppercase block tracking-wider">Etapa 3 de 3: SUBTOM DE COR</span>
                  <h4 className="font-serif font-medium text-[#111111] text-base sm:text-lg">Ao se expor ao sol sem protetor, como sua pele reage?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: "frio", label: "Fica vermelha e quase nunca bronzeia", desc: "Frio (Rosada)" },
                      { id: "neutro", label: "Fica vermelha no início, mas bronzeia", desc: "Neutro (Equilibrado)" },
                      { id: "quente", label: "Bronzeia facilmente com tom dourado", desc: "Quente (Amarelada)" }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => handleQuizAnswer("undertone", opt.id)}
                        className="p-5 bg-[#FAF7F2] border border-[#EAE1D4] hover:border-[#C5A880] text-left transition duration-300 flex flex-col justify-between h-[100px] cursor-pointer"
                      >
                        <span className="font-sans font-bold text-xs block text-[#111111]">{opt.desc}</span>
                        <span className="text-[9px] text-[#111111]/60 block mt-1 font-sans leading-tight font-light">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : quizSubmitting ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                  <div className="h-7 w-7 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
                  <span className="font-mono text-[9px] text-[#111111]/60 uppercase tracking-widest font-black">Cruzando coeficientes de colorimetria...</span>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-left"
                >
                  <div className="bg-[#FAF7F2] border border-[#EAE1D4] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 max-w-md">
                      <div className="inline-flex items-center space-x-1.5 bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30 text-[8px] font-mono uppercase px-2.5 py-1 font-bold">
                        <CheckCircle className="h-3 w-3" />
                        <span>RECOMENDAÇÃO EXATA DISPONÍVEL</span>
                      </div>
                      <h4 className="font-serif font-bold text-[#111111] text-sm">Fórmula Harmonizada Diagnosticada:</h4>
                      <p className="text-[11px] text-[#111111]/70 leading-relaxed font-sans font-light">
                        Sua pele com perfil <strong>{quizAnswers.skinType}</strong> e subtom <strong>{quizAnswers.undertone}</strong> combina perfeitamente com a tecnologia de hidratação e absorção do produto selecionado abaixo.
                      </p>
                    </div>

                    <div className="flex items-center space-x-4 bg-white p-4 border border-[#EAE1D4] w-full sm:w-auto shadow-sm">
                      <div className="h-16 w-16 shrink-0 overflow-hidden bg-white border border-[#EAE1D4]">
                        <img 
                          src={getQuizRecommendation().image} 
                          alt="Recomendação Stasia" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <span className="text-[7px] font-mono text-[#C5A880] uppercase block font-black tracking-widest">STASIA CERTIFICATE</span>
                        <h5 className="font-serif text-xs font-bold text-[#111111] truncate max-w-[150px] mt-0.5">
                          {getQuizRecommendation().name}
                        </h5>
                        <button
                          onClick={() => addToCart(getQuizRecommendation())}
                          className="font-mono text-[8px] text-[#C5A880] hover:text-[#111111] block font-black uppercase tracking-widest mt-2 cursor-pointer"
                        >
                          Adicionar com Desconto →
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={resetQuiz}
                      className="px-6 py-3 border border-[#111111]/20 hover:bg-[#111111]/5 text-[#111111] font-mono text-[9px] font-black uppercase tracking-widest transition"
                    >
                      Refazer Teste
                    </button>
                    <a
                      href="#store"
                      className="px-6 py-3 bg-[#111111] text-[#FAF8F5] font-mono text-[9px] font-black uppercase tracking-widest transition text-center w-full sm:w-auto"
                    >
                      Ir Para a Loja
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* PRIV PRIVILEGED CLUB NEWSLETTER */}
      <section className="py-16 bg-[#FAF7F2] text-center">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <span className="text-[9px] font-mono text-[#C5A880] uppercase tracking-[0.35em] font-black block">CONEXÃO EXCLUSIVA</span>
          <h3 className="font-serif text-3xl text-[#111111] font-light">Entre no Club Privativo Stasia</h3>
          <p className="font-sans text-xs sm:text-sm text-[#111111]/60 leading-relaxed max-w-lg mx-auto font-light">
            Receba segredos de beleza, lançamentos em primeira mão e convites para desfiles e eventos privados de alta-costura diretamente na sua caixa de entrada.
          </p>

          {newsletterSubscribed ? (
            <div className="bg-white border-2 border-[#C5A880] p-6 text-center max-w-md mx-auto space-y-2 shadow-lg">
              <CheckCircle className="h-6 w-6 text-[#C5A880] mx-auto" />
              <h5 className="font-serif text-sm font-bold text-[#111111] uppercase tracking-wider">Assinatura Ativada</h5>
              <p className="text-[10px] text-[#111111]/60 font-sans font-light">Boas-vindas enviadas. Aproveite seu cupom de 15% de desconto para sua primeira curadoria.</p>
            </div>
          ) : (
            <form 
              onSubmit={(e) => { e.preventDefault(); if (newsletterEmail) setNewsletterSubscribed(true); }}
              className="flex flex-col sm:flex-row max-w-md mx-auto gap-2"
            >
              <input
                type="email"
                required
                placeholder="Insira seu e-mail de luxo..."
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-white border border-[#EAE1D4] text-xs focus:outline-none focus:border-[#C5A880]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#111111] text-[#FAF8F5] text-[9px] font-mono font-black uppercase tracking-widest hover:bg-[#C5A880] transition duration-300"
              >
                Cadastrar
              </button>
            </form>
          )}
        </div>
      </section>

      {/* SHOPPING CART OVERLAY SLIDE-OUT DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop opacity */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 pointer-events-auto"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-[#EAE1D4] shadow-2xl z-50 flex flex-col justify-between text-left"
            >
              
              {/* Header */}
              <div className="p-6 border-b border-[#EAE1D4]/40 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <ShoppingBag className="h-5 w-5 text-[#C5A880]" />
                  <span className="font-serif font-bold text-base text-[#111111]">Sua Sacola de Compras</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="font-mono text-[9px] text-[#111111]/50 hover:text-[#111111] uppercase tracking-widest cursor-pointer font-extrabold"
                >
                  Fechar
                </button>
              </div>

              {/* Items Panel */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {checkoutComplete ? (
                  <div className="py-12 text-center space-y-4">
                    <CheckCircle className="h-12 w-12 text-[#C5A880] mx-auto" />
                    <h4 className="font-serif text-lg font-bold text-[#111111] uppercase">Pedido Realizado com Sucesso!</h4>
                    <p className="text-[11px] text-[#111111]/70 leading-relaxed font-sans max-w-xs mx-auto font-light">
                      Obrigado por comprar na Stasia. Nosso atelier já está embalando sua curadoria de maquiagens. Um e-mail de confirmação financeira foi enviado.
                    </p>
                    <button
                      onClick={() => { setCheckoutComplete(false); setIsCartOpen(false); }}
                      className="px-6 py-3 bg-[#111111] text-[#FAF8F5] font-mono text-[9px] font-black uppercase tracking-widest"
                    >
                      Continuar Navegando
                    </button>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <ShoppingBag className="h-10 w-10 text-[#C5A880]/30 mx-auto" />
                    <p className="text-xs text-[#111111]/50 font-sans font-light">Sua sacola está vazia no momento.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-3 bg-[#111111] text-[#FAF8F5] font-mono text-[9px] font-black uppercase tracking-widest"
                    >
                      Explorar Produtos
                    </button>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-4 border-b border-[#EAE1D4]/30 pb-4">
                      
                      <div className="flex items-start space-x-3.5">
                        <div className="h-16 w-16 bg-[#FAF8F5] border border-[#EAE1D4]/40 overflow-hidden shrink-0">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="space-y-1">
                          <h5 className="font-serif font-bold text-xs text-[#111111] leading-snug">
                            {item.product.name}
                          </h5>
                          <div className="flex items-center space-x-1.5">
                            <span className="text-[8px] font-mono text-[#111111]/40 uppercase">Tom:</span>
                            <span 
                              style={{ backgroundColor: item.selectedShade }} 
                              className="h-3 w-3 rounded-full border border-black/10 inline-block"
                            />
                            <span className="text-[8px] font-mono text-[#111111]/60 font-bold uppercase">
                              ({item.selectedShade})
                            </span>
                          </div>

                          {/* Quantity Controller */}
                          <div className="flex items-center space-x-2 bg-[#EAE1D4]/20 border border-[#EAE1D4]/50 p-1 w-20 justify-between mt-1.5">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.selectedShade, -1)}
                              className="p-0.5 hover:bg-white transition"
                            >
                              <Minus className="h-2.5 w-2.5 text-[#111111]" />
                            </button>
                            <span className="font-mono text-[10px] font-black text-[#111111]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.selectedShade, 1)}
                              className="p-0.5 hover:bg-white transition"
                            >
                              <Plus className="h-2.5 w-2.5 text-[#111111]" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex flex-col justify-between h-full space-y-4 shrink-0">
                        <span className="font-mono text-[11px] font-black text-[#111111]">
                          R$ {(item.product.price * item.quantity).toFixed(2)}
                        </span>

                        <button
                          onClick={() => removeCartItem(item.product.id, item.selectedShade)}
                          className="text-[#111111]/40 hover:text-red-600 transition p-1 text-right self-end"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                    </div>
                  ))
                )}
              </div>

              {/* Footer pricing totals & checkout */}
              {!checkoutComplete && cart.length > 0 && (
                <div className="bg-[#FAF8F5] border-t border-[#EAE1D4] p-6 space-y-4">
                  
                  {isCheckingOut ? (
                    <form onSubmit={handleCheckoutSubmit} className="space-y-3.5">
                      <span className="text-[8px] font-mono text-[#C5A880] uppercase block font-black tracking-widest">Detalhes do Destinatário</span>
                      
                      <input
                        type="text"
                        required
                        placeholder="Nome Completo Destinatário"
                        value={checkoutForm.name}
                        onChange={e => setCheckoutForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 bg-white border border-[#EAE1D4] text-xs focus:outline-none focus:border-[#C5A880]"
                      />

                      <input
                        type="tel"
                        required
                        placeholder="WhatsApp de Contato"
                        value={checkoutForm.phone}
                        onChange={e => setCheckoutForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 bg-white border border-[#EAE1D4] text-xs focus:outline-none focus:border-[#C5A880]"
                      />

                      <input
                        type="text"
                        required
                        placeholder="Endereço Completo de Entrega"
                        value={checkoutForm.address}
                        onChange={e => setCheckoutForm(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full px-3 py-2 bg-white border border-[#EAE1D4] text-xs focus:outline-none focus:border-[#C5A880]"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "pix", label: "Pix Copia e Cola" },
                          { id: "credit", label: "Cartão de Crédito" }
                        ].map(pm => (
                          <button
                            key={pm.id}
                            type="button"
                            onClick={() => setCheckoutForm(prev => ({ ...prev, paymentMethod: pm.id }))}
                            className={`p-2.5 border text-center font-mono text-[9px] uppercase font-bold transition cursor-pointer ${
                              checkoutForm.paymentMethod === pm.id
                                ? "bg-[#111111] border-[#111111] text-white"
                                : "bg-white border-[#EAE1D4] text-[#111111]/70"
                            }`}
                          >
                            {pm.label}
                          </button>
                        ))}
                      </div>

                      <div className="pt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setIsCheckingOut(false)}
                          className="flex-1 py-3 border border-[#EAE1D4] text-[#111111] font-mono text-[9px] uppercase font-bold"
                        >
                          Voltar
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3 bg-[#111111] text-[#FAF8F5] hover:bg-[#C5A880] font-mono text-[9px] uppercase font-bold text-center tracking-widest transition duration-300"
                        >
                          Confirmar Pedido
                        </button>
                      </div>

                    </form>
                  ) : (
                    <>
                      <div className="space-y-2.5 text-xs text-[#111111]/80">
                        <div className="flex justify-between">
                          <span>Subtotal de Maquiagem:</span>
                          <span className="font-mono font-bold">R$ {getCartTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Embalagem Especial Stasia:</span>
                          <span className="font-mono text-[#C5A880] font-extrabold">Especial Cortesia</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Envio Exclusivo Segurado:</span>
                          <span className="font-mono text-[#C5A880] font-extrabold">
                            {getCartTotal() >= 350 ? "Gratuito" : "R$ 15,00"}
                          </span>
                        </div>
                        <div className="h-px bg-[#EAE1D4]/40 w-full" />
                        <div className="flex justify-between text-sm text-[#111111]">
                          <span className="font-serif font-bold">Total do Atelier:</span>
                          <span className="font-mono font-black">
                            R$ {(getCartTotal() + (getCartTotal() >= 350 ? 0 : 15)).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsCheckingOut(true)}
                        className="w-full py-4 bg-[#111111] hover:bg-[#C5A880] text-white text-[9px] font-mono font-black uppercase tracking-widest transition duration-300 text-center cursor-pointer shadow-md"
                      >
                        Finalizar Curadoria & Checkout
                      </button>
                    </>
                  )}

                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-[#111111] text-stone-300 py-20 text-left border-t border-[#C5A880]/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-stone-800 pb-12">
          
          <div className="space-y-4">
            <span className="font-serif text-3xl font-extralight tracking-[0.18em] text-white leading-none block">STASIA</span>
            <p className="text-[10px] text-stone-400 font-sans leading-relaxed font-light">
              O requinte do visagismo estético aliado à máxima pureza celular botânica. Fórmulas impecáveis de alta performance dermo-corretiva desenvolvidas para revelar a sua beleza mais autêntica.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[9px] font-mono text-[#C5A880] uppercase tracking-widest block font-bold">Menu Principal</span>
            <ul className="space-y-2 text-[11px] text-stone-400 font-sans font-light">
              <li><a href="#store" className="hover:text-white transition">Nossa Coleção</a></li>
              <li><a href="#lookbook" className="hover:text-white transition">Lookbook de Estilo</a></li>
              <li><a href="#masterclass" className="hover:text-white transition">Atelier Masterclass</a></li>
              <li><a href="#ingredients" className="hover:text-white transition">Ciência dos Ativos</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[9px] font-mono text-[#C5A880] uppercase tracking-widest block font-bold">Contato & Atelier</span>
            <ul className="space-y-2 text-[11px] text-stone-400 font-sans font-light">
              <li><span>Suporte Privado: sac@stasia.com.br</span></li>
              <li><span>WhatsApp Concierge: (11) 91234-5678</span></li>
              <li><span>Showroom Privé: Jardins, São Paulo - SP</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[9px] font-mono text-[#C5A880] uppercase tracking-widest block font-bold">Siga a Stasia</span>
            <p className="text-[10px] text-stone-400 font-sans leading-relaxed font-light">Siga nossa curadoria visual e veja bastidores exclusivos de desfiles de moda internacionais.</p>
            <div className="flex space-x-3 text-stone-400 pt-1">
              <a href="#" className="hover:text-white transition"><Instagram className="h-4 w-4" /></a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-stone-500 gap-4 font-light">
          <p>© 2026 STASIA COSMÉTIQUES S.A. TODOS OS DIREITOS RESERVADOS. CNPJ: 12.345.678/0001-90</p>
          <p className="font-mono uppercase text-[8px] tracking-widest text-[#C5A880]">Livre de silicones, parabenos e microplásticos insolúveis.</p>
        </div>
      </footer>

    </div>
  );
}
