import React, { useState, useEffect } from "react";
import { 
  ShoppingBag, CheckCircle, Clock, Truck, ChefHat, Calendar, ShieldCheck, 
  CreditCard, ArrowLeft, Plus, Minus, Star, ChevronRight, User, Settings, 
  BarChart3, RefreshCw, AlertCircle, Sparkles, Filter, Lock, MapPin, Phone, 
  Mail, X, Eye, FileText, Download, Check, Edit2, Trash2, Camera, Navigation, 
  PieChart, Tag, DollarSign, Users, Award, Play
} from "lucide-react";

interface MealPrepPlatformProps {
  onBack?: () => void;
}

// Data Models
interface MealItem {
  id: string;
  name: string;
  category: "high_protein" | "keto" | "calorie_smart" | "chef_specials" | "veggie";
  description: string;
  image: string;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fats: number; // in grams
  weight: number; // in grams
  allergens: string[];
  ingredients: string;
  isPopular?: boolean;
}

interface Plan {
  id: string;
  mealsCount: number;
  pricePerMeal: number;
  popular?: boolean;
  bestValue?: boolean;
}

interface Subscription {
  id: string;
  planId: string;
  status: "active" | "paused" | "cancelled";
  deliveryDay: "Segunda-feira" | "Quarta-feira" | "Sexta-feira";
  nextBillingDate: string;
  selectedMeals: { [mealId: string]: number };
}

interface Order {
  id: string;
  customerName: string;
  address: string;
  phone: string;
  mealsCount: number;
  totalAmount: number;
  status: "recebido" | "em_producao" | "pronto" | "coletado" | "saiu_entrega" | "entregue";
  createdAt: string;
  deliveryDriver?: string;
  proofPhoto?: string;
}

const INITIAL_MEALS: MealItem[] = [
  {
    id: "m-1",
    name: "Filet Mignon ao Molho Dijon & Batatas Rústicas",
    category: "chef_specials",
    description: "Corte nobre grelhado ao ponto com molho de mostarda Dijon artesanal e batatas assadas com alecrim.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    calories: 520,
    protein: 48,
    carbs: 34,
    fats: 18,
    weight: 420,
    allergens: ["Mostarda", "Sem Glúten"],
    ingredients: "Filet Mignon, batata rústica, mostarda dijon, creme de leite leve, azeite extra virgem, alho, alecrim, sal rosa.",
    isPopular: true,
  },
  {
    id: "m-2",
    name: "Salmão Grelhado com Aspargos e Quinoa",
    category: "high_protein",
    description: "Posta de salmão selvagem grelhado na manteiga de ervas, aspargos frescos e quinoa real colorida.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    calories: 460,
    protein: 42,
    carbs: 26,
    fats: 20,
    weight: 400,
    allergens: ["Peixe", "Sem Glúten", "Sem Lactose"],
    ingredients: "Salmão fresco, aspargos, quinoa, azeite de oliva, limão siciliano, salsa, sal do himalaia.",
    isPopular: true,
  },
  {
    id: "m-3",
    name: "BBQ Chicken Bowl com Purê de Mandioquinha",
    category: "high_protein",
    description: "Peito de frango desfiado em molho BBQ caseiro zero açúcar com purê aveludado de mandioquinha.",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
    calories: 410,
    protein: 45,
    carbs: 38,
    fats: 8,
    weight: 400,
    allergens: ["Sem Glúten"],
    ingredients: "Peito de frango, mandioquinha, tomate concentrado, fumaça líquida, páprica defumada, azeite, alho.",
  },
  {
    id: "m-4",
    name: "Keto Beef Chili com Abacate & Mix de Queijos",
    category: "keto",
    description: "Carne moída nobre cozida lentamente com especiarias mexicanas, pedaços de abacate e cheddar derretido.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    calories: 580,
    protein: 44,
    carbs: 12,
    fats: 38,
    weight: 380,
    allergens: ["Derivados de Leite", "Sem Glúten"],
    ingredients: "Patinho moído, abacate, queijo cheddar, tomate pelado, cominho, pimenta jalapeño, coentro.",
  },
  {
    id: "m-5",
    name: "Cajun Shrimp Pasta com Molho Leve de Tomate",
    category: "chef_specials",
    description: "Camarões rosados salteados em pimenta Cajun com massa fusilli integral e molho rústico de tomates marinados.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    calories: 430,
    protein: 38,
    carbs: 48,
    fats: 9,
    weight: 410,
    allergens: ["Frutos do Mar", "Glúten"],
    ingredients: "Camarão rosa, fusilli integral, tomate italiano, tempero cajun, azeite de oliva, manjericão.",
  },
  {
    id: "m-6",
    name: "Turkey Power Bowl com Abóbora Cabotiá",
    category: "calorie_smart",
    description: "Moído de peru temperado com ervas finas, abóbora assada com canela e brócolis ao alho.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    calories: 360,
    protein: 40,
    carbs: 28,
    fats: 10,
    weight: 390,
    allergens: ["Sem Glúten", "Sem Lactose"],
    ingredients: "Peito de peru moído, abóbora cabotiá, brócolis, canela, azeite de oliva, pimenta do reino.",
  },
  {
    id: "m-7",
    name: "Stroganoff Vegano de Cogumelos & Arroz Negro",
    category: "veggie",
    description: "Mix de cogumelos Paris e Shimeji em creme de castanhas artesanal com arroz negro integral.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    calories: 390,
    protein: 18,
    carbs: 52,
    fats: 14,
    weight: 400,
    allergens: ["Castanhas", "Sem Glúten", "100% Vegano"],
    ingredients: "Cogumelo Paris, Shimeji, castanha de caju, arroz negro, biomassa de banana verde, conhaque, mostarda.",
  },
  {
    id: "m-8",
    name: "Sobrecoxa Desossada com Risoto de Couve-Flor",
    category: "keto",
    description: "Sobrecoxa suculenta marinada no limão ervas com risoto cremoso de couve-flor ao parmesão.",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
    calories: 510,
    protein: 46,
    carbs: 9,
    fats: 31,
    weight: 410,
    allergens: ["Derivados de Leite", "Sem Glúten"],
    ingredients: "Sobrecoxa de frango, couve-flor, queijo parmesão, requeijão light, limão, alho, azeite.",
  }
];

