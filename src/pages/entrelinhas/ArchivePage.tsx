import React, { useState } from "react";
import { ARCHIVE_DATA } from "../../data/entrelinhasData";
import { Calendar, Clock, ChevronDown, ChevronRight, ArrowRight, FolderTree } from "lucide-react";

interface ArchivePageProps {
  onNavigate: (view: string, param?: string) => void;
}

export const ArchivePage: React.FC<ArchivePageProps> = ({ onNavigate }) => {
  // Keep active open months
  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({
    "2026-Julho": true,
    "2026-Junho": true,
    "2026-Maio": false,
    "2025-Dezembro": false
  });

  const toggleMonth = (key: string) => {
    setOpenMonths((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-10 animate-fade-in font-sans">
      {/* Archive Header */}
      <div className="space-y-3 text-center sm:text-left border-b border-[var(--border-color)] pb-6">
        <div className="flex items-center space-x-2 text-[var(--accent-color)] text-xs font-bold uppercase tracking-wider justify-center sm:justify-start">
          <FolderTree className="w-4 h-4" />
          <span>Índice Cronológico</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-main)]">
          Arquivo do blog
        </h1>

        <p className="text-sm text-[var(--text-sec)] font-serif max-w-xl">
          Navegue por todas as publicações organizadas por ano e mês de lançamento.
        </p>
      </div>

      {/* Chronological Tree */}
      <div className="space-y-8">
        {ARCHIVE_DATA.map((yearGroup) => (
          <div key={yearGroup.year} className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-serif font-bold text-[var(--accent-color)]">
                {yearGroup.year}
              </span>
              <div className="h-[1px] bg-[var(--border-color)] flex-1" />
            </div>

            <div className="space-y-3 pl-2 sm:pl-4">
              {yearGroup.months.map((month) => {
                const key = `${yearGroup.year}-${month.monthName}`;
                const isOpen = openMonths[key] ?? false;

                return (
                  <div
                    key={key}
                    className="border border-[var(--border-color)] rounded-2xl bg-[var(--bg-sec)]/60 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleMonth(key)}
                      className="w-full p-4 flex items-center justify-between text-left font-serif font-bold text-sm text-[var(--text-main)] hover:text-[var(--accent-color)] transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        {isOpen ? (
                          <ChevronDown className="w-4 h-4 text-[var(--accent-color)]" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-[var(--text-sec)]" />
                        )}
                        <span>
                          {month.monthName} ({month.articles.length}{" "}
                          {month.articles.length === 1 ? "texto" : "textos"})
                        </span>
                      </div>

                      <span className="text-xs font-sans font-normal text-[var(--text-sec)]">
                        {isOpen ? "Ocultar" : "Expandir"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 border-t border-[var(--border-color)]/50 divide-y divide-[var(--border-color)]/50 space-y-2">
                        {month.articles.map((art) => (
                          <div
                            key={art.slug}
                            onClick={() => onNavigate("article", art.slug)}
                            className="pt-2.5 first:pt-1 cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                          >
                            <div>
                              <h4 className="text-sm font-serif font-bold text-[var(--text-main)] group-hover:text-[var(--accent-color)] transition-colors">
                                {art.title}
                              </h4>
                              <div className="flex items-center space-x-2 text-[11px] text-[var(--text-sec)] mt-0.5">
                                <span className="text-[var(--accent-color)] font-medium">
                                  {art.category}
                                </span>
                                <span>•</span>
                                <span>{art.date}</span>
                              </div>
                            </div>

                            <div className="text-[11px] text-[var(--text-sec)] font-mono flex items-center space-x-1 shrink-0 pt-1 sm:pt-0">
                              <Clock className="w-3 h-3 text-[var(--text-sec)]" />
                              <span>{art.readingTimeMinutes} min</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform text-[var(--accent-color)] ml-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
