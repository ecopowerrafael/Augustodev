import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Plus, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  MessageSquare, 
  DollarSign, 
  Calendar as CalendarIcon, 
  Repeat, 
  Share2, 
  ExternalLink, 
  Edit, 
  Trash2, 
  X, 
  QrCode, 
  Copy, 
  Check, 
  Send,
  Upload,
  Sparkles
} from 'lucide-react';
import { Client, Charge, ChargeStatus, RecurrenceType, PaymentMethod, MessageTemplate } from '../../types/cobrancaflow';

interface CobrancaListAndFormProps {
  charges: Charge[];
  clients: Client[];
  templates: MessageTemplate[];
  onAddCharge: (chargeData: Omit<Charge, 'id' | 'createdAt'>) => void;
  onUpdateChargeStatus: (chargeId: string, status: ChargeStatus, paidData?: { paidAt: string; paidAmount: number; notes?: string }) => void;
  onDeleteCharge: (chargeId: string) => void;
  onSendInstantWhatsapp: (charge: Charge) => void;
  preselectedClientId?: string;
}

export const CobrancaListAndForm: React.FC<CobrancaListAndFormProps> = ({
  charges,
  clients,
  templates,
  onAddCharge,
  onUpdateChargeStatus,
  onDeleteCharge,
  onSendInstantWhatsapp,
  preselectedClientId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(!!preselectedClientId);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isPixQrModalOpen, setIsPixQrModalOpen] = useState(false);
  const [selectedCharge, setSelectedCharge] = useState<Charge | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  // New Charge Form Data
  const [formData, setFormData] = useState({
    clientId: preselectedClientId || (clients[0]?.id || ''),
    description: '',
    amount: '',
    dueDate: new Date().toISOString().split('T')[0],
    preferredSendTime: '09:00',
    recurrence: 'unica' as RecurrenceType,
    installmentTotal: 1,
    paymentMethod: 'pix' as PaymentMethod,
    paymentLink: '',
    pixKey: 'financeiro@cobrancaflow.com.br',
    pixCopiaCola: '',
    notes: '',
    templateId: templates[0]?.id || 'tpl-1',
    autoSendEnabled: true,
  });

  // Pay Modal Form Data
  const [payFormData, setPayFormData] = useState({
    paidAt: new Date().toISOString().split('T')[0],
    paidAmount: '',
    interest: '0.00',
    discount: '0.00',
    sendReceiptWhatsapp: true,
    notes: 'Pagamento recebido e verificado com sucesso.'
  });

  const handleOpenAddModal = () => {
    setFormData({
      clientId: preselectedClientId || (clients[0]?.id || ''),
      description: '',
      amount: '',
      dueDate: new Date().toISOString().split('T')[0],
      preferredSendTime: '09:00',
      recurrence: 'unica',
      installmentTotal: 1,
      paymentMethod: 'pix',
      paymentLink: '',
      pixKey: 'financeiro@cobrancaflow.com.br',
      pixCopiaCola: '',
      notes: '',
      templateId: templates[0]?.id || 'tpl-1',
      autoSendEnabled: true,
    });
    setIsAddModalOpen(true);
  };

  const handleOpenPayModal = (charge: Charge) => {
    setSelectedCharge(charge);
    setPayFormData({
      paidAt: new Date().toISOString().split('T')[0],
      paidAmount: charge.amount.toString(),
      interest: '0.00',
      discount: '0.00',
      sendReceiptWhatsapp: true,
      notes: 'Pagamento via PIX confirmado.'
    });
    setIsPayModalOpen(true);
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const clientObj = clients.find(c => c.id === formData.clientId);
    if (!clientObj || !formData.amount || !formData.description) {
      alert('Por favor, selecione um cliente e preencha o valor e a descrição.');
      return;
    }

    const numAmount = parseFloat(formData.amount.replace(',', '.'));

    onAddCharge({
      clientId: clientObj.id,
      clientName: clientObj.fullName,
      clientPhone: clientObj.phone,
      clientWhatsapp: clientObj.whatsapp,
      clientCpfCnpj: clientObj.cpfCnpj,
      description: formData.description,
      amount: numAmount,
      dueDate: formData.dueDate,
      preferredSendTime: formData.preferredSendTime,
      paymentMethod: formData.paymentMethod,
      paymentLink: formData.paymentLink || `https://cobrancaflow.app/pay/${Math.random().toString(36).substr(2, 6)}`,
      pixKey: formData.pixKey,
      pixCopiaCola: formData.pixCopiaCola || `00020126580014br.gov.bcb.pix0136${Math.random().toString(36).substr(2, 8)}`,
      notes: formData.notes,
      status: formData.dueDate === new Date().toISOString().split('T')[0] ? 'vence_hoje' : 'a_vencer',
      templateId: formData.templateId,
      autoSendEnabled: formData.autoSendEnabled,
      recurrence: formData.recurrence,
      installmentCurrent: formData.recurrence === 'parcelada' ? 1 : undefined,
      installmentTotal: formData.recurrence === 'parcelada' ? formData.installmentTotal : undefined,
    });

    setIsAddModalOpen(false);
  };

  const handleSubmitPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCharge) return;

    const numPaid = parseFloat(payFormData.paidAmount.replace(',', '.'));

    onUpdateChargeStatus(selectedCharge.id, 'paga', {
      paidAt: payFormData.paidAt,
      paidAmount: numPaid,
      notes: payFormData.notes
    });

    if (payFormData.sendReceiptWhatsapp) {
      alert(`Comprovante e mensagem de agradecimento enviados para o WhatsApp de ${selectedCharge.clientName}!`);
    }

    setIsPayModalOpen(false);
    setSelectedCharge(null);
  };

  // Filter charges
  const filteredCharges = charges.filter(charge => {
    const matchesSearch = 
      charge.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charge.amount.toString().includes(searchTerm);

    if (!matchesSearch) return false;

    if (selectedStatus === 'all') return true;
    if (selectedStatus === 'vence_hoje') return charge.status === 'vence_hoje';
    if (selectedStatus === 'a_vencer') return charge.status === 'a_vencer';
    if (selectedStatus === 'vencida') return charge.status === 'vencida';
    if (selectedStatus === 'paga') return charge.status === 'paga';
    if (selectedStatus === 'agendada') return charge.status === 'agendada';

    return true;
  });

  const getStatusBadge = (status: ChargeStatus) => {
    switch (status) {
      case 'paga':
        return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full text-[10px] font-extrabold flex items-center space-x-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /><span>PAGA</span></span>;
      case 'vence_hoje':
        return <span className="px-2.5 py-1 bg-blue-100 text-blue-900 border border-blue-300 rounded-full text-[10px] font-extrabold flex items-center space-x-1 animate-pulse"><Clock className="w-3 h-3 text-blue-600" /><span>VENCE HOJE</span></span>;
      case 'a_vencer':
        return <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-[10px] font-extrabold flex items-center space-x-1"><Clock className="w-3 h-3 text-amber-600" /><span>A VENCER</span></span>;
      case 'vencida':
        return <span className="px-2.5 py-1 bg-red-100 text-red-900 border border-red-300 rounded-full text-[10px] font-extrabold flex items-center space-x-1"><AlertTriangle className="w-3 h-3 text-red-600" /><span>VENCIDA</span></span>;
      case 'agendada':
        return <span className="px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-300 rounded-full text-[10px] font-extrabold">AGENDADA</span>;
      default:
        return <span className="px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-300 rounded-full text-[10px] font-extrabold">{status.toUpperCase()}</span>;
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Module Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl font-bold">
              <FileText className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-slate-900">Gestão de Cobranças</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Cadastre títulos, acompanhe o status de pagamento e programe régua de disparos pelo WhatsApp.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-200 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Nova Cobrança</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por cliente, descrição, valor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'Todas' },
            { id: 'vence_hoje', label: 'Vence Hoje' },
            { id: 'a_vencer', label: 'A Vencer' },
            { id: 'vencida', label: 'Vencidas' },
            { id: 'paga', label: 'Pagas' },
            { id: 'agendada', label: 'Agendadas' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition ${
                selectedStatus === tab.id
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Charges Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4">Cliente</th>
                <th className="py-3.5 px-4">Descrição da Cobrança</th>
                <th className="py-3.5 px-4">Vencimento</th>
                <th className="py-3.5 px-4">Valor (R$)</th>
                <th className="py-3.5 px-4">Forma / Recorrência</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredCharges.map((charge) => (
                <tr key={charge.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-extrabold text-slate-900">{charge.clientName}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{charge.clientPhone}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800 line-clamp-1">{charge.description}</div>
                    {charge.installmentTotal && charge.installmentTotal > 1 && (
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full inline-block mt-0.5">
                        Parcela {charge.installmentCurrent}/{charge.installmentTotal}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                    {charge.dueDate}
                  </td>

                  <td className="py-3.5 px-4 font-black text-slate-900 text-sm">
                    {formatCurrency(charge.amount)}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="text-slate-800 font-bold uppercase text-[11px]">{charge.paymentMethod}</div>
                    <span className="text-[10px] text-slate-500 capitalize">{charge.recurrence}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    {getStatusBadge(charge.status)}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      
                      {/* Send Instant WhatsApp */}
                      <button
                        onClick={() => onSendInstantWhatsapp(charge)}
                        className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg border border-emerald-200 transition"
                        title="Enviar lembrete pelo WhatsApp agora"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>

                      {/* PIX QR Code Modal Trigger */}
                      <button
                        onClick={() => {
                          setSelectedCharge(charge);
                          setIsPixQrModalOpen(true);
                        }}
                        className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 transition"
                        title="Ver QR Code e Dados PIX"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                      </button>

                      {/* Register Payment (If not paid) */}
                      {charge.status !== 'paga' && (
                        <button
                          onClick={() => handleOpenPayModal(charge)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[11px] rounded-lg shadow-2xs transition flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Pagar</span>
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => {
                          if (confirm(`Deseja cancelar esta cobrança?`)) {
                            onDeleteCharge(charge.id);
                          }
                        }}
                        className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                        title="Excluir cobrança"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}

              {filteredCharges.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 font-semibold">
                    Nenhuma cobrança encontrada com os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: NEW CHARGE FORM */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-4 max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-lg text-slate-900">Cadastrar Nova Cobrança</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitAdd} className="space-y-4 text-xs font-sans">
              
              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Selecionar Cliente *</label>
                <select
                  required
                  value={formData.clientId}
                  onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold focus:border-blue-500 focus:outline-none"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName} {c.companyName ? `(${c.companyName})` : ''} - {c.phone}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Descrição da Cobrança / Serviço *</label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
                  placeholder="Ex: Mensalidade de Treinamento Corporativo - Agosto/2026"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Valor (R$) *</label>
                  <input
                    type="text"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-black text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="1450,00"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Data de Vencimento *</label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Horário do Envio</label>
                  <input
                    type="time"
                    value={formData.preferredSendTime}
                    onChange={(e) => setFormData({ ...formData, preferredSendTime: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Forma de Pagamento</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as PaymentMethod })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold focus:border-blue-500 focus:outline-none"
                  >
                    <option value="pix">PIX Instantâneo</option>
                    <option value="boleto">Boleto Bancário</option>
                    <option value="cartao_credito">Cartão de Crédito</option>
                    <option value="transferencia">Transferência Bancária</option>
                    <option value="dinheiro">Dinheiro</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Recorrência</label>
                  <select
                    value={formData.recurrence}
                    onChange={(e) => setFormData({ ...formData, recurrence: e.target.value as RecurrenceType })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold focus:border-blue-500 focus:outline-none"
                  >
                    <option value="unica">Cobrança Única</option>
                    <option value="semanal">Semanal</option>
                    <option value="quinzenal">Quinzenal</option>
                    <option value="mensal">Mensal Recorrente</option>
                    <option value="bimestral">Bimestral</option>
                    <option value="trimestral">Trimestral</option>
                    <option value="semestral">Semestral</option>
                    <option value="anual">Anual</option>
                    <option value="parcelada">Parcelada em Várias Vezes</option>
                  </select>
                </div>

                {formData.recurrence === 'parcelada' && (
                  <div className="space-y-1">
                    <label className="text-slate-700 font-bold block">Nº de Parcelas</label>
                    <input
                      type="number"
                      min={2}
                      max={48}
                      value={formData.installmentTotal}
                      onChange={(e) => setFormData({ ...formData, installmentTotal: parseInt(e.target.value) || 1 })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Chave PIX da Empresa</label>
                <input
                  type="text"
                  value={formData.pixKey}
                  onChange={(e) => setFormData({ ...formData, pixKey: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Modelo de Lembrete WhatsApp</label>
                <select
                  value={formData.templateId}
                  onChange={(e) => setFormData({ ...formData, templateId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-bold focus:border-blue-500 focus:outline-none"
                >
                  {templates.map((tpl) => (
                    <option key={tpl.id} value={tpl.id}>
                      {tpl.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-blue-900 block">Ativar Disparos Automáticos?</span>
                  <p className="text-[11px] text-blue-700">O WhatsApp enviará lembretes no prazo configurado.</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.autoSendEnabled}
                  onChange={(e) => setFormData({ ...formData, autoSendEnabled: e.target.checked })}
                  className="w-5 h-5 text-blue-600 rounded-lg cursor-pointer"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-extrabold rounded-xl hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md shadow-blue-200 transition"
                >
                  Publicar e Programar Lembretes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL: REGISTER PAYMENT */}
      {isPayModalOpen && selectedCharge && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-lg text-slate-900">Registrar Pagamento Recebido</h3>
              </div>
              <button
                onClick={() => setIsPayModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-xs">
              <div className="font-extrabold text-emerald-950">{selectedCharge.clientName}</div>
              <p className="text-emerald-800">{selectedCharge.description}</p>
              <div className="font-black text-emerald-900 text-sm">Valor Original: {formatCurrency(selectedCharge.amount)}</div>
            </div>

            <form onSubmit={handleSubmitPay} className="space-y-3 text-xs font-sans">
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Data do Recebimento</label>
                  <input
                    type="date"
                    required
                    value={payFormData.paidAt}
                    onChange={(e) => setPayFormData({ ...payFormData, paidAt: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Valor Pago (R$)</label>
                  <input
                    type="text"
                    required
                    value={payFormData.paidAmount}
                    onChange={(e) => setPayFormData({ ...payFormData, paidAmount: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-black focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={payFormData.sendReceiptWhatsapp}
                    onChange={(e) => setPayFormData({ ...payFormData, sendReceiptWhatsapp: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded-lg"
                  />
                  <span>Enviar Recibo de Agradecimento via WhatsApp</span>
                </label>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Dispara automaticamente o comprovante e encerra os lembretes pendentes deste título.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsPayModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-extrabold rounded-xl hover:bg-slate-200"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md shadow-emerald-200 transition"
                >
                  Confirmar Baixa do Título
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL: PIX QR CODE & DETAILS */}
      {isPixQrModalOpen && selectedCharge && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 text-center space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-extrabold text-sm text-slate-900">QR Code PIX de Pagamento</span>
              <button
                onClick={() => setIsPixQrModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <h4 className="font-black text-slate-900 text-base">{selectedCharge.clientName}</h4>
              <p className="text-xs text-slate-500 font-medium">{selectedCharge.description}</p>
              <div className="text-xl font-black text-blue-700 pt-1">{formatCurrency(selectedCharge.amount)}</div>
            </div>

            {/* QR Code Placeholder Box */}
            <div className="w-48 h-48 mx-auto bg-slate-100 border-2 border-slate-300 rounded-2xl p-3 flex flex-col items-center justify-center space-y-2">
              <QrCode className="w-32 h-32 text-slate-800" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">PIX Copia e Cola Pronto</span>
            </div>

            <div className="space-y-2 text-xs font-sans">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedCharge.pixCopiaCola || selectedCharge.pixKey || '');
                  setCopiedPix(true);
                  setTimeout(() => setCopiedPix(false), 2000);
                }}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-xs transition flex items-center justify-center space-x-1.5"
              >
                {copiedPix ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPix ? 'Copiado para Transferência!' : 'Copiar Código PIX'}</span>
              </button>

              <a
                href={selectedCharge.paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-xl transition flex items-center justify-center space-x-1 text-[11px]"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                <span>Abrir Checkout do Cliente</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
