import React, { useState, useEffect } from "react";
import { EventItem, Order, TicketParticipant } from "../../types/nexoTickets";
import {
  CheckCircle2,
  Clock,
  CreditCard,
  QrCode,
  Copy,
  ShieldCheck,
  User,
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
  Download,
  Calendar,
  Share2,
  AlertCircle,
  FileText
} from "lucide-react";

interface CheckoutFlowProps {
  event: EventItem;
  selectedQuantities: Record<string, number>;
  onClose: () => void;
  onSuccess: (newOrder: Order) => void;
}

export const CheckoutFlow: React.FC<CheckoutFlowProps> = ({
  event,
  selectedQuantities,
  onClose,
  onSuccess
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Buyer Form State
  const [buyerName, setBuyerName] = useState("Marcelo Oliveira");
  const [buyerCpf, setBuyerCpf] = useState("123.456.789-00");
  const [buyerEmail, setBuyerEmail] = useState("marcelo@email.com");
  const [buyerPhone, setBuyerPhone] = useState("(11) 99123-4567");
  const [buyerCep, setBuyerCep] = useState("01310-100");
  const [buyerAddress, setBuyerAddress] = useState("Avenida Paulista, 1000");
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  // Participants Form State
  const [participants, setParticipants] = useState<
    { name: string; cpf: string; email: string; tierName: string; tierPrice: number; serviceFee: number }[]
  >([]);

  // Payment Selection State
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [installmentCount, setInstallmentCount] = useState<number>(4);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Pix Timer Countdown (14:32)
  const [timerSeconds, setTimerSeconds] = useState(872);

  useEffect(() => {
    if (step === 3 && paymentMethod === "pix" && timerSeconds > 0) {
      const interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, paymentMethod, timerSeconds]);

  // Calculate total ticket list from quantities
  useEffect(() => {
    const list: { name: string; cpf: string; email: string; tierName: string; tierPrice: number; serviceFee: number }[] = [];
    event.ticketTiers.forEach((tier) => {
      const qty = selectedQuantities[tier.id] || 0;
      for (let i = 0; i < qty; i++) {
        list.push({
          name: i === 0 ? buyerName : `Participante ${i + 1}`,
          cpf: i === 0 ? buyerCpf : "987.654.321-00",
          email: i === 0 ? buyerEmail : `participante${i + 1}@email.com`,
          tierName: tier.name,
          tierPrice: tier.price,
          serviceFee: tier.serviceFee
        });
      }
    });
    setParticipants(list);
  }, [selectedQuantities, buyerName, buyerCpf, buyerEmail, event]);

  const subtotal = participants.reduce((acc, p) => acc + p.tierPrice, 0);
  const serviceFee = participants.reduce((acc, p) => acc + p.serviceFee, 0);
  const grossTotal = subtotal + serviceFee;

  // Installment Table Data
  const installmentOptions = [
    { count: 1, text: "1x de R$ " + grossTotal.toFixed(2).replace(".", ",") + " sem juros", total: grossTotal, interest: 0 },
    { count: 2, text: "2x de R$ 90,64 — total R$ 181,28", total: 181.28, interest: 5.28 },
    { count: 3, text: "3x de R$ 61,92 — total R$ 185,76", total: 185.76, interest: 9.76 },
    { count: 4, text: "4x de R$ 47,57 — total R$ 190,28", total: 190.28, interest: 14.28 },
    { count: 5, text: "5x de R$ 38,98 — total R$ 194,90", total: 194.90, interest: 18.90 },
    { count: 6, text: "6x de R$ 33,26 — total R$ 199,56", total: 199.56, interest: 23.56 }
  ];

  const selectedInstallment = installmentOptions.find((i) => i.count === installmentCount) || installmentOptions[0];

  const formatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const dummyPixCode =
    "00020126580014BR.GOV.BCB.PIX0136nexo-tickets-split-2026-pix5204000053039865406176.005802BR5925NEXO TICKETS TECNOLOGIA6009SAO PAULO62070503***6304E8A2";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(dummyPixCode);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 3000);
  };

  const handleSimulatePaymentApproval = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);

      const items: TicketParticipant[] = participants.map((p, idx) => ({
        tierId: `tier-${idx + 1}`,
        tierName: p.tierName,
        price: p.tierPrice,
        serviceFee: p.serviceFee,
        participantName: p.name,
        participantCpf: p.cpf,
        participantEmail: p.email,
        ticketCode: `ING-8X${42 + idx}-2026`,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ING-8X${42 + idx}-2026`,
        status: "Válido"
      }));

      const newOrder: Order = {
        id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
        orderNumber: "PED-2026-008421",
        createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.displayDate,
        eventLocation: event.location,
        buyerName,
        buyerCpf,
        buyerEmail,
        buyerPhone,
        items,
        subtotal,
        serviceFee,
        discount: 0,
        grossTotal: paymentMethod === "card" ? selectedInstallment.total : grossTotal,
        paymentMethod,
        installments:
          paymentMethod === "card"
            ? {
                count: selectedInstallment.count,
                installmentAmount: selectedInstallment.total / selectedInstallment.count,
                totalWithInterest: selectedInstallment.total,
                interestAmount: selectedInstallment.interest
              }
            : undefined,
        paymentStatus: "Aprovado",
        pixCode: paymentMethod === "pix" ? dummyPixCode : undefined,
        gatewayFee: paymentMethod === "pix" ? 1.2 : 6.8,
        netTotal: grossTotal - (paymentMethod === "pix" ? 1.2 : 6.8),
        splitSpaceAmount: (grossTotal - (paymentMethod === "pix" ? 1.2 : 6.8)) * 0.2,
        splitOperatorAmount: (grossTotal - (paymentMethod === "pix" ? 1.2 : 6.8)) * 0.8,
        settlementStatus: "A receber",
        settlementDate: "2026-07-27"
      };

      setCompletedOrder(newOrder);
      setStep(4);
      onSuccess(newOrder);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-sans">
      <div className="bg-[#12101B] border border-[#6D3DF5]/50 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="bg-[#25164F] px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#6D3DF5] text-white rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Checkout Transparente</h3>
              <p className="text-xs text-gray-300">{event.title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="bg-black/40 px-6 py-3 border-b border-white/10 flex items-center justify-between text-xs font-bold text-gray-300">
          {[
            { num: 1, label: "Identificação" },
            { num: 2, label: "Participantes" },
            { num: 3, label: "Pagamento" },
            { num: 4, label: "Confirmação" }
          ].map((s) => (
            <div key={s.num} className="flex items-center space-x-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${
                  step === s.num
                    ? "bg-[#F0448B] text-white ring-2 ring-white"
                    : step > s.num
                    ? "bg-[#1FA971] text-white"
                    : "bg-white/10 text-gray-400"
                }`}
              >
                {step > s.num ? "✓" : s.num}
              </span>
              <span className={`hidden sm:inline ${step === s.num ? "text-white font-black" : ""}`}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 text-white text-xs flex-1">
          {/* STEP 1: IDENTIFICAÇÃO DO COMPRADOR */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="border-b border-white/10 pb-3">
                <h4 className="text-lg font-black text-white">Dados do Comprador</h4>
                <p className="text-gray-400">Informe quem está realizando a compra do pedido.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-1 font-bold">Nome completo *</label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6D3DF5]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 font-bold">CPF *</label>
                  <input
                    type="text"
                    value={buyerCpf}
                    onChange={(e) => setBuyerCpf(e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6D3DF5]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 font-bold">E-mail para envio dos ingressos *</label>
                  <input
                    type="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6D3DF5]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 font-bold">Celular / WhatsApp *</label>
                  <input
                    type="text"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6D3DF5]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 font-bold">CEP</label>
                  <input
                    type="text"
                    value={buyerCep}
                    onChange={(e) => setBuyerCep(e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6D3DF5]"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1 font-bold">Endereço</label>
                  <input
                    type="text"
                    value={buyerAddress}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#6D3DF5]"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-4 h-4 accent-[#6D3DF5] rounded cursor-pointer"
                />
                <label htmlFor="terms" className="text-gray-300 text-xs cursor-pointer">
                  Li e aceito os <strong>termos de compra</strong> e as <strong>regras do evento</strong>.
                </label>
              </div>

              <div className="flex justify-end pt-4 border-t border-white/10">
                <button
                  onClick={() => setStep(2)}
                  disabled={!acceptedTerms || !buyerName || !buyerCpf}
                  className="px-6 py-3 bg-[#6D3DF5] hover:bg-[#6D3DF5]/90 disabled:opacity-40 text-white font-bold rounded-xl flex items-center space-x-2"
                >
                  <span>Avançar para Participantes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PARTICIPANTES */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-black text-white">Dados dos Participantes</h4>
                  <p className="text-gray-400">Cada ingresso necessita de um nome e CPF para emissão do QR Code.</p>
                </div>
                <button
                  onClick={() => {
                    setParticipants((prev) =>
                      prev.map((p, idx) =>
                        idx === 0
                          ? p
                          : { ...p, name: buyerName, cpf: buyerCpf, email: buyerEmail }
                      )
                    );
                  }}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-lg text-[#F0448B]"
                >
                  Usar meus dados para todos
                </button>
              </div>

              <div className="space-y-4">
                {participants.map((p, idx) => (
                  <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-[#F2B84B] uppercase tracking-wider text-[11px]">
                        Ingresso #{idx + 1} — {p.tierName}
                      </span>
                      <span className="text-gray-400">R$ {p.tierPrice.toFixed(2)}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-gray-400 text-[10px] uppercase font-bold mb-1">
                          Nome do Participante
                        </label>
                        <input
                          type="text"
                          value={p.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setParticipants((prev) => prev.map((item, i) => (i === idx ? { ...item, name: val } : item)));
                          }}
                          className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-[10px] uppercase font-bold mb-1">
                          CPF do Participante
                        </label>
                        <input
                          type="text"
                          value={p.cpf}
                          onChange={(e) => {
                            const val = e.target.value;
                            setParticipants((prev) => prev.map((item, i) => (i === idx ? { ...item, cpf: val } : item)));
                          }}
                          className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-[10px] uppercase font-bold mb-1">
                          E-mail do Participante
                        </label>
                        <input
                          type="email"
                          value={p.email}
                          onChange={(e) => {
                            const val = e.target.value;
                            setParticipants((prev) => prev.map((item, i) => (i === idx ? { ...item, email: val } : item)));
                          }}
                          className="w-full p-2.5 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#2775EA]/10 border border-[#2775EA]/30 rounded-xl text-[11px] text-gray-300 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-[#2775EA] shrink-0" />
                <span>Os dados dos participantes poderão ser alterados gratuitamente até 24h antes do evento.</span>
              </div>

              <div className="flex justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-[#6D3DF5] hover:bg-[#6D3DF5]/90 text-white font-bold rounded-xl flex items-center space-x-2"
                >
                  <span>Ir para Pagamento</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAGAMENTO TRANSPARENTE */}
          {step === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Form (8 cols) */}
              <div className="lg:col-span-8 space-y-5">
                <div className="border-b border-white/10 pb-3">
                  <h4 className="text-lg font-black text-white">Forma de Pagamento</h4>
                  <p className="text-gray-400">Escolha como deseja pagar de forma 100% segura.</p>
                </div>

                {/* Tab selector Pix vs Card */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod("pix")}
                    className={`p-4 rounded-2xl border flex items-center space-x-3 transition-all ${
                      paymentMethod === "pix"
                        ? "bg-[#1FA971]/20 border-[#1FA971] text-white ring-2 ring-[#1FA971]"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    <QrCode className="w-6 h-6 text-[#1FA971]" />
                    <div className="text-left">
                      <span className="font-black block text-sm">Pix Instantâneo</span>
                      <span className="text-[10px] text-gray-300">Aprovação imediata</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-2xl border flex items-center space-x-3 transition-all ${
                      paymentMethod === "card"
                        ? "bg-[#6D3DF5]/20 border-[#6D3DF5] text-white ring-2 ring-[#6D3DF5]"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-[#F0448B]" />
                    <div className="text-left">
                      <span className="font-black block text-sm">Cartão de Crédito</span>
                      <span className="text-[10px] text-gray-300">Em até 6x no cartão</span>
                    </div>
                  </button>
                </div>

                {/* PIX PAYMENT UI */}
                {paymentMethod === "pix" && (
                  <div className="p-6 bg-black/40 border border-[#1FA971]/40 rounded-3xl space-y-5 text-center">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#1FA971]/20 text-[#1FA971] border border-[#1FA971]/40 rounded-full font-bold text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Código expira em {formatTime(timerSeconds)}</span>
                    </div>

                    <div className="bg-white p-3 rounded-2xl w-44 h-44 mx-auto shadow-xl flex items-center justify-center">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                          dummyPixCode
                        )}`}
                        alt="Pix QR Code"
                        className="w-full h-full"
                      />
                    </div>

                    <div className="space-y-2 max-w-md mx-auto">
                      <span className="text-gray-400 font-bold text-[10px] uppercase block">
                        Código Pix Copia e Cola
                      </span>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-mono break-all text-gray-300 select-all">
                        {dummyPixCode}
                      </div>

                      <button
                        onClick={handleCopyPix}
                        className="w-full py-2.5 bg-[#1FA971] hover:bg-[#1FA971]/90 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        <span>{pixCopied ? "Código Copiado!" : "Copiar Código Pix"}</span>
                      </button>
                    </div>

                    {/* Live Pix Timeline */}
                    <div className="pt-4 border-t border-white/10 grid grid-cols-4 gap-2 text-[10px]">
                      <div className="text-[#1FA971] font-bold">1. Pix Gerado ✓</div>
                      <div className="text-[#F2B84B] font-bold animate-pulse">2. Aguardando...</div>
                      <div className="text-gray-500">3. Identificado</div>
                      <div className="text-gray-500">4. Ingressos Liberados</div>
                    </div>

                    <button
                      onClick={handleSimulatePaymentApproval}
                      disabled={isProcessing}
                      className="w-full py-4 bg-gradient-to-r from-[#1FA971] to-[#1769AA] hover:brightness-110 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2"
                    >
                      <span>{isProcessing ? "Processando..." : "Simular Pagamento Pix Aprovado"}</span>
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* CREDIT CARD PAYMENT UI */}
                {paymentMethod === "card" && (
                  <div className="p-6 bg-black/40 border border-white/10 rounded-3xl space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-gray-400 text-[10px] uppercase font-bold mb-1">
                          Número do Cartão
                        </label>
                        <input
                          type="text"
                          placeholder="4532 •••• •••• 8812"
                          defaultValue="4532 8912 3456 8812"
                          className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-[10px] uppercase font-bold mb-1">
                          Nome impresso no cartão
                        </label>
                        <input
                          type="text"
                          defaultValue={buyerName}
                          className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white uppercase"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-gray-400 text-[10px] uppercase font-bold mb-1">
                            Validade
                          </label>
                          <input
                            type="text"
                            placeholder="MM/AA"
                            defaultValue="11/29"
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-[10px] uppercase font-bold mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            defaultValue="882"
                            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono"
                          />
                        </div>
                      </div>

                      {/* Installment Selector with transparent interest breakdown */}
                      <div className="sm:col-span-2">
                        <label className="block text-gray-400 text-[10px] uppercase font-bold mb-1">
                          Opções de Parcelamento
                        </label>
                        <select
                          value={installmentCount}
                          onChange={(e) => setInstallmentCount(Number(e.target.value))}
                          className="w-full p-3 bg-[#12101B] border border-[#6D3DF5] rounded-xl text-white font-bold cursor-pointer"
                        >
                          {installmentOptions.map((opt) => (
                            <option key={opt.count} value={opt.count} className="bg-[#12101B]">
                              {opt.text}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="p-3 bg-[#F2B84B]/10 border border-[#F2B84B]/30 rounded-xl text-[11px] text-[#F2B84B] leading-snug space-y-1">
                      <span className="font-bold block">Aviso transparente sobre parcelamento:</span>
                      <p className="text-gray-300">
                        Os juros do parcelamento são adicionados ao valor da compra e pagos integralmente pelo comprador. O valor líquido destinado ao evento e ao operador não é reduzido.
                      </p>
                    </div>

                    <button
                      onClick={handleSimulatePaymentApproval}
                      disabled={isProcessing}
                      className="w-full py-4 bg-gradient-to-r from-[#6D3DF5] to-[#F0448B] hover:brightness-110 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2"
                    >
                      <span>
                        {isProcessing
                          ? "Processando Cartão..."
                          : `Pagar R$ ${selectedInstallment.total.toFixed(2).replace(".", ",")}`}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Right Order Summary Column (4 cols) */}
              <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-3xl p-5 space-y-4 h-fit">
                <h5 className="font-black text-white border-b border-white/10 pb-3">Resumo da Compra</h5>

                <div className="space-y-2 text-gray-300 text-xs">
                  <div className="flex justify-between">
                    <span>Evento:</span>
                    <strong className="text-white text-right max-w-[150px] truncate">{event.title}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantidade:</span>
                    <strong className="text-white">{participants.length} ingressos</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de serviço:</span>
                    <span>R$ {serviceFee.toFixed(2).replace(".", ",")}</span>
                  </div>

                  {paymentMethod === "card" && selectedInstallment.interest > 0 && (
                    <div className="flex justify-between text-[#F2B84B]">
                      <span>Juros parcelamento:</span>
                      <span>+ R$ {selectedInstallment.interest.toFixed(2).replace(".", ",")}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-base font-black text-white pt-3 border-t border-white/10">
                    <span>Total final:</span>
                    <span className="text-[#F2B84B]">
                      R${" "}
                      {(paymentMethod === "card" ? selectedInstallment.total : grossTotal)
                        .toFixed(2)
                        .replace(".", ",")}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-black/40 rounded-xl text-[10px] text-gray-400 space-y-1">
                  <span className="font-bold text-gray-300 block">Segurança Garantida:</span>
                  <p>Checkout transparente sem redirecionamentos. Dados criptografados e liquidação instantânea.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMAÇÃO DA COMPRA */}
          {step === 4 && completedOrder && (
            <div className="text-center space-y-6 py-6 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#1FA971]/20 border-2 border-[#1FA971] text-[#1FA971] flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 bg-[#1FA971]/20 text-[#1FA971] border border-[#1FA971]/40 rounded-full font-bold text-xs uppercase tracking-wider">
                  PAGAMENTO APROVADO COM SUCESSO
                </span>
                <h3 className="text-3xl font-black text-white">Compra Confirmada!</h3>
                <p className="text-gray-300 text-xs">
                  Seus ingressos foram gerados e também enviamos uma cópia para{" "}
                  <strong className="text-white">{completedOrder.buyerEmail}</strong>.
                </p>
              </div>

              {/* Order Receipt Card */}
              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Número do Pedido:</span>
                  <span className="font-mono font-bold text-[#F0448B]">{completedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Evento:</span>
                  <strong className="text-white">{completedOrder.eventTitle}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data:</span>
                  <span>{completedOrder.eventDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ingressos:</span>
                  <span>{completedOrder.items.length} ingressos válidos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Forma de Pagamento:</span>
                  <span className="uppercase font-bold text-[#1FA971]">{completedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-sm font-black border-t border-white/10 pt-2">
                  <span>Valor Pago:</span>
                  <span className="text-[#F2B84B]">R$ {completedOrder.grossTotal.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="py-3 px-4 bg-gradient-to-r from-[#6D3DF5] to-[#F0448B] text-white font-bold rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Visualizar Ingressos</span>
                </button>

                <button
                  onClick={() => alert("Comprovante PDF baixado com sucesso!")}
                  className="py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Comprovante</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
