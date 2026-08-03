import React, { useState } from 'react';
import { AloDiariaLogo } from '../AloDiariaLogo';
import { 
  X, 
  Sparkles, 
  User, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  Camera, 
  FileText, 
  QrCode, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Star,
  Award,
  Clock,
  Shirt,
  Flame,
  Dog,
  Heart
} from 'lucide-react';

interface DiaristaOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export const DiaristaOnboardingModal: React.FC<DiaristaOnboardingModalProps> = ({
  isOpen,
  onClose,
  showToast
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<number>(1);

  // Form Fields
  const [nome, setNome] = useState('Maria de Fátima Oliveira');
  const [nascimento, setNascimento] = useState('1985-06-12');
  const [cpf, setCpf] = useState('123.456.789-00');
  const [rg, setRg] = useState('12.345.678-9');
  const [whatsapp, setWhatsapp] = useState('(11) 99876-5432');
  const [email, setEmail] = useState('maria.fatima@email.com');

  // Address
  const [cep, setCep] = useState('04080-001');
  const [rua, setRua] = useState('Alameda dos Maracatins');
  const [numero, setNumero] = useState('450');
  const [bairro, setBairro] = useState('Moema');
  const [cidade, setCidade] = useState('São Paulo');
  const [estado, setEstado] = useState('SP');

  // Profile Roles & Specialties
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['Diarista / Faxineira', 'Passadeira']);
  const [experienceYears, setExperienceYears] = useState('7 anos');
  const [registeredBefore, setRegisteredBefore] = useState(true);

  // Pricing
  const [hourlyRate, setHourlyRate] = useState('25');
  const [dailyRate, setDailyRate] = useState('180');
  const [halfDayRate, setHalfDayRate] = useState('110');
  const [negotiable, setNegotiable] = useState(true);

  // Radius & Days
  const [maxRadius, setMaxRadius] = useState('15km');
  const [availableDays, setAvailableDays] = useState<string[]>(['Seg', 'Ter', 'Qua', 'Qui', 'Sex']);

  // Pix Key
  const [pixKeyType, setPixKeyType] = useState('CPF');
  const [pixKey, setPixKey] = useState('123.456.789-00');

  // Terms
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  const rolesList = [
    { id: 'Diarista', label: 'Diarista / Faxineira', icon: '🧹' },
    { id: 'Babá', label: 'Babá / Cuidadora Infantil', icon: '👶' },
    { id: 'Cozinheira', label: 'Cozinheira', icon: '🍳' },
    { id: 'Passadeira', label: 'Passadeira', icon: '👔' },
    { id: 'Lavadeira', label: 'Lavadeira', icon: '🧺' },
    { id: 'Organizadora', label: 'Personal Organizer', icon: '✨' },
    { id: 'CuidadoraIdosos', label: 'Cuidadora de Idosos', icon: '👵' },
    { id: 'PetSitter', label: 'Pet Sitter', icon: '🐾' },
    { id: 'Outros', label: 'Outros Serviços', icon: '💬' }
  ];

  const toggleRole = (label: string) => {
    if (selectedRoles.includes(label)) {
      setSelectedRoles(selectedRoles.filter(r => r !== label));
    } else {
      setSelectedRoles([...selectedRoles, label]);
    }
  };

  const toggleDay = (day: string) => {
    if (availableDays.includes(day)) {
      setAvailableDays(availableDays.filter(d => d !== day));
    } else {
      setAvailableDays([...availableDays, day]);
    }
  };

  const handleFinish = () => {
    showToast('Parabéns Maria! Seu cadastro de profissional foi concluído e aprovado com sucesso!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-purple-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Logo & Step Indicator */}
        <div className="space-y-3 border-b border-purple-100 pb-4">
          <AloDiariaLogo size="sm" />
          
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">
              {step === 1 && '1. Bem-vinda ao Alô Diária!'}
              {step === 2 && '2. Escolha sua Especialidade'}
              {step === 3 && '3. Informações Pessoais'}
              {step === 4 && '4. Endereço Completo'}
              {step === 5 && '5. Experiência Profissional'}
              {step === 6 && '6. Serviços Oferecidos'}
              {step === 7 && '7. Tabela de Valores'}
              {step === 8 && '8. Dias de Disponibilidade'}
              {step === 9 && '9. Raio de Atendimento'}
              {step === 10 && '10. Foto de Perfil & Trabalhos'}
              {step === 11 && '11. Documentos para Verificação'}
              {step === 12 && '12. Chave Pix para Recebimento'}
              {step === 13 && '13. Conta Bancária (Opcional)'}
              {step === 14 && '14. Termos e Regras da Plataforma'}
              {step === 15 && '15. Cadastro Concluído!'}
            </h2>
            <span className="text-xs font-black text-[#4C1D95] bg-purple-100 px-2.5 py-1 rounded-full">
              {step} / 15
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#4C1D95] h-full transition-all duration-300"
              style={{ width: `${(step / 15) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: WELCOME */}
        {step === 1 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center mx-auto text-[#4C1D95]">
              <Sparkles className="w-10 h-10 text-[#EC4899]" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              Transforme seu trabalho em renda garantida!
            </h3>

            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              No Alô Diária, você define seus horários, define seus preços e recebe o pagamento <strong className="text-emerald-600 font-bold">100% via Pix</strong> direto no seu celular com total segurança.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-left">
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 space-y-1">
                <span className="text-base">💰</span>
                <p className="font-bold text-slate-900">Receba no Pix</p>
                <p className="text-[11px] text-slate-500">Pagamento garantido após o serviço</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 space-y-1">
                <span className="text-base">🛡️</span>
                <p className="font-bold text-slate-900">Sua Segurança</p>
                <p className="text-[11px] text-slate-500">Patroas e clientes verificados</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 space-y-1">
                <span className="text-base">📅</span>
                <p className="font-bold text-slate-900">Livre Escolha</p>
                <p className="text-[11px] text-slate-500">Aceite apenas quando puder</p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: ROLES */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Selecione quais funções você desempenha:</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {rolesList.map((item) => {
                const isSelected = selectedRoles.includes(item.label);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleRole(item.label)}
                    className={`p-3 rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center text-center space-y-1 cursor-pointer ${
                      isSelected
                        ? 'bg-[#4C1D95] text-white border-[#4C1D95] shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="line-clamp-1">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: PERSONAL INFO */}
        {step === 3 && (
          <div className="space-y-3 text-xs font-semibold">
            <div className="space-y-1">
              <label className="text-slate-600 block">Nome Completo</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-600 block">Data de Nascimento</label>
                <input
                  type="date"
                  value={nascimento}
                  onChange={(e) => setNascimento(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 block">CPF</label>
                <input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-600 block">Celular WhatsApp</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 block">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: ADDRESS */}
        {step === 4 && (
          <div className="space-y-3 text-xs font-semibold">
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-slate-600 block">CEP</label>
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
                />
              </div>

              <div className="col-span-2 space-y-1">
                <label className="text-slate-600 block">Rua / Logradouro</label>
                <input
                  type="text"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-slate-600 block">Número</label>
                <input
                  type="text"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 block">Bairro</label>
                <input
                  type="text"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 block">Cidade / UF</label>
                <input
                  type="text"
                  value={`${cidade} - ${estado}`}
                  onChange={(e) => setCidade(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: PRICING */}
        {step === 7 && (
          <div className="space-y-4 text-xs font-semibold">
            <p className="text-slate-500">Defina seus valores sugeridos para diárias:</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1 p-3 bg-purple-50 rounded-2xl border border-purple-100">
                <label className="text-slate-600 block">Valor por Hora (R$)</label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-lg font-black text-[#4C1D95]"
                />
              </div>

              <div className="space-y-1 p-3 bg-purple-50 rounded-2xl border border-purple-100">
                <label className="text-slate-600 block">Diária Integral (R$)</label>
                <input
                  type="number"
                  value={dailyRate}
                  onChange={(e) => setDailyRate(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-lg font-black text-[#4C1D95]"
                />
              </div>

              <div className="space-y-1 p-3 bg-purple-50 rounded-2xl border border-purple-100">
                <label className="text-slate-600 block">Meio Período (R$)</label>
                <input
                  type="number"
                  value={halfDayRate}
                  onChange={(e) => setHalfDayRate(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-lg font-black text-[#4C1D95]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 12: PIX KEY */}
        {step === 12 && (
          <div className="space-y-4 text-xs font-semibold">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                <QrCode className="w-5 h-5 text-emerald-600" />
                <span>Cadastre sua Chave Pix para Receber seus Trabalhos</span>
              </div>
              <p className="text-slate-600 font-normal">
                O pagamento de cada diária realizada cai diretamente nesta chave Pix assim que a cliente confirma a conclusão do serviço.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 block">Tipo de Chave Pix</label>
              <select
                value={pixKeyType}
                onChange={(e) => setPixKeyType(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
              >
                <option value="CPF">CPF</option>
                <option value="Celular">Celular</option>
                <option value="Email">E-mail</option>
                <option value="Aleatória">Chave Aleatória</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 block">Sua Chave Pix</label>
              <input
                type="text"
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
              />
            </div>
          </div>
        )}

        {/* STEP 15: CONCLUSION */}
        {step === 15 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">Parabéns, Maria! 🎉</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Seu cadastro foi concluído com sucesso e aprovado no Alô Diária. Você já está visível para clientes e patroas da sua região!
            </p>

            <button
              onClick={handleFinish}
              className="px-8 py-3 bg-[#4C1D95] hover:bg-purple-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition cursor-pointer"
            >
              Acessar Meu Painel de Diarista
            </button>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        {step < 15 && (
          <div className="flex items-center justify-between pt-4 border-t border-purple-100">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>
            ) : <div />}

            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 bg-[#4C1D95] hover:bg-purple-900 text-white font-extrabold text-xs rounded-xl transition cursor-pointer flex items-center space-x-1 shadow-md"
            >
              <span>{step === 14 ? 'Finalizar Cadastro' : 'Avançar'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
