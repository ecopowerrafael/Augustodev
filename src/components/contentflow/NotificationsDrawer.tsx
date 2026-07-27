import React from 'react';
import { Bell, X, Check, FileText, CheckCircle, AlertTriangle, Layers } from 'lucide-react';
import { NotificationItem } from '../../types/contentflow';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  isDarkMode: boolean;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  isDarkMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className={`w-full max-w-md h-full border-l shadow-2xl flex flex-col justify-between overflow-hidden transition-all ${
        isDarkMode ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
      }`}>
        {/* Header */}
        <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-900/50">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-[#6C4FF8]" />
            <h3 className="text-base font-bold">Central de Notificações</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-xs font-bold text-[#6C4FF8] hover:underline"
            >
              Marcar lidas
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3.5 rounded-2xl border text-xs space-y-1 transition-all ${
                !notif.read
                  ? 'bg-purple-50/60 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800'
                  : 'bg-stone-50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 dark:text-stone-100">{notif.title}</span>
                <span className="text-[10px] text-stone-400">{notif.timestamp}</span>
              </div>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">{notif.message}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-xs font-bold"
          >
            Fechar Notificações
          </button>
        </div>
      </div>
    </div>
  );
};
