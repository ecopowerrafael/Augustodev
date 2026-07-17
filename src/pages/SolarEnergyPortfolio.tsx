import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sun, 
  TrendingUp, 
  Calculator, 
  CheckCircle, 
  FileText, 
  Zap, 
  HelpCircle, 
  ShieldCheck, 
  Upload, 
  Home, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  AlertTriangle, 
  DollarSign, 
  Sliders,
  Calendar,
  Layers,
  Sparkles,
  ChevronRight,
  PhoneCall,
  Flame,
  Info,
  Award,
  TreePine,
  CloudSun,
  MapPin,
  Compass,
  AlertCircle
} from "lucide-react";

// Regional solar parameter presets in Brazil
const REGIONS = {
  sudeste: { name: "Região Sudeste (SP, RJ, MG, ES)", tariff: 0.92, radiation: 4.8 },
  nordeste: { name: "Região Nordeste (BA, CE, PE, RN)", tariff: 0.88, radiation: 5.5 },
  sul: { name: "Região Sul (PR, SC, RS)", tariff: 0.82, radiation: 4.1 },
  centro_oeste: { name: "Região Centro-Oeste (GO, MT, MS, DF)", tariff: 0.94, radiation: 5.1 },
  norte: { name: "Região Norte (AM, PA, TO, RO)", tariff: 0.89, radiation: 4.5 }
};

type RegionKey = keyof typeof REGIONS;

