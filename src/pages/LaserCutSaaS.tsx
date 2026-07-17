import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Shield,
  Key,
  Database,
  FileSpreadsheet,
  Cpu,
  FileDown,
  Upload,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  RefreshCw,
  Plus,
  Trash2,
  Building2,
  UserCheck,
  FileCode,
  Download,
  Flame,
  Layers,
  Sparkles,
  ArrowLeft,
  DollarSign,
  Maximize2,
  Eye,
  Activity,
  UserX
} from "lucide-react";

// Types & Interfaces
interface Tenant {
  id: string;
  name: string;
  cnpj: string;
  color: string;
  logoChar: string;
}

interface Quote {
  id: string;
  partName: string;
  material: string;
  thickness: number; // mm
  perimeter: number; // mm
  piercings: number;
  dimX: number; // mm
  dimY: number; // mm
  weight: number; // kg
  costMaterial: number;
  costMachine: number;
  costGas: number;
  costSetup: number;
  totalPrice: number;
  date: string;
  status: "Rascunho" | "Aprovado" | "Enviado";
}

interface CostParameter {
  material: string;
  thickness: number; // mm
  gasType: "Oxigênio" | "Nitrogênio" | "Ar Comprimido";
  speedMmMin: number;
  machineCostHr: number;
  gasCostM3: number;
  piercingCost: number; // cost per piercing
}

