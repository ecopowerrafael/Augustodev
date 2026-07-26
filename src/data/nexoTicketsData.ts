import { EventItem, Operator, Order, Settlement, DREDay } from "../types/nexoTickets";

export const MOCK_EVENTS: EventItem[] = [
  {
    id: "evt-01",
    slug: "sunset-experience-2026",
    title: "Sunset Experience 2026",
    date: "2026-08-15",
    displayDate: "15 de agosto de 2026",
    time: "16h às 23h30",
    location: "Nexo Rooftop",
    address: "Avenida das Nações, 1580",
    city: "São Paulo — SP",
    category: "Música",
    minPrice: 80,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
    description: "O Sunset Experience reúne música, gastronomia e uma experiência exclusiva em um dos rooftops mais conhecidos da cidade. A edição de 2026 terá atrações especiais, estrutura premium e vista panorâmica inesquecível.",
    ageRating: "18 anos",
    organizerName: "Sunset Eventos Ltda.",
    organizerCnpj: "12.345.678/0001-90",
    spaceName: "Nexo Rooftop",
    attractions: ["DJ Lucas Ferraz", "Marina Beats", "Duo Horizon", "Convidados especiais"],
    schedule: [
      { time: "16:00", title: "Abertura dos portões e Sunset Cocktail" },
      { time: "17:00", title: "Duo Horizon (Deep House Chillout)" },
      { time: "19:00", title: "Marina Beats (Melodic Techno)" },
      { time: "21:00", title: "DJ Lucas Ferraz (Headline Set)" }
    ],
    isFeatured: true,
    badge: "DESTAQUE DA SEMANA",
    availabilityText: "Últimos ingressos do lote atual",
    ticketTiers: [
      {
        id: "tier-01",
        eventId: "evt-01",
        name: "Pista — Lote 2",
        price: 80,
        serviceFee: 8,
        available: 126,
        total: 500,
        benefits: ["Acesso geral à pista", "Atendimento em bares principais"],
        maxPerBuyer: 6
      },
      {
        id: "tier-02",
        eventId: "evt-01",
        name: "Área Premium — Lote 1",
        price: 150,
        serviceFee: 15,
        available: 42,
        total: 200,
        benefits: ["Área exclusiva em frente ao palco", "Bar dedicado", "Visão privilegiada do Pôr do Sol"],
        maxPerBuyer: 4
      },
      {
        id: "tier-03",
        eventId: "evt-01",
        name: "Camarote Experience",
        price: 280,
        serviceFee: 28,
        available: 18,
        total: 80,
        benefits: ["Acesso ao camarote elevado", "Open Bar selecionado", "Entrada prioritária sem filas", "Área climatizada reservada"],
        maxPerBuyer: 4
      },
      {
        id: "tier-04",
        eventId: "evt-01",
        name: "Mesa para 4 pessoas",
        price: 760,
        serviceFee: 76,
        available: 6,
        total: 20,
        benefits: ["Mesa privativa numerada para 4 pessoas", "Atendimento com garçom privativo", "Combo de boas-vindas"],
        maxPerBuyer: 2
      }
    ],
    splitConfig: {
      spacePercent: 20,
      operatorPercent: 80,
      feeDistributionRule: "proportional"
    }
  },
  {
    id: "evt-02",
    slug: "festival-sabores-do-mundo",
    title: "Festival Sabores do Mundo",
    date: "2026-08-22",
    displayDate: "22 e 23 de agosto de 2026",
    time: "11h às 22h",
    location: "Espaço Jardim Central",
    address: "Rua das Figueiras, 450",
    city: "Campinas — SP",
    category: "Gastronomia",
    minPrice: 35,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    description: "Um festival gastronômico ao ar livre unindo chefs internacionais, vinhos finos, cervejas artesanais e música ao vivo.",
    ageRating: "Livre",
    organizerName: "Alpha Produções",
    organizerCnpj: "23.456.789/0001-01",
    spaceName: "Espaço Jardim Central",
    attractions: ["Chef Erick Jacquin Convida", "Chorinho no Jardim", "Jazz Trio Campinas"],
    schedule: [
      { time: "11:00", title: "Abertura dos Stands e Degustação Guiada" },
      { time: "15:00", title: "Apresentação Jazz Trio" }
    ],
    isFeatured: false,
    badge: "GASTRONOMIA",
    availabilityText: "Ingressos do 1º lote disponíveis",
    ticketTiers: [
      {
        id: "tier-21",
        eventId: "evt-02",
        name: "Entrada Individual Sábado",
        price: 35,
        serviceFee: 3.5,
        available: 340,
        total: 1000,
        maxPerBuyer: 10
      },
      {
        id: "tier-22",
        eventId: "evt-02",
        name: "Passaporte 2 Dias (Sáb/Dom)",
        price: 60,
        serviceFee: 6,
        available: 120,
        total: 500,
        maxPerBuyer: 6
      }
    ],
    splitConfig: {
      spacePercent: 15,
      operatorPercent: 85,
      feeDistributionRule: "proportional"
    }
  },
  {
    id: "evt-03",
    slug: "business-connection-summit",
    title: "Business Connection Summit",
    date: "2026-09-04",
    displayDate: "4 de setembro de 2026",
    time: "08h às 19h",
    location: "Centro de Convenções Alpha",
    address: "Alameda do Rio, 200",
    city: "São Paulo — SP",
    category: "Negócios",
    minPrice: 190,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    description: "O maior encontro de executivos, investidores e startups sobre finanças, fintechs e tecnologia bancária do segundo semestre.",
    ageRating: "16 anos",
    organizerName: "Alpha Produções",
    organizerCnpj: "23.456.789/0001-01",
    spaceName: "Centro de Convenções Alpha",
    attractions: ["Painel Fintech 2027", "Keynote: Inteligência Financeira", "Feira de Rodada de Negócios"],
    schedule: [
      { time: "08:00", title: "Credenciamento e Welcome Coffee" },
      { time: "09:30", title: "Abertura Oficial e Keynote" }
    ],
    isFeatured: false,
    badge: "EXCLUSIVO",
    availabilityText: "Inscrições abertas",
    ticketTiers: [
      {
        id: "tier-31",
        eventId: "evt-03",
        name: "Ingresso Executive",
        price: 190,
        serviceFee: 19,
        available: 95,
        total: 300,
        maxPerBuyer: 5
      },
      {
        id: "tier-32",
        eventId: "evt-03",
        name: "Ingresso VIP Network + Jantar",
        price: 490,
        serviceFee: 49,
        available: 30,
        total: 100,
        maxPerBuyer: 4
      }
    ],
    splitConfig: {
      spacePercent: 25,
      operatorPercent: 75,
      feeDistributionRule: "proportional"
    }
  },
  {
    id: "evt-04",
    slug: "noite-retro-especial",
    title: "Noite Retrô — Edição Especial",
    date: "2026-09-12",
    displayDate: "12 de setembro de 2026",
    time: "22h às 05h",
    location: "Arena Vintage",
    address: "Rodovia Castelo Branco, Km 90",
    city: "Sorocaba — SP",
    category: "Festa",
    minPrice: 55,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
    description: "Uma viagem inesquecível aos sucessos das décadas de 80, 90 e 2000 com estrutura de som e iluminação nostálgica.",
    ageRating: "18 anos",
    organizerName: "Sunset Eventos Ltda.",
    organizerCnpj: "12.345.678/0001-90",
    spaceName: "Arena Vintage",
    attractions: ["Banda Flashback 80", "DJ Beto Anos 90", "VJ Live Hits"],
    schedule: [
      { time: "22:00", title: "Abertura com DJ Beto" },
      { time: "00:30", title: "Banda Flashback 80 ao vivo" }
    ],
    isFeatured: false,
    badge: "RETRO",
    availabilityText: "Lote 1 encerrando",
    ticketTiers: [
      {
        id: "tier-41",
        eventId: "evt-04",
        name: "Pista Anos 90",
        price: 55,
        serviceFee: 5.5,
        available: 210,
        total: 800,
        maxPerBuyer: 8
      }
    ],
    splitConfig: {
      spacePercent: 20,
      operatorPercent: 80,
      feeDistributionRule: "proportional"
    }
  }
];

