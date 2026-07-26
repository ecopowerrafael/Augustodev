import React, { useState } from "react";
import { LeadFormData } from "../../types/bhPresentes";
import { STORE_INFO } from "../../data/bhPresentesData";
import { MessageCircle, CheckCircle2, X, Edit2, Send, ExternalLink, Smartphone, Copy, Check } from "lucide-react";

interface PreWhatsAppModalProps {
  leadData: LeadFormData;
  onClose: () => void;
  onConfirmSend: (formattedMessage: string) => void;
}

export const PreWhatsAppModal: React.FC<PreWhatsAppModalProps> = ({ leadData, onClose, onConfirmSend }) => {
  const [copied, setCopied] = useState(false);

  // Generate formatted WhatsApp Message
  const tradeInText = leadData.hasTradeIn
    ? `Possuo um celular para dar na troca (${leadData.tradeInDetails?.brand || "Aparelho"} ${leadData.tradeInDetails?.model || "usado"}).`
    : "Não possuo aparelho para troca.";

  const formattedMessage = `Olá, equipe BH Presentes! Meu nome é *${leadData.fullName}* e tenho interesse em comprar o *${leadData.desiredSmartphone}* (${leadData.conditionPreference}).\n\n- Forma de Pagamento: ${leadData.paymentMethod}\n- Faixa de Preço: ${leadData.priceRange}\n- ${tradeInText}\n- E-mail: ${leadData.email || "Não informado"}\n${leadData.observations ? `- Observação: ${leadData.observations}\n` : ""}\nGostaria de consultar disponibilidade de cores e condições de pagamento na loja da Pampulha!`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(formattedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn font-sans">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border-4 border-[#0B1F3A] my-8 space-y-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-black text-[#0B1F3A]">Confira sua Solicitação</h3>
          <p className="text-xs text-[#687382]">
            Tudo pronto para enviar seus dados à equipe comercial da BH Presentes na Pampulha.
          </p>
        </div>

        {/* Lead Data Summary Box */}
        <div className="bg-[#F5F7FA] rounded-2xl p-4 border border-gray-200 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <span className="font-extrabold text-[#0B1F3A]">Cliente:</span>
            <span className="font-bold text-[#176BFF]">{leadData.fullName}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <span className="font-extrabold text-[#0B1F3A]">WhatsApp:</span>
            <span className="font-bold text-[#25D366]">{leadData.whatsapp}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <span className="font-extrabold text-[#0B1F3A]">Smartphone Procurado:</span>
            <span className="font-black text-[#0B1F3A]">{leadData.desiredSmartphone}</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <span className="font-extrabold text-[#0B1F3A]">Condição & Pagamento:</span>
            <span className="font-semibold text-[#687382]">
              {leadData.conditionPreference} • {leadData.paymentMethod}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[#0B1F3A]">Aparelho na Troca:</span>
            <span className="font-semibold text-[#687382]">
              {leadData.hasTradeIn ? "Sim (Com entrada)" : "Não"}
            </span>
          </div>
        </div>

        {/* WhatsApp Message Preview Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-extrabold text-[#0B1F3A]">
            <span>Mensagem Preparada para o WhatsApp:</span>
            <button
              onClick={handleCopyMessage}
              className="text-[#176BFF] hover:underline flex items-center space-x-1 font-bold"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#25D366]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copiado!" : "Copiar mensagem"}</span>
            </button>
          </div>

          <div className="bg-[#E5DDD5] p-4 rounded-2xl border border-emerald-300 text-xs font-mono text-gray-800 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
            {formattedMessage}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-[#0B1F3A] font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            <Edit2 className="w-4 h-4" />
            <span>Editar Informações</span>
          </button>

          <button
            onClick={() => onConfirmSend(formattedMessage)}
            className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs rounded-xl transition-all shadow-xl shadow-[#25D366]/30 flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Abrir e Enviar no WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
