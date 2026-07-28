import { 
  TherapeuticResource, 
  ScenarioObject, 
  ReflectiveCard, 
  TherapeuticSession, 
  PsychologistProfile,
  NotificationItem
} from "./types";

export const INITIAL_PSYCHOLOGIST: PsychologistProfile = {
  name: "Dra. Mariana Lopes",
  crp: "06/123456",
  state: "São Paulo",
  email: "psicologa@menteludica.com.br",
  phone: "(11) 98765-4321",
  specialties: ["Psicologia Infantil", "Terapia Cognitivo-Comportamental", "Orientação de Pais"],
  crpStatus: "validated",
  crpValidationDate: "26/07/2026",
  plan: "monthly",
  planStatus: "trial",
  trialDaysRemaining: 3,
  nextRenewalDate: "26/08/2026"
};

export const INITIAL_RESOURCES: TherapeuticResource[] = [
  {
    id: "rec-1",
    title: "Meu mundo por dentro",
    category: "Cenário interativo",
    type: "scenario",
    ageRanges: ["6 a 12 anos", "7 a 9 anos", "10 a 12 anos"],
    demands: ["emoções", "vínculos", "medo", "conflitos"],
    durationMinutes: "30 a 45 minutos",
    description: "Uma atividade de construção simbólica com objetos e cenários para favorecer expressão e elaboração emocional.",
    objective: "Favorecer a expressão simbólica de emoções, relações, medos, desejos e percepções sobre o ambiente.",
    indications: [
      "Dificuldade de verbalização de conflitos",
      "Ansiedade e sentimentos de insegurança",
      "Dinâmica familiar e relações interpessoais",
      "Construção de lugar seguro e limites"
    ],
    howToUse: [
      "Apresente a bandeja virtual ao paciente e explique que ele pode escolher e posicionar elementos.",
      "Inicie com uma instrução ampla: 'Monte um lugar que represente o seu momento atual'.",
      "Observe o agrupamento de personagens, muretas de proteção e elementos de medo.",
      "Faça perguntas reflexivas sem fazer interpretações precoces ou rígidas."
    ],
    elementsAvailable: ["Personagens", "Casas", "Árvores", "Animais", "Objetos", "Elementos naturais", "Formas", "Cores", "Símbolos"],
    careInstructions: "Atividade recomendada para condução direta pelo psicólogo. Evite fazer apontamentos diretivos sobre as posições dos objetos no início.",
    isFavorite: true,
    usesCount: 8420,
    coverImage: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
    badge: "Mais Utilizado"
  },
  {
    id: "rec-2",
    title: "Desenhando o que sinto",
    category: "Desenho livre",
    type: "drawing",
    ageRanges: ["4 a 6 anos", "7 a 9 anos", "10 a 12 anos", "13 a 17 anos", "Adultos", "Todas as idades"],
    demands: ["emoções", "ansiedade", "regulação emocional", "autoconhecimento"],
    durationMinutes: "20 a 30 minutos",
    description: "Canvas interativo de desenho com molduras clínicas como silhueta corporal, termômetro emocional e abrigo seguro.",
    objective: "Mapear a manifestação somática de emoções no corpo e oferecer canal não-verbal de comunicação.",
    indications: [
      "Somatização da ansiedade (dores no estômago, tensão)",
      "Identificação de gatilhos emocionais",
      "Expressão de mágoa ou raiva contida",
      "Definição visual de refúgio emocional"
    ],
    howToUse: [
      "Escolha um fundo estruturado (Silhueta do corpo ou Termômetro).",
      "Peça para o paciente escolher cores para cada emoção (ex: vermelho = raiva, azul = tristeza).",
      "Solicite que pinte onde no corpo essa emoção costuma aparecer.",
      "Utilize as ferramentas de pincel, carimbos e marcadores de texto."
    ],
    elementsAvailable: ["Lápis", "Marcador", "Formas", "Borracha", "Silhueta Corporal", "Termômetro Emocional", "Lugar Seguro"],
    careInstructions: "Respeite o tempo do paciente. O desenho não precisa ter rigor estético, apenas significado simbólico.",
    isFavorite: true,
    usesCount: 7180,
    coverImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    badge: "Recomendado"
  },
  {
    id: "rec-3",
    title: "Cartas que fazem pensar",
    category: "Cartas reflexivas",
    type: "cards",
    ageRanges: ["10 a 12 anos", "13 a 17 anos", "Adultos"],
    demands: ["autoconhecimento", "autoestima", "habilidades sociais", "comunicação"],
    durationMinutes: "25 a 40 minutos",
    description: "Carrossel de cartas terapêuticas para adolescentes e adultos promoverem autorreflexão e comunicação assertiva.",
    objective: "Estimular o raciocínio reflexivo, a comunicação assertiva e o reconhecimento de recursos pessoais de enfrentamento.",
    indications: [
      "Timidez e inibição na comunicação",
      "Dificuldades de tomada de decisão",
      "Avaliação de valores pessoais e autoimagem",
      "Trabalho de flexibilidade cognitiva"
    ],
    howToUse: [
      "Gire o carrossel de cartas ou selecione uma categoria específica.",
      "Apresente a carta revelada e ofereça opções de resposta (falar, escrever ou desenhar).",
      "Incentive o aprofundamento das respostas com perguntas exploratórias."
    ],
    elementsAvailable: ["Cartas de Emoção", "Cartas de Autoestima", "Cartas de Escolhas", "Cartas de Futuro", "Respostas por Áudio/Texto"],
    careInstructions: "Se a pergunta gerar desconforto intenso, utilize a opção 'Pular pergunta' e retome em momento adequado.",
    isFavorite: true,
    usesCount: 5780,
    coverImage: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    badge: "Destaque Teen"
  },
  {
    id: "rec-4",
    title: "Mural das Forças & Conquistas",
    category: "Atividade guiada",
    type: "drawing",
    ageRanges: ["7 a 9 anos", "10 a 12 anos", "13 a 17 anos"],
    demands: ["autoestima", "autoconhecimento", "regulação emocional"],
    durationMinutes: "30 minutos",
    description: "Construção visual de vitórias recentes e qualidades pessoais para fortalecer a autoeficácia.",
    objective: "Desenvolver o foco nas competências pessoais e ressignificar momentos de fracasso percebido.",
    indications: ["Baixa autoimagem", "Pensamentos autocríticos", "Desamparo aprendido"],
    howToUse: ["Trabalhe os adesivos de forças internas e preencha o troféu das conquistas."],
    elementsAvailable: ["Troféus", "Medalhas", "Adesivos de Forças", "Texto Livre"],
    careInstructions: "Ajude o paciente a reconhecer pequenas vitórias cotidianas.",
    isFavorite: false,
    usesCount: 3290,
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rec-5",
    title: "Bússola dos Conflitos Familiares",
    category: "Cenário interativo",
    type: "scenario",
    ageRanges: ["10 a 12 anos", "13 a 17 anos", "Adultos"],
    demands: ["conflitos", "vínculos", "comunicação"],
    durationMinutes: "40 minutos",
    description: "Atividade sociométrica interativa para organizar posições e distâncias afetivas na família.",
    objective: "Visualizar dinâmicas de alianças, afastamentos e ruídos de comunicação familiar.",
    indications: ["Separação dos pais", "Rivalidade fraterna", "Dificuldade de estabelecimento de limites"],
    howToUse: ["Posicione os ícones dos membros da família e defina as pontes de comunicação."],
    elementsAvailable: ["Membros da Família", "Símbolos de Afeto", "Barreiras Visualizáveis"],
    careInstructions: "Mantenha a neutralidade ética ao mediar as posições relatadas.",
    isFavorite: false,
    usesCount: 4120,
    coverImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80"
  }
];

