import React from 'react';
import { VektorTab } from '../../types/vektor';
import { 
  Building2, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  Cpu, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

interface VektorAboutSectionProps {
  setActiveTab: (tab: VektorTab) => void;
}

export const VektorAboutSection: React.FC<VektorAboutSectionProps> = ({ setActiveTab }) => {
  const teamMembers = [
    {
      name: 'Dr. Rodrigo Fontes',
      role: 'Sócio Fundador & Head de Inteligência Tributária',
      crc: 'CRC/SP 1SP298340/O',
      bio: 'Especialista em Direito Tributário pela FGV. Mais de 14 anos orientando empresas de tecnologia e serviços de grande porte.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Mariana Costa, CPA',
      role: 'Sócia & Diretora de Operações Contábeis',
      crc: 'CRC/SP 2SP384912/O',
      bio: 'Contadora especialista em IFRS, balancetes consolidados e gestão de compliance de empresas optantes pelo Lucro Presumido e Real.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Felipe Santana',
      role: 'Head de BPO Financeiro & CFO-as-a-Service',
      crc: 'CRA/SP 49102',
      bio: 'Ex-consultor Big 4 com vasta experiência em estruturação de fluxo de caixa projetado, M&A e valoração de startups.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Manifesto */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 font-mono text-xs uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" />
            <span>Nossa Filosofia</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-stone-100 leading-tight">
            Nascemos para ressignificar a relação entre <span className="italic font-normal text-emerald-400">empresários e a contabilidade.</span>
          </h2>

          <div className="space-y-4 font-serif text-stone-300 text-sm leading-relaxed">
            <p>
              Durante décadas, a contabilidade no Brasil foi vista como um mal necessário: um centro de custos distante, focado apenas em emitir guias de impostos e cumprir exigências burocráticas do Fisco.
            </p>
            <p>
              A Vektor nasceu com uma missão diferente. Combinando tecnologia de ponta com atendimento humanizado por especialistas seniores, transformamos os dados da sua empresa em uma bússola para aumentar o lucro, cortar desperdícios tributários e garantir blindagem fiscal.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
            <div className="p-4 bg-stone-900 border border-stone-800 rounded-2xl flex items-center space-x-3">
              <Award className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">CRC/SP Ativo</span>
                <span className="text-[10px] text-stone-400">Regularidade total garantida</span>
              </div>
            </div>

            <div className="p-4 bg-stone-900 border border-stone-800 rounded-2xl flex items-center space-x-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white block">Segurança de Dados</span>
                <span className="text-[10px] text-stone-400">Conformidade com a LGPD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Office Image */}
        <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-stone-800 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" 
            alt="Escritório Vektor Contabilidade"
            className="w-full h-96 object-cover filter contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 p-4 bg-stone-950/90 backdrop-blur-md rounded-2xl border border-stone-800">
            <span className="font-mono text-xs text-emerald-400 font-bold block">Sede Avenida Paulista — SP</span>
            <span className="text-[11px] font-serif text-stone-300">Atendimento 100% digital em todo o Brasil com presença estratégica.</span>
          </div>
        </div>
      </div>

      {/* Team Profiles */}
      <div className="space-y-8">
        <div className="border-b border-stone-800 pb-4">
          <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-widest block">
            Liderança & Especialistas
          </span>
          <h3 className="font-serif text-3xl font-light text-stone-100">
            Quem cuida da inteligência contábil da sua empresa
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-[#181918] border border-stone-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-emerald-500/30"
                  />
                  <div>
                    <h4 className="font-serif text-lg font-bold text-stone-100">{member.name}</h4>
                    <span className="font-mono text-[10px] text-emerald-400 block font-bold">{member.crc}</span>
                  </div>
                </div>

                <p className="text-xs font-mono text-stone-400">{member.role}</p>
                <p className="text-xs font-serif text-stone-300 leading-relaxed">{member.bio}</p>
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-between font-mono text-[10px] text-emerald-400 font-bold">
                <span>✓ Contador Consultor Designado</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Bar */}
      <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-8 space-y-4">
        <span className="font-mono text-xs text-stone-400 uppercase font-bold tracking-wider block text-center">
          Tecnologias & Softwares Integrados no Ecossistema Vektor
        </span>
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-stone-300 opacity-80">
          <span className="px-4 py-2 bg-stone-950 border border-stone-800 rounded-xl">Domínio Sistemas (Thomson Reuters)</span>
          <span className="px-4 py-2 bg-stone-950 border border-stone-800 rounded-xl">Omie ERP</span>
          <span className="px-4 py-2 bg-stone-950 border border-stone-800 rounded-xl">Conta Azul</span>
          <span className="px-4 py-2 bg-stone-950 border border-stone-800 rounded-xl">eSocial / e-CAC API</span>
          <span className="px-4 py-2 bg-stone-950 border border-stone-800 rounded-xl">NFe.io Automation</span>
        </div>
      </div>
    </div>
  );
};
