export interface BreederProfile {
  id: string;
  name: string;
  publicName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  photo: string;
  bio: string;
  founderNumber: string;
  joinedYear: number;
}

export interface KennelProfile {
  id: string;
  name: string;
  prefix: string;
  foundationYear: number;
  city: string;
  state: string;
  responsibleName: string;
  registrationNumber: string;
  clubEntity: string;
  mainBreed: string;
  slogan: string;
  description: string;
  founderSeal: string; // e.g. "027"
  coverImage: string;
  logoImage: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  instagram: string;
  facebook: string;
  youtube: string;
  completenessPercentage: number;
  publicUrl: string;
  gallery: string[];
  documents: {
    id: string;
    title: string;
    type: string;
    status: 'verified' | 'pending';
    date: string;
  }[];
}

export interface ExamRecord {
  id: string;
  type: string; // e.g., 'Displasia Coxofemural', 'JLPP', 'Cardíaco'
  result: string;
  date: string;
  entity: string;
  verified: boolean;
}

export interface TitleRecord {
  id: string;
  title: string; // e.g., 'Jovem Campeão Panamericano'
  event: string;
  entity: string;
  date: string;
  placement: string;
  image?: string;
}

export interface Dog {
  id: string;
  useName: string; // e.g., Imperial Thor
  registeredName: string; // e.g., Thor do Vale Imperial
  breed: string;
  variety?: string;
  gender: 'male' | 'female';
  birthDate: string; // DD/MM/YYYY
  age: string;
  color: string;
  registrationNumber: string; // e.g. CBKC/RG/SP/102845
  microchip: string;
  breederName: string;
  ownerName: string;
  kennelName: string;
  status: string;
  completenessPercentage: number;
  mainImage: string;
  gallery: string[];
  weight: string;
  height: string;
  temperament: string;
  description: string;
  fatherId?: string;
  motherId?: string;
  fatherName?: string;
  motherName?: string;
  fatherReg?: string;
  motherReg?: string;
  lineageGenerations: number;
  exams: ExamRecord[];
  titles: TitleRecord[];
  documentsCount: number;
  qrCodeUrl: string;
  publicUrl: string;
  hasPhoto: boolean;
  hasLineage: boolean;
}

export interface Ancestor {
  id: string;
  name: string;
  registration?: string;
  titles?: string;
  country?: string;
  isExternal?: boolean;
  image?: string;
  gender: 'male' | 'female';
}

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  priority: 'important' | 'attention' | 'info';
  category: 'Fotografias' | 'Linhagem' | 'Cadastro' | 'Documentos' | 'Saúde';
  date: string;
  actionText: string;
  targetDogId?: string;
}

export const INITIAL_BREEDER: BreederProfile = {
  id: 'b-027',
  name: 'Rafael Augusto',
  publicName: 'Rafael Augusto - Vale Imperial',
  email: 'fundador@kennellegacy.com.br',
  phone: '(11) 98765-4321',
  city: 'Ibiúna',
  state: 'SP',
  photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  bio: 'Criador dedicado à preservação e aprimoramento genético do Rottweiler há mais de 10 anos, focando em saúde, morfologia e temperamento equilibrado.',
  founderNumber: '027',
  joinedYear: 2024
};

