export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "admin" | "supervisor" | "technician";
  phone: string;
  region: string;
  avatar: string;
  assignedSites: string[];
  inspectionsCount?: number;
  onTimeRate?: string;
  openNCsCount?: number;
  avgTimeMinutes?: number;
}

export interface Site {
  id: string;
  code: string;
  name: string;
  client: string;
  city: string;
  state: string;
  address: string;
  coordinates: string;
  responsibleName: string;
  responsiblePhone: string;
  responsibleEmail: string;
  accessHours: string;
  equipmentsCount: number;
  pendingInspectionsCount: number;
  image: string;
  safetyGuidelines?: string;
}

export interface Equipment {
  id: string;
  tag: string; // e.g. GMG-003
  name: string;
  siteId: string;
  siteName: string;
  manufacturer: string; // Stemac, Cummins, Caterpillar
  model: string;
  powerKVA: number;
  fuelType: "Diesel" | "Gás" | "Bicombustível";
  voltage: string; // 380/220 V
  frequency: string; // 60 Hz
  year: number;
  serialNumber: string;
  status: "Operacional" | "Atenção" | "Em Manutenção" | "Indisponível";
  lastInspectionDate: string;
  nextInspectionDate: string;
  hourmeter: number;
  tankCapacityLiters: number;
  starterType: string;
  image: string;
  qrCodeData: string;
}

export interface ChecklistItem {
  id: string;
  code: string; // MOT-04
  category: string;
  title: string;
  guideline: string;
  status: "OK" | "NOK" | "N/A" | "Pendente";
  observation?: string;
  photos: string[];
  measurementValue?: string;
  measurementUnit?: string;
  isCritical?: boolean;
}

export interface NonConformity {
  id: string;
  code: string; // NC-2026-0084
  inspectionId: string;
  siteName: string;
  equipmentTag: string;
  category: string;
  itemTitle: string;
  description: string;
  criticality: "Baixa" | "Média" | "Alta" | "Crítica";
  recommendedAction: string;
  suggestedDeadline: string;
  status: "Aberta" | "Em análise" | "Correção programada" | "Aguardando evidência" | "Resolvida" | "Cancelada";
  assignedTo?: string;
  createdAt: string;
  photos: string[];
  timeline: {
    date: string;
    action: string;
    author: string;
  }[];
}

export interface Inspection {
  id: string; // VIS-2026-0148
  siteId: string;
  siteName: string;
  siteCity: string;
  equipmentId: string;
  equipmentTag: string;
  equipmentName: string;
  equipmentSpecs: string;
  technicianName: string;
  technicianId: string;
  type: "Preventiva mensal" | "Trimestral completa" | "Pós-manutenção" | "Emergencial";
  date: string;
  startTime: string;
  endTime?: string;
  durationMinutes?: number;
  status: "Programada" | "Em andamento" | "Concluída" | "Pendente" | "Cancelada";
  resultSummary?: {
    okCount: number;
    nokCount: number;
    naCount: number;
    total: number;
  };
  localResponsibleName: string;
  localResponsiblePhone: string;
  localResponsibleMatricula: string;
  equipmentCondition: "Operacional" | "Com restrição" | "Parado";
  isOperatingDuringCheck: boolean;
  initialObservations?: string;
  generalObservations?: string;
  checklists: ChecklistItem[];
  nonConformities: NonConformity[];
  photos: {
    id: string;
    url: string;
    caption: string;
    timestamp: string;
  }[];
  measurements: {
    hourmeter: string;
    voltageRS: string;
    voltageST: string;
    voltageRT: string;
    frequency: string;
    batteryVoltage: string;
    oilPressureBar: string;
    engineTempC: string;
    fuelLevelPercent: string;
  };
  signatures: {
    technicianSigned: boolean;
    technicianSignatureUrl?: string;
    localResponsibleSigned: boolean;
    localResponsibleSignatureUrl?: string;
    termAccepted: boolean;
  };
  synced: boolean;
}

export interface ChecklistTemplate {
  id: string;
  name: string;
  description: string;
  itemsCount: number;
  categoriesCount: number;
  status: "Ativo" | "Inativo";
}

