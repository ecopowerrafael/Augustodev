import React, { useState } from "react";
import { FAQ_ITEMS } from "../../data/bhPresentesData";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";

interface FaqSectionProps {
  onOpenForm: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenForm }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-white text-[#18202A] font-sans scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-[#176BFF]/10 text-[#176BFF] uppercase tracking-wider inline-flex items-center space-x-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>TIRANDO DÚVIDAS</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A]">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="text-sm text-[#687382]">
            Tire suas dúvidas sobre garantia, pagamento, trocas e retiradas na loja física.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-[#176BFF]"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 text-left bg-[#F5F7FA] font-extrabold text-sm sm:text-base text-[#0B1F3A] flex items-center justify-between space-x-4 hover:bg-gray-100 transition-colors"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#176BFF] transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 bg-white text-xs sm:text-sm text-[#687382] leading-relaxed border-t border-gray-100 animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="p-6 bg-[#0B1F3A] text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xl">
          <div>
            <h3 className="text-lg font-black text-white">Ainda tem alguma dúvida?</h3>
            <p className="text-xs text-gray-300">Nossa equipe está pronta para responder suas perguntas no WhatsApp.</p>
          </div>
          <button
            onClick={onOpenForm}
            className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs rounded-xl transition-all shadow-md flex items-center space-x-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com o Consultor</span>
          </button>
        </div>
      </div>
    </section>
  );
};
