import React, { useRef, useState, useEffect } from "react";
import { Eraser, Check, PenTool } from "lucide-react";

interface SignaturePadProps {
  label: string;
  sublabel?: string;
  signerName: string;
  signerDocument?: string;
  onSave: (signatureDataUrl: string) => void;
  savedSignatureUrl?: string;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({
  label,
  sublabel,
  signerName,
  signerDocument,
  onSave,
  savedSignatureUrl,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(savedSignatureUrl || null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#17202A";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      setSignedUrl(dataUrl);
      onSave(dataUrl);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setSignedUrl(null);
  };

  const handleSimulateQuickSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    clearCanvas();
    ctx.strokeStyle = "#10263F";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(30, 60);
    ctx.bezierCurveTo(70, 20, 110, 90, 150, 40);
    ctx.bezierCurveTo(180, 80, 210, 30, 250, 65);
    ctx.stroke();

    setHasDrawn(true);
    const dataUrl = canvas.toDataURL();
    setSignedUrl(dataUrl);
    onSave(dataUrl);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-gray-900 text-sm flex items-center space-x-1.5">
            <PenTool className="w-4 h-4 text-[#1769AA]" />
            <span>{label}</span>
          </h4>
          {sublabel && <p className="text-xs text-gray-500">{sublabel}</p>}
        </div>

        <div className="text-right">
          <span className="font-medium text-xs text-gray-800 block">{signerName}</span>
          {signerDocument && <span className="text-[11px] text-gray-500 font-mono block">{signerDocument}</span>}
        </div>
      </div>

      {/* Signature Canvas Box */}
      <div className="relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden touch-none group hover:border-[#1769AA]/50 transition-colors">
        <canvas
          ref={canvasRef}
          width={360}
          height={120}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-[120px] cursor-crosshair"
        />

        {/* Baseline guide */}
        <div className="absolute bottom-6 inset-x-6 border-b border-gray-300 pointer-events-none" />
        <span className="absolute bottom-1.5 right-3 text-[10px] text-gray-400 font-mono pointer-events-none">
          Assine sobre a linha
        </span>

        {/* Status Badge */}
        {signedUrl && (
          <div className="absolute top-2 right-2 bg-[#18A66A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-sm">
            <Check className="w-3 h-3" />
            <span>Coletada</span>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={clearCanvas}
          className="flex items-center space-x-1 text-gray-500 hover:text-red-600 font-medium transition-colors"
        >
          <Eraser className="w-3.5 h-3.5" />
          <span>Limpar</span>
        </button>

        <button
          type="button"
          onClick={handleSimulateQuickSignature}
          className="text-[#1769AA] hover:underline text-[11px] font-medium"
        >
          Simular Rubrica Rápida
        </button>
      </div>
    </div>
  );
};
