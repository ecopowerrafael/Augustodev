import React from "react";
import { Store, ShieldCheck, CreditCard, Clock, Star, Users, CheckCircle2 } from "lucide-react";

export const TrustSection: React.FC = () => {
  return (
    <section className="py-12 bg-white border-y border-gray-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-[#176BFF]/10 text-[#176BFF] uppercase tracking-wider">
            TRANSPARÊNCIA & SEGURANÇA
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0B1F3A]">
            Compre seu próximo celular com segurança
          </h2>
          <p className="text-sm text-[#687382]">
            Conheça as garantias e facilidades de comprar na BH Presentes, sua loja de confiança na Pampulha.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-[#F5F7FA] rounded-2xl border border-gray-200 hover:border-[#176BFF] transition-all space-y-3">
            <div className="w-12 h-12 bg-[#176BFF]/10 text-[#176BFF] rounded-xl flex items-center justify-center font-bold">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-[#0B1F3A]">Loja Física</h3>
            <p className="text-xs text-[#687382] leading-relaxed">
              Atendimento presencial e personalizado na região da Pampulha em Belo Horizonte. Venha testar seu aparelho!
            </p>
          </div>

          <div className="p-6 bg-[#F5F7FA] rounded-2xl border border-gray-200 hover:border-[#25D366] transition-all space-y-3">
            <div className="w-12 h-12 bg-[#25D366]/10 text-[#25D366] rounded-xl flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-[#0B1F3A]">Garantia Real</h3>
            <p className="text-xs text-[#687382] leading-relaxed">
              Todos os aparelhos possuem garantia com procedência e nota fiscal. Compra 100% segura sem surpresas.
            </p>
          </div>

          <div className="p-6 bg-[#F5F7FA] rounded-2xl border border-gray-200 hover:border-[#FFC928] transition-all space-y-3">
            <div className="w-12 h-12 bg-[#FFC928]/20 text-[#0B1F3A] rounded-xl flex items-center justify-center font-bold">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-[#0B1F3A]">Pagamento Seguro</h3>
            <p className="text-xs text-[#687382] leading-relaxed">
              Aceitamos Pix com desconto, cartão de crédito em até 12x e seu celular antigo como parte do pagamento.
            </p>
          </div>

          <div className="p-6 bg-[#F5F7FA] rounded-2xl border border-gray-200 hover:border-[#25D366] transition-all space-y-3">
            <div className="w-12 h-12 bg-[#25D366]/10 text-[#25D366] rounded-xl flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-[#0B1F3A]">Atendimento Rápido</h3>
            <p className="text-xs text-[#687382] leading-relaxed">
              Equipe dedicada e pronta no WhatsApp para ajudar você a comparar modelos, tirar dúvidas e fechar negócio.
            </p>
          </div>
        </div>

        {/* Social Proof Numbers Band */}
        <div className="mt-10 p-6 bg-[#0B1F3A] text-white rounded-3xl flex flex-wrap items-center justify-around gap-6 text-center shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-[#FFC928]/20 text-[#FFC928] rounded-2xl">
              <Star className="w-6 h-6 fill-current" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black block">4,9 de 5 Estrelas</span>
              <span className="text-xs text-gray-300">Avaliação Média dos Clientes</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-[#25D366]/20 text-[#25D366] rounded-2xl">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black block">Mais de 500</span>
              <span className="text-xs text-gray-300">Clientes Atendidos na Pampulha</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-[#176BFF]/20 text-[#176BFF] rounded-2xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black block">100% Verificados</span>
              <span className="text-xs text-gray-300">Aparelhos com Nota Fiscal & Teste</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
