import { 
  PilatesClass, 
  MenuItem, 
  RunEvent, 
  RetreatItem, 
  SuiteItem, 
  WellnessExperience, 
  CertificationProgram,
  MemberProfile 
} from '../types/alkymity';

export const INITIAL_CLASSES: PilatesClass[] = [
  {
    id: 'class-1',
    title: 'Reformer Flow & Alignment',
    category: 'Reformer',
    instructor: 'Elena Rostova',
    instructorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    time: '07:30 - 08:30',
    duration: '60 min',
    date: 'Hoje, 29 Jul',
    intensity: 'Moderate',
    spotsLeft: 3,
    maxSpots: 8,
    location: 'Ocean Deck Studio - Santa Cruz',
    price: 45,
    description: 'Sequência fluida no Reformer Allegro 2 com foco em estabilização do core, alinhamento postural e respiração diafragmática com vista para o Oceano Pacífico.'
  },
  {
    id: 'class-2',
    title: 'Volcanic Core & Mobility',
    category: 'Mat',
    instructor: 'Mateo Benítez',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    time: '09:00 - 10:00',
    duration: '60 min',
    date: 'Hoje, 29 Jul',
    intensity: 'High',
    spotsLeft: 2,
    maxSpots: 12,
    location: 'Lava Rock Garden',
    price: 35,
    description: 'Treino de mat pilates de alta intensidade com peso corporal, focado em mobilidade articular profunda e ativação da cadeia posterior.'
  },
  {
    id: 'class-3',
    title: 'Sunset Breathwork & Sound Healing',
    category: 'Recovery',
    instructor: 'Aria Thorne',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    time: '17:30 - 18:30',
    duration: '60 min',
    date: 'Hoje, 29 Jul',
    intensity: 'Gentle',
    spotsLeft: 4,
    maxSpots: 15,
    location: 'Tortuga Bay Pavilion',
    price: 40,
    description: 'Imersão meditativa ao pôr do sol combinando técnicas de pranayama, tigelas de cristal de quartzo e banho de som com os ruídos naturais de Galápagos.'
  },
  {
    id: 'class-4',
    title: 'Advanced Jumpboard Reformer',
    category: 'Reformer',
    instructor: 'Elena Rostova',
    instructorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    time: '08:00 - 09:00',
    duration: '60 min',
    date: 'Amanhã, 30 Jul',
    intensity: 'High',
    spotsLeft: 1,
    maxSpots: 8,
    location: 'Ocean Deck Studio - Santa Cruz',
    price: 50,
    description: 'Sessão cardiovascular dinâmica utilizando a prancha de salto no Reformer. Fortalecimento muscular sem impacto articular.'
  },
  {
    id: 'class-5',
    title: 'Private 1-on-1 Pilates Alignment',
    category: 'Private',
    instructor: 'Mateo Benítez',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    time: '11:00 - 12:00',
    duration: '60 min',
    date: 'Amanhã, 30 Jul',
    intensity: 'All Levels',
    spotsLeft: 1,
    maxSpots: 1,
    location: 'VIP Sanctuary Suite',
    price: 120,
    description: 'Avaliação postural biomecânica personalizada e aula 100% sob medida no Cadillac, Wunda Chair e Reformer.'
  }
];

