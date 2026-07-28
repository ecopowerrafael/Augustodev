import React, { useState } from "react";
import { 
  Building2, Users, Clock, ShieldCheck, Plus, Check, MoreVertical, CreditCard, Award
} from "lucide-react";

export const ClinicAdminView: React.FC = () => {
  const [team, setTeam] = useState([
    { id: "1", name: "Dra. Mariana Lopes", crp: "06/123456", role: "Psicóloga Infantil", sessionsCount: 18, limit: 30, status: "active" },
    { id: "2", name: "Dr. Gabriel Santos", crp: "05/456789", role: "Terapia Cognitiva", sessionsCount: 22, limit: 30, status: "active" },
    { id: "3", name: "Dra. Camila Rodrigues", crp: "04/987654", role: "Psicologia Adolescente", sessionsCount: 14, limit: 30, status: "active" }
  ]);

  return (
    <div className="w-full flex flex-col gap-6 font-sans text-[#2F3142] animate-fade-in">
      {/* Header */}
      <div className="bg-white border border-[#E7E5F0] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#5E9FD6]/20 text-[#5E9FD6] text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              Painel da Clínica
            </span>
            <span className="text-xs text-[#73768B]">Clínica Emoções & Vida</span>
          </div>
          <h2 className="font-extrabold text-xl text-[#2F3142] mt-1">Gestão de Equipe & Licenças</h2>
        </div>

        <button className="px-4 py-2 bg-[#7567E8] text-white rounded-xl text-xs font-bold hover:bg-[#6253D6] shadow-sm flex items-center gap-1.5 transition-colors">
          <Plus className="w-4 h-4" />
          Convidar Psicólogo
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E7E5F0] p-4 rounded-xl shadow-xs">
          <span className="text-[10px] font-bold text-[#73768B] uppercase">Licenças Utilizadas</span>
          <p className="text-2xl font-black text-[#7567E8] mt-1">3 de 5</p>
          <span className="text-[10px] text-[#64B89A] font-semibold">2 licenças livres</span>
        </div>

        <div className="bg-white border border-[#E7E5F0] p-4 rounded-xl shadow-xs">
          <span className="text-[10px] font-bold text-[#73768B] uppercase">Total de Sessões no Mês</span>
          <p className="text-2xl font-black text-[#5E9FD6] mt-1">54 sessões</p>
          <span className="text-[10px] text-[#73768B]">Média de 18 por profissional</span>
        </div>

        <div className="bg-white border border-[#E7E5F0] p-4 rounded-xl shadow-xs">
          <span className="text-[10px] font-bold text-[#73768B] uppercase">Plano da Clínica</span>
          <p className="text-2xl font-black text-[#64B89A] mt-1">Corporativo</p>
          <span className="text-[10px] text-[#73768B]">Renovação automática anual</span>
        </div>
      </div>

      {/* Team Table */}
      <div className="bg-white border border-[#E7E5F0] rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[#2F3142]">Profissionais Cadastrados</h3>

        <div className="divide-y divide-[#E7E5F0]">
          {team.map(prof => (
            <div key={prof.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-bold text-sm text-[#2F3142]">{prof.name}</p>
                <p className="text-[#73768B] text-[11px]">{prof.role} • CRP {prof.crp}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-[#7567E8]">{prof.sessionsCount} / {prof.limit} sessões</p>
                  <p className="text-[10px] text-[#73768B]">Uso mensal</p>
                </div>

                <span className="bg-[#64B89A]/20 text-[#308164] font-bold px-2.5 py-1 rounded-full text-[10px]">
                  Ativo
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
