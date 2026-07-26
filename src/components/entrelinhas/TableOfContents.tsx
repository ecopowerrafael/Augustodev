import React, { useState } from "react";
import { TocItem } from "../../types/entrelinhas";
import { List, ChevronDown, ChevronUp } from "lucide-react";

interface TableOfContentsProps {
  items: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  if (!items || items.length === 0) return null;

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="my-8 font-sans">
      {/* Mobile Collapsible Header */}
      <div className="md:hidden border border-[var(--border-color)] rounded-xl bg-[var(--bg-sec)] overflow-hidden">
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="w-full p-4 flex items-center justify-between text-left text-xs font-semibold text-[var(--text-main)] uppercase tracking-wider"
        >
          <div className="flex items-center space-x-2">
            <List className="w-4 h-4 text-[var(--accent-color)]" />
            <span>Neste Artigo ({items.length} tópicos)</span>
          </div>
          {isOpenMobile ? (
            <ChevronUp className="w-4 h-4 text-[var(--text-sec)]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[var(--text-sec)]" />
          )}
        </button>

        {isOpenMobile && (
          <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handleScrollTo(item.id);
                  setIsOpenMobile(false);
                }}
                className="block w-full text-left text-xs sm:text-sm text-[var(--text-sec)] hover:text-[var(--accent-color)] transition-colors py-1 pl-2 border-l-2 border-transparent hover:border-[var(--accent-color)]"
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Card / Sidebar Box */}
      <div className="hidden md:block p-5 rounded-2xl bg-[var(--bg-sec)] border border-[var(--border-color)] space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-[var(--text-main)] uppercase tracking-wider border-b border-[var(--border-color)] pb-2.5">
          <List className="w-4 h-4 text-[var(--accent-color)]" />
          <span>Sumário da Leitura</span>
        </div>
        <nav className="space-y-1.5 text-xs text-[var(--text-sec)]">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className="block w-full text-left py-1 px-2 rounded-lg hover:bg-[var(--bg-main)] hover:text-[var(--accent-color)] transition-colors line-clamp-1 font-medium"
            >
              {item.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};
