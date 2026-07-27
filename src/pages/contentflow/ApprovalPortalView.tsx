import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, Edit3, MessageSquare, ThumbsUp, Send, Check, X, ShieldCheck
} from 'lucide-react';
import { ContentItem } from '../../types/contentflow';

interface ApprovalPortalViewProps {
  contents: ContentItem[];
  onApproveItem: (id: string, comment: string) => void;
  onRequestAdjustments: (id: string, comment: string, slideNum?: number) => void;
  isDarkMode: boolean;
}

export const ApprovalPortalView: React.FC<ApprovalPortalViewProps> = ({
  contents,
  onApproveItem,
  onRequestAdjustments,
  isDarkMode,
}) => {
  const approvalItems = contents.filter(c => c.status === 'approval' || c.status === 'approved' || c.status === 'changes_requested');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(approvalItems[0] || null);
  const [commentText, setCommentText] = useState('');
  const [showAdjustModal, setShowAdjustModal] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Portal Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider text-white">
              PORTAL DO CLIENTE • AMBIENTE EXCLUSIVO
            </span>
          </div>
          <h1 className="text-2xl font-bold">Portal de Aprovação — Bella Cosméticos</h1>
          <p className="text-xs text-purple-100 max-w-xl font-serif">
            Olá, Juliana Alves! Visualize, revise e aprove os conteúdos criados pela Agência Norte Digital para a sua marca.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center shrink-0">
          <p className="text-xs text-purple-200 font-bold uppercase">Pendências</p>
          <p className="text-2xl font-black text-white">3 peças</p>
          <p className="text-[10px] text-purple-200 mt-0.5">Aguardando seu aceite</p>
        </div>
      </div>

      {/* Main Grid: Selection List & Preview Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pending Items List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">Conteúdos para Aprovação</h3>

          {approvalItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedItem?.id === item.id
                  ? 'border-[#6C4FF8] ring-2 ring-purple-500/20 bg-purple-50/50 dark:bg-purple-950/20'
                  : isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono font-bold text-[#6C4FF8]">{item.channel} • {item.format}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                  item.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {item.status === 'approved' ? 'Aprovado' : 'Aguardando Sua Aprovação'}
                </span>
              </div>
              <h4 className="font-bold text-sm text-stone-900 dark:text-white leading-snug">{item.title}</h4>
              <p className="text-[11px] text-stone-400 mt-1">Previsão: {item.scheduledPublishDate}</p>
            </div>
          ))}
        </div>

        {/* Right: Full Detail & Action Workspace (7 cols) */}
        {selectedItem && (
          <div className={`lg:col-span-7 p-6 rounded-3xl border space-y-6 ${
            isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#6C4FF8]">
                  {selectedItem.channel} • {selectedItem.format}
                </span>
                <h2 className="text-lg font-bold text-stone-900 dark:text-white">{selectedItem.title}</h2>
              </div>
              <span className="text-xs text-stone-400 font-bold">Data de Publicação: {selectedItem.scheduledPublishDate}</span>
            </div>

            {/* Preview Image */}
            <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-black flex justify-center">
              <img src={selectedItem.media.url} alt={selectedItem.title} className="max-h-[320px] object-contain" />
            </div>

            {/* Caption */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 space-y-2 text-xs">
              <p className="font-serif whitespace-pre-line text-stone-800 dark:text-stone-200">{selectedItem.media.caption}</p>
              <div className="pt-2 border-t border-stone-200 dark:border-stone-700 font-sans font-bold text-emerald-600">
                CTA: <span className="font-normal text-stone-700 dark:text-stone-300">{selectedItem.media.callToAction}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowAdjustModal(true)}
                className="py-3 rounded-2xl border-2 border-amber-500/50 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-xs font-bold hover:bg-amber-100 flex items-center justify-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Solicitar Ajustes</span>
              </button>

              <button
                onClick={() => onApproveItem(selectedItem.id, 'Conteúdo aprovado no portal do cliente!')}
                className="py-3 rounded-2xl bg-[#22A06B] hover:bg-[#1c8558] text-white text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 transition-all hover:scale-105"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Aprovar Conteúdo</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
