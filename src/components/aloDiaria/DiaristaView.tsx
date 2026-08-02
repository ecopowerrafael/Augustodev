import React, { useState } from 'react';
import { 
  DiaristaTab, 
  DiaristaProfile, 
  ServiceBooking, 
  WalletTransaction,
  ServiceStatus 
} from '../../types/aloDiaria';
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
  Plus
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
  const availableBalance = transactions
    .filter(t => t.type === 'ganho' && t.status === 'concluido')
    .reduce((acc, t) => acc + t.amount, 0) - 200; // minus payouts

  const pendingBalance = transactions
    .filter(t => t.type === 'ganho' && t.status === 'pendente')
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="space-y-8 font-sans pb-16">
      
      {/* ------------------------------------------------------------- */}
      {/* TAB 1: DASHBOARD DE RESUMO                                    */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          
          {/* Welcome Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <img
                src={diaristaProfile.photoUrl}
                alt={diaristaProfile.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white/40 shadow-md"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-black">Olá, {diaristaProfile.name.split(' ')[0]}!</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-xs font-bold">
                    Profissional Verificada
                  </span>
                </div>
                <p className="text-xs text-emerald-100 mt-1">
                  Região Principal: <strong>{diaristaProfile.region}</strong> • {diaristaProfile.experienceYears} Anos de Experiência
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={() => setActiveTab('solicitacoes')}
                className="px-5 py-3 bg-white text-emerald-800 font-extrabold text-xs rounded-xl shadow-md transition hover:bg-emerald-50 cursor-pointer flex items-center space-x-2"
              >
                <Inbox className="w-4 h-4" />
                <span>Solicitações ({pendingRequests.length})</span>
              </button>
            </div>
          </div>

          {/* 4 KPI Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold uppercase">Ganhos do Mês</span>
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-slate-900">R$ {availableBalance + pendingBalance}</p>
              <p className="text-[11px] text-emerald-700 font-semibold">+18% em relação ao mês anterior</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold uppercase">Próximos Serviços</span>
                <Calendar className="w-5 h-5 text-teal-600" />
              </div>
              <p className="text-2xl font-black text-slate-900">{bookings.filter(b => b.status === 'aceito').length}</p>
              <p className="text-[11px] text-slate-500">Agendados para esta semana</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold uppercase">Serviços Concluídos</span>
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-2xl font-black text-slate-900">{diaristaProfile.completedJobsCount}</p>
              <p className="text-[11px] text-blue-700 font-semibold">100% de pontualidade no check-in</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-extrabold uppercase">Avaliação Média</span>
                <Star className="w-5 h-5 text-amber-500 fill-current" />
              </div>
              <p className="text-2xl font-black text-slate-900">{diaristaProfile.rating.toFixed(1)} ⭐️</p>
              <p className="text-[11px] text-amber-700 font-semibold">Baseado em {diaristaProfile.reviewsCount} avaliações</p>
            </div>

          </div>

          {/* Quick Active Service Widget */}
          {activeJob && (
            <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-amber-900 font-black text-sm">
                  <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                  <span>Você tem uma diária ativa agendada!</span>
                </div>

                <span className="px-3 py-1 bg-amber-200 text-amber-900 font-extrabold text-xs rounded-full">
                  Status: {activeJob.status.toUpperCase().replace('_', ' ')}
                </span>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border border-amber-100">
                <div>
                  <h4 className="font-extrabold text-base text-slate-900">{activeJob.clientName}</h4>
                  <p className="text-xs text-slate-600">{activeJob.clientAddress} • {activeJob.serviceType}</p>
                  <p className="text-xs font-bold text-emerald-700 mt-1">Valor da Diária: R$ {activeJob.baseValue}</p>
                </div>

                <button
                  onClick={() => setActiveTab('servico_ativo')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer shrink-0"
                >
                  Gerenciar Atendimento e Check-in
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: SOLICITAÇÕES DE SERVIÇO                                 */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'solicitacoes' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Novas Solicitações de Clientes</h2>
              <p className="text-xs text-slate-500">Aceite ou recuse novos agendamentos na sua região de atendimento</p>
            </div>

            {pendingRequests.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <p className="font-bold text-sm text-slate-700">Sem solicitações pendentes no momento.</p>
                <p className="text-xs text-slate-500">Assim que um cliente solicitar uma diária no seu bairro, aparecerá aqui!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 transition space-y-4 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] uppercase font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                          {req.serviceType}
                        </span>
                        <h3 className="font-black text-base text-slate-900 mt-1">{req.clientName}</h3>
                        <p className="text-xs text-slate-500">{req.clientAddress}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-400 block font-medium">Seu Ganho Líquido</span>
                        <span className="text-xl font-black text-emerald-700">R$ {req.baseValue}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-400 block font-medium">Data & Horário:</span>
                        <strong className="text-slate-800">{req.date} ({req.timeSlot})</strong>
                      </div>

                      <div>
                        <span className="text-slate-400 block font-medium">Cômodos:</span>
                        <strong className="text-slate-800">{req.rooms.bedrooms} Quarto(s), {req.rooms.bathrooms} Banheiro(s)</strong>
                      </div>

                      <div>
                        <span className="text-slate-400 block font-medium">Animais no local:</span>
                        <strong className="text-slate-800">{req.hasPets ? 'Sim 🐕' : 'Não'}</strong>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                      <button
                        onClick={() => onRejectBooking(req.id)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer flex items-center space-x-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Recusar</span>
                      </button>

                      <button
                        onClick={() => onAcceptBooking(req.id)}
                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition cursor-pointer flex items-center space-x-1 shadow-md"
                      >
                        <Check className="w-4 h-4" />
                        <span>Aceitar Agendamento</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: AGENDA E CONTROLE DE DISPONIBILIDADE                   */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'agenda' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Sua Agenda de Disponibilidade</h2>
              <p className="text-xs text-slate-500">Marque os dias em que você pode receber solicitações de diárias</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((day) => {
                const isAvailable = availableDays.includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`p-4 rounded-2xl border text-center font-extrabold text-xs transition cursor-pointer flex flex-col items-center justify-center space-y-2 ${
                      isAvailable
                        ? 'bg-teal-50 border-teal-300 text-teal-800 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <span>{day}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      isAvailable ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {isAvailable ? 'Disponível' : 'Folga'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: SERVIÇO EM ANDAMENTO (LIVE ATENDIMENTO)                */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'servico_ativo' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Atendimento em Andamento</h2>
              <p className="text-xs text-slate-500">Controle o check-in e check-out da sua diária ao vivo</p>
            </div>

            {activeJob ? (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                      Status Atual: {activeJob.status.toUpperCase().replace('_', ' ')}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-2">{activeJob.clientName}</h3>
                    <p className="text-xs text-slate-600">{activeJob.clientAddress}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-medium">Valor da Diária</span>
                    <span className="text-2xl font-black text-emerald-700">R$ {activeJob.baseValue}</span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                  <h4 className="font-extrabold text-xs text-slate-500 uppercase tracking-wider">Ações de Progresso do Atendimento:</h4>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => onAdvanceBookingStatus(activeJob.id)}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md cursor-pointer flex items-center space-x-2"
                    >
                      <span>Avançar Próxima Etapa</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                <p className="font-bold text-sm text-slate-700">Nenhum serviço em andamento no momento.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: CARTEIRA E GANHOS                                      */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'carteira' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Carteira & Extrato Financeiro</h2>
              <p className="text-xs text-slate-500">Acompanhe seus repasses via PIX e valores liberados</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-600 text-white space-y-2 shadow-md">
                <span className="text-xs font-bold text-emerald-100 uppercase">Saldo Liberado p/ Saque</span>
                <p className="text-3xl font-black">R$ {availableBalance}</p>
                <button
                  onClick={() => onRequestPayout(availableBalance)}
                  className="w-full mt-3 py-2 bg-white text-emerald-800 font-extrabold text-xs rounded-xl hover:bg-emerald-50 transition cursor-pointer"
                >
                  Solicitar Saque PIX Instantâneo
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Valores em Garantia (A Liberar)</span>
                <p className="text-3xl font-black text-slate-900">R$ {pendingBalance}</p>
                <p className="text-[11px] text-slate-500">Liberado imediatamente após término do serviço</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Chave PIX Cadastrada</span>
                <p className="text-sm font-black text-slate-900 font-mono">CPF: {diaristaProfile.cpf}</p>
                <p className="text-[11px] text-teal-700 font-bold">Banco Itaú Unibanco S.A.</p>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-sm text-slate-900">Histórico de Lançamentos</h3>
              <div className="space-y-2">
                {transactions.map((trx) => (
                  <div key={trx.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-slate-900 block">{trx.description}</strong>
                      <span className="text-slate-500">{trx.date} • {trx.id}</span>
                    </div>

                    <span className={`font-black text-sm ${
                      trx.amount > 0 ? 'text-emerald-700' : 'text-rose-600'
                    }`}>
                      {trx.amount > 0 ? `+ R$ ${trx.amount}` : `- R$ ${Math.abs(trx.amount)}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 6: STATUS DO CADASTRO E APROVAÇÃO                          */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'cadastro_status' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">Status da Sua Conta Dona Maria</h2>
                <p className="text-xs text-slate-500">Processo de verificação e auditoria de antecedentes</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-black text-sm text-emerald-950">Sua conta está 100% APROVADA!</h4>
                <p className="text-xs text-emerald-800">
                  Documentos auditados, atestado de antecedentes verificado. Seu selo de confiança está ativo no perfil do aplicativo.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <strong className="text-slate-900 block font-bold">Documento de Identidade (RG/CNH):</strong>
                <span className="text-emerald-700 font-extrabold">✓ Auditado e Confirmado</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <strong className="text-slate-900 block font-bold">Atestado de Antecedentes Criminais:</strong>
                <span className="text-emerald-700 font-extrabold">✓ Nada Consta - Válido até 2027</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 7: PERFIL PÚBLICO PREVIEW                                 */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'perfil_publico' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6 max-w-3xl mx-auto">
            <div className="text-center space-y-2 border-b border-slate-100 pb-6">
              <img
                src={diaristaProfile.photoUrl}
                alt={diaristaProfile.name}
                className="w-24 h-24 rounded-3xl object-cover border-4 border-emerald-500 shadow-lg mx-auto"
              />
              <h2 className="text-2xl font-black text-slate-900 flex items-center justify-center space-x-1.5">
                <span>{diaristaProfile.name}</span>
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </h2>
              <p className="text-xs text-slate-500">{diaristaProfile.region} • {diaristaProfile.experienceYears} Anos de Experiência</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs text-slate-700">
              <strong className="text-slate-900 font-bold block">Sobre Mim:</strong>
              <p className="leading-relaxed">{diaristaProfile.bio}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
