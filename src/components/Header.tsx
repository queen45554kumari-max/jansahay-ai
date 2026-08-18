import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  BookOpen,
  CheckCircle2,
  FileText,
  AlertCircle,
  Menu,
  X,
  Compass,
  FileSpreadsheet,
  Layers,
  HelpCircle,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenChatWithQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenChatWithQuery,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: Layers },
    { id: 'services', label: 'Find Services', icon: Compass },
    { id: 'chat', label: 'AI Assistant', icon: Sparkles },
    { id: 'eligibility', label: 'Eligibility', icon: CheckCircle2 },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'guide', label: '7-Step Roadmap', icon: BookOpen },
    { id: 'my-applications', label: 'Applications', icon: FileSpreadsheet },
    { id: 'grievance', label: 'Redressal', icon: AlertCircle },
    { id: 'about', label: 'Track 1 DPI', icon: Info },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onOpenChatWithQuery(searchQuery);
      setSearchQuery('');
    }
  };

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Brand matching Bento Grid theme */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="bg-indigo-900 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg tracking-wider shadow-sm group-hover:bg-indigo-800 transition-colors">
              JS
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-indigo-950">
                  JanSahay <span className="text-orange-600 underline decoration-emerald-600 decoration-2">AI</span>
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                  DPI Rails
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block">
                Citizen Welfare & Public Service Assistant
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navItems.slice(0, 7).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-indigo-950 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-orange-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Language Switcher & Profile Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Selector matching Bento theme */}
            <div className="flex items-center bg-white border border-slate-200 rounded-full p-0.5 text-xs font-semibold shadow-2xs">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                  language === 'en'
                    ? 'bg-indigo-900 text-white'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                English
              </button>
              <span className="text-slate-200">|</span>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                  language === 'hi'
                    ? 'bg-indigo-900 text-white'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                हिंदी
              </button>
              <span className="text-slate-200">|</span>
              <button
                onClick={() => setLanguage('hinglish')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                  language === 'hinglish'
                    ? 'bg-indigo-900 text-white'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Hinglish
              </button>
            </div>

            {/* Citizen Avatar Profile */}
            <button
              onClick={() => setActiveTab('my-applications')}
              title="View Citizen Applications & Identity"
              className="h-9 w-9 sm:h-10 sm:w-10 bg-slate-100 hover:bg-slate-200 rounded-full border-2 border-slate-200 flex items-center justify-center transition-colors shadow-2xs group"
            >
              <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-950">
                IN
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scheme or service..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-900"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                    isActive
                      ? 'bg-indigo-900 text-white'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-orange-300' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
