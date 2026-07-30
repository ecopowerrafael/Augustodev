import React, { useState } from 'react';
import { 
  MessageSquare, 
  Smartphone, 
  Plus, 
  Edit, 
  Trash2, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  Clock, 
  Sliders, 
  Bot, 
  Zap,
  Info
} from 'lucide-react';
import { MessageTemplate, AutomationRule } from '../../types/cobrancaflow';

interface CobrancaWhatsappTemplatesProps {
  templates: MessageTemplate[];
  automationRules: AutomationRule[];
  onAddTemplate: (newTpl: Omit<MessageTemplate, 'id'>) => void;
  onUpdateTemplate: (updatedTpl: MessageTemplate) => void;
  onDeleteTemplate: (id: string) => void;
  onToggleRule: (ruleId: string) => void;
}

export const CobrancaWhatsappTemplates: React.FC<CobrancaWhatsappTemplatesProps> = ({
  templates,
  automationRules,
  onAddTemplate,
  onUpdateTemplate,
  onDeleteTemplate,
  onToggleRule
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate>(templates[0]);
  const [editorTitle, setEditorTitle] = useState(selectedTemplate?.title || '');
  const [editorContent, setEditorContent] = useState(selectedTemplate?.content || '');
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [testSendSimulated, setTestSendSimulated] = useState(false);

  const variablesList = [
    { code: '{{nome_cliente}}', label: 'Nome Cliente', sample: 'Roberto Andrade' },
    { code: '{{nome_empresa}}', label: 'Nome Empresa', sample: 'CobrançaFlow' },
    { code: '{{valor}}', label: 'Valor (R$)', sample: '1.450,00' },
    { code: '{{data_vencimento}}', label: 'Data Vencimento', sample: '30/07/2026' },
    { code: '{{descricao}}', label: 'Descrição Serviço', sample: 'Manutenção de Servidores' },
    { code: '{{numero_parcela}}', label: 'Nº Parcela', sample: '1' },
    { code: '{{total_parcelas}}', label: 'Total Parcelas', sample: '3' },
    { code: '{{link_pagamento}}', label: 'Link de Pagamento', sample: 'https://cb.app/pay/8391' },
    { code: '{{chave_pix}}', label: 'Chave PIX', sample: 'financeiro@cobrancaflow.com.br' },
    { code: '{{pix_copia_cola}}', label: 'PIX Copia e Cola', sample: '00020126580014br.gov.bcb...' },
    { code: '{{telefone_empresa}}', label: 'Telefone Suporte', sample: '(11) 4003-8920' },
    { code: '{{nome_atendente}}', label: 'Atendente', sample: 'Juliana Ferreira' },
  ];

  const handleSelectTemplate = (tpl: MessageTemplate) => {
    setSelectedTemplate(tpl);
    setEditorTitle(tpl.title);
    setEditorContent(tpl.content);
  };

  const handleInsertVariable = (varCode: string) => {
    setEditorContent(prev => prev + ' ' + varCode);
  };

  const handleSaveTemplate = () => {
    const updated = {
      ...selectedTemplate,
      title: editorTitle,
      content: editorContent,
    };
    onUpdateTemplate(updated);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  // Generate live preview text replacing variables with samples
  const getLivePreview = () => {
    let preview = editorContent;
    variablesList.forEach(v => {
      preview = preview.replaceAll(v.code, v.sample);
    });
    return preview;
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Module Title */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold">
              <MessageSquare className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-slate-900">Modelos & Automações de WhatsApp</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Configure mensagens personalizadas com variáveis dinâmicas e defina as regras da régua automática.
          </p>
        </div>

        <button
          onClick={() => {
            const newTpl: MessageTemplate = {
              id: 'tpl-' + Date.now(),
              title: 'Novo Modelo Personalizado',
              triggerEvent: '3_dias_antes',
              content: 'Olá, {{nome_cliente}}! Lembrete do boleto de R$ {{valor}} vencendo em {{data_vencimento}}.',
              isDefault: false,
              isActive: true,
            };
            onAddTemplate(newTpl);
            handleSelectTemplate(newTpl);
          }}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-200 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Novo Modelo</span>
        </button>
      </div>

      {/* Editor & Live WhatsApp Smartphone Simulation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Template List & Variable Chips Editor */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Template Selector Pills */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Modelos Cadastrados ({templates.length})
            </span>
            <div className="flex flex-wrap gap-2">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition flex items-center space-x-2 border ${
                    selectedTemplate.id === tpl.id
                      ? 'bg-blue-600 text-white border-blue-700 shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{tpl.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Editor Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <input
                type="text"
                value={editorTitle}
                onChange={(e) => setEditorTitle(e.target.value)}
                className="font-extrabold text-slate-900 text-base bg-transparent border-b border-dashed border-slate-300 focus:border-blue-500 focus:outline-none py-1 w-full max-w-md"
              />

              <div className="flex items-center space-x-2">
                {isSavedNotice && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Salvo!</span>
                  </span>
                )}
                <button
                  onClick={handleSaveTemplate}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition"
                >
                  Salvar Alterações
                </button>
              </div>
            </div>

            {/* Dynamic Variables Chips Toolbar */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Clique para Inserir Variável Dinâmica na Mensagem:</span>
              </span>

              <div className="flex flex-wrap gap-1.5">
                {variablesList.map((v) => (
                  <button
                    key={v.code}
                    onClick={() => handleInsertVariable(v.code)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-mono font-bold transition"
                  >
                    + {v.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Textarea */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Texto do Modelo (Aceita formatação do WhatsApp: *negrito*, _itálico_):
              </label>
              <textarea
                rows={8}
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs text-slate-900 font-mono leading-relaxed focus:border-blue-500 focus:outline-none"
              />
            </div>

          </div>

        </div>

        {/* Right Column: Live Smartphone WhatsApp Chat Preview Simulator */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="bg-slate-900 text-white rounded-3xl p-4 shadow-xl border-4 border-slate-800 space-y-3 relative overflow-hidden">
            
            {/* Smartphone Notch Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] font-semibold text-slate-400">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span className="text-white font-bold">WhatsApp Business</span>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30">
                Live Preview
              </span>
            </div>

            {/* Simulated Chat Window */}
            <div className="bg-[#E5DDD5] rounded-2xl p-3 min-h-[360px] flex flex-col justify-end space-y-2 font-sans text-xs text-slate-900 relative">
              
              {/* WhatsApp Message Bubble */}
              <div className="bg-white rounded-2xl rounded-tl-none p-3.5 shadow-md max-w-[90%] space-y-2 self-start border border-emerald-100">
                <div className="font-extrabold text-blue-900 text-[11px] border-b border-slate-100 pb-1">
                  CobrançaFlow Lembretes 🦉
                </div>

                <div className="whitespace-pre-wrap leading-relaxed text-slate-800 text-[11px]">
                  {getLivePreview()}
                </div>

                <div className="text-[9px] text-slate-400 text-right font-bold pt-1">
                  09:02 • <span className="text-blue-500">✓✓</span>
                </div>
              </div>

            </div>

            {/* Test Send Simulation Button */}
            <button
              onClick={() => {
                setTestSendSimulated(true);
                setTimeout(() => setTestSendSimulated(false), 3000);
              }}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition flex items-center justify-center space-x-1.5 shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>{testSendSimulated ? 'Mensagem Teste Disparada!' : 'Testar Envio no meu WhatsApp'}</span>
            </button>

          </div>

        </div>

      </div>

      {/* Automation Rules Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">Régua de Automação de Disparos</h3>
            <p className="text-xs text-slate-500 font-medium">Programe quando cada mensagem será enviada antes ou depois do vencimento.</p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Cron Jobs Ativos
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Regra / Evento</th>
                <th className="py-3 px-4">Prazo em Relação ao Vencimento</th>
                <th className="py-3 px-4">Horário do Disparo</th>
                <th className="py-3 px-4">Modelo Associado</th>
                <th className="py-3 px-4 text-right">Status da Regra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {automationRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">{rule.name}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-700">
                    {rule.daysOffset < 0
                      ? `${Math.abs(rule.daysOffset)} dias antes`
                      : rule.daysOffset === 0
                      ? 'No dia do vencimento'
                      : `${rule.daysOffset} dias após (Atraso)`}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-700">{rule.sendTime}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">
                    {templates.find(t => t.id === rule.templateId)?.title || 'Modelo Padrão'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onToggleRule(rule.id)}
                      className={`px-3 py-1 rounded-full font-extrabold text-[10px] transition ${
                        rule.isActive
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 text-slate-500 border border-slate-300'
                      }`}
                    >
                      {rule.isActive ? 'ATIVA' : 'DESATIVADA'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