export const MOCK_OPERATORS: Operator[] = [
  {
    id: "op-01",
    name: "Sunset Eventos Ltda.",
    companyName: "Sunset Eventos e Produções Artísticas Ltda.",
    cnpj: "12.345.678/0001-90",
    contactPerson: "Carlos Henrique Ramos",
    email: "contato@sunseteventos.com.br",
    phone: "(11) 98844-3322",
    receiverId: "REC-SUNSET-001",
    activeEventsCount: 3,
    totalVolume: 428600,
    netAmount: 336416,
    receivables: 82740,
    settledAmount: 253676,
    status: "Ativo",
    registeredAt: "2025-11-10"
  },
  {
    id: "op-02",
    name: "Alpha Produções",
    companyName: "Alpha Promoções e Eventos S.A.",
    cnpj: "23.456.789/0001-01",
    contactPerson: "Fernanda Lima",
    email: "financeiro@alphaproducoes.com.br",
    phone: "(19) 99765-1100",
    receiverId: "REC-ALPHA-002",
    activeEventsCount: 5,
    totalVolume: 256320,
    netAmount: 169505.6,
    receivables: 59740,
    settledAmount: 109765.6,
    status: "Ativo",
    registeredAt: "2026-01-15"
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-8421",
    orderNumber: "PED-2026-008421",
    createdAt: "2026-07-26 14:10",
    eventId: "evt-01",
    eventTitle: "Sunset Experience 2026",
    eventDate: "15/08/2026",
    eventLocation: "Nexo Rooftop",
    buyerName: "Marcelo Oliveira",
    buyerCpf: "123.456.789-00",
    buyerEmail: "marcelo@email.com",
    buyerPhone: "(11) 99123-4567",
    items: [
      {
        tierId: "tier-01",
        tierName: "Pista — Lote 2",
        price: 80,
        serviceFee: 8,
        participantName: "Marcelo Oliveira",
        participantCpf: "123.456.789-00",
        participantEmail: "marcelo@email.com",
        ticketCode: "ING-8X42-2026",
        qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ING-8X42-2026",
        status: "Válido"
      },
      {
        tierId: "tier-01",
        tierName: "Pista — Lote 2",
        price: 80,
        serviceFee: 8,
        participantName: "Ana Paula Oliveira",
        participantCpf: "987.654.321-00",
        participantEmail: "anapaula@email.com",
        ticketCode: "ING-8X43-2026",
        qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ING-8X43-2026",
        status: "Válido"
      }
    ],
    subtotal: 160,
    serviceFee: 16,
    discount: 0,
    grossTotal: 176,
    paymentMethod: "pix",
    paymentStatus: "Aprovado",
    pixCode: "00020126580014BR.GOV.BCB.PIX0136nexo-tickets-split-2026-pix5204000053039865406176.005802BR5925NEXO TICKETS TECNOLOGIA6009SAO PAULO62070503***6304E8A2",
    gatewayFee: 1.20,
    netTotal: 174.80,
    splitSpaceAmount: 34.96, // 20% of 174.80
    splitOperatorAmount: 139.84, // 80% of 174.80
    settlementStatus: "A receber",
    settlementDate: "2026-07-27"
  },
  {
    id: "ord-8420",
    orderNumber: "PED-2026-008420",
    createdAt: "2026-07-26 13:45",
    eventId: "evt-01",
    eventTitle: "Sunset Experience 2026",
    eventDate: "15/08/2026",
    eventLocation: "Nexo Rooftop",
    buyerName: "Rodrigo Mendes",
    buyerCpf: "321.654.987-11",
    buyerEmail: "rodrigo.mendes@gmail.com",
    buyerPhone: "(11) 98765-4321",
    items: [
      {
        tierId: "tier-02",
        tierName: "Área Premium — Lote 1",
        price: 150,
        serviceFee: 15,
        participantName: "Rodrigo Mendes",
        participantCpf: "321.654.987-11",
        participantEmail: "rodrigo.mendes@gmail.com",
        ticketCode: "ING-9Y10-2026",
        qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ING-9Y10-2026",
        status: "Válido"
      }
    ],
    subtotal: 150,
    serviceFee: 15,
    discount: 0,
    grossTotal: 165,
    paymentMethod: "card",
    installments: {
      count: 4,
      installmentAmount: 47.57,
      totalWithInterest: 190.28,
      interestAmount: 25.28
    },
    paymentStatus: "Aprovado",
    gatewayFee: 6.80,
    netTotal: 158.20,
    splitSpaceAmount: 31.64,
    splitOperatorAmount: 126.56,
    settlementStatus: "Liquidado",
    settlementDate: "2026-07-26"
  },
  {
    id: "ord-8398",
    orderNumber: "PED-2026-008398",
    createdAt: "2026-07-25 18:20",
    eventId: "evt-01",
    eventTitle: "Sunset Experience 2026",
    eventDate: "15/08/2026",
    eventLocation: "Nexo Rooftop",
    buyerName: "Ana Carolina",
    buyerCpf: "456.789.123-44",
    buyerEmail: "ana.carolina@outlook.com",
    buyerPhone: "(11) 97111-2233",
    items: [
      {
        tierId: "tier-01",
        tierName: "Pista — Lote 2",
        price: 80,
        serviceFee: 8,
        participantName: "Ana Carolina",
        participantCpf: "456.789.123-44",
        participantEmail: "ana.carolina@outlook.com",
        ticketCode: "ING-7711-2026",
        qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ING-7711-2026",
        status: "Cancelado"
      }
    ],
    subtotal: 160,
    serviceFee: 16,
    discount: 0,
    grossTotal: 176,
    paymentMethod: "pix",
    paymentStatus: "Reembolsado",
    gatewayFee: 1.20,
    netTotal: 174.80,
    splitSpaceAmount: 0,
    splitOperatorAmount: 0,
    settlementStatus: "A receber",
    settlementDate: "2026-07-25"
  }
];

