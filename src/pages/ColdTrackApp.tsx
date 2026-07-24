import React, { useState, useEffect } from "react";
import {
  Snowflake, Thermometer, Shield, Wrench, AlertTriangle, CheckCircle2,
  Clock, FileText, Building2, Users, Settings, LogOut, Search, Bell,
  Plus, Filter, Grid, List, Download, Printer, QrCode, ArrowLeft,
  ChevronRight, ArrowUpRight, ArrowDownRight, RefreshCw, Calendar,
  MapPin, Phone, Mail, Check, X, Camera, Eye, Edit3, MessageSquare,
  Sparkles, ShieldAlert, AlertCircle, FileCheck, ExternalLink, HardDrive,
  BarChart3, PieChart, Lock, UserCheck, Smartphone, Send, ThumbsUp
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell, BarChart, Bar, Legend
} from "recharts";

interface ColdTrackAppProps {
  onBack?: () => void;
}

// Data Interfaces
interface Equipment {
  id: string;
  code: string; // Patrimônio PAT-00001
  name: string;
  type: string;
  brand: string;
  model: string;
  serialNumber: string;
  unit: string;
  sector: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  status: "operação" | "alerta" | "pendente" | "manutenção";
  lastReadingTime: string;
  lastReadingUser: string;
  nextPreventive: string;
  lastMaintenance: string;
  image: string;
  voltage: string;
  power: string;
  gasType: string;
  gasAmount: string;
  motor: string;
  compressor: string;
  installationDate: string;
  responsible: string;
}

interface ReadingLog {
  id: string;
  date: string;
  time: string;
  equipmentCode: string;
  equipmentName: string;
  temp: number;
  range: string;
  user: string;
  status: "Normal" | "Fora da faixa";
  obs?: string;
}

interface WorkOrder {
  id: string; // OS-2026-0148
  equipmentCode: string;
  equipmentName: string;
  problem: string;
  priority: "Baixa" | "Média" | "Alta" | "Crítica";
  requestedBy: string;
  assignedTo?: string;
  createdTime: string;
  status: "Aberta" | "Em análise" | "Em atendimento" | "Aguardando peça" | "Concluída";
  desc: string;
  updates: { time: string; text: string; author: string }[];
}

interface MaintenanceRecord {
  id: string;
  date: string;
  equipmentCode: string;
  equipmentName: string;
  type: "Preventiva" | "Corretiva" | "Emergencial";
  technician: string;
  service: string;
  cost: number;
  status: "Concluída" | "Pendente" | "Agendada";
}

// Initial Mock Data
const INITIAL_EQUIPMENT: Equipment[] = [
  {
    id: "eq-1",
    code: "PAT-00001",
    name: "Ilha do Açougue 01",
    type: "Ilha Frigorífica",
    brand: "Gelopar",
    model: "GESV-190",
    serialNumber: "SN-998231",
    unit: "Unidade Centro",
    sector: "Açougue",
    currentTemp: -18.2,
    minTemp: -22,
    maxTemp: -16,
    status: "operação",
    lastReadingTime: "Hoje, 08:03",
    lastReadingUser: "Ana Souza",
    nextPreventive: "15/08/2026",
    lastMaintenance: "10/06/2026",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80",
    voltage: "220V / 60Hz",
    power: "1.2 kW",
    gasType: "R404A",
    gasAmount: "850g",
    motor: "Tecumseh 1.5 HP",
    compressor: "Hermético Embraco",
    installationDate: "12/03/2023",
    responsible: "Ana Souza",
  },
  {
    id: "eq-2",
    code: "PAT-00002",
    name: "Ilha de Congelados 02",
    type: "Ilha Frigorífica",
    brand: "Frilux",
    model: "RF-2100",
    serialNumber: "SN-881230",
    unit: "Unidade Centro",
    sector: "Congelados",
    currentTemp: -8.4,
    minTemp: -20,
    maxTemp: -12,
    status: "alerta",
    lastReadingTime: "Hoje, 08:12",
    lastReadingUser: "João Pereira",
    nextPreventive: "04/09/2026",
    lastMaintenance: "05/05/2026",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80",
    voltage: "220V / 60Hz",
    power: "1.8 kW",
    gasType: "R404A",
    gasAmount: "1200g",
    motor: "Danfoss 2.0 HP",
    compressor: "Danfoss Maneurop",
    installationDate: "18/11/2022",
    responsible: "João Pereira",
  },
  {
    id: "eq-3",
    code: "PAT-00003",
    name: "Câmara Fria do Açougue",
    type: "Câmara Fria",
    brand: "Danfoss",
    model: "CF-5000",
    serialNumber: "SN-772190",
    unit: "Unidade Centro",
    sector: "Açougue",
    currentTemp: -4.1,
    minTemp: -6,
    maxTemp: -2,
    status: "pendente",
    lastReadingTime: "Ontem, 07:54",
    lastReadingUser: "Ana Souza",
    nextPreventive: "10/08/2026",
    lastMaintenance: "20/04/2026",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    voltage: "380V Trifásico",
    power: "4.5 kW",
    gasType: "R404A",
    gasAmount: "3500g",
    motor: "Bitzer 5.0 HP",
    compressor: "Semi-hermético Bitzer",
    installationDate: "05/01/2021",
    responsible: "Ana Souza",
  },
  {
    id: "eq-4",
    code: "PAT-00004",
    name: "Freezer de Sorvetes 03",
    type: "Freezer Horizontal",
    brand: "Metalfrio",
    model: "DA550",
    serialNumber: "SN-665412",
    unit: "Unidade Campolim",
    sector: "Sorvetes",
    currentTemp: -19.6,
    minTemp: -22,
    maxTemp: -18,
    status: "operação",
    lastReadingTime: "Hoje, 07:48",
    lastReadingUser: "Maria Santos",
    nextPreventive: "28/07/2026",
    lastMaintenance: "15/02/2026",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
    voltage: "220V",
    power: "0.8 kW",
    gasType: "R134a",
    gasAmount: "450g",
    motor: "Embraco 1.0 HP",
    compressor: "Embraco EGAS",
    installationDate: "10/08/2023",
    responsible: "Maria Santos",
  },
  {
    id: "eq-5",
    code: "PAT-00005",
    name: "Expositor de Bebidas 01",
    type: "Expositor Vertical",
    brand: "Imbera",
    model: "VR-17",
    serialNumber: "SN-554109",
    unit: "Unidade Zona Norte",
    sector: "Bebidas",
    currentTemp: 3.7,
    minTemp: 2,
    maxTemp: 6,
    status: "operação",
    lastReadingTime: "Hoje, 08:20",
    lastReadingUser: "Lucas Alves",
    nextPreventive: "20/09/2026",
    lastMaintenance: "18/06/2026",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    voltage: "127V / 60Hz",
    power: "0.6 kW",
    gasType: "R290 Ecológico",
    gasAmount: "120g",
    motor: "Embraco Fullmotion",
    compressor: "Inverter R290",
    installationDate: "14/02/2024",
    responsible: "Lucas Alves",
  },
  {
    id: "eq-6",
    code: "PAT-00006",
    name: "Freezer de Frios 01",
    type: "Freezer Vertical",
    brand: "Gelopar",
    model: "GPTU-40",
    serialNumber: "SN-443210",
    unit: "Unidade Centro",
    sector: "Frios",
    currentTemp: -15.8,
    minTemp: -18,
    maxTemp: -14,
    status: "manutenção",
    lastReadingTime: "Hoje, 06:58",
    lastReadingUser: "Carlos Mendes",
    nextPreventive: "Suspensa",
    lastMaintenance: "05/07/2026",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80",
    voltage: "220V",
    power: "1.1 kW",
    gasType: "R404A",
    gasAmount: "700g",
    motor: "Tecumseh 1.2 HP",
    compressor: "Tecumseh L'Unite",
    installationDate: "30/09/2022",
    responsible: "Carlos Mendes",
  }
];

