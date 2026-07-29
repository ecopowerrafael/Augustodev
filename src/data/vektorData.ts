import { 
  VektorService, 
  VektorSector, 
  VektorBlogPost, 
  VektorTestimonial, 
  VektorFAQ, 
  VektorClientDocument, 
  VektorTicket 
} from '../types/vektor';

export const INITIAL_SERVICES: VektorService[] = [
  {
    id: 'contabilidade-estrategica',
    title: 'Contabilidade Consultiva 360°',
    category: 'contabil',
    iconName: 'BarChart3',
    shortDesc: 'Relatórios gerenciais mensais, balancetes comentados e indicadores para apoio direto na tomada de decisões da diretoria.',
    fullDesc: 'Mais do que cumprir obrigações fiscais, nossa equipe traduz dados contábeis em inteligência de negócios. Analisamos margens de lucro, DRE mensal, fluxo de caixa e ponto de equilíbrio com reuniões trimestrais de alinhamento com seu gestor dedicado.',
    benefits: [
      'Análise mensal de margem bruta, líquida e EBITDA',
      'Demonstrativo do Resultado do Exercício (DRE) gerencial',
      'Atendimento humanizado via WhatsApp com contador sênior',
      'Reuniões de estratégia financeira trimestrais'
    ],
    forWho: 'Pequenas e médias empresas que desejam previsibilidade e crescimento ordenado.',
    deliverables: ['Balanço Patrimonial', 'DRE Gerencial', 'Dashboard de Indicadores', 'Relatório de Solvência'],
    startingPrice: 'R$ 480/mês',
    popular: true
  },
  {
    id: 'planejamento-tributario',
    title: 'Planejamento & Elisão Tributária',
    category: 'tributario',
    iconName: 'ShieldCheck',
    shortDesc: 'Estudo minucioso para enquadramento legal no regime de menor carga tributária (Simples Nacional, Lucro Presumido ou Lucro Real).',
    fullDesc: 'Analisamos todo o histórico fiscal da sua empresa e simulated diferentes regimes fiscais para eliminar pagamentos indevidos de impostos. Aplicamos teses de recuperação de créditos de PIS/COFINS, ICMS e Fator R.',
    benefits: [
      'Redução média de 15% a 35% na carga tributária anual',
      'Análise contínua do Fator R (redução de alíquota no Simples)',
      'Recuperação legal de tributos pagos a maior nos últimos 5 anos',
      'Blindagem contra multas e fiscalizações da Receita Federal'
    ],
    forWho: 'Empresas do Simples ou Presumido com faturamento acima de R$ 30 mil/mês buscando pagar apenas o estritamente devido.',
    deliverables: ['Laudo de Enquadramento Fiscal', 'Simulador Tributário Comparativo', 'Matriz de Riscos Fiscais'],
    startingPrice: 'Sob Consulta',
    popular: true
  },
  {
    id: 'bpo-financeiro',
    title: 'BPO Financeiro (Gestão Terceirizada)',
    category: 'financeiro',
    iconName: 'Wallet',
    shortDesc: 'Assumimos suas rotinas de contas a pagar, contas a receber, conciliação bancária e emissão de notas fiscais com total transparência.',
    fullDesc: 'Elimine o estresse da gestão financeira diária. Nossa equipe especializada opera seu ERP de gestão, efetua conciliação bancária diária, emite NFs para seus clientes e gera relatórios claros de fluxo de caixa projetado.',
    benefits: [
      'Emissão diária/semanal de Notas Fiscais e boletos bancários',
      'Conciliação de cartões de crédito, PIX e contas bancárias',
      'Projeção de fluxo de caixa para 30, 60 e 90 dias',
      'Economia com custos de contratação interna de equipe de contas'
    ],
    forWho: 'Empreendedores e prestadores de serviço que gastam horas com burocracia bancária e querem focar nas vendas.',
    deliverables: ['Relatório de Inadimplência', 'Projeção de Caixa', 'Conciliação Bancária 100% Auditada'],
    startingPrice: 'R$ 890/mês'
  },
  {
    id: 'abertura-e-societario',
    title: 'Abertura & Alteração de Empresa',
    category: 'societario',
    iconName: 'Building2',
    shortDesc: 'Processo 100% digital e acelerado para registro de CNPJ, escolha correta de CNAEs, contrato social e alvarás.',
    fullDesc: 'Abrimos seu CNPJ no formato ideal (SLU, LTDA, S/A) em tempo recorde sem você precisar sair de casa. Cuidamos do enquadramento tributário inicial para você não pagar imposto a mais desde o primeiro dia de vida da empresa.',
    benefits: [
      'Honorários de abertura GRATUITOS ao contratar plano anual',
      'Escolha estratégica dos melhores CNAEs para tributação mínima',
      'Emissão de CNPJ, Inscrição Estadual e Municipal inclusos',
      'Suporte para escolha de endereço fiscal ou virtual'
    ],
    forWho: 'Empreendedores, freelancers, médicos, advogados e startups em fase de formalização.',
    deliverables: ['CNPJ Ativo', 'Contrato Social Registrado', 'Alvará de Funcionamento', 'Inscrição Municipal/Estadual'],
    startingPrice: 'Honorários R$ 0 (com plano anual)'
  },
  {
    id: 'departamento-pessoal',
    title: 'Gestão de Pessoas & Folha de Pagamento',
    category: 'trabalhista',
    iconName: 'Users',
    shortDesc: 'Gestão completa de eSocial, admissões, demissões, férias, benefícios, folha de pagamento e obrigações trabalhistas.',
    fullDesc: 'Garanta total conformidade com a CLT e convenções coletivas de trabalho. Processamos a folha de pagamento dos seus colaboradores com portal do funcionário para recibos e ponto eletrônico.',
    benefits: [
      'Processamento pontual de folha, pró-labore e encargos (INSS, FGTS)',
      'Envio automatizado de obrigações ao eSocial sem inconsistências',
      'Assessoria consultiva em acordos coletivos e rescisões',
      'Cálculo e controle de férias com alertas preventivos'
    ],
    forWho: 'Empresas com equipe CLT ou contratação frequente de prestadores de serviço.',
    deliverables: ['Holerites em PDF', 'Guias FGTS / DARF Previdenciário', 'Relatório do eSocial'],
    startingPrice: 'R$ 290/mês'
  },
  {
    id: 'gestao-fiscal-compliance',
    title: 'Gestão Fiscal & SPED Compliance',
    category: 'tributario',
    iconName: 'FileText',
    shortDesc: 'Apuração rigorosa de tributos federais, estaduais e municipais, validação de XMLs e entrega de obrigações acessórias.',
    fullDesc: 'Auditoria fiscal prévia para evitar inconsistências com o Fisco. Importação automática das NFe e NFSe emitidas, apuração das guias de DAS, PIS/COFINS, IRPJ, CSLL e ICMS-ST.',
    benefits: [
      'Monitoramento diário de pendências fiscais na e-CAC',
      'Emissão de Certidões Negativas de Débitos (CND) atualizadas',
      'Auditoria de notas fiscais de entrada e saída em tempo real',
      'Suporte em fiscalizações ou intimações do Fisco'
    ],
    forWho: 'Comércios, e-commerces, indústrias e empresas de serviços com alto volume de emissão de notas.',
    deliverables: ['Guias de Impostos no Portal', 'Relatório de Compliance Fiscal', 'Arquivos SPED/EFD'],
    startingPrice: 'R$ 390/mês'
  }
];

