import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Bike, Sparkles, RefreshCw, Smartphone, Layers, ShieldCheck } from "lucide-react";

// SEO Framework components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";
import InternalLinker from "../seo/InternalLinker";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  rotation: number;
  rotSpeed: number;
}

export default function DeliverySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  const [animationState, setAnimationState] = useState<"idle" | "running" | "completed">("idle");
  const [showText, setShowText] = useState(false);
  
  const particlesRef = useRef<Particle[]>([]);

  // Function to launch the animation
  const startBikeAnimation = () => {
    if (animationState === "running") return;
    setAnimationState("running");
    setShowText(false);
    particlesRef.current = [];
    
    // After 1.1s (bike has crossed the center of screen), start revealing the text
    setTimeout(() => {
      setShowText(true);
    }, 1100);

    // After 2.5s, the bike finishes its crossing completely
    setTimeout(() => {
      setAnimationState("completed");
    }, 2500);
  };

  useEffect(() => {
    if (isInView) {
      if (animationState === "idle") {
        startBikeAnimation();
      }
    } else {
      setAnimationState("idle");
      setShowText(false);
    }
  }, [isInView]);

  // Smoke particles animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const colors = [
      "rgba(0, 255, 65, 0.45)", // Neon Green
      "rgba(255, 255, 255, 0.4)", // White
      "rgba(0, 255, 65, 0.25)", // Soft Neon Green
      "rgba(255, 255, 255, 0.15)" // Fade White
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw smoke particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.8; // Grow smoke
        p.alpha -= 0.007; // Fade out slowly
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        // Render puff
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        
        ctx.beginPath();
        // Draw cloud-like puff
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.arc(p.size * 0.4, -p.size * 0.2, p.size * 0.8, 0, Math.PI * 2);
        ctx.arc(-p.size * 0.4, p.size * 0.1, p.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        return p.alpha > 0;
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Spawn smoke particles at coordinates of the exhaust pipe
  const spawnSmoke = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Spawn multiple puffs
    for (let i = 0; i < 4; i++) {
      particlesRef.current.push({
        x: x - 15,
        y: y + (Math.random() * 15 - 7.5),
        vx: -3 - Math.random() * 5, // Blow backwards
        vy: -0.5 - Math.random() * 2, // Rise slightly
        size: 20 + Math.random() * 20,
        alpha: 0.85,
        color: [
          "rgba(0, 255, 65, 0.4)", // Neon Green
          "rgba(255, 255, 255, 0.35)", // White
          "rgba(0, 255, 65, 0.25)",  // Soft green
          "rgba(255, 255, 255, 0.15)"   // Soft White
        ][Math.floor(Math.random() * 4)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[600px] w-full bg-[#0a0a0a] rounded-xl border border-white/5 hover:border-[#00FF41]/30 transition-all overflow-hidden flex flex-col justify-between p-8"
      id="project-delivery"
    >
      {/* Product & Breadcrumb Schemas for Google Search */}
      <ProductSchema 
        id="delivery-app"
        details={{
          name: "Criação de Aplicativos de Delivery",
          description: "Desenvolvimento de aplicativos de delivery de alto desempenho, integrando mapas em tempo real, pagamentos instantâneos e notificações push.",
          image: "https://augustodev.com/logo.png"
        }}
      />
      <div className="mb-6 self-start text-left">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "App de Delivery", path: "/#project-delivery" }
        ]} />
      </div>

      {/* Visual Header / Frame HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-[#00FF41] animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 01 // DELIVERY ENGINE
          </span>
        </div>
        <button
          onClick={startBikeAnimation}
          disabled={animationState === "running"}
          className="flex items-center space-x-2 px-3 py-1.5 rounded border border-[#00FF41]/30 bg-black/40 text-[#00FF41] hover:bg-[#00FF41]/10 transition-all duration-300 font-mono text-xs group cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className="h-3 w-3 group-hover:rotate-180 transition-transform duration-500 text-[#00FF41]" />
          <span>RECURSAR ANIMAÇÃO</span>
        </button>
      </div>

      {/* Main stage where motorcycle and smoke exist */}
      <div className="relative flex-1 w-full flex items-center justify-center my-12 overflow-hidden min-h-[300px]">
        {/* Futuristic perspective grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,65,0.06),transparent_70%)]" />
        <div 
          className="absolute bottom-10 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF41]/30 to-transparent"
          style={{ boxShadow: "0 0 15px rgba(0,255,65,0.3)" }}
        />

        {/* Smoke Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

        {/* Animated Motorcycle Group */}
        {animationState === "running" && (
          <motion.div
            initial={{ left: "-40%" }}
            animate={{ left: "120%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            onUpdate={(latest) => {
              // Extract current position on screen
              if (latest.left !== undefined) {
                const percentage = typeof latest.left === "string" ? parseFloat(latest.left) : (latest.left as number);
                const parentWidth = canvasRef.current?.width || window.innerWidth;
                const actualX = (percentage / 100) * parentWidth;
                const actualY = (canvasRef.current?.height || 300) * 0.65; // Exhaust position
                
                // Spawn smoke puffs
                if (percentage > -20 && percentage < 110) {
                  spawnSmoke(actualX, actualY);
                }
              }
            }}
            className="absolute w-60 h-32 flex items-center justify-center z-20"
            style={{ bottom: "5%" }}
          >
            {/* Highly customized SVG futuristic bike */}
            <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-[0_4px_15px_rgba(0,255,65,0.6)]">
              {/* Exhaust fire */}
              <motion.path
                d="M 12,50 L 2,47 L 12,44 L 0,47 Z"
                fill="#ff6b00"
                stroke="#ffffff"
                strokeWidth="1"
                animate={{ scaleX: [1, 1.8, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 0.1 }}
                className="origin-right"
              />
              
              {/* Back Wheel with spinning rim */}
              <g transform="translate(45, 65)">
                <circle cx="0" cy="0" r="22" fill="#020202" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <circle cx="0" cy="0" r="16" fill="none" stroke="#00FF41" strokeWidth="4" className="opacity-80" />
                {/* Glowing neon rims spokes */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.3, ease: "linear" }}
                >
                  <line x1="-16" y1="0" x2="16" y2="0" stroke="#ffffff" strokeWidth="2" />
                  <line x1="0" y1="-16" x2="0" y2="16" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="0" cy="0" r="6" fill="#020202" stroke="#00FF41" strokeWidth="2" />
                </motion.g>
              </g>

              {/* Front Wheel */}
              <g transform="translate(155, 65)">
                <circle cx="0" cy="0" r="22" fill="#020202" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <circle cx="0" cy="0" r="16" fill="none" stroke="#00FF41" strokeWidth="4" className="opacity-80" />
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.3, ease: "linear" }}
                >
                  <line x1="-16" y1="0" x2="16" y2="0" stroke="#ffffff" strokeWidth="2" />
                  <line x1="0" y1="-16" x2="0" y2="16" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="0" cy="0" r="6" fill="#020202" stroke="#00FF41" strokeWidth="2" />
                </motion.g>
              </g>

              {/* Futuristic Cyber Bike Chassis / Body */}
              {/* Metallic body shield */}
              <path
                d="M 45,65 L 75,35 L 140,35 L 155,65 L 115,70 L 65,70 Z"
                fill="#0a0a0a"
                stroke="#00FF41"
                strokeWidth="2"
              />
              
              {/* Neon cyan glowing core accent */}
              <path
                d="M 75,45 L 130,45"
                fill="none"
                stroke="#ffffff"
                strokeWidth="4"
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              />

              {/* Seat and Rider shape (Futuristic delivery rider silhouette) */}
              <path
                d="M 65,35 C 65,22 80,18 90,25 C 95,20 105,22 110,30 L 125,35 L 105,45 Z"
                fill="#020202"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
              />
              {/* Neon helmet visor */}
              <path
                d="M 88,20 L 98,22 L 95,28"
                fill="none"
                stroke="#00FF41"
                strokeWidth="2.5"
                className="drop-shadow-[0_0_5px_#00FF41]"
              />

              {/* Delivery Box at the back of the bike */}
              <rect
                x="20"
                y="15"
                width="36"
                height="36"
                rx="6"
                fill="#0a0a0a"
                stroke="#00FF41"
                strokeWidth="3"
                className="drop-shadow-[0_0_12px_rgba(0,255,65,0.5)]"
              />
              {/* Box logo - glowing fast flash lightning */}
              <path
                d="M 38,23 L 30,32 L 36,32 L 32,41"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_0_6px_#ffffff]"
              />

              {/* Steering fork */}
              <line x1="155" y1="65" x2="135" y2="25" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
              <line x1="135" y1="25" x2="120" y2="25" stroke="#020202" strokeWidth="3" />
            </svg>
          </motion.div>
        )}

        {/* Glowing holographic delivery text emerging from smoke */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15">
          {showText && (
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.05, 1], 
                opacity: 1,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <h3 className="font-sans font-black tracking-widest text-4xl sm:text-6xl uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FF41] to-white drop-shadow-[0_0_35px_rgba(0,255,65,0.7)]">
                APLICATIVO DE DELIVERY
              </h3>
              <p className="font-mono text-xs sm:text-sm tracking-[0.5em] text-[#00FF41] uppercase mt-4">
                Sistemas ultra robustos • Logística em tempo real • Mapas & Rotas
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Foot Card Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/10 pt-6 z-10 bg-black/40 rounded-b p-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded bg-[#00FF41]/10 text-[#00FF41]">
            <Smartphone className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-white">INTERFACE AMIGÁVEL</h4>
            <p className="text-white/40 text-xs mt-1">UX otimizada para o motoboy e para o cliente final.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="p-2 rounded bg-[#00FF41]/10 text-[#00FF41]">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-white">GERENCIAMENTO TOTAL</h4>
            <p className="text-white/40 text-xs mt-1">Painel administrativo completo com relatórios financeiros.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="p-2 rounded bg-[#00FF41]/10 text-[#00FF41]">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-white">PAGAMENTOS INTEGRADOS</h4>
            <p className="text-white/40 text-xs mt-1">Pix, Cartões e Split automático de faturamento.</p>
          </div>
        </div>
      </div>

      {/* Internal Linking Recommender */}
      <InternalLinker currentTopic="delivery" className="mt-6 text-left" />
    </div>
  );
}
