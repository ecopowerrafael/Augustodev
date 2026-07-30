import { BankConfig, SimulationInput, LeadData } from '../types/creditoImobiliario';

export const INITIAL_BANKS: BankConfig[] = [
  {
    id: 'caixa',
    name: 'Caixa Econômica Federal',
    shortName: 'Caixa',
    code: '104',
    logoBg: 'bg-gradient-to-r from-blue-700 to-sky-600',
    textColor: 'text-sky-300',
    brandColor: '#005CA9',
    accentGradient: 'from-blue-600/20 via-sky-500/10 to-transparent',
    annualRate: 8.99,
    minDownPaymentPercent: 20,
    maxLtvPercent: 80,
    minTermMonths: 60,
    maxTermMonths: 420, // 35 anos
    maxAgeAtContractEnd: 80,
    maxIncomeCommitmentPercent: 30,
    monthlyAdminFee: 25.00,
    annualInsurancePercent: 0.032,
    evaluationFee: 3100,
    allowsFgts: true,
    allowsComposition: true,
    active: true,
    displayOrder: 1,
    features: [
      'Menor taxa de juros do mercado',
      'Aceita FGTS na entrada e amortização',
      'Financiamento de até 35 anos',
      'Pausa Amortização em emergências'
    ],
    notes: 'Líder em crédito habitacional no Brasil. Taxas promocionais atreladas à poupança ou SBPE pré-fixado.'
  },
  {
    id: 'itau',
    name: 'Banco Itaú Personnalité',
    shortName: 'Itaú',
    code: '341',
    logoBg: 'bg-gradient-to-r from-amber-600 to-orange-500',
    textColor: 'text-amber-300',
    brandColor: '#EC7000',
    accentGradient: 'from-orange-600/20 via-amber-500/10 to-transparent',
    annualRate: 10.25,
    minDownPaymentPercent: 20,
    maxLtvPercent: 80,
    minTermMonths: 60,
    maxTermMonths: 360, // 30 anos
    maxAgeAtContractEnd: 80,
    maxIncomeCommitmentPercent: 30,
    monthlyAdminFee: 25.00,
    annualInsurancePercent: 0.035,
    evaluationFee: 3300,
    allowsFgts: true,
    allowsComposition: true,
    active: true,
    displayOrder: 2,
    features: [
      'Análise de crédito 100% digital em até 1 hora',
      'Desconto no seguro com débito em conta',
      'Financiamento das custas cartorárias (ITBI)',
      'Acompanhamento via App Itaú Meu Imóvel'
    ],
    notes: 'Agilidade de aprovação e processo jurídico rápido. Permite compor renda com até 3 participantes.'
  },
  {
    id: 'bradesco',
    name: 'Bradesco Financiamentos',
    shortName: 'Bradesco',
    code: '237',
    logoBg: 'bg-gradient-to-r from-red-700 to-rose-600',
    textColor: 'text-rose-300',
    brandColor: '#CC092F',
    accentGradient: 'from-rose-600/20 via-red-500/10 to-transparent',
    annualRate: 10.15,
    minDownPaymentPercent: 20,
    maxLtvPercent: 80,
    minTermMonths: 60,
    maxTermMonths: 360,
    maxAgeAtContractEnd: 80,
    maxIncomeCommitmentPercent: 30,
    monthlyAdminFee: 25.00,
    annualInsurancePercent: 0.034,
    evaluationFee: 3200,
    allowsFgts: true,
    allowsComposition: true,
    active: true,
    displayOrder: 3,
    features: [
      'Inclusão de até 5% do valor em despesas de cartório',
      'Opção de taxa fixa ou atrelada à poupança',
      'Análise prévia sem necessidade de conta aberta',
      'Condições especiais para servidores públicos'
    ],
    notes: 'Excelente aceitação de imóveis usados e comerciais. Atendimento dedicado via correspondente bancário.'
  },
  {
    id: 'santander',
    name: 'Banco Santander Brasil',
    shortName: 'Santander',
    code: '033',
    logoBg: 'bg-gradient-to-r from-red-600 to-red-800',
    textColor: 'text-red-300',
    brandColor: '#EC0000',
    accentGradient: 'from-red-600/20 via-rose-500/10 to-transparent',
    annualRate: 10.49,
    minDownPaymentPercent: 20,
    maxLtvPercent: 80,
    minTermMonths: 60,
    maxTermMonths: 420,
    maxAgeAtContractEnd: 80,
    maxIncomeCommitmentPercent: 35, // Permite até 35% de comprometimento
    monthlyAdminFee: 25.00,
    annualInsurancePercent: 0.036,
    evaluationFee: 3400,
    allowsFgts: true,
    allowsComposition: true,
    active: true,
    displayOrder: 4,
    features: [
      'Maior tolerância de comprometimento da renda (35%)',
      'Prazo estendido até 35 anos',
      'Programa de pontos Esfera em parcelas pagas em dia',
      'Emissão de contrato digital sem filas'
    ],
    notes: 'Aceita composição flexível e possui taxas atrativas para clientes com relacionamento Select.'
  }
];

export const DEFAULT_SIMULATION_INPUT: SimulationInput = {
  property: {
    propertyValue: 500000,
    downPayment: 100000,
    useFgts: true,
    fgtsAmount: 25000,
    propertyType: 'usado',
    usageType: 'residencial',
    city: 'São Paulo',
    state: 'SP',
    hasChosenProperty: true
  },
  financial: {
    monthlyIncome: 12000,
    familyIncome: 12000,
    employmentType: 'clt',
    hasOtherLoans: false,
    otherLoansAmount: 0,
    monthlyExpenses: 4500
  },
  personal: {
    oldestAge: 35,
    maritalStatus: 'casado',
    numberOfApplicants: 2,
    ownsOtherProperty: false,
    hasRestrictions: false,
    bankRelationship: 'itau'
  },
  preferences: {
    desiredTermMonths: 360, // 30 anos
    maxInstallmentBudget: 4000,
    preferredSystem: 'sac',
    priority: 'lower_installment'
  }
};

