import React, { useState, useEffect } from "react";
import { Header } from "../components/entrelinhas/Header";
import { Footer } from "../components/entrelinhas/Footer";
import { ToastNotification } from "../components/entrelinhas/ToastNotification";
import { ReadingListDrawer } from "../components/entrelinhas/ReadingListDrawer";
import { HomePage } from "./entrelinhas/HomePage";
import { ArticlesPage } from "./entrelinhas/ArticlesPage";
import { ArticleDetailPage } from "./entrelinhas/ArticleDetailPage";
import { CategoryPage } from "./entrelinhas/CategoryPage";
import { AboutPage } from "./entrelinhas/AboutPage";
import { ArchivePage } from "./entrelinhas/ArchivePage";

import { ARTICLES } from "../data/entrelinhasData";
import { ThemeMode, FontSizeLevel, ReadingWidth, Article } from "../types/entrelinhas";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface EntrelinhasAppProps {
  onBack?: () => void;
}

export const EntrelinhasApp: React.FC<EntrelinhasAppProps> = ({ onBack }) => {
  const [activeView, setActiveView] = useState<string>("home");
  const [activeParam, setActiveParam] = useState<string>("");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [fontSize, setFontSize] = useState<FontSizeLevel>("medium");
  const [readingWidth, setReadingWidth] = useState<ReadingWidth>("comfortable");
  const [focusMode, setFocusMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [savedArticlesSlugs, setSavedArticlesSlugs] = useState<string[]>(["nem-toda-pausa-e-perda-de-tempo"]);
  const [isReadingListOpen, setIsReadingListOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync theme with HTML root class
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleNavigate = (view: string, param: string = "") => {
    setActiveView(view);
    setActiveParam(param);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExecuteSearch = (query: string) => {
    setSearchQuery(query);
    setActiveView("articles");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleBookmark = (slug: string) => {
    if (savedArticlesSlugs.includes(slug)) {
      setSavedArticlesSlugs((prev) => prev.filter((s) => s !== slug));
      showToast("Artigo removido da lista de leitura.");
    } else {
      setSavedArticlesSlugs((prev) => [...prev, slug]);
      showToast("Artigo adicionado à sua lista de leitura!");
    }
  };

  const savedArticlesObjects = ARTICLES.filter((a) => savedArticlesSlugs.includes(a.slug));

  return (
    <div
      className={`min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors relative font-sans ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      {/* Optional Top Developer Navigation Bar */}
      {onBack && (
        <div className="bg-[#171717] text-[#EAE7E1] py-2 px-4 border-b border-[#333333] flex items-center justify-between text-xs font-bold sticky top-0 z-50">
          <button
            onClick={onBack}
            className="flex items-center space-x-1.5 hover:text-[#D48A5F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Portfólio do Desenvolvedor</span>
          </button>
          <div className="flex items-center space-x-2 text-[#25D366]">
            <CheckCircle2 className="w-4 h-4" />
            <span className="hidden sm:inline">Entrelinhas — Blog Pessoal Minimalista</span>
          </div>
        </div>
      )}

      {/* Main Header (Hidden when Focus Mode is active on article detail page) */}
      {!focusMode && (
        <Header
          activeView={activeView}
          onNavigate={handleNavigate}
          theme={theme}
          setTheme={setTheme}
          savedCount={savedArticlesSlugs.length}
          onOpenReadingList={() => setIsReadingListOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onExecuteSearch={handleExecuteSearch}
          showToast={showToast}
        />
      )}

      {/* Main View Router */}
      <main className="py-6 min-h-[calc(100vh-200px)]">
        {activeView === "home" && (
          <HomePage onNavigate={handleNavigate} showToast={showToast} />
        )}

        {activeView === "articles" && (
          <ArticlesPage
            onNavigate={handleNavigate}
            initialCategory={activeParam}
            initialSearchQuery={searchQuery}
          />
        )}

        {activeView === "article" && (
          <ArticleDetailPage
            slug={activeParam || "nem-toda-pausa-e-perda-de-tempo"}
            onNavigate={handleNavigate}
            fontSize={fontSize}
            setFontSize={setFontSize}
            readingWidth={readingWidth}
            setReadingWidth={setReadingWidth}
            focusMode={focusMode}
            setFocusMode={setFocusMode}
            theme={theme}
            setTheme={setTheme}
            isBookmarked={savedArticlesSlugs.includes(activeParam || "nem-toda-pausa-e-perda-de-tempo")}
            onToggleBookmark={handleToggleBookmark}
            showToast={showToast}
          />
        )}

        {activeView === "category" && (
          <CategoryPage
            categoryName={activeParam || "Reflexões"}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === "archive" && (
          <ArchivePage onNavigate={handleNavigate} />
        )}

        {activeView === "about" && (
          <AboutPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer (Hidden when Focus Mode is active) */}
      {!focusMode && (
        <Footer
          onNavigate={handleNavigate}
          theme={theme}
          setTheme={setTheme}
          showToast={showToast}
        />
      )}

      {/* Saved Reading List Drawer */}
      <ReadingListDrawer
        isOpen={isReadingListOpen}
        onClose={() => setIsReadingListOpen(false)}
        savedArticles={savedArticlesObjects}
        onRemoveBookmark={(slug) => handleToggleBookmark(slug)}
        onSelectArticle={(slug) => handleNavigate("article", slug)}
      />

      {/* Toast Popup Notification */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};

export default EntrelinhasApp;
