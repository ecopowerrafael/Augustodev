import React from 'react';
import { MemberProfile } from '../../types/alkymity';
import { ShieldCheck, QrCode, Calendar, Award, CreditCard, ChevronRight, CheckCircle2, User, Sparkles } from 'lucide-react';

interface MemberAreaSectionProps {
  member: MemberProfile;
  setIsAuthOpen: (open: boolean) => void;
}

export const MemberAreaSection: React.FC<MemberAreaSectionProps> = ({ member, setIsAuthOpen }) => {
  return (
    <div className="space-y-12">
      {/* Member Profile Hero Header */}
      <div className="bg-[#181918] border border-stone-800 rounded-3xl p-8 md:p-10 text-stone-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center space-x-5 relative z-10">
          <div className="relative">
            <img 
              src={member.avatar} 
              alt={member.name} 
              className="w-20 h-20 rounded-full object-cover border-2 border-emerald-400 p-0.5"
            />
            <span className="absolute bottom-0 right-0 p-1 bg-emerald-500 text-stone-950 rounded-full" title="Membro VIP">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-500/40 rounded-full font-mono text-[10px] uppercase font-bold tracking-widest">
                {member.tier}
              </span>
              <span className="text-xs font-mono text-stone-400">Ativo até {member.membershipExpiry}</span>
            </div>
            <h2 className="font-serif text-3xl font-light text-white">{member.name}</h2>
            <p className="text-xs font-mono text-stone-400">{member.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={() => setIsAuthOpen(true)}
            className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-xl font-mono text-xs text-stone-300 transition flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            <span>Editar Perfil</span>
          </button>
        </div>
      </div>

      {/* Grid: Credits & QR Access Code Pass */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Credits Remaining Card */}
        <div className="bg-[#181918] border border-stone-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase text-stone-400 font-bold">Saldo de Créditos FITCO</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="space-y-1">
            <span className="font-serif text-4xl text-emerald-400 font-light">{member.creditsRemaining}</span>
            <span className="text-xs text-stone-400 font-mono block">/ 10 créditos mensais renovados</span>
          </div>
          <p className="text-xs text-stone-400 font-serif leading-relaxed">
            Válidos para aulas presenciais no Reformer Studio, Mat Pilates e treinos no Running Club.
          </p>
          <div className="w-full bg-stone-900 rounded-full h-2 overflow-hidden border border-stone-800">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${(member.creditsRemaining / 10) * 100}%` }} />
          </div>
        </div>

        {/* Classes Attended Stats */}
        <div className="bg-[#181918] border border-stone-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase text-stone-400 font-bold">Histórico do Membro</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="space-y-1">
            <span className="font-serif text-4xl text-stone-100 font-light">{member.totalClassesAttended}</span>
            <span className="text-xs text-stone-400 font-mono block">Aulas completadas em Galápagos</span>
          </div>
          <p className="text-xs text-stone-400 font-serif leading-relaxed">
            Você conquistou a insígnia <strong className="text-emerald-300 font-normal">"Vulcão Ativo"</strong> por manter consistência quinzenal!
          </p>
        </div>

        {/* Digital QR Access Pass */}
        <div className="bg-gradient-to-br from-[#1A1C1A] to-[#0F100F] border border-emerald-500/30 rounded-2xl p-6 space-y-4 text-center flex flex-col items-center justify-center">
          <span className="font-mono text-[10px] uppercase text-emerald-400 tracking-widest font-bold">Passe Digital de Entrada</span>
          
          {/* Simulated QR Box */}
          <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
            <QrCode className="w-full h-full text-stone-950" />
          </div>

          <span className="font-mono text-[9px] text-stone-400 tracking-wider uppercase">
            ID: ALK-GPGS-2026-8890
          </span>
        </div>
      </div>

      {/* Next Upcoming Booking */}
      {member.nextBooking && (
        <div className="bg-[#181918] border border-stone-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <span className="font-mono text-xs uppercase text-stone-300 font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" /> Próxima Reserva Agendada
            </span>
            <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-300 rounded text-[10px] font-mono border border-emerald-500/30 uppercase">
              Confirmado
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase text-amber-400 font-bold">{member.nextBooking.type}</span>
              <h4 className="font-serif text-xl text-stone-100">{member.nextBooking.title}</h4>
              <p className="text-xs font-mono text-stone-400 mt-0.5">
                {member.nextBooking.date} • {member.nextBooking.time} — {member.nextBooking.location}
              </p>
            </div>

            <button 
              onClick={() => alert('Sua vaga está garantida! O instrutor estará aguardando 10 minutos antes da sessão.')}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-mono text-xs rounded-xl border border-stone-700 transition"
            >
              Ver Detalhes do Check-in
            </button>
          </div>
        </div>
      )}

      {/* Perks included in Founder Membership */}
      <div className="bg-[#161716] border border-stone-800 rounded-3xl p-8 space-y-6">
        <h3 className="font-serif text-2xl text-stone-100 font-light">Benefícios Exclusivos do Plano Founder</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            '10 Créditos mensais para Reformer & Mat Pilates',
            'Acesso prioritário a retiros e novas turmas',
            '20% de desconto no cardápio do Alkymity Kitchen',
            '15% de desconto em reservas no Alkymity Suites',
            'Inscrições gratuitas nos eventos do Running Club',
            'Acesso ao lounge VIP e saunas de infravermelho'
          ].map((perk, idx) => (
            <div key={idx} className="p-4 bg-stone-900 border border-stone-800 rounded-xl flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs font-sans text-stone-300 leading-relaxed">{perk}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
