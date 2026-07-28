export type UserRole = "psychologist" | "patient" | "clinic_admin" | "super_admin";

export type CRPValidationStatus = "validated" | "in_analysis" | "pending_document" | "rejected";

export type SessionStatus = "scheduled" | "in_progress" | "completed" | "interrupted";

export type ResourceCategory = 
  | "Cenário interativo"
  | "Desenho livre"
  | "Cartas reflexivas"
  | "Atividade guiada"
  | "Psicoeducação"
  | "Perguntas reflexivas";

export type AgeRange = "4 a 6 anos" | "6 a 12 anos" | "7 a 9 anos" | "10 a 12 anos" | "13 a 17 anos" | "Adultos" | "Todas as idades";

export type ClinicalDemand = 
  | "ansiedade"
  | "autoestima"
  | "emoções"
  | "vínculos"
  | "luto"
  | "medo"
  | "raiva"
  | "habilidades sociais"
  | "autoconhecimento"
  | "regulação emocional"
  | "conflitos"
  | "comunicação";

export interface TherapeuticResource {
  id: string;
  title: string;
  category: ResourceCategory;
  type: "scenario" | "drawing" | "cards";
  ageRanges: AgeRange[];
  demands: ClinicalDemand[];
  durationMinutes: string;
  description: string;
  objective: string;
  indications: string[];
  howToUse: string[];
  elementsAvailable: string[];
  careInstructions: string;
  isFavorite: boolean;
  usesCount: number;
  coverImage: string;
  badge?: string;
}

export interface ScenarioObject {
  id: string;
  name: string;
  category: "pessoas" | "família" | "animais" | "casas" | "natureza" | "escola" | "símbolos" | "emoções" | "objetos" | "transporte";
  icon: string;
  svgColor?: string;
}

export interface CanvasObjectInstance {
  instanceId: string;
  objectId: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  color?: string;
}

export interface ReflectiveCard {
  id: string;
  question: string;
  category: string;
  ageRange: AgeRange;
  demand: ClinicalDemand;
  hint?: string;
  answerType?: "voice" | "text" | "draw";
}

export interface TherapeuticSession {
  id: string;
  code: string;
  patientInitials: string;
  patientFullName?: string;
  ageGroup: string;
  date: string;
  durationMinutes: number;
  status: SessionStatus;
  resourceId: string;
  resourceTitle: string;
  notes?: string[];
  tags?: ("retomar" | "observar" | "relevante" | "próxima sessão")[];
  savedStatesCount: number;
  patientConnected: boolean;
}

export interface PsychologistProfile {
  name: string;
  crp: string;
  state: string;
  email: string;
  phone: string;
  specialties: string[];
  crpStatus: CRPValidationStatus;
  crpValidationDate: string;
  plan: "monthly" | "quarterly" | "annual";
  planStatus: "active" | "trial" | "expired";
  trialDaysRemaining: number;
  nextRenewalDate: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "info" | "success" | "warning" | "alert";
  read: boolean;
}
