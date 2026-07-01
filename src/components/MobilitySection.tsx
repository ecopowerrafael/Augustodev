import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Car, RefreshCw, Compass, MapPin, Zap, Eye } from "lucide-react";

// SEO Framework components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";
import InternalLinker from "../seo/InternalLinker";

export default function MobilitySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  const [animationState, setAnimationState] = useState<"idle" | "running" | "completed">("idle");
  const [showText, setShowText] = useState(false);

  const startCarAnimation = () => {
    if (animationState === "running") return;
    setAnimationState("running");
    setShowText(false);

    // After 1.1s (car has crossed the middle of screen), start revealing the text
    setTimeout(() => {
      setShowText(true);
    }, 1100);

    // Complete the animation at 2.5s
    setTimeout(() => {
      setAnimationState("completed");
    }, 2500);
  };

  useEffect(() => {
    if (isInView) {
      if (animationState === "idle") {
        startCarAnimation();
      }
    } else {
      setAnimationState("idle");
      setShowText(false);
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[600px] w-full bg-[#0a0a0a] rounded-xl border border-white/5 hover:border-[#00FF41]/30 transition-all overflow-hidden flex flex-col justify-between p-8"
      id="project-mobility"
    >
      {/* Product & Breadcrumb Schemas for Google Search */}
      <ProductSchema 
        id="mobility-platform"
        details={{
          name: "Sistemas de Mobilidade Urbana e Rotas",
          description: "Desenvolvimento de plataformas personalizadas de mobilidade, gerenciamento de frotas e aplicativos com rastreamento GPS e rotas em tempo real.",
          image: "https://augustodev.com/logo.png"
        }}
      />
      <div className="mb-6 self-start text-left">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "Plataforma de Mobilidade", path: "/#project-mobility" }
        ]} />
      </div>

      {/* Visual Header / Frame HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-[#00FF41] animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 02 // MOBILITY PLATFORM
          </span>
        </div>
        <button
          onClick={startCarAnimation}
          disabled={animationState === "running"}
          className="flex items-center space-x-2 px-3 py-1.5 rounded border border-[#00FF41]/30 bg-black/40 text-[#00FF41] hover:bg-[#00FF41]/10 transition-all duration-300 font-mono text-xs group cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className="h-3 w-3 group-hover:rotate-180 transition-transform duration-500 text-[#00FF41]" />
          <span>RECURSAR ANIMAÇÃO</span>
        </button>
      </div>

      {/* Main stage with the zooming Car and light trail */}
      <div className="relative flex-1 w-full flex items-center justify-center my-12 overflow-hidden min-h-[300px]">
        {/* Futuristic perspective grid or coordinates background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,65,0.06),transparent_70%)]" />
        
        {/* Coordinates grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />

        <div 
          className="absolute bottom-12 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF41]/30 to-transparent"
          style={{ boxShadow: "0 0 15px rgba(0,255,65,0.3)" }}
        />

        {/* Animated Car */}
        {animationState === "running" && (
          <motion.div
            initial={{ left: "120%" }}
            animate={{ left: "-40%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute bottom-[10%] w-72 h-24 flex items-center justify-center z-20"
          >
            {/* Sleek sports car SVG silhouette */}
            <svg viewBox="0 0 240 80" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,255,65,0.7)]">
              {/* Backlight flare/light trail */}
              <motion.path
                d="M 235,46 L 270,44 L 235,48 Z"
                fill="none"
                stroke="#ef4444"
                strokeWidth="4"
                className="opacity-90 drop-shadow-[0_0_10px_#ef4444]"
                animate={{ width: [10, 40, 10] }}
                transition={{ repeat: Infinity, duration: 0.1 }}
              />

              {/* Headlight beam */}
              <polygon
                points="10,43 -120,25 -120,65 10,48"
                fill="url(#headlightGrad)"
                opacity="0.25"
              />

              <defs>
                <linearGradient id="headlightGrad" x1="100%" y1="50%" x2="0%" y2="50%">
                  <stop offset="0%" stopColor="#00FF41" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00FF41" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="carBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0a0a0a" />
                  <stop offset="50%" stopColor="#020202" />
                  <stop offset="100%" stopColor="#111111" />
                </linearGradient>
              </defs>

              {/* Front Wheel */}
              <g transform="translate(62, 58)">
                <circle cx="0" cy="0" r="16" fill="#020202" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="12" fill="none" stroke="#00FF41" strokeWidth="3" className="opacity-80" />
                <motion.g
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 0.25, ease: "linear" }}
                >
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="0" y1="-12" x2="0" y2="12" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="4" fill="#0a0a0a" />
                </motion.g>
              </g>

              {/* Back Wheel */}
              <g transform="translate(178, 58)">
                <circle cx="0" cy="0" r="16" fill="#020202" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="12" fill="none" stroke="#00FF41" strokeWidth="3" className="opacity-80" />
                <motion.g
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 0.25, ease: "linear" }}
                >
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="0" y1="-12" x2="0" y2="12" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="4" fill="#0a0a0a" />
                </motion.g>
              </g>

              {/* Sleek Sports Car Body */}
              <path
                d="M 12,45 L 30,30 L 70,22 L 120,18 L 155,22 L 195,30 L 225,40 L 235,52 L 230,58 L 200,58 C 196,48 180,48 176,58 L 84,58 C 80,48 64,48 60,58 L 24,58 Z"
                fill="url(#carBodyGrad)"
                stroke="#00FF41"
                strokeWidth="2.5"
              />

              {/* Windshield and Side Windows (Cyan Neon glow glass) */}
              <path
                d="M 75,25 L 115,22 L 135,25 L 110,32 L 78,32 Z"
                fill="#00FF41"
                opacity="0.3"
                stroke="#ffffff"
                strokeWidth="1.5"
              />

              {/* Cyan laser highlight lines for modern aesthetics */}
              <path
                d="M 32,32 Q 80,24 160,26"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                className="drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
              />

              <path
                d="M 24,58 L 52,58"
                fill="none"
                stroke="#00FF41"
                strokeWidth="2"
              />

              {/* Red glowing rear tail light */}
              <circle cx="232" cy="48" r="3" fill="#ef4444" className="drop-shadow-[0_0_8px_#ef4444]" />
            </svg>
          </motion.div>
        )}

        {/* Laser reveal effect & Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15">
          {showText && (
            <motion.div
              initial={{ opacity: 0, filter: "blur(15px)" }}
              animate={{ 
                opacity: 1, 
                filter: "blur(0px)",
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <h3 className="font-sans font-black tracking-widest text-4xl sm:text-5xl uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FF41] to-white drop-shadow-[0_0_35px_rgba(0,255,65,0.7)]">
                APLICATIVO DE MOBILIDADE URBANA
              </h3>
              <p className="font-mono text-xs sm:text-sm tracking-[0.4em] text-[#00FF41] uppercase mt-4">
                Geolocalização Ativa • Algoritmos de Pareamento • Faturamento Direto
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer Info HUD for Mobility Case Study */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/10 pt-6 z-10 bg-black/40 rounded-b p-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded bg-[#00FF41]/10 text-[#00FF41]">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-white">ROTEAMENTO INTELIGENTE</h4>
            <p className="text-white/40 text-xs mt-1">Integração avançada com Maps API, prevendo trânsito e rotas mais rápidas.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="p-2 rounded bg-[#00FF41]/10 text-[#00FF41]">
            <Compass className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-white">REAL-TIME GPS</h4>
            <p className="text-white/40 text-xs mt-1">Sincronização instantânea da localização do veículo via WebSockets.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="p-2 rounded bg-[#00FF41]/10 text-[#00FF41]">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-white">ALGORITMO SOB MEDIDA</h4>
            <p className="text-white/40 text-xs mt-1">Cálculo dinâmico de tarifas com base em demanda, distância e horário.</p>
          </div>
        </div>
      </div>

      {/* Internal Linking Recommender */}
      <InternalLinker currentTopic="mobility" className="mt-6 text-left" />
    </div>
  );
}
