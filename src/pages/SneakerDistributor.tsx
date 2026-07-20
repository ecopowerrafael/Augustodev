import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, ShoppingBag, Search, SlidersHorizontal, Trash2, Plus, Minus, 
  User, Lock, Settings, Check, MapPin, CreditCard, FileText, Phone, 
  Info, X, Store, Users, BarChart3, Box, ChevronRight, ShieldCheck, 
  Truck, Percent, Star, MessageSquare, Send, RefreshCw, QrCode
} from "lucide-react";

// Default Sneaker Catalog
interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  retailPrice: number;
  wholesalePrice: number; // Special price for wholesalers (LOJISTA)
  image: string;
  sizes: number[];
  colors: string[];
  description: string;
  stock: number;
  rating: number;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Air Force 1 Premium 'Volt Edge'",
    brand: "Nike",
    category: "Casual",
    retailPrice: 699.90,
    wholesalePrice: 489.90,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    sizes: [38, 39, 40, 41, 42, 43],
    colors: ["Branco/Volt", "Branco/Preto"],
    description: "O clássico Air Force 1 renovado com detalhes neon vibrantes e couro de alta qualidade para durabilidade no estoque.",
    stock: 140,
    rating: 4.8
  },
  {
    id: 2,
    name: "Ultraboost Light Performance",
    brand: "Adidas",
    category: "Corrida",
    retailPrice: 999.90,
    wholesalePrice: 699.90,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80",
    sizes: [37, 38, 39, 40, 41, 42, 43, 44],
    colors: ["Preto/Cinza", "Azul/Branco"],
    description: "Amortecimento responsivo de última geração. O preferido dos corredores de rua com cabedal de primeknit sustentável.",
    stock: 85,
    rating: 4.9
  },
  {
    id: 3,
    name: "RS-X Retro 'Multicolor Grid'",
    brand: "Puma",
    category: "Casual",
    retailPrice: 599.90,
    wholesalePrice: 419.90,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
    sizes: [35, 36, 37, 38, 39, 40, 41, 42],
    colors: ["Multicolor", "Branco/Pastel"],
    description: "Visual robusto inspirado no design dos anos 80, trazendo materiais em mesh, couro e camurça de alta durabilidade.",
    stock: 120,
    rating: 4.7
  },
  {
    id: 4,
    name: "Wave Prophecy 12 Extreme",
    brand: "Mizuno",
    category: "Corrida",
    retailPrice: 1599.90,
    wholesalePrice: 1199.90,
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80",
    sizes: [39, 40, 41, 42, 43, 44],
    colors: ["Preto/Dourado", "Prata/Azul"],
    description: "O auge da tecnologia de amortecimento mecânico. Visual imponente com placa Wave infinita integrada.",
    stock: 45,
    rating: 4.9
  },
  {
    id: 5,
    name: "Old Skool Pro Classic",
    brand: "Vans",
    category: "Skate",
    retailPrice: 399.90,
    wholesalePrice: 279.90,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
    sizes: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    colors: ["Preto/Branco", "Vinho/Branco"],
    description: "O clássico do skate com reforço Duracap, palmilha PopCush de alto impacto e a tradicional sola Waffle.",
    stock: 210,
    rating: 4.6
  },
  {
    id: 6,
    name: "Air Jordan 1 Retro 'Chic'",
    brand: "Nike",
    category: "Basquete",
    retailPrice: 1299.90,
    wholesalePrice: 949.90,
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=600&q=80",
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    colors: ["Vermelho/Preto/Branco", "Preto/Royal"],
    description: "O modelo lendário que redefiniu a cultura sneaker mundial. Acabamento primoroso em couro legítimo.",
    stock: 30,
    rating: 5.0
  }
];

interface CartItem {
  product: Product;
  selectedSize: number;
  selectedColor: string;
  quantity: number;
}

interface Order {
  id: string;
  clientName: string;
  clientType: "Varejo" | "Atacado";
  date: string;
  items: { productName: string; qty: number; size: number }[];
  total: number;
  status: "Pendente" | "Faturado" | "Enviado" | "Entregue";
  paymentMethod: string;
}

