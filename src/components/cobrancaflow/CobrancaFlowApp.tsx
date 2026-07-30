import React, { useState } from 'react';
import { CobrancaHeader } from './CobrancaHeader';
import { CobrancaDashboard } from './CobrancaDashboard';
import { CobrancaAgendaCalendar } from './CobrancaAgendaCalendar';
import { CobrancaListAndForm } from './CobrancaListAndForm';
import { CobrancaClients } from './CobrancaClients';
import { CobrancaWhatsappTemplates } from './CobrancaWhatsappTemplates';
import { CobrancaDispatchLogs } from './CobrancaDispatchLogs';
import { CobrancaWhatsappConfig } from './CobrancaWhatsappConfig';
import { CobrancaReportsCompany } from './CobrancaReportsCompany';

import { 
  INITIAL_CLIENTS, 
  INITIAL_CHARGES, 
  INITIAL_TEMPLATES, 
  INITIAL_DISPATCH_LOGS, 
  INITIAL_COMPANY_SETTINGS, 
  INITIAL_AUTOMATION_RULES, 
  INITIAL_WHATSAPP_CONN 
} from '../../data/cobrancaflowMockData';

import { Client, Charge, ChargeStatus, UserRole, MessageTemplate, AutomationRule, WhatsappConnection, CompanySettings, DispatchLog } from '../../types/cobrancaflow';
import { CheckCircle2, MessageSquare, X } from 'lucide-react';

