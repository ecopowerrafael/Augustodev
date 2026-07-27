export type AccessRole = 'owner' | 'manager' | 'collaborator' | 'client_approver' | 'platform_admin';

export type ContentStatus = 'idea' | 'in_production' | 'review' | 'approval' | 'changes_requested' | 'approved' | 'published' | 'cancelled';

export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';

export type ChannelType = 'Instagram' | 'Facebook' | 'LinkedIn' | 'TikTok' | 'YouTube' | 'Blog' | 'E-mail Marketing';

export type FormatType = 'Carrossel' | 'Reels' | 'Post Estático' | 'Vídeo Longo' | 'Artigo' | 'Stories' | 'Newsletter';

export interface Client {
  id: string;
  name: string;
  brandName: string;
  segment: string;
  logo: string;
  primaryColor: string;
  contactName: string;
  contactEmail: string;
  whatsapp: string;
  roleTitle: string;
  socials: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    tiktok?: string;
    youtube?: string;
  };
  strategy: {
    objectives: string[];
    targetAudience: string;
    toneOfVoice: string;
    forbiddenWords: string[];
    publishingFrequency: string;
  };
  assignedManager: string;
  teamMembers: string[];
  monthlyContentsTarget: number;
  contentsInProduction: number;
  contentsAwaitingApproval: number;
  contentsPublishedThisMonth: number;
  monthlyProgressPercent: number;
  status: 'active' | 'pending' | 'paused';
  lastAccess: string;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  channel: ChannelType;
  format: FormatType;
  theme: string;
  priority: PriorityLevel;
  tags: string[];
  author: string;
  createdAt: string;
  commentsCount: number;
  isFavorite: boolean;
  promotedToProduction?: boolean;
}

export interface ContentMedia {
  type: 'image' | 'video' | 'carousel' | 'pdf';
  url: string;
  thumbnailUrl?: string;
  carouselSlides?: string[];
  caption: string;
  hashtags: string[];
  callToAction: string;
}

export interface ContentChecklist {
  id: string;
  label: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'Agência' | 'Cliente' | 'Colaborador';
  text: string;
  createdAt: string;
  attachments?: string[];
  slideNumber?: number;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  actorName: string;
  timestamp: string;
  type: 'created' | 'status_change' | 'comment' | 'adjustment_requested' | 'approved' | 'published';
}

export interface ContentItem {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  clientLogo: string;
  channel: ChannelType;
  format: FormatType;
  status: ContentStatus;
  priority: PriorityLevel;
  assigneeName: string;
  assigneeAvatar: string;
  reviewerName: string;
  approverName: string;
  deadlineDate: string;
  scheduledPublishDate: string;
  briefing: {
    objective: string;
    targetAudience: string;
    guidelines: string;
    references?: string;
  };
  media: ContentMedia;
  checklist: ContentChecklist[];
  comments: Comment[];
  timeline: TimelineEvent[];
  projectId?: string;
  projectName?: string;
  progressPercent: number;
  pendingCommentsCount: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  projectId?: string;
  projectName?: string;
  assigneeName: string;
  assigneeAvatar: string;
  dueDate: string;
  status: 'todo' | 'in_progress' | 'in_review' | 'completed' | 'blocked';
  priority: PriorityLevel;
  estimatedHours: number;
  subtasks: { id: string; title: string; completed: boolean }[];
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  description: string;
  startDate: string;
  endDate: string;
  managerName: string;
  progressPercent: number;
  status: 'active' | 'completed' | 'on_hold';
  priority: PriorityLevel;
  totalContents: number;
  totalTasks: number;
  completedTasks: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roleTitle: string;
  systemRole: AccessRole;
  assignedClientsCount: number;
  activeContentsCount: number;
  status: 'online' | 'active' | 'away' | 'offline';
  lastAccess: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'content' | 'approval' | 'task' | 'client' | 'system';
  read: boolean;
  linkAction?: string;
}

export interface SaaSPlan {
  id: string;
  name: string;
  priceMonthly: number;
  maxClients: string;
  maxUsers: string;
  features: string[];
  popular?: boolean;
}

export interface SaaSAdminOrg {
  id: string;
  name: string;
  ownerName: string;
  planName: string;
  clientsCount: number;
  usersCount: number;
  createdAt: string;
  lastAccess: string;
  status: 'Ativa' | 'Teste' | 'Pagamento pendente' | 'Suspensa';
  mrrValue: number;
}
