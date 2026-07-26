import React, { useState } from "react";
import { GitBranch, Eye, Info, ChevronRight, Shield, Award, Sparkles, Filter, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { PEDIGREE_TREE_THOR } from "../../data/kennelLegacyData";

interface PedigreeTreeViewerProps {
  dogName?: string;
  onSelectAncestor?: (ancestorName: string) => void;
}

export default function PedigreeTreeViewer({ dogName = "Thor do Vale Imperial", onSelectAncestor }: PedigreeTreeViewerProps) {
  const [highlightLine, setHighlightLine] = useState<"all" | "paternal" | "maternal">("all");
  const [showGen4And5, setShowGen4And5] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedAncestor, setSelectedAncestor] = useState<any>(null);

  const tree = PEDIGREE_TREE_THOR;

  return (
    <div className="w-full bg-[#12161B] rounded-xl border border-[#2A323C] p-4 sm:p-6 text-left shadow-2xl relative overflow-hidden">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#C8A45D_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />

      {/* Header Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#2A323C] pb-4 mb-6 z-10 relative">
        <div>
          <div className="flex items-center space-x-2">
            <GitBranch className="h-5 w-5 text-[#C8A45D]" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
              Árvore Genealógica (Até 5 Gerações)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Linhagem completa registrada de <span className="text-[#E2C77D] font-semibold">{dogName}</span>
          </p>
        </div>

        {/* Action toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Highlight toggle */}
          <div className="flex bg-[#171C22] p-1 rounded-lg border border-[#2A323C] text-xs font-mono">
            <button
              onClick={() => setHighlightLine("all")}
              className={`px-2.5 py-1 rounded transition ${highlightLine === "all" ? "bg-[#C8A45D] text-black font-bold" : "text-slate-400 hover:text-white"}`}
            >
              Todas
            </button>
            <button
              onClick={() => setHighlightLine("paternal")}
              className={`px-2.5 py-1 rounded transition ${highlightLine === "paternal" ? "bg-[#4D8FD8] text-white font-bold" : "text-slate-400 hover:text-white"}`}
            >
              Linha Paterna
            </button>
            <button
              onClick={() => setHighlightLine("maternal")}
              className={`px-2.5 py-1 rounded transition ${highlightLine === "maternal" ? "bg-[#E25B5B] text-white font-bold" : "text-slate-400 hover:text-white"}`}
            >
              Linha Materna
            </button>
          </div>

          {/* Toggle Gen 4 and 5 */}
          <button
            onClick={() => setShowGen4And5(!showGen4And5)}
            className="px-3 py-1.5 rounded-lg bg-[#171C22] border border-[#2A323C] hover:border-[#C8A45D]/50 text-xs font-mono text-slate-300 hover:text-white transition flex items-center space-x-1.5"
          >
            <Eye className="h-3.5 w-3.5 text-[#C8A45D]" />
            <span>{showGen4And5 ? "Ocultar 4ª e 5ª Gen" : "Mostrar 5 Gerações"}</span>
          </button>

          {/* Zoom controls */}
          <div className="flex bg-[#171C22] p-1 rounded-lg border border-[#2A323C] text-xs font-mono text-slate-400">
            <button 
              onClick={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.1))} 
              className="px-2 py-0.5 hover:text-white" 
              title="Diminuir Zoom"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="px-2 py-0.5 text-[#C8A45D] font-bold">{Math.round(zoomLevel * 100)}%</span>
            <button 
              onClick={() => setZoomLevel(Math.min(1.2, zoomLevel + 0.1))} 
              className="px-2 py-0.5 hover:text-white" 
              title="Aumentar Zoom"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Pedigree Container */}
      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <div 
          className="min-w-[850px] transition-transform origin-top-left py-2 space-y-8"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Target Central Dog */}
          <div className="flex justify-center">
            <div className="relative p-4 rounded-xl bg-gradient-to-r from-[#171C22] via-[#212933] to-[#171C22] border-2 border-[#C8A45D] shadow-[0_0_20px_rgba(200,164,93,0.2)] flex items-center space-x-4 max-w-md w-full">
              <img
                src={tree.dog.image}
                alt={tree.dog.name}
                className="h-16 w-16 rounded-lg object-cover border border-[#C8A45D]"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono text-[#C8A45D] font-bold uppercase tracking-widest block">
                  CÃO PRINCIPAL / PROGÊNITO
                </span>
                <h4 className="font-serif text-base font-bold text-white truncate">
                  {tree.dog.name}
                </h4>
                <p className="text-xs text-slate-300 font-mono">
                  Reg: {tree.dog.registration}
                </p>
                <div className="mt-1 inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-[#C8A45D]/20 text-[#E2C77D] text-[10px] font-mono">
                  <Award className="h-3 w-3" />
                  <span>{tree.dog.titles}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lines connector */}
          <div className="flex justify-center">
            <div className="w-1/2 h-4 border-t-2 border-x-2 border-[#C8A45D]/60 rounded-t-lg" />
          </div>

          {/* GENERATION 1: Father & Mother */}
          <div className="grid grid-cols-2 gap-6">
            {/* Father */}
            <div 
              className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                highlightLine === "maternal" ? "opacity-30" : "opacity-100"
              } bg-[#171C22] border-[#4D8FD8]/60 hover:border-[#4D8FD8] shadow-lg`}
              onClick={() => setSelectedAncestor(tree.gen1.father)}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={tree.gen1.father.image}
                  alt={tree.gen1.father.name}
                  className="h-12 w-12 rounded-lg object-cover border border-[#4D8FD8]"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-[#4D8FD8] uppercase font-bold">PAI (1ª GER)</span>
                    <span className="text-[9px] bg-[#4D8FD8]/20 text-[#4D8FD8] px-1.5 py-0.5 rounded font-mono font-bold">MACHO</span>
                  </div>
                  <h5 className="font-serif text-sm font-bold text-white truncate">
                    {tree.gen1.father.name}
                  </h5>
                  <p className="text-[11px] text-slate-400 font-mono">Reg: {tree.gen1.father.registration}</p>
                </div>
              </div>
            </div>

            {/* Mother */}
            <div 
              className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                highlightLine === "paternal" ? "opacity-30" : "opacity-100"
              } bg-[#171C22] border-[#E25B5B]/60 hover:border-[#E25B5B] shadow-lg`}
              onClick={() => setSelectedAncestor(tree.gen1.mother)}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={tree.gen1.mother.image}
                  alt={tree.gen1.mother.name}
                  className="h-12 w-12 rounded-lg object-cover border border-[#E25B5B]"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-[#E25B5B] uppercase font-bold">MÃE (1ª GER)</span>
                    <span className="text-[9px] bg-[#E25B5B]/20 text-[#E25B5B] px-1.5 py-0.5 rounded font-mono font-bold">FÊMEA</span>
                  </div>
                  <h5 className="font-serif text-sm font-bold text-white truncate">
                    {tree.gen1.mother.name}
                  </h5>
                  <p className="text-[11px] text-slate-400 font-mono">Reg: {tree.gen1.mother.registration}</p>
                </div>
              </div>
            </div>
          </div>

          {/* GENERATION 2: 4 Grandparents */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider block text-center">
              2ª GERAÇÃO — AVÓS
            </span>
            <div className="grid grid-cols-4 gap-3">
              {/* Paternal Grandfather */}
              <div 
                onClick={() => setSelectedAncestor(tree.gen2.paternalGrandfather)}
                className={`p-2.5 rounded-lg bg-[#171C22] border border-[#2A323C] hover:border-[#4D8FD8] transition cursor-pointer text-left ${
                  highlightLine === "maternal" ? "opacity-30" : "opacity-100"
                }`}
              >
                <span className="text-[8px] font-mono text-[#4D8FD8] block font-bold">AVÔ PATERNO</span>
                <p className="font-serif text-xs font-bold text-white truncate">{tree.gen2.paternalGrandfather.name}</p>
                <span className="text-[9px] text-slate-400 font-mono block">{tree.gen2.paternalGrandfather.registration}</span>
              </div>

              {/* Paternal Grandmother */}
              <div 
                onClick={() => setSelectedAncestor(tree.gen2.paternalGrandmother)}
                className={`p-2.5 rounded-lg bg-[#171C22] border border-[#2A323C] hover:border-[#4D8FD8] transition cursor-pointer text-left ${
                  highlightLine === "maternal" ? "opacity-30" : "opacity-100"
                }`}
              >
                <span className="text-[8px] font-mono text-[#4D8FD8] block font-bold">AVÓ PATERNA</span>
                <p className="font-serif text-xs font-bold text-white truncate">{tree.gen2.paternalGrandmother.name}</p>
                <span className="text-[9px] text-slate-400 font-mono block">{tree.gen2.paternalGrandmother.registration}</span>
              </div>

              {/* Maternal Grandfather */}
              <div 
                onClick={() => setSelectedAncestor(tree.gen2.maternalGrandfather)}
                className={`p-2.5 rounded-lg bg-[#171C22] border border-[#2A323C] hover:border-[#E25B5B] transition cursor-pointer text-left ${
                  highlightLine === "paternal" ? "opacity-30" : "opacity-100"
                }`}
              >
                <span className="text-[8px] font-mono text-[#E25B5B] block font-bold">AVÔ MATERNO</span>
                <p className="font-serif text-xs font-bold text-white truncate">{tree.gen2.maternalGrandfather.name}</p>
                <span className="text-[9px] text-slate-400 font-mono block">{tree.gen2.maternalGrandfather.registration}</span>
              </div>

              {/* Maternal Grandmother */}
              <div 
                onClick={() => setSelectedAncestor(tree.gen2.maternalGrandmother)}
                className={`p-2.5 rounded-lg bg-[#171C22] border border-[#2A323C] hover:border-[#E25B5B] transition cursor-pointer text-left ${
                  highlightLine === "paternal" ? "opacity-30" : "opacity-100"
                }`}
              >
                <span className="text-[8px] font-mono text-[#E25B5B] block font-bold">AVÓ MATERNA</span>
                <p className="font-serif text-xs font-bold text-white truncate">{tree.gen2.maternalGrandmother.name}</p>
                <span className="text-[9px] text-slate-400 font-mono block">{tree.gen2.maternalGrandmother.registration}</span>
              </div>
            </div>
          </div>

          {/* GENERATION 3: 8 Bisavós */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider block text-center">
              3ª GERAÇÃO — BISAVÓS (8 ANCESTRAIS)
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {tree.gen3.map((bis, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedAncestor({ name: bis.name, registration: bis.reg })}
                  className="p-2 rounded bg-[#171C22] border border-[#2A323C] hover:border-[#C8A45D] transition cursor-pointer text-left"
                >
                  <span className="text-[7px] font-mono text-[#C8A45D] block uppercase font-bold">BIS-ANCESTRAL #{idx + 1}</span>
                  <p className="font-serif text-[11px] font-bold text-white truncate">{bis.name}</p>
                  <span className="text-[8px] text-slate-400 font-mono block truncate">{bis.reg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GENERATION 4 & 5 (Expandable) */}
          {showGen4And5 && (
            <div className="space-y-6 pt-4 border-t border-[#2A323C]">
              {/* Generation 4 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#E2C77D] uppercase font-bold tracking-wider">
                    4ª GERAÇÃO — TRISAVÓS (16 ANCESTRAIS)
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">TODOS REGISTRADOS FCI/CBKC/ADRK</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                  {tree.gen4.map((anc, idx) => (
                    <div 
                      key={idx}
                      className="p-1.5 rounded bg-[#171C22]/80 border border-[#2A323C] text-[9px] font-serif text-slate-300 truncate hover:text-white hover:border-[#C8A45D]/40"
                      title={anc}
                    >
                      <span className="text-[7px] text-[#C8A45D] block font-mono">T-{idx + 1}</span>
                      {anc}
                    </div>
                  ))}
                </div>
              </div>

              {/* Generation 5 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#C8A45D] uppercase font-bold tracking-wider">
                    5ª GERAÇÃO — TETRASAVÓS (32 ANCESTRAIS COMPACTOS)
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">LINHAGEM CONSAGRADA DA RAÇA</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-16 gap-1">
                  {tree.gen5.map((anc, idx) => (
                    <div 
                      key={idx}
                      className="p-1 rounded bg-[#0B0D10] border border-[#2A323C]/60 text-[8px] font-sans text-slate-400 truncate hover:text-slate-200"
                      title={anc}
                    >
                      {anc}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected Ancestor Modal */}
      {selectedAncestor && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#171C22] border border-[#C8A45D]/50 rounded-xl p-6 max-w-md w-full space-y-4 text-left shadow-2xl relative">
            <button 
              onClick={() => setSelectedAncestor(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold"
            >
              ×
            </button>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-[#C8A45D]/20 border border-[#C8A45D] flex items-center justify-center text-[#E2C77D]">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[9px] font-mono text-[#C8A45D] font-bold uppercase tracking-widest block">
                  DETALHES DO ANCESTRAL
                </span>
                <h4 className="font-serif text-lg font-bold text-white">{selectedAncestor.name}</h4>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300 bg-[#0B0D10] p-3 rounded-lg border border-[#2A323C]">
              <div><span className="text-slate-500">Registro:</span> {selectedAncestor.registration || "ADRK/CBKC Verificado"}</div>
              <div><span className="text-slate-500">Títulos:</span> {selectedAncestor.titles || "Ancestral Certificado de Linhagem"}</div>
              <div><span className="text-slate-500">Origem:</span> {selectedAncestor.country || "Internacional / Brasil"}</div>
              <div><span className="text-slate-500">Status:</span> <span className="text-[#2FB879]">Confirmado no Pedigree Oficial</span></div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedAncestor(null)}
                className="px-4 py-2 bg-[#C8A45D] hover:bg-[#E2C77D] text-black font-bold text-xs rounded font-mono uppercase"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