export default function LaserCutSaaS({ onBack }: { onBack: () => void }) {
  // RLS Active Tenants
  const tenants: Tenant[] = [
    { id: "tenant-1", name: "Metalúrgica Alfa S.A.", cnpj: "12.345.678/0001-90", color: "from-[#0052D4] to-[#4364F7]", logoChar: "A" },
    { id: "tenant-2", name: "Corte Rápido Laser Eireli", cnpj: "98.765.432/0001-10", color: "from-[#F37335] to-[#FDC830]", logoChar: "C" },
    { id: "tenant-3", name: "Indústrias Metal-Gama Ltda", cnpj: "45.678.901/0001-22", color: "from-[#11998e] to-[#38ef7d]", logoChar: "G" }
  ];

  const [activeTenant, setActiveTenant] = useState<Tenant>(tenants[0]);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("operador@metalurgicaalfa.com");

  // Simulated Sessions (Session Hijacking prevention simulation)
  const [activeSessions, setActiveSessions] = useState([
    { id: "sess-1", ip: "191.185.12.98", device: "Chrome (Windows 11) - Atual", isCurrent: true, date: "Ativo agora" },
    { id: "sess-2", ip: "177.42.231.15", device: "Safari (iPhone 15)", isCurrent: false, date: "Há 12 minutos (Bloqueado)" }
  ]);
  const [sessionBlockedNotification, setSessionBlockedNotification] = useState<string | null>(null);
  const [showSecurityPanel, setShowSecurityPanel] = useState<boolean>(false);

  // Database State - Filtered by RLS multi-tenant
  const [quotesData, setQuotesData] = useState<Record<string, Quote[]>>({
    "tenant-1": [
      { id: "Q-101", partName: "Suporte Amortecedor Dianteiro", material: "Aço Carbono", thickness: 4.75, perimeter: 1420, piercings: 12, dimX: 320, dimY: 280, weight: 3.4, costMaterial: 38.50, costMachine: 18.20, costGas: 6.80, costSetup: 25.00, totalPrice: 110.50, date: "17 Jul 2026", status: "Aprovado" },
      { id: "Q-102", partName: "Flange de Fixação Tubo 3/4", material: "Inox 304", thickness: 3.00, perimeter: 680, piercings: 4, dimX: 120, dimY: 120, weight: 0.8, costMaterial: 19.20, costMachine: 8.50, costGas: 4.20, costSetup: 25.00, totalPrice: 61.20, date: "16 Jul 2026", status: "Enviado" },
      { id: "Q-103", partName: "Gabarito Alinhador Engrenagem", material: "Alumínio", thickness: 2.00, perimeter: 2150, piercings: 18, dimX: 450, dimY: 410, weight: 1.2, costMaterial: 28.00, costMachine: 24.50, costGas: 11.40, costSetup: 25.00, totalPrice: 112.90, date: "15 Jul 2026", status: "Rascunho" }
    ],
    "tenant-2": [
      { id: "Q-201", partName: "Engrenagem dente reto M4", material: "Aço Carbono", thickness: 6.35, perimeter: 1890, piercings: 8, dimX: 250, dimY: 250, weight: 4.1, costMaterial: 54.00, costMachine: 28.00, costGas: 10.50, costSetup: 30.00, totalPrice: 158.30, date: "17 Jul 2026", status: "Aprovado" },
      { id: "Q-202", partName: "Painel Frontal Rack 19 Pol", material: "Alumínio", thickness: 1.50, perimeter: 3450, piercings: 32, dimX: 482, dimY: 133, weight: 0.6, costMaterial: 22.00, costMachine: 38.20, costGas: 14.80, costSetup: 30.00, totalPrice: 135.00, date: "14 Jul 2026", status: "Enviado" }
    ],
    "tenant-3": [
      { id: "Q-301", partName: "Chapa de Base Pilar Prédio", material: "Aço Carbono", thickness: 12.70, perimeter: 2400, piercings: 4, dimX: 600, dimY: 600, weight: 36.2, costMaterial: 320.00, costMachine: 85.00, costGas: 32.40, costSetup: 45.00, totalPrice: 582.40, date: "16 Jul 2026", status: "Aprovado" }
    ]
  });

  // Current Tenant Quotes
  const currentQuotes = useMemo(() => {
    return quotesData[activeTenant.id] || [];
  }, [quotesData, activeTenant]);

  // Cost Configuration Matrix (Updated via Spreadsheet)
  const [costMatrix, setCostMatrix] = useState<CostParameter[]>([
    { material: "Aço Carbono", thickness: 1.50, gasType: "Oxigênio", speedMmMin: 4200, machineCostHr: 120, gasCostM3: 15, piercingCost: 0.25 },
    { material: "Aço Carbono", thickness: 3.00, gasType: "Oxigênio", speedMmMin: 2800, machineCostHr: 130, gasCostM3: 15, piercingCost: 0.35 },
    { material: "Aço Carbono", thickness: 4.75, gasType: "Oxigênio", speedMmMin: 2100, machineCostHr: 140, gasCostM3: 16, piercingCost: 0.45 },
    { material: "Aço Carbono", thickness: 6.35, gasType: "Oxigênio", speedMmMin: 1600, machineCostHr: 150, gasCostM3: 18, piercingCost: 0.60 },
    { material: "Aço Carbono", thickness: 12.70, gasType: "Oxigênio", speedMmMin: 800, machineCostHr: 180, gasCostM3: 22, piercingCost: 1.20 },
    { material: "Inox 304", thickness: 1.50, gasType: "Nitrogênio", speedMmMin: 6500, machineCostHr: 160, gasCostM3: 28, piercingCost: 0.35 },
    { material: "Inox 304", thickness: 3.00, gasType: "Nitrogênio", speedMmMin: 3400, machineCostHr: 170, gasCostM3: 30, piercingCost: 0.50 },
    { material: "Alumínio", thickness: 1.50, gasType: "Nitrogênio", speedMmMin: 7200, machineCostHr: 150, gasCostM3: 28, piercingCost: 0.30 },
    { material: "Alumínio", thickness: 2.00, gasType: "Nitrogênio", speedMmMin: 5800, machineCostHr: 160, gasCostM3: 28, piercingCost: 0.40 }
  ]);

  // Active DXF Vector processing simulator state
  const [dxfFileName, setDxfFileName] = useState<string | null>(null);
  const [isProcessingDxf, setIsProcessingDxf] = useState(false);
  const [extractedGeometry, setExtractedGeometry] = useState<{
    perimeter: number; // mm
    piercings: number;
    dimX: number; // mm
    dimY: number; // mm
    detectedEntities: number;
  } | null>(null);

  // Active selected quote for calculator / generation
  const [selectedQuoteDetail, setSelectedQuoteDetail] = useState<Quote | null>(null);

  // Custom DXF Drawing preset selection
  const [selectedPreset, setSelectedPreset] = useState<"gear" | "bracket" | "flange" | "grate">("gear");
  const [dxfSourceTab, setDxfSourceTab] = useState<"preset" | "upload">("preset");
  
  // Custom manual calculation state
  const [calcPartName, setCalcPartName] = useState("Engrenagem Especial Táctica");
  const [calcMaterial, setCalcMaterial] = useState("Aço Carbono");
  const [calcThickness, setCalcThickness] = useState(3.00);

  // Multi-tenant configuration mapping (shows RLS logs)
  const [rlsQueryLogs, setRlsQueryLogs] = useState<string[]>([
    "SELECT * FROM quotes WHERE tenant_id = 'tenant-1' LIMIT 50;"
  ]);

  // Session simulator: block multiple access toggle
  const handleSimulateDuplicateSession = () => {
    setSessionBlockedNotification(
      "⚠️ SESSÃO DUPLICADA BLOQUEADA: Outro navegador tentou se autenticar com esta conta em Porto Alegre/RS. Mantendo a sessão atual ativa e bloqueando o intruso automaticamente."
    );
    // Add to logged out list
    setActiveSessions(prev => [
      { id: `sess-${Date.now()}`, ip: "187.54.120.31", device: "Firefox (Linux x86_64)", isCurrent: false, date: "Bloqueado agora" },
      ...prev
    ]);
  };

  // DXF geometric shapes generator
  const getPresetGeometry = (type: "gear" | "bracket" | "flange" | "grate") => {
    switch (type) {
      case "gear":
        return { perimeter: 2180, piercings: 14, dimX: 200, dimY: 200, detectedEntities: 48 };
      case "bracket":
        return { perimeter: 980, piercings: 4, dimX: 180, dimY: 90, detectedEntities: 18 };
      case "flange":
        return { perimeter: 1420, piercings: 8, dimX: 250, dimY: 250, detectedEntities: 32 };
      case "grate":
        return { perimeter: 4890, piercings: 64, dimX: 400, dimY: 400, detectedEntities: 128 };
    }
  };

  // Process sample DXF
  const handleLoadPresetDxf = (preset: "gear" | "bracket" | "flange" | "grate") => {
    setIsProcessingDxf(true);
    setDxfFileName(`desenho_tecnico_${preset}.dxf`);
    setSelectedPreset(preset);

    setTimeout(() => {
      const geo = getPresetGeometry(preset);
      setExtractedGeometry(geo);
      setIsProcessingDxf(false);
      
      // Update custom calculation fields based on DXF geometry
      addRlsLog(`[DXF Parser] Arquivo 'desenho_tecnico_${preset}.dxf' carregado com sucesso. Perímetro: ${geo.perimeter}mm, Furos: ${geo.piercings}, Dimensões: ${geo.dimX}x${geo.dimY}mm.`);
    }, 1200);
  };

  // Drag and drop XLSX simulator
  const [excelUploaded, setExcelUploaded] = useState(false);
  const [excelFileName, setExcelFileName] = useState("");
  const excelInputRef = useRef<HTMLInputElement>(null);

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setExcelFileName(file.name);
      setExcelUploaded(true);
      
      // Add custom parameter matrices simulating reading
      setTimeout(() => {
        setCostMatrix([
          { material: "Aço Carbono", thickness: 1.50, gasType: "Oxigênio", speedMmMin: 4500, machineCostHr: 115, gasCostM3: 14, piercingCost: 0.22 },
          { material: "Aço Carbono", thickness: 3.00, gasType: "Oxigênio", speedMmMin: 3000, machineCostHr: 125, gasCostM3: 14, piercingCost: 0.30 },
          { material: "Aço Carbono", thickness: 4.75, gasType: "Oxigênio", speedMmMin: 2200, machineCostHr: 135, gasCostM3: 15, piercingCost: 0.40 },
          { material: "Aço Carbono", thickness: 6.35, gasType: "Oxigênio", speedMmMin: 1800, machineCostHr: 145, gasCostM3: 17, piercingCost: 0.55 },
          { material: "Aço Carbono", thickness: 12.70, gasType: "Oxigênio", speedMmMin: 900, machineCostHr: 170, gasCostM3: 20, piercingCost: 1.10 },
          { material: "Inox 304", thickness: 1.50, gasType: "Nitrogênio", speedMmMin: 6800, machineCostHr: 155, gasCostM3: 26, piercingCost: 0.32 },
          { material: "Inox 304", thickness: 3.00, gasType: "Nitrogênio", speedMmMin: 3600, machineCostHr: 165, gasCostM3: 28, piercingCost: 0.45 },
          { material: "Alumínio", thickness: 1.50, gasType: "Nitrogênio", speedMmMin: 7500, machineCostHr: 145, gasCostM3: 26, piercingCost: 0.28 },
          { material: "Alumínio", thickness: 2.00, gasType: "Nitrogênio", speedMmMin: 6100, machineCostHr: 155, gasCostM3: 26, piercingCost: 0.38 }
        ]);
        
        addRlsLog(`[Excel Motor] Planilha de Custos '${file.name}' integrada ao Tenant ${activeTenant.name}. 9 registros de matriz atualizados via RLS de escopo de gravação.`);
      }, 800);
    }
  };

  const handleDownloadExcelTemplate = () => {
    // Simulated trigger
    const toastMessage = "✅ Baixando modelo de planilha estruturada para cadastro de materiais.xlsx";
    alert(toastMessage);
  };

  const addRlsLog = (msg: string) => {
    setRlsQueryLogs(prev => [
      `[${new Date().toLocaleTimeString("pt-BR")}] Tenant: ${activeTenant.id} - ${msg}`,
      ...prev.slice(0, 5)
    ]);
  };

  // Core Math - Laser Cut cost formulas
  const calculatedCostDetails = useMemo(() => {
    const geo = extractedGeometry || { perimeter: 1400, piercings: 6, dimX: 200, dimY: 200, detectedEntities: 20 };
    
    // Find parameters in cost matrix matching chosen material and thickness
    // If not found, use default/closest
    const param = costMatrix.find(p => p.material === calcMaterial && Math.abs(p.thickness - calcThickness) < 0.2) 
      || costMatrix[0];

    // Speed in mm/minute. Perimeter is in mm.
    const cuttingTimeMinutes = geo.perimeter / param.speedMmMin;
    const piercingTimeSeconds = 1.2; // average laser piercing time in seconds
    const totalPiercingTimeMinutes = (geo.piercings * piercingTimeSeconds) / 60;
    
    const totalTimeHours = (cuttingTimeMinutes + totalPiercingTimeMinutes) / 60;
    
    // Costs
    const costMachine = Number((totalTimeHours * param.machineCostHr).toFixed(2));
    const costGas = Number((cuttingTimeMinutes * (param.gasCostM3 / 60) * 1.5).toFixed(2)); // gas consumption factor
    const costSetup = 25.00; // standard setup cost

    // Material Weight (approx)
    // Steel density ~7.85g/cm³, Alum ~2.7g/cm³, Inox ~8.0g/cm³
    const density = calcMaterial === "Alumínio" ? 2.7 : calcMaterial === "Inox 304" ? 8.0 : 7.85;
    const volumeCm3 = (geo.dimX / 10) * (geo.dimY / 10) * (calcThickness / 10);
    const weightKg = Number(((volumeCm3 * density) / 1000).toFixed(2));

    // Material Cost per kg: Aço Carbono ~R$ 8/kg, Inox ~R$ 22/kg, Alumínio ~R$ 18/kg
    const pricePerKg = calcMaterial === "Inox 304" ? 24 : calcMaterial === "Alumínio" ? 20 : 9;
    const costMaterial = Number((weightKg * pricePerKg).toFixed(2));

    const costPiercingsSum = Number((geo.piercings * param.piercingCost).toFixed(2));

    const totalCost = costMaterial + costMachine + costGas + costSetup + costPiercingsSum;
    
    // Price with 35% standard margin
    const totalPrice = Number((totalCost * 1.35).toFixed(2));

    return {
      weightKg,
      costMaterial,
      costMachine,
      costGas,
      costSetup,
      costPiercingsSum,
      totalPrice,
      cuttingTimeMinutes: Number(cuttingTimeMinutes.toFixed(2)),
      speedMmMin: param.speedMmMin,
      gasType: param.gasType
    };
  }, [extractedGeometry, calcMaterial, calcThickness, costMatrix]);

  // Action: Add calculated quote to multi-tenant state
  const handleSaveQuote = () => {
    const geo = extractedGeometry || { perimeter: 1400, piercings: 6, dimX: 200, dimY: 200 };
    const newQuote: Quote = {
      id: `Q-${Math.floor(Math.random() * 900) + 100}`,
      partName: calcPartName,
      material: calcMaterial,
      thickness: calcThickness,
      perimeter: geo.perimeter,
      piercings: geo.piercings,
      dimX: geo.dimX,
      dimY: geo.dimY,
      weight: calculatedCostDetails.weightKg,
      costMaterial: calculatedCostDetails.costMaterial,
      costMachine: calculatedCostDetails.costMachine,
      costGas: calculatedCostDetails.costGas,
      costSetup: calculatedCostDetails.costSetup,
      totalPrice: calculatedCostDetails.totalPrice,
      date: "Hoje",
      status: "Rascunho"
    };

    setQuotesData(prev => ({
      ...prev,
      [activeTenant.id]: [newQuote, ...(prev[activeTenant.id] || [])]
    }));

    addRlsLog(`[INSERT] Orçamento '${calcPartName}' salvo com sucesso sob escopo RLS de ${activeTenant.name}.`);
    alert(`🎉 Orçamento '${calcPartName}' gerado com sucesso para ${activeTenant.name}!`);
  };

  // Action: Simulate RLS Change
  const handleTenantSwitch = (tenantId: string) => {
    const selected = tenants.find(t => t.id === tenantId) || tenants[0];
    setActiveTenant(selected);
    setCurrentUserEmail(`operador@${selected.id === "tenant-1" ? "metalurgicaalfa" : selected.id === "tenant-2" ? "corterapidolaser" : "metalgama"}.com`);
    
    setExtractedGeometry(null);
    setDxfFileName(null);
    setExcelUploaded(false);

    // Simulate RLS SQL log in terminal
    setRlsQueryLogs(prev => [
      `[${new Date().toLocaleTimeString("pt-BR")}] CONTEXTO RLS ALTERADO -> SET local.tenant_id = '${tenantId}';`,
      `[${new Date().toLocaleTimeString("pt-BR")}] EXECUTE: SELECT * FROM quotes WHERE tenant_id = CURRENT_SETTING('local.tenant_id');`,
      ...prev.slice(0, 4)
    ]);
  };

  // Action: Generate PDF Report mock download
  const handleDownloadPdf = (quote: Quote) => {
    alert(`📥 PDF de Orçamento Oficial Gerado!\n\nPeça: ${quote.partName}\nMaterial: ${quote.material} ${quote.thickness}mm\nPreço Final: R$ ${quote.totalPrice.toLocaleString("pt-BR")}\n\nEmitido para: ${activeTenant.name}\nSegurança de Integridade: RLS Encrypted Hash SHA-256`);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans relative antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Visual background ambient glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* TOP HEADER BRAND BAR */}
      <header className="border-b border-stone-800 bg-stone-950/80 backdrop-blur-md py-4 px-4 sm:px-8 shrink-0 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-xs font-mono text-stone-400 hover:text-white uppercase tracking-wider bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition border border-stone-800 cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao Portfólio</span>
          </button>

          <div className="flex items-center space-x-3 text-right">
            <div>
              <div className="flex items-center space-x-1.5 justify-end">
                <span className="h-2 w-2 rounded-full bg-[#11998e] animate-ping" />
                <span className="font-sans font-black text-sm text-white tracking-widest uppercase">LASERCUT B2B SAAS</span>
              </div>
              <span className="font-mono text-[9px] text-[#38ef7d] font-bold block uppercase tracking-wider">
                MOTOR ORÇAMENTÁRIO INDUSTRIAL
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* CORE FRAMEWORK */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8 relative z-20 text-left">
        
        {/* UPPER CONSOLE HUD */}
        <div className="bg-gradient-to-br from-stone-900 to-indigo-950/40 border border-stone-800/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-4xl">
            <span className="px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[9px] uppercase tracking-wider font-extrabold inline-block">
              Área do Cliente • Precificação Inteligente
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-amber-200 to-indigo-300">Orçamentos de Corte a Laser</span>
            </h1>
            <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed">
              Carregue seus desenhos técnicos vetoriais DXF para analisar o perímetro e piercing automaticamente. Nosso motor calcula o peso, tempo de máquina e emite propostas comerciais com base na tabela de custos vigente.
            </p>
          </div>
        </div>

        {/* COMPACT HUD BAR - Tenant & Security Status */}
        <div className="p-4 bg-stone-900/30 border border-stone-800/60 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${activeTenant.color} flex items-center justify-center font-serif text-white font-black text-sm shrink-0`}>
              {activeTenant.logoChar}
            </div>
            <div className="text-left">
              <span className="text-[8px] font-mono text-stone-500 uppercase font-black block tracking-wider">Empresa Logada (Escopo RLS)</span>
              <h3 className="font-sans font-bold text-white text-sm">
                {activeTenant.name} 
                <span className="font-mono text-[10px] text-stone-400 font-normal ml-2 hidden sm:inline">CNPJ: {activeTenant.cnpj}</span>
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Session status indicator */}
            <div className="flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-emerald-400 font-mono text-[9px] font-bold uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sessão Única Ativa</span>
            </div>

            {/* Interactive simulator toggle button */}
            <button
              onClick={() => setShowSecurityPanel(!showSecurityPanel)}
              className={`px-4 py-1.5 rounded-xl font-mono text-[10px] font-black uppercase tracking-wider transition border cursor-pointer flex items-center space-x-1.5 ${
                showSecurityPanel 
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.3)]" 
                  : "bg-white/5 border-stone-800 hover:bg-white/10 text-stone-300"
              }`}
            >
              <Shield className="h-3.5 w-3.5" />
              <span>{showSecurityPanel ? "Fechar Simulação RLS" : "Simular RLS / Multi-Tenant"}</span>
            </button>
          </div>
        </div>

        {/* COLLAPSIBLE DIAGNOSTIC SECURITY & RLS SIMULATOR PANEL */}
        <AnimatePresence>
          {showSecurityPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="overflow-hidden space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-stone-900/20 border border-indigo-500/20 p-6 rounded-3xl">
                
                {/* Tenant Switching (RLS Context Indicator) */}
                <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="border-b border-stone-800 pb-2">
                      <div className="flex items-center space-x-2">
                        <Database className="h-4 w-4 text-indigo-400" />
                        <span className="font-mono text-[9px] text-indigo-400 font-bold uppercase tracking-wider block">ROW LEVEL SECURITY (RLS)</span>
                      </div>
                      <h3 className="font-serif font-black text-base text-white mt-1">Isolamento por Empresa</h3>
                    </div>

                    <p className="text-stone-400 font-sans text-[11px] leading-relaxed">
                      Cada empresa locatária (tenant) possui dados e configurações de custos 100% isolados a nível de banco de dados (RLS). Mude a empresa logada abaixo para verificar as propostas mudando dinamicamente:
                    </p>

                    <div className="space-y-2">
                      {tenants.map(t => {
                        const isSelected = t.id === activeTenant.id;
                        return (
                          <button
                            key={t.id}
                            onClick={() => handleTenantSwitch(t.id)}
                            className={`w-full p-3 rounded-xl border text-left transition flex items-center justify-between cursor-pointer ${
                              isSelected 
                                ? "bg-indigo-950/40 border-indigo-500/40 shadow-md" 
                                : "bg-black/30 border-stone-800 hover:border-stone-700"
                            }`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center font-serif text-white font-black text-xs`}>
                                {t.logoChar}
                              </div>
                              <div>
                                <h4 className="font-serif font-bold text-stone-100 text-xs">{t.name}</h4>
                                <span className="font-mono text-[8px] text-stone-500 block font-bold">CNPJ: {t.cnpj}</span>
                              </div>
                            </div>

                            {isSelected && (
                              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-mono font-bold px-2 py-0.5 rounded">
                                ✓ Ativo
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-800 text-[9px] text-stone-400 space-y-0.5">
                    <span className="font-mono text-[8px] text-stone-500 uppercase font-black block">Operador Autenticado:</span>
                    <span className="font-mono text-stone-300 font-bold">{currentUserEmail}</span>
                  </div>
                </div>

                {/* SECURITY & CONCURRENT SESSIONS CONSOLE */}
                <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="border-b border-stone-800 pb-2 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-[#38ef7d]" />
                        <span className="font-mono text-[9px] text-[#38ef7d] font-bold uppercase tracking-wider block">SESSÕES SIMULTÂNEAS</span>
                      </div>
                      <button
                        onClick={handleSimulateDuplicateSession}
                        className="px-2.5 py-1 bg-rose-950/40 hover:bg-rose-900/40 border border-rose-900/40 text-rose-300 rounded-lg font-mono text-[9px] font-bold uppercase tracking-wider cursor-pointer transition flex items-center space-x-1"
                      >
                        <UserX className="h-3 w-3" />
                        <span>Simular Invasor</span>
                      </button>
                    </div>

                    <p className="text-stone-400 font-sans text-[11px] leading-relaxed">
                      Se houver tentativa de login do mesmo operador em localizações ou máquinas separadas, o sistema suspende o segundo acesso, preserva a integridade dos dados e exibe o alerta:
                    </p>

                    {/* Dynamic Warning Notification */}
                    <AnimatePresence>
                      {sessionBlockedNotification && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-rose-950/30 border border-rose-900/50 p-3 rounded-xl flex items-start space-x-2 text-left"
                        >
                          <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <h4 className="font-serif font-bold text-rose-200 text-xs uppercase">Prevenção de Fraude Ativa</h4>
                            <p className="text-stone-300 font-sans text-[10px] leading-relaxed">{sessionBlockedNotification}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Session list */}
                    <div className="space-y-1.5">
                      {activeSessions.map(sess => (
                        <div key={sess.id} className="p-2.5 bg-black/40 border border-stone-800/60 rounded-xl flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-2">
                              <span className="font-mono text-[9px] text-stone-200 font-bold">{sess.device}</span>
                              {sess.isCurrent ? (
                                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[7px] font-mono px-1 py-0.5 rounded">Sua Sessão</span>
                              ) : (
                                <span className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[7px] font-mono px-1 py-0.5 rounded">Bloqueado</span>
                              )}
                            </div>
                            <span className="text-[8px] font-mono text-stone-500 block uppercase font-bold">IP: {sess.ip} • STATUS: {sess.date}</span>
                          </div>
                          <Key className={`h-3.5 w-3.5 ${sess.isCurrent ? "text-emerald-400" : "text-stone-600"}`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SQL Sandbox View (RLS validation) */}
                  <div className="bg-black/70 rounded-xl p-3 border border-stone-800">
                    <span className="font-mono text-[8px] text-[#38ef7d] uppercase font-black tracking-widest block mb-1.5">SQL AUDIT TERMINAL (POSTGRESQL RLS LOGS)</span>
                    <div className="font-mono text-[9px] text-[#38ef7d]/80 space-y-1 select-none leading-relaxed h-[60px] overflow-y-auto pr-1 scrollbar-thin">
                      {rlsQueryLogs.map((log, index) => (
                        <p key={index}>{log}</p>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GEOMETRIC DXF PROCESSOR & COST CALCULATOR ENGINE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="calculator-section">
          
          {/* Left: DXF Parser & 2D Vector View */}
          <div className="lg:col-span-7 bg-stone-900/30 border border-stone-800/80 rounded-3xl p-6 space-y-6">
            
            <div className="border-b border-stone-800/60 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
                  <Cpu className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <span className="font-mono text-[8px] text-indigo-400 font-bold uppercase block tracking-wider">PASSO 1: DESENHO TÉCNICO CAD</span>
                  <h3 className="font-serif font-black text-lg text-white">Análise e Vetorização 2D</h3>
                </div>
              </div>

              {/* Source Tabs */}
              <div className="flex items-center bg-black/40 p-1 rounded-xl border border-stone-800/60 self-start sm:self-auto">
                <button
                  onClick={() => setDxfSourceTab("preset")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${
                    dxfSourceTab === "preset"
                      ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  Modelos
                </button>
                <button
                  onClick={() => setDxfSourceTab("upload")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer ${
                    dxfSourceTab === "upload"
                      ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  Upload DXF
                </button>
              </div>
            </div>

            <p className="text-stone-300 font-sans text-xs leading-relaxed">
              Forneça a geometria 2D da chapa a ser cortada. O motor do LaserCut SaaS realiza o parsing do vetor para computar as métricas necessárias para a precificação.
            </p>

            {/* Render conditional on active tab */}
            {dxfSourceTab === "preset" ? (
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-stone-500 uppercase font-black tracking-wider block">Selecione uma peça de demonstração técnica:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "gear", name: "Engrenagem M4", label: "Complexo" },
                    { id: "bracket", name: "Suporte Angular", label: "Simples" },
                    { id: "flange", name: "Flange Circular", label: "Médio" },
                    { id: "grate", name: "Grelha Filtrante", label: "Muitos Furos" }
                  ].map(p => {
                    const isSelected = selectedPreset === p.id && extractedGeometry && dxfSourceTab === "preset";
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          setDxfSourceTab("preset");
                          handleLoadPresetDxf(p.id as any);
                        }}
                        className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-1.5 cursor-pointer ${
                          isSelected 
                            ? "bg-indigo-950/40 border-indigo-500/40 shadow-md" 
                            : "bg-black/30 border-stone-800 hover:border-stone-700"
                        }`}
                      >
                        <FileCode className={`h-4.5 w-4.5 ${isSelected ? "text-indigo-400 animate-pulse" : "text-stone-500"}`} />
                        <div className="text-center w-full">
                          <span className="font-sans font-bold text-stone-200 text-xs block truncate">{p.name}</span>
                          <span className="font-mono text-[7px] text-stone-500 font-bold block uppercase mt-0.5">{p.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* COMPACT UPLOAD AREA */
              <div className="border border-dashed border-stone-800 hover:border-indigo-500/50 bg-black/30 rounded-2xl p-6 text-center transition relative">
                <Upload className="h-6 w-6 text-stone-500 mx-auto mb-2 animate-pulse" />
                <h4 className="font-serif font-bold text-stone-300 text-xs">Arraste seu desenho técnico (.DXF) aqui</h4>
                <p className="text-stone-500 text-[8px] font-mono uppercase tracking-wider mt-1">Extração Geométrica Instantânea</p>
                
                <input 
                  type="file" 
                  accept=".dxf" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={() => {
                    setDxfSourceTab("upload");
                    handleLoadPresetDxf("gear");
                  }}
                />
              </div>
            )}

            {/* EXTRACED GEOMETRICAL PARSER VIEWER */}
            {isProcessingDxf ? (
              <div className="bg-black/40 p-12 rounded-2xl text-center border border-stone-800/40 flex flex-col items-center justify-center space-y-3">
                <RefreshCw className="h-6 w-6 text-indigo-400 animate-spin" />
                <span className="font-mono text-[9px] text-stone-400 uppercase tracking-widest font-black">LENDO ENTIDADES VETORIAIS DXF...</span>
              </div>
            ) : extractedGeometry ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black/35 border border-stone-800/60 rounded-2xl p-4 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-stone-800/40 pb-2.5">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[8px] text-emerald-400 font-black block uppercase">VETOR DIGITALIZADO ATIVO</span>
                    <h4 className="font-sans font-bold text-stone-200 text-xs">{dxfFileName}</h4>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* 2D Preview Canvas simulator */}
                <div className="aspect-video w-full bg-[#05070f] rounded-xl border border-stone-800/80 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:14px_14px] opacity-30" />
                  
                  {/* Cyber Laser Scanner Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent animate-[pulse_3s_infinite] pointer-events-none" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-indigo-500/20 blur-sm animate-[pulse_1.5s_infinite]" />
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-indigo-500/20 blur-sm animate-[bounce_4s_infinite]" />

                  {/* Dynamic interactive drawing path representation */}
                  <svg className="w-40 h-40 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.4)] z-10" viewBox="0 0 100 100">
                    {selectedPreset === "gear" && (
                      <path 
                        d="M 50,20 A 30,30 0 1,1 49.9,20 Z M 50,35 A 15,15 0 1,0 50.1,35 Z M 50,15 L 50,10 M 50,90 L 50,85 M 15,50 L 10,50 M 90,50 L 85,50" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1" 
                        strokeLinecap="round"
                        className="animate-[spin_60s_linear_infinite]"
                      />
                    )}
                    {selectedPreset === "bracket" && (
                      <path 
                        d="M 20,20 L 80,20 L 80,40 L 40,40 L 40,80 L 20,80 Z M 30,30 A 4,4 0 1,1 29.9,30 Z M 30,70 A 4,4 0 1,1 29.9,70 Z" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1" 
                        strokeLinecap="round"
                      />
                    )}
                    {selectedPreset === "flange" && (
                      <path 
                        d="M 50,10 A 40,40 0 1,1 49.9,10 Z M 50,30 A 20,20 0 1,0 50.1,30 Z M 50,20 A 3,3 0 1,1 49.9,20 Z M 50,80 A 3,3 0 1,1 49.9,80 Z M 20,50 A 3,3 0 1,1 19.9,50 Z M 80,50 A 3,3 0 1,1 79.9,50 Z" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1" 
                      />
                    )}
                    {selectedPreset === "grate" && (
                      <path 
                        d="M 10,10 L 90,10 L 90,90 L 10,90 Z M 20,20 L 40,20 L 40,40 L 20,40 Z M 60,20 L 80,20 L 80,40 L 60,40 Z M 20,60 L 40,60 L 40,80 L 20,80 Z M 60,60 L 80,60 L 80,80 L 60,80 Z" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="1" 
                      />
                    )}
                  </svg>

                  {/* Simulated Red Laser Cutting Head Dot */}
                  <div className="absolute h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-ping z-20" style={{ left: "50%", top: "35%" }} />

                  <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-800 text-[8px] font-mono text-indigo-400 font-bold uppercase z-20">
                    SIMULAÇÃO DE CAMINHO G-CODE
                  </div>
                </div>

                {/* Geometrical variables results */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left">
                  <div className="bg-black/30 p-2.5 rounded-xl border border-stone-800/40">
                    <span className="text-[7px] font-mono text-stone-500 block uppercase font-bold">PERÍMETRO REAL</span>
                    <span className="font-mono font-black text-stone-200 text-xs block mt-0.5">{extractedGeometry.perimeter} mm</span>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-stone-800/40">
                    <span className="text-[7px] font-mono text-stone-500 block uppercase font-bold">FUROS (PIERCINGS)</span>
                    <span className="font-mono font-black text-stone-200 text-xs block mt-0.5">{extractedGeometry.piercings} furos</span>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-stone-800/40">
                    <span className="text-[7px] font-mono text-stone-500 block uppercase font-bold">ÁREA RETÂNGULO</span>
                    <span className="font-mono font-black text-stone-200 text-[10px] block mt-0.5">{extractedGeometry.dimX} x {extractedGeometry.dimY} mm</span>
                  </div>
                  <div className="bg-black/30 p-2.5 rounded-xl border border-stone-800/40">
                    <span className="text-[7px] font-mono text-stone-500 block uppercase font-bold">ENTIDADES VETOR</span>
                    <span className="font-mono font-black text-stone-200 text-xs block mt-0.5">{extractedGeometry.detectedEntities} itens</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-black/20 rounded-2xl p-6 text-center border border-stone-800/40 text-stone-500 font-sans text-xs">
                Selecione uma peça modelo ou envie um DXF para ler as variáveis geométricas.
              </div>
            )}
          </div>

          {/* Right: Cost calculator from DXF variables */}
          <div className="lg:col-span-5 bg-stone-900/30 border border-stone-800/80 rounded-3xl p-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="border-b border-stone-800/60 pb-3">
                <span className="font-mono text-[8px] text-indigo-400 font-bold uppercase block text-left">PASSO 2: ESPECIFICAÇÃO & CUSTOS</span>
                <h3 className="font-serif font-black text-lg text-white mt-1 text-left">Parâmetros de Produção</h3>
              </div>

              <div className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono font-bold text-stone-400 uppercase">Nome ou ID do Lote</label>
                  <input
                    type="text"
                    value={calcPartName}
                    onChange={e => setCalcPartName(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-stone-800/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[9px] font-mono font-bold text-stone-400 uppercase">Material Metálico</label>
                    <select
                      value={calcMaterial}
                      onChange={e => setCalcMaterial(e.target.value)}
                      className="w-full px-3 py-2 bg-black/40 border border-stone-800/80 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="Aço Carbono">Aço Carbono</option>
                      <option value="Inox 304">Inox 304</option>
                      <option value="Alumínio">Alumínio</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] font-mono font-bold text-stone-400 uppercase">Espessura Chapa</label>
                    <select
                      value={calcThickness}
                      onChange={e => setCalcThickness(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-black/40 border border-stone-800/80 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      {calcMaterial === "Aço Carbono" ? (
                        <>
                          <option value="1.50">1.50 mm</option>
                          <option value="3.00">3.00 mm</option>
                          <option value="4.75">4.75 mm</option>
                          <option value="6.35">6.35 mm</option>
                          <option value="12.70">12.70 mm</option>
                        </>
                      ) : calcMaterial === "Inox 304" ? (
                        <>
                          <option value="1.50">1.50 mm</option>
                          <option value="3.00">3.00 mm</option>
                        </>
                      ) : (
                        <>
                          <option value="1.50">1.50 mm</option>
                          <option value="2.00">2.00 mm</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                {/* Calculated Itemized Breakdown */}
                <div className="bg-[#0b0e1a]/85 rounded-2xl p-4 border border-indigo-950/60 space-y-3.5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
                  
                  <span className="text-[7px] font-mono text-indigo-400 uppercase font-black block border-b border-indigo-950/60 pb-2">PROPOSTA COMERCIAL PRELIMINAR</span>
                  
                  <div className="space-y-2.5 text-xs text-stone-300">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-stone-400">Tempo Líquido Corte:</span>
                      <span className="font-mono text-stone-200">{calculatedCostDetails.cuttingTimeMinutes} min <span className="text-stone-500 text-[10px]">({calculatedCostDetails.speedMmMin} mm/min)</span></span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-stone-400">Gás de Assistência:</span>
                      <span className="font-mono text-stone-200">{calculatedCostDetails.gasType} (R$ {calculatedCostDetails.costGas.toFixed(2)})</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-stone-400">Peso Estimado Chapa:</span>
                      <span className="font-mono text-stone-200">{calculatedCostDetails.weightKg} kg (R$ {calculatedCostDetails.costMaterial.toFixed(2)})</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-stone-400">Custo Laser (Piercings):</span>
                      <span className="font-mono text-stone-200">R$ {calculatedCostDetails.costPiercingsSum.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-stone-400">Setup Inicial Lote:</span>
                      <span className="font-mono text-stone-200">R$ {calculatedCostDetails.costSetup.toFixed(2)}</span>
                    </div>

                    <div className="border-t border-indigo-950/80 pt-3 mt-1 flex justify-between items-center">
                      <div>
                        <span className="text-[7px] font-mono text-indigo-400 block uppercase font-extrabold">VALOR ORÇAMENTO</span>
                        <span className="text-[9px] text-stone-400 block">Incluso margem 35%</span>
                      </div>
                      <span className="font-mono font-black text-amber-400 text-xl tracking-tight">R$ {calculatedCostDetails.totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <button
              onClick={handleSaveQuote}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-2xl text-[10px] font-mono font-black uppercase tracking-wider transition-all shadow-[0_4px_12px_rgba(99,102,241,0.2)] hover:shadow-[0_4px_16px_rgba(99,102,241,0.3)] cursor-pointer mt-5"
            >
              Gravar Orçamento no Banco
            </button>
          </div>

        </div>

        {/* MOTOR DE PARÂMETROS VIA EXCEL DRAG & DROP SPREADSHEET */}
        <div className="bg-stone-900/40 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-800 pb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <FileSpreadsheet className="h-5 w-5 text-[#38ef7d]" />
              </div>
              <div className="text-left">
                <span className="font-mono text-[9px] text-stone-500 font-bold uppercase block tracking-wider">MOTOR DE PARÂMETROS EXCEL</span>
                <h3 className="font-serif font-black text-lg text-white mt-0.5">Tabela de Variáveis de Custo Integrada</h3>
              </div>
            </div>

            <div className="flex items-center space-x-2 self-start sm:self-auto">
              <button
                onClick={handleDownloadExcelTemplate}
                className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-mono text-[10px] font-bold uppercase tracking-wide cursor-pointer transition flex items-center space-x-1.5 border border-stone-700/60"
              >
                <Download className="h-4 w-4" />
                <span>Download Modelo Excel</span>
              </button>
            </div>
          </div>

          <p className="text-stone-300 font-sans text-xs leading-relaxed max-w-4xl">
            Em vez de preencher formulários intermináveis no ERP para cadastrar custos, velocidades de avanço do laser por gás ou valores de piercing, basta que o gerente operacional carregue a planilha XLSX/CSV padronizada no painel. O SaaS valida os dados e atualiza a precificação instantaneamente.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Upload Area for xlsx */}
            <div className="lg:col-span-4 bg-black/40 border-2 border-dashed border-stone-800 hover:border-emerald-500/50 p-6 rounded-2xl text-center relative transition">
              <Upload className="h-7 w-7 text-[#38ef7d] mx-auto mb-2" />
              <span className="font-serif font-bold text-stone-200 text-xs block">Carregar Nova Matriz</span>
              <p className="text-stone-500 text-[9px] font-mono uppercase tracking-wider mt-1">
                {excelUploaded ? `Selecionado: ${excelFileName}` : "Arraste arquivo XLSX/CSV ou clique"}
              </p>
              
              <input 
                type="file" 
                ref={excelInputRef}
                accept=".xlsx,.xls,.csv" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleExcelUpload}
              />
            </div>

            {/* Matrix Data Table Representation */}
            <div className="lg:col-span-8 overflow-x-auto border border-stone-800 rounded-2xl bg-black/60 scrollbar-thin">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="bg-stone-900/80 text-stone-400 font-mono text-[9px] uppercase font-bold border-b border-stone-800">
                    <th className="p-3">Material</th>
                    <th className="p-3">Espessura (mm)</th>
                    <th className="p-3">Gás Assistência</th>
                    <th className="p-3">Avanço (mm/min)</th>
                    <th className="p-3">Custo Máquina (R$/h)</th>
                    <th className="p-3">Preço Gás (R$/m³)</th>
                    <th className="p-3">Piercing (R$/furo)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 text-stone-300 font-mono text-[10px]">
                  {costMatrix.slice(0, 5).map((row, idx) => (
                    <tr key={idx} className="hover:bg-stone-900/40">
                      <td className="p-3 text-white font-serif font-bold">{row.material}</td>
                      <td className="p-3">{row.thickness.toFixed(2)} mm</td>
                      <td className="p-3">{row.gasType}</td>
                      <td className="p-3 text-[#38ef7d] font-bold">{row.speedMmMin}</td>
                      <td className="p-3">R$ {row.machineCostHr}</td>
                      <td className="p-3">R$ {row.gasCostM3}</td>
                      <td className="p-3">R$ {row.piercingCost.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-2.5 bg-stone-900/40 text-center border-t border-stone-800 text-[8px] font-mono text-stone-500 font-bold uppercase tracking-widest">
                Exibindo 5 de {costMatrix.length} linhas de parâmetros de custo carregados via planilha
              </div>
            </div>

          </div>

        </div>

        {/* PROPOSAL HUB & PDF EXPORT */}
        <div className="bg-stone-900/40 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-800 pb-3">
            <span className="font-mono text-[9px] text-indigo-400 font-bold uppercase block tracking-wider">COMPILAÇÃO & PDF DE PROPOSTA</span>
            <h3 className="font-serif font-black text-lg text-white mt-0.5">Histórico de Orçamentos Gerados</h3>
          </div>

          {currentQuotes.length === 0 ? (
            <div className="bg-black/30 rounded-2xl p-12 text-center border border-stone-800/60 text-stone-500 font-sans text-xs">
              Nenhum orçamento gravado para {activeTenant.name}. Salve um cálculo acima!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentQuotes.map(quote => (
                <div key={quote.id} className="bg-black/60 border border-stone-800 rounded-2xl p-5 space-y-4 relative overflow-hidden text-left flex flex-col justify-between">
                  
                  {/* Item top header */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-amber-400 font-bold uppercase tracking-wider">{quote.id} • {quote.date}</span>
                      <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[8px] font-mono font-bold uppercase rounded">
                        {quote.status}
                      </span>
                    </div>
                    <h4 className="font-serif font-black text-white text-base leading-tight">{quote.partName}</h4>
                    <p className="font-mono text-[9px] text-stone-400 uppercase font-bold">
                      {quote.material} • {quote.thickness.toFixed(2)}mm • Peso: {quote.weight}kg
                    </p>
                  </div>

                  {/* Geometrics */}
                  <div className="grid grid-cols-3 gap-2 bg-stone-900/40 p-2.5 rounded-xl text-center border border-stone-800/40 font-mono text-[10px] text-stone-300">
                    <div>
                      <span className="text-[7px] text-stone-500 font-bold uppercase block">Perímetro</span>
                      <span className="font-sans font-black">{quote.perimeter} mm</span>
                    </div>
                    <div className="border-x border-stone-800">
                      <span className="text-[7px] text-stone-500 font-bold uppercase block">Furos</span>
                      <span className="font-sans font-black">{quote.piercings}</span>
                    </div>
                    <div>
                      <span className="text-[7px] text-stone-500 font-bold uppercase block">X / Y</span>
                      <span className="font-sans font-black">{quote.dimX}x{quote.dimY} mm</span>
                    </div>
                  </div>

                  {/* Financials and CTA */}
                  <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                    <div>
                      <span className="text-[7px] font-mono text-stone-500 block uppercase font-bold">VALOR FINAL</span>
                      <span className="font-sans font-black text-amber-400 text-base">R$ {quote.totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>

                    <button
                      onClick={() => handleDownloadPdf(quote)}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-mono text-[9px] font-bold uppercase tracking-wider shadow-md transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                      <FileDown className="h-3.5 w-3.5" />
                      <span>Exportar PDF</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </main>

    </div>
  );
}
