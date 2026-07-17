import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Sprout, ShieldCheck, Sparkles, Truck, ArrowRight, Layers } from "lucide-react";

// SEO Framework components
import { Breadcrumb, ProductSchema } from "../seo/SEOComponents";
import InternalLinker from "../seo/InternalLinker";

// Images provided by the user
const logoImg = "https://scontent-gru2-2.xx.fbcdn.net/v/t39.30808-6/217702713_207539931376442_835766243087721509_n.jpg?stp=dst-jpg_tt6&cstp=mx180x180&ctp=s180x180&_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=fwD3SZKNQGMQ7kNvwHsoVRG&_nc_oc=AdpE9aiqny7V45bxxG3VUW2pD6xseSANH85QjqbNAi8iCjsAcsoyR4zJDyEhZQYB91k&_nc_zt=23&_nc_ht=scontent-gru2-2.xx&_nc_gid=4ziY5ZhqfvnME_oFIUzEhg&_nc_ss=7b289&oh=00_AQB80Z8CyASorRL-g-OGD6rK3LA4O2eE3Bja1oPYBVRCYA&oe=6A605769";
const pastureImg = "https://scontent-gru2-2.xx.fbcdn.net/v/t39.30808-6/495587461_1255637539900004_9044154546783021774_n.jpg?stp=dst-jpg_tt6&cstp=mx1000x1779&ctp=s1000x1779&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=P2Ey_00b1BAQ7kNvwGOADKs&_nc_oc=Adrp-2K1fa-k4cum_q1Z6krVLuQ6bJvVTX5eRKQGmjcP5T35TsVVVrU24vGSKVkRxqg&_nc_zt=23&_nc_ht=scontent-gru2-2.xx&_nc_gid=JeunBkO51aJKfUwiwDUTEg&_nc_ss=7b289&oh=00_AQDvXpuvtfKUDZu9GbXc7sq5iIBD7XcEjOl2J_0-8MwhtQ&oe=6A6066EA";

