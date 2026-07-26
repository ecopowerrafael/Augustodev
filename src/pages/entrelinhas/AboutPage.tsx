import React from "react";
import { AUTHOR_PROFILE, BLOG_INFO } from "../../data/entrelinhasData";
import { MapPin, Briefcase, Book, Sparkles, Mail, Instagram, Linkedin, ArrowRight } from "lucide-react";

interface AboutPageProps {
  onNavigate: (view: string, param?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-12 animate-fade-in font-sans">
      {/* Header Section */}
      <div className="text-center sm:text-left space-y-4 border-b border-[var(--border-color)] pb-8">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[var(--accent-color)]/10 text-[var(--accent-color)] inline-block">
          Apresentação do Autor
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-main)]">
          Sobre quem escreve
        </h1>

        <p className="text-base text-[var(--text-sec)] font-serif italic max-w-xl">
          {AUTHOR_PROFILE.subtitle}
        </p>
      </div>

      {/* Main Bio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Photo & Quick Info (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <img
            src={AUTHOR_PROFILE.avatarUrl}
            alt={AUTHOR_PROFILE.name}
            className="w-full h-64 object-cover rounded-3xl border border-[var(--border-color)] shadow-md"
          />

          <div className="p-4 rounded-2xl bg-[var(--bg-sec)] border border-[var(--border-color)] space-y-3 text-xs text-[var(--text-sec)]">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[var(--accent-color)] shrink-0" />
              <span>{AUTHOR_PROFILE.city}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-[var(--accent-color)] shrink-0" />
              <span>{AUTHOR_PROFILE.role}</span>
            </div>

            <div className="pt-2 border-t border-[var(--border-color)] space-y-1.5 font-semibold text-[var(--text-main)]">
              <p className="text-[10px] uppercase text-[var(--text-sec)] tracking-wider">Contato Direto</p>
              <a
                href={`mailto:${AUTHOR_PROFILE.socials.email}`}
                className="block text-xs hover:text-[var(--accent-color)] transition-colors flex items-center space-x-1"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--accent-color)]" />
                <span>{AUTHOR_PROFILE.socials.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bio Text Paragraphs (8 cols) */}
        <div className="md:col-span-8 space-y-6 text-sm sm:text-base font-serif text-[var(--text-main)] leading-relaxed">
          {AUTHOR_PROFILE.bioParagraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}

          {/* Interests & Favorite Books */}
          <div className="pt-6 border-t border-[var(--border-color)] space-y-6 font-sans text-xs">
            <div className="space-y-2">
              <h3 className="font-serif font-bold text-base text-[var(--text-main)] flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[var(--accent-color)]" />
                <span>Áreas de Interesse e Pesquisa</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {AUTHOR_PROFILE.interests.map((interest, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-[var(--bg-sec)] border border-[var(--border-color)] text-[var(--text-sec)] font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-[var(--text-main)] flex items-center space-x-2">
                <Book className="w-4 h-4 text-[var(--accent-color)]" />
                <span>Cinco Livros de Cabeceira</span>
              </h3>
              <ul className="space-y-2 text-[var(--text-sec)]">
                {AUTHOR_PROFILE.favoriteBooks.map((book, i) => (
                  <li key={i} className="p-2.5 rounded-xl bg-[var(--bg-sec)] border border-[var(--border-color)] flex items-center justify-between">
                    <div>
                      <strong className="text-[var(--text-main)] block">{book.title}</strong>
                      <span className="text-[11px]">{book.author}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--text-sec)]">{book.year}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Call to Action */}
      <div className="p-6 bg-[var(--bg-sec)] border border-[var(--border-color)] rounded-3xl text-center space-y-3">
        <h3 className="text-lg font-serif font-bold text-[var(--text-main)]">
          Gostaria de acompanhar as próximas edições?
        </h3>
        <p className="text-xs text-[var(--text-sec)] max-w-md mx-auto">
          Assine a newsletter gratuita do Entrelinhas para receber os ensaios diretamente na sua caixa de entrada.
        </p>
        <button
          onClick={() => onNavigate("home")}
          className="px-6 py-2.5 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-semibold text-xs rounded-xl transition-all inline-flex items-center space-x-2"
        >
          <span>Ir para a página inicial</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
