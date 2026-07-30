import React, { FC } from 'react';
import { 
  Sparkles, 
  Brain, 
  Gamepad2, 
  HeartHandshake, 
  Users, 
  Globe, 
  Database, 
  ArrowRight,
  CheckCircle2,
  Smile,
  ShieldCheck
} from 'lucide-react';

interface NeuroAprendeSectionProps {
  onOpenPrototype: () => void;
}

export const NeuroAprendeSection: FC<NeuroAprendeSectionProps> = ({ onOpenPrototype }) => {
  return (
    <section className="py-16 bg-[#0d0e0d] border-t border-b border-stone-850 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-800 pb-8">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <Brain className="w-3.5 h-3.5" />
                <span>Case #41 • Inclusão & Neurodivergência</span>
              </span>

              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Protótipo Interativo</span>
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
              NeuroAprende <span className="italic font-normal text-emerald-400">Games</span>
            </h2>
            <p className="font-mono text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Plataforma de aprendizagem e jogos adaptativos para crianças e adolescentes neurodivergentes (TEA, TDAH, Dislexia, Discalculia, Síndrome de Down), com ambiente lúdico seguro e painel multidisciplinar para pais, educadores e terapeutas.
            </p>
          </div>

          <div>
            <button
              onClick={onOpenPrototype}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider rounded-2xl transition shadow-xl flex items-center space-x-2 transform hover:scale-[1.02]"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Testar Protótipo Completo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
          
          <div className="bg-stone-950 border border-stone-850 hover:border-emerald-500/40 rounded-3xl p-6 space-y-3 transition">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center text-xl">
              🦉
            </div>
            <h3 className="font-serif font-bold text-lg text-white">6 Mundos Temáticos Lúdicos</h3>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              Mundo das Letras, Emoções, Animais, Rotina & PECS, Números e Cores/Formas com a mascote Nido acompanhando sem punições por erro.
            </p>
          </div>

          <div className="bg-stone-950 border border-stone-850 hover:border-emerald-500/40 rounded-3xl p-6 space-y-3 transition">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center text-xl">
              🎮
            </div>
            <h3 className="font-serif font-bold text-lg text-white">4 Minijogos Jogáveis em Tempo Real</h3>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              Pareamento de vogais, jogo da memória de emoções, identificação de som animal e Prancha PECS interativa com leitura falada em voz alta.
            </p>
          </div>

          <div className="bg-stone-950 border border-stone-850 hover:border-emerald-500/40 rounded-3xl p-6 space-y-3 transition">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center justify-center text-xl">
              📊
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Painel Multidisciplinar Adulto</h3>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              Gráficos em Recharts de evolução cognitiva (Atenção, Memória, Linguagem), tempo de uso diário, diário de observação e exportação em PDF.
            </p>
          </div>

          <div className="bg-stone-950 border border-stone-850 hover:border-emerald-500/40 rounded-3xl p-6 space-y-3 transition">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center text-xl">
              ⚙️
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Editor No-Code para 3.000 Tasks</h3>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              Arquitetura de templates parametrizados que permite o cadastro contínuo de novas atividades pedagógicas sem alterações no código.
            </p>
          </div>

          <div className="bg-stone-950 border border-stone-850 hover:border-emerald-500/40 rounded-3xl p-6 space-y-3 transition">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center text-xl">
              🌐
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Suporte Multilíngue + Árabe RTL</h3>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              Interface pronta para Português, Inglês, Espanhol e Árabe com reorientação direcional Right-To-Left completa dos componentes.
            </p>
          </div>

          <div className="bg-stone-950 border border-stone-850 hover:border-emerald-500/40 rounded-3xl p-6 space-y-3 transition">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center text-xl">
              👁️
            </div>
            <h3 className="font-serif font-bold text-lg text-white">Modo Calmo & Sensibilidade</h3>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              Controle de ritmo da voz, redução de contrastes estridentes, ausência de contagem agressiva de tempo e pausa para respiração guiada.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