export const INITIAL_SECTORS: VektorSector[] = [
  {
    id: 'tech-startups',
    name: 'Tecnologia & Software (SaaS / Devs)',
    iconName: 'Cpu',
    tagline: 'Tributação reduzida com Fator R e isenção em exportação de serviços.',
    description: 'Solução contábil especializada para empresas de software, agências de marketing digital, infoprodutores e profissionais de TI que prestam serviço para o exterior.',
    keyPains: ['Tributação alta no Anexo V do Simples', 'Dúvidas em remessas internacionais e retenção de impostos', 'Emissão em lote de NFe de assinaturas'],
    solutions: ['Aplicação sistemática do Fator R para tributação a partir de 6%', 'Isenção legal de PIS/COFINS/ISS em exportação de software', 'Integração via API com plataformas de pagamento (Hotmart, Stripe, Asaas)'],
    taxRegimeRecommendation: 'Simples Nacional com Fator R ou Lucro Presumido',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'saude-medicos',
    name: 'Saúde, Médicos & Clínicas',
    iconName: 'Activity',
    tagline: 'Equiparação hospitalar e redução legal do IRPJ e CSLL.',
    description: 'Contabilidade consultiva para médicos, dentistas, psicólogos e clínicas médicas para mitigar a alta tributação do carnê-leão e otimizar a distribuição de lucros isentos.',
    keyPains: ['Tributação abusiva na pessoa física (até 27,5%)', 'Risco de bi-tributação entre hospital e consultório', 'Falta de controle de distribuição de lucros'],
    solutions: ['Abertura de PJ Médica com enquadramento de equiparação hospitalar (redução de 32% para 8% na base do IRPJ)', 'Emissão de pró-labore mínimo e lucro isento de IR', 'Compliance rigoroso com as normas do CFM e DMED'],
    taxRegimeRecommendation: 'Lucro Presumido com Equiparação Hospitalar ou Simples Nacional',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ecommerce-comercio',
    name: 'E-commerce & Varejo Multi-canal',
    iconName: 'ShoppingBag',
    tagline: 'Gestão de ICMS-ST, DIFAL e conciliação de marketplaces.',
    description: 'Especialistas nas complexidades fiscais de vendas em marketplaces (Mercado Livre, Shopee, Amazon, Magalu) e plataformas próprias como Shopify e Nuvemshop.',
    keyPains: ['Cálculo complexo do Difal e substituição tributária de ICMS', 'Descontrole no estoque físico x saldo fiscal', 'Bitributação em vendas interestaduais'],
    solutions: ['Conciliação de extratos de marketplaces com notas emitidas', 'Classificação NCM correta para evitar pagar ICMS duplicado', 'Apuração acelerada de guias de ICMS-ST'],
    taxRegimeRecommendation: 'Simples Nacional ou Lucro Presumido com benefícios estaduais',
    image: 'https://images.unsplash.com/photo-1556742049-0a67e58832a5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prestadores-servico',
    name: 'Prestadores de Serviço & Consultorias',
    iconName: 'Briefcase',
    tagline: 'Simplicidade, BPO Financeiro e máxima distribuição de lucros isentos.',
    description: 'Desenvolvido para escritórios de engenharia, arquitetura, consultorias de gestão, representantes comerciais e advogados.',
    keyPains: ['Burocracia consome tempo de atendimento a clientes', 'Retenção na fonte de impostos (IRRF, PIS, COFINS, CSLL) descascada', 'Insegurança na emissão de NFSe municipal'],
    solutions: ['BPO Financeiro integrado com emissão e conciliação diária', 'Recuperação de impostos retidos na fonte', 'Organização de balancetes para comprovação de renda patrimonial'],
    taxRegimeRecommendation: 'Simples Nacional (Anexo III) ou Lucro Presumido',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_TESTIMONIALS: VektorTestimonial[] = [
  {
    id: '1',
    clientName: 'Fernando Alencar',
    role: 'CEO & Co-fundador',
    companyName: 'NexTech Systems (SaaS)',
    sector: 'Tecnologia',
    testimonial: 'Migramos nossa contabilidade para a Vektor há 2 anos. Com a aplicação do Fator R e planejamento do Fisco internacional, reduzimos nossa taxa efetiva de impostos de 15,5% para 6%. A equipe é incrivelmente ágil no WhatsApp.',
    metrics: 'Economia de R$ 114.000/ano em impostos',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '2',
    clientName: 'Dra. Patricia Medeiros',
    role: 'Diretora Médica',
    companyName: 'Clínica MedVita',
    sector: 'Saúde',
    testimonial: 'Eu costumava perder finais de semana organizando notas fiscais e temia a malha fina. A Vektor organizou nossa PJ médica com distribuição de lucros isenta e BPO financeiro. Hoje tenho 100% de paz de espírito.',
    metrics: 'Redução de 40% na burocracia semanal',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '3',
    clientName: 'Guilherme Siqueira',
    role: 'Fundador',
    companyName: 'Veloce E-commerce Group',
    sector: 'Varejo Digital',
    testimonial: 'Trocar de contabilidade parecia um pesadelo por causa do nosso volume de notas no Mercado Livre. A Vektor assumiu todo o processo em 5 dias sem pausar nossa operação e ainda identificou tributos pagos a mais no passado.',
    metrics: 'R$ 42.000 recuperados em ICMS-ST',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const INITIAL_CLIENT_DOCUMENTS: VektorClientDocument[] = [
  {
    id: 'doc-1',
    title: 'Guia DAS - Simples Nacional (Ref. 06/2026)',
    type: 'DAS',
    dueDate: '20/07/2026',
    amount: 3240.50,
    status: 'pago',
    code: '0001.2026.06.8821'
  },
  {
    id: 'doc-2',
    title: 'DARF Previdenciário / INSS (Ref. 07/2026)',
    type: 'DARF',
    dueDate: '20/08/2026',
    amount: 1180.00,
    status: 'a_vencer',
    code: '0561.2026.07.1102'
  },
  {
    id: 'doc-3',
    title: 'FGTS Digital Empregados (Ref. 07/2026)',
    type: 'FGTS',
    dueDate: '07/08/2026',
    amount: 940.20,
    status: 'a_vencer',
    code: '8812.2026.07.9940'
  },
  {
    id: 'doc-4',
    title: 'Demonstração do Resultado do Exercício (DRE Q2 2026)',
    type: 'DRE',
    dueDate: '30/06/2026',
    status: 'disponivel',
    code: 'REL-DRE-2026-Q2'
  },
  {
    id: 'doc-5',
    title: 'Balancete Contábil Consolidado (1º Semestre 2026)',
    type: 'Balancete',
    dueDate: '15/07/2026',
    status: 'disponivel',
    code: 'BAL-2026-SEM1'
  }
];

export const INITIAL_TICKETS: VektorTicket[] = [
  {
    id: 'TK-1082',
    subject: 'Solicitação de Pró-Labore Adicional e Comprovante de Rendimentos',
    department: 'DP / Folha',
    date: '28/07/2026',
    status: 'Concluído',
    assignedTo: 'Mariana Costa (Contadora Sênior)'
  },
  {
    id: 'TK-1094',
    subject: 'Inclusão de Novo CNAE Secundário para Treinamentos Online',
    department: 'Societário',
    date: '29/07/2026',
    status: 'Em Atendimento',
    assignedTo: 'Carlos Eduardo (Especialista Fiscals)'
  }
];

export const INITIAL_BLOG_POSTS: VektorBlogPost[] = [
  {
    id: 'fator-r-simples-nacional-2026',
    title: 'Como Utilizar o Fator R para Reduzir os Impostos de 15,5% para 6% no Simples',
    category: 'Planejamento Tributário',
    author: 'Dra. Vanessa Lima — Sócia Fiscals',
    date: '22 Jul 2026',
    readTime: '5 min de leitura',
    summary: 'Entenda a regra matemática do eSocial que permite empresas de TI, consultoria e saúde migrarem do Anexo V para o Anexo III de forma 100% legal.',
    content: 'O Fator R é um mecanismo previsto na Lei Complementar 123/2006. Quando a folha de pagamento de uma empresa de serviços atinge pelo menos 28% do seu faturamento bruto acumulado nos últimos 12 meses, ela passa a ser tributada pelo Anexo III (alíquota inicial de 6%) em vez do Anexo V (alíquota inicial de 15,5%). Na Vektor, calculamos e monitoramos esse índice mensalmente para garantir que o cliente mantenha a menor alíquota continuamente.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'trocar-de-contador-guia-passo-a-passo',
    title: 'Trocar de Contabilidade em 2026: O Guia Definitivo Sem Interrupção das Operações',
    category: 'Abertura de Empresa',
    author: 'Rodrigo Fontes — Head de Onboarding',
    date: '18 Jul 2026',
    readTime: '4 min de leitura',
    summary: 'Aprenda como migrar de contador sem burocracia, sem pagar multas rescisórias indevidas e com total transferência segura de arquivos contábeis.',
    content: 'Muitos empresários permanecem com uma contabilidade ineficiente por receio da transição. No entanto, pela legislação do Conselho Federal de Contabilidade (CFC), a migração é um direito do cliente e o escritório antigo é obrigado a fornecer todos os livros contábeis e senhas em até 30 dias. Na Vektor, realizamos a migração assistida sem custo adicional.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bpo-financeiro-vs-contratar-interno',
    title: 'BPO Financeiro vs. Contratar Assistente Financeiro Interno: Comparativo de Custos',
    category: 'BPO Financeiro',
    author: 'Felipe Santana — Gestor de BPO',
    date: '10 Jul 2026',
    readTime: '6 min de leitura',
    summary: 'Colocamos na ponta do lápis os custos de CLT, encargos, sistemas de gestão e treinamento de um funcionário interno versus a terceirização especializada.',
    content: 'Contratar um assistente financeiro júnior custa em média R$ 2.800 de salário + R$ 1.900 de encargos e benefícios = R$ 4.700/mês. Com o BPO Financeiro da Vektor, sua empresa conta com uma equipe inteira de especialistas, softwares de ponta e auditoria dupla a partir de R$ 890/mês, gerando economia superior a 70%.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_FAQS: VektorFAQ[] = [
  {
    id: 'faq-1',
    question: 'Como funciona o processo de troca de contabilidade para a Vektor?',
    answer: 'O processo é extremamente simples e 100% conduzido pela nossa equipe de onboarding. Nós entramos em contato com o seu contador atual, solicitamos a transferência de acervo contábil e senhas de acesso aos portais da prefeitura/estado, sem que você precise se preocupar com atritos ou burocracia.',
    category: 'Troca de Contador'
  },
  {
    id: 'faq-2',
    question: 'A Vektor atende empresas de qualquer cidade do Brasil?',
    answer: 'Sim! Atendemos empresas de todo o país através de nossa estrutura de Contabilidade Digital Consultiva. Nossas integrações com prefeituras e secretarias de fazenda estaduais permitem atendimento nacional ágil via WhatsApp, e-mail e videochamadas presenciais com seu gestor dedicado.',
    category: 'Geral'
  },
  {
    id: 'faq-3',
    question: 'Vocês fazem a abertura de empresa gratuitamente?',
    answer: 'Sim! Nosso serviço de assessoria de abertura de empresa e emissão do CNPJ tem honorários zerados quando você assina um de nossos planos de contabilidade mensal no contrato anual. O empresário arca apenas com as taxas públicas obrigatórias da Junta Comercial e alvarás do seu município.',
    category: 'Abertura'
  },
  {
    id: 'faq-4',
    question: 'Qual a diferença entre a contabilidade online tradicional e a Contabilidade Consultiva da Vektor?',
    answer: 'A contabilidade online comum limita-se a disponibilizar uma plataforma para você mesmo digitar seus dados e emitir suas próprias guias sem nenhum suporte estratégico. A Vektor oferece Contabilidade Consultiva de Verdade: você conta com um contador sênior dedicado, planejamento tributário ativo para reduzir impostos e relatórios gerenciais que ajudam sua empresa a lucrar mais.',
    category: 'Geral'
  },
  {
    id: 'faq-5',
    question: 'O que está incluso na mensalidade da Vektor Contabilidade?',
    answer: 'Estão inclusos: apuração de todos os impostos municipais, estaduais e federais; escrituração contábil e fiscal completa; folha de pagamento do pró-labore dos sócios e colaboradores; emissão de balancetes e DRE; certidões negativas; atendimento diário por WhatsApp e reuniões de alinhamento estratégico.',
    category: 'Planos'
  }
];
