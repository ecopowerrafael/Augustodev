import React from "react";
import { STORE_INFO } from "../../data/bhPresentesData";
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Heart } from "lucide-react";

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenForm: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToSection, onOpenForm }) => {
  return (
    <footer className="bg-[#0B1F3A] text-white pt-16 pb-24 sm:pb-12 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Store Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={STORE_INFO.logoUrl}
                alt={STORE_INFO.name}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-[#176BFF]"
              />
              <div>
                <span className="text-xl font-black text-white block">{STORE_INFO.name}</span>
                <span className="text-xs text-[#FFC928] font-bold">{STORE_INFO.slogan}</span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              {STORE_INFO.complementaryText}
            </p>

            <div className="flex items-center space-x-2 text-xs font-bold text-[#25D366]">
              <ShieldCheck className="w-4 h-4" />
              <span>Loja Física & Garantia em BH</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-[#FFC928] uppercase tracking-wider">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs text-gray-300 font-semibold">
              <li>
                <button onClick={() => onNavigateToSection("ofertas")} className="hover:text-white">
                  Ofertas em Destaque
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection("beneficios")} className="hover:text-white">
                  Vantagens de Comprar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection("troca")} className="hover:text-white">
                  Programa de Troca (Trade-In)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection("avaliacoes")} className="hover:text-white">
                  Avaliações de Clientes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection("localizacao")} className="hover:text-white">
                  Endereço na Pampulha
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection("faq")} className="hover:text-white">
                  Perguntas Frequentes (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Store Info */}
          <div className="space-y-3 text-xs text-gray-300">
            <h4 className="text-sm font-black text-[#FFC928] uppercase tracking-wider">
              Atendimento e Loja
            </h4>
            <p className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-[#176BFF] shrink-0 mt-0.5" />
              <span>{STORE_INFO.address} — {STORE_INFO.neighborhood}, {STORE_INFO.city}/{STORE_INFO.state}</span>
            </p>
            <p className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-[#176BFF] shrink-0" />
              <span>{STORE_INFO.phone}</span>
            </p>
            <p className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
              <span>WhatsApp: {STORE_INFO.whatsappDisplay}</span>
            </p>
            <p className="flex items-start space-x-2">
              <Clock className="w-4 h-4 text-[#FFC928] shrink-0 mt-0.5" />
              <span>{STORE_INFO.hoursWeekdays}<br />{STORE_INFO.hoursSaturday}</span>
            </p>
          </div>

          {/* Col 4: Action & Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-[#FFC928] uppercase tracking-wider">
              Atendimento Comercial
            </h4>
            <button
              onClick={onOpenForm}
              className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Solicitar Orçamento no WhatsApp</span>
            </button>

            <div className="pt-2 text-[10px] text-gray-400 space-y-1">
              <p>• Política de Privacidade</p>
              <p>• Termos de Uso</p>
              <p>• Cookies e Segurança</p>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-white/10 text-center space-y-2 text-[11px] text-gray-400">
          <p>© {new Date().getFullYear()} {STORE_INFO.name} — Celulares novos, seminovos e acessórios em Belo Horizonte.</p>
          <p className="max-w-3xl mx-auto text-[10px] text-gray-500">
            * Protótipo conceitual para captação de leads via WhatsApp. As imagens, especificações, marcas e condições exibidas são demonstrativas e sujeitas a alteração sem aviso prévio. A confirmação de modelos e estoque é feita no atendimento presencial ou via WhatsApp.
          </p>
        </div>
      </div>
    </footer>
  );
};
