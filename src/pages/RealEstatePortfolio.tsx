import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, 
  MapPin, 
  Maximize2, 
  BedDouble, 
  Car, 
  Calendar, 
  Phone, 
  Mail, 
  MessageSquare, 
  Search, 
  Filter, 
  Check, 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Compass, 
  ChevronRight, 
  Award,
  Sparkles,
  ShieldCheck,
  Building,
  Terminal,
  Code2,
  Heart,
  Info,
  DollarSign,
  Calculator,
  Link,
  FileText,
  RefreshCw,
  Copy,
  Layers,
  HelpCircle
} from "lucide-react";

// Image Paths imported as ES Modules for production bundling
import mansionImg from "../assets/images/luxury_mansion_sp_1784137092375.jpg";
import penthouseImg from "../assets/images/luxury_penthouse_sp_1784137106538.jpg";
import beachHouseImg from "../assets/images/luxury_beach_house_1784137120735.jpg";

interface Property {
  id: string;
  title: string;
  category: "Mansão" | "Cobertura" | "Villa Praia" | "Casa de Campo" | "Loft Industrial";
  purpose: "Venda" | "Aluguel";
  price: number;
  location: string;
  neighborhood: string;
  area: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parking: number;
  image: string;
  description: string;
  highlights: string[];
  features: string[];
  tagline: string;
  year: number;
}

