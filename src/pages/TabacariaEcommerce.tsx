import React, { useState, useEffect } from "react";
import { 
  Flame, 
  ShoppingCart, 
  Search, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  Package, 
  User, 
  Heart, 
  Star, 
  SlidersHorizontal, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  RefreshCw, 
  Send, 
  ExternalLink, 
  X, 
  ArrowLeft, 
  Menu, 
  Filter, 
  Copy, 
  Check, 
  Clock, 
  Sparkles, 
  DollarSign, 
  BarChart3, 
  FileText, 
  Tag, 
  HelpCircle, 
  PhoneCall, 
  Eye, 
  ChevronDown,
  Layers,
  Award,
  Zap,
  Lock,
  MessageSquare
} from "lucide-react";

// SEO & Breadcrumb Framework
import { MetaTags, Breadcrumb, ProductSchema } from "../seo/SEOComponents";

// Product Data Type Interface
export interface Product {
  id: string;
  name: string;
  category: "sedas" | "bongs" | "dichavadores" | "charutos" | "essencias" | "vaporizadores" | "acessorios";
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  stock: number;
  brand: string;
  isBestSeller?: boolean;
  isNew?: boolean;
}

// Order Type Interface
export interface Order {
  id: string;
  date: string;
  customerName: string;
  email: string;
  whatsapp: string;
  items: { product: Product; quantity: number }[];
  totalAmount: number;
  shippingFee: number;
  paymentMethod: "Pix" | "CreditCard";
  status: "Aguardando Pagamento" | "Em Preparação" | "Enviado" | "Entregue";
  trackingCode?: string;
  cep: string;
  address: string;
}

// Initial Sample Product Catalog
const PRODUCT_IMAGE_URL = "https://img.magnific.com/fotos-gratis/arranjo-de-natureza-morta-para-narguile_23-2149213282.jpg";

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "tab-01",
    name: "Seda RAW Organic Hemp King Size Slim",
    category: "sedas",
    price: 12.90,
    originalPrice: 16.00,
    rating: 4.9,
    reviewsCount: 342,
    image: PRODUCT_IMAGE_URL,
    description: "Seda 100% orgânica de cânhamo não branqueado, queimado ultra lenta e sem aditivos químicos. Caixinha com 32 folhas King Size.",
    stock: 145,
    brand: "RAW",
    isBestSeller: true
  },
  {
    id: "tab-02",
    name: "Bong de Vidro Borossilicato Ice Catch 30cm",
    category: "bongs",
    price: 189.90,
    originalPrice: 240.00,
    rating: 4.95,
    reviewsCount: 118,
    image: PRODUCT_IMAGE_URL,
    description: "Bong de vidro pirex borossilicato de alta resistência com trava de gelo (Ice Catcher), suporte para trava de resfriamento e bowl de 14mm.",
    stock: 8,
    brand: "Squadafum",
    isBestSeller: true
  },
  {
    id: "tab-03",
    name: "Dichavador Metal 4 Partes Alumínio Anodizado 50mm",
    category: "dichavadores",
    price: 69.90,
    originalPrice: 89.00,
    rating: 4.85,
    reviewsCount: 210,
    image: PRODUCT_IMAGE_URL,
    description: "Dichavador de alumínio aeronáutico com fechamento magnético, dentes em formato de diamante, tela coletora de kief e pá raspadora.",
    stock: 24,
    brand: "Kings",
    isNew: true
  },
  {
    id: "tab-04",
    name: "Charuto Cubano Romeo y Julieta No. 2 Tubos",
    category: "charutos",
    price: 149.00,
    rating: 5.0,
    reviewsCount: 88,
    image: PRODUCT_IMAGE_URL,
    description: "Charuto feito à mão em Vuelta Abajo, Cuba. Sabor suave a médio com notas de cedro, couro e especiarias sutis. Embalado em tubo de alumínio selado.",
    stock: 12,
    brand: "Romeo y Julieta",
    isBestSeller: true
  },
  {
    id: "tab-05",
    name: "Vaporizador de Ervas Secas AirVape XS GO",
    category: "vaporizadores",
    price: 499.00,
    originalPrice: 599.00,
    rating: 4.9,
    reviewsCount: 76,
    image: PRODUCT_IMAGE_URL,
    description: "Vaporizador portátil de condução híbrida com câmara de cerâmica oval, 5 temperaturas pré-definidas e aquecimento em apenas 20 segundos.",
    stock: 5,
    brand: "AirVape",
    isBestSeller: true
  },
  {
    id: "tab-06",
    name: "Isqueiro Clipper Recarregável Metal Gold Edition",
    category: "acessorios",
    price: 45.00,
    rating: 4.8,
    reviewsCount: 156,
    image: PRODUCT_IMAGE_URL,
    description: "Isqueiro Clipper feito inteiramente em metal dourado polido, recarregável com gás butano e sistema de pedra substituível. Acompanha estojo de metal.",
    stock: 35,
    brand: "Clipper"
  },
  {
    id: "tab-07",
    name: "Essência Narguilé Zomo Strong Mint 50g",
    category: "essencias",
    price: 14.90,
    rating: 4.75,
    reviewsCount: 290,
    image: PRODUCT_IMAGE_URL,
    description: "Essência de menta forte refrescante para narguilé. Melaço de alta densidade e sabor duradouro para sessões de longa duração.",
    stock: 80,
    brand: "Zomo"
  },
  {
    id: "tab-08",
    name: "Piteira de Vidro Borossilicato Squadafum 6mm Extra Longa",
    category: "acessorios",
    price: 22.90,
    originalPrice: 28.00,
    rating: 4.9,
    reviewsCount: 165,
    image: PRODUCT_IMAGE_URL,
    description: "Piteira de vidro borossilicato lavável e reutilizável. Resfria a fumaça, retém toxinas e preserva o sabor original.",
    stock: 50,
    brand: "Squadafum",
    isNew: true
  }
];

