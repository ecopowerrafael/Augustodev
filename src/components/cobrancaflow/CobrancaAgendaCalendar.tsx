import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  MessageSquare, 
  Filter, 
  Plus,
  Send,
  User,
  Info
} from 'lucide-react';
import { Charge, ChargeStatus } from '../../types/cobrancaflow';

interface CobrancaAgendaCalendarProps {
  charges: Charge[];
  onSelectCharge: (charge: Charge) => void;
  onSendInstantWhatsapp: (charge: Charge) => void;
  onNewChargeClick: () => void;
}

export const CobrancaAgendaCalendar: React.FC<CobrancaAgendaCalendarProps> = ({
  charges,
  onSelectCharge,
  onSendInstantWhatsapp,
  onNewChargeClick
}) => {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'list'>('month');
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date(2026, 6, 1)); // July 2026
  const [selectedDayDetail, setSelectedDayDetail] = useState<string | null>('2026-07-30');

  // Days in month calculation for July 2026 (31 days)
  const daysInJuly2026 = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-07-${dayNum < 10 ? '0' + dayNum : dayNum}`;
    return dateStr;
  });

  const getPillColor = (status: ChargeStatus) => {
    switch (status) {
      case 'paga':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'vence_hoje':
        return 'bg-blue-600 text-white border-blue-700 animate-pulse';
      case 'a_vencer':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'vencida':
        return 'bg-red-100 text-red-900 border-red-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const selectedDayCharges = selectedDayDetail 
    ? charges.filter(c => c.dueDate === selectedDayDetail)
    : [];

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl font-bold">
              <CalendarIcon className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-slate-900">Agenda de Vencimentos</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Calendário interativo com controle visual de títulos a vencer, vencidos e pagos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg transition ${viewMode === 'month' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'}`}
            >
              Mês
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg transition ${viewMode === 'week' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'}`}
            >
              Semana
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-lg transition ${viewMode === 'day' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'}`}
            >
              Dia
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg transition ${viewMode === 'list' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600'}`}
            >
              Lista
            </button>
          </div>

          <button
            onClick={onNewChargeClick}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Cobrança</span>
          </button>
        </div>
      </div>

      {/* Legend & Month Navigation */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Month Navigation Controls */}
        <div className="flex items-center space-x-3">
          <button className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-bold">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-extrabold text-slate-900 text-base">Julho de 2026</span>
          <button className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-bold">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-700">Paga</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-600" />
            <span className="text-slate-700">Vence Hoje</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-slate-700">A Vencer</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-slate-700">Vencida</span>
          </div>
        </div>

      </div>

      {/* Calendar View Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Calendar Month Grid */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-black text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100">
            <div>Dom</div>
            <div>Seg</div>
            <div>Ter</div>
            <div>Qua</div>
            <div>Qui</div>
            <div>Sex</div>
            <div>Sáb</div>
          </div>

          {/* Month Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Blank offset for July 1st 2026 (Wednesday) -> 3 empty slots */}
            <div className="h-24 bg-slate-50/50 rounded-xl border border-slate-100 opacity-30" />
            <div className="h-24 bg-slate-50/50 rounded-xl border border-slate-100 opacity-30" />

            {daysInJuly2026.map((dateStr, idx) => {
              const dayNum = idx + 1;
              const dayCharges = charges.filter(c => c.dueDate === dateStr);
              const isSelected = selectedDayDetail === dateStr;
              const isToday = dateStr === '2026-07-30';

              return (
                <div
                  key={dateStr}
                  onClick={() => setSelectedDayDetail(dateStr)}
                  className={`h-24 p-2 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/40 shadow-xs'
                      : isToday
                      ? 'border-blue-300 bg-blue-50/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-black ${isToday ? 'bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center' : 'text-slate-800'}`}>
                      {dayNum}
                    </span>
                    {dayCharges.length > 0 && (
                      <span className="text-[10px] font-bold text-slate-500">
                        {dayCharges.length} {dayCharges.length === 1 ? 'título' : 'títulos'}
                      </span>
                    )}
                  </div>

                  {/* Day Pills */}
                  <div className="space-y-1 overflow-y-auto max-h-14">
                    {dayCharges.map((chg) => (
                      <div
                        key={chg.id}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold truncate border ${getPillColor(chg.status)}`}
                        title={`${chg.clientName}: ${formatCurrency(chg.amount)}`}
                      >
                        {chg.clientName.split(' ')[0]}: R$ {chg.amount.toFixed(0)}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right: Selected Day Inspector Drawer */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-base">
              Detalhes de {selectedDayDetail || 'Selecione um Dia'}
            </h3>
            <p className="text-xs text-slate-500">
              {selectedDayCharges.length} cobranças agendadas nesta data
            </p>
          </div>

          <div className="space-y-3">
            {selectedDayCharges.map((chg) => (
              <div key={chg.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">{chg.clientName}</span>
                  <span className="font-mono text-xs text-slate-600">{chg.preferredSendTime}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">{chg.description}</p>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                  <div className="font-black text-blue-700 text-sm">{formatCurrency(chg.amount)}</div>
                  <button
                    onClick={() => onSendInstantWhatsapp(chg)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition flex items-center space-x-1 shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Disparar Zap</span>
                  </button>
                </div>
              </div>
            ))}

            {selectedDayCharges.length === 0 && (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <Info className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs font-semibold">Nenhuma cobrança agendada para este dia.</p>
                <button
                  onClick={onNewChargeClick}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold rounded-xl text-xs"
                >
                  + Agendar Novo Título
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