// MOCK DATA SETS
export const INITIAL_USERS: UserProfile[] = [
  {
    id: "usr-01",
    name: "Carlos Henrique",
    email: "tecnico@gmgcheck.com.br",
    role: "technician",
    phone: "(15) 99762-3344",
    region: "Sorocaba & Região / SP",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    assignedSites: ["site-01", "site-02", "site-03", "site-04"],
    inspectionsCount: 42,
    onTimeRate: "96%",
    openNCsCount: 5,
    avgTimeMinutes: 39
  },
  {
    id: "usr-02",
    name: "Juliana Alves",
    email: "supervisor@gmgcheck.com.br",
    role: "supervisor",
    phone: "(11) 98823-1100",
    region: "Estado de São Paulo",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    assignedSites: ["site-01", "site-02", "site-03", "site-04"],
    inspectionsCount: 128,
    onTimeRate: "98%",
    openNCsCount: 12,
    avgTimeMinutes: 41
  },
  {
    id: "usr-03",
    name: "Ricardo Martins",
    email: "admin@gmgcheck.com.br",
    role: "admin",
    phone: "(11) 97112-9900",
    region: "Nacional / Brasil",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    assignedSites: ["*"],
    inspectionsCount: 310,
    onTimeRate: "99%",
    openNCsCount: 38,
    avgTimeMinutes: 42
  },
  {
    id: "usr-04",
    name: "Fernanda Lima",
    email: "fernanda.lima@gmgcheck.com.br",
    role: "technician",
    phone: "(19) 98122-4455",
    region: "Campinas & Região / SP",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    assignedSites: ["site-02", "site-03"],
    inspectionsCount: 38,
    onTimeRate: "94%",
    openNCsCount: 3,
    avgTimeMinutes: 37
  }
];

export const INITIAL_SITES: Site[] = [
  {
    id: "site-01",
    code: "SITE-001",
    name: "Data Center Alpha",
    client: "Alpha Tecnologia Ltda.",
    city: "Sorocaba",
    state: "SP",
    address: "Avenida das Indústrias, 950 — Bairro Industrial",
    coordinates: "-23.5015, -47.4526",
    responsibleName: "Marcos Oliveira",
    responsiblePhone: "(15) 99823-1100",
    responsibleEmail: "m.oliveira@alphatac.com.br",
    accessHours: "24/7 (Portaria Principal)",
    equipmentsCount: 3,
    pendingInspectionsCount: 1,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    safetyGuidelines: "Obrigatório o uso de capacete, óculos de proteção e bota de segurança. Apresentar crachá na entrada."
  },
  {
    id: "site-02",
    code: "SITE-002",
    name: "Hospital Santa Helena",
    client: "Rede de Saúde Santa Helena",
    city: "Campinas",
    state: "SP",
    address: "Rua Barão de Jaguara, 1420 — Centro",
    coordinates: "-22.9056, -47.0608",
    responsibleName: "Patrícia Santos",
    responsiblePhone: "(19) 98711-2233",
    responsibleEmail: "patricia.santos@hospitalsantahelena.com.br",
    accessHours: "07:00 às 18:00 (Subsolo Bloco B)",
    equipmentsCount: 2,
    pendingInspectionsCount: 0,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80",
    safetyGuidelines: "Proibido ruídos excessivos. Protetor auricular obrigatório no recinto do gerador."
  },
  {
    id: "site-03",
    code: "SITE-003",
    name: "Centro Logístico Norte",
    client: "LogiPark Soluções Logísticas",
    city: "Jundiaí",
    state: "SP",
    address: "Rodovia Anhanguera, km 62 — Distrito Industrial",
    coordinates: "-23.1857, -46.8892",
    responsibleName: "Renato Alves",
    responsiblePhone: "(11) 99123-5566",
    responsibleEmail: "renato.alves@logipark.com.br",
    accessHours: "06:00 às 22:00 (Docas 12 e 14)",
    equipmentsCount: 4,
    pendingInspectionsCount: 2,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
    safetyGuidelines: "Atenção ao tráfego intenso de empilhadeiras. Colete refletivo e calçado com biqueira obrigatórios."
  },
  {
    id: "site-04",
    code: "SITE-004",
    name: "Supermercado Central",
    client: "Grupo Varejo Central",
    city: "Sorocaba",
    state: "SP",
    address: "Rua XV de Novembro, 880 — Centro",
    coordinates: "-23.5000, -47.4580",
    responsibleName: "Cláudio Mendonça",
    responsiblePhone: "(15) 98112-9090",
    responsibleEmail: "claudio@supercentral.com.br",
    accessHours: "08:00 às 17:00 (Área Técnica Externa)",
    equipmentsCount: 1,
    pendingInspectionsCount: 1,
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80",
    safetyGuidelines: "Subsolo de máquinas com ventilação forçada. Verificar chave geral antes de ligar."
  }
];

