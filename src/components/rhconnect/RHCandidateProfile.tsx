import React, { useState } from 'react';
import { CandidateProfile } from '../../types/rhconnect';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Award, 
  FileText, 
  Globe, 
  Linkedin, 
  Github, 
  DollarSign, 
  Save, 
  CheckCircle2, 
  Plus, 
  Trash2,
  Download,
  Eye,
  X
} from 'lucide-react';

interface RHCandidateProfileProps {
  candidate: CandidateProfile;
  onSaveProfile: (updated: CandidateProfile) => void;
  showToast: (msg: string) => void;
}

export const RHCandidateProfile: React.FC<RHCandidateProfileProps> = ({
  candidate,
  onSaveProfile,
  showToast
}) => {
  const [formData, setFormData] = useState<CandidateProfile>(candidate);
  const [newHardSkill, setNewHardSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [showCvModal, setShowCvModal] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    showToast('Perfil profissional atualizado com sucesso!');
  };

  const addHardSkill = () => {
    if (!newHardSkill.trim()) return;
    if (!formData.hardSkills.includes(newHardSkill.trim())) {
      setFormData({
        ...formData,
        hardSkills: [...formData.hardSkills, newHardSkill.trim()]
      });
    }
    setNewHardSkill('');
  };

  const removeHardSkill = (skill: string) => {
    setFormData({
      ...formData,
      hardSkills: formData.hardSkills.filter(s => s !== skill)
    });
  };

  const addSoftSkill = () => {
    if (!newSoftSkill.trim()) return;
    if (!formData.softSkills.includes(newSoftSkill.trim())) {
      setFormData({
        ...formData,
        softSkills: [...formData.softSkills, newSoftSkill.trim()]
      });
    }
    setNewSoftSkill('');
  };

  const removeSoftSkill = (skill: string) => {
    setFormData({
      ...formData,
      softSkills: formData.softSkills.filter(s => s !== skill)
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-8 text-left text-slate-900">
      
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Meu Perfil Profissional & Currículo</h1>
          <p className="text-xs text-slate-500 font-medium">Mantenha suas informações e habilidades atualizadas para aumentar seu Score na Triagem IA</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCvModal(true)}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center space-x-1.5 cursor-pointer border border-slate-200"
          >
            <Eye className="w-4 h-4 text-blue-600" />
            <span>Visualizar Currículo PDF</span>
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center space-x-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Alterações</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Main Bio, Experience, Education */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Basic Personal Info */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>Informações Básicas & Contato</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nome Completo</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">E-mail Profissional</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Telefone / WhatsApp</label>
                <input 
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cidade</label>
                  <input 
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estado (UF)</label>
                  <input 
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Título / Headline Profissional</label>
              <input 
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ex: Desenvolvedor Full Stack Senior (React / Node.js)"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Resumo das Qualificações</label>
              <textarea 
                rows={4}
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Hard Skills & Soft Skills */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <Code className="w-4 h-4 text-blue-600" />
              <span>Competências & Habilidades (Tags IA)</span>
            </h3>

            {/* Hard Skills */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Hard Skills & Tecnologias</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={newHardSkill}
                  onChange={(e) => setNewHardSkill(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addHardSkill(); }}}
                  placeholder="Ex: React, Node.js, Python, SQL..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={addHardSkill}
                  className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-700 transition"
                >
                  Adicionar
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {formData.hardSkills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold flex items-center space-x-1.5">
                    <span>{skill}</span>
                    <button type="button" onClick={() => removeHardSkill(skill)} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-slate-700">Soft Skills (Comportamentais)</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={newSoftSkill}
                  onChange={(e) => setNewSoftSkill(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSoftSkill(); }}}
                  placeholder="Ex: Liderança, Comunicação..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={addSoftSkill}
                  className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition"
                >
                  Adicionar
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {formData.softSkills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold flex items-center space-x-1.5">
                    <span>{skill}</span>
                    <button type="button" onClick={() => removeSoftSkill(skill)} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Work Experience Timeline */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>Experiência Profissional</span>
            </h3>

            <div className="space-y-4">
              {formData.experiences.map((exp) => (
                <div key={exp.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{exp.role}</h4>
                      <p className="text-xs text-blue-600 font-bold">{exp.company}</p>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Preferences, CV Attachment, Links */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Work Preference & Salary */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>Pretensão & Modelo</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Modelo de Trabalho Preferido</label>
              <select 
                value={formData.workModelPreference}
                onChange={(e) => setFormData({ ...formData, workModelPreference: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
              >
                <option value="remoto">100% Remoto</option>
                <option value="hibrido">Híbrido</option>
                <option value="presencial">Presencial</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pretensão Mín. (R$)</label>
                <input 
                  type="number"
                  value={formData.desiredSalaryMin}
                  onChange={(e) => setFormData({ ...formData, desiredSalaryMin: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pretensão Máx. (R$)</label>
                <input 
                  type="number"
                  value={formData.desiredSalaryMax}
                  onChange={(e) => setFormData({ ...formData, desiredSalaryMax: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Attached CV PDF Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Currículo Anexado em PDF</span>
            </h3>

            <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  PDF
                </div>
                <div>
                  <span className="font-extrabold text-xs text-slate-900 block">{formData.cvFileName}</span>
                  <span className="text-[10px] text-slate-500 font-mono">1.2 MB • Atualizado este mês</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => showToast('Novo arquivo PDF selecionado e pronto para envio.')}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl transition border border-slate-200"
            >
              Substituir Arquivo PDF
            </button>
          </div>

          {/* Links & Portfolios */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Portfólio & Redes</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1">
                  <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                  <span>LinkedIn</span>
                </label>
                <input 
                  type="text"
                  value={formData.linkedinUrl || ''}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center space-x-1">
                  <Github className="w-3.5 h-3.5 text-slate-900" />
                  <span>GitHub / Behance</span>
                </label>
                <input 
                  type="text"
                  value={formData.githubUrl || ''}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>

        </div>

      </form>

      {/* CV PDF Preview Modal */}
      {showCvModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden font-sans space-y-4 p-6 text-left">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-black text-slate-900">{formData.cvFileName}</h3>
              </div>
              <button 
                onClick={() => setShowCvModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mock Curriculum Document Preview */}
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-6 text-slate-800 text-xs leading-relaxed max-h-[60vh] overflow-y-auto">
              <div className="border-b border-slate-200 pb-4 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-black text-slate-900">{formData.name}</h2>
                  <p className="font-bold text-blue-600 text-xs">{formData.headline}</p>
                  <p className="text-slate-500 font-mono text-[11px] mt-1">{formData.email} • {formData.phone} • {formData.city}, {formData.state}</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[10px]">
                  PDF Verificado
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold uppercase tracking-wider text-slate-900 text-[11px] border-b border-slate-200 pb-1">
                  Resumo Profissional
                </h4>
                <p className="text-slate-600">{formData.summary}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold uppercase tracking-wider text-slate-900 text-[11px] border-b border-slate-200 pb-1">
                  Competências & Stacks
                </h4>
                <div className="flex flex-wrap gap-1">
                  {formData.hardSkills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded font-bold">{s}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-extrabold uppercase tracking-wider text-slate-900 text-[11px] border-b border-slate-200 pb-1">
                  Histórico Profissional
                </h4>
                {formData.experiences.map((e) => (
                  <div key={e.id} className="space-y-1">
                    <div className="flex justify-between font-extrabold text-slate-900">
                      <span>{e.role} — {e.company}</span>
                      <span className="font-mono text-slate-500">{e.period}</span>
                    </div>
                    <p className="text-slate-600">{e.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-500 font-mono">Gerado via RH Connect Engine</span>
              <button
                onClick={() => {
                  showToast('Download do currículo PDF iniciado.');
                  setShowCvModal(false);
                }}
                className="px-5 py-2.5 bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-sm hover:bg-blue-700 transition flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Baixar Cópia PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
