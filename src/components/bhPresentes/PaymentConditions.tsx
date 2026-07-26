import React from "react";
import { CreditCard, Zap, RefreshCw, Layers, Info, CheckCircle2 } from "lucide-react";

export const PaymentConditions: React.FC = () => {
  const methods = [
    {
      icon: Zap,
      title: "Pix à Vista",
      highlight: "Maior Desconto",
      desc: "Pagamento instantâneo via chave Pix com desconto especial acumulado para fechar o negócio no ato.",
      badgeColor: "bg-[#25D366] text-white"
    },
    {
      icon: CreditCard,
      title: "Cartão em até 12x",
      highlight: "Parcela Suave",
      desc: "Aceitamos as principais bandeiras de cartão de crédito e parcelamos o valor total em até 12 vezes.",
      badgeColor: "bg-[#176BFF] text-white"
    },
    {
      icon: RefreshCw,
      title: "Troca com Aparelho Usado",
      highlight: "Abatimento Trade-In",
      desc: "Entregue seu celular antigo como parte do pagamento e abata no valor do novo ou na parcela do cartão.",
      badgeColor: "bg-[#FFC928] text-[#0B1F3A]"
    },
    {
      icon: Layers,
      title: "Entrada + Parcelado",
      highlight: "Flexibilidade",
      desc: "Dê uma entrada no Pix ou em dinheiro e divida o restante do valor em parcelas fixas no seu cartão de crédito.",
      badgeColor: "bg-[#0B1F3A] text-white"
    }
  ];

  return (
    <section className="py-16 bg-white text-[#18202A] font-sans border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-[#176BFF]/10 text-[#176BFF] uppercase tracking-wider">
            CONDIÇÕES ESPECIAIS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A]">
            Escolha a Melhor Forma de Pagamento
          </h2>
          <p className="text-sm text-[#687382]">
            Opções flexíveis para você adquirir seu novo smartphone sem complicação na Pampulha.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.map((method, i) => {
            const Icon = method.icon;
            return (
              <div
                key={i}
                className="bg-[#F5F7FA] rounded-3xl p-6 border border-gray-200 hover:border-[#176BFF] transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-[#176BFF]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${method.badgeColor}`}>
                      {method.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#0B1F3A]">{method.title}</h3>
                  <p className="text-xs text-[#687382] leading-relaxed">{method.desc}</p>
                </div>

                <div className="pt-3 border-t border-gray-200 text-[11px] font-bold text-[#25D366] flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Consulte simulação personalizada</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-[#F5F7FA] rounded-2xl border border-gray-200 flex items-center justify-center space-x-2 text-xs text-[#687382] text-center">
          <Info className="w-4 h-4 text-[#176BFF] shrink-0" />
          <span>
            * As taxas, quantidade de parcelas e valores finais deverão ser confirmados diretamente com a equipe comercial no WhatsApp.
          </span>
        </div>
      </div>
    </section>
  );
};
