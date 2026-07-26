import React, { useState } from "react";
import { Equipment } from "../../data/gmgCheckData";
import { QrCode, X, Copy, Check, ExternalLink, Printer } from "lucide-react";

interface EquipmentQRModalProps {
  equipment: Equipment | null;
  onClose: () => void;
}

export const EquipmentQRModal: React.FC<EquipmentQRModalProps> = ({
  equipment,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!equipment) return null;

  const handleCopyTag = () => {
    navigator.clipboard.writeText(equipment.tag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#10263F] border border-white/10 text-white rounded-2xl w-full max-w-sm shadow-2xl p-6 space-y-5 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1769AA]/20 text-[#1769AA] border border-[#1769AA]/30 mb-2">
            Identificação de Campo
          </span>
          <h3 className="text-xl font-black text-white">{equipment.tag}</h3>
          <p className="text-xs text-gray-300 font-medium">{equipment.name}</p>
        </div>

        {/* QR Code Container Simulation */}
        <div className="bg-white p-6 rounded-2xl shadow-inner border-4 border-[#F4B400] inline-block mx-auto relative group">
          <div className="w-44 h-44 bg-gray-900 rounded-lg flex flex-col items-center justify-center p-3 text-white space-y-2 relative">
            <QrCode className="w-28 h-28 text-white" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#F4B400]">
              {equipment.tag}
            </span>
          </div>
        </div>

        {/* Equipment Specs summary */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-left space-y-1">
          <p className="flex justify-between">
            <span className="text-gray-400">Local:</span>
            <span className="font-semibold text-white">{equipment.siteName}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Fabricante:</span>
            <span className="font-medium text-gray-200">{equipment.manufacturer} {equipment.model}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-400">Potência:</span>
            <span className="font-bold text-[#F4B400]">{equipment.powerKVA} kVA</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleCopyTag}
            className="flex-1 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-gray-200 hover:bg-white/10 flex items-center justify-center space-x-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#18A66A]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copiado!" : "Copiar Tag"}</span>
          </button>

          <button
            onClick={() => alert(`Etiqueta QR Code para ${equipment.tag} enviada para a impressora de etiquetas do campo!`)}
            className="flex-1 py-2.5 rounded-xl bg-[#1769AA] text-white text-xs font-bold hover:brightness-110 flex items-center justify-center space-x-1.5 shadow"
          >
            <Printer className="w-3.5 h-3.5 text-[#F4B400]" />
            <span>Imprimir Tag</span>
          </button>
        </div>
      </div>
    </div>
  );
};
