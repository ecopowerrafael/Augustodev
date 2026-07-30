import React, { useState, useMemo } from 'react';
import { Application, ApplicationStage, JobPosition } from '../../types/rhconnect';
import { 
  Sparkles, 
  Search, 
  Filter, 
  UserCheck, 
  FileText, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  X, 
  Check, 
  Clock, 
  ChevronRight, 
  ExternalLink,
  Award,
  AlertTriangle
} from 'lucide-react';

interface RHCompanyCandidatesListProps {
  applications: Application[];
  jobs: JobPosition[];
  selectedJobId?: string;
  onUpdateStage: (appId: string, newStage: ApplicationStage) => void;
  onOpenChatWithCandidate: (candidateId: string, candidateName: string) => void;
  showToast: (msg: string) => void;
}

export const RHCompanyCandidatesList: React.FC<RHCompanyCandidatesListProps> = ({
  applications,
  jobs,
  selectedJobId,
  onUpdateStage,
  onOpenChatWithCandidate,
  showToast
}) => {
  const [filterJobId, setFilterJobId] = useState<string>(selectedJobId || 'todos');
  const [filterStage, setFilterStage] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedAppDetail, setSelectedAppDetail] = useState<Application | null>(null);

  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesJob = filterJobId === 'todos' || app.jobId === filterJobId;
      const matchesStage = filterStage === 'todos' || app.stage === filterStage;
      const matchesSearch = 
        app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.candidateHeadline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.aiMatchingSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesJob && matchesStage && matchesSearch;
    }).sort((a, b) => b.aiScore - a.aiScore); // Default AI Score Ranking (Highest first)
  }, [applications, filterJobId, filterStage, searchTerm]);

  const stagesList: { id: ApplicationStage; label: string }[] = [
    { id: 'recebido', label: 'Recebido' },
    { id: 'triagem_ia', label: 'Triagem IA' },
    { id: 'em_analise', label: 'Em Análise' },
    { id: 'entrevista', label: 'Entrevista' },
    { id: 'teste_tecnico', label: 'Teste Técnico' },
    { id: 'aprovado', label: 'Aprovado' },
    { id: 'reprovado', label: 'Reprovado' },
    { id: 'contratado', label: 'Contratado' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-8 text-left text-slate-900">
      
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-50 text-blue-800 text-xs font-mono font-bold rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Ranking Automático de Candidatos por IA</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Triagem Inteligente & Gestão de Talentos
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              A IA calcula a aderência de cada candidato às exigências da vaga em segundos.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-bold rounded-2xl">
              {filteredApplications.length} Candidatos Ordenados por Score
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Filtrar por Vaga</label>
            <select 
              value={filterJobId}
              onChange={(e) => setFilterJobId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
            >
              <option value="todos">Todas as Vagas Ativas</option>
              {jobs.map(j => (
                <option key={j.id} value={j.id}>{j.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Filtrar por Etapa Seletiva</label>
            <select 
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
            >
              <option value="todos">Todas as Etapas</option>
              {stagesList.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Buscar Candidato / Skill</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ex: Mariana, React, SQL..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Candidates List / Cards */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
            <UserCheck className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-black text-slate-800">Nenhum candidato localizado com esses filtros</h3>
            <p className="text-xs text-slate-500">Tente selecionar "Todas as Vagas Ativas" ou alterar a etapa seletiva.</p>
          </div>
        ) : (
          filteredApplications.map((app, index) => (
            <div 
              key={app.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition space-y-4"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                
                {/* Candidate Info */}
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <img 
                      src={app.candidatePhoto} 
                      alt={app.candidateName} 
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-2xs"
                    />
                    <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 text-white font-mono font-black text-[10px] flex items-center justify-center border-2 border-white">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-extrabold text-slate-900">{app.candidateName}</h3>
                      <span className="text-xs text-slate-500">({app.candidateLocation})</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{app.candidateHeadline}</p>
                    <p className="text-[11px] text-blue-600 font-bold">Vaga: {app.jobTitle}</p>
                  </div>
                </div>

                {/* Score IA Badge & Stage Control */}
                <div className="flex flex-wrap items-center gap-3">
                  
                  {/* Score IA Badge */}
                  <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 font-mono text-sm font-black flex items-center space-x-1.5 shadow-2xs">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>{app.aiScore}% Match</span>
                  </div>

                  {/* Stage Dropdown Select */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">Mudar Etapa</label>
                    <select
                      value={app.stage}
                      onChange={(e) => {
                        const newStage = e.target.value as ApplicationStage;
                        onUpdateStage(app.id, newStage);
                        showToast(`Status de ${app.candidateName} alterado para "${newStage.replace('_', ' ')}".`);
                      }}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-800 outline-none"
                    >
                      {stagesList.map(s => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Quick Actions */}
                  <button
                    onClick={() => onOpenChatWithCandidate(app.candidateId, app.candidateName)}
                    className="p-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition"
                    title="Conversar no Chat"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSelectedAppDetail(app)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition"
                  >
                    Ver Detalhes & CV
                  </button>

                </div>

              </div>

              {/* AI Competencies & Summary Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Resumo Executivo da IA:</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Inscrito em {app.appliedDate}</span>
                </div>

                <p className="text-slate-600 font-medium leading-relaxed">
                  {app.aiSummary}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-500 mr-1">Skills Encontradas:</span>
                  {app.aiMatchingSkills.map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-md text-[10px]">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Candidate Detail Drawer / Modal */}
      {selectedAppDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden font-sans space-y-6 p-6 text-left max-h-[85vh] overflow-y-auto">
            
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={selectedAppDetail.candidatePhoto} 
                  alt={selectedAppDetail.candidateName} 
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h2 className="text-xl font-black text-slate-900">{selectedAppDetail.candidateName}</h2>
                  <p className="text-xs font-bold text-blue-600">{selectedAppDetail.candidateHeadline}</p>
                  <p className="text-xs text-slate-500">{selectedAppDetail.candidateLocation}</p>
                </div>
              </div>

              <button onClick={() => setSelectedAppDetail(null)} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Analysis Deep-Dive */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between items-center font-black text-emerald-900">
                <span className="flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Análise Detalhada de Aderência da Inteligência Artificial</span>
                </span>
                <span className="text-sm font-mono font-black">{selectedAppDetail.aiScore}% Match</span>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                {selectedAppDetail.aiSummary}
              </p>
            </div>

            {/* Screening Answers */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-slate-900">Respostas de Triagem do Candidato</h4>
              {selectedAppDetail.screeningAnswers.map((ans, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
                  <span className="font-bold text-slate-800 block">Q: {ans.question}</span>
                  <p className="text-slate-600 font-medium">A: {ans.answer}</p>
                </div>
              ))}
            </div>

            {/* Stage Mover */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Ações de Fluxo Seletivo</h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {stagesList.map((stg) => (
                  <button
                    key={stg.id}
                    onClick={() => {
                      onUpdateStage(selectedAppDetail.id, stg.id);
                      setSelectedAppDetail({ ...selectedAppDetail, stage: stg.id });
                      showToast(`Candidato movido para "${stg.label}".`);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-extrabold transition ${
                      selectedAppDetail.stage === stg.id 
                        ? 'bg-blue-600 text-white shadow-xs' 
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {stg.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button 
                onClick={() => setSelectedAppDetail(null)}
                className="px-4 py-2.5 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl"
              >
                Fechar
              </button>

              <button
                onClick={() => {
                  setSelectedAppDetail(null);
                  onOpenChatWithCandidate(selectedAppDetail.candidateId, selectedAppDetail.candidateName);
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center space-x-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enviar Mensagem / Agendar Entrevista</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
