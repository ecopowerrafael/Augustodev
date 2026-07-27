import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Filter, Clock } from 'lucide-react';
import { ContentItem, Client } from '../../types/contentflow';

interface CalendarViewProps {
  contents: ContentItem[];
  clients: Client[];
  onOpenContentDetail: (item: ContentItem) => void;
  onOpenNewModal: () => void;
  isDarkMode: boolean;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  contents,
  clients,
  onOpenContentDetail,
  onOpenNewModal,
  isDarkMode,
}) => {
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');

  // Days mock grid for July 2026
  const daysInJuly = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-[#6C4FF8]" />
            <span>Calendário Editorial — Julho 2026</span>
          </h1>
          <p className="text-xs text-stone-500">Acompanhe as datas programadas de publicação para todas as marcas.</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${viewMode === 'month' ? 'bg-[#6C4FF8] text-white' : 'text-stone-400'}`}
            >
              Mês
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${viewMode === 'week' ? 'bg-[#6C4FF8] text-white' : 'text-stone-400'}`}
            >
              Semana
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#6C4FF8] text-white' : 'text-stone-400'}`}
            >
              Lista
            </button>
          </div>

          <button
            onClick={onOpenNewModal}
            className="px-4 py-2.5 rounded-xl bg-[#6C4FF8] hover:bg-[#5a3ee3] text-white text-xs font-bold shadow-md flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Agendar</span>
          </button>
        </div>
      </div>

      {/* Month Grid */}
      {viewMode === 'month' && (
        <div className={`p-6 rounded-3xl border space-y-4 ${
          isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
        }`}>
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-extrabold uppercase text-stone-400 border-b pb-2">
            <span>Dom</span>
            <span>Seg</span>
            <span>Ter</span>
            <span>Qua</span>
            <span>Qui</span>
            <span>Sex</span>
            <span>Sáb</span>
          </div>

          {/* Days Cells */}
          <div className="grid grid-cols-7 gap-2">
            {daysInJuly.slice(0, 31).map((day) => {
              const dayString = `${day < 10 ? '0' : ''}${day}/07/2026`;
              const dayContents = contents.filter(c => c.scheduledPublishDate === dayString);

              return (
                <div
                  key={day}
                  onClick={onOpenNewModal}
                  className={`min-h-[90px] p-2 rounded-2xl border text-xs flex flex-col justify-between hover:border-purple-400 cursor-pointer transition-colors ${
                    day === 27 || day === 28
                      ? 'bg-purple-50/40 dark:bg-purple-950/20 border-purple-300 dark:border-purple-800'
                      : isDarkMode ? 'bg-stone-800/40 border-stone-800' : 'bg-stone-50/50 border-stone-200'
                  }`}
                >
                  <span className={`font-bold text-[11px] ${day === 27 ? 'text-[#6C4FF8]' : 'text-stone-500'}`}>
                    {day}
                  </span>

                  <div className="space-y-1">
                    {dayContents.map((cnt) => (
                      <div
                        key={cnt.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenContentDetail(cnt);
                        }}
                        className="p-1 rounded bg-[#6C4FF8] text-white text-[9px] font-bold truncate"
                      >
                        {cnt.clientName}: {cnt.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className={`p-6 rounded-3xl border space-y-3 ${
          isDarkMode ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
        }`}>
          {contents.map((cnt) => (
            <div
              key={cnt.id}
              onClick={() => onOpenContentDetail(cnt)}
              className="p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs cursor-pointer hover:border-purple-400 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                  {cnt.scheduledPublishDate}
                </span>
                <span className="font-bold text-stone-900 dark:text-white">{cnt.title}</span>
              </div>
              <span className="text-[10px] text-stone-400 font-semibold">{cnt.clientName} • {cnt.channel}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
