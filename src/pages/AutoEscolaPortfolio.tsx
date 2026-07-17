import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Navigation, 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Star, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Award, 
  MessageSquare, 
  Zap,
  Gauge,
  Key,
  Flame,
  Wrench,
  Compass,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Sliders,
  HelpCircle
} from "lucide-react";

// Generated image assets imported as ES Modules
import drivingSchoolCar from "../assets/images/driving_school_car_1784143284543.jpg";
import dashboardHud from "../assets/images/car_dashboard_hud_1784143297378.jpg";

interface DashboardLight {
  id: string;
  name: string;
  symbol: string;
  color: string;
  meaning: string;
  detranTip: string;
}

export default function AutoEscolaPortfolio({ onBack }: { onBack?: () => void }) {
  // Engine RPM Simulator State to keep the motor cylinder visual active
  const [rpm, setRpm] = useState<number>(1200);
  const [engineOn, setEngineOn] = useState<boolean>(true);

  // Simpler RPM idle oscillation to keep motor cylinders animating nicely
  useEffect(() => {
    if (!engineOn) {
      setRpm(0);
      return;
    }
    const interval = setInterval(() => {
      setRpm(prev => {
        const base = 1200;
        const jitter = Math.floor(Math.sin(Date.now() / 200) * 80);
        return base + jitter;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [engineOn]);

  // Quiz Interface
  interface QuizQuestion {
    id: number;
    category: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      category: "Legislação de Trânsito",
      question: "Sob luz amarela do semáforo, qual deve ser o procedimento padrão e correto do condutor?",
      options: [
        "Acelerar para passar rapidamente antes que o sinal mude para o vermelho.",
        "Parar o veículo, a menos que já tenha iniciado a travessia ou que a parada repentina cause riscos traseiros.",
        "Buzinar de forma estridente para alertar os pedestres e continuar em frente sem hesitar.",
        "Desconsiderar a luz e seguir normalmente se não houver outros veículos cruzando o cruzamento."
      ],
      correctAnswer: 1,
      explanation: "De acordo com as regras do DETRAN e o Código de Trânsito Brasileiro (CTB), a luz amarela indica atenção imediata. O motorista deve diminuir a marcha e efetuar a parada do veículo com segurança, a menos que já esteja atravessando a interseção."
    },
    {
      id: 2,
      category: "Direção Defensiva",
      question: "Ao se deparar com neblina densa na rodovia, qual a atitude mais segura do condutor defensivo?",
      options: [
        "Ligar o pisca-alerta com o veículo ainda em movimento lento e prosseguir na mesma velocidade original.",
        "Parar imediatamente na pista de rolamento mais à direita e aguardar a neblina dissipar por completo.",
        "Acender os faróis baixos ou de neblina, reduzir a velocidade de forma segura e aumentar a distância do carro da frente.",
        "Ligar o farol alto para aumentar o alcance da iluminação e acelerar para sair o quanto antes da área de neblina."
      ],
      correctAnswer: 2,
      explanation: "A luz alta reflete nas microgotas de água suspensas na neblina, criando um 'paredão branco' e piorando a visibilidade. A direção defensiva orienta a reduzir a velocidade, acender os faróis baixos (ou específicos de neblina) e manter uma distância segura de seguimento."
    },
    {
      id: 3,
      category: "Sinalização de Trânsito",
      question: "A placa de regulamentação de parada obrigatória (R-1, formato octogonal vermelho) exige do motorista:",
      options: [
        "Apenas diminuir um pouco a velocidade, passando direto caso não venha nenhum outro veículo pela via transversal.",
        "Parar o veículo obrigatoriamente antes de entrar ou cruzar a interseção, independentemente de haver outros automóveis.",
        "Dar preferência apenas para pedestres, ignorando a parada obrigatória se não houver ninguém nas calçadas.",
        "Parar apenas se houver viatura policial ou câmera de monitoramento fiscalizando o cruzamento."
      ],
      correctAnswer: 1,
      explanation: "A placa R-1 indica Parada Obrigatória absoluta. O condutor deve imobilizar completamente o veículo (velocidade zero), olhar com cuidado para ambos os lados e apenas avançar após certificar-se de que a via está totalmente desimpedida."
    },
    {
      id: 4,
      category: "Mecânica Básica",
      question: "Se a luz vermelha com o desenho de uma lâmpada de óleo lubrificante acender no painel enquanto você dirige, o que isso indica?",
      options: [
        "Que o nível do óleo atingiu o máximo recomendado e o veículo está operando em eficiência perfeita.",
        "Que há uma falha grave na pressão do óleo do motor, exigindo parada imediata do veículo para evitar a quebra total do motor.",
        "Que o veículo precisa de uma troca preventiva de pneus nas próximas 24 horas de uso.",
        "Que o sistema de partida a frio está injetando gasolina auxiliar para melhorar o desempenho térmico."
      ],
      correctAnswer: 1,
      explanation: "A luz vermelha do óleo indica falta de pressão ou nível crítico do óleo lubrificante. Continuar rodando com essa luz acesa impede a lubrificação das peças móveis metálicas internas, fazendo com que o motor venha a fundir em poucos minutos."
    },
    {
      id: 5,
      category: "Primeiros Socorros",
      question: "Ao presenciar um acidente grave com vítimas na via pública, qual é o protocolo de ação imediata?",
      options: [
        "Remover imediatamente as vítimas das ferragens e carregá-las no próprio carro para o hospital mais próximo.",
        "Oferecer água fria e calmantes via oral para tranquilizar as vítimas que estiverem conscientes.",
        "Sinalizar a via de forma segura para evitar novos acidentes e acionar o socorro especializado pelo telefone (192 SAMU ou 193 Bombeiros).",
        "Mover os veículos acidentados de lugar para não atrapalhar o fluxo, mesmo antes da chegada da perícia ou da polícia."
      ],
      correctAnswer: 2,
      explanation: "O protocolo inicial exige garantir a segurança do local do acidente (evitando colisões secundárias) e acionar imediatamente os serviços profissionais (SAMU ou Bombeiros). Vítimas nunca devem ser movidas sem equipamentos específicos para preservar a integridade da coluna cervical."
    }
  ];

  // Detran Quiz States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const handleSelectOption = (index: number) => {
    if (quizAnswered) return;
    setSelectedOption(index);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || quizAnswered) return;
    
    const isCorrect = selectedOption === quizQuestions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
    setQuizAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setQuizAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizAnswered(false);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  const scrollToOrcamento = () => {
    const el = document.getElementById("orcamento");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Quiz/Exam Light Interactive State
  const [selectedLight, setSelectedLight] = useState<string>("engine");

  const dashboardLights: DashboardLight[] = [
    {
      id: "engine",
      name: "Injeção Eletrônica",
      symbol: "⚠️",
      color: "text-amber-500",
      meaning: "Indica falha no gerenciamento do motor ou nos bicos injetores do veículo.",
      detranTip: "💡 DETRAN: Se piscar constantemente durante a prova teórica, indica que há risco de quebra catastrófica do catalisador ou emissão excessiva de poluentes."
    },
    {
      id: "battery",
      name: "Sistema de Carga (Bateria)",
      symbol: "🔋",
      color: "text-red-500",
      meaning: "Significa que a bateria não está sendo carregada pelo alternador do carro.",
      detranTip: "💡 DETRAN: Não significa necessariamente que a bateria estragou, mas sim que o alternador ou a correia de transmissão auxiliar podem ter quebrado."
    },
    {
      id: "oil",
      name: "Pressão do Óleo Lubrificante",
      symbol: "🛢️",
      color: "text-red-500",
      meaning: "Alerta que a pressão do óleo do motor está perigosamente baixa, o que pode fundir o motor.",
      detranTip: "💡 DETRAN: O procedimento correto de segurança ao acender essa luz vermelha é parar imediatamente o veículo em local seguro e desligar o motor."
    },
    {
      id: "brake",
      name: "Freio de Mão ou Fluido",
      symbol: "🛑",
      color: "text-red-500",
      meaning: "Indica que o freio de estacionamento está puxado ou que o nível do fluido de freio está crítico.",
      detranTip: "💡 DETRAN: Dirigir com essa luz acesa causa superaquecimento das pastilhas e perda iminente da capacidade de frenagem do carro."
    }
  ];

  // Enrollment Form States
  const [selectedCategory, setSelectedCategory] = useState<string>("B");
  const [period, setPeriod] = useState<string>("Manhã");
  const [hasExperience, setHasExperience] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>("");
  const [studentPhone, setStudentPhone] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  // Price estimate calculator based on selected filters
  const calculateEstimate = () => {
    let basePrice = 1450;
    if (selectedCategory === "A") basePrice = 1200;
    if (selectedCategory === "AB") basePrice = 2100;

    if (period === "Noite") basePrice += 150; // Night shifts premium
    if (hasExperience) basePrice -= 100; // Discount on fast track evaluation

    return basePrice;
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentPhone) return;

    let msg = `⚡ *QUERO MINHA CNH - AUTOESCOLA PILOTO* ⚡\n\n`;
    msg += `👤 *Candidato:* ${studentName}\n`;
    msg += `📞 *WhatsApp:* ${studentPhone}\n`;
    msg += `🚗 *Categoria:* Categoria ${selectedCategory}\n`;
    msg += `⏰ *Período Preferido:* Turno da ${period}\n`;
    msg += `💡 *Já tem noção de direção?* ${hasExperience ? "Sim, já sei o básico" : "Não, irei começar do absoluto zero"}\n\n`;
    msg += `🏁 _Olá! Testei o cockpit interativo e o simulador no site de vocês e adorei a proposta. Gostaria de receber o cronograma de aulas teóricas e agendar minha matrícula com desconto especial._`;

    window.open(`https://wa.me/5515997118125?text=${encodeURIComponent(msg)}`, "_blank");
    setSuccess(true);
    setStudentName("");
    setStudentPhone("");
    
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#E2E8F0] antialiased selection:bg-amber-500/20 selection:text-amber-400 font-sans pb-24 relative overflow-x-hidden">
      
      {/* Dynamic Animated Asphalt and Track Overlay */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Top Banner indicating Active Simulado Detran Status */}
      <div className="bg-[#E65100] py-2 px-4 text-center text-[10px] md:text-xs text-white font-mono tracking-widest flex items-center justify-center gap-3 border-b border-white/10 sticky top-0 z-50 shadow-md uppercase font-black">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        <span>🔥 SIMULADO DETRAN ONLINE LIBERADO • FAÇA O TESTE INTERATIVO ABAIXO!</span>
        <span className="hidden md:inline">|</span>
        <span className="hidden md:inline">WhatsApp Plantão CNH: (15) 99711-8125</span>
      </div>

      {/* Sporty Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/10 font-mono">
        <div className="flex items-center space-x-3 text-left">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center text-black shadow-lg font-black text-xl">
            P
          </div>
          <div>
            <span className="text-sm font-black uppercase tracking-wider text-amber-400 block leading-tight">PILOTO TECH</span>
            <span className="text-[10px] text-white/50 tracking-widest block uppercase font-medium">AUTOESCOLA CONECTADA</span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-xs text-white/70 font-semibold uppercase tracking-wider">
          <a href="#simulado" className="hover:text-amber-400 transition-colors">Simulado DETRAN</a>
          <a href="#motor" className="hover:text-amber-400 transition-colors">Motor e Mecânica</a>
          <a href="#luzes" className="hover:text-amber-400 transition-colors">Luzes do Painel</a>
          <a href="#orcamento" className="hover:text-amber-400 transition-colors">Configurar Preço</a>
        </div>

        <a 
          href="#orcamento"
          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-yellow-500 hover:to-amber-500 text-black rounded-xl text-xs font-black tracking-wider transition-all shadow-md flex items-center space-x-1.5"
        >
          <Key className="h-3.5 w-3.5 text-black" />
          <span>INICIAR MATRÍCULA</span>
        </a>
      </header>

      {/* Floating back-to-hub arrow button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-3.5 py-2 bg-[#121824] hover:bg-black text-white border border-amber-500/20 rounded-full shadow-2xl text-xs font-mono tracking-wider transition-all duration-300 group"
        >
          <ArrowLeft className="h-4 w-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          <span>PORTFÓLIO DE PROJETOS</span>
        </button>
      </div>

      {/* BOLD RACING HERO SECTION */}
      <section className="relative py-16 lg:py-24 overflow-hidden" id="sobre">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Details */}
          <div className="lg:col-span-6 text-left space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs tracking-wider">
              <Zap className="h-4 w-4 text-amber-400 animate-pulse" />
              <span>Aprovamos de Primeira • 98% de Sucesso</span>
            </div>

            <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
              Aprenda a pilotar na autoescola mais <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">viva e tecnológica</span>.
            </h1>

            <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed max-w-xl">
              Chega de decorebas cansativas e carros velhos. Na Piloto Tech você conta com veículos modernos equipados com telemetria ativa, ar condicionado e direção elétrica, além de professores dinâmicos focados em sua aprovação.
            </p>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-[#121824] border border-white/5 p-4 rounded-xl text-left space-y-1">
                <Gauge className="h-5 w-5 text-amber-400" />
                <h3 className="font-mono text-sm font-bold text-white">Carros 2026</h3>
                <p className="text-[10px] text-white/50">Direção elétrica e ar condicionado.</p>
              </div>

              <div className="bg-[#121824] border border-white/5 p-4 rounded-xl text-left space-y-1">
                <Award className="h-5 w-5 text-amber-400" />
                <h3 className="font-mono text-sm font-bold text-white">98% de CNHs</h3>
                <p className="text-[10px] text-white/50">Líder absoluta em aprovação rápida.</p>
              </div>

              <div className="bg-[#121824] border border-white/5 p-4 rounded-xl text-left space-y-1">
                <Flame className="h-5 w-5 text-amber-400" />
                <h3 className="font-mono text-sm font-bold text-white">Prática Ativa</h3>
                <p className="text-[10px] text-white/50">Sem filas: agende no app em segundos.</p>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#simulado"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-yellow-500 hover:to-amber-500 text-black font-mono text-sm font-black tracking-wide transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg"
              >
                <HelpCircle className="h-4.5 w-4.5" />
                <span>Iniciar Simulado Detran</span>
              </a>

              <a
                href="#orcamento"
                className="w-full sm:w-auto px-6 py-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-mono text-sm font-bold tracking-wide transition-all flex items-center justify-center space-x-1.5"
              >
                <span>Calcular Preço CNH</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

          </div>

          {/* Right Hero: Gorgeous Dashboard Mockup Graphic Frame */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="relative w-full max-w-lg">
              
              {/* Speed track graphic border glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl blur opacity-35 animate-pulse" />
              
              <div className="relative bg-[#0F1420] border border-white/15 rounded-3xl p-4 shadow-2xl space-y-4">
                <div className="relative overflow-hidden rounded-2xl border border-white/10">
                  <img 
                    src={drivingSchoolCar} 
                    alt="Autoescola Piloto Carro de Treinamento" 
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-left">
                    <span className="font-mono text-[9px] text-amber-400 uppercase tracking-widest block font-bold">VEÍCULO DA FROTA PILOTO</span>
                    <h3 className="font-mono text-sm font-bold text-white">Hatchbacks Modernos e Compactos</h3>
                  </div>
                </div>

                <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between text-xs font-mono text-left">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-white/40 block">METODOLOGIA PILOTO</span>
                      <span className="font-bold text-white block">Práticas sem Ansiedade</span>
                    </div>
                  </div>
                  <span className="text-amber-400 font-extrabold text-sm">PRATIQUE AGORA</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SIMULADO DETRAN INTERACTIVE QUIZ SECTION (THE STAR LEAD MAGNET PIECE) */}
      <section className="py-20 bg-[#0E1322] border-y border-white/5 relative" id="simulado">
        
        {/* Playful background tire-tracks / dotted design */}
        <div className="absolute right-0 top-0 bottom-0 w-32 opacity-5 pointer-events-none bg-[radial-gradient(#FFE600_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-[0.25em] block">
              📝 TESTE SEU CONHECIMENTO AGORA
            </span>
            <h2 className="font-mono text-3xl md:text-4xl font-black text-white">
              Simulado Oficial do DETRAN (Compacto)
            </h2>
            <p className="font-sans text-sm text-white/60 leading-relaxed">
              Responda a estas questões reais de exames oficiais do DETRAN. Veja sua pontuação na hora e descubra se você já seria aprovado na prova teórica de primeira habilitação!
            </p>
          </div>

          <div className="bg-[#12192A] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            
            {/* Ambient subtle yellow glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            {!quizCompleted ? (
              <div className="space-y-6">
                
                {/* Header status bar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/5 pb-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                      {quizQuestions[currentQuestionIndex].category}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-white/40">
                    Questão {currentQuestionIndex + 1} de {quizQuestions.length}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="grid grid-cols-5 gap-1.5 h-1 bg-white/5 rounded-full overflow-hidden">
                  {quizQuestions.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`h-full transition-all duration-300 ${
                        idx < currentQuestionIndex 
                          ? "bg-emerald-500" 
                          : idx === currentQuestionIndex 
                          ? "bg-amber-500" 
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>

                {/* Question Text */}
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="font-mono text-base md:text-lg font-bold text-white leading-snug">
                    {quizQuestions[currentQuestionIndex].question}
                  </h3>

                  {/* Options Vertical Stack */}
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {quizQuestions[currentQuestionIndex].options.map((option, idx) => {
                      const letters = ["A", "B", "C", "D"];
                      const isSelected = selectedOption === idx;
                      const isCorrectAnswer = idx === quizQuestions[currentQuestionIndex].correctAnswer;
                      
                      let optionStyle = "bg-[#0B0F19] border-white/10 text-white/80 hover:bg-[#161F33] hover:border-white/20";
                      
                      if (quizAnswered) {
                        if (isCorrectAnswer) {
                          optionStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-semibold";
                        } else if (isSelected) {
                          optionStyle = "bg-red-500/10 border-red-500 text-red-400 font-semibold";
                        } else {
                          optionStyle = "bg-[#0B0F19]/50 border-white/5 text-white/30";
                        }
                      } else if (isSelected) {
                        optionStyle = "bg-amber-500/10 border-amber-500 text-amber-400 font-semibold";
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={quizAnswered}
                          onClick={() => handleSelectOption(idx)}
                          className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-sans flex items-start space-x-3 transition-all cursor-pointer ${optionStyle}`}
                        >
                          <span className={`h-6 w-6 rounded-lg shrink-0 flex items-center justify-center font-mono text-xs font-black transition-all ${
                            isSelected && !quizAnswered
                              ? "bg-amber-500 text-black"
                              : quizAnswered && isCorrectAnswer
                              ? "bg-emerald-500 text-black"
                              : quizAnswered && isSelected
                              ? "bg-red-500 text-white"
                              : "bg-[#161F33] text-white/50"
                          }`}>
                            {letters[idx]}
                          </span>
                          <span className="leading-normal">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation and Navigation Controls */}
                  <div className="pt-4 border-t border-white/5 flex flex-col gap-4">
                    
                    {!quizAnswered ? (
                      <button
                        type="button"
                        disabled={selectedOption === null}
                        onClick={handleConfirmAnswer}
                        className={`w-full py-4 rounded-xl font-mono text-sm font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-2 ${
                          selectedOption !== null
                            ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg cursor-pointer hover:scale-[1.01]"
                            : "bg-white/5 text-white/30 border border-white/5 cursor-not-allowed"
                        }`}
                      >
                        <Check className="h-4.5 w-4.5" />
                        <span>Confirmar Resposta</span>
                      </button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 text-left"
                      >
                        {/* Explanation block */}
                        <div className={`p-4 rounded-xl border ${
                          selectedOption === quizQuestions[currentQuestionIndex].correctAnswer
                            ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-300"
                            : "bg-red-500/5 border-red-500/20 text-red-300"
                        }`}>
                          <div className="flex items-center space-x-2 mb-2 font-mono text-xs font-bold">
                            {selectedOption === quizQuestions[currentQuestionIndex].correctAnswer ? (
                              <span className="flex items-center gap-1 text-emerald-400">
                                <CheckCircle2 className="h-4 w-4 shrink-0" /> RESPOSTA CORRETA
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-red-400">
                                <AlertTriangle className="h-4 w-4 shrink-0" /> RESPOSTA INCORRETA
                              </span>
                            )}
                          </div>
                          <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
                            <strong>Dica do Instrutor:</strong> {quizQuestions[currentQuestionIndex].explanation}
                          </p>
                        </div>

                        {/* Continue Button */}
                        <button
                          type="button"
                          onClick={handleNextQuestion}
                          className="w-full py-4 rounded-xl bg-white text-black hover:bg-white/90 font-mono text-sm font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg"
                        >
                          <span>{currentQuestionIndex < quizQuestions.length - 1 ? "Próxima Questão" : "Ver Meu Resultado"}</span>
                          <ArrowRight className="h-4 w-4 text-black" />
                        </button>
                      </motion.div>
                    )}

                  </div>

                </motion.div>

              </div>
            ) : (
              // Quiz Completed Screen
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-8"
              >
                {/* Visual Score Gauge */}
                <div className="relative h-32 w-32 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="52" stroke="#1F2937" strokeWidth="8" fill="transparent" />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="52" 
                      stroke={quizScore >= 4 ? "#10B981" : "#F59E0B"} 
                      strokeWidth="8" 
                      fill="transparent" 
                      strokeDasharray="326"
                      strokeDashoffset={326 - (326 * (quizScore / quizQuestions.length))}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="font-mono text-3xl font-black text-white">{quizScore}/{quizQuestions.length}</span>
                    <span className="font-mono text-[9px] text-white/40 uppercase">Acertos</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-mono text-xl md:text-2xl font-bold text-white">
                    {quizScore >= 4 ? "Aprovado no Simulado! 🎉" : "Precisa Estudar Mais! 📚"}
                  </h3>
                  <p className="font-sans text-sm text-white/60 max-w-lg mx-auto">
                    {quizScore >= 4 
                      ? "Excelente resultado! Você atingiu o critério mínimo exigido pelo DETRAN de 70% de aproveitamento na prova teórica." 
                      : "Faltou pouco! A prova do DETRAN exige que você acerte no mínimo 70% das questões teóricas para se habilitar."}
                  </p>
                </div>

                {/* Gated Lead Magnet Banner & WhatsApp CTA */}
                <div className="p-6 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 rounded-2xl text-left space-y-4 max-w-2xl mx-auto relative overflow-hidden">
                  <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400 mt-0.5">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-mono text-sm font-extrabold text-amber-400 uppercase tracking-wider">
                        ⚠️ BANCO DE QUESTÕES COMPLETO É ILIMITADO
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
                        Este simulador compacto de 5 perguntas é apenas um teste de cortesia. 
                        <strong> Alunos matriculados na Piloto Tech contam com acesso ILIMITADO ao nosso portal exclusivo </strong> 
                        com mais de 1.000 questões atualizadas em 2026, gabaritos comentados por vídeo e simulados temáticos de todas as matérias!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Final Actions Block */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto pt-2">
                  
                  <button
                    type="button"
                    onClick={scrollToOrcamento}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-yellow-500 hover:to-amber-500 text-black font-mono text-sm font-black tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                  >
                    <Zap className="h-4.5 w-4.5 text-black animate-bounce" />
                    <span>Matricular & Liberar Simulados</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="w-full sm:w-auto px-6 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Refazer Simulado</span>
                  </button>

                </div>

              </motion.div>
            )}

          </div>

        </div>
      </section>

      {/* Scroll anchor fallback */}
      <div id="cockpit" className="hidden" />

      {/* DETRAN WARNING LIGHTS CARD INTERACTIVE GAME */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12" id="luzes">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block info */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-[0.2em] block">
              💡 QUESTÕES TEÓRICAS DO DETRAN
            </span>
            <h3 className="font-mono text-3xl font-black text-white leading-tight">
              Desvendando as Luzes do Painel de Instrumentos
            </h3>
            <p className="font-sans text-sm text-white/60 leading-relaxed">
              O painel de instrumentos do carro fala com o motorista por meio de códigos de cores padronizados mundialmente. Clique nas luzes interativas do painel para estudar o significado de cada uma delas, uma das perguntas mais cobradas na prova escrita oficial!
            </p>

            {/* Dashboard lights mock grid selector */}
            <div className="grid grid-cols-4 gap-3 bg-black/40 p-4 rounded-2xl border border-white/5">
              {dashboardLights.map((light) => (
                <button
                  key={light.id}
                  onClick={() => setSelectedLight(light.id)}
                  className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
                    selectedLight === light.id
                      ? "bg-white/5 border-amber-500 scale-105 shadow-xl"
                      : "bg-[#0E1322] border-white/5 hover:border-white/20"
                  }`}
                >
                  <span className="text-3xl filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]">{light.symbol}</span>
                  <span className="font-mono text-[8px] text-white/40 font-bold uppercase mt-1 truncate max-w-full px-1">{light.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Explanation Blackboard panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {dashboardLights.map((light) => {
                if (light.id !== selectedLight) return null;
                return (
                  <motion.div
                    key={light.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#12192A] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6 text-left relative"
                  >
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div className="flex items-center space-x-3.5">
                        <span className="text-4xl">{light.symbol}</span>
                        <div>
                          <span className="font-mono text-[9px] text-amber-400 block font-bold uppercase">ALERTA INSTRUMENTO AUTOMOTIVO</span>
                          <h4 className="font-mono text-lg font-black text-white">{light.name}</h4>
                        </div>
                      </div>
                      <span className={`font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
                        light.color === "text-red-500" ? "bg-red-500/10 text-red-400" : "bg-amber-500/10 text-amber-400"
                      }`}>
                        Gravidade Crítica
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="font-mono text-[10px] text-white/40 uppercase block font-semibold">O que significa no veículo?</span>
                      <p className="font-sans text-sm text-white/80 leading-relaxed font-medium">
                        {light.meaning}
                      </p>
                    </div>

                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-1">
                      <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider block font-black">Dica Prática para Gabaritar no DETRAN</span>
                      <p className="font-sans text-xs text-amber-300/90 leading-relaxed font-semibold">
                        {light.detranTip}
                      </p>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* MECHANICAL ENGINE ENGINE BLOCK ANIMATION SHOWCASE */}
      <section className="py-20 bg-black/40 border-y border-white/5" id="motor">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          {/* Animated mechanical pistons cylinders on Left */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-[0.2em] block">
              ⚙️ ENGENHARIA DE COMBUSTÃO EM MOVIMENTO
            </span>
            <h3 className="font-mono text-3xl font-black text-white leading-tight">
              O Bloco de Cilindros e os Pistões do Motor
            </h3>
            <p className="font-sans text-sm text-white/60 leading-relaxed">
              Diferente de decorar peças em apostilas de papel, aqui seu aprendizado é visual! Os 4 pistões abaixo se movem sincronizadamente com a rotação virtual do motor (RPM). Veja como a combustão empurra os pistões para gerar tração:
            </p>

            {/* Simulated 4 Cylinder Engine mechanical block */}
            <div className="bg-[#12192A] border border-white/10 p-6 rounded-2xl shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <span className="font-mono text-xs text-white/60 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Wrench className="h-4 w-4 text-amber-400" />
                  Bloco de Motor de 4 Cilindros (1.6 Flex)
                </span>
                <span className="font-mono text-xs text-amber-400 font-black">{rpm} RPM</span>
              </div>

              {/* Pistons visualization container */}
              <div className="grid grid-cols-4 gap-4 bg-black/60 p-6 rounded-xl border border-white/5 h-44 relative items-end">
                {[1, 2, 3, 4].map((piston) => {
                  // Calculate animation delay for combustion sequence
                  const delay = piston === 1 ? 0 : piston === 2 ? 0.4 : piston === 3 ? 0.2 : 0.6;
                  // Dynamic speed calculation based on active RPM
                  const animationDuration = rpm > 0 ? `${Math.max(0.1, 4000 / rpm)}s` : "0s";

                  return (
                    <div key={piston} className="flex flex-col items-center h-full justify-between">
                      <span className="font-mono text-[9px] text-white/30 uppercase">Cil {piston}</span>
                      
                      {/* Piston metallic cylinder sliding */}
                      <div className="w-10 bg-slate-800 border border-slate-700 h-28 rounded-b-lg relative flex flex-col justify-between overflow-hidden">
                        
                        {/* Dynamic burning flash when piston reaches the top */}
                        <motion.div 
                          animate={{
                            opacity: rpm > 0 ? [0, 0.8, 0] : 0
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: rpm > 0 ? Math.max(0.1, 4000 / rpm) : 1,
                            delay: delay
                          }}
                          className="h-3 w-full bg-gradient-to-b from-orange-500 to-yellow-500 absolute top-0"
                        />

                        {/* Moving piston shaft block */}
                        <motion.div 
                          animate={{
                            y: rpm > 0 ? [0, 45, 0] : 15
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: rpm > 0 ? Math.max(0.1, 4000 / rpm) : 1,
                            ease: "easeInOut",
                            delay: delay
                          }}
                          className="w-8 h-8 bg-gradient-to-b from-slate-400 to-slate-500 rounded-lg mx-auto shadow-md relative"
                        >
                          {/* Connection rod indicator line */}
                          <div className="w-1.5 h-16 bg-slate-600 absolute top-full left-1/2 -translate-x-1/2 rounded-full" />
                        </motion.div>

                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between text-xs font-mono text-white/50">
                <span>Sequência de Ignição: 1-3-4-2</span>
                <span className="text-amber-400 font-bold">Cilindros Sincronizados</span>
              </div>

            </div>
          </div>

          {/* Right info text card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 bg-[#12192A] border border-white/10 rounded-2xl space-y-4">
              <h4 className="font-mono text-lg font-bold text-white flex items-center gap-1.5">
                <Wrench className="h-4.5 w-4.5 text-amber-400" />
                Noções Práticas de Mecânica (CNH Categoria B)
              </h4>
              <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
                Você sabia que a prova teórica de primeira habilitação dedica até 4 questões específicas de mecânica básica? Compreender visualmente as válvulas de admissão, o escapamento de gases residuais e o papel do líquido de arrefecimento poupa horas de estudo abstrato nas vésperas do exame!
              </p>
              
              <ul className="space-y-2 text-xs font-mono text-white/70">
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Lubrificação do óleo impede o atrito entre pistões e camisas.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>O radiador arrefece a alta temperatura gerada pelas combustões.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>O catalisador purifica os gases nocivos antes de liberá-los.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* DYNAMIC PRICE ESTIMATOR CALCULATOR */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12" id="orcamento">
        
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-[0.2em] block">
            💵 SIMULADOR DE PLANOS E MATRÍCULA
          </span>
          <h2 className="font-mono text-3xl md:text-4xl font-black text-white">
            Personalize Seu Plano de Primeira Habilitação
          </h2>
          <p className="font-sans text-sm text-white/60 leading-relaxed">
            Configure seu pacote de aulas, selecione o período letivo ideal para sua rotina e veja o preço estimado com desconto promocional na hora! Transparência total antes de fechar sua CNH.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch text-left">
          
          {/* Left Configurator Column */}
          <div className="lg:col-span-5 bg-[#12192A] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <h4 className="font-mono text-base font-bold text-white border-b border-white/5 pb-3">
              Filtros de Habilitação
            </h4>

            {/* Category Select */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-white/40 uppercase block font-bold">Categoria da CNH *</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "A", name: "Moto (A)", desc: "20 Horas Práticas" },
                  { value: "B", name: "Carro (B)", desc: "20 Horas Práticas" },
                  { value: "AB", name: "Carro + Moto", desc: "40 Horas Práticas" },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setSelectedCategory(item.value as "A" | "B" | "AB")}
                    className={`p-3.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                      selectedCategory === item.value
                        ? "bg-amber-500/10 border-amber-500 text-amber-400"
                        : "bg-black/40 border-white/5 text-white/70 hover:bg-white/5"
                    }`}
                  >
                    <span className="font-mono text-sm font-black">{item.name}</span>
                    <span className="text-[8px] text-white/50 block font-semibold mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time shift selection */}
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-white/40 uppercase block font-bold">Turno Teórico e Prático *</label>
              <div className="grid grid-cols-3 gap-2">
                {["Manhã", "Tarde", "Noite"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setPeriod(t as "Manhã" | "Tarde" | "Noite")}
                    className={`py-2 px-3 rounded-lg border text-xs font-mono font-bold text-center transition-all cursor-pointer ${
                      period === t
                        ? "bg-amber-500/10 border-amber-500 text-amber-400"
                        : "bg-black/40 border-white/5 text-white/70 hover:bg-white/5"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Direction Knowledge Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-black/40 rounded-xl border border-white/5">
              <div>
                <span className="text-xs font-bold text-white block">Já possui noção básica de direção?</span>
                <span className="text-[9px] text-white/50 block font-semibold">Temos turmas com metodologia rápida.</span>
              </div>
              <button
                type="button"
                onClick={() => setHasExperience(!hasExperience)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                  hasExperience ? "bg-amber-500" : "bg-white/10"
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  hasExperience ? "translate-x-6" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* Calculated estimate box */}
            <div className="p-5 bg-black/40 border border-white/5 rounded-xl space-y-2.5">
              <div className="flex justify-between text-xs font-mono text-white/50 font-bold">
                <span>Preço Base Promocional</span>
                <span>R$ {calculateEstimate().toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-xs font-mono text-emerald-400 font-bold border-t border-white/5 pt-2">
                <span>Taxa de Agendamento Online</span>
                <span>Grátis</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-dashed border-white/15">
                <span className="font-mono text-xs text-white uppercase font-bold">Total Estimado</span>
                <span className="font-mono text-2xl font-black text-amber-400">R$ {calculateEstimate().toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </div>
              <p className="text-[9px] text-white/40 font-mono leading-relaxed uppercase">
                * Valores baseados no convênio estadual de taxas do Detran. Não inclusas taxas obrigatórias de exames médico/psicotécnico.
              </p>
            </div>

          </div>

          {/* Right enrollment form column */}
          <div className="lg:col-span-7 bg-[#12192A] border border-white/10 rounded-2xl p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            
            <div className="space-y-6 relative z-10">
              <h4 className="font-mono text-lg font-bold text-white border-b border-dashed border-white/10 pb-4">
                Ficha de Pré-Matrícula Piloto Tech
              </h4>

              <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest block font-bold">Seu Nome Completo *</label>
                    <input 
                      type="text" 
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Rodrigo Santana"
                      className="w-full bg-[#0B0F19] border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-amber-500 focus:bg-[#0B0F19] transition-all font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-white/40 uppercase tracking-widest block font-bold">WhatsApp de Contato *</label>
                    <input 
                      type="tel" 
                      required
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      placeholder="(15) 99711-8125"
                      className="w-full bg-[#0B0F19] border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-amber-500 focus:bg-[#0B0F19] transition-all font-semibold"
                    />
                  </div>
                </div>

                <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-xs text-white/60 leading-relaxed font-sans space-y-2">
                  <strong className="text-white block">Benefícios de Matrícula Online Inclusos:</strong>
                  <ul className="space-y-1 list-disc pl-4 text-xs font-semibold">
                    <li>Garantia de instrutor fixo preferencial do início ao fim das práticas.</li>
                    <li>Agendamento flexível de aulas teóricas no formato presencial ou EAD híbrido.</li>
                    <li>Isenção total na taxa de re-agendamento de aulas práticas canceladas com antecedência.</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-yellow-500 hover:to-amber-500 text-black font-mono text-sm font-black tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center space-x-2 shadow-lg"
                >
                  <MessageSquare className="h-4.5 w-4.5 text-black" />
                  <span>Enviar Solicitação pelo WhatsApp</span>
                </button>

                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-center text-xs font-semibold"
                    >
                      ✓ Redirecionando para o WhatsApp do Plantão de Matrículas...
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
