import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  BookOpen, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Star, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Award, 
  Heart, 
  MessageSquare, 
  Smile, 
  GraduationCap, 
  Users, 
  Compass, 
  Sun,
  Sparkle,
  Baby,
  Coffee,
  CheckCircle2,
  ChevronRight,
  HelpCircle
} from "lucide-react";

// Generated image assets
const classroomImg = "/src/assets/images/preschool_classroom_1784142253433.jpg";
const mascotImg = "/src/assets/images/preschool_owl_mascot_1784142266262.jpg";

interface CounterProps {
  value: number;
  duration?: number; // in ms
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

function Counter({ value, duration = 2000, prefix = "", suffix = "", decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // easeOutQuad easing
      const easedProgress = progress * (2 - progress);
      const currentValue = startValue + easedProgress * (value - startValue);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(value);
      }
    };

    const animFrame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animFrame);
  }, [isInView, value, duration]);

  const formatted = count.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={elementRef} className="tabular-nums font-bold">
      {prefix}{formatted}{suffix}
    </span>
  );
}

interface TimelineItem {
  time: string;
  title: string;
  desc: string;
  badge: string;
  emoji: string;
  color: string;
}

interface ClassGroup {
  id: string;
  ageRange: string;
  className: string;
  focus: string;
  schedule: string;
  activities: string[];
}

