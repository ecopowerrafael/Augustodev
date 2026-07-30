import { 
  BankConfig, 
  SimulationInput, 
  BankSimulationResult, 
  AmortizationMonth 
} from '../types/creditoImobiliario';

/**
 * Format currency in BRL (R$)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value);
};

/**
 * Format currency with exact decimals for installments
 */
export const formatCurrencyExact = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Format percentage
 */
export const formatPercent = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
};

/**
 * Calculates SAC (Sistema de Amortização Constante) Schedule
 */
export function calculateSacSchedule(
  loanAmount: number,
  termMonths: number,
  monthlyInterestRate: number,
  monthlyAdminFee: number,
  monthlyInsurancePercent: number
): {
  firstInstallment: number;
  middleInstallment: number;
  lastInstallment: number;
  totalInterest: number;
  totalFees: number;
  totalPaid: number;
  monthlyAmortization: number;
  schedule: AmortizationMonth[];
} {
  const fixedAmortization = loanAmount / termMonths;
  let remainingBalance = loanAmount;
  let totalInterest = 0;
  let totalFees = 0;
  const schedule: AmortizationMonth[] = [];

  const insuranceRate = monthlyInsurancePercent / 100;

  for (let month = 1; month <= termMonths; month++) {
    const interest = remainingBalance * monthlyInterestRate;
    const insuranceAndFee = (remainingBalance * insuranceRate) + monthlyAdminFee;
    const installment = fixedAmortization + interest + insuranceAndFee;
    
    totalInterest += interest;
    totalFees += insuranceAndFee;
    remainingBalance = Math.max(0, remainingBalance - fixedAmortization);

    schedule.push({
      month,
      installment,
      interest,
      amortization: fixedAmortization,
      insuranceAndFee,
      remainingBalance
    });
  }

  const firstInstallment = schedule[0]?.installment || 0;
  const middleIndex = Math.floor(termMonths / 2);
  const middleInstallment = schedule[middleIndex]?.installment || 0;
  const lastInstallment = schedule[termMonths - 1]?.installment || 0;
  const totalPaid = loanAmount + totalInterest + totalFees;

  return {
    firstInstallment,
    middleInstallment,
    lastInstallment,
    totalInterest,
    totalFees,
    totalPaid,
    monthlyAmortization: fixedAmortization,
    schedule
  };
}

/**
 * Calculates Price (Tabela Price) Schedule
 */
export function calculatePriceSchedule(
  loanAmount: number,
  termMonths: number,
  monthlyInterestRate: number,
  monthlyAdminFee: number,
  monthlyInsurancePercent: number
): {
  monthlyInstallment: number;
  totalInterest: number;
  totalFees: number;
  totalPaid: number;
  schedule: AmortizationMonth[];
} {
  const i = monthlyInterestRate;
  const n = termMonths;
  
  // Fixed Price Amortization + Interest payment PMT
  let pmtPAndI = 0;
  if (i > 0) {
    const factor = Math.pow(1 + i, n);
    pmtPAndI = loanAmount * ((i * factor) / (factor - 1));
  } else {
    pmtPAndI = loanAmount / n;
  }

  let remainingBalance = loanAmount;
  let totalInterest = 0;
  let totalFees = 0;
  const schedule: AmortizationMonth[] = [];
  const insuranceRate = monthlyInsurancePercent / 100;

  for (let month = 1; month <= termMonths; month++) {
    const interest = remainingBalance * i;
    const amortization = pmtPAndI - interest;
    const insuranceAndFee = (remainingBalance * insuranceRate) + monthlyAdminFee;
    const installment = pmtPAndI + insuranceAndFee;

    totalInterest += interest;
    totalFees += insuranceAndFee;
    remainingBalance = Math.max(0, remainingBalance - amortization);

    schedule.push({
      month,
      installment,
      interest,
      amortization,
      insuranceAndFee,
      remainingBalance
    });
  }

  const monthlyInstallment = schedule[0]?.installment || pmtPAndI;
  const totalPaid = loanAmount + totalInterest + totalFees;

  return {
    monthlyInstallment,
    totalInterest,
    totalFees,
    totalPaid,
    schedule
  };
}

/**
 * Evaluates a single bank simulation against input conditions
 */
