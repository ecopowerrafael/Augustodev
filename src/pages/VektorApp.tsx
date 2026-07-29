import React, { useState } from 'react';
import { VektorTab } from '../types/vektor';
import { VektorHeader } from '../components/vektor/VektorHeader';
import { VektorFooter } from '../components/vektor/VektorFooter';
import { VektorHeroBanner } from '../components/vektor/VektorHeroBanner';
import { VektorServicesSection } from '../components/vektor/VektorServicesSection';
import { VektorDiagnosticTool } from '../components/vektor/VektorDiagnosticTool';
import { VektorAbrirEmpresaWizard } from '../components/vektor/VektorAbrirEmpresaWizard';
import { VektorTrocarContabilidadeSection } from '../components/vektor/VektorTrocarContabilidadeSection';
import { VektorSectorsSection } from '../components/vektor/VektorSectorsSection';
import { VektorClientPortalMockup } from '../components/vektor/VektorClientPortalMockup';
import { VektorBlogSection } from '../components/vektor/VektorBlogSection';
import { VektorAboutSection } from '../components/vektor/VektorAboutSection';
import { VektorContactSection } from '../components/vektor/VektorContactSection';
import { VektorWhatsAppFloat } from '../components/vektor/VektorWhatsAppFloat';

import { 
  INITIAL_SERVICES, 
  INITIAL_SECTORS, 
  INITIAL_CLIENT_DOCUMENTS, 
  INITIAL_TICKETS, 
  INITIAL_BLOG_POSTS, 
  INITIAL_FAQS 
} from '../data/vektorData';

interface VektorAppProps {
  onBackToPortfolio?: () => void;
}

export const VektorApp: React.FC<VektorAppProps> = ({ onBackToPortfolio }) => {
  const [activeTab, setActiveTab] = useState<VektorTab>('home');

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-emerald-500 selection:text-stone-950 flex flex-col justify-between">
      {/* Header */}
      <VektorHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onBackToPortfolio={onBackToPortfolio} 
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-20 animate-fade-in">
            {/* Hero */}
            <VektorHeroBanner setActiveTab={setActiveTab} />

            {/* Diagnostic Teaser Section */}
            <VektorDiagnosticTool setActiveTab={setActiveTab} />

            {/* Services Grid */}
            <VektorServicesSection services={INITIAL_SERVICES} setActiveTab={setActiveTab} />

            {/* Sectors Solutions */}
            <VektorSectorsSection sectors={INITIAL_SECTORS} setActiveTab={setActiveTab} />

            {/* Client Portal Preview */}
            <VektorClientPortalMockup 
              documents={INITIAL_CLIENT_DOCUMENTS} 
              tickets={INITIAL_TICKETS} 
              setActiveTab={setActiveTab} 
            />

            {/* Blog & Guides */}
            <VektorBlogSection posts={INITIAL_BLOG_POSTS} setActiveTab={setActiveTab} />

            {/* Contact */}
            <VektorContactSection setActiveTab={setActiveTab} />
          </div>
        )}

        {/* TAB 2: SERVIÇOS */}
        {activeTab === 'servicos' && (
          <div className="animate-fade-in py-4">
            <VektorServicesSection services={INITIAL_SERVICES} setActiveTab={setActiveTab} />
          </div>
        )}

        {/* TAB 3: ABRIR EMPRESA */}
        {activeTab === 'abrir-empresa' && (
          <div className="animate-fade-in py-4">
            <VektorAbrirEmpresaWizard setActiveTab={setActiveTab} />
          </div>
        )}

        {/* TAB 4: TROCAR CONTABILIDADE */}
        {activeTab === 'trocar-contabilidade' && (
          <div className="animate-fade-in py-4">
            <VektorTrocarContabilidadeSection setActiveTab={setActiveTab} />
          </div>
        )}

        {/* TAB 5: DIAGNÓSTICO TRIBUTÁRIO */}
        {activeTab === 'diagnostico' && (
          <div className="animate-fade-in py-4">
            <VektorDiagnosticTool setActiveTab={setActiveTab} />
          </div>
        )}

        {/* TAB 6: BPO FINANCEIRO */}
        {activeTab === 'bpo-financeiro' && (
          <div className="animate-fade-in py-4 space-y-12">
            <div className="p-8 bg-[#181918] border border-emerald-500/30 rounded-3xl space-y-4">
              <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-widest block">
                BPO Financeiro Terceirizado
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
                Deixe as contas a pagar, receber e conciliação bancária <span className="italic font-normal text-emerald-400">com a Vektor.</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 font-serif max-w-2xl leading-relaxed">
                Nossos especialistas operam seu sistema de gestão de forma diária. Você economiza tempo de equipe, evita multas por atraso e tem previsibilidade do fluxo de caixa.
              </p>
              <button
                onClick={() => setActiveTab('contato')}
                className="px-6 py-3.5 bg-emerald-400 text-stone-950 font-mono text-xs uppercase font-bold rounded-xl hover:bg-emerald-300"
              >
                Solicitar Diagnóstico de BPO
              </button>
            </div>
            <VektorServicesSection services={INITIAL_SERVICES.filter(s => s.category === 'financeiro' || s.id === 'contabilidade-estrategica')} setActiveTab={setActiveTab} />
          </div>
        )}

        {/* TAB 7: ÁREA DO CLIENTE */}
        {activeTab === 'area-cliente' && (
          <div className="animate-fade-in py-4">
            <VektorClientPortalMockup 
              documents={INITIAL_CLIENT_DOCUMENTS} 
              tickets={INITIAL_TICKETS} 
              setActiveTab={setActiveTab} 
            />
          </div>
        )}

        {/* TAB 8: SOBRE NÓS */}
        {activeTab === 'sobre' && (
          <div className="animate-fade-in py-4">
            <VektorAboutSection setActiveTab={setActiveTab} />
          </div>
        )}

        {/* TAB 9: BLOG & CONTEÚDO */}
        {activeTab === 'blog' && (
          <div className="animate-fade-in py-4">
            <VektorBlogSection posts={INITIAL_BLOG_POSTS} setActiveTab={setActiveTab} />
          </div>
        )}

        {/* TAB 10: CONTATO */}
        {activeTab === 'contato' && (
          <div className="animate-fade-in py-4">
            <VektorContactSection setActiveTab={setActiveTab} />
          </div>
        )}
      </main>

      {/* Floating WhatsApp Action Widget */}
      <VektorWhatsAppFloat />

      {/* Footer */}
      <VektorFooter setActiveTab={setActiveTab} />
    </div>
  );
};
