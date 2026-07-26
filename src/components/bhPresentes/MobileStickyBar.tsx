import React from "react";
import { MessageCircle, Tag, ArrowRight } from "lucide-react";

interface MobileStickyBarProps {
  onOpenForm: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenForm, onNavigateToSection }) => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0B1F3A] border-t border-white/10 p-2.5 shadow-2xl flex items-center justify-between gap-2 font-sans">
      <button
        onClick={() => onNavigateToSection("ofertas")}
        className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center justify-center space-x-1 border border-white/15"
      >
        <Tag className="w-4 h-4 text-[#FFC928]" />
        <span>Ver Ofertas</span>
      </button>

      <button
        onClick={onOpenForm}
        className="flex-1 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs flex items-center justify-center space-x-1 shadow-lg"
      >
        <MessageCircle className="w-4 h-4" />
        <span>Chamar no WhatsApp</span>
      </button>
    </div>
  );
};
