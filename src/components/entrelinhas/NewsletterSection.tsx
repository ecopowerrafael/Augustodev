import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

interface NewsletterSectionProps {
  showToast?: (msg: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ showToast }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitted(true);
    if (showToast) {
      showToast("Inscrição realizada. O próximo texto chegará ao seu e-mail.");
    }
  };

  return (
    <section id="newsletter" className="py-16 my-12 font-sans border-y border-[var(--border-color)] bg-[var(--bg-sec)]/50 transition-colors">
      <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
        <div className="inline-flex items-center space-x-2 p-2 rounded-full bg-[var(--bg-sec)] border border-[var(--border-color)] text-[var(--accent-color)] text-xs font-semibold px-4">
          <Mail className="w-3.5 h-3.5" />
          <span>NEWSLETTER AUTORAL</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-main)]">
            Novos textos, sem excesso de e-mails
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-sec)] leading-relaxed max-w-lg mx-auto">
            Receba uma mensagem no seu e-mail quando um novo artigo for publicado. Sem spam e sem sequências automáticas intermináveis.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-6 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl text-center space-y-2 animate-fade-in max-w-md mx-auto">
            <CheckCircle2 className="w-8 h-8 text-[#25D366] mx-auto" />
            <h3 className="text-base font-bold text-[var(--text-main)]">Inscrição realizada!</h3>
            <p className="text-xs text-[var(--text-sec)]">
              Obrigado, {name || "leitor"}. O próximo ensaio chegará diretamente à sua caixa de entrada.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setName("");
                setEmail("");
              }}
              className="text-xs text-[var(--accent-color)] hover:underline pt-2 inline-block font-medium"
            >
              Cadastrar outro e-mail
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto text-left">
            <div>
              <label htmlFor="newsletter-name" className="block text-xs font-medium text-[var(--text-sec)] mb-1">
                Seu nome (opcional)
              </label>
              <input
                id="newsletter-name"
                type="text"
                placeholder="Como prefere ser chamado?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] placeholder-[var(--text-sec)]/60 focus:outline-none focus:border-[var(--accent-color)] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="newsletter-email" className="block text-xs font-medium text-[var(--text-sec)] mb-1">
                Seu melhor e-mail *
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] placeholder-[var(--text-sec)]/60 focus:outline-none focus:border-[var(--accent-color)] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-medium text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2"
            >
              <span>Quero receber os próximos textos</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-[var(--text-sec)] text-center">
              Você pode cancelar a inscrição a qualquer momento com apenas um clique.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
