import React from "react";
import { Zap, ShieldCheck, Cpu } from "lucide-react";

interface GMGLogoProps {
  variant?: "light" | "dark" | "compact";
  className?: string;
  showSubtitle?: boolean;
}

export const GMGLogo: React.FC<GMGLogoProps> = ({
  variant = "dark",
  className = "",
  showSubtitle = true,
}) => {
  const isDark = variant === "dark";

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`}>
      {/* Emblem Icon */}
      <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#1769AA] to-[#10263F] shadow-lg border border-[#F4B400]/40 group overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#F4B400]/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex items-center justify-center">
          <Zap className="w-6 h-6 text-[#F4B400] fill-[#F4B400]/30 animate-pulse" />
          <ShieldCheck className="w-4 h-4 text-[#18A66A] absolute -bottom-1 -right-1" />
        </div>
      </div>

      {/* Text Brand */}
      <div className="flex flex-col">
        <div className="flex items-center space-x-1.5 font-bold tracking-tight text-xl leading-none">
          <span className={isDark ? "text-white" : "text-[#10263F]"}>GMG</span>
          <span className="text-[#F4B400] font-black">CHECK</span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#18A66A]/10 text-[#18A66A] border border-[#18A66A]/30">
            PRO
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`text-[11px] font-medium tracking-wide mt-1 ${
              isDark ? "text-[#7C8793]" : "text-[#66717E]"
            }`}
          >
            Vistorias Técnicas & Evidências
          </span>
        )}
      </div>
    </div>
  );
};
