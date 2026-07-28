import React from "react";
import { motion } from "motion/react";
import { 
  Sparkles, CheckCircle2, ShieldCheck, Heart, Users, ArrowUpRight, Play, Cpu, Lock, Layers
} from "lucide-react";

interface MenteLudicaSectionProps {
  onOpenApp: () => void;
}

export const MenteLudicaSection: React.FC<MenteLudicaSectionProps> = ({ onOpenApp }) => {
  return (
    <section id="project-menteludica" className="relative bg-[#020202] border-t border-white/10 py-24 text-white z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 bg-[#7567E8]/10 border border-[#7567E8]/30 px-3 py-1 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-[#7567E8]" />
              <span className="font-mono text-xs text-[#7567E8] font-bold uppercase tracking-widest">
                CASE DE SUCESSO // PLATAFORMA SAAS TERAPÊUTICA
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans text-white">
              MenteLúdica <span className="text-[#7567E8]">SaaS</span>
            </h2>
            <p className="text-white/60 font-sans text-sm md:text-base max-w-2xl leading-relaxed">
              Recursos terapêuticos digitais interativos para psicólogos conduzirem sessões presenciais ou remotas com alta engajamento de crianças, adolescentes e famílias.
            </p>
          </div>

          <button
            onClick={onOpenApp}
            className="px-6 py-3.5 bg-[#7567E8] hover:bg-[#6253D6] text-white rounded-xl font-bold text-sm shadow-[0_0_25px_rgba(117,103,232,0.4)] flex items-center justify-center gap-2 transition-all transform hover:scale-105 shrink-0"
          >
            <span>Acessar Plataforma MenteLúdica</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Cenário Interativo 'Meu Mundo por Dentro'",
              category: "Bandeja de Areia Digital",
              desc: "Canvas com objetos 2D arrastáveis (pessoas, família, animais, casas, emoções) para projeção simbólica e reconstrução de afetos.",
              icon: "🏝️",
              color: "text-[#7567E8]"
            },
            {
              title: "Desenho Livre 'Desenhando o que sinto'",
              category: "Mapeamento Somático",
              desc: "Ferramentas de pintura com molduras clínicas como silhueta corporal e termômetro emocional para expressar sentimentos não-verbais.",
              icon: "🎨",
              color: "text-[#E7A3B4]"
            },
            {
              title: "Cartas Reflexivas que Fazem Pensar",
              category: "Carrossel de Perguntas",
              desc: "Baralho 3D com perguntas direcionadas para adolescentes e adultos, com respostas por áudio simulado, texto ou desenho.",
              icon: "🃏",
              color: "text-[#5E9FD6]"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="bg-[#0A0B10] border border-white/10 hover:border-[#7567E8]/50 p-6 rounded-2xl flex flex-col justify-between space-y-4 group transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">{item.category}</span>
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-[#7567E8] transition-colors">{item.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
              </div>

              <button
                onClick={onOpenApp}
                className="text-xs font-bold text-[#7567E8] hover:underline flex items-center gap-1 pt-2"
              >
                <span>Testar recurso interativo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Technical Highlights Bar */}
        <div className="bg-[#0A0B10] border border-white/10 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-mono">
          {[
            { label: "SESSÕES REMOTAS", val: "Link / QR Code sem cadastro do paciente" },
            { label: "VALIDAÇÃO CRP", val: "Fila e revisão profissional" },
            { label: "ANOTAÇÕES PRIVADAS", val: "Sigilo ético para o psicólogo" },
            { label: "PWA RESPONSIVO", val: "Nativo em Celulares & Tablets" }
          ].map((h, i) => (
            <div key={i} className="space-y-1">
              <span className="text-[10px] text-[#00FF41] font-bold block">{h.label}</span>
              <p className="text-xs font-sans text-white/80 font-semibold">{h.val}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenteLudicaSection;
