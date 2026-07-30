import React, { useState } from 'react';
import { 
  Send, 
  Search, 
  Filter, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Eye, 
  X 
} from 'lucide-react';
import { DispatchLog } from '../../types/cobrancaflow';

interface CobrancaDispatchLogsProps {
  dispatchLogs: DispatchLog[];
  onRetryDispatch: (logId: string) => void;
}

export const CobrancaDispatchLogs: React.FC<CobrancaDispatchLogsProps> = ({
  dispatchLogs,
  onRetryDispatch
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<DispatchLog | null>(null);

  const filteredLogs = dispatchLogs.filter(log => {
    const matchesSearch = 
      log.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.whatsappNumber.includes(searchTerm) ||
      log.messageContent.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedStatusFilter === 'all') return true;
    return log.status === selectedStatusFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Module Title */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl font-bold">
              <Send className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-slate-900">Histórico & Logs de Envios WhatsApp</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Acompanhe o status de entrega e leitura de cada mensagem disparada pela automação.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por cliente, WhatsApp ou texto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['all', 'entregue', 'lida', 'enviada', 'falha', 'programada'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition ${
                selectedStatusFilter === st
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'all' ? 'Todos' : st.toUpperCase()}
            </button>
          ))}
        </div>

      </div>

      {/* Logs Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4">Cliente</th>
                <th className="py-3.5 px-4">WhatsApp Remetente</th>
                <th className="py-3.5 px-4">Data e Hora</th>
                <th className="py-3.5 px-4">Tipo Envio</th>
                <th className="py-3.5 px-4">Status Entrega</th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">{log.clientName}</td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">{log.whatsappNumber}</td>
                  <td className="py-3.5 px-4 text-slate-500">{log.sentAt}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-full font-bold text-[10px]">
                      {log.triggerType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[10px] ${
                      log.status === 'lida' || log.status === 'entregue'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : log.status === 'falha'
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      
                      {/* View Log Text */}
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
                        title="Ver conteúdo completo"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Re-try if failed */}
                      {log.status === 'falha' && (
                        <button
                          onClick={() => onRetryDispatch(log.id)}
                          className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold rounded-lg text-[10px] flex items-center space-x-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Reenviar</span>
                        </button>
                      )}

                      <a
                        href={`https://wa.me/55${log.whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg border border-emerald-200 transition"
                        title="Abrir WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 font-semibold">
                    Nenhum registro de envio encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: VIEW FULL LOG */}
      {selectedLog && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-lg text-slate-900">Detalhes do Disparo WhatsApp</h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs font-sans">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-slate-500">Cliente:</span>
                <span className="font-extrabold text-slate-900">{selectedLog.clientName}</span>
              </div>

              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-slate-500">Número:</span>
                <span className="font-mono font-bold text-slate-800">{selectedLog.whatsappNumber}</span>
              </div>

              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-slate-500">Data / Hora:</span>
                <span className="font-bold text-slate-800">{selectedLog.sentAt}</span>
              </div>

              <div className="space-y-1 pt-2">
                <span className="font-bold text-slate-700 block">Conteúdo Enviado:</span>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-slate-800 font-mono leading-relaxed whitespace-pre-wrap text-[11px]">
                  {selectedLog.messageContent}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 bg-blue-600 text-white font-extrabold rounded-xl shadow-xs"
              >
                Fechar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