export const MOCK_INITIAL_LEADS: LeadData[] = [
  {
    id: 'lead-101',
    fullName: 'Roberto Silveira Alencar',
    email: 'roberto.alencar@gmail.com',
    phone: '(11) 98877-6655',
    city: 'São Paulo',
    state: 'SP',
    bestContactTime: 'Manhã (9h às 12h)',
    consentLgpd: true,
    createdAt: '2026-07-29T14:22:00Z',
    status: 'novo',
    notes: 'Interesse imediato em imóvel usado na Zona Sul. Renda familiar CLT combinada.',
    simulationSummary: {
      propertyValue: 650000,
      downPayment: 150000,
      loanAmount: 500000,
      termMonths: 360,
      income: 16000,
      selectedBankId: 'caixa',
      selectedBankName: 'Caixa Econômica Federal',
      preferredSystem: 'SAC',
      estimatedInstallment: 4320
    }
  },
  {
    id: 'lead-102',
    fullName: 'Camila Fernandes Costa',
    email: 'camila.fernandes@techcompany.io',
    phone: '(21) 97123-4567',
    city: 'Rio de Janeiro',
    state: 'RJ',
    bestContactTime: 'Tarde (14h às 18h)',
    consentLgpd: true,
    createdAt: '2026-07-28T18:45:00Z',
    status: 'em_atendimento',
    notes: 'Procura imóvel novo na Barra da Tijuca. Já possui R$ 80 mil de saldo FGTS.',
    simulationSummary: {
      propertyValue: 800000,
      downPayment: 200000,
      loanAmount: 600000,
      termMonths: 420,
      income: 22000,
      selectedBankId: 'itau',
      selectedBankName: 'Banco Itaú Personnalité',
      preferredSystem: 'PRICE',
      estimatedInstallment: 5540
    }
  },
  {
    id: 'lead-103',
    fullName: 'Lucas Mendes & Beatriz Prado',
    email: 'lucas.mendes@consultoria.com.br',
    phone: '(31) 99344-8811',
    city: 'Belo Horizonte',
    state: 'MG',
    bestContactTime: 'Noite (após 18h)',
    consentLgpd: true,
    createdAt: '2026-07-27T10:15:00Z',
    status: 'proposta_enviada',
    notes: 'Composição de renda de casal. Proposta enviada para aprovação do Itaú e Bradesco.',
    simulationSummary: {
      propertyValue: 450000,
      downPayment: 90000,
      loanAmount: 360000,
      termMonths: 360,
      income: 11500,
      selectedBankId: 'bradesco',
      selectedBankName: 'Bradesco Financiamentos',
      preferredSystem: 'SAC',
      estimatedInstallment: 3180
    }
  },
  {
    id: 'lead-104',
    fullName: 'Dr. Fernando Henrique Sampaio',
    email: 'f.sampaio@clinicasampaio.med.br',
    phone: '(41) 98411-2233',
    city: 'Curitiba',
    state: 'PR',
    bestContactTime: 'Qualquer horário',
    consentLgpd: true,
    createdAt: '2026-07-25T11:30:00Z',
    status: 'aprovado',
    notes: 'Crédito pré-aprovado pela Caixa. Agendando vistoria de avaliação do engenheiro.',
    simulationSummary: {
      propertyValue: 1200000,
      downPayment: 300000,
      loanAmount: 900000,
      termMonths: 360,
      income: 38000,
      selectedBankId: 'caixa',
      selectedBankName: 'Caixa Econômica Federal',
      preferredSystem: 'SAC',
      estimatedInstallment: 7850
    }
  }
];

export const MORTGAGE_FAQS = [
  {
    q: 'Qual a diferença fundamental entre a Tabela SAC e a Tabela Price?',
    a: 'No Sistema SAC (Amortização Constante), a quantia abatida do saldo devedor mensalmente é fixa, fazendo com que as parcelas comecem mais altas e diminuam ao longo do tempo. Na Tabela Price, as parcelas permanecem praticamente constantes do início ao fim, pois os juros são mais altos no começo e a amortização cresce com o tempo. O SAC gera um custo total em juros significativamente menor.'
  },
  {
    q: 'Como o FGTS pode ser utilizado no financiamento imobiliário?',
    a: 'O saldo do FGTS pode ser usado de três formas: 1) Como valor de entrada na compra do imóvel residencial; 2) Para amortizar ou quitar o saldo devedor restante; 3) Para reduzir em até 80% o valor das parcelas por um período contínuo de até 12 meses.'
  },
  {
    q: 'Qual é a renda mínima e o limite de comprometimento aceito pelos bancos?',
    a: 'A regra geral regulamentada pelo Banco Central estabelece que a parcela do financiamento imobiliário não pode comprometer mais do que 30% da renda bruta mensal familiar (embora algumas instituições, como o Santander, cheguem a aceitar até 35% dependendo do perfil do cliente).'
  },
  {
    q: 'O que é o CET (Custo Efetivo Total) e por que ele é mais importante que a taxa nominal?',
    a: 'O CET inclui não apenas a taxa de juros anual do contrato, mas também as tarifas administrativas mensais, os seguros obrigatórios (MIP e DFI) e as despesas com avaliação do imóvel. O banco com a menor taxa nominal nem sempre terá o menor CET!'
  }
];
