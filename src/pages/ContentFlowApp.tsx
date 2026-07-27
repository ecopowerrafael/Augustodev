import React, { useState } from 'react';
import { 
  INITIAL_CLIENTS, INITIAL_CONTENTS, INITIAL_IDEAS, INITIAL_TASKS, INITIAL_TEAM, SAAS_PLANS, INITIAL_NOTIFICATIONS 
} from '../data/contentflowData';
import { 
  Client, ContentItem, Idea, Task, TeamMember, ContentStatus, NotificationItem, AccessRole 
} from '../types/contentflow';

// Subcomponents
import { Header } from '../components/contentflow/Header';
import { Sidebar, ActiveTab } from '../components/contentflow/Sidebar';
import { MobileNav } from '../components/contentflow/MobileNav';
import { NewContentModal } from '../components/contentflow/NewContentModal';
import { PublicationDetailDrawer } from '../components/contentflow/PublicationDetailDrawer';
import { ClientApprovalModal } from '../components/contentflow/ClientApprovalModal';
import { GlobalSearchModal } from '../components/contentflow/GlobalSearchModal';
import { NotificationsDrawer } from '../components/contentflow/NotificationsDrawer';

// Views
import { DashboardView } from './contentflow/DashboardView';
import { ClientsView } from './contentflow/ClientsView';
import { ClientDetailView } from './contentflow/ClientDetailView';
import { IdeasBankView } from './contentflow/IdeasBankView';
import { KanbanView } from './contentflow/KanbanView';
import { CalendarView } from './contentflow/CalendarView';
import { ProjectsView } from './contentflow/ProjectsView';
import { TasksView } from './contentflow/TasksView';
import { ApprovalPortalView } from './contentflow/ApprovalPortalView';
import { ReportsView } from './contentflow/ReportsView';
import { TeamView } from './contentflow/TeamView';
import { PlansView } from './contentflow/PlansView';
import { SaaSAdminView } from './contentflow/SaaSAdminView';
import { LoginView } from './contentflow/LoginView';
import { OnboardingView } from './contentflow/OnboardingView';

interface ContentFlowAppProps {
  onBack: () => void;
}