const PLANS: Plan[] = [
  { id: "p-6", mealsCount: 6, pricePerMeal: 38.9 },
  { id: "p-10", mealsCount: 10, pricePerMeal: 34.9, popular: true },
  { id: "p-12", mealsCount: 12, pricePerMeal: 31.9, bestValue: true },
  { id: "p-20", mealsCount: 20, pricePerMeal: 28.9 }
];

export default function MealPrepPlatform({ onBack }: MealPrepPlatformProps) {
  // Navigation & View Mode State
  const [currentView, setCurrentView] = useState<"home" | "select_plan" | "choose_meals" | "cart" | "customer_dashboard" | "admin_panel" | "kitchen_panel" | "driver_panel">("home");
  
  // App Core Data State
  const [mealsList, setMealsList] = useState<MealItem[]>(INITIAL_MEALS);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(PLANS[1]); // Default 10 meals
  const [selectedMealCounts, setSelectedMealCounts] = useState<{ [mealId: string]: number }>({
    "m-1": 3,
    "m-2": 3,
    "m-3": 2,
    "m-4": 2,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedMealModal, setSelectedMealModal] = useState<MealItem | null>(null);

  // Customer Account & Checkout State
  const [userAccount, setUserAccount] = useState({
    name: "Lucas Fernandes",
    email: "lucas.fernandes@exemplo.com",
    phone: "(11) 98765-4321",
    street: "Av. Paulista",
    number: "1200",
    apartment: "Apto 142",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    zipCode: "01310-100",
    deliveryPreference: "Deixar na portaria com o porteiro",
    cardLast4: "4242",
    hasActiveSubscription: true,
  });

  // Coupon State
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0.15); // 15% discount active
  const [shippingFee] = useState(0); // Free Shipping

  // Orders State (For Admin, Kitchen & Driver)
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-9821",
      customerName: "Lucas Fernandes",
      address: "Av. Paulista, 1200 - Apto 142, Bela Vista - São Paulo SP",
      phone: "(11) 98765-4321",
      mealsCount: 10,
      totalAmount: 296.65,
      status: "em_producao",
      createdAt: "Hoje, 08:30",
      deliveryDriver: "Carlos (Moto 04)"
    },
    {
      id: "ORD-9820",
      customerName: "Mariana Silva",
      address: "Rua Oscar Freire, 850 - Cerqueira César, São Paulo SP",
      phone: "(11) 97123-8899",
      mealsCount: 12,
      totalAmount: 325.38,
      status: "saiu_entrega",
      createdAt: "Hoje, 07:15",
      deliveryDriver: "Rodrigo (Carro 02)"
    },
    {
      id: "ORD-9819",
      customerName: "Gabriel Souza",
      address: "Rua Funchal, 418 - Vila Olímpia, São Paulo SP",
      phone: "(11) 99881-2233",
      mealsCount: 6,
      totalAmount: 198.39,
      status: "entregue",
      createdAt: "Ontem, 16:20",
      deliveryDriver: "Carlos (Moto 04)",
      proofPhoto: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80"
    }
  ]);

  // Toast / Notification banner
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Meal Selection Counters Helper
  const totalSelectedCount = (Object.values(selectedMealCounts) as number[]).reduce((a: number, b: number) => a + b, 0);

  const handleAddMeal = (mealId: string) => {
    if (totalSelectedCount >= selectedPlan.mealsCount) {
      showToast(`Você atingiu o limite de ${selectedPlan.mealsCount} refeições do seu plano!`);
      return;
    }
    setSelectedMealCounts((prev) => ({
      ...prev,
      [mealId]: (prev[mealId] || 0) + 1,
    }));
  };

  const handleRemoveMeal = (mealId: string) => {
    setSelectedMealCounts((prev) => {
      const current = prev[mealId] || 0;
      if (current <= 1) {
        const copy = { ...prev };
        delete copy[mealId];
        return copy;
      }
      return { ...prev, [mealId]: current - 1 };
    });
  };

  // Calculations
  const subtotal = selectedPlan.mealsCount * selectedPlan.pricePerMeal;
  const discountValue = subtotal * appliedDiscount;
  const grandTotal = subtotal - discountValue + shippingFee;

  // Filter Meals by category
  const filteredMeals = mealsList.filter((m) => {
    if (selectedCategory === "all") return true;
    return m.category === selectedCategory;
  });

  // Admin Add Meal Modal Form State
  const [newMealName, setNewMealName] = useState("");
  const [newMealCategory, setNewMealCategory] = useState<any>("high_protein");
  const [newMealDesc, setNewMealDesc] = useState("");
  const [newMealImage, setNewMealImage] = useState("");
  const [newMealCal, setNewMealCal] = useState(450);
  const [newMealProt, setNewMealProt] = useState(40);
  const [newMealCarbs, setNewMealCarbs] = useState(30);
  const [newMealFats, setNewMealFats] = useState(12);

  const handleAdminAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMealName) return;

    const created: MealItem = {
      id: `m-${Date.now()}`,
      name: newMealName,
      category: newMealCategory,
      description: newMealDesc || "Refeição nutritiva preparada artesanalmente por nossos chefs.",
      image: newMealImage || "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      calories: newMealCal,
      protein: newMealProt,
      carbs: newMealCarbs,
      fats: newMealFats,
      weight: 400,
      allergens: ["Sem Glúten"],
      ingredients: "Ingredientes selecionados 100% orgânicos e temperos naturais."
    };

    setMealsList([created, ...mealsList]);
    setNewMealName("");
    setNewMealDesc("");
    setNewMealImage("");
    showToast("Nova refeição cadastrada no cardápio com sucesso!");
  };

  return (
    <div className="min-h-screen bg-[#0C0E14] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300 relative overflow-x-hidden">
      
      {/* TOAST NOTIFICATION FLOATING BANNER */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-600 text-white font-extrabold text-xs px-4 py-3 rounded-2xl shadow-[0_10px_30px_rgba(16,185,129,0.4)] border border-emerald-400 flex items-center space-x-2 animate-bounce">
          <Sparkles className="h-4 w-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* HEADER & TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#12151E]/90 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all border border-white/10 flex items-center space-x-1.5 text-xs font-bold cursor-pointer"
              title="Voltar ao Portfólio Augusto Dev"
            >
              <ArrowLeft className="h-4 w-4 text-emerald-400" />
              <span className="hidden sm:inline">Portfólio</span>
            </button>
          )}

          {/* FRESHPREP BRAND LOGO */}
          <div 
            onClick={() => setCurrentView("home")}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-amber-300 p-0.5 shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#12151E] rounded-[14px] flex items-center justify-center">
                <ChefHat className="h-4 w-4 text-emerald-400" />
              </div>
            </div>
            <div>
              <span className="font-black text-lg tracking-wider text-white group-hover:text-emerald-300 transition-colors uppercase block leading-none">
                FRESH<span className="text-emerald-400">PREP</span>
              </span>
              <span className="text-[9px] font-mono text-slate-400 tracking-widest font-bold uppercase">
                Refeições Prontas & Assinatura
              </span>
            </div>
          </div>
        </div>

        {/* CENTER NAVIGATION LINKS */}
        <nav className="hidden lg:flex items-center space-x-1 bg-black/40 p-1.5 rounded-2xl border border-white/10">
          {[
            { id: "home", label: "Início" },
            { id: "select_plan", label: "Planos & Preços" },
            { id: "choose_meals", label: "Cardápio da Semana" },
            { id: "customer_dashboard", label: "Minha Assinatura" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentView(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentView === tab.id
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* RIGHT SYSTEM ROLES & CART TRIGGER */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* SYSTEM ROLE ACCESS BUTTONS */}
          <div className="hidden sm:flex items-center space-x-1 bg-white/5 p-1 rounded-xl border border-white/10 text-[10px] font-bold">
            <button
              onClick={() => setCurrentView("kitchen_panel")}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center space-x-1 ${
                currentView === "kitchen_panel" ? "bg-amber-500 text-black font-black" : "text-slate-300 hover:text-white"
              }`}
              title="Painel de Produção da Cozinha"
            >
              <ChefHat className="h-3 w-3" />
              <span>Cozinha</span>
            </button>

            <button
              onClick={() => setCurrentView("driver_panel")}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center space-x-1 ${
                currentView === "driver_panel" ? "bg-teal-500 text-black font-black" : "text-slate-300 hover:text-white"
              }`}
              title="Painel de Entregas do Motorista"
            >
              <Truck className="h-3 w-3" />
              <span>Motorista</span>
            </button>

            <button
              onClick={() => setCurrentView("admin_panel")}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center space-x-1 ${
                currentView === "admin_panel" ? "bg-emerald-500 text-black font-black" : "text-slate-300 hover:text-white"
              }`}
              title="Painel Geral Administrativo"
            >
              <BarChart3 className="h-3 w-3" />
              <span>Admin</span>
            </button>
          </div>

          {/* CART BUTTON */}
          <button
            onClick={() => setCurrentView("cart")}
            className="relative px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center space-x-2 cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline font-mono">
              {totalSelectedCount}/{selectedPlan.mealsCount}
            </span>
            <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#12151E]">
              {totalSelectedCount}
            </span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINERS BASED ON CURRENT VIEW */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 relative z-10">

        {/* ================= VIEW 1: LANDING HOME ================= */}
        {currentView === "home" && (
          <div className="space-y-16 animate-fade-in text-left">
            
            {/* HERO SECTION */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950/80 via-[#151926]/90 to-[#0C0E14] border border-emerald-500/30 p-8 md:p-14 shadow-[0_20px_60px_rgba(16,185,129,0.15)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-xs font-black text-emerald-300">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                  <span>ALIMENTAÇÃO SAUDÁVEL SEM TRABALHO</span>
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                  Refeições de Chef, <span className="text-emerald-400">Prontas em 2 Minutos</span>.
                </h1>

                <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-2xl">
                  Marmitas gourmet e fitness preparadas frescas por chefs renomados, embaladas sob atmosfera modificada e entregues na sua porta toda semana. Sem fogão, sem louça e com sabor impecável.
                </p>

                <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                  <button
                    onClick={() => setCurrentView("select_plan")}
                    className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Escolher Meu Plano</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setCurrentView("choose_meals")}
                    className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-extrabold text-sm rounded-2xl border border-white/10 transition-all cursor-pointer text-center"
                  >
                    Ver Cardápio da Semana
                  </button>
                </div>

                {/* TRUST BADGES */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                  <div>
                    <span className="text-lg font-black text-emerald-400 block">+150.000</span>
                    <span className="text-[11px] text-slate-400 font-medium">Marmitas Entregues</span>
                  </div>
                  <div>
                    <span className="text-lg font-black text-amber-400 block">4.9 ★</span>
                    <span className="text-[11px] text-slate-400 font-medium">+12k Avaliações</span>
                  </div>
                  <div>
                    <span className="text-lg font-black text-teal-400 block">100% Fresco</span>
                    <span className="text-[11px] text-slate-400 font-medium">Nunca Congelado Secco</span>
                  </div>
                  <div>
                    <span className="text-lg font-black text-purple-400 block">Sem Fidelidade</span>
                    <span className="text-[11px] text-slate-400 font-medium">Cancele quando quiser</span>
                  </div>
                </div>
              </div>

              {/* HERO IMAGE SHOWCASE */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl aspect-square bg-black/60">
                  <img 
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" 
                    alt="Refeição FreshPrep" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* FLOATING MACRO BADGE */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#12151E]/95 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-white block">Filet Mignon & Dijon</span>
                      <span className="text-[10px] text-slate-400">Chef Special • 420g</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] font-mono font-bold">
                      <span className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded">48g Proteína</span>
                      <span className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded">520 kcal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* HOW IT WORKS (COMO FUNCIONA) */}
            <div className="space-y-8 text-center">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase font-black tracking-widest block">PRATICIDADE MÁXIMA</span>
                <h2 className="text-2xl md:text-4xl font-black text-white mt-1">Como Funciona o FreshPrep?</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { step: "01", icon: Calendar, title: "Escolha seu Plano", desc: "Selecione entre 6, 10, 12 ou 20 refeições por semana conforme sua rotina." },
                  { step: "02", icon: ChefHat, title: "Monte seu Cardápio", desc: "Escolha suas refeições favoritas dentre +30 opções rotativas de chefs." },
                  { step: "03", icon: Truck, title: "Entrega Refrigerada", desc: "Receba em embalagens térmicas seladas que mantém a refeição fresca por 7 dias." },
                  { step: "04", icon: Clock, title: "Aqueça em 2 Minutos", desc: "Coloque no micro-ondas por 120s e aproveite uma refeição gourmet nutritiva." },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="bg-[#12151E] p-6 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-all text-left space-y-3 relative group">
                      <span className="absolute top-4 right-4 text-3xl font-black text-white/10 group-hover:text-emerald-500/30 transition-colors">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-extrabold text-white text-base">{item.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FEATURED MENU PREVIEW */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">Cardápio Destaque desta Semana</h2>
                  <p className="text-xs text-slate-400 mt-1">Receitas preparadas com ingredientes frescos, sem conservantes químicos.</p>
                </div>
                <button
                  onClick={() => setCurrentView("choose_meals")}
                  className="text-xs font-black text-emerald-400 hover:underline cursor-pointer flex items-center space-x-1"
                >
                  <span>Ver Todos os {mealsList.length} Pratos</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {mealsList.slice(0, 4).map((meal) => (
                  <div key={meal.id} className="bg-[#12151E] rounded-2xl border border-white/10 overflow-hidden shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-video overflow-hidden">
                        <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-black/70 text-emerald-400 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                          {meal.protein}g Proteína
                        </span>
                      </div>
                      <div className="p-4 space-y-1.5">
                        <h4 className="font-bold text-white text-sm line-clamp-1">{meal.name}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2">{meal.description}</p>
                      </div>
                    </div>
                    <div className="p-4 pt-0">
                      <button
                        onClick={() => {
                          setSelectedMealModal(meal);
                        }}
                        className="w-full py-2 bg-white/5 hover:bg-emerald-600 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-white/10 transition-colors cursor-pointer"
                      >
                        Ver Detalhes Nutricionais
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= VIEW 2: SELECT PLAN (MEMBERSHIP) ================= */}
        {currentView === "select_plan" && (
          <div className="max-w-5xl mx-auto space-y-10 animate-fade-in text-center">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase font-black tracking-widest block">ASSINATURA SEMANAL</span>
              <h1 className="text-3xl md:text-5xl font-black text-white mt-1">Escolha o Plano Ideal para Você</h1>
              <p className="text-xs md:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
                Mude de plano, pule semanas ou cancele a qualquer momento sem taxas de cancelamento.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PLANS.map((plan) => {
                const isSelected = selectedPlan.id === plan.id;
                const totalWeekly = plan.mealsCount * plan.pricePerMeal;

                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`bg-[#12151E] rounded-3xl p-6 border transition-all cursor-pointer flex flex-col justify-between text-left relative ${
                      isSelected
                        ? "border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)] bg-gradient-to-b from-emerald-950/40 to-[#12151E]"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full shadow">
                        Mais Escolhido
                      </span>
                    )}

                    {plan.bestValue && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-400 text-black text-[10px] font-black uppercase px-3 py-1 rounded-full shadow">
                        Melhor Custo
                      </span>
                    )}

                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-white">{plan.mealsCount} Refeições</span>
                        <span className="text-xs font-bold text-slate-400">/ semana</span>
                      </div>

                      <div>
                        <span className="text-3xl font-black text-emerald-400">
                          R$ {plan.pricePerMeal.toFixed(2).replace(".", ",")}
                        </span>
                        <span className="text-xs text-slate-400 block font-medium">por prato individual</span>
                      </div>

                      <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300">
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span>Total: <strong>R$ {totalWeekly.toFixed(2).replace(".", ",")}</strong>/sem</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span>Frete Grátis na 1ª Entrega</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span>Acesso ilimitado ao cardápio</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span>Pausar ou cancelar com 1 clique</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlan(plan);
                        setCurrentView("choose_meals");
                      }}
                      className={`w-full mt-6 py-3 rounded-xl font-black text-xs transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg"
                          : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                    >
                      {isSelected ? "Plano Selecionado →" : "Escolher Este Plano"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= VIEW 3: CHOOSE MEALS (MEAL SELECTOR) ================= */}
        {currentView === "choose_meals" && (
          <div className="space-y-8 animate-fade-in text-left">
            
            {/* STICKY SELECTION SUMMARY BAR */}
            <div className="sticky top-16 z-30 bg-[#12151E]/95 backdrop-blur-xl border border-emerald-500/40 p-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-black block">PLANO ATIVO</span>
                  <span className="text-sm font-extrabold text-white">{selectedPlan.mealsCount} Refeições por Semana</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-black block">SELECIONADOS</span>
                  <span className={`text-sm font-extrabold font-mono ${totalSelectedCount === selectedPlan.mealsCount ? "text-emerald-400" : "text-amber-400"}`}>
                    {totalSelectedCount} / {selectedPlan.mealsCount} pratos
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  onClick={() => setCurrentView("select_plan")}
                  className="px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs rounded-xl border border-white/10 cursor-pointer"
                >
                  Mudar Plano
                </button>

                <button
                  onClick={() => {
                    if (totalSelectedCount < selectedPlan.mealsCount) {
                      showToast(`Por favor, selecione mais ${selectedPlan.mealsCount - totalSelectedCount} prato(s) para completar seu plano.`);
                      return;
                    }
                    setCurrentView("cart");
                  }}
                  className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center space-x-2 ${
                    totalSelectedCount === selectedPlan.mealsCount
                      ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                      : "bg-slate-700 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <span>Avançar para o Carrinho</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* CATEGORY FILTER CHIPS */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: "all", label: "Todos os Pratos" },
                { id: "chef_specials", label: "Chef Specials" },
                { id: "high_protein", label: "High Protein (>40g)" },
                { id: "keto", label: "Keto / Low Carb" },
                { id: "calorie_smart", label: "Calorie Smart (<500kcal)" },
                { id: "veggie", label: "Vegetariano / Vegano" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-emerald-600 text-white shadow-md border border-emerald-400"
                      : "bg-[#12151E] text-slate-300 hover:bg-white/10 border border-white/5"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* MEALS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMeals.map((meal) => {
                const countInCart = selectedMealCounts[meal.id] || 0;

                return (
                  <div key={meal.id} className="bg-[#12151E] rounded-2xl border border-white/10 overflow-hidden shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-video overflow-hidden bg-black/50">
                        <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#12151E] via-transparent to-black/30" />
                        
                        <span className="absolute top-3 left-3 bg-black/70 text-emerald-300 text-[10px] font-black uppercase px-2.5 py-1 rounded-md border border-emerald-500/30">
                          {meal.calories} kcal • {meal.protein}g Prot
                        </span>

                        <button
                          onClick={() => setSelectedMealModal(meal)}
                          className="absolute bottom-3 right-3 p-2 bg-black/70 hover:bg-emerald-600 text-white rounded-xl transition-colors cursor-pointer"
                          title="Ver Detalhes do Prato"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="p-5 space-y-2">
                        <h3 className="font-extrabold text-white text-base leading-snug">{meal.name}</h3>
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{meal.description}</p>
                        
                        {/* MACRO SUMMARY MINI PILLS */}
                        <div className="flex items-center space-x-2 pt-2 text-[10px] font-mono text-slate-300">
                          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">Carb: {meal.carbs}g</span>
                          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">Gord: {meal.fats}g</span>
                          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">Peso: {meal.weight}g</span>
                        </div>
                      </div>
                    </div>

                    {/* ADD / REMOVE COUNTER */}
                    <div className="p-5 pt-0">
                      {countInCart === 0 ? (
                        <button
                          onClick={() => handleAddMeal(meal.id)}
                          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-lg"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Adicionar à Minha Semana</span>
                        </button>
                      ) : (
                        <div className="flex items-center justify-between bg-emerald-950/60 border border-emerald-500/50 p-1.5 rounded-xl">
                          <button
                            onClick={() => handleRemoveMeal(meal.id)}
                            className="p-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          
                          <span className="font-mono font-black text-sm text-emerald-300">
                            {countInCart} {countInCart === 1 ? "refeição" : "refeições"}
                          </span>

                          <button
                            onClick={() => handleAddMeal(meal.id)}
                            className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= VIEW 4: CART & CHECKOUT (STRIPE SIMULATOR) ================= */}
        {currentView === "cart" && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in text-left">
            <div>
              <h1 className="text-3xl font-black text-white flex items-center space-x-3">
                <ShoppingBag className="h-8 w-8 text-emerald-400" />
                <span>Resumo da sua Assinatura Semanal</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Revise suas refeições e conclua o pagamento seguro para iniciar suas entregas.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* CHOSEN MEALS LIST */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-[#12151E] p-6 rounded-2xl border border-white/10 space-y-4">
                  <h3 className="font-extrabold text-white text-sm border-b border-white/10 pb-3 flex items-center justify-between">
                    <span>Refeições Selecionadas ({totalSelectedCount})</span>
                    <button
                      onClick={() => setCurrentView("choose_meals")}
                      className="text-emerald-400 hover:underline text-xs font-bold cursor-pointer"
                    >
                      Alterar Pratos
                    </button>
                  </h3>

                  {Object.entries(selectedMealCounts).map(([mId, qty]) => {
                    const meal = mealsList.find((m) => m.id === mId);
                    if (!meal || qty === 0) return null;

                    return (
                      <div key={mId} className="flex items-center justify-between py-2 border-b border-white/5">
                        <div className="flex items-center space-x-3">
                          <img src={meal.image} alt={meal.name} className="w-12 h-12 rounded-lg object-cover" />
                          <div>
                            <h4 className="font-bold text-white text-xs">{meal.name}</h4>
                            <span className="text-[10px] text-slate-400">{meal.calories} kcal • {meal.protein}g Prot</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                            x{qty}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* DELIVERY ADDRESS FORM */}
                <div className="bg-[#12151E] p-6 rounded-2xl border border-white/10 space-y-4">
                  <h3 className="font-extrabold text-white text-sm border-b border-white/10 pb-3 flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-emerald-400" />
                    <span>Endereço de Entrega das Marmitas</span>
                  </h3>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1 font-bold">Rua / Avenida</label>
                      <input
                        type="text"
                        value={userAccount.street}
                        onChange={(e) => setUserAccount({ ...userAccount, street: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1 font-bold">Número & Apto</label>
                      <input
                        type="text"
                        value={`${userAccount.number} - ${userAccount.apartment}`}
                        onChange={(e) => setUserAccount({ ...userAccount, number: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1 font-bold">Bairro & Cidade</label>
                      <input
                        type="text"
                        value={`${userAccount.neighborhood}, ${userAccount.city}`}
                        onChange={(e) => setUserAccount({ ...userAccount, city: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1 font-bold">Instruções para o Entregador</label>
                      <input
                        type="text"
                        value={userAccount.deliveryPreference}
                        onChange={(e) => setUserAccount({ ...userAccount, deliveryPreference: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* PAYMENT & TOTAL BILLING */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-[#12151E] p-6 rounded-2xl border border-emerald-500/30 space-y-4 shadow-2xl">
                  <h3 className="font-extrabold text-white text-base border-b border-white/10 pb-3 flex items-center justify-between">
                    <span>Resumo Financeiro</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">Cobrança Semanal</span>
                  </h3>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span>Plano ({selectedPlan.mealsCount} refeições)</span>
                      <span className="font-mono">R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                    </div>

                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Desconto Primeira Compra (15%)</span>
                      <span className="font-mono">- R$ {discountValue.toFixed(2).replace(".", ",")}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Frete Refrigerado Express</span>
                      <span className="font-mono text-emerald-400 font-bold">GRÁTIS</span>
                    </div>

                    <div className="border-t border-white/10 pt-3 flex justify-between items-center text-sm font-black text-white">
                      <span>Total Semanal</span>
                      <span className="text-xl font-mono text-emerald-400">
                        R$ {grandTotal.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </div>

                  {/* STRIPE PAYMENT SIMULATOR BUTTONS */}
                  <div className="space-y-3 pt-3">
                    <button
                      onClick={() => {
                        showToast("Pagamento Aprovado via Stripe! Assinatura ativada com sucesso.");
                        setCurrentView("customer_dashboard");
                      }}
                      className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs rounded-xl transition-all cursor-pointer shadow-lg flex items-center justify-center space-x-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Pagar com Cartão via Stripe</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                      <button
                        onClick={() => {
                          showToast("Apple Pay Autorizado com Sucesso!");
                          setCurrentView("customer_dashboard");
                        }}
                        className="py-2.5 bg-black hover:bg-slate-900 text-white rounded-xl border border-white/20 transition-colors cursor-pointer"
                      >
                         Apple Pay
                      </button>

                      <button
                        onClick={() => {
                          showToast("Google Pay Autorizado com Sucesso!");
                          setCurrentView("customer_dashboard");
                        }}
                        className="py-2.5 bg-white text-black hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                      >
                        G Pay
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-1.5 text-[10px] text-slate-400 pt-2">
                    <Lock className="h-3 w-3 text-emerald-400" />
                    <span>Encriptação SSL 256-bit • Cancele quando quiser</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= VIEW 5: CUSTOMER DASHBOARD ================= */}
        {currentView === "customer_dashboard" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div>
              <h1 className="text-3xl font-black text-white flex items-center space-x-3">
                <User className="h-8 w-8 text-emerald-400" />
                <span>Minha Área do Cliente</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Gerencie sua assinatura ativa, acompanhe entregas em tempo real e altere preferências.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* SUBSCRIPTION STATUS CARD */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-[#12151E] p-6 rounded-3xl border border-emerald-500/40 shadow-2xl space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-black block">STATUS DA ASSINATURA</span>
                      <h3 className="text-xl font-black text-white flex items-center space-x-2">
                        <span>Plano {selectedPlan.mealsCount} Refeições / Semana</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full uppercase">
                          Ativa
                        </span>
                      </h3>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => showToast("Assinatura pausada por 1 semana com sucesso.")}
                        className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        Pausar Assinatura
                      </button>

                      <button
                        onClick={() => setCurrentView("choose_meals")}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        Trocar Refeições
                      </button>
                    </div>
                  </div>

                  {/* LIVE DELIVERY TIMELINE TRACKER */}
                  <div className="space-y-4">
                    <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
                      Acompanhamento do Próximo Pedido (#ORD-9821)
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                      {[
                        { step: "Confirmado", done: true },
                        { step: "Em Produção", done: true, current: true },
                        { step: "A Caminho", done: false },
                        { step: "Entregue", done: false },
                      ].map((st, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                            st.current
                              ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 animate-pulse"
                              : st.done
                              ? "bg-white/5 border-emerald-500/30 text-white"
                              : "bg-black/40 border-white/5 text-slate-500"
                          }`}
                        >
                          <span className="block text-[10px] text-slate-400 font-mono">Passo 0{i + 1}</span>
                          <span>{st.step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ACTIVE MEALS LIST */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-xs font-bold text-slate-300 block">Pratos Selecionados para esta Semana:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {Object.entries(selectedMealCounts).map(([mId, qty]) => {
                        const m = mealsList.find((item) => item.id === mId);
                        if (!m) return null;
                        return (
                          <div key={mId} className="bg-black/40 p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                            <span className="text-white font-semibold">{m.name}</span>
                            <span className="font-mono text-emerald-400 font-black">x{qty}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* SIDEBAR DETAILS */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-[#12151E] p-6 rounded-3xl border border-white/10 space-y-4">
                  <h3 className="font-extrabold text-white text-sm border-b border-white/10 pb-3">
                    Dados da Conta & Pagamento
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Cliente:</span>
                      <span className="text-white font-bold">{userAccount.name}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">E-mail / Telefone:</span>
                      <span className="text-white font-bold">{userAccount.email} • {userAccount.phone}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[10px]">Cartão de Crédito Cadastrado:</span>
                      <span className="text-white font-bold flex items-center space-x-2 mt-0.5">
                        <CreditCard className="h-4 w-4 text-emerald-400" />
                        <span>•••• •••• •••• {userAccount.cardLast4}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= VIEW 6: KITCHEN PRODUCTION PANEL ================= */}
        {currentView === "kitchen_panel" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-amber-950/40 border border-amber-500/40 p-6 rounded-3xl">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-amber-300 flex items-center space-x-3">
                  <ChefHat className="h-8 w-8 text-amber-400" />
                  <span>Painel de Preparo & Cozinha</span>
                </h1>
                <p className="text-xs text-amber-200/80 mt-1">
                  Visão consolidada de marmitas a produzir para o lote de entregas de hoje.
                </p>
              </div>

              <button
                onClick={() => showToast("Etiquetas térmicas enviadas para a impressora da cozinha!")}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <FileText className="h-4 w-4" />
                <span>Imprimir Etiquetas do Lote</span>
              </button>
            </div>

            {/* MEALS PRODUCTION TOTALS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { name: "Filet Mignon & Dijon", count: 142, icon: ChefHat },
                { name: "Salmão Grelhado", count: 98, icon: ChefHat },
                { name: "BBQ Chicken Bowl", count: 112, icon: ChefHat },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#12151E] p-6 rounded-2xl border border-white/10 space-y-2">
                  <span className="text-xs text-slate-400 font-bold block">{item.name}</span>
                  <span className="text-3xl font-black text-amber-400 font-mono">{item.count} un.</span>
                  <span className="text-[10px] text-emerald-400 block font-semibold">✓ Ingredientes separados</span>
                </div>
              ))}
            </div>

            {/* ORDERS QUEUE IN KITCHEN */}
            <div className="bg-[#12151E] rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-4 bg-black/40 border-b border-white/10 font-bold text-xs text-white">
                Fila de Pedidos para Montagem
              </div>

              <div className="divide-y divide-white/10 text-xs">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-black text-amber-400">{ord.id}</span>
                        <span className="font-bold text-white">{ord.customerName}</span>
                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded font-mono">{ord.mealsCount} pratos</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{ord.address}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setOrders(orders.map(o => o.id === ord.id ? { ...o, status: "pronto" } : o));
                          showToast(`Pedido ${ord.id} marcado como PRONTO para expedição!`);
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        Marcar como Pronto
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 7: DRIVER DISPATCH PANEL ================= */}
        {currentView === "driver_panel" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div className="bg-teal-950/40 border border-teal-500/40 p-6 rounded-3xl">
              <h1 className="text-2xl md:text-3xl font-black text-teal-300 flex items-center space-x-3">
                <Truck className="h-8 w-8 text-teal-400" />
                <span>Painel do Entregador / Motorista</span>
              </h1>
              <p className="text-xs text-teal-200/80 mt-1">
                Rota otimizada para entrega das bolsas térmicas com confirmação fotográfica.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* ROUTE LIST */}
              <div className="lg:col-span-8 space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="bg-[#12151E] p-6 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <span className="text-xs font-mono font-black text-teal-400">{ord.id}</span>
                        <h4 className="font-extrabold text-white text-sm">{ord.customerName}</h4>
                      </div>
                      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md ${
                        ord.status === "entregue" ? "bg-emerald-500/20 text-emerald-300" : "bg-teal-500/20 text-teal-300"
                      }`}>
                        {ord.status.replace("_", " ")}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-300">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-teal-400 shrink-0" />
                        <span>{ord.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-teal-400 shrink-0" />
                        <span>{ord.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2 border-t border-white/10">
                      <button
                        onClick={() => {
                          setOrders(orders.map(o => o.id === ord.id ? { ...o, status: "entregue" } : o));
                          showToast(`Entrega do pedido ${ord.id} confirmada com foto!`);
                        }}
                        className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5"
                      >
                        <Camera className="h-4 w-4" />
                        <span>Confirmar Entrega com Foto</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* MAP SIMULATION */}
              <div className="lg:col-span-4 bg-[#12151E] p-6 rounded-2xl border border-white/10 text-center space-y-4">
                <h3 className="font-bold text-white text-sm">Mapa da Rota em Tempo Real</h3>
                <div className="aspect-square bg-slate-900 rounded-xl overflow-hidden relative flex items-center justify-center border border-white/10">
                  <Navigation className="h-12 w-12 text-teal-400 animate-bounce" />
                  <span className="absolute bottom-3 text-[10px] font-mono text-slate-400">GPS Ativo • Rota Otimizada</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= VIEW 8: ADMIN MASTER PANEL ================= */}
        {currentView === "admin_panel" && (
          <div className="space-y-8 animate-fade-in text-left">
            <div>
              <h1 className="text-3xl font-black text-white flex items-center space-x-3">
                <BarChart3 className="h-8 w-8 text-emerald-400" />
                <span>Painel Administrativo FreshPrep</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Gestão completa de vendas, assinantes ativos, cardápio semanal e relatórios de ROI.
              </p>
            </div>

            {/* METRICS DASHBOARD CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#12151E] p-5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">FATURAMENTO MENSAL</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">R$ 184.290</span>
                <span className="text-[10px] text-emerald-400 font-semibold block">+18% este mês</span>
              </div>

              <div className="bg-[#12151E] p-5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">ASSINANTES ATIVOS</span>
                <span className="text-2xl font-black text-amber-400 font-mono">1.240</span>
                <span className="text-[10px] text-slate-400 font-semibold block">Churn: 2.1%</span>
              </div>

              <div className="bg-[#12151E] p-5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">TICKET MÉDIO</span>
                <span className="text-2xl font-black text-teal-400 font-mono">R$ 318,50</span>
                <span className="text-[10px] text-slate-400 font-semibold block">9.8 pratos / pedido</span>
              </div>

              <div className="bg-[#12151E] p-5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">LTV / CAC</span>
                <span className="text-2xl font-black text-purple-400 font-mono">4.2x</span>
                <span className="text-[10px] text-purple-300 font-semibold block">CAC: R$ 42,00</span>
              </div>
            </div>

            {/* CREATE NEW MEAL FORM FOR ADMIN */}
            <div className="bg-[#12151E] p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-extrabold text-white text-base border-b border-white/10 pb-3 flex items-center space-x-2">
                <Plus className="h-5 w-5 text-emerald-400" />
                <span>Cadastrar Nova Refeição no Cardápio</span>
              </h3>

              <form onSubmit={handleAdminAddMeal} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1 font-bold">Nome da Refeição</label>
                  <input
                    type="text"
                    placeholder="Ex: Picanha ao Alho & Arroz Biológico"
                    value={newMealName}
                    onChange={(e) => setNewMealName(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-bold">Categoria</label>
                  <select
                    value={newMealCategory}
                    onChange={(e) => setNewMealCategory(e.target.value as any)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="chef_specials">Chef Specials</option>
                    <option value="high_protein">High Protein</option>
                    <option value="keto">Keto / Low Carb</option>
                    <option value="calorie_smart">Calorie Smart</option>
                    <option value="veggie">Vegetariano</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-bold">URL da Imagem</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={newMealImage}
                    onChange={(e) => setNewMealImage(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl cursor-pointer"
                  >
                    Salvar Prato no Sistema
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* DISH DETAIL MODAL */}
      {selectedMealModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12151E] border border-white/10 rounded-3xl max-w-lg w-full p-6 space-y-4 relative shadow-2xl animate-scale-in text-left">
            <button
              onClick={() => setSelectedMealModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/5 rounded-full cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="aspect-video rounded-2xl overflow-hidden">
              <img src={selectedMealModal.image} alt={selectedMealModal.name} className="w-full h-full object-cover" />
            </div>

            <div>
              <h3 className="font-black text-white text-lg">{selectedMealModal.name}</h3>
              <p className="text-xs text-slate-300 mt-1">{selectedMealModal.description}</p>
            </div>

            <div className="bg-black/40 p-4 rounded-xl space-y-2 border border-white/5 text-xs">
              <span className="font-extrabold text-white block">Tabela Nutricional (por porção de {selectedMealModal.weight}g):</span>
              <div className="grid grid-cols-4 gap-2 text-center font-mono">
                <div className="bg-white/5 p-2 rounded">
                  <span className="block text-[10px] text-slate-400">Calorias</span>
                  <span className="font-bold text-amber-400">{selectedMealModal.calories} kcal</span>
                </div>
                <div className="bg-white/5 p-2 rounded">
                  <span className="block text-[10px] text-slate-400">Proteína</span>
                  <span className="font-bold text-emerald-400">{selectedMealModal.protein}g</span>
                </div>
                <div className="bg-white/5 p-2 rounded">
                  <span className="block text-[10px] text-slate-400">Carbos</span>
                  <span className="font-bold text-teal-400">{selectedMealModal.carbs}g</span>
                </div>
                <div className="bg-white/5 p-2 rounded">
                  <span className="block text-[10px] text-slate-400">Gorduras</span>
                  <span className="font-bold text-purple-400">{selectedMealModal.fats}g</span>
                </div>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <span className="text-slate-400 font-bold block">Ingredientes Completo:</span>
              <p className="text-slate-300 leading-relaxed text-[11px]">{selectedMealModal.ingredients}</p>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#090A0E] border-t border-white/10 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-black text-lg">
              <ChefHat className="h-5 w-5 text-emerald-400" />
              <span>FRESHPREP</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Plataforma de marmitas gourmet e congeladas no modelo de assinatura mensal e semanal estilo Factor e CookUnity.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase">Planos</h4>
            <ul className="space-y-1 text-[11px]">
              <li className="hover:text-emerald-400 cursor-pointer">6 Refeições / sem</li>
              <li className="hover:text-emerald-400 cursor-pointer">10 Refeições / sem</li>
              <li className="hover:text-emerald-400 cursor-pointer">12 Refeições / sem</li>
              <li className="hover:text-emerald-400 cursor-pointer">20 Refeições / sem</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase">Qualidade & Segurança</h4>
            <div className="flex items-center space-x-2 text-emerald-400 font-bold">
              <ShieldCheck className="h-4 w-4" />
              <span>Inspeção Federal ANVISA</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-400 font-bold">
              <Lock className="h-4 w-4" />
              <span>Stripe Payments Encrypted</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase">Atendimento</h4>
            <p className="text-[11px]">WhatsApp: (11) 98888-7777</p>
            <p className="text-[11px]">Email: contato@freshprep.com.br</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 pt-6 border-t border-white/5 text-center text-[10px] text-slate-500">
          © 2026 FreshPrep Meal Club. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