export function simulateBank(
  bank: BankConfig,
  input: SimulationInput
): BankSimulationResult {
  const propertyValue = input.property.propertyValue;
  const downPayment = input.property.downPayment;
  const loanAmount = propertyValue - downPayment;
  const termMonths = Math.min(input.preferences.desiredTermMonths, bank.maxTermMonths);
  
  const monthlyIncome = input.financial.familyIncome || input.financial.monthlyIncome;
  const oldestAge = input.personal.oldestAge;

  // Convert annual nominal/effective rate to monthly
  const annualRatePercent = bank.annualRate;
  // Compound monthly rate equivalent: (1 + r_a)^(1/12) - 1
  const monthlyInterestRate = Math.pow(1 + annualRatePercent / 100, 1 / 12) - 1;

  const ineligibilityReasons: string[] = [];

  // Check 1: Minimum down payment
  const requiredMinDownPayment = propertyValue * (bank.minDownPaymentPercent / 100);
  if (downPayment < requiredMinDownPayment) {
    ineligibilityReasons.push(
      `Entrada de ${formatCurrency(downPayment)} é menor que o mínimo exigido (${bank.minDownPaymentPercent}% = ${formatCurrency(requiredMinDownPayment)}).`
    );
  }

  // Check 2: Max age at contract end
  const contractEndAge = oldestAge + (termMonths / 12);
  if (contractEndAge > bank.maxAgeAtContractEnd) {
    ineligibilityReasons.push(
      `Idade ao final do contrato (${Math.round(contractEndAge)} anos) excede o limite máximo permitido pelo banco (${bank.maxAgeAtContractEnd} anos).`
    );
  }

  // Calculate SAC
  const sacResult = calculateSacSchedule(
    loanAmount,
    termMonths,
    monthlyInterestRate,
    bank.monthlyAdminFee,
    bank.annualInsurancePercent
  );

  // Calculate Price
  const priceResult = calculatePriceSchedule(
    loanAmount,
    termMonths,
    monthlyInterestRate,
    bank.monthlyAdminFee,
    bank.annualInsurancePercent
  );

  // Income Commitment
  const sacIncomeCommitment = monthlyIncome > 0 ? (sacResult.firstInstallment / monthlyIncome) * 100 : 0;
  const priceIncomeCommitment = monthlyIncome > 0 ? (priceResult.monthlyInstallment / monthlyIncome) * 100 : 0;

  // Check 3: Income Commitment Limit
  if (sacIncomeCommitment > bank.maxIncomeCommitmentPercent && priceIncomeCommitment > bank.maxIncomeCommitmentPercent) {
    ineligibilityReasons.push(
      `Comprometimento da renda (${sacIncomeCommitment.toFixed(1)}%) excede o limite do banco (${bank.maxIncomeCommitmentPercent}%). Renda necessária aproximada: ${formatCurrency((sacResult.firstInstallment / (bank.maxIncomeCommitmentPercent / 100)))}.`
    );
  }

  // Check 4: Property/Usage type rules
  if (input.property.usageType === 'comercial' && bank.minDownPaymentPercent < 30) {
    // Slight adjustment for commercial properties
  }

  const isEligible = ineligibilityReasons.length === 0;

  return {
    bank,
    loanAmount,
    termMonths,
    effectiveAnnualRate: annualRatePercent,
    monthlyInterestRate,
    isEligible,
    ineligibilityReasons,
    sac: {
      ...sacResult,
      incomeCommitmentPercent: sacIncomeCommitment
    },
    price: {
      ...priceResult,
      incomeCommitmentPercent: priceIncomeCommitment
    },
    sacVsPriceSavings: priceResult.totalPaid - sacResult.totalPaid,
    highlights: []
  };
}

/**
 * Runs simulations across all active banks and attaches automated highlight badges
 */
export function runMultiBankSimulation(
  banks: BankConfig[],
  input: SimulationInput
): BankSimulationResult[] {
  const activeBanks = banks.filter(b => b.active).sort((a, b) => a.displayOrder - b.displayOrder);
  const results = activeBanks.map(b => simulateBank(b, input));

  const eligibleResults = results.filter(r => r.isEligible);
  const targetResults = eligibleResults.length > 0 ? eligibleResults : results;

  if (targetResults.length === 0) return results;

  // Find minimums for badges
  let minFirstInstallment = Infinity;
  let minTotalCost = Infinity;
  let minRate = Infinity;
  let minInterest = Infinity;

  targetResults.forEach(r => {
    if (r.sac.firstInstallment < minFirstInstallment) minFirstInstallment = r.sac.firstInstallment;
    if (r.sac.totalPaid < minTotalCost) minTotalCost = r.sac.totalPaid;
    if (r.bank.annualRate < minRate) minRate = r.bank.annualRate;
    if (r.sac.totalInterest < minInterest) minInterest = r.sac.totalInterest;
  });

  // Assign highlights
  results.forEach(r => {
    r.highlights = [];
    if (r.isEligible) {
      if (Math.abs(r.sac.firstInstallment - minFirstInstallment) < 1) {
        r.highlights.push('Menor Parcela Inicial');
      }
      if (Math.abs(r.bank.annualRate - minRate) < 0.01) {
        r.highlights.push('Menor Taxa Estimada');
      }
      if (Math.abs(r.sac.totalPaid - minTotalCost) < 10) {
        r.highlights.push('Menor Custo Total');
      }
      if (r.sac.incomeCommitmentPercent <= 25 && r.sac.incomeCommitmentPercent > 0) {
        r.highlights.push('Mais Compatível com Renda');
      }
    }
  });

  return results;
}
