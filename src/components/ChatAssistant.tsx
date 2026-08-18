import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  Trash2,
  Volume2,
  VolumeX,
  Download,
  User,
  ExternalLink,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { askAssistant, ApiError } from '../services/api';
import { ChatMessage, Scheme } from '../types';
import { SCHEMES } from '../data/schemes';

interface ChatAssistantProps {
  initialQuery?: string;
  onClearInitialQuery?: () => void;
  setActiveTab: (tab: string) => void;
  onSelectService: (serviceId: string) => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  initialQuery,
  onClearInitialQuery,
  setActiveTab,
  onSelectService,
}) => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text:
        language === 'hi'
          ? 'नमस्ते! मैं जनसहाय AI हूँ - आपका डिजिटल नागरिक सेवा सहायक। आप भारत सरकार एवं राज्य सरकारों की कल्याणकारी योजनाओं, छात्रवृत्ति, किसान सम्मान निधि, आयुष्मान भारत, राशन कार्ड, आय/जाति प्रमाण पत्र एवं आवेदन प्रक्रियाओं से जुड़ा कोई भी प्रश्न पूछ सकते हैं।'
          : language === 'hinglish'
          ? 'Namaste! Main JanSahay AI hoon — aapka Digital Citizen Assistant. Aap central aur state government schemes (Scholarship, PM-Kisan, Ayushman Bharat, Ration Card, Certificates) se related koi bhi question pooch sakte hain.'
          : 'Namaste and welcome! I am JanSahay AI, your conversational assistant for Digital Public Infrastructure and Citizen Welfare. Ask me anything regarding government welfare schemes, eligibility rules, document checklists, application timelines, or defect rectifications.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'How to apply for Post-Matric Scholarship?',
        'PM-Kisan land seeding & e-KYC steps',
        'Ayushman Bharat 70+ Senior Citizen card eligibility',
        'How to get Income Certificate in current Financial Year?',
      ],
    },
  ]);

  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<{ message: string; lastQuery: string; code?: string } | null>(null);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, errorState]);

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery);
      if (onClearInitialQuery) onClearInitialQuery();
    }
  }, [initialQuery]);

  // Helper to extract scheme references from text
  const extractMatchedSchemes = (text: string): Scheme[] => {
    const lower = text.toLowerCase();
    return SCHEMES.filter(
      (s) =>
        lower.includes(s.name.toLowerCase()) ||
        lower.includes(s.category.toLowerCase()) ||
        s.tags.some((tag) => lower.includes(tag.toLowerCase()))
    ).slice(0, 2);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const content = textToSend || inputText;
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setErrorState(null);

    try {
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));
      history.push({ role: 'user', content });

      const response = await askAssistant(history, language);

      const matchedSchemes = extractMatchedSchemes(response.text);

      const assistantMessage: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          'What documents are required for this?',
          'Where is the official application portal?',
          'What is the step-by-step procedure?',
        ],
        matchedSchemes: matchedSchemes.length > 0 ? matchedSchemes : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMsg =
        error instanceof ApiError
          ? error.message
          : error?.message || 'JanSahay AI is temporarily unavailable. Please try again.';
      setErrorState({
        message: errorMsg,
        lastQuery: content,
        code: error?.errorCode || (error instanceof ApiError ? error.errorCode : undefined),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (errorState?.lastQuery) {
      const query = errorState.lastQuery;
      setErrorState(null);
      handleSendMessage(query);
    }
  };

  const handleClearChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeakingMsgId(null);
    setErrorState(null);
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: 'Chat history cleared. How else may I assist you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSpeak = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/[#*`_]/g, ''));
    if (language === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleExportTranscript = () => {
    const transcript = messages
      .map((m) => `[${m.timestamp}] ${m.sender === 'user' ? 'CITIZEN' : 'JANSAHAY AI'}:\n${m.text}\n`)
      .join('\n----------------------------------------\n\n');

    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JanSahay-AI-Citizen-Transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      {/* Top Banner Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-900 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            Civic AI Intelligence Layer
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            JanSahay AI Citizen Assistant
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Ask in English, हिंदी, or Hinglish. We never store confidential credentials, OTPs, or passwords.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportTranscript}
            title="Download conversation transcript"
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            onClick={handleClearChat}
            title="Clear Chat"
            className="p-2.5 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-[600px] sm:h-[680px] overflow-hidden">
        {/* Messages Container */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                    JS
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[78%] space-y-2 ${
                    isUser ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                      isUser
                        ? 'bg-indigo-900 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>

                    {!isUser && (
                      <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-[10px] text-slate-400">
                        <span>Advisory Guidance</span>
                        <button
                          onClick={() => handleSpeak(msg.id, msg.text)}
                          className="flex items-center gap-1 hover:text-indigo-900 transition-colors p-1 rounded cursor-pointer"
                        >
                          {speakingMsgId === msg.id ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                              <span className="text-rose-600 font-bold">Stop Voice</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Listen</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Matched Scheme Cards if any */}
                  {msg.matchedSchemes && msg.matchedSchemes.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Direct Scheme References:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.matchedSchemes.map((scheme) => (
                          <div
                            key={scheme.id}
                            onClick={() => onSelectService(scheme.id)}
                            className="p-3 bg-white hover:bg-indigo-50/60 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer shadow-2xs flex items-center gap-2.5 group"
                          >
                            <span className="text-xl">{scheme.icon}</span>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-950 truncate">
                                {scheme.name}
                              </h4>
                              <span className="text-[10px] text-emerald-700 font-semibold">
                                {scheme.benefitAmount || 'Govt Welfare Benefit'}
                              </span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-900 shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggested Follow Up Actions */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(action)}
                          className="text-[11px] bg-white hover:bg-slate-100 text-slate-700 font-medium px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[9px] text-slate-400 block px-1">
                    {isUser ? 'Citizen' : 'JanSahay AI'} • {msg.timestamp}
                  </span>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-indigo-900 text-white flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
                JS
              </div>
              <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-slate-200 text-slate-600 text-xs shadow-2xs flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-700 rounded-full animate-ping"></span>
                <span>JanSahay AI is verifying official public scheme guidelines...</span>
              </div>
            </div>
          )}

          {errorState && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-3xl text-xs space-y-2">
              <div className="flex items-start gap-2 text-rose-800 font-semibold">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span>JanSahay AI is temporarily unavailable.</span>
                  <p className="text-[11px] font-normal text-rose-700 mt-0.5">{errorState.message}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleRetry}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Request</span>
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2 items-center"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about schemes, documents, DBT, or defective applications..."
              disabled={isLoading}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-900 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="bg-indigo-900 hover:bg-indigo-800 disabled:opacity-40 text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md shadow-indigo-900/20 flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
