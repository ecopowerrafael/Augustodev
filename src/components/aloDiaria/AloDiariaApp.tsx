import React, { useState } from 'react';
import { 
  UserRole, 
  ClientTab, 
  DiaristaTab, 
  AdminTab, 
  ServiceCategory, 
  DiaristaProfile, 
  ClientProfile, 
  ServiceBooking, 
  WalletTransaction, 
  SupportTicket, 
  AdminMetrics, 
  PlatformSettings,
  ServiceStatus
} from '../../types/aloDiaria';

import { 
  INITIAL_CATEGORIES, 
  INITIAL_DIARISTAS, 
  INITIAL_CLIENT_PROFILE, 
  INITIAL_BOOKINGS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_TICKETS, 
  INITIAL_ADMIN_METRICS, 
  INITIAL_PLATFORM_SETTINGS 
} from '../../data/aloDiariaMockData';

import { AloDiariaHeader } from './AloDiariaHeader';
import { ClientView } from './ClientView';
import { DiaristaView } from './DiaristaView';
import { AdminView } from './AdminView';

import { BookingWizardModal } from './modals/BookingWizardModal';
import { DiaristaDetailModal } from './modals/DiaristaDetailModal';
import { RatingModal } from './modals/RatingModal';

import { CheckCircle2, Sparkles, X } from 'lucide-react';

