import React, { useState } from "react";
import { EventItem, Order } from "../types/nexoTickets";
import { MOCK_EVENTS, INITIAL_ORDERS } from "../data/nexoTicketsData";
import { PublicHeader, NexoRole } from "../components/nexoTickets/PublicHeader";
import { PublicHome } from "../components/nexoTickets/PublicHome";
import { EventDetailPage } from "../components/nexoTickets/EventDetailPage";
import { CheckoutFlow } from "../components/nexoTickets/CheckoutFlow";
import { CustomerArea } from "../components/nexoTickets/CustomerArea";
import { AccessTeamScanner } from "../components/nexoTickets/AccessTeamScanner";
import { AdminDashboard } from "../components/nexoTickets/AdminDashboard";
import { OperatorDashboard } from "../components/nexoTickets/OperatorDashboard";
import { ArrowLeft, Ticket, ShieldCheck, Heart } from "lucide-react";

interface NexoTicketsAppProps {
  onBack?: () => void;
}

export const NexoTicketsApp: React.FC<NexoTicketsAppProps> = ({ onBack }) => {
  const [currentRole, setCurrentRole] = useState<NexoRole>("client_public");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNav, setActiveNav] = useState("inicio");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  const cartCount = Object.values(selectedQuantities).reduce((acc: number, curr: number) => acc + curr, 0);

  const handleStartCheckout = (quantities: Record<string, number>) => {
    setSelectedQuantities(quantities);
    setCheckoutOpen(true);
  };

  const handleCheckoutSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#12101B] text-white flex flex-col font-sans selection:bg-[#F0448B] selection:text-white">
      {/* Top Portfolio Back Button Bar */}
      {onBack && (
        <div className="bg-black/90 border-b border-white/10 px-4 py-2 flex items-center justify-between text-xs text-gray-300">
          <button
            onClick={onBack}
            className="flex items-center space-x-1 hover:text-white transition-colors text-gray-400 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Portfólio Principal</span>
          </button>
          <span className="font-mono text-[10px] text-[#F0448B] font-bold">CASE 33 • NEXO TICKETS PLATFORM</span>
        </div>
      )}

      {/* Main Header with Role Switcher */}
      <PublicHeader
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          if (role !== "client_public") {
            setSelectedEvent(null);
          }
        }}
        cartCount={cartCount}
        onOpenCart={() => {
          if (selectedEvent) {
            setCheckoutOpen(true);
          } else {
            setSelectedEvent(MOCK_EVENTS[0]);
            setCheckoutOpen(true);
          }
        }}
        onNavigateHome={() => {
          setCurrentRole("client_public");
          setSelectedEvent(null);
          setActiveNav("inicio");
        }}
        onNavigateEvents={() => {
          setCurrentRole("client_public");
          setSelectedEvent(null);
          setActiveNav("eventos");
          setTimeout(() => {
            const el = document.getElementById("eventos-grid");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
        onNavigateMyTickets={() => {
          setCurrentRole("client_area");
        }}
        onNavigateHowItWorks={() => {
          setCurrentRole("client_public");
          setSelectedEvent(null);
          setActiveNav("como-funciona");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* VIEW CONDITIONALS ACCORDING TO ROLE */}
      <div className="flex-1">
        {/* ROLE 1: PUBLIC CLIENTE */}
        {currentRole === "client_public" && (
          <>
            {selectedEvent ? (
              <EventDetailPage
                event={selectedEvent}
                onBack={() => setSelectedEvent(null)}
                onStartCheckout={handleStartCheckout}
              />
            ) : (
              <PublicHome
                events={MOCK_EVENTS}
                onSelectEvent={(evt) => setSelectedEvent(evt)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onExploreClick={() => {
                  const el = document.getElementById("eventos-grid");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              />
            )}
          </>
        )}

        {/* ROLE 2: ÁREA DO CLIENTE */}
        {currentRole === "client_area" && (
          <CustomerArea
            orders={orders}
            onNavigateEvent={() => {
              setCurrentRole("client_public");
              setSelectedEvent(null);
            }}
          />
        )}

        {/* ROLE 3: EQUIPE DE ACESSO (PORTARIA SCANNER) */}
        {currentRole === "access_team" && <AccessTeamScanner />}

        {/* ROLE 4: PAINEL ADMINISTRATIVO DO ESPAÇO */}
        {currentRole === "admin_space" && <AdminDashboard />}

        {/* ROLE 5: PAINEL DO OPERADOR */}
        {currentRole === "operator_panel" && <OperatorDashboard />}
      </div>

      {/* CHECKOUT MODAL FLOW */}
      {checkoutOpen && (
        <CheckoutFlow
          event={selectedEvent || MOCK_EVENTS[0]}
          selectedQuantities={selectedQuantities}
          onClose={() => setCheckoutOpen(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}

      {/* FOOTER */}
      <footer className="bg-[#0D0B14] border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <span className="font-black text-white text-base tracking-tight block">NEXO TICKETS</span>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Plataforma de venda de ingressos com split de pagamentos automatizado e liquidação garantida para espaços e operadores.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-2 uppercase text-[10px] tracking-wider">Para Compradores</h4>
            <ul className="space-y-1.5 text-gray-400">
              <li><button onClick={() => setCurrentRole("client_public")} className="hover:text-white">Buscar Eventos</button></li>
              <li><button onClick={() => setCurrentRole("client_area")} className="hover:text-white">Meus Ingressos</button></li>
              <li><a href="#" className="hover:text-white">Ajuda & FAQ</a></li>
              <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-2 uppercase text-[10px] tracking-wider">Para Produtores & Espaços</h4>
            <ul className="space-y-1.5 text-gray-400">
              <li><button onClick={() => setCurrentRole("admin_space")} className="hover:text-white">Painel do Espaço</button></li>
              <li><button onClick={() => setCurrentRole("operator_panel")} className="hover:text-white">Painel do Operador</button></li>
              <li><button onClick={() => setCurrentRole("admin_space")} className="hover:text-white">Calculadora de Split</button></li>
              <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-2 uppercase text-[10px] tracking-wider">Tecnologia & Pagamentos</h4>
            <p className="text-gray-400 text-[11px]">
              Checkout transparente com integração simulação gateway (Mercado Pago / Pagar.me), Pix instantâneo e parcelamento até 6x.
            </p>
            <div className="mt-3 flex items-center space-x-2 text-[#1FA971] font-bold text-[10px]">
              <ShieldCheck className="w-4 h-4" />
              <span>SISTEMA 100% CORTEX CERTIFIED</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-[11px] text-gray-500">
          © 2026 Nexo Tickets Tecnologia Ltda. Todos os direitos reservados. Protótipo navegável completo.
        </div>
      </footer>
    </div>
  );
};
export default NexoTicketsApp;