export const SCENARIO_OBJECTS: ScenarioObject[] = [
  { id: "p1", name: "Menino", category: "pessoas", icon: "👦" },
  { id: "p2", name: "Menina", category: "pessoas", icon: "👧" },
  { id: "p3", name: "Adulto Homem", category: "pessoas", icon: "👨" },
  { id: "p4", name: "Adulta Mulher", category: "pessoas", icon: "👩" },
  { id: "p5", name: "Idoso", category: "pessoas", icon: "👴" },
  { id: "p6", name: "Bebê", category: "pessoas", icon: "👶" },
  
  { id: "f1", name: "Mãe e Filho", category: "família", icon: "👩‍👦" },
  { id: "f2", name: "Pai e Filha", category: "família", icon: "👨‍👧" },
  { id: "f3", name: "Casal", category: "família", icon: "👫" },
  { id: "f4", name: "Família Reunida", category: "família", icon: "👨‍👩‍👧‍👦" },

  { id: "a1", name: "Cachorro Amigo", category: "animais", icon: "🐕" },
  { id: "a2", name: "Gato Atento", category: "animais", icon: "🐈" },
  { id: "a3", name: "Passarinho", category: "animais", icon: "🐦" },
  { id: "a4", name: "Leão Corajoso", category: "animais", icon: "🦁" },
  { id: "a5", name: "Urso Protetor", category: "animais", icon: "🐻" },
  { id: "a6", name: "Monstrinho", category: "animais", icon: "👾" },

  { id: "c1", name: "Casa Acolhedora", category: "casas", icon: "🏠" },
  { id: "c2", name: "Castelo Forte", category: "casas", icon: "🏰" },
  { id: "c3", name: "Prédio Grande", category: "casas", icon: "🏢" },
  { id: "c4", name: "Muro de Proteção", category: "casas", icon: "🧱" },
  { id: "c5", name: "Ponte de Ligação", category: "casas", icon: "🌉" },

  { id: "n1", name: "Árvore Frondosa", category: "natureza", icon: "🌳" },
  { id: "n2", name: "Flor Delicada", category: "natureza", icon: "🌸" },
  { id: "n3", name: "Sol Radiante", category: "natureza", icon: "☀️" },
  { id: "n4", name: "Nuvem de Chuva", category: "natureza", icon: "🌧️" },
  { id: "n5", name: "Montanha Segura", category: "natureza", icon: "⛰️" },
  { id: "n6", name: "Arco-íris", category: "natureza", icon: "🌈" },

  { id: "e1", name: "Coração Afetuoso", category: "emoções", icon: "❤️" },
  { id: "e2", name: "Estrela Guia", category: "emoções", icon: "⭐" },
  { id: "e3", name: "Rosto Feliz", category: "emoções", icon: "😊" },
  { id: "e4", name: "Rosto Preocupado", category: "emoções", icon: "😟" },
  { id: "e5", name: "Raio de Raiva", category: "emoções", icon: "⚡" },
  { id: "e6", name: "Escudo Forte", category: "emoções", icon: "🛡️" }
];

