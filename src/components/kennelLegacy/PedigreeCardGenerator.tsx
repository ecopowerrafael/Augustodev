import React, { useState } from "react";
import { Download, Sparkles, Share2, Layers, CheckCircle2, QrCode, Award, Shield, Image } from "lucide-react";
import { Dog, PEDIGREE_TREE_THOR } from "../../data/kennelLegacyData";
import FounderSealBadge from "./FounderSealBadge";

interface PedigreeCardGeneratorProps {
  dogs: Dog[];
}

export default function PedigreeCardGenerator({ dogs }: PedigreeCardGeneratorProps) {
  const [selectedDogId, setSelectedDogId] = useState<string>(dogs[0]?.id || "dog-1");
  const [cardTheme, setCardTheme] = useState<"dark" | "classic" | "exposition" | "minimal">("dark");
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const selectedDog = dogs.find(d => d.id === selectedDogId) || dogs[0];
  const tree = PEDIGREE_TREE_THOR;

  const handleGenerate = () => {
    setIsGenerating(true);
    setDownloadSuccess(false);
    setTimeout(() => {
      setIsGenerating(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 1500);
  };

  // Theme styling helpers
  const getThemeClasses = () => {
    switch (cardTheme) {
      case "classic":
        return "bg-gradient-to-br from-[#1c1810] via-[#120f0a] to-[#241e12] border-2 border-[#C8A45D] text-white";
      case "exposition":
        return "bg-gradient-to-br from-[#0F1D2A] via-[#0B1520] to-[#12283C] border-2 border-[#4D8FD8] text-white";
      case "minimal":
        return "bg-[#0B0D10] border border-[#2A323C] text-white";
      case "dark":
      default:
        return "bg-gradient-to-br from-[#171C22] via-[#0B0D10] to-[#171C22] border-2 border-[#C8A45D]/70 text-white";
    }
  };

  return (
    <div className="w-full bg-[#12161B] rounded-xl border border-[#2A323C] p-4 sm:p-6 text-left shadow-2xl relative">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[#2A323C] pb-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="h-5 w-5 text-[#C8A45D]" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
              Gerador de Card de Linhagem
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Gere um card visual e elegível de pedigree para compartilhamento e impressões digitais.
          </p>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#C8A45D] to-[#E2C77D] hover:from-[#E2C77D] hover:to-[#C8A45D] text-black font-mono text-xs font-bold uppercase tracking-wider transition shadow-[0_0_15px_rgba(200,164,93,0.3)] flex items-center space-x-2 shrink-0 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>Processando Card...</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>Gerar e Baixar Visualização</span>
            </>
          )}
        </button>
      </div>

      {/* Control Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-[#171C22] p-4 rounded-xl border border-[#2A323C]">
        {/* Select Dog */}
        <div>
          <label className="block font-mono text-[10px] text-[#C8A45D] uppercase font-bold mb-1.5">
            1. Selecionar Cão
          </label>
          <select
            value={selectedDogId}
            onChange={(e) => setSelectedDogId(e.target.value)}
            className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-[#C8A45D]"
          >
            {dogs.map(dog => (
              <option key={dog.id} value={dog.id}>
                {dog.registeredName} ({dog.breed})
              </option>
            ))}
          </select>
        </div>

        {/* Select Theme */}
        <div>
          <label className="block font-mono text-[10px] text-[#C8A45D] uppercase font-bold mb-1.5">
            2. Modelo Visual
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setCardTheme("dark")}
              className={`px-2.5 py-1.5 rounded text-xs font-mono border transition ${
                cardTheme === "dark" ? "bg-[#C8A45D] text-black border-[#C8A45D] font-bold" : "bg-[#0B0D10] text-slate-300 border-[#2A323C]"
              }`}
            >
              Modelo Dark
            </button>
            <button
              onClick={() => setCardTheme("classic")}
              className={`px-2.5 py-1.5 rounded text-xs font-mono border transition ${
                cardTheme === "classic" ? "bg-[#C8A45D] text-black border-[#C8A45D] font-bold" : "bg-[#0B0D10] text-slate-300 border-[#2A323C]"
              }`}
            >
              Modelo Clássico
            </button>
            <button
              onClick={() => setCardTheme("exposition")}
              className={`px-2.5 py-1.5 rounded text-xs font-mono border transition ${
                cardTheme === "exposition" ? "bg-[#4D8FD8] text-white border-[#4D8FD8] font-bold" : "bg-[#0B0D10] text-slate-300 border-[#2A323C]"
              }`}
            >
              Exposição
            </button>
            <button
              onClick={() => setCardTheme("minimal")}
              className={`px-2.5 py-1.5 rounded text-xs font-mono border transition ${
                cardTheme === "minimal" ? "bg-slate-200 text-black border-white font-bold" : "bg-[#0B0D10] text-slate-300 border-[#2A323C]"
              }`}
            >
              Minimalista
            </button>
          </div>
        </div>

        {/* Orientation */}
        <div>
          <label className="block font-mono text-[10px] text-[#C8A45D] uppercase font-bold mb-1.5">
            3. Orientação
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => setOrientation("horizontal")}
              className={`flex-1 py-2 rounded text-xs font-mono border transition ${
                orientation === "horizontal" ? "bg-[#2FB879] text-black border-[#2FB879] font-bold" : "bg-[#0B0D10] text-slate-300 border-[#2A323C]"
              }`}
            >
              Horizontal (16:9)
            </button>
            <button
              onClick={() => setOrientation("vertical")}
              className={`flex-1 py-2 rounded text-xs font-mono border transition ${
                orientation === "vertical" ? "bg-[#2FB879] text-black border-[#2FB879] font-bold" : "bg-[#0B0D10] text-slate-300 border-[#2A323C]"
              }`}
            >
              Vertical (Story/Post)
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {downloadSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-[#2FB879]/20 border border-[#2FB879] text-[#2FB879] flex items-center justify-between text-xs font-mono font-bold animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5" />
            <span>Card de Linhagem de {selectedDog.useName} gerado com sucesso! Arquivo HD exportado em alta resolução.</span>
          </div>
        </div>
      )}

      {/* Live Card Preview Stage */}
      <div className="w-full flex justify-center bg-[#0B0D10] p-4 sm:p-8 rounded-xl border border-[#2A323C] overflow-hidden">
        <div
          className={`w-full max-w-4xl p-6 sm:p-8 rounded-2xl shadow-2xl relative transition-all duration-500 ${getThemeClasses()} ${
            orientation === "vertical" ? "max-w-md aspect-[9/16] flex flex-col justify-between" : "min-h-[420px]"
          }`}
        >
          {/* Subtle Watermark Branding */}
          <div className="absolute bottom-4 right-4 opacity-10 pointer-events-none text-right font-serif text-3xl font-black">
            KENNEL LEGACY
          </div>

          {/* Header section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/20 pb-4 mb-6 gap-4">
            <div className="flex items-center space-x-4">
              <img
                src={selectedDog.mainImage}
                alt={selectedDog.registeredName}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl object-cover border-2 border-[#C8A45D] shadow-lg"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-mono text-[10px] text-[#C8A45D] uppercase tracking-widest block font-bold">
                  PEDIGREE OFICIAL // {selectedDog.breed}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-black text-white leading-tight">
                  {selectedDog.registeredName}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] font-mono text-slate-300">
                  <span>Reg: <strong className="text-white">{selectedDog.registrationNumber}</strong></span>
                  <span>•</span>
                  <span>Microchip: <strong className="text-white">{selectedDog.microchip}</strong></span>
                </div>
              </div>
            </div>

            {/* Founder Seal */}
            <div className="shrink-0">
              <FounderSealBadge variant="compact" />
            </div>
          </div>

          {/* Lineage Tree Grid (5 Generations Summary) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 bg-black/40 p-4 rounded-xl border border-white/10">
            {/* Father Side */}
            <div className="space-y-2 text-left border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 md:pr-4">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#4D8FD8] font-bold uppercase">
                <span>PAI & LINHA PATERNA</span>
                <span>GEN 1 → 5</span>
              </div>
              <div className="font-serif text-sm font-bold text-white">
                {tree.gen1.father.name}
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Reg: {tree.gen1.father.registration} • {tree.gen1.father.titles}
              </p>
              
              <div className="text-[10px] text-slate-300 space-y-0.5 pt-2 border-t border-white/5 font-sans">
                <div><strong className="text-[#C8A45D]">Avós:</strong> {tree.gen2.paternalGrandfather.name} × {tree.gen2.paternalGrandmother.name}</div>
                <div className="text-slate-400 text-[9px] font-mono truncate">
                  Bisavós: Brutus vom Hexenstadl, Hera v. Königshaus, Tyson v. Bärenschlucht
                </div>
              </div>
            </div>

            {/* Mother Side */}
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#E25B5B] font-bold uppercase">
                <span>MÃE & LINHA MATERNA</span>
                <span>GEN 1 → 5</span>
              </div>
              <div className="font-serif text-sm font-bold text-white">
                {tree.gen1.mother.name}
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Reg: {tree.gen1.mother.registration} • {tree.gen1.mother.titles}
              </p>

              <div className="text-[10px] text-slate-300 space-y-0.5 pt-2 border-t border-white/5 font-sans">
                <div><strong className="text-[#C8A45D]">Avós:</strong> {tree.gen2.maternalGrandfather.name} × {tree.gen2.maternalGrandmother.name}</div>
                <div className="text-slate-400 text-[9px] font-mono truncate">
                  Bisavós: Kaiser v. Schwarzberg, Astra d. Vale Negro, Baron d. Monte Verde
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between border-t border-white/20 pt-4 mt-4 font-mono text-[10px] text-slate-300">
            <div className="flex items-center space-x-3">
              <img
                src={selectedDog.qrCodeUrl}
                alt="QR Code"
                className="h-10 w-10 rounded bg-white p-0.5 border border-white/20"
              />
              <div className="text-left">
                <span className="font-bold text-white block">CANIL VALE IMPERIAL</span>
                <span className="text-slate-400 text-[9px]">kennellegacy.com/cao/{selectedDog.id}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="font-bold text-[#C8A45D] uppercase tracking-wider block">
                KENNEL LEGACY PLATFORM
              </span>
              <span className="text-slate-400 text-[9px]">Linhagem Verificada de 5 Gerações</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
