import React from "react";
import { SEO_CONFIG } from "./seoConfig";
import { ArrowUpRight } from "lucide-react";

interface InternalLinkerProps {
  currentTopic?: string;
  className?: string;
}

/**
 * InternalLinker Component
 * Automatically relates and suggests context-rich internal pages/sections to search crawlers and users.
 */
export default function InternalLinker({ currentTopic, className = "" }: InternalLinkerProps) {
  // Exclude current topic from recommendations to avoid self-linking
  const suggestedLinks = SEO_CONFIG.internalLinks.filter(
    (link) => link.topic !== currentTopic
  );

  return (
    <div className={`border border-white/5 bg-[#020202] rounded-lg p-5 text-left space-y-4 ${className}`}>
      <div>
        <span className="font-mono text-[9px] text-[#00FF41] font-bold uppercase tracking-widest block">
          03 // RECOMENDAÇÃO DE CONTEÚDO RELACIONADO
        </span>
        <h4 className="font-sans font-bold text-white text-xs uppercase tracking-wider mt-1">
          Links Internos Otimizados (SEO Semântico)
        </h4>
        <p className="text-white/40 text-[10px] leading-relaxed mt-0.5">
          Fomentando a autoridade de domínio através de relevância interna e estrutura de silos interligados.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {suggestedLinks.map((link, index) => (
          <a
            key={index}
            href={link.path}
            onClick={(e) => {
              if (link.path.startsWith("/")) {
                e.preventDefault();
                window.history.pushState({}, "", link.path);
                window.dispatchEvent(new Event("popstate"));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5 hover:border-[#00FF41]/30 hover:bg-[#00FF41]/5 text-white/70 hover:text-[#00FF41] transition-all duration-300 font-sans text-xs group cursor-pointer"
          >
            <span className="truncate">{link.text}</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1.5" />
          </a>
        ))}
      </div>
    </div>
  );
}
