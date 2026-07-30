import React, { FC, useState } from 'react';
import { 
  Heart, 
  GraduationCap, 
  Activity, 
  BarChart3, 
  Clock, 
  Printer, 
  Download, 
  FileText, 
  Users, 
  Plus, 
  CheckCircle2, 
  Brain, 
  Smile, 
  Calendar,
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  AreaChart,
  Area 
} from 'recharts';
import { StudentProfile, UserRole, PerformanceObservation, LeadOrUser } from '../../types/neuroaprende';
import { DEMO_OBSERVATIONS, MOCK_LEADS } from '../../data/neuroaprendeData';

interface NeuroAdultDashboardProps {
  student: StudentProfile;
  setStudent: React.Dispatch<React.SetStateAction<StudentProfile>>;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
}

export const NeuroAdultDashboard: FC<NeuroAdultDashboardProps> = ({
  student,
  setStudent,
  activeRole,
  setActiveRole
}) => {
  const [activeTab, setActiveTab] = useState<'visão_geral' | 'habilidades' | 'diario_observacao' | 'leads_escolas'>('visão_geral');
  const [newObsText, setNewObsText] = useState<string>('');
  const [observations, setObservations] = useState<PerformanceObservation[]>(DEMO_OBSERVATIONS);

  // Recharts radar data for Cognitive Skills
  const cognitiveData = [
    { skill: 'Atenção', score: student.cognitiveProgress.attention, fullMark: 100 },
    { skill: 'Memória', score: student.cognitiveProgress.memory, fullMark: 100 },
    { skill: 'Linguagem', score: student.cognitiveProgress.language, fullMark: 100 },
    { skill: 'Percepção Visual', score: student.cognitiveProgress.visual_perception, fullMark: 100 },
    { skill: 'Raciocínio', score: student.cognitiveProgress.reasoning, fullMark: 100 },
    { skill: 'Autorregulação', score: student.cognitiveProgress.emotional_regulation, fullMark: 100 },
    { skill: 'Rotina & PECS', score: student.cognitiveProgress.daily_routine, fullMark: 100 },
  ];

  // Daily Usage Time Chart Data (Minutes per day over the week)
  const usageData = [
    { day: 'Seg', minutos: 15 },
    { day: 'Ter', minutos: 20 },
    { day: 'Qua', minutos: 18 },
    { day: 'Qui', minutos: 25 },
    { day: 'Sex', minutos: 18 },
    { day: 'Sáb', minutos: 12 },
    { day: 'Dom', minutos: 10 },
  ];

  const handleAddObservation = () => {
    if (!newObsText.trim()) return;
    const newObs: PerformanceObservation = {
      id: `obs_${Date.now()}`,
      studentId: student.id,
      date: new Date().toISOString().split('T')[0],
      authorName: activeRole === 'therapist' ? 'Dra. Camila Rocha (Terapeuta)' : 'Responsável',
      authorRole: activeRole === 'therapist' ? 'Terapeuta' : 'Pais',
      skillObserved: 'attention',
      impulsivityIndicator: 'baixa',
      responseSpeedMs: 1200,
      persistenceScore: 90,
      notes: newObsText,
      recommendedNextStep: 'Manter a sequência de atividades com reforço positivo visual.',
    };
    setObservations([newObs, ...observations]);
    setNewObsText('');
  };

  return (
    <div className="space-y-8 animate-fade-in text-xs font-sans">
      
      {/* Header Banner */}
      <div className="bg-white border border-sky-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 shadow-xs">
                <Heart className="w-3.5 h-3.5 text-amber-600" />
                <span>Painel Multidisciplinar de Acompanhamento</span>
              </span>
              <span className="text-slate-400 font-bold text-xs">•</span>
              <span className="text-xs font-semibold text-slate-600">
                Aluno: {student.nickname} ({student.age} anos)
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900">
              Acompanhamento de <span className="italic text-amber-600 font-extrabold">Evolução Cognitiva</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs uppercase font-extrabold rounded-xl border border-slate-300 transition flex items-center space-x-2 shadow-xs"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Gerar Relatório PDF / Imprimir</span>
            </button>
          </div>
        </div>

        {/* Sub-role Switcher */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4">
          <span className="text-slate-700 font-bold mr-2">Visão Atual:</span>
          {[
            { role: 'parent', label: 'Pais / Responsáveis', icon: Heart },
            { role: 'educator', label: 'Escolas / Educadores', icon: GraduationCap },
            { role: 'therapist', label: 'Terapeutas / Psicopedagogos', icon: Activity }
          ].map((r) => {
            const Icon = r.icon;
            const isActive = activeRole === r.role;
            return (
              <button
                key={r.role}
                onClick={() => setActiveRole(r.role as any)}
                className={`px-4 py-2 rounded-xl font-bold transition border flex items-center space-x-1.5 shadow-xs ${
                  isActive
                    ? 'bg-amber-500 text-white border-amber-600 shadow-amber-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pt-1 font-bold">
          {[
            { id: 'visão_geral', label: 'Visão Geral & Tempo de Uso' },
            { id: 'habilidades', label: 'Evolução Cognitiva por Habilidade' },
            { id: 'diario_observacao', label: `Diário de Observações (${observations.length})` },
            { id: 'leads_escolas', label: 'Gestão de Licenças & Instituições' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl font-extrabold transition border shadow-xs ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-200'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* TAB 1: VISÃO GERAL & TEMPO DE USO */}
      {activeTab === 'visão_geral' && (
        <div className="space-y-6">
          
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white border-2 border-amber-100 rounded-2xl space-y-2 shadow-xs">
              <span className="text-slate-500 font-bold uppercase text-[10px] block">Estrelas Acumuladas</span>
              <span className="text-amber-600 font-extrabold text-2xl">⭐ {student.stars}</span>
              <span className="text-emerald-700 font-bold text-[10px] block">+20 estrelas esta semana</span>
            </div>

            <div className="p-5 bg-white border-2 border-sky-100 rounded-2xl space-y-2 shadow-xs">
              <span className="text-slate-500 font-bold uppercase text-[10px] block">Tempo Médio Diário</span>
              <span className="text-slate-900 font-extrabold text-2xl">{student.dailyUsageMinutes} minutos</span>
              <span className="text-slate-500 font-semibold text-[10px] block">Dentro do recomendado (max 25m)</span>
            </div>

            <div className="p-5 bg-white border-2 border-emerald-100 rounded-2xl space-y-2 shadow-xs">
              <span className="text-slate-500 font-bold uppercase text-[10px] block">Dias Seguidos de Prática</span>
              <span className="text-sky-600 font-extrabold text-2xl">🔥 {student.recentStreakDays} Dias</span>
              <span className="text-slate-500 font-semibold text-[10px] block">Regularidade saudável</span>
            </div>

            <div className="p-5 bg-white border-2 border-purple-100 rounded-2xl space-y-2 shadow-xs">
              <span className="text-slate-500 font-bold uppercase text-[10px] block">Habilidade em Destaque</span>
              <span className="text-emerald-700 font-extrabold text-xl">Percepção Visual (90%)</span>
              <span className="text-slate-500 font-semibold text-[10px] block">Mundo das Formas</span>
            </div>
          </div>

          {/* Usage Time Chart */}
          <div className="bg-white border border-sky-200 rounded-3xl p-6 space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <h3 className="font-serif font-bold text-lg text-slate-900">Tempo de Permanência Diário (Minutos)</h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">Controle para evitar fadiga sensorial</span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', fontSize: '12px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="minutos" stroke="#d97706" fill="#fef3c7" fillOpacity={0.8} strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: EVOLUÇÃO COGNITIVA POR HABILIDADE */}
      {activeTab === 'habilidades' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Radar Chart */}
          <div className="bg-white border border-sky-200 rounded-3xl p-6 space-y-4 shadow-md">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900">Mapeamento de Habilidades Cognitivas</h3>
              <p className="text-[11px] font-medium text-slate-500">Pontuação de 0 a 100 calculada com base no desempenho adaptativo</p>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={cognitiveData}>
                  <PolarGrid stroke="#cbd5e1" />
                  <PolarAngleAxis dataKey="skill" stroke="#475569" tick={{ fontSize: 11, fontWeight: 'bold' }} />
                  <Radar name="Pontuação" dataKey="score" stroke="#059669" fill="#10b981" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart Breakdown */}
          <div className="bg-white border border-sky-200 rounded-3xl p-6 space-y-4 shadow-md">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900">Detalhamento Comparativo</h3>
              <p className="text-[11px] font-medium text-slate-500">Análise técnica para suporte a planos de ensino individualizados (PEI)</p>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cognitiveData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="skill" stroke="#475569" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                  <YAxis stroke="#475569" tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px', color: '#0f172a' }} />
                  <Bar dataKey="score" fill="#0284c7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: DIÁRIO DE OBSERVAÇÕES */}
      {activeTab === 'diario_observacao' && (
        <div className="space-y-6">
          
          {/* Add Observation Form */}
          <div className="p-5 bg-white border border-amber-200 rounded-2xl space-y-3 shadow-xs">
            <h4 className="font-serif font-bold text-base text-slate-900">Registrar Nova Observação Pedagógica ou Terapêutica</h4>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Escreva detalhes observados na sessão (ex: boa retenção no jogo de letras, respondeu bem ao estímulo)..."
                value={newObsText}
                onChange={(e) => setNewObsText(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium focus:border-amber-500 focus:outline-none"
              />
              <button
                onClick={handleAddObservation}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-xl transition shrink-0 shadow-xs"
              >
                Salvar Nota
              </button>
            </div>
          </div>

          {/* Observations List */}
          <div className="space-y-4">
            {observations.map((obs) => (
              <div key={obs.id} className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-xs">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <div className="flex items-center space-x-2">
                    <strong className="text-slate-900 font-bold text-sm">{obs.authorName}</strong>
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[10px] uppercase font-extrabold">
                      {obs.authorRole}
                    </span>
                  </div>
                  <span className="text-slate-500 text-[10px] font-semibold">{obs.date}</span>
                </div>

                <p className="text-slate-700 leading-relaxed font-sans text-xs font-medium">"{obs.notes}"</p>
                
                <div className="p-2.5 bg-emerald-50 rounded-xl text-[11px] text-emerald-900 font-semibold border border-emerald-200">
                  <strong className="text-emerald-800 font-bold">Recomendação:</strong> {obs.recommendedNextStep}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 4: GESTÃO DE LICENÇAS E INSTITUIÇÕES */}
      {activeTab === 'leads_escolas' && (
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-xl text-slate-900">Solicitações de Licença para Escolas e Clínicas</h3>
          
          <div className="space-y-3">
            {MOCK_LEADS.map((lead) => (
              <div key={lead.id} className="p-5 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                <div>
                  <h4 className="font-serif font-bold text-base text-slate-900">{lead.fullName}</h4>
                  <p className="text-slate-600 text-xs font-medium">
                    {lead.institutionName || 'Família'} • {lead.phone} • {lead.city}/{lead.state}
                  </p>
                </div>

                <a
                  href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}?text=Ol%C3%A1!%20Recebi%20seu%20contato%20sobre%20a%20plataforma%20NeuroAprende.`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl transition flex items-center space-x-1.5 shrink-0 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Atendimento WhatsApp</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
