import React from 'react';
import { ShieldCheck, ExternalLink, Heart, Sparkles, Building2, BookOpen } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="mt-auto bg-white border-t border-slate-200 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-extrabold text-indigo-950 text-sm">JanSahay AI</span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold border border-slate-200">
                Civic DPI AI Assistant
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Government Services, Made Simple for Every Citizen. Prototype for Build with AI: Code for Communities (Track 1).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('services')}
              className="hover:text-indigo-950 transition-colors"
            >
              Scheme Directory
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => setActiveTab('eligibility')}
              className="hover:text-indigo-950 transition-colors"
            >
              Eligibility Matcher
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => setActiveTab('documents')}
              className="hover:text-indigo-950 transition-colors"
            >
              Document Decoder
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => setActiveTab('grievance')}
              className="hover:text-indigo-950 transition-colors"
            >
              Grievance Help
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => setActiveTab('about')}
              className="font-bold text-indigo-900 hover:text-indigo-950 transition-colors"
            >
              About Prototype
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-400">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              JanSahay AI is an advisory prototype. Always verify information and submit official applications via verified .gov.in / .nic.in portals.
            </span>
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center px-2 py-0.5 rounded font-bold bg-amber-50 text-amber-800 border border-amber-200">
              HACKATHON DEMO MODE
            </span>
            <span>Powered by Google Gemini 3.7</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
