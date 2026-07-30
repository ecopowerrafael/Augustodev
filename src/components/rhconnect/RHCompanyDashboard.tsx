import React from 'react';
import { CompanyProfile, JobPosition, Application } from '../../types/rhconnect';
import { 
  Building2, 
  Briefcase, 
  Users, 
  Sparkles, 
  Calendar, 
  MessageSquare, 
  CreditCard, 
  PlusCircle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  FileText,
  ChevronRight
} from 'lucide-react';

interface RHCompanyDashboardProps {
  company: CompanyProfile;
  jobs: JobPosition[];
  applications: Application[];
  onNewJobClick: () => void;
  onManageJobsClick: () => void;
  onViewCandidatesClick: () => void;
  onOpenChatClick: () => void;
  onManagePlanClick: () => void;
}

export const RHCompanyDashboard: React.FC<RHCompanyDashboardProps> = ({
  company,
  jobs,
  applications,
  onNewJobClick,
  onManageJobsClick,
  onViewCandidatesClick,
  onOpenChatClick,
  onManagePlanClick
}) => {
  const companyJobs = jobs.filter(j => j.companyId === company.id);
  const companyApps = applications.filter(a => companyJobs.some(j => j.id === a.jobId));
  const highMatchApps = companyApps.filter(a => a.aiScore >= 85);
  const scheduledInterviews = companyApps.filter(a => a.stage === 'entrevista');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-8 text-left text-slate-900">
      
      {/* Company Header & Subscription Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center space-x-4">
          <img 
            src={company.logoUrl} 
            alt={company.tradeName} 
            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
          />
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{company.tradeName}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-mono font-bold border border-blue-200">
                {company.industry}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">{company.contactPerson} • {company.city}, {company.state}</p>
          </div>
        </div>

        {/* Current Plan Badge */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs w-full md:w-auto min-w-[260px]">
          <div className="flex justify-between items-center font-bold">
            <span className="text-slate-700">Plano Ativo:</span>
            <span className="text-blue-600 font-mono uppercase font-black">{company.plan.replace('_', ' ')}</span>
          </div>
          {company.plan === 'free_trial' ? (
            <p className="text-[11px] text-amber-700 font-bold flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{company.trialDaysLeft} dias restantes de degustação</span>
            </p>
          ) : (
            <p className="text-[11px] text-emerald-700 font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Assinatura Regularizada</span>
            </p>
          )}
          <button
            onClick={onManagePlanClick}
            className="text-[11px] font-bold text-blue-600 hover:underline block pt-1"
          >
            Gerenciar ou Fazer Upgrade →
          </button>
        </div>
      </div>

      {/* HR KPIs Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Vagas Abertas</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900 block">{companyJobs.filter(j => j.status === 'open').length}</span>
          <button onClick={onManageJobsClick} className="text-[11px] text-blue-600 font-bold hover:underline">
            Ver todas as vagas →
          </button>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Candidatos</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900 block">{companyApps.length}</span>
          <span className="text-[11px] text-slate-500 font-medium">Inscritos nas suas vagas</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Alta Aderência IA (&gt;85%)</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900 block">{highMatchApps.length}</span>
          <button onClick={onViewCandidatesClick} className="text-[11px] text-purple-700 font-bold hover:underline">
            Ver ranking por IA →
          </button>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Entrevistas Agendadas</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900 block">{scheduledInterviews.length}</span>
          <span className="text-[11px] text-amber-700 font-bold">1 Entrevista esta semana</span>
        </div>

      </div>

      {/* Quick Action Shortcuts */}
      <div className="flex flex-wrap items-center gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-lg">
        <div className="flex-1 space-y-1">
          <h3 className="text-lg font-black tracking-tight">Atalhos de Gestão de Recrutamento</h3>
          <p className="text-xs text-slate-300 font-medium">Publique novas vagas, filtre candidatos com IA ou converse diretamente com talentos.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onNewJobClick}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-2xl shadow-sm transition flex items-center space-x-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publicar Nova Vaga</span>
          </button>

          <button
            onClick={onViewCandidatesClick}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs rounded-2xl transition flex items-center space-x-1.5 cursor-pointer border border-slate-700"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Triagem de Candidatos IA</span>
          </button>

          <button
            onClick={onOpenChatClick}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs rounded-2xl transition flex items-center space-x-1.5 cursor-pointer border border-slate-700"
          >
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>Abrir Chat</span>
          </button>
        </div>
      </div>

      {/* Top Ranked Candidates Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900">Candidatos Priorizados por IA</h3>
            <p className="text-xs text-slate-500 font-medium">Inscritos ordenados por compatibilidade técnica e cultural</p>
          </div>

          <button 
            onClick={onViewCandidatesClick}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1"
          >
            <span>Ver Todos os Candidatos</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companyApps.map((app) => (
            <div key={app.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex space-x-3">
                  <img 
                    src={app.candidatePhoto} 
                    alt={app.candidateName} 
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{app.candidateName}</h4>
                    <p className="text-xs text-slate-500 font-medium">{app.candidateHeadline}</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-emerald-600 text-white font-mono font-black text-xs rounded-xl flex items-center space-x-1 shadow-2xs">
                  <Sparkles className="w-3 h-3" />
                  <span>{app.aiScore}% Match</span>
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-800 block">Vaga: {app.jobTitle}</span>
                <p className="text-slate-600 font-normal">{app.aiSummary}</p>
              </div>

              <div className="flex justify-between items-center pt-1 text-xs">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-800 font-bold rounded-lg border border-blue-200 uppercase text-[10px]">
                  Etapa: {app.stage.replace('_', ' ')}
                </span>

                <button
                  onClick={onViewCandidatesClick}
                  className="font-bold text-blue-600 hover:underline"
                >
                  Ver Perfil Completo & Currículo →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
