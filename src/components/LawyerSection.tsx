import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Scale, RefreshCw, Award, Landmark, ShieldCheck, Sparkles } from "lucide-react";

// SEO Framework components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";
import InternalLinker from "../seo/InternalLinker";

export default function LawyerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  const [animationState, setAnimationState] = useState<"idle" | "running" | "completed">("idle");
  const [showText, setShowText] = useState(false);

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/advogado");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startAnimation = () => {
    if (animationState === "running") return;
    setAnimationState("running");
    setShowText(false);

    // After 3.5s (GIF has crossed the center of screen from right to left), start revealing the text
    setTimeout(() => {
      setShowText(true);
    }, 3500);

    // After 8.0s, the GIF finishes its crossing completely
    setTimeout(() => {
      setAnimationState("completed");
    }, 8000);
  };

  useEffect(() => {
    if (isInView) {
      if (animationState === "idle") {
        startAnimation();
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
      id="project-lawyer"
    >
      {/* Product & Breadcrumb Schemas for Google Search */}
      <ProductSchema 
        id="lawyer-website"
        details={{
          name: "Criação de Sites Institucionais e Profissionais",
          description: "Desenvolvimento de sites institucionais de altíssimo padrão estético e otimização para escritórios de advocacia, clínicas médicas, consultórios e empresas de destaque.",
          image: "https://augustodev.com/logo.png"
        }}
      />
      <div className="mb-6 self-start text-left">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "Sites Institucionais", path: "/#project-lawyer" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-[#00FF41] animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 03 // INSTITUTIONAL PORTALS
          </span>
        </div>
        <button
          onClick={startAnimation}
          disabled={animationState === "running"}
          className="flex items-center space-x-2 px-3 py-1.5 rounded border border-[#00FF41]/30 bg-black/40 text-[#00FF41] hover:bg-[#00FF41]/10 transition-all duration-300 font-mono text-xs group cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className="h-3 w-3 group-hover:rotate-180 transition-transform duration-500 text-[#00FF41]" />
          <span>RECURSAR ANIMAÇÃO</span>
        </button>
      </div>

      {/* Main stage with the zooming/sliding GIF window */}
      <div className="relative flex-1 w-full flex items-center justify-center my-12 overflow-hidden min-h-[300px]">
        {/* Futuristic perspective grid or coordinates background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,65,0.06),transparent_70%)]" />
        
        {/* Coordinates grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />

        <div 
          className="absolute bottom-12 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF41]/30 to-transparent"
          style={{ boxShadow: "0 0 15px rgba(0,255,65,0.3)" }}
        />

        {/* Animated Floating GIF Window */}
        {animationState === "running" && (
          <motion.div
            initial={{ left: "120%" }}
            animate={{ left: "-40%" }}
            transition={{ duration: 8.0, ease: "easeInOut" }}
            className="absolute bottom-[10%] w-72 sm:w-96 h-44 sm:h-60 flex items-center justify-center z-20"
          >
            <img
              src="https://monjauro.life/download.gif"
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(0,255,65,0.4)]"
              referrerPolicy="no-referrer"
              alt="Sites Institucionais Demo"
            />
          </motion.div>
        )}

        {/* Glowing holographic text reveal */}
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
                SITES INSTITUCIONAIS
              </h3>
              <p className="font-mono text-xs sm:text-sm tracking-[0.4em] text-[#00FF41] uppercase mt-4">
                Advocacia - Medicina - Empresas
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Independent Portfolio Callout Banner */}
      <div className="mb-6 p-5 rounded-lg bg-[#00FF41]/5 border border-[#00FF41]/20 flex flex-col md:flex-row items-center justify-between gap-4 z-10 text-left">
        <div>
          <span className="font-mono text-[9px] text-[#00FF41] font-bold block uppercase tracking-[0.2em]">DEMONSTRAÇÃO DE PORTFÓLIO PREMIUM</span>
          <h4 className="font-sans font-bold text-white text-base mt-1">Website de Advocacia de Alto Padrão</h4>
          <p className="text-white/60 text-xs mt-1">
            Criamos uma página institucional 100% independente do estilo hacker, com design refinado, fotos geradas por IA, artigos expandíveis e CTA ativo para (15) 99711-8125.
          </p>
        </div>
        <button
          onClick={navigateToPortfolio}
          className="w-full md:w-auto py-2.5 px-5 rounded bg-[#00FF41] text-black font-mono text-[10px] font-extrabold uppercase tracking-widest hover:bg-[#00FF41]/85 shadow-[0_0_15px_rgba(0,255,65,0.4)] transition-all cursor-pointer flex items-center justify-center space-x-1.5 shrink-0"
        >
          <span>ACESSAR SITE</span>
          <Sparkles className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Footer Specs for Institutional/Corporate/Medical Sites */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/10 pt-6 z-10 bg-black/40 rounded-b p-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded bg-[#00FF41]/10 text-[#00FF41]">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-white">POSICIONAMENTO DE MARCA</h4>
            <p className="text-white/40 text-xs mt-1">Design sofisticado com tipografia nobre para transmitir autoridade máxima no seu setor.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="p-2 rounded bg-[#00FF41]/10 text-[#00FF41]">
            <Scale className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-white">CONFORMIDADE E ÉTICA</h4>
            <p className="text-white/40 text-xs mt-1">Desenvolvimentos adequados às normas do OAB, CFM e demais órgãos de classe reguladores.</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="p-2 rounded bg-[#00FF41]/10 text-[#00FF41]">
            <Landmark className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-white">OTIMIZAÇÃO ORGÂNICA</h4>
            <p className="text-white/40 text-xs mt-1">Código limpo e arquitetura semântica focada no ranqueamento da primeira página do Google.</p>
          </div>
        </div>
      </div>

      {/* Internal Linking Recommender */}
      <InternalLinker currentTopic="lawyer" className="mt-6 text-left" />
    </div>
  );
}
