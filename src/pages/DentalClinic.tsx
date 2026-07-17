import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Sparkles, 
  Calendar, 
  Shield, 
  Star, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Award, 
  Heart, 
  MessageSquare, 
  Stethoscope, 
  Smile, 
  User, 
  Map, 
  Lock, 
  Camera,
  Layers,
  Sparkle
} from "lucide-react";

// Generated image assets
import dentalClinicImg from "../assets/images/dental_clinic_luxury_1784141031013.jpg";
const toothGlowImg = "https://www.imagensanimadas.com/data/media/151/dente-imagem-animada-0013.gif";

interface Specialist {
  name: string;
  role: string;
  crm: string;
  image: string;
  bio: string;
  rating: number;
}

interface Treatment {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  duration: string;
  investment: string;
  icon: string;
}

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
    <span ref={elementRef} className="tabular-nums">
      {prefix}{formatted}{suffix}
    </span>
  );
}

export default function DentalClinic({ onBack }: { onBack?: () => void }) {
  const [activeTreatmentId, setActiveTreatmentId] = useState("invisalign");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [toothInteractionCount, setToothInteractionCount] = useState(0);
  const [showToothChat, setShowToothChat] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const [scanMessage, setScanMessage] = useState("");

  // Booking form states
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("Invisalign");
  const [preferredPeriod, setPreferredPeriod] = useState("Manhã");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Auto-scanning timer message
  useEffect(() => {
    if (isScanned) {
      const messages = [
        "🔍 Iniciando escaneamento digital do seu sorriso...",
        "✨ Higiene e alinhamento sob análise virtual...",
        "💎 Diagnóstico finalizado: Seu dente está pronto para brilhar!",
        "📅 Agende uma consulta para uma profilaxia completa e design personalizado."
      ];
      let current = 0;
      setScanMessage(messages[0]);
      
      const interval = setInterval(() => {
        current++;
        if (current < messages.length) {
          setScanMessage(messages[current]);
        } else {
          clearInterval(interval);
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isScanned]);

  const treatments: Treatment[] = [
    {
      id: "invisalign",
      title: "Invisalign® & Alinhadores Invisíveis",
      description: "A tecnologia de alinhadores mais avançada do mundo para alinhar o seu sorriso de forma rápida, discreta e totalmente confortável, sem o uso de braquetes ou fios metálicos.",
      benefits: [
        "Removível para comer e escovar os dentes",
        "Praticamente invisível, não altera a estética",
        "Resultados visíveis a partir de 3 meses",
        "Menos consultas ao consultório"
      ],
      duration: "6 a 15 meses de tratamento",
      investment: "Planos de parcelamento sob medida",
      icon: "✨"
    },
    {
      id: "implantes",
      title: "Implantes & Reabilitação Oral",
      description: "Recupere a mastigação perfeita e a autoconfiança de sorrir com implantes de titânio de última geração e coroas de cerâmica idênticas aos dentes naturais.",
      benefits: [
        "Estabilidade total para mastigar qualquer alimento",
        "Preserva a estrutura óssea facial",
        "Solução definitiva com altíssima durabilidade",
        "Procedimento indolor com sedação consciente"
      ],
      duration: "3 a 6 meses de cicatrização",
      investment: "Avaliação inicial e tomografia digital inclusas",
      icon: "💎"
    },
    {
      id: "lentes-porcelana",
      title: "Lentes de Contato & Facetas",
      description: "Transforme a cor, formato e alinhamento dos seus dentes em apenas duas sessões com finas lâminas de cerâmica pura ultra-resistentes.",
      benefits: [
        "Aparência natural com brilho e textura realistas",
        "Material resistente a manchas de café e vinho",
        "Mínimo desgaste dos dentes originais",
        "Sorriso de celebridade de forma rápida"
      ],
      duration: "Apenas 2 sessões clínicas",
      investment: "Opções flexíveis de financiamento",
      icon: "🦷"
    },
    {
      id: "clareamento",
      title: "Clareamento Laser & Caseiro",
      description: "Sorriso até 8 tons mais branco com nosso protocolo exclusivo de clareamento monitorado em consultório associado a moldeiras personalizadas para casa.",
      benefits: [
        "Fórmula com dessensibilizante integrado",
        "Brilho imediato na primeira aplicação",
        "Laser de alta potência para acelerar o processo",
        "Kit caseiro premium incluso para manutenção"
      ],
      duration: "1 a 3 semanas",
      investment: "Excelente custo-benefício estético",
      icon: "🌟"
    },
    {
      id: "pediatria",
      title: "Odontopediatria Especializada",
      description: "Atendimento lúdico e humanizado para crianças, garantindo que o cuidado com a saúde bucal seja uma experiência positiva, sem medo ou traumas.",
      benefits: [
        "Ambiente decorado e técnicas de psicologia infantil",
        "Prevenção eficaz de cáries e mordidas erradas",
        "Profissionais ultra-pacientes e carinhosos",
        "Brindes de coragem e interatividade pós-consulta"
      ],
      duration: "Consultas preventivas semestrais",
      investment: "Plano preventivo infantil disponível",
      icon: "👶"
    }
  ];

  const specialists: Specialist[] = [
    {
      name: "Dra. Beatriz Medeiros",
      role: "Especialista em Ortodontia & Invisalign®",
      crm: "CRO-SP 124.593",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
      bio: "Mais de 10 anos de experiência transformando sorrisos com alinhadores invisíveis. Credenciada Invisalign Top Doctor.",
      rating: 5
    },
    {
      name: "Dr. Gustavo Ramos",
      role: "Mestre em Implantodontia & Prótese Dentária",
      crm: "CRO-SP 98.712",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
      bio: "Especialista em cirurgias guiadas sem cortes físicos severos e carga rápida de dentes fixos em cerâmica.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "O consultório aceita planos ou convênios de saúde?",
      answer: "Trabalhamos no modelo de atendimento particular de alta performance e fornecemos toda a documentação necessária, relatórios de tratamento e notas fiscais para que você solicite o reembolso de forma integral ou parcial junto ao seu plano de saúde."
    },
    {
      question: "Como funciona a tecnologia Invisalign?",
      answer: "O Invisalign utiliza um mapeamento 3D digital computadorizado (iTero) da sua boca para simular todos os movimentos dentários necessários antes de começar. A partir disso, uma sequência de alinhadores transparentes sob medida é fabricada, devendo ser trocada a cada 7 a 10 dias até alcançar o alinhamento perfeito planejado pelo ortodontista."
    },
    {
      question: "Sinto muita ansiedade e medo de ir ao dentista. Como vocês podem me ajudar?",
      answer: "Temos um protocolo especial chamado 'Odontologia sem Dor e com Afeto'. Oferecemos opção de sedação consciente com óxido nitroso (gás do riso) ou sedação médica monitorada, além de óculos de realidade virtual para assistir a filmes durante o procedimento, fones de ouvido redutores de ruído e anestesia computadorizada sem agulha."
    },
    {
      question: "Onde o consultório está localizado e possui estacionamento?",
      answer: "Estamos localizados na área mais nobre de São Paulo (Av. Paulista, próximo ao metrô), dentro de um centro médico de alto padrão. Oferecemos serviço gratuito de valet/estacionamento com manobrista para todos os nossos pacientes agendados."
    }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) return;

    let msg = `✨ *NOVO AGENDAMENTO DE CONSULTA - CLÍNICA ORALSENSE* ✨\n\n`;
    msg += `👤 *Paciente:* ${patientName}\n`;
    msg += `📞 *WhatsApp:* ${patientPhone}\n`;
    msg += `🦷 *Tratamento:* ${selectedSpecialty}\n`;
    msg += `📅 *Data Preferencial:* ${appointmentDate || "A combinar"}\n`;
    msg += `🌅 *Período Preferido:* ${preferredPeriod}\n\n`;
    msg += `📝 _Gostaria de agendar a minha consulta inicial para avaliação clínica do meu sorriso. Como faço para confirmar?_`;

    window.open(`https://wa.me/5515997118125?text=${encodeURIComponent(msg)}`, "_blank");
    setBookingSuccess(true);
    setPatientName("");
    setPatientPhone("");
    setAppointmentDate("");
    
    setTimeout(() => {
      setBookingSuccess(false);
    }, 5000);
  };

  const handleInteractiveToothClick = () => {
    setToothInteractionCount(prev => prev + 1);
    setIsScanned(true);
    // Restart animation
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav");
    audio.volume = 0.15;
    audio.play().catch(() => {}); // ignore audio play failures
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased relative selection:bg-teal-500/20 selection:text-teal-700">
      
      {/* Dynamic top bar contact & info */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-700 py-2 px-4 text-center text-[10px] md:text-xs font-mono tracking-wider text-white flex flex-wrap items-center justify-center gap-4 border-b border-white/10 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center space-x-1">
          <Phone className="h-3 w-3 text-cyan-200" />
          <span>Ligue: (15) 99711-8125</span>
        </div>
        <div className="hidden sm:inline">•</div>
        <div className="flex items-center space-x-1">
          <MapPin className="h-3 w-3 text-cyan-200" />
          <span>Av. Paulista, 1000 - Bela Vista, SP</span>
        </div>
        <div className="hidden sm:inline">•</div>
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3 text-cyan-200" />
          <span>Seg a Sex: 08:00 - 20:00</span>
        </div>
      </div>

      {/* Voltar ao Hub Developer overlay */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-3 py-2 bg-slate-900 hover:bg-black text-white border border-slate-700 rounded-lg shadow-2xl text-xs font-mono tracking-wider transition-all duration-300 group hover:border-teal-500/40"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-teal-400 group-hover:-translate-x-1 transition-transform" />
          <span className="text-white/80 group-hover:text-white">VOLTAR AO HUB</span>
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
        </button>
      </div>

      {/* STUNNING ANIMATED PERSISTENT TOOTH BOT ASSISTANT (PNG de Dente Animado) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
        
        {/* Floating Bubble Assistente Dente */}
        <AnimatePresence>
          {showToothChat && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-5 max-w-xs w-72 text-left space-y-3 relative overflow-hidden"
            >
              {/* Background gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500" />
              <button 
                onClick={() => setShowToothChat(false)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>

              <div className="flex items-center space-x-2.5">
                <div className="h-7 w-7 rounded-full bg-teal-50 overflow-hidden border border-teal-200">
                  <img src={toothGlowImg} alt="Dente Bot" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-sans text-xs font-extrabold text-slate-900 flex items-center gap-1">
                    Dentinho Assistente <Sparkle className="h-3 w-3 text-teal-500 fill-teal-500" />
                  </h4>
                  <span className="font-mono text-[9px] text-green-500 font-bold uppercase tracking-wider block">Estou online!</span>
                </div>
              </div>

              <p className="font-sans text-[11px] text-slate-600 leading-relaxed">
                Olá! Sou o mascote interativo da clínica OralSense. Gostaria de dar um brilho no seu sorriso hoje?
              </p>

              <div className="space-y-1.5">
                <button
                  onClick={() => {
                    const text = "Olá! Gostaria de falar com a recepção da OralSense para agendar uma consulta.";
                    window.open(`https://wa.me/5515997118125?text=${encodeURIComponent(text)}`, "_blank");
                  }}
                  className="w-full py-2 px-3 bg-teal-500 hover:bg-teal-600 text-white font-sans text-[11px] font-bold rounded-lg flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
                >
                  <MessageSquare className="h-3.5 w-3.5 fill-current" />
                  <span>Falar com Secretária</span>
                </button>
                <button
                  onClick={handleInteractiveToothClick}
                  className="w-full py-1.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-sans text-[10px] font-semibold rounded-lg flex items-center justify-center space-x-1"
                >
                  <Sparkles className="h-3 w-3 text-teal-500" />
                  <span>Ativar Raio-X Digital</span>
                </button>
              </div>

              {isScanned && (
                <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-100 text-[10px] font-mono text-teal-800 leading-relaxed">
                  {scanMessage}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating 3D Tooth PNG/Image itself - heavily animated */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.15, rotate: 10 }}
          whileTap={{ scale: 0.9, rotate: -10 }}
          onClick={() => {
            setShowToothChat(true);
            handleInteractiveToothClick();
          }}
          className="h-16 w-16 rounded-full bg-white shadow-[0_10px_35px_rgba(20,184,166,0.35)] border-2 border-teal-400/50 flex items-center justify-center cursor-pointer relative group overflow-hidden"
        >
          {/* Wave ripple background */}
          <span className="absolute inset-0 bg-gradient-to-tr from-teal-50 to-cyan-50 opacity-40 group-hover:scale-110 transition-transform duration-500" />
          
          <img 
            src={toothGlowImg} 
            alt="Dente Animado" 
            className="h-12 w-12 object-contain relative z-10 filter drop-shadow-md"
            referrerPolicy="no-referrer"
          />

          {/* Interactive badge indicators */}
          {toothInteractionCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-teal-500 text-white font-mono text-[9px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow animate-bounce">
              {toothInteractionCount}
            </span>
          )}

          {/* Radar effect */}
          <span className="absolute inset-0 rounded-full border border-teal-400 animate-ping opacity-25 pointer-events-none" />
        </motion.div>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-gradient-to-b from-teal-50 via-white to-slate-50 border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(20,184,166,0.06),transparent_60%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-teal-500/10 border border-teal-500/20 text-teal-700 font-mono text-[10px] uppercase tracking-wider font-extrabold">
              <Award className="h-3.5 w-3.5 text-teal-600 animate-pulse" />
              <span>TECNOLOGIA ALEMÃ & MATERIAIS NOBRES</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
              O Sorriso que Você Sempre <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">Sonhou em Ter</span>.
            </h2>

            <p className="font-sans text-sm sm:text-base md:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
              Nossa clínica integra inteligência digital, escaneamento intraoral computadorizado e materiais premium de altíssima durabilidade para desenhar o seu sorriso ideal de forma rápida e totalmente indolor.
            </p>

            {/* Quick value props list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-center space-x-2.5 text-xs text-slate-600">
                <Check className="h-4.5 w-4.5 text-teal-500 shrink-0" />
                <span>Escaneamento iTero 3D Sem Moldes</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-slate-600">
                <Check className="h-4.5 w-4.5 text-teal-500 shrink-0" />
                <span>Tratamento sem dor e sem agulhas</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-slate-600">
                <Check className="h-4.5 w-4.5 text-teal-500 shrink-0" />
                <span>Invisalign Top Doctor Especialistas</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-slate-600">
                <Check className="h-4.5 w-4.5 text-teal-500 shrink-0" />
                <span>Sedação Consciente de Última Geração</span>
              </div>
            </div>

            {/* CTA action group */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#agendamento"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-sans text-xs font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2.5 shadow-[0_10px_25px_rgba(20,184,166,0.2)] cursor-pointer"
              >
                <Calendar className="h-4.5 w-4.5" />
                <span>Agendar Minha Consulta</span>
              </a>

              <button
                onClick={() => setShowToothChat(true)}
                className="w-full sm:w-auto px-6 py-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Diagnóstico Interativo</span>
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
              <div className="flex items-center space-x-1">
                <Shield className="h-3.5 w-3.5 text-teal-500" />
                <span>Biossegurança Nível Hospitalar</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-3.5 w-3.5 text-teal-500 fill-teal-500" />
                <span>Mais de 3.500 Vidas Transformadas</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-3.5 w-3.5 text-teal-500 fill-teal-500" />
                <span>Nota 4.9/5 estrelas no Google</span>
              </div>
            </div>

          </div>

          {/* Right: Beautiful minimalist animated tooth card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-sm w-full">
              {/* Backlight glowing aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl blur-2xl opacity-15 animate-pulse" />
              
              <div className="relative bg-white border border-slate-100 rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-center min-h-[350px]">
                {/* Clean, spacious card design containing just the floating GIF */}
                <motion.div 
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-full flex items-center justify-center p-4"
                >
                  <img 
                    src={toothGlowImg} 
                    alt="Mascote Dente Animado" 
                    className="h-64 w-64 object-contain filter drop-shadow-lg"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                
                {/* Elegant subtle greeting caption beneath */}
                <div className="text-center mt-2">
                  <span className="font-sans text-[11px] font-extrabold text-teal-600 uppercase tracking-wider block">
                    OralSense Premium
                  </span>
                  <p className="font-serif text-sm font-bold text-slate-800 mt-1">
                    Seu Sorriso Desenhado de Forma Única
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* REVOLUTIONARY NUMBERS / STATS */}
      <section className="py-16 bg-[#131B24] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <p className="font-serif text-3xl md:text-4xl font-black text-teal-400">
              <Counter value={15000} prefix="+" decimals={0} />
            </p>
            <p className="font-mono text-[10px] tracking-wider text-slate-400 uppercase font-bold">Sorrisos Alinhados</p>
          </div>
          <div className="space-y-1">
            <p className="font-serif text-3xl md:text-4xl font-black text-teal-400">
              <Counter value={12} prefix="+" suffix=" Anos" />
            </p>
            <p className="font-mono text-[10px] tracking-wider text-slate-400 uppercase font-bold">Desenvolvendo a Estética</p>
          </div>
          <div className="space-y-1">
            <p className="font-serif text-3xl md:text-4xl font-black text-teal-400">
              <Counter value={99.8} suffix="%" decimals={1} />
            </p>
            <p className="font-mono text-[10px] tracking-wider text-slate-400 uppercase font-bold">Pacientes Satisfeitos</p>
          </div>
          <div className="space-y-1">
            <p className="font-serif text-3xl md:text-4xl font-black text-teal-400">
              <Counter value={100} suffix="%" />
            </p>
            <p className="font-mono text-[10px] tracking-wider text-slate-400 uppercase font-bold">Sedação Segura sem Medo</p>
          </div>
        </div>
      </section>

      {/* TREATMENTS TABS & INTERACTIVE DEMONSTRATOR */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 border-b border-slate-200">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-teal-600 font-extrabold uppercase tracking-[0.2em] block">
            // NOSSAS ESPECIALIDADES
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Tratamentos Planejados para Sua Saúde e Estética Bucal
          </h3>
          <p className="font-sans text-sm text-slate-500 leading-relaxed">
            Selecione uma categoria abaixo e conheça em detalhes nossa metodologia, prazos e os benefícios clínicos que preparamos para você.
          </p>
        </div>

        {/* Horizontal scroll tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 justify-start md:justify-center scrollbar-none">
          {treatments.map((tr) => (
            <button
              key={tr.id}
              onClick={() => setActiveTreatmentId(tr.id)}
              className={`py-3 px-5 rounded-xl font-mono text-[11px] font-extrabold uppercase tracking-widest border transition-all cursor-pointer whitespace-nowrap ${
                activeTreatmentId === tr.id
                  ? "bg-teal-500 text-white border-teal-500 shadow-md"
                  : "bg-white text-slate-500 border-slate-200 hover:border-teal-500/30 hover:text-slate-900"
              }`}
            >
              <span className="mr-1.5">{tr.icon}</span>
              {tr.title.split("&")[0].trim()}
            </button>
          ))}
        </div>

        {/* Interactive card detailing the selected treatment */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 text-left shadow-lg">
          <AnimatePresence mode="wait">
            {treatments.filter(t => t.id === activeTreatmentId).map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                
                {/* Information */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-teal-600 font-extrabold tracking-widest uppercase block">CONCEITO EXCLUSIVO</span>
                    <h4 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">{item.title}</h4>
                    <p className="font-sans text-sm text-slate-500 leading-relaxed">{item.description}</p>
                  </div>

                  {/* Benefits check list */}
                  <div className="space-y-3">
                    <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest font-extrabold">Por que escolher este tratamento?</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {item.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-600 leading-snug">
                          <Check className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing/Duration metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div>
                      <span className="font-mono text-[9px] text-slate-400 uppercase block font-bold">Duração Estimada</span>
                      <span className="font-sans text-xs text-slate-700 font-bold">{item.duration}</span>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-slate-400 uppercase block font-bold">Investimento de Valor</span>
                      <span className="font-sans text-xs text-slate-700 font-bold">{item.investment}</span>
                    </div>
                  </div>
                </div>

                {/* Static illustration or diagnostic preview panel */}
                <div className="lg:col-span-5 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-slate-200 space-y-4 self-stretch flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-3xl">{item.icon}</span>
                    <h5 className="font-serif text-sm font-bold text-slate-900">Mapeamento Clínico Digital</h5>
                    <p className="font-sans text-xs text-slate-500 leading-relaxed">
                      Utilizamos o scanner digital intraoral iTero Element 5D para gerar um modelo 3D perfeito do seu sorriso, dispensando aquelas massas de moldagem desconfortáveis de consultórios tradicionais.
                    </p>
                  </div>

                  <a
                    href="#agendamento"
                    className="w-full py-3.5 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-sans text-xs font-bold uppercase tracking-wider text-center transition-all shadow-md block"
                  >
                    Agendar para este tratamento
                  </a>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ENVIRONMENT CLINIC SHOWCASE */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center text-left">
          
          {/* Photo */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/20 to-transparent rounded-2xl blur-lg opacity-40" />
            <img 
              src={dentalClinicImg} 
              alt="Consultório Odontológico OralSense" 
              className="rounded-xl border border-slate-200 max-w-sm w-full h-auto object-cover shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Copy info */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs text-teal-600 font-bold uppercase tracking-[0.2em] block">
              // EXPERIÊNCIA E INFRAESTRUTURA
            </span>
            <h3 className="font-serif text-3xl font-extrabold tracking-tight text-slate-900">
              Um Ambiente Exclusivo Focado no Seu Bem-estar
            </h3>
            <p className="font-sans text-sm text-slate-500 leading-relaxed">
              Esqueça aquela atmosfera fria e assustadora de hospitais e dentistas antigos. Na OralSense, projetamos cada metro quadrado para evocar tranquilidade, sofisticação e conforto absoluto.
            </p>
            <p className="font-sans text-sm text-slate-500 leading-relaxed">
              Oferecemos desde o café gourmet de grãos selecionados na recepção, até aromatização relaxante com óleos essenciais, salas cirúrgicas com purificadores de ar nível hospitalar e poltronas ergonômicas de couro italiano aquecidas para que sua sessão de atendimento seja um momento agradável e rejuvenescedor de autocuidado.
            </p>

            <div className="grid grid-cols-3 gap-4 text-center font-mono text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-xl block mb-1">☕</span>
                Café Espresso Gourmet
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-xl block mb-1">🎮</span>
                Óculos VR no atendimento
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-xl block mb-1">🅿</span>
                Valet Gratuito
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MEET OUR SPECIALISTS TEAM */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 border-b border-slate-200">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-teal-600 font-extrabold uppercase tracking-[0.2em] block">
            // EQUIPE CLÍNICA DE ELITE
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Doutores Altamente Qualificados e Atenciosos
          </h3>
          <p className="font-sans text-sm text-slate-500">
            Profissionais com especializações nas melhores universidades do Brasil e do exterior, dedicados a construir relações de longo prazo baseadas na ética e excelência clínica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {specialists.map((spec, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center gap-6 shadow-md hover:border-teal-500/30 transition-all duration-300"
            >
              <img 
                src={spec.image} 
                alt={spec.name} 
                className="w-32 h-32 rounded-xl object-cover border border-slate-100 shrink-0 shadow-sm"
              />
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h4 className="font-serif text-lg font-bold text-slate-900">{spec.name}</h4>
                  <span className="font-mono text-[9px] text-teal-600 bg-teal-50 px-2 py-0.5 rounded font-bold uppercase">{spec.crm}</span>
                </div>
                <p className="font-sans text-xs text-slate-400 font-bold">{spec.role}</p>
                <p className="font-sans text-xs text-slate-500 leading-relaxed">{spec.bio}</p>
                
                <div className="flex items-center justify-center sm:justify-start space-x-1">
                  {[...Array(spec.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-teal-500 fill-teal-500" />
                  ))}
                  <span className="font-mono text-[10px] text-slate-400 font-bold ml-1.5">5.0 / 5</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* APPOINTMENT BOOKING INTELLIGENT FORM */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-slate-100 text-left" id="agendamento">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Form Left: Benefits and guidelines */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs text-teal-600 font-bold uppercase tracking-[0.2em] block">
                // MARQUE SUA SESSÃO
              </span>
              <h3 className="font-serif text-3xl font-extrabold tracking-tight text-slate-900">
                Inicie Seu Protocolo Sorriso Perfeito
              </h3>
              <p className="font-sans text-sm text-slate-500 leading-relaxed">
                Preencha as informações ao lado para que nosso assistente agende o seu horário ideal de atendimento na recepção e prepare os bônus de boas-vindas do seu primeiro diagnóstico digital.
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-teal-500/10 rounded-lg text-teal-600 shrink-0">
                    <Check className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h5 className="font-sans text-xs font-bold text-slate-900">Atendimento ultra-rápido</h5>
                    <p className="font-sans text-[11px] text-slate-500">Confirmamos sua consulta em menos de 10 minutos comerciais via WhatsApp.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-teal-500/10 rounded-lg text-teal-600 shrink-0">
                    <Check className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h5 className="font-sans text-xs font-bold text-slate-900">Tomografia diagnóstica preventiva</h5>
                    <p className="font-sans text-[11px] text-slate-500">Inclusa sem custos extras para tratamentos de Invisalign ou Implantes completos.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Right: Interactive Input panel */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-500" />
              
              <h4 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">
                Ficha de Pré-Agendamento Rápido
              </h4>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block font-bold">Seu Nome Completo *</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Ex: Rafael Silva"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block font-bold">Seu WhatsApp de Contato *</label>
                    <input 
                      type="tel" 
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="Ex: (15) 99711-8125"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block font-bold">Tratamento de Interesse *</label>
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white transition-all font-semibold"
                    >
                      <option value="Invisalign">Invisalign® & Alinhadores</option>
                      <option value="Implantes">Implantes & Reabilitação</option>
                      <option value="Lentes de Contato">Lentes de Contato & Facetas</option>
                      <option value="Clareamento">Clareamento a Laser</option>
                      <option value="Odontopediatria">Odontopediatria Especializada</option>
                      <option value="Outro">Outras Especialidades / Profilaxia</option>
                    </select>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block font-bold">Data Preferencial (Opcional)</label>
                    <input 
                      type="date" 
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block font-bold">Período de Atendimento Preferencial *</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Manhã", "Tarde", "Noite"].map((period) => (
                      <button
                        type="button"
                        key={period}
                        onClick={() => setPreferredPeriod(period)}
                        className={`py-2 px-3 rounded-lg border font-mono text-[10px] font-extrabold uppercase tracking-wider text-center transition-all cursor-pointer ${
                          preferredPeriod === period
                            ? "bg-teal-500/15 border-teal-500 text-teal-700 font-bold"
                            : "bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300"
                        }`}
                      >
                        {period === "Manhã" && "🌅 Manhã"}
                        {period === "Tarde" && "☀️ Tarde"}
                        {period === "Noite" && "🌙 Noite"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-sans text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <MessageSquare className="h-4.5 w-4.5 fill-current" />
                    <span>Confirmar Agendamento no WhatsApp</span>
                  </button>
                </div>

                {bookingSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-50 border border-green-200 rounded-lg text-[11px] text-green-700 font-semibold text-center"
                  >
                    🎉 Redirecionando para nossa recepção no WhatsApp! Por favor, envie a mensagem pré-escrita.
                  </motion.div>
                )}

                <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold pt-1">
                  <Shield className="h-4 w-4 text-teal-500" />
                  <span>Seus dados estão protegidos de acordo com a LGPD</span>
                </div>

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="py-24 max-w-4xl mx-auto px-6 md:px-12 border-b border-slate-200 text-left">
        <div className="text-center space-y-4 mb-16">
          <span className="font-mono text-xs text-teal-600 font-bold uppercase tracking-[0.2em] block">
            // RESPOSTAS RÁPIDAS
          </span>
          <h2 className="font-serif text-3xl font-extrabold tracking-tight text-slate-900">
            Perguntas Frequentes
          </h2>
          <p className="font-sans text-sm text-slate-500">
            Dúvidas comuns que recebemos diariamente de novos pacientes. Confira as explicações técnicas simplificadas.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 shadow-sm"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none cursor-pointer hover:bg-slate-50"
              >
                <span className="font-serif text-sm sm:text-base font-bold text-slate-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`h-4.5 w-4.5 text-slate-400 shrink-0 transition-transform duration-300 ${activeFaq === idx ? "rotate-180 text-teal-500" : ""}`} 
                />
              </button>

              <AnimatePresence initial={false}>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-6 pb-6 pt-1 border-t border-slate-100 font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL HIGH-CONVERTING CTA BANNER */}
      <section className="py-24 max-w-6xl mx-auto px-6 md:px-12 text-center">
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-2xl p-8 sm:p-12 md:p-16 border border-teal-500/30 overflow-hidden space-y-6">
          <div className="absolute inset-0 bg-teal-950/20 pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
            <span className="font-mono text-xs text-teal-400 font-bold uppercase tracking-[0.25em] block animate-pulse">
              ⏱ SEU SORRISO É SEU CARTÃO DE VISITAS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Diga adeus ao medo de sorrir e mastigar com segurança novamente
            </h2>
            <p className="font-sans text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Ganhe 15% de bônus cortesia na sua profilaxia inicial ao realizar seu pré-agendamento ainda hoje através desta página de conversão.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#agendamento"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-sans text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl cursor-pointer"
              >
                <Calendar className="h-4.5 w-4.5" />
                <span>AGENDAR AVALIAÇÃO DIAGNÓSTICA</span>
              </a>

              <a
                href="https://wa.me/5515997118125?text=Ola!%20Estava%20olhando%20o%20site%20da%20clinica%20OralSense%20e%20fiquei%20com%20uma%20duvida%20sobre%20os%20valores%20do%20tratamento%20Invisalign.%20Pode%20me%20ajudar?"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-xl border border-white/20 bg-transparent text-white hover:bg-white/5 font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
              >
                <span>TIRAR DÚVIDAS NO WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-center text-xs space-y-4">
        <p className="font-serif text-white tracking-widest text-sm uppercase">CLÍNICA ODONTOLÓGICA ORALSENSE</p>
        <p className="font-mono text-[9px] uppercase tracking-wider">RESPONSÁVEL TÉCNICA: DRA. BEATRIZ MEDEIROS // CRO-SP 124.593</p>
        <p className="font-sans text-[10px] text-slate-500 max-w-md mx-auto leading-relaxed">
          As informações contidas neste site possuem caráter puramente informativo e de esclarecimento. O diagnóstico definitivo de saúde bucal exige obrigatoriamente uma consulta clínica presencial com profissional habilitado.
        </p>
      </footer>

    </div>
  );
}