export const INITIAL_MENU: MenuItem[] = [
  {
    id: 'menu-1',
    name: 'Galápagos Energy Bowl',
    category: 'Bowls',
    price: 18,
    description: 'Açaí orgânico de cultivo sustentável, banana, spirulina das ilhas, granola artesanal de castanhas de caju e nibs de cacau equatoriano.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Açaí Puro', 'Spirulina', 'Banana', 'Granola Sem Glúten', 'Nibs de Cacau', 'Mel de Galápagos'],
    dietary: ['Vegan', 'Gluten-Free', 'Organic'],
    calories: 380,
    protein: '12g'
  },
  {
    id: 'menu-2',
    name: 'Volcano Green Cold-Pressed Juice',
    category: 'Functional Drinks',
    price: 10,
    description: 'Prensado a frio no dia: couve, pepino orgânico, maçã verde, gengibre selvagem, hortelã e limão siciliano.',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Couve Orgânica', 'Pepino', 'Maçã Verde', 'Gengibre', 'Limão', 'Hortelã'],
    dietary: ['Vegan', 'Gluten-Free', 'Organic', 'Keto'],
    calories: 110,
    protein: '3g'
  },
  {
    id: 'menu-3',
    name: 'Wild Salmon & Avocado Toast',
    category: 'Breakfast',
    price: 22,
    description: 'Pão de fermentação natural 48h, salmão selvagem defumado no canela, abacate de Galápagos, sementes de girassol torradas e flor de sal vulcanica.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Sourdough 48h', 'Salmão Defumado', 'Abacate Hass', 'Microgreens', 'Flor de Sal Vulcânica'],
    dietary: ['Organic', 'High-Protein'],
    calories: 450,
    protein: '28g'
  },
  {
    id: 'menu-4',
    name: 'Matcha Adaptogen Latte',
    category: 'Coffee',
    price: 9,
    description: 'Ceremonial Grade Matcha do Japão, leite de amêndoas prensado na casa, ashwagandha, óleo de coco MCT e baunilha natural.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Ceremonial Matcha', 'Leite de Amêndoas', 'Ashwagandha', 'MCT Oil', 'Baunilha Bourbon'],
    dietary: ['Vegan', 'Gluten-Free', 'Keto', 'Nut-Free'],
    calories: 140,
    protein: '4g'
  },
  {
    id: 'menu-5',
    name: 'High-Protein Island Quinoa Salad',
    category: 'Salads',
    price: 19,
    description: 'Quinoa real andina, grão-de-bico crocante, edamame, tomate-cereja orgânico, queijo de amêndoas e vinagrete de maracujá selvagem.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Quinoa Real', 'Grão de Bico', 'Edamame', 'Tomate Orgânico', 'Molho Maracujá'],
    dietary: ['Vegan', 'Gluten-Free', 'Organic', 'High-Protein'],
    calories: 410,
    protein: '22g'
  },
  {
    id: 'menu-6',
    name: 'Raw Cacao & Maca Bliss Bites',
    category: 'Desserts',
    price: 8,
    description: 'Trufas brutas sem açúcar refinado à base de tâmaras Medjool, cacau 85% equatoriano, raiz de maca andina e flor de sal.',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
    ingredients: ['Tâmaras Medjool', 'Cacau 85%', 'Maca Peruana', 'Amêndoas', 'Flor de Sal'],
    dietary: ['Vegan', 'Gluten-Free', 'Organic'],
    calories: 210,
    protein: '6g'
  }
];

export const INITIAL_RUNS: RunEvent[] = [
  {
    id: 'run-1',
    title: 'Tortuga Bay Coastal Sunrise Run',
    type: 'Sunrise Trail',
    date: 'Quinta-feira, 31 Jul',
    time: '06:15 AM',
    distance: '8.5 km',
    elevation: '+120 m',
    pace: '5:30 - 6:00 min/km',
    coach: 'Carlos Mendoza (Ex-Atleta Olímpico)',
    location: 'Partida: Alkymity Club Center - Puerto Ayora',
    attendees: 18,
    maxCapacity: 25,
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80',
    description: 'Corrida matinal guiada pela trilha vulcânica até o areal intocado de Tortuga Bay. Inclui hidratação com água de coco fresca e sessão de alongamento pós-treino.'
  },
  {
    id: 'run-2',
    title: 'Lava Tunnels & Highlands Trail Challenge',
    type: 'Lava Tunnel Dash',
    date: 'Sábado, 02 Ago',
    time: '07:00 AM',
    distance: '14.0 km',
    elevation: '+380 m',
    pace: '5:00 - 5:45 min/km',
    coach: 'Sofia Valenzuela',
    location: 'Partida: Reserva de Tartarugas Gigantes de Santa Cruz',
    attendees: 12,
    maxCapacity: 20,
    image: 'https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=800&q=80',
    description: 'Percurso desafiador pela zona alta de Galápagos cruzando túneis de lava milenares e vegetação exuberante. Exige tênis de trail run.'
  },
  {
    id: 'run-3',
    title: 'Sunset Recovery Jog & Ocean Dip',
    type: 'Recovery Walk',
    date: 'Terça-feira, 05 Ago',
    time: '17:00 PM',
    distance: '5.0 km',
    elevation: '+30 m',
    pace: '6:30 - 7:00 min/km',
    coach: 'Carlos Mendoza',
    location: 'Partida: Alkymity Suites Private Beach',
    attendees: 22,
    maxCapacity: 30,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
    description: 'Trote regenerativo em ritmo leve pela orla costeira finalizando com banho de mar em água cristalina e smoothies funcionais gelados no Alkymity Kitchen.'
  }
];

