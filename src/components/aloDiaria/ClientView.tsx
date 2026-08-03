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
import { AloDiariaLogo } from './AloDiariaLogo';
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
  Building2,
  Filter,
  Check,
  Award,
  ThumbsUp,
  Copy,
  MessageSquare,
  HelpCircle,
  ArrowRight
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
  onOpenEmpresaModal: () => void;
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
  onOpenEmpresaModal,
  showToast
}) => {
  // Search & Filter state for Diaristas search tab
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Todas');
  const [maxDistance, setMaxDistance] = useState<number>(15);
  const [minRating, setMinRating] = useState<number>(4.0);

  // Favorite diaristas state
  const [favorites, setFavorites] = useState<string[]>(['dia-101', 'dia-103']);

  // Checkout & Pix Payment State (Image 3 & Image 6)
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1); // 1: Review, 2: Pix QR Code, 3: Approved & Tracking
  const [timerSeconds, setTimerSeconds] = useState(899); // 14:59
  const [copiedPixKey, setCopiedPixKey] = useState(false);

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

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} min`;
  };

  const copyPixCode = () => {
    setCopiedPixKey(true);
    showToast('Chave Pix copia e cola copiada para a área de transferência!');
    setTimeout(() => setCopiedPixKey(false), 3000);
  };

  return (
    <div className="space-y-8 font-sans pb-16">
      
      {/* ------------------------------------------------------------- */}
      {/* ONBOARDING PERFIL SELECTOR BANNER (IMAGE 2)                  */}
      {/* ------------------------------------------------------------- */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900 via-[#4C1D95] to-purple-800 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#EC4899]/20 flex items-center justify-center text-[#EC4899] shrink-0 border border-[#EC4899]/30">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-sm text-white">Você é Cliente Residencial ou Empresa?</h3>
              <span className="px-2 py-0.5 rounded-full bg-[#EC4899] text-white text-[10px] font-black">
                Novidade
              </span>
            </div>
            <p className="text-xs text-purple-200">
              Contrate diaristas para sua casa ou cadastre seu estabelecimento (Restaurante, Hotel, Clínica, etc).
            </p>
          </div>
        </div>

        <button
          onClick={onOpenEmpresaModal}
          className="px-4 py-2 bg-white text-[#4C1D95] hover:bg-purple-50 font-black text-xs rounded-xl shadow-xs transition shrink-0 cursor-pointer flex items-center space-x-1.5"
        >
          <Building2 className="w-3.5 h-3.5 text-[#EC4899]" />
          <span>Cadastrar Minha Empresa</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: HOME / TELA INICIAL                                    */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'home' && (
        <div className="space-y-8">
          
          {/* Main Hero Banner */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#4C1D95] via-purple-900 to-[#3B0764] p-6 sm:p-10 text-white overflow-hidden shadow-xl border border-purple-800/50">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#EC4899]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-purple-100 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
                <span>Diárias com garantia & profissionais verificadas</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Sua casa impecável com as melhores diaristas da sua região.
              </h1>

              <p className="text-sm text-purple-200 leading-relaxed">
                Agendamento simples em menos de 2 minutos. Profissionais com antecedente criminal verificado, avaliação 5 estrelas e seguro de proteção inclusos.
              </p>

              {/* Quick Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenBookingWizard()}
                  className="px-6 py-3.5 bg-[#EC4899] hover:bg-pink-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition flex items-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Agendar Diária Agora</span>
                </button>

                <button
                  onClick={() => setActiveTab('buscar')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs rounded-2xl transition flex items-center space-x-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Ver Profissionais Ativas</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Categories Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Serviços Populares</h2>
                <p className="text-xs text-slate-500">Escolha a modalidade perfeita para a necessidade do seu imóvel</p>
              </div>
              <button 
                onClick={() => onOpenBookingWizard()}
                className="text-xs font-bold text-[#4C1D95] hover:text-purple-800 flex items-center space-x-1 cursor-pointer"
              >
                <span>Ver todos os serviços</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => onOpenBookingWizard(cat)}
                  className="p-5 rounded-2xl bg-white border border-purple-100/80 shadow-xs hover:shadow-md hover:border-[#4C1D95]/40 transition cursor-pointer space-y-3 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 group-hover:bg-[#4C1D95] text-[#4C1D95] group-hover:text-white transition flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#EC4899]" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-[#4C1D95] transition">{cat.name}</h3>
                      {cat.popular && (
                        <span className="px-2 py-0.5 rounded-full bg-pink-50 text-[#EC4899] text-[10px] font-bold border border-pink-200">
                          Mais pedido
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">{cat.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">A partir de</span>
                    <span className="font-black text-[#4C1D95]">R$ {cat.basePrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Top Rated Diaristas */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Diaristas Recomendadas em {activeLocation.split('-')[1] || activeLocation}</h2>
                <p className="text-xs text-slate-500">Profissionais verificadas com excelente avaliação das patroas</p>
              </div>
              <button 
                onClick={() => setActiveTab('buscar')}
                className="text-xs font-bold text-[#4C1D95] hover:text-purple-800 flex items-center space-x-1 cursor-pointer"
              >
                <span>Ver mais diaristas</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {diaristas.slice(0, 3).map((dia) => (
                <div
                  key={dia.id}
                  onClick={() => onOpenDiaristaDetail(dia)}
                  className="bg-white rounded-2xl border border-purple-100 p-5 shadow-xs hover:shadow-md transition cursor-pointer space-y-4 relative"
                >
                  <button
                    onClick={(e) => toggleFavorite(dia.id, e)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-50 hover:bg-pink-50 text-slate-400 hover:text-[#EC4899] transition cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(dia.id) ? 'fill-[#EC4899] text-[#EC4899]' : ''}`} />
                  </button>

                  <div className="flex items-center space-x-3.5">
                    <img
                      src={dia.photoUrl}
                      alt={dia.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-100"
                    />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h3 className="font-extrabold text-slate-900 text-sm">{dia.name}</h3>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      </div>
                      <p className="text-xs text-slate-500">{dia.neighborhood} ({dia.distanceKm} km)</p>
                      <div className="flex items-center space-x-1 mt-1 text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-900">{dia.rating}</span>
                        <span className="text-slate-400">({dia.reviewsCount} avaliações)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {dia.specialties.slice(0, 3).map((spec, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-lg bg-purple-50 text-[#4C1D95] text-[11px] font-semibold border border-purple-100">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Diária Média</span>
                      <span className="font-black text-sm text-[#4C1D95]">R$ {dia.avgDailyRate}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenBookingWizard(undefined, dia);
                      }}
                      className="px-4 py-2 bg-[#4C1D95] hover:bg-purple-900 text-white font-extrabold text-xs rounded-xl transition cursor-pointer shadow-xs"
                    >
                      Agendar Diária
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HOW IT WORKS / ENTENDA COMO FUNCIONA (IMAGE 3 & IMAGE 6) */}
          <div className="p-6 rounded-3xl bg-purple-50/80 border border-purple-100 space-y-4">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h3 className="font-black text-slate-900 text-lg">Entenda como funciona o Alô Diária</h3>
              <p className="text-xs text-slate-600">Sua diária é 100% protegida do agendamento à conclusão do serviço</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2 text-center text-xs">
              <div className="p-3 bg-white rounded-2xl border border-purple-100 space-y-1">
                <span className="w-7 h-7 rounded-full bg-[#4C1D95] text-white font-bold inline-flex items-center justify-center text-xs">1</span>
                <p className="font-bold text-slate-900 pt-1">Paga via Pix</p>
                <p className="text-[11px] text-slate-500">Checkout rápido de 1 minuto</p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-purple-100 space-y-1">
                <span className="w-7 h-7 rounded-full bg-[#4C1D95] text-white font-bold inline-flex items-center justify-center text-xs">2</span>
                <p className="font-bold text-slate-900 pt-1">Valor Protegido</p>
                <p className="text-[11px] text-slate-500">Guardado na plataforma</p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-purple-100 space-y-1">
                <span className="w-7 h-7 rounded-full bg-[#4C1D95] text-white font-bold inline-flex items-center justify-center text-xs">3</span>
                <p className="font-bold text-slate-900 pt-1">Diarista Aceita</p>
                <p className="text-[11px] text-slate-500">Confirmação em tempo real</p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-purple-100 space-y-1">
                <span className="w-7 h-7 rounded-full bg-[#4C1D95] text-white font-bold inline-flex items-center justify-center text-xs">4</span>
                <p className="font-bold text-slate-900 pt-1">Serviço Realizado</p>
                <p className="text-[11px] text-slate-500">Profissional na sua casa</p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-purple-100 space-y-1">
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold inline-flex items-center justify-center text-xs">5</span>
                <p className="font-bold text-slate-900 pt-1">Liberação do Valor</p>
                <p className="text-[11px] text-slate-500">Pix repassado à diarista</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: BUSCAR DIARISTAS                                       */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'buscar' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900">Buscar Diaristas Próximas</h2>
            <p className="text-xs text-slate-500">Filtre por distância, especialidade ou reputação das patroas</p>
          </div>

          {/* Search bar & Filter controls */}
          <div className="p-4 bg-white rounded-2xl border border-purple-100 space-y-4 shadow-xs">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center space-x-2 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou bairro (ex: Moema, Pinheiros)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-xs w-full focus:outline-none font-medium"
                />
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="Todas">Todas as Especialidades</option>
                  <option value="Faxina Residencial">Faxina Residencial</option>
                  <option value="Limpeza Pesada">Limpeza Pesada</option>
                  <option value="Passar Roupas">Passar Roupas</option>
                  <option value="Cozinhar">Cozinhar</option>
                  <option value="Organização">Organização</option>
                </select>

                <select
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value={5}>Até 5 km</option>
                  <option value={10}>Até 10 km</option>
                  <option value={15}>Até 15 km</option>
                  <option value={30}>Até 30 km</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredDiaristas.map((dia) => (
              <div
                key={dia.id}
                onClick={() => onOpenDiaristaDetail(dia)}
                className="bg-white rounded-2xl border border-purple-100 p-5 shadow-xs hover:shadow-md transition cursor-pointer space-y-4 relative"
              >
                <div className="flex items-center space-x-3.5">
                  <img
                    src={dia.photoUrl}
                    alt={dia.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-100"
                  />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-extrabold text-slate-900 text-sm">{dia.name}</h3>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    </div>
                    <p className="text-xs text-slate-500">{dia.neighborhood} ({dia.distanceKm} km)</p>
                    <div className="flex items-center space-x-1 mt-1 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-900">{dia.rating}</span>
                      <span className="text-slate-400">({dia.reviewsCount} avaliações)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Diária Média</span>
                    <span className="font-black text-sm text-[#4C1D95]">R$ {dia.avgDailyRate}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenBookingWizard(undefined, dia);
                    }}
                    className="px-4 py-2 bg-[#4C1D95] hover:bg-purple-900 text-white font-extrabold text-xs rounded-xl transition cursor-pointer shadow-xs"
                  >
                    Agendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: ACOMPANHAR AO VIVO / CHECKOUT MODAL (IMAGES 3 & 6)     */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'agendamentos' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Acompanhamento de Diárias ao Vivo</h2>
              <p className="text-xs text-slate-500">Status em tempo real da sua solicitação e repasse seguro Pix</p>
            </div>

            <button
              onClick={() => setCheckoutModalOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition cursor-pointer shadow-sm flex items-center space-x-1.5"
            >
              <QrCode className="w-4 h-4" />
              <span>Simular Checkout Pix (Image 3)</span>
            </button>
          </div>

          {/* Active Job Card */}
          {activeBooking && (
            <div className="bg-white rounded-3xl border border-purple-100 p-6 md:p-8 shadow-md space-y-6">
              
              {/* Header Status Bar */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-purple-100">
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase">Código do Agendamento: {activeBooking.id}</span>
                  <h3 className="text-xl font-black text-slate-900">{activeBooking.serviceType}</h3>
                </div>

                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Pagamento Protegido via Pix (100% Seguro)</span>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-700 uppercase">Linha do Tempo em Tempo Real</h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-bold">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>1. Pix Confirmado</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center space-x-2 ${
                    activeBooking.status === 'solicitado' 
                      ? 'bg-purple-50 border-[#4C1D95] text-[#4C1D95]' 
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}>
                    <Clock className="w-4 h-4 text-[#4C1D95] shrink-0" />
                    <span>2. Aguardando Diarista</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center space-x-2 ${
                    activeBooking.status === 'em_atendimento' 
                      ? 'bg-purple-50 border-[#4C1D95] text-[#4C1D95]' 
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}>
                    <HomeIcon className="w-4 h-4 shrink-0" />
                    <span>3. Em Andamento</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center space-x-2 ${
                    activeBooking.status === 'finalizado' 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>4. Finalizado & Liberado</span>
                  </div>
                </div>
              </div>

              {/* Diarista Info & Next Action */}
              <div className="p-5 bg-purple-50/60 rounded-2xl border border-purple-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={activeBooking.diaristaPhoto || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'}
                    alt=""
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-sm">{activeBooking.diaristaName || 'Maria de Fátima'}</h5>
                    <p className="text-xs text-slate-500">Profissional Alô Diária • WhatsApp: {activeBooking.diaristaPhone || '(11) 99876-5432'}</p>
                    <p className="text-xs text-slate-700 font-medium mt-0.5">📅 {activeBooking.date} • ⏰ {activeBooking.timeSlot}</p>
                  </div>
                </div>

                <button
                  onClick={() => onAdvanceBookingStatus(activeBooking.id)}
                  className="px-5 py-2.5 bg-[#4C1D95] hover:bg-purple-900 text-white text-xs font-black rounded-xl transition shadow-xs cursor-pointer"
                >
                  Avançar Status do Serviço
                </button>
              </div>

            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* CHECKOUT & PIX PAYMENT MODAL (IMAGE 3 & IMAGE 6)              */}
      {/* ------------------------------------------------------------- */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-sans">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-purple-100">
            
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 4-Step Checkout Header (Image 3) */}
            <div className="space-y-3 border-b border-purple-100 pb-4">
              <AloDiariaLogo size="sm" />
              
              <div className="flex items-center justify-between text-xs font-black">
                <span className={checkoutStep >= 1 ? 'text-[#4C1D95]' : 'text-slate-400'}>1. Serviço</span>
                <span>→</span>
                <span className={checkoutStep >= 2 ? 'text-[#4C1D95]' : 'text-slate-400'}>2. Pagamento Pix</span>
                <span>→</span>
                <span className={checkoutStep === 3 ? 'text-emerald-600' : 'text-slate-400'}>3. Confirmação</span>
              </div>
            </div>

            {/* STEP 1: REVIEW SERVICE DETAILS (IMAGE 3 LEFT) */}
            {checkoutStep === 1 && (
              <div className="space-y-5 text-xs">
                
                {/* Diarista profile summary */}
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-center space-x-3.5">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                    alt=""
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h4 className="font-extrabold text-slate-900 text-sm">Maria Oliveira</h4>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    </div>
                    <p className="text-slate-500">⭐️ 4.9 (128 avaliações) • Profissional Verificada</p>
                    <p className="text-[#4C1D95] font-bold mt-0.5">Limpeza Residencial Completa</p>
                  </div>
                </div>

                {/* Service Details */}
                <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex justify-between text-slate-700">
                    <span>Data do Serviço:</span>
                    <strong>18/05/2025 (Domingo)</strong>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Horário do Turno:</span>
                    <strong>09:00 às 17:00 (8 Horas)</strong>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Local da Faxina:</span>
                    <strong>Rua das Flores, 123 - Vila Mariana, SP</strong>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span>Valor da Diária:</span>
                    <span>R$ 180,00</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Proteção Alô Diária / Taxa:</span>
                    <span>R$ 9,90</span>
                  </div>
                  <div className="pt-2 border-t border-purple-200 flex justify-between font-black text-base text-slate-900">
                    <span>Total a Pagar:</span>
                    <span className="text-[#4C1D95]">R$ 189,90</span>
                  </div>
                </div>

                {/* Security Guarantee Box */}
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-2 text-emerald-900">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="block font-bold">Seu pagamento está 100% protegido!</strong>
                    <span className="text-[11px] text-slate-600">O dinheiro só é liberado para a profissional após a conclusão do serviço na sua casa.</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutStep(2)}
                  className="w-full py-3.5 bg-[#4C1D95] hover:bg-purple-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-md transition cursor-pointer flex items-center justify-center space-x-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Pagar com Pix Seguro</span>
                </button>
              </div>
            )}

            {/* STEP 2: REAL PIX QR CODE & TIMER (IMAGE 3 MIDDLE) */}
            {checkoutStep === 2 && (
              <div className="space-y-5 text-xs text-center">
                
                {/* Timer Banner */}
                <div className="p-3 bg-pink-50 border border-pink-200 rounded-2xl flex items-center justify-center space-x-2 text-[#E11D48] font-black">
                  <Clock className="w-4 h-4 animate-pulse" />
                  <span>Tempo para conclusão: {formatTimer(timerSeconds)}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-500 block">Valor Total do Pix:</span>
                  <span className="text-3xl font-black text-[#4C1D95]">R$ 189,90</span>
                </div>

                {/* Simulated QR Code SVG */}
                <div className="w-48 h-48 bg-white p-3 rounded-2xl border-2 border-purple-200 mx-auto shadow-inner flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                    <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM35 5h10v10H35zM50 20h15v10H50zM35 35h30v10H35zM75 40h20v15H75zM40 55h20v20H40zM70 70h25v25H70z" />
                  </svg>
                </div>

                {/* Copia e Cola Key */}
                <button
                  onClick={copyPixCode}
                  className="w-full py-2.5 px-4 bg-purple-50 border border-purple-200 text-[#4C1D95] font-extrabold rounded-xl transition hover:bg-purple-100 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedPixKey ? '✓ Chave Copiada!' : 'Copiar Chave Pix Copia e Cola'}</span>
                </button>

                <div className="p-3 bg-slate-50 rounded-xl text-left text-slate-600 space-y-1">
                  <strong>Instruções de Pagamento:</strong>
                  <ol className="list-decimal list-inside space-y-0.5">
                    <li>Abra o aplicativo do seu banco preferido</li>
                    <li>Escolha a opção Pix e escaneie o código ou cole a chave</li>
                    <li>Confirme o valor de R$ 189,90 e conclua o pagamento</li>
                  </ol>
                </div>

                <button
                  onClick={() => setCheckoutStep(3)}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-md transition cursor-pointer flex items-center justify-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Já paguei, verificar pagamento</span>
                </button>
              </div>
            )}

            {/* STEP 3: PAYMENT APPROVED & LIVE TRACKING (IMAGE 3 RIGHT & IMAGE 6) */}
            {checkoutStep === 3 && (
              <div className="space-y-5 text-xs text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>

                <h3 className="text-2xl font-black text-slate-900">Pagamento Aprovado!</h3>

                <p className="text-slate-600 leading-relaxed max-w-md mx-auto">
                  Seu pagamento de <strong className="text-slate-900">R$ 189,90</strong> está reservado e protegido pelo Alô Diária. A profissional <strong className="text-[#4C1D95]">Maria Oliveira</strong> foi notificada e tem até 3 minutos para aceitar a diária.
                </p>

                {/* Real time timeline */}
                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-left space-y-2">
                  <h4 className="font-black text-[#4C1D95] uppercase">Status da Diária:</h4>
                  <div className="space-y-1.5 font-bold">
                    <div className="flex items-center space-x-2 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>✓ Pagamento confirmado via Pix</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#4C1D95]">
                      <Clock className="w-4 h-4 animate-pulse" />
                      <span>⏳ Aguardando confirmação da diarista</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setCheckoutModalOpen(false);
                      setActiveTab('agendamentos');
                    }}
                    className="flex-1 py-3 bg-[#4C1D95] hover:bg-purple-900 text-white font-extrabold rounded-xl transition cursor-pointer"
                  >
                    Acompanhar ao Vivo
                  </button>

                  <button
                    onClick={() => setCheckoutModalOpen(false)}
                    className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
