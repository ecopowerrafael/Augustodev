import React, { useState } from 'react';
import { JobPosition, WorkModel, ExperienceLevel } from '../../types/rhconnect';
import { 
  Briefcase, 
  PlusCircle, 
  Edit3, 
  PauseCircle, 
  PlayCircle, 
  Trash2, 
  Users, 
  Eye, 
  CheckCircle2, 
  X, 
  Plus, 
  Sparkles, 
  Save, 
  ArrowLeft 
} from 'lucide-react';

interface RHCompanyJobManagerProps {
  jobs: JobPosition[];
  companyId: string;
  companyName: string;
  companyLogo: string;
  onCreateJob: (newJob: JobPosition) => void;
  onUpdateJobStatus: (jobId: string, status: 'open' | 'paused' | 'closed') => void;
  onViewCandidatesForJob: (jobId: string) => void;
  showToast: (msg: string) => void;
  initialMode?: 'list' | 'new';
}

export const RHCompanyJobManager: React.FC<RHCompanyJobManagerProps> = ({
  jobs,
  companyId,
  companyName,
  companyLogo,
  onCreateJob,
  onUpdateJobStatus,
  onViewCandidatesForJob,
  showToast,
  initialMode = 'list'
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'new'>(initialMode);
  const companyJobs = jobs.filter(j => j.companyId === companyId);

  // New Job Wizard Form State
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [city, setCity] = useState('São Paulo');
  const [state, setState] = useState('SP');
  const [workModel, setWorkModel] = useState<WorkModel>('remoto');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('senior');
  const [salaryMin, setSalaryMin] = useState(8000);
  const [salaryMax, setSalaryMax] = useState(12000);
  const [description, setDescription] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState('');
  const [requirementsText, setRequirementsText] = useState('');
  const [benefitsText, setBenefitsText] = useState('Vale Refeição R$ 1.000, Plano de Saúde Bradesco, Auxílio Home Office');
  const [techsText, setTechsText] = useState('React, Node.js, TypeScript, PostgreSQL');
  const [questionInput, setQuestionInput] = useState('');
  const [questions, setQuestions] = useState<{ id: string; question: string; isEliminatory: boolean }[]>([
    { id: 'q_new_1', question: 'Possui no mínimo 3 anos de experiência comprovada na função?', isEliminatory: true }
  ]);

  const handleAddQuestion = () => {
    if (!questionInput.trim()) return;
    setQuestions([
      ...questions,
      { id: `q_new_${Date.now()}`, question: questionInput.trim(), isEliminatory: false }
    ]);
    setQuestionInput('');
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast('Por favor, preencha o título e a descrição da vaga.');
      return;
    }

    const newJobObj: JobPosition = {
      id: `job_${Date.now()}`,
      companyId,
      companyName,
      companyLogo,
      title,
      department: department || 'Engenharia / Gestão',
      city,
      state,
      workModel,
      experienceLevel,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      showSalary: true,
      description,
      responsibilities: responsibilitiesText.split('\n').filter(Boolean),
      requirements: requirementsText.split('\n').filter(Boolean),
      desirableSkills: [],
      benefits: benefitsText.split(',').map(s => s.trim()).filter(Boolean),
      technologies: techsText.split(',').map(s => s.trim()).filter(Boolean),
      stages: ['Triagem IA', 'Entrevista Cultural', 'Desafio Técnico', 'Proposta'],
      screeningQuestions: questions,
      status: 'open',
      applicantCount: 0,
      viewsCount: 1,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onCreateJob(newJobObj);
    showToast(`Vaga "${title}" publicada com sucesso!`);
    setViewMode('list');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-8 text-left text-slate-900">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Gerenciamento de Vagas</h1>
          <p className="text-xs text-slate-500 font-medium">Cadastre, edite, pause e visualize inscritos em tempo real</p>
        </div>

        {viewMode === 'list' ? (
          <button
            onClick={() => setViewMode('new')}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-2xl shadow-md transition flex items-center space-x-1.5 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publicar Nova Vaga</span>
          </button>
        ) : (
          <button
            onClick={() => setViewMode('list')}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center space-x-1.5 cursor-pointer border border-slate-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar à Lista</span>
          </button>
        )}
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {companyJobs.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-black text-slate-800">Sua empresa ainda não possui vagas publicadas</h3>
              <button
                onClick={() => setViewMode('new')}
                className="px-6 py-2.5 bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-sm"
              >
                Publicar Vaga Agora
              </button>
            </div>
          ) : (
            companyJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-extrabold text-slate-900">{job.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        job.status === 'open' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                        job.status === 'paused' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {job.status === 'open' ? '● Aberta' : job.status === 'paused' ? '⏸ Pausada' : 'Encerrada'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {job.department} • {job.city}, {job.state} • Criada em {job.createdAt}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3 text-xs">
                    <div className="text-right px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200 font-mono">
                      <span className="font-bold text-slate-900">{job.applicantCount}</span>
                      <span className="text-[10px] text-slate-500 block">Candidatos</span>
                    </div>

                    <button
                      onClick={() => onViewCandidatesForJob(job.id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center space-x-1 cursor-pointer"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Ver Inscritos IA</span>
                    </button>

                    {job.status === 'open' ? (
                      <button
                        onClick={() => {
                          onUpdateJobStatus(job.id, 'paused');
                          showToast(`Vaga "${job.title}" foi pausada.`);
                        }}
                        className="p-2 rounded-xl border border-slate-200 hover:bg-amber-50 text-slate-600 hover:text-amber-700 transition"
                        title="Pausar Vaga"
                      >
                        <PauseCircle className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          onUpdateJobStatus(job.id, 'open');
                          showToast(`Vaga "${job.title}" reativada!`);
                        }}
                        className="p-2 rounded-xl border border-slate-200 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition"
                        title="Reativar Vaga"
                      >
                        <PlayCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-800 rounded-xl font-bold uppercase text-[10px] border border-blue-100">
                    {job.workModel}
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-xl font-bold text-[10px]">
                    R$ {job.salaryMin.toLocaleString('pt-BR')} - {job.salaryMax.toLocaleString('pt-BR')}
                  </span>
                  {job.technologies.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* New Job Form Wizard */}
      {viewMode === 'new' && (
        <form onSubmit={handleSaveJob} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-black text-slate-900">Formulário de Cadastro de Vaga</h3>
            <p className="text-xs text-slate-500 font-medium">Preencha os detalhes para que o algoritmo de IA classifique os melhores candidatos</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Título da Vaga *</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Desenvolvedor Full Stack Senior"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Área / Departamento</label>
              <input 
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Ex: Engenharia de Software"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Modelo de Trabalho</label>
              <select 
                value={workModel}
                onChange={(e) => setWorkModel(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none"
              >
                <option value="remoto">100% Remoto</option>
                <option value="hibrido">Híbrido</option>
                <option value="presencial">Presencial</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sênioridade</label>
              <select 
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none"
              >
                <option value="junior">Júnior</option>
                <option value="pleno">Pleno</option>
                <option value="senior">Sênior</option>
                <option value="lideranca">Liderança / Head</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Cidade</label>
              <input 
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Estado (UF)</label>
              <input 
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Salário Mínimo (R$)</label>
              <input 
                type="number"
                value={salaryMin}
                onChange={(e) => setSalaryMin(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Salário Máximo (R$)</label>
              <input 
                type="number"
                value={salaryMax}
                onChange={(e) => setSalaryMax(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Descrição Detalhada da Vaga *</label>
            <textarea 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a vaga, o contexto do time e as expectativas..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Responsabilidades (1 por linha)</label>
              <textarea 
                rows={3}
                value={responsibilitiesText}
                onChange={(e) => setResponsibilitiesText(e.target.value)}
                placeholder="Desenvolver APIs em Node.js&#10;Criar interfaces no React"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Requisitos Mínimos (1 por linha)</label>
              <textarea 
                rows={3}
                value={requirementsText}
                onChange={(e) => setRequirementsText(e.target.value)}
                placeholder="5 anos exp com TypeScript&#10;Inglês avançado"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Benefícios (Separados por vírgula)</label>
              <input 
                type="text"
                value={benefitsText}
                onChange={(e) => setBenefitsText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tecnologias / Palavras-chave IA (Separadas por vírgula)</label>
              <input 
                type="text"
                value={techsText}
                onChange={(e) => setTechsText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              />
            </div>
          </div>

          {/* Screening Questions */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-800">Perguntas Eliminatórias ou de Triagem</label>
            <div className="flex gap-2">
              <input 
                type="text"
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                placeholder="Ex: Você tem disponibilidade para viagens ocasionais?"
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
              />
              <button 
                type="button" 
                onClick={handleAddQuestion}
                className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
              >
                Adicionar Pergunta
              </button>
            </div>

            <div className="space-y-2">
              {questions.map((q) => (
                <div key={q.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs">
                  <span>{q.question}</span>
                  <button type="button" onClick={() => handleRemoveQuestion(q.id)} className="text-red-500 hover:text-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="px-5 py-2.5 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Publicar Vaga e Iniciar IA</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
