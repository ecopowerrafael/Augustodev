import React from "react";
import { motion } from "motion/react";
import { Cpu, Zap, ShieldCheck, Search, Award, Code2, Users, Smartphone, BarChart3, RefreshCw } from "lucide-react";

export default function BentoGrid() {
  const cards = [
    {
      id: "bento-tech-stack",
      title: "TECH STACK ULTRA ROBUSTA",
      subtitle: "Arquitetura limpa de alta escalabilidade",
      size: "col-span-1 md:col-span-2 row-span-1",
      icon: <Code2 className="h-5 w-5 text-[#00FF41]" />,
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 h-full">
          {[
            { name: "React 19 / Vite", rate: "99%", color: "text-[#00FF41]" },
            { name: "Node.js / Bun", rate: "95%", color: "text-white" },
            { name: "Next.js / SSR", rate: "98%", color: "text-[#00FF41]" },
            { name: "PostgreSQL", rate: "94%", color: "text-white" },
            { name: "Express / NestJS", rate: "96%", color: "text-[#00FF41]" },
            { name: "Tailwind CSS v4", rate: "100%", color: "text-white" },
            { name: "Framer Motion", rate: "99%", color: "text-[#00FF41]" },
            { name: "Docker / Cloud", rate: "92%", color: "text-white" },
          ].map((tech, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04, y: -2 }}
              className="bg-[#020202] p-2.5 rounded border border-white/5 flex flex-col justify-between"
            >
              <span className="text-[10px] font-mono text-white/30 font-bold uppercase">MODULE_0{i+1}</span>
              <span className="text-white font-bold text-xs mt-1">{tech.name}</span>
              <span className={`text-[10px] font-mono font-bold mt-2 ${tech.color}`}>{tech.rate} EXPERT</span>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      id: "bento-lighthouse",
      title: "PERFORMANCE METRIC (100%)",
      subtitle: "Código otimizado para Core Web Vitals",
      size: "col-span-1 row-span-1",
      icon: <Zap className="h-5 w-5 text-white animate-pulse" />,
      content: (
        <div className="flex flex-col items-center justify-center py-2 h-full">
          <div className="relative flex items-center justify-center">
            {/* Real circular progress indicator */}
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="8" fill="transparent" />
              <motion.circle
                cx="48"
                cy="48"
                r="40"
                stroke="#00FF41"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="251"
                initial={{ strokeDashoffset: 251 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <span className="absolute text-white font-mono font-extrabold text-2xl">100</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 w-full mt-4 text-center">
            {[
              { n: "PERF", v: "100", c: "text-[#00FF41]" },
              { n: "ACC", v: "100", c: "text-[#00FF41]" },
              { n: "SEO", v: "100", c: "text-[#00FF41]" },
              { n: "PRAT", v: "100", c: "text-[#00FF41]" },
            ].map((metric, idx) => (
              <div key={idx} className="bg-[#020202] p-1.5 rounded border border-white/5">
                <span className="text-[8px] font-mono text-white/30 font-bold uppercase">{metric.n}</span>
                <span className={`block text-xs font-mono font-extrabold ${metric.c}`}>{metric.v}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "bento-ux-focused",
      title: "UX INTUITIVA E RESPONSIVA",
      subtitle: "O design encontra a fluidez matemática",
      size: "col-span-1 row-span-1",
      icon: <Smartphone className="h-5 w-5 text-[#00FF41]" />,
      content: (
        <div className="flex flex-col justify-between h-full py-2">
          <p className="text-white/60 text-xs leading-relaxed">
            Nossos layouts se adaptam perfeitamente a computadores, tablets e smartphones de qualquer resolução, priorizando tempo de resposta abaixo de 50ms e transições fluidas que dão a sensação de aplicativo nativo.
          </p>
          <div className="flex items-center space-x-2 mt-4 bg-[#020202] p-2.5 rounded border border-white/5 text-white/80 font-mono text-[10px]">
            <Cpu className="h-4 w-4 text-[#00FF41] animate-spin" />
            <span>RENDER_ENGINE: MOTION ACTIVE</span>
          </div>
        </div>
      ),
    },
    {
      id: "bento-security",
      title: "SEGURANÇA EXTREMA",
      subtitle: "Práticas recomendadas pela OWASP",
      size: "col-span-1 md:col-span-2 row-span-1",
      icon: <ShieldCheck className="h-5 w-5 text-[#00FF41]" />,
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 h-full">
          <div className="space-y-2">
            <h5 className="font-mono text-xs font-bold text-white">BLINDAGEM DE CÓDIGO</h5>
            <p className="text-white/60 text-xs leading-relaxed">
              Proteção contra ataques comuns (XSS, CSRF, SQL Injection) e sanitização rígida de dados.
            </p>
          </div>
          <div className="space-y-2">
            <h5 className="font-mono text-xs font-bold text-white">APIS TOTALMENTE SEGURAS</h5>
            <p className="text-white/60 text-xs leading-relaxed">
              Autenticação forte baseada em tokens (JWT/OAuth), criptografia de ponta a ponta e cabeçalhos de segurança.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max w-full" id="expertise-grid">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          whileHover={{ y: -4 }}
          className={`${card.size} group relative bg-[#0a0a0a] border border-white/5 rounded-xl p-6 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#00FF41]/40 hover:shadow-[0_0_30px_rgba(0,255,65,0.08)]`}
        >
          {/* Futuristic corner borders on hover */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-transparent group-hover:border-[#00FF41] transition-colors duration-300" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-[#00FF41] transition-colors duration-300" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-[#00FF41] transition-colors duration-300" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-transparent group-hover:border-[#00FF41] transition-colors duration-300" />

          {/* Grid visual background for subtle tech aesthetic */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50" />

          {/* Card Title HUD Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3 z-10">
            <div className="flex items-center space-x-3">
              {card.icon}
              <div>
                <h4 className="font-mono text-[10px] tracking-wider text-white/30 font-bold uppercase">HUD // METRIC_CHANNEL</h4>
                <span className="font-sans font-extrabold text-sm text-white uppercase tracking-wider">{card.title}</span>
              </div>
            </div>
            <span className="font-mono text-[9px] text-white/20 font-semibold">SEC_SYS_0{index+1}</span>
          </div>

          {/* Card Custom Content */}
          <div className="flex-1 my-4 z-10 flex flex-col justify-center">
            {card.content}
          </div>

          {/* Card Subtitle Footer */}
          <div className="flex justify-between items-center text-[10px] font-mono text-white/40 border-t border-white/5 pt-3 z-10">
            <span>{card.subtitle}</span>
            <span className="group-hover:text-[#00FF41] transition-colors uppercase font-bold text-[8px] tracking-widest flex items-center space-x-1">
              <span>ACTIVE STATUS</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#00FF41] animate-ping inline-block" />
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
