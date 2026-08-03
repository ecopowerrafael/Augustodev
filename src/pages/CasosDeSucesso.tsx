import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Sparkles, 
  Newspaper, 
  ExternalLink, 
  Globe, 
  Smartphone, 
  CheckCircle2, 
  ArrowLeft, 
  Award, 
  Filter, 
  Layers, 
  MessageSquare,
  Building2,
  ShieldCheck,
  TrendingUp,
  Heart,
  ShoppingBag,
  Truck,
  Wrench,
  Stethoscope,
  Briefcase
} from "lucide-react";
import MatrixBackground from "../components/MatrixBackground";
import NoiseFilter from "../components/NoiseFilter";

interface PressArticle {
  source: string;
  title: string;
}

interface SuccessCaseItem {
  id: string;
  name: string;
  category: string;
  tag: string;
  description: string;
  iosUrl?: string | null;
  androidUrl?: string | null;
  pwaUrl?: string | null;
  siteUrl?: string | null;
  pressArticles?: PressArticle[];
  featured?: boolean;
}

const CASOS_DE_SUCESSO: SuccessCaseItem[] = [
  {
    id: "laudelina",
    name: "LAUDELINA",
    category: "Direitos & Trabalho Doméstico",
    tag: "Social & Impacto",
    description: "Aplicativo desenvolvido para empregadas domésticas se informarem sobre seus direitos trabalhistas, realizarem cálculos de rescisão, férias e benefícios de forma simples e transparente.",
    iosUrl: "https://apps.apple.com/br/app/laudelina/id6443490521",
    androidUrl: "https://play.google.com/store/apps/details?id=br.org.laudelina",
    featured: true
  },
  {
    id: "appobra",
    name: "APPOBRA",
    category: "Construção Civil & Engenharia",
    tag: "Engenharia & Obras",
    description: "Aplicativo ágil para gerenciamento de obras próprias ou de clientes com acompanhamento de cronogramas, suprimentos e custos em tempo real.",
    iosUrl: "https://apps.apple.com/br/app/appobra/id6446123444",
    androidUrl: "https://play.google.com/store/apps/details?id=br.com.app.obra",
    featured: true
  },
  {
    id: "infinita",
    name: "INFINITA",
    category: "Mercado Imobiliário & Incorporação",
    tag: "Imobiliário",
    description: "Aplicativo para acompanhamento detalhado da construção do seu empreendimento imobiliário, com relatórios fotográficos de evolução física e acompanhamento financeiro.",
    iosUrl: "https://apps.apple.com/app/id6443546210",
    androidUrl: "https://play.google.com/store/apps/details?id=br.com.infinita"
  },
  {
    id: "salva-dividas",
    name: "SALVA DÍVIDAS",
    category: "Fintech & Reorganização Financeira",
    tag: "Fintech",
    description: "Aplicativo que visa a solução para quem precisa quitar dívidas, renegociar débitos com desconto e colocar as contas da família em dia.",
    iosUrl: "https://apps.apple.com/br/app/salva-d%C3%ADvidas/id6446028398",
    androidUrl: "https://play.google.com/store/apps/details?id=br.com.salvadividas",
    featured: true
  },
  {
    id: "cj-fashion",
    name: "CJ FASHION",
    category: "E-Commerce & Moda de Luxo",
    tag: "E-Commerce Luxury",
    description: "Aplicativo de shopping de luxo da América Latina (JHSF), reunindo as marcas internacionais e nacionais mais exclusivas com experiência VIP.",
    androidUrl: "https://play.google.com/store/apps/details?id=br.com.jhsf.appb2c"
  },
  {
    id: "itaipu-turismo",
    name: "ITAIPU TURISMO",
    category: "Turismo, Cultura & Passeios",
    tag: "Turismo & Cultura",
    description: "Aplicativo oficial para a experiência dos passeios no Parque Turístico de Itaipu Binacional, com áudioguia, mapa interativo e ingressos digitais.",
    iosUrl: "https://apps.apple.com/us/app/turismo-itaipu/id1600131191",
    androidUrl: "https://play.google.com/store/apps/details?id=com.br.turismoitaipu",
    featured: true
  },
  {
    id: "purificatta-vendas",
    name: "PURIFICATTA – VENDAS",
    category: "Varejo & Vendas Direct-to-Consumer",
    tag: "Varejo & Vendas",
    description: "Aplicativo de águas minerais purificadas para venda no varejo e consumo imediato, com geolocalização de estações e checkout instantâneo.",
    iosUrl: "https://apple.co/3rVt3rB",
    androidUrl: "https://bit.ly/Purificatta_Vendas_Google"
  },
  {
    id: "purificatta-assinaturas",
    name: "PURIFICATTA – ASSINATURAS",
    category: "B2B & Planos de Assinatura",
    tag: "B2B Recorrência",
    description: "Aplicativo de águas minerais focado na gestão automatizada de assinaturas recorrentes para empresas, condomínios e estabelecimentos comerciais.",
    iosUrl: "https://apple.co/35v16PX",
    androidUrl: "https://bit.ly/Purificatta_Assinatura_Google"
  },
  {
    id: "funcorsan",
    name: "FUNCORSAN",
    category: "Previdência Privada & Seguridade",
    tag: "Previdência & Finanças",
    description: "Aplicativo oficial da entidade fechada de previdência complementar sem fins lucrativos, permitindo consulta a saldos, extratos e empréstimos.",
    iosUrl: "https://apps.apple.com/br/app/funcorsan/id1571393841",
    androidUrl: "https://play.google.com/store/apps/details?id=br.com.funcorsan"
  },
  {
    id: "abigeapp",
    name: "ABIGEAPP",
    category: "Agrotech & Segurança Rural",
    tag: "Agrotech & Segurança",
    description: "Banco de dados e sistema de checagem de marcas e sinais de animais para identificar e auxiliar forças de segurança no combate aos crimes de abigeato no campo.",
    iosUrl: "https://apps.apple.com/br/app/abigeapp-autoridade/id1606795165",
    androidUrl: "https://play.google.com/store/apps/details?id=br.com.be220.abigeapp",
    featured: true
  },
  {
    id: "cana-app",
    name: "CANÁ APP",
    category: "Rede Social & Relacionamento",
    tag: "Rede Social",
    description: "Aplicativo de relacionamento inteligente com foco em conexões reais, propósitos em comum e interação segura.",
    iosUrl: "https://bit.ly/Caná_Apple",
    androidUrl: "https://bit.ly/Caná_Google"
  },
  {
    id: "construi-app",
    name: "CONSTRUI APP",
    category: "Delivery & Materiais de Construção",
    tag: "Logística & Construção",
    description: "Aplicativo com delivery e cotação rápida de produtos no segmento da construção civil, conectando depósitos, construtores e clientes finais.",
    iosUrl: "https://bit.ly/Construi_Apple",
    androidUrl: "https://bit.ly/Construi_Google"
  },
  {
    id: "unemix",
    name: "UNEMIX",
    category: "Food Delivery & Marketplace",
    tag: "Food & Delivery",
    description: "Aplicativo de delivery com mais de 100 restaurantes cadastrados em Caxias do Sul e região, com ecossistema completo de entregas e painel para lojistas.",
    iosUrl: "https://bit.ly/Unemix_Apple",
    androidUrl: "https://bit.ly/Unemix_Google",
    pwaUrl: "https://unemix.com.br/",
    pressArticles: [
      { source: "JORNAL O PIONEIRO", title: "Aplicativo caxiense compete com grandes empresas no mercado de entrega de comida" },
      { source: "JORNAL O PIONEIRO", title: "Aplicativo de delivery caxiense cresce cerca de 30% durante a pandemia" }
    ],
    featured: true
  },
  {
    id: "advoapp",
    name: "ADVOAPP",
    category: "LegalTech & Proteção Médica",
    tag: "LegalTech & Saúde",
    description: "Aplicativo para contratação de serviços de assessoria jurídica preventiva e defensiva especializada para profissionais da área da saúde.",
    iosUrl: "http://bit.ly/AdvoAppApple",
    androidUrl: "http://bit.ly/AdvoAppGoogle",
    pwaUrl: "https://advoapp.web.app/",
    featured: true
  },
  {
    id: "cars-up",
    name: "CARS UP",
    category: "Serviços Automotivos & Estética",
    tag: "Automotivo & Serviços",
    description: "Aplicativo de São Paulo para agendamento de estéticas automotivas, higienização detalhada, vitrificação e cuidados com veículos.",
    siteUrl: "https://www.carsup.com.br/",
    iosUrl: "https://apps.apple.com/br/app/carsup/id1528913762",
    androidUrl: "https://play.google.com/store/apps/details?id=br.com.carsup"
  },
  {
    id: "hergon-app",
    name: "HERGON APP – HEALTH CARE",
    category: "SaaS Corporativo & Ergonomia",
    tag: "Saúde Ocupacional",
    description: "Sistema web avançado em ergonomia do trabalho e análise postural ocupacional para empresas, indústrias e auditores de segurança do trabalho.",
    siteUrl: "https://app.nucleohealthcare.com.br/loginHER"
  },
  {
    id: "zpass",
    name: "ZPASS",
    category: "Clube de Benefícios & Vouchers",
    tag: "Clube de Vantagens",
    description: "Aplicativo de descontos, cashback e clube de benefícios de Porto Alegre com rede de mais de 114 empresas e parceiros credenciados.",
    pwaUrl: "https://appzpass.web.app/#/download",
    iosUrl: "https://bit.ly/zpassapple",
    androidUrl: "https://bit.ly/zpassandroid",
    pressArticles: [
      { source: "GAÚCHAZH", title: "Com investimento de R$ 435 mil, aplicativo é lançado com descontos em 114 empresas do RS" },
      { source: "CORREIO DO POVO", title: "Zpass: clube de descontos e benefícios é novidade no mercado gaúcho" },
      { source: "JORNAL DO COMÉRCIO", title: "O clube de descontos Zpass" },
      { source: "RS BLOGGERS", title: "Zpass: clube que oferece descontos e renda extra é novidade no mercado gaúcho" }
    ],
    featured: true
  },
  {
    id: "dfl-brasil",
    name: "DFL BRASIL",
    category: "Odontologia & Catálogo B2B",
    tag: "Saúde & Odontologia",
    description: "Aplicativo oficial para uma das maiores empresas do segmento de produtos odontológicos da América Latina, sediada no Rio de Janeiro.",
    iosUrl: "http://bit.ly/APP_DFL_IOS",
    androidUrl: "http://bit.ly/APP_DFL_Android"
  },
  {
    id: "delivery-para-todos",
    name: "DELIVERY PARA TODOS",
    category: "Marketplace & Varejo Bairro",
    tag: "Marketplace Local",
    description: "Aplicativo e plataforma de marketplace para estabelecimentos comerciais de diversos segmentos e pequenos negócios locais.",
    siteUrl: "https://deliveryparatodos.com.br",
    iosUrl: "https://bit.ly/deliverytodos",
    androidUrl: "https://bit.ly/androiddeliverytodos",
    pressArticles: [
      { source: "GAÚCHAZH", title: "Agência gaúcha cria app que permite a pequenos negócios oferecer delivery" }
    ]
  },
  {
    id: "spot-auditoria",
    name: "SPOT – AUDITORIA E PESQUISA DE MÍDIA",
    category: "AdTech & Pesquisa de Mídia",
    tag: "AdTech & Mídia",
    description: "Sistema web do Adex Creative para auditoria e pesquisa automatizada de veiculação e inserções publicitárias em mídias.",
    siteUrl: "http://adexcloud.com.br:8088/login"
  },
  {
    id: "gente-ajudando-gente",
    name: "GENTE AJUDANDO GENTE",
    category: "Impacto Social & Saúde Mental",
    tag: "Saúde Mental & Apoio",
    description: "Aplicativo de apoio emocional e prevenção ao suicídio lançado na campanha do Setembro Amarelo, oferecendo acolhimento e suporte comunitário.",
    iosUrl: "http://bit.ly/AppGenteApple",
    androidUrl: "http://bit.ly/AppGenteGoogle",
    featured: true
  },
  {
    id: "jornal-tradicao",
    name: "JORNAL TRADIÇÃO",
    category: "Mídia & Portal de Notícias",
    tag: "Notícias & Jornalismo",
    description: "Aplicativo oficial de notícias de Pelotas e região, com feeds de reportagens em tempo real, vídeos e notificações de urgência.",
    iosUrl: "http://bit.ly/APP_JTR_IOS",
    androidUrl: "http://bit.ly/APP_JTR_Android"
  }
];