export const CobrancaFlowApp: React.FC = () => {
  // Navigation & User Context State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('administrator');
  
  // Domain Data State
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [charges, setCharges] = useState<Charge[]>(INITIAL_CHARGES);
  const [templates, setTemplates] = useState<MessageTemplate[]>(INITIAL_TEMPLATES);
  const [dispatchLogs, setDispatchLogs] = useState<DispatchLog[]>(INITIAL_DISPATCH_LOGS);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>(INITIAL_AUTOMATION_RULES);
  const [whatsappConn, setWhatsappConn] = useState<WhatsappConnection>(INITIAL_WHATSAPP_CONN);
  const [companySettings, setCompanySettings] = useState<CompanySettings>(INITIAL_COMPANY_SETTINGS);

  // Preselection helpers for shortcuts
  const [preselectedClientIdForCharge, setPreselectedClientIdForCharge] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // --- CLIENT HANDLERS ---
  const handleAddClient = (newClientData: Omit<Client, 'id' | 'totalChargesCount' | 'pendingAmount'>) => {
    const newClient: Client = {
      ...newClientData,
      id: 'cli-' + Date.now(),
      totalChargesCount: 0,
      pendingAmount: 0,
    };
    setClients(prev => [newClient, ...prev]);
    showToast(`Cliente "${newClient.fullName}" cadastrado com sucesso!`);
  };

  const handleUpdateClient = (updatedClient: Client) => {
    setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
    showToast(`Cadastro do cliente "${updatedClient.fullName}" atualizado.`);
  };

  const handleDeleteClient = (clientId: string) => {
    setClients(prev => prev.filter(c => c.id !== clientId));
    showToast('Cliente removido do sistema.');
  };

  const handleCreateChargeForClient = (client: Client) => {
    setPreselectedClientIdForCharge(client.id);
    setActiveTab('cobrancas');
  };

  // --- CHARGE HANDLERS ---
  const handleAddCharge = (chargeData: Omit<Charge, 'id' | 'createdAt'>) => {
    const newCharge: Charge = {
      ...chargeData,
      id: 'chg-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };

    setCharges(prev => [newCharge, ...prev]);

    // Create a dispatch log entry
    const newLog: DispatchLog = {
      id: 'log-' + Date.now(),
      chargeId: newCharge.id,
      clientName: newCharge.clientName,
      whatsappNumber: newCharge.clientWhatsapp,
      sentAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      messageContent: `Olá ${newCharge.clientName}, registramos sua cobrança de R$ ${newCharge.amount.toFixed(2)} com vencimento em ${newCharge.dueDate}.`,
      status: 'programada',
      triggerType: 'Cadastro de Título',
    };

    setDispatchLogs(prev => [newLog, ...prev]);
    showToast(`Nova cobrança de R$ ${newCharge.amount.toFixed(2)} criada e lembrete agendado!`);
  };

  const handleUpdateChargeStatus = (
    chargeId: string, 
    status: ChargeStatus, 
    paidData?: { paidAt: string; paidAmount: number; notes?: string }
  ) => {
    setCharges(prev => prev.map(c => {
      if (c.id === chargeId) {
        return {
          ...c,
          status,
          paidAt: paidData?.paidAt || c.paidAt,
          paidAmount: paidData?.paidAmount || c.paidAmount,
          notes: paidData?.notes ? `${c.notes || ''} [Baixa: ${paidData.notes}]` : c.notes,
        };
      }
      return c;
    }));

    showToast(`Status da cobrança atualizado para ${status.toUpperCase()}!`);
  };

  const handleDeleteCharge = (chargeId: string) => {
    setCharges(prev => prev.filter(c => c.id !== chargeId));
    showToast('Cobrança excluída da base de dados.');
  };

  // --- INSTANT WHATSAPP DISPATCH ---
  const handleSendInstantWhatsapp = (charge: Charge) => {
    const newLog: DispatchLog = {
      id: 'log-' + Date.now(),
      chargeId: charge.id,
      clientName: charge.clientName,
      whatsappNumber: charge.clientWhatsapp,
      sentAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      messageContent: `Olá, ${charge.clientName}! Passando para lembrar da cobrança referente a ${charge.description} no valor de R$ ${charge.amount.toFixed(2)} com vencimento em ${charge.dueDate}. Link de pagamento: ${charge.paymentLink}`,
      status: 'entregue',
      triggerType: 'Envio Manual Instantâneo',
    };

    setDispatchLogs(prev => [newLog, ...prev]);
    
    // Increment daily sent count
    setWhatsappConn(prev => ({
      ...prev,
      dailySentCount: prev.dailySentCount + 1,
    }));

    showToast(`Mensagem enviada com sucesso para o WhatsApp de ${charge.clientName}!`);
  };

  // --- TEMPLATE HANDLERS ---
  const handleAddTemplate = (newTpl: Omit<MessageTemplate, 'id'>) => {
    const tpl: MessageTemplate = {
      ...newTpl,
      id: 'tpl-' + Date.now(),
    };
    setTemplates(prev => [...prev, tpl]);
    showToast(`Novo modelo de mensagem "${tpl.title}" criado!`);
  };

  const handleUpdateTemplate = (updatedTpl: MessageTemplate) => {
    setTemplates(prev => prev.map(t => t.id === updatedTpl.id ? updatedTpl : t));
    showToast(`Modelo "${updatedTpl.title}" salvo.`);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    showToast('Modelo removido.');
  };

  const handleToggleRule = (ruleId: string) => {
    setAutomationRules(prev => prev.map(r => r.id === ruleId ? { ...r, isActive: !r.isActive } : r));
    showToast('Regra de automação atualizada.');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900 pb-16">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white border border-slate-700 px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-extrabold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Primary Navigation Header */}
      <CobrancaHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        whatsappConn={whatsappConn}
        onNewChargeClick={() => {
          setPreselectedClientIdForCharge(undefined);
          setActiveTab('cobrancas');
        }}
        onNewClientClick={() => setActiveTab('clientes')}
        onLogoutClick={() => {
          showToast('Sessão encerrada.');
          setActiveTab('dashboard');
        }}
        onBackToPortfolio={() => {
          window.location.href = '/portfolio/cobrancaflow';
        }}
      />

      {/* Main View Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        
        {activeTab === 'dashboard' && (
          <CobrancaDashboard
            charges={charges}
            clients={clients}
            dispatchLogs={dispatchLogs}
            onNewChargeClick={() => {
              setPreselectedClientIdForCharge(undefined);
              setActiveTab('cobrancas');
            }}
            onNewClientClick={() => setActiveTab('clientes')}
            onViewAgendaClick={() => setActiveTab('agenda')}
            onViewOverdueClick={() => setActiveTab('cobrancas')}
            onSendInstantWhatsapp={handleSendInstantWhatsapp}
            onViewChargeDetails={() => setActiveTab('cobrancas')}
          />
        )}

        {activeTab === 'agenda' && (
          <CobrancaAgendaCalendar
            charges={charges}
            onSelectCharge={() => {}}
            onSendInstantWhatsapp={handleSendInstantWhatsapp}
            onNewChargeClick={() => {
              setPreselectedClientIdForCharge(undefined);
              setActiveTab('cobrancas');
            }}
          />
        )}

        {activeTab === 'cobrancas' && (
          <CobrancaListAndForm
            charges={charges}
            clients={clients}
            templates={templates}
            onAddCharge={handleAddCharge}
            onUpdateChargeStatus={handleUpdateChargeStatus}
            onDeleteCharge={handleDeleteCharge}
            onSendInstantWhatsapp={handleSendInstantWhatsapp}
            preselectedClientId={preselectedClientIdForCharge}
          />
        )}

        {activeTab === 'clientes' && (
          <CobrancaClients
            clients={clients}
            charges={charges}
            onAddClient={handleAddClient}
            onUpdateClient={handleUpdateClient}
            onDeleteClient={handleDeleteClient}
            onCreateChargeForClient={handleCreateChargeForClient}
          />
        )}

        {activeTab === 'modelos' && (
          <CobrancaWhatsappTemplates
            templates={templates}
            automationRules={automationRules}
            onAddTemplate={handleAddTemplate}
            onUpdateTemplate={handleUpdateTemplate}
            onDeleteTemplate={handleDeleteTemplate}
            onToggleRule={handleToggleRule}
          />
        )}

        {activeTab === 'logs' && (
          <CobrancaDispatchLogs
            dispatchLogs={dispatchLogs}
            onRetryDispatch={(logId) => {
              showToast('Disparo reprocessado com sucesso!');
            }}
          />
        )}

        {activeTab === 'whatsapp_config' && (
          <CobrancaWhatsappConfig
            whatsappConn={whatsappConn}
            onUpdateConnection={(updated) => {
              setWhatsappConn(updated);
              showToast('Configuração de conexão com o WhatsApp salva!');
            }}
          />
        )}

        {(activeTab === 'relatorios' || activeTab === 'empresa') && (
          <CobrancaReportsCompany
            companySettings={companySettings}
            userRole={userRole}
            onSaveCompanySettings={(newSettings) => {
              setCompanySettings(newSettings);
              showToast('Dados cadastrais da empresa salvos.');
            }}
          />
        )}

      </main>

    </div>
  );
};
