import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  Edit, 
  Trash2, 
  FileSpreadsheet, 
  Download, 
  Upload, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink, 
  X, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { Client, Charge } from '../../types/cobrancaflow';

interface CobrancaClientsProps {
  clients: Client[];
  charges: Charge[];
  onAddClient: (newClient: Omit<Client, 'id' | 'totalChargesCount' | 'pendingAmount'>) => void;
  onUpdateClient: (updatedClient: Client) => void;
  onDeleteClient: (clientId: string) => void;
  onCreateChargeForClient: (client: Client) => void;
}

export const CobrancaClients: React.FC<CobrancaClientsProps> = ({
  clients,
  charges,
  onAddClient,
  onUpdateClient,
  onDeleteClient,
  onCreateChargeForClient
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'overdue' | 'active' | 'inactive'>('all');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    cpfCnpj: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    city: '',
    state: 'SP',
    notes: '',
    status: 'active' as 'active' | 'inactive'
  });

  const handleOpenAddModal = () => {
    setFormData({
      fullName: '',
      companyName: '',
      cpfCnpj: '',
      phone: '',
      whatsapp: '',
      email: '',
      address: '',
      city: 'São Paulo',
      state: 'SP',
      notes: '',
      status: 'active'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (client: Client) => {
    setSelectedClient(client);
    setFormData({
      fullName: client.fullName,
      companyName: client.companyName || '',
      cpfCnpj: client.cpfCnpj,
      phone: client.phone,
      whatsapp: client.whatsapp,
      email: client.email,
      address: client.address,
      city: client.city,
      state: client.state,
      notes: client.notes || '',
      status: client.status
    });
    setIsEditModalOpen(true);
  };

  const handleSubmitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.whatsapp) {
      alert('Por favor, preencha pelo menos o Nome Completo e o WhatsApp.');
      return;
    }

    onAddClient({
      fullName: formData.fullName,
      companyName: formData.companyName,
      cpfCnpj: formData.cpfCnpj,
      phone: formData.phone,
      whatsapp: formData.whatsapp.replace(/\D/g, ''),
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      notes: formData.notes,
      status: formData.status
    });

    setIsAddModalOpen(false);
  };

  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    onUpdateClient({
      ...selectedClient,
      fullName: formData.fullName,
      companyName: formData.companyName,
      cpfCnpj: formData.cpfCnpj,
      phone: formData.phone,
      whatsapp: formData.whatsapp.replace(/\D/g, ''),
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      notes: formData.notes,
      status: formData.status
    });

    setIsEditModalOpen(false);
    setSelectedClient(null);
  };

  // Filter clients
  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.companyName && client.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      client.cpfCnpj.includes(searchTerm) ||
      client.whatsapp.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'active') return client.status === 'active';
    if (filterStatus === 'inactive') return client.status === 'inactive';
    
    // Check overdue charges for client
    const clientCharges = charges.filter(c => c.clientId === client.id);
    const hasOverdue = clientCharges.some(c => c.status === 'vencida');
    const hasPending = clientCharges.some(c => ['a_vencer', 'vence_hoje', 'agendada'].includes(c.status));

    if (filterStatus === 'overdue') return hasOverdue;
    if (filterStatus === 'pending') return hasPending;

    return true;
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Module Title & Top Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl font-bold">
              <Users className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-slate-900">Cadastro de Clientes</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Gerencie sua base de contatos, histórico de cobranças e disparo direto no WhatsApp.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl transition flex items-center space-x-1.5 border border-slate-300"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Importar CSV / Excel</span>
          </button>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-200 transition flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Cliente</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome, empresa, CPF/CNPJ, WhatsApp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition ${
              filterStatus === 'all'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({clients.length})
          </button>

          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition ${
              filterStatus === 'pending'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Com Cobrança Pendente
          </button>

          <button
            onClick={() => setFilterStatus('overdue')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition ${
              filterStatus === 'overdue'
                ? 'bg-red-600 text-white shadow-2xs'
                : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
            }`}
          >
            Com Vencidos
          </button>

          <button
            onClick={() => setFilterStatus('active')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition ${
              filterStatus === 'active'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Ativos
          </button>
        </div>

      </div>

      {/* Clients Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4">Cliente / Razão Social</th>
                <th className="py-3.5 px-4">CPF / CNPJ</th>
                <th className="py-3.5 px-4">Contato & WhatsApp</th>
                <th className="py-3.5 px-4">Cobranças</th>
                <th className="py-3.5 px-4">Valor Pendente</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredClients.map((client) => {
                const clientCharges = charges.filter(c => c.clientId === client.id);
                const pendingSum = clientCharges
                  .filter(c => ['a_vencer', 'vence_hoje', 'vencida', 'agendada'].includes(c.status))
                  .reduce((acc, c) => acc + c.amount, 0);
                const hasOverdue = clientCharges.some(c => c.status === 'vencida');

                return (
                  <tr key={client.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900">{client.fullName}</div>
                      {client.companyName && (
                        <span className="text-[11px] text-slate-500 font-semibold block">{client.companyName}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                      {client.cpfCnpj || 'Não informado'}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-1.5 font-bold text-slate-800">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-mono text-[11px]">{client.phone}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate">{client.email}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-full font-bold text-[10px]">
                        {clientCharges.length} títulos
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className={`font-black ${hasOverdue ? 'text-red-600' : pendingSum > 0 ? 'text-blue-700' : 'text-slate-400'}`}>
                        {formatCurrency(pendingSum)}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        client.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 text-slate-600 border border-slate-300'
                      }`}>
                        {client.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        
                        {/* Create Charge Shortcut */}
                        <button
                          onClick={() => onCreateChargeForClient(client)}
                          className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg border border-blue-200 transition flex items-center space-x-1 text-[11px]"
                          title="Criar nova cobrança"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Cobrar</span>
                        </button>

                        {/* Open Direct WhatsApp */}
                        <a
                          href={`https://wa.me/55${client.whatsapp.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg border border-emerald-200 transition"
                          title="Abrir conversa no WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>

                        {/* Edit Client */}
                        <button
                          onClick={() => handleOpenEditModal(client)}
                          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                          title="Editar cadastro"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Client */}
                        <button
                          onClick={() => {
                            if (confirm(`Tem certeza que deseja excluir o cliente ${client.fullName}?`)) {
                              onDeleteClient(client.id);
                            }
                          }}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                          title="Excluir cliente"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 font-semibold">
                    Nenhum cliente encontrado com os filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD / EDIT CLIENT */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-lg text-slate-900">
                {isAddModalOpen ? 'Cadastrar Novo Cliente' : 'Editar Cadastro de Cliente'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={isAddModalOpen ? handleSubmitAdd : handleSubmitEdit} className="space-y-4 text-xs font-sans">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
                    placeholder="Ex: João Silva Andrade"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Razão Social / Nome da Empresa</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
                    placeholder="Ex: Andrade Tec LTDA"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">CPF ou CNPJ</label>
                  <input
                    type="text"
                    value={formData.cpfCnpj}
                    onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
                    placeholder="000.000.000-00"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">WhatsApp (com DDD) *</label>
                  <input
                    type="text"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
                    placeholder="(11) 98765-4321"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Telefone Fixo</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
                    placeholder="(11) 4003-0000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">E-mail de Contato</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
                    placeholder="cliente@empresa.com.br"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Status do Cadastro</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-bold focus:border-blue-500 focus:outline-none"
                  >
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-slate-700 font-bold block">Endereço Completo</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
                    placeholder="Av. Paulista, 1000 - Cj 42"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-700 font-bold block">Cidade / UF</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
                    placeholder="São Paulo / SP"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Observações Pedagógicas / Financeiras</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium focus:border-blue-500 focus:outline-none"
                  placeholder="Instruções de envio de cobrança, preferências de horário..."
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                  }}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-extrabold rounded-xl hover:bg-slate-200"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md shadow-blue-200 transition"
                >
                  {isAddModalOpen ? 'Salvar Cliente' : 'Atualizar Cliente'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL: IMPORT PLANILHA CSV/EXCEL */}
      {isImportModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-lg text-slate-900">Importação em Lote via Planilha</h3>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-sans text-slate-600">
              <p>
                Faça o upload do seu arquivo de clientes em formato <strong>CSV, XLSX ou XLS</strong> com as colunas: <em>Nome, Telefone, WhatsApp, CPF/CNPJ, E-mail, Cidade</em>.
              </p>

              <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-2xl p-6 text-center space-y-2 cursor-pointer hover:border-blue-400 transition">
                <Upload className="w-8 h-8 text-blue-600 mx-auto" />
                <div className="font-extrabold text-slate-800 text-sm">
                  Arraste e solte sua planilha aqui
                </div>
                <p className="text-[11px] text-slate-500">ou clique para selecionar do seu computador</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <span className="font-bold text-slate-700">Modelo_Importacao_CobrançaFlow.xlsx</span>
                <button
                  onClick={() => alert('Download do modelo de planilha iniciado!')}
                  className="px-2.5 py-1 bg-white border border-slate-300 text-blue-700 font-extrabold rounded-lg hover:bg-slate-100 flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar Modelo</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-extrabold rounded-xl hover:bg-slate-200"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  alert('Simulação de importação concluída! 12 novos clientes carregados na base.');
                  setIsImportModalOpen(false);
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-md shadow-emerald-200 transition"
              >
                Simular Importação
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
