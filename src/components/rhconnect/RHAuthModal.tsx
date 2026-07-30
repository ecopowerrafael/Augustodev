import React, { useState } from 'react';
import { UserRole } from '../../types/rhconnect';
import { 
  X, 
  User, 
  Building2, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface RHAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register_candidate' | 'register_company';
  onLoginSuccess: (role: UserRole) => void;
  showToast: (msg: string) => void;
}

export const RHAuthModal: React.FC<RHAuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
  showToast
}) => {
  const [mode, setMode] = useState<'login' | 'register_candidate' | 'register_company'>(initialMode);

  // Login state
  const [loginEmail, setLoginEmail] = useState('mariana.souza@email.com');
  const [loginPassword, setLoginPassword] = useState('123456');

  // Candidate register state
  const [candName, setCandName] = useState('');
  const [candEmail, setCandEmail] = useState('');
  const [candPhone, setCandPhone] = useState('');
  const [candCity, setCandCity] = useState('São Paulo');
  const [candState, setCandState] = useState('SP');
  const [candArea, setCandArea] = useState('Desenvolvimento de Software');

  // Company register state
  const [compCompanyName, setCompCompanyName] = useState('');
  const [compTradeName, setCompTradeName] = useState('');
  const [compCnpj, setCompCnpj] = useState('');
  const [compEmail, setCompEmail] = useState('');
  const [compPhone, setCompPhone] = useState('');
  const [compContactPerson, setCompContactPerson] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.includes('techsolutions') || loginEmail.includes('rh@')) {
      onLoginSuccess('company');
      showToast('Sessão iniciada como Empresa (Tech Solutions).');
    } else if (loginEmail.includes('admin')) {
      onLoginSuccess('admin');
      showToast('Sessão iniciada como Administrador.');
    } else {
      onLoginSuccess('candidate');
      showToast('Sessão iniciada como Candidato (Mariana Souza).');
    }
    onClose();
  };

  const handleRegisterCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess('candidate');
    showToast(`Conta de candidato criada com sucesso para ${candName || 'Novo Candidato'}!`);
    onClose();
  };

  const handleRegisterCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess('company');
    showToast(`Empresa ${compTradeName || 'Nova Empresa'} cadastrada! 7 dias grátis ativados.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden font-sans space-y-6 p-6 sm:p-8 text-left max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-1.5 mb-1">
              <span className="text-xl font-black text-slate-900">RH<span className="text-blue-600">Connect</span></span>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-mono font-bold">IA</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {mode === 'login' ? 'Acesse sua conta corporativa ou de candidato' : mode === 'register_candidate' ? 'Cadastro Gratuito para Candidatos' : 'Cadastre sua Empresa (7 dias grátis)'}
            </p>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 rounded-xl transition ${mode === 'login' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => setMode('register_candidate')}
            className={`py-2 rounded-xl transition ${mode === 'register_candidate' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
          >
            Sou Candidato
          </button>
          <button
            type="button"
            onClick={() => setMode('register_company')}
            className={`py-2 rounded-xl transition ${mode === 'register_company' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
          >
            Sou Empresa
          </button>
        </div>

        {/* Form: LOGIN */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">E-mail Cadastrado</label>
              <input 
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Senha</label>
              <input 
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:bg-white outline-none"
                required
              />
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-[11px] font-medium space-y-1">
              <span className="font-bold block">💡 Dica de Acesso Rápido para Teste:</span>
              <p>• E-mail Candidato: <code className="font-bold">mariana.souza@email.com</code></p>
              <p>• E-mail Empresa: <code className="font-bold">rh@techsolutions.com.br</code></p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Entrar no RH Connect</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Form: CANDIDATE REGISTER */}
        {mode === 'register_candidate' && (
          <form onSubmit={handleRegisterCandidateSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nome Completo *</label>
              <input 
                type="text"
                value={candName}
                onChange={(e) => setCandName(e.target.value)}
                placeholder="Mariana Souza"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">E-mail *</label>
                <input 
                  type="email"
                  value={candEmail}
                  onChange={(e) => setCandEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Telefone *</label>
                <input 
                  type="text"
                  value={candPhone}
                  onChange={(e) => setCandPhone(e.target.value)}
                  placeholder="(11) 98765-4321"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Cidade</label>
                <input 
                  type="text"
                  value={candCity}
                  onChange={(e) => setCandCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Área Profissional</label>
                <input 
                  type="text"
                  value={candArea}
                  onChange={(e) => setCandArea(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition"
            >
              Criar Conta Gratuita de Candidato
            </button>
          </form>
        )}

        {/* Form: COMPANY REGISTER */}
        {mode === 'register_company' && (
          <form onSubmit={handleRegisterCompanySubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nome Fantasia da Empresa *</label>
              <input 
                type="text"
                value={compTradeName}
                onChange={(e) => setCompTradeName(e.target.value)}
                placeholder="Tech Solutions"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">CNPJ *</label>
                <input 
                  type="text"
                  value={compCnpj}
                  onChange={(e) => setCompCnpj(e.target.value)}
                  placeholder="12.345.678/0001-90"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">E-mail do RH *</label>
                <input 
                  type="email"
                  value={compEmail}
                  onChange={(e) => setCompEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nome do Responsável RH</label>
              <input 
                type="text"
                value={compContactPerson}
                onChange={(e) => setCompContactPerson(e.target.value)}
                placeholder="Amanda Ribeiro (Head de Gestão)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-[11px] font-bold">
              ✓ Ativação imediata de 7 dias de degustação sem necessidade de cartão de crédito.
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition"
            >
              Ativar 7 Dias Grátis & Cadastrar
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
