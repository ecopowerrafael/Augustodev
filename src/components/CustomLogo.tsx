import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface CustomLogoProps {
  size?: number;
  interactive?: boolean;
}

export default function CustomLogo({ size = 300, interactive = true }: CustomLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  
  // Rotate ranges: -15deg to 15deg
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center select-none cursor-pointer"
      style={{ width: size, height: size, perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex flex-col items-center justify-center"
      >
        {/* Outer Glow Ring */}
        <div className="absolute inset-0 bg-[#00FF41]/10 rounded-full blur-3xl animate-pulse" />
        
        {/* SVG Drawing of the Shield and Electronics */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-[0_0_25px_rgba(0,255,65,0.3)]"
          style={{ transform: "translateZ(30px)" }}
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FF41" /> {/* Neon Green */}
              <stop offset="50%" stopColor="#ffffff" /> {/* Crisp White */}
              <stop offset="100%" stopColor="#00FF41" /> {/* Neon Green */}
            </linearGradient>
            
            <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#00FF41" />
            </linearGradient>

            <linearGradient id="silverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Hexagonal Background Pattern (inside shield) */}
          <path
            d="M 200,45 L 320,110 L 320,240 L 200,340 L 80,240 L 80,110 Z"
            fill="#020202"
            stroke="url(#shieldGrad)"
            strokeWidth="4"
            className="transition-all duration-300"
          />

          {/* Microchip background inside shield */}
          <rect
            x="160"
            y="140"
            width="80"
            height="80"
            rx="8"
            fill="#0a0a0a"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
          {/* Microchip pins */}
          <g stroke="rgba(0,255,65,0.4)" strokeWidth="2">
            <line x1="175" y1="130" x2="175" y2="140" />
            <line x1="190" y1="130" x2="190" y2="140" />
            <line x1="205" y1="130" x2="205" y2="140" />
            <line x1="225" y1="130" x2="225" y2="140" />
            
            <line x1="175" y1="220" x2="175" y2="230" />
            <line x1="190" y1="220" x2="190" y2="230" />
            <line x1="205" y1="220" x2="205" y2="230" />
            <line x1="225" y1="220" x2="225" y2="230" />

            <line x1="150" y1="155" x2="160" y2="155" />
            <line x1="150" y1="170" x2="160" y2="170" />
            <line x1="150" y1="185" x2="160" y2="185" />
            <line x1="150" y1="205" x2="160" y2="205" />

            <line x1="240" y1="155" x2="250" y2="155" />
            <line x1="240" y1="170" x2="250" y2="170" />
            <line x1="240" y1="185" x2="250" y2="185" />
            <line x1="240" y1="205" x2="250" y2="205" />
          </g>

          {/* Circuit Lines on the left of shield */}
          <g stroke="url(#circuitGrad)" strokeWidth="3" fill="none" opacity="0.85">
            {/* Circuit line 1 */}
            <path d="M 60,150 L 110,150 L 130,170" />
            <circle cx="60" cy="150" r="4" fill="#00FF41" />
            
            {/* Circuit line 2 */}
            <path d="M 70,170 L 120,170 L 140,190" />
            <circle cx="70" cy="170" r="4" fill="#00FF41" />

            {/* Circuit line 3 */}
            <path d="M 50,190 L 100,190 L 125,215" />
            <circle cx="50" cy="190" r="4" fill="#ffffff" />

            {/* Circuit line 4 */}
            <path d="M 65,210 L 115,210 L 135,230" />
            <circle cx="65" cy="210" r="4" fill="#00FF41" />
          </g>

          {/* Letters AD in stylized metallic gradients with 3D projection look */}
          <g style={{ transform: "translateZ(50px)" }}>
            {/* Letter 'A' */}
            <path
              d="M 125,245 L 165,130 L 205,130 L 230,200 M 145,205 L 210,205"
              fill="none"
              stroke="url(#shieldGrad)"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />
            {/* Letter 'D' */}
            <path
              d="M 235,130 L 275,130 C 315,130 330,160 330,187.5 C 330,215 315,245 275,245 L 235,245 Z"
              fill="none"
              stroke="url(#shieldGrad)"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />
          </g>
          
          {/* Inner metallic/white strokes of letters for glossy sheen */}
          <g style={{ transform: "translateZ(52px)" }} opacity="0.9">
            <path
              d="M 125,245 L 165,130 L 205,130 L 230,200 M 145,205 L 210,205"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 235,130 L 275,130 C 315,130 330,160 330,187.5 C 330,215 315,245 275,245 L 235,245 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>

        {/* Text Title below Shield */}
        <div 
          className="mt-2 text-center flex flex-col items-center"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="flex items-baseline space-x-2 font-sans font-bold tracking-widest text-3xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-300 drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
              AUGUSTO
            </span>
            <span className="text-[#00FF41] drop-shadow-[0_0_10px_rgba(0,255,65,0.5)] font-mono text-2xl font-extrabold">
              DEV
            </span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-mono mt-1 font-semibold">
            Architect & Creative Coder
          </div>
        </div>
      </motion.div>
    </div>
  );
}
