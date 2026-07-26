import React, { useState } from "react";
import { EventItem, Operator, Order, Settlement, DREDay } from "../../types/nexoTickets";
import {
  MOCK_EVENTS,
  MOCK_OPERATORS,
  INITIAL_ORDERS,
  MOCK_SETTLEMENTS,
  MOCK_DRE_DAYS
} from "../../data/nexoTicketsData";
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  ShoppingBag,
  CreditCard,
  Users,
  Split,
  Landmark,
  FileText,
  PieChart as PieChartIcon,
  Bell,
  Settings,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertCircle,
  Download,
  Filter,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Zap,
  Clock,
  RefreshCw,
  X
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "events" | "operators" | "split" | "dre" | "order_detail" | "settlements" | "refunds" | "reports" | "settings"
  >("overview");

  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);

  // Split Simulator Calculator State
  const [simSaleAmount, setSimSaleAmount] = useState(176);
  const [simSpacePercent, setSimSpacePercent] = useState(20);
  const [simOperatorPercent, setSimOperatorPercent] = useState(80);
  const [simPaymentMethod, setSimPaymentMethod] = useState<"pix" | "card">("pix");
  const [simInstallments, setSimInstallments] = useState(4);

  // Calculation for simulator
  const simGatewayFee = simPaymentMethod === "pix" ? 1.2 : 6.8;
  const simNetBase = simSaleAmount - simGatewayFee;
  const simSpaceNet = (simNetBase * simSpacePercent) / 100;
  const simOperatorNet = (simNetBase * simOperatorPercent) / 100;

  // Recharts Mock Data
  const salesTrendData = [
    { date: "18/07", total: 18400, space: 3680, operator: 14720 },
    { date: "19/07", total: 22100, space: 4420, operator: 17680 },
    { date: "20/07", total: 19500, space: 3900, operator: 15600 },
    { date: "21/07", total: 28400, space: 5680, operator: 22720 },
    { date: "22/07", total: 12960, space: 2454, operator: 9818 },
    { date: "23/07", total: 18420, space: 3485, operator: 13940 },
    { date: "24/07", total: 14780, space: 2793, operator: 11173 }
  ];

  const paymentMethodsPie = [
    { name: "Pix Instantâneo", value: 58, color: "#1FA971" },
    { name: "Cartão à Vista", value: 24, color: "#2775EA" },
    { name: "Cartão Parcelado", value: 18, color: "#F0448B" }
  ];

  return (
    <div className="bg-[#0D0B14] text-white min-h-screen font-sans flex flex-col lg:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-[#12101B] border-r border-white/10 p-4 space-y-6 shrink-0">
        <div className="flex items-center space-x-2 px-2 py-3 border-b border-white/10">
          <div className="p-2 bg-[#6D3DF5] rounded-xl text-white">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-white text-sm">Nexo Rooftop</h2>
            <p className="text-[10px] text-[#F0448B] font-bold">PAINEL DO ESPAÇO</p>
          </div>
        </div>

        <nav className="space-y-1 text-xs font-bold text-gray-300">
          {[
            { id: "overview", label: "Dashboard Geral", icon: LayoutDashboard },
            { id: "events", label: "Cadastro de Eventos", icon: Calendar },
            { id: "operators", label: "Operadores Parceiros", icon: Users },
            { id: "split", label: "Split de Pagamentos", icon: Split },
            { id: "dre", label: "DRE Diário por Evento", icon: FileText },
            { id: "order_detail", label: "Detalhamento de Pedido", icon: DollarSign },
            { id: "settlements", label: "Liquidações & Repasses", icon: TrendingUp },
            { id: "refunds", label: "Reembolsos", icon: RefreshCw },
            { id: "reports", label: "Relatórios & Notificações", icon: Bell },
            { id: "settings", label: "Configurações", icon: Settings }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full p-2.5 rounded-xl text-left flex items-center space-x-2.5 transition-all ${
                  isActive
                    ? "bg-[#6D3DF5] text-white shadow-lg shadow-[#6D3DF5]/30 font-extrabold"
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#F0448B]"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-x-hidden">
        {/* Top Bar Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1FA971]/20 text-[#1FA971] border border-[#1FA971]/40">
                SPLIT AUTOMATIZADO ATIVO
              </span>
              <span className="text-xs text-gray-400">Ambiente de Operações Financeiras</span>
            </div>
            <h1 className="text-2xl font-black text-white">Gestão Financeira e Vendas de Ingressos</h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCreateEventOpen(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-[#6D3DF5] to-[#F0448B] text-white font-bold text-xs rounded-xl hover:brightness-110 shadow-lg flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar Novo Evento</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW METRICS & CHARTS */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Top Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Total Transacionado</span>
                <span className="text-2xl font-black text-white">R$ 684.920,00</span>
                <span className="text-[10px] text-[#1FA971] font-bold flex items-center space-x-1">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+18.4% vs mês anterior</span>
                </span>
              </div>

              <div className="p-5 bg-[#6D3DF5]/10 border border-[#6D3DF5]/30 rounded-2xl space-y-2">
                <span className="text-[#6D3DF5] text-[10px] uppercase font-bold block">Líquido do Espaço (20%)</span>
                <span className="text-2xl font-black text-white">R$ 126.480,40</span>
                <span className="text-[10px] text-gray-300">Receita própria garantida</span>
              </div>

              <div className="p-5 bg-[#F0448B]/10 border border-[#F0448B]/30 rounded-2xl space-y-2">
                <span className="text-[#F0448B] text-[10px] uppercase font-bold block">Líquido dos Operadores (80%)</span>
                <span className="text-2xl font-black text-white">R$ 505.921,60</span>
                <span className="text-[10px] text-gray-300">Destinado às subcontas</span>
              </div>

              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Taxas do Gateway</span>
                <span className="text-2xl font-black text-[#F2B84B]">R$ 42.518,00</span>
                <span className="text-[10px] text-gray-400">Processamento proporcional</span>
              </div>
            </div>

            {/* Recharts Data Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Sales Trend Chart (8 cols) */}
              <div className="lg:col-span-8 p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="font-extrabold text-white text-sm">Evolução Diária de Vendas & Split</h3>
                  <span className="text-xs text-gray-400">Últimos 7 dias</span>
                </div>

                <div className="h-72 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesTrendData}>
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6D3DF5" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#6D3DF5" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorOperator" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F0448B" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#F0448B" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" stroke="#6B6B78" fontSize={11} />
                      <YAxis stroke="#6B6B78" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: "#12101B", borderColor: "#6D3DF5", borderRadius: "12px" }} />
                      <Legend />
                      <Area type="monotone" dataKey="total" name="Total Bruto (R$)" stroke="#6D3DF5" fillOpacity={1} fill="url(#colorTotal)" />
                      <Area type="monotone" dataKey="operator" name="Líquido Operador (R$)" stroke="#F0448B" fillOpacity={1} fill="url(#colorOperator)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Payment Methods Breakdown (4 cols) */}
              <div className="lg:col-span-4 p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4 shadow-xl">
                <h3 className="font-extrabold text-white text-sm border-b border-white/10 pb-3">Métodos de Pagamento</h3>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={paymentMethodsPie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={5} dataKey="value">
                        {paymentMethodsPie.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#12101B", borderRadius: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2 text-xs">
                  {paymentMethodsPie.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-300">{item.name}</span>
                      </span>
                      <strong className="text-white">{item.value}%</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SPLIT CONFIGURATION & SIMULATOR */}
        {(activeTab === "split" || activeTab === "overview") && (
          <div className="p-6 bg-gradient-to-br from-[#25164F] to-[#12101B] border border-[#6D3DF5]/50 rounded-3xl space-y-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] text-[#F0448B] font-black uppercase tracking-wider block">
                  REGRA DE DIVISÃO AUTOMÁTICA
                </span>
                <h3 className="text-xl font-black text-white">Configuração & Simulador de Split de Pagamentos</h3>
              </div>
              <span className="px-3 py-1 bg-[#1FA971]/20 text-[#1FA971] border border-[#1FA971]/40 rounded-full text-xs font-bold">
                ✓ REGRA VÁLIDA (100%)
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Event Split Rule Setup (6 cols) */}
              <div className="lg:col-span-6 p-5 bg-black/40 border border-white/10 rounded-2xl space-y-4">
                <h4 className="font-bold text-white text-sm">Divisão do Evento: Sunset Experience 2026</h4>

                <div className="space-y-3">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white text-xs block">Espaço (Nexo Rooftop)</span>
                      <span className="text-[10px] text-gray-400 font-mono">Recebedor: REC-NEXO-001</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <input
                        type="number"
                        value={simSpacePercent}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setSimSpacePercent(val);
                          setSimOperatorPercent(100 - val);
                        }}
                        className="w-16 p-1.5 bg-black border border-[#6D3DF5] rounded text-center text-white font-bold"
                      />
                      <span className="font-bold text-white">%</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white text-xs block">Operador (Sunset Eventos Ltda.)</span>
                      <span className="text-[10px] text-gray-400 font-mono">Recebedor: REC-SUNSET-001</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <input
                        type="number"
                        value={simOperatorPercent}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setSimOperatorPercent(val);
                          setSimSpacePercent(100 - val);
                        }}
                        className="w-16 p-1.5 bg-black border border-[#6D3DF5] rounded text-center text-white font-bold"
                      />
                      <span className="font-bold text-white">%</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-400">
                  * As taxas do gateway de pagamento são descontadas proporcionalmente entre as duas partes antes da apuração líquida.
                </p>
              </div>

              {/* Calculator Outcome (6 cols) */}
              <div className="lg:col-span-6 p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                <h4 className="font-bold text-white text-sm">Simulador em Tempo Real por Transação</h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-gray-400 text-[10px] uppercase font-bold mb-1">
                      Valor da Venda (R$)
                    </label>
                    <input
                      type="number"
                      value={simSaleAmount}
                      onChange={(e) => setSimSaleAmount(Number(e.target.value))}
                      className="w-full p-2 bg-black border border-white/10 rounded text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-[10px] uppercase font-bold mb-1">
                      Método
                    </label>
                    <select
                      value={simPaymentMethod}
                      onChange={(e) => setSimPaymentMethod(e.target.value as any)}
                      className="w-full p-2 bg-black border border-white/10 rounded text-white font-bold cursor-pointer"
                    >
                      <option value="pix">Pix (R$ 1,20 taxa)</option>
                      <option value="card">Cartão (R$ 6,80 taxa)</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-black/60 rounded-xl space-y-2 text-xs border border-white/10">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Valor Bruto:</span>
                    <strong className="text-white">R$ {simSaleAmount.toFixed(2)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Taxa Gateway (Proporcional):</span>
                    <span className="text-[#F2B84B]">- R$ {simGatewayFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white pt-2 border-t border-white/10">
                    <span>Base Líquida Dividida:</span>
                    <span>R$ {simNetBase.toFixed(2)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                    <div className="p-2 bg-[#6D3DF5]/20 border border-[#6D3DF5]/40 rounded-lg">
                      <span className="text-[10px] text-[#6D3DF5] font-bold block uppercase">
                        Espaço ({simSpacePercent}%)
                      </span>
                      <strong className="text-white text-sm">R$ {simSpaceNet.toFixed(2)}</strong>
                    </div>

                    <div className="p-2 bg-[#F0448B]/20 border border-[#F0448B]/40 rounded-lg">
                      <span className="text-[10px] text-[#F0448B] font-bold block uppercase">
                        Operador ({simOperatorPercent}%)
                      </span>
                      <strong className="text-white text-sm">R$ {simOperatorNet.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DRE DIÁRIO POR EVENTO */}
        {(activeTab === "dre" || activeTab === "overview") && (
          <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h3 className="font-extrabold text-white text-base">DRE Diário por Evento (Apuração de Resultado)</h3>
                <p className="text-xs text-gray-400">Sunset Experience 2026 — Demonstrativo financeiro consolidado</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alert("Relatório DRE exportado em PDF!")}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-lg text-white flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar PDF</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">Data</th>
                    <th className="py-3 px-2 text-right">Vendas</th>
                    <th className="py-3 px-2 text-right">Bruto (R$)</th>
                    <th className="py-3 px-2 text-right">Taxas (R$)</th>
                    <th className="py-3 px-2 text-right">Líquido Total</th>
                    <th className="py-3 px-2 text-right text-[#6D3DF5]">Líquido Espaço (20%)</th>
                    <th className="py-3 px-2 text-right text-[#F0448B]">Líquido Operador (80%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {MOCK_DRE_DAYS.map((row) => (
                    <tr key={row.date} className="hover:bg-white/5">
                      <td className="py-3 px-2 font-bold text-white">{row.date}</td>
                      <td className="py-3 px-2 text-right text-gray-300">{row.salesCount}</td>
                      <td className="py-3 px-2 text-right text-white">R$ {row.grossAmount.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right text-[#F2B84B]">R$ {row.gatewayFees.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right font-bold text-white">R$ {row.netAmount.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right font-bold text-[#6D3DF5]">R$ {row.spaceShare.toFixed(2)}</td>
                      <td className="py-3 px-2 text-right font-bold text-[#F0448B]">R$ {row.operatorShare.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: DETALHAMENTO DE PEDIDO ESPECÍFICO */}
        {activeTab === "order_detail" && (
          <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs text-gray-400 font-mono">PEDIDO PED-2026-008421</span>
                <h3 className="text-xl font-black text-white">Detalhamento da Transação & Split Processado</h3>
              </div>
              <span className="px-3 py-1 bg-[#1FA971] text-white font-bold text-xs rounded-full">
                PAGAMENTO APROVADO
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Cliente</span>
                <strong className="text-white text-sm block">Marcelo Oliveira</strong>
                <span className="text-gray-400 font-mono">CPF: 123.456.789-00</span>
              </div>

              <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Forma de Pagamento</span>
                <strong className="text-[#1FA971] text-sm block uppercase font-black">Pix Instantâneo</strong>
                <span className="text-gray-400">Total Pago: R$ 176,00</span>
              </div>

              <div className="p-4 bg-[#6D3DF5]/20 rounded-xl border border-[#6D3DF5]/40">
                <span className="text-[#6D3DF5] block text-[10px] uppercase font-bold">Repasse Espaço (20%)</span>
                <strong className="text-white text-base block">R$ 34,96</strong>
                <span className="text-gray-300">Líquido na subconta</span>
              </div>

              <div className="p-4 bg-[#F0448B]/20 rounded-xl border border-[#F0448B]/40">
                <span className="text-[#F0448B] block text-[10px] uppercase font-bold">Repasse Operador (80%)</span>
                <strong className="text-white text-base block">R$ 139,84</strong>
                <span className="text-gray-300">Sunset Eventos Ltda.</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: LIQUIDAÇÕES & REPASSES */}
        {activeTab === "settlements" && (
          <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-xl font-black text-white border-b border-white/10 pb-3">Central de Liquidações</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 font-bold uppercase text-[10px]">
                    <th className="py-3 px-2">Código</th>
                    <th className="py-3 px-2">Evento</th>
                    <th className="py-3 px-2">Beneficiário</th>
                    <th className="py-3 px-2">Tipo</th>
                    <th className="py-3 px-2 text-right">Valor (R$)</th>
                    <th className="py-3 px-2">Data Prevista</th>
                    <th className="py-3 px-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {MOCK_SETTLEMENTS.map((s) => (
                    <tr key={s.id} className="hover:bg-white/5">
                      <td className="py-3 px-2 font-bold text-[#F0448B]">{s.code}</td>
                      <td className="py-3 px-2 text-white font-sans">{s.eventName}</td>
                      <td className="py-3 px-2 text-gray-300 font-sans">{s.beneficiaryName}</td>
                      <td className="py-3 px-2 text-gray-400 font-sans">{s.beneficiaryType}</td>
                      <td className="py-3 px-2 text-right font-bold text-white">R$ {s.amount.toFixed(2)}</td>
                      <td className="py-3 px-2 text-gray-300">{s.scheduledDate}</td>
                      <td className="py-3 px-2 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            s.status === "Liquidada" ? "bg-[#1FA971] text-white" : "bg-[#F2B84B] text-[#12101B]"
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* CREATE EVENT WIZARD MODAL (7 Steps) */}
      {createEventOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#12101B] border border-[#6D3DF5] rounded-3xl w-full max-w-2xl p-6 space-y-6 text-white font-sans">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] text-[#F0448B] font-bold uppercase">ETAPA {wizardStep} DE 7</span>
                <h3 className="text-lg font-black">Cadastro de Novo Evento</h3>
              </div>
              <button onClick={() => setCreateEventOpen(false)} className="p-1 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Content */}
            <div className="space-y-4 text-xs">
              {wizardStep === 1 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-white text-sm">1. Informações Gerais</h4>
                  <div>
                    <label className="block text-gray-400 mb-1">Nome do Evento</label>
                    <input
                      type="text"
                      defaultValue="Sunset Festival Edition 2027"
                      className="w-full p-2.5 bg-white/5 border border-white/10 rounded-xl text-white"
                    />
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-white text-sm">2. Localização</h4>
                  <p className="text-gray-400">Espaço cadastrado: Nexo Rooftop — São Paulo/SP</p>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-white text-sm">3. Operador Responsável</h4>
                  <p className="text-gray-400">Operador: Sunset Eventos Ltda. (REC-SUNSET-001)</p>
                </div>
              )}

              {wizardStep === 4 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-white text-sm">4. Lotes e Tipos de Ingressos</h4>
                  <p className="text-gray-400">Pista (R$80), Premium (R$150), Camarote (R$280)</p>
                </div>
              )}

              {wizardStep === 5 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-white text-sm">5. Configuração de Pagamento</h4>
                  <p className="text-gray-400">Pix ativado, Cartão até 6x com juros no comprador</p>
                </div>
              )}

              {wizardStep === 6 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-white text-sm">6. Divisão do Split (Regra de Subcontas)</h4>
                  <p className="text-gray-400">20% Espaço / 80% Operador com rateio de taxas</p>
                </div>
              )}

              {wizardStep === 7 && (
                <div className="space-y-3 text-center py-4">
                  <CheckCircle2 className="w-12 h-12 text-[#1FA971] mx-auto" />
                  <h4 className="font-bold text-white text-base">Evento Pronto para Publicação!</h4>
                  <p className="text-gray-400">A página pública e as regras de split já estão ativas no sistema.</p>
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setWizardStep(Math.max(1, wizardStep - 1))}
                disabled={wizardStep === 1}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold disabled:opacity-30"
              >
                Anterior
              </button>

              {wizardStep < 7 ? (
                <button
                  onClick={() => setWizardStep(wizardStep + 1)}
                  className="px-5 py-2 bg-[#6D3DF5] hover:bg-[#6D3DF5]/90 rounded-xl text-xs font-bold text-white"
                >
                  Próximo
                </button>
              ) : (
                <button
                  onClick={() => {
                    alert("Evento cadastrado e publicado com sucesso!");
                    setCreateEventOpen(false);
                    setWizardStep(1);
                  }}
                  className="px-5 py-2 bg-[#1FA971] hover:bg-[#1FA971]/90 rounded-xl text-xs font-bold text-white"
                >
                  Concluir & Publicar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
