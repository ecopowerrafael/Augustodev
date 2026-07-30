export type UserRole = 'candidate' | 'company' | 'admin' | 'public';

export type WorkModel = 'remoto' | 'hibrido' | 'presencial';

export type ExperienceLevel = 'estagio' | 'junior' | 'pleno' | 'senior' | 'especialista' | 'lideranca';

export type ApplicationStage = 
  | 'recebido' 
  | 'triagem_ia' 
  | 'em_analise' 
  | 'entrevista' 
  | 'teste_tecnico' 
  | 'aprovado' 
  | 'reprovado' 
  | 'contratado';

export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  photoUrl: string;
  city: string;
  state: string;
  headline: string;
  summary: string;
  experienceYears: number;
  experienceLevel: ExperienceLevel;
  workModelPreference: WorkModel;
  desiredSalaryMin: number;
  desiredSalaryMax: number;
  softSkills: string[];
  hardSkills: string[];
  experiences: {
    id: string;
    company: string;
    role: string;
    period: string;
    description: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    period: string;
  }[];
  languages: string[];
  cvFileName: string;
  cvPdfUrl: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  status: 'active' | 'blocked';
  createdAt: string;
}

export interface CompanyProfile {
  id: string;
  companyName: string; // Razão Social
  tradeName: string; // Nome Fantasia
  cnpj: string;
  logoUrl: string;
  email: string;
  phone: string;
  contactPerson: string;
  industry: string;
  city: string;
  state: string;
  description: string;
  employeeCount: string;
  website: string;
  plan: 'free_trial' | 'mensal' | 'premium' | 'enterprise';
  planStatus: 'active' | 'trial_expiring' | 'past_due' | 'suspended';
  trialDaysLeft: number;
  status: 'active' | 'suspended' | 'blocked';
  createdAt: string;
}

export interface JobPosition {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  title: string;
  department: string;
  city: string;
  state: string;
  workModel: WorkModel;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  showSalary: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  desirableSkills: string[];
  benefits: string[];
  technologies: string[];
  stages: string[];
  screeningQuestions: {
    id: string;
    question: string;
    isEliminatory: boolean;
  }[];
  status: 'open' | 'paused' | 'closed';
  applicantCount: number;
  viewsCount: number;
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  candidatePhoto: string;
  candidateHeadline: string;
  candidateLocation: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  appliedDate: string;
  stage: ApplicationStage;
  aiScore: number; // 0 to 100
  aiMatchingSkills: string[];
  aiMissingSkills: string[];
  aiSummary: string;
  screeningAnswers: {
    questionId: string;
    question: string;
    answer: string;
  }[];
  notesCompany?: string;
  interviewDate?: string;
  interviewLink?: string;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  senderType: 'company' | 'candidate';
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  attachmentName?: string;
  attachmentUrl?: string;
  interviewInvite?: {
    date: string;
    time: string;
    platform: string;
    link: string;
  };
}

export interface ChatThread {
  id: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  candidateId: string;
  candidateName: string;
  candidatePhoto: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCountCandidate: number;
  unreadCountCompany: number;
}

export interface SystemNotification {
  id: string;
  recipientId: string;
  recipientType: 'candidate' | 'company' | 'admin';
  title: string;
  message: string;
  type: 'application' | 'interview' | 'message' | 'plan' | 'ai';
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface FinancialInvoice {
  id: string;
  companyId: string;
  companyName: string;
  planName: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'failed';
  invoicePdfUrl: string;
}

export interface AdminMetrics {
  totalCompanies: number;
  totalCandidates: number;
  totalJobs: number;
  totalHires: number;
  mrr: number;
  activeSubscriptions: number;
  trialConversionRate: number;
  aiScansCount: number;
}
