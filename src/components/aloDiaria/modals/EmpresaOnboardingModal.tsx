import React, { useState } from 'react';
import { AloDiariaLogo } from '../AloDiariaLogo';
import { 
  X, 
  Building2, 
  User, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Utensils, 
  Hotel, 
  Briefcase, 
  Dumbbell, 
  Scissors, 
  ShoppingBag, 
  GraduationCap, 
  ShieldCheck, 
  QrCode,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';

interface EmpresaOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast: (msg: string) => void;
}

export const EmpresaOnboardingModal: React.FC<EmpresaOnboardingModalProps> = ({
  isOpen,
  onClose,
  showToast
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<number>(1);
  const [perfilType, setPerfilType] = useState<'residencial' | 'empresa'>('empresa');

  // Form Fields
  const [nomeEmpresa, setNomeEmpresa] = useState('Restaurante Sabor & Arte');
  const [nomeResponsavel, setNomeResponsavel] = useState('Carlos Eduardo Silva');
  const [documento, setDocumento] = useState('12.345.678/0001-90');
  const [telefone, setTelefone] = useState('(11) 98765-4321');
  const [email, setEmail] = useState('contato@saborearte.com.br');
  const [endereco, setEndereco] = useState('Rua Augusta, 1500 - Consolação, São Paulo - SP');

  // Selection state
  const [selectedCategory, setSelectedCategory] = useState('Restaurante');
  const [neededProfessions, setNeededProfessions] = useState<string[]>(['Diarista / Faxineira', 'Auxiliar de cozinha']);
  const [frequency, setFrequency] = useState('Diário');

  const establishmentTypes = [
    { id: 'Restaurante', label: 'Restaurante', icon: '🍴' },
    { id: 'Padaria', label: 'Padaria', icon: '🥐' },
    { id: 'Hotel', label: 'Hotel', icon: '🏨' },
    { id: 'Pousada', label: 'Pousada', icon: '🏠' },
    { id: 'Clínica', label: 'Clínica', icon: '➕' },
    { id: 'Escritório', label: 'Escritório', icon: '💼' },
    { id: 'Academia', label: 'Academia', icon: '🏋️' },
    { id: 'Salão', label: 'Salão de beleza', icon: '✂️' },
    { id: 'Barbearia', label: 'Barbearia', icon: '💈' },
    { id: 'Loja', label: 'Loja / Comércio', icon: '🛍️' },
    { id: 'Mercado', label: 'Mercado', icon: '🛒' },
    { id: 'Condomínio', label: 'Condomínio', icon: '🏢' },
    { id: 'Escola', label: 'Escola / Creche', icon: '🎓' },
    { id: 'Outro', label: 'Outro Estabelecimento', icon: '💬' },
  ];

  const professionsList = [
    'Diarista / Faxineira',
    'Cozinheira',
    'Auxiliar de cozinha',
    'Lavadeira',
    'Passadeira',
    'Organizador(a)',
    'Babá / Recreador(a)',
    'Cuidador(a) de idosos',
    'Serviços gerais'
  ];

  const toggleProfession = (prof: string) => {
    if (neededProfessions.includes(prof)) {
      setNeededProfessions(neededProfessions.filter(p => p !== prof));
    } else {
      setNeededProfessions([...neededProfessions, prof]);
    }
  };

  const handleFinish = () => {
    showToast('Cadastro de Empresa concluído com sucesso! Bem-vindo ao Alô Diária!');
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

        {/* Header Logo & Title */}
        <div className="space-y-3 border-b border-purple-100 pb-4">
          <AloDiariaLogo size="sm" />
          
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">
              {step === 1 && 'Escolha seu Tipo de Perfil'}
              {step === 2 && 'Dados da Empresa / Negócio'}
              {step === 3 && 'Tipo de Estabelecimento'}
              {step === 4 && 'Profissionais Necessários'}
              {step === 5 && 'Frequência de Atendimento'}
              {step === 6 && 'Conclusão do Cadastro Corporativo'}
            </h2>
            <span className="text-xs font-black text-[#4C1D95] bg-purple-100 px-2.5 py-1 rounded-full">
              Passo {step} de 6
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#4C1D95] h-full transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: CHOICE BETWEEN RESIDENCIAL & EMPRESA */}
        {step === 1 && (
          <div className="space-y-5">
            <p className="text-xs text-slate-600">
              Como você deseja usar o Alô Diária? Escolha uma opção para continuar seu cadastro:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setPerfilType('residencial')}
                className={`p-5 rounded-2xl border-2 transition cursor-pointer space-y-3 ${
                  perfilType === 'residencial' 
                    ? 'border-[#4C1D95] bg-purple-50/50 ring-2 ring-purple-200' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#4C1D95] flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Sou Cliente Residencial</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Quero contratar profissionais para cuidar da minha casa, passar roupas ou cozinhar.
                  </p>
                </div>
              </div>

              <div 
                onClick={() => setPerfilType('empresa')}
                className={`p-5 rounded-2xl border-2 transition cursor-pointer space-y-3 ${
                  perfilType === 'empresa' 
                    ? 'border-[#4C1D95] bg-purple-50/50 ring-2 ring-purple-200' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EC4899]/10 text-[#EC4899] flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Sou Empresa / Estabelecimento</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Quero contratar diaristas, auxiliares e profissionais para meu negócio ou comércio.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-2 text-xs text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Pagamento 100% Seguro:</strong> Todas as solicitações usam Pix protegido pelo Alô Diária.</span>
            </div>
          </div>
        )}

        {/* STEP 2: DADOS DA EMPRESA */}
        {step === 2 && (
          <div className="space-y-4 text-xs font-semibold">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-600 block">Nome da Empresa / Fantasia</label>
                <input
                  type="text"
                  value={nomeEmpresa}
                  onChange={(e) => setNomeEmpresa(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 block">Nome do Responsável</label>
                <input
                  type="text"
                  value={nomeResponsavel}
                  onChange={(e) => setNomeResponsavel(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 block">CNPJ ou CPF</label>
                <input
                  type="text"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 block">Telefone WhatsApp</label>
                <input
                  type="text"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 block">E-mail Corporativo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-600 block">Endereço do Estabelecimento</label>
              <input
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-900 font-bold"
              />
            </div>
          </div>
        )}

        {/* STEP 3: TIPO DE ESTABELECIMENTO */}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Selecione a categoria principal do seu estabelecimento:</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-72 overflow-y-auto p-1">
              {establishmentTypes.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedCategory(item.id)}
                  className={`p-3 rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center space-y-1.5 cursor-pointer ${
                    selectedCategory === item.id
                      ? 'bg-[#4C1D95] text-white border-[#4C1D95] shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-center line-clamp-1">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: PROFISSIONAIS NECESSÁRIOS */}
        {step === 4 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Marque quais tipos de profissionais seu estabelecimento necessita:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {professionsList.map((prof) => {
                const isSelected = neededProfessions.includes(prof);
                return (
                  <div
                    key={prof}
                    onClick={() => toggleProfession(prof)}
                    className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-50 border-[#4C1D95] text-[#4C1D95] font-extrabold'
                        : 'bg-white border-slate-200 text-slate-700 font-semibold'
                    }`}
                  >
                    <span className="text-xs">{prof}</span>
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs ${
                      isSelected ? 'bg-[#4C1D95] text-white' : 'border border-slate-300'
                    }`}>
                      {isSelected && '✓'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: FREQUÊNCIA */}
        {step === 5 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Com que frequência você precisará dos serviços?</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Apenas hoje / Eventual', 'Diário', 'Semanal', 'Quinzena', 'Mensal', 'Fixo / Dias definidos'].map((freq) => (
                <button
                  key={freq}
                  onClick={() => setFrequency(freq)}
                  className={`p-4 rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center text-center cursor-pointer ${
                    frequency === freq
                      ? 'bg-[#4C1D95] text-white border-[#4C1D95] shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Calendar className="w-5 h-5 mb-1 text-[#EC4899]" />
                  <span>{freq}</span>
                </button>
              ))}
            </div>

            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 space-y-2 text-xs">
              <h4 className="font-extrabold text-[#4C1D95]">Vantagens Exclusivas para Empresas:</h4>
              <ul className="space-y-1 text-slate-700 list-disc list-inside font-medium">
                <li>Emissão de Nota Fiscal e comprovantes para contabilidade</li>
                <li>Garantia de reposição em até 2 horas caso haja imprevisto</li>
                <li>Pagamento unificado via Pix Seguro</li>
              </ul>
            </div>
          </div>
        )}

        {/* STEP 6: CONCLUSÃO */}
        {step === 6 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">Cadastro da Empresa Concluído!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              O perfil para <strong className="text-slate-900">{nomeEmpresa}</strong> foi configurado com sucesso. Agora você já pode solicitar diaristas e profissionais qualificados para seu estabelecimento!
            </p>

            <button
              onClick={handleFinish}
              className="px-8 py-3 bg.emerald-600 bg-[#4C1D95] hover:bg-purple-900 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition cursor-pointer"
            >
              Começar a Contratar
            </button>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        {step < 6 && (
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
              <span>{step === 5 ? 'Finalizar Cadastro' : 'Avançar'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
