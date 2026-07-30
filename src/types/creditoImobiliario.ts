export type PropertyType = 'novo' | 'usado';
export type UsageType = 'residencial' | 'comercial';
export type EmploymentType = 'clt' | 'autonomo' | 'empresario' | 'servidor' | 'aposentado';
export type AmortizationSystem = 'SAC' | 'PRICE';

export interface PropertyData {
  propertyValue: number;
  downPayment: number;
  useFgts: boolean;
  fgtsAmount: number;
  propertyType: PropertyType;
  usageType: UsageType;
  city: string;
  state: string;
  hasChosenProperty: boolean;
}

export interface FinancialData {
  monthlyIncome: number;
  familyIncome: number;
  employmentType: EmploymentType;
  hasOtherLoans: boolean;
  otherLoansAmount: number;
  monthlyExpenses: number;
}

export interface PersonalData {
  oldestAge: number;
  maritalStatus: string;
  numberOfApplicants: number;
  ownsOtherProperty: boolean;
  hasRestrictions: boolean;
  bankRelationship: string;
}

export interface SimulationPreferences {
  desiredTermMonths: number;
  maxInstallmentBudget: number;
  preferredSystem: 'sac' | 'price' | 'both';
  priority: 'lower_installment' | 'lower_total_cost' | 'lower_rate';
}

export interface SimulationInput {
  property: PropertyData;
  financial: FinancialData;
  personal: PersonalData;
  preferences: SimulationPreferences;
}

export interface BankConfig {
  id: string;
  name: string;
  shortName: string;
  code: string;
  logoBg: string;
  textColor: string;
  brandColor: string;
  accentGradient: string;
  annualRate: number; // e.g. 8.99 for 8.99%
  minDownPaymentPercent: number; // e.g. 20 for 20%
  maxLtvPercent: number; // e.g. 80%
  minTermMonths: number;
  maxTermMonths: number;
  maxAgeAtContractEnd: number; // e.g. 80 years
  maxIncomeCommitmentPercent: number; // e.g. 30%
  monthlyAdminFee: number; // e.g. R$ 25.00
  annualInsurancePercent: number; // e.g. 0.035% monthly equivalent
  evaluationFee: number; // e.g. R$ 3100
  allowsFgts: boolean;
  allowsComposition: boolean;
  active: boolean;
  displayOrder: number;
  features: string[];
  notes: string;
}

export interface AmortizationMonth {
  month: number;
  installment: number;
  interest: number;
  amortization: number;
  insuranceAndFee: number;
  remainingBalance: number;
}

export interface BankSimulationResult {
  bank: BankConfig;
  loanAmount: number;
  termMonths: number;
  effectiveAnnualRate: number;
  monthlyInterestRate: number;
  
  // Eligibility
  isEligible: boolean;
  ineligibilityReasons: string[];

  // SAC Calculation
  sac: {
    firstInstallment: number;
    middleInstallment: number;
    lastInstallment: number;
    totalInterest: number;
    totalFees: number;
    totalPaid: number;
    monthlyAmortization: number;
    incomeCommitmentPercent: number;
    schedule: AmortizationMonth[];
  };

  // Price Calculation
  price: {
    monthlyInstallment: number;
    totalInterest: number;
    totalFees: number;
    totalPaid: number;
    incomeCommitmentPercent: number;
    schedule: AmortizationMonth[];
  };

  // Comparison metrics
  sacVsPriceSavings: number; // Total paid Price - Total paid SAC
  highlights: string[];
}

export interface LeadData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  bestContactTime: string;
  consentLgpd: boolean;
  createdAt: string;
  status: 'novo' | 'em_atendimento' | 'proposta_enviada' | 'documentacao' | 'aprovado' | 'arquivado';
  notes?: string;
  simulationSummary: {
    propertyValue: number;
    downPayment: number;
    loanAmount: number;
    termMonths: number;
    income: number;
    selectedBankId?: string;
    selectedBankName?: string;
    preferredSystem: AmortizationSystem;
    estimatedInstallment: number;
  };
}

export interface AdminStats {
  totalSimulations: number;
  totalLeads: number;
  conversionRatePercent: number;
  avgPropertyValue: number;
  avgLoanAmount: number;
  avgIncome: number;
  topBankSelected: string;
  preferredSystemShare: { sac: number; price: number };
}
