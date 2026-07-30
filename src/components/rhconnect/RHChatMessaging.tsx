import React, { useState } from 'react';
import { ChatThread, ChatMessage, UserRole } from '../../types/rhconnect';
import { 
  Send, 
  Paperclip, 
  Calendar, 
  ExternalLink, 
  User, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Search,
  Video
} from 'lucide-react';

interface RHChatMessagingProps {
  userRole: UserRole;
  threads: ChatThread[];
  messages: ChatMessage[];
  onSendMessage: (threadId: string, text: string, interviewInvite?: any) => void;
  showToast: (msg: string) => void;
}

export const RHChatMessaging: React.FC<RHChatMessagingProps> = ({
  userRole,
  threads,
  messages,
  onSendMessage,
  showToast
}) => {
  const [activeThreadId, setActiveThreadId] = useState<string>(threads[0]?.id || '');
  const [messageText, setMessageText] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Schedule interview form state
  const [interviewDate, setInterviewDate] = useState('2026-02-25');
  const [interviewTime, setInterviewTime] = useState('15:00');
  const [interviewPlatform, setInterviewPlatform] = useState('Google Meet');

  const activeThread = threads.find(t => t.id === activeThreadId);
  const activeMessages = messages.filter(m => m.threadId === activeThreadId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    onSendMessage(activeThreadId, messageText);
    setMessageText('');
  };

  const handleSendScheduleInvite = () => {
    const inviteObj = {
      date: interviewDate,
      time: interviewTime,
      platform: interviewPlatform,
      link: `https://meet.google.com/rhc-${Date.now()}`
    };

    onSendMessage(
      activeThreadId, 
      `Gostaríamos de agendar uma entrevista técnica para ${interviewDate} às ${interviewTime} via ${interviewPlatform}.`,
      inviteObj
    );

    setShowScheduleModal(false);
    showToast('Convite de entrevista enviado via Chat!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-6 text-left text-slate-900">
      
      {/* Title */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Mensagens & Agendamento de Entrevistas</h1>
        <p className="text-xs text-slate-500 font-medium">Comunicação direta entre candidatos e recrutadores das empresas</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
        
        {/* Left Sidebar (4 cols): Active Threads */}
        <div className="md:col-span-4 border-r border-slate-200 bg-slate-50/50 p-4 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Conversas Ativas</h3>
            <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              {threads.length} Mensagens
            </span>
          </div>

          <div className="space-y-2">
            {threads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              return (
                <button
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`w-full text-left p-3.5 rounded-2xl transition border flex items-center space-x-3 cursor-pointer ${
                    isActive 
                      ? 'bg-white border-blue-600 shadow-sm' 
                      : 'bg-white/60 border-slate-200 hover:bg-white'
                  }`}
                >
                  <img 
                    src={userRole === 'candidate' ? thread.companyLogo : thread.candidatePhoto} 
                    alt={thread.candidateName} 
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-extrabold text-xs text-slate-900 truncate">
                        {userRole === 'candidate' ? thread.companyName : thread.candidateName}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">{thread.lastMessageTime}</span>
                    </div>
                    <p className="text-[11px] text-blue-600 font-bold truncate">{thread.jobTitle}</p>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{thread.lastMessage}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Area (8 cols): Chat Window */}
        <div className="md:col-span-8 flex flex-col justify-between bg-white">
          
          {/* Active Thread Header */}
          {activeThread && (
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/80">
              <div className="flex items-center space-x-3">
                <img 
                  src={userRole === 'candidate' ? activeThread.companyLogo : activeThread.candidatePhoto} 
                  alt={activeThread.candidateName} 
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-black text-sm text-slate-900">
                    {userRole === 'candidate' ? activeThread.companyName : activeThread.candidateName}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Vaga: {activeThread.jobTitle}</p>
                </div>
              </div>

              {/* Action: Company can schedule interview */}
              {userRole === 'company' && (
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Entrevista</span>
                </button>
              )}
            </div>
          )}

          {/* Messages Feed */}
          <div className="p-6 space-y-4 flex-1 overflow-y-auto max-h-[420px]">
            {activeMessages.map((msg) => {
              const isMine = (userRole === 'candidate' && msg.senderType === 'candidate') ||
                             (userRole === 'company' && msg.senderType === 'company');

              return (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-medium">
                    <span>{msg.senderName}</span>
                    <span>•</span>
                    <span className="font-mono">{msg.timestamp}</span>
                  </div>

                  <div 
                    className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed ${
                      isMine 
                        ? 'bg-blue-600 text-white rounded-br-none shadow-xs' 
                        : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Interview Invitation Card Attachment */}
                    {msg.interviewInvite && (
                      <div className="mt-3 p-3 bg-white text-slate-900 rounded-xl border border-purple-200 space-y-2 text-xs shadow-xs">
                        <div className="flex items-center space-x-1.5 text-purple-700 font-black">
                          <Video className="w-4 h-4" />
                          <span>Convite para Entrevista Técnica</span>
                        </div>
                        <p><strong className="text-slate-900">Data:</strong> {msg.interviewInvite.date} às {msg.interviewInvite.time}</p>
                        <p><strong className="text-slate-900">Plataforma:</strong> {msg.interviewInvite.platform}</p>
                        <a
                          href={msg.interviewInvite.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 px-3 py-1.5 bg-purple-600 text-white font-bold rounded-lg text-xs mt-1"
                        >
                          <span>Acessar Link da Chamada</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-white flex items-center space-x-2">
            <button 
              type="button" 
              onClick={() => showToast('Simulação: Arquivo PDF do currículo/portfólio anexado.')}
              className="p-2.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              title="Anexar Arquivo"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input 
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Digite sua mensagem aqui..."
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition flex items-center space-x-1 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Enviar</span>
            </button>
          </form>

        </div>

      </div>

      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 p-6 text-left space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Agendar Entrevista com Candidato</h3>
              <p className="text-xs text-slate-500">O convite será enviado diretamente no chat com link de videoconferência.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Data da Entrevista</label>
                <input 
                  type="date"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Horário</label>
                <input 
                  type="time"
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Plataforma</label>
                <select
                  value={interviewPlatform}
                  onChange={(e) => setInterviewPlatform(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
                >
                  <option value="Google Meet">Google Meet</option>
                  <option value="Microsoft Teams">Microsoft Teams</option>
                  <option value="Zoom">Zoom</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                Cancelar
              </button>

              <button
                onClick={handleSendScheduleInvite}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-sm"
              >
                Enviar Agendamento
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
