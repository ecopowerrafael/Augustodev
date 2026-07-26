import React, { useState } from "react";
import { ThemeMode } from "../../types/entrelinhas";
import { Search, Sun, Moon, Bookmark, Menu, X, Feather } from "lucide-react";

interface HeaderProps {
  activeView: string;
  onNavigate: (view: string, param?: string) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  savedCount: number;
  onOpenReadingList: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onExecuteSearch: (query: string) => void;
  showToast: (msg: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  theme,
  setTheme,
  savedCount,
  onOpenReadingList,
  searchQuery,
  setSearchQuery,
  onExecuteSearch,
  showToast
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    showToast(nextTheme === "dark" ? "Modo escuro ativado." : "Modo claro ativado.");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onExecuteSearch(searchQuery);
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-main)]/95 backdrop-blur-md border-b border-[var(--border-color)] transition-colors font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div
          onClick={() => onNavigate("home")}
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-[var(--accent-color)]/10 text-[var(--accent-color)] flex items-center justify-center font-serif font-bold text-lg group-hover:bg-[var(--accent-color)] group-hover:text-white transition-all">
            E
          </div>
          <div>
            <span className="text-xl font-serif font-bold tracking-tight text-[var(--text-main)] group-hover:text-[var(--accent-color)] transition-colors block leading-none">
              Entrelinhas
            </span>
            <span className="text-[10px] text-[var(--text-sec)] font-mono hidden sm:inline-block mt-0.5">
              Ideias para ler com calma
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-xs sm:text-sm font-medium text-[var(--text-sec)]">
          <button
            onClick={() => onNavigate("home")}
            className={`transition-colors py-1 border-b-2 ${
              activeView === "home"
                ? "text-[var(--text-main)] border-[var(--accent-color)] font-semibold"
                : "border-transparent hover:text-[var(--text-main)]"
            }`}
          >
            Início
          </button>

          <button
            onClick={() => onNavigate("articles")}
            className={`transition-colors py-1 border-b-2 ${
              activeView === "articles" || activeView === "category"
                ? "text-[var(--text-main)] border-[var(--accent-color)] font-semibold"
                : "border-transparent hover:text-[var(--text-main)]"
            }`}
          >
            Artigos
          </button>

          <button
            onClick={() => onNavigate("archive")}
            className={`transition-colors py-1 border-b-2 ${
              activeView === "archive"
                ? "text-[var(--text-main)] border-[var(--accent-color)] font-semibold"
                : "border-transparent hover:text-[var(--text-main)]"
            }`}
          >
            Arquivo
          </button>

          <button
            onClick={() => onNavigate("about")}
            className={`transition-colors py-1 border-b-2 ${
              activeView === "about"
                ? "text-[var(--text-main)] border-[var(--accent-color)] font-semibold"
                : "border-transparent hover:text-[var(--text-main)]"
            }`}
          >
            Sobre
          </button>

          <button
            onClick={() => {
              if (activeView === "home") {
                const elem = document.getElementById("newsletter");
                if (elem) elem.scrollIntoView({ behavior: "smooth" });
              } else {
                onNavigate("home");
                setTimeout(() => {
                  const elem = document.getElementById("newsletter");
                  if (elem) elem.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }
            }}
            className="hover:text-[var(--text-main)] transition-colors py-1 border-b-2 border-transparent"
          >
            Newsletter
          </button>
        </nav>

        {/* Right Actions (Search, Bookmark, Dark mode, Mobile Menu) */}
        <div className="flex items-center space-x-2">
          {/* Search trigger */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-xl text-[var(--text-sec)] hover:text-[var(--text-main)] hover:bg-[var(--bg-sec)] transition-colors"
            title="Buscar artigos"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Reading list button */}
          <button
            onClick={onOpenReadingList}
            className="p-2 rounded-xl text-[var(--text-sec)] hover:text-[var(--text-main)] hover:bg-[var(--bg-sec)] transition-colors relative"
            title="Sua lista de leitura"
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--accent-color)] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-[var(--text-sec)] hover:text-[var(--text-main)] hover:bg-[var(--bg-sec)] transition-colors"
            title="Alternar tema claro/escuro"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[var(--text-sec)] hover:text-[var(--text-main)] hover:bg-[var(--bg-sec)] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {isSearchOpen && (
        <div className="border-t border-[var(--border-color)] bg-[var(--bg-sec)] py-3 px-4 animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center space-x-2">
            <Search className="w-4 h-4 text-[var(--text-sec)] shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Buscar por título, assunto ou palavra-chave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-xs sm:text-sm text-[var(--text-main)] focus:outline-none placeholder-[var(--text-sec)]/60"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-[var(--accent-color)] text-white text-xs font-medium rounded-lg hover:bg-[var(--accent-hover)] transition-colors shrink-0"
            >
              Buscar
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-1 text-[var(--text-sec)] hover:text-[var(--text-main)] text-xs shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-main)] px-4 py-6 space-y-4 animate-fade-in">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-[var(--text-sec)]">
            <button
              onClick={() => {
                onNavigate("home");
                setIsMobileMenuOpen(false);
              }}
              className={`text-left py-1.5 px-3 rounded-lg ${
                activeView === "home" ? "bg-[var(--bg-sec)] text-[var(--accent-color)] font-bold" : ""
              }`}
            >
              Início
            </button>

            <button
              onClick={() => {
                onNavigate("articles");
                setIsMobileMenuOpen(false);
              }}
              className={`text-left py-1.5 px-3 rounded-lg ${
                activeView === "articles" ? "bg-[var(--bg-sec)] text-[var(--accent-color)] font-bold" : ""
              }`}
            >
              Todos os Artigos
            </button>

            <button
              onClick={() => {
                onNavigate("archive");
                setIsMobileMenuOpen(false);
              }}
              className={`text-left py-1.5 px-3 rounded-lg ${
                activeView === "archive" ? "bg-[var(--bg-sec)] text-[var(--accent-color)] font-bold" : ""
              }`}
            >
              Arquivo Cronológico
            </button>

            <button
              onClick={() => {
                onNavigate("about");
                setIsMobileMenuOpen(false);
              }}
              className={`text-left py-1.5 px-3 rounded-lg ${
                activeView === "about" ? "bg-[var(--bg-sec)] text-[var(--accent-color)] font-bold" : ""
              }`}
            >
              Sobre o Autor
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
