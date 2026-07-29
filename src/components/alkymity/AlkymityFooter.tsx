import React from 'react';
import { AlkymityTab } from '../../types/alkymity';
import { Compass, Mail, MapPin, Phone, Instagram, Facebook, Youtube, ShieldCheck } from 'lucide-react';

interface AlkymityFooterProps {
  setActiveTab: (tab: AlkymityTab) => void;
}

export const AlkymityFooter: React.FC<AlkymityFooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#0C0D0C] border-t border-stone-800 text-stone-400 pt-16 pb-12 font-sans relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Intro Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-stone-200 text-stone-950 flex items-center justify-center font-serif font-bold text-lg">
                A
              </div>
              <span className="font-serif text-xl tracking-[0.2em] text-white uppercase font-light">
                ALKYMITY
              </span>
            </div>
            <p className="text-sm text-stone-300 font-serif leading-relaxed max-w-sm">
              Move. Nourish. Connect. Transform. Um ecossistema de bem-estar premium sediado no arquipélago das Ilhas Galápagos. Integração harmoniosa entre movimento consciente, alta gastronomia funcional, hospitalidade boutique e comunidade.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-xs font-mono text-emerald-400">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Av. Charles Darwin, Puerto Ayora, Galápagos</span>
            </div>
          </div>

          {/* Sub-Brands / Navigation */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-stone-200 uppercase tracking-widest font-bold">
              Submarcas
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('studio')} className="hover:text-emerald-300 transition">
                  Alkymity Studio (Pilates)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('kitchen')} className="hover:text-emerald-300 transition">
                  Alkymity Kitchen (Bistrô)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('running')} className="hover:text-emerald-300 transition">
                  Running Club Galápagos
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('retreats')} className="hover:text-emerald-300 transition">
                  Retiros & Imersões
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('certifications')} className="hover:text-emerald-300 transition">
                  Certificações de Instrutor
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('suites')} className="hover:text-emerald-300 transition">
                  Alkymity Suites & Lodging
                </button>
              </li>
            </ul>
          </div>

          {/* Ecossistema & Serviços */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-stone-200 uppercase tracking-widest font-bold">
              Plataforma Digital
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('experiences')} className="hover:text-emerald-300 transition">
                  Experiências Exclusivas
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('membership')} className="hover:text-emerald-300 transition">
                  Planos & Assinaturas
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('member-portal')} className="hover:text-emerald-300 transition">
                  Área do Membro (Portal VIP)
                </button>
              </li>
              <li>
                <span className="text-stone-500">Integração FITCO API (Simulada)</span>
              </li>
              <li>
                <span className="text-stone-500">Checkout Stripe / PayPal</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-stone-200 uppercase tracking-widest font-bold">
              Comunidade Alkymity
            </h4>
            <p className="text-xs text-stone-400">
              Receba convites prioritários para retiros, novas turmas de Pilates e conteúdos sobre estilo de vida em Galápagos.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Inscrição confirmada na newsletter Alkymity!'); }} className="space-y-2">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail..." 
                required
                className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500/60"
              />
              <button 
                type="submit"
                className="w-full py-2 bg-emerald-950 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 font-mono text-xs uppercase tracking-wider rounded-lg transition"
              >
                Inscrever-se
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 space-y-4 md:space-y-0 font-mono">
          <div>
            © {new Date().getFullYear()} Alkymity Galápagos. Todos os direitos reservados.
          </div>
          <div className="flex items-center space-x-6">
            <span className="hover:text-stone-300 cursor-pointer">Termos de Uso</span>
            <span className="hover:text-stone-300 cursor-pointer">Política de Privacidade</span>
            <span className="hover:text-stone-300 cursor-pointer">Galápagos Conservation Partnership</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
