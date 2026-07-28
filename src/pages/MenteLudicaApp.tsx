import React, { useState } from "react";
import { 
  ArrowLeft, Smartphone, Monitor, UserCheck, ShieldCheck, Building2, Users, 
  Sparkles, Bell, Heart, Check, HelpCircle
} from "lucide-react";
import { PsychologistView } from "../components/menteludica/PsychologistView";
import { PatientSessionView } from "../components/menteludica/PatientSessionView";
import { AdminView } from "../components/menteludica/AdminView";
import { ClinicAdminView } from "../components/menteludica/ClinicAdminView";
import { INITIAL_RESOURCES } from "../components/menteludica/mockData";
import { UserRole, TherapeuticResource } from "../components/menteludica/types";

interface MenteLudicaAppProps {
  onBack?: () => void;
}

export const MenteLudicaApp: React.FC<MenteLudicaAppProps> = ({ onBack }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>("psychologist");
  const [isMobilePreview, setIsMobilePreview] = useState<boolean>(false);
  const [patientSessionData, setPatientSessionData] = useState<{
    code: string;
    resource: TherapeuticResource;
  }>({
    code: "482 917",
    resource: INITIAL_RESOURCES[0]
  });

  const [toastMessage, setToastMessage] = useState<string | null>("Bem-vindo à demonstração interativa da MenteLúdica!");

  const handleOpenPatientView = (code: string, resource: TherapeuticResource) => {
    setPatientSessionData({ code, resource });
    setCurrentRole("patient");
    setToastMessage("Alternado para a visão do Paciente Convidado.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#11121C] text-white font-sans flex flex-col selection:bg-[#7567E8]/40">
      {/* GLOBAL TOP PORTFOLIO DEMO HEADER */}
      <header className="bg-[#181926] border-b border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50 text-xs shadow-md">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar ao Portfólio
            </button>
          )}

          <div className="flex items-center gap-2 border-l border-white/10 pl-3">
            <div className="w-6 h-6 rounded-md bg-[#7567E8] text-white font-black flex items-center justify-center text-xs">
              M
            </div>
            <span className="font-extrabold text-sm text-white tracking-tight">MenteLúdica</span>
            <span className="text-[10px] bg-[#7567E8]/30 text-[#7567E8] border border-[#7567E8]/40 px-2 py-0.5 rounded-full font-bold hidden sm:inline">
              SaaS Terapêutico MVP
            </span>
          </div>
        </div>

        {/* ROLE SWITCHER CONTROLS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-[10px] font-bold text-white/40 uppercase hidden md:inline">Perfil de Acesso:</span>
          
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-[11px] font-bold">
            {[
              { id: "psychologist", label: "Psicólogo", icon: UserCheck },
              { id: "patient", label: "Paciente", icon: Users },
              { id: "clinic_admin", label: "Clínica", icon: Building2 },
              { id: "super_admin", label: "Super Admin", icon: ShieldCheck }
            ].map((r) => {
              const Icon = r.icon;
              const isActive = currentRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    setCurrentRole(r.id as any);
                    setToastMessage(`Perfil alterado para ${r.label}`);
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                    isActive 
                      ? "bg-[#7567E8] text-white shadow-xs" 
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="whitespace-nowrap">{r.label}</span>
                </button>
              );
            })}
          </div>

          {/* MOBILE SHELL SIMULATION SWITCH */}
          <button
            onClick={() => setIsMobilePreview(!isMobilePreview)}
            className={`p-1.5 rounded-xl border transition-colors hidden sm:flex items-center gap-1 text-[11px] font-bold ${
              isMobilePreview 
                ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" 
                : "bg-white/5 border-white/10 text-white/70 hover:text-white"
            }`}
            title="Alternar simulação de dispositivo mobile / PWA"
          >
            {isMobilePreview ? <Smartphone className="w-4 h-4 text-emerald-400" /> : <Monitor className="w-4 h-4" />}
            <span>{isMobilePreview ? "PWA Mobile" : "Desktop"}</span>
          </button>
        </div>
      </header>

      {/* TOAST NOTIFICATION BANNER */}
      {toastMessage && (
        <div className="bg-[#7567E8] text-white py-1.5 px-4 text-center text-xs font-semibold shadow-inner flex items-center justify-center gap-2 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* APP WORKSPACE CANVAS */}
      <div className={`flex-1 flex items-center justify-center transition-all ${
        isMobilePreview ? "py-8 bg-[#090A10]" : ""
      }`}>
        {isMobilePreview ? (
          /* Mobile Device Frame Container */
          <div className="w-full max-w-[390px] h-[812px] bg-white text-[#2F3142] rounded-[48px] shadow-2xl border-[12px] border-[#222436] overflow-hidden flex flex-col relative animate-fade-in">
            {/* Notch */}
            <div className="w-36 h-4 bg-[#222436] rounded-b-xl mx-auto absolute top-0 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-black/60" />
            </div>

            {/* Mobile Viewport Content */}
            <div className="flex-1 pt-4 overflow-y-auto">
              {currentRole === "psychologist" && (
                <PsychologistView onOpenPatientView={handleOpenPatientView} />
              )}
              {currentRole === "patient" && (
                <PatientSessionView
                  resource={patientSessionData.resource}
                  sessionCode={patientSessionData.code}
                  onExitSession={() => setCurrentRole("psychologist")}
                />
              )}
              {currentRole === "clinic_admin" && <ClinicAdminView />}
              {currentRole === "super_admin" && <AdminView />}
            </div>
          </div>
        ) : (
          /* Full Desktop Layout */
          <div className="w-full min-h-full">
            {currentRole === "psychologist" && (
              <PsychologistView onOpenPatientView={handleOpenPatientView} />
            )}
            {currentRole === "patient" && (
              <PatientSessionView
                resource={patientSessionData.resource}
                sessionCode={patientSessionData.code}
                onExitSession={() => setCurrentRole("psychologist")}
              />
            )}
            {currentRole === "clinic_admin" && (
              <div className="max-w-6xl mx-auto p-6">
                <ClinicAdminView />
              </div>
            )}
            {currentRole === "super_admin" && (
              <div className="max-w-6xl mx-auto p-6">
                <AdminView />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenteLudicaApp;