export const INITIAL_EQUIPMENTS: Equipment[] = [
  {
    id: "eq-003",
    tag: "GMG-003",
    name: "Gerador Principal — Bloco A",
    siteId: "site-01",
    siteName: "Data Center Alpha",
    manufacturer: "Stemac",
    model: "S500",
    powerKVA: 500,
    fuelType: "Diesel",
    voltage: "380/220 V",
    frequency: "60 Hz",
    year: 2021,
    serialNumber: "STM-2021-98421",
    status: "Operacional",
    lastInspectionDate: "24/06/2026",
    nextInspectionDate: "24/07/2026",
    hourmeter: 1842.7,
    tankCapacityLiters: 800,
    starterType: "Elétrica Automática 24V",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    qrCodeData: "https://gmgcheck.com.br/equipamento/GMG-003"
  },
  {
    id: "eq-001",
    tag: "GMG-001",
    name: "Gerador UTI & Emergência",
    siteId: "site-02",
    siteName: "Hospital Santa Helena",
    manufacturer: "Cummins",
    model: "C450D5",
    powerKVA: 450,
    fuelType: "Diesel",
    voltage: "380/220 V",
    frequency: "60 Hz",
    year: 2020,
    serialNumber: "CUM-2020-00192",
    status: "Atenção",
    lastInspectionDate: "24/07/2026",
    nextInspectionDate: "24/08/2026",
    hourmeter: 3245.1,
    tankCapacityLiters: 1000,
    starterType: "Dupla Automática Redundante",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
    qrCodeData: "https://gmgcheck.com.br/equipamento/GMG-001"
  },
  {
    id: "eq-007",
    tag: "GMG-007",
    name: "Gerador Galpão Logístico 1",
    siteId: "site-03",
    siteName: "Centro Logístico Norte",
    manufacturer: "Caterpillar",
    model: "C18",
    powerKVA: 600,
    fuelType: "Diesel",
    voltage: "380/220 V",
    frequency: "60 Hz",
    year: 2019,
    serialNumber: "CAT-C18-8832",
    status: "Operacional",
    lastInspectionDate: "23/07/2026",
    nextInspectionDate: "23/08/2026",
    hourmeter: 4118.5,
    tankCapacityLiters: 1200,
    starterType: "Elétrica 24V",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    qrCodeData: "https://gmgcheck.com.br/equipamento/GMG-007"
  },
  {
    id: "eq-012",
    tag: "GMG-012",
    name: "Gerador Frio & Caixas",
    siteId: "site-04",
    siteName: "Supermercado Central",
    manufacturer: "MWM / Maquigeral",
    model: "MQ-250",
    powerKVA: 250,
    fuelType: "Diesel",
    voltage: "380/220 V",
    frequency: "60 Hz",
    year: 2022,
    serialNumber: "MQG-2022-1049",
    status: "Operacional",
    lastInspectionDate: "23/06/2026",
    nextInspectionDate: "24/07/2026",
    hourmeter: 890.3,
    tankCapacityLiters: 400,
    starterType: "Elétrica 12V",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    qrCodeData: "https://gmgcheck.com.br/equipamento/GMG-012"
  }
];

