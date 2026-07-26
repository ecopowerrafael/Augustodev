import React, { useState } from "react";
import { NexoLogo } from "./NexoLogo";
import {
  Search,
  MapPin,
  Ticket,
  User,
  Shield,
  Briefcase,
  QrCode,
  ShoppingBag,
  Menu,
  X,
  HelpCircle,
  Calendar,
  Layers,
  ChevronDown
} from "lucide-react";

export type NexoRole = "client_public" | "client_area" | "access_team" | "admin_space" | "operator_panel";

interface PublicHeaderProps {
  currentRole: NexoRole;
  onRoleChange: (role: NexoRole) => void;
  cartCount: number;
  onOpenCart: () => void;
  onNavigateHome: () => void;
  onNavigateEvents: () => void;
  onNavigateMyTickets: () => void;
  onNavigateHowItWorks: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({
  currentRole,
  onRoleChange,
  cartCount,
  onOpenCart,
  onNavigateHome,
  onNavigateEvents,
  onNavigateMyTickets,
  onNavigateHowItWorks,
  searchQuery,
  onSearchChange,
  activeNav,
  setActiveNav
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("São Paulo — SP");

  const roles = [
    { id: "client_public" as NexoRole, label: "🌐 Site Público", badge: "Comprador" },
    { id: "client_area" as NexoRole, label: "👤 Área do Cliente", badge: "3 Ingressos" },
    { id: "access_team" as NexoRole, label: "🎟️ Validação Portaria", badge: "Scanner QR" },
    { id: "admin_space" as NexoRole, label: "🏢 Painel do Espaço", badge: "Admin Master" },
    { id: "operator_panel" as NexoRole, label: "🎧 Painel Operador", badge: "Sunset Eventos" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#12101B]/95 backdrop-blur-md border-b border-white/10 text-white shadow-xl">
      {/* Top Prototype Role Switcher Banner */}
      <div className="bg-[#25164F] border-b border-[#6D3DF5]/30 py-1.5 px-4 text-xs font-sans">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-gray-300 text-[11px]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1FA971] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1FA971]"></span>
            </span>
            <span className="font-semibold text-white">PROTÓTIPO NAVEGÁVEL NEXO TICKETS</span>
            <span className="hidden md:inline text-gray-400">— Alterne o perfil de acesso para testar todas as visões:</span>
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto py-0.5 no-scrollbar">
            {roles.map((r) => {
              const isActive = currentRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => onRoleChange(r.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap flex items-center space-x-1 ${
                    isActive
                      ? "bg-[#6D3DF5] text-white shadow-md shadow-[#6D3DF5]/40 ring-1 ring-white/30"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button onClick={onNavigateHome} className="text-left focus:outline-none">
          <NexoLogo showSlogan={false} size="md" />
        </button>

        {/* Location & Search Bar (Desktop) */}
        <div className="hidden lg:flex items-center space-x-3 flex-1 max-w-xl mx-4">
          {/* Location Selector */}
          <div className="flex items-center space-x-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 whitespace-nowrap">
            <MapPin className="w-3.5 h-3.5 text-[#F0448B]" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="São Paulo — SP" className="bg-[#12101B]">São Paulo — SP</option>
              <option value="Campinas — SP" className="bg-[#12101B]">Campinas — SP</option>
              <option value="Sorocaba — SP" className="bg-[#12101B]">Sorocaba — SP</option>
              <option value="Rio de Janeiro — RJ" className="bg-[#12101B]">Rio de Janeiro — RJ</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Busque por evento, artista, local ou cidade..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 focus:border-[#6D3DF5] rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-gray-300">
          <button
            onClick={() => {
              setActiveNav("inicio");
              onNavigateHome();
            }}
            className={`hover:text-white transition-colors ${activeNav === "inicio" ? "text-[#F0448B] font-bold" : ""}`}
          >
            Início
          </button>
          <button
            onClick={() => {
              setActiveNav("eventos");
              onNavigateEvents();
            }}
            className={`hover:text-white transition-colors ${activeNav === "eventos" ? "text-[#F0448B] font-bold" : ""}`}
          >
            Eventos
          </button>
          <button
            onClick={() => {
              setActiveNav("meus-ingressos");
              onRoleChange("client_area");
              onNavigateMyTickets();
            }}
            className={`hover:text-white transition-colors flex items-center space-x-1 ${
              activeNav === "meus-ingressos" || currentRole === "client_area" ? "text-[#6D3DF5] font-bold" : ""
            }`}
          >
            <Ticket className="w-3.5 h-3.5 text-[#6D3DF5]" />
            <span>Meus Ingressos</span>
          </button>
          <button
            onClick={() => {
              setActiveNav("como-funciona");
              onNavigateHowItWorks();
            }}
            className={`hover:text-white transition-colors ${activeNav === "como-funciona" ? "text-[#F0448B] font-bold" : ""}`}
          >
            Como funciona
          </button>
        </nav>

        {/* Right CTA / Cart Button */}
        <div className="flex items-center space-x-3">
          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 bg-[#6D3DF5]/20 border border-[#6D3DF5]/50 hover:bg-[#6D3DF5]/30 rounded-xl text-white transition-all flex items-center space-x-2"
          >
            <ShoppingBag className="w-4 h-4 text-[#F0448B]" />
            <span className="text-xs font-bold hidden sm:inline">Carrinho</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-black bg-[#F0448B] text-white rounded-full animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account Quick Toggle */}
          <button
            onClick={() => onRoleChange("client_area")}
            className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 text-xs text-white font-medium transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#6D3DF5] to-[#F0448B] flex items-center justify-center text-[10px] font-bold">
              MO
            </div>
            <span className="max-w-[100px] truncate">Marcelo O.</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white md:hidden focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#12101B] border-b border-white/10 px-4 py-4 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar eventos..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => {
                onNavigateHome();
                setMobileMenuOpen(false);
              }}
              className="p-3 bg-white/5 rounded-xl text-left hover:bg-white/10 text-white"
            >
              Início
            </button>
            <button
              onClick={() => {
                onNavigateEvents();
                setMobileMenuOpen(false);
              }}
              className="p-3 bg-white/5 rounded-xl text-left hover:bg-white/10 text-white"
            >
              Eventos
            </button>
            <button
              onClick={() => {
                onRoleChange("client_area");
                onNavigateMyTickets();
                setMobileMenuOpen(false);
              }}
              className="p-3 bg-[#6D3DF5]/20 border border-[#6D3DF5]/40 rounded-xl text-left text-white flex items-center justify-between"
            >
              <span>Meus Ingressos</span>
              <Ticket className="w-4 h-4 text-[#6D3DF5]" />
            </button>
            <button
              onClick={() => {
                onNavigateHowItWorks();
                setMobileMenuOpen(false);
              }}
              className="p-3 bg-white/5 rounded-xl text-left hover:bg-white/10 text-white"
            >
              Como Funciona
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
