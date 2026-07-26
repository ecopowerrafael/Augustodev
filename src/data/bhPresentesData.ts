import { SmartphoneProduct, StoreInfo, ReviewItem, FaqItem, LeadFormData } from "../types/bhPresentes";

export const STORE_INFO: StoreInfo = {
  name: "BH Presentes",
  slogan: "Seu próximo smartphone está aqui.",
  complementaryText: "Celulares novos, seminovos e acessórios com ofertas especiais, garantia e atendimento rápido pelo WhatsApp.",
  logoUrl: "https://duqxk0v9olda1.cloudfront.net/profile/210x210/1783566828527-lucas-julio-de-carvalho.jpg",
  address: "Avenida Presidente Antônio Carlos, 7.500",
  neighborhood: "Pampulha",
  city: "Belo Horizonte",
  state: "MG",
  phone: "(31) 4000-2026",
  whatsapp: "5531999992026",
  whatsappDisplay: "(31) 99999-2026",
  hoursWeekdays: "Segunda a sexta: 9h às 19h",
  hoursSaturday: "Sábado: 9h às 16h",
  hoursSunday: "Domingo: fechado",
  ratingScore: 4.9,
  reviewCount: 524
};

export const FEATURED_OFFER: SmartphoneProduct = {
  id: "featured-iphone-15",
  name: "iPhone 15 — 128 GB",
  brand: "Apple",
  storage: "128 GB",
  condition: "Novo e Lacrado",
  cashPrice: 4799.00,
  installmentPrice: 5278.80,
  maxInstallments: 12,
  installmentValue: 439.90,
  badge: "Oferta da semana",
  badgeColor: "#FFC928",
  imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
  colors: ["Preto", "Azul", "Rosa", "Verde", "Amarelo"],
  specs: [
    "Tela Super Retina XDR OLED 6.1\"",
    "Câmera Dupla Avançada 48 MP",
    "Dynamic Island & Conexão USB-C",
    "Chip A16 Bionic de Alta Performance",
    "Conectividade 5G & Bateria para o Dia Todo"
  ],
  inStock: true,
  warranty: "1 Ano de Garantia Oficial Apple"
};

export const PRODUCTS_CATALOG: SmartphoneProduct[] = [
  {
    id: "iphone-15-128gb",
    name: "iPhone 15 — 128 GB",
    brand: "Apple",
    storage: "128 GB",
    condition: "Novo e Lacrado",
    cashPrice: 4799.00,
    installmentPrice: 5278.80,
    maxInstallments: 12,
    installmentValue: 439.90,
    badge: "Mais vendido",
    badgeColor: "#F04444",
    imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    colors: ["Preto", "Azul", "Rosa"],
    specs: ["Tela Super Retina XDR 6.1\"", "Câmera dupla 48 MP", "5G ultra-rápido", "1 ano garantia Apple"],
    inStock: true,
    warranty: "12 Meses Garantia Oficial"
  },
  {
    id: "samsung-s24-256gb",
    name: "Samsung Galaxy S24 — 256 GB",
    brand: "Samsung",
    storage: "256 GB",
    condition: "Novo e Lacrado",
    cashPrice: 3899.00,
    installmentPrice: 4288.80,
    maxInstallments: 12,
    installmentValue: 357.40,
    badge: "Oferta especial",
    badgeColor: "#176BFF",
    imageUrl: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    colors: ["Cinza Titânio", "Preto", "Violeta"],
    specs: ["Câmera avançada 50 MP", "Tela Dynamic AMOLED 2X", "Recursos de Inteligência Galaxy AI", "5G Integrado"],
    inStock: true,
    warranty: "12 Meses Garantia Samsung"
  },
  {
    id: "motorola-edge-50-fusion",
    name: "Motorola Edge 50 Fusion — 256 GB",
    brand: "Motorola",
    storage: "256 GB",
    condition: "Novo e Lacrado",
    cashPrice: 2199.00,
    installmentPrice: 2399.00,
    maxInstallments: 10,
    installmentValue: 239.90,
    badge: "Melhor custo-benefício",
    badgeColor: "#FFC928",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    colors: ["Azul Vegan", "Rosa Marshmallow"],
    specs: ["Carregamento ultra-rápido TurboPower", "Câmera 50 MP com OIS", "256 GB Armazenamento", "Design curvo premium"],
    inStock: true,
    warranty: "12 Meses Garantia Motorola"
  },
  {
    id: "iphone-13-128gb-seminovo",
    name: "iPhone 13 — 128 GB",
    brand: "Apple",
    storage: "128 GB",
    condition: "Seminovo Premium",
    cashPrice: 2999.00,
    installmentPrice: 3298.80,
    maxInstallments: 12,
    installmentValue: 274.90,
    badge: "Seminovo selecionado",
    badgeColor: "#25D366",
    imageUrl: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=800&q=80",
    colors: ["Meia-noite", "Estelar", "Azul"],
    specs: ["Aparelho 100% revisado", "Bateria acima de 85%", "Garantia da loja", "Estado estético impecável"],
    inStock: true,
    warranty: "90 Dias de Garantia BH Presentes"
  },
  {
    id: "xiaomi-note-13-pro-256gb",
    name: "Xiaomi Redmi Note 13 Pro 5G — 256 GB",
    brand: "Xiaomi",
    storage: "256 GB",
    condition: "Novo e Lacrado",
    cashPrice: 1899.00,
    installmentPrice: 2099.00,
    maxInstallments: 10,
    installmentValue: 209.90,
    badge: "Últimas unidades",
    badgeColor: "#F04444",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    colors: ["Preto", "Azul", "Violeta"],
    specs: ["Câmera de 200 MP com estabilização", "Tela AMOLED 120Hz", "Carregador 67W incluso", "NFC para pagamentos"],
    inStock: true,
    warranty: "12 Meses Garantia do Fabricante"
  },
  {
    id: "samsung-a55-128gb",
    name: "Samsung Galaxy A55 5G — 128 GB",
    brand: "Samsung",
    storage: "128 GB",
    condition: "Novo e Lacrado",
    cashPrice: 1799.00,
    installmentPrice: 1978.90,
    maxInstallments: 10,
    installmentValue: 197.89,
    badge: "Oferta especial",
    badgeColor: "#176BFF",
    imageUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
    colors: ["Azul Escuro", "Azul Claro", "Rosa"],
    specs: ["Acabamento em metal e vidro", "Resistência à água IP67", "Câmera 50 MP Nightography", "Bateria 5000 mAh"],
    inStock: true,
    warranty: "12 Meses Garantia Samsung"
  }
];

