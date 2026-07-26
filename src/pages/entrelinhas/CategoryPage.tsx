import React from "react";
import { ARTICLES, CATEGORIES } from "../../data/entrelinhasData";
import { ArticleCategory } from "../../types/entrelinhas";
import { Clock, Calendar, ArrowRight, ArrowLeft, FolderOpen } from "lucide-react";

interface CategoryPageProps {
  categoryName: string;
  onNavigate: (view: string, param?: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryName, onNavigate }) => {
  const categoryInfo = CATEGORIES.find((c) => c.name === categoryName) || {
    name: categoryName as ArticleCategory,
    description: "Coleção de textos sobre este tema.",
    count: 0
  };

  const categoryArticles = ARTICLES.filter((a) => a.category === categoryName);
  const totalReadTime = categoryArticles.reduce((acc, a) => acc + a.readingTimeMinutes, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10 animate-fade-in font-sans">
      <button
        onClick={() => onNavigate("articles")}
        className="text-xs text-[var(--text-sec)] hover:text-[var(--text-main)] transition-colors inline-flex items-center space-x-1 font-medium"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Voltar para todos os artigos</span>
      </button>

      {/* Category Header */}
      <div className="bg-[var(--bg-sec)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center space-x-2 text-[var(--accent-color)] text-xs font-bold uppercase tracking-wider">
          <FolderOpen className="w-4 h-4" />
          <span>Tema do Blog</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-main)]">
          {categoryInfo.name}
        </h1>

        <p className="text-sm text-[var(--text-sec)] font-serif max-w-xl leading-relaxed">
          {categoryInfo.description}
        </p>

        <div className="pt-3 border-t border-[var(--border-color)] flex flex-wrap gap-4 text-xs font-mono text-[var(--text-sec)]">
          <span>{categoryArticles.length} {categoryArticles.length === 1 ? "artigo publicado" : "artigos publicados"}</span>
          <span>•</span>
          <span>Tempo estimado total: ~{totalReadTime} min</span>
        </div>
      </div>

      {/* Articles Grid / List */}
      <div className="divide-y divide-[var(--border-color)]">
        {categoryArticles.length === 0 ? (
          <div className="text-center py-12 text-sm text-[var(--text-sec)]">
            Nenhum artigo encontrado nesta categoria ainda.
          </div>
        ) : (
          categoryArticles.map((art) => (
            <article key={art.id} className="py-6 space-y-2 group">
              <div className="flex items-center space-x-3 text-xs text-[var(--text-sec)]">
                <span className="font-bold text-[var(--accent-color)]">{art.category}</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{art.publishedAt}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{art.readingTimeMinutes} min de leitura</span>
                </span>
              </div>

              <h2
                onClick={() => onNavigate("article", art.slug)}
                className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-main)] group-hover:text-[var(--accent-color)] transition-colors cursor-pointer leading-snug"
              >
                {art.title}
              </h2>

              <p className="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed font-serif line-clamp-2">
                {art.excerpt}
              </p>

              <div className="pt-1">
                <button
                  onClick={() => onNavigate("article", art.slug)}
                  className="text-xs text-[var(--accent-color)] font-semibold hover:underline inline-flex items-center space-x-1"
                >
                  <span>Ler artigo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};
