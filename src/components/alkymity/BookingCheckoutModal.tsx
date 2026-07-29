import React, { useState } from 'react';
import { CartItem } from '../../types/alkymity';
import { 
  X, 
  Trash2, 
  CreditCard, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  QrCode, 
  ArrowRight,
  Receipt
} from 'lucide-react';

interface BookingCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
}

export const BookingCheckoutModal: React.FC<BookingCheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onRemoveFromCart,
  onClearCart
}) => {
  const [step, setStep] = useState<'cart' | 'payment' | 'confirmation'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [coupon, setCoupon] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>('');
  const [couponSuccess, setCouponSuccess] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Form state
  const [guestName, setGuestName] = useState<string>('Isabella Silveira');
  const [guestEmail, setGuestEmail] = useState<string>('isabella.silveira@alkymity.com');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    if (coupon.trim().toUpperCase() === 'GALAPAGOS2026' || coupon.trim().toUpperCase() === 'ALKYMITY20') {
      setDiscountPercent(20);
      setCouponSuccess('Cupom de 20% OFF aplicado com sucesso!');
    } else {
      setCouponError('Cupom inválido. Experimente usar: GALAPAGOS2026');
    }
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmation');
    }, 1800);
  };

  const handleFinish = () => {
    onClearCart();
    setStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#181918] border border-stone-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 text-stone-100 max-h-[90vh] overflow-y-auto relative animate-scale-up shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-serif font-bold text-sm">
              A
            </div>
            <div>
              <h3 className="font-serif text-xl font-light text-stone-100">
                {step === 'cart' && 'Resumo do Seu Pedido & Reservas'}
                {step === 'payment' && 'Pagamento Seguro (Stripe / PayPal)'}
                {step === 'confirmation' && 'Reserva Confirmada em Galápagos!'}
              </h3>
              <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest block">
                Alkymity Ecosystem Checkout
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-white bg-stone-900 border border-stone-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: CART ITEMS REVIEW */}
        {step === 'cart' && (
          <div className="space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-3 font-mono text-xs text-stone-400">
                <Receipt className="w-10 h-10 mx-auto text-stone-600" />
                <p>Seu carrinho de reservas está vazio.</p>
                <p className="text-[10px] text-stone-500">Navegue pelas abas do Studio, Kitchen ou Suites para agendar.</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div 
                      key={item.id}
                      className="p-3.5 bg-stone-900 border border-stone-800 rounded-2xl flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center space-x-3">
                        {item.image && (
                          <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover border border-stone-700" />
                        )}
                        <div>
                          <h5 className="font-serif font-bold text-stone-100 text-sm">{item.title}</h5>
                          <span className="font-mono text-[10px] text-stone-400 block">{item.subtitle}</span>
                          {item.date && (
                            <span className="font-mono text-[10px] text-emerald-400 block">{item.date} {item.time && `• ${item.time}`}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="font-mono font-bold text-emerald-400">${item.price * item.quantity} USD</span>
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="text-stone-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <span className="font-mono text-[10px] text-stone-400 uppercase font-bold">Cupom de Desconto:</span>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Ex: GALAPAGOS2026"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="flex-1 px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-100 uppercase font-mono placeholder-stone-600 focus:outline-none focus:border-emerald-500/50"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-mono text-xs rounded-xl border border-stone-700 transition"
                    >
                      Aplicar
                    </button>
                  </div>
                  {couponError && <p className="text-[10px] font-mono text-rose-400">{couponError}</p>}
                  {couponSuccess && <p className="text-[10px] font-mono text-emerald-400">{couponSuccess}</p>}
                </form>

                {/* Summary calculation */}
                <div className="p-4 bg-stone-900 border border-stone-800 rounded-2xl space-y-2 font-mono text-xs text-stone-300">
                  <div className="flex items-center justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)} USD</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-emerald-400">
                      <span>Desconto ({discountPercent}% OFF):</span>
                      <span>-${discountAmount.toFixed(2)} USD</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-sm font-bold text-stone-100">
                    <span>Total Final:</span>
                    <span className="text-emerald-400">${total.toFixed(2)} USD</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep('payment')}
                  className="w-full py-3.5 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Avançar para Pagamento</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        )}

        {/* STEP 2: PAYMENT METHOD & GUEST INFO */}
        {step === 'payment' && (
          <form onSubmit={handleSimulatePayment} className="space-y-5">
            <div className="space-y-3">
              <span className="font-mono text-[10px] text-stone-400 uppercase font-bold">1. Dados do Hóspede / Membro:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  type="text" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Nome Completo"
                  required
                  className="px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-emerald-500/50"
                />
                <input 
                  type="email" 
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="E-mail"
                  required
                  className="px-3 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-100 focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-[10px] text-stone-400 uppercase font-bold">2. Método de Pagamento Simulado:</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-3 rounded-2xl border text-xs font-mono text-left flex items-center space-x-2.5 transition ${
                    paymentMethod === 'stripe'
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-bold'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:bg-stone-800'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Stripe (Cartão)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-2xl border text-xs font-mono text-left flex items-center space-x-2.5 transition ${
                    paymentMethod === 'paypal'
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 font-bold'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:bg-stone-800'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>PayPal Express</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-stone-900 border border-stone-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400">Total a Pagar:</span>
                <span className="text-emerald-400 font-bold text-sm">${total.toFixed(2)} USD</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-stone-500">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Criptografia SSL de 256 bits. Transação demonstrativa segura.</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="px-4 py-3 bg-stone-900 hover:bg-stone-800 text-stone-300 font-mono text-xs rounded-xl border border-stone-800 transition"
              >
                Voltar
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-lg flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <span>Processando Transação...</span>
                ) : (
                  <span>Confirmar Pagamento (${total.toFixed(2)})</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: CONFIRMATION & DIGITAL PASS */}
        {step === 'confirmation' && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-2xl text-stone-100">Tudo Pronto, {guestName}!</h4>
              <p className="text-xs text-stone-400 font-serif max-w-sm mx-auto leading-relaxed">
                Suas reservas no ecossistema Alkymity foram confirmadas com sucesso. Enviamos um e-mail de confirmação para <strong className="text-stone-200">{guestEmail}</strong>.
              </p>
            </div>

            {/* Digital Voucher Pass */}
            <div className="p-6 bg-gradient-to-br from-stone-900 to-stone-950 border border-emerald-500/40 rounded-3xl space-y-4 text-left font-mono text-xs text-stone-300">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <span className="text-emerald-400 font-bold uppercase text-[10px]">Passe Digital Galápagos</span>
                <span className="text-stone-500 text-[10px]">STATUS: CONFIRMADO</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-500 block">PROPRIETÁRIO:</span>
                  <span className="font-bold text-stone-100">{guestName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-500 block">TOTAL PAGO:</span>
                  <span className="font-bold text-emerald-400">${total.toFixed(2)} USD</span>
                </div>
              </div>

              <div className="w-24 h-24 bg-white p-2 rounded-xl mx-auto flex items-center justify-center my-2 shadow">
                <QrCode className="w-full h-full text-stone-950" />
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-lg"
            >
              Concluir & Voltar ao Início
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
