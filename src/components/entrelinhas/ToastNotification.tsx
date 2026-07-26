import React, { useEffect } from "react";
import { CheckCircle2, Info, X } from "lucide-react";

interface ToastNotificationProps {
  message: string | null;
  onClose: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in font-sans">
      <div className="bg-[var(--bg-sec)] border border-[var(--border-color)] text-[var(--text-main)] px-4 py-3 rounded-xl shadow-xl flex items-center space-x-3 text-xs sm:text-sm font-medium">
        <CheckCircle2 className="w-4 h-4 text-[var(--accent-color)] shrink-0" />
        <span>{message}</span>
        <button
          onClick={onClose}
          className="p-1 text-[var(--text-sec)] hover:text-[var(--text-main)] transition-colors rounded-lg"
          aria-label="Fechar notificação"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
