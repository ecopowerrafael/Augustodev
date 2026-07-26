import React, { useState } from "react";
import {
  QrCode,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  User,
  ShieldCheck,
  Calendar,
  Clock,
  Sparkles,
  Camera
} from "lucide-react";

export const AccessTeamScanner: React.FC = () => {
  const [inputCode, setInputCode] = useState("ING-8X42-2026");
  const [scanResult, setScanResult] = useState<{
    code: string;
    status: "valid" | "used" | "cancelled" | "not_found";
    participantName: string;
    participantCpf: string;
    eventTitle: string;
    tierName: string;
    usedAtTime?: string;
  } | null>({
    code: "ING-8X42-2026",
    status: "valid",
    participantName: "Marcelo Oliveira",
    participantCpf: "123.456.789-00",
    eventTitle: "Sunset Experience 2026",
    tierName: "Pista — Lote 2"
  });

  const [entryConfirmed, setEntryConfirmed] = useState(false);

  const handleSearchCode = (codeToSearch: string) => {
    setEntryConfirmed(false);
    if (codeToSearch === "ING-8X42-2026") {
      setScanResult({
        code: "ING-8X42-2026",
        status: "valid",
        participantName: "Marcelo Oliveira",
        participantCpf: "123.456.789-00",
        eventTitle: "Sunset Experience 2026",
        tierName: "Pista — Lote 2"
      });
    } else if (codeToSearch === "ING-8X43-2026") {
      setScanResult({
        code: "ING-8X43-2026",
        status: "used",
        participantName: "Ana Paula Oliveira",
        participantCpf: "987.654.321-00",
        eventTitle: "Sunset Experience 2026",
        tierName: "Pista — Lote 2",
        usedAtTime: "16h40"
      });
    } else if (codeToSearch === "ING-7711-2026") {
      setScanResult({
        code: "ING-7711-2026",
        status: "cancelled",
        participantName: "Ana Carolina",
        participantCpf: "456.789.123-44",
        eventTitle: "Sunset Experience 2026",
        tierName: "Pista — Lote 2"
      });
    } else {
      setScanResult({
        code: codeToSearch,
        status: "not_found",
        participantName: "Não identificado",
        participantCpf: "N/A",
        eventTitle: "Desconhecido",
        tierName: "N/A"
      });
    }
  };

  return (
    <div className="bg-[#12101B] text-white min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto font-sans space-y-6">
      {/* Portaria Header Banner */}
      <div className="bg-[#25164F] border border-[#6D3DF5]/40 rounded-3xl p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-[#6D3DF5] rounded-2xl text-white shadow-lg shadow-[#6D3DF5]/30">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-[#F0448B] font-black uppercase tracking-wider block">
              PORTARIA & EQUIPE DE ACESSO
            </span>
            <h1 className="text-xl font-black text-white">Validação de Ingressos em Tempo Real</h1>
          </div>
        </div>

        <div className="px-3 py-1.5 bg-[#1FA971]/20 border border-[#1FA971]/40 rounded-full text-xs font-bold text-[#1FA971] flex items-center space-x-1">
          <ShieldCheck className="w-4 h-4" />
          <span>LEITOR ONLINE • SUNSET EXPERIENCE 2026</span>
        </div>
      </div>

      {/* Camera Scanner Box Simulation */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4 text-center">
        <div className="relative w-full max-w-sm h-52 mx-auto bg-black rounded-2xl border-2 border-dashed border-[#6D3DF5] flex flex-col items-center justify-center p-4 overflow-hidden group">
          <Camera className="w-10 h-10 text-[#6D3DF5] animate-pulse mb-2" />
          <span className="text-xs font-bold text-white">Mira da Câmera do Leitor</span>
          <span className="text-[10px] text-gray-400">Posicione o QR Code do cliente no centro</span>

          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#F0448B] to-transparent animate-ping" />
        </div>

        {/* Manual Input Search & Quick Test Case Shortcuts */}
        <div className="space-y-3 max-w-lg mx-auto">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Digite o código (ex: ING-8X42-2026)..."
              className="flex-1 p-3 bg-black/50 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-[#6D3DF5]"
            />
            <button
              onClick={() => handleSearchCode(inputCode)}
              className="px-5 py-3 bg-[#6D3DF5] hover:bg-[#6D3DF5]/90 text-white font-bold text-xs rounded-xl transition-colors flex items-center space-x-1"
            >
              <Search className="w-4 h-4" />
              <span>Validar</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px]">
            <span className="text-gray-400 font-bold mr-1">Atalhos de teste:</span>
            <button
              onClick={() => {
                setInputCode("ING-8X42-2026");
                handleSearchCode("ING-8X42-2026");
              }}
              className="px-2.5 py-1 bg-[#1FA971]/20 text-[#1FA971] border border-[#1FA971]/40 rounded-lg font-bold hover:bg-[#1FA971]/30"
            >
              ✓ Ingresso Válido
            </button>
            <button
              onClick={() => {
                setInputCode("ING-8X43-2026");
                handleSearchCode("ING-8X43-2026");
              }}
              className="px-2.5 py-1 bg-gray-800 text-gray-300 border border-gray-600 rounded-lg font-bold hover:bg-gray-700"
            >
              ⚠ Já Utilizado
            </button>
            <button
              onClick={() => {
                setInputCode("ING-7711-2026");
                handleSearchCode("ING-7711-2026");
              }}
              className="px-2.5 py-1 bg-[#D94C4C]/20 text-[#D94C4C] border border-[#D94C4C]/40 rounded-lg font-bold hover:bg-[#D94C4C]/30"
            >
              ✕ Cancelado
            </button>
          </div>
        </div>
      </div>

      {/* SCAN RESULT DISPLAY */}
      {scanResult && (
        <div
          className={`p-6 border rounded-3xl space-y-4 shadow-2xl transition-all ${
            scanResult.status === "valid"
              ? "bg-[#1FA971]/10 border-[#1FA971]"
              : scanResult.status === "used"
              ? "bg-gray-800/80 border-gray-600"
              : "bg-[#D94C4C]/10 border-[#D94C4C]"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="font-mono text-sm font-black text-white">{scanResult.code}</span>

            {scanResult.status === "valid" && (
              <span className="px-3 py-1 bg-[#1FA971] text-white font-black text-xs rounded-full flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>INGRESSO VÁLIDO</span>
              </span>
            )}

            {scanResult.status === "used" && (
              <span className="px-3 py-1 bg-gray-700 text-yellow-300 font-black text-xs rounded-full flex items-center space-x-1">
                <AlertTriangle className="w-4 h-4" />
                <span>ENTRADA JÁ REGISTRADA</span>
              </span>
            )}

            {scanResult.status === "cancelled" && (
              <span className="px-3 py-1 bg-[#D94C4C] text-white font-black text-xs rounded-full flex items-center space-x-1">
                <XCircle className="w-4 h-4" />
                <span>INGRESSO CANCELADO</span>
              </span>
            )}

            {scanResult.status === "not_found" && (
              <span className="px-3 py-1 bg-[#D94C4C] text-white font-black text-xs rounded-full flex items-center space-x-1">
                <XCircle className="w-4 h-4" />
                <span>NÃO ENCONTRADO</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Participante</span>
              <span className="text-base font-black text-white">{scanResult.participantName}</span>
              <span className="text-gray-400 block font-mono">CPF: {scanResult.participantCpf}</span>
            </div>

            <div className="space-y-1">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Evento & Setor</span>
              <span className="text-sm font-bold text-white block">{scanResult.eventTitle}</span>
              <span className="text-[#F2B84B] font-bold block">{scanResult.tierName}</span>
            </div>
          </div>

          {/* Action or Confirmation message */}
          {scanResult.status === "valid" && (
            <div className="pt-2">
              {entryConfirmed ? (
                <div className="p-4 bg-[#1FA971] text-white rounded-2xl font-black text-sm text-center shadow-lg animate-pulse flex items-center justify-center space-x-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>ENTRADA REGISTRADA COM SUCESSO ÀS 17H12!</span>
                </div>
              ) : (
                <button
                  onClick={() => setEntryConfirmed(true)}
                  className="w-full py-4 bg-[#1FA971] hover:bg-[#1FA971]/90 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Confirmar Entrada do Cliente</span>
                </button>
              )}
            </div>
          )}

          {scanResult.status === "used" && (
            <p className="text-xs text-yellow-300 font-bold text-center pt-2">
              Aviso: Este QR Code já foi utilizado para entrada às {scanResult.usedAtTime || "16h40"}.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
