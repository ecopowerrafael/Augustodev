import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  DollarSign,
  Clock,
  Navigation,
  Fuel,
  Plus,
  Trash2,
  Check,
  X,
  ChevronRight,
  ShieldCheck,
  BarChart3,
  PieChart,
  Activity,
  Sparkles,
  TrendingDown,
  AlertTriangle,
  ArrowLeft,
  Smartphone,
  Info,
  Calendar,
  Layers,
  MapPin,
  Car
} from "lucide-react";

// Interfaces
interface Ride {
  id: string;
  timestamp: string;
  platform: "Uber" | "99" | "Indrive";
  category: "UberX" | "UberComfort" | "99Pop" | "99Comfort" | "Indrive";
  distance: number; // in km
  duration: number; // in minutes
  grossEarnings: number; // in R$
  destination: string;
}

interface Expense {
  id: string;
  timestamp: string;
  category: "Combustível" | "Alimentação" | "Manutenção" | "Internet" | "Taxas / Financiamento" | "Outros";
  amount: number; // in R$
  description: string;
}

export default function LiraDriverPro({ onBack }: { onBack: () => void }) {
  // Mobile frame simulator toggle
  const [isMobilePreview, setIsMobilePreview] = useState(true);

  // Core navigation tabs
  const [activeTab, setActiveTab] = useState<"dashboard" | "rides_expenses" | "reports" | "goals">("dashboard");

  // Core Data States
  const [dailyGoal, setDailyGoal] = useState<number>(300);
  const [fuelPrice, setFuelPrice] = useState<number>(5.69); // R$/L
  const [carConsumption, setCarConsumption] = useState<number>(10.5); // km/L

  // Mock initial rides list
  const [rides, setRides] = useState<Ride[]>([
    { id: "r-1", timestamp: "07:30", platform: "Uber", category: "UberX", distance: 12.5, duration: 24, grossEarnings: 28.50, destination: "Aeroporto de Congonhas" },
    { id: "r-2", timestamp: "08:15", platform: "Uber", category: "UberComfort", distance: 18.2, duration: 35, grossEarnings: 46.20, destination: "Av. Paulista, 1000" },
    { id: "r-3", timestamp: "09:10", platform: "99", category: "99Pop", distance: 6.4, duration: 15, grossEarnings: 14.80, destination: "Shopping Ibirapuera" },
    { id: "r-4", timestamp: "10:30", platform: "Indrive", category: "Indrive", distance: 14.0, duration: 28, grossEarnings: 32.00, destination: "Vila Madalena" },
    { id: "r-5", timestamp: "12:00", platform: "99", category: "99Comfort", distance: 22.1, duration: 45, grossEarnings: 58.90, destination: "Berrini, Zona Sul" }
  ]);

  // Mock initial expenses list
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "e-1", timestamp: "07:00", category: "Combustível", amount: 120.00, description: "Abastecimento Álcool Posto Shell" },
    { id: "e-2", timestamp: "12:45", category: "Alimentação", amount: 28.50, description: "Almoço PF no Prato Cheio" },
    { id: "e-3", timestamp: "15:00", category: "Internet", amount: 15.00, description: "Recarga de dados plano Claro" }
  ]);

  // Active Journey Simulator State
  const [isJourneyActive, setIsJourneyActive] = useState(false);
  const [journeySeconds, setJourneySeconds] = useState(0);
  const [journeyDistance, setJourneyDistance] = useState(0); // in km
  const [journeyEarnings, setJourneyEarnings] = useState(0); // in R$
  const [simulatedPlatform, setSimulatedPlatform] = useState<"Uber" | "99" | "Indrive">("Uber");
  const [simulatedCategory, setSimulatedCategory] = useState<string>("UberX");
  const [notification, setNotification] = useState<string | null>(null);

  // Forms states
  const [newRide, setNewRide] = useState({
    platform: "Uber" as "Uber" | "99" | "Indrive",
    category: "UberX" as "UberX" | "UberComfort" | "99Pop" | "99Comfort" | "Indrive",
    distance: "",
    duration: "",
    grossEarnings: "",
    destination: ""
  });

  const [newExpense, setNewExpense] = useState({
    category: "Combustível" as "Combustível" | "Alimentação" | "Manutenção" | "Internet" | "Taxas / Financiamento" | "Outros",
    amount: "",
    description: ""
  });

  // Simulated ride tick effect
  useEffect(() => {
    let interval: any = null;
    if (isJourneyActive) {
      interval = setInterval(() => {
        setJourneySeconds(prev => prev + 1);
        
        // Every 8 simulated seconds, add a bit of distance and earnings representing driving
        setJourneyDistance(prev => Number((prev + 0.15).toFixed(2)));
        setJourneyEarnings(prev => Number((prev + 0.38).toFixed(2)));

        // Every 30 seconds, simulate receiving a high-value ride offer!
        if (journeySeconds > 0 && journeySeconds % 30 === 0) {
          const platforms: ("Uber" | "99" | "Indrive")[] = ["Uber", "99", "Indrive"];
          const selectedPlat = platforms[Math.floor(Math.random() * platforms.length)];
          const comfortNames = selectedPlat === "Uber" ? "UberComfort" : selectedPlat === "99" ? "99Comfort" : "Indrive";
          const randomEarning = Math.floor(Math.random() * 35) + 15;
          const randomDistance = Number((randomEarning / 2.2).toFixed(1));

          setNotification(`🔥 Nova Corrida Oferecida! ${selectedPlat} (${comfortNames}) de R$ ${randomEarning.toFixed(2)} para ${randomDistance}km. Toque para aceitar!`);
          
          // Auto-fade notification
          setTimeout(() => {
            setNotification(null);
          }, 8000);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isJourneyActive, journeySeconds]);

  // Formatted journey time display
  const journeyTimeFormatted = useMemo(() => {
    const hrs = Math.floor(journeySeconds / 3600);
    const mins = Math.floor((journeySeconds % 3600) / 60);
    const secs = journeySeconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, [journeySeconds]);

  // Calculations
  const totalGrossEarnings = useMemo(() => {
    const completed = rides.reduce((acc, r) => acc + r.grossEarnings, 0);
    const active = isJourneyActive ? journeyEarnings : 0;
    return Number((completed + active).toFixed(2));
  }, [rides, isJourneyActive, journeyEarnings]);

  const totalExpenses = useMemo(() => {
    const logged = expenses.reduce((acc, e) => acc + e.amount, 0);
    // Calculated fuel expense if active
    const simulatedFuel = isJourneyActive ? ((journeyDistance / carConsumption) * fuelPrice) : 0;
    return Number((logged + simulatedFuel).toFixed(2));
  }, [expenses, isJourneyActive, journeyDistance, carConsumption, fuelPrice]);

  const netEarnings = useMemo(() => {
    return Number((totalGrossEarnings - totalExpenses).toFixed(2));
  }, [totalGrossEarnings, totalExpenses]);

  const totalDistanceKm = useMemo(() => {
    const completed = rides.reduce((acc, r) => acc + r.distance, 0);
    const active = isJourneyActive ? journeyDistance : 0;
    return Number((completed + active).toFixed(1));
  }, [rides, isJourneyActive, journeyDistance]);

  const totalHoursWorked = useMemo(() => {
    // Each mock completed run has a duration in minutes. Convert to hours
    const completedMinutes = rides.reduce((acc, r) => acc + r.duration, 0);
    const activeHours = isJourneyActive ? (journeySeconds / 3600) : 0;
    return Number(((completedMinutes / 60) + activeHours).toFixed(2));
  }, [rides, isJourneyActive, journeySeconds]);

  // Key metrics requested: Earnings per Hour & Earnings per KM
  const earningsPerHour = useMemo(() => {
    if (totalHoursWorked === 0) return 0;
    return Number((totalGrossEarnings / totalHoursWorked).toFixed(2));
  }, [totalGrossEarnings, totalHoursWorked]);

  const earningsPerKm = useMemo(() => {
    if (totalDistanceKm === 0) return 0;
    return Number((totalGrossEarnings / totalDistanceKm).toFixed(2));
  }, [totalGrossEarnings, totalDistanceKm]);

  // Cost per KM driven
  const costPerKm = useMemo(() => {
    if (totalDistanceKm === 0) return 0;
    return Number((totalExpenses / totalDistanceKm).toFixed(2));
  }, [totalExpenses, totalDistanceKm]);

  // Goal percentage
  const goalProgressPercentage = useMemo(() => {
    const pct = (totalGrossEarnings / dailyGoal) * 100;
    return Math.min(100, Math.max(0, Number(pct.toFixed(0))));
  }, [totalGrossEarnings, dailyGoal]);

  // Action: toggle journey
  const handleToggleJourney = () => {
    if (isJourneyActive) {
      // Finalize and save
      if (journeyEarnings > 0) {
        const newSimulatedRide: Ride = {
          id: `r-sim-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
          platform: simulatedPlatform,
          category: simulatedCategory as any,
          distance: journeyDistance,
          duration: Math.ceil(journeySeconds / 60),
          grossEarnings: journeyEarnings,
          destination: "Corrida Simulada em Tempo Real"
        };
        setRides(prev => [newSimulatedRide, ...prev]);
      }
      setIsJourneyActive(false);
      setJourneySeconds(0);
      setJourneyDistance(0);
      setJourneyEarnings(0);
    } else {
      setIsJourneyActive(true);
      setJourneySeconds(0);
      setJourneyDistance(0);
      setJourneyEarnings(0);
    }
  };

  // Action: Accept offer from notification
  const handleAcceptSimulatedOffer = () => {
    if (!notification) return;
    // Extract values from notification text
    // "🔥 Nova Corrida Oferecida! Uber (UberComfort) de R$ 45.00 para 20.4km..."
    const matchEarnings = notification.match(/R\$\s*([0-9.]+)/);
    const matchDistance = notification.match(/para\s*([0-9.]+)\s*km/);
    
    const offerEarnings = matchEarnings ? parseFloat(matchEarnings[1]) : 25;
    const offerDistance = matchDistance ? parseFloat(matchDistance[1]) : 10;
    
    setJourneyEarnings(prev => Number((prev + offerEarnings).toFixed(2)));
    setJourneyDistance(prev => Number((prev + offerDistance).toFixed(2)));
    
    // Add toast confirmation
    setNotification(`✅ Corrida aceita com sucesso! +R$ ${offerEarnings.toFixed(2)} acumulados.`);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Action: add ride manually
  const handleAddRideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRide.distance || !newRide.duration || !newRide.grossEarnings) return;

    const rideToAdd: Ride = {
      id: `r-man-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      platform: newRide.platform,
      category: newRide.category,
      distance: Number(newRide.distance),
      duration: Number(newRide.duration),
      grossEarnings: Number(newRide.grossEarnings),
      destination: newRide.destination || "Destino não informado"
    };

    setRides(prev => [rideToAdd, ...prev]);
    setNewRide({
      platform: "Uber",
      category: "UberX",
      distance: "",
      duration: "",
      grossEarnings: "",
      destination: ""
    });
  };

  // Action: add expense manually
  const handleAddExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.amount) return;

    const expenseToAdd: Expense = {
      id: `e-man-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      category: newExpense.category,
      amount: Number(newExpense.amount),
      description: newExpense.description || "Despesa manual sem descrição"
    };

    setExpenses(prev => [expenseToAdd, ...prev]);
    setNewExpense({
      category: "Combustível",
      amount: "",
      description: ""
    });
  };

  // Action: delete a ride
  const handleDeleteRide = (id: string) => {
    setRides(prev => prev.filter(r => r.id !== id));
  };

  // Action: delete an expense
  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  // Analytics helper - Platform splits
  const platformStats = useMemo(() => {
    const stats = { Uber: 0, 99: 0, Indrive: 0 };
    rides.forEach(r => {
      stats[r.platform] += r.grossEarnings;
    });
    if (isJourneyActive) {
      stats[simulatedPlatform] += journeyEarnings;
    }
    const total = Object.values(stats).reduce((a, b) => a + b, 0);
    return {
      stats,
      percentages: {
        Uber: total > 0 ? (stats.Uber / total) * 100 : 0,
        99: total > 0 ? (stats["99"] / total) * 100 : 0,
        Indrive: total > 0 ? (stats.Indrive / total) * 100 : 0
      }
    };
  }, [rides, isJourneyActive, journeyEarnings, simulatedPlatform]);

  // Analytics helper - Expense splits
  const expenseStats = useMemo(() => {
    const stats: Record<string, number> = {
      Combustível: 0,
      Alimentação: 0,
      Manutenção: 0,
      Internet: 0,
      "Taxas / Financiamento": 0,
      Outros: 0
    };
    expenses.forEach(e => {
      stats[e.category] = (stats[e.category] || 0) + e.amount;
    });
    if (isJourneyActive) {
      const simulatedFuel = ((journeyDistance / carConsumption) * fuelPrice);
      stats.Combustível += simulatedFuel;
    }
    return stats;
  }, [expenses, isJourneyActive, journeyDistance, carConsumption, fuelPrice]);

  return (
    <div className="min-h-screen bg-[#070B13] text-stone-100 flex flex-col font-sans relative antialiased selection:bg-[#00FF41]/30 selection:text-[#00FF41]">
      
      {/* Visual background lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00FF41]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Dynamic Floating Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            onClick={notification.includes("Oferecida") ? handleAcceptSimulatedOffer : undefined}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-[250] max-w-md w-[90%] p-4 rounded-2xl shadow-2xl border backdrop-blur-md cursor-pointer transition text-left ${
              notification.includes("✅")
                ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-300"
                : "bg-indigo-950/95 border-indigo-500/50 text-stone-100 hover:border-indigo-400"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`h-2 w-2 rounded-full shrink-0 ${notification.includes("✅") ? "bg-emerald-400" : "bg-indigo-400 animate-ping"}`} />
              <p className="text-xs font-sans leading-relaxed font-bold">{notification}</p>
            </div>
            {notification.includes("Oferecida") && (
              <span className="block text-[8px] font-mono text-indigo-300 font-black uppercase text-right mt-1 tracking-widest">
                CLIQUE AQUI PARA ACEITAR CORRIDA
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP HEADER */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-md py-4 px-4 sm:px-8 shrink-0 relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-xs font-mono text-stone-400 hover:text-white uppercase tracking-wider bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl transition border border-white/5 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao Portfólio</span>
          </button>

          <div className="flex items-center space-x-3 text-right">
            <div>
              <div className="flex items-center space-x-1.5 justify-end">
                <span className="h-2 w-2 rounded-full bg-[#00FF41] animate-pulse" />
                <span className="font-sans font-black text-sm text-white tracking-widest uppercase">LIRA DRIVER PRO</span>
              </div>
              <span className="font-mono text-[9px] text-[#00FF41] font-bold block uppercase tracking-wider">
                MÓDULO DE INTELIGÊNCIA FINANCEIRA
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-start relative z-20">
        
        {/* UPPER INFO PANEL WITH SCREEN LAYOUT TOGGLE */}
        <div className="w-full mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 text-left bg-stone-900/40 border border-white/5 p-5 rounded-2xl">
          <div className="space-y-1">
            <h1 className="font-serif font-black text-xl sm:text-2xl text-white">
              Lira Driver Pro <span className="text-[#00FF41]">Cockpit</span>
            </h1>
            <p className="font-sans text-xs text-stone-400">
              Desenho técnico focado em rentabilidade operacional diária de motoristas profissionais da Uber, 99 e InDrive.
            </p>
          </div>

          {/* Selector view */}
          <div className="flex items-center space-x-2 bg-black/60 p-1.5 border border-white/5 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setIsMobilePreview(true)}
              className={`px-3 py-1.5 rounded-lg font-mono text-[9px] font-bold uppercase transition flex items-center space-x-1.5 cursor-pointer ${
                isMobilePreview ? "bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/20" : "text-stone-400 hover:text-white"
              }`}
            >
              <Smartphone className="h-3 w-3" />
              <span>Simulador Celular</span>
            </button>
            <button
              onClick={() => setIsMobilePreview(false)}
              className={`px-3 py-1.5 rounded-lg font-mono text-[9px] font-bold uppercase transition flex items-center space-x-1.5 cursor-pointer ${
                !isMobilePreview ? "bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/20" : "text-stone-400 hover:text-white"
              }`}
            >
              <Layers className="h-3 w-3" />
              <span>Tela Cheia</span>
            </button>
          </div>
        </div>

        {/* DUAL WORKSPACE: INTERACTIVE PREVIEW */}
        <div className="w-full flex items-center justify-center">
          
          {/* OPTION 1: PHONE FRAME SIMULATOR */}
          <AnimatePresence mode="wait">
            {isMobilePreview ? (
              <motion.div
                key="phone-simulator"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="relative w-full max-w-[410px] aspect-[9/19.5] bg-black rounded-[52px] p-3.5 border-[6px] border-stone-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between"
                style={{ contentVisibility: "auto" }}
              >
                {/* Phone Speaker & Camera Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center space-x-2">
                  <div className="w-12 h-1 bg-stone-800 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-stone-900 rounded-full border border-stone-800" />
                </div>

                {/* Phone Status Bar */}
                <div className="pt-7 px-5 pb-2 shrink-0 flex items-center justify-between text-stone-400 font-mono text-[10px] uppercase font-bold tracking-wider relative z-40 bg-[#070b13]">
                  <span>15:30 // LIRA</span>
                  <div className="flex items-center space-x-1.5 text-[#00FF41]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00FF41] animate-ping" />
                    <span>GPS FIX</span>
                  </div>
                </div>

                {/* PHONE SCREEN INTERNAL BODY (SCROLLABLE CONTENT) */}
                <div className="flex-1 overflow-y-auto px-4 py-3 bg-[#070B13] scrollbar-none flex flex-col text-left space-y-4">
                  {/* APP TITLE / BRAND HUD */}
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <span className="font-mono text-[8px] text-[#00FF41] font-bold block tracking-wider uppercase">LIRA DRIVER PRO</span>
                      <h2 className="font-serif font-black text-lg text-white">Consola de Bordo</h2>
                    </div>
                    <div className="bg-stone-900/80 px-2.5 py-1 rounded-lg border border-white/10 flex items-center space-x-1 font-mono text-[9px] text-[#00FF41] font-bold uppercase">
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>ONLINE</span>
                    </div>
                  </div>

                  {/* SUBNAVIGATION TAB BAR INSIDE MOBILE */}
                  <div className="grid grid-cols-4 gap-1 bg-black/60 p-1 border border-white/5 rounded-xl shrink-0">
                    {[
                      { id: "dashboard", label: "Painel", icon: Activity },
                      { id: "rides_expenses", label: "Lanç.", icon: Plus },
                      { id: "reports", label: "Relat.", icon: BarChart3 },
                      { id: "goals", label: "Metas", icon: Sparkles }
                    ].map(tab => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`py-2 rounded-lg flex flex-col items-center justify-center space-y-1 transition cursor-pointer ${
                            isActive ? "bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/20" : "text-stone-400 hover:text-stone-200"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span className="font-mono text-[8px] font-bold uppercase tracking-wide">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* ACTIVE APP VIEWPORT */}
                  <div className="flex-1 flex flex-col space-y-4 pb-4">
                    {/* VIEW 1: DASHBOARD */}
                    {activeTab === "dashboard" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        {/* JOURNAL JOURNEY CONTROL CARD */}
                        <div className="bg-gradient-to-br from-stone-900 to-[#0e1624] border border-white/5 rounded-2xl p-4 space-y-3 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-[#00FF41]/5 rounded-full blur-xl" />
                          
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[8px] text-stone-400 font-bold uppercase tracking-wider">JORNADA EM TEMPO REAL</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${isJourneyActive ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 animate-pulse" : "bg-stone-800 text-stone-400"}`}>
                              {isJourneyActive ? "ATIVA" : "DESLIGADA"}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-left">
                            <div className="bg-black/40 border border-white/5 p-2.5 rounded-xl">
                              <span className="text-[8px] font-mono text-stone-500 block font-bold uppercase">TEMPO ATIVO</span>
                              <span className="font-mono font-black text-white text-sm block mt-0.5">{isJourneyActive ? journeyTimeFormatted : "00:00:00"}</span>
                            </div>
                            <div className="bg-black/40 border border-white/5 p-2.5 rounded-xl">
                              <span className="text-[8px] font-mono text-stone-500 block font-bold uppercase">GANHOS ATIVOS</span>
                              <span className="font-sans font-black text-[#00FF41] text-sm block mt-0.5">R$ {isJourneyActive ? journeyEarnings.toFixed(2) : "0,00"}</span>
                            </div>
                          </div>

                          <button
                            onClick={handleToggleJourney}
                            className={`w-full py-2.5 rounded-xl font-mono text-[10px] font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer ${
                              isJourneyActive 
                                ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-950/20" 
                                : "bg-[#00FF41] hover:bg-[#00ee3b] text-black shadow-[#00FF41]/20"
                            }`}
                          >
                            <Car className="h-4 w-4" />
                            <span>{isJourneyActive ? "Finalizar Jornada" : "Iniciar Jornada"}</span>
                          </button>
                        </div>

                        {/* HOURLY & MILEAGE METRICS */}
                        <div className="grid grid-cols-2 gap-3 text-left">
                          <div className="bg-stone-900/60 border border-white/5 p-3 rounded-2xl space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <Clock className="h-3.5 w-3.5 text-[#00FF41]" />
                              <span className="text-[8px] font-mono text-stone-400 font-bold uppercase tracking-wider">R$ por Hora</span>
                            </div>
                            <span className="font-sans font-black text-lg text-white block">
                              R$ {earningsPerHour.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            <span className="text-[7px] font-mono text-stone-500 block uppercase font-bold">Média do Faturamento</span>
                          </div>

                          <div className="bg-stone-900/60 border border-white/5 p-3 rounded-2xl space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <Navigation className="h-3.5 w-3.5 text-[#00FF41]" />
                              <span className="text-[8px] font-mono text-stone-400 font-bold uppercase tracking-wider">R$ por KM</span>
                            </div>
                            <span className="font-sans font-black text-lg text-white block">
                              R$ {earningsPerKm.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            <span className="text-[7px] font-mono text-stone-500 block uppercase font-bold">Média por Distância</span>
                          </div>
                        </div>

                        {/* GOAL RING RADIAL COMPONENT */}
                        <div className="bg-stone-900/60 border border-white/5 p-4 rounded-2xl flex items-center justify-between gap-3 text-left relative overflow-hidden">
                          <div className="space-y-1 flex-1">
                            <span className="text-[8px] font-mono text-stone-500 font-bold uppercase tracking-wider block">META DIÁRIA</span>
                            <h4 className="font-serif font-black text-stone-200 text-sm">Faturamento Diário</h4>
                            <div className="flex items-baseline space-x-1.5">
                              <span className="font-sans font-black text-white text-base">R$ {totalGrossEarnings.toFixed(2)}</span>
                              <span className="font-mono text-[9px] text-stone-400">/ R$ {dailyGoal}</span>
                            </div>
                            <p className="text-[8px] font-sans text-stone-400">
                              {goalProgressPercentage >= 100 ? "🎉 Meta diária concluída! Excelente trabalho!" : `Faltam R$ ${(dailyGoal - totalGrossEarnings).toFixed(2)} para bater a meta.`}
                            </p>
                          </div>

                          {/* SVG Radial Gauge */}
                          <div className="relative h-16 w-16 shrink-0 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="32" cy="32" r="26" stroke="#1d1e22" strokeWidth="4.5" fill="transparent" />
                              <circle 
                                cx="32" cy="32" r="26" 
                                stroke="#00FF41" strokeWidth="4.5" fill="transparent"
                                strokeDasharray={2 * Math.PI * 26}
                                strokeDashoffset={2 * Math.PI * 26 * (1 - goalProgressPercentage / 100)}
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="absolute font-mono text-[10px] font-black text-white">{goalProgressPercentage}%</span>
                          </div>
                        </div>

                        {/* NET EARNINGS & COSTS HIGHLIGHT */}
                        <div className="bg-black/60 border border-white/5 rounded-2xl p-4 space-y-3">
                          <div className="flex items-center justify-between border-b border-white/5 pb-2">
                            <span className="text-[8px] font-mono text-stone-400 font-bold uppercase tracking-wider">RESUMO FINANCEIRO</span>
                            <span className="text-[8px] font-mono text-amber-500 font-bold uppercase tracking-wider">LÍQUIDO REAL</span>
                          </div>
                          
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between items-center text-stone-400">
                              <span>Total Faturado Bruto</span>
                              <span className="font-mono font-black text-white">R$ {totalGrossEarnings.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-stone-400">
                              <span>Custos Diários Totais</span>
                              <span className="font-mono font-black text-rose-500">-R$ {totalExpenses.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-white/5 pt-2 flex justify-between items-center text-sm font-bold">
                              <span className="text-stone-300">Lucro Líquido Real</span>
                              <span className="font-sans font-black text-[#00FF41]">R$ {netEarnings.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        {/* FUEL CALCULATOR */}
                        <div className="bg-stone-900/60 border border-white/5 rounded-2xl p-4 space-y-3">
                          <span className="text-[8px] font-mono text-stone-500 font-bold uppercase tracking-wider block">CONFIGURAÇÕES VEÍCULO</span>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[7px] font-mono text-stone-400 font-bold uppercase block">Preço Combustível</label>
                              <div className="relative">
                                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono text-stone-500">R$</span>
                                <input
                                  type="number"
                                  step="0.01"
                                  value={fuelPrice}
                                  onChange={e => setFuelPrice(Number(e.target.value))}
                                  className="w-full pl-7 pr-2 py-1 bg-black/50 border border-white/10 rounded-lg text-[10px] text-white focus:outline-none focus:border-[#00FF41]"
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[7px] font-mono text-stone-400 font-bold uppercase block">Consumo Médio</label>
                              <div className="relative">
                                <input
                                  type="number"
                                  step="0.1"
                                  value={carConsumption}
                                  onChange={e => setCarConsumption(Number(e.target.value))}
                                  className="w-full pl-2.5 pr-10 py-1 bg-black/50 border border-white/10 rounded-lg text-[10px] text-white focus:outline-none focus:border-[#00FF41]"
                                />
                                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[7px] font-mono text-stone-500 font-bold">KM/L</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-[8px] font-sans text-stone-400 leading-relaxed bg-black/20 p-2 rounded-lg flex items-center space-x-1.5">
                            <Info className="h-3 w-3 text-[#00FF41] shrink-0" />
                            <span>Custo estimado por KM rodado: <strong>R$ {costPerKm.toFixed(2)}/km</strong></span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* VIEW 2: ADD RIDES & EXPENSES */}
                    {activeTab === "rides_expenses" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        {/* MANUALLY LOG EARNINGS FORM */}
                        <div className="bg-stone-900/60 border border-white/5 rounded-2xl p-4 space-y-3">
                          <span className="text-[8px] font-mono text-[#00FF41] font-bold uppercase tracking-wider block">LANÇAR NOVA CORRIDA</span>
                          <form onSubmit={handleAddRideSubmit} className="space-y-2.5">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <label className="text-[7px] font-mono text-stone-400 font-bold block uppercase">Plataforma</label>
                                <select
                                  value={newRide.platform}
                                  onChange={e => {
                                    const plat = e.target.value as any;
                                    setNewRide({ ...newRide, platform: plat, category: plat === "Uber" ? "UberX" : plat === "99" ? "99Pop" : "Indrive" });
                                  }}
                                  className="w-full px-2 py-1 bg-black/40 border border-white/10 rounded-lg text-[10px] text-white focus:outline-none focus:border-[#00FF41]"
                                >
                                  <option value="Uber">Uber</option>
                                  <option value="99">99</option>
                                  <option value="Indrive">Indrive</option>
                                </select>
                              </div>
                              <div className="space-y-1">
                                <label className="text-[7px] font-mono text-stone-400 font-bold block uppercase">Categoria</label>
                                <select
                                  value={newRide.category}
                                  onChange={e => setNewRide({ ...newRide, category: e.target.value as any })}
                                  className="w-full px-2 py-1 bg-black/40 border border-white/10 rounded-lg text-[10px] text-white focus:outline-none focus:border-[#00FF41]"
                                >
                                  {newRide.platform === "Uber" ? (
                                    <>
                                      <option value="UberX">UberX</option>
                                      <option value="UberComfort">UberComfort</option>
                                    </>
                                  ) : newRide.platform === "99" ? (
                                    <>
                                      <option value="99Pop">99Pop</option>
                                      <option value="99Comfort">99Comfort</option>
                                    </>
                                  ) : (
                                    <option value="Indrive">Indrive</option>
                                  )}
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                              <div className="space-y-1">
                                <label className="text-[7px] font-mono text-stone-400 font-bold block uppercase">KM Rodado</label>
                                <input
                                  type="number"
                                  step="0.1"
                                  required
                                  placeholder="Ex: 8.5"
                                  value={newRide.distance}
                                  onChange={e => setNewRide({ ...newRide, distance: e.target.value })}
                                  className="w-full px-2 py-1 bg-black/40 border border-white/10 rounded-lg text-[10px] text-white focus:outline-none focus:border-[#00FF41]"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[7px] font-mono text-stone-400 font-bold block uppercase">Minutos</label>
                                <input
                                  type="number"
                                  required
                                  placeholder="Ex: 15"
                                  value={newRide.duration}
                                  onChange={e => setNewRide({ ...newRide, duration: e.target.value })}
                                  className="w-full px-2 py-1 bg-black/40 border border-white/10 rounded-lg text-[10px] text-white focus:outline-none focus:border-[#00FF41]"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[7px] font-mono text-stone-400 font-bold block uppercase">Valor R$</label>
                                <input
                                  type="number"
                                  step="0.01"
                                  required
                                  placeholder="Ex: 18"
                                  value={newRide.grossEarnings}
                                  onChange={e => setNewRide({ ...newRide, grossEarnings: e.target.value })}
                                  className="w-full px-2 py-1 bg-black/40 border border-white/10 rounded-lg text-[10px] text-white focus:outline-none focus:border-[#00FF41]"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[7px] font-mono text-stone-400 font-bold block uppercase">Destino (Opcional)</label>
                              <input
                                type="text"
                                placeholder="Ex: Av. Faria Lima"
                                value={newRide.destination}
                                onChange={e => setNewRide({ ...newRide, destination: e.target.value })}
                                className="w-full px-2.5 py-1 bg-black/40 border border-white/10 rounded-lg text-[10px] text-stone-200 focus:outline-none focus:border-[#00FF41]"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider transition-all"
                            >
                              Registrar Corrida
                            </button>
                          </form>
                        </div>

                        {/* MANUALLY LOG EXPENSE FORM */}
                        <div className="bg-stone-900/60 border border-white/5 rounded-2xl p-4 space-y-3">
                          <span className="text-[8px] font-mono text-rose-500 font-bold uppercase tracking-wider block">LANÇAR NOVA DESPESA</span>
                          <form onSubmit={handleAddExpenseSubmit} className="space-y-2.5">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-1">
                                <label className="text-[7px] font-mono text-stone-400 font-bold block uppercase">Categoria</label>
                                <select
                                  value={newExpense.category}
                                  onChange={e => setNewExpense({ ...newExpense, category: e.target.value as any })}
                                  className="w-full px-2 py-1 bg-black/40 border border-white/10 rounded-lg text-[10px] text-white focus:outline-none focus:border-[#00FF41]"
                                >
                                  <option value="Combustível">Combustível</option>
                                  <option value="Alimentação">Alimentação</option>
                                  <option value="Manutenção">Manutenção</option>
                                  <option value="Internet">Internet</option>
                                  <option value="Taxas / Financiamento">Financiamento / Taxas</option>
                                  <option value="Outros">Outros</option>
                                </select>
                              </div>
                              <div className="space-y-1">
                                <label className="text-[7px] font-mono text-stone-400 font-bold block uppercase">Valor R$</label>
                                <input
                                  type="number"
                                  step="0.01"
                                  required
                                  placeholder="Ex: 35.00"
                                  value={newExpense.amount}
                                  onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
                                  className="w-full px-2 py-1 bg-black/40 border border-white/10 rounded-lg text-[10px] text-white focus:outline-none focus:border-[#00FF41]"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[7px] font-mono text-stone-400 font-bold block uppercase">Descrição</label>
                              <input
                                type="text"
                                required
                                placeholder="Ex: Pastel + Caldo de cana"
                                value={newExpense.description}
                                onChange={e => setNewExpense({ ...newExpense, description: e.target.value })}
                                className="w-full px-2.5 py-1 bg-black/40 border border-white/10 rounded-lg text-[10px] text-stone-200 focus:outline-none focus:border-[#00FF41]"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider transition-all animate-pulse"
                            >
                              Registrar Despesa
                            </button>
                          </form>
                        </div>

                        {/* LISTS OF LATEST RIDES & EXPENSES TOGETHER */}
                        <div className="space-y-2">
                          <span className="text-[8px] font-mono text-stone-400 font-bold uppercase tracking-wider block">LOG DE ATIVIDADES DIÁRIA</span>
                          <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                            {rides.map(ride => (
                              <div key={ride.id} className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <div className="flex items-center space-x-1.5">
                                    <span className="font-mono text-[8px] text-stone-400">{ride.timestamp}</span>
                                    <span className="font-mono text-[8px] text-emerald-400 font-bold uppercase">{ride.platform} ({ride.category})</span>
                                  </div>
                                  <span className="font-sans text-[10px] text-white block truncate max-w-[150px]">{ride.destination}</span>
                                  <span className="font-mono text-[8px] text-stone-500 block font-bold uppercase">
                                    {ride.distance}km • {ride.duration}min • R$ {(ride.grossEarnings / ride.distance).toFixed(2)}/km
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-sans font-black text-[#00FF41] text-xs">R$ {ride.grossEarnings.toFixed(2)}</span>
                                  <button onClick={() => handleDeleteRide(ride.id)} className="text-stone-500 hover:text-rose-500 p-1 rounded transition">
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            ))}

                            {expenses.map(expense => (
                              <div key={expense.id} className="p-3 bg-rose-950/20 border border-rose-900/10 rounded-xl flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <div className="flex items-center space-x-1.5">
                                    <span className="font-mono text-[8px] text-stone-500">{expense.timestamp}</span>
                                    <span className="font-mono text-[8px] text-rose-400 font-bold uppercase">{expense.category}</span>
                                  </div>
                                  <span className="font-sans text-[10px] text-stone-300 block truncate max-w-[150px]">{expense.description}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-mono font-bold text-rose-400 text-xs">-R$ {expense.amount.toFixed(2)}</span>
                                  <button onClick={() => handleDeleteExpense(expense.id)} className="text-stone-500 hover:text-rose-500 p-1 rounded transition">
                                    <Trash2 className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* VIEW 3: REPORTS & INSIGHTS */}
                    {activeTab === "reports" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        {/* CHART 1: PLATFORM SHARE (SVG DOUGHNUT PREVIEW) */}
                        <div className="bg-stone-900/60 border border-white/5 rounded-2xl p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] font-mono text-stone-400 font-bold uppercase tracking-wider">FATURAMENTO POR PLATAFORMA</span>
                            <PieChart className="h-3.5 w-3.5 text-[#00FF41]" />
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            {/* Beautiful hand-drawn SVG semi-doughnut */}
                            <div className="relative h-20 w-20 shrink-0 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                                <circle cx="16" cy="16" r="12" stroke="#1c1e22" strokeWidth="4" fill="transparent" />
                                
                                {/* Uber Arc */}
                                <circle 
                                  cx="16" cy="16" r="12" 
                                  stroke="#000000" strokeWidth="4" fill="transparent"
                                  strokeDasharray={2 * Math.PI * 12}
                                  strokeDashoffset={2 * Math.PI * 12 * (1 - platformStats.percentages.Uber / 100)}
                                />
                                {/* 99 Arc */}
                                <circle 
                                  cx="16" cy="16" r="12" 
                                  stroke="#FF9F0A" strokeWidth="4" fill="transparent"
                                  strokeDasharray={2 * Math.PI * 12}
                                  strokeDashoffset={2 * Math.PI * 12 * (1 - (platformStats.percentages.Uber + platformStats.percentages["99"]) / 100)}
                                  className="origin-center"
                                />
                                {/* Indrive Arc */}
                                <circle 
                                  cx="16" cy="16" r="12" 
                                  stroke="#00FF41" strokeWidth="4" fill="transparent"
                                  strokeDasharray={2 * Math.PI * 12}
                                  strokeDashoffset={2 * Math.PI * 12 * (1 - (platformStats.percentages.Uber + platformStats.percentages["99"] + platformStats.percentages.Indrive) / 100)}
                                  className="origin-center"
                                />
                              </svg>
                              <div className="absolute flex flex-col items-center">
                                <span className="font-mono text-[9px] text-stone-400 font-bold">TOTAL</span>
                                <span className="font-sans font-black text-white text-[10px]">R$ {totalGrossEarnings.toFixed(0)}</span>
                              </div>
                            </div>

                            <div className="flex-1 space-y-1.5 text-[9px] font-mono">
                              <div className="flex justify-between items-center text-stone-300">
                                <span className="flex items-center space-x-1">
                                  <span className="h-1.5 w-1.5 bg-black border border-white/20 rounded-full" />
                                  <span>Uber</span>
                                </span>
                                <span className="font-bold">R$ {platformStats.stats.Uber.toFixed(0)} ({platformStats.percentages.Uber.toFixed(0)}%)</span>
                              </div>
                              <div className="flex justify-between items-center text-stone-300">
                                <span className="flex items-center space-x-1">
                                  <span className="h-1.5 w-1.5 bg-amber-500 rounded-full" />
                                  <span>99 App</span>
                                </span>
                                <span className="font-bold">R$ {platformStats.stats["99"].toFixed(0)} ({platformStats.percentages["99"].toFixed(0)}%)</span>
                              </div>
                              <div className="flex justify-between items-center text-stone-300">
                                <span className="flex items-center space-x-1">
                                  <span className="h-1.5 w-1.5 bg-[#00FF41] rounded-full" />
                                  <span>InDrive</span>
                                </span>
                                <span className="font-bold">R$ {platformStats.stats.Indrive.toFixed(0)} ({platformStats.percentages.Indrive.toFixed(0)}%)</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CHART 2: EXPENSES DISTRIBUTION */}
                        <div className="bg-stone-900/60 border border-white/5 rounded-2xl p-4 space-y-3">
                          <span className="text-[8px] font-mono text-stone-400 font-bold uppercase tracking-wider block">DISTRIBUIÇÃO DE DESPESAS</span>
                          <div className="space-y-2">
                            {Object.entries(expenseStats).map(([cat, rawVal]) => {
                              const val = rawVal as number;
                              const pct = totalExpenses > 0 ? (val / totalExpenses) * 100 : 0;
                              if (val === 0) return null;
                              return (
                                <div key={cat} className="space-y-1">
                                  <div className="flex justify-between text-[9px] font-mono text-stone-400">
                                    <span>{cat}</span>
                                    <span>R$ {val.toFixed(2)} ({pct.toFixed(0)}%)</span>
                                  </div>
                                  <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full ${cat === "Combustível" ? "bg-amber-500" : "bg-rose-500"}`}
                                      style={{ width: `${pct}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* WEEKLY EARNINGS HISTOGRAM PREVIEW */}
                        <div className="bg-stone-900/60 border border-white/5 rounded-2xl p-4 space-y-3">
                          <span className="text-[8px] font-mono text-stone-400 font-bold uppercase tracking-wider block">FATURAMENTO SEMANAL ESTIMADO</span>
                          <div className="flex items-end justify-between h-20 pt-4 px-2">
                            {[
                              { day: "Seg", val: 180 },
                              { day: "Ter", val: 240 },
                              { day: "Qua", val: 310 },
                              { day: "Qui", val: 290 },
                              { day: "Sex", val: 450 },
                              { day: "Sab", val: 390 },
                              { day: "Dom", val: 150 }
                            ].map(item => {
                              const barHeightPct = (item.val / 450) * 100;
                              return (
                                <div key={item.day} className="flex flex-col items-center space-y-1.5 flex-1">
                                  <div className="relative w-2.5 h-12 bg-black/60 rounded-t-sm flex items-end">
                                    <div 
                                      className="w-full bg-[#00FF41] rounded-t-sm"
                                      style={{ height: `${barHeightPct}%` }}
                                    />
                                  </div>
                                  <span className="font-mono text-[7px] text-stone-500 font-bold block uppercase">{item.day}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* COGNITIVE SMART OPERATIONAL INSIGHT */}
                        <div className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/15 p-4 rounded-2xl space-y-1 text-left">
                          <div className="flex items-center space-x-1.5 text-amber-500">
                            <Sparkles className="h-4 w-4 shrink-0" />
                            <span className="text-[9px] font-mono font-bold uppercase tracking-widest">INSIGHT INTELIGENTE</span>
                          </div>
                          <p className="font-sans text-[10px] text-amber-200/90 leading-relaxed">
                            Sua principal despesa hoje é <strong>Combustível ({(totalExpenses > 0 ? ((expenseStats.Combustível / totalExpenses) * 100) : 0).toFixed(0)}%)</strong>. Rodando no álcool a R$ {fuelPrice}/L, cada hora trabalhada custa aproximadamente <strong>R$ {((earningsPerHour > 0 ? (totalExpenses / totalHoursWorked) : 0)).toFixed(2)}</strong> operacionais. Prefira horários de pico dinâmico!
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* VIEW 4: DAILY GOALS ASSISTANT */}
                    {activeTab === "goals" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        {/* UPDATE GOAL CARD */}
                        <div className="bg-stone-900/60 border border-white/5 rounded-2xl p-4 space-y-3">
                          <span className="text-[8px] font-mono text-stone-400 font-bold uppercase tracking-wider block">PLANEJAMENTO DE METAS</span>
                          <div className="space-y-2">
                            <label className="text-[8px] font-mono text-stone-300 font-bold uppercase block">Meta Bruta Diária (R$)</label>
                            <div className="flex space-x-2">
                              <input
                                type="number"
                                min="50"
                                value={dailyGoal}
                                onChange={e => setDailyGoal(Number(e.target.value))}
                                className="flex-1 px-3 py-2 bg-black/60 border border-white/10 rounded-xl text-xs text-white font-sans focus:outline-none focus:border-[#00FF41]"
                              />
                              <button 
                                onClick={() => setNotification("✅ Nova meta diária atualizada no sistema Lira Driver Pro.")}
                                className="px-4 bg-[#00FF41] text-black rounded-xl font-mono text-[9px] font-black uppercase cursor-pointer"
                              >
                                Aplicar
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* COGNITIVE METRICS COMPANION */}
                        <div className="bg-stone-900/60 border border-white/5 rounded-2xl p-4 space-y-4 text-left">
                          <span className="text-[8px] font-mono text-stone-400 font-bold uppercase tracking-wider block">COMO ALCANÇAR A META</span>
                          
                          <div className="space-y-3 text-xs font-sans">
                            <div className="flex items-start space-x-2.5">
                              <div className="p-1 bg-[#00FF41]/10 rounded-lg text-[#00FF41]">
                                <Clock className="h-4 w-4" />
                              </div>
                              <div>
                                <h5 className="font-bold text-white text-[11px]">Tempo Restante Necessário</h5>
                                <p className="text-[10px] text-stone-400 mt-0.5 leading-relaxed">
                                  Com seu faturamento médio de <strong>R$ {earningsPerHour.toFixed(2)}/h</strong>, você precisa de mais <strong>{earningsPerHour > 0 ? ((dailyGoal - totalGrossEarnings) / earningsPerHour).toFixed(1) : "0.0"} horas</strong> de jornada ativa para atingir os R$ {dailyGoal}.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start space-x-2.5">
                              <div className="p-1 bg-[#00FF41]/10 rounded-lg text-[#00FF41]">
                                <Navigation className="h-4 w-4" />
                              </div>
                              <div>
                                <h5 className="font-bold text-white text-[11px]">KM Necessários para Meta</h5>
                                <p className="text-[10px] text-stone-400 mt-0.5 leading-relaxed">
                                  Baseado em sua taxa média de <strong>R$ {earningsPerKm.toFixed(2)}/km</strong>, seu carro precisará rodar aproximadamente mais <strong>{earningsPerKm > 0 ? ((dailyGoal - totalGrossEarnings) / earningsPerKm).toFixed(0) : "0"} km</strong> na rua.
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start space-x-2.5">
                              <div className="p-1 bg-amber-500/10 rounded-lg text-amber-500">
                                <AlertTriangle className="h-4 w-4" />
                              </div>
                              <div>
                                <h5 className="font-bold text-white text-[11px]">Margem de Despesas Prevista</h5>
                                <p className="text-[10px] text-stone-400 mt-0.5 leading-relaxed">
                                  Para faturar a meta bruta de R$ {dailyGoal}, você terá uma despesa aproximada de <strong>R$ {(((dailyGoal - totalGrossEarnings) * (totalExpenses / (totalGrossEarnings || 1)))).toFixed(2)}</strong> em combustível e desgaste do veículo.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* PRO TIPS BANNER */}
                        <div className="bg-gradient-to-r from-[#00FF41]/10 to-transparent border-l-2 border-[#00FF41] p-4 rounded-r-2xl text-left space-y-1">
                          <span className="text-[8px] font-mono text-[#00FF41] font-bold block uppercase tracking-widest">DICA DE PERFORMANCE LIRA</span>
                          <p className="text-[10px] font-sans text-stone-300 leading-relaxed">
                            Sexta-feira entre 17h e 20h é o horário com maior incidência de multiplicadores dinâmicos na sua região de Congonhas. Planeje sua pausa de almoço para estender a jornada na noite!
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Simulated Home Indicator bar */}
                <div className="pb-2 pt-1 flex justify-center shrink-0 z-40 bg-[#070b13]">
                  <div className="w-28 h-1 bg-stone-700 rounded-full" />
                </div>
              </motion.div>
            ) : (
              /* OPTION 2: FULL WIDESCREEN GRID FOR DESKTOP ANALYSIS */
              <motion.div
                key="fullscreen-workspace"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 text-left"
                style={{ contentVisibility: "auto" }}
              >
                
                {/* Left side: Navigation sidebar & Real-time active simulation */}
                <div className="lg:col-span-4 space-y-6">
                  {/* SIMULATOR CARD */}
                  <div className="bg-gradient-to-b from-[#0e1624] to-stone-900 border border-white/10 rounded-3xl p-6 space-y-5 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF41]/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <div>
                        <span className="font-mono text-[9px] text-[#00FF41] font-bold uppercase block tracking-widest">JORNADA ATIVA SIMULADOR</span>
                        <h3 className="font-serif font-black text-white text-base">Controle de Bordo</h3>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase flex items-center space-x-1 ${isJourneyActive ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" : "bg-stone-800 text-stone-400"}`}>
                        {isJourneyActive && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping mr-1" />}
                        <span>{isJourneyActive ? "Ativo" : "Desligado"}</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-black/40 border border-white/5 p-3.5 rounded-2xl space-y-1">
                        <span className="text-[9px] font-mono text-stone-500 block font-bold uppercase">Tempo de Direção</span>
                        <span className="font-mono font-black text-white text-xl block">{isJourneyActive ? journeyTimeFormatted : "00:00:00"}</span>
                      </div>
                      <div className="bg-black/40 border border-white/5 p-3.5 rounded-2xl space-y-1">
                        <span className="text-[9px] font-mono text-stone-500 block font-bold uppercase">KM Percorridos</span>
                        <span className="font-mono font-black text-white text-xl block">{isJourneyActive ? `${journeyDistance} km` : "0,0 km"}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-black/40 border border-white/5 p-3.5 rounded-2xl space-y-1">
                        <span className="text-[9px] font-mono text-stone-500 block font-bold uppercase">Valor Bruto Faturado</span>
                        <span className="font-sans font-black text-[#00FF41] text-xl block">R$ {isJourneyActive ? journeyEarnings.toFixed(2) : "0,00"}</span>
                      </div>
                      <div className="bg-rose-950/20 border border-rose-900/10 p-3.5 rounded-2xl space-y-1">
                        <span className="text-[9px] font-mono text-rose-400/70 block font-bold uppercase">Consumo Estimado (Comb)</span>
                        <span className="font-mono font-bold text-rose-400 text-lg block">
                          R$ {isJourneyActive ? ((journeyDistance / carConsumption) * fuelPrice).toFixed(2) : "0,00"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <div className="flex-1 space-y-1">
                          <label className="text-[8px] font-mono text-stone-400 font-bold uppercase block">Plataforma</label>
                          <select
                            disabled={isJourneyActive}
                            value={simulatedPlatform}
                            onChange={e => setSimulatedPlatform(e.target.value as any)}
                            className="w-full px-3 py-2 bg-black border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00FF41] cursor-pointer"
                          >
                            <option value="Uber">Uber</option>
                            <option value="99">99</option>
                            <option value="Indrive">Indrive</option>
                          </select>
                        </div>
                        <div className="flex-1 space-y-1">
                          <label className="text-[8px] font-mono text-stone-400 font-bold uppercase block">Categoria</label>
                          <select
                            disabled={isJourneyActive}
                            value={simulatedCategory}
                            onChange={e => setSimulatedCategory(e.target.value)}
                            className="w-full px-3 py-2 bg-black border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00FF41] cursor-pointer"
                          >
                            {simulatedPlatform === "Uber" ? (
                              <>
                                <option value="UberX">UberX</option>
                                <option value="UberComfort">UberComfort</option>
                              </>
                            ) : simulatedPlatform === "99" ? (
                              <>
                                <option value="99Pop">99Pop</option>
                                <option value="99Comfort">99Comfort</option>
                              </>
                            ) : (
                              <option value="Indrive">Indrive</option>
                            )}
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={handleToggleJourney}
                        className={`w-full py-3 rounded-2xl font-mono text-[11px] font-black uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer ${
                          isJourneyActive 
                            ? "bg-rose-600 hover:bg-rose-700 text-white" 
                            : "bg-[#00FF41] hover:bg-[#00ee3b] text-black shadow-[0_4px_12px_rgba(0,255,65,0.25)]"
                        }`}
                      >
                        <Car className="h-4 w-4" />
                        <span>{isJourneyActive ? "Encerrar e Computar Corrida" : "Iniciar Jornada Ativa (GPS)"}</span>
                      </button>
                    </div>
                  </div>

                  {/* COGNITIVE GOALS SELECTOR FOR FULL SCREEN */}
                  <div className="bg-stone-900/40 border border-white/5 rounded-3xl p-6 space-y-4">
                    <span className="font-mono text-[9px] text-[#00FF41] font-bold block uppercase tracking-widest">METAS OPERACIONAIS</span>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-sans text-stone-300">Meta de Faturamento Diária</span>
                        <span className="font-mono font-black text-white text-sm">R$ {dailyGoal}</span>
                      </div>
                      
                      {/* SVG Gauge */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-mono text-stone-400">
                          <span>Progresso da Meta</span>
                          <span>{goalProgressPercentage}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-black rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#00FF41] rounded-full transition-all duration-500"
                            style={{ width: `${goalProgressPercentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <label className="text-[8px] font-mono text-stone-400 font-bold block uppercase mb-1">Ajustar Nova Meta Diária (R$)</label>
                        <input
                          type="range"
                          min="100"
                          max="800"
                          step="50"
                          value={dailyGoal}
                          onChange={e => setDailyGoal(Number(e.target.value))}
                          className="w-full accent-[#00FF41] bg-black rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side: 8-columns analytical visualizer */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* UPPER CORE METRICS STRIP */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="bg-stone-900/40 border border-white/5 p-4 rounded-2xl text-left">
                      <span className="text-[8px] font-mono text-stone-400 font-bold block uppercase tracking-widest mb-1">MÉDIA POR HORA</span>
                      <span className="font-sans font-black text-2xl text-[#00FF41] block">R$ {earningsPerHour.toFixed(2)}</span>
                      <span className="text-[8px] font-mono text-stone-500 block uppercase font-bold mt-1">Eficiência Temporal</span>
                    </div>

                    <div className="bg-stone-900/40 border border-white/5 p-4 rounded-2xl text-left">
                      <span className="text-[8px] font-mono text-stone-400 font-bold block uppercase tracking-widest mb-1">MÉDIA POR KM</span>
                      <span className="font-sans font-black text-2xl text-[#00FF41] block">R$ {earningsPerKm.toFixed(2)}</span>
                      <span className="text-[8px] font-mono text-stone-500 block uppercase font-bold mt-1">Rentabilidade de Pneu</span>
                    </div>

                    <div className="bg-stone-900/40 border border-white/5 p-4 rounded-2xl text-left">
                      <span className="text-[8px] font-mono text-stone-400 font-bold block uppercase tracking-widest mb-1">CUSTO POR KM</span>
                      <span className="font-sans font-black text-2xl text-rose-500 block">R$ {costPerKm.toFixed(2)}</span>
                      <span className="text-[8px] font-mono text-[#00FF41] block uppercase font-bold mt-1">R$ {(earningsPerKm - costPerKm).toFixed(2)} Líquido/km</span>
                    </div>

                    <div className="bg-stone-900/40 border border-white/5 p-4 rounded-2xl text-left">
                      <span className="text-[8px] font-mono text-stone-400 font-bold block uppercase tracking-widest mb-1">LUCRO REAL LÍQUIDO</span>
                      <span className="font-sans font-black text-2xl text-white block">R$ {netEarnings.toFixed(2)}</span>
                      <span className="text-[8px] font-mono text-stone-500 block uppercase font-bold mt-1">Subtraídas Despesas</span>
                    </div>
                  </div>

                  {/* REPORT SECTION INTEGRATED */}
                  <div className="bg-stone-900/20 border border-white/5 rounded-3xl p-6 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div>
                        <span className="font-mono text-[9px] text-[#00FF41] font-bold uppercase block tracking-widest">RELATÓRIOS SIMPLES DE ENTENDER</span>
                        <h3 className="font-serif font-black text-white text-lg">Visão Analítica de Operação</h3>
                      </div>
                      <div className="bg-black/40 px-3.5 py-1.5 rounded-xl border border-white/5 flex items-center space-x-1 font-mono text-[9px] text-stone-400">
                        <Calendar className="h-3.5 w-3.5 text-[#00FF41]" />
                        <span>HOJE, {new Date().toLocaleDateString("pt-BR")}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left graph: Platform Splits */}
                      <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
                        <h4 className="font-serif font-bold text-sm text-stone-200">Participação das Plataformas</h4>
                        
                        {/* Interactive custom bar chart */}
                        <div className="space-y-3">
                          {Object.entries(platformStats.stats).map(([plat, rawVal]) => {
                            const val = rawVal as number;
                            const pct = platformStats.percentages[plat as any] || 0;
                            return (
                              <div key={plat} className="space-y-1 text-xs">
                                <div className="flex justify-between font-mono text-[11px] text-stone-400">
                                  <span className="font-bold">{plat}</span>
                                  <span>R$ {val.toFixed(2)} ({pct.toFixed(0)}%)</span>
                                </div>
                                <div className="w-full h-3 bg-stone-900 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${plat === "Uber" ? "bg-stone-200" : plat === "99" ? "bg-amber-500" : "bg-[#00FF41]"}`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right graph: Expense Breakdown */}
                      <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
                        <h4 className="font-serif font-bold text-sm text-stone-200">Rateio de Custos Operacionais</h4>
                        
                        <div className="space-y-3">
                          {Object.entries(expenseStats).map(([cat, rawVal]) => {
                            const val = rawVal as number;
                            const pct = totalExpenses > 0 ? (val / totalExpenses) * 100 : 0;
                            if (val === 0) return null;
                            return (
                              <div key={cat} className="space-y-1 text-xs">
                                <div className="flex justify-between font-mono text-[11px] text-stone-400">
                                  <span className="font-bold">{cat}</span>
                                  <span>R$ {val.toFixed(2)} ({pct.toFixed(0)}%)</span>
                                </div>
                                <div className="w-full h-3 bg-stone-900 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${cat === "Combustível" ? "bg-amber-500 animate-pulse" : "bg-rose-500"}`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Weekly analytics SVG curves */}
                    <div className="bg-black/40 border border-white/5 p-5 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-bold text-sm text-stone-200">Comparativo Diário de Ganhos vs. Custos</h4>
                        <div className="flex items-center space-x-4 font-mono text-[9px] font-bold">
                          <span className="flex items-center space-x-1.5">
                            <span className="h-2 w-2 rounded-full bg-[#00FF41]" />
                            <span className="text-stone-300">Ganhos Brutos</span>
                          </span>
                          <span className="flex items-center space-x-1.5">
                            <span className="h-2 w-2 rounded-full bg-rose-500" />
                            <span className="text-stone-300">Despesas Totais</span>
                          </span>
                        </div>
                      </div>

                      {/* Custom SVG line-bar multi-indicator diagram */}
                      <div className="w-full h-40 relative">
                        <svg className="w-full h-full" viewBox="0 0 700 150">
                          {/* Grid Lines */}
                          <line x1="0" y1="20" x2="700" y2="20" stroke="#1c1e22" strokeDasharray="3" />
                          <line x1="0" y1="70" x2="700" y2="70" stroke="#1c1e22" strokeDasharray="3" />
                          <line x1="0" y1="120" x2="700" y2="120" stroke="#1c1e22" strokeDasharray="3" />

                          {/* Data points Seg, Ter, Qua, Qui, Sex, Sab, Dom */}
                          {/* Segment lines gains */}
                          <path 
                            d="M 50,110 L 150,90 L 250,60 L 350,70 L 450,20 L 550,40 L 650,120" 
                            fill="none" stroke="#00FF41" strokeWidth="3" strokeLinecap="round" 
                          />
                          {/* Segment lines expenses */}
                          <path 
                            d="M 50,135 L 150,130 L 250,120 L 350,125 L 450,95 L 550,110 L 650,140" 
                            fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeDasharray="4"
                          />

                          {/* Points overlay */}
                          <circle cx="50" cy="110" r="4" fill="#00FF41" />
                          <circle cx="150" cy="90" r="4" fill="#00FF41" />
                          <circle cx="250" cy="60" r="4" fill="#00FF41" />
                          <circle cx="350" cy="70" r="4" fill="#00FF41" />
                          <circle cx="450" cy="20" r="4" fill="#00FF41" />
                          <circle cx="550" cy="40" r="4" fill="#00FF41" />
                          <circle cx="650" cy="120" r="4" fill="#00FF41" />

                          {/* Labels */}
                          <text x="40" y="145" fill="#5c5d66" className="font-mono text-[9px] font-bold">SEG</text>
                          <text x="140" y="145" fill="#5c5d66" className="font-mono text-[9px] font-bold">TER</text>
                          <text x="240" y="145" fill="#5c5d66" className="font-mono text-[9px] font-bold">QUA</text>
                          <text x="340" y="145" fill="#5c5d66" className="font-mono text-[9px] font-bold">QUI</text>
                          <text x="440" y="145" fill="#5c5d66" className="font-mono text-[9px] font-bold">SEX</text>
                          <text x="540" y="145" fill="#5c5d66" className="font-mono text-[9px] font-bold">SAB</text>
                          <text x="640" y="145" fill="#5c5d66" className="font-mono text-[9px] font-bold">DOM</text>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* DOUBLE COLUMN ACTIONS DIALOG */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Add Run Form */}
                    <div className="bg-stone-900/40 border border-white/5 rounded-3xl p-6 space-y-4">
                      <span className="font-mono text-[9px] text-[#00FF41] font-bold block uppercase tracking-widest">Lançar Corrida Concluída</span>
                      <form onSubmit={handleAddRideSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-stone-400 font-bold uppercase block">Plataforma</label>
                            <select
                              value={newRide.platform}
                              onChange={e => {
                                const plat = e.target.value as any;
                                setNewRide({ ...newRide, platform: plat, category: plat === "Uber" ? "UberX" : plat === "99" ? "99Pop" : "Indrive" });
                              }}
                              className="w-full px-3 py-2 bg-black border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00FF41] cursor-pointer"
                            >
                              <option value="Uber">Uber</option>
                              <option value="99">99</option>
                              <option value="Indrive">Indrive</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-stone-400 font-bold uppercase block">Categoria</label>
                            <select
                              value={newRide.category}
                              onChange={e => setNewRide({ ...newRide, category: e.target.value as any })}
                              className="w-full px-3 py-2 bg-black border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00FF41] cursor-pointer"
                            >
                              {newRide.platform === "Uber" ? (
                                <>
                                  <option value="UberX">UberX</option>
                                  <option value="UberComfort">UberComfort</option>
                                </>
                              ) : newRide.platform === "99" ? (
                                <>
                                  <option value="99Pop">99Pop</option>
                                  <option value="99Comfort">99Comfort</option>
                                </>
                              ) : (
                                <option value="Indrive">Indrive</option>
                              )}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-stone-400 font-bold uppercase block">KM Rodados</label>
                            <input
                              type="number"
                              step="0.1"
                              required
                              placeholder="Ex: 10.4"
                              value={newRide.distance}
                              onChange={e => setNewRide({ ...newRide, distance: e.target.value })}
                              className="w-full px-3 py-2 bg-black border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-stone-400 font-bold uppercase block">Minutos</label>
                            <input
                              type="number"
                              required
                              placeholder="Ex: 22"
                              value={newRide.duration}
                              onChange={e => setNewRide({ ...newRide, duration: e.target.value })}
                              className="w-full px-3 py-2 bg-black border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-stone-400 font-bold uppercase block">Faturamento (R$)</label>
                            <input
                              type="number"
                              step="0.01"
                              required
                              placeholder="Ex: 32.50"
                              value={newRide.grossEarnings}
                              onChange={e => setNewRide({ ...newRide, grossEarnings: e.target.value })}
                              className="w-full px-3 py-2 bg-black border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-stone-400 font-bold uppercase block">Destino da Corrida</label>
                          <input
                            type="text"
                            placeholder="Ex: Aeroporto de Guarulhos"
                            value={newRide.destination}
                            onChange={e => setNewRide({ ...newRide, destination: e.target.value })}
                            className="w-full px-3 py-2 bg-black border border-white/10 rounded-xl text-xs text-stone-200 focus:outline-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider"
                        >
                          Salvar Lançamento Bruto
                        </button>
                      </form>
                    </div>

                    {/* Add Expense Form */}
                    <div className="bg-stone-900/40 border border-white/5 rounded-3xl p-6 space-y-4">
                      <span className="font-mono text-[9px] text-rose-500 font-bold block uppercase tracking-widest">Lançar Despesa Operacional</span>
                      <form onSubmit={handleAddExpenseSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-stone-400 font-bold uppercase block">Categoria</label>
                            <select
                              value={newExpense.category}
                              onChange={e => setNewExpense({ ...newExpense, category: e.target.value as any })}
                              className="w-full px-3 py-2 bg-black border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00FF41] cursor-pointer"
                            >
                              <option value="Combustível">Combustível</option>
                              <option value="Alimentação">Alimentação</option>
                              <option value="Manutenção">Manutenção</option>
                              <option value="Internet">Internet</option>
                              <option value="Taxas / Financiamento">Financiamento / Taxas</option>
                              <option value="Outros">Outros</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-stone-400 font-bold uppercase block">Custo R$</label>
                            <input
                              type="number"
                              step="0.01"
                              required
                              placeholder="Ex: 50.00"
                              value={newExpense.amount}
                              onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
                              className="w-full px-3 py-2 bg-black border border-white/10 rounded-xl text-xs text-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-stone-400 font-bold uppercase block">Descrição da Despesa</label>
                          <textarea
                            rows={3}
                            required
                            placeholder="Descreva a despesa operacional (Ex: Troca de óleo mineral 5W30)"
                            value={newExpense.description}
                            onChange={e => setNewExpense({ ...newExpense, description: e.target.value })}
                            className="w-full px-3 py-2 bg-black border border-white/10 rounded-xl text-xs text-stone-200 focus:outline-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all"
                        >
                          Registrar Saída Financeira
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* LATEST ENTRIES LIST */}
                  <div className="bg-stone-900/40 border border-white/5 rounded-3xl p-6 space-y-4">
                    <span className="font-mono text-[9px] text-[#00FF41] font-bold block uppercase tracking-widest">HISTÓRICO COMPLETO DA OPERAÇÃO</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-1">
                      
                      {/* Rides Column */}
                      <div className="space-y-3">
                        <h4 className="font-serif font-bold text-xs text-stone-300 border-b border-white/5 pb-2">Corridas Diárias</h4>
                        {rides.map(ride => (
                          <div key={ride.id} className="p-3 bg-black/50 border border-white/5 rounded-2xl flex items-center justify-between">
                            <div className="text-left space-y-0.5">
                              <span className="text-[8px] font-mono text-stone-400 block uppercase font-bold">{ride.timestamp} • {ride.platform}</span>
                              <span className="font-sans text-[11px] text-white block font-semibold">{ride.destination}</span>
                              <span className="text-[9px] font-mono text-stone-500 block uppercase font-semibold">
                                {ride.distance}km • {ride.duration}min • R$ {(ride.grossEarnings / ride.distance).toFixed(2)}/km
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-sans font-black text-[#00FF41] text-xs">R$ {ride.grossEarnings.toFixed(2)}</span>
                              <button onClick={() => handleDeleteRide(ride.id)} className="text-stone-500 hover:text-rose-400 p-1 rounded transition">
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Expenses Column */}
                      <div className="space-y-3">
                        <h4 className="font-serif font-bold text-xs text-stone-300 border-b border-white/5 pb-2">Gastos Computados</h4>
                        {expenses.map(expense => (
                          <div key={expense.id} className="p-3 bg-rose-950/10 border border-rose-900/10 rounded-2xl flex items-center justify-between">
                            <div className="text-left space-y-0.5">
                              <span className="text-[8px] font-mono text-stone-500 block uppercase font-bold">{expense.timestamp} • {expense.category}</span>
                              <span className="font-sans text-[11px] text-stone-300 block">{expense.description}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-mono font-bold text-rose-400 text-xs">-R$ {expense.amount.toFixed(2)}</span>
                              <button onClick={() => handleDeleteExpense(expense.id)} className="text-stone-500 hover:text-rose-400 p-1 rounded transition">
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-black/60 py-6 text-center text-xs text-stone-500 shrink-0 mt-12">
        <p className="font-mono text-[9px] uppercase tracking-widest">
          LIRA DRIVER PRO // COCKPIT FINANCEIRO - TODOS OS CÁLCULOS SÃO CONDUZIDOS LOCALMENTE COM MÁXIMA PRIVACIDADE.
        </p>
      </footer>

    </div>
  );
}
