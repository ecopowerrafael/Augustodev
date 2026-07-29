import React, { useState } from 'react';
import { VektorTab } from '../../types/vektor';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Calendar, 
  MessageSquare, 
  Building2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface VektorContactSectionProps {
  setActiveTab: (tab: VektorTab) => void;
}

export const VektorContactSection: React.FC<VektorContactSectionProps> = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    revenue: '30k-100k',
    serviceInterest: 'contabilidade-consultiva',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 font-mono text-xs uppercase tracking-widest">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Fale com Nossos Sócios</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-100">
          Vamos conversar sobre o futuro da <span className="italic font-normal text-emerald-400">sua empresa.</span>
        </h2>
        <p className="text-xs text-stone-400 font-serif leading-relaxed">
          Preencha o formulário abaixo para agendarmos uma sessão de diagnóstico tributário e financeiro sem custo com um contador sênior.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#181918] border border-stone-800 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-stone-300 uppercase font-bold block mb-1">Seu Nome *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Eduardo"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-stone-300 uppercase font-bold block mb-1">WhatsApp com DDD *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-8888"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-stone-300 uppercase font-bold block mb-1">E-mail Corporativo *</label>
                  <input
                    type="email"
                    required
                    placeholder="carlos@suaempresa.com.br"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-stone-300 uppercase font-bold block mb-1">Nome da Empresa</label>
                  <input
                    type="text"
                    placeholder="Sua Empresa LTDA"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-stone-300 uppercase font-bold block mb-1">Faturamento Mensal Aprox.</label>
                  <select
                    value={formData.revenue}
                    onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                    className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="ate-30k">Até R$ 30.000 /mês</option>
                    <option value="30k-100k">R$ 30.000 a R$ 100.000 /mês</option>
                    <option value="100k-300k">R$ 100.000 a R$ 300.000 /mês</option>
                    <option value="acima-300k">Acima de R$ 300.000 /mês</option>
                  </select>
                </div>

                <div>
                  <label className="text-stone-300 uppercase font-bold block mb-1">Interesse Principal</label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({...formData, serviceInterest: e.target.value})}
                    className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="contabilidade-consultiva">Contabilidade Consultiva 360°</option>
                    <option value="planejamento-tributario">Planejamento Tributário</option>
                    <option value="abrir-empresa">Abrir Nova Empresa (CNPJ)</option>
                    <option value="trocar-contabilidade">Trocar de Contador</option>
                    <option value="bpo-financeiro">BPO Financeiro Terceirizado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-stone-300 uppercase font-bold block mb-1">Mensagem ou Dúvida Principal</label>
                <textarea
                  rows={4}
                  placeholder="Conte um pouco sobre o momento atual da sua empresa..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-emerald-500 font-sans text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-mono text-xs uppercase font-bold tracking-wider rounded-xl transition shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Solicitar Proposta & Agendar Reunião</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="p-8 bg-emerald-950 border border-emerald-500/50 rounded-2xl text-center space-y-4 animate-fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="font-serif text-3xl text-emerald-300 font-bold">Mensagem Recebida com Sucesso!</h3>
              <p className="text-xs text-stone-300 font-sans max-w-md mx-auto">
                Obrigado, <strong className="text-white">{formData.name}</strong>. Nosso sócio responsável entrará em contato em até 30 minutos via WhatsApp ({formData.phone}).
              </p>
            </div>
          )}
        </div>

        {/* Right Info Channels & Map (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick WhatsApp Box */}
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 to-stone-900 border border-emerald-500/40 rounded-3xl space-y-4 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-emerald-400 uppercase font-bold block">ATENDIMENTO IMEDIATO</span>
                <h4 className="font-serif text-lg text-white">Preferência pelo WhatsApp?</h4>
              </div>
            </div>
            <p className="text-xs text-stone-300 font-serif">
              Converse diretamente com nosso plantão de novos clientes. Resposta garantida em até 3 minutos em horário comercial.
            </p>
            <a
              href="https://wa.me/5511999998888?text=Olá!%20Gostaria%20de%20falar%20com%20um%20contador%20da%20Vektor."
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 bg-emerald-400 text-stone-950 font-mono text-xs uppercase font-bold rounded-xl hover:bg-emerald-300 transition flex items-center justify-center space-x-2"
            >
              <span>Abrir Conversa no WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Locations */}
          <div className="p-6 bg-stone-900 border border-stone-800 rounded-3xl space-y-4 font-mono text-xs text-stone-300">
            <h4 className="font-serif text-lg text-white font-light border-b border-stone-800 pb-2">Endereços das Unidades</h4>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <span className="text-emerald-400 font-bold block">Sede São Paulo (SP)</span>
                <p className="text-stone-400 font-sans">Av. Paulista, 1842 - Conj. 1210, Bela Vista, São Paulo - SP</p>
              </div>

              <div className="space-y-1">
                <span className="text-emerald-400 font-bold block">Unidade Rio de Janeiro (RJ)</span>
                <p className="text-stone-400 font-sans">Av. Rio Branco, 156 - Sala 2204, Centro, Rio de Janeiro - RJ</p>
              </div>

              <div className="space-y-1">
                <span className="text-emerald-400 font-bold block">Unidade Curitiba (PR)</span>
                <p className="text-stone-400 font-sans">Av. Sete de Setembro, 4200 - Batel, Curitiba - PR</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