export const MOCK_SETTLEMENTS: Settlement[] = [
  {
    id: "liq-001",
    code: "LIQ-2026-00481",
    eventName: "Sunset Experience 2026",
    beneficiaryName: "Sunset Eventos Ltda.",
    beneficiaryType: "Operador",
    amount: 18940.00,
    scheduledDate: "2026-07-27",
    status: "A receber"
  },
  {
    id: "liq-002",
    code: "LIQ-2026-00480",
    eventName: "Sunset Experience 2026",
    beneficiaryName: "Nexo Rooftop",
    beneficiaryType: "Espaço",
    amount: 4735.00,
    scheduledDate: "2026-07-24",
    status: "Liquidada"
  },
  {
    id: "liq-003",
    code: "LIQ-2026-00479",
    eventName: "Festival Sabores do Mundo",
    beneficiaryName: "Alpha Produções",
    beneficiaryType: "Operador",
    amount: 12450.00,
    scheduledDate: "2026-07-23",
    status: "Liquidada"
  }
];

export const MOCK_DRE_DAYS: DREDay[] = [
  {
    date: "24/07/2026",
    salesCount: 84,
    grossAmount: 14780.00,
    gatewayFees: 812.90,
    netAmount: 13967.10,
    spaceShare: 2793.42,
    operatorShare: 11173.68
  },
  {
    date: "23/07/2026",
    salesCount: 102,
    grossAmount: 18420.00,
    gatewayFees: 994.68,
    netAmount: 17425.32,
    spaceShare: 3485.06,
    operatorShare: 13940.26
  },
  {
    date: "22/07/2026",
    salesCount: 76,
    grossAmount: 12960.00,
    gatewayFees: 686.88,
    netAmount: 12273.12,
    spaceShare: 2454.62,
    operatorShare: 9818.50
  }
];
