import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, MessageSquare, PhoneCall, Mail, ShieldCheck, HelpCircle, Check } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "delivery",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedText = `Olá Augusto! Gostaria de solicitar um orçamento para o seguinte projeto:

*Nome:* ${formData.name}
*E-mail:* ${formData.email}
*Tipo de Projeto:* ${formData.projectType === "delivery" ? "Delivery App" : formData.projectType === "mobility" ? "Mobilidade" : "Site Advocacia"}

*Descrição do Projeto:*
${formData.message}`;

    const whatsappUrl = `https://wa.me/5515997118125?text=${encodeURIComponent(formattedText)}`;

    // Simulate submission and redirect
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      try {
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      } catch (err) {
        console.error("Popup blocker prevented WhatsApp redirect", err);
      }

      // Keep success active longer so user can manually click the WhatsApp button if popup blocked
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: "", email: "", projectType: "delivery", message: "" });
      }, 12000);
    }, 1500);
  };

  return (
    <div className="relative w-full bg-[#0a0a0a] rounded-xl border border-white/5 p-8 overflow-hidden" id="contact">
      {/* Glow gradient background */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-gradient-to-r from-[#00FF41]/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Left info column: Direct contact options */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-[#00FF41]/10 border border-[#00FF41]/20 px-3 py-1 rounded text-[#00FF41] font-mono text-xs uppercase font-semibold tracking-wider">
              <PhoneCall className="h-3.5 w-3.5" />
              <span>CANAIS DIRETOS // DISPONÍVEL</span>
            </div>

            <h3 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
              Vamos Desenvolver Algo <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00FF41] to-white">Espetacular</span> Juntos?
            </h3>

            <p className="text-white/60 text-sm leading-relaxed">
              Diga qual é a sua ideia ou qual solução sua empresa precisa. Retornamos o contato em menos de 12 horas com um escopo de viabilidade técnica desenhado sob medida.
            </p>
          </div>

          {/* Social cards */}
          <div className="space-y-4">
            
            {/* WhatsApp direct card - HIGH GLOW */}
            <motion.a
              href="https://wa.me/5515997118125?text=Olá%20Augusto,%20vi%20seu%20portfólio%20e%20gostaria%20de%20um%20orçamento!"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden flex items-center justify-between p-4 rounded border border-[#00FF41]/30 bg-[#00FF41]/5 hover:bg-[#00FF41]/10 text-[#00FF41] transition-all duration-300 group cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.05)] hover:shadow-[0_0_25px_rgba(0,255,65,0.25)]"
            >
              <div className="flex items-center space-x-3.5">
                <div className="p-2 rounded bg-[#00FF41]/15">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <span className="font-mono text-[8px] text-[#00FF41] font-extrabold uppercase">FALE PELO WHATSAPP</span>
                  <h4 className="font-sans font-bold text-white text-sm mt-0.5">+55 (15) 99711-8125</h4>
                </div>
              </div>
              <span className="font-mono text-[9px] text-[#00FF41] bg-[#00FF41]/20 px-2 py-0.5 rounded uppercase font-bold tracking-wider animate-pulse">ONLINE</span>
            </motion.a>

            {/* Email card */}
            <motion.a
              href="mailto:contato@augustodev.com"
              whileHover={{ scale: 1.01 }}
              className="flex items-center space-x-3.5 p-4 rounded border border-white/5 bg-black/40 hover:bg-black/60 hover:border-[#00FF41]/30 text-white/80 transition-colors cursor-pointer"
            >
              <div className="p-2 rounded bg-white/5">
                <Mail className="h-5 w-5 text-[#00FF41]" />
              </div>
              <div className="text-left">
                <span className="font-mono text-[8px] text-white/30 font-extrabold uppercase">CANAL INTEGRADO DE EMAIL</span>
                <h4 className="font-sans font-bold text-white/90 text-sm mt-0.5">contato@augustodev.com</h4>
              </div>
            </motion.a>

          </div>

          {/* Secure assurance badge */}
          <div className="flex items-center space-x-2.5 text-white/30 font-mono text-[10px] uppercase font-bold border-t border-white/5 pt-4">
            <ShieldCheck className="h-4.5 w-4.5 text-[#00FF41]" />
            <span>GARANTIA DE SIGILO E PRIVACIDADE COMPLETA</span>
          </div>
        </div>

        {/* Right input form column: Focused interface inputs */}
        <div className="lg:col-span-7 bg-[#020202] p-6 sm:p-8 rounded-xl border border-white/5 z-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Split layout: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Name Field */}
              <div className="relative group space-y-2 text-left">
                <label className="font-mono text-xs text-white/40 uppercase font-bold tracking-wider">Seu Nome</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Augusto Ferreira"
                    className="w-full bg-black/80 border border-white/10 rounded px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#00FF41] focus:ring-1 focus:ring-[#00FF41]/20 transition-all font-mono text-xs"
                  />
                  {/* Subtle vector corner highlights on focus/hover */}
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/10 group-focus-within:border-[#00FF41] transition-colors" />
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/10 group-focus-within:border-[#00FF41] transition-colors" />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative group space-y-2 text-left">
                <label className="font-mono text-xs text-white/40 uppercase font-bold tracking-wider">Seu E-mail</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="cliente@empresa.com"
                    className="w-full bg-black/80 border border-white/10 rounded px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#00FF41] focus:ring-1 focus:ring-[#00FF41]/20 transition-all font-mono text-xs"
                  />
                  <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/10 group-focus-within:border-[#00FF41] transition-colors" />
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/10 group-focus-within:border-[#00FF41] transition-colors" />
                </div>
              </div>

            </div>

            {/* Project Type selection */}
            <div className="space-y-2 text-left">
              <label className="font-mono text-xs text-white/40 uppercase font-bold tracking-wider">O que deseja desenvolver?</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: "delivery", label: "Delivery App" },
                  { value: "mobility", label: "Mobilidade" },
                  { value: "lawyer", label: "Site Advocacia" },
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, projectType: type.value })}
                    className={`py-3 px-4 rounded border font-mono text-xs font-bold cursor-pointer transition-all duration-300 uppercase ${
                      formData.projectType === type.value
                        ? "border-[#00FF41] bg-[#00FF41]/10 text-[#00FF41] shadow-[0_0_15px_rgba(0,255,65,0.15)]"
                        : "border-white/5 bg-black/40 text-white/40 hover:border-white/15 hover:text-white"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Field */}
            <div className="relative group space-y-2 text-left">
              <label className="font-mono text-xs text-white/40 uppercase font-bold tracking-wider">Conte-nos sobre o projeto</label>
              <div className="relative">
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Gostaria de criar um aplicativo integrado..."
                  className="w-full bg-black/80 border border-white/10 rounded px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#00FF41] focus:ring-1 focus:ring-[#00FF41]/20 transition-all font-mono text-xs resize-none"
                />
                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/10 group-focus-within:border-[#00FF41] transition-colors" />
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/10 group-focus-within:border-[#00FF41] transition-colors" />
              </div>
            </div>

            {/* Glowing shining submit button (HIGH GLOW / BULB GLOW ON HOVER) */}
            <div className="relative space-y-4">
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full py-4 px-6 rounded bg-black border border-[#00FF41]/50 font-mono text-xs font-bold text-[#00FF41] uppercase tracking-widest hover:bg-[#00FF41] hover:text-black transition-all duration-300 shadow-[0_2px_8px_rgba(0,255,65,0.15)] hover:shadow-[0_4px_15px_rgba(0,255,65,0.3)] group cursor-pointer disabled:opacity-50 overflow-hidden isolate relative z-0"
              >
                <div className="flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <div className="h-4 w-4 rounded-full border-2 border-[#00FF41]/20 border-t-[#00FF41] animate-spin" />
                  ) : isSuccess ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span>
                    {isSubmitting ? "ENVIANDO REQUISITO..." : isSuccess ? "MENSAGEM ENVIADA!" : "ENVIAR PROPOSTA DE PROJETO"}
                  </span>
                </div>
              </button>

              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-[#00FF41]/10 border border-[#00FF41]/30 rounded text-center text-white space-y-3"
                >
                  <p className="font-mono text-xs text-[#00FF41] font-bold uppercase tracking-widest">
                    ✓ Proposta Gerada!
                  </p>
                  <p className="text-white/70 text-[11px] leading-relaxed">
                    Se o redirecionamento automático para o WhatsApp não ocorreu, clique no botão abaixo para abrir diretamente e enviar o texto de sua proposta formatada para nós:
                  </p>
                  <a
                    href={`https://wa.me/5515997118125?text=${encodeURIComponent(
                      `Olá Augusto! Gostaria de solicitar um orçamento para o seguinte projeto:\n\n*Nome:* ${formData.name}\n*E-mail:* ${formData.email}\n*Tipo de Projeto:* ${
                        formData.projectType === "delivery"
                          ? "Delivery App"
                          : formData.projectType === "mobility"
                          ? "Mobilidade"
                          : "Site Advocacia"
                      }\n\n*Descrição do Projeto:* \n${formData.message}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 w-full py-3 px-4 rounded bg-[#00FF41] text-black font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-[0_2px_10px_rgba(0,255,65,0.2)]"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>ENVIAR VIA WHATSAPP (15) 99711-8125</span>
                  </a>
                </motion.div>
              )}
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
