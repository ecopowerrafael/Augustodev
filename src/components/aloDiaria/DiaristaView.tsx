import React, { useState } from 'react';
import { 
  DiaristaTab, 
  DiaristaProfile, 
  ServiceBooking, 
  WalletTransaction,
  ServiceStatus 
} from '../../types/aloDiaria';
import { AloDiariaLogo } from './AloDiariaLogo';
import { 
  Sparkles, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Star, 
  Clock, 
  MapPin, 
  UserCheck, 
  FileText, 
  Wallet, 
  TrendingUp, 
  Inbox, 
  Check, 
  X, 
  Eye, 
  Phone, 
  ShieldCheck, 
  Award, 
  ArrowUpRight, 
  AlertCircle,
  ChevronRight,
  Send,
  Plus,
  HelpCircle,
  MessageSquare
} from 'lucide-react';

interface DiaristaViewProps {
  activeTab: DiaristaTab;
  setActiveTab: (tab: DiaristaTab) => void;
  diaristaProfile: DiaristaProfile;
  bookings: ServiceBooking[];
  transactions: WalletTransaction[];
  onAcceptBooking: (bookingId: string) => void;
  onRejectBooking: (bookingId: string) => void;
  onAdvanceBookingStatus: (bookingId: string) => void;
  onRequestPayout: (amount: number) => void;
  onOpenDiaristaModal: () => void;
  showToast: (msg: string) => void;
}

