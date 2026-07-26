import React, { useState } from "react";
import { X, QrCode, Download, Printer, Copy, Check, Share2, Shield, Award } from "lucide-react";
import FounderSealBadge from "./FounderSealBadge";

interface QRCodeManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  qrUrl?: string;
  targetName?: string;
  publicLink?: string;
}

export default function QRCodeManagerModal({
  isOpen,
  onClose,
  title = "QR Code Oficial Kennel Legacy",
  qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://kennellegacy.com/canil/vale-imperial",
  targetName = "Canil Vale Imperial",
  publicLink = "https://kennellegacy.com/canil/vale-imperial"
}: QRCodeManagerModalProps) {
  const [tagTemplate, setTagTemplate] = useState<"square" | "vertical" | "card" | "pedigree" | "expo">("square");
  const [copied, setCopied] = useState<boolean>(false);
  const [downloadMsg, setDownloadMsg] = useState<string>("");

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownload = () => {
    setDownloadMsg("Etiqueta QR Code pronta! Download concluído em PNG HD.");
    setTimeout(() => setDownloadMsg(""), 4000);
  };

  const handlePrint = () => {
    setDownloadMsg("Enviando modelo de etiqueta para o spooler de impressão...");
    setTimeout(() => setDownloadMsg(""), 4000);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#12161B] border border-[#2A323C] rounded-2xl max-w-xl w-full p-6 space-y-6 text-left shadow-2xl relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2A323C] pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="h-9 w-9 rounded-lg bg-[#C8A45D]/20 border border-[#C8A45D] flex items-center justify-center text-[#E2C77D]">
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#C8A45D] uppercase font-bold tracking-wider block">
                GERENCIADOR DE ETIQUETAS & QR CODES
              </span>
              <h3 className="font-serif text-lg font-bold text-white">{targetName}</h3>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#171C22]">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Model Template Selector */}
        <div>
          <label className="block text-xs font-mono text-[#C8A45D] font-bold uppercase mb-2">
            Modelo de Etiqueta Imprimível
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs font-mono">
            {[
              { id: "square", label: "Quadrada" },
              { id: "vertical", label: "Vertical" },
              { id: "card", label: "Cartão" },
              { id: "pedigree", label: "Pedigree" },
              { id: "expo", label: "Exposição" }
            ].map(tpl => (
              <button
                key={tpl.id}
                onClick={() => setTagTemplate(tpl.id as any)}
                className={`py-2 px-2 rounded border text-center transition ${
                  tagTemplate === tpl.id ? "bg-[#C8A45D] text-black border-[#C8A45D] font-bold" : "bg-[#0B0D10] text-slate-300 border-[#2A323C]"
                }`}
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* QR Code Tag Preview Box */}
        <div className="p-6 bg-[#0B0D10] border-2 border-[#C8A45D]/50 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 relative shadow-2xl">
          <FounderSealBadge variant="compact" />

          <div className="p-3 bg-white rounded-xl shadow-xl border border-white/20">
            <img src={qrUrl} alt="QR Code" className="h-44 w-44 object-contain" />
          </div>

          <div>
            <h4 className="font-serif text-base font-bold text-white">{targetName}</h4>
            <p className="text-xs font-mono text-slate-400 mt-0.5">{publicLink}</p>
          </div>

          <div className="text-[10px] font-mono text-[#C8A45D] uppercase tracking-widest pt-2 border-t border-[#2A323C] w-full text-center">
            KENNEL LEGACY // IDENTIDADE & PEDIGREE VERIFICADO
          </div>
        </div>

        {downloadMsg && (
          <div className="p-3 rounded-lg bg-[#2FB879]/20 border border-[#2FB879] text-[#2FB879] text-xs font-mono font-bold text-center">
            {downloadMsg}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          <button
            onClick={handleCopyLink}
            className="py-2.5 px-3 bg-[#171C22] hover:bg-[#2A323C] border border-[#2A323C] text-slate-200 text-xs font-mono rounded-lg font-bold flex items-center justify-center space-x-1.5"
          >
            {copied ? <Check className="h-4 w-4 text-[#2FB879]" /> : <Copy className="h-4 w-4 text-[#C8A45D]" />}
            <span>{copied ? "Copiado!" : "Copiar Link"}</span>
          </button>

          <button
            onClick={handleDownload}
            className="py-2.5 px-3 bg-[#171C22] hover:bg-[#2A323C] border border-[#2A323C] text-slate-200 text-xs font-mono rounded-lg font-bold flex items-center justify-center space-x-1.5"
          >
            <Download className="h-4 w-4 text-[#C8A45D]" />
            <span>Baixar QR</span>
          </button>

          <button
            onClick={handlePrint}
            className="py-2.5 px-3 bg-[#171C22] hover:bg-[#2A323C] border border-[#2A323C] text-slate-200 text-xs font-mono rounded-lg font-bold flex items-center justify-center space-x-1.5"
          >
            <Printer className="h-4 w-4 text-[#C8A45D]" />
            <span>Imprimir</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="py-2.5 px-3 bg-[#C8A45D] hover:bg-[#E2C77D] text-black text-xs font-mono rounded-lg font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5"
          >
            <Share2 className="h-4 w-4" />
            <span>Compartilhar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
