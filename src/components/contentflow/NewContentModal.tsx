import React, { useState } from 'react';
import { X, Sparkles, Lightbulb, FileText, CheckSquare, UserPlus, Check } from 'lucide-react';
import { Client, ChannelType, FormatType, PriorityLevel } from '../../types/contentflow';

interface NewContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  clients: Client[];
  onCreateIdea?: (data: any) => void;
  onCreateContent: (data: any) => void;
  onCreateTask?: (data: any) => void;
  onCreateClient: (data: any) => void;
  isDarkMode: boolean;
}

export const NewContentModal: React.FC<NewContentModalProps> = ({
  isOpen,
  onClose,
  clients,
  onCreateIdea,
  onCreateContent,
  onCreateTask,
  onCreateClient,
  isDarkMode,
}) => {
  const [modalType, setModalType] = useState<'content' | 'idea' | 'task' | 'client'>('content');
  const [title, setTitle] = useState('');
  const [selectedClientId, setSelectedClientId] = useState(clients[0]?.id || '');
  const [channel, setChannel] = useState<ChannelType>('Instagram');
  const [format, setFormat] = useState<FormatType>('Carrossel');
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [description, setDescription] = useState('');
  const [assigneeName, setAssigneeName] = useState('Ana Souza');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === selectedClientId) || clients[0];

    if (modalType === 'idea') {
      onCreateIdea?.({
        title,
        description,
        clientId: client.id,
        clientName: client.brandName,
        channel,
        format,
        priority,
        tags: ['novo', 'ideia'],
        author: 'Marina Costa',
      });
    } else if (modalType === 'content') {
      onCreateContent({
        title,
        clientId: client.id,
        clientName: client.brandName,
        clientLogo: client.logo,
        channel,
        format,
        priority,
        assigneeName,
        assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        reviewerName: 'Marina Costa',
        approverName: client.contactName,
        deadlineDate: '29/07/2026',
        scheduledPublishDate: '31/07/2026',
        briefing: {
          objective: description || 'Divulgação oficial',
          targetAudience: client.strategy.targetAudience,
          guidelines: 'Seguir tom de voz da marca',
        },
        media: {
          type: format === 'Carrossel' ? 'carousel' : format === 'Reels' ? 'video' : 'image',
          url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
          caption: title,
          hashtags: ['#ContentFlow', `#${client.brandName.replace(/\s+/g, '')}`],
          callToAction: 'Confira no link da bio',
        },
      });
    } else if (modalType === 'task') {
      onCreateTask?.({
        title,
        description,
        clientId: client.id,
        clientName: client.brandName,
        assigneeName,
        assigneeAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        dueDate: '30/07/2026',
        priority,
      });
    } else if (modalType === 'client') {
      onCreateClient({
        name: title || 'Novo Cliente',
        brandName: title || 'Novo Cliente',
        segment: 'Serviços Gerais',
        logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80',
        primaryColor: '#6C4FF8',
        contactName: 'Contato Principal',
        contactEmail: 'contato@cliente.com.br',
        whatsapp: '(31) 99000-0000',
        roleTitle: 'Gerente',
        monthlyContentsTarget: 12,
      });
    }

    // Reset and close
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className={`w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden transition-all ${
        isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
      }`}>
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between border-stone-200 dark:border-stone-800">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#6C4FF8]" />
            <h3 className="text-base font-bold">Criar no ContentFlow</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Type selector tabs */}
        <div className="p-4 bg-stone-50 dark:bg-stone-900/50 border-b border-stone-200 dark:border-stone-800 grid grid-cols-4 gap-2">
          <button
            onClick={() => setModalType('content')}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
              modalType === 'content'
                ? 'bg-[#6C4FF8] text-white shadow'
                : 'bg-stone-200/60 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Conteúdo</span>
          </button>

          <button
            onClick={() => setModalType('idea')}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
              modalType === 'idea'
                ? 'bg-[#6C4FF8] text-white shadow'
                : 'bg-stone-200/60 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Ideia</span>
          </button>

          <button
            onClick={() => setModalType('task')}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
              modalType === 'task'
                ? 'bg-[#6C4FF8] text-white shadow'
                : 'bg-stone-200/60 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Tarefa</span>
          </button>

          <button
            onClick={() => setModalType('client')}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
              modalType === 'client'
                ? 'bg-[#6C4FF8] text-white shadow'
                : 'bg-stone-200/60 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Cliente</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              {modalType === 'client' ? 'Nome da Marca / Cliente' : 'Título'}
            </label>
            <input
              type="text"
              required
              placeholder={
                modalType === 'content'
                  ? 'Ex: Carrossel de 5 Dicas para Lançamento'
                  : modalType === 'idea'
                  ? 'Ex: Ideia de Reels com o Barista'
                  : modalType === 'task'
                  ? 'Ex: Exportar artes em 1080x1350'
                  : 'Ex: Café Colonial Gourmet'
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-sm font-medium focus:ring-2 focus:ring-[#6C4FF8] focus:outline-none"
            />
          </div>

          {modalType !== 'client' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Cliente Atribuído
                </label>
                <select
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-medium focus:outline-none"
                >
                  {clients.map((cli) => (
                    <option key={cli.id} value={cli.id}>
                      {cli.brandName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Prioridade
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-medium focus:outline-none"
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
            </div>
          )}

          {(modalType === 'content' || modalType === 'idea') && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Canal
                </label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value as ChannelType)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-medium focus:outline-none"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                  <option value="YouTube">YouTube</option>
                  <option value="Blog">Blog</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Formato
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as FormatType)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-medium focus:outline-none"
                >
                  <option value="Carrossel">Carrossel</option>
                  <option value="Reels">Reels / Vídeo Curto</option>
                  <option value="Post Estático">Post Estático</option>
                  <option value="Stories">Stories</option>
                  <option value="Artigo">Artigo</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              {modalType === 'content' ? 'Briefing & Descrição' : 'Observações'}
            </label>
            <textarea
              rows={3}
              placeholder="Descreva o objetivo, orientações visuais e detalhes importantes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-medium focus:ring-2 focus:ring-[#6C4FF8] focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end space-x-3 border-t border-stone-200 dark:border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#6C4FF8] hover:bg-[#5a3ee3] text-white text-xs font-bold shadow-md shadow-purple-500/20 transition-all flex items-center space-x-1.5"
            >
              <Check className="w-4 h-4" />
              <span>
                {modalType === 'content'
                  ? 'Criar Publicação'
                  : modalType === 'idea'
                  ? 'Salvar no Banco'
                  : modalType === 'task'
                  ? 'Criar Tarefa'
                  : 'Cadastrar Cliente'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