export const DiaristaView: React.FC<DiaristaViewProps> = ({
  activeTab,
  setActiveTab,
  diaristaProfile,
  bookings,
  transactions,
  onAcceptBooking,
  onRejectBooking,
  onAdvanceBookingStatus,
  onRequestPayout,
  onOpenDiaristaModal,
  showToast
}) => {
  // Local state for availability days toggle
  const [availableDays, setAvailableDays] = useState<string[]>(diaristaProfile.availableDays);

  const toggleDay = (day: string) => {
    if (availableDays.includes(day)) {
      setAvailableDays(availableDays.filter(d => d !== day));
      showToast(`Dia ${day} removido da sua agenda pública`);
    } else {
      setAvailableDays([...availableDays, day]);
      showToast(`Dia ${day} adicionado à sua agenda pública!`);
    }
  };

  // Pending requests for this diarista
  const pendingRequests = bookings.filter(b => b.status === 'solicitado');
  
  // Active job in progress
  const activeJob = bookings.find(b => b.status === 'em_deslocamento' || b.status === 'em_atendimento' || b.status === 'aceito');

  // Wallet math
  const availableBalance = 320;
  const pendingBalance = 180;

  return (
    <div className="space-y-8 font-sans pb-16">
      
      {/* ONBOARDING REGISTRATION BANNER (IMAGE 4) */}
      <div className="p-4 rounded-2xl bg-[#4C1D95] text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-800 flex items-center justify-center text-[#EC4899] shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-white">Cadastro de Diarista em 15 Passos</h3>
            <p className="text-xs text-purple-200">
              Configure sua experiência, valores, disponibilidade, chave Pix e documentos verificados.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenDiaristaModal}
          className="px-4 py-2 bg-[#EC4899] hover:bg-pink-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition shrink-0 cursor-pointer flex items-center space-x-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ver / Refazer Cadastro (15 Passos)</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: DASHBOARD DE RESUMO (IMAGE 5)                          */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          
          {/* Welcome & Balance Banner (Image 5 Top) */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#4C1D95] via-purple-900 to-[#3B0764] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <img
                src={diaristaProfile.photoUrl}
                alt={diaristaProfile.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white/40 shadow-md"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-black">Olá, {diaristaProfile.name.split(' ')[0]}! 👋</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                    Aprovada
                  </span>
                </div>
                <p className="text-xs text-purple-200 mt-1">
                  Pronta para receber novas oportunidades? • Região: <strong>{diaristaProfile.region}</strong>
                </p>
              </div>
            </div>

            {/* Wallet Balance Pill */}
            <div 
              onClick={() => setActiveTab('carteira')}
              className="p-4 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-md cursor-pointer hover:bg-white/20 transition space-y-1 shrink-0"
            >
              <span className="text-[10px] text-purple-200 font-bold uppercase block">Meu Saldo Disponível</span>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black text-emerald-300">R$ {availableBalance.toFixed(2)}</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Quick Action Buttons Grid (Image 5) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => setActiveTab('solicitacoes')}
              className="p-4 bg-white rounded-2xl border border-purple-100 shadow-xs hover:border-[#4C1D95] transition text-left space-y-2 cursor-pointer relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">🔔</span>
                <span className="px-2 py-0.5 bg-[#EC4899] text-white text-[10px] font-black rounded-full">
                  1 Nova
                </span>
              </div>
              <p className="font-extrabold text-xs text-slate-900">Solicitações</p>
            </button>

            <button
              onClick={() => setActiveTab('agenda')}
              className="p-4 bg-white rounded-2xl border border-purple-100 shadow-xs hover:border-[#4C1D95] transition text-left space-y-2 cursor-pointer"
            >
              <span className="text-xl">📅</span>
              <p className="font-extrabold text-xs text-slate-900">Agenda da Semana</p>
            </button>

            <button
              onClick={() => setActiveTab('carteira')}
              className="p-4 bg-white rounded-2xl border border-purple-100 shadow-xs hover:border-[#4C1D95] transition text-left space-y-2 cursor-pointer"
            >
              <span className="text-xl">💰</span>
              <p className="font-extrabold text-xs text-slate-900">Ganhos & Saques</p>
            </button>

            <button
              onClick={() => setActiveTab('perfil_publico')}
              className="p-4 bg-white rounded-2xl border border-purple-100 shadow-xs hover:border-[#4C1D95] transition text-left space-y-2 cursor-pointer"
            >
              <span className="text-xl">⭐</span>
              <p className="font-extrabold text-xs text-slate-900">Avaliações (4.9)</p>
            </button>
          </div>

          {/* REAL-TIME JOB REQUEST CARD (IMAGE 5) */}
          <div className="bg-white rounded-3xl border-2 border-purple-200 p-6 md:p-8 shadow-lg space-y-6 relative overflow-hidden">
            
            {/* Header badges */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-4 border-b border-purple-100">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-lg font-black text-slate-900">Nova Solicitação de Serviço!</h2>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-purple-100 text-[#4C1D95] text-xs font-black rounded-full">
                  Pagamento Garantido
                </span>
                <span className="px-3 py-1 bg-pink-50 text-[#E11D48] text-xs font-black rounded-full border border-pink-200">
                  ⏱️ 02:58 para responder
                </span>
              </div>
            </div>

            {/* Client Profile */}
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                alt=""
                className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-100"
              />
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Juliana Silva</h3>
                <div className="flex items-center space-x-1 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-900">4.9</span>
                  <span className="text-slate-400">(23 avaliações • Cliente VIP)</span>
                </div>
              </div>
            </div>

            {/* Service details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-purple-50/60 p-4 rounded-2xl border border-purple-100">
              <div>
                <span className="text-slate-400 font-bold block">Tipo de Serviço:</span>
                <strong className="text-slate-900 text-sm">Limpeza Residencial Completa</strong>
              </div>

              <div>
                <span className="text-slate-400 font-bold block">Data & Horário:</span>
                <strong className="text-slate-900">18/05/2025 (09:00 às 17:00 - 8h)</strong>
              </div>

              <div>
                <span className="text-slate-400 font-bold block">Endereço do Imóvel:</span>
                <strong className="text-slate-900">Rua das Flores, 123 - Vila Mariana, SP</strong>
              </div>

              <div>
                <span className="text-slate-400 font-bold block">Valor do Serviço:</span>
                <strong className="text-emerald-700 text-base font-black">R$ 180,00 (Pago via Pix)</strong>
              </div>
            </div>

            {/* Client Notes */}
            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 space-y-1">
              <strong>Observação da Cliente:</strong>
              <p>"Preciso de uma limpeza completa da casa. Atenção especial para a cozinha e os banheiros."</p>
            </div>

            {/* Pix Guarantee Banner */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>O pagamento já foi realizado pela cliente e está protegido pela plataforma até a conclusão do serviço. Pix 100% seguro.</span>
            </div>

            {/* Accept & Reject Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onRejectBooking('SERV-8801')}
                className="flex-1 py-3.5 px-4 bg-white border-2 border-[#EC4899] text-[#EC4899] hover:bg-pink-50 font-extrabold text-xs uppercase tracking-wider rounded-2xl transition cursor-pointer flex items-center justify-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Recusar Serviço</span>
              </button>

              <button
                onClick={() => onAcceptBooking('SERV-8801')}
                className="flex-1 py-3.5 px-4 bg-[#4C1D95] hover:bg-purple-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-md transition cursor-pointer flex items-center justify-center space-x-2"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Aceitar Serviço</span>
              </button>
            </div>

          </div>

          {/* Upcoming Schedule List */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-900">Seus Próximos Serviços Confirmados</h3>

            <div className="space-y-3">
              {bookings.filter(b => b.status === 'aceito').map((job) => (
                <div key={job.id} className="p-4 bg-white rounded-2xl border border-purple-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#4C1D95] font-black flex items-center justify-center text-sm">
                      {job.date.split('-')[2]}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{job.clientName} • {job.serviceType}</h4>
                      <p className="text-slate-500">{job.clientAddress} • {job.timeSlot}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="font-black text-emerald-700 text-sm">R$ {job.baseValue}</span>
                    <button
                      onClick={() => onAdvanceBookingStatus(job.id)}
                      className="px-4 py-2 bg-[#4C1D95] text-white font-bold rounded-xl hover:bg-purple-900 transition cursor-pointer"
                    >
                      Iniciar Deslocamento
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Support Card */}
          <div className="p-5 bg-purple-50 rounded-2xl border border-purple-100 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <HelpCircle className="w-6 h-6 text-[#4C1D95]" />
              <div>
                <strong className="font-extrabold text-slate-900 block">Precisa de ajuda com alguma diária?</strong>
                <span className="text-slate-500">Nosso suporte responde em menos de 5 minutos pelo WhatsApp.</span>
              </div>
            </div>

            <button 
              onClick={() => showToast('Abrindo suporte prioritário Alô Diária...')}
              className="px-4 py-2 bg-[#4C1D95] text-white font-bold rounded-xl hover:bg-purple-900 transition cursor-pointer"
            >
              Falar com Suporte
            </button>
          </div>

        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: SOLICITAÇÕES PENDENTES                                 */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'solicitacoes' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900">Solicitações de Serviços</h2>
            <p className="text-xs text-slate-500">Aceite ou recuse novos agendamentos das patroas em tempo real</p>
          </div>

          <div className="space-y-4">
            {pendingRequests.map((req) => (
              <div key={req.id} className="p-6 bg-white rounded-3xl border border-purple-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-black text-slate-900 text-base">{req.serviceType}</h3>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                    Pix Confirmado pela Cliente
                  </span>
                </div>

                <p className="text-xs text-slate-600">
                  Cliente: <strong>{req.clientName}</strong> • {req.clientAddress}
                </p>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-black text-emerald-700">R$ {req.baseValue}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onRejectBooking(req.id)}
                      className="px-4 py-2 border-2 border-[#EC4899] text-[#EC4899] font-bold text-xs rounded-xl hover:bg-pink-50 transition cursor-pointer"
                    >
                      Recusar
                    </button>
                    <button
                      onClick={() => onAcceptBooking(req.id)}
                      className="px-6 py-2 bg-[#4C1D95] text-white font-extrabold text-xs rounded-xl hover:bg-purple-900 transition cursor-pointer"
                    >
                      Aceitar Serviço
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: CARTEIRA & GANHOS                                      */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'carteira' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900">Carteira Digital & Repasses Pix</h2>
            <p className="text-xs text-slate-500">Acompanhe seus valores disponíveis e solicite saques instantâneos</p>
          </div>

          <div className="p-6 bg-gradient-to-r from-[#4C1D95] to-purple-900 rounded-3xl text-white space-y-4 shadow-xl">
            <span className="text-xs font-bold uppercase text-purple-200">Saldo Disponível para Saque Pix</span>
            <h3 className="text-4xl font-black text-emerald-300">R$ {availableBalance.toFixed(2)}</h3>
            <p className="text-xs text-purple-200">Sua Chave Pix cadastrada: <strong>123.456.789-00 (CPF)</strong></p>

            <button
              onClick={() => onRequestPayout(availableBalance)}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md"
            >
              Solicitar Transferência Pix Agora
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
