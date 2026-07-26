import React, { useState } from "react";
import {
  Site,
  Equipment,
  ChecklistItem,
  Inspection,
  NonConformity,
  DEFAULT_CHECKLIST_TEMPLATE,
} from "../../data/gmgCheckData";
import { CameraModal } from "./CameraModal";
import { SignaturePad } from "./SignaturePad";
import {
  Check,
  X,
  AlertTriangle,
  Camera,
  ArrowRight,
  ArrowLeft,
  Zap,
  Building2,
  Gauge,
  Clock,
  ShieldAlert,
  FileCheck2,
  CheckCircle2,
  ChevronRight,
  Info,
  Sparkles,
  QrCode,
} from "lucide-react";

interface InspectionWizardProps {
  sites: Site[];
  equipments: Equipment[];
  technicianName: string;
  technicianId: string;
  onCompleteInspection: (newInspection: Inspection) => void;
  onCancel: () => void;
}

export const InspectionWizard: React.FC<InspectionWizardProps> = ({
  sites,
  equipments,
  technicianName,
  technicianId,
  onCompleteInspection,
  onCancel,
}) => {
  // Wizard Steps: 1: Site | 2: Equipment | 3: Identification | 4: Checklist | 5: Signatures | 6: Finished
  const [step, setStep] = useState<number>(1);

  // Selected Data State
  const [selectedSite, setSelectedSite] = useState<Site | null>(sites[0] || null);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    equipments.find((e) => e.siteId === sites[0]?.id) || equipments[0] || null
  );

  // Form Parameters
  const [localResponsible, setLocalResponsible] = useState<string>(selectedSite?.responsibleName || "Marcos Oliveira");
  const [localPhone, setLocalPhone] = useState<string>(selectedSite?.responsiblePhone || "(15) 99823-1100");
  const [localMatricula, setLocalMatricula] = useState<string>("MAT-0842");
  const [equipmentCondition, setEquipmentCondition] = useState<"Operacional" | "Com restrição" | "Parado">("Operacional");
  const [isOperatingDuringCheck, setIsOperatingDuringCheck] = useState<boolean>(true);
  const [initialObservation, setInitialObservation] = useState<string>("");

  // Checklist Execution State
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(
    DEFAULT_CHECKLIST_TEMPLATE.map((item) => ({ ...item, status: "Pendente", photos: [] }))
  );
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);

  // Measurements State
  const [measurements, setMeasurements] = useState({
    hourmeter: "1842.7 h",
    voltageRS: "381 V",
    voltageST: "379 V",
    voltageRT: "380 V",
    frequency: "60.1 Hz",
    batteryVoltage: "25.4 V",
    oilPressureBar: "4.8 bar",
    engineTempC: "82 °C",
    fuelLevelPercent: "74%",
  });

  // Photo Evidences State
  const [attachedPhotos, setAttachedPhotos] = useState<{ id: string; url: string; caption: string; timestamp: string }[]>(
    []
  );

  // Camera Modal State
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraTargetItemId, setCameraTargetItemId] = useState<string | null>(null);

  // Signatures State
  const [technicianSignature, setTechnicianSignature] = useState<string | null>(null);
  const [responsibleSignature, setResponsibleSignature] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(true);

  // Derived Categories
  const categories = Array.from(new Set(checklistItems.map((i) => i.category)));

  // Progress calculations
  const answeredCount = checklistItems.filter((i) => i.status !== "Pendente").length;
  const okCount = checklistItems.filter((i) => i.status === "OK").length;
  const nokCount = checklistItems.filter((i) => i.status === "NOK").length;
  const naCount = checklistItems.filter((i) => i.status === "N/A").length;
  const progressPercent = Math.round((answeredCount / checklistItems.length) * 100);

  // Handle Site Selection
  const handleSelectSite = (site: Site) => {
    setSelectedSite(site);
    const siteEqs = equipments.filter((e) => e.siteId === site.id);
    if (siteEqs.length > 0) {
      setSelectedEquipment(siteEqs[0]);
    }
    setLocalResponsible(site.responsibleName);
    setLocalPhone(site.responsiblePhone);
  };

  // Handle Item Status Change
  const handleItemStatusChange = (itemId: string, newStatus: "OK" | "NOK" | "N/A") => {
    setChecklistItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, status: newStatus } : item))
    );
  };

  // Handle Observation Change
  const handleItemObsChange = (itemId: string, obs: string) => {
    setChecklistItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, observation: obs } : item))
    );
  };

  // Handle Photo Capture from Modal
  const handlePhotoCaptured = (photoUrl: string, caption: string) => {
    const newPhoto = {
      id: `p-${Date.now()}`,
      url: photoUrl,
      caption,
      timestamp: new Date().toLocaleTimeString().slice(0, 5),
    };

    setAttachedPhotos((prev) => [...prev, newPhoto]);

    if (cameraTargetItemId) {
      setChecklistItems((prev) =>
        prev.map((item) =>
          item.id === cameraTargetItemId
            ? { ...item, photos: [...item.photos, photoUrl] }
            : item
        )
      );
      setCameraTargetItemId(null);
    }
  };

  // Finish Inspection Action
  const handleFinalize = () => {
    if (!selectedSite || !selectedEquipment) return;

    const generatedInspectionId = `VIS-2026-${Math.floor(100 + Math.random() * 900)}`;

    const generatedNCs: NonConformity[] = checklistItems
      .filter((i) => i.status === "NOK")
      .map((item, idx) => ({
        id: `nc-${Date.now()}-${idx}`,
        code: `NC-2026-00${Math.floor(80 + Math.random() * 20)}`,
        inspectionId: generatedInspectionId,
        siteName: selectedSite.name,
        equipmentTag: selectedEquipment.tag,
        category: item.category,
        itemTitle: item.title,
        description: item.observation || `Não conformidade constatada no item ${item.code}.`,
        criticality: item.isCritical ? "Alta" : "Média",
        recommendedAction: "Providenciar revisão e reparo técnico junto à equipe de manutenção.",
        suggestedDeadline: "28/07/2026",
        status: "Aberta",
        createdAt: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString().slice(0, 5)}`,
        photos: item.photos,
        timeline: [
          {
            date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString().slice(0, 5)}`,
            action: `Não conformidade registrada pelo técnico ${technicianName}`,
            author: technicianName,
          },
        ],
      }));

    const newInspection: Inspection = {
      id: generatedInspectionId,
      siteId: selectedSite.id,
      siteName: selectedSite.name,
      siteCity: `${selectedSite.city}/${selectedSite.state}`,
      equipmentId: selectedEquipment.id,
      equipmentTag: selectedEquipment.tag,
      equipmentName: selectedEquipment.name,
      equipmentSpecs: `${selectedEquipment.manufacturer} ${selectedEquipment.model} (${selectedEquipment.powerKVA} kVA)`,
      technicianName,
      technicianId,
      type: "Preventiva mensal",
      date: new Date().toLocaleDateString(),
      startTime: new Date().toLocaleTimeString().slice(0, 5),
      endTime: new Date().toLocaleTimeString().slice(0, 5),
      durationMinutes: 35,
      status: "Concluída",
      resultSummary: {
        okCount,
        nokCount,
        naCount,
        total: checklistItems.length,
      },
      localResponsibleName: localResponsible,
      localResponsiblePhone: localPhone,
      localResponsibleMatricula: localMatricula,
      equipmentCondition,
      isOperatingDuringCheck,
      initialObservations: initialObservation,
      checklists: checklistItems,
      nonConformities: generatedNCs,
      photos: attachedPhotos,
      measurements,
      signatures: {
        technicianSigned: !!technicianSignature,
        localResponsibleSigned: !!responsibleSignature,
        termAccepted: acceptedTerms,
      },
      synced: true,
    };

    onCompleteInspection(newInspection);
    setStep(6); // Go to complete step
  };

  return (
    <div className="bg-[#10263F] text-white min-h-screen flex flex-col font-sans">
      {/* Top Header Wizard Navigation */}
      <header className="sticky top-0 z-30 bg-black/40 border-b border-white/10 backdrop-blur-md p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onCancel}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[10px] text-[#F4B400] font-mono font-bold uppercase tracking-wider block">
                Nova Vistoria Técnica
              </span>
              <h2 className="font-bold text-sm md:text-base text-white">
                {step === 1 && "Passo 1/5: Selecionar Unidade / Site"}
                {step === 2 && "Passo 2/5: Selecionar Gerador (GMG)"}
                {step === 3 && "Passo 3/5: Parâmetros Iniciais"}
                {step === 4 && "Passo 4/5: Execução do Checklist"}
                {step === 5 && "Passo 5/5: Medições & Assinaturas"}
                {step === 6 && "Vistoria Finalizada com Sucesso!"}
              </h2>
            </div>
          </div>

          {/* Step indicators */}
          {step <= 5 && (
            <div className="flex items-center space-x-1.5 text-xs font-mono font-bold bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <span className="text-[#F4B400]">{step}</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-400">5</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Wizard Content Body */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-6 space-y-6">
        {/* STEP 1: SELECT SITE */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-[#1769AA]" />
                <span>Escolha o Local de Vistoria</span>
              </h3>
              <span className="text-xs text-gray-400">{sites.length} sites cadastrados</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sites.map((site) => {
                const isSelected = selectedSite?.id === site.id;
                return (
                  <div
                    key={site.id}
                    onClick={() => handleSelectSite(site)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? "border-[#F4B400] bg-[#1769AA]/20 shadow-xl ring-2 ring-[#F4B400]/20"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <div className="flex space-x-3">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-white/10">
                        <img src={site.image} alt={site.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-[#F4B400] font-bold">{site.code}</span>
                          {site.pendingInspectionsCount > 0 && (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-[#F4B400] text-black font-bold">
                              {site.pendingInspectionsCount} pendente
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-white text-base truncate">{site.name}</h4>
                        <p className="text-xs text-gray-300 truncate">{site.address}</p>
                        <p className="text-[11px] text-gray-400 mt-1">
                          Resp: <span className="text-white">{site.responsibleName}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!selectedSite}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#10263F] border border-[#F4B400] text-white font-bold text-sm hover:brightness-110 transition-all flex items-center space-x-2 shadow-lg"
              >
                <span>Avançar para Equipamento</span>
                <ArrowRight className="w-4 h-4 text-[#F4B400]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT EQUIPMENT */}
        {step === 2 && selectedSite && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
              <span className="text-xs text-gray-300">
                Site selecionado: <strong className="text-white">{selectedSite.name}</strong>
              </span>
              <button
                onClick={() => setStep(1)}
                className="text-xs text-[#F4B400] hover:underline font-medium"
              >
                Trocar Site
              </button>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                <Zap className="w-5 h-5 text-[#F4B400]" />
                <span>Selecione o Grupo Gerador (GMG)</span>
              </h3>
            </div>

            <div className="space-y-3">
              {equipments
                .filter((e) => e.siteId === selectedSite.id || equipments.length === 1)
                .map((eq) => {
                  const isSelected = selectedEquipment?.id === eq.id;
                  return (
                    <div
                      key={eq.id}
                      onClick={() => setSelectedEquipment(eq)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "border-[#F4B400] bg-[#1769AA]/20 shadow-xl"
                          : "border-white/10 bg-white/5 hover:border-white/30"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-white/10">
                          <img src={eq.image} alt={eq.tag} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-black text-white text-base">{eq.tag}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#18A66A]/20 text-[#18A66A]">
                              {eq.powerKVA} kVA
                            </span>
                          </div>
                          <p className="text-xs text-gray-300">{eq.name}</p>
                          <p className="text-[11px] text-gray-400">
                            {eq.manufacturer} {eq.model} • Horímetro: {eq.hourmeter}h
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-gray-400 block">Última vistoria:</span>
                        <span className="text-xs font-mono text-gray-200">{eq.lastInspectionDate}</span>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 font-medium text-xs hover:bg-white/5"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!selectedEquipment}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#10263F] border border-[#F4B400] text-white font-bold text-sm hover:brightness-110 transition-all flex items-center space-x-2 shadow-lg"
              >
                <span>Avançar para Parâmetros</span>
                <ArrowRight className="w-4 h-4 text-[#F4B400]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: IDENTIFICATION & PARAMETERS */}
        {step === 3 && selectedSite && selectedEquipment && (
          <div className="space-y-5 animate-fade-in">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
              <h3 className="font-bold text-base text-white border-b border-white/10 pb-2 flex items-center space-x-2">
                <FileCheck2 className="w-5 h-5 text-[#18A66A]" />
                <span>Identificação Automática do Atendimento</span>
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-gray-400 block">Código Provisório:</span>
                  <span className="font-bold text-[#F4B400] font-mono">VIS-2026-0149</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Técnico Vistoriador:</span>
                  <span className="font-semibold text-white">{technicianName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Unidade / Site:</span>
                  <span className="font-semibold text-white">{selectedSite.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Gerador Tag:</span>
                  <span className="font-bold text-[#18A66A] font-mono">{selectedEquipment.tag}</span>
                </div>
              </div>
            </div>

            {/* Inputs Form */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              <h4 className="font-semibold text-sm text-gray-200">Acompanhamento e Condições Iniciais</h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Acompanhante Local:</label>
                  <input
                    type="text"
                    value={localResponsible}
                    onChange={(e) => setLocalResponsible(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:border-[#1769AA]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">Telefone Contato:</label>
                  <input
                    type="text"
                    value={localPhone}
                    onChange={(e) => setLocalPhone(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:border-[#1769AA]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">Matrícula / Documento:</label>
                  <input
                    type="text"
                    value={localMatricula}
                    onChange={(e) => setLocalMatricula(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:border-[#1769AA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-gray-300 text-xs font-medium mb-1">Condição Prévia do GMG:</label>
                  <div className="flex space-x-2">
                    {(["Operacional", "Com restrição", "Parado"] as const).map((cond) => (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => setEquipmentCondition(cond)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          equipmentCondition === cond
                            ? "bg-[#1769AA] border-[#F4B400] text-white"
                            : "bg-black/30 border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-xs font-medium mb-1">
                    Equipamento em operação durante o teste?
                  </label>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsOperatingDuringCheck(true)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        isOperatingDuringCheck
                          ? "bg-[#18A66A] border-[#18A66A] text-white"
                          : "bg-black/30 border-white/10 text-gray-400"
                      }`}
                    >
                      Sim (Em Carga / Teste)
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsOperatingDuringCheck(false)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        !isOperatingDuringCheck
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-black/30 border-white/10 text-gray-400"
                      }`}
                    >
                      Não (Desligado)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 font-medium text-xs hover:bg-white/5"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#10263F] border border-[#F4B400] text-white font-bold text-sm hover:brightness-110 transition-all flex items-center space-x-2 shadow-lg"
              >
                <span>Iniciar Checklist de Campo ({checklistItems.length} itens)</span>
                <ArrowRight className="w-4 h-4 text-[#F4B400]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CHECKLIST EXECUTION */}
        {step === 4 && (
          <div className="space-y-5 animate-fade-in">
            {/* Top Fixed Progress Card */}
            <div className="p-4 bg-black/40 border border-white/10 rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Progresso da Inspeção</span>
                <span className="font-mono text-[#F4B400] font-bold">
                  {answeredCount} de {checklistItems.length} respondidos ({progressPercent}%)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden flex">
                <div style={{ width: `${(okCount / checklistItems.length) * 100}%` }} className="bg-[#18A66A] transition-all" />
                <div style={{ width: `${(nokCount / checklistItems.length) * 100}%` }} className="bg-[#D64545] transition-all" />
                <div style={{ width: `${(naCount / checklistItems.length) * 100}%` }} className="bg-[#7C8793] transition-all" />
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-[#18A66A] font-bold">OK: {okCount}</span>
                <span className="text-[#D64545] font-bold">NOK: {nokCount}</span>
                <span className="text-gray-400 font-bold">N/A: {naCount}</span>
                <span className="text-[#F4B400] font-bold">Pendente: {checklistItems.length - answeredCount}</span>
              </div>
            </div>

            {/* Category Selector Tabs */}
            <div className="flex overflow-x-auto space-x-2 pb-2 no-scrollbar scroll-smooth">
              {categories.map((cat, idx) => {
                const isSelected = activeCategoryIndex === idx;
                const catItems = checklistItems.filter((i) => i.category === cat);
                const catAnswered = catItems.filter((i) => i.status !== "Pendente").length;
                const catHasNok = catItems.some((i) => i.status === "NOK");

                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategoryIndex(idx);
                      const firstCatItemIndex = checklistItems.findIndex((i) => i.category === cat);
                      if (firstCatItemIndex !== -1) setActiveItemIndex(firstCatItemIndex);
                    }}
                    className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center space-x-1.5 ${
                      isSelected
                        ? "bg-[#1769AA] border-[#F4B400] text-white shadow"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    <span>{cat}</span>
                    {catHasNok && <span className="w-2 h-2 rounded-full bg-[#D64545]" />}
                    <span className="text-[10px] font-mono opacity-80">
                      ({catAnswered}/{catItems.length})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Item Large Touch Card */}
            {checklistItems[activeItemIndex] && (
              <div className="p-6 bg-white/5 border-2 border-[#1769AA]/50 rounded-2xl space-y-5 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="px-2.5 py-1 rounded-lg bg-[#F4B400]/20 text-[#F4B400] font-mono font-bold text-xs border border-[#F4B400]/30">
                    {checklistItems[activeItemIndex].code}
                  </span>
                  <span className="text-xs text-gray-400">
                    Item {activeItemIndex + 1} de {checklistItems.length}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {checklistItems[activeItemIndex].title}
                  </h3>
                  <p className="text-xs text-gray-300 bg-black/40 p-3 rounded-xl border border-white/10">
                    💡 <strong className="text-white">Diretriz Técnica:</strong> {checklistItems[activeItemIndex].guideline}
                  </p>
                </div>

                {/* Status Big Touch Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleItemStatusChange(checklistItems[activeItemIndex].id, "OK")}
                    className={`py-4 rounded-xl font-black text-sm flex flex-col items-center justify-center space-y-1 transition-all border-2 ${
                      checklistItems[activeItemIndex].status === "OK"
                        ? "bg-[#18A66A] border-white text-white shadow-lg scale-[1.02]"
                        : "bg-white/5 border-[#18A66A]/40 text-[#18A66A] hover:bg-[#18A66A]/10"
                    }`}
                  >
                    <CheckCircle2 className="w-6 h-6" />
                    <span>OK</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleItemStatusChange(checklistItems[activeItemIndex].id, "NOK")}
                    className={`py-4 rounded-xl font-black text-sm flex flex-col items-center justify-center space-y-1 transition-all border-2 ${
                      checklistItems[activeItemIndex].status === "NOK"
                        ? "bg-[#D64545] border-white text-white shadow-lg scale-[1.02]"
                        : "bg-white/5 border-[#D64545]/40 text-[#D64545] hover:bg-[#D64545]/10"
                    }`}
                  >
                    <AlertTriangle className="w-6 h-6" />
                    <span>NOK</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleItemStatusChange(checklistItems[activeItemIndex].id, "N/A")}
                    className={`py-4 rounded-xl font-black text-sm flex flex-col items-center justify-center space-y-1 transition-all border-2 ${
                      checklistItems[activeItemIndex].status === "N/A"
                        ? "bg-[#7C8793] border-white text-white shadow-lg scale-[1.02]"
                        : "bg-white/5 border-[#7C8793]/40 text-gray-400 hover:bg-[#7C8793]/10"
                    }`}
                  >
                    <X className="w-6 h-6" />
                    <span>N/A</span>
                  </button>
                </div>

                {/* Observation / Evidence Row */}
                <div className="space-y-3 pt-2">
                  <textarea
                    value={checklistItems[activeItemIndex].observation || ""}
                    onChange={(e) => handleItemObsChange(checklistItems[activeItemIndex].id, e.target.value)}
                    placeholder={
                      checklistItems[activeItemIndex].status === "NOK"
                        ? "Descreva obrigatoriamente a Não Conformidade identificada..."
                        : "Observações técnicas adicionais (opcional)..."
                    }
                    rows={2}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#1769AA]"
                  />

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setCameraTargetItemId(checklistItems[activeItemIndex].id);
                        setIsCameraOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold text-white hover:bg-white/20 transition-colors flex items-center space-x-2"
                    >
                      <Camera className="w-4 h-4 text-[#F4B400]" />
                      <span>Anexar Foto de Evidência</span>
                    </button>

                    {checklistItems[activeItemIndex].photos.length > 0 && (
                      <span className="text-xs text-[#18A66A] font-medium flex items-center space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>{checklistItems[activeItemIndex].photos.length} foto(s) anexada(s)</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Item Navigation Prev/Next */}
                <div className="flex justify-between pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveItemIndex((prev) => Math.max(0, prev - 1))}
                    disabled={activeItemIndex === 0}
                    className="px-4 py-2 rounded-xl border border-white/10 text-xs text-gray-300 disabled:opacity-30 hover:bg-white/5 flex items-center space-x-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Item Anterior</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveItemIndex((prev) => Math.min(checklistItems.length - 1, prev + 1))}
                    disabled={activeItemIndex === checklistItems.length - 1}
                    className="px-5 py-2 rounded-xl bg-[#1769AA] text-white text-xs font-bold hover:brightness-110 flex items-center space-x-1"
                  >
                    <span>Próximo Item</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 font-medium text-xs hover:bg-white/5"
              >
                Voltar aos Parâmetros
              </button>

              <button
                type="button"
                onClick={() => setStep(5)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#10263F] border border-[#F4B400] text-white font-bold text-sm hover:brightness-110 transition-all flex items-center space-x-2 shadow-lg"
              >
                <span>Avançar para Medições & Assinaturas</span>
                <ArrowRight className="w-4 h-4 text-[#F4B400]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: MEASUREMENTS & SIGNATURES */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            {/* Technical Measurements Form */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              <h3 className="font-bold text-base text-white flex items-center space-x-2 border-b border-white/10 pb-2">
                <Gauge className="w-5 h-5 text-[#F4B400]" />
                <span>Registro de Medições Técnicas de Campo</span>
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-gray-300 block font-medium mb-1">Horímetro Atual (h):</label>
                  <input
                    type="text"
                    value={measurements.hourmeter}
                    onChange={(e) => setMeasurements({ ...measurements, hourmeter: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block font-medium mb-1">Tensão Trifásica R-S (V):</label>
                  <input
                    type="text"
                    value={measurements.voltageRS}
                    onChange={(e) => setMeasurements({ ...measurements, voltageRS: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block font-medium mb-1">Frequência (Hz):</label>
                  <input
                    type="text"
                    value={measurements.frequency}
                    onChange={(e) => setMeasurements({ ...measurements, frequency: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block font-medium mb-1">Tensão Bateria (V):</label>
                  <input
                    type="text"
                    value={measurements.batteryVoltage}
                    onChange={(e) => setMeasurements({ ...measurements, batteryVoltage: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block font-medium mb-1">Pressão Óleo (bar):</label>
                  <input
                    type="text"
                    value={measurements.oilPressureBar}
                    onChange={(e) => setMeasurements({ ...measurements, oilPressureBar: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-gray-300 block font-medium mb-1">Nível Combustível (%):</label>
                  <input
                    type="text"
                    value={measurements.fuelLevelPercent}
                    onChange={(e) => setMeasurements({ ...measurements, fuelLevelPercent: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white font-mono font-bold text-[#18A66A]"
                  />
                </div>
              </div>
            </div>

            {/* Signature Pads */}
            <div className="space-y-4">
              <h3 className="font-bold text-base text-white border-b border-white/10 pb-2">
                Coleta de Assinaturas Digitais
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SignaturePad
                  label="Assinatura do Técnico Vistoriador"
                  signerName={technicianName}
                  signerDocument="CREA-SP 5069482-1"
                  onSave={(url) => setTechnicianSignature(url)}
                  savedSignatureUrl={technicianSignature || undefined}
                />

                <SignaturePad
                  label="Assinatura do Responsável Local"
                  signerName={localResponsible}
                  signerDocument={localMatricula}
                  onSave={(url) => setResponsibleSignature(url)}
                  savedSignatureUrl={responsibleSignature || undefined}
                />
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-start space-x-3 text-xs">
                <input
                  type="checkbox"
                  id="term"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 rounded border-gray-600 text-[#1769AA] focus:ring-[#1769AA]"
                />
                <label htmlFor="term" className="text-gray-300 leading-relaxed cursor-pointer">
                  Declaro que as informações e medições registradas neste relatório refletem com precisão o estado real do equipamento no momento da vistoria técnica.
                </label>
              </div>
            </div>

            {/* Final Submission Button */}
            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 font-medium text-xs hover:bg-white/5"
              >
                Voltar ao Checklist
              </button>

              <button
                type="button"
                onClick={handleFinalize}
                disabled={!acceptedTerms}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#18A66A] to-[#10263F] border border-[#18A66A] text-white font-black text-sm hover:brightness-110 transition-all flex items-center space-x-2 shadow-2xl disabled:opacity-50"
              >
                <CheckCircle2 className="w-5 h-5 text-[#F4B400]" />
                <span>Finalizar Vistoria & Emitir Relatório</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: FINISHED */}
        {step === 6 && (
          <div className="p-8 bg-white/5 border border-white/10 rounded-2xl text-center space-y-6 animate-fade-in max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-[#18A66A]/20 border-2 border-[#18A66A] text-[#18A66A] flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs text-[#F4B400] font-mono font-bold">VISTORIA CONCLUÍDA</span>
              <h3 className="text-2xl font-black text-white">Vistoria Registrada com Sucesso!</h3>
              <p className="text-xs text-gray-300">
                Os dados foram sincronizados e o relatório técnico foi disponibilizado para o cliente e supervisão.
              </p>
            </div>

            <div className="p-4 bg-black/40 border border-white/10 rounded-xl text-xs space-y-1 text-left">
              <p className="flex justify-between">
                <span className="text-gray-400">Código da Vistoria:</span>
                <span className="font-bold text-[#F4B400] font-mono">VIS-2026-0149</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Resultado:</span>
                <span className="font-bold text-[#18A66A]">{okCount} OK / {nokCount} NOK</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Responsável Local:</span>
                <span className="font-medium text-white">{localResponsible}</span>
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="w-full py-3 rounded-xl bg-[#1769AA] text-white font-bold text-xs hover:brightness-110 shadow"
              >
                Voltar ao Painel do Técnico
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Camera Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handlePhotoCaptured}
      />
    </div>
  );
};
