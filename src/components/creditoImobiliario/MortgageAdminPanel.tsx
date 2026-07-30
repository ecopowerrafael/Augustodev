import React, { FC, useState } from 'react';
import { 
  Building2, 
  Settings, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Edit, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Search, 
  MessageCircle, 
  DollarSign, 
  Percent, 
  Clock, 
  Lock, 
  Download,
  Eye,
  Sparkles,
  ShieldCheck,
  Save
} from 'lucide-react';
import { BankConfig, LeadData, AdminStats } from '../../types/creditoImobiliario';
import { formatCurrency, formatPercent } from '../../utils/mortgageCalculations';

interface MortgageAdminPanelProps {
  banks: BankConfig[];
  setBanks: React.Dispatch<React.SetStateAction<BankConfig[]>>;
  leads: LeadData[];
  setLeads: React.Dispatch<React.SetStateAction<LeadData[]>>;
  onCloseAdmin: () => void;
}

export const MortgageAdminPanel: FC<MortgageAdminPanelProps> = ({
  banks,
  setBanks,
  leads,
  setLeads,
  onCloseAdmin
}) => {
  const [adminTab, setAdminTab] = useState<'dashboard' | 'bancos' | 'leads' | 'historico'>('dashboard');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLeadStatus, setSelectedLeadStatus] = useState<string>('todos');

  // Editing Bank State
  const [editingBankId, setEditingBankId] = useState<string | null>(null);
  const [editRate, setEditRate] = useState<number>(0);
  const [editMinDown, setEditMinDown] = useState<number>(20);
  const [editMaxTerm, setEditMaxTerm] = useState<number>(360);

  // Filter leads
  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || l.phone.includes(searchTerm);
    const matchesStatus = selectedLeadStatus === 'todos' || l.status === selectedLeadStatus;
    return matchesSearch && matchesStatus;
  });

  // Calculate Admin Stats
  const totalSimulations = leads.length + 18; // Includes base activity
  const totalLeads = leads.length;
  const conversionRate = totalSimulations > 0 ? ((totalLeads / totalSimulations) * 100).toFixed(1) : '0.0';

  const avgPropVal = leads.length > 0 
    ? leads.reduce((acc, l) => acc + l.simulationSummary.propertyValue, 0) / leads.length 
    : 550000;

  const handleSaveBankRate = (bankId: string) => {
    setBanks(prev => prev.map(b => {
      if (b.id === bankId) {
        return {
          ...b,
          annualRate: editRate,
          minDownPaymentPercent: editMinDown,
          maxTermMonths: editMaxTerm
        };
      }
      return b;
    }));
    setEditingBankId(null);
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: LeadData['status']) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
  };

  return (
    <div className="bg-[#141514] border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl relative overflow-hidden animate-fade-in">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-[10px] font-mono font-bold uppercase tracking-wider flex items-center space-x-1">
              <Lock className="w-3 h-3" />
              <span>Painel do Gestor de Crédito</span>
            </span>
            <span className="text-stone-500 font-mono text-xs">•</span>
            <span className="font-mono text-xs text-stone-400">
              Ambiente de Configuração
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
            Painel Administrativo & <span className="italic font-normal text-amber-400">CRM de Leads</span>
          </h2>
        </div>

        <button
          onClick={onCloseAdmin}
          className="px-4 py-2 bg-stone-900 hover:bg-stone-850 text-stone-300 font-mono text-xs uppercase font-bold rounded-xl border border-stone-800 transition"
        >
          Voltar ao Simulador Público
        </button>
      </div>

      {/* Admin Sub-navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-800 pb-4 font-mono text-xs">
        {[
          { id: 'dashboard', label: 'Dashboard & Métricas', icon: BarChart3 },
          { id: 'bancos', label: 'Bancos & Taxas', icon: Building2 },
          { id: 'leads', label: `CRM de Leads (${totalLeads})`, icon: Users },
          { id: 'historico', label: 'Histórico de Simulações', icon: Clock }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl font-bold transition border flex items-center space-x-2 ${
                adminTab === tab.id
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
                  : 'bg-stone-950 text-stone-400 border-stone-850 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DASHBOARD & METRICS */}
      {adminTab === 'dashboard' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-5 bg-stone-950 border border-stone-800 rounded-2xl space-y-2">
              <span className="text-stone-400 uppercase text-[10px] block">Total de Simulações</span>
              <span className="text-white font-bold text-2xl">{totalSimulations}</span>
              <span className="text-emerald-400 text-[10px] block">+14% no último mês</span>
            </div>

            <div className="p-5 bg-stone-950 border border-stone-800 rounded-2xl space-y-2">
              <span className="text-stone-400 uppercase text-[10px] block">Leads Capturados</span>
              <span className="text-amber-400 font-bold text-2xl">{totalLeads}</span>
              <span className="text-stone-400 text-[10px] block">Taxa de Conversão: {conversionRate}%</span>
            </div>

            <div className="p-5 bg-stone-950 border border-stone-800 rounded-2xl space-y-2">
              <span className="text-stone-400 uppercase text-[10px] block">Valor Médio dos Imóveis</span>
              <span className="text-white font-bold text-2xl">{formatCurrency(avgPropVal)}</span>
              <span className="text-stone-400 text-[10px] block">Média de entrada: 22%</span>
            </div>

            <div className="p-5 bg-stone-950 border border-stone-800 rounded-2xl space-y-2">
              <span className="text-stone-400 uppercase text-[10px] block">Banco Mais Selecionado</span>
              <span className="text-sky-400 font-bold text-xl">Caixa Econômica</span>
              <span className="text-stone-400 text-[10px] block">48% das preferências</span>
            </div>
          </div>

          {/* Quick Lead Pipeline Overview */}
          <div className="p-6 bg-stone-950 border border-stone-800 rounded-3xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-white">Funil de Leads Imobiliários</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
              <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-xl text-center">
                <span className="text-sky-300 font-bold block text-lg">
                  {leads.filter(l => l.status === 'novo').length}
                </span>
                <span className="text-[10px] text-stone-400 uppercase">Novos Leads</span>
              </div>

              <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-center">
                <span className="text-amber-300 font-bold block text-lg">
                  {leads.filter(l => l.status === 'em_atendimento').length}
                </span>
                <span className="text-[10px] text-stone-400 uppercase">Em Atendimento</span>
              </div>

              <div className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl text-center">
                <span className="text-purple-300 font-bold block text-lg">
                  {leads.filter(l => l.status === 'proposta_enviada').length}
                </span>
                <span className="text-[10px] text-stone-400 uppercase">Proposta Enviada</span>
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-center">
                <span className="text-emerald-300 font-bold block text-lg">
                  {leads.filter(l => l.status === 'aprovado').length}
                </span>
                <span className="text-[10px] text-stone-400 uppercase">Aprovados</span>
              </div>

              <div className="p-3 bg-stone-900 border border-stone-800 rounded-xl text-center col-span-2 sm:col-span-1">
                <span className="text-stone-300 font-bold block text-lg">
                  {leads.filter(l => l.status === 'arquivado').length}
                </span>
                <span className="text-[10px] text-stone-400 uppercase">Arquivados</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: BANCOS & TAXAS CONFIGURATOR */}
      {adminTab === 'bancos' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <h3 className="font-serif font-bold text-xl text-white">Configuração de Regras Bancárias</h3>
            <span className="font-mono text-xs text-stone-400">
              * Alterações aplicadas instantaneamente às simulações do público.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banks.map((bank) => {
              const isEditing = editingBankId === bank.id;

              return (
                <div 
                  key={bank.id}
                  className="p-6 bg-stone-950 border border-stone-800 rounded-3xl space-y-4 relative"
                >
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-xl ${bank.logoBg} flex items-center justify-center font-mono font-bold text-white text-xs`}>
                        {bank.shortName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-lg text-white">{bank.name}</h4>
                        <span className="font-mono text-[10px] text-stone-400">Código {bank.code}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (isEditing) {
                          handleSaveBankRate(bank.id);
                        } else {
                          setEditingBankId(bank.id);
                          setEditRate(bank.annualRate);
                          setEditMinDown(bank.minDownPaymentPercent);
                          setEditMaxTerm(bank.maxTermMonths);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition flex items-center space-x-1 ${
                        isEditing
                          ? 'bg-emerald-400 text-stone-950 shadow-md'
                          : 'bg-stone-900 text-stone-300 hover:text-white border border-stone-800'
                      }`}
                    >
                      {isEditing ? <Save className="w-3.5 h-3.5" /> : <Edit className="w-3.5 h-3.5" />}
                      <span>{isEditing ? 'Salvar Regras' : 'Editar Regras'}</span>
                    </button>
                  </div>

                  {/* Bank Parameters Form / Display */}
                  <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                    <div className="p-3 bg-stone-900/60 border border-stone-850 rounded-2xl">
                      <span className="text-stone-400 text-[10px] block">Taxa Anual (% a.a.)</span>
                      {isEditing ? (
                        <input
                          type="number"
                          step={0.05}
                          value={editRate}
                          onChange={(e) => setEditRate(Number(e.target.value))}
                          className="w-full bg-stone-950 border border-emerald-400 rounded-lg px-2 py-1 text-white font-bold"
                        />
                      ) : (
                        <span className="text-emerald-400 font-bold text-sm">{bank.annualRate.toFixed(2)}%</span>
                      )}
                    </div>

                    <div className="p-3 bg-stone-900/60 border border-stone-850 rounded-2xl">
                      <span className="text-stone-400 text-[10px] block">Mín. Entrada (%)</span>
                      {isEditing ? (
                        <input
                          type="number"
                          step={5}
                          value={editMinDown}
                          onChange={(e) => setEditMinDown(Number(e.target.value))}
                          className="w-full bg-stone-950 border border-emerald-400 rounded-lg px-2 py-1 text-white font-bold"
                        />
                      ) : (
                        <span className="text-white font-bold text-sm">{bank.minDownPaymentPercent}%</span>
                      )}
                    </div>

                    <div className="p-3 bg-stone-900/60 border border-stone-850 rounded-2xl">
                      <span className="text-stone-400 text-[10px] block">Prazo Máx. (meses)</span>
                      {isEditing ? (
                        <input
                          type="number"
                          step={12}
                          value={editMaxTerm}
                          onChange={(e) => setEditMaxTerm(Number(e.target.value))}
                          className="w-full bg-stone-950 border border-emerald-400 rounded-lg px-2 py-1 text-white font-bold"
                        />
                      ) : (
                        <span className="text-white font-bold text-sm">{bank.maxTermMonths}m ({bank.maxTermMonths / 12}a)</span>
                      )}
                    </div>
                  </div>

                  <p className="font-mono text-[11px] text-stone-400 leading-relaxed italic">
                    "{bank.notes}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: LEADS CRM */}
      {adminTab === 'leads' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-stone-500" />
              <input
                type="text"
                placeholder="Buscar lead por nome ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-2xl pl-10 pr-4 py-2.5 text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-stone-400">Status:</span>
              <select
                value={selectedLeadStatus}
                onChange={(e) => setSelectedLeadStatus(e.target.value)}
                className="bg-stone-950 border border-stone-800 rounded-2xl px-3 py-2 text-white font-bold focus:border-amber-400 focus:outline-none"
              >
                <option value="todos">Todos os Status</option>
                <option value="novo">Novo</option>
                <option value="em_atendimento">Em Atendimento</option>
                <option value="proposta_enviada">Proposta Enviada</option>
                <option value="aprovado">Aprovado</option>
                <option value="arquivado">Arquivado</option>
              </select>
            </div>
          </div>

          {/* Lead Cards List */}
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <div 
                key={lead.id}
                className="p-5 bg-stone-950 border border-stone-800 hover:border-amber-500/40 rounded-2xl space-y-4 transition font-mono text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-850 pb-3">
                  <div>
                    <h4 className="font-serif font-bold text-base text-white">{lead.fullName}</h4>
                    <span className="text-stone-400 text-[11px]">{lead.email} • {lead.phone} • {lead.city}/{lead.state}</span>
                  </div>

                  {/* Status Picker */}
                  <select
                    value={lead.status}
                    onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                    className="bg-stone-900 border border-amber-500/30 text-amber-300 font-bold rounded-xl px-3 py-1.5 text-xs focus:outline-none"
                  >
                    <option value="novo">Novo Lead</option>
                    <option value="em_atendimento">Em Atendimento</option>
                    <option value="proposta_enviada">Proposta Enviada</option>
                    <option value="aprovado">Crédito Aprovado</option>
                    <option value="arquivado">Arquivado</option>
                  </select>
                </div>

                {/* Simulation Snapshot */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] bg-stone-900/60 p-3 rounded-xl border border-stone-850">
                  <div>
                    <span className="text-stone-500 block">Valor Imóvel:</span>
                    <strong className="text-white">{formatCurrency(lead.simulationSummary.propertyValue)}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Entrada:</span>
                    <strong className="text-emerald-400">{formatCurrency(lead.simulationSummary.downPayment)}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Banco de Preferência:</span>
                    <strong className="text-sky-300">{lead.simulationSummary.selectedBankName || 'Caixa Econômica'}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Parcela Estimada:</span>
                    <strong className="text-white">{formatCurrency(lead.simulationSummary.estimatedInstallment)}/mês</strong>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-stone-500">
                    Cadastrado em {new Date(lead.createdAt).toLocaleDateString('pt-BR')} às {new Date(lead.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  <a
                    href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}?text=Ol%C3%A1%20${encodeURIComponent(lead.fullName)},%20sou%20o%20consultor%20do%20Simulador%20de%20Financiamento%20Imobili%C3%A1rio.%20Recebi%20sua%20simula%C3%A7%C3%A3o%20para%20o%20im%C3%B3vel%20de%20${encodeURIComponent(formatCurrency(lead.simulationSummary.propertyValue))}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold rounded-xl border border-emerald-500/40 transition flex items-center space-x-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Iniciar Chat no WhatsApp</span>
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 4: HISTÓRICO */}
      {adminTab === 'historico' && (
        <div className="space-y-4 animate-fade-in font-mono text-xs">
          <h3 className="font-serif font-bold text-xl text-white">Log do Histórico de Simulações</h3>
          <p className="text-stone-400 text-xs">
            Todas as simulações executadas são registradas com preserve das taxas vigentes no momento do cálculo.
          </p>

          <div className="p-4 bg-stone-950 border border-stone-800 rounded-2xl space-y-2">
            <div className="flex justify-between text-stone-300 border-b border-stone-850 pb-2">
              <span className="font-bold text-white">Simulação #40921</span>
              <span className="text-emerald-400 font-bold">SAC • R$ 500.000 (Caixa Econômica)</span>
            </div>
            <p className="text-stone-400 text-[11px]">
              Entrada: R$ 100.000 | Financiado: R$ 400.000 | Prazo: 360 meses | Renda: R$ 12.000/mês
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
