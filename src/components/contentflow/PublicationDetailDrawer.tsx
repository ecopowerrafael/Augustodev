import React, { useState } from 'react';
import { 
  X, CheckCircle, Clock, AlertTriangle, MessageSquare, Send, Calendar, User, 
  Layers, FileText, Image as ImageIcon, ChevronRight, CornerDownRight, CheckSquare,
  Sparkles, ExternalLink, ArrowRight
} from 'lucide-react';
import { ContentItem, ContentStatus } from '../../types/contentflow';

interface PublicationDetailDrawerProps {
  item: ContentItem | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: ContentStatus) => void;
  onAddComment: (id: string, commentText: string) => void;
  isDarkMode: boolean;
}

export const PublicationDetailDrawer: React.FC<PublicationDetailDrawerProps> = ({
  item,
  onClose,
  onUpdateStatus,
  onAddComment,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'media' | 'comments' | 'timeline'>('details');
  const [newComment, setNewComment] = useState('');
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  if (!item) return null;

  const statusLabels: Record<ContentStatus, { label: string; bg: string; text: string }> = {
    idea: { label: 'Banco de Ideias', bg: 'bg-stone-100 dark:bg-stone-800', text: 'text-stone-700 dark:text-stone-300' },
    in_production: { label: 'Em Produção', bg: 'bg-blue-100 dark:bg-blue-950', text: 'text-blue-700 dark:text-blue-300' },
    review: { label: 'Revisão Interna', bg: 'bg-amber-100 dark:bg-amber-950', text: 'text-amber-700 dark:text-amber-300' },
    approval: { label: 'Aguardando Cliente', bg: 'bg-purple-100 dark:bg-purple-950', text: 'text-purple-700 dark:text-purple-300' },
    changes_requested: { label: 'Ajustes Solicitados', bg: 'bg-red-100 dark:bg-red-950', text: 'text-red-700 dark:text-red-300' },
    approved: { label: 'Aprovado!', bg: 'bg-emerald-100 dark:bg-emerald-950', text: 'text-emerald-700 dark:text-emerald-300' },
    published: { label: 'Publicado', bg: 'bg-teal-100 dark:bg-teal-950', text: 'text-teal-700 dark:text-teal-300' },
    cancelled: { label: 'Cancelado', bg: 'bg-stone-200 dark:bg-stone-800', text: 'text-stone-500' },
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(item.id, newComment);
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className={`w-full max-w-2xl h-full border-l shadow-2xl flex flex-col justify-between overflow-hidden transition-all ${
        isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
      }`}>
        {/* Top Header */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-start justify-between bg-stone-50/50 dark:bg-stone-900/50">
          <div className="space-y-2 max-w-md">
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${statusLabels[item.status].bg} ${statusLabels[item.status].text}`}>
                {statusLabels[item.status].label}
              </span>
              <span className="text-xs font-mono font-bold text-[#6C4FF8]">
                {item.channel} • {item.format}
              </span>
            </div>
            <h2 className="text-lg font-bold leading-snug">{item.title}</h2>
            <div className="flex items-center space-x-2 text-xs text-stone-500">
              <img src={item.clientLogo} alt={item.clientName} className="w-4 h-4 rounded object-cover" />
              <span className="font-semibold text-stone-700 dark:text-stone-300">{item.clientName}</span>
              <span>•</span>
              <span>Publicação: {item.scheduledPublishDate}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-stone-200 dark:border-stone-800 flex space-x-6 text-xs font-bold bg-white dark:bg-stone-900">
          {[
            { id: 'details', label: 'Briefing & Checklist' },
            { id: 'media', label: 'Mídia & Legenda' },
            { id: 'comments', label: `Comentários (${item.comments.length})` },
            { id: 'timeline', label: 'Histórico' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-[#6C4FF8] text-[#6C4FF8]'
                  : 'border-transparent text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Status Fast Actions Bar */}
              <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-purple-900 dark:text-purple-200">Avançar Etapa do Fluxo Editorial</p>
                  <p className="text-[11px] text-purple-700 dark:text-purple-400">Mover status do conteúdo no Kanban</p>
                </div>
                <select
                  value={item.status}
                  onChange={(e) => onUpdateStatus(item.id, e.target.value as ContentStatus)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-stone-800 border border-purple-300 dark:border-purple-700 text-purple-900 dark:text-purple-200 shadow-sm"
                >
                  <option value="idea">Mover p/ Banco de Ideias</option>
                  <option value="in_production">Mover p/ Em Produção</option>
                  <option value="review">Mover p/ Revisão Interna</option>
                  <option value="approval">Mover p/ Aprovação do Cliente</option>
                  <option value="approved">Marcar como Aprovado</option>
                  <option value="published">Marcar como Publicado</option>
                </select>
              </div>

              {/* Briefing Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">Briefing do Conteúdo</h4>
                <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/50 space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-stone-500 block">Objetivo da Peça:</span>
                    <p className="text-stone-800 dark:text-stone-200 font-medium">{item.briefing.objective}</p>
                  </div>
                  <div>
                    <span className="font-bold text-stone-500 block">Público-Alvo:</span>
                    <p className="text-stone-800 dark:text-stone-200 font-medium">{item.briefing.targetAudience}</p>
                  </div>
                  <div>
                    <span className="font-bold text-stone-500 block">Diretrizes & Orientações Visuais:</span>
                    <p className="text-stone-800 dark:text-stone-200 font-medium">{item.briefing.guidelines}</p>
                  </div>
                </div>
              </div>

              {/* Checklist Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">Checklist de Produção</h4>
                <div className="space-y-2">
                  {item.checklist.map((chk) => (
                    <div
                      key={chk.id}
                      className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center space-x-3 text-xs"
                    >
                      <input
                        type="checkbox"
                        checked={chk.completed}
                        readOnly
                        className="w-4 h-4 text-[#6C4FF8] rounded border-stone-300 focus:ring-purple-500"
                      />
                      <span className={chk.completed ? 'line-through text-stone-400' : 'font-semibold text-stone-800 dark:text-stone-200'}>
                        {chk.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsible Team */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">Equipe Envolvida</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center space-x-2.5">
                    <img src={item.assigneeAvatar} alt={item.assigneeName} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <p className="font-bold">{item.assigneeName}</p>
                      <p className="text-[10px] text-stone-400">Responsável / Criador</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                      {item.reviewerName[0]}
                    </div>
                    <div>
                      <p className="font-bold">{item.reviewerName}</p>
                      <p className="text-[10px] text-stone-400">Revisor Interno</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-6">
              {/* Media Preview Component */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">Prévia Visual da Arte</h4>
                <div className="rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden bg-black flex flex-col items-center justify-center relative">
                  {item.media.type === 'carousel' && item.media.carouselSlides ? (
                    <div className="w-full">
                      <img
                        src={item.media.carouselSlides[activeSlideIndex]}
                        alt={`Slide ${activeSlideIndex + 1}`}
                        className="w-full max-h-[380px] object-contain mx-auto"
                      />
                      <div className="p-3 bg-stone-900 border-t border-stone-800 flex items-center justify-between text-xs text-stone-300">
                        <span>Slide {activeSlideIndex + 1} de {item.media.carouselSlides.length}</span>
                        <div className="flex space-x-2">
                          {item.media.carouselSlides.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveSlideIndex(idx)}
                              className={`w-6 h-6 rounded-full text-xs font-bold transition-colors ${
                                activeSlideIndex === idx ? 'bg-[#6C4FF8] text-white' : 'bg-stone-800 text-stone-400'
                              }`}
                            >
                              {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img src={item.media.url} alt={item.title} className="w-full max-h-[380px] object-cover" />
                  )}
                </div>
              </div>

              {/* Caption & Copywriting */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">Legenda Oficial</h4>
                <div className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/50 space-y-3 font-serif text-xs leading-relaxed">
                  <p className="whitespace-pre-line text-stone-800 dark:text-stone-200">{item.media.caption}</p>
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-700 font-sans font-bold text-purple-600">
                    Chamada para Ação: <span className="font-normal text-stone-700 dark:text-stone-300">{item.media.callToAction}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">Comentários & Histórico de Revisão</h4>

              {/* Comment Feed */}
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {item.comments.length === 0 ? (
                  <div className="p-8 text-center text-xs text-stone-400 border border-dashed rounded-2xl">
                    Nenhum comentário registrado nesta publicação.
                  </div>
                ) : (
                  item.comments.map((cm) => (
                    <div
                      key={cm.id}
                      className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                        cm.authorRole === 'Cliente'
                          ? 'bg-pink-50/50 border-pink-200 dark:bg-pink-950/20 dark:border-pink-900'
                          : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img src={cm.authorAvatar} alt={cm.authorName} className="w-6 h-6 rounded-full object-cover" />
                          <span className="font-bold">{cm.authorName}</span>
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold ${
                            cm.authorRole === 'Cliente' ? 'bg-pink-200 text-pink-800' : 'bg-purple-200 text-purple-800'
                          }`}>
                            {cm.authorRole}
                          </span>
                          {cm.slideNumber && (
                            <span className="text-[10px] font-bold text-amber-600">Slide {cm.slideNumber}</span>
                          )}
                        </div>
                        <span className="text-[10px] text-stone-400">{cm.createdAt}</span>
                      </div>
                      <p className="text-stone-700 dark:text-stone-200 leading-relaxed font-sans pl-8">{cm.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Comment Input */}
              <form onSubmit={handleSendComment} className="flex items-center space-x-2 pt-2">
                <input
                  type="text"
                  placeholder="Escreva um comentário ou feedback..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-medium focus:ring-2 focus:ring-[#6C4FF8] focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-[#6C4FF8] text-white hover:bg-[#5a3ee3] transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-400">Linha do Tempo de Alterações</h4>
              <div className="space-y-4 relative pl-4 border-l-2 border-purple-200 dark:border-purple-900 ml-2">
                {item.timeline.map((ev) => (
                  <div key={ev.id} className="relative space-y-1">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-[#6C4FF8] ring-4 ring-white dark:ring-stone-900" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold">{ev.title}</span>
                      <span className="text-[10px] text-stone-400">{ev.timestamp}</span>
                    </div>
                    <p className="text-xs text-stone-500">{ev.description}</p>
                    <p className="text-[10px] font-semibold text-purple-600">Por: {ev.actorName}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex items-center justify-between">
          <span className="text-xs text-stone-400 font-mono">ID: {item.id}</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 text-xs font-bold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
