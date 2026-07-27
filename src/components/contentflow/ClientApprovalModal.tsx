import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, MessageSquare, Send, Sparkles, Check, ThumbsUp, Edit3 } from 'lucide-react';
import { ContentItem } from '../../types/contentflow';

interface ClientApprovalModalProps {
  item: ContentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmApprove: (id: string, comment: string) => void;
  onRequestAdjustments: (id: string, comment: string, slideNumber?: number) => void;
  isDarkMode: boolean;
}

export const ClientApprovalModal: React.FC<ClientApprovalModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirmApprove,
  onRequestAdjustments,
  isDarkMode,
}) => {
  const [mode, setMode] = useState<'view' | 'approve' | 'adjust'>('view');
  const [commentText, setCommentText] = useState('');
  const [slideNum, setSlideNum] = useState<number>(3);

  if (!isOpen || !item) return null;

  const handleApprove = () => {
    onConfirmApprove(item.id, commentText || 'Conteúdo aprovado no portal do cliente!');
    setCommentText('');
    setMode('view');
    onClose();
  };

  const handleAdjustments = () => {
    if (!commentText.trim()) return;
    onRequestAdjustments(item.id, commentText, slideNum);
    setCommentText('');
    setMode('view');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all ${
        isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#22A06B] to-emerald-400 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Portal de Aprovação de Conteúdo</h3>
              <p className="text-xs text-stone-400">{item.clientName} • Publicação prevista para {item.scheduledPublishDate}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {mode === 'view' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column: Visual Media Preview */}
              <div className="md:col-span-6 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Prévia da Peça</h4>
                <div className="rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden bg-black flex flex-col items-center justify-center">
                  <img src={item.media.url} alt={item.title} className="w-full max-h-[300px] object-cover" />
                </div>
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-[11px] text-purple-900 dark:text-purple-300 font-medium border border-purple-200 dark:border-purple-800">
                  💡 <strong>Observação da Agência:</strong> Peça elaborada conforme alinhamento estratégico de {item.channel}.
                </div>
              </div>

              {/* Right Column: Title, Caption & Action Buttons */}
              <div className="md:col-span-6 space-y-4">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase text-[#6C4FF8] px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950">
                    {item.channel} • {item.format}
                  </span>
                  <h2 className="text-lg font-bold leading-snug mt-1">{item.title}</h2>
                </div>

                <div className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/50 space-y-2 text-xs">
                  <p className="font-serif whitespace-pre-line text-stone-800 dark:text-stone-200">{item.media.caption}</p>
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-700 font-sans font-bold text-emerald-600">
                    CTA: <span className="font-normal text-stone-700 dark:text-stone-300">{item.media.callToAction}</span>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="pt-2 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setMode('adjust')}
                    className="py-3 px-4 rounded-2xl border-2 border-amber-500/50 hover:border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 font-bold text-xs flex items-center justify-center space-x-2 transition-all"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Solicitar Ajustes</span>
                  </button>

                  <button
                    onClick={() => setMode('approve')}
                    className="py-3 px-4 rounded-2xl bg-[#22A06B] hover:bg-[#1c8558] text-white font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 transition-all hover:scale-105"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Aprovar Conteúdo</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {mode === 'approve' && (
            <div className="space-y-4 max-w-lg mx-auto text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#22A06B] flex items-center justify-center mx-auto text-2xl">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold">Confirmar Aprovação do Conteúdo?</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Após a aprovação, a equipe da agência seguirá com o agendamento e a publicação conforme a data programada ({item.scheduledPublishDate}).
              </p>

              <div>
                <label className="block text-left text-xs font-bold text-stone-400 mb-1">
                  Comentário opcional de aprovação
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Excelente trabalho! Podem agendar."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-medium focus:ring-2 focus:ring-[#22A06B] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-center space-x-3">
                <button
                  onClick={() => setMode('view')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-500"
                >
                  Voltar
                </button>
                <button
                  onClick={handleApprove}
                  className="px-6 py-2.5 rounded-xl bg-[#22A06B] hover:bg-[#1c8558] text-white font-bold text-xs shadow-md"
                >
                  Confirmar Aprovação
                </button>
              </div>
            </div>
          )}

          {mode === 'adjust' && (
            <div className="space-y-4 max-w-lg mx-auto py-2">
              <div className="flex items-center space-x-2 text-amber-600">
                <Edit3 className="w-5 h-5" />
                <h3 className="text-base font-bold">Descreva os Ajustes Desejados</h3>
              </div>
              <p className="text-xs text-stone-500">
                Sua solicitação será enviada diretamente ao gestor da agência e o status da peça será alterado para <strong>Ajustes Solicitados</strong>.
              </p>

              <div>
                <label className="block text-xs font-bold text-stone-400 mb-1">
                  Slide ou Página com observação
                </label>
                <select
                  value={slideNum}
                  onChange={(e) => setSlideNum(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-medium"
                >
                  <option value={1}>Slide 1 (Capa)</option>
                  <option value={2}>Slide 2</option>
                  <option value={3}>Slide 3</option>
                  <option value={4}>Slide 4</option>
                  <option value={0}>Geral (Legenda / Texto)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-400 mb-1">
                  Detalhamento da solicitação *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ex: No slide 3, alterar a expressão 'pele perfeita' para uma linguagem mais alinhada com o nosso posicionamento..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setMode('view')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-500"
                >
                  Voltar
                </button>
                <button
                  onClick={handleAdjustments}
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md"
                >
                  Enviar Solicitação de Ajustes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
