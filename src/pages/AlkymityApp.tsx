import React, { useState } from 'react';
import { 
  AlkymityTab, 
  PilatesClass, 
  MenuItem, 
  RunEvent, 
  RetreatItem, 
  SuiteItem, 
  WellnessExperience, 
  CertificationProgram, 
  MemberProfile, 
  CartItem 
} from '../types/alkymity';
import { 
  INITIAL_CLASSES, 
  INITIAL_MENU, 
  INITIAL_RUNS, 
  INITIAL_RETREATS, 
  INITIAL_SUITES, 
  INITIAL_EXPERIENCES, 
  INITIAL_CERTIFICATIONS, 
  INITIAL_MEMBER_PROFILE 
} from '../data/alkymityData';
import { AlkymityHeader } from '../components/alkymity/AlkymityHeader';
import { AlkymityFooter } from '../components/alkymity/AlkymityFooter';
import { StudioSection } from '../components/alkymity/StudioSection';
import { KitchenSection } from '../components/alkymity/KitchenSection';
import { RunningClubSection } from '../components/alkymity/RunningClubSection';
import { RetreatsSection } from '../components/alkymity/RetreatsSection';
import { SuitesSection } from '../components/alkymity/SuitesSection';
import { ExperiencesSection } from '../components/alkymity/ExperiencesSection';
import { MemberAreaSection } from '../components/alkymity/MemberAreaSection';
import { BookingCheckoutModal } from '../components/alkymity/BookingCheckoutModal';
import { 
  Sparkles, 
  Compass, 
  Coffee, 
  Activity, 
  Award, 
  BedDouble, 
  Calendar, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  MapPin, 
  Star, 
  Users, 
  HeartPulse, 
  X 
} from 'lucide-react';

interface AlkymityAppProps {
  onBack?: () => void;
}

