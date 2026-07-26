import React, { useState, useMemo } from "react";
import { ARTICLES, CATEGORIES } from "../../data/entrelinhasData";
import { Article, ArticleCategory } from "../../types/entrelinhas";
import { Search, Filter, Clock, Calendar, ArrowRight, ArrowUpDown } from "lucide-react";

interface ArticlesPageProps {
  onNavigate: (view: string, param?: string) => void;
  initialCategory?: string;
  initialSearchQuery?: string;
}

type SortOption = "recent" | "oldest" | "shortest";

export const ArticlesPage: React.FC<ArticlesPageProps> = ({
  onNavigate,
  initialCategory,
  initialSearchQuery = ""
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "Todos");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const filteredArticles = useMemo(() => {
    let result = [...ARTICLES];

    // Filter by Category
    if (selectedCategory && selectedCategory !== "Todos") {
      result = result.filter((a) => a.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "oldest") {
      result.reverse();
    } else if (sortBy === "shortest") {
      result.sort((a, b) => a.readingTimeMinutes - b.readingTimeMinutes);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10 animate-fade-in font-sans">
      {/* Header Title & Subtitle */}
      <div className="space-y-3 text-center sm:text-left border-b border-[var(--border-color)] pb-6">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-main)]">
          Todos os artigos
        </h1>
        <p className="text-sm text-[var(--text-sec)] font-serif max-w-2xl">
          Uma coleção de textos sobre ideias, experiências, trabalho e vida para ler no seu tempo.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[var(--text-sec)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por título, assunto ou palavra-chave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[var(--bg-sec)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] placeholder-[var(--text-sec)]/60 focus:outline-none focus:border-[var(--accent-color)] transition-colors shadow-xs"
          />
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap gap-2 items-center text-xs">
          <span className="text-[var(--text-sec)] font-medium mr-1 text-[11px] uppercase tracking-wider">
            Tema:
          </span>
          <button
            onClick={() => setSelectedCategory("Todos")}
            className={`px-3 py-1.5 rounded-xl transition-colors font-medium ${
              selectedCategory === "Todos"
                ? "bg-[var(--accent-color)] text-white font-semibold"
                : "bg-[var(--bg-sec)] border border-[var(--border-color)] text-[var(--text-sec)] hover:text-[var(--text-main)]"
            }`}
          >
            Todos ({ARTICLES.length})
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1.5 rounded-xl transition-colors font-medium ${
                selectedCategory === cat.name
                  ? "bg-[var(--accent-color)] text-white font-semibold"
                  : "bg-[var(--bg-sec)] border border-[var(--border-color)] text-[var(--text-sec)] hover:text-[var(--text-main)]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sorting selector & Result count */}
        <div className="flex items-center justify-between text-xs text-[var(--text-sec)] pt-2 border-t border-[var(--border-color)]">
          <div>
            Exibindo <strong className="text-[var(--text-main)]">{filteredArticles.length}</strong> {filteredArticles.length === 1 ? "artigo" : "artigos"}
          </div>

          <div className="flex items-center space-x-2">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[var(--bg-sec)] border border-[var(--border-color)] rounded-lg px-2.5 py-1 text-xs text-[var(--text-main)] focus:outline-none"
            >
              <option value="recent">Mais recentes</option>
              <option value="oldest">Mais antigos</option>
              <option value="shortest">Menor tempo de leitura</option>
            </select>
          </div>
        </div>
      </div>

      {/* Articles List */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 space-y-3 bg-[var(--bg-sec)]/50 rounded-3xl border border-[var(--border-color)] p-8">
          <h3 className="text-lg font-serif font-bold text-[var(--text-main)]">
            Nenhum artigo encontrado
          </h3>
          <p className="text-xs text-[var(--text-sec)] max-w-sm mx-auto">
            Tente utilizar outra palavra-chave ou explore os temas disponíveis acima.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("Todos");
            }}
            className="px-4 py-2 bg-[var(--accent-color)] text-white font-medium text-xs rounded-xl hover:bg-[var(--accent-hover)] transition-colors mt-2"
          >
            Limpar filtros e ver todos
          </button>
        </div>
      ) : (
        <div className="divide-y divide-[var(--border-color)]">
          {filteredArticles.map((art) => (
            <article key={art.id} className="py-6 space-y-2 group">
              <div className="flex items-center space-x-3 text-xs text-[var(--text-sec)]">
                <button
                  onClick={() => setSelectedCategory(art.category)}
                  className="font-bold text-[var(--accent-color)] hover:underline"
                >
                  {art.category}
                </button>
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
          ))}
        </div>
      )}
    </div>
  );
};
