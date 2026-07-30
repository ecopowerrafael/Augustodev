import React, { FC } from 'react';
import { 
  Sparkles, 
  Gamepad2, 
  Heart, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Smile, 
  Users, 
  ArrowRight,
  Brain,
  Volume2
} from 'lucide-react';
import { StudentProfile } from '../../types/neuroaprende';

interface NeuroHeroBannerProps {
  student: StudentProfile;
  onOpenGames: () => void;
  onOpenDashboard: () => void;
}

export const NeuroHeroBanner: FC<NeuroHeroBannerProps> = ({
  student,
  onOpenGames,
  onOpenDashboard
}) => {
  return (
    <div className="bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50/80 border border-sky-200/80 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-lg">
      {/* Soft Light Ambient Radial Backgrounds */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Column: Text & Value Prop */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-emerald-100 border border-emerald-300 text-emerald-800 font-sans text-xs font-bold rounded-full uppercase tracking-wider flex items-center space-x-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Aprender no Próprio Ritmo</span>
            </span>

            <span className="px-3 py-1 bg-amber-100 border border-amber-300 text-amber-900 font-sans text-xs font-bold rounded-full uppercase tracking-wider flex items-center space-x-1.5 shadow-xs">
              <Brain className="w-3.5 h-3.5 text-amber-600" />
              <span>TEA • TDAH • Dislexia • Discalculia</span>
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
              Aprender pode ser <span className="italic font-extrabold text-emerald-600">visual</span>, divertido e cheio de carinho!
            </h1>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium">
              Plataforma de jogos pedagógicos adaptativos com estímulos visuais, sonoros e táteis, sem pontuações punitivas ou contagem de vidas. Criado para crianças neurodivergentes com acompanhamento integrado para pais, professores e terapeutas.
            </p>
          </div>

          {/* Key Features Bullet List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 font-medium">
            <div className="flex items-center space-x-2.5 p-3 bg-white/90 border border-emerald-200 rounded-2xl shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">Modo Baixo Estímulo para Sensibilidade</span>
            </div>
            <div className="flex items-center space-x-2.5 p-3 bg-white/90 border border-amber-200 rounded-2xl shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-semibold">Reforço Positivo & Recompensas</span>
            </div>
            <div className="flex items-center space-x-2.5 p-3 bg-white/90 border border-sky-200 rounded-2xl shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span className="font-semibold">Prancha PECS de Comunicação</span>
            </div>
            <div className="flex items-center space-x-2.5 p-3 bg-white/90 border border-purple-200 rounded-2xl shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
              <span className="font-semibold">Tradução Multilíngue + Árabe RTL</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenGames}
              className="px-7 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-extrabold uppercase tracking-wider rounded-2xl transition shadow-lg shadow-emerald-200 flex items-center space-x-2.5 transform hover:scale-[1.02]"
            >
              <Gamepad2 className="w-5 h-5 text-emerald-100" />
              <span>Explorar Mundos dos Jogos</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenDashboard}
              className="px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-extrabold text-xs uppercase tracking-wider rounded-2xl transition shadow-sm flex items-center space-x-2"
            >
              <Heart className="w-4 h-4 text-amber-500" />
              <span>Painel dos Adultos & Relatórios</span>
            </button>
          </div>

        </div>

        {/* Right Column: Mascote Interactive Preview Card */}
        <div className="lg:col-span-5">
          <div className="bg-white border-2 border-amber-200/80 rounded-3xl p-6 shadow-xl relative space-y-5 text-center">
            
            {/* Student Greeting Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-extrabold shadow-xs">
              <span>Olá, {student.nickname}!</span>
              <span>⭐ {student.stars} Estrelas</span>
            </div>

            {/* Big Mascot Display */}
            <div className="relative inline-block my-2">
              <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-tr from-amber-300 via-emerald-300 to-sky-300 p-1.5 shadow-md animate-bounce-slow">
                <div className="w-full h-full bg-amber-50 rounded-[20px] flex items-center justify-center text-6xl shadow-inner">
                  {student.avatar}
                </div>
              </div>
              <span className="absolute -bottom-2 -right-2 px-3 py-1 bg-emerald-500 text-white text-[10px] font-extrabold uppercase rounded-full shadow-md">
                Nido Guia
              </span>
            </div>

            {/* Quote Speech Bubble */}
            <div className="p-4 bg-sky-50/80 border border-sky-200 rounded-2xl text-left space-y-1 text-xs">
              <span className="text-emerald-700 font-extrabold text-[11px] uppercase block">
                Nido, o Corujinha diz:
              </span>
              <p className="text-slate-800 font-medium leading-relaxed">
                "Qual mundo você quer explorar hoje? Vamos jogar e aprender no seu tempo, sem pressa!"
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-slate-100">
              <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Ofensiva</span>
                <strong className="text-emerald-700 text-sm font-extrabold">{student.recentStreakDays} Dias</strong>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Uso Hoje</span>
                <strong className="text-amber-700 text-sm font-extrabold">{student.dailyUsageMinutes} min</strong>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Troféus</span>
                <strong className="text-sky-700 text-sm font-extrabold">🏆 {student.trophies}</strong>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
