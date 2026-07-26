import React from "react";
import { STORE_INFO } from "../../data/bhPresentesData";
import { MapPin, Clock, Phone, MessageCircle, ExternalLink, Navigation, Store, CheckCircle2 } from "lucide-react";

interface LocationSectionProps {
  onOpenForm: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenForm }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${STORE_INFO.address}, ${STORE_INFO.neighborhood}, ${STORE_INFO.city} - ${STORE_INFO.state}`
  )}`;

  return (
    <section id="localizacao" className="py-16 bg-[#F5F7FA] text-[#18202A] font-sans scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="px-3.5 py-1 rounded-full text-xs font-black bg-[#176BFF] text-white uppercase tracking-wider inline-flex items-center space-x-1 shadow">
            <Store className="w-3.5 h-3.5" />
            <span>LOJA FÍSICA PAMPULHA</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A]">
            Visite Nossa Loja Física em Belo Horizonte
          </h2>
          <p className="text-sm text-[#687382]">
            Venha conhecer nossos aparelhos presencialmente, testar as câmeras e retirar seu smartphone com total segurança.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Store Info Details Card (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
              <img
                src={STORE_INFO.logoUrl}
                alt={STORE_INFO.name}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-[#176BFF]"
              />
              <div>
                <h3 className="text-xl font-black text-[#0B1F3A]">{STORE_INFO.name}</h3>
                <p className="text-xs text-[#25D366] font-extrabold">Aberto para Atendimento Presencial</p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-semibold text-[#18202A]">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-[#176BFF]/10 text-[#176BFF] rounded-xl shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-[#0B1F3A] block text-sm">Endereço Completo:</span>
                  <p className="text-[#687382] leading-relaxed">
                    {STORE_INFO.address} — {STORE_INFO.neighborhood}<br />
                    {STORE_INFO.city}/{STORE_INFO.state} (Próximo à Lagoa da Pampulha e UFMG)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-[#176BFF]/10 text-[#176BFF] rounded-xl shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-[#0B1F3A] block text-sm">Horário de Funcionamento:</span>
                  <p className="text-[#687382]">{STORE_INFO.hoursWeekdays}</p>
                  <p className="text-[#687382]">{STORE_INFO.hoursSaturday}</p>
                  <p className="text-gray-400 font-normal">{STORE_INFO.hoursSunday}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-[#25D366]/10 text-[#25D366] rounded-xl shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-[#0B1F3A] block text-sm">Contatos Diretos:</span>
                  <p className="text-[#687382]">WhatsApp: {STORE_INFO.whatsappDisplay}</p>
                  <p className="text-[#687382]">Telefone: {STORE_INFO.phone}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-[#0B1F3A] hover:bg-[#12315a] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <Navigation className="w-4 h-4 text-[#FFC928]" />
                <span>Abrir Rota no Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onOpenForm}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Avisar Que Estou Indo à Loja</span>
              </button>
            </div>
          </div>

          {/* Map & Storefront Graphic Showcase (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0B1F3A] rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-black text-[#FFC928] uppercase flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>MAPA DE LOCALIZAÇÃO PAMPULHA</span>
              </span>
              <span className="text-[10px] text-gray-300 font-mono">Pampulha, BH</span>
            </div>

            {/* Simulated Interactive Map Card */}
            <div className="relative rounded-2xl overflow-hidden h-72 bg-slate-800 border border-white/15 group">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80"
                alt="Mapa da Pampulha BH"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Map Overlay Landmark Pins */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-transparent flex flex-col justify-between p-4">
                <div className="flex justify-between items-start">
                  <div className="bg-[#176BFF] text-white px-3 py-1 rounded-xl text-[10px] font-black shadow flex items-center space-x-1">
                    <Navigation className="w-3 h-3" />
                    <span>Avenida Presidente Antônio Carlos, 7.500</span>
                  </div>

                  <div className="bg-[#0B1F3A]/90 text-[#FFC928] px-2.5 py-1 rounded-xl text-[10px] font-extrabold border border-white/20">
                    Próximo à Lagoa & Mineirão
                  </div>
                </div>

                {/* Central Store Pin */}
                <div className="self-center bg-[#25D366] text-white p-3 rounded-2xl shadow-2xl flex items-center space-x-2 border-2 border-white animate-bounce">
                  <Store className="w-5 h-5 text-white" />
                  <div>
                    <span className="font-black text-xs block leading-none">BH Presentes</span>
                    <span className="text-[9px] font-bold text-emerald-100">Loja de Celulares</span>
                  </div>
                </div>

                <div className="text-center text-xs text-gray-300 font-medium">
                  Fácil acesso com estacionamento em frente e linhas de ônibus na porta
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
