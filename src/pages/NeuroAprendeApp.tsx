import React, { FC, useState } from 'react';
import { NeuroHeader } from '../components/neuroaprende/NeuroHeader';
import { NeuroHeroBanner } from '../components/neuroaprende/NeuroHeroBanner';
import { NeuroChildWorldMap } from '../components/neuroaprende/NeuroChildWorldMap';
import { NeuroInteractiveGameModal } from '../components/neuroaprende/NeuroInteractiveGameModal';
import { NeuroAdultDashboard } from '../components/neuroaprende/NeuroAdultDashboard';
import { NeuroActivityEditorAdmin } from '../components/neuroaprende/NeuroActivityEditorAdmin';
import { NeuroAccessibilityBar } from '../components/neuroaprende/NeuroAccessibilityBar';
import { NeuroFaqSection } from '../components/neuroaprende/NeuroFaqSection';
import { NeuroFooter } from '../components/neuroaprende/NeuroFooter';

import { 
  UserRole, 
  Language, 
  AccessibilitySettings, 
  StudentProfile, 
  ThemeWorld 
} from '../types/neuroaprende';

import { 
  DEFAULT_ACCESSIBILITY_SETTINGS, 
  INITIAL_STUDENT_PROFILE, 
  THEME_WORLDS 
} from '../data/neuroaprendeData';

interface NeuroAprendeAppProps {
  onBackToPortfolio?: () => void;
}

export const NeuroAprendeApp: FC<NeuroAprendeAppProps> = ({ onBackToPortfolio }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('child');
  const [activeTab, setActiveTab] = useState<string>('mundos');
  const [language, setLanguage] = useState<Language>('pt');
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_ACCESSIBILITY_SETTINGS);
  const [student, setStudent] = useState<StudentProfile>(INITIAL_STUDENT_PROFILE);

  // Active game modal state
  const [selectedWorldForGame, setSelectedWorldForGame] = useState<ThemeWorld | null>(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState<boolean>(false);

  // Accessibility drawer state
  const [isAccessibilityBarOpen, setIsAccessibilityBarOpen] = useState<boolean>(false);

  const handleSelectWorld = (world: ThemeWorld) => {
    setSelectedWorldForGame(world);
    setIsGameModalOpen(true);
  };

  const isRtl = language === 'ar';

  return (
    <div 
      className={`min-h-screen bg-[#0a0a0a] text-stone-100 transition-colors ${
        settings.lowStimulusMode ? 'filter contrast-90 brightness-95 saturate-75' : ''
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      
      {/* Top Bar Header */}
      <NeuroHeader
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        settings={settings}
        setSettings={setSettings}
        student={student}
        onOpenAccessibilityModal={() => setIsAccessibilityBarOpen(true)}
        onBackToPortfolio={onBackToPortfolio}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Hero Welcome Banner */}
        <NeuroHeroBanner
          student={student}
          onOpenGames={() => {
            setActiveRole('child');
            setActiveTab('mundos');
          }}
          onOpenDashboard={() => {
            setActiveRole('parent');
            setActiveTab('dashboard');
          }}
        />

        {/* Dynamic View Sections based on Active Tab or Role */}
        {activeTab === 'mundos' && (
          <NeuroChildWorldMap
            worlds={THEME_WORLDS}
            student={student}
            onSelectWorld={handleSelectWorld}
          />
        )}

        {activeTab === 'dashboard' && (
          <NeuroAdultDashboard
            student={student}
            setStudent={setStudent}
            activeRole={activeRole}
            setActiveRole={setActiveRole}
          />
        )}

        {activeTab === 'editor_admin' && (
          <NeuroActivityEditorAdmin />
        )}

        {/* FAQ Section */}
        <NeuroFaqSection />

      </main>

      {/* Interactive Playable Game Modal */}
      <NeuroInteractiveGameModal
        world={selectedWorldForGame}
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
        student={student}
        setStudent={setStudent}
        settings={settings}
      />

      {/* Accessibility Settings Drawer */}
      <NeuroAccessibilityBar
        isOpen={isAccessibilityBarOpen}
        onClose={() => setIsAccessibilityBarOpen(false)}
        settings={settings}
        setSettings={setSettings}
      />

      {/* Footer */}
      <NeuroFooter />

    </div>
  );
};

export default NeuroAprendeApp;
