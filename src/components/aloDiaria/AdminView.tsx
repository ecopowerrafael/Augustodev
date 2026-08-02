import React, { useState } from 'react';
import { 
  AdminTab, 
  AdminMetrics, 
  PlatformSettings, 
  ClientProfile, 
  DiaristaProfile, 
  ServiceBooking, 
  SupportTicket 
} from '../../types/aloDiaria';
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  Clock, 
  DollarSign, 
  Percent, 
  Star, 
  HelpCircle, 
  Settings, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Sliders, 
  AlertCircle,
  FileText,
  Plus
} from 'lucide-react';

interface AdminViewProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  metrics: AdminMetrics;
  settings: PlatformSettings;
  onUpdateCommission: (pct: number) => void;
  clientsList: ClientProfile[];
  diaristasList: DiaristaProfile[];
  bookingsList: ServiceBooking[];
  ticketsList: SupportTicket[];
  onApproveDiarista: (id: string) => void;
  showToast: (msg: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  activeTab,
  setActiveTab,
  metrics,
  settings,
  onUpdateCommission,
  clientsList,
  diaristasList,
  bookingsList,
  ticketsList,
  onApproveDiarista,
  showToast
}) => {
  const [commissionPct, setCommissionPct] = useState<number>(settings.platformCommissionPct);

  return (
    <div className="space-y-8 font-sans pb-16">
      
      {/* ------------------------------------------------------------- */}
      {/* TAB 1: VISÃO GERAL DE KPIS                                     */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Painel de Controle Administrativo</h1>
              <p className="text-xs text-slate-500">Indicadores de desempenho geral da plataforma Alô Diária - Dona Maria</p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-full">
                Sistemas Operando 100%
              </span>
            </div>
          </div>

          {/* 6 Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold uppercase">Clientes Cadastrados</span>
                <Users className="w-5 h-5 text-teal-600" />
              </div>
              <p className="text-3xl font-black text-slate-900">{metrics.totalClients.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-emerald-700 font-semibold">+14% no último mês</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold uppercase">Diaristas Ativas</span>
                <Briefcase className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-3xl font-black text-slate-900">{metrics.activeDiaristas}</p>
              <p className="text-xs text-amber-700 font-semibold">{metrics.pendingApprovals} pendentes de aprovação</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold uppercase">Serviços Realizados</span>
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-black text-slate-900">{metrics.completedServices.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-blue-700 font-semibold">Média de 110 diárias/dia</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold uppercase">GMV Total Transacionado</span>
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-3xl font-black text-slate-900">R$ {metrics.totalRevenue.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-slate-500">Valor bruto movimentado no app</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold uppercase">Comissão da Plataforma</span>
                <Percent className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-black text-purple-900">R$ {metrics.platformCommissionTotal.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-purple-700 font-semibold">Taxa fixada em {settings.platformCommissionPct}%</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold uppercase">Crescimento Mensal</span>
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-3xl font-black text-slate-900">+{metrics.monthlyGrowthPct}%</p>
              <p className="text-xs text-emerald-700 font-semibold">Ritmo de expansão forte</p>
            </div>

          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: GESTÃO DE CLIENTES                                     */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'clientes' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Base de Clientes Cadastrados</h2>
              <p className="text-xs text-slate-500">Gerencie perfis, históricos de contratações e suporte ao usuário</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                    <th className="py-3 px-2">Cliente</th>
                    <th className="py-3 px-2">Cidade/Bairro</th>
                    <th className="py-3 px-2">Data Cadastro</th>
                    <th className="py-3 px-2">Diárias Solicitadas</th>
                    <th className="py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {clientsList.map((cli) => (
                    <tr key={cli.id} className="hover:bg-slate-50">
                      <td className="py-3 px-2 font-bold text-slate-900 flex items-center space-x-2">
                        <img src={cli.photoUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <div>{cli.name}</div>
                          <span className="text-[10px] text-slate-400 font-normal">{cli.email}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-slate-600">{cli.city} - {cli.neighborhood}</td>
                      <td className="py-3 px-2 text-slate-500">{cli.registeredAt}</td>
                      <td className="py-3 px-2 font-black text-slate-900">{cli.totalBookings} diárias</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-bold text-[10px]">
                          Ativo
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: GESTÃO DE DIARISTAS & APROVAÇÃO                         */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'diaristas' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Gestão & Auditoria de Diaristas</h2>
              <p className="text-xs text-slate-500">Verifique antecedentes criminais e aprove novos cadastros na rede</p>
            </div>

            <div className="space-y-4">
              {diaristasList.map((d) => (
                <div key={d.id} className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center space-x-4">
                    <img src={d.photoUrl} alt="" className="w-14 h-14 rounded-2xl object-cover border border-slate-200" />
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 flex items-center space-x-1.5">
                        <span>{d.name}</span>
                        {d.documentsStatus === 'aprovado' && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                      </h4>
                      <p className="text-xs text-slate-500">CPF: {d.cpf} • {d.region}</p>
                      <div className="flex items-center space-x-2 text-xs mt-1">
                        <span className="font-bold text-amber-500">⭐️ {d.rating}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-600">{d.completedJobsCount} trabalhos</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      d.documentsStatus === 'aprovado'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {d.documentsStatus === 'aprovado' ? 'Aprovada com Selo' : 'Documentação em Análise'}
                    </span>

                    {d.documentsStatus !== 'aprovado' && (
                      <button
                        onClick={() => onApproveDiarista(d.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-xs"
                      >
                        Aprovar Cadastro
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: COMISSÕES E CONFIGURAÇÃO                                */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'comissoes' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Ajuste de Comissões da Plataforma</h2>
              <p className="text-xs text-slate-500">Configure a porcentagem de retenção da plataforma sobre o valor da diária</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 max-w-xl space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-sm text-slate-900">Taxa de Comissão Atual:</span>
                <span className="text-2xl font-black text-purple-900">{commissionPct}%</span>
              </div>

              <input
                type="range"
                min={5}
                max={30}
                value={commissionPct}
                onChange={(e) => setCommissionPct(Number(e.target.value))}
                className="w-full accent-purple-600"
              />

              <div className="flex justify-between text-xs text-slate-400 font-bold">
                <span>5% (Mínimo)</span>
                <span>12% (Sugerido)</span>
                <span>30% (Máximo)</span>
              </div>

              <button
                onClick={() => {
                  onUpdateCommission(commissionPct);
                  showToast(`Comissão atualizada para ${commissionPct}% com sucesso!`);
                }}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer"
              >
                Salvar Nova Taxa de Comissão
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: SUPORTE E RELATÓRIOS                                   */}
      {/* ------------------------------------------------------------- */}
      {(activeTab === 'atendimento' || activeTab === 'relatorios' || activeTab === 'configuracoes' || activeTab === 'servicos' || activeTab === 'financeiro' || activeTab === 'avaliacoes') && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Módulo Administrativo Ativo</h2>
              <p className="text-xs text-slate-500">Todos os relatórios e parâmetros estão integrados com a base de dados mockada da plataforma.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
