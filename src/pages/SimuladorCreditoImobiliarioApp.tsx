import React, { useState } from 'react';
import { 
  BankConfig, 
  SimulationInput, 
  LeadData, 
  BankSimulationResult 
} from '../types/creditoImobiliario';
import { 
  INITIAL_BANKS, 
  DEFAULT_SIMULATION_INPUT, 
  MOCK_INITIAL_LEADS 
} from '../data/creditoImobiliarioData';
import { runMultiBankSimulation } from '../utils/mortgageCalculations';

import { MortgageHeader } from '../components/creditoImobiliario/MortgageHeader';
import { MortgageHeroBanner } from '../components/creditoImobiliario/MortgageHeroBanner';
import { MortgageSimulationWizard } from '../components/creditoImobiliario/MortgageSimulationWizard';
import { MortgageLeadCaptureModal } from '../components/creditoImobiliario/MortgageLeadCaptureModal';
import { MortgageResultsComparison } from '../components/creditoImobiliario/MortgageResultsComparison';
import { MortgageAmortizationModal } from '../components/creditoImobiliario/MortgageAmortizationModal';
import { MortgageSacVsPriceSection } from '../components/creditoImobiliario/MortgageSacVsPriceSection';
import { MortgageAdminPanel } from '../components/creditoImobiliario/MortgageAdminPanel';
import { MortgageFaqSection } from '../components/creditoImobiliario/MortgageFaqSection';
import { MortgageFooter } from '../components/creditoImobiliario/MortgageFooter';
import { MortgageWhatsAppFloat } from '../components/creditoImobiliario/MortgageWhatsAppFloat';

interface SimuladorCreditoImobiliarioAppProps {
  onBackToPortfolio?: () => void;
}

export const SimuladorCreditoImobiliarioApp: React.FC<SimuladorCreditoImobiliarioAppProps> = ({
  onBackToPortfolio
}) => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Core Data States
  const [banks, setBanks] = useState<BankConfig[]>(INITIAL_BANKS);
  const [simulationInput, setSimulationInput] = useState<SimulationInput>(DEFAULT_SIMULATION_INPUT);
  const [leads, setLeads] = useState<LeadData[]>(MOCK_INITIAL_LEADS);

  // Lead Modal & Unlock State
  const [isLeadModalOpen, setIsLeadModalOpen] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  // Amortization Schedule Modal State
  const [selectedAmortizationResult, setSelectedAmortizationResult] = useState<BankSimulationResult | null>(null);

  // Compute live multi-bank simulation results
  const simulationResults = runMultiBankSimulation(banks, simulationInput);

  // Triggers when user completes wizard or quick hero form
  const handleStartSimulation = () => {
    if (!isUnlocked) {
      setIsLeadModalOpen(true);
    } else {
      setActiveTab('resultados');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUnlockResults = (newLead: LeadData) => {
    setLeads(prev => [newLead, ...prev]);
    setIsUnlocked(true);
    setIsLeadModalOpen(false);
    setActiveTab('resultados');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-emerald-500 selection:text-stone-950 flex flex-col justify-between">
      
      {/* Header */}
      <MortgageHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        onBackToPortfolio={onBackToPortfolio}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* TAB 1: HOME LANDING */}
        {activeTab === 'home' && (
          <div className="space-y-16 animate-fade-in">
            {/* Hero Section with Quick Calculator */}
            <MortgageHeroBanner
              simulationInput={simulationInput}
              setSimulationInput={setSimulationInput}
              onStartSimulation={handleStartSimulation}
            />

            {/* Step-by-Step Wizard Section */}
            <div className="space-y-4">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                  Simulação Passo a Passo
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
                  Preencha os detalhes do seu imóvel
                </h2>
              </div>

              <MortgageSimulationWizard
                simulationInput={simulationInput}
                setSimulationInput={setSimulationInput}
                onCompleteWizard={handleStartSimulation}
              />
            </div>

            {/* SAC vs Price Educational Breakdown */}
            <MortgageSacVsPriceSection />

            {/* FAQ & Regras */}
            <MortgageFaqSection />
          </div>
        )}

        {/* TAB 2: WIZARD DEDICADO */}
        {activeTab === 'simular' && (
          <div className="animate-fade-in py-4 space-y-8">
            <MortgageSimulationWizard
              simulationInput={simulationInput}
              setSimulationInput={setSimulationInput}
              onCompleteWizard={handleStartSimulation}
            />
          </div>
        )}

        {/* TAB 3: RESULTADOS COMPARATIVOS */}
        {activeTab === 'resultados' && (
          <div className="animate-fade-in py-4 space-y-8">
            <MortgageResultsComparison
              simulationInput={simulationInput}
              results={simulationResults}
              onOpenAmortizationModal={(res) => setSelectedAmortizationResult(res)}
              onEditSimulation={() => setActiveTab('simular')}
            />
          </div>
        )}

        {/* TAB 4: SAC VS PRICE */}
        {activeTab === 'sac-price' && (
          <div className="animate-fade-in py-4 space-y-8">
            <MortgageSacVsPriceSection />
          </div>
        )}

        {/* TAB 5: FAQ & DÚVIDAS */}
        {activeTab === 'faq' && (
          <div className="animate-fade-in py-4 space-y-8">
            <MortgageFaqSection />
          </div>
        )}

        {/* TAB 6: ADMIN PANEL */}
        {activeTab === 'admin' && (
          <div className="animate-fade-in py-4 space-y-8">
            <MortgageAdminPanel
              banks={banks}
              setBanks={setBanks}
              leads={leads}
              setLeads={setLeads}
              onCloseAdmin={() => {
                setIsAdmin(false);
                setActiveTab('home');
              }}
            />
          </div>
        )}

      </main>

      {/* Lead Capture Modal */}
      <MortgageLeadCaptureModal
        simulationInput={simulationInput}
        results={simulationResults}
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onUnlockResults={handleUnlockResults}
      />

      {/* Amortization Schedule Table Modal */}
      <MortgageAmortizationModal
        result={selectedAmortizationResult}
        isOpen={selectedAmortizationResult !== null}
        onClose={() => setSelectedAmortizationResult(null)}
      />

      {/* Floating Action Button */}
      <MortgageWhatsAppFloat />

      {/* Footer */}
      <MortgageFooter setActiveTab={setActiveTab} />

    </div>
  );
};