export const INITIAL_KENNEL: KennelProfile = {
  id: 'k-027',
  name: 'Canil Vale Imperial',
  prefix: 'do Vale Imperial',
  foundationYear: 2014,
  city: 'Ibiúna',
  state: 'SP',
  responsibleName: 'Rafael Augusto',
  registrationNumber: 'CBKC-847291',
  clubEntity: 'CBKC / FCI / APRO',
  mainBreed: 'Rottweiler',
  slogan: 'Estrutura, temperamento e tradição na criação de Rottweilers.',
  description: 'O Canil Vale Imperial trabalha com criação responsável de Rottweilers, priorizando temperamento equilibrado, saúde, estrutura óssea, socialização e preservação rigorosa dos padrões oficiais da raça FCI.',
  founderSeal: '027',
  coverImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=80',
  logoImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80',
  phone: '(11) 98765-4321',
  whatsapp: '5511987654321',
  email: 'contato@canilvaleimperial.com.br',
  website: 'https://valeimperial.com.br',
  instagram: '@canilvaleimperial',
  facebook: 'facebook.com/canilvaleimperial',
  youtube: 'youtube.com/@canilvaleimperial',
  completenessPercentage: 82,
  publicUrl: 'https://kennellegacy.com/canil/vale-imperial',
  gallery: [
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1567752881298-894bb81f9379?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80'
  ],
  documents: [
    { id: 'doc-1', title: 'Certificado de Afixo Definitivo CBKC/FCI', type: 'Certificado', status: 'verified', date: '14/02/2014' },
    { id: 'doc-2', title: 'Alvará do Canil e Licença Sanitária 2024', type: 'Licença', status: 'verified', date: '10/01/2024' },
    { id: 'doc-3', title: 'Termo de Responsabilidade e Ética de Criação', type: 'Documento', status: 'verified', date: '05/03/2024' }
  ]
};

