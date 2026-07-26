import React from "react";
import { Inspection } from "../../data/gmgCheckData";
import { GMGLogo } from "./GMGLogo";
import { Printer, Download, Share2, CheckCircle2, XCircle, AlertTriangle, FileText, Check } from "lucide-react";

interface PDFReportViewerProps {
  inspection: Inspection;
  onClose?: () => void;
}

export const PDFReportViewer: React.FC<PDFReportViewerProps> = ({
  inspection,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSimulation = () => {
    alert(`Relatório PDF (${inspection.id}.pdf) gerado com sucesso! Iniciando download...`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8 text-gray-900 font-sans">
      {/* Top Toolbar Bar */}
      <div className="max-w-4xl mx-auto mb-6 bg-[#10263F] text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xl border border-white/10 print:hidden">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-[#F4B400]" />
          <div>
            <h3 className="font-bold text-sm md:text-base">Relatório Técnico de Vistoria GMG</h3>
            <p className="text-xs text-gray-300">Documento Oficial • Código: {inspection.id}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-white/20 text-xs font-medium text-gray-300 hover:bg-white/10 transition-colors"
            >
              Voltar
            </button>
          )}
          <button
            onClick={handleDownloadSimulation}
            className="px-3.5 py-1.5 rounded-lg bg-[#1769AA] text-white text-xs font-semibold hover:bg-[#1769AA]/80 transition-colors flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg bg-[#F4B400] text-[#10263F] text-xs font-bold hover:bg-[#F4B400]/90 transition-colors flex items-center space-x-1.5 shadow"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* PDF Document Page Layout */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-xl shadow-2xl p-8 md:p-12 space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Header Document Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b-2 border-gray-200 gap-4">
          <GMGLogo variant="light" showSubtitle={true} />
          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#1769AA]/10 text-[#1769AA] border border-[#1769AA]/20 uppercase tracking-wider mb-1">
              {inspection.type}
            </span>
            <h1 className="text-2xl font-black text-[#10263F] tracking-tight">{inspection.id}</h1>
            <p className="text-xs text-gray-500 font-mono">Data da Vistoria: {inspection.date} às {inspection.startTime}</p>
          </div>
        </div>

        {/* Executive Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-5 rounded-xl border border-gray-200">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Dados do Local / Unidade</h4>
            <p className="font-bold text-gray-900 text-sm">{inspection.siteName}</p>
            <p className="text-xs text-gray-600">{inspection.siteCity}</p>
            <p className="text-xs text-gray-600 mt-1">Responsável do Site: <span className="font-medium">{inspection.localResponsibleName}</span> ({inspection.localResponsiblePhone})</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Equipamento Vistoriado</h4>
            <p className="font-bold text-gray-900 text-sm">{inspection.equipmentTag} — {inspection.equipmentName}</p>
            <p className="text-xs text-gray-600">{inspection.equipmentSpecs}</p>
            <p className="text-xs text-gray-600 mt-1">Técnico Vistoriador: <span className="font-medium text-[#10263F]">{inspection.technicianName}</span></p>
          </div>
        </div>

        {/* Results Counter Banner */}
        <div className="grid grid-cols-4 gap-3 bg-[#10263F] text-white p-4 rounded-xl text-center">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Itens Analisados</span>
            <span className="text-xl font-bold text-white">{inspection.resultSummary?.total || 28}</span>
          </div>
          <div>
            <span className="text-xs text-[#18A66A] block font-medium">Aprovados (OK)</span>
            <span className="text-xl font-bold text-[#18A66A]">{inspection.resultSummary?.okCount || 24}</span>
          </div>
          <div>
            <span className="text-xs text-[#D64545] block font-medium">Não Conformidades (NOK)</span>
            <span className="text-xl font-bold text-[#D64545]">{inspection.resultSummary?.nokCount || 2}</span>
          </div>
          <div>
            <span className="text-xs text-[#7C8793] block font-medium">Não Aplicáveis (N/A)</span>
            <span className="text-xl font-bold text-gray-300">{inspection.resultSummary?.naCount || 2}</span>
          </div>
        </div>

        {/* Technical Measurements Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-[#10263F] uppercase tracking-wider border-l-4 border-[#F4B400] pl-3">
            Medições e Parâmetros Elétricos/Mecânicos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-gray-50 border rounded-lg">
              <span className="text-gray-500 block">Horímetro Atual:</span>
              <span className="font-bold text-gray-900 text-sm">{inspection.measurements.hourmeter}</span>
            </div>
            <div className="p-3 bg-gray-50 border rounded-lg">
              <span className="text-gray-500 block">Tensão Trifásica:</span>
              <span className="font-bold text-gray-900 text-sm">
                R-S: {inspection.measurements.voltageRS} | S-T: {inspection.measurements.voltageST} | R-T: {inspection.measurements.voltageRT}
              </span>
            </div>
            <div className="p-3 bg-gray-50 border rounded-lg">
              <span className="text-gray-500 block">Frequência:</span>
              <span className="font-bold text-gray-900 text-sm">{inspection.measurements.frequency}</span>
            </div>
            <div className="p-3 bg-gray-50 border rounded-lg">
              <span className="text-gray-500 block">Tensão de Bateria:</span>
              <span className="font-bold text-gray-900 text-sm">{inspection.measurements.batteryVoltage}</span>
            </div>
            <div className="p-3 bg-gray-50 border rounded-lg">
              <span className="text-gray-500 block">Pressão do Óleo:</span>
              <span className="font-bold text-gray-900 text-sm">{inspection.measurements.oilPressureBar}</span>
            </div>
            <div className="p-3 bg-gray-50 border rounded-lg">
              <span className="text-gray-500 block">Nível do Combustível:</span>
              <span className="font-bold text-gray-900 text-sm">{inspection.measurements.fuelLevelPercent}</span>
            </div>
          </div>
        </div>

        {/* Checklist Matrix */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-[#10263F] uppercase tracking-wider border-l-4 border-[#1769AA] pl-3">
            Checklist de Inspeção Detalhado
          </h3>
          <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                  <th className="p-2.5 w-16">Item</th>
                  <th className="p-2.5">Descrição da Verificação</th>
                  <th className="p-2.5 w-24 text-center">Status</th>
                  <th className="p-2.5">Observações / Medições</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {inspection.checklists.map((item, idx) => (
                  <tr key={idx} className={item.status === "NOK" ? "bg-red-50/50" : "hover:bg-gray-50"}>
                    <td className="p-2.5 font-mono text-gray-500 font-medium">{item.code}</td>
                    <td className="p-2.5 font-medium text-gray-900">{item.title}</td>
                    <td className="p-2.5 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          item.status === "OK"
                            ? "bg-[#18A66A]/10 text-[#18A66A]"
                            : item.status === "NOK"
                            ? "bg-[#D64545]/10 text-[#D64545]"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-gray-600">
                      {item.observation || item.measurementValue || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Non conformities Section */}
        {inspection.nonConformities.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#D64545] uppercase tracking-wider border-l-4 border-[#D64545] pl-3">
              Não Conformidades Registradas ({inspection.nonConformities.length})
            </h3>
            <div className="space-y-3">
              {inspection.nonConformities.map((nc) => (
                <div key={nc.id} className="p-4 border-2 border-[#D64545]/30 bg-red-50/30 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#D64545] font-mono text-sm">{nc.code} — {nc.itemTitle}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D64545] text-white">
                      Criticidade {nc.criticality}
                    </span>
                  </div>
                  <p className="text-gray-800 font-medium">{nc.description}</p>
                  <p className="text-gray-600">Ação Recomendada: <span className="font-medium text-gray-900">{nc.recommendedAction}</span></p>
                  <p className="text-gray-500 text-[11px]">Prazo Sugerido: {nc.suggestedDeadline}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photo Evidences Grid */}
        {inspection.photos.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#10263F] uppercase tracking-wider border-l-4 border-[#F4B400] pl-3">
              Galeria de Evidências Fotográficas ({inspection.photos.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {inspection.photos.map((p, idx) => (
                <div key={idx} className="border rounded-lg overflow-hidden bg-gray-50">
                  <img src={p.url} alt={p.caption} className="w-full h-28 object-cover" />
                  <p className="p-1.5 text-[10px] text-gray-600 font-medium truncate">{p.caption}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Signatures Section */}
        <div className="pt-8 border-t border-gray-300 grid grid-cols-1 md:grid-cols-2 gap-8 text-center text-xs">
          <div className="space-y-2">
            <div className="h-20 border-b-2 border-gray-400 flex items-end justify-center pb-2 bg-gray-50/50 rounded-t-lg">
              <span className="font-serif italic text-lg text-[#10263F] font-bold">Carlos Henrique</span>
            </div>
            <p className="font-bold text-gray-900">{inspection.technicianName}</p>
            <p className="text-gray-500">Técnico Vistoriador Responsável</p>
            <p className="text-[10px] text-gray-400 font-mono">Assinado Digitalmente no App GMG Check</p>
          </div>

          <div className="space-y-2">
            <div className="h-20 border-b-2 border-gray-400 flex items-end justify-center pb-2 bg-gray-50/50 rounded-t-lg">
              <span className="font-serif italic text-lg text-[#10263F] font-bold">Marcos Oliveira</span>
            </div>
            <p className="font-bold text-gray-900">{inspection.localResponsibleName}</p>
            <p className="text-gray-500">Acompanhante / Responsável Local ({inspection.localResponsibleMatricula})</p>
            <p className="text-[10px] text-gray-400 font-mono">Ciência e Aprovado no Local</p>
          </div>
        </div>

        {/* Document Footer */}
        <div className="pt-6 border-t border-gray-200 text-center text-[11px] text-gray-400 flex justify-between items-center">
          <span>GMG Check System v3.2 • Rastreabilidade & Validade Jurídica</span>
          <span>Página 1 de 1</span>
        </div>
      </div>
    </div>
  );
};
