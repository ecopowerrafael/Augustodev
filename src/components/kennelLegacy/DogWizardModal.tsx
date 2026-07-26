import React, { useState } from "react";
import { X, Check, ArrowRight, ArrowLeft, Upload, Sparkles, Shield, Heart, Award, Camera, CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import { Dog } from "../../data/kennelLegacyData";

interface DogWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveDog: (newDog: Partial<Dog>) => void;
  existingDog?: Dog | null;
}

export default function DogWizardModal({
  isOpen,
  onClose,
  onSaveDog,
  existingDog
}: DogWizardModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isOptimizingImage, setIsOptimizingImage] = useState<boolean>(false);
  const [imageUploaded, setImageUploaded] = useState<boolean>(!!existingDog?.mainImage);

  // Form State
  const [formData, setFormData] = useState<Partial<Dog>>(existingDog || {
    useName: "Thor V",
    registeredName: "Thor V do Vale Imperial",
    breed: "Rottweiler",
    gender: "male",
    birthDate: "10/02/2024",
    color: "Preto e castanho",
    registrationNumber: "CBKC/RG/SP/119023",
    microchip: "985141002388001",
    breederName: "Rafael Augusto",
    ownerName: "Rafael Augusto",
    kennelName: "Canil Vale Imperial",
    mainImage: "https://images.unsplash.com/photo-1567752881298-894bb81f9379?auto=format&fit=crop&w=800&q=80",
    weight: "48 kg",
    height: "64 cm",
    temperament: "Equilibrado, confiante e amigável",
    description: "Excelente estrutura óssea e temperamento típico da raça.",
    fatherName: "Maximus von Adlerberg",
    motherName: "Bella do Vale Imperial",
    completenessPercentage: 88,
    status: "Perfil em publicação"
  });

  if (!isOpen) return null;

  const steps = [
    "1. Identificação",
    "2. Registro",
    "3. Fotografias",
    "4. Características",
    "5. Saúde & Exames",
    "6. Títulos",
    "7. Linhagem",
    "8. Publicação"
  ];

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsOptimizingImage(true);
      setTimeout(() => {
        setIsOptimizingImage(false);
        setImageUploaded(true);
        setFormData(prev => ({
          ...prev,
          mainImage: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80"
        }));
      }, 1200);
    }
  };

  const handleFinalSubmit = () => {
    onSaveDog({
      ...formData,
      id: existingDog?.id || `dog-${Date.now()}`,
      completenessPercentage: 90,
      hasPhoto: true,
      hasLineage: true,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://kennellegacy.com/cao/${formData.useName?.toLowerCase().replace(/\s+/g, '-')}`,
      publicUrl: `https://kennellegacy.com/cao/${formData.useName?.toLowerCase().replace(/\s+/g, '-')}`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#12161B] border border-[#2A323C] rounded-2xl max-w-3xl w-full p-6 space-y-6 text-left shadow-2xl relative my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2A323C] pb-4">
          <div>
            <span className="text-[10px] font-mono text-[#C8A45D] font-bold uppercase tracking-widest block">
              CADASTRO GUIADO DE CÃO // KENNEL LEGACY
            </span>
            <h3 className="font-serif text-xl font-bold text-white">
              {existingDog ? `Editar: ${existingDog.registeredName}` : "Cadastrar Novo Cão no Canil"}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#171C22]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Wizard Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="text-[#E2C77D] font-bold">Etapa {currentStep} de 8</span>
            <span>{steps[currentStep - 1]}</span>
          </div>
          <div className="w-full h-2 bg-[#171C22] rounded-full overflow-hidden border border-[#2A323C]">
            <div
              className="h-full bg-gradient-to-r from-[#C8A45D] to-[#2FB879] transition-all duration-300"
              style={{ width: `${(currentStep / 8) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="py-2 min-h-[280px]">
          {/* STEP 1: Identificação */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-mono text-[#C8A45D] uppercase font-bold">1. Dados Principais de Identificação</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Nome de Uso / Chamado *</label>
                  <input
                    type="text"
                    value={formData.useName || ""}
                    onChange={(e) => setFormData({ ...formData, useName: e.target.value })}
                    placeholder="Ex: Imperial Thor"
                    className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white focus:border-[#C8A45D]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Nome Completo de Registro *</label>
                  <input
                    type="text"
                    value={formData.registeredName || ""}
                    onChange={(e) => setFormData({ ...formData, registeredName: e.target.value })}
                    placeholder="Ex: Thor do Vale Imperial"
                    className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white focus:border-[#C8A45D]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Raça *</label>
                  <input
                    type="text"
                    value={formData.breed || "Rottweiler"}
                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                    className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white focus:border-[#C8A45D]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Sexo *</label>
                  <select
                    value={formData.gender || "male"}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as "male" | "female" })}
                    className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white focus:border-[#C8A45D]"
                  >
                    <option value="male">Macho</option>
                    <option value="female">Fêmea</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Data de Nascimento</label>
                  <input
                    type="text"
                    value={formData.birthDate || "14/03/2022"}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    placeholder="DD/MM/AAAA"
                    className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white focus:border-[#C8A45D]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Cor e Pelagem</label>
                  <input
                    type="text"
                    value={formData.color || "Preto e castanho"}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white focus:border-[#C8A45D]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Registro */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-mono text-[#C8A45D] uppercase font-bold">2. Documentação e Pedigree</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Número de Registro Pedigree (CBKC / FCI)</label>
                  <input
                    type="text"
                    value={formData.registrationNumber || ""}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    placeholder="CBKC/RG/SP/102845"
                    className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white focus:border-[#C8A45D]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Número do Microchip</label>
                  <input
                    type="text"
                    value={formData.microchip || ""}
                    onChange={(e) => setFormData({ ...formData, microchip: e.target.value })}
                    placeholder="985141002345671"
                    className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white focus:border-[#C8A45D]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Criador de Origem</label>
                  <input
                    type="text"
                    value={formData.breederName || "Rafael Augusto"}
                    onChange={(e) => setFormData({ ...formData, breederName: e.target.value })}
                    className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white focus:border-[#C8A45D]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Proprietário Atual</label>
                  <input
                    type="text"
                    value={formData.ownerName || "Rafael Augusto"}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white focus:border-[#C8A45D]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Fotografias com Otimizador Simulado */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h4 className="text-sm font-mono text-[#C8A45D] uppercase font-bold">3. Fotografias do Cão & Otimização de Imagem</h4>
              
              <div className="p-6 border-2 border-dashed border-[#2A323C] hover:border-[#C8A45D] rounded-xl bg-[#0B0D10] text-center space-y-3 transition">
                <div className="h-12 w-12 rounded-full bg-[#171C22] border border-[#C8A45D]/40 flex items-center justify-center mx-auto text-[#E2C77D]">
                  <Camera className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Arraste e solte a foto de capa ou clique para selecionar</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">JPG ou PNG em alta definição (Ajuste automático para perfil rápido)</p>
                </div>
                <label className="inline-block px-4 py-2 bg-[#C8A45D] hover:bg-[#E2C77D] text-black font-bold text-xs rounded-lg font-mono uppercase cursor-pointer">
                  <span>Selecionar Foto</span>
                  <input type="file" accept="image/*" onChange={handleSimulateUpload} className="hidden" />
                </label>
              </div>

              {isOptimizingImage && (
                <div className="p-4 bg-[#171C22] border border-[#C8A45D] rounded-xl flex items-center space-x-3 text-xs font-mono text-[#E2C77D]">
                  <div className="h-4 w-4 border-2 border-[#C8A45D] border-t-transparent rounded-full animate-spin" />
                  <span>Enviando... Otimizando resolução para carregamento ultra-rápido...</span>
                </div>
              )}

              {imageUploaded && !isOptimizingImage && (
                <div className="p-4 bg-[#2FB879]/10 border border-[#2FB879] rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-[#2FB879] text-xs font-mono font-bold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Imagem otimizada com sucesso e adicionada ao perfil!</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 bg-[#0B0D10] p-2 rounded">
                    <span>Arquivo Original: <strong>4.8 MB</strong></span>
                    <span className="text-[#2FB879]">Otimizado no Servidor: <strong>620 KB (Redução de 87%)</strong></span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Características */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h4 className="text-sm font-mono text-[#C8A45D] uppercase font-bold">4. Características Físicas e Temperamento</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Peso Estimado/Atual</label>
                  <input
                    type="text"
                    value={formData.weight || "52 kg"}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white focus:border-[#C8A45D]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Altura na Cernelha</label>
                  <input
                    type="text"
                    value={formData.height || "66 cm"}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white focus:border-[#C8A45D]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-slate-300 mb-1">Temperamento e Comportamento</label>
                  <input
                    type="text"
                    value={formData.temperament || ""}
                    onChange={(e) => setFormData({ ...formData, temperament: e.target.value })}
                    placeholder="Ex: Equilibrado, seguro, protetor e dócil em família"
                    className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white focus:border-[#C8A45D]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Saúde & Exames */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h4 className="text-sm font-mono text-[#C8A45D] uppercase font-bold">5. Exames de Saúde e Laudos Oficiais</h4>
              <p className="text-xs text-slate-400">Cadastre laudos de displasia coxofemural, cardíacos ou laudos genéticos (Ex: JLPP, DNA).</p>
              
              <div className="p-4 bg-[#171C22] rounded-xl border border-[#2A323C] space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-white">
                  <span>Displasia Coxofemural (HD):</span>
                  <span className="text-[#2FB879] font-bold">HD-A (Isento) ✓</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-white">
                  <span>JLPP (Paralisia de Laringe):</span>
                  <span className="text-[#2FB879] font-bold">N/N (Livre) ✓</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: Títulos */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <h4 className="text-sm font-mono text-[#C8A45D] uppercase font-bold">6. Títulos e Conquistas em Exposições</h4>
              <div className="p-4 bg-[#171C22] rounded-xl border border-[#2A323C] space-y-2">
                <div className="text-xs font-mono text-[#E2C77D] font-bold">🏆 Grande Campeão Jovem Panamericano</div>
                <p className="text-[11px] text-slate-400">Expo Internacional CBKC 2023 — 1º Lugar Best in Show</p>
              </div>
            </div>
          )}

          {/* STEP 7: Linhagem */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <h4 className="text-sm font-mono text-[#C8A45D] uppercase font-bold">7. Vínculo de Linhagem Paterna e Materna</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Pai Cadastrado</label>
                  <input
                    type="text"
                    value={formData.fatherName || "Maximus von Adlerberg"}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white focus:border-[#C8A45D]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Mãe Cadastrada</label>
                  <input
                    type="text"
                    value={formData.motherName || "Bella do Vale Imperial"}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                    className="w-full bg-[#0B0D10] border border-[#2A323C] rounded-lg p-2.5 text-xs text-white focus:border-[#C8A45D]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 8: Publicação */}
          {currentStep === 8 && (
            <div className="space-y-4 text-center py-4">
              <div className="h-16 w-16 bg-[#2FB879]/20 border-2 border-[#2FB879] rounded-full flex items-center justify-center mx-auto text-[#2FB879]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-white">Perfil do Cão Prontinho para Publicação!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Ao publicar, o perfil público será gerado com o selo de autenticidade, QR Code automático e card de linhagem de 5 gerações.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-[#2A323C] pt-4">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-lg bg-[#171C22] border border-[#2A323C] text-slate-300 hover:text-white text-xs font-mono font-bold disabled:opacity-40 flex items-center space-x-1.5"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Anterior</span>
          </button>

          {currentStep < 8 ? (
            <button
              onClick={() => setCurrentStep(Math.min(8, currentStep + 1))}
              className="px-5 py-2.5 rounded-lg bg-[#C8A45D] hover:bg-[#E2C77D] text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-1.5"
            >
              <span>Avançar</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleFinalSubmit}
              className="px-6 py-2.5 rounded-lg bg-[#2FB879] hover:bg-emerald-400 text-black text-xs font-mono font-bold uppercase tracking-wider shadow-lg flex items-center space-x-2"
            >
              <Check className="h-4 w-4" />
              <span>Publicar Cão na Plataforma</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