export default function SolarEnergyPortfolio({ onBack }: { onBack?: () => void }) {
  // STATE: Tab control for calculator vs viability
  const [activeTab, setActiveTab] = useState<"calculator" | "feasibility">("calculator");

  // STATE: Solar Savings Calculator
  const [monthlyBill, setMonthlyBill] = useState<number>(450);
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>("sudeste");
  const [phaseType, setPhaseType] = useState<"monofasico" | "bifasico" | "trifasico">("bifasico");
  
  // STATE: Technical Feasibility Form
  const [roofType, setRoofType] = useState<"ceramic" | "metal" | "slab" | "ground" | "building">("ceramic");
  const [shading, setShading] = useState<"none" | "light" | "moderate" | "severe">("none");
  const [solarOrientation, setSolarOrientation] = useState<"north" | "east" | "west" | "south">("north");
  const [roofArea, setRoofArea] = useState<number>(45);
  const [roofCondition, setRoofCondition] = useState<"excellent" | "good" | "old" | "fragile">("excellent");
  const [hasTreesNearby, setHasTreesNearby] = useState<boolean>(false);
  const [isCondo, setIsCondo] = useState<boolean>(false);
  const [simulatedBillImage, setSimulatedBillImage] = useState<string | null>(null);
  const [isUploadingBill, setIsUploadingBill] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  // STATE: Commercial Lead Form
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  // CALCULATIONS: Sizing & Savings
  const regionData = REGIONS[selectedRegion];
  
  // Availability tax/minimum charge in kWh
  const phaseMinKwh = {
    monofasico: 30,
    bifasico: 50,
    trifasico: 100
  }[phaseType];

  // Calculations
  const averageTariff = regionData.tariff;
  const currentKwh = monthlyBill / averageTariff;
  
  // Real savings can't exceed current bill minus the minimum phase charge
  const maximumSavableKwh = Math.max(0, currentKwh - phaseMinKwh);
  const targetMonthlyKwhGeneration = currentKwh; // Generate 100% of consumption

  // Sizing formula: kWp = DailyKwh / (SunHoursDaily * PerformanceRatio)
  // PerformanceRatio assumed to be 0.78 for standard losses
  const dailyKwhNeeded = targetMonthlyKwhGeneration / 30;
  const sunHours = regionData.radiation;
  const systemSizeKwp = parseFloat((dailyKwhNeeded / (sunHours * 0.78)).toFixed(2));

  // Assume standard 550W Tier 1 Solar Panels
  const panelPowerWatts = 550;
  const panelsCount = Math.max(2, Math.ceil((systemSizeKwp * 1000) / panelPowerWatts));

  // Dynamic system price in BRL (economy of scale)
  const pricePerKwp = systemSizeKwp > 10 ? 2700 : systemSizeKwp > 6 ? 3000 : systemSizeKwp > 3 ? 3300 : 3700;
  const estimatedInvestment = parseFloat((systemSizeKwp * pricePerKwp).toFixed(2));

  // Savings in R$
  const monthlySavingsBrl = parseFloat((maximumSavableKwh * averageTariff).toFixed(2));
  const yearlySavingsBrl = parseFloat((monthlySavingsBrl * 12).toFixed(2));
  const savings25YearsBrl = parseFloat((yearlySavingsBrl * 25 * 1.04).toFixed(2)); // assumes mild 4% annual tariff inflation

  // Payback period
  const paybackYears = parseFloat((estimatedInvestment / yearlySavingsBrl).toFixed(1));
  const paybackMonths = Math.ceil((estimatedInvestment % yearlySavingsBrl) / (yearlySavingsBrl / 12));

  // Eco equivalence stats
  const co2AvoidedTons = parseFloat((systemSizeKwp * 0.45 * 25).toFixed(1)); // tons over 25 years
  const treesPlantedEquivalent = Math.round(co2AvoidedTons * 7);

  // CALCULATIONS: Technical Feasibility Score
  const calculateFeasibilityScore = () => {
    let score = 100;

    // Roof type factors
    if (roofType === "building") score -= 20; // Needs apartment approval/shared area
    if (roofType === "slab") score -= 5;      // Needs metal inclination triangles
    if (roofType === "ground") score -= 10;   // Needs flat foundation/civil works

    // Shading penalties
    if (shading === "light") score -= 10;
    if (shading === "moderate") score -= 30;
    if (shading === "severe") score -= 65;

    // Orientation penalties (Southern Hemisphere)
    if (solarOrientation === "north") score += 5; // Perfect
    if (solarOrientation === "east") score -= 10;
    if (solarOrientation === "west") strokeWidthPenalties: score -= 10;
    if (solarOrientation === "south") score -= 40; // Southern roof needs tilt adjustment

    // Roof condition penalties
    if (roofCondition === "old") score -= 20;
    if (roofCondition === "fragile") score -= 45;

    // Nearby obstacle flags
    if (hasTreesNearby) score -= 15;
    if (isCondo) score -= 5;

    // Area constraints
    const requiredAreaM2 = panelsCount * 2.3; // Approx 2.3 m2 per 550W panel
    if (roofArea < requiredAreaM2) {
      const deficiency = requiredAreaM2 - roofArea;
      score -= Math.min(35, Math.round(deficiency * 3));
    }

    return Math.max(10, Math.min(100, score));
  };

  const feasibilityScore = calculateFeasibilityScore();

  const getFeasibilityVerdict = (score: number) => {
    if (score >= 80) return { label: "EXCELENTE", color: "text-emerald-600 border-emerald-300 bg-emerald-50 text-emerald-800", desc: "Sua residência possui excelente potencial técnico. Estrutura favorável e sem interferências de sombras graves para instalação de alta performance imediata!" };
    if (score >= 55) return { label: "VIÁVEL COM AJUSTES", color: "text-amber-700 border-amber-300 bg-amber-50 text-amber-800", desc: "Instalação fotovoltaica perfeitamente viável, porém nossa engenharia precisará projetar pequenos ajustes (como suportes de angulação para telhado sul ou microinversores de rastreamento independente)." };
    return { label: "ALTA COMPLEXIDADE", color: "text-red-700 border-red-300 bg-red-50 text-red-800", desc: "Seu local possui barreiras físicas acentuadas (forte sombreamento, área restrita ou telhado frágil). Recomenda-se realizar uma visita técnica presencial gratuita de um engenheiro EcoPower para viabilizar." };
  };

  const verdict = getFeasibilityVerdict(feasibilityScore);

  // Bill Image Upload simulator
  const handleSimulateBillUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploadingBill(true);
    setUploadMessage("Processando conta com inteligência artificial...");
    
    setTimeout(() => {
      setIsUploadingBill(false);
      setSimulatedBillImage("fatura_solar_analisada.png");
      setUploadMessage("Análise concluída! Consumo de 540 kWh e tarifa local extraídos com sucesso.");
      setMonthlyBill(490);
    }, 2000);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;
    
    setIsSubmittingLead(true);
    setTimeout(() => {
      setIsSubmittingLead(false);
      setLeadSubmitted(true);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-yellow-400/30 overflow-hidden pb-16">
      
      {/* 3D SUN TRANSVERSE ANIMATION WITH DECORATIVE PATHWAY */}
      {/* Appears 3s after page loads from bottom-left (0, 110vh) to top-right (120vw, -20vh) */}
      <motion.div
        initial={{ x: "-20vw", y: "100vh", opacity: 0, scale: 0.6 }}
        animate={{
          x: ["-20vw", "30vw", "115vw"],
          y: ["100vh", "35vh", "-15vh"],
          opacity: [0, 1, 1, 0],
          scale: [0.6, 1.3, 0.6],
          rotate: [0, 180, 360],
        }}
        transition={{
          delay: 3,
          duration: 9,
          times: [0, 0.5, 1],
          ease: "easeInOut",
        }}
        className="fixed pointer-events-none z-50 w-52 h-52 sm:w-72 sm:h-72 filter drop-shadow-[0_0_60px_rgba(251,191,36,0.55)]"
      >
        <img 
          src="https://www.pngarts.com/files/4/Sun-PNG-Image-Transparent-Background.png" 
          alt="Sol de Ouro" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Sunlight illumination flash effect matching the sun's route */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.25, 0.45, 0.25, 0],
        }}
        transition={{
          delay: 3.5,
          duration: 8,
          times: [0, 0.35, 0.5, 0.8, 1],
          ease: "easeInOut",
        }}
        className="fixed inset-0 pointer-events-none z-40 bg-gradient-to-tr from-yellow-100/15 via-yellow-200/20 to-sky-100/10 mix-blend-screen"
      />

      {/* Modern Top Header / Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-4 px-4 sm:px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center space-x-1 text-xs font-mono text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer uppercase font-extrabold"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </button>
            )}
            
            <div className="flex items-center space-x-2.5">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 via-yellow-400 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-500/10">
                <Sun className="h-5 w-5 text-white animate-pulse" />
              </div>
              <div className="text-left">
                <span className="font-sans font-black text-sm text-emerald-800 tracking-wider block uppercase">ECOPOWER</span>
                <span className="font-mono text-[9px] text-yellow-600 block tracking-widest uppercase font-black">SOLAR ENERGY</span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm font-bold text-slate-600">
            <a href="#how-it-works" className="hover:text-emerald-600 transition">Como Funciona</a>
            <a href="#simulator-section" className="hover:text-emerald-600 transition">Simulação & Economia</a>
            <a href="#worth-it" className="hover:text-emerald-600 transition">Vantagens</a>
            <a href="#feasibility" className="hover:text-emerald-600 transition">Análise de Viabilidade</a>
          </div>

          <div className="flex items-center space-x-3">
            <a 
              href="#contact-form"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition font-mono text-[10px] font-black uppercase tracking-wider flex items-center space-x-1.5 shadow-md shadow-emerald-600/10 cursor-pointer"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Orçamento Grátis</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION - CLEAN, VIBRANT & TRUSTWORTHY */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-sky-50 via-emerald-50/20 to-white overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-emerald-100 border border-emerald-300/40 px-3 py-1 rounded-full text-emerald-800 font-mono text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5 text-yellow-500 animate-spin" style={{ animationDuration: "12s" }} />
                <span>Energia Solar Própria • Economia Real de até 95%</span>
              </div>
              
              <h1 className="font-serif text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
                Zere Seus Gastos com Eletricidade com <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-yellow-500">Energia Solar EcoPower</span>
              </h1>
              
              <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed">
                Pare de sofrer com as flutuações e reajustes das concessionárias. Produza eletricidade pura vinda diretamente do Sol, valorize seu patrimônio em até 10% e limpe sua pegada de carbono. Faça uma simulação rápida e planeje sua instalação com garantia de 25 anos.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#simulator-section"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-mono text-[11px] font-black uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/25 cursor-pointer flex items-center space-x-2"
                >
                  <Calculator className="h-4 w-4" />
                  <span>Simular Economia Agora</span>
                </a>

                <a
                  href="#feasibility"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[11px] font-black uppercase tracking-wider transition cursor-pointer flex items-center space-x-2 shadow-sm"
                >
                  <Sliders className="h-4 w-4 text-emerald-600" />
                  <span>Viabilidade do Telhado</span>
                </a>
              </div>

              {/* Minimal Trust Indicator Bar */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <h4 className="font-serif font-black text-lg text-emerald-700">25 Anos</h4>
                  <span className="text-xs text-slate-500 block">Garantia de Painel</span>
                </div>
                <div>
                  <h4 className="font-serif font-black text-lg text-emerald-700">100% Legal</h4>
                  <span className="text-xs text-slate-500 block">Homologação Inclusa</span>
                </div>
                <div>
                  <h4 className="font-serif font-black text-lg text-emerald-700">Tier 1</h4>
                  <span className="text-xs text-slate-500 block">Equipamentos Premium</span>
                </div>
              </div>
            </div>

            {/* Right Media Column - Men installing solar panels */}
            <div className="lg:col-span-6 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-yellow-500/10 rounded-3xl -rotate-2 transform scale-105 pointer-events-none" />
              
              <div className="relative bg-white p-3 rounded-3xl border border-slate-200 shadow-xl overflow-hidden group">
                <img 
                  src="https://solarprime.com.br/wp-content/uploads/2022/12/post_thumbnail-4cba05d81e1e8b18b6836ba70bd4d251.jpeg.webp" 
                  alt="Instalação profissional de placas solares fotovoltaicas no telhado" 
                  className="w-full h-auto max-h-[380px] object-cover rounded-2xl group-hover:scale-[1.02] transition duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 text-white text-left">
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-400 animate-ping" />
                    <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold text-yellow-400">Instalação Residencial Ativa</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold mt-1">Engenharia de Alta Performance</h4>
                  <p className="font-sans text-[11px] text-slate-200/90 leading-relaxed mt-1">
                    Nossos engenheiros e técnicos parceiros cuidam de todo o design, entrega dos equipamentos e ativação oficial na distribuidora.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN SIMULATION SUITE: CALCULATOR & FEASIBILITY TABS */}
      <section id="simulator-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8 text-left scroll-mt-20">
        
        {/* Navigation Tabs Selector */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-left">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-yellow-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/10">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[8px] font-mono text-emerald-600 uppercase font-black block tracking-wider">PLATAFORMA DE INTERAÇÃO</span>
              <h3 className="font-sans font-black text-slate-800 text-sm">
                Estudo Preliminar de Viabilidade & Retorno Financeiro
              </h3>
            </div>
          </div>

          {/* Clean vibrant tab buttons (green/yellow themes) */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("calculator")}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-black font-sans transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                activeTab === "calculator"
                  ? "bg-white text-emerald-700 shadow-sm border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Calculator className="h-4 w-4 text-emerald-600" />
              <span>Calculadora de Economia</span>
            </button>
            
            <button
              onClick={() => setActiveTab("feasibility")}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-black font-sans transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                activeTab === "feasibility"
                  ? "bg-white text-emerald-700 shadow-sm border border-slate-200/50"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Sliders className="h-4 w-4 text-emerald-600" />
              <span>Fatores de Viabilidade</span>
            </button>
          </div>
        </div>

        {/* CONTAINER FOR ACTIVE MODULE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Workspace Column */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === "calculator" ? (
                <motion.div
                  key="calculator-card"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-left"
                >
                  <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600">
                        <Calculator className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-mono text-[8px] text-emerald-600 font-extrabold uppercase block">PASSO 1: CONSUMO ENERGÉTICO</span>
                        <h3 className="font-serif font-bold text-lg text-slate-800">Cálculo de Demanda Fotovoltaica</h3>
                      </div>
                    </div>
                    <span className="bg-yellow-100 border border-yellow-200 text-yellow-800 font-mono text-[8px] font-black px-2.5 py-1 rounded-full uppercase">
                      Estimativas 2026
                    </span>
                  </div>

                  <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed">
                    Arraste o cursor com o valor médio da sua fatura mensal ou envie sua conta em anexo abaixo para calcularmos a geração necessária na sua região geográfica.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    
                    {/* INPUT A: Interactive Bill Slider */}
                    <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex justify-between items-center">
                        <label className="block text-[10px] font-mono font-black text-slate-500 uppercase">Conta Mensal Média</label>
                        <span className="font-mono text-emerald-700 font-black text-lg bg-emerald-100/50 px-2.5 py-1 rounded-xl">
                          R$ {monthlyBill}
                        </span>
                      </div>
                      
                      <input
                        type="range"
                        min="150"
                        max="6000"
                        step="50"
                        value={monthlyBill}
                        onChange={(e) => setMonthlyBill(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                      
                      <div className="flex justify-between text-[9px] font-mono text-slate-400 font-bold">
                        <span>R$ 150</span>
                        <span>R$ 1.500</span>
                        <span>R$ 3.000</span>
                        <span>R$ 6.000+</span>
                      </div>
                    </div>

                    {/* INPUT B: Region Selection (radiation coefficients) */}
                    <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                      <label className="block text-[10px] font-mono font-black text-slate-500 uppercase">Sua Concessionária (Região)</label>
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value as RegionKey)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 font-bold focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 cursor-pointer h-[38px]"
                      >
                        {Object.entries(REGIONS).map(([key, data]) => (
                          <option key={key} value={key}>
                            {data.name} (R$ {data.tariff.toFixed(2)}/kWh)
                          </option>
                        ))}
                      </select>
                      <span className="text-[9px] text-slate-400 font-mono">Coeficiente médio de sol de {regionData.radiation}h diárias.</span>
                    </div>

                    {/* INPUT C: Phase Type (impacts the availability charge minimum) */}
                    <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 col-span-1 md:col-span-2">
                      <div className="flex items-center justify-between">
                        <label className="block text-[10px] font-mono font-black text-slate-500 uppercase">Tipo de Conexão Física (Entrada de Energia)</label>
                        <span className="text-[9px] font-mono text-emerald-600 font-bold uppercase">Custo Mínimo: {phaseMinKwh} kWh/mês</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: "monofasico", title: "Monofásico", desc: "Casas Pequenas" },
                          { id: "bifasico", title: "Bifásico", desc: "Médio / Padrão" },
                          { id: "trifasico", title: "Trifásico", desc: "Ar Condicionado" }
                        ].map(ph => {
                          const isSelected = phaseType === ph.id;
                          return (
                            <button
                              key={ph.id}
                              onClick={() => setPhaseType(ph.id as any)}
                              className={`p-2.5 rounded-xl border text-center transition flex flex-col justify-between h-[60px] cursor-pointer ${
                                isSelected
                                  ? "bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-600/10"
                                  : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                              }`}
                            >
                              <span className="font-sans font-bold text-[11px] block text-center w-full">{ph.title}</span>
                              <span className={`text-[8px] font-mono block text-center w-full uppercase mt-1 ${isSelected ? "text-emerald-150" : "text-slate-400"}`}>{ph.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* AI BILL FILE DROP OR UPLOAD SIMULATOR */}
                  <div className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-left space-y-1">
                      <div className="flex items-center space-x-1.5 text-emerald-700 font-mono text-[9px] font-extrabold uppercase">
                        <Award className="h-4 w-4" />
                        <span>Mapeamento Fotovoltaico Inteligente</span>
                      </div>
                      <h4 className="font-serif font-bold text-slate-800 text-xs">Deseja calcular usando sua conta de luz real?</h4>
                      <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                        Anexe uma imagem da sua fatura para simular seu histórico real de consumo e taxas de iluminação pública de forma exata.
                      </p>
                    </div>

                    <div className="relative bg-white hover:bg-slate-50 border border-dashed border-slate-300 hover:border-emerald-500 rounded-xl px-4 py-2.5 text-center transition flex items-center justify-center space-x-2 shrink-0 cursor-pointer min-w-[200px]">
                      {isUploadingBill ? (
                        <div className="flex items-center space-x-1.5 text-slate-600 font-mono text-[9px] font-black uppercase animate-pulse">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                          <span>Lendo fatura...</span>
                        </div>
                      ) : simulatedBillImage ? (
                        <div className="flex items-center space-x-1.5 text-emerald-600 font-mono text-[9px] font-black uppercase">
                          <Check className="h-4 w-4" />
                          <span>Fatura Digitalizada!</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 text-emerald-600" />
                          <span className="text-[9px] font-mono text-slate-600 uppercase font-black">Selecionar Fatura</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleSimulateBillUpload}
                        disabled={isUploadingBill}
                      />
                    </div>
                  </div>

                  {/* HIGH-END METRIC REPORT PANEL (Green & Yellow highlights, super clean) */}
                  <div className="bg-emerald-600 text-white rounded-3xl p-6 relative overflow-hidden shadow-lg shadow-emerald-600/10">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400/15 rounded-full blur-3xl pointer-events-none" />
                    
                    <span className="text-[8px] font-mono text-emerald-200 uppercase font-black block border-b border-emerald-500/40 pb-2.5">
                      PARECER TÉCNICO PRELIMINAR DE ENGENHARIA
                    </span>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-5 border-b border-emerald-500/40 text-left">
                      <div>
                        <span className="text-[8px] font-mono text-emerald-200 block uppercase font-bold">POTÊNCIA EXIGIDA</span>
                        <span className="font-mono font-black text-xl text-yellow-300 block mt-1">{systemSizeKwp} kWp</span>
                        <span className="text-[9px] text-emerald-100 block mt-0.5">Potência instalada</span>
                      </div>
                      
                      <div>
                        <span className="text-[8px] font-mono text-emerald-200 block uppercase font-bold">PAINÉIS SOLARES</span>
                        <span className="font-mono font-black text-xl text-yellow-300 block mt-1">{panelsCount} Placas</span>
                        <span className="text-[9px] text-emerald-100 block mt-0.5">Selo Tier 1 550W</span>
                      </div>

                      <div>
                        <span className="text-[8px] font-mono text-emerald-200 block uppercase font-bold">GERAÇÃO MENSAL</span>
                        <span className="font-mono font-black text-xl text-yellow-300 block mt-1">~{Math.round(targetMonthlyKwhGeneration)} kWh</span>
                        <span className="text-[9px] text-emerald-100 block mt-0.5">Média anual solar</span>
                      </div>

                      <div>
                        <span className="text-[8px] font-mono text-emerald-200 block uppercase font-bold">ÁREA REQUERIDA</span>
                        <span className="font-mono font-black text-xl text-yellow-300 block mt-1">~{Math.round(panelsCount * 2.3)} m²</span>
                        <span className="text-[9px] text-emerald-100 block mt-0.5">Espaço no telhado</span>
                      </div>
                    </div>

                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                      <div className="bg-emerald-700/50 p-4 rounded-xl border border-emerald-500/30">
                        <span className="text-[8px] font-mono text-emerald-200 uppercase block font-bold">INVESTIMENTO ESTIMADO DO PROJETO</span>
                        <span className="font-mono font-black text-white text-lg block mt-1">
                          R$ {estimatedInvestment.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                        <p className="text-[9px] text-emerald-100/90 leading-relaxed mt-1">
                          Incluso placas solar, inversor String, fiação, estruturas, fixação técnica, frete homologado e mão de obra de engenharia certificada.
                        </p>
                      </div>

                      <div className="bg-yellow-400 text-slate-900 p-4 rounded-xl shadow-sm">
                        <span className="text-[8px] font-mono text-emerald-900 uppercase block font-black">RETORNO ESTIMADO (PAYBACK)</span>
                        <div className="flex items-baseline space-x-1 mt-1">
                          <span className="font-mono font-black text-xl text-slate-950">{paybackYears} Anos</span>
                          <span className="text-[10px] text-slate-800 font-bold">({paybackMonths} meses)</span>
                        </div>
                        <p className="text-[9px] text-slate-800 leading-relaxed mt-1">
                          Após esse período, o sistema estará 100% quitado e gerará lucros na forma de energia gratuita por mais de duas décadas inteiras.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* DETAILED SAVINGS BREAKDOWN */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-left">
                      <span className="text-[8px] font-mono text-emerald-600 uppercase block font-black">ECONOMIA ESTIMADA MENSAL</span>
                      <span className="font-mono font-black text-emerald-700 text-xl block mt-1">R$ {monthlySavingsBrl.toFixed(2)}</span>
                      <span className="text-[9px] text-slate-500 block">Excedentes viram créditos na rede</span>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-left">
                      <span className="text-[8px] font-mono text-emerald-600 uppercase block font-black">ECONOMIA ESTIMADA ANUAL</span>
                      <span className="font-mono font-black text-emerald-700 text-xl block mt-1">R$ {yearlySavingsBrl.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                      <span className="text-[9px] text-slate-500 block">Investimento livre de inflação</span>
                    </div>

                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-left">
                      <span className="text-[8px] font-mono text-emerald-600 uppercase block font-black">LIVRE DE GASTOS EM 25 ANOS</span>
                      <span className="font-mono font-black text-emerald-700 text-xl block mt-1">R$ {savings25YearsBrl.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}</span>
                      <span className="text-[9px] text-slate-500 block">Retorno financeiro multiplicado</span>
                    </div>
                  </div>

                  {/* Environment Equivalence Grid */}
                  <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-around gap-4">
                    <div className="flex items-center space-x-3 text-left">
                      <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <TreePine className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-mono text-[8px] text-slate-400 block uppercase font-bold">BENEFÍCIO ECOLÓGICO</span>
                        <span className="font-serif font-black text-slate-800 text-sm block">{treesPlantedEquivalent} Árvores</span>
                        <span className="text-[9px] text-slate-500 block">Preservadas em CO₂ compensado</span>
                      </div>
                    </div>

                    <div className="h-px sm:h-10 w-full sm:w-px bg-slate-200" />

                    <div className="flex items-center space-x-3 text-left">
                      <div className="h-10 w-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
                        <CloudSun className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-mono text-[8px] text-slate-400 block uppercase font-bold">EMISSÃO DE CARBONO COMPENSADA</span>
                        <span className="font-serif font-black text-slate-800 text-sm block">{co2AvoidedTons} Toneladas</span>
                        <span className="text-[9px] text-slate-500 block">A menos jogadas na atmosfera</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                      <Info className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>Parâmetros de radiação solar calculados a partir de atlas geográficos de energia do INPE.</span>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab("feasibility");
                        document.getElementById("simulator-section")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[10px] font-black uppercase tracking-wider transition cursor-pointer flex items-center space-x-1.5"
                    >
                      <span>Preencher Dados de Viabilidade</span>
                      <ArrowRight className="h-4 w-4 text-emerald-600" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="feasibility-card"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-left"
                >
                  <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600">
                        <Sliders className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-mono text-[8px] text-emerald-600 font-extrabold uppercase block">PASSO 2: VIABILIDADE FÍSICA DO LOCAL</span>
                        <h3 className="font-serif font-bold text-lg text-slate-800">Mapeamento Técnico de Cobertura</h3>
                      </div>
                    </div>
                    <span className="bg-yellow-100 border border-yellow-200 text-yellow-800 font-mono text-[8px] font-black px-2.5 py-1 rounded-full uppercase">
                      Diagnóstico de Engenharia
                    </span>
                  </div>

                  <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed">
                    A eficiência de geração de energia solar depende das características físicas do imóvel. Forneça os dados abaixo para avaliar as perdas estruturais de forma precisa.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* INPUT 1: Roof Type Selector */}
                    <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-150">
                      <label className="block text-[10px] font-mono font-black text-slate-500 uppercase flex items-center space-x-1">
                        <Home className="h-3.5 w-3.5 text-emerald-600" />
                        <span>1. Tipo de Cobertura / Telhado</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {[
                          { id: "ceramic", title: "Telha Cerâmica", desc: "Instalação Comum" },
                          { id: "metal", title: "Telha Metálica", desc: "Fixadores Simples" },
                          { id: "slab", title: "Laje Plano", desc: "Necessita Triângulo" },
                          { id: "ground", title: "Estrutura Solo", desc: "Suporte de Alumínio" },
                          { id: "building", title: "Prédio / Condomínio", desc: "Regras de Condomínio" }
                        ].map(rf => {
                          const isSelected = roofType === rf.id;
                          return (
                            <button
                              key={rf.id}
                              onClick={() => setRoofType(rf.id as any)}
                              className={`p-2 rounded-xl border text-left transition flex flex-col justify-between h-[52px] cursor-pointer ${
                                isSelected
                                  ? "bg-emerald-600 border-emerald-500 text-white shadow-sm"
                                  : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                              }`}
                            >
                              <span className="font-sans font-bold text-[10px] block truncate">{rf.title}</span>
                              <span className={`text-[7px] font-mono block uppercase ${isSelected ? "text-emerald-100" : "text-slate-400"}`}>{rf.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* INPUT 2: Shading level */}
                    <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-150">
                      <label className="block text-[10px] font-mono font-black text-slate-500 uppercase flex items-center space-x-1">
                        <CloudSun className="h-3.5 w-3.5 text-emerald-600" />
                        <span>2. Sombreamento / Árvores Próximas</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {[
                          { id: "none", title: "Livre de Sombras", desc: "Sol Pleno o Dia Todo" },
                          { id: "light", title: "Sombra Leve", desc: "Obstáculos Distantes" },
                          { id: "moderate", title: "Sombra Média", desc: "Árvores Próximas" },
                          { id: "severe", title: "Sombra Forte", desc: "Prédios Altos Próximos" }
                        ].map(sh => {
                          const isSelected = shading === sh.id;
                          return (
                            <button
                              key={sh.id}
                              onClick={() => setShading(sh.id as any)}
                              className={`p-2 rounded-xl border text-left transition flex flex-col justify-between h-[52px] cursor-pointer ${
                                isSelected
                                  ? "bg-emerald-600 border-emerald-500 text-white shadow-sm"
                                  : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                              }`}
                            >
                              <span className="font-sans font-bold text-[10px] block truncate">{sh.title}</span>
                              <span className={`text-[7px] font-mono block uppercase ${isSelected ? "text-emerald-100" : "text-slate-400"}`}>{sh.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* INPUT 3: Orientation */}
                    <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-150">
                      <label className="block text-[10px] font-mono font-black text-slate-500 uppercase flex items-center space-x-1">
                        <Compass className="h-3.5 w-3.5 text-emerald-600" />
                        <span>3. Orientação Solar (Hemisfério Sul)</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {[
                          { id: "north", title: "Norte (Ideal)", desc: "100% de Rendimento" },
                          { id: "east", title: "Leste (Manhã)", desc: "Boa Captação Matutina" },
                          { id: "west", title: "Oeste (Tarde)", desc: "Boa Captação Vespertina" },
                          { id: "south", title: "Sul (Menor sol)", desc: "Necessita Correção" }
                        ].map(or => {
                          const isSelected = solarOrientation === or.id;
                          return (
                            <button
                              key={or.id}
                              onClick={() => setSolarOrientation(or.id as any)}
                              className={`p-2 rounded-xl border text-left transition flex flex-col justify-between h-[52px] cursor-pointer ${
                                isSelected
                                  ? "bg-emerald-600 border-emerald-500 text-white shadow-sm"
                                  : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                              }`}
                            >
                              <span className="font-sans font-bold text-[10px] block truncate">{or.title}</span>
                              <span className={`text-[7px] font-mono block uppercase ${isSelected ? "text-emerald-100" : "text-slate-400"}`}>{or.desc}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* INPUT 4: Structural State of the roof & sliders */}
                    <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-150 flex flex-col justify-between">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-mono font-black text-slate-500 uppercase">4. Estado Estrutural das Vigas</label>
                        <select
                          value={roofCondition}
                          onChange={(e) => setRoofCondition(e.target.value as any)}
                          className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer h-[32px]"
                        >
                          <option value="excellent">Excelente / Estrutura Firme e Nova</option>
                          <option value="good">Bom Estado / Sem imperfeições visíveis</option>
                          <option value="old">Antigo / Madeira antiga sem trincas</option>
                          <option value="fragile">Frágil / Necessita vistoria preventiva</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="block text-[10px] font-mono font-black text-slate-500 uppercase">Área Total do Telhado</label>
                          <span className="font-mono text-emerald-700 font-bold text-xs">{roofArea} m²</span>
                        </div>
                        <input
                          type="range"
                          min="15"
                          max="250"
                          step="5"
                          value={roofArea}
                          onChange={(e) => setRoofArea(Number(e.target.value))}
                          className="w-full h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                        />
                      </div>
                    </div>

                    {/* Quick obstacles interactive switches */}
                    <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-150 col-span-1 md:col-span-2">
                      <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">5. Fatores de Impedimento ou Entorno</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                          onClick={() => setHasTreesNearby(!hasTreesNearby)}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition ${
                            hasTreesNearby 
                              ? "bg-amber-50 border-amber-300 text-amber-900" 
                              : "bg-white border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className="font-sans font-bold text-xs block">Árvores/Postes Colados no Telhado?</span>
                            <span className="text-[8px] font-mono text-slate-400 block uppercase">Causa sombras parciais à tarde</span>
                          </div>
                          <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${hasTreesNearby ? "border-amber-600 bg-amber-600 text-white" : "border-slate-300"}`}>
                            {hasTreesNearby && <Check className="h-3 w-3" />}
                          </div>
                        </button>

                        <button
                          onClick={() => setIsCondo(!isCondo)}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition ${
                            isCondo 
                              ? "bg-amber-50 border-amber-300 text-amber-900" 
                              : "bg-white border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className="font-sans font-bold text-xs block">O Imóvel fica em Condomínio Fechado?</span>
                            <span className="text-[8px] font-mono text-slate-400 block uppercase">Requer regras de padrão estético</span>
                          </div>
                          <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${isCondo ? "border-amber-600 bg-amber-600 text-white" : "border-slate-300"}`}>
                            {isCondo && <Check className="h-3 w-3" />}
                          </div>
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* COMPUTED VIABILITY DIAGNOSTIC SHEET */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-5 sm:p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <span className="text-[8px] font-mono text-emerald-600 uppercase font-black block border-b border-slate-200 pb-2.5">
                      RELATÓRIO DE COMPATIBILIDADE FÍSICA E GERAÇÃO
                    </span>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-4">
                      
                      <div className="text-left space-y-2 max-w-lg">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[9px] text-slate-400 uppercase font-bold">Diagnóstico:</span>
                          <span className={`px-2.5 py-1 rounded-xl border font-mono text-[9px] font-black uppercase tracking-wider ${verdict.color}`}>
                            {verdict.label}
                          </span>
                        </div>
                        <h4 className="font-serif font-black text-slate-800 text-base">Compatibilidade do Imóvel de {feasibilityScore}%</h4>
                        <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                          {verdict.desc}
                        </p>
                      </div>

                      {/* Score circle */}
                      <div className="relative h-24 w-24 shrink-0 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle
                            cx="48"
                            cy="48"
                            r="38"
                            className="stroke-slate-200"
                            strokeWidth="6"
                            fill="transparent"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="38"
                            className={`${
                              feasibilityScore >= 80 
                                ? "stroke-emerald-600" 
                                : feasibilityScore >= 55 
                                  ? "stroke-amber-500" 
                                  : "stroke-red-500"
                            }`}
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 38}
                            strokeDashoffset={2 * Math.PI * 38 * (1 - feasibilityScore / 100)}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="font-mono text-slate-800 font-black text-base">{feasibilityScore}%</span>
                          <span className="text-[6px] font-mono text-slate-400 uppercase font-black">Score</span>
                        </div>
                      </div>

                    </div>

                    {/* Bullet list of physical warnings */}
                    <div className="border-t border-slate-200 pt-4 text-xs text-slate-500 space-y-1.5">
                      <span className="font-mono text-[8px] text-slate-400 uppercase font-bold block">Resumo dos fatores estruturais:</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] leading-relaxed">
                        <p className="flex items-start space-x-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span>Área física de {roofArea}m² é suficiente para comportar as {panelsCount} placas necessárias ({panelsCount * 2.3} m² requeridos).</span>
                        </p>

                        {shading !== "none" && (
                          <p className="flex items-start space-x-1.5">
                            <span className="text-amber-500 font-bold">⚠</span>
                            <span>Atenção: Presença de sombreamento. Nosso projeto incluirá microinversores de barramento múltiplo para evitar perdas localizadas.</span>
                          </p>
                        )}

                        {solarOrientation === "south" && (
                          <p className="flex items-start space-x-1.5">
                            <span className="text-amber-500 font-bold">⚠</span>
                            <span>Inclinação técnica requerida: Telhado virado ao Sul necessitará de suportes elevados de alumínio direcionados ao Norte.</span>
                          </p>
                        )}

                        {roofCondition === "fragile" && (
                          <p className="flex items-start space-x-1.5 text-red-600">
                            <span className="font-bold">⚠</span>
                            <span>Estrutura frágil relatada. É necessário reforço nas terças de sustentação antes do início da instalação.</span>
                          </p>
                        )}

                        {isCondo && (
                          <p className="flex items-start space-x-1.5">
                            <span className="text-slate-600 font-bold">•</span>
                            <span>Imóvel em condomínio. Nosso time de engenharia cuidará de emitir a documentação exigida pela associação de moradores.</span>
                          </p>
                        )}
                      </div>
                    </div>

                  </div>

                  <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[10px] text-slate-400 font-mono">
                      A análise usa dados empíricos de perdas técnicas estimadas de fiação e angulação de painel.
                    </span>

                    <a
                      href="#contact-form"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[10px] font-black uppercase tracking-wider transition cursor-pointer flex items-center space-x-1 shadow-md shadow-emerald-600/10"
                    >
                      <span>Enviar Laudo para Engenheiro</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Lead Submission Box / Simulated Real-Time Status */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm text-left">
            <div className="border-b border-slate-100 pb-3">
              <span className="font-mono text-[8px] text-emerald-600 font-black uppercase block tracking-wider">RESUMO DA SOLICITAÇÃO</span>
              <h3 className="font-serif font-black text-base text-slate-800 mt-0.5">Estudo Fotovoltaico</h3>
            </div>

            {/* Simulated Live Panel values */}
            <div className="space-y-3 font-mono text-[10px] text-slate-500">
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span>CONCESSIONÁRIA:</span>
                <span className="text-slate-800 font-bold uppercase">{selectedRegion}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span>CONTA ATUAL:</span>
                <span className="text-slate-800 font-bold">R$ {monthlyBill}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span>GERADOR PROP.:</span>
                <span className="text-slate-800 font-bold">{systemSizeKwp} kWp</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span>PLACAS 550W:</span>
                <span className="text-slate-800 font-bold">{panelsCount} unidades</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span>VIABILIDADE TELHADO:</span>
                <span className={`font-bold ${feasibilityScore >= 80 ? "text-emerald-600" : "text-amber-600"}`}>{feasibilityScore}%</span>
              </div>
              <div className="flex justify-between pb-1.5">
                <span>CO₂ EVITADO:</span>
                <span className="text-emerald-600 font-bold">{co2AvoidedTons} toneladas</span>
              </div>
            </div>

            {/* LEAD FORM CONTAINER */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-4" id="contact-form">
              <div className="text-center sm:text-left space-y-0.5">
                <h4 className="font-serif font-black text-sm text-slate-800 uppercase">Solicitar Orçamento Final</h4>
                <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                  Envie seus dados de simulação para nossa matriz. Um consultor enviará a proposta comercial em PDF pelo WhatsApp em até 1 hora.
                </p>
              </div>

              {leadSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-300/40 p-4 rounded-xl text-center space-y-2"
                >
                  <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto" />
                  <h5 className="font-serif font-black text-xs text-emerald-800 uppercase">Solicitação Enviada!</h5>
                  <p className="text-[10px] text-emerald-700 font-sans leading-relaxed">
                    Olá <strong>{leadName}</strong>, recebemos seus dados técnicos. Nosso engenheiro está montando seu projeto no software PVsyst e entrará em contato em breve no número <strong>{leadPhone}</strong>.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase">Seu Nome Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Rafael Silva"
                      value={leadName}
                      onChange={e => setLeadName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase">WhatsApp / Telefone</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: (11) 99999-9999"
                      value={leadPhone}
                      onChange={e => setLeadPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] font-mono font-bold text-slate-500 uppercase">Seu E-mail (Opcional)</label>
                    <input
                      type="email"
                      placeholder="Ex: rafael@email.com"
                      value={leadEmail}
                      onChange={e => setLeadEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl text-[10px] font-mono font-black uppercase tracking-wider transition-all shadow-md shadow-emerald-600/10 cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    {isSubmittingLead ? (
                      <span>Agendando Estudo...</span>
                    ) : (
                      <>
                        <Zap className="h-3.5 w-3.5 text-yellow-300" />
                        <span>Garantir Meu Desconto</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 text-left space-y-2.5">
              <span className="font-mono text-[8px] text-slate-400 uppercase font-bold block">COMPROMISSO ECOPOWER:</span>
              <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                Nossos orçamentos são 100% transparentes, sem letras miúdas. Garantimos o menor preço de kit solar homologado da sua região com marcas renomadas (WEG, BYD, Growatt, Canadian Solar).
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* DETAILED SECTION: HOW THE SYSTEM WORKS (Featuring requested grid-tie diagram) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-left scroll-mt-20">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm">
          <div className="max-w-3xl space-y-3">
            <span className="px-2.5 py-1 rounded bg-yellow-100 border border-yellow-200 text-yellow-800 font-mono text-[9px] uppercase tracking-wider font-extrabold inline-block">
              INFOGRÁFICO EXPLICATIVO
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Como Funciona o Sistema Solar Conectado à Rede (Grid-Tie)
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
              O sistema Grid-Tie é a tecnologia mais adotada no mundo. Seus painéis no telhado captam a luz solar e a transformam em energia limpa. Entenda o fluxo dinâmico no diagrama esquemático abaixo:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            
            {/* Diagram Image Container */}
            <div className="lg:col-span-7 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-150 flex items-center justify-center">
              <div className="relative rounded-xl overflow-hidden bg-white p-2 border border-slate-200 shadow-sm max-w-full">
                <img 
                  src="https://www.neosolar.com.br/media/wysiwyg/energia-solar-fotovoltaica-grid-tie_1.jpg" 
                  alt="Esquema explicativo de como funciona a energia solar conectada à rede elétrica grid-tie" 
                  className="w-full h-auto max-h-[380px] object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Explanation items */}
            <div className="lg:col-span-5 space-y-4">
              {[
                { step: "1", title: "Painéis Solares", desc: "Os módulos fotovoltaicos no telhado absorvem os fótons da luz solar e geram energia em Corrente Contínua (CC) durante todo o dia, mesmo em dias nublados." },
                { step: "2", title: "Inversor Solar", desc: "O coração tecnológico do sistema. Converte a Corrente Contínua em Corrente Alternada (CA), idêntica à eletricidade fornecida pela sua distribuidora local." },
                { step: "3", title: "Consumo Imediato", desc: "A eletricidade solar alimenta os eletrodomésticos, lâmpadas, motores e ar-condicionado em funcionamento no exato momento, sem passar pela distribuidora." },
                { step: "4", title: "Créditos de Energia", desc: "Se houver sobra de geração, esse excedente é injetado na rede elétrica pública através de um relógio bidirecional, gerando créditos que você pode usar em até 60 meses!" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3.5 p-3.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-150">
                  <div className="h-7 w-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-mono text-xs font-black shrink-0">
                    {item.step}
                  </div>
                  <div className="space-y-0.5 text-left">
                    <h4 className="font-serif font-black text-slate-800 text-sm">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* VALE A PENA ENERGIA SOLAR? (Featuring worth it image) */}
      <section id="worth-it" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-left scroll-mt-20">
        <div className="bg-gradient-to-br from-emerald-50 via-white to-yellow-50/20 border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Educational Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="px-2.5 py-1 rounded bg-emerald-100 border border-emerald-300/40 text-emerald-800 font-mono text-[9px] uppercase tracking-wider font-extrabold inline-block">
                VIABILIDADE FINANCEIRA COMPROVADA
              </span>
              
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Será que a Energia Solar Realmente Vale a Pena?
              </h2>

              <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                A resposta matemática é sim. Atualmente, os sistemas fotovoltaicos representam um dos investimentos financeiros mais seguros e de maior retorno do mercado. Diferente de poupança ou renda fixa, o retorno vem na forma de economia imediata e direta de custos fixos, imune à inflação das distribuidoras de energia pública.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                  <span className="font-mono text-[8px] text-yellow-600 font-black uppercase">INVESTIMENTO SEGURO</span>
                  <h4 className="font-serif font-bold text-slate-800 text-sm mt-0.5">Retorno de até 25% ao Ano</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed mt-1">Nenhum investimento tradicional bate a taxa interna de retorno obtida ao zerar sua própria fatura.</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
                  <span className="font-mono text-[8px] text-yellow-600 font-black uppercase">VALORIZAÇÃO IMOBILIÁRIA</span>
                  <h4 className="font-serif font-bold text-slate-800 text-sm mt-0.5">Imóvel Mais Desejado</h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed mt-1">Casas com geradores fotovoltaicos instalados vendem até 20% mais rápido e com prêmio de valorização imediato.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Beautiful Info Graphic representation featuring unamed-13-3-1024x683.png.webp */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-md overflow-hidden relative group">
                <img 
                  src="https://d28w5jlx3m10k.cloudfront.net/wp-content/uploads/2026/05/unnamed-13-3-1024x683.png.webp" 
                  alt="Painel solar fotovoltaico em residência demonstrando que energia solar vale a pena" 
                  className="w-full h-auto object-cover rounded-xl group-hover:scale-[1.02] transition duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* HUD Label Overlay */}
                <div className="absolute top-5 left-5 bg-emerald-600 text-white font-mono text-[8px] font-black uppercase px-2.5 py-1.5 rounded-md shadow-sm">
                  Retorno Garantido EcoPower
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TRUST FACTORS / FAQ BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-left">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-150 pb-3">
            <span className="font-mono text-[8px] text-emerald-600 font-black uppercase block">SUPORTE DE ENGENHARIA</span>
            <h3 className="font-serif font-black text-xl text-slate-900 mt-0.5">Dúvidas Frequentes sobre Instalação</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
            <div className="space-y-1 text-left">
              <h4 className="font-serif font-black text-slate-800 text-sm flex items-center space-x-1">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>O que acontece se chover ou ficar nublado?</span>
              </h4>
              <p className="font-sans leading-relaxed text-[11px]">
                O sistema fotovoltaico funciona com radiação de luz, não calor. Mesmo em dias chuvosos ou sob nuvens densas, as placas continuam gerando energia, embora em menor intensidade. A segurança do fornecimento é assegurada pela distribuidora convencional durante a noite.
              </p>
            </div>

            <div className="space-y-1 text-left">
              <h4 className="font-serif font-black text-slate-800 text-sm flex items-center space-x-1">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Como funciona a manutenção do gerador?</span>
              </h4>
              <p className="font-sans leading-relaxed text-[11px]">
                A manutenção é extremamente simples e de baixo custo. Consiste basicamente na lavagem anual das placas solares com água para retirar a poeira acumulada, o que pode ser feito pelo próprio proprietário ou técnicos parceiros EcoPower.
              </p>
            </div>

            <div className="space-y-1 text-left">
              <h4 className="font-serif font-black text-slate-800 text-sm flex items-center space-x-1">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Qual a vida útil média dos equipamentos?</span>
              </h4>
              <p className="font-sans leading-relaxed text-[11px]">
                Nossos inversores e painéis possuem certificação internacional e durabilidade projetada de mais de 25 a 30 anos. A eficiência linear de captação é assegurada em contrato por nossa engenharia para se manter acima de 80% mesmo no 25º ano de uso contínuo.
              </p>
            </div>

            <div className="space-y-1 text-left">
              <h4 className="font-serif font-black text-slate-800 text-sm flex items-center space-x-1">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Posso transferir o sistema se eu mudar de imóvel?</span>
              </h4>
              <p className="font-sans leading-relaxed text-[11px]">
                Sim! Embora as placas fotovoltaicas agreguem muito valor de venda ao imóvel original, você pode desinstalar e remontar a estrutura e inversor em sua nova casa sem qualquer impedimento legal, bastando solicitar nova homologação local.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-200 text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center space-x-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-yellow-400 flex items-center justify-center text-white">
              <Sun className="h-4.5 w-4.5 animate-spin" style={{ animationDuration: "40s" }} />
            </div>
            <div className="text-left">
              <span className="font-sans font-black text-[10px] text-slate-800 block uppercase">ECOPOWER SOLAR</span>
              <span className="font-mono text-[7px] text-slate-400 block uppercase">Geração de Futuro</span>
            </div>
          </div>

          <div className="text-center sm:text-right space-y-0.5">
            <p className="font-mono text-[9px] uppercase font-bold text-slate-400">© 2026 ECOPOWER ENERGIA SOLAR S/A</p>
            <p className="font-sans text-[10px]">Laudos de Engenharia em conformidade com as diretrizes vigentes da ANEEL.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
