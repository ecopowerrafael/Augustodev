import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Scale, 
  ShieldCheck, 
  Landmark, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  Check, 
  ArrowRight, 
  ChevronRight, 
  X, 
  Menu, 
  Clock, 
  MessageSquare, 
  ChevronDown,
  ArrowLeft
} from "lucide-react";

// Paths to the generated high-quality assets
const luxuryOfficeImg = "/src/assets/images/luxury_law_office_1784134667503.jpg";
const lawyerPortraitImg = "/src/assets/images/lawyer_portrait_1784134680230.jpg";

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
}

interface PracticeArea {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export default function LawyerPortfolio({ onBack }: { onBack?: () => void }) {
  const [activeArea, setActiveArea] = useState<number | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Practice Areas Data
  const practiceAreas: PracticeArea[] = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-[#C5A880]" />,
      title: "Blindagem Patrimonial & Sucessória",
      subtitle: "Proteção Familiar e Planejamento de Herança",
      description: "Estruturação legal e constituição de Holdings Familiares para blindar legalmente seus bens, reduzir a carga tributária de inventários e garantir a transmissão harmônica do patrimônio.",
      details: [
        "Constituição de Holdings Familiares e Patrimoniais",
        "Elaboração de testamentos e doações com reserva de usufruto",
        "Protocolos familiares e acordos de acionistas",
        "Cláusulas de inalienabilidade, impenhorabilidade e incomunicabilidade"
      ]
    },
    {
      icon: <Landmark className="h-6 w-6 text-[#C5A880]" />,
      title: "Direito Empresarial & Societário",
      subtitle: "Assessoria Jurídica de Alta Performance",
      description: "Suporte completo para empresas de pequeno a grande porte. Estruturação societária, fusões, aquisições, governança corporativa e prevenção de passivos judiciais.",
      details: [
        "Fusões, Aquisições e Incorporações (M&A)",
        "Dissolução de sociedades e resolução de disputas internas",
        "Adequação de governança corporativa e compliance",
        "Estruturação de startups e acordos de investimento"
      ]
    },
    {
      icon: <Scale className="h-6 w-6 text-[#C5A880]" />,
      title: "Planejamento Tributário & Fiscal",
      subtitle: "Inteligência Fiscal e Redução de Impostos",
      description: "Estudo aprofundado da matriz de custos tributários da empresa para otimização legal dos pagamentos e recuperação de impostos pagos indevidamente de forma administrativa ou judicial.",
      details: [
        "Planejamento tributário preventivo nacional e internacional",
        "Defesa administrativa e judicial em autos de infração",
        "Análise e recuperação de créditos de tributos (PIS, COFINS, ICMS, etc.)",
        "Consultoria sobre os impactos da Nova Reforma Tributária"
      ]
    },
    {
      icon: <FileText className="h-6 w-6 text-[#C5A880]" />,
      title: "Contratos B2B & Negociações",
      subtitle: "Mitigação e Segurança em Transações Comerciais",
      description: "Elaboração e revisão minuciosa de acordos comerciais complexos de alto valor, visando a máxima proteção contra inadimplemento e ambiguidades interpretativas.",
      details: [
        "Contratos de prestação de serviços e fornecimento B2B",
        "Contratos imobiliários comerciais e Built to Suit (BTS)",
        "Acordos de confidencialidade (NDA) e não-concorrência",
        "Cláusulas de arbitragem e mecanismos ágeis de cobrança"
      ]
    }
  ];

