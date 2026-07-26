import React from "react";
import { BLOG_INFO, CATEGORIES } from "../../data/entrelinhasData";
import { ThemeMode } from "../../types/entrelinhas";
import { Sun, Moon, ArrowUp } from "lucide-react";

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  showToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, theme, setTheme, showToast }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    showToast(nextTheme === "dark" ? "Modo escuro ativado." : "Modo claro ativado.");
  };

  return (
    <footer className="mt-20 border-t border-[var(--border-color)] bg-[var(--bg-sec)]/30 text-[var(--text-sec)] font-sans text-xs py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div
              onClick={() => onNavigate("home")}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-full bg-[var(--accent-color)] text-white flex items-center justify-center font-serif font-bold text-sm">
                E
              </div>
              <span className="text-lg font-serif font-bold text-[var(--text-main)] group-hover:text-[var(--accent-color)] transition-colors">
                {BLOG_INFO.name}
              </span>
            </div>
            <p className="text-xs text-[var(--text-sec)] leading-relaxed max-w-sm">
              {BLOG_INFO.subtitle}
            </p>
            <p className="text-[11px] text-[var(--text-sec)]/70">
              {BLOG_INFO.description}
            </p>
          </div>

          {/* Quick Links Col (3 cols) */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-serif font-bold text-[var(--text-main)] text-sm mb-3">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate("home")} className="hover:text-[var(--accent-color)] transition-colors">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("articles")} className="hover:text-[var(--accent-color)] transition-colors">
                  Todos os artigos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("archive")} className="hover:text-[var(--accent-color)] transition-colors">
                  Arquivo cronológico
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("about")} className="hover:text-[var(--accent-color)] transition-colors">
                  Sobre Daniel Almeida
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Col (4 cols) */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="font-serif font-bold text-[var(--text-main)] text-sm mb-3">
              Temas & Categorias
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => onNavigate("category", cat.name)}
                  className="px-2.5 py-1 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] text-[11px] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] transition-colors"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>{BLOG_INFO.copyright}</div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-main)] transition-colors"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Modo claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span>Modo escuro</span>
                </>
              )}
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-main)] transition-colors"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
