import React from "react";
import { Article } from "../../types/entrelinhas";
import { Bookmark, X, ArrowRight, Trash2 } from "lucide-react";

interface ReadingListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onRemoveBookmark: (slug: string) => void;
  onSelectArticle: (slug: string) => void;
}

export const ReadingListDrawer: React.FC<ReadingListDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onRemoveBookmark,
  onSelectArticle
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end font-sans animate-fade-in">
      <div className="bg-[var(--bg-main)] border-l border-[var(--border-color)] text-[var(--text-main)] w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl relative overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
            <div className="flex items-center space-x-2">
              <Bookmark className="w-5 h-5 text-[var(--accent-color)] fill-current" />
              <h3 className="text-base font-serif font-bold">Sua Lista de Leitura</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-sec)] border border-[var(--border-color)] font-mono text-[var(--text-sec)]">
                {savedArticles.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[var(--bg-sec)] text-[var(--text-sec)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {savedArticles.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Bookmark className="w-10 h-10 text-[var(--text-sec)]/40 mx-auto" />
              <p className="text-sm text-[var(--text-sec)] font-medium">
                Nenhum artigo salvo na sua lista ainda.
              </p>
              <p className="text-xs text-[var(--text-sec)]/70 max-w-xs mx-auto">
                Ao ler qualquer artigo, clique no ícone de bookmark para guardar e ler mais tarde com calma.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedArticles.map((art) => (
                <div
                  key={art.id}
                  className="p-4 rounded-2xl bg-[var(--bg-sec)] border border-[var(--border-color)] space-y-2 hover:border-[var(--accent-color)]/50 transition-colors group relative"
                >
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-sec)] font-medium">
                    <span className="text-[var(--accent-color)] uppercase tracking-wider font-bold">
                      {art.category}
                    </span>
                    <span>{art.readingTimeMinutes} min de leitura</span>
                  </div>

                  <h4
                    onClick={() => {
                      onSelectArticle(art.slug);
                      onClose();
                    }}
                    className="text-sm font-serif font-bold text-[var(--text-main)] group-hover:text-[var(--accent-color)] transition-colors cursor-pointer leading-snug"
                  >
                    {art.title}
                  </h4>

                  <p className="text-xs text-[var(--text-sec)] line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]/50 text-xs">
                    <button
                      onClick={() => {
                        onSelectArticle(art.slug);
                        onClose();
                      }}
                      className="text-[var(--accent-color)] font-semibold flex items-center space-x-1 hover:underline"
                    >
                      <span>Ler agora</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onRemoveBookmark(art.slug)}
                      className="text-[var(--text-sec)] hover:text-red-500 transition-colors p-1"
                      title="Remover da lista"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-[var(--border-color)] text-center text-xs text-[var(--text-sec)]">
          Entrelinhas — Ideias para ler com calma
        </div>
      </div>
    </div>
  );
};
