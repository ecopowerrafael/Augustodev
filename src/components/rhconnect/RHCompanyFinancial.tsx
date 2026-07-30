import React, { useState } from 'react';
import { CompanyProfile, FinancialInvoice } from '../../types/rhconnect';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  FileText, 
  Download, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp,
  X
} from 'lucide-react';

interface RHCompanyFinancialProps {
  company: CompanyProfile;
  invoices: FinancialInvoice[];
  onUpgradePlan: (newPlan: 'mensal' | 'premium') => void;
  showToast: (msg: string) => void;
}

export const RHCompanyFinancial: React.FC<RHCompanyFinancialProps> = ({
  company,
  invoices,
  onUpgradePlan,
  showToast
}) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-8 text-left text-slate-900">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Gestão Financeira & Plano Corporativo</h1>
          <p className="text-xs text-slate-500 font-medium">Acompanhe seu ciclo de faturamento, faturas pagas e upgrade de limites de vagas</p>
        </div>

        <button
          onClick={() => setShowUpgradeModal(true)}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center space-x-1.5 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Alterar Plano / Fazer Upgrade</span>
        </button>
      </div>

      {/* Active Subscription Overview Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              Plano Ativo
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2 capitalize">
              {company.plan === 'free_trial' ? '7 Dias de Degustação Gratuita' : company.plan === 'mensal' ? 'Plano Mensal Empresarial' : 'Plano Premium Corporativo'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Acesso a triagem por Inteligência Artificial e publicação de vagas
            </p>
          </div>

          <div className="text-right">
            <span className="text-3xl font-black text-slate-900 font-mono">
              {company.plan === 'free_trial' ? 'R$ 0,00' : company.plan === 'mensal' ? 'R$ 299,00' : 'R$ 599,00'}
            </span>
            <span className="text-xs text-slate-500 font-bold block">/ por mês</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-slate-500 block">Status da Assinatura:</span>
            <span className="font-extrabold text-emerald-600 flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ativa & Regular</span>
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-slate-500 block">Renovação do Ciclo:</span>
            <span className="font-extrabold text-slate-900 font-mono">10 de Março de 2026</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-slate-500 block">Método de Pagamento:</span>
            <span className="font-extrabold text-slate-900">Cartão de Crédito (•••• 8821)</span>
          </div>
        </div>
      </div>

      {/* Invoices History Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Histórico de Faturas & Recibos</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Código / Fatura</th>
                <th className="py-3 px-4">Plano</th>
                <th className="py-3 px-4">Data Emissão</th>
                <th className="py-3 px-4">Valor</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Recibo PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{inv.id}</td>
                  <td className="py-3 px-4 font-bold text-slate-800">{inv.planName}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">{inv.date}</td>
                  <td className="py-3 px-4 font-black text-slate-900 font-mono">R$ {inv.amount.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px]">
                      ✓ Pago
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button 
                      onClick={() => showToast(`Download do recibo ${inv.id} iniciado.`)}
                      className="text-blue-600 font-bold hover:underline flex items-center justify-end space-x-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Plan Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden font-sans space-y-6 p-6 text-left">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Selecione o Plano Corporativo</h3>
                <p className="text-xs text-slate-500">Aumente o limite de vagas e potencialize as contratações com IA</p>
              </div>

              <button onClick={() => setShowUpgradeModal(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Monthly Plan Option */}
              <div className="p-6 rounded-2xl border-2 border-slate-200 hover:border-blue-600 transition space-y-4 bg-slate-50">
                <h4 className="font-black text-slate-900 text-base">Plano Mensal</h4>
                <div className="text-2xl font-black text-slate-900 font-mono">R$ 299 <span className="text-xs text-slate-500 font-normal">/mês</span></div>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li>✓ Até 10 vagas ativas simultâneas</li>
                  <li>✓ Triagem por IA com Score de Aderência</li>
                  <li>✓ Chat direto com candidatos</li>
                </ul>

                <button
                  onClick={() => {
                    onUpgradePlan('mensal');
                    setShowUpgradeModal(false);
                  }}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition"
                >
                  Confirmar Plano Mensal
                </button>
              </div>

              {/* Premium Plan Option */}
              <div className="p-6 rounded-2xl border-2 border-blue-600 transition space-y-4 bg-blue-50/50">
                <h4 className="font-black text-slate-900 text-base">Plano Premium</h4>
                <div className="text-2xl font-black text-slate-900 font-mono">R$ 599 <span className="text-xs text-slate-500 font-normal">/mês</span></div>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li>✓ Vagas ilimitadas</li>
                  <li>✓ Ranking IA em tempo real</li>
                  <li>✓ Suporte VIP com Gerente de Conta</li>
                </ul>

                <button
                  onClick={() => {
                    onUpgradePlan('premium');
                    setShowUpgradeModal(false);
                  }}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-sm transition"
                >
                  Confirmar Plano Premium
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
