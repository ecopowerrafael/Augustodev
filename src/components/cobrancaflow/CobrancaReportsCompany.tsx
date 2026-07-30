import React, { useState } from 'react';
import { 
  PieChart as PieChartIcon, 
  Building2, 
  Users, 
  ShieldCheck, 
  FileText, 
  Download, 
  Save, 
  CheckCircle2, 
  Lock, 
  DollarSign, 
  TrendingUp, 
  Percent, 
  Send 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { CompanySettings, UserRole } from '../../types/cobrancaflow';

interface CobrancaReportsCompanyProps {
  companySettings: CompanySettings;
  userRole: UserRole;
  onSaveCompanySettings: (newSettings: CompanySettings) => void;
}

export const CobrancaReportsCompany: React.FC<CobrancaReportsCompanyProps> = ({
  companySettings,
  userRole,
  onSaveCompanySettings
}) => {
  const [subTab, setSubTab] = useState<'reports' | 'company' | 'users'>('reports');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form state for Company
  const [formData, setFormData] = useState<CompanySettings>(companySettings);

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCompanySettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Sample Payment Methods Chart Data
  const paymentMethodData = [
    { method: 'PIX Instantâneo', val: 18450, color: '#16A36A' },
    { method: 'Boleto Bancário', val: 8900, color: '#2563EB' },
    { method: 'Cartão de Crédito', val: 3200, color: '#9333EA' },
    { method: 'Transferência / TED', val: 1500, color: '#F5B942' },
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl font-bold">
              <PieChartIcon className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-slate-900">Relatórios & Configurações da Empresa</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Análise gerencial de recebimentos e personalização dos dados da sua empresa.
          </p>
        </div>

        {/* SubTab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setSubTab('reports')}
            className={`px-3.5 py-1.5 rounded-lg transition ${subTab === 'reports' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'}`}
          >
            Relatórios Financeiros
          </button>
          <button
            onClick={() => setSubTab('company')}
            className={`px-3.5 py-1.5 rounded-lg transition ${subTab === 'company' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'}`}
          >
            Dados da Empresa
          </button>
          <button
            onClick={() => setSubTab('users')}
            className={`px-3.5 py-1.5 rounded-lg transition ${subTab === 'users' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'}`}
          >
            Usuários & Permissões
          </button>
        </div>
      </div>

      {/* SUBTAB 1: RELATÓRIOS FINANCEIROS */}
      {subTab === 'reports' && (
        <div className="space-y-6">
          
          {/* Top Analytical Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Taxa de Adimplência</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">92.4%</div>
              <p className="text-[11px] text-slate-500 mt-1">Pagamentos liquidados até a data</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Inadimplência Atual</span>
              <div className="text-2xl font-black text-red-600 mt-1">7.6%</div>
              <p className="text-[11px] text-slate-500 mt-1">Cobranças com atraso superior a 5 dias</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Conversão WhatsApp</span>
              <div className="text-2xl font-black text-blue-700 mt-1">84.1%</div>
              <p className="text-[11px] text-slate-500 mt-1">Pagantes após o 1º lembrete</p>
            </div>

          </div>

          {/* Payment Method Chart */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Recebimentos por Forma de Pagamento</h3>
                <p className="text-xs text-slate-500 font-medium">Volume financeiro acumulado em R$</p>
              </div>

              <button
                onClick={() => alert('Exportando relatório financeiro detalhado em formato CSV...')}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl border border-slate-300 transition flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>Exportar Relatório CSV</span>
              </button>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentMethodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="method" stroke="#64748B" fontSize={11} />
                  <YAxis stroke="#64748B" fontSize={11} tickFormatter={(v) => `R$ ${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: any) => [formatCurrency(Number(value)), 'Valor Total']} />
                  <Bar dataKey="val" radius={[8, 8, 0, 0]}>
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

      {/* SUBTAB 2: DADOS DA EMPRESA */}
      {subTab === 'company' && (
        <form onSubmit={handleSaveCompany} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6 text-xs font-sans">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-slate-900">Dados Cadastrais da Empresa</h3>
            
            <div className="flex items-center space-x-2">
              {savedSuccess && (
                <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Dados Atualizados!</span>
                </span>
              )}
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-200 transition flex items-center space-x-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Alterações</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-700 font-bold block">Nome da Empresa / Razão Social</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-extrabold focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-bold block">CNPJ ou CPF do Responsável</label>
              <input
                type="text"
                required
                value={formData.cnpj}
                onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-slate-700 font-bold block">WhatsApp Oficial de Atendimento</label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-bold block">E-mail Financeiro</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-bold block">Chave PIX Principal</label>
              <input
                type="text"
                value={formData.pixKey}
                onChange={(e) => setFormData({ ...formData, pixKey: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-700 font-bold block">Endereço Físico</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-700 font-bold block">Assinatura do WhatsApp (Rodapé da Mensagem)</label>
            <input
              type="text"
              value={formData.messageSignature}
              onChange={(e) => setFormData({ ...formData, messageSignature: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
            />
          </div>

        </form>
      )}

      {/* SUBTAB 3: USUÁRIOS & PERMISSÕES */}
      {subTab === 'users' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6 text-xs font-sans">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Perfis de Acesso & Controle de Permissões</h3>
              <p className="text-xs text-slate-500 font-medium">Administrador vs Operador do sistema</p>
            </div>

            <span className="px-3 py-1 bg-purple-100 text-purple-900 border border-purple-300 rounded-full font-bold">
              Perfil Atual: {userRole === 'administrator' ? 'Administrador' : 'Operador'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Admin Card */}
            <div className="border-2 border-blue-200 bg-blue-50/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 border-b border-blue-200 pb-2">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
                <h4 className="font-extrabold text-blue-950 text-sm">Perfil Administrador</h4>
              </div>

              <ul className="space-y-1.5 text-slate-700 font-medium">
                <li>✓ Gerenciar usuários e trocar permissões</li>
                <li>✓ Cadastrar clientes e criar cobranças</li>
                <li>✓ Configurar réguas e modelos de mensagens</li>
                <li>✓ Configurar integração oficial com WhatsApp</li>
                <li>✓ Acesso total aos relatórios financeiros</li>
                <li>✓ Alterar dados cadastrais e chave PIX da empresa</li>
              </ul>
            </div>

            {/* Operator Card */}
            <div className="border-2 border-slate-200 bg-slate-50 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
                <Users className="w-5 h-5 text-slate-700" />
                <h4 className="font-extrabold text-slate-900 text-sm">Perfil Operador</h4>
              </div>

              <ul className="space-y-1.5 text-slate-700 font-medium">
                <li>✓ Cadastrar clientes e criar cobranças</li>
                <li>✓ Consultar agenda e disparar mensagens manuais</li>
                <li>✓ Visualizar histórico de envios</li>
                <li>✓ Registrar pagamentos recebidos</li>
                <li>✗ Bloqueado: Não altera réguas globais do WhatsApp</li>
                <li>✗ Bloqueado: Não altera chave PIX principal</li>
              </ul>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