interface TabacariaEcommerceProps {
  onBack?: () => void;
}

export default function TabacariaEcommerce({ onBack }: TabacariaEcommerceProps) {
  // 18+ Age Gate Modal State
  const [ageVerified, setAgeVerified] = useState<boolean>(() => {
    return localStorage.getItem("velvet_age_verified") === "true";
  });

  // Navigation / Tab Active View
  const [currentView, setCurrentView] = useState<"catalog" | "cart" | "checkout" | "account" | "admin">("catalog");
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("todas");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart State
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 2 },
    { product: INITIAL_PRODUCTS[2], quantity: 1 }
  ]);

  // Freight / Shipping Calculation State
  const [cep, setCep] = useState("01310-100");
  const [shippingMethod, setShippingMethod] = useState<"sedex" | "pac" | "express">("sedex");
  const [shippingCalculated, setShippingCalculated] = useState(true);

  // Checkout Form & Payment State
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<"Pix" | "CreditCard">("Pix");
  const [customerInfo, setCustomerInfo] = useState({
    name: "Rafael Oliveira",
    email: "cliente@email.com",
    phone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    street: "Av. Paulista",
    number: "1000",
    complement: "Apto 42",
    district: "Bela Vista",
    city: "São Paulo",
    uf: "SP"
  });
  const [creditCardInfo, setCreditCardInfo] = useState({
    number: "4532 •••• •••• 8892",
    name: "RAFAEL OLIVEIRA",
    expiry: "11/29",
    cvv: "882",
    installments: 1
  });

  // Orders History State
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "PED-98421",
      date: "23/07/2026",
      customerName: "Rafael Oliveira",
      email: "cliente@email.com",
      whatsapp: "(11) 98765-4321",
      items: [
        { product: INITIAL_PRODUCTS[1], quantity: 1 },
        { product: INITIAL_PRODUCTS[5], quantity: 1 }
      ],
      totalAmount: 234.90,
      shippingFee: 15.00,
      paymentMethod: "Pix",
      status: "Em Preparação",
      trackingCode: "BR98412389102SP",
      cep: "01310-100",
      address: "Av. Paulista, 1000 - São Paulo/SP"
    }
  ]);

  // Admin CMS & ERP Simulator State
  const [productsList, setProductsList] = useState<Product[]>(INITIAL_PRODUCTS);
  const [erpSyncing, setErpSyncing] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCategory, setNewProductCategory] = useState<Product["category"]>("sedas");
  const [newProductStock, setNewProductStock] = useState("");

  // Toast Notification
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Confirm Age Gate
  const handleVerifyAge = (isAdult: boolean) => {
    if (isAdult) {
      setAgeVerified(true);
      localStorage.setItem("velvet_age_verified", "true");
    } else {
      alert("Acesso restrito a maiores de 18 anos conforme legislação brasileira.");
    }
  };

  // Cart Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = shippingCalculated ? (subtotal > 199 ? 0 : shippingMethod === "sedex" ? 18.90 : shippingMethod === "express" ? 25.00 : 12.50) : 0;
  const grandTotal = subtotal + shippingCost;

  // Add / Remove Cart Functions
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    triggerToast(`"${product.name}" adicionado ao carrinho!`);
  };

  const updateCartQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.product.id === productId ? { ...item, quantity: qty } : item))
      );
    }
  };

  // Complete Order
  const handleCompleteOrder = () => {
    const newOrder: Order = {
      id: `PED-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString("pt-BR"),
      customerName: customerInfo.name,
      email: customerInfo.email,
      whatsapp: customerInfo.phone,
      items: [...cartItems],
      totalAmount: grandTotal,
      shippingFee: shippingCost,
      paymentMethod,
      status: paymentMethod === "Pix" ? "Aguardando Pagamento" : "Em Preparação",
      trackingCode: `BR${Math.floor(100000000 + Math.random() * 900000000)}SP`,
      cep: customerInfo.city,
      address: `${customerInfo.street}, ${customerInfo.number} - ${customerInfo.city}/${customerInfo.uf}`
    };

    setOrders([newOrder, ...orders]);
    setCartItems([]);
    setCheckoutStep(3);
    triggerToast("Pedido efetuado com sucesso!");
  };

  // Send WhatsApp Order Notification
  const sendWhatsAppOrder = (order: Order) => {
    const message = `*NOVO PEDIDO #${order.id} - VELVET & BRASA SMOKE HOUSE*\n\n` +
      `*Cliente:* ${order.customerName}\n` +
      `*Endereço:* ${order.address}\n\n` +
      `*Itens do Pedido:*\n` +
      order.items.map((i) => `• ${i.quantity}x ${i.product.name} (R$ ${i.product.price.toFixed(2)})`).join("\n") +
      `\n\n*Frete:* R$ ${order.shippingFee.toFixed(2)}\n` +
      `*Total:* R$ ${order.totalAmount.toFixed(2)}\n` +
      `*Forma de Pagamento:* ${order.paymentMethod}\n\n` +
      `Por favor, confirme a aprovação do meu pedido!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5511999998888?text=${encoded}`, "_blank");
  };

  // Sync ERP (Bling / Tiny) Simulator
  const handleSyncERP = () => {
    setErpSyncing(true);
    setTimeout(() => {
      setErpSyncing(false);
      triggerToast("Estoque e catálogo sincronizados com o ERP Bling/Tiny com sucesso!");
    }, 1500);
  };

  // Filter Products
  const filteredProducts = productsList.filter((p) => {
    const matchesCategory = selectedCategory === "todos" || p.category === selectedCategory;
    const matchesBrand = selectedBrand === "todas" || p.brand === selectedBrand;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBrand && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#0C0D10] text-slate-100 font-sans selection:bg-[#D4AF37]/30 selection:text-[#D4AF37] relative overflow-x-hidden">
      
      {/* FULL SCREEN BACKGROUND LOOPING VIDEO (Ry4AlnTXaZM) - SMOKE VISIBLE ACROSS ALL CARDS & FOOTER */}
      <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Transparent Mask Overlay with pointer-events-auto to block mouse hover from reaching iframe */}
        <div className="absolute inset-0 bg-[#0C0D10]/50 backdrop-blur-[1px] z-10 pointer-events-auto" />
        <iframe
          className="w-[250vw] h-[250vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover min-w-full min-h-full scale-125 opacity-50 z-0 pointer-events-none select-none"
          src="https://www.youtube-nocookie.com/embed/Ry4AlnTXaZM?autoplay=1&mute=1&loop=1&playlist=Ry4AlnTXaZM&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&autohide=1&playsinline=1"
          title="Background Tabacaria Video"
          allow="autoplay; encrypted-media"
        />
      </div>
      
      {/* SEO Framework Tags */}
      <MetaTags 
        title="Velvet & Brasa - Tabacaria Premium, Headshop & Acessórios Online"
        description="E-commerce completo de tabacaria com sedas, bongs de vidro, dichavadores de metal, charutos cubanos, vaporizadores de ervas e essências. Entrega rápida e discreta para todo o Brasil."
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#D4AF37] text-black px-5 py-3 rounded-2xl font-bold shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center space-x-2 animate-bounce border border-black/20">
          <CheckCircle2 className="h-5 w-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* AGE GATE +18 MODAL (LAW MANDATED FOR SMOKE SHOPS) */}
      {!ageVerified && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#14161C] border border-[#D4AF37]/30 rounded-3xl p-8 text-center space-y-6 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
            <div className="h-20 w-20 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto shadow-inner">
              <Flame className="h-10 w-10 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs text-[#D4AF37] tracking-widest uppercase font-bold">VERIFICAÇÃO ETÁRIA OBRIGATÓRIA</span>
              <h2 className="text-2xl font-serif font-black text-white">Você tem 18 anos ou mais?</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Este site contém produtos destinados exclusivamente a maiores de 18 anos conforme a Lei Federal nº 9.294/96.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                onClick={() => handleVerifyAge(false)}
                className="py-3 px-4 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-bold text-xs transition-all cursor-pointer"
              >
                Não, Sair
              </button>
              <button
                onClick={() => handleVerifyAge(true)}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-black font-extrabold text-xs shadow-lg hover:brightness-110 transition-all cursor-pointer"
              >
                Sim, Tenho +18
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP PORTFOLIO RETURNING NAVIGATION BAR */}
      <div className="bg-[#050608] text-white px-4 py-2 text-xs font-mono flex items-center justify-between border-b border-white/10">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              if (onBack) onBack();
              else {
                window.history.pushState({}, "", "/");
                window.dispatchEvent(new Event("popstate"));
              }
            }}
            className="flex items-center space-x-1.5 text-white hover:text-[#D4AF37] font-bold uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>← Voltar ao Portfólio</span>
          </button>
          <span className="hidden md:inline text-white/20">|</span>
          <span className="hidden md:inline text-gray-400 font-sans">
            Caso 23 // E-commerce Completo Tabacaria & Headshop (Velvet & Brasa)
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[10px]">
          <span className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-0.5 rounded font-bold uppercase">
            Loja Virtual + ERP + WhatsApp + Pix
          </span>
          <button
            onClick={() => setCurrentView("admin")}
            className="hidden sm:flex items-center space-x-1 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <Settings className="h-3.5 w-3.5 text-[#10B981]" />
            <span>Painel ERP & Admin</span>
          </button>
        </div>
      </div>

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#12141A]/95 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setCurrentView("catalog")} 
            className="flex items-center space-x-3 cursor-pointer group shrink-0"
          >
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#B38F26] p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <div className="h-full w-full bg-[#12141A] rounded-[14px] flex items-center justify-center text-[#D4AF37]">
                <Flame className="h-6 w-6" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline space-x-1">
                <span className="font-serif font-black text-xl text-white tracking-tight">VELVET</span>
                <span className="font-sans font-black text-xl text-[#D4AF37] uppercase tracking-wide">& BRASA</span>
              </div>
              <p className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">Smoke House & Headshop</p>
            </div>
          </div>

          {/* Search Input (Smart Search) */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== "catalog") setCurrentView("catalog");
              }}
              placeholder="Buscar sedas, bongs, vaporizadores, dichavadores..."
              className="w-full bg-[#1A1C24] border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
            />
            <Search className="h-4 w-4 text-slate-400 absolute left-3.5 top-3" />
          </div>

          {/* User Nav Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentView("account")}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                currentView === "account"
                  ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                  : "bg-[#1A1C24] text-slate-300 border-white/10 hover:border-white/30"
              }`}
              title="Minha Conta & Pedidos"
            >
              <User className="h-5 w-5" />
            </button>

            <button
              onClick={() => setCurrentView("cart")}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-black font-bold flex items-center space-x-2 shadow-md hover:brightness-110 transition-all cursor-pointer relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline text-xs font-black">R$ {subtotal.toFixed(2)}</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-[#12141A]">
                  {cartItems.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Categories Navigation Bar */}
        <div className="bg-[#0B0C0F] border-t border-white/5 px-4 md:px-8 py-2 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex items-center space-x-2 min-w-max text-xs font-semibold">
            {[
              { id: "todos", label: "🔥 Todos os Produtos" },
              { id: "sedas", label: "📜 Sedas & Piteiras" },
              { id: "bongs", label: "🧪 Bongs de Vidro" },
              { id: "dichavadores", label: "⚙️ Dichavadores" },
              { id: "charutos", label: "🍂 Charutos & Tubos" },
              { id: "vaporizadores", label: "💨 Vaporizadores" },
              { id: "essencias", label: "🍓 Essências & Narguilé" },
              { id: "acessorios", label: "⚡ Isqueiros & Acessórios" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentView("catalog");
                }}
                className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                  selectedCategory === cat.id && currentView === "catalog"
                    ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 font-bold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* MAIN VIEW CONTENT AREA */}
      <main className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 py-8 animate-fade-in text-left">
        
        {/* ================= VIEW 1: CATALOG / HOMEPAGE ================= */}
        {currentView === "catalog" && (
          <div className="space-y-10">
            
            {/* HERO BANNER - GLASSMORPHISM TRANSPARENT BACKGROUND */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#181A22]/70 via-[#12141A]/60 to-[#0A0B0E]/70 backdrop-blur-md border border-white/20 p-8 md:p-12 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl z-10">
                <div className="inline-flex items-center space-x-2 bg-[#D4AF37]/20 border border-[#D4AF37]/50 px-3 py-1 rounded-full text-xs font-black text-[#D4AF37] shadow">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>ENTREGA DISCRETA PARA TODO O BRASIL</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-serif font-black text-white leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.95)]">
                  Sua Experiência <span className="text-[#D4AF37]">Premium</span> em Tabacaria
                </h1>

                <p className="text-xs md:text-sm text-slate-100 font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  Trabalhamos com as melhores marcas mundiais em sedas orgânicas, bongs de vidro pirex borossilicato, vaporizadores de ervas e charutos cubanos autênticos.
                </p>

                <div className="flex items-center space-x-4 pt-2">
                  <div className="flex items-center space-x-2 text-xs font-black text-emerald-400 drop-shadow">
                    <Truck className="h-4 w-4" />
                    <span>Frete Grátis acima de R$ 199</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-black text-[#D4AF37] drop-shadow">
                    <Zap className="h-4 w-4" />
                    <span>5% OFF no Pix</span>
                  </div>
                </div>
              </div>

              {/* Decorative Right Hero Video (r8moXsduPEg) */}
              <div className="relative w-full md:w-80 h-80 sm:h-96 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-[0_0_35px_rgba(212,175,55,0.4)] shrink-0 bg-black/80">
                <iframe
                  className="w-full h-full object-cover scale-105 pointer-events-none select-none"
                  src="https://www.youtube-nocookie.com/embed/r8moXsduPEg?autoplay=1&mute=1&loop=1&playlist=r8moXsduPEg&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&autohide=1&playsinline=1"
                  title="Hero Tabacaria Video"
                  allow="autoplay; encrypted-media"
                />
                {/* Transparent Shield to Block YouTube Hover & Controls */}
                <div className="absolute inset-0 z-10 bg-transparent pointer-events-auto cursor-default" />
                <div className="absolute top-3 right-3 bg-[#D4AF37] text-black text-[9px] font-black uppercase px-2.5 py-1 rounded-md shadow flex items-center space-x-1 pointer-events-none z-20">
                  <Sparkles className="h-3 w-3" />
                  <span>Sessão Ao Vivo</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center pointer-events-none z-20">
                  <span className="font-mono text-[10px] text-[#D4AF37] uppercase font-bold block">Coleção 2026</span>
                  <span className="text-xs font-bold text-white">Bongs & Acessórios Premium</span>
                </div>
              </div>
            </div>

            {/* FILTER & SORT BAR - GLASSMORPHISM TRANSPARENT BACKGROUND */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl relative z-20">
              
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <SlidersHorizontal className="h-4 w-4 text-[#D4AF37]" />
                <span className="text-xs font-extrabold text-white drop-shadow">Marca:</span>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="bg-black/60 text-xs font-bold text-white border border-white/20 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="todas">Todas as Marcas</option>
                  <option value="RAW">RAW</option>
                  <option value="Squadafum">Squadafum</option>
                  <option value="Kings">Kings</option>
                  <option value="Romeo y Julieta">Romeo y Julieta</option>
                  <option value="AirVape">AirVape</option>
                  <option value="Clipper">Clipper</option>
                </select>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                <span className="text-xs font-extrabold text-white drop-shadow">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-black/60 text-xs font-bold text-white border border-white/20 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="featured">Destaques</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="rating">Melhor Avaliado</option>
                </select>
              </div>

            </div>

            {/* PRODUCTS GRID - TRANSPARENT GLASS CARDS SO SMOKE IS FULLY VISIBLE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-20">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="bg-black/35 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.85)] hover:border-[#D4AF37] hover:shadow-[0_12px_35px_rgba(212,175,55,0.35)] transition-all group flex flex-col justify-between relative z-10"
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative aspect-square bg-black/40 overflow-hidden border-b border-white/10">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      
                      {product.isBestSeller && (
                        <span className="absolute top-3 left-3 bg-[#D4AF37] text-black text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-lg z-10">
                          Mais Vendido
                        </span>
                      )}

                      {product.isNew && (
                        <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-lg z-10">
                          Novo
                        </span>
                      )}

                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="absolute bottom-3 right-3 p-2 bg-black/80 hover:bg-[#D4AF37] hover:text-black text-white rounded-xl transition-colors opacity-0 group-hover:opacity-100 cursor-pointer z-10"
                        title="Espiar Produto"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Product Details - Transparent Background so smoke passes through */}
                    <div className="p-5 space-y-2.5 bg-transparent">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-[#D4AF37] uppercase font-black tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">{product.brand}</span>
                        <div className="flex items-center space-x-1 text-amber-300 font-bold bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/20 shadow">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          <span>{product.rating} ({product.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="font-extrabold text-white text-base leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                        {product.name}
                      </h3>

                      <p className="text-xs text-slate-100 font-medium line-clamp-2 leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Buy CTA - Transparent Background */}
                  <div className="p-5 pt-2 space-y-3 bg-transparent">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-black text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">R$ {product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-300 line-through font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">R$ {product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B38F26] hover:brightness-110 text-black font-black text-xs rounded-xl shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Adicionar ao Carrinho</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= VIEW 2: CART ================= */}
        {currentView === "cart" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-2xl font-serif font-black text-white flex items-center space-x-2">
                <ShoppingCart className="h-6 w-6 text-[#D4AF37]" />
                <span>Meu Carrinho de Compras</span>
              </h2>
              <button
                onClick={() => setCurrentView("catalog")}
                className="text-xs font-bold text-[#D4AF37] hover:underline cursor-pointer"
              >
                ← Continuar Comprando
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="bg-[#14161E] rounded-3xl p-12 text-center space-y-4 border border-white/10">
                <ShoppingCart className="h-12 w-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">Seu carrinho está vazio</h3>
                <p className="text-xs text-slate-400">Navegue pelo nosso catálogo e adicione os melhores produtos de tabacaria.</p>
                <button
                  onClick={() => setCurrentView("catalog")}
                  className="px-6 py-3 bg-[#D4AF37] text-black font-extrabold text-xs rounded-xl cursor-pointer"
                >
                  Ver Produtos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="bg-[#14161E] p-4 rounded-2xl border border-white/10 flex items-center space-x-4">
                      <img src={item.product.image} alt={item.product.name} className="h-20 w-20 object-cover rounded-xl bg-black" />
                      
                      <div className="flex-1 space-y-1">
                        <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase">{item.product.brand}</span>
                        <h4 className="font-bold text-sm text-white">{item.product.name}</h4>
                        <div className="text-xs font-black text-white">R$ {item.product.price.toFixed(2)}</div>
                      </div>

                      <div className="flex items-center space-x-2 bg-[#0E0F14] p-1.5 rounded-xl border border-white/10">
                        <button
                          onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-slate-400 hover:text-white font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-white px-2">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-slate-400 hover:text-white font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => updateCartQty(item.product.id, 0)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  {/* FREIGHT CALCULATOR IN CART */}
                  <div className="bg-[#14161E] p-5 rounded-2xl border border-white/10 space-y-4">
                    <h4 className="text-xs font-bold text-slate-200 flex items-center space-x-2">
                      <Truck className="h-4 w-4 text-[#D4AF37]" />
                      <span>Calcular Frete & Prazo de Entrega</span>
                    </h4>

                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        placeholder="00000-000"
                        className="bg-[#1A1C26] border border-white/10 rounded-xl px-3.5 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                      <button
                        onClick={() => {
                          setShippingCalculated(true);
                          triggerToast("Frete calculado com sucesso!");
                        }}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        OK
                      </button>
                    </div>

                    {shippingCalculated && (
                      <div className="space-y-2 pt-2 border-t border-white/5 text-xs font-bold">
                        {[
                          { id: "sedex", label: "Sedex Express (1 a 2 dias úteis)", price: subtotal > 199 ? "GRÁTIS" : "R$ 18,90" },
                          { id: "pac", label: "PAC Correios (4 a 7 dias úteis)", price: subtotal > 199 ? "GRÁTIS" : "R$ 12,50" },
                          { id: "express", label: "Motoboy Express (Mesmo dia em SP)", price: "R$ 25,00" },
                        ].map((s) => (
                          <label key={s.id} className="flex items-center justify-between p-2.5 rounded-xl bg-[#1A1C26] cursor-pointer">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="shipping"
                                checked={shippingMethod === s.id}
                                onChange={() => setShippingMethod(s.id as any)}
                              />
                              <span className="text-slate-300">{s.label}</span>
                            </div>
                            <span className="text-[#D4AF37]">{s.price}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Cart Order Summary Box */}
                <div className="bg-[#14161E] p-6 rounded-2xl border border-white/10 space-y-6 h-fit">
                  <h3 className="font-serif font-black text-lg text-white">Resumo do Pedido</h3>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span className="text-white font-bold">R$ {subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-slate-400">
                      <span>Frete ({shippingMethod.toUpperCase()})</span>
                      <span className="text-[#D4AF37] font-bold">
                        {shippingCost === 0 ? "GRÁTIS" : `R$ ${shippingCost.toFixed(2)}`}
                      </span>
                    </div>

                    <div className="border-t border-white/10 pt-3 flex justify-between text-base font-black text-white">
                      <span>Total</span>
                      <span className="text-[#D4AF37]">R$ {grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentView("checkout")}
                    className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B38F26] text-black font-extrabold text-xs rounded-xl shadow-lg hover:brightness-110 transition-all cursor-pointer"
                  >
                    Ir para o Checkout →
                  </button>
                </div>

              </div>
            )}
          </div>
        )}

        {/* ================= VIEW 3: CHECKOUT ================= */}
        {currentView === "checkout" && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-2xl font-serif font-black text-white flex items-center space-x-2">
                <Lock className="h-6 w-6 text-emerald-400" />
                <span>Finalizar Compra Segura</span>
              </h2>
            </div>

            {checkoutStep < 3 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left: Customer Info & Payment Option */}
                <div className="space-y-6">
                  <div className="bg-[#14161E] p-6 rounded-2xl border border-white/10 space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <User className="h-4 w-4 text-[#D4AF37]" />
                      <span>1. Dados de Entrega</span>
                    </h3>

                    <div className="space-y-3 text-xs">
                      <input
                        type="text"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        placeholder="Nome Completo"
                        className="w-full bg-[#1A1C26] border border-white/10 rounded-xl px-3.5 py-2.5 text-white"
                      />
                      <input
                        type="text"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        placeholder="WhatsApp com DDD"
                        className="w-full bg-[#1A1C26] border border-white/10 rounded-xl px-3.5 py-2.5 text-white"
                      />
                      <input
                        type="text"
                        value={customerInfo.street}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, street: e.target.value })}
                        placeholder="Endereço de Entrega"
                        className="w-full bg-[#1A1C26] border border-white/10 rounded-xl px-3.5 py-2.5 text-white"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="bg-[#14161E] p-6 rounded-2xl border border-white/10 space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-[#D4AF37]" />
                      <span>2. Método de Pagamento</span>
                    </h3>

                    <div className="grid grid-cols-2 gap-3 text-xs font-bold">
                      <button
                        onClick={() => setPaymentMethod("Pix")}
                        className={`p-3 rounded-xl border flex items-center justify-center space-x-2 cursor-pointer ${
                          paymentMethod === "Pix"
                            ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
                            : "bg-[#1A1C26] border-white/10 text-slate-400"
                        }`}
                      >
                        <QrCode className="h-4 w-4" />
                        <span>Pix (5% OFF)</span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod("CreditCard")}
                        className={`p-3 rounded-xl border flex items-center justify-center space-x-2 cursor-pointer ${
                          paymentMethod === "CreditCard"
                            ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
                            : "bg-[#1A1C26] border-white/10 text-slate-400"
                        }`}
                      >
                        <CreditCard className="h-4 w-4" />
                        <span>Cartão de Crédito</span>
                      </button>
                    </div>

                    {paymentMethod === "Pix" ? (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs space-y-2 text-emerald-300">
                        <p className="font-bold">✓ Aprovação instantânea do pagamento.</p>
                        <p>O QR Code Pix e a chave Copia e Cola serão gerados no final do pedido.</p>
                      </div>
                    ) : (
                      <div className="space-y-3 text-xs">
                        <input
                          type="text"
                          value={creditCardInfo.number}
                          onChange={(e) => setCreditCardInfo({ ...creditCardInfo, number: e.target.value })}
                          placeholder="Número do Cartão"
                          className="w-full bg-[#1A1C26] border border-white/10 rounded-xl px-3.5 py-2 text-white"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={creditCardInfo.expiry}
                            onChange={(e) => setCreditCardInfo({ ...creditCardInfo, expiry: e.target.value })}
                            placeholder="Validade (MM/AA)"
                            className="bg-[#1A1C26] border border-white/10 rounded-xl px-3.5 py-2 text-white"
                          />
                          <input
                            type="text"
                            value={creditCardInfo.cvv}
                            onChange={(e) => setCreditCardInfo({ ...creditCardInfo, cvv: e.target.value })}
                            placeholder="CVV"
                            className="bg-[#1A1C26] border border-white/10 rounded-xl px-3.5 py-2 text-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Checkout Summary & Complete Button */}
                <div className="bg-[#14161E] p-6 rounded-2xl border border-white/10 space-y-6 h-fit">
                  <h3 className="font-serif font-black text-lg text-white">Resumo Final</h3>

                  <div className="space-y-3 text-xs border-b border-white/10 pb-4">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-slate-300">
                        <span>{item.quantity}x {item.product.name}</span>
                        <span className="font-bold">R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Frete ({shippingMethod})</span>
                      <span className="text-[#D4AF37]">{shippingCost === 0 ? "GRÁTIS" : `R$ ${shippingCost.toFixed(2)}`}</span>
                    </div>

                    <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
                      <span>Total</span>
                      <span className="text-[#D4AF37]">R$ {grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCompleteOrder}
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-sm rounded-xl shadow-lg hover:brightness-110 transition-all cursor-pointer"
                  >
                    Confirmar & Pagar
                  </button>
                </div>

              </div>
            ) : (
              /* ORDER SUCCESSFUL SCREEN */
              <div className="bg-[#14161E] p-8 rounded-3xl border border-emerald-500/30 text-center space-y-6">
                <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-black text-white">Pedido Realizado com Sucesso!</h3>
                  <p className="text-xs text-slate-300">Código do Pedido: <span className="font-mono text-[#D4AF37] font-bold">{orders[0]?.id}</span></p>
                </div>

                {paymentMethod === "Pix" && (
                  <div className="bg-[#0E0F14] p-6 rounded-2xl border border-white/10 max-w-sm mx-auto space-y-4">
                    <QrCode className="h-32 w-32 mx-auto text-[#D4AF37] bg-white p-2 rounded-xl" />
                    <p className="text-xs text-slate-400">Escaneie o QR Code Pix acima ou use a chave abaixo:</p>
                    <div className="flex items-center space-x-2 bg-[#1A1C24] p-2 rounded-xl border border-white/10">
                      <input
                        type="text"
                        readOnly
                        value="00020126580014br.gov.bcb.pix0136velvet-brasa-pix-key"
                        className="bg-transparent text-[10px] font-mono text-slate-300 flex-1 outline-none"
                      />
                      <button
                        onClick={() => triggerToast("Chave Pix copiada!")}
                        className="p-1.5 bg-[#D4AF37] text-black rounded-lg text-xs font-bold"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => sendWhatsAppOrder(orders[0])}
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Enviar Pedido pelo WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setCurrentView("account")}
                    className="w-full sm:w-auto px-6 py-3 bg-[#1A1C26] hover:bg-white/10 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Acompanhar Pedido
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= VIEW 4: CUSTOMER AREA ================= */}
        {currentView === "account" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-2xl font-serif font-black text-white flex items-center space-x-2">
                <User className="h-6 w-6 text-[#D4AF37]" />
                <span>Minha Conta & Meus Pedidos</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Account Profile Card */}
              <div className="bg-[#14161E] p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="h-16 w-16 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full flex items-center justify-center font-black text-xl">
                  RO
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{customerInfo.name}</h3>
                  <p className="text-xs text-slate-400">{customerInfo.email}</p>
                  <p className="text-xs text-slate-400">{customerInfo.phone}</p>
                </div>
              </div>

              {/* Orders List */}
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Histórico de Pedidos</h3>

                {orders.map((order) => (
                  <div key={order.id} className="bg-[#14161E] p-5 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
                      <div>
                        <span className="font-mono text-[#D4AF37] font-bold">{order.id}</span>
                        <span className="text-slate-400 block text-[10px]">{order.date}</span>
                      </div>
                      <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-md font-bold uppercase text-[10px]">
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300">
                      {order.items.map((i) => (
                        <div key={i.product.id} className="flex justify-between">
                          <span>{i.quantity}x {i.product.name}</span>
                          <span className="font-bold">R$ {(i.product.price * i.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/10 pt-3 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Rastreio: <span className="font-mono text-white font-bold">{order.trackingCode}</span></span>
                      <span className="font-black text-white text-sm">Total: R$ {order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* ================= VIEW 5: ADMIN / ERP DASHBOARD ================= */}
        {currentView === "admin" && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Settings className="h-6 w-6 text-[#10B981]" />
                  <h2 className="text-2xl font-serif font-black text-white">Painel Administrativo & ERP Integration</h2>
                </div>
                <p className="text-xs text-slate-400">Gerenciamento de Estoque, Pedidos, Sincronização Bling/Tiny ERP</p>
              </div>

              <button
                onClick={handleSyncERP}
                disabled={erpSyncing}
                className="px-4 py-2.5 bg-[#10B981] hover:bg-emerald-600 text-black font-extrabold text-xs rounded-xl flex items-center space-x-2 cursor-pointer transition-all"
              >
                <RefreshCw className={`h-4 w-4 ${erpSyncing ? "animate-spin" : ""}`} />
                <span>Sincronizar com ERP</span>
              </button>
            </div>

            {/* Admin Key Metric Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[#14161E] p-5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">Faturamento Mês</span>
                <p className="text-2xl font-black text-[#D4AF37]">R$ 14.890,00</p>
              </div>
              <div className="bg-[#14161E] p-5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">Total de Pedidos</span>
                <p className="text-2xl font-black text-emerald-400">128 pedidos</p>
              </div>
              <div className="bg-[#14161E] p-5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-xs text-slate-400 font-bold uppercase">Produtos em Estoque</span>
                <p className="text-2xl font-black text-sky-400">{productsList.length} itens</p>
              </div>
            </div>

            {/* Product Stock Table */}
            <div className="bg-[#14161E] rounded-2xl border border-white/10 p-6 space-y-4">
              <h3 className="font-bold text-white text-sm">Controle de Estoque de Produtos</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#1A1C26] text-[#D4AF37] font-mono text-[10px] uppercase">
                    <tr>
                      <th className="p-3">Produto</th>
                      <th className="p-3">Categoria</th>
                      <th className="p-3">Preço</th>
                      <th className="p-3">Estoque</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {productsList.map((p) => (
                      <tr key={p.id}>
                        <td className="p-3 font-bold text-white">{p.name}</td>
                        <td className="p-3 uppercase text-slate-400">{p.category}</td>
                        <td className="p-3 font-bold">R$ {p.price.toFixed(2)}</td>
                        <td className="p-3 font-mono font-bold">{p.stock} un.</td>
                        <td className="p-3">
                          {p.stock < 10 ? (
                            <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-[10px] font-bold">Estoque Baixo</span>
                          ) : (
                            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">Normal</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* QUICK VIEW PRODUCT MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-[#14161E] border border-white/10 rounded-3xl p-6 relative space-y-6">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6">
              <img src={quickViewProduct.image} alt={quickViewProduct.name} className="h-48 w-48 object-cover rounded-2xl bg-black" />
              
              <div className="space-y-3 flex-1">
                <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase">{quickViewProduct.brand}</span>
                <h3 className="font-bold text-white text-lg">{quickViewProduct.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{quickViewProduct.description}</p>
                <div className="text-2xl font-black text-white">R$ {quickViewProduct.price.toFixed(2)}</div>

                <button
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="w-full py-3 bg-[#D4AF37] text-black font-extrabold text-xs rounded-xl cursor-pointer"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER - TRANSPARENT GLASS BACKGROUND FOR PASS-THROUGH SMOKE */}
      <footer className="bg-black/30 backdrop-blur-md border-t border-white/20 py-12 text-slate-100 text-xs relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-serif font-black text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              <Flame className="h-5 w-5 text-[#D4AF37]" />
              <span>VELVET & BRASA</span>
            </div>
            <p className="text-xs text-slate-100 font-medium leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              Sua tabacaria & headshop premium com produtos autênticos, pagamento facilitado e entrega 100% discreta.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-[#D4AF37] font-black text-xs uppercase tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">Categorias</h4>
            <ul className="space-y-1.5 text-xs text-slate-100 font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">Sedas & Piteiras</li>
              <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">Bongs de Vidro</li>
              <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">Dichavadores</li>
              <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">Vaporizadores</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-[#D4AF37] font-black text-xs uppercase tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">Segurança & Selos</h4>
            <div className="flex items-center space-x-2 text-emerald-400 font-black text-xs drop-shadow">
              <ShieldCheck className="h-4 w-4" />
              <span>Compra 100% Protegida</span>
            </div>
            <div className="flex items-center space-x-2 text-[#D4AF37] font-black text-xs drop-shadow">
              <Lock className="h-4 w-4" />
              <span>SSL Encriptado 256-bit</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-[#D4AF37] font-black text-xs uppercase tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">Atendimento</h4>
            <p className="text-xs text-slate-100 font-semibold drop-shadow">WhatsApp: (11) 99999-8888</p>
            <p className="text-xs text-slate-100 font-semibold drop-shadow">Email: contato@velvetbrasa.com.br</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 pt-6 border-t border-white/10 text-center text-xs font-semibold text-slate-200 drop-shadow">
          © 2026 Velvet & Brasa Smoke House. Venda proibida para menores de 18 anos.
        </div>
      </footer>

    </div>
  );
}
