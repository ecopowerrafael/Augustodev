import React from "react";
import { ReadingWidth, FontSizeLevel, ThemeMode } from "../../types/entrelinhas";
import { Sun, Moon, Maximize2, Minimize2, Bookmark, Share2, Type, SlidersHorizontal } from "lucide-react";

interface ReadingControlsProps {
  fontSize: FontSizeLevel;
  setFontSize: (size: FontSizeLevel) => void;
  readingWidth: ReadingWidth;
  setReadingWidth: (width: ReadingWidth) => void;
  focusMode: boolean;
  setFocusMode: (focus: boolean) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onShare: () => void;
  showToast: (msg: string) => void;
}

export const ReadingControls: React.FC<ReadingControlsProps> = ({
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
  onShare,
  showToast
}) => {
  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    showToast(nextTheme === "dark" ? "Modo escuro ativado." : "Modo claro ativado.");
  };

  return (
    <aside className="sticky top-20 z-30 mb-8 py-2.5 px-4 bg-[var(--bg-sec)]/90 backdrop-blur-md border border-[var(--border-color)] rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-sec)] shadow-sm max-w-2xl mx-auto font-sans transition-all">
      {/* Font Size controls */}
      <div className="flex items-center space-x-1 border-r border-[var(--border-color)] pr-3">
        <span className="font-medium mr-1.5 hidden sm:inline text-[11px] uppercase tracking-wider">
          Fonte:
        </span>
        <button
          onClick={() => {
            setFontSize("small");
            showToast("Tamanho de fonte: Pequeno (16px)");
          }}
          className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${
            fontSize === "small"
              ? "bg-[var(--accent-color)] text-white"
              : "hover:bg-[var(--border-color)]/50 text-[var(--text-main)]"
          }`}
          title="Fonte menor (16px)"
        >
          A−
        </button>
        <button
          onClick={() => {
            setFontSize("medium");
            showToast("Tamanho de fonte: Padrão (18px)");
          }}
          className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${
            fontSize === "medium"
              ? "bg-[var(--accent-color)] text-white"
              : "hover:bg-[var(--border-color)]/50 text-[var(--text-main)]"
          }`}
          title="Fonte padrão (18px)"
        >
          A
        </button>
        <button
          onClick={() => {
            setFontSize("large");
            showToast("Tamanho de fonte: Ampliado (21px)");
          }}
          className={`px-2 py-1 rounded-lg text-xs font-semibold transition-colors ${
            fontSize === "large"
              ? "bg-[var(--accent-color)] text-white"
              : "hover:bg-[var(--border-color)]/50 text-[var(--text-main)]"
          }`}
          title="Fonte maior (21px)"
        >
          A+
        </button>
      </div>

      {/* Reading Width controls */}
      <div className="hidden md:flex items-center space-x-1 border-r border-[var(--border-color)] pr-3">
        <span className="font-medium mr-1.5 text-[11px] uppercase tracking-wider">
          Largura:
        </span>
        <button
          onClick={() => {
            setReadingWidth("compact");
            showToast("Largura de leitura: Compacta (640px)");
          }}
          className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
            readingWidth === "compact"
              ? "bg-[var(--accent-color)] text-white"
              : "hover:bg-[var(--border-color)]/50 text-[var(--text-main)]"
          }`}
        >
          Compacta
        </button>
        <button
          onClick={() => {
            setReadingWidth("comfortable");
            showToast("Largura de leitura: Confortável (720px)");
          }}
          className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
            readingWidth === "comfortable"
              ? "bg-[var(--accent-color)] text-white"
              : "hover:bg-[var(--border-color)]/50 text-[var(--text-main)]"
          }`}
        >
          Confortável
        </button>
        <button
          onClick={() => {
            setReadingWidth("wide");
            showToast("Largura de leitura: Ampla (800px)");
          }}
          className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors ${
            readingWidth === "wide"
              ? "bg-[var(--accent-color)] text-white"
              : "hover:bg-[var(--border-color)]/50 text-[var(--text-main)]"
          }`}
        >
          Ampla
        </button>
      </div>

      {/* Focus Mode & Theme & Actions */}
      <div className="flex items-center space-x-2 ml-auto">
        {/* Focus Mode button */}
        <button
          onClick={() => {
            const nextFocus = !focusMode;
            setFocusMode(nextFocus);
            showToast(nextFocus ? "Modo Leitura Ativado (Sem distrações)" : "Modo Normal Restaurado");
          }}
          className={`p-1.5 rounded-lg border transition-colors flex items-center space-x-1 ${
            focusMode
              ? "bg-[var(--accent-color)] text-white border-[var(--accent-color)]"
              : "border-[var(--border-color)] hover:bg-[var(--border-color)]/50 text-[var(--text-main)]"
          }`}
          title={focusMode ? "Sair do Modo Leitura" : "Modo Leitura Focada"}
        >
          {focusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline text-[11px]">Modo Foco</span>
        </button>

        {/* Bookmark button */}
        <button
          onClick={onToggleBookmark}
          className={`p-1.5 rounded-lg border transition-colors ${
            isBookmarked
              ? "bg-[var(--accent-color)]/15 border-[var(--accent-color)] text-[var(--accent-color)] font-semibold"
              : "border-[var(--border-color)] hover:bg-[var(--border-color)]/50 text-[var(--text-main)]"
          }`}
          title={isBookmarked ? "Remover da lista de leitura" : "Salvar para ler depois"}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-current" : ""}`} />
        </button>

        {/* Share button */}
        <button
          onClick={onShare}
          className="p-1.5 rounded-lg border border-[var(--border-color)] hover:bg-[var(--border-color)]/50 text-[var(--text-main)] transition-colors"
          title="Compartilhar artigo"
        >
          <Share2 className="w-3.5 h-3.5" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-lg border border-[var(--border-color)] hover:bg-[var(--border-color)]/50 text-[var(--text-main)] transition-colors"
          title="Alternar Modo Claro / Escuro"
        >
          {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
        </button>
      </div>
    </aside>
  );
};
