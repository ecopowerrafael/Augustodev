import React, { useState } from 'react';
import { UserRole } from '../../types/rhconnect';
import { 
  INITIAL_JOBS, 
  INITIAL_APPLICATIONS, 
  INITIAL_CANDIDATES, 
  INITIAL_COMPANIES, 
  INITIAL_CHAT_THREADS, 
  INITIAL_CHAT_MESSAGES, 
  INITIAL_INVOICES, 
  INITIAL_ADMIN_METRICS 
} from '../../data/rhconnectMockData';

import { RHConnectHeader } from './RHConnectHeader';
import { RHLandingPage } from './RHLandingPage';
import { RHCandidateDashboard } from './RHCandidateDashboard';
import { RHCandidateProfile } from './RHCandidateProfile';
import { RHJobSearchAndApply } from './RHJobSearchAndApply';
import { RHCompanyDashboard } from './RHCompanyDashboard';
import { RHCompanyJobManager } from './RHCompanyJobManager';
import { RHCompanyCandidatesList } from './RHCompanyCandidatesList';
import { RHCompanyFinancial } from './RHCompanyFinancial';
import { RHChatMessaging } from './RHChatMessaging';
import { RHAdminDashboard } from './RHAdminDashboard';
import { RHAuthModal } from './RHAuthModal';

