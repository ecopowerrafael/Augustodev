import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, ArrowRight, CheckCircle2, TrendingUp, Sparkles, Zap, 
  Search, ShieldCheck, DollarSign, Clock, Layers, Award, BarChart3, HelpCircle, FileText
} from "lucide-react";
import { useSEO, MetaTags, StructuredData, Breadcrumb, FAQSchema, ProductSchema } from "./SEOComponents";
import { SEO_CONFIG } from "./seoConfig";
import InternalLinker from "./InternalLinker";
import { NEW_SEO_LANDING_DATA } from "./seoLandingDataNew";

// Types for Landing Content
export interface LandingPageData {
  slug: string;
  category: "fundo" | "meio" | "topo" | "tecnico";
  title: string;
  metaDescription: string;
  heading: string;
  subheading: string;
  introText: string;
  keywords: string[];
  featuresTitle: string;
  features: { title: string; desc: string }[];
  caseStudy: {
    client: string;
    metricBefore: string;
    metricAfter: string;
    description: string;
    badge: string;
  };
  roiLabel: string;
  baseInvestment: number;
  estReturnMultiplier: number;
  faqList: { question: string; answer: string }[];
  author: string;
  ctaTitle: string;
  ctaDescription: string;
}

export const SEO_LANDING_DATA_BASE: Record<string, LandingPageData> = {
  // --- Category 1: Intenção Comercial (Fundo de Funil) ---
  "criar-site-profissional": {
    slug: "criar-site-profissional",
    category: "fundo",
    title: "Como Criar um Site Profissional Otimizado e de Alto Impacto",
    metaDescription: "Criação de sites profissionais sob medida em React e Tailwind. Otimizados para Core Web Vitals, alta performance e conversão com Augusto Dev.",
    heading: "Criação de Sites Profissionais de Altíssima Performance",
    subheading: "Aumente suas vendas e autoridade com um ecossistema digital imbatível em velocidade e design.",
    introText: "Um site profissional não é apenas um cartão de visitas; é o motor de vendas da sua empresa. Desenvolvemos soluções com arquitetura de software de ponta, livres do peso de templates prontos e lentos.",
    keywords: ["criar site profissional", "desenvolvedor de sites", "site profissional preço", "desenvolvedor web", "site de alta performance"],
    featuresTitle: "O que faz um site ser verdadeiramente profissional?",
    features: [
      { title: "Velocidade Exponencial", desc: "Desenvolvido em React e Vite, alcançando nota 100 no Google Lighthouse." },
      { title: "Arquitetura Mobile-First", desc: "Adaptado perfeitamente para todas as telas, de smartphones a monitores 4K." },
      { title: "Código Limpo (Semantic HTML)", desc: "Facilidade de rastreamento para o Google indexar suas páginas no topo." }
    ],
    caseStudy: {
      client: "Inovação Imobiliária",
      metricBefore: "3.5s tempo de carregamento",
      metricAfter: "0.4s tempo de carregamento",
      description: "Reconstruímos o portal corporativo com React e Tailwind, resultando em um aumento de 142% na geração de leads qualificados.",
      badge: "Performance Extrema"
    },
    roiLabel: "Estimativa de Retorno por Velocidade",
    baseInvestment: 3500,
    estReturnMultiplier: 3.5,
    faqList: [
      { question: "Por que escolher um site sob medida em vez de WordPress simples?", answer: "Sites sob medida carregam em milissegundos e oferecem segurança total contra invasões comuns em plugins legados, além de design único e exclusivo para sua marca." },
      { question: "O site já vem otimizado para o Google?", answer: "Sim. Cada linha de código é projetada sob as diretrizes oficiais de SEO para garantir posicionamento orgânico de excelência." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Pronto para ter um site imbatível?",
    ctaDescription: "Fale diretamente comigo no WhatsApp e obtenha um diagnóstico de performance gratuito da sua estrutura atual."
  },
  "quanto-custa-para-criar-um-site": {
    slug: "quanto-custa-para-criar-um-site",
    category: "fundo",
    title: "Quanto Custa Para Criar um Site em 2026? Tabela e Orçamento",
    metaDescription: "Entenda quanto custa para criar um site profissional sob medida. Veja fatores de preço para landing pages, sites institucionais e lojas virtuais.",
    heading: "Quanto Custa para Criar um Site Profissional em 2026?",
    subheading: "Transparência total nos custos de desenvolvimento. Saiba onde investir para obter o melhor retorno financeiro.",
    introText: "O custo de um site varia conforme a complexidade técnica, número de páginas e integrações necessárias. Descubra os valores médios de mercado e o custo-benefício de investir em código limpo.",
    keywords: ["quanto custa para criar um site", "orçamento site profissional", "valor de site institucional", "preço desenvolvimento react"],
    featuresTitle: "Composição de Custos de Desenvolvimento",
    features: [
      { title: "Landing Pages de Conversão", desc: "Estruturas focadas em vendas rápidas, ideais para campanhas de tráfego pago." },
      { title: "Portfólios e Sites Institucionais", desc: "Múltiplas páginas para consolidar sua marca e autoridade orgânica." },
      { title: "Sistemas e Aplicações Web", desc: "Painéis interativos, integrações de APIs personalizadas e bancos de dados." }
    ],
    caseStudy: {
      client: "Clinica Odonto Sorocaba",
      metricBefore: "R$ 4.000,00 gastos em anúncios perdidos por lentidão",
      metricAfter: "ROI de 340% após otimização da landing page",
      description: "Uma página mais rápida diminuiu a taxa de rejeição de 78% para apenas 12%, reduzindo o custo por lead pela metade.",
      badge: "Retorno Financeiro"
    },
    roiLabel: "Calculadora de Redução de Custo por Lead",
    baseInvestment: 2500,
    estReturnMultiplier: 2.8,
    faqList: [
      { question: "Qual o custo de manutenção de um site feito sob medida?", answer: "Muito baixo. Diferente de plataformas comuns que exigem plugins pagos mensais, hospedagens modernas de alta velocidade oferecem planos robustos e escaláveis por valores mínimos." },
      { question: "É possível expandir o site futuramente?", answer: "Sim. Como o código é modular, você pode adicionar novas seções, blogs ou sistemas a qualquer momento." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Solicite um Orçamento sem Compromisso",
    ctaDescription: "Entre em contato para desenharmos uma proposta alinhada ao seu orçamento e objetivos de crescimento."
  },
  "empresa-de-criacao-de-sites": {
    slug: "empresa-de-criacao-de-sites",
    category: "fundo",
    title: "Empresa de Criação de Sites - Augusto Dev Tecnologia",
    metaDescription: "Procurando uma empresa de criação de sites de alta conversão? Desenvolvemos plataformas interativas em React de altíssimo nível visual.",
    heading: "Sua Empresa Precisa de um Site de Nível Global",
    subheading: "Parceria tecnológica sólida para transformar ideias em plataformas web de alta conversão.",
    introText: "Mais do que criar layouts, Augusto Dev desenvolve softwares corporativos que geram credibilidade instantânea ao usuário e são amados pelos robôs de indexação do Google.",
    keywords: ["empresa de criacao de sites", "agência de desenvolvimento", "desenvolvedor de sites sorocaba", "empresa criação landing pages"],
    featuresTitle: "Diferenciais Técnicos de Nosso Atendimento",
    features: [
      { title: "Código Proprietário Exclusivo", desc: "Total controle sobre as funcionalidades do seu sistema sem dependências limitantes." },
      { title: "Foco Absoluto em Conversão", desc: "Estudo aprofundado de UX/UI para direcionar o cliente para a ação de contato ou compra." },
      { title: "Suporte e Evolução Ágil", desc: "Canal direto de comunicação com o desenvolvedor, eliminando burocracias de agências tradicionais." }
    ],
    caseStudy: {
      client: "SaaS Monitora",
      metricBefore: "8 dias para ajustes simples via agência antiga",
      metricAfter: "Ajustes instantâneos e suporte sob medida",
      description: "Parceria de longo prazo que modernizou todo o ecossistema de captura de leads e documentação técnica da empresa.",
      badge: "Parceria Estratégica"
    },
    roiLabel: "Ganho de Produtividade em Ajustes",
    baseInvestment: 4500,
    estReturnMultiplier: 4.0,
    faqList: [
      { question: "Vocês atendem empresas de qualquer localidade?", answer: "Sim, atuamos de forma 100% remota com reuniões ágeis e acompanhamento em tempo real do desenvolvimento." },
      { question: "O site possui painel de controle administrativo?", answer: "Desenvolvemos soluções integradas com CMS headless para que você atualize textos e imagens facilmente." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Eleve o Nível Digital de Sua Empresa",
    ctaDescription: "Entre em contato e descubra como uma solução profissional e moderna pode acelerar seus negócios."
  },
  "criar-site-de-vendas": {
    slug: "criar-site-de-vendas",
    category: "fundo",
    title: "Criar Site de Vendas (Loja Virtual) Otimizado e Lucrativo",
    metaDescription: "Saiba como criar um site de vendas de alta performance. E-commerces ultra velozes integrados com meios de pagamento modernos e SEO local.",
    heading: "Criação de Lojas Virtuais e Sites de Venda Ultra Rápidos",
    subheading: "Lojas virtuais que carregam instantaneamente e multiplicam o fechamento de carrinhos.",
    introText: "A lentidão é o principal motivo do abandono de carrinhos de compras em plataformas tradicionais. Desenvolvemos soluções de e-commerce leves que convertem tráfego em vendas reais.",
    keywords: ["criar site de vendas", "criar loja virtual", "desenvolvimento e-commerce", "loja online otimizada", "vender pela internet"],
    featuresTitle: "Recursos Cruciais para Vender Mais",
    features: [
      { title: "Checkout de Um Clique", desc: "Redução de atrito no momento do pagamento para acelerar a conversão." },
      { title: "Integração Completa de APIs", desc: "Sincronização imediata de meios de pagamento (Pix, cartões), transportadoras e ERPs." },
      { title: "SEO focado em Produtos", desc: "Marcação de dados estruturados para seus produtos aparecerem destacados na busca do Google." }
    ],
    caseStudy: {
      client: "Grife Modas",
      metricBefore: "Taxa de conversão de 1.1%",
      metricAfter: "Taxa de conversão de 3.4% pós-desenvolvimento",
      description: "Reestruturação completa da vitrine digital e fluxo de pagamento, gerando um aumento substancial nas vendas recorrentes.",
      badge: "E-Commerce de Elite"
    },
    roiLabel: "Calculadora de Conversão de Vendas",
    baseInvestment: 6000,
    estReturnMultiplier: 5.2,
    faqList: [
      { question: "Como funciona a segurança das transações?", answer: "Utilizamos protocolos modernos de criptografia de ponta a ponta e gateways consolidados no mercado como Stripe e Mercado Pago." },
      { question: "É fácil cadastrar novos produtos?", answer: "Sim, disponibilizamos um painel administrativo extremamente intuitivo e rápido." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Comece a Vender Mais Hoje Mesmo",
    ctaDescription: "Vamos estruturar sua loja virtual de alta velocidade. Agende uma conversa."
  },
  "orcamento-criacao-de-site": {
    slug: "orcamento-criacao-de-site",
    category: "fundo",
    title: "Solicitar Orçamento de Criação de Site Personalizado",
    metaDescription: "Solicite um orçamento sob medida para o desenvolvimento de seu site ou aplicativo. Resposta ágil e diagnóstico de SEO técnico gratuito.",
    heading: "Orçamento Sob Medida para Criação do seu Projeto",
    subheading: "Receba uma análise transparente e descubra o valor do investimento ideal para suas metas.",
    introText: "Seu projeto merece um planejamento individualizado. Analisamos seus concorrentes diretos, palavras-chave relevantes e criamos uma proposta focada em resultado.",
    keywords: ["orçamento criação de site", "quanto custa um site profissional", "desenvolvimento personalizado preço"],
    featuresTitle: "O que está incluído em nosso orçamento?",
    features: [
      { title: "Análise Competitiva", desc: "Estudo detalhado do posicionamento digital de seus principais concorrentes." },
      { title: "Planejamento Arquitetural", desc: "Definição clara das telas, tecnologias e caminhos de conversão de usuários." },
      { title: "SEO On-Page Garantido", desc: "Todas as regras de performance e indexação nativas no projeto desde o dia zero." }
    ],
    caseStudy: {
      client: "Advocacia Associada",
      metricBefore: "Proposta antiga confusa de agência tradicional",
      metricAfter: "Transparência total e projeto entregue no prazo",
      description: "Entregamos a solução em 21 dias contendo blog otimizado e painel de captura de agendamentos automatizados.",
      badge: "Transparência Total"
    },
    roiLabel: "Transparência de Orçamento",
    baseInvestment: 3000,
    estReturnMultiplier: 3.0,
    faqList: [
      { question: "Quais as formas de pagamento disponíveis?", answer: "Trabalhamos com opções flexíveis, parcelamento em cartão de crédito ou desconto especial via Pix." },
      { question: "Em quanto tempo recebo a proposta?", answer: "Após nosso primeiro bate-papo, enviamos o detalhamento completo em até 24 horas úteis." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Vamos Conversar Sobre Seu Projeto?",
    ctaDescription: "Preencha suas informações ou fale instantaneamente pelo WhatsApp e dê o primeiro passo."
  },
  "desenvolvedor-de-sites-freelance": {
    slug: "desenvolvedor-de-sites-freelance",
    category: "fundo",
    title: "Desenvolvedor de Sites Freelance de Alta Performance",
    metaDescription: "Contrate um desenvolvedor de sites freelance sênior. Especialista em React, Tailwind CSS, otimização de Core Web Vitals e SEO técnico.",
    heading: "Desenvolvedor de Sites Freelance de Alta Performance",
    subheading: "Comunicação direta, agilidade técnica de nível sênior e foco absoluto nas metas do seu negócio.",
    introText: "Trabalhar com um profissional experiente elimina as camadas de burocracia e custos extras de agências corporativas. Garantia de entrega no prazo com excelência técnica.",
    keywords: ["desenvolvedor de sites freelance", "programador react freelancer", "contratar programador freelancer", "seo freelancer", "desenvolvedor front-end"],
    featuresTitle: "Vantagens de Contratar Direto",
    features: [
      { title: "Contato Direto Sem Ruídos", desc: "Você conversa diretamente com quem escreve o código, acelerando alterações e feedbacks." },
      { title: "Velocidade e Prontidão", desc: "Cronograma de entrega rigoroso sem atrasos por processos paralelos de equipe." },
      { title: "Qualidade de Código Sênior", desc: "Zero amadorismo. Utilizo as mesmas práticas das principais empresas de tecnologia global." }
    ],
    caseStudy: {
      client: "Startup Delivery Express",
      metricBefore: "Sistemas legados cheios de bugs e lentidão",
      metricAfter: "Estabilidade de 99.9% e carregamento imediato",
      description: "Reformulamos a arquitetura do aplicativo de entregas, estabilizando as requisições de mapas e melhorando a fidelidade dos usuários.",
      badge: "Sênior Freelance"
    },
    roiLabel: "Agilidade de Entrega vs Agências",
    baseInvestment: 4000,
    estReturnMultiplier: 3.6,
    faqList: [
      { question: "Como funciona o cronograma de entregas?", answer: "Dividimos o projeto em sprints semanais com apresentações reais do progresso para você testar no ambiente de homologação." },
      { question: "Você realiza manutenção de sites prontos?", answer: "Sim, realizamos otimização de performance, correções de bugs de segurança e adição de novas ferramentas." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Fale com um Especialista Agora",
    ctaDescription: "Sem intermediários. Envie sua ideia e analisarei a viabilidade técnica gratuitamente."
  },
  "criar-site-institucional": {
    slug: "criar-site-institucional",
    category: "fundo",
    title: "Como Criar Site Institucional Otimizado e Elegante",
    metaDescription: "Desenvolvimento de sites institucionais modernos em React. Garanta presença digital forte com design limpo, SEO local e velocidade incomparável.",
    heading: "Desenvolvimento de Sites Institucionais e Corporativos",
    subheading: "Consolide a presença da sua marca no Google com refinamento estético e autoridade técnica.",
    introText: "Seu site institucional precisa transmitir confiança em segundos. Criamos layouts sóbrios, de alta legibilidade, ideais para escritórios, clínicas e indústrias.",
    keywords: ["criar site institucional", "desenvolvimento de site corporativo", "site institucional preço", "seo para empresas"],
    featuresTitle: "Pilares do Site Institucional Moderno",
    features: [
      { title: "Painel de Autoridade", desc: "Apresentação clara de seus diferenciais competitivos, cases e certificações." },
      { title: "Blog Integrado de Alta Velocidade", desc: "Área de notícias otimizada para você capturar tráfego orgânico constante." },
      { title: "Conformidade Total LGPD", desc: "Políticas de privacidade, segurança de dados e consentimento de cookies integrados nativamente." }
    ],
    caseStudy: {
      client: "Logística Brasil",
      metricBefore: "Sem canal estruturado de captação orgânica",
      metricAfter: "28 novos leads de grandes contas mensais via blog",
      description: "Implementamos um portal de autoridade corporativa com blog otimizado para o nicho de transporte e armazenagem.",
      badge: "Autoridade Corporativa"
    },
    roiLabel: "Crescimento de Visibilidade Corporativa",
    baseInvestment: 3200,
    estReturnMultiplier: 3.1,
    faqList: [
      { question: "O site institucional se adapta a celulares?", answer: "Perfeitamente. O design é totalmente responsivo, garantindo navegação confortável em qualquer dispositivo." },
      { question: "É possível adicionar uma loja virtual no futuro?", answer: "Sim, toda a arquitetura é extensível e adaptada para novos módulos de venda." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Modernize a Imagem Digital de Sua Empresa",
    ctaDescription: "Agende uma demonstração de layouts institucionais e comprove o diferencial estético."
  },

  // --- Category 2: Ferramentas e Plataformas (Meio de Funil) ---
  "criar-site-wordpress": {
    slug: "criar-site-wordpress",
    category: "meio",
    title: "Criar Site WordPress Otimizado e Rápido | Augusto Dev",
    metaDescription: "Aprenda a criar um site WordPress de alta performance. Otimização extrema de templates pesados e infraestrutura moderna de servidor.",
    heading: "Desenvolvimento e Otimização Extrema em WordPress",
    subheading: "Obtenha a flexibilidade do maior CMS do mundo com velocidade e segurança de nível sênior.",
    introText: "WordPress é excelente para gestão de conteúdo, mas frequentemente sofre com lentidão devido ao excesso de plugins. Nós reestruturamos seu WordPress para torná-lo ultra-rápido.",
    keywords: ["criar site wordpress", "otimização de wordpress", "wordpress lento", "desenvolvedor wordpress", "performance wordpress"],
    featuresTitle: "Como transformamos seu WordPress em uma Máquina de Vendas",
    features: [
      { title: "Limpeza de Banco de Dados", desc: "Eliminação de lixo e revisões antigas para acelerar consultas e buscas." },
      { title: "Configuração Avançada de Cache", desc: "Armazenamento em memória de páginas estáticas, diminuindo o tempo de resposta do servidor." },
      { title: "Imagens em WebP e AVIF", desc: "Redução do peso das mídias sem perder qualidade visual." }
    ],
    caseStudy: {
      client: "Blog da Saúde",
      metricBefore: "Lighthouse Performance de 34",
      metricAfter: "Lighthouse Performance de 96 pós-otimização",
      description: "Reformulamos a hospedagem, removemos plugins pesados e reconstruímos o template, triplicando os acessos mensais do portal.",
      badge: "Otimização WordPress"
    },
    roiLabel: "Calculadora de Velocidade de Página WP",
    baseInvestment: 2800,
    estReturnMultiplier: 2.5,
    faqList: [
      { question: "Vocês usam Elementor?", answer: "Usamos quando o cliente necessita de autonomia para edições, mas sempre configuramos de forma limpa, limitando scripts desnecessários que deixam o site lento." },
      { question: "Como funciona a segurança do WordPress?", answer: "Implementamos firewalls ativos, limitadores de tentativas de login e atualizações de segurança automatizadas." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Seu WordPress Está Lento?",
    ctaDescription: "Deixe-me analisar sua estrutura hoje mesmo e mostrar onde estão os gargalos de carregamento."
  },
  "criar-site-elementor": {
    slug: "criar-site-elementor",
    category: "meio",
    title: "Criar Site Elementor - Velocidade e Autonomia Editorial",
    metaDescription: "Criação de sites com Elementor Pro otimizado. Tenha total autonomia para editar suas páginas sem comprometer a performance no Google.",
    heading: "Desenvolvimento com Elementor de Alta Performance",
    subheading: "A autonomia do arrasta-e-solta aliada a técnicas avançadas de otimização de velocidade.",
    introText: "Elementor é o construtor visual mais querido pelas equipes de marketing. Desenvolvemos estruturas limpas usando Elementor Pro, permitindo que você altere textos facilmente sem quebrar a velocidade do site.",
    keywords: ["criar site elementor", "elementor otimizado", "landing page elementor", "desenvolvedor elementor freelance"],
    featuresTitle: "Nosso Diferencial com Elementor",
    features: [
      { title: "Autonomia Completa de Edição", desc: "Treinamento em vídeo exclusivo ensinando você a editar cada banner e palavra do seu site." },
      { title: "Estilos Globais Limpos", desc: "Evitamos a geração excessiva de código CSS repetido na página, mantendo a leveza do arquivo final." },
      { title: "Mobile Otimizado Individualmente", desc: "Configuramos cada elemento para se adaptar de forma ideal e limpa a smartphones." }
    ],
    caseStudy: {
      client: "Agência de Lançamentos X",
      metricBefore: "Taxa de conversão de leads de 22%",
      metricAfter: "Taxa de conversão de leads de 45%",
      description: "Landing page de vendas otimizada que carregou em menos de 1 segundo mesmo com alto fluxo de acessos simultâneos de campanhas.",
      badge: "Marketing Ágil"
    },
    roiLabel: "Taxa de Conversão em Lançamentos",
    baseInvestment: 2200,
    estReturnMultiplier: 2.9,
    faqList: [
      { question: "Preciso comprar a licença do Elementor Pro?", answer: "Nós fornecemos e configuramos a licença profissional para o seu site durante o período de desenvolvimento." },
      { question: "É fácil criar novas páginas sozinho?", answer: "Sim, criamos uma biblioteca de seções prontas para você clonar e usar como blocos de construção." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Crie Suas Landing Pages com Liberdade",
    ctaDescription: "Obtenha uma estrutura Elementor profissional e rápida para suas campanhas."
  },
  "melhor-plataforma-para-criar-site": {
    slug: "melhor-plataforma-para-criar-site",
    category: "meio",
    title: "Melhor Plataforma para Criar Site em 2026: Guia",
    metaDescription: "Qual a melhor plataforma para criar site em 2026? Comparamos React, WordPress, Wix e Shopify. Veja a análise técnica completa.",
    heading: "Qual a Melhor Plataforma para Criar Site em 2026?",
    subheading: "Análise técnica imparcial para direcionar o investimento tecnológico da sua empresa.",
    introText: "Não existe plataforma única perfeita, mas existe a ferramenta ideal para a sua necessidade atual de vendas e escala de negócios. Descubra os prós e contras de cada opção comercial.",
    keywords: ["melhor plataforma para criar site", "comparativo plataformas de site", "react vs wordpress", "qual escolher para e-commerce"],
    featuresTitle: "Visão Geral Comparativa de Ecossistemas",
    features: [
      { title: "Custom React/Vite (Soberania)", desc: "Performance imbatível, segurança militar e zero custos recorrentes de plataforma. Ideal para liderança orgânica absoluta." },
      { title: "WordPress (Versatilidade)", desc: "Líder absoluto em gestão de conteúdo e blogs, de fácil atualização por equipes não técnicas." },
      { title: "Shopify (E-Commerce Robusto)", desc: "A melhor e mais robusta solução mundial para vendas online prontas, estável e segura." }
    ],
    caseStudy: {
      client: "Plataforma de Cursos Master",
      metricBefore: "Presos a construtores lentos com mensalidade cara",
      metricAfter: "Migração completa para React com carregamento imediato",
      description: "A migração tecnológica permitiu suportar 10x mais alunos ativos simultâneos com um custo de servidor 80% menor.",
      badge: "Arquitetura Avançada"
    },
    roiLabel: "Economia com Mensalidades e Servidor",
    baseInvestment: 3500,
    estReturnMultiplier: 3.2,
    faqList: [
      { question: "Vale a pena usar Wix para negócios profissionais?", answer: "Wix é bom para iniciantes, mas limita severamente a velocidade de indexação e o SEO técnico complexo necessário para competir em nichos concorridos." },
      { question: "Como sei qual a ideal para minha empresa?", answer: "Nós analisamos seus objetivos de vendas atuais, equipe interna de marketing e recursos de suporte para indicar a melhor solução técnica." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Precisa de Direcionamento Tecnológico?",
    ctaDescription: "Explique suas metas e ajudarei a escolher a melhor arquitetura técnica."
  },
  "criar-site-wix": {
    slug: "criar-site-wix",
    category: "meio",
    title: "Criar Site Wix vs Desenvolvimento Sob Medida: Comparativo",
    metaDescription: "Entenda as limitações do Wix e as vantagens de migrar para um site profissional desenvolvido sob medida em React e Tailwind.",
    heading: "Criar Site Wix ou Migrar para uma Solução Sob Medida?",
    subheading: "A verdade técnica sobre plataformas prontas e os limites de crescimento de seu negócio.",
    introText: "O Wix é excelente para quem está dando os primeiros passos sem orçamento, mas empresas consolidadas sofrem com restrições de SEO e tempo de carregamento lento causados por códigos proprietários pesados.",
    keywords: ["criar site wix", "wix limitações", "migrar wix para wordpress", "site profissional react"],
    featuresTitle: "Limitações Comuns do Wix vs Desenvolvimento React",
    features: [
      { title: "Desempenho no Mobile", desc: "Sites Wix costumam ser consideravelmente pesados em smartphones, gerando perdas de cliques em anúncios." },
      { title: "Controle de SEO Técnico", desc: "No React, estruturamos os dados do Schema.org de forma minuciosa, sem limitações de templates genéricos." },
      { title: "Propriedade do Código", desc: "Com código sob medida, você é o único dono do sistema, sem ficar preso a mensalidades crescentes de plataformas de terceiros." }
    ],
    caseStudy: {
      client: "Clínica Estética Sorocaba",
      metricBefore: "Site Wix carregando em 5.8 segundos no 4G",
      metricAfter: "Site em React carregando em 0.6 segundos",
      description: "A aceleração de carregamento dobrou as conversões mensais de agendamento de consultas diretas pelo site corporativo.",
      badge: "Migração de Sucesso"
    },
    roiLabel: "Melhoria de Performance em Dispositivos Móveis",
    baseInvestment: 3000,
    estReturnMultiplier: 2.7,
    faqList: [
      { question: "É difícil migrar meu site atual do Wix?", answer: "Não, realizamos toda a extração de conteúdo e imagens, redesenhamos o layout de forma moderna e garantimos que nenhuma URL antiga perca seu posicionamento através de redirecionamentos adequados." },
      { question: "Quanto tempo demora o desenvolvimento?", answer: "Um projeto completo sob medida costuma ser finalizado e colocado no ar em um período de 15 a 25 dias." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Supere os Limites Técnicos da Sua Estrutura",
    ctaDescription: "Migre seu site institucional para a velocidade máxima de carregamento. Faça um orçamento."
  },
  "criar-landing-page-gratis": {
    slug: "criar-landing-page-gratis",
    category: "meio",
    title: "Criar Landing Page Grátis: Vale a Pena? Prós e Contras",
    metaDescription: "Quer criar uma landing page grátis? Entenda onde essas ferramentas gratuitas falham e quando investir em uma página profissional para vender mais.",
    heading: "Criar Landing Page Grátis vale a pena para sua Empresa?",
    subheading: "O custo real de ferramentas gratuitas e por que páginas baratas podem afastar clientes.",
    introText: "Plataformas gratuitas parecem atraentes no início, mas adicionam marcas d'água invasivas, não permitem uso de domínio próprio profissional e têm carregamento lento que prejudica suas vendas.",
    keywords: ["criar landing page gratis", "landing page barata", "landing page profissional preço", "conversão de leads", "anúncios instagram"],
    featuresTitle: "Diferença entre Landing Page Grátis e Profissional",
    features: [
      { title: "Marca Profissional Sólida", desc: "Seu site com seu domínio próprio, sem propaganda de outras empresas de tecnologia na tela do cliente." },
      { title: "Taxa de Conversão Exponencial", desc: "Páginas profissionais são desenhadas com gatilhos mentais estruturados, gerando até 4x mais leads por clique." },
      { title: "Hospedagem Dedicada Ultra-Rápida", desc: "Sua página carregará em frações de segundo, evitando desperdício de dinheiro investido em anúncios pagos." }
    ],
    caseStudy: {
      client: "Consultoria Financeira ABC",
      metricBefore: "R$ 1.500/mês perdidos com taxa de conversão de 3% no plano grátis",
      metricAfter: "Taxa de conversão de 18% com página profissional sênior",
      description: "Aumentamos a captação de clientes sem precisar gastar mais em tráfego de anúncios no Facebook.",
      badge: "Engenharia de Vendas"
    },
    roiLabel: "Multiplicação de Leads em Tráfego Pago",
    baseInvestment: 1800,
    estReturnMultiplier: 3.4,
    faqList: [
      { question: "O que é preciso para colocar uma landing page no ar?", answer: "Apenas um domínio próprio (cerca de R$ 40/ano) e nossa infraestrutura de desenvolvimento otimizada." },
      { question: "Quais integrações posso ter em uma página profissional?", answer: "WhatsApp flutuante, pixels de rastreamento do Facebook/Google, formulários inteligentes integrados ao seu CRM e e-mail marketing." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Pare de Perder Clientes no Funil",
    ctaDescription: "Fale com um especialista e garanta uma página que realmente converte cliques em dinheiro."
  },
  "shopify-criar-loja": {
    slug: "shopify-criar-loja",
    category: "meio",
    title: "Como Criar Loja Virtual com Shopify de Forma Otimizada",
    metaDescription: "Criação de lojas Shopify profissionais. Otimização de temas, alta conversão, integrações avançadas de frete e Pix automático com Augusto Dev.",
    heading: "Desenvolvimento de Lojas Shopify Otimizadas",
    subheading: "A força da maior plataforma de e-commerce do mundo combinada com design exclusivo e veloz.",
    introText: "O Shopify é uma ferramenta incrível para escalar suas vendas online. Nós criamos layouts exclusivos no Shopify, integrando aplicativos essenciais sem poluir o código e mantendo a velocidade máxima de compra.",
    keywords: ["shopify criar loja", "desenvolvedor shopify", "loja dropshipping profissional", "e-commerce de alta performance"],
    featuresTitle: "Serviços Especializados para Shopify",
    features: [
      { title: "Desenvolvimento de Temas Customizados", desc: "Sua loja com identidade visual única, afastando-se dos templates padrões e saturados de mercado." },
      { title: "Integração de Frete e Pix", desc: "Cálculos rápidos de frete e fluxos de checkout rápidos e transparentes." },
      { title: "Otimização de Aplicativos", desc: "Configuramos apenas o essencial para evitar que scripts adicionais pesem na experiência do usuário móvel." }
    ],
    caseStudy: {
      client: "E-commerce de Cosméticos L'Amour",
      metricBefore: "Abandono de carrinho de 82%",
      metricAfter: "Abandono de carrinho reduzido para 44%",
      description: "Reformulamos a jornada do cliente, implementamos checkout otimizado de um clique e otimizamos as imagens de produtos para mobile.",
      badge: "Shopify Otimizado"
    },
    roiLabel: "Redução de Abandono de Carrinho",
    baseInvestment: 5000,
    estReturnMultiplier: 4.5,
    faqList: [
      { question: "Vocês fazem configuração para dropshipping?", answer: "Sim, realizamos a integração com as principais ferramentas de automação de pedidos de fornecedores internacionais e nacionais." },
      { question: "Consigo gerenciar as vendas pelo celular?", answer: "Sim, o ecossistema do Shopify possui um excelente aplicativo de gestão de vendas e estoque em tempo real." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Monte Seu Império de Vendas Online",
    ctaDescription: "Deixe o desenvolvimento técnico comigo e foque no marketing dos seus produtos. Solicite um projeto."
  },

  // --- Category 3: Informativas (Topo de Funil) ---
  "como-criar-um-site": {
    slug: "como-criar-um-site",
    category: "topo",
    title: "Como Criar um Site em 2026: Guia Completo Passo a Passo",
    metaDescription: "Aprenda passo a passo como criar um site profissional do zero. Dicas de domínio, hospedagem, escolha de plataformas e SEO básico.",
    heading: "Como Criar um Site em 2026: O Guia Definitivo",
    subheading: "Um mapa completo dos conceitos essenciais, ferramentas e melhores caminhos para sua presença digital.",
    introText: "Criar um site envolve compreender a tríade da internet: Domínio (o seu endereço), Hospedagem (a casa onde seus arquivos residem) e a Tecnologia de construção (as linguagens e construtores).",
    keywords: ["como criar um site", "criar site do zero", "guia de criação de sites", "passo a passo registrar dominio"],
    featuresTitle: "Os 3 Pilares Cruciais para Começar",
    features: [
      { title: "1. Registro do Domínio", desc: "A escolha do nome ideal (exemplo: suaempresa.com.br) para fixar na mente do seu público." },
      { title: "2. Servidor de Hospedagem", desc: "O local físico que entrega seus arquivos em alta velocidade para o navegador do visitante." },
      { title: "3. Framework ou Gestor", desc: "A plataforma ideal de publicação (React, WordPress, etc.) correspondente às suas metas técnicas." }
    ],
    caseStudy: {
      client: "Auto-Didata Iniciante",
      metricBefore: "Meses de tentativas infrutíferas de tutoriais genéricos",
      metricAfter: "Entendimento rápido do ecossistema e apoio sob medida",
      description: "Oferecemos mentorias técnicas e desenvolvimento híbrido onde o cliente gerencia o conteúdo e Augusto Dev cuida do código.",
      badge: "Mentoria Técnica"
    },
    roiLabel: "Nível de Aprendizado de Tecnologia",
    baseInvestment: 1500,
    estReturnMultiplier: 2.0,
    faqList: [
      { question: "É preciso saber programar para ter um site?", answer: "Não necessariamente se você usar plataformas prontas. No entanto, o apoio de um desenvolvedor profissional é o único caminho para ter um site seguro, rápido e focado em vendas profissionais." },
      { question: "Quanto tempo demora o aprendizado básico?", answer: "Com nosso guia passo a passo, em poucas horas você compreende o funcionamento de domínios e hospedagens." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Precisa de Ajuda para Tirar a Ideia do Papel?",
    ctaDescription: "Se preferir pular a curva de aprendizado técnica e ter um site de elite, mande-me uma mensagem."
  },
  "como-criar-um-site-do-zero": {
    slug: "como-criar-um-site-do-zero",
    category: "topo",
    title: "Como Criar um Site do Zero: Guia de Programação e Layout",
    metaDescription: "Guia técnico ensinando como criar um site do zero usando HTML, CSS, JavaScript e frameworks modernos como React e Tailwind CSS.",
    heading: "Como Criar um Site do Zero com Código Moderno",
    subheading: "Aprenda a estruturar páginas velozes sem o peso de plataformas engessadas.",
    introText: "Criar do zero significa escrever código puro, leve e de alto controle. Entenda a importância das linguagens front-end no mercado atual e como elas geram experiências incríveis para o usuário.",
    keywords: ["como criar um site do zero", "aprender a programar site", "html css javascript", "desenvolvedor de sites profissional"],
    featuresTitle: "O Fluxo de Trabalho de Desenvolvimento Real",
    features: [
      { title: "Marcação Semântica HTML5", desc: "Garante acessibilidade e perfeita interpretação para mecanismos de busca e leitores de tela." },
      { title: "Estilização com Tailwind CSS", desc: "Utilização de classes utilitárias para construir interfaces modernas com altíssima velocidade de renderização." },
      { title: "Dinâmica de Componentes React", desc: "Gerenciamento eficiente de estados para criar páginas interativas sem recarregamento de tela." }
    ],
    caseStudy: {
      client: "Edtech Aprenda+",
      metricBefore: "Plataforma de ensino instável de código legado",
      metricAfter: "Migração para React do zero com estabilidade total",
      description: "Uma reestruturação técnica completa que permitiu hospedar videoaulas rápidas de forma segura.",
      badge: "Desenvolvimento Sob Medida"
    },
    roiLabel: "Performance do Código vs Construtores",
    baseInvestment: 3800,
    estReturnMultiplier: 3.8,
    faqList: [
      { question: "Por que investir em código exclusivo?", answer: "O código exclusivo garante que você não terá limites de customização e terá a velocidade máxima possível de carregamento." },
      { question: "Vocês entregam o código fonte completo?", answer: "Sim, ao final do projeto, todo o código fonte e as credenciais do servidor são transferidos para o cliente." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Desenvolva Seu Projeto de Forma Profissional",
    ctaDescription: "Construa uma marca forte com tecnologia robusta. Vamos conversar sobre o seu sistema."
  },
  "criar-site-gratis": {
    slug: "criar-site-gratis",
    category: "topo",
    title: "Criar Site Grátis vale a pena? Alerta de Riscos Técnicos",
    metaDescription: "Quer criar um site grátis? Conheça as armadilhas de velocidade, SEO bloqueado, anúncios intrusivos e perda de autoridade de marca online.",
    heading: "Criar Site Grátis vale a pena? Saiba os Limites Ocultos",
    subheading: "A verdade crua sobre plataformas gratuitas de site e quando migrar para um domínio próprio.",
    introText: "O 'grátis' geralmente cobra um preço alto em conversão e profissionalismo. Entenda por que empresas de destaque evitam plataformas gratuitas e como ter uma estrutura acessível.",
    keywords: ["criar site gratis", "sites gratuitos perigos", "site profissional barato", "hospedagem gratuita"],
    featuresTitle: "Gargalos Comuns em Plataformas Gratuitas",
    features: [
      { title: "Domínios Compartilhados Feios", desc: "Seu site com extensões confusas (ex: empresa.wixsite.com) que transmitem amadorismo no primeiro contato." },
      { title: "Zero Otimização de SEO", desc: "Dificuldade extrema para cadastrar tags específicas do Google, mantendo o site invisível nas buscas orgânicas." },
      { title: "Propaganda Alheia", desc: "Anúncios intrusivos da própria plataforma poluindo as telas de seus potenciais clientes." }
    ],
    caseStudy: {
      client: "Marcenaria Fina",
      metricBefore: "1 lead por mês em site gratuito",
      metricAfter: "14 agendamentos de orçamento semanais com domínio próprio",
      description: "Uma simples transição para um site institucional limpo e domínio próprio mudou drasticamente a percepção de valor dos serviços.",
      badge: "Salto Profissional"
    },
    roiLabel: "Retorno Financeiro com Domínio Próprio",
    baseInvestment: 1600,
    estReturnMultiplier: 2.6,
    faqList: [
      { question: "É muito caro ter um domínio próprio?", answer: "Não, um domínio oficial .com.br custa em média R$ 40,00 por ano. É o menor investimento possível com o maior retorno de imagem." },
      { question: "Vocês criam sites com preços acessíveis?", answer: "Sim, desenvolvemos planos sob medida para profissionais liberais e autônomos que estão começando e querem ter autoridade." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Profissionalize Sua Presença Digital",
    ctaDescription: "Conquiste clientes exigentes mostrando seriedade desde o primeiro clique. Solicite seu site."
  },
  "como-criar-um-site-de-vendas": {
    slug: "como-criar-um-site-de-vendas",
    category: "topo",
    title: "Como Criar um Site de Vendas do Zero e Vender Online",
    metaDescription: "Passo a passo explicativo de como criar um site de vendas eficiente. Estruturas de pagamento, gerenciamento de frete e segurança digital.",
    heading: "Como Criar um Site de Vendas do Zero em 2026",
    subheading: "Guia estratégico para novos empreendedores digitais consolidarem suas lojas online.",
    introText: "Para vender na internet, você precisa de um fluxo fluido de compra: atração de tráfego, exposição profissional de produtos, checkout transparente e automação de envio.",
    keywords: ["como criar um site de vendas", "como vender pela internet", "montar e-commerce passo a passo", "loja virtual barata"],
    featuresTitle: "Passos Essenciais para Montar seu E-commerce",
    features: [
      { title: "Escolha dos Meios de Pagamento", desc: "Oferecer Pix, boleto e cartões de crédito com taxas competitivas e checkout sem redirecionamento." },
      { title: "Logística Inteligente de Frete", desc: "Integração rápida com Correios, Melhor Envio ou transportadoras locais para preços competitivos." },
      { title: "Certificado SSL de Segurança", desc: "Crucial para proteger dados sensíveis de cartões dos compradores e garantir o cadeado verde no navegador." }
    ],
    caseStudy: {
      client: "Artesanatos Criativos",
      metricBefore: "Vendas apenas pelo direct do Instagram",
      metricAfter: "Vendas automatizadas 24 horas por dia via loja virtual",
      description: "A automação de pedidos permitiu expandir a produção, economizando horas diárias de atendimento de mensagens repetitivas.",
      badge: "E-Commerce Automático"
    },
    roiLabel: "Economia de Tempo em Atendimento",
    baseInvestment: 4800,
    estReturnMultiplier: 4.8,
    faqList: [
      { question: "É possível começar vendendo poucos produtos?", answer: "Sim, estruturamos soluções escaláveis, ideais para marcas de nicho testarem seu mercado com baixos custos operacionais." },
      { question: "Como funciona a emissão de notas fiscais?", answer: "Nossas lojas virtuais integram-se facilmente com emissores de notas fiscais automatizados de mercado." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Simplifique Seu Processo de Vendas",
    ctaDescription: "Deixe as vendas automatizadas trabalharem por você. Solicite um projeto de e-commerce."
  },
  "passo-a-passo-para-criar-um-site": {
    slug: "passo-a-passo-para-criar-um-site",
    category: "topo",
    title: "Passo a Passo Para Criar um Site de Sucesso: Checklist",
    metaDescription: "Confira o checklist completo e o passo a passo para colocar um site de sucesso no ar. Da ideia inicial à primeira venda orgânica.",
    heading: "Passo a Passo para Criar um Site de Alto Padrão",
    subheading: "O checklist definitivo que separa sites amadores de plataformas comerciais de elite.",
    introText: "Colocar um site no ar de qualquer jeito é fácil. O segredo está no refino de detalhes que garantem conversão real, velocidade e segurança de dados para o usuário.",
    keywords: ["passo a passo para criar um site", "checklist criação site", "etapas de criação de sites", "planejamento web"],
    featuresTitle: "O Fluxo Perfeito de Criação de Sites",
    features: [
      { title: "1. Wireframe e Prototipagem", desc: "Desenho da estrutura de informações antes de encostar em uma linha de código." },
      { title: "2. Copywriting Persuasivo", desc: "Redação de textos instigantes com foco nos desejos do seu cliente em potencial." },
      { title: "3. Otimização de Imagens e Fontes", desc: "Compressão extrema para carregamento imediato em conexões 3G e 4G lentas." }
    ],
    caseStudy: {
      client: "Franquia Alimentos Rápidos",
      metricBefore: "Franquia sem padrão visual nas filiais locais",
      metricAfter: "Presença corporativa uniforme de alto impacto estético",
      description: "Desenvolvemos o portal unificado integrando localização automatizada de lojas de forma rápida.",
      badge: "Escalabilidade de Marca"
    },
    roiLabel: "Nível de Organização do Projeto",
    baseInvestment: 2900,
    estReturnMultiplier: 2.8,
    faqList: [
      { question: "O que é Copywriting?", answer: "É a técnica de redação focada em convencer o visitante do seu site a tomar uma ação específica, como preencher um formulário ou comprar um produto." },
      { question: "Vocês cuidam da hospedagem do site?", answer: "Sim, entregamos o site totalmente configurado nos melhores e mais velozes servidores do mercado." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Desenvolva Seu Projeto Com Método de Elite",
    ctaDescription: "Trabalho profissional, sem achismos. Descubra nossas etapas de sucesso."
  },
  "criar-site-gratis-no-google": {
    slug: "criar-site-gratis-no-google",
    category: "topo",
    title: "Criar Site Grátis no Google com Google Sites: Limitações",
    metaDescription: "Aprenda sobre o Google Sites. Veja como criar um site simples gratuito e quando essa ferramenta deixa de atender o crescimento de sua empresa.",
    heading: "Como Criar Site Grátis no Google Sites e seus Limites",
    subheading: "Análise realista da ferramenta gratuita do Google e as restrições para negócios sérios.",
    introText: "O Google Sites é uma excelente ferramenta interna para intranets corporativas básicas. Porém, para captar clientes do mercado externo, suas limitações estéticas e estruturais são severas.",
    keywords: ["criar site gratis no google", "google sites vale a pena", "site gratuito limites", "landing page google sites"],
    featuresTitle: "Por que empresas migram do Google Sites para React?",
    features: [
      { title: "Limitação Total de Layout", desc: "Você fica preso a poucos templates idênticos a dezenas de outros sites amadores na internet." },
      { title: "Sem Blogs e Estruturas Dinâmicas", desc: "Dificuldade para criar sistemas de notícias, lojas virtuais ou captação inteligente de leads." },
      { title: "Visual Corporativo Amador", desc: "Sua marca precisa de refinamento visual e alta tecnologia para se destacar em mercados competitivos." }
    ],
    caseStudy: {
      client: "Consultório Veterinário LovePet",
      metricBefore: "Site feito no Google Sites sem nenhum agendamento",
      metricAfter: "12 novos clientes semanais após novo portal em React",
      description: "A nova identidade digital transmitiu sofisticação, permitindo atrair tutores dispostos a pagar por atendimentos especializados.",
      badge: "Salto de Autoridade"
    },
    roiLabel: "Atração de Clientes de Alto Padrão",
    baseInvestment: 2000,
    estReturnMultiplier: 2.4,
    faqList: [
      { question: "O Google Sites ajuda a subir no ranking do Google?", answer: "Apesar de ser uma ferramenta do próprio Google, o algoritmo pontua sites baseando-se em profundidade de conteúdo e experiência de usuário, pontos onde o Google Sites é extremamente limitado." },
      { question: "Vocês criam sites baseados em templates prontos?", answer: "Não, todo projeto é planejado e codificado do zero de forma exclusiva para o seu nicho." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Profissionalize Sua Presença no Google",
    ctaDescription: "Apareça na primeira página do Google com uma presença à altura do seu profissionalismo."
  },

  // --- Category 4: Termos Técnicos e Infraestrutura ---
  "dominio-e-hospedagem-de-site": {
    slug: "dominio-e-hospedagem-de-site",
    category: "tecnico",
    title: "Domínio e Hospedagem de Site: Entenda os Conceitos",
    metaDescription: "Tudo o que você precisa saber sobre domínio (.com.br) e hospedagem de site. Garanta estabilidade, velocidade e segurança completa para sua empresa.",
    heading: "Domínio e Hospedagem de Site Descomplicados",
    subheading: "A base de infraestrutura essencial que garante que seu site esteja sempre online e seguro.",
    introText: "Para ter um site, você precisa de duas coisas: registrar o seu nome na internet (Domínio) e alugar um espaço em um computador de alta potência para guardar os arquivos (Hospedagem).",
    keywords: ["dominio e hospedagem de site", "registrar nome de site", "melhor hospedagem cloud", "infraestrutura web de alta performance"],
    featuresTitle: "O que buscar em uma infraestrutura moderna?",
    features: [
      { title: "Hospedagem 100% Cloud", desc: "Chega de servidores compartilhados lentos que saem do ar a qualquer momento. Usamos arquiteturas cloud modernas." },
      { title: "Certificado SSL (https) Grátis", desc: "Nativo em todos os projetos para garantir segurança de dados e credibilidade orgânica." },
      { title: "E-mails Profissionais Inclusos", desc: "Tenha e-mails corporativos (ex: contato@suaempresa.com.br) para fechar negócios com seriedade." }
    ],
    caseStudy: {
      client: "Portal Imobiliário Sorocaba",
      metricBefore: "Hospedagem antiga instável caindo nos finais de semana",
      metricAfter: "Uptime de 99.99% e servidores redundantes em nuvem",
      description: "A migração de infraestrutura garantiu estabilidade e o recebimento de leads de imóveis em tempo integral.",
      badge: "Infraestrutura Forte"
    },
    roiLabel: "Calculadora de Uptime do Servidor",
    baseInvestment: 2600,
    estReturnMultiplier: 2.9,
    faqList: [
      { question: "Quem paga as taxas de registro de domínio?", answer: "Nós auxiliamos você a fazer o registro oficial direto em seu CPF ou CNPJ no Registro.br, garantindo que o nome do site seja legalmente seu." },
      { question: "Como funciona o backup dos arquivos?", answer: "Configuramos rotinas automáticas de backup diário de banco de dados e arquivos para segurança total contra perdas acidentais." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Garanta uma Infraestrutura Sólida e Veloz",
    ctaDescription: "Deixe as dores de cabeça técnicas comigo. Nós estruturamos e gerenciamos tudo para você."
  },
  "como-registrar-um-dominio": {
    slug: "como-registrar-um-dominio",
    category: "tecnico",
    title: "Como Registrar um Domínio de Site (.com.br) do Zero",
    metaDescription: "Aprenda como registrar um domínio .com ou .com.br de forma oficial e segura. Dicas de nomes, marcas e proteção de propriedade intelectual.",
    heading: "Como Registrar um Domínio de Site Oficialmente",
    subheading: "Garanta a propriedade do nome de sua marca na internet de forma rápida e segura.",
    introText: "Registrar o domínio é o primeiro passo para resguardar sua marca online. Entenda as melhores práticas para escolher o nome ideal e as extensões mais procuradas pelo público.",
    keywords: ["como registrar um dominio", "registro de marca online", "comprar dominio de site", "registro.br passo a passo"],
    featuresTitle: "Regras de Ouro para Escolher seu Domínio",
    features: [
      { title: "Seja Curto e Memorável", desc: "Evite nomes longos e repletos de hifens difíceis de ditar no WhatsApp ou telefone." },
      { title: "Priorize .com.br ou .com", desc: "Extensões familiares geram maior confiança instantânea no público brasileiro." },
      { title: "Registre Variações de Erros", desc: "Registre termos similares para evitar que concorrentes usem grafias parecidas com a sua marca." }
    ],
    caseStudy: {
      client: "Indústria Metalúrgica Sorocaba",
      metricBefore: "Nome antigo de site registrado em nome de ex-funcionário",
      metricAfter: "Domínio resgatado e registrado 100% no CNPJ da empresa",
      description: "Auxiliamos na regularização legal e técnica de toda a propriedade intelectual digital corporativa da indústria.",
      badge: "Suporte Legal e Técnico"
    },
    roiLabel: "Proteção Patrimonial de Marca",
    baseInvestment: 1200,
    estReturnMultiplier: 1.8,
    faqList: [
      { question: "O que acontece se eu esquecer de renovar o domínio?", answer: "O domínio é congelado temporariamente. Nós configuramos avisos recorrentes e renovações automáticas para garantir que você nunca perca seu nome oficial na internet." },
      { question: "Posso registrar um domínio usando meu CPF?", answer: "Sim, domínios nacionais .com.br podem ser registrados livremente por pessoas físicas ou jurídicas de forma instantânea." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Registre Seu Nome de Sucesso na Internet",
    ctaDescription: "Nós realizamos toda a busca de disponibilidade e cuidamos do trâmite técnico para você. Entre em contato."
  },
  "hospedagem-para-wordpress": {
    slug: "hospedagem-para-wordpress",
    category: "tecnico",
    title: "Melhor Hospedagem para WordPress e Alta Velocidade 2026",
    metaDescription: "Procurando a melhor hospedagem para WordPress? Analisamos servidores cloud otimizados, velocidade extrema e segurança de dados.",
    heading: "Hospedagem Otimizada para WordPress de Alta Performance",
    subheading: "Acelere seu site em até 5x migrando para servidores projetados especificamente para WP.",
    introText: "Servidores compartilhados baratos não suportam o processamento dinâmico do WordPress. Hospedamos seus sistemas em servidores otimizados, com discos SSD rápidos e tecnologias de cache avançadas.",
    keywords: ["hospedagem para wordpress", "hospedagem cloud rapida", "melhor servidor wordpress", "wordpress lento ajuda"],
    featuresTitle: "Diferenciais Técnicos de nossa Hospedagem WP",
    features: [
      { title: "Discos SSD NVMe de Elite", desc: "Acesso e carregamento de arquivos de dados até 10x mais veloz que discos rígidos antigos." },
      { title: "Tecnologia Redis / Memcached", desc: "Otimização extrema de consultas ao banco de dados para entregar a página renderizada instantaneamente." },
      { title: "Proteção DDoS e Firewalls Ativos", desc: "Segurança total contra invasões brutas automatizadas e vulnerabilidades comuns." }
    ],
    caseStudy: {
      client: "E-commerce WordPress Joias Finas",
      metricBefore: "Tempo de resposta de servidor (TTFB) de 2.2 segundos",
      metricAfter: "Tempo de resposta de servidor de apenas 0.15 segundos",
      description: "A aceleração do servidor reduziu a rejeição do site e estimulou um aumento de 38% no ticket médio de vendas.",
      badge: "Velocidade de Elite"
    },
    roiLabel: "Redução de Tempo de Resposta de Servidor",
    baseInvestment: 2400,
    estReturnMultiplier: 3.0,
    faqList: [
      { question: "O que é TTFB?", answer: "É o tempo que o servidor demora para responder com o primeiro byte de informação ao navegador. Quanto menor o TTFB, mais rápido a página começa a aparecer." },
      { question: "Vocês fazem a migração do meu site de graça?", answer: "Sim, realizamos a migração completa, checagem de integridade do código e testes de velocidade sem custos adicionais ao contratar o serviço." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Dê um Fim às Reclamações de Lentidão",
    ctaDescription: "Migre seu WordPress para nossa infraestrutura profissional de alta velocidade."
  },
  "como-colocar-o-site-no-google": {
    slug: "como-colocar-o-site-no-google",
    category: "tecnico",
    title: "Como Colocar o Site no Google e Aparecer no Topo 2026",
    metaDescription: "Quer colocar o seu site no Google? Aprenda como cadastrar no Google Search Console, configurar sitemaps técnicos e otimizar indexações.",
    heading: "Como Colocar o Site no Google de Forma Rápida",
    subheading: "Ganta que seus serviços e produtos sejam encontrados por clientes em potencial nas pesquisas orgânicas.",
    introText: "Não basta colocar o site no ar; é preciso avisar ao Google formalmente de que ele existe através de arquivos estruturados e tags de verificação oficiais de sitemap.",
    keywords: ["como colocar o site no google", "aparecer na primeira pagina do google", "google search console sitemap", "seo de alta performance"],
    featuresTitle: "Passo a Passo de Indexação Técnica",
    features: [
      { title: "1. Google Search Console", desc: "Cadastramos e validamos sua propriedade oficial direta no painel oficial do Google de tráfego orgânico." },
      { title: "2. Geração de Sitemaps Automatizados", desc: "Envio do sitemap.xml contendo a lista limpa e organizada de todas as suas páginas internas estruturadas." },
      { title: "3. Otimização de Core Web Vitals", desc: "Adequação do site para atender às novas regras de velocidade exigidas pelo Google para posicionar suas páginas no topo." }
    ],
    caseStudy: {
      client: "Escola de Cursos Profissionais",
      metricBefore: "Site invisível no Google por mais de 6 meses",
      metricAfter: "Indexado no Google em menos de 24 horas",
      description: "Implementamos a estrutura de sitemap automática e resolvemos os erros de renderização JavaScript que impediam a leitura do robô do Google.",
      badge: "Indexação Imediata"
    },
    roiLabel: "Indexação e Geração de Cliques",
    baseInvestment: 3000,
    estReturnMultiplier: 3.5,
    faqList: [
      { question: "Quanto tempo demora para aparecer na busca do Google?", answer: "A indexação inicial de páginas com nossa estrutura otimizada leva poucas horas. A subida orgânica para as primeiras posições consolida-se em semanas." },
      { question: "O serviço de SEO é cobrado mensalmente?", answer: "Realizamos tanto a otimização de infraestrutura única estrutural (SEO on-page) quanto o acompanhamento mensal de produção de conteúdo orgânico e backlinks." }
    ],
    author: "Augusto Dev",
    ctaTitle: "Domine as Pesquisas Orgânicas do Google",
    ctaDescription: "Torne-se a principal referência técnica do seu nicho no Google. Inicie seu plano de posicionamento."
  }
};

export const SEO_LANDING_DATA: Record<string, LandingPageData> = {
  ...SEO_LANDING_DATA_BASE,
  ...NEW_SEO_LANDING_DATA
};


export default function SeoLandingPages({ initialSlug }: { initialSlug?: string } = {}) {
  const { seoState } = useSEO();
  const [selectedSlug, setSelectedSlug] = useState<string>(initialSlug || "criar-site-profissional");
  const [activeTab, setActiveTab] = useState<"fundo" | "meio" | "topo" | "tecnico">("fundo");
  
  // Dynamic ROI Calculator State
  const [calculatorInput, setCalculatorInput] = useState<number>(1000);

  // Set selected landing page from path query on mount (clean organic simulation)
  useEffect(() => {
    if (initialSlug) {
      setSelectedSlug(initialSlug);
      if (SEO_LANDING_DATA[initialSlug]) {
        setActiveTab(SEO_LANDING_DATA[initialSlug].category);
      }
      return;
    }
    const path = window.location.hash.replace("#", "") || window.location.pathname.replace("/", "");
    const cleanPath = path.startsWith("/") ? path.substring(1) : path;
    if (SEO_LANDING_DATA[cleanPath]) {
      setSelectedSlug(cleanPath);
      setActiveTab(SEO_LANDING_DATA[cleanPath].category);
    }
  }, [initialSlug]);

  const page = SEO_LANDING_DATA[selectedSlug] || SEO_LANDING_DATA["criar-site-profissional"];

  // Filter landing pages by selected category
  const filteredSlugs = Object.values(SEO_LANDING_DATA).filter(
    (item) => item.category === activeTab
  );

  const calculatedRoi = Math.round(calculatorInput * page.estReturnMultiplier);

  const scrollToContact = () => {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full bg-[#0a0a0a] rounded-xl border border-white/5 p-4 sm:p-8 overflow-hidden text-left" id="seo-landing-hub">
      {/* Dynamic Header Meta Overrides per keyword */}
      <MetaTags 
        title={page.title}
        description={page.metaDescription}
        canonical={`${SEO_CONFIG.domain}/${page.slug}`}
      />
      
      {/* Product & Article Schemas per keyword to dominate rich snippets */}
      <ProductSchema 
        id={`landing-${page.slug}`} 
        details={{
          name: page.heading,
          description: page.metaDescription,
          image: "https://augustodev.com/logo.png",
          offers: {
            price: page.baseInvestment.toString(),
            priceCurrency: "BRL"
          }
        }} 
      />

      <div className="absolute top-0 right-1/4 w-[500px] h-[250px] bg-gradient-to-b from-[#00FF41]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Breadcrumb Path */}
      <div className="mb-6">
        <Breadcrumb items={[
          { label: "Home", path: "/" },
          { label: "SEO Hub", path: "#seo-landing-hub" },
          { label: page.heading, path: `#${page.slug}` }
        ]} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* --- LEFT SIDEBAR: Keyword Navigation --- */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-4 rounded-lg bg-black/60 border border-white/5">
            <div className="flex items-center space-x-2 mb-4 text-[#00FF41]">
              <Search className="h-4 w-4 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">SEO KEYWORDS HUB</span>
            </div>
            
            {/* Category selection tabs */}
            <div className="grid grid-cols-2 gap-1 mb-4">
              {[
                { id: "fundo", label: "Comercial" },
                { id: "meio", label: "Plataformas" },
                { id: "topo", label: "Tutoriais" },
                { id: "tecnico", label: "Técnico" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    // Select first page of that category automatically
                    const firstOfCat = Object.values(SEO_LANDING_DATA).find(p => p.category === tab.id);
                    if (firstOfCat) setSelectedSlug(firstOfCat.slug);
                  }}
                  className={`py-1 px-1.5 rounded font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab.id 
                      ? "bg-[#00FF41]/20 text-[#00FF41] border border-[#00FF41]/30" 
                      : "text-white/40 border border-transparent hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Keyword List for active category */}
            <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
              {filteredSlugs.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => {
                    setSelectedSlug(item.slug);
                    window.history.pushState({}, "", `/${item.slug}`);
                    window.dispatchEvent(new Event("popstate"));
                  }}
                  className={`w-full text-left p-2.5 rounded transition-all duration-200 cursor-pointer font-sans text-xs flex items-center justify-between group ${
                    selectedSlug === item.slug
                      ? "bg-[#00FF41]/10 border border-[#00FF41]/30 text-[#00FF41]"
                      : "bg-white/[0.01] border border-white/5 text-white/60 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <span className="truncate">{item.keywords[0]}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#00FF41]" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats Badge */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-[#00FF41]/5 to-transparent border border-[#00FF41]/10 text-left space-y-2">
            <span className="font-mono text-[9px] text-[#00FF41] font-bold block">01 // AUTORIDADE ORGÂNICA</span>
            <div className="text-2xl font-mono font-black text-white">99%</div>
            <div className="text-[10px] text-white/50 leading-relaxed">
              Pontuação média de Core Web Vitals e Lighthouse alcançadas nos portfólios desenvolvidos.
            </div>
          </div>
        </div>

        {/* --- RIGHT CONTENT: The Rich Keyword Page --- */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Main Hero Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#00FF41]/10 border border-[#00FF41]/20">
              <Sparkles className="h-3.5 w-3.5 text-[#00FF41] animate-pulse" />
              <span className="font-mono text-[9px] text-[#00FF41] uppercase tracking-widest font-black">
                {page.category.toUpperCase()} FUNNEL OPTIMIZATION // ACTIVE
              </span>
            </div>
            
            <h1 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight leading-none uppercase">
              {page.heading}
            </h1>
            <p className="font-sans font-medium text-white/70 text-sm sm:text-base leading-relaxed max-w-3xl">
              {page.subheading}
            </p>
          </div>

          {/* Intro Text Card */}
          <div className="p-5 rounded-lg bg-white/[0.02] border border-white/5 leading-relaxed font-sans text-xs sm:text-sm text-white/60 text-left">
            {page.introText}
          </div>

          {/* Core Features Grid */}
          <div className="space-y-4 text-left">
            <h3 className="font-sans font-bold text-white text-sm uppercase tracking-wider">
              {page.featuresTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {page.features.map((feature, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-black border border-white/5 hover:border-[#00FF41]/30 transition-all duration-300">
                  <div className="h-7 w-7 rounded bg-[#00FF41]/10 flex items-center justify-center text-[#00FF41] mb-3">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <h4 className="font-sans font-bold text-white text-xs uppercase tracking-wider mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-white/40 text-[11px] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* High-Impact Interactive ROI Calculator / Metric Visualizer */}
          <div className="p-5 rounded-lg bg-gradient-to-r from-black via-white/[0.02] to-black border border-white/5 text-left space-y-4">
            <div>
              <span className="font-mono text-[9px] text-[#00FF41] font-bold uppercase tracking-widest block">
                02 // SIMULADOR DE ROI INTEGRADO
              </span>
              <h4 className="font-sans font-bold text-white text-xs uppercase tracking-wider mt-1">
                {page.roiLabel}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                <label className="text-white/50 text-[10px] font-mono uppercase block">
                  Simular Investimento em Anúncios (ou Vendas Atuais): R$ {calculatorInput}
                </label>
                <input 
                  type="range" 
                  min="500" 
                  max="10000" 
                  step="500"
                  value={calculatorInput}
                  onChange={(e) => setCalculatorInput(Number(e.target.value))}
                  className="w-full accent-[#00FF41] bg-white/10 rounded h-1 cursor-pointer"
                />
                <div className="flex justify-between text-[9px] font-mono text-white/30">
                  <span>R$ 500</span>
                  <span>R$ 10.000</span>
                </div>
              </div>

              <div className="p-4 rounded bg-[#00FF41]/5 border border-[#00FF41]/20 flex items-center justify-between">
                <div>
                  <span className="text-white/40 text-[9px] font-mono uppercase block">RETORNO ESTIMADO COM PERFORMANCE:</span>
                  <span className="font-mono text-xl font-bold text-[#00FF41]">R$ {calculatedRoi}</span>
                </div>
                <TrendingUp className="h-5 w-5 text-[#00FF41] animate-bounce" />
              </div>
            </div>
          </div>

          {/* Case Study Widget */}
          <div className="p-5 rounded-lg bg-white/[0.01] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-[#00FF41]/10 text-[#00FF41] font-mono text-[9px] font-bold">
                <Award className="h-3 w-3" />
                <span>CASE DE SUCESSO: {page.caseStudy.badge}</span>
              </div>
              <h4 className="font-sans font-extrabold text-white text-sm uppercase tracking-wide">
                {page.caseStudy.client}
              </h4>
              <p className="text-white/50 text-xs leading-relaxed">
                {page.caseStudy.description}
              </p>
            </div>

            <div className="p-4 rounded bg-black border border-white/10 flex flex-col items-center justify-center text-center shrink-0 min-w-[150px]">
              <span className="text-[10px] text-white/40 font-mono uppercase">RESULTADO FINAL</span>
              <span className="font-sans font-black text-xs text-white/40 line-through mt-1">{page.caseStudy.metricBefore}</span>
              <span className="font-sans font-black text-sm text-[#00FF41]">{page.caseStudy.metricAfter}</span>
            </div>
          </div>

          {/* Interactive Page FAQ (Google FAQ Schema Compliant) */}
          <div className="space-y-4 text-left">
            <h3 className="font-sans font-bold text-white text-sm uppercase tracking-wider flex items-center space-x-2">
              <HelpCircle className="h-4 w-4 text-[#00FF41]" />
              <span>Dúvidas Frequentes: {page.keywords[0]}</span>
            </h3>
            <div className="space-y-3">
              {page.faqList.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-white/[0.01] border border-white/5 space-y-1.5">
                  <h4 className="font-sans font-bold text-white text-xs sm:text-sm">
                    {faq.question}
                  </h4>
                  <p className="text-white/40 text-xs sm:text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call To Action Container */}
          <div className="relative p-6 rounded-lg bg-black border border-[#00FF41]/30 hover:border-[#00FF41]/50 transition-all duration-300 text-center space-y-4 overflow-hidden shadow-[0_0_20px_rgba(0,255,65,0.05)]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00FF41]/5 via-transparent to-[#00FF41]/5 opacity-30" />
            <div className="relative space-y-2">
              <h3 className="font-sans font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
                {page.ctaTitle}
              </h3>
              <p className="text-white/60 text-xs sm:text-sm max-w-xl mx-auto">
                {page.ctaDescription}
              </p>
            </div>
            
            <div className="relative pt-2">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center space-x-2 py-3 px-6 rounded bg-[#00FF41] hover:bg-opacity-80 text-black font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 group cursor-pointer"
              >
                <span>OBTER ORÇAMENTO</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Semantic Internal Linking Recommender */}
          <InternalLinker currentTopic={page.category} className="mt-8" />

        </div>
      </div>
    </div>
  );
}
