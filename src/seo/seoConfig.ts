/**
 * Global SEO Configuration for Augusto Dev
 * Centralizes all meta data, contact info, and internal link mappings.
 */

export const SEO_CONFIG = {
  siteName: "Augusto Dev - Criação de sites e Aplicativos",
  defaultTitle: "Augusto Dev - Criação de sites e Aplicativos",
  defaultDescription: "Criação de sites otimizados, Criação de aplicativos Android e IOS, Otimização SEO, Criar Landing page de alta conversão",
  domain: "https://augustodev.com",
  logoUrl: "https://augustodev.com/logo.png",
  ogImageUrl: "https://augustodev.com/og-image.png",
  twitterHandle: "@augusto_dev",
  themeColor: "#00FF41", // Matrix Green
  language: "pt-BR",
  alternateLanguage: "en-US",
  
  // Organization Data for Structured Schema
  organization: {
    name: "Augusto Dev",
    url: "https://augustodev.com",
    logo: "https://augustodev.com/logo.png",
    sameAs: [
      "https://github.com/augusto-dev",
      "https://linkedin.com/in/augusto-dev",
      "https://instagram.com/augusto-dev"
    ],
    contactPoint: {
      telephone: "+55-15-99711-8125",
      contactType: "sales",
      areaServed: "BR",
      availableLanguage: ["Portuguese", "English"]
    }
  },

  // Contact Details
  contact: {
    phone: "+55 (15) 99711-8125",
    phoneUrl: "https://wa.me/5515997118125",
    email: "ecopower.rafael@gmail.com",
    address: {
      streetAddress: "Av. Paulista, 1000",
      addressLocality: "Sorocaba",
      addressRegion: "SP",
      postalCode: "18000-000",
      addressCountry: "BR"
    }
  },

  // Primary Keywords for SEO relevance
  keywords: [
    "criação de sites",
    "criação de aplicativos",
    "desenvolvedor de aplicativos",
    "otimização SEO",
    "criar landing page de alta conversão",
    "desenvolvedor android",
    "desenvolvedor ios",
    "site otimizado google",
    "porto de desenvolvedor de software",
    "core web vitals"
  ],

  // Internal Linking System Mapping (Automated Internal Links Builder)
  internalLinks: [
    { text: "Criação de Aplicativos Delivery", path: "/#project-delivery", topic: "delivery" },
    { text: "Sistemas de Mobilidade e Rotas", path: "/#project-mobility", topic: "mobility" },
    { text: "Sites para Advocacia e Profissionais", path: "/#project-lawyer", topic: "lawyer" },
    { text: "Otimização SEO de Alta Performance", path: "/#seo-optimization", topic: "seo" },
    { text: "Contato para Orçamento", path: "/#contact", topic: "contact" }
  ],

  // --- Dynamic Map Lists for Sitemap Generator ---
  pages: [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/#project-delivery", changefreq: "weekly", priority: "0.9" },
    { path: "/#project-mobility", changefreq: "weekly", priority: "0.9" },
    { path: "/#project-lawyer", changefreq: "weekly", priority: "0.9" },
    { path: "/#seo-optimization", changefreq: "weekly", priority: "0.8" },
    { path: "/#contact", changefreq: "monthly", priority: "0.7" },
    // Category 1: Intenção Comercial / Fundo de Funil
    { path: "/criar-site-profissional", changefreq: "weekly", priority: "0.9" },
    { path: "/quanto-custa-para-criar-um-site", changefreq: "weekly", priority: "0.9" },
    { path: "/empresa-de-criacao-de-sites", changefreq: "weekly", priority: "0.9" },
    { path: "/criar-site-de-vendas", changefreq: "weekly", priority: "0.9" },
    { path: "/orcamento-criacao-de-site", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvedor-de-sites-freelance", changefreq: "weekly", priority: "0.9" },
    { path: "/criar-site-institucional", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvedor-web-senior-freelance", changefreq: "weekly", priority: "0.9" },
    { path: "/programador-full-stack-contratacao", changefreq: "weekly", priority: "0.9" },
    { path: "/empresa-de-desenvolvimento-web-sob-medida", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvedor-especialista-em-react", changefreq: "weekly", priority: "0.9" },
    { path: "/programador-wordpress-senior", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvedor-front-end-especialista", changefreq: "weekly", priority: "0.9" },
    { path: "/criacao-de-sites-de-alta-performance", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-sites-sob-medida", changefreq: "weekly", priority: "0.9" },
    { path: "/site-institucional-personalizado", changefreq: "weekly", priority: "0.9" },
    { path: "/otimizacao-de-velocidade-de-site", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-web-core-web-vitals", changefreq: "weekly", priority: "0.9" },
    { path: "/criacao-de-landing-page-de-alta-conversao", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-sistemas-web-sob-medida", changefreq: "weekly", priority: "0.9" },
    { path: "/integracao-de-api-em-site-wordpress", changefreq: "weekly", priority: "0.9" },
    { path: "/criar-plataforma-de-afiliados-personalizada", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-plataforma-web", changefreq: "weekly", priority: "0.9" },
    { path: "/criar-area-de-membros-customizada", changefreq: "weekly", priority: "0.9" },
    { path: "/consultoria-em-desenvolvimento-web", changefreq: "weekly", priority: "0.9" },
    { path: "/projeto-de-desenvolvimento-de-software-web", changefreq: "weekly", priority: "0.9" },
    { path: "/agencia-de-web-design-premium", changefreq: "weekly", priority: "0.9" },
    { path: "/agencia-de-desenvolvimento-web", changefreq: "weekly", priority: "0.9" },
    { path: "/agencia-de-desenvolvimento-de-software", changefreq: "weekly", priority: "0.9" },
    { path: "/agencia-de-desenvolvimento-de-aplicativos", changefreq: "weekly", priority: "0.9" },
    { path: "/agencia-de-criacao-de-sites-em-sao-paulo", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-portais-corporativos", changefreq: "weekly", priority: "0.9" },
    // Category 1.1: Mobile Development & Apps (Fundo de Funil)
    { path: "/desenvolvedor-mobile-senior-freelance", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-aplicativos-nativos-android-e-ios", changefreq: "weekly", priority: "0.9" },
    { path: "/programador-de-aplicativos-sob-medida", changefreq: "weekly", priority: "0.9" },
    { path: "/empresa-de-desenvolvimento-de-aplicativos-corporativos", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvedor-de-aplicativos-full-stack", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-aplicativos-integrados-com-api", changefreq: "weekly", priority: "0.9" },
    { path: "/criar-aplicativo-com-painel-administrativo-web", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-aplicativos-para-startups", changefreq: "weekly", priority: "0.9" },
    { path: "/consultoria-para-desenvolvimento-de-aplicativos", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-prototipo-de-aplicativo", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvedor-react-native-senior", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-aplicativos-hibridos-de-alta-performance", changefreq: "weekly", priority: "0.9" },
    // Category 2: Ferramentas e Plataformas / Meio de Funil
    { path: "/criar-site-wordpress", changefreq: "weekly", priority: "0.8" },
    { path: "/criar-site-elementor", changefreq: "weekly", priority: "0.8" },
    { path: "/melhor-plataforma-para-criar-site", changefreq: "weekly", priority: "0.8" },
    { path: "/criar-site-wix", changefreq: "weekly", priority: "0.8" },
    { path: "/criar-landing-page-gratis", changefreq: "weekly", priority: "0.8" },
    { path: "/shopify-criar-loja", changefreq: "weekly", priority: "0.8" },
    // Category 3: Informativas e Tutoriais / Topo de Funil
    { path: "/como-criar-um-site", changefreq: "weekly", priority: "0.7" },
    { path: "/como-criar-um-site-do-zero", changefreq: "weekly", priority: "0.7" },
    { path: "/criar-site-gratis", changefreq: "weekly", priority: "0.7" },
    { path: "/como-criar-um-site-de-vendas", changefreq: "weekly", priority: "0.7" },
    { path: "/passo-a-passo-para-criar-um-site", changefreq: "weekly", priority: "0.7" },
    { path: "/criar-site-gratis-no-google", changefreq: "weekly", priority: "0.7" },
    // Category 4: Termos Técnicos e Infraestrutura
    { path: "/dominio-e-hospedagem-de-site", changefreq: "weekly", priority: "0.8" },
    { path: "/como-registrar-um-dominio", changefreq: "weekly", priority: "0.8" },
    { path: "/hospedagem-para-wordpress", changefreq: "weekly", priority: "0.8" },
    { path: "/como-colocar-o-site-no-google", changefreq: "weekly", priority: "0.8" }
  ],

  products: [
    { path: "/produtos/delivery-app", changefreq: "monthly", priority: "0.8" },
    { path: "/produtos/plataforma-mobilidade", changefreq: "monthly", priority: "0.8" },
    { path: "/produtos/site-advocacia", changefreq: "monthly", priority: "0.8" },
    { path: "/produtos/otimizacao-seo", changefreq: "monthly", priority: "0.9" }
  ],

  images: [
    {
      loc: "https://augustodev.com/og-image.png",
      title: "Augusto Dev - Portfólio de Alta Performance",
      caption: "Visualizador do Google Search Console e Otimização SEO Extrema"
    },
    {
      loc: "https://augustodev.com/logo.png",
      title: "Augusto Dev Logo",
      caption: "Desenvolvedor de Software e Arquiteto de Sistemas"
    }
  ],

  videos: [
    {
      loc: "https://augustodev.com/",
      thumbnail_loc: "https://augustodev.com/video-thumbnail.jpg",
      title: "Demonstração de Aplicativo de Delivery em Alta Velocidade",
      description: "Animação 3D interativa de entrega expressa integrada com React e Tailwind.",
      content_loc: "https://augustodev.com/videos/delivery-demo.mp4",
      duration: 35,
      publication_date: "2026-06-27T00:00:00+00:00"
    }
  ]
};
