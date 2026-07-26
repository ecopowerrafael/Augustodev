import React from "react";
import { ARTICLES, CATEGORIES, AUTHOR_PROFILE, BLOG_INFO } from "../../data/entrelinhasData";
import { NewsletterSection } from "../../components/entrelinhas/NewsletterSection";
import { ArrowRight, Clock, Calendar, Sparkles, BookOpen, Feather } from "lucide-react";

interface HomePageProps {
  onNavigate: (view: string, param?: string) => void;
  showToast: (msg: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, showToast }) => {
  const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];
  const recentArticles = ARTICLES.filter((a) => a.id !== featuredArticle.id).slice(0, 5);

  return (
    <div className="space-y-16 animate-fade-in font-sans">
      {/* 1. Hero / Apresentação Inicial */}
      <section className="pt-8 pb-12 border-b border-[var(--border-color)]">
        <div className="max-w-4xl mx-auto px-4 text-center sm:text-left grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-color)]/10 text-[var(--accent-color)] inline-flex items-center space-x-1.5">
              <Feather className="w-3.5 h-3.5" />
              <span>Blog Pessoal Autoral</span>
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--text-main)] leading-tight">
              Ideias para observar o mundo com um pouco mais de calma.
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-sec)] leading-relaxed max-w-2xl font-serif italic">
              Escrevo sobre trabalho, criatividade, tecnologia, comportamento e as pequenas escolhas que moldam nossa vida.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold">
              <button
                onClick={() => onNavigate("articles")}
                className="px-6 py-3 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white rounded-xl transition-all shadow-sm flex items-center space-x-2"
              >
                <span>Ler todos os artigos</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate("about")}
                className="px-6 py-3 bg-[var(--bg-sec)] hover:bg-[var(--border-color)]/50 text-[var(--text-main)] rounded-xl border border-[var(--border-color)] transition-colors"
              >
                Conhecer o autor
              </button>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="relative group">
              <img
                src={AUTHOR_PROFILE.avatarUrl}
                alt={AUTHOR_PROFILE.name}
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover border-2 border-[var(--border-color)] shadow-md grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute -bottom-2 -right-2 bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-sec)] px-3 py-1 rounded-xl text-[10px] font-mono shadow-sm">
                Daniel Almeida
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Artigo em Destaque */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Publicação em Destaque</span>
          </span>
          <span className="text-xs text-[var(--text-sec)] font-mono">Leitura Principal</span>
        </div>

        <div className="bg-[var(--bg-sec)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 space-y-6 hover:border-[var(--accent-color)]/50 transition-colors group">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center space-x-3 text-xs text-[var(--text-sec)]">
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-color)] text-white font-bold text-[10px]">
                  {featuredArticle.category}
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-[var(--text-sec)]" />
                  <span>{featuredArticle.publishedAt}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-[var(--text-sec)]" />
                  <span>{featuredArticle.readingTimeMinutes} min de leitura</span>
                </span>
              </div>

              <h2
                onClick={() => onNavigate("article", featuredArticle.slug)}
                className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-main)] group-hover:text-[var(--accent-color)] transition-colors cursor-pointer leading-snug"
              >
                {featuredArticle.title}
              </h2>

              <p className="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed font-serif">
                {featuredArticle.excerpt}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate("article", featuredArticle.slug)}
                  className="px-5 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-semibold text-xs rounded-xl transition-all flex items-center space-x-2"
                >
                  <span>Continuar lendo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {featuredArticle.coverImage && (
              <div className="md:col-span-5">
                <div
                  onClick={() => onNavigate("article", featuredArticle.slug)}
                  className="cursor-pointer overflow-hidden rounded-2xl border border-[var(--border-color)]"
                >
                  <img
                    src={featuredArticle.coverImage}
                    alt={featuredArticle.title}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Publicações Recentes */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-main)]">
            Publicações Recentes
          </h2>
          <button
            onClick={() => onNavigate("articles")}
            className="text-xs text-[var(--accent-color)] font-semibold hover:underline flex items-center space-x-1"
          >
            <span>Ver todos ({ARTICLES.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-[var(--border-color)]">
          {recentArticles.map((art) => (
            <article key={art.id} className="py-6 space-y-2 group">
              <div className="flex items-center space-x-3 text-xs text-[var(--text-sec)]">
                <button
                  onClick={() => onNavigate("category", art.category)}
                  className="font-bold text-[var(--accent-color)] hover:underline"
                >
                  {art.category}
                </button>
                <span>•</span>
                <span>{art.publishedAt}</span>
                <span>•</span>
                <span>{art.readingTimeMinutes} min de leitura</span>
              </div>

              <h3
                onClick={() => onNavigate("article", art.slug)}
                className="text-lg sm:text-xl font-serif font-bold text-[var(--text-main)] group-hover:text-[var(--accent-color)] transition-colors cursor-pointer leading-snug"
              >
                {art.title}
              </h3>

              <p className="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed font-serif line-clamp-2">
                {art.excerpt}
              </p>
            </article>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate("articles")}
            className="px-6 py-3 bg-[var(--bg-sec)] hover:bg-[var(--border-color)]/50 border border-[var(--border-color)] text-[var(--text-main)] font-semibold text-xs rounded-xl transition-colors inline-flex items-center space-x-2"
          >
            <span>Ver todos os artigos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. Organização por Temas */}
      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-main)]">
            Explore por Temas
          </h2>
          <p className="text-xs text-[var(--text-sec)]">
            Selecione um assunto para ler os textos relacionados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              onClick={() => onNavigate("category", cat.name)}
              className="p-4 rounded-2xl bg-[var(--bg-sec)] border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-all cursor-pointer group space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-[var(--text-main)] group-hover:text-[var(--accent-color)] transition-colors">
                  {cat.name}
                </span>
                <span className="text-[11px] font-mono text-[var(--text-sec)] bg-[var(--bg-main)] px-2 py-0.5 rounded-full border border-[var(--border-color)]">
                  {cat.count} textos
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-sec)] line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Texto Curto Sobre o Autor */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-[var(--bg-sec)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <img
            src={AUTHOR_PROFILE.avatarUrl}
            alt={AUTHOR_PROFILE.name}
            className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-[var(--border-color)]"
          />
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-lg font-serif font-bold text-[var(--text-main)]">
              Sobre Daniel Almeida
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed font-serif">
              Escrevo para organizar ideias e compartilhar percepções sobre trabalho, hábitos, tecnologia e escrita. O Entrelinhas é meu espaço autoral livre de ruídos e algoritmos.
            </p>
            <button
              onClick={() => onNavigate("about")}
              className="text-xs text-[var(--accent-color)] font-semibold hover:underline inline-flex items-center space-x-1 pt-1"
            >
              <span>Ler a biografia completa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Newsletter Subscription */}
      <NewsletterSection showToast={showToast} />
    </div>
  );
};
