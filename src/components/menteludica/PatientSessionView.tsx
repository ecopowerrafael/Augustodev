import React, { useState } from "react";
import { 
  Heart, Sparkles, Check, User, ShieldCheck, Wifi, ArrowRight, X, AlertCircle, RefreshCw
} from "lucide-react";
import { SandTrayCanvas } from "./SandTrayCanvas";
import { DrawingCanvas } from "./DrawingCanvas";
import { ReflectiveCardDeck } from "./ReflectiveCardDeck";
import { TherapeuticResource } from "./types";

interface PatientSessionViewProps {
  resource: TherapeuticResource;
  psychologistName?: string;
  sessionCode?: string;
  onExitSession?: () => void;
}

export const PatientSessionView: React.FC<PatientSessionViewProps> = ({
  resource,
  psychologistName = "Dra. Mariana Lopes",
  sessionCode = "482 917",
  onExitSession
}) => {
  const [step, setStep] = useState<"entry" | "waiting" | "active" | "completed">("entry");
  const [patientName, setPatientName] = useState<string>("Lucas");
  const [inputCode, setInputCode] = useState<string>(sessionCode);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(true);
  const [codeError, setCodeError] = useState<boolean>(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;
    if (inputCode.replace(/\s/g, "") !== sessionCode.replace(/\s/g, "")) {
      setCodeError(true);
      return;
    }
    setCodeError(false);
    setStep("waiting");

    // Simulate psychologist starting session after 1.8s
    setTimeout(() => {
      setStep("active");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#F7F6FB] text-[#2F3142] font-sans flex flex-col justify-between selection:bg-[#7567E8]/20">
      {/* Top Simple Header */}
      <header className="bg-white border-b border-[#E7E5F0] py-3.5 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#7567E8] text-white flex items-center justify-center font-black text-sm">
            M
          </div>
          <div>
            <span className="font-extrabold text-sm text-[#2F3142] tracking-tight">MenteLúdica</span>
            <span className="text-[10px] text-[#73768B] block font-medium">Sessão Interativa Convidado</span>
          </div>
        </div>

        {step === "active" && (
          <div className="flex items-center gap-3 text-xs">
            <span className="bg-[#64B89A]/15 text-[#308164] px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#64B89A] animate-ping" />
              Conectado
            </span>
            <button
              onClick={() => setStep("completed")}
              className="text-[#73768B] hover:text-[#D84C72] font-semibold transition-colors"
            >
              Concluir Atividade
            </button>
          </div>
        )}
      </header>

      {/* Main Screen Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 flex flex-col items-center justify-center">
        {/* STEP 1: ENTRY FORM */}
        {step === "entry" && (
          <div className="bg-white border border-[#E7E5F0] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-lg text-center animate-fade-in">
            <div className="w-12 h-12 bg-[#7567E8]/10 text-[#7567E8] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6" />
            </div>

            <h2 className="font-extrabold text-xl text-[#2F3142]">Você foi convidado</h2>
            <p className="text-xs text-[#73768B] mt-1">
              Atividade conduzida por <strong className="text-[#2F3142]">{psychologistName}</strong>
            </p>

            <form onSubmit={handleJoin} className="mt-6 text-left space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2F3142] mb-1">Como prefere ser chamado?</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Ex: Lucas"
                  className="w-full text-sm p-3 border border-[#E7E5F0] rounded-xl focus:outline-none focus:border-[#7567E8] bg-[#F7F6FB]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2F3142] mb-1">Código da Sessão</label>
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="000 000"
                  className="w-full text-sm p-3 border border-[#E7E5F0] rounded-xl focus:outline-none focus:border-[#7567E8] bg-[#F7F6FB] font-mono tracking-widest text-center text-base font-bold"
                />
                {codeError && (
                  <p className="text-[11px] text-[#D84C72] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Código incorreto ou expirado. Tente "482 917".
                  </p>
                )}
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 accent-[#7567E8]"
                />
                <label htmlFor="terms" className="text-[11px] text-[#73768B] leading-tight cursor-pointer">
                  Entendi que esta atividade é interativa e será acompanhada pelo profissional responsável em ambiente seguro.
                </label>
              </div>

              <button
                type="submit"
                disabled={!termsAccepted}
                className="w-full py-3 bg-[#7567E8] hover:bg-[#6253D6] disabled:opacity-50 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                Entrar na Sessão
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-[#E7E5F0] text-[11px] text-[#73768B] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#64B89A]" />
              <span>Não é necessário criar conta ou informar cartão de crédito</span>
            </div>
          </div>
        )}

        {/* STEP 2: WAITING ROOM */}
        {step === "waiting" && (
          <div className="bg-white border border-[#E7E5F0] rounded-2xl p-8 max-w-md w-full shadow-lg text-center animate-fade-in space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#7567E8]/10 text-[#7567E8] flex items-center justify-center mx-auto relative">
              <RefreshCw className="w-8 h-8 animate-spin text-[#7567E8]" />
            </div>

            <div>
              <h3 className="font-extrabold text-lg text-[#2F3142]">Aguardando Início...</h3>
              <p className="text-xs text-[#73768B] mt-1">
                {psychologistName} está preparando a atividade <strong className="text-[#7567E8]">"{resource.title}"</strong>.
              </p>
            </div>

            <div className="bg-[#F7F6FB] p-3 rounded-xl border border-[#E7E5F0] text-xs text-[#73768B]">
              <p className="font-semibold text-[#2F3142]">Sua presença foi confirmada na sala</p>
              <p className="text-[11px] mt-0.5">A atividade irá iniciar na sua tela em instantes.</p>
            </div>
          </div>
        )}

        {/* STEP 3: ACTIVE INTERACTIVE SESSION */}
        {step === "active" && (
          <div className="w-full flex flex-col gap-4 animate-fade-in">
            {/* Session Indicator Banner */}
            <div className="bg-white border border-[#E7E5F0] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#64B89A] animate-ping" />
                <span className="font-bold text-sm text-[#2F3142]">Sessão de {patientName}</span>
                <span className="text-xs text-[#73768B] hidden sm:inline">// {resource.title}</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#64B89A] font-semibold flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5" /> Sincronizado
                </span>
              </div>
            </div>

            {/* Interactive Canvas depending on resource type */}
            {resource.type === "scenario" && (
              <SandTrayCanvas isPsychologistView={false} patientCanInteract={true} />
            )}
            {resource.type === "drawing" && (
              <DrawingCanvas isPsychologistView={false} patientCanInteract={true} />
            )}
            {resource.type === "cards" && (
              <ReflectiveCardDeck isPsychologistView={false} />
            )}
          </div>
        )}

        {/* STEP 4: COMPLETED SCREEN */}
        {step === "completed" && (
          <div className="bg-white border border-[#E7E5F0] rounded-2xl p-8 max-w-md w-full shadow-lg text-center animate-fade-in space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#64B89A]/20 text-[#308164] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <h2 className="font-extrabold text-xl text-[#2F3142]">Atividade Concluída</h2>
              <p className="text-xs text-[#73768B] mt-1">
                Obrigado por participar, {patientName}! Sua participação foi registrada com sucesso.
              </p>
            </div>

            <p className="text-xs text-[#73768B] bg-[#F7F6FB] p-3 rounded-xl border border-[#E7E5F0]">
              Você já pode fechar esta aba do navegador.
            </p>

            <button
              onClick={onExitSession || (() => setStep("entry"))}
              className="px-6 py-2.5 bg-[#7567E8] text-white rounded-xl font-bold text-xs hover:bg-[#6253D6] transition-colors"
            >
              Voltar ao Início
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E7E5F0] py-3 text-center text-[11px] text-[#73768B]">
        MenteLúdica • Recursos terapêuticos que aproximam, envolvem e transformam.
      </footer>
    </div>
  );
};
