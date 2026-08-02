import React, { useState } from 'react';
import { ServiceCategory, DiaristaProfile, RoomDetails } from '../../../types/aloDiaria';
import { 
  X, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  Dog, 
  Plus, 
  Minus, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  ShieldCheck, 
  DollarSign,
  QrCode,
  CreditCard,
  Wallet
} from 'lucide-react';

interface BookingWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: ServiceCategory[];
  diaristas: DiaristaProfile[];
  preSelectedCategory?: ServiceCategory;
  preSelectedDiarista?: DiaristaProfile;
  activeLocation: string;
  onConfirmBooking: (bookingData: any) => void;
}

export const BookingWizardModal: React.FC<BookingWizardModalProps> = ({
  isOpen,
  onClose,
  categories,
  diaristas,
  preSelectedCategory,
  preSelectedDiarista,
  activeLocation,
  onConfirmBooking
}) => {
  if (!isOpen) return null;

  // Wizard Step State (1: Type, 2: Address & Date, 3: Rooms, 4: Pets & Notes, 5: Diarista & Payment, 6: Success)
  const [step, setStep] = useState<number>(preSelectedCategory ? 2 : 1);

  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(
    preSelectedCategory || categories[0]
  );
  
  const [selectedDiarista, setSelectedDiarista] = useState<DiaristaProfile | undefined>(
    preSelectedDiarista || diaristas[0]
  );

  const [address, setAddress] = useState<string>('Alameda dos Maracatins, 1200 - Apt 82 (Moema)');
  const [date, setDate] = useState<string>('2026-08-04');
  const [timeSlot, setTimeSlot] = useState<string>('08:00 - 16:00');

  const [rooms, setRooms] = useState<RoomDetails>({
    bedrooms: 2,
    bathrooms: 2,
    livingRooms: 1,
    kitchens: 1,
    balconies: 1
  });

  const [hasPets, setHasPets] = useState<boolean>(true);
  const [petNotes, setPetNotes] = useState<string>('Cão poodle pequeno, muito amigável.');
  const [observations, setObservations] = useState<string>('Dar atenção aos vidros da sacada e box do banheiro.');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao' | 'saldo'>('pix');

  // Math price calculation
  const extraRoomsCount = Math.max(0, (rooms.bedrooms + rooms.bathrooms + rooms.kitchens + rooms.livingRooms) - 4);
  const basePrice = selectedCategory.basePrice + (extraRoomsCount * 20);
  const platformFee = Math.round(basePrice * 0.12);
  const totalPrice = basePrice + platformFee;

  const handleFinish = () => {
    onConfirmBooking({
      serviceType: selectedCategory.name,
      clientAddress: address,
      date,
      timeSlot,
      rooms,
      hasPets,
      petNotes,
      observations,
      diaristaId: selectedDiarista?.id,
      diaristaName: selectedDiarista?.name,
      diaristaPhoto: selectedDiarista?.photoUrl,
      diaristaPhone: selectedDiarista?.phone,
      baseValue: basePrice,
      platformFee,
      totalValue: totalPrice,
      paymentMethod
    });
    setStep(6);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wizard Header Progress */}
        <div className="space-y-2 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-teal-700">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>AGENDAMENTO ALÔ DIÁRIA DONA MARIA</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            {step === 1 && '1. Escolha o Tipo de Diária'}
            {step === 2 && '2. Local, Data e Horário'}
            {step === 3 && '3. Tamanho do Imóvel & Cômodos'}
            {step === 4 && '4. Animais de Estimação e Detalhes'}
            {step === 5 && '5. Profissional & Pagamento'}
            {step === 6 && '✨ Solicitação Confirmada com Sucesso!'}
          </h2>

          {step < 6 && (
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-teal-600 h-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* STEP 1: CATEGORY SELECTION */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Selecione o serviço desejado para o seu imóvel:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setStep(2);
                  }}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-2 ${
                    selectedCategory.id === cat.id
                      ? 'bg-teal-50 border-teal-500 ring-2 ring-teal-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">{cat.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{cat.description}</p>
                  </div>
                  <div className="font-black text-sm text-teal-700">A partir de R$ {cat.basePrice}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION & DATE */}
        {step === 2 && (
          <div className="space-y-4 text-xs font-semibold">
            <div className="space-y-1">
              <label className="text-slate-600 block">Endereço da Limpeza</label>
              <div className="flex items-center space-x-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-transparent w-full text-slate-900 font-bold focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-600 block">Data Preferencial</label>
                <div className="flex items-center space-x-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent w-full text-slate-900 font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-600 block">Horário do Turno</label>
                <div className="flex items-center space-x-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="bg-transparent w-full text-slate-900 font-bold focus:outline-none"
                  >
                    <option value="08:00 - 16:00">Turno Completo (08:00 - 16:00)</option>
                    <option value="08:00 - 12:00">Meio Turno Manhã (08:00 - 12:00)</option>
                    <option value="13:00 - 17:00">Meio Turno Tarde (13:00 - 17:00)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: ROOMS BREAKDOWN */}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Informe a quantidade de cômodos para calcular a duração exata da diária:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
              
              <RoomCounter 
                label="Quartos" 
                value={rooms.bedrooms} 
                onChange={(v) => setRooms({ ...rooms, bedrooms: v })} 
              />
              
              <RoomCounter 
                label="Banheiros" 
                value={rooms.bathrooms} 
                onChange={(v) => setRooms({ ...rooms, bathrooms: v })} 
              />

              <RoomCounter 
                label="Salas de Estar" 
                value={rooms.livingRooms} 
                onChange={(v) => setRooms({ ...rooms, livingRooms: v })} 
              />

              <RoomCounter 
                label="Cozinhas" 
                value={rooms.kitchens} 
                onChange={(v) => setRooms({ ...rooms, kitchens: v })} 
              />

              <RoomCounter 
                label="Varandas / Sacadas" 
                value={rooms.balconies} 
                onChange={(v) => setRooms({ ...rooms, balconies: v })} 
              />

            </div>

            <div className="p-3 bg-teal-50 rounded-xl text-xs text-teal-800 font-medium">
              💡 Estimativa: <strong>8 Horas de Serviço</strong> para o tamanho total do imóvel selecionado.
            </div>
          </div>
        )}

        {/* STEP 4: PETS & NOTES */}
        {step === 4 && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 flex items-center space-x-1.5">
                  <Dog className="w-4 h-4 text-amber-600" />
                  <span>Possui Animais de Estimação?</span>
                </span>
                
                <button
                  onClick={() => setHasPets(!hasPets)}
                  className={`px-3 py-1 rounded-full font-extrabold transition ${
                    hasPets ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {hasPets ? 'Sim, Possuo Pets' : 'Não Possuo Pets'}
                </button>
              </div>

              {hasPets && (
                <input
                  type="text"
                  value={petNotes}
                  onChange={(e) => setPetNotes(e.target.value)}
                  placeholder="Ex: Cão da raça poodle, não morde..."
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none"
                />
              )}
            </div>

            <div className="space-y-1">
              <label className="font-extrabold text-slate-700 block">Observações Especiais para a Diarista</label>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                rows={3}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-medium"
                placeholder="Ex: Focar na limpeza dos espelhos e passar roupas de cama..."
              />
            </div>
          </div>
        )}

        {/* STEP 5: DIARISTA & PAYMENT SUMMARY */}
        {step === 5 && (
          <div className="space-y-5 text-xs">
            
            {/* Diarista Selection Pill */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="font-extrabold text-slate-900">Profissional Selecionada:</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={selectedDiarista?.photoUrl} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-sm">{selectedDiarista?.name}</h5>
                    <p className="text-slate-500">⭐️ {selectedDiarista?.rating} • {selectedDiarista?.neighborhood}</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-extrabold rounded-lg">
                  Disponível
                </span>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2">
              <div className="flex justify-between text-slate-700">
                <span>Valor Base da Diária:</span>
                <strong>R$ {basePrice.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Taxa da Plataforma Dona Maria (12%):</span>
                <strong>R$ {platformFee.toFixed(2)}</strong>
              </div>
              <div className="pt-2 border-t border-teal-200 flex justify-between font-black text-base text-slate-900">
                <span>Total a Pagar:</span>
                <span className="text-emerald-700">R$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="font-extrabold text-slate-700 block">Forma de Pagamento (Mockup Checkout)</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('pix')}
                  className={`p-3 rounded-xl border font-bold flex flex-col items-center justify-center space-y-1 transition ${
                    paymentMethod === 'pix' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>PIX (Instantâneo)</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('cartao')}
                  className={`p-3 rounded-xl border font-bold flex flex-col items-center justify-center space-y-1 transition ${
                    paymentMethod === 'cartao' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Cartão de Crédito</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('saldo')}
                  className={`p-3 rounded-xl border font-bold flex flex-col items-center justify-center space-y-1 transition ${
                    paymentMethod === 'saldo' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  <span>Saldo de Créditos</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* STEP 6: SUCCESS CONFIRMATION */}
        {step === 6 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">Diária Solicitada com Sucesso!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Sua solicitação foi enviada para a profissional <strong className="text-slate-900">{selectedDiarista?.name}</strong>. Você pode acompanhar o status ao vivo na aba "Acompanhar Ao Vivo".
            </p>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition hover:bg-emerald-500 cursor-pointer"
            >
              Concluir & Acompanhar
            </button>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        {step < 6 && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl transition cursor-pointer flex items-center space-x-1 shadow-md"
              >
                <span>Avançar</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer shadow-md flex items-center space-x-1"
              >
                <span>Confirmar e Agendar</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

interface RoomCounterProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
}

const RoomCounter: React.FC<RoomCounterProps> = ({ label, value, onChange }) => {
  return (
    <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
      <span className="text-slate-800">{label}</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onChange(Math.max(1, value - 1))}
          className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 cursor-pointer"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-6 text-center font-black text-sm text-slate-900">{value}</span>
        <button
          onClick={() => onChange(value + 1)}
          className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
