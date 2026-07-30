import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  UserCheck, 
  Zap, 
  ShieldCheck, 
  Search, 
  Briefcase, 
  TrendingUp, 
  BrainCircuit, 
  MessageSquare, 
  ChevronDown, 
  Star, 
  Clock, 
  Award,
  Users
} from 'lucide-react';

interface RHLandingPageProps {
  onSearchJobsClick: () => void;
  onCandidateRegisterClick: () => void;
  onCompanyRegisterClick: () => void;
  onDemoCandidateClick: () => void;
  onDemoCompanyClick: () => void;
}

export const RHLandingPage: React.FC<RHLandingPageProps> = ({
  onSearchJobsClick,
  onCandidateRegisterClick,
  onCompanyRegisterClick,
  onDemoCandidateClick,
  onDemoCompanyClick
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Como funciona a triagem e o Score de Inteligência Artificial?',
      a: 'Nossa IA analisa automaticamente o currículo do candidato em segundos, comparando as hard skills, soft skills, histórico profissional e pretensão com os requisitos da vaga. Ela gera uma nota de aderência de 0 a 100% com resumo detalhado, sem jamais tomar decisões eliminatórias sozinhas.'
    },
    {
      q: 'Quais são os planos para empresas e o período de testes?',
      a: 'Todas as novas empresas cadastradas recebem 7 dias de acesso gratuito completo para testar a publicação de vagas e a triagem por IA. Após o período, você pode optar pelo Plano Mensal (R$ 299/mês) ou Plano Premium (R$ 599/mês).'
    },
    {
      q: 'A plataforma é gratuita para candidatos?',
      a: 'Sim, 100% gratuita para candidatos! Você pode criar seu perfil profissional, anexar currículo em PDF, receber recomendações personalizadas de vagas e acompanhar todo o status do seu processo seletivo em tempo real.'
    },
    {
      q: 'A RH Connect atende a LGPD e privacidade de dados?',
      a: 'Sim, seguimos rigorosamente todas as diretrizes da LGPD (Lei Geral de Proteção de Dados). O candidato possui total controle sobre quais empresas visualizam suas informações e pode exportar ou excluir seus dados a qualquer momento.'
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-16 sm:py-24">
        
        {/* Subtle Decorative Background Blurs (Light Theme) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-xs font-bold font-mono">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Recrutamento & Seleção com Inteligência Artificial</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                Conecte os melhores <span className="text-blue-600">talentos</span> às melhores <span className="text-blue-600">empresas</span> com IA.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                Reduza o tempo de contratação em até 70%. A RH Connect unifica divulgação de vagas, triagem automatizada com Score de Aderência, agendamento de entrevistas e chat integrado em uma única plataforma limpa e intuitiva.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onSearchJobsClick}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-600/25 transition flex items-center space-x-2 cursor-pointer group"
                >
                  <Search className="w-4 h-4" />
                  <span>Encontrar Vagas de Emprego</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onCompanyRegisterClick}
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm rounded-2xl border-2 border-slate-200 transition flex items-center space-x-2 cursor-pointer shadow-xs"
                >
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Cadastrar Empresa (7 dias grátis)</span>
                </button>
              </div>

              {/* Demo Shortcuts */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                <span className="font-bold text-slate-700">Explorar Demonstração Instantânea:</span>
                <button 
                  onClick={onDemoCandidateClick}
                  className="text-blue-600 font-bold hover:underline underline-offset-4 flex items-center space-x-1"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Ver Painel Candidato</span>
                </button>
                <span className="text-slate-300">•</span>
                <button 
                  onClick={onDemoCompanyClick}
                  className="text-blue-600 font-bold hover:underline underline-offset-4 flex items-center space-x-1"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Ver Painel Empresa</span>
                </button>
              </div>

              {/* Social Proof Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 text-left">
                <div className="border-l-2 border-blue-600 pl-3">
                  <span className="block text-xl font-black text-slate-900">+15.000</span>
                  <span className="text-xs text-slate-500">Candidatos Cadastrados</span>
                </div>
                <div className="border-l-2 border-emerald-500 pl-3">
                  <span className="block text-xl font-black text-slate-900">70%</span>
                  <span className="text-xs text-slate-500">Redução de Tempo RH</span>
                </div>
                <div className="border-l-2 border-amber-500 pl-3">
                  <span className="block text-xl font-black text-slate-900">98%</span>
                  <span className="text-xs text-slate-500">Precisão na Triagem IA</span>
                </div>
              </div>

            </div>

            {/* Right Column: Visual Product Mockup Card */}
            <div className="lg:col-span-5 relative">
              
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4 relative z-10 text-left">
                
                {/* Header Mockup */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                      TS
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">Tech Solutions</h4>
                      <p className="text-[11px] text-slate-500">Dev Full Stack Senior (React/Node)</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-200">
                    Processo Ativo
                  </span>
                </div>

                {/* Candidate High-Match Card */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-3">
                      <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" 
                        alt="Mariana Souza" 
                        className="w-11 h-11 rounded-xl object-cover border border-white shadow-xs"
                      />
                      <div>
                        <h5 className="font-extrabold text-sm text-slate-900">Mariana Souza</h5>
                        <p className="text-xs text-slate-600 font-medium">6 anos exp • São Paulo, SP</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="inline-flex items-center px-2.5 py-1 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        <span>94% Match</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 font-normal leading-snug bg-white p-2.5 rounded-xl border border-blue-100">
                    "Análise IA: Altíssima aderência técnica em React, Node.js e TypeScript. Experiência em microsserviços."
                  </p>

                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">React</span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">Node.js</span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">TypeScript</span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">AWS</span>
                  </div>
                </div>

                {/* Status Timeline Snippet */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Etapa do Candidato:</span>
                  <span className="px-2.5 py-1 bg-blue-600 text-white rounded-lg font-bold">
                    Entrevista Agendada
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. Benefits Section */}
      <section id="beneficios" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Recrutamento sem fricção tanto para Empresas quanto para Candidatos
            </h2>
            <p className="text-base text-slate-600 font-medium">
              A RH Connect une automação inteligente com humanização para garantir contratações mais assertivas e rápidas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            {/* Benefit Card 1 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Triagem Automática por IA</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Nossos algoritmos analisam o currículo de cada inscrito em relação aos requisitos da vaga, gerando um ranking instantâneo por Score de Aderência.
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Comunicação e Chat Direto</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Mantenha contato direto entre recrutadores e profissionais. Agende entrevistas no Google Meet ou Teams com um clique dentro da plataforma.
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Kanban & Gestão de Vagas</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Visualize todo o funil do processo seletivo: desde o recebimento do currículo até o teste técnico e a aprovação final.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. How It Works (6 Steps) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Fluxo Completo de Contratação
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Como funciona o RH Connect em 6 passos simples
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 text-left">
            {[
              { step: '01', title: 'Cadastro', desc: 'Criar conta como candidato ou empresa' },
              { step: '02', title: 'Criar Perfil', desc: 'Preencher dados, habilidades e currículo PDF' },
              { step: '03', title: 'Publicar Vaga', desc: 'Definir requisitos, salário e benefícios' },
              { step: '04', title: 'IA Analisa', desc: 'Algoritmo calcula o Score de cada candidato' },
              { step: '05', title: 'Entrevista', desc: 'Agendar conversas via chat e Meet' },
              { step: '06', title: 'Contratação', desc: 'Enviar proposta comercial e fechar contratação' }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 relative">
                <span className="text-2xl font-black text-blue-600 font-mono">{item.step}</span>
                <h4 className="font-extrabold text-sm text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Pricing / Plans Section */}
      <section id="planos" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Planos transparentes para empresas de todos os portes
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Experimente 7 dias totalmente grátis. Cancele quando quiser, sem fidelidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            
            {/* Free Trial Plan */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-xs font-bold">
                  Degustação
                </span>
                <h3 className="text-2xl font-black text-slate-900">7 Dias Grátis</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-black text-slate-900">R$ 0</span>
                  <span className="text-xs text-slate-500 font-bold ml-1">/ por 7 dias</span>
                </div>
                <p className="text-xs text-slate-600">Ideal para testar a plataforma e publicar sua primeira vaga urgente.</p>

                <ul className="space-y-3 text-xs text-slate-700 font-medium pt-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Até 2 Vagas Ativas simultâneas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Triagem de IA ilimitada por vaga</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Chat direto com até 15 candidatos</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onCompanyRegisterClick}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs rounded-xl transition cursor-pointer"
              >
                Começar Teste Grátis
              </button>
            </div>

            {/* Monthly Plan (Featured) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-blue-600 shadow-xl space-y-6 flex flex-col justify-between relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xs">
                Mais Popular
              </div>

              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-mono text-xs font-bold">
                  Empresarial
                </span>
                <h3 className="text-2xl font-black text-slate-900">Plano Mensal</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-black text-slate-900">R$ 299</span>
                  <span className="text-xs text-slate-500 font-bold ml-1">/mês</span>
                </div>
                <p className="text-xs text-slate-600">Para empresas em crescimento constante que recrutam mensalmente.</p>

                <ul className="space-y-3 text-xs text-slate-700 font-medium pt-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Até 10 Vagas Ativas por mês</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Score de Aderência e Ranking IA completo</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Chat e Agendamento de Entrevistas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Suporte prioritário via WhatsApp</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onCompanyRegisterClick}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer"
              >
                Assinar Plano Mensal
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-mono text-xs font-bold">
                  Corporativo
                </span>
                <h3 className="text-2xl font-black text-slate-900">Plano Premium</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-black text-slate-900">R$ 599</span>
                  <span className="text-xs text-slate-500 font-bold ml-1">/mês</span>
                </div>
                <p className="text-xs text-slate-600">Para grandes empresas e consultorias com alto volume de vagas.</p>

                <ul className="space-y-3 text-xs text-slate-700 font-medium pt-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Vagas Ilimitadas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Busca Ativa de Candidatos com Filtro IA</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Múltiplos recrutadores e permissões</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Gerente de Conta dedicado</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onCompanyRegisterClick}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition cursor-pointer"
              >
                Assinar Plano Premium
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Mock Testimonials */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              O que dizem os nossos clientes
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Empresas e profissionais que transformaram suas contratações com a RH Connect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "A triagem por IA da RH Connect reduziu o tempo que gastávamos lendo centenas de currículos irrelevantes de 3 semanas para apenas 2 dias. Fechamos 4 vagas em um único mês!"
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  AR
                </div>
                <div>
                  <h5 className="font-extrabold text-xs text-slate-900">Amanda Ribeiro</h5>
                  <p className="text-[10px] text-slate-500">Head de Gente • Tech Solutions</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "Como candidata, adorava acompanhar o status da minha candidatura em cada etapa sem ficar no 'vácuo'. Consegui minha recolocação como Dev Senior em 12 dias."
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" 
                  alt="Mariana Souza" 
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <h5 className="font-extrabold text-xs text-slate-900">Mariana Souza</h5>
                  <p className="text-[10px] text-slate-500">Desenvolvedora Full Stack</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "A interface é extremamente limpa e fácil de usar. Os relatórios de aderência nos ajudaram a identificar candidatos com forte match cultural."
              </p>
              <div className="flex items-center space-x-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  RM
                </div>
                <div>
                  <h5 className="font-extrabold text-xs text-slate-900">Roberto Magalhães</h5>
                  <p className="text-[10px] text-slate-500">Tech Recruiter • Blue Soft</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Perguntas Frequentes
            </h2>
            <p className="text-sm text-slate-600">Tire suas dúvidas sobre o funcionamento da RH Connect</p>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center font-extrabold text-sm text-slate-900 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaqIndex === idx ? 'rotate-180 text-blue-600' : ''}`} />
                </button>

                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-white py-12 text-slate-600 text-xs font-sans border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
            <div className="space-y-3">
              <span className="text-lg font-black text-slate-900">
                RH<span className="text-blue-600">Connect</span>
              </span>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Plataforma inteligente de recrutamento e seleção que conecta empresas e candidatos com auxílio de Inteligência Artificial.
              </p>
            </div>

            <div>
              <h5 className="font-extrabold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">Candidatos</h5>
              <ul className="space-y-2 font-medium">
                <li><button onClick={onSearchJobsClick} className="hover:text-blue-600 transition">Buscar Vagas</button></li>
                <li><button onClick={onCandidateRegisterClick} className="hover:text-blue-600 transition">Criar Currículo</button></li>
                <li><button onClick={onDemoCandidateClick} className="hover:text-blue-600 transition">Área do Candidato</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-extrabold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">Empresas</h5>
              <ul className="space-y-2 font-medium">
                <li><button onClick={onCompanyRegisterClick} className="hover:text-blue-600 transition">Cadastrar Empresa</button></li>
                <li><button onClick={onDemoCompanyClick} className="hover:text-blue-600 transition">Painel de Vagas</button></li>
                <li><a href="#planos" className="hover:text-blue-600 transition">Planos e Preços</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-extrabold text-slate-900 mb-3 uppercase tracking-wider text-[11px]">Conformidade</h5>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Plataforma 100% em conformidade com a LGPD (Lei Geral de Proteção de Dados). Seus dados protegidos com criptografia.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 font-mono">
            <p>© 2026 RH Connect — Plataforma Inteligente de Recrutamento. Todos os direitos reservados.</p>
            <p>Protótipo para Portfólio de Engenharia de Software</p>
          </div>

        </div>
      </footer>

    </div>
  );
};
