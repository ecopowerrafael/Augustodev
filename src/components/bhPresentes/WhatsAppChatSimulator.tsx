import React, { useState, useEffect } from "react";
import { STORE_INFO } from "../../data/bhPresentesData";
import { Send, CheckCheck, X, Phone, Video, MoreVertical, Sparkles, Store, MapPin, ExternalLink } from "lucide-react";

interface WhatsAppChatSimulatorProps {
  clientName: string;
  initialMessage: string;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: "client" | "store";
  text: string;
  time: string;
}

export const WhatsAppChatSimulator: React.FC<WhatsAppChatSimulatorProps> = ({ clientName, initialMessage, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "client",
      text: initialMessage,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [isTyping, setIsTyping] = useState(true);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    // Simulate commercial team fast reply after 1.5s
    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: "msg-2",
          sender: "store",
          text: `Olá, ${clientName}! 👋 Que excelente escolha! Sou o consultor da BH Presentes na Pampulha.\n\nTemos esse modelo disponível em nosso estoque! Gostaria de ver as cores disponíveis ou agendar sua retirada em nossa loja física na Av. Presidente Antônio Carlos?`,
          time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }, 1500);

    return () => clearTimeout(timer);
  }, [clientName]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `client-${Date.now()}`,
      sender: "client",
      text,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setIsTyping(true);

    // Auto store reply
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `store-${Date.now()}`,
          sender: "store",
          text: `Perfeito! Registrei seu interesse. Nosso consultor está preparando a oferta personalizada para você. Você também pode visitar nossa loja física das 9h às 19h! 📍`,
          time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 font-sans animate-fadeIn">
      <div className="bg-[#E5DDD5] rounded-3xl max-w-lg w-full h-[600px] flex flex-col shadow-2xl relative overflow-hidden border-4 border-[#0B1F3A]">
        {/* WhatsApp Top Header Bar */}
        <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={STORE_INFO.logoUrl}
                alt={STORE_INFO.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
              <span className="w-3 h-3 bg-[#25D366] rounded-full border-2 border-[#075E54] absolute bottom-0 right-0" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-extrabold text-sm">{STORE_INFO.name}</span>
                <span className="px-1.5 py-0.2 bg-[#25D366] text-[9px] font-black uppercase rounded">Pampulha</span>
              </div>
              <p className="text-[11px] text-emerald-100 flex items-center space-x-1">
                {isTyping ? (
                  <span className="animate-pulse font-bold text-[#FFC928]">Digitando mensagem...</span>
                ) : (
                  <span>Online agora • Atendimento Comercial</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-white">
            <button
              onClick={() => window.open(`https://wa.me/${STORE_INFO.whatsapp}`, "_blank")}
              className="p-1.5 rounded-lg hover:bg-white/10"
              title="Abrir no WhatsApp Real"
            >
              <ExternalLink className="w-5 h-5 text-[#FFC928]" />
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans">
          <div className="text-center my-2">
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-3 py-1 rounded-lg shadow-sm">
              🔒 As mensagens são criptografadas de ponta a ponta
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 shadow-sm text-xs font-medium space-y-1 ${
                  msg.sender === "client"
                    ? "bg-[#DCF8C6] text-gray-900 rounded-tr-none"
                    : "bg-white text-gray-900 rounded-tl-none border border-gray-200"
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                <div className="flex items-center justify-end space-x-1 text-[9px] text-gray-500">
                  <span>{msg.time}</span>
                  {msg.sender === "client" && <CheckCheck className="w-3.5 h-3.5 text-blue-500" />}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl p-3 text-xs text-gray-500 italic flex items-center space-x-2 border border-gray-200">
                <span className="w-2 h-2 rounded-full bg-[#128C7E] animate-ping" />
                <span>Consultor BH Presentes digitando...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestions Pills */}
        <div className="p-2 bg-[#F0F0F0] border-t border-gray-200 flex overflow-x-auto gap-2 shrink-0">
          <button
            onClick={() => handleSendMessage("Quero ver fotos reais das cores disponíveis")}
            className="px-3 py-1 bg-white hover:bg-emerald-50 text-emerald-800 text-[11px] font-bold rounded-full border border-emerald-300 whitespace-nowrap"
          >
            📸 Ver fotos reais
          </button>
          <button
            onClick={() => handleSendMessage("Qual o endereço exato para retirada na Pampulha?")}
            className="px-3 py-1 bg-white hover:bg-emerald-50 text-emerald-800 text-[11px] font-bold rounded-full border border-emerald-300 whitespace-nowrap"
          >
            📍 Endereço da loja
          </button>
          <button
            onClick={() => handleSendMessage("Como funciona a simulação de parcelamento?")}
            className="px-3 py-1 bg-white hover:bg-emerald-50 text-emerald-800 text-[11px] font-bold rounded-full border border-emerald-300 whitespace-nowrap"
          >
            💳 Simular parcelas
          </button>
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 bg-[#F0F0F0] border-t border-gray-300 flex items-center space-x-2 shrink-0">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Digite uma resposta..."
            className="flex-1 p-2.5 bg-white rounded-full text-xs font-semibold focus:outline-none border border-gray-300"
          />
          <button
            onClick={() => handleSendMessage()}
            className="p-2.5 bg-[#128C7E] text-white rounded-full hover:bg-[#075E54] transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