export const RHConnectApp: React.FC = () => {
  // State management
  const [userRole, setUserRole] = useState<UserRole>('public');
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auth modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialMode, setAuthModalInitialMode] = useState<'login' | 'register_candidate' | 'register_company'>('login');

  // Core Data Collections
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [candidateProfile, setCandidateProfile] = useState(INITIAL_CANDIDATES[0]);
  const [companyProfile, setCompanyProfile] = useState(INITIAL_COMPANIES[0]);
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [chatThreads, setChatThreads] = useState(INITIAL_CHAT_THREADS);
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [adminMetrics, setAdminMetrics] = useState(INITIAL_ADMIN_METRICS);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Role Switcher Handler
  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    if (newRole === 'candidate') {
      setActiveTab('candidate_dashboard');
      showToast('Visualizando visão de CANDIDATO (Mariana Souza)');
    } else if (newRole === 'company') {
      setActiveTab('company_dashboard');
      showToast('Visualizando visão de EMPRESA (Tech Solutions)');
    } else if (newRole === 'admin') {
      setActiveTab('admin_overview');
      showToast('Visualizando visão de SUPER ADMIN');
    } else {
      setActiveTab('landing');
      showToast('Modo Visitante / Landing Page');
    }
  };

  // Application creation logic
  const handleApplyToJob = (jobId: string, screeningAnswers: { questionId: string; question: string; answer: string }[]) => {
    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetJob) return;

    const newApp = {
      id: `app_${Date.now()}`,
      jobId: targetJob.id,
      jobTitle: targetJob.title,
      companyId: targetJob.companyId,
      companyName: targetJob.companyName,
      companyLogo: targetJob.companyLogo,
      candidateId: candidateProfile.id,
      candidateName: candidateProfile.name,
      candidatePhoto: candidateProfile.photoUrl,
      candidateHeadline: candidateProfile.headline,
      candidateLocation: `${candidateProfile.city}, ${candidateProfile.state}`,
      stage: 'triagem_ia' as const,
      aiScore: 92,
      aiSummary: 'Candidato com forte aderência técnica às ferramentas exigidas e ampla bagagem na área.',
      aiMatchingSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      aiMissingSkills: [],
      screeningAnswers,
      appliedDate: new Date().toISOString().split('T')[0]
    };

    setApplications([newApp, ...applications]);
    
    // Increment applicant count on job
    setJobs(jobs.map(j => j.id === jobId ? { ...j, applicantCount: j.applicantCount + 1 } : j));
  };

  // New Job Creation handler
  const handleCreateJob = (newJobObj: any) => {
    setJobs([newJobObj, ...jobs]);
  };

  // Update Job Status
  const handleUpdateJobStatus = (jobId: string, status: 'open' | 'paused' | 'closed') => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, status } : j));
  };

  // Stage change for candidates
  const handleUpdateStage = (appId: string, newStage: any) => {
    setApplications(applications.map(a => a.id === appId ? { ...a, stage: newStage } : a));
  };

  // Chat message send handler
  const handleSendMessage = (threadId: string, text: string, interviewInvite?: any) => {
    const newMsg = {
      id: `msg_${Date.now()}`,
      threadId,
      senderId: userRole === 'candidate' ? candidateProfile.id : companyProfile.id,
      senderName: userRole === 'candidate' ? candidateProfile.name : companyProfile.contactPerson,
      senderAvatar: userRole === 'candidate' ? candidateProfile.photoUrl : companyProfile.logoUrl,
      senderType: (userRole === 'candidate' ? 'candidate' : 'company') as any,
      text,
      timestamp: 'Agora',
      interviewInvite
    };

    setChatMessages([...chatMessages, newMsg]);

    // Update last message in thread
    setChatThreads(chatThreads.map(t => t.id === threadId ? {
      ...t,
      lastMessage: text,
      lastMessageTime: 'Agora'
    } : t));
  };

  // Financial plan upgrade handler
  const handleUpgradePlan = (newPlan: 'mensal' | 'premium') => {
    setCompanyProfile({ ...companyProfile, plan: newPlan });
    const newInv = {
      id: `INV-2026-${Date.now().toString().slice(-3)}`,
      companyId: companyProfile.id,
      companyName: companyProfile.tradeName,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
      amount: newPlan === 'mensal' ? 299 : 599,
      status: 'paid' as const,
      planName: newPlan === 'mensal' ? 'Plano Mensal Empresarial' : 'Plano Premium Corporativo',
      invoicePdfUrl: '#'
    };
    setInvoices([newInv, ...invoices]);
    showToast(`Plano atualizado para ${newPlan.toUpperCase()} com sucesso!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      
      {/* Toast Notification Bar */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-bold border border-slate-700 animate-fade-in flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Global Navigation Bar */}
      <RHConnectHeader
        userRole={userRole}
        setUserRole={handleRoleChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuthModal={(mode) => {
          setAuthModalInitialMode(mode);
          setIsAuthModalOpen(true);
        }}
        unreadNotificationsCount={2}
        onOpenNotifications={() => showToast('Sem novas notificações não lidas.')}
        onBackToPortfolio={() => window.location.href = '/'}
        selectedCandidateName={candidateProfile.name}
        selectedCompanyName={companyProfile.tradeName}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1 pb-16">
        
        {/* PUBLIC VIEWS */}
        {activeTab === 'landing' && (
          <RHLandingPage
            onSearchJobsClick={() => setActiveTab('jobs')}
            onCandidateRegisterClick={() => {
              setAuthModalInitialMode('register_candidate');
              setIsAuthModalOpen(true);
            }}
            onCompanyRegisterClick={() => {
              setAuthModalInitialMode('register_company');
              setIsAuthModalOpen(true);
            }}
            onDemoCandidateClick={() => handleRoleChange('candidate')}
            onDemoCompanyClick={() => handleRoleChange('company')}
          />
        )}

        {activeTab === 'jobs' && (
          <RHJobSearchAndApply
            jobs={jobs}
            userApplications={applications}
            onApplyToJob={handleApplyToJob}
            showToast={showToast}
            candidateName={candidateProfile.name}
          />
        )}

        {/* CANDIDATE VIEWS */}
        {activeTab === 'candidate_dashboard' && (
          <RHCandidateDashboard
            candidate={candidateProfile}
            applications={applications}
            recommendedJobs={jobs.slice(0, 3)}
            onViewJobDetails={() => setActiveTab('jobs')}
            onEditProfileClick={() => setActiveTab('candidate_profile')}
            onViewAllApplicationsClick={() => setActiveTab('candidate_dashboard')}
            onOpenChatClick={() => setActiveTab('chat')}
            onSearchMoreJobsClick={() => setActiveTab('jobs')}
          />
        )}

        {activeTab === 'candidate_profile' && (
          <RHCandidateProfile
            candidate={candidateProfile}
            onSaveProfile={(updated) => {
              setCandidateProfile(updated);
              showToast('Perfil do candidato atualizado!');
            }}
            showToast={showToast}
          />
        )}

        {/* COMPANY VIEWS */}
        {activeTab === 'company_dashboard' && (
          <RHCompanyDashboard
            company={companyProfile}
            jobs={jobs}
            applications={applications}
            onNewJobClick={() => setActiveTab('company_jobs_new')}
            onManageJobsClick={() => setActiveTab('company_jobs')}
            onViewCandidatesClick={() => setActiveTab('company_candidates')}
            onOpenChatClick={() => setActiveTab('chat')}
            onManagePlanClick={() => setActiveTab('company_financial')}
          />
        )}

        {activeTab === 'company_jobs' && (
          <RHCompanyJobManager
            jobs={jobs}
            companyId={companyProfile.id}
            companyName={companyProfile.tradeName}
            companyLogo={companyProfile.logoUrl}
            onCreateJob={handleCreateJob}
            onUpdateJobStatus={handleUpdateJobStatus}
            onViewCandidatesForJob={() => setActiveTab('company_candidates')}
            showToast={showToast}
            initialMode="list"
          />
        )}

        {activeTab === 'company_jobs_new' && (
          <RHCompanyJobManager
            jobs={jobs}
            companyId={companyProfile.id}
            companyName={companyProfile.tradeName}
            companyLogo={companyProfile.logoUrl}
            onCreateJob={handleCreateJob}
            onUpdateJobStatus={handleUpdateJobStatus}
            onViewCandidatesForJob={() => setActiveTab('company_candidates')}
            showToast={showToast}
            initialMode="new"
          />
        )}

        {activeTab === 'company_candidates' && (
          <RHCompanyCandidatesList
            applications={applications}
            jobs={jobs}
            onUpdateStage={handleUpdateStage}
            onOpenChatWithCandidate={() => setActiveTab('chat')}
            showToast={showToast}
          />
        )}

        {activeTab === 'company_financial' && (
          <RHCompanyFinancial
            company={companyProfile}
            invoices={invoices}
            onUpgradePlan={handleUpgradePlan}
            showToast={showToast}
          />
        )}

        {/* CHAT MESSAGING VIEW */}
        {activeTab === 'chat' && (
          <RHChatMessaging
            userRole={userRole}
            threads={chatThreads}
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            showToast={showToast}
          />
        )}

        {/* ADMIN VIEWS */}
        {(activeTab === 'admin_overview' || activeTab === 'admin_companies' || activeTab === 'admin_candidates' || activeTab === 'admin_ai_config') && (
          <RHAdminDashboard
            metrics={adminMetrics}
            companies={companies}
            candidates={candidates}
            jobs={jobs}
            onToggleCompanyStatus={(id) => {
              setCompanies(companies.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'suspended' : 'active' } : c));
            }}
            onToggleCandidateStatus={(id) => {
              setCandidates(candidates.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'blocked' : 'active' } : c));
            }}
            showToast={showToast}
            activeSubTab={activeTab.replace('admin_', '') as any}
          />
        )}

      </main>

      {/* Global Auth Modal */}
      <RHAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalInitialMode}
        onLoginSuccess={(role) => handleRoleChange(role)}
        showToast={showToast}
      />

      {/* Professional Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-slate-500 text-xs font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-black text-slate-900 text-sm">RH<span className="text-blue-600">Connect</span></span>
            <span>• Plataforma Inteligente de R&S com IA</span>
          </div>

          <p className="text-[11px] font-mono">
            © 2026 RH Connect Brasil Ltda. Todos os direitos reservados. Projeto Portfólio.
          </p>
        </div>
      </footer>

    </div>
  );
};