export default function SneakerDistributor({ onBack }: { onBack: () => void }) {
  // Store state
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState<"store" | "institutional" | "admin" | "about">("store");
  const [institTab, setInstitTab] = useState<"about_us" | "privacy" | "terms" | "contact">("about_us");
  
  // Filtering states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("Todas");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(1600);

  // Authentication state
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    type: "VAREJO" | "LOJISTA"; // LOJISTA receives wholesale pricing!
    cnpjOrCpf?: string;
  } | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginType, setLoginType] = useState<"VAREJO" | "LOJISTA">("LOJISTA");
  const [signUpName, setSignUpName] = useState("");
  const [signUpCnpj, setSignUpCnpj] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Cart Sidebar state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cep, setCep] = useState("");
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [shippingMethod, setShippingMethod] = useState<"PAC" | "SEDEX">("PAC");
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "payment" | "success">("cart");
  const [paymentMethod, setPaymentMethod] = useState<"PIX" | "CARD" | "BOLETO">("PIX");
  
  // Simulated Card Payment State
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Simulated Orders state for the admin panel
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "PED-2026-981",
      clientName: "Super Tênis São Paulo Ltda",
      clientType: "Atacado",
      date: "18/07/2026",
      items: [
        { productName: "Air Force 1 Premium 'Volt Edge'", qty: 10, size: 40 },
        { productName: "Old Skool Pro Classic", qty: 15, size: 42 }
      ],
      total: 9088.50,
      status: "Faturado",
      paymentMethod: "Faturado Boleto 30 dias"
    },
    {
      id: "PED-2026-982",
      clientName: "Carlos Eduardo Santos",
      clientType: "Varejo",
      date: "19/07/2026",
      items: [
        { productName: "Ultraboost Light Performance", qty: 1, size: 41 }
      ],
      total: 999.90,
      status: "Pendente",
      paymentMethod: "PIX"
    }
  ]);

  // Admin section sub-tab
  const [adminTab, setAdminTab] = useState<"products" | "orders" | "clients" | "dashboard">("dashboard");

  // Admin New Product creation form
  const [newProdName, setNewProdName] = useState("");
  const [newProdBrand, setNewProdBrand] = useState("Nike");
  const [newProdCategory, setNewProdCategory] = useState("Casual");
  const [newProdRetailPrice, setNewProdRetailPrice] = useState("");
  const [newProdWholesalePrice, setNewProdWholesalePrice] = useState("");
  const [newProdImage, setNewProdImage] = useState("");
  const [newProdDescription, setNewProdDescription] = useState("");
  const [newProdSizes, setNewProdSizes] = useState("38,39,40,41,42,43");
  const [newProdStock, setNewProdStock] = useState("");

  // Active sneaker selected for quick view modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewSize, setQuickViewSize] = useState<number | null>(null);
  const [quickViewColor, setQuickViewColor] = useState<string>("");

  // Contact Form States
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // Filters computed
  const brands = useMemo(() => {
    return ["Todas", ...Array.from(new Set(products.map(p => p.brand)))];
  }, [products]);

  const categories = useMemo(() => {
    return ["Todas", ...Array.from(new Set(products.map(p => p.category)))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = selectedBrand === "Todas" || p.brand === selectedBrand;
      const matchesCategory = selectedCategory === "Todas" || p.category === selectedCategory;
      const matchesSize = selectedSize === null || p.sizes.includes(selectedSize);
      const isLojista = currentUser?.type === "LOJISTA";
      const priceToCheck = isLojista ? p.wholesalePrice : p.retailPrice;
      const matchesPrice = priceToCheck <= maxPrice;

      return matchesSearch && matchesBrand && matchesCategory && matchesSize && matchesPrice;
    });
  }, [products, searchQuery, selectedBrand, selectedCategory, selectedSize, maxPrice, currentUser]);

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = currentUser?.type === "LOJISTA" ? item.product.wholesalePrice : item.product.retailPrice;
      return total + (price * item.quantity);
    }, 0);
  }, [cart, currentUser]);

  const cartTotal = useMemo(() => {
    return cartSubtotal + (shippingCost || 0);
  }, [cartSubtotal, shippingCost]);

  // Handler functions
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.includes("@")) return;
    
    setCurrentUser({
      name: isRegistering ? signUpName || "Lojista Vip S/A" : loginEmail.split("@")[0].toUpperCase(),
      email: loginEmail,
      type: loginType,
      cnpjOrCpf: loginType === "LOJISTA" ? (signUpCnpj || "22.344.890/0001-99") : "333.444.555-66"
    });
    
    // Clear form
    setLoginEmail("");
    setLoginPassword("");
    setSignUpName("");
    setSignUpCnpj("");
    setShowLoginModal(false);
    setIsRegistering(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]); // Clear cart as currency context changed
  };

  const addToCart = (product: Product, size: number | null, color: string) => {
    if (!size) {
      alert("Por favor, selecione um tamanho.");
      return;
    }
    const finalColor = color || product.colors[0];
    
    setCart(prev => {
      const existingIdx = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === finalColor
      );

      if (existingIdx > -1) {
        const nextCart = [...prev];
        nextCart[existingIdx].quantity += 1;
        return nextCart;
      } else {
        return [...prev, { product, selectedSize: size, selectedColor: finalColor, quantity: 1 }];
      }
    });

    setIsCartOpen(true);
  };

  const updateCartQty = (idx: number, delta: number) => {
    setCart(prev => {
      const item = prev[idx];
      const newQty = item.quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== idx);
      }
      const nextCart = [...prev];
      nextCart[idx].quantity = newQty;
      return nextCart;
    });
  };

  const handleCalculateShipping = () => {
    if (cep.length < 8) {
      alert("Digite um CEP válido.");
      return;
    }
    // Simulated delivery prices based on CPF/CNPJ or location
    const base = shippingMethod === "SEDEX" ? 38.50 : 18.90;
    setShippingCost(base + (cart.length * 2.5));
  };

  const handleCompleteOrder = () => {
    if (cart.length === 0) return;

    // Register a new simulated order
    const newOrder: Order = {
      id: `PED-2026-${Math.floor(Math.random() * 900) + 100}`,
      clientName: currentUser?.name || "Cliente Final",
      clientType: currentUser?.type === "LOJISTA" ? "Atacado" : "Varejo",
      date: new Date().toLocaleDateString("pt-BR"),
      items: cart.map(c => ({
        productName: c.product.name,
        qty: c.quantity,
        size: c.selectedSize
      })),
      total: cartTotal,
      status: "Pendente",
      paymentMethod: paymentMethod === "PIX" ? "PIX" : paymentMethod === "CARD" ? "Cartão de Crédito" : "Boleto Bancário"
    };

    setOrders(prev => [newOrder, ...prev]);
    setCheckoutStep("success");
  };

  // WhatsApp Order Send Generation
  const handleSendWhatsApp = () => {
    const isLojista = currentUser?.type === "LOJISTA";
    let message = `*SNEAKERHUB DISTRIBUIDORA - PEDIDO DE COMPRA*\n\n`;
    message += `*Cliente:* ${currentUser?.name || "Não Identificado"}\n`;
    message += `*Tipo:* ${isLojista ? "Lojista Atacado (CNPJ)" : "Consumidor Varejo"}\n`;
    message += `*E-mail:* ${currentUser?.email || "-"}\n\n`;
    message += `*PRODUTOS SOLICITADOS:*\n`;
    
    cart.forEach(item => {
      const price = isLojista ? item.product.wholesalePrice : item.product.retailPrice;
      message += `- ${item.quantity}x ${item.product.name} (Tam: ${item.selectedSize}, Cor: ${item.selectedColor}) - R$ ${price.toFixed(2)} un.\n`;
    });

    message += `\n*Subtotal:* R$ ${cartSubtotal.toFixed(2)}`;
    if (shippingCost) {
      message += `\n*Frete (${shippingMethod}):* R$ ${shippingCost.toFixed(2)}`;
    }
    message += `\n*TOTAL:* R$ ${cartTotal.toFixed(2)}\n`;
    message += `*Método de Pagamento Escolhido:* ${paymentMethod}\n\n`;
    message += `_Aguardando validação do faturamento e separação física em estoque._`;

    const encoded = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=5511999999999&text=${encoded}`, "_blank");
  };

  // Add Product (Admin Action)
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdRetailPrice || !newProdWholesalePrice) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const sizesArr = newProdSizes.split(",").map(s => parseInt(s.trim())).filter(s => !isNaN(s));
    const newlyCreated: Product = {
      id: Date.now(),
      name: newProdName,
      brand: newProdBrand,
      category: newProdCategory,
      retailPrice: parseFloat(newProdRetailPrice),
      wholesalePrice: parseFloat(newProdWholesalePrice),
      image: newProdImage || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
      sizes: sizesArr.length ? sizesArr : [37, 38, 39, 40, 41, 42, 43],
      colors: ["Preto", "Branco"],
      description: newProdDescription || "Sem descrição disponível para este modelo.",
      stock: parseInt(newProdStock) || 50,
      rating: 5.0
    };

    setProducts(prev => [newlyCreated, ...prev]);
    alert("Produto cadastrado com sucesso no catálogo!");
    
    // reset form
    setNewProdName("");
    setNewProdRetailPrice("");
    setNewProdWholesalePrice("");
    setNewProdImage("");
    setNewProdDescription("");
    setNewProdStock("");
  };

  // Admin update stock / price helpers
  const handleUpdateStock = (prodId: number, newStock: number) => {
    setProducts(prev => prev.map(p => p.id === prodId ? { ...p, stock: newStock } : p));
  };

  const handleUpdatePrice = (prodId: number, isWholesale: boolean, newPrice: number) => {
    setProducts(prev => prev.map(p => 
      p.id === prodId 
        ? (isWholesale ? { ...p, wholesalePrice: newPrice } : { ...p, retailPrice: newPrice }) 
        : p
    ));
  };

  // Update order status in Admin Panel
  const handleUpdateOrderStatus = (orderId: string, nextStatus: "Pendente" | "Faturado" | "Enviado" | "Entregue") => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
  };

  // Admin calculations
  const adminStats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
    const clientsCount = 124; // Simulated baseline
    return { totalRevenue, totalStock, clientsCount };
  }, [orders, products]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-rose-500/30 selection:text-white relative">
      
      {/* GLOWING AMBIENT GRAPHICS */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* TOP NOTIFICATION BAR */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 py-2.5 px-4 text-center text-xs font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="bg-white/20 text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold animate-pulse">Distribuição Oficial</span>
        <span>🔥 Condições especiais de Frete e Faturamento faturado em até 4x no Boleto para CNPJ.</span>
      </div>

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-white/5 shadow-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Back to main Portfolio button */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2.5 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
              title="Voltar para Portfólio de Augusto"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="cursor-pointer group flex items-center gap-2.5" onClick={() => { setActiveTab("store"); }}>
              <div className="bg-gradient-to-tr from-rose-500 to-amber-500 p-2.5 rounded-xl shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform duration-300">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="font-extrabold text-xl tracking-tight leading-none bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  SNEAKERHUB
                </h1>
                <p className="text-[10px] font-mono tracking-widest text-[#00FF41] uppercase">Distribuidora Nacional</p>
              </div>
            </div>
          </div>

          {/* Search bar inside header for wide screens */}
          <div className="hidden md:flex items-center flex-1 max-w-md relative">
            <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input 
              type="text"
              placeholder="Buscar marcas, modelos, códigos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3.5 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Navigation Controls */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => { setActiveTab("store"); }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === "store" ? "bg-white/10 text-[#00FF41] shadow-inner" : "text-slate-300 hover:bg-white/5"}`}
            >
              Vitrine
            </button>
            <button 
              onClick={() => { setActiveTab("institutional"); }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === "institutional" ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"}`}
            >
              Institucional
            </button>
            <button 
              onClick={() => { setActiveTab("admin"); }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-all ${activeTab === "admin" ? "bg-amber-500/20 text-white border-amber-400" : ""}`}
            >
              <Settings className="w-3.5 h-3.5 animate-spin-slow" />
              Painel Admin
            </button>

            {/* User Session Widget */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-950 border border-white/5 rounded-lg p-1.5 pl-3">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] text-slate-400 font-mono leading-tight">Olá, {currentUser.name}</p>
                  <p className={`text-[9px] font-bold uppercase tracking-wider ${currentUser.type === "LOJISTA" ? "text-emerald-400" : "text-sky-400"}`}>
                    {currentUser.type === "LOJISTA" ? "🏢 Atacado Vip" : "👤 Varejo"}
                  </p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 p-2 rounded-md text-xs font-medium text-slate-300 transition-colors"
                  title="Sair da Conta"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setIsRegistering(false); setShowLoginModal(true); }}
                className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-lg shadow-rose-500/10 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Entrar / CNPJ</span>
              </button>
            )}

            {/* Shopping Cart Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-slate-950 border border-white/10 hover:border-white/20 p-3 rounded-xl relative transition-all cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-slate-200" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#00FF41] text-slate-950 font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

          </nav>
        </div>
      </header>

      {/* MOBILE SEARCH BAR */}
      <div className="md:hidden p-4 bg-slate-900 border-b border-white/5">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input 
            type="text"
            placeholder="Buscar marcas, tênis, tamanhos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 rounded-full py-2.5 pl-9 pr-4 text-xs text-white"
          />
        </div>
      </div>

      {/* CORE WRAPPER SECTION */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* 1. STORE VIEW */}
        {activeTab === "store" && (
          <div>
            
            {/* HERO PROMOTIONAL BOX */}
            <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-white/10 p-6 sm:p-10 lg:p-12 mb-8 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Text Content */}
                <div className="lg:col-span-7 space-y-4 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full text-[11px] font-bold tracking-wider uppercase">
                    <Percent className="w-3.5 h-3.5" />
                    <span>Atacado com Desconto de até 35%</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Sua distribuidora direta de marcas esportivas e casuais
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Trabalhamos com o estoque a pronta entrega dos tênis mais vendidos do país. Acesse como <span className="text-emerald-400 font-semibold">Lojista Parceiro</span> informando seu CNPJ para liberar tabela especial faturada e preços exclusivos de atacado.
                  </p>
                  <div className="pt-3 flex flex-wrap gap-3">
                    {!currentUser && (
                      <button 
                        onClick={() => { setIsRegistering(true); setShowLoginModal(true); }}
                        className="bg-white text-slate-950 hover:bg-slate-200 px-5 py-2.5 rounded-lg text-xs font-bold transition-all"
                      >
                        Cadastrar meu CNPJ
                      </button>
                    )}
                    <button 
                      onClick={() => { setSelectedBrand("Nike"); }}
                      className="bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 px-5 py-2.5 rounded-lg text-xs font-bold transition-all"
                    >
                      Ver Linha de Luxo
                    </button>
                  </div>
                </div>

                {/* YouTube Video Embed */}
                <div className="lg:col-span-5 w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black relative">
                  <iframe 
                    className="w-full h-full scale-[1.01]"
                    src="https://www.youtube.com/embed/IqgBn7sT6vI?autoplay=1&mute=1&loop=1&playlist=IqgBn7sT6vI&controls=0&modestbranding=1&rel=0&playsinline=1&showinfo=0&iv_load_policy=3" 
                    title="Apresentação SneakerHub" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                  {/* Subtle top/bottom overlays to cover any small header/title overlays that YouTube might show when hovered */}
                  <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none" />
                </div>

              </div>
            </div>

            {/* SECTIONS LAYOUT: FILTER SIDEBAR & PRODUCT LIST */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* FILTER CONTROLS SIDEBAR */}
              <div className="lg:col-span-1 bg-slate-900 border border-white/5 rounded-2xl p-5 h-fit space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4.5 h-4.5 text-[#00FF41]" />
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-200">Filtros Avançados</span>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedBrand("Todas");
                      setSelectedCategory("Todas");
                      setSelectedSize(null);
                      setMaxPrice(1600);
                      setSearchQuery("");
                    }}
                    className="text-[10px] font-mono text-slate-400 hover:text-white"
                  >
                    Limpar tudo
                  </button>
                </div>

                {/* Brand select */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Marca</label>
                  <div className="flex flex-wrap gap-1.5">
                    {brands.map(b => (
                      <button
                        key={b}
                        onClick={() => setSelectedBrand(b)}
                        className={`text-xs px-3 py-1.5 rounded-md transition-all font-medium ${selectedBrand === b ? "bg-rose-500 text-white" : "bg-slate-950 text-slate-400 hover:bg-white/5"}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category select */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Categoria</label>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map(c => (
                      <button
                        key={c}
                        onClick={() => setSelectedCategory(c)}
                        className={`text-xs px-3 py-1.5 rounded-md transition-all font-medium ${selectedCategory === c ? "bg-emerald-500 text-slate-950" : "bg-slate-950 text-slate-400 hover:bg-white/5"}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizing grid */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Grade de Tamanhos</label>
                    {selectedSize && (
                      <button onClick={() => setSelectedSize(null)} className="text-[10px] text-rose-400">Limpar</button>
                    )}
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map(sz => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-1.5 text-xs font-bold rounded transition-all ${selectedSize === sz ? "bg-[#00FF41] text-slate-950 shadow-md" : "bg-slate-950 text-slate-400 hover:text-white"}`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range selector */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider">
                    <span>Faixa de Preço</span>
                    <span className="font-mono text-rose-400">R$ {maxPrice.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range"
                    min="300"
                    max="1600"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full accent-rose-500 bg-slate-950"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>R$ 300</span>
                    <span>R$ 1600</span>
                  </div>
                </div>

                {/* Wholesale promotion box */}
                <div className="p-3.5 bg-slate-950 border border-emerald-500/10 rounded-xl space-y-2">
                  <p className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Segurança Comercial</span>
                  </p>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Distribuidora habilitada para emissão de nota fiscal modelo 55 e guias interestaduais (GNRE) com substituição tributária.
                  </p>
                </div>
              </div>

              {/* PRODUCTS LIST */}
              <div className="lg:col-span-3 space-y-6">
                
                <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-white/5">
                  <span className="text-xs text-slate-400 font-mono">
                    Mostrando <strong className="text-white">{filteredProducts.length}</strong> de <strong className="text-white">{products.length}</strong> produtos
                  </span>
                  
                  {currentUser?.type === "LOJISTA" && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-full">
                      <Percent className="w-3.5 h-3.5 animate-pulse" />
                      <span>Preços de Atacado Ativados</span>
                    </div>
                  )}
                </div>

                {/* Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-16 bg-slate-900 border border-dashed border-white/10 rounded-2xl space-y-3">
                    <Box className="w-12 h-12 text-slate-500 mx-auto" />
                    <h3 className="text-lg font-bold">Nenhum sneaker encontrado</h3>
                    <p className="text-slate-400 text-xs max-w-sm mx-auto">
                      Não existem calçados no estoque correspondentes aos filtros selecionados. Tente limpar os filtros para visualizar todo o estoque.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map(p => {
                      const isLojista = currentUser?.type === "LOJISTA";
                      const currentPrice = isLojista ? p.wholesalePrice : p.retailPrice;
                      const originalPrice = p.retailPrice;
                      const hasDiscount = isLojista;

                      return (
                        <div 
                          key={p.id}
                          className="bg-slate-900 border border-white/5 hover:border-white/20 rounded-2xl overflow-hidden shadow-lg group transition-all duration-300 hover:-translate-y-1"
                        >
                          {/* Image box */}
                          <div className="relative aspect-square overflow-hidden bg-slate-950">
                            <img 
                              src={p.image} 
                              alt={p.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            
                            {/* Tags / Brand */}
                            <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                              <span className="bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-mono tracking-widest uppercase font-bold px-2.5 py-1 rounded">
                                {p.brand}
                              </span>
                              {hasDiscount && (
                                <span className="bg-[#00FF41] text-slate-950 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                                  Salvar {Math.round((1 - p.wholesalePrice / p.retailPrice) * 100)}%
                                </span>
                              )}
                            </div>

                            {/* Stock Indicator */}
                            <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-md border border-white/5 flex items-center gap-1">
                              <div className={`w-1.5 h-1.5 rounded-full ${p.stock > 40 ? "bg-emerald-400" : "bg-amber-400"}`} />
                              <span className="text-[9px] font-mono text-slate-300">{p.stock} un. em estoque</span>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="p-4 space-y-3 text-left">
                            <p className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">{p.category}</p>
                            <h3 className="font-extrabold text-sm sm:text-base text-white tracking-tight line-clamp-1 group-hover:text-rose-400 transition-colors">
                              {p.name}
                            </h3>
                            
                            {/* Rating */}
                            <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span className="text-xs text-slate-300 font-semibold">{p.rating.toFixed(1)}</span>
                            </div>

                            {/* Pricing Row */}
                            <div className="pt-2 border-t border-white/5 flex items-end justify-between">
                              <div>
                                {hasDiscount && (
                                  <span className="text-xs line-through text-slate-500 block">R$ {originalPrice.toFixed(2)}</span>
                                )}
                                <span className="text-base sm:text-lg font-black tracking-tight text-white font-mono">
                                  R$ {currentPrice.toFixed(2)}
                                </span>
                                <span className="text-[9px] text-slate-400 block font-sans">
                                  {isLojista ? "preço p/ lote faturado" : "preço unitário varejo"}
                                </span>
                              </div>
                              
                              <button
                                onClick={() => setSelectedProduct(p)}
                                className="bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-200 px-3 py-2 rounded-lg transition-all"
                              >
                                Ver Detalhes
                              </button>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* 2. INSTITUTIONAL PAGES / ABOUT / POLICIES */}
        {activeTab === "institutional" && (
          <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-10 text-left">
            
            <div className="flex flex-wrap gap-2 border-b border-white/5 pb-5 mb-8">
              <button 
                onClick={() => setInstitTab("about_us")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${institTab === "about_us" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Quem Somos
              </button>
              <button 
                onClick={() => setInstitTab("contact")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${institTab === "contact" ? "bg-white/10 text-[#00FF41]" : "text-slate-400 hover:text-white"}`}
              >
                Contato & Atendimento
              </button>
              <button 
                onClick={() => setInstitTab("privacy")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${institTab === "privacy" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Política de Privacidade
              </button>
              <button 
                onClick={() => setInstitTab("terms")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${institTab === "terms" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}
              >
                Termos de Uso
              </button>
            </div>

            {/* TAB CONTENT: QUEM SOMOS */}
            {institTab === "about_us" && (
              <div className="space-y-6 max-w-4xl">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tight text-white">Sobre a SneakerHub Distribuidora</h3>
                  <p className="text-slate-400 text-sm">Inovação e solidez no mercado atacadista de calçados premium.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                    <p>
                      Fundada em 2018, a <strong>SneakerHub</strong> surgiu com a missão de conectar lojistas e revendedores independentes de todo o Brasil às maiores marcas de calçados nacionais e importados. Atuamos como um hub logístico inteligente, reduzindo a burocracia de importação direta e fracionando pedidos para viabilizar estoques saudáveis para micro e pequenas empresas brasileiras.
                    </p>
                    <p>
                      Hoje, contamos com mais de 12.000m² de capacidade de armazenamento em nosso centro de distribuição estratégica em Barueri/SP, garantindo rapidez no despacho (em até 24 horas úteis pós-faturamento) e uma malha logística nacional com tarifas especiais.
                    </p>
                  </div>
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 space-y-4">
                    <h4 className="font-bold text-xs uppercase tracking-widest text-rose-500">Nossos Pilares Corporativos</h4>
                    <ul className="space-y-3 text-xs text-slate-400">
                      <li className="flex gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span><strong>Originalidade Garantida:</strong> Todos os produtos acompanham Nota Fiscal Eletrônica de origem com rastreabilidade completa.</span>
                      </li>
                      <li className="flex gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span><strong>Tributação Correta:</strong> Emissão automatizada de Difal e ST para evitar retenções fiscais de mercadoria em barreiras estaduais.</span>
                      </li>
                      <li className="flex gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span><strong>Crédito Facilitado:</strong> Tabela de faturamento exclusiva no boleto a prazo de acordo com o tempo de cadastro CNPJ.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: PRIVACY */}
            {institTab === "privacy" && (
              <div className="space-y-5 text-sm text-slate-300 max-w-4xl">
                <h3 className="text-xl font-black text-white">Diretrizes de Privacidade e LGPD</h3>
                <p>
                  Na SneakerHub, valorizamos muito a segurança dos seus dados empresariais e pessoais. Esta política detalha como coletamos, processamos e protegemos as informações fornecidas durante o cadastro no atacado:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs text-slate-400">
                  <li><strong>Dados cadastrais corporativos:</strong> CNPJ, Razão Social, Inscrição Estadual e dados fiscais são usados exclusivamente para análise de limite de crédito corporativo e emissão de NFe modelo 55.</li>
                  <li><strong>Cookies e Navegação:</strong> Utilizamos identificadores de navegação para persistência do carrinho temporário de compras de tênis e preferências de marcas parceiras no seu navegador.</li>
                  <li><strong>Compartilhamento de dados:</strong> Seus dados fiscais de endereço de entrega são transmitidos de forma segura via API às transportadoras credenciadas (como Correios, Braspress e Jamef) para roteirização logística.</li>
                </ul>
              </div>
            )}

            {/* TAB CONTENT: TERMS */}
            {institTab === "terms" && (
              <div className="space-y-5 text-sm text-slate-300 max-w-4xl">
                <h3 className="text-xl font-black text-white">Termos e Regras de Compra e Despacho</h3>
                <p>
                  As operações comerciais na SneakerHub Distribuidora de Calçados são regidas pelas seguintes diretrizes jurídicas e fiscais:
                </p>
                <ul className="list-decimal pl-5 space-y-2.5 text-xs text-slate-400">
                  <li><strong>Pedido Mínimo de Atacado:</strong> A liberação de preços de tabela CNPJ exige um pedido de no mínimo R$ 1.500,00 ou no mínimo 5 pares mesclados. Pedidos inferiores serão faturados com preços de varejo padrão de ponta de estoque.</li>
                  <li><strong>Política de Troca por Defeito:</strong> Garantia legal de 90 dias contra defeitos de fabricação em toda a nossa linha de tênis. Não trocamos calçados por desgaste natural ou mau uso pós-venda ao consumidor final.</li>
                  <li><strong>Substituição Tributária (ST):</strong> Os valores de ICMS-ST serão calculados de acordo com o estado do destinatário no fechamento fiscal e adicionados ao faturamento, salvo se possuir regime especial cadastrado.</li>
                </ul>
              </div>
            )}

            {/* TAB CONTENT: CONTACT */}
            {institTab === "contact" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-white">Fale com Nosso Time de Faturamento</h3>
                  <p className="text-sm text-slate-400">
                    Estamos à disposição para sanar dúvidas sobre faturamento, prazos de envio, separação e grade fechada de tênis.
                  </p>

                  <div className="space-y-4 text-xs text-slate-300">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#00FF41]" />
                      <span>Telefone Comercial: (11) 4002-8922 (Segunda a Sexta das 8h às 18h)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp Atacado Direct: +55 (11) 99999-9999</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-rose-400" />
                      <span>CD Central: Av. Tamboré, 1400 - Tamboré, Barueri - SP, 06460-000</span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="bg-slate-950 p-6 rounded-2xl border border-white/5">
                  <h4 className="font-bold text-xs uppercase tracking-widest text-slate-300 mb-4">Envie uma Mensagem Direta</h4>
                  
                  {contactSuccess ? (
                    <div className="text-center py-8 space-y-3">
                      <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h5 className="font-bold text-sm">Mensagem Enviada!</h5>
                      <p className="text-xs text-slate-400">Um analista comercial responderá em até 2 horas úteis no e-mail informado.</p>
                      <button 
                        onClick={() => { setContactSuccess(false); setContactMessage(""); }}
                        className="text-xs text-rose-400 underline"
                      >
                        Enviar outro contato
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setContactSuccess(true); }} className="space-y-3 text-left">
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono">NOME COMPLETO / CNPJ</label>
                        <input 
                          type="text" 
                          required 
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono">E-MAIL</label>
                        <input 
                          type="email" 
                          required 
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono">WHATSAPP / TELEFONE</label>
                        <input 
                          type="text" 
                          placeholder="(11) 99999-9999"
                          required 
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono">MENSAGEM / DÚVIDA / GRADE DESEJADA</label>
                        <textarea 
                          rows={3} 
                          required 
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="Olá, gostaria de saber mais sobre a grade fechada da Nike e faturamento faturado no boleto..."
                          className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none" 
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-rose-500 to-amber-500 py-2.5 rounded text-xs font-bold uppercase tracking-wider text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Enviar Solicitação Comercial</span>
                      </button>
                    </form>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

        {/* 3. ADMINISTRATIVE CONTROL PANEL & REALTIME ANALYTICS */}
        {activeTab === "admin" && (
          <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            
            {/* Header section with credentials message */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-amber-500 animate-spin-slow" />
                  <span>Área de Administração Comercial</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">SNEAKERHUB CENTRAL // MONITORAMENTO DE ESTOQUE E FISCAL</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                  🔐 ADMIN SYSTEM CONTROL
                </span>
              </div>
            </div>

            {/* Admin Menu Tabs */}
            <div className="flex flex-wrap gap-1 bg-slate-950/60 p-2 border-b border-white/5">
              <button 
                onClick={() => setAdminTab("dashboard")}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${adminTab === "dashboard" ? "bg-slate-800 text-[#00FF41]" : "text-slate-400 hover:text-white"}`}
              >
                <BarChart3 className="w-4 h-4" />
                Painel Métricas
              </button>
              <button 
                onClick={() => setAdminTab("products")}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${adminTab === "products" ? "bg-slate-800 text-[#00FF41]" : "text-slate-400 hover:text-white"}`}
              >
                <Box className="w-4 h-4" />
                Gerenciar Estoque / Produtos ({products.length})
              </button>
              <button 
                onClick={() => setAdminTab("orders")}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${adminTab === "orders" ? "bg-slate-800 text-[#00FF41]" : "text-slate-400 hover:text-white"}`}
              >
                <FileText className="w-4 h-4" />
                Pedidos ({orders.length})
              </button>
              <button 
                onClick={() => setAdminTab("clients")}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${adminTab === "clients" ? "bg-slate-800 text-[#00FF41]" : "text-slate-400 hover:text-white"}`}
              >
                <Users className="w-4 h-4" />
                Clientes Revendedores
              </button>
            </div>

            <div className="p-6 text-left">
              
              {/* SUBTAB: DASHBOARD ANALYTICS */}
              {adminTab === "dashboard" && (
                <div className="space-y-6">
                  
                  {/* Stats blocks */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 space-y-1">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Faturamento Total do Mês</p>
                      <h4 className="text-2xl font-black text-emerald-400 font-mono">
                        R$ {adminStats.totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </h4>
                      <p className="text-[9px] text-slate-400 font-sans">Simulação dinâmica de vendas faturadas</p>
                    </div>
                    <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 space-y-1">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Estoque Físico Separado</p>
                      <h4 className="text-2xl font-black text-white font-mono">
                        {adminStats.totalStock} Pares
                      </h4>
                      <p className="text-[9px] text-slate-400 font-sans">Em 6 modelos e variações ativas</p>
                    </div>
                    <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 space-y-1">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Clientes Revendedores</p>
                      <h4 className="text-2xl font-black text-sky-400 font-mono">
                        {adminStats.clientsCount} CNPJs
                      </h4>
                      <p className="text-[9px] text-slate-400 font-sans">Contas habilitadas na região Sudeste</p>
                    </div>
                  </div>

                  {/* Graph Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* SVG GRAPH: SALES BY DAY */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">Simulador de Faturamento Diário (Julho)</h4>
                      
                      <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-white/10 px-2">
                        {/* Day bars */}
                        {[
                          { label: "12/07", value: 4500 },
                          { label: "13/07", value: 9200 },
                          { label: "14/07", value: 12000 },
                          { label: "15/07", value: 7800 },
                          { label: "16/07", value: 11400 },
                          { label: "17/07", value: 15900 },
                          { label: "18/07", value: adminStats.totalRevenue }
                        ].map((day, idx) => {
                          const maxVal = 16000;
                          const heightPct = Math.min((day.value / maxVal) * 100, 100);
                          return (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                              <span className="text-[9px] text-emerald-400 font-mono hidden group-hover:block transition-all absolute -translate-y-8 bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded">
                                R$ {Math.round(day.value)}
                              </span>
                              <div className="w-full bg-slate-800 rounded-t-md overflow-hidden relative h-28 flex items-end">
                                <div 
                                  style={{ height: `${heightPct}%` }}
                                  className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm"
                                />
                              </div>
                              <span className="text-[9px] text-slate-500 font-mono tracking-tight">{day.label}</span>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-[10px] text-slate-400 leading-normal">
                        <strong>Nota de desempenho:</strong> Picos de faturamento ocorrem nas terças e quintas-feiras com a reposição do estoque de tênis casuais.
                      </p>
                    </div>

                    {/* Stock Alert list */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-white/5 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">Alertas Críticos de Reposição</h4>
                      
                      <div className="space-y-2.5">
                        {products.map(p => {
                          const isLow = p.stock < 50;
                          return (
                            <div key={p.id} className="flex items-center justify-between p-2.5 bg-slate-900/50 rounded-lg border border-white/5">
                              <div className="space-y-0.5">
                                <p className="text-xs font-semibold text-white">{p.name}</p>
                                <p className="text-[9px] text-slate-400 font-mono">Cod ID: {p.id} // {p.brand}</p>
                              </div>
                              <div className="text-right">
                                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${isLow ? "bg-rose-500/20 text-rose-400 border border-rose-500/20" : "bg-slate-800 text-slate-400"}`}>
                                  {p.stock} un.
                                </span>
                                <span className="text-[9px] text-slate-500 block mt-1">{isLow ? "🚨 Crítico" : "✓ Seguro"}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* SUBTAB: MANAGE PRODUCTS & INVENTORY */}
              {adminTab === "products" && (
                <div className="space-y-8">
                  
                  {/* Cadastrar Novo Produto */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-white/5">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-white/5 pb-3 mb-4">
                      Cadastrar Novo Tênis no Estoque Real-Time
                    </h4>
                    
                    <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-mono uppercase">Nome do Tênis / Modelo</label>
                        <input 
                          type="text" 
                          placeholder="Ex: Air Max 90 Ultimate" 
                          required
                          value={newProdName}
                          onChange={(e) => setNewProdName(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-mono uppercase">Marca</label>
                        <select 
                          value={newProdBrand}
                          onChange={(e) => setNewProdBrand(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
                        >
                          <option value="Nike">Nike</option>
                          <option value="Adidas">Adidas</option>
                          <option value="Puma">Puma</option>
                          <option value="Mizuno">Mizuno</option>
                          <option value="Vans">Vans</option>
                          <option value="Other">Outra</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-mono uppercase">Categoria</label>
                        <select 
                          value={newProdCategory}
                          onChange={(e) => setNewProdCategory(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
                        >
                          <option value="Casual">Casual</option>
                          <option value="Corrida">Corrida</option>
                          <option value="Skate">Skate</option>
                          <option value="Basquete">Basquete</option>
                          <option value="Futebol">Futebol</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-mono uppercase">Preço Varejo (Sugerido)</label>
                        <input 
                          type="number" 
                          step="0.01" 
                          placeholder="Ex: 599.90" 
                          required
                          value={newProdRetailPrice}
                          onChange={(e) => setNewProdRetailPrice(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-mono uppercase">Preço Atacado (CNPJ Lote)</label>
                        <input 
                          type="number" 
                          step="0.01" 
                          placeholder="Ex: 399.90" 
                          required
                          value={newProdWholesalePrice}
                          onChange={(e) => setNewProdWholesalePrice(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-mono uppercase">Estoque Inicial (Pares)</label>
                        <input 
                          type="number" 
                          placeholder="Ex: 120" 
                          value={newProdStock}
                          onChange={(e) => setNewProdStock(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none" 
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="text-[10px] text-slate-400 font-mono uppercase">URL da Foto do Tênis</label>
                        <input 
                          type="text" 
                          placeholder="Ex: https://images.unsplash.com/..." 
                          value={newProdImage}
                          onChange={(e) => setNewProdImage(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none" 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-mono uppercase">Grade (Separe por vírgula)</label>
                        <input 
                          type="text" 
                          value={newProdSizes}
                          onChange={(e) => setNewProdSizes(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none" 
                        />
                      </div>

                      <div className="space-y-1 md:col-span-3">
                        <label className="text-[10px] text-slate-400 font-mono uppercase">Descrição Geral para Revendedores</label>
                        <textarea 
                          rows={2}
                          placeholder="Detalhes sobre cabedal, solado, mercado e apelo de revenda do modelo..."
                          value={newProdDescription}
                          onChange={(e) => setNewProdDescription(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none" 
                        />
                      </div>

                      <div className="md:col-span-3 pt-3 flex justify-end">
                        <button 
                          type="submit"
                          className="bg-[#00FF41] hover:bg-emerald-500 text-slate-950 text-xs font-black px-6 py-3 rounded-lg uppercase tracking-wider"
                        >
                          Confirmar Entrada no Sistema
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Lista Editável de Estoque */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono">Tabela de Edição de Preços e Quantidades</h4>
                    
                    <div className="overflow-x-auto border border-white/10 rounded-2xl">
                      <table className="w-full text-left text-xs text-slate-300 min-w-[700px]">
                        <thead className="bg-slate-950 text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                          <tr>
                            <th className="p-4">Calçado / Marca</th>
                            <th className="p-4 text-center">Estoque Atual</th>
                            <th className="p-4">Preço Varejo (R$)</th>
                            <th className="p-4">Preço Atacado (R$)</th>
                            <th className="p-4 text-center">Grade Ativa</th>
                            <th className="p-4 text-right">Ação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 bg-slate-900">
                          {products.map(p => (
                            <tr key={p.id} className="hover:bg-slate-950/40">
                              <td className="p-4 flex items-center gap-3">
                                <img src={p.image} className="w-10 h-10 object-cover rounded" />
                                <div>
                                  <p className="font-bold text-white text-xs">{p.name}</p>
                                  <p className="text-[9px] text-slate-400 font-mono">{p.brand} // ID {p.id}</p>
                                </div>
                              </td>
                              <td className="p-4 text-center">
                                <input 
                                  type="number" 
                                  value={p.stock}
                                  onChange={(e) => handleUpdateStock(p.id, parseInt(e.target.value) || 0)}
                                  className="w-16 bg-slate-950 border border-white/15 rounded text-center py-1 font-mono text-xs text-emerald-400 focus:outline-none focus:border-emerald-400"
                                />
                              </td>
                              <td className="p-4">
                                <input 
                                  type="number" 
                                  step="0.1"
                                  value={p.retailPrice}
                                  onChange={(e) => handleUpdatePrice(p.id, false, parseFloat(e.target.value) || 0)}
                                  className="w-24 bg-slate-950 border border-white/15 rounded px-2 py-1 font-mono text-xs text-white focus:outline-none focus:border-rose-500"
                                />
                              </td>
                              <td className="p-4">
                                <input 
                                  type="number" 
                                  step="0.1"
                                  value={p.wholesalePrice}
                                  onChange={(e) => handleUpdatePrice(p.id, true, parseFloat(e.target.value) || 0)}
                                  className="w-24 bg-slate-950 border border-white/15 rounded px-2 py-1 font-mono text-xs text-amber-400 focus:outline-none focus:border-amber-400"
                                />
                              </td>
                              <td className="p-4 text-center">
                                <span className="font-mono text-[10px] bg-slate-950 px-2 py-1 rounded border border-white/5">
                                  {p.sizes.join(", ")}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <button 
                                  onClick={() => {
                                    if(confirm("Deseja remover do estoque?")) {
                                      setProducts(prev => prev.filter(item => item.id !== p.id));
                                    }
                                  }}
                                  className="p-1 text-slate-400 hover:text-rose-500"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* SUBTAB: MANAGE ORDERS */}
              {adminTab === "orders" && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono">Pedidos e Movimentações Financeiras</h4>
                  
                  <div className="space-y-3">
                    {orders.map(o => (
                      <div key={o.id} className="bg-slate-950 border border-white/5 rounded-2xl p-5 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-white">{o.id}</span>
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${o.clientType === "Atacado" ? "bg-emerald-500/10 text-emerald-400" : "bg-sky-500/10 text-sky-400"}`}>
                                {o.clientType}
                              </span>
                            </div>
                            <p className="text-xs font-semibold text-slate-300 mt-1">Cliente: {o.clientName}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-slate-400 font-mono block">{o.date}</span>
                            <span className="font-mono text-sm font-black text-white mt-1 block">R$ {o.total.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Order items summary */}
                        <div className="text-xs text-slate-400 space-y-1 bg-slate-900/60 p-3 rounded-lg border border-white/5">
                          <p className="font-mono text-[10px] text-slate-500">PRODUTOS NO LOTE:</p>
                          {o.items.map((it, idx) => (
                            <p key={idx} className="text-slate-300">
                              - <strong className="text-white">{it.qty}x</strong> {it.productName} (Tamanho: {it.size})
                            </p>
                          ))}
                        </div>

                        {/* Status Manager */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Status:</span>
                            <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-md ${
                              o.status === "Pendente" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                              o.status === "Faturado" ? "bg-sky-500/10 text-sky-400 border border-sky-500/20" :
                              o.status === "Enviado" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                              "bg-slate-800 text-slate-400"
                            }`}>
                              {o.status}
                            </span>
                          </div>

                          <div className="flex gap-1.5">
                            <button 
                              onClick={() => handleUpdateOrderStatus(o.id, "Faturado")}
                              className="bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 text-[10px] font-bold px-2.5 py-1.5 rounded transition-all"
                            >
                              Faturar
                            </button>
                            <button 
                              onClick={() => handleUpdateOrderStatus(o.id, "Enviado")}
                              className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2.5 py-1.5 rounded transition-all"
                            >
                              Enviar p/ Coleta
                            </button>
                            <button 
                              onClick={() => handleUpdateOrderStatus(o.id, "Entregue")}
                              className="bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-bold px-2.5 py-1.5 rounded transition-all"
                            >
                              Entregue
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUBTAB: CLIENTS */}
              {adminTab === "clients" && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono">Parceiros Habilitados p/ Faturamento Atacadista</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">Super Tênis São Paulo Ltda</span>
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">CNPJ</span>
                      </div>
                      <p className="text-[11px] text-slate-400">CNPJ: 12.345.678/0001-99 // Insc. Est: 110.220.330.440</p>
                      <p className="text-[11px] text-slate-400">Endereço: Rua Augusta, 842 - São Paulo / SP</p>
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-mono">Limite de Crédito Boleto:</span>
                        <strong className="text-xs text-[#00FF41] font-mono">R$ 50.000,00</strong>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">Kicks Force Distribuição S/A</span>
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">CNPJ</span>
                      </div>
                      <p className="text-[11px] text-slate-400">CNPJ: 22.344.890/0001-99 // Insc. Est: 254.980.120.760</p>
                      <p className="text-[11px] text-slate-400">Endereço: Av. Tamboré, 100 - Barueri / SP</p>
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-mono">Limite de Crédito Boleto:</span>
                        <strong className="text-xs text-[#00FF41] font-mono">R$ 150.000,00</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </main>

      {/* QUICK VIEW PRODUCT MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-left"
            >
              
              <button 
                onClick={() => { setSelectedProduct(null); setQuickViewSize(null); }}
                className="absolute top-4 right-4 bg-slate-950/80 p-2 rounded-full border border-white/10 hover:bg-slate-800 transition-colors z-10"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
                
                {/* Visual */}
                <div className="space-y-4">
                  <div className="aspect-square bg-slate-950 rounded-2xl overflow-hidden border border-white/5">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5 flex items-center gap-3">
                    <Truck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Despacho imediato para todo o território nacional. Seguro de carga e roubo incluso no frete de atacado.
                    </p>
                  </div>
                </div>

                {/* Info and action */}
                <div className="space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-widest">
                      {selectedProduct.brand}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                      {selectedProduct.name}
                    </h3>
                    
                    {/* Rating and Stock */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-slate-200 font-bold">{selectedProduct.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-slate-600">|</span>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {selectedProduct.stock} Pares em Estoque
                      </span>
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Pricing Context Box */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-400">Venda no Varejo:</span>
                      <span className="text-slate-300 font-mono">R$ {selectedProduct.retailPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-1.5 border-t border-white/5">
                      <span className="text-xs text-slate-400 font-semibold">Preço Distribuição (Lote):</span>
                      <div className="text-right">
                        <span className="text-lg font-black text-[#00FF41] font-mono">
                          R$ {selectedProduct.wholesalePrice.toFixed(2)}
                        </span>
                        <span className="text-[8px] text-emerald-400 block uppercase font-bold tracking-wider">✓ 30% Off no Atacado</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Selections */}
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Selecione o Tamanho:</label>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProduct.sizes.map(s => (
                          <button 
                            key={s}
                            onClick={() => setQuickViewSize(s)}
                            className={`w-9 h-9 text-xs font-bold rounded-lg transition-all ${quickViewSize === s ? "bg-rose-500 text-white shadow-lg" : "bg-slate-950 text-slate-400 hover:text-white"}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Variação de Cor:</label>
                      <div className="flex gap-2">
                        {selectedProduct.colors.map(col => (
                          <button 
                            key={col}
                            onClick={() => setQuickViewColor(col)}
                            className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all ${quickViewColor === col ? "border-emerald-400 bg-emerald-500/10 text-emerald-400" : "border-white/10 bg-slate-950 text-slate-400"}`}
                          >
                            {col}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart button */}
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct, quickViewSize, quickViewColor || selectedProduct.colors[0]);
                      setSelectedProduct(null);
                      setQuickViewSize(null);
                    }}
                    className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-500/20 hover:opacity-95"
                  >
                    Adicionar ao Carrinho de Pedidos
                  </button>

                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SHOPPING CART / CHECKOUT SIDEBAR */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs">
            
            <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="relative w-full max-w-md bg-slate-900 border-l border-white/10 h-full shadow-2xl flex flex-col justify-between text-left"
            >
              
              {/* Cart Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-950">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-rose-400" />
                  <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-200">Carrinho de Compras</h3>
                  <span className="text-xs bg-white/10 px-2 py-0.5 rounded font-mono text-slate-300">{cart.length}</span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 hover:bg-white/5 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Core Steps */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Step selector */}
                {cart.length > 0 && checkoutStep !== "success" && (
                  <div className="flex items-center justify-between text-xs border-b border-white/5 pb-4 font-mono">
                    <span className={`pb-1 ${checkoutStep === "cart" ? "text-rose-400 border-b-2 border-rose-400 font-bold" : "text-slate-500"}`}>
                      1. Resumo Lote
                    </span>
                    <span className="text-slate-600">➔</span>
                    <span className={`pb-1 ${checkoutStep === "payment" ? "text-rose-400 border-b-2 border-rose-400 font-bold" : "text-slate-500"}`}>
                      2. Faturamento & Pgto
                    </span>
                  </div>
                )}

                {/* CART EMPTY STATE */}
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto animate-bounce" />
                    <h4 className="font-bold text-sm text-slate-300">Seu carrinho está vazio</h4>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Explore nossa vitrine de tênis e adicione calçados para faturar seu pedido de atacado ou varejo.
                    </p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="bg-white/5 border border-white/10 text-xs font-semibold px-4 py-2 rounded-lg text-slate-300 hover:bg-white/10"
                    >
                      Continuar Navegando
                    </button>
                  </div>
                ) : (
                  
                  // STEP 1: RESUMO DO CART
                  checkoutStep === "cart" ? (
                    <div className="space-y-5">
                      
                      {/* Products rows */}
                      <div className="space-y-3">
                        {cart.map((item, idx) => {
                          const price = currentUser?.type === "LOJISTA" ? item.product.wholesalePrice : item.product.retailPrice;
                          return (
                            <div key={idx} className="flex gap-3 bg-slate-950 p-3 rounded-xl border border-white/5">
                              <img src={item.product.image} className="w-14 h-14 object-cover rounded-lg" />
                              <div className="flex-1 space-y-1">
                                <h5 className="font-bold text-xs text-white leading-snug line-clamp-1">{item.product.name}</h5>
                                <p className="text-[10px] text-slate-400 font-mono">Size: {item.selectedSize} // Color: {item.selectedColor}</p>
                                
                                <div className="flex items-center justify-between pt-1">
                                  <span className="text-xs font-bold text-[#00FF41] font-mono">
                                    R$ {(price * item.quantity).toFixed(2)}
                                  </span>
                                  
                                  {/* Qty button */}
                                  <div className="flex items-center gap-1.5 bg-slate-900 border border-white/5 rounded-md px-1.5 py-0.5">
                                    <button onClick={() => updateCartQty(idx, -1)} className="text-slate-400 hover:text-white"><Minus className="w-3 h-3" /></button>
                                    <span className="text-xs font-mono font-bold text-white px-1">{item.quantity}</span>
                                    <button onClick={() => updateCartQty(idx, 1)} className="text-slate-400 hover:text-white"><Plus className="w-3 h-3" /></button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Shipping Calculation */}
                      <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-3">
                        <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5" />
                          <span>Calcular Frete e Entrega</span>
                        </label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Digite seu CEP (Ex: 06460000)"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            className="flex-1 bg-slate-900 border border-white/10 rounded px-2.5 py-2 text-xs text-white" 
                          />
                          <button 
                            onClick={handleCalculateShipping}
                            className="bg-slate-800 hover:bg-slate-700 text-xs px-3 rounded font-bold"
                          >
                            Calcular
                          </button>
                        </div>

                        {shippingCost !== null && (
                          <div className="pt-2 text-xs flex justify-between items-center text-slate-300">
                            <span>Tipo de Despacho:</span>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => { setShippingMethod("PAC"); handleCalculateShipping(); }}
                                className={`px-2 py-0.5 rounded text-[10px] font-mono ${shippingMethod === "PAC" ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-900"}`}
                              >
                                PAC (R$ 18.90)
                              </button>
                              <button 
                                onClick={() => { setShippingMethod("SEDEX"); handleCalculateShipping(); }}
                                className={`px-2 py-0.5 rounded text-[10px] font-mono ${shippingMethod === "SEDEX" ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-900"}`}
                              >
                                SEDEX (R$ 38.50)
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  ) : (
                    
                    // STEP 2: PAYMENT FEEDS
                    checkoutStep === "payment" ? (
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">Selecione o Meio de Pagamento</h4>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <button 
                            onClick={() => setPaymentMethod("PIX")}
                            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-center transition-all ${paymentMethod === "PIX" ? "border-emerald-400 bg-emerald-500/10 text-emerald-400" : "border-white/10 bg-slate-950 text-slate-400"}`}
                          >
                            <QrCode className="w-5 h-5" />
                            <span className="text-[10px] font-bold">PIX Desconto</span>
                          </button>
                          <button 
                            onClick={() => setPaymentMethod("CARD")}
                            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-center transition-all ${paymentMethod === "CARD" ? "border-emerald-400 bg-emerald-500/10 text-emerald-400" : "border-white/10 bg-slate-950 text-slate-400"}`}
                          >
                            <CreditCard className="w-5 h-5" />
                            <span className="text-[10px] font-bold">Cartão</span>
                          </button>
                          <button 
                            onClick={() => setPaymentMethod("BOLETO")}
                            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-center transition-all ${paymentMethod === "BOLETO" ? "border-emerald-400 bg-emerald-500/10 text-emerald-400" : "border-white/10 bg-slate-950 text-slate-400"}`}
                          >
                            <FileText className="w-5 h-5" />
                            <span className="text-[10px] font-bold">Boleto 30d</span>
                          </button>
                        </div>

                        {/* INTERACTIVE PAY METHOD CONTAINER */}
                        <div className="p-4 bg-slate-950 rounded-xl border border-white/5 text-xs text-slate-300 space-y-3">
                          {paymentMethod === "PIX" && (
                            <div className="space-y-2 text-center py-2">
                              <div className="w-24 h-24 bg-white p-1 rounded-lg mx-auto">
                                <img src="https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=200&q=80" alt="Pix QR" className="w-full h-full object-contain grayscale" />
                              </div>
                              <p className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider">Aprovação Imediata pós-Pix</p>
                              <p className="text-[11px] text-slate-400 leading-normal">
                                Copie a chave Pix abaixo e efetue o pagamento no aplicativo do seu banco para que o estoque seja separado automaticamente.
                              </p>
                              <div className="bg-slate-900 border border-white/10 p-2 rounded text-[10px] font-mono break-all text-white select-all">
                                00020126580014br.gov.bcb.pix0136923c-f9e4-4d83-9b62-1081519b5962520400005303986
                              </div>
                            </div>
                          )}

                          {paymentMethod === "CARD" && (
                            <div className="space-y-3">
                              <p className="text-[10px] font-mono uppercase text-slate-400">Dados do Portador do Cartão</p>
                              
                              {/* Animated Interactive credit card simulation */}
                              <div className="bg-gradient-to-tr from-rose-600 to-amber-600 rounded-xl p-4 text-white space-y-4 shadow-lg">
                                <div className="flex justify-between items-start">
                                  <span className="font-mono text-[9px] uppercase tracking-wider font-bold">SNEAKERHUB GOLD</span>
                                  <CreditCard className="w-6 h-6 opacity-80" />
                                </div>
                                <div className="space-y-1">
                                  <span className="text-[10px] text-white/50 font-mono block">NÚMERO DO CARTÃO</span>
                                  <span className="font-mono text-sm tracking-widest">{cardNumber || "•••• •••• •••• ••••"}</span>
                                </div>
                                <div className="flex justify-between items-end">
                                  <div>
                                    <span className="text-[8px] text-white/50 font-mono block">NOME NO CARTÃO</span>
                                    <span className="text-xs uppercase font-bold tracking-tight">{cardName || "CLIENTE VIP SNEAKER"}</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <div>
                                      <span className="text-[8px] text-white/50 font-mono block">VAL</span>
                                      <span className="text-xs font-mono font-bold">{cardExpiry || "MM/AA"}</span>
                                    </div>
                                    <div>
                                      <span className="text-[8px] text-white/50 font-mono block">CVV</span>
                                      <span className="text-xs font-mono font-bold">{cardCvv || "•••"}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Card Inputs */}
                              <div className="space-y-2 pt-2 text-left">
                                <input 
                                  type="text" 
                                  placeholder="Nome Completo (Conforme impresso)"
                                  value={cardName}
                                  onChange={(e) => setCardName(e.target.value)}
                                  className="w-full bg-slate-900 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white" 
                                />
                                <input 
                                  type="text" 
                                  placeholder="Número do Cartão (16 dígitos)"
                                  maxLength={19}
                                  value={cardNumber}
                                  onChange={(e) => setCardNumber(e.target.value)}
                                  className="w-full bg-slate-900 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white" 
                                />
                                <div className="grid grid-cols-2 gap-2">
                                  <input 
                                    type="text" 
                                    placeholder="Exp (MM/AA)"
                                    maxLength={5}
                                    value={cardExpiry}
                                    onChange={(e) => setCardExpiry(e.target.value)}
                                    className="bg-slate-900 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white" 
                                  />
                                  <input 
                                    type="password" 
                                    placeholder="CVV"
                                    maxLength={3}
                                    value={cardCvv}
                                    onChange={(e) => setCardCvv(e.target.value)}
                                    className="bg-slate-900 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white" 
                                  />
                                </div>
                              </div>

                            </div>
                          )}

                          {paymentMethod === "BOLETO" && (
                            <div className="space-y-2 text-left">
                              <p className="text-[10px] text-amber-400 font-mono uppercase tracking-wider font-bold">Faturamento Boleto 30 Dias</p>
                              <p className="text-[11px] text-slate-400 leading-relaxed">
                                Condição especial exclusiva para CNPJ ativo com mais de 2 anos de fundação. O boleto bancário será enviado junto com o faturamento da nota fiscal eletrônica.
                              </p>
                              <div className="bg-slate-900 p-2.5 rounded text-[10px] font-mono space-y-1 text-slate-300">
                                <p>• Prazo de vencimento: 30 dias líquidos</p>
                                <p>• Envio de PDF p/ e-mail de cobrança cadastrado</p>
                                <p>• Sujeito a análise cadastral simplificada</p>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    ) : null
                  )

                )}

                {/* STEP 3: SUCCESS STATE */}
                {checkoutStep === "success" && (
                  <div className="text-center py-10 space-y-5">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-[#00FF41] rounded-full flex items-center justify-center mx-auto animate-pulse">
                      <Check className="w-8 h-8" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-lg text-white">Pedido Fechado com Sucesso!</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                        Seu pedido foi registrado em nossa central de distribuição e o estoque foi devidamente reservado.
                      </p>
                    </div>

                    {/* Invoice detail */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-white/5 text-left text-xs text-slate-300 font-mono space-y-2">
                      <p className="text-[#00FF41] font-bold text-center border-b border-white/5 pb-2 uppercase tracking-wide">COMPROVANTE DE RESERVA</p>
                      <p>• Transação: {`TRA-${Math.floor(Math.random() * 90000) + 10000}`}</p>
                      <p>• Itens Reservados: {cart.reduce((sum, i) => sum + i.quantity, 0)} pares</p>
                      <p>• Faturamento Total: R$ {cartTotal.toFixed(2)}</p>
                      <p>• Despacho de CD: Barueri / SP</p>
                    </div>

                    <div className="pt-2 space-y-2">
                      <button 
                        onClick={handleSendWhatsApp}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 py-3 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow"
                      >
                        <MessageSquare className="w-4 h-4 fill-slate-950" />
                        <span>Enviar Pedido p/ WhatsApp</span>
                      </button>
                      <button 
                        onClick={() => {
                          setCart([]);
                          setCheckoutStep("cart");
                          setIsCartOpen(false);
                        }}
                        className="w-full bg-slate-800 hover:bg-slate-750 text-white text-xs font-semibold py-2.5 rounded-lg"
                      >
                        Voltar à Vitrine
                      </button>
                    </div>

                  </div>
                )}

              </div>

              {/* Cart Footer Total block */}
              {cart.length > 0 && checkoutStep !== "success" && (
                <div className="p-6 border-t border-white/10 bg-slate-950 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-400 font-sans">
                      <span>Subtotal Lote:</span>
                      <span className="font-mono text-white">R$ {cartSubtotal.toFixed(2)}</span>
                    </div>
                    {shippingCost !== null && (
                      <div className="flex justify-between text-xs text-slate-400 font-sans">
                        <span>Frete ({shippingMethod}):</span>
                        <span className="font-mono text-white">R$ {shippingCost.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm pt-2 border-t border-white/5">
                      <span className="font-bold text-white">TOTAL ESTIMADO:</span>
                      <span className="font-black text-emerald-400 font-mono text-base">R$ {cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Submit checkout buttons */}
                  {checkoutStep === "cart" ? (
                    <button 
                      onClick={() => setCheckoutStep("payment")}
                      className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-500/10 hover:opacity-95"
                    >
                      Ir para Faturamento & Pagamento
                    </button>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setCheckoutStep("cart")}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold py-3.5 rounded-xl uppercase tracking-wider"
                      >
                        Voltar
                      </button>
                      <button 
                        onClick={handleCompleteOrder}
                        className="bg-[#00FF41] hover:bg-emerald-500 text-slate-950 text-xs font-black py-3.5 rounded-xl uppercase tracking-wider"
                      >
                        Finalizar Compra
                      </button>
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LOGIN & SIGNUP FOR WHOLESALE / LOJISTA MODAL */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-white">Acesse o Canal de Distribuição</h3>
                <p className="text-xs text-slate-400">
                  Faça login para faturar pedidos de tênis ou cadastre seu CNPJ/CPF comercial.
                </p>
              </div>

              {/* Login Type Select */}
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-lg border border-white/5">
                <button
                  type="button"
                  onClick={() => setLoginType("LOJISTA")}
                  className={`py-2 text-xs font-bold rounded-md transition-all ${loginType === "LOJISTA" ? "bg-rose-500 text-white" : "text-slate-400"}`}
                >
                  Lojista Atacado (CNPJ)
                </button>
                <button
                  type="button"
                  onClick={() => setLoginType("VAREJO")}
                  className={`py-2 text-xs font-bold rounded-md transition-all ${loginType === "VAREJO" ? "bg-rose-500 text-white" : "text-slate-400"}`}
                >
                  Consumidor Final (Varejo)
                </button>
              </div>

              {/* Core Forms */}
              <form onSubmit={handleLogin} className="space-y-4">
                
                {isRegistering && (
                  <>
                    <div>
                      <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Razão Social / Nome Fantasia</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Tênis Center Atacadista Ltda" 
                        required
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500" 
                      />
                    </div>
                    {loginType === "LOJISTA" && (
                      <div>
                        <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">CNPJ da Empresa</label>
                        <input 
                          type="text" 
                          placeholder="Ex: 22.344.890/0001-99" 
                          required
                          value={signUpCnpj}
                          onChange={(e) => setSignUpCnpj(e.target.value)}
                          className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500" 
                        />
                      </div>
                    )}
                  </>
                )}

                <div>
                  <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">E-mail Cadastrado</label>
                  <input 
                    type="email" 
                    placeholder="lojista@exemplo.com" 
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500" 
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Senha de Acesso</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500" 
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-500 to-amber-500 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white hover:opacity-95 shadow"
                >
                  {isRegistering ? "Confirmar Meu Cadastro Vip" : "Acessar Plataforma Comercial"}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-xs text-slate-400 hover:text-white underline"
                  >
                    {isRegistering ? "Já possuo cadastro, fazer login" : "Não possuo CNPJ habilitado, registrar"}
                  </button>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-white/10 py-12 mt-16 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-3 text-left">
            <h4 className="font-extrabold text-sm text-white tracking-wider">SNEAKERHUB</h4>
            <p className="leading-relaxed">
              Distribuidora autorizada de calçados esportivos das maiores marcas globais. Logística nacional integrada para varejistas e lojistas.
            </p>
          </div>

          <div className="space-y-3 text-left">
            <h4 className="font-extrabold text-sm text-white tracking-wider">DOCUMENTAÇÃO</h4>
            <ul className="space-y-2 font-mono text-[11px]">
              <li><button onClick={() => { setActiveTab("institutional"); setInstitTab("about_us"); }} className="hover:text-emerald-400">Quem Somos</button></li>
              <li><button onClick={() => { setActiveTab("institutional"); setInstitTab("contact"); }} className="hover:text-emerald-400">Suporte Técnico & Contato</button></li>
              <li><button onClick={() => { setActiveTab("institutional"); setInstitTab("privacy"); }} className="hover:text-emerald-400">Diretrizes de Privacidade</button></li>
              <li><button onClick={() => { setActiveTab("institutional"); setInstitTab("terms"); }} className="hover:text-emerald-400">Termos de Atendimento</button></li>
            </ul>
          </div>

          <div className="space-y-3 text-left">
            <h4 className="font-extrabold text-sm text-white tracking-wider">CERTIFICAÇÃO DIGITAL</h4>
            <p className="leading-relaxed">
              Ambiente seguro com criptografia TLS 1.3 de ponta-a-ponta e validação imediata de dados cadastrais RFB.
            </p>
            <div className="flex items-center gap-2">
              <span className="bg-slate-900 border border-white/10 px-2 py-1 rounded text-[10px] font-mono text-[#00FF41]">SSL SECURE</span>
              <span className="bg-slate-900 border border-white/10 px-2 py-1 rounded text-[10px] font-mono text-sky-400">LGPD OK</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="font-mono text-[10px]">
            © {new Date().getFullYear()} SNEAKERHUB DISTRIBUIDORA LTDA. CNPJ: 22.344.890/0001-99
          </p>
          <button 
            onClick={onBack}
            className="text-xs hover:text-white font-semibold flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Portfólio de Augusto</span>
          </button>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://api.whatsapp.com/send?phone=5511999999999&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20cal%C3%A7ados%20no%20atacado%20SneakerHub."
        target="_blank"
        referrerPolicy="no-referrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-slate-950"
        title="Falar no WhatsApp Atacado"
      >
        <MessageSquare className="w-6 h-6 fill-slate-950" />
      </a>

    </div>
  );
}
