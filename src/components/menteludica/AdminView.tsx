import React, { useState } from "react";
import { 
  BarChart3, Users, FileCheck2, Plus, Edit2, Trash2, Check, X, ShieldAlert, 
  BookOpen, Award, Layers, Search, ArrowUpRight, TrendingUp, Sparkles, Filter
} from "lucide-react";
import { INITIAL_RESOURCES, SCENARIO_OBJECTS, REFLECTIVE_CARDS } from "./mockData";
import { TherapeuticResource } from "./types";

export const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "crp_queue" | "resources" | "cards">("dashboard");
  const [resourcesList, setResourcesList] = useState<TherapeuticResource[]>(INITIAL_RESOURCES);
  const [crpQueue, setCrpQueue] = useState([
    { id: "crp-1", name: "Dra. Camila Rodrigues", crp: "04/987654", state: "Minas Gerais", date: "25/07/2026", status: "pending" },
    { id: "crp-2", name: "Dr. Gabriel Santos", crp: "05/456789", state: "Rio de Janeiro", date: "26/07/2026", status: "pending" },
    { id: "crp-3", name: "Dra. Juliana Lima", crp: "08/112233", state: "Paraná", date: "26/07/2026", status: "pending" }
  ]);
  const [newResourceTitle, setNewResourceTitle] = useState("");
  const [newResourceCategory, setNewResourceCategory] = useState("Cenário interativo");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const approveCRP = (id: string) => {
    setCrpQueue(prev => prev.filter(item => item.id !== id));
  };

  const createResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResourceTitle) return;

    const newRes: TherapeuticResource = {
      id: `rec-${Date.now()}`,
      title: newResourceTitle,
      category: newResourceCategory as any,
      type: newResourceCategory.includes("Cenário") ? "scenario" : newResourceCategory.includes("Desenho") ? "drawing" : "cards",
      ageRanges: ["7 a 9 anos", "10 a 12 anos"],
      demands: ["emoções", "autoconhecimento"],
      durationMinutes: "30 minutos",
      description: "Recurso cadastrado via painel administrativo da plataforma MenteLúdica.",
      objective: "Trabalho reflexivo e simbólico direcionado pelo psicólogo.",
      indications: ["Indicado para avaliação e intervenção clínica"],
      howToUse: ["Inicie apresentando o conceito do recurso ao paciente."],
      elementsAvailable: ["Elementos interativos padrão"],
      careInstructions: "Condução sob supervisão profissional.",
      isFavorite: false,
      usesCount: 1,
      coverImage: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80",
      badge: "Novo"
    };

    setResourcesList(prev => [newRes, ...prev]);
    setNewResourceTitle("");
    setShowCreateModal(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 font-sans text-[#2F3142]">
      {/* Top Admin Header */}
      <div className="bg-white border border-[#E7E5F0] rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#7567E8]/10 text-[#7567E8] text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              Super Admin SaaS
            </span>
            <span className="text-xs text-[#73768B]">MenteLúdica Control Panel</span>
          </div>
          <h2 className="font-extrabold text-xl text-[#2F3142] mt-1">Gestão da Plataforma & Conteúdo</h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-[#F7F6FB] p-1.5 rounded-xl border border-[#E7E5F0] text-xs font-semibold">
          {[
            { id: "dashboard", label: "Visão Geral" },
            { id: "crp_queue", label: `Fila CRP (${crpQueue.length})` },
            { id: "resources", label: "Recursos" },
            { id: "cards", label: "Baralhos & Cartas" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-[#7567E8] text-white shadow-xs"
                  : "text-[#73768B] hover:text-[#2F3142]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: DASHBOARD METRICS */}
      {activeTab === "dashboard" && (
        <div className="space-y-6 animate-fade-in">
          {/* KPI Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Psicólogos Cadastrados", val: "1.842", sub: "+12% este mês", color: "text-[#7567E8]" },
              { label: "Assinaturas Ativas", val: "1.216", sub: "66% do total", color: "text-[#64B89A]" },
              { label: "Em Periodo de Teste", val: "184", sub: "3 dias gratis", color: "text-[#5E9FD6]" },
              { label: "CRPs em Análise", val: crpQueue.length, sub: "Revisão pendente", color: "text-[#E7A3B4]" },
              { label: "Sessões no Mês", val: "8.426", sub: "21.380 recursos", color: "text-[#2F3142]" },
              { label: "Receita Recorrente (MRR)", val: "R$ 94.680", sub: "Previsão R$ 102k", color: "text-[#64B89A]" }
            ].map((kpi, i) => (
              <div key={i} className="bg-white border border-[#E7E5F0] p-4 rounded-xl shadow-xs flex flex-col justify-between">
                <span className="text-[10px] font-bold text-[#73768B] uppercase leading-tight">{kpi.label}</span>
                <span className={`text-xl font-black mt-2 ${kpi.color}`}>{kpi.val}</span>
                <span className="text-[10px] text-[#73768B] mt-1 font-medium">{kpi.sub}</span>
              </div>
            ))}
          </div>

          {/* Charts & Analytics Mock */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 bg-white border border-[#E7E5F0] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E5F0]">
                <h3 className="font-bold text-sm text-[#2F3142]">Crescimento de Cadastros e Assinantes</h3>
                <span className="text-xs text-[#64B89A] font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +24% QoQ
                </span>
              </div>

              <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2 border-b border-[#E7E5F0]">
                {[
                  { month: "Jan", val: 40 },
                  { month: "Fev", val: 55 },
                  { month: "Mar", val: 68 },
                  { month: "Abr", val: 72 },
                  { month: "Mai", val: 85 },
                  { month: "Jun", val: 92 },
                  { month: "Jul", val: 100 }
                ].map((m, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-[#7567E8]/10 group-hover:bg-[#7567E8] rounded-t-lg transition-all" style={{ height: `${m.val}%` }} />
                    <span className="text-[10px] font-bold text-[#73768B]">{m.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white border border-[#E7E5F0] rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-[#2F3142]">Recursos Mais Utilizados</h3>
              <div className="space-y-3 text-xs">
                {INITIAL_RESOURCES.slice(0, 3).map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-[#F7F6FB] rounded-xl border border-[#E7E5F0]">
                    <div>
                      <p className="font-bold text-[#2F3142]">{r.title}</p>
                      <p className="text-[10px] text-[#73768B]">{r.category}</p>
                    </div>
                    <span className="font-mono font-bold text-[#7567E8]">{r.usesCount} usos</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: CRP VALIDATION QUEUE */}
      {activeTab === "crp_queue" && (
        <div className="bg-white border border-[#E7E5F0] rounded-2xl p-6 shadow-sm space-y-4 animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E5F0]">
            <div>
              <h3 className="font-bold text-base text-[#2F3142]">Validação Profissional de CRP</h3>
              <p className="text-xs text-[#73768B]">Verifique a autenticidade dos registros enviados pelos psicólogos.</p>
            </div>
            <span className="bg-[#E7A3B4]/20 text-[#D84C72] text-xs font-bold px-3 py-1 rounded-full">
              {crpQueue.length} aguardando
            </span>
          </div>

          {crpQueue.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#73768B]">
              <Check className="w-8 h-8 text-[#64B89A] mx-auto mb-2" />
              Nenhum CRP pendente de validação no momento.
            </div>
          ) : (
            <div className="divide-y divide-[#E7E5F0]">
              {crpQueue.map(item => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <p className="font-bold text-sm text-[#2F3142]">{item.name}</p>
                    <div className="flex gap-2 text-[#73768B] mt-0.5">
                      <span>CRP: <strong className="text-[#2F3142]">{item.crp}</strong></span>
                      <span>• {item.state}</span>
                      <span>• Enviado em {item.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => approveCRP(item.id)}
                      className="px-3 py-1.5 bg-[#64B89A] hover:bg-[#529E83] text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Aprovar CRP
                    </button>
                    <button
                      onClick={() => approveCRP(item.id)}
                      className="px-3 py-1.5 bg-[#F7F6FB] hover:bg-[#E7E5F0] text-[#73768B] rounded-xl font-medium transition-colors"
                    >
                      Solicitar Documento
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: RESOURCES MANAGEMENT (NO CODE DEPLOY) */}
      {activeTab === "resources" && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#2F3142]">Biblioteca de Recursos da Plataforma</h3>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-[#7567E8] text-white rounded-xl text-xs font-bold hover:bg-[#6253D6] shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Cadastrar Novo Recurso
            </button>
          </div>

          {/* Modal to create resource */}
          {showCreateModal && (
            <form onSubmit={createResource} className="bg-white border border-[#E7E5F0] p-5 rounded-2xl shadow-lg space-y-3">
              <h4 className="font-bold text-sm text-[#2F3142]">Novo Recurso Terapêutico</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Título do recurso"
                  value={newResourceTitle}
                  onChange={(e) => setNewResourceTitle(e.target.value)}
                  className="p-2.5 border border-[#E7E5F0] rounded-xl bg-[#F7F6FB]"
                />
                <select
                  value={newResourceCategory}
                  onChange={(e) => setNewResourceCategory(e.target.value)}
                  className="p-2.5 border border-[#E7E5F0] rounded-xl bg-[#F7F6FB]"
                >
                  <option value="Cenário interativo">Cenário interativo</option>
                  <option value="Desenho livre">Desenho livre</option>
                  <option value="Cartas reflexivas">Cartas reflexivas</option>
                  <option value="Atividade guiada">Atividade guiada</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 text-[#73768B] hover:bg-[#F7F6FB] rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#7567E8] text-white font-bold rounded-lg hover:bg-[#6253D6]"
                >
                  Publicar Recurso
                </button>
              </div>
            </form>
          )}

          {/* Resources List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {resourcesList.map(res => (
              <div key={res.id} className="bg-white border border-[#E7E5F0] p-4 rounded-xl shadow-xs flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <img src={res.coverImage} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <span className="text-[10px] font-bold text-[#7567E8] uppercase">{res.category}</span>
                    <p className="font-bold text-[#2F3142]">{res.title}</p>
                    <p className="text-[11px] text-[#73768B]">{res.usesCount} utilizações</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-[#73768B] hover:text-[#7567E8] rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: CARDS & SCENARIO OBJECTS LIBRARY */}
      {activeTab === "cards" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
          {/* Reflective Cards Deck Admin */}
          <div className="bg-white border border-[#E7E5F0] rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-[#2F3142]">Gestão do Baralho de Cartas</h3>
            <div className="space-y-2 text-xs max-h-96 overflow-y-auto pr-1">
              {REFLECTIVE_CARDS.map(c => (
                <div key={c.id} className="p-3 bg-[#F7F6FB] rounded-xl border border-[#E7E5F0]">
                  <span className="text-[10px] font-bold text-[#7567E8] uppercase">{c.category}</span>
                  <p className="font-semibold text-[#2F3142] mt-0.5">"{c.question}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scenario Objects Library Admin */}
          <div className="bg-white border border-[#E7E5F0] rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-[#2F3142]">Biblioteca de Objetos 2D</h3>
            <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto pr-1 text-xs">
              {SCENARIO_OBJECTS.map(obj => (
                <div key={obj.id} className="p-2 bg-[#F7F6FB] rounded-xl border border-[#E7E5F0] flex flex-col items-center justify-center text-center">
                  <span className="text-2xl">{obj.icon}</span>
                  <span className="text-[10px] font-medium text-[#2F3142] mt-1">{obj.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
