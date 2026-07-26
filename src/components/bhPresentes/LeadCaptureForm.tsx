import React, { useState, useEffect } from "react";
import { LeadFormData } from "../../types/bhPresentes";
import { INITIAL_LEAD_FORM } from "../../data/bhPresentesData";
import { MessageCircle, CheckCircle2, ShieldCheck, AlertCircle, ArrowRight, Smartphone, Sparkles } from "lucide-react";

interface LeadCaptureFormProps {
  initialModelName?: string;
  onSubmitLead: (data: LeadFormData) => void;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ initialModelName, onSubmitLead }) => {
  const [formData, setFormData] = useState<LeadFormData>(INITIAL_LEAD_FORM);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialModelName) {
      setFormData((prev) => ({
        ...prev,
        desiredSmartphone: initialModelName
      }));
    }
  }, [initialModelName]);

  // Apply Phone Mask (XX) XXXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value.slice(0, 2)}`;
    }

    setFormData({ ...formData, whatsapp: value });
    if (errors.whatsapp) setErrors({ ...errors, whatsapp: "" });
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = "Informe seu nome completo para continuar.";
    }

    const rawPhone = formData.whatsapp.replace(/\D/g, "");
    if (!rawPhone || rawPhone.length < 10) {
      newErrors.whatsapp = "Digite um número de WhatsApp válido com DDD.";
    }

    if (!formData.desiredSmartphone.trim()) {
      newErrors.desiredSmartphone = "Informe qual smartphone você procura.";
    }

    if (!formData.consent) {
      newErrors.consent = "Autorize o contato da equipe para enviar sua solicitação.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmitLead(formData);
    }
  };

  return (
    <section id="formulario" className="py-16 bg-[#176BFF] text-white font-sans scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white text-[#18202A] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 border-4 border-[#0B1F3A]">
          {/* Form Header */}
          <div className="text-center space-y-2 border-b border-gray-100 pb-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-black bg-[#25D366] text-white uppercase tracking-wider inline-flex items-center space-x-1 shadow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ATENDIMENTO DIRETO PELA LOJA</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B1F3A]">
              Encontre seu próximo smartphone agora
            </h2>
            <p className="text-sm text-[#687382]">
              Preencha os dados abaixo e receba atendimento rápido da equipe BH Presentes no WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Essential Contact Data */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-[#176BFF] uppercase tracking-wider flex items-center space-x-1.5">
                <Smartphone className="w-4 h-4" />
                <span>1. Seus Dados de Contato</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-extrabold text-[#0B1F3A] mb-1">
                    Nome Completo <span className="text-[#F04444]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: "" });
                    }}
                    placeholder="Digite seu nome completo"
                    className={`w-full p-3.5 rounded-xl border font-semibold text-sm focus:outline-none transition-colors ${
                      errors.fullName ? "border-[#F04444] bg-red-50" : "border-gray-300 focus:border-[#176BFF]"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-[#F04444] font-bold mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-extrabold text-[#0B1F3A] mb-1">
                    WhatsApp com DDD <span className="text-[#F04444]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={handlePhoneChange}
                    placeholder="(31) 99999-9999"
                    className={`w-full p-3.5 rounded-xl border font-semibold text-sm focus:outline-none transition-colors ${
                      errors.whatsapp ? "border-[#F04444] bg-red-50" : "border-gray-300 focus:border-[#25D366]"
                    }`}
                  />
                  {errors.whatsapp && (
                    <p className="text-[11px] text-[#F04444] font-bold mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.whatsapp}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-extrabold text-[#0B1F3A] mb-1">
                    E-mail de Contato
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu.email@exemplo.com"
                    className="w-full p-3.5 rounded-xl border border-gray-300 font-semibold text-sm focus:outline-none focus:border-[#176BFF]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Desired Smartphone & Preferences */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-xs font-black text-[#176BFF] uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4" />
                <span>2. O Smartphone que Você Procura</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Desired Smartphone */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-extrabold text-[#0B1F3A] mb-1">
                    Smartphone Procurado <span className="text-[#F04444]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.desiredSmartphone}
                    onChange={(e) => {
                      setFormData({ ...formData, desiredSmartphone: e.target.value });
                      if (errors.desiredSmartphone) setErrors({ ...errors, desiredSmartphone: "" });
                    }}
                    placeholder="Ex: iPhone 15 128GB, Samsung S24..."
                    className={`w-full p-3.5 rounded-xl border font-bold text-sm focus:outline-none transition-colors ${
                      errors.desiredSmartphone ? "border-[#F04444] bg-red-50" : "border-gray-300 focus:border-[#176BFF]"
                    }`}
                  />
                  {errors.desiredSmartphone && (
                    <p className="text-[11px] text-[#F04444] font-bold mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.desiredSmartphone}</span>
                    </p>
                  )}
                </div>

                {/* Condition Preference */}
                <div>
                  <label className="block text-xs font-extrabold text-[#0B1F3A] mb-1">
                    Prefere Novo ou Seminovo?
                  </label>
                  <select
                    value={formData.conditionPreference}
                    onChange={(e) => setFormData({ ...formData, conditionPreference: e.target.value as any })}
                    className="w-full p-3.5 rounded-xl border border-gray-300 font-bold text-sm focus:outline-none focus:border-[#176BFF] bg-white"
                  >
                    <option value="Novo">Novo e Lacrado</option>
                    <option value="Seminovo">Seminovo Premium com Garantia</option>
                    <option value="Tanto faz">Quero comparar ambos</option>
                  </select>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-xs font-extrabold text-[#0B1F3A] mb-1">
                    Previsão de Forma de Pagamento
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                    className="w-full p-3.5 rounded-xl border border-gray-300 font-bold text-sm focus:outline-none focus:border-[#176BFF] bg-white"
                  >
                    <option value="Cartão parcelado">Cartão de Crédito Parcelado (até 12x)</option>
                    <option value="Pix">Pix à vista com Desconto</option>
                    <option value="Cartão à vista">Cartão de Crédito à Vista</option>
                    <option value="Quero consultar as opções">Quero consultar as opções</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-xs font-extrabold text-[#0B1F3A] mb-1">
                    Faixa de Preço Desejada
                  </label>
                  <select
                    value={formData.priceRange}
                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value as any })}
                    className="w-full p-3.5 rounded-xl border border-gray-300 font-bold text-sm focus:outline-none focus:border-[#176BFF] bg-white"
                  >
                    <option value="Até R$ 1.500">Até R$ 1.500</option>
                    <option value="De R$ 1.500 a R$ 2.500">De R$ 1.500 a R$ 2.500</option>
                    <option value="De R$ 2.500 a R$ 4.000">De R$ 2.500 a R$ 4.000</option>
                    <option value="De R$ 4.000 a R$ 6.000">De R$ 4.000 a R$ 6.000</option>
                    <option value="Acima de R$ 6.000">Acima de R$ 6.000</option>
                    <option value="Ainda não defini">Ainda não defini</option>
                  </select>
                </div>

                {/* Has Trade in */}
                <div>
                  <label className="block text-xs font-extrabold text-[#0B1F3A] mb-1">
                    Possui celular para dar na troca?
                  </label>
                  <div className="flex items-center space-x-4 pt-2">
                    <label className="flex items-center space-x-2 font-bold text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="tradeInRadio"
                        checked={formData.hasTradeIn}
                        onChange={() => setFormData({ ...formData, hasTradeIn: true })}
                        className="text-[#25D366]"
                      />
                      <span>Sim, quero dar entrada</span>
                    </label>
                    <label className="flex items-center space-x-2 font-bold text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="tradeInRadio"
                        checked={!formData.hasTradeIn}
                        onChange={() => setFormData({ ...formData, hasTradeIn: false })}
                        className="text-[#176BFF]"
                      />
                      <span>Não tenho</span>
                    </label>
                  </div>
                </div>

                {/* Observations */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-extrabold text-[#0B1F3A] mb-1">
                    Observações Adicionais (Cor preferida, urgência, etc.)
                  </label>
                  <textarea
                    value={formData.observations}
                    onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                    rows={2}
                    placeholder="Ex: Gostaria de saber as cores do iPhone 15 disponíveis na loja da Pampulha..."
                    className="w-full p-3 rounded-xl border border-gray-300 font-semibold text-sm focus:outline-none focus:border-[#176BFF]"
                  />
                </div>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => {
                    setFormData({ ...formData, consent: e.target.checked });
                    if (errors.consent) setErrors({ ...errors, consent: "" });
                  }}
                  className="mt-1 rounded text-[#25D366] focus:ring-[#25D366] w-4 h-4"
                />
                <span className="text-xs font-semibold text-[#687382]">
                  Autorizo o contato da equipe comercial da BH Presentes por WhatsApp, e-mail ou telefone para o envio de ofertas e orçamentos do aparelho informado.
                </span>
              </label>
              {errors.consent && (
                <p className="text-[11px] text-[#F04444] font-bold mt-1 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.consent}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-base rounded-2xl transition-all shadow-xl shadow-[#25D366]/30 flex items-center justify-center space-x-3 hover:scale-[1.01]"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Continuar e Iniciar Atendimento pelo WhatsApp</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
