import React, { FC, useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileSpreadsheet, 
  Search, 
  TrendingDown, 
  TrendingUp, 
  Building2,
  Calendar
} from 'lucide-react';
import { BankSimulationResult, AmortizationSystem } from '../../types/creditoImobiliario';
import { formatCurrency, formatCurrencyExact } from '../../utils/mortgageCalculations';

interface MortgageAmortizationModalProps {
  result: BankSimulationResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MortgageAmortizationModal: FC<MortgageAmortizationModalProps> = ({
  result,
  isOpen,
  onClose
}) => {
  const [selectedSystem, setSelectedSystem] = useState<AmortizationSystem>('SAC');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  if (!isOpen || !result) return null;

  const schedule = selectedSystem === 'SAC' ? result.sac.schedule : result.price.schedule;

  // Filter schedule by month number or year
  const filteredSchedule = schedule.filter(item => {
    if (!searchTerm) return true;
    const year = Math.ceil(item.month / 12);
    return item.month.toString().includes(searchTerm) || year.toString() === searchTerm;
  });

  const pageSize = 36; // 3 years per page view
  const totalPages = Math.ceil(filteredSchedule.length / pageSize);
  const paginatedSchedule = filteredSchedule.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleDownloadCsv = () => {
    const headers = ['Mês', 'Ano', 'Parcela Total (R$)', 'Amortização (R$)', 'Juros (R$)', 'Seguro e Tarifas (R$)', 'Saldo Devedor (R$)'];
    const csvRows = [
      headers.join(';'),
      ...schedule.map(item => [
        item.month,
        Math.ceil(item.month / 12),
        item.installment.toFixed(2),
        item.amortization.toFixed(2),
        item.interest.toFixed(2),
        item.insuranceAndFee.toFixed(2),
        item.remainingBalance.toFixed(2)
      ].join(';'))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tabela-amortizacao-${result.bank.id}-${selectedSystem.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#141514] border border-stone-800 rounded-3xl max-w-5xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6 max-h-[92vh] flex flex-col justify-between">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-2xl ${result.bank.logoBg} p-0.5 flex items-center justify-center font-mono font-bold text-white text-sm`}>
              {result.bank.shortName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif font-bold text-xl text-white">
                  Tabela de Amortização — {result.bank.name}
                </h3>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded text-[9px] font-mono font-bold uppercase">
                  {selectedSystem}
                </span>
              </div>
              <p className="font-mono text-xs text-stone-400">
                Prazo de {result.termMonths} meses ({result.termMonths / 12} anos) | Taxa: {result.bank.annualRate}% a.a.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-xl bg-stone-900 border border-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* System & Search Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          
          {/* System Toggle */}
          <div className="flex items-center space-x-2 font-mono text-xs">
            <span className="text-stone-400 font-semibold">Sistema:</span>
            <button
              onClick={() => { setSelectedSystem('SAC'); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-xl font-bold transition border flex items-center space-x-1.5 ${
                selectedSystem === 'SAC'
                  ? 'bg-emerald-400 text-stone-950 border-emerald-400 shadow-md'
                  : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
              }`}
            >
              <TrendingDown className="w-3.5 h-3.5" />
              <span>SAC (Amortização Constante)</span>
            </button>

            <button
              onClick={() => { setSelectedSystem('PRICE'); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-xl font-bold transition border flex items-center space-x-1.5 ${
                selectedSystem === 'PRICE'
                  ? 'bg-teal-400 text-stone-950 border-teal-400 shadow-md'
                  : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>PRICE (Parcelas Fixas)</span>
            </button>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center space-x-3 font-mono text-xs">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-500" />
              <input
                type="text"
                placeholder="Buscar mês/ano..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-1.5 text-white text-xs focus:border-emerald-400 focus:outline-none w-36"
              />
            </div>

            <button
              onClick={handleDownloadCsv}
              className="px-3 py-1.5 bg-stone-900 hover:bg-stone-850 text-emerald-300 border border-stone-800 rounded-xl transition flex items-center space-x-1 font-bold"
              title="Baixar planilha CSV da simulação"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exportar CSV</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-stone-900 hover:bg-stone-850 text-stone-300 border border-stone-800 rounded-xl transition flex items-center space-x-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>
          </div>

        </div>

        {/* Schedule Table Container */}
        <div className="overflow-x-auto overflow-y-auto border border-stone-800 rounded-2xl bg-stone-950 flex-1 min-h-[300px]">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead className="bg-stone-900/90 text-stone-300 border-b border-stone-800 sticky top-0 backdrop-blur-sm">
              <tr>
                <th className="p-3 font-bold">Mês</th>
                <th className="p-3 font-bold">Ano</th>
                <th className="p-3 font-bold text-right">Parcela Total</th>
                <th className="p-3 font-bold text-right">Amortização</th>
                <th className="p-3 font-bold text-right">Juros</th>
                <th className="p-3 font-bold text-right">Seguro & Tarifas</th>
                <th className="p-3 font-bold text-right">Saldo Devedor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-850 text-stone-300">
              {paginatedSchedule.map((row) => (
                <tr key={row.month} className="hover:bg-stone-900/60 transition">
                  <td className="p-3 font-bold text-white">#{row.month}</td>
                  <td className="p-3 text-stone-400">Ano {Math.ceil(row.month / 12)}</td>
                  <td className="p-3 text-right font-bold text-emerald-300">
                    {formatCurrencyExact(row.installment)}
                  </td>
                  <td className="p-3 text-right text-stone-200">
                    {formatCurrencyExact(row.amortization)}
                  </td>
                  <td className="p-3 text-right text-rose-300">
                    {formatCurrencyExact(row.interest)}
                  </td>
                  <td className="p-3 text-right text-stone-400">
                    {formatCurrencyExact(row.insuranceAndFee)}
                  </td>
                  <td className="p-3 text-right text-stone-300">
                    {formatCurrencyExact(row.remainingBalance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination & Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-stone-800 pt-4 shrink-0 font-mono text-xs">
          <div className="text-stone-400">
            Exibindo <strong className="text-white">{paginatedSchedule.length}</strong> de <strong className="text-white">{filteredSchedule.length}</strong> parcelas
          </div>

          {totalPages > 1 && (
            <div className="flex items-center space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="px-3 py-1.5 bg-stone-900 border border-stone-800 disabled:opacity-40 rounded-xl text-stone-300 hover:text-white"
              >
                Anterior
              </button>

              <span className="text-stone-400">
                Página {currentPage} de {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 bg-stone-900 border border-stone-800 disabled:opacity-40 rounded-xl text-stone-300 hover:text-white"
              >
                Próxima
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