const INITIAL_READINGS: ReadingLog[] = [
  { id: "r-1", date: "24/07/2026", time: "08:03", equipmentCode: "PAT-00001", equipmentName: "Ilha do Açougue 01", temp: -18.2, range: "-22 a -16 °C", user: "Ana Souza", status: "Normal" },
  { id: "r-2", date: "24/07/2026", time: "08:12", equipmentCode: "PAT-00002", equipmentName: "Ilha de Congelados 02", temp: -8.4, range: "-20 a -12 °C", user: "João Pereira", status: "Fora da faixa", obs: "Porta com vedação ligeiramente frouxa" },
  { id: "r-3", date: "24/07/2026", time: "07:48", equipmentCode: "PAT-00004", equipmentName: "Freezer de Sorvetes 03", temp: -19.6, range: "-22 a -18 °C", user: "Maria Santos", status: "Normal" },
  { id: "r-4", date: "24/07/2026", time: "08:20", equipmentCode: "PAT-00005", equipmentName: "Expositor de Bebidas 01", temp: 3.7, range: "2 a 6 °C", user: "Lucas Alves", status: "Normal" },
  { id: "r-5", date: "23/07/2026", time: "07:54", equipmentCode: "PAT-00003", equipmentName: "Câmara Fria do Açougue", temp: -4.1, range: "-6 a -2 °C", user: "Ana Souza", status: "Normal" },
  { id: "r-6", date: "23/07/2026", time: "08:15", equipmentCode: "PAT-00002", equipmentName: "Ilha de Congelados 02", temp: -11.2, range: "-20 a -12 °C", user: "João Pereira", status: "Fora da faixa" },
];

const INITIAL_WORK_ORDERS: WorkOrder[] = [
  {
    id: "OS-2026-0148",
    equipmentCode: "PAT-00002",
    equipmentName: "Ilha de Congelados 02",
    problem: "Temperatura acima da faixa permitida (-8,4 °C)",
    priority: "Alta",
    requestedBy: "João Pereira",
    assignedTo: "Carlos Lima",
    createdTime: "24/07/2026 às 08:15",
    status: "Aberta",
    desc: "O equipamento apresentou aumento de temperatura no início da manhã. Verificada possível falha no micromotor do evaporador.",
    updates: [
      { time: "08:15", text: "OS aberta por João Pereira através do registro de temperatura.", author: "João Pereira" },
      { time: "08:30", text: "Classificada como prioridade alta pelo supervisor Marcos Oliveira.", author: "Marcos Oliveira" },
    ]
  },
  {
    id: "OS-2026-0147",
    equipmentCode: "PAT-00006",
    equipmentName: "Freezer de Frios 01",
    problem: "Compressor desligando após alguns minutos de funcionamento",
    priority: "Crítica",
    requestedBy: "Carlos Mendes",
    assignedTo: "Carlos Lima",
    createdTime: "23/07/2026 às 16:40",
    status: "Em atendimento",
    desc: "Disjuntor do compressor armando proteção por sobrecorrente.",
    updates: [
      { time: "23/07 16:40", text: "OS criada emergencialmente.", author: "Carlos Mendes" },
      { time: "24/07 07:00", text: "Técnico Carlos Lima no local realizando diagnósticos elétricos.", author: "Carlos Lima" },
    ]
  },
  {
    id: "OS-2026-0146",
    equipmentCode: "PAT-00005",
    equipmentName: "Expositor de Bebidas 02",
    problem: "Ruído excessivo no motor do ventilador superior",
    priority: "Média",
    requestedBy: "Maria Santos",
    assignedTo: "Bruno Lopes",
    createdTime: "22/07/2026 às 10:22",
    status: "Aguardando peça",
    desc: "Rolamento do exaustor desgastado gerando barulho anormal.",
    updates: [
      { time: "22/07 10:22", text: "Solicitação registrada.", author: "Maria Santos" },
      { time: "22/07 14:00", text: "Peça de reposição (Rolamento 6201) encomendada do distribuidor.", author: "Bruno Lopes" },
    ]
  },
  {
    id: "OS-2026-0145",
    equipmentCode: "PAT-00003",
    equipmentName: "Câmara Fria 02",
    problem: "Formação excessiva de gelo na colméia do evaporador",
    priority: "Média",
    requestedBy: "Ana Souza",
    assignedTo: "Carlos Lima",
    createdTime: "20/07/2026 às 09:11",
    status: "Concluída",
    desc: "Resistência de degelo queimada provocando bloqueio por gelo.",
    updates: [
      { time: "20/07 09:11", text: "Abertura de chamado técnico.", author: "Ana Souza" },
      { time: "21/07 11:30", text: "Resistência substituída e sistema testado em ciclo completo.", author: "Carlos Lima" },
    ]
  }
];

const INITIAL_MAINTENANCE: MaintenanceRecord[] = [
  { id: "m-1", date: "10/06/2026", equipmentCode: "PAT-00001", equipmentName: "Ilha do Açougue 01", type: "Preventiva", technician: "Carlos Lima", service: "Limpeza de condensadora, reaperto elétrico e verificação de carga de gás", cost: 280, status: "Concluída" },
  { id: "m-2", date: "18/06/2026", equipmentCode: "PAT-00005", equipmentName: "Expositor de Bebidas 01", type: "Corretiva", technician: "Bruno Lopes", service: "Troca do termostato digital e calibração de sensor NTC", cost: 430, status: "Concluída" },
  { id: "m-3", date: "05/07/2026", equipmentCode: "PAT-00006", equipmentName: "Freezer de Frios 01", type: "Corretiva", technician: "Carlos Lima", service: "Recarga de gás R404A e solda de microvazamento", cost: 680, status: "Concluída" },
  { id: "m-4", date: "24/07/2026", equipmentCode: "PAT-00002", equipmentName: "Ilha de Congelados 02", type: "Emergencial", technician: "A definir", service: "Diagnóstico de temperatura fora da faixa (-8,4 °C)", cost: 0, status: "Pendente" },
  { id: "m-5", date: "28/07/2026", equipmentCode: "PAT-00004", equipmentName: "Freezer de Sorvetes 03", type: "Preventiva", technician: "Bruno Lopes", service: "Revisão programada semestral de gaxetas e lubrificação", cost: 300, status: "Agendada" },
];

