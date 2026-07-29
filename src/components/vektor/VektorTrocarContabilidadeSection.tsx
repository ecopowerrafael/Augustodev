import React, { useState } from 'react';
import { VektorTab } from '../../types/vektor';
import { 
  ArrowRight, 
  Check, 
  X, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles, 
  MessageSquare, 
  FileText, 
  CheckCircle2,
  Clock,
  UserCheck
} from 'lucide-react';

interface VektorTrocarContabilidadeSectionProps {
  setActiveTab: (tab: VektorTab) => void;
}

export const VektorTrocarContabilidadeSection: React.FC<VektorTrocarContabilidadeSectionProps> = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    cnpj: '',
    currentAccountant: '',
    contactName: '',
    email: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16">
      {/* Hero Intro */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 font-mono text-xs uppercase tracking-widest">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Troca de Contador em 3 Passos</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-100">
          Trocar de contabilidade <span className="italic font-normal text-emerald-400">nunca foi tão simples e seguro.</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
          Você não precisa se preocupar com conversas desconfortáveis ou burocracia com seu contador atual. A Vektor cuida de 100% do processo de transferência de arquivos e senhas sem pausar sua operação.
        </p>
      </div>

      {/* Comparison Matrix Table */}
      <div className="space-y-6">
        <div className="border-b border-stone-800 pb-4">
          <h3 className="font-serif text-2xl font-light text-stone-100">
            Contabilidade Tradicional vs. Vektor Contabilidade Consultiva
          </h3>
          <p className="text-xs text-stone-400 font-serif">
            Veja a comparação clara entre os modelos de atendimento contábil do mercado:
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-stone-800 bg-[#161716]">
          <table className="w-full text-left font-sans text-xs">
            <thead>
              <tr className="border-b border-stone-800 bg-stone-900/80 font-mono text-[11px] text-stone-400">
                <th className="p-4 sm:p-6 uppercase">Critério de Avaliação</th>
                <th className="p-4 sm:p-6 uppercase text-stone-400">Contabilidade Tradicional</th>
                <th className="p-4 sm:p-6 uppercase text-emerald-400 bg-emerald-950/40">Vektor Contabilidade 360°</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 text-stone-300">
              <tr>
                <td className="p-4 sm:p-6 font-bold text-white font-mono">Atendimento & Canais</td>
                <td className="p-4 sm:p-6 text-stone-400">Lento, telefone fixo e e-mails que demoram dias</td>
                <td className="p-4 sm:p-6 text-emerald-300 bg-emerald-950/20 font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp dedicado com resposta em minutos</span>
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 font-bold text-white font-mono">Planejamento Tributário</td>
                <td className="p-4 sm:p-6 text-stone-400">Apenas envia as guias de impostos padrão todo mês</td>
                <td className="p-4 sm:p-6 text-emerald-300 bg-emerald-950/20 font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ativo com revisão contínua de Fator R e isenções</span>
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 font-bold text-white font-mono">Relatórios Gerenciais</td>
                <td className="p-4 sm:p-6 text-stone-400">Balanços anuais incompreensíveis apenas para o Fisco</td>
                <td className="p-4 sm:p-6 text-emerald-300 bg-emerald-950/20 font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>DRE mensal gerencial e gráficos de margem de lucro</span>
                </td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 font-bold text-white font-mono">BPO Financeiro / NFs</td>
                <td className="p-4 sm:p-6 text-stone-400">Não oferece ou cobra preços inacessíveis</td>
                <td className="p-4 sm:p-6 text-emerald-300 bg-emerald-950/20 font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Módulo completo de contas a pagar/receber opcional</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Migration Form */}
      <div className="bg-gradient-to-r from-stone-900 via-[#181918] to-stone-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-widest">
            Sem Custos de Transição
          </span>
          <h3 className="font-serif text-3xl text-stone-100 font-light">
            Inicie sua migração para a Vektor hoje mesmo
          </h3>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <input
              type="text"
              required
              placeholder="Razão Social ou Nome Fantasia"
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              className="p-3.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              required
              placeholder="CNPJ da Empresa"
              value={formData.cnpj}
              onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
              className="p-3.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="Nome do Contador/Escritório Atual"
              value={formData.currentAccountant}
              onChange={(e) => setFormData({...formData, currentAccountant: e.target.value})}
              className="p-3.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              required
              placeholder="Nome do Responsável / Sócio"
              value={formData.contactName}
              onChange={(e) => setFormData({...formData, contactName: e.target.value})}
              className="p-3.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="email"
              required
              placeholder="E-mail Corporativo"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="p-3.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="tel"
              required
              placeholder="WhatsApp com DDD"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="p-3.5 bg-stone-950 border border-stone-800 rounded-xl text-stone-200 focus:outline-none focus:border-emerald-500"
            />

            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-mono text-xs uppercase font-bold tracking-wider rounded-xl transition shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Solicitar Migração Assistida Sem Atrito</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <div className="p-6 bg-emerald-950 border border-emerald-500/50 rounded-2xl text-center space-y-3 animate-fade-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="font-serif text-2xl text-emerald-300 font-bold">Solicitação de Migração Recebida!</h4>
            <p className="text-xs text-stone-300 font-sans max-w-lg mx-auto">
              Nossa equipe de onboarding entrará em contato via WhatsApp com o sócio <strong className="text-white">{formData.contactName}</strong> para formalizar o termo de transferência.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
