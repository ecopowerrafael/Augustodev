import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Check, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Download, 
  Edit2, 
  Eye, 
  FileText, 
  Info, 
  Plus, 
  RefreshCw, 
  Search, 
  Share2, 
  Shield, 
  Trash2, 
  User, 
  Users, 
  Wallet,
  Calendar,
  Sparkles,
  CheckCircle2,
  Lock,
  Unlock,
  AlertTriangle,
  Coins
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Interfaces to replicate exactly the structure in the images
interface ClientCota {
  id: string;
  name: string;
  cpf: string;
  tel: string;
  shareCount: number;
  creationDate: string;
  lotteryType: "Mega" | "Quina" | "Dupla" | "Lotofácil";
  status: "Aguardando" | "Em preparação" | "Postado";
  shared: boolean;
  createdAtTime: string; // ex: "15/01/2026 20:20:20"
}

interface Bolao {
  id: string;
  type: "Mega" | "Quina" | "Dupla" | "Lotofácil";
  title: string;
  shareValue: number;         // Valor da cota (e.g. R$ 1.000,00)
  yourFeePerShare: number;    // Sua tarifa por cota (e.g. R$ 350,00)
  sharesAvailable: number;    // Cotas disponíveis (e.g. 6)
  sharesTotal: number;        // Total cotas (e.g. 10)
  expiryDate: string;         // Vencimento (e.g. "17/07/26 (sex.) - 19:00h")
  creationDate: string;       // Criação bolão (e.g. "15/01/2026 20:20:20")
}

interface Transaction {
  date: string;
  description: string;
  value: number; // Positive for credit, negative for debit
  balanceAfter: number;
  type: "RECHARGE" | "RESERVATION" | "CHARGEBACK";
  id: string;
}

