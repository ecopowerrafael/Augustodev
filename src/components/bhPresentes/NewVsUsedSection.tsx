import React from "react";
import { Sparkles, ShieldCheck, CheckCircle2, MessageCircle, ArrowRight, Award, Zap } from "lucide-react";

interface NewVsUsedSectionProps {
  onSelectCondition: (condition: "Novo" | "Seminovo") => void;
}

export const NewVsUsedSection: React.FC<NewVsUsedSectionProps> = ({ onSelectCondition }) => {
  return (
    <section className="py-16 bg-[#F5F7FA] text-[#18202A] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-[#176BFF]/10 text-[#176BFF] uppercase tracking-wider">
            ESCOLHA O PERFIL IDEAL
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A]">
            Aparelhos Novos e Seminovos Selecionados
          </h2>
          <p className="text-sm text-[#687382]">
            Seja para estrear um modelo lacrado de fábrica ou economizar com um seminovo impecável com garantia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Novos Lacrados */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#176BFF]/20 hover:border-[#176BFF] shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-[#176BFF] text-white text-xs font-black px-4 py-1.5 rounded-bl-2xl">
              LACRADOS DE FÁBRICA
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#176BFF]/10 text-[#176BFF] flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#0B1F3A]">Celulares Novos & Lacrados</h3>
                <p className="text-xs text-[#687382] mt-1">
                  Para quem exige a experiência de abrir a caixa e ter 1 ano de garantia oficial.
                </p>
              </div>

              <ul className="space-y-2 text-xs font-semibold text-[#18202A] pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#176BFF]" />
                  <span>Embalagem original lacrada de fábrica</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#176BFF]" />
                  <span>Garantia oficial de 12 meses do fabricante</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#176BFF]" />
                  <span>Nota Fiscal emitida no seu nome</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#176BFF]" />
                  <span>Últimos lançamentos Apple, Samsung e Xiaomi</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectCondition("Novo")}
              className="w-full py-3.5 bg-[#176BFF] hover:bg-[#1253c9] text-white font-black text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar Opções de Celulares Novos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Seminovos Premium */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#25D366]/30 hover:border-[#25D366] shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-[#25D366] text-white text-xs font-black px-4 py-1.5 rounded-bl-2xl">
              SELEÇÃO PREMIUM
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#0B1F3A]">Seminovos Impecáveis</h3>
                <p className="text-xs text-[#687382] mt-1">
                  Máxima economia sem abrir mão da qualidade e segurança da garantia.
                </p>
              </div>

              <ul className="space-y-2 text-xs font-semibold text-[#18202A] pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                  <span>Revisão técnica rigorosa em mais de 20 itens</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                  <span>Saúde da bateria testada e garantida</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                  <span>Garantia de loja com suporte presencial</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                  <span>Economia de até 40% em relação ao novo</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectCondition("Seminovo")}
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar Opções de Seminovos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
