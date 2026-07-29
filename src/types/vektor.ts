export type VektorTab = 
  | 'home' 
  | 'sobre' 
  | 'servicos' 
  | 'abrir-empresa' 
  | 'trocar-contabilidade' 
  | 'diagnostico' 
  | 'bpo-financeiro' 
  | 'area-cliente' 
  | 'blog' 
  | 'contato';

export interface VektorService {
  id: string;
  title: string;
  category: 'contabil' | 'tributario' | 'financeiro' | 'trabalhista' | 'societario';
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  forWho: string;
  deliverables: string[];
  startingPrice: string;
  popular?: boolean;
}

export interface VektorSector {
  id: string;
  name: string;
  iconName: string;
  tagline: string;
  description: string;
  keyPains: string[];
  solutions: string[];
  taxRegimeRecommendation: string;
  image: string;
}

export interface VektorDiagnosticInput {
  revenueTier: 'ate-30k' | '30k-100k' | '100k-300k' | '300k-1m' | 'acima-1m';
  businessType: 'servicos' | 'commerce' | 'tech' | 'saude' | 'outros';
  currentRegime: 'mei' | 'simples' | 'presumido' | 'real' | 'nao-sei';
  employeesCount: 'zero' | '1-5' | '6-15' | 'acima-15';
  hasTaxAnomalies: boolean;
}

export interface VektorDiagnosticResult {
  score: number; // 0 to 100 efficiency
  recommendedRegime: string;
  estimatedTaxReductionPercentage: number;
  estimatedAnnualSavings: number;
  actionPoints: string[];
}

export interface VektorClientDocument {
  id: string;
  title: string;
  type: 'DAS' | 'DARF' | 'FGTS' | 'DRE' | 'Balancete' | 'Contrato Social';
  dueDate: string;
  amount?: number;
  status: 'pago' | 'a_vencer' | 'atrasado' | 'disponivel';
  code: string;
}

export interface VektorTicket {
  id: string;
  subject: string;
  department: 'Fiscal' | 'Contábil' | 'DP / Folha' | 'Societário';
  date: string;
  status: 'Em Atendimento' | 'Concluído' | 'Aguardando Cliente';
  assignedTo: string;
}

export interface VektorBlogPost {
  id: string;
  title: string;
  category: 'Planejamento Tributário' | 'Gestão Empresarial' | 'Abertura de Empresa' | 'BPO Financeiro';
  author: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
  image: string;
}

export interface VektorTestimonial {
  id: string;
  clientName: string;
  role: string;
  companyName: string;
  sector: string;
  testimonial: string;
  metrics: string;
  avatar: string;
}

export interface VektorFAQ {
  id: string;
  question: string;
  answer: string;
  category: 'Geral' | 'Troca de Contador' | 'Abertura' | 'Impostos' | 'Planos';
}
