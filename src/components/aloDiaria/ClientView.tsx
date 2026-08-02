import React, { useState } from 'react';
import { 
  ClientTab, 
  ServiceCategory, 
  DiaristaProfile, 
  ClientProfile, 
  ServiceBooking, 
  RoomDetails,
  ServiceStatus
} from '../../types/aloDiaria';
import { 
  Sparkles, 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Heart, 
  Plus, 
  Minus, 
  Dog, 
  CreditCard, 
  QrCode, 
  Wallet, 
  Phone, 
  Send, 
  User, 
  History, 
  AlertCircle,
  X,
  Flame,
  Shirt,
  Home as HomeIcon,
  Grid,
  Filter,
  Check,
  Award,
  ThumbsUp
} from 'lucide-react';

interface ClientViewProps {
  activeTab: ClientTab;
  setActiveTab: (tab: ClientTab) => void;
  categories: ServiceCategory[];
  diaristas: DiaristaProfile[];
  clientProfile: ClientProfile;
  bookings: ServiceBooking[];
  activeLocation: string;
  onOpenBookingWizard: (category?: ServiceCategory, diarista?: DiaristaProfile) => void;
  onOpenDiaristaDetail: (diarista: DiaristaProfile) => void;
  onOpenPaymentModal: (booking: ServiceBooking) => void;
  onOpenRatingModal: (booking: ServiceBooking) => void;
  onAdvanceBookingStatus: (bookingId: string) => void;
  showToast: (msg: string) => void;
}

