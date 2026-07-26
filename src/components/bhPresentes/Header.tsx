import React, { useState } from "react";
import { STORE_INFO } from "../../data/bhPresentesData";
import { Phone, MessageCircle, MapPin, Menu, X, Shield, Sparkles, ChevronRight } from "lucide-react";

interface HeaderProps {
  onOpenForm: (selectedModel?: string) => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenForm, onNavigateToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B1F3A] text-white shadow-xl border-b border-white/10 font-sans">
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-[#176BFF] via-[#0B1F3A] to-[#25D366] text-white text-[11px] sm:text-xs py-1.5 px-4 font-semibold text-center flex items-center justify-center space-x-2 border-b border-white/10">
        <span className="inline-block w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        <span>⚡ Atendimento rápido pelo WhatsApp | Loja física na região da Pampulha, BH</span>
        <span className="hidden md:inline text-white/80">• (31) 99999-2026</span>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => onNavigateToSection("hero")} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-tr from-[#176BFF] to-[#25D366] p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <img
              src={STORE_INFO.logoUrl}
              alt={STORE_INFO.name}
              className="w-full h-full object-cover rounded-[14px]"
            />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-[#176BFF] transition-colors">
                {STORE_INFO.name}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-[#FFC928] text-[#0B1F3A] uppercase tracking-wider">
                Pampulha
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-300 line-clamp-1 font-medium">
              {STORE_INFO.slogan}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-bold text-gray-200">
          <button
            onClick={() => onNavigateToSection("ofertas")}
            className="hover:text-[#176BFF] transition-colors"
          >
            Ofertas em Destaque
          </button>
          <button
            onClick={() => onNavigateToSection("beneficios")}
            className="hover:text-[#176BFF] transition-colors"
          >
            Vantagens
          </button>
          <button
            onClick={() => onNavigateToSection("troca")}
            className="hover:text-[#176BFF] transition-colors flex items-center space-x-1 text-[#FFC928]"
          >
            <span>Troca com Usado</span>
          </button>
          <button
            onClick={() => onNavigateToSection("avaliacoes")}
            className="hover:text-[#176BFF] transition-colors"
          >
            Avaliações
          </button>
          <button
            onClick={() => onNavigateToSection("localizacao")}
            className="hover:text-[#176BFF] transition-colors"
          >
            Loja Física
          </button>
          <button
            onClick={() => onNavigateToSection("faq")}
            className="hover:text-[#176BFF] transition-colors"
          >
            Perguntas Frequentes
          </button>
        </nav>

        {/* Header Right Actions */}
        <div className="hidden sm:flex items-center space-x-3">
          <a
            href={`tel:${STORE_INFO.phone.replace(/\D/g, "")}`}
            className="hidden xl:flex items-center space-x-2 text-xs font-bold text-gray-300 hover:text-white px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#176BFF]" />
            <span>{STORE_INFO.phone}</span>
          </a>

          <button
            onClick={() => onNavigateToSection("ofertas")}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors border border-white/15"
          >
            Ver Ofertas
          </button>

          <button
            onClick={() => onOpenForm()}
            className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs transition-all shadow-lg shadow-[#25D366]/25 flex items-center space-x-2 hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Atendimento WhatsApp</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={() => onOpenForm()}
            className="p-2 rounded-xl bg-[#25D366] text-white font-bold text-xs"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white/10 text-white"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0B1F3A] border-t border-white/10 px-4 py-6 space-y-4 shadow-2xl animate-fadeIn">
          <div className="space-y-2 text-sm font-bold text-gray-200">
            <button
              onClick={() => {
                onNavigateToSection("ofertas");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between"
            >
              <span>Ver Ofertas de Celulares</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => {
                onNavigateToSection("troca");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl bg-[#FFC928]/10 text-[#FFC928] flex items-center justify-between"
            >
              <span>Avaliar Celular Usado para Troca</span>
              <ChevronRight className="w-4 h-4 text-[#FFC928]" />
            </button>
            <button
              onClick={() => {
                onNavigateToSection("beneficios");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between"
            >
              <span>Vantagens & Garantia</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => {
                onNavigateToSection("avaliacoes");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between"
            >
              <span>Avaliações de Clientes</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => {
                onNavigateToSection("localizacao");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between"
            >
              <span>Endereço da Loja Física na Pampulha</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="pt-2 border-t border-white/10 space-y-2">
            <button
              onClick={() => {
                onOpenForm();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-[#25D366] text-white font-black text-sm rounded-xl flex items-center justify-center space-x-2 shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chamar no WhatsApp Agora</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