export const INITIAL_RETREATS: RetreatItem[] = [
  {
    id: 'retreat-1',
    title: 'Alkymity Galápagos Rejuvenation Retreat',
    subtitle: '7 Dias de Imersão em Pilates, Nutrição Funcional & Conexão Natural',
    dates: '12 a 18 de Outubro de 2026',
    duration: '7 Dias / 6 Noites',
    location: 'Alkymity Suites & Eco-Sanctuary, Galápagos',
    price: 4800,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      '2x Aulas diárias no Reformer & Mat ao ar livre',
      'Pensão completa com menu farm-to-table do Alkymity Kitchen',
      'Hospedagem em Suíte Oceanfront de Luxo',
      'Navegação privativa de iate por ilhas virgens',
      'Sessões de breathwork, banho de gelo e sound healing',
      'Transfer em catamarã privativo de/para o aeroporto'
    ],
    itinerary: [
      { day: 'Dia 1', title: 'Boas-Vindas & Ritual de Aterramento', desc: 'Chegada em Galápagos, recepção privativa, banho de som ao pôr do sol e jantar de boas-vindas.' },
      { day: 'Dia 2', title: 'Fortalecimento Vulcânico & Nutrição', desc: 'Pilates Reformer matinal, palestra com nutróloga, trilha em lava tunnels e banho regenerativo.' },
      { day: 'Dia 3', title: 'Oceanic Energy & Snorkeling Privativo', desc: 'Mat Pilates na praia, expedição de iate para avistamento de fauna marinha e jantar farm-to-table.' },
      { day: 'Dia 4', title: 'Silêncio, Respiração & Restauração', desc: 'Dia de desintoxicação digital, sessões estendidas de Yin Pilates e ceremônia de som com harpa marinha.' },
      { day: 'Dia 5-7', title: 'Integração & Renovação Vital', desc: 'Aulas avançadas, banhos de contraste gelo/calor e cerimônia de encerramento sob o céu estrelado das ilhas.' }
    ],
    included: [
      '6 Noites de Acomodação de Luxo',
      'Todas as Refeições Orgânicas e Bebidas Funcionais',
      'Equipamentos de Pilates e Acessórios',
      'Expedições Ecológicas Guiadas',
      'Consultoria Nutricional Individualizada'
    ],
    facilitators: [
      { name: 'Elena Rostova', role: 'Master Pilates Director', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
      { name: 'Chef Julian Santos', role: 'Head of Culinary & Nutrition', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' }
    ],
    spotsRemaining: 4
  },
  {
    id: 'retreat-2',
    title: 'Volcano & Mindful Movement Immersion',
    subtitle: '5 Dias Intensivos de Treino Corporal, Trail Running e Meditação Profunda',
    dates: '20 a 24 de Novembro de 2026',
    duration: '5 Dias / 4 Noites',
    location: 'Alkymity Highland Sanctuary',
    price: 3400,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
    highlights: [
      'Corrida de montanha com altimetria nas crateras',
      'Workshops biomecânicos de corrida e pilates',
      'Acomodação em eco-villas integradas à natureza',
      'Sessões de recovery muscular e massagens diárias'
    ],
    itinerary: [
      { day: 'Dia 1', title: 'Boas-Vindas & Teste Biomecânico', desc: 'Acomodação, avaliação biomecânica individual e jantar de nutrição de precisão.' },
      { day: 'Dia 2-4', title: 'Imersão em Movimento & Força', desc: 'Corridas matinais, Reformer Pilates com foco em atletas e crioterapia oceânica.' },
      { day: 'Dia 5', title: 'Encerramento & Celebração', desc: 'Trote suave na praia de Tortuga e brunch de celebração.' }
    ],
    included: [
      'Acomodação em Eco-Villa',
      'Alimentação Esportiva Nutritiva',
      'Massagens de Recovery',
      'Guia de Trail Run Exclusivo'
    ],
    facilitators: [
      { name: 'Carlos Mendoza', role: 'Head Coach Running Club', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
      { name: 'Aria Thorne', role: 'Mindfulness & Breathwork Lead', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' }
    ],
    spotsRemaining: 2
  }
];

export const INITIAL_SUITES: SuiteItem[] = [
  {
    id: 'suite-1',
    name: 'San Cristóbal Master Ocean Suite',
    tagline: 'Vista panorâmica para o Oceano Pacífico com piscina privativa de borda infinita.',
    pricePerNight: 850,
    maxGuests: 2,
    size: '110 m²',
    bed: 'King Size com Enxoval de Algodão Egípcio 800 fios',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'Piscina Privativa Aquecida',
      'Acesso Ilimitado ao Alkymity Studio',
      'Café da Manhã Orgânico na Suíte',
      'Tapete de Pilates & Prop Kit na Suíte',
      'Banheira de Imersão em Rocha Vulcânica',
      'Serviço de Mordomo Privativo 24h',
      'Wi-Fi de Alta Velocidade via Satélite Starlink'
    ],
    description: 'Concebida para elevar seus sentidos ao ápice da tranquilidade. A Master Ocean Suite combina arquitetura sustentável em madeira de teca e pedra vulcânica local com acabamentos minimalistas refinados.',
    oceanView: true,
    privatePool: true
  },
  {
    id: 'suite-2',
    name: 'Tortuga Luxury Beachfront Villa',
    tagline: 'Acesso direto à areia de Tortuga Bay com jardim privativo e deck de meditação.',
    pricePerNight: 1200,
    maxGuests: 4,
    size: '180 m²',
    bed: '2 Suítes King + Sala de Estar Conversível',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'Acesso Privativo à Praia',
      'Deck Exclusivo para Prática de Yoga/Pilates',
      'Cozinha Gourmet com Chef Privativo Sob Demanda',
      'Ducha Externa em Pedra Natural',
      'Crédito Diário de $100 no Alkymity Kitchen',
      'Bikes de Bambu Esportivas Incluídas'
    ],
    description: 'Perfeita para famílias ou pequenos grupos buscando exclusividade total. Espaços amplos integrados com a brisa do oceano e luz natural abundante.',
    oceanView: true,
    privatePool: true
  },
  {
    id: 'suite-3',
    name: 'Lava Rock Sanctuary Room',
    tagline: 'Refúgio de bem-estar minimalista rodeado pela vegetação nativa das ilhas.',
    pricePerNight: 550,
    maxGuests: 2,
    size: '65 m²',
    bed: 'King Size Ortopédico',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80'
    ],
    amenities: [
      'Varanda com Rede e Vista para os Jardins',
      'Acesso ao Studio e Running Club',
      'Amenities de Cuidado Orgânicos da Ilha',
      'Difusor de Óleos Essenciais Botânicos',
      'Frigobar com Sucos Funcionais Diários'
    ],
    description: 'Um casulo de aconchego e regeneração profunda. Design sereno que abraça a pedra vulcânica escura e tons neutros de terra.',
    oceanView: false,
    privatePool: false
  }
];

