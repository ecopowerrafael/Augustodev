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
    "criação de sites profissionais",
    "criação de site profissional",
    "desenvolvimento de sites profissionais",
    "site profissional",
    "desenvolvimento de site profissional",
    "criação de websites profissionais",
    "consultoria seo para e-commerce",
    "criamos seu site profissional",
    "procuro agência para desenvolver chatbot customizado",
    "desenvolver site profissional",
    "criação de sites",
    "criação de aplicativos",
    "desenvolvedor de aplicativos",
    "otimização SEO",
    "criar landing page de alta conversão",
    "core web vitals"
  ],

  // Internal Linking System Mapping (Automated Internal Links Builder)
  internalLinks: [
    { text: "Criação de Sites Profissionais", path: "/criacao-de-sites-profissionais", topic: "sites" },
    { text: "Criação de Site Profissional", path: "/criacao-de-site-profissional", topic: "sites" },
    { text: "Desenvolvimento de Sites Profissionais", path: "/desenvolvimento-de-sites-profissionais", topic: "sites" },
    { text: "Site Profissional para Empresas", path: "/site-profissional", topic: "sites" },
    { text: "Desenvolver Chatbot Customizado com IA", path: "/procuro-agencia-para-desenvolver-chatbot-customizado", topic: "chatbot" },
    { text: "Consultoria SEO para E-Commerce", path: "/consultoria-seo-para-e-commerce", topic: "ecommerce" },
    { text: "Criamos Seu Site Profissional", path: "/criamos-seu-site-profissional", topic: "sites" },
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
    // Google Search Console Top Queries (Prioridade Máxima)
    { path: "/criacao-de-sites-profissionais", changefreq: "daily", priority: "1.0" },
    { path: "/criacao-de-site-profissional", changefreq: "daily", priority: "1.0" },
    { path: "/desenvolvimento-de-sites-profissionais", changefreq: "daily", priority: "1.0" },
    { path: "/site-profissional", changefreq: "daily", priority: "1.0" },
    { path: "/desenvolvimento-de-site-profissional", changefreq: "daily", priority: "1.0" },
    { path: "/criacao-de-websites-profissionais", changefreq: "daily", priority: "0.9" },
    { path: "/consultoria-seo-para-e-commerce", changefreq: "daily", priority: "0.9" },
    { path: "/criamos-seu-site-profissional", changefreq: "daily", priority: "0.9" },
    { path: "/procuro-agencia-para-desenvolver-chatbot-customizado", changefreq: "daily", priority: "0.9" },
    { path: "/desenvolver-site-profissional", changefreq: "daily", priority: "0.9" },
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
    // Category 1.2: Termos de Engenharia, Arquitetura e Modernização (Corporativo & Tech)
    { path: "/agencia-de-engenharia-de-software", changefreq: "weekly", priority: "0.9" },
    { path: "/empresa-de-desenvolvimento-de-codigo-sob-medida", changefreq: "weekly", priority: "0.9" },
    { path: "/agencia-de-arquitetura-de-software-web", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-sistemas-web-e-aplicativos-corporativos", changefreq: "weekly", priority: "0.9" },
    { path: "/programacao-de-plataformas-web-escalaveis", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-web-full-stack-para-empresas", changefreq: "weekly", priority: "0.9" },
    { path: "/agencia-para-integracao-de-apis-e-sistemas", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-sistemas-web-integrados", changefreq: "weekly", priority: "0.9" },
    { path: "/programacao-de-painel-administrativo-personalizado", changefreq: "weekly", priority: "0.9" },
    { path: "/agencia-especializada-em-desenvolvimento-de-apis", changefreq: "weekly", priority: "0.9" },
    { path: "/criacao-de-plataformas-e-commerce-e-marketplace-sob-medida", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-sistemas-com-banco-de-dados-customizado", changefreq: "weekly", priority: "0.9" },
    { path: "/agencia-para-reformulacao-de-sistemas-web", changefreq: "weekly", priority: "0.9" },
    { path: "/migracao-de-sistemas-para-tecnologias-modernas", changefreq: "weekly", priority: "0.9" },
    { path: "/agencia-de-otimizacao-e-refatoracao-de-codigo", changefreq: "weekly", priority: "0.9" },
    { path: "/reestruturacao-de-sites-institucionais-antigos", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-novas-funcionalidades-para-sistemas-web", changefreq: "weekly", priority: "0.9" },
    { path: "/agencia-para-desenvolvimento-de-saas", changefreq: "weekly", priority: "0.9" },
    { path: "/criacao-e-programacao-de-produtos-digitais", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-mvp-para-startups", changefreq: "weekly", priority: "0.9" },
    { path: "/agencia-para-criar-plataforma-web-personalizada", changefreq: "weekly", priority: "0.9" },
    { path: "/programacao-de-sistemas-de-afiliados-e-comissoes", changefreq: "weekly", priority: "0.9" },
    // Category 1.3: Termos de Segurança, LGPD e Conformidade (Compliance)
    { path: "/agencia-de-desenvolvimento-web-com-foco-em-seguranca", changefreq: "weekly", priority: "0.9" },
    { path: "/criacao-de-sites-adequados-a-lgpd", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-sistemas-com-criptografia-de-dados", changefreq: "weekly", priority: "0.9" },
    { path: "/auditoria-e-correcao-de-seguranca-web", changefreq: "weekly", priority: "0.9" },
    { path: "/programacao-de-sistemas-web-seguros-corporativos", changefreq: "weekly", priority: "0.9" },

    // Category 1.4: Termos de "Squads" e Outsource de Tecnologia (B2B de Alto Nível)
    { path: "/terceirizacao-de-desenvolvimento-de-software", changefreq: "weekly", priority: "0.9" },
    { path: "/alocacao-de-desenvolvedores-web-senior", changefreq: "weekly", priority: "0.9" },
    { path: "/squad-de-desenvolvimento-web-sob-medida", changefreq: "weekly", priority: "0.9" },
    { path: "/fabrica-de-software-para-projetos-corporativos", changefreq: "weekly", priority: "0.9" },
    { path: "/agencia-de-outsourcing-de-programacao-mobile", changefreq: "weekly", priority: "0.9" },

    // Category 1.5: Termos Baseados em Dores Críticas de Negócio (Sintomas)
    { path: "/meu-sistema-web-esta-lento-o-que-fazer", changefreq: "weekly", priority: "0.9" },
    { path: "/agencia-para-corrigir-erros-de-programacao-em-site", changefreq: "weekly", priority: "0.9" },
    { path: "/como-integrar-api-de-pagamento-customizada", changefreq: "weekly", priority: "0.9" },
    { path: "/empresa-para-migrar-site-para-servidor-dedicado", changefreq: "weekly", priority: "0.9" },
    { path: "/melhorar-core-web-vitals-de-portal-corporativo", changefreq: "weekly", priority: "0.9" },

    // Category 1.6: Termos de Design de Interação e Experiência do Usuário (UI/UX)
    { path: "/agencia-de-ui-ux-design-e-desenvolvimento-web", changefreq: "weekly", priority: "0.9" },
    { path: "/criacao-de-interfaces-web-personalizadas", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-sites-com-animacoes-fluidas", changefreq: "weekly", priority: "0.9" },
    { path: "/agencia-de-web-design-focada-em-experiencia-do-usuario", changefreq: "weekly", priority: "0.9" },
    { path: "/prototipagem-e-programacao-de-sistemas-mobile", changefreq: "weekly", priority: "0.9" },

    // Category 1.7: Termos de Automação e Modelos de Negócios Digitais Específicos
    { path: "/programacao-de-portal-de-autoatendimento-para-clientes", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-sistema-de-agendamento-e-pagamentos", changefreq: "weekly", priority: "0.9" },
    { path: "/criar-plataforma-de-automacao-comercial-web", changefreq: "weekly", priority: "0.9" },

    // Category 1.8: Termos de Freelancers de Elite e Soluções Sênior (B2B / Resgate)
    { path: "/desenvolvedor-web-senior-freelance", changefreq: "weekly", priority: "0.9" },
    { path: "/programador-full-stack-senior-freelancer", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvedor-mobile-freelancer-aplicativos-ios-android", changefreq: "weekly", priority: "0.9" },
    { path: "/consultoria-e-desenvolvimento-web-freelancer-para-empresas", changefreq: "weekly", priority: "0.9" },
    { path: "/programador-wordpress-senior-freelancer", changefreq: "weekly", priority: "0.9" },
    { path: "/programador-freelancer-manutencao-resgate-sistemas", changefreq: "weekly", priority: "0.9" },

    // Category 1.9: SEO Local, E-Commerce, Reputação, Migração e EEAT (Nicho Premium)
    { path: "/como-colocar-minha-empresa-no-topo-do-google-maps", changefreq: "weekly", priority: "0.9" },
    { path: "/agencia-de-seo-local-para-empresas", changefreq: "weekly", priority: "0.9" },
    { path: "/consultoria-para-otimizacao-de-perfil-da-empresa-no-google", changefreq: "weekly", priority: "0.9" },
    { path: "/como-atrair-clientes-de-alto-padrao-pelo-google-maps", changefreq: "weekly", priority: "0.9" },
    { path: "/estrategia-de-seo-para-negocios-locais", changefreq: "weekly", priority: "0.9" },
    { path: "/consultoria-de-seo-para-e-commerce", changefreq: "weekly", priority: "0.9" },
    { path: "/como-indexar-produtos-da-loja-virtual-no-google", changefreq: "weekly", priority: "0.9" },
    { path: "/especialista-em-seo-para-plataformas-de-e-commerce", changefreq: "weekly", priority: "0.9" },
    { path: "/como-aumentar-o-trafego-organico-de-uma-loja-online", changefreq: "weekly", priority: "0.9" },
    { path: "/otimizacao-de-seo-para-shopify-e-wordpress", changefreq: "weekly", priority: "0.9" },
    { path: "/como-remover-ou-ocultar-links-negativos-do-google", changefreq: "weekly", priority: "0.9" },
    { path: "/gerenciamento-de-reputacao-digital-no-google", changefreq: "weekly", priority: "0.9" },
    { path: "/agencia-para-limpar-buscas-com-nome-da-empresa", changefreq: "weekly", priority: "0.9" },
    { path: "/como-melhorar-a-reputacao-da-marca-no-buscador", changefreq: "weekly", priority: "0.9" },
    { path: "/como-mudar-de-site-sem-perder-o-posicionamento-no-google", changefreq: "weekly", priority: "0.9" },
    { path: "/consultoria-para-migracao-de-site-institucional", changefreq: "weekly", priority: "0.9" },
    { path: "/redirecionamento-301-de-urls-em-massa-seo", changefreq: "weekly", priority: "0.9" },
    { path: "/cuidados-de-seo-ao-refazer-um-site-do-zero", changefreq: "weekly", priority: "0.9" },
    { path: "/seo-para-medicos-e-clinicas-particulares", changefreq: "weekly", priority: "0.9" },
    { path: "/como-posicionar-escritorio-de-advocacia-no-google", changefreq: "weekly", priority: "0.9" },
    { path: "/marketing-de-conteudo-focado-em-seo-para-nicho-de-luxo", changefreq: "weekly", priority: "0.9" },
    { path: "/otimizacao-de-sites-para-profissionais-de-saude-seo", changefreq: "weekly", priority: "0.9" },

    // Category 2.1: Automação de Processos e Inteligência Artificial (Produtividade Corporativa)
    { path: "/desenvolvimento-de-chatbot-personalizado-com-ia", changefreq: "weekly", priority: "0.9" },
    { path: "/integracao-de-api-de-inteligencia-artificial-em-sistemas", changefreq: "weekly", priority: "0.9" },
    { path: "/automatizacao-de-processos-internos-via-software", changefreq: "weekly", priority: "0.9" },
    { path: "/criar-gerador-de-conteudo-automatizado-corporativo", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-ferramentas-de-automacao-comercial", changefreq: "weekly", priority: "0.9" },

    // Category 2.2: Sistemas Web Complexos e Ecossistemas de Afiliados/Vendas
    { path: "/desenvolvimento-de-sistema-de-afiliados-personalizado", changefreq: "weekly", priority: "0.9" },
    { path: "/criar-plataforma-web-com-painel-administrativo-restrito", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-saas-sob-medida", changefreq: "weekly", priority: "0.9" },
    { path: "/criar-sistema-de-comissionamento-e-vendas-web", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-dashboards-corporativos-integrados", changefreq: "weekly", priority: "0.9" },

    // Category 2.3: Modernização e Resgate de Código (Refactoring)
    { path: "/empresa-para-refatoracao-de-sistemas-web", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvedor-para-corrigir-erros-de-codigo-legado", changefreq: "weekly", priority: "0.9" },
    { path: "/migracao-de-banco-de-dados-para-servidor-em-nuvem", changefreq: "weekly", priority: "0.9" },
    { path: "/modernizacao-de-sistemas-corporativos-antigos", changefreq: "weekly", priority: "0.9" },
    { path: "/manutencao-preventiva-de-plataformas-web", changefreq: "weekly", priority: "0.9" },

    // Category 2.4: Integrações Complexas de APIs e Ecossistemas Mobile
    { path: "/integracao-de-api-customizada-em-site-profissional", changefreq: "weekly", priority: "0.9" },
    { path: "/desenvolvimento-de-aplicativo-integrado-com-erp", changefreq: "weekly", priority: "0.9" },
    { path: "/programacao-de-sistemas-com-banco-de-dados-escalavel", changefreq: "weekly", priority: "0.9" },
    { path: "/criar-plataforma-mobile-integrated-com-sistema-web", changefreq: "weekly", priority: "0.9" },
    { path: "/criar-plataforma-mobile-integrada-com-sistema-web", changefreq: "weekly", priority: "0.9" },

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
