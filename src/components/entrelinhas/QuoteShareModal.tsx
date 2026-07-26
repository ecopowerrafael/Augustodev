import React from "react";
import { Copy, Share2, MessageCircle, Linkedin, X, Quote } from "lucide-react";

interface QuoteShareModalProps {
  quoteText: string;
  articleTitle: string;
  articleUrl: string;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export const QuoteShareModal: React.FC<QuoteShareModalProps> = ({
  quoteText,
  articleTitle,
  articleUrl,
  onClose,
  showToast
}) => {
  const formattedQuote = `“${quoteText}” — Do artigo "${articleTitle}" em Entrelinhas: ${articleUrl}`;

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(formattedQuote);
    showToast("Trecho copiado com sucesso.");
    onClose();
  };

  const handleShareWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(formattedQuote)}`;
    window.open(waUrl, "_blank");
    showToast("Abrindo WhatsApp...");
    onClose();
  };

  const handleShareLinkedIn = () => {
    const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
    window.open(liUrl, "_blank");
    showToast("Abrindo LinkedIn...");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans animate-fade-in">
      <div className="bg-[var(--bg-sec)] border border-[var(--border-color)] rounded-3xl p-6 max-w-lg w-full space-y-5 text-[var(--text-main)] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[var(--border-color)] text-[var(--text-sec)]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-2 text-[var(--accent-color)] text-xs font-bold uppercase tracking-wider">
          <Quote className="w-4 h-4" />
          <span>Compartilhar Trecho do Texto</span>
        </div>

        {/* Selected Quote Card Preview */}
        <div className="p-4 bg-[var(--bg-main)] rounded-2xl border border-[var(--border-color)] text-sm sm:text-base font-serif italic text-[var(--text-main)] leading-relaxed relative">
          “{quoteText}”
          <span className="block text-xs font-sans not-italic text-[var(--text-sec)] mt-2 font-medium">
            — {articleTitle} (Entrelinhas)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs font-semibold">
          <button
            onClick={handleCopyQuote}
            className="py-3 px-4 rounded-xl bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white flex items-center justify-center space-x-2 transition-all shadow-sm"
          >
            <Copy className="w-4 h-4" />
            <span>Copiar Trecho</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center space-x-2 transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleShareLinkedIn}
            className="py-3 px-4 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white flex items-center justify-center space-x-2 transition-all shadow-sm"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </button>
        </div>
      </div>
    </div>
  );
};
