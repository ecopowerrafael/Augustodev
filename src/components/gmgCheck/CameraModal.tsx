import React, { useState } from "react";
import { Camera, Upload, X, Check, Image as ImageIcon, Sparkles } from "lucide-react";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (photoUrl: string, caption: string) => void;
  defaultCaption?: string;
}

const SAMPLE_PRESET_PHOTOS = [
  { url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80", label: "Painel Principal GMG" },
  { url: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=600&q=80", label: "Terminal e Bateria" },
  { url: "https://images.unsplash.com/photo-1527016021513-b09758b777bd?auto=format&fit=crop&w=600&q=80", label: "Medidor do Tanque" },
  { url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80", label: "Leitura do Horímetro" },
  { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80", label: "Filtro e Tubulações" },
  { url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80", label: "Exaustão e Silencioso" },
];

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onCapture,
  defaultCaption = "",
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string>(SAMPLE_PRESET_PHOTOS[0].url);
  const [caption, setCaption] = useState<string>(defaultCaption || SAMPLE_PRESET_PHOTOS[0].label);
  const [isSimulatingCamera, setIsSimulatingCamera] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onCapture(selectedPhoto, caption || "Foto anexada à vistoria");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#10263F] border border-white/10 text-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#1769AA]/30 border border-[#1769AA] flex items-center justify-center text-[#F4B400]">
              <Camera className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-lg">Registo de Evidência Fotográfica</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {/* Main Viewfinder simulation */}
          <div className="relative aspect-video rounded-xl bg-black border border-white/10 overflow-hidden flex items-center justify-center group">
            <img
              src={selectedPhoto}
              alt="Preview"
              className="w-full h-full object-cover transition-all"
            />
            
            {/* Viewfinder Overlay */}
            <div className="absolute inset-0 border-2 border-dashed border-[#F4B400]/40 m-4 rounded-lg pointer-events-none flex flex-col justify-between p-2">
              <div className="flex justify-between text-[10px] text-[#F4B400] font-mono bg-black/60 px-2 py-0.5 rounded w-max backdrop-blur-sm">
                <span>REC • GMG-003</span>
              </div>
              <div className="text-right text-[10px] text-white/80 font-mono bg-black/60 px-2 py-0.5 rounded w-max ml-auto backdrop-blur-sm">
                {new Date().toLocaleTimeString()} • {new Date().toLocaleDateString()}
              </div>
            </div>

            {isSimulatingCamera && (
              <div className="absolute bottom-2 left-2 bg-[#18A66A]/90 text-white text-[10px] font-semibold px-2 py-1 rounded flex items-center space-x-1 backdrop-blur-sm">
                <Sparkles className="w-3 h-3" />
                <span>Simulador de Câmera de Campo</span>
              </div>
            )}
          </div>

          {/* Quick preset selector for simulation */}
          <div>
            <label className="text-xs font-medium text-gray-300 block mb-2 flex items-center justify-between">
              <span>Selecione a evidência simulada ou escolha da galeria:</span>
              <span className="text-[10px] text-[#F4B400] font-normal">Clique para alternar</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_PRESET_PHOTOS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedPhoto(item.url);
                    if (!caption) setCaption(item.label);
                  }}
                  className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    selectedPhoto === item.url
                      ? "border-[#F4B400] ring-2 ring-[#F4B400]/30 scale-[0.98]"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={item.url} alt={item.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-black/70 text-[9px] text-white p-1 truncate font-medium">
                    {item.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Caption input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-200 block">Legenda da Foto / Observação:</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Ex: Leitura do horímetro 1.842h, Terminal limpo..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#1769AA] focus:ring-1 focus:ring-[#1769AA]"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-black/20 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#10263F] border border-[#F4B400]/50 text-white text-sm font-semibold hover:brightness-110 transition-all flex items-center space-x-2 shadow-lg shadow-[#1769AA]/20"
          >
            <Check className="w-4 h-4 text-[#F4B400]" />
            <span>Anexar Evidência</span>
          </button>
        </div>
      </div>
    </div>
  );
};
