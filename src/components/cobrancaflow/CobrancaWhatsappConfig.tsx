import React, { useState } from 'react';
import { 
  Smartphone, 
  QrCode, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  Sliders, 
  Key, 
  Zap, 
  Copy, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { WhatsappConnection } from '../../types/cobrancaflow';

interface CobrancaWhatsappConfigProps {
  whatsappConn: WhatsappConnection;
  onUpdateConnection: (updatedConn: WhatsappConnection) => void;
}

export const CobrancaWhatsappConfig: React.FC<CobrancaWhatsappConfigProps> = ({
  whatsappConn,
  onUpdateConnection
}) => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isTestingPing, setIsTestingPing] = useState(false);
  const [pingSuccess, setPingSuccess] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  // Connection parameters form
  const [formData, setFormData] = useState({
    phoneNumber: whatsappConn.phoneNumber,
    instanceName: whatsappConn.instanceName,
    tokenKey: whatsappConn.tokenKey,
    intervalSeconds: 25,
  });

  const handleTestPing = () => {
    setIsTestingPing(true);
    setTimeout(() => {
      setIsTestingPing(false);
      setPingSuccess(true);
      setTimeout(() => setPingSuccess(false), 3000);
    }, 1200);
  };

  const handleSimulateQrPair = () => {
    onUpdateConnection({
      ...whatsappConn,
      status: 'connected',
      lastPingAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    });
    setIsQrModalOpen(false);
    alert('WhatsApp emparelhado com sucesso via QR Code!');
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Module Title */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold">
              <Smartphone className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-black text-slate-900">Configurações da API de WhatsApp</h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Gerencie o número remetente, token de integração, velocidade de envio e status de conexão.
          </p>
        </div>

        {/* Status Badge */}
        <div className={`px-4 py-2 rounded-2xl border flex items-center space-x-2 shadow-2xs ${
          whatsappConn.status === 'connected'
            ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
            : 'bg-amber-50 text-amber-900 border-amber-300'
        }`}>
          <span className={`w-3 h-3 rounded-full ${whatsappConn.status === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          <div className="text-xs font-bold">
            <span className="block font-black">{whatsappConn.status === 'connected' ? 'INSTÂNCIA CONECTADA' : 'DESCONECTADO'}</span>
            <span className="text-[10px] text-slate-500 font-medium">Último Ping: {whatsappConn.lastPingAt}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Instance Connection & Pairing */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">
            Credenciais & Conexão da Instância
          </h3>

          <div className="space-y-4 text-xs font-sans">
            <div className="space-y-1">
              <label className="text-slate-700 font-bold block">Nome da Instância</label>
              <input
                type="text"
                value={formData.instanceName}
                onChange={(e) => setFormData({ ...formData, instanceName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-semibold focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Número do WhatsApp Remetente</label>
                <input
                  type="text"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono font-bold focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 font-bold block">Token Secret / API Key</label>
                <div className="relative">
                  <input
                    type="password"
                    readOnly
                    value={formData.tokenKey}
                    className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-700 font-mono focus:outline-none pr-10"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(formData.tokenKey);
                      setCopiedToken(true);
                      setTimeout(() => setCopiedToken(false), 2000);
                    }}
                    className="absolute right-2 top-2.5 p-1 text-slate-500 hover:text-slate-800"
                  >
                    {copiedToken ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Test Ping Controls */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleTestPing}
                disabled={isTestingPing}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isTestingPing ? 'animate-spin' : ''}`} />
                <span>{isTestingPing ? 'Testando Conexão...' : 'Testar Conexão (Ping)'}</span>
              </button>

              <button
                onClick={() => setIsQrModalOpen(true)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl border border-slate-300 transition flex items-center space-x-2"
              >
                <QrCode className="w-4 h-4 text-blue-600" />
                <span>Escanear QR Code Novamente</span>
              </button>

              {pingSuccess && (
                <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Conexão Ativa & Latência: 24ms</span>
                </span>
              )}
            </div>

          </div>
        </div>

        {/* Right Column: Dispatch Rate & Anti-Ban Humanization Settings */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">
            Proteção Anti-Bloqueio & Humanização
          </h3>

          <div className="space-y-4 text-xs font-sans">
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Intervalo entre Envios:</span>
                <span className="text-blue-700 font-extrabold">{formData.intervalSeconds} segundos</span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                value={formData.intervalSeconds}
                onChange={(e) => setFormData({ ...formData, intervalSeconds: parseInt(e.target.value) })}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                Intervalos humanizados evitam gatilhos de spam e protegem o número contra bloqueios do WhatsApp.
              </p>
            </div>

            {/* Daily Usage Progress Bar */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Limite de Envios Diários</span>
                <span className="text-emerald-700 font-black">{whatsappConn.dailySentCount} / {whatsappConn.dailyLimit}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-2.5 rounded-full"
                  style={{ width: `${(whatsappConn.dailySentCount / whatsappConn.dailyLimit) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                14.2% da cota diária utilizada. Reinicia à meia-noite.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* QR CODE SCANNING MODAL */}
      {isQrModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 text-center space-y-4">
            
            <h3 className="font-extrabold text-lg text-slate-900">Escanear QR Code no WhatsApp</h3>
            <p className="text-xs text-slate-600">
              Abra o WhatsApp no celular {'>'} Aparelhos Conectados {'>'} Conectar Aparelho.
            </p>

            <div className="w-48 h-48 mx-auto bg-slate-100 border-2 border-slate-300 rounded-2xl p-3 flex flex-col items-center justify-center space-y-2">
              <QrCode className="w-32 h-32 text-slate-800" />
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handleSimulateQrPair}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition"
              >
                Simular Leitura do QR Code
              </button>

              <button
                onClick={() => setIsQrModalOpen(false)}
                className="w-full py-2 bg-slate-100 text-slate-700 font-extrabold text-xs rounded-xl hover:bg-slate-200"
              >
                Cancelar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