export const AloDiariaApp: React.FC = () => {
  // Current active role
  const [currentRole, setCurrentRole] = useState<UserRole>('cliente');

  // Navigation tabs
  const [clientTab, setClientTab] = useState<ClientTab>('home');
  const [diaristaTab, setDiaristaTab] = useState<DiaristaTab>('dashboard');
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');

  // Location selector
  const [activeLocation, setActiveLocation] = useState<string>('São Paulo - Moema');

  // Main state collections
  const [categories, setCategories] = useState<ServiceCategory[]>(INITIAL_CATEGORIES);
  const [diaristas, setDiaristas] = useState<DiaristaProfile[]>(INITIAL_DIARISTAS);
  const [clientProfile, setClientProfile] = useState<ClientProfile>(INITIAL_CLIENT_PROFILE);
  const [bookings, setBookings] = useState<ServiceBooking[]>(INITIAL_BOOKINGS);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [adminMetrics, setAdminMetrics] = useState<AdminMetrics>(INITIAL_ADMIN_METRICS);
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>(INITIAL_PLATFORM_SETTINGS);

  // Toast Notification Message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Modals state
  const [isBookingWizardOpen, setIsBookingWizardOpen] = useState<boolean>(false);
  const [preSelectedCategory, setPreSelectedCategory] = useState<ServiceCategory | undefined>(undefined);
  const [preSelectedDiarista, setPreSelectedDiarista] = useState<DiaristaProfile | undefined>(undefined);

  const [isDiaristaDetailOpen, setIsDiaristaDetailOpen] = useState<boolean>(false);
  const [selectedDiaristaForDetail, setSelectedDiaristaForDetail] = useState<DiaristaProfile | undefined>(undefined);

  const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false);
  const [selectedBookingForRating, setSelectedBookingForRating] = useState<ServiceBooking | undefined>(undefined);

  // Open booking wizard
  const handleOpenBookingWizard = (cat?: ServiceCategory, dia?: DiaristaProfile) => {
    setPreSelectedCategory(cat);
    setPreSelectedDiarista(dia);
    setIsBookingWizardOpen(true);
  };

  // Open diarista detail
  const handleOpenDiaristaDetail = (dia: DiaristaProfile) => {
    setSelectedDiaristaForDetail(dia);
    setIsDiaristaDetailOpen(true);
  };

  // Confirm new booking from wizard
  const handleConfirmNewBooking = (bookingData: any) => {
    const newBooking: ServiceBooking = {
      id: `SERV-${Math.floor(8800 + Math.random() * 100)}`,
      clientId: clientProfile.id,
      clientName: clientProfile.name,
      clientPhone: clientProfile.phone,
      clientAddress: bookingData.clientAddress,
      clientNeighborhood: 'Moema',
      diaristaId: bookingData.diaristaId,
      diaristaName: bookingData.diaristaName,
      diaristaPhoto: bookingData.diaristaPhoto,
      diaristaPhone: bookingData.diaristaPhone,
      serviceType: bookingData.serviceType,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      rooms: bookingData.rooms,
      hasPets: bookingData.hasPets,
      petNotes: bookingData.petNotes,
      observations: bookingData.observations,
      estimatedHours: 8,
      baseValue: bookingData.baseValue,
      platformFee: bookingData.platformFee,
      totalValue: bookingData.totalValue,
      paymentMethod: bookingData.paymentMethod,
      paymentStatus: 'pago',
      status: 'solicitado',
      statusHistory: [
        { status: 'solicitado', timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), note: 'Criado no aplicativo' }
      ]
    };

    setBookings([newBooking, ...bookings]);
    showToast(`Diária #${newBooking.id} solicitada com sucesso!`);
  };

  // Advance live booking status (interactive testing)
  const handleAdvanceBookingStatus = (bookingId: string) => {
    const statusFlow: ServiceStatus[] = ['solicitado', 'aceito', 'em_deslocamento', 'em_atendimento', 'finalizado'];

    setBookings(prevBookings => prevBookings.map(b => {
      if (b.id === bookingId) {
        const currentIdx = statusFlow.indexOf(b.status);
        const nextIdx = Math.min(statusFlow.length - 1, currentIdx + 1);
        const nextStatus = statusFlow[nextIdx];

        showToast(`Status da diária #${b.id} alterado para: ${nextStatus.toUpperCase().replace('_', ' ')}`);

        return {
          ...b,
          status: nextStatus,
          statusHistory: [
            ...b.statusHistory,
            { status: nextStatus, timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), note: 'Avançado no protótipo' }
          ]
        };
      }
      return b;
    }));
  };

  // Accept booking (diarista)
  const handleAcceptBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'aceito' as ServiceStatus } : b));
    showToast(`Você aceitou o agendamento #${bookingId}!`);
  };

  // Reject booking (diarista)
  const handleRejectBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelado' as ServiceStatus } : b));
    showToast(`Agendamento #${bookingId} recusado.`);
  };

  // Approve diarista (admin)
  const handleApproveDiarista = (diaristaId: string) => {
    setDiaristas(prev => prev.map(d => d.id === diaristaId ? { ...d, documentsStatus: 'aprovado' } : d));
    showToast('Cadastro de diarista aprovado com Selo de Confiança!');
  };

  // Update platform commission (admin)
  const handleUpdateCommission = (pct: number) => {
    setPlatformSettings({ ...platformSettings, platformCommissionPct: pct });
  };

  // Request payout (diarista)
  const handleRequestPayout = (amount: number) => {
    if (amount <= 0) {
      showToast('Nenhum saldo liberado para saque.');
      return;
    }
    const newTrx: WalletTransaction = {
      id: `TRX-${Math.floor(950 + Math.random() * 50)}`,
      date: new Date().toISOString().split('T')[0],
      description: 'Transferência PIX para Conta Cadastrada',
      amount: -amount,
      type: 'saque',
      status: 'concluido'
    };
    setTransactions([newTrx, ...transactions]);
    showToast(`Saque PIX de R$ ${amount.toFixed(2)} enviado com sucesso!`);
  };

  // Submit Rating
  const handleSubmitRating = (bookingId: string, rating: number, comment: string, favorited: boolean) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          review: {
            rating,
            comment,
            date: new Date().toISOString().replace('T', ' ').substring(0, 16),
            favorited
          }
        };
      }
      return b;
    }));
    showToast('Sua avaliação foi registrada com sucesso! Obrigado ⭐');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col selection:bg-teal-500 selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-3 text-xs font-bold animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="p-1 hover:text-slate-300">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Global Header */}
      <AloDiariaHeader
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          showToast(`Modo alterado para: ${role.toUpperCase()}`);
        }}
        clientTab={clientTab}
        setClientTab={setClientTab}
        diaristaTab={diaristaTab}
        setDiaristaTab={setDiaristaTab}
        adminTab={adminTab}
        setAdminTab={setAdminTab}
        activeLocation={activeLocation}
        setActiveLocation={setActiveLocation}
        unreadNotifications={2}
        onOpenNotifications={() => showToast('Sem novas notificações unread')}
        onBackToPortfolio={() => window.location.href = '/'}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* CLIENT APP VIEW */}
        {currentRole === 'cliente' && (
          <ClientView
            activeTab={clientTab}
            setActiveTab={setClientTab}
            categories={categories}
            diaristas={diaristas}
            clientProfile={clientProfile}
            bookings={bookings}
            activeLocation={activeLocation}
            onOpenBookingWizard={handleOpenBookingWizard}
            onOpenDiaristaDetail={handleOpenDiaristaDetail}
            onOpenPaymentModal={() => showToast('Checkout simulado no agendamento')}
            onOpenRatingModal={(b) => {
              setSelectedBookingForRating(b);
              setIsRatingModalOpen(true);
            }}
            onAdvanceBookingStatus={handleAdvanceBookingStatus}
            showToast={showToast}
          />
        )}

        {/* DIARISTA APP VIEW */}
        {currentRole === 'diarista' && (
          <DiaristaView
            activeTab={diaristaTab}
            setActiveTab={setDiaristaTab}
            diaristaProfile={diaristas[0]}
            bookings={bookings}
            transactions={transactions}
            onAcceptBooking={handleAcceptBooking}
            onRejectBooking={handleRejectBooking}
            onAdvanceBookingStatus={handleAdvanceBookingStatus}
            onRequestPayout={handleRequestPayout}
            showToast={showToast}
          />
        )}

        {/* ADMIN PANEL VIEW */}
        {currentRole === 'admin' && (
          <AdminView
            activeTab={adminTab}
            setActiveTab={setAdminTab}
            metrics={adminMetrics}
            settings={platformSettings}
            onUpdateCommission={handleUpdateCommission}
            clientsList={[clientProfile]}
            diaristasList={diaristas}
            bookingsList={bookings}
            ticketsList={tickets}
            onApproveDiarista={handleApproveDiarista}
            showToast={showToast}
          />
        )}

      </main>

      {/* Booking Wizard Modal */}
      <BookingWizardModal
        isOpen={isBookingWizardOpen}
        onClose={() => setIsBookingWizardOpen(false)}
        categories={categories}
        diaristas={diaristas}
        preSelectedCategory={preSelectedCategory}
        preSelectedDiarista={preSelectedDiarista}
        activeLocation={activeLocation}
        onConfirmBooking={handleConfirmNewBooking}
      />

      {/* Diarista Detail Modal */}
      <DiaristaDetailModal
        isOpen={isDiaristaDetailOpen}
        onClose={() => setIsDiaristaDetailOpen(false)}
        diarista={selectedDiaristaForDetail}
        onBookDiarista={(dia) => handleOpenBookingWizard(undefined, dia)}
      />

      {/* Rating Modal */}
      <RatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        booking={selectedBookingForRating}
        onSubmitRating={handleSubmitRating}
      />

    </div>
  );
};