export default function RealEstatePortfolio({ onBack }: { onBack?: () => void }) {
  // NAVIGATION & VIEWS
  // 'search' = Real search & top filters template page
  // 'detail' = Property details template page
  const [currentTab, setCurrentTab] = useState<"search" | "detail">("search");
  
  // SELECTION STATES FOR REAL PORTFOLIO
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("mansao-jardins");
  const [wishlist, setWishlist] = useState<string[]>(["mansao-jardins", "cobertura-itaim"]);
  
  // WIX WEBHOOK / LOG CONSOLE TERMINAL
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "System initiated: Connect Wix Collection 'Imoveis' to frontend components...",
    "Ready to generate custom Velo code based on requested filter combinations."
  ]);

  // TOAST ALERT
  const [toast, setToast] = useState<string | null>(null);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setTerminalLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 15)]);
  };

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // 1. EXTENDED PROPERTIES DATABASE
  const properties: Property[] = [
    {
      id: "mansao-jardins",
      title: "Casa Origami: Uma Obra de Arte Arquitetônica nos Jardins",
      category: "Mansão",
      purpose: "Venda",
      price: 18500000,
      location: "São Paulo, SP",
      neighborhood: "Jardins",
      area: 780,
      bedrooms: 4,
      suites: 4,
      bathrooms: 6,
      parking: 5,
      image: mansionImg,
      description: "Concebida por um renomado escritório internacional, a Casa Origami redefine o conceito de moradia urbana de luxo. Estruturada em balanços de concreto aparente e painéis de vidro termoacústico, o imóvel valoriza a iluminação natural e a privacidade. Um oásis com paisagismo exuberante e piscina integrada ao living de pé-direito duplo.",
      highlights: [
        "Piscina aquecida integrada ao living principal",
        "Piso em autêntico mármore Travertino Navona",
        "Automação residencial total por comando de voz e tablet",
        "Adega subterrânea climatizada com capacidade para 800 garrafas"
      ],
      features: ["Piscina", "Automação", "Adega", "Segurança 24h", "Placas Solares", "Concreto Aparente"],
      tagline: "Assinatura arquitetônica contemporânea com fluidez de concreto e luz natural.",
      year: 2025
    },
    {
      id: "cobertura-itaim",
      title: "Penthouse Horizon: Vista 360° Exclusiva no Itaim Bibi",
      category: "Cobertura",
      purpose: "Venda",
      price: 24000000,
      location: "São Paulo, SP",
      neighborhood: "Itaim Bibi",
      area: 620,
      bedrooms: 3,
      suites: 3,
      bathrooms: 5,
      parking: 4,
      image: penthouseImg,
      description: "Localizada no quadrilátero mais desejado do Itaim Bibi, esta cobertura duplex combina sofisticação contemporânea com lazer privativo incomparável. Com acabamentos em nogueira americana, o imóvel conta com área externa gourmet completa, deck elevado de madeira nobre e hidromassagem suspensa de frente para a linha do horizonte.",
      highlights: [
        "Vista panorâmica indevassável de todo o skyline corporativo",
        "Suíte master equipada com closet duplo e banho Sr. e Sra.",
        "Espaço gourmet de design minimalista com eletros italianos",
        "Gerador de energia redundante que atende a toda a unidade"
      ],
      features: ["Vista Panorâmica", "Gerador", "Jacuzzi Privativa", "Elevador Biométrico", "Portaria Blindada"],
      tagline: "O céu como vizinho na região de negócios mais nobre da América Latina.",
      year: 2024
    },
    {
      id: "villa-guaruja",
      title: "Villa Acqua: O Refúgio Perfeito Pé na Areia no Guarujá",
      category: "Villa Praia",
      purpose: "Venda",
      price: 14200000,
      location: "Guarujá, SP",
      neighborhood: "Península",
      area: 540,
      bedrooms: 5,
      suites: 5,
      bathrooms: 7,
      parking: 6,
      image: beachHouseImg,
      description: "Debruçada sobre o mar, a Villa Acqua proporciona o privilégio de acordar ouvindo o balanço das ondas. Uma estrutura leve e natural, onde a madeira de reflorestamento e as pedras naturais criam uma atmosfera de sofisticação pé na areia. Piscina de borda infinita que se confunde com o azul do oceano.",
      highlights: [
        "Acesso direto e privativo à praia semi-exclusiva",
        "Piscina infinita com borda em painel de acrílico voltada para o mar",
        "Área de spa completa com sauna úmida e deck de ioga",
        "Suítes com sacadas panorâmicas suspensas sobre a costeira"
      ],
      features: ["Pé na Areia", "Piscina", "Sauna Seca/Úmida", "Heliponto no Condomínio", "Deck de Madeira"],
      tagline: "Liberdade litorânea luxuosa moldada por madeira nobre e pedras naturais.",
      year: 2025
    },
    {
      id: "residencia-boa-vista",
      title: "Residência Biomórfica: Curvas de Madeira na Boa Vista",
      category: "Casa de Campo",
      purpose: "Venda",
      price: 29500000,
      location: "Porto Feliz, SP",
      neighborhood: "Fazenda Boa Vista",
      area: 1150,
      bedrooms: 6,
      suites: 6,
      bathrooms: 8,
      parking: 8,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      description: "Uma obra-prima estrutural esculpida em madeira laminada colada (MLC) que flutua elegantemente sobre os gramados da Fazenda Boa Vista. O telhado ondulado imita a topografia das colinas locais. Uma integração espetacular de interiores com o campo de golfe privativo ao fundo.",
      highlights: [
        "Arquitetura orgânica premiada internacionalmente",
        "Adega climatizada escavada na rocha natural",
        "Quadra de tênis de saibro integrada ao paisagismo",
        "Piscina com raia de 25m e borda infinita total"
      ],
      features: ["Piscina", "Quadra de Tênis", "Adega", "Automação", "Gerador", "Segurança 24h"],
      tagline: "O ápice do lazer de campo refinado a apenas uma hora da capital paulista.",
      year: 2025
    },
    {
      id: "loft-pinheiros",
      title: "Loft Industrial Bauhaus: Concreto e História em Pinheiros",
      category: "Loft Industrial",
      purpose: "Aluguel",
      price: 18000,
      location: "São Paulo, SP",
      neighborhood: "Pinheiros",
      area: 210,
      bedrooms: 2,
      suites: 2,
      bathrooms: 3,
      parking: 3,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      description: "Com pé-direito duplo de 6 metros, este loft traz o charme dos distritos industriais de Nova York com o rigor do acabamento europeu moderno. Paredes de tijolos de demolição aparentes, escadas helicoidais em aço patinado e enormes esquadrias que banham o espaço de luz o dia inteiro.",
      highlights: [
        "Pé-direito duplo monumental de 6 metros livres",
        "Cozinha integrada planejada com ferragens de alto padrão",
        "Mezanino suspenso abrigando a suíte master integrada",
        "Localização super conectada no coração criativo de Pinheiros"
      ],
      features: ["Elevador Biométrico", "Piso de Cimento Queimado", "Isolamento Acústico", "Sacada Integrada"],
      tagline: "Viver contemporâneo com espírito cosmopolita e estética industrial autêntica.",
      year: 2023
    },
    {
      id: "cobertura-moema",
      title: "Penthouse Sálvia: Vista para as Copas das Árvores em Moema",
      category: "Cobertura",
      purpose: "Venda",
      price: 11200000,
      location: "São Paulo, SP",
      neighborhood: "Moema",
      area: 395,
      bedrooms: 4,
      suites: 4,
      bathrooms: 5,
      parking: 4,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      description: "Uma maravilhosa cobertura linear que se projeta em direção à massa verde do Parque do Ibirapuera. Repleta de floreiras integradas e janelas do chão ao teto. O terraço conta com uma piscina de alvenaria revestida em pedra vulcânica verde e ampla churrasqueira sob uma pérgula minimalista.",
      highlights: [
        "Localização exclusiva fora da rota de aviões de Moema Pássaros",
        "Piscina privativa revestida em pedra Hijau natural",
        "Projeto luminotécnico minimalista totalmente em LED embutido",
        "Varanda com fechamento em painéis de vidro retráteis sem trilho"
      ],
      features: ["Piscina", "Vista Panorâmica", "Portaria Blindada", "Automação", "Gerador"],
      tagline: "A união harmônica entre a conveniência urbana e o bem-estar botânico do parque.",
      year: 2024
    },
    {
      id: "mansao-tambore",
      title: "Mansão das Palmeiras: Grandiosidade Neoclássica em Tamboré",
      category: "Mansão",
      purpose: "Venda",
      price: 13900000,
      location: "Barueri, SP",
      neighborhood: "Tamboré",
      area: 920,
      bedrooms: 5,
      suites: 5,
      bathrooms: 7,
      parking: 6,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      description: "Uma imponente residência com colunas neoclássicas puras, pé-direito quádruplo no hall de entrada e escadarias imperiais de mármore crema marfil. Projetada para famílias que prezam por grandiosidade física, recepções luxuosas e lazer total sem sair do perímetro residencial.",
      highlights: [
        "Hall de entrada majestoso com lustre de cristal de 3m",
        "Cinema privativo acústico profissional com 12 poltronas reclináveis",
        "Espaço fitness completo com equipamentos de última geração",
        "Grande jardim plano com palmeiras imperiais centenárias"
      ],
      features: ["Piscina", "Cinema Privativo", "Academia", "Segurança 24h", "Placas Solares", "Dependência"],
      tagline: "Proporções clássicas monumentais aliadas a tecnologia construtiva de ponta.",
      year: 2023
    },
    {
      id: "refugio-salvia-campinas",
      title: "Refúgio Sálvia: Transparência e Natureza no Gramado",
      category: "Casa de Campo",
      purpose: "Aluguel",
      price: 25000,
      location: "Campinas, SP",
      neighborhood: "Gramado",
      area: 510,
      bedrooms: 4,
      suites: 4,
      bathrooms: 6,
      parking: 5,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      description: "Toda estruturada em perfis de aço corten e fechamentos em vidro temperado duplo termoacústico. Esta casa de campo abraça árvores centenárias pré-existentes na topografia do lote, criando um pátio central de contemplação zen. O barulho de um riacho natural corre rente à propriedade.",
      highlights: [
        "Vidros duplos que garantem silêncio absoluto e conforto térmico",
        "Pátio interno de contemplação com jabuticabeiras preservadas",
        "Espaço gourmet suspenso integrado a uma ponte metálica",
        "Energia fotovoltaica autossuficiente com banco de baterias Tesla"
      ],
      features: ["Piscina", "Automação", "Placas Solares", "Isolamento Acústico", "Deck de Madeira"],
      tagline: "Um manifesto de leveza arquitetônica, onde os limites entre o dentro e o fora desaparecem.",
      year: 2025
    }
  ];

  // 2. SEARCH & ADVANCED FILTER STATE
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterPurpose, setFilterPurpose] = useState<"Todos" | "Venda" | "Aluguel">("Todos");
  const [filterCategory, setFilterCategory] = useState<"Todos" | "Mansão" | "Cobertura" | "Villa Praia" | "Casa de Campo" | "Loft Industrial">("Todos");
  const [filterNeighborhood, setFilterNeighborhood] = useState<string>("Todos");
  const [filterMaxPrice, setFilterMaxPrice] = useState<number>(35000000);
  const [filterMinSuites, setFilterMinSuites] = useState<string>("Qualquer");
  const [filterMinParking, setFilterMinParking] = useState<string>("Qualquer");
  const [filterSelectedFeatures, setFilterSelectedFeatures] = useState<string[]>([]);

  // Distinct values for select options
  const neighborhoods = ["Todos", "Jardins", "Itaim Bibi", "Moema", "Pinheiros", "Tamboré", "Fazenda Boa Vista", "Península"];
  const allFeatures = ["Piscina", "Automação", "Adega", "Segurança 24h", "Placas Solares", "Concreto Aparente", "Vista Panorâmica", "Gerador", "Jacuzzi Privativa", "Elevador Biométrico", "Pé na Areia", "Quadra de Tênis", "Cinema Privativo", "Academia"];

  // Toggle dynamic features filter
  const handleFeatureToggle = (feature: string) => {
    setFilterSelectedFeatures(prev => {
      const updated = prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature];
      addLog(`Feature filter toggled: [${updated.join(", ")}]`);
      return updated;
    });
  };

  // Filter application logic
  const filteredProperties = properties.filter(p => {
    // Search term checks title, description, neighborhood, location
    const matchesSearch = searchTerm === "" || 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPurpose = filterPurpose === "Todos" || p.purpose === filterPurpose;
    const matchesCategory = filterCategory === "Todos" || p.category === filterCategory;
    const matchesNeighborhood = filterNeighborhood === "Todos" || p.neighborhood === filterNeighborhood;
    
    // Rent prices are low (under 100k), sale prices are high. Normalize price logic or match straight.
    // If renting and purpose is rental, filter limits apply.
    const matchesPrice = p.price <= filterMaxPrice;

    const suitesCount = parseInt(filterMinSuites);
    const matchesSuites = filterMinSuites === "Qualquer" || p.suites >= suitesCount;

    const parkingCount = parseInt(filterMinParking);
    const matchesParking = filterMinParking === "Qualquer" || p.parking >= parkingCount;

    const matchesFeatures = filterSelectedFeatures.every(f => p.features.includes(f));

    return matchesSearch && matchesPurpose && matchesCategory && matchesNeighborhood && matchesPrice && matchesSuites && matchesParking && matchesFeatures;
  });

  const resetAllFilters = () => {
    setSearchTerm("");
    setFilterPurpose("Todos");
    setFilterCategory("Todos");
    setFilterNeighborhood("Todos");
    setFilterMaxPrice(35000000);
    setFilterMinSuites("Qualquer");
    setFilterMinParking("Qualquer");
    setFilterSelectedFeatures([]);
    addLog("All search filters reset to defaults.");
    triggerToast("Filtros limpos!");
  };

  // 3. AI LIFESTYLE MATCHMAKER
  const [lifestyleText, setLifestyleText] = useState<string>("");
  const [lifestyleMatched, setLifestyleMatched] = useState<Property | null>(null);
  const [lifestyleSearching, setLifestyleSearching] = useState<boolean>(false);

  const handleLifestyleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lifestyleText.trim()) return;

    setLifestyleSearching(true);
    addLog(`AI Matchmaker analyzing: "${lifestyleText}"`);

    setTimeout(() => {
      const text = lifestyleText.toLowerCase();
      let bestMatch = properties[0];
      let maxScore = -1;

      properties.forEach(p => {
        let score = 0;
        // Search matches keywords in features and text
        if (text.includes("paz") || text.includes("verde") || text.includes("silêncio") || text.includes("campo") || text.includes("árvores") || text.includes("mato")) {
          if (p.category === "Casa de Campo") score += 10;
          if (p.features.includes("Placas Solares")) score += 3;
        }
        if (text.includes("mar") || text.includes("praia") || text.includes("areia") || text.includes("onda") || text.includes("litoral")) {
          if (p.category === "Villa Praia" || p.features.includes("Pé na Areia")) score += 10;
        }
        if (text.includes("corporativo") || text.includes("faria lima") || text.includes("negócios") || text.includes("itaim") || text.includes("trabalho") || text.includes("escritório")) {
          if (p.neighborhood === "Itaim Bibi" || p.neighborhood === "Jardins") score += 8;
          if (p.category === "Cobertura" || p.category === "Loft Industrial") score += 5;
        }
        if (text.includes("amigos") || text.includes("receber") || text.includes("festa") || text.includes("churrasco") || text.includes("jantar") || text.includes("adega") || text.includes("piscina")) {
          if (p.features.includes("Adega") || p.features.includes("Cinema Privativo")) score += 6;
          if (p.features.includes("Piscina")) score += 4;
          if (p.area > 600) score += 3;
        }
        if (text.includes("tecnologia") || text.includes("moderno") || text.includes("automação") || text.includes("inteligente") || text.includes("som") || text.includes("futurista")) {
          if (p.features.includes("Automação")) score += 10;
        }
        if (text.includes("família") || text.includes("filhos") || text.includes("grande") || text.includes("seguro") || text.includes("crianças")) {
          if (p.bedrooms >= 5) score += 5;
          if (p.features.includes("Segurança 24h")) score += 5;
        }

        // Add small random weight to avoid identical duplicates and give natural feel
        score += Math.random() * 1.5;

        if (score > maxScore) {
          maxScore = score;
          bestMatch = p;
        }
      });

      setLifestyleMatched(bestMatch);
      setLifestyleSearching(false);
      addLog(`AI Matchmaker selected: "${bestMatch.title}" (Score match: ${maxScore.toFixed(1)})`);
      triggerToast("Imóvel correspondente localizado!");
    }, 1200);
  };

  // 4. ACTIVE PROPERTY FOR MAIN DETAILS PAGE
  const activeProperty = properties.find(p => p.id === selectedPropertyId) || properties[0];

  // 5. INTERACTIVE MORTGAGE FINANCING SIMULATOR
  const [simDownPayment, setSimDownPayment] = useState<number>(30); // 30% standard
  const [simYears, setSimYears] = useState<number>(20); // 20 years
  const [simInterest, setSimInterest] = useState<number>(10.75); // standard brazilian Selic/Mortgage rate
  const [mortgageSummary, setMortgageSummary] = useState({
    financedAmount: 0,
    monthlyPayment: 0,
    downPaymentValue: 0,
    totalInterestPaid: 0
  });

  const calculateMortgage = () => {
    const propertyPrice = activeProperty.price;
    const downPaymentValue = propertyPrice * (simDownPayment / 100);
    const financedAmount = propertyPrice - downPaymentValue;
    
    // Monthly rate
    const r = (simInterest / 100) / 12;
    // Total months
    const n = simYears * 12;

    // Price Amortization formula
    let monthlyPayment = 0;
    if (r === 0) {
      monthlyPayment = financedAmount / n;
    } else {
      monthlyPayment = financedAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPaidOverTime = monthlyPayment * n;
    const totalInterestPaid = Math.max(0, totalPaidOverTime - financedAmount);

    setMortgageSummary({
      financedAmount,
      monthlyPayment,
      downPaymentValue,
      totalInterestPaid
    });
  };

  useEffect(() => {
    calculateMortgage();
  }, [selectedPropertyId, simDownPayment, simYears, simInterest]);

  // 6. SCHEDULER FORM STATE
  const [scheduleName, setScheduleName] = useState<string>("");
  const [schedulePhone, setSchedulePhone] = useState<string>("");
  const [scheduleDate, setScheduleDate] = useState<string>("");
  const [scheduleTime, setScheduleTime] = useState<string>("");
  const [scheduleSubmitted, setScheduleSubmitted] = useState<boolean>(false);

  const handleScheduleVisit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleName || !schedulePhone || !scheduleDate || !scheduleTime) return;
    
    setScheduleSubmitted(true);
    addLog(`Visit requested for '${activeProperty.title}' on ${scheduleDate} at ${scheduleTime} by ${scheduleName}.`);
    
    // Send simulated webhook payload to Wix CRM
    setTimeout(() => {
      addLog(`Wix Database Triggered: createRecord('Leads_Visitas', { name: "${scheduleName}", phone: "${schedulePhone}", property: "${activeProperty.id}", date: "${scheduleDate}" })`);
    }, 800);

    setTimeout(() => {
      setScheduleSubmitted(false);
      setScheduleName("");
      setSchedulePhone("");
      setScheduleDate("");
      setScheduleTime("");
      triggerToast("Solicitação de visita registrada!");
    }, 5000);
  };

  const handleToggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (wishlist.includes(id)) {
      setWishlist(prev => prev.filter(item => item !== id));
      addLog(`Removed from favorites: ${id}`);
      triggerToast("Removido dos favoritos.");
    } else {
      setWishlist(prev => [...prev, id]);
      addLog(`Added to favorites: ${id}`);
      triggerToast("Salvo nos seus favoritos!");
    }
  };

  // 7. WIX VELO DYNAMIC CODE GENERATOR CODE GENERATION
  // Generates different code blocks based on which filters are checked
  const [veloFiltersState, setVeloFiltersState] = useState({
    neighborhood: true,
    price: true,
    suites: true,
    parking: true,
    features: false
  });

  const getGeneratedVeloCode = () => {
    return `import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w.onReady(function () {
  // Inicialização ao carregar a página modelo
  setupFilters();

  // Escuta as alterações no topo dos filtros
  $w('#searchBar').onInput(() => debounceFilter());
  $w('#btnFilterBuy').onClick(() => { setPurpose('Venda'); applyFilters(); });
  $w('#btnFilterRent').onClick(() => { setPurpose('Aluguel'); applyFilters(); });
  $w('#categoryDropdown').onChange(() => applyFilters());
${veloFiltersState.neighborhood ? "  $w('#neighborhoodSelect').onChange(() => applyFilters());\n" : ""}${veloFiltersState.price ? "  $w('#priceSlider').onChange(() => applyFilters());\n" : ""}${veloFiltersState.suites ? "  $w('#suitesDropdown').onChange(() => applyFilters());\n" : ""}${veloFiltersState.parking ? "  $w('#parkingDropdown').onChange(() => applyFilters());\n" : ""}${veloFiltersState.features ? "  $w('#featuresCheckboxGroup').onChange(() => applyFilters());\n" : ""}
  // Configura o repeater dinâmico para a Exibição de Detalhes
  $w('#propertyRepeater').onItemReady(($item, itemData) => {
    $item('#propertyTitle').text = itemData.title;
    $item('#propertyPrice').text = formatPrice(itemData.price, itemData.purpose);
    $item('#propertyImage').src = itemData.image;

    // Transição de filtro entre páginas usando Query String
    $item('#cardContainer').onClick(() => {
      wixLocation.to(\`/imovel-detalhes?id=\${itemData._id}\`);
    });
  });
});

// Mecanismo principal de filtro de banco de dados
function applyFilters() {
  let query = wixData.query("Imoveis");
  const searchVal = $w('#searchBar').value;
  const categoryVal = $w('#categoryDropdown').value;

  if (searchVal) {
    query = query.contains("title", searchVal)
      .or(query.contains("neighborhood", searchVal));
  }

  if (categoryVal && categoryVal !== "Todos") {
    query = query.eq("category", categoryVal);
  }

  if (currentPurpose && currentPurpose !== "Todos") {
    query = query.eq("purpose", currentPurpose);
  }
${veloFiltersState.neighborhood ? `
  const neighborhoodVal = $w('#neighborhoodSelect').value;
  if (neighborhoodVal && neighborhoodVal !== "Todos") {
    query = query.eq("neighborhood", neighborhoodVal);
  }` : ""}${veloFiltersState.price ? `

  const maxPriceVal = $w('#priceSlider').value;
  if (maxPriceVal) {
    query = query.le("price", maxPriceVal);
  }` : ""}${veloFiltersState.suites ? `

  const suitesVal = $w('#suitesDropdown').value;
  if (suitesVal && suitesVal !== "Qualquer") {
    query = query.ge("suites", Number(suitesVal));
  }` : ""}${veloFiltersState.parking ? `

  const parkingVal = $w('#parkingDropdown').value;
  if (parkingVal && parkingVal !== "Qualquer") {
    query = query.ge("parking", Number(parkingVal));
  }` : ""}${veloFiltersState.features ? `

  const selectedFeatures = $w('#featuresCheckboxGroup').value;
  if (selectedFeatures && selectedFeatures.length > 0) {
    selectedFeatures.forEach(feat => {
      query = query.hasAll("features", feat);
    });
  }` : ""}

  query.find()
    .then((results) => {
      $w('#propertyRepeater').data = results.items;
      $w('#noResultsText').expand();
      if (results.items.length > 0) {
        $w('#noResultsText').collapse();
      }
    })
    .catch((err) => {
      console.error("Erro na busca filtrada Wix:", err);
    });
}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    triggerToast("Código Velo copiado para a área de transferência!");
    addLog("Velo source code copied to user clipboard.");
  };

  const selectPropertyAndNavigate = (id: string) => {
    setSelectedPropertyId(id);
    setCurrentTab("detail");
    addLog(`Navigated dynamically to property details template: '${id}'`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1C1E] font-sans antialiased relative selection:bg-[#C5A880]/30 selection:text-black pb-12">
      
      {/* Dynamic top-level luxury visual indicator line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#D4AF37] via-[#C5A880] to-[#E5D2B3] fixed top-0 left-0 right-0 z-50" />

      {/* Floating Developer Hub back button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-3 py-2 bg-[#1C2029]/95 text-white hover:bg-black border border-white/10 rounded-lg shadow-2xl text-xs font-mono tracking-wider transition-all duration-300 group hover:border-[#C5A880]/50"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-[#C5A880] group-hover:-translate-x-1 transition-transform" />
          <span className="text-white/60 group-hover:text-white uppercase font-bold text-[10px]">VER PORTFÓLIO</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
        </button>
      </div>

      {/* MAIN COHESIVE HEADER */}
      <header className="sticky top-1.5 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-40 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2 bg-[#1C2029] rounded-lg text-[#C5A880] flex items-center justify-center shadow-lg">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <span className="font-serif font-black tracking-widest text-lg uppercase text-[#1C2029] block">
                VERTIKA
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#C5A880] uppercase font-bold block">
                INTELLIGENT FILTERS
              </span>
            </div>
          </div>

          {/* Core Interactive Tabs for Portfolio Navigation */}
          <nav className="flex items-center space-x-1 sm:space-x-3 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => { setCurrentTab("search"); addLog("Switched view to 'Página Modelo de Pesquisa & Filtros'"); }}
              className={`py-2 px-3 sm:px-4 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                currentTab === "search" 
                  ? "bg-[#1C2029] text-[#C5A880] shadow-sm" 
                  : "text-gray-500 hover:text-black hover:bg-gray-50"
              }`}
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Página Modelo de Pesquisa</span>
              <span className="md:hidden">Pesquisa</span>
            </button>
            
            <button
              onClick={() => { setCurrentTab("detail"); addLog(`Switched view to 'Página de Exibição' (${selectedPropertyId})`); }}
              className={`py-2 px-3 sm:px-4 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                currentTab === "detail" 
                  ? "bg-[#1C2029] text-[#C5A880] shadow-sm" 
                  : "text-gray-500 hover:text-black hover:bg-gray-50"
              }`}
            >
              <Building className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Página Modelo de Exibição</span>
              <span className="md:hidden">Exibição</span>
            </button>
          </nav>

          <div className="hidden lg:flex items-center space-x-2 text-xs font-mono font-bold text-gray-500">
            <span className="h-2 w-2 rounded-full bg-[#C5A880]" />
            <span>(15) 99711-8125</span>
          </div>

        </div>
      </header>

      {/* GLOBAL TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#1C2029] text-white px-5 py-3 rounded-lg shadow-2xl border border-[#C5A880]/30 flex items-center gap-3 text-xs tracking-wider uppercase font-semibold"
          >
            <div className="w-1.5 h-1.5 bg-[#C5A880] rounded-full animate-pulse" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-8">

        {/* =======================================================
            TAB 2: SEARCH TEMPLATE & FILTERS MODEL (WIX SIMULATED)
            ======================================================= */}
        {currentTab === "search" && (
          <div className="space-y-8 text-left">
            
            {/* Elegant Context Banner */}
            <div className="bg-[#1C2029] text-white p-6 rounded-xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1 text-left">
                <span className="font-mono text-[9px] text-[#C5A880] font-bold uppercase tracking-widest block">Simulation Mode // Wix Page Template A</span>
                <h3 className="font-serif text-lg font-bold">Página Modelo de Pesquisa & Filtros de Topo</h3>
                <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
                  Esta é a representação real de como os filtros se comportam no Wix. Modifique as opções no cabeçalho ou selecione os diferenciais avançados abaixo para filtrar as {properties.length} propriedades em tempo real.
                </p>
              </div>
              <button 
                onClick={resetAllFilters}
                className="py-2 px-4 rounded border border-white/20 bg-white/5 hover:bg-white/10 text-[#C5A880] font-sans text-xs font-bold uppercase tracking-wider transition-all"
              >
                Limpar Filtros
              </button>
            </div>

            {/* THE FILTER HEADERS (TOPOS DE FILTROS) */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-md space-y-6">
              <div className="flex items-center space-x-2 text-stone-800 pb-3 border-b border-gray-100">
                <Filter className="h-4 w-4 text-[#C5A880]" />
                <h4 className="font-serif text-sm font-bold uppercase tracking-wider">Topos de Filtros Solicitados pelo Cliente</h4>
              </div>

              {/* Grid for standard high-end top filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* 1. Purpose (Rent/Buy) */}
                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider font-extrabold">Finalidade do Imóvel</label>
                  <div className="grid grid-cols-3 gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200/50">
                    {(["Todos", "Venda", "Aluguel"] as const).map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setFilterPurpose(p);
                          addLog(`Filter changed: Purpose set to '${p}'`);
                        }}
                        className={`py-1.5 px-2 rounded font-sans text-[10px] font-bold uppercase transition-all ${
                          filterPurpose === p 
                            ? "bg-[#1C2029] text-white shadow-sm" 
                            : "text-gray-500 hover:text-black"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Type/Category */}
                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider font-extrabold">Tipo de Imóvel</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => {
                      setFilterCategory(e.target.value as any);
                      addLog(`Filter changed: Category set to '${e.target.value}'`);
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-xs text-gray-800 focus:outline-none focus:border-[#C5A880] font-sans"
                  >
                    <option value="Todos">Todos os Tipos</option>
                    <option value="Mansão">Mansão</option>
                    <option value="Cobertura">Cobertura</option>
                    <option value="Villa Praia">Villa Praia</option>
                    <option value="Casa de Campo">Casa de Campo</option>
                    <option value="Loft Industrial">Loft Industrial</option>
                  </select>
                </div>

                {/* 3. Neighborhood/Location */}
                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider font-extrabold">Bairro / Condomínio</label>
                  <select
                    value={filterNeighborhood}
                    onChange={(e) => {
                      setFilterNeighborhood(e.target.value);
                      addLog(`Filter changed: Neighborhood set to '${e.target.value}'`);
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-xs text-gray-800 focus:outline-none focus:border-[#C5A880] font-sans"
                  >
                    {neighborhoods.map((n) => (
                      <option key={n} value={n}>{n === "Todos" ? "Todos os Bairros" : n}</option>
                    ))}
                  </select>
                </div>

                {/* 4. Text Search bar */}
                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider font-extrabold">Busca Livre (Palavras-chave)</label>
                  <div className="relative">
                    <input 
                      type="text"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        addLog(`Filter input: search string matches '${e.target.value}'`);
                      }}
                      placeholder="Condomínio, praia, piscina..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-xs text-gray-800 focus:outline-none focus:border-[#C5A880] placeholder-gray-400 font-sans"
                    />
                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                  </div>
                </div>

              </div>

              {/* Extra advanced filtering grid representing client's advanced filter model */}
              <div className="pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Price limits */}
                <div className="space-y-1.5 text-left">
                  <div className="flex justify-between items-baseline">
                    <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider font-extrabold">Preço Máximo de Compra</label>
                    <span className="font-mono text-xs font-bold text-[#8E7044]">
                      R$ {(filterMaxPrice / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <input 
                    type="range"
                    min={2000000}
                    max={35000000}
                    step={500000}
                    value={filterMaxPrice}
                    onChange={(e) => {
                      setFilterMaxPrice(Number(e.target.value));
                      addLog(`Filter changed: Price Limit set to R$ ${Number(e.target.value).toLocaleString()}`);
                    }}
                    className="w-full accent-[#C5A880] bg-gray-100 rounded-lg appearance-none h-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-gray-400">
                    <span>R$ 2.0M</span>
                    <span>R$ 15.0M</span>
                    <span>R$ 35.0M+</span>
                  </div>
                </div>

                {/* Minimum suites selection */}
                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider font-extrabold">Mínimo de Suítes</label>
                  <div className="grid grid-cols-5 gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200/50">
                    {["Qualquer", "2", "3", "4", "5"].map((suite) => (
                      <button
                        key={suite}
                        onClick={() => {
                          setFilterMinSuites(suite);
                          addLog(`Filter changed: Min suites set to ${suite}`);
                        }}
                        className={`py-1.5 rounded font-sans text-[10px] font-bold transition-all ${
                          filterMinSuites === suite 
                            ? "bg-[#C5A880] text-black shadow-sm" 
                            : "text-gray-500 hover:text-black"
                        }`}
                      >
                        {suite === "Qualquer" ? "Qual" : `${suite}⁺`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Minimum parking selection */}
                <div className="space-y-1.5 text-left">
                  <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider font-extrabold">Vagas de Garagem</label>
                  <div className="grid grid-cols-5 gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200/50">
                    {["Qualquer", "2", "3", "4", "6"].map((vaga) => (
                      <button
                        key={vaga}
                        onClick={() => {
                          setFilterMinParking(vaga);
                          addLog(`Filter changed: Min parking spaces set to ${vaga}`);
                        }}
                        className={`py-1.5 rounded font-sans text-[10px] font-bold transition-all ${
                          filterMinParking === vaga 
                            ? "bg-[#C5A880] text-black shadow-sm" 
                            : "text-gray-500 hover:text-black"
                        }`}
                      >
                        {vaga === "Qualquer" ? "Qual" : `${vaga}⁺`}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Features and Infrastructure checkboxes */}
              <div className="pt-4 border-t border-gray-100 text-left space-y-2">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider font-extrabold block">Diferenciais & Infraestrutura</label>
                <div className="flex flex-wrap gap-2">
                  {allFeatures.map(feat => {
                    const isSelected = filterSelectedFeatures.includes(feat);
                    return (
                      <button
                        key={feat}
                        onClick={() => handleFeatureToggle(feat)}
                        className={`py-1.5 px-3 rounded-full text-[10px] font-mono font-bold uppercase transition-all flex items-center space-x-1.5 border ${
                          isSelected 
                            ? "bg-[#1C2029] text-[#C5A880] border-[#1C2029]" 
                            : "bg-white text-gray-500 border-gray-100 hover:border-gray-200 hover:text-black"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                        <span>{feat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* REAL-TIME AI LIFESTYLE MATCHMAKER WIDGET */}
            <div className="bg-[#FAF9F5] rounded-xl p-6 border border-gray-200/60 shadow-sm text-left grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4 space-y-2">
                <div className="inline-flex items-center space-x-1.5 text-xs text-[#8E7044] font-mono font-bold uppercase">
                  <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
                  <span>Lifestyle AI Matchmaker</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1C2029]">Qual é o seu estilo de vida?</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Digite sua preferência em linguagem natural (ex: <i>"quero uma casa moderna de campo com quadra de tênis"</i> ou <i>"gosto de mar e pé na areia"</i>) para nossa inteligência artificial recomendar o imóvel ideal.
                </p>
              </div>

              <div className="lg:col-span-8 bg-white p-5 rounded-lg border border-gray-100 space-y-4">
                <form onSubmit={handleLifestyleMatch} className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="text"
                    value={lifestyleText}
                    onChange={(e) => setLifestyleText(e.target.value)}
                    placeholder="Fale um pouco sobre o imóvel dos seus sonhos..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-3.5 text-xs text-gray-800 focus:outline-none focus:border-[#C5A880]"
                  />
                  <button
                    type="submit"
                    disabled={lifestyleSearching}
                    className="py-2.5 px-6 rounded bg-[#1C2029] hover:bg-black text-[#C5A880] hover:text-white font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50"
                  >
                    {lifestyleSearching ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        <span>Analisando...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Encontrar Match</span>
                      </>
                    )}
                  </button>
                </form>

                {lifestyleMatched && (
                  <div className="bg-emerald-50/50 rounded-lg p-4 border border-emerald-100 flex flex-col sm:flex-row items-center gap-4 justify-between animate-fadeIn text-left">
                    <div className="flex items-center space-x-3.5">
                      <img 
                        src={lifestyleMatched.image} 
                        alt={lifestyleMatched.title} 
                        className="w-16 h-12 object-cover rounded shadow"
                      />
                      <div className="space-y-0.5">
                        <span className="font-mono text-[9px] text-[#8E7044] font-bold uppercase tracking-wider block">★ AI Recomendação Ideal</span>
                        <h5 className="font-serif text-sm font-bold text-gray-900 line-clamp-1">{lifestyleMatched.title}</h5>
                        <p className="font-mono text-[10px] text-gray-500">{lifestyleMatched.neighborhood}, {lifestyleMatched.location}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => selectPropertyAndNavigate(lifestyleMatched.id)}
                      className="py-2 px-4 rounded bg-[#1C2029] hover:bg-black text-white font-mono text-[10px] uppercase font-bold tracking-wider transition-all"
                    >
                      Ver Detalhes do Match →
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* RENDER DYNAMIC REPEATER CARD LIST */}
            <div className="space-y-6">
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-[11px] text-gray-400 uppercase tracking-widest font-extrabold">
                  {filteredProperties.length} Imóveis Correspondentes nos Filtros
                </span>
                <span className="text-xs text-gray-500 font-mono">Wix Repeater Dataset Simulation</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map(prop => {
                  const isFav = wishlist.includes(prop.id);
                  return (
                    <motion.div
                      key={prop.id}
                      layout
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => selectPropertyAndNavigate(prop.id)}
                      className="bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl hover:border-[#C5A880]/50 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                        <img 
                          src={prop.image} 
                          alt={prop.title} 
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#1C2029]/95 text-[#C5A880] font-mono text-[9px] uppercase tracking-wider font-extrabold backdrop-blur-sm shadow-sm">
                          {prop.category}
                        </div>
                        <button 
                          onClick={(e) => handleToggleWishlist(prop.id, e)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-stone-600 hover:text-red-700 shadow-sm transition-colors z-10"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-red-700 text-red-700" : ""}`} />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white pt-8">
                          <div className="flex items-center space-x-1 font-mono text-[10px] text-gray-200">
                            <MapPin className="h-3 w-3 text-[#C5A880]" />
                            <span>{prop.neighborhood}, {prop.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="font-serif text-lg font-black text-[#1C2029]">
                              {prop.purpose === "Aluguel" ? `R$ ${prop.price.toLocaleString("pt-BR")}/mês` : `R$ ${(prop.price / 1000000).toFixed(1)}M`}
                            </span>
                            <span className="font-mono text-[8px] bg-gray-100 text-gray-500 rounded-md py-0.5 px-2 uppercase tracking-wider font-extrabold">
                              {prop.purpose === "Venda" ? "À venda" : "Locação"}
                            </span>
                          </div>
                          <h3 className="font-serif text-base font-bold text-[#1C2029] group-hover:text-[#8E7044] transition-colors line-clamp-2 leading-snug">
                            {prop.title}
                          </h3>
                        </div>

                        {/* Specs row */}
                        <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 text-[10px] font-mono text-gray-500 text-center">
                          <div className="space-y-0.5">
                            <span className="text-gray-400 block text-[8px]">ÁREA</span>
                            <span className="font-bold text-gray-900">{prop.area}m²</span>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-gray-400 block text-[8px]">SUÍTES</span>
                            <span className="font-bold text-gray-900">{prop.suites}</span>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-gray-400 block text-[8px]">VAGAS</span>
                            <span className="font-bold text-gray-900">{prop.parking}</span>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between text-xs font-semibold text-[#8E7044] group-hover:translate-x-1 transition-transform">
                          <span>Visualizar Exibição Modelo</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {filteredProperties.length === 0 && (
                  <div className="col-span-full py-16 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200 space-y-4">
                    <HelpCircle className="h-10 w-10 mx-auto text-gray-300 stroke-1" />
                    <p className="text-sm font-mono text-gray-400">Nenhum imóvel corresponde aos filtros configurados no momento.</p>
                    <button 
                      onClick={resetAllFilters}
                      className="py-2 px-5 bg-[#1C2029] hover:bg-black text-[#C5A880] text-xs font-mono font-bold uppercase rounded-md shadow-sm transition-all"
                    >
                      Redefinir Filtros
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* =======================================================
            TAB 3: PROPERTY DYNAMIC DETAILS PAGE (WIX DISPLAY MODEL)
            ======================================================= */}
        {currentTab === "detail" && (
          <div className="space-y-12 text-left">
            
            {/* Quick Back Navigation for UX */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <button 
                onClick={() => { setCurrentTab("search"); addLog("Back to search page template requested"); }}
                className="flex items-center space-x-2 text-gray-500 hover:text-black text-xs font-mono font-bold uppercase transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>← Voltar para a Página Modelo de Pesquisa</span>
              </button>
              <div className="font-mono text-[10px] text-gray-400 bg-gray-50 border border-gray-200/60 rounded px-2.5 py-1 uppercase tracking-wider font-bold">
                Wix Dynamic Page Connection: imovel_detalhes?id={activeProperty.id}
              </div>
            </div>

            {/* Monumental Detail Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Image, Descriptions, Highlights */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Immersive Photo Frame */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-stone-100">
                  <img 
                    src={activeProperty.image} 
                    alt={activeProperty.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded bg-[#1C2029] text-[#C5A880] font-mono text-[9px] uppercase tracking-wider font-extrabold shadow-lg">
                    {activeProperty.category}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white pt-16">
                    <div className="flex items-center space-x-2 font-mono text-xs text-gray-200">
                      <MapPin className="h-4 w-4 text-[#C5A880]" />
                      <span>{activeProperty.neighborhood} // {activeProperty.location}</span>
                    </div>
                  </div>
                </div>

                {/* Main Specs and Tagline */}
                <div className="space-y-4">
                  <span className="font-mono text-xs text-[#8E7044] font-bold uppercase tracking-widest block">
                    {activeProperty.category} Exclusiva • Registrada em {activeProperty.year}
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl font-black text-[#1C2029] leading-tight tracking-tight">
                    {activeProperty.title}
                  </h1>
                  <p className="font-sans text-base text-[#8E7044] font-semibold italic">
                    "{activeProperty.tagline}"
                  </p>
                </div>

                <hr className="border-gray-100" />

                {/* Grid attributes details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                    <span className="text-gray-400 font-mono text-[9px] uppercase block tracking-wider font-bold">Área Privativa</span>
                    <span className="font-serif text-xl font-bold text-gray-900">{activeProperty.area} m²</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                    <span className="text-gray-400 font-mono text-[9px] uppercase block tracking-wider font-bold">Suítes Totais</span>
                    <span className="font-serif text-xl font-bold text-gray-900">{activeProperty.suites}</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                    <span className="text-gray-400 font-mono text-[9px] uppercase block tracking-wider font-bold">Vagas Cobertas</span>
                    <span className="font-serif text-xl font-bold text-gray-900">{activeProperty.parking}</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                    <span className="text-gray-400 font-mono text-[9px] uppercase block tracking-wider font-bold">Banheiros</span>
                    <span className="font-serif text-xl font-bold text-gray-900">{activeProperty.bathrooms}</span>
                  </div>
                </div>

                {/* Conceptual description paragraph */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-bold text-[#1C2029]">Memorial Descritivo do Imóvel</h3>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
                    {activeProperty.description}
                  </p>
                </div>

                {/* Bullet Highlights */}
                <div className="space-y-3">
                  <h3 className="font-serif text-lg font-bold text-[#1C2029]">Destaques e Benfeitorias Premium</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeProperty.highlights.map((h, i) => (
                      <div key={i} className="flex items-start space-x-2.5 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <Check className="h-4.5 w-4.5 text-[#C5A880] shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-700 leading-relaxed font-medium">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Infrastructure features tags list */}
                <div className="space-y-3">
                  <h3 className="font-serif text-lg font-bold text-[#1C2029]">Características Adicionais</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeProperty.features.map((feat, idx) => (
                      <span key={idx} className="font-mono text-[10px] font-bold text-gray-500 bg-gray-50 border border-gray-200/50 rounded-md py-1.5 px-3 uppercase tracking-wider">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* COHESIVE INTERACTIVE FINANCING MORTGAGE CALCULATOR */}
                <div className="bg-[#FAF9F5] rounded-xl p-6 sm:p-8 border border-gray-200/60 space-y-6">
                  <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                    <Calculator className="h-5 w-5 text-[#C5A880]" />
                    <h3 className="font-serif text-lg font-bold text-stone-950">Simulador de Faturamento & Financiamento Imobiliário</h3>
                  </div>
                  
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Ajuste o valor de entrada e as taxas estimadas para simular as prestações sob a tabela Price baseada em taxas de faturamento reais para imóveis de alto padrão.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    
                    {/* Entrance Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline text-xs font-mono">
                        <span className="text-gray-400 font-bold">ENTRADA</span>
                        <span className="text-stone-800 font-bold">{simDownPayment}%</span>
                      </div>
                      <input 
                        type="range"
                        min={10}
                        max={80}
                        step={5}
                        value={simDownPayment}
                        onChange={(e) => setSimDownPayment(Number(e.target.value))}
                        className="w-full accent-[#C5A880] bg-gray-200 h-1.5 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-gray-400 block">
                        R$ {mortgageSummary.downPaymentValue.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    {/* Years Selector */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline text-xs font-mono">
                        <span className="text-gray-400 font-bold">PRAZO</span>
                        <span className="text-stone-800 font-bold">{simYears} anos</span>
                      </div>
                      <input 
                        type="range"
                        min={5}
                        max={30}
                        step={5}
                        value={simYears}
                        onChange={(e) => setSimYears(Number(e.target.value))}
                        className="w-full accent-[#C5A880] bg-gray-200 h-1.5 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-gray-400 block">
                        {simYears * 12} parcelas mensais
                      </span>
                    </div>

                    {/* Annual Interest */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-baseline text-xs font-mono">
                        <span className="text-gray-400 font-bold">TAXA DE JUROS</span>
                        <span className="text-stone-800 font-bold">{simInterest}% a.a.</span>
                      </div>
                      <input 
                        type="range"
                        min={6}
                        max={14}
                        step={0.25}
                        value={simInterest}
                        onChange={(e) => setSimInterest(Number(e.target.value))}
                        className="w-full accent-[#C5A880] bg-gray-200 h-1.5 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-gray-400 block">
                        Equivalente a ~{(simInterest / 12).toFixed(2)}% ao mês
                      </span>
                    </div>

                  </div>

                  {/* Calculations Output Results */}
                  <div className="bg-white p-5 rounded-lg border border-gray-200/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block font-bold">Entrada Requerida</span>
                      <span className="font-serif text-base font-bold text-stone-900">
                        R$ {mortgageSummary.downPaymentValue.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    <div className="space-y-0.5 border-t sm:border-t-0 sm:border-l border-gray-100 sm:pl-4">
                      <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block font-bold">Valor Financiado</span>
                      <span className="font-serif text-base font-bold text-stone-900">
                        R$ {mortgageSummary.financedAmount.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    <div className="space-y-0.5 border-t md:border-t-0 md:border-l border-gray-100 md:pl-4">
                      <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block font-bold">Parcela Mensal Estimada</span>
                      <span className="font-serif text-lg font-black text-[#8E7044]">
                        R$ {mortgageSummary.monthlyPayment.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    <div className="space-y-0.5 border-t md:border-t-0 md:border-l border-gray-100 md:pl-4">
                      <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block font-bold">Total Pago em Juros</span>
                      <span className="font-serif text-base font-bold text-gray-500">
                        R$ {mortgageSummary.totalInterestPaid.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Right Column: Dynamic Price panel, visitor scheduling, lead tracker */}
              <div className="lg:col-span-4 space-y-8 sticky top-28">
                
                {/* Visual pricing & faturamento box */}
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-md space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-extrabold block">VALOR PATRIMONIAL</span>
                      <h3 className="font-serif text-2xl font-black text-[#1C2029]">
                        R$ {activeProperty.price.toLocaleString("pt-BR")}
                      </h3>
                      <p className="font-mono text-[9px] text-[#C5A880] uppercase font-bold tracking-wider">
                        ★ DISPONÍVEL PARA NEGOCIAÇÃO IMEDIATA
                      </p>
                    </div>
                  </div>
                  <hr className="border-gray-100" />
                  
                  <div className="space-y-2 text-xs text-gray-600 leading-relaxed font-light">
                    <div className="flex justify-between">
                      <span>Condomínio Estimado:</span>
                      <span className="font-mono font-semibold">R$ 3.800 / mês</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IPTU Anual Estimado:</span>
                      <span className="font-mono font-semibold">R$ 18.500 / ano</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-dashed border-gray-100">
                      <span>Registro de Cartório:</span>
                      <span className="font-mono font-semibold">Isento na transição</span>
                    </div>
                  </div>
                </div>

                {/* Dynamic visitor scheduler form */}
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-md space-y-5">
                  <div className="text-left space-y-1">
                    <span className="font-mono text-[9px] text-[#8E7044] font-bold uppercase tracking-wider block">Agendamento de Visita Privativa</span>
                    <h4 className="font-serif text-base font-bold text-gray-950">Solicitar Reunião</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Selecione um horário desejável. Um de nossos corretores seniores entrará em contato de forma confidencial.
                    </p>
                  </div>

                  {scheduleSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-5 rounded-lg bg-[#C5A880]/10 border border-[#C5A880]/30 text-center space-y-3"
                    >
                      <div className="h-8 w-8 rounded-full bg-[#C5A880]/20 text-[#8E7044] flex items-center justify-center mx-auto">
                        <Check className="h-4.5 w-4.5" />
                      </div>
                      <h5 className="font-serif text-xs font-bold text-gray-900">Pedido Enviado ao Wix CRM</h5>
                      <p className="text-[11px] text-gray-600 leading-normal">
                        Prezado(a) <strong>{scheduleName}</strong>, sua reserva para o dia <b>{scheduleDate}</b> às <b>{scheduleTime}</b> está sendo enviada ao banco de dados Wix do ateliê de intermediação comercial.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleScheduleVisit} className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Seu Nome *</label>
                        <input 
                          type="text"
                          required
                          value={scheduleName}
                          onChange={(e) => setScheduleName(e.target.value)}
                          placeholder="Nome completo"
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-xs text-gray-800 focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Seu Telefone *</label>
                        <input 
                          type="tel"
                          required
                          value={schedulePhone}
                          onChange={(e) => setSchedulePhone(e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-xs text-gray-800 focus:outline-none focus:border-[#C5A880]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Data *</label>
                          <input 
                            type="date"
                            required
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-xs text-gray-800 focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Horário *</label>
                          <input 
                            type="time"
                            required
                            value={scheduleTime}
                            onChange={(e) => setScheduleTime(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-xs text-gray-800 focus:outline-none focus:border-[#C5A880]"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded bg-[#1C2029] hover:bg-black text-[#C5A880] hover:text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow shadow-md cursor-pointer flex items-center justify-center space-x-2"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Agendar Visita</span>
                      </button>
                    </form>
                  )}
                </div>

                {/* Floating other properties quick selection preview inside detail view */}
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-md space-y-4">
                  <h4 className="font-serif text-sm font-bold text-gray-950">Mais Imóveis do Portfólio</h4>
                  <div className="space-y-3">
                    {properties.filter(p => p.id !== selectedPropertyId).slice(0, 3).map(p => (
                      <div 
                        key={p.id}
                        onClick={() => selectPropertyAndNavigate(p.id)}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <img 
                          src={p.image} 
                          alt={p.title} 
                          className="w-12 h-10 object-cover rounded shadow group-hover:opacity-85 transition-opacity"
                        />
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <h5 className="font-serif text-xs font-bold text-gray-900 group-hover:text-[#8E7044] transition-colors truncate">{p.title}</h5>
                          <span className="font-mono text-[9px] text-gray-400 block">{p.neighborhood} • R$ {p.price >= 1000000 ? `${(p.price / 1000000).toFixed(1)}M` : `${p.price.toLocaleString()}/mês`}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-gray-100 pt-12 max-w-7xl mx-auto px-6 md:px-12 text-center text-xs text-gray-400 space-y-4">
        <p className="font-serif text-gray-900 tracking-widest text-sm uppercase font-bold">VERTIKA IMÓVEIS ÚNICOS</p>
        <p className="font-mono text-[9px] uppercase tracking-widest text-gray-500">
          CRECI/SP nº 45.890-J • Desenvolvido sob medida para Wix Velo Integration & Portfolio
        </p>
        <p className="text-stone-300 max-w-xl mx-auto leading-relaxed">
          Protótipo interativo completo de controle de fluxo de dados. Os filtros aplicados no topo comunicam-se de forma inteligente através de parâmetros simulados replicando a engenharia de CMS do Wix Velo.
        </p>
      </footer>

    </div>
  );
}