export default function PreschoolMackenzie({ onBack }: { onBack?: () => void }) {
  const [activeHour, setActiveHour] = useState<number>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Interactive School Bus Age Selection
  const [childAge, setChildAge] = useState<number>(3);
  const [simulatedClass, setSimulatedClass] = useState<ClassGroup | null>(null);

  // Booking Form States
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [childName, setChildName] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("Integral");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Custom Playful Timeline representing a Mackenzie day
  const dailyTimeline: TimelineItem[] = [
    {
      time: "08:00 - 08:30",
      title: "Círculo do Bom Dia & Devocional",
      desc: "Início do dia com acolhimento afetivo e introdução da virtude da semana (ex: Generosidade) através de contos práticos e músicas alegres.",
      badge: "VIRTUDES EM PRÁTICA",
      emoji: "☀️",
      color: "bg-amber-100 border-amber-300 text-amber-800"
    },
    {
      time: "09:30 - 10:15",
      title: "Laboratório de Fonemas Mackenzie",
      desc: "Trabalho sensorial com as 'letras de lixa'. As crianças escutam o fonema, sentem o contorno da letra com os dedinhos e associam de forma ativa.",
      badge: "ALFABETIZAÇÃO ATIVA",
      emoji: "🔤",
      color: "bg-red-100 border-red-300 text-red-800"
    },
    {
      time: "11:30 - 12:30",
      title: "Almoço e Banquete Orgânico",
      desc: "Cardápio 100% balanceado. Estímulo à autonomia onde a própria criança aprende a servir-se, promovendo a coordenação e boas maneiras.",
      badge: "NUTRIÇÃO COMPLETA",
      emoji: "🍎",
      color: "bg-emerald-100 border-emerald-300 text-emerald-800"
    },
    {
      time: "14:00 - 14:45",
      title: "Circuito Neuromotor e Psicomotricidade",
      desc: "Atividades físicas programadas para criar conexões cerebrais de lateralidade e equilíbrio, essenciais para a futura escrita matemática.",
      badge: "ESTÍMULO COGNITIVO",
      emoji: "🧠",
      color: "bg-blue-100 border-blue-300 text-blue-800"
    },
    {
      time: "15:45 - 16:30",
      title: "Imersão em Inglês (Bilingual Hour)",
      desc: "Brincadeiras livres de tradução. O inglês é introduzido de forma contextualizada através de teatro de fantoches, culinária e brincadeiras.",
      badge: "BILINGUISMO FLUIDO",
      emoji: "🌍",
      color: "bg-purple-100 border-purple-300 text-purple-800"
    }
  ];

  const classGroups: ClassGroup[] = [
    {
      id: "maternal-1",
      ageRange: "1 a 2 anos",
      className: "Maternal I (Exploradores)",
      focus: "Estimulação sensorial multissensorial completa, socialização segura e introdução de marcos motores fundamentais.",
      schedule: "Meio Período ou Integral adaptativo",
      activities: ["Musicalização ativa diária", "Oficina sensorial de texturas", "Iniciação ao ritmo fônico por estórias", "Desenvolvimento motor macio"]
    },
    {
      id: "maternal-2",
      ageRange: "2 a 3 anos",
      className: "Maternal II (Descobridores)",
      focus: "Explosão de vocabulário guiado, autonomia e coordenação motora grossa aliada ao método fonético.",
      schedule: "Matutino / Vespertino / Integral",
      activities: ["Associação visual de fonemas", "Circuito de equilíbrio do corpo", "Arte e culinária experimental bilíngue", "Higiene lúdica orientada"]
    },
    {
      id: "jardim-1",
      ageRange: "3 a 4 anos",
      className: "Jardim I (Criadores)",
      focus: "Pré-caligrafia fônica, cultivo de virtudes morais e estruturação completa do pensamento em português e inglês.",
      schedule: "Integral com almoço ou Meio Período",
      activities: ["Traçado de letras na areia colorida", "Roda de valores bíblicos e contos", "Experimentos científicos básicos", "Teatro infantil de virtudes"]
    },
    {
      id: "jardim-2",
      ageRange: "4 a 5 anos",
      className: "Jardim II (Investigadores)",
      focus: "Leitura fonética integrada, lógica matemática de Singapura e oratória expressiva de autoconfiança.",
      schedule: "Matutino / Vespertino / Integral completo",
      activities: ["Construção de palavras com fonemas móveis", "Iniciação ao ábaco e blocos lógicos", "Estudo da natureza no bosque escolar", "Oratória e apresentação de projetos"]
    }
  ];

  useEffect(() => {
    let group = classGroups[0];
    if (childAge === 1) group = classGroups[0];
    else if (childAge === 2) group = classGroups[1];
    else if (childAge === 3) group = classGroups[2];
    else group = classGroups[3];
    setSimulatedClass(group);
  }, [childAge]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !parentPhone || !childName) return;

    let msg = `✨ *SOLICITAÇÃO DE AGENDAMENTO PEDAGÓGICO - COLÉGIO MACKENZIE KIDS* ✨\n\n`;
    msg += `👤 *Responsável:* ${parentName}\n`;
    msg += `📞 *WhatsApp:* ${parentPhone}\n`;
    msg += `👶 *Criança:* ${childName} (${childAge} ${childAge === 1 ? "ano" : "anos"})\n`;
    msg += `🌅 *Período Desejado:* ${selectedPeriod}\n\n`;
    msg += `📝 _Olá! Visitei o portal do Colégio Mackenzie Kids e gostaria de agendar um café de recepção e um tour pelas salas de aula para entender mais sobre o método fônico de alfabetização de vocês._`;

    window.open(`https://wa.me/5515997118125?text=${encodeURIComponent(msg)}`, "_blank");
    setBookingSuccess(true);
    setParentName("");
    setParentPhone("");
    setChildName("");

    setTimeout(() => {
      setBookingSuccess(false);
    }, 5000);
  };

  const faqs = [
    {
      question: "Por que escolher o Método Fônico Mackenzie?",
      answer: "O método fônico ensina as crianças a associarem de forma explícita o som das letras (fonemas) aos seus símbolos visuais (grafemas). Diferente de outros métodos que exigem que a criança decore palavras inteiras, a abordagem fônica fornece as chaves de decodificação da leitura, promovendo uma alfabetização muito mais rápida, profunda e livre de dificuldades de interpretação no Ensino Fundamental."
    },
    {
      question: "Como funciona a alimentação no período integral?",
      answer: "A nutrição é um dos nossos maiores orgulhos. Servimos 4 refeições balanceadas por dia (café da manhã, colação, almoço completo e lanche da tarde). Todo o cardápio é planejado por nossa nutricionista pediátrica, utilizando ingredientes orgânicos, zero açúcar refinado e adaptável a restrições alimentares. Promovemos a educação alimentar também nas aulas de horta e culinária."
    },
    {
      question: "Qual a capacitação dos professores?",
      answer: "100% de nossa equipe pedagógica possui formação superior em Pedagogia, pós-graduação em Educação Infantil ou Neuropsicologia Escolar, além de treinamento certificado e anual fornecido diretamente pelo Sistema Mackenzie de Ensino. Nossas auxiliares de sala também passam por contínua mentoria interna."
    },
    {
      question: "Vocês aceitam matrículas no meio do ano?",
      answer: "Sim! Possuímos um processo personalizado de acolhimento e adaptação para crianças que ingressam no segundo semestre. Nossa psicopedagoga cria um plano de integração suave para que seu filho faça novos amigos e se sinta pertencente ao ambiente de forma alegre e natural desde o primeiro dia."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2A26] antialiased selection:bg-rose-500/10 selection:text-rose-700 font-sans pb-16">
      
      {/* Import custom fonts */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Quicksand:wght@500;600;700&display=swap');
        .font-fredoka { font-family: 'Fredoka', sans-serif; }
        .font-quicksand { font-family: 'Quicksand', sans-serif; }
      `}} />

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#BA2222] py-2 px-4 text-center text-xs text-white font-fredoka tracking-wider flex items-center justify-center gap-3 border-b border-white/10 sticky top-0 z-50 shadow-md">
        <Sparkles className="h-4 w-4 text-amber-200 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Matrículas Abertas para o Segundo Semestre • Método Fônico Mackenzie</span>
        <span className="hidden md:inline">|</span>
        <span className="hidden md:inline font-semibold">Agende um café pedagógico: (15) 99711-8125</span>
      </div>

      {/* DETACHED NEAT HEADER NAVIGATION */}
      <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-amber-900/10 font-fredoka">
        <div className="flex items-center space-x-3 text-left">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white shadow-md font-black text-lg">
            M
          </div>
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-red-700 block leading-tight">Mackenzie Kids</span>
            <span className="text-[10px] text-amber-800 tracking-widest block uppercase font-medium">Pré-Escola Particular</span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-xs text-amber-900/80 font-semibold uppercase tracking-wider">
          <a href="#proposta" className="hover:text-red-700 transition-colors">Proposta</a>
          <a href="#rotina" className="hover:text-red-700 transition-colors">Rotina Escolar</a>
          <a href="#simulador" className="hover:text-red-700 transition-colors">Agrupamentos</a>
          <a href="#visita" className="hover:text-red-700 transition-colors">Tour Guiado</a>
        </div>

        <a 
          href="#visita"
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-full text-xs font-bold tracking-wide transition-all shadow-sm flex items-center space-x-1.5"
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>Fazer Inscrição</span>
        </a>
      </header>

      {/* BACK TO HUB ACCENT OVERLAY */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-3.5 py-2 bg-[#2D2A26] hover:bg-black text-white border border-amber-500/20 rounded-full shadow-2xl text-xs font-fredoka tracking-wide transition-all duration-300 group"
        >
          <ArrowLeft className="h-4 w-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          <span>PORTFÓLIO DE PROJETOS</span>
        </button>
      </div>

      {/* BESPOKE CHILDHOOD STORYBOOK HERO */}
      <section className="relative py-16 lg:py-24 overflow-hidden" id="proposta">
        
        {/* Subtle decorative grid and playful circles */}
        <div className="absolute top-1/4 left-5 h-20 w-20 rounded-full bg-red-100 blur-2xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-amber-100 blur-3xl opacity-60 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Warm, cozy typography & hand-drawn accent lines */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 font-fredoka text-xs tracking-wide">
              <Award className="h-4 w-4 text-red-600" />
              <span>O Rigor Mackenzie Unido ao Acolhimento Maternal</span>
            </div>

            <h1 className="font-fredoka text-4xl sm:text-5xl lg:text-6xl font-black text-[#2D2A26] tracking-tight leading-[1.05]">
              Alfabetização rápida, <span className="text-red-600 underline decoration-amber-400 decoration-wavy decoration-3">valores para a vida</span> toda.
            </h1>

            <p className="font-quicksand text-base sm:text-lg text-amber-950/70 font-semibold leading-relaxed max-w-xl">
              Nossa pré-escola particular oferece uma atmosfera calorosa onde cada detalhe estimula a curiosidade natural das crianças. Através do método fônico Mackenzie, guiamos seu filho ao topo acadêmico com amor.
            </p>

            {/* Playful block badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl text-left space-y-1 transform rotate-[-1deg] hover:rotate-0 transition-transform">
                <span className="text-2xl">🔤</span>
                <h3 className="font-fredoka text-xs font-bold text-amber-900">Método Fônico</h3>
                <p className="font-quicksand text-[11px] text-amber-800 leading-normal">Alfabetização natural sem pular etapas cognitivas.</p>
              </div>

              <div className="bg-red-50/70 border border-red-200 p-4 rounded-2xl text-left space-y-1 transform rotate-[1deg] hover:rotate-0 transition-transform">
                <span className="text-2xl">🛡️</span>
                <h3 className="font-fredoka text-xs font-bold text-red-900">Educação com Princípios</h3>
                <p className="font-quicksand text-[11px] text-red-800 leading-normal">Caráter, generosidade e virtudes familiares diárias.</p>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl text-left space-y-1 transform rotate-[-1deg] hover:rotate-0 transition-transform">
                <span className="text-2xl">🌿</span>
                <h3 className="font-fredoka text-xs font-bold text-emerald-900">Alimentação Saudável</h3>
                <p className="font-quicksand text-[11px] text-emerald-800 leading-normal">4 refeições orgânicas elaboradas por nutricionista.</p>
              </div>
            </div>

            {/* Action Group */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#visita"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#BA2222] hover:bg-red-700 text-white font-fredoka text-sm font-bold tracking-wide transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
              >
                <Calendar className="h-4.5 w-4.5" />
                <span>Agendar Café Pedagógico</span>
              </a>

              <a
                href="#rotina"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl border-2 border-amber-950/20 bg-white hover:bg-amber-50/40 text-amber-950 font-fredoka text-sm font-bold tracking-wide transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Descobrir a Rotina Diária</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

          </div>

          {/* Right Block: Colorful asymmetric Picture Frame with mascot */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative max-w-sm w-full">
              
              {/* Wooden drawing board border mockup styling */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-200 to-amber-300 rounded-[2.5rem] rotate-2 shadow-xl pointer-events-none" />
              
              <div className="relative bg-[#FCFAF5] border-4 border-amber-900/10 rounded-[2.5rem] p-5 shadow-2xl space-y-4">
                <div className="relative overflow-hidden rounded-[2rem] border border-amber-900/15">
                  <img 
                    src={classroomImg} 
                    alt="Sala de Aula Escola Mackenzie Kids" 
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-left">
                    <span className="font-fredoka text-[10px] text-amber-300 uppercase tracking-widest block font-bold">NOSSA ESTRUTURA</span>
                    <h3 className="font-fredoka text-sm font-bold text-white">Ambientes Afetivos de Aprendizado</h3>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-left">
                  <img 
                    src={mascotImg} 
                    alt="Mascote Corujinha" 
                    className="h-11 w-11 object-contain shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="font-fredoka text-[10px] font-bold text-red-700 uppercase tracking-wider block">Mascote Corujinha</span>
                    <p className="font-quicksand text-xs text-amber-900 font-semibold leading-relaxed">
                      "Letras ganham vida com sons engraçados e circuitos de brincadeiras!"
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* DYNAMIC SCROLLING BADGES (STATS) */}
      <section className="py-12 bg-amber-900/5 border-y border-amber-900/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          
          <div className="p-4 rounded-2xl bg-white border border-amber-900/5 shadow-sm space-y-1">
            <p className="font-fredoka text-3xl md:text-4xl font-extrabold text-[#BA2222]">
              <Counter value={100} suffix="%" />
            </p>
            <p className="font-quicksand text-xs tracking-wide text-amber-900 font-bold uppercase">Alfabetização Fluida</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-900/5 shadow-sm space-y-1">
            <p className="font-fredoka text-3xl md:text-4xl font-extrabold text-[#BA2222]">
              <Counter value={15} prefix="Até " suffix=" Alunos" />
            </p>
            <p className="font-quicksand text-xs tracking-wide text-amber-900 font-bold uppercase">por Sala de Aula</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-900/5 shadow-sm space-y-1">
            <p className="font-fredoka text-3xl md:text-4xl font-extrabold text-[#BA2222]">
              <Counter value={4} suffix=" Refeições" />
            </p>
            <p className="font-quicksand text-xs tracking-wide text-amber-900 font-bold uppercase">Orgânicas Inclusas</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-900/5 shadow-sm space-y-1">
            <p className="font-fredoka text-3xl md:text-4xl font-extrabold text-[#BA2222]">
              <Counter value={22} suffix=" Anos" />
            </p>
            <p className="font-quicksand text-xs tracking-wide text-amber-900 font-bold uppercase">Tradição de Ensino</p>
          </div>

        </div>
      </section>

      {/* THE INTERACTIVE SCHOOL DAY TIMELINE - BESPOKE REPLACEMENT FOR PLAIN TABS */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12" id="rotina">
        
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="font-fredoka text-xs text-[#BA2222] font-bold uppercase tracking-[0.2em] block">
            ⭐ HISTÓRIAS DO DIA A DIA
          </span>
          <h2 className="font-fredoka text-3xl md:text-4xl font-black text-slate-900">
            A Rotina Criativa do Seu Filho
          </h2>
          <p className="font-quicksand text-sm sm:text-base text-amber-950/70 font-semibold leading-relaxed">
            Aqui, cada hora é preenchida por estímulos que instigam e educam. Selecione os períodos abaixo para visualizar o desenvolvimento prático do método Mackenzie na vida do seu filho:
          </p>
        </div>

        {/* Visual Interactive Time blocks layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Hour Selector Buttons on Left */}
          <div className="lg:col-span-5 flex flex-col space-y-3 justify-center">
            {dailyTimeline.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveHour(idx)}
                className={`w-full p-4.5 rounded-2xl border text-left transition-all duration-300 font-fredoka flex items-center space-x-4 cursor-pointer hover:translate-x-1 ${
                  activeHour === idx
                    ? "bg-[#BA2222] border-[#BA2222] text-white shadow-lg"
                    : "bg-white border-amber-900/10 text-amber-900 hover:bg-amber-50/50 hover:border-amber-900/20"
                }`}
              >
                <span className={`text-2xl p-2 rounded-xl shrink-0 ${activeHour === idx ? "bg-white/20" : "bg-amber-50"}`}>
                  {item.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <span className={`text-[10px] tracking-wider block font-bold ${activeHour === idx ? "text-amber-200" : "text-amber-700"}`}>
                    {item.time}
                  </span>
                  <span className="text-xs sm:text-sm font-bold truncate block">{item.title}</span>
                </div>
                <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${activeHour === idx ? "translate-x-1" : "opacity-30"}`} />
              </button>
            ))}
          </div>

          {/* Interactive Showcase Sandbox Board on Right */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {dailyTimeline.map((item, idx) => {
                if (idx !== activeHour) return null;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-white border-2 border-amber-900/15 rounded-[2.5rem] p-8 sm:p-10 shadow-xl flex flex-col justify-between text-left relative overflow-hidden"
                  >
                    {/* Tiny visual classroom board lines overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(#BA2222_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.03] pointer-events-none" />
                    
                    <div className="space-y-6 relative z-10">
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-fredoka font-bold uppercase tracking-wider ${item.color}`}>
                          {item.badge}
                        </span>
                        <span className="font-fredoka text-xs text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-lg">
                          ⏰ {item.time}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-fredoka text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                          <span className="text-3xl">{item.emoji}</span>
                          {item.title}
                        </h3>
                        <p className="font-quicksand text-sm text-amber-950/75 leading-relaxed font-semibold">
                          {item.desc}
                        </p>
                      </div>

                      {/* Interactive sandbox bullet-box */}
                      <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-amber-900/5 space-y-3">
                        <span className="font-fredoka text-[10px] tracking-wider text-amber-800 uppercase block font-bold">COMO ESSA ATIVIDADE DESENVOLVE SEU FILHO:</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-amber-950/70 font-semibold">
                          <div className="flex items-start space-x-2">
                            <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>Amplia em até 3x a retenção e o foco cognitivo.</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>Estimula a autonomia e a liderança infantil.</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>Ensina empatia e partilha de forma lúdica.</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>Consolida o vocabulário em ambiente de imersão.</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="pt-6 mt-6 border-t border-amber-900/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                      <div className="flex items-center space-x-3 text-left">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                          <Coffee className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <span className="font-fredoka text-[10px] text-amber-800 uppercase block font-bold">VISITA DIÁRIA</span>
                          <span className="font-quicksand text-[11px] text-amber-950/60 font-semibold block">Fale com os professores</span>
                        </div>
                      </div>

                      <a
                        href="#visita"
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-fredoka text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md"
                      >
                        Ver instalações pessoalmente
                      </a>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>

      </section>

      {/* THE INTERACTIVE SCHOOL BUS "AGE SELECTOR" SIMULATOR */}
      <section className="py-20 bg-amber-500/10 border-y border-amber-500/15" id="simulador">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          {/* School Bus Graphic and controls */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-fredoka text-xs text-[#BA2222] font-bold uppercase tracking-[0.2em] block">
              🚌 INTERAÇÃO COGNITIVA
            </span>
            <h3 className="font-fredoka text-3xl font-black text-[#2D2A26] tracking-tight leading-tight">
              O Ônibus Escolar das Idades
            </h3>
            <p className="font-quicksand text-sm text-amber-950/70 font-semibold leading-relaxed">
              Desenvolvemos materiais exclusivos do Sistema Mackenzie desenhados sob medida para cada fase neurológica. Clique em um dos assentos do ônibus de idades abaixo para visualizar a turma e metas de aprendizagem do seu filho:
            </p>

            {/* School Bus Seat Grid Selector */}
            <div className="relative p-6 bg-amber-400 border-4 border-amber-500 rounded-3xl shadow-xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-amber-500 pb-3 mb-2">
                <span className="font-fredoka text-sm text-amber-950 font-bold flex items-center gap-1">
                  🚥 CLIQUE NA IDADE DE INTERESSE:
                </span>
                <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Grid representation of School Bus Seat windows */}
              <div className="grid grid-cols-5 gap-3.5">
                {[1, 2, 3, 4, 5].map((age) => (
                  <button
                    key={age}
                    onClick={() => setChildAge(age)}
                    className={`relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                      childAge === age
                        ? "bg-[#BA2222] border-white text-white scale-110 shadow-lg"
                        : "bg-white border-amber-500 hover:border-red-600 hover:bg-amber-50 text-amber-950"
                    }`}
                  >
                    <span className="font-fredoka text-lg font-black">{age}</span>
                    <span className="font-quicksand text-[8px] font-bold uppercase tracking-wider">{age === 1 ? "Ano" : "Anos"}</span>
                    {childAge === age && (
                      <span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full bg-yellow-400 border border-white flex items-center justify-center text-[8px] text-yellow-900 font-bold">✓</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Fun bus decoration wheel caps */}
              <div className="flex justify-around pt-3">
                <div className="h-6 w-6 rounded-full bg-slate-800 border-4 border-slate-500" />
                <div className="h-6 w-6 rounded-full bg-slate-800 border-4 border-slate-500" />
              </div>

            </div>
          </div>

          {/* Curriculum card resembling a cozy Blackboard */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              {simulatedClass && (
                <motion.div
                  key={simulatedClass.id}
                  initial={{ opacity: 0, rotateY: 30, x: 20 }}
                  animate={{ opacity: 1, rotateY: 0, x: 0 }}
                  exit={{ opacity: 0, rotateY: -30, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#212E27] text-white rounded-[2rem] p-8 shadow-2xl space-y-6 relative border-8 border-amber-950/20"
                >
                  {/* Wood chalk texture overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />
                  
                  <div className="flex justify-between items-start border-b border-white/10 pb-4">
                    <div>
                      <span className="font-fredoka text-[10px] text-amber-400 font-black uppercase tracking-widest block">AGRUPAMENTO PEDAGÓGICO</span>
                      <h4 className="font-fredoka text-xl sm:text-2xl font-black text-[#FFE6AD]">{simulatedClass.className}</h4>
                    </div>
                    <span className="font-fredoka text-xs text-emerald-900 bg-amber-200 px-3 py-1.5 rounded-full font-bold">
                      🧒 {simulatedClass.ageRange}
                    </span>
                  </div>

                  <div className="space-y-2 text-left">
                    <span className="font-fredoka text-[10px] text-white/40 uppercase block font-bold">Meta de Desenvolvimento Mackenzie:</span>
                    <p className="font-quicksand text-sm text-white/90 leading-relaxed font-semibold">
                      {simulatedClass.focus}
                    </p>
                  </div>

                  <div className="space-y-3 text-left">
                    <span className="font-fredoka text-[10px] text-white/40 uppercase block font-bold">Grade de Estímulos e Brincadeiras:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {simulatedClass.activities.map((act, index) => (
                        <div key={index} className="flex items-center space-x-2 text-white/95 font-medium font-quicksand">
                          <Check className="h-4 w-4 text-amber-400 shrink-0" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                    <div>
                      <span className="font-fredoka text-[9px] text-white/40 block font-bold">Modalidades letivas</span>
                      <span className="font-quicksand text-xs text-white/80 font-bold block">{simulatedClass.schedule}</span>
                    </div>

                    <a
                      href="#visita"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-fredoka text-xs font-bold uppercase tracking-wider text-center transition-all cursor-pointer shadow-md"
                    >
                      Reservar Vaga na Turma
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* STACKED "WOODEN TOY BLOCKS" - BENTO FOR VIRTUES & SCIENCE */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="font-fredoka text-xs text-red-600 font-bold uppercase tracking-[0.2em] block">
            🧸 BRINQUEDOTECA DO CONHECIMENTO
          </span>
          <h2 className="font-fredoka text-3xl md:text-4xl font-black text-slate-900">
            Estações Metodológicas do Saber
          </h2>
          <p className="font-quicksand text-sm sm:text-base text-amber-950/70 font-semibold leading-relaxed">
            Nossa escola divide os aprendizados em quatro grandes blocos que instigam as descobertas naturais:
          </p>
        </div>

        {/* Playful Stacked Blocks Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
          
          <div className="md:col-span-7 bg-[#FFFBF0] border-2 border-amber-900/10 p-8 rounded-[2rem] shadow-sm flex flex-col justify-between space-y-6 hover:border-[#BA2222]/30 transition-all">
            <div className="space-y-3">
              <span className="text-3xl p-2.5 bg-amber-100 rounded-xl inline-block">🔤</span>
              <h3 className="font-fredoka text-xl font-bold text-amber-950">Estação de Linguagem & Consciência Fônica</h3>
              <p className="font-quicksand text-sm text-amber-900 font-medium leading-relaxed">
                As crianças não decodificam de forma robótica. Usamos músicas divertidas, jogos corporais com letras e o material tátil para incentivar a paixão pelas palavras espontaneamente, tornando a leitura prazerosa.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 bg-amber-50 text-amber-800 text-[10px] font-fredoka font-bold uppercase rounded-lg">Estímulo Fônico</span>
              <span className="px-3 py-1 bg-amber-50 text-amber-800 text-[10px] font-fredoka font-bold uppercase rounded-lg">Sons e Rimas</span>
            </div>
          </div>

          <div className="md:col-span-5 bg-red-50/70 border-2 border-red-900/10 p-8 rounded-[2rem] shadow-sm flex flex-col justify-between space-y-6 hover:border-red-600/30 transition-all">
            <div className="space-y-3">
              <span className="text-3xl p-2.5 bg-red-100 rounded-xl inline-block">🛡️</span>
              <h3 className="font-fredoka text-xl font-bold text-red-950">Estação de Virtudes e Caráter</h3>
              <p className="font-quicksand text-sm text-red-900 font-medium leading-relaxed">
                Cada semana exploramos uma virtude prática: respeito, partilha, auto-governo e consideração social. Moldamos líderes autênticos preparados para a comunidade familiar.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 bg-red-50 text-red-800 text-[10px] font-fredoka font-bold uppercase rounded-lg">Ética Prática</span>
              <span className="px-3 py-1 bg-red-50 text-red-800 text-[10px] font-fredoka font-bold uppercase rounded-lg">Vida Compartilhada</span>
            </div>
          </div>

          <div className="md:col-span-5 bg-emerald-50/70 border-2 border-emerald-900/10 p-8 rounded-[2rem] shadow-sm flex flex-col justify-between space-y-6 hover:border-emerald-600/30 transition-all">
            <div className="space-y-3">
              <span className="text-3xl p-2.5 bg-emerald-100 rounded-xl inline-block">🌿</span>
              <h3 className="font-fredoka text-xl font-bold text-emerald-950">Estação Natureza & Horta Pedagógica</h3>
              <p className="font-quicksand text-sm text-emerald-900 font-medium leading-relaxed">
                As crianças plantam, cuidam, colhem e degustam hortaliças frescas. A ciência e a ecologia são vividas ativamente debaixo das árvores e no bosque de exploração do nosso colégio.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-fredoka font-bold uppercase rounded-lg">Horta Orgânica</span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-fredoka font-bold uppercase rounded-lg">Pequeno Cientista</span>
            </div>
          </div>

          <div className="md:col-span-7 bg-[#FFFBF0] border-2 border-amber-900/10 p-8 rounded-[2rem] shadow-sm flex flex-col justify-between space-y-6 hover:border-[#BA2222]/30 transition-all">
            <div className="space-y-3">
              <span className="text-3xl p-2.5 bg-amber-100 rounded-xl inline-block">🧠</span>
              <h3 className="font-fredoka text-xl font-bold text-amber-950">Estação de Psicomotricidade & Raciocínio de Singapura</h3>
              <p className="font-quicksand text-sm text-amber-900 font-medium leading-relaxed">
                Preparação espacial lógica! Através do manuseio de blocos lógicos 3D de madeira e circuitos desenhados, estabelecemos as conexões neurológicas necessárias para equações matemáticas futuras e a caligrafia precisa.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 bg-amber-50 text-amber-800 text-[10px] font-fredoka font-bold uppercase rounded-lg">Lógica Singapura</span>
              <span className="px-3 py-1 bg-amber-50 text-amber-800 text-[10px] font-fredoka font-bold uppercase rounded-lg">Circuitos Motores</span>
            </div>
          </div>

        </div>
      </section>

      {/* THE SPIRAL-NOTEBOOK VISITATION FORM */}
      <section className="py-24 bg-[#FAF6EE] text-left" id="visita">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-fredoka text-xs text-[#BA2222] font-bold uppercase tracking-[0.2em] block">
                ☕ COORDENAÇÃO DE MATRÍCULAS
              </span>
              <h3 className="font-fredoka text-3xl font-black text-slate-900 leading-tight">
                Venha Tomar um Café Pedagógico
              </h3>
              <p className="font-quicksand text-sm text-amber-950/70 font-semibold leading-relaxed">
                Não tomamos decisões tão sérias apenas olhando uma tela de computador. Agende uma visita guiada particular de 45 minutos pela nossa escola de braços abertos.
              </p>

              <div className="space-y-4 pt-4 border-t border-amber-900/10">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-[#BA2222]/10 rounded-xl text-[#BA2222] shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-fredoka text-xs font-bold text-slate-900">Café de Boas-Vindas</h5>
                    <p className="font-quicksand text-[11px] text-amber-950/60 font-semibold">Tire suas dúvidas pedagógicas diretamente com a nossa diretora geral regado a pães de queijo fresquinhos.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-[#BA2222]/10 rounded-xl text-[#BA2222] shrink-0">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h5 className="font-fredoka text-xs font-bold text-slate-900">Análise de marcos de desenvolvimento</h5>
                    <p className="font-quicksand text-[11px] text-amber-950/60 font-semibold">Realizamos no dia um mini-diagnóstico fonoaudiólogo de marcos fonéticos e psicomotores gratuitamente.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Spiral Notebook Mockup Form Card */}
            <div className="lg:col-span-7 bg-white border-2 border-amber-900/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              
              {/* Spiral binding rings simulation on left edge */}
              <div className="absolute top-0 bottom-0 left-2 w-1 flex flex-col justify-around py-6 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="h-2 w-5 bg-gradient-to-r from-slate-300 to-slate-400 rounded-full border border-slate-400/30 shadow-sm" />
                ))}
              </div>

              {/* Pad Notebook lined paper decoration background overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none pl-8" />
              
              <div className="relative pl-6 space-y-6">
                
                <h4 className="font-fredoka text-lg font-bold text-slate-900 border-b border-dashed border-amber-900/15 pb-4">
                  Caderno de Agendamento Mackenzie Kids
                </h4>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label className="font-fredoka text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Responsável *</label>
                      <input 
                        type="text" 
                        required
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="Amanda Albuquerque"
                        className="w-full bg-[#FAF6EE]/50 border border-amber-950/15 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 focus:outline-none focus:border-red-500 focus:bg-white transition-all font-semibold font-quicksand"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="font-fredoka text-[10px] text-slate-400 uppercase tracking-widest block font-bold">WhatsApp *</label>
                      <input 
                        type="tel" 
                        required
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        placeholder="(15) 99711-8125"
                        className="w-full bg-[#FAF6EE]/50 border border-amber-950/15 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 focus:outline-none focus:border-red-500 focus:bg-white transition-all font-semibold font-quicksand"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label className="font-fredoka text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Nome da Criança *</label>
                      <input 
                        type="text" 
                        required
                        value={childName}
                        onChange={(e) => setChildName(e.target.value)}
                        placeholder="Arthur Albuquerque"
                        className="w-full bg-[#FAF6EE]/50 border border-amber-950/15 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 focus:outline-none focus:border-red-500 focus:bg-white transition-all font-semibold font-quicksand"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="font-fredoka text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Idade Escolar *</label>
                      <select
                        value={childAge}
                        onChange={(e) => setChildAge(parseInt(e.target.value))}
                        className="w-full bg-[#FAF6EE]/50 border border-amber-950/15 rounded-xl py-2.5 px-3 text-xs text-slate-800 focus:outline-none focus:border-red-500 focus:bg-white transition-all font-semibold font-quicksand"
                      >
                        <option value="1">1 Ano completo</option>
                        <option value="2">2 Anos completos</option>
                        <option value="3">3 Anos completos</option>
                        <option value="4">4 Anos completos</option>
                        <option value="5">5 Anos completos</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="font-fredoka text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Turno Desejado *</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Matutino", "Vespertino", "Integral"].map((period) => (
                        <button
                          type="button"
                          key={period}
                          onClick={() => setSelectedPeriod(period)}
                          className={`py-2 px-3 rounded-xl border font-fredoka text-[10px] font-bold uppercase tracking-wider text-center transition-all cursor-pointer ${
                            selectedPeriod === period
                              ? "bg-red-500/15 border-red-500 text-red-700"
                              : "bg-[#FAF6EE]/50 border-amber-950/15 text-slate-400 hover:border-slate-300"
                          }`}
                        >
                          {period === "Matutino" && "🌅 Matutino"}
                          {period === "Vespertino" && "☀️ Vespertino"}
                          {period === "Integral" && "👑 Integral"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-fredoka text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <MessageSquare className="h-4.5 w-4.5 fill-current" />
                      <span>Agendar Visita Pedagógica via WhatsApp</span>
                    </button>
                  </div>

                  {bookingSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-green-50 border border-green-200 rounded-xl text-[11px] text-green-700 font-semibold text-center"
                    >
                      🎉 Encaminhando sua comanda para a nossa secretaria escolar! Por favor envie a mensagem gerada.
                    </motion.div>
                  )}

                  <div className="flex items-center justify-center space-x-2 text-[9px] font-fredoka text-slate-400 uppercase tracking-wider font-semibold pt-1">
                    <ShieldCheck className="h-4 w-4 text-red-500" />
                    <span>Ambiente seguro em conformidade com as leis escolares de privacidade</span>
                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="py-24 max-w-4xl mx-auto px-6 md:px-12 text-left">
        <div className="text-center space-y-4 mb-16">
          <span className="font-fredoka text-xs text-red-600 font-bold uppercase tracking-[0.2em] block">
            💬 DÚVIDAS DOS PAIS E MÃES
          </span>
          <h2 className="font-fredoka text-3xl font-black text-slate-900">
            Perguntas Frequentes
          </h2>
          <p className="font-quicksand text-sm text-slate-500">
            Entenda todos os detalhes sobre a adaptação, rotina fônica e a segurança da escola infantil Mackenzie.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border-2 border-amber-900/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-red-500/20 shadow-sm"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full py-5 px-6 flex items-center justify-between text-left cursor-pointer font-fredoka"
              >
                <span className="text-sm sm:text-base font-bold text-slate-900">{faq.question}</span>
                <span className="text-xs text-red-500 font-bold">
                  {activeFaq === index ? "✕" : "▼"}
                </span>
              </button>

              <AnimatePresence>
                {activeFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-dashed border-amber-900/10"
                  >
                    <div className="p-6 text-slate-600 text-xs sm:text-sm leading-relaxed bg-amber-50/10 font-quicksand font-semibold">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ACCELERATION CALL TO ACTION */}
      <section className="py-20 bg-[#1D1111] text-white overflow-hidden relative rounded-[3rem] mx-6">
        <div className="absolute top-0 right-0 h-64 w-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <span className="font-fredoka text-xs text-red-400 font-bold tracking-[0.3em] uppercase block">
            👑 ATENÇÃO EXCLUSIVA E TURMAS FECHADAS
          </span>
          <h3 className="font-fredoka text-3xl sm:text-4xl font-black max-w-2xl mx-auto leading-tight">
            Ofereça a Melhor Fundação Escolar ao Seu Filho
          </h3>
          <p className="font-quicksand text-xs sm:text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
            Limitamos nossas turmas ao máximo de 15 alunos para que as educadoras ofereçam carinho individual e total atenção pedagógica. Garanta sua visita e matricule seu filho.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="#visita"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-fredoka text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-[1.02]"
            >
              Agendar Visita de Boas-Vindas
            </a>
            
            <button
              onClick={() => {
                const text = "Olá! Gostaria de falar com o plantão de matrículas do Mackenzie Kids.";
                window.open(`https://wa.me/5515997118125?text=${encodeURIComponent(text)}`, "_blank");
              }}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-fredoka text-xs font-bold uppercase tracking-wider transition-all"
            >
              Plantão de Matrículas WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#2D2A26] text-white/50 border-t border-amber-950/15 text-xs text-center mt-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-amber-50/70 text-left">
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white">
              <GraduationCap className="h-6 w-6 text-red-500" />
              <span className="font-fredoka text-base font-bold tracking-tight uppercase">MACKENZIE KIDS</span>
            </div>
            <p className="font-quicksand text-[11px] leading-relaxed">
              Inovação cognitiva com carinho materno. Escola de educação infantil particular sob o autêntico Sistema Mackenzie de Ensino.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-fredoka text-[10px] text-white uppercase tracking-wider font-extrabold">Endereço & Atendimento</h4>
            <p className="font-quicksand text-[11px] leading-relaxed">
              📍 Rua Mackenzie, 250 - Centro, Sorocaba - SP<br />
              📞 (15) 99711-8125 (Matrículas)<br />
              ✉️ contato@mackenziekids.com.br
            </p>
          </div>

          <div className="space-y-2 md:text-right font-quicksand">
            <h4 className="font-fredoka text-[10px] text-white uppercase tracking-wider font-extrabold">Direitos Reservados</h4>
            <p className="text-[11px]">
              © 2026 Colégio Mackenzie Kids. Todos os direitos reservados.<br />
              Desenvolvido sob rigor técnico de excelência com Inteligência Artificial.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