export const ContentFlowApp: React.FC<ContentFlowAppProps> = ({ onBack }) => {
  // App States
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [activeRole, setActiveRole] = useState<AccessRole>('manager');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [viewState, setViewState] = useState<'app' | 'login' | 'onboarding'>('app');

  // Datasets
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [contents, setContents] = useState<ContentItem[]>(INITIAL_CONTENTS);
  const [ideas, setIdeas] = useState<Idea[]>(INITIAL_IDEAS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Selected Items for Drawers & Modals
  const [selectedClientDetail, setSelectedClientDetail] = useState<Client | null>(null);
  const [selectedContentDetail, setSelectedContentDetail] = useState<ContentItem | null>(null);
  const [selectedApprovalItem, setSelectedApprovalItem] = useState<ContentItem | null>(null);

  // Modals Visibility
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Handlers
  const handleToggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleUpdateStatus = (id: string, newStatus: ContentStatus) => {
    setContents(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    if (selectedContentDetail?.id === id) {
      setSelectedContentDetail(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleAddComment = (id: string, text: string) => {
    const newCm = {
      id: `cm-${Date.now()}`,
      authorName: activeRole === 'client_approver' ? 'Juliana Alves' : 'Marina Costa',
      authorAvatar: activeRole === 'client_approver' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' 
        : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      authorRole: (activeRole === 'client_approver' ? 'Cliente' : 'Agência') as 'Agência' | 'Cliente' | 'Colaborador',
      text,
      createdAt: 'Agora mesmo',
    };

    setContents(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, comments: [...c.comments, newCm] };
      }
      return c;
    }));

    if (selectedContentDetail?.id === id) {
      setSelectedContentDetail(prev => prev ? { ...prev, comments: [...prev.comments, newCm] } : null);
    }
  };

  const handleCreateContent = (data: Partial<ContentItem>) => {
    const newItem: ContentItem = {
      id: `cnt-${Date.now()}`,
      clientId: data.clientId || clients[0].id,
      clientName: clients.find(c => c.id === data.clientId)?.brandName || clients[0].brandName,
      clientLogo: clients.find(c => c.id === data.clientId)?.logo || clients[0].logo,
      title: data.title || 'Novo Conteúdo Editorial',
      channel: data.channel || 'Instagram',
      format: data.format || 'Carrossel',
      status: 'in_production',
      scheduledPublishDate: data.scheduledPublishDate || '30/07/2026',
      deadlineDate: '29/07/2026',
      assigneeName: 'Ana Souza',
      assigneeAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
      reviewerName: 'Marina Costa',
      priority: 'high',
      approverName: 'Juliana Alves',
      progressPercent: 30,
      pendingCommentsCount: 0,
      briefing: {
        objective: data.briefing?.objective || 'Engajamento e alcance',
        targetAudience: 'Público consumidor geral',
        guidelines: 'Seguir tom de voz e paleta visual.',
      },
      checklist: [
        { id: 'c1', label: 'Roteiro / Copywriting', completed: true },
        { id: 'c2', label: 'Design das Artes', completed: false },
        { id: 'c3', label: 'Revisão Ortográfica', completed: false },
      ],
      media: {
        type: 'carousel',
        url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800',
        caption: 'Legenda gerada no ContentFlow.',
        callToAction: 'Comente abaixo!',
        hashtags: ['#contentflow', '#marketing'],
      },
      comments: [],
      timeline: [
        { id: 't1', type: 'created', title: 'Conteúdo Criado', description: 'Item cadastrado no sistema.', timestamp: 'Hoje', actorName: 'Marina Costa' }
      ]
    };

    setContents([newItem, ...contents]);
  };

  const handleCreateClient = (data: Partial<Client>) => {
    const newCli: Client = {
      id: `cli-${Date.now()}`,
      name: data.brandName || 'Nova Marca',
      brandName: data.brandName || 'Nova Marca',
      segment: data.segment || 'Varejo',
      logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150',
      primaryColor: '#6C4FF8',
      status: 'active',
      contentsPublishedThisMonth: 0,
      contentsInProduction: 0,
      contentsAwaitingApproval: 0,
      monthlyContentsTarget: 12,
      monthlyProgressPercent: 0,
      contactName: 'Contato Principal',
      contactEmail: 'contato@cliente.com.br',
      whatsapp: '(11) 99999-8888',
      roleTitle: 'Gestor da Marca',
      socials: { instagram: '@novamarca' },
      assignedManager: 'Marina Costa',
      teamMembers: ['Ana Souza'],
      lastAccess: 'Agora mesmo',
      strategy: {
        objectives: ['Divulgação de marca'],
        toneOfVoice: 'Moderno e acessível',
        targetAudience: 'Consumidores gerais',
        forbiddenWords: [],
        publishingFrequency: '3x por semana'
      }
    };

    setClients([...clients, newCli]);
  };

  const handlePromoteIdea = (idea: Idea) => {
    handleCreateContent({
      clientId: idea.clientId,
      title: idea.title,
      channel: idea.channel,
      format: idea.format,
      briefing: {
        objective: idea.description,
        targetAudience: 'Comunidade da marca',
        guidelines: 'Inspirada no banco de ideias.',
      }
    });
    setActiveTab('kanban');
  };

  // Filter contents by selected client if selected
  const displayedContents = selectedClient
    ? contents.filter(c => c.clientId === selectedClient.id)
    : contents;

  // Auth & Onboarding Flow
  if (viewState === 'login') {
    return (
      <LoginView
        onLoginSuccess={() => setViewState('app')}
        onOpenOnboarding={() => setViewState('onboarding')}
        isDarkMode={isDarkMode}
      />
    );
  }

  if (viewState === 'onboarding') {
    return (
      <OnboardingView
        onComplete={() => setViewState('app')}
        isDarkMode={isDarkMode}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      isDarkMode ? 'bg-[#0f0f12] text-stone-100' : 'bg-[#F6F7FB] text-stone-900'
    }`}>
      {/* Top Navigation Header */}
      <Header
        selectedClient={selectedClient}
        clients={clients}
        onSelectClient={setSelectedClient}
        currentRole={activeRole}
        onChangeRole={setActiveRole}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenNewModal={() => setIsNewModalOpen(true)}
        onBackToPortfolio={onBack}
        unreadNotifsCount={notifications.filter(n => !n.read).length}
      />

      {/* Main Content Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          currentRole={activeRole}
          isDarkMode={isDarkMode}
          onLogout={() => setViewState('login')}
        />

        {/* Main View Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <DashboardView
              clients={clients}
              contents={displayedContents}
              ideas={ideas}
              tasks={tasks}
              onSelectTab={setActiveTab}
              onOpenContentDetail={(item) => setSelectedContentDetail(item)}
              onOpenNewModal={() => setIsNewModalOpen(true)}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'clients' && (
            <ClientsView
              clients={clients}
              onSelectClientDetail={(client) => {
                setSelectedClientDetail(client);
                setActiveTab('client_detail');
              }}
              onOpenNewModal={() => setIsNewModalOpen(true)}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'client_detail' && (
            <ClientDetailView
              client={selectedClientDetail || clients[0]}
              contents={contents}
              ideas={ideas}
              onBack={() => setActiveTab('clients')}
              onOpenContentDetail={(item) => setSelectedContentDetail(item)}
              onOpenPortalView={() => setActiveTab('approvals')}
              onOpenNewModal={() => setIsNewModalOpen(true)}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'ideas' && (
            <IdeasBankView
              ideas={ideas}
              clients={clients}
              onOpenNewModal={() => setIsNewModalOpen(true)}
              onPromoteToProduction={handlePromoteIdea}
              isDarkMode={isDarkMode}
            />
          )}

          {(activeTab === 'contents' || activeTab === 'kanban') && (
            <KanbanView
              contents={displayedContents}
              clients={clients}
              onOpenContentDetail={(item) => setSelectedContentDetail(item)}
              onOpenNewModal={() => setIsNewModalOpen(true)}
              onMoveStatus={handleUpdateStatus}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarView
              contents={displayedContents}
              clients={clients}
              onOpenContentDetail={(item) => setSelectedContentDetail(item)}
              onOpenNewModal={() => setIsNewModalOpen(true)}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsView
              projects={[]}
              tasks={tasks}
              onOpenNewModal={() => setIsNewModalOpen(true)}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'tasks' && (
            <TasksView
              tasks={tasks}
              onOpenNewModal={() => setIsNewModalOpen(true)}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'approvals' && (
            <ApprovalPortalView
              contents={displayedContents}
              onApproveItem={(id) => handleUpdateStatus(id, 'approved')}
              onRequestAdjustments={(id) => handleUpdateStatus(id, 'changes_requested')}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView isDarkMode={isDarkMode} />
          )}

          {activeTab === 'team' && (
            <TeamView
              team={team}
              onOpenNewModal={() => setIsNewModalOpen(true)}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'settings' && (
            <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
              isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
            }`}>
              <h2 className="text-xl font-bold">Configurações da Agência</h2>
              <p className="text-xs text-stone-500">Ajuste as preferências globais da sua plataforma SaaS ContentFlow.</p>
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs space-y-2">
                <p className="font-bold text-purple-900 dark:text-purple-200">Notificações e Lembretes de Aprovação</p>
                <p className="text-stone-600 dark:text-stone-300">As notificações automáticas via e-mail e WhatsApp para clientes estão ativas no ambiente de testes.</p>
              </div>
            </div>
          )}

          {activeTab === 'plans' && (
            <PlansView
              plans={SAAS_PLANS}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'saas_admin' && (
            <SaaSAdminView isDarkMode={isDarkMode} />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenNewModal={() => setIsNewModalOpen(true)}
        onOpenMoreMenu={() => setIsSearchOpen(true)}
        isDarkMode={isDarkMode}
      />

      {/* Drawers and Modals */}
      <NewContentModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        clients={clients}
        onCreateContent={handleCreateContent}
        onCreateClient={handleCreateClient}
        isDarkMode={isDarkMode}
      />

      <PublicationDetailDrawer
        item={selectedContentDetail}
        onClose={() => setSelectedContentDetail(null)}
        onUpdateStatus={handleUpdateStatus}
        onAddComment={handleAddComment}
        isDarkMode={isDarkMode}
      />

      <ClientApprovalModal
        item={selectedApprovalItem}
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        onConfirmApprove={(id) => handleUpdateStatus(id, 'approved')}
        onRequestAdjustments={(id) => handleUpdateStatus(id, 'changes_requested')}
        isDarkMode={isDarkMode}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        clients={clients}
        contents={contents}
        ideas={ideas}
        tasks={tasks}
        onSelectContentItem={(item) => setSelectedContentDetail(item)}
        isDarkMode={isDarkMode}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};
