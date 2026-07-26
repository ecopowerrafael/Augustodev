import React, { useState } from "react";
import { Header } from "../components/bhPresentes/Header";
import { Hero } from "../components/bhPresentes/Hero";
import { FeaturedOffer } from "../components/bhPresentes/FeaturedOffer";
import { TrustSection } from "../components/bhPresentes/TrustSection";
import { OffersGrid } from "../components/bhPresentes/OffersGrid";
import { ModelNotFoundSection } from "../components/bhPresentes/ModelNotFoundSection";
import { TradeInSection } from "../components/bhPresentes/TradeInSection";
import { NewVsUsedSection } from "../components/bhPresentes/NewVsUsedSection";
import { BenefitsSection } from "../components/bhPresentes/BenefitsSection";
import { ReviewsSection } from "../components/bhPresentes/ReviewsSection";
import { LeadCaptureForm } from "../components/bhPresentes/LeadCaptureForm";
import { PreWhatsAppModal } from "../components/bhPresentes/PreWhatsAppModal";
import { WhatsAppChatSimulator } from "../components/bhPresentes/WhatsAppChatSimulator";
import { PaymentConditions } from "../components/bhPresentes/PaymentConditions";
import { LocationSection } from "../components/bhPresentes/LocationSection";
import { FaqSection } from "../components/bhPresentes/FaqSection";
import { FinalCta } from "../components/bhPresentes/FinalCta";
import { FloatingWhatsAppButton } from "../components/bhPresentes/FloatingWhatsAppButton";
import { MobileStickyBar } from "../components/bhPresentes/MobileStickyBar";
import { Footer } from "../components/bhPresentes/Footer";

import { LeadFormData, TradeInValuation } from "../types/bhPresentes";
import { STORE_INFO } from "../data/bhPresentesData";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface BHPresentesAppProps {
  onBack?: () => void;
}

export const BHPresentesApp: React.FC<BHPresentesAppProps> = ({ onBack }) => {
  const [selectedModel, setSelectedModel] = useState<string>("iPhone 15 — 128 GB");
  const [activeLead, setActiveLead] = useState<LeadFormData | null>(null);
  const [showPreWhatsAppModal, setShowPreWhatsAppModal] = useState<boolean>(false);
  const [showChatSimulator, setShowChatSimulator] = useState<boolean>(false);
  const [formattedWhatsAppMessage, setFormattedWhatsAppMessage] = useState<string>("");

  const scrollToSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectModel = (modelName?: string) => {
    if (modelName) {
      setSelectedModel(modelName);
    }
    scrollToSection("formulario");
  };

  const handleApplyTradeIn = (tradeInData: TradeInValuation) => {
    setSelectedModel(`${tradeInData.brand} ${tradeInData.model} (${tradeInData.storage})`);
    scrollToSection("formulario");
  };

  const handleLeadSubmit = (leadData: LeadFormData) => {
    setActiveLead(leadData);
    setShowPreWhatsAppModal(true);
  };

  const handleConfirmWhatsAppSend = (formattedText: string) => {
    setFormattedWhatsAppMessage(formattedText);
    setShowPreWhatsAppModal(false);

    // Open real WhatsApp link in tab
    const waUrl = `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(formattedText)}`;
    window.open(waUrl, "_blank");

    // Open inside-app live chat simulator
    setShowChatSimulator(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#18202A] font-sans selection:bg-[#25D366]/30 relative">
      {/* Optional Top Developer Navigation Bar */}
      {onBack && (
        <div className="bg-[#0B1F3A] text-white py-2 px-4 border-b border-white/10 flex items-center justify-between text-xs font-bold sticky top-0 z-50">
          <button
            onClick={onBack}
            className="flex items-center space-x-1.5 hover:text-[#176BFF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Portfólio do Desenvolvedor</span>
          </button>
          <div className="flex items-center space-x-2 text-[#25D366]">
            <CheckCircle2 className="w-4 h-4" />
            <span className="hidden sm:inline">Protótipo Landing Page BH Presentes (Pampulha Cell)</span>
          </div>
        </div>
      )}

      {/* Main Header */}
      <Header
        onOpenForm={(model) => handleSelectModel(model)}
        onNavigateToSection={scrollToSection}
      />

      {/* Hero Section */}
      <Hero
        onOpenForm={(model) => handleSelectModel(model)}
        onNavigateToSection={scrollToSection}
      />

      {/* Featured Offer */}
      <FeaturedOffer onSelectModel={(model) => handleSelectModel(model)} />

      {/* Trust & Safety Section */}
      <TrustSection />

      {/* Offers Catalog Grid */}
      <OffersGrid onSelectModel={(model) => handleSelectModel(model)} />

      {/* Didn't find your model section */}
      <ModelNotFoundSection onOpenFormCustom={(model) => handleSelectModel(model)} />

      {/* Trade-In Calculator */}
      <TradeInSection onApplyTradeIn={handleApplyTradeIn} />

      {/* New vs Used Section */}
      <NewVsUsedSection
        onSelectCondition={(condition) => {
          setSelectedModel(condition === "Novo" ? "iPhone 15 — 128 GB (Novo)" : "iPhone 13 — 128 GB (Seminovo)");
          scrollToSection("formulario");
        }}
      />

      {/* Store Benefits */}
      <BenefitsSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Main Lead Capture Form */}
      <LeadCaptureForm
        initialModelName={selectedModel}
        onSubmitLead={handleLeadSubmit}
      />

      {/* Payment Conditions */}
      <PaymentConditions />

      {/* Location & Map Section */}
      <LocationSection onOpenForm={() => scrollToSection("formulario")} />

      {/* FAQ Accordion */}
      <FaqSection onOpenForm={() => scrollToSection("formulario")} />

      {/* Final High-Converting CTA */}
      <FinalCta onOpenForm={() => scrollToSection("formulario")} />

      {/* Footer */}
      <Footer
        onNavigateToSection={scrollToSection}
        onOpenForm={() => scrollToSection("formulario")}
      />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsAppButton
        onOpenForm={() => scrollToSection("formulario")}
        onNavigateToSection={scrollToSection}
      />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileStickyBar
        onOpenForm={() => scrollToSection("formulario")}
        onNavigateToSection={scrollToSection}
      />

      {/* Pre-WhatsApp Summary Confirmation Modal */}
      {showPreWhatsAppModal && activeLead && (
        <PreWhatsAppModal
          leadData={activeLead}
          onClose={() => setShowPreWhatsAppModal(false)}
          onConfirmSend={handleConfirmWhatsAppSend}
        />
      )}

      {/* WhatsApp Fast Response Chat Simulator */}
      {showChatSimulator && activeLead && (
        <WhatsAppChatSimulator
          clientName={activeLead.fullName}
          initialMessage={formattedWhatsAppMessage}
          onClose={() => setShowChatSimulator(false)}
        />
      )}
    </div>
  );
};

export default BHPresentesApp;