export const REVIEWS_LIST: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Mariana Lopes",
    location: "Pampulha, Belo Horizonte",
    rating: 5,
    comment: "Fui atendida rapidamente pelo WhatsApp e consegui retirar o celular no mesmo dia. Atendimento excelente e preço justo!",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    verified: true,
    date: "Há 2 dias",
    purchasedModel: "iPhone 15 128GB Novo"
  },
  {
    id: "rev-2",
    name: "Gustavo Almeida",
    location: "Ouro Preto, Belo Horizonte",
    rating: 5,
    comment: "Tiraram todas as minhas dúvidas no WhatsApp e me ajudaram a escolher o modelo com melhor custo-benefício. Recomendo de olhos fechados!",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    verified: true,
    date: "Há 4 dias",
    purchasedModel: "Samsung Galaxy S24"
  },
  {
    id: "rev-3",
    name: "Renata Oliveira",
    location: "São Luiz, Belo Horizonte",
    rating: 5,
    comment: "Comprei um seminovo em ótimo estado, bateria em 92% e com garantia. A experiência de compra na loja física da Pampulha foi muito tranquila.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    verified: true,
    date: "Há 1 semana",
    purchasedModel: "iPhone 13 Seminovo"
  },
  {
    id: "rev-4",
    name: "Carlos Henrique",
    location: "Santa Amélia, Belo Horizonte",
    rating: 5,
    comment: "Gostei muito da transparência nas condições de parcelamento e do atendimento presencial. Dei meu celular antigo na troca com uma avaliação justa.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    verified: true,
    date: "Há 2 semanas",
    purchasedModel: "Motorola Edge 50 Fusion"
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Os aparelhos possuem garantia?",
    answer: "Sim! Todos os nossos celulares acompanham garantia. Aparelhos novos e lacrados possuem garantia oficial do fabricante (normalmente 12 meses). Aparelhos seminovos passam por criteriosa revisão técnica e acompanham garantia da própria loja com suporte total."
  },
  {
    question: "Vocês trabalham com celulares seminovos?",
    answer: "Sim. Nossos aparelhos seminovos passam por uma rigorosa avaliação em mais de 20 itens de hardware, bateria, tela e procedência fiscal antes de serem disponibilizados para venda com garantia."
  },
  {
    question: "Posso parcelar no cartão?",
    answer: "Sim! Aceitamos as principais bandeiras de cartão de crédito e parcelamos em até 12 vezes. A quantidade de parcelas e as taxas variam de acordo com o aparelho e a condição promocional escolhida."
  },
  {
    question: "Aceitam celular usado na troca (Trade-in)?",
    answer: "Sim! Seu celular antigo pode entrar como parte do pagamento. Você pode solicitar uma pré-avaliação preenchendo nosso formulário no site, e a avaliação final com valor definitivo é feita presencialmente em nossa loja na Pampulha."
  },
  {
    question: "Posso retirar na loja física?",
    answer: "Sim! Nossa loja física está localizada na Avenida Presidente Antônio Carlos, 7.500 na Pampulha. Você pode combinar o modelo pelo WhatsApp e fazer a retirada rápida com total segurança."
  },
  {
    question: "Vocês fazem entrega em Belo Horizonte e região?",
    answer: "Sim! Realizamos entregas via motoboy expresso para Belo Horizonte e cidades da Região Metropolitana. A disponibilidade, o prazo e a taxa de entrega podem ser consultados diretamente com nossos consultores no WhatsApp."
  },
  {
    question: "Os preços do site são definitivos?",
    answer: "As ofertas exibidas no protótipo são demonstrativas para referência de estoque. Os preços finais, disponibilidades de cores e memórias específicas são confirmados na conversa rápida com a equipe de vendas."
  }
];

export const INITIAL_LEAD_FORM: LeadFormData = {
  fullName: "",
  email: "",
  whatsapp: "",
  desiredSmartphone: "iPhone 15 — 128 GB",
  preferredBrand: "Apple",
  desiredStorage: "128 GB",
  conditionPreference: "Novo",
  priceRange: "De R$ 4.000 a R$ 6.000",
  paymentMethod: "Cartão parcelado",
  hasTradeIn: false,
  tradeInDetails: {
    brand: "Apple",
    model: "iPhone 11",
    storage: "64 GB",
    screenCondition: "Sem riscos",
    batteryCondition: "Acima de 80%",
    isWorking: true,
    hasBox: true,
    hasInvoice: true
  },
  observations: "",
  consent: true
};
