import React, { useState } from "react";
import { 
  Plus, Trash2, RotateCw, ZoomIn, ZoomOut, Copy, RefreshCw, 
  Lock, Unlock, Eye, Sparkles, Image, Check, Layers, ArrowUp, ArrowDown, HelpCircle, Save
} from "lucide-react";
import { SCENARIO_OBJECTS } from "./mockData";
import { CanvasObjectInstance, ScenarioObject } from "./types";

interface SandTrayCanvasProps {
  isPsychologistView?: boolean;
  onSaveSnapshot?: (stateName: string) => void;
  onAddNote?: (noteText: string) => void;
  patientCanInteract?: boolean;
}

export const SandTrayCanvas: React.FC<SandTrayCanvasProps> = ({
  isPsychologistView = true,
  onSaveSnapshot,
  onAddNote,
  patientCanInteract = true
}) => {
  const [selectedBg, setSelectedBg] = useState<string>("sand");
  const [activeCategory, setActiveCategory] = useState<string>("pessoas");
  const [canvasObjects, setCanvasObjects] = useState<CanvasObjectInstance[]>([
    { instanceId: "i-1", objectId: "c1", name: "Casa Acolhedora", icon: "🏠", x: 220, y: 150, scale: 1.3, rotation: 0 },
    { instanceId: "i-2", objectId: "n1", name: "Árvore Frondosa", icon: "🌳", x: 80, y: 120, scale: 1.2, rotation: 0 },
    { instanceId: "i-3", objectId: "n1", name: "Árvore Frondosa", icon: "🌳", x: 420, y: 110, scale: 1.1, rotation: 0 },
    { instanceId: "i-4", objectId: "p1", name: "Menino", icon: "👦", x: 280, y: 260, scale: 1.0, rotation: 0 },
    { instanceId: "i-5", objectId: "p4", name: "Adulta Mulher", icon: "👩", x: 200, y: 260, scale: 1.0, rotation: 0 },
    { instanceId: "i-6", objectId: "a1", name: "Cachorro Amigo", icon: "🐕", x: 340, y: 290, scale: 0.9, rotation: 0 },
    { instanceId: "i-7", objectId: "c5", name: "Ponte de Ligação", icon: "🌉", x: 250, y: 380, scale: 1.2, rotation: 0 },
    { instanceId: "i-8", objectId: "n4", name: "Nuvem de Chuva", icon: "🌧️", x: 100, y: 40, scale: 1.0, rotation: 0 },
    { instanceId: "i-9", objectId: "n3", name: "Sol Radiante", icon: "☀️", x: 460, y: 40, scale: 1.1, rotation: 0 }
  ]);
  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>("i-4");
  const [interactionLocked, setInteractionLocked] = useState<boolean>(!patientCanInteract);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [promptMessage, setPromptMessage] = useState<string>("Onde você se colocaria neste cenário?");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [snapshotMessage, setSnapshotMessage] = useState<string | null>(null);

  const backgroundStyles: Record<string, { bg: string; label: string; border: string }> = {
    sand: { bg: "bg-[#F3E8D3]", label: "Bandeja de Areia", border: "border-[#D8C7A5]" },
    forest: { bg: "bg-[#E2EFE0]", label: "Floresta Verde", border: "border-[#BCD5B8]" },
    house: { bg: "bg-[#FAF0E6]", label: "Interior de Casa", border: "border-[#E5D2C1]" },
    school: { bg: "bg-[#EBF3FA]", label: "Escola / Sala", border: "border-[#C1D9EE]" },
    city: { bg: "bg-[#EEF2F6]", label: "Cidade / Rua", border: "border-[#CBD5E1]" },
    blank: { bg: "bg-[#FFFFFF]", label: "Fundo Branco", border: "border-[#E2E8F0]" }
  };

  const filteredLibrary = SCENARIO_OBJECTS.filter(obj => obj.category === activeCategory);

  const addObjectToCanvas = (obj: ScenarioObject) => {
    if (interactionLocked && !isPsychologistView) return;
    const newInst: CanvasObjectInstance = {
      instanceId: `inst-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      objectId: obj.id,
      name: obj.name,
      icon: obj.icon,
      x: 200 + Math.random() * 80,
      y: 180 + Math.random() * 80,
      scale: 1.0,
      rotation: 0
    };
    setCanvasObjects(prev => [...prev, newInst]);
    setSelectedInstanceId(newInst.instanceId);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, id: string) => {
    if (interactionLocked && !isPsychologistView) return;
    e.stopPropagation();
    setSelectedInstanceId(id);
    setDraggingId(id);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingId) return;
    const canvasRect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - canvasRect.left - dragOffset.x;
    const newY = e.clientY - canvasRect.top - dragOffset.y;

    setCanvasObjects(prev => prev.map(item => {
      if (item.instanceId === draggingId) {
        return {
          ...item,
          x: Math.max(10, Math.min(canvasRect.width - 60, newX)),
          y: Math.max(10, Math.min(canvasRect.height - 60, newY))
        };
      }
      return item;
    }));
  };

  const handlePointerUp = () => {
    setDraggingId(null);
  };

  const updateSelectedObject = (fn: (item: CanvasObjectInstance) => CanvasObjectInstance) => {
    if (!selectedInstanceId) return;
    setCanvasObjects(prev => prev.map(item => item.instanceId === selectedInstanceId ? fn(item) : item));
  };

  const removeSelected = () => {
    if (!selectedInstanceId) return;
    setCanvasObjects(prev => prev.filter(item => item.instanceId !== selectedInstanceId));
    setSelectedInstanceId(null);
  };

  const duplicateSelected = () => {
    const item = canvasObjects.find(i => i.instanceId === selectedInstanceId);
    if (!item) return;
    const duplicated: CanvasObjectInstance = {
      ...item,
      instanceId: `inst-${Date.now()}`,
      x: item.x + 25,
      y: item.y + 25
    };
    setCanvasObjects(prev => [...prev, duplicated]);
    setSelectedInstanceId(duplicated.instanceId);
  };

  const triggerSaveState = () => {
    const name = `Estado_${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    setSnapshotMessage(`Estado "${name}" salvo no histórico da sessão.`);
    if (onSaveSnapshot) onSaveSnapshot(name);
    setTimeout(() => setSnapshotMessage(null), 3500);
  };

  return (
    <div className="w-full flex flex-col gap-4 font-sans text-[#2F3142]">
      {/* Top Banner or Question Prompt */}
      <div className="bg-white border border-[#E7E5F0] rounded-xl p-3.5 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-9 h-9 rounded-lg bg-[#7567E8]/10 text-[#7567E8] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#7567E8] uppercase tracking-wider block">Atividade Simbólica</span>
            <input 
              type="text" 
              value={promptMessage}
              onChange={(e) => setPromptMessage(e.target.value)}
              disabled={!isPsychologistView}
              className="font-semibold text-sm text-[#2F3142] bg-transparent border-b border-transparent hover:border-[#E7E5F0] focus:border-[#7567E8] focus:outline-none w-full md:w-96 transition-colors"
            />
          </div>
        </div>

        {/* Psychologist quick controls */}
        {isPsychologistView && (
          <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap text-xs">
            <button
              onClick={() => setInteractionLocked(!interactionLocked)}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
                interactionLocked 
                  ? "bg-[#E7A3B4]/20 text-[#D84C72] border border-[#E7A3B4]" 
                  : "bg-[#64B89A]/15 text-[#308164] border border-[#64B89A]/40"
              }`}
            >
              {interactionLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
              {interactionLocked ? "Paciente Bloqueado" : "Paciente Livre"}
            </button>

            <button
              onClick={triggerSaveState}
              className="px-3 py-1.5 bg-[#7567E8] hover:bg-[#6253D6] text-white rounded-lg font-medium flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              Salvar Estado
            </button>
          </div>
        )}
      </div>

      {snapshotMessage && (
        <div className="bg-[#64B89A]/15 text-[#2A755A] border border-[#64B89A]/30 px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-[#64B89A]" />
          <span>{snapshotMessage}</span>
        </div>
      )}

      {/* Main Sandbox Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Object Library Panel */}
        <div className="lg:col-span-4 bg-white border border-[#E7E5F0] rounded-xl p-4 flex flex-col gap-3 shadow-sm max-h-[560px] overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-[#E7E5F0]">
            <h3 className="font-bold text-sm text-[#2F3142]">Biblioteca de Objetos</h3>
            <span className="text-[11px] text-[#73768B]">{filteredLibrary.length} itens</span>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: "pessoas", label: "Pessoas" },
              { id: "família", label: "Família" },
              { id: "animais", label: "Animais" },
              { id: "casas", label: "Casas & Muros" },
              { id: "natureza", label: "Natureza" },
              { id: "emoções", label: "Emoções" }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#7567E8] text-white"
                    : "bg-[#F7F6FB] text-[#73768B] hover:bg-[#E7E5F0]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Objects Grid */}
          <div className="grid grid-cols-3 gap-2 overflow-y-auto pr-1 flex-1 min-h-[280px]">
            {filteredLibrary.map(obj => (
              <button
                key={obj.id}
                onClick={() => addObjectToCanvas(obj)}
                disabled={interactionLocked && !isPsychologistView}
                className="bg-[#F7F6FB] hover:bg-[#7567E8]/10 hover:border-[#7567E8] border border-[#E7E5F0] p-2.5 rounded-xl flex flex-col items-center justify-center gap-1 group transition-all transform active:scale-95 text-center"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{obj.icon}</span>
                <span className="text-[10px] font-medium text-[#2F3142] line-clamp-1">{obj.name}</span>
              </button>
            ))}
          </div>

          {/* Background Selector */}
          <div className="pt-2 border-t border-[#E7E5F0] flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-[#73768B]">Cenário de Fundo</span>
            <div className="grid grid-cols-3 gap-1.5 text-[11px]">
              {Object.entries(backgroundStyles).map(([key, style]) => (
                <button
                  key={key}
                  onClick={() => setSelectedBg(key)}
                  className={`px-2 py-1.5 rounded-lg border font-medium text-left truncate transition-colors ${
                    selectedBg === key
                      ? "border-[#7567E8] text-[#7567E8] bg-[#7567E8]/5 font-bold"
                      : "border-[#E7E5F0] text-[#73768B] hover:bg-[#F7F6FB]"
                  }`}
                >
                  {style.label.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Interactive Canvas */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          {/* Canvas Box */}
          <div 
            onPointerMove={handleCanvasPointerMove}
            onPointerUp={handlePointerUp}
            className={`relative w-full h-[460px] rounded-xl border-2 shadow-inner overflow-hidden select-none transition-colors ${backgroundStyles[selectedBg].bg} ${backgroundStyles[selectedBg].border}`}
            onClick={() => setSelectedInstanceId(null)}
          >
            {/* Background texture line guide indicator */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#2F3142_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Objects on Canvas */}
            {canvasObjects.map(item => {
              const isSelected = item.instanceId === selectedInstanceId;
              const isHighlighted = item.instanceId === highlightedId;

              return (
                <div
                  key={item.instanceId}
                  onPointerDown={(e) => handlePointerDown(e, item.instanceId)}
                  style={{
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                    transform: `scale(${item.scale}) rotate(${item.rotation}deg)`,
                    position: "absolute"
                  }}
                  className={`cursor-grab active:cursor-grabbing touch-none p-1.5 rounded-lg transition-shadow flex flex-col items-center justify-center group ${
                    isSelected ? "ring-2 ring-[#7567E8] bg-white/40 shadow-lg" : ""
                  } ${isHighlighted ? "ring-2 ring-[#E7A3B4] animate-pulse bg-[#E7A3B4]/30" : ""}`}
                >
                  <span className="text-4xl pointer-events-none drop-shadow-sm">{item.icon}</span>
                  <span className="text-[9px] font-bold text-[#2F3142] bg-white/80 backdrop-blur-xs px-1 rounded mt-0.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.name}
                  </span>
                </div>
              );
            })}

            {/* Empty Canvas Guidance */}
            {canvasObjects.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-[#73768B] pointer-events-none">
                <span className="text-4xl mb-2">🏝️</span>
                <p className="font-semibold text-sm">O cenário está limpo</p>
                <p className="text-xs max-w-xs mt-1">Clique nos objetos da biblioteca ao lado para posicioná-los na bandeja.</p>
              </div>
            )}
          </div>

          {/* Bottom Object Manipulation Bar */}
          <div className="bg-white border border-[#E7E5F0] rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 shadow-sm text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#73768B] uppercase">Ações do Item:</span>
              <button
                onClick={() => updateSelectedObject(item => ({ ...item, scale: Math.min(2.5, item.scale + 0.15) }))}
                disabled={!selectedInstanceId}
                className="p-1.5 bg-[#F7F6FB] hover:bg-[#E7E5F0] rounded-lg text-[#2F3142] disabled:opacity-40 transition-colors"
                title="Aumentar tamanho"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => updateSelectedObject(item => ({ ...item, scale: Math.max(0.5, item.scale - 0.15) }))}
                disabled={!selectedInstanceId}
                className="p-1.5 bg-[#F7F6FB] hover:bg-[#E7E5F0] rounded-lg text-[#2F3142] disabled:opacity-40 transition-colors"
                title="Diminuir tamanho"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => updateSelectedObject(item => ({ ...item, rotation: (item.rotation + 45) % 360 }))}
                disabled={!selectedInstanceId}
                className="p-1.5 bg-[#F7F6FB] hover:bg-[#E7E5F0] rounded-lg text-[#2F3142] disabled:opacity-40 transition-colors"
                title="Girar"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                onClick={duplicateSelected}
                disabled={!selectedInstanceId}
                className="p-1.5 bg-[#F7F6FB] hover:bg-[#E7E5F0] rounded-lg text-[#2F3142] disabled:opacity-40 transition-colors"
                title="Duplicar"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={removeSelected}
                disabled={!selectedInstanceId}
                className="p-1.5 bg-[#E7A3B4]/20 hover:bg-[#E7A3B4]/40 text-[#D84C72] rounded-lg disabled:opacity-40 transition-colors"
                title="Excluir item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCanvasObjects([])}
                className="px-2.5 py-1.5 text-[#73768B] hover:text-[#2F3142] hover:bg-[#F7F6FB] rounded-lg font-medium transition-colors"
              >
                Limpar Cenário
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
