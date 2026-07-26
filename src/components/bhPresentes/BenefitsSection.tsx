import React from "react";
import { CheckCircle2, ShieldCheck, CreditCard, MessageCircle, Store, Headphones, Sparkles } from "lucide-react";

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: CheckCircle2,
      title: "Aparelhos Selecionados",
      desc: "Produtos com procedência testada e fiscalmente verificados antes de entrarem para o estoque."
    },
    {
      icon: ShieldCheck,
      title: "Garantia Garantida",
      desc: "Aparelhos novos com garantia de fabricante e seminovos com cobertura total da loja."
    },
    {
      icon: CreditCard,
      title: "Parcelamento Facilitado",
      desc: "Condições especiais no cartão de crédito em até 12 vezes para você caber no orçamento."
    },
    {
      icon: MessageCircle,
      title: "Atendimento Humanizado",
      desc: "Consultores de verdade ajudando a escolher a memória, câmera e modelo ideal para você."
    },
    {
      icon: Store,
      title: "Retirada Presencial",
      desc: "Loja física na Avenida Presidente Antônio Carlos na Pampulha para você retirar com segurança."
    },
    {
      icon: Headphones,
      title: "Suporte Pós-Venda",
      desc: "Assistência e suporte contínuo da equipe mesmo após o término da sua compra."
    }
  ];

  return (
    <section id="beneficios" className="py-16 bg-white text-[#18202A] font-sans scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-[#FFC928]/30 text-[#0B1F3A] uppercase tracking-wider inline-flex items-center space-x-1 border border-[#FFC928]">
            <Sparkles className="w-3.5 h-3.5 text-[#176BFF]" />
            <span>EXCELÊNCIA EM ATENDIMENTO</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A]">
            Por que comprar na BH Presentes?
          </h2>
          <p className="text-sm text-[#687382]">
            Diferenciais que tornam nossa loja a melhor escolha de celulares na região da Pampulha.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 bg-[#F5F7FA] rounded-2xl border border-gray-200 hover:border-[#176BFF] hover:bg-white hover:shadow-xl transition-all space-y-3"
              >
                <div className="w-12 h-12 bg-[#176BFF]/10 text-[#176BFF] rounded-xl flex items-center justify-center font-bold">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[#0B1F3A]">{item.title}</h3>
                <p className="text-xs text-[#687382] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