export const INITIAL_DOGS: Dog[] = [
  {
    id: 'dog-1',
    useName: 'Imperial Thor',
    registeredName: 'Thor do Vale Imperial',
    breed: 'Rottweiler',
    variety: 'Padrão FCI',
    gender: 'male',
    birthDate: '14/03/2022',
    age: '2 anos e 4 meses',
    color: 'Preto e castanho',
    registrationNumber: 'CBKC/RG/SP/102845',
    microchip: '985141002345671',
    breederName: 'Rafael Augusto',
    ownerName: 'Rafael Augusto',
    kennelName: 'Canil Vale Imperial',
    status: 'Perfil 92% completo',
    completenessPercentage: 92,
    mainImage: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1567752881298-894bb81f9379?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80'
    ],
    weight: '52 kg',
    height: '66 cm',
    temperament: 'Equilibrado, confiante, protetor e excelente com a família',
    description: 'Macho de excelente estrutura óssea, cabeça atípica expressiva, movimentação fluida e temperamento equilibrado. Destaque em exposições de estrutura e beleza.',
    fatherId: 'dog-5',
    motherId: 'dog-6',
    fatherName: 'Maximus von Adlerberg',
    motherName: 'Bella do Vale Imperial',
    fatherReg: 'ADRK-18723',
    motherReg: 'CBKC-98452',
    lineageGenerations: 4,
    exams: [
      { id: 'ex-1', type: 'Displasia Coxofemural (HD)', result: 'HD-A (Isento)', date: '12/04/2023', entity: 'OFA / VetImplantes', verified: true },
      { id: 'ex-2', type: 'Displasia de Cotovelo (ED)', result: 'ED-0 (Isento)', date: '12/04/2023', entity: 'OFA / VetImplantes', verified: true },
      { id: 'ex-3', type: 'JLPP (Paralisia de Laringe)', result: 'N/N (Livre/Homozigoto)', date: '20/05/2023', entity: 'Laboklin Alemanha', verified: true }
    ],
    titles: [
      { id: 't-1', title: 'Grande Campeão Jovem Panamericano', event: 'Expo Internacional CBKC 2023', entity: 'CBKC/FCI', date: '18/11/2023', placement: '1º Lugar Best in Show' },
      { id: 't-2', title: 'Vencedor Especializado de Raça', event: 'Nacional APRO 2024', entity: 'APRO', date: '15/03/2024', placement: 'Melhor Macho Jovem' }
    ],
    documentsCount: 4,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://kennellegacy.com/cao/thor-vale-imperial',
    publicUrl: 'https://kennellegacy.com/cao/thor-vale-imperial',
    hasPhoto: true,
    hasLineage: true
  },
  {
    id: 'dog-2',
    useName: 'Aurora',
    registeredName: 'Aurora do Vale Imperial',
    breed: 'Rottweiler',
    variety: 'Padrão FCI',
    gender: 'female',
    birthDate: '08/08/2023',
    age: '11 meses',
    color: 'Preto e castanho intenso',
    registrationNumber: 'CBKC/RG/SP/114920',
    microchip: '985141002349812',
    breederName: 'Rafael Augusto',
    ownerName: 'Rafael Augusto',
    kennelName: 'Canil Vale Imperial',
    status: 'Perfil 76% completo',
    completenessPercentage: 76,
    mainImage: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80'
    ],
    weight: '41 kg',
    height: '61 cm',
    temperament: 'Ativa, atenta, afetuosa e de apurado instinto de guarda',
    description: 'Fêmea promissora da nova geração do Vale Imperial. Excelente pigmentação e linha de dorso firme.',
    fatherId: 'dog-5',
    motherId: 'dog-6',
    fatherName: 'Maximus von Adlerberg',
    motherName: 'Bella do Vale Imperial',
    fatherReg: 'ADRK-18723',
    motherReg: 'CBKC-98452',
    lineageGenerations: 3,
    exams: [
      { id: 'ex-4', type: 'JLPP', result: 'N/N (Livre)', date: '10/01/2024', entity: 'Laboklin', verified: true }
    ],
    titles: [
      { id: 't-3', title: 'Campeã Filhote Estadual', event: 'Circuito Paulista 2023', entity: 'FECESP', date: '02/12/2023', placement: '1º Lugar' }
    ],
    documentsCount: 2,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://kennellegacy.com/cao/aurora-vale-imperial',
    publicUrl: 'https://kennellegacy.com/cao/aurora-vale-imperial',
    hasPhoto: true,
    hasLineage: true
  },
  {
    id: 'dog-3',
    useName: 'Zeus Imperial',
    registeredName: 'Zeus do Vale Imperial',
    breed: 'Rottweiler',
    variety: 'Padrão FCI',
    gender: 'male',
    birthDate: '21/11/2021',
    age: '2 anos e 8 meses',
    color: 'Preto e castanho',
    registrationNumber: 'CBKC/RG/SP/098123',
    microchip: '985141002311098',
    breederName: 'Rafael Augusto',
    ownerName: 'Rafael Augusto',
    kennelName: 'Canil Vale Imperial',
    status: 'Perfil 100% completo',
    completenessPercentage: 100,
    mainImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80'
    ],
    weight: '54 kg',
    height: '67 cm',
    temperament: 'Imponente, calmo, focado e super sociável',
    description: 'Padreador principal do canil. Transmite excelente ossatura e aprumos corretos aos seus descendentes.',
    fatherId: 'dog-5',
    motherId: 'dog-8',
    fatherName: 'Maximus von Adlerberg',
    motherName: 'Sasha do Vale',
    fatherReg: 'ADRK-18723',
    motherReg: 'CBKC-81204',
    lineageGenerations: 5,
    exams: [
      { id: 'ex-5', type: 'Displasia Coxofemural (HD)', result: 'HD-A', date: '01/02/2023', entity: 'VetImplantes', verified: true },
      { id: 'ex-6', type: 'Ecocardiograma', result: 'Normal / Normal', date: '15/05/2023', entity: 'InCor Vet', verified: true }
    ],
    titles: [
      { id: 't-4', title: 'Campeão Brasileiro e Panamericano', event: 'Ranking Nacional 2023', entity: 'CBKC', date: '20/12/2023', placement: 'Melhor da Raça' }
    ],
    documentsCount: 5,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://kennellegacy.com/cao/zeus-imperial',
    publicUrl: 'https://kennellegacy.com/cao/zeus-imperial',
    hasPhoto: true,
    hasLineage: true
  },
  {
    id: 'dog-4',
    useName: 'Maya',
    registeredName: 'Maya do Vale Imperial',
    breed: 'Rottweiler',
    variety: 'Padrão FCI',
    gender: 'female',
    birthDate: '03/05/2024',
    age: '2 meses',
    color: 'Preto e castanho',
    registrationNumber: 'Em processamento CBKC',
    microchip: '985141002399812',
    breederName: 'Rafael Augusto',
    ownerName: 'Rafael Augusto',
    kennelName: 'Canil Vale Imperial',
    status: 'Sem linhagem cadastrada',
    completenessPercentage: 40,
    mainImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    weight: '7.5 kg',
    height: '28 cm',
    temperament: 'Curiosa, brincalhona e destemida',
    description: 'Filhote promissora guardada para a matriz do canil.',
    lineageGenerations: 1,
    exams: [],
    titles: [],
    documentsCount: 0,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://kennellegacy.com/cao/maya-vale-imperial',
    publicUrl: 'https://kennellegacy.com/cao/maya-vale-imperial',
    hasPhoto: true,
    hasLineage: false
  },
  {
    id: 'dog-5',
    useName: 'Maximus',
    registeredName: 'Maximus von Adlerberg',
    breed: 'Rottweiler',
    variety: 'Alemão (ADRK Import)',
    gender: 'male',
    birthDate: '10/01/2019',
    age: '5 anos',
    color: 'Preto e castanho clássico',
    registrationNumber: 'ADRK-18723 / CBKC-91029',
    microchip: '276098100123984',
    breederName: 'Zwinger von Adlerberg (Alemanha)',
    ownerName: 'Rafael Augusto',
    kennelName: 'Canil Vale Imperial',
    status: 'Ancestral Matriz',
    completenessPercentage: 95,
    mainImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    weight: '55 kg',
    height: '67 cm',
    temperament: 'Trabalho e estrutura, instinto altíssimo de defesa',
    description: 'Importado da Alemanha (ADRK), padreador de referência com pedigree consagrado europeu.',
    lineageGenerations: 5,
    exams: [
      { id: 'ex-7', type: 'ZTP ADRK', result: 'Aprovado em 1º grau', date: '11/09/2020', entity: 'ADRK eV', verified: true }
    ],
    titles: [
      { id: 't-5', title: 'ADRK Klubsieger V-1', event: 'Alemanha 2021', entity: 'ADRK', date: '04/08/2021', placement: 'V-1 Excelente' }
    ],
    documentsCount: 4,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://kennellegacy.com/cao/maximus-adlerberg',
    publicUrl: 'https://kennellegacy.com/cao/maximus-adlerberg',
    hasPhoto: true,
    hasLineage: true
  },
  {
    id: 'dog-6',
    useName: 'Bella',
    registeredName: 'Bella do Vale Imperial',
    breed: 'Rottweiler',
    variety: 'Padrão FCI',
    gender: 'female',
    birthDate: '15/06/2020',
    age: '4 anos',
    color: 'Preto e castanho',
    registrationNumber: 'CBKC-98452',
    microchip: '985141002300129',
    breederName: 'Rafael Augusto',
    ownerName: 'Rafael Augusto',
    kennelName: 'Canil Vale Imperial',
    status: 'Matriz Ativa',
    completenessPercentage: 88,
    mainImage: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    weight: '43 kg',
    height: '62 cm',
    temperament: 'Dócil com a família, atenta com estranhos, excelente mãe',
    description: 'Matriz principal fundadora da linha feminina do Vale Imperial.',
    lineageGenerations: 4,
    exams: [
      { id: 'ex-8', type: 'Displasia Coxofemural', result: 'HD-A', date: '10/07/2021', entity: 'VetImplantes', verified: true }
    ],
    titles: [],
    documentsCount: 3,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://kennellegacy.com/cao/bella-vale-imperial',
    publicUrl: 'https://kennellegacy.com/cao/bella-vale-imperial',
    hasPhoto: true,
    hasLineage: true
  },
  {
    id: 'dog-7',
    useName: 'Kaiser',
    registeredName: 'Kaiser do Vale Imperial',
    breed: 'Rottweiler',
    variety: 'Padrão FCI',
    gender: 'male',
    birthDate: '02/02/2023',
    age: '1 ano e 5 meses',
    color: 'Preto e castanho',
    registrationNumber: 'CBKC/RG/SP/110291',
    microchip: '985141002341209',
    breederName: 'Rafael Augusto',
    ownerName: 'Rafael Augusto',
    kennelName: 'Canil Vale Imperial',
    status: 'Perfil 85% completo',
    completenessPercentage: 85,
    mainImage: 'https://images.unsplash.com/photo-1534361960057-19889db9875e?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    weight: '50 kg',
    height: '65 cm',
    temperament: 'Forte, corajoso e extremamente estruturado',
    description: 'Jovem padreador com ótimo prognóstico genético.',
    fatherId: 'dog-3',
    motherId: 'dog-6',
    fatherName: 'Zeus Imperial',
    motherName: 'Bella do Vale Imperial',
    lineageGenerations: 4,
    exams: [],
    titles: [],
    documentsCount: 2,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://kennellegacy.com/cao/kaiser-vale-imperial',
    publicUrl: 'https://kennellegacy.com/cao/kaiser-vale-imperial',
    hasPhoto: true,
    hasLineage: true
  },
  {
    id: 'dog-8',
    useName: 'Sasha',
    registeredName: 'Sasha do Vale Negro',
    breed: 'Rottweiler',
    variety: 'Padrão FCI',
    gender: 'female',
    birthDate: '11/11/2018',
    age: '5 anos e 8 meses',
    color: 'Preto e castanho',
    registrationNumber: 'CBKC-81204',
    microchip: '985141002309871',
    breederName: 'Canil Vale Negro',
    ownerName: 'Rafael Augusto',
    kennelName: 'Canil Vale Imperial',
    status: 'Matriz Matriarca',
    completenessPercentage: 90,
    mainImage: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
    gallery: [],
    weight: '44 kg',
    height: '62 cm',
    temperament: 'Equilibrada, mansa com crianças e protetora',
    description: 'Matriarca agregada do canil que gerou campeões de beleza.',
    lineageGenerations: 4,
    exams: [],
    titles: [],
    documentsCount: 3,
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://kennellegacy.com/cao/sasha-vale-negro',
    publicUrl: 'https://kennellegacy.com/cao/sasha-vale-negro',
    hasPhoto: true,
    hasLineage: true
  }
];

