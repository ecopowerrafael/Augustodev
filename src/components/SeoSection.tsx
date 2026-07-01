import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { Search, TrendingUp, BarChart3, Globe, Award, Zap, CheckCircle, ArrowUpRight, HelpCircle, LayoutGrid, Chrome, ChevronDown, ChevronUp } from "lucide-react";

// SEO Framework components
import { Breadcrumb, FAQSchema, ProductSchema } from "../seo/SEOComponents";
import InternalLinker from "../seo/InternalLinker";

interface DataPoint {
  day: string;
  clicks: number;
  impressions: number;
}

export default function SeoSection() {
  const [activeTab, setActiveTab] = useState<"clicks" | "impressions" | "both">("both");
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Como o SEO garante que meu site apareça na primeira página do Google?",
      answer: "Utilizamos uma arquitetura de código semântico aliada ao carregamento ultra-rápido (Core Web Vitals excelentes) e dados estruturados avançados (JSON-LD). Isso facilita a leitura do robô do Google, garantindo relevância e autoridade orgânica superiores."
    },
    {
      question: "Vocês otimizam sites já existentes ou apenas criam novos?",
      answer: "Criamos novos sites do zero utilizando frameworks modernos de alto desempenho como React e Vite, garantindo a pontuação máxima no Lighthouse. Para projetos existentes, realizamos uma auditoria técnica profunda de SEO e reestruturação completa de tags e links internos."
    },
    {
      question: "O que são dados estruturados do Schema.org?",
      answer: "São códigos inseridos no cabeçalho do site (em formato JSON-LD) que informam diretamente aos mecanismos de busca do que se trata aquela página, se há produtos, avaliações, artigos ou uma empresa local. Isso resulta em 'Rich Snippets' destacados nas pesquisas."
    },
    {
      question: "Qual o prazo para começar a ver os resultados de cliques e impressões?",
      answer: "Os resultados de indexação técnica ocorrem em poucos dias por meio do nosso sitemap automatizado e IndexNow. O crescimento orgânico exponencial de impressões e cliques consolida-se em um período de 30 a 60 dias, conforme demonstrado no painel interativo do Search Console."
    }
  ];

  // Generate data starting from low numbers (10 to 30) to high numbers (up to 22.4k clicks and 485k impressions)
  const data: DataPoint[] = [
    { day: "Dia 01", clicks: 12, impressions: 28 },
    { day: "Dia 05", clicks: 18, impressions: 45 },
    { day: "Dia 10", clicks: 35, impressions: 110 },
    { day: "Dia 15", clicks: 80, impressions: 320 },
    { day: "Dia 20", clicks: 210, impressions: 980 },
    { day: "Dia 25", clicks: 540, impressions: 2400 },
    { day: "Dia 30", clicks: 1200, impressions: 5800 },
    { day: "Dia 35", clicks: 2800, impressions: 14200 },
    { day: "Dia 40", clicks: 5900, impressions: 32000 },
    { day: "Dia 45", clicks: 11200, impressions: 78000 },
    { day: "Dia 50", clicks: 16400, impressions: 195000 },
    { day: "Dia 55", clicks: 19800, impressions: 340000 },
    { day: "Dia 60", clicks: 22400, impressions: 485000 }
  ];

  const maxClicks = 25000;
  const maxImpressions = 500000;

  // Convert values to SVG path coordinates (Width = 600, Height = 180)
  const width = 600;
  const height = 180;
  const padding = { top: 20, right: 20, bottom: 20, left: 20 };

  const getCoordinates = (index: number, val: number, max: number) => {
    const x = padding.left + (index / (data.length - 1)) * (width - padding.left - padding.right);
    const y = height - padding.bottom - (val / max) * (height - padding.top - padding.bottom);
    return { x, y };
  };

  const clicksPoints = data.map((d, i) => getCoordinates(i, d.clicks, maxClicks));
  const impressionsPoints = data.map((d, i) => getCoordinates(i, d.impressions, maxImpressions));

  const clicksPath = clicksPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const impressionsPath = impressionsPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  // Fill paths for beautiful gradient underneath
  const clicksFillPath = `${clicksPath} L ${clicksPoints[clicksPoints.length - 1].x} ${height - padding.bottom} L ${clicksPoints[0].x} ${height - padding.bottom} Z`;
  const impressionsFillPath = `${impressionsPath} L ${impressionsPoints[impressionsPoints.length - 1].x} ${height - padding.bottom} L ${impressionsPoints[0].x} ${height - padding.bottom} Z`;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const chartWidth = rect.width;
    const paddingLeftRatio = padding.left / width;
    const paddingRightRatio = padding.right / width;
    
    const usableWidth = chartWidth * (1 - paddingLeftRatio - paddingRightRatio);
    const startX = chartWidth * paddingLeftRatio;
    
    const relativeX = x - startX;
    const percent = Math.max(0, Math.min(1, relativeX / usableWidth));
    const index = Math.round(percent * (data.length - 1));
    
    if (index >= 0 && index < data.length) {
      setHoveredPoint(data[index]);
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
    setHoveredIndex(null);
  };

  return (
    <div className="relative w-full bg-[#0a0a0a] rounded-xl border border-white/5 p-8 overflow-hidden" id="seo-optimization">
      {/* Schema.org Structured Data Generators */}
      <ProductSchema 
        id="seo-service" 
        details={{
          name: "Otimização SEO de Alta Performance",
          description: "Colocamos o seu site na primeira página do Google através de arquitetura semântica, otimização extrema de Core Web Vitals e dados estruturados avançados.",
          image: "https://augustodev.com/og-image.png",
          category: "Serviço de Desenvolvimento de Software",
          offers: {
            price: "Sob Consulta",
            priceCurrency: "BRL"
          }
        }} 
      />
      <FAQSchema id="seo-faq" faqs={faqs} />

      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[250px] bg-gradient-to-b from-[#00FF41]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Breadcrumb Navigation Trail */}
      <div className="mb-6 text-left">
        <Breadcrumb items={[
          { label: "Cases", path: "/#project-delivery" },
          { label: "Otimização SEO", path: "/#seo-optimization" }
        ]} />
      </div>

      {/* Header HUD Style */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/5 pb-6 mb-8 gap-4">
        <div className="space-y-3 max-w-2xl text-left">
          <div className="inline-flex items-center space-x-2 bg-[#00FF41]/10 border border-[#00FF41]/20 px-3 py-1 rounded text-[#00FF41] font-mono text-xs uppercase font-semibold tracking-wider">
            <TrendingUp className="h-3.5 w-3.5 animate-pulse" />
            <span>SEO DE ALTO RENDIMENTO // CORE ALGORITMO</span>
          </div>
          <h3 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">
            Coloco seu Site na <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FF41] to-white">Primeira Página</span> do Google
          </h3>
          <p className="text-white/60 text-sm leading-relaxed">
            Sua marca em destaque absoluto para quem procura pelo seu serviço. Desenvolvemos com técnicas modernas de SEO semântico, estruturação de dados avançada e tempo de carregamento instantâneo para liderar as buscas.
          </p>
        </div>
        <div className="flex items-center space-x-2.5 text-white/30 font-mono text-[10px] uppercase font-bold border border-white/5 bg-black/40 px-3 py-2 rounded">
          <Globe className="h-4 w-4 text-[#00FF41]" />
          <span>RANKING MUNDIAL ATIVO</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left column: Simulated Google Search Frame Mockup */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="font-mono text-[10px] text-white/40 uppercase font-extrabold tracking-widest block text-left">
              VISUALIZADOR REAL // BUSCADOR DE GOOGLE
            </span>
            
            {/* Google Web Browser Mockup Frame */}
            <div className="bg-[#121212] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
              
              {/* Browser bar with URL tab */}
              <div className="bg-[#1a1a1a] px-3.5 py-2.5 border-b border-white/5 flex items-center space-x-2.5">
                <div className="flex space-x-1.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="bg-[#090909] rounded-md px-3 py-1.5 flex items-center space-x-2 w-full max-w-sm text-[10px] font-mono text-white/40 border border-white/5">
                  <Chrome className="h-3 w-3 text-white/40 shrink-0" />
                  <span className="truncate select-none">google.com/search?q=desenvolvedor+aplicativos+alta+performance</span>
                </div>
              </div>

              {/* Simulated Search bar result indicator */}
              <div className="bg-[#121212] p-4 border-b border-white/5 flex items-center justify-between text-left">
                <div className="flex items-center space-x-3 w-full bg-[#1e1e1e] border border-white/5 px-3.5 py-2 rounded-full">
                  <Search className="h-3.5 w-3.5 text-white/40" />
                  <span className="font-sans text-xs text-white/90">desenvolvedor aplicativos alta performance</span>
                </div>
              </div>

              {/* SERP Results Container */}
              <div className="p-4 sm:p-5 space-y-5 text-left bg-[#121212] overflow-y-auto max-h-[300px]">
                
                {/* FIRST PLACE: OUR PREMIUM CUSTOMIZED ORGANIC RESULT */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-2 border border-[#00FF41]/20 bg-[#00FF41]/5 p-4 rounded-lg relative"
                >
                  {/* Badge Rank Indicator */}
                  <div className="absolute top-3 right-3 flex items-center space-x-1 bg-[#00FF41]/20 border border-[#00FF41]/30 px-2 py-0.5 rounded text-[#00FF41] font-mono text-[8px] uppercase font-bold">
                    <Award className="h-2.5 w-2.5" />
                    <span>ORGÂNICO // RANK #1</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-white/5 border border-[#00FF41]/30 flex items-center justify-center font-mono text-[8px] text-[#00FF41] font-bold">A</div>
                    <div className="text-[10px] text-white/50 font-sans leading-none">
                      https://augustodev.com <span className="text-white/20">› aplicativo</span>
                    </div>
                  </div>

                  <a 
                    href="#contact" 
                    className="block font-sans font-bold text-[#00FF41] text-sm hover:underline cursor-pointer tracking-tight"
                  >
                    Augusto Dev | Aplicativos & Sites de Alta Performance no Google
                  </a>

                  <p className="text-white/60 text-[11px] leading-relaxed">
                    Precisa de um aplicativo de <span className="text-white font-semibold">Delivery</span>, <span className="text-white font-semibold">Mobilidade</span> ou um site profissional? Código ultra-otimizado com pontuação 100% no Lighthouse. Fale conosco hoje!
                  </p>

                  {/* Sitelinks for extra premium authority search look */}
                  <div className="grid grid-cols-2 gap-3.5 pt-3 mt-1.5 border-t border-white/5">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-[#00FF41] hover:underline cursor-pointer block">Cases de Sucesso</span>
                      <p className="text-[9px] text-white/40 leading-none">Apps reais com excelente tráfego.</p>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-[#00FF41] hover:underline cursor-pointer block">Solicitar Orçamento</span>
                      <p className="text-[9px] text-white/40 leading-none">Retorno profissional em até 12h.</p>
                    </div>
                  </div>
                </motion.div>

                {/* SECOND PLACE (Standard blurred result representing competitors) */}
                <div className="space-y-1.5 opacity-30 select-none">
                  <div className="text-[10px] text-white/40 font-sans">
                    https://www.concorrentecomum.com.br
                  </div>
                  <h4 className="font-sans font-bold text-blue-400 text-xs">
                    Desenvolvimento de Sites Genéricos e Agência de Marketing
                  </h4>
                  <p className="text-white/50 text-[10px] leading-relaxed">
                    Criamos templates comuns para sua empresa. Carregamento lento em conexões 3G e sem suporte para aplicativos avançados nativos.
                  </p>
                </div>

              </div>
            </div>
          </div>

          <div className="bg-[#020202] p-4 rounded-lg border border-white/5 flex items-start space-x-3 text-left">
            <Zap className="h-5 w-5 text-[#00FF41] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-sans font-bold text-white text-xs uppercase tracking-wider">Aceleração de Core Web Vitals</h5>
              <p className="text-white/50 text-[11px] leading-relaxed mt-1">
                O robô do Google prioriza sites que carregam em menos de 1.5 segundo. Nossos projetos alcançam a nota máxima (100/100) na auditoria oficial do Lighthouse.
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Search Console style interactive chart and summary metrics */}
        <div className="lg:col-span-7 bg-[#020202] rounded-xl border border-white/5 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-white/40 uppercase font-extrabold tracking-widest">
                PAINEL GOOGLE SEARCH CONSOLE // TRÁFEGO REAL
              </span>
              <span className="h-2 w-2 rounded-full bg-[#00FF41] animate-ping" />
            </div>

            {/* Metrics card layout with Google Search Console styles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              
              {/* Total Clicks filter card */}
              <button
                onClick={() => setActiveTab(activeTab === "clicks" ? "both" : "clicks")}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  activeTab === "clicks" || activeTab === "both"
                    ? "border-[#4285f4] bg-[#4285f4]/5 shadow-[0_0_15px_rgba(66,133,244,0.15)]"
                    : "border-white/5 bg-black/40 hover:border-white/10"
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-[#4285f4]" />
                <span className="font-mono text-[8px] text-white/40 font-bold uppercase block">Cliques Totais</span>
                <div className="flex items-baseline space-x-1.5 mt-1">
                  <span className="font-sans font-black text-lg text-white">22,4K</span>
                  <span className="font-mono text-[9px] text-[#00FF41] font-bold">▲ +186k%</span>
                </div>
                <span className="font-mono text-[8px] text-white/30 block mt-1">Início: 12 cliques</span>
              </button>

              {/* Total Impressions filter card */}
              <button
                onClick={() => setActiveTab(activeTab === "impressions" ? "both" : "impressions")}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  activeTab === "impressions" || activeTab === "both"
                    ? "border-[#24b4c4] bg-[#24b4c4]/5 shadow-[0_0_15px_rgba(36,180,196,0.15)]"
                    : "border-white/5 bg-black/40 hover:border-white/10"
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-[#24b4c4]" />
                <span className="font-mono text-[8px] text-white/40 font-bold uppercase block">Impressões</span>
                <div className="flex items-baseline space-x-1.5 mt-1">
                  <span className="font-sans font-black text-lg text-white">485K</span>
                  <span className="font-mono text-[9px] text-[#00FF41] font-bold">▲ +1.7M%</span>
                </div>
                <span className="font-mono text-[8px] text-white/30 block mt-1">Início: 28 imp.</span>
              </button>

              {/* Average CTR card */}
              <div className="p-3 rounded-lg border border-white/5 bg-black/40 text-left relative">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-[#0f9d58]" />
                <span className="font-mono text-[8px] text-white/40 font-bold uppercase block">CTR Médio</span>
                <div className="flex items-baseline space-x-1.5 mt-1">
                  <span className="font-sans font-black text-lg text-[#0f9d58]">4,6%</span>
                  <span className="font-mono text-[8px] text-white/30 font-semibold">SAUDÁVEL</span>
                </div>
                <span className="font-mono text-[8px] text-white/30 block mt-1">Taxa de Conversão</span>
              </div>

              {/* Average Position card */}
              <div className="p-3 rounded-lg border border-white/5 bg-black/40 text-left relative">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-[#ab47bc]" />
                <span className="font-mono text-[8px] text-white/40 font-bold uppercase block">Posição Média</span>
                <div className="flex items-baseline space-x-1.5 mt-1">
                  <span className="font-sans font-black text-lg text-[#ab47bc]">1,2</span>
                  <span className="font-mono text-[8px] text-[#00FF41] font-bold">TOP 1</span>
                </div>
                <span className="font-mono text-[8px] text-white/30 block mt-1">Primeira Página</span>
              </div>

            </div>

            {/* Interactive SVG Line Graph resembling Google Search Console */}
            <div className="relative border border-white/5 bg-black/60 p-4 rounded-lg overflow-hidden h-52 flex items-center justify-center">
              
              {/* Subtle background gridlines */}
              <div className="absolute inset-0 flex flex-col justify-between py-5 px-3 opacity-15 pointer-events-none">
                <div className="h-[1px] w-full bg-white" />
                <div className="h-[1px] w-full bg-white" />
                <div className="h-[1px] w-full bg-white" />
                <div className="h-[1px] w-full bg-white" />
              </div>

              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="none"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="overflow-visible cursor-crosshair z-10"
              >
                <defs>
                  {/* Clicks Gradient fill */}
                  <linearGradient id="clicksGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4285f4" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4285f4" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Impressions Gradient fill */}
                  <linearGradient id="impressionsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#24b4c4" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#24b4c4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Draw Impressions Line underneath */}
                {(activeTab === "impressions" || activeTab === "both") && (
                  <>
                    <motion.path
                      d={impressionsFillPath}
                      fill="url(#impressionsGrad)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    <motion.path
                      d={impressionsPath}
                      fill="none"
                      stroke="#24b4c4"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, ease: "easeOut" }}
                    />
                  </>
                )}

                {/* Draw Clicks Line */}
                {(activeTab === "clicks" || activeTab === "both") && (
                  <>
                    <motion.path
                      d={clicksFillPath}
                      fill="url(#clicksGrad)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    <motion.path
                      d={clicksPath}
                      fill="none"
                      stroke="#4285f4"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, ease: "easeOut" }}
                    />
                  </>
                )}

                {/* Hover line tracker and node indicators */}
                {hoveredIndex !== null && (
                  <>
                    {/* Vertical guideline */}
                    <line
                      x1={clicksPoints[hoveredIndex].x}
                      y1={padding.top}
                      x2={clicksPoints[hoveredIndex].x}
                      y2={height - padding.bottom}
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />

                    {/* Impressions Node dot */}
                    {(activeTab === "impressions" || activeTab === "both") && (
                      <circle
                        cx={impressionsPoints[hoveredIndex].x}
                        cy={impressionsPoints[hoveredIndex].y}
                        r="5"
                        fill="#24b4c4"
                        stroke="#020202"
                        strokeWidth="1.5"
                      />
                    )}

                    {/* Clicks Node dot */}
                    {(activeTab === "clicks" || activeTab === "both") && (
                      <circle
                        cx={clicksPoints[hoveredIndex].x}
                        cy={clicksPoints[hoveredIndex].y}
                        r="5"
                        fill="#4285f4"
                        stroke="#020202"
                        strokeWidth="1.5"
                      />
                    )}
                  </>
                )}
              </svg>

              {/* Floating Rich Tooltip box based on hover state */}
              {hoveredPoint && hoveredIndex !== null && (
                <div
                  className="absolute bg-[#121212] border border-white/10 rounded px-3 py-2 text-left text-[10px] space-y-1 shadow-xl pointer-events-none z-30"
                  style={{
                    left: `${Math.min(
                      80,
                      Math.max(5, (clicksPoints[hoveredIndex].x / width) * 100 - 15)
                    )}%`,
                    top: "10%",
                  }}
                >
                  <span className="font-mono text-white/40 font-bold block">{hoveredPoint.day}</span>
                  {(activeTab === "clicks" || activeTab === "both") && (
                    <div className="flex items-center space-x-1.5 font-mono">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4285f4]" />
                      <span className="text-white/60">Cliques:</span>
                      <span className="text-[#4285f4] font-bold">
                        {hoveredPoint.clicks >= 1000 ? `${(hoveredPoint.clicks / 1000).toFixed(1)}k` : hoveredPoint.clicks}
                      </span>
                    </div>
                  )}
                  {(activeTab === "impressions" || activeTab === "both") && (
                    <div className="flex items-center space-x-1.5 font-mono">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#24b4c4]" />
                      <span className="text-white/60">Impressões:</span>
                      <span className="text-[#24b4c4] font-bold">
                        {hoveredPoint.impressions >= 1000 ? `${(hoveredPoint.impressions / 1000).toFixed(0)}k` : hoveredPoint.impressions}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* X-axis custom labels */}
            <div className="flex justify-between text-[9px] font-mono text-white/30 px-3.5 select-none">
              <span>Semana 1</span>
              <span>Semana 3</span>
              <span>Semana 5</span>
              <span>Semana 7</span>
              <span>Fim do Segundo Mês (Hoje)</span>
            </div>
          </div>

          {/* Core factors check */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 border-t border-white/5 pt-5 text-left">
            <div className="space-y-1">
              <span className="text-[10px] text-[#00FF41] font-mono font-bold block">01 // ARQUITETURA SEMÂNTICA</span>
              <p className="text-white/50 text-[10px] leading-relaxed">
                Utilização inteligente de tags HTML5 estruturadas, rich snippets e metatags JSON-LD para melhor rastreamento.
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-[#00FF41] font-mono font-bold block">02 // VELOCIDADE RADICAL</span>
              <p className="text-white/50 text-[10px] leading-relaxed">
                Código leve empacotado pelo Vite, reduzindo requisições HTTP e otimizando imagens para carregamento de milissegundos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Interactive FAQ Accordion & Internal Linking Side-by-Side on Desktop --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 border-t border-white/5 pt-10 text-left items-start">
        {/* Column 1: Interactive FAQ Accordion (SEO Otimizado) */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-[9px] text-[#00FF41] font-bold uppercase tracking-widest block">
              02 // CENTRAL DE DÚVIDAS FREQUENTES (FAQ)
            </span>
            <h3 className="font-sans font-black text-2xl text-white tracking-tight">
              Perguntas Frequentes sobre SEO & Performance
            </h3>
            <p className="text-white/60 text-xs">
              Esclareça suas principais dúvidas sobre como elevamos seu posicionamento orgânico e melhoramos as conversões.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] rounded-lg transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 font-sans font-medium text-xs sm:text-sm text-white hover:text-[#00FF41] text-left transition-colors cursor-pointer select-none"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-[#00FF41] shrink-0 ml-3" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-white/30 shrink-0 ml-3" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-1 text-white/50 text-xs sm:text-sm leading-relaxed border-t border-white/5 bg-black/40">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Automated Internal Linking System */}
        <div className="space-y-6 lg:mt-0 mt-8">
          <InternalLinker currentTopic="seo" />
        </div>
      </div>

    </div>
  );
}