export const REFLECTIVE_CARDS: ReflectiveCard[] = [
  {
    id: "card-1",
    question: "O que você gostaria que as pessoas entendessem melhor sobre você?",
    category: "Autoconhecimento",
    ageRange: "13 a 17 anos",
    demand: "autoconhecimento",
    hint: "Pense em algo que você sente mas nem sempre expressa abertamente."
  },
  {
    id: "card-2",
    question: "O que costuma ajudar quando você está muito preocupado?",
    category: "Ansiedade",
    ageRange: "10 a 12 anos",
    demand: "ansiedade",
    hint: "Lembre-se de uma pessoa, objeto, música ou lugar que te acalma."
  },
  {
    id: "card-3",
    question: "Qual foi uma pequena conquista desta semana que você não comemorou?",
    category: "Autoestima",
    ageRange: "Todas as idades",
    demand: "autoestima",
    hint: "Valide passos simples como cumprir uma tarefa ou respirar fundo."
  },
  {
    id: "card-4",
    question: "Em quais situações você sente que precisa se esconder ou se fechar?",
    category: "Medo",
    ageRange: "13 a 17 anos",
    demand: "medo",
    hint: "Identifique se o ambiente transmite julgamento ou insegurança."
  },
  {
    id: "card-5",
    question: "Se sua ansiedade pudesse falar, o que ela estaria tentando te alertar?",
    category: "Emoções",
    ageRange: "Adultos",
    demand: "regulação emocional",
    hint: "Tente encarar a ansiedade não como inimiga, mas como um sinalizador."
  },
  {
    id: "card-6",
    question: "Quem faz você se sentir verdadeiramente seguro e ouvido?",
    category: "Vínculos",
    ageRange: "Todas as idades",
    demand: "vínculos",
    hint: "Pode ser um familiar, amigo, professor ou até o seu psicólogo."
  },
  {
    id: "card-7",
    question: "O que você gostaria de conseguir dizer com mais facilidade para sua família?",
    category: "Comunicação",
    ageRange: "10 a 12 anos",
    demand: "conflitos",
    hint: "Escreva uma frase simples que expressaria seus sentimentos de verdade."
  }
];