export default function MarvetSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/portfolio/marvet");
    window.dispatchEvent(new Event("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=150&h=150&q=80";
  };

  const handlePastureError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[550px] w-full bg-[#050705] rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all overflow-hidden flex flex-col justify-between p-8 group"
      id="project-marvet"
    >
      {/* Product & Breadcrumb Schemas for Google Search indexing */}
      <ProductSchema 
        id="marvet-case-showcase"
        details={{
          name: "Website Institucional Premium e Conversor de Leads para Agronegócio - Marvet",
          description: "Desenvolvimento de portal agropecuário focado na venda de mudas para pastagens. Oferece calculadora inteligente de sementes, simulador de frete rodoviário e catálogo interativo de espécies de gramíneas.",
          image: logoImg
        }}
      />
      <div className="mb-6 self-start text-left">
        <Breadcrumb items={[
          { label: "Projetos", path: "/" },
          { label: "Agronegócio & Conversão", path: "/#project-marvet" }
        ]} />
      </div>

      {/* Visual Header / HUD */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 z-10">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs text-white/40 tracking-wider uppercase">
            CASO DE SUCESSO 11 // AGRIBUSINESS & CONVERSION PLATFORM
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/5 font-mono text-[9px] text-emerald-500 uppercase font-bold">
          ESTILO CONFIÁVEL & LUSH GREEN
        </div>
      </div>

      {/* Main content split */}
      <div className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 my-8 z-10">
        
        {/* Left info description */}
        <div className="text-left space-y-4 max-w-lg">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Sparkles className="h-3 w-3" />
            <span>ENGAJAMENTO DE PRODUTOR RURAL & CONVERSÃO</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
            Marvet Agropecuária: <span className="text-emerald-400">Portal de Mudas</span> de Pastagem de Alta Performance
          </h3>

          <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
            Desenvolvido com foco no público agropecuário moderno. Combina as necessidades de credibilidade física com ferramentas de conversão online, integrando calculadora inteligente de hectares de plantio, catálogo de variedades tátil (Tifton 85, Kurumi, Capiaçu) e simulador de logística rodoviária saindo de Concórdia, SC.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-[10px] text-white/40 uppercase tracking-wider font-bold">
            <div className="flex items-center space-x-1.5">
              <Layers className="h-4 w-4 text-emerald-400" />
              <span>Simulador de Hectares</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Truck className="h-4 w-4 text-emerald-400" />
              <span>Simulador de Prazos Sul/Br</span>
            </div>
          </div>
        </div>

        {/* Right: Beautiful Premium Image Showcase of their real image and logo */}
        <div className="relative w-full lg:w-[380px] aspect-[10/14] bg-[#070A07] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-emerald-500/30 transition-all duration-500">
          <img 
            src={pastureImg} 
            alt="Marvet Pastagem Caso de Sucesso" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
            onError={handlePastureError}
          />
          
          {/* Logo HUD Overlay */}
          <div className="absolute top-4 left-4 flex items-center space-x-2.5 bg-black/80 backdrop-blur-md border border-white/10 p-2.5 rounded-xl">
            <img 
              src={logoImg} 
              alt="Marvet Logo" 
              className="h-8 w-8 rounded-full border border-emerald-500 object-cover referrer-policy='no-referrer'"
              referrerPolicy="no-referrer"
              onError={handleLogoError}
            />
            <div>
              <span className="font-sans font-black text-[10px] text-white tracking-widest block uppercase">MARVET</span>
              <span className="font-mono text-[8px] text-emerald-400 font-bold block">CONCÓRDIA, SC</span>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/40 to-transparent p-5 text-left">
            <span className="font-mono text-[9px] text-[#00FF41] font-bold uppercase tracking-widest block">CASE STUDY // AGRONEGÓCIO</span>
            <p className="text-white text-xs font-sans mt-1 font-bold">
              +150% de engajamento e captação de leads de produtores de SC, PR e RS.
            </p>
          </div>
        </div>

      </div>

      {/* Call to action bar */}
      <div className="mb-6 p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex flex-col md:flex-row items-center justify-between gap-4 z-10 text-left">
        <div className="space-y-0.5">
          <span className="font-mono text-[9px] text-[#00FF41] font-bold block uppercase tracking-[0.2em]">CÓDIGO DE CONVERSÃO EXTREMA</span>
          <h4 className="font-sans font-bold text-white text-sm">Site de Alta Performance para Mudas Agro</h4>
          <p className="text-white/60 text-xs">
            Uma obra de engenharia de software de alta conversão, voltada inteiramente para a geração de contatos qualificados e encomendas para o agronegócio.
          </p>
        </div>
        <button
          onClick={navigateToPortfolio}
          className="w-full md:w-auto py-3 px-6 rounded bg-gradient-to-r from-emerald-500 to-green-600 text-white font-mono text-[10px] font-extrabold uppercase tracking-widest hover:from-green-600 hover:to-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer flex items-center justify-center space-x-1.5 shrink-0"
        >
          <span>ACESSAR SITE</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Footer architectural features list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/10 pt-6 z-10 bg-black/40 rounded-b p-4 text-left">
        
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded bg-emerald-500/10 text-emerald-500 shrink-0">
            <Sprout className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-white">RECOMENDAÇÃO INTELIGENTE</h4>
            <p className="text-white/40 text-[11px] mt-1">
              Filtro por gado de leite, corte ou equinos. Recomenda a pastagem ideal de forma automática e otimiza a conversão do produtor.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="p-2 rounded bg-emerald-500/10 text-emerald-500 shrink-0">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-white">QUALIFICAÇÃO INTEGRADA</h4>
            <p className="text-white/40 text-[11px] mt-1">
              A calculadora inteligente calcula a volumetria aproximada necessária de mudas para a área de hectares indicada, enviando o lead com riqueza de detalhes.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="p-2 rounded bg-emerald-500/10 text-emerald-500 shrink-0">
            <Truck className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-white">LOGÍSTICA PREVISÍVEL</h4>
            <p className="text-white/40 text-[11px] mt-1">
              Com o calculador de rotas de transporte, o produtor rural calcula o tempo médio de viagem até seu estado em poucos cliques, quebrando objeções.
            </p>
          </div>
        </div>

      </div>

      {/* Internal Linking Recommender */}
      <InternalLinker currentTopic="agronegocio" className="mt-6 text-left" />
    </div>
  );
}
