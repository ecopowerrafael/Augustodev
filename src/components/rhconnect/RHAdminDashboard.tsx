import React, { useState } from 'react';
import { 
  CompanyProfile, 
  CandidateProfile, 
  JobPosition, 
  AdminMetrics 
} from '../../types/rhconnect';
import { 
  Building2, 
  Users, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  SlidersHorizontal, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Search, 
  FileText, 
  Lock, 
  Unlock, 
  BrainCircuit,
  Database
} from 'lucide-react';

interface RHAdminDashboardProps {
  metrics: AdminMetrics;
  companies: CompanyProfile[];
  candidates: CandidateProfile[];
  jobs: JobPosition[];
  onToggleCompanyStatus: (companyId: string) => void;
  onToggleCandidateStatus: (candidateId: string) => void;
  showToast: (msg: string) => void;
  activeSubTab?: 'overview' | 'companies' | 'candidates' | 'ai_config';
}

export const RHAdminDashboard: React.FC<RHAdminDashboardProps> = ({
  metrics,
  companies,
  candidates,
  jobs,
  onToggleCompanyStatus,
  onToggleCandidateStatus,
  showToast,
  activeSubTab = 'overview'
}) => {
  const [currentSubTab, setCurrentSubTab] = useState<'overview' | 'companies' | 'candidates' | 'ai_config'>(activeSubTab);
  const [companySearch, setCompanySearch] = useState('');
  const [candidateSearch, setCandidateSearch] = useState('');

  // AI Architecture Config State
  const [aiProvider, setAiProvider] = useState<'gemini' | 'openai' | 'claude' | 'local'>('gemini');
  const [aiWeightExperience, setAiWeightExperience] = useState(40);
  const [aiWeightTechSkills, setAiWeightTechSkills] = useState(40);
  const [aiWeightSoftSkills, setAiWeightSoftSkills] = useState(20);

  const filteredCompanies = companies.filter(c => 
    c.tradeName.toLowerCase().includes(companySearch.toLowerCase()) ||
    c.cnpj.includes(companySearch)
  );

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(candidateSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(candidateSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-8 text-left text-slate-900">
      
      {/* Admin Top Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Super Admin & Controle do Sistema</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">Painel Administrativo RH Connect</h1>
          <p className="text-xs text-slate-300 font-medium">Gestão global de empresas, métricas financeiras MRR, candidatos e motores de IA</p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setCurrentSubTab('overview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              currentSubTab === 'overview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Métricas KPI
          </button>
          <button
            onClick={() => setCurrentSubTab('companies')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              currentSubTab === 'companies' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Empresas
          </button>
          <button
            onClick={() => setCurrentSubTab('candidates')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              currentSubTab === 'candidates' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Candidatos
          </button>
          <button
            onClick={() => setCurrentSubTab('ai_config')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              currentSubTab === 'ai_config' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Motores IA
          </button>
        </div>
      </div>

      {/* Sub-tab 1: Overview KPIs */}
      {currentSubTab === 'overview' && (
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Receita Recorrente (MRR)</span>
              <span className="text-2xl font-black text-slate-900 font-mono block">R$ {metrics.mrr.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              <span className="text-[11px] text-emerald-700 font-bold">↑ +14% em relação ao mês anterior</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Empresas Cadastradas</span>
              <span className="text-2xl font-black text-slate-900 block">{metrics.totalCompanies}</span>
              <span className="text-[11px] text-blue-600 font-bold">{metrics.activeSubscriptions} Assinaturas Ativas</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total de Candidatos</span>
              <span className="text-2xl font-black text-slate-900 block">{metrics.totalCandidates}</span>
              <span className="text-[11px] text-slate-500 font-medium">Currículos na base</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Análises de IA Realizadas</span>
              <span className="text-2xl font-black text-slate-900 font-mono block">{metrics.aiScansCount}</span>
              <span className="text-[11px] text-purple-700 font-bold">Score de aderência calculado</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>Métricas de Conversão do Funil SaaS</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span>Conversão Degustação (7 dias) → Pago:</span>
                  <span className="font-extrabold text-emerald-700 font-mono text-sm">{metrics.trialConversionRate}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                  <span>Total de Contratações Realizadas:</span>
                  <span className="font-extrabold text-blue-600 font-mono text-sm">{metrics.totalHires} Vagas Fechadas</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
              <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                <Database className="w-4 h-4 text-blue-600" />
                <span>Logs de Auditoria & Segurança LGPD</span>
              </h3>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                  <span className="text-emerald-600 font-bold">[OK]</span> Backup de banco de dados realizado às 03:00.
                </div>
                <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                  <span className="text-blue-600 font-bold">[INFO]</span> 45 novas varreduras de currículos via Gemini API.
                </div>
                <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                  <span className="text-amber-600 font-bold">[WARN]</span> Empresa Alpha Engenharia com 3 dias restantes de teste.
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Sub-tab 2: Companies Management */}
      {currentSubTab === 'companies' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black text-slate-900">Gestão de Empresas & Assinaturas</h3>
            
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                value={companySearch}
                onChange={(e) => setCompanySearch(e.target.value)}
                placeholder="Buscar empresa ou CNPJ..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                  <th className="py-3 px-4">Empresa</th>
                  <th className="py-3 px-4">CNPJ</th>
                  <th className="py-3 px-4">Plano</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCompanies.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">{c.tradeName}</td>
                    <td className="py-3 px-4 text-slate-500 font-mono">{c.cnpj}</td>
                    <td className="py-3 px-4 font-bold text-blue-600 uppercase text-[11px]">{c.plan.replace('_', ' ')}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === 'active' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                        {c.status === 'active' ? '● Ativa' : 'Bloqueada'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          onToggleCompanyStatus(c.id);
                          showToast(`Status da empresa ${c.tradeName} atualizado.`);
                        }}
                        className="px-3 py-1 rounded-lg border border-slate-200 font-bold hover:bg-slate-100 transition"
                      >
                        {c.status === 'active' ? 'Suspender/Bloquear' : 'Desbloquear'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-tab 3: Candidates Management */}
      {currentSubTab === 'candidates' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black text-slate-900">Gestão de Candidatos & Denúncias</h3>
            
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                value={candidateSearch}
                onChange={(e) => setCandidateSearch(e.target.value)}
                placeholder="Buscar candidato ou e-mail..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                  <th className="py-3 px-4">Candidato</th>
                  <th className="py-3 px-4">E-mail</th>
                  <th className="py-3 px-4">Local</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCandidates.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-bold text-slate-900">{c.name}</td>
                    <td className="py-3 px-4 text-slate-500 font-mono">{c.email}</td>
                    <td className="py-3 px-4 text-slate-600">{c.city}, {c.state}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === 'active' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                      }`}>
                        {c.status === 'active' ? 'Ativo' : 'Bloqueado'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          onToggleCandidateStatus(c.id);
                          showToast(`Status de ${c.name} alterado.`);
                        }}
                        className="px-3 py-1 rounded-lg border border-slate-200 font-bold hover:bg-slate-100 transition"
                      >
                        {c.status === 'active' ? 'Bloquear' : 'Desbloquear'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-tab 4: AI Architecture Config (Section 29 Prompt requirement) */}
      {currentSubTab === 'ai_config' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
              <BrainCircuit className="w-5 h-5 text-purple-600" />
              <span>Arquitetura de Inteligência Artificial & Provedores LLM</span>
            </h3>
            <p className="text-xs text-slate-500">
              Arquitetura agnóstica para troca flexível de modelos de IA sem dependência de tecnologia única (OpenAI, Gemini, Claude, Modelos Locais)
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { id: 'gemini', name: 'Google Gemini 1.5 Pro', desc: 'Modelo Padrão Recomendado (Alta velocidade e parsing de PDFs)' },
              { id: 'openai', name: 'OpenAI GPT-4o', desc: 'Provedor Alternativo para Resumos Complexos' },
              { id: 'claude', name: 'Anthropic Claude 3.5 Sonnet', desc: 'Processamento Natural Avançado de Currículos' },
              { id: 'local', name: 'Modelo Local / Llama 3', desc: 'Privacidade Total On-Premise' }
            ].map(prov => (
              <button
                key={prov.id}
                type="button"
                onClick={() => {
                  setAiProvider(prov.id as any);
                  showToast(`Provedor de IA alterado para ${prov.name}.`);
                }}
                className={`p-4 rounded-2xl border-2 text-left space-y-2 transition cursor-pointer ${
                  aiProvider === prov.id ? 'bg-purple-50 border-purple-600' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-xs text-slate-900">{prov.name}</span>
                  {aiProvider === prov.id && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">{prov.desc}</p>
              </button>
            ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Pesos do Algoritmo de Score IA (%)</h4>
            
            <div className="space-y-3 max-w-xl text-xs">
              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Peso de Experiência Anterior:</span>
                  <span className="font-mono text-purple-600">{aiWeightExperience}%</span>
                </div>
                <input 
                  type="range" min={0} max={100} value={aiWeightExperience} 
                  onChange={(e) => setAiWeightExperience(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Peso de Hard Skills / Tecnologias:</span>
                  <span className="font-mono text-purple-600">{aiWeightTechSkills}%</span>
                </div>
                <input 
                  type="range" min={0} max={100} value={aiWeightTechSkills} 
                  onChange={(e) => setAiWeightTechSkills(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-700 mb-1">
                  <span>Peso de Soft Skills & Localização:</span>
                  <span className="font-mono text-purple-600">{aiWeightSoftSkills}%</span>
                </div>
                <input 
                  type="range" min={0} max={100} value={aiWeightSoftSkills} 
                  onChange={(e) => setAiWeightSoftSkills(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
