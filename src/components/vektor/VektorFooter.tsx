import React from 'react';
import { VektorTab } from '../../types/vektor';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Award,
  Clock,
  Sparkles
} from 'lucide-react';

interface VektorFooterProps {
  setActiveTab: (tab: VektorTab) => void;
}

export const VektorFooter: React.FC<VektorFooterProps> = ({ setActiveTab }) => {
  const handleLinkClick = (tab: VektorTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-300 font-sans pt-16 pb-12 relative overflow-hidden">
      {/* Background Subtle Accent Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-950/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Top Callout Box */}
        <div className="bg-gradient-to-r from-[#161816] via-[#1A1C1A] to-[#121312] border border-emerald-500/30 rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Transforme Sua Gestão Financeira
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
              Pronto para uma contabilidade estratégica de verdade?
            </h3>
            <p className="text-xs text-stone-400 font-serif leading-relaxed">
              Agende um diagnóstico tributário gratuito com nossos sócios e descubra oportunidades legais de redução de impostos para seu negócio.
            </p>
          </div>

          <button
            onClick={() => handleLinkClick('diagnostico')}
            className="px-6 py-4 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider rounded-2xl transition shadow-xl shrink-0 flex items-center space-x-2"
          >
            <span>Iniciar Diagnóstico Gratuito</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-6">
          {/* Brand & Address Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center text-emerald-400 font-serif font-bold text-lg">
                  V
                </div>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  VEKTOR
                </span>
                <span className="text-[9px] font-mono text-stone-400 tracking-wider uppercase block -mt-1">
                  Contabilidade & Inteligência Tributária
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 font-serif leading-relaxed pr-4">
              A Vektor é uma empresa de serviços contábeis e consultoria tributária de alta performance. Combinamos automação digital segura com assessoria humana próxima para acelerar o crescimento de empresas modernas.
            </p>

            <div className="space-y-2 font-mono text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Av. Paulista, 1842 - Conj. 1210, Bela Vista, São Paulo - SP</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>(11) 3280-9000 • (11) 99882-1100 (WhatsApp)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>contato@vektorcontabilidade.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Segunda a Sexta, das 08h30 às 18h00</span>
              </div>
            </div>
          </div>

          {/* Column 2: Soluções */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase text-stone-200 font-bold tracking-wider">Soluções</h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-sans">
              <li>
                <button onClick={() => handleLinkClick('servicos')} className="hover:text-emerald-400 transition">
                  Contabilidade Consultiva 360°
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('diagnostico')} className="hover:text-emerald-400 transition">
                  Planejamento Tributário
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('bpo-financeiro')} className="hover:text-emerald-400 transition">
                  BPO Financeiro Terceirizado
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('servicos')} className="hover:text-emerald-400 transition">
                  Gestão de Folha & eSocial
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('servicos')} className="hover:text-emerald-400 transition">
                  Compliance Fiscal & SPED
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('servicos')} className="hover:text-emerald-400 transition">
                  CFO-as-a-Service
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Jornadas Especiais */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase text-stone-200 font-bold tracking-wider">Jornadas</h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-sans">
              <li>
                <button onClick={() => handleLinkClick('abrir-empresa')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Abertura de Empresa (R$ 0)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('trocar-contabilidade')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Trocar de Contabilidade</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('diagnostico')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Simulador de Impostos</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('area-cliente')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>Portal do Cliente Vektor</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Institucional & Credenciais */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs uppercase text-stone-200 font-bold tracking-wider">Certificações</h4>
            <div className="space-y-3 font-mono text-[10px] text-stone-400">
              <div className="p-3 bg-stone-900 border border-stone-800 rounded-xl space-y-1">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                  <Award className="w-4 h-4" />
                  <span>CRC/SP Nº 2SP034891/O</span>
                </div>
                <p className="text-[10px] text-stone-400">Regularidade no Conselho Regional de Contabilidade</p>
              </div>

              <div className="p-3 bg-stone-900 border border-stone-800 rounded-xl space-y-1">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>LGPD & ISO 27001 Compliant</span>
                </div>
                <p className="text-[10px] text-stone-400">Criptografia bancária de dados fiscais</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500">
          <div>
            © 2026 Vektor Contabilidade Estratégica LTDA • CNPJ: 38.991.028/0001-92. Todos os direitos reservados.
          </div>

          <div className="flex items-center space-x-4">
            <span className="hover:text-stone-400 cursor-pointer">Termos de Uso</span>
            <span>•</span>
            <span className="hover:text-stone-400 cursor-pointer">Política de Privacidade</span>
            <span>•</span>
            <span className="hover:text-stone-400 cursor-pointer">Mapa do Site</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
