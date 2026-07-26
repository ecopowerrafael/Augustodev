import React, { useState } from "react";
import { ARTICLES, BLOG_INFO } from "../../data/entrelinhasData";
import { Article, ReadingWidth, FontSizeLevel, ThemeMode } from "../../types/entrelinhas";
import { ReadingControls } from "../../components/entrelinhas/ReadingControls";
import { TableOfContents } from "../../components/entrelinhas/TableOfContents";
import { QuoteShareModal } from "../../components/entrelinhas/QuoteShareModal";
import { ProgressBar } from "../../components/entrelinhas/ProgressBar";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  Copy,
  MessageCircle,
  Linkedin,
  Mail,
  CheckCircle2,
  ArrowRight,
  Quote
} from "lucide-react";

interface ArticleDetailPageProps {
  slug: string;
  onNavigate: (view: string, param?: string) => void;
  fontSize: FontSizeLevel;
  setFontSize: (size: FontSizeLevel) => void;
  readingWidth: ReadingWidth;
  setReadingWidth: (width: ReadingWidth) => void;
  focusMode: boolean;
  setFocusMode: (focus: boolean) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isBookmarked: boolean;
  onToggleBookmark: (slug: string) => void;
  showToast: (msg: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  slug,
  onNavigate,
  fontSize,
  setFontSize,
  readingWidth,
  setReadingWidth,
  focusMode,
  setFocusMode,
  theme,
  setTheme,
  isBookmarked,
  onToggleBookmark,
  showToast
}) => {
  const article = ARTICLES.find((a) => a.slug === slug) || ARTICLES[0];

  const [selectedQuoteText, setSelectedQuoteText] = useState<string | null>(null);

  // Map reading width setting to CSS class
  const widthClass =
    readingWidth === "compact"
      ? "reading-width-compact"
      : readingWidth === "wide"
      ? "reading-width-wide"
      : "reading-width-comfortable";

  // Map font size setting to CSS class
  const fontSizeClass =
    fontSize === "small"
      ? "font-size-small"
      : fontSize === "large"
      ? "font-size-large"
      : "font-size-medium";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Link do artigo copiado!");
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 15) {
      setSelectedQuoteText(selection.toString().trim());
    }
  };

  const relatedArticles = ARTICLES.filter((a) =>
    article.relatedSlugs?.includes(a.slug) || (a.category === article.category && a.id !== article.id)
  ).slice(0, 3);

  return (
    <div className="font-sans animate-fade-in relative pb-16">
      {/* Top Reading Progress Bar */}
      <ProgressBar />

      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-2">
        <button
          onClick={() => onNavigate("articles")}
          className="text-xs text-[var(--text-sec)] hover:text-[var(--text-main)] transition-colors inline-flex items-center space-x-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar para todos os artigos</span>
        </button>
      </div>

      {/* Floating / Sticky Reading Controls bar */}
      <ReadingControls
        fontSize={fontSize}
        setFontSize={setFontSize}
        readingWidth={readingWidth}
        setReadingWidth={setReadingWidth}
        focusMode={focusMode}
        setFocusMode={setFocusMode}
        theme={theme}
        setTheme={setTheme}
        isBookmarked={isBookmarked}
        onToggleBookmark={() => onToggleBookmark(article.slug)}
        onShare={handleCopyLink}
        showToast={showToast}
      />

      <article onMouseUp={handleTextSelection} className={`mx-auto px-4 ${widthClass}`}>
        {/* Article Header */}
        <header className="space-y-4 mb-8 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-[var(--text-sec)]">
            <button
              onClick={() => onNavigate("category", article.category)}
              className="px-3 py-1 rounded-full bg-[var(--accent-color)] text-white font-bold text-[11px]"
            >
              {article.category}
            </button>

            <span>•</span>

            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Publicado em {article.publishedAt}</span>
            </span>

            <span>•</span>

            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readingTimeMinutes} minutos de leitura</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--text-main)] leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-sec)] font-serif italic leading-relaxed">
            {article.subtitle}
          </p>

          {/* Author Info */}
          <div className="pt-4 flex items-center justify-center sm:justify-start space-x-3 border-t border-[var(--border-color)]">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 rounded-full object-cover border border-[var(--border-color)]"
            />
            <div className="text-left">
              <span className="text-xs font-bold text-[var(--text-main)] block">
                {article.author.name}
              </span>
              <span className="text-[11px] text-[var(--text-sec)]">
                {article.author.role}
              </span>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {article.coverImage && (
          <figure className="mb-10 space-y-2">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-64 sm:h-96 object-cover rounded-3xl border border-[var(--border-color)] shadow-sm"
            />
            {article.coverImageCaption && (
              <figcaption className="text-center text-xs text-[var(--text-sec)] font-serif italic">
                {article.coverImageCaption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Table of Contents (if items exist) */}
        {article.toc && article.toc.length > 0 && (
          <TableOfContents items={article.toc} />
        )}

        {/* Article Body Content */}
        <div className={`space-y-6 text-[var(--text-main)] font-serif ${fontSizeClass} transition-all`}>
          {article.contentParagraphs ? (
            article.contentParagraphs.map((para, idx) => {
              if (para.type === "paragraph") {
                return (
                  <p key={idx} className="leading-relaxed">
                    {para.text}
                  </p>
                );
              }

              if (para.type === "heading2") {
                return (
                  <h2
                    key={idx}
                    id={para.id}
                    className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-main)] pt-6 pb-2 border-b border-[var(--border-color)] scroll-mt-24"
                  >
                    {para.text}
                  </h2>
                );
              }

              if (para.type === "blockquote") {
                return (
                  <blockquote
                    key={idx}
                    onClick={() => para.text && setSelectedQuoteText(para.text)}
                    className="my-8 p-6 bg-[var(--bg-sec)] border-l-4 border-[var(--accent-color)] rounded-r-2xl italic font-serif text-lg text-[var(--text-main)] shadow-xs relative group cursor-pointer hover:bg-[var(--border-color)]/30 transition-colors"
                  >
                    <Quote className="w-5 h-5 text-[var(--accent-color)] absolute top-3 right-3 opacity-30" />
                    “{para.text}”
                    <span className="block text-xs font-sans not-italic text-[var(--text-sec)] mt-2 font-normal opacity-70 group-hover:opacity-100">
                      (Clique no trecho para copiar ou compartilhar)
                    </span>
                  </blockquote>
                );
              }

              if (para.type === "image") {
                return (
                  <figure key={idx} className="my-8 space-y-2">
                    <img
                      src={para.imageUrl}
                      alt={para.caption || "Imagem do artigo"}
                      className="w-full h-auto rounded-2xl border border-[var(--border-color)]"
                    />
                    {para.caption && (
                      <figcaption className="text-center text-xs text-[var(--text-sec)] font-serif italic">
                        {para.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              if (para.type === "list" && para.items) {
                return (
                  <ul key={idx} className="list-disc pl-6 space-y-2 leading-relaxed text-[var(--text-main)]">
                    {para.items.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                );
              }

              if (para.type === "callout") {
                return (
                  <div key={idx} className="my-6 p-5 rounded-2xl bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/30 text-sm font-sans text-[var(--text-main)] leading-relaxed">
                    <strong>Dica de leitura:</strong> {para.text}
                  </div>
                );
              }

              if (para.type === "authorNote") {
                return (
                  <div key={idx} className="my-8 p-5 bg-[var(--bg-sec)] rounded-2xl border border-[var(--border-color)] text-xs font-sans text-[var(--text-sec)] italic">
                    {para.text}
                  </div>
                );
              }

              return null;
            })
          ) : (
            <p className="leading-relaxed">
              {article.excerpt}
            </p>
          )}
        </div>

        {/* End of Article Author Message & Signature */}
        <section className="mt-12 pt-8 border-t border-[var(--border-color)] font-sans space-y-6">
          <div className="bg-[var(--bg-sec)] rounded-3xl p-6 sm:p-8 border border-[var(--border-color)] space-y-4 text-center sm:text-left">
            <div className="space-y-1">
              <h3 className="text-base font-serif font-bold text-[var(--text-main)]">
                Obrigado por chegar até aqui.
              </h3>
              <p className="text-xs text-[var(--text-sec)] leading-relaxed">
                Escrevo para organizar ideias e, quem sabe, iniciar boas conversas. Se este texto provocou alguma reflexão, considere compartilhar com um amigo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[var(--border-color)]">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-serif font-bold text-[var(--accent-color)]">
                  {article.author.name}
                </span>
                <span className="text-xs text-[var(--text-sec)]">• Entrelinhas</span>
              </div>

              {/* Share Bar */}
              <div className="flex items-center space-x-2 text-xs font-semibold">
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-[var(--accent-color)] text-[var(--text-main)] transition-colors flex items-center space-x-1.5"
                >
                  <Copy className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                  <span>Copiar Link</span>
                </button>

                <button
                  onClick={() => {
                    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `Confira o artigo "${article.title}" no blog Entrelinhas: ${window.location.href}`
                    )}`;
                    window.open(url, "_blank");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors flex items-center space-x-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-8 border-t border-[var(--border-color)] font-sans space-y-6">
            <h3 className="text-xl font-serif font-bold text-[var(--text-main)]">
              Continue lendo
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigate("article", rel.slug)}
                  className="p-5 rounded-2xl bg-[var(--bg-sec)] border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-all cursor-pointer group space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-[var(--text-sec)] font-medium">
                      <span className="text-[var(--accent-color)] uppercase font-bold tracking-wider">
                        {rel.category}
                      </span>
                      <span>{rel.readingTimeMinutes} min</span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-[var(--text-main)] group-hover:text-[var(--accent-color)] transition-colors leading-snug">
                      {rel.title}
                    </h4>

                    <p className="text-xs text-[var(--text-sec)] line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 text-xs font-semibold text-[var(--accent-color)] flex items-center space-x-1">
                    <span>Ler texto</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Quote Share Modal (Triggered by selecting text or clicking blockquote) */}
      {selectedQuoteText && (
        <QuoteShareModal
          quoteText={selectedQuoteText}
          articleTitle={article.title}
          articleUrl={window.location.href}
          onClose={() => setSelectedQuoteText(null)}
          showToast={showToast}
        />
      )}
    </div>
  );
};
