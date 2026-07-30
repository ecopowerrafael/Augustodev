import React from 'react';
import { 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Send, 
  XCircle, 
  Users, 
  Calendar, 
  Plus, 
  ArrowUpRight, 
  MessageSquare, 
  Zap, 
  ChevronRight,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { Client, Charge, DispatchLog } from '../../types/cobrancaflow';

interface CobrancaDashboardProps {
  clients: Client[];
  charges: Charge[];
  dispatchLogs: DispatchLog[];
  onNewChargeClick: () => void;
  onNewClientClick: () => void;
  onViewAgendaClick: () => void;
  onViewOverdueClick: () => void;
  onSendInstantWhatsapp: (charge: Charge) => void;
  onViewChargeDetails: (charge: Charge) => void;
}

export const CobrancaDashboard: React.FC<CobrancaDashboardProps> = ({
  clients,
  charges,
  dispatchLogs,
  onNewChargeClick,
  onNewClientClick,
  onViewAgendaClick,
  onViewOverdueClick,
  onSendInstantWhatsapp,
  onViewChargeDetails
}) => {
  // Calculated Indicators
  const totalPending = charges
    .filter(c => ['agendada', 'a_vencer', 'vence_hoje', 'aguardando_pagamento'].includes(c.status))
    .reduce((acc, c) => acc + c.amount, 0);

  const totalReceived = charges
    .filter(c => c.status === 'paga')
    .reduce((acc, c) => acc + (c.paidAmount || c.amount), 0);

  const pendingCount = charges.filter(c => ['a_vencer', 'agendada'].includes(c.status)).length;
  const overdueCharges = charges.filter(c => c.status === 'vencida');
  const overdueTotal = overdueCharges.reduce((acc, c) => acc + c.amount, 0);

  const dueTodayCharges = charges.filter(c => c.status === 'vence_hoje' || c.dueDate === '2026-07-30');
  const dueTodayTotal = dueTodayCharges.reduce((acc, c) => acc + c.amount, 0);

  const sentCount = dispatchLogs.filter(l => ['enviada', 'entregue', 'lida'].includes(l.status)).length;
  const failedCount = dispatchLogs.filter(l => l.status === 'falha').length;

  // Chart Data: Projection
  const monthlyProjectionData = [
    { month: 'Fev', recebido: 12400, pendente: 1200 },
    { month: 'Mar', recebido: 15800, pendente: 2100 },
    { month: 'Abr', recebido: 18200, pendente: 1800 },
    { month: 'Mai', recebido: 21000, pendente: 2400 },
    { month: 'Jun', recebido: 23500, pendente: 3100 },
    { month: 'Jul (Atual)', recebido: totalReceived, pendente: totalPending },
  ];

  // Chart Data: Status Distribution
  const statusDistribution = [
    { name: 'Pagas', value: charges.filter(c => c.status === 'paga').length, color: '#16A36A' },
    { name: 'Vence Hoje', value: charges.filter(c => c.status === 'vence_hoje').length, color: '#2563EB' },
    { name: 'A Vencer', value: charges.filter(c => c.status === 'a_vencer').length, color: '#F5B942' },
    { name: 'Vencidas', value: charges.filter(c => c.status === 'vencida').length, color: '#DC4C4C' },
    { name: 'Agendadas', value: charges.filter(c => c.status === 'agendada').length, color: '#94A3B8' },
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Quick Actions Shortcuts Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-blue-600" />
          <span className="font-extrabold text-sm text-slate-800">Atalhos Rápidos:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onNewChargeClick}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Cobrança</span>
          </button>

          <button
            onClick={onNewClientClick}
            className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-extrabold text-xs rounded-xl transition flex items-center space-x-1.5"
          >
            <Users className="w-4 h-4" />
            <span>Novo Cliente</span>
          </button>

          <button
            onClick={onViewAgendaClick}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl transition flex items-center space-x-1.5"
          >
            <Calendar className="w-4 h-4 text-slate-600" />
            <span>Ver Agenda</span>
          </button>

          <button
            onClick={onViewOverdueClick}
            className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 font-extrabold text-xs rounded-xl transition flex items-center space-x-1.5"
          >
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>Consultar Vencidos ({overdueCharges.length})</span>
          </button>
        </div>
      </div>

      {/* 8 Primary Indicator Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total a Receber */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-blue-300 transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total a Receber</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{formatCurrency(totalPending)}</div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Acumulado a vencer e agendado</p>
        </div>

        {/* Card 2: Recebido no Mês */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-emerald-300 transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Recebido no Mês</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-700">{formatCurrency(totalReceived)}</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">↑ +14.2% em relação a Junho</p>
        </div>

        {/* Card 3: Vence Hoje */}
        <div className="bg-white border border-blue-200 bg-blue-50/30 rounded-2xl p-5 shadow-xs transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900">Vence Hoje (Atenção)</span>
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-blue-900">{formatCurrency(dueTodayTotal)}</div>
          <p className="text-[11px] text-blue-700 font-bold mt-1">{dueTodayCharges.length} cobranças para hoje</p>
        </div>

        {/* Card 4: Cobranças Vencidas */}
        <div className="bg-white border border-red-200 bg-red-50/20 rounded-2xl p-5 shadow-xs transition">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-900">Em Atraso / Vencidas</span>
            <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-red-600">{formatCurrency(overdueTotal)}</div>
          <p className="text-[11px] text-red-700 font-bold mt-1">{overdueCharges.length} clientes em atraso</p>
        </div>

        {/* Card 5: Cobranças Pendentes (Count) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Cobranças Pendentes</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{pendingCount} Títulos</div>
          <p className="text-[11px] text-slate-500 mt-1">Aguardando vencimento</p>
        </div>

        {/* Card 6: Mensagens Enviadas WhatsApp */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Disparos WhatsApp</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{sentCount} Mensagens</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Taxa de entrega: 98.4%</p>
        </div>

        {/* Card 7: Falhas de Envio */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Falhas de Envio</span>
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{failedCount} Registro</div>
          <p className="text-[11px] text-slate-500 mt-1">Número sem WhatsApp / Erro</p>
        </div>

        {/* Card 8: Clientes Cadastrados */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Base de Clientes</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{clients.length} Ativos</div>
          <p className="text-[11px] text-slate-500 mt-1">100% com dados preenchidos</p>
        </div>

      </div>

      {/* Due Today Section Alert Box */}
      {dueTodayCharges.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-100 pb-3">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-blue-600 animate-ping" />
              <h3 className="font-extrabold text-base text-blue-950">
                Cobranças com Vencimento HOJE ({dueTodayCharges.length})
              </h3>
            </div>
            <p className="text-xs text-blue-800 font-semibold">
              Dispare lembrete instantâneo pelo WhatsApp com 1 clique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dueTodayCharges.map((chg) => (
              <div key={chg.id} className="bg-white border border-blue-200 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-2xs">
                <div>
                  <div className="font-extrabold text-slate-900 text-sm">{chg.clientName}</div>
                  <p className="text-xs text-slate-600 line-clamp-1">{chg.description}</p>
                  <div className="mt-1 font-black text-blue-700 text-sm">{formatCurrency(chg.amount)}</div>
                </div>

                <button
                  onClick={() => onSendInstantWhatsapp(chg)}
                  className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5 shrink-0"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar Zap</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Chart: Cashflow & Receivables Projection */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Evolução Mensal de Recebimentos</h3>
              <p className="text-xs text-slate-500 font-medium">Histórico e valores pendentes em R$</p>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Projeção Ativa
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyProjectionData}>
                <defs>
                  <linearGradient id="colorRecebido" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A36A" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#16A36A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPendente" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} tickFormatter={(val) => `R$ ${(val/1000).toFixed(0)}k`} />
                <Tooltip 
                  formatter={(value: any) => [formatCurrency(Number(value)), '']} 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', borderColor: '#CBD5E1', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Area type="monotone" dataKey="recebido" name="Recebido (R$)" stroke="#16A36A" strokeWidth={3} fillOpacity={1} fill="url(#colorRecebido)" />
                <Area type="monotone" dataKey="pendente" name="A Receber (R$)" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorPendente)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Status Breakdown */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="font-extrabold text-base text-slate-900">Distribuição por Status</h3>
            <p className="text-xs text-slate-500 font-medium">Visão geral da carteira de títulos</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [`${value} Títulos`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            {statusDistribution.map((st, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: st.color }} />
                <span className="text-slate-700 truncate">{st.name}: {st.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Dispatches & Activity Log */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">Últimos Disparos de Lembretes pelo WhatsApp</h3>
            <p className="text-xs text-slate-500 font-medium">Histórico recente de automação em tempo real</p>
          </div>
          <button
            onClick={onViewAgendaClick}
            className="text-xs font-extrabold text-blue-600 hover:text-blue-800 transition flex items-center space-x-1"
          >
            <span>Ver Registro Completo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">WhatsApp</th>
                <th className="py-3 px-4">Data / Hora</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {dispatchLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-bold text-slate-900">{log.clientName}</td>
                  <td className="py-3 px-4 text-slate-600 font-mono">{log.whatsappNumber}</td>
                  <td className="py-3 px-4 text-slate-500">{log.sentAt}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-bold text-[10px]">
                      {log.triggerType}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[10px] ${
                      log.status === 'lida' || log.status === 'entregue'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : log.status === 'falha'
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <a
                      href={`https://wa.me/55${log.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-emerald-900 font-bold hover:underline inline-flex items-center space-x-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Abrir Chat</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