export const DEFAULT_CHECKLIST_TEMPLATE: ChecklistItem[] = [
  // 1. Identificação e acesso
  {
    id: "chk-01",
    code: "IDE-01",
    category: "1. Identificação e acesso",
    title: "Identificação patrimonial visível no GMG",
    guideline: "Verificar se a placa ou etiqueta com tag do equipamento está limpa e legível.",
    status: "OK",
    photos: []
  },
  {
    id: "chk-02",
    code: "IDE-02",
    category: "1. Identificação e acesso",
    title: "Área de acesso ao gerador desobstruída",
    guideline: "Garantir espaço livre de 1 metro no entorno do grupo motor-gerador.",
    status: "OK",
    photos: []
  },
  {
    id: "chk-03",
    code: "IDE-03",
    category: "1. Identificação e acesso",
    title: "Iluminação do ambiente e de emergência adequada",
    guideline: "Verificar luminárias no abrigo e lâmpada de emergência operando.",
    status: "OK",
    photos: []
  },
  // 2. Condições gerais
  {
    id: "chk-04",
    code: "CND-01",
    category: "2. Condições gerais",
    title: "Equipamento sem vazamentos aparentes de óleo ou água",
    guideline: "Inspecionar a bacia de contenção, piso do abrigo e carcaça do motor.",
    status: "OK",
    photos: []
  },
  {
    id: "chk-05",
    code: "CND-02",
    category: "2. Condições gerais",
    title: "Ausência de ruídos e vibrações anormais na partida",
    guideline: "Acompanhar funcionamento durante o teste sem carga.",
    status: "OK",
    photos: []
  },
  {
    id: "chk-06",
    code: "CND-03",
    category: "2. Condições gerais",
    title: "Coxins e fixações mecânicas em boas condições",
    guideline: "Verificar ausência de trincas ou folgas nos coxins de borracha.",
    status: "OK",
    photos: []
  },
  // 3. Motor
  {
    id: "chk-07",
    code: "MOT-01",
    category: "3. Motor",
    title: "Nível de óleo lubrificante do motor",
    guideline: "O nível deverá estar dentro da faixa indicada na vareta de medição.",
    status: "OK",
    observation: "Nível dentro da faixa recomendada e sem sinais de contaminação.",
    measurementValue: "Normal (3/4)",
    photos: ["https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80"]
  },
  {
    id: "chk-08",
    code: "MOT-02",
    category: "3. Motor",
    title: "Correias de acionamento do alternador e bomba d'água",
    guideline: "Verificar tensão, ausência de desfiamentos ou ressecamento.",
    status: "OK",
    photos: []
  },
  {
    id: "chk-09",
    code: "MOT-03",
    category: "3. Motor",
    title: "Filtro de ar limpo e desobstruído",
    guideline: "Inspecionar indicador de restrição e vedação do elemento filtrante.",
    status: "OK",
    photos: []
  },
  // 4. Combustível
  {
    id: "chk-10",
    code: "CMB-01",
    category: "4. Sistema de combustível",
    title: "Nível do reservatório de combustível (mínimo 50%)",
    guideline: "Verificar marcador mecânico e eletrônico no painel.",
    status: "OK",
    measurementValue: "74%",
    photos: ["https://images.unsplash.com/photo-1527016021513-b09758b777bd?auto=format&fit=crop&w=400&q=80"]
  },
  {
    id: "chk-11",
    code: "CMB-02",
    category: "4. Sistema de combustível",
    title: "Tanque diário e mangueiras sem vazamento ou ressecamento",
    guideline: "Verificar abraçadeiras e válvulas de retenção.",
    status: "OK",
    photos: []
  },
  // 5. Arrefecimento
  {
    id: "chk-12",
    code: "ARF-01",
    category: "5. Sistema de arrefecimento",
    title: "Nível do líquido de arrefecimento no radiador",
    guideline: "Verificar através do visor de nível com o motor frio.",
    status: "OK",
    photos: []
  },
  {
    id: "chk-13",
    code: "ARF-02",
    category: "5. Sistema de arrefecimento",
    title: "Colméia do radiador limpa e sem obstruções superficiais",
    guideline: "Inspecionar acúmulo de poeira ou insetos nas aletas de alumínio.",
    status: "OK",
    photos: []
  },
  // 6. Sistema elétrico e Baterias
  {
    id: "chk-14",
    code: "BAT-01",
    category: "6. Baterias de partida",
    title: "Terminais da bateria limpos e sem oxidação",
    guideline: "Verificar aperto, presença de azinhavre e aplicação de protetor.",
    status: "NOK",
    isCritical: true,
    observation: "Foi identificada oxidação acentuada no terminal positivo da bateria de partida.",
    photos: ["https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=400&q=80"]
  },
  {
    id: "chk-15",
    code: "BAT-02",
    category: "6. Baterias de partida",
    title: "Tensão das baterias em flutuação (Carregador ligado)",
    guideline: "Tensão esperada entre 25,0V e 27,2V para banco de 24V.",
    status: "OK",
    measurementValue: "25.4 V",
    photos: []
  },
  // 7. Painel de comando
  {
    id: "chk-16",
    code: "PNL-01",
    category: "7. Painel de comando",
    title: "Modo de operação selecionado em AUTOMÁTICO",
    guideline: "Conferir chave comutadora no painel DeepSea / USCA em modo AUTO.",
    status: "OK",
    photos: ["https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80"]
  },
  {
    id: "chk-17",
    code: "PNL-02",
    category: "7. Painel de comando",
    title: "Ausência de alarmes ou falhas ativas na IHM do controlador",
    guideline: "Verificar visor da USCA sem códigos de erro ativados.",
    status: "OK",
    photos: []
  },
  // 8. Teste de funcionamento
  {
    id: "chk-18",
    code: "TST-01",
    category: "8. Teste de funcionamento",
    title: "Partida manual/automática em teste sem carga efetuada com sucesso",
    guideline: "Executar teste de 10 minutos. Observar partida rápida em até 8s.",
    status: "OK",
    measurementValue: "OK (5.2s)",
    photos: []
  },
  {
    id: "chk-19",
    code: "TST-02",
    category: "8. Teste de funcionamento",
    title: "Frequência nominal estabilizada em 60.0 Hz (± 0.5 Hz)",
    guideline: "Registrar valor indicado no instrumento multimedidor.",
    status: "OK",
    measurementValue: "60.1 Hz",
    photos: []
  },
  {
    id: "chk-20",
    code: "TST-03",
    category: "8. Teste de funcionamento",
    title: "Tensão trifásica entre fases estável em 380 V (± 5%)",
    guideline: "Conferir tensões RS, ST e TR.",
    status: "OK",
    measurementValue: "381 V / 379 V / 380 V",
    photos: []
  },
  {
    id: "chk-21",
    code: "TST-04",
    category: "8. Teste de funcionamento",
    title: "Pressão de óleo lubrificante com motor aquecido",
    guideline: "Pressão mínima recomendada de 3.5 bar em regime.",
    status: "OK",
    measurementValue: "4.8 bar",
    photos: []
  },
  {
    id: "chk-22",
    code: "TST-05",
    category: "8. Teste de funcionamento",
    title: "Temperatura da água do motor durante o teste",
    guideline: "Temperatura de trabalho entre 75°C e 92°C.",
    status: "OK",
    measurementValue: "82 °C",
    photos: []
  },
  // 9. Segurança e Sinalização
  {
    id: "chk-23",
    code: "SEG-01",
    category: "9. Segurança e sinalização",
    title: "Extintor de incêndio CO2/PQS dentro do prazo de validade",
    guideline: "Verificar manômetro na faixa verde e lacre intacto.",
    status: "NOK",
    isCritical: false,
    observation: "Extintor de CO2 com vencimento da carga no próximo mês. Recomendada troca preventiva.",
    photos: []
  },
  {
    id: "chk-24",
    code: "SEG-02",
    category: "9. Segurança e sinalização",
    title: "Placas de alerta elétrico e aviso de partida automática fixadas",
    guideline: "Sinalização de Perigo 380V e Partida Automática visíveis na porta.",
    status: "OK",
    photos: []
  },
  // 10. Limpeza e organização
  {
    id: "chk-25",
    code: "LMP-01",
    category: "10. Limpeza e organização",
    title: "Abrigo limpo, sem estopas sujas ou materiais inflamáveis estocados",
    guideline: "Verificar ausência de tambores velhos, caixas de papelão ou poças de fluido.",
    status: "OK",
    photos: []
  },
  // 11. Documentação
  {
    id: "chk-26",
    code: "DOC-01",
    category: "11. Documentação",
    title: "Prontuário técnico e esquema elétrico guardados na pasta do painel",
    guideline: "Conferir presença do diagrama elétrico original do grupo gerador.",
    status: "N/A",
    observation: "Diagrama guardado no servidor central do cliente conforme procedimento local.",
    photos: []
  },
  {
    id: "chk-27",
    code: "DOC-02",
    category: "11. Documentação",
    title: "Registro físico do horímetro no cartão do gerador",
    guideline: "Anotar leitura atual da horímetro para controle do plano de manutenção.",
    status: "OK",
    measurementValue: "1842.7 h",
    photos: ["https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80"]
  },
  {
    id: "chk-28",
    code: "DOC-03",
    category: "11. Documentação",
    title: "Selo de vistoria atualizado afixado no painel",
    guideline: "Colar adesivo com data da vistoria e identificação do técnico.",
    status: "N/A",
    photos: []
  }
];