export const INITIAL_SESSIONS: TherapeuticSession[] = [
  {
    id: "SES-2026-0184",
    code: "482917",
    patientInitials: "L.",
    patientFullName: "Lucas S.",
    ageGroup: "7 a 9 anos",
    date: "25/07/2026 - 15:30",
    durationMinutes: 42,
    status: "completed",
    resourceId: "rec-1",
    resourceTitle: "Meu mundo por dentro",
    notes: [
      "Paciente posicionou a casa no canto esquerdo cercada por muros pesados.",
      "Identificou o leão corajoso como sendo seu próprio desejo de defender o irmão menor.",
      "Retomar a questão do pavor de escuro na próxima consulta."
    ],
    tags: ["retomar", "relevante"],
    savedStatesCount: 3,
    patientConnected: false
  },
  {
    id: "SES-2026-0183",
    code: "391048",
    patientInitials: "A.",
    patientFullName: "Alice M.",
    ageGroup: "13 a 17 anos",
    date: "24/07/2026 - 11:00",
    durationMinutes: 35,
    status: "completed",
    resourceId: "rec-3",
    resourceTitle: "Cartas que fazem pensar",
    notes: [
      "Boa adesão às perguntas de autoestima.",
      "Identificou dificuldades de impor limites no ambiente escolar."
    ],
    tags: ["observar"],
    savedStatesCount: 1,
    patientConnected: false
  },
  {
    id: "SES-2026-0182",
    code: "902144",
    patientInitials: "R.",
    patientFullName: "Rodrigo T.",
    ageGroup: "10 a 12 anos",
    date: "24/07/2026 - 09:15",
    durationMinutes: 18,
    status: "interrupted",
    resourceId: "rec-2",
    resourceTitle: "Desenhando o que sinto",
    notes: [
      "Sessão interrompida devido a problema de conexão na casa do paciente.",
      "Agendada continuidade para amanhã."
    ],
    tags: ["próxima sessão"],
    savedStatesCount: 1,
    patientConnected: false
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n-1",
    title: "CRP Validado com Sucesso",
    message: "Seu registro profissional foi verificado no Conselho de Psicologia.",
    timestamp: "Hoje, 09:30",
    type: "success",
    read: false
  },
  {
    id: "n-2",
    title: "Período de Teste Ativo",
    message: "Você possui 3 dias de degustação ilimitada de todos os recursos.",
    timestamp: "Hoje, 08:00",
    type: "info",
    read: false
  },
  {
    id: "n-3",
    title: "Novo Recurso Lançado",
    message: "Conheça 'Mural das Forças & Conquistas' na biblioteca.",
    timestamp: "Ontem, 16:45",
    type: "info",
    read: true
  }
];
