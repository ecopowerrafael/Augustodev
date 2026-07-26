import React from "react";
import { STORE_INFO, FEATURED_OFFER } from "../../data/bhPresentesData";
import {
  CreditCard,
  ShieldCheck,
  Store,
  MessageCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Star,
  Zap,
  Tag
} from "lucide-react";

interface HeroProps {
  onOpenForm: (selectedModel?: string) => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenForm, onNavigateToSection }) => {
  return (
    <section id="hero" className="relative bg-[#0B1F3A] text-white pt-8 pb-16 md:py-20 overflow-hidden font-sans">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#176BFF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#25D366]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Ticker Promotional Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-gradient-to-r from-[#176BFF]/30 via-[#FFC928]/20 to-[#25D366]/30 border border-white/15 rounded-2xl p-2.5 sm:p-3 flex items-center justify-between text-xs sm:text-sm font-bold text-white shadow-lg backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 bg-[#F04444] text-white text-[10px] font-black uppercase rounded-full tracking-wider animate-pulse">
              URGENTE
            </span>
            <span className="line-clamp-1">🔥 Ofertas especiais de celulares válidas enquanto durarem os estoques na Pampulha</span>
          </div>
          <button
            onClick={() => onNavigateToSection("ofertas")}
            className="hidden sm:flex items-center space-x-1 text-[#FFC928] hover:underline font-extrabold text-xs whitespace-nowrap"
          >
            <span>Ver Catálogo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-bold text-gray-200">
              <Store className="w-4 h-4 text-[#FFC928]" />
              <span>Loja Física na Região da Pampulha • Belo Horizonte</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none sm:leading-tight">
              O smartphone dos seus sonhos com <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#176BFF] via-[#FFC928] to-[#25D366]">condições especiais</span> na Pampulha
            </h1>

            {/* Complementary Text */}
            <p className="text-base sm:text-lg text-gray-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Encontre celulares novos e seminovos com garantia, parcelamento facilitado em até 12x e atendimento rápido pelo WhatsApp com nossa equipe comercial.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onOpenForm()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-base shadow-2xl shadow-[#25D366]/40 transition-all hover:scale-105 flex items-center justify-center space-x-2 group"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Quero Encontrar Meu Celular</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigateToSection("ofertas")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base transition-colors border border-white/20 flex items-center justify-center space-x-2"
              >
                <Tag className="w-5 h-5 text-[#FFC928]" />
                <span>Ver Ofertas do Dia</span>
              </button>
            </div>

            {/* Social Proof Star Rating */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-gray-300 font-medium">
              <div className="flex items-center space-x-1 text-[#FFC928]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-extrabold text-white text-sm">4.9/5.0</span>
              <span className="text-gray-400">• Mais de 500 clientes atendidos na Pampulha</span>
            </div>
          </div>

          {/* Right Hero Visual Card Showcase (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-gradient-to-b from-white/15 to-white/5 border border-white/20 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-6">
              {/* Floating Badge top right */}
              <div className="absolute -top-4 -right-4 bg-[#FFC928] text-[#0B1F3A] font-black text-xs px-4 py-2 rounded-2xl shadow-xl flex items-center space-x-1 rotate-3 animate-bounce">
                <Zap className="w-4 h-4 text-[#F04444] fill-current" />
                <span>Até 12x no Cartão</span>
              </div>

              {/* Product Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="px-3 py-1 bg-[#25D366] text-white text-[10px] font-black uppercase rounded-full tracking-wider">
                  OFERTA EM DESTAQUE
                </span>
                <span className="text-xs text-gray-300 font-mono">Lacrado com Nota Fiscal</span>
              </div>

              {/* Smartphone Main Image Showcase */}
              <div className="relative group cursor-pointer" onClick={() => onOpenForm(FEATURED_OFFER.name)}>
                <img
                  src={FEATURED_OFFER.imageUrl}
                  alt={FEATURED_OFFER.name}
                  className="w-full h-64 object-cover rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-2xl flex items-end p-4">
                  <div>
                    <span className="text-[#FFC928] font-bold text-xs uppercase tracking-wider block">
                      {FEATURED_OFFER.brand}
                    </span>
                    <h3 className="text-xl font-black text-white">{FEATURED_OFFER.name}</h3>
                  </div>
                </div>
              </div>

              {/* Pricing Callout */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Preço Especial à Vista</span>
                  <span className="text-2xl font-black text-[#25D366]">
                    R$ {FEATURED_OFFER.cashPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Ou Parcelado</span>
                  <span className="text-sm font-bold text-[#FFC928]">
                    12x de R$ {FEATURED_OFFER.installmentValue.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenForm(FEATURED_OFFER.name)}
                className="w-full py-3.5 bg-gradient-to-r from-[#176BFF] to-[#25D366] hover:brightness-110 text-white font-black text-sm rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar Este Modelo no WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Highlights Grid (4 Pillars) */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-3 text-left">
            <div className="p-2.5 bg-[#176BFF]/20 text-[#176BFF] rounded-xl shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-xs sm:text-sm">Até 12x no Cartão</h4>
              <p className="text-[11px] text-gray-400">Parcelamento facilitado</p>
            </div>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-3 text-left">
            <div className="p-2.5 bg-[#25D366]/20 text-[#25D366] rounded-xl shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-xs sm:text-sm">Com Garantia</h4>
              <p className="text-[11px] text-gray-400">Novos e Seminovos com Nota</p>
            </div>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-3 text-left">
            <div className="p-2.5 bg-[#FFC928]/20 text-[#FFC928] rounded-xl shrink-0">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-xs sm:text-sm">Retirada na Loja</h4>
              <p className="text-[11px] text-gray-400">Loja física na Pampulha</p>
            </div>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-3 text-left">
            <div className="p-2.5 bg-[#25D366]/20 text-[#25D366] rounded-xl shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-xs sm:text-sm">Atendimento Rápido</h4>
              <p className="text-[11px] text-gray-400">Consultores no WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