export const INITIAL_NON_CONFORMITIES: NonConformity[] = [
  {
    id: "nc-01",
    code: "NC-2026-0084",
    inspectionId: "VIS-2026-0148",
    siteName: "Data Center Alpha",
    equipmentTag: "GMG-003",
    category: "6. Baterias de partida",
    itemTitle: "Terminais da bateria limpos e sem oxidação",
    description: "Foi identificada oxidação acentuada no terminal positivo da bateria de partida do grupo gerador.",
    criticality: "Alta",
    recommendedAction: "Realizar limpeza mecânica, reaperto dos conectores e aplicação de protetor dielétrico anticorrosivo.",
    suggestedDeadline: "26/07/2026",
    status: "Aberta",
    assignedTo: "Equipe Elétrica Sorocaba",
    createdAt: "24/07/2026 14:48",
    photos: ["https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=400&q=80"],
    timeline: [
      { date: "24/07/2026 14:48", action: "Não conformidade registrada na Vistoria VIS-2026-0148", author: "Carlos Henrique (Técnico)" },
      { date: "24/07/2026 15:10", action: "Notificação enviada ao Supervisor de Manutenção", author: "Sistema GMG Check" }
    ]
  },
  {
    id: "nc-02",
    code: "NC-2026-0083",
    inspectionId: "VIS-2026-0147",
    siteName: "Hospital Santa Helena",
    equipmentTag: "GMG-001",
    category: "4. Sistema de combustível",
    itemTitle: "Vazamento leve na conexao do filtro separador Racor",
    description: "Gotejamento sutil de óleo diesel na conexao inferior da bacia do filtro separador de água.",
    criticality: "Crítica",
    recommendedAction: "Substituir anel O-Ring de vedação e reapertar copo do filtro separador.",
    suggestedDeadline: "25/07/2026",
    status: "Correção programada",
    assignedTo: "Manutenção Preventiva Hospitalar",
    createdAt: "24/07/2026 08:35",
    photos: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"],
    timeline: [
      { date: "24/07/2026 08:35", action: "Identificado em vistoria matutina", author: "Carlos Henrique (Técnico)" },
      { date: "24/07/2026 09:00", action: "Aprovado plano de ação pela supervisão", author: "Juliana Alves (Supervisora)" },
      { date: "24/07/2026 10:15", action: "Manutenção programada para 25/07 às 08:00", author: "Patrícia Santos (Hospital)" }
    ]
  },
  {
    id: "nc-03",
    code: "NC-2026-0082",
    inspectionId: "VIS-2026-0146",
    siteName: "Centro Logístico Norte",
    equipmentTag: "GMG-008",
    category: "1. Identificação e acesso",
    itemTitle: "Placa de identificação patrimonial ilegível",
    description: "Adesivo patrimonial desgastado pela exposição solar na área externa do contêiner.",
    criticality: "Baixa",
    recommendedAction: "Emitir e afixar nova etiqueta metálica gravada com QR Code.",
    suggestedDeadline: "10/08/2026",
    status: "Em análise",
    assignedTo: "Cadastro de Ativos",
    createdAt: "23/07/2026 11:20",
    photos: [],
    timeline: [
      { date: "23/07/2026 11:20", action: "Identificado na vistoria preventiva", author: "Fernanda Lima (Técnica)" }
    ]
  }
];

