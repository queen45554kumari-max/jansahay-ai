import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Layers,
  MessageSquare
} from 'lucide-react';
import { APPLICATION_STEPS } from '../data/schemes';
import { useLanguage } from '../context/LanguageContext';

interface ApplicationGuideProps {
  onOpenChatWithQuery: (query: string) => void;
  setActiveTab: (tab: string) => void;
}

export const ApplicationGuide: React.FC<ApplicationGuideProps> = ({
  onOpenChatWithQuery,
  setActiveTab,
}) => {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const activeStep = APPLICATION_STEPS[activeStepIdx];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            Universal Public Service Workflow
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            7-Step Zero-Rejection Application Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Follow this master civic procedure to prepare, submit, and track welfare applications on any state or central portal without defect remarks.
          </p>
        </div>

        <button
          onClick={() => onOpenChatWithQuery('Walk me through the full application process for government schemes step by step')}
          className="bg-indigo-900 hover:bg-indigo-800 text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 shadow-md shadow-indigo-900/20"
        >
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>Interactive Chat Walkthrough</span>
        </button>
      </div>

      {/* Bento Grid layout for steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Step Selection Navigation (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-sm p-4 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
            Roadmap Stages:
          </span>
          {APPLICATION_STEPS.map((step, idx) => {
            const isSelected = activeStepIdx === idx;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepIdx(idx)}
                className={`w-full p-3 rounded-2xl text-left transition-all flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-900 text-white shadow-md'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    isSelected ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {step.stepNumber}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold truncate">
                    {step.title}
                  </h4>
                  <p className={`text-[10px] truncate ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                    Step {step.stepNumber} of {APPLICATION_STEPS.length}
                  </p>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-orange-400' : 'text-slate-300'}`} />
              </button>
            );
          })}
        </div>

        {/* Right: Active Step Deep Dive Card (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                Step {activeStep.stepNumber} Action Protocol
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                {activeStep.title}
              </h2>
            </div>
            <span className="text-2xl font-black text-slate-200">
              0{activeStep.stepNumber}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {activeStep.description}
          </p>

          {/* Mandatory Checkpoints */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Mandatory Checkpoints for this Stage</span>
            </h4>
            <div className="space-y-2">
              {activeStep.checkpoints.map((cp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3 text-xs text-emerald-950 font-medium"
                >
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>{cp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tip Box */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1 text-xs text-amber-950">
            <span className="font-bold flex items-center gap-1.5 text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Citizen Pro-Tip (Avoid Defect / Delay):
            </span>
            <p className="leading-relaxed">
              {activeStep.proTip}
            </p>
          </div>

          {/* Navigation between steps */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <button
              onClick={() => setActiveStepIdx((prev) => Math.max(0, prev - 1))}
              disabled={activeStepIdx === 0}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Previous Step
            </button>

            {activeStepIdx < APPLICATION_STEPS.length - 1 ? (
              <button
                onClick={() => setActiveStepIdx((prev) => Math.min(APPLICATION_STEPS.length - 1, prev + 1))}
                className="px-5 py-2 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
              >
                <span>Next: Step {activeStepIdx + 2}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('services')}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Browse Active Schemes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