export default function ColdTrackApp({ onBack }: ColdTrackAppProps) {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [loginEmail, setLoginEmail] = useState("admin@coldtrack.com.br");
  const [loginPassword, setLoginPassword] = useState("123456");

  // Navigation State
  const [activeMenu, setActiveMenu] = useState<
    | "dashboard"
    | "equipments"
    | "equipment_detail"
    | "qr_mobile_view"
    | "readings"
    | "work_orders"
    | "maintenances"
    | "alerts"
    | "reports"
    | "companies"
    | "users"
    | "settings"
  >("dashboard");

  // Global Context State
  const [selectedUnit, setSelectedUnit] = useState<string>("Unidade Centro");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Data Collections
  const [equipments, setEquipments] = useState<Equipment[]>(INITIAL_EQUIPMENT);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment>(INITIAL_EQUIPMENT[0]);
  const [readings, setReadings] = useState<ReadingLog[]>(INITIAL_READINGS);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(INITIAL_WORK_ORDERS);
  const [maintenances, setMaintenances] = useState<MaintenanceRecord[]>(INITIAL_MAINTENANCE);

  // Modals & Interactive Actions State
  const [showNewEquipmentModal, setShowNewEquipmentModal] = useState(false);
  const [showReadingModal, setShowReadingModal] = useState(false);
  const [readingTargetEquipment, setReadingTargetEquipment] = useState<Equipment | null>(null);
  const [inputTemp, setInputTemp] = useState<number>(-18.0);
  const [inputTempObs, setInputTempObs] = useState<string>("");

  const [showNewOSModal, setShowNewOSModal] = useState(false);
  const [newOSProblem, setNewOSProblem] = useState("");
  const [newOSPriority, setNewOSPriority] = useState<"Baixa" | "Média" | "Alta" | "Crítica">("Média");
  const [newOSDesc, setNewOSDesc] = useState("");

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === "admin@coldtrack.com.br" && loginPassword === "123456") {
      setIsAuthenticated(true);
      triggerToast("Acesso concedido com sucesso! Bem-vindo ao ColdTrack.");
    } else {
      alert("Credenciais incorretas! Utilize admin@coldtrack.com.br e senha 123456.");
    }
  };

  // Register New Reading
  const handleSaveReading = (e: React.FormEvent) => {
    e.preventDefault();
    if (!readingTargetEquipment) return;

    const isOutOfRange = inputTemp < readingTargetEquipment.minTemp || inputTemp > readingTargetEquipment.maxTemp;
    const newStatus: "Normal" | "Fora da faixa" = isOutOfRange ? "Fora da faixa" : "Normal";

    const newReading: ReadingLog = {
      id: `r-${Date.now()}`,
      date: "24/07/2026",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      equipmentCode: readingTargetEquipment.code,
      equipmentName: readingTargetEquipment.name,
      temp: Number(inputTemp),
      range: `${readingTargetEquipment.minTemp} a ${readingTargetEquipment.maxTemp} °C`,
      user: "Ana Souza",
      status: newStatus,
      obs: inputTempObs
    };

    setReadings([newReading, ...readings]);

    // Update equipment current temp & status
    setEquipments(equipments.map(eq => {
      if (eq.code === readingTargetEquipment.code) {
        return {
          ...eq,
          currentTemp: Number(inputTemp),
          status: isOutOfRange ? "alerta" : "operação",
          lastReadingTime: `Hoje, ${newReading.time}`,
          lastReadingUser: "Ana Souza"
        };
      }
      return eq;
    }));

    setShowReadingModal(false);

    if (isOutOfRange) {
      if (confirm(`Atenção: A temperatura (${inputTemp} °C) está FORA DA FAIXA (${readingTargetEquipment.minTemp} a ${readingTargetEquipment.maxTemp} °C).\n\nDeseja abrir uma Ordem de Serviço de emergência imediatamente?`)) {
        setNewOSProblem(`Temperatura fora da faixa recomendada (${inputTemp} °C)`);
        setNewOSPriority("Alta");
        setNewOSDesc(`Leitura registrada fora do padrão em 24/07/2026 às ${newReading.time}. Observação do operador: ${inputTempObs || "Nenhuma"}`);
        setShowNewOSModal(true);
      } else {
        triggerToast("Leitura registrada com alerta ativado!");
      }
    } else {
      triggerToast("Leitura de temperatura registrada com sucesso!");
    }
  };

  // Create Work Order
  const handleSaveWorkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const targetEq = readingTargetEquipment || selectedEquipment;

    const newOS: WorkOrder = {
      id: `OS-2026-0${149 + workOrders.length}`,
      equipmentCode: targetEq.code,
      equipmentName: targetEq.name,
      problem: newOSProblem || "Problema técnico geral no sistema de refrigeração",
      priority: newOSPriority,
      requestedBy: "Marcos Oliveira",
      assignedTo: "Carlos Lima",
      createdTime: `24/07/2026 às ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      status: "Aberta",
      desc: newOSDesc || "Abertura de ordem de serviço pelo painel do operador.",
      updates: [
        { time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: "Ordem de serviço aberta pelo supervisor Marcos Oliveira.", author: "Marcos Oliveira" }
      ]
    };

    setWorkOrders([newOS, ...workOrders]);
    setShowNewOSModal(false);
    setNewOSProblem("");
    setNewOSDesc("");
    triggerToast(`Ordem de Serviço ${newOS.id} gerada com sucesso!`);
  };

  // Chart Data
  const weeklyTempData = [
    { day: "Segunda", temp: -14.5, limit: -12 },
    { day: "Terça", temp: -14.1, limit: -12 },
    { day: "Quarta", temp: -13.8, limit: -12 },
    { day: "Quinta", temp: -13.9, limit: -12 },
    { day: "Sexta", temp: -11.6, limit: -12 },
    { day: "Sábado", temp: -13.7, limit: -12 },
    { day: "Domingo", temp: -13.8, limit: -12 },
  ];

  const statusDonutData = [
    { name: "Em operação", value: 24, color: "#16A34A" },
    { name: "Em alerta", value: 3, color: "#DC2626" },
    { name: "Em manutenção", value: 1, color: "#1677FF" },
  ];

  const unitReadingsBarData = [
    { unit: "Centro", leituras: 21 },
    { unit: "Campolim", leituras: 16 },
    { unit: "Zona Norte", leituras: 13 },
    { unit: "CD Votorantim", leituras: 9 },
  ];

  // If not authenticated, render Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F2747] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        
        {/* BACKGROUND GLOW DECORATION */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-4xl bg-white text-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10">
          
          {/* LEFT BRAND PANEL */}
          <div className="bg-gradient-to-br from-[#0F2747] via-[#1677FF] to-[#0A192F] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-cyan-300 shadow-xl">
                  <Snowflake className="h-7 w-7 animate-spin-slow" />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-wider uppercase">COLD<span className="text-cyan-300">TRACK</span></h1>
                  <span className="text-[10px] font-mono text-cyan-200 tracking-widest font-semibold block uppercase">Gestão Inteligente de Equipamentos</span>
                </div>
              </div>

              <div className="pt-8 space-y-4">
                <h2 className="text-2xl font-bold leading-tight">
                  Controle total da sua cadeia do frio em tempo real.
                </h2>
                <p className="text-xs text-blue-100/80 leading-relaxed font-medium">
                  Monitoramento preventivo de temperaturas, identificação patrimonial por QR Code e ordens de serviço automatizadas.
                </p>
              </div>
            </div>

            <div className="pt-8 text-[11px] text-blue-200/70 border-t border-white/10 relative z-10">
              © 2026 ColdTrack Systems. Todos os direitos reservados.
            </div>
          </div>

          {/* RIGHT LOGIN FORM */}
          <div className="p-8 md:p-12 flex flex-col justify-center space-y-6 text-left">
            <div>
              <h3 className="text-2xl font-black text-[#0F2747]">Acessar o Sistema</h3>
              <p className="text-xs text-slate-500 mt-1">Informe suas credenciais corporativas para continuar.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">E-mail corporativo</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1677FF] focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Senha de acesso</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1677FF] focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#1677FF]" />
                  <span>Lembrar meu acesso</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Enviado e-mail de redefinição de senha para o usuário."); }} className="text-[#1677FF] hover:underline font-bold">
                  Esqueci minha senha
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1677FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Entrar no Sistema</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </form>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-[#0F2747] block">Acesso Demonstrativo:</span>
              <div>E-mail: <code className="font-mono text-blue-700 font-bold">admin@coldtrack.com.br</code></div>
              <div>Senha: <code className="font-mono text-blue-700 font-bold">123456</code></div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-800 font-sans flex flex-col lg:flex-row relative">
      
      {/* FLOATING TOAST BANNER */}
      {toastMsg && (
        <div className="fixed top-4 right-4 z-50 bg-[#0F2747] text-white px-4 py-3 rounded-2xl shadow-2xl border border-blue-400 text-xs font-bold flex items-center space-x-2 animate-bounce">
          <Sparkles className="h-4 w-4 text-cyan-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-64 bg-[#0F2747] text-slate-200 flex flex-col justify-between shrink-0 shadow-xl z-20">
        <div>
          
          {/* SIDEBAR HEADER BRAND LOGO */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveMenu("dashboard")}>
              <div className="w-10 h-10 rounded-xl bg-[#1677FF] flex items-center justify-center text-cyan-300 shadow-md">
                <Snowflake className="h-6 w-6" />
              </div>
              <div>
                <span className="font-black text-lg text-white tracking-widest block uppercase leading-none">COLD<span className="text-cyan-300">TRACK</span></span>
                <span className="text-[9px] font-mono text-blue-200 tracking-wider uppercase font-semibold">Gestão de Refrigeração</span>
              </div>
            </div>

            {onBack && (
              <button
                onClick={onBack}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title="Voltar ao Portfólio Augusto Dev"
              >
                <ArrowLeft className="h-4 w-4 text-cyan-300" />
              </button>
            )}
          </div>

          {/* SIDEBAR MENU ITEMS */}
          <nav className="p-3 space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "equipments", label: "Equipamentos", icon: HardDrive },
              { id: "readings", label: "Leituras de Temp.", icon: Thermometer },
              { id: "work_orders", label: "Ordens de Serviço", icon: FileText },
              { id: "maintenances", label: "Manutenções", icon: Wrench },
              { id: "alerts", label: "Central de Alertas", icon: AlertTriangle, badge: "3" },
              { id: "reports", label: "Relatórios", icon: PieChart },
              { id: "companies", label: "Empresas & Unidades", icon: Building2 },
              { id: "users", label: "Gestão de Usuários", icon: Users },
              { id: "settings", label: "Configurações", icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id as any)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? "bg-[#1677FF] text-white shadow-md font-extrabold"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* SIDEBAR FOOTER USER PROFILE */}
        <div className="p-4 border-t border-white/10 bg-[#0A192F]/60 flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-[#1677FF] font-bold text-white flex items-center justify-center text-xs shrink-0">
              MO
            </div>
            <div className="truncate text-left">
              <span className="font-bold text-xs text-white block truncate">Marcos Oliveira</span>
              <span className="text-[10px] text-blue-200/70 block truncate">Administrador Geral</span>
            </div>
          </div>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="p-2 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Sair do sistema"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP HEADER BAR */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-start">
            <div>
              <h2 className="text-base font-black text-[#0F2747]">
                Olá, Marcos!
              </h2>
              <span className="text-[11px] text-slate-500 block">
                Acompanhe a operação dos equipamentos refrigerados da sua empresa.
              </span>
            </div>

            {/* QUICK MOBILE QR SIMULATOR TRIGGER */}
            <button
              onClick={() => setActiveMenu("qr_mobile_view")}
              className="px-3 py-1.5 bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
              title="Simular Leitura QR Code no Celular"
            >
              <Smartphone className="h-4 w-4" />
              <span className="hidden md:inline">Simular QR Code</span>
            </button>
          </div>

          {/* UNIT SELECTOR & ACTIONS */}
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="bg-slate-100 border border-slate-200 rounded-xl pl-8 pr-4 py-1.5 text-xs text-slate-700 font-bold focus:outline-none focus:border-[#1677FF]"
              >
                <option value="Unidade Centro">Unidade Centro - Sorocaba/SP</option>
                <option value="Unidade Campolim">Unidade Campolim - Sorocaba/SP</option>
                <option value="Unidade Zona Norte">Unidade Zona Norte - Sorocaba/SP</option>
                <option value="CD Votorantim">Centro de Distribuição - Votorantim/SP</option>
              </select>
            </div>

            <button
              onClick={() => setActiveMenu("alerts")}
              className="relative p-2 text-slate-600 hover:text-[#1677FF] bg-slate-100 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>
          </div>
        </header>

        {/* PAGE CONTENT SWITCHER */}
        <div className="p-6 space-y-8">

          {/* ================= 1. DASHBOARD ================= */}
          {activeMenu === "dashboard" && (
            <div className="space-y-8 animate-fade-in text-left">
              
              {/* INDICATOR STAT CARDS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                {[
                  { title: "Equipamentos Cadastrados", val: "28", info: "24 em operação", icon: HardDrive, color: "text-[#1677FF]", bg: "bg-blue-50" },
                  { title: "Leituras Realizadas Hoje", val: "21 / 28", info: "75% concluído", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
                  { title: "Equipamentos em Alerta", val: "3", info: "Requerem atenção", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
                  { title: "Manutenções em Aberto", val: "4", info: "1 com prioridade alta", icon: Wrench, color: "text-amber-600", bg: "bg-amber-50" },
                  { title: "Temperatura Média", val: "-13,8 °C", info: "Dentro do padrão", icon: Thermometer, color: "text-cyan-600", bg: "bg-cyan-50" },
                  { title: "Preventivas Programadas", val: "5", info: "Próximos 30 dias", icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-50" },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500">{stat.title}</span>
                        <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="text-2xl font-black text-[#0F2747]">{stat.val}</div>
                      <span className="text-[10px] text-slate-400 font-semibold block">{stat.info}</span>
                    </div>
                  );
                })}
              </div>

              {/* CHARTS ROW */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 7-DAY TEMPERATURE CHART */}
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-base text-[#0F2747]">Temperatura Média dos Últimos 7 Dias</h3>
                      <span className="text-xs text-slate-500">Acompanhamento contínuo vs. limite máximo permitido (-12 °C)</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">
                      Sexta-feira fora da faixa (-11,6 °C)
                    </span>
                  </div>

                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyTempData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748B" }} />
                        <YAxis domain={[-16, -10]} tick={{ fontSize: 11, fill: "#64748B" }} unit="°C" />
                        <Tooltip formatter={(value: any) => [`${value} °C`, "Temperatura"]} />
                        <Line type="monotone" dataKey="temp" name="Temp. Registrada" stroke="#1677FF" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="limit" name="Limite Máximo (-12°C)" stroke="#DC2626" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* DONUT STATUS CHART */}
                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-base text-[#0F2747]">Status dos Equipamentos</h3>
                    <span className="text-xs text-slate-500">Distribuição operacional atual</span>
                  </div>

                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={statusDonutData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {statusDonutData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RePieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    {statusDonutData.map((st, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: st.color }} />
                          <span className="text-slate-600 font-bold">{st.name}</span>
                        </div>
                        <span className="font-mono font-black text-[#0F2747]">{st.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ALERTS & RECENT ACTIVITIES ROW */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* RECENT ALERTS */}
                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-base text-[#0F2747] flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span>Alertas Recentes da Unidade</span>
                    </h3>
                    <button
                      onClick={() => setActiveMenu("alerts")}
                      className="text-xs font-extrabold text-[#1677FF] hover:underline cursor-pointer"
                    >
                      Ver Todos os Alertas →
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-800 text-xs">Ilha de Congelados 02 (PAT-00002)</span>
                          <span className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">CRÍTICO</span>
                        </div>
                        <p className="text-xs text-red-700 font-semibold">Temperatura acima do limite permitido: <strong>-8,4 °C</strong> (Máx: -12 °C)</p>
                        <span className="text-[10px] text-slate-400 font-mono">Horário: Hoje, 08:12 por João Pereira</span>
                      </div>

                      <button
                        onClick={() => {
                          setReadingTargetEquipment(equipments[1]);
                          setShowNewOSModal(true);
                        }}
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
                      >
                        Abrir OS
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-800 text-xs">Câmara Fria do Açougue (PAT-00003)</span>
                          <span className="bg-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">PENDENTE</span>
                        </div>
                        <p className="text-xs text-amber-800 font-semibold">Leitura diária ainda não realizada hoje.</p>
                        <span className="text-[10px] text-slate-400 font-mono">Última leitura: Ontem, 07:54 por Ana Souza</span>
                      </div>

                      <button
                        onClick={() => {
                          setReadingTargetEquipment(equipments[2]);
                          setShowReadingModal(true);
                        }}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
                      >
                        Registrar
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-800 text-xs">Freezer de Sorvetes 03 (PAT-00004)</span>
                          <span className="bg-[#1677FF] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">PREVENTIVA</span>
                        </div>
                        <p className="text-xs text-blue-800 font-semibold">Manutenção preventiva agendada próxima.</p>
                        <span className="text-[10px] text-slate-400 font-mono">Vencimento: 28/07/2026</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RECENT ACTIVITY TIMELINE */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <h3 className="font-black text-base text-[#0F2747] flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-[#1677FF]" />
                    <span>Atividade Recente do Sistema</span>
                  </h3>

                  <div className="space-y-3.5 text-xs text-slate-600">
                    {[
                      { time: "08:20", text: "Lucas Alves registrou 3,7 °C no Expositor de Bebidas 01." },
                      { time: "08:12", text: "Alerta detectado na Ilha de Congelados 02 (-8,4 °C)." },
                      { time: "08:03", text: "Ana Souza registrou -18,2 °C na Ilha do Açougue 01." },
                      { time: "07:00", text: "Técnico Carlos Lima iniciou atendimento na OS-2026-0147." },
                      { time: "Ontem 16:40", text: "Ordem de serviço OS-2026-0147 aberta para Freezer de Frios 01." },
                    ].map((act, i) => (
                      <div key={i} className="flex items-start space-x-3 pb-2.5 border-b border-slate-100 last:border-0">
                        <span className="font-mono font-bold text-[10px] text-[#1677FF] bg-blue-50 px-2 py-0.5 rounded shrink-0">
                          {act.time}
                        </span>
                        <p className="font-medium text-slate-700">{act.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ================= 2. EQUIPMENTS LIST ================= */}
          {activeMenu === "equipments" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-[#0F2747]">Gestão de Equipamentos</h1>
                  <p className="text-xs text-slate-500">Gerencie todos os ativos de refrigeração cadastrados e seus patrimônios.</p>
                </div>

                <button
                  onClick={() => setShowNewEquipmentModal(true)}
                  className="px-4 py-2.5 bg-[#1677FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Cadastrar Equipamento</span>
                </button>
              </div>

              {/* SEARCH & FILTERS BAR */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nome ou patrimônio (PAT-...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#1677FF]"
                  />
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                  <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700">
                    <option>Todos os Setores</option>
                    <option>Açougue</option>
                    <option>Congelados</option>
                    <option>Sorvetes</option>
                    <option>Bebidas</option>
                  </select>

                  <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700">
                    <option>Todos os Status</option>
                    <option>Em Operação</option>
                    <option>Em Alerta</option>
                    <option>Leitura Pendente</option>
                    <option>Em Manutenção</option>
                  </select>
                </div>
              </div>

              {/* EQUIPMENT CARDS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {equipments
                  .filter(eq => eq.name.toLowerCase().includes(searchTerm.toLowerCase()) || eq.code.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((eq) => {
                    return (
                      <div key={eq.id} className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                        <div>
                          <div className="relative aspect-video overflow-hidden bg-slate-900">
                            <img src={eq.image} alt={eq.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            
                            <span className="absolute top-3 left-3 bg-[#0F2747] text-cyan-300 font-mono text-[10px] font-black px-2.5 py-1 rounded-md border border-cyan-400/30">
                              {eq.code}
                            </span>

                            {eq.status === "operação" && (
                              <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow uppercase">
                                Em Operação
                              </span>
                            )}
                            {eq.status === "alerta" && (
                              <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow uppercase animate-pulse">
                                Em Alerta
                              </span>
                            )}
                            {eq.status === "pendente" && (
                              <span className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow uppercase">
                                Leitura Pendente
                              </span>
                            )}
                            {eq.status === "manutenção" && (
                              <span className="absolute top-3 right-3 bg-[#1677FF] text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow uppercase">
                                Em Manutenção
                              </span>
                            )}

                            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                              <div>
                                <span className="text-[10px] text-slate-300 block">{eq.type} • {eq.sector}</span>
                                <h3 className="font-extrabold text-sm leading-tight">{eq.name}</h3>
                              </div>
                              <div className="text-right font-mono">
                                <span className="text-xs text-slate-300 block">Temp. Atual</span>
                                <span className={`text-lg font-black ${eq.status === "alerta" ? "text-red-400" : "text-cyan-300"}`}>
                                  {eq.currentTemp} °C
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 space-y-2 text-xs text-slate-600">
                            <div className="flex justify-between border-b border-slate-100 pb-2">
                              <span className="text-slate-500">Faixa Recomendada:</span>
                              <span className="font-mono font-bold text-slate-800">{eq.minTemp} °C a {eq.maxTemp} °C</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-2">
                              <span className="text-slate-500">Última Leitura:</span>
                              <span className="font-bold text-slate-800">{eq.lastReadingTime}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">Próxima Preventiva:</span>
                              <span className="font-bold text-[#1677FF]">{eq.nextPreventive}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              setSelectedEquipment(eq);
                              setActiveMenu("equipment_detail");
                            }}
                            className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
                          >
                            Ver Detalhes
                          </button>

                          <button
                            onClick={() => {
                              setReadingTargetEquipment(eq);
                              setInputTemp(eq.currentTemp);
                              setShowReadingModal(true);
                            }}
                            className="py-2 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
                          >
                            Registrar Temp
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* ================= 3. EQUIPMENT DETAIL VIEW ================= */}
          {activeMenu === "equipment_detail" && selectedEquipment && (
            <div className="space-y-6 animate-fade-in text-left">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveMenu("equipments")}
                  className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4 text-slate-600" />
                </button>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-black text-[#0F2747]">{selectedEquipment.name}</h1>
                    <span className="bg-[#0F2747] text-cyan-300 font-mono text-xs font-black px-2.5 py-0.5 rounded-md">
                      {selectedEquipment.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{selectedEquipment.unit} • Setor {selectedEquipment.sector}</p>
                </div>
              </div>

              {/* ACTION BUTTONS HEADER */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setReadingTargetEquipment(selectedEquipment);
                    setShowReadingModal(true);
                  }}
                  className="px-4 py-2.5 bg-[#1677FF] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-sm cursor-pointer flex items-center space-x-2"
                >
                  <Thermometer className="h-4 w-4" />
                  <span>Registrar Temperatura</span>
                </button>

                <button
                  onClick={() => {
                    setReadingTargetEquipment(selectedEquipment);
                    setShowNewOSModal(true);
                  }}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-sm cursor-pointer flex items-center space-x-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>Abrir Ordem de Serviço</span>
                </button>

                <button
                  onClick={() => setActiveMenu("qr_mobile_view")}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-extrabold text-xs rounded-xl shadow-sm cursor-pointer flex items-center space-x-2"
                >
                  <QrCode className="h-4 w-4 text-cyan-300" />
                  <span>Imprimir QR Code Patrimonial</span>
                </button>
              </div>

              {/* TECHNICAL SPECIFICATIONS & CARDS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* PHOTO & SPECS CARD */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 relative">
                    <img src={selectedEquipment.image} alt={selectedEquipment.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-2 text-xs">
                    <h3 className="font-black text-sm text-[#0F2747] border-b border-slate-100 pb-2">Especificações Técnicas</h3>
                    <div className="flex justify-between py-1 border-b border-slate-100"><span className="text-slate-500">Marca:</span><span className="font-bold text-slate-800">{selectedEquipment.brand}</span></div>
                    <div className="flex justify-between py-1 border-b border-slate-100"><span className="text-slate-500">Modelo:</span><span className="font-bold text-slate-800">{selectedEquipment.model}</span></div>
                    <div className="flex justify-between py-1 border-b border-slate-100"><span className="text-slate-500">Nº de Série:</span><span className="font-mono font-bold text-slate-800">{selectedEquipment.serialNumber}</span></div>
                    <div className="flex justify-between py-1 border-b border-slate-100"><span className="text-slate-500">Gás Refrigerante:</span><span className="font-bold text-[#1677FF]">{selectedEquipment.gasType} ({selectedEquipment.gasAmount})</span></div>
                    <div className="flex justify-between py-1 border-b border-slate-100"><span className="text-slate-500">Voltagem / Potência:</span><span className="font-bold text-slate-800">{selectedEquipment.voltage} • {selectedEquipment.power}</span></div>
                    <div className="flex justify-between py-1"><span className="text-slate-500">Responsável:</span><span className="font-bold text-slate-800">{selectedEquipment.responsible}</span></div>
                  </div>
                </div>

                {/* HISTORICAL GRAPH & QR CODE CARD */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                  <div>
                    <h3 className="font-black text-base text-[#0F2747]">Gráfico de Temperatura dos Últimos 7 Dias</h3>
                    <span className="text-xs text-slate-500">Faixa ideal estipulada: {selectedEquipment.minTemp} °C a {selectedEquipment.maxTemp} °C</span>
                  </div>

                  <div className="h-60 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyTempData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#64748B" }} />
                        <YAxis tick={{ fontSize: 11, fill: "#64748B" }} unit="°C" />
                        <Tooltip />
                        <Line type="monotone" dataKey="temp" stroke="#1677FF" strokeWidth={3} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* QR CODE DISPLAY */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-white border border-slate-300 rounded-xl flex items-center justify-center p-2 shadow-sm shrink-0">
                        <QrCode className="w-full h-full text-[#0F2747]" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-[#0F2747] block">Etiqueta de Identificação Patrimonial</span>
                        <span className="text-[11px] text-slate-500 block font-mono">https://coldtrack.app/eq/{selectedEquipment.code}</span>
                        <p className="text-[10px] text-slate-400 mt-1">Escaneie com a câmera do celular para registrar temperatura no local.</p>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Imprimindo etiqueta patrimonial para ${selectedEquipment.code}...`)}
                      className="px-3 py-2 bg-[#0F2747] hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow cursor-pointer flex items-center space-x-1.5 shrink-0"
                    >
                      <Printer className="h-4 w-4" />
                      <span>Imprimir Etiqueta</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================= 4. QR CODE MOBILE SCAN VIEW (CELLPHONE PREVIEW) ================= */}
          {activeMenu === "qr_mobile_view" && (
            <div className="max-w-md mx-auto space-y-6 animate-fade-in text-center">
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-left">
                <div>
                  <span className="text-[10px] font-mono text-[#1677FF] font-black uppercase block">SIMULAÇÃO DISPOSITIVO MÓVEL</span>
                  <h2 className="text-sm font-black text-[#0F2747]">Página Aberta via Escaneamento de QR Code</h2>
                </div>
                <button
                  onClick={() => setActiveMenu("dashboard")}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg cursor-pointer"
                >
                  Fechar
                </button>
              </div>

              {/* MOBILE FRAME MOCKUP */}
              <div className="bg-[#0F2747] text-white p-6 rounded-[36px] shadow-2xl border-4 border-slate-800 space-y-6 text-left relative">
                
                {/* MOBILE CAMERA NOTCH */}
                <div className="w-32 h-4 bg-slate-800 rounded-full mx-auto mb-4" />

                {/* APP HEADER */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <Snowflake className="h-5 w-5 text-cyan-300" />
                    <span className="font-black text-sm tracking-wider">COLDTRACK</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-400/30">
                    CONECTADO
                  </span>
                </div>

                {/* EQUIPMENT SUMMARY */}
                <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-cyan-300 font-bold text-xs">{selectedEquipment.code}</span>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded">{selectedEquipment.sector}</span>
                  </div>
                  <h3 className="font-extrabold text-base text-white">{selectedEquipment.name}</h3>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                    <span className="text-slate-300">Última Temperatura:</span>
                    <span className="font-mono font-black text-cyan-300 text-base">{selectedEquipment.currentTemp} °C</span>
                  </div>
                </div>

                {/* 3 BIG MOBILE ACTION BUTTONS */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => {
                      setReadingTargetEquipment(selectedEquipment);
                      setShowReadingModal(true);
                    }}
                    className="w-full py-4 bg-[#1677FF] hover:bg-blue-600 text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Thermometer className="h-5 w-5" />
                    <span>1. Registrar Temperatura</span>
                  </button>

                  <button
                    onClick={() => {
                      setReadingTargetEquipment(selectedEquipment);
                      setShowNewOSModal(true);
                    }}
                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <AlertTriangle className="h-5 w-5" />
                    <span>2. Informar Problema / Abrir OS</span>
                  </button>

                  <button
                    onClick={() => setActiveMenu("readings")}
                    className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm rounded-2xl border border-white/10 transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <FileText className="h-5 w-5" />
                    <span>3. Consultar Histórico</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= 5. READINGS LOG TABLE ================= */}
          {activeMenu === "readings" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-[#0F2747]">Histórico de Leituras de Temperatura</h1>
                  <p className="text-xs text-slate-500">Registros diários auditados de todos os equipamentos refrigerados.</p>
                </div>

                <button
                  onClick={() => alert("Relatório em PDF gerado com sucesso!")}
                  className="px-4 py-2.5 bg-[#0F2747] hover:bg-slate-900 text-white font-extrabold text-xs rounded-xl shadow transition-all cursor-pointer flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Exportar Relatório PDF</span>
                </button>
              </div>

              {/* READINGS TABLE */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-extrabold text-[#0F2747] uppercase text-[10px]">
                      <tr>
                        <th className="p-4">Data / Horário</th>
                        <th className="p-4">Patrimônio</th>
                        <th className="p-4">Equipamento</th>
                        <th className="p-4">Temperatura</th>
                        <th className="p-4">Faixa Ideal</th>
                        <th className="p-4">Responsável</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {readings.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50">
                          <td className="p-4 font-mono font-bold text-slate-700">{r.date} - {r.time}</td>
                          <td className="p-4 font-mono font-bold text-[#1677FF]">{r.equipmentCode}</td>
                          <td className="p-4 font-bold text-slate-800">{r.equipmentName}</td>
                          <td className={`p-4 font-mono font-black text-sm ${r.status === "Fora da faixa" ? "text-red-600" : "text-emerald-600"}`}>
                            {r.temp} °C
                          </td>
                          <td className="p-4 font-mono text-slate-500">{r.range}</td>
                          <td className="p-4 text-slate-700">{r.user}</td>
                          <td className="p-4">
                            {r.status === "Normal" ? (
                              <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-1 rounded-md">
                                Normal
                              </span>
                            ) : (
                              <span className="bg-red-100 text-red-800 font-black text-[10px] px-2.5 py-1 rounded-md">
                                Fora da Faixa
                              </span>
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

          {/* ================= 6. WORK ORDERS (KANBAN & TABLE) ================= */}
          {activeMenu === "work_orders" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-[#0F2747]">Ordens de Serviço (OS)</h1>
                  <p className="text-xs text-slate-500">Acompanhamento do ciclo de vida de manutenção dos equipamentos.</p>
                </div>

                <button
                  onClick={() => setShowNewOSModal(true)}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow transition-all cursor-pointer flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>+ Nova Ordem de Serviço</span>
                </button>
              </div>

              {/* KANBAN BOARD */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {(["Aberta", "Em análise", "Em atendimento", "Aguardando peça", "Concluída"] as const).map((colStatus) => {
                  const filtered = workOrders.filter(os => os.status === colStatus);

                  return (
                    <div key={colStatus} className="bg-slate-100 p-3 rounded-2xl border border-slate-200/80 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="font-extrabold text-xs text-[#0F2747]">{colStatus}</span>
                        <span className="bg-slate-200 text-slate-700 font-mono font-bold text-[10px] px-2 py-0.5 rounded-full">
                          {filtered.length}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {filtered.map((os) => (
                          <div key={os.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-black text-[#1677FF]">{os.id}</span>
                              <span className={`text-[9px] font-black px-2 py-0.5 rounded ${
                                os.priority === "Crítica" ? "bg-red-600 text-white" : os.priority === "Alta" ? "bg-amber-500 text-white" : "bg-blue-100 text-blue-800"
                              }`}>
                                {os.priority}
                              </span>
                            </div>

                            <span className="font-bold text-slate-800 block leading-tight">{os.equipmentName}</span>
                            <p className="text-[11px] text-slate-500 line-clamp-2">{os.problem}</p>
                            
                            <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between font-mono">
                              <span>Técnico: {os.assignedTo || "Pendente"}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= 7. MAINTENANCES PAGE ================= */}
          {activeMenu === "maintenances" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-black text-[#0F2747]">Registro de Manutenções</h1>
                  <p className="text-xs text-slate-500">Histórico de intervenções preventivas, corretivas e emergenciais.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-extrabold text-[#0F2747] uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Data</th>
                      <th className="p-4">Equipamento</th>
                      <th className="p-4">Tipo</th>
                      <th className="p-4">Técnico Responsável</th>
                      <th className="p-4">Serviço Realizado</th>
                      <th className="p-4">Custo</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {maintenances.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50">
                        <td className="p-4 font-mono font-bold text-slate-700">{m.date}</td>
                        <td className="p-4 font-bold text-slate-800">{m.equipmentName} ({m.equipmentCode})</td>
                        <td className="p-4 font-bold text-[#1677FF]">{m.type}</td>
                        <td className="p-4 text-slate-700">{m.technician}</td>
                        <td className="p-4 text-slate-600 max-w-xs">{m.service}</td>
                        <td className="p-4 font-mono font-bold text-slate-800">
                          {m.cost > 0 ? `R$ ${m.cost.toFixed(2)}` : "—"}
                        </td>
                        <td className="p-4">
                          <span className={`font-bold text-[10px] px-2.5 py-1 rounded-md ${
                            m.status === "Concluída" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= 8. ALERTS CENTRAL ================= */}
          {activeMenu === "alerts" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h1 className="text-2xl font-black text-[#0F2747]">Central de Alertas e Notificações</h1>
                <p className="text-xs text-slate-500">Monitoramento contínuo de exceções de temperatura e pendências operacionais.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-red-50 p-6 rounded-2xl border border-red-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-red-800">Alertas Críticos</span>
                    <span className="bg-red-600 text-white font-mono font-bold text-xs px-2 py-0.5 rounded-full">1</span>
                  </div>
                  <p className="text-xs text-red-700">Ilha de Congelados 02 com temperatura acima do limite permitido (-8,4 °C).</p>
                </div>

                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-amber-800">Pendências de Leitura</span>
                    <span className="bg-amber-500 text-white font-mono font-bold text-xs px-2 py-0.5 rounded-full">1</span>
                  </div>
                  <p className="text-xs text-amber-800">Câmara Fria do Açougue aguardando leitura diária do operador.</p>
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-blue-800">Manutenções Vencendo</span>
                    <span className="bg-[#1677FF] text-white font-mono font-bold text-xs px-2 py-0.5 rounded-full">1</span>
                  </div>
                  <p className="text-xs text-blue-800">Freezer de Sorvetes 03 com preventiva agendada para 28/07/2026.</p>
                </div>
              </div>
            </div>
          )}

          {/* ================= 9. REPORTS PAGE ================= */}
          {activeMenu === "reports" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h1 className="text-2xl font-black text-[#0F2747]">Relatórios Gerenciais</h1>
                <p className="text-xs text-slate-500">Gere e exporte dados para auditorias da Vigilância Sanitária e compliance patrimonial.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Histórico Completo de Temperaturas", desc: "Auditoria sanitária de leituras com carimbo de hora e operador." },
                  { title: "Equipamentos Fora da Faixa", desc: "Relatório de anomalias térmicas e ocorrências críticas." },
                  { title: "Custos de Manutenção por Unidade", desc: "Demonstrativo financeiro de gastos com peças e mão de obra." },
                  { title: "Inventário Patrimonial por QR Code", desc: "Listagem de todos os ativos refrigerados e termos de garantia." },
                  { title: "Desempenho dos Técnicos", desc: "Métricas de tempo médio de atendimento (SLA) de ordens de serviço." },
                  { title: "Plano de Manutenção Preventiva (PMOC)", desc: "Calendário regulatório de revisões periódicas obrigatórias." },
                ].map((rep, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-extrabold text-sm text-[#0F2747]">{rep.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{rep.desc}</p>
                    </div>

                    <button
                      onClick={() => alert(`Gerando relatório: ${rep.title}...`)}
                      className="w-full py-2 bg-slate-100 hover:bg-[#1677FF] hover:text-white text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Baixar Relatório</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 10. COMPANIES & UNITS ================= */}
          {activeMenu === "companies" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h1 className="text-2xl font-black text-[#0F2747]">Empresas e Unidades</h1>
                <p className="text-xs text-slate-500">Estrutura organizacional da Rede Mercado Bom Preço (CNPJ 12.345.678/0001-90).</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Unidade Centro", city: "Sorocaba/SP", eqCount: 12, users: 8, alerts: 2 },
                  { name: "Unidade Campolim", city: "Sorocaba/SP", eqCount: 7, users: 5, alerts: 1 },
                  { name: "Unidade Zona Norte", city: "Sorocaba/SP", eqCount: 5, users: 4, alerts: 0 },
                  { name: "Centro de Distribuição", city: "Votorantim/SP", eqCount: 4, users: 3, alerts: 0 },
                ].map((u, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <h3 className="font-extrabold text-sm text-[#0F2747]">{u.name}</h3>
                    <p className="text-xs text-slate-500">{u.city}</p>
                    <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
                      <div className="flex justify-between"><span>Equipamentos:</span><span className="font-bold text-[#1677FF]">{u.eqCount}</span></div>
                      <div className="flex justify-between"><span>Usuários:</span><span className="font-bold text-slate-800">{u.users}</span></div>
                      <div className="flex justify-between"><span>Alertas Ativos:</span><span className="font-bold text-red-600">{u.alerts}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= 11. USERS MANAGEMENT ================= */}
          {activeMenu === "users" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h1 className="text-2xl font-black text-[#0F2747]">Gestão de Usuários e Permissões</h1>
                <p className="text-xs text-slate-500">Controle de acessos de administradores, supervisores, operadores e técnicos.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-extrabold text-[#0F2747] uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Nome</th>
                      <th className="p-4">E-mail</th>
                      <th className="p-4">Perfil</th>
                      <th className="p-4">Unidade Atribuída</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {[
                      { name: "Marcos Oliveira", email: "marcos@mercadobompreco.com.br", role: "Administrador", unit: "Todas as Unidades", status: "Ativo" },
                      { name: "Ana Souza", email: "ana.souza@mercadobompreco.com.br", role: "Operador", unit: "Unidade Centro", status: "Ativo" },
                      { name: "João Pereira", email: "joao.pereira@mercadobompreco.com.br", role: "Supervisor", unit: "Unidade Centro", status: "Ativo" },
                      { name: "Carlos Lima", email: "carlos@refritec.com.br", role: "Técnico de Manutenção", unit: "Todas as Unidades", status: "Ativo" },
                      { name: "Maria Santos", email: "maria.santos@mercadobompreco.com.br", role: "Operador", unit: "Unidade Campolim", status: "Ativo" },
                    ].map((usr, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-slate-800">{usr.name}</td>
                        <td className="p-4 font-mono text-slate-600">{usr.email}</td>
                        <td className="p-4 font-extrabold text-[#1677FF]">{usr.role}</td>
                        <td className="p-4 text-slate-700">{usr.unit}</td>
                        <td className="p-4"><span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-1 rounded-md">Ativo</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= 12. SETTINGS ================= */}
          {activeMenu === "settings" && (
            <div className="max-w-3xl space-y-6 animate-fade-in text-left">
              <div>
                <h1 className="text-2xl font-black text-[#0F2747]">Configurações do Sistema</h1>
                <p className="text-xs text-slate-500">Parâmetros operacionais e canais de notificação automatizada.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="space-y-4">
                  <h3 className="font-extrabold text-sm text-[#0F2747]">Canais de Notificação de Alerta</h3>
                  
                  <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <span className="text-xs font-bold text-slate-700">Notificações no Sistema / App</span>
                    <input type="checkbox" defaultChecked className="rounded text-[#1677FF]" />
                  </label>

                  <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <span className="text-xs font-bold text-slate-700">Alertas Automáticos por E-mail</span>
                    <input type="checkbox" defaultChecked className="rounded text-[#1677FF]" />
                  </label>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#0F2747] block">Integração WhatsApp & SMS</span>
                      <span className="text-[11px] text-slate-500">Envio direto de alertas em tempo real no celular do supervisor.</span>
                    </div>
                    <span className="bg-blue-200 text-blue-900 font-black text-[10px] px-2.5 py-1 rounded-full uppercase">
                      Em Breve
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ================= MODAL: REGISTER DAILY TEMPERATURE ================= */}
      {showReadingModal && readingTargetEquipment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs text-[#1677FF] font-black">{readingTargetEquipment.code}</span>
                <h3 className="text-lg font-black text-[#0F2747]">{readingTargetEquipment.name}</h3>
              </div>
              <button onClick={() => setShowReadingModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReading} className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-slate-700 flex justify-between items-center font-medium">
                <span>Faixa Ideal Recomendada:</span>
                <span className="font-mono font-black text-[#1677FF]">{readingTargetEquipment.minTemp} °C a {readingTargetEquipment.maxTemp} °C</span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Temperatura Atual Registrada (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={inputTemp}
                  onChange={(e) => setInputTemp(parseFloat(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-lg font-mono font-black text-[#0F2747] focus:outline-none focus:border-[#1677FF]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Observações do Operador</label>
                <textarea
                  rows={2}
                  value={inputTempObs}
                  onChange={(e) => setInputTempObs(e.target.value)}
                  placeholder="Ex: Borracha de vedação limpa, equipamento sem acúmulo de gelo..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-mono">
                <span>Operador: <strong>Ana Souza</strong></span>
                <span>Data/Hora: <strong>Hoje, 24/07/2026</strong></span>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReadingModal(false)}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1677FF] hover:bg-blue-600 text-white font-black text-xs rounded-xl shadow-lg transition-all"
                >
                  Salvar Leitura
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: NEW WORK ORDER ================= */}
      {showNewOSModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-[#0F2747]">Abrir Nova Ordem de Serviço</h3>
              <button onClick={() => setShowNewOSModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWorkOrder} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Equipamento Selecionado</label>
                <select
                  value={selectedEquipment.id}
                  onChange={(e) => {
                    const found = equipments.find(eq => eq.id === e.target.value);
                    if (found) setSelectedEquipment(found);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold"
                >
                  {equipments.map(eq => (
                    <option key={eq.id} value={eq.id}>{eq.code} - {eq.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Problema Encontrado</label>
                <input
                  type="text"
                  value={newOSProblem}
                  onChange={(e) => setNewOSProblem(e.target.value)}
                  placeholder="Ex: Compressor ruidoso, vazamento de água..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nível de Prioridade</label>
                <select
                  value={newOSPriority}
                  onChange={(e) => setNewOSPriority(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold"
                >
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                  <option value="Crítica">Crítica</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Descrição Detalhada da Ocorrência</label>
                <textarea
                  rows={3}
                  value={newOSDesc}
                  onChange={(e) => setNewOSDesc(e.target.value)}
                  placeholder="Informe detalhes do defeito para orientar a equipe técnica..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewOSModal(false)}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-lg"
                >
                  Abrir Chamado Técnico
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
