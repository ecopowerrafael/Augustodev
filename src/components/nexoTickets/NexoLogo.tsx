import React from "react";
import { Ticket, Split, QrCode, ShieldCheck, Zap } from "lucide-react";

interface NexoLogoProps {
  className?: string;
  showSlogan?: boolean;
  size?: "sm" | "md" | "lg";
}

export const NexoLogo: React.FC<NexoLogoProps> = ({
  className = "",
  showSlogan = false,
  size = "md"
}) => {
  const iconSize = size === "sm" ? "w-6 h-6" : size === "lg" ? "w-10 h-10" : "w-8 h-8";
  const titleSize = size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center space-x-2.5">
        {/* Dynamic Logo Icon */}
        <div className="relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-[#6D3DF5] via-[#25164F] to-[#F0448B] shadow-lg shadow-[#6D3DF5]/25 border border-white/20 group">
          <div className="relative z-10 flex items-center space-x-0.5">
            <Ticket className={`${iconSize} text-white drop-shadow`} />
            <Split className="w-4 h-4 text-[#F0448B] -ml-1.5 stroke-[2.5]" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-[#1FA971] rounded-full p-0.5 border border-white/80">
            <QrCode className="w-2.5 h-2.5 text-white" />
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-1">
            <span className={`font-black tracking-tight ${titleSize} text-white font-sans`}>
              NEXO
            </span>
            <span className={`font-light tracking-wide ${titleSize} text-[#F0448B]`}>
              TICKETS
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase bg-[#6D3DF5]/30 text-[#6D3DF5] border border-[#6D3DF5]/50 rounded-md">
              SPLIT
            </span>
          </div>
        </div>
      </div>

      {showSlogan && (
        <p className="text-[11px] text-gray-400 font-medium mt-1 tracking-tight">
          Eventos que conectam. Pagamentos que se dividem com transparência.
        </p>
      )}
    </div>
  );
};