export const INITIAL_INSPECTIONS: Inspection[] = [
  {
    id: "VIS-2026-0148",
    siteId: "site-01",
    siteName: "Data Center Alpha",
    siteCity: "Sorocaba/SP",
    equipmentId: "eq-003",
    equipmentTag: "GMG-003",
    equipmentName: "Gerador Principal — Bloco A",
    equipmentSpecs: "Stemac S500 (500 kVA / Diesel / 380V)",
    technicianName: "Carlos Henrique",
    technicianId: "usr-01",
    type: "Preventiva mensal",
    date: "24/07/2026",
    startTime: "14:36",
    endTime: "15:14",
    durationMinutes: 38,
    status: "Programada",
    resultSummary: {
      okCount: 24,
      nokCount: 2,
      naCount: 2,
      total: 28
    },
    localResponsibleName: "Marcos Oliveira",
    localResponsiblePhone: "(15) 99823-1100",
    localResponsibleMatricula: "MAT-0842",
    equipmentCondition: "Operacional",
    isOperatingDuringCheck: true,
    initialObservations: "Vistoria iniciada conforme cronograma preventivo mensal do Data Center.",
    generalObservations: "Equipamento operando normalmente no teste sem carga, porém necessita correção dos terminais da bateria e substituição preventiva do extintor.",
    checklists: DEFAULT_CHECKLIST_TEMPLATE,
    nonConformities: INITIAL_NON_CONFORMITIES.filter(n => n.inspectionId === "VIS-2026-0148"),
    photos: [
      { id: "p-01", url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80", caption: "Vista frontal do GMG-003 no abrigo", timestamp: "14:38" },
      { id: "p-02", url: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=600&q=80", caption: "Terminal oxidado da bateria (NOK)", timestamp: "14:48" },
      { id: "p-03", url: "https://images.unsplash.com/photo-1527016021513-b09758b777bd?auto=format&fit=crop&w=600&q=80", caption: "Nível de combustível diário (74%)", timestamp: "14:52" },
      { id: "p-04", url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80", caption: "Leitura do Horímetro (1842.7h)", timestamp: "15:02" }
    ],
    measurements: {
      hourmeter: "1842.7 h",
      voltageRS: "381 V",
      voltageST: "379 V",
      voltageRT: "380 V",
      frequency: "60.1 Hz",
      batteryVoltage: "25.4 V",
      oilPressureBar: "4.8 bar",
      engineTempC: "82 °C",
      fuelLevelPercent: "74%"
    },
    signatures: {
      technicianSigned: true,
      localResponsibleSigned: true,
      termAccepted: true
    },
    synced: true
  },
  {
    id: "VIS-2026-0147",
    siteId: "site-02",
    siteName: "Hospital Santa Helena",
    siteCity: "Campinas/SP",
    equipmentId: "eq-001",
    equipmentTag: "GMG-001",
    equipmentName: "Gerador UTI & Emergência",
    equipmentSpecs: "Cummins C450D5 (450 kVA / Diesel / 380V)",
    technicianName: "Carlos Henrique",
    technicianId: "usr-01",
    type: "Preventiva mensal",
    date: "24/07/2026",
    startTime: "08:00",
    endTime: "08:42",
    durationMinutes: 42,
    status: "Concluída",
    resultSummary: {
      okCount: 25,
      nokCount: 1,
      naCount: 2,
      total: 28
    },
    localResponsibleName: "Patrícia Santos",
    localResponsiblePhone: "(19) 98711-2233",
    localResponsibleMatricula: "MAT-1102",
    equipmentCondition: "Com restrição",
    isOperatingDuringCheck: true,
    generalObservations: "Identificado pequeno vazamento no filtro Racor. Programada manutenção imediata.",
    checklists: DEFAULT_CHECKLIST_TEMPLATE,
    nonConformities: INITIAL_NON_CONFORMITIES.filter(n => n.inspectionId === "VIS-2026-0147"),
    photos: [
      { id: "p-05", url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80", caption: "Visão do gerador hospitalar", timestamp: "08:05" }
    ],
    measurements: {
      hourmeter: "3245.1 h",
      voltageRS: "380 V",
      voltageST: "380 V",
      voltageRT: "379 V",
      frequency: "60.0 Hz",
      batteryVoltage: "26.1 V",
      oilPressureBar: "4.5 bar",
      engineTempC: "85 °C",
      fuelLevelPercent: "92%"
    },
    signatures: {
      technicianSigned: true,
      localResponsibleSigned: true,
      termAccepted: true
    },
    synced: true
  },
  {
    id: "VIS-2026-0146",
    siteId: "site-03",
    siteName: "Centro Logístico Norte",
    siteCity: "Jundiaí/SP",
    equipmentId: "eq-007",
    equipmentTag: "GMG-007",
    equipmentName: "Gerador Galpão Logístico 1",
    equipmentSpecs: "Caterpillar C18 (600 kVA / Diesel / 380V)",
    technicianName: "Fernanda Lima",
    technicianId: "usr-04",
    type: "Preventiva mensal",
    date: "23/07/2026",
    startTime: "10:30",
    endTime: "11:15",
    durationMinutes: 45,
    status: "Concluída",
    resultSummary: {
      okCount: 27,
      nokCount: 0,
      naCount: 1,
      total: 28
    },
    localResponsibleName: "Renato Alves",
    localResponsiblePhone: "(11) 99123-5566",
    localResponsibleMatricula: "MAT-9988",
    equipmentCondition: "Operacional",
    isOperatingDuringCheck: true,
    generalObservations: "Equipamento aprovado sem qualquer não conformidade técnica.",
    checklists: DEFAULT_CHECKLIST_TEMPLATE,
    nonConformities: [],
    photos: [],
    measurements: {
      hourmeter: "4118.5 h",
      voltageRS: "382 V",
      voltageST: "381 V",
      voltageRT: "382 V",
      frequency: "60.2 Hz",
      batteryVoltage: "26.4 V",
      oilPressureBar: "5.1 bar",
      engineTempC: "80 °C",
      fuelLevelPercent: "85%"
    },
    signatures: {
      technicianSigned: true,
      localResponsibleSigned: true,
      termAccepted: true
    },
    synced: true
  },
  {
    id: "VIS-2026-0145",
    siteId: "site-04",
    siteName: "Supermercado Central",
    siteCity: "Sorocaba/SP",
    equipmentId: "eq-012",
    equipmentTag: "GMG-012",
    equipmentName: "Gerador Frio & Caixas",
    equipmentSpecs: "MWM / Maquigeral MQ-250 (250 kVA)",
    technicianName: "Carlos Henrique",
    technicianId: "usr-01",
    type: "Preventiva mensal",
    date: "24/07/2026",
    startTime: "17:00",
    status: "Pendente",
    localResponsibleName: "Cláudio Mendonça",
    localResponsiblePhone: "(15) 98112-9090",
    localResponsibleMatricula: "MAT-5544",
    equipmentCondition: "Operacional",
    isOperatingDuringCheck: false,
    checklists: [],
    nonConformities: [],
    photos: [],
    measurements: {
      hourmeter: "890.3 h",
      voltageRS: "380 V",
      voltageST: "380 V",
      voltageRT: "380 V",
      frequency: "60.0 Hz",
      batteryVoltage: "13.2 V",
      oilPressureBar: "0.0 bar",
      engineTempC: "25 °C",
      fuelLevelPercent: "68%"
    },
    signatures: {
      technicianSigned: false,
      localResponsibleSigned: false,
      termAccepted: false
    },
    synced: false
  }
];

export const INITIAL_CHECKLIST_TEMPLATES: ChecklistTemplate[] = [
  {
    id: "tmpl-01",
    name: "Vistoria Preventiva Mensal de GMG",
    description: "Checklist padrão recomendado para inspeções periódicas de geradores de 50 a 1000 kVA.",
    itemsCount: 28,
    categoriesCount: 11,
    status: "Ativo"
  },
  {
    id: "tmpl-02",
    name: "Vistoria Trimestral Completa com Teste de Carga",
    description: "Inspeção aprofundada incluindo banco de carga, análise de óleo dielétrico e termografia.",
    itemsCount: 46,
    categoriesCount: 15,
    status: "Ativo"
  },
  {
    id: "tmpl-03",
    name: "Inspeção Pós-Manutenção Corretiiva",
    description: "Roteiro enxuto para validação de entrega técnica de serviços corretivos e troca de peças.",
    itemsCount: 22,
    categoriesCount: 8,
    status: "Ativo"
  }
];