export const PEDIGREE_TREE_THOR = {
  dog: {
    id: 'dog-1',
    name: 'Thor do Vale Imperial',
    registration: 'CBKC/RG/SP/102845',
    titles: 'Gr. Camp. Jovem Panamericano',
    image: 'https://images.unsplash.com/photo-1567752881298-894bb81f9379?auto=format&fit=crop&w=400&q=80',
    gender: 'male'
  },
  // Generation 1
  gen1: {
    father: {
      id: 'dog-5',
      name: 'Maximus von Adlerberg',
      registration: 'ADRK-18723 (Import. Alemanha)',
      titles: 'ADRK Klubsieger V-1',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80',
      gender: 'male'
    },
    mother: {
      id: 'dog-6',
      name: 'Bella do Vale Imperial',
      registration: 'CBKC-98452',
      titles: 'Matriz Ouro',
      image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=400&q=80',
      gender: 'female'
    }
  },
  // Generation 2
  gen2: {
    paternalGrandfather: {
      id: 'anc-1',
      name: 'Odin vom Königshaus',
      registration: 'ADRK-16290',
      titles: 'KS Deutscher Champion',
      country: 'Alemanha',
      gender: 'male'
    },
    paternalGrandmother: {
      id: 'anc-2',
      name: 'Greta von Adlerberg',
      registration: 'ADRK-17041',
      titles: 'ADRK V-2',
      country: 'Alemanha',
      gender: 'female'
    },
    maternalGrandfather: {
      id: 'anc-3',
      name: 'Apollo do Vale Negro',
      registration: 'CBKC-76120',
      titles: 'Grande Campeão Brasileiro',
      country: 'Brasil',
      gender: 'male'
    },
    maternalGrandmother: {
      id: 'anc-4',
      name: 'Luna Imperial',
      registration: 'CBKC-79102',
      titles: 'Campeã Panamericana',
      country: 'Brasil',
      gender: 'female'
    }
  },
  // Generation 3
  gen3: [
    { name: 'Brutus vom Hexenstadl', reg: 'ADRK-14001', side: 'paternal-father' },
    { name: 'Hera vom Königshaus', reg: 'ADRK-14820', side: 'paternal-father' },
    { name: 'Tyson von der Bärenschlucht', reg: 'ADRK-15112', side: 'paternal-mother' },
    { name: 'Xena von Adlerberg', reg: 'ADRK-15309', side: 'paternal-mother' },
    { name: 'Kaiser von Schwarzberg', reg: 'CBKC-65109', side: 'maternal-father' },
    { name: 'Astra do Vale Negro', reg: 'CBKC-68120', side: 'maternal-father' },
    { name: 'Baron do Monte Verde', reg: 'CBKC-69011', side: 'maternal-mother' },
    { name: 'Soraia do Vale Imperial', reg: 'CBKC-70231', side: 'maternal-mother' }
  ],
  // Generation 4 (16 ancestors compact)
  gen4: [
    'Gaucho v.d. Teufelsbrücke', 'Asta v. Königshaus', 'Cliff v. der Holzhauss', 'Dora v. Hexenstadl',
    'Rambo v. Kummelsee', 'Nora v.d. Bärenschlucht', 'Igor v. Adlerberg', 'Sina v. Schwarzwald',
    'Cesar do Vale Negro', 'Lupa do Monte Verde', 'Eros v. Schwarzberg', 'Maya do Triângulo',
    'Duke do Imperial', 'Kira do Vale', 'Balu v.d. Bleichstrasse', 'Zelda von der Aue'
  ],
  // Generation 5 (32 ancestors compact)
  gen5: [
    'Benno v.v. Köpfer', 'Cora v.d. Seewiese', 'Odo v. Heltorf', 'Gisa v. Schwaiger Wappen',
    'Ick v. Mühlenberg', 'Ula v. Haingraben', 'Flash v. Wolfert Turm', 'Rona v. Kummelsee',
    'Arko v. Bleichstrasse', 'Hella v. Kressbach', 'Doc v. Schwaiger Forst', 'Xanti v. Adlerberg',
    'Falco v.d. Aue', 'Vroni v. Schwarzberg', 'Racker v.d. Mühle', 'Gabi do Monte Verde',
    'Axel v.d. Dachsgrube', 'Quina v. Eulenspiegel', 'Nero do Vale', 'Pérola do Triângulo',
    'Tasso v. Crossener Eck', 'Ira v. Obergrombacher', 'Dingo v. Haus Enz', 'Chantal v. Kummelsee',
    'Kongo v.d. Bleichstrasse', 'Ylva v. Heltorf', 'Boss v. Schwarzwald', 'Alfa do Vale Negro',
    'Zero v.d. Seewiese', 'Nixe v. Schwaiger', 'Graf v. Mühlenberg', 'Kora v.d. Aue'
  ]
};

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    title: 'Foto principal ausente',
    description: 'O cão Imperial Thor ainda não possui uma foto lateral cadastrada.',
    priority: 'important',
    category: 'Fotografias',
    date: 'Hoje, 14:20',
    actionText: 'Adicionar foto',
    targetDogId: 'dog-1'
  },
  {
    id: 'alt-2',
    title: 'Linhagem incompleta',
    description: 'Faltam informações dos avós maternos de Aurora do Vale Imperial.',
    priority: 'attention',
    category: 'Linhagem',
    date: 'Ontem',
    actionText: 'Completar linhagem',
    targetDogId: 'dog-2'
  },
  {
    id: 'alt-3',
    title: 'Perfil do canil incompleto',
    description: 'Adicione os links das redes sociais e logo oficial do canil.',
    priority: 'info',
    category: 'Cadastro',
    date: '23 de Julho',
    actionText: 'Completar redes'
  },
  {
    id: 'alt-4',
    title: 'Documento não anexado',
    description: 'O registro de pedigree de Zeus Imperial ainda não foi anexado.',
    priority: 'attention',
    category: 'Documentos',
    date: '20 de Julho',
    actionText: 'Anexar pedigree',
    targetDogId: 'dog-3'
  }
];

export const KENNEL_COMPLETION_CHECKLIST = [
  { label: 'Dados principais concluídos', completed: true },
  { label: 'Foto de capa adicionada', completed: true },
  { label: 'Logo adicionado', completed: true },
  { label: 'Contato público concluído', completed: true },
  { label: 'Raças cadastradas', completed: true },
  { label: 'Descrição concluída', completed: true },
  { label: 'Documentos anexados', completed: false },
  { label: 'Redes sociais integradas', completed: false }
];