export const AlkymityApp: React.FC<AlkymityAppProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<AlkymityTab>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // App State Data
  const [classes] = useState<PilatesClass[]>(INITIAL_CLASSES);
  const [menu] = useState<MenuItem[]>(INITIAL_MENU);
  const [runs] = useState<RunEvent[]>(INITIAL_RUNS);
  const [retreats] = useState<RetreatItem[]>(INITIAL_RETREATS);
  const [suites] = useState<SuiteItem[]>(INITIAL_SUITES);
  const [experiences] = useState<WellnessExperience[]>(INITIAL_EXPERIENCES);
  const [certifications] = useState<CertificationProgram[]>(INITIAL_CERTIFICATIONS);
  const [member] = useState<MemberProfile>(INITIAL_MEMBER_PROFILE);

  const handleAddToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === newItem.id);
      if (existing) {
        return prev.map(item => item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, newItem];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-stone-100 font-sans selection:bg-emerald-500/30 selection:text-white flex flex-col justify-between antialiased">
      {/* Navigation Header */}
      <AlkymityHeader 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        setIsAuthOpen={setIsAuthOpen}
        onBackToPortfolio={onBack}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* VIEW 1: HOME / ECOSYSTEM OVERVIEW */}
        {activeTab === 'home' && (
          <div className="space-y-20">
            {/* Editorial Luxury Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 min-h-[550px] flex items-center p-8 sm:p-16 text-white shadow-2xl">
              <div className="absolute inset-0 z-0 opacity-40">
                <img 
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80" 
                  alt="Galápagos Archipelago Wilderness" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent" />
              </div>

              <div className="relative z-10 max-w-2xl space-y-6">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 font-mono text-xs uppercase tracking-widest backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Galápagos Luxury Wellness Sanctuary</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight leading-[1.1] text-stone-100">
                  Move. Nourish. <br />
                  Connect. <span className="italic font-normal text-emerald-400">Transform.</span>
                </h1>

                <p className="text-stone-300 font-serif text-base sm:text-lg leading-relaxed font-light">
                  Uma plataforma holística onde Pilates Reformer de alta precisão, gastronomia funcional orgânica, corridas vulcânicas e hospitalidade boutique se fundem na energia intocada das Ilhas Galápagos.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveTab('studio')}
                    className="px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-lg flex items-center space-x-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Agendar Aula no Studio</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('retreats')}
                    className="px-6 py-3.5 bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 font-mono text-xs uppercase tracking-wider rounded-xl transition backdrop-blur-md flex items-center space-x-2"
                  >
                    <span>Explorar Retiros 2026</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Ecossistema Alkymity - Sub-Brand Showcase */}
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-bold">O Ecossistema Alkymity</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 font-light">
                  Seis submarcas integradas em uma única jornada de bem-estar
                </h2>
                <p className="text-xs text-stone-400 font-serif">
                  Projetadas com identidade própria e alinhadas sob os mesmos padrões internacionais de luxo e sustentabilidade.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    id: 'studio' as AlkymityTab,
                    title: 'Alkymity Studio',
                    subtitle: 'Pilates Reformer & Mat',
                    desc: 'Aulas no Reformer Allegro 2 com vista para o oceano, focadas em alinhamento e força do core.',
                    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
                    badge: 'FITCO Integrated'
                  },
                  {
                    id: 'kitchen' as AlkymityTab,
                    title: 'Alkymity Kitchen',
                    subtitle: 'Organic Bistrô & Wellness Café',
                    desc: 'Culinária funcional e sucos prensados a frio elaborados com ingredientes orgânicos locais.',
                    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80',
                    badge: '100% Orgânico'
                  },
                  {
                    id: 'running' as AlkymityTab,
                    title: 'Alkymity Running Club',
                    subtitle: 'Comunidade de Trail Running',
                    desc: 'Treinos guiados pelas trilhas vulcânicas e praias preservadas de Galápagos.',
                    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80',
                    badge: 'Comunidade'
                  },
                  {
                    id: 'retreats' as AlkymityTab,
                    title: 'Alkymity Retreats',
                    subtitle: 'Imersões de Transformação',
                    desc: 'Retiros de 5 a 7 dias unindo movimento, breathwork, gastronomia e iate privativo.',
                    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
                    badge: 'Imersão'
                  },
                  {
                    id: 'suites' as AlkymityTab,
                    title: 'Alkymity Suites',
                    subtitle: 'Boutique Luxury Lodging',
                    desc: 'Suítes oceanfront com piscina de borda infinita privativa e enxoval egípcio 800 fios.',
                    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
                    badge: 'Hospedagem VIP'
                  },
                  {
                    id: 'certifications' as AlkymityTab,
                    title: 'Certificações',
                    subtitle: 'Formação Internacional 200h',
                    desc: 'Capacitação de instrutores de Pilates Reformer e facilitadores de Breathwork.',
                    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
                    badge: 'Certificado'
                  }
                ].map(sub => (
                  <div 
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className="bg-[#181918] border border-stone-800 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition duration-300 group cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative h-48 overflow-hidden bg-stone-900">
                      <img 
                        src={sub.image} 
                        alt={sub.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-emerald-300 font-mono text-[10px] border border-emerald-500/30 uppercase font-bold">
                        {sub.badge}
                      </div>
                    </div>

                    <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest">{sub.subtitle}</span>
                        <h3 className="font-serif text-2xl text-stone-100 group-hover:text-emerald-300 transition">{sub.title}</h3>
                        <p className="text-xs text-stone-400 font-serif leading-relaxed mt-1">{sub.desc}</p>
                      </div>

                      <div className="pt-4 flex items-center text-xs font-mono text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                        <span>Acessar Submarca</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Class Preview Widget */}
            <div className="bg-[#161716] border border-stone-800 rounded-3xl p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
                <div>
                  <span className="font-mono text-xs text-emerald-400 uppercase font-bold tracking-widest">Aulas em Destaque Hoje</span>
                  <h3 className="font-serif text-2xl text-stone-100 font-light mt-0.5">Sincronização em tempo real via FITCO</h3>
                </div>
                <button 
                  onClick={() => setActiveTab('studio')}
                  className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Ver todas as 12 aulas disponíveis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {classes.slice(0, 3).map(cls => (
                  <div key={cls.id} className="p-5 bg-stone-900 border border-stone-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="px-2 py-0.5 bg-stone-800 text-stone-300 rounded uppercase font-bold">{cls.category}</span>
                      <span className="text-emerald-400 font-bold">{cls.spotsLeft} vagas restantes</span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-stone-100">{cls.title}</h4>
                    <p className="text-xs text-stone-400 font-mono">{cls.time} • {cls.instructor}</p>

                    <button
                      onClick={() => {
                        handleAddToCart({
                          id: cls.id,
                          type: 'class',
                          title: cls.title,
                          subtitle: `${cls.category} • ${cls.instructor}`,
                          price: cls.price,
                          quantity: 1,
                          date: cls.date,
                          time: cls.time
                        });
                        setIsCartOpen(true);
                      }}
                      className="w-full py-2 bg-emerald-950 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900 text-xs font-mono font-bold uppercase rounded-xl transition"
                    >
                      Reservar (${cls.price})
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-bold">Depoimentos & Comunidade</span>
                <h3 className="font-serif text-3xl text-stone-100 font-light">O que dizem nossos alunos e hóspedes</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    quote: "As aulas no Reformer com vista para as tartarugas e o oceano de Galápagos transformaram completamente minha postura e foco.",
                    author: "Camila Arantes",
                    role: "Membro Founder & Praticante de Pilates",
                    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                  },
                  {
                    quote: "A combinação de alimentação do Alkymity Kitchen após a corrida matinal é incomparável. Insumos orgânicos de altíssima qualidade.",
                    author: "Dr. Roberto Guimarães",
                    role: "Atleta do Running Club Galápagos",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                  },
                  {
                    quote: "O retiro de 7 dias na suíte oceanfront foi a experiência de renovação mais profunda que já vivi. Estrutura de nível mundial.",
                    author: "Sophia Laurent",
                    role: "Participante do Galápagos Rejuvenation Retreat",
                    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  }
                ].map((t, idx) => (
                  <div key={idx} className="p-6 bg-[#181918] border border-stone-800 rounded-2xl space-y-4">
                    <div className="flex items-center space-x-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-stone-300 font-serif leading-relaxed italic">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center space-x-3 pt-2 border-t border-stone-800">
                      <img src={t.avatar} alt={t.author} className="w-9 h-9 rounded-full object-cover border border-stone-700" />
                      <div>
                        <span className="font-serif font-bold text-xs text-stone-100 block">{t.author}</span>
                        <span className="font-mono text-[9px] text-stone-500 block">{t.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: STUDIO */}
        {activeTab === 'studio' && (
          <StudioSection classes={classes} onBookClass={(item) => { handleAddToCart(item); setIsCartOpen(true); }} />
        )}

        {/* VIEW 3: KITCHEN */}
        {activeTab === 'kitchen' && (
          <KitchenSection menu={menu} onAddToCart={(item) => { handleAddToCart(item); setIsCartOpen(true); }} />
        )}

        {/* VIEW 4: RUNNING CLUB */}
        {activeTab === 'running' && (
          <RunningClubSection runs={runs} onRSVPRun={(item) => { handleAddToCart(item); setIsCartOpen(true); }} />
        )}

        {/* VIEW 5: RETREATS & CERTIFICATIONS */}
        {(activeTab === 'retreats' || activeTab === 'certifications') && (
          <RetreatsSection 
            retreats={retreats} 
            certifications={certifications} 
            onBookRetreat={(item) => { handleAddToCart(item); setIsCartOpen(true); }} 
          />
        )}

        {/* VIEW 6: SUITES & LODGING */}
        {activeTab === 'suites' && (
          <SuitesSection suites={suites} onBookSuite={(item) => { handleAddToCart(item); setIsCartOpen(true); }} />
        )}

        {/* VIEW 7: EXPERIENCES */}
        {activeTab === 'experiences' && (
          <ExperiencesSection experiences={experiences} onBookExperience={(item) => { handleAddToCart(item); setIsCartOpen(true); }} />
        )}

        {/* VIEW 8: MEMBER AREA */}
        {(activeTab === 'member-portal' || activeTab === 'membership') && (
          <MemberAreaSection member={member} setIsAuthOpen={setIsAuthOpen} />
        )}
      </main>

      {/* Footer */}
      <AlkymityFooter setActiveTab={setActiveTab} />

      {/* Cart & Checkout Modal */}
      <BookingCheckoutModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Member Login / Profile Modal */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181918] border border-stone-700 rounded-3xl max-w-md w-full p-6 space-y-5 text-stone-100 relative animate-scale-up">
            <button
              onClick={() => setIsAuthOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white font-mono"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-serif font-bold text-lg flex items-center justify-center mx-auto">
                A
              </div>
              <h3 className="font-serif text-2xl text-stone-100">Acessar Área do Membro</h3>
              <p className="text-xs font-mono text-stone-400">Alkymity Galápagos VIP Pass</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setIsAuthOpen(false); setActiveTab('member-portal'); }} className="space-y-3 font-mono text-xs">
              <div>
                <label className="text-stone-400 text-[10px] uppercase font-bold block mb-1">E-mail Cadastrado:</label>
                <input 
                  type="email" 
                  defaultValue="isabella.silveira@alkymity.com"
                  required
                  className="w-full px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div>
                <label className="text-stone-400 text-[10px] uppercase font-bold block mb-1">Senha:</label>
                <input 
                  type="password" 
                  defaultValue="••••••••••••"
                  required
                  className="w-full px-3 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-stone-100 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-bold uppercase tracking-wider rounded-xl transition"
              >
                Entrar na Área do Membro
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlkymityApp;
