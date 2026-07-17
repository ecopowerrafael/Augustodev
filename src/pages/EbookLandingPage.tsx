import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Check, 
  MessageSquare, 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  Star, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  FileText, 
  TrendingUp, 
  Zap, 
  HelpCircle, 
  ChevronDown, 
  Gift, 
  Percent 
} from "lucide-react";

// Generated high-quality images imported as ES Modules
import ebookCoverImg from "../assets/images/ebook_cover_ia_1784137376665.jpg";
import entrepreneurImg from "../assets/images/entrepreneur_success_office_1784137398342.jpg";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function EbookLandingPage({ onBack }: { onBack?: () => void }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ minutes: 24, seconds: 53 });
  const [copiedText, setCopiedText] = useState(false);

  // Fake scarcity timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 29, seconds: 59 }; // Reset
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const testimonials: Testimonial[] = [
    {
      name: "Rodrigo Vasconcelos",
      role: "CEO & Fundador",
      company: "Aura Digital",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      rating: 5,
      text: "Eu gastava quase R$ 8.000/mês com assistentes fazendo triagem manual de leads e geração de relatórios. Implementei dois capítulos deste e-book e consegui automatizar todo o funil. Economizei milhares de reais e o tempo de resposta caiu para 2 minutos!"
    },
    {
      name: "Camila Guimarães",
      role: "Diretora de Operações",
      company: "Logix Group",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      rating: 5,
      text: "Leitura obrigatória para qualquer dono de empresa de serviços. O capítulo sobre automação de pós-venda com Inteligência Artificial vale 100x o preço cobrado por este livro digital. Simples, direto ao ponto e sem enrolação acadêmica."
    },
    {
      name: "Marcos Pinheiro",
      role: "Founder",
      company: "Pinheiro Advocacia",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
      rating: 5,
      text: "Eu achava que automação com IA era algo complexo e restrito a programadores seniores. O guia do Augusto me mostrou como montar tudo de forma visual em poucos cliques usando ferramentas no-code acessíveis."
    }
  ];

  const faqs: FAQItem[] = [
    {
      question: "Preciso saber programar para aplicar o que está no e-book?",
      answer: "Absolutamente não! O e-book foi focado 100% em ferramentas visuais no-code e de baixo custo (como Make, n8n, ChatGPT Plus e Typebot). Qualquer pessoa que saiba navegar na internet consegue seguir o passo a passo e automatizar processos."
    },
    {
      question: "Como funciona a entrega do e-book após a compra?",
      answer: "Após clicar no botão e iniciar a conversa no WhatsApp, você falará diretamente com nosso suporte comercial humanizado. Enviamos a chave Pix oficial para pagamento e, em menos de 1 minuto, o e-book em PDF de alta qualidade e todos os bônus exclusivos serão enviados diretamente na sua conversa."
    },
    {
      question: "O que vou aprender exatamente?",
      answer: "Você aprenderá a criar agentes virtuais para triar leads 24h/dia, integrar planilhas com CRMs automaticamente, enviar avisos personalizados de cobrança, gerar relatórios de desempenho gerenciais por IA e construir um ecossistema operacional de baixo custo."
    },
    {
      question: "Existe alguma garantia de satisfação?",
      answer: "Sim! Oferecemos uma garantia incondicional de 7 dias. Se você ler o e-book e achar que o conteúdo não é aplicável ou não agrega valor para a sua empresa, basta solicitar o reembolso direto no WhatsApp e devolveremos 100% do seu investimento sem perguntas ou constrangimento."
    }
  ];

  const handleWhatsAppRedirect = (plan: string) => {
    const text = `Olá Augusto! Vi a página do seu e-book "O Império da Automação" e gostaria de garantir a minha cópia com todos os bônus na oferta especial (${plan}). Como faço para efetuar o Pix?`;
    window.open(`https://wa.me/5515997118125?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-[#F3F4F6] font-sans antialiased relative selection:bg-[#00FF41]/30 selection:text-[#00FF41]">
      
      {/* Dynamic Top Bar for Urgency Scarcity */}
      <div className="bg-gradient-to-r from-[#00FF41]/20 via-[#008F21] to-[#00FF41]/20 py-2.5 px-4 text-center text-[10px] md:text-xs font-mono tracking-widest text-white uppercase flex flex-wrap items-center justify-center gap-2 border-b border-[#00FF41]/20 sticky top-0 z-50 backdrop-blur-md">
        <Zap className="h-3.5 w-3.5 text-[#00FF41] animate-bounce" />
        <span>OFERTA DE LANÇAMENTO EXCLUSIVA:</span>
        <span className="font-bold text-[#00FF41] animate-pulse">70% DE DESCONTO</span>
        <span>ACABA EM:</span>
        <span className="bg-black/40 px-2 py-0.5 rounded text-white font-bold tracking-normal border border-white/10">
          {timeLeft.minutes.toString().padStart(2, "0")}:{timeLeft.seconds.toString().padStart(2, "0")}
        </span>
      </div>

      {/* Voltar ao Hub Developer overlay */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-3 py-2 bg-black/95 text-white hover:bg-black border border-white/10 rounded-lg shadow-2xl text-xs font-mono tracking-wider transition-all duration-300 group hover:border-[#00FF41]/40"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-[#00FF41] group-hover:-translate-x-1 transition-transform" />
          <span className="text-white/60 group-hover:text-white">VOLTAR AO HUB</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
        </button>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20 pb-20 md:pb-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,65,0.06),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Hero copy text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#00FF41]/10 border border-[#00FF41]/30 text-[#00FF41] font-mono text-[9px] uppercase tracking-wider font-extrabold">
              <Award className="h-3.5 w-3.5 animate-pulse" />
              <span>GUIA PRÁTICO DE IMPLEMENTAÇÃO</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              Sua Empresa no <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] via-[#00C330] to-[#FFFFFF]">Piloto Automático</span> com IA.
            </h1>

            <h2 className="font-sans text-sm sm:text-base md:text-lg text-gray-400 font-medium leading-relaxed">
              Descubra como empresários e gestores estão cortando até 60% dos custos operacionais e automatizando 85% do trabalho manual repetitivo da operação diária em menos de 15 dias.
            </h2>

            {/* Pain point callouts */}
            <div className="space-y-2 border-l-2 border-[#00FF41]/40 pl-4 py-1">
              <p className="text-xs text-gray-300 italic">
                &ldquo;Chega de passar o dia respondendo os mesmos clientes, digitando planilhas e enviando mensagens de cobrança de forma exaustiva.&rdquo;
              </p>
            </div>

            {/* Benefit Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-center space-x-2.5 text-xs text-gray-300">
                <Check className="h-4.5 w-4.5 text-[#00FF41] shrink-0" />
                <span>27 Fluxos de Automação Prontos</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-gray-300">
                <Check className="h-4.5 w-4.5 text-[#00FF41] shrink-0" />
                <span>Uso prático de No-Code & IAs</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-gray-300">
                <Check className="h-4.5 w-4.5 text-[#00FF41] shrink-0" />
                <span>Modelos de Prompts Copie & Cole</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-gray-300">
                <Check className="h-4.5 w-4.5 text-[#00FF41] shrink-0" />
                <span>Acesso Imediato pelo WhatsApp</span>
              </div>
            </div>

            {/* Core CTA Block */}
            <div className="pt-4 space-y-3">
              <button
                onClick={() => handleWhatsAppRedirect("Completo - R$ 29,90")}
                className="w-full sm:w-auto px-8 py-4.5 rounded-lg bg-[#00FF41] hover:bg-[#00D135] text-black font-sans text-sm font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-3.5 shadow-[0_0_30px_rgba(0,255,65,0.25)] border border-transparent cursor-pointer"
              >
                <MessageSquare className="h-5 w-5 fill-current" />
                <span>QUERO ADQUIRIR O E-BOOK AGORA</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">
                <div className="flex items-center space-x-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#00FF41]" />
                  <span>Compra 100% Segura</span>
                </div>
                <div>•</div>
                <div className="flex items-center space-x-1">
                  <Star className="h-3.5 w-3.5 text-[#00FF41] fill-[#00FF41]" />
                  <span>Avaliação 4.9/5 estrelas</span>
                </div>
                <div>•</div>
                <div className="flex items-center space-x-1">
                  <Percent className="h-3.5 w-3.5 text-[#00FF41]" />
                  <span>Entrega Imediata</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero: Stunning 3D book cover display */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative group"
            >
              {/* Backlight glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF41] to-[#008F21] rounded-2xl blur-xl opacity-35 group-hover:opacity-45 transition-opacity" />
              
              <div className="relative bg-black border border-white/10 p-4 rounded-xl max-w-sm overflow-hidden shadow-2xl">
                <img 
                  src={ebookCoverImg} 
                  alt="E-book Cover: O Império da Automação" 
                  className="rounded-lg w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Micro social proof band on book bottom */}
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-gray-400">
                  <div className="flex items-center space-x-1 text-[#00FF41]">
                    <Users className="h-3.5 w-3.5" />
                    <span className="font-bold">840+ leitores este mês</span>
                  </div>
                  <span>PDF Interativo</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* THE FRUSTRATIONS (AGITATE THE PAIN) */}
      <section className="py-24 max-w-6xl mx-auto px-6 md:px-12 border-b border-white/5">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-mono text-xs text-[#00FF41] font-bold uppercase tracking-[0.2em] block">
            // SEU NEGÓCIO ESTÁ EM RISCO?
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Por que você continua trabalhando 12 horas por dia enquanto seus concorrentes automatizam tudo?
          </h2>
          <p className="font-sans text-sm text-gray-400 leading-relaxed">
            Se você se identifica com uma ou mais das situações abaixo, sua operação está obsoleta e consumindo sua energia vital:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
          
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-4">
            <div className="h-10 w-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center font-bold text-lg">
              ✕
            </div>
            <h4 className="font-serif text-lg font-bold text-white">Equipe presa no manual</h4>
            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              Colaboradores qualificados passam metade do expediente digitando planilhas, copiando dados de um site para outro ou respondendo mensagens básicas de clientes.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-4">
            <div className="h-10 w-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center font-bold text-lg">
              ✕
            </div>
            <h4 className="font-serif text-lg font-bold text-white">Leads frios e sem resposta</h4>
            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              Novos contatos que chegam no seu site ou redes sociais passam horas (ou até dias) sem receber um retorno comercial. Estatisticamente, responder em mais de 5 minutos reduz as vendas em 80%.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-4">
            <div className="h-10 w-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center font-bold text-lg">
              ✕
            </div>
            <h4 className="font-serif text-lg font-bold text-white">Incapacidade de escalar</h4>
            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              Você sabe que se dobrar o número de clientes hoje, sua equipe entrará em colapso e o suporte vai quebrar. Você está limitado à quantidade de braços humanos que pode pagar.
            </p>
          </div>

        </div>
      </section>

      {/* WHAT'S INSIDE THE EBOOK (THE INDEX) */}
      <section className="py-24 max-w-6xl mx-auto px-6 md:px-12 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="font-mono text-xs text-[#00FF41] font-bold uppercase tracking-[0.2em] block">
              // O CONTEÚDO EXCLUSIVO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              O que você vai dominar ao ler o livro:
            </h2>
            <p className="font-sans text-sm text-gray-400 leading-relaxed">
              Este e-book não é um estudo de caso teórico e abstrato sobre Inteligência Artificial. É um manual estritamente prático de engenharia operacional. Você abre, segue o fluxograma e cria a sua automação.
            </p>

            <div className="bg-[#00FF41]/5 border border-[#00FF41]/20 p-5 rounded-lg space-y-3">
              <span className="font-mono text-[10px] text-[#00FF41] font-bold uppercase tracking-wider block">CONCEITO EXCLUSIVO VERTIKA</span>
              <p className="font-sans text-xs text-gray-300 leading-relaxed">
                Você receberá os diagramas prontos das ferramentas, bastando duplicá-los na sua própria conta gratuita do Make ou n8n.
              </p>
            </div>
          </div>

          {/* Right index card grid */}
          <div className="lg:col-span-7 space-y-4 text-left">
            
            <div className="p-5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-[#00FF41]/20 transition-all flex items-start space-x-4">
              <div className="p-2.5 bg-[#00FF41]/10 rounded-lg text-[#00FF41] font-mono text-xs font-bold shrink-0">
                CAP 1
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-white">Fundamentos do Império Digital</h4>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">
                  Como escolher as ferramentas certas de automação, configurar o ecossistema integrado em 1 hora e usar APIs sem gastar nada.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-[#00FF41]/20 transition-all flex items-start space-x-4">
              <div className="p-2.5 bg-[#00FF41]/10 rounded-lg text-[#00FF41] font-mono text-xs font-bold shrink-0">
                CAP 2
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-white">Triagem Automática & Geração de Leads</h4>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">
                  Passo a passo para conectar formulários do seu site, Instagram Direct e WhatsApp em um fluxo que responde de forma humanizada via ChatGPT em segundos.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-[#00FF41]/20 transition-all flex items-start space-x-4">
              <div className="p-2.5 bg-[#00FF41]/10 rounded-lg text-[#00FF41] font-mono text-xs font-bold shrink-0">
                CAP 3
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-white">O Fim das Planilhas Manuais</h4>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">
                  Como alimentar seus painéis gerenciais e CRM de forma 100% autônoma a partir de e-mails, contratos assinados ou mensagens no Slack/WhatsApp.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-[#00FF41]/20 transition-all flex items-start space-x-4">
              <div className="p-2.5 bg-[#00FF41]/10 rounded-lg text-[#00FF41] font-mono text-xs font-bold shrink-0">
                CAP 4
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-white">Cobrança e Atendimento de Crise</h4>
                <p className="font-sans text-xs text-gray-400 leading-relaxed">
                  Sistema autônomo e discreto de alertas de vencimento com integração financeira que ajuda a reduzir a inadimplência empresarial em até 42%.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* EXCLUSIVE EXTRA BONUSES (IRRESISTIBLE OFFER) */}
      <section className="py-24 max-w-6xl mx-auto px-6 md:px-12 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,255,65,0.04),transparent_50%)] pointer-events-none" />
        
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-mono text-xs text-[#00FF41] font-bold uppercase tracking-[0.2em] block">
            // SUPER PACK DE LANÇAMENTO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Bônus Exclusivos inclusos apenas HOJE
          </h2>
          <p className="font-sans text-sm text-gray-400 leading-relaxed">
            Se você adquirir o e-book durante o cronômetro desta página, você receberá gratuitamente os seguintes recursos complementares:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 text-left">
          
          <div className="p-6 rounded-xl bg-white/[0.02] border border-[#00FF41]/20 relative space-y-4 group hover:bg-[#00FF41]/5 transition-all">
            <div className="absolute top-4 right-4 bg-[#00FF41] text-black text-[9px] font-mono font-bold px-2 py-0.5 rounded">
              GRÁTIS
            </div>
            <div className="p-3 bg-[#00FF41]/10 rounded-lg inline-block text-[#00FF41]">
              <Gift className="h-5 w-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-white">Bônus #1: Biblioteca de Prompts de Elite</h4>
            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              Mais de 50 prompts testados para usar no ChatGPT, Claude ou Gemini que geram textos de vendas, roteiros de criativos e triagens de atendimento sem erros.
            </p>
            <p className="font-mono text-[10px] text-gray-500 font-bold uppercase">VALOR INDIVIDUAL: <span className="line-through">R$ 47,00</span></p>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-[#00FF41]/20 relative space-y-4 group hover:bg-[#00FF41]/5 transition-all">
            <div className="absolute top-4 right-4 bg-[#00FF41] text-black text-[9px] font-mono font-bold px-2 py-0.5 rounded">
              GRÁTIS
            </div>
            <div className="p-3 bg-[#00FF41]/10 rounded-lg inline-block text-[#00FF41]">
              <FileText className="h-5 w-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-white">Bônus #2: Planilha de Diagnóstico Operacional</h4>
            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              Um modelo estruturado no Google Sheets para você mapear os gargalos da sua empresa e ranquear quais processos devem ser automatizados primeiro.
            </p>
            <p className="font-mono text-[10px] text-gray-500 font-bold uppercase">VALOR INDIVIDUAL: <span className="line-through">R$ 39,00</span></p>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-[#00FF41]/20 relative space-y-4 group hover:bg-[#00FF41]/5 transition-all">
            <div className="absolute top-4 right-4 bg-[#00FF41] text-black text-[9px] font-mono font-bold px-2 py-0.5 rounded">
              GRÁTIS
            </div>
            <div className="p-3 bg-[#00FF41]/10 rounded-lg inline-block text-[#00FF41]">
              <Zap className="h-5 w-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-white">Bônus #3: Template de Dashboard de Resultados</h4>
            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              Template pronto para conectar suas automações e visualizar o fluxo de leads, ROI de campanhas e economia operacional em tempo real.
            </p>
            <p className="font-mono text-[10px] text-gray-500 font-bold uppercase">VALOR INDIVIDUAL: <span className="line-through">R$ 59,00</span></p>
          </div>

        </div>
      </section>

      {/* AUTHORITY SECTION */}
      <section className="py-24 max-w-6xl mx-auto px-6 md:px-12 border-b border-white/5 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Photo */}
          <div className="lg:col-span-5 relative group justify-self-center lg:justify-self-start">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#00FF41]/40 to-transparent rounded-2xl blur-lg opacity-40" />
            <img 
              src={entrepreneurImg} 
              alt="Augusto Dev - Autor do Ebook" 
              className="rounded-xl border border-white/10 max-w-sm w-full h-auto object-cover filter saturate-75 shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Bio copy text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs text-[#00FF41] font-bold uppercase tracking-[0.2em] block">
              // SOBRE O AUTOR
            </span>
            <h3 className="font-serif text-3xl font-extrabold tracking-tight text-white">
              Quem é Augusto Dev?
            </h3>
            <p className="font-sans text-sm text-gray-300 leading-relaxed">
              Desenvolvedor de software sênior, especialista em automação corporativa com Inteligência Artificial e fundador de agência de desenvolvimento sob medida.
            </p>
            <p className="font-sans text-sm text-gray-400 leading-relaxed">
              Ao longo dos últimos anos, projetei e implementei arquiteturas inteligentes para mais de 120 empresas nacionais e internacionais, ajudando fundadores a recuperarem a liberdade de tempo e focarem estritamente no estratégico. Este e-book reúne as estratégias operacionais secretas e processos no-code que costumam custar dezenas de milhares de reais nas minhas mentorias e projetos privados de consultoria corporativa.
            </p>
          </div>

        </div>
      </section>

      {/* PRICING TABLE (THE CLOSING COMPONENT) */}
      <section className="py-24 max-w-6xl mx-auto px-6 md:px-12 text-center space-y-12">
        <div className="space-y-4 max-w-3xl mx-auto">
          <span className="font-mono text-xs text-[#00FF41] font-bold uppercase tracking-[0.2em] block">
            // INVESTIMENTO IRRISÓRIO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Adquira o Seu Passaporte para a Liberdade Operacional
          </h2>
          <p className="font-sans text-sm text-gray-400 max-w-2xl mx-auto">
            Ao se automatizar, você não está comprando um arquivo PDF. Você está economizando horas diárias de retrabalho exaustivo e estresse de liderança.
          </p>
        </div>

        <div className="max-w-md mx-auto relative mt-16 text-left">
          {/* Border glowing wrapper */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF41] to-[#008F21] rounded-2xl blur-md opacity-25" />
          
          <div className="relative bg-black border border-[#00FF41]/40 rounded-2xl p-8 md:p-10 space-y-8 shadow-2xl">
            <div className="space-y-2 border-b border-white/5 pb-6">
              <div className="inline-block px-3 py-1 rounded bg-[#00FF41]/10 text-[#00FF41] font-mono text-[9px] uppercase tracking-wider font-extrabold mb-2">
                PACOTE ANUAL EXCLUSIVO
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">E-book + Bônus Completos</h3>
              <p className="font-sans text-xs text-gray-400 leading-relaxed">
                Tudo o que você precisa para assumir o controle da sua empresa de ponta a ponta.
              </p>
            </div>

            {/* Price section */}
            <div className="space-y-1 text-left">
              <span className="font-mono text-xs text-gray-500 line-through">De R$ 97,00</span>
              <div className="flex items-baseline space-x-2">
                <span className="font-serif text-4xl sm:text-5xl font-black text-[#00FF41]">R$ 29,90</span>
                <span className="font-mono text-xs text-gray-400 font-bold uppercase">Pagamento único</span>
              </div>
              <span className="font-sans text-[11px] text-gray-400 block pt-1">
                Sem mensalidade, sem taxas adicionais. Chave Pix gerada no atendimento.
              </span>
            </div>

            {/* List of items included */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start space-x-2.5 text-xs text-gray-300">
                <Check className="h-4.5 w-4.5 text-[#00FF41] shrink-0 mt-0.5" />
                <span><strong>E-book Oficial</strong> O Império da Automação (148 págs.)</span>
              </div>
              <div className="flex items-start space-x-2.5 text-xs text-gray-300">
                <Check className="h-4.5 w-4.5 text-[#00FF41] shrink-0 mt-0.5" />
                <span className="text-[#00FF41]"><strong>Bônus 1:</strong> Biblioteca de Prompts de Elite</span>
              </div>
              <div className="flex items-start space-x-2.5 text-xs text-gray-300">
                <Check className="h-4.5 w-4.5 text-[#00FF41] shrink-0 mt-0.5" />
                <span className="text-[#00FF41]"><strong>Bônus 2:</strong> Planilha de Diagnóstico Operacional</span>
              </div>
              <div className="flex items-start space-x-2.5 text-xs text-gray-300">
                <Check className="h-4.5 w-4.5 text-[#00FF41] shrink-0 mt-0.5" />
                <span className="text-[#00FF41]"><strong>Bônus 3:</strong> Template de Dashboard de Leads</span>
              </div>
              <div className="flex items-start space-x-2.5 text-xs text-gray-300">
                <Check className="h-4.5 w-4.5 text-[#00FF41] shrink-0 mt-0.5" />
                <span>Atualizações gratuitas vitalícias</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleWhatsAppRedirect("Completo com Bônus - R$ 29,90")}
                className="w-full py-4 rounded-xl bg-[#00FF41] hover:bg-[#00D135] text-black font-sans text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(0,255,65,0.15)] flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <MessageSquare className="h-4.5 w-4.5 fill-current" />
                <span>COMPRAR PELO WHATSAPP PIX</span>
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-gray-400 uppercase tracking-widest font-semibold">
                <ShieldCheck className="h-4 w-4 text-[#00FF41]" />
                <span>Reembolso incondicional garantido por 7 dias</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 max-w-4xl mx-auto px-6 md:px-12 border-b border-white/5 text-left">
        <div className="text-center space-y-4 mb-16">
          <span className="font-mono text-xs text-[#00FF41] font-bold uppercase tracking-[0.2em] block">
            // CENTRAL DE RESPOSTAS
          </span>
          <h2 className="font-serif text-3xl font-extrabold tracking-tight text-white">
            Perguntas Frequentes
          </h2>
          <p className="font-sans text-sm text-gray-400">
            Ficou com alguma dúvida? Confira as respostas rápidas para as principais perguntas dos leitores.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-white/[0.01] border border-white/5 rounded-xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none cursor-pointer hover:bg-white/[0.02]"
              >
                <span className="font-serif text-sm sm:text-base font-bold text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`h-4.5 w-4.5 text-gray-400 shrink-0 transition-transform duration-300 ${activeFaq === idx ? "rotate-180 text-[#00FF41]" : ""}`} 
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
                    <div className="px-6 pb-6 pt-1 border-t border-white/5 font-sans text-xs sm:text-sm text-gray-400 leading-relaxed">
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
        <div className="relative bg-gradient-to-r from-[#00FF41]/10 via-black to-[#008F21]/10 rounded-2xl p-8 sm:p-12 md:p-16 border border-[#00FF41]/30 overflow-hidden space-y-6">
          <div className="absolute inset-0 bg-black/45 pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
            <span className="font-mono text-xs text-[#00FF41] font-bold uppercase tracking-[0.25em] block animate-pulse">
              ⏱ A DECISÃO ESTÁ NAS SUAS MÃOS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Daqui a um ano, você gostaria de ter começado a automatizar a sua empresa HOJE?
            </h2>
            <p className="font-sans text-sm text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Garanta agora o e-book com 70% de desconto e mude a forma como gerencia o seu negócio. Caso não goste, basta pedir o reembolso. Sem estresse.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleWhatsAppRedirect("CTA Final - R$ 29,90")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#00FF41] hover:bg-[#00D135] text-black font-sans text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl cursor-pointer"
              >
                <MessageSquare className="h-4.5 w-4.5 fill-current" />
                <span>ADQUIRIR E-BOOK COMPLETO (PIX R$ 29,90)</span>
              </button>

              <button
                onClick={() => window.open("https://wa.me/5515997118125?text=Ola%20Augusto!%20Fiquei%20com%20uma%20duvida%20antes%20de%20comprar%20o%20e-book%20O%20Imperio%20da%20Automacao.%20Pode%20me%20ajudar?", "_blank")}
                className="w-full sm:w-auto px-6 py-4 rounded-xl border border-white/20 bg-transparent text-white hover:bg-white/5 font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2"
              >
                <span>TIRAR DÚVIDA COM CORRETOR</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-500 py-12 border-t border-white/5 text-center text-xs space-y-4">
        <p className="font-serif text-white tracking-widest text-sm uppercase">AUGUSTO DEV // O IMPÉRIO DA AUTOMAÇÃO</p>
        <p className="font-mono text-[9px] uppercase tracking-wider">CNPJ: 54.123.456/0001-99 // Todos os direitos reservados</p>
        <p className="font-sans text-[10px] text-gray-600 max-w-md mx-auto leading-relaxed">
          Este produto não garante resultados financeiros exatos. O sucesso das automações depende estritamente da correta aplicação do passo a passo técnico nas respectivas plataformas contratadas.
        </p>
      </footer>

    </div>
  );
}
