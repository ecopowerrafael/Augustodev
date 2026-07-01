import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Play, MessageSquare, Terminal, Shield, ArrowRight } from "lucide-react";
import CustomLogo from "./CustomLogo";

const PHRASES = [
  "Criação de Sites de Altíssima Performance.",
  "Interfaces Ultra Modernas com Animações Fluidas.",
  "Aplicativos Escaláveis de Logística e Delivery.",
  "Sistemas Completos de Mobilidade e Roteamento.",
  "Portfólios Institucionais Premium e Imponentes.",
];

export default function Hero() {
  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  // Typewriter loop
  useEffect(() => {
    let timer: number;
    const fullText = PHRASES[currentPhraseIdx];

    const handleType = () => {
      if (!isDeleting) {
        // Typing characters
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setTypingSpeed(70);

        if (displayText === fullText) {
          // Pause at the end of the sentence
          setIsDeleting(true);
          setTypingSpeed(2500); // Wait 2.5s
        }
      } else {
        // Deleting characters
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(35);

        if (displayText === "") {
          setIsDeleting(false);
          setCurrentPhraseIdx((prev) => (prev + 1) % PHRASES.length);
          setTypingSpeed(300); // Small delay before next phrase
        }
      }
    };

    timer = window.setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentPhraseIdx, typingSpeed]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between py-16 px-4 md:px-8 z-10 overflow-hidden">
      
      {/* Decorative coordinate grid markers at four corners of hero */}
      <div className="absolute top-10 left-10 font-mono text-[9px] text-white/30 select-none">
        LAT: -23.550520 // LON: -46.633308
      </div>
      <div className="absolute top-10 right-10 font-mono text-[9px] text-white/30 select-none text-right">
        SYS_VER: 2.0.4 // SECURE CONNECTION
      </div>
      
      {/* Glow ambient background mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#00FF41]/10 via-white/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Main Grid: Left copy details, Right Custom Logo */}
      <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        
        {/* Left Side: Pitch and typing system */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-8 text-left">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-3 bg-[#111] border border-white/10 px-3 py-1.5 rounded text-white/70 font-mono text-xs uppercase font-extrabold tracking-widest"
          >
            <Terminal className="h-3.5 w-3.5 text-[#00FF41] animate-pulse" />
            <span>Terminal Status: Active</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-4"
          >
            <h1 className="font-sans font-black tracking-tight text-5xl sm:text-7xl leading-[0.9] text-white">
              ENGINEERING THE<br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}>UNEXPECTED.</span>
            </h1>
            
            {/* Highly responsive typewriter display subtitle */}
            <div className="h-16 flex items-center">
              <p className="font-mono text-white/80 text-lg sm:text-2xl leading-relaxed flex items-center font-medium">
                <span className="text-[#00FF41] font-extrabold mr-2">&gt;</span>
                <span className="text-white">{displayText}</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block h-6 w-1.5 bg-[#00FF41] ml-1.5 shadow-[0_0_8px_rgba(0,255,65,0.8)]"
                />
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/40 text-base sm:text-lg max-w-2xl leading-relaxed"
          >
            Desenvolvedor Full Stack especializado na construção de ecossistemas web imersivos de alta fidelidade visual. Combinamos a robustez das melhores práticas de arquitetura de software com animações fluidas para criar experiências inesquecíveis.
          </motion.p>

          {/* Action CTAs with Glow and Shine effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            {/* Glowing sweep-shine button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="relative overflow-hidden py-3.5 px-8 rounded border border-[#00FF41]/50 bg-black font-mono text-xs font-bold text-[#00FF41] uppercase tracking-widest hover:scale-[1.03] transition-all duration-300 shadow-[0_0_15px_rgba(0,255,65,0.3)] hover:shadow-[0_0_25px_rgba(0,255,65,0.5)] group cursor-pointer"
            >
              {/* Internal shine overlay animation */}
              <div className="absolute inset-0 bg-[#00FF41]/10 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <div className="flex items-center justify-center space-x-2">
                <MessageSquare className="h-4 w-4 text-[#00FF41]" />
                <span>INICIAR PROJETO</span>
              </div>
            </button>

            {/* Ghost outline border glowing button */}
            <button
              onClick={() => scrollToSection("project-delivery")}
              className="py-3.5 px-8 rounded border border-white/10 hover:border-[#00FF41] hover:text-[#00FF41] hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] bg-black/50 text-white/70 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>EXPLORAR CASES</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#00FF41]" />
            </button>
          </motion.div>

          {/* Mini-index of Project Anchors with micro-coordinates */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 w-full max-w-lg"
          >
            {[
              { label: "Delivery App", id: "project-delivery" },
              { label: "Mobilidade", id: "project-mobility" },
              { label: "Site Advocacia", id: "project-lawyer" },
            ].map((anchor, i) => (
              <button
                key={anchor.id}
                onClick={() => scrollToSection(anchor.id)}
                className="group flex flex-col items-start p-2.5 rounded border border-transparent hover:border-white/5 hover:bg-white/5 text-left transition-all cursor-pointer"
              >
                <span className="font-mono text-[8px] text-white/30 font-bold uppercase">0{i+1} // PROJECT</span>
                <span className="text-white/80 font-bold text-xs group-hover:text-[#00FF41] transition-colors mt-1">{anchor.label}</span>
                <span className="font-mono text-[8px] text-[#00FF41]/50 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">RUN_ANIMATION</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Right Side: Rotating 3D AD Logo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="lg:col-span-5 flex items-center justify-center z-10"
        >
          <CustomLogo size={360} interactive={true} />
        </motion.div>

      </div>

      {/* Bounce Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        onClick={() => scrollToSection("project-delivery")}
        className="mx-auto flex flex-col items-center justify-center cursor-pointer select-none group mt-8"
      >
        <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em] group-hover:text-[#00FF41] transition-colors mb-1.5 font-semibold">ROLES DE SCROLL PARA DETALHES</span>
        <ChevronDown className="h-5 w-5 text-white/20 group-hover:text-[#00FF41] transition-colors" />
      </motion.div>

    </div>
  );
}