export default function BoloesCaixaReserva({ onBack }: { onBack: () => void }) {
  // Global States
  const [currentTab, setCurrentTab] = useState<"BOLOES" | "COMPRAS" | "EXTRATO">("BOLOES");
  const [comprasFilter, setComprasFilter] = useState<"AGUARDANDO" | "PREPARACAO" | "POSTAGEM">("AGUARDANDO");
  
  // Real User States matching TICKW style
  const [userBalance, setUserBalance] = useState<number>(1500.00);
  const [loteraName, setLoteraName] = useState<string>("Lotérica Trevo de Ouro");
  const [loteraCity, setLoteraCity] = useState<string>("Brasília - DF");
  
  // To simulate the 16 hours rule globally for testing
  const [timePassed16h, setTimePassed16h] = useState<boolean>(false);

  // Core Data Lists
  const [boloes, setBoloes] = useState<Bolao[]>([
    {
      id: "b-01",
      type: "Dupla",
      title: "Dupla sena",
      shareValue: 1000.00,
      yourFeePerShare: 350.00,
      sharesAvailable: 6,
      sharesTotal: 10,
      expiryDate: "17/07/26 (sex.) - 19:00h",
      creationDate: "15/01/2026 20:20:20"
    },
    {
      id: "b-02",
      type: "Mega",
      title: "Mega da Virada Simulada",
      shareValue: 500.00,
      yourFeePerShare: 150.00,
      sharesAvailable: 8,
      sharesTotal: 12,
      expiryDate: "24/07/26 (sex.) - 18:00h",
      creationDate: "10/01/2026 14:15:00"
    },
    {
      id: "b-03",
      type: "Lotofácil",
      title: "Lotofácil da Independência",
      shareValue: 200.00,
      yourFeePerShare: 60.00,
      sharesAvailable: 15,
      sharesTotal: 20,
      expiryDate: "18/07/26 (sáb.) - 19:00h",
      creationDate: "12/01/2026 10:00:00"
    },
    {
      id: "b-04",
      type: "Quina",
      title: "Quina de São João",
      shareValue: 300.00,
      yourFeePerShare: 90.00,
      sharesAvailable: 3,
      sharesTotal: 15,
      expiryDate: "20/07/26 (seg.) - 19:00h",
      creationDate: "14/01/2026 11:30:00"
    }
  ]);

  // Clients' cotas matching Screen 6 (Visualizar Clientes) and Compras tabs
  const [clients, setClients] = useState<ClientCota[]>([
    {
      id: "c-01",
      name: "ERIC ALVES NASCIMENTO",
      cpf: "691.903.801-34",
      tel: "61-9-8433-8810",
      shareCount: 1,
      creationDate: "15/01/2026",
      lotteryType: "Mega",
      status: "Aguardando",
      shared: false,
      createdAtTime: "15/01/2026 20:20:20"
    },
    {
      id: "c-02",
      name: "ERIC ALVES NASCIMENTO",
      cpf: "691.903.801-34",
      tel: "61-9-8433-8810",
      shareCount: 1,
      creationDate: "15/01/2026",
      lotteryType: "Mega",
      status: "Em preparação",
      shared: false,
      createdAtTime: "15/01/2026 20:20:20"
    },
    {
      id: "c-03",
      name: "ROBERTO SOUZA SILVA",
      cpf: "452.883.192-44",
      tel: "11-9-8877-6655",
      shareCount: 1,
      creationDate: "15/01/2026",
      lotteryType: "Dupla",
      status: "Postado",
      shared: true,
      createdAtTime: "15/01/2026 20:20:20"
    }
  ]);

  // Transactions list matching Screen 5 (Extrato)
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "t-05",
      date: "13/01/2026",
      description: "estorno mega 15122620",
      value: 400.00,
      balanceAfter: 1700.00,
      type: "CHARGEBACK"
    },
    {
      id: "t-04",
      date: "12/01/2026",
      description: "Quina 120126202025",
      value: -300.00,
      balanceAfter: 1300.00,
      type: "RESERVATION"
    },
    {
      id: "t-03",
      date: "11/01/2026",
      description: "Recarga",
      value: 1000.00,
      balanceAfter: 1600.00,
      type: "RECHARGE"
    },
    {
      id: "t-02",
      date: "11/01/2026",
      description: "mega 15122620",
      value: -400.00,
      balanceAfter: 600.00,
      type: "RESERVATION"
    },
    {
      id: "t-01",
      date: "11/01/2026",
      description: "Recarga",
      value: 1000.00,
      balanceAfter: 1000.00,
      type: "RECHARGE"
    }
  ]);

  // UI state variables
  const [selectedBolao, setSelectedBolao] = useState<Bolao | null>(null);
  
  // State for the "Sua Reserva" panel / checkout drawer (Left Box in Image 2)
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [checkoutCotasCount, setCheckoutCotasCount] = useState<number>(3);
  const [checkoutClients, setCheckoutClients] = useState<{ id: string; name: string; cpf: string; tel: string }[]>([
    { id: "1", name: "ERIC ALVES NASCIMENTO", cpf: "691.903.801-34", tel: "61-9-8433-8810" },
    { id: "2", name: "ERIC ALVES NASCIMENTO", cpf: "691.903.801-34", tel: "61-9-8433-8810" },
    { id: "3", name: "ERIC ALVES NASCIMENTO", cpf: "691.903.801-34", tel: "61-9-8433-8810" }
  ]);

  // State for Admin fields & Modals
  const [showLoteraConfigModal, setShowLoteraConfigModal] = useState<boolean>(false);
  const [newBolaoForm, setNewBolaoForm] = useState({
    type: "Mega" as any,
    title: "",
    shareValue: 100,
    yourFeePerShare: 35,
    sharesTotal: 10,
    expiryDate: "17/07/26 (sex.) - 19:00h"
  });

  // Extrato control panel values
  const [refundInputCode, setRefundInputCode] = useState<string>("");
  const [rechargeInputAmount, setRechargeInputAmount] = useState<string>("");

  // Visualizing specific pool's clients modal
  const [viewingClientsPool, setViewingClientsPool] = useState<Bolao | null>(null);
  const [editingClient, setEditingClient] = useState<ClientCota | null>(null);

  // Active filter for bolões in Bolões Tab
  const [bolaoSearchFilter, setBolaoSearchFilter] = useState<string>("");
  const [activeBolaoCategory, setActiveBolaoCategory] = useState<string>("ALL");

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Synchronize client input lines to match requested cota count in "Sua Reserva"
  useEffect(() => {
    if (checkoutCotasCount > checkoutClients.length) {
      const diff = checkoutCotasCount - checkoutClients.length;
      const updated = [...checkoutClients];
      for (let i = 0; i < diff; i++) {
        updated.push({
          id: String(Date.now() + i),
          name: "ERIC ALVES NASCIMENTO",
          cpf: "691.903.801-34",
          tel: "61-9-8433-8810"
        });
      }
      setCheckoutClients(updated);
    } else if (checkoutCotasCount < checkoutClients.length) {
      setCheckoutClients(checkoutClients.slice(0, checkoutCotasCount));
    }
  }, [checkoutCotasCount]);

  // Handler for adding a custom reservation
  const handleCompleteReservation = () => {
    if (!selectedBolao) return;
    const totalCost = selectedBolao.shareValue * checkoutCotasCount;
    
    if (userBalance < totalCost) {
      triggerToast("Saldo insuficiente para concluir esta reserva!");
      return;
    }

    // Deduct Balance
    const newBalance = userBalance - totalCost;
    setUserBalance(newBalance);

    // Add to transaction history
    const newTx: Transaction = {
      id: `t-res-${Date.now()}`,
      date: new Date().toLocaleDateString("pt-BR"),
      description: `${selectedBolao.type} ${selectedBolao.id}`,
      value: -totalCost,
      balanceAfter: newBalance,
      type: "RESERVATION"
    };
    setTransactions([newTx, ...transactions]);

    // Create client records based on reserved lines
    const newClientCotas: ClientCota[] = checkoutClients.map(c => ({
      id: `c-new-${Math.random()}`,
      name: c.name || "Sem Nome",
      cpf: c.cpf || "000.000.000-00",
      tel: c.tel || "00-0-0000-0000",
      shareCount: 1,
      creationDate: new Date().toLocaleDateString("pt-BR"),
      lotteryType: selectedBolao.type,
      status: "Aguardando",
      shared: false,
      createdAtTime: new Date().toLocaleString("pt-BR")
    }));

    setClients([...newClientCotas, ...clients]);

    // Update remaining shares in Bolão
    setBoloes(prev => prev.map(b => {
      if (b.id === selectedBolao.id) {
        return {
          ...b,
          sharesAvailable: Math.max(0, b.sharesAvailable - checkoutCotasCount)
        };
      }
      return b;
    }));

    triggerToast(`Reserva de ${checkoutCotasCount} cotas efetuada com sucesso!`);
    setShowCheckout(false);
  };

  // Handler for dynamic refund (Estorno) from the Extrato UI
  const handleActionRefund = () => {
    if (!refundInputCode) {
      triggerToast("Digite o código do bolão ou transação para estornar.");
      return;
    }
    // Simple look up logic inside transactions
    const refundAmount = 400.00; // Mock standard amount or find corresponding debit
    const newBal = userBalance + refundAmount;
    setUserBalance(newBal);

    const newTx: Transaction = {
      id: `t-ref-${Date.now()}`,
      date: new Date().toLocaleDateString("pt-BR"),
      description: `estorno ${refundInputCode}`,
      value: refundAmount,
      balanceAfter: newBal,
      type: "CHARGEBACK"
    };

    setTransactions([newTx, ...transactions]);
    triggerToast(`Estorno efetuado de R$ ${refundAmount.toFixed(2)} com sucesso!`);
    setRefundInputCode("");
  };

  // Handler for recharge from Extrato UI
  const handleActionRecharge = () => {
    const val = parseFloat(rechargeInputAmount.replace(",", "."));
    if (isNaN(val) || val <= 0) {
      triggerToast("Digite um valor válido de recarga.");
      return;
    }

    const newBal = userBalance + val;
    setUserBalance(newBal);

    const newTx: Transaction = {
      id: `t-rec-${Date.now()}`,
      date: new Date().toLocaleDateString("pt-BR"),
      description: "Recarga",
      value: val,
      balanceAfter: newBal,
      type: "RECHARGE"
    };

    setTransactions([newTx, ...transactions]);
    triggerToast(`Recarga efetuada de R$ ${val.toFixed(2)}!`);
    setRechargeInputAmount("");
  };

  // Custom Bolão Creation
  const handleCreateBolaoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBolaoForm.title) {
      triggerToast("Preencha o título do bolão.");
      return;
    }

    const newB: Bolao = {
      id: `b-${Date.now().toString().slice(-4)}`,
      type: newBolaoForm.type,
      title: newBolaoForm.title,
      shareValue: Number(newBolaoForm.shareValue),
      yourFeePerShare: Number(newBolaoForm.yourFeePerShare),
      sharesAvailable: Number(newBolaoForm.sharesTotal),
      sharesTotal: Number(newBolaoForm.sharesTotal),
      expiryDate: newBolaoForm.expiryDate,
      creationDate: new Date().toLocaleString("pt-BR")
    };

    setBoloes([newB, ...boloes]);
    triggerToast("Bolão cadastrado com sucesso pela administração!");
    setNewBolaoForm({
      type: "Mega",
      title: "",
      shareValue: 100,
      yourFeePerShare: 35,
      sharesTotal: 10,
      expiryDate: "17/07/26 (sex.) - 19:00h"
    });
  };

  // Edit / Update Client Cota information
  const handleUpdateClientInfo = () => {
    if (!editingClient) return;

    // Checks & Restrictions based on "Orientações" instructions:
    // 1. Cotas em preparação: can edit name, cpf & client until 16-hour limit.
    if (editingClient.status === "Em preparação" && timePassed16h) {
      triggerToast("Limite de 16 horas atingido! Não é possível mais editar cotas Em preparação.");
      return;
    }

    // 2. Loterico can edit client until the first share. After first share, locked.
    if (editingClient.shared) {
      triggerToast("Cota já compartilhada! Não é permitido alterar os dados.");
      return;
    }

    setClients(prev => prev.map(c => c.id === editingClient.id ? editingClient : c));
    triggerToast("Dados do cliente atualizados com sucesso!");
    setEditingClient(null);
  };

  // Simulate share cota (locking future edits)
  const handleShareCota = (id: string) => {
    setClients(prev => prev.map(c => {
      if (c.id === id) {
        if (c.shared) {
          triggerToast("Esta cota já foi compartilhada!");
          return c;
        }
        triggerToast("Cota compartilhada com o cliente! Alterações bloqueadas.");
        return { ...c, shared: true };
      }
      return c;
    }));
  };

  // Share with everyone
  const handleShareAll = () => {
    setClients(prev => prev.map(c => ({ ...c, shared: true })));
    triggerToast("Todas as cotas foram compartilhadas e estão disponíveis para os clientes.");
  };

  // Filter lists based on bottom tabs
  const filteredBoloes = boloes.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(bolaoSearchFilter.toLowerCase());
    const matchesCategory = activeBolaoCategory === "ALL" || b.type === activeBolaoCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative flex flex-col">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-emerald-400 border border-emerald-500/30 px-6 py-3 rounded-full shadow-xl flex items-center gap-2 text-sm font-semibold"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADMIN CONTROL RAIL & HEADER */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white py-3 px-4 sm:px-8 border-b border-emerald-500/20 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-1.5 hover:bg-emerald-800/60 rounded-lg text-emerald-200 hover:text-white transition-all flex items-center gap-1 text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Portfólio</span>
            </button>
            <div className="h-4 w-[1px] bg-emerald-800" />
            <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Protótipo Interativo Premium</span>
            </div>
          </div>

          {/* Quick Simulation controls according to images' rules */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1 bg-black/20 border border-white/10 px-3 py-1 rounded-lg text-xs">
              <span className="text-slate-400">Regra 16h:</span>
              <button 
                onClick={() => {
                  setTimePassed16h(!timePassed16h);
                  triggerToast(timePassed16h ? "Simulador de 16h DESATIVADO (Edição liberada)" : "Simulador de 16h ATIVADO (Edição bloqueada p/ preparação)");
                }}
                className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] transition-all uppercase ${
                  timePassed16h ? "bg-rose-500 text-white" : "bg-emerald-500 text-slate-950"
                }`}
              >
                {timePassed16h ? "Excedido (>16h)" : "Normal (<16h)"}
              </button>
            </div>

            <button 
              onClick={() => {
                setUserBalance(1500.00);
                triggerToast("Saldo resetado para R$ 1.500,00");
              }}
              className="bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/20 px-3 py-1 rounded-lg text-xs font-semibold text-teal-300 transition-all flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Resetar Saldo (R$ 1.500)</span>
            </button>

            <button
              onClick={() => setShowLoteraConfigModal(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-md shadow-emerald-500/10"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Cadastrar Lotérica</span>
            </button>
          </div>
        </div>
      </div>

      {/* MASTER PRESENTATION LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: THE TICKW EMULATOR CONTAINER (xl:col-span-8) */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* Main Visual Frame representing the design inside the images */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col max-w-2xl mx-auto min-h-[750px] relative">
            
            {/* TICKW HEADER (MATCHING IMAGE 1 & 2 HEADER EXACTLY) */}
            <div className="bg-[#fcfdfd] border-b border-slate-100 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Menu Button */}
                <button className="text-slate-600 hover:text-slate-900 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                {/* TICKW Logo - styled with same mint green check circle */}
                <div className="flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-full bg-[#10b981] flex items-center justify-center shadow-sm">
                    <Check className="w-4 h-4 text-white stroke-[3.5]" />
                  </div>
                  <span className="font-extrabold text-lg tracking-tight text-slate-700 font-sans uppercase">
                    TICKW
                  </span>
                </div>
              </div>

              {/* Saldo Indicator & Coin Reload Icon */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-[#059669] font-bold bg-[#f0fbf7] px-3 py-1 rounded-full border border-[#10b981]/20">
                    Saldo: R$ {userBalance.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                
                {/* Coin reload circular button */}
                <button 
                  onClick={() => {
                    setUserBalance(prev => prev + 1000);
                    triggerToast("Crédito de R$ 1.000,00 inserido!");
                  }}
                  className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-500 flex items-center justify-center text-white font-extrabold shadow-sm relative transition-all"
                  title="Simular Recarga R$ 1.000"
                >
                  <Coins className="w-4 h-4 text-amber-950 animate-pulse" />
                </button>

                {/* Bento Grid icon */}
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                  <span className="text-sm font-extrabold">⊞</span>
                </div>
              </div>
            </div>

            {/* LOTÉRICA ASSIGNED TAG (From instructions: Cadastro de lotérica) */}
            <div className="bg-[#f0fbf7] border-b border-[#10b981]/10 py-2 px-5 flex items-center justify-between text-xs text-[#047857] font-medium">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#10b981]" />
                <span>Credenciada: <strong>{loteraName}</strong> ({loteraCity})</span>
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-700 px-2 py-0.5 rounded-full uppercase font-mono font-bold">Ativa</span>
            </div>

            {/* EMULATOR BODY: DYNAMIC CONTENT BASED ON CURRENT TAB */}
            <div className="flex-1 p-5 bg-[#fafcfb] overflow-y-auto max-h-[580px]">
              
              {/* TAB 1: BOLÕES SCREEN */}
              {currentTab === "BOLOES" && (
                <div className="space-y-4">
                  
                  {/* Search input - replicating exact look from Image 1 ("Encerrado e arquivado") */}
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Encerrado e arquivado" 
                      value={bolaoSearchFilter}
                      onChange={(e) => setBolaoSearchFilter(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#10b981] shadow-sm font-medium"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>

                  {/* Quick Category Buttons: "3 Mega", "5 Quina", "3 Dupla", "4 Lotofácil" */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <button 
                      onClick={() => setActiveBolaoCategory("ALL")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        activeBolaoCategory === "ALL" 
                          ? "bg-slate-900 border-slate-900 text-white" 
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Todos
                    </button>
                    <button 
                      onClick={() => setActiveBolaoCategory("Mega")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        activeBolaoCategory === "Mega" 
                          ? "bg-[#10b981] text-white border-[#10b981]" 
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      3 Mega
                    </button>
                    <button 
                      onClick={() => setActiveBolaoCategory("Quina")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        activeBolaoCategory === "Quina" 
                          ? "bg-[#10b981] text-white border-[#10b981]" 
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      5 Quina
                    </button>
                    <button 
                      onClick={() => setActiveBolaoCategory("Dupla")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        activeBolaoCategory === "Dupla" 
                          ? "bg-[#10b981] text-white border-[#10b981]" 
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      3 Dupla
                    </button>
                    <button 
                      onClick={() => setActiveBolaoCategory("Lotofácil")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        activeBolaoCategory === "Lotofácil" 
                          ? "bg-[#10b981] text-white border-[#10b981]" 
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      4 Lotofácil
                    </button>
                  </div>

                  {/* BOLÕES CARDS LIST */}
                  <div className="space-y-4 pt-2">
                    {filteredBoloes.map(bolao => (
                      <div 
                        key={bolao.id}
                        className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4 text-left relative hover:shadow-md transition-all"
                      >
                        {/* Title and Badge */}
                        <div className="flex items-center justify-between">
                          <h3 className="font-extrabold text-slate-800 text-base font-sans capitalize">
                            {bolao.title}
                          </h3>
                          <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded">
                            {bolao.type}
                          </span>
                        </div>

                        {/* Card stats list matching exact layout of Image 1 */}
                        <div className="space-y-2 text-xs font-medium text-slate-600">
                          <div className="flex justify-between pb-1 border-b border-dashed border-slate-100">
                            <span>Valor da cota</span>
                            <span className="font-extrabold text-slate-900">
                              R$ {bolao.shareValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div className="flex justify-between pb-1 border-b border-dashed border-slate-100">
                            <span>Sua tarifa por cota</span>
                            <span className="font-extrabold text-slate-900">
                              R$ {bolao.yourFeePerShare.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div className="flex justify-between pb-1 border-b border-dashed border-slate-100">
                            <span>Cotas disponíveis</span>
                            <span className="font-black text-[#dc2626]">
                              {bolao.sharesAvailable} / {bolao.sharesTotal}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Vencimento</span>
                            <span className="text-slate-500 font-semibold flex items-center gap-1">
                              {bolao.expiryDate} 
                              <span className="text-[#10b981] font-bold cursor-pointer" title="Ajuda">?</span>
                            </span>
                          </div>
                        </div>

                        {/* Card actions: Reservar button and Share icon */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <button 
                            onClick={() => {
                              setSelectedBolao(bolao);
                              setCheckoutCotasCount(3); // Default shown in image 2
                              setShowCheckout(true);
                            }}
                            className="border-2 border-slate-950 text-slate-950 font-black px-6 py-2 rounded-lg text-xs hover:bg-slate-950 hover:text-white transition-all uppercase tracking-wider"
                          >
                            Reservar
                          </button>
                          
                          <button 
                            onClick={() => {
                              triggerToast(`Link do bolão ${bolao.type} copiado para compartilhamento!`);
                            }}
                            className="w-9 h-9 rounded-full bg-[#f0fbf7] hover:bg-[#e6f7f0] border border-[#10b981]/10 flex items-center justify-center text-[#10b981] transition-all"
                            title="Compartilhar Bolão"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {filteredBoloes.length === 0 && (
                      <p className="text-center text-slate-400 text-xs py-8 font-medium">Nenhum bolão ativo para esta categoria.</p>
                    )}
                  </div>

                </div>
              )}

              {/* TAB 2: COMPRAS SCREEN */}
              {currentTab === "COMPRAS" && (
                <div className="space-y-4">
                  
                  {/* "Criação / período" Label from the header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono tracking-wider uppercase">Criação / período</span>
                    
                    {/* Comissão esperada total badge */}
                    <div className="text-right">
                      <span className="text-xs text-slate-500 font-semibold">
                        Comissão esperada: <strong className="text-rose-500">R$ 350,00</strong>
                      </span>
                    </div>
                  </div>

                  {/* BADGES FILTER INDICATORS EXACTLY AS SHOWN IN THE IMAGES: */}
                  {/* "3 aguardando" (with a red down arrow) | "4 em preparação" | "10 p/ postagem" | Search icon */}
                  <div className="grid grid-cols-4 gap-1.5 items-center bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
                    <button 
                      onClick={() => setComprasFilter("AGUARDANDO")}
                      className={`py-2 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${
                        comprasFilter === "AGUARDANDO" 
                          ? "bg-rose-500 text-white shadow-sm" 
                          : "bg-transparent text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-red-300 font-extrabold">↓</span>
                      <span>3 aguardando</span>
                    </button>
                    <button 
                      onClick={() => setComprasFilter("PREPARACAO")}
                      className={`py-2 rounded-lg text-[10px] font-bold transition-all ${
                        comprasFilter === "PREPARACAO" 
                          ? "bg-slate-800 text-white shadow-sm" 
                          : "bg-transparent text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>4 em preparação</span>
                    </button>
                    <button 
                      onClick={() => setComprasFilter("POSTAGEM")}
                      className={`py-2 rounded-lg text-[10px] font-bold transition-all ${
                        comprasFilter === "POSTAGEM" 
                          ? "bg-slate-800 text-white shadow-sm" 
                          : "bg-transparent text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span>10 p/ postagem</span>
                    </button>
                    <button 
                      onClick={() => triggerToast("Pesquisa de cotas aberta!")}
                      className="py-2 hover:bg-slate-50 rounded-lg text-slate-500 flex items-center justify-center"
                    >
                      <Search className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* ACTIVE COMPRAS SUBCONTENT PANEL */}
                  <div className="space-y-4 pt-2 text-left">
                    
                    {/* IF AGUARDANDO FILTER IS ACTIVE */}
                    {comprasFilter === "AGUARDANDO" && (
                      <div className="space-y-4">
                        {/* Duplicate item from Image 1 Screen 2 */}
                        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm relative space-y-3">
                          
                          {/* Top row with edit icon, name, cota count */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-slate-700">
                              <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                              <span className="font-extrabold text-base">Dupla sena</span>
                            </div>
                            <span className="text-xs font-bold border border-slate-200 bg-slate-50 px-2 py-0.5 rounded text-slate-800">
                              3 cotas
                            </span>
                          </div>

                          {/* Stats parameters */}
                          <div className="space-y-1.5 text-xs font-medium text-slate-600">
                            <div className="flex justify-between">
                              <span>Valor da cota</span>
                              <span className="font-bold text-slate-800">R$ 1.000,00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Sua tarifa por cota <span className="text-slate-400 font-normal">3 cotas</span></span>
                              <span className="font-bold text-slate-800">R$ 350,00</span>
                            </div>
                            <div className="flex justify-between text-[#dc2626] font-bold">
                              <span>Cotas aguardando</span>
                              <span>6 / 10</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Vencimento</span>
                              <span className="text-slate-500 font-semibold">17/07/26 (sex.) - 19:00h ?</span>
                            </div>
                          </div>

                          {/* Bottom Row Buttons: Visualizar clientes, delete icon, share icon */}
                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                            <button 
                              onClick={() => {
                                const selected = boloes.find(b => b.type === "Dupla") || boloes[0];
                                setViewingClientsPool(selected);
                              }}
                              className="border border-slate-400 text-slate-800 px-4 py-1.5 rounded text-xs font-bold hover:bg-slate-50 transition-all"
                            >
                              Visualizar clientes
                            </button>
                            
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => triggerToast("Solicitação de exclusão enviada.")}
                                className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-500 flex items-center justify-center transition-all border border-rose-100"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => triggerToast("Link de acompanhamento compartilhado!")}
                                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all"
                              >
                                <Share2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Footer expected comission value */}
                          <div className="pt-2 flex justify-between text-xs text-slate-500 font-semibold bg-slate-50 -mx-5 -mb-5 p-3 rounded-b-2xl border-t border-slate-100">
                            <span>Comissão esperada</span>
                            <span className="text-rose-500 font-extrabold">R$ 350,00</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* IF PREPARACAO FILTER IS ACTIVE */}
                    {comprasFilter === "PREPARACAO" && (
                      <div className="space-y-4">
                        {/* Duplicate item from Image 1 Screen 3 */}
                        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm relative space-y-3">
                          
                          {/* Top row */}
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-base text-slate-800">Dupla sena</span>
                            <span className="text-xs font-bold border border-slate-200 bg-slate-50 px-2 py-0.5 rounded text-slate-800">
                              3 cotas
                            </span>
                          </div>

                          {/* Stats parameters */}
                          <div className="space-y-1.5 text-xs font-medium text-slate-600">
                            <div className="flex justify-between">
                              <span>Valor da cota</span>
                              <span className="font-bold text-slate-800">R$ 1.000,00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Sua tarifa por cota <span className="text-slate-400 font-normal">3 cotas</span></span>
                              <span className="font-bold text-slate-800">R$ 350,00</span>
                            </div>
                            <div className="flex justify-between text-rose-500 font-bold items-center">
                              <span>Cotas em preparação</span>
                              <span className="flex items-center gap-1 font-extrabold bg-rose-50 text-rose-600 px-2 py-0.5 rounded text-[11px]">
                                <User className="w-3 h-3" />
                                10
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Vencimento</span>
                              <span className="text-slate-500">17/07/26 (sex.) - 19:00h ?</span>
                            </div>
                            <div className="flex justify-between text-slate-400 text-[11px]">
                              <span>Criação bolão:</span>
                              <span className="font-mono">15/01/2026 20:20:20</span>
                            </div>
                          </div>

                          {/* Action footer */}
                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                            <button 
                              onClick={() => {
                                const selected = boloes.find(b => b.type === "Dupla") || boloes[0];
                                setViewingClientsPool(selected);
                              }}
                              className="border border-slate-400 text-slate-800 px-4 py-1.5 rounded text-xs font-bold hover:bg-slate-50 transition-all"
                            >
                              Visualizar clientes
                            </button>
                            <span className="text-xs text-slate-400 italic">Data e hora da entrega: --</span>
                          </div>

                          {/* Footer comissao ganha */}
                          <div className="pt-2 flex justify-between text-xs text-slate-500 font-semibold bg-slate-50 -mx-5 -mb-5 p-3 rounded-b-2xl border-t border-slate-100">
                            <span>Comissão ganha</span>
                            <span className="text-[#059669] font-extrabold">R$ 350,00</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* IF POSTAGEM FILTER IS ACTIVE */}
                    {comprasFilter === "POSTAGEM" && (
                      <div className="space-y-4">
                        {/* Duplicate item from Image 1 Screen 4 */}
                        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm relative space-y-3">
                          
                          {/* Top row with eye icon */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-slate-800">
                              <span className="font-extrabold text-base">Dupla sena</span>
                              <Eye className="w-4 h-4 text-slate-400" />
                            </div>
                            <span className="text-xs font-bold border border-slate-200 bg-slate-50 px-2 py-0.5 rounded text-slate-800">
                              3 cotas
                            </span>
                          </div>

                          {/* Stats parameters */}
                          <div className="space-y-1.5 text-xs font-medium text-slate-600">
                            <div className="flex justify-between">
                              <span>Valor da cota</span>
                              <span className="font-bold text-slate-800">R$ 1.000,00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Sua tarifa por cota <span className="text-slate-400 font-normal">3 cotas</span></span>
                              <span className="font-bold text-slate-800">R$ 350,00</span>
                            </div>
                            <div className="flex justify-between text-amber-600 font-bold items-center">
                              <span>Cotas para enviar p/ cliente</span>
                              <span className="flex items-center gap-1 font-extrabold bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[11px]">
                                <User className="w-3 h-3" />
                                10
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Vencimento</span>
                              <span className="text-slate-500">17/07/26 (sex.) - 19:00h ?</span>
                            </div>
                            <div className="flex justify-between text-slate-400 text-[11px]">
                              <span>Criação bolão:</span>
                              <span className="font-mono">15/01/2026 20:20:20</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                            <button 
                              onClick={() => {
                                const selected = boloes.find(b => b.type === "Dupla") || boloes[0];
                                setViewingClientsPool(selected);
                              }}
                              className="border border-slate-400 text-slate-800 px-4 py-1.5 rounded text-xs font-bold hover:bg-slate-50 transition-all"
                            >
                              Visualizar clientes
                            </button>
                            <span className="text-xs text-slate-400 italic">Data e hora da entrega: --</span>
                          </div>

                          {/* Footer comissao ganha */}
                          <div className="pt-2 flex justify-between text-xs text-slate-500 font-semibold bg-slate-50 -mx-5 -mb-5 p-3 rounded-b-2xl border-t border-slate-100">
                            <span>Comissão ganha</span>
                            <span className="text-[#059669] font-extrabold">R$ 350,00</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Simple notice for simulator testing */}
                    <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                      * O status das cotas avança de "Aguardando" para "Em preparação" e "Postado" de acordo com o fechamento do bolão e validação administrativa.
                    </p>
                  </div>

                </div>
              )}

              {/* TAB 3: EXTRATO SCREEN */}
              {currentTab === "EXTRATO" && (
                <div className="space-y-4">
                  
                  {/* Top administrative inputs shown in Image 2 Screen 5: "Estornar valor" | "Fazer recarga" */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-left">
                    
                    {/* Estornar valor block */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-600 block">Estornar valor</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Cod. bolão ou ID..." 
                          value={refundInputCode}
                          onChange={(e) => setRefundInputCode(e.target.value)}
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                        />
                        <button 
                          onClick={handleActionRefund}
                          className="w-8 h-8 rounded-lg bg-[#10b981] hover:bg-[#059669] flex items-center justify-center text-white text-xs font-black transition-all"
                          title="Confirmar Estorno"
                        >
                          ✓
                        </button>
                      </div>
                    </div>

                    {/* Fazer recarga block */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-600 block">Fazer recarga</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Valor (ex: 1000,00)" 
                          value={rechargeInputAmount}
                          onChange={(e) => setRechargeInputAmount(e.target.value)}
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                        />
                        <button 
                          onClick={handleActionRecharge}
                          className="w-8 h-8 rounded-lg bg-[#10b981] hover:bg-[#059669] flex items-center justify-center text-white text-xs font-black transition-all"
                          title="Confirmar Recarga"
                        >
                          ✓
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* TRANSACTION LOG LIST EXACTLY AS SHOWN IN IMAGE 2 SCREEN 5 */}
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-left">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-[10px] text-slate-500 font-mono uppercase tracking-wider border-b border-slate-100">
                            <th className="py-2.5 px-4 font-bold">Data</th>
                            <th className="py-2.5 px-4 font-bold">Operação</th>
                            <th className="py-2.5 px-4 font-bold text-right">Lançamento</th>
                            <th className="py-2.5 px-4 font-bold text-right">Saldo</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-[11px] font-medium text-slate-700">
                          {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-slate-50/50 transition-all">
                              <td className="py-3 px-4 font-mono text-slate-500">{tx.date}</td>
                              <td className="py-3 px-4 text-slate-800 uppercase">{tx.description}</td>
                              <td className={`py-3 px-4 text-right font-extrabold ${tx.value >= 0 ? "text-[#059669]" : "text-[#dc2626]"}`}>
                                {tx.value >= 0 ? "+" : ""} R$ {tx.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                              </td>
                              <td className="py-3 px-4 text-right font-bold text-slate-900">
                                R$ {tx.balanceAfter.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Bottom final green balance row matching Extrato screen */}
                    <div className="bg-[#f0fbf7] px-4 py-3 border-t border-[#10b981]/10 flex justify-between items-center text-xs">
                      <span className="font-bold text-[#047857]">Disponível para saque / faturamento</span>
                      <strong className="text-lg text-[#059669] font-black">
                        Saldo: R$ {userBalance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </strong>
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* TICKW BOTTOM TAB NAVIGATION BAR (MATCHING THE BAR AT THE BOTTOM OF THE MOCKUPS) */}
            <div className="bg-white border-t border-slate-100 px-6 py-3.5 flex justify-around items-center">
              
              {/* Tab 1 button: Bolões */}
              <button 
                onClick={() => setCurrentTab("BOLOES")}
                className={`flex flex-col items-center gap-1.5 transition-all ${
                  currentTab === "BOLOES" ? "text-[#10b981]" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {/* Custom ticket icon matching bottom indicator */}
                <div className={`p-1.5 rounded-xl transition-all ${currentTab === "BOLOES" ? "bg-[#f0fbf7]" : "bg-transparent"}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <span className="text-[10px] font-extrabold tracking-wide uppercase">Bolões</span>
              </button>

              {/* Tab 2 button: Compras */}
              <button 
                onClick={() => setCurrentTab("COMPRAS")}
                className={`flex flex-col items-center gap-1.5 transition-all ${
                  currentTab === "COMPRAS" ? "text-[#10b981]" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${currentTab === "COMPRAS" ? "bg-[#f0fbf7]" : "bg-transparent"}`}>
                  <span className="text-base font-black tracking-tighter">$</span>
                </div>
                <span className="text-[10px] font-extrabold tracking-wide uppercase">Compras</span>
              </button>

              {/* Tab 3 button: Extrato */}
              <button 
                onClick={() => setCurrentTab("EXTRATO")}
                className={`flex flex-col items-center gap-1.5 transition-all ${
                  currentTab === "EXTRATO" ? "text-[#10b981]" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${currentTab === "EXTRATO" ? "bg-[#f0fbf7]" : "bg-transparent"}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-[10px] font-extrabold tracking-wide uppercase">Extrato</span>
              </button>

            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: DETAIL WORKFLOWS & ADMIN INSPECTION TOOLS (xl:col-span-4) */}
        <div className="xl:col-span-4 space-y-6 text-left">
          
          {/* THE RESERVATION FLOW PANEL (Sua Reserva - Replicating Image 2 Left Side Box) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#10b981]/5 rounded-full blur-xl" />
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#059669] font-bold bg-[#f0fbf7] px-2 py-0.5 rounded uppercase font-mono">Painel de Reserva</span>
              <span className="text-[11px] text-slate-400">Ativação instantânea</span>
            </div>

            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-lg">Sua reserva</h3>
              <p className="text-xs text-slate-500">Insira as informações dos clientes do bolão abaixo para registrar os bilhetes digitais.</p>
            </div>

            {/* Target selection info if any bolão is selected */}
            {selectedBolao ? (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">{selectedBolao.title} ({selectedBolao.type})</span>
                  <span className="text-[#059669] font-extrabold">R$ {selectedBolao.shareValue.toFixed(2)} / cota</span>
                </div>
                
                {/* Cotas Counter and Calculations */}
                <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-200/60">
                  <span className="text-xs font-semibold text-slate-600">Quantidade de Cotas:</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setCheckoutCotasCount(prev => Math.max(1, prev - 1))}
                      className="w-7 h-7 rounded bg-slate-200 hover:bg-slate-300 flex items-center justify-center font-bold text-slate-800"
                    >
                      -
                    </button>
                    <span className="font-bold text-sm w-6 text-center text-slate-900">{checkoutCotasCount}</span>
                    <button 
                      onClick={() => setCheckoutCotasCount(prev => Math.min(selectedBolao.sharesAvailable, prev + 1))}
                      className="w-7 h-7 rounded bg-slate-200 hover:bg-slate-300 flex items-center justify-center font-bold text-slate-800"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 text-amber-800 p-3.5 rounded-xl border border-amber-200/60 text-xs text-center font-semibold">
                Nenhum bolão ativo para reserva. Selecione um bolão no emulador e clique em "Reservar" para preencher este formulário.
              </div>
            )}

            {/* Cotas / Value math exactly as Image 2 Left Side Box */}
            <div className="bg-slate-50/60 rounded-xl p-3 border border-slate-100 space-y-1 text-xs">
              <div className="flex justify-between font-bold text-slate-700">
                <span>{checkoutCotasCount} Cotas</span>
                <span>Valor por cota: R$ {selectedBolao ? selectedBolao.shareValue.toFixed(2) : "1.000,00"}</span>
              </div>
              <div className="flex justify-between font-extrabold text-slate-900 pt-1 border-t border-slate-100">
                <span>Valor da reserva:</span>
                <span>R$ {((selectedBolao ? selectedBolao.shareValue : 1000.00) * checkoutCotasCount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between font-bold text-[#059669] pt-0.5">
                <span>Sua comissão (esperada):</span>
                <span>R$ {((selectedBolao ? selectedBolao.yourFeePerShare : 350.00) * checkoutCotasCount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* List of customer fields dynamically built matching Image 2 */}
            <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block">Identificação dos Clientes:</span>
              
              {checkoutClients.map((client, index) => (
                <div key={client.id} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2 relative shadow-sm">
                  <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-1.5">
                    <span className="font-extrabold text-[#10b981]">Cliente #{index + 1}</span>
                    <button 
                      onClick={() => {
                        if (checkoutCotasCount <= 1) {
                          triggerToast("É necessário no mínimo 1 cota.");
                          return;
                        }
                        setCheckoutCotasCount(prev => prev - 1);
                      }}
                      className="text-rose-500 hover:text-rose-700 transition-all"
                      title="Excluir este participante"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase block">Nome completo</label>
                      <input 
                        type="text" 
                        value={client.name}
                        onChange={(e) => {
                          const updated = [...checkoutClients];
                          updated[index].name = e.target.value;
                          setCheckoutClients(updated);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 font-semibold"
                        placeholder="Nome completo do cliente"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase block">CPF</label>
                        <input 
                          type="text" 
                          value={client.cpf}
                          onChange={(e) => {
                            const updated = [...checkoutClients];
                            updated[index].cpf = e.target.value;
                            setCheckoutClients(updated);
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 font-mono"
                          placeholder="691.903.801-34"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase block">Telefone</label>
                        <input 
                          type="text" 
                          value={client.tel}
                          onChange={(e) => {
                            const updated = [...checkoutClients];
                            updated[index].tel = e.target.value;
                            setCheckoutClients(updated);
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 font-mono"
                          placeholder="61-9-8433-8810"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Action submit */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="text-left">
                <span className="text-slate-400 block text-[10px]">SALDO PÓS-COMPRA</span>
                <span className="font-extrabold text-slate-800 font-mono">
                  R$ {(userBalance - ((selectedBolao ? selectedBolao.shareValue : 1000) * checkoutCotasCount)).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <button 
                onClick={handleCompleteReservation}
                disabled={!selectedBolao}
                className="bg-[#10b981] hover:bg-[#059669] text-white font-extrabold px-6 py-2.5 rounded-xl border border-[#10b981] disabled:bg-slate-200 disabled:border-slate-200 disabled:text-slate-400 transition-all shadow-md shadow-[#10b981]/10"
              >
                Reservar
              </button>
            </div>
          </div>

          {/* REAL ORIENTAÇÕES REQUIREMENTS CHECKLIST LISTED IN THE SECOND IMAGE */}
          <div className="bg-slate-900 text-slate-200 rounded-3xl p-6 border border-slate-800 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] text-amber-400 font-mono uppercase tracking-widest font-bold block">✓ Especificações Técnicas</span>
              <h3 className="font-extrabold text-white text-base mt-1">Requisitos do Protótipo</h3>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Confira como as diretrizes listadas no bloco de "Orientações" da imagem foram mapeadas e implementadas de forma totalmente interativa:
            </p>

            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold shrink-0">✓</span>
                <div>
                  <strong className="text-white block">Cadastro de Lotérica:</strong>
                  <span className="text-slate-400 text-[11px] block">Use o botão no menu do topo para customizar os dados da Lotérica Credenciada TICKW.</span>
                </div>
              </li>
              <li className="flex gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold shrink-0">✓</span>
                <div>
                  <strong className="text-white block">Tela ADM Cadastrar Bolão:</strong>
                  <span className="text-slate-400 text-[11px] block">Formulário interativo logo abaixo para adicionar novos bolões com valores de cota e taxas.</span>
                </div>
              </li>
              <li className="flex gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold shrink-0">✓</span>
                <div>
                  <strong className="text-white block">Gestão de Créditos & Estornos:</strong>
                  <span className="text-slate-400 text-[11px] block">Aba Extrato simula créditos manuais e devoluções para a lotérica de forma imediata.</span>
                </div>
              </li>
              <li className="flex gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold shrink-0">✓</span>
                <div>
                  <strong className="text-white block">Regra do Prazo Limite (16 horas):</strong>
                  <span className="text-slate-400 text-[11px] block">Cotas "Em preparação" bloqueiam edição caso a simulação de prazo excedido do topo esteja ativa!</span>
                </div>
              </li>
              <li className="flex gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold shrink-0">✓</span>
                <div>
                  <strong className="text-white block">Bloqueio após Primeiro Compartilhamento:</strong>
                  <span className="text-slate-400 text-[11px] block">Ao clicar no ícone de compartilhamento na tela de clientes, os dados ficam blindados contra alterações!</span>
                </div>
              </li>
            </ul>
          </div>

          {/* ADM BOLÃO CADASTRO FORM (From Instructions: Tela adm de cadastrar bolão) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4">
            <div className="border-b border-slate-100 pb-2.5">
              <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wide">Cadastrar Novo Bolão (ADM)</h4>
              <p className="text-[11px] text-slate-500">Adicione novos bolões que refletirão automaticamente na tela de pesquisa de cotas.</p>
            </div>

            <form onSubmit={handleCreateBolaoSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-600 font-bold block mb-1">Título do Bolão</label>
                <input 
                  type="text" 
                  value={newBolaoForm.title}
                  onChange={(e) => setNewBolaoForm({ ...newBolaoForm, title: e.target.value })}
                  placeholder="Dupla sena de Páscoa"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 font-bold block mb-1">Tipo Loteria</label>
                  <select 
                    value={newBolaoForm.type}
                    onChange={(e) => setNewBolaoForm({ ...newBolaoForm, type: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-slate-800 font-bold"
                  >
                    <option value="Mega">Mega-Sena</option>
                    <option value="Quina">Quina</option>
                    <option value="Dupla">Dupla Sena</option>
                    <option value="Lotofácil">Lotofácil</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-600 font-bold block mb-1">Vencimento do Jogo</label>
                  <input 
                    type="text" 
                    value={newBolaoForm.expiryDate}
                    onChange={(e) => setNewBolaoForm({ ...newBolaoForm, expiryDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-slate-600 font-bold block mb-1">Valor Cota (R$)</label>
                  <input 
                    type="number" 
                    value={newBolaoForm.shareValue}
                    onChange={(e) => setNewBolaoForm({ ...newBolaoForm, shareValue: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-slate-800 font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-bold block mb-1">Sua Tarifa (R$)</label>
                  <input 
                    type="number" 
                    value={newBolaoForm.yourFeePerShare}
                    onChange={(e) => setNewBolaoForm({ ...newBolaoForm, yourFeePerShare: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-slate-800 font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-bold block mb-1">Cotas Totais</label>
                  <input 
                    type="number" 
                    value={newBolaoForm.sharesTotal}
                    onChange={(e) => setNewBolaoForm({ ...newBolaoForm, sharesTotal: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-2 text-slate-800 font-bold"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-2.5 rounded-xl transition-all uppercase tracking-wide text-xs"
              >
                Cadastrar Bolão TICKW
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* FOOTER SECTION */}
      <footer className="bg-white border-t border-slate-200 py-6 text-slate-400 text-xs text-center mt-auto">
        <p>© 2026 TICKW Caixa - Sistema de Reservas Licenciado para {loteraName}.</p>
        <p className="mt-1 text-slate-300">Protótipo de alta fidelidade simulado em React & Tailwind CSS.</p>
      </footer>

      {/* POPUP 1: VISUALIZAR CLIENTES / GERENCIAMENTO DE CLIENTES MODAL (MATCHING SCREEN 6) */}
      <AnimatePresence>
        {viewingClientsPool && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-100 flex flex-col"
            >
              {/* Header */}
              <div className="bg-[#fcfdfd] border-b border-slate-100 px-6 py-4 flex justify-between items-center text-left">
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-1.5">
                    <Users className="w-5 h-5 text-[#10b981]" />
                    <span>Visualizar Clientes / Cotas Ativas</span>
                  </h3>
                  <span className="text-xs text-slate-400 font-mono block uppercase mt-0.5">Bolão: {viewingClientsPool.title}</span>
                </div>
                <button 
                  onClick={() => {
                    setViewingClientsPool(null);
                    setEditingClient(null);
                  }}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {/* List of Cotas of Clients exactly styled as Screen 6 */}
              <div className="p-6 space-y-4 max-h-[450px] overflow-y-auto text-left">
                {clients.filter(c => c.lotteryType === viewingClientsPool.type).map((client) => {
                  const isLockedBy16h = client.status === "Em preparação" && timePassed16h;
                  const isLockedByShare = client.shared;
                  const isFullyLocked = isLockedBy16h || isLockedByShare;

                  return (
                    <div 
                      key={client.id}
                      className="bg-[#fcfdfd] border border-slate-200 rounded-2xl p-4 space-y-3 relative shadow-sm"
                    >
                      {/* Top customer name row */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            defaultChecked 
                            className="rounded text-[#10b981] focus:ring-[#10b981] w-4 h-4"
                          />
                          <span className="font-extrabold text-slate-800 text-sm uppercase">
                            {client.name}
                          </span>
                          
                          {/* Edit Pencil icon */}
                          <button 
                            onClick={() => {
                              if (isLockedByShare) {
                                triggerToast("Não é possível editar: cota já compartilhada!");
                                return;
                              }
                              if (isLockedBy16h) {
                                triggerToast("Não é possível editar: prazo de 16h excedido para cotas Em preparação!");
                                return;
                              }
                              setEditingClient(client);
                            }}
                            className={`p-1 rounded hover:bg-slate-100 transition-all ${isFullyLocked ? "opacity-30 cursor-not-allowed" : "text-slate-600"}`}
                            title="Editar Dados da Cota"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Share count badge */}
                        <span className="text-[10px] font-bold border border-slate-200 bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {client.shareCount} cota
                        </span>
                      </div>

                      {/* Info details: CPF, Tel, creation and status */}
                      <div className="space-y-1.5 text-xs text-slate-600 border-t border-dashed border-slate-100 pt-2 font-medium">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase font-mono block">CPF</span>
                            <span className="text-slate-800 font-mono">{client.cpf}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase font-mono block">Telefone</span>
                            <span className="text-slate-800 font-mono">{client.tel}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-1">
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase block">Criação bolão</span>
                            <span className="text-slate-700">{client.lotteryType}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase block">Data e hora</span>
                            <span className="text-slate-700 font-mono text-[10px]">{client.createdAtTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status indicator row from Screen 6: "Disponível para cliente" with eye, share icon and count */}
                      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                          <span>Disponível para cliente</span>
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          
                          {/* Share button clicking locks cota according to image rule */}
                          <button 
                            onClick={() => handleShareCota(client.id)}
                            className={`p-1 rounded hover:bg-slate-100 transition-all ${client.shared ? "text-[#10b981]" : "text-slate-400"}`}
                            title="Compartilhar com este cliente"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                          
                          <span className="text-[11px] font-bold font-mono text-slate-600">3</span>
                        </div>

                        {/* Restriction details banner */}
                        <div className="text-[10px] font-bold">
                          {client.shared ? (
                            <span className="text-[#059669] bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-100">
                              <Lock className="w-3 h-3" /> Compartilhado (Travado)
                            </span>
                          ) : isLockedBy16h ? (
                            <span className="text-[#dc2626] bg-rose-50 px-2 py-0.5 rounded flex items-center gap-1 border border-rose-100">
                              <AlertTriangle className="w-3 h-3 animate-pulse" /> Trava 16h Ativa
                            </span>
                          ) : (
                            <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1 border border-amber-100">
                              <Unlock className="w-3 h-3" /> Liberado p/ Edição
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {clients.filter(c => c.lotteryType === viewingClientsPool.type).length === 0 && (
                  <p className="text-center text-slate-400 text-xs py-10">Não há reservas ativas para esta modalidade ainda.</p>
                )}
              </div>

              {/* Bottom footer share-all button from Screen 6 */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex flex-col gap-3">
                
                {/* Client editing quick panel if open */}
                {editingClient && (
                  <div className="bg-white border border-amber-300 rounded-2xl p-4 space-y-3 shadow-md text-left">
                    <span className="text-xs font-bold text-amber-700 block">Editar Dados da Cota:</span>
                    <div className="space-y-2 text-xs">
                      <div>
                        <label className="text-[10px] text-slate-400 font-bold block mb-1">Nome completo</label>
                        <input 
                          type="text" 
                          value={editingClient.name}
                          onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-slate-800 font-semibold"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 font-bold block mb-1">CPF</label>
                          <input 
                            type="text" 
                            value={editingClient.cpf}
                            onChange={(e) => setEditingClient({ ...editingClient, cpf: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-slate-800 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 font-bold block mb-1">Telefone</label>
                          <input 
                            type="text" 
                            value={editingClient.tel}
                            onChange={(e) => setEditingClient({ ...editingClient, tel: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-slate-800 font-mono"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-1">
                        <button 
                          onClick={() => setEditingClient(null)}
                          className="px-3 py-1 bg-slate-100 rounded text-[11px] font-bold text-slate-500"
                        >
                          Cancelar
                        </button>
                        <button 
                          onClick={handleUpdateClientInfo}
                          className="px-3 py-1 bg-emerald-500 rounded text-[11px] font-bold text-slate-950"
                        >
                          Salvar Alterações
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <button 
                  onClick={handleShareAll}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 rounded-xl uppercase tracking-wider text-xs"
                >
                  compartilhar para todos
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* POPUP 2: CONFIGURAR / CADASTRAR LOTÉRICA */}
      <AnimatePresence>
        {showLoteraConfigModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden border border-slate-100 p-6 space-y-4"
            >
              <div className="text-left border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-slate-900 text-base">Configurar Lotérica</h3>
                <p className="text-xs text-slate-500">Mude os dados da lotérica responsável credenciada no TICKW.</p>
              </div>

              <div className="space-y-3.5 text-xs text-left">
                <div>
                  <label className="text-slate-600 font-bold block mb-1">Nome da Lotérica</label>
                  <input 
                    type="text" 
                    value={loteraName}
                    onChange={(e) => setLoteraName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-bold block mb-1">Cidade / UF</label>
                  <input 
                    type="text" 
                    value={loteraCity}
                    onChange={(e) => setLoteraCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-semibold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 text-xs font-bold">
                <button 
                  onClick={() => setShowLoteraConfigModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition-all"
                >
                  Fechar
                </button>
                <button 
                  onClick={() => {
                    setShowLoteraConfigModal(false);
                    triggerToast("Dados da lotérica sincronizados com o TICKW!");
                  }}
                  className="px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl transition-all"
                >
                  Salvar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