  // Professional Articles Data
  const articles: Article[] = [
    {
      id: "reforma-tributaria",
      title: "Impactos da Nova Reforma Tributária no Planejamento Fiscal de Empresas em 2026",
      category: "Direito Tributário",
      date: "12 de Julho, 2026",
      readTime: "6 min de leitura",
      excerpt: "Com a transição gradual para os novos impostos unificados (IBS e CBS), saiba como as corporações devem reestruturar seus custos operacionais para manter a margem e competitividade no mercado nacional.",
      content: [
        "A recente aprovação e regulamentação da Reforma Tributária traz profundas alterações na estrutura de custos de produtos e serviços em todo o território nacional. A transição gradual que se inicia redefine a tributação brasileira, unificando tributos clássicos como ICMS, ISS, IPI, PIS e COFINS no novo modelo do Imposto sobre Valor Agregado (IVA Dual), que se divide em IBS (Imposto sobre Bens e Serviços) e CBS (Contribuição sobre Bens e Serviços).",
        "Para as empresas brasileiras, a preparação imediata é vital. A simplificação teórica do sistema não significa redução automática de alíquotas. De fato, setores de serviços e comércio de alto valor podem enfrentar um aumento da carga tributária nominal caso não reformulem estrategicamente suas cadeias de crédito, transações internas e planejamento contratual.",
        "Recomendamos que diretores executivos e gerentes de finanças realizem uma auditoria fiscal completa de suas operações atuais. O mapeamento prévio de créditos tributários que serão cumulativos ou eliminados pode representar uma economia multimilionária nos próximos anos, servindo como diferencial competitivo absoluto."
      ]
    },
    {
      id: "blindagem-patrimonial",
      title: "Blindagem de Patrimônio: Estruturas Legais para Proteção de Ativos Familiares",
      category: "Holding e Sucessões",
      date: "05 de Julho, 2026",
      readTime: "8 min de leitura",
      excerpt: "Entenda os limites da lei no processo de blindagem de bens. Como utilizar Holdings, doações estruturadas e usufrutos para proteger o patrimônio contra riscos operacionais sem infringir normas legais.",
      content: [
        "Garantir a integridade financeira e física dos bens conquistados ao longo de décadas de trabalho duro é a principal preocupação de empresários, médicos, agricultores e profissionais de alto escalão. Em um cenário de incertezas macroeconômicas e litígios constantes, a estruturação de uma blindagem patrimonial preventiva se torna uma ferramenta de gestão indispensável.",
        "Diferente do senso comum, a blindagem patrimonial legítima não visa ocultar bens ou fraudar credores judiciais. A verdadeira segurança jurídica reside na organização antecipada, realizada em momentos de saúde operacional plena da empresa. A principal engrenagem para isso é a Holding Patrimonial: uma pessoa jurídica constituída com o fim específico de administrar os bens da família, isolando-os de passivos de empresas de risco e automatizando o fluxo sucessório.",
        "Através de mecanismos de doação de cotas com reserva de usufruto e cláusulas de impenhorabilidade, o fundador mantém o controle político e financeiro absoluto sobre tudo até o fim de sua vida, ao passo que garante que herdeiros recebam o patrimônio de forma pacífica, rápida e sem os custos exorbitantes do processo tradicional de inventário judicial."
      ]
    },
    {
      id: "contratos-inteligentes",
      title: "Contratos Comerciais Inteligentes: Redução de Riscos em Transações B2B de Alto Valor",
      category: "Direito Contratual",
      date: "28 de Junho, 2026",
      readTime: "5 min de leitura",
      excerpt: "Descubra como cláusulas claras de resolução de disputas, arbitragem e garantias reais reduzem em até 85% o estresse e os custos de cobrança jurídica em negociações entre corporações.",
      content: [
        "Nas relações entre empresas, um contrato mal elaborado ou copiado de modelos genéricos da internet é uma bomba relógio jurídica. Ambigüidades interpretativas, falta de estipulação precisa de níveis de serviço (SLAs) e ausência de regras de liquidação de quebras de contrato costumam arrastar disputas por anos nos tribunais estaduais brasileiros, gerando custos altíssimos.",
        "Um contrato comercial estratégico de alto padrão deve ser desenhado sob medida para o fluxo real do negócio do cliente. Ele deve prever com exatidão científica os gatilhos de inadimplência, multas escalonadas, juros contratuais, além de incluir garantias reais sólidas (como fianças, avais ou alienações fiduciárias de bens) que facilitem execuções rápidas se houver quebra de termos.",
        "Além disso, a inclusão estratégica de cláusulas de arbitragem e mediação privada de câmaras de comércio reduz drasticamente o tempo de solução de impasses comerciais — que caem de uma média de 5 anos na justiça pública para menos de 6 meses no ambiente arbitral —, mantendo o sigilo e a saúde de imagem de sua corporação."
      ]
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.phone) {
      setFormSubmitted(true);
      setTimeout(() => {
        // Clear form after 3 seconds
        setContactForm({ name: "", email: "", phone: "", subject: "", message: "" });
        setFormSubmitted(false);
      }, 4000);
    }
  };

