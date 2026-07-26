import React from "react";
import { X, MessageCircle, Phone, Mail, Instagram, MapPin, Shield } from "lucide-react";
import { KennelProfile } from "../../data/kennelLegacyData";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  kennel: KennelProfile;
}

export default function ContactModal({ isOpen, onClose, kennel }: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#12161B] border border-[#2A323C] rounded-2xl max-w-md w-full p-6 space-y-6 text-left shadow-2xl relative my-auto">
        <div className="flex items-center justify-between border-b border-[#2A323C] pb-4">
          <div>
            <span className="text-[10px] font-mono text-[#C8A45D] uppercase font-bold tracking-widest block">
              CONTATO DIRETO COM O CRIADOR
            </span>
            <h3 className="font-serif text-lg font-bold text-white">{kennel.name}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#171C22]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-[#0B0D10] rounded-xl border border-[#2A323C]">
          <img
            src={kennel.logoImage}
            alt={kennel.name}
            className="h-12 w-12 rounded-lg object-cover border border-[#C8A45D]"
            referrerPolicy="no-referrer"
          />
          <div className="text-left">
            <h4 className="font-serif text-sm font-bold text-white">{kennel.responsibleName}</h4>
            <div className="flex items-center space-x-1 text-xs text-slate-400">
              <MapPin className="h-3 w-3 text-[#C8A45D]" />
              <span>{kennel.city} — {kennel.state}</span>
            </div>
          </div>
        </div>

        {/* Contact Links */}
        <div className="space-y-2.5">
          <a
            href={`https://wa.me/${kennel.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#25D366] hover:bg-emerald-400 text-black font-mono text-xs font-bold rounded-xl flex items-center justify-between transition shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Conversar via WhatsApp</span>
            </div>
            <span>{kennel.phone}</span>
          </a>

          <a
            href={`tel:${kennel.phone}`}
            className="p-3 bg-[#171C22] hover:bg-[#2A323C] border border-[#2A323C] text-slate-200 font-mono text-xs font-bold rounded-xl flex items-center justify-between transition"
          >
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-[#C8A45D]" />
              <span>Ligação Telefônica</span>
            </div>
            <span>{kennel.phone}</span>
          </a>

          <a
            href={`mailto:${kennel.email}`}
            className="p-3 bg-[#171C22] hover:bg-[#2A323C] border border-[#2A323C] text-slate-200 font-mono text-xs font-bold rounded-xl flex items-center justify-between transition"
          >
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-[#4D8FD8]" />
              <span>Enviar E-mail Público</span>
            </div>
            <span className="truncate max-w-[140px]">{kennel.email}</span>
          </a>

          <a
            href={`https://instagram.com/${kennel.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#171C22] hover:bg-[#2A323C] border border-[#2A323C] text-slate-200 font-mono text-xs font-bold rounded-xl flex items-center justify-between transition"
          >
            <div className="flex items-center space-x-2">
              <Instagram className="h-4 w-4 text-[#E25B5B]" />
              <span>Instagram Oficial</span>
            </div>
            <span>{kennel.instagram}</span>
          </a>
        </div>

        <p className="text-[10px] text-slate-500 font-sans text-center">
          O Kennel Legacy não realiza intermediação financeira nem comissões sobre animais.
        </p>
      </div>
    </div>
  );
}