export const INITIAL_EXPERIENCES: WellnessExperience[] = [
  {
    id: 'exp-1',
    title: 'Tortuga Bay Sunrise Pilates & Fresh Coconut Ritual',
    category: 'Breathwork',
    duration: '90 min',
    price: 65,
    location: 'Tortuga Bay Beach Headland',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    description: 'Comece o dia praticando Mat Pilates na areia branca ao amanhecer, seguido por respiração consciente e hidratação com coco fresco direto do produtor local.',
    rating: 4.98,
    reviewsCount: 42
  },
  {
    id: 'exp-2',
    title: 'Volcanic Ice Bath & Infrared Sauna Recovery',
    category: 'Ice Bath Recovery',
    duration: '75 min',
    price: 80,
    location: 'Alkymity Hydrotherapy Lab',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    description: 'Sessão guiada de contraste térmico com imersão em água gelada a 3°C assistida por especialista em respiração, seguida por sauna de infravermelho e chá herbal.',
    rating: 5.0,
    reviewsCount: 38
  },
  {
    id: 'exp-3',
    title: 'Galápagos Organic Farm-to-Table Gastronomic Dinner',
    category: 'Farm-to-Table',
    duration: '3 Horas',
    price: 135,
    location: 'Alkymity Kitchen Garden Table',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    description: 'Jantar degustação em 6 tempos elaborado pelo nosso Head Chef, harmonizado com kombuchas artesanais e vinhos orgânicos biodinâmicos.',
    rating: 4.95,
    reviewsCount: 29
  }
];

