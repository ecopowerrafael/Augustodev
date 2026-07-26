import React, { useState } from "react";
import { Dog, KennelProfile } from "../../data/kennelLegacyData";
import { Shield, Award, QrCode, Share2, MessageCircle, ArrowLeft, CheckCircle2, FileText, Heart, Sparkles, ExternalLink } from "lucide-react";
import FounderSealBadge from "./FounderSealBadge";
import PedigreeTreeViewer from "./PedigreeTreeViewer";
import ContactModal from "./ContactModal";
import ShareModal from "./ShareModal";
import QRCodeManagerModal from "./QRCodeManagerModal";

interface PublicDogViewProps {
  dog: Dog;
  kennel: KennelProfile;
  onBackToKennel?: () => void;
  onBackToDashboard?: () => void;
}

export default function PublicDogView({
  dog,
  kennel,
  onBackToKennel,
  onBackToDashboard
}: PublicDogViewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "lineage" | "health" | "titles" | "gallery">("overview");
  const [showContact, setShowContact] = useState<boolean>(false);
  const [showShare, setShowShare] = useState<boolean>(false);
  const [showQR, setShowQR] = useState<boolean>(false);

  return (
    <div className="w-full min-h-screen bg-[#0B0D10] text-[#F4F6F8] font-sans text-left selection:bg-[#C8A45D]/30 pb-16">
      {/* Top Banner Notice for Public Verification */}
      <div className="bg-[#171C22] border-b border-[#2A323C] px-4 py-2 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-[#2FB879]" />
          <span>PERFIL PÚBLICO VERIFICADO // REGISTRO OFICIAL KENNEL LEGACY</span>
        </div>
        <div className="flex items-center space-x-4">
          {onBackToKennel && (
            <button onClick={onBackToKennel} className="text-[#C8A45D] hover:underline flex items-center space-x-1 font-bold">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Ver Canil</span>
            </button>
          )}
          {onBackToDashboard && (
            <button onClick={onBackToDashboard} className="text-[#4D8FD8] hover:underline hidden sm:flex items-center space-x-1 font-bold">
              <span>Painel do Criador</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Header Hero Profile Card */}
        <div className="bg-[#12161B] border border-[#2A323C] rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={dog.mainImage}
                alt={dog.registeredName}
                className="h-28 w-28 sm:h-36 sm:w-36 rounded-2xl object-cover border-2 border-[#C8A45D] shadow-2xl shrink-0"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#E2C77D] font-bold uppercase border border-white/20">
                {dog.gender === "male" ? "Macho" : "Fêmea"}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <FounderSealBadge variant="compact" sealNumber={kennel.founderSeal} />
                <span className="px-2.5 py-0.5 rounded bg-[#2FB879]/20 text-[#2FB879] font-mono text-[10px] font-bold">
                  PEDIGREE VERIFICADO
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-black text-white tracking-wide">
                {dog.registeredName}
              </h1>

              <p className="text-xs font-mono text-[#C8A45D] font-bold">
                Chamado: {dog.useName} • {dog.breed}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-1">
                <div>Reg: <strong className="text-white">{dog.registrationNumber}</strong></div>
                <div>•</div>
                <div>Microchip: <strong className="text-white">{dog.microchip}</strong></div>
                <div>•</div>
                <div>Nascimento: <strong className="text-white">{dog.birthDate}</strong></div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
            <button
              onClick={() => setShowContact(true)}
              className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-[#2FB879] hover:bg-emerald-400 text-black font-mono text-xs font-bold uppercase tracking-wider transition shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Contatar Criador</span>
            </button>

            <button
              onClick={() => setShowShare(true)}
              className="px-3.5 py-3 rounded-xl bg-[#171C22] hover:bg-[#2A323C] border border-[#2A323C] text-slate-200 text-xs font-mono transition"
              title="Compartilhar"
            >
              <Share2 className="h-4 w-4" />
            </button>

            <button
              onClick={() => setShowQR(true)}
              className="px-3.5 py-3 rounded-xl bg-[#171C22] hover:bg-[#2A323C] border border-[#2A323C] text-[#C8A45D] text-xs font-mono transition"
              title="QR Code"
            >
              <QrCode className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-[#2A323C] gap-2 font-mono text-xs custom-scrollbar">
          {[
            { id: "overview", label: "Visão Geral" },
            { id: "lineage", label: "Árvore Genealógica (5 Gen)" },
            { id: "health", label: "Exames & Saúde" },
            { id: "titles", label: "Títulos & Conquistas" },
            { id: "gallery", label: "Galeria de Fotos" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-4 rounded-t-xl transition shrink-0 border-t border-x font-bold ${
                activeTab === tab.id
                  ? "bg-[#12161B] text-[#E2C77D] border-[#C8A45D]/50 border-b-transparent"
                  : "bg-transparent text-slate-400 border-transparent hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Description */}
              <div className="p-6 rounded-2xl bg-[#12161B] border border-[#2A323C] space-y-3">
                <h3 className="font-serif text-lg font-bold text-white border-b border-[#2A323C] pb-2">
                  Descrição e Temperamento
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {dog.description}
                </p>
                <div className="p-3 bg-[#0B0D10] rounded-xl border border-[#2A323C] text-xs font-mono text-slate-300">
                  <span className="text-[#C8A45D] font-bold">Temperamento:</span> {dog.temperament}
                </div>
              </div>

              {/* Parents info */}
              <div className="p-6 rounded-2xl bg-[#12161B] border border-[#2A323C] space-y-4">
                <h3 className="font-serif text-lg font-bold text-white border-b border-[#2A323C] pb-2">
                  Linhagem Direta (Genitores)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  {/* Father */}
                  <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#4D8FD8]/50 space-y-1">
                    <span className="text-[10px] text-[#4D8FD8] font-bold uppercase block">PAI</span>
                    <h5 className="font-serif text-sm font-bold text-white">{dog.fatherName || "Maximus von Adlerberg"}</h5>
                    <p className="text-[10px] text-slate-400">Reg: {dog.fatherReg || "ADRK-18723"}</p>
                  </div>

                  {/* Mother */}
                  <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#E25B5B]/50 space-y-1">
                    <span className="text-[10px] text-[#E25B5B] font-bold uppercase block">MÃE</span>
                    <h5 className="font-serif text-sm font-bold text-white">{dog.motherName || "Bella do Vale Imperial"}</h5>
                    <p className="text-[10px] text-slate-400">Reg: {dog.motherReg || "CBKC-98452"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Attributes Card */}
            <div className="p-6 rounded-2xl bg-[#12161B] border border-[#2A323C] space-y-4 h-fit">
              <h3 className="font-serif text-lg font-bold text-white border-b border-[#2A323C] pb-2">
                Ficha Técnica
              </h3>
              <div className="space-y-3 font-mono text-xs text-slate-300">
                <div className="flex justify-between border-b border-[#2A323C] pb-2">
                  <span className="text-slate-400">Peso:</span>
                  <span className="font-bold text-white">{dog.weight}</span>
                </div>
                <div className="flex justify-between border-b border-[#2A323C] pb-2">
                  <span className="text-slate-400">Altura:</span>
                  <span className="font-bold text-white">{dog.height}</span>
                </div>
                <div className="flex justify-between border-b border-[#2A323C] pb-2">
                  <span className="text-slate-400">Cor:</span>
                  <span className="font-bold text-white">{dog.color}</span>
                </div>
                <div className="flex justify-between border-b border-[#2A323C] pb-2">
                  <span className="text-slate-400">Canil:</span>
                  <span className="font-bold text-[#E2C77D]">{kennel.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Criador:</span>
                  <span className="font-bold text-white">{dog.breederName}</span>
                </div>
              </div>

              <FounderSealBadge variant="card" sealNumber={kennel.founderSeal} />
            </div>
          </div>
        )}

        {/* Tab 2: Lineage */}
        {activeTab === "lineage" && (
          <PedigreeTreeViewer dogName={dog.registeredName} />
        )}

        {/* Tab 3: Health */}
        {activeTab === "health" && (
          <div className="p-6 rounded-2xl bg-[#12161B] border border-[#2A323C] space-y-4">
            <h3 className="font-serif text-lg font-bold text-white border-b border-[#2A323C] pb-3 flex items-center space-x-2">
              <Shield className="h-5 w-5 text-[#2FB879]" />
              <span>Laudos e Exames Oficiais de Saúde</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {dog.exams.map(exam => (
                <div key={exam.id} className="p-4 rounded-xl bg-[#0B0D10] border border-[#2FB879]/50 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#2FB879] font-bold">
                    <span>LAUDO HOMOLOGADO</span>
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <h5 className="font-serif text-sm font-bold text-white">{exam.type}</h5>
                  <p className="text-xs font-mono text-[#E2C77D] font-bold">{exam.result}</p>
                  <p className="text-[10px] font-mono text-slate-400">{exam.entity} • {exam.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Titles */}
        {activeTab === "titles" && (
          <div className="p-6 rounded-2xl bg-[#12161B] border border-[#2A323C] space-y-4">
            <h3 className="font-serif text-lg font-bold text-white border-b border-[#2A323C] pb-3 flex items-center space-x-2">
              <Award className="h-5 w-5 text-[#C8A45D]" />
              <span>Títulos e Premiações Oficiais</span>
            </h3>

            <div className="space-y-3">
              {dog.titles.map(title => (
                <div key={title.id} className="p-4 rounded-xl bg-[#0B0D10] border border-[#C8A45D]/50 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#C8A45D] font-bold uppercase">{title.placement}</span>
                    <h5 className="font-serif text-base font-bold text-white">{title.title}</h5>
                    <p className="text-xs text-slate-400 font-mono">{title.event} — {title.entity} ({title.date})</p>
                  </div>
                  <Award className="h-8 w-8 text-[#E2C77D] shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Gallery */}
        {activeTab === "gallery" && (
          <div className="p-6 rounded-2xl bg-[#12161B] border border-[#2A323C] space-y-4">
            <h3 className="font-serif text-lg font-bold text-white border-b border-[#2A323C] pb-3">
              Galeria de Imagens de {dog.useName}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {dog.gallery.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-[#2A323C]">
                  <img src={img} alt={`${dog.useName} photo ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} kennel={kennel} />
      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} title={`Compartilhar ${dog.registeredName}`} shareUrl={dog.publicUrl} />
      <QRCodeManagerModal isOpen={showQR} onClose={() => setShowQR(false)} targetName={dog.registeredName} publicLink={dog.publicUrl} qrUrl={dog.qrCodeUrl} />
    </div>
  );
}
