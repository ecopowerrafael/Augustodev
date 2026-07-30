import React, { useState, useMemo } from 'react';
import { JobPosition, WorkModel, ExperienceLevel, Application } from '../../types/rhconnect';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Filter, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  DollarSign, 
  Clock, 
  FileText, 
  Send, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface RHJobSearchAndApplyProps {
  jobs: JobPosition[];
  onApplyToJob: (jobId: string, answers: { questionId: string; question: string; answer: string }[]) => void;
  userApplications: Application[];
  showToast: (msg: string) => void;
  candidateName: string;
}

export const RHJobSearchAndApply: React.FC<RHJobSearchAndApplyProps> = ({
  jobs,
  onApplyToJob,
  userApplications,
  showToast,
  candidateName
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorkModel, setSelectedWorkModel] = useState<string>('todos');
  const [selectedLevel, setSelectedLevel] = useState<string>('todos');
  const [selectedCity, setSelectedCity] = useState<string>('todas');

  // Modals state
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<JobPosition | null>(null);
  const [jobToApply, setJobToApply] = useState<JobPosition | null>(null);
  const [applyStep, setApplyStep] = useState<1 | 2 | 3>(1);
  const [screeningAnswers, setScreeningAnswers] = useState<Record<string, string>>({});

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      if (job.status !== 'open') return false;

      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.technologies.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesModel = selectedWorkModel === 'todos' || job.workModel === selectedWorkModel;
      const matchesLevel = selectedLevel === 'todos' || job.experienceLevel === selectedLevel;
      const matchesCity = selectedCity === 'todas' || job.city.toLowerCase() === selectedCity.toLowerCase();

      return matchesSearch && matchesModel && matchesLevel && matchesCity;
    });
  }, [jobs, searchTerm, selectedWorkModel, selectedLevel, selectedCity]);

  // Check if candidate already applied
  const isAlreadyApplied = (jobId: string) => {
    return userApplications.some(a => a.jobId === jobId);
  };

  const startApplicationWizard = (job: JobPosition) => {
    setSelectedJobForDetail(null);
    setJobToApply(job);
    setApplyStep(1);
    const initialAnswers: Record<string, string> = {};
    job.screeningQuestions.forEach(q => {
      initialAnswers[q.id] = '';
    });
    setScreeningAnswers(initialAnswers);
  };

  const submitApplication = () => {
    if (!jobToApply) return;
    const formattedAnswers = jobToApply.screeningQuestions.map(q => ({
      questionId: q.id,
      question: q.question,
      answer: screeningAnswers[q.id] || 'Sem resposta'
    }));

    onApplyToJob(jobToApply.id, formattedAnswers);
    setApplyStep(3);
    showToast(`Candidatura para ${jobToApply.title} enviada com sucesso!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-8 text-left text-slate-900">
      
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-4">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-mono font-bold rounded-full">
            <Search className="w-3.5 h-3.5" />
            <span>Oportunidades em Tecnologia, Gestão & Saúde</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Encontre a vaga perfeita com Triagem de IA
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Explore vagas atualizadas em tempo real. Nossa inteligência artificial calcula seu Score de Aderência instantaneamente.
          </p>
        </div>

        {/* Search Keyword Bar */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por cargo, empresa ou tecnologia (ex: React, Financeiro, UX)..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none shadow-2xs"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (3 cols): Filters Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <Filter className="w-3.5 h-3.5 text-blue-600" />
                <span>Filtros de Vagas</span>
              </h3>
              {(selectedWorkModel !== 'todos' || selectedLevel !== 'todos' || selectedCity !== 'todas') && (
                <button 
                  onClick={() => {
                    setSelectedWorkModel('todos');
                    setSelectedLevel('todos');
                    setSelectedCity('todas');
                  }}
                  className="text-[10px] font-bold text-blue-600 hover:underline"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Filter: Work Model */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Modelo de Trabalho</label>
              <select 
                value={selectedWorkModel}
                onChange={(e) => setSelectedWorkModel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
              >
                <option value="todos">Todos os modelos</option>
                <option value="remoto">Remoto</option>
                <option value="hibrido">Híbrido</option>
                <option value="presencial">Presencial</option>
              </select>
            </div>

            {/* Filter: Seniority */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Nível de Experiência</label>
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
              >
                <option value="todos">Todos os níveis</option>
                <option value="junior">Júnior</option>
                <option value="pleno">Pleno</option>
                <option value="senior">Sênior</option>
              </select>
            </div>

            {/* Filter: City */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Cidade / Localidade</label>
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
              >
                <option value="todas">Todas as cidades</option>
                <option value="são paulo">São Paulo, SP</option>
                <option value="rio de janeiro">Rio de Janeiro, RJ</option>
                <option value="belo horizonte">Belo Horizonte, MG</option>
                <option value="curitiba">Curitiba, PR</option>
                <option value="campinas">Campinas, SP</option>
              </select>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 font-mono">
              Exibindo <span className="font-bold text-slate-900">{filteredJobs.length}</span> vagas ativas.
            </div>
          </div>
        </div>

        {/* Right Column (9 cols): Job Feed Cards */}
        <div className="lg:col-span-9 space-y-4">
          
          {filteredJobs.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-black text-slate-800">Nenhuma vaga encontrada para esses filtros</h3>
              <p className="text-xs text-slate-500">Tente ajustar seus termos de busca ou limpar os filtros na barra lateral.</p>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const applied = isAlreadyApplied(job.id);
              return (
                <div 
                  key={job.id}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-start space-x-3.5">
                      <img 
                        src={job.companyLogo} 
                        alt={job.companyName} 
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-base font-extrabold text-slate-900">{job.title}</h3>
                          {applied && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                              ✓ Candidatado
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 font-medium flex items-center space-x-2">
                          <span className="font-bold text-blue-600">{job.companyName}</span>
                          <span>•</span>
                          <span className="flex items-center"><MapPin className="w-3 h-3 mr-0.5 text-slate-400" />{job.city}, {job.state}</span>
                        </p>
                      </div>
                    </div>

                    {/* AI Score Match Badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-extrabold shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                      <span>Score IA ~ 90% Match</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                    {job.description}
                  </p>

                  {/* Tags & Salary */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex flex-wrap gap-1.5 font-bold">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-800 rounded-xl border border-blue-100 uppercase text-[10px]">
                        {job.workModel}
                      </span>
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-xl uppercase text-[10px]">
                        {job.experienceLevel}
                      </span>
                      {job.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-[10px]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="font-extrabold text-slate-900 text-xs">
                        R$ {job.salaryMin.toLocaleString('pt-BR')} - {job.salaryMax.toLocaleString('pt-BR')}
                      </span>

                      <button
                        onClick={() => setSelectedJobForDetail(job)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl transition cursor-pointer"
                      >
                        Ver Vaga
                      </button>

                      {!applied ? (
                        <button
                          onClick={() => startApplicationWizard(job)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition flex items-center space-x-1 cursor-pointer"
                        >
                          <span>Candidatar-se</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          disabled
                          className="px-4 py-2 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl cursor-not-allowed"
                        >
                          Candidatado
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })
          )}

        </div>

      </div>

      {/* Job Details Modal */}
      {selectedJobForDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden font-sans space-y-6 p-6 text-left max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div className="flex space-x-3">
                <img 
                  src={selectedJobForDetail.companyLogo} 
                  alt={selectedJobForDetail.companyName} 
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div>
                  <h2 className="text-xl font-black text-slate-900">{selectedJobForDetail.title}</h2>
                  <p className="text-xs font-bold text-blue-600">{selectedJobForDetail.companyName} • {selectedJobForDetail.city}, {selectedJobForDetail.state}</p>
                </div>
              </div>

              <button onClick={() => setSelectedJobForDetail(null)} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-slate-700 font-medium">
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <span className="px-3 py-1 bg-blue-50 text-blue-800 rounded-xl uppercase">{selectedJobForDetail.workModel}</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-xl">Faixa Salarial: R$ {selectedJobForDetail.salaryMin.toLocaleString('pt-BR')} - {selectedJobForDetail.salaryMax.toLocaleString('pt-BR')}</span>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-sm text-slate-900">Descrição da Vaga</h4>
                <p>{selectedJobForDetail.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-sm text-slate-900">Responsabilidades</h4>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  {selectedJobForDetail.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-sm text-slate-900">Requisitos</h4>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  {selectedJobForDetail.requirements.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-sm text-slate-900">Benefícios</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedJobForDetail.benefits.map((b, i) => (
                    <span key={i} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-bold">
                      ✓ {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <button 
                onClick={() => setSelectedJobForDetail(null)}
                className="px-4 py-2.5 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl"
              >
                Fechar
              </button>

              <button
                onClick={() => startApplicationWizard(selectedJobForDetail)}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center space-x-1.5"
              >
                <span>Candidatar-se Agora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application 3-Step Wizard Modal */}
      {jobToApply && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden font-sans space-y-6 p-6 text-left">
            
            {/* Wizard Header */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  Candidatura Instantânea • Passo {applyStep} de 3
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">{jobToApply.title}</h3>
                <p className="text-xs text-slate-500 font-medium">{jobToApply.companyName}</p>
              </div>

              <button onClick={() => setJobToApply(null)} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Confirm Profile & Resume */}
            {applyStep === 1 && (
              <div className="space-y-4 text-xs text-slate-700">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <h4 className="font-extrabold text-slate-900 text-sm">Confirmar Dados do Perfil</h4>
                  <p><strong className="text-slate-900">Candidato:</strong> {candidateName}</p>
                  <p><strong className="text-slate-900">Currículo Anexado:</strong> CV_Mariana_Souza_2026.pdf (PDF)</p>
                  <p><strong className="text-slate-900">Localização:</strong> São Paulo, SP</p>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-blue-900 text-xs flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>A Inteligência Artificial irá processar seu perfil e gerar o Score de Aderência para o recrutador.</span>
                </div>

                <div className="flex justify-between pt-2">
                  <button 
                    onClick={() => setJobToApply(null)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={() => setApplyStep(2)}
                    className="px-6 py-2 bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-sm flex items-center space-x-1"
                  >
                    <span>Próximo Passo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Screening Questions */}
            {applyStep === 2 && (
              <div className="space-y-4 text-xs text-slate-700">
                <h4 className="font-extrabold text-slate-900 text-sm">Perguntas de Triagem da Empresa</h4>

                <div className="space-y-3">
                  {jobToApply.screeningQuestions.map((q) => (
                    <div key={q.id} className="space-y-1.5">
                      <label className="block font-bold text-slate-800">
                        {q.question} {q.isEliminatory && <span className="text-red-500">* (Eliminatória)</span>}
                      </label>
                      <textarea
                        rows={2}
                        value={screeningAnswers[q.id] || ''}
                        onChange={(e) => setScreeningAnswers({ ...screeningAnswers, [q.id]: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white outline-none"
                        placeholder="Digite sua resposta de forma clara..."
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-2">
                  <button 
                    onClick={() => setApplyStep(1)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Voltar
                  </button>

                  <button
                    onClick={submitApplication}
                    className="px-6 py-2 bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-sm flex items-center space-x-1"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirmar Candidatura</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Success Confirmation */}
            {applyStep === 3 && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">Candidatura Enviada!</h3>
                  <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto">
                    Seus dados foram submetidos à triagem de Inteligência Artificial da <strong className="text-slate-900">{jobToApply.companyName}</strong>.
                  </p>
                </div>

                <button
                  onClick={() => setJobToApply(null)}
                  className="px-6 py-2.5 bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-sm"
                >
                  Ir para Minhas Candidaturas
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