export const INITIAL_CERTIFICATIONS: CertificationProgram[] = [
  {
    id: 'cert-1',
    title: '200h Comprehensive Reformer Pilates Teacher Certification',
    level: 'Nível I & II (Internacional)',
    hours: '200 Horas',
    modality: 'Híbrido (Online + Imersão)',
    dates: 'Início: 15 de Setembro de 2026',
    instructor: 'Elena Rostova & Guest Masters',
    investment: 2900,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    description: 'Formação completa reconhecida internacionalmente para instrutores de Pilates Reformer. Módulos avançados de anatomia funcional, biomecânica, comandos verbais e modificações de lesões.',
    modules: [
      'Anatomia Aplicada e Biomecânica do Core',
      'Reformer Allegro Level 1, 2 e 3 Repertoire',
      'Postural Analysis & Special Populations',
      'Didática de Ensino e Programação de Aulas',
      'Estágio Prático Guiado em Galápagos (10 dias)'
    ]
  },
  {
    id: 'cert-2',
    title: 'Breathwork & Sound Healing Facilitator Training',
    level: 'Certificação Avançada',
    hours: '80 Horas',
    modality: 'Presencial (Galápagos)',
    dates: '20 a 27 de Outubro de 2026',
    instructor: 'Aria Thorne',
    investment: 1650,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    description: 'Capacitação teórica e prática para liderar sessões de respiração consciente, banho de som e regulação do sistema nervoso autônomo.',
    modules: [
      'Fisiologia da Respiração & Hipoxia Controlada',
      'Acústica dos Instrumentos Terapêuticos',
      'Facilitação de Grupos & Presença Energética',
      'Protocolos de Imersão em Água & Natureza'
    ]
  }
];

export const INITIAL_MEMBER_PROFILE: MemberProfile = {
  name: 'Isabella Silveira',
  email: 'isabella.silveira@alkymity.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  tier: 'Galápagos Founder',
  creditsRemaining: 8,
  totalClassesAttended: 34,
  nextBooking: {
    type: 'Reformer Pilates',
    title: 'Reformer Flow & Alignment',
    date: 'Hoje, 29 Jul',
    time: '07:30 - 08:30',
    location: 'Ocean Deck Studio - Santa Cruz'
  },
  membershipExpiry: '31 de Dezembro de 2026'
};
