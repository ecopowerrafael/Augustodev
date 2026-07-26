import React, { useState } from "react";
import { X, Copy, Check, QrCode, Share2, MessageCircle, Facebook, Instagram, Mail } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  shareUrl?: string;
  shareMessage?: string;
}

export default function ShareModal({
  isOpen,
  onClose,
  title = "Compartilhar Perfil",
  shareUrl = "https://kennellegacy.com/cao/thor-vale-imperial",
  shareMessage = "Conheça o perfil oficial e a linhagem de Thor do Vale Imperial no Kennel Legacy."
}: ShareModalProps) {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-[#25D366] text-black",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage + " " + shareUrl)}`
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-[#1877F2] text-white",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: "Instagram",
      icon: Instagram,
      color: "bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white",
      url: "#"
    },
    {
      name: "E-mail",
      icon: Mail,
      color: "bg-[#4D8FD8] text-white",
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareMessage + "\n\n" + shareUrl)}`
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#12161B] border border-[#2A323C] rounded-2xl max-w-md w-full p-6 space-y-6 text-left shadow-2xl relative my-auto">
        <div className="flex items-center justify-between border-b border-[#2A323C] pb-4">
          <div className="flex items-center space-x-2">
            <Share2 className="h-5 w-5 text-[#C8A45D]" />
            <h3 className="font-serif text-lg font-bold text-white">{title}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#171C22]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 font-sans">{shareMessage}</p>

        {/* Copy Link Input Bar */}
        <div className="flex items-center space-x-2 bg-[#0B0D10] border border-[#2A323C] rounded-xl p-2">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="bg-transparent border-none text-xs text-slate-200 font-mono flex-1 focus:outline-none px-2 truncate"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-[#C8A45D] hover:bg-[#E2C77D] text-black font-bold text-xs font-mono rounded-lg transition flex items-center space-x-1 shrink-0"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "Copiado!" : "Copiar"}</span>
          </button>
        </div>

        {/* Social Share Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          {shareOptions.map((opt, idx) => (
            <a
              key={idx}
              href={opt.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={opt.name === "Instagram" ? handleCopy : undefined}
              className={`p-3 rounded-xl border border-white/10 ${opt.color} font-mono text-xs font-bold flex items-center justify-center space-x-2 shadow-md hover:opacity-90 transition`}
            >
              <opt.icon className="h-4 w-4" />
              <span>{opt.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
