import React, { useState, useRef, useEffect } from "react";
import { 
  Pencil, Eraser, Circle, Square, Type, Smile, Undo, Redo, RotateCcw, 
  Save, Sparkles, Lock, Unlock, Palette, Sliders, Check
} from "lucide-react";

interface DrawingCanvasProps {
  isPsychologistView?: boolean;
  onSaveSnapshot?: (stateName: string) => void;
  patientCanInteract?: boolean;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  isPsychologistView = true,
  onSaveSnapshot,
  patientCanInteract = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTool, setActiveTool] = useState<"pencil" | "marker" | "eraser" | "text" | "sticker">("pencil");
  const [selectedColor, setSelectedColor] = useState<string>("#7567E8");
  const [brushSize, setBrushSize] = useState<number>(4);
  const [activeTemplate, setActiveTemplate] = useState<"body" | "thermometer" | "safe_space" | "blank">("body");
  const [activePrompt, setActivePrompt] = useState<string>("Onde essa emoção costuma aparecer no seu corpo?");
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [interactionLocked, setInteractionLocked] = useState<boolean>(!patientCanInteract);
  const [stickersOnCanvas, setStickersOnCanvas] = useState<{ id: string; emoji: string; x: number; y: number }[]>([
    { id: "s1", emoji: "❤️", x: 180, y: 130 },
    { id: "s2", emoji: "⚡", x: 190, y: 220 }
  ]);
  const [activeSticker, setActiveSticker] = useState<string>("❤️");
  const [snapshotMsg, setSnapshotMsg] = useState<string | null>(null);

  const colors = [
    "#7567E8", // Roxo principal
    "#5E9FD6", // Azul
    "#64B89A", // Verde
    "#E7A3B4", // Rosa
    "#F2C66D", // Amarelo
    "#D84C72", // Vermelho
    "#2F3142", // Escuro
    "#FFFFFF"  // Branco
  ];

  const prompts = [
    "Onde essa emoção costuma aparecer no seu corpo?",
    "Desenhe como está se sentindo no dia de hoje.",
    "Desenhe um lugar em que você se sente seguro e protegido.",
    "Represente algo que é difícil de explicar com palavras."
  ];

  useEffect(() => {
    redrawTemplate();
  }, [activeTemplate]);

  const redrawTemplate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Template Backgrounds
    if (activeTemplate === "body") {
      ctx.strokeStyle = "#C3C0D8";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      // Head
      ctx.arc(200, 80, 30, 0, Math.PI * 2);
      // Neck
      ctx.moveTo(190, 110); ctx.lineTo(190, 125);
      ctx.moveTo(210, 110); ctx.lineTo(210, 125);
      // Shoulders & Body
      ctx.moveTo(150, 140); ctx.lineTo(250, 140);
      ctx.lineTo(240, 260); ctx.lineTo(160, 260); ctx.closePath();
      // Arms
      ctx.moveTo(150, 140); ctx.lineTo(110, 230);
      ctx.moveTo(250, 140); ctx.lineTo(290, 230);
      // Legs
      ctx.moveTo(175, 260); ctx.lineTo(170, 380);
      ctx.moveTo(225, 260); ctx.lineTo(230, 380);
      ctx.stroke();
    } else if (activeTemplate === "thermometer") {
      ctx.strokeStyle = "#73768B";
      ctx.lineWidth = 3;
      // Thermometer outline
      ctx.beginPath();
      ctx.arc(200, 340, 35, 0, Math.PI * 2);
      ctx.rect(180, 60, 40, 250);
      ctx.stroke();

      // Temperature indicators
      const levels = [
        { label: "100% - Intenso", y: 80, color: "#D84C72" },
        { label: "75% - Forte", y: 140, color: "#F2C66D" },
        { label: "50% - Moderado", y: 200, color: "#5E9FD6" },
        { label: "25% - Leve", y: 260, color: "#64B89A" }
      ];
      ctx.font = "11px sans-serif";
      levels.forEach(lvl => {
        ctx.fillStyle = lvl.color;
        ctx.fillRect(230, lvl.y - 8, 12, 12);
        ctx.fillStyle = "#2F3142";
        ctx.fillText(lvl.label, 250, lvl.y + 2);
      });
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (interactionLocked && !isPsychologistView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (activeTool === "sticker") {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setStickersOnCanvas(prev => [...prev, { id: `st-${Date.now()}`, emoji: activeSticker, x, y }]);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || (interactionLocked && !isPsychologistView)) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === "eraser") {
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = brushSize * 4;
    } else if (activeTool === "marker") {
      ctx.strokeStyle = selectedColor + "88"; // Semi-transparent
      ctx.lineWidth = brushSize * 2.5;
    } else {
      ctx.strokeStyle = selectedColor;
      ctx.lineWidth = brushSize;
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const saveCanvasState = () => {
    setSnapshotMsg("Desenho e observações salvas na sessão.");
    if (onSaveSnapshot) onSaveSnapshot("Etapa_Desenho");
    setTimeout(() => setSnapshotMsg(null), 3000);
  };

  return (
    <div className="w-full flex flex-col gap-4 font-sans text-[#2F3142]">
      {/* Prompt Banner */}
      <div className="bg-white border border-[#E7E5F0] rounded-xl p-3.5 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#E7A3B4]/20 text-[#D84C72] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#D84C72] uppercase tracking-wider block">Direcionamento Clínico</span>
            <select
              value={activePrompt}
              onChange={(e) => setActivePrompt(e.target.value)}
              disabled={!isPsychologistView}
              className="font-semibold text-sm text-[#2F3142] bg-transparent focus:outline-none cursor-pointer"
            >
              {prompts.map((p, idx) => (
                <option key={idx} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {isPsychologistView && (
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setInteractionLocked(!interactionLocked)}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
                interactionLocked 
                  ? "bg-[#E7A3B4]/20 text-[#D84C72] border border-[#E7A3B4]" 
                  : "bg-[#64B89A]/15 text-[#308164] border border-[#64B89A]/40"
              }`}
            >
              {interactionLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
              {interactionLocked ? "Ferramentas Bloqueadas" : "Paciente Liberado"}
            </button>

            <button
              onClick={saveCanvasState}
              className="px-3 py-1.5 bg-[#7567E8] hover:bg-[#6253D6] text-white rounded-lg font-medium flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              Salvar Registro
            </button>
          </div>
        )}
      </div>

      {snapshotMsg && (
        <div className="bg-[#64B89A]/15 text-[#2A755A] border border-[#64B89A]/30 px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-[#64B89A]" />
          <span>{snapshotMsg}</span>
        </div>
      )}

      {/* Main Drawing Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Drawing Tools Sidebar */}
        <div className="lg:col-span-4 bg-white border border-[#E7E5F0] rounded-xl p-4 flex flex-col gap-4 shadow-sm">
          {/* Templates */}
          <div>
            <span className="text-[11px] font-bold text-[#73768B] uppercase block mb-1.5">Moldura / Guia Visual</span>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {[
                { id: "body", label: "Silhueta Corporal" },
                { id: "thermometer", label: "Termômetro" },
                { id: "safe_space", label: "Abrigo Seguro" },
                { id: "blank", label: "Folha em Branco" }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTemplate(t.id as any)}
                  className={`px-2.5 py-2 rounded-lg border font-medium text-left transition-colors ${
                    activeTemplate === t.id
                      ? "border-[#7567E8] bg-[#7567E8]/10 text-[#7567E8] font-bold"
                      : "border-[#E7E5F0] text-[#73768B] hover:bg-[#F7F6FB]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <span className="text-[11px] font-bold text-[#73768B] uppercase block mb-1.5">Ferramenta</span>
            <div className="grid grid-cols-4 gap-2 text-xs">
              {[
                { id: "pencil", icon: Pencil, label: "Lápis" },
                { id: "marker", icon: Palette, label: "Marcador" },
                { id: "eraser", icon: Eraser, label: "Borracha" },
                { id: "sticker", icon: Smile, label: "Adesivo" }
              ].map(tool => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id as any)}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-colors ${
                      activeTool === tool.id
                        ? "border-[#7567E8] bg-[#7567E8] text-white"
                        : "border-[#E7E5F0] text-[#73768B] hover:bg-[#F7F6FB]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px]">{tool.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <span className="text-[11px] font-bold text-[#73768B] uppercase block mb-1.5">Cor da Tinta</span>
            <div className="flex items-center gap-2 flex-wrap">
              {colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-7 h-7 rounded-full border-2 transition-transform ${
                    selectedColor === c ? "scale-110 border-[#7567E8] shadow-md" : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Stroke Width Slider */}
          <div>
            <div className="flex justify-between text-xs text-[#73768B] mb-1">
              <span className="font-bold uppercase text-[11px]">Espessura do Traço</span>
              <span>{brushSize}px</span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="20" 
              value={brushSize} 
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-full accent-[#7567E8] cursor-pointer"
            />
          </div>

          {/* Stickers selection if activeTool === "sticker" */}
          {activeTool === "sticker" && (
            <div className="bg-[#F7F6FB] p-2.5 rounded-xl border border-[#E7E5F0]">
              <span className="text-[11px] font-semibold text-[#73768B] block mb-1.5">Escolha o Adesivo e clique no desenho</span>
              <div className="flex gap-2 text-xl">
                {["❤️", "⭐", "🌧️", "⚡", "🛡️", "😊", "😟"].map((emoji, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSticker(emoji)}
                    className={`p-1.5 rounded-lg border transition-transform ${
                      activeSticker === emoji ? "bg-white border-[#7567E8] scale-110 shadow-xs" : "border-transparent"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={redrawTemplate}
            className="mt-2 w-full py-2 bg-[#F7F6FB] hover:bg-[#E7E5F0] text-[#73768B] hover:text-[#2F3142] rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Limpar Canvas
          </button>
        </div>

        {/* Right Canvas Screen */}
        <div className="lg:col-span-8 bg-white border border-[#E7E5F0] rounded-xl p-4 shadow-sm flex flex-col items-center justify-center relative min-h-[460px]">
          <div className="relative w-full max-w-[420px] h-[420px] border border-[#E7E5F0] rounded-xl bg-white shadow-inner overflow-hidden">
            <canvas
              ref={canvasRef}
              width={420}
              height={420}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="w-full h-full cursor-crosshair touch-none"
            />

            {/* Sticker overlays */}
            {stickersOnCanvas.map((st) => (
              <span
                key={st.id}
                style={{ left: `${st.x}px`, top: `${st.y}px` }}
                className="absolute text-2xl pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
              >
                {st.emoji}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
