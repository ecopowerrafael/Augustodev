import React, { useState, useEffect } from "react";
import { MessageCircle, X, ArrowRight, Sparkles, Store } from "lucide-react";

interface FloatingWhatsAppButtonProps {
  onOpenForm: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  onOpenForm,
  onNavigateToSection
}) => {
  const [bubbleOpen, setBubbleOpen] = useState(false);

  useEffect(() => {
    // Proactive trigger popup bubble after 3.5 seconds
    const timer = setTimeout(() => {
      setBubbleOpen(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 font-sans flex flex-col items-end space-y-3">
      {/* Proactive Pop-up Bubble Drawer */}
      {bubbleOpen && (
        <div className="bg-white rounded-3xl p-4 shadow-2xl border-2 border-[#25D366] max-w-xs w-full animate-fadeIn relative text-[#18202A] space-y-3">
          <button
            onClick={() => setBubbleOpen(false)}
            className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-ping" />
            <span className="text-xs font-black text-[#0B1F3A]">Consultor BH Presentes</span>
          </div>

          <p className="text-xs text-[#687382] leading-relaxed">
            Olá! 👋 Procurando um celular novo ou seminovo? Posso ajudar você a encontrar uma oferta na Pampulha!
          </p>

          <div className="space-y-1.5 pt-1 text-[11px] font-bold">
            <button
              onClick={() => {
                onNavigateToSection("ofertas");
                setBubbleOpen(false);
              }}
              className="w-full text-left p-2 rounded-xl bg-[#F5F7FA] hover:bg-[#176BFF] hover:text-white transition-colors flex items-center justify-between"
            >
              <span>🔥 Quero ver ofertas</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              onClick={() => {
                onOpenForm();
                setBubbleOpen(false);
              }}
              className="w-full text-left p-2 rounded-xl bg-[#F5F7FA] hover:bg-[#176BFF] hover:text-white transition-colors flex items-center justify-between"
            >
              <span>📱 Estou procurando um modelo</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              onClick={() => {
                onNavigateToSection("troca");
                setBubbleOpen(false);
              }}
              className="w-full text-left p-2 rounded-xl bg-[#FFC928]/20 text-[#0B1F3A] hover:bg-[#FFC928] transition-colors flex items-center justify-between"
            >
              <span>🔄 Quero avaliar meu usado</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Main Green Icon Button */}
      <button
        onClick={() => {
          if (!bubbleOpen) {
            setBubbleOpen(true);
          } else {
            onOpenForm();
          }
        }}
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/50 hover:scale-110 transition-all border-2 border-white"
        aria-label="Atendimento WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F04444] rounded-full border-2 border-white animate-pulse" />
      </button>
    </div>
  );
};