export const ClientView: React.FC<ClientViewProps> = ({
  activeTab,
  setActiveTab,
  categories,
  diaristas,
  clientProfile,
  bookings,
  activeLocation,
  onOpenBookingWizard,
  onOpenDiaristaDetail,
  onOpenPaymentModal,
  onOpenRatingModal,
  onAdvanceBookingStatus,
  showToast
}) => {
  // Search & Filter state for Diaristas search tab
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Todas');
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [minRating, setMinRating] = useState<number>(4.0);

  // Favorite diaristas state
  const [favorites, setFavorites] = useState<string[]>(['dia-101', 'dia-103']);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id));
      showToast('Removido dos profissionais favoritos');
    } else {
      setFavorites([...favorites, id]);
      showToast('Adicionado aos profissionais favoritos ⭐');
    }
  };

  // Filtered diaristas
  const filteredDiaristas = diaristas.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'Todas' || d.specialties.includes(selectedSpecialty);
    const matchesDistance = d.distanceKm <= maxDistance;
    const matchesRating = d.rating >= minRating;
    return matchesSearch && matchesSpecialty && matchesDistance && matchesRating;
  });

  // Latest active booking for live tracking
  const activeBooking = bookings.find(b => b.status !== 'finalizado' && b.status !== 'cancelado') || bookings[0];

  return (
    <div className="space-y-8 font-sans pb-16">
      
      {/* ------------------------------------------------------------- */}
      {/* TAB 1: HOME / TELA INICIAL                                    */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'home' && (
        <div className="space-y-8">
          
          {/* Main Hero Banner */}
          <div className="relative rounded-3xl bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-800 p-6 sm:p-10 text-white overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-teal-100 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Diárias com garantia & profissionais verificadas</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Sua casa impecável com as melhores diaristas da sua região.
              </h1>

              <p className="text-sm text-teal-100 leading-relaxed">
                Agendamento simples em menos de 2 minutos. Profissionais com antecedente criminal verificado, avaliação 5 estrelas e seguro de proteção inclusos.
              </p>

              {/* Quick Search Card inside Hero */}
              <div className="pt-2">
                <div className="bg-white p-3 rounded-2xl shadow-lg border border-teal-100 flex flex-col md:flex-row items-stretch gap-2 text-slate-800">
                  <div className="flex-1 flex items-center space-x-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
                    <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                    <input 
                      type="text" 
                      defaultValue={activeLocation} 
                      className="bg-transparent text-xs font-medium w-full focus:outline-none"
                      placeholder="Qual o seu endereço?"
                    />
                  </div>

                  <div className="flex-1 flex items-center space-x-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
                    <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
                    <input 
                      type="date" 
                      defaultValue="2026-08-04"
                      className="bg-transparent text-xs font-medium w-full focus:outline-none"
                    />
                  </div>

                  <button 
                    onClick={() => onOpenBookingWizard()}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center space-x-2 cursor-pointer shrink-0"
                  >
                    <Search className="w-4 h-4" />
                    <span>Buscar Diárias</span>
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-teal-100/90">
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>Documentos 100% Auditados</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Satisfação Garantida ou Refazemos</span>
                </span>
              </div>
            </div>
          </div>

          {/* Available Slots & Counter Indicator */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-emerald-950">
                  18 Diaristas Disponíveis Hoje em Moema & Região
                </h4>
                <p className="text-xs text-emerald-700">
                  Agende até as 17:00 para diárias de amanhã cedo. Sem taxa de cancelamento em até 24h.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('buscar')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition shrink-0 cursor-pointer"
            >
              Ver Diaristas Próximas
            </button>
          </div>

          {/* Featured Services Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Serviços em Destaque</h2>
                <p className="text-xs text-slate-500">Escolha o tipo de diária ideal para o seu momento</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div 
                  key={cat.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-teal-300 transition space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold group-hover:bg-teal-600 group-hover:text-white transition">
                        {cat.iconName === 'Sparkles' && <Sparkles className="w-5 h-5" />}
                        {cat.iconName === 'Flame' && <Flame className="w-5 h-5" />}
                        {cat.iconName === 'Shirt' && <Shirt className="w-5 h-5" />}
                        {cat.iconName === 'Home' && <HomeIcon className="w-5 h-5" />}
                        {cat.iconName === 'Grid' && <Grid className="w-5 h-5" />}
                      </div>

                      {cat.popular && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                          Mais Solicitado 🔥
                        </span>
                      )}
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900">{cat.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{cat.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">A partir de</span>
                      <span className="text-lg font-black text-slate-900">R$ {cat.basePrice}</span>
                      <span className="text-xs text-slate-500"> /diária</span>
                    </div>

                    <button
                      onClick={() => onOpenBookingWizard(cat)}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition flex items-center space-x-1 cursor-pointer shadow-xs"
                    >
                      <span>Solicitar</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Promotions / Coupons Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-extrabold uppercase tracking-wider backdrop-blur-md">
                Cupom Primeira Diária 🎁
              </span>
              <h3 className="text-xl font-black">Ganhe R$ 20,00 de Desconto!</h3>
              <p className="text-xs text-amber-100 max-w-xl">
                Use o cupom <strong className="font-mono underline">DONAMARIA20</strong> na tela de agendamento e experimente a melhor faxina da sua região.
              </p>
            </div>

            <button
              onClick={() => onOpenBookingWizard()}
              className="px-6 py-3 bg-white text-orange-600 hover:bg-orange-50 font-black text-xs uppercase tracking-wider rounded-2xl shadow-md transition cursor-pointer shrink-0"
            >
              Usar Cupom Agora
            </button>
          </div>

          {/* Featured Top Diaristas Strip */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Diaristas Recomendadas</h2>
                <p className="text-xs text-slate-500">Avaliações reais e selo de garantia de qualidade</p>
              </div>

              <button
                onClick={() => setActiveTab('buscar')}
                className="text-xs font-extrabold text-teal-700 hover:text-teal-800 flex items-center space-x-1 cursor-pointer"
              >
                <span>Ver todas</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {diaristas.slice(0, 2).map((d) => (
                <div 
                  key={d.id}
                  onClick={() => onOpenDiaristaDetail(d)}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-teal-400 hover:shadow-md transition cursor-pointer flex gap-4"
                >
                  <img 
                    src={d.photoUrl} 
                    alt={d.name}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-slate-200 shadow-xs" 
                  />

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 flex items-center space-x-1.5">
                          <span>{d.name}</span>
                          <span title="Verificada"><ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /></span>
                        </h4>
                        <p className="text-xs text-slate-500">{d.neighborhood} • {d.distanceKm} km</p>
                      </div>

                      <button 
                        onClick={(e) => toggleFavorite(d.id, e)}
                        className={`p-1.5 rounded-full transition cursor-pointer ${
                          favorites.includes(d.id) ? 'text-rose-500 bg-rose-50' : 'text-slate-300 hover:text-slate-400'
                        }`}
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-3 text-xs">
                      <span className="flex items-center text-amber-500 font-extrabold">
                        <Star className="w-3.5 h-3.5 fill-current mr-1" />
                        {d.rating.toFixed(1)} <span className="text-slate-400 font-normal ml-1">({d.reviewsCount})</span>
                      </span>

                      <span className="text-slate-300">•</span>
                      <span className="text-slate-600 font-semibold">{d.experienceYears} anos de exp.</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-black text-slate-900 text-sm">
                        R$ {d.avgDailyRate} <span className="text-[10px] text-slate-500 font-normal">/diária</span>
                      </span>

                      <button className="px-3 py-1 bg-teal-50 text-teal-700 font-bold text-xs rounded-lg hover:bg-teal-100 transition">
                        Ver Agenda
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: BUSCA E FILTRO DE DIARISTAS                            */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'buscar' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Buscar Diaristas em SP</h2>
                <p className="text-xs text-slate-500">Encontre profissionais auditadas e disponíveis para contratação direta</p>
              </div>

              {/* Search input */}
              <div className="relative min-w-[280px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou bairro..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Filter controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div>
                <label className="text-slate-500 block mb-1">Especialidade</label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                >
                  <option value="Todas">Todas as Especialidades</option>
                  <option value="Faxina Completa">Faxina Completa</option>
                  <option value="Passadeira de Roupas">Passadeira de Roupas</option>
                  <option value="Cuidado com Pets">Gosta de Pets</option>
                  <option value="Organização de Armários">Personal Organizer</option>
                </select>
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Distância Máxima ({maxDistance} km)</label>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Nota Mínima ({minRating.toFixed(1)} ⭐️)</label>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                >
                  <option value={4.0}>4.0 + Estrelas</option>
                  <option value={4.5}>4.5 + Estrelas</option>
                  <option value={4.8}>4.8 + Estrelas (Super Diaristas)</option>
                  <option value={5.0}>Apenas 5.0 Estrelas</option>
                </select>
              </div>
            </div>
          </div>

          {/* Diaristas List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDiaristas.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-teal-400 hover:shadow-md transition overflow-hidden flex flex-col justify-between"
              >
                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={d.photoUrl}
                        alt={d.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
                      />
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-900 flex items-center space-x-1">
                          <span>{d.name}</span>
                          <span title="Verificada"><ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /></span>
                        </h3>
                        <p className="text-xs text-slate-500">{d.neighborhood} • {d.distanceKm} km</p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => toggleFavorite(d.id, e)}
                      className={`p-1.5 rounded-full transition cursor-pointer ${
                        favorites.includes(d.id) ? 'text-rose-500 bg-rose-50' : 'text-slate-300 hover:text-slate-400'
                      }`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {d.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {d.specialties.slice(0, 3).map((sp, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                        {sp}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                    <div className="flex items-center space-x-1 text-amber-500 font-extrabold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{d.rating.toFixed(1)}</span>
                      <span className="text-slate-400 font-normal">({d.reviewsCount} avaliações)</span>
                    </div>

                    <span className="text-slate-600 font-medium">{d.experienceYears} anos exp.</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Valor Médio</span>
                    <span className="text-base font-black text-slate-900">R$ {d.avgDailyRate}</span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => onOpenDiaristaDetail(d)}
                      className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition"
                    >
                      Perfil
                    </button>
                    <button
                      onClick={() => onOpenBookingWizard(undefined, d)}
                      className="px-3 py-1.5 bg-teal-600 text-white font-bold text-xs rounded-xl hover:bg-teal-700 transition"
                    >
                      Agendar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: ACOMPANHAMENTO AO VIVO DO AGENDAMENTO                   */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'agendamentos' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Acompanhamento em Tempo Real</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Status da Diária #{activeBooking.id}</h2>
                <p className="text-xs text-slate-500">Acompanhe a chegada e o andamento dos serviços na sua residência</p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">Data Agendada</span>
                <span className="font-extrabold text-sm text-slate-900">{activeBooking.date} • {activeBooking.timeSlot}</span>
              </div>
            </div>

            {/* Interactive Progress Pipeline Bar */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h4 className="font-extrabold text-xs text-slate-500 uppercase tracking-wider">Etapas do Atendimento</h4>

              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                
                <StatusStep 
                  label="Solicitado" 
                  stepStatus="solicitado" 
                  currentStatus={activeBooking.status} 
                  icon={Calendar} 
                />
                
                <StatusStep 
                  label="Aceito" 
                  stepStatus="aceito" 
                  currentStatus={activeBooking.status} 
                  icon={CheckCircle2} 
                />
                
                <StatusStep 
                  label="Deslocamento" 
                  stepStatus="em_deslocamento" 
                  currentStatus={activeBooking.status} 
                  icon={Clock} 
                />
                
                <StatusStep 
                  label="Em Atendimento" 
                  stepStatus="em_atendimento" 
                  currentStatus={activeBooking.status} 
                  icon={Sparkles} 
                />

                <StatusStep 
                  label="Finalizado" 
                  stepStatus="finalizado" 
                  currentStatus={activeBooking.status} 
                  icon={Award} 
                />

              </div>

              {/* Status Simulation Bar for Testing */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-slate-700">Simulação Interativa do Protótipo:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => onAdvanceBookingStatus(activeBooking.id)}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition shadow-xs cursor-pointer"
                  >
                    Avançar Etapa Atual ➔
                  </button>
                </div>
              </div>
            </div>

            {/* Assigned Diarista Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="md:col-span-2 p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                <h4 className="font-black text-sm text-slate-900 border-b border-slate-100 pb-2">Profissional Designada</h4>

                <div className="flex items-center space-x-4">
                  <img
                    src={activeBooking.diaristaPhoto || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'}
                    alt={activeBooking.diaristaName}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs"
                  />
                  <div>
                    <h3 className="font-black text-base text-slate-900 flex items-center space-x-1.5">
                      <span>{activeBooking.diaristaName}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </h3>
                    <p className="text-xs text-slate-500">Telefone: {activeBooking.diaristaPhone}</p>
                    <div className="flex items-center space-x-2 text-xs mt-1">
                      <span className="text-amber-500 font-bold flex items-center">
                        <Star className="w-3.5 h-3.5 fill-current mr-0.5" /> 4.9
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-emerald-700 font-semibold">Garantia Dona Maria Ativa</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-teal-50/60 rounded-xl text-xs text-teal-800 flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Precisa de algo? Fale diretamente com a diarista via WhatsApp ou ligue para o suporte.</span>
                </div>
              </div>

              {/* Service Details Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <h4 className="font-black text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200 pb-2">Resumo da Diária</h4>

                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tipo de Limpeza:</span>
                    <strong className="text-slate-900">{activeBooking.serviceType}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Endereço:</span>
                    <strong className="text-slate-900 text-right truncate max-w-[150px]">{activeBooking.clientAddress}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Cômodos:</span>
                    <strong className="text-slate-900">
                      {activeBooking.rooms.bedrooms}Q, {activeBooking.rooms.bathrooms}B, {activeBooking.rooms.kitchens}C, {activeBooking.rooms.livingRooms}S
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Possui Pets:</span>
                    <strong className="text-slate-900">{activeBooking.hasPets ? 'Sim 🐕' : 'Não'}</strong>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
                    <span>Valor Total Paid:</span>
                    <span className="text-emerald-700">R$ {activeBooking.totalValue.toFixed(2)}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: HISTÓRICO DE DIÁRIAS & AVALIAÇÃO                       */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'historico' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Histórico de Serviços Solicitados</h2>
              <p className="text-xs text-slate-500">Consulte diárias anteriores, comprovantes e avalie as profissionais</p>
            </div>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 font-bold flex items-center justify-center shrink-0">
                        <History className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">{booking.serviceType} • #{booking.id}</h4>
                        <p className="text-xs text-slate-500">{booking.date} às {booking.timeSlot}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                        booking.status === 'finalizado'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {booking.status === 'finalizado' ? 'Concluído' : 'Em Andamento'}
                      </span>

                      <span className="font-black text-sm text-slate-900">R$ {booking.totalValue}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                    <div>
                      <p className="text-slate-600 font-medium">Diarista: <strong className="text-slate-900">{booking.diaristaName}</strong></p>
                      <p className="text-slate-500">{booking.clientAddress}</p>
                    </div>

                    {booking.status === 'finalizado' && (
                      <div className="flex items-center space-x-2">
                        {booking.review ? (
                          <div className="flex items-center space-x-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-xl border border-amber-200">
                            <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                            <span className="font-bold">Avaliado: {booking.review.rating} Estrelas</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => onOpenRatingModal(booking)}
                            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition shadow-xs cursor-pointer flex items-center space-x-1"
                          >
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>Avaliar Serviço</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: PERFIL DO CLIENTE                                      */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'perfil' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center space-x-4 border-b border-slate-100 pb-6">
              <img
                src={clientProfile.photoUrl}
                alt={clientProfile.name}
                className="w-20 h-20 rounded-3xl object-cover border-2 border-teal-500 shadow-md"
              />
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{clientProfile.name}</h2>
                <p className="text-xs text-slate-500">{clientProfile.email} • {clientProfile.phone}</p>
                <div className="mt-2 inline-flex items-center space-x-1.5 px-3 py-1 bg-teal-50 text-teal-800 rounded-full text-xs font-bold border border-teal-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>Cliente Premium Dona Maria • {clientProfile.totalBookings} Diárias Realizadas</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-sm text-slate-900 border-b border-slate-200 pb-2">Endereço Principal</h4>
                <div className="space-y-1 text-slate-700">
                  <p><strong>Rua/Alameda:</strong> {clientProfile.address}</p>
                  <p><strong>Bairro:</strong> {clientProfile.neighborhood}</p>
                  <p><strong>Cidade:</strong> {clientProfile.city}</p>
                  <p><strong>Possui Animais:</strong> {clientProfile.hasPets ? 'Sim (Cachorro registrado)' : 'Não'}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-sm text-slate-900 border-b border-slate-200 pb-2">Método de Pagamento Preferencial</h4>
                <div className="flex items-center space-x-3 pt-1">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-sm text-slate-900">{clientProfile.preferredPaymentMethod}</h5>
                    <p className="text-slate-500">Chave PIX registrada e checkout instantâneo</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// Sub-component for Live Status Pipeline
interface StatusStepProps {
  label: string;
  stepStatus: ServiceStatus;
  currentStatus: ServiceStatus;
  icon: React.ComponentType<{ className?: string }>;
}

const StatusStep: React.FC<StatusStepProps> = ({ label, stepStatus, currentStatus, icon: Icon }) => {
  const statusOrder: ServiceStatus[] = ['solicitado', 'aceito', 'em_deslocamento', 'em_atendimento', 'finalizado'];
  const stepIndex = statusOrder.indexOf(stepStatus);
  const currentIndex = statusOrder.indexOf(currentStatus);

  const isPassed = stepIndex <= currentIndex;
  const isCurrent = stepIndex === currentIndex;

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition ${
        isCurrent
          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30 ring-4 ring-emerald-100 scale-105'
          : isPassed
          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
          : 'bg-slate-200 text-slate-400'
      }`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className={`text-[11px] font-bold ${
        isCurrent ? 'text-emerald-900 font-black' : isPassed ? 'text-slate-800' : 'text-slate-400'
      }`}>
        {label}
      </span>
    </div>
  );
};
