export type Language = 'pt' | 'en' | 'es' | 'ar';

export type UserRole = 'child' | 'parent' | 'educator' | 'therapist' | 'admin';

export type CognitiveSkill = 
  | 'attention' 
  | 'memory' 
  | 'language' 
  | 'visual_perception' 
  | 'reasoning' 
  | 'emotional_regulation' 
  | 'motor_coordination'
  | 'daily_routine';

export type GameType = 
  | 'matching' 
  | 'memory_game' 
  | 'audio_recognition' 
  | 'emotion_recognition' 
  | 'sequence_completion' 
  | 'communication_board' 
  | 'letter_number_id';

export interface AccessibilitySettings {
  lowStimulusMode: boolean; // Reduces animations, darkens intense colors, simplifies UI
  fontSize: 'normal' | 'large' | 'extra-large';
  contrast: 'standard' | 'high-contrast' | 'soft-contrast';
  speechRate: number; // 0.7 to 1.3
  audioFeedback: boolean;
  backgroundMusic: boolean;
  musicVolume: number;
  unlimitedTime: boolean;
  useRtl: boolean;
}

export interface StudentProfile {
  id: string;
  nickname: string;
  age: number;
  avatar: string;
  preferredLanguage: Language;
  stars: number;
  trophies: number;
  unlockedWorlds: string[];
  cognitiveProgress: Record<CognitiveSkill, number>; // 0 to 100
  recentStreakDays: number;
  dailyUsageMinutes: number;
  sensitivityLevel: 'standard' | 'moderate' | 'high_sensitivity';
  notes?: string;
}

export interface ActivityTemplate {
  id: string;
  title: string;
  gameType: GameType;
  worldId: string;
  cognitiveSkill: CognitiveSkill;
  difficultyLevel: 1 | 2 | 3 | 4 | 5;
  instructionAudioText: string;
  targetAgeMin: number;
  targetAgeMax: number;
  items: {
    id: string;
    label: string;
    imageUrl?: string;
    audioText?: string;
    isCorrect?: boolean;
    matchPairId?: string;
    colorHex?: string;
    emoji?: string;
  }[];
  distractors?: string[];
  rewardPoints: number;
  adaptiveRules: {
    maxFailsBeforeHint: number;
    allowUnlimitedTime: boolean;
    autoCalmDownOnImpulsivity: boolean;
  };
}

export interface ThemeWorld {
  id: string;
  name: string;
  nameEn: string;
  nameEs: string;
  nameAr: string;
  iconName: string;
  mascotName: string;
  description: string;
  colorBg: string;
  colorAccent: string;
  totalActivities: number;
  completedActivities: number;
  isUnlocked: boolean;
  cognitiveFocus: CognitiveSkill;
  featuredGames: GameType[];
}

export interface EducationalVideo {
  id: string;
  title: string;
  description: string;
  category: 'rotina' | 'emocoes' | 'letras' | 'musica' | 'historia';
  durationSeconds: number;
  thumbnailUrl: string;
  videoUrl: string;
  targetSkill: CognitiveSkill;
  language: Language;
}

export interface PerformanceObservation {
  id: string;
  studentId: string;
  date: string;
  authorName: string;
  authorRole: 'Pais' | 'Educador' | 'Terapeuta';
  skillObserved: CognitiveSkill;
  impulsivityIndicator: 'baixa' | 'moderada' | 'frequente';
  responseSpeedMs: number;
  persistenceScore: number; // 0 - 100
  notes: string;
  recommendedNextStep: string;
}

export interface LeadOrUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'parent' | 'educator' | 'therapist' | 'school';
  institutionName?: string;
  numberOfStudents?: number;
  city: string;
  state: string;
  createdAt: string;
}
