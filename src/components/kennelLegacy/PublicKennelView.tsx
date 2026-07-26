import React, { useState } from "react";
import { KennelProfile, Dog, BreederProfile } from "../../data/kennelLegacyData";
import { Shield, MapPin, Award, Phone, Share2, QrCode, ExternalLink, Calendar, CheckCircle2, MessageCircle, Info, Heart, ArrowLeft } from "lucide-react";
import FounderSealBadge from "./FounderSealBadge";
import ContactModal from "./ContactModal";
import ShareModal from "./ShareModal";
import QRCodeManagerModal from "./QRCodeManagerModal";

interface PublicKennelViewProps {
  kennel: KennelProfile;
  breeder: BreederProfile;
  dogs: Dog[];
  onSelectDog: (dogId: string) => void;
  onBackToDashboard?: () => void;
}

export default function PublicKennelView({
  kennel,
  breeder,
  dogs,
  onSelectDog,
  onBackToDashboard
}: PublicKennelViewProps) {
  const [showContact, setShowContact] = useState<boolean>(false);
  const [showShare, setShowShare] = useState<boolean>(false);
  const [showQR, setShowQR] = useState<boolean>(false);

  return (
    <div className="w-full min-h-screen bg-[#0B0D10] text-[#F4F6F8] font-sans text-left selection:bg-[#C8A45D]/30 pb-16">
      {/* Top Banner Notice for Prototype Mode */}
      <div className="bg-[#171C22] border-b border-[#2A323C] px-4 py-2 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-[#2FB879]" />
          <span>PERFIL PÚBLICO OFICIAL VERIFICADO DA PLATAFORMA KENNEL LEGACY</span>
        </div>
        {onBackToDashboard && (
          <button
            onClick={onBackToDashboard}
            className="text-[#C8A45D] hover:underline flex items-center space-x-1 font-bold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Voltar à Área Privada</span>
          </button>
        )}
      </div>

      {/* Hero Cover Header */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden">
        <img
          src={kennel.coverImage}
          alt={kennel.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/60 to-transparent" />
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative -mt-24 z-10 space-y-8">
        {/* Profile Card Header */}
        <div className="bg-[#12161B] border border-[#2A323C] rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={kennel.logoImage}
              alt={kennel.name}
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover border-2 border-[#C8A45D] shadow-2xl shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <FounderSealBadge variant="compact" sealNumber={kennel.founderSeal} />
                <span className="px-2.5 py-0.5 rounded bg-[#1677A3]/30 border border-[#1677A3] text-[#4D8FD8] font-mono text-[10px] uppercase font-bold">
                  {kennel.clubEntity}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-black text-white tracking-wide">
                {kennel.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3.5 w-3.5 text-[#C8A45D]" />
                  <span>{kennel.city} — {kennel.state}</span>
                </div>
                <div>•</div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3.5 w-3.5 text-[#C8A45D]" />
                  <span>Fundado em {kennel.foundationYear}</span>
                </div>
                <div>•</div>
                <div className="text-[#E2C77D] font-bold">
                  Raça: {kennel.mainBreed}
                </div>
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
              <span>Falar com o Criador</span>
            </button>

            <button
              onClick={() => setShowShare(true)}
              className="px-3.5 py-3 rounded-xl bg-[#171C22] hover:bg-[#2A323C] border border-[#2A323C] text-slate-200 text-xs font-mono transition"
              title="Compartilhar Perfil"
            >
              <Share2 className="h-4 w-4" />
            </button>

            <button
              onClick={() => setShowQR(true)}
              className="px-3.5 py-3 rounded-xl bg-[#171C22] hover:bg-[#2A323C] border border-[#2A323C] text-[#C8A45D] text-xs font-mono transition"
              title="Ver QR Code"
            >
              <QrCode className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Public Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#12161B] border border-[#2A323C] text-center space-y-1">
            <span className="font-serif text-2xl font-bold text-[#E2C77D]">8 Cães</span>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Plantel Registrado</span>
          </div>
          <div className="p-4 rounded-xl bg-[#12161B] border border-[#2A323C] text-center space-y-1">
            <span className="font-serif text-2xl font-bold text-[#2FB879]">10+ Anos</span>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Tradição de Seleção</span>
          </div>
          <div className="p-4 rounded-xl bg-[#12161B] border border-[#2A323C] text-center space-y-1">
            <span className="font-serif text-2xl font-bold text-[#4D8FD8]">CBKC / FCI</span>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Registro Internacional</span>
          </div>
          <div className="p-4 rounded-xl bg-[#12161B] border border-[#2A323C] text-center space-y-1">
            <span className="font-serif text-2xl font-bold text-[#C8A45D]">Selo #027</span>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Membro Fundador</span>
          </div>
        </div>

        {/* About Kennel & Breeder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Description */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-[#12161B] border border-[#2A323C] space-y-4">
            <h3 className="font-serif text-xl font-bold text-white border-b border-[#2A323C] pb-3 flex items-center space-x-2">
              <Shield className="h-5 w-5 text-[#C8A45D]" />
              <span>Sobre o Canil e Filosofia de Criação</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {kennel.description}
            </p>
            <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#2A323C] text-xs font-mono text-slate-300 space-y-2">
              <div className="text-[#C8A45D] font-bold uppercase">Princípios de Trabalho:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Preservação rigorosa dos padrões anatômicos oficiais da raça</li>
                <li>Controle genético e exames oficiais de saúde (Displasia, JLPP, Cardíaco)</li>
                <li>Socialização precoce e temperamento equilibrado para guarda e família</li>
              </ul>
            </div>
          </div>

          {/* Breeder Profile Card */}
          <div className="p-6 rounded-2xl bg-[#12161B] border border-[#2A323C] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-bold text-white border-b border-[#2A323C] pb-3">
                Criador Responsável
              </h3>
              <div className="flex items-center space-x-3">
                <img
                  src={breeder.photo}
                  alt={breeder.name}
                  className="h-14 w-14 rounded-full object-cover border-2 border-[#C8A45D]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-serif text-base font-bold text-white">{breeder.name}</h4>
                  <span className="text-[10px] font-mono text-[#C8A45D]">Criador Fundador nº {breeder.founderNumber}</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {breeder.bio}
              </p>
            </div>

            <FounderSealBadge variant="card" sealNumber={breeder.founderNumber} />
          </div>
        </div>

        {/* Public Dogs Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Plantel de Cães do Canil
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Consulte o histórico, exames de saúde e árvore de linhagem de cada cão.
              </p>
            </div>
            <span className="text-xs font-mono text-[#C8A45D] font-bold">
              {dogs.length} Cães Registrados
            </span>
          </div>

          {/* Dogs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dogs.map(dog => (
              <div
                key={dog.id}
                onClick={() => onSelectDog(dog.id)}
                className="group bg-[#12161B] border border-[#2A323C] hover:border-[#C8A45D] rounded-xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative aspect-4/3 overflow-hidden bg-[#171C22]">
                    <img
                      src={dog.mainImage}
                      alt={dog.registeredName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[9px] font-mono text-[#E2C77D] font-bold border border-white/10 uppercase">
                      {dog.gender === "male" ? "Macho" : "Fêmea"}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-mono text-[#C8A45D] font-bold uppercase tracking-wider block truncate">
                      {dog.useName}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-white group-hover:text-[#E2C77D] transition truncate">
                      {dog.registeredName}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-400 truncate">
                      Reg: {dog.registrationNumber}
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t border-[#2A323C] bg-[#0B0D10]/50 flex items-center justify-between text-[10px] font-mono text-slate-300">
                  <span>{dog.age}</span>
                  <span className="text-[#C8A45D] font-bold group-hover:underline flex items-center space-x-1">
                    <span>Ver Pedigree</span>
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents & Official Certificates */}
        <div className="p-6 rounded-2xl bg-[#12161B] border border-[#2A323C] space-y-4">
          <h3 className="font-serif text-lg font-bold text-white border-b border-[#2A323C] pb-3 flex items-center space-x-2">
            <Award className="h-5 w-5 text-[#C8A45D]" />
            <span>Documentos Oficiais e Afixos Verificados</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {kennel.documents.map(doc => (
              <div key={doc.id} className="p-4 rounded-xl bg-[#0B0D10] border border-[#2A323C] space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#2FB879]">
                  <span>{doc.type}</span>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <h5 className="font-serif text-xs font-bold text-white">{doc.title}</h5>
                <p className="text-[10px] font-mono text-slate-400">Verificado em {doc.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} kennel={kennel} />
      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} title={`Compartilhar ${kennel.name}`} shareUrl={kennel.publicUrl} />
      <QRCodeManagerModal isOpen={showQR} onClose={() => setShowQR(false)} targetName={kennel.name} publicLink={kennel.publicUrl} />
    </div>
  );
}
