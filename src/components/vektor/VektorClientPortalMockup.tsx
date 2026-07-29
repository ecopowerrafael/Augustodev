import React, { useState } from 'react';
import { 
  VektorClientDocument, 
  VektorTicket, 
  VektorTab 
} from '../../types/vektor';
import { 
  Lock, 
  BarChart3, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Clock, 
  Plus, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles,
  AlertCircle,
  TrendingUp,
  CreditCard,
  UserCheck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface VektorClientPortalMockupProps {
  documents: VektorClientDocument[];
  tickets: VektorTicket[];
  setActiveTab: (tab: VektorTab) => void;
}

export const VektorClientPortalMockup: React.FC<VektorClientPortalMockupProps> = ({ 
  documents, 
  tickets,
  setActiveTab
}) => {
  const [activePortalTab, setActivePortalTab] = useState<'dashboard' | 'guias' | 'documentos' | 'chamados'>('dashboard');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Simulated DRE financial chart data
  const chartData = [
    { month: 'Jan', Faturamento: 62000, Impostos: 3720, LucroLiquido: 48200 },
    { month: 'Fev', Faturamento: 68000, Impostos: 4080, LucroLiquido: 53100 },
    { month: 'Mar', Faturamento: 74000, Impostos: 4440, LucroLiquido: 57900 },
    { month: 'Abr', Faturamento: 71000, Impostos: 4260, LucroLiquido: 55200 },
    { month: 'Mai', Faturamento: 85000, Impostos: 5100, LucroLiquido: 66300 },
    { month: 'Jun', Faturamento: 89000, Impostos: 5340, LucroLiquido: 69400 }
  ];

  const handleCopyCode = (code: string) => {
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="bg-[#121312] border border-stone-800 rounded-3xl p-6 sm:p-10 space-y-8 text-stone-100 shadow-2xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-2xl font-bold text-white">Vektor Hub</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[9px] font-mono uppercase font-bold">
                Ambiente Criptografado ISO 27001
              </span>
            </div>
            <span className="text-xs font-mono text-stone-400 block">
              Empresa: NexTech Systems LTDA • CNPJ: 42.109.882/0001-09 • Regime: Simples Nacional (Anexo III)
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <div className="px-3 py-1.5 bg-emerald-950 border border-emerald-500/30 text-emerald-300 rounded-xl flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>CND Federal: Válida até 10/11/2026</span>
          </div>
        </div>
      </div>

      {/* Portal Inner Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-800 pb-3 font-mono text-xs">
        {[
          { id: 'dashboard', label: 'Dashboard Gerencial' },
          { id: 'guias', label: 'Impostos & Guias DAS' },
          { id: 'documentos', label: 'Balancetes & DRE' },
          { id: 'chamados', label: 'Atendimento com Contador' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActivePortalTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl border transition ${
              activePortalTab === tab.id
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50 font-bold'
                : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Portal Tab 1: Dashboard */}
      {activePortalTab === 'dashboard' && (
        <div className="space-y-6 animate-fade-in">
          {/* Key Metrics row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-5 bg-stone-900 border border-stone-800 rounded-2xl space-y-1">
              <span className="text-[10px] text-stone-400 uppercase block">FATURAMENTO ACUMULADO (Q2 2026)</span>
              <span className="text-2xl font-serif text-white font-bold">R$ 245.000,00</span>
              <span className="text-[10px] text-emerald-400 block">▲ +12.4% em relação ao trimestre anterior</span>
            </div>

            <div className="p-5 bg-stone-900 border border-stone-800 rounded-2xl space-y-1">
              <span className="text-[10px] text-stone-400 uppercase block">ALÍQUOTA EFETIVA ATUAL (FATOR R)</span>
              <span className="text-2xl font-serif text-emerald-400 font-bold">6,00%</span>
              <span className="text-[10px] text-stone-400 block font-sans">Economia mantida pelo Anexo III do Simples</span>
            </div>

            <div className="p-5 bg-stone-900 border border-stone-800 rounded-2xl space-y-1">
              <span className="text-[10px] text-stone-400 uppercase block">DISTRIBUIÇÃO DE LUCROS ISENTA</span>
              <span className="text-2xl font-serif text-emerald-300 font-bold">R$ 69.400,00</span>
              <span className="text-[10px] text-emerald-400 block">✓ Isenção total de IRPF liberada</span>
            </div>
          </div>

          {/* DRE Graph */}
          <div className="p-6 bg-stone-900/60 border border-stone-800 rounded-3xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-serif text-lg text-white font-light">Evolução do Faturamento & Carga Tributária Otimizada</h4>
                <p className="text-xs text-stone-400 font-serif">Acompanhamento mês a mês apurado pela Vektor Contabilidade</p>
              </div>
              <span className="text-xs font-mono text-emerald-400">Ano Base: 2026</span>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorFaturamento" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis dataKey="month" stroke="#737373" fontSize={11} />
                  <YAxis stroke="#737373" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#181918', borderColor: '#404040', borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="Faturamento" stroke="#10b981" fillOpacity={1} fill="url(#colorFaturamento)" name="Faturamento (R$)" />
                  <Area type="monotone" dataKey="LucroLiquido" stroke="#34d399" fillOpacity={1} fill="url(#colorLucro)" name="Lucro Líquido (R$)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Portal Tab 2: Guias e Impostos */}
      {activePortalTab === 'guias' && (
        <div className="space-y-4 animate-fade-in font-sans text-xs">
          <div className="flex justify-between items-center">
            <h4 className="font-serif text-lg text-white">Guias de Impostos do Mês Atual</h4>
            <span className="font-mono text-xs text-stone-400">Total de Impostos do Mês: R$ 5.360,70</span>
          </div>

          <div className="space-y-3">
            {documents.map(doc => (
              <div 
                key={doc.id}
                className="p-4 bg-stone-900 border border-stone-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[10px] px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-bold">
                      {doc.type}
                    </span>
                    <span className="font-bold text-white font-mono text-sm">{doc.title}</span>
                  </div>
                  <span className="text-stone-400 text-xs block font-mono">
                    Vencimento: <strong className="text-stone-200">{doc.dueDate}</strong>
                  </span>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
                  {doc.amount && (
                    <span className="font-mono text-sm font-bold text-emerald-400">
                      R$ {doc.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  )}

                  {doc.status === 'pago' ? (
                    <span className="px-3 py-1.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-xs rounded-xl font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Pago
                    </span>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleCopyCode(doc.code)}
                        className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-mono text-xs rounded-xl flex items-center gap-1 transition"
                      >
                        {copiedCode === doc.code ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode === doc.code ? 'Copiado!' : 'PIX / Código'}</span>
                      </button>

                      <button
                        className="px-3 py-1.5 bg-emerald-400 text-stone-950 font-mono text-xs font-bold rounded-xl hover:bg-emerald-300 transition flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Portal Tab 3: Documentos & Balancetes */}
      {activePortalTab === 'documentos' && (
        <div className="space-y-4 animate-fade-in font-sans text-xs">
          <h4 className="font-serif text-lg text-white">Demonstrações Contábeis & Livros Registrados</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'DRE Gerencial Consolidado (Q2 2026)', date: '30/06/2026', size: '1.2 MB' },
              { name: 'Balanço Patrimonial Auditado 2025', date: '31/12/2025', size: '2.4 MB' },
              { name: 'Contrato Social Registrado (Última Alteração)', date: '15/01/2026', size: '890 KB' },
              { name: 'Cartão CNPJ & Ficha de Inscrição Municipal', date: '01/01/2026', size: '450 KB' }
            ].map((file, idx) => (
              <div key={idx} className="p-4 bg-stone-900 border border-stone-800 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-white block">{file.name}</span>
                  <span className="text-[10px] font-mono text-stone-500">Data: {file.date} • {file.size}</span>
                </div>
                <button className="px-3 py-1.5 bg-stone-800 hover:bg-emerald-400 hover:text-stone-950 text-stone-300 font-mono text-xs rounded-xl transition flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Portal Tab 4: Chamados & Atendimento */}
      {activePortalTab === 'chamados' && (
        <div className="space-y-6 animate-fade-in font-sans text-xs">
          <div className="flex justify-between items-center">
            <h4 className="font-serif text-lg text-white">Seus Chamados com a Equipe Vektor</h4>
            <button className="px-3.5 py-2 bg-emerald-400 text-stone-950 font-mono text-xs uppercase font-bold rounded-xl hover:bg-emerald-300 transition flex items-center gap-1">
              <Plus className="w-4 h-4" />
              <span>Novo Chamado</span>
            </button>
          </div>

          <div className="space-y-3 font-mono">
            {tickets.map(ticket => (
              <div key={ticket.id} className="p-4 bg-stone-900 border border-stone-800 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-400 font-bold">{ticket.id}</span>
                    <span className="px-2 py-0.5 bg-stone-800 text-stone-300 rounded text-[10px] font-bold">
                      {ticket.department}
                    </span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    ticket.status === 'Concluído' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                  }`}>
                    {ticket.status}
                  </span>
                </div>

                <p className="font-bold text-white text-sm font-sans">{ticket.subject}</p>
                <div className="flex justify-between text-[11px] text-stone-400 pt-1 border-t border-stone-800/80">
                  <span>Atribuído a: <strong className="text-stone-200">{ticket.assignedTo}</strong></span>
                  <span>Aberto em: {ticket.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
