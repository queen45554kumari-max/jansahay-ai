import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Send,
  Trash2,
  FileText,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Clock,
  Building2,
  AlertTriangle,
  Compass,
  BookOpen,
  Volume2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SCHEMES } from '../data/schemes';
import { askAssistant } from '../services/api';
import { ChatMessage } from '../types';

interface LandingDashboardProps {
  setActiveTab: (tab: string) => void;
  onOpenChatWithQuery: (query: string) => void;
  onSelectService: (serviceId: string) => void;
}

export const LandingDashboard: React.FC<LandingDashboardProps> = ({
  setActiveTab,
  onOpenChatWithQuery,
  onSelectService,
}) => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Mini Chat inside Bento Grid
  const [bentoChatInput, setBentoChatInput] = useState('');
  const [bentoChatLoading, setBentoChatLoading] = useState(false);
  const [bentoMessages, setBentoMessages] = useState<
    { sender: 'user' | 'assistant'; text: string; time: string }[]
  >([
    {
      sender: 'assistant',
      text: language === 'hi'
        ? 'नमस्ते! मैं जनसहाय AI हूँ। सरकारी योजनाओं, छात्रवृत्ति, या दस्तावेजों से जुड़ा कोई भी प्रश्न पूछें।'
        : language === 'hinglish'
        ? 'Namaste! Main JanSahay AI hoon. Sarkari schemes, DBT status, ya documents se related kuch bhi poochiye.'
        : 'Namaste! I am JanSahay AI. How can I assist you with government services, scholarships, or schemes today?',
      time: '09:41 AM',
    },
    {
      sender: 'user',
      text: language === 'hi'
        ? 'छात्रवृत्ति और पीएम किसान योजना के नियम बताएं।'
        : language === 'hinglish'
        ? 'Mujhe scholarship schemes aur PM-Kisan ke baare mein bataiye.'
        : 'Tell me about Post-Matric Scholarship and PM-Kisan rules.',
      time: '09:42 AM',
    },
    {
      sender: 'assistant',
      text: language === 'hi'
        ? 'ज़रूर! छात्रवृत्ति हेतु वर्तमान वित्तीय वर्ष का आय प्रमाण पत्र और आधार e-KYC आवश्यक है। पीएम-किसान में ₹6,000 वार्षिक 3 किश्तों में DBT द्वारा मिलता है।'
        : language === 'hinglish'
        ? 'Sure! Post-Matric Scholarship ke liye Current Financial Year ka Income Certificate aur Aadhaar-bank NPCI seeding zaroori hai. PM-Kisan me 3 installments milti hain.'
        : 'Sure! For Post-Matric scholarship, you need a current Financial Year income certificate and Aadhaar-seeded bank account. PM-Kisan provides ₹6,000/yr in 3 installments.',
      time: '09:42 AM',
    },
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenChatWithQuery(searchQuery);
    }
  };

  const handleMiniChatSend = async (customText?: string) => {
    const textToSend = customText || bentoChatInput;
    if (!textToSend.trim() || bentoChatLoading) return;

    const userMsg = {
      sender: 'user' as const,
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setBentoMessages((prev) => [...prev, userMsg]);
    setBentoChatInput('');
    setBentoChatLoading(true);

    try {
      const history = bentoMessages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));
      history.push({ role: 'user', content: textToSend });

      const res = await askAssistant(history, language);
      const assistantMsg = {
        sender: 'assistant' as const,
        text: res.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setBentoMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setBentoChatLoading(false);
    }
  };

  const clearMiniChat = () => {
    setBentoMessages([
      {
        sender: 'assistant',
        text: 'Chat history cleared. How can I help you next?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const featuredSchemes = SCHEMES.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Main Bento Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: 8 Columns on Large Screens */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Bento Tile 1: Hero Search & Action Card */}
          <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-indigo-800/40">
            {/* Ambient Background Glows */}
            <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/15 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"></div>
            <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-300 text-xs font-bold border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                Digital Public Infrastructure & Welfare AI
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {t('heroTitle')}
              </h2>

              <p className="text-xs sm:text-sm text-indigo-100/90 max-w-2xl leading-relaxed">
                {t('heroSubtitle')}
              </p>

              {/* Integrated Search Bar matching Bento theme */}
              <form onSubmit={handleSearch} className="pt-2">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('searchPlaceholder')}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 text-white placeholder:text-white/60 text-xs sm:text-sm outline-none ring-2 ring-transparent focus:ring-orange-400/60 focus:bg-white/15 transition-all shadow-inner"
                    />
                    <Search className="w-5 h-5 text-white/60 absolute left-3.5 top-3.5" />
                  </div>
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-3.5 px-8 rounded-2xl transition-all shadow-lg shadow-orange-500/30 text-xs sm:text-sm shrink-0 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t('searchButton')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Quick Prompt Pills */}
              <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-indigo-200">
                <span className="font-medium text-white/70">Popular queries:</span>
                <button
                  type="button"
                  onClick={() => onOpenChatWithQuery('What are the eligibility criteria for Post-Matric Scholarship?')}
                  className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg transition-colors border border-white/10"
                >
                  🎓 Scholarships
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChatWithQuery('How to resolve PM-Kisan land seeding and e-KYC issue?')}
                  className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg transition-colors border border-white/10"
                >
                  🚜 PM-Kisan e-KYC
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChatWithQuery('What documents are needed for Ayushman Bharat Card 70+?')}
                  className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg transition-colors border border-white/10"
                >
                  🏥 Ayushman 70+
                </button>
              </div>
            </div>
          </div>

          {/* Bento Row 2: Two Interactive Helper Tiles (Document Assistant & Eligibility Checker) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Tile 2A: Document Assistant */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md p-6 flex flex-col justify-between transition-all group">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl border border-orange-100 group-hover:scale-105 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    {t('documentAssistant')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-950 transition-colors">
                    {t('simplifyDocs')}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Upload a government circular, income certificate rule, or application form to get a simple breakdown of jargon, dates, and checklists.
                  </p>
                </div>
              </div>
              <div className="pt-5 mt-auto">
                <button
                  onClick={() => setActiveTab('documents')}
                  className="w-full py-3 bg-slate-900 hover:bg-indigo-950 active:scale-98 text-white rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span>{t('uploadDoc')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tile 2B: Eligibility Checker */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md p-6 flex flex-col justify-between transition-all group">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 group-hover:scale-105 transition-transform">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    {t('eligibilityChecker')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-950 transition-colors">
                    {t('checkEligibility')}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Answer 5 non-sensitive citizen questions (State, Age, Income, Category) to instantly discover schemes you qualify for today.
                  </p>
                </div>
              </div>
              <div className="pt-5 mt-auto">
                <button
                  onClick={() => setActiveTab('eligibility')}
                  className="w-full py-3 bg-indigo-50 hover:bg-indigo-100 active:scale-98 text-indigo-900 rounded-2xl text-xs sm:text-sm font-bold border border-indigo-200 transition-all flex items-center justify-center gap-2"
                >
                  <span>{t('startAssessment')}</span>
                  <Sparkles className="w-4 h-4 text-indigo-700" />
                </button>
              </div>
            </div>

          </div>

          {/* Bento Row 3: Featured Services (5 Columns equivalent) + Application Status (3 Columns equivalent) */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
            
            {/* Featured Services Tile */}
            <div className="sm:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {t('featuredServices')}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('services')}
                  className="text-xs text-indigo-700 hover:text-indigo-900 font-bold flex items-center gap-1 hover:underline"
                >
                  <span>{t('viewAll')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2.5">
                {featuredSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    onClick={() => onSelectService(scheme.id)}
                    className="flex items-center p-3 bg-slate-50 hover:bg-indigo-50/50 rounded-2xl border border-slate-100 hover:border-indigo-200 gap-3 transition-all cursor-pointer group"
                  >
                    <div className="h-10 w-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-lg shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      {scheme.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-950 truncate">
                        {scheme.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {scheme.benefitAmount || scheme.benefit}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase shrink-0 ${
                        scheme.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {scheme.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Status Ring Tile */}
            <div className="sm:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {t('applicationStatus')}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('my-applications')}
                  className="text-xs text-indigo-700 font-bold hover:underline"
                >
                  Track All
                </button>
              </div>

              {/* Progress Ring Graphic matching design */}
              <div className="flex flex-col items-center justify-center py-3">
                <div className="relative h-24 w-24 flex items-center justify-center mb-2">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="9"
                      fill="transparent"
                      className="text-slate-100"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="9"
                      fill="transparent"
                      strokeDasharray="251"
                      strokeDashoffset="63"
                      className="text-indigo-900 transition-all duration-1000"
                    />
                  </svg>
                  <span className="absolute text-sm font-black text-indigo-950">
                    75%
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-800 text-center">
                  Income Certificate
                </p>
                <p className="text-[11px] text-slate-500 text-center mt-0.5">
                  Revenue Field Verification Complete
                </p>
              </div>

              <button
                onClick={() => setActiveTab('my-applications')}
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors"
              >
                View 3 Active Applications
              </button>
            </div>

          </div>

          {/* Bento Row 4: 7-Step Universal Roadmap & Grievance Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setActiveTab('guide')}
              className="p-4 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between cursor-pointer transition-all shadow-2xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                    7-Step Universal Application Roadmap
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Never get rejected: OTR, Self-Attestation & DBT checks
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700" />
            </div>

            <div
              onClick={() => setActiveTab('grievance')}
              className="p-4 bg-white hover:bg-rose-50/50 rounded-2xl border border-slate-200 flex items-center justify-between cursor-pointer transition-all shadow-2xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-rose-700">
                    Facing Delays or Rejections?
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Get AI diagnosis & official CPGRAMS escalation path
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-rose-700" />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Bento AI Citizen Assistant Card (4 Columns on Desktop) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-sm flex flex-col h-[640px] sm:h-[720px] lg:h-[840px] overflow-hidden sticky top-24">
          
          {/* Header of AI Assistant Bento */}
          <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-2.5 w-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                  JanSahay AI Assistant
                </h3>
                <p className="text-[10px] text-slate-500 font-medium">
                  Multilingual • Real-Time DPI Guidance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearMiniChat}
                title="Clear conversation"
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                title="Expand full screen chat"
                className="text-[10px] font-bold text-indigo-700 hover:text-indigo-950 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100"
              >
                Full Screen
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 space-y-3.5 overflow-y-auto bg-slate-50/40 text-xs">
            {bentoMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end ml-auto max-w-[88%]' : 'items-start max-w-[88%]'
                }`}
              >
                <div
                  className={`p-3.5 rounded-2xl shadow-2xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-900 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[9px] text-slate-400 font-medium mt-1 px-1">
                  {msg.sender === 'user' ? 'YOU' : 'JANSAHAY AI'} • {msg.time}
                </span>
              </div>
            ))}

            {bentoChatLoading && (
              <div className="flex flex-col items-start max-w-[85%]">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 text-slate-500 text-xs flex items-center gap-2 shadow-2xs">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></span>
                  <span>Consulting public service rules...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Question Chips */}
          <div className="p-3 bg-white border-t border-slate-100">
            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none text-[10px]">
              <button
                type="button"
                onClick={() => handleMiniChatSend('How do I check if my bank account has DBT NPCI active?')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-full border border-slate-200 whitespace-nowrap transition-colors shrink-0"
              >
                Check DBT Active?
              </button>
              <button
                type="button"
                onClick={() => handleMiniChatSend('What to do if scholarship status is marked Defective?')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-full border border-slate-200 whitespace-nowrap transition-colors shrink-0"
              >
                Defective Status Fix
              </button>
              <button
                type="button"
                onClick={() => handleMiniChatSend('How to get Domicile Certificate online?')}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-full border border-slate-200 whitespace-nowrap transition-colors shrink-0"
              >
                Online Domicile
              </button>
            </div>

            {/* Input & Send Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleMiniChatSend();
              }}
              className="flex gap-2 items-center pt-1"
            >
              <input
                type="text"
                value={bentoChatInput}
                onChange={(e) => setBentoChatInput(e.target.value)}
                placeholder="Ask in Hindi, English or Hinglish..."
                disabled={bentoChatLoading}
                className="flex-1 bg-slate-100 border-none rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-900 outline-none"
              />
              <button
                type="submit"
                disabled={!bentoChatInput.trim() || bentoChatLoading}
                className="bg-indigo-900 hover:bg-indigo-800 disabled:opacity-40 text-white p-2.5 rounded-xl transition-colors shrink-0 shadow-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