  const openWhatsApp = () => {
    // Elegant preset professional WhatsApp message
    const text = encodeURIComponent(
      "Olá, Dr. Roberto Mendonça. Visitei seu site de portfólio e gostaria de agendar uma consulta jurídica confidencial sobre planejamento patrimonial e empresarial."
    );
    window.open(`https://wa.me/5515997118125?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#1D1E20] font-sans antialiased relative selection:bg-[#C5A880]/30 selection:text-[#1D1E20]">
      
      {/* Dynamic Gold Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#8E7044] via-[#C5A880] to-[#E5D2B3] fixed top-0 left-0 right-0 z-50" />

      {/* Back to developer hub option */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-3 py-2 bg-black/95 text-white hover:bg-black border border-white/10 rounded-lg shadow-xl text-xs font-mono tracking-wider transition-all duration-300 group hover:border-[#00FF41]/40"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-[#00FF41] group-hover:-translate-x-1 transition-transform" />
          <span className="text-white/60 group-hover:text-white">VOLTAR AO HUB</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
        </button>
      </div>

      {/* LUXURY HEADER / NAVBAR */}
      <header className="sticky top-1.5 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-40 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          {/* Logo Brand / Law Firm Typography */}
          <div className="flex items-center space-x-3 text-left">
            <div className="p-2 bg-[#1C2029] rounded-lg text-[#C5A880] flex items-center justify-center shadow-md">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <span className="font-serif font-bold tracking-widest text-base sm:text-lg uppercase text-[#1C2029] block">
                MENDONÇA & CARVALHO
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#C5A880] uppercase font-bold block">
                ADVOCACIA DE ALTO PADRÃO
              </span>
            </div>
          </div>

          {/* Desktop Navbar Menu links */}
          <nav className="hidden lg:flex items-center space-x-8 font-sans text-xs uppercase font-semibold tracking-wider text-gray-500">
            <a href="#inicio" className="hover:text-[#8E7044] transition-colors">Início</a>
            <a href="#atuacao" className="hover:text-[#8E7044] transition-colors">Áreas de Atuação</a>
            <a href="#especialista" className="hover:text-[#8E7044] transition-colors">O Especialista</a>
            <a href="#artigos" className="hover:text-[#8E7044] transition-colors">Artigos & Publicações</a>
            <a href="#contato" className="hover:text-[#8E7044] transition-colors">Agendamento</a>
          </nav>

          {/* CTA Link to WhatsApp phone number */}
          <div className="hidden sm:flex items-center space-x-4">
            <a 
              href="tel:15997118125" 
              className="font-mono text-xs text-gray-500 hover:text-black transition-colors flex items-center space-x-1.5 font-bold"
            >
              <Phone className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>(15) 99711-8125</span>
            </a>
            <button
              onClick={openWhatsApp}
              className="py-2.5 px-5 rounded bg-[#1C2029] hover:bg-black text-[#C5A880] hover:text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md border border-[#C5A880]/30 cursor-pointer flex items-center space-x-2"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>AGENDAR CONSULTA</span>
            </button>
          </div>

          {/* Mobile Menu Icon Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-[#C5A880] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-100 px-6 py-6 space-y-4"
            >
              <div className="flex flex-col space-y-3 font-sans text-xs uppercase font-semibold tracking-wider text-gray-600">
                <a 
                  href="#inicio" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-gray-50 hover:text-[#8E7044]"
                >
                  Início
                </a>
                <a 
                  href="#atuacao" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-gray-50 hover:text-[#8E7044]"
                >
                  Áreas de Atuação
                </a>
                <a 
                  href="#especialista" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-gray-50 hover:text-[#8E7044]"
                >
                  O Especialista
                </a>
                <a 
                  href="#artigos" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-gray-50 hover:text-[#8E7044]"
                >
                  Artigos & Publicações
                </a>
                <a 
                  href="#contato" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#8E7044]"
                >
                  Agendamento
                </a>
              </div>
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
                <a 
                  href="tel:15997118125" 
                  className="font-mono text-sm text-gray-700 font-bold flex items-center space-x-2"
                >
                  <Phone className="h-4 w-4 text-[#C5A880]" />
                  <span>(15) 99711-8125</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openWhatsApp();
                  }}
                  className="w-full text-center py-3 rounded bg-[#1C2029] text-[#C5A880] font-sans text-xs font-bold uppercase tracking-wider shadow-md flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>AGENDAR PELO WHATSAPP</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION / APRESENTAÇÃO */}
      <section id="inicio" className="relative min-h-[550px] lg:min-h-[650px] bg-[#161921] text-white flex items-center overflow-hidden">
        
        {/* Subtle decorative vector lines in background */}
        <div className="absolute inset-0 bg-black/45 z-10" />
        <img 
          src={luxuryOfficeImg} 
          alt="Escritório de advocacia Mendonça" 
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 filter blur-[1px]"
          referrerPolicy="no-referrer"
        />

        {/* Background light gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-transparent z-10" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 relative z-20 w-full text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left text column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Premium Top Badge */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#C5A880]/15 border border-[#C5A880]/40 text-[#C5A880] font-mono text-[9px] uppercase tracking-[0.25em] font-extrabold">
                <Award className="h-3.5 w-3.5" />
                <span>EXCELÊNCIA JURÍDICA COMPROVADA</span>
              </div>

              {/* Serif Header Display */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-normal leading-[1.1] text-white max-w-4xl">
                Advocacia Jurídica Estratégica para <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0D8B4] via-[#C5A880] to-[#A08055]">Proteção Patrimonial</span> e Defesa de Empresas.
              </h1>

              {/* Support paragraph */}
              <p className="font-sans text-sm sm:text-base text-gray-300/90 leading-relaxed max-w-2xl">
                Unimos rigor técnico de alto padrão a soluções inovadoras para blindar seus ativos familiares, otimizar sua estrutura tributária e resguardar suas transações comerciais com absoluta segurança e confidencialidade.
              </p>

              {/* Dynamic Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 max-w-xl">
                <div className="border-l-2 border-[#C5A880] pl-4">
                  <span className="font-serif text-2xl sm:text-3xl font-black text-white block">R$ 540M+</span>
                  <span className="font-mono text-[9px] text-gray-400 tracking-wider uppercase">Patrimônio Gerido</span>
                </div>
                <div className="border-l-2 border-[#C5A880] pl-4">
                  <span className="font-serif text-2xl sm:text-3xl font-black text-white block">15+ Anos</span>
                  <span className="font-mono text-[9px] text-gray-400 tracking-wider uppercase">De Experiência</span>
                </div>
                <div className="border-l-2 border-[#C5A880] pl-4 col-span-2 sm:col-span-1">
                  <span className="font-serif text-2xl sm:text-3xl font-black text-white block">99.2%</span>
                  <span className="font-mono text-[9px] text-gray-400 tracking-wider uppercase">Resolução Eficiente</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  onClick={openWhatsApp}
                  className="py-3.5 px-8 rounded bg-[#C5A880] hover:bg-[#D5B890] text-black font-sans text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(197,168,128,0.25)] cursor-pointer flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>CONSULTORIA IMEDIATA WHATSAPP</span>
                </button>
                <a
                  href="#atuacao"
                  className="py-3.5 px-8 rounded border border-white/20 hover:border-[#C5A880]/60 bg-white/5 hover:bg-white/10 text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 text-center flex items-center justify-center space-x-1.5"
                >
                  <span>CONHECER ÁREAS</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>

            </div>

            {/* Right side graphical badge / floating HUD */}
            <div className="hidden lg:col-span-4 lg:flex justify-end">
              <div className="p-8 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md w-72 space-y-6 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A880]/5 rounded-full blur-2xl" />
                
                <div className="flex items-center space-x-2.5">
                  <Clock className="h-4 w-4 text-[#C5A880]" />
                  <span className="font-mono text-[10px] text-gray-300 uppercase tracking-widest font-bold">Atendimento Confidencial</span>
                </div>
                
                <p className="text-white/85 text-xs font-sans leading-relaxed">
                  Oferecemos suporte jurídico ágil e personalizado para investidores, empresários e famílias de alto patrimônio.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-300">
                    <Check className="h-3.5 w-3.5 text-[#C5A880]" />
                    <span>Agendamento de reuniões em 24h</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-300">
                    <Check className="h-3.5 w-3.5 text-[#C5A880]" />
                    <span>Relatórios mensais de status</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-300">
                    <Check className="h-3.5 w-3.5 text-[#C5A880]" />
                    <span>Sigilo absoluto contratual</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-gray-400">Atendimento SP & Região</span>
                  <div className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PRACTICE AREAS / AREAS DE ATUAÇÃO */}
      <section id="atuacao" className="py-24 max-w-7xl mx-auto px-6 md:px-12 text-left">
        <div className="space-y-12">
          
          {/* Header Description */}
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs text-[#8E7044] font-bold uppercase tracking-[0.2em] block">
              // SOLUÇÕES PATRIMONIAIS E CORPORATIVAS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2029]">
              Áreas de Atuação Especializada
            </h2>
            <p className="font-sans text-sm sm:text-base text-gray-500 leading-relaxed">
              Atuação cirúrgica estruturada sob preceitos rígidos de governança e ética jurídica. Selecione uma área para compreender os detalhes técnicos de nossas soluções.
            </p>
          </div>

          {/* Grid Layout Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practiceAreas.map((area, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActiveArea(index)}
                className="p-8 rounded-xl bg-white border border-gray-100 hover:border-[#C5A880]/55 shadow-sm hover:shadow-md transition-all duration-300 text-left space-y-4 cursor-pointer relative overflow-hidden group"
              >
                {/* Decorative border bar */}
                <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-gray-100 group-hover:bg-[#C5A880] transition-colors" />

                <div className="flex items-center justify-between">
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-800 flex items-center justify-center group-hover:bg-[#C5A880]/10 group-hover:text-[#8E7044] transition-colors shadow-inner">
                    {area.icon}
                  </div>
                  <span className="font-mono text-[9px] text-gray-400 tracking-wider font-bold">DETALHES →</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#1C2029] group-hover:text-[#8E7044] transition-colors">
                    {area.title}
                  </h3>
                  <p className="font-mono text-[10px] text-[#C5A880] uppercase tracking-wider font-extrabold">
                    {area.subtitle}
                  </p>
                </div>

                <p className="font-sans text-xs text-gray-500 leading-relaxed">
                  {area.description}
                </p>

                <div className="pt-3 border-t border-gray-50 flex items-center text-xs text-gray-400 group-hover:text-[#8E7044] font-semibold transition-colors">
                  <span>Visualizar escopo jurídico completo</span>
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* PRACTICE AREA DETAIL MODAL */}
      <AnimatePresence>
        {activeArea !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl border border-gray-100 max-w-2xl w-full p-8 text-left shadow-2xl relative space-y-6"
            >
              <button 
                onClick={() => setActiveArea(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black focus:outline-none transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                <div className="p-2 bg-[#C5A880]/15 rounded-lg text-[#8E7044]">
                  {practiceAreas[activeArea].icon}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1C2029]">
                    {practiceAreas[activeArea].title}
                  </h3>
                  <p className="font-mono text-[9px] text-[#C5A880] uppercase tracking-wider font-bold">
                    {practiceAreas[activeArea].subtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {practiceAreas[activeArea].description}
                </p>

                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">Escopo Completo de Atuação:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {practiceAreas[activeArea].details.map((detail, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-gray-700 font-medium">
                        <Check className="h-4 w-4 text-[#C5A880] mt-0.5 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-mono text-[10px] text-gray-400">Atendimento disponível via WhatsApp</span>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => setActiveArea(null)}
                    className="flex-1 sm:flex-initial py-2.5 px-5 rounded border border-gray-200 hover:bg-gray-50 text-gray-600 font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Fechar
                  </button>
                  <button 
                    onClick={() => {
                      setActiveArea(null);
                      openWhatsApp();
                    }}
                    className="flex-1 sm:flex-initial py-2.5 px-5 rounded bg-[#1C2029] text-[#C5A880] hover:text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>AGENDAR CONSULTA</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROFILE / O ESPECIALISTA */}
      <section id="especialista" className="py-24 bg-[#FAF9F5] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Portrait Image Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              {/* Gold backing decorative frame */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border-2 border-[#C5A880]/30 -z-0 translate-x-1 translate-y-1" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl z-10 w-full max-w-sm aspect-square">
                <img 
                  src={lawyerPortraitImg} 
                  alt="Dr. Roberto Mendonça - Advogado" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gold glass tag */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#1C2029]/95 backdrop-blur-sm border border-[#C5A880]/30 text-[#C5A880] space-y-1">
                  <h4 className="font-serif text-sm font-bold text-white">Dr. Roberto Mendonça</h4>
                  <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest block">OAB/SP 124.576 // Sócio Diretor</p>
                </div>
              </div>
            </div>

            {/* Profile Info Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="font-mono text-xs text-[#8E7044] font-bold uppercase tracking-[0.2em] block">
                // COMPROMISSO COM A SEGURANÇA JURÍDICA
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2029]">
                Sobre o Sócio-Fundador
              </h2>
              
              <div className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed space-y-4">
                <p>
                  O <strong>Dr. Roberto Mendonça</strong> é graduado em Direito pela Faculdade de Direito da USP (Largo São Francisco), mestre em Direito Comercial e especialista em Planejamento Patrimonial e Sucessório. Ao longo de 15 anos de atuação, assessorou dezenas de holdings familiares, empresários de destaque e corporações de múltiplos setores no país.
                </p>
                <p>
                  Acredita em uma advocacia estratégica focada na prevenção. Cada estrutura societária ou tributária que desenha é executada de forma artesanal, adaptada exclusivamente à realidade de vida, negócios e projeções futuras do cliente.
                </p>
              </div>

              {/* Dynamic Credentials list */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 rounded-full bg-[#C5A880]/10 flex items-center justify-center text-[#8E7044] shrink-0 font-bold text-xs">✓</div>
                  <span className="font-sans text-xs text-gray-700 font-semibold">Graduado e Mestre em Direito Comercial - USP</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 rounded-full bg-[#C5A880]/10 flex items-center justify-center text-[#8E7044] shrink-0 font-bold text-xs">✓</div>
                  <span className="font-sans text-xs text-gray-700 font-semibold">Especialista em Gestão de Risco e Governança Corporativa</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 rounded-full bg-[#C5A880]/10 flex items-center justify-center text-[#8E7044] shrink-0 font-bold text-xs">✓</div>
                  <span className="font-sans text-xs text-gray-700 font-semibold">Conselheiro certificado em Planejamento Sucessório de Holdings</span>
                </div>
              </div>

              {/* Signature / Quote */}
              <div className="border-t border-gray-200 pt-6 space-y-1">
                <p className="font-serif italic text-base text-gray-700 font-semibold">
                  &ldquo;A melhor defesa jurídica patrimonial é aquela construída preventivamente na paz, e não na iminência do conflito.&rdquo;
                </p>
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest block font-bold">— Roberto Mendonça</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ARTICLES & PUBLICATIONS / ARTIGOS */}
      <section id="artigos" className="py-24 max-w-7xl mx-auto px-6 md:px-12 text-left">
        <div className="space-y-12">
          
          {/* Header Description */}
          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs text-[#8E7044] font-bold uppercase tracking-[0.2em] block">
              // DISSEMINANDO CONHECIMENTO DE ELITE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2029]">
              Artigos Técnicos e Publicações
            </h2>
            <p className="font-sans text-sm sm:text-base text-gray-500 leading-relaxed">
              Mantenha-se atualizado sobre as principais discussões fiscais, societárias e de blindagem patrimonial que ditam o rumo dos investimentos no país.
            </p>
          </div>

          {/* Articles list layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div 
                key={article.id} 
                className="bg-white rounded-xl border border-gray-100 hover:border-[#C5A880]/30 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 text-left space-y-4 cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="space-y-3">
                  {/* Category and Read time tag */}
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase">
                    <span className="text-[#8E7044]">{article.category}</span>
                    <span className="text-gray-400">{article.readTime}</span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#1C2029] hover:text-[#8E7044] transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="font-sans text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-semibold text-[#8E7044]">
                  <span>Ler artigo completo</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ARTICLE READER MODAL */}
      <AnimatePresence>
        {selectedArticle !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#FBFBFA] rounded-xl border border-gray-200 max-w-3xl w-full p-8 text-left shadow-2xl relative space-y-6 max-h-[85vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black focus:outline-none transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-3 pb-4 border-b border-gray-100">
                <div className="flex items-center space-x-3 text-xs font-mono font-bold uppercase text-[#C5A880]">
                  <span>{selectedArticle.category}</span>
                  <span>•</span>
                  <span className="text-gray-400">{selectedArticle.date}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C2029]">
                  {selectedArticle.title}
                </h3>
                <p className="font-mono text-[9px] text-gray-400 uppercase tracking-widest block font-bold">Autor: Dr. Roberto Mendonça // OAB/SP 124.576</p>
              </div>

              {/* Full Article Content body */}
              <div className="space-y-4 font-sans text-xs sm:text-sm text-gray-700 leading-relaxed">
                {selectedArticle.content.map((paragraph, index) => (
                  <p key={index} className="indent-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-[#C5A880]" />
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Opinião jurídica qualificada</span>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="flex-1 sm:flex-initial py-2.5 px-5 rounded border border-gray-200 hover:bg-gray-50 text-gray-600 font-sans text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Fechar Artigo
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedArticle(null);
                      openWhatsApp();
                    }}
                    className="flex-1 sm:flex-initial py-2.5 px-5 rounded bg-[#1C2029] text-[#C5A880] hover:text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>ENTRE EM CONTATO</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECURE SCHEDULING FORM & CONTACT / CONTATO */}
      <section id="contato" className="py-24 bg-[#1C2029] text-white relative overflow-hidden border-t border-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(197,168,128,0.06),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left information column */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <div className="space-y-4">
                <span className="font-mono text-xs text-[#C5A880] font-bold uppercase tracking-[0.2em] block">
                  // CONSULTAS SOB RIGOROSO SIGILO
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Agende uma Análise Preliminar Confidencial
                </h2>
                <p className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Preencha os dados do formulário seguro ou conecte-se diretamente com o escritório de advocacia pelo canal de WhatsApp oficial para retorno em menos de 24 horas úteis.
                </p>
              </div>

              {/* Direct channels */}
              <div className="space-y-4">
                <a 
                  href="tel:15997118125" 
                  className="flex items-center space-x-3 p-4 rounded-xl bg-black/35 hover:bg-black/50 border border-white/5 hover:border-[#C5A880]/30 transition-all text-left"
                >
                  <div className="p-2.5 bg-[#C5A880]/10 rounded-lg text-[#C5A880]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block font-bold">Telefone Comercial</span>
                    <span className="font-sans text-sm font-bold text-white block mt-0.5">(15) 99711-8125</span>
                  </div>
                </a>

                <div className="flex items-center space-x-3 p-4 rounded-xl bg-black/35 border border-white/5 text-left">
                  <div className="p-2.5 bg-[#C5A880]/10 rounded-lg text-[#C5A880]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block font-bold">Email de Contato</span>
                    <span className="font-sans text-sm font-semibold text-white block mt-0.5">contato@mendoncaadv.com.br</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 rounded-xl bg-black/35 border border-white/5 text-left">
                  <div className="p-2.5 bg-[#C5A880]/10 rounded-lg text-[#C5A880]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block font-bold">Endereço de Atendimento</span>
                    <span className="font-sans text-xs text-white block mt-0.5">Av. Brigadeiro Faria Lima, 2800, Jardins, São Paulo/SP</span>
                  </div>
                </div>
              </div>

              {/* Big direct WhatsApp click panel */}
              <div 
                onClick={openWhatsApp}
                className="p-6 rounded-xl bg-gradient-to-br from-[#1C2029] via-black to-[#2A313F] border border-[#C5A880]/50 hover:border-[#C5A880] text-left cursor-pointer transition-all duration-300 relative group overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#C5A880]/5 rounded-full blur-xl group-hover:scale-150 transition-transform" />
                
                <span className="font-mono text-[9px] text-[#C5A880] uppercase tracking-[0.2em] font-bold block">CANAL PREFERENCIAL RÁPIDO</span>
                <h4 className="font-serif text-lg font-bold text-white mt-1 group-hover:text-[#F0D8B4] transition-colors">Conectar pelo WhatsApp</h4>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                  Fale de forma reservada diretamente com o Dr. Roberto Mendonça pelo telefone <strong className="text-white">(15) 99711-8125</strong>.
                </p>
                
                <div className="mt-4 flex items-center text-xs font-bold text-[#C5A880] group-hover:text-[#F0D8B4] transition-all">
                  <span>Iniciar conversa agora</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7 bg-white/5 border border-white/10 p-8 md:p-10 rounded-xl relative">
              <h3 className="font-serif text-xl font-bold text-white text-left mb-6 pb-3 border-b border-white/10">
                Formulário de Pré-Agendamento
              </h3>
              
              <AnimatePresence>
                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-8 rounded-lg bg-[#C5A880]/10 border border-[#C5A880]/30 text-center space-y-4 my-12"
                  >
                    <div className="h-12 w-12 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center mx-auto">
                      <Check className="h-6 w-6" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-white">Solicitação Enviada com Sucesso</h4>
                    <p className="font-sans text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                      Seus dados foram criptografados e recebidos pela nossa equipe de triagem jurídica. O Dr. Roberto Mendonça ou um de nossos associados retornará o contato em até 24h.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Seu Nome Completo *</label>
                        <input 
                          type="text" 
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Ex: João da Silva"
                          className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-xs text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Endereço de E-mail *</label>
                        <input 
                          type="email" 
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="Ex: joao@empresa.com.br"
                          className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-xs text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Telefone / WhatsApp *</label>
                        <input 
                          type="tel" 
                          required
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          placeholder="Ex: (15) 99711-8125"
                          className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-xs text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Assunto da Consulta</label>
                        <input 
                          type="text" 
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          placeholder="Ex: Blindagem de Patrimônio"
                          className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-xs text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">Mensagem ou Descrição Sumária do Caso *</label>
                      <textarea 
                        rows={4}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Escreva brevemente o escopo que deseja proteger..."
                        className="w-full bg-black/30 border border-white/10 rounded-lg py-3 px-4 text-xs text-white focus:outline-none focus:border-[#C5A880] transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-4 rounded bg-[#C5A880] hover:bg-[#D5B890] text-black font-sans text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-[0_4px_15px_rgba(197,168,128,0.2)] cursor-pointer flex items-center justify-center space-x-2"
                      >
                        <span>ENVIAR SOLICITAÇÃO CRIPTOGRAFADA</span>
                      </button>
                    </div>

                    <p className="text-[10px] text-gray-500 font-mono text-center">
                      * Em estrita conformidade com a LGPD e o Código de Ética e Disciplina da OAB.
                    </p>
                  </form>
                )}
              </AnimatePresence>

            </div>

          </div>
        </div>
      </section>

      {/* LUXURY STANDALONE FOOTER */}
      <footer className="bg-[#111319] border-t border-gray-800 py-16 text-left text-gray-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-gray-800">
            {/* Brand Logo typography */}
            <div className="flex items-center space-x-3 text-left">
              <div className="p-2 bg-gray-800 text-[#C5A880] rounded flex items-center justify-center">
                <Scale className="h-4 w-4" />
              </div>
              <div>
                <span className="font-serif font-bold tracking-widest text-sm text-white uppercase block">
                  MENDONÇA & CARVALHO
                </span>
                <span className="font-mono text-[8px] tracking-widest text-[#C5A880] uppercase block">
                  ADVOGADOS ASSOCIADOS
                </span>
              </div>
            </div>

            <div className="font-mono text-[10px] tracking-wider uppercase text-gray-400">
              OAB/SP Registro de Sociedades Nº 12.845
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-white text-sm">Escritório Central SP</h4>
              <p className="font-sans text-xs leading-relaxed">
                Av. Brigadeiro Faria Lima, 2800, Jardins, São Paulo/SP. CEP 01451-001.<br />
                Atendimento presencial mediante agendamento prévio.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif font-bold text-white text-sm">Escritório Filial Sorocaba</h4>
              <p className="font-sans text-xs leading-relaxed">
                Edifício Dallas Center, Campolim, Sorocaba/SP.<br />
                Atendimento sob demanda para a região metropolitana.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif font-bold text-white text-sm">Contato Direto</h4>
              <p className="font-sans text-xs leading-relaxed font-mono">
                Tel: (15) 99711-8125<br />
                Email: contato@mendoncaadv.com.br<br />
                SLA de Resposta: &lt; 24h
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif font-bold text-white text-sm">Compliance e Ética</h4>
              <p className="font-sans text-xs leading-relaxed">
                Este portal institucional atende rigorosamente aos limites informativos impostos pelo Provimento nº 205/2021 do Conselho Federal da OAB.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-600 font-mono">
            <p>
              © {new Date().getFullYear()} MENDONÇA & CARVALHO. TODOS OS DIREITOS RESERVADOS.
            </p>
            <div className="flex space-x-4">
              <a href="#inicio" className="hover:text-white">TERMOS DE USO</a>
              <span>•</span>
              <a href="#inicio" className="hover:text-white">POLÍTICA DE PRIVACIDADE</a>
              <span>•</span>
              <a href="#inicio" className="hover:text-white">LGPD</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
