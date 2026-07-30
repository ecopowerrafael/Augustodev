import React from 'react';
import { 
  CandidateProfile, 
  Application, 
  JobPosition 
} from '../../types/rhconnect';
import { 
  UserCheck, 
  Briefcase, 
  Calendar, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ArrowRight, 
  Building2, 
  MapPin, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface RHCandidateDashboardProps {
  candidate: CandidateProfile;
  applications: Application[];
  recommendedJobs: JobPosition[];
  onViewJobDetails: (job: JobPosition) => void;
  onEditProfileClick: () => void;
  onViewAllApplicationsClick: () => void;
  onOpenChatClick: () => void;
  onSearchMoreJobsClick: () => void;
}

export const RHCandidateDashboard: React.FC<RHCandidateDashboardProps> = ({
  candidate,
  applications,
  recommendedJobs,
  onViewJobDetails,
  onEditProfileClick,
  onViewAllApplicationsClick,
  onOpenChatClick,
  onSearchMoreJobsClick
}) => {

  const activeApplications = applications.filter(a => a.candidateId === candidate.id);
  const scheduledInterviews = activeApplications.filter(a => a.stage === 'entrevista' && a.interviewDate);

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case 'recebido':
        return { label: 'Recebido', color: 'bg-slate-100 text-slate-800 border-slate-200' };
      case 'triagem_ia':
        return { label: 'Triagem IA', color: 'bg-blue-50 text-blue-800 border-blue-200' };
      case 'em_analise':
        return { label: 'Em Análise', color: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'entrevista':
        return { label: 'Entrevista Agendada', color: 'bg-purple-50 text-purple-800 border-purple-200' };
      case 'teste_tecnico':
        return { label: 'Teste Técnico', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' };
      case 'aprovado':
        return { label: 'Aprovado!', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'contratado':
        return { label: 'Contratado!', color: 'bg-emerald-600 text-white border-emerald-600' };
      case 'reprovado':
        return { label: 'Não Selecionado', color: 'bg-red-50 text-red-800 border-red-200' };
      default:
        return { label: stage, color: 'bg-slate-100 text-slate-800' };
    }
  };

  return (
    <div className="space-y-8 font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-slate-900 text-left">
      
      {/* Welcome & Profile Completeness Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/80 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center space-x-4">
            <img 
              src={candidate.photoUrl} 
              alt={candidate.name} 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-600 shadow-md"
            />
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Olá, {candidate.name.split(' ')[0]}! 👋
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Perfil Ativo</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium max-w-xl">
                {candidate.headline}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs w-full md:w-auto min-w-[260px]">
            <div className="flex justify-between items-center font-bold">
              <span className="text-slate-700">Completude do Perfil:</span>
              <span className="text-blue-600 font-mono">92%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full w-[92%]" />
            </div>
            <button
              onClick={onEditProfileClick}
              className="text-[11px] font-bold text-blue-600 hover:underline inline-block pt-1"
            >
              Completar currículo PDF e portfólio →
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Candidaturas</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900 block">{activeApplications.length}</span>
          <span className="text-[11px] text-slate-500 font-medium">Processos ativos no momento</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Entrevistas</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900 block">{scheduledInterviews.length}</span>
          <span className="text-[11px] text-purple-700 font-bold">1 Agendada para esta semana</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Aderência Médio IA</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900 block">94%</span>
          <span className="text-[11px] text-emerald-700 font-bold">Perfil altamente compatível</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Mensagens</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900 block">2</span>
          <button 
            onClick={onOpenChatClick}
            className="text-[11px] text-blue-600 font-bold hover:underline"
          >
            Abrir chat com recrutadores →
          </button>
        </div>

      </div>

      {/* Main Grid: Applications Status + Recommended Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Applications Status Timeline */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Minhas Candidaturas</h3>
                <p className="text-xs text-slate-500 font-medium">Acompanhe o status e a evolução em cada empresa em tempo real</p>
              </div>

              <button
                onClick={onViewAllApplicationsClick}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1"
              >
                <span>Ver Todas</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
              {activeApplications.map((app) => {
                const badge = getStageBadge(app.stage);
                return (
                  <div 
                    key={app.id}
                    className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-blue-300 transition space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={app.companyLogo} 
                          alt={app.companyName} 
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900">{app.jobTitle}</h4>
                          <span className="text-xs text-slate-500 font-medium">{app.companyName}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${badge.color}`}>
                          {badge.label}
                        </span>
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full flex items-center space-x-1">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          <span>{app.aiScore}% Match</span>
                        </span>
                      </div>
                    </div>

                    {/* AI Feedback Summary Snippet */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                      <span className="font-bold text-slate-800 block flex items-center space-x-1">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>Análise de Compatibilidade IA:</span>
                      </span>
                      <p className="text-slate-600 font-normal leading-relaxed">
                        {app.aiSummary}
                      </p>
                    </div>

                    {/* Interview Alert if scheduled */}
                    {app.stage === 'entrevista' && app.interviewDate && (
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-purple-900 text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                          <div>
                            <span className="font-bold block">Entrevista Agendada: 24/02/2026 às 14:00</span>
                            <span className="text-[11px] text-purple-700">Plataforma: Google Meet</span>
                          </div>
                        </div>

                        {app.interviewLink && (
                          <a
                            href={app.interviewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs transition flex items-center space-x-1 shrink-0"
                          >
                            <span>Entrar na Sala</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-1 text-[11px] text-slate-400 font-mono">
                      <span>Candidatura enviada em {app.appliedDate}</span>
                      <button 
                        onClick={onOpenChatClick}
                        className="text-blue-600 font-bold hover:underline font-sans"
                      >
                        Enviar Mensagem à Empresa
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Right Column (4 cols): Recommended Jobs */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Vagas Recomendadas IA</span>
              </h3>
              <button 
                onClick={onSearchMoreJobsClick}
                className="text-[11px] font-bold text-blue-600 hover:underline"
              >
                Ver Todas
              </button>
            </div>

            <div className="space-y-3">
              {recommendedJobs.slice(0, 3).map((job) => (
                <div 
                  key={job.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-2.5">
                      <img 
                        src={job.companyLogo} 
                        alt={job.companyName} 
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-extrabold text-xs text-slate-900 leading-tight">{job.title}</h4>
                        <span className="text-[11px] text-slate-500 font-medium">{job.companyName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 text-[10px] font-bold">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 uppercase">
                      {job.workModel}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                      R$ {job.salaryMin.toLocaleString('pt-BR')} - {job.salaryMax.toLocaleString('pt-BR')}
                    </span>
                  </div>

                  <button
                    onClick={() => onViewJobDetails(job)}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-2xs transition flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Ver Detalhes & Candidatar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={onSearchMoreJobsClick}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl transition"
            >
              Buscar por Cargo, Cidade ou Tecnologia
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
