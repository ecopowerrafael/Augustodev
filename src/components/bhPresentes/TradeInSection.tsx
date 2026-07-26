import React, { useState } from "react";
import { TradeInValuation } from "../../types/bhPresentes";
import { RefreshCw, Smartphone, CheckCircle2, ShieldAlert, ArrowRight, MessageCircle } from "lucide-react";

interface TradeInSectionProps {
  onApplyTradeIn: (tradeInData: TradeInValuation) => void;
}

export const TradeInSection: React.FC<TradeInSectionProps> = ({ onApplyTradeIn }) => {
  const [tradeIn, setTradeIn] = useState<TradeInValuation>({
    brand: "Apple",
    model: "iPhone 11",
    storage: "128 GB",
    screenCondition: "Sem riscos",
    batteryCondition: "Acima de 80%",
    isWorking: true,
    hasBox: true,
    hasInvoice: true
  });

  const calculateEstimate = () => {
    let baseMin = 400;
    let baseMax = 900;

    if (tradeIn.brand === "Apple") {
      baseMin += 400;
      baseMax += 800;
    } else if (tradeIn.brand === "Samsung") {
      baseMin += 250;
      baseMax += 500;
    }

    if (tradeIn.screenCondition === "Sem riscos") {
      baseMin += 200;
      baseMax += 300;
    } else if (tradeIn.screenCondition === "Trincada / Danificada") {
      baseMin -= 200;
      baseMax -= 300;
    }

    if (tradeIn.batteryCondition === "Acima de 80%") {
      baseMin += 100;
      baseMax += 150;
    }

    if (!tradeIn.isWorking) {
      baseMin = 100;
      baseMax = 300;
    }

    return { min: Math.max(100, baseMin), max: Math.max(250, baseMax) };
  };

  const estimate = calculateEstimate();

  const handleSubmitValuation = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyTradeIn({
      ...tradeIn,
      estimatedValuationMin: estimate.min,
      estimatedValuationMax: estimate.max
    });
  };

  return (
    <section id="troca" className="py-16 bg-white text-[#18202A] font-sans scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Description Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-black bg-[#FFC928]/30 text-[#0B1F3A] uppercase tracking-wider inline-flex items-center space-x-1 border border-[#FFC928]">
              <RefreshCw className="w-3.5 h-3.5 text-[#176BFF]" />
              <span>PROGRAMA DE TROCA • TRADE-IN</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] leading-tight">
              Seu celular usado pode ajudar na compra do próximo
            </h2>

            <p className="text-sm text-[#687382] leading-relaxed">
              Aceitamos seu smartphone antigo como abatimento no valor do aparelho novo ou seminovo. Preencha a pré-avaliação e receba uma estimativa imediata.
            </p>

            <ul className="space-y-3 text-xs sm:text-sm font-bold text-[#0B1F3A]">
              <li className="flex items-center space-x-3">
                <div className="p-1.5 bg-[#25D366]/20 text-[#25D366] rounded-lg shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Avaliação transparente e justa sem burocracia</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-1.5 bg-[#25D366]/20 text-[#25D366] rounded-lg shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Abatimento direto no valor total ou no parcelamento</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-1.5 bg-[#25D366]/20 text-[#25D366] rounded-lg shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>Análise presencial rápida na loja física da Pampulha</span>
              </li>
            </ul>

            <div className="p-4 bg-[#F5F7FA] border border-gray-200 rounded-2xl flex items-start space-x-3 text-xs text-[#687382]">
              <ShieldAlert className="w-5 h-5 text-[#FFC928] shrink-0 mt-0.5" />
              <span>
                <strong>Aviso:</strong> A estimativa abaixo é apenas uma prévia. O valor definitivo do abatimento será confirmado após vistoria técnica presencial em nossa loja.
              </span>
            </div>
          </div>

          {/* Right Valuation Calculator Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0B1F3A] text-white p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <h3 className="text-lg font-black text-white flex items-center space-x-2">
                <Smartphone className="w-5 h-5 text-[#25D366]" />
                <span>Simulador de Pré-Avaliação</span>
              </h3>
              <span className="text-xs text-[#FFC928] font-mono">Simulação em Tempo Real</span>
            </div>

            <form onSubmit={handleSubmitValuation} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Brand */}
                <div>
                  <label className="block font-bold mb-1 text-gray-300">Marca Atual</label>
                  <select
                    value={tradeIn.brand}
                    onChange={(e) => setTradeIn({ ...tradeIn, brand: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold focus:outline-none focus:border-[#25D366]"
                  >
                    <option value="Apple" className="bg-[#0B1F3A]">Apple (iPhone)</option>
                    <option value="Samsung" className="bg-[#0B1F3A]">Samsung</option>
                    <option value="Motorola" className="bg-[#0B1F3A]">Motorola</option>
                    <option value="Xiaomi" className="bg-[#0B1F3A]">Xiaomi</option>
                    <option value="Outro" className="bg-[#0B1F3A]">Outra Marca</option>
                  </select>
                </div>

                {/* Model */}
                <div>
                  <label className="block font-bold mb-1 text-gray-300">Modelo Exato</label>
                  <input
                    type="text"
                    value={tradeIn.model}
                    onChange={(e) => setTradeIn({ ...tradeIn, model: e.target.value })}
                    placeholder="Ex: iPhone 11, S21..."
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold focus:outline-none focus:border-[#25D366]"
                    required
                  />
                </div>

                {/* Storage */}
                <div>
                  <label className="block font-bold mb-1 text-gray-300">Armazenamento</label>
                  <select
                    value={tradeIn.storage}
                    onChange={(e) => setTradeIn({ ...tradeIn, storage: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold focus:outline-none focus:border-[#25D366]"
                  >
                    <option value="64 GB" className="bg-[#0B1F3A]">64 GB</option>
                    <option value="128 GB" className="bg-[#0B1F3A]">128 GB</option>
                    <option value="256 GB" className="bg-[#0B1F3A]">256 GB</option>
                    <option value="512 GB" className="bg-[#0B1F3A]">512 GB ou mais</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Screen Condition */}
                <div>
                  <label className="block font-bold mb-1 text-gray-300">Estado da Tela</label>
                  <select
                    value={tradeIn.screenCondition}
                    onChange={(e) => setTradeIn({ ...tradeIn, screenCondition: e.target.value as any })}
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold focus:outline-none focus:border-[#25D366]"
                  >
                    <option value="Sem riscos" className="bg-[#0B1F3A]">Sem riscos (Impecável)</option>
                    <option value="Marcas leves" className="bg-[#0B1F3A]">Marcas leves de uso</option>
                    <option value="Trincada / Danificada" className="bg-[#0B1F3A]">Tela trincada / com manchas</option>
                  </select>
                </div>

                {/* Battery Condition */}
                <div>
                  <label className="block font-bold mb-1 text-gray-300">Saúde da Bateria</label>
                  <select
                    value={tradeIn.batteryCondition}
                    onChange={(e) => setTradeIn({ ...tradeIn, batteryCondition: e.target.value as any })}
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold focus:outline-none focus:border-[#25D366]"
                  >
                    <option value="Acima de 80%" className="bg-[#0B1F3A]">Acima de 80% (Boa)</option>
                    <option value="Abaixo de 80%" className="bg-[#0B1F3A]">Abaixo de 80% (Desgastada)</option>
                  </select>
                </div>
              </div>

              {/* Checkbox Options */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <label className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tradeIn.isWorking}
                    onChange={(e) => setTradeIn({ ...tradeIn, isWorking: e.target.checked })}
                    className="rounded text-[#25D366]"
                  />
                  <span className="text-[11px] font-bold">Liga perfeitamente</span>
                </label>

                <label className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tradeIn.hasBox}
                    onChange={(e) => setTradeIn({ ...tradeIn, hasBox: e.target.checked })}
                    className="rounded text-[#25D366]"
                  />
                  <span className="text-[11px] font-bold">Possui caixa</span>
                </label>

                <label className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tradeIn.hasInvoice}
                    onChange={(e) => setTradeIn({ ...tradeIn, hasInvoice: e.target.checked })}
                    className="rounded text-[#25D366]"
                  />
                  <span className="text-[11px] font-bold">Possui Nota Fiscal</span>
                </label>
              </div>

              {/* Estimate Calculation Result Callout */}
              <div className="bg-gradient-to-r from-[#176BFF]/30 to-[#25D366]/30 border border-white/20 p-4 rounded-2xl text-center space-y-1">
                <span className="text-[10px] text-gray-300 uppercase font-black tracking-wider block">
                  Estimativa de Abatimento Inicial
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#FFC928]">
                  R$ {estimate.min.toLocaleString("pt-BR")} a R$ {estimate.max.toLocaleString("pt-BR")}
                </div>
                <span className="text-[10px] text-gray-300">
                  Desconto pré-estimado a ser deduzido no seu novo smartphone
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm rounded-2xl transition-all shadow-xl flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Usar Esta Avaliação na Troca do Novo Celular</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