// High quality App Store Button
const AppStoreButton: React.FC<{ url: string }> = ({ url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center space-x-2.5 px-4 py-2.5 bg-black hover:bg-neutral-900 text-white rounded-xl border border-white/20 hover:border-[#00FF41]/60 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,65,0.2)] transition-all duration-300 group cursor-pointer shrink-0"
  >
    {/* SVG Apple Icon */}
    <svg className="w-5 h-5 fill-current text-white group-hover:text-[#00FF41] transition-colors shrink-0" viewBox="0 0 170 170">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.14-1.9-14.4-6.07-3.67-2.92-7.6-7.61-11.81-14.07-7.43-11.51-13.24-23.85-17.43-37.03-4.18-13.18-6.28-25.53-6.28-37.04 0-15.68 3.93-28.71 11.8-39.09 7.87-10.38 17.82-15.68 29.83-15.91 4.58 0 9.68 1.14 15.31 3.42 5.63 2.29 9.58 3.43 11.86 3.43 2.01 0 6.09-1.22 12.24-3.67 6.15-2.45 11.33-3.56 15.54-3.34 10.15.56 18.6 4.12 25.35 10.69 6.75 6.58 10.87 14.82 12.36 24.72-9.38 5.66-14.07 13.62-14.07 23.88 0 8.7 3.3 16.03 9.9 22 6.6 5.97 14.51 9.25 23.73 9.85-1.57 6.7-3.92 13.51-7.05 20.44zM119.22 31.29c0-7.36 2.65-14.47 7.95-21.32 5.3-6.85 11.93-10.64 19.89-11.37.22 1.34.33 2.45.33 3.34 0 7.36-2.73 14.53-8.2 21.52-5.46 6.99-12.14 10.85-20.03 11.59-.11-.9-.17-1.83-.17-2.76z"/>
    </svg>
    <div className="text-left leading-none font-sans">
      <span className="block text-[8px] font-mono tracking-wider text-white/60 uppercase">Disponível na</span>
      <span className="block text-xs font-black tracking-tight text-white group-hover:text-[#00FF41] transition-colors">App Store</span>
    </div>
  </a>
);

// High quality Google Play Store Button
const GooglePlayButton: React.FC<{ url: string }> = ({ url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center space-x-2.5 px-4 py-2.5 bg-black hover:bg-neutral-900 text-white rounded-xl border border-white/20 hover:border-[#00FF41]/60 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,65,0.2)] transition-all duration-300 group cursor-pointer shrink-0"
  >
    {/* SVG Google Play Icon */}
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 512 512">
      <path fill="#410593" d="M31.18 10.51C21.72 20.35 16 35.21 16 54.4v403.2c0 19.19 5.72 34.05 15.18 43.89l2.25 2.14L259 278.07v-4.14L33.43 8.37l-2.25 2.14z"/>
      <path fill="#00e5ff" d="M337.31 356.38L259 278.07v-4.14l78.31-78.31 1.77.99 92.83 52.73c26.51 15.06 26.51 39.7 0 54.76l-92.83 52.73-1.77.55z"/>
      <path fill="#ff3a44" d="M339.08 355.83L259 276 33.43 501.57c8.75 9.27 22.95 10.42 38.93 1.35l266.72-147.09"/>
      <path fill="#00e676" d="M339.08 156.17L72.36 9.08C56.38-.02 42.18 1.13 33.43 10.43L259 236l80.08-79.83z"/>
    </svg>
    <div className="text-left leading-none font-sans">
      <span className="block text-[8px] font-mono tracking-wider text-white/60 uppercase">DISPONÍVEL NO</span>
      <span className="block text-xs font-black tracking-tight text-white group-hover:text-[#00FF41] transition-colors">Google Play</span>
    </div>
  </a>
);

// High quality Web / PWA Button
const WebPlatformButton: React.FC<{ url: string; label?: string }> = ({ url, label = "Acessar Web / PWA" }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center space-x-2.5 px-4 py-2.5 bg-black hover:bg-neutral-900 text-white rounded-xl border border-[#00FF41]/40 hover:border-[#00FF41] shadow-lg hover:shadow-[0_0_15px_rgba(0,255,65,0.25)] transition-all duration-300 group cursor-pointer shrink-0"
  >
    <Globe className="w-5 h-5 text-[#00FF41] group-hover:rotate-12 transition-transform shrink-0" />
    <div className="text-left leading-none font-sans">
      <span className="block text-[8px] font-mono tracking-wider text-[#00FF41] uppercase">PLATAFORMA ONLINE</span>
      <span className="block text-xs font-black tracking-tight text-white group-hover:text-[#00FF41] transition-colors">{label}</span>
    </div>
  </a>
);

export default function CasosDeSucesso({ onBack }: { onBack: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("TODOS");

  const categoriesList = ["TODOS", "DESTAQUES", "CONSTRUÇÃO & IMÓVEIS", "ALIMENTAÇÃO & DELIVERY", "FINTECH & B2B", "SAÚDE & DIREITOS"];

  const filteredCases = CASOS_DE_SUCESSO.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === "TODOS") return true;
    if (selectedCategory === "DESTAQUES") return item.featured === true;
    if (selectedCategory === "CONSTRUÇÃO & IMÓVEIS") return item.category.includes("Construção") || item.category.includes("Imobiliário");
    if (selectedCategory === "ALIMENTAÇÃO & DELIVERY") return item.category.includes("Food") || item.category.includes("Delivery") || item.category.includes("Vendas");
    if (selectedCategory === "FINTECH & B2B") return item.category.includes("Fintech") || item.category.includes("B2B") || item.category.includes("Previdência") || item.category.includes("AdTech");
    if (selectedCategory === "SAÚDE & DIREITOS") return item.category.includes("Trabalho") || item.category.includes("Saúde") || item.category.includes("LegalTech") || item.category.includes("Social");

    return true;
  });

  return (
    <div className="relative min-h-screen bg-[#020202] text-white flex flex-col font-sans selection:bg-[#00FF41]/30 selection:text-white antialiased overflow-x-hidden">
      <MatrixBackground />
      <NoiseFilter />

      {/* Header Bar */}
      <header className="fixed top-4 left-4 right-4 h-16 bg-black/80 border border-white/10 rounded-xl backdrop-blur-md flex items-center justify-between px-6 z-40 max-w-7xl mx-auto shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-white/70 hover:text-[#00FF41] font-mono text-xs font-bold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#00FF41]" />
          <span>VOLTAR AO PORTFÓLIO</span>
        </button>

        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-[#00FF41] animate-pulse" />
          <span className="font-mono text-xs font-black text-white uppercase tracking-wider">
            CASOS DE SUCESSO <span className="text-[#00FF41]">// LOJAS OFICIAIS</span>
          </span>
        </div>

        <button
          onClick={() => {
            const contactEl = document.getElementById("casos-contact");
            if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
          }}
          className="py-1.5 px-4 rounded border border-[#00FF41]/50 bg-black text-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.3)] font-mono text-[9px] font-extrabold uppercase tracking-widest transition-all duration-300 hover:bg-[#00FF41]/15 cursor-pointer"
        >
          CRIAR MEU APP
        </button>
      </header>

      {/* Hero Header */}
      <main className="relative max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-20 space-y-12 w-full flex-1">
        
        <div className="text-center space-y-4 max-w-4xl mx-auto pt-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#00FF41]/10 border border-[#00FF41]/30 text-[#00FF41] font-mono text-xs font-bold rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#00FF41]" />
            <span>PORTFÓLIO PUBLICADO // APPLE APP STORE & GOOGLE PLAY</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Casos de Sucesso: <span className="text-[#00FF41]">Aplicativos Publicados nas Lojas</span>
          </h1>

          <p className="text-sm md:text-base text-white/60 font-sans leading-relaxed max-w-2xl mx-auto">
            Conheça os aplicativos e plataformas desenvolvidos com arquitetura nativa e híbrida de alta performance, disponíveis para download na <strong>Apple App Store</strong>, <strong>Google Play Store</strong> e versão <strong>Web PWA</strong>.
          </p>

          {/* Stat KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-center">
              <span className="block font-mono text-2xl font-black text-[#00FF41]">22+</span>
              <span className="text-[10px] font-mono text-white/50 uppercase">Apps em Produção</span>
            </div>
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-center">
              <span className="block font-mono text-2xl font-black text-white">100%</span>
              <span className="text-[10px] font-mono text-white/50 uppercase">Aprovação nas Lojas</span>
            </div>
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-center">
              <span className="block font-mono text-2xl font-black text-[#00FF41]">+1M</span>
              <span className="text-[10px] font-mono text-white/50 uppercase">Downloads Combinados</span>
            </div>
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-center">
              <span className="block font-mono text-2xl font-black text-white">15+</span>
              <span className="text-[10px] font-mono text-white/50 uppercase">Matérias na Imprensa</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 md:p-6 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-md space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar app por nome ou setor..."
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-white/10 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00FF41] font-sans"
              />
            </div>

            {/* Category Pill Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#00FF41] text-black font-extrabold shadow-[0_0_10px_rgba(0,255,65,0.4)]"
                      : "bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredCases.map((app) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative rounded-3xl bg-neutral-950/90 border border-white/10 p-6 md:p-7 flex flex-col justify-between space-y-6 hover:border-[#00FF41]/50 transition-all duration-300 shadow-xl group"
              >
                {/* Top Badge & Header */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="px-2.5 py-1 bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30 text-[10px] font-mono uppercase font-bold rounded-full">
                      {app.tag}
                    </span>

                    {app.featured && (
                      <span className="flex items-center space-x-1 px-2.5 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-mono uppercase font-bold rounded-full">
                        <Award className="w-3 h-3 text-amber-400" />
                        <span>Destaque</span>
                      </span>
                    )}
                  </div>

                  {/* App Title & Subtitle */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-[#00FF41] transition-colors flex items-center space-x-2">
                      <span>{app.name}</span>
                    </h3>
                    <span className="text-xs font-mono text-white/40 block mt-0.5">
                      Setor: {app.category}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm text-white/70 font-sans leading-relaxed">
                    {app.description}
                  </p>
                </div>

                {/* Press Articles / Imprensa Highlights (If present) */}
                {app.pressArticles && app.pressArticles.length > 0 && (
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center space-x-2 text-[#00FF41] text-[10px] font-mono font-bold uppercase">
                      <Newspaper className="w-3.5 h-3.5" />
                      <span>DESTAQUE NA IMPRENSA</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-white/80 font-sans">
                      {app.pressArticles.map((art, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-[#00FF41] font-mono text-[10px] mt-0.5">•</span>
                          <span>
                            <strong className="text-white font-semibold">{art.source}:</strong> "{art.title}"
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Download Buttons Section */}
                <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-3">
                  {app.iosUrl && <AppStoreButton url={app.iosUrl} />}
                  {app.androidUrl && <GooglePlayButton url={app.androidUrl} />}
                  {app.pwaUrl && <WebPlatformButton url={app.pwaUrl} label="PWA / Web" />}
                  {app.siteUrl && !app.pwaUrl && <WebPlatformButton url={app.siteUrl} label="Visitar Site" />}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredCases.length === 0 && (
          <div className="p-12 text-center bg-black/60 border border-white/10 rounded-3xl space-y-3">
            <Search className="w-8 h-8 text-white/30 mx-auto" />
            <p className="font-mono text-sm text-white">Nenhum aplicativo encontrado para a busca "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("TODOS"); }}
              className="text-xs font-mono text-[#00FF41] underline cursor-pointer"
            >
              Limpar filtros e ver todos
            </button>
          </div>
        )}

        {/* CTA Contact Form Box */}
        <div id="casos-contact" className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-neutral-900 via-black to-neutral-900 border border-[#00FF41]/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 bg-[#00FF41]/10 text-[#00FF41] font-mono text-xs font-bold rounded-full border border-[#00FF41]/30">
              DESENVOLVIMENTO DE APLICATIVOS SOB MEDIDA
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-white">
              Quer ver seu aplicativo publicado na Apple Store e Google Play?
            </h2>
            <p className="text-xs md:text-sm text-white/70 leading-relaxed">
              Desenvolvemos desde a concepção de UI/UX, arquitetura escalável até a publicação e homologação completa nas lojas de aplicativos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://wa.me/5511999999999?text=Ol%C3%A1%21+Vim+pela+p%C3%A1gina+de+Casos+de+Sucesso+e+gostaria+de+um+or%C3%A7amento+para+meu+aplicativo."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#00FF41] text-black font-mono font-black text-xs uppercase tracking-wider rounded-2xl shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:bg-[#00FF41]/90 transition cursor-pointer flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>SOLICITAR ORÇAMENTO VIA WHATSAPP</span>
            </a>

            <button
              onClick={onBack}
              className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider rounded-2xl border border-white/20 transition cursor-pointer"
            >
              VOLTAR AO PORTFÓLIO PRINCIPAL
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
